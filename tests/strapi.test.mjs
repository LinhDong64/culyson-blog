import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { beforeEach, test } from "node:test";
import ts from "typescript";

process.env.STRAPI_URL = "http://strapi.test";
process.env.STRAPI_API_TOKEN = "test-token";

const requestCaches = [];
function requestCache(fn) {
  const results = new Map();
  requestCaches.push(results);
  return (...args) => {
    const key = JSON.stringify(args);
    if (!results.has(key)) results.set(key, fn(...args));
    return results.get(key);
  };
}

function resetRequestCache() {
  requestCaches.forEach((results) => results.clear());
}

beforeEach(resetRequestCache);

function loadModule(path, dependencies = {}) {
  const { outputText } = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  const loadedModule = { exports: {} };
  const requireDependency = (name) => {
    if (name === "server-only") return {};
    assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
  };
  new Function("require", "module", "exports", outputText)(requireDependency, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

const api = loadModule("../src/lib/strapi.ts", { react: { cache: requestCache } });
const service = loadModule("../src/features/categories/services/posts.ts", { "@/lib/strapi": api });
const route = loadModule("../src/app/api/categories/[slug]/posts/route.ts", {
  "@/lib/strapi": api,
  "@/features/categories/services/posts": service,
});

function entity(value, legacy, id = 1) {
  return legacy ? { id, attributes: value } : { id, ...value };
}

test("normalizes v4/v5 articles, media, author relations, tags, and safe filters", async (context) => {
  for (const legacy of [true, false]) {
    const relation = (value) => legacy ? { data: entity(value, true) } : entity(value, false);
    const article = entity({
      title: "Article",
      slug: "article",
      publishedAt: "2026-10-01",
      content: [{ type: "paragraph", children: [{ type: "text", text: "Content" }] }],
      cover: relation({ url: "/uploads/cover.jpg" }),
      category: relation({ name: "Travel", slug: "travel" }),
      author: relation({ name: "Author" }),
      tags: legacy ? { data: [entity({ name: "Tag" }, true)] } : [entity({ name: "Tag" }, false)],
    }, legacy);
    context.mock.method(globalThis, "fetch", async (url, options) => {
      const query = new URL(url);
      assert.equal(query.pathname, "/api/articles");
      assert.equal(query.searchParams.get("filters[category][slug][$eq]"), "travel&extra=value");
      assert.equal(query.searchParams.get("pagination[start]"), "4");
      assert.equal(query.searchParams.get("pagination[limit]"), "4");
      assert.equal(options.headers.get("Authorization"), "Bearer test-token");
      return Response.json({ data: [article], meta: { pagination: { total: 9 } } });
    });
    const page = await service.getCategoryPostsPage("travel&extra=value", 4);
    assert.equal(page.nextOffset, 5);
    assert.equal(page.total, 9);
    assert.equal(page.posts[0].category.slug, "travel");
    assert.equal(page.posts[0].author, "Author");
    assert.equal(page.posts[0].postedDate, "2026-10-01");
    assert.equal(page.posts[0].readingTime, "1 phút đọc");
    assert.equal(page.posts[0].cover, "http://strapi.test/uploads/cover.jpg");
    assert.deepEqual(page.posts[0].tags, ["Tag"]);
    assert.deepEqual(page.posts[0].content, article.attributes?.content ?? article.content);
    context.mock.restoreAll();
  }
});

test("calculates reading time from the full article body instead of stale CMS metadata", async (context) => {
  context.mock.method(globalThis, "fetch", async () => Response.json({
    data: [entity({
      title: "Long article",
      slug: "long-article",
      content: Array(201).fill("word").join(" "),
      readingTime: "99 minutes",
    }, false)],
  }));

  const post = await api.getPostBySlug("long-article");
  assert.equal(post.readingTime, "2 phút đọc");
});

test("memoizes category and post slug lookups within a request", async (context) => {
  let fetchCount = 0;
  context.mock.method(globalThis, "fetch", async (url) => {
    fetchCount += 1;
    const isCategory = new URL(url).pathname === "/api/categories";
    return Response.json({
      data: [entity(isCategory
        ? { name: "Travel", slug: "travel", image: null }
        : { title: "Article", slug: "article" }, false)],
    });
  });

  const [category, repeatedCategory, post, repeatedPost] = await Promise.all([
    api.getCategoryBySlug("travel"),
    api.getCategoryBySlug("travel"),
    api.getPostBySlug("article"),
    api.getPostBySlug("article"),
  ]);

  assert.equal(fetchCount, 2);
  assert.strictEqual(category, repeatedCategory);
  assert.strictEqual(post, repeatedPost);
});

test("filters featured articles using the CMS flag", async (context) => {
  context.mock.method(globalThis, "fetch", async (url) => {
    const query = new URL(url);
    assert.equal(query.searchParams.get("filters[featured][$eq]"), "true");
    assert.equal(query.searchParams.get("pagination[pageSize]"), "3");
    return Response.json({ data: [], meta: { pagination: { total: 0 } } });
  });
  await api.getPosts({ featured: true, pageSize: 3 });
});

test("loads every category page and maps nullable images", async (context) => {
  context.mock.method(globalThis, "fetch", async (url) => {
    const query = new URL(url);
    const page = Number(query.searchParams.get("pagination[page]"));
    assert.equal(query.searchParams.get("sort[0]"), "name:asc");
    return Response.json({
      data: [entity({ name: `Category ${page}`, slug: `category-${page}`, image: null }, page === 1, page)],
      meta: { pagination: { pageCount: 2 } },
    });
  });
  const categories = await api.getCategories();
  assert.equal(categories.length, 2);
  assert.equal(categories[0].image, null);
  assert.equal(categories[0].alt, "Category 1");
  assert.equal(categories[1].link, "/categories/category-2");
});

test("ends pagination on empty/final pages and returns null for missing slugs", async (context) => {
  context.mock.method(globalThis, "fetch", async () => Response.json({ data: [], meta: { pagination: { total: 0 } } }));
  assert.deepEqual(await service.getCategoryPostsPage("empty"), { posts: [], total: 0, nextOffset: null });
  assert.equal(await api.getCategoryBySlug("missing"), null);
  assert.equal(await api.getPostBySlug("missing"), null);
  context.mock.method(globalThis, "fetch", async () => Response.json({
    data: [entity({ title: "Last", slug: "last", createdAt: "2026-10-01" }, false)],
    meta: { pagination: { total: 5 } },
  }));
  const page = await service.getCategoryPostsPage("last", 4);
  assert.equal(page.nextOffset, null);
  assert.deepEqual(page.posts[0].tags, []);
  assert.equal(page.posts[0].category, null);
});

test("preserves no-store and propagates upstream failures", async (context) => {
  context.mock.method(globalThis, "fetch", async (_url, options) => {
    assert.equal(options.cache, "no-store");
    assert.equal(options.next, undefined);
    assert.equal(options.headers.get("X-Test"), "yes");
    return new Response(null, { status: 503, statusText: "Service Unavailable" });
  });
  await assert.rejects(api.fetchStrapi("/articles", { cache: "no-store", headers: { "X-Test": "yes" } }), /Strapi error: 503/);
});

test("load-more route validates offsets, handles missing categories, and hides upstream errors", async (context) => {
  const params = { params: Promise.resolve({ slug: "travel" }) };
  for (const offset of ["-1", "1.5", "NaN", "9007199254740992"]) {
    const response = await route.GET(new Request(`http://blog.test/api/categories/travel/posts?offset=${offset}`), params);
    assert.equal(response.status, 400);
  }
  context.mock.method(globalThis, "fetch", async () => Response.json({ data: [] }));
  assert.equal((await route.GET(new Request("http://blog.test/api/categories/travel/posts"), params)).status, 404);
  resetRequestCache();
  context.mock.method(globalThis, "fetch", async () => new Response(null, { status: 403 }));
  const response = await route.GET(new Request("http://blog.test/api/categories/travel/posts"), params);
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { error: "Unable to load posts" });
});