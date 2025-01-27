'use client';
import { FunctionComponent, useCallback } from "react";
import TextInput from "./TextInput";
import Button from "./Button-Legacy";
import { useRouter } from "next/navigation";

export type Column1Type = {
  className?: string;
};

const Column1: FunctionComponent<Column1Type> = ({ 
  className = "" 
}) => {

  const router = useRouter();

  const onLinkTextClick = useCallback(() => {
    router.push("/login");
  }, [router]);


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
          <h1 className="m-0 self-stretch relative text-inherit leading-[120%] font-bold font-[inherit] whitespace-nowrap mq450:text-10xl mq450:leading-[35px] mq1050:text-19xl mq1050:leading-[46px]">
            Sign Up
          </h1>
          <div className="self-stretch relative text-lg leading-[150%]">
            Lorem ipsum dolor sit amet adipiscing elit.
          </div>
        </div>
        <div className="w-[480px] flex flex-col items-center justify-center gap-6 max-w-full text-left text-base">
          <div className="self-stretch h-20 flex flex-col items-start justify-start gap-2">
            <div className="self-stretch relative leading-[150%]">Name*</div>
            <TextInput
              alternate={false}
              type="Default"
              textInputHeight="50px"
              breakpoint="Desktop"
              textInputMinWidth="250px"
              textInputFontFamily="unset"
              textInputFontSize="unset"
              textInputColor="unset"
            />
          </div>
          <div className="self-stretch h-20 flex flex-col items-start justify-start gap-2 max-w-full">
            <div className="self-stretch relative leading-[150%]">Email*</div>
            <TextInput
              alternate={false}
              type="Default"
              textInputHeight="50px"
              breakpoint="Desktop"
              textInputMinWidth="250px"
              textInputFontFamily="unset"
              textInputFontSize="unset"
              textInputColor="unset"
            />
          </div>
          <div className="self-stretch h-20 flex flex-col items-start justify-start gap-2 max-w-full">
            <div className="self-stretch relative leading-[150%]">
              Password*
            </div>
            <TextInput
              alternate={false}
              type="Default"
              textInputHeight="50px"
              breakpoint="Desktop"
              textInputMinWidth="250px"
              textInputFontFamily="unset"
              textInputFontSize="unset"
              textInputColor="unset"
            />
          </div>
          <div className="self-stretch flex flex-col items-center justify-start gap-6 text-center">
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
              <button className="cursor-pointer border-color-neutral-black border-[1px] border-solid py-3 px-6 bg-[transparent] self-stretch flex flex-row items-center justify-center gap-3 hover:bg-darkslategray-200 hover:border-darkslategray-100 hover:border-[1px] hover:border-solid hover:box-border">
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/icon--google.svg"
                />
                <div className="relative text-base leading-[150%] font-heading-desktop-h1 text-color-neutral-black text-left">
                  Sign up with Google
                </div>
              </button>
            </div>
            <div className="flex flex-row items-center justify-start gap-[5px]">
              <div className="relative leading-[150%] whitespace-nowrap">
                Already have an account?
              </div>
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-base [text-decoration:underline] leading-[150%] font-heading-desktop-h1 text-color-neutral-black text-center inline-block whitespace-nowrap"
              onClick={onLinkTextClick}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-[72px] flex flex-row items-center justify-start text-sm">
        <div className="relative leading-[150%]">© 2022 Relume</div>
      </div>
    </div>
  );
};

export default Column1;
