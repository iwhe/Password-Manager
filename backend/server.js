// import express from "express"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import registerUser from "./controllers/user.controller.js";
import userRoute from "./routes/user.route.js";
import passwordRoute from "./routes/password.route.js";
import shareRoute from "./routes/share.route.js";
import { ApiError } from "./utils/ApiError.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);
app.use("/api/password", passwordRoute);
app.use("/api/share", shareRoute);

// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [],
      stack: err.stack,
    });
  }
});

export { app };
