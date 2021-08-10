const factory = require("./handlerFactory");

const Sale = require("../models/saleModel");

// FACTORY CRUD
exports.createSale = factory.createOne(Sale);
exports.getAllSales = factory.getAll(Sale);
// exports.getSale = factory.getOne(Sale, { path: "products" });
exports.getSale = factory.getOne(Sale);
exports.updateSale = factory.updateOne(Sale);
exports.deleteSale = factory.deleteOne(Sale);
