const Navbar = ({
  isLoggedIn,
  Logout,
}: {
  isLoggedIn: boolean;
  Logout: () => void;
}) => {
  return (
    <nav className="bg-blue-950 p-4 text-white flex justify-between ps-10 pe-10">
      <a href="/" className="text-lg font-bold">
        Talent
      </a>
      <div className="space-x-4">
        <a href="/login" className="">
          Home
        </a>
        <a href="#about" className="">
          About
        </a>

        {!isLoggedIn && (
          <a href="/login" className="no-underline">
            Login
          </a>
        )}
        {!isLoggedIn && (
          <a href="/signup" className="">
            Sign Up
          </a>
        )}
        {isLoggedIn && (
          <a href="/" className="" onClick={Logout}>
            Log Out
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
