// Function Construtor
// Đứng ở Controller tương tác đến model
const User = require('../models/User');

class SitesController {
    // [GET], /
    index(req, res) {
        // Lấy ra dữ liệu model dưới dạng JSON
        // Bắn yêu cầu qua Model , lấy ra và trả dữ liệu lại dưới dạng JSON
        User.find({}, function (err, users) {
            if (!err) {
                res.json(users);
            } else {
                res.status(400).json({ error: 'message' });
            }
        });

        // res.render('home')
    }

    // [GET] , /search
    search(req, res) {
        res.render('search');
    }
}

// Tạo một đối tượng và export ra ngoài
module.exports = new SitesController();
