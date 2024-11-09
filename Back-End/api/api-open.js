const express = require("express");
const cors = require('cors');
const {generateFile} = require("./gen_file")
const { executeCpp } = require("../executor/cpp");
const { executeC } = require("../executor/c");
const { executeJava } = require("../executor/java");
const { executePy } = require("../executor/python");
var bodyParser = require('body-parser');
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json());
const mongoose = require('mongoose');
app.use(cors());

const url = require("dotenv").config().parsed.url;
mongoose.connect(url)
    .then(() => {
        console.log("open route connected");
    })
    .catch((err) => {
        console.log("Some issue while connecting to the database", err);
    });

app.post("/compile",async (req,res)=>{
    const {language, code} = req.body;
    if(code == undefined){
        return res.status(404).json({success:false,error:"Empty Code"});
    }
    try {
        const filepath = await generateFile( language, code );
        let output;
        if (language === "c") {
            output = await executeC(filepath);
        } else if (language === "python") {
            output = await executePy(filepath);
        } else if (language === "cpp") {
            output = await executeCpp(filepath);
        }
        else if (language==='java'){
            output = await executeJava(filepath);
        }
        console.log(output);
        return res.json({ filepath, output });
      

    } catch(err) {
        res.status(500).json({ err });
    }

})
module.exports = app;