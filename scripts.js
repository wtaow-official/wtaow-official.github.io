
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
                        // data = await readJson("./characters.json")
                        console.log(data);
                        
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
                        console.log(imageName);
                        imageName = imageName.split(".")[0]
                        
                        let relevantData = data[imageName];
                        console.log(relevantData);
                        function setXeroRoot(name){
                                if (relevantData[name] != "default"){
                                        root.style.setProperty("--"+name, relevantData[name])
                                }
                        }

                        setXeroRoot("page-colour")
                        setXeroRoot("text-colour")
                        setXeroRoot("highlight")
                        loadCharacter()
                });
        }
}



function generate(){
        let tileBody = document.getElementById("tileBody")
        let template = document.getElementsByClassName("tile")[0]
        console.log(template);
        
        template.remove()
        

        fetch("./characters.json")
        .then(res => res.json())
        .then(characters =>{
                console.log(characters);
                let characterList = Object.keys(characters)
                blankIndex = characterList.indexOf("")
                characterList.splice(blankIndex)

                for (i in characterList){
                        Name = characterList[i]
                        let characterData = characters[Name]

                        tileBody.appendChild(template.cloneNode(true))
                        let charElement = tileBody.children[tileBody.children.length-1]
                        
                        img = charElement.children[0]
                        title = charElement.children[1]
                        linkObj = charElement.children[2]

                        title.textContent = characterData["title"]

                        linkObj.href = Name + ".html"
                        
                        charElement.id = Name
                        charElement.href = Name + ".html"

                        
                        img.style.backgroundImage = "image-set('assets/"+characterData["image"]+"')"                        
                        img.href = Name + ".html"
                        

                        if (Name == "xero"){
                                schrodingersXeroPicture('xero', false)
                        }
                }
        })
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

function imageDisplayLink(){
        let linkObj = document.getElementsByClassName("image")[0]
        imageUrl = String(getComputedStyle(linkObj).backgroundImage)
        console.log(imageUrl);
        
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


function loadCC(){
        console.log("C&C Page Loaded")
        imgTxtAlignment()
        moveUp("crewPage")
        imageDisplayLink()
}
function loadCharacter(){
        console.log("Character Page Loaded")
        imageDisplayLink()
        imgTxtAlignment();
        moveUp("characterPage")
}
preloadImages(["assets/images/background.webp"]);
