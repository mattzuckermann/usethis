import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const connectDb = (handler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return handler(req, res);
};

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to mongo");
});

export default connectDb;
