var path = require('path');
const express = require('express')

// Import template engine
const xhbr = require('express-handlebars')

const morgan = require('morgan')

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

app.get('/', (req, res) => {
  // render thằng home.hbs với đường dẫn là '/'
    res.render('home');
});

// Dữ liệu 2 thằng news.hbs và home.hbs được nạp vào file main.hbs trong folder layouts

app.get('/news', (req, res) => {

  // render thằng news.hbs với đường dẫn là '/news'
  res.render('news');
});

app.listen(port , () => console.log(`Example app listening : http://localhost:${port}`));