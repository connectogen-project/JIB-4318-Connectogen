import { FunctionComponent } from "react";
import Button from "./Button";

export type LayoutType = {
  className?: string;
};

const Layout: FunctionComponent<LayoutType> = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch bg-background-color-primary overflow-hidden flex flex-col items-start justify-start py-28 px-16 box-border max-w-full text-center text-base text-color-neutral-black font-heading-desktop-h1 mq450:gap-5 mq450:pt-[47px] mq450:pb-[47px] mq450:box-border mq900:gap-10 mq900:py-[73px] mq900:px-8 mq900:box-border ${className}`}
    >
      <div className="self-stretch flex flex-row items-center justify-start flex-wrap content-center gap-20 max-w-full mq450:gap-5 mq675:gap-10">
        <div className="flex-1 flex flex-col items-start justify-start py-5 px-0 box-border gap-6 min-w-[400px] max-w-full mq675:min-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-8 mq675:gap-4">
            <div className="self-stretch flex flex-col items-start justify-start gap-4">
              <div className="relative leading-[150%] font-semibold hidden">
                Tagline
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-6 text-left text-29xl">
                <b className="self-stretch h-[116px] relative leading-[120%] inline-block mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
                  Statistics
                </b>
                <div className="self-stretch h-[81px] relative text-lg leading-[150%] inline-block">
                Statistics show that mentorship and hands-on projects boost student success, with students having mentors more likely to graduate, earn higher GPAs, and secure jobs. By connecting students with mentors and real-world opportunities, Connectogen helps students build skills and prepare for successful careers.
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start py-2 px-0 gap-6 text-left text-29xl">
              <div className="self-stretch flex flex-row items-start justify-start gap-6 mq675:flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-start gap-2 min-w-[192px]">
                  <b className="self-stretch relative leading-[120%] mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
                    750
                  </b>
                  <div className="self-stretch relative text-base leading-[150%]">
                    Users
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-2 min-w-[192px]">
                  <b className="self-stretch relative leading-[120%] mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
                    150
                  </b>
                  <div className="self-stretch relative text-base leading-[150%]">
                    Projects
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-6 mq675:flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-start gap-2 min-w-[192px]">
                  <b className="self-stretch relative leading-[120%] mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
                    100
                  </b>
                  <div className="self-stretch relative text-base leading-[150%]">
                    Current Mentors
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-2 min-w-[192px]">
                  <b className="self-stretch relative leading-[120%] mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
                    5k+
                  </b>
                  <div className="self-stretch relative text-base leading-[150%]">
                    Downloads
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[200px] h-16 hidden flex-row items-center justify-start pt-4 px-0 pb-0 box-border gap-6 text-left">
            <Button
              alternate={false}
              iconPosition="No icon"
              small={false}
              style="Secondary"
              buttonAlignSelf="unset"
              button="Button"
              buttonFlex="1"
              buttonHeight="50px"
            />
            <div className="h-6 flex flex-row items-center justify-center gap-2">
              <div className="self-stretch w-12 relative leading-[150%] inline-block">
                Button
              </div>
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                alt=""
                src="/icon--chevronright.svg"
              />
            </div>
          </div>
        </div>
        <img
          className="h-[640px] flex-1 relative max-w-full overflow-hidden object-cover min-w-[400px] mq675:min-w-full"
          loading="lazy"
          alt=""
          src="/stats.png"
        />
      </div>
    </section>
  );
};

export default Layout;
