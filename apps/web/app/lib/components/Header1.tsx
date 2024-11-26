import { FunctionComponent } from "react";

export type Header1Type = {
  className?: string;

  /** Variant props */
  breakpoint?: string;
};

const Header1: FunctionComponent<Header1Type> = ({
  className = "",
  breakpoint = "Desktop",
}) => {
  return (
    <section
      className={`self-stretch bg-background-color-primary overflow-hidden flex flex-col items-start justify-start py-28 px-16 box-border max-w-full z-[1] text-left text-29xl text-color-neutral-black font-heading-desktop-h1 mq450:gap-5 mq450:pt-[73px] mq450:pb-[73px] mq450:box-border mq900:gap-10 mq900:pl-8 mq900:pr-8 mq900:box-border ${className}`}
      data-breakpoint={breakpoint}
    >
      <div className="self-stretch flex flex-row items-start justify-start flex-wrap content-start gap-20 max-w-full mq450:gap-5 mq675:gap-10">
        <div className="flex-1 flex flex-col items-start justify-start min-w-[400px] max-w-full mq675:min-w-full">
          <b className="self-stretch h-[116px] relative leading-[120%] inline-block mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
            Success: What Connectogen Does Best.
          </b>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start min-w-[400px] max-w-full text-lg mq675:min-w-full">
          <div className="self-stretch relative leading-[150%]">
          Connectogen sets students up for success by providing a platform that connects them with experienced mentors and relevant projects within their institution. By facilitating these connections, students gain personalized guidance, real-world experience, and opportunities to build their skills in a supportive environment.

Through Connectogen, students can find the right mentors who offer advice, career insights, and academic support. They can also access meaningful projects that align with their interests, helping them apply what they’ve learned in real-world scenarios. Additionally, Connectogen fosters a strong network, allowing students to engage with a community of like-minded individuals and experts, opening doors for future collaborations and opportunities.

By empowering students to take control of their learning journey, Connectogen helps them gain practical experience and prepare for a successful future.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header1;
