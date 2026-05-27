// ULTRA MODERN AddTaskModal.tsx

import {
  useState,
  useContext,
} from "react";

import {
  Sparkles,
  X,
  Flag,
  ClipboardList,
} from "lucide-react";

import { TaskContext } from "../../context/TaskContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddTaskModal = ({
  open,
  onClose,
}: Props) => {
  const taskContext =
    useContext(TaskContext);

  if (!taskContext) return null;

  const { addTask } = taskContext;

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "medium",
    });

  // ================= HANDLE CHANGE =================

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= SUBMIT =================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await addTask(formData);

    // Reset form
    setFormData({
      title: "",
      description: "",
      priority: "medium",
    });

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md px-5">
      {/* Modal */}
      <div className="relative w-full max-w-[650px] rounded-[38px] border border-white/10 bg-[#0B1120] shadow-[0_20px_80px_rgba(0,0,0,0.7)] overflow-hidden animate-[popup_0.25s_ease]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 px-9 py-9">
          {/* ================= HEADER ================= */}

          <div className="flex items-start justify-between gap-5 mb-10">
            {/* Left */}
            <div className="flex items-center gap-5">
              {/* Icon */}
              <div className="w-16 h-16 rounded-[24px] bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shadow-xl">
                <Sparkles
                  size={28}
                  className="text-violet-400"
                />
              </div>

              {/* Text */}
              <div>
                <h2 className="text-4xl font-black">
                  Add Task
                </h2>

                <p className="text-gray-400 mt-2 text-[15px]">
                  Create a new task and
                  organize your workflow.
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-[18px] bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Task Title
              </label>

              <div className="h-[68px] rounded-[24px] bg-[#111827] border border-white/10 px-6 flex items-center gap-4 focus-within:border-violet-500 transition-all duration-300">
                <ClipboardList
                  size={22}
                  className="text-gray-500"
                />

                <input
                  type="text"
                  name="title"
                  placeholder="Enter task title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-[17px]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Write task details..."
                value={
                  formData.description
                }
                onChange={handleChange}
                className="w-full min-h-[190px] rounded-[24px] bg-[#111827] border border-white/10 p-6 text-[16px] leading-8 outline-none focus:border-violet-500 transition-all duration-300 resize-none"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Priority
              </label>

              <div className="h-[68px] rounded-[24px] bg-[#111827] border border-white/10 px-6 flex items-center gap-4 focus-within:border-violet-500 transition-all duration-300">
                <Flag
                  size={22}
                  className="text-gray-500"
                />

                <select
                  name="priority"
                  value={
                    formData.priority
                  }
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-[17px]"
                >
                  <option
                    value="low"
                    className="bg-[#111827]"
                  >
                    Low Priority
                  </option>

                  <option
                    value="medium"
                    className="bg-[#111827]"
                  >
                    Medium Priority
                  </option>

                  <option
                    value="high"
                    className="bg-[#111827]"
                  >
                    High Priority
                  </option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-5 pt-2">
              {/* Cancel */}
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-[64px] rounded-[24px] border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 text-lg font-semibold"
              >
                Cancel
              </button>

              {/* Submit */}
              <button
                type="submit"
                className="flex-1 h-[64px] rounded-[24px] bg-violet-600 hover:bg-violet-700 transition-all duration-300 text-lg font-bold shadow-2xl hover:scale-[1.01]"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;