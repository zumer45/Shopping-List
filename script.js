const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemClear = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

const addItem = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  // Add li to the DOM
  itemList.appendChild(li);
  checkUI();
  itemInput.value = "";
};

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
};

const clearItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
};

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    const itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

const checkUI = () => {
  const items = itemList.querySelectorAll("li");
  if (itemList.children.length === 0) {
    itemClear.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    itemClear.style.display = "block";
    itemFilter.style.display = "block";
  }
};

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
itemClear.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);

checkUI();
