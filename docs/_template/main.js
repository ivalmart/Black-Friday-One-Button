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

function update() {
  if (!ticks) {
  }
  char("a", 100, 100); //TV
  char("b", 25, 25); //xbox
  char("c", 130, 130); //shirt
  char("d", 170, 170); //engagement ring
  char("e", 170, 40); //pants
}
