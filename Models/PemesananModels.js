import mongoose from "mongoose";

const PemesananModel = new mongoose.Schema(
  {
    nama_film: { type: String, required: true },
    genre: { type: String, required: true },
    durasi_film: { type: String, required: true },
    sutadara_film: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("PemesananModel", PemesananModel);
