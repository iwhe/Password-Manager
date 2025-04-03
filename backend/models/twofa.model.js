import mongoose, { Schema } from "mongoose";
import User from "./users.model.js";

const twoFASchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  verifiedOn: {
    type: Date,
  },
});

const TwoFA = mongoose.model("TwoFA", twoFASchema);

export default TwoFA;
