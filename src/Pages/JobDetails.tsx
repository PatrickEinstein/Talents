import { BiCalendar, BiLocationPlus } from "react-icons/bi";
import { FcBriefcase } from "react-icons/fc";
import { PiCaretLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Button from "../Components/button";
import { IoCallOutline } from "react-icons/io5";
import { IGigToEdit } from "../types";

interface IViewJobAdvert {
  SetIsOpenViewGig: React.Dispatch<React.SetStateAction<boolean>>;
  Gig: IGigToEdit;
}
export const JobDetails = ({ SetIsOpenViewGig, Gig }: IViewJobAdvert) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8 px-5 py-10 min-h-screen relative bg-gray-50">
      {/* Back Button */}
      <span
        onClick={()=>SetIsOpenViewGig((prev) => !prev)}
        className="text-2xl font-extralight text-slate-500 cursor-pointer hover:text-slate-800 transition"
      >
        <PiCaretLeft />
      </span>

      <div className="flex flex-row justify-between">
        {/* Job Title */}
        <h3 className="font-semibold text-3xl text-slate-800">
          {Gig.title}
        </h3>

        <div className="flex justify-center items-center bg-blue-500 rounded-full h-[70px] w-[70px] px-5">
          <IoCallOutline
            className="text-4xl text-white"
            onClick={() => navigate(`/chat?chat-id=${Gig.index}`)}
          />
        </div>
      </div>

      {/* Job Details */}
      <div className="flex flex-col gap-4 text-slate-600">
        <div className="flex flex-row gap-4 items-center">
          <BiLocationPlus className="text-2xl text-slate-500" />
          <span className="text-lg">{Gig.location}</span>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <BiCalendar className="text-2xl text-slate-500" />
          <span className="text-lg">{Gig.mode}</span>
        </div>
      </div>

      {/* Poster Details */}
      <div className="flex flex-row gap-5 items-center bg-white p-4 rounded-lg shadow-md">
        <FcBriefcase className="text-5xl" />
        <div>
          <span className="text-xl font-light text-slate-800">
            {Gig.by}
          </span>
        </div>
      </div>

      {/* Remuneration */}
      <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
        <span className="font-semibold text-lg text-slate-800">
          Amount
        </span>
        <span className="font-light text-lg text-slate-600">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(parseInt(Gig.amount))}{" "}
          per annum
        </span>
      </div>

      {/* Eligibility */}
      <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
        <span className="font-semibold text-lg text-slate-800">
          Eligibility
        </span>
        <span className="font-light text-lg text-slate-600">
         {Gig.eligibility}
        </span>
      </div>

      {/* Job Description */}
      <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
        <span className="font-semibold text-lg text-slate-800">
          Job Description
        </span>
        <span className="font-light text-lg text-slate-600">
         {Gig.description}
        </span>
      </div>

      <Button
        background=""
        onClick={() => ""}
        label="Apply now"
        extra="absolute text-xl text-white font-semibold bg-blue-300 h-[70px] w-3/4 left-1/2 bottom-3 transform -translate-x-1/2 flex items-center justify-center rounded-lg shadow-md"
      />
    </div>
  );
};
