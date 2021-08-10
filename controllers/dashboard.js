const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Sale = require("../models/saleModel");
const Collection = require("../models/collectionModel");
// const Order = require("../models/orderModel");
// const Customer = require("../models/customerModel");
const User = require("../models/userModel");
// const Slider = require("../models/sliderModel");
const APIFeatures = require("../utils/apiFeatures");

exports.renderSignUpForm = (req, res) => res.status(200).render("signup");

exports.renderLoginForm = (req, res) => res.status(200).render("login");

exports.redirectUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  if (user.role === "rep") return res.status(200).render("options", { user });

  next();
});

exports.renderIndex = catchAsync(async (req, res) => {
  const sales = await Sale.find();
  const collections = await Collection.find();
  res.status(200).render("index", { sales, collections });
});

exports.renderSaleForm = catchAsync(async (req, res) => {
  const { user } = req;
  const products = await Product.find();

  return res
    .status(200)
    .render("sales-form", { title: "Sale Form", user, products });
});

exports.renderCollectionForm = (req, res) => {
  const { user } = req;

  return res
    .status(200)
    .render("collections-form", { title: "Collection Form", user });
};

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).render("category-list", {
    categories,
    title: "All Categories",
  });
});

exports.renderProductForm = catchAsync(async (req, res) => {
  const categories = await Category.find();
  res
    .status(200)
    .render("add-product", { categories, title: "Add New Product" });
});

exports.getUpdateProductForm = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });
  const categories = await Category.find();

  res.status(200).render("editProduct", {
    product,
    categories,
    title: "Edit Product",
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).render("product-list", {
    title: "All Products",
    products,
  });
});

// exports.getAllCustomers = catchAsync(async (req, res, next) => {
//   const customers = await Customer.find();

//   res.status(200).render("customer-list", {
//     title: "All Customers",
//     customers,
//   });
// });

// exports.getAllOrders = catchAsync(async (req, res, next) => {
//   const results = await Order.find();

//   const orders = results.map((order) => {
//     order.payStatus = order.paid ? "Paid" : "Pending";
//     order.delStatus = order.delivered ? "Delivered" : "Pending";
//     return order;
//   });

//   orders.reverse();

//   res.status(200).render("order-list", {
//     title: "All Orders",
//     orders,
//   });
// });

// exports.getOrderDetail = catchAsync(async (req, res, next) => {
//   const order = await Order.findById(req.params.orderId);

//   const noteDate = new Date(Date.parse(order.notes[0].createdAt));

//   const noteOptions = {
//     hour: "2-digit",
//     minute: "2-digit",
//     timeZone: "GMT",
//     timeZoneName: "short",
//   };

//   order.notes[0].date = noteDate.toLocaleTimeString("en-GB", noteOptions);

//   order.payStatus = order.paid ? "Paid" : "Pending";
//   order.delStatus = order.delivered ? "Delivered" : "Pending";

//   res.status(200).render("order-detail", {
//     title: "Order Detail",
//     order,
//   });
// });

// ///// DELETE

// exports.confirmDeleteProduct = catchAsync(async (req, res, next) => {
//   const productArr = await Product.find({ slug: req.params.slug });
//   const product = productArr[0];

//   res.status(200).render("delete-product", {
//     product,
//   });
// });

// exports.confirmDeleteCategory = catchAsync(async (req, res, next) => {
//   const catArr = await Category.find({ slug: req.params.slug });
//   const category = catArr[0];

//   res.status(200).render("delete-category", {
//     category,
//   });
// });

// exports.confirmDeleteOrder = catchAsync(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   res.status(200).render("delete-order", {
//     order,
//   });
// });

// exports.getSearchResults = catchAsync(async (req, res, next) => {
//   const { product } = req.query;

//   const results = await Product.find({
//     title: { $regex: new RegExp(`^${product}`, "i") },
//   });

//   const features = new APIFeatures(
//     Product.find({
//       title: { $regex: new RegExp(`^${product}`, "i") },
//     }),
//     req.query
//   ).paginate();

//   const allProducts = await features.query;

//   const products = allProducts.map((item) => {
//     item.amountOff = item.priceDiscount
//       ? 100 - Math.floor((item.priceDiscount / item.price) * 100)
//       : 0;

//     return item;
//   });

//   const numResults = results.length;
//   const RES_PER_PAGE = 10;
//   const numOfPages = Math.ceil(numResults / RES_PER_PAGE);
//   const currPage = +req.query.page || 1;

//   res.locals.currPage = currPage;
//   res.locals.numOfPages = numOfPages;
//   res.locals.pageLimit = RES_PER_PAGE;
//   res.locals.query = product;

//   res.status(200).render("product-list", {
//     title: "Admin",
//     products,
//   });
// });

// exports.getSliderUpdateForm = catchAsync(async (req, res, next) => {
//   const slider = await Slider.findById("603e1a9e45a8e80a8ca21fa9");
//   res.status(200).render("slider-form", {
//     slider,
//   });
// });
