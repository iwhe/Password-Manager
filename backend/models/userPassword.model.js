import mongoose, { Schema } from "mongoose";

const userPasswordSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    password: {
      type: Schema.Types.ObjectId,
      ref: "Password",
    },
  },
  { timestamps: true }
);

const UserPassword = mongoose.model("UserPassword", userPasswordSchema);
export default UserPassword;
