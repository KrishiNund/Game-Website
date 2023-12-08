//creating 2d drawing context for the canvas
const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let minPlayableAreaX = 40;
let maxPlayableAreaX = 800;

//bullets variables
let bulletsArray = [];
let bulletSpeed = -0.2;

//adding creating spaceship object to store its details
let spaceshipInfo = {
  x:canvas.width / 2 - 25,
  y:canvas.height - 70,
  width: 50,
  height: 50,
  speed: 10
};

// adding game start text: "Press Enter to Start"
let switchColor = false;
function drawStartText() {
  ctx.font = "30px Pixelify Sans";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ff88ff";
  ctx.fillText("Press Enter to start!", canvas.width / 2, canvas.height / 2);
}
drawStartText();

let explosionsArray = [];
let gameOver = false;
function drawOnCanvas(){
  if (!gameOver){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    drawBullets();
    drawObstacles();
    drawExplosions();
    drawHeadUpDisplay();
    detectCollisions();
    detectCollisionsBetweenShipAndObstacles();
   
    requestAnimationFrame(drawOnCanvas);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } 
}

function drawExplosions(){
  // let activeExplosions = [];

  for (let i =0; i < explosionsArray.length; i++){
    const explosion = explosionsArray[i];
    if (explosion.active){
      animateExplosion(explosion.x,explosion.y,i);
    }
  }
}
//adding spaceship image/sprite
const spaceship = new Image();
spaceship.src = "images/playerShip1_orange.png";

//drawing spaceship
function drawSpaceship(){
  ctx.drawImage(spaceship, spaceshipInfo.x, spaceshipInfo.y, spaceshipInfo.width,spaceshipInfo.height);
}

//adding sound when shooting bullets

let fxVolume = sessionStorage.getItem("soundFXVolume");
console.log(fxVolume);

const laserSound = document.getElementById("laser");
laserSound.volume = fxVolume/100;

//firing bullets/shooting
function fireBullets(event){
  if (event.key === " "){
    let bullet = {
        x : spaceshipInfo.x + spaceshipInfo.width/2.1,
        y : spaceshipInfo.y - 10,
        width : 2,
        height : 10,
        used : false
    };
    bulletsArray.push(bullet);
    laserSound.play();
      // bulletSound.play();
  }
}

function drawBullets(){
  const onScreenBullets = [];

  //drawing bullets
  for(let i=0; i< bulletsArray.length; i++){
    let bullet = bulletsArray[i];

    const now =performance.now();
    const deltaTime = now - bullet.lastUpdateTime || 0;
    bullet.lastUpdateTime = now;
    bullet.y += bulletSpeed * deltaTime;
    
    ctx.fillStyle = "#FFD700";
    ctx.strokeStyle ="red";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeRect(bullet.x, bullet.y, bullet.width, bullet.height);
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    if (bullet.y > 0){
      onScreenBullets.push(bullet);
    }
  } 
  bulletsArray = onScreenBullets;
}

// getting the on screen buttons
const rightButton = document.querySelector(".right-arrow");
const leftButton = document.querySelector(".left-arrow");
let healthBar = document.getElementById("HPBar");
//after "Enter" is pressed, display spaceship and on screen buttons
document.addEventListener("keyup", startGame);
let gameStarted = false;

//adding background music when starting game
let bgVolume = sessionStorage.getItem("bgVolume");
console.log(bgVolume);

const bgMusic = document.getElementById("backgroundMusic");
bgMusic.volume = bgVolume/100;
function startGame(event) {
  if (event.key === "Enter" && gameStarted == false) {
    gameStarted = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rightButton.style.display = "block";
    leftButton.style.display = "block";
    canvas.style.animation = "scroll 15s linear infinite reverse";
    setInterval(spawnObstacle, 3000);
    drawOnCanvas();
    document.addEventListener("keyup",fireBullets);
    document.addEventListener("keydown",moveSpaceship);
    document.addEventListener("keyup",useSpecialAbility);
    document.addEventListener("keydown",quitGame);
    bgMusic.play();
  }
}

