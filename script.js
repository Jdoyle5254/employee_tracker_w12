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
    name: "selectAdd",
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
    switch(answer.selectAdd[0]) {
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

function viewCompany(){
  inquirer
  .prompt ([
    {
      name: "optView",
      type: "checkbox",
      message: "What information would you like to view?",
      choices: [
        {
          name: "View Departments",
        },
        {
          name: "View Employees",
        },
        {
          name: "View Roles",
        },

      ]
    }
  ])
  .then(function(answer){
    switch(answer.optView[0]) {
      case "View Departments":
      viewDept();
      break;
      
      case "View Employees":
      viewEmp(); 
      break; 
      
      case "View Roles":
      viewRole();
      break;  
    }
    
  });
}

  function viewDept(){ 
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;        
      // console.log(res);  
      console.table(res); 
  })
}

    
  function viewEmp(){ 
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err; 
      // console.log(res)
      console.table(res);       
  }
    )}

    function viewRole(){ 
      connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;        
        // console.log(res);  
        console.table(res); 
    }
      )}  
 //create a function that will pull the employee name as a list for the user to select to 
 //make changes
  function updateEmployee(){
    connection.query("SELECT id, first_name, last_name FROM employee", function(err, res) {
       if (err) throw err;
       console.log(res)
       var names = [];
       res.forEach(element => {
         names.push({name : element.first_name + " " + element.last_name, value: element.id});
       });
       inquirer
       .prompt ([
         {
          name: "change employee", 
          type: "list",
          message: "which employee would you like to update?",
          choices: names
        },
      {
        name: "options",
        type: "checkbox",
        message: "what information would you like to change?",
        choices: [
          {
            name: "First Name",
            value: "first_name",
          }, 
          {
           name: "last_name",
          },
          {
            name: "manager_id",
          },
          {
            name: "role_id",
          },
        ]
      },
    {
      name: "updated",
      type: "input",
      message: "Please update the field chosen"
    }])
    .then((answer) => {
      var qry = "UPDATE employee Set "+ answer.options+"='" + answer.updated +"'  Where ?"
      connection.query(qry,
       function(err, res) {
        if (err) throw err;
        console.log(res)
    })
  }