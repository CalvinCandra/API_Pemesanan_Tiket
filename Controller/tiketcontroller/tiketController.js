
import Pemesanan from "../../Models/PemesananModels.js";
import User from "../../Models/UserModels.js";
import Film from "../../Models/FilmModels.js";
import Studio from "../../Models/StudioModel.js";


export const createPemesanan = async (req, res) => {
  try {
    const { film, studio, jumlah_pesan } = req.body;
    const userId = req.user._id; 

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

export const getAllPemesanan = async (req, res) => {
  try {
    
    const userId = req.user.id;

    const data = await Pemesanan.find({ user: userId })
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