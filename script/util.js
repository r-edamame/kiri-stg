
const clearCanvas = (ctx, cnv, color)=>{
	const col = color || "white";

	ctx.save();
	ctx.fillStyle = col;
	ctx.fillRect(0,0,cnv.width, cnv.height);
	ctx.restore();
}

const drawNumber = (ctx, numbers, pos, size, num) => {
	const numarray = [];

	for(let i=num; i>0; i=Math.floor(i/10)){
		numarray.push(i%10);
	}
	if(numarray.length==0){
		numarray.push(0);
	}

	numarray.forEach((n,i)=>{
		ctx.drawImage(numbers, n%5*100, Math.floor(n/5)*160, 100,160, pos.x-(i*size.x), pos.y, size.x, size.y);
	});
}