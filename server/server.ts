import { v2 as cloudinary } from "cloudinary";
import { app } from "./app";
import connect from "./utils/db";
require("dotenv").config();

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Connect with server
app.listen(process.env.PORT, () => {
  console.log(`Server is live on http://localhost:${process.env.PORT}`);
  connect();
});
