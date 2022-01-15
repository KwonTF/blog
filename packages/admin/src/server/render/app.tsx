/* eslint-disable no-param-reassign */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {Context} from 'koa'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import {ChunkExtractor, ChunkExtractorManager} from '@loadable/server'

import logger from '@blog/shared/utils/logger'

type SSRProps = {
  ctx: Context
  extractor: ChunkExtractor
}

type RenderAppRetrunType = {
  renderedString: string
  css: any
}

export async function renderApp({ctx, extractor}: SSRProps): Promise<RenderAppRetrunType> {
  let renderedString: string
  const {App} = ctx.state

  // CSS for all rendered React components
  const css = new Set()
  // eslint-disable-next-line no-underscore-dangle
  const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()))

  try {
    renderedString = await ReactDOMServer.renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <StyleContext.Provider value={{insertCss}}>
          <App />
        </StyleContext.Provider>
      </ChunkExtractorManager>
    )
  } catch (error) {
    logger.log(error)
    return null
  }

  return {renderedString, css}
}
