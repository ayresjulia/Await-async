let url = 'https://deckofcardsapi.com/api/deck';

// one card from a deck
async function oneCard() {
	let res = await axios.get(`${url}/new/shuffle/?deck_count=1`);
	let deck_id = res.data['deck_id'];
	let result = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
	let card = result.data['cards'][0];
	console.log(`${card['value']} of ${card['suit']}`);
}
oneCard();

// two cards from the same deck
async function twoCardsSameDeck() {
	let first = await axios.get(`${url}/new/draw/`);
	let deck_id = first.data.deck_id;
	let second = await axios.get(`${url}/${deck_id}/draw/?count=2`);
	let cards = second.data['cards'];
	for (card of cards) {
		console.log(`${card['value']} of ${card['suit']}`);
	}
}
twoCardsSameDeck();
