import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { carouselsImages } from "../../constants/constants";
import { AuthContext, AuthContextType } from "../Contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { Login } = useContext(AuthContext) as unknown as AuthContextType;
  const [currentIndex, _] = useState(0);

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
    const loginAction = await Login(formData);
    if (loginAction.user_verified) {
      navigate("/home");
    } else {
      navigate(`/verify/${loginAction.token2}`);
    }
    setLoading(false);
  };
  return (
    <div className="relative flex flex-col  justify-center h-screen text-center bg-gray-100 overflow-hidden">
      <div className="inset-0 w-full h-full">
        {carouselsImages.map(({ img }, index) => (
          <img
            src={img}
            key={index}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white bg-opacity-95 p-8 rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">
          <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
          <button className="w-full bg-white border border-gray-300 text-gray-700 p-2 rounded mb-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="flex flex-col gap-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="p-2 border rounded"
              onChange={onHandleChange}
            />

            <div className="relative ">
              <input
                name="password"
                type={viewPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="p-2 border rounded w-full pr-10"
                onChange={onHandleChange}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setViewPassword((prev) => !prev)}
              >
                {viewPassword ? <GoEye /> : <GoEyeClosed />}
              </span>
            </div>

            <button
              onClick={onLogin}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Login
            </button>
          </div>
          <div className="flex justify-between">
            <small className="mt-4 text-sm text-blue-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Sign up
              </Link>
            </small>
            <small className="mt-4 text-sm ">
              <Link to="/forgot-password" className="text-blue-600">
                Forgot password?
              </Link>
            </small>
          </div>
        </div>
      </div>
      <Loader isLoading={loading} />
    </div>
  );
};

export default LoginPage;

// const userService = new userFetchService();
// const createdUser = await userService.Login({
//   ...formData,
// });
// console.log(`Loggin in user==>`, createdUser);
// if (createdUser.status === 200) {
//   let user: LoggedInRes;
//   alert(createdUser.message);
//   if (createdUser.user_verified) {
//     user = {
//       token: createdUser?.token || "",
//       id: createdUser?.id || "",
//       user_verified: createdUser?.user_verified || false,
//       email: formData.email || "",
//       token2: createdUser?.token2 || "",
//     };
//     localStorage.setItem("user", JSON.stringify(user));
//     navigate("/home");
//   } else if (!createdUser.user_verified) {
//     user = {
//       token: createdUser?.token || "",
//       id: createdUser?.id || "",
//       user_verified: createdUser?.user_verified || false,
//       email: formData.email || "",
//       token2: createdUser?.token2 || "",
//     };
//     localStorage.setItem("user", JSON.stringify(user));
//     navigate(`/verify/${createdUser.token2}`);
//   } else {
//     setLoading(false);
//     return;
//   }
// } else {
//   alert(createdUser.message);
//   setLoading(false);
//   return;
// }
