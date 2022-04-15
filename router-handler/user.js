/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库操作模块
const db = require('../db/index')
//  导入 bcryptjs 包
const bcrypt = require('bcryptjs')

// 注册用户的处理函数
exports.regUser = (req, res) => {
  // 接收表单数据
  const userinfo = req.body
  // console.log(userinfo);
  
  // 判断数据是否合法
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: '用户名或密码不合法！' })
  }

  // 定义 SOL语句，查询用户名是否被占用
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userinfo.username, (err, result) => {
    // 执行 SQL 语句失败
    if (err) {
      return res.send({status: 1, message: err.message})
    }
    // 判断用户密码是否被占用
    if (result.length > 0) {
      return res.send({status: 1, message: '用户名被占用，请更换其他用户名!'})
    }
    // TODO: 用户名可以使用
    // 调用 bcrypt.hashSync() 对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 定义插入新用户的 SQL语句
    const sql = 'insert into ev_users set ?'
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, {username: userinfo.username, password: userinfo.password}, (err, result) => {
      // 判断 SQL 语句是否执行成功
      if (err) return res.send({status: 1, message: err.message})
      // 判断影响行数是否为 1
      if (result.affectedRows !== 1) return res.send({status: 1, message: '注册用户失败，请稍后再试!'})
      // 注册用户成功
      res.send({status: 0, message: '注册成功！'})
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  res.send('login OK')
}
