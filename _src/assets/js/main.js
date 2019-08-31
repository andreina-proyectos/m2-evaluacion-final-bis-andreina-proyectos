'use strict';
console.log('>> Ready :)');

//variables
const startButton = document.querySelector('.start-btn');
const allInputRadios = document.querySelectorAll('.form__input-radio');

//functions


function handleStartButton () {
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
        resultPokemonName = data[i].image;
        createElementCards ();
      }
    });
}


function createElementCards () {}

//listeners

startButton.addEventListener('click', handleStartButton);
