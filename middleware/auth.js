let jwt = require('jsonwebtoken')


let userAuth = (req, res, next) => {

    let authHeader = req.headers.authorization;


    if (authHeader) {

        let token = authHeader.split(' ')[1]

        jwt.verify(token, "crossx@123", (err, user) => {
            if (err) {
                res.send({
                    status: 401,
                    message: err
                })
            }else{
                req.data = user
                next()
            }
        })

    } else {
        res.send({
            status: 401,
            message: "please send auth toekn in headers"
        });
    }




}


module.exports = userAuth