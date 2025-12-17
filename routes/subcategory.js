const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/subcategory");
const upload = require("../middleware/upload");

router.post("/add",upload.single("image"), ctrl.addSubCategory);
router.get("/all", ctrl.getAllSub);
router.get("/category/:categoryId", ctrl.getSubCategoriesByCategory);
router.put("/update/:id", ctrl.updateSub);
router.delete("/delete/:id", ctrl.deleteSub);

module.exports = router;
