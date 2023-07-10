const { verifyToken } = require("../helpers/jwt")
const {User} = require("../models")

module.exports={
    authentication:async (req,res,next)=>{
        try {
            let token= req.headers.access_token
            
            let{id}=verifyToken(token)
            let user=await User.findByPk(id)
            req.user={
                id:user.id,
                email:user.email
            }
            next()
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    authorization: async (req,res,next)=>{
        try {
            const{id}=req.params
            const myHero=await MyHero.findByPk(id)
            if(!myHero) throw { name: 'NotFound' }

            const userId=req.user.id
            if(myHero.UserId !== userId) throw{name: 'unathorized'}

            next()
        } catch (error) {
            next(error)
        }
    }
}