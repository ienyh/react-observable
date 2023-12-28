import * as React from 'react'
import { ConnectedProps } from '..'
import FetcherDuck from '@duck/Fetcher.duck'
import { SubDuck } from './Sub.duck'
import Runtime from '@core/Runtime'
import { createSelector } from 'reselect'

export function TestFetcher(props: ConnectedProps<TestFetcherDuck>) {
  // console.log('TestFetcherRendering');
  const { duck, store, dispatch } = props
  const { creators, ducks } = duck
  const { data, loading, error } = store
  let resultRender: React.ReactNode = null
  if (loading) resultRender = <div>loading ...</div>
  if (!loading && error) resultRender = <div>oops, error!</div>
  if (!loading && !error && data) resultRender = <div>{data.name}</div>
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
      dispatch(ducks.sub.creators.setData(Math.random().toString().substring(3, 9)))
    }}>ducks.reload</button>{store.sub.data}
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
    get quickSelectors() {
    type State = this['State']
    return {
      ...super.quickSelectors,
      subject: (state: this['State']): string => {
        console.log('calculated subject')
        return state.sub.data
      },
      sub: createSelector([(state: State) => state.sub], (sub) => {
        console.log('calculated ok')
        return sub
      }),
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

export default Runtime.create(TestFetcherDuck).connect(TestFetcher)