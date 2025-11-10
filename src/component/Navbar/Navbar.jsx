import React, { useState } from 'react';

export default function NavbarBeforeAfterLogin({ initialLoggedIn = false, user = null }) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileOpen(false);
  };

  const NavLink = ({ href = '#', children }) => (
    <a
      href={href}
      className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
      onClick={() => setMobileOpen(false)}
    >
      {children}
    </a>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">BP</div>
              <span className="font-semibold text-lg">PayWise Bill</span>
            </a>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">Bills</NavLink>

            {!isLoggedIn ? (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 text-sm font-medium border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50"
                >
                  Register
                </a>
              </>
            ) : (
              <>
                <NavLink href="#">My Pay Bills</NavLink>

                {/* Profile avatar + dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen((s) => !s)}
                    className="flex items-center gap-2 focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={profileOpen}
                  >
                    <img
                      src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-20">
                      <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Right: mobile menu button and small-screen actions */}
          <div className="flex items-center md:hidden">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <a
                  href="/login"
                  className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-3 py-1 rounded-md text-sm border border-indigo-600 text-indigo-600"
                >
                  Register
                </a>
                <button onClick={() => setMobileOpen((s) => !s)} className="p-2 rounded-md focus:outline-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => setProfileOpen((s) => !s)} className="p-1 rounded-full focus:outline-none">
                  <img
                    src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                <button onClick={() => setMobileOpen((s) => !s)} className="p-2 rounded-md focus:outline-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-4 top-16 w-40 bg-white border rounded-md shadow-lg py-1 z-20">
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">Bills</NavLink>

            {!isLoggedIn ? (
              <>
                <a href="/login" className="block px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Login</a>
                <a href="/register" className="block px-3 py-2 rounded-md text-sm font-medium border border-indigo-600 text-indigo-600 hover:bg-indigo-50">Register</a>
              </>
            ) : (
              <>
                <NavLink href="#">My Pay Bills</NavLink>
                <a href="#" onClick={handleLogout} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Logout</a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
