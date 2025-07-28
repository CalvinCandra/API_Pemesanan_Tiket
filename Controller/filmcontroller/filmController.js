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

    const durasi_film = `${durasi_jam_film} Jam ${durasi_menit_film} Menit`;

    const newFilm = new film({
      nama_film,
      genre_film,
      durasi_film,
      sutadara_film,
    });
    await newFilm.save();
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


    const dataFilm = await film.findOne({ _id: id });
    if (!dataFilm) {
      return res.status(400).json({ message: "Film Tidak Ditemukan" });
    }


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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

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

export const ReadFilm = async (req, res) => {
  try {
    const Film = await film.find().sort({ createdAt: -1 });
    res.status(200).json(Film);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi error saat mengambil data film",
      error: error.message,
    });
  }
};


export const ReadFilmbyid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    const Film = await film.findById(id);

    if (!Film) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }

    res.status(200).json(Film);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi error saat mengambil data Film",
      error: error.message,
    });
  }
};

export const SearchFilm = async (req, res) => {
  try {
    const { nama_film, genre_film } = req.body;

    let filter = {};

    if (nama_film) {
      filter.nama_film = { $regex: nama_film, $options: "i" }; 
    }

    if (genre_film) {
      filter.genre_film = { $regex: genre_film, $options: "i" };
    }

    const hasil = await film.find(filter);

    if (hasil.length === 0) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }

    res.status(200).json(hasil);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mencari film",
      error: error.message,
    });
  }
};

export const CountbyGenre = async (req, res) => {
  try {
    const { genre } = req.body;

    if (!genre) {
      return res
        .status(400)
        .json({ message: "Genre harus diisi di body request" });
    }

    const result = await film.aggregate([
      {
        $match: {
          genre_film: { $regex: genre, $options: "i" }, 
        },
      },
      {
        $count: "jumlah_film",
      },
    ]);

    const jumlah = result[0]?.jumlah_film || 0;

    res.status(200).json({ genre, jumlah });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghitung jumlah film berdasarkan genre",
      error: error.message,
    });
  }
};
