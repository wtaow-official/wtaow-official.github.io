
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

function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        console.log(decodedCookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                }
        }
        return "";
}


function checkEnabled(id, cname){
        var element = document.getElementById(id)
        string = getCookie(cname)
        if (string == "") {
                setCookie(cname, true, 365)
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

function swapEnabled(cname){
        string = getCookie(cname)
        if (string == "false"){
                setCookie(cname, true, 365)
                console.log("poster is set to true")
                document.getElementById("posterSwap").style.backgroundColor = "#00FF00"
        }
        else{
                setCookie(cname, false, 365)
                console.log("poster is set to false")
                document.getElementById("posterSwap").style.backgroundColor = "red"
        }
}

function schrodingersXeroPicture(className){
        string = getCookie("xeroImage")
        console.log(string)
        console.log("test")

        picture = document.getElementsByClassName(className)[0]["children"][0]
        console.log(picture)

        if (string == "" || string == "undefined") {
                fetch("./characters.json")
                .then(res => res.json())
                .then(data =>{
                        let characterArray = data["Array"]
                        randomNumber = Math.floor(Math.random()* characterArray.length-1)
                        setCookie("xeroImage", characterArray[randomNumber], 0.00625)
                        imageUrl = "url('./assets/" + characterArray[randomNumber] + ".png')"
                        picture.style.backgroundImage = imageUrl
                        console.log("Image set to",characterArray[randomNumber] + ".png")
        });
        }
        else{
                imageName = getCookie("xeroImage")
                imageUrl = "url('./assets/" + imageName + ".png')"
                picture.style.backgroundImage = "image-set(" + imageUrl + ")"
                console.log("Image set to",imageName + ".png")
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

function loadGlitch(name){
        glitchDirectory = window.location.origin + "/assets/images/glitched/" + name + "/"
        let frames = []
        for(let i =0; i<frameCounts[name]; i++){
                num = String(i)
                if (num.length ==1){num = "0"+num}
                frames.push(glitchDirectory + "glitch-" + num + ".jpg")
        }
        glitchFrames[name] = frames
        preloadImages(frames)
}

function glitchImage(name){
        if(image==null){
                image = document.getElementById(imageID[name])
                glitchImage(name)
                console.log("startGlitch")
                console.log(image);
                
        }
        else{
                nextGlitchFrame(name, 20, 6)
        }
}
function nextGlitchFrame(name, iterations, fps) {
        image = document.getElementById(imageID[name])
        sleep(1000/fps).then(()=>{
                backgroundImage = "image-set('"+ glitchFrames[name][Math.floor(Math.random() * glitchFrames[name].length)] +"')"
                
                image.style.backgroundImage = backgroundImage

                
                if(image.glitching){
                        if ((iterations > 0)){
                                
                                nextGlitchFrame(name, iterations-1, fps)
                        }
                        else{
                                if(iterations=="infinite"){
                                        nextGlitchFrame(name, iterations, fps)
                                }
                                if(iterations==0){
                                        image.glitching = false
                                        nextGlitchFrame(name, iterations, fps)
                                }
                                
                        }
                }
                else{
                        console.log("done");
                        
                        image.style.backgroundImage = "image-set('"+ glitchFrames[name][0] +"')"
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
        imageUrl = imageUrl.slice(15)
        imageUrl = imageUrl.split('"')[0]
        console.log("Image Source:",imageUrl)

        linkObj.href = window.location.origin + "/imageView.html?imageURL=" + imageUrl
        
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
preloadImages(["assets/images/background.jpg"]);