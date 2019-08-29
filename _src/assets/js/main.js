'use strict';
console.log('>> Ready :)');

//variables
const startButton = document.querySelector('.start-btn');
const allRadios = document.querySelectorAll('.form__input-radio');
const allPokemonImages = document.querySelectorAll('.card-img');
const gameCardList = document.querySelector('.section__game');


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

        const resultImageUrl = dataObject.image;
        const resultPokemonName = dataObject.name;

        createElementCards (resultImageUrl, resultPokemonName);
      }
    });
}


function createElementCards (frontCardUrl, frontCardName) {

  const newCard = document.createElement('li');

  const imgFrontCard = document.createElement('img');
  imgFrontCard.classList.add('card-front-img');
  imgFrontCard.src = frontCardUrl;
  imgFrontCard.alt = frontCardName;

  const imgBackCard = document.createElement('img');
  imgBackCard.classList.add('card-back-img');
  imgBackCard.src = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
  imgBackCard.alt = 'Adalab Name';


  newCard.appendChild(imgFrontCard);
  newCard.appendChild(imgBackCard);

  gameCardList.appendChild(newCard);
}

//listeners
startButton.addEventListener('click', handleStartButton);

//1.obtengo el valor que se escogio en radio
//2. hacer un fetch
