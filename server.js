const express = require("express");
const path= require("path");
const fs= require("fs");
const exp = require("constants");

const app = express();
const port = process.env.port||3000;

// app.use((req,res)=>{
//     res.status(404);
//     res.send("File Not Found!");
// }) hamesha not found aayega
app.use(function(req,res,next){
    console.log("Required Date:"+new Date());
    next();
})

app.use(function(req,res,next){
    var filepath = path.join(__dirname,"static",req.url);
    fs.stat(filepath,function(err,fileinfo){
        if(err){
            next();
            return
        }
        if(fileinfo.isFile()){
            res.sendFile(filepath);
        }
        else{
            next();
        }
    })
});

app.listen(port,()=>{
    console.log(`Server Listening To Port ${port} `);
})