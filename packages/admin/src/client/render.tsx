import React from 'react'
import ReactDOM from 'react-dom'
import {loadableReady} from '@loadable/component'
import StyleContext from 'isomorphic-style-loader/StyleContext'

import App from '@blog/admin/src/app'

interface WindowWithServerValues extends Window {
  __ENV_VALUES__?: string
}

export const renderClient = () => {
  const windowWithServerValues = window as WindowWithServerValues

  const insertCss = (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map((style) => style._insertCss())
    return () => removeCss.forEach((dispose) => dispose())
  }

  windowWithServerValues['__ENV_VALUES__'] = JSON.parse(windowWithServerValues['__ENV_VALUES__'] || '')
  loadableReady(() => {
    ReactDOM.hydrate(
      <StyleContext.Provider value={{insertCss}}>
        <App />
      </StyleContext.Provider>,
      document.getElementById('app-root')
    )
  })
}
