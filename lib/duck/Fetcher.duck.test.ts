import { expect, test } from 'vitest'
import { delay } from 'rxjs'
import FetcherDuck from './Fetcher.duck'
import Runtime from '@/core/Runtime'

interface Param {}
interface Result {
  name: string
}
class TestFetcherDuck extends FetcherDuck<Param, Result> {
  Param: Param
  Result: Result
  async getData(param: Param): Promise<Result> {
    await delay(2000)
    return { name: 'hello' }
  }
}

test('TestFetcherDuck', () => {
  const runtime = Runtime.create(TestFetcherDuck)
  const { duck } = runtime
  const { dispatch, getState, creators } = duck
  expect(getState().data).toBe(null)
  expect(getState().loading).toBe(false)
  dispatch(creators.fetch({}))
  expect(getState().loading).toBe(true)
  // expect(getState().data).toBe({ name: 'hello' })
})
