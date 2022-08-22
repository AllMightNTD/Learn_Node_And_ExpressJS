var path = require('path');
const express = require('express');

// Import template engine
const xhbr = require('express-handlebars');

const morgan = require('morgan');

const routes = require('./routes/index.js');

const db = require('./config/db/index.js');

// Connect DB
db.connect();

const app = express();

const port = 5000;

var methodOverride = require('method-override');

app.use(methodOverride('_method'));

// Trả về chính cái path của thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Hỗ trợ việc gửi thông tin từ form lên sever ( middleware)
app.use(express.urlencoded());
app.use(express.json());

app.use(morgan('combined'));
// Thay thế xhbr() bằng xhbr.engine()

// Config lại đuôi file là .hbs
// Template engine
app.engine(
    'hbs',
    xhbr.engine({
        extname: '.hbs',
        // Sử dụng thư viện handlebars express
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');

// Đổi đường dẫn => views trong resouces
app.set('views', path.join(__dirname, 'resources/views'));

console.log(path.join(__dirname, 'resources/views'));

/**
 * request : chứa tất cả thông tin liên quan đến yêu cầu gửi
 * response : dữ liệu được trả về , giúp tùy chọn cấu hình trả về
 */

// Set up tuyến đường gửi đi qua 4 phương thức : get , post , put , delete

// Mặc định trình duyệt là phương thức get
// Post -> dùng JS hoặc submit Form
// Bấm thẻ a theo mặc định hoặc truy cập địa chỉ => get
// Phân biệt dựa vào cái route

// Route Init
routes(app);

app.listen(port, () => console.log(` App listening : http://localhost:${port}`));
