const errorHandler = require("./middleware/errorMiddleware");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use("/api", patientRoutes);

app.get("/", (req, res) => {
  res.send("Hospital Backend API Running");
});

const PORT = process.env.PORT || 5000;
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});