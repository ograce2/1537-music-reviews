//REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");


//map files system paths to app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use("/fonts", express.static("./public/fonts"));

app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

app.get("/albums", function (req, res) {
    
    let formatOfResponse = req.query["format"];
    
    if (formatOfResponse == "html"){
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./app/data/albums.html", "utf8"));
        
    } else if (formatOfResponse == "json") {
        res.setHeader("Content-Type", "application/json");
        res.send(fs.readFileSync("./app/data/albums.js", "utf8"));
    } else {
        res.send({status: "fail", msg: "Wrong format!"});
    }
})



//RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("Assignment 5 listening on port " + port + "!");

});