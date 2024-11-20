import express from "express";
import { authVolunteer } from "../middlewares/authVerify.js";
import { signup, login } from "../controllers/volunteerC.js";

const Router = express.Router();

Router.post("/signup", signup);
Router.post("/login", login);

export default Router;
