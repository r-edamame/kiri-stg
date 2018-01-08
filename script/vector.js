
const Vector = (x,y) => ({x:x, y:y});
const move = (pos, delta)=>Vector(pos.x+delta.x, pos.y+delta.y);
const sqr = x=>(x*x);
const distance = (v1,v2) => Math.sqrt(sqr(v1.x-v2.x) + sqr(v1.y-v2.y));
const vadd = (v1, v2) => Vector(v1.x+v2.x, v1.y+v2.y);
const vsub = (v1, v2) => Vector(v1.x-v2.x, v1.y-v2.y);
const vscale = (v, s) => Vector(v.x*s, v.y*s);
const vlength = v => Math.sqrt(v.x*v.x + v.y*v.y)
const vunit = v => vscale( v, 1/vlength(v) );
const vrotate = (v, angle) => Vector(v.x*Math.cos(angle)-v.y*Math.sin(angle), v.x*Math.sin(angle)+v.y*Math.cos(angle));