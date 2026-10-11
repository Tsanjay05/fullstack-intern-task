
const Favorite = require("../models/Favorite");
const Template = require("../models/Template");

// POST /api/favorites/:templateId
const addFavorite = async (req, res) => {
    try {
        const { templateId } = req.params;

        const template = await Template.findById(templateId);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: "Template not found"
            });
        }

        const favorite = await Favorite.findOneAndUpdate(
            {
                user: req.user.userId,
                template: templateId
            },
            {
                $setOnInsert: {
                    user: req.user.userId,
                    template: templateId
                }
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Template added to favorites",
            favorite
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid template ID"
            });
        }

        console.error("Add favorite error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to add favorite"
        });
    }
};

// GET /api/favorites
const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({
            user: req.user.userId
        })
            .populate("template")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: favorites.length,
            favorites
        });
    } catch (error) {
        console.error("Get favorites error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch favorites"
        });
    }
};

// DELETE /api/favorites/:templateId
const removeFavorite = async (req, res) => {
    try {
        const { templateId } = req.params;

        const favorite = await Favorite.findOneAndDelete({
            user: req.user.userId,
            template: templateId
        });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Favorite not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Template removed from favorites"
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid template ID"
            });
        }

        console.error("Remove favorite error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to remove favorite"
        });
    }
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite
};
