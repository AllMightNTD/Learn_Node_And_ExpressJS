// Function Construtor
// Đứng ở Controller tương tác đến model
const User = require('../models/User');

// Import hàm chuyển từ object constructor sang Object literal
const { multipleMongooseToObject } = require('../../util/mongoose');

class SitesController {
    // [GET], /

    // Vào controller từ client request lên
    index(req, res, next) {
        // Lấy ra dữ liệu model dưới dạng JSON
        // Bắn yêu cầu qua Model , lấy ra và trả dữ liệu lại dưới dạng JSON
        // methd find truyền vào một callback

        // User.find({}, function (err, users) {
        //     if (!err) {
        //         res.json(users);
        //     } else {
        //         res.status(400).json({ error: 'message' });
        //     }
        // });

        // Dùng promise trọc vào Model lấy ra dữ liệu mang về controller
        User.find({})

            // Lấy ra dữ liệu mang về controller (users)
            .then((users) => {
                // Lấy dữ liệu trong model user truyền vào home

                //  Biến nó thành Object Literal từ Object Constructor

                // Trọc sang view (render sang view ) truyền data lấy từ model sang view
                // view đọc file , logic và render ra màn hình từ đó trọc về browser
                res.render('home', { users: multipleMongooseToObject(users) });
            })
            .catch((error) => next(error));

        // res.render('home')
    }

    // [GET] , /search
    search(req, res) {
        res.render('search');
    }
}

// Tạo một đối tượng và export ra ngoài
module.exports = new SitesController();
