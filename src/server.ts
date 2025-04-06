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

app.get("/", (req, res) => {
  res.status(200);
  res.json({
    message: "Hello",
  });
  console.log("Hello");
  // throw new Error("Oops");
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", handleInputErrors, signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({
      message: "invalid input",
    });
  } else {
    res.status(500).json({
      message: "Oops, that on us",
    });
  }
  res.json({ message: `Oops something went wrong, message is ${err.message}` });
});

export default app;
