const mysql = require("mysql");
const inquirer = require("inquirer");
const {
    createConnection
} = require("net");


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
                addDepartment();
                break;
            case "Add roles":
                addRoles();
                break;
            case "Add employees":
                addEmployees()
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


const addDepartment = () => {
    inquirer.prompt([{
        name: "department",
        message: "What is the name of the department you want to add?"
    }])
}
const addRoles = () => {
    inquirer.prompt([
        {
            name: "title",
            message: "What is the title of the role you want to add?"

        },
        {
            name: "salary",
            message: "What is the annual salary of the role you want to add?"
        },
        {
            type: "list",
            name: "department",
            message: "What department do you want to add your role to?",
            //gotta figure out how to read from our sql file
            choices: [""]
        }

    ])

}

const addEmployees = () => {
    inquirer.prompt([
        {
        name: "firstName",
        message: "What is the employee's first name?"
        },
        {
        name: "lastName",
        message: "What is the employee's first name?"
        },
        {
        type: "list",
        name: "role",
        message: "What role do you want to assign to the employee?",
        //gotta figure out how to read from our sql file
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"]
        },
        {
        name: "manager",
        message: "Who is the employee's manager? (if none, just press 'enter'.)"
        }

    ])
    userPrompt()
}

const viewDepartments = () => {
    inquirer.prompt([{

    }])

}

const viewRoles = () => {
    inquirer.prompt([{

    }])

}

const viewEmployees = () => {
    inquirer.prompt([{

    }])

}

const updateRole = () => {
    inquirer.prompt([{

    }])

}










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