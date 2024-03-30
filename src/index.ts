import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";

import { createServer } from "./bin/server";

import userRoutes from "./routes/user";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use("/api", userRoutes);

dotenv.config();

const db = process.env["MONGO_URL"];

mongoose
  .connect(db as string)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error in connecting to database", err);
  });

createServer(app);
