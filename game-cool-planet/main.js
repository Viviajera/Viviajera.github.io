let consomer;
let obstacles = [];
let bonus = 0;
let malus = 0;
let finished;
let time = 8;


const obstacleTypes = [
  {
    image: "./images/airplane.png",
    isGood: false,
    width: 200
  },
  {
    image: "./images/bicycle.png",
    isGood: true,
    width: 300
  },
  {
    image: "./images/car.png",
    isGood: false,
    width: 250
  },
  {
    image: "./images/fruits-vegetables.png",
    isGood: true,
    width: 200
  },
  {
    image: "./images/meat.png",
    isGood: false,
    width: 200
  },
  {
    image: "./images/metro.png",
    isGood: true,
    width: 250
  },
  {
    image: "./images/light-off.png",
    isGood: true,
    width: 150
  },
  {
    image: "./images/bottle.png",
    isGood: false,
    width: 150
  },
  {
    image: "./images/recycling.png",
    isGood: true,
    width: 200
  },
  {
    image: "./images/light-on.png",
    isGood: false,
    width: 200
  }
];

var coolPlanet;
var coolPlanetImage = new Image();
coolPlanetImage.onload = function() {
  coolPlanet = true;
};
coolPlanetImage.src = "./images/fresh-planet.png";

var hotPlanet;
var hotPlanetImage = new Image();
hotPlanetImage.onload = function() {
  hotPlanet = true;
  
};
hotPlanetImage.src = "./images/hot-planet.png";

var clock;
var clockImage = new Image();
clockImage.onload = function () {
  clock = true;
};
clockImage.src = "./images/time.png";

