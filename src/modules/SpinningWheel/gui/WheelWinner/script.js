const params = new URLSearchParams(window.location.search);
document.getElementById("text").textContent = params.get("name")||"Username";

// do this for 5 seconds
var duration = 5 * 1000;
var end = Date.now() + duration;

(function frame() {
	// launch a few confetti from the left edge
	confetti({
		particleCount: 7,
		angle: 60,
		spread: 55,
		origin: { x: 0 }
	});
	// and launch a few from the right edge
	confetti({
		particleCount: 7,
		angle: 120,
		spread: 55,
		origin: { x: 1 }
	});

	// keep going until we are out of time
	if (Date.now() < end) {
		requestAnimationFrame(frame);
	}
})();