//moving the spaceship
function moveSpaceship (event) {
  if (event.key === "ArrowLeft" && spaceshipInfo.x > minPlayableAreaX) {
    spaceshipInfo.x -= spaceshipInfo.speed;
    drawSpaceship();
  } else if (event.key === "ArrowRight" && spaceshipInfo.x < maxPlayableAreaX) {
    spaceshipInfo.x += spaceshipInfo.speed;
    drawSpaceship();
  }
}

// adding on screen buttons functions
function moveRight() {
  if (spaceshipInfo.x < maxPlayableAreaX) {
    spaceshipInfo.x += spaceshipInfo.speed;
    drawSpaceship();
  }
}

function moveLeft() {
  if (spaceshipInfo.x > minPlayableAreaX) {
    spaceshipInfo.x -= spaceshipInfo.speed;
    drawSpaceship();
  }
}

//menu buttons functions
function moveToSignUp() {
  window.location.href = "sign up.html";
}

function moveToLogin() {
  window.location.href = "login.html";
}



//drawing obstacles
const asteroid = new Image();
asteroid.src = "images/Asteroid 01 - Base.png";

const enemyShip1 = new Image();
enemyShip1.src = "images/enemyBlue2.png";

const enemyShip2 = new Image();
enemyShip2.src = "images/enemyBlack1.png";

const spRecoveryPill = new Image();
spRecoveryPill.src = "images/powerupBlue_bolt.png";
// const explosion = new Image();
// explosion.src = "images/Asteroid 01 - Explode.png";

let typeOfObstacles = [asteroid,spRecoveryPill];
let obstaclesArray = [];

function spawnObstacle() {
  let index = Math.floor(Math.random() * typeOfObstacles.length);
  let obstacleGenerated = typeOfObstacles[index];
  let obstacleX = Math.floor(Math.random() * 760) + 40;
  let obstacleY = 0;
  obstaclesArray.push({ x: obstacleX, y: obstacleY, type: obstacleGenerated });
}

// setInterval(spawnObstacle, 3000);

function drawObstacles() {
  obstaclesArray = obstaclesArray.filter((obstacle) => {
    // Draw the obstacle
    ctx.drawImage(obstacle.type, obstacle.x, obstacle.y, 50, 50);
    // Update obstacle position
    const now = performance.now();
    const deltaTime = now - obstacle.lastUpdateTime || 0;
    obstacle.lastUpdateTime = now;
    obstacle.y += 0.08 * deltaTime; 
    // Check if the obstacle is still on-screen
    return obstacle.y < canvas.height;
  });
}

//collision
let score = 0;
let numAsteroidHit =0;
let numSpaceshipHit = 0;

//adding sound when bullet hits obstacle
const collisionSound1 = document.getElementById("collision1");
collisionSound1.volume = fxVolume/100;
function detectCollisions() {
  for (let i = 0; i < bulletsArray.length; i++) {
    let bullet = bulletsArray[i];

    for (let j = 0; j < obstaclesArray.length; j++) {
      let obstacle = obstaclesArray[j];
      // Check for collision
      if (obstacle.type == asteroid || obstacle.type == enemyShip1 || obstacle.type == enemyShip2){
        if (
          bullet.x < obstacle.x + 50&&
          bullet.x + 2 > obstacle.x &&
          bullet.y < obstacle.y + 50 &&
          bullet.y + 10 > obstacle.y
        ) {
          if (obstacle.type == asteroid){
            numAsteroidHit++;
            score += 200;
          } 
          else if (obstacle.type == enemyShip1){
            numSpaceshipHit++;
            score += 500;
          }
          else if (obstacle.type == enemyShip2){
            numSpaceshipHit++;
            score+=1000;
          }
          explosionsArray.push({x:obstacle.x, y:obstacle.y, active:true});
          collisionSound1.play();
          bulletsArray.splice(i, 1);
          obstaclesArray.splice(j, 1);
          trackScore();
          updateTopScore();
        }
      }
    }
  }
}
//adding sound when spaceship collides with obstacle
const collisionSound2 = document.getElementById("collision2");
collisionSound2.volume = fxVolume/100;
function detectCollisionsBetweenShipAndObstacles() {
  for (let j = 0; j < obstaclesArray.length; j++) {
    let obstacle = obstaclesArray[j];
    // Check for collision
    if (
      spaceshipInfo.x < obstacle.x + 50 &&
      spaceshipInfo.x + 50 > obstacle.x &&
      spaceshipInfo.y < obstacle.y + 50 &&
      spaceshipInfo.y + 50 > obstacle.y
    ) {
      if (obstacle.type == asteroid || obstacle.type == enemyShip1 || obstacle.type == enemyShip2){
      obstaclesArray.splice(j, 1);
      updateHPBar();
      collisionSound2.play();

      // You might also want to play an explosion animation or update the score here
      } else if (obstacle.type == spRecoveryPill){
        obstaclesArray.splice(j, 1);
        updateSPBar();
      }
    } 
  }
}

