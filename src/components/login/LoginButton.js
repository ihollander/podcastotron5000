import React from 'react'

const LoginButton = ({ buttonText, onButtonClick }) => (
  <button className="ui red google button" onClick={onButtonClick}>
    <i className="google icon" />
    {buttonText}
  </button>
)

export default LoginButton