//////////////////////
// NPM REQUIREMENTS //
//////////////////////

const fs = require("fs");
const inquirer = require("inquirer");
const validator = require("email-validator");
const logSymbols = require('log-symbols');
const axios = require("axios");
const ora = require('ora');
const markdown = require("./utils/generateMarkdown.js");

/////////////////////////////
// VARIABLES AND CONSTANTS //
/////////////////////////////

let github_link;
let github_avatar;

/////////////////////
// QUESTIONS ARRAY //
/////////////////////

const questions = [

    // NAME
    {
        type: "input",
        message: "To get started, please enter your NAME",
        name: "name",
        suffix: " *\n ",
        validate: value => value != "" ? true : logSymbols.warning + " Please enter your NAME!"
    },
    // GITHUB USERNAME
    {
        type: "input",
        message: "Please enter your GITHUB USERNAME",
        name: "github",
        suffix: " *\n ",
        validate: async (value) => {

            // Adds a loading animation while checking github
            const throbber = ora('Checking Github...').start();

            // API to search Github for the entered github name
            const queryUrl = `https://api.github.com/search/users?q=${value}`;

            // Call using Axios to Github
            const axiosResults = await axios.get(queryUrl).then(function (res) {

                // Check there is at least 1 user that matches
                let totalResults = res.data.total_count;
                let loginName;

                // Check there is at least 1 result
                if (totalResults > 0) {
                    loginName = res.data.items[0].login;
                }

                // If the user login is an exact match
                if ((totalResults > 0) && (loginName === value)) {

                    // Save the GITHUB user url and avatar for ease of use later
                    github_link = res.data.items[0].html_url;
                    github_avatar = res.data.items[0].avatar_url;

                    // Return true back to promise
                    return true;
                }

                // Return error back to promise
                return logSymbols.warning + " Please enter a valid GITHUB USERNAME!";
            });

            // Stop the loading animation
            throbber.stop();

            // Return result back to inquirer
            return axiosResults;
        }
    },
    // EMAIL ADDRESS
    {
        type: "input",
        message: "What is your EMAIL ADDRESS?",
        name: "email",
        suffix: " *\n ",
        // Using the email-validator to check the email address
        validate: value => validator.validate(value) ? true : logSymbols.warning + " Please enter a valid EMAIL ADDRESS!"
    },
    // PROJECT TITLE
    {
        type: "input",
        message: "What is the TITLE of your project?",
        name: "title",
        suffix: " *\n ",
        // Check the title isn't empty
        validate: value => value != "" ? true : logSymbols.warning + " Please enter your project TITLE!"
    },
    // DESCRIPTION
    {
        type: "input",
        message: "What is the DESCRIPTION of your project?\n ",
        name: "description"
    },
    // INSTALLATION INSTRUCTIONS
    {
        type: "input",
        message: "What are the INSTALLATION INSTRUCTIONS for your project?\n ",
        suffix: " Provide a step-by-step description of how to get the development environment running.\n ",
        name: "installation"
    },
    // USAGE INFORMATION
    {
        type: "input",
        message: "What is the USAGE INFORMATION for your project?\n ",
        suffix: " Provide instructions and examples for use.\n ",
        name: "usage"
    },
    // CONTRIBUTION GUIDELINES
    {
        type: "input",
        message: "What are the CONTRIBUTION GUIDELINES for your project?\n ",
        suffix: " If you created an application or package and would like other developers to contribute it, what are your requirements?\n ",
        name: "contribution"
    },
    // COLLABORATORS
    {
        type: "input",
        message: "Who are the COLLABORATORS for your project?\n ",
        suffix: " Give a shoutout to anyone who helped you with this project\n ",
        name: "collaborators"
    },
    // TEST INSTRUCTIONS
    {
        type: "input",
        message: "What are the TEST INSTRUCTIONS for your project?\n ",
        suffix: " Provide examples on how to run any associated testing functionality\n ",
        name: "test"
    },
    // SCREENSHOT
    {
        type: "confirm",
        message: "Do you have a SCREENSHOT for your project?\n ",
        name: "screenshot",
        default: true
    },
    // SCREENSHOT URL
    {
        type: "input",
        message: "What is the URL of your SCREENSHOT?",
        name: "screenshot_url",
        suffix: " *\n You can use either absolute http://full/path/to/img.jpg or relative /relative/path/to/img.jpg\n ",
        when: (answers) => answers.screenshot === true,
        validate: value => value != "" ? true : logSymbols.warning + " Please enter a SCREENSHOT URL!"
    },
    // GIF
    {
        type: "confirm",
        message: "Do you have a DEMONSTRATION GIF for your project?\n ",
        name: "gif",
        default: true
    },
    // GIF URL
    {
        type: "input",
        message: "What is the URL of your DEMONSTRATION GIF?",
        name: "gif_url",
        suffix: " *\n You can use either absolute http://full/path/to/img.gif or relative /relative/path/to/img.gif\n ",
        when: (answers) => answers.gif === true,
        validate: value => value != "" ? true : logSymbols.warning + " Please enter a DEMONSTRATION GIF URL!"
    },
    // LICENSE
    {
        type: "list",
        message: "Please select a LICENSE for this project?\n ",
        name: "license",
        suffix: " For more information, visit https://choosealicense.com/\n ",
        choices: ["GNU GPLv3", "MIT License", "ISC License", "Apache License 2.0", "Creative Commons 1.0", "No license"]
    },
    // LICENSE CHECK
    {
        type: "confirm",
        message: "Are you sure you don't want to include a LICENSE?\n ",
        name: "license_confirm",
        suffix: " We really would recommend it.\n ",
        default: false,
        when: (answers) => answers.license === "No license"
    },
    // LICENSE RETRY
    {
        type: "list",
        message: "Please select a LICENSE for this project?",
        name: "license_retry",
        suffix: " *\n For more information, visit https://choosealicense.com/\n ",
        choices: ["GNU GPLv3", "MIT License", "ISC License", "Apache License 2.0", "Creative Commons 1.0"],
        when: (answers) => answers.license_confirm === false
    }
];

////////////////////
// INIT FUNCTIONS //
////////////////////

function init() {

    console.clear();

    console.log("\n//////////////////////\n// README GENERATOR //\n//////////////////////\n");
    console.log("Please complete the following questions to complete your README.md\n -> Note: * indicates required fields.\n")

    inquirer
        .prompt(questions)
        .then(function (response) {

            console.log('\nCreating your README.md file...\n')
            console.log(response);

            // Create the readme markdown
            let readme = markdown.generateMarkdown(response, github_link, github_avatar);

            // Write the file to the readme
            fs.writeFile("README.md", readme, function (err) {
                if (err) {
                    console.log("\nSorry, there was an error writing to the README.md: " + err);
                }
                console.log("\nCongratulations, your README.md file has now been created.\nGo forth and code!");
            })
        });

}

//////////////////
// STARTUP CODE //
//////////////////

init();