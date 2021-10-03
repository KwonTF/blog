import React from 'react'
import ReactDOM from 'react-dom'

import App from '@blog/admin/src/app'

export const renderClient = () => {
  ReactDOM.hydrate(<App />, document.getElementById('app-root'))
}
