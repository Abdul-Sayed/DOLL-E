import mongoose from "mongoose";

// Create a schema
const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

// Create a MongoDB model using the schema
const Post = mongoose.model("Post", PostSchema);

export default Post;
