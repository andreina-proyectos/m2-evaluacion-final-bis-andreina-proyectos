'use strict';
console.log('>> Ready :)');

//variables
const startButton = document.querySelector('.start-btn');
const allRadios = document.querySelectorAll('.form__input-radio');
const allPokemonImages = document.querySelectorAll('.card-img');

//functions
function handleStartButton() {
  let radioSelectedValue;
  let pokemonImageSrc;

  for (let i=0; i<allRadios.length; i++) {
    if (allRadios[i].checked) {
      radioSelectedValue = allRadios[i].value;
    }
  }

  const endpoint = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';

  const api = endpoint + radioSelectedValue + '.json';
  console.log(api);

  fetch(api)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      for (let i=0; i<data.length; i++) {
        const dataObject = data[i];
        const resultImage = dataObject.image;
        allPokemonImages[i].src = resultImage;

      }
    });
}

//listeners
startButton.addEventListener('click', handleStartButton);

//1.obtengo el valor que se escogio en radio
//2. hacer un fetch
