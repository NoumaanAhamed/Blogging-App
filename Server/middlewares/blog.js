const Blog = require("../models/blogModel");

async function checkBlogOwnership(req, res, next) {
  // const { id } = req.params;

  //!admin check
  if (req.data.adminId) {
    return next();
  }

  const blogId = req.params.id;
  // try {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const validId = req.data.userId;

  // Check if the authenticated user is the creator of the blog
  if (blog.createdBy.toString() !== validId.toString()) {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
  }

  // If the user is the creator, proceed to the next middleware or route handler
  next();
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to check blog ownership" });
  // }
}

module.exports = checkBlogOwnership;
