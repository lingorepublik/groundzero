import express, { Request, Response, ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import cors from "cors";
import dotenv from "dotenv";
import { apiRouter } from "./routes";
import mongoose from "mongoose";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4013"
        : "https://api...",
    credentials: true,
  }),
);

app.use(express.json());
const port = process.env.PORT;
const dbConnectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@data-service.qymhovm.mongodb.net/lingo-db?appName=data-service`;

app.use("/api", apiRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response) => {
  throw createHttpError(404, "Route not found");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error occured";
  res.status(status).json({ error: message });
};

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(dbConnectionString);
    console.log(`db connected...`);
    app.listen(port, () => {
      console.log(`app is listening at port ${port}`);
    });
  } catch (e) {
    console.error("db connection failed", e);
    process.exit(1);
  }
};

startServer();
