/**
 * 根据项目名生成端口号
 */
const { createHash } = require('crypto')
const encrypt = (content, algorithm = 'md5') => {
  let hash = createHash(algorithm)
  hash.update(content)
  return hash.digest('hex')
}

const generatePort = (content, algorithm) => {
  const hexStr = encrypt(content, algorithm)
  const firstStr = hexStr.slice(0, 4) // 取前4位
  const decVal = Number(`0x${firstStr}`).toString(10)
  return (decVal % 48121) + 1024
}
module.exports = generatePort
