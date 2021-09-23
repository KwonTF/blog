import {getLogger, configure, Configuration} from 'log4js'

const consoleAppender = {
  type: 'console'
}

const appenders = {
  consoleAppender
}

const configuration: Configuration = {
  appenders,
  categories: {
    default: {appenders: ['consoleAppender'], level: 'debug'}
  }
}

configure(configuration)
const logger = getLogger()
export default logger
