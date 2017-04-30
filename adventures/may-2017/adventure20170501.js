var canvas, ctx, audioPlayer; 
var numPixels = 3000; 
var pixels = []; 

function init() {
	canvas = document.querySelector('canvas');
	ctx = canvas.getContext('2d');

	for (var i = 0; i < numPixels; i++) {
		var bounds = { x: canvas.width, y: canvas.height };

		pixels.push(new Pixel(bounds, ctx, Math.random() * canvas.width, Math.random() * canvas.height, "#FF00FF"));
	}

	audioPlayer = new AudioPlayer();

	requestAnimationFrame(run);
}

function run() {
	var streamData;

	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgba(8,8,12,.65)";
	ctx.fillRect(0 , 0 , canvas.width , canvas.height);
	ctx.globalCompositeOperation = "lighter";

	audioPlayer.analyse();	

	pixels.forEach(pixel => {
		if(pixel.move()) {
			let color = toColor(-audioPlayer.volume);

			pixel.color = color;
		}
	});

	requestAnimationFrame(run);
}

class Pixel {
	constructor(bounds, ctx, x, y, col) {
		this.vx = (Math.random() * 5);
		this.vy = 10 + (Math.random() * 20);	
		this.x = x;
		this.y = y;
		this._color = col;
		this.bounds = bounds;
		this.ctx = ctx;
	}

	set color(clr) {
		this._color = clr;
	}

	draw () {
		this.ctx.fillStyle = this._color;
		this.ctx.beginPath();
		this.ctx.fillRect(this.x, this.y, 2, 2);
	}

	move () {
		var hasRespawned = false;

		this.x += this.vx;
		this.y += this.vy;

		if(this.y > this.bounds.y) {
			this.y = -Math.random() * 20;
			this.x = Math.random() * this.bounds.x;
			hasRespawned = true;
		} else if(this.x > this.bounds.x) {
			this.x = Math.random() * this.bounds.x;
		}	

		this.draw();

		return hasRespawned;
	}
}

class AudioPlayer {
	constructor() {
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		this.audio = document.querySelector('#audio-file');
		this.analyser = this.audioCtx.createAnalyser();
		this.audioSrc = this.audioCtx.createMediaElementSource(this.audio);
		this.audioSrc.connect(this.analyser);
		this.analyser.connect(this.audioCtx.destination);
		this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
		this._volume = 1;

		this.audio.play();
	}

	analyse() {
		var total = 0;

		this.analyser.getByteFrequencyData(this.frequencyData);

		for (var i = 0; i < 80; i++) {
			total += this.frequencyData[i];
		}

		this._volume = total;
	}

	get volume() {
		return this._volume
	}
}

var toColor = function(num) {
	var b, g, r, a, color;

	num >>>= 0;
	b = num & 0xFF;
	g = (num & 0xFF00) >>> 8;
	r = (num & 0xFF0000) >>> 16;
	a = 1;

	return `rgba(${ [r, g, b, a].join(",") })`;
}

init();