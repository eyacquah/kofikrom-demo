// import axios from "axios";

const saleForm = document.querySelector(".saleForm");
const collectionForm = document.querySelector(".collectionForm");

const createSale = async (e) => {
  e.preventDefault();
  const form = e.target;

  const sale = {
    date: {},
  };

  sale.rep = form.dataset.id;
  sale.actualSale = +form.actual.value;
  sale.targetSale = +form.target.value;
  sale.date.week = form.week.value;
  sale.date.year = "2021";
  sale.date.month = "August";

  console.log(sale);

  try {
    const res = await axios.post("/api/v1/sales", sale);

    if (res.data.status === "success") {
      location.assign("/");
    }
  } catch (err) {
    console.error(err);
  }
};

const createCollection = async (e) => {
  e.preventDefault();
  const form = e.target;

  const collection = {
    date: {},
  };

  collection.rep = form.dataset.id;
  collection.actualCollection = +form.actual.value;
  collection.targetCollection = +form.target.value;
  collection.date.week = form.week.value;
  collection.date.year = "2021";
  collection.date.month = "August";

  console.log(collection);

  try {
    const res = await axios.post("/api/v1/collections", collection);

    if (res.data.status === "success") {
      location.assign("/");
    }
  } catch (err) {
    console.error(err);
  }
};

if (collectionForm) collectionForm.addEventListener("submit", createCollection);
if (saleForm) saleForm.addEventListener("submit", createSale);
