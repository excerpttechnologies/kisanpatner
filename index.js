// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const path = require("path");
// const history = require('connect-history-api-fallback');
// const app = express();
// app.use(cors());
// app.use(express.json());

// connectDB();

// app.use("/category", require("./routes/categoryRoutes"));
// app.use("/farmer/register", require("./routes/farmerRoutes"));
// app.use("/farmer", require("./routes/authroutes"));
// app.use(history());
// app.use(express.static(path.join(__dirname, 'dist')));
// app.listen(8080, () => console.log("Server running on port 8080"));



// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const path = require("path");
// const history = require('connect-history-api-fallback');
// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

// app.use("/category", require("./routes/categoryRoutes"));
// app.use("/farmer/register", require("./routes/farmerRoutes"));
// app.use("/farmer", require("./routes/authroutes"));

// // Add these transport routes
// app.use("/transport", require("./routes/authroutes"));

// app.use(history());
// app.use(express.static(path.join(__dirname, 'dist')));

// app.listen(8080, () => console.log("Server running on port 8080"));



// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const path = require("path");
// const history = require('connect-history-api-fallback');
// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

// app.use("/category", require("./routes/categoryRoutes"));
// app.use("/farmer/register", require("./routes/farmerRoutes"));
// app.use("/farmer", require("./routes/authroutes"));

// // Transport routes - add these
// app.use("/transport", require("./routes/transportRoutes")); // For transport authentication
// app.use("/transport/register", require("./routes/transporterRoutes")); // For transport registration

// app.use(history());
// app.use(express.static(path.join(__dirname, 'dist')));

// app.listen(8080, () => console.log("Server running on port 8080"));



const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const history = require('connect-history-api-fallback');
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Farmer routes
app.use("/category", require("./routes/categoryRoutes"));
app.use("/farmer/register", require("./routes/farmerRoutes"));
app.use("/farmer", require("./routes/authroutes"));

// Transport routes - CORRECTED
// Note: All transport routes will be under /transport
app.use("/transport", require("./routes/transportRoutes")); // This should include ALL transport routes

app.use(history());
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(8080, () => {
  console.log("Server running on port 8080");
  console.log("Transport API available at:");
  console.log("  - /transport/profile/:id");
  console.log("  - /transport/mobile/:mobileNo");
});