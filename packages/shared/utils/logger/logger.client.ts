const loggerOptions = {
  trace: 'noOp',
  debug: 'noOp',
  info: 'noOp',
  warn: 'noOp',
  error: 'error',
  fatal: 'fatal'
}

export default loggerOptions

// For Typescript InterFace
export function getLogger(category: string) {
  return loggerOptions
}
