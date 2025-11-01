import { useAppContext } from "../../context/AppContext";
import {
  TiDocumentAdd,
} from "react-icons/ti";
import {
  MdOutlinePlaylistAddCheckCircle,
  MdOutlineLibraryAddCheck,
  MdLogout,
} from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();
  const [open, setOpen] = useState(false);

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: <TiDocumentAdd /> },
    { name: "Product List", path: "/seller/product-list", icon: <MdOutlinePlaylistAddCheckCircle /> },
    { name: "Orders", path: "/seller/orders", icon: <MdOutlineLibraryAddCheck /> },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout", { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#ffe9f3] via-[#f4f7ff] to-[#eaf5ff]">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 top-0 left-0 h-full transition-all duration-300 ease-in-out backdrop-blur-xl bg-white/40 shadow-lg border-r border-white/50
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 w-56 flex flex-col`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/40">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" className="h-10 rounded-lg shadow-md" />
            <h2 className="text-lg font-semibold text-gray-800 tracking-wide">Uphar</h2>
          </Link>
          <button className="md:hidden text-gray-700" onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col mt-4 px-3">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#c084fc]/40 to-[#60a5fa]/30 text-indigo-700 backdrop-blur-md shadow-sm"
                    : "text-gray-700 hover:bg-white/40 hover:text-indigo-700"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <p>{item.name}</p>
            </NavLink>
          ))}
        </div>

        <div className="mt-auto p-5 border-t border-white/40">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#818cf8] to-[#c084fc] text-white py-2 rounded-xl font-semibold hover:scale-[1.02] transition-transform"
          >
            <MdLogout /> Logout
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 backdrop-blur-xl bg-white/40 shadow-md border-b border-white/40 sticky top-0 z-30">
          <button
            className="md:hidden text-2xl text-gray-800"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-wide">
            Welcome Back 👋
          </h1>
          <div className="hidden md:flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/50"
              alt="profile"
              className="h-10 w-10 rounded-full border border-gray-300 shadow-sm"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60 min-h-[80vh] p-8 transition-all hover:shadow-2xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;

