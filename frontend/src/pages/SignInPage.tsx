import { SigninForm } from "@/components/auth/signin-form";
import React from "react";

const SignInPage= () =>{
    return (
       <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 absolute inset-0 z-0 " style={{
         background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
       }}>
         <div className="w-full max-w-sm md:max-w-4xl">
           <SigninForm />
         </div>
       </div>
     )
}

export default SignInPage