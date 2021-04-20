const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

let employeeArray = [];

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'addEmployee',
            message: 'Would you like to add an employee to the team?',
            choices: ['Add Manager', 'Add Engineer', 'Add Intern', 'I\'m finished'],
            default: "I'm finished"
        }
    ])
    .then(data => {
        switch (data.addEmployee) {
            case 'Add Manager':
                return addManager();
                break;
            case 'Add Engineer':
                return addEngineer();
                break;
  
            case "Add Intern":
                return addIntern();
                break;
  
            case "I'm finished":
                return generateHTML();
        }
      })
  }

const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the team manager's name:"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the team manager's ID number:"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the team manager's email address:"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the team manager's office number:"
        }
    ])
    .then(data => {
        const name = data.name;
        const id = data.id;
        const email = data.email;
        const officeNumber = data.officeNumber;
        const manager = new Manager(name, id, email, officeNumber);
        employeeArray.push(manager);
        return addEmployee();
    })
};

const addEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the engineer's ID number?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email address?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub username?"
        }
    ])
    .then(data => {
        const name = data.name;
        const id = data.id;
        const email = data.email;
        const github = data.github;
        const engineer = new Engineer(name, id, email, github);
        employeeArray.push(engineer);
        return addEmployee();
    })
};

const addIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the intern's ID number?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email address?"
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the name of the intern's school?"
        }
    ])
    .then(data => {
        const name = data.name;
        const id = data.id;
        const email = data.email;
        const school = data.school;
        const intern = new Intern(name, id, email, school);
        employeeArray.push(intern);
        return addEmployee();
    })
};

const generateHTML = () =>{
    return readFileAsync('./src/main.html', 'utf8')
    .then(res => {
        console.log(res)
        return res.replace("{employeeCards}", employeeArray.map((employee) => {
        return employee.generateCard()
    }).join(""))
  });
}

const init = () => {
    addEmployee()
      .then(() => generateHTML()) 
      .then((content) => writeFileAsync('./dist/my-team-profile.html', content))
      .then(() => console.log('Successfully wrote HTML file'))
      .catch((err) => console.error(err));
};

init();
