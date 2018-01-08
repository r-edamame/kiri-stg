
class GameObject {
	constructor(pos, tag, collider){
		this.pos = Object.assign({}, pos);
		this.tag = tag;
		this.collider = collider;
		this.dead = false;
	}

	onCollide(obj){
	}

	update(resources, gameObjects){
		return {};
	}

	draw(ctx){
	}

	updateTimers(){
		Object.entries(this.timers).forEach( t=>{
			if( t[1] > 0 ){
				this.timers[t[0]] = t[1]-1;
			}
		})
	}
}