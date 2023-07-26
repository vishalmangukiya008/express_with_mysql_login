let express = require('express')
let router = express.Router()
let connection = require('../config/db_connection')
let tableName = "products"


router.get('/', (req, res) => {


    console.log(req.data)

    connection.query("SELECT * FROM " + tableName, function (err, result, fields) {
        if (err) {
            res.send(err);
        } else {

            res.send({
                product: result
            });
        }
    });
})


router.get('/my-product', (req, res) => {


    connection.query("SELECT * FROM " + tableName+" WHERE user_id=?",req.data.userId, function (err, result, fields) {
        if (err) {
            res.send(err);
        } else {

            res.send({
                product: result
            });
        }
    });
})


router.post('/add', (req, res) => {
     
    let data = req.body;
    let user = req.data;

    let productData = {
       
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image,
        user_id:user.userId
    }
    // add product
    connection.query("INSERT INTO "+tableName+" SET ?",productData, function (err, result, fields) {
        if (err){
            res.send({
                message:"product Creation faild...!"
            });
        }else{

            if(result.affectedRows>0){
                res.send({
                    message:"product adding successful...!"
                });
            }else{
                res.send({
                    message:"product Creation faild...!"
                });
            }
           
        }
       
      });
    
})




module.exports = router;