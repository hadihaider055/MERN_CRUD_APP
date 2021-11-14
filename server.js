require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoute");
const noteRouter = require("./Routes/noteRoute");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DATABASE_URI = process.env.DATABASE_URI;

app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

// Connect MongoDB
mongoose.connect(
  DATABASE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Database connected");
  }
);

// Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log("Server listening on port " + port);
});
  