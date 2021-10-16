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
let listOfItems
let itemSpawnTick
let tv_position
let xbox_position
let shirt_position
let engagement_position
let pants_position
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
