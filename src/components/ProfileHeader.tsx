"use client"
import { useRouter } from 'next/navigation';
import logo from "../../public/images/logo.svg";
import logoText from "../../public/images/devlink.svg";
import { CgProfile } from "react-icons/cg";
import { FaLink } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md"; 
import Link from "next/link";
import Image from "next/image";

export default function ProfileHeader() {
  const router = useRouter();

  return (
    <div className="bg-white sm:rounded-xl rounded-none flex items-center p-4 justify-between">
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
        <Link href="/home">
          <div
            className="flex items-center gap-1 cursor-pointer rounded-lg px-6 py-2.5 text-grey hover:text-purple"
          >
            <FaLink />
            <p className="text-base font-semibold hidden sm:block">Links</p>
          </div>
        </Link>

        <Link href="/profile">
          <div 
            className="flex items-center gap-1 cursor-pointer rounded-lg px-6 py-2.5 bg-light-purple text-purple hover:text-purple"
          >
            <CgProfile className="text-xl"/>
            <p className="text-base font-semibold hidden sm:block">Profile Details</p>
          </div>
        </Link>
      </div>

      <div className="">
        <button 
          className="border border-purple rounded-lg px-6 py-2.5 text-purple text-base font-semibold hover:bg-light-purple hidden sm:block"
          onClick={() =>  router.push('/preview')}
        >
          Preview
        </button>

        <button 
          className="border border-purple rounded-lg px-6 py-2.5 text-purple text-base font-semibold hover:bg-light-purple sm:hidden block"
          onClick={() =>  router.push('/preview')}
        >
          <MdOutlineRemoveRedEye />
        </button>
      </div>
    </div>
  )
}
