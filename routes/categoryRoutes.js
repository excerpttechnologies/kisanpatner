// const express = require("express");
// const router = express.Router();
// const { addCategory } = require("../controllers/categoryController");

// router.post("/add", addCategory);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { addCategory, getAll, updateCategory, deleteCategory } = require("../controllers/categoryController");
const upload = require("../middleware/upload");
router.post("/add", upload.single("image"),addCategory);
router.get("/all", getAll);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
