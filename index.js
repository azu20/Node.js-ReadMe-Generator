const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

const licenses = {
  'Apache License 2.0': "https://opensource.org/licenses/Apache-2.0",
  'BSD 3-Clause "New" or "Revised" license': "https://opensource.org/licenses/BSD-3-Clause",
  'BSD 2-Clause "Simplified" or "FreeBSD" license': "https://opensource.org/licenses/BSD-2-Clause",
  'GNU General Public License (GPL)': "https://opensource.org/licenses/gpl-license",
  'GNU Library or "Lesser" General Public License (LGPL)': "https://opensource.org/licenses/lgpl-license",
  'MIT license': "https://opensource.org/licenses/MIT",
  'Mozilla Public License 2.0': "https://opensource.org/licenses/MPL-2.0",
  'Common Development and Distribution License': "https://opensource.org/licenses/CDDL-1.0",
  'Eclipse Public License version 2.0': "https://opensource.org/licenses/EPL-2.0",
  'none': "No license used"
};

async function promptUser() {
  try {
    return await inquirer.prompt([
      {
        type: "input",
        name: "userName",
        message: "What's your GitHub username?"
      },
      {
        type: "input",
        name: "title",
        message: "Project name(no spaces):"
      },
      {
        type: "input",
        name: "description",
        message: "Write project description"
      },
      {
        type: "input",
        name: "installation",
        message: "What needs to be installed to successfully run your program?"
      },
      {
        type: "input",
        name: "usage",
        message: "How will your program be used?"
      },
      {
        type: 'list',
        name: 'license',
        message: 'What license do you want to use?',
        choices: [`Apache License 2.0`,
          `BSD 3-Clause "New" or "Revised" license`,
          `BSD 2-Clause "Simplified" or "FreeBSD" license`,
          `GNU General Public License (GPL)`,
          `GNU Library or "Lesser" General Public License (LGPL)`,
          `MIT license`,
          `Mozilla Public License 2.0`,
          `Common Development and Distribution License`,
          `Eclipse Public License version 2.0`,
          `None`]
      },
      {
        type: "input",
        name: "contributing",
        message: "What are the steps that people should take to contribute to your project?"
      },
      {
        type: "input",
        name: "tests",
        message: "Are there any specific steps to run tests?"
      },
      {
        type: "input",
        name: "questions",
        message: "If the user has questions how can they reach you?"
      },
    ]);
  } catch (err) {
    console.log(err);
  }
}

//put both objects into one object 
promptUser()
  .then(async (responses) => {

    const responsesFromgitHub = await getGitProfile(responses.userName);//.then((profile) => console.log(profile));

    return allValuesNeeded = {
      ...responsesFromgitHub,
      ...responses
    };

  })
  .then(async (allValues) => {
    const textForFile = await readMe(allValues);

    console.log(textForFile);

    return textForFile;
  })
  .then((text) => {

    writeFileAsync("README.md", text).then(() => {
      console.log("Your README file has been created.");
    });

  });

async function readMe(answers) {

  const file = `
# ${answers.title}

* ![Video](https://j.gifs.com/Jy9yD2.gif "How to video")

## Description
${answers.description}


## Table of Contents

  * [Installation]( ##installation ) 
  * [Usage]( ##usage ) 
  * [License]( #license )
  * [Badges]( ##badges )
  * [Contributing]( ##contributing )
  * [Tests]( ##tests )
  * [Contact]( ##contact )

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
[${answers.license}](  ${licenses[answers.license]} )   

## Badges
![GitHub release (latest SemVer)]( https://img.shields.io/github/v/release/${answers.userName}/${answers.title}?sort=semver&style=for-the-badge )

## Contributing
${answers.contributing}      

## Tests
${answers.contributing} 

## Contact
${answers.questions}

* ${answers.email || "Email not listed"}
* ![Avatar](${answers.avatar} "Github Avatar") 
`
  return file;
};


async function getGitProfile(userName) {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${userName}`
    );
    // console.log(data.avatar_url);
    // console.log(data.email);
    return {
      avatar: data.avatar_url,
      email: data.email,
    }
  } catch (err) {
    console.log(err);
  }
};

