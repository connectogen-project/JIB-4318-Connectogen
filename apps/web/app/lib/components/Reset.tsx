import { FunctionComponent, useMemo, type CSSProperties } from "react";
import Column1 from "./Column2";

export type SignUp1Type = {
  className?: string;
  placeholderImage?: string;

  /** Variant props */
  breakpoint?: string;

  /** Style props */
  signUp7Flex?: CSSProperties["flex"];
  signUp7RowGap?: CSSProperties["rowGap"];
  signUp7Height?: CSSProperties["height"];
  signUp7Width?: CSSProperties["width"];
};

const SignUp1: FunctionComponent<SignUp1Type> = ({
  className = "",
  breakpoint = "Desktop",
  placeholderImage,
  signUp7Flex,
  signUp7RowGap,
  signUp7Height,
  signUp7Width,
}) => {
  const signUp7Style: CSSProperties = useMemo(() => {
    return {
      flex: signUp7Flex,
      rowGap: signUp7RowGap,
      height: signUp7Height,
      width: signUp7Width,
    };
  }, [signUp7Flex, signUp7RowGap, signUp7Height, signUp7Width]);

  return (
    <main
      className={`flex-1 bg-background-color-primary overflow-hidden flex flex-row items-center justify-start max-w-full [row-gap:20px] text-center text-29xl text-color-neutral-black font-heading-desktop-h1 mq1125:flex-wrap ${className}`}
      data-breakpoint={breakpoint}
      style={signUp7Style}
    >
      <Column1 />
      <img
        className="h-[900px] flex-1 relative max-w-full overflow-hidden object-cover min-w-[468px] mq750:min-w-full mq1125:flex-1"
        loading="lazy"
        alt=""
        src={placeholderImage}
      />
    </main>
  );
};

export default SignUp1;
