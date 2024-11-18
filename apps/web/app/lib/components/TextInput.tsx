import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type TextInputType = {
  className?: string;
  placeholder?: string;
  showPlaceholder?: boolean;

  /** Variant props */
  alternate?: boolean;
  type?: string;
  breakpoint?: string;

  /** Style props */
  textInputHeight?: CSSProperties["height"];
  placeholderFlex?: CSSProperties["flex"];
  placeholderWidth?: CSSProperties["width"];
  textInputMinWidth?: CSSProperties["minWidth"];
  textInputFontFamily?: CSSProperties["fontFamily"];
  textInputFontSize?: CSSProperties["fontSize"];
  textInputColor?: CSSProperties["color"];
};

const TextInput: FunctionComponent<TextInputType> = ({
  className = "",
  alternate = false,
  type = "Default",
  breakpoint = "Desktop",
  textInputHeight,
  textInputMinWidth,
  textInputFontFamily,
  textInputFontSize,
  textInputColor,
}) => {
  const textInputStyle: CSSProperties = useMemo(() => {
    return {
      height: textInputHeight,
      minWidth: textInputMinWidth,
      fontFamily: textInputFontFamily,
      fontSize: textInputFontSize,
      color: textInputColor,
    };
  }, [
    textInputHeight,
    textInputMinWidth,
    textInputFontFamily,
    textInputFontSize,
    textInputColor,
  ]);

  return (
    <input
      className={`border-color-neutral-black border-[1px] border-solid [outline:none] bg-[transparent] self-stretch h-[50px] box-border flex flex-row items-center justify-start py-3 px-[11px] font-heading-desktop-h1 text-base text-dimgray min-w-[250px] max-w-full shrink-0 ${className}`}
      type="text"
      data-alternate={alternate}
      data-type={type}
      style={textInputStyle}
      data-breakpoint={breakpoint}
    />
  );
};

export default TextInput;
