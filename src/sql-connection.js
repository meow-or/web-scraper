const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'procedures',
  password: ''
});

connection.connect( err => {
  if(err) {
    console.log(err);
    return err;
  } else {
    console.log('Database - OK')
  }
});

let query = 'SELECT * FROM procedures';

connection.query(query, (err, result, field) => {
  console.log(err);
  console.log(result);
});

connection.end(err => {
  if(err) {
    console.log(err);
    return err;
  } else {
    console.log('Database - Close')
  }
})



const insertData = ({procedureId, procedureNumber, procedurePageLink}) => {

  const procedureInfo = [procedureId, procedureNumber, procedurePageLink, 1, 1];

  const sql = "INSERT INTO procedures VALUE (?,?,?,?,?)";
  connection.execute(sql, procedureInfo, function(err, results) {
    if(err) {
      console.log(err);
    } else {
      console.log("Данные успешно добавлены")
    }
  })
}


module.exports.insertData = insertData;


