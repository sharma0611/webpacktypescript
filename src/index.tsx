import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'

const Root = () => {
  return <div>Hello World!</div>
  // return <App />
}

var mountNode = document.getElementById('app')
ReactDOM.render(<Root />, mountNode)
