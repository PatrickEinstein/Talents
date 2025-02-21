import { BiCalendar } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import Button from "../Components/button";
import { useEffect, useState } from "react";
import {  GigsTabsData } from "../constatnts";
import {
  AdStatus,
  IMerchantAd,
  MilestoneStatus,
  Remuneration,
  WorkMode,
} from "../types";
import { AdsFetches } from "../BackendServices/adsFetchServices";

const Gigs = () => {
  const [selectedTab, setSelectedTab] = useState("Manage");
  const adsfetches = new AdsFetches();
  const [allAvailableAds, setAllAvailableAds] = useState<IMerchantAd[]>([
    {
      id: "",
      userId: "",
      creatorName: "",
      country: "",
      state: "",
      city: "",
      status: AdStatus.Available,
      title: "",
      description: "",
      by: "",
      workmode: WorkMode.Hybrid,
      remuneration: Remuneration.Commission,
      amount: 0,
      image: "",
      eligibility: "",
      applied_talent: [""],
      hired_talent: "",
      milestones: [
        {
          title: "",
          description: "",
          amount: 0,
          status: MilestoneStatus.Pending,
        },
      ],
      created_at: "",
      updated_at: "",
    },
  ]);
  const getAllAds = async () => {
    const allAvailableAds = await adsfetches.GetAllAvailableAds();
    setAllAvailableAds(allAvailableAds.data);
    console.log(`All available`, allAvailableAds);
  };

  useEffect(() => {
    getAllAds();
  }, []);
  return (
    <div className="flex flex-col px-3 justify-center">
      <h3 className=" flex mx-auto text-2xl font-semibold py-5">Gigs</h3>
      <div>
        <div className="w-full bg-slate-300 h-[70px] mt-5 rounded-3xl flex flex-row justify-around items-center">
          {GigsTabsData.map(({ name }, index) => (
            <span
              key={index}
              onClick={() => setSelectedTab(`${name}`)}
              className={`${
                selectedTab == name ? "bg-white px-10 py-4 rounded-3xl " : ""
              }`}
            >
              {name}
            </span>
          ))}
        </div>

        <div className="pb-20">
          {allAvailableAds.map((gig, index) => (
            <div
              key={index}
              className="flex flex-col bg-white mt-5 px-5 py-8  gap-5 rounded-2xl w-full"
            >
              <div key={index} className="flex flex-row justify-between ">
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {gig.title.slice(0, 20)}...
                  </span>
                  <span className="text-slate-400">
                    {gig.by.slice(0, 20)}...
                  </span>
                </div>
                <div>
                  <Button
                    background="bg-blue-200"
                    extra="px-3 text-blue-500"
                    label={gig.amount.toString()}
                    onClick={() => console.log("clicked")}
                  />
                </div>
              </div>
              <img
                src={gig.image}
                alt={gig.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex flex-row justify-around">
                <span className="flex flex-row gap-2 bg-slate-200 rounded-2xl px-2 py-2 justify-center items-center text-slate-500">
                  <CiLocationOn />
                  {gig.state} {gig.city}
                </span>
                <span className="flex flex-row gap-2 bg-slate-200 rounded-2xl px-2 py-2 justify-center items-center text-slate-500">
                  <BiCalendar /> {new Date(gig.created_at).getMonth() + 1}/
                  {new Date(gig.created_at).getDate()}/
                  {new Date(gig.created_at).getFullYear()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
