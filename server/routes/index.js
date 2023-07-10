const router=require('express').Router()
const Controller=require('../controllers')
const { authentication, authorization } = require('../middlewares/auth')


router.get('/games', Controller.getGames)
router.get('/gamedetail/:id', Controller.getGameDetail)
router.get('/review/:id', Controller.getReview)
router.get('/gamestores/:id', Controller.findStores)

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authentication)
router.post('/donation',Controller.donateAdmin)
router.get('/wishlist', Controller.getWishList)
router.post('/wishlist/:id', Controller.createWishList)
router.delete('/wishlist/:id', Controller.deleteWishList)

router.post('/review', Controller.createReview)
router.delete('/review/:id', Controller.deleteReview)
router.put('/review/:id', Controller.editReview)

module.exports=router