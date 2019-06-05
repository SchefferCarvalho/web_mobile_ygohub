var express = require('express');
var app = express();         
var bodyParser = require('body-parser');
var port = 3000; //porta padrão
var mysql = require('mysql');


//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);


//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'ygo',
    password : '12345',
    database : 'cup'
  });

  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}

router.get('/tb_tipo_carta', (req, res) =>{
    execSQLQuery('SELECT * FROM td_tipo_carta', res);
})

router.get('/tb_carta', (req, res) =>{
    execSQLQuery('SELECT * FROM tb_carta', res);
})

router.get('/tb_deck', (req, res) =>{
  execSQLQuery('SELECT * FROM tb_deck', res);
})

router.get('/tb_usuario', (req, res) =>{

  execSQLQuery('SELECT email_usua, pwd_usua FROM tb_usuario', res);
  
})

router.get('/ta_carta_has_ta_deck', (req, res) =>{
  execSQLQuery('SELECT * FROM ta_carta_has_ta_deck', res);
})

router.post('/tb_usuario', (req, res) => {
  var obj = JSON.parse(req.body);
 /* console.log(obj.email_usua);
  console.log(obj.nme_usua);
  console.log(obj.pwd_usua);
  console.log(obj.nicknme_usua);*/
  
  var email = obj.email_usua;
  var nome = obj.nme_usua;
  var password = obj.pwd_usua;
  var nick = obj.nicknme_usua;
  

  execSQLQuery(`INSERT INTO tb_usuario(email_usua,nme_usua,pwd_usua,nicknme_usua)VALUES('${email}','${nome}','${password}','${nick}')`, res);
  
});

