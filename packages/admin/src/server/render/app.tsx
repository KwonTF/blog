/* eslint-disable no-param-reassign */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {Context} from 'koa'

import logger from '@blog/shared/utils/logger'

type SSRProps = {
  ctx: Context
}

export async function renderApp({ctx}: SSRProps): Promise<string> {
  let renderedString: string
  const {App} = ctx.state
  ctx.state.routerContext = {}
  try {
    renderedString = await ReactDOMServer.renderToString(<App />)
  } catch (error) {
    logger.log(error)
    return null
  }

  return renderedString
}
