import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { LoggedInRes } from "../types";
import { userFetchService } from "../BackendServices/userFetchServices";
import { useNavigate } from "react-router-dom";

export default function VeificationPage() {
  // const params = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState<LoggedInRes>({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async () => {
    const fetches = new userFetchService();
    const verify = await fetches.VerifyOTP({
      email: user.email as string,
      otp: otp,
    });
    if (verify.status === 200) {
      alert(verify.message);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } else {
      alert(verify.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string) as LoggedInRes;
    // console.log(`user in state`, user)
    if (!user.email) {
      navigate("/");
    }
    setUser(user);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold text-center mb-4">
          Verify Your Account
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Enter the OTP sent to your email
        </p>
        <input
          type="text"
          value={otp}
          onChange={handleChange}
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full text-center tracking-widest text-lg focus:outline-none"
        />
        <button onClick={handleSubmit} className="w-full mt-4">
          Verify
        </button>
      </div>
    </div>
  );
}
