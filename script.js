const itemForm = document.getElementById("item-form"); // get form element
const itemInput = document.getElementById("item-input"); // get input element
const itemList = document.getElementById("item-list"); // get list element
const itemClear = document.getElementById("clear"); // get clear button
const itemFilter = document.getElementById("filter"); // get filter input
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
};

const onAddItemSubmit = (e) => {
  e.preventDefault(); // prevent form submit

  const newItem = itemInput.value; // get input value

  // Validate Input
  if (newItem === "") {
    // if input value is empty
    alert("Please add an item"); // display alert message
    return; // stop execution of function
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("That item already exists!");
      return;
    }
  }

  addItemToDom(newItem);
  addItemToStorage(newItem);

  checkUI(); // check UI state
  itemInput.value = ""; // reset input value
};

const addItemToDom = (item) => {
  // Create list item
  const li = document.createElement("li"); // create li element
  li.appendChild(document.createTextNode(item)); // add text to li

  const button = createButton("remove-item btn-link text-red"); // create remove button
  li.appendChild(button); // add button to li

  // Add li to the DOM
  itemList.appendChild(li); // add li to list
};

const createButton = (classes) => {
  const button = document.createElement("button"); // create button element
  button.className = classes; // add classes to button
  const icon = createIcon("fa-solid fa-xmark"); // create icon
  button.appendChild(icon); // add icon to button
  return button; // return button
};

const createIcon = (classes) => {
  const icon = document.createElement("i"); // create icon element
  icon.className = classes; // add classes to icon
  return icon; // return icon
};

const addItemToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage();
  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const checkIfItemExists = (item) => {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
};

const setItemToEdit = (item) => {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  itemInput.value = item.textContent;
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
};

const removeItem = (item) => {
  if (confirm("Are you sure?")) {
    // remove from DOM
    item.remove();
    // remove from storage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();
  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  // reset to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const clearItems = () => {
  while (itemList.firstChild) {
    // while list has child elements
    itemList.removeChild(itemList.firstChild); // remove each child element
  }
  // clear from local storage
  localStorage.removeItem("items");

  checkUI(); // check UI state
};

function filterItems(e) {
  const text = e.target.value.toLowerCase(); // get filter input value
  const items = itemList.querySelectorAll("li"); // get all list items
  items.forEach((item) => {
    // loop through all items
    const itemName = item.firstChild.textContent; // get text content of item
    if (itemName.toLowerCase().indexOf(text) != -1) {
      // if item text content includes filter text
      item.style.display = "block"; // display item
    } else {
      item.style.display = "none"; // hide item
    }
  });
}

const checkUI = () => {
  itemInput.value = "";
  const items = itemList.querySelectorAll("li"); // get all list items
  if (itemList.children.length === 0) {
    // if list is empty
    itemClear.style.display = "none"; // hide clear button
    itemFilter.style.display = "none"; // hide filter input
  } else {
    // if list has items
    itemClear.style.display = "block"; // display clear button
    itemFilter.style.display = "block"; // display filter input
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#228B22";
  isEditMode = false;
};

// initialize app

function init() {
  // Event Listeners

  itemForm.addEventListener("submit", onAddItemSubmit); // listen for form submit
  itemList.addEventListener("click", onClickItem); // listen for list item click
  itemClear.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
