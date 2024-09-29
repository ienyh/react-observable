import * as React from 'react'
import { InferableComponentEnhancerWithProps, Provider, connect as connectRedux } from 'react-redux'
import { Dispatch } from 'redux'
import { Base, Store } from '@/core'
import { ConnectedProps, DuckState } from '@/core/type'

export default function connect<TDuck extends Base, Props>(
  store: Store<TDuck>,
  Component: React.FunctionComponent<Props>
): React.FunctionComponent<Omit<Props, keyof ConnectedProps<TDuck>>> {
  const { duck, redux } = store
  const connectComponent: InferableComponentEnhancerWithProps<DuckState<TDuck> & Dispatch, any> =
    connectRedux(
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
