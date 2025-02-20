import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userFetchService } from "../BackendServices/userFetchServices";
import { LoggedInRes } from "../types";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onLogin = async () => {
    const userService = new userFetchService();
    const createdUser = await userService.Login({
      ...formData,
    });

    if (createdUser.status === 200) {
      let user: LoggedInRes;
      alert(createdUser.message);
      setTimeout(() => {
        if (createdUser.user_verified) {
          user = {
            token: createdUser?.token || "",
            id: createdUser?.id || "",
            user_verified: createdUser?.user_verified || false,
            email: formData.email || "",
            token2: createdUser?.token2 || "",
          };
          sessionStorage.setItem("user", JSON.stringify(user));
          navigate("/home");
        } else {
          user = {
            token: createdUser?.token || "",
            id: createdUser?.id || "",
            user_verified: createdUser?.user_verified || false,
            email: formData.email || "",
            token2: createdUser?.token2 || "",
          };
          sessionStorage.setItem("user", JSON.stringify(user));
          navigate(`/verify/${createdUser.token2}`);
        }
      }, 3000);
    } else {
      alert(createdUser.message);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-[50%] p-6 bg-white shadow-lg rounded-lg">
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
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="p-2 border rounded"
          onChange={onHandleChange}
        />
        <button
          onClick={onLogin}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
      <p className="mt-4 text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
