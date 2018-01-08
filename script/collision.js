
class RectCollider{
	constructor(pos, size){
		this.pos = pos;
		this.size = size;
	}
	draw(ctx){
		ctx.save();
		ctx.fillStyle = "purple";
		ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.restore();
	}
}

class CircleCollider {
	constructor(pos, rad){
		this.pos = pos;
		this.rad = rad;
	}
	draw(ctx){
		ctx.save();
		ctx.fillStyle = "purple";
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI*2, false);
		ctx.fill();
		ctx.restore();
	}
}

// each object must have a collider
const col_circle_rect = (obja, objb)=>{

	const cir_p = move(obja.pos, obja.collider.pos);
	const rbase = move(objb.pos, objb.collider.pos);
	const rect_corners = [ rbase 
	                     , move(rbase, Vector(objb.collider.size.x, 0))
	                     , move(rbase, Vector(objb.collider.size.x, objb.collider.size.y))
	                     , move(rbase, Vector(0, objb.collider.size.y))
	                     ];


	// attach from up and down
	if( (rect_corners[0].x <= cir_p.x) && (cir_p.x <= rect_corners[1].x) ){
		if( (rect_corners[0].y <= cir_p.y+obja.collider.rad) &&
		    (cir_p.y-obja.collider.rad <= rect_corners[3].y) ){

		    return true;
		}
	}

	// attach from right and left
	if( (rect_corners[0].y <= cir_p.y) && (cir_p.y <= rect_corners[3].y) ){
		if( (rect_corners[0].x <= cir_p.x+obja.collider.rad) &&
		    (cir_p.x-obja.collider.rad <= rect_corners[1].x) ){

		    return true;
		}
	}

	// attach to corners
	return rect_corners.map(corner=>{
		if( distance(corner, cir_p) <= obja.collider.rad ){
			return true;
		}
	}).reduce((p,c)=>(p||c));

	return false;
}

const col_rect_rect = (obja, objb)=>{
	const a_base = move(obja.pos, obja.collider.pos);
	const b_base = move(objb.pos, objb.collider.pos);

	const c1 = a_base.x <= b_base.x + objb.collider.size.x;
	const c2 = b_base.x <= a_base.x + obja.collider.size.x;
	const c3 = a_base.y <= b_base.y + objb.collider.size.y;
	const c4 = b_base.y <= a_base.y + obja.collider.size.y; 

	if( c1 && c2 && c3 && c4 ){
		return true;
	}
}

const col_circle_circle = (obja, objb)=>{
	const d = distance (move(obja.pos, obja.collider.pos), move(objb.pos, objb.collider.pos));
	if( d <= obja.collider.rad + objb.collider.rad ){
		return true;
	}
}

const isCollide = (obja, objb)=>{
	if(obja.collider==null || objb.collider==null)
		return false;

	if( obja.collider.constructor === RectCollider ){
		if (objb.collider.constructor === RectCollider ){
			return col_rect_rect(obja, objb);
		} else if (objb.collider.constructor === CircleCollider) {
			return col_circle_rect(objb, obja);
		}
	} else if (obja.collider.constructor === CircleCollider){
		if (objb.collider.constructor === RectCollider){
			return col_circle_rect(obja, objb);
		} else if (objb.collider.constructor === CircleCollider){
			return col_circle_circle(obja, objb);
		}
	}
}