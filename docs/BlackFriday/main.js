title = "Black Friday";

description = `
Shop Until You Drop
`;


characters = [
//a: tv
 `
llllll
lLLLLl
lLLLLl
lLLLLl
lLLLLl
llllll
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
 //d: pants
 `
  yy
 LLLL
 L  L
 L  L
 LLLL
 `,
 //e: ring
 `
 rrrrr
 rr rr
 rr rr
 rr rr
 rr rr
 rr rr
 `

];

// border screen size
const G = {
  WIDTH: 200,
  HEIGHT: 200
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
  seed: 1,
  isPlayingBgm: false,
  isReplayEnabled: true,
  isDrawingParticleFront: true,
  theme: "simple"
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

function update() {
  if (!ticks) {
    listOfItems = []
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5)
    };
    itemSpawnTick = 0
    tv_position = vec(100,100)
    xbox_position = vec(25, 25)
    shirt_position = vec(130, 130)
    engagement_position = vec(170, 170)
    pants_position = vec(170, 40)
  }
  drawWalls();

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
  //player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);

  // checks to see if player is at shopping cart area and they tap to check item list
  if(input.isJustPressed && thePlayer.isColliding.rect.yellow) {
    // TO DO: IMPLEMENT SCORE AND CHECK LIST SYSTEM HERE
    console.log("Checking Item List at Shopping Area!");
  }

  char("a", tv_position) //TV
  char("b", xbox_position); //xbox
  char("c", shirt_position); //shirt
  char("d", engagement_position); //engagement ring
  char("e", pants_position); //pants
  if(input.isPressed){
    if((input.pos.x > tv_position.x - 4  && input.pos.x < tv_position.x + 4) && (input.pos.y > tv_position.y - 4  && input.pos.y < tv_position.y + 4)){
      tv_position = player.pos
    }
    if((input.pos.x > xbox_position.x - 4  && input.pos.x < xbox_position.x + 4) && (input.pos.y > xbox_position.y - 4  && input.pos.y < xbox_position.y + 4)){
      xbox_position.x = player.pos.x + 2
      xbox_position.y = player.pos.y
    }
    if((input.pos.x > shirt_position.x - 4  && input.pos.x < shirt_position.x + 4) && (input.pos.y > shirt_position.y - 4  && input.pos.y < shirt_position.y + 4)){
      shirt_position.x = player.pos.x
      shirt_position.y = player.pos.y - 2
    }
    if((input.pos.x > engagement_position.x - 4  && input.pos.x < engagement_position.x + 4) && (input.pos.y > engagement_position.y - 4  && input.pos.y < engagement_position.y + 4)){
      engagement_position.x = player.pos.x
      engagement_position.y = player.pos.y + 2
    }
    if((input.pos.x > pants_position.x - 4  && input.pos.x < pants_position.x + 4) && (input.pos.y > pants_position.y - 4  && input.pos.y < pants_position.y + 4)){
      pants_position.x = player.pos.x - 2
      pants_position.y = player.pos.y
    }
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
  // draws map isle layout
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
  box(G.WIDTH / 2, G.HEIGHT * 0.85, 35, 15);
}

function randomizeShoppingList() {
  for (let i = 0; i < 6; i++) {
    shoppingList[i] = listOfItems[Math.floor(Math.random() * 5)];
  }
}

function scoreList() {
  for(let i = 0; i < shoppingList.length; i++) {
    // list = tv, xbox, tv, pants
    // cart = ring, shirt, tv
    for(let j = 0; j < shoppingCart.length; j++) {
      if (shoppingList[i] == shoppingCart[j]) {
        // checking off list and cart
        shoppingList[i] = '';
        shoppingCart[j] = '';
        score++;
        // Add time to timer
        break;
      }
    }
  }
  randomizeShoppingList();
}