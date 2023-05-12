function Branch(begin, end) {
  // Constructor function used to create branch objects in the fractal tree.
  this.begin = begin;
  this.end = end;
  // The 'begin' and 'end' parameters represent the starting and ending points of the branch
  this.finished = false;
  // This property indicates whether the branch has completed its growth

  this.jitter = function() {
  // Displacement to the end point of the branch, creating a jittering effect
    this.end.x += random(-0.5, 0.5);
    this.end.y += random(-0.5, 0.5);
  }
  
  this.show = function() {
  // Responsible for displaying the branch as a line with a specified color and stroke weight
    stroke(102, 51, 0);
    strokeWeight(4);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y); 
  }
   
  this.branchA = function () {
  // calculates a new branch (a) by determining a direction vector from the current branch and rotating it by a predefined angle (PI / 8). The length of the new branch is reduced by a factor of 0.67. The new branch is then created using the updated end point
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 8);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var a = new Branch(this.end, newEnd);
    return a;
  }
  
  this.branchB = function () {
    // function is similar to branchA but rotates the direction vector in the opposite direction (-PI / 9) to create a different branch (b)
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI / 9);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    return b;
  }
}

