const fs = require('fs'); 
const inquirer = require('inquirer');

// routes
const createHTML = require('./createHTML');
const Manager = require('./library/manager');
const Engineer = require('./library/engineer');
const Intern = require('./library/intern'); 
const members = []; 

// input manager
const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'manager?', 
        },
        {
            type: 'input',
            name: 'id',
            message: "manager's ID?",
        },
        {
            type: 'input',
            name: 'email',
            message: "manager's email?",
        },
        {
            type: 'input',
            name: 'office',
            message: "manager's office?",
        }
    ])
    .then(managerInput => {
        const  { name, id, email, office } = managerInput; 
        const manager = new Manager (name, id, email, office);
        members.push(manager); 
    })
};

// input teamember
const addMember = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "member's position?",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "Input name?", 
        },
        {
            type: 'input',
            name: 'id',
            message: "Member's ID.",
        },
        {
            type: 'input',
            name: 'email',
            message: "member's email.",
        },
        {
            type: 'input',
            name: 'github',
            message: "member's github username.",
            when: (input) => input.role === "Engineer",
        },
        {
            type: 'input',
            name: 'school',
            message: "what school?",
            when: (input) => input.role === "Intern",
        },
        {
            type: 'confirm',
            name: 'confirmAddMember',
            message: 'more people?',
            default: false
        }
    ])

    .then(memberData => {
        let { name, id, email, role, github, school, confirmAddMember } = memberData; 
        if (role === "Engineer") {
            member = new Engineer (name, id, email, github);
        } else if (role === "Intern") {
            member = new Intern (name, id, email, school);       
        }
        members.push(member); 

        if (confirmAddMember) {
            return addMember(members); 
        } else {
            return members;
        }
    })

};



const writeFile = data => {
    fs.writeFile('./HTML/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        }
    })
}; 

addManager()
  .then(addMember)
  .then(members => {
    return createHTML(members);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });