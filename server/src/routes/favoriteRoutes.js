
const express = require("express");
const router = express.Router();

const {
    addFavorite,
    getFavorites,
    removeFavorite
} = require("../controllers/favoriteController");

const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/:templateId", addFavorite);
router.get("/", getFavorites);
router.delete("/:templateId", removeFavorite);

module.exports = router;
