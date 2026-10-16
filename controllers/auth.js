
const { createUser, findUser } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.createuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const uid = Date.now();

    await createUser(email, hashedPassword, uid);

    return res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Registration failed"
    });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    
    const user = await findUser(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    
    const token = jwt.sign(
      { uid: user.uid, email: user.email },
      process.env.KEY_SECRET,
      { expiresIn: "1h" }
    );

    
    return res.status(200).json({
      message: "Login successful",
      token: token
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
