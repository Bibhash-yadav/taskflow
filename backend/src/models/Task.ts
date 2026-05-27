import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  priority: string;
  user: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>(
  "Task",
  TaskSchema
);

export default Task;