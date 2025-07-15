import mongoose from "mongoose";

const UserModels = new mongoose.Schema(
  {
    nama_user: { type: String, required: true },
    email_user: { type: String, required: true, unique: true },
    jenis_kelamin: {
      type: String,
      enum: ["Laki - Laki", "Perempuan"],
      required: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("UserModels", UserModels);
