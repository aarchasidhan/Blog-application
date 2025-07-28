const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect(
  "mongodb+srv://aarchasidharthan:user@cluster0.5ubrcgf.mongodb.net/blog_application?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// ✅ Mongoose Schema & Model
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
  category: String,
});

const BlogModel = mongoose.model("blogs", blogSchema);

// ✅ POST API – Add New Blog
// ✅ Fix: use correct model name
app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newBlog = new BlogModel({ title, content, img_url }); // ✅ Correct model
    await newBlog.save();

    res.status(201).json({ message: "Blog added", blog: newBlog });
  } catch (error) {
    console.error("Error saving blog:", error.message);
    res.status(500).json({ message: "Error saving blog" });
  }
});

// ✅ GET API – Fetch All Blogs
app.get("/get", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Error fetching data");
  }
});

// ✅ PUT API – Update Blog
app.put("/update/:id", async (req, res) => {
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        img_url: req.body.img_url,
      },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Failed to update blog" });
  }
});

// ✅ DELETE API – Delete Blog
app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Delete failed", error });
  }
});

// ✅ Optional: Auto-detect blog category from title
function guessCategory(title = "") {
  const t = title.toLowerCase();
  if (t.includes("travel")) return "Travel";
  if (t.includes("art")) return "Art";
  if (t.includes("food")) return "Food";
  return "General";
}

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
