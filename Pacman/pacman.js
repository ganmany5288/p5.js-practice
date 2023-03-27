let pacMan;
let pebbles = [];
let pebbles2 = [];
let x = 50;
let y = 50;
let x2 = 50;
let y2 = 140;

function createPebble(){
	for (let i = 0; i < 15; i++){
		pebbles.push(new Pebble(x, y))
		x += 50;
	}
}

function createPebble2(){
	for (let i = 0; i < 15; i++){
		pebbles2.push(new Pebble(x2, y2))
		x2 += 50;
	}
}

function setup() {
  createCanvas(800, 240);
  background(100);
  pacMan = new PacMan(800, 60, 70, 5);
	pacMan2 = new PacMan2(0, 150, 70, 5);
	// Possible Slow down?
	createPebble();
	createPebble2();
}

function draw() {
  background(209, 203, 198);
	
  pacMan.move();
  pacMan.display();
	pacMan2.move();
	pacMan2.display();
	
	for (let i = pebbles.length - 1; i >= 0; i--){
		if (pacMan.eat(pebbles[i])){
			// console.log("Who are you?");
			pebbles.splice(i, 1);
		}else{
			pebbles[i].display();
		}
		if (pacMan2.eat(pebbles2[i])){

			// console.log("I am here");
			pebbles2.splice(i, 1);
			// Weird glitchy effect with the pebbles here (this one in particular)
		}else{
			pebbles2[i].display();
		}
	}
}

class PacMan {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.mouthAngle = 0.2;
    this.mouthDirection = 1;
  }

  move() {
    this.x -= this.speed;
    if (this.x < -this.size) {
      this.x = width;
			x = 50;
			createPebble();
    }
  }

  display() {
    this.mouthAngle += 0.1 * this.mouthDirection;
    if (this.mouthAngle < 0.2 || this.mouthAngle > 1.0) {
      this.mouthDirection = -this.mouthDirection;
    }
    fill(255, 255, 0);
    arc(this.x, this.y, this.size, this.size, PI+this.mouthAngle, PI-this.mouthAngle);
  }
	eat(peb){
		let d = dist(this.x, this.y, peb.x, peb.y);
		if (d < peb.size/4 + this.size/4){
			return true;
		}else{
			return false;
		}
	}
}

class PacMan2 {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.mouthAngle = 0.2;
    this.mouthDirection = 1;
  }

  move() {
    this.x += this.speed;
    if (this.x > width+this.size) {
      this.x = 0;
			x2 = 50;
			createPebble2();
    }
  }

  display() {
    this.mouthAngle += 0.1 * this.mouthDirection;
    if (this.mouthAngle < 0.2 || this.mouthAngle > 1.0) {
      this.mouthDirection = -this.mouthDirection;
    }
    fill(255, 255, 0);
    arc(this.x, this.y, this.size, this.size, TWO_PI+this.mouthAngle, TWO_PI-this.mouthAngle);
  }
	eat(peb){
		let d = dist(this.x, this.y, peb.x, peb.y);
		if (d < peb.size/4 + this.size/4){
			return true;
		}else{
			return false;
		}
	}
}

class Pebble {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.size = 20;
		this.curve = 5;
		this.speed = 5;
	}
	
	display() {
		fill(255, 255, 255);
		square(this.x, this.y, this.size, this.curve);
	}
}