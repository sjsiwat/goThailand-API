import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import accommodationRoutes from "./routes/accommodation.routes.js";
import carRoutes from "./routes/car.routes.js";
import guideRoutes from "./routes/guide.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config({ quiet: true });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/accommodations", accommodationRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "GO-THAILAND API is running",
  });
});

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Go THAILAND Server running on port ${PORT} ✅`);
});
