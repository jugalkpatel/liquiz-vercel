const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("successfully connnected with database");
  } catch (error) {
    console.log("error occurred while connecting to the database");
    process.exit(1);
  }
}

module.exports = { connect };