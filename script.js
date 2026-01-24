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

const title = document.querySelector("h1");
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
	{ name: "Votre propre corps", img: "assets/characters/char1.png" },
	{ name: "Une arme de mélée", img: "assets/characters/char2.png" },
	{ name: "Une arme à distance", img: "assets/characters/char3.png" },
	{ name: "La magiiiiiie", img: "assets/characters/char4.png" },
	{ name: "Votre voix douce et mélodieuse et convaincante et trop pipou UwU UwU UwU", img: "assets/characters/char5.png" },
	{ name: "Tommy Wiseau", img: "assets/characters/char6.png" },
];

let revealIndex = 0;

wishButton.addEventListener("click", () => {
	playSound("click");
	playSound("wish");
	title.classList.add("hidden");
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

