import cardTemplate from "../../templates/cards.hbs";

const API_KEY = "pxORlZn34CAbwS2qgAa40tdvGlRFZL5L";

const cardsList = document.getElementById("cardsList");
const getEvents = async function () {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}`
  );
  const data = await response.json();
  const events = data._embedded.events;
  events.forEach((element) => {
   const id = element.id;
    const name = element.name;
    const date = element.dates.start.localDate;
    const place = element._embedded.venues[0].name;
    const image = element.images[0].url;
    const card = cardTemplate({id,name, date, image, place });
    cardsList.innerHTML += card;
  });
};

getEvents()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
