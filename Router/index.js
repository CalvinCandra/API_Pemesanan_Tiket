import express from "express";
import filmRouter from "../Router/filmrouter/filmRouter.js";
import authRouter from "../Router/authrouter/authRouter.js";
import pemesananRouter from "../Router/tiketrouter/tiketRouter.js";
import studioRouter from "../Router/studiorouter/studioRouter.js";
import { protect, admin } from "../Middleware/jwt.js";

const Router = express();
const api = "/api";

Router.use(api + "/film", filmRouter);
Router.use(api + "/studio", studioRouter);
Router.use(api + "/auth", authRouter);

//pemesanan tiket
Router.use(api + "/pemesanan", protect, pemesananRouter);

export default Router;
