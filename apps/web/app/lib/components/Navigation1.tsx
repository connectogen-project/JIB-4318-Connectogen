import { FunctionComponent } from "react";
import Navbarish from "./NavigationBar";

export type Navigation1Type = {
  className?: string;
};

const Navigation1: FunctionComponent<Navigation1Type> = ({
  className = "",
}) => {
  return (
    <div
      className={`w-[1440px] bg-background-color-primary max-w-full overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal] ${className}`}
    >
      <Navbarish breakpoint="Desktop" />
    </div>
  );
};

export default Navigation1;
