const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
    cities = [],
	searchInput = document.querySelector('.search'),
	suggestions = document.querySelector('.suggestions');

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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
	const matchArray = findMatches(this.value, cities);

	const suggestionsListHtml = matchArray.map(place => {
		const regex = new RegExp(this.value, 'gi'),
		    cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`),
		    stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

		return `
			<li>
			 	<span class="name">${cityName}, ${stateName}</span>
			 	<span class="population">${numberWithCommas(place.population)}</span>
			</li>
		`;
	}).join('');

	suggestions.innerHTML = suggestionsListHtml;
}

//listen for two types of events on one element
['keyup', 'change'].forEach(event => searchInput.addEventListener(event, displayMatches));