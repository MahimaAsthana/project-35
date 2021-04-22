//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage;
var fedTime, lastFed, feed;
var foodObj, addFood;
var hours;
var foodCount, milkImg;
function preload()
{
	dogImage = loadImage("Dog.png")
  happyDogImage = loadImage("happydog.png")

}

function setup() {
  database = firebase.database()
	createCanvas(1000, 500);
	
  dog = createSprite(800,200,100,100)
  dog.addImage(dogImage)
  dog.scale = 0.2;
	
  foodObj = new Food();	
	
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
 
  feed = createButton("Feed The Dog")
  feed.position(700, 95)
  feed.mousePressed(feedDog);
	
  addFood = createButton("Add Food");
  addFood.position(650, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);
	
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
    lastFed=data.val();
  });

 fill(255,255,254);
  textSize(15);
 if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();


  /*currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }*/

}

function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
    console.log(foodS)
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

  console.log(foodS)
}

