$(document).ready(function () {
	$("#play-button").on("click", playGame);
});

function playGame() {
	var col = Math.floor(Math.random() * WINDOW_WIDTH);
	var row = Math.floor(Math.random() * WINDOW_DEPTH);
	$("#b" + row + "-" + col).css("background-color", "white");
}