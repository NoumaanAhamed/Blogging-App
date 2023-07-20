const mongoose = require("mongoose");
const Blog = require("../models/blogModel");

async function handleViewAllPublishedBlogs(req, res) {
  //   try {
  const blogs = await Blog.find({ published: true }).populate(
    "createdBy",
    "email profilePic"
  );
  res.send({ blogs });
  //   } catch (error) {
  //     res.status(500).send({ message: "An error occurred while viewing blogs" });
  //   }
}

async function handleViewBlog(req, res) {
  const { id } = req.params;

  let validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    return res.status(404).send({ message: "Invalid blog ID" });
  }

  let blog = await Blog.findById(id)
    .populate({
      path: "createdBy",
      select: "email profilePic",
    })
    .populate({
      path: "comments.user",
      select: "email ProfilePic",
    })
    .populate({
      path: "likes.user",
      select: "email",
    });

  if (!blog) {
    return res.status(404).send({ message: "blog doesn't exist" });
  }

  res.send({ blog });
}
async function handleCreateBlog(req, res) {
  const { title, body, coverImageURL, published } = req.body;

  if (!title || !body) {
    return res.status(409).send({ message: "missing details" });
  }

  const isExist = await Blog.findOne({ title });

  if (isExist) {
    return res.status(409).send({ message: "blog already exists" });
  }

  const createdBy = req.data.userId || req.data.adminId;

  const newBlog = await Blog.create({
    title,
    body,
    coverImageURL,
    createdBy,
    published,
  });

  res.send(newBlog);
}

async function handleUpdateBlog(req, res) {
  const { id } = req.params;

  let validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    return res.status(404).send({ message: "Invalid Blog ID" });
  }

  const { title, body, coverImageURL } = req.body;

  if (!title || !body) {
    return res.status(409).send({ message: "missing details" });
  }

  let blog = await Blog.findById(id);

  if (!blog) {
    return res.status(409).send({ message: "blog doesn't exists" });
  }

  blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

  if (!blog) {
    return res.status(404).send({ message: "blog not found" });
  }

  res.send({ message: "blog updated successfully" });
}

async function handleDeleteBlog(req, res) {
  const { id } = req.params;

  let validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    return res.status(404).send({ message: "Invalid Blog ID" });
  }

  let blog = await Blog.findById(id);

  if (!blog) {
    return res.status(409).send({ message: "blog doesn't exists" });
  }

  blog = await Blog.findByIdAndDelete(id, { new: true });

  if (!blog) {
    return res.status(404).send({ message: "blog not found" });
  }

  res.send({ message: "blog deleted successfully" });
}

async function handleComment(req, res) {}

async function handleLike(req, res) {}

async function handleViewMyBlogs(req, res) {
  try {
    // Fetch blogs created by the authenticated user (blog creator)
    const myBlogs = await Blog.find({
      createdBy: req.data.userId || req.data.adminId,
    });

    res.json(myBlogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user's blogs" });
  }
}

async function handlePublishBlog(req, res) {}

async function handleViewAllBlogs(req, res) {
  try {
    const blogs = await Blog.find({}).populate("users");
    res.send({ blogs });
  } catch (error) {
    res.status(500).send({ message: "An error occurred while viewing blogs" });
  }
}

module.exports = {
  handleViewAllBlogs,
  handleViewAllPublishedBlogs,
  handleCreateBlog,
  handleViewBlog,
  handleUpdateBlog,
  handleDeleteBlog,
  handleComment,
  handleLike,
  handleViewMyBlogs,
  handlePublishBlog,
};
