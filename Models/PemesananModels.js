import mongoose from "mongoose";

const PemesananModel = new mongoose.Schema(
  {
    user: {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModles",
        required: true,
      },
      nama_user: String,
      jenis_kelamin: String,
      email: String,
    },
    film: {
      film_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FilmModels",
        required: true,
      },
      nama_film: String,
      genre: String,
      durasi: Number,
      sutadara_film: String,
    },
    studio: {
      studio_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudioModels",
        required: true,
      },
      nama_tempat: String,
      studio_ke: String,
    },
    tanggal_pesan: {
      type: Date,
      default: () => {
        const now = new Date();
        return now.toISOString().split("T")[0]; // hanya 'YYYY-MM-DD'
      },
    },
    jumlah_pesan: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("PemesananModel", PemesananModel);
