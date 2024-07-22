"use client"
import LinkHeader from "../../components/LinkHeader";
import Dropdown from "../../components/Dropdown";
import Image from "next/image";
import empty from "../../../public/images/home-empty.svg";
import phone from "../../../public/images/phoneLayout.svg";
import { MdDragHandle } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { useState, MouseEvent } from "react";

type Link = {
  id: number;
};

export default function Home() {
  const [isLinkAdded, setIsLinkAdded] = useState<boolean>(true);
  const [links, setLinks] = useState<Link[]>([]);

  const handleAddLink = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (isLinkAdded) {
      setIsLinkAdded(false);
    }
    setLinks((prevLinks) => [
      ...prevLinks,
      { id: prevLinks.length + 1 }
    ]);
  };

  const handleRemoveLink = (id: number): void => {
    setLinks((prevLinks) => {
      const updatedLinks = prevLinks
        .filter((link) => link.id !== id)
        .map((link, index) => ({ ...link, id: index + 1 }));

      if (updatedLinks.length === 0) {
        setIsLinkAdded(true);
      }

      return updatedLinks;
    });
  };

  return (
    <div className="bg-light-purple sm:p-6  p-0">
      <LinkHeader />
      <div className="flex gap-6 justify-between items-start mt-6 sm:p-0 p-6">
        <div className="bg-white w-1/3 rounded-xl p-6 hidden lg:block">
          <Image
            src={phone}
            alt="phone layout for no links"
            className="mx-auto my-14"
          />
        </div>
        <div className="bg-white lg:w-2/3 w-full rounded-xl">
          <div className="sm:p-10 p-5">
            <h2 className="text-dark-grey font-bold text-[32px]">Customize your links</h2>
            <p className="text-grey font-normal text-base mb-10 mt-2">Add/edit/remove links below and then share all your profiles with the world!</p>

            <button 
              className="bg-transparent border border-purple rounded-lg text-purple py-2.5 w-full hover:bg-light-purple"
              onClick={handleAddLink}
            >
              + Add new link
            </button>

            {
              isLinkAdded && links.length === 0 ? (
                <div className="mt-6 bg-light-grey rounded-xl flex flex-col items-center justify-center w-full text-center py-4 px-5">
                  <Image 
                    src={empty}
                    alt="image for empty state"
                    className="my-10"
                  />
                  <div className="sm:w-3/4 w-full">
                    <h2 className="text-dark-grey font-bold text-[32px]">Let’s get you started</h2>
                    <p className="text-grey font-normal text-base my-5">
                      Use the “Add new link” button to get started. Once you have more than one link,
                      you can reorder and edit them. We’re here to help you share your profiles with everyone!
                    </p>
                  </div>
                </div>
              ) : (
                links.map((link) => (
                  <div className="bg-light-grey rounded-xl p-5 mt-6" key={link.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-grey">
                        <MdDragHandle className="cursor-move"/>
                        <p className="text-base font-bold">Link #{link.id}</p>
                      </div>

                      <p 
                        className="cursor-pointer text-base font-normal text-grey hover:text-purple"
                        onClick={() => handleRemoveLink(link.id)}
                      >
                        Remove
                      </p>
                    </div>

                    <div className="w-full flex flex-col my-3">
                      <label className="text-[#333] font-normal text-xs mb-1">Platform</label>
                      <Dropdown />
                    </div>

                    <div className="relative flex flex-col">
                      <label className="text-[#333] font-normal text-xs mb-1">Link</label>
                      <div className="absolute bottom-1/4 transform -translate-y-1/6 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLink />
                      </div>
                      <input 
                        type="url" 
                        placeholder="e.g. https://www.github.com/johnappleseed"
                        className="pl-9 pr-4 py-3 border border-[#D9D9D9] rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom"
                      />
                    </div>
                  </div>
                ))
              )}
          </div>
          <div className="border-t border-light-grey flex py-5 px-10 sm:justify-end justify-center">
            <button className={`${isLinkAdded ? 'bg-light-purple' : 'bg-purple'} rounded-lg px-6 py-2.5 text-white text-base sm:w-auto w-full font-semibold hover:bg-purple-hover hover:shadow-custom`}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}