let n;
let theta;
let length;
let scale_l, scale_t;

function setup(){
    createCanvas(400, 400);
    background(255);
    stroke(0);
    noLoop();

    n = 11;
    theta = 30;
    length = 100;
    scale_l = 0.7;
    scale_t = 0.25;
    theta = radians(theta);
}

function draw(){
    background(255);
    translate(width/2, height);
    branch(length, n);
}

function branch(length, n){
    strokeWeight(n*scale_t);
    line(0, 0, 0, -length);
    translate(0, -length);
    length = length*scale_l;

    if(n > 0){
        push();
        rotate(random(0, theta));
        branch(random(20, length), n-1);
        pop();

        push();
        rotate(-random(0, theta));
        branch(random(20, length), n-1);
        pop();
    }
}

function mousePressed(){
    redraw();
}