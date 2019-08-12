//screen
var screenWidth = 1280;
var screenHeight = 720;

//Man's variables
var manSize = 10;
var x = screenWidth/15;
var y = screenHeight/2;

//speed variables
var velocity = 0;
var gravity = 0.5;
var jumpVel = 10;

//obsticle variables
var holeSize = 100;
var pipeWidth = 10;
var pipeSpeed = 15;
var pX = screenWidth;
var hY = screenHeight/2 - (holeSize/2);

var score = 0;


function draw(){
  createCanvas(screenWidth, screenHeight);
  background(0);

  //adds gravity
  if(y < screenHeight-manSize/1.75){
    velocity = velocity + gravity;
  }

  //sets man's y to the correct velocity
  y = y + velocity;
  if(y > screenHeight-manSize/1.75){y=screenHeight-manSize/1.75;}
  if(y < 0+manSize/1.75){y=0+manSize/1.75;}

  //makes pipe move along screen
  if(pX > -pipeWidth){
    pX = pX - pipeSpeed;
  }else{
    pX = screenWidth;
    hY = random(screenHeight/15,screenHeight-holeSize);
    score++;
  }

  drawPipe(pX,hY);
  drawMan(x,y);

  //displays score
  fill(0,200,0);
  textSize(50);
  text("Score: " + score, 10,50);

  //hit detection
  if(x+(manSize/2) > pX && x-(manSize/2) < pX+pipeWidth){
    if(y > 0 && y < hY){
      fill(255,0,0);
      textSize(200);
      text("GAME OVER",25,screenHeight/1.8);
      noLoop();
      setTimeout(function(){location.reload();},2000);
  }else if(y+manSize/1.75 > hY+holeSize && y-manSize/1.75 < screenHeight){
    fill(255,0,0);
    textSize(200);
    text("GAME OVER",25,screenHeight/1.8);
    noLoop();
    setTimeout(function(){location.reload();},2000);
  }}

}

drawMan = function(manX,manY){
  fill(255);
  rect(manX, manY, manSize, manSize);
}

drawPipe = function(pipeX, holeY){
  this.holeY = holeY;
  this.pipeX = pipeX;

  fill(255);
  rect(this.pipeX,0,pipeWidth,screenHeight);
  fill(0);
  rect(this.pipeX,this.holeY,pipeWidth,holeSize);
}


function keyPressed() {
//  if (keyCode == UP_ARROW) {
    velocity=-jumpVel;
//  }
}
