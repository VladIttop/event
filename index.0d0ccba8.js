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
const setActiveButton = (button)=>{
    activeButton.classList.remove("active");
    button.classList.add("active");
    activeButton = button;
};
const handleButtonClick = (pageNum)=>{
    setActiveButton(event.target);
    console.log(`Page ${pageNum} clicked`);
    if (pageNum === 1) {
        startPage = 2;
        updateMiddleButtons();
        dotsButton.style.display = "inline-block";
        dotsButton.textContent = "...";
    } else if (pageNum === maxPage) {
        startPage = maxPage - visibleCount + 1;
        updateMiddleButtons();
    }
};
const addEventListenerToButton = (button, pageNum)=>{
    button.textContent = pageNum;
    button.addEventListener("click", ()=>handleButtonClick(pageNum));
};
const updateMiddleButtons = ()=>{
    middleButtons.forEach((button, index)=>{
        const pageNum = startPage + index;
        if (pageNum < maxPage) {
            addEventListenerToButton(button, pageNum);
            button.style.display = "inline-block";
        } else button.style.display = "none";
    });
    if (startPage + visibleCount >= maxPage) dotsButton.style.display = "none";
    else {
        dotsButton.style.display = "inline-block";
        dotsButton.textContent = "...";
        dotsButton.addEventListener("click", updateDots);
    }
    if (startPage + visibleCount >= maxPage - 1) {
        middleButtons[middleButtons.length - 1].textContent = maxPage - 1;
        addEventListenerToButton(middleButtons[middleButtons.length - 1], maxPage - 1);
    }
    if (startPage > 1) {
        firstButton.textContent = startPage - 1;
        addEventListenerToButton(firstButton, startPage - 1);
    } else {
        firstButton.textContent = 1;
        addEventListenerToButton(firstButton, 1);
    }
};
const updateDots = ()=>{
    startPage += visibleCount;
    if (startPage + visibleCount - 1 >= maxPage) startPage = maxPage - visibleCount;
    updateMiddleButtons();
};
addEventListenerToButton(firstButton, 1);
addEventListenerToButton(lastButton, maxPage);
updateMiddleButtons();

//# sourceMappingURL=index.0d0ccba8.js.map
