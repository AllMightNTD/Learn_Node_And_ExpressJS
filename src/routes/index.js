// Link thằng news đến 
const newRouter = require('./news')
const siteRowter = require('./site')

// Route nhận vào thằng app từ bên file index chính ( express instance )
function route(app) {
          
          // Dữ liệu 2 thằng news.hbs và home.hbs được nạp vào file main.hbs trong folder layouts
          
          // req : là một object có các thuộc tính trong đó có query 
          // Truy cập vào nó bằng req.query
          
          app.use('/news' , newRouter)
          
          app.use('/' , siteRowter)
          
          // Action ---> Dispatcher  ---> Function handler ( Controller trong mô hình MVC)
          
          
        //   app.get('/search', (req, res) => {
            
        //     // Lấy ra thằng object query
        //     console.log(req.query)
          
        //     // Lấy ra thằng "q"
        //     // console.log(req.query.q)
        //     // render thằng news.hbs với đường dẫn là '/news'
        //     res.render('search');
        //   });
          
          
        //   // Upline một middleware lên sever , lấy dữ liệu từ form submit lên cho client
        //   app.use(express.urlencoded({
        //     extended:true
        //   }))
        //   app.use(express.json())
        //   // Định nghĩa tuyến đường với phương thức post
        //   // Chạy vào đây khi submit form với method là "POST"
        //   app.post('/search' , (req, res) => {
          
        //     // Lấy ra object (Form data) dữ liệu gửi đi từ form 
        //     console.log(req.body);
        //     res.send('')
        //   })
          
     
}

module.exports = route;