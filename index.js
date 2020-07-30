const mysql = require("mysql");
const inquirer = require("inquirer");
const {
    get
} = require("http");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dmamjm11!",
    port: 3306,
    database: "employeeDB"
});



async function userPrompt() {
    return inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add departments",
            "Add roles",
            "Add employees",
            "View departments",
            "View roles",
            "View employees",
            "Update employee roles",
            "Exit"
        ],
        name: "choices"
    })
};



async function getDepartmentNames () {
    await connection.query("SELECT name FROM departments", (err, data) => {
        if (err) throw err
        let departments = [];
        for (const row of data) {
            departments.push(row.name)
        }
        return departments;
    });
}
async function getEmployeeNames() {
    const rows = await connection.query("SELECT * FROM employees");
    let names = [];
    for (const employee of rows) {
        names.push(employees.first_name + employees.lastname);
    }
    console.log(names)
    return names;
}
async function getRoles() {
    const rows = await connection.query("SELECT title FROM roles");
    let roles = [];
    for (const roles of rows) {
        roles.push(roles);
    }
    console.log(roles)
    return roles;
}
const addDepartment = async () => {
    await inquirer.prompt([{
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
    })
}
const addRoles = async (addRole) => {
    // const departments = await getDepartmentNames();
    // console.log(departments)
    await inquirer.prompt([{
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
            choices: [...addRole]
        }

    ])
}

const addEmployees = async () => {
    await inquirer.prompt([{
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

const viewDepartments = async () => {
    await inquirer.prompt([{

    }])

}

const viewRoles = async () => {
    await inquirer.prompt([{

    }])

}

const viewEmployees = async () => {
    await inquirer.prompt([{

    }])

}

const updateRole = async () => {
    await inquirer.prompt([{

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

async function main() {
    let terminate = false;
    while (!terminate) {
        const prompt = await userPrompt();
        switch (prompt.choices) {
            case "Add departments":
                await addDepartment();
                break;
            case "Add roles":
                const addRole = await getDepartmentNames();
                await addRoles(addRole);
                break;
            case "Add employees":
                await addEmployees()
                break;
            case "View departments":
                await getDepartmentNames()
                break;
            case "View roles":
                console.log("filler texst");
                break;
            case "View employees":
                await viewEmployees();
                break;
            case "Update employee roles":
                console.log("efwahuio");
                break;
            default:
                console.log("K BYE");
                terminate = true;
        }
    }
}

connection.connect((err) => {
    if (err) throw (err);
    console.log("Success!")
    main()
});