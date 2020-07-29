const mysql = require("mysql");
const inquirer = require("inquirer");
const { createConnection } = require("net");


function userPrompt() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ["Add departments", "Add roles", "Add employees", "View departments", "View roles", "View employees", "Update employee roles", "Exit"],
        name: "choices"
    }).then(({
        choices
    }) => {
        switch (choices) {
            case "Add departments":
                console.log("cool");
                break;
            case "Add roles":
                console.log("yueah");
                break;
            case "Add employees":
                console.log("alfith");
                break;
            case "View departments":
                console.log("got my");
                break;
            case "View roles":
                console.log("filler texst");
                break;
            case "View employees":
                console.log(" to text");
                break;
            case "Update employee roles":
                console.log("efwahuio");
                break;
            default:
                console.log("K BYE");
                return false
         }
        
    });
};










//  function init() {
//     const data =  userPrompt();
//     console.log(data.choices)
//     if (data.choices == "Add employees") {
//       nextPrompt()
//     }
// };
//  function nextPrompt() {
//     const { name, lastName, role, manager } =  employeePrompt();
//     console.log(name);

// }

userPrompt()