const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dmamjm11!",
    port: 3306,
    database: "employeeDB"
});



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
async function obtainDepartmentId (departmentName) {
    const query = `SELECT * FROM department WHERE department.name = ?`;
    const args = [departmentName];
    const rows = await connection.query(query, args);
    console.log(rows[0].id);

}

const addDepartment = () => {
    inquirer.prompt([{
        name: "name",
        message: "What is the name of the department you want to add?"
    }]).then(({
        id,
        name
    }) => {
        connection.query("INSERT INTO departments SET ?", {
            id: id,
            name: name
        },
        (err, result) => {
            if (err) throw err;
            console.log(`Added ${name} to company departments`);
            obtainDepartmentId();
        }
        )
    }
    )
}
const addRoles = () => {
    connection.query("SELECT name FROM departments", function(err, data, fields) {
    (err, result) => {
        if (err) throw err;
        console.table(result);
      }
    })
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
            choices: ["1", "2", "3"]
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


connection.connect((err) => {
    if (err) throw (err);
    console.log("Success!")
    userPrompt()
});