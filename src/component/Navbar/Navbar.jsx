import React, { useState, useContext } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
// NOTE: in typical React apps use 'react-router-dom' for Link — if you are using react-router v6+ use:
import { Link } from "react-router"; // keep if your project uses this; otherwise change to 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {})
      .catch(() => {});
  };

  // helper to get the best available profile picture
  const profileImage =
    user?.photoURL || user?.providerData?.[0]?.photoURL || "https://i.ibb.co/0yP2NQy/default-user.png";

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">BP</div>
            <span className="hidden sm:inline">PayWise Bill</span>
          </Link>
        </div>

        {/* Center: Menu */}
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex space-x-6 font-medium items-center">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/bills" className="hover:text-blue-500">Bills</Link></li>

            {/* ADDED: Add Bill link */}
            <li><Link to="/add-bill" className="hover:text-blue-500">Add Bill</Link></li>

            {user && (
              <li><Link to="/mypaybills" className="hover:text-blue-500">My Pay Bills</Link></li>
            )}
            <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
          </ul>
        </div>

        {/* Right: User / Login */}
        <div className="flex-shrink-0 relative flex items-center gap-3">
          {user ? (
            <div className="group inline-block relative">
              <img
                src={profileImage}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-400"
              />
              {/* Dropdown (shows on hover) */}
              <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-44">
                <Link to="/profile" className="block px-4 py-2 hover:bg-blue-50">Profile</Link>
                <Link to="/add-bill" className="block px-4 py-2 hover:bg-blue-50">Add Bill</Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Link
                to="/login"
                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <FaUser /> <span className="hidden sm:inline">Login</span>
              </Link>
              <Link
                to="/register"
                className="border border-blue-500 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 flex items-center gap-2"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-blue-600 ml-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-3 py-4 font-medium">
            <li><Link to="/" onClick={() => setMenuOpen(false)} className="w-full text-center">Home</Link></li>
            <li><Link to="/bills" onClick={() => setMenuOpen(false)} className="w-full text-center">Bills</Link></li>

            {/* ADDED: mobile Add Bill link */}
            <li><Link to="/add-bill" onClick={() => setMenuOpen(false)} className="w-full text-center">Add Bill</Link></li>

            {user && (
              <li><Link to="/mypaybills" onClick={() => setMenuOpen(false)} className="w-full text-center">My Pay Bills</Link></li>
            )}
            <li><Link to="/about" onClick={() => setMenuOpen(false)} className="w-full text-center">About</Link></li>

            <div className="w-full border-t mt-2 pt-3 flex flex-col items-center">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="w-40 text-center">Profile</Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMenuOpen(false);
                    }}
                    className="w-40 text-center text-red-600 mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-40 text-center"
                  >
                    <div className="flex items-center justify-center gap-2"><FaUser /> Login</div>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg w-40 text-center mt-2"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
