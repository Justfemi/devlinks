"use client"
import LinkHeader from "../../components/LinkHeader";
import Dropdown from "../../components/Dropdown";
import Image from "next/image";
import empty from "../../../public/images/home-empty.svg";
import phone from "../../../public/images/phoneLayout.svg";
import { MdDragHandle } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { BsGithub, BsTwitter, BsFacebook, BsLinkedin, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FaYoutube } from 'react-icons/fa';
import { useState, FormEvent, MouseEvent, ChangeEvent, FocusEvent} from "react";
// firebase import
import db from "../../firebase/firestore";
import { collection, addDoc } from "@firebase/firestore";

// import { getTokens } from "next-firebase-auth-edge";
// import { cookies } from "next/headers";
// import { notFound } from "next/navigation";
// import { clientConfig, serverConfig } from "../../../config";

type Link = {
  id: number;
  platform: string;
  url: string;
  error: string;
  platformError: string;
};

const platforms = [
  { name: 'Github', icon: <BsGithub /> },
  { name: 'Twitter', icon: <BsTwitter /> },
  { name: 'Facebook', icon: <BsFacebook /> },
  { name: 'LinkedIn', icon: <BsLinkedin /> },
  { name: 'Youtube', icon: <FaYoutube /> },
];

export default function Home() {
  const [isLinkAdded, setIsLinkAdded] = useState<boolean>(true);
  const [links, setLinks] = useState<Link[]>([]);
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [availablePlatforms, setAvailablePlatforms] = useState(platforms);

//   useEffect(() => {
//     const fetchTokens = async () => {
//     try {
//       const tokens = await getTokens(cookies(), {
//         apiKey: clientConfig.apiKey,
//         cookieName: serverConfig.cookieName,
//         cookieSignatureKeys: serverConfig.cookieSignatureKeys,
//         serviceAccount: serverConfig.serviceAccount,
//       });

//       if (!tokens) {
//         notFound();
//       }
//     } catch (error) {
//       console.error('Error fetching tokens:', error);
//     }
//   };

//   fetchTokens();
// }, []); 
  
  const handleAddLink = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (isLinkAdded) {
      setIsLinkAdded(false);
    }
    if (availablePlatforms.length > 0) {
      setLinks((prevLinks) => [
        ...prevLinks,
        { id: prevLinks.length + 1, platform: "", url: "", error: '', platformError: '' }
      ]);
    }
  };
  
  const handleRemoveLink = (id: number): void => {
    setLinks((prevLinks) => {
      const updatedLinks = prevLinks
        .filter((link) => link.id !== id)
        .map((link, index) => ({ ...link, id: index + 1 }));
      
      setAvailablePlatforms([...platforms]); // Reset the available platforms
      updatedLinks.forEach(link => {
        setAvailablePlatforms((prevPlatforms) =>
          prevPlatforms.filter(platform => platform.name !== link.platform)
        );
      });

      if (updatedLinks.length === 0) {
        setIsLinkAdded(true);
      }

      return updatedLinks;
    });
  };
  
  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>, id: number): void => {
    const newUrl = event.target.value;
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, url: newUrl, error: '' } : link
      )
    );
  };
  
  const handlePlatformChange = (platform: string, id: number): void => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, platform: platform } : link
      )
    );
    setAvailablePlatforms((prevPlatforms) =>
      prevPlatforms.filter((p) => p.name !== platform)
    );
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const validateUrl = (event: FocusEvent<HTMLInputElement>, id: number): void => {
    const newUrl = event.target.value;
    if (!isValidUrl(newUrl)) {
      setError('Please check the URL.');
    } else {
      setError('');
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, url: newUrl } : link
        )
      );
    }
  };

  const handlePostLinks = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    let valid = true;
    const updatedLinks = links.map((link) => {
      let urlError = '';
      let platformError = '';

      if (!link.url) {
        urlError = 'URL can\'t be empty.';
        valid = false;
      } else if (!isValidUrl(link.url)) {
        urlError = 'Invalid URL.';
        valid = false;
      }

      if (!link.platform) {
        platformError = 'Platform must be selected.';
        valid = false;
      }

      return { ...link, error: urlError, platformError: platformError };
    });

    setLinks(updatedLinks);

    if (!valid) return;

    // Handle the submission logic here
    console.log('Links:', links);
    // Create the object with only platforms and URLs
    // const postData = links.map(link => ({
    //   platform: link.platform,
    //   url: link.url
    // }));

    // Send the object to the endpoint
    // try {
    //   const response = await fetch('YOUR_ENDPOINT_URL', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(postData)
    //   });

    //   if (response.ok) {
    //     console.log('Links posted successfully:', postData);
    //     // Handle successful response
    //   } else {
    //     console.error('Failed to post links:', response.statusText);
    //     // Handle error response
    //   }
    // } catch (error) {
    //   console.error('An error occurred:', error);
    //   // Handle network error
    // }
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
            priority
          />
        </div>
        <div className="bg-white lg:w-2/3 w-full rounded-xl">
          <div className="sm:p-10 p-5">
            <h2 className="text-dark-grey font-bold text-[32px]">Customize your links</h2>
            <p className="text-grey font-normal text-base mb-10 mt-2">Add/edit/remove links below and then share all your profiles with the world!</p>
            {/* <p>
              Only <strong>{tokens?.decodedToken.email}</strong> holds the magic key to this kingdom!
            </p> */}
            <button 
              className="bg-transparent border border-purple rounded-lg text-purple py-2.5 w-full hover:bg-light-purple"
              onClick={handleAddLink}
              disabled={availablePlatforms.length === 0}
            >
              + Add new link
            </button>
            <form onSubmit={handlePostLinks}>
              {
                isLinkAdded && links.length === 0 ? (
                  <div className="mt-6 bg-light-grey rounded-xl flex flex-col items-center justify-center w-full text-center py-4 px-5">
                    <Image 
                      src={empty}
                      alt="image for empty state"
                      className="my-10"
                      priority
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
                        <Dropdown 
                          selectedPlatform={link.platform}
                          onPlatformChange={(platform) => handlePlatformChange(platform, link.id)}
                          availablePlatforms={availablePlatforms}
                        />
                        {link.platformError && <p className="text-red-500">{link.platformError}</p>}
                      </div>

                      <div className="relative flex flex-col">
                        <label className="text-[#333] font-normal text-xs mb-1">Link</label>
                        <div className="absolute bottom-1/4 transform -translate-y-1/6 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLink />
                        </div>
                        <input 
                          type="url" 
                          value={link.url}
                          onChange={(e) => handleUrlChange(e, link.id)}
                          placeholder="e.g. https://www.github.com/johnappleseed"
                          className="pl-9 pr-4 py-3 border border-[#D9D9D9] rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom"
                        />
                        {link.error && <p className="absolute right-3 bottom-1/4 transform -translate-y-1/6 text-red-500">{link.error}</p>}
                      </div>
                    </div>
                  ))
                )
              }
            </form>
          </div>
          <div className="border-t border-light-grey flex py-5 px-10 sm:justify-end justify-center">
            <button
              type='submit'
              className={`${isLinkAdded ? 'bg-light-purple' : 'bg-purple'} rounded-lg px-6 py-2.5 text-white text-base sm:w-auto w-full font-semibold hover:bg-purple-hover hover:shadow-custom`}
              onClick={handlePostLinks}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}