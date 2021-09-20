var path,sahil,cash,diamonds,jewellery,sword;
var pathImg,sahilImg,cashImg,diamondsImg,jewelleryImg,swordImg;
var treasure = 0;
var cashG,diamondsG,jewelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  sahilImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
// Moving background
path= createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
sahil = createSprite(width/2,height-20,20,20);
sahil.addAnimation("SahilRunning",sahilImg);
sahil.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jewelleryG=new Group();
swordGroup=new Group();
  
  sahil.setCollider("circle",0,0,550);
        //boy.debug =true;

}

function draw() {

  if(gameState===PLAY){
  background(0);
  sahil.x = World.mouseX;
  
  edges= createEdgeSprites();
  sahil.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJewellery();
    createSword();

    if (cashG.isTouching(sahil)) {
      cashG.destroyEach();
      treasure=treasure + 1;
    }
    else if (diamondsG.isTouching(sahil)) {
      diamondsG.destroyEach();
      treasure=treasure + 1;
      
    }else if(jewelleryG.isTouching(sahil)) {
      jewelleryG.destroyEach();
      treasure= treasure + 1;
      
    }else{
      if(swordGroup.isTouching(sahil)) {
        gameState=END;
        
        sahil.addAnimation("SahilRunning",endImg);
        sahil.x=width/2;
        sahil.y=height/2;
        sahil.scale=0.6;
        
  
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jewelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jewelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    
    }
  }    
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasure, width-150,30); 
  }
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 210;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 300 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4;
  diamonds.lifetime = 210;
  diamondsG.add(diamonds);
}
}

function createJewellery() {
  if (World.frameCount % 150 == 0) {
  var jewellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jewellery.addImage(jewelleryImg);
  jewellery.scale=0.13;
  jewellery.velocityY = 6;
  jewellery.lifetime = 210;
  jewelleryG.add(jewellery);
  }
}

function createSword(){
  if (World.frameCount % 120 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 7;
  sword.lifetime = 210;
  swordGroup.add(sword);
  }
}