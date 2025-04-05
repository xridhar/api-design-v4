import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import { handleInputErrors } from "./modules/middleware";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.shhhh_secret = "doggy";
  next();
});

app.get("/", (req, res, next) => {
  res.status(200);
  res.json({
    message: "Hello",
  });
  console.log("Hello");
  next();
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", handleInputErrors, signin);

export default app;
