import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import App from './components/App.js'
import ThemeContextProvider from './context/ThemeContext.js'

ReactDom.render(
    <ThemeContextProvider>
        <App/>
    </ThemeContextProvider>,
document.getElementById('root'))