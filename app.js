const inquirer = require('inquirer')

inquirer
.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    }
])
.then(answer => console.log(answer))
// const fs = require('fs')
// const generatePage = require('./src/page-template.js')

// const pageHTML = generatePage(nameOne, github)

// fs.writeFile('index.html', generatePage(nameOne, github), err =>{
//     if(err) throw new err

//     console.log('Portfolio Complete! Check out index.html to see the output')
// })