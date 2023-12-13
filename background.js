class Background {
    constructor() {
        this.canvasBackground = document.createElement('canvas');
        this.ctxBackground = this.canvasBackground.getContext('2d');
        this.canvasBackground.addEventListener("contextmenu", function (event) { event.preventDefault(); });
        this.canvasBackground.width = 3000*scalefactor;
        this.canvasBackground.height = 2000*scalefactor;
        this.ctxBackground.scale(scalefactor,scalefactor);
        this.initBackground();

        this.canvasLoading = document.createElement("canvas");
        this.ctxLoading = this.canvasLoading.getContext("2d");
        this.canvasLoading.addEventListener("contextmenu", function (event) { event.preventDefault(); });
        this.canvasLoading.width = 100;
        this.canvasLoading.height = 100;
        this.isLoading = false;
        this.loadingPercentage;
        this.positionLoadingCanvas;

        this.initPlanets();
    }

    initBackground() {
        this.ctxBackground.fillStyle = "#0c0014";
        this.ctxBackground.fillRect(0, 0, this.canvasBackground.width/scalefactor, this.canvasBackground.height/scalefactor);

        //Small stars
        for (let i = 0; i < 3000*scalefactor; i++) { drawStars(1, { width: this.canvasBackground.width/scalefactor, height: this.canvasBackground.height/scalefactor }, this.ctxBackground); }

        //Medium stars
        for (let i = 0; i < 500*scalefactor; i++) { drawStars(2, { width: this.canvasBackground.width/scalefactor, height: this.canvasBackground.height/scalefactor }, this.ctxBackground); }

        //Colored large stars
        const colors = ["#5c7efa", "#879ffc", "#c9d1fd", "#fff070", "#f6ac5d", "#f05252"];
        for (let i = 0; i < 250*scalefactor; i++) { drawStars(3, { width: this.canvasBackground.width/scalefactor, height: this.canvasBackground.height/scalefactor }, this.ctxBackground, colors[Math.floor(Math.random() * colors.length)]); }

        function drawStars(size, canvasSize, ctx, color = "#a6a6a6") {
            const x = Math.random() * canvasSize.width;
            const y = Math.random() * canvasSize.height;

            const gradient = ctx.createRadialGradient(x, y, size / 3, x, y, size);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, "rgba(0,0,0,0)");

            ctx.fillStyle = gradient;
            ctx.beginPath()
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    initPlanets() {
        this.sun = new Planet("sun", { x: -250, y: this.canvasBackground.height/scalefactor / 2 }, { width: 1000, height: 1000 }, this.canvasBackground, this.ctxBackground, sunImage, true);
        this.mercur = new Planet("mercur", { x: 450, y: this.canvasBackground.height/scalefactor / 2 + 100 }, { width: 50, height: 50 }, this.canvasBackground, this.ctxBackground, mercurImage);
        this.venus = new Planet("venus", { x: 600, y: this.canvasBackground.height/scalefactor / 2 + 300 }, { width: 125, height: 125 }, this.canvasBackground, this.ctxBackground, venusImage);
        this.earth = new Planet("earth", { x: 800, y: this.canvasBackground.height/scalefactor / 2 - 200 }, { width: 125, height: 125 }, this.canvasBackground, this.ctxBackground, earthImage);
        this.mars = new Planet("mars", { x: 1100, y: this.canvasBackground.height/scalefactor / 2 - 700 }, { width: 125, height: 125 }, this.canvasBackground, this.ctxBackground, marsImage);
        this.jupiter = new Planet("jupiter", { x: 1650, y: this.canvasBackground.height/scalefactor / 2 - 50 }, { width: 400, height: 400 }, this.canvasBackground, this.ctxBackground, jupiterImage);
        this.saturn = new Planet("saturn", { x: 2100, y: this.canvasBackground.height/scalefactor / 2 + 600 }, { width: 645, height: 250 }, this.canvasBackground, this.ctxBackground, saturnImage);
        this.uranus = new Planet("uranus", { x: 2500, y: this.canvasBackground.height/scalefactor / 2 - 200 }, { width: 350, height: 200 }, this.canvasBackground, this.ctxBackground, uranusImage);
        this.neptune = new Planet("neptune", { x: 2900, y: this.canvasBackground.height/scalefactor / 2 - 700 }, { width: 200, height: 200 }, this.canvasBackground, this.ctxBackground, neptuneImage);

        this.moonEarth = new Moon({ x: 800, y: this.canvasBackground.height/scalefactor / 2 - 200 }, 1080, 120, { width: 15, height: 15 });
        this.moonMars1 = new Moon({ x: 1100, y: this.canvasBackground.height/scalefactor / 2 - 700 }, 600, 100, { width: 17, height: 17 }, 300);
        this.moonMars2 = new Moon({ x: 1100, y: this.canvasBackground.height/scalefactor / 2 - 700 }, 800, 150, { width: 12, height: 12 });
        this.moonJupiter = new Moon({ x: 1650, y: this.canvasBackground.height/scalefactor / 2 - 50 }, 3600, 230, { width: 12, height: 12 }, 750);
        this.planets = [this.sun, this.mercur, this.venus, this.earth, this.mars, this.jupiter, this.saturn, this.uranus, this.neptune]

        for (const planet of this.planets) {
            planet.draw();
        }
    }

    getHoveredPlanet() {
        let hoveredPlanetData;
        for (const planet of this.planets) {
            hoveredPlanetData = planet.getIsHovered();
            if (hoveredPlanetData.isHovered === true) return hoveredPlanetData;
        }
        return false;
    }

    update() {
        const starshipPositin = starship.getPositon();
        for (const planet of this.planets) {
            planet.calcDistanceFromStarship(starshipPositin);
        }
        this.draw();
    }

    draw() {
        ctxMain.drawImage(this.canvasBackground, 0, 0);

        for (const planet of this.planets) {
            planet.drawHover();
        }

        this.moonEarth.draw();
        this.moonMars1.draw();
        this.moonMars2.draw();
        this.moonJupiter.draw();
    }

    getBackgroundWidth() { return this.canvasBackground.width }
    getBackgroundHeight() { return this.canvasBackground.height }
}
