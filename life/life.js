let len;
let col, row;
let c = [];
let p = false;

function setup(){
    createCanvas(500, 500);
    
    len = 10;
    col = width/len;
    row = height/len;
    
    for(i = 0; i < col; i ++){
      c[i] = [];
    for(j = 0; j < row; j ++){
        // c[i][j] = 0;
        c[i][j] = floor(random(2));
    }
    }
}

function draw(){
    background(255);
    
    for(i = 0; i < col; i ++){
    for(j = 0; j < row; j ++){
        stroke(230);
        fill((1-c[i][j])*255);
        rect(i*len, j*len, len, len);
        //ellipse(len/2+i*len, len/2+j*len, len, len);
    }
    }
    
    
    
    //preview
    if(p == true){
      prec = [];    
      for(i = 0; i < col; i ++){
        prec[i] = [];
      for(j = 0; j < row; j ++){
        if(i*len <= mouseX && mouseX < (i+1)*len &&
           j*len <= mouseY && mouseY < (j+1)*len){
              prec[(i+col)%col][(j+row)%row] = 1;
        }
        if(prec[i][j] == 1){
          noStroke();
          fill(255, 0, 0);
          //rect(i*len, j*len, len, len);
          ellipse(len/2+i*len, len/2+j*len, len, len);
        }
      }
      }
      
        frameRate(60);
        
        for(i = 0; i < col; i ++){
        for(j = 0; j < row; j ++){
            
            if(i*len <= mouseX && mouseX < (i+1)*len &&
               j*len <= mouseY && mouseY < (j+1)*len){
                 
                 if(mouseIsPressed == true){
                    if(mouseButton == LEFT){
                        c[i][j] = 1;
                    }
                    if(mouseButton == RIGHT){
                        c[i][j] = 0;
                    }
                }
            }
        }
        }
    }
          
    if(p == false){
        frameRate(10);
        
        next = [];
        for(i = 0; i < col; i ++){
          next[i] = [];
        for(j = 0; j < row; j ++){
          next[i][j] = 0;
        }
        }
          
        for(i = 0; i < col; i ++){
        for(j = 0; j < row; j ++){

            let neighbors = 0;
            for(k = -1; k <= 1; k ++){
                for(l = -1; l <= 1; l ++){
                    neighbors += c[(i+k+col)%col][(j+l+row)%row];
                }
            }
            neighbors -= c[i][j];
              
            if(c[i][j] == 0){
                if(neighbors == 3){ //born
                    next[i][j] = 1;
                }
            }
            else if(c[i][j] == 1){
                if(neighbors == 2 || neighbors == 3){ //live
                    next[i][j] = 1;
                }
            }
        }
        }
        // for(i = 0; i < col; i ++){
        // for(j = 0; j < row; j ++){
        //   c[i][j] = next[i][j];
        // }
        // }
      c = next;
    }
}

function keyPressed(){
    if(key == 's') p = true;
    
    if(key == 'c'){
        for(i = 0; i < col; i ++){
        for(j = 0; j < row; j ++){
            c[i][j] = 0;
        }
        }
    }
}

function keyReleased(){
    if(key == 's') p = false;
}
