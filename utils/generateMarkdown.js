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

///////////////////////
// GENERATE MARKDOWN //
///////////////////////

function generateMarkdown(data) {

  // Add the project title
  let readme_return = `# ${data.title}\n\n`

  // Add the license badge, if selected
  // And record the chosen license for later
  let chosen_license;

  if ((data.license != "No license") && (data.license_confirm != true)) {
    if (data.license === "No license") {
      chosen_license = data.license_retry;
    }
    else {
      chosen_license = data.license;
    }

    switch (chosen_license) {
      case "GNU GPLv3":
        readme_return += `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n\n`;
        break;
      case "MIT License":
        readme_return += `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n`
        break;
      case "ISC License":
        readme_return += `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)\n\n`
        break;
      case "Apache License 2.0":
        readme_return += `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n\n`
        break;
      case "Creative Commons 1.0":
        readme_return += `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)\n\n`
        break;
    }
  }
  else {
    chosen_license = "No license";
  }

  // Add the description
  if (data.description == '') {
    readme_return += `## Description 
  _<< Please fill in your project's description >>_ \n\n`
  }
  else {
    readme_return += `## Description 
  ${data.description}\n\n`
  }

  // Add the screenshot if selected
  if (data.screenshot) {
    readme_return += `![GitHub Logo](${data.screenshot_url})\n\n`
  }

  readme_return += `
  ## Table of Contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Credits](#credits)
  * [Questions](#questions)

  ## Installation
  ${data.installation}

  ## Usage
  ${data.usage}

  ## License
  ${data.license}
  ${data.license_retry}

  ## Contributing
  ${data.contribution}

  ## Tests
  ${data.test}

  ## Credits
  ${data.name}
  ${data.collaborators}

  ## Questions
  ${data.name}
  ${data.github}
  ${data.email}

`;

  return readme_return;
}

// Export the generate markdown function
module.exports = {
  generateMarkdown: generateMarkdown
}
