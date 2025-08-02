const mongoose = require("mongoose");

//  Connect to MongoDB
mongoose.connect(
  "mongodb+srv://aarchasidharthan:user@cluster0.5ubrcgf.mongodb.net/blog_application?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));
