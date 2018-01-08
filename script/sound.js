
class Sound {
	constructor(url){
		this.src = url;
		this.audio = new Audio(url);
		this.playing = [];
	}
	play(conf){
		this.audio.addEventListener("ended", e=>{
			this.playing.shift();
		});

		conf = conf || {};
		this.audio.volume = conf.volume || 1.0;
		this.audio.play();
		this.playing.push(this.audio);
		
		this.audio = new Audio(this.src);
	}

	stop(){
		this.playing.forEach(e=>{
			e.pause();
		});
		this.playing = [];
	}

	loopPlay(){
		this.audio.loop = true;
		this.play();
	}
}