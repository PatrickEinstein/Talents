import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          required
          className="p-2 border rounded"
        />
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
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
