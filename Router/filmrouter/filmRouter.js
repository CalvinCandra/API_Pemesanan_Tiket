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

const filmRouter = express();

filmRouter.post("/tambahFilm", CreateFilm);
filmRouter.put("/updateFilm/:id", UpdateFilm);
filmRouter.delete("/deleteFilm/:id", DeleteFilm);
filmRouter.get("/searchFilm", ReadFilm);
filmRouter.get("/searchFilm/:id", ReadFilmbyid);
filmRouter.post("/searchFilmNamaGenre", SearchFilm);
filmRouter.post("/searchFilmGenre", CountbyGenre);

export default filmRouter;
