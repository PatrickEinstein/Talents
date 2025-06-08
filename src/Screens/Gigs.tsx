import { BiCalendar, BiSearch } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import Button from "../Components/button";
import { useEffect, useState } from "react";
import { IMerchantAd } from "../types";
import { AdsFetches } from "../BackendServices/adsFetchServices";
import { JobDetails } from "../Pages/JobDetails";
import Loader from "../Components/Loader";

const Gigs = () => {
  const adsfetches = new AdsFetches();
  const [isOpenViewGig, SetIsOpenViewGig] = useState<boolean>(false);
  const [currentGig, setCurrentGig] = useState<IMerchantAd | null>(null);
  const [allAvailableAds, setAllAvailableAds] = useState<IMerchantAd[] | null>(
    null
  );
  const [loading, setIsLoading] = useState<boolean>(false);

  const getAllAds = async () => {
    setIsLoading(true);
    const allAvailableAds = await adsfetches.GetAllAvailableAds();
    setAllAvailableAds(allAvailableAds.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllAds();
  }, []);
  return (
    <div className="flex flex-col px-4 md:px-10 py-6 bg-gray-50 min-h-screen">
      <h3 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Explore Gigs
      </h3>

      <div className="w-full max-w-3xl mx-auto mb-10">
        <div className="flex items-center bg-white rounded-full shadow-md px-5 py-3">
          <input
            type="text"
            placeholder="Search gigs..."
            className="w-full focus:outline-none text-lg"
          />
          <BiSearch className="text-2xl text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {allAvailableAds?.map((gig, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <img
              src={gig.image}
              alt={gig.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {gig.title.slice(0, 20)}...
                  </h4>
                  <p className="text-sm text-gray-500">
                    {gig.by.slice(0, 20)}...
                  </p>
                </div>
                <Button
                  background="bg-blue-100"
                  extra="px-4 text-blue-600 font-medium"
                  label={`₦${gig.amount}`}
                  onClick={() => console.log("clicked")}
                />
              </div>

              <div className="flex justify-between mt-2">
                <span className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  <CiLocationOn className="text-lg" />
                  {gig.state}, {gig.city}
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  <BiCalendar className="text-lg" />
                  {new Date(gig.created_at).toLocaleDateString()}
                </span>
              </div>

              <Button
                label="View Job"
                background="bg-blue-500"
                extra="text-white font-medium h-[45px] mt-4 w-full hover:bg-blue-600 transition"
                onClick={() => {
                  setCurrentGig(gig);
                  SetIsOpenViewGig(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {isOpenViewGig && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-40 flex justify-center items-start pt-10 overflow-auto">
          <div className="">
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

export default Gigs;
