
class Scene {
	constructor(){
	}

	update(){
		return null;
	}

	draw(){
	}
	
	draw(resources){

		clearCanvas(resources.canvasCtx, resources.canvas, "white");

		this.objects.forEach(obj=>{
			resources.canvasCtx.save();
			resources.canvasCtx.translate(obj.pos.x, obj.pos.y);
			obj.draw(resources.canvasCtx, resources.images);
			resources.canvasCtx.restore();
		});

		if (this.player) {
			resources.canvasCtx.save();
			resources.canvasCtx.translate(this.player.pos.x, this.player.pos.y);
			this.player.draw(resources.canvasCtx, resources.images);
			resources.canvasCtx.restore();
		}
	}

	updateObjects(resources, inputs){
		const newObjs = [];

		if (this.player) {
			const result = this.player.update(resources, inputs);
			(result.newObjects || []).forEach(e =>{newObjs.push(e)});
		}

		this.objects.forEach(obj=>{
			const result = obj.update(resources, inputs);
			(result.newObjects || []).forEach(e => {newObjs.push(e)});
		});

		this.objects = this.objects.filter(obj=>(!obj.dead));
		Array.prototype.push.apply(this.objects, newObjs);
	}

	collisionCheck(){

		if(this.player){
			this.objects.forEach(e=>{
				if (isCollide(this.player, e)) {
					this.player.onCollide(e);
					e.onCollide(this.player);
				}
			})
		}

		for(let i=0; i<this.objects.length-1; i++){
			for(let j=i+1; j<this.objects.length; j++){
				if(isCollide(this.objects[i], this.objects[j])){
					this.objects[i].onCollide(this.objects[j]);
					this.objects[j].onCollide(this.objects[i]);
				}
			}
		}
	}
}