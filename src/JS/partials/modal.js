import modalTemplate from "../../templates/modal.hbs";
const modalBackdrop = document.querySelector(".modal-backdrop");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal-close__btn");
const cards = document.querySelectorAll(".cards-item");
console.log(cards);

console.log("hello");
function openModal(event) {
  modal.style.display = "flex";
  modalBackdrop.style.display = "flex";
  modal.classList.add("is-open");
  modalBackdrop.classList.add("is-open");

  const card = event.currentTarget;
  const modalCircleImg = card.querySelector(".cards-list__image").src;
  const modalImg = card.querySelector(".cards-list__image").src;
  const modalDate = card.querySelector(".cards-list__date").textContent;
  const modalPlace = card.querySelector(".cards-place__text").textContent;
  const modalAuthor = card.querySelector(".cards-list__title").textContent;

  const eventId = card.dataset.id;
  getInfo(eventId, {
    modalCircleImg,
    modalImg,
    modalDate,
    modalPlace,
    modalAuthor,
  });
}
function closeModal() {
  modal.style.display = "none";
  modalBackdrop.style.display = "none";

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

const API_KEY = "pxORlZn34CAbwS2qgAa40tdvGlRFZL5L";

async function getInfo(eventId, existingData) {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`
  );
  const data = await response.json();
  const event = data;

  const modalInfo = event.info || "Інформація недоступна";
  const modalTime = event.dates.start.localTime || "Час невідомий";
  const modalCity = event._embedded.venues[0]?.city.name || "Місто не вказано";
  const modalPrice = event.priceRanges
    ? event.priceRanges[0]?.min
    : "Ціна невідома";
  const modalPriceVip = event.priceRanges
    ? event.priceRanges[1]?.min
    : "Ціна VIP невідома";

  const modalData = {
    ...existingData,
    modalInfo,
    modalTime,
    modalCity,
    modalPrice,
    modalPriceVip,
  };

  const modalHTML = modalTemplate(modalData);
  modal.innerHTML = modalHTML;
}
