
class Kiritan extends GameObject {
	constructor(pos){
		super(pos, "kiritan", 
			new RectCollider(Vector(30,30), Vector(Kiritan.size.x-60, Kiritan.size.y-60)));
		this.size = Kiritan.size;
		this.maxSpeedX = 10
		
		this.accel = Vector(1, 1);
		this.cannonPos =
			{ right: Vector(58,18)
			, left : Vector(20,22)
			}

		this.state =
			{ speed : Vector(0, 0)
			, color : "black"
			, jumping : false
			, shotFrom : "right"
			, shotAngle : Math.PI * 1.1
			, fullBurst : false
			};

		this.animation =
			{ shooting : false
			, timer : 0
			}

		this.shotAngleMax = Math.PI + Math.PI/2;
		this.shotAngleMin = Math.PI - Math.PI/6;

		this.shotInterval = 40;
		this.aim = Vector(0,0);

		this.timers =
			{ shot : 0
			, fullBurst : 0
			};

        this.score = 0;

	}

	onCollide(obj){
	}

	update(res, inputs){
		const newObjs = [];

		this.updateTimers();

		this.aim = inputs.mouseState.pos;

		if(this.animation.timer > 0){
			this.animation.timer--;
		}

		if(inputs.keyStates[keys.up] && (!this.state.jumping) ){
			this.state.speed.y = -15;
			this.state.jumping = true;
		} else {
			this.state.speed.y += this.accel.y;
		}

		const accel_x = this.state.jumping ? (this.accel.x*0.1) : (this.accel.x);

		if (inputs.keyStates[keys.right]){
			this.state.speed.x += accel_x;
			if(this.state.speed.x > this.maxSpeedX){
				this.state.speed.x = this.maxSpeedX;
			}
		} else if (inputs.keyStates[keys.left]){
			this.state.speed.x -= accel_x;
			if(this.state.speed.x < -this.maxSpeedX){
				this.state.speed.x = -this.maxSpeedX;
			}
		} else {
			if (this.state.speed.x > 0){
				this.state.speed.x -= accel_x;
				if (this.state.speed.x < 0){
					this.state.speed.x = 0;
				}
			} else {
				this.state.speed.x += accel_x;
				if (this.state.speed.x > 0){
					this.state.speed.x = 0;
				}
			}
		}

		if( inputs.keyStates[keys.w] ){
			this.state.shotAngle += 0.02;
			if(this.state.shotAngle > this.shotAngleMax){
				this.state.shotAngle = this.shotAngleMax;
			}
		} else if (inputs.keyStates[keys.s]){
			this.state.shotAngle -= 0.02;
			if(this.state.shotAngle < this.shotAngleMin){
				this.state.shotAngle = this.shotAngleMin;
			}
		}

		this.pos = move(this.pos, this.state.speed);
		if (this.pos.y + this.size.y > res.canvas.height){
			this.state.jumping = false;
			this.pos.y = res.canvas.height - this.size.y;
			this.state.speed.y = 0;
		}

		if (this.pos.x < 0) {
			this.pos.x = 0;
			this.state.speed.x = 0;
		} else if (this.pos.x + this.size.x > res.canvas.width) {
			this.pos.x = res.canvas.width - this.size.x;
			this.state.speed.x = 0;
		}

		//shoot zundamochi
		if(inputs.mouseState.lbutton && this.timers.shot<=0){
			const speed = vscale( this.getShootVectorUnit(), 10 );
			const mochi = this.shoot(speed);
			res.sounds.shoot.play();

			newObjs.push(mochi)	;
		}

		if(this.state.fullBurst){
			if(this.timers.fullBurst>0){
				if(this.timers.fullBurst%3==0){
					const speed = vscale( this.getShootVectorUnit(), 10);
					const mochi = this.shoot(vrotate(speed, Math.random()*0.5-0.25));
					res.sounds.z.play();
					newObjs.push(mochi);
				}
			}else{
				this.state.fullBurst = false;
			}
		}

		if(inputs.keyStates[keys.t] && !this.state.fullBurst){
			this.state.fullBurst = true;
			this.timers.fullBurst = 200;
			//res.sounds.fullBurst.play();
		}

		if(this.animation.shooting && this.animation.timer<=0){
			this.animation.shooting = false;
		}

		return { newObjects: newObjs };
	}

	draw(ctx, imgs){
		ctx.save();
		if(this.animation.shooting){
			ctx.scale(0.9, 0.9);
		}

		const img = imgs.kiritan;
		ctx.drawImage(imgs.kiritan, 0, 0);

		const tmp = vsub(this.aim, this.pos);
		const cp = this.cannonPos[this.state.shotFrom];

		ctx.strokeStyle = "#ffcccc";
		ctx.beginPath();
		ctx.moveTo(cp.x, cp.y);
		ctx.lineTo(tmp.x, tmp.y);
		ctx.stroke();

		ctx.restore();
	}

	getShootVectorUnit(){
		return vunit( vsub(this.aim, vadd(this.pos, this.cannonPos[this.state.shotFrom]) ) );
	}

	shoot(speed){
		const cp = this.cannonPos[this.state.shotFrom];
		const mochi = new Mochi(vadd(this.pos, vadd(cp, Vector(-Mochi.size.x/2, -Mochi.size.y/2))), speed, this);

		if(this.state.shotFrom=="right") this.state.shotFrom = "left";
		else this.state.shotFrom = "right";

		this.animation.timer = 2;
		this.animation.shooting = true;

		this.timers.shot = this.shotInterval;

		return mochi;
	}

	hit(){
		this.score++;
	}
}

Kiritan.size = Vector(100,100);
