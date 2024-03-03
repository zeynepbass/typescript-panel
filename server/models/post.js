import mongoose from "mongoose";
const post = new mongoose.Schema({
  kullaniciAd: { type: String},
  kullaniciSoyad: { type: String},
  kullaniciEmail: { type: String},
  yasadigiSehir: { type: String},
  group: { type: String},
  createdAt: {
    type: Date,
    default: new Date(),
  },
  adress: { type: String},
  city: { type: String},
  province: { type: String},
  postaCode: { type: Number},
  planing: {
    type: Date,
    default: null,
  },
  planingEnd: {
    type: Date,
    default: null
  },
});
export default mongoose.model("Post", post);
