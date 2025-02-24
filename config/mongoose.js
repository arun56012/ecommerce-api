const mongoose = require('mongoose');
require('dotenv').config();  // Ensure environment variables are loaded

// MongoDB Connection URI (Local or Cloud)
 const MONGO_URI = process.env.MONGO_URI;

// Connection Options
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Successfully connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        setTimeout(connectDB, 5000); // Retry after 5 seconds
    }
};

// Initiate Connection
connectDB();

// Export the database connection
module.exports = mongoose;
