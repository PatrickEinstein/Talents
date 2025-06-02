import { useCallback, useContext, useEffect, useState } from "react";
import { BiBell, BiCalendar } from "react-icons/bi";
import { CiBellOn, CiLocationOn } from "react-icons/ci";

import Button from "../Components/button";
import { TabsData } from "../constatnts";

import CreateJobAdvert from "./CreateGig";
import { MdAddBusiness } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { CgTrashEmpty } from "react-icons/cg";
import EditJobAdvert from "./EditGig";
import { IMerchantAd } from "../types";
import { JobDetails } from "../Pages/JobDetails";
import { AdsFetches } from "../BackendServices/adsFetchServices";
import { AuthContext, AuthContextType } from "../Contexts/AuthContext";
import Loader from "../Components/Loader";

const Home = () => {
  const { fulluser } = useContext(AuthContext) as AuthContextType;
  const adsfetches = new AdsFetches();
  const [allUserOwnAds, setAllUserOwnAds] = useState<IMerchantAd[] | null>(
    null
  );

  const userOwnAds = useCallback(async () => {
    setIsLoading(true);
    const userAds = await adsfetches.getUserAds();
    setAllUserOwnAds(userAds.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    userOwnAds();
  }, []);
  const [selectedTab, setSelectedTab] = useState("Manage");
  const [isOpenCreateGig, SetIsOpenCreateGig] = useState<boolean>(false);
  const [isOpenEditGig, SetIsOpenEditGig] = useState<boolean>(false);
  const [isOpenViewGig, SetIsOpenViewGig] = useState<boolean>(false);
  const [currentGig, setCurrentGig] = useState<IMerchantAd | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const renderTypesOfGigs = () => {
    switch (selectedTab) {
      case "Manage":
        return allUserOwnAds;
      case "Active":
        return allUserOwnAds;
      default:
        return allUserOwnAds;
    }
  };

  const DeleteGig = async (id: string) => {
    setIsLoading(true);
    const deletedGig = await adsfetches.DeleteAds(id);
    userOwnAds();
    setIsLoading(false);
    alert(deletedGig.message);
  };

  return (
    <div className="py-10 px-3 md:px-10 lg:px-20 max-w-7xl mx-auto justify-between ">
      {/* Header
      <div className="flex flex-row justify-between items-center gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-500 text-white text-2xl font-bold rounded-full flex items-center justify-center">
            OM
          </div>
          <div>
            <p>Welcome 👋</p>
            <p className="font-extrabold">{fulluser?.lastName}</p>
          </div>
        </div>
        <div className="w-16 h-16 text-2xl bg-white text-black flex items-center justify-center rounded-full">
          <BiBell />
        </div>
      </div> */}

      {/* Profile Setup */}
      <div className="flex flex-row justify-between items-center px-6 py-6 bg-gradient-to-r from-blue-900 to-blue-500 mt-10 rounded-2xl gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-extrabold text-white">
            Complete profile setup
          </h3>
          <p className="text-white font-extralight">
            You're one step closer to securing your next gig
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CiBellOn className="text-lime-300 text-3xl" />
          <Button
            background="bg-white"
            extra="font-semibold px-6"
            label="Complete"
            onClick={() => console.log("clicked")}
          />
        </div>
      </div>

      {/* Tabs Container */}
      <div className="w-full bg-slate-300 rounded-3xl flex items-center px-4 md:px-8 py-3 md:py-4 gap-4 mt-10">
        {/* Tabs */}
        <div className="flex flex-1 gap-4">
          {TabsData.map(({ name }, index) => (
            <button
              key={index}
              onClick={() => setSelectedTab(name)}
              className={`
          flex-grow
          text-center
          cursor-pointer
          text-gray-700
          text-sm md:text-lg
          font-medium
          py-2 md:py-3
          rounded-3xl
          
          ${
            selectedTab === name
              ? "bg-white w-16 shadow-md text-blue-600 font-semibold"
              : " hover:text-blue-600"
          }
        `}
              aria-pressed={selectedTab === name}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Create Gig CTA */}
        <button
          onClick={() => SetIsOpenCreateGig((prev) => !prev)}
          className="flex justify-center items-center gap-3 bg-gradient-to-r from-teal-500 to-blue-400 shadow-lg text-white text-lg md:text-xl font-semibold rounded-3xl h-[50px] px-6 md:px-8 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap"
          aria-label="Create Gig"
        >
          <MdAddBusiness />
          <span>Create Gig</span>
        </button>
      </div>

      {/* Gig Cards */}
      <div className="pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
        {renderTypesOfGigs()?.map((gig, index) => {
          const formattedDate = new Date(gig.created_at).toLocaleDateString();
          return (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg w-full shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5">
                <div className="flex flex-col">
                  <h3 className="text-base font-semibold text-gray-800">
                    {gig.title}
                  </h3>
                  <p className="text-sm text-gray-400 truncate">
                    {gig.creatorName}
                  </p>
                </div>
                <Button
                  background="bg-blue-100"
                  extra="px-4 py-1 text-blue-600 text-sm font-medium"
                  label={`₦${gig.amount}`}
                  onClick={() => console.log("clicked")}
                />
              </div>

              {/* Image */}
              <div className="mt-4">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Location & Date */}
              <div className="flex flex-wrap justify-between items-center px-5 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                  <CiLocationOn className="text-blue-500" />
                  <span>
                    {gig.state}, {gig.city}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full mt-1 md:mt-0">
                  <BiCalendar className="text-blue-500" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              {/* Manage Options */}
              {selectedTab === "Manage" && (
                <div className="flex justify-between items-center px-5 mt-4 text-sm">
                  <span
                    onClick={() => {
                      setCurrentGig(gig);
                      SetIsOpenEditGig((prev) => !prev);
                    }}
                    className="flex items-center gap-1 text-blue-600 cursor-pointer hover:underline"
                  >
                    <FiEdit3 />
                    Edit
                  </span>
                  <span
                    onClick={() => DeleteGig(gig.id)}
                    className="flex items-center gap-1 text-red-500 cursor-pointer hover:underline"
                  >
                    <CgTrashEmpty />
                    Delete
                  </span>
                </div>
              )}

              {/* View Button */}
              <div className="px-5 py-4 mt-auto">
                <Button
                  label="View Job"
                  background="bg-blue-500"
                  extra="w-full text-white hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => {
                    setCurrentGig(gig);
                    SetIsOpenViewGig((prev) => !prev);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {isOpenCreateGig && (
        <div className="fixed inset-0 bg-black/60 z-40 flex justify-center items-start pt-10">
          <div className="bg-blue-100 w-full max-w-lg rounded-xl p-4 overflow-y-auto max-h-[90vh]">
            <CreateJobAdvert SetIsOpenCreateGig={SetIsOpenCreateGig} />
          </div>
        </div>
      )}

      {isOpenEditGig && (
        <div className="fixed inset-0 bg-black/60 z-40 flex justify-center items-start pt-10">
          <div className="bg-blue-100 w-full max-w-lg rounded-xl p-4 overflow-y-auto max-h-[90vh]">
            <EditJobAdvert
              SetIsOpenEditGig={SetIsOpenEditGig}
              Gig={currentGig as IMerchantAd}
              userOwnAds={userOwnAds}
            />
          </div>
        </div>
      )}

      {isOpenViewGig && (
        <div className="fixed inset-0 bg-black/60 z-40 flex justify-center items-start pt-10">
          <div className="bg-blue-100 w-full max-w-lg rounded-xl p-4 overflow-y-auto max-h-[85vh]">
            <JobDetails
              SetIsOpenViewGig={SetIsOpenViewGig}
              Gig={currentGig as IMerchantAd}
            />
          </div>
        </div>
      )}

      <Loader isLoading={loading} />
    </div>
  );
};

export default Home;
