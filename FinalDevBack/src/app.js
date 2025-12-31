const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");




app.use(
  cors({
    origin: [
      "https://devconnect-fullstack-2zvr.onrender.com", // Your live frontend URL
      "http://localhost:5173",                         // Standard Vite local port
      "http://localhost:3000"                          // Standard React local port
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(PORT, () => {
      console.log("Server is successfully listening on port ${PORT}...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
