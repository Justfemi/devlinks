"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import profile from "../../../public/images/profile.svg";
import { BsGithub, BsTwitter, BsFacebook, BsLinkedin  } from 'react-icons/bs';
import { FaArrowRight, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { db } from "../../../firebase";
import { collection, doc, getDocs, QuerySnapshot, DocumentData} from "@firebase/firestore";

interface Links {
  platform: string;
  url: string;
}

interface Item {
  id: string;
  links: Links[];
}

export default function Preview() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);

  const platformDetails: Record<string, { icon: JSX.Element, color: string }> = {
    Github: { icon: <BsGithub />, color: 'bg-black' },
    Twitter: { icon: <BsTwitter />, color: 'bg-red' },
    Facebook: { icon: <BsFacebook />, color: 'bg-blue' },
    LinkedIn: { icon: <BsLinkedin />, color: 'bg-green' },
    Youtube: { icon: <FaYoutube />, color: 'bg-brown' },
  };

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "items"));
      const itemsData: Item[] = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Item));
      setItems(itemsData);
    };

    fetchItems();
  }, []);

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
              alt="sample profile picture"
              className='mx-auto mb-6'
              priority
            />
          </div>
          <h2 className="font-bold text-[32px] text-dark-grey">Ben Wright</h2>
          <p className='mb-14 text-base font-normal'>ben@example.com</p>

          <div>
            {items.map((item) => (
              <div key={item.id}>
                {item.links.map((link, index) => {
                  const platformDetail = platformDetails[link.platform] || { icon: null, color: 'bg-white' };

                  return (
                    <div
                      className={`text-white ${platformDetail.color} rounded-lg mb-5 p-3 cursor-pointer flex items-center justify-between w-full`}
                      key={index}
                    >
                      {/* <Link href={link.url} passHref> */}
                      <div className='flex items-center gap-2'>
                        {platformDetail.icon}
                        <p className='text-base font-normal'>{link.platform}</p>
                      </div>

                      <div>
                        <FaArrowRight />
                      </div>
                      {/* </Link> */}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
