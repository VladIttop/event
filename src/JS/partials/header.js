import countries from "../countries.json";

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
});

const fetchCountries = async function (countryCode) {
  try {
    const response = await fetch(
      "https://app.ticketmaster.com/discovery/v2/events.json?apikey=pxORlZn34CAbwS2qgAa40tdvGlRFZL5L"
    );
    const data = await response.json()
    console.log(data)
    const embeded = data._embedded.events;
    console.log(embeded)
    // const countries = embeded.map(country => )
  } catch (error) {}
};
fetchCountries()