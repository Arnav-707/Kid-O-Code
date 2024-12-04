const express = require("express");
const cors = require('cors');
const { generateFile } = require("./gen_file")
const { executeCpp } = require("../executor/cpp");
const { executeC } = require("../executor/c");
const { executeJava } = require("../executor/java");
const { executePy } = require("../executor/python");
var bodyParser = require('body-parser');
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

app.post("/compile", async (req, res) => {
    const { language, code } = req.body;
    if (code == undefined) {
        return res.status(404).json({ success: false, error: "Empty Code" });
    }
    try {
        const filepath = await generateFile(language, code);
        let output;
        switch(language) {
            case "c":
                output = await executeC(filepath);
                break;
            case "python":
                output = await executePy(filepath);
                break;
            case "cpp":
                output = await executeCpp(filepath);
                break;
            case "java":
                output = await executeJava(filepath);
                break;
        }
        // console.log(output);
        return res.json({ filepath, output });


    } catch (err) {
        res.status(500).json({ err });
    }

})
module.exports = app;