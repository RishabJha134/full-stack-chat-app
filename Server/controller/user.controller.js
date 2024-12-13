const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;

    if (!fullname || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    await user.save();

    console.log("user created successfully: " + user);
    console.log(process.env.JWT_SECRET);

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // Token expires in 7 days
      }
    );

    console.log("token: ", token);

    res.cookie("jwt", token, {
      httpOnly: true, // prevent from xxs attack
      // secure: true,  // for https
      // sameSite: "strict", // prevent from csrf attack
    });

    res.status(200).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error in signup" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "field is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const loginWalaPassword = password;
    const isMatch = await bcrypt.compare(loginWalaPassword, user.password);
    console.log("isMatch" + isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // Token expires in 7 days
      }
    );

    console.log("token: ", token);

    res.cookie("jwt", token, {
      httpOnly: true, // prevent from xxs attack
      // secure: true,
      // sameSite: "strict", // prevent from csrf attack
    });

    res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error in login" });
  }
};

const logout = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwt");

    // Respond with a success message
    res.status(200).json({ message: "User logged out successfully" });

    // Optionally, you can add logic to redirect to the login page or home page
    // For example:
    // res.redirect('/login');
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error during logout:", err);

    // Respond with an appropriate error message
    res.status(500).json({ error: "An error occurred while logging out" });
  }
};


const allUsers = async (req, res) => {
  try {
    console.log("req.user -> " + req.user);
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select(["-password", "-confirmPassword"]);

    console.log("allUsers -> " + filteredUsers);
    res.status(200).json({ data: filteredUsers }); // or return a paginated response here. You can add a query parameter for page number and limit.   // also, remember to add proper error handling for different types of errors. For instance, if the database is down.   // You can also add a rate limiting system to handle too many requests.   //
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error in getting all users" });
  }
};

module.exports = { signup, login, logout, allUsers };
