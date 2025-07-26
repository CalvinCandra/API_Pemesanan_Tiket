import mongoose from "mongoose";

const PemesananModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    film: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "film",
      required: true,
    },
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studio",
      required: true,
    },
    tanggal_pesan: {
      type: Date,
      default: () => {
        const now = new Date();
        return now.toISOString().split("T")[0];
      },
    },
    jumlah_pesan: { type: Number, required: true },
  },
  { timestamps: true }
);


// harus sesuai dengan nama collection (tulis nama collection tanpa s)
export default mongoose.model("pemesanan", PemesananModel);
