
var express = require('express');
var router = express.Router();
let app = express();
app.set('view engine', 'ejs');

var con = require('./connect_mysql');

/* GET home page. */
router.get('/data_table', function(req, res, next) {
    res.render('data_table', { title: 'Express' });
});

router.get('/get_data', function(req, res, next){

    var draw = req.query.draw;

    var start = req.query.start;

    var length = req.query.length;

    var order_data = req.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'employee.idEmployee';

        var column_sort_order = 'desc';
    }
    else
    {
        var column_index = req.query.order[0]['column'];

        var column_name = req.query.columns[column_index]['data'];

        var column_sort_order = req.query.order[0]['dir'];
    }

    //search data

    var search_value = req.query.search['value'];

    var search_query = `
     AND (idEmployee LIKE '%${search_value}%' 
      OR Full_Name LIKE '%${search_value}%' 
      OR Job_Title LIKE '%${search_value}%' 
      OR Department LIKE '%${search_value}%'
     )
    `;

    //Total number of records without filtering

    con.query("SELECT COUNT(*) AS Total FROM employee", function(error, data){

        var total_records = data[0].Total;

        //Total number of records with filtering

        con.query(`SELECT COUNT(*) AS Total FROM employee WHERE 1 ${search_query}`, function(error, data){

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT * FROM employee 
            WHERE 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

            var data_arr = [];

            con.query(query, function(error, data){

                data.forEach(function(row){
                    data_arr.push({
                        'idEmployee' : row.idEmployee,
                        'Full_Name' : row.Full_Name,
                        'Job_Title' : row.Job_Title,
                        'Department' : row.Department
                    });
                });

                var output = {
                    'draw' : draw,
                    'iTotalRecords' : total_records,
                    'iTotalDisplayRecords' : total_records_with_filter,
                    'aaData' : data_arr
                };

                res.json(output);

            });

        });

    });

});



app.use('/', router);
app.listen(5200);
