let consomer;
let obstacles = [];
let bonus = 0;
let malus = 0;
let finished;
var time = 8;

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
  }
];

//

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

//Game canvas
const ctx = document.querySelector("canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;

function draw() {
  //obstacles raining
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

  //counting CO2 Bonus / Malus

  //Bonus
  ctx.fillStyle = "rgb(87, 205, 271)";
  ctx.fillRect(100, 1400, 400, 200);
  ctx.fillStyle = "black";
  ctx.font = "80px Arial";
  ctx.fillText(bonus + " CO2 Bonus", 200, 1550, 250);
  ctx.strokeText(bonus + " CO2 Bonus", 200, 1550, 250);

  if (coolPlanet) {
    ctx.drawImage(coolPlanetImage, 0, 1300, 200, 200);
  }

  //Malus
  ctx.fillStyle = "rgb(255, 137, 30)";
  ctx.fillRect(1150, 1400, 400, 200);
  ctx.fillStyle = "black";
  ctx.font = "80px Arial";
  ctx.fillText(malus + " CO2 Malus", 1200, 1550, 250);
  ctx.strokeText(malus + " CO2 Malus", 1200, 1550, 250);

  if (hotPlanet) {
    ctx.drawImage(hotPlanetImage, 1400, 1300, 200, 200);
  }
  

  //Time
  time = 8 + Math.floor(frames / 200);
  ctx.fillStyle = "rgb(87, 205, 271)";
  ctx.fillRect(0, 0, 500, 200);
  ctx.fillStyle = "black";
  ctx.font = "80px Arial";
  ctx.fillText(" Time: " + time + "h", 100, 150, 300);
  ctx.strokeText(" Time: " + time + "h", 100, 150, 300);
  
  //pbm ----!

    

  if (clock) {
    ctx.drawImage(clockImage,0, 200, 200, 200);
  }
    

  // consomer drawing
  consomer.draw();
  obstacles.forEach(function(obstacle) {
    obstacle.draw();
    obstacle.y += 10;
  });

  // crash and points bonus/ malus
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

  if (time >= 10) {
    finished = true;
    ctx.clearRect(0, 0, 1600, 1600);

    if (bonus >= malus) {
      ctx.fillStyle = "rgb(87, 205, 271)";
      ctx.fillRect(550, 100, 650, 900);
      ctx.fillStyle = "white";
      ctx.font = "80px Arial";
      ctx.fillText("Final score : ", 650, 700, 600);
      ctx.fillText(bonus + " CO2 Bonus " + malus + " CO2 Malus", 600, 800, 500);
      ctx.fillText("You win!", 700, 900, 600);
      //pbm----!
      var winImage = new Image();
      winImage.onload = function() {
        win = true;
        ctx.drawImage(winImage, 650, 200, 200, 200);
      };
      winImage.src = "./images/win.png";
      

    } else {
      ctx.fillStyle = "rgb(255, 137, 30)";
      ctx.fillRect(550, 100, 650, 900);
      ctx.fillStyle = "black";
      ctx.font = "80px Arial";
      ctx.fillText("Final score : ", 650, 700, 600);
      ctx.fillText(bonus + " CO2 Bonus " + malus + " CO2 Malus", 650, 800, 500);
      ctx.fillText("You lose, try again!", 650, 900, 500);
      //pbm----!
      var loseImage = new Image();
      loseImage.onload = function() {
        lose = true;
        ctx.drawImage(loseImage, 650, 200, 200, 200);
      };
      loseImage.src = "./images/lose.png";
      
    }
  } 
}

// moving

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

//frames
let raf;
let frames = 0;
function animLoop() {
  frames++;
  draw();
  if (!finished) {
    raf = requestAnimationFrame(animLoop);
  }
}

function reset() {
  consomer = new Consomer();
  finished = false;
  time = 8;
  frames = 0;
  obstacles = [];
  bonus = 0;
  malus = 0;
}

// start game
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

