/* eslint-disable no-param-reassign */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {QueryClient, QueryClientProvider, Hydrate, DehydratedState} from '@tanstack/react-query'
import {Context} from 'koa'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import {ChunkExtractor, ChunkExtractorManager} from '@loadable/server'

import logger from '@blog/shared/utils/logger'

export type SSRProps = {
  reactQueryClient: QueryClient
  dehydratedState: DehydratedState
  ctx: Context
  extractor: ChunkExtractor
}

type RenderAppRetrunType = {
  renderedString: string
  css: any
}

export async function renderApp({ctx, extractor, reactQueryClient, dehydratedState}: SSRProps): Promise<RenderAppRetrunType> {
  let renderedString: string
  const {App} = ctx.state

  // CSS for all rendered React components
  const css = new Set()
  // eslint-disable-next-line no-underscore-dangle
  const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()))

  try {
    global['__ENV_VALUES__'] = JSON.parse(ctx?.state?.envValues || {})
    renderedString = await ReactDOMServer.renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <QueryClientProvider client={reactQueryClient}>
          <Hydrate state={dehydratedState}>
            <StyleContext.Provider value={{insertCss}}>
              <App />
            </StyleContext.Provider>
          </Hydrate>
        </QueryClientProvider>
      </ChunkExtractorManager>
    )
  } catch (error) {
    logger.log(error)
    return null
  }

  return {renderedString, css}
}
