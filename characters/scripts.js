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

function moveUp(id){
        let element = document.getElementsByClassName(id)[0];
        element.style.marginTop = "150px"
}