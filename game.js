var CELL_WIDTH = 10;
var NB_CELL = 60;
var CANVAS_WIDTH = 600;
var NB_TOUR = 10;

class myGame {

	constructor(confValue) {
		var c = document.getElementById("mon_canvas");
		this.ctx = c.getContext("2d");
		this.started = false;
		this.currentTour = 0;
		this.writeTour();
		this.drawFrame();
		this.initStatus(confValue);	
	}

	writeTour() {
		document.getElementById("tourcpt").value = this.currentTour;
	}

	drawFrame() {
		for(var i=0;i<=NB_CELL;i++) {
			this.ctx.beginPath();
			this.ctx.lineWidth = 1;
			this.ctx.strokeStyle='black';
			
			this.ctx.moveTo(0.5, CELL_WIDTH*i+0.5);
			this.ctx.lineTo(CANVAS_WIDTH+0.5, CELL_WIDTH*i+0.5);

			this.ctx.moveTo(CELL_WIDTH*i+0.5,0+0.5);
			this.ctx.lineTo(CELL_WIDTH*i+0.5, CANVAS_WIDTH+0.5);
			
			this.ctx.stroke();
		}
	}

	initNewStatus() {
		this.newStatus = [];
		for(var i=0;i<NB_CELL;i++) {
			this.newStatus[i] = [];
			for(var j=0;j<NB_CELL;j++) {
				this.newStatus[i][j] = 0;
			}
		}
	}

	initOldStatus() {
		this.oldStatus = [];
		for(var i=0;i<NB_CELL;i++) {
			this.oldStatus[i] = [];
			for(var j=0;j<NB_CELL;j++) {
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
		var stopScan = NB_CELL;

		for(var i=startScan; i<stopScan;i++) {

			for(var j=startScan; j<stopScan;j++) {

				if(this.cellIsAlive(i, j)) {
					this.fillCell(i, j);
				} else {
					this.emptyCell(i, j);
				}
			}
		}
	}

	fillCell(startx, starty) {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(startx*CELL_WIDTH + 2, starty*CELL_WIDTH + 2, CELL_WIDTH - 3, CELL_WIDTH - 3);
	}

	emptyCell(startx, starty) {
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(startx*CELL_WIDTH + 2, starty*CELL_WIDTH + 2, CELL_WIDTH - 3, CELL_WIDTH - 3);
	}
	
	newCell(startx, starty) {
		this.ctx.fillStyle = "green";
		this.ctx.fillRect(startx*CELL_WIDTH + 2, starty*CELL_WIDTH + 2, CELL_WIDTH - 3, CELL_WIDTH - 3);
	}

	dyingCell(startx, starty) {
		this.ctx.fillStyle = "red";
		this.ctx.fillRect(startx*CELL_WIDTH + 2, starty*CELL_WIDTH + 2, CELL_WIDTH - 3, CELL_WIDTH - 3);
	}

	cellIsAlive(x, y) {
		if( (x < 0) || (y < 0) || (x >= NB_CELL) || (y >= NB_CELL) ) {
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
			this.newCell(x, y);
		}
	}

	setCellAsDead(x, y) {
		this.newStatus[x][y] = 0;
		if(this.cellIsAlive(x, y)) {
			this.dyingCell(x, y);
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

	applyEvolution(x ,y) {
		//console.log('Evolution ' + this.currentTour)
		var startScan = 0;
		var stopScan = NB_CELL;

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

	swapStatus() {
		this.oldStatus = this.newStatus.map(function(arr) {
		    return arr.slice();
		});
		this.initNewStatus();
	}

	playTour() {
		this.currentTour++;
		this.writeTour();
		this.applyEvolution();
		this.swapStatus();
		this.redrawGame();
	}
}