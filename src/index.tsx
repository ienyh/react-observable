import * as React from 'react'
import * as ReactDom from 'react-dom/client'
import Runtime from '../lib/core/Runtime'
import App from './App'
import AppDuck from './AppDuck'

const ConnectedApp = Runtime.create(AppDuck, { prefix: 'App@@' }).connect(App)
ReactDom.createRoot(document.getElementById('app')).render(<ConnectedApp appName='Observable' />)
