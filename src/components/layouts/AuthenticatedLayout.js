import React from 'react'

import Header from '../Header'
import Footer from '../Footer'

const AuthenticatedLayout = ({ children }) => (
  <>
    <Header />
    <div className="ui main container">
      {children}
    </div>
    <Footer />
  </>
)

export default AuthenticatedLayout