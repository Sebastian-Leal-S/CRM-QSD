const mongoose = require('mongoose');

// Connecting to db
async function connectToDB() {
  try {
    let db = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to', db.connection.name);
  } catch (error) {
    console.error(err);
  }
}

connectToDB();
