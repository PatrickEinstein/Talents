import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userFetchService } from "../BackendServices/userFetchServices";
import { LoggedInRes } from "../types";
import Loader from "../Components/Loader";
import { GoEyeClosed } from "react-icons/go";

const LoginPage = () => {
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onLogin = async () => {
    setLoading(true);
    const userService = new userFetchService();
    const createdUser = await userService.Login({
      ...formData,
    });
    console.log(`Loggin in user==>`, createdUser);
    if (createdUser.status === 200) {
      let user: LoggedInRes;
      alert(createdUser.message);
      if (createdUser.user_verified) {
        user = {
          token: createdUser?.token || "",
          id: createdUser?.id || "",
          user_verified: createdUser?.user_verified || false,
          email: formData.email || "",
          token2: createdUser?.token2 || "",
        };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else if (!createdUser.user_verified) {
        user = {
          token: createdUser?.token || "",
          id: createdUser?.id || "",
          user_verified: createdUser?.user_verified || false,
          email: formData.email || "",
          token2: createdUser?.token2 || "",
        };
        localStorage.setItem("user", JSON.stringify(user));
        navigate(`/verify/${createdUser.token2}`);
      } else {
        setLoading(false);
        return;
      }
    } else {
      alert(createdUser.message);
      setLoading(false);
      return;
    }
    setLoading(false);
  };
  return (
    <div className="max-w-md mx-auto mt-[25%] md:mt-[10%] p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-2 border rounded"
          onChange={onHandleChange}
        />
        <div className="flex flex-row justify-between items-center">
          <input
            name="password"
            type={viewPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="p-2 border rounded w-[90%]"
            onChange={onHandleChange}
          />
          <GoEyeClosed onClick={() => setViewPassword((prev) => !prev)} />
        </div>
        <button
          onClick={onLogin}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
        <p className="mt-4 text-sm">
          <Link to="/forgot-password" className="text-blue-500">
            forgot password?
          </Link>
        </p>
      </div>
      <Loader isLoading={loading} />
    </div>
  );
};

export default LoginPage;
