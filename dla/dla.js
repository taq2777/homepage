n = 100;
particles = [];
f = -1;

function setup(){
  createCanvas(500, 500);
  frameRate(10000);
  noStroke();
  
  particles.push(new Particle(0, 0, false));
  for(i = 1; i < n; i ++){
    particles.push(new Particle(random(-width/2, width/2), random(-height/2, height/2), true));
  }
}

function draw(){
  background(0);
  translate(width/2, height/2);
  
  //分子を増やす
  for(i = 0; i < 5; i ++){ //5個増やす
    r = random(0, 4);
    newx = 0;
    newy = 0;
    //どの向きから増やすかを決める
    if(r < 1){ newx = random(-width/2, width/2); newy = -height/2; }
    else if(1 <= r && r < 2){ newx = random(-width/2, width/2); newy = height/2; }
    else if(2 <= r && r < 3){ newx = -width/2; newy = random(-height/2, height/2); }
    else if(3 <= r && r < 4){ newx = width/2; newy = random(-height/2, height/2); }

    particles.push(new Particle(newx, newy, true));
  }
  
  for(i = 0; i < particles.length; i ++){
    particles[i].move();
    particles[i].display();
    for(j = 0; j < particles.length; j ++){
      if(i != j){
        check(i, j);
      }
    }
  }
  
  //画面外に出た分子は消す
  for(i = 0; i < particles.length; i ++){
    if((particles[i].x < -width/2 || width/2 < particles[i].x) || (particles[i].y < -height/2 || height/2 < particles[i].y)){
      particles.splice(i, 1);
    }
  } 
}

function check(i, j){
  if(particles[i].moving == false && particles[j].moving == true){
    let distx = particles[j].x - particles[i].x;
    let disty = particles[j].y - particles[i].y;
    let dist = sqrt(distx*distx + disty*disty);
    if(0 < dist && dist < particles[i].d/2 + particles[j].d/2){
      particles[j].moving = false;
    }
  }
}

class Particle{
  constructor(_x, _y, _m){  
    this.x = _x;
    this.y = _y;
    this.moving = _m;
    
    this.d = 10;
    this.v = 5;
  }
  
  move(){
    if(this.moving == true){
      this.x += random(-this.v, this.v);
      this.y += random(-this.v, this.v);
    }
    else{
      this.v = 0;
    }
  }
  
  display(){
  	if(f == 1){
    	if(this.moving == true){ fill(255); }
    	else{ fill(255, 0, 0); }
    	ellipse(this.x, this.y, this.d, this.d);
    }
    else if(f == -1){
	    if(this.moving == false){
	    	fill(255, 0, 0);
	    	ellipse(this.x, this.y, this.d, this.d);
	    }
	}
  }
}