import * as React from 'react'
import { ConnectedProps } from '../lib/core/type'
import { delay } from 'rxjs'
import Runtime from '@/core/Runtime'
import FetcherDuck from '@/duck/Fetcher.duck'

function TestFetcher(props: ConnectedProps<TestFetcherDuck>) {
  const { duck, store, dispatch } = props
  const { creators } = duck
  React.useEffect(() => {
    dispatch(creators.fetch({}))
  }, [])
  return <div>
    App: <button onClick={() => {
      console.log(duck);
      dispatch(creators.fetch({}))
    }}>fetch</button>
  </div>
}

interface Param {}
interface Result {
  name: string
}
export class TestFetcherDuck extends FetcherDuck<Param, Result> {
  Param: Param
  Result: Result
  async getData(param: Param): Promise<Result> {
    console.log(param)
    await delay(2000)
    return { name: 'hello' }
  }
}

export default Runtime.create(TestFetcherDuck).connect(TestFetcher)