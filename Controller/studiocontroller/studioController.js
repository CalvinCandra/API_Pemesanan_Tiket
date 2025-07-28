import Studio from "../../Models/StudioModel.js";
import mongoose from "mongoose";

export const CreateStudio = async (req, res) => {
  try {
    const { nama_tempat, studio_ke } = req.body;

    if (!nama_tempat) {
      return res.status(400).json({ message: "Nama Tempat Harus Diisi" });
    }
    if (!studio_ke) {
      return res.status(400).json({ message: "Nomor Studio Harus Diisi" });
    }

    const newStudio = new Studio({
      nama_tempat,
      studio_ke,
    });

    await newStudio.save();

    res.status(200).json(newStudio);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi error saat menambah data Studio",
      error: error.message,
    });
  }
};

export const ReadStudio = async (req, res) => {
  try {
    const studios = await Studio.find().sort({ createdAt: -1 });
    res.status(200).json(studios);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi error saat mengambil data Studio",
      error: error.message,
    });
  }
};

export const ReadStudiobyid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    const studio = await Studio.findById(id);

    if (!studio) {
      return res.status(404).json({ message: "Studio tidak ditemukan" });
    }

    res.status(200).json(studio);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi error saat mengambil data Studio",
      error: error.message,
    });
  }
};

export const UpdateStudio = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    const { nama_tempat, studio_ke } = req.body;

    const existingStudio = await Studio.findOne({ _id: id });
    if (!existingStudio) {
      return res.status(404).json({ message: "Studio Tidak Ditemukan" });
    }

    const updateData = {
      nama_tempat: nama_tempat || existingStudio.nama_tempat,
      studio_ke: studio_ke || existingStudio.studio_ke,
    };

    const updatedStudio = await Studio.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json(updatedStudio);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi error saat update data Studio",
      error: error.message,
    });
  }
};

export const DeleteStudio = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    const existingStudio = await Studio.findOne({ _id: id });
    if (!existingStudio) {
      return res.status(404).json({ message: "Studio Tidak Ditemukan" });
    }

    await Studio.findByIdAndDelete(id);
    res.status(200).json({ message: "Studio Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi error saat hapus data Studio",
      error: error.message,
    });
  }
};

export const SearchStudio = async (req, res) => {
  try {
    const { nama_tempat, studio_ke } = req.body;

    let filter = {};

    if (nama_tempat) {
      filter.nama_tempat = { $regex: nama_tempat, $options: "i" }; 
    }

    if (studio_ke) {
      filter.studio_ke = { $regex: studio_ke, $options: "i" };
    }

    const hasil = await film.find(filter);

    if (hasil.length === 0) {
      return res.status(404).json({ message: "Studio tidak ditemukan" });
    }

    res.status(200).json(hasil);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mencari studio",
      error: error.message,
    });
  }
};


export const SearchStudios = async (req, res) => {
  try {
    const { nama_tempat, studio_ke } = req.body;

    let filter = {};

    if (nama_tempat) {
      filter.nama_tempat = { $regex: nama_tempat, $options: "i" }; 
    }

    if (studio_ke) {
      filter.studio_ke = studio_ke; 
    }

    const hasil = await Studio.find(filter);

    if (hasil.length === 0) {
      return res.status(404).json({ message: "Studio tidak ditemukan" });
    }

    res.status(200).json(hasil);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mencari studio",
      error: error.message,
    });
  }
};


export const CountbyStudioName = async (req, res) => {
  try {
    const { nama_tempat } = req.body;

    if (!nama_tempat) {
      return res
        .status(400)
        .json({ message: "Nama tempat harus diisi di body request" });
    }

    const result = await Studio.aggregate([
      {
        $match: {
          nama_tempat: { $regex: nama_tempat, $options: "i" }, 
        },
      },
      {
        $count: "jumlah_studio",
      },
    ]);

    const jumlah = result[0]?.jumlah_studio || 0;

    res.status(200).json({ nama_tempat, jumlah });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghitung jumlah studio berdasarkan nama tempat",
      error: error.message,
    });
  }
};

export const SearchAndCountByStudioNumber = async (req, res) => {
  try {
    const { studio_ke } = req.body;

    if (!studio_ke) {
      return res.status(400).json({ message: "Nomor studio harus diisi" });
    }

    const studios = await Studio.find({ studio_ke: studio_ke });

    if (studios.length === 0) {
      return res.status(404).json({ 
        message: `Tidak ditemukan studio dengan nomor ${studio_ke}` 
      });
    }

    const count = studios.length;

    res.status(200).json({
      studio_ke,
      jumlah_studio: count,
      data: studios
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mencari studio berdasarkan nomor",
      error: error.message,
    });
  }
};
