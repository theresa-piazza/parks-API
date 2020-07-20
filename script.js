'use strict';

const apiKey = '&api_key=VC6IPQe0Okg2kQWkkh3soEedCuLeFjpGvJj1CgRg'
const searchUrl = 'https://developer.nps.gov/api/v1/parks?stateCode='


//https://developer.nps.gov/api/v1/parks?stateCode=NY&limit=1&api_key=VC6IPQe0Okg2kQWkkh3soEedCuLeFjpGvJj1CgRg

function getState () {
  const chosenState = $('#js-state').val() + '&limit=';
  console.log(chosenState);
  return chosenState;
}


function getNumber () {
  const parkAmount = $('#js-max-results').val(); 
  console.log(parkAmount);
  return parkAmount;
};


function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();

  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">Link for the park can be found here!</a>
      </li>` 
     
    )};

  $('#results').removeClass('hidden');
};

function getParks() {
let maxResults = getNumber();
let state = getState();
console.log(getState);
  console.log(searchUrl + state + maxResults + apiKey)
  fetch(searchUrl + state + maxResults + apiKey)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};



function watchForm() {

  $('form').submit(event => {
    console.log("submit happened")
    event.preventDefault();

    getParks();
    console.log(maxResults)
    console.log('Form watched!');
  });
}

$(watchForm);

console.log('App loaded! Waiting for submit!');

