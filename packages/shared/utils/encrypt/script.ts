import {ServerConfig} from '@blog/shared/config'

import {encryptData, decryptData, setEncKey} from './encrypt'

function logEncryptData(data: string) {
  if (!(data && typeof data === 'string' && data.trim().length > 0)) {
    throw new Error('No Target Data')
  }

  if (!ServerConfig.encKey) {
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
