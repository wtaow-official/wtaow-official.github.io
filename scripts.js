function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
}
function begone(chosenId){
        var element = document.getElementById(chosenId);
        string = getCookie("poster")
        let x = 3000
        if (string == "false"){
                x = 0
        }
        element.style.top = "-200vh";
        element.tabIndex = -1;
        sleep(x).then(() => {
                document.getElementById("base").style.overflowY = "visible"
                element.style.display = "none";
        });
}
function link(hyperlink){
        window.location.href = hyperlink;
}

function socialIn(){
        var elements = document.getElementsByClassName("social");
        alert(elements[0])
}
function spin(self, num){
        var element = document.getElementsByClassName(self)[num]
        element.style.rotate = "360deg"
        element.style.transitionDuration = "3s";
        sleep(3000).then(() => {
                element.style.rotate = "0deg";
        element.style.transitionDuration = "0s";
        });
}

function moveUp(id){
        let element = document.getElementsByClassName(id)[0];
        element.style.marginTop = "150px"
}

function setCookie(cName, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cName + "=" + cvalue + ";" + expires + ";path=/";
      }
function getCookie(cName) {
        let Name = cName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        console.log(decodedCookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                }
                if (c.indexOf(Name) == 0) {
                        return c.substring(Name.length, c.length);
                }
        }
        return "";
}

async function readJson(path){
        const baseData = await fetch(new Request(path))
        const jsonData = await baseData.json()
        return jsonData
}


function checkEnabled(id, cName){
        var element = document.getElementById(id)
        string = getCookie(cName)
        if (string == "") {
                setCookie(cName, true, 365)
        }
        // console.log(string)
        if (string == "false"){
                document.getElementById("posterWTAOW").style.display = "none";
                document.getElementById("posterSwap").style.backgroundColor = "red"
                document.getElementById("base").style.overflowY = "scroll";
                begone("posterWTAOW")
        }
        else{
                element.style.display = "flex";
                document.getElementById("base").style.overflowY = "hidden"
                document.getElementById("posterSwap").style.backgroundColor = "#00FF00"
        }
}

function swapEnabled(cName){
        string = getCookie(cName)
        if (string == "false"){
                setCookie(cName, true, 365)
                console.log("poster is set to true")
                document.getElementById("posterSwap").style.backgroundColor = "#00FF00"
        }
        else{
                setCookie(cName, false, 365)
                console.log("poster is set to false")
                document.getElementById("posterSwap").style.backgroundColor = "red"
        }
}

function schrodingersXeroPicture(idName, fullPageMode){
        string = getCookie("xeroImage")

        picture = document.getElementById(idName)["children"][0]
        console.log(picture)
        let imageName = ""

        if (string == "" || string == "undefined") {
                fetch("./characters.json")
                .then(res => res.json())
                .then(data =>{
                        let characterArray = Object.keys(data)
                        gettingImage = true
                        while (gettingImage) {
                                randomNumber = Math.floor(Math.random()* (characterArray.length))
                                imageName = data[characterArray[randomNumber]]["image"]
                                if (imageName != "blank.webp" && imageName != "xero")
                                        gettingImage = false
                        }
                        
                        setCookie("xeroImage", imageName, 0.0104)
                        imageUrl = "url('./assets/" + imageName + "')"
                        picture.style.backgroundImage = imageUrl
                        console.log("Image set to",imageName)
                });
        }
        else{
                imageName = getCookie("xeroImage")
                imageUrl = "url('./assets/" + imageName + "')"
                picture.style.backgroundImage = "image-set(" + imageUrl + ")"
                console.log("Image set to",imageName)
        }

        if (fullPageMode) {
                fetch("./characters.json")
                .then(res => res.json())
                .then(data =>{
                        let root = document.documentElement
                        imageName = imageName.split(".")[0]
                        
                        let xeroData = data[imageName];
                        // console.log(xeroData);
                        setRootProperty("page-colour", xeroData)
                        setRootProperty("text-colour", xeroData)
                        setRootProperty("highlight", xeroData)
                        // setRootProperty("image")
                });
        }
}



