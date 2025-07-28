import User from "../../Models/UserModels.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { nama_user, email_user, jenis_kelamin, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email_user });
    if (userExists) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const user = await User.create({ 
      nama_user,
      email_user,
      jenis_kelamin,
      password,
      role: "User",
    });

    res.status(201).json({
      _id: user._id,
      nama_user: user.nama_user,
      email_user: user.email_user,
      jenis_kelamin: user.jenis_kelamin,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


export const login = async (req, res) => {
  const { email_user, password } = req.body;

  try {
    const user = await User.findOne({ email_user });
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      _id: user._id,
      nama_user: user.nama_user,
      email_user: user.email_user,
      jenis_kelamin: user.jenis_kelamin,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
