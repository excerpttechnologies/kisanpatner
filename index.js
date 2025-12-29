// require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const path = require("path");
// const history = require('connect-history-api-fallback');

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// // DB
// connectDB();

// // Static files
// app.use('/uploads', express.static('uploads'));

// // Core Routes
// app.use("/category", require("./routes/categoryRoutes"));
// app.use("/subcategory", require("./routes/subcategory"));

// // Crop & Tracking
// app.use('/crop', require('./routes/cropRoutes'));
// app.use('/tracking', require('./routes/trackingRoutes'));

// // Safety-net: tracking fallback
// try {
//   const trackingController = require('./controllers/trackingController');
//   app.post('/tracking/init', trackingController.createOrInit);
//   app.get('/tracking/by-name', trackingController.getByName);
// } catch (e) {
//   console.warn('Could not mount tracking controller safety-net:', e.message || e);
// }

// // Farmer & Auth
// app.use("/farmer/register", require("./routes/farmerRoutes"));
// app.use("/farmer", require("./routes/authroutes"));

// // Product
// app.use('/product', require('./routes/productRoutes'));

// // ✅ ADDED BACK (missing before)
// app.use('/transport', require('./routes/transportRoutes'));
// app.use('/payment', require('./routes/traderpaymentroutes'));

// // Frontend
// app.use(history());
// app.use(express.static(path.join(__dirname, 'dist')));

// // Debug helper
// function listRoutes() {
//   const routes = [];
//   if (!app._router) return routes;
//   app._router.stack.forEach((layer) => {
//     if (layer.route && layer.route.path) {
//       const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(',');
//       routes.push(`${methods} ${layer.route.path}`);
//     } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
//       layer.handle.stack.forEach((l) => {
//         if (l.route && l.route.path) {
//           const methods = Object.keys(l.route.methods).map(m => m.toUpperCase()).join(',');
//           routes.push(`${methods} ${l.route.path}`);
//         }
//       });
//     }
//   });
//   return routes;
// }

// app.get('/_routes', (req, res) => {
//   res.json({ success: true, routes: listRoutes() });
// });

// // Server
// const PORT = process.env.PORT || 8080;
// console.log('Mounted routes:', listRoutes());
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const history = require('connect-history-api-fallback');

const app = express();

// =======================
// Middlewares
// =======================
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// =======================
// DB Connection
// =======================
connectDB();

// =======================
// Static files
// =======================
app.use('/uploads', express.static('uploads'));

// =======================
// Core Routes
// =======================
app.use("/category", require("./routes/categoryRoutes"));
app.use("/subcategory", require("./routes/subcategory"));

// =======================
// Crop & Tracking
// =======================
app.use('/crop', require('./routes/cropRoutes'));
app.use('/tracking', require('./routes/trackingRoutes'));

// Safety-net: tracking fallback
try {
  const trackingController = require('./controllers/trackingController');
  app.post('/tracking/init', trackingController.createOrInit);
  app.get('/tracking/by-name', trackingController.getByName);
} catch (e) {
  console.warn('Could not mount tracking controller safety-net:', e.message || e);
}

// =======================
// Farmer & Auth
// =======================
app.use("/farmer/register", require("./routes/farmerRoutes"));
app.use("/farmer", require("./routes/authroutes"));

// =======================
// Product
// =======================
app.use('/product', require('./routes/productRoutes'));

// =======================
// Transport & Payment
// =======================
app.use('/transport', require('./routes/transportRoutes'));
app.use('/payment', require('./routes/traderpaymentroutes'));

// =======================
// ✅ NEWLY ADDED ROUTES
// =======================
app.use("/api/market", require("./routes/marketRoutes"));
app.use("/api/packaging", require("./routes/quantitytyperRoutes"));

app.use("/api/commission", require("./routes/commissionRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/transporter", require("./routes/transporterRoutes"));
app.use("/api/admin", require("./routes/adminorderRoutes"));
app.use("/api/orders/history", require("./routes/orderhistoryRoutes"));
// =======================
// Frontend (SPA)
// =======================
app.use(history());
app.use(express.static(path.join(__dirname, 'dist')));

// =======================
// Debug helper
// =======================
function listRoutes() {
  const routes = [];
  if (!app._router) return routes;

  app._router.stack.forEach((layer) => {
    if (layer.route && layer.route.path) {
      const methods = Object.keys(layer.route.methods)
        .map(m => m.toUpperCase())
        .join(',');
      routes.push(`${methods} ${layer.route.path}`);
    } else if (layer.name === 'router' && layer.handle?.stack) {
      layer.handle.stack.forEach((l) => {
        if (l.route && l.route.path) {
          const methods = Object.keys(l.route.methods)
            .map(m => m.toUpperCase())
            .join(',');
          routes.push(`${methods} ${l.route.path}`);
        }
      });
    }
  });

  return routes;
}

app.get('/_routes', (req, res) => {
  res.json({ success: true, routes: listRoutes() });
});

// =======================
// Server
// =======================
const PORT = process.env.PORT || 8080;
console.log('Mounted routes:', listRoutes());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
