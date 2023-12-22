import * as React from 'react'
import { ConnectedProps } from '@core/type'
import FetcherDuck from '@duck/Fetcher.duck'
import { SubDuck } from './Sub.duck'

export default function TestFetcher(props: ConnectedProps<TestFetcherDuck>) {
  const { duck, store, dispatch } = props
  const { creators, ducks } = duck
  const { data, loading, error } = store
  let resultRender: React.ReactNode = null
  if (loading) resultRender = <div>loading ...</div>
  if (error) resultRender = <div>oops, error!</div>
  if (data) resultRender = <div>{data.name}</div>
  return <div>
    TestFetcher: <button onClick={() => console.log(duck)}>duck</button>
    <br />
    <button onClick={() => {
      dispatch(creators.fetch())
    }}>fetch</button>
    <button onClick={() => {
      dispatch(creators.reload())
    }}>reload</button>
    <button onClick={() => {
      dispatch(ducks.sub.creators.setData('hello world'))
    }}>ducks.reload</button>
    {resultRender}
  </div>
}

interface Result {
  name: string
}
export class TestFetcherDuck extends FetcherDuck {
  get quickDucks() {
    return {
      ...super.quickDucks,
      sub: SubDuck,
    }
  }
  Param: void
  Result: Result
  async getData(param: this['Param']): Promise<this['Result']> {
    await delay(2000)
    return { name: 'hello' }
  }
}

function delay(time: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), time)
  })
}