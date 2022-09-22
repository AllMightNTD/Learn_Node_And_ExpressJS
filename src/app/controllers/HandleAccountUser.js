
// Function Construtor
const bcrypt = require('bcryptjs');
const AccountUser = require('../models/AccountUser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdasdklajlskjdlweqwoeioiu!@#%^&*())jklmsdadsdhhweqkl'
class HandleAccountUserController {
    logins(req , res , next){
        res.render('login')
    }
    registers(req , res , next){
        res.render('register')
    }
    changePasswords(req , res , next){
        res.render('change-password')
    }
   async Handlelogin(req , res , next){
        const {username , password} = req.body;

        // Tìm username là duy nhất
        const user = await AccountUser.findOne({username}).lean()
        
        if(!user){
            return res.json({status : 'error' , error : ' Invalid username or password'})
        }

        // So sánh password truyền vào và password trong data
        if(await bcrypt.compare(password , user.password)){
            const token = jwt.sign({id : user._id , username : user.username} , JWT_SECRET)
            console.log(token)
            return res.json({ status:'ok' , tokendata : token , data : atob(token.split(".")[1])})
        }

        res.json({status : 'error' ,error : ' Invalid username or password'})
    }
   async Handleregister(req , res , next){
        const {username , password : plainTextPassword } = req.body;

        // Client -> Sever : Client của bạn bằng cách nào đó tìm xem ai là người đăng nhập 
        // Why -> Sever là trung tâm của máy tính điều khiển 
        // Client(máy khách) -> không có quyền kiểm soát 
        // 2 cách để biết khách hàng john
    
        // 1 : Khách hàng tự chứng minh bằng cách nào đó theo đúng yêu cầu , dữ liệu này là không thể thay đổi (JWT)  
        // 2 : Cient-Sever chia sẻ một bí mật ngay (cookie)
    
    
    
        // Kiểm tra đầu vào có là chuỗi hay không
        if(!username || typeof username !== 'string'){
            return res.json({status : 'error' , error: 'Invalid username'})
        }
        if(!plainTextPassword || typeof plainTextPassword !== 'string'){
            return res.json({status : 'error' , error: 'Invalid password'})
        }
        // Kiểm tra độ dài password có lớn hơn hoặc bằng 5 không
        if(plainTextPassword.length < 5 ){
            return res.json({status : 'error' , error: 'Password too small . Should be atleast 6 characters '})
        }
        // Mã hóa password thành mã păm
        const password = await bcrypt.hash(plainTextPassword , 10)
    
        
        try{
           const res = await AccountUser.create({
                username,
                password
            })
            console.log('User create successfully' , res)
        }catch(error){
            console.log(error.message)
            if(error.code === 11000){
                return res.json({status :'error' , error :'Username is already in use'})
            }
            throw error
        }
    
          res.send({status : 'ok'})
        
    }
    async handleChangePassword(req , res , next){
        const {token , newpassword : plainTextPassword} = req.body;
        if(!plainTextPassword || typeof plainTextPassword !== 'string'){
            return res.json({status : 'error' , error: 'Invalid password'})
        }
        // Kiểm tra độ dài password có lớn hơn hoặc bằng 5 không
        if(plainTextPassword.length < 5 ){
            return res.json({status : 'error' , error: 'Password too small . Should be atleast 6 characters '})
        }
       console.log(plainTextPassword);
       try{
        const usernew = jwt.verify(token , JWT_SECRET)
        console.log(usernew)

        // Đối số không xác định 
        // Phải truyền đối số vào
        const newHashedPass = bcrypt.hash(plainTextPassword , 10);
        console.log(newHashedPass)
        AccountUser.updateOne({
            _id:usernew.id
        },{
            $set:{password : newHashedPass}
        })
        res.json({status:'ok'})
       }catch(error){
         console.log(error.message)
       }
    }
}

// Tạo một đối tượng và export ra ngoài
module.exports = new HandleAccountUserController;