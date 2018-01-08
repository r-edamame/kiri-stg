
class Zunko extends GameObject {
	constructor(pos, res){
		//super(pos, "zunko", RectCollider(Vector(91)(68))(16)(11));
		// (367,276) -> (425,309) size(58,33)

		super(pos, "zunko", new RectCollider(Vector(46,35), Vector(8,5)));

		this.speed = Vector(1.2, 0);

		this.dying = false;
		this.size = Zunko.size;

		this.animation =
			{ imgIndex : 0
			, timer : 0
			}

		this.images = [ "zunko_angry", "zunko_sleep" ];
	}

	draw(ctx, imgs){
		ctx.save();
		ctx.drawImage( imgs[this.images[this.animation.imgIndex]], 0, 0 );
		//ctx.fillStyle = "green";
		//ctx.fillRect(0,0,this.size.x, this.size.y);
		ctx.restore();
	}

	update(res, objs){

		if( this.animation.timer > 0 ){
			this.animation.timer--;
		}

		if(!this.dying){
			this.pos = move(this.pos, this.speed);
		}

		if( this.pos.x >= res.canvas.width){
			this.dead = true;
		}

		if( this.dying && this.animation.timer <= 0){
			this.dead = true;
		}

		return {};
	}

	onCollide(obj){

		if(obj.tag === "mochi"){
			this.dying = true;
			this.animation.timer = 20;
			this.animation.imgIndex = 1;

			this.collider = null;
		}
	}

}

Zunko.size = Vector(100,100);

class ZunkoFactory extends GameObject {
	constructor(){
		super(Vector(0,0), "ZunkoFactory", null);

		this.state = { timer : 100 };
	}

	draw(){
	}

	update(res){
		const newObjs = [];
		if(this.state.timer > 0){
			this.state.timer--;
		}

		if( this.state.timer <= 0){
			const y = (Math.random()*(res.canvas.height-300))+50;
			const z = new Zunko(Vector(0, y), res);
			newObjs.push(z);

			this.state.timer = 50;
		}

		return { newObjects: newObjs };
	}
}