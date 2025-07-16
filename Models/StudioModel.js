import mongoose from "mongoose";

const StudioModels = new mongoose.Schema(
  {
    nama_tempat: { type: String, required: true },
    studio_ke: { type: String, required: true },
  },
  { timestamps: true }
);

// harus sesuai dengan nama collection (tulis nama collection tanpa s)
export default mongoose.model("studio", StudioModels);
