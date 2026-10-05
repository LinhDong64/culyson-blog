import type { FC, ReactNode } from "react";

type SectionLayoutProps = {
  children: ReactNode;
  bg?: string;
  customClass?: string;
};

const SectionLayout: FC<SectionLayoutProps> = ({ children, bg= "bg-white", customClass="" }) => {
  return (
   <div className={`w-full ${bg} ${customClass}`}>
      <div className={"mx-auto max-w-6xl"}>
        {children}
      </div>
   </div>
  );
};

export default SectionLayout;
