import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

mongoose
  .connect(
    "mongodb+srv://admin:123456abcd@cluster0.4wsoaoy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch(() => {
    console.log("DB error", err);
  });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {});

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    success: true,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
