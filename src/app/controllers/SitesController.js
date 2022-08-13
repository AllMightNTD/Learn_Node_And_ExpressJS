
// Function Construtor
class SitesController {

    // [GET], /
    index(req , res){
        res.render('home')
    }

    // [GET] , /search
    search(req , res){
        res.render('search')
    }
}

// Tạo một đối tượng và export ra ngoài
module.exports = new SitesController;