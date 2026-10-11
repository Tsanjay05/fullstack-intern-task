
const Template = require("../models/Template");

// GET /api/templates?search=dashboard&category=Dashboard
const getTemplates = async (req, res) => {
    try {
        const { search, category } = req.query;
        const filter = {};

        if (search && search.trim()) {
            const escapedSearch = search.trim().replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            filter.$or = [
                { name: { $regex: escapedSearch, $options: "i" } },
                { description: { $regex: escapedSearch, $options: "i" } }
            ];
        }

        if (category && category.trim()) {
            filter.category = {
                $regex: `^${category.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
                $options: "i"
            };
        }

        const templates = await Template.find(filter).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: templates.length,
            templates
        });
    } catch (error) {
        console.error("Get templates error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch templates"
        });
    }
};

module.exports = { getTemplates };
