const vh = document.body.offsetHeight/100
const vw = document.body.offsetWidth/100

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
        console.log(string)
        if (string == "false"){
                document.getElementById("posterSwap").style.backgroundColor = "red"
                document.getElementById("base").style.overflowY = "hidden";
                document.getElementById("posterWTAOW").style.display = "none";
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

        picture = document.getElementsByClassName(className)[0]["children"][0]
        console.log(picture)

        if (string == ""||string == "undefined") {
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
                picture.style.backgroundImage = imageUrl
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

function paperfound(){
        let paper = document.getElementById("news");
        let dark = document.getElementById("darken");

        console.log("docOffsetW", document.body.offsetWidth)
        console.log("paperOffsetW", paper.offsetWidth)
        console.log("docOffsetH", document.body.offsetHeight)
        console.log("paperOffsetH", paper.offsetHeight)

        x = ((document.body.offsetWidth - paper.offsetWidth)/200).toString()
        y = ((document.body.offsetHeight - paper.offsetHeight)/2).toString()

        console.log("x", x)
        console.log("y", y)

        if (paper.style.bottom == "-88vh"){
                paper.style.right = x + "px"
                paper.style.bottom = "5vh"
                dark.style.zIndex = "100"
        }
        else{
                paper.style.bottom = "-88vh"
                paper.style.right = "-98vw"
                dark.style.zIndex = "-1"
        }

}