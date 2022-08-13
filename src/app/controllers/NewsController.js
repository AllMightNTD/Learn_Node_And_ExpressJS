
// Function Construtor
class NewsController {

    // [GET], news
    index(req , res){
        res.render('news')
    }

    // [GET] , news/:slug
    show(req , res){
        res.send('NEW DETAIL')
    }
}

// Tạo một đối tượng và export ra ngoài
module.exports = new NewsController;