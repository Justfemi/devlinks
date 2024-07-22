"use client"
import React, { useState } from 'react';
import { BsGithub, BsTwitter, BsFacebook, BsLinkedin, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FaYoutube } from 'react-icons/fa';

const platforms = [
  { name: 'Github', icon: <BsGithub /> },
  { name: 'Twitter', icon: <BsTwitter /> },
  { name: 'Facebook', icon: <BsFacebook /> },
  { name: 'LinkedIn', icon: <BsLinkedin /> },
  { name: 'Youtube', icon: <FaYoutube /> },
];

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (platform: { name: string; icon: JSX.Element }) => {
    setSelectedPlatform(platform);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-4 py-3 border border-[#D9D9D9] rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom flex items-center justify-between bg-white"
      >
        <div className="flex items-center">
          <span className="mr-3 text-lg">{selectedPlatform.icon}</span>
          {selectedPlatform.name}
        </div>
        <span className="ml-3 text-lg text-dark-grey">
          {isOpen ? <BsChevronUp /> : <BsChevronDown />}
        </span>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full z-10 rounded-xl bg-white ring-1 ring-purple ring-opacity-5">
          <div className="py-1">
            {platforms.map((platform, index) => (
              <p
                key={index}
                className="flex items-center px-6 py-2.5 text-base text-dark-grey hover:bg-light-purple cursor-pointer border-b"
                onClick={() => handleSelect(platform)}
              >
                <span className="mr-3 text-lg text-dark-grey">{platform.icon}</span>
                {platform.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
