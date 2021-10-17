title = "Black Friday";

description = `
   Shop Until You Drop\n
[Press]\tPick-Up/Drop Items
`;


characters = [
//a: tv
 `
LLLLLL
LCCCCL
LCCCCL
LCCCCL
LCCCCL
LLLLLL
 `,
//b: xbox
 `
glllg
lglgl
llgll
lglgl
glllg
 `,
//c: shirt
 `
  bb
 bbbb
bbbbbb 
  bb 
  bb 
  bb 
 `,
 //d: ring
 `
  yy
 LLLL
 L  L
 L  L
 LLLL
 `,
 //e: pants
 `
 RRRRR
 RR RR
 RR RR
 RR RR
 RR RR
 RR RR
 `

];

// border screen size
const G = {
  WIDTH: 200,
  HEIGHT: 200,
  holdingTv: false,
  holdingXbox: false,
  holdingShirt: false,
  holdingEngagement: false,
  holdingPants: false,

}

// calculates the game screen including the UI
const gameScreen = {
  TOPLEFTX: 12,
  TOPLEFTY: 12,
  BOTTOMRIGHTX: G.WIDTH - 12,
  BOTTOMRIGHTY: G.HEIGHT - 28
}

options = {	
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  isCapturing: true,
  isCapturingGameCanvasOnly: true,
  captureCanvasScale: 2,
  seed: 8,
  isPlayingBgm: true,
  isReplayEnabled: true,
  isDrawingParticleFront: true,
  theme: "crt"
};


let player;
let shoppingList;
let listOfItems = ['a', 'b', 'c', 'd', 'e'];
let shoppingCart;
let itemSpawnTick;
let tv_position;
let xbox_position;
let shirt_position;
let engagement_position;
let pants_position;
let prev_position;
let timer;

function update() {
  if (!ticks) {
    timer = 30 * 60;
    shoppingList = []
    shoppingCart = []
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5)
    };
    itemSpawnTick = 0
    tv_position = vec(100, 100);
    xbox_position = vec(25, 25);
    shirt_position = vec(130, 130);
    engagement_position = vec(170, 170);
    pants_position = vec(170, 40);
    
    randomizeShoppingList();
  }
  drawWalls();
  text("Shopping List:", 4, G.HEIGHT - 19);
  text("TIME: " + Math.floor(timer / 60), 10, 10);

  timer--;
  if(timer <= 0) {
    play("lucky");
    end();
  }

  color("light_cyan")
  let thePlayer = box(player.pos, 10)
  color("black")

  // checks to see if there was a wall collision
  if(thePlayer.isColliding.rect.purple) {
    player.pos = prev_position;
  } else {
    prev_position = player.pos;
    player.pos = vec(input.pos.x, input.pos.y);
  }
  // clamps with the UI
  player.pos.clamp(gameScreen.TOPLEFTX, gameScreen.BOTTOMRIGHTX, gameScreen.TOPLEFTY, gameScreen.BOTTOMRIGHTY);

  for(let i = 0; i < shoppingList.length; i++){
    char(shoppingList[i], 20 * (i + 1), G.HEIGHT - 10);
  }

  let tv = char("a", tv_position)//TV
  let xbox = char("b", xbox_position); //xbox
  let shirt = char("c", shirt_position); //shirt
  let engagement = char("d", engagement_position); //engagement ring
  let pants = char("e", pants_position); //pants
  let drop = false;
  // checks to see if player is at shopping cart area and they tap to check item list
  if(input.isJustPressed && thePlayer.isColliding.rect.yellow) {
    scoreList();

    if(shoppingList.length == 0){
      addScore(250, player.pos.x, player.pos.y - 10);
      timer += (5 * 60) - (difficulty - 1) * 25;
      randomizeShoppingList();
      play("coin");
    }
  }

  if(input.isJustPressed && !thePlayer.isColliding.rect.yellow){
    if(tv.isColliding.rect.light_cyan && !G.holdingTv){
      tv_position = player.pos
      G.holdingTv = true
      shoppingCart.push('a');
      play("jump");
    }
    
    else if(G.holdingTv && !drop){
      G.holdingTv = false
      drop = true
      shoppingCart.splice(shoppingCart.indexOf('a'), 1);

      play("select");
      tv_position = vec(100, 100);
    }
    if(xbox.isColliding.rect.light_cyan && !G.holdingXbox){
      xbox_position.x = player.pos.x + 2
      xbox_position.y = player.pos.y
      G.holdingXbox = true
      shoppingCart.push('b');
      play("jump");
    }
    else if(G.holdingXbox && !drop && !G.holdingTv){
      G.holdingXbox = false
      drop = true
      shoppingCart.splice(shoppingCart.indexOf('b'), 1);

      play("select");
      xbox_position = vec(25, 25);
    }
    if(shirt.isColliding.rect.light_cyan && !G.holdingShirt){
      shirt_position.x = player.pos.x
      shirt_position.y = player.pos.y - 2
      G.holdingShirt = true
      shoppingCart.push('c');
      play("jump");
    }
    else if(G.holdingShirt && !drop && !G.holdingTv && !G.holdingXbox){
      G.holdingShirt = false
      drop = true
      shoppingCart.splice(shoppingCart.indexOf('c'), 1);

      play("select");
      shirt_position = vec(130, 130);
    }
    if(engagement.isColliding.rect.light_cyan && !G.holdingEngagement){
      engagement_position.x = player.pos.x
      engagement_position.y = player.pos.y + 2
      G.holdingEngagement = true
      shoppingCart.push('d');
      play("jump");
    }
    else if(G.holdingEngagement && !drop && !G.holdingTv && !G.holdingXbox && !G.holdingShirt){
      G.holdingEngagement = false
      drop = true
      shoppingCart.splice(shoppingCart.indexOf('d'), 1);

      play("select");
      engagement_position = vec(170, 170);
    }
    if(pants.isColliding.rect.light_cyan && !G.holdingPants){
      pants_position.x = player.pos.x - 2
      pants_position.y = player.pos.y
      G.holdingPants = true
      shoppingCart.push('e');
      play("jump");
    }
    else if(G.holdingPants && !drop && !G.holdingTv && !G.holdingXbox && !G.holdingShirt && !G.holdingEngagement){
      G.holdingPants = false
      drop = true
      shoppingCart.splice(shoppingCart.indexOf('e'), 1);

      play("select");
      pants_position = vec(170, 40);
    }

    if(!drop && G.holdingTv || G.holdingXbox || G.holdingEngagement || G.holdingShirt || G.holdingPants){
      color("green");
        particle(
          player.pos.x,
          player.pos.y,
          30,
          3,
          0,
          2*PI
        );
    }
  }

  if(G.holdingTv){
    tv_position = player.pos
  }
  if(G.holdingXbox){
    xbox_position.x = player.pos.x + 2
    xbox_position.y = player.pos.y
  }
  if(G.holdingShirt){
    shirt_position.x = player.pos.x
    shirt_position.y = player.pos.y - 2
  }
  if(G.holdingEngagement){
    engagement_position.x = player.pos.x
    engagement_position.y = player.pos.y + 2
  }
  if(G.holdingPants){
    pants_position.x = player.pos.x - 2
    pants_position.y = player.pos.y
  }
}


