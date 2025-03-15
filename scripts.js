
function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
}
function begone(chosenId){
        var element = document.getElementById(chosenId);
        element.style.top = "-200vh";
        sleep(3000).then(() => {
                document.getElementById("base").style.overflowY = "visible"
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
        if (string == "true"){
                element.style.display = "flex";
                document.getElementById("base").style.overflowY = "hidden"
                document.getElementById("posterSwap").style.backgroundColor = "#00FF00"
        }
        else{
                document.getElementById("posterSwap").style.backgroundColor = "red"
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

function schrodingersXeroPicture(){
        string = getCookie("xeroImage")
        console.log(string)

        picture = document.getElementsByClassName("xero")[0]["children"][0]
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
