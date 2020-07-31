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

function getDepartmentId(department) {
    return new Promise((resolve, reject) => {
        let id;
        const arg = [department]
        connection.query(`SELECT id FROM departments WHERE departments.name = '${arg}'`, (err, data) => {
            if (err) reject(err)
            id = data.id;
            return resolve(data)
        })
    })

}

function getDepartmentNames() {
    return new Promise((resolve, reject) => {
        let departments = [];
        connection.query("SELECT name FROM departments", (err, data) => {
            if (err) reject(err);
            for (const department of data) {
                departments.push(department.name)
            }
            return resolve(data)
        })

    })
}
function getDepartmentTable() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM departments", (err, data) => {
            if (err) reject(err);
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
    ]).then(({
        title,
        salary,
        department
    }) => {
        storeRoles(title, salary, department)
    })
}

async function storeRoles(title, salary, department){
        const departmentId = await getDepartmentId(department);
        const arg1 = title;
        const arg2 = salary;
        await connection.query(`INSERT INTO roles (title, salary, department_id)
         VALUES ('${arg1}', ${arg2}, ${departmentId[0].id})`, (err, data) => {
            if (err) throw err;
            console.log("Success!")
        });

}

function getRoleId(role) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id FROM roles WHERE roles.title = '${role}'`, (err, data) => {
            if (err) reject(err);
            return resolve(data)
        })

    })
}
function getRoleNames() {
    return new Promise((resolve, reject) => {
        let roles = [];
        connection.query("SELECT title FROM roles", (err, data) => {
            if (err) reject(err);
            for (const role of data) {
                roles.push(role.title)
            }
            return resolve(roles)
        })

    })
}

async function addEmployees() {
    const roles = await getRoleNames()
    const names = await getEmployeeNames();
    return inquirer.prompt([
        {
            name: "firstName",
            message: "What the employee's first name??"

        },
        {
            name: "lastName",
            message: "What the employee's last name??"

        },
        {
            type: "list",
            name: "role",
            message: "What role do you want to assign to the employee?",
            choices: [...roles]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the manager that you want to assign to the employee?",
            choices: [...names, "No manager"]
        }
    ]).then(({
        firstName,
        lastName,
        role,
        manager
    }) => {
        storeEmployee(firstName, lastName, role, manager);
    })
}
async function storeEmployee(firstName, lastName, role, manager){
    const arg1 = firstName;
    const arg2 = lastName;
    const arg3 = await getRoleId(role);
    const arg4 = await getManagerId(manager)
    console.log(arg4);
    await connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
     VALUES ('${arg1}', '${arg2}', ${arg3[0].id}, ${arg4[0].id})`, (err, data) => {
        if (err) throw err;
        console.log("Success!")
    });

}

function getEmployeeNames() {
    return new Promise((resolve, reject) => {
        let names = [];
        connection.query("SELECT first_name, last_name FROM employees", (err, data) => {
            if (err) reject(err);
            for (const name of data) {
                names.push(name.first_name + " " + name.last_name)
            }
            return resolve(names)
        })

    })
}

function getManagerId(manager) {
   const managerId = manager.split(" ")
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id FROM employees WHERE employees.last_name = '${managerId[1]}'`, (err, data) => {
            if (err) reject(err);
            return resolve(data)
        })

    })
}

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
                addEmployees();
                break;
            case "View departments":
                console.table(getDepartmentTable());
                break;
            case "View roles":
                getRoleNames();
                break;
            case "View employees":
                getEmployeeNames()
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