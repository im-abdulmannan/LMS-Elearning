import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.DB_URI || "";

const connect = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`Database is connected to ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connect, 5000);
  }
};

export default connect;