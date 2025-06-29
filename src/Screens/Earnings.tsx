import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Earnings = () => {
  const [showAmount, setShowAmount] = useState(true);

  const amount = new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(2750);

  const toggleAmount = () => setShowAmount(!showAmount);

  return (
    <div className="w-full shadow-md px-4 md:px-10 bg-gray-50 py-6 min-h-screen">
      {/* Current Balance */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-300 rounded-xl p-5 flex  md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-col items-start">
          <span className="text-gray-800 font-medium text-sm md:text-base">
            Current Balance
          </span>

          <div className="text-4xl md:text-5xl font-bold text-gray-900 flex py-5">
            <sup className="text-sm mr-1 pt-3">NGN</sup>
            {showAmount ? amount : "********"}
          </div>
        </div>
        <button
          onClick={toggleAmount}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
          aria-label="Toggle visibility"
        >
          {showAmount ? (
            <IoEyeOutline className="text-2xl text-gray-700" />
          ) : (
            <IoEyeOffOutline className="text-2xl text-gray-700" />
          )}
        </button>
      </div>

      {/* Transaction History */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Transaction History
        </h3>
        <p className="text-sm text-gray-500">You have no transactions yet.</p>
      </div>
    </div>
  );
};

export default Earnings;
