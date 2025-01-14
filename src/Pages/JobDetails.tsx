import { BiCalendar, BiLocationPlus } from "react-icons/bi";
import { FcBriefcase } from "react-icons/fc";
import { PiCaretLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Button from "../Components/button";

export const JobDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 px-5 py-10 min-h-screen relative bg-gray-50">
      {/* Back Button */}
      <span
        onClick={() => navigate("/")}
        className="text-2xl font-extralight text-slate-500 cursor-pointer hover:text-slate-800 transition"
      >
        <PiCaretLeft />
      </span>

      {/* Job Title */}
      <h3 className="font-semibold text-3xl text-slate-800">
        Tech Sales Marketer/Manager
      </h3>

      {/* Job Details */}
      <div className="flex flex-col gap-4 text-slate-600">
        <div className="flex flex-row gap-4 items-center">
          <BiLocationPlus className="text-2xl text-slate-500" />
          <span className="text-lg">Fully Remote</span>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <BiCalendar className="text-2xl text-slate-500" />
          <span className="text-lg">Recurring</span>
        </div>
      </div>

      {/* Poster Details */}
      <div className="flex flex-row gap-5 items-center bg-white p-4 rounded-lg shadow-md">
        <FcBriefcase className="text-5xl" />
        <div>
          <span className="text-xl font-light text-slate-800">
            Posted by Olalekan
          </span>
        </div>
      </div>

      {/* Remuneration */}
      <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
        <span className="font-semibold text-lg text-slate-800">
          Remuneration
        </span>
        <span className="font-light text-lg text-slate-600">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(1000000)}{" "}
          per annum
        </span>
      </div>

      {/* Eligibility */}
      <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
        <span className="font-semibold text-lg text-slate-800">
          Eligibility
        </span>
        <span className="font-light text-lg text-slate-600">
          Entrepreneurs, business owners, and personal brands who need a website
          for their businesses and brands.
        </span>
      </div>

      {/* Job Description */}
      <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
        <span className="font-semibold text-lg text-slate-800">
          Job Description
        </span>
        <span className="font-light text-lg text-slate-600">
          Rewrite my ads as per Seun Zaza.
        </span>
      </div>

 
      <Button background="" onClick={()=>("")} label="Apply now" extra="absolute text-xl text-white font-semibold bg-blue-300 h-[70px] w-3/4 left-1/2 bottom-3 transform -translate-x-1/2 flex items-center justify-center rounded-lg shadow-md" />
    </div>
  );
};
