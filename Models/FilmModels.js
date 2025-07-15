import mongoose from "mongoose";

const FilmModels = new mongoose.Schema(
  {
    nama_film: { type: String, required: true },
    genre: { type: String, required: true },
    durasi_film: { type: Number, required: true },
    sutadara_film: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("FilmModels", FilmModels);
