
class MainScene extends Scene {

	constructor(player, objects){
		super();
		this.player = player;
		this.objects = objects;
		this.timer = 3000;
	}

	update(resources, inputs){

		this.timer--;

		this.updateObjects(resources, inputs);

		this.collisionCheck();

		if (this.timer <= 0){
			return new GameoverScene(this.player);
		} else {
			return null;
		}
	}
}