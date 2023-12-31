const express = require("express");

const router = express.Router();

const {
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
  handleViewMyBlog,
} = require("../controllers/blogControllers");

const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const checkBlogOwnership = require("../middlewares/blog");

router
  .route("/")
  .get(handleViewAllPublishedBlogs)
  .post(isAuthenticated, handleCreateBlog);

router.get("/me", isAuthenticated, handleViewMyBlogs);

router.get("/me/:id", isAuthenticated, checkBlogOwnership, handleViewMyBlog);

router.get("/all", isAuthenticated, isAdmin, handleViewAllBlogs);

router
  .route("/:id")
  .get(handleViewBlog)
  .put(isAuthenticated, checkBlogOwnership, handleUpdateBlog)
  .delete(isAuthenticated, checkBlogOwnership, handleDeleteBlog);

router.put(
  "/publish/:id",
  isAuthenticated,
  checkBlogOwnership,
  handlePublishBlog
);

router.post("/:id/comment", isAuthenticated, handleComment);

router.post("/:id/like", isAuthenticated, handleLike);

module.exports = router;
