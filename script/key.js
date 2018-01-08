
const initKeyStates = ()=>{
	const keyStates = {};

	window.addEventListener("keydown", key=>{
		keyStates[key.keyCode] = true;
	});

	window.addEventListener("keyup", key=>{
		keyStates[key.keyCode] = false;
	})

	return keyStates;
};

const keys = 
	Object.freeze({ up: 38
	, down: 40
	, right: 39
	, left: 37
	, space: 32
	, esc: 27
	, r: 82
	, w: 87
	, s: 83
	, t: 84
	});
	