import { v2 as cloudinary } from "cloudinary";
import http from "http";
import { app } from "./app";
import { initSocketServer } from "./socketServer";
import connect from "./utils/db";
const server = http.createServer(app);
require("dotenv").config();

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

initSocketServer(server);

// Connect with server
server.listen(process.env.PORT, () => {
  console.log(`Server is live on http://localhost:${process.env.PORT}`);
  connect();
});
