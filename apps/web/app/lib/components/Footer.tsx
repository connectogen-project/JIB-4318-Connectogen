import { FunctionComponent } from "react";
import Footer1 from "./Footer1";

export type FooterType = {
  className?: string;
};

const Footer: FunctionComponent<FooterType> = ({ className = "" }) => {
  return (
    <div
      className={`w-[1440px] bg-background-color-primary max-w-full overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal] ${className}`}
    >
      <Footer1 breakpoint="Desktop" />
    </div>
  );
};

export default Footer;
