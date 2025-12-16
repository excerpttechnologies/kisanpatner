const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const history = require('connect-history-api-fallback');
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// ==================== EXISTING ROUTES ====================
app.use("/category", require("./routes/categoryRoutes"));
app.use("/farmer/register", require("./routes/farmerRoutes"));
app.use("/farmer", require("./routes/authroutes"));
app.use("/api/requirements", require('./routes/requirementRoutes'));

// ==================== NEW ROUTES FOR ALLCROPS COMPONENT ====================

// Route for getting all crops with filters
app.use("/api/crops", require("./routes/AllCropsroutes"));

// Route for location data (state, district, taluka)
app.use("/api/locations", require("./routes/locations"));

// Route for categories and subcategories
app.use("/api/categories", require("./routes/categoryRoutes"));
// Route for subcategories
app.use("/api/subcategory", require("./routes/subcategoryRoutes"));

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "Server is running",
    routes: {
      crops: "/api/crops",
      locations: "/api/locations",
      categories: "/api/categories",
      requirements: "/api/requirements"
    }
  });
});

// Serve frontend
app.use(history());
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 AllCrops API available at: http://localhost:${PORT}/api/crops`);
  console.log(`📍 Location API: http://localhost:${PORT}/api/locations`);
  console.log(`📊 Categories API: http://localhost:${PORT}/api/categories`);
});