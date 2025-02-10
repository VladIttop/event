import countries from '../countries.json';

const btn = document.querySelector('.choose_btn');
const list = document.querySelector('.dropdown-list');

btn.addEventListener('click', () => {
    list.classList.toggle('active')
})

countries.forEach((country) => {
  const li = document.createElement('li');
  li.textContent = country.country;
  li.classList.add('dropdown_item');
  list.appendChild(li);
})
