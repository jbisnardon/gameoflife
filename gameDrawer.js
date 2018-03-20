class gameDrawer {

	constructor(game, idElement) {
		var c = document.getElementById(idElement);
		this.ctx = c.getContext("2d");
		this.game = game;
	}

	fillCell(startx, starty) {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(startx*this.game.CELL_WIDTH + 2, starty*this.game.CELL_WIDTH + 2, this.game.CELL_WIDTH - 3, this.game.CELL_WIDTH - 3);
	}

	emptyCell(startx, starty) {
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(startx*this.game.CELL_WIDTH + 2, starty*this.game.CELL_WIDTH + 2, this.game.CELL_WIDTH - 3, this.game.CELL_WIDTH - 3);
	}
	
	newCell(startx, starty) {
		this.ctx.fillStyle = "green";
		this.ctx.fillRect(startx*this.game.CELL_WIDTH + 2, starty*this.game.CELL_WIDTH + 2, this.game.CELL_WIDTH - 3, this.game.CELL_WIDTH - 3);
	}

	dyingCell(startx, starty) {
		this.ctx.fillStyle = "red";
		this.ctx.fillRect(startx*this.game.CELL_WIDTH + 2, starty*this.game.CELL_WIDTH + 2, this.game.CELL_WIDTH - 3, this.game.CELL_WIDTH - 3);
	}

	drawFrame() {
		for(var i=0;i<=this.game.NB_CELL;i++) {
			this.ctx.beginPath();
			this.ctx.lineWidth = 1;
			this.ctx.strokeStyle='black';
			
			this.ctx.moveTo(0.5, this.game.CELL_WIDTH*i+0.5);
			this.ctx.lineTo(this.game.CANVAS_WIDTH+0.5, this.game.CELL_WIDTH*i+0.5);

			this.ctx.moveTo(this.game.CELL_WIDTH*i+0.5,0+0.5);
			this.ctx.lineTo(this.game.CELL_WIDTH*i+0.5, this.game.CANVAS_WIDTH+0.5);
			
			this.ctx.stroke();
		}
	}

	writeTour() {
		document.getElementById("tourcpt").value = this.game.currentTour;
	}
}