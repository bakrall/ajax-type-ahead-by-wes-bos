const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

//fetch returns a promise
//it does not know what kind of data comes from fetch
//blob has to be converted from raw data that it is in to JSON
//calling json() on blob will return another promise
//when we call then() on it we will finally get data in form of array of cities
fetch(endpoint)
	.then(blob => blob.json())
	.then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
	return cities.filter(place => {
		const regex = new RegExp(wordToMatch, 'gi');

		return place.city.match(regex) || place.state.match(regex);
	})
}

function displayMatches() {
	const matchArray = findMatches(this.value, cities);

	console.log(matchArray);
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

//listen for two types of events on one element
['keyup', 'change'].forEach(event => searchInput.addEventListener(event, displayMatches));