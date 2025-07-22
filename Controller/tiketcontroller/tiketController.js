//tambahkan pesanan dengan parameter id_film, id_studio
import Pemesanan from "../../Models/PemesananModels.js";
import User from "../../Models/UserModel.js";
import Film from "../../Models/FilmModel.js";
import Studio from "../../Models/StudioModel.js";

// Buat pesanan dengan tambahan data dari id user, id film, dan id studio
export const createPemesanan = async (req, res) => {
  try {
    const { film, studio, jumlah_pesan } = req.body;
    const userId = req.user._id; // dari middleware protect

    // Validasi semua ID ada
    const userData = await User.findById(userId).select(
      "nama_user email_user jenis_kelamin"
    );
    const filmData = await Film.findById(film).select(
      "nama_film genre_film durasi_film sutadara_film"
    );
    const studioData = await Studio.findById(studio).select(
      "nama_tempat studio_ke"
    );

    if (!userData || !filmData || !studioData) {
      return res.status(400).json({
        success: false,
        message: "ID user / film / studio tidak valid",
      });
    }

    const newPemesanan = new Pemesanan({
      user: userId,
      film,
      studio,
      jumlah_pesan,
    });

    await newPemesanan.save();

    res.status(201).json({
      success: true,
      message: "Pemesanan berhasil dibuat",
      data: {
        ...newPemesanan.toObject(),
        user_detail: userData,
        film_detail: filmData,
        studio_detail: studioData,
      },
    });
  } catch (error) {
    console.error("Gagal membuat pemesanan:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal membuat pemesanan" });
  }
};

//get all pesanan
export const getAllPemesanan = async (req, res) => {
  try {
    const data = await Pemesanan.find()
      .populate("user", "nama_user email_user jenis_kelamin")
      .populate("film", "nama_film genre_film durasi_film sutadara_film")
      .populate("studio", "nama_tempat studio_ke");

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Gagal mengambil data pemesanan:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil data pemesanan" });
  }
};

//hapus pesananan berdasarkan id pesanan
export const deletePemesanan = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Pemesanan.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Pemesanan tidak ditemukan" });
    }
    res
      .status(200)
      .json({ success: true, message: "Pemesanan berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus pemesanan:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal menghapus pemesanan" });
  }
};
