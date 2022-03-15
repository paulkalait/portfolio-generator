const fs = require('fs')

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err =>{
            //if theres an error, reject the promise and send the error to the promise's '.catch()' method
            if(err){
                reject(err)
                //return out of the function here to make sure the promise doesnt accidentally execute the resolve() function as well
                return;
            }
            //if everuthing went well, resolve the promise and send the successful data to the '.then()' methon
            resolve({
                ok: true,
                message: "File Created!"
            })
        })
    })
};

const copyFile = copyContent => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./dist/style.css', './dist/style.css', err =>{
            //if theres an error, reject the promise and send the error to the promise's '.catch()' method
            if(err){
                reject(err)
                //return out of the function here to make sure the promise doesnt accidentally execute the resolve() function as well
                return;
            }
            //if everuthing went well, resolve the promise and send the successful data to the '.then()' methon
            resolve({
                ok: true,
                message: "File Copied!"
            })
        })
    })
}
//export these functions into app.js
module.exports = { writeFile, copyFile}