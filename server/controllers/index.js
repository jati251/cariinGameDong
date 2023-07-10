const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User, WishList, Review } = require('../models')
const axios = require('axios')
const midtransClient = require('midtrans-client');

class Controller {
    static async register(req, res, next) {
        let { email, password } = req.body

        if(password.length){
            let newPassword = hashPassword(password)
        }
        console.log(req.body);
        try {
            const user = await User.create({
                email: email,
                password: newPassword
            })
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            // console.log(req.body);
            if (!email) throw ({ name: "emailEmpty" })
            if (!password) throw { name: "passwordEmpty" }

            const user = await User.findOne({
                where: {
                    email,
                }
            })

            if (!user || !comparePassword(password, user.password)) throw { name: "Unauthenticated" }

            let token = signToken({ id: user.id })

            res.status(200).json({
                access_token: token
            })
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async getGames(req, res, next) {
        let { search, dates, page, pagesize, platforms } = req.query
        console.log(search);
        try {
            let query = `?key=${process.env.RAWG_TOKEN}&page=${page}&page_size=${pagesize}&`
            if (search) {
                query += 'search=' + search + '&'
            }
            if (dates) {
                query += `dates=${dates}-01-01,${dates}-12-31&`
            }
            if (platforms) {
                query += `platforms=${platforms}&`
            }
            // console.log(query);
            let { data } = await axios({
                method: 'GET',
                url: 'https://api.rawg.io/api/games' + query,
            })
            res.status(200).json({
                message: "success get games",
                games: data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getGameDetail(req, res, next) {
        console.log('asdas');
        const { id } = req.params

        try {
            let query = '?key=54071a691b7949ac8041f21d827fce48'

            let { data } = await axios({
                method: 'GET',
                url: 'https://api.rawg.io/api/games/' + id + query,
            })
            res.status(200).json({
                message: "success get game detail",
                game: data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    //wishlist
    static async createWishList(req, res, next) {
        const userId = req.user.id;
        const { id } = req.params
        const {gameName,imgUrl}=req.body
        console.log(id);
        try {
            let findWishlist = await WishList.findAll({
                where: {
                    userId,
                    gameId: id
                }
            })
            if (findWishlist.length) throw ({ name: 'WishListDuplicate' })

            let query = '?key=54071a691b7949ac8041f21d827fce48'
            let { data } = await axios({
                method: 'GET',
                url: 'https://api.rawg.io/api/games/' + id + query,
            })
            if (!data) throw { name: "NotFound" };

            const newWishList = await WishList.create({
                userId,
                gameId: id,
                gameName,
                imgUrl
            });
            // console.log(newWishList);
            res.status(201).json({
                message: "success created wishlist",
                newWishList,
            });
        } catch (error) {
            if (error.response) {
                res.status(response.status).json({
                    msg: response.statusText
                });
            } else {
                next(error)
            }
        }
    }

    static async getWishList(req, res, next) {
        const userId = req.user.id;
        try {
            const wishList = await WishList.findAll({
                where: {
                    userId,
                },
            });
            console.log(wishList);
            res.status(200).json({
                message: "success get wishlist",
                wishList,
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteWishList(req, res, next) {
        const { id } = req.params;
        try {
            const deleted = await WishList.destroy({
                where: {
                    id,
                },
            });
            if (!deleted) throw { name: "NotFound" };
            res.status(200).json({
                message: `wishlist success to delete`,
            });
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    static async createReview(req, res, next) {
        const { description, gameId, rating } = req.body
        const { id } = req.user
        try {
            const findReview = await Review.findAll({
                where: {
                    gameId,
                    userId: id
                }
            })

            if (findReview.length) throw ({ name: 'Duplicate' })

            const newReview = await Review.create({
                description,
                userId: id,
                gameId,
                rating
            })
            res.status(201).json(newReview)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async editReview(req, res, next) {
        const { description, rating } = req.body
        const { id } = req.params
        try {
            const editReview = await Review.update({
                description,
                rating
            },
                {
                    where: {
                        id,
                    }
                })

            res.status(200).json({ message: 'Review has been changed' })
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async deleteReview(req, res, next) {
        const { id } = req.params;
        try {
            const review = await Review.findByPk(id);
            if (!review) throw { name: "NotFound" };
            const deleted = await review.destroy({
                where: {
                    id,
                },
            });
            res.status(200).json({
                message: `${review.name} Success to delete`,
            });
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    static async getReview(req, res, next) {
        const { id } = req.params;
        try {
            const Reviews = await Review.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            })
            res.status(200).json(Reviews)
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async findStores(req, res, next) {
        const { id } = req.params;
        let query = '?key=54071a691b7949ac8041f21d827fce48'
        try {
            let { data } = await axios({
                method: 'GET',
                url: `https://api.rawg.io/api/games/${id}/stores` + query,
            })
            res.status(200).json({
                message: "success get stores",
                stores: data,
            });
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
  
    static async donateAdmin(req, res, next) {
        console.log('sampai disini');
        try {
            const user = await User.findByPk(req.user.id)
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_TOKEN
            });

            let parameter = {
                "transaction_details": {
                    "order_id": `DONATION_${Math.floor(100000 + Math.random() * 800000)}/GG`,
                    "gross_amount": 75000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    "email": user.email,
                    // "phone": "08111222333"
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            console.log(midtransToken);
            res.status(200).json({
                token: midtransToken
            })

        } catch (error) {
            console.log(error);
        }
    }
    
}

module.exports= Controller