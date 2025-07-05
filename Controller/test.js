export const testUser = (req, res) => {
  try {
    return res.status(200).json({ message: "Pesan dari Controller" });
  } catch (error) {
    return res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
};
