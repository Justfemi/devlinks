import logo from "../../public/images/logo.svg";
import logoText from "../../public/images/devlink.svg";
import { CircleUserRound, Eye, Link } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-white rounded-xl flex items-center p-4 justify-between">
      <div className="flex items-center gap-1">
        <div className="w-7 h-7">
          <Image 
            src={logo}
            alt="devlink logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-25 h-4 hidden sm:block">
          <Image
            src={logoText}
            alt="devlink"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-light-purple rounded-lg px-6 py-2.5 text-purple cursor-pointer flex items-center gap-1">
          <Link />
          <p className="text-base font-semibold hidden sm:block">Links</p>
        </div>

        <div className="flex items-center gap-1 cursor-pointer text-grey hover:text-purple">
          <CircleUserRound />
          <p className="text-base font-semibold hidden sm:block">Profile Details</p>
        </div>
      </div>

      <div className="">
        <button className="border border-purple rounded-lg px-6 py-2.5 text-purple text-base font-semibold hover:bg-light-purple hidden sm:block">
          Preview
        </button>

        <button className="border border-purple rounded-lg px-6 py-2.5 text-purple text-base font-semibold hover:bg-light-purple sm:hidden block">
          <Eye />
        </button>
      </div>
    </div>
  )
}
