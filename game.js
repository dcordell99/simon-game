const buttonColors = [ 'red', 'blue', 'green', 'yellow' ];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;
let initialized = false;

//add a new button sequence to the game.
const nextSequence = () => {
	userClickedPattern = [];
	const randomNumber = Math.floor(Math.random() * 4);
	const randomColor = buttonColors[randomNumber];

	gameStarted = true;
	level += 1;

	$('.start').text(`Level ${level}`);

	gamePattern.push(randomColor);

	let ms = 0;

	return gamePattern.forEach((entry) => {
		let color = entry;
		let audio = new Audio(`sounds/${color}.mp3`);
		(() =>
			setTimeout(() => {
				audio.play();
				$(`#${color}`).fadeIn(100).fadeOut(100).fadeIn(100);
			}, (ms += 600)))();
	});
};

//see if user clicked color matches color in game pattern array.
const checkAnswer = () => {
	if (
		userClickedPattern[userClickedPattern.length - 1] ===
		gamePattern[userClickedPattern.length - 1]
	) {
		if (userClickedPattern.length === gamePattern.length) {
			nextSequence();
		}
	} else {
		endGame();
	}
};

const buttonHoverEffects = () => {
	$('.btn').mouseenter(function() {
		const userChosenColor = $(this).attr('id');

		$(`.${userChosenColor}`).addClass(`color-hover-${userChosenColor}`);
	});

	$('.btn').mouseleave(function() {
		const userChosenColor = $(this).attr('id');

		$(`.${userChosenColor}`).removeClass(`color-hover-${userChosenColor}`);
	});
};

//clicked button colors to array and animate color/play audio.
const userPickColorListener = () => {
	$('.btn').click(function() {
		const userChosenColor = $(this).attr('id');

		$(`.${userChosenColor}`).removeClass(`color-hover-${userChosenColor}`);

		userClickedPattern.push(userChosenColor);

		animateButtonColor(userChosenColor);
		playAudio(userChosenColor);

		checkAnswer();
	});
};

const animateButtonColor = (color) => {
	$(`#${color}`).toggleClass('pressed');
	setTimeout(() => $(`#${color}`).toggleClass('pressed'), 80);
};

const playAudio = (audio) => {
	audio = new Audio(`sounds/${audio}.mp3`);
	audio.play();
};

const endGame = () => {
	gameStarted = false;
	level = 0;
	gamePattern = [];
	userClickPattern = [];

	playAudio('wrong');

	$('#level-title').text(`Press A Key to Start`);
	$('.level').text('simon');

	$('body').addClass('game-over');
	$('.start').text('click or press start').removeClass('current-level');
	return;
};

function initializeGame() {
	if (initialized) return;

	initialized = true;
	userPickColorListener();
	buttonHoverEffects();
}

$('.center').click(function() {
	if (!gameStarted) {
		initializeGame();
		nextSequence();
		$('.start').addClass('current-level');
		$('body').removeClass('game-over');
		$('.center').removeClass('center:hover');
	} else {
		return;
	}
});
