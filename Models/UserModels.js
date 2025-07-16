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
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// harus sesuai dengan nama collection (tulis nama collection tanpa s)
export default mongoose.model("user", UserModels);
