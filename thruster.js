class Thruster{
    constructor(ctxStarship){
        this.ctxStarship=ctxStarship;
        this.canvasFlame = document.createElement('canvas')
        this.ctxFlame = this.canvasFlame.getContext('2d');
        this.canvasFlame.addEventListener("contextmenu", function(event) {event.preventDefault();});

        this.canvasFlame.width = flameImage.width;
        this.canvasFlame.height = flameImage.height;
    };

    drawFrontLeftThruster(stage){
        switch (stage) {
            case 1:
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                this.ctxFlame.save();
                this.ctxFlame.translate(flameImage.width / 2, flameImage.height / 2);
                this.ctxFlame.rotate(Math.PI/2);
                this.ctxFlame.drawImage(flameImage, -flameImage.width / 2, -flameImage.height / 2);
                this.ctxStarship.drawImage(this.canvasFlame, -125, -159, 50, 50);
                this.ctxFlame.restore();
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                break;
            case 2:
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                this.ctxFlame.save();
                this.ctxFlame.translate(flameImage.width / 2, flameImage.height / 2);
                this.ctxFlame.rotate(Math.PI/2);
                this.ctxFlame.drawImage(flameImage, -flameImage.width / 2, -flameImage.height / 2);
                this.ctxStarship.drawImage(this.canvasFlame, -145, -168, 70, 70);
                this.ctxFlame.restore();
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                break;
        }
    }
    drawFrontRightThruster(stage){
        switch (stage) {
            case 1:
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                this.ctxFlame.save();
                this.ctxFlame.translate(flameImage.width / 2, flameImage.height / 2);
                this.ctxFlame.rotate(-(Math.PI/2));
                this.ctxFlame.drawImage(flameImage, -flameImage.width / 2, -flameImage.height / 2);
                this.ctxStarship.drawImage(this.canvasFlame, 70, -159, 50, 50); 
                this.ctxFlame.restore();
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                break;
            case 2:
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                this.ctxFlame.save();
                this.ctxFlame.translate(flameImage.width / 2, flameImage.height / 2);
                this.ctxFlame.rotate(-(Math.PI/2));
                this.ctxFlame.drawImage(flameImage, -flameImage.width / 2, -flameImage.height / 2);
                this.ctxStarship.drawImage(this.canvasFlame, 72, -168, 70, 70); 
                this.ctxFlame.restore();
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                break;
        }
    }
    drawBackLeftThruster(stage){
        switch (stage) {
            case 1:
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                this.ctxFlame.save();
                this.ctxFlame.translate(flameImage.width / 2, flameImage.height / 2);
                this.ctxFlame.rotate(Math.PI/2);
                this.ctxFlame.drawImage(flameImage, -flameImage.width / 2, -flameImage.height / 2);
                this.ctxStarship.drawImage(this.canvasFlame, -125, 67, 50, 50);
                this.ctxFlame.restore();
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                break;
            case 2:
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                this.ctxFlame.save();
                this.ctxFlame.translate(flameImage.width / 2, flameImage.height / 2);
                this.ctxFlame.rotate(Math.PI/2);
                this.ctxFlame.drawImage(flameImage, -flameImage.width / 2, -flameImage.height / 2);
                this.ctxStarship.drawImage(this.canvasFlame, -145, 58, 70, 70);
                this.ctxFlame.restore();
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                break;
        }
    }
    drawBackRightThruster(stage){
        switch (stage) {
            case 1:
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                this.ctxFlame.save();
                this.ctxFlame.translate(flameImage.width / 2, flameImage.height / 2);
                this.ctxFlame.rotate(-(Math.PI/2));
                this.ctxFlame.drawImage(flameImage, -flameImage.width / 2, -flameImage.height / 2);
                this.ctxStarship.drawImage(this.canvasFlame, 70, 67, 50, 50); 
                this.ctxFlame.restore();
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                break;
            case 2:
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                this.ctxFlame.save();
                this.ctxFlame.translate(flameImage.width / 2, flameImage.height / 2);
                this.ctxFlame.rotate(-(Math.PI/2));
                this.ctxFlame.drawImage(flameImage, -flameImage.width / 2, -flameImage.height / 2);
                this.ctxStarship.drawImage(this.canvasFlame, 72, 58, 70, 70); 
                this.ctxFlame.restore();
                this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
                
                break;
        }
    }
    drawTurnLeft(stage){
        this.drawFrontRightThruster(stage);
        this.drawBackLeftThruster(stage);
    }
    drawTurnRight(stage){
        this.drawFrontLeftThruster(stage);
        this.drawBackRightThruster(stage);
    }
    drawMainThruster(stage){
        this.ctxFlame.drawImage(flameImage, 0, 0);
        switch (stage) {
            case 1:
                //Main flame stage: 1
                this.ctxStarship.drawImage(this.canvasFlame, 0, 257, 70, 70); //Left flame
                this.ctxStarship.drawImage(this.canvasFlame, -73, 257, 70, 70); //Right flame
                break;
            case 2:
                //Main flame stage: 2
                this.ctxStarship.drawImage(this.canvasFlame, -11, 257, 90, 90); //Left flame
                this.ctxStarship.drawImage(this.canvasFlame, -84, 257, 90, 90); //Right flame
                break;
            case 3:
                //Main flame stage: 3
                this.ctxStarship.drawImage(this.canvasFlame, -22, 257, 110, 110); //Left flame
                this.ctxStarship.drawImage(this.canvasFlame, -92, 257, 110, 110); //Right flam
                break;
            case 4:
                //Main flame stage: 4
                this.ctxStarship.drawImage(this.canvasFlame, -32, 257, 130, 130); //Left flame
                this.ctxStarship.drawImage(this.canvasFlame, -102, 257, 130, 130); //Right flame
                break;
        }
    }
    drawBreakThruster(){
        this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
        this.ctxFlame.save();
        this.ctxFlame.translate(flameImage.width / 2, flameImage.height / 2);
        this.ctxFlame.rotate(Math.PI);
        this.ctxFlame.drawImage(flameImage, -flameImage.width / 2, -flameImage.height / 2);
        this.ctxStarship.drawImage(this.canvasFlame, 22, -260, 40, 50); //Left flame
        this.ctxStarship.drawImage(this.canvasFlame, -65, -260, 40, 50); //Right flame
        this.ctxFlame.restore();
        this.ctxFlame.clearRect(0,0,flameImage.width,flameImage.height);
    }
}