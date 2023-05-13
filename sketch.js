let blueFlower;
let redTulip;
let chrysanthemum;
let leafBush;
let plainBouquet;
let wrapppingIcon;
let blueribbon;
let ribbonIcon;
let flowerIcon;

let flowers = [];

function preload() {
  blueFlower = loadImage('finaldata/blue_flower.png');
  redTulip = loadImage('finaldata/red_tulip.png');
  chrysanthemum = loadImage ('finaldata/chrysanthemum.png');
  leafBush = loadImage('finaldata/leaf_bushel.png');


  plainBouquet = loadImage ('finaldata/plainBouquet.png');

  wrappingIcon = loadImage ('finaldata/wrappingicon.png');
  ribbonIcon = loadImage ('finaldata/ribbonIcon.png');
  flowerIcon = loadImage ('finaldata/flowerIcon.png');


  blueRibbon = loadImage ('finaldata/blueRibbon.png');
  orangeRibbon = loadImage ('finaldata/orangeRibbon.png');
  cyanRibbon = loadImage ('finaldata/cyanRibbon.png');
  pinkRibbon = loadImage ('finaldata/pinkRibbon.png');
}

function setup() {
  createCanvas(1000, 1000);  

  flowers.push({img: blueFlower, x: 100, y: 20, w: 50, h: 150});
  flowers.push({img: redTulip, x: 200, y: 20, w: 50, h: 150});
  flowers.push({img: chrysanthemum, x: 300, y: 20, w: 50, h: 150});
  flowers.push({img: leafBush, x: 400, y: 20, w: 50, h: 150});
  

  
}

function draw() {
  background(215, 204, 224);
  

  for (let i = 0; i < flowers.length; i++) {
    let flower = flowers[i];
    image(flower.img, flower.x, flower.y, flower.w, flower.h);
    image(wrappingIcon, 50, 250, 50, 50);
    image(ribbonIcon, 50, 450, 50, 50);
    image(flowerIcon, 50, 650, 50, 50);

    

    if (mouseIsPressed) {
      if (mouseX > flower.x && mouseX < flower.x + flower.w &&
          mouseY > flower.y && mouseY < flower.y + flower.h) {
        flower.x = mouseX - flower.w / 2;
        flower.y = mouseY - flower.h / 2;
      }
    }
  }

  image(plainBouquet, (width/2) - 90 , (height/2) - 90, 150, 250);
}