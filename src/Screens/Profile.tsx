import { BiCheck } from "react-icons/bi";
import { BsPersonFillCheck } from "react-icons/bs";
import { PiCaretRightLight } from "react-icons/pi";

const Profile = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-slate-300 to-slate-200 h-screen px-3">
      <h3 className=" flex mx-auto text-2xl font-semibold py-5">Profile</h3>
      <div className="flex flex-row justify-between">
        <div className="flex items-center bg-slate-400 rounded-xl justify-center relative h-[60px] w-[60px]">
          <BsPersonFillCheck className="text-slate-200 text-4xl" />
          <span className="flex justify-center p-1 bg-blue-700 rounded-full text-white absolute -bottom-3 -right-3">
            <BiCheck />
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Olalekan Mohammed</span>
          <span className="font-light text-slate-400">mohammedola1234@gmail.com</span>
        </div>
        <PiCaretRightLight className="text-slate-400 text-2xl"/>
      </div>
    </div>
  );
};

export default Profile;
