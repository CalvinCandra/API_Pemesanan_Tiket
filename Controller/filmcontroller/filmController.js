import film from "../../Models/FilmModels.js";
import mongoose from "mongoose";

export const CreateFilm = async (req, res) => {
  try {
    const {
      nama_film,
      genre_film,
      durasi_jam_film,
      durasi_menit_film,
      sutadara_film,
    } = req.body;
    // validasi
    if (!nama_film) {
      return res.status(400).json({ message: "Nama Film Harus Diisi" });
    }
    if (!genre_film) {
      return res.status(400).json({ message: "Genre Film Harus Diisi" });
    }
    if (!durasi_jam_film) {
      return res.status(400).json({ message: "Durasi Jam Film Harus Diisi" });
    }
    if (typeof durasi_jam_film !== "number" || isNaN(durasi_jam_film)) {
      return res
        .status(400)
        .json({ message: "Durasi Jam Film Harus Berubah Angka" });
    }
    if (!durasi_menit_film) {
      return res.status(400).json({ message: "Durasi Menit Film Harus Diisi" });
    }
    if (typeof durasi_menit_film !== "number" || isNaN(durasi_menit_film)) {
      return res
        .status(400)
        .json({ message: "Durasi Menit Film Harus Berubah Angka" });
    }
    if (!sutadara_film) {
      return res.status(400).json({ message: "Sutadara Film Harus Diisi" });
    }

    // gabungan durasi
    const durasi_film = `${durasi_jam_film} Jam ${durasi_menit_film} Menit`;

    const newFilm = new film({
      nama_film,
      genre_film,
      durasi_film,
      sutadara_film,
    });
    await newFilm.save();
    // kirim response
    res.status(200).json(newFilm);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi error saat menambah data Film", error });
  }
};

export const UpdateFilm = async (req, res) => {
  try {
    const { id } = req.params;
    // Cek format ID valid atau tidak
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    const {
      nama_film,
      genre_film,
      durasi_jam_film,
      durasi_menit_film,
      sutadara_film,
    } = req.body;

    // cek apakah data ada atau tidak
    const dataFilm = await film.findOne({ _id: id });
    if (!dataFilm) {
      return res.status(400).json({ message: "Film Tidak Ditemukan" });
    }

    // validasi
    if (!nama_film) {
      return res.status(400).json({ message: "Nama Film Harus Diisi" });
    }
    if (!genre_film) {
      return res.status(400).json({ message: "Genre Film Harus Diisi" });
    }
    if (!durasi_jam_film) {
      return res.status(400).json({ message: "Durasi Jam Film Harus Diisi" });
    }
    if (typeof durasi_jam_film !== "number" || isNaN(durasi_jam_film)) {
      return res
        .status(400)
        .json({ message: "Durasi Jam Film Harus Berubah Angka" });
    }
    if (!durasi_menit_film) {
      return res.status(400).json({ message: "Durasi Menit Film Harus Diisi" });
    }
    if (typeof durasi_menit_film !== "number" || isNaN(durasi_menit_film)) {
      return res
        .status(400)
        .json({ message: "Durasi Menit Film Harus Berubah Angka" });
    }
    if (!sutadara_film) {
      return res.status(400).json({ message: "Sutadara Film Harus Diisi" });
    }

    // gabungan durasi
    const durasi_film = `${durasi_jam_film} Jam ${durasi_menit_film} Menit`;

    const UpdateFilm = await film.findByIdAndUpdate(
      id,
      { nama_film, genre_film, durasi_film, sutadara_film },
      { new: true }
    );

    res.status(200).json(UpdateFilm);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi error saat update data Film",
      error: error.message,
    });
  }
};

export const DeleteFilm = async (req, res) => {
  try {
    const { id } = req.params;
    // Cek format ID valid atau tidak
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    // cek apakah data ada atau tidak
    const dataFilm = await film.findOne({ _id: id });
    if (!dataFilm) {
      return res.status(400).json({ message: "Film Tidak Ditemukan" });
    }

    await film.findByIdAndDelete(id);
    res.status(200).json({ message: "Film Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi error saat hapus data Film",
      error: error.message,
    });
  }
};
