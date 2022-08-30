// Function Construtor
const User = require('../models/User');
// Import hàm chuyển từ object constructor sang Object literal
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    // [GET] , me/stored
    storeemployee(req, res, next) {

        // Lấy ra tất cả thằng promise  
        // Tránh việc bất đồng bộ 

        // Số phần tử xóa : countDocumentsDeleted 
        Promise.all([User.find({}) , User.countDocumentsDeleted()])
           .then(([users , deletedCount]) =>
                 res.render('me/stored-employee', {
                    deletedCount , 
                    users: multipleMongooseToObject(users),
                 }),
            )
           .catch(next)

        // User.countDocumentsDeleted()
        //   .then((deletedCount)=>{
        //     console.log(deletedCount)
        //   })
        //   .catch(() => {})

        // User.find({})
        //     .then((users) => {
        //         res.render('me/stored-employee', { users: multipleMongooseToObject(users) });
        //     })
        //     .catch((error) => next(error));
    }

    trashemployee(req , res, next){
        User.findDeleted({})
        .then((users) => {
            res.render('me/trash-employee', { users: multipleMongooseToObject(users) });
        })
        .catch((error) => next(error));
    }
}

// Tạo một đối tượng và export ra ngoài
module.exports = new MeController();
