// Function Construtor
const User = require('../models/User');
// Import hàm chuyển từ object constructor sang Object literal
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    // [GET] , me/stored
    storeemployee(req, res, next) {
        User.find({})
            .then((users) => {
                res.render('me/stored-employee', { users: multipleMongooseToObject(users) });
            })
            .catch((error) => next(error));
    }
}

// Tạo một đối tượng và export ra ngoài
module.exports = new MeController();
