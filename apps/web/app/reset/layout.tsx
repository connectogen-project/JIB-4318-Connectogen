import { FunctionComponent } from "react";
import SignUp1 from "../lib/components/Reset";


const Reset: FunctionComponent = () => {
  return (
    <div className="relative bg-background-color-primary w-full overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal]">
      <SignUp1
        breakpoint="Desktop"
        placeholderImage="/placeholder-image1@2x.png"
        signUp7Flex="1"
        signUp7RowGap="20px"
        signUp7Height="unset"
        signUp7Width="unset"
      />
    </div>
  );
};

export default Reset;
