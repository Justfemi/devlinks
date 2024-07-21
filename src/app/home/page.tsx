import LinkHeader from "../../components/LinkHeader";
import Image from "next/image";
import empty from "../../../public/images/home-empty.svg";
import phone from "../../../public/images/phoneLayout.svg";

export default function Home() {
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

            <button className="bg-transparent border border-purple rounded-lg text-purple py-2.5 w-full hover:bg-light-purple">
              + Add new link
            </button>

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
          </div>
          <div className="border-t border-light-grey flex py-5 px-10 sm:justify-end justify-center">
            <button className="bg-light-purple rounded-lg px-6 py-2.5 text-white text-base sm:w-auto w-full font-semibold hover:bg-purple-hover hover:shadow-custom">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}