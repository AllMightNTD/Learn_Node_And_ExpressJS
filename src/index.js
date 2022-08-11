var path = require('path');
const express = require('express')

// Import template engine
const xhbr = require('express-handlebars')

const morgan = require('morgan');
const { log } = require('console');

const app = express();

const port = 5000;

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

app.get('/', (req, res) => {
  // render thằng home.hbs với đường dẫn là '/'
    res.render('home');
});

// Dữ liệu 2 thằng news.hbs và home.hbs được nạp vào file main.hbs trong folder layouts

// req : là một object có các thuộc tính trong đó có query 
// Truy cập vào nó bằng req.query

app.get('/news', (req, res) => {

  // render thằng news.hbs với đường dẫn là '/news'
  res.render('news');
});

app.get('/search', (req, res) => {
  
  // Lấy ra thằng object query
  console.log(req.query)

  // Lấy ra thằng "q"
  // console.log(req.query.q)
  // render thằng news.hbs với đường dẫn là '/news'
  res.render('search');
});

// Định nghĩa tuyến đường với phương thức post
// Chạy vào đây khi submit form với method là "POST"
app.post('/search' , (req, res) => {
  res.render('search')
})


app.listen(port , () => console.log(`Example app listening : http://localhost:${port}`));