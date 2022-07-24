import serverConfig from '@blog/shared/config/environment'

import {encryptData, decryptData} from './encrypt'

function setEncKey() {
  if (!process.env.ENC_KEY) {
    throw new Error('env value is unavailable')
  }
  serverConfig.encKey = process.env.ENC_KEY
}

function logEncryptData(data: string) {
  if (!(data && typeof data === 'string' && data.trim().length > 0)) {
    throw new Error('No Target Data')
  }

  if (!serverConfig.encKey) {
    setEncKey()
  }
  const encrypted = encryptData(data)
  const decrypted = decryptData(encrypted)
  console.log('Encrypt Completed', {data, encrypted, decrypted}) // eslint-disable-line no-console
  if (data !== decrypted) {
    throw new Error('Encrypt Data is not same....')
  }
}

logEncryptData(process.argv[2])
