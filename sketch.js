var _width = 20;
var _height = 20;
var grid = [];
var stack = [];
var current;
function setup() {
	createCanvas(800, 600);
	for(var i=0; i < height/_height;i++){
		grid[i] = [];
	}
	//frameRate(5);
	for(var y=0; y < height/_height; y++){
		for(var x=0; x < width/_width;x++){
			grid[y][x] = new Cell(y*_height,x*_width);			
		}

	}
	current = grid[0][0];
}

function draw() {
	background(51);

	for(var y=0; y < height/_height; y++){
		for(var x=0; x < width/_width;x++){
			grid[y][x].drawCell();
		
		}

	}
	current.visited = true;
	current.highlight();
	var next_cell = current.checkNeighbors();
	if(next_cell){
		stack.push(current);
		next_cell.visited = true;

		if(current.x > next_cell.x){
			current.left_wall = false;
			next_cell.right_wall = false;
		}else if(current.x < next_cell.x){
			current.right_wall = false;
			next_cell.left_wall = false;
		}else if (current.y < next_cell.y){
			current.down_wall = false;
			next_cell.up_wall = false;
		}else if (current.y > next_cell.y){
			current.up_wall = false;
			next_cell.down_wall = false;

		}
		current = next_cell;
	}else if(stack.length > 0){
		current = stack.pop();
	}else if(stack.length === 0){
		noLoop();
	}


}

class Cell {
	constructor(y,x){
		this.y = y;
		this.x = x;
		this.up_wall = true;
		this.down_wall = true;
		this.right_wall = true;
		this.left_wall = true;
		this.visited = false;
	}
	highlight(){
		noStroke();
		fill(0,0,255,100);
		rect(this.x,this.y,_width,_height);
	}
	drawCell(){
		stroke(255);
		if(this.left_wall === true){
			line(this.x,this.y,this.x,this.y+_height);
		}
		if(this.up_wall === true){
			line(this.x,this.y,this.x+_width,this.y);
		}
		if(this.down_wall === true){
			line(this.x,this.y+_height,this.x+_width,this.y+_height);

		}
		if(this.right_wall === true){
			line(this.x+_width,this.y,this.x+_width,this.y+_height);

		}

		if(this.visited === true){
			noStroke();
			fill(255,10,101,100);
			rect(this.x,this.y,_width,_height);
		}
	}
	checkNeighbors(){
		var neighbor = [];
		if(this.y  > 0 && grid[(this.y/_height)-1][(this.x/_width)].visited === false){
			neighbor.push(grid[(this.y/_height)-1][(this.x/_width)]);
		}
		if(this.y +_height < height && grid[(this.y/_height)+1][(this.x/_width)].visited === false){
			neighbor.push(grid[(this.y/_height)+1][(this.x/_width)]);
		}
		if(this.x  > 0 && grid[(this.y/_height)][(this.x/_width)-1].visited === false){
			neighbor.push(grid[(this.y/_height)][(this.x/_width)-1]);
		}
		if(this.x +_width < width && grid[(this.y/_height)][(this.x/_width)+1].visited === false){
			neighbor.push(grid[(this.y/_height)][(this.x/_width)+1]);
		}
		if(neighbor.length > 0){
			var temp = floor(random(0,neighbor.length));
			return neighbor[temp];
		}else{
			return undefined;
		}
	}
}

