document.body.style.margin   = 0
document.body.style.overflow = `hidden`

var tree = [];
var leaves = [];
var fallingBranches = []; // new array

var count = 0;

function setup() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  createCanvas(w, h);;
    
  var a = createVector(width/2, height);
  var b = createVector(width/2, height-200);
  
  root = new Branch(a, b);
  
  tree[0] = root;
}

function windowResized () {
  resizeCanvas (window.innerWidth, window.innerHeight)
}

function mousePressed() {
  for (var i = tree.length-1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
      tree[i].finished = true;
    }
  }
  
  count++;
  
  if(count === 8){
    for (var i = 0; i < tree.length; i++){
      if (!tree[i].finished) {
         var leaf = tree[i].end.copy();
         leaves.push(leaf);
      }
    }
    dropBranches(); // call the new function
  }
}

function mouseDragged() {
  for (var i = 3; i < tree.length; i++) {
    tree[i].jitter();
  }
}

function dropBranches() {
  for (var i = 1; i < tree.length; i++) {
    fallingBranches.push(tree[i]);
  }
  tree.splice(1); // remove branches from index 1 onwards
}

function draw() {
  background(204, 226, 255);
  
  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }
  
  for (var i = 0; i < leaves.length; i++) {
    fill(0, 102, 51, 80);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 12);
    leaves[i].y += random(0, 2);
  }

  // update position of falling branches
  for (var i = 0; i < fallingBranches.length; i++) {
    var branch = fallingBranches[i];
    //branch.show();
    line(branch.end.x, branch.end.y, branch.end.x-4, branch.end.y-4)
    stroke(102, 51, 0);
    strokeWeight(4);
    branch.end.y += random(0, 2);
  }

  // remove branches that have fallen to the bottom
  for (var i = fallingBranches.length - 1; i >= 0; i--) {
    var branch = fallingBranches[i];
    if (branch.end.y >= height) {
      fallingBranches.splice(i, 1);
    }
  }

//reset count and generate branches again when all branches have fallen
  if (fallingBranches.length === 0 && count === 8) {
    count = 0;
    var a = createVector(width/2, height);
    var b = createVector(width/2, height-200);
    root = new Branch(a, b);
    tree[0] = root;
  }
}