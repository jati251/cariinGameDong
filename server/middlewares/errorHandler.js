
module.exports = async (err, req, res, next) => {
    let status = err.name || 500
    let message = err.message || 'Internal Server Error'

    switch (err.name) {
        case "SequelizeValidationError":
            status = 400
            message = err.errors.map((el) => el.message)[0]
            break;
        case "emailEmpty":
            status = 400
            message = 'Email is required'
            break;
        case "Duplicate":
            status = 401
            message = 'You already reviewed this game,please edit instead'
            break;
        case "WishListDuplicate":
            status = 401
            message = 'You already wishlist this game,please edit instead'
            break;
        case "passwordEmpty":
            status = 400
            message = 'Password is required'
            break;
        case 'Unauthenticated':
            status = 401
            message = 'Invalid email/password'
            break;
        case 'JsonWebTokenError':
            status = 401
            message = 'Invalid token'
            break;
        case 'NotFound':
            status = 404
            message = 'Hero not found'
            break;
        case 'SequelizeUniqueConstraintError':
            status = 400
            message = 'Email must be unique'
            break;
        case 'unathorized':
            status = 403
            message = 'You are not authorized'
            break;
    }

    res.status(status).json({ message })
}