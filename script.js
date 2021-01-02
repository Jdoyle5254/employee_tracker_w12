const mysql = require("mysql");
const inquirer = require("inquirer"); 
const connection = require("./connection");


/* 
we will need to create the CLI questions and utilize switch cases see w12.01.14 
a series of searches and updates. 
need to 
create questions
add departments, roles, employees (need function to insert into table 3 separate functions)
view departments, roles, employees (need function to search 3 separate functions)
update employee roles (need function to change table information )
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Find songs by artist",
        "Find all artists who appear more than once",
        "Find data within a specific range",
        "Search for a specific song",
        "Find artists with a top song and top album in the same year"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Find songs by artist":
        artistSearch();
        break;

      case "Find all artists who appear more than once":
        multiSearch();
        break;

      case "Find data within a specific range":
        rangeSearch();
        break;

      case "Search for a specific song":
        songSearch();
        break;

      case "Find artists with a top song and top album in the same year":
        songAndAlbumSearch();
        break;
      }
    });
}
// ?'s are placeholders 
function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 100
      },
      {
        flavor: "Rocky Road"
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log("Deleting all strawberry icecream...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      flavor: "strawberry"
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

*/



startApp();

function startApp(){
inquirer
.prompt([
{
  name: "action",
  type: "list",
  message: "What would you like to do?",
  choices: [
    "Add department, role, employee",
    "View departments, roles, employees",
    "Update employee roles",
    "Exit"
  ]
}])
.then((answer)  => {
  switch (answer.action) {
  case "Add department, role, employee":
    addInformation();
    break;

    case "View departments, roles, employees":
      viewCompany();
      break;

    case "Update employee roles":
      updateEmployee();
      break;

    }
});
}

function addInformation(){
  inquirer
  .prompt ([
    {
    name: "selectThing",
    type: "checkbox",
    message: "What information are you adding?",
    choices: [
     {   
      name: "Add Department",
     }, 
     {
       name: "Add Employee",
     },
     {
       name: "Add Role", 
     },
    ]
  }
])

  .then(function(answer){
    console.log(answer)
    switch(answer.selectThing[0]) {
      case "Add Department":
      addDept();
      break;

      case "Add Employee":
      addEmp(); 
      break; 

      case "Add Role":
      addRole();
      break; 


    }

  });
}


function addDept(){
  inquirer
  .prompt ([
    {
    name: "departmentName",
    type: "input",
    message: "Please add the department name?"
  }
])
  .then(function(answer){
    var query = connection.query (
      "INSERT INTO department SET ?",
      {
        department_name: answer.departmentName,
      }
    )
  })
}

function addEmp(){
  inquirer 
  .prompt ([
    {
    name: "first_name",
    type: "input",
    message: "Please add employee first name",
  
  },
  {
    name: "last_name",
    type: "input",
    message: "Please add employee last name",
  },
  {
    name: "role_id",
    type: "input",
    message: "Please add the employee role id",

  },
  {
    name: "manager_id",
    type: "input",
    message: "Please add the employee's manager id",

  },


])


.then(function(answer){
  var query = connection.query (
    "INSERT INTO employee SET ?",
    {
      first_name: answer.first_name,
      last_name: answer.last_name,
      role_id: answer.role_id,
      manager_id: answer.manager_id,
    }
  )
})
}


function addRole(){
  inquirer
  .prompt ([
    {
    name: "title",
    type: "input",
    message: "Please add the job title",

  },
  {
    name: "salary",
    type: "input",
    message: "Please add the salary",
  },
  {
    name: "department_id",
    type: "input",
    message: "Please add the department id for this title",

  },

])

.then(function(answer){
  var query = connection.query (
    "INSERT INTO role SET ?",
    {
      job_title: answer.title,
      salary: answer.salary,
      department_id: answer.department_id,
    }
  )
})
}


 
