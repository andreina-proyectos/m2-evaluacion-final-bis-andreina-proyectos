'use strict';

//variables
const startButton = document.querySelector('.start-btn');
const allInputRadios = document.querySelectorAll('.form__input-radio')
;
let gameCardsList = document.querySelector('.game__cards-list');
const headerTitle = document.querySelector('.header__title');

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
  headerTitle.innerHTML = '';

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
  const cardNewElement = document.createElement('li');
  cardNewElement.classList.add('game__card-element');

  const imgFrontCard = document.createElement('img');
  imgFrontCard.classList.add('card__front-img');
  imgFrontCard.classList.add('card-img');
  imgFrontCard.classList.add('hidden');
  imgFrontCard.src = frontCardSrc;
  imgFrontCard.alt = frontCardName;

  const imgBackCard = document.createElement('img');
  imgBackCard.classList.add('card__back-img');
  imgBackCard.classList.add('card-img');
  imgBackCard.src = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
  imgBackCard.alt = frontCardName;

  cardNewElement.appendChild(imgFrontCard);
  cardNewElement.appendChild(imgBackCard);
  gameCardsList.appendChild(cardNewElement);
  cardNewElement.addEventListener('click', handleClickOnCard);
}

function handleClickOnCard (event) {
  const currentCard = event.currentTarget;
  currentCard.firstChild.classList.toggle('hidden');
  currentCard.children[1].classList.toggle('hidden');
  const previousSelectedCard = document.querySelector('.selected-card');
  if (previousSelectedCard) {
    if(currentCard.firstChild.alt === previousSelectedCard.firstChild.alt) {
      console.log('acertaste');
    }

    else {
      let temp;
      const hideCardDelayed = () => {
        clearInterval(temp);

        currentCard.firstChild.classList.toggle('hidden');
        currentCard.children[1].classList.toggle('hidden');

        previousSelectedCard.firstChild.classList.toggle('hidden');
        previousSelectedCard.children[1].classList.toggle('hidden');
      };
      temp = setInterval(hideCardDelayed, 1000);
    }

    previousSelectedCard.classList.remove('selected-card');
  }

  else {
    currentCard.classList.add('selected-card');
  }

  let arrFrontImg = document.querySelectorAll('.card__front-img');
  let win = true;
  for (let i=0; i<arrFrontImg.length; i++) {
    if(arrFrontImg[i].classList.contains('hidden')){
      win = false;
    }
  }

  if (win) {
    headerTitle.innerHTML = 'Has ganado!🥳🎉'
  }
}

//listeners
startButton.addEventListener('click', handleStartButton);
