let express = require('express')
let app = express()
let userRoute = require('./routes/user')
let productRoute = require('./routes/products')
let userAuth = require('./middleware/auth')
let bodyParser= require('body-parser')

app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/products',userAuth,productRoute)
app.listen(8080,()=>{
   
})