//drawing the Head Up display (HUD)/UI
let currentHP = 200;
let currentSP = 0;
let level = 1;
let currentlyLoggedInAccount = sessionStorage.getItem("loggedInUser");

function drawHeadUpDisplay(){
  //create dashboard section
  ctx.lineWidth = "5";
  ctx.strokeStyle = "#7373ff";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.strokeRect(850,0,250,250);
  ctx.fillRect(850,0,250,250);


  //write HP next to hp bar
  ctx.fillStyle = "crimson";
  ctx.fillText("HP",870,50,25);

  //draw hp bar
  ctx.lineWidth = "2";
  ctx.strokeStyle = "white";
  ctx.fillStyle = "crimson";
  if (currentHP >= 0){
    ctx.strokeRect(890,30,200,20);
    ctx.fillRect(890,30,currentHP,20);
  } else {
    ctx.strokeRect(890,30,200,20);
  }

  //write SP next to SP bar
  ctx.fillStyle = "blue";
  ctx.fillText("SP",870,80,25);
  
  //draw sp bar
  ctx.lineWidth = "2";
  ctx.strokeStyle = "white";
  ctx.fillStyle = "blue";
  if (currentSP <= 200){
    ctx.strokeRect(890,60,200,20);
    ctx.fillRect(890,60,currentSP,20);
  } 

  //drawing user, level and scores
  ctx.fillStyle = "gold";
  ctx.fillText(`User:${currentlyLoggedInAccount}`,895,120,65);

  ctx.fillText(`Level:${level}`,980,120,55);
 
  ctx.fillText(`Score:${score}`,895,150,70);

  //objectives
  ctx.fillText("Objectives:",900,180,80);

  if (level == 1){
    ctx.fillStyle = "white";
    ctx.fillText(`- Asteroids:${numAsteroidHit}/20`,905,210,90);   
  }
  if (level == 2){
    ctx.fillStyle = "white";
    ctx.fillText(`-Asteroids:${numAsteroidHit}/10`,905,210,90);   
    ctx.fillText(`-Spaceships:${numSpaceshipHit}/20`,905,240,90);   
  }
  if (level == 3){
    ctx.fillStyle = "white";
    ctx.fillText(`-Asteroids:${numAsteroidHit}/20`,905,210,90);   
    ctx.fillText(`-Spaceships:${numSpaceshipHit}/20`,905,240,90);    
  }
}

function updateHPBar(){
  const damage = 200;
  ctx.lineWidth = "2";
  ctx.strokeStyle = "white";
  ctx.fillStyle = "crimson";
  if (currentHP > 0){
    currentHP -= damage;
    console.log(currentHP);
    ctx.strokeRect(890,30,200,20);
    ctx.fillRect(890,30,currentHP,20);
    if (currentHP <= 0){
      ctx.strokeRect(890,30,200,20);
      gameOver=true;
      Swal.fire({
        title: 'Game Over',
        text:`You lost!`,
        icon: 'warning',
        confirmButtonText: 'Retry!',
        willClose: function(){
            location.reload();
        } 
      })
      bgMusic.pause();
    }
  } else{
    ctx.strokeRect(890,30,200,20);
  }
}

function updateSPBar(){
  const SP = 50;
  ctx.lineWidth = "2";
  ctx.strokeStyle = "white";
  ctx.fillStyle = "blue";
  if (currentSP != 200){
    currentSP += SP;
    ctx.strokeRect(890,30,200,20);
    ctx.fillRect(890,30,currentSP,20);
  }
  if (specialAbilityUsed == true){
    currentSP-=200;
    specialAbilityUsed = false;
    ctx.strokeRect(890,60,200,20);
  }
}

