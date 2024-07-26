"use client"
import { useRef, useState, useEffect, FormEvent } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import Image from "next/image";
import empty from "../../../public/images/home-empty.svg";
import phone from "../../../public/images/phoneLayout.svg";
import { BsGithub, BsTwitter, BsFacebook, BsLinkedin } from 'react-icons/bs';
import { FaArrowRight, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { IoImageOutline } from "react-icons/io5";
import Link from "next/link";
import { db, storage } from "../../../firebase";
import { collection, doc, getDocs, addDoc } from "@firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { toast } from 'react-toastify';

interface Links {
  platform: string;
  url: string;
}

interface Item {
  id: string;
  links: Links[];
}

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureURL: string;
}

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const router = useRouter();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const platformDetails: Record<string, { icon: JSX.Element, color: string }> = {
    Github: { icon: <BsGithub />, color: 'bg-black' },
    Twitter: { icon: <BsTwitter />, color: 'bg-red' },
    Facebook: { icon: <BsFacebook />, color: 'bg-blue' },
    LinkedIn: { icon: <BsLinkedin />, color: 'bg-green' },
    Youtube: { icon: <FaYoutube />, color: 'bg-brown' },
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
      setProfilePicture(file);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const itemsData: Item[] = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Item));
      setItems(itemsData);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const profilesData: UserProfile[] = [];
      querySnapshot.forEach((doc) => {
        profilesData.push({ id: doc.id, ...doc.data() } as UserProfile);
      });
      setProfiles(profilesData);
    };

    fetchProfiles();
  }, []);

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = "First name can't be empty";
    if (!lastName) newErrors.lastName = "Last name can't be empty";
    if (!email) newErrors.email = "Email can't be empty";
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!profilePicture) {
      alert('Please upload a profile picture');
      return;
    }

    try {
      // Upload profile picture to Firebase Storage
      const profilePictureRef = ref(storage, `profile_pictures/${profilePicture.name}`);
      await uploadBytes(profilePictureRef, profilePicture);
      const profilePictureURL = await getDownloadURL(profilePictureRef);

      // Save user profile to Firestore
      await addDoc(collection(db, 'users'), {
        firstName,
        lastName,
        email,
        profilePictureURL,
      });

      toast.success('User profile saved successfully!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setProfilePicture(null);
      setErrors({});
    } catch (error) {
      console.error('Error saving user profile:', error);
      toast.error("Error updating profile, please try again");
    }
  };

  return (
    <>
      <div className="bg-light-purple sm:p-6 p-0">
        <ProfileHeader />
        <div className="flex gap-6 justify-between items-start mt-6 sm:p-0 p-6">
          <div className="relative bg-white w-1/3 rounded-xl p-6 hidden lg:block">
            <Image
              src={phone}
              alt="phone layout for no links"
              className="mx-auto my-10"
            />
            <div className="absolute top-1/2 transform -translate-y-11 left-18 translate-x-16">
              {profiles.map((profile) => (
                <div key={profile.id}>
                  <h1>Profile Test</h1>
                  <p>{profile.firstName}</p>
                  <p>{profile.lastName}</p>
                  <p>{profile.email}</p>
                  <div className="w-[200px] h-[200px] rounded-full border-2 border-purple">
                    <Image
                      src={profile.profilePictureURL} 
                      alt={`${profile.firstName}'s profile`} 
                      className="w-full object-cover"
                      priority
                    />
                  </div>
                </div>
              ))}
              {items.map((item) => (
                <div key={item.id}>
                  {item.links.map((link, index) => {
                    const platformDetail = platformDetails[link.platform] || { icon: null, color: 'bg-white' };

                    return (
                      <Link href={link.url} passHref key={index}>
                        <div
                          className={`text-white ${platformDetail.color} rounded-lg mb-5 p-3 cursor-pointer flex items-center justify-between w-[250px]`}
                        >
                          <div className='flex items-center gap-2'>
                            {platformDetail.icon}
                            <p className='text-base font-normal'>{link.platform}</p>
                          </div>

                          <div>
                            <FaArrowRight />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white lg:w-2/3 w-full rounded-xl">
            <div className="sm:p-10 p-4">
              <h2 className="text-dark-grey font-bold text-[32px]">Profile Details</h2>
              <p className="text-grey font-normal text-base mb-10 mt-2">Add your details to create a personal touch to your profile.</p>

              <div className="bg-light-grey rounded-xl sm:p-5 p-3 flex sm:flex-row flex-col gap-1 sm:items-center items-start justify-between">
                <p className="text-grey font-normal text-base">Profile picture</p>
                <div 
                  onClick={handleButtonClick}
                  className="relative cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="bg-light-purple text-purple rounded-xl w-[190px] h-[190px] flex flex-col items-center justify-center">
                    {imageURL ? (
                      <>
                        <Image 
                          src={imageURL} 
                          alt="Selected" 
                          width={190}
                          height={190}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        {isHovered && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col items-center justify-center rounded-xl">
                            <IoImageOutline className="text-2xl" />
                            <p className="text-base font-semibold">Change Image</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <IoImageOutline className="text-2xl" />
                        <p className="text-base font-semibold">+ Upload Image</p>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-grey font-normal text-xs">Image must be below 1024x1024px. Use PNG or JPG format.</p>
              </div>

              <div className="mt-6 sm:p-5 p-3 bg-light-grey rounded-xl">
                <div className="flex sm:items-center items-start justify-between gap-4 mb-3 sm:flex-row flex-col">
                  <p className="text-base font-normal text-grey sm:w-60 w-auto">First name * </p>
                  <input 
                    type="text"
                    placeholder="e.g. John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="px-4 py-3 border border-[#D9D9D9] rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom"
                  />
                </div>

                <div className="flex sm:items-center items-start justify-between gap-4 mb-3 sm:flex-row flex-col">
                  <p className="text-base font-normal text-grey sm:w-60 w-auto">Last name * </p>
                  <input 
                    type="text"
                    placeholder="e.g. Appleseed"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="px-4 py-3 border border-[#D9D9D9] rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom"
                  />
                </div>

                <div className="flex sm:items-center items-start justify-between gap-4 mb-3 sm:flex-row flex-col">
                  <p className="text-base font-normal text-grey sm:w-60 w-auto">Email </p>
                  <input 
                    type="email"
                    placeholder="e.g. email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 border border-[#D9D9D9] rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom"
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-light-grey flex py-5 px-10 sm:justify-end justify-center">
              <button 
                className="bg-purple rounded-lg px-6 py-2.5 text-white text-base sm:w-auto w-full font-semibold hover:bg-purple-hover hover:shadow-custom"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}