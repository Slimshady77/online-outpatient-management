var mysql =require('mysql2')
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Robin@1993',
    database: 'demo2'
    
});
// to connect to database and // to create a database from Nodejs
// con.connect(function(error){
// if(error) throw error;
// console.log("connected!")
// con.query('CREATE DATABASE demo2',function(err, result){
//     if (err) throw err;
//     console.log('Database created');

// });
// })

// to create a table
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE Products (name VARCHAR(255), product_id INT(255))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });

// To update/ Alter the table
// con.connect(function(err){
//     if(err) throw err;
//     console.log('Connected!');
//     var sql="ALTER TABLE customers ADD COLUMN id INT(50)";
//     con.query(sql, function(err, result){
//         if(err) throw err;
//         console.log('Table Altered');
//     })

// })


// to insert values in table

// con. connect(function(err){
//     if (err) throw err;
//     console.log("connected!");
//     var sql ="INSERT INTO employee (idEmployee, FullName, JobTitle, Department) VALUES (1, 'RobinCyril', 'FullStack Developer', 'IT')";
//     con.query(sql, function(err, result){
//         if (err) throw err;
//         console.log("1 record inserted !");
//     });

// });

// Select from 

// var mysql = require ('mysql2');
// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Robin@1993',
//     database: 'demo2'
// });

// SELECT record form table

// con.connect(function(err){
//     if(err) throw err;
//     con.query("SELECT  * FROM Products", function(err, result, fields){
//         if(err) throw err; 
//         console.log(result);
//     });
// });

// ORDER BY for filtering
// con.connect(function(err){
//     if (err) throw err;
//     con.query("SELECT * FROM customers ORDER BY name", function(err, result){
//         if(err) throw err;
//         console.log(result);
//     });
// })

// DELETE THE FIELD
// con.connect(function(err){
//     if(err) throw err;
//     var sql="DELETE FROM customers WHERE address = 'Mahavir enclave'";
//     con.query(sql, function(err, result){
//         if(err) throw err;
//         console.log("Number of records deleted:" +result.affectedRows);
//     });
// });


// DELETE the table
// con.connect(function(err){
//     if (err) throw err;
//     var sql="DROP TABLE customers";
//     con.query(sql, function(err, result){
//         if(err) throw err;
//          console.log("Table Deleted!");
//     });
// })


// UPDATE record in the table
// con.connect(function(err){
//     if(err) throw err;
//     var sql="UPDATE customers SET address='Nasirpur' WHERE address ='Mahavir enclave'";
//     con.query(sql, function(err, result){
//         if (err) throw err;
//         console.log(result.affectedRows+ "record(s) updated");
//     });
// });

// LIMIT the records
// con.connect(function(err){
//     if (err) throw err;
//     var sql="SELECT * FROM customers LIMIT 7";
//     con.query(sql, function(err, result){
//         if (err) throw err;
//         console.log(result);
//     })
// })


// JOIN example
// con.connect(function(err){
//     if (err) throw err;
//     var sql = "SELECT customers.name AS customer, Products.product_id AS id FROM customers JOIN Products on customers.name =Products.name";
//     con.query(sql, function(err, result){
//         if(err) throw err;
//         console.log(result);
//     })
// })


// WHERE example # 2
// con.connect(function(err){
//     if (err) throw err;
//     con.query("SELECT * FROM customers WHERE address LIKE 'M%'", function(err, result){
//         if (err) throw err;
//         console.log(result);
//     })
// })


// mysql.escape method to prevent sql injection
// con.connect(function(err){
// if (err) throw err;
// var address = 'Mandawali';
// var sql= 'SELECT * FROM customers WHERE address='+ mysql.escape(address);
// con.query(sql, function(err, result){
//     if (err) throw err;
//      console.log(result);
// })

// })

// WILDCARD Example
con.connect(function(err){
    if (err) throw err;
    console.log("connected!");
    // var sql= "SELECT * FROM customers WHERE address LIKE 'Ma%";
    // con.query('SELECT * FROM customers where ADDRESS LIKE  "_ALAM"',function(error,result){
    //     if(error)throw error;
    //     console.log(result)
    // })
})



// con.query('SELECT * FROM customers where ADDRESS LIKE  "[M-P]%"',function(error,result){
//         if(error)throw error;
//         console.log(result)
//     })
module.exports= con;