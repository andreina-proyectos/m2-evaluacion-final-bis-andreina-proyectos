'use strict';
console.log('>> Ready :)');

//variables
const startButton = document.querySelector('.start-btn');
const allInputRadios = document.querySelectorAll('.form__input-radio')
;
let gameCardsList = document.querySelector('.game__cards-list');

if (localStorage.getItem('Favorite game value')) {
  let lsRadioValue = localStorage.getItem('Favorite game value');
  for (let i=0; i<allInputRadios.length; i++) {
    if (allInputRadios[i].value === lsRadioValue) {
      allInputRadios[i].checked = true;
    }
  }
}

//functions
function handleStartButton () {
  gameCardsList.innerHTML = '';

  let radioSelectedValue;
  const endpoint = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';

  for (let i=0; i<allInputRadios.length; i++) {
    if(allInputRadios[i].checked) {
      radioSelectedValue = allInputRadios[i].value;
      localStorage.setItem('Favorite game value', radioSelectedValue);
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
  imgFrontCard.classList.add('card-img');
  imgFrontCard.classList.add('hidden');
  imgFrontCard.src = frontCardSrc;
  imgFrontCard.alt = frontCardName;

  //create pokemon back img (second child)
  const imgBackCard = document.createElement('img');
  imgBackCard.classList.add('card__back-img');
  imgBackCard.classList.add('card-img');
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

  if (document.querySelector('.selected-card')) {
    if (event.currentTarget.firstChild.alt === document.querySelector('.selected-card').alt) {
      console.log('son lo mismo');

    }
    }
  else {
    event.currentTarget.firstChild.classList.add('selected-card');
  }


  // const arrFrontCards =  gameCardsList.querySelectorAll('.card__front-img');

  // for(let i=0; i<arrFrontCards.length; i++) {
  //   if(arrFrontCards[i].classList('show-card')) {

  //   }
  // }


  //deberia hacer un bucle recorriendo el array de tarjetas. si eventcurrenttarget.name ===

}

//listeners
startButton.addEventListener('click', handleStartButton);
