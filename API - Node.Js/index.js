const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


//criar uma instancia do Express

const app = express();
app.use(bodyParser.json());

//configuração do BD

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'api'
});

//Conectar ao BD

db.connect((err)=>{
    if(err){
        console.error('Erro ao conectar com o Banco de Dados.', err);
        return; 
    }
    console.log('Conectado ao Banco de Dados com sucesso.');
})

//Rota para inserir usuário

app.post('/usuario',(req,res)=>{
    const {nome,email, endereço, cidade, estado}=req.body;
    if(!nome || !email || !endereço || !cidade || !estado){
        return res.status(400).json({message:'Nome e E-mail são obrigatórios.'});
    }
    const query='INSERT INTO USUARIO(nome, email, endereço, cidade, estado)values(?,?,?,?,?)';
    db.query(query ,[nome, email, endereço, cidade, estado], (err,result)=>{
        if(err){
            console.error('Erro ao inserir dados.',err);
            return res.status(500).json({message:'Erro ao inserir Dados.'});
        }
        res.status (201).json({message:'Inserido com sucesso.',userID: result.insertId});
    }) 
   
});

//Iniciar servidor na porta 3000

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})