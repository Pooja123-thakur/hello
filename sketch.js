//hi 
var PLAY = 1;
var END  = 0;
var gameState = PLAY ;

var fairy, fairy_collided;
var ground, invisibleGround, groundImage;
var monsterGroup, monster1, monster2, monster3, monster4;
var backgroundImg
var score=0;

function preload(){
  backgroundImg = loadImage("background.png");
fairyImg = loadImage("fairy.jpg");
fairy_collided = loadImage("fairy_collided.jpg");
  
groundImage = loadImage("ground.png");
monster1 = loadImage("monster1.png");
monster2 = loadImage("monster2.png");
monster3 = loadImage("monster3.png");
monster4 = loadImage("monster4.png");
  
  gameOverbuttonImg = loadImage("gameOverbutton.webp");
  restartbuttonImg = loadImage("restartbutton.webp");
}


function setup() {
  createCanvas(400,700);

 fairy = createSprite(50,300,20,50)
fairy.addImage(fairyImg)
fairy_collided.addImage("collided", fairy_collided);
  fairy.scale = 0.25;

  invisibleGround = createSprite(400,350,1600,10)
invisibleGround.visible = false

ground = createSprite(width/2,height,width,2);
 ground.addImage("ground",groundImage);
 ground.x = width/2
 ground.velocityX = -(6 + 3*score/100);
  
 gameOver = createSprite(width/2,height/2- 50);
 gameOver.addImage(gameOverImg);
 
 restart = createSprite(width/2,height/2);
 restart.addImage(restartImg);
 
 gameOver.scale = 0.5;
 restart.scale = 0.1;

 gameOverbutton.visible = false;
 restartbutton.visible = false;
 
monsterGroup = new Group()
score = 0;

}

function draw () {

  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
   
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && fairy.y  >= height-120) {
      fairy.velocityY = -10;
       touches = [];
    }
    
  fairy.velocityY = fairy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    fairy.collide(invisibleGround);
    spawnMonster();

    if(monsterGroup.isTouching(fairy)){
      gameState = END;
  }
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
}
ground.velocityX = 0;
    fairy.velocityY = 0;
    monsterGroup.setVelocityXEach(0);

    
    //change the trex animation
    fairy.changeAnimation("collided",fairy_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    monsterGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
 
  
  
  drawSprites();
}
  function spawnMonster() {
    if(frameCount % 60 === 0) {
      var monster = createSprite(600,height-95,20,30);
      monstetr.setCollider('circle',0,0,45)
      // obstacle.debug = true
    
      monster.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: monster1.addImage(monster1);
                break;
        case 2: monster.addImage(monster2);
                break;
        default: break;
      }
      
   monster.scale = 0.2;
monster.lifetime = 300;
     monster.depth = monster.depth;
    monster.depth +=1;
  
   monsterGroup.add(monster);
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  monsterGroup.destroyEach();

  
  
  score = 0;
}

