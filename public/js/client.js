

function ajaxGET(url, callback) {

    const xhr = new XMLHttpRequest();

   
    let value = null;

    xhr.onload = function () {

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

            callback(this.responseText);

        } else {
            console.log(this.status);
            
        }
    }
    xhr.open("GET", url);
    xhr.send();


}

document.querySelector("#featuredAlbumsHTML").addEventListener("click", function(e) {
    

   ajaxGET("/albums?format=html", function (data) {

        
        document.getElementById("albumsHTML").innerHTML = data;
    });
});

document.querySelector("#featuredAlbumsJSON").addEventListener("click", function (e) {
    
    
    ajaxGET("/albums?format=json", function (data) {
        let parsedData = JSON.parse(data);
        
        
        let str = "<table><tr><th><b>Title</b></th><th><b>Artist</b></th><th><b>Genre</b></th><th><b>Year</b></th><th><b>Length</b></th></tr>";
        for (let i = 0; i <parsedData.length; i++){
            
            let item = parsedData[i];

            str+= "<tr><td>" + item["title"] + "</td><td>" + item["artist"] + "</td><td>" + item["genre"] + "</td><td>" + item["tracks"] + "</td><td>" + item["length"] + "</td></tr>";
        }
        str += "</table>";
        document.getElementById("albumsJSON").innerHTML = str;
    
    });
});
    
