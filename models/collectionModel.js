const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    rep: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A collection must belong to a rep"],
    },
    targetCollection: {
      type: Number,
      default: 10000,
    },
    actualCollection: {
      type: Number,
      required: [true, "A collection must have an Actual collection"],
    },
    rate: Number,
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
collectionSchema.pre("save", function (next) {
  const num = (this.actualCollection / this.targetCollection) * 100;
  this.rate = Math.round(num);
  // console.log(`${this.rate}%`);
  next();
});

// Populate every Query with info on the category
collectionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "rep",
    select: "name email",
  });
  next();
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
