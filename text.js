let texts;

const body = document.getElementById("body");
const containerHTML = document.createElement("div");
containerHTML.setAttribute("class", "pageContainer");
containerHTML.setAttribute("id","textContainer");
containerHTML.innerHTML='<div id="spaceCard" class="fadeIn space-card"></div>';

function popTextContainer(){
    body.insertBefore(containerHTML, body.firstChild);
    pause=true;
}

function renderText(key){
    const spaceCard = document.getElementById("spaceCard");
    containerHTML.onclick = function(event){
        if (!spaceCard.contains(event.target) && event.target.id !== "copyright") {
            document.getElementById("info").style.visibility = "visible";
            body.removeChild(containerHTML);
            pause=false;
        }
    };
    switch (true) {
        case key === "welcome":
            document.getElementById("planetOpen").style.display = "none";
            spaceCard.innerHTML = texts.closeButton;
            spaceCard.innerHTML += texts.welcome;
            document.getElementById("hu").onclick = function(){body.removeChild(containerHTML); loadText("hu.JSON"); pause=false; }
            document.getElementById("uk").onclick = function(){body.removeChild(containerHTML); loadText("uk.JSON"); pause=false; }
            break;
        case key === "movement":
            document.getElementById("info").style.visibility = "hidden";
            document.getElementById("planetOpen").style.display = "none";
            spaceCard.innerHTML = texts.closeButton;
            spaceCard.innerHTML += texts.movement;
            document.getElementById("copyright").onclick = function() {
                body.removeChild(containerHTML);
                popTextContainer();
                renderText("copyright");
            };
            break;
        case key === "copyright":
            document.getElementById("planetOpen").style.display = "none";
            spaceCard.innerHTML = texts.closeButton;
            spaceCard.innerHTML += texts.copyright;
            break;
        default:
            document.getElementById("planetOpen").style.display = "none";
            document.getElementById("info").style.visibility = "hidden";
            //Template build
            spaceCard.innerHTML = texts.closeButton;
            let descriptionHTML = `<div class="w-100"><h6 style="font-size: 15px;">${texts[key].name}</h6>`;
            descriptionHTML += '<div class="pb-3" style="border-bottom: 2px solid #356c72; font-size: 13px;">';
            for(const data in texts[key].data)
            {
                descriptionHTML += `<p class="m-0">${texts[key].data[data]}</p>`;
            }
            descriptionHTML += '</div>';
            descriptionHTML += `<div class="mt-3">${texts[key].description}</div></div>`;
            spaceCard.innerHTML += descriptionHTML;
            break;
    }
    const closebutton = document.getElementById("closeTextContainer");
    if(closebutton !== null){
        closebutton.onclick = function(){
            document.getElementById("info").style.visibility = "visible";
            body.removeChild(containerHTML);
            pause=false;
        }
    }
    document.getElementById("info").onclick = function(){
        popTextContainer();
        renderText("movement");
    };
}

async function loadText(url, startThePage=false) {
    var response = await fetch(url);
    if(!response.ok) alert("Nyelvi források olvasása nem lehetséges!");
    texts =  await response.json();
    if(startThePage){
        //Start on page
        popTextContainer();
        renderText("welcome");
        document.getElementById("planetOpen").style.height = document.getElementById("info").offsetHeight + "px";
    }
}


loadText("hu.JSON",true);



