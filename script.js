
const apiKey = '&api_key=VC6IPQe0Okg2kQWkkh3soEedCuLeFjpGvJj1CgRg'
const searchUrl = 'https://developer.nps.gov/api/v1/parks?'

function getState () {
  let state = $('#js-state').val(); 
  return "&stateCode=" + state; 
  }

function getNumber () {
  const parkAmount = $('#js-max-results').val(); 
  return "limit=" + parkAmount;
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

  console.log(searchUrl + maxResults + state + apiKey)
  fetch(searchUrl + maxResults + state + apiKey)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(responseJson => {
      if (responseJson.total === '0') {
        throw new Error('please enter a valid search');
      }
      displayResults(responseJson)
    })
    .catch(err => {
      console.log(err);
      $('.error-message').removeClass('hidden');
      $('.error-message').text(`Something went wrong: ${err.message}`);
    });
};



function watchForm() {

  $('form').submit(event => {
    console.log("submit happened")
    event.preventDefault();
     
    getParks();
    console.log('Form watched!');
  });
}

$(watchForm);


console.log('App loaded! Waiting for submit!');

