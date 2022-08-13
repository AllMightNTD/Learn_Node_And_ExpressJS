var path = require('path');
const express = require('express')

// Import template engine
const xhbr = require('express-handlebars')

const morgan = require('morgan');
const { log } = require('console');

const routes = require('./routes')
const app = express();

const port = 3000;

// Trả về chính cái path của thư mục public 
app.use(express.static(path.join(__dirname , 'public')))

app.use(morgan('combined'))
// Thay thế xhbr() bằng xhbr.engine()

// Config lại đuôi file là .hbs 
app.engine('hbs', xhbr.engine({extname: '.hbs'}));
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



app.listen(port , () => console.log(`Example app listening : http://localhost:${port}`));