import React from 'react'
import { Route } from 'react-router-dom'

import LoginLayout from '../layouts/LoginLayout'

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
  
  const renderLayout = props => (
    <LoginLayout>
      <Component {...props} />
    </LoginLayout>
  )

  return (
    <Route {...rest} render={renderLayout} />
  )
};

export default LoginLayoutRoute