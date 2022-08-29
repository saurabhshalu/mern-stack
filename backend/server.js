import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import connectDB from "./config/db.js";
const __dirname = path.resolve();

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ exposedHeaders: "Authorization" }));

// app.use(express.static(path.join(__dirname, "frontend", "build")));
// app.use(express.static("public"));

app.use("/api/users", userRoute);

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });

app.listen(
  process.env.PORT || 5000,
  console.log(
    `Server running for ${process.env.NODE_ENV} on port ${process.env.PORT}`
  )
);
