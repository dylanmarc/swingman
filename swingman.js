//screen
let screenWidth = 1280;
let screenHeight = 720;

//other variables
let healthSize = 10;

var gameOver = false;

const itemSize = 40;

const phatDebuff = 3;

//set man constants
let manSize = 7;
const startHealth = 100;
const jumpVel = 12;
const x_vel = 7;
const damage = 5;
//sets gravity
let gravity = 0.8;

//man object
let man = {
  id: 1,
  name: 'bloodson',
  size: manSize,
  x: 0,
  y: screenHeight/2,
  moveRight: true,
  y_vel: 0,
  x_vel: x_vel,
  jumpVel: jumpVel,
  color: [255, 0, 0],
  health: startHealth
};

let man2 = {
  id: 2,
  name: 'cripman',
  size: manSize,
  x: screenWidth,
  y: screenHeight/2,
  moveRight: false,
  y_vel: 0,
  x_vel: x_vel,
  jumpVel: jumpVel,
  color: [0, 0, 255],
  health: startHealth
};

let pipe = {
  x: screenWidth/2,
  width: 30,
  holeY: 0,
  holeSize: 70
}

let item = {
  type: 'phat',
  x: 0,
  y: 0,
  size: itemSize,
  respawnRate: 5,
  new: true,
  touched: false,
  used: false,
  usedby: ''
}

function draw(){
  createCanvas(screenWidth, screenHeight);
  background(0);

  drawPipe(pipe);

  spawnItem(item);

  setVelocity(man);
  drawMan(man);
  setVelocity(man2);
  drawMan(man2);

  hitCheck(man, pipe, item);
  hitCheck(man2, pipe, item);

  effects(man, man2, item);

  drawHealth(man, man2);
  deadCheck(man, man2);
}

function effects(man1, man2, item){
  if(item.used == false){
    if(item.type == 'phat'){
      if(item.touched = true && item.usedby == man1.id){
        man2.size = man2.size*phatDebuff;
        item.used = true;
      }
      if(item.touched = true && item.usedby == man2.id){
        man1.size = man1.size*phatDebuff;
        item.used = true;
      }
    }
  }
}

function spawnItem(item){
  fill(0,255,255);
  if(item.new == true){
    item.x = random(0,screenWidth-itemSize);
    item.y = random(0,screenHeight-itemSize);
    item.new = false;
  }
  if(item.touched == false){
    rect(item.x, item.y, itemSize, itemSize);
  }else{

  }
}

function drawHealth(man, man2){
  let healthbar1 = map(man.health,0,startHealth,0,screenWidth/2);
  let healthbar2 = map(man2.health,0,startHealth,0,-screenWidth/2);

  fill(man.color[0], man.color[1], man.color[2]);
  rect(0,0,healthbar1,healthSize);
  fill(man2.color[0], man2.color[1], man2.color[2]);
  rect(screenWidth,0,healthbar2,healthSize);
}

function deadCheck(m1, m2){
  if(m1.health <= 0 ){
    gameOver = true;
    fill(m2.color[0], m2.color[1], m2.color[2]);
    textSize(150);
    text(m2.name + ' WINS!', 10, screenWidth/2);
    setTimeout(function(){location.reload();}, 3000);;
  }
  if(m2.health <= 0 ){
    gameOver = true;
    fill(m1.color[0], m1.color[1], m1.color[2]);
    textSize(150);
    text(m1.name + ' WINS!', 10, screenWidth/2);
    setTimeout(function(){location.reload();}, 3000);;
  }
}

function drawPipe(){
  fill(255);
  rect(pipe.x-pipe.width/2, 0, pipe.width, screenHeight);
  fill(0);
  rect(pipe.x-pipe.width/2, pipe.holeY, pipe.width, pipe.holeSize);
}

function drawMan(man){
  fill(man.color[0], man.color[1], man.color[2]);
  circle(man.x, man.y, man.size, man.size);
}

function hitCheck(man, pipe){
  if(man.x + man.size >= screenWidth){
    man.moveRight = false;
    pipe.holeY = random(0, screenHeight-pipe.holeSize);
  }
  if(man.x <= 0){
    man.moveRight = true;
  }

  if(man.x > item.x && man.x < item.x+itemSize && man.y > item.y && man.y < item.y+itemSize){
    item.touched = true;
    item.usedby = man.id;
  }

  if(man.x + man.size/2 > pipe.x-pipe.width/2 && man.x + man.size/2 < pipe.x+pipe.width/2){
    if(man.y + man.size/2 > pipe.holeY && man.y + man.size/2 < pipe.holeY+pipe.holeSize){

    }else{
      if(man.health >= 0 && gameOver == false){
        man.health = man.health - damage;
      }
    }
  }
}

function setVelocity(man){
  if(man.y < screenHeight-man.size){
    man.y_vel = man.y_vel + gravity;
  }
  man.y = man.y + man.y_vel;
  if(man.y > screenHeight-man.size){man.y=screenHeight-man.size;}
  if(man.y < 0){man.y=0;}

  if(man.moveRight == true){
    man.x = man.x + man.x_vel;
  }else{
    man.x = man.x - man.x_vel;
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    man.y_vel = -man.jumpVel;
  }else if (keyCode == 87){
    man2.y_vel = -man2.jumpVel;
  }
}
