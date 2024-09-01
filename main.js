const form = document.querySelector(".grocery-form");

const grocery = document.getElementById("grocery");

const container = document.querySelector(".grocery-container");

const list = document.querySelector(".grocery-list");

const alert = document.querySelector(".alert");

const submitBtn = document.querySelector(".submit-btn");

const clearBtn = document.querySelector(".clear-btn");

form.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearAll);

let editElement = "";
let editFlag = false;
let editID = "";
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    </div>
    `;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    list.appendChild(element);

    displayAlert("Başarıyla Eklendi", "succes");

    container.classList.add("show-container");

    grocery.value = "";
  } else if (value !== "" && editFlag) {
    grocery.value = "";
    submitBtn.innerHTML = "Ekle";
    editElement.innerHTML = value;
    displayAlert("Ürün Değiştirildi", "succes");
    editFlag = false;
  } else {
    displayAlert("Lütfen Ürün Giriniz", "danger");
  }
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  displayAlert("Ürün Kaldırıldı", "danger");
}
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "Düzenle";
}
function clearAll() {
  const items = document.querySelectorAll(".grocery-ıtem");
  if (items.length > 0) {
    items.forEach((item) => list.removeChild(item));
  }
  container.classList.remove("show-container");
  displayAlert("Liste Temizlendi", "danger");
}
