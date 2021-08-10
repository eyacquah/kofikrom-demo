const productForm = document.querySelector(".productForm");
const deleteProductBtns = document.querySelectorAll(".deleteProduct");
const confirmDeleteBtn = document.querySelector(".confirmDeleteProduct");
const deleteTextEl = document.querySelector(".deleteText");

const createOrUpdateProduct = async (e) => {
  e.preventDefault();

  const form = e.target;
  const productId = form.dataset.id;

  if (!form.title.value || !form.price.value) {
    return showAlert(
      "error",
      "You must fill all required fields of this form",
      "productForm"
    );
  }

  const productForm = {};

  const visibility =
    form.visibility.selectedOptions[0].dataset.bool === "yes" ? true : false;

  productForm.title = form.title.value;
  productForm.description = form.description.value;
  productForm.price = form.price.value;
  productForm.priceDiscount = form.priceDiscount.value;
  productForm.category = form.category.selectedOptions[0].dataset.id;
  productForm.isVisible = visibility;

  console.log(productForm);

  if (productId) return await updateProduct(productForm, productId);

  return await createProduct(productForm);
};

const updateProduct = async (data, id) => {
  try {
    renderSpinner("productBtn", "render", "Updating...");

    const res = await axios.patch(`/api/v1/products/${id}`, data);

    if (res.data.status === "success") {
      window.location.href = `${window.location.origin}/products/all`;
    }
  } catch (err) {
    showAlert("error", "Product not updated", "productForm");
    showAlert("error", err.message, "productForm");
    renderSpinner("productBtn", "remove", "");
    console.error(err);
  }
};

const createProduct = async (data) => {
  try {
    renderSpinner("productBtn", "render", "Uploading...");
    const res = await axios.post("/api/v1/products", data);

    if (res.data.status === "success") {
      window.location.href = `${window.location.origin}/products/all`;
    }
  } catch (err) {
    showAlert("error", "Product not uploaded", "productForm");
    showAlert("error", err.message, "productForm");
    renderSpinner("productBtn", "remove", "");
    console.error(err);
  }
};

// DELETE PRODUCT
const displayDeleteWarning = (e) => {
  const product = JSON.parse(
    e.target.closest(".deleteProduct").dataset.product
  );
  deleteTextEl.textContent = `Are you sure you want to delete ${product.title}?
  This action is irreversible.`;

  confirmDeleteBtn.dataset.id = product.id;
};

const deleteProduct = async (e) => {
  try {
    const res = await axios.delete(`/api/v1/products/${e.target.dataset.id}`);
    if (res.status === 204) {
      window.location.href = `${window.location.origin}/products/all`;
    }
  } catch (err) {
    console.error(err);
  }
};

if (productForm) {
  productForm.addEventListener("submit", createOrUpdateProduct);
}

if (deleteProductBtns) {
  deleteProductBtns.forEach((btn) =>
    btn.addEventListener("click", displayDeleteWarning)
  );
}

if (confirmDeleteBtn) {
  confirmDeleteBtn.addEventListener("click", deleteProduct);
}

////////////////////////////////////////////////////////////////////////////////////////
///// HELPERS
function showAlert(type, msg, insertClass) {
  const html = `
  <div class="alert alert-${
    type === "success" ? "success" : "danger"
  } alert-dismissible fade show" role="alert">
  <span class="fw-medium">${
    type === "success" ? "PRO TIP" : type.toUpperCase()
  } :</span> ${msg}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  `;

  const pos = document.querySelector(`.${insertClass}`);
  pos.insertAdjacentHTML("afterbegin", html);
}

const spinner = {
  hasNotSpan: true,
  originalHTML: "",
};

function renderSpinner(btnClass, type, text) {
  const spinnerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
  ${text}`;
  const btn = document.querySelector(`.${btnClass}`);
  //   const originalBtn = btn.innerHTML;
  if (spinner.hasNotSpan) {
    spinner.originalHTML = btn.innerHTML;
    spinner.hasNotSpan = false;
  }

  btn.innerHTML = type === "render" ? spinnerHTML : spinner.originalHTML;
}
