import { BiBriefcase, BiWallet } from "react-icons/bi";
import { CgMenuBoxed } from "react-icons/cg";
import { RiProfileLine } from "react-icons/ri";
import Home from "../Screens/Home";
import Gigs from "../Screens/Gigs";
import Earnings from "../Screens/Earnings";
import Profile from "../Screens/Profile";
import { useState } from "react";
import { AuthContext, AuthContextType } from "../Contexts/AuthContext";
import { useCallback, useContext, useEffect } from "react";
import { BiBell, BiCalendar } from "react-icons/bi";

const bottomBarList = [
  { name: "Home", link: "/home", logo: <CgMenuBoxed />, index: 0 },
  { name: "Gigs", link: "/gigs", logo: <BiBriefcase />, index: 1 },
  { name: "Earnings", link: "/earnings", logo: <BiWallet />, index: 2 },
  { name: "Profile", link: "/profile", logo: <RiProfileLine />, index: 3 },
];

const Main = () => {
  const { fulluser } = useContext(AuthContext) as AuthContextType;

  const [currentTab, setCurrentTab] = useState<number>(0);

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return <Home />;
      case 1:
        return <Gigs />;
      case 2:
        return <Earnings />;
      case 3:
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Desktop Top Nav */}
      <div className="hidden md:flex justify-between items-center bg-white px-10 py-4 shadow-md  top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-500 text-white text-2xl font-bold rounded-full flex items-center justify-center">
            OM
          </div>
          <div>
            <p>Welcome 👋</p>
            <p className="font-extrabold">{fulluser?.lastName}</p>
          </div>
        </div>

        <div className="flex gap-10">
          {bottomBarList.map(({ name, logo, index: id }) => (
            <button
              key={id}
              onClick={() => setCurrentTab(id)}
              className={`flex items-center gap-2 text-sm font-medium transition-all ${
                currentTab === id
                  ? "text-blue-600 border-b-2 border-blue-500 pb-1"
                  : "text-gray-500 hover:text-blue-400"
              }`}
            >
              <span className="text-xl">{logo}</span>
              <span>{name}</span>
            </button>
          ))}

          <div className="w-16 h-16 text-2xl bg-white text-black flex items-center justify-center rounded-full">
            <BiBell />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pb-20 md:pb-0">{renderTabContent()}</div>

      <div className="fixed bottom-0 w-full bg-white shadow-md px-5 py-3 flex justify-between md:hidden z-40">
        {bottomBarList.map(({ name, logo, index: id }) => (
          <button
            key={id}
            onClick={() => setCurrentTab(id)}
            className="flex flex-col items-center justify-center text-center text-sm focus:outline-none"
          >
            <span
              className={`${
                currentTab === id ? "text-blue-500" : "text-slate-400"
              } text-xl`}
            >
              {logo}
            </span>
            <span
              className={`${
                currentTab === id
                  ? "text-blue-600 font-semibold"
                  : "text-slate-500"
              } text-xs mt-1`}
            >
              {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Main;
