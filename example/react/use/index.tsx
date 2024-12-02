import * as React from 'react'
import Duck from './Duck'
import { useDuck } from 'observable-duck'

export default React.memo(function Use() {
  const { duck, store, dispatch } = useDuck(Duck)
  const { types } = duck
  console.log('Use Rendered', store)
  return (
    <div>
      useDuck:
      <div>
        <input
          value={store.value}
          onChange={(v) =>
            dispatch({
              type: types.SET_VALUE,
              payload: v.target.value,
            })
          }
        />
      </div>
      <br />
    </div>
  )
})
