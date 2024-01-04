import * as React from 'react'
import { ConnectedProps } from '../src/core/type'
import AppDuck from './AppDuck'

export default function App(props: { appName: string } & ConnectedProps<AppDuck>) {
  const { duck, store, dispatch } = props
  const { creators } = duck
  const [count, setCount] = React.useState(0)
  return <div>
    App: {props.appName}
    <h4>React.useState</h4>
    <div>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
    <h4>React Redux</h4>
    <div>
      <button onClick={() => dispatch(creators.decrement())}>-</button>
      <span>{store.count}</span>
      <button onClick={() => dispatch(creators.increment())}>+</button>
    </div>
    <br />
  </div>
}