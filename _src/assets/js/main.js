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

function handleClickOnCard (event) {
  // doy vuelta a tarjeta
  const currentCard = event.currentTarget;
  currentCard.firstChild.classList.toggle('hidden');
  currentCard.children[1].classList.toggle('hidden');
  const previousSelectedCard = document.querySelector('.selected-card');

   //si hay una carta con clase .selected-card, hago comprobación de si su alt es igual al de la tarjeta event current target
  if (previousSelectedCard) {

    if(currentCard.firstChild.alt === previousSelectedCard.firstChild.alt) {

      console.log('acertaste');
    }

    else {
      // retraso el esconder cartas con hidden un segundo
      let temp;
      const hideCardDelayed = () => {
        clearInterval(temp);

        currentCard.firstChild.classList.toggle('hidden');
        currentCard.children[1].classList.toggle('hidden');

        previousSelectedCard.firstChild.classList.toggle('hidden');
        previousSelectedCard.children[1].classList.toggle('hidden');
      };
      temp = setInterval(hideCardDelayed, 1000);
      console.log('NO acertaste');
    }

    previousSelectedCard.classList.remove('selected-card');
  }
  //si no hay ninguna .selected-card, significa que a la actual event current target, le añado la clase .selected-card para marcarla
  else {
    currentCard.classList.add('selected-card');
  }

}

//listeners
startButton.addEventListener('click', handleStartButton);
