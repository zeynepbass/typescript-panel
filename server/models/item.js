import mongoose from "mongoose";
const item = new mongoose.Schema({
  group: { type: String, required: true },


});
export default mongoose.model("Item", item);
