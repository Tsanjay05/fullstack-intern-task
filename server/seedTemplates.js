
require("dotenv").config();

const mongoose = require("mongoose");
const Template = require("./src/models/Template");

const sampleTemplates = [
    {
        name: "Modern SaaS Landing Page",
        description: "A clean landing page template for SaaS startups.",
        thumbnail_url: "https://placehold.co/600x400?text=SaaS+Landing+Page",
        category: "Landing Page"
    },
    {
        name: "Admin Dashboard UI",
        description: "A dashboard template for analytics and business metrics.",
        thumbnail_url: "https://placehold.co/600x400?text=Admin+Dashboard",
        category: "Dashboard"
    },
    {
        name: "Portfolio Website",
        description: "A professional portfolio template for developers and designers.",
        thumbnail_url: "https://placehold.co/600x400?text=Portfolio",
        category: "Portfolio"
    },
    {
        name: "E-commerce Store",
        description: "A storefront template for displaying and selling products.",
        thumbnail_url: "https://placehold.co/600x400?text=Ecommerce+Store",
        category: "E-commerce"
    },
    {
        name: "Login Page UI",
        description: "A minimal and responsive authentication page template.",
        thumbnail_url: "https://placehold.co/600x400?text=Login+Page",
        category: "Authentication"
    },
    {
        name: "Analytics Dashboard",
        description: "A visual dashboard for charts, reports, and key performance indicators.",
        thumbnail_url: "https://placehold.co/600x400?text=Analytics",
        category: "Dashboard"
    }
];

async function seedTemplates() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Avoid adding duplicate copies of the sample templates.
        for (const template of sampleTemplates) {
            await Template.updateOne(
                { name: template.name },
                { $setOnInsert: template },
                { upsert: true }
            );
        }

        console.log("Sample templates added successfully.");
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedTemplates();
