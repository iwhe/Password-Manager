import mongoose, { Schema } from "mongoose";

const shareSchema = new Schema(
  {
    password: {
      type: Schema.Types.ObjectId,
      ref: "Password",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    permission: {
      type: String,
      enum: ["view", "edit", "full_access"],
      required: true,
    },
  },
  { timestamps: true }
);

const SharePassword = mongoose.model("SharePassword", shareSchema);
export default SharePassword;
