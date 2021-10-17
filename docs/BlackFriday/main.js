title = "Black Friday";

description = `
   Shop Until You Drop\n
[Press]\tPick-Up/Drop Items
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
    shoppingCart = []
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5)
    };
    itemSpawnTick = 0
    tv_position = vec(100,100)
    xbox_position = vec(25, 25)
    shirt_position = vec(130, 130)
    engagement_position = vec(170, 170)
    pants_position = vec(170, 40)
    
    randomizeShoppingList();
  }
  drawWalls();
  text("Shopping List:", 4, G.HEIGHT - 19);

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
    scoreList();

    if(shoppingList.length == 0){
      addScore(100 * score);
      score = 0;
      randomizeShoppingList();
    }
  }

  //for(let i = 0; i < shoppingList.length; i++){
  //  char(shoppingList[i], 20 * (i + 1), G.HEIGHT - 10);
  //}
  
  //char("a", 20, G.HEIGHT - 10)
  //char("b", 30, G.HEIGHT - 10)
  //char("d", 40, G.HEIGHT - 10)
  let tv = char("a", tv_position)//TV
  let xbox = char("b", xbox_position); //xbox
  let shirt = char("c", shirt_position); //shirt
  let engagement = char("d", engagement_position); //engagement ring
  let pants = char("e", pants_position); //pants

  let drop = false
  if(input.isJustPressed){
    
    if(tv.isColliding.rect.light_cyan && !G.holdingTv){
      tv_position = player.pos
      G.holdingTv = true
      shoppingCart[shoppingCart.length] = tv;
    }
    
    else if(G.holdingTv && !drop){
     
      G.holdingTv = false
      drop = true

      play("select");
    }
    if(xbox.isColliding.rect.light_cyan && !G.holdingXbox){
      xbox_position.x = player.pos.x + 2
      xbox_position.y = player.pos.y
      G.holdingXbox = true
      shoppingCart[shoppingCart.length] = xbox;
    }
    else if(G.holdingXbox && !drop && !G.holdingTv){
      G.holdingXbox = false
      drop = true

      play("select");
    }
    if(shirt.isColliding.rect.light_cyan && !G.holdingShirt){
      shirt_position.x = player.pos.x
      shirt_position.y = player.pos.y - 2
      G.holdingShirt = true
      shoppingCart[shoppingCart.length] = shirt;
    }
    else if(G.holdingShirt && !drop && !G.holdingTv && !G.holdingXbox){
      G.holdingShirt = false
      drop = true

      play("select");
    }
    if(engagement.isColliding.rect.light_cyan && !G.holdingEngagement){
      engagement_position.x = player.pos.x
      engagement_position.y = player.pos.y + 2
      G.holdingEngagement = true
      shoppingCart[shoppingCart.length] = engagement;
    }
    else if(G.holdingEngagement && !drop && !G.holdingTv && !G.holdingXbox && !G.holdingShirt){
      G.holdingEngagement = false
      drop = true

      play("select");
    }
    if(pants.isColliding.rect.light_cyan && !G.holdingPants){
      pants_position.x = player.pos.x - 2
      pants_position.y = player.pos.y
      G.holdingPants = true
      shoppingCart[shoppingCart.length] = pants;
    }
    else if(G.holdingPants && !drop && !G.holdingTv && !G.holdingXbox && !G.holdingShirt && !G.holdingEngagement){
      G.holdingPants = false
      drop = true

      play("select");
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
  //drop = false
  if(G.holdingTv){
    tv_position = player.pos

    play("jump");
  }
  if(G.holdingXbox){
    xbox_position.x = player.pos.x + 2
    xbox_position.y = player.pos.y

    play("jump");
  }
  if(G.holdingShirt){
    shirt_position.x = player.pos.x
    shirt_position.y = player.pos.y - 2

    play("jump");
  }
  if(G.holdingEngagement){
    engagement_position.x = player.pos.x
    engagement_position.y = player.pos.y + 2

    play("jump");
  }
  if(G.holdingPants){
    pants_position.x = player.pos.x - 2
    pants_position.y = player.pos.y

    play("jump");
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
  for (let i = 0; i < 3; i++) {
    shoppingList.push(listOfItems[Math.floor(Math.random() * 5)]);
  }
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
        score++;
        // Add time to timer
        break;
      }
    }
  }
  //randomizeShoppingList();
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