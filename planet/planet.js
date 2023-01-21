stars = [];

function setup(){
  createCanvas(500, 500);
  noStroke();

  stars.push(new Star(color(255, 150, 0), width/2, height/2, 0, 0, 30, 200, false));
  stars.push(new Star(color(0, 0, 255), 400, 250, 0, -3.5, 20, 10, false));
}

function draw(){
    //background(0);
    fill(0, 50);
    rect(0, 0, width, height);
    
    for(i = 0; i < stars.length; i ++){
        stars[i].display();
      
        for(j = 0; j < stars.length; j ++){
            if(i != j && i != 0){
                gravitation(i, j);
            }
        }

        if(stars[i].s == false){
            stars[i].move();
        }
    }
  
    for(i = 0; i < stars.length; i ++){
      if(stars[i].s == true){
          strokeWeight(1);
          stroke(255, 0, 0);
          line(px, py, px-1.5*(mouseX-px), py-1.5*(mouseY-py));
          noStroke();
      }
    }
  
  // console.log(stars);
}

function mousePressed(){ 
    stars.push(new Star(color(0, 0, 255), mouseX, mouseY, 0, 0, 20, 10, true));
  
    px = mouseX;
    py = mouseY;
}

function mouseReleased(){
    stars[stars.length-1].s = false;
  
    stars[stars.length-1].vx = -0.05*(mouseX - px); 
    stars[stars.length-1].vy = -0.05*(mouseY - py);
}

function gravitation(i, j){
    let G = 10;
    let dx = stars[j].x - stars[i].x;
    let dy = stars[j].y - stars[i].y;
    let r = sqrt(dx*dx + dy*dy);
    let a = G*stars[j].m/(r*r);
    let angle = atan2(dy, dx);

    stars[i].vx += a*cos(angle);
    stars[i].vy += a*sin(angle);
}

class Star{
    constructor(_c, _x, _y, _vx, _vy, _d, _m, _s){
      this.c = _c;
      this.x = _x;
      this.y = _y;
      this.vx = _vx;
      this.vy = _vy;
      this.d = _d;
      this.m = _m;
      this.s = _s;
    }
    
    display(){
        fill(this.c);
        ellipse(this.x, this.y, this.d, this.d);
    }
    
    move(){    
        this.x += this.vx;
        this.y += this.vy;
    }
}