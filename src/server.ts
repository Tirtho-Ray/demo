import mongoose from "mongoose";
import app from "./app";


const port = process.env.PORT || 8000
const db = process.env.DB_URL ||""

async function main() {
  await mongoose.connect(db as string);
  console.log("db is connext ")
  app.listen(port ,() =>{
    console.log(`port is running on port ${port}`)
  })
};
main()

