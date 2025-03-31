const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const logger = require("../utils/logger");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username already used
    const existingUsername = await userModel.findByUsername(username);
    if (existingUsername) {
      logger.warn(
        `Signup failed. Username: ${username}, Email: ${email} - Reason: Username already used`
      );
      return res.status(400).json({ msg: "Username already used" });
    }

    // Check if email already used
    const existingEmail = await userModel.findByEmail(email);
    if (existingEmail) {
      logger.warn(
        `Signup failed. Username: ${username}, Email: ${email} - Reason: Email already used`
      );
      return res.status(400).json({ msg: "Email already used" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.createUser(username, email, hashedPassword);
    logger.info(
      `User signed up successfully. User ID: ${user.user_id}, Username: ${username}, Email: ${email}`
    );

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    logger.error(`Signup error: ${error.message}`); 
    return res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await userModel.findByUsername(username);
    if (!user) {
      logger.warn(
        `Login failed. Username: ${username} - Reason: User not found`
      );
      return res.status(400).json({ msg: "Incorrect Username or Password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(
        `Login failed. Username: ${username} - Reason: Incorrect password`
      );
      return res.status(400).json({ msg: "Incorrect Username or Password" });
    }

    // Generate JWT
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    logger.info(
      `User logged in successfully. User ID: ${user.user_id}, Username: ${username}, Email: ${user.email}`
    );

    return res.json({
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return res.status(500).json({ msg: "Server error" });
  }
};

const validateToken = (req, res) => {
  res.status(200).json({
    msg: "Authorize",
    user: req.user,
  });
};

module.exports = {
  register,
  login,
  validateToken,
};
