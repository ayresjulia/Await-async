let url = 'https://pokeapi.co/api/v2/pokemon';

// get names and urls for every pokemon in db

async function getPokemon() {
	let res = await axios.get(`${url}`);
	for (let data of res.data.results) {
		console.log(`${data.name} : ${data.url}`);
	}
}
getPokemon();

//pick random three pokemons, and get data for them

async function randomThree() {
	let res = await axios.get(`${url}`);
	let first = res.data.results[Math.floor(Math.random() * 21)];
	let second = res.data.results[Math.floor(Math.random() * 21)];
	let third = res.data.results[Math.floor(Math.random() * 21)];
	let url1 = first['url'];
	let url2 = second['url'];
	let url3 = third['url'];
	let list = [];
	list.push(url1, url2, url3);
	let data = await Promise.all(list.map(url => $.getJSON(url)));
	data.forEach(p => console.log(p));
}

randomThree();

// filter en language and get description

async function getDescription() {
	let res = await axios.get(`${url}`);
	let first = res.data.results[Math.floor(Math.random() * 21)];
	let second = res.data.results[Math.floor(Math.random() * 21)];
	let third = res.data.results[Math.floor(Math.random() * 21)];
	let url1 = first['url'];
	let url2 = second['url'];
	let url3 = third['url'];
	let list = [];
	list.push(url1, url2, url3);
	let pokemonData = await Promise.all(list.map(url => $.getJSON(url)));
	// console.log(pokemonData); // NOTE : [{…}, {…}, {…}]
	let speciesData = await Promise.all(pokemonData.map(p => $.getJSON(p.species.url)));
	// console.log(speciesData); // NOTE : [{…}, {…}, {…}]
	descriptions = speciesData.map(d => {
		let descriptionObj = d.flavor_text_entries.find(entry => entry.language.name === 'en');
		return descriptionObj ? descriptionObj.flavor_text : 'No description available.';
	});
	// console.log(descriptions); // NOTE : [desc,desc,desc]
	descriptions.forEach((desc, i) => {
		console.log(`${pokemonData[i].name}: ${desc}`);
	});
}

getDescription();
