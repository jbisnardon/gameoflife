

class myGame {

	constructor(confValue, CELL_WIDTH, NB_CELL, idElement) {
		
		this.started = false;
		this.currentTour = 0;

		this.CELL_WIDTH = CELL_WIDTH;
		this.NB_CELL = NB_CELL;
		this.CANVAS_WIDTH = CELL_WIDTH * NB_CELL;

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
		switch(value) {
			case '1':
				this.initMarcheur();
				break;
			case '2':
				this.initU(30);
				break;
			case '3':
				this.initStairway();
				break;
			case '4':
				this.initLigne5();
				break;
			case '5':
				this.initCircle1();
				break;
		}
	}

	initLigne5() {
		this.oldStatus[3][5] = 1;
		this.oldStatus[4][5] = 1;
		this.oldStatus[5][5] = 1;
		this.oldStatus[6][5] = 1;
		this.oldStatus[7][5] = 1;
	}

	initU(offset) {
		this.oldStatus[offset+0][offset+0] = 1;
		this.oldStatus[offset+0][offset+1] = 1;
		this.oldStatus[offset+0][offset+2] = 1;
		this.oldStatus[offset+1][offset+2] = 1;
		this.oldStatus[offset+2][offset+0] = 1;
		this.oldStatus[offset+2][offset+1] = 1;
		this.oldStatus[offset+2][offset+2] = 1;
		
	}

	initCircle1() {
		this.oldStatus[11][10] = 1;
		this.oldStatus[12][10] = 1;
		this.oldStatus[10][11] = 1;
		this.oldStatus[10][12] = 1;
		this.oldStatus[11][13] = 1;
		this.oldStatus[12][11] = 1;
		this.oldStatus[12][12] = 1;
	}

	initStairway() {
		this.oldStatus[12][10] = 1;
		this.oldStatus[13][10] = 1;
		this.oldStatus[11][11] = 1;
		this.oldStatus[12][11] = 1;
		this.oldStatus[10][12] = 1;
		this.oldStatus[11][12] = 1;	
	}

	initMarcheur() {
		this.oldStatus[10][2] = 1;
		this.oldStatus[12][2] = 1;
		this.oldStatus[11][3] = 1;
		this.oldStatus[12][3] = 1;
		this.oldStatus[11][4] = 1;
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