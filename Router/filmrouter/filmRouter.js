import express from "express";
import {
  CreateFilm,
  UpdateFilm,
  DeleteFilm,
} from "../../Controller/filmcontroller/filmController.js";

const filmRouter = express();

filmRouter.post("/tambahFilm", CreateFilm);
filmRouter.put("/updateFilm/:id", UpdateFilm);
filmRouter.delete("/deleteFilm/:id", DeleteFilm);

export default filmRouter;
