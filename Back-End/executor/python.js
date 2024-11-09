const {exec} = require("child_process");
const { error } = require("console");
const { resolve } = require("path");
const { stdout, stderr, stdin } = require("process");

const executePy = (filepath)=>{
    return new Promise((resolve)=>{
        exec(
            `python3 ${filepath}` ,
            (error, stdout,stderr)=>{
                if(stderr){
                    resolve(stderr);
                }
                else if (stdout){
                    resolve(stdout);
                }
                else{
                    resolve(error);
                }
            }
        );
    });
};

module.exports = {
    executePy,
};