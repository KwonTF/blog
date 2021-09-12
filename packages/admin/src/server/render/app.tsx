/* eslint-disable no-param-reassign */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
//import Error?
import {Context} from 'koa'

type SSRProps = {
  ctx: Context
}

export async function renderApp({ctx}: SSRProps) {
  let renderedString
  const {App} = ctx.state
  ctx.state.routerContext = {}
  try {
    renderedString = await ReactDOMServer.renderToString(<App />)
  } catch (error) {
    return null
  }

  return renderedString
}
