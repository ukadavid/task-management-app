import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import db from "./config/config";

import partnerRoutes from "./routes/partners";
import adminRoutes from "./routes/admins";
import userRoutes from "./routes/users";
import createHotelRoutes from "./routes/hotel";

const app = express();

db()
  .then(() => {})
  .catch((err) => {
    console.log("Error connecting to database:", err.message);
  });

app.use(express.json());
app.use(cookieParser());
app.use(logger("dev"));

app.use("/partner", partnerRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/hotel", createHotelRoutes);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
