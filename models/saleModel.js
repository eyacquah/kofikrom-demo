const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    rep: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A sale must belong to a rep"],
    },
    products: [
      {
        type: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "An order must have at least one product"],
        },
        quantitySold: {
          type: Number,
          required: [true, "An ordered product must have a quantity"],
        },
      },
    ],
    visits: {
      pharmacies: Number,
      hospitals: Number,
      others: Number,
      total: Number,
    },
    orders: {
      totalNum: Number,
      totalVal: Number,
    },
    collections: {
      totalNum: Number,
      totalVal: Number,
    },
    newCustomers: Number,
    daysWorked: Number,
    remarks: {
      expenses: String,
      experience: String,
      plan: String,
      returns: String,
      bouncedCheques: String,
      pendingOrders: String,
      weeklyMeetings: String,
    },
    targetSale: {
      type: Number,
      default: 10000,
    },
    actualSale: {
      type: Number,
      required: [true, "A sale must have an Actual Sale"],
    },
    rate: Number,
    region: String,
    date: {
      year: String,
      month: String,
      week: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//  Calculate Achievement Rate
saleSchema.pre("save", function (next) {
  const num = (this.actualSale / this.targetSale) * 100;
  this.rate = Math.round(num);
  // console.log(`${this.rate}%`);
  next();
});

// Populate every Query with info on the category
saleSchema.pre(/^find/, function (next) {
  this.populate({
    path: "rep",
    select: "name email region",
  });
  next();
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
