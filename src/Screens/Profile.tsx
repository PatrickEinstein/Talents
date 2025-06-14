import { BiBriefcase, BiCheck, BiHelpCircle } from "react-icons/bi";
import { BsBank, BsPersonDash, BsPersonFillCheck } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { PiCaretRightLight } from "react-icons/pi";

import { useContext } from "react";
import { AuthContext, AuthContextType } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const profileItems = [
  {
    name: "Profile Settings",
    link: "/profile",
    logo: <BsPersonDash />,
  },
  {
    name: "Payment Method",
    link: "/",
    logo: <BsBank />,
  },
  {
    name: "Privacy Policy",
    link: "/",
    logo: <BiBriefcase />,
  },
  {
    name: "Contact Us",
    link: "/",
    logo: <BiHelpCircle />,
  },
];

const Profile = () => {
  const { fulluser, Logout } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  
  const handleLogout = () => {
    Logout();
    navigate("/");
  };

   
  return (
    <div className="flex flex-col bg-gradient-to-b from-slate-100 to-slate-200 h-screen px-4 pb-10">
      <h3 className="text-center text-2xl font-bold text-slate-800 py-6">
        My Profile
      </h3>

      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 flex items-center justify-center bg-slate-400 rounded-full">
            <BsPersonFillCheck className="text-white text-3xl" />
            <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1 text-sm">
              <BiCheck />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800">
              {fulluser?.email}
            </span>
            <span className="text-sm text-slate-500">
              {fulluser?.firstName} {fulluser?.lastName}
            </span>
          </div>
        </div>
        <PiCaretRightLight className="text-slate-400 text-2xl" />
      </div>

      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow mb-6 text-center">
        <div>
          <p className="text-2xl font-bold text-slate-800">0</p>
          <p className="text-sm text-slate-500">Completed Gigs</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">₦0.00</p>
          <p className="text-sm text-slate-500">Total Earnings</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow divide-y divide-gray-200 overflow-hidden">
        {profileItems.map(({ name, link, logo }, index) => (
          <a
            key={index}
            href={link}
            className="flex items-center justify-between px-4 py-5 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl text-blue-500">{logo}</span>
              <span className="text-base text-slate-700">{name}</span>
            </div>
            <PiCaretRightLight className="text-slate-400 text-xl" />
          </a>
        ))}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-4 py-5 hover:bg-gray-50 transition text-left"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl text-blue-500">
              <IoLogOutOutline />
            </span>
            <span className="text-base text-slate-700">Logout</span>
          </div>
          <PiCaretRightLight className="text-slate-400 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
