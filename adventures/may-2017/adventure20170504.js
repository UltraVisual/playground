class Face {
	constructor(bounds, ctx, x, y) {
		var img;

		this.scaleIncrement = -0.01;
		this._x = x;
		this._y = y;
		this._rotation = 0;
		this.scale = 1;
		this.bounds = bounds;
		this.vx = (Math.random() * 5);
		this.vy = (Math.random() * 5);
		this.ctx = ctx;

		this.img = new Image();
		this.img.addEventListener('load', () => {
			this._width = this.img.width;
			this._height = this.img.height;
			this.draw();
		});
		this.img.src = '/playground/images/face.png';
	}

	draw () {
		this.scale += this.scaleIncrement;

		if (this.scale <= 0) {
			this.scaleIncrement = 0.01;
		} else if (this.scale >= 1) {
			this.scaleIncrement = -0.01;
		}

		this._x += this.vx;
		this._y += this.vy;
		this.ctx.drawImage(
			this.img, 
			this._x, 
			this._y, 
			this._width * this.scale, 
			this._height * this.scale
		);

		this.checkBounds();
	}

	checkBounds() {
		if(this._y >= this.bounds.y || this._y <= 0) {
			this.vy = -this.vy;
		}

		if(this._x >= this.bounds.x || this._x <= 0) {
			this.vx = -this.vx;
		}
	}
}
var canvas = document.querySelector('canvas');
var face = new Face({ x: canvas.width, y: canvas.height }, canvas.getContext('2d'), 10, 10);

var run = function () {
	face.draw();
	requestAnimationFrame(run);
}

requestAnimationFrame(run);