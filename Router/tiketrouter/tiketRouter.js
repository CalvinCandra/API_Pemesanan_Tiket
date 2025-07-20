import express from "express";
import { protect, admin } from '../../Middleware/jwt.js';
import { createPemesanan, getAllPemesanan, deletePemesanan } from "../../Controller/tiketcontroller/tiketController.js";



const router = express.Router();

// POST /api/transactions
router.post("/", protect, createPemesanan); // buat pemesanan
router.get('/', protect, getAllPemesanan); // ambil semua data
router.delete('/:id', protect, deletePemesanan); // hapus berdasarkan id
export default router;
