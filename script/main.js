
const images = {
	kiritan:        "img/kiritan_sized.png",
	kiritan_big:    "img/kiritan.png",
	mochi:          "img/mochi_sized.png",
	zunko_angry:    "img/zunko_angry_sized.png",
	zunko_sleep:    "img/zunko_sleep_sized.png",
	numbers:        "img/numbers.png",
	ko:             "img/ko.png",
	result:         "img/result.png",
	logo:           "img/logo.png",
}

const sounds = {
	start: 	    "sound/start.mp3",
	titlecall: 	"sound/titlecall.mp3",
	shoot: 	    "sound/shoot.mp3",
	//fullBurst: 	"sound/fullburst.mp3",
	z:          "sound/z.mp3",
	bad:        "sound/bad.mp3",
	well:       "sound/well.mp3",
	excellent: 	"sound/excellent.mp3"
}

window.addEventListener("load", ()=>{
	const canvas = document.getElementById("canvas");
	if( !canvas ){
		console.log("canvas does not found");
	} else {
		const game = new Game({
			images: images,
			sounds: sounds,
			initScene : new StartScene(),
			canvas: canvas
		});

		game.run();
	}
});
