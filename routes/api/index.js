const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");
const authRoutes = require("./authenticate")

// Book routes
router.use("/books", bookRoutes);

// User routes
router.use("/users", userRoutes);

// Authentication routes
router.use("/login", authRoutes);

module.exports = router;