const fs = require('fs')
const generatePage = require('./src/page-template.js')
const profileDataArgs = process.argv.slice(2, process.argv.length)

const [nameOne, github] = profileDataArgs


fs.writeFile('index.html', generatePage(nameOne, github), err =>{
    if(err) throw new err

    console.log('Portfolio Complete! Check out index.html to see the output')
})