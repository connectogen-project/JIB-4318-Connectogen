import { FunctionComponent } from "react";
import Login1 from "../lib/components/Login1";


const Login: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-background-color-primary overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal]">
      <Login1 breakpoint="Desktop" 
      
      />
    </div>
  );
};

export default Login;
