////////////////////////
// ACCEPTANCE CRITERA //
////////////////////////

// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

//////////////////////
// NPM REQUIREMENTS //
//////////////////////

const fs = require("fs");
const inquirer = require("inquirer");

/////////////////////
// QUESTIONS ARRAY //
/////////////////////

const questions = [
    {
        type: "input",
        message: "To get started, please enter your NAME",
        name: "name"
    }, 
    {
        type: "input",
        message: "Please enter your GITHUB USERNAME",
        name: "github"
    }, 
    {
        type: "input",
        message: "What is your EMAIL ADDRESS?",
        name: "email",
        validate: value => validate.validateEmail(value) ? true : logSymbols.warning + " Please enter a valid email address"
    },
    {
        type: "input",
        message: "What is the TITLE of your project?",
        name: "title"
    },
    {
        type: "input",
        message: "What is the DESCRIPTION of your project?",
        name: "description"
    },
    {
        type: "input",
        message: "What are the INSTALLATION INSTRUCTIONS for your project?",
        name: "Installation"
    },
    {
        type: "input",
        message: "What is the USAGE INFORMATION for your project?",
        name: "usage"
    },
    {
        type: "input",
        message: "Do you have any CONTRIBUTION GUIDELINES for your project?",
        name: "contribution"
    },
    {
        type: "input",
        message: "Who are the COLLABORATORS for your project?",
        name: "collaborators"
    },
    {
        type: "confirm",
        message: "Are there any TEST INSTRUCTIONS for your project?",
        name: "test_confirm",
        default: true
    },
    {
        type: "input",
        message: "What are the TEST INSTRUCTIONS for your project?",
        name: "test",
        when: (answers) => answers.test_confirm === true
    },
    {
        type: "confirm",
        message: "Do you have a SCREENSHOT for your project?",
        name: "screenshot",
        default: true
    },
    {
        type: "input",
        message: "What is the URL of your SCREENSHOT?",
        name: "screenshot_url",
        when: (answers) => answers.screenshot === true
    },
    {
        type: "list",
        message: "Please select a LICENCE for this project?",
        name: "license",
        choices: ["GNU GPLv3", "MIT License", "ISC License", "Apache License 2.0", "No license"]
    },
    {
        type: "confirm",
        message: "Are you sure you don't want to include a LICENCE?",
        name: "license_confirm",
        default: false,
        when: (answers) => answers.license === "No license"
    },
    {
        type: "list",
        message: "Please select a LICENCE for this project?",
        name: "license",
        choices: ["GNU GPLv3", "MIT License", "ISC License", "Apache License 2.0"],
        when: (answers) => answers.license_confirm === false
    }
];

////////////////////
// README CREATOR //
////////////////////

function writeToFile(fileName, data) {

}

////////////////////
// INIT FUNCTIONS //
////////////////////

function init() {

    console.log("\n//////////////////////\n// README GENERATOR //\n//////////////////////\n");
    console.log("Please complete the following questions to complete your README.md:\n")

    inquirer
        .prompt(questions)
        .then(function (response) {

            // fs.writeFile(response.username + ".txt", JSON.stringify(response), function (err) {
            //     if (err) {
            //         console.log("Error: " + err);
            //     }
                console.log("Success!");
            // })
        });

}

//////////////////
// STARTUP CODE //
//////////////////

init();

