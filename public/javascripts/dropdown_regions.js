const regions = [
  {
    id: 1,
    name: "Mwanza"
  },

  {
    id: 2,
    name: 'Dar es salaam'
  }
];


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
];

const regionContainer = document.querySelector("#region-container>label");
const categoryContainer = document.querySelector("#category-container>label");

const dropdownRegions = dropdown;

const dropdownCategories = dropdown;


dropdownRegions(regionContainer, regions, "Select region");
dropdownCategories(categoryContainer, categories, 'Select Category');

