import mongoose from "mongoose";
import dotenv from "dotenv";

// init .env
dotenv.config();

// Inisialisasi koneksi Mongoose
let dbConnection;

async function koneksi() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    dbConnection = mongoose.connection;
    console.log("Koneksi MongoDB Berhasil");
  } catch (error) {
    console.error("Koneksi Gagal:", error.message);
    throw error;
  }
}

export { koneksi };
