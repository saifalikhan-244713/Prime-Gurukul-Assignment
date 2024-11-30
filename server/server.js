const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const mongoURI = process.env.mongoURI;
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

mongoose
  .connect(mongoURI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  dob: Date,
  phoneNumber: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { fullName, email, dob, phoneNumber, password, confirmPassword } =
    req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Password not match!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      fullName,
      email,
      dob,
      phoneNumber,
      password: hashedPassword,
    });
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res.status(400).send("Error, can't register user!");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("Can't found the user");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Password Invalid!");
  }

  const token = jwt.sign(
    { id: user._id, fullName: user.fullName },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token, fullName: user.fullName });
});

app.listen(5000, () => console.log("Server running on port 5000"));
