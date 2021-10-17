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

const G = {
  WIDTH: 200,
  HEIGHT: 200
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
// let walls;

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

  color("light_cyan")
  let thePlayer = box(player.pos, 10)
  color("black")

  player.pos = vec(input.pos.x, input.pos.y);
  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);

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

// // Places the walls into a list to save for the game
// function spawnWalls() {
//   // adds the borders to list of walls for coordinates
//   walls.push(new WallObj(G.WIDTH / 2, 4, G.WIDTH, 7, "border"));
//   walls.push(new WallObj(G.WIDTH / 2, G.HEIGHT - 3, G.HEIGHT, 7, "border"));
//   walls.push(new WallObj(4, G.WIDTH / 2, 7, G.HEIGHT, "border"));
//   walls.push(new WallObj(G.WIDTH - 3, G.WIDTH / 2, 7, G.HEIGHT, "border"));
//   // adds isle walls to the list for coordinates
//   walls.push(new WallObj(G.WIDTH / 4, G.HEIGHT / 2, 10, 5, "isle"));
// }

// // When checking collision against walls, the border will be color("light_blue") and isles will be color("purple")
// function drawWalls() {
//   // draws borders of the map
//   color("light_blue");
//   box(G.WIDTH / 2, 4, G.WIDTH, 7);
//   box(G.WIDTH / 2, G.HEIGHT - 3, G.HEIGHT, 7);
//   box(4, G.WIDTH / 2, 7, G.HEIGHT);
//   box(G.WIDTH - 3, G.WIDTH / 2, 7, G.HEIGHT);
//   // draws 3 walls for the map
//   color("purple");
//   box(G.WIDTH / 4, G.HEIGHT / 2, 10, 5);
// }

// class WallObj {
//   // (x1, y1) has coordinates for top left of box | (x2, y2) has coordinates for bottom right
//   constructor(x, y, w, h, type) {
//     this.x1 = x;
//     this.y1 = y;
//     this.width = w;
//     this.height = h;
//     this.x2 = x + w;
//     this.y2 = y + h;

//     // can be either border or isle
//     this.type = type;
//   }
// }

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