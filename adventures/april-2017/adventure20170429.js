var canvas, ctx; 
var numPixels = 3000; 
var pixels = []; 

function init() {
	canvas = document.querySelector('canvas');
	ctx = canvas.getContext('2d');

	for (var i = 0; i < numPixels; i++) {
		var bounds = { x: canvas.width, y: canvas.height };

		pixels.push(new Pixel(bounds, ctx, Math.random() * canvas.width, Math.random() * canvas.height, "#FF00FF"));
	}	

	requestAnimationFrame(run);
}

function run() {
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgba(8,8,12,.65)";
	ctx.fillRect(0 , 0 , canvas.width , canvas.height);
	ctx.globalCompositeOperation = "lighter";	

	pixels.forEach(function (pixel) {
		pixel.move();
	});

	requestAnimationFrame(run);
}

class Pixel {
	constructor(bounds, ctx, x, y, col) {
		this.vx = (Math.random() * 5);
		this.vy = 10 + (Math.random() * 20);	
		this.x = x;
		this.y = y;
		this.color = col;
		this.bounds = bounds;
		this.ctx = ctx;
	}

	draw () {
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.fillRect(this.x, this.y, 2, 2);
	}

	move () {
		this.x += this.vx;
		this.y += this.vy;

		if(this.y > this.bounds.y) {
			this.y = -Math.random() * 20;
			this.x = Math.random() * this.bounds.x;
		}
		else if(this.x > this.bounds.x) {
			this.x = Math.random() * this.bounds.x;
		}	

		this.draw()
	}
}

init();