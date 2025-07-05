import express from "express";
import { testUser } from "../Controller/test.js";

const Router = express();
const api = "api/v1";

Router.get("/test", testUser);

export default Router;
