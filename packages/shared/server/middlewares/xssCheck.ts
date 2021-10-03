import {Context} from 'koa'
import HttpStatus from 'http-status-codes'
import xss from 'xss'

const xssCSSCheck = new RegExp('((%3C)|<)((%2F)|/)*[a-z0-9%]+((%3E)|>)', 'i')
const xssImgCheck = new RegExp('((%3C)|<)((%69)|i|(%49))((%6D)|m|(%4D))((%67)|g|(%47))[^\n]+((%3E)|>)', 'i')

function checkXssUrl(url) {
  return url !== xss(url)
}

function checkXssBody(body) {
  return xssCSSCheck.test(body) || xssImgCheck.test(body)
}

function getBodyAsString(body: any) {
  let bodyString
  try {
    bodyString = JSON.stringify(body)
  } catch (e) {}
  return bodyString
}

export default function xssCheck(ctx: Context & {request: {body: any}}, next: () => Promise<any>): Promise<any> {
  const url = decodeURIComponent(ctx.originalUrl)
  const body = getBodyAsString(ctx.request?.body)

  if (checkXssBody(body) || checkXssUrl(url)) {
    // eslint-disable-next-line no-param-reassign
    ctx.status = HttpStatus.FORBIDDEN
    return new Promise(null)
  }

  return next()
}
