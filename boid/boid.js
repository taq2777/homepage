function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

boids = [];

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", -1);
    
  for(i = 0; i < 100; i ++){
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw(){
  background(255);
    
  for(let b of boids){
    b.display();
    b.move();
    b.loop();
    
    b.separation();
    b.alignment();
    b.cohesion();
    b.avoid();
  }
}

function mousePressed(){
  boids.push(new Boid(mouseX, mouseY));
}

class Boid{
  constructor(_x, _y){
    this.pos = createVector();
    this.pos.x = _x;
    this.pos.y = _y;

    this.vel = p5.Vector.random2D();
    this.v_max = 2;

    this.acc = createVector();

    this.f_max = 0.05;

    this.dia = 10;
    this.r = this.dia/2;
    this.col = color(255);
  }
    
  display(){
    //ellipse(pos.x, pos.y, dia, dia);

    fill(this.col);
    push();
      translate(this.pos.x, this.pos.y);
      let theta = this.vel.heading();
      rotate(theta);

      beginShape();
        vertex(2*this.r, 0);
        vertex(-this.r, -this.r);
        vertex(-this.r, this.r);
      endShape(CLOSE);
    pop();
  }
    
  move(){
    this.vel.add(this.acc);
    this.vel.limit(this.v_max);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  separation(){
    let sum = createVector();
    let number = 0;
    for(let other of boids){
      let d = p5.Vector.dist(this.pos, other.pos);
      if(0 < d && d < this.dia*3){
        let away = p5.Vector.sub(this.pos, other.pos);
          away.normalize();
          away.div(d);
          sum.add(away);
          number ++;
      }
    }
    if(number > 0){
      sum.setMag(this.v_max);
      let steer = p5.Vector.sub(sum, this.vel);
      steer.limit(this.f_max);
      this.acc.add(steer);
    }
  }
  
  alignment(){
    let sum = createVector();
    let number = 0;
    for(let other of boids){
      let d = p5.Vector.dist(this.pos, other.pos);
      if(0 < d && d < this.dia*5){
        sum.add(other.vel);
        number ++;
      }
    }
    if(number > 0){
      sum.setMag(this.v_max);
      let steer = p5.Vector.sub(sum, this.vel);
      steer.limit(this.f_max);
      this.acc.add(steer);
    }
  }
    
  cohesion(){
    let sum = createVector();
    let number = 0;
    for(let other of boids){
      let d = p5.Vector.dist(this.pos, other.pos);
      if(0 < d && d < this.dia*5){
        let close = p5.Vector.sub(other.pos, this.pos);
        sum.add(close);
        number ++;
      }
    }
    if(number > 0){
      sum.setMag(this.v_max);
      let steer = p5.Vector.sub(sum, this.vel);
      steer.limit(this.f_max);
      this.acc.add(steer);
    }
  }

  avoid(){
    let mouse = createVector(mouseX, mouseY);
    noFill();
    ellipse(mouseX, mouseY, 25, 25);
    fill(255);

    if(p5.Vector.dist(this.pos, mouse) < this.dia*10){
      let steer = p5.Vector.sub(this.pos, mouse);
      steer.limit(this.f_max);
      this.acc.add(steer);
    }
  }
    
  loop(){
    if(this.pos.x < -this.dia/2){
      this.pos.x = width+this.dia/2;
    }
    if(this.pos.x > width+this.dia/2){
      this.pos.x = -this.dia/2;
    }
    if(this.pos.y < -this.dia/2){
      this.pos.y = height+this.dia/2;
    }
    if(this.pos.y > height+this.dia/2){
      this.pos.y = -this.dia/2;
    }
  }
}

