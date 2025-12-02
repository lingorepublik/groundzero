import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { articleRouter, catalogRouter, articlePageRouter } from "./routes";
import mongoose from "mongoose";
config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
const dbConnectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@data-service.qymhovm.mongodb.net/article-data?appName=data-service`;

app.use("/catalog", catalogRouter);
app.use("/article", articleRouter);
app.use("/article-page", articlePageRouter);

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
