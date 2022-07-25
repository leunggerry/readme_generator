/** Required Packages
 **************************************************************************************************/
const inquirer = require("inquirer");
const fs = require("fs");
const { writeToFile } = require("./utils/writeToFile");
const generateMarkdown = require("./utils/generateMarkdown.js");
/** Global Constants
 **************************************************************************************************/
const readmeFileName = "README.md";
// TODO: Create an array of question objects for user input
const userQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your name? (required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter your name");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "githubUsername",
    message: "What is your GitHub username? (required)",
    validate: (githubUsernameInput) => {
      if (githubUsernameInput) {
        return true;
      } else {
        console.log("Please enter your GitHub username");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "What is your email? (required)",
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log("Please enter your email");
        return false;
      }
    },
  },
];
const projectQuestions = [
  {
    type: "input",
    name: "projectTitle",
    message: "What is your project title? (required)",
  },
  {
    type: "input",
    name: "description",
    message: "Please give a brief description of this project?",
  },
  {
    type: "input",
    name: "installInstructions",
    message: "Please provide the steps to install this application (required)",
  },
  {
    type: "input",
    name: "usage",
    message: "Please provide some instructions and examples for use. Include screenshots",
  },
  {
    type: "input",
    name: "license",
    message: "Please choose the type of license",
    choices: [],
  },
  {
    type: "input",
    name: "contributors",
    message: "Please enter contributors.",
  },
  {
    type: "checkbox",
    name: "technology",
    message: "What technology did you use?",
    choices: ["HTML", "JS", "CSS", "ES6", "jQuery", "Bootstrap", "Node"],
  },
];

var answers = [];
/** Function Definitions
 **************************************************************************************************/
// TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

function promptUserInfoInput() {
  return inquirer.prompt(userQuestions).then((answers) => {
    console.log(answers);
  });
}

function promptProjectInfoInput() {
  return inquirer.prompt(projectQuestions).then((answers) => {
    console.log(answers);
  });
}
// TODO: Create a function to initialize app
function init() {
  // Step 1: prompt for user info
  promptUserInfoInput()
    // Step 2: then prompt for project info
    .then(promptProjectInfoInput)
    // Step 3: generate the md data
    // Step 4: then write the md data to the md file
    .then((markdownData) => {
      writeToFile("./README.md", markdownData);
    })
    // Step 5: console log markdown repsonse
    .then((createMarkdownResponse) => {
      console.log(createMarkdownResponse);
    })
    //console log error if any of the steps failed
    .catch((err) => {
      console.log(err);
    });
}

/** Main Function
 **************************************************************************************************/
// Function call to initialize app
init();
