"use client"
import { useRouter } from 'next/navigation';
import Image from "next/image";
import profile from "../../../public/images/profile.svg";
import { BsGithub } from 'react-icons/bs';
import { FaArrowRight, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Preview() {
  const router = useRouter();

  return (
    <main className="sm:bg-light-grey bg-white">
      <div className="p-6 sm:bg-purple h-80 rounded-b-custom-32 bg-white">
        <div className="flex items-center justify-between sm:p-4 p-0 bg-white rounded-xl w-full">
          <button
            className="sm:px-6 px-4 py-2.5 border border-purple text-purple rounded-lg font-semibold text-base hover:bg-light-purple"
            onClick={() =>  router.push('/home')}
          >
            Back to Editor
          </button>

          <button className="sm:px-6 p-4 py-2.5 bg-purple text-white rounded-lg font-semibold text-base">Share Link</button>
        </div>

        <div className='sm:py-12 py-6 xs:px-14 px-6 rounded-3xl sm:shadow-custom shadow-none bg-white mx-auto sm:w-[350px] w-full mt-24 text-center'>
          <div>
            <Image
              src={profile}
              alt="sample progfile picture"
              className='mx-auto mb-6'
            />
          </div>
          <h2 className="font-bold text-[32px] text-dark-grey">Ben Wright</h2>
          <p className='mb-14 text-base font-normal'>ben@example.com</p>

          <div className='bg-[#1A1A1A] text-white p-4 rounded-lg mb-5 cursor-pointer flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <BsGithub />
              <p className='text-base font-normal'>Github</p>
            </div>
            <FaArrowRight />
          </div>

          <div className='bg-[#EE3939] text-white p-4 rounded-lg mb-5 cursor-pointer flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <FaYoutube />
              <p className='text-base font-normal'>Youtube</p>
            </div>
            <FaArrowRight />
          </div>

          <div className='bg-[#2D68FF] text-white p-4 rounded-lg mb-5 cursor-pointer flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <FaLinkedin />
              <p className='text-base font-normal'>LinkedIn</p>
            </div>
            <FaArrowRight />
          </div>
        </div>
      </div>
    </main>
  )
}
