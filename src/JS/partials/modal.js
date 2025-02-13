import modalTemplate from "../../templates/modal.hbs";
import barcodeSvg from "../../images/modal/ticket.svg";
import closeSvg from "../../images/modal/close.svg";

const modalBackdrop = document.querySelector(".modal-backdrop");
const modal = document.querySelector(".modal");
const cardsList = document.querySelector(".cards-list");

cardsList.addEventListener("click", (e) => {
  const card = e.target.closest("li");
  if (card) {
    const id = card.dataset.id;
    openModal(id, card);
  }
});

function openModal(id, card) {
  modal.style.display = "block";
  modalBackdrop.style.display = "block";
  modal.classList.add("is-open");
  modalBackdrop.classList.add("is-open");


  const modalImg = card.querySelector(".cards-list__image").src;
  const modalDate = card.querySelector(".cards-list__date").textContent;
  const modalPlace = card.querySelector(".cards-place__text").textContent;
  const modalAuthor = card.querySelector(".cards-list__title").textContent;

  getInfo(id, {
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

modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});

const API_KEY = "pxORlZn34CAbwS2qgAa40tdvGlRFZL5L";

async function getInfo(id, existingData) {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`
  );
  const data = await response.json();
  const event = data;
  console.log(event);

  const modalCloseSvg = closeSvg;
  const modalBarcodeSvg = barcodeSvg;
  const modalInfo = event.info || "No info available";
  const modalTime = event.dates.start.localTime || "Time is undefined.";
  const modalCity =
    event._embedded.venues[0]?.city.name || "City not specified.";
  const modalPrice = event.priceRanges
    ? `${event.priceRanges[0].type} ${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}`
    : "Price is undefined";

  const modalPriceVip = event.priceRanges
    ? `${event.priceRanges[0].type} ${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}`
    : "VIP price is undefined";
  const moreFromAuthor = event.url;

  const modalData = {
    ...existingData,
    modalCloseSvg,
    modalInfo,
    modalTime,
    modalCity,
    modalPrice,
    modalPriceVip,
    modalBarcodeSvg,
    moreFromAuthor,
  };

  const modalHTML = modalTemplate(modalData);
  modal.innerHTML = modalHTML; 
  const modalCloseBtn = modal.querySelector(".modal-close__btn");
  modalCloseBtn.addEventListener("click", closeModal);
}