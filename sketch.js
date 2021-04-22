//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage;
var fedTime, lastFed
var foodObj;
var hours;
var foodCount, milkImg;
function preload()
{
	dogImage = loadImage("Dog.png")
  happyDogImage = loadImage("happydog.png")
  milkImg = loadImage("Milk.png")
}

function setup() {
  database = firebase.database()
	createCanvas(1000, 500);
  dog = createSprite(900, 250)
  dog.addImage(dogImage)
  dog.scale = 0.2;
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
  foodObj = new Food();
  var feed = createButton("Feed The Dog")
  feed.position(500, 95)
  feed.mousePressed(feedDog)
  var addFood = createButton("Add Food")
  addFood.position(650, 95)
  addFood.mousePressed(addFoods)
  milk = createSprite(800, 300);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
  milk.rotation = 55;
}


function draw() {  
  background(46, 139, 87)
 fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


  if(foodS === 20){
    addFood.mousePressed(foodS + 0);
  }


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




   fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

   if(feed.mousePressed){
     happyDog.visible = true;
     dog.visible = false;
   }

foodObj.display();
happyDog.visible = false;
dog.visible = true;
}

function readStock(data)
{
  foodS = data.val()
}

function writeStock(x)
{
  database.ref('/').update(
    {
      Food: x
    }
  )
}
function addFoods(){
  dog.addImage(dogImage)
    foodS+=1
    database.ref('/').update({
      Food: foodS
    })
    console.log(foodS)
}
function feedDog(){
  //var hours = hour();
 //lastFed = hours
 dog.addImage(happyDogImage)
 if(foodS>0){
foodS-=1
 }
database.ref('/').update({
  Food: foodS
})
if(foodS === 0){
  foodS = 0;
}
milk.visible = true;
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  Food: foodObj.getFoodStock(),
  FeedTime: hour
})
  console.log(foodS)
}

