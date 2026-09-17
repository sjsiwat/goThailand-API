import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
  name: String,
  province: String,
  price: Number,
});

const Guide = mongoose.model("Guide", guideSchema);

export default Guide;
