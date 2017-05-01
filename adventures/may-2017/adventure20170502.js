class Face {
	constructor(bounds, ctx, x, y) {
		this._x = x;
		this._y = y;
		this.bounds = bounds;
		this.vx = (Math.random() * 5);
		this.vy = (Math.random() * 5);
		this.ctx = ctx;
		this.img = new Image();
		this.img.addEventListener('load', () => {
			this.draw(x, y);
		});
		this.img.src = '/playground/images/face.png';
	}

	draw () {
		this._x += this.vx;
		this._y += this.vy;
		this.ctx.drawImage(this.img, this._x, this._y);
		this.checkBounds();
	}

	checkBounds() {
		if((this._y + this.img.height) >= this.bounds.y || this._y <= 0) {
			this.vy = -this.vy;
		}

		if((this._x + this.img.width) >= this.bounds.x || this._x <= 0) {
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