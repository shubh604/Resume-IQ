const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL
  })
);

const uploadRoute = require("./routes/route");

app.use("/api/resume", uploadRoute);

app.use((err, req, res, next) => {
  return res.status(500).json({
    success: false,
    message: err.message
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started successfully at Port no. ${port}`);
});