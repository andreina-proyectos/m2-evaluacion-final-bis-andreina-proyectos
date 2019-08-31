'use strict';
console.log('>> Ready :)');

//variables
const startButton = document.querySelector('.start-btn');
const allInputRadios = document.querySelectorAll('.form__input-radio');
let gameCardsList = document.querySelector('.game__cards-list');


//functions


function handleStartButton () {
  gameCardsList.innerHTML = '';
  let radioSelectedValue;
  const endpoint = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';

  for (let i=0; i<allInputRadios.length; i++) {
    if(allInputRadios[i].checked) {
      radioSelectedValue = allInputRadios[i].value;
    }
  }

  const api = endpoint + radioSelectedValue + '.json';

  fetch(api)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let resultImageUrl;
      let resultPokemonName;

      for (let i=0; i<data.length; i++) {
        resultImageUrl = data[i].image;
        resultPokemonName = data[i].name;

        createElementCards (resultImageUrl, resultPokemonName);

      }
    });
}


function createElementCards (frontCardSrc, frontCardName) {

  //create li
  const cardNewElement = document.createElement('li');
  cardNewElement.classList.add('game__card-element');

  //create pokemon front img (first child)
  const imgFrontCard = document.createElement('img');
  imgFrontCard.classList.add('card__front-img');
  imgFrontCard.classList.add('hidden');
  imgFrontCard.src = frontCardSrc;
  imgFrontCard.alt = frontCardName;

  //create pokemon back img (second child)
  const imgBackCard = document.createElement('img');
  imgBackCard.classList.add('card__back-img');
  imgBackCard.src = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
  imgBackCard.alt = frontCardName;

  //integrate imgs on li
  cardNewElement.appendChild(imgFrontCard);
  cardNewElement.appendChild(imgBackCard);

  //integrate li on ul
  gameCardsList.appendChild(cardNewElement);

  cardNewElement.addEventListener('click', handleClickOnCard);
}

function handleClickOnCard () {
  event.currentTarget.firstChild.classList.toggle('hidden');
  event.currentTarget.children[1].classList.toggle('hidden');

}

//listeners

startButton.addEventListener('click', handleStartButton);
