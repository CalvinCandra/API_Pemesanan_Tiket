import mongoose from "mongoose";

const StudioModels = new mongoose.Schema(
  {
    nama_tempat: { type: String, required: true },
    studio_ke: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("StudioModels", StudioModels);
