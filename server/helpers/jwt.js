const {verify,sign}=require('jsonwebtoken')

module.exports={
    signToken:(payload)=>
    sign(payload,process.env.ACCESS_SECRET_TOKEN),

    verifyToken:(payload)=>
    verify(payload,process.env.ACCESS_SECRET_TOKEN)
}