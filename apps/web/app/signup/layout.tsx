import { FunctionComponent } from "react";
import SignUp1 from "../lib/components/SignUp1";


const Signup: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-background-color-primary overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal]">
      <SignUp1
        breakpoint="Desktop"
        placeholderImage="/placeholder-image1@2x.png"
      />
    </div>
  );
};

export default Signup;
