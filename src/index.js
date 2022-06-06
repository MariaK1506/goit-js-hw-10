import './css/styles.css';
// import countryListTpl from './templates/country-list.hbs';
// import countryCardTpl from './templates/country-card.hbs';
import getRefs from './js/get-refs';
import API from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

let countryName;

refs.searchInput.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

function onSearchInput() {
  countryName = refs.searchInput.value.trim();

  if (countryName === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfoContainer.innerHTML = '';
    return;
  }
  renderSearchMarkup();
}

function createCountryListMarkup(fields) {
  return fields
    .map(({ flags, name }) => {
      return `
  <li class="country-list__item">
    <img class="country-list-item__flags" src="${flags.svg}" alt="${name.official}" width="30" />
    <p class="country-list-item__text">${name.official}</p>
  </li>
  `;
    })
    .join('');
}

function createCountryCardMarkup(fields) {
  return fields
    .map(({ flags, name, capital, population, languages }) => {
      return `<div class='wrapper'><img
  class='country-info__flags'
  src='${flags.svg}'
  alt='${name.official}'
  width='50'
/>
<h2 class='country-info__name'>${name.official}</h2></div>
<p class='country-info__capital'>Capital: ${capital}</p>
<p class='country-info__population'>Population: ${population}</p>
<p class='country-info__languages'>Languages: ${Object.values(languages)}</p>`;
    })
    .join('');
}

function renderSearchMarkup() {
  API.fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        refs.countryList.innerHTML = '';
        refs.countryInfoContainer.innerHTML = '';
        return;
      }

      if (countries.length <= 10) {
        refs.countryList.innerHTML = createCountryListMarkup(countries);
        refs.countryInfoContainer.innerHTML = '';
      }

      if (countries.length === 1) {
        refs.countryList.innerHTML = '';
        refs.countryInfoContainer.innerHTML =
          createCountryCardMarkup(countries);
      }
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
  refs.countryList.innerHTML = '';
  refs.countryInfoContainer.innerHTML = '';
}
