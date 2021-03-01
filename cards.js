let url = 'https://deckofcardsapi.com/api/deck';
let deckId = null;
let btn = $('button');
let cardSpot = $('.card');

btn.on('click', cardGame);

$.getJSON(`${url}/new/shuffle`, function (res) {
	deck_id = res.deck_id;
});

async function cardGame() {
	let second = await axios.get(`${url}/${deck_id}/draw/?count=1`);
	for (card of second.data['cards']) {
		console.log(`${card['value']} of ${card['suit']}, ${deck_id}`);
	}
	let img = second.data.cards[0].image;
	let angle = Math.random() * 90 - 45;
	let randomX = Math.random() * 40 - 20;
	let randomY = Math.random() * 40 - 20;
	cardSpot.append(
		$('<img>', {
			src: img,
			class: 'img-fluid',
			css: {
				transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
			}
		})
	);
	if (second.data.remaining === 0) {
		btn.remove();
		alert('The Deck is Empty!');
	}
}
