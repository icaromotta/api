const jwt = require('jsonwebtoken')
const secret = '22d6a7e7f16c139e2fe7f922af4685b8'

module.exports.sign = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: 86400 })
}

module.exports.verify = (token) => {
  return jwt.verify(token, secret)
}