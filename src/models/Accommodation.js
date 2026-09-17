import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
});

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

export default Accommodation;
