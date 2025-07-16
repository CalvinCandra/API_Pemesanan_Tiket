import mongoose from "mongoose";

const FilmModels = new mongoose.Schema(
  {
    nama_film: { type: String, required: true },
    genre_film: { type: String, required: true },
    durasi_film: { type: String, required: true },
    sutadara_film: { type: String, required: true },
  },
  { timestamps: true}
);

// harus sesuai dengan nama collection (tulis nama collection tanpa s)
export default mongoose.model("film", FilmModels);
