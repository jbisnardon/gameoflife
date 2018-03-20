

class myGame {

	constructor(confValue, CELL_WIDTH, NB_CELL, idElement) {
		
		this.started = false;
		this.currentTour = 0;

		this.CELL_WIDTH = CELL_WIDTH;
		this.NB_CELL = NB_CELL;
		this.CANVAS_WIDTH = CELL_WIDTH * NB_CELL;

		this.gameConf = new gameConf();

		this.gameDrawer = new gameDrawer(this, idElement)

		this.gameDrawer.writeTour();
		this.gameDrawer.drawFrame();
		this.initStatus(confValue);	
	}

	initNewStatus() {
		this.newStatus = [];
		for(var i=0;i<this.NB_CELL;i++) {
			this.newStatus[i] = [];
			for(var j=0;j<this.NB_CELL;j++) {
				this.newStatus[i][j] = 0;
			}
		}
	}

	initOldStatus() {
		this.oldStatus = [];
		for(var i=0;i<this.NB_CELL;i++) {
			this.oldStatus[i] = [];
			for(var j=0;j<this.NB_CELL;j++) {
				this.oldStatus[i][j] = 0;
			}
		}
	}

	initStatus(confValue) {		
		this.initOldStatus();
		this.initNewStatus();
		this.chooseInitialConf(confValue);
		this.redrawGame();
	}

	chooseInitialConf(value) {
		var conf = [];
		switch(value) {
			case '1':
				conf = this.gameConf.initMarcheur();
				break;
			case '2':
				conf = this.gameConf.initU();
				break;
			case '3':
				conf = this.gameConf.initStairway();
				break;
			case '4':
				conf = this.gameConf.initLigne5();
				break;
			case '5':
				conf = this.gameConf.initCircle1();
				break;
		}

		this.initFromConf(conf, 25);
	}

	initFromConf(conf, offset) {
		for(var i=0;i<conf.length;i++) {
			var x = conf[i].x + offset;
			var y = conf[i].y + offset;
			this.oldStatus[x][y] = 1;
		}
	}

	redrawGame() {
		var startScan = 0;
		var stopScan = this.NB_CELL;

		for(var i=startScan; i<stopScan;i++) {

			for(var j=startScan; j<stopScan;j++) {

				if(this.cellIsAlive(i, j)) {
					this.gameDrawer.fillCell(i, j);
				} else {
					this.gameDrawer.emptyCell(i, j);
				}
			}
		}
	}

	cellIsAlive(x, y) {
		if( (x < 0) || (y < 0) || (x >= this.NB_CELL) || (y >= this.NB_CELL) ) {
			//console.log('Cell status' +x + ':'+y +' / outOfScope');
			return false;
		} else {
			//console.log('Cell status' +x + ':'+y +' / '+this.oldStatus[x][y]);
			return (this.oldStatus[x][y]==1);
		}
	}

	setCellAsAlive(x, y) {
		this.newStatus[x][y] = 1;
		if(!this.cellIsAlive(x, y)) {
			this.gameDrawer.newCell(x, y);
		}
	}

	setCellAsDead(x, y) {
		this.newStatus[x][y] = 0;
		if(this.cellIsAlive(x, y)) {
			this.gameDrawer.dyingCell(x, y);
		}
	}

	checkCellNeighboors(x, y) {

		var nbNeighboors = 0;

		//console.log(" === Neighboor for "+x+"/"+y)

		nbNeighboors += this.cellIsAlive(x-1, y+1)?1:0;
		nbNeighboors += this.cellIsAlive(x-1, y)?1:0;
		nbNeighboors += this.cellIsAlive(x-1, y-1)?1:0;

		nbNeighboors += this.cellIsAlive(x, y+1)?1:0;
		nbNeighboors += this.cellIsAlive(x, y-1)?1:0;

		nbNeighboors += this.cellIsAlive(x+1, y+1)?1:0;
		nbNeighboors += this.cellIsAlive(x+1, y)?1:0;
		nbNeighboors += this.cellIsAlive(x+1, y-1)?1:0;

		return nbNeighboors;
	}

	swapStatus() {
		this.oldStatus = this.newStatus.map(function(arr) {
		    return arr.slice();
		});
		this.initNewStatus();
	}

	applyEvolution(x ,y) {
		//console.log('Evolution ' + this.currentTour)
		var startScan = 0;
		var stopScan = this.NB_CELL;

		for(var i=startScan; i<stopScan;i++) {

			for(var j=startScan; j<stopScan;j++) {
				var nbNeighboors = this.checkCellNeighboors(i ,j);

				//console.log(i + ':'+j +' / '+nbNeighboors);

				if( (nbNeighboors == 3) || ((nbNeighboors == 2) && this.cellIsAlive(i ,j) )) {
					this.setCellAsAlive(i, j);
				} else {
					this.setCellAsDead(i, j);
				}				
			}
		}
	}

	incrementTour() {
		this.currentTour++;
		this.gameDrawer.writeTour();
	}

	playTour() {
		this.incrementTour();
		this.applyEvolution();
		this.swapStatus();
		this.redrawGame();
	}
}