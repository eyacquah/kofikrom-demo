const express = require("express");

const mainController = require("../controllers/main");
// const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", mainController.renderIndex);

router.get("/cart", mainController.renderCartPage);
router.get("/checkout", mainController.renderCheckoutPage);
router.get("/shipping", mainController.renderShippingPage);
router.get("/payment", mainController.renderPaymentPage);
router.get("/order-summary", mainController.renderOrderSummaryPage);
router.get("/order/complete", mainController.renderOrderCompletePage);

// router.get("/search", mainController.getSearchResults);

router.get("/:categorySlug/:productSlug", mainController.renderProductDetail);
router.get("/:categorySlug", mainController.getCategoryProducts);

// router.get("/orders/:orderID", mainController.getOrderCompletePage);

module.exports = router;
