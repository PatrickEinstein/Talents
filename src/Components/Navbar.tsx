import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="bg-blue-500 p-4 text-white flex justify-between">
        <h1 className="text-lg font-bold">Talents</h1>
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </div>
      </nav>
    );
  }

  export default Navbar