// When checking collision against walls, the border will be color("light_blue") and isles will be color("purple")
function drawWalls() {
  // draws borders of the map
  color("light_blue");
  box(4, G.WIDTH / 2, 7, G.HEIGHT);   // left border
  box(G.WIDTH - 3, G.WIDTH / 2, 7, G.HEIGHT); // right border
  box(G.WIDTH / 2, 4, G.WIDTH, 7);    // top border
  // UI for item list
  color("red");
  box(G.WIDTH / 2, G.HEIGHT - 3, G.HEIGHT, 40); // bottom border
  // draws map aisle layout
  //
  //  | | |
  //  |   |
  //  | | |
  //
  color("purple");
  box(G.WIDTH / 4, G.HEIGHT / 2 - 15, 10, 100);   // left isle
  box(G.WIDTH * 0.75, G.HEIGHT / 2 - 15, 10, 100);  // right isle
  box(G.WIDTH / 2, G.HEIGHT / 4 - 5, 10, 40);   // middle top isle
  box(G.WIDTH / 2, G.HEIGHT - 70, 10, 35);    // middle bottom isle
  // draws checkout
  color("yellow");
  box(G.WIDTH / 2, G.HEIGHT - 33, 50, 20);
}

function randomizeShoppingList() {
  shoppingList = [];
  let usedList = [false, false, false, false, false];
  for (let i = 0; i < 3; i++) {
    for(let j = 0; j < usedList.length; j++) {
      if(!usedList[j]) {
        shoppingList.push(listOfItems[j]);
        usedList[j] = true;        
      }
    }
  }
  shuffle(shoppingList);
  shoppingList.splice(0, 2);
}

function scoreList() {
  for(let i = 0; i < shoppingList.length; i++) {
    // list = tv, xbox, tv, pants
    // cart = ring, shirt, tv
    for(let j = 0; j < shoppingCart.length; j++) {
      if (shoppingList[i] == shoppingCart[j]) {
        // checking off list and cart
        shoppingList.splice(i,1);
        shoppingCart.splice(j, 1);
        addScore(100, player.pos);
        return; 
      }
    }
  }
}

function priorityDropItem() {
  if(G.holdingTv && input.isJustPressed){
    G.holdingTv = false
  }
  else if(G.holdingXbox && input.isJustPressed){
    G.holdingXbox = false
  }
  else if(G.holdingShirt && input.isJustPressed){
    G.holdingShirt = false
  }
  else if(G.holdingEngagement && input.isJustPressed){
    G.holdingEngagement = false
  }
  else if(G.holdingPants && input.isJustPressed){
    G.holdingPants = false
  }
}

// Online Resource Helper Function for Randomizing List
// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}