function generateTiles(tileset){
        let tileBody = document.getElementById("tileBody")
        let template = document.getElementsByClassName("tile")[0]
        console.log(template);
        
        template.remove()
        
        if (tileset=="characters"){
        fetch("./characters.json")
        .then(res => res.json())
        .then(characters =>{
                console.log(characters);
                let characterList = Object.keys(characters)
                blankIndex = characterList.indexOf("")
                characterList.splice(blankIndex)

                for (i in characterList){
                        name = characterList[i]
                        hrefLink = "./character.html?id=" + name
                        let characterData = characters[name]

                        tileBody.appendChild(template.cloneNode(true))
                        let charElement = tileBody.children[tileBody.children.length-1]
                        
                        img = charElement.children[0]
                        title = charElement.children[1]
                        linkObj = charElement.children[2]

                        title.textContent = characterData["title"]
                        title.href = hrefLink
                        linkObj.href = hrefLink
                        
                        charElement.id = name
                        charElement.href = hrefLink

                        
                        img.style.backgroundImage = "image-set('assets/"+characterData["image"]+"')"                        
                        img.href = hrefLink
                        

                        if (name == "xero"){
                                schrodingersXeroPicture('xero', false)
                        }
                }
        })
        }
        else{
        fetch("../C&C/backend/crewmembers.json")
        .then(res => res.json())
        .then(crewmembers =>{
                console.log(crewmembers);
                let characterList = Object.keys(crewmembers)
                blankIndex = characterList.indexOf("")
                characterList.splice(blankIndex)

                for (i in characterList){
                        let name = characterList[i]
                        let hrefLink = "../C&C/"+name+".html"
                        let characterData = crewmembers[name]
                        let imagePath = "../C&C/"+characterData["image"].replace("{name}", name)

                        if (characterData["image"] != "") {                                       
                                
                                tileBody.appendChild(template.cloneNode(true))
                                let charElement = tileBody.children[tileBody.children.length-1]
                                
                                img = charElement.children[0]
                                title = charElement.children[1]
                                linkObj = charElement.children[2]

                                title.textContent = characterData["title"]
                                title.href = hrefLink
                                linkObj.href = hrefLink
                                
                                charElement.id = name
                                charElement.href = hrefLink
                                
                                img.style.backgroundImage = "image-set('../C&C//"+characterData["image"].replace("{name}", name)+"')"                  
                                img.href = hrefLink
                                
                        }
                }
        }) 
        }
}

function imgTxtAlignment(){
        let imgCol = document.getElementById("imageCol");
        let txtCol = document.getElementById("textCol");

        if (document.body.offsetWidth < 700){
                console.log("mobile")
                x = (imgCol.offsetWidth - 20).toString()
                y = (imgCol.offsetWidth).toString()
                txtCol.style.width = x + "px"
                imgCol.style.width = x + "px"
        }
        else{
                console.log("desktop")
                /*x = (txtCol.offsetHeight).toString()
                imgCol.style.height = x + "px"*/
        }
}

const frameCounts = {
        untitled1199:12,
}
const imageID = {
        untitled1199: "news",
}
let glitchFrames = {}
let image = null

function paperfound(){
        const paper = document.getElementById("news");
        const dark = document.getElementById("darken");
        const audioElement = paper.querySelector("audio")
        dark.style.transitionDuration = "0.8s"

        path = window.location.origin + "/assets/audio/crumple-" + ["01.mp3", "02.mp3", "03.mp3", "04.mp3"][Math.floor(Math.random() * 4)]
        console.log("Audio Path:", path)
        audioElement.src = path
        audioElement.play()
        x = ((document.body.offsetWidth - paper.offsetWidth)/200).toString()
        y = ((document.body.offsetHeight - paper.offsetHeight)/2).toString()

        delay = dark.style.transitionDuration
        delayMS = parseFloat(delay.slice(0, delay.length-1)) * 1000

        console.log("Delay:",delay)
        console.log("DelayMS:",delayMS)

        if (dark.style.zIndex != "-1"){
                paper.glitching = false
                paper.style.bottom = "-88vh"
                paper.style.right = "-98vw"
                dark.style.backgroundColor = "rgba(20, 20, 20, 0)"
                sleep(delayMS).then(() => {
                        dark.style.zIndex = "-1"
                });
        }
        else{
                dark.style.transitionDuration = "0s"
                dark.style.zIndex = "98"
                dark.style.transitionDuration = delay
                paper.style.right = x + "px"
                paper.style.bottom = "5vh"
                dark.style.background = "rgba(0, 0, 0, 0.999)"
                paper.glitching = true

                glitchImage("untitled1199")
        }
        console.log("Glitching: ", paper.glitching);
        

}

function loadGlitch(Name){
        glitchDirectory = window.location.origin + "/assets/images/glitched/" + Name + "/"
        let frames = []
        for(let i =0; i<frameCounts[Name]; i++){
                num = String(i)
                if (num.length ==1){num = "0"+num}
                frames.push(glitchDirectory + "glitch-" + num + ".webp")
        }
        glitchFrames[Name] = frames
        preloadImages(frames)
}

