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

function generateMarkdown(data, link, avatar) {

  // Add the project title
  let readme_return = `# ${data.title}\n\n`

  // Add the license badge, if selected
  // And record the chosen license for later
  // And the link to the license
  let chosen_license;
  let licence_link;

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
        licence_link = `\nThis program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

        This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
        
        You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.`;
        break;
      case "MIT License":
        readme_return += `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n`
        licence_link = `\nCopyright (c) ${data.name}
        
        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:
        
        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.`;
        break;
      case "ISC License":
        readme_return += `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)\n\n`
        licence_link = `\nCopyright (c) ${data.name}

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted, provided that the above
        copyright notice and this permission notice appear in all copies.
        
        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
        WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
        MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
        ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
        WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
        ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
        OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`;
        break;
      case "Apache License 2.0":
        readme_return += `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n\n`
        licence_link = `\nCopyright ${data.name}

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        
            http://www.apache.org/licenses/LICENSE-2.0
        
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.`;
        break;
      case "Creative Commons 1.0":
        readme_return += `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)\n\n`
        licence_link = "\nhttps://creativecommons.org/licenses/by/1.0/";
        break;
    }
  }
  else {
    chosen_license = "No license";
    licence_link = "";
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

  // Add the table of contents
  readme_return += `
  ## Table of Contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Credits](#credits)
  * [Questions](#questions)\n\n`

  // Add the installation instructions
  if (data.description == '') {
    readme_return += `## Installation 
  _<< Please fill in your project's installation instructions >>_ \n\n`
  }
  else {
    readme_return += `## Installation 
  ${data.installation}\n\n`
  }

  // Add the usgae instructions
  if (data.description == '') {
    readme_return += `## Usage 
  _<< Please fill in your project's usage instructions >>_ \n\n`
  }
  else {
    readme_return += `## Usage 
  ${data.usage}\n\n`
  }

  // Add the license
  readme_return += `## License
  This application is licensed under: ${chosen_license}${licence_link}\n\n`

  // Add the contributing instructions
  if (data.contribution == '') {
    readme_return += `## Contributing 
  _<< Please fill in your project's contribution instructions >>_ \n\n`
  }
  else {
    readme_return += `## Contributing 
  ${data.contribution}\n\n`
  }

  // Add the test instructions
  if (data.contribution == '') {
    readme_return += `## Tests 
_<< Please fill in your project's test instructions >>_ \n\n`
  }
  else {
    readme_return += `## Tests 
${data.test}\n\n`
  }

  // Add the credits
  if (data.collaborators == '') {
    readme_return += `## Credits 
Thanks to the following for contributing to this project:\n${data.name}\n\n`
  }
  else {
    readme_return += `## Credits 
Thanks to the following for contributing to this project:\n${data.name}\n${data.collaborators}\n\n`
  }

  // Add the questions section
  readme_return += `## Questions
  If you have any questions about this project, please feel free to contact me via the following information
  ![GitHub Avatar](${avatar})
  ${data.name}\n
  ${link}
  mailto:${data.email}

`;

  return readme_return;
}

// Export the generate markdown function
module.exports = {
  generateMarkdown: generateMarkdown
}
