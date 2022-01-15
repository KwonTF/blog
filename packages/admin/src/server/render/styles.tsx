import React from 'react'
import ReactDOMServer from 'react-dom/server'

import {DictType} from '@blog/shared/types'

export const renderStyles = (styles: DictType<string>) => {
  const styleString = ReactDOMServer.renderToStaticMarkup(
    <>
      {Object.entries(styles).map(([id, style]: [string, string]) => (
        <style id={id} key={id} type='text/css' data-isomorphic-style='true'>
          {style}
        </style>
      ))}
    </>
  )
  return styleString
}
