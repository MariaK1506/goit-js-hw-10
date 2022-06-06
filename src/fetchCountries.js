export default { fetchCountries };
const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
    .then(() => {
      const markupCard = createCountryListMarkup();
      console.log(markupCard);
    })
    .catch(error => {
      console.log(error);
    });
}

fetchCountries('Peru');

//
