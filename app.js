const inquirer = require('inquirer')

const promptUser = () => {
 return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name? (required)',
        validate: nameInput => {
            if(nameInput) {
                return true;
            }else{
                console.log('Please enter your name!')
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Emter your Github Username',
        validate: githubInput => {
            if(githubInput) {
                return true;
            }else{
                console.log('Please enter your github Username!')
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself'
    }
])
};
const promptProject = portfolioData => {
    //If there's no projects array property, create one
    if(!portfolioData.projects){
        portfolioData.projects = [];
    }
    console.log('Add a new Project')
    return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is the name of you project?',
            validate: projectInput => {
                if(projectInput) {
                    return true;
                }else{
                    console.log('Please enter your project name!')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescription => {
                if(projectDescription) {
                    return true;
                }else{
                    console.log('Please enter the projects Description!')
                    return false
                }
            }
        },
        {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (check all that apply)',
        choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Boostreap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)',
            validate: githubLink => {
                if(githubLink) {
                    return true;
                }else{
                    console.log('Please enter the projects github link!')
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject){
            return promptProject(portfolioData);
        }else{
            return portfolioData;
        }
    })
}
promptUser()
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData);
})
// const fs = require('fs')
// const generatePage = require('./src/page-template.js')

// const pageHTML = generatePage(nameOne, github)

// fs.writeFile('index.html', generatePage(nameOne, github), err =>{
//     if(err) throw new err

//     console.log('Portfolio Complete! Check out index.html to see the output')
// })