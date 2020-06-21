const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const db =
  "mongodb+srv://rabina123:rabina123@trio-arteu.mongodb.net/trio?retryWrites=true&w=majority";
// Connecting to the database
const connectDb = async () => {
  const conn = await mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`Connected: ${conn.connection.host}`.green.underline);
};

module.exports = connectDb;
