import express from "express";
import filmRouter from "../Router/filmrouter/filmRouter.js";

const Router = express();
const api = "/api";

Router.use(api, filmRouter);

export default Router;
