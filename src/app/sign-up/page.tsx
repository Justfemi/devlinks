"use client"
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import logo from "../../../public/images/logo.svg";
import logoText from "../../../public/images/devlink.svg";
import lock from "../../../public/images/padlock.svg";
import envelope from "../../../public/images/mail.svg";


export default function Signup() {
  const router = useRouter();

  // const handleSignUp = () => {
  //   router.push('/');
  // }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
      <div className="my-10">
        <div className="flex items-center justify-center gap-1 mb-[50px]">
          <div className="w-7 h-7">
            <Image 
              src={logo}
              alt="devlink logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-25 h-4">
            <Image
              src={logoText}
              alt="devlink"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-white sm:p-10 p-8 rounded-xl">
          <h3 className="text-[#333] font-bold text-[32px] mb-2">Create account</h3>
          <p className="text-[#737373] font-normal text-base mb-4">Let’s get you started sharing your links!</p>
          <form action="#">
            <div className="relative flex flex-col">
              <label className="text-[#333] font-normal text-xs mb-1">Email Address</label>
              <div className="absolute bottom-1/4 transform -translate-y-1/6 left-0 pl-3 flex items-center pointer-events-none">
                <Image 
                  src={envelope}
                  alt="envelope icon for email"
                />
              </div>
              <input 
                type="email" 
                placeholder="e.g. alex@email.com"
                className="pl-9 pr-4 py-3 border border-[#D9D9D9] rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom"
              />
            </div>

            <div className="relative flex flex-col my-6">
              <label className="text-[#333] font-normal text-xs mb-1">Create password</label>
              <div className="absolute bottom-1/4 transform -translate-y-1/6 left-0 pl-3 flex items-center pointer-events-none">
                <Image 
                  src={lock}
                  alt="lock icon for password"
                />
              </div>
              <input 
                type="password"
                placeholder="Enter your password"
                className="pl-9 pr-4 py-3 border border-[#D9D9D9] rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom"
              />
            </div>

            <div className="relative flex flex-col my-6">
              <label className="text-[#333] font-normal text-xs mb-1">Confirm password</label>
              <div className="absolute bottom-1/4 transform -translate-y-1/6 left-0 pl-3 flex items-center pointer-events-none">
                <Image 
                  src={lock}
                  alt="lock icon for password"
                />
              </div>
              <input 
                type="password"
                placeholder="Enter your password"
                className="pl-9 pr-4 py-3 border border-[#D9D9D9] rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom"
              />
            </div>

            <p className="text-[#737373] text-xs font-normal">Password must contain at least 8 characters</p>

            <button 
              type="button"
              className="w-full bg-purple text-white p-3 rounded-lg font-normal text-base my-6 hover:shadow-custom hover:bg-[#BEADFF]"
              onClick={() =>  router.push('/')}
            >
              Create new account
            </button>

            <p className="text-center font-normal text-base text-[#737373]">Already have an account? 
              <Link href="/" className="text-purple ml-1">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
