import {
  useState,
  useEffect,
} from "react";

import { X } from "lucide-react";

interface Props {
  open: boolean;

  onClose: () => void;

  task: any;

  onUpdate: (
    id: string,
    data: {
      title: string;
      description: string;
      priority: string;
    }
  ) => void;
}

const EditTaskModal = ({
  open,
  onClose,
  task,
  onUpdate,
}: Props) => {
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "medium",
    });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description:
          task.description || "",
        priority:
          task.priority ||
          "medium",
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    onUpdate(task._id, formData);

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-[550px] rounded-[0px] border border-white/10 bg-[#0B1120] p-8 shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black">
              Edit Task
            </h2>

            <p className="text-gray-400 mt-2">
              Update task details
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 transition flex items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl bg-[#111827] border border-white/10 px-5 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              className="w-full h-36 rounded-2xl bg-[#111827] border border-white/10 p-5 outline-none focus:border-violet-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Priority
            </label>

            <select
              name="priority"
              value={
                formData.priority
              }
              onChange={handleChange}
              className="w-full h-14 rounded-2xl bg-[#111827] border border-white/10 px-5 outline-none focus:border-violet-500"
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>
            </select>
          </div>

          <button className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 transition text-lg font-bold">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;