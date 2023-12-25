import { expect, test, describe } from 'vitest'
import { Adaptor, Route } from './Route.duck'
import Runtime from '@core/Runtime'
import { Observable, Subject } from 'rxjs'

function createStore() {
  let state = {}
  const subject = new Subject()
  return {
    state: state,
    setState(value) {
      state = value
      subject.next(value)
    },
    [Symbol.observable]: subject
  }
}

function createTestContext() {
  const externalStore = createStore()
  class TestAdaptor implements Adaptor {
    watch() {
      return externalStore[Symbol.observable]
    }
    preform($state: Observable<any>): void {
      $state.subscribe(value => {
        if (JSON.stringify(externalStore.state) !== JSON.stringify(value)) {
          externalStore.state = value
        }
      })
    }
  }
  return {
    externalStore,
    adaptor: new TestAdaptor(),
  }
}

describe('Route.test', () => {

  test.concurrent('redux.store => external.state', async () => {
    const { externalStore, adaptor } = createTestContext()
    const { duck } = Runtime.create(class TestRoute extends Route {
      get adaptor() {
        return adaptor
      }
    })
    const { getState, dispatch, types } = duck
    dispatch({
      type: types.SET,
      payload: { name: 'test' }
    })
    expect(getState().state).toStrictEqual({ name: 'test' })
    expect(externalStore.state).toStrictEqual({ name: 'test' })
  })

  test.concurrent('external.state => redux.store', async () => {
    const { externalStore, adaptor } = createTestContext()
    const { duck } = Runtime.create(class TestRoute extends Route {
      get adaptor() {
        return adaptor
      }
    })
    const { getState } = duck
    externalStore.setState({ name: 'name' })
    expect(getState().state).toStrictEqual({ name: 'name' })
  })
})