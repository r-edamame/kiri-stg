
/*
 images = { imageName1 : url1, imageName2 : url2, ... }
*/

const loadImage = (name,src)=>new Promise((resolve,reject)=>{
	const img = new Image();
	img.onload = resolve([name,img]);
	img.onerror = reject;

	img.src = src;
});

const loadImages = (srcs)=>{
	const ps = Object.entries(srcs).map(e=>loadImage(e[0], e[1]));
	const images = {};
	return Promise.all(ps)
		.then(imgs=>{
			imgs.forEach(img=>{
				images[img[0]] = img[1];
			});
			return Promise.resolve(Object.freeze(images));
		});
};

class Game {
	constructor(config){
		this.load = true;

		this.src = {}
		this.resources = {}

		this.src.sounds = config.sounds;
		this.resources.sounds = {};
		Object.entries(config.sounds).forEach(e=>{
			this.resources.sounds[e[0]] = new Sound(e[1]);
		})
		console.log(this.resources.sounds);

		this.src.images = config.images;
		this.scene = config.initScene;
		this.resources.canvas = config.canvas;

		this.resources.canvasCtx = this.resources.canvas.getContext('2d');
		if( !this.resources.canvasCtx ){
			console.log("nothing context");
			this.load = false;
		}

	}

	run(){

		const keyStates = initKeyStates();
		const mouseState = initMouse(this.resources.canvas);
		const inputs = { keyStates: keyStates, mouseState: mouseState};

		loadImages(this.src.images)
		.then(imgs=>{
			console.log(imgs);
			this.resources.images = imgs;

			console.log(this);

			const intId = setInterval(()=>{
				const nextScene = this.scene.update(this.resources, inputs);
				this.scene.draw(this.resources);
				if(nextScene){
					this.scene = nextScene;
				}
			}, 1000/60);
		})
		.catch(()=>console.log("images can't load"))
	}

}