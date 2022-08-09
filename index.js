// Nạp Express vào 

const express = require('express')
// Gọi express ra => trả về 1 đối tượng đại diện cho ứng dụng node js 
const app = express()

// port : đại diện cho run ở cổng nào 
const port = 3000

// Định nghĩa route : tuyến đường 
app.get('/tin-tuc', (req, res) => {
    // Trả về trình duyệt Hello world
  res.send('Hello World!')
})

// Lắng nghe port ( cổng 3000 )
// 127.0.0.1 - localhost : host name 
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

// Cách chạy : node index.js ( viết trong terminal)