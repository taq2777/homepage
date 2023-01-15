n = 1;
pos = [];
R = [];
G = [];
B = [];

function setup(){
  createCanvas(400, 400);
  
  // 母点の位置と領域の色
  for(i = 0; i < n; i ++){
    pos.push(createVector(int(random(width)), int(random(height))));
    R.push(int(random(256)));
    G.push(int(random(256)));
    B.push(int(random(256)));
  }
}

function draw(){
  // 描画範囲内の点全てについて
  for(x = 0; x < width; x ++){
    for(y = 0; y < height; y ++){
      
      // 一番近い母点を探す
      dmin = sqrt(width*width + height*height);
      j = 0;
      for(i = 0; i < pos.length; i ++){
        d = sqrt((pos[i].x-x)*(pos[i].x-x) + (pos[i].y-y)*(pos[i].y-y));
        if(d < dmin){
          dmin = d;
          j = i;
        }
      }
      
      // setupで指定した色に従って塗り分ける
      r = R[j];
      g = G[j];
      b = B[j];
      set(x, y, color(r, g, b));
    }
  }
  updatePixels();
  
  // 母点の位置の描画
  for(i = 0; i < pos.length; i ++){
    fill(0);
    dia = 2;
    ellipse(pos[i].x, pos[i].y, dia, dia);
  }
}

function mousePressed(){
  pos.push(createVector(mouseX, mouseY));
  R.push(int(random(256)));
  G.push(int(random(256)));
  B.push(int(random(256)));
}