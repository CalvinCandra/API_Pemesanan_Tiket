import express from "express";
import {
  CreateStudio,
  ReadStudio,
  ReadStudiobyid,
  UpdateStudio,
  DeleteStudio,
} from "../../Controller/studiocontroller/studioController.js";

const filmRouter = express();

filmRouter.post("/tambahStudio", CreateStudio);
filmRouter.get("/ambilStudio/", ReadStudio);
filmRouter.get("/ambilStudio/:id", ReadStudiobyid);
filmRouter.put("/updateStudio/:id", UpdateStudio);
filmRouter.delete("/deleteStudio/:id", DeleteStudio);

export default filmRouter;
