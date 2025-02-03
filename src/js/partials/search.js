const searchEvents =async (keyword) => {
    const responce = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=Shhg30GRJqiVh4F5zt8WhjlFpM0sHYGU&keyword=${keyword}`)
    const events = await responce.json()

    console.log(events);
}
const searchInput = document.querySelector(".header__input")
searchInput.addEventListener("input", ()=>{
    searchEvents(searchInput.value)
})