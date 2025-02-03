const modalBackdrop = document.querySelector(".modal-backdrope");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal-close__btn");
const cards = document.querySelectorAll("cards-item");
function openModal() {
  modal.style.display = "flex";
  modal.classList.add("is-open");
  modalBackdrop.classList.add("is-open");
}

function closeModal() {
  modal.style.display = "none";
  modal.classList.remove("is-open");
  modalBackdrop.classList.remove("is-open");
}

cards.forEach((card) => {
  card.addEventListener("click", openModal);
});
modalCloseBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});
