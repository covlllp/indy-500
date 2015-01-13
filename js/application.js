var game;

$(document).ready(function () {
	$("#play-button").on("click", playGame);

	$(function() {
		$(window).keypress(function(e) {
			var key = e.which;
			if (key == 106 || key == 74) {
				game.moveCar(-1);
			} else if (key == 107 || key == 75) {
				game.moveCar(1);
			}
		});
	});
});

function playGame() {
	$("#play-button").text("Playing!");
	game = new Game();
	game.updateBoard()

	var delay = 50;
	var func = setInterval(function() {
		game.shiftBoard();
		if (game.checkCrash()) {
			clearInterval(func);
			$("#play-button").text("Score: " + game.getScore()
				+ "! Play Again?");
		}
	}, delay);
}


// ----- Game Object functions! ----- //

function Game() {
// --- Private variables of Game() --- //
// border_loc = Array of objects <left, right> indicating location of borders
// car_loc = Number indicating location of car
// road_width = Number indicating width of the road
// score = Number indicating # times the board has shifted
	var car_loc = Math.floor(WINDOW_WIDTH / 2);
	var border_loc = this.initBorderArray();
	var road_width = WINDOW_WIDTH - 2;
	var score = 0;

	// Move the car location
	this.moveCar = function(val) {
		car_loc += val;
	}

	this.thinRoad = function() {road_width--};

	this.updateBoard = function() {
		clearBoard();
		// Draw border
		this.drawBorders(border_loc);
		// Draw car
		this.drawAt("0", 0, car_loc);
	}

	this.shiftBoard = function() {
		// shift the border_loc array
		border_loc.shift();
		border_loc.push(
			this.getNewBorderObj(border_loc[border_loc.length - 1], road_width)
		);
		// update the score and board
		this.updateScore();
		this.updateBoard();
	}

	this.updateScore = function() {
		score++;
		if (score % 7 == 0 && score > 1) this.thinRoad();
	}

	this.checkCrash = function() {
		var obj	= border_loc[0];
		return (car_loc <= obj.left
			|| car_loc >= obj.right);
	}

	this.getScore = function() {return score};
}


// ----- Game Prototype Functions ----- //

Game.prototype.getNewBorderObj = function(prev_obj, width) {
	var turn = Math.floor(Math.random()*3.25-1);
	var int_left = prev_obj.left;
	var int_right = prev_obj.left + width;

	if (int_left + turn < 0 || int_right + turn >= WINDOW_WIDTH)
		turn = 0;

	return {
		left: int_left + turn,
		right: int_right + turn
	};
}

Game.prototype.drawBorders = function(border_loc) {
	var self = this;
	border_loc.forEach(function(obj, ind) {
		self._drawBorderFromObject(obj, ind);
	});
}

Game.prototype._drawBorderFromObject = function(obj, i) {
	this.drawAt("X", i, obj.left);
	this.drawAt("X", i, obj.right);
}

Game.prototype.initBorderArray = function() {
	return Array.apply(null, new Array(WINDOW_DEPTH)).map(function() {
		return {left: 0, right: WINDOW_WIDTH - 1};
	});
}

Game.prototype.drawAt = function(val, i, j) {
	$("#b" + i + "-" + j).text(val);
}



//  --- Random but Useful Functions --- //
function clearBoard() {
	$("td").text("");
}

function randXMark() {
	var col = Math.floor(Math.random() * WINDOW_WIDTH);
	var row = Math.floor(Math.random() * WINDOW_DEPTH);
	$("#b" + row + "-" + col).text("X");
}