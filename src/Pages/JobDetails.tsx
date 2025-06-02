import { BiCalendar, BiLocationPlus } from "react-icons/bi";
import { FcBriefcase } from "react-icons/fc";
import { PiCaretLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Button from "../Components/button";
import { IoCallOutline } from "react-icons/io5";
import { IMerchantAd, LoggedInRes } from "../types";
import { AdsFetches } from "../BackendServices/adsFetchServices";

interface IViewJobAdvert {
  SetIsOpenViewGig: React.Dispatch<React.SetStateAction<boolean>>;
  Gig: IMerchantAd;
}
export const JobDetails = ({ SetIsOpenViewGig, Gig }: IViewJobAdvert) => {
  const adsfetches = new AdsFetches();
  const navigate = useNavigate();

  const { id }: LoggedInRes = JSON.parse(
    localStorage.getItem("user") as string
  );

  const onApplytoJob = async () => {
    const appliedAds = await adsfetches.ApplyToAds(Gig.id);
    console.log(`appliedAds==>`, appliedAds);
    alert(`Successfully applied to ${Gig.title} by ${Gig.creatorName}`);
  };
  return (
    <div className="flex flex-col gap-6 px-4 py-6 max-w-lg max-h-[90vh] overflow-y-auto bg-gray-50 relative rounded-t-xl shadow-lg">
      <button
        onClick={() => SetIsOpenViewGig(false)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition text-base font-medium"
      >
        <PiCaretLeft className="text-2xl" />
        Back to Gigs
      </button>

      <div className="flex justify-between items-start gap-4">
        <h1 className="text-2xl font-bold text-slate-800">{Gig.title}</h1>
        <div
          onClick={() => navigate(`/chat?chat-id=${Gig.id}`)}
          className="min-w-[3.5rem] min-h-[3.5rem] bg-blue-500 hover:bg-blue-600 transition rounded-full flex items-center justify-center shadow-md cursor-pointer"
        >
          <IoCallOutline className="text-white text-2xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 text-slate-600 text-sm">
        <div className="flex items-center gap-2">
          <BiLocationPlus className="text-xl text-blue-500" />
          <span>{Gig.country}</span>
        </div>
        <div className="flex items-center gap-2">
          <BiCalendar className="text-xl text-blue-500" />
          <span>{Gig.workmode}</span>
        </div>
      </div>

      <img
        src={Gig.image}
        alt={Gig.title}
        className="w-full h-52 object-cover rounded-xl shadow-md"
      />

      <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
        <FcBriefcase className="text-3xl" />
        <span className="text-base font-medium text-slate-800">{Gig.by}</span>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-base font-semibold text-slate-800 mb-1">Amount</h2>
        <p className="text-slate-600 text-sm font-light">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(Gig.amount)}{" "}
          per annum
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-base font-semibold text-slate-800 mb-1">
          Eligibility
        </h2>
        <p className="text-slate-600 text-sm font-light">{Gig.eligibility}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-base font-semibold text-slate-800 mb-1">
          Job Description
        </h2>
        <p className="text-slate-600 text-sm font-light whitespace-pre-line">
          {Gig.description}
        </p>
      </div>

      {parseInt(id as string) !== parseInt(Gig.userId) && (
        <div className="sticky bottom-3 bg-gray-50 pt-3 pb-2 z-10">
          <Button
            background="bg-blue-500 hover:bg-blue-600"
            onClick={onApplytoJob}
            label="Apply Now"
            extra="text-white font-semibold h-[50px] w-full rounded-lg shadow-md text-base transition"
          />
        </div>
      )}
    </div>
  );
};
