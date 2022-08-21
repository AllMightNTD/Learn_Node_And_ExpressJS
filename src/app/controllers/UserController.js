// Function Construtor
const User = require('../models/User');
// Import hàm chuyển từ object constructor sang Object literal
const { mongooseToObject } = require('../../util/mongoose');
class UserController {
    // [GET] , news/:slug
    show(req, res, next) {
        // Tìm kiếm một document dựa trên 1 trường đó là slug (findOne)
        User.findOne({ slug: req.params.slug })
            .then((user) => {
                // Gọi hàm chuyển sang Object từ handlerbar
                res.render('user/show', { user: mongooseToObject(user) });
            })
            .catch(next);
    }
    // GET/users/create
    create(req, res, next) {
        res.render('user/create');
    }

    // POST /users / store
    // Nhan va luu du lieu
    async store(req, res, next) {
        try {
            const formData = req.body;
            const user = new User(formData);
            user.save()
                .then(() => res.redirect('/'))
                .catch(() => {});
        } catch (error) {
            console.log(error.message);
        }
    }
}

// Tạo một đối tượng và export ra ngoài
module.exports = new UserController();
