import { FunctionComponent } from "react";
import Header1 from "../lib/components/Header1";
import Layout from "../lib/components/Layout";



const About: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-background-color-primary overflow-hidden flex flex-col items-start justify-start gap-[0.5px] leading-[normal] tracking-[normal]">
      <Header1 breakpoint="Desktop" />
      <Layout />
    </div>
  );
};

export default About;
