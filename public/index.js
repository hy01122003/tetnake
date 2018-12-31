// -------------------------- CANVAS ------------------------- //

var canvas = document.getElementById('game');

if (canvas !== undefined) {
	function transpose(a) {
		return Object.keys(a[0]).map(function(c) {
			return a.map(function(r) { return r[c]; });
		});
	}
	
	class Square {
		constructor(x, y) {
			this.coord = {
				x: x, 
				y: y
			}
			this.time = 0;
		}
		draw() {
			var ctx = canvas.getContext("2d");
			ctx.fillRect(
				this.coord.x * 20,
				this.coord.y * 20, 
				20, 
				20)
		}
		drop() {
			this.coord.y += 1;
		}
	}
	
	class Snake {
		constructor() {
			this.body = [
				new Square(3, 0),
				new Square(2, 0),
				new Square(1, 0),
				new Square(0, 0)
			];
	
			this.stateList = [
				{
					x: 1,
					y: 0
				},
				{
					x: -1,
					y: 0
				},
				{
					x: 0,
					y: 1
				},
				{
					x: 0,
					y: -1
				}
			];
			this.RIGHT = 0;
			this.LEFT = 1;
			this.DOWN = 2;
			this.UP = 3;
	
			this.state = this.RIGHT;
	
			document.addEventListener('keydown', (e) => {
				if(e.keyCode == 37 && this.state != this.RIGHT) {
					this.state = this.LEFT;
				} else if (e.keyCode == 39 && this.state != this.LEFT) {
					this.state = this.RIGHT;
				} else if (e.keyCode == 38 && this.state != this.DOWN) {
					this.state = this.UP;
				} else if (e.keyCode == 40 && this.state != this.UP) {
					this.state = this.DOWN;
				}
			});
	
			this.food = new Square(
						Math.floor(Math.random() * 25),
						Math.floor(Math.random() * 10));
			this.score = 0;
		}
		border() {
			if (this.body[0].coord.x >= 25 
			|| this.body[0].coord.x < 0
			|| this.body[0].coord.y >= 10
			|| this.body[0].coord.y < 0) return true;
			return false;
		}
		play() {
			if (this.eat()) {
				this.score += 5;
				return false;
			}
			for (let i = this.body.length - 1; i > 0; i--) {
				this.body[i].coord = {
					x: this.body[i - 1].coord.x,
					y: this.body[i - 1].coord.y
				};
			}
			this.body[0].coord = {
				x: this.body[0].coord.x + this.stateList[this.state].x,
				y: this.body[0].coord.y + this.stateList[this.state].y
			};
			
			if (this.border()) {
				// document.getElementById('game').classList.add('danger');
				return false;
			}
	
			return true;
		}
		eat() {
			if (this.body[0].coord.x == this.food.coord.x
				&& this.body[0].coord.y == this.food.coord.y) return true;
			return false;
		}
		draw() {
			var ctx = canvas.getContext('2d');
			for (let i of this.body) {
				ctx.fillStyle = '#11f009b6';
				ctx.fillRect(i.coord.x * 20, i.coord.y * 20, 20, 20);
			}
			ctx.fillStyle = 'red';
			ctx.fillRect(this.food.coord.x * 20,
						this.food.coord.y * 20,
						20, 
						20);
		}
	}
	
	class Tetris {
		constructor(part) {
			this.body = part;
		}
		drop(floor) {
			for (let i of this.body) {
				i.drop();
			}		
		}
		draw() {
			var ctx = canvas.getContext('2d');
			for (let i of this.body) {
				ctx.fillStyle = '#11f009b6';
				ctx.fillRect(i.coord.x * 20, i.coord.y * 20, 20, 20);
			}
		}
	}
	
	class Game {
		constructor() {
			this.snake = new Snake();
			this.dropping = [];
			this.score = 0;
			this.map = [
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
			];
		}
		newGame() {
			this.snake = new Snake();
			this.dropping = [];
			this.map = [
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
			];
			clearInterval(this.loop);	
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, 500, 600);
			this.play();
		}
		play() {
			this.loop = setInterval(() => {			
				var ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, 500, 600);
				this.snake.play();
				this.snake.draw();
				for (let i of this.dropping) {
					i.drop();
					i.draw();
					for (let j of i.body) {
						if (this.map[j.coord.x][j.coord.y - 14]) {
							for (let k of i.body) {
								this.map[k.coord.x][k.coord.y - 15] = 1;
							}
							this.dropping.splice(this.dropping.indexOf(i), 1);
							break;
						}
					}
				}
				if (this.snake.eat()) {
					this.dropping.push(new Tetris(this.snake.body))
					this.snake = new Snake();
				}
				this.draw();
			}, 200);
		}
		draw() {
			var ctx = canvas.getContext('2d');	
			ctx.fillStyle = '#11f009b6';
			for (let i = 0; i < 25; i++)
				for (let j = 0; j < 15; j++) {
					if (this.map[i][j] == 1) {		
						ctx.fillRect(i * 20, j * 20 + 300, 20, 20);			
					}
				}
		}
	}
	
	var game = new Game();
	game.play();
}