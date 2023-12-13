class Planet {
    constructor(name, positon, size, canvasBackground, ctxBackground, image, isSun = false) {
        this.name = name
        this.planetImage = image;
        this.canvasBackground = canvasBackground;
        this.ctxBackground = ctxBackground;
        this.height = size.height;
        this.width = size.width;
        this.positon = positon;
        this.distanceFromStarship;
        this.isSun = isSun;
        this.isHovered = false;

        //Nap gradiens
        if (isSun === true) {
            this.gradRadius = this.width / 2 + 200;
            this.gradientPosition = { x: this.positon.x, y: this.positon.y }
            this.sunGradient = this.ctxBackground.createRadialGradient(this.gradientPosition.x, this.gradientPosition.y, this.width / 2, this.gradientPosition.x, this.gradientPosition.y, this.gradRadius);
            this.sunGradient.addColorStop(0, 'rgba(249, 203, 36, 0.5)');
            this.sunGradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // transparent black
        }

        //Bolygó pályák
        if (isSun === false) {
            //Tehát nem a nap, mert csak a napnak van gradiense.
            //A pályákat a naphoz számoljuk
            this.ctxBackground.beginPath();
            this.ctxBackground.arc(-250, this.canvasBackground.height/scalefactor / 2, Math.sqrt(Math.pow((this.positon.x + 250), 2) + Math.pow(Math.abs(this.positon.y - (this.canvasBackground.height/scalefactor / 2)), 2)), 0, 2 * Math.PI); //Kezdőpont a nap
            this.ctxBackground.strokeStyle = "rgba(196, 196, 196, 0.3)";
            this.ctxBackground.stroke();
        }

        this.hoverGrad = ctxMain.createRadialGradient(this.positon.x*scalefactor, this.positon.y*scalefactor, this.height*scalefactor / 2 - 1*scalefactor, this.positon.x*scalefactor, this.positon.y*scalefactor, this.height*scalefactor / 2 + 30*scalefactor);
        this.hoverGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        this.hoverGrad.addColorStop(0.0001, 'rgba(0, 131, 255, 0.72)');
        this.hoverGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    update() {
        this.draw
    }
    draw() {
        if (this.isSun === true) {
            this.ctxBackground.beginPath();
            this.ctxBackground.arc(this.gradientPosition.x, this.gradientPosition.y, this.gradRadius, 0, 2 * Math.PI);
            this.ctxBackground.fillStyle = this.sunGradient;
            this.ctxBackground.fill();
        }
        this.ctxBackground.drawImage(this.planetImage, this.positon.x - (this.width / 2), this.positon.y - (this.height / 2), this.width, this.height);
    }

    drawHover() {
        if (this.distanceFromStarship < this.height*scalefactor / 2 + 70*scalefactor) {
            this.isHovered = true;
            //Highlight
            ctxMain.beginPath();
            ctxMain.arc(this.positon.x*scalefactor, this.positon.y*scalefactor, this.height*scalefactor / 2 + 30*scalefactor, 0, 2 * Math.PI);
            ctxMain.fillStyle = this.hoverGrad;
            ctxMain.fill();
        } else {
            this.isHovered = false;
        }
    }

    calcDistanceFromStarship(starshipPositin) {
        this.distanceFromStarship = Math.floor(Math.sqrt(Math.pow((starshipPositin.x - this.positon.x*scalefactor), 2) + Math.pow((starshipPositin.y - this.positon.y*scalefactor), 2)));
    }

    getIsHovered() {
        return { 
            isHovered: this.isHovered, 
            positon: this.positon, 
            areaRadius: this.height*scalefactor / 2 + 70*scalefactor, 
            name: this.name
        };
    }
}

class Moon {
    constructor(center, speed, radius, size, start = 0) {
        this.size = size;
        this.cordinates = this.generateCirclePoints(center.x*scalefactor, center.y*scalefactor, radius*scalefactor, speed);
        this.lastDrowedPoint = start;
    }
    generateCirclePoints(a, b, r, numPoints) {
        var points = [];
        for (var i = 0; i <= numPoints; i++) {
            var t = 2 * Math.PI * i / numPoints;
            var x = a + r * Math.cos(t);
            var y = b + r * Math.sin(t);
            points.push({ x: x, y: y });
        }
        return points;
    }
    draw() {
        if (0 < this.cordinates.length) {
            var cordinate = this.cordinates[this.lastDrowedPoint];
            ctxMain.drawImage(moonImage, cordinate.x - this.size.width*scalefactor / 2, cordinate.y - this.size.height*scalefactor / 2, this.size.width*scalefactor, this.size.height*scalefactor);
            this.lastDrowedPoint++;
            if (this.cordinates.length == this.lastDrowedPoint) this.lastDrowedPoint = 0;
        }
    }
}