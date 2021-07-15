const jwt = require('jsonwebtoken')

const isAuth = (req,res,next)=>{
    try {
        const token = req.header('SHAHAL-USER_TOKEN')
        if(!token){
            return res.status(401).json({msg:"No User token found"})
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET)

        if(!verified){
            return res.status(401).json({msg:"token verification failed"})
        }

        req.user = verified.id
        next()
    } catch (error) {
        if(error.message === 'invalid signature') {
            return res.status(401).json({err:"Invalid token"})
        }
        if(error.message === "Unexpected token \f in JSON at position 12") {
            return res.status(401).json({err:"Invalid token"})
        }
        res.status(500).json({err:error.message}) 
    }
}

module.exports = isAuth