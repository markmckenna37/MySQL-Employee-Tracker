const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dmamjm11!",
    port: 3306,
    database: "employeeDB"
});



addDepartment = () => {
    return inquirer.prompt([{
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
                userPrompt()
            }
        )
    })
}

function getDepartmentId(departmentName) {
    return new Promise((resolve, reject) => {
        let id
        const arg = [departmentName]
        connection.query("SELECT id FROM employee WHERE orderNumber = '$orderNumber'", (err, data) => {
            if (err) reject(err)
        })
        return resolve(data)
    })

}

function getDepartmentNames() {
    return new Promise((resolve, reject) => {
        let departments = [];
        let ids = [];
        connection.query("SELECT name FROM departments", (err, data) => {
            if (err) reject(err);
            for (const department of data) {
                departments.push(department.name)
            }

            console.log(data)
            return resolve(data)
        })

    })
}

async function addRoles() {
    const departments = await getDepartmentNames()
    return inquirer.prompt([{
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
            choices: [...departments]
        }
    ]).then(() => {
        // let departmentId;
        // for (const value of departments) {
        //     if (value.name === department) {
        //         departmentId = value.id;
        //     }
        // }
        console.log("Success!")
    })
}

// async function storeRoles(title, salary, department) {
//     const departmentId = await getDepartmentId(department);
//     console.log(departmentId)
//     const arg1 = title;
//     const arg2 = salary;
//     connection.query("INSERT INTO roles SET (title, salary, department_id)", {
//         title: arg1,
//         salary: arg2,
//         department_id: departmentId
//     },
//     (err, result) => {
//         if (err) throw err;
//         console.log(`Added ${arg1} to company roles.`);
//     }
// }
function userPrompt() {
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
    }).then(({
        choices
    }) => {
        switch (choices) {
            case "Add departments":
                addDepartment();
                break;
            case "Add roles":
                addRoles()
                break;
            case "Add employees":
                console.log("3")
                break;
            case "View departments":
                getDepartmentNames()
                break;
            case "View roles":
                console.table()
                break;
            case "View employees":
                console.log("6")
                break;
            case "Update employee roles":
                console.log("7")
                break;
            default:
                console.log("K BYE");
        }
    })
};



connection.connect((err) => {
    if (err) throw (err);
    console.log("Success!")
    userPrompt()
});