
const initMouse = (cnv)=>{
	const mouseState = {
		pos: Vector(0, 0),
		lbutton: false
	};

	window.addEventListener("mousemove", e=>{
		bcr = cnv.getBoundingClientRect();
		mouseState.pos.x = e.clientX - bcr.left;
		mouseState.pos.y = e.clientY - bcr.top;
	});

	window.addEventListener("mousedown", e=>{
		mouseState.lbutton = true;
	});

	window.addEventListener("mouseup", e=>{
		mouseState.lbutton = false;
	});

	return mouseState;
}