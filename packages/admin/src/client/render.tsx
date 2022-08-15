import React from 'react'
import ReactDOM from 'react-dom'
import {loadableReady} from '@loadable/component'
import StyleContext from 'isomorphic-style-loader/StyleContext'

import App from '@blog/admin/src/app'
import {DotEnvContextProvider} from '@blog/admin/src/components/contexts/DotEnvContext'

interface WindowWithServerValues extends Window {
  __ENV_VALUES__?: string
}

export const renderClient = () => {
  const windowWithServerValue = window as WindowWithServerValues

  const insertCss = (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map((style) => style._insertCss())
    return () => removeCss.forEach((dispose) => dispose())
  }

  loadableReady(() => {
    ReactDOM.hydrate(
      <StyleContext.Provider value={{insertCss}}>
        <DotEnvContextProvider values={JSON.parse(windowWithServerValue?.__ENV_VALUES__) || {}}>
          <App />
        </DotEnvContextProvider>
      </StyleContext.Provider>,
      document.getElementById('app-root')
    )
  })
}
