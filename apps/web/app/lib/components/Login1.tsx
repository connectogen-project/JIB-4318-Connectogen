import { FunctionComponent } from "react";
import Column from "./Column";

export type Login1Type = {
  className?: string;

  /** Variant props */
  breakpoint?: string;
};

const Login1: FunctionComponent<Login1Type> = ({
  className = "",
  breakpoint = "Desktop",
}) => {
  return (
    <main
      className={`flex-1 bg-background-color-primary overflow-hidden flex flex-row items-center justify-start max-w-full [row-gap:20px] text-center text-29xl text-color-neutral-black font-heading-desktop-h1 mq1125:flex-wrap ${className}`}
      data-breakpoint={breakpoint}
    >
      <Column />
      <img
        className="h-[900px] flex-1 relative max-w-full overflow-hidden object-cover min-w-[468px] mq750:min-w-full mq1125:flex-1"
        loading="lazy"
        alt=""
        src="/placeholder-image11@2x.png"
      />
    </main>
  );
};

export default Login1;
