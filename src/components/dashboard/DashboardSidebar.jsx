"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import {
  FaBuilding,
  FaCalendarAlt,
  FaPlus,
  FaUsers,
  FaHome,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import logoLight from "../../../public/assets/logo-light.png";
import logoDark from "../../../public/assets/logo-dark.png";
import { useTheme } from "next-themes";
import ThemeToggle from "../ThemeToggle";

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    // Implement sign-out logic here
  };

  const vendorMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaUsers,
      href: "/dashboard/vendor",
    },
    {
      key: "Add Ticket",
      label: "Add Ticket",
      icon: FaBuilding,
      href: "/dashboard/vendor/Add Ticket",
    },
    {
      key: "My Added Tickets",
      label: "My Added Tickets",
      icon: FaPlus,
      href: "/dashboard/vendor/My Added Tickets",
    },
    {
      key: "Requested Bookings",
      label: "Requested Bookings",
      icon: FaCalendarAlt,
      href: "/dashboard/vendor/Requested Bookings",
    },
    {
      key: "Revenue Overview",
      label: "Revenue Overview",
      icon: FaUsers,
      href: "/dashboard/vendor/Revenue Overview",
    },
  ];

  const role = session?.user?.role || "vendor";
  const currentLogo = mounted && theme === "dark" ? logoDark : logoLight;

  return (
    <aside
      className={`h-screen sticky top-0 left-0 z-50 flex flex-col bg-slate-950/90 border-r border-white/5 backdrop-blur-xl transition-all duration-300 ease-in-out select-none ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Decorative Branding Glow Nodes */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#AAFFC7]/5 dark:bg-[#215B63]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#67C090]/5 dark:bg-[#67C090]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header/Action Strip */}
      <div className="h-20 px-4 border-b border-white/5 relative z-10 flex items-center gap-20 justify-between overflow-hidden shrink-0 ">
        <div
          className={`flex items-center gap-3 transition-opacity duration-200 ${isExpanded ? "" : "hidden"}`}
        >
          <Link href="/" className="block shrink-0">
            <Image
              src={currentLogo}
              alt="Tikify Logo"
              width={90}
              height={26}
              priority
              className="object-contain"
            />
          </Link>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer text-sm mx-auto "
        >
          <FaBars />
        </button>
      </div>

      {/* User Profile Slot */}
      <div className="p-4 border-b border-white/5 relative z-10 shrink-0 overflow-hidden">
        <div
          className={`flex items-center ${isExpanded ? "gap-3 justify-start" : "justify-center"}`}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#67C090]/60 shrink-0">
            <Image
              width={40}
              height={40}
              src={
                session?.user?.image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || "User")}&background=124170&color=fff&bold=true`
              }
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div
            className={`overflow-hidden transition-all duration-200 ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
          >
            <p className="text-white text-sm font-bold truncate leading-tight whitespace-nowrap">
              {session?.user?.name || "Tikify User"}
            </p>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#67C090] block mt-0.5">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Layer */}
      <nav className="flex-grow overflow-y-auto overflow-x-hidden px-3 py-4 space-y-1 relative z-10 custom-scrollbar">
        {isExpanded && (
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-3 pb-2 whitespace-nowrap transition-opacity duration-200">
            Navigation
          </p>
        )}
        {vendorMenu.map(({ key, label, icon: Icon, href }) => (
          <Link
            key={key}
            href={href}
            className={`w-full flex items-center rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150 group py-2.5 ${
              isExpanded ? "px-3 gap-3 justify-start" : "px-0 justify-center"
            }`}
            title={!isExpanded ? label : undefined}
          >
            <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/5 text-slate-400 group-hover:text-[#67C090] group-hover:bg-white/10 transition-all duration-150">
              <Icon size={16} />
            </span>
            <span
              className={`transition-all duration-200 whitespace-nowrap ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}
            >
              {label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer Utilities */}
      <div className="p-3 border-t border-white/5 space-y-1 relative z-10 shrink-0">
        <div
          className={`flex items-center py-1 transition-all ${isExpanded ? "mb-2 ml-2" : "mb-0 justify-center"}`}
        >
          <ThemeToggle />
        </div>

        <Link
          href="/"
          className={`w-full flex items-center rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150 py-2.5 ${
            isExpanded ? "px-3 gap-3 justify-start" : "px-0 justify-center"
          }`}
          title={!isExpanded ? "Back to Site" : undefined}
        >
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <FaHome size={14} />
          </span>
          <span
            className={`transition-all duration-200 whitespace-nowrap ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}
          >
            Back to Site
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer text-left py-2.5 ${
            isExpanded ? "px-3 gap-3 justify-start" : "px-0 justify-center"
          }`}
          title={!isExpanded ? "Sign Out" : undefined}
        >
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <FaSignOutAlt size={14} />
          </span>
          <span
            className={`transition-all duration-200 whitespace-nowrap ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}
          >
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
