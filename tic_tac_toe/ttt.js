
var game = {

	gameNum: 0,
	player: '',
	comp: '',
	prevMoveId: '',
	path: '',
	compMoves: [],
	playerEdgePath: '',
	playerCornerPath: '',
	playerCenterPath: '',
	lastCompMoveId: '',



	board: [
		'#top-left','#top-middle','#top-right','#center-left','#center-middle','#center-right','#bottom-left','#bottom-middle','#bottom-right'
	],

	freeMoves: [
		'#top-left','#top-middle','#top-right','#center-left','#center-middle','#center-right','#bottom-left','#bottom-middle','#bottom-right' 	
	],

	init: function init () {
		game.prevMoveId = '';
		game.path = '';
		game.compMoves = [];
		game.playerEdgePath = '';
		game.playerCornerPath = '';
		game.playerCenterPath = '';
		game.lastCompMoveId = '';

//		$('#message-container').hide();

		if (game.gameNum > 0) {
			setTimeout(function() {
			$('h2').remove();
			}, 2000)
		}
		game.gameNum++;

		(function setBoard () {
			game.freeMoves = [];
			for (var i = 0; i < game.board.length; i++) {
				game.freeMoves.push(game.board[i]);
			}
		})();
		// x and 0 selection, modal display

		if ( !(game.gameNum > 1) ) {
			(function chooseXO(question) {
				question = question || 'X XOR O?';

				$('#iconModal').modal({
					show: true,
					backdrop: true,
					keyboard: false
				});

				$('#question').html(question);
				$('#leftButton').one('click', function () {
					if (question === 'X XOR O?') {
						game.player = 'X';
						game.comp = game.player === 'X' ? 'O' : 'X';
					}
					$('#rightButton').off('click');
					$('#iconModal').modal('hide');
					game.compTurn();
				});
				$('#rightButton').one('click', function () {
					if (question === 'X XOR O?') {
						game.player = 'O';
						game.comp = game.player === 'X' ? 'O' : 'X';
					}
					$('#rightButton').off('click');
					$('#iconModal').modal('hide');
					game.compTurn();
				});
			})();
		} else {
			//after a gap, new game
			setTimeout(function () {
				game.compTurn();
			}, 3000);
		}
	},

	playerTurn: function playerTurn () {
		// when a free square is clicked, draw X or O, disable click functionality
		var allSquares = this.freeMoves.join(', ');
		$(allSquares).one('click', function () {
			$(this).append('<h2>' + game.player + '</h2>');
			$(allSquares).off('click');
			//identifying which box is clicked
			game.prevMoveId = '#' + $(this).attr('id');

			// update freeMoves after player moves
			game.freeMoves = game.disableSpace(game.prevMoveId, game.freeMoves);

			// get all player moves
			var playerMoves = game.marks(game.player);

			// check them for winning combo
			var playerWin = game.checkWin(playerMoves);

			if (playerWin) {
				game.over('player wins');
			} else if (game.freeMoves.length > 0) {
				game.move = game.move || true;
				game.compTurn();
			} else {
				//output losing message
				game.over();
			}
		});
	},



	compTurn: function compTurn () {
		var center = game.board[4];

		var corner = {
			topleft: game.board[0],
			topright: game.board[2],
			bottomright: game.board[8],
			bottomleft: game.board[6]
		};

		var edge = {
			top: game.board[1],
			right: game.board[5],
			bottom: game.board[7],
			left: game.board[3]
		};

		var top = [corner.topleft, edge.top, corner.topright];
		var rightSide = [corner.topright, edge.right, corner.bottomright];
		var bottom = [corner.bottomleft, edge.bottom, corner.bottomright];
		var leftSide = [corner.topleft, edge.left, corner.bottomleft];

		var moveNum = 10 - game.freeMoves.length;

		// drawing the move on the board
		function draw (id) {

			if (typeof id === "number") {
				id = game.board[id];
			}
			$(id).append('<h2>' + game.comp + '</h2>');
		}

		function random (num) {
			return Math.floor((Math.random() * (num)));
		}
		function randomProperty (obj, random) {
			var keys = Object.keys(obj);
			return obj[keys[ random ]];
		}

		function didPlayerMove (loc) {
			var lastMove = game.prevMoveId;
			if (typeof loc === 'string') {
				return loc === lastMove;
			} else {
				for (var key in loc) {
					if (loc[key] === lastMove) {
						console.log('from didPlayerMove : ' + loc[key]);
						return true;
					}
				}
			}
			return false;
		}

			var horizWin = {
				top: 		[0, 1, 2],
				middle: [3, 4, 5],
				bottom: [6, 7, 8]
			};
			var vertWin = {
				left: 	[0, 3, 6],
				middle: [1, 4, 7],
				right: 	[2, 5, 8]
			};
			var diagWin = {
				left: 	[0, 4, 8],
				right: 	[2, 4, 6]
			};
		function block () {
			function makeCheck(moves) {
				return function (input) {
					return moves.some(function (element) {
						return element === input;
					});
				};
			}
			var playerMoved = makeCheck(game.marks(game.player));
			function blank (i) {
				if ('X' === $(game.board[i]).find('h2').text() ||
					'O' === $(game.board[i]).find('h2').text()) {
					return false;
				} else {
					return true;
				}
			}
			var winCombos = [horizWin, vertWin, diagWin];
			for (var i = 0; i < winCombos.length; i++) {
				var winnersObj = winCombos[i];
				for (var array in winnersObj) {
					if (playerMoved(winnersObj[array][0])
						&& playerMoved(winnersObj[array][1])
						&& blank(winnersObj[array][2]) ) {
						return winnersObj[array][2];
					} else if (playerMoved(winnersObj[array][1])
						&& playerMoved(winnersObj[array][2])
						&& blank(winnersObj[array][0])) {
						return winnersObj[array][0];
					} else if (playerMoved(winnersObj[array][0])
						&& playerMoved(winnersObj[array][2])
						&& blank(winnersObj[array][1])) {
						return winnersObj[array][1];

					}
				}
			}
			return false;
		}


		// Checking if player blocked move
		function didPlayerBlock () {
			function makeCheck (moves) {
				return function (input) {
					return moves.some(function (element) {
						return element === input;
					});
				};
			}
			function getIdxFromId (id) {
				for (var i = 0; i < game.board.length; i++) {
					if (id === game.board[i]) {
						var array = [];
						array.push(i);
						return array;
					}
				}
				return false;
			}
			var checkPlayer = makeCheck(getIdxFromId(game.prevMoveId));
			var checkComp = makeCheck(game.marks(game.comp));
			var winCombos = [horizWin, vertWin, diagWin];
			for (var i = 0; i < winCombos.length; i++) {
				var winnersObj = winCombos[i];
				for (var array in winnersObj) {
					if (checkComp(winnersObj[array][0])
						&& checkComp(winnersObj[array][1])
						&& checkPlayer(winnersObj[array][2]) ) {
							return true;
					} else if (checkComp(winnersObj[array][1])
						&& checkComp(winnersObj[array][2])
						&& checkPlayer(winnersObj[array][0]) ) {
								return true;
					} else if ( checkComp(winnersObj[array][0])
						&& checkComp(winnersObj[array][2])
						&& checkPlayer(winnersObj[array][1]) ) {
						return true;
					}
				}
			}
			return false;
		}

		// Returns idx of a win, else false
		function doWin () {
			function makeCheck(moves) {
				return function (input) {
					return moves.some(function (element) {
						return element === input;
					});
				};
			}
			var compMoved = makeCheck(game.marks(game.comp));
			function blank(i) {
				if ('X' === $(game.board[i]).find('h2').text() ||
					'O' === $(game.board[i]).find('h2').text()) {
					return false;
				} else {
					return true;
				}
			}
			var winCombos = [horizWin, vertWin, diagWin];
			for (var i = 0; i < winCombos.length; i++) {
				var winnersObj = winCombos[i];
				for (var array in winnersObj) {
					if (compMoved(winnersObj[array][0])
						&& compMoved(winnersObj[array][1])
						&& blank(winnersObj[array][2]) ) {
						return winnersObj[array][2];
					} else if (compMoved(winnersObj[array][1])
									&& compMoved(winnersObj[array][2])
									&& blank(winnersObj[array][0])) {
						return winnersObj[array][0];
					} else if (compMoved(winnersObj[array][0])
									&& compMoved(winnersObj[array][2])
									&& blank(winnersObj[array][1])) {
						return winnersObj[array][1];

					}
				}
			}
			return false;
		}

		// Randomly deciding first move
		if (moveNum === 1) {
			if (random(2) === 0) {
				draw(center);
				game.path = 'center';
			} else {
				draw(randomProperty(corner, random(4)));
				game.path = 'corner';
			}
		}

		if ('center' === game.path) {

			if (moveNum === 3 && didPlayerMove(edge)) {
				game.playerEdgePath = true;
				(function moveOppositeCorner() {
					var playerMoved = game.prevMoveId;
					if (edge.top === playerMoved) {
						random(2) === 1 ? draw(bottom[0]) : draw(bottom[2]);
					} else if (edge.right === playerMoved) {
						random(2) === 1 ?
							draw(leftSide[0]) : draw(leftSide[2]);
					} else if (edge.bottom === playerMoved) {
						random(2) === 1 ?
							draw(top[0]) : draw(top[2]);
					} else if (edge.left === playerMoved) {
						random(2) === 1 ?
							draw(rightSide[0]) : draw(rightSide[2]);
					}
				})();
			}
			if (game.playerEdgePath) {
				if (moveNum === 5 && didPlayerBlock() ) {
					var idx2 = block();
					draw(game.board[idx2]);
				} else if (moveNum === 5) {
					draw(doWin());
				}
				if ( moveNum === 7 ) {
					draw(doWin());
				}

			}
			if (moveNum === 3 && didPlayerMove(corner)) {
				game.playerCornerPath = true;
				(function moveDiagonalCorner() {
					var playerMoved = game.prevMoveId;
					if (corner.topleft === playerMoved) {
						draw(corner.bottomright);
					} else if (corner.topright === playerMoved) {
						draw(corner.bottomleft);
					} else if (corner.bottomright === playerMoved) {
						draw(corner.topleft);
					} else if (corner.bottomleft === playerMoved) {
						draw(corner.topright);
					}
				})();
			}

			if (game.playerCornerPath) {
				if (moveNum === 5) {
					if (doWin() !== false) {
						draw(doWin());
					} else if (typeof block() === 'number') {
						draw(game.board[block()]);
					} else {
						draw(game.freeMoves[random(game.freeMoves.length)]);
					}
				}
				if (moveNum === 7 && didPlayerBlock()) {
					if (doWin() !== false) {
						draw(doWin());
					} else if (doWin() === false) {
						draw(game.freeMoves[random(game.freeMoves.length)]);
					}
				} else if (moveNum === 7) {
					if (doWin() !== false) {
						draw(doWin());
					} else if (typeof block() === 'number') {
							draw(game.board[block()]);
					} else if (doWin() === false) {
						draw(game.freeMoves[random(game.freeMoves.length)]);
					}
				}
				if (moveNum === 9 && didPlayerBlock()) {
					draw(game.freeMoves[random(game.freeMoves.length)]);
				} else if (moveNum === 9) {
					if (doWin() !== false) {
						draw(doWin());
					} else if (doWin() === false) {
						draw(game.freeMoves[random(game.freeMoves.length)]);
					}
				}

			}

		}

		if ('corner' === game.path) {

			if (moveNum === 3 && didPlayerMove(center)) {
				game.playerCenterPath = true;
				(function moveDiagonalCorner() {
					var firstMove = game.board[(game.marks(game.comp)[0])];
					if (corner.topleft === firstMove) {
						draw(corner.bottomright);
					} else if (corner.topright === firstMove) {
						draw(corner.bottomleft);
					} else if (corner.bottomright === firstMove) {
						draw(corner.topleft);
					} else if (corner.bottomleft === firstMove) {
						draw(corner.topright);
					}
				})();
			} else if (moveNum === 3) {
				game.playerCenterPath = false;
				(function moveSameRowCorner() {
					var firstComp = game.board[(game.marks(game.comp)[0])];
					var firstPlayer = game.board[(game.marks(game.player)[0])];
					if (corner.topleft === firstComp) {
						corner.topright !== firstPlayer ? draw(corner.topright) : draw(corner.bottomleft);
					} else if (corner.topright === firstComp) {
						corner.topleft !== firstPlayer ? draw(corner.topleft) : draw(corner.bottomright);
					} else if (corner.bottomright === firstComp) {
						corner.bottomleft !== firstPlayer ? draw(corner.bottomleft) : draw(corner.topright);
					} else if (corner.bottomleft === firstComp) {
						corner.bottomright !== firstPlayer ? draw(corner.bottomright) : draw(corner.topleft);
					}
				})();
			}

			if (game.playerCenterPath) {
				if (moveNum === 5) {
					if (doWin() !== false) {
						draw(doWin());
					} else if (typeof block() === 'number') {
						draw(game.board[block()]);
					} else {
						draw(game.freeMoves[random(game.freeMoves.length)]);
					}
				}
				if (moveNum === 7) {
					if (doWin() !== false) {
						draw(doWin());
					} else if (typeof block() === 'number') {
						draw(game.board[block()]);
					} else {
						draw(game.freeMoves[random(game.freeMoves.length)]);
					}
				}
				if (moveNum === 9) {
					if (doWin() !== false) {
						draw(doWin());
					} else if (typeof block() === 'number') {
						draw(game.board[block()]);
					} else {
						draw(game.freeMoves[random(game.freeMoves.length)]);
					}
				}
			} 
			if (!game.playerCenterPath) {
				if (moveNum === 5) {
					if (doWin() !== false) {
						console.log('winning at move 5 because' + doWin());
						draw(doWin());
					} else if (typeof block() === 'number') {
						console.log('block at move 5 because' + block());
						draw(game.board[block()]);
					} else if (didPlayerBlock() === false) {
            var firstCompId = (function () {
              var array = game.marks(game.comp);
              var ids = array.map(function (e) {
                return game.board[e];
              });
              return ids[0] !== game.lastCompMoveId ? ids[0] : ids[1];
            })();
						if (corner.topleft === firstCompId) {
							blank(corner.bottomright) ? draw(corner.bottomright) : draw(corner.bottomleft);
						} else if (corner.topright === firstCompId) {
							blank(corner.bottomleft) ? draw(corner.bottomleft) : draw(corner.bottomright);
						} else if (corner.bottomright === firstCompId) {
							blank(corner.topleft) ? draw(corner.topleft) : draw(corner.topright);
						} else if (corner.bottomleft === firstCompId) {
							blank(corner.topright) ? draw(corner.topright) : draw(corner.topleft);
						}
					} else if ( didPlayerBlock() || typeof block() !== 'number') {
						console.log('playerBlocked from move 5');
						var lastComp = game.lastCompMoveId;
						console.log('lastcomp is from move 5 ' + lastComp);
						function blank (id) {
							if ('X' === $(id).find('h2').text() ||
									'O' === $(id).find('h2').text()) {
								return false;
							} else {
								return true;
							}
						}
						//
						if (corner.topleft === lastComp) {
							blank(corner.bottomright) ? draw(corner.bottomright) : draw(center);
						} else if (corner.topright === lastComp) {
							blank(corner.bottomleft) ? draw(corner.bottomleft) : draw(center);
						} else if (corner.bottomright === lastComp) {
							blank(corner.topleft) ? draw(corner.topleft) : draw(center);
						} else if (corner.bottomleft === lastComp) {
							blank(corner.topright) ? draw(corner.topright) : draw(center);
						}
					} else {
						console.log('random at move 5 because' + block() + doWin());
						draw(game.freeMoves[random(game.freeMoves.length)]);
					}
				}
				if (moveNum === 7) {
					if (doWin() !== false) {
						console.log('winning at move 7 because' + doWin());
						draw(doWin());
					} else if (typeof block() === 'number') {
						console.log('blocking at move 7 because' + block());
						draw(game.board[block()]);
					} else {
						console.log('random at move 7 because' + block() + doWin());
						draw(game.freeMoves[random(game.freeMoves.length)]);
					}
				}
				if (moveNum === 9) {
					if (doWin() !== false) {
						console.log('winning at move 9 because' + doWin());
						draw(doWin());
					} else if (typeof block() === 'number') {
						console.log('blocking at move 9 because' + block());
						draw(game.board[block()]);
					} else {
						console.log('random at move 9 because' + block() + doWin());
						draw(game.freeMoves[random(game.freeMoves.length)]);
					}
				}
			} 
		} 


		function getPrevMove () {
			var prevMoves = game.compMoves;
			function makeCheck (moves) {
				return function (input) {
					return moves.some(function (element) {
						return element === input;
					});
				};
			}
			var inPrevMoves = makeCheck(prevMoves);
			var icon = game.comp;
			function drawnInSquare (i) {
				return icon === $(game.board[i]).find('h2').text();
			}
			for (var i = 0; i < game.board.length; i++) {
				if ( drawnInSquare(i) && !inPrevMoves(i) ) {
						console.log('from get prev move: ' + game.board[i]);
						return game.board[i];
				}
			}
		}

		
		game.prevMoveId = getPrevMove();

		game.lastCompMoveId = game.prevMoveId;

		
		game.freeMoves = game.disableSpace(game.prevMoveId, game.freeMoves);

		
		game.compMoves = game.marks(game.comp);

		if (game.compMoves.length > 0) {
			// checking if computer won
			var compWin = game.checkWin(game.compMoves);
		}

		if (compWin) {
			game.over('computer wins');
		} else if (game.freeMoves.length === 0) {
			game.over('tie');
		} else {
			game.playerTurn();
		}

	}, 

	disableSpace: function disableSpace (lastMove, remaining) {
		remaining = remaining || this.freeMoves;
		for (var i = 0; i < remaining.length; i++) {
			if (remaining[i] === lastMove) {
				remaining.splice(i, 1);
			}
		}
		return remaining;
	},

	// Returns array showing where all player or comp marks are.
	marks: function marks (icon) {
		var played = [];
		for (var i = 0; i < game.board.length; i++) {
			if ( icon === $(game.board[i]).find('h2').text() ) {
				played.push(i);
			}
		}
		return played;
	},

	//checking if there is a win - resets the game

	checkWin: function checkWin (moves) {

		function makeCheck (moves) {
			return function (input) {
				return moves.some(function (element) {
						return element === input;
				});
			};
		}
		//checks baked in array for an element
		var check = makeCheck(moves);

		if (moves.length > 2) {
			if (check(0)) {
				if (((check(1)) && (check(2))) || ((check(3))&&(check(6))) || ((check(4))&&(check(8)))){
						return true;
				}
			}
			if (check(1) && check(4) && check(7)) {
				return true;
			}
			if (check(2)) {
				if (check(4) && check(6)) {
					return true;
				}
				if (check(5) && check(8)) {
					return true;
				}
			}
			if (check(3) && check(4) && check(5)) {
				return true;
			}
			if (check(6) && check(7) && check(8)) {
				return true;
			}
		}



	},	

	//proper message display on game over

	over: function over (type) {
		var mdisplay='';
		if (type === 'player wins') {
			mdisplay='You won!!';
		} else if (type === 'computer wins') {
			mdisplay='You lose!!';
		} else if (type === 'tie') {
			mdisplay='It is a tie!!';
		}

		$("#my-message").html(mdisplay);
        $('#message-container').slideDown().delay(2000).slideUp();
			game.init();
	}


}; 
game.init();