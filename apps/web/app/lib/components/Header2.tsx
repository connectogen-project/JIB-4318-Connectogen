import { FunctionComponent } from "react";

export type Header2Type = {
  className?: string;

  /** Variant props */
  breakpoint?: string;
};

const Header2: FunctionComponent<Header2Type> = ({
  className = "",
  breakpoint = "Desktop",
}) => {
  return (
    <section
      className={`w-[1440px] overflow-hidden flex flex-col items-center justify-start py-28 px-16 box-border bg-[url('/public/header--69@3x.png')] bg-cover bg-no-repeat bg-[top] z-[3] text-center text-37xl text-background-color-primary font-heading-desktop-h1 ${className}`}
      data-breakpoint={breakpoint}
    >
      <div className="w-[768px] flex flex-col items-center justify-start gap-6">
        <b className="self-stretch relative leading-[120%]">
          Short heading here
        </b>
        <div className="self-stretch relative text-lg leading-[150%]">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. `}</div>
      </div>
    </section>
  );
};

export default Header2;
