import { FunctionComponent } from "react";
import Button from "./Button";

export type Column2Type = {
  className?: string;
};

const Column2: FunctionComponent<Column2Type> = ({ className = "" }) => {
  return (
    <div
      className={`flex-[0.8222] flex flex-col items-center justify-start py-0 px-16 box-border min-w-[468px] max-w-full text-center text-29xl text-color-neutral-black font-heading-desktop-h1 mq750:pl-8 mq750:pr-8 mq750:box-border mq750:min-w-full mq1125:flex-1 ${className}`}
    >
      <div className="self-stretch h-[72px] overflow-hidden shrink-0 flex flex-col items-start justify-center">
        <img
          className="w-[84px] h-9 relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/logoref.svg"
        />
      </div>
      <div className="self-stretch flex flex-col items-center justify-center gap-8 min-h-[756px] max-w-full mq750:gap-4">
        <div className="self-stretch flex flex-col items-center justify-start gap-6">
          <h1 className="m-0 self-stretch relative text-inherit leading-[120%] font-bold font-[inherit] mq450:text-10xl mq450:leading-[35px] mq1050:text-19xl mq1050:leading-[46px]">
            Reset Pasword
          </h1>
          <div className="self-stretch relative text-lg leading-[150%]">
            Lorem ipsum dolor sit amet adipiscing elit.
          </div>
        </div>
        <form className="m-0 w-[480px] flex flex-col items-center justify-center gap-6 max-w-full">
          <div className="self-stretch h-20 flex flex-col items-start justify-start gap-2">
            <div className="self-stretch relative text-base leading-[150%] font-heading-desktop-h1 text-color-neutral-black text-left">
              Email
            </div>
            <input
              className="border-color-neutral-black border-[1px] border-solid [outline:none] bg-[transparent] self-stretch h-[50px] box-border flex flex-row items-center justify-start p-3 min-w-[250px]"
              type="text"
            />
          </div>
          <div className="self-stretch h-20 flex flex-col items-start justify-start gap-2">
            <div className="self-stretch relative text-base leading-[150%] font-heading-desktop-h1 text-color-neutral-black text-left">
              Enter new Password:
            </div>
            <input
              className="border-color-neutral-black border-[1px] border-solid [outline:none] bg-[transparent] self-stretch h-[50px] box-border flex flex-row items-center justify-start p-3 min-w-[250px]"
              type="text"
            />
          </div>
          <div className="self-stretch h-20 flex flex-col items-start justify-start gap-2">
            <div className="self-stretch relative text-base leading-[150%] font-heading-desktop-h1 text-color-neutral-black text-left">
              Re-enter New Password:
            </div>
            <input
              className="border-color-neutral-black border-[1px] border-solid [outline:none] bg-[transparent] self-stretch h-[50px] box-border flex flex-row items-center justify-start p-3 min-w-[250px]"
              type="text"
            />
          </div>
          <div className="self-stretch flex flex-col items-center justify-start gap-6">
            <div className="self-stretch h-28 flex flex-col items-start justify-start gap-4">
              <Button
                alternate={false}
                iconPosition="No icon"
                small={false}
                style="Primary"
                buttonAlignSelf="stretch"
                button="Sign up"
                buttonFlex="unset"
                buttonHeight="unset"
              />
              <div className="self-stretch border-color-neutral-black border-[1px] border-solid flex flex-row items-center justify-center py-3 px-6 gap-3">
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/icon--google.svg"
                />
                <div className="relative text-base leading-[150%] font-heading-desktop-h1 text-color-neutral-black text-left">
                  Sign up with Google
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[5px]">
              <div className="relative text-base leading-[150%] font-heading-desktop-h1 text-color-neutral-black text-center whitespace-nowrap">
                Already have an account?
              </div>
              <div className="relative text-base [text-decoration:underline] leading-[150%] font-heading-desktop-h1 text-color-neutral-black text-center whitespace-nowrap">
                Log In
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="self-stretch h-[72px] flex flex-row items-center justify-start text-sm">
        <div className="relative leading-[150%]">© 2022 Relume</div>
      </div>
    </div>
  );
};

export default Column2;
