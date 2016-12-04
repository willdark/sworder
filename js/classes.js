function player (x, y, canvasWidth, canvasHeight) {
	//sprite
	this.sprite = new createjs.Bitmap("resources/testicles.png");
	this.sprite.scaleX = .25;
	this.sprite.scaleY = .25;
	//this.sprite.graphics.beginFill("#4D0BB8").drawCircle(0,0,25);
	this.sprite.x = x;
	this.sprite.y = y;
	this.sprite.regX = 360;
	this.sprite.regY = 360;


	//movement variables
	var keyD = false;
	var keyS = false;
	var keyA = false;
	var keyW = false;

	var speed = 0;
	var speedX = 0;
	var speedY = 0;
	const accel = 0.20;
	const friction = 0.96;
	var maxSpeed = 5;

	//this.move = function() {};

	this.onKeyDown = function(event) {
		var keyCode = event.keyCode;
		switch (keyCode) {
			case 68: //d
				keyD = true;
				break;
			case 83: //s
				keyS = true;
				break;''
			case 65: //a
				keyA = true;
				break;
			case 87: //w
				keyW = true;
				break;
		}
	}

	this.onKeyUp = function(event) {
		var keyCode = event.keyCode;
		switch (keyCode) {
			case 68: //d
				keyD = false;
				break;
			case 83: //s
				keyS = false;
				break;''
			case 65: //a
				keyA = false;
				break;
			case 87: //w
				keyW = false;
				break;
		}
	}

	this.update = function(mouseX, mouseY) {
		

		if (speed <= maxSpeed && AnyKeyPressed()) {
			speed += accel;
		}

		if (keyD) {
			speedX = speed;
			//this.sprite.x += speed;
		}
		if (keyS) {
			speedY = speed;
			//this.sprite.y += speed;
		}
		if (keyA) {
			speedX = -speed;
			//this.sprite.x -= speed;
		}
		if (keyW) {
			speedY = -speed;
			//this.sprite.y -= speed;
		}

		this.sprite.x += speedX;
		this.sprite.y += speedY;
		this.enforceBoundaries();

		this.rotate(mouseX, mouseY);

		speed *= friction;
		speedX *= friction;
		speedY *= friction;
	
	}

	function AnyKeyPressed() {
		return (keyA || keyW || keyS || keyD)
	}

	this.enforceBoundaries = function() {
		if (this.sprite.x < 0) {
			this.sprite.x = 0;
		}
		if (this.sprite.x > canvasWidth) {
			this.sprite.x = canvasWidth;
		}
		if (this.sprite.y < 0) {
			this.sprite.y = 0;
		}
		if (this.sprite.y > canvasHeight) {
			this.sprite.y = canvasHeight;
		}
	}

	this.rotate = function(mouseX, mouseY) {
		var angle = Math.atan2(mouseY - this.sprite.y, mouseX - this.sprite.x);
		angle = angle * (180/Math.PI);

		if(angle < 0) {
			angle = 360 - (-angle);
		}

		this.sprite.rotation = 90 + angle;
	}

}