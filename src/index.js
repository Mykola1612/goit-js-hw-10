import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { refs } from './js/refs';

creatEL();

// Створив опції в селекті
function creatEL() {
  fetchBreeds()
    .then(data => renderListCats(data))
    .catch(err => console.log(err));
}
function createMarkup({ id, name }) {
  return `<option value='${id}'>${name}</option>`;
}
function renderListCats(products) {
  const markup = products.map(product => createMarkup(product)).join('');
  refs.selectEL.innerHTML = markup;
}

// Додав інфу про кота
refs.selectEL.addEventListener('change', onSelectELChange);
function onSelectELChange(e) {
  refs.divInfo.innerHTML = '';
  fetchCatByBreed(e.currentTarget.value).then(
    data => (refs.divInfo.innerHTML = createCard(data))
  );
}
function createCard({ url, name, temperament, description }) {
  return `<div class="flex_container"><img src="${url}" alt="${name}" class="cat_photo"/><div class="text_container"><h1>${name}</h1><p>${description}</p><p><span class="bold_temperament">Temperament:</span> ${temperament}</p></div></div>`;
}
