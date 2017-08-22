import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import './styles/app.less'
import configureStore from './store/configureStore'

const store = configureStore()

function startApp() {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}

if(!window.fetch) {
    require.ensure([], () => {
        require('whatwg-fetch')
        startApp()
    })
}
else {
    startApp()
}