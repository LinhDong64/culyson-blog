import type { FC, ReactNode } from "react";

type SectionLayoutProps = {
  children: ReactNode;
  bg?: string;
};

const SectionLayout: FC<SectionLayoutProps> = ({ children, bg= "bg-white" }) => {
  return (
   <div className={`w-full ${bg}`}>
      <div className={"mx-auto max-w-6xl"}>
        {children}
      </div>
   </div>
  );
};

export default SectionLayout;
