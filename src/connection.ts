import { connect } from "mongoose";
require("dotenv").config();
const uri = process.env.TOKENSECRET ;

const dbName = "onlineCoding";

export const connectToDB = async () => {
  try {
    await connect(`${uri}${dbName}`);
    console.log("db connected");
  } catch (err) {
    console.log("error connecting to DB", err);
  }
};
