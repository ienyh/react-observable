import * as React from 'react'
import { InferableComponentEnhancerWithProps, Provider, connect as connectRedux } from 'react-redux'
import { Dispatch } from 'redux'
import { Store } from '../core'
import type { ConnectedProps, DuckState } from '../core/type'

export default function connect<TStore extends Store, Props>(
  store: TStore,
  Component: React.FunctionComponent<Props>
): React.FunctionComponent<Omit<Props, keyof ConnectedProps<TStore['duck']>>> {
  const { duck, redux } = store
  const connectComponent: InferableComponentEnhancerWithProps<
    DuckState<TStore['duck']> & Dispatch,
    any
  > = connectRedux(
    (state) => ({ store: state }),
    (dispatch) => ({ dispatch })
  )
  const ConnectedComponent = connectComponent(Component as any)
  return function (props) {
    return (
      <Provider store={redux}>
        <ConnectedComponent {...props} duck={duck} />
      </Provider>
    )
  }
}
