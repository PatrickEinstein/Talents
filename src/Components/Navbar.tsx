const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">Talents</h1>
      <div className="space-x-4">
        <a href="/login" className="no-underline">
          Login
        </a>
        <a href="/signup" className="">
          Sign Up
        </a>
        <a href="#about" className="">
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
