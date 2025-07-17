import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    nama_user: { type: String, required: true },
    email_user: { type: String, required: true, unique: true },
    jenis_kelamin: {
      type: String,
      enum: ["Laki - Laki", "Perempuan"],
      required: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Hash password sebelum disimpan
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method untuk membandingkan password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("user", UserSchema);
