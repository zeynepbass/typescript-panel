import mongoose from "mongoose";
const post = new mongoose.Schema({
  kullaniciAd: { type: String, required: true },
  kullaniciSoyad: { type: String, required: true },
  kullaniciEmail: { type: String, required: true },
  yasadigiSehir: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  adress: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postaCode: { type: Number, required: true },
  planing: {
    type: Date,
    default: new Date(),
  },
});
export default mongoose.model("Post", post);
