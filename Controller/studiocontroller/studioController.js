import Studio from "../../Models/StudioModel.js";
import mongoose from "mongoose";

export const CreateStudio = async (req, res) => {
  try {
    const { nama_tempat, studio_ke } = req.body;
    
    // Validasi
    if (!nama_tempat) {
      return res.status(400).json({ message: "Nama Tempat Harus Diisi" });
    }
    if (!studio_ke) {
      return res.status(400).json({ message: "Nomor Studio Harus Diisi" });
    }

    const newStudio = new Studio({
      nama_tempat,
      studio_ke
    });
    
    await newStudio.save();
    
    // Kirim response
    res.status(200).json(newStudio);
  } catch (error) {
    res.status(500).json({ 
      message: "Terjadi error saat menambah data Studio", 
      error: error.message 
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
      error: error.message 
    });
  }
};

export const ReadStudiobyid = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Cek format ID valid atau tidak
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
      error: error.message 
    });
  }
};

export const UpdateStudio = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Cek format ID valid atau tidak
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    const { nama_tempat, studio_ke } = req.body;

    // Cek apakah data ada atau tidak
    const existingStudio = await Studio.findOne({ _id: id });
    if (!existingStudio) {
      return res.status(404).json({ message: "Studio Tidak Ditemukan" });
    }

    // Buat object update dengan data baru atau gunakan data lama jika tidak ada
    const updateData = {
      nama_tempat: nama_tempat || existingStudio.nama_tempat,
      studio_ke: studio_ke || existingStudio.studio_ke
    };

    const updatedStudio = await Studio.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

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
    
    // Cek format ID valid atau tidak
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    // Cek apakah data ada atau tidak
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