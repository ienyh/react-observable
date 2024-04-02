import * as React from 'react'
import { ConnectedProps } from 'observable-duck'
import AppDuck from './AppDuck'
import Use from './use'

export default function App(props: { appName: string } & ConnectedProps<AppDuck>) {
  const { duck, store, dispatch } = props
  const { creators } = duck
  store.sub.subSub.eee
  const [count, setCount] = React.useState(0)
  React.useLayoutEffect(() => console.log(duck), [])
  return (
    <div>
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
      <Use />
    </div>
  )
}
