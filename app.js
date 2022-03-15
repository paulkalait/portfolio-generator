//imports the object at the bottom of page-template.js into this .js
const { writeFile, copyFile}= require('./utils/generate-site.js')
const inquirer = require("inquirer");
const generatePage = require("./src/page-template.js");


const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Emter your Github Username",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your github Username!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  //If there's no projects array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log("Add a new Project");
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of you project?",
        validate: (projectInput) => {
          if (projectInput) {
            return true;
          } else {
            console.log("Please enter your project name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required)",
        validate: (projectDescription) => {
          if (projectDescription) {
            return true;
          } else {
            console.log("Please enter the projects Description!");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (check all that apply)",
        choices: [
          "Javascript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Boostreap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "Enter the Github link to your project. (Required)",
        validate: (githubLink) => {
          if (githubLink) {
            return true;
          } else {
            console.log("Please enter the projects github link!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err)
  })