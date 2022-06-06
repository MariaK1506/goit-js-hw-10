import './css/styles.css';
// import countryListTpl from './templates/country-list.hbs';
// import countryCardTpl from './templates/country-card.hbs';
import API from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
// const debounce = require('lodash.debounce');

// Notify.failure();
// Notify.success();

// function createCountryCardMarkup() {}
function createCountryListMarkup({ flags, name }) {
  return `
  <li class="country-list__item">
    <img class="country-list__flags" src="${flags.svg}" alt="${name.official}" width="30" />
    <h2 class="country-list__name">${name.official}</h2>
  </li>
  `;
}
