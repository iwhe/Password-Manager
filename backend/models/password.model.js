import mongoose, { Schema } from "mongoose";

const passwordSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    site: {
      type: String,
      required: true,
    },
    siteEmail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Password = mongoose.model("Password", passwordSchema);
export default Password;