//------------------------------------------------------GAME CANVAS
const ctx = document.querySelector("canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;

//----------------------------------------------AUDIO

var winSound = new Audio('./audio/win.mp3');
winSound.volume = 0.2
winSound.play()

var loseSound = new Audio('./audio/cough.mp3');
loseSound.volume = 0.2
loseSound.play()

function draw() {
  //----------------------------------------------OBSTACLES RAINING
  if (frames % 90 === 0) {
    const randomIndex = Math.floor(Math.random() * obstacleTypes.length);
    const randomObstacle = obstacleTypes[randomIndex];
    const xesArray = [500, 800, 1100];
    const xIndex = Math.floor(Math.random() * xesArray.length);
    const x = xesArray[xIndex];
    obstacles.push(
      new Obstacle(
        x,
        randomObstacle.image,
        randomObstacle.width,
        randomObstacle.isGood
      )
    );
  }

  ctx.fillStyle = "rgb(46, 221, 123)";
  ctx.fillRect(0, 0, 1600, 1600);
  ctx.clearRect(0, 0, 1600, 1600);

  //-------------------------------------CO2 BONUS/ MALUS COUNTER

  //BONUS DRAW
  ctx.fillStyle = "rgb(87, 205, 271)";
  ctx.fillRect(100, 1400, 400, 200);
  ctx.fillStyle = "black";
  ctx.font = "80px Comic Sans MS";
  ctx.fillText(bonus + " CO2 Bonus", 200, 1550, 250);
 

  if (coolPlanet) {
    ctx.drawImage(coolPlanetImage, 0, 1300, 200, 200);
  }

  //MALUS DRAW
  ctx.fillStyle = "rgb(255, 137, 30)";
  ctx.fillRect(1150, 1400, 400, 200);
  ctx.fillStyle = "black";
  ctx.font = "80px Comic Sans MS";
  ctx.fillText(malus + " CO2 Malus", 1200, 1550, 250);
 

  if (hotPlanet) {
    ctx.drawImage(hotPlanetImage, 1400, 1300, 200, 200);
  }
  

  //TIME
  time = 8 + Math.floor(frames / 200);
  ctx.fillStyle = "rgb(87, 205, 271)";
  ctx.fillRect(0, 0, 500, 200);
  ctx.fillStyle = "black";
  ctx.font = "80px Comic Sans MS";
  ctx.fillText(" Time: " + time + "h", 120, 150, 300);    

  if (clock) {
    ctx.drawImage(clockImage,0, 0, 150, 150);
  }
    
  // CONSOMER DRAWING
  consomer.draw();
  obstacles.forEach(function(obstacle) {
    obstacle.draw();
    obstacle.y += 10;
  });

  // CRASH AND POINTS BONUS/MALUS
  obstacles.forEach(function(obstacle, index) {
    if (obstacle.crashwith(consomer)) {
      if (obstacle.isGood) {
        bonus += 1;
      } else {
        malus += 3;
      }
      obstacles.splice(index, 1);
    }
  });

//------------------------------------- YOU WIN / YOU LOSE

  if (time >= 18) {
    finished = true;
    ctx.clearRect(0, 0, 1600, 1600);
    
    if (bonus >= malus) { //YOU WIN
      //WIN IMG
      var winImage = new Image();
      winImage.onload = function() {
        win = true;
        ctx.drawImage(winImage, 0, 0, 1800, 1300);
      };
      winImage.src = "./images/win.png";
      // BONUS SCORE
      ctx.fillStyle = "rgb(87, 205, 271)";
      ctx.fillRect(100, 1400, 500, 200);
      ctx.fillStyle = "black";
      ctx.font = "150px Comic Sans MS";
      ctx.fillText(bonus + " CO2 Bonus", 200, 1550, 300);
      

      if (coolPlanet) {
         ctx.drawImage(coolPlanetImage, 0, 1300, 200, 200);
     }
      //MALUS SCORE
      ctx.fillStyle = "rgb(255, 137, 30)";
      ctx.fillRect(1150, 1400, 400, 200);
      ctx.fillStyle = "black";
      ctx.font = "100px Comic Sans MS";
      ctx.fillText(malus + " CO2 Malus", 1200, 1550, 250);

      if (hotPlanet) {
        ctx.drawImage(hotPlanetImage, 1400, 1300, 200, 200);
      }
      winSound.play()

    } else { // YOU LOSE
      //LOSE IMG
      var loseImage = new Image();
      loseImage.onload = function() {
        lose = true;
        ctx.drawImage(loseImage, 0, 0, 1800, 1300);
      };
      loseImage.src = "./images/lose.png";

      //MALUS SCORE
      ctx.fillStyle = "rgb(255, 137, 30)";
      ctx.fillRect(1150, 1400, 500, 200);
      ctx.fillStyle = "black";
      ctx.font = "150px Comic Sans MS";
      ctx.fillText(malus + " CO2 Malus", 1200, 1550, 300);

      if (hotPlanet) {
        ctx.drawImage(hotPlanetImage, 1400, 1250, 200, 200);
      }
      //BONUS SCORE
      ctx.fillStyle = "rgb(87, 205, 271)";
      ctx.fillRect(100, 1400, 400, 200);
      ctx.fillStyle = "black";
      ctx.font = "100px Comic Sans MS";
      ctx.fillText(bonus + " CO2 Bonus", 200, 1550, 250);

      if (coolPlanet) {
        ctx.drawImage(coolPlanetImage, 0, 1300, 200, 200);
      }
      loseSound.play()
    }
  } 
}

// ---------------------------------------------MOVING

document.onkeydown = function(e) {
  switch (e.which) {
    case 38:
      consomer.speed();
      break;
    case 37:
      consomer.moveLeft();
      break;
    case 39:
      consomer.moveRight();
      break;
    case 40:
      consomer.moveDown();
  }
};
document.onkeyup = function(e) {
  consomer.speedX = 0;
  consomer.speedY = 0;
};

//---------------------------------------------FRAMES
let raf;
let frames = 0;
function animLoop() {
  frames++;
  draw();
  if (!finished) {
    raf = requestAnimationFrame(animLoop);
  }
}
//------------------------------------------------RESET
function reset() {
  consomer = new Consomer();
  finished = false;
  time = 8;
  frames = 0;
  obstacles = [];
  bonus = 0;
  malus = 0;
  bonusSound = false;
  MalusSound = false;
}

// --------------------------------------------START GAME
function startGame() {
  if (raf) {
    cancelAnimationFrame(raf);
  }

  reset();

  raf = requestAnimationFrame(animLoop);
}

document.getElementById("start-button").onclick = function() {
  startGame();
};

