//requring sql, inquirer, console.table
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


//function to add departments. returns an inquier prompt, then inserts the user's input into the departments table
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
//function to get a specific department ID, recieves parameters from store roles.
function getDepartmentId(department) {
    return new Promise((resolve, reject) => {
        let id;
        const arg = [department]
        //Query to get data from departments table
        connection.query(`SELECT id FROM departments WHERE departments.name = '${arg}'`, (err, data) => {
            if (err) reject(err)
            id = data.id;
            return resolve(data)
        })
    })

}
//function to get department names for add role function
function getDepartmentNames() {
    return new Promise((resolve, reject) => {
        let departments = [];
        //query to get data from departments table
        connection.query("SELECT name FROM departments", (err, data) => {
            if (err) reject(err);
            for (const department of data) {
                departments.push(department.name)
            }
            return resolve(data)
        })

    })
}
//Function to add new role. Awaits department names and renders them in the inquirer prompt.
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
        //calling function, passing data in as parameters.
        storeRoles(title, salary, department)
    })
}
//Function to store roles to the database table, recieves data from addroles
async function storeRoles(title, salary, department) {
    //awaiting department ID
    const departmentId = await getDepartmentId(department);
    const arg1 = title;
    const arg2 = salary;
    //Query to insert data into roles table
    await connection.query(`INSERT INTO roles (title, salary, department_id)
         VALUES ('${arg1}', ${arg2}, ${departmentId[0].id})`, (err, data) => {
        if (err) throw err;
        console.log(`Successfully added ${arg1} to company roles.`)
        userPrompt()
    });

}
//Function to get role id
function getRoleId(role) {
    //Returns a promise for the querty to pull data from the roles table
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id FROM roles WHERE roles.title = '${role}'`, (err, data) => {
            if (err) reject(err);
            return resolve(data)
        })

    })
}
//Function to get the titles of the roles
function getRoleNames() {
        //Returns a promise for the querty to pull data from the roles table
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
//Function to console.table the departments table
function getDepartmentTable() {
    const query = `SELECT departments.id AS 'ID',
    departments.name AS 'Department Name'
    FROM departments
    ORDER BY departments.id ASC`;
    const table = connection.query(query, (err, data) => {
        if (err) throw err;
        console.log('\n')
        console.table(data);
    })
    userPrompt();
}
//Function to console.table the roles table
function getRoleTable() {
    const query = `SELECT roles.id AS 'ID',
    title AS 'Title',
    salary AS 'Salary',
    roles.department_id AS 'Department ID'
    FROM departments, roles
    WHERE roles.department_id = departments.id
    ORDER BY roles.id ASC`;
    const table = connection.query(query, (err, data) => {
        if (err) throw (err);
        console.log('\n')
        console.table(data)
    })
    userPrompt();
}

//Function to console.table the employees table
function getEmployeeTable() {
    const query = `SELECT employees.id AS 'ID',
    first_name AS 'First Name',
    last_name AS 'Last Name',
    roles.title AS 'Title',
    departments.name AS 'Department',
    roles.salary AS 'Salary',
    manager_id AS 'Manager ID'
    FROM employees, roles, departments
    WHERE employees.role_id = roles.id
    AND roles.department_id = departments.id
    ORDER BY employees.id ASC`;
    const table = connection.query(query, (err, data) => {
        if (err) throw (err);
        console.log('\n')
        console.table(data)
    })
    userPrompt();
}
//Inquirer prompt to add employees, waits for role names, and employee names to pass them as choices.
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
        //calling function to store employees to the database
        storeEmployee(firstName, lastName, role, manager);
    })
}
//Function to store employees to the database, recieves parameters from add employees function
async function storeEmployee(firstName, lastName, role, manager) {
    const arg1 = firstName;
    const arg2 = lastName;
    //Awaiting role id and manager id
    const arg3 = await getRoleId(role);
    const arg4 = await getManagerId(manager)
    //Query to insert data into employees table
    await connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
     VALUES ('${arg1}', '${arg2}', ${arg3[0].id}, ${arg4[0].id})`, (err, data) => {
        if (err) throw err;
        console.log(`Successfully added ${arg1} ${arg2} to employee database.`);
        userPrompt();
    });

}
//Function to get employee names to use in inquirer prompt
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
//Function to get manager ID to use in inquirer prompt
function getManagerId(manager) {
    const managerId = manager.split(" ")
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id FROM employees WHERE employees.last_name = '${managerId[1]}'`, (err, data) => {
            if (err) reject(err);
            return resolve(data)
        })

    })
}
//Initial prompt for the user to choose their desired action.
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
        //Feeding choices into a switch case. Callback functions for each case
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
                getDepartmentTable();
                break;
            case "View roles":
                getRoleTable();
                break;
            case "View employees":
                getEmployeeTable();
                break;
            case "Update employee roles":
                console.log("7")
                break;
            default:
                console.log("Thanks! See you soon!");
                connection.end();
        }
    })
};


//Connection 
connection.connect((err) => {
    if (err) throw (err);
    console.log("Successfully connected as id " + connection.threadId)
    console.log("Welcome to the Employee Database Tracker!");
    userPrompt()
});