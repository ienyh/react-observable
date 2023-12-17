import { expect, test } from 'vitest'
import { delay } from 'rxjs'
import Runtime from '@/core/Runtime'
import FetcherDuck from '../src/Fetcher.duck'

interface Param {}
interface Result {
  name: string
}
class TestFetcherDuck extends FetcherDuck<Param, Result> {
  Param: Param
  Result: Result
  async getData(param: Param): Promise<Result> {
    console.log(param)
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
})
