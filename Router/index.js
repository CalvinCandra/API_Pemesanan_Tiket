import express from "express";
import filmRouter from "../Router/filmrouter/filmRouter.js";
import authRouter from "../Router/authrouter/authRouter.js";

const Router = express();
const api = "/api";

Router.use(api, filmRouter);
Router.use(api + "/auth", authRouter);

export default Router;
