const sounds = {
	click: new Audio("assets/sounds/click.mp3"),
	wish: new Audio("assets/sounds/wish.mp3"),
	reveal: new Audio("assets/sounds/reveal.mp3"),
};

function playSound(name) {
	const s = sounds[name];
	if (!s) return;
	s.currentTime = 0;
	s.play();
}

const wishButton = document.getElementById("wish-button");
const bannerScreen = document.getElementById("banner-screen");
const wishAnimation = document.getElementById("wish-animation");
const wishVideo = document.getElementById("wish-video");

const revealScreen = document.getElementById("reveal-screen");
const revealImg = document.getElementById("reveal-image");
const revealName = document.getElementById("reveal-name");
const revealStars = document.getElementById("reveal-stars");

const resultsScreen = document.getElementById("results");
const resultCards = document.querySelectorAll(".result-card");

const pulls = [
	{ name: "Personnage 1", img: "assets/characters/char1.png" },
	{ name: "Personnage 2", img: "assets/characters/char2.png" },
	{ name: "Personnage 3", img: "assets/characters/char3.png" },
	{ name: "Personnage 4", img: "assets/characters/char4.png" },
	{ name: "Personnage 5", img: "assets/characters/char5.png" },
	{ name: "Personnage 6", img: "assets/characters/char6.png" },
	{ name: "Personnage 7", img: "assets/characters/char7.png" },
	{ name: "Personnage 8", img: "assets/characters/char8.png" },
	{ name: "Personnage 9", img: "assets/characters/char9.png" },
	{ name: "Personnage 10", img: "assets/characters/char10.png" }
];

let revealIndex = 0;

wishButton.addEventListener("click", () => {
	playSound("click");
	playSound("wish");
	bannerScreen.classList.add("hidden");
	wishAnimation.classList.remove("hidden");

	wishVideo.currentTime = 0;
	wishVideo.play();
});


wishVideo.addEventListener("ended", () => {
	wishAnimation.classList.add("hidden");
	startReveal();
});

function startReveal() {
	revealScreen.classList.remove("hidden");
	revealIndex = 0;
	showReveal();
}

function showReveal() {
	playSound("reveal");
	const character = revealScreen.querySelector("#reveal-character");

	const pull = pulls[revealIndex];

	revealScreen.innerHTML = `
	<div class="reveal-shadow"></div>

	<div id="reveal-character">
		<img id="reveal-silhouette">
		<img id="reveal-image">
		<div id="reveal-name"></div>
		<div id="reveal-stars"></div>
	</div>
	`;

	const silhouette = revealScreen.querySelector("#reveal-silhouette");
	const img = revealScreen.querySelector("#reveal-image");
	const name = revealScreen.querySelector("#reveal-name");
	const stars = revealScreen.querySelector("#reveal-stars");

	silhouette.src = pull.img;
	img.src = pull.img;
	name.textContent = pull.name;

	for (let i = 0; i < 5; i++) {
		const star = document.createElement("div");
		star.className = "star";
		star.style.animationDelay = `${1.3 + i * 0.15}s`;
		stars.appendChild(star);

		setTimeout(() => {
			spawnParticles(star, 6);
		}, 1300 + i * 150);
	}
}
revealScreen.addEventListener("click", () => {
	revealIndex++;
	sounds.reveal.pause();
	sounds.reveal.currentTime = 0;

	if (revealIndex < pulls.length) {
		showReveal();
	} else {
		endReveal();
	}
});


function endReveal() {
	revealScreen.classList.add("hidden");
	showFinalResults();
}

function showFinalResults() {
	resultsScreen.classList.remove("hidden");

	resultCards.forEach((card, i) => {
		card.style.backgroundImage = `url(${pulls[i].img})`;
		const name = card.querySelector(".result-card__name");
		name.innerText = pulls[i].name;

		const stars = card.querySelector(".stars");
		stars.innerHTML = "";

		for (let j = 0; j < 5; j++) {
			const s = document.createElement("div");
			s.className = "star";
			stars.appendChild(s);
		}

		setTimeout(() => {
			card.classList.add("show");
		}, i * 120);
	});
}

function spawnParticles(container, count = 20) {
	for (let i = 0; i < count; i++) {
		const p = document.createElement("div");
		p.className = "particle";

		p.style.left = `${50 + (Math.random() * 120 - 60)}%`;
		p.style.top = `${50 + (Math.random() * 80 - 40)}%`;
		p.style.animationDelay = `${Math.random() * 0.4}s`;

		container.appendChild(p);

		setTimeout(() => p.remove(), 1500);
	}
}

