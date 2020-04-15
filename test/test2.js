const express = require('express')

const app = express()

function log_middleware(req,res,next) {
  console.log('请求来了')
  next()
}

app.use(log_middleware)

// 加载一个static的中间件

app.use(express.static('static', {
  extensions: ['html', 'htm']
}))

function demo_middleware(err, req, res, next) {
  // 1. 异常
  // 2. 处理下业务功能，然后转交控制权--next
  // 3. 响应请求--结束响应-->当做路由的处理函数
}


// /test?name=23213
function valid_name_middleware(req, res, next) {
  let {name} = req.query;
  if(!name || name.length) {
    res.json({
      message: '缺少name参数'
    })
  } else {
    next()
  }
}

// 1.
app.all('*', valid_name_middleware)

// 2.
app.get('/test', (req, res) => {
  res.json({
    message: 'test'
  })
})

app.listen(3000, (req, res) => {
  console.log('服务启动成功')
})