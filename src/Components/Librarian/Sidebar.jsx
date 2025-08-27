import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiSettings } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { RiBookShelfLine } from "react-icons/ri";
import { LogoutButton } from "../../Utills/logout";
import { TbListDetails } from "react-icons/tb";
import { FcAbout } from "react-icons/fc";

export default function Sidebar() {
  const [role, setRole] = useState("borrower"); 
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "borrower";
    setRole(storedRole.toLowerCase());
  }, []);

  const menuItems = {
    librarian: [
      { icon: <FiHome />, label: "Dashboard", to: "/dashboard" },
      { icon: <RiBookShelfLine />, label: "Books", to: "/dashboard/books" },
      { icon: <CiCirclePlus />, label: "Add Books", to: "/dashboard/addBooks" },
      { icon: <FcAbout />, label: "About Us", to: "/dashboard/about-us" }
    ],
    borrower: [
      { icon: <FiHome />, label: "Dashboard", to: "/dashboard" },
      { icon: <RiBookShelfLine />, label: "Available Books", to: "/dashboard/books" },
      { icon: <TbListDetails />, label: "My Records", to: "/dashboard/my-records" },
      { icon: <FiSettings />, label: "Profile", to: "/dashboard/profile" },
      { icon: <FcAbout />, label: "About Us", to: "/dashboard/about-us" }
    ],
  };

  const items = menuItems[role] || [];

  return (
    <div className="bg-blue-200 h-screen hidden md:flex flex-col w-64 fixed top-0 left-0 z-50">
      <div className="flex items-center px-4 py-4">
        <img className="w-16 h-16" src="/libraryLogo.jpg" alt="Library Logo" />
        <h1 className="text-2xl font-bold text-black ml-2">Library Hub</h1>
      </div>
      <hr className="border-black mb-4" />

      <nav className="flex flex-col gap-4 p-4 text-gray-400 flex-grow">
        {items.map((item) => (
          <SidebarItem key={item.to} {...item} currentPath={location.pathname} />
        ))}

        <div className="mt-auto">
          <hr className="border-black mb-4" />
          <LogoutButton />
        </div>
      </nav>
    </div>
  );
}

function SidebarItem({ icon, label, to, currentPath }) {
  const isActive = currentPath === to;
  const baseClass = "flex items-center gap-2 py-2 px-2 text-black";
  const activeClass = isActive ? "bg-blue-500 text-white rounded" : "";

  return (
    <Link to={to} className={`${baseClass} ${activeClass}`}>
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export { SidebarItem };