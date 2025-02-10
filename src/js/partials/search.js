import _ from "lodash";
import render from "./cards";
const searchEvents = async (keyword) => {
  const responce = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=Shhg30GRJqiVh4F5zt8WhjlFpM0sHYGU&keyword=${keyword}`
  );
  const events = await responce.json();
  render(events)
};


const searchInput = document.querySelector(".header__input");
const debouncedSearch = _.debounce(() => {
  searchEvents(searchInput.value);
}, 1000);

searchInput.addEventListener("input", debouncedSearch);
