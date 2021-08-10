const products = [
  "A-L (DS) TABS | 12",
  "A-L (FORTE) TABS | 6",
  "A-L (SS) TABS | 24",
  "BIMOX 1000 TABS | 10",
  "BIMOX 625 TABS | 14",
  "BIMOX SUSP. 228.5MG/5ML | 100ML",
  "BIMOX SUSP. 457MG/5ML | 100ML",
  "CEF-K INJECTION | 1",
  "CIPAC EYE/EAR DROPS | 10ML",
  "CLOFORT 500 CAPSULES | 15",
  "CLOFORT SUSP. 125MG/5ML | 100ML",
  "CLOFORT SUSP. 250MG/5ML | 100ML",
  "GENTA-K EYE/EAR DROPS | 10ML",
  "K-BALM OINTMENT | 9ML",
  "KLINDA-150 CAPS | 100",
  "KLINDA-300 CAPS | 100",
  "KLOF GEL | 30G",
  "KOCEF 125 SUSP. | 100ML",
  "KOCEF 500 TABS | 10",
  "METCLOMIN 500 TABS | 30",
  "METCLOMIN ER 1000 TABS | 28",
  "PINEK-20 TABLETS (SR) | 100",
  "PINEK-30 TABLETS (XL) | 30",
  "RAMICOL EYE DROPS | 10ML",
  "RIMA CREAM | 20G",
  "RIMA DS CREAM | 20G",
  "RIMA PLUS CREAM | 30G",
  "TALGENTIS-20 TABLETS | 4",
  "TALGENTIS-5 TABLETS | 30",
  "KK HAND SANITISER | 50ML",
  "KK HAND SANITISER | 100ML",
  "KK HAND SANITISER | 250ML",
  "KK HAND SANITISER | 500ML",
  "KK HAND SANITISER | 5L",
  "KK RUBBING ALCOHOL | 250ML",
  "KK RUBBING ALCOHOL | 500ML",
  "KK RUBBING ALCOHOL | 5L",
  "KK METHYLATED SPIRIT | 50ML",
  "KK METHYLATED SPIRIT | 100ML",
  "KK METHYLATED SPIRIT | 500ML",
  "KK METHYLATED SPIRIT | 1L",
  "KK METHYLATED SPIRIT | 5L",
  "BIMOX 1.2G INJ. + SWFI | 10ML",
  "BIMOX 600MG INJ. + SWFI | 10ML",
  "CEF-K 2G INJ. + SWFI | 10ML",
  "KOCEF 750MG INJ. + SWFI | 10ML",
  "SANA DROPS | 10ML",
  "K-BLAD TONIK | 200ML",
  "K-KOLDE SOFT GELS",
  "K-VITA PLUS TABS",
  "KIBUCET TABS",
  "TYMEN 400",
  "KLOF EYE DROPS",
  "KOPRED 0.5% EYE DROPS",
  "KOPRED 1% EYE DROPS",
  "LOLO 0.5% EYE DROPS",
  "METAN EYE DROPS",
];

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config({ path: "./config.env" });

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log("DB Connection successful");
};

async function deleteData() {
  try {
    console.log("Deleting data..");
    await Product.deleteMany();

    console.log("Data successfuly deleted");
  } catch (err) {
    console.log(err);
  }
  // process.exit();
}

let count = 1;
const uploadProducts = async (productTitle) => {
  try {
    const product = await Product.create({ title: productTitle });
    console.log(`Product number ${count} uploaded`);
    count++;
  } catch (err) {
    console.error(err);
  }
};

// connectDB();
// deleteData();
// products.forEach(async (product) => await uploadProducts(product));
