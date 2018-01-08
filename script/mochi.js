
class Mochi extends GameObject {
	constructor(pos, speed, parent){
		super(pos, "mochi", new CircleCollider(Vector(21,21),15));
		
		this.parent = parent;
		this.size = Mochi.size;
		this.rad = 25;
		this.accel = Vector(0, 0.1);
		this.state =
			{ speed : speed
			}
	}

	update(res){

		this.state.speed.y += this.accel.y;

		this.pos = move(this.pos, this.state.speed);

		if( this.pos.y > res.canvas.height){
			this.dead = true;
		}

		return {};
	}

	draw(ctx, imgs){
		ctx.save();
		const img = imgs.mochi;
		ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.size.x, this.size.y);
		ctx.restore();
	}

	onCollide(obj){
		if(obj.tag === "zunko"){
			this.dead = true;
			this.parent.hit();
		}
	}
}

Mochi.size = Vector(50,50);