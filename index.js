const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

//ask for github user name and pull github repo
// async function getGitURL() {
//   try {
//     const { userName } = await inquirer.prompt({
//       message: "What's your GitHub username?",
//       name: "userName"
//     });

//     const { data } = await axios.getGitURL(
//       `https://api.github.com/users/${userName}`
//     )
//   }
// }

///get user information, prompt user to answer and put together the readmeFile
// const writeFileAsync = util.promisify(fs.writeFile);

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
  } catch (err) {
    console.log(err);
  }
}

//  promptUser()
// .then(function(response) {
//   console.log(response);
  
// });

// axios 
//   .get("https://api.github.com/users/alfredherr", config)
//   .then(res) => {
//     console.log(res.data); 

//     const { img } =  res.data; 

//     appendFileAsynch("Readme.txt", img + "\n")
//       .then () => (console.log("success!"))
    
//       readFileAsyng("Readme.txt", "utf-8")
//       .then(data) => {
//         console.log("below"); 
//         console.log(data); 
//       }
//   }


//write a promise call 
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
//print values in an object 
getGitProfile("azu20").then((profile) => console.log(profile)); 





  //generate a basic txt file


// writeFileAsync("test.txt", "utf8")
//   .then((data) => {
//     console.log(data);
// })
//   .catch((err) => {
//       console.log(err);
//   })  

///create layout of readme file, insert user input 
//generate a badge. 

