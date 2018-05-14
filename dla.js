



var search = location.search.trim().substring(1);
var settings = {};

if(search){
	
	search = search.split('&');

	for(var i = 0; i < search.length; i++){
		if(search[i]){
			search[i] = search[i].split('=');

			settings[search[i][0]] = search[i][1];
		}
	}
}



var canvasContainer = document.getElementById("canvasContainer");

var canvas = document.getElementById("renderCanvas");
var context = canvas.getContext("2d");

var scale = 0.5;

if(settings.scale){
	scale = settings.scale;
}

var height = ~~(canvasContainer.clientHeight*scale);
var width = ~~(canvasContainer.clientWidth*scale);

canvas.height = height;
canvas.width = width;

canvas.style.height = height/scale +"px";
canvas.style.width = width/scale +"px";

var world = new Uint8Array(height*width);

// populate seed

switch(settings.seed){
	case "ground":
		for(var i = 0; i < width; i++){
			world[(height-1)*width+i] = 1;
		}
	break;
	
	case "sky":
		for(var i = 0; i < width; i++){
			world[i] = 1;
		}
	break;
	
	case "box":
		for(var i = 0; i < width; i++){
			world[(height-1)*width+i] = 1;
		}

		for(var i = 0; i < width; i++){
			world[i] = 1;
		}

		for(var i = 0; i < height; i++){
			world[i*width] = 1;
		}

		for(var i = 0; i < height; i++){
			world[i*width+width-1] = 1;
		}
	break;
	
	case "random":
		var seeds = 10;
		
		if(settings.randomSeeds){
			seeds = settings.randomSeeds
		}
		
		for(var i = 0; i < seeds; i++){
			world[~~(Math.random()*height*width)] = 1;
		}
		
	break;
	
	case "center":
	default:
		world[~~(height/2)*width+~~(width/2)] = 1;
	break;
}

var walkerCount = 16000;

if(settings.particles){
	walkerCount = settings.particles;
}


var walkers = [];

while(walkers.length < walkerCount){
	addWalker();
}

function addWalker(){
	walkers.push([~~(Math.random()*width), ~~(Math.random()*height)]);
}

function moveWalkers(){
	for(var i = 0; i < walkers.length; i++){
		var newX;
		var newY;
		do {
			newX = walkers[i][0] + ~~(Math.random()*3)-1;
		} while(!(newX >= 0 && newX < width));
		
		do {
			newY = walkers[i][1] + ~~(Math.random()*3)-1;
		} while(!(newY >= 0 && newY < height));

		walkers[i][0] = newX;
		walkers[i][1] = newY;

		//walkers[i][0] = mod(walkers[i][0] + ~~(Math.random()*3)-1, width);
		//walkers[i][1] = mod(walkers[i][1] + ~~(Math.random()*3)-1, height);

		var touching = false;
		var hue = 0;

		var newX;
		var newY;
	
		for(var x = -1; x <= 1; x++){
			for(var y = -1; y <= 1; y++){
				newX = walkers[i][0]+x;
				newY = walkers[i][1]+y;
				
				if(newX < 0 || newX >= width || newY < 0 || newY >= height){
					continue;
				}
				var pos = newY*width + newX;
				if(world[pos] !== 0){
					hue = world[pos];
					touching = true;
					break;
				}
			}
		}

		if(touching){
			hue = (hue+1) % 256;
			if(hue == 0){
				hue++;
			}
			world[width*walkers[i][1] + walkers[i][0]] = hue;
			walkers.splice(i, 1);
			i--;
		}
	}
}



var imageData = context.getImageData(0, 0, width, height);
var data = imageData.data;

function render(){
	for(var i = 0; i < world.length; i++){
		if(world[i] === 0){
			/*data[i*4  ] = 0;
			data[i*4+1] = 0;
			data[i*4+2] = 0;*/
			data[i*4+3] = 0;
		} else {
			var rgb = hueToRGB(world[i]/256);
			data[i*4  ] = rgb[0];
			data[i*4+1] = rgb[1];
			data[i*4+2] = rgb[2];
			data[i*4+3] = 255;
		}
	}

	for(var i = 0; i < walkers.length; i++){
		var pos = 4*(width*walkers[i][1] + walkers[i][0]);
		data[pos  ] = 255;
		data[pos+1] = 0;
		data[pos+2] = 0;
		data[pos+3] = 255;
	}

	context.putImageData(imageData, 0, 0);
}

function step(){
	if(settings.realtime == "true"){
		moveWalkers();
	} else {
		var startTime = window.performance.now();
		var i = 0;
		while(true){
			moveWalkers();
			if(window.performance.now() - startTime > 15){
				break;
			} 
		}
	}
	render();
	if(walkers.length > 0){
		requestAnimationFrame(step);
	}
}


step();




function hueToRGB(hue) {
	var h = hue, s = 0.9, v = 0.7;
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [~~(r * 256), ~~(g * 256), ~~(b * 256)];
}

function mod(n, m) { // because -4 % 10 == -4
	return ((n % m) + m) % m;
}
























