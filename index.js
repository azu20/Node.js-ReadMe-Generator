const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);


const licences = {
  'BSD 3-Clause "New" or "Revised" license': "http://www.google.com"
};

async function promptUser() {
  try {
    return await inquirer.prompt([
      {
        type: "input",
        message: "What's your GitHub username?",
        name: "userName"
      },
      {
        type: "input",
        name: "title",
        message: "Project name:"
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
      //confirm what they mean by usage. 
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
          `none`]
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

    writeFileAsync("./result/ReadMe.md", text).then(() => {
      console.log("Your README file has been created.");
    });

  });



async function readMe(answers) {

  const file = `
# ${answers.title}

## Description
${answers.description}

## Table of Contents (Optional)
If your README is very long, add a table of contents to make it easy for users to find what they need.

Installation
Usage
Credits
License


## Installation
${answers.installation}

## Usage
${answers.usage}

## License
[${answers.license}](  ${licences[answers.license]} )   

## Badges
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/${answers.userName}/${answers.title}?sort=semver&style=for-the-badge)

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

