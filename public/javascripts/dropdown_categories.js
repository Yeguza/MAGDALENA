console.log("Hellow world");

const categories = [
  {
    id: 3,
    name: "Cellphones & Smartphones"
  },

  {
    id: 4,
    name: 'Laptop & Notebooks'
  },

  {
    id: 5,
    name: "Desktop & Components"
  },

  {
    id: 6,
    name: "Camera & Drones"
  },

  {
    id: 7,
    name: "Networking & Services"
  },

  {
    id: 8,
    name: "Printers & Scanners"
  },

  {
    id: 9,
    name: "Routers & Modems"
  },

  {
    id: 10,
    name: "TV & Componets"
  },

  {
    id: 11,
    name: "Portable Audio"
  }
]

let categoryArea = document.querySelector("#category-container");

const dropdown1 = () => {
  const component = document.createElement("div");

  const input = createInput1();
  const dropdown = showDropdown1();

  component.appendChild(input);
  component.appendChild(dropdown);
  printArea.appendChild(component);
};

const createInput1 = () => {
  // Creates the input outline
  const input = document.createElement("div");
  input.classList = "input";
  input.addEventListener("click", toggleDropdown);

  // Creates the input placeholder content
  const inputPlaceholder = document.createElement("div");
  inputPlaceholder.classList = "input__placeholder";

  const placeholder = document.createElement("p");
  placeholder.textContent = "Select category";
  placeholder.classList.add('placeholder')

  // Appends the placeholder and chevron (stored in assets.js)
  inputPlaceholder.appendChild(placeholder);
  inputPlaceholder.appendChild(dropdownIcon());
  input.appendChild(inputPlaceholder);

  return input;
};

const showDropdown1 = () => {
  const structure = document.createElement("div");
  structure.classList.add("structure", "hide");

  categories.forEach(category => {
    const {
      id,
      name
    } = category;
    const option = document.createElement("div");
    option.addEventListener("click", () => selectOption1(name));
    option.setAttribute("id", id);

    const n = document.createElement("p");
    n.textContent = name;

    option.appendChild(n);
    structure.appendChild(option);
  });
  return structure;
};

const toggleDropdown1 = () => {
  const dropdown = document.querySelector(".structure");
  dropdown.classList.toggle("hide");

  const input = document.querySelector(".input");
  input.classList.toggle("input__active");
};

const selectOption1 = (name) => {
  const text = document.querySelector('.placeholder');
  text.textContent = name;
  text.classList.add('input__selected')
  toggleDropdown1();
};

dropdown1();
