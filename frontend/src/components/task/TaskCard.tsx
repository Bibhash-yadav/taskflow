// PERFECT MODERN TaskCard.tsx

import {
  Flag,
  Clock3,
  ArrowRight,
  CheckCircle2,
  Trash2,
  Pencil,
} from "lucide-react";

import {
  updateTask,
  deleteTask,
} from "../../api/task.api";

import {
  useContext,
  useState,
} from "react";

import { TaskContext } from "../../context/TaskContext";

import EditTaskModal from "./EditTaskModal";

interface Props {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
}

const TaskCard = ({
  id,
  title,
  description,
  priority,
  status,
}: Props) => {
  const taskContext =
    useContext(TaskContext);

  if (!taskContext) return null;

  const { tasks, setTasks } =
    taskContext;

  const [openEdit, setOpenEdit] =
    useState(false);

  // ================= PRIORITY STYLE =================

  const priorityStyle =
    priority === "high"
      ? {
          bg: "bg-red-500/10",
          text: "text-red-400",
          border:
            "border-red-500/20",
          dot: "bg-red-500",
        }
      : priority === "medium"
      ? {
          bg: "bg-yellow-500/10",
          text: "text-yellow-400",
          border:
            "border-yellow-500/20",
          dot: "bg-yellow-500",
        }
      : {
          bg: "bg-emerald-500/10",
          text: "text-emerald-400",
          border:
            "border-emerald-500/20",
          dot: "bg-emerald-500",
        };

  // ================= DELETE =================

  const handleDelete =
    async () => {
      try {
        await deleteTask(id);

        setTasks(
          tasks.filter(
            (task) =>
              task._id !== id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  // ================= UPDATE STATUS =================

  const handleProgress =
    async () => {
      try {
        let nextStatus = status;

        if (status === "todo") {
          nextStatus =
            "inprogress";
        } else if (
          status === "inprogress"
        ) {
          nextStatus = "done";
        }

        const updatedTask =
          await updateTask(id, {
            status: nextStatus,
          });

        const updatedTasks =
          tasks.map((task) =>
            task._id === id
              ? updatedTask
              : task
          );

        setTasks(updatedTasks);
      } catch (error) {
        console.log(error);
      }
    };

  // ================= UPDATE TASK =================

  const handleUpdate =
    async (
      id: string,
      data: any
    ) => {
      try {
        const updatedTask =
          await updateTask(id, data);

        const updatedTasks =
          tasks.map((task) =>
            task._id === id
              ? updatedTask
              : task
          );

        setTasks(updatedTasks);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      {/* ================= CARD ================= */}

      <div className="group relative overflow-hidden rounded-[5px] border border-white/10 bg-[#111827] hover:bg-[#182033] transition-all duration-300 hover:border-violet-500/20 hover:-translate-y-1 px-6 py-6 shadow-lg hover:shadow-2xl">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

        {/* ================= HEADER ================= */}

        <div className="relative z-10 flex items-start justify-between gap-4">
          {/* Left */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-[24px] font-black leading-tight text-white capitalize break-words">
              {title}
            </h3>

            {/* Priority */}
            <div className="mt-5">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-[4px] border text-sm font-semibold ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.border}`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${priorityStyle.dot}`}
                ></div>

                <Flag size={14} />

                {priority}
              </span>
            </div>
          </div>

          {/* Edit */}
          <button
            onClick={() =>
              setOpenEdit(true)
            }
            className="w-11 h-11 rounded-[18px] hover:bg-white/5 transition flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <Pencil size={18} />
          </button>
        </div>

        {/* ================= DESCRIPTION ================= */}

        <p className="relative z-10 text-gray-400 text-[15px] leading-7 mt-6 line-clamp-3">
          {description}
        </p>

        {/* ================= FOOTER ================= */}

        <div className="relative z-10 mt-7 pt-5 border-t border-white/5 flex items-center justify-between gap-4 flex-wrap">
          {/* Status */}
          <div className="flex items-center gap-2 text-[14px] text-gray-500 font-medium">
            <Clock3 size={15} />

            <span>
              {status === "todo"
                ? "To Do"
                : status ===
                    "inprogress"
                  ? "In Progress"
                  : "Completed"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {status !== "done" && (
              <button
                onClick={
                  handleProgress
                }
                className="px-5 py-3 rounded-[20px] bg-violet-600 hover:bg-violet-700 transition text-[14px] font-semibold flex items-center gap-2 shadow-lg"
              >
                {status ===
                "todo" ? (
                  <>
                    <ArrowRight
                      size={16}
                    />

                    Progress
                  </>
                ) : (
                  <>
                    <CheckCircle2
                      size={16}
                    />

                    Done
                  </>
                )}
              </button>
            )}

            {/* Delete */}
            <button
              onClick={
                handleDelete
              }
              className="w-12 h-12 rounded-[18px] bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}

      <EditTaskModal
        open={openEdit}
        onClose={() =>
          setOpenEdit(false)
        }
        task={{
          _id: id,
          title,
          description,
          priority,
        }}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default TaskCard;