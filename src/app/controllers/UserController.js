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
            // Link đến trang danh sách khóa học
                .then(() => res.redirect('/me/stored/employee'))
                .catch(() => {});
        } catch (error) {
            console.log(error.message);
        }
    }

    // Hiển thị form chỉnh sửa
    // GET/users/:id/edit
    // Chỉnh sửa theo ID
    edit(req, res, next) {
        User.findById(req.params.id)
            .then((user) => {
                // Gọi hàm chuyển sang Object từ handlerbar
                res.render('user/edit', { user: mongooseToObject(user) });
            })
            .catch(next);
    }

    // [PUT]/users/:id
    // Cập nhật theo ID
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

    // [DELETE]/users/:id
    // Xóa theo ID
    Delete(req, res, next) {
        try {
            // Hàm updateOne : chỉnh sửa theo yêu cầu
            // Truyền vào là thằng id muốn chỉnh sửa , và cập nhật thằng body của nó
            User.delete({ _id: req.params.id }, req.body)

                // Thêm header location để quay trở lại trang trước
                .then(() => res.redirect('back'))
                .catch(next);
        } catch (error) {
            console.log(error.message);
        }
    }
    // [PATCH]/restore/:id
    // Khôi phục
    restore(req ,res , next){
            User.restore({ _id: req.params.id })

                // Thêm header location để quay trở lại trang trước
                .then(() => res.redirect('back'))
                .catch(next);
    }

    // Xóa Vĩnh Viễn 
    // [DELETE]/deleteOne/:id
    DeletedForever(req, res, next) {
            User.deleteOne({ _id: req.params.id }, req.body)

                // Thêm header location để quay trở lại trang trước
                .then(() => res.redirect('back'))
                .catch(next);
    }
    // [POST]/users/handle-form-action
    handleFormAction(req , res , next){
         switch(req.body.action){
            case 'delete':
                // Xóa theo mảng ID chuyền lên
                // Xóa xong quay lại
                User.delete({ _id: { $in : req.body.usersID } })

                // Thêm header location để quay trở lại trang trước
                .then(() => res.redirect('back'))
                .catch(next);
                break
            default:
                res.json({message: 'Action invalid'})
         }
    }
}

// Tạo một đối tượng và export ra ngoài
module.exports = new UserController();
