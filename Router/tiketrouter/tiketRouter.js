import express from "express";
import {
  createPemesanan,
  getAllPemesanan,
  deletePemesanan,
} from "../../Controller/tiketcontroller/tiketController.js";

const router = express.Router();


router.post("/pesanTiket", createPemesanan);
router.get("/cekTiket", getAllPemesanan);
router.delete("/hapusTiket/:id", deletePemesanan);
export default router;
