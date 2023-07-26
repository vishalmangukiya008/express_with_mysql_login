let express = require('express')
let app = express()
let userRoute = require('./routes/user')



app.use(express.json())
app.use('/user',userRoute)

app.listen(8080,()=>{
   
})