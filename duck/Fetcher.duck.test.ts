import { expect, test, describe } from 'vitest'
import FetcherDuck from './Fetcher.duck'
import Runtime from '@core/Runtime'

describe('FetcherDuck.test', () => {
  interface Param {}
  interface Result {
    name: string
  }
  class TestFetcherDuck extends FetcherDuck {
    Param: void
    Result: Result
    async getData(param: this['Param']): Promise<this['Result']> {
      await delay(100)
      return { name: 'hello' }
    }
  }

  test.concurrent('TestFetcherDuck', async () => {
    const runtime = Runtime.create(TestFetcherDuck)
    const { duck } = runtime
    const { dispatch, getState, creators } = duck
    expect(getState().data).toBe(null)
    expect(getState().loading).toBe(false)
    dispatch(creators.fetch())
    expect(getState().loading).toBe(true)
    await delay(110)
    expect(getState().loading).toBe(false)
    expect(getState().error).toBe(null)
    expect(getState().data).toStrictEqual({ name: 'hello' })
  })

  class TestErrorFetcherDuck extends FetcherDuck {
    Param: Param
    Result: Result
    async getData(param: Param): Promise<Result> {
      await delay(100)
      throw new Error('on purpose')
    }
  }

  test.concurrent('TestErrorFetcherDuck', async () => {
    const runtime = Runtime.create(TestErrorFetcherDuck)
    const { duck } = runtime
    const { dispatch, getState, creators } = duck
    expect(getState().data).toBe(null)
    expect(getState().loading).toBe(false)
    dispatch(creators.fetch({}))
    expect(getState().loading).toBe(true)
    await delay(110)
    expect(getState().loading).toBe(false)
    expect(getState().error).toBeInstanceOf(Error)
    expect(getState().data).toStrictEqual(null)
  })
})

function delay(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time)
  })
}