let specialAbilityUsed = false;
function useSpecialAbility(event){
  if (event.key === "Shift" && currentSP == 200){
    specialAbilityUsed = true;
    updateSPBar();
    bulletSpeed = -0.8;
    spaceshipInfo.speed = 20;
    //special ability only lasts for 10 seconds
    setTimeout(specialAbilityOver,10000);
  }
  
}
function specialAbilityOver(){
  specialAbilityUsed = false;
  bulletSpeed = -0.2;
  spaceshipInfo.speed = 10;
}

let level1Completed = false;
let level2Completed = false;
let level3Completed = false;

//adding sound when new level reached
const warp = document.getElementById("warp");
warp.volume = fxVolume/100;
function trackScore(){
  if (numAsteroidHit >= 20 && level1Completed == false){
    level++;
    numAsteroidHit=0;
    level1Completed = true;
    typeOfObstacles.push(enemyShip1);
    warp.play();
  }
  if (numAsteroidHit >= 10 && numSpaceshipHit >= 20 && level2Completed == false){
    level ++;
    numAsteroidHit = 0;
    numSpaceshipHit = 0;
    level2Completed = true;
    typeOfObstacles.push(enemyShip2);
    warp.play();
  }
  if (numAsteroidHit >= 20 && numSpaceshipHit >= 20 && level3Completed == false){
    level ++;
    numAsteroidHit = 0;
    numSpaceshipHit = 0;
    level3Completed = true;
    Swal.fire({
      title: 'Congratulations!!',
      text:`You've completed all 3 levels!`,
      icon: 'info',
      confirmButtonText: 'OK',
      willClose: function(){
          location.reload();
        } 
    }) 
  }
}

let topScore =0;
let usersArray = JSON.parse(localStorage.getItem("currentUsers")) || [];
function updateTopScore(){
  usersArray.forEach(function(user){
    if (user.Username == currentlyLoggedInAccount){
      topScore = user.TopScore;
      if (score > topScore){
        user.TopScore = score;
        let currentDate = new Date();
        let readableDate = `${currentDate.getFullYear()} - ${currentDate.getMonth() + 1} - ${currentDate.getDate()}`;
        user.DateAchieved = readableDate;
        localStorage.setItem("currentUsers",JSON.stringify(usersArray));
        console.log(usersArray);
      }
    }

  })
}

function drawScoreboardWidget(){
  let scoreboard = document.querySelector('.leaderboard-widget');
  usersArray = JSON.parse(localStorage.getItem("currentUsers")) || [];
  for (let i =0; i < usersArray.length; i++){
      let row = scoreboard.insertRow();
      let username = row.insertCell(0);
      let score = row.insertCell(1);
  
      username.innerHTML = usersArray[i].Username;
      score.innerHTML = usersArray[i].TopScore;
      console.log(usersArray[i].TopScore);
  }
}
drawScoreboardWidget();

function quitGame(event){
  if (event.key === "Escape"){
    Swal.fire({
      title: 'Quit Game',
      text:"Are you sure you want to quit?",
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton:true,
      cancelButtonText: 'Cancel'
    }).then((response)=>{
      if (response.isConfirmed){
        gameOver = true;
        Swal.fire({
         title: 'Game Over',
         text:`You quit!`,
         icon: 'warning',
         confirmButtonText: 'Back to Start Page',
         willClose: function(){
             location.reload();
            } 
        })
      }
    })
  }
}

let explosion = new Image();
explosion.src = "images/Explosion.png";
const spriteWidth = explosion.width/8;
const spriteHeight = explosion.height;
let frameX =0;
let animationActive = true;
let gameFrame = 0;
const staggerFrames = 5;

function animateExplosion(x,y, index){   
  if (!explosionsArray[index].active){
    return;
  }    
  ctx.drawImage(explosion,frameX*spriteWidth,0,spriteWidth,spriteHeight, x-5, y-25, 120, 120);
  if (gameFrame % staggerFrames == 0){
    if (frameX < 9) {
      frameX++;
    }else {
      frameX =0;
      // animationActive = false;
      explosionsArray[index].active = false;
    }
  }
  gameFrame++;

  if (explosionsArray[index].active){
    requestAnimationFrame(() => animate(x,y,index));
  }
}
        