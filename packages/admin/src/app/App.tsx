import React from 'react'

import Header from '@blog/admin/src/components/views/Header'
import Sidebar from '@blog/admin/src/components/views/Sidebar'
import PageArea from '@blog/admin/src/components/pages/PageArea'

const App = () => (
  <div className='container'>
    <Header />
    <Sidebar />
    <PageArea />
  </div>
)

export default App
