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
    // Nhận và lưu dữ liệu
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

    // Hiển thị form chỉnh sửa
    // GET/users/:id/edit
    edit(req, res, next) {
        User.findById(req.params.id)
            .then((user) => {
                // Gọi hàm chuyển sang Object từ handlerbar
                res.render('user/edit', { user: mongooseToObject(user) });
            })
            .catch(next);
    }

    // [PUT]/users/:id
    async Update(req, res, next) {
        try {
            // Hàm updateOne : chỉnh sửa theo yêu cầu
            // Truyền vào là thằng id muốn chỉnh sửa , và cập nhật thằng body của nó
            User.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/me/stored/employee'))
                .catch(next);
        } catch (error) {
            console.log(error.message);
        }
    }
}

// Tạo một đối tượng và export ra ngoài
module.exports = new UserController();
