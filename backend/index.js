import { configDotenv } from "dotenv";
import connectDB from "./DB/connect.js";
import { app } from "./server.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect MongoDB database!", error);
  });
