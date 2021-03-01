let url = 'http://numbersapi.com';

// get fact about my fav number
async function getNum() {
	let res = await axios.get(`${url}/3?json`);
	console.log(res.data['text']);
}
getNum();

// get facts about multile numbers and display on the page

async function getMulti() {
	let res = await axios.get(`${url}/5..7?json`);
	for (let [num, fact] of Object.entries(res.data)) {
		console.log(`${fact}`);
	}
}
getMulti();

// get 4 facts on my fav number

async function getMultiOfSame() {
	let facts = await Promise.all(Array.from({ length: 4 }, () => axios.get(`${url}/3?json`)));
	facts.forEach(data => {
		console.log(`${data.text}`);
	});
}
getMultiOfSame();
