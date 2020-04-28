const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
 
//ask for github user name and pull github repo


///get user information, prompt user to answer and put together the readmeFile
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
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
        type: "input",
        name: "licenses",
        message: "What licenses will your program have?"
      },
    {
        type: "input",
        name: "Contributing",
        message: "What does the user need to know about contributing to your repository?"
      },
      {
        type: "input",
        name: "tests",
        message: "How can the user test your application?"
      },
      {
        type: "input",
        name: "questions",
        message: "If the user has questions how can they reach you?"
      },
    ]);
  }

  //generate a basic txt file 

  
writeFileAsync("test.txt", "utf8")
  .then((data) => {
    console.log(data);
})
  .catch((err) => {
      console.log(err);
  })  

///create layout of readme file, insert user input 
//generate a badge. 

