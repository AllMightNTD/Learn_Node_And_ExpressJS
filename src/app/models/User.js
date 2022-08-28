const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');

// ADD thư viện xóa mềm
var mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, default: 'DungNguyen', maxLength: 30, required: true },
        description: String,
        image: String,
        videoID: String,
        // Tạo slug ngẫu nhiên để phân biệt
        // Dùng unique để không bao giờ có slug giống nhau
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// ADD nó vào (plugin)
mongoose.plugin(slug);


// Thêm plugin để xóa mềm ( soft delete)

// OverrideMethods : Ghi đè lại tất cả các phương thức : find , findOne , findOneAndUpdate ,update , updateOne , updateMany
// Thêm deletedAt = true để xem thời gian xóa
User.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

// Khi ấn xóa thằng nào thì trong db sẽ thêm một trường deleted = true

module.exports = mongoose.model('User', User);
