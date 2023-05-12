document.body.style.margin   = 0
document.body.style.overflow = `hidden`

var tree = []; // Array to store branches of the tree
var leaves = []; // Array to store leaves of the tree
var fallingBranches = []; // Array to store falling branches
var count = 0; // Counter for tracking number of times mouse is pressed

function setup() {
  let w = windowWidth;
  let h = windowHeight;
  createCanvas(w, h);
  
  // Create root branch at the center bottom of the canvas
  var a = createVector(width/2, height);
  var b = createVector(width/2, height-200);
  root = new Branch(a, b);
  // Add the root to the tree array
  tree[0] = root;
}

function mousePressed() {
  // Generate new branches from existing branches and mark the previous ones as finished
  for (var i = tree.length-1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
      tree[i].finished = true;
    }
  }
  // The same code block is repeated so there is two generations per mouse press
  for (var i = tree.length-1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
      tree[i].finished = true;
    }
  }
  
  count++; // Increment counter
  
  // Attach leaves to the last branches in the array after 4 mouse presses
  if(count === 4){
    for (var i = 0; i < tree.length; i++){
      if (!tree[i].finished) {
         var leaf = tree[i].end.copy();
         leaves.push(leaf);
      }
    }
    dropBranches(); // Call the function to drop branches
  }
}

function mouseDragged() {
  // Give jitter effect to branches on mouse drag
  for (var i = 3; i < tree.length; i++) {
    tree[i].jitter();
  }
}

function dropBranches() {
  // Move branches to the fallingBranches array for animation
  for (var i = 1; i < tree.length; i++) {
    fallingBranches.push(tree[i]);
  }
  tree.splice(1); // Remove branches from index 1 onwards
}

function draw() {
  background(204, 226, 255); 
  
  // Display all branches of the tree
  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }
  
  for (var i = 0; i < leaves.length; i++) {
    // Display all leaves with animation
    fill(0, 102, 51, 80);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 12);
    leaves[i].y += random(-2, 6);
    leaves[i].x += random(-1, 1);
  }

  // Update position of falling branches and animate them
  for (var i = 0; i < fallingBranches.length; i++) {
    var branch = fallingBranches[i];
    ellipse(branch.end.x, branch.end.y, 4);
    fill(102, 51, 0, 95);
    noStroke();
    branch.end.y += random(-2, 6);
  }

  // Remove branches that have fallen to the bottom
  for (var i = fallingBranches.length - 1; i >= 0; i--) {
    var branch = fallingBranches[i];
    if (branch.end.y >= height) {
      fallingBranches.splice(i, 1);
    }
  }

  //Reset count and generate branches again when all branches have fallen
  if (fallingBranches.length === 0 && count === 4) {
    count = 0;
    var a = createVector(width/2, height);
    var b = createVector(width/2, height-200);
    root = new Branch(a, b);
    tree[0] = root;
  }
}
