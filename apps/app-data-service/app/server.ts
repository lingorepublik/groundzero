import express, { Request, Response, ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import { apiRouter } from "./routes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const app = express();
const port = process.env.PORT || 4013;

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:5173", "http://localhost:5174"]
        : "https://api...",
    credentials: true,
  }),
);

app.use(express.json());
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

app.listen(port, () => console.log(`app is listening at port ${port}`));
