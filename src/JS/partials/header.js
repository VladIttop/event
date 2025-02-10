const btn = document.querySelector('.choose_btn');
const list = document.querySelector('.dropdown-list');

btn.addEventListener('click', () => {
    list.classList.toggle('active')
})

const fetchCountries = async () => {
    try {
      const response = await fetch('./JS/countries.json'); 
  
      const countries = await response.json();
  
      renderCountries(countries);
    } catch (error) {
    //   console.error('Помилка завантаження:', error);
    }
  };
  
  const renderCountries = (countries) => {
    list.innerHTML = ''; 
    countries.forEach(({ name, code }) => {
      const li = document.createElement('li');
      li.textContent = `${name} (${code})`;
      list.appendChild(li);
    });
  };
  
  fetchCountries();