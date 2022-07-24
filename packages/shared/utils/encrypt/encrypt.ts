import crypto from 'crypto'

import serverConfig from '@blog/shared/config/environment'

const ENCRYPT_ALGORITHEM = 'aes-256-gcm'

function getKeyBuffer() {
  const {encKey} = serverConfig
  if (!encKey) throw new Error('Key is Unavailable in dotenv')
  // 32 byte needed
  return Buffer.from(encKey, 'utf8')
}

export function encryptData(text?: string) {
  const key = getKeyBuffer()
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv(ENCRYPT_ALGORITHEM, key, iv)
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()

  return Buffer.concat([iv, tag, encrypted]).toString('base64')
}

export function decryptData(data: string) {
  if (!data) return ''

  const key = getKeyBuffer()
  const bufferData = Buffer.from(data, 'base64')
  const iv = bufferData.slice(0, 12)
  const tag = bufferData.slice(12, 28)
  const encrypted = bufferData.slice(28)

  const decipher = crypto.createDecipheriv(ENCRYPT_ALGORITHEM, key, iv)
  decipher.setAuthTag(tag)

  return decipher.update(encrypted, undefined, 'utf8') + decipher.final('utf8')
}