function glitchImage(Name){
        if(image==null){
                image = document.getElementById(imageID[Name])
                glitchImage(Name)
                console.log("startGlitch")
                console.log(image);
                
        }
        else{
                nextGlitchFrame(Name, 20, 6)
        }
}
function nextGlitchFrame(Name, iterations, fps) {
        image = document.getElementById(imageID[Name])
        sleep(1000/fps).then(()=>{
                backgroundImage = "image-set('"+ glitchFrames[Name][Math.floor(Math.random() * glitchFrames[Name].length)] +"')"
                
                image.style.backgroundImage = backgroundImage

                
                if(image.glitching){
                        if ((iterations > 0)){
                                
                                nextGlitchFrame(Name, iterations-1, fps)
                        }
                        else{
                                if(iterations=="infinite"){
                                        nextGlitchFrame(Name, iterations, fps)
                                }
                                if(iterations==0){
                                        image.glitching = false
                                        nextGlitchFrame(Name, iterations, fps)
                                }
                                
                        }
                }
                else{
                        console.log("done");
                        
                        image.style.backgroundImage = "image-set('"+ glitchFrames[Name][0] +"')"
                }
        })
}

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}
function setRootProperty(name, relevantData){
        let root = document.documentElement
        
        if (relevantData[name] != "default"){
                if (name != "image"){
                        root.style.setProperty("--"+name, relevantData[name])
                }
                else{
                        root.style.setProperty("--image", "image-set(url('./assets/" + relevantData["image"] + "'))")
                        
                }
        }
}

function imageDisplayLink(){
        let linkObj = document.getElementsByClassName("image")[0]
        imageUrl = String(getComputedStyle(linkObj).backgroundImage)
        
        imageUrl = imageUrl.slice(15)
        imageUrl = imageUrl.split('"')[0]
        console.log("Image Source:", imageUrl)

        linkObj.href = window.location.origin + "/imageView.html?imageURL=" + imageUrl

        let title = document.getElementsByClassName("titleCard")[0]
        if (title != null) {
                titleUrl = String(getComputedStyle(title).backgroundImage)
                titleUrl = titleUrl.slice(15)
                titleUrl = titleUrl.split('"')[0]
                console.log("Image Source:", titleUrl)

                title.href = window.location.origin + "/imageView.html?imageURL=" + titleUrl
        }
        
}

function fateDisplay(){
        let fateRow = document.getElementById("fate")
        let fateText = fateRow.childNodes[3]
        
        if (!fateText.length){
                fateRow.style.display = "none"
        }
        
}
function populateInfo(){
        fetch("./characters.json")
        .then(res => res.json())
        .then(characters =>{
                let input = new URLSearchParams(window.location.search)
                id = input.get("id")
                let characterData = characters[id]

                document.title = characterData["title"]
                setRootProperty("page-colour", characterData)
                setRootProperty("text-colour", characterData)
                setRootProperty("highlight", characterData)
                setRootProperty("image", characterData)

                let textColumn = document.getElementById("textCol")
                textColumn.childNodes[1].textContent = characterData.title
                tableArray = ["gender", "pronouns", "orientation", "age", "eyes", "height", "fate"]
                for (let index = 0; index < tableArray.length; index++) {
                        const attribute = tableArray[index];
                        row = document.getElementById(attribute)
                        textBox = row.getElementsByClassName("data")[0]
                        textBox.textContent = characterData[attribute]
                
                }
                vaCell = document.getElementById("VA").childNodes[3]
                console.log(vaCell);
                
                
                if (typeof characterData["VA"] == "string"){
                        console.log("solo");

                        let VA = characterData["VA"]
                        let anchor = document.createElement("a")
                        anchor.href = "../C&C/"+VA+".html"
                        anchor.textContent = VA.charAt(0).toUpperCase() + VA.slice(1)
                        vaCell.appendChild(anchor)
                        
                }
                else{
                        console.log("Squad");

                        for (let index = 0; index < characterData["VA"].length; index++) {
                                let VA = characterData["VA"][index];
                                let anchor = document.createElement("a")
                                let tempSpan = document.createElement("span") 
                                anchor.href = "../C&C/"+VA+".html"
                                anchor.textContent = VA.charAt(0).toUpperCase() + VA.slice(1)
                                vaCell.appendChild(anchor)
                                vaCell.appendChild(tempSpan)
                                if (index < characterData["VA"].length-1){
                                        tempSpan.textContent += ", "                                        
                                } 
                        }
                        
                }

                document.getElementById("abilitiesTextbox").textContent = characterData["abilities"]
                document.getElementById("personalityTextbox").textContent = characterData["personality"]
                document.getElementById("picrew").childNodes[1].href = characterData["Picrew"]
                if (characterData["script"] != null){
                        eval(characterData["script"])
                }
        })
}

function loadCC(){
        console.log("C&C Page Loaded")
        imgTxtAlignment()
        moveUp("crewPage")
        imageDisplayLink()
}
function loadCharacter(populate=false){
        if (populate){
                populateInfo()

        }
        imageDisplayLink()
        fateDisplay()
        imgTxtAlignment();
        moveUp("characterPage")
        console.log("Character Page Loaded")
}
// preloadImages(["assets/images/background.webp"]);
