class gameConf {
	
	constructor(gameObj, idElement) {
		
		this.gameObj = gameObj;

		var c = document.getElementById(idElement);
		c.addEventListener('click', function(event) {
			if(game.started) {
				console.log('Partie en cours, saisie bloquée');
				return false;
			}
			gameConf.findClickedCell(event, gameObj);
		})
	}

	static initLigne5() {
		return [{'x':0,'y':0},
				{'x':0,'y':1},
				{'x':0,'y':2},
				{'x':0,'y':3},
				{'x':0,'y':4}];
	}

	static initU() {
		return [{'x':0,'y':0},
				{'x':0,'y':1},
				{'x':0,'y':2},
				{'x':1,'y':2},
				{'x':2,'y':0},
				{'x':2,'y':1},
				{'x':2,'y':2}];
	}

	static initCircle1() {

		return [{'x':1,'y':0},
				{'x':2,'y':0},
				{'x':0,'y':1},
				{'x':0,'y':2},
				{'x':1,'y':3},
				{'x':2,'y':1},
				{'x':2,'y':2}];
	}

	static initStairway() {

		return [{'x':2,'y':0},
				{'x':3,'y':0},
				{'x':1,'y':1},
				{'x':2,'y':1},
				{'x':0,'y':2},
				{'x':1,'y':2}];
	}

	static initMarcheur() {

		return [{'x':0,'y':2},
				{'x':2,'y':2},
				{'x':1,'y':3},
				{'x':2,'y':3},
				{'x':1,'y':4}];
	}

	static findClickedCell(event, gameObj) {
		var coord = { x: event.offsetX, y: event.offsetY }
		
		var x = coord.x;
		var y = coord.y;

		var posx = Math.round(x/gameObj.CELL_WIDTH);
		var posy = Math.round(y/gameObj.CELL_WIDTH);

		//Out of limits
		if( (posx > gameObj.NB_CELL) || (posx <= 0) || (posy > gameObj.NB_CELL) || (posy <= 0) )
			return false;

		posx--;
		posy--;

		game.initFromConf([{"x":posx,"y":posy}],0);
		game.redrawGame();
	}
}