const app = require("./app");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });



const db = process.env.DATABASE_LOCAL || "mongodb://localhost:27017/elHayl";
try {
  mongoose.connect(db);
  console.log("connected to DataBase");
} catch {
  console.log("error connecting to DataBase");
}

const Port = process.env.Port || 3000;
app.listen(Port, () => {
  console.log(`connected on Port ${Port}`);
});
