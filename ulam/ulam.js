function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    
    turnedNumber = 1;
	difference = 1;
	turnCounter = 0;
    x = width/2;
    y = height/2;
    
	redraw();
}

let x, y;
let len;

let turnedNumber = 1;
let difference = 1;
let turnCounter = 0;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
  	canvas.position(0, 0);
  	canvas.style("z-index", -1);
    
    x = width/2;
    y = height/2;
    len = 2;
}

function draw(){
	background(255);

    for(number = 1; number < width*height; number ++){
        
        if(isPrime(number) == true){
            
            fill(0);
            rectMode(CENTER);
            rect(x, y, len/2, len/2);
            
          
            /*
            loadPixels();
            int pos = int(x + y * width);
            pixels[pos] = color(0);
            updatePixels();
            */
        }
      
      
        if(number == turnedNumber+difference){
            turnedNumber = number;
            turnCounter ++;
            if(turnCounter % 2 == 0){
                difference += 1;
            }
        }
        
        switch(turnCounter % 4){
            case 0:
                x += len;
            break;
            case 1:
                y -= len;
            break;
            case 2:    
                x -= len;
            break;
            case 3:
                y += len;
            break;
          
        }
    }
    
    noLoop();
}

function isPrime(num){
    if(num == 1){return false;}
  
    for(i = 2; i <= sqrt(num); i ++){
        if(num % i == 0){
            return false;
        }
    }
  
    return true;
}
