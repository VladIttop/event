const pagination = document.querySelector(".pagination");
const buttons = Array.from(pagination.querySelectorAll("button"));
const maxPage = 29;
const visibleCount = 5;
let startPage = 2;

const middleButtons = buttons.slice(1, -2);
const dotsButton = document.getElementById("dots");
const firstButton = buttons[0];
const lastButton = buttons[buttons.length - 1];
let activeButton = firstButton;

const updateActiveButton = (button) => {
  activeButton.classList.remove("active");
  button.classList.add("active");
  activeButton = button;
};

const addClickEvent = (button, pageNum) => {
  button.textContent = pageNum;
  button.onclick = () => {
    updateActiveButton(button);
    console.log(`Page ${pageNum} clicked`);
    
    if (pageNum === 1 || pageNum === "...") {
      startPage += visibleCount;
      if (startPage + visibleCount - 1 >= maxPage) {
        startPage = maxPage - visibleCount;
      }
      updateMiddleButtons();
      console.log("Pagination shifted forward.");
    }
  };
};

const updateMiddleButtons = () => {
  middleButtons.forEach((button, index) => {
    const pageNum = startPage + index;
    if (pageNum < maxPage) {
      addClickEvent(button, pageNum);
      button.style.display = "inline-block";
    } else {
      button.style.display = "none";
    }
  });
};

dotsButton.onclick = () => {
  startPage += visibleCount;
  if (startPage + visibleCount - 1 >= maxPage) {
    startPage = maxPage - visibleCount;
  }
  updateMiddleButtons();
};

addClickEvent(firstButton, 1);
addClickEvent(lastButton, maxPage);
updateMiddleButtons();
