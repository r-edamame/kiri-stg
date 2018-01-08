
class StartScene {
	constructor(){
		this.starting = false;
		this.timer = 0;
		this.mouse = null;
		this.titlecall = false;
	}

	update(res, inputs){

		if(!this.titlecall){
			res.sounds.titlecall.play();
			this.titlecall=true;
		}

		if(this.timer > 0){
			this.timer--;
		}

		this.mouse = inputs.mouseState;

		if(!this.starting && inputs.keyStates[keys.space]){
			this.starting = true;
			res.sounds.start.play();
			this.timer = 100;
		}

		if(this.starting && this.timer<=0){
			return new MainScene(new Kiritan(Vector(500,300)), [new ZunkoFactory()]);
		}

		return null;
	}
	draw(res){
		const ctx = res.canvasCtx;

		clearCanvas(ctx, res.canvas);

		ctx.save();
		ctx.drawImage(res.images.logo, 20, 20);
		ctx.restore();

		ctx.save();
		ctx.fillStyle = "gray";
		ctx.font = "30px 'Arial'";
		ctx.fillText("press space key", 200,400);

		if( this.mouse ){
			ctx.save();
			ctx.fillStyle = "red";
			ctx.beginPath();
			ctx.arc(this.mouse.pos.x, this.mouse.pos.y, 10, 0, Math.PI*2, false);
			ctx.fill();
			ctx.restore();
		}
	}
}