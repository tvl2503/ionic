import React from 'react';
import './GlobalStyles.scss'
type Props = {
  children: JSX.Element
}
const GlobalStyles= ({ children } : Props) => {
  return children;
}

export default GlobalStyles