import mongoose from "mongoose";
const grup = new mongoose.Schema({
  kullaniciAd: { type: String, required: true },
  group: { type: String, required: true },
  is:{ type: String, required: true },

});
export default mongoose.model("Grup", grup);
