let plainBouquet;
let blueFlower;
let redTulip;
let chrysanthemum;
let leafBush;
let wrappingIcon;
let blueRibbon;
let ribbonIcon;
let flowerIcon;

let flowers = [];
let showFlowers = false;
let selectedFlower = null;

let showPlainBouquet = false;

let ribbons = [];
let showRibbons = false;
let selectedRibbon = null;
let finalRibbon = null;

function preload() {
  wrappingIcon = loadImage("finaldata/wrappingicon.png");
  ribbonIcon = loadImage("finaldata/ribbonIcon.png");
  flowerIcon = loadImage("finaldata/flowerIcon.png");

  blueRibbon = loadImage("finaldata/blueRibbon.png");
  orangeRibbon = loadImage("finaldata/orangeRibbon.png");
  cyanRibbon = loadImage("finaldata/cyanRibbon.png");
  pinkRibbon = loadImage("finaldata/pinkRibbon.png");

  blueFlower = loadImage("finaldata/blue_flower.png");
  redTulip = loadImage("finaldata/red_tulip.png");
  chrysanthemum = loadImage("finaldata/chrysanthemum.png");
  leafBush = loadImage("finaldata/leaf_bushel.png");

  plainBouquet = loadImage("finaldata/plainBouquet.png");

  flowers.push({ img: blueFlower, x: 100, y: 20, w: 50, h: 150, gen: true});
  flowers.push({ img: redTulip, x: 200, y: 20, w: 50, h: 150, gen: true });
  flowers.push({ img: chrysanthemum, x: 300, y: 20, w: 50, h: 150, gen: true });
  flowers.push({ img: leafBush, x: 400, y: 20, w: 50, h: 150, gen: true });

  ribbons.push({ img: blueRibbon, x: 100, y: 70, w: 70, h: 70 });
  ribbons.push({ img: orangeRibbon, x: 200, y: 70, w: 70, h: 70 });
  ribbons.push({ img: cyanRibbon, x: 300, y: 70, w: 70, h: 70 });
  ribbons.push({ img: pinkRibbon, x: 400, y: 70, w: 70, h: 70 });
}

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(215, 204, 224);
  image(wrappingIcon, 50, 250, 50, 50);
  image(ribbonIcon, 50, 450, 50, 50);
  image(flowerIcon, 50, 650, 50, 50);

  if (showFlowers) {
    for (let i = 0; i < flowers.length; i++) {
      let flower = flowers[i];
      if (flower === selectedFlower) {
        // console.log(flower)
        // Apply tint to selected flowers
        tint(203, 195, 227); 
      } else {
        // No tint for other flowers
        noTint(); 
      }
      image(flower.img, flower.x, flower.y, flower.w, flower.h);
    }
  }

  if (showPlainBouquet) {
    image(plainBouquet, width / 2 - 90, height / 2 - 90, 150, 250);
  }
  if (showRibbons && !finalRibbon) {
    for (j = 0; j < ribbons.length; j++) {
      let ribbon = ribbons[j];
      if (ribbon === selectedRibbon) {
        // Apply tint to selected ribbon
        tint(240, 248, 255); 
      } else {
        // No tint for other ribbons
        noTint(); 
      }
      image(ribbon.img, ribbon.x, ribbon.y, ribbon.w, ribbon.h);
    }
  }
  if (finalRibbon) {
    image(finalRibbon.img, finalRibbon.x, finalRibbon.y, finalRibbon.h, finalRibbon.w)
  }
}

function mousePressed() {
  // Check if mouse is over a ribbon
  if(!finalRibbon){
    for (let i = 0; i < ribbons.length; i++) {
      let ribbon = ribbons[i];
      // console.log(ribbon)
      if (
        mouseX > ribbon.x &&
        mouseX < ribbon.x + ribbon.w &&
        mouseY > ribbon.y &&
        mouseY < ribbon.y + ribbon.h
      ) {
        // Select the ribbon
        selectedRibbon = ribbon;
        offsetX = mouseX - ribbon.x;
        offsetY = mouseY - ribbon.y;
        // Stop checking other ribbons
        break; 
      }
    }
  }


  // Check if mouse is over a flower only if not above a ribbon
  if (!selectedRibbon) {
    for (let i = 0; i < flowers.length; i++) {
      let flower = flowers[i];
      if (
        mouseX > flower.x &&
        mouseX < flower.x + flower.w &&
        mouseY > flower.y &&
        mouseY < flower.y + flower.h
      ) {
        // Select the flower
        selectedFlower = flower;
        console.log(selectedFlower)
        if (
          mouseX > selectedFlower.x &&
          mouseX < selectedFlower.x+selectedFlower.w &&
          mouseY > selectedFlower.y  &&
          mouseY < selectedFlower.y+selectedFlower.h &&
          selectedFlower.gen
        ) {
          selectedFlower.gen=false;
    
          // Generate a new flower at the same coordinates
          const x = selectedFlower.x;
          const y = selectedFlower.y;
          const w = 50;
          const h = 150;
          // Get the image of the selected flower
          const img = selectedFlower.img; 
          // Add a new flower object to the array
          flowers.push({ img, x, y, w, h, gen:true }); 
        }
        offsetX = mouseX - flower.x;
        offsetY = mouseY - flower.y;
        // Stop checking other flowers
        break; 
      }
    }
  }

  if (mouseX > 50 && mouseX < 100 && mouseY > 250 && mouseY < 300) {
    // Show plainBouquet when wrappingIcon is clicked
    showPlainBouquet = !showPlainBouquet;
  }
    // Show showRibbons when ribbonIcon is clicked
  if (mouseX > 50 && mouseX < 100 && mouseY > 450 && mouseY < 500) {
    showRibbons = !showRibbons;
  }
    // Show showRibbons when flowerIcon is clicked
  if (mouseX > 50 && mouseX < 100 && mouseY > 650 && mouseY < 700) {
    showFlowers = !showFlowers;
  }
}

function mouseReleased() {
  // Deselect the flower
  selectedFlower = null;

  // Deselcts ribbon and checks if ribbon in final position
  let ribbon = selectedRibbon
  if (ribbon &&
    ribbon.x > 450 &&
    ribbon.x < 500 + ribbon.w &&
    ribbon.y > 550 &&
    ribbon.y < 600 + ribbon.h &&
    showPlainBouquet
  ) {
    finalRibbon = ribbon
    console.log('Final Ribbon Achieved')
  }
  selectedRibbon = null;
}

function mouseDragged() {
  // Move the selected flower with the mouse
  if (selectedFlower) {
    selectedFlower.x = mouseX - offsetX;
    selectedFlower.y = mouseY - offsetY;
  }

  // Move the selected ribbon with the mouse
  if (selectedRibbon) {
    selectedRibbon.x = mouseX - offsetX;
    selectedRibbon.y = mouseY - offsetY;
  }
}
