let express = require('express')
let jwt = require('jsonwebtoken')
let router = express.Router()
let sha256 = require('sha256')
let connection = require('../config/db_connection')
let tableName = "user"



function getToken(email,first_name,last_name){
    return jwt.sign({email:email,first_name:first_name,last_name:last_name}, "crossx@123");
}

router.post('/login',(req,res)=>{

    let data = req.body;
    console.log(req.body);

    data.password = sha256.x2(data.password)

    connection.query("SELECT * FROM "+tableName+" WHERE email = ? AND password = ?",[data.email,data.password],function (err, result, fields) {
        if (err){
            res.send(err);
        }else{
            if(result.length<1){
                res.send({
                    message:"inValid Login...!"
                });
            }else{
                res.send({
                    accessToken:getToken(result[0].email,result[0].first_name,result[0].last_name)
                });
            } 
            
        }
       
      });
})

router.post('/register',(req,res)=>{


    let data = req.body;

    data.password = sha256.x2(data.password)

    let userData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
    }

    connection.query("INSERT INTO "+tableName+" SET ?",userData, function (err, result, fields) {
        if (err){
            res.send({
                message:"user Registration faild...!"
            });
        }else{

            if(result.affectedRows>0){
                res.send({
                    message:"Registration successful...!"
                });
            }else{
                res.send({
                    message:"user Registration faild...!"
                });
            }
           
        }
       
      });


})

module.exports = router;