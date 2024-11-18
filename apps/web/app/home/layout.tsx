import { FunctionComponent } from "react";
import Header from "../lib/components/Header";

const Home: FunctionComponent = () => {
  return (
    <div className="relative bg-background-color-primary w-full overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal]">
      <Header breakpoint="Desktop" />
    </div>
  );
};

export default Home;
