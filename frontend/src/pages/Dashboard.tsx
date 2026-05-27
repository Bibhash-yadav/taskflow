// Full Updated Dashboard.tsx

import {
  useContext,
  useState,
} from "react";

import {
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import TaskColumn from "../components/task/TaskColumn";
import AddTaskModal from "../components/task/AddTaskModal";

import { TaskContext } from "../context/TaskContext";

const Dashboard = () => {
  const [open, setOpen] =
    useState(false);

  const taskContext =
    useContext(TaskContext);

  if (!taskContext) return null;

  const {
    totalTasks,
    todoTasks,
    progressTasks,
    doneTasks,
  } = taskContext;

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#020617] text-white">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Fixed Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto w-full px-3 sm:px-5 md:px-10 pb-10 pt-[320px] sm:pt-[260px] md:pt-10">
            
            <div className="space-y-8">
              
              {/* Banner */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700 px-5 sm:px-6 md:px-10 py-7 md:py-10 shadow-2xl">
                
                {/* Blur Effect */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/20 blur-3xl rounded-full"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  
                  {/* Left Side */}
                  <div className="w-full">
                    
                    {/* Top Badge */}
                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                      
                      <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md">
                        <LayoutDashboard size={28} />
                      </div>

                      <span className="bg-white/10 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold backdrop-blur-md">
                        Productivity Dashboard
                      </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight break-words">
                      Task Board
                    </h1>

                    {/* Description */}
                    <p className="text-gray-200 mt-4 text-sm sm:text-base md:text-xl max-w-3xl leading-relaxed">
                      Organize tasks, track progress,
                      and manage your workflow efficiently.
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() =>
                      setOpen(true)
                    }
                    className="w-full sm:w-auto group bg-white text-black hover:bg-gray-200 transition-all duration-300 px-6 md:px-8 py-4 rounded-2xl text-base md:text-lg font-bold shadow-2xl flex items-center justify-center gap-3 hover:scale-105"
                  >
                    <Sparkles
                      size={20}
                      className="group-hover:rotate-12 transition"
                    />

                    Add Task
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                
                {/* Total */}
                <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-6 backdrop-blur-md">
                  <p className="text-gray-400 text-sm mb-3">
                    Total Tasks
                  </p>

                  <h2 className="text-4xl md:text-5xl font-black">
                    {totalTasks}
                  </h2>
                </div>

                {/* Todo */}
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl px-6 py-6 backdrop-blur-md">
                  <p className="text-violet-300 text-sm mb-3">
                    To Do
                  </p>

                  <h2 className="text-4xl md:text-5xl font-black text-violet-200">
                    {todoTasks}
                  </h2>
                </div>

                {/* Progress */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl px-6 py-6 backdrop-blur-md">
                  <p className="text-yellow-300 text-sm mb-3">
                    In Progress
                  </p>

                  <h2 className="text-4xl md:text-5xl font-black text-yellow-200">
                    {progressTasks}
                  </h2>
                </div>

                {/* Done */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-6 backdrop-blur-md">
                  <p className="text-emerald-300 text-sm mb-3">
                    Completed
                  </p>

                  <h2 className="text-4xl md:text-5xl font-black text-emerald-200">
                    {doneTasks}
                  </h2>
                </div>
              </div>

              {/* Task Columns */}
              <div className="flex flex-col gap-8 pb-10">
                
                <TaskColumn
                  title="To Do"
                  status="todo"
                />

                <TaskColumn
                  title="In Progress"
                  status="inprogress"
                />

                <TaskColumn
                  title="Done"
                  status="done"
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>
  );
};

export default Dashboard;