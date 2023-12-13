class Starship {
    constructor(positon) {
        this.canvasStarship = document.createElement('canvas');
        this.ctxStarship = this.canvasStarship.getContext('2d');
        this.canvasStarship.addEventListener("contextmenu", function(event) {event.preventDefault();});
        
        this.height = 150*scalefactor;                                                      //Űrhajó magassága.
        this.width = this.height;                                                           //Űrhajó szélessége, csak négyzet lehet.
        this.positon = positon;

        this.canvasStarship.width = starshipImage.width;                                    //Ebbe rajzoljuk a hajót, akkora lesz a canvas mint a beállított kép
        this.canvasStarship.height = starshipImage.height;                                  //A canvast mozgatjuk.
        this.ctxStarship.translate(starshipImage.width / 2, starshipImage.width / 2);       //Központosítás miatt.

        this.road = { roadCordinates: [], roadOriginalLength: 0 };                          //Mozgás során azok a pontok, amikre ki kell rajzolni az űrhajót.
        this.angle = { hatralevoElfordulas: 0, teljesElfordulas: 0};;                       //Az a szög amennyit fordulni kell.
        this.elfordulas = 0;                                                                //Aktuális elfordulás a 0 ponttól.
        
        this.thruster = new Thruster(this.ctxStarship);                                     //Thruster osztály példánya
    }

    update() {
        this.ctxStarship.clearRect(-starshipImage.width / 2, -starshipImage.width / 2, this.canvasStarship.width*2, this.canvasStarship.height*2);

        //Forgatás
        let angleRotatedPercentage =  100 - Math.floor(this.angle.hatralevoElfordulas/this.angle.teljesElfordulas*100);
        if (this.elfordulas >= 360) this.elfordulas = this.elfordulas - 360; //Túlfordulás védelem
        if (this.elfordulas <= -360) this.elfordulas = this.elfordulas + 360; //Túlfordulás védelem
        if (this.angle.hatralevoElfordulas != 0) {
            if (this.angle.hatralevoElfordulas > 0) { //Jobbra forgatunk
                if(angleRotatedPercentage <= 10 || 90 <= angleRotatedPercentage) {
                    this.ctxStarship.rotate( (Math.PI / 180)); //1 fokot forgatunk 
                    this.angle.hatralevoElfordulas --;
                    this.elfordulas ++;
                }else{
                    this.ctxStarship.rotate(2* (Math.PI / 180)); //2 fokot forgatunk 
                    this.angle.hatralevoElfordulas -= 2;
                    this.elfordulas +=2;
                }
            }
            else { //Balra forgatunk
                if(angleRotatedPercentage <= 10 || 90 <= angleRotatedPercentage) {
                    this.ctxStarship.rotate(-(Math.PI / 180)); //1 fokot forgatunk
                    this.angle.hatralevoElfordulas++;
                    this.elfordulas--;
                }else{
                    this.ctxStarship.rotate(2* -(Math.PI / 180)); //2 fokot forgatunk 
                    this.angle.hatralevoElfordulas += 2;
                    this.elfordulas -=2;
                }         
            }
        }
        this.ctxStarship.drawImage(starshipImage, -starshipImage.width / 2, -starshipImage.height / 2);

        //Rotate right thruster
        if(0 < this.angle.hatralevoElfordulas) {
            if(angleRotatedPercentage <= 10) this.thruster.drawTurnRight(1);
            if(10 < angleRotatedPercentage && angleRotatedPercentage <= 40) this.thruster.drawTurnRight(2);
            if(70 < angleRotatedPercentage) this.thruster.drawTurnLeft(1);
        }
        //Rotate left thruster
        if(this.angle.hatralevoElfordulas < 0) {
            if(angleRotatedPercentage <= 10) this.thruster.drawTurnLeft(1);
            if(10 < angleRotatedPercentage && angleRotatedPercentage <= 40)this.thruster.drawTurnLeft(2);
            if(70 < angleRotatedPercentage) this.thruster.drawTurnRight(1);
        }

        //Mozgatás a road array segítségével
        if (this.road.roadCordinates.length > 0 && this.angle.hatralevoElfordulas == 0) {
            //Gyorsítás, kihagyunk képkockákat
            let roadTraveledPercentage = Math.floor(100 - (this.road.roadCordinates.length / this.roadOriginalLength * 100)) + 1;
            let numberOfShifting = 0;
            if ((2 < roadTraveledPercentage && roadTraveledPercentage <= 6) || (94 <= roadTraveledPercentage && roadTraveledPercentage < 98)) numberOfShifting = 1;
            if (6 < roadTraveledPercentage && roadTraveledPercentage <= 12 || (88 <= roadTraveledPercentage && roadTraveledPercentage < 94)) numberOfShifting = 2;
            if (12 < roadTraveledPercentage && roadTraveledPercentage <= 15 || (85 <= roadTraveledPercentage && roadTraveledPercentage < 88)) numberOfShifting = 3;
            if (15 < roadTraveledPercentage && roadTraveledPercentage < 85) numberOfShifting = 4;
            if (20 < roadTraveledPercentage && roadTraveledPercentage < 80 && this.roadOriginalLength>1000) numberOfShifting = 20; //super speed
            for (let i = 0; i < numberOfShifting; i++) {
                if(this.road.roadCordinates.length==1) break;
                this.road.roadCordinates.shift();
            }

            //Main flame, nem mehet végig a hajtómű, az űrben sem így van.
            if(roadTraveledPercentage <= 50) this.thruster.drawMainThruster((numberOfShifting>4 ? 4 : numberOfShifting));

            //Dinaikusan álljon le a hajtómű.
            if(40 < roadTraveledPercentage && roadTraveledPercentage < 45) this.thruster.drawMainThruster(2);

            //Break flame
            if(60 < roadTraveledPercentage) this.thruster.drawBreakThruster();
            
            //Mozgatás
            var actualStep = this.road.roadCordinates.shift();
            this.positon.x = actualStep.x;
            this.positon.y = actualStep.y;
        }
        
        this.draw();
    }

    draw() {
        //A közepe lesz a kirajzolási pont
        ctxMain.drawImage(this.canvasStarship, this.positon.x - (this.width / 2), this.positon.y - (this.height / 2), this.width, this.height);
    }

    calcCordanates(click) {
        let cordinates = { x: 0, y: 0, click: { x: (click.x+mainPosition.x), y: (click.y+mainPosition.y)} };

        cordinates.x = cordinates.click.x - starship.positon.x;
        if (cordinates.click.y < starship.positon.y) {
            cordinates.y = starship.positon.y - cordinates.click.y;
        } else {
            cordinates.y = -(cordinates.click.y - starship.positon.y);
        }
        cordinates.x=Math.floor(cordinates.x);
        cordinates.y=Math.floor(cordinates.y);
        if(cordinates.x===0 && cordinates.y === 0) return false;
        return cordinates;

    }

    calcAngle(cordiantes) {
        //Forgatási szög kiszámítása
        let atfogo = Math.sqrt(Math.pow(cordiantes.x, 2) + Math.pow(cordiantes.y, 2));
        if (cordiantes.x > 0) {
            if (cordiantes.y > 0) {
                //1. negyed
                this.angle.hatralevoElfordulas = Math.floor(Math.asin(cordiantes.x / atfogo) * (180 / Math.PI));
            } else {
                //2. negyed
                this.angle.hatralevoElfordulas = (90 - Math.floor(Math.asin(cordiantes.x / atfogo) * (180 / Math.PI))) + 90;
            }
        } else {
            if (cordiantes.y > 0) {
                //4. negyed
                this.angle.hatralevoElfordulas = 360 - (-(Math.floor(Math.asin(cordiantes.x / atfogo) * (180 / Math.PI))));
            } else {
                //3. negyed
                this.angle.hatralevoElfordulas = -(Math.floor(Math.asin(cordiantes.x / atfogo) * (180 / Math.PI))) + 180;
            }
        }

        if (this.angle.hatralevoElfordulas > this.elfordulas) {
            if (this.angle.hatralevoElfordulas - this.elfordulas > 360) {
                this.angle.hatralevoElfordulas = -((360 - this.angle.hatralevoElfordulas) + (360 + this.elfordulas));
            }
            else {
                this.angle.hatralevoElfordulas = this.angle.hatralevoElfordulas - this.elfordulas;
            }
        } else {
            this.angle.hatralevoElfordulas = -(this.elfordulas - this.angle.hatralevoElfordulas);
        }

        if (this.angle.hatralevoElfordulas > 180) {
            this.angle.hatralevoElfordulas = -(360 - this.angle.hatralevoElfordulas);
        }

        if (this.angle.hatralevoElfordulas < -180) {
            if ((360 - this.angle.hatralevoElfordulas) < 360) {
                this.angle.hatralevoElfordulas = (360 - this.angle.hatralevoElfordulas);
            }
            else {
                this.angle.hatralevoElfordulas = (360 + this.angle.hatralevoElfordulas);
            }
        }

        if(Math.abs(this.angle.hatralevoElfordulas) % 2 == 1) this.angle.hatralevoElfordulas++; //Nem lesz pontos ha páratlan szög kellene, de szükség van rá a forgási sebesség miatt
        this.angle.teljesElfordulas=this.angle.hatralevoElfordulas;
    }

    buildRoadArray(cordinates) {
        let buildRoad = []; //Felépítjük az utat az X és az Y tengelyre is. Tömb elős eleme X tengelyre épített út, második eleme Y tengelyre épített út. Amelyik hosszabb tömb lesz azt az utat választjuk

        //X tengely mentén épített út
        buildRoad[0] = []; //Ha új click volt ki kell üríteni az utat
        buildRoad[0].push({ x: starship.positon.x, y: starship.positon.y }); //Az út első eleme a starship kiinulási pontja lesz
        let index = 1; //Hiszen az első elem már benne van
        while (buildRoad[0][buildRoad[0].length - 1].x != (cordinates.x + buildRoad[0][0].x)) {
            let step = { x: 0, y: 0 };
            if (cordinates.x >= 0) {
                step.x = buildRoad[0][index - 1].x + 1;
            } else {
                step.x = buildRoad[0][index - 1].x - 1;
            }
            step.y = Math.floor(buildRoad[0][0].y + (cordinates.y / cordinates.x) * (buildRoad[0][0].x - step.x));
            buildRoad[0].push(step);
            index++;
        }

        //Y tengely mentén épített út
        buildRoad[1] = []; //Ha új click volt ki kell üríteni az utat
        buildRoad[1].push({ x: starship.positon.x, y: starship.positon.y }); //Az út első eleme a starship kiinulási pontja lesz
        index = 1; //Hiszen az első elem már benne van
        while (buildRoad[1][buildRoad[1].length - 1].y != cordinates.click.y) {
            let step = { x: 0, y: 0 };
            if (cordinates.y >= 0) {
                step.y = buildRoad[1][index - 1].y - 1;
            } else {
                step.y = buildRoad[1][index - 1].y + 1;
            }
            step.x = Math.floor(buildRoad[1][0].x + (cordinates.x / cordinates.y) * (buildRoad[1][0].y - step.y));

            buildRoad[1].push(step);
            index++;
        }

        //Út választás
        if (buildRoad[0] <= buildRoad[1]) {
            this.road.roadCordinates = buildRoad[1];
        } else {
            this.road.roadCordinates = buildRoad[0];
        }
        this.roadOriginalLength = this.road.roadCordinates.length;
        
    }

    centerCamera(){
        var move = {x:0, y:0};
        move.x = mainPosition.x-(this.positon.x-canvasMain.width/2);
        move.y = mainPosition.y-(this.positon.y-canvasMain.height/2);
        if(move.x < 0){
            move.x = Math.abs(move.x)
            if(mainPosition.x+move.x < (background.getBackgroundWidth()-canvasMain.width)){
                mainPosition.x += move.x;
            }else{
                move.x=(background.getBackgroundWidth()-canvasMain.width)-mainPosition.x;
                mainPosition.x = (background.getBackgroundWidth()-canvasMain.width);
            }
            mainPosition.x = Math.floor(mainPosition.x);
            move.x = Math.floor(move.x);
            ctxMain.translate(-move.x, 0);
        }
        else{
            move.x = Math.abs(move.x)
            if(mainPosition.x-move.x > 0){
                mainPosition.x -= move.x;
            }else{
                move.x=Math.abs(mainPosition.x);
                mainPosition.x = 0;
            }
            mainPosition.x = Math.floor(mainPosition.x);
            move.x = Math.floor(move.x);
            ctxMain.translate(move.x, 0);
        }
        if(move.y < 0){
            move.y = Math.abs(move.y)
            if(mainPosition.y+move.y < (background.getBackgroundHeight()-canvasMain.height)){
                mainPosition.y += move.y;
            }else{
                move.y=(background.getBackgroundHeight()-canvasMain.height)-mainPosition.y;
                mainPosition.y = (background.getBackgroundHeight()-canvasMain.height);
            }
            mainPosition.y = Math.floor(mainPosition.y);
            move.y = Math.floor(move.y);
            ctxMain.translate(0, -move.y);
            
        }else{
            move.y = Math.abs(move.y)
            if(mainPosition.y-move.y > 0){
                mainPosition.y -= move.y;
            }else{
                move.y=Math.abs(mainPosition.y)
                mainPosition.y = 0;
            }
            mainPosition.y = Math.floor(mainPosition.y);
            move.y = Math.floor(move.y);
            ctxMain.translate(0, move.y);
        }
    }

    getPositon(){
        return this.positon;
    }
}

