import Pemesanan from '../../Models/PemesananModels.js';
import FilmModel from '../../Models/FilmModels.js';
import StudioModel from '../../Models/StudioModel.js';
import UserModel from '../../Models/UserModels.js';


//tambahkan pesanan dengan parameter id_film, id_studio
export const createPemesanan = async (req, res) => {
  try {
    const { film, studio, jumlah_pesan } = req.body;

    // pastikan user sudah login dan middleware protect jalan
    const userId = req.user._id;

    const newPemesanan = new Pemesanan({
      user: userId,
      film: film,
      studio: studio,
      jumlah_pesan: jumlah_pesan,
    });

    await newPemesanan.save();

    res.status(201).json({
      success: true,
      message: "Pemesanan berhasil dibuat",
      data: newPemesanan,
    });
  } catch (error) {
    console.error("Gagal membuat pemesanan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal membuat pemesanan",
    });
  }
};

//get all pesanan
export const getAllPemesanan = async (req, res) => {
  try {
    const data = await Pemesanan.find()
      .populate("user", "nama email")         // hanya ambil nama dan email user
      .populate("film", "nama_film genre")    // ambil sebagian field film
      .populate("studio", "nama_tempat");     // field studio tertentu

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Gagal mengambil data pemesanan:", error);
    res.status(500).json({ success: false, message: "Gagal mengambil data pemesanan" });
  }
};


//hapus pesananan berdasarkan id pesanan
export const deletePemesanan = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Pemesanan.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Pemesanan tidak ditemukan" });
    }
    res.status(200).json({ success: true, message: "Pemesanan berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus pemesanan:", error);
    res.status(500).json({ success: false, message: "Gagal menghapus pemesanan" });
  }
};