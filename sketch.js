var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var standing, standingImg
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
towerImg = loadImage("tower.png")
doorImg = loadImage("door.png")
ghostImg = loadImage("ghost-jumping.png")
standingImg = loadImage("ghost-standing.png")
climberImg = loadImage("climber.png")
}

function setup(){
createCanvas(600,600);
tower = createSprite(300,300);
tower.addImage(towerImg);
tower.velocityY = 3;

ghost = createSprite(200,200);
ghost.addImage(ghostImg);
ghost.scale = 0.4
ghost.debug = true

doorsGroup = new Group();
climbersGroup = new Group();
invisibleBlockGroup = new Group();
}

function draw(){
background(0);

    if(gameState === "play"){

    //resetting the tower to make infinite background
    if(tower.y > height){
    tower.y = height/2
    }

    if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x-3
    }

    if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x+3
    }
    
    if(keyDown("SPACE")){
    ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY+0.8

    if(climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0
    }

    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>height){
    ghost.destroy();
    gameState = "end";
    }

    spawnDoors();
    drawSprites();
    }

    if(gameState === "end"){
        fill("Yellow")
        textSize(30)
        text("gameOver",230,250)
        
        }
}
function spawnDoors() {
if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.x = Math.round(random(100,500));
    door.addImage(doorImg)
    door.velocityY = tower.velocityY
    climber = createSprite(door.x,door.y+60);
    climber.addImage(climberImg)
    climber.debug = true
    climber.velocityY = door.velocityY;
    invisibleBlock = createSprite(climber.x,climber.y+5,climber.width,2);
    invisibleBlock.velocityY = climber.velocityY
    invisibleBlock.debug = true
    ghost.depth = door.depth+1

    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
}
}
