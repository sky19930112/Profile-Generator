const inputManager = function (manager) {
    return `
        <section>
            <h1>${manager.name} Manager</h1>
        </section>
        <section>
            <p>ID: ${manager.id}</p>
            <p>Email:${manager.email}</p>
            <p>Office: ${manager.office}</p>
        </section>
    `}

const inputEngineer = function (engineer) {
    return `
        <section>
            <h1>${engineer.name} Engineer</h1>
        </section>
        <section>
            <p>ID: ${engineer.id}</p>
            <p>Email:${engineer.email}</p>
            <p>Github:${engineer.github}</p>
        </section>
    `}


const inputIntern = function (intern) {
    return `
        <section>
            <h1>${intern.name} Intern</h1>
        </section>
        <section>
            <p>ID: ${intern.id}</p>
            <p>Email:${intern.email}</a></p>
            <p>School: ${intern.school}</p>
        </section>
    `};

createHTML = (data) => {
    dataContainer = []; 
    for (let i = 0; i < data.length; i++) {
        let member = data[i];
        let role = member.getRole(); 
        if (role === 'Manager') {
            const managerCard = inputManager(member);
            dataContainer.push(managerCard);
        }
        if (role === 'Engineer') {
            const engineerCard = inputEngineer(member);
            dataContainer.push(engineerCard);
        }
        if (role === 'Intern') {
            const internCard = inputIntern(member);
            dataContainer.push(internCard);
        }
    }
    let container = dataContainer.join('')
    let result = createPage(container); 
    return result;

}


const createPage = function (container) {   
  return`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Profile</title>
  </head>
  <body>
      <header>
        <H1>Team Profile</H1>
      </header>
      <main>
        <h2>${container}</h2>
      </main>
  </body>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  </html>
`}
module.exports = createHTML; 