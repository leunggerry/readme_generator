/** Required Packages
 **************************************************************************************************/
const inquirer = require("inquirer");
const fs = require("fs");
const { writeToFile } = require("./utils/writeToFile");
const generateMarkdown = require("./utils/generateMarkdown.js");
/** Global Constants
 **************************************************************************************************/
const README_FILENAME = "README.md";
// TODO: Create an array of question objects for user input
const USER_QUESTIONS = [];
const PROJECT_QUESTIONS = [
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
  {
    type: "input",
    name: "projectTitle",
    message: "What is your project title? (required)",
    validate: (projectTitle) => {
      if (projectTitle) {
        return true;
      } else {
        console.log("Please enter your project name");
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmDescription",
    message: "Would you like to give a brief description about this project?",
    default: false,
  },
  {
    type: "editor",
    name: "description",
    message: "Please give a brief description of this project?",
    when: ({ confirmDescription }) => {
      if (confirmDescription) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmInstallInstructions",
    message: "Are there any installation instructions you can provide?",
    default: false,
  },
  {
    type: "editor",
    name: "installInstructions",
    message: "Please provide the steps to install this application:",
    when: ({ confirmInstallInstructions }) => {
      if (confirmInstallInstructions) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmUsage",
    message: "Are there any examples of usage.",
    default: false,
  },
  {
    type: "editor",
    name: "usage",
    message:
      "Please provide some instructions and examples for use. Please include your screenshots in the res/images directory",
    when: ({ confirmUsage }) => {
      if (confirmUsage) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmUsage",
    message: "Did you include any images of how to use the application?",
    default: false,
  },
  {
    type: "confirm",
    name: "confirmLicense",
    message: "Do you have a license for your application",
    default: false,
  },
  {
    type: "list",
    name: "license",
    message: "Please choose the type of license",
    choices: ["Apache", "GNU", "ISC", "MIT"],
    when: ({ confirmLicense }) => {
      if (confirmLicense) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmContributors",
    message: "Do you have any other contributors?",
    default: false,
  },
  {
    type: "input",
    name: "contributors",
    message: "Please enter contributors.",
    when: ({ confirmContributors }) => {
      if (confirmContributors) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmTests",
    message: "Do you have any tests you can provide?",
    default: false,
  },
  {
    type: "editor",
    name: "tests",
    message: "Please enter test cases.",
    when: ({ confirmTests }) => {
      if (confirmTests) {
        return true;
      } else {
        return false;
      }
    },
  },
];

/** Global Variables
 **************************************************************************************************/
var userPropertiesObj = {};
var projectPropertiesObj = {
  name: {
    name: "",
    include: false,
  },
  githubUsername: {
    githubUsername: "",
    include: false,
  },
  email: {
    email: "",
    include: false,
  },
  projectTitle: {
    projectTitle: "",
    include: true,
  },
  description: {
    description: "",
    include: false,
  },
  installInstructions: {
    installInstructions: "",
    include: false,
  },
  usage: {
    usage: "",
    include: false,
  },
  license: {
    license: "",
    include: false,
  },
  contributors: {
    contributors: "",
    include: false,
  },
  tests: {
    test: "",
    include: false,
  },
};
var dataObj = {
  userPropertiesObj,
  projectPropertiesObj,
};
/** Function Definitions
 **************************************************************************************************/
function promptUserInfoInput() {
  console.log(`
  ====================================
  Provide some info about yourself
  ====================================\n`);
  return inquirer.prompt(USER_QUESTIONS);
}

function promptProjectInfoInput() {
  console.log(`
  ====================================
  Provide some info about your project
  ====================================\n`);
  return inquirer.prompt(PROJECT_QUESTIONS);
}

// TODO: Create a function to initialize app
function init() {
  // Step 1: then prompt for project info
  promptProjectInfoInput()
    // Step 2: save into global proj info
    .then((projectInfo) => {
      console.log("then promise set 2: " + projectInfo);
      return setProjectInfo(projectInfo);
    })
    // Step 3: generate the md data
    .then((projectDataObj) => {
      return generateMarkdown(projectDataObj);
    })
    // Step 4: then write the md data to the md file
    .then((markdownData) => {
      return writeToFile("./generated_README.md", markdownData);
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

/** Utility Functions
 **************************************************************************************************/
function getProjectSectionPropertyName(property) {
  let section;
  switch (property) {
    case "name":
    case "githubUsername":
    case "email":
    case "projectTitle":
    case "description":
    case "installInstructions":
    case "usage":
    case "license":
    case "contributors":
    case "tests":
      section = property;
      break;
    default:
      console.log("Unknown section property: " + property);
      section = "";
      break;
  }
  return section;
}
function setUserInfo(userInfo) {
  for (let property in userInfo) {
    userPropertiesObj[property] = userInfo[property];
  }
}

function getUserProperty(key) {
  if (!(key in userPropertiesObj)) {
    return false;
  }
  return userPropertiesObj[key];
}

/**
 * @description Take the input data and set it to the
 *              corresponding project properties
 * @param {*} projInfo
 * @returns {Object} projectPropertiesObj
 */
function setProjectInfo(projInfo) {
  let section = "";
  for (let property in projInfo) {
    section = getProjectSectionPropertyName(property);
    //if there is a section
    if (section) {
      setProjectProperty(section, property, projInfo[property]);
    }
  }
  console.log("setProjectInfo: " + projectPropertiesObj);
  return projectPropertiesObj;
}

function getProjectProperty(key) {
  if (!(key in projectPropertiesObj)) {
    return false;
  }
  return projectPropertiesObj[key];
}

function setProjectProperty(section, key, value) {
  projectPropertiesObj[section][key] = value;
  projectPropertiesObj[section]["include"] = true;
  // console.log(projectPropertiesObj);
}
/** Main Function
 **************************************************************************************************/
// Function call to initialize app
init();
