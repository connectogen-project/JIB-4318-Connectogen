'use client';
import {
  FunctionComponent,
  useMemo,
  type CSSProperties,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

export type ButtonType = {
  className?: string;
  button?: string;

  /** Variant props */
  alternate?: boolean;
  iconPosition?: string;
  small?: boolean;
  style?: "Primary" | "Secondary";

  /** Style props */
  buttonAlignSelf?: CSSProperties["alignSelf"];
  buttonFlex?: CSSProperties["flex"];
  buttonHeight?: CSSProperties["height"];

  /** Action props */
  onButtonClick?: () => void;
};

const Button: FunctionComponent<ButtonType> = ({
  className = "",
  alternate = false,
  iconPosition = "No icon",
  small = false,
  style = "Primary",
  buttonAlignSelf,
  button,
  buttonFlex,
  buttonHeight,
  onButtonClick,
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: buttonAlignSelf,
      flex: buttonFlex,
      height: buttonHeight,
    };
  }, [buttonAlignSelf, buttonFlex, buttonHeight]);

  const router = useRouter();

  const onButtonClick1 = useCallback(() => {
    router.push("/about");
  }, [router]);

  return (
    <button
      className={`cursor-pointer border-color-neutral-black border-[1px] border-solid py-3 px-6 bg-color-neutral-black h-[50px] box-border flex flex-row items-center justify-center [&_icon']:data-[small='false']:data-[style='Secondary']]:data-[alternate='false']:data-[iconPosition='No:bg-[transparent] [&_icon']:data-[small='false']:data-[style='Secondary']]:data-[alternate='false']:data-[iconPosition='No:text-color-neutral-black [&_icon']:data-[small='false']:data-[style='Secondary']]:data-[alternate='false']:data-[iconPosition='No:h-6 [&_icon']:data-[small='false']:data-[style='Secondary']]:data-[alternate='false']:data-[iconPosition='No:w-12 [&_icon']:data-[small='false']:data-[style='Secondary']]:data-[alternate='false']:data-[iconPosition='No:inline-block ${className}`}
      onClick={onButtonClick}
      data-alternate={alternate}
      data-iconposition={iconPosition}
      data-small={small}
      data-style={style}
      style={buttonStyle}
    >
      <div className="button relative text-base leading-[150%] font-heading-desktop-h1 text-background-color-primary text-left">
        {button}
      </div>
    </button>
  );
};

export default Button;
