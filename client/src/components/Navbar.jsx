import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios } = useAppContext();

  // ✅ Logout
  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout');
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate('/');
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Close user menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Navigate when searching
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-gray-200 bg-white relative z-50">
      
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-16 w-auto rounded-full" src="/images/logo.png" alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="flex items-center gap-6">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        {/* More Dropdown (Hover) */}
        <div className="relative group">
          <button className="hover:text-primary transition font-medium">
            More ▾
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 group-hover:opacity-100 invisible group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-300 origin-top">
            <NavLink to="/gift-reminder" className="block px-4 py-2 hover:bg-gray-100 transition">Gift Reminder</NavLink>
            <NavLink to="/secret-sender" className="block px-4 py-2 hover:bg-gray-100 transition">Secret Sender</NavLink>
            <NavLink to="/hybrid-gifting" className="block px-4 py-2 hover:bg-gray-100 transition">Hybrid Gifting</NavLink>
          </div>
        </div>

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <CiSearch />
        </div>

        {/* Cart */}
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <FaShoppingCart />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] flex items-center justify-center rounded-full">
            {getCartCount()}
          </span>
        </div>

        {/* ✅ User / Login */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-primary hover:bg-primary/90 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div ref={userMenuRef} className="relative">
            <CgProfile
              className="w-8 h-8 cursor-pointer"
              onClick={() => setUserMenu(!userMenu)}
            />
            {userMenu && (
              <ul
                className="absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-32 rounded-md text-sm z-40"
              >
                <li
                  onClick={() => {
                    navigate("/myorders");
                    setUserMenu(false);
                  }}
                  className="p-2 hover:bg-primary/10 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={() => {
                    logout();
                    setUserMenu(false);
                  }}
                  className="p-2 hover:bg-primary/10 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
        {open ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col gap-4 px-6 text-sm sm:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
          {user && <NavLink to="/myorders" onClick={() => setOpen(false)}>My Orders</NavLink>}
          <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

          {/* More section on mobile */}
          <div>
            <p className="font-medium">More ▾</p>
            <div className="mt-2 flex flex-col gap-2">
              <NavLink to="/gift-reminder" onClick={() => setOpen(false)} className="block px-2 py-1 hover:bg-gray-100 rounded">Gift Reminder</NavLink>
              <NavLink to="/secret-sender" onClick={() => setOpen(false)} className="block px-2 py-1 hover:bg-gray-100 rounded">Secret Sender</NavLink>
              <NavLink to="/hybrid-gifting" onClick={() => setOpen(false)} className="block px-2 py-1 hover:bg-gray-100 rounded">Hybrid Gifting</NavLink>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 px-3 rounded-full">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search"
            />
            <CiSearch />
          </div>

          {!user ? (
            <button onClick={() => { setOpen(false); setShowUserLogin(true); }} className="px-6 py-2 bg-primary hover:bg-primary/90 transition text-white rounded-full text-sm">Login</button>
          ) : (
            <button onClick={logout} className="px-6 py-2 bg-primary hover:bg-primary/90 transition text-white rounded-full text-sm">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;


