const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
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

module.exports = mongoose.model('User', User);
