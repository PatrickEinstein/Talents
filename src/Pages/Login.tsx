import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto mt-[50%] p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
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
