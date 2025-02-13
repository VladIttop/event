import countries from "../countries.json";
import render from "./cards";

const btn = document.querySelector(".choose_btn");
const list = document.querySelector(".dropdown-list");
const cardsList = document.querySelector(".cards-list");

btn.addEventListener("click", () => {
  list.classList.toggle("active");
});

countries.forEach((country) => {
  const li = document.createElement("li");
  const code = country.countryCode;
  li.textContent = country.country;
  li.classList.add("dropdown_item");
  li.setAttribute("data-id", code);
  list.appendChild(li);
  li.addEventListener("click", () => {
    const country = li.getAttribute("data-id");
    fetchCountries(country);
  });
});

const fetchCountries = async function (countryCode) {
  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=pxORlZn34CAbwS2qgAa40tdvGlRFZL5L`
    );
    const data = await response.json();
    const events = data._embedded.events;
    render(events);
  } catch (error) {
    const cardsList = document.getElementById("cardsList");
    cardsList.textContent = "No Info Found";
    
  }
};
