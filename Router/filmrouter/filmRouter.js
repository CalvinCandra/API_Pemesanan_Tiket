import express from "express";
import {
  CreateFilm,
  UpdateFilm,
  DeleteFilm,
  ReadFilm,
  ReadFilmbyid,
  SearchFilm,
  CountbyGenre,
} from "../../Controller/filmcontroller/filmController.js";
import { protect, admin } from "../../Middleware/jwt.js";

const filmRouter = express();

filmRouter.post("/tambahFilm", protect, admin, CreateFilm);
filmRouter.put("/updateFilm/:id", protect, admin, UpdateFilm);
filmRouter.delete("/deleteFilm/:id", protect, admin, DeleteFilm);
filmRouter.get("/searchFilm", protect, admin, ReadFilm);
filmRouter.get("/searchFilm/:id", protect, admin, ReadFilmbyid);
filmRouter.post("/searchFilmNamaGenre", protect, SearchFilm);
filmRouter.post("/searchFilmGenre", protect, CountbyGenre);

export default filmRouter;
