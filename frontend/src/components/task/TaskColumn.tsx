// BIGGER + PREMIUM TaskColumn.tsx

import { useContext } from "react";

import {
  ClipboardList,
  CircleDashed,
  CheckCircle2,
} from "lucide-react";

import TaskCard from "./TaskCard";

import { TaskContext } from "../../context/TaskContext";

interface Props {
  title: string;
  status: string;
}

const TaskColumn = ({
  title,
  status,
}: Props) => {
  const taskContext =
    useContext(TaskContext);

  if (!taskContext) return null;

  const { tasks, loading } =
    taskContext;

  // ================= FILTER TASKS =================

  const filteredTasks = tasks
    .filter(
      (task) => task.status === status
    )
    .sort(
      (a, b) =>
        new Date(
          b.createdAt || ""
        ).getTime() -
        new Date(
          a.createdAt || ""
        ).getTime()
    );

  // ================= DYNAMIC STYLES =================

  const getStyles = () => {
    switch (status) {
      case "todo":
        return {
          icon: (
            <ClipboardList size={24} />
          ),

          color: "bg-violet-500",

          light:
            "bg-violet-500/10 text-violet-300 border-violet-500/20",

          glow:
            "shadow-violet-500/10",
        };

      case "inprogress":
        return {
          icon: (
            <CircleDashed size={24} />
          ),

          color: "bg-yellow-500",

          light:
            "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",

          glow:
            "shadow-yellow-500/10",
        };

      default:
        return {
          icon: (
            <CheckCircle2 size={24} />
          ),

          color: "bg-emerald-500",

          light:
            "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

          glow:
            "shadow-emerald-500/10",
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`w-[940px] min-w-[100px] h-[calc(120vh-170px)] rounded-[0px] border border-white/10 bg-[#0B1120]/95 backdrop-blur-2xl overflow-hidden flex flex-col shadow-2xl ${styles.glow}`}
    >
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between px-9 py-8 border-b border-white/10 bg-white/[0.03]">
        {/* Left */}
        <div className="flex items-center gap-5">
          {/* Icon */}
          <div
            className={`w-16 h-16 rounded-[24px] border flex items-center justify-center shadow-lg ${styles.light}`}
          >
            {styles.icon}
          </div>

          {/* Text */}
          <div>
            <h2 className="text-[34px] font-black tracking-tight leading-none">
              {title}
            </h2>

            <p className="text-[15px] text-gray-400 mt-3">
              {
                filteredTasks.length
              }{" "}
              Active Tasks
            </p>
          </div>
        </div>

        {/* Count */}
        <div
          className={`min-w-[60px] h-[60px] rounded-[22px] ${styles.color} flex items-center justify-center text-black font-black text-xl shadow-xl`}
        >
          {filteredTasks.length}
        </div>
      </div>

      {/* ================= TASK AREA ================= */}

      <div className="flex-1 overflow-y-auto px-7 py-7 scrollbar-hide">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-14 h-14 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin"></div>
          </div>
        ) : filteredTasks.length ===
          0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-10">
            {/* Icon */}
            <div
              className={`w-24 h-24 rounded-[28px] border flex items-center justify-center mb-7 shadow-xl ${styles.light}`}
            >
              {styles.icon}
            </div>

            {/* Text */}
            <h3 className="text-3xl font-black">
              No Tasks Found
            </h3>

            <p className="text-gray-400 mt-4 text-[15px] leading-7 max-w-[280px]">
              Add tasks to this section and
              start managing your workflow.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-7 pb-4">
            {filteredTasks.map(
              (task) => (
                <TaskCard
                  key={task._id}
                  id={task._id}
                  title={task.title}
                  description={
                    task.description
                  }
                  priority={
                    task.priority
                  }
                  status={task.status}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;