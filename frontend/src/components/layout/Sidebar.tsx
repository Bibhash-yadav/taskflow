// FULL RESPONSIVE Sidebar.tsx WITH HAMBURGER MENU
// Mobile + Tablet + Desktop Responsive

import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  LogOut,
  Bell,
  BarChart3,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <>
      {/* ================= MOBILE TOPBAR ================= */}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-[999] h-[75px] bg-[#050816]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-5">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>

        {/* Hamburger */}
        <button
          onClick={() =>
            setOpen(true)
          }
          className="w-12 h-12 rounded-[18px] bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* ================= OVERLAY ================= */}

      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]"
        ></div>
      )}

      {/* ================= SIDEBAR ================= */}

      <div
        className={`fixed lg:static top-0 left-0 z-[1000] h-screen w-[310px] bg-[#050816] border-r border-white/10 flex flex-col justify-between transition-all duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* ================= TOP ================= */}

        <div>
          {/* Logo */}
          <div className="h-[95px] px-7 flex items-center justify-between border-b border-white/10">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                TaskFlow
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Productivity Workspace
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Sparkle */}
              <div className="w-12 h-12 rounded-[18px] bg-violet-600/20 border border-violet-500/20 flex items-center justify-center">
                <Sparkles
                  size={22}
                  className="text-violet-400"
                />
              </div>

              {/* Close Mobile */}
              <button
                onClick={() =>
                  setOpen(false)
                }
                className="lg:hidden w-12 h-12 rounded-[18px] bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* ================= NAVIGATION ================= */}

          <div className="p-5 space-y-3 mt-4">
            {/* Dashboard */}
            <button className="group w-full flex items-center justify-between bg-violet-600/20 border border-violet-500/20 hover:bg-violet-600/30 transition-all duration-300 rounded-[24px] px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-[16px] bg-violet-500/20 flex items-center justify-center">
                  <LayoutDashboard
                    size={22}
                  />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold text-lg">
                    Dashboard
                  </h3>

                  <p className="text-xs text-gray-400">
                    Overview & analytics
                  </p>
                </div>
              </div>

              <div className="w-2 h-10 rounded-full bg-violet-500"></div>
            </button>

            {/* Tasks */}
            <button className="group w-full flex items-center gap-4 hover:bg-white/5 transition-all duration-300 rounded-[24px] px-5 py-4 border border-transparent hover:border-white/10">
              <div className="w-11 h-11 rounded-[16px] bg-white/5 flex items-center justify-center group-hover:bg-violet-500/20 transition">
                <CheckSquare
                  size={22}
                />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-lg">
                  Tasks
                </h3>

                <p className="text-xs text-gray-400">
                  Manage all tasks
                </p>
              </div>
            </button>

            {/* Analytics */}
            <button className="group w-full flex items-center gap-4 hover:bg-white/5 transition-all duration-300 rounded-[24px] px-5 py-4 border border-transparent hover:border-white/10">
              <div className="w-11 h-11 rounded-[16px] bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition">
                <BarChart3 size={22} />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-lg">
                  Analytics
                </h3>

                <p className="text-xs text-gray-400">
                  Productivity stats
                </p>
              </div>
            </button>

            {/* Notifications */}
            <button className="group w-full flex items-center gap-4 hover:bg-white/5 transition-all duration-300 rounded-[24px] px-5 py-4 border border-transparent hover:border-white/10">
              <div className="w-11 h-11 rounded-[16px] bg-white/5 flex items-center justify-center group-hover:bg-yellow-500/20 transition">
                <Bell size={22} />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-lg">
                  Notifications
                </h3>

                <p className="text-xs text-gray-400">
                  Alerts & updates
                </p>
              </div>
            </button>

            {/* Settings */}
            <button className="group w-full flex items-center gap-4 hover:bg-white/5 transition-all duration-300 rounded-[24px] px-5 py-4 border border-transparent hover:border-white/10">
              <div className="w-11 h-11 rounded-[16px] bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition">
                <Settings size={22} />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-lg">
                  Settings
                </h3>

                <p className="text-xs text-gray-400">
                  Account preferences
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* ================= LOGOUT ================= */}

        <div className="p-5">
          <button
            onClick={handleLogout}
            className="group w-full flex items-center gap-4 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 transition-all duration-300 rounded-[24px] px-5 py-4 text-red-400"
          >
            <div className="w-11 h-11 rounded-[16px] bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition">
              <LogOut size={22} />
            </div>

            <div className="text-left">
              <h3 className="font-semibold text-lg">
                Logout
              </h3>

              <p className="text-xs text-red-300/60">
                Sign out from account
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;