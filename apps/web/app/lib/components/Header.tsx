'use client';
import { FunctionComponent, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button-Legacy";

export type HeaderType = {
  className?: string;

  /** Variant props */
  breakpoint?: string;
};

const Header: FunctionComponent<HeaderType> = ({
  className = "",
  breakpoint = "Desktop",
}) => {
  const router = useRouter();

  const onButtonClick = useCallback(() => {
    router.push("/mentorship");
  }, [router]);

  const onButtonClick1 = useCallback(() => {
    router.push("/signup");
  }, [router]);

  return (
    <main
      className={`flex-1 bg-background-color-primary flex flex-col items-center justify-start max-w-full ${className}`}
      data-breakpoint={breakpoint}
    >
      <img
        className="self-stretch relative max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src="/dylan-gillis-KdeqA3aTnBY-unsplash.jpg"
      />
      <section className="self-stretch flex flex-row items-start justify-start flex-wrap content-start py-20 px-16 box-border gap-20 max-w-full text-left text-37xl text-color-neutral-black font-heading-desktop-h1 lg:gap-10 lg:pl-8 lg:pr-8 lg:box-border mq750:gap-5">
        <div className="flex-1 flex flex-col items-start justify-start min-w-[400px] max-w-full mq750:min-w-full">
          <h1 className="m-0 self-stretch h-[1px] relative text-inherit leading-[120%] font-bold font-[inherit] inline-block mq450:text-15xl mq450:leading-[40px] mq1050:text-26xl mq1050:leading-[54px]">
            Welcome to Connectogen.
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-8 min-w-[400px] max-w-full text-lg mq750:gap-4 mq750:min-w-full">
          <div className="self-stretch h-[81px] relative leading-[150%] inline-block">
          Welcome to Connectogen – your gateway to mentorship and projects within your institution. Whether you're looking for guidance, collaboration opportunities, or skill-building projects, Connectogen helps you connect with the right mentors and resources to accelerate your growth. Join our community and unlock your full potential today!
        </div>
          <div className="h-12 flex flex-row items-start justify-start gap-5 top-[0] z-[99] sticky">
            <Button
              alternate={false}
              iconPosition="No icon"
              small={false}
              style="Primary"
              button="Explore"
              onButtonClick={onButtonClick}
            />
            <Button
              alternate={false}
              iconPosition="No icon"
              small={false}
              style="Secondary"
              buttonAlignSelf="unset"
              button="Register"
              buttonFlex="unset"
              buttonHeight="50px"
              onButtonClick={onButtonClick1}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Header;
