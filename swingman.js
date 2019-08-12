//screen
let screenWidth = 1280;
let screenHeight = 720;

//man object
let man = {
  size:10,
  x:0,
  y:screenHeight/2,
  moveRight:true,
  y_vel: 0,
  jumpVel: 10
};

//sets gravity
let gravity = 0.5;


function draw(){
  createCanvas(screenWidth, screenHeight);
  background(0);

  gravityFunc(man);
  //sets man's y to the correct man.y_vel
  setVelocity(man);

  drawMan(man);


}

function drawMan(man){
  fill(255);
  rect(man.x, man.y, man.size, man.size);
}

function gravityFunc(man){
  if(man.y < screenHeight-man.size/1.75){
    man.y_vel = man.y_vel + gravity;
    console.log(man.y_vel);
  }
}

function setVelocity(man){
  man.y = man.y + man.y_vel;
  if(man.y > screenHeight-man.size/1.75){y=screenHeight-man.size/1.75;}
  if(man.y < 0+man.size/1.75){y=0+man.size/1.75;}
}

function keyPressed() {
//  if (keyCode == UP_ARROW) {
    man.y_vel = -man.jumpVel;
//  }
}
