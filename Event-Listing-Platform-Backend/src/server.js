import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.config.js";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: [
      "https://event-listing-frontend.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
