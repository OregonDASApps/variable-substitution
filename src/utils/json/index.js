'use strict';

const fs = require('fs');
const _ = require('lodash')
const JsonUtils = require('./jsonUtils.js')


module.exports = class JsonVarSub {
    constructor() {
        
    }

    substitute(filePath, vars, delimiter, outputFile, writeToFile){
        let rawData = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
        console.log(rawData);
        let cleanedUpData = rawData.replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
        console.log(cleanedUpData);
        let jsonObject = JSON.parse(cleanedUpData);
        let jUtils = new JsonUtils()
        let modifiedJson = jsonObject;
        let variables = JSON.parse(vars)

        for(let i = 0; i < variables.length; i++ ){
            console.log("Variables: ", variables[i], variables[i]['key'], variables[i]['value'])
            modifiedJson = jUtils.printObjectReplace(modifiedJson, '', variables[i]['key'], variables[i]['value'], delimiter);
        }

        if(writeToFile) {
            fs.writeFileSync(outputFile, JSON.stringify(modifiedJson));
        }
        
        return modifiedJson
    }

}

   