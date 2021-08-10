const express = require("express");

const authController = require("../controllers/auth");
const dashboardController = require("../controllers/dashboard");

const router = express.Router();

// Routes

router.get("/login", dashboardController.renderLoginForm);
router.use(authController.protect);

router.get("/sales/add", dashboardController.renderSaleForm);
router.get("/collections/add", dashboardController.renderCollectionForm);

router.use(dashboardController.redirectUser);

router.get("/", dashboardController.renderIndex);

router.get("/signup", dashboardController.renderSignUpForm);

router.get("/products/add", dashboardController.renderProductForm);
router.get("/products/:slug/edit", dashboardController.getUpdateProductForm);
router.get("/products/all", dashboardController.getAllProducts);

router.get("/categories/all", dashboardController.getAllCategories);

// router.get("/customers/all", dashboardController.getAllCustomers);

module.exports = router;
