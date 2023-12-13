//Load all images, after all images ready the site will start
let images = [];
let documentReady = false;

const sunImage = new Image();
sunImage.src = "/images/planets/sun.png";
images.push({ img: sunImage, ready: false });

const mercurImage = new Image();
mercurImage.src = "/images/planets/mercur.png";
images.push({ img: mercurImage, ready: false });

const venusImage = new Image();
venusImage.src = "/images/planets/venus.png";
images.push({ img: venusImage, ready: false });

const earthImage = new Image();
earthImage.src = "/images/planets/earth.png";
images.push({ img: earthImage, ready: false });

const marsImage = new Image();
marsImage.src = "/images/planets/mars.png";
images.push({ img: marsImage, ready: false });

const jupiterImage = new Image();
jupiterImage.src = "/images/planets/jupiter.png";
images.push({ img: jupiterImage, ready: false });

const saturnImage = new Image();
saturnImage.src = "/images/planets/saturn.png";
images.push({ img: saturnImage, ready: false });

const uranusImage = new Image();
uranusImage.src = "/images/planets/uranus.png";
images.push({ img: uranusImage, ready: false });

const neptuneImage = new Image();
neptuneImage.src = "/images/planets/neptune.png";
images.push({ img: neptuneImage, ready: false });

const moonImage = new Image();
moonImage.src = "/images/planets/moon.png";
images.push({ img: moonImage, ready: false });

const starshipImage = new Image();
starshipImage.src = "/images/starship.png";
images.push({ img: starshipImage, ready: false });

const flameImage = new Image();
flameImage.src = "/images/flame.png";
images.push({ img: flameImage, ready: false });

for (let i = 0; i < images.length; i++) {
    images[i].img.addEventListener('load', () => {
        images[i].ready = true;
        documentReady = true;
        checkImagesReady();
    });
}

function checkImagesReady() {
    let allReady = true;
    for (let i = 0; i < images.length; i++) {
        if (!images[i].ready) {
            allReady = false;
        }
    }
    if (allReady) {
        init();
    }
}

const canvasMain = document.getElementById("canvas"); //Main canvas, ide rajzolunk mindent
const ctxMain = canvasMain.getContext('2d');
canvasMain.addEventListener("contextmenu", function (event) { event.preventDefault(); });

let pageLoaded = false;
let pause = true;
let mainPosition;
let camereMoving = false;
let scalefactor = 1;
if(2500 < window.innerWidth) scalefactor = 2;
if(1000 > window.innerWidth) scalefactor = 0.7;

let background;
let starship;
const planetOpen = document.getElementById("planetOpen");
planetOpen.style.display = "none";

function init() {
    //Main canvas set size
    canvasMain.width = window.innerWidth;
    canvasMain.height = window.innerHeight;
    mainPosition = { x: 0, y: 0 };
    background = new Background();
    starship = new Starship({ x: (canvasMain.width / 2 +100), y: Math.floor(background.getBackgroundHeight() / 2) + 150 });
    starship.centerCamera(); //Kezdő képernyő beállítása
    addEvents();
    animate();
}

//Loop
function animate() {
    background.update();
    starship.update();
    
    let hoveredPlanet = background.getHoveredPlanet();
    if(hoveredPlanet.isHovered === true && pause === false && planetOpen.style.display === "none"){
        planetOpen.style.removeProperty("display");
        planetOpen.innerHTML = texts[hoveredPlanet.name].name;
        planetOpen.onclick = function(){
            popTextContainer();
            renderText(hoveredPlanet.name);
        }
    }
    if(hoveredPlanet === false && pause === false && planetOpen.style.display === ""){
        planetOpen.style.display = "none";
    }
    window.requestAnimationFrame(animate);
}

//Az egyes eventek csak akkor lehetnek aktívak, ha minden osztály inicializálva van.
function addEvents() {
    //Kamera mozgás like drag and drop 
    let isDragging = false;
    let displacement = { x: 0, y: 0 };
    let startPoint = { x: 0, y: 0 };

    document.addEventListener("mousedown", function (event) { //For pc
        movementStart({ x: event.clientX, y: event.clientY });
    });
    document.addEventListener("touchstart", function (event) { //For mobile
        movementStart({ x: Math.floor(event.touches[0].clientX), y: Math.floor(event.touches[0].clientY) });
    });
    function movementStart(cordiantes) {
        startPoint.x = cordiantes.x;
        startPoint.y = cordiantes.y;
        isDragging = true;
    }

    document.addEventListener("mouseup", function () {
        isDragging = false;
    });
    document.addEventListener("touchend", function () {
        isDragging = false;
        camereMoving = false;
    });

    document.addEventListener("mousemove", function (event) {
        movement({ x: event.clientX, y: event.clientY });
    });
    document.addEventListener("touchmove", function (event) {
        movement({ x: Math.floor(event.touches[0].clientX), y: Math.floor(event.touches[0].clientY) });
    });
    function movement(cordiantes) {
        if (isDragging && !pause) {
            camereMoving = true;
            displacement.x = (cordiantes.x - startPoint.x);
            displacement.y = (cordiantes.y - startPoint.y);
            if (0 <= mainPosition.x - displacement.x && mainPosition.x - displacement.x <= background.getBackgroundWidth() - canvasMain.width) {
                mainPosition.x -= displacement.x;
                ctxMain.translate(displacement.x, 0);
            }
            if (0 <= mainPosition.y - displacement.y && mainPosition.y - displacement.y <= background.getBackgroundHeight() - canvasMain.height) {
                mainPosition.y -= displacement.y;
                ctxMain.translate(0, displacement.y);
            }
            startPoint.x = cordiantes.x;
            startPoint.y = cordiantes.y;
        }
    }

    //Középre
    document.addEventListener("keydown", function (event) {
        if (event.key == "c" && !pause) starship.centerCamera();
    })

    //Űrhajó mozgás
    canvasMain.addEventListener("click", (event) => {
        if (camereMoving == false && !pause) {
            let cordiantes = starship.calcCordanates({ x: event.clientX, y: event.clientY });
            if (cordiantes !== false) {
                starship.calcAngle(cordiantes);
                starship.buildRoadArray(cordiantes);
            }
        } else {
            camereMoving = false;
        }
    })
}