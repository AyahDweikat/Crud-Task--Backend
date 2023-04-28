const express = require('express');
const mysql = require('mysql2');

const app = express();
let PORT = 3000;
app.use(express.json())

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'task2'
});

app.get('/allUsers',(req,res)=>{
    let sql = `SELECT * FROM workers`;
    connection.execute(sql, (err, result)=>{
        if(err){
            return res.json({message:'error in sql', err})
        }
        return res.json({message:'success', result})
    })
})
app.post('/addUser',(req,res)=>{
    let {name, email, phone, age, salary} = req.body;
    let sql = `INSERT INTO workers(name, email, phone, age, salary) 
    VALUES ('${name}','${email}','${phone}','${age}','${salary}')`
    connection.execute(sql, (err, result)=>{
        if(err){
            return res.json({message:'error in sql', err})
        }
        return res.json({message:'User added successfully', result})
    })
})
app.delete('/deleteUser/:id', (req, res)=>{
    let {id} = req.params;
    let sql = `DELETE FROM workers WHERE id = ${id}`
    connection.execute(sql, (err, result)=>{
        if(err){
            return res.json({message:'error in sql', err})
        }
        if(result.affectedRows == 0) return res.json({message:'User not found'})
        return res.json({message:'User deleted successfully', result})
    })
})
app.patch('/updateUserEmail', (req, res)=>{
    let {id} = req.query;
    let {email}= req.body; 
    let sql =`UPDATE workers SET email='${email}' WHERE id=${id}`;
    connection.execute(sql, (err, result)=>{
        if(err){
            return res.json({message:'error in sql', err})
        }
        return res.json({message:'User email updated successfully', result})
    })
})
app.patch('/updateUserName', (req, res)=>{
    let {id} = req.query;
    let {name}= req.body; 
    let sql =`UPDATE workers SET name='${name}' WHERE id=${id}`;
    connection.execute(sql, (err, result)=>{
        if(err){
            return res.json({message:'error in sql', err})
        }
        return res.json({message:'User name updated successfully', result})
    })
})
app.patch('/updateUserSalary/:id', (req, res)=>{
    let {id} = req.params;
    let {salary}= req.body; 
    let sql =`UPDATE workers SET salary='${salary}' WHERE id=${id}`;
    connection.execute(sql, (err, result)=>{
        if(err){
            return res.json({message:'error in sql', err})
        }
        return res.json({message:'User salary updated successfully', result})
    })
})
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})