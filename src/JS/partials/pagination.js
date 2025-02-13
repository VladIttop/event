import render from "./cards";
const pagination = document.querySelector(".pagination");
const maxPage = 29;
const visibleCount = 20;
let currentPage = 1;

const API_KEY = "pxORlZn34CAbwS2qgAa40tdvGlRFZL5L";

const getEvents = async () => {
  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&page=${currentPage}&size=${visibleCount}`
    );
    const data = await response.json();
    console.log(data);
    render(data._embedded.events); 
    
    return data.page ? Math.min(data.page.totalPages, maxPage) : 1;
  } catch (error) {
    console.log(error);
    return 1;
  }
};
const handlePageChange = (pageNumber) => {
  currentPage = pageNumber;
  renderButtons();
};

const createButton = (pageNumber) => {
  const button = document.createElement("button");
  button.textContent = pageNumber;
  button.dataset.page = pageNumber;
  if (pageNumber === currentPage) {
    button.classList.add("active");
  }
  button.addEventListener("click", () => handlePageChange(pageNumber));

  return button;
};

const renderButtons = async () => {
  pagination.innerHTML = "";
  const totalPages = await getEvents();
  const buttons = [];
  const maxVisible = 10;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(createButton(i));
    }
  } else {
    buttons.push(createButton(1));

    if (currentPage > 3) {
      buttons.push(document.createTextNode("..."));
    }

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      buttons.push(createButton(i));
    }

    if (currentPage < totalPages - 2) {
      buttons.push(document.createTextNode("..."));
    }

    buttons.push(createButton(totalPages));
  }

  buttons.forEach((button) => pagination.appendChild(button));
};

renderButtons();
