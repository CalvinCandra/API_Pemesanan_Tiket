import express from "express";
import {
  CreateStudio,
  ReadStudio,
  ReadStudiobyid,
  UpdateStudio,
  DeleteStudio,
  SearchStudios,
  CountbyStudioName,
  SearchAndCountByStudioNumber
} from "../../Controller/studiocontroller/studioController.js";
import { protect, admin } from "../../Middleware/jwt.js";

const filmRouter = express();

filmRouter.post("/tambahStudio", protect, admin, CreateStudio);
filmRouter.get("/ambilStudio/", protect, admin, ReadStudio);
filmRouter.get("/ambilStudio/:id", protect, admin, ReadStudiobyid);
filmRouter.put("/updateStudio/:id", protect, admin, UpdateStudio);
filmRouter.delete("/deleteStudio/:id", protect, admin, DeleteStudio);
filmRouter.post("/searchstudionameke", protect, SearchStudios);
filmRouter.post("/searchbystudioname", protect, CountbyStudioName);
filmRouter.post("/searchbystudionumber", protect, SearchAndCountByStudioNumber);

export default filmRouter;
