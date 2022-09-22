const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');

// ADD thư viện xóa mềm
var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const userAccount = new Schema(
    {
        username: { type: String, unique : true, required: true },
        password:{type: String, required : true},
        slug: { type: String, slug: 'username', unique: true },
    },
    {collection:'usersAccount'},
    {
        timestamps: true,
    },
);

// ADD nó vào (plugin)
mongoose.plugin(slug);


// Thêm plugin để xóa mềm ( soft delete)

// OverrideMethods : Ghi đè lại tất cả các phương thức : find , findOne , findOneAndUpdate ,update , updateOne , updateMany
// Thêm deletedAt = true để xem thời gian xóa
userAccount.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

// Khi ấn xóa thằng nào thì trong db sẽ thêm một trường deleted = true

module.exports = mongoose.model('userAccount', userAccount);