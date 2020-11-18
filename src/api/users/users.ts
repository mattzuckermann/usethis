import mongoose, { Schema } from "mongoose";

export const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_joined: {
    type: Date,
  },
});

export default mongoose.models.users || mongoose.model("users", UsersSchema);
