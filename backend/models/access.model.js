import mongoose, { Schema, Model } from "mongoose";

const accessSchema = new Schema(
  {
    password: {
      type: Schema.Types.ObjectId,
      ref: "Password",
      required: true,
    },
    accessedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String,
      enum: ["Viewed", "Edited", "Deleted", "Not opened"],
    },
  },
  { timestamps: true }
);

const Access = Model("Access", accessSchema);
export default Access;
