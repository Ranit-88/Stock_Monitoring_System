require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const { HoldingsModel } = require("./model/HoldingModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/stockMonitoring";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);
app.use(bodyParser.json());

const initialHoldings = [
  { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
  { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
  { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
  { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
  { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
  { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
  { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
  { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
  { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
  { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
  { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
  { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
  { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
];

const initialPositions = [
  { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
  { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
];

app.get("/home", (req, res) => {
  res.send("hello satya...");
});

app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/allPosition", async (req, res) => {
  try {
    let allPosition = await PositionsModel.find({});
    res.json(allPosition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode || "BUY",
      orderType: req.body.orderType || "LIMIT",
      product: req.body.product || "CNC",
    });
    await newOrder.save();
    res.status(201).json({ message: "Order saved!", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/allOrder", async (req, res) => {
  try {
    let allOrder = await OrdersModel.find({}).sort({ _id: -1 });
    res.json(allOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/updateHoldings", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    let holding = await HoldingsModel.findOne({ name });
    if (mode === "BUY") {
      if (holding) {
        const totalQty = holding.qty + Number(qty);
        const newAvg = ((holding.avg * holding.qty) + (Number(price) * Number(qty))) / totalQty;
        holding.qty = totalQty;
        holding.avg = Number(newAvg.toFixed(2));
        holding.price = Number(price);
        await holding.save();
      } else {
        await HoldingsModel.create({
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
          net: "0.00%",
          day: "0.00%",
        });
      }
    } else if (mode === "SELL") {
      if (holding) {
        if (holding.qty <= Number(qty)) {
          await HoldingsModel.deleteOne({ _id: holding._id });
        } else {
          holding.qty -= Number(qty);
          await holding.save();
        }
      }
    }
    const allHoldings = await HoldingsModel.find({});
    res.json({ message: "Holdings updated", holdings: allHoldings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Authentication
app.post("/signup", async (req, res) => {
  try {
    let { username, name, email, password } = req.body;
    let userIdentifier = username || name || (email ? email.split("@")[0] : "user");

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: "An account with this email already exists. Please log in." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await UserModel.create({
      username: userIdentifier,
      name: name || userIdentifier,
      email: email.toLowerCase(),
      password: hash,
    });

    const token = jwt.sign({ id: createdUser._id, email: createdUser.email, username: createdUser.username }, process.env.JWT_SECRET || "satya", { expiresIn: "24h" });
    res.cookie("token", token);
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { username: createdUser.username, name: createdUser.name, email: createdUser.email }
    });
  } catch (dbErr) {
    return res.status(400).json({ error: dbErr.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserModel.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: email }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET || "satya", { expiresIn: "24h" });
    res.cookie("token", token);
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { username: user.username, name: user.name || user.username, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`App is listening on port ${PORT}`);
  try {
    await mongoose.connect(uri);
    console.log("DB connected successfully!");

    // Seed default holdings if empty
    const holdingsCount = await HoldingsModel.countDocuments();
    if (holdingsCount === 0) {
      await HoldingsModel.insertMany(initialHoldings);
      console.log("Holdings data seeded!");
    }

    // Seed default positions if empty
    const positionsCount = await PositionsModel.countDocuments();
    if (positionsCount === 0) {
      await PositionsModel.insertMany(initialPositions);
      console.log("Positions data seeded!");
    }
  } catch (err) {
    console.error("DB connection error:", err.message);
  }
});
