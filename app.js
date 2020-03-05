const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const team = [];

function newTeam() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter your full name: ",
                name: "name"
            }, {
                type: "list",
                message: "Please choose your desired role:",
                choices: ["Manager", "Engineer", "Intern"],
                name: "role"
            }, {
                type: "input",
                message: "Please enter your email: ",
                name: "email"
            }, {
                type: "input",
                message: "Enter ID number:",
                name: "id"
            }
        ])
        .then(function (res) {
            console.log(res)
            if (res.role === "Manager") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is your office number?",
                            name: "officeNumber"
                        }
                    ]).then(function (data) {
                        const Management = new Manager(res.name, res.id, res.email, data.officeNumber)
                        team.push(Management);
                        addAnotherEmployee()
                    })
            }
            else if (res.role === "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please enter your GitHub User Name: ",
                            name: "username"
                        }
                    ]).then(function (data) {
                        const Engin = new Engineer(res.name, res.id, res.email, data.officeNumber)
                        team.push(Engin);
                        addAnotherEmployee()
                    })
            }
            else if (res.role === "Intern") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please input your University: ",
                            name: "School"
                        }
                    ]).then(function (data) {
                        const Inte = new Intern(res.name, res.id, res.email, data.officeNumber)
                        team.push(Inte);
                        addAnotherEmployee()
                    })
            }
        })
}

newTeam()

function writeTeam() {
    fs.writeFile("team.html", render(team), function (err) {
        if (err) throw error
    })
}

function addAnotherEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add an additional team member?:",
                choices: ["Yes", "No"],
                name: "addOn"
            }
        ])
        .then(function (choice) {
            if (choice.addOn === "Yes") {
                newTeam()
            }
            else {
                writeTeam()
            }
        })
}
    // Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```