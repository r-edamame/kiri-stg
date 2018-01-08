
class GameoverScene extends Scene {

	constructor(player){
		super();
		this.player = player;
		this.objects = [];
		this.score = player.score;
		this.flag =
			{ comment : false
			};
	}

	update(resources, inputs){
		if(!this.flag.comment){
			if(this.score>45){
				resources.sounds.excellent.play();
			}else if(this.score>20){
				resources.sounds.well.play();
			}else{
				resources.sounds.bad.play();
			}
			this.flag.comment=true;
		}

		if(inputs.keyStates[keys.esc]){
			return new StartScene();
		}
		return null;
	}

	draw(res){
		res.canvasCtx.save();
		clearCanvas(res.canvasCtx, res.canvas, "white");
		res.canvasCtx.drawImage(res.images.kiritan_big, 50,200, 200, 200);
		res.canvasCtx.drawImage(res.images.result, 50,80, 200, 100);
		res.canvasCtx.drawImage(res.images.ko, 500, 250, 100, 100);
		drawNumber(res.canvasCtx, res.images.numbers, Vector(500,100), Vector(100,160), this.score);
		res.canvasCtx.fillStyle="gray";
		res.canvasCtx.fillText("press ESC to back", 190,400);
		res.canvasCtx.restore();
	}
}