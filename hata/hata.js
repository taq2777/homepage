function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    for(i = 0; i < slider_n; i ++){
    	s[i].slider_x = windowWidth-220;
    	s[i].slider_y = windowHeight-(30*i+30);
    	s[i].box_y = s[i].slider_y + s[i].slider_height/2;
    }
    s[0].box_x = s[0].slider_x + map(aR, -1, 1, 0, s[0].slider_width);
    s[1].box_x = s[1].slider_x + map(aI, -1, 1, 0, s[1].slider_width);
    s[2].box_x = s[2].slider_x + map(bR, -1, 1, 0, s[2].slider_width);
    s[3].box_x = s[3].slider_x + map(bI, -1, 1, 0, s[3].slider_width);
    s[4].box_x = s[4].slider_x + map(cR, -1, 1, 0, s[4].slider_width);
    s[5].box_x = s[5].slider_x + map(cI, -1, 1, 0, s[5].slider_width);
    s[6].box_x = s[6].slider_x + map(dR, -1, 1, 0, s[6].slider_width);
    s[7].box_x = s[7].slider_x + map(dI, -1, 1, 0, s[7].slider_width);
}

let slider_n = 8;
let s = [];
let pos = [];
let aR, aI, bR, bI, cR, cI, dR, dI, zR, zI;
let scale;
let n;

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", -1);
  
  scale = 250; // スケール
  n = 14; // 繰り返し回数
  
  // 初期値
  zR = 0;
  zI = 0;
  z0 = createVector(zR, zI);
  pos.push(z0);
  
  // パラメータ
  aR = 0.65;  aI = -0.5;
  bR = 0;     bI = 0;
  cR = -0.25; cI = 0.5;
  dR = 0;     dI = 0;
  
  // スライダー
  s[0] = new Slider(aR, windowWidth-220, windowHeight-240, 200, 20);
  s[1] = new Slider(aI, windowWidth-220, windowHeight-210, 200, 20);
  s[2] = new Slider(bR, windowWidth-220, windowHeight-180, 200, 20);
  s[3] = new Slider(bI, windowWidth-220, windowHeight-150, 200, 20);
  s[4] = new Slider(cR, windowWidth-220, windowHeight-120, 200, 20);
  s[5] = new Slider(cI, windowWidth-220, windowHeight-90, 200, 20);
  s[6] = new Slider(dR, windowWidth-220, windowHeight-60, 200, 20);
  s[7] = new Slider(dI, windowWidth-220, windowHeight-30, 200, 20);
}

function draw(){
  background(255);
  
  push()
  
  translate(width/3, height*2/3);
  
  // 点を打つ座標の計算
  for(i = 0; i < n; i ++){
    next_pos = [];
    for(j = 0; j < pos.length; j ++){
      next_pos.push(createVector(aR*pos[j].x - aI*pos[j].y + bR*pos[j].x + bI*pos[j].y,
                              aR*pos[j].y + aI*pos[j].x - bR*pos[j].y + bI*pos[j].x));
      next_pos.push(createVector(cR*(pos[j].x-1) - cI*pos[j].y + dR*(pos[j].x-1) + dI*pos[j].y + 1,
                              cR*pos[j].y + cI*(pos[j].x-1) - dR*pos[j].y + dI*(pos[j].x-1)));
    }
    pos = next_pos;
  }
  
  // 点を打つ
  for(j = 0; j < pos.length; j ++){
    stroke(0);
    fill(0);
    point(scale*pos[j].x, scale*pos[j].y);
    // ellipse(scale*pos[j].x, scale*pos[j].y, 1, 1);
  }
  
  pop()
  
  // 値の表示
  //translate(-width/2, -height/2);
  fill(0);
  text("a = " + nf(aR, 1, 3) + " + " + nf(aI, 1, 3) + " i", windowWidth-350, windowHeight-230);
  text("b = " + nf(bR, 1, 3) + " + " + nf(bI, 1, 3) + " i", windowWidth-350, windowHeight-170);
  text("c = " + nf(cR, 1, 3) + " + " + nf(cI, 1, 3) + " i", windowWidth-350, windowHeight-110);
  text("d = " + nf(dR, 1, 3) + " + " + nf(dI, 1, 3) + " i", windowWidth-350, windowHeight-50);
  // text("z = " + nf(zR, 1, 3) + " + " + nf(zI, 1, 3) + " i", windowWidth-400, windowHeight-110);
  
  // スライダーの表示
  for(i = 0; i < slider_n; i ++){
    s[i].display();
  }
  
  // スライダーで変更する変数
  aR = s[0].slide(mouseX, aR, -1, 1);
  aI = s[1].slide(mouseX, aI, -1, 1);
  bR = s[2].slide(mouseX, bR, -1, 1);
  bI = s[3].slide(mouseX, bI, -1, 1);
  cR = s[4].slide(mouseX, cR, -1, 1);
  cI = s[5].slide(mouseX, cI, -1, 1);
  dR = s[6].slide(mouseX, dR, -1, 1);
  dI = s[7].slide(mouseX, dI, -1, 1);
  // zR = s[8].slide(mouseX, zR, -10, 10);
  // zI = s[9].slide(mouseX, zI, -10, 10);
  
  // 初期化
  pos = [];
  z0 = createVector(zR, zI);
  pos.push(z0);
}


class Slider{
  constructor(_i, _x, _y, _w, _h){
    this.slider_x = _x;
    this.slider_y = _y;
    this.slider_width = _w;
    this.slider_height = _h;
    
    this.box_x = this.slider_x + map(_i, -1, 1, 0, this.slider_width);
    this.box_y = this.slider_y + this.slider_height/2;
    this.box_width = this.slider_height * 0.9;
    this.box_height = this.box_width;
  }
  
  display(){
    stroke(0);
    line(this.slider_x, this.slider_y + this.slider_height/2, this.slider_x + this.slider_width, this.slider_y + this.slider_height/2);
    rectMode(CENTER);
    fill(0);
    rect(this.box_x, this.box_y, this.box_width, this.box_height);
  }
  
  slide(x1, x2, s2, e2){
    if(this.slider_x <= mouseX && mouseX <= this.slider_x+this.slider_width && this.slider_y <= mouseY && mouseY <= this.slider_y+this.slider_height){
      if(mouseIsPressed == true){
        x1 = mouseX;
        x2 = map(x1, this.slider_x, this.slider_x+this.slider_width, s2, e2);
        this.box_x = x1;
      }
    }
    
    return x2;
  }
}

