import {
  Bell,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div className="h-[95px] pt-[18px] md:pt-0 border-b border-white/10 bg-[#050816]/95 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
      
      {/* Left */}
      <div>
        <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-1 text-xs md:text-sm">
          Welcome back 👋 Manage your
          tasks efficiently
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-5">
        
        {/* Search */}
        <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 focus-within:border-violet-500/40 transition-all rounded-2xl px-4 h-[54px] w-[320px]">
          
          <Search
            size={20}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500"
          />
        </div>

        {/* Notification */}
        <button className="relative w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-violet-600/20 hover:border-violet-500/20 transition-all duration-300 flex items-center justify-center">
          
          <Bell size={20} />

          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
        </button>

        {/* Settings */}
        <button className="w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500/20 transition-all duration-300 flex items-center justify-center">
          
          <Settings size={20} />
        </button>

        {/* User Card */}
        <div className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:border-violet-500/20 hover:bg-white/10 transition-all duration-300 rounded-3xl px-3 md:px-4 py-2 md:py-3 cursor-pointer">
          
          {/* Avatar */}
          <div className="relative">
            
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-blue-500 flex items-center justify-center text-lg md:text-2xl font-black shadow-xl">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </div>

            {/* Online */}
            <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-400 border-2 border-[#050816]"></div>
          </div>

          {/* Info */}
          <div className="hidden md:block">
            
            <div className="flex items-center gap-2">
              
              <h2 className="text-lg font-bold capitalize">
                {user?.name || "Guest"}
              </h2>

              <Sparkles
                size={16}
                className="text-yellow-400"
              />
            </div>

            <p className="text-gray-400 text-sm max-w-[180px] truncate">
              {user?.email ||
                "No email found"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;