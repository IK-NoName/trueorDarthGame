let response = await fetch('/api/getQuestions');
let data = await response.json();

let players = [];

const addButton = document.querySelector('.addPlayer');
const container = document.querySelector('.container');
const playButton = document.querySelector('.play');
const game = document.querySelector('.game');
const form = document.querySelector('.form');
const formContainer = document.querySelector('.formContainer');
const formQuestion = document.querySelector('.formQuestion');
const formButton = document.querySelector('.formButton');
const openForm = document.querySelector('.openForm');
const cross = document.querySelector('.cross');
const choice = document.querySelector('.choice');
const truthOrDare = document.querySelector('.truthOrDare');

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

const parsePlayer = () => {
	let players = document.querySelectorAll('.player');
	let list = [];
	players.forEach((player) => {
		list.push(player.value);
	});
	return list;
};

const remove = (array, element) => {
	let index = array.indexOf(element);
	if (index > -1) {
		array.splice(index, 1);
	}
	return array;
};

const parseQuestion = (question, playerName) => {
	let players = parsePlayer();
	players = remove(players, playerName);

	let array = question.question.split(' ');
	for (let i = 0; i < array.length; i++) {
		if (players.length == 0) {
			players = parsePlayer();
			players = remove(players, playerName);
		}
		if (array[i].includes('{player}')) {
			let rnd = Math.floor(Math.random() * players.length);
			let name = players[rnd];
			players = remove(players, name);
			array[i] = name;
		}
	}
	let newQuestion = array.join(' ');
	newQuestion = replaceAll(newQuestion, '{rnd}', Math.floor(Math.random() * 10) + 1);
	return newQuestion;
};

const displayChoice = (questions, players, callback) => {
	choice.innerHTML = '';
	if (players.length == 0 || questions.length == 0) {
		callback();
		return;
	}
	let index = Math.floor(Math.random() * players.length);
	let playerName = players[index];
	players.splice(index, 1);
	choice.classList.remove('hide');
	let name = document.createElement('h1');
	let div = document.createElement('div');

	div.classList.add('choiceButtonsContainer');
	name.classList.add('nameChoice');
	name.innerText = playerName;

	let buttonDare = document.createElement('button');
	let buttonTruth = document.createElement('button');

	buttonTruth.classList.add('choiceButton');
	buttonDare.classList.add('choiceButton');

	buttonTruth.innerText = 'Verité';
	buttonDare.innerText = 'Action';

	buttonTruth.addEventListener('click', () => {
		makeChoice(questions, players, playerName, false, callback);
	});
	buttonDare.addEventListener('click', () => {
		makeChoice(questions, players, playerName, true, callback);
	});

	div.appendChild(buttonDare);
	div.appendChild(buttonTruth);
	choice.appendChild(name);
	choice.appendChild(div);
};

const hideChoice = () => {
	choice.classList.add('hide');
};

const makeChoice = (questions, players, playerName, dare, callback) => {
	hideChoice();
	console.log(players);
	let res;
	if (dare) {
		res = data.filter((q) => q.type == true);
	} else {
		res = data.filter((q) => q.type == false);
	}
	playTurn(res, players, playerName, dare, callback);
};

const playTurn = (questions, players, playerName, dare, callback) => {
	game.innerHTML = '';
	console.log(players);

	let questionIndex = Math.floor(Math.random() * questions.length);

	let question = questions[questionIndex];
	question = parseQuestion(question, playerName);
	let nameContainer = document.createElement('h3');
	let questionContainer = document.createElement('div');
	let next = document.createElement('button');

	nameContainer.classList.add('nameContainer');
	questionContainer.classList.add('questionContainer');
	next.classList.add('nextbutton');

	nameContainer.innerHTML = playerName;
	questionContainer.innerHTML = question;
	!dare
		? (questionContainer.innerHTML = questionContainer.innerHTML + ' ?')
		: questionContainer.innerHTML;
	next.innerHTML = 'Next';

	game.appendChild(nameContainer);
	game.appendChild(questionContainer);
	game.appendChild(next);

	next.addEventListener('click', () => {
		game.innerHTML = '';
		displayChoice(questions, players, callback);
	});

	return true;
};

const play = (turn) => {
	if (turn > 0) {
		displayChoice(data, parsePlayer(), () => {
			play(turn - 1);
		});
	} else {
		game.innerHTML = '<h1> FIN DE PARTIE </h1>';
	}
};

addButton.addEventListener('click', () => {
	let input = document.createElement('input');
	input.classList.add('player');
	input.setAttribute('placeholder', 'Enter a name here');
	container.appendChild(input);
});

playButton.addEventListener('click', () => {
	container.classList.add('hide');
	game.classList.remove('hide');
	playButton.classList.add('hide');
	addButton.classList.add('hide');
	play(10);
});

openForm.addEventListener('click', () => {
	form.classList.remove('hide');
});

cross.addEventListener('click', () => {
	form.classList.add('hide');
});

formButton.addEventListener('click', async () => {
	await fetch('api/addQuestion/' + formQuestion.value + '/' + truthOrDare.checked);
	formQuestion.value = '';
	let response = await fetch('/api/getQuestions');
	data = await response.json();
});
