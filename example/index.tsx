import * as React from 'react'
import * as ReactDom from 'react-dom/client'
import { Runtime } from 'observable-duck'
import App from './App'
import AppDuck from './AppDuck'

const ConnectedApp = Runtime.create(AppDuck).connect(App)
ReactDom.createRoot(document.querySelector('#app') as Element).render(<ConnectedApp appName='Observable' />)
