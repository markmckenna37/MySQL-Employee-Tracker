const mysql = require("mysql");
const inquirer = require("inquirer");


function userPrompt() {
    inquirer
    .prompt({
        type: "list",
        message: "Would you like to bid, post, or exit?",
        choices: ["Bid", "Post", "Exit"],
        name: "choices"
    })
}