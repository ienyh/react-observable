import { expect, test, describe } from 'vitest'
import { Observable, Subscription, noop } from 'rxjs'
import { Base, Runtime } from '../src'

describe('Runtime', () => {
  test.concurrent('Duck.dispose', async () => {
    const duckSub = new Subscription();
    class TestDuck extends Base {
      init(getState, dispatch) {
        super.init(getState, dispatch)
        duckSub.add(new Observable().subscribe())
      }
      [Symbol.dispose]() {
        super[Symbol.dispose]()
        duckSub.unsubscribe()
      }
    }
    const duck = new TestDuck('')
    // @ts-ignore
    duck.init(noop, noop)
    expect(duckSub.closed).toStrictEqual(false)
    duck[Symbol.dispose]()
    expect(duckSub.closed).toStrictEqual(true)
  })
  test.concurrent('Runtime.dispose', async () => {
    const subDuckSub1 = new Subscription()
    class TestSubDuck1 extends Base {
      init(getState, dispatch) {
        super.init(getState, dispatch)
        subDuckSub1.add(new Observable().subscribe())
      }
      [Symbol.dispose]() {
        super[Symbol.dispose]()
        subDuckSub1.unsubscribe()
      }
    }
    const subDuckSub2 = new Subscription()
    class TestSubDuck2 extends Base {
      init(getState, dispatch) {
        super.init(getState, dispatch)
        subDuckSub2.add(new Observable().subscribe())
      }
      [Symbol.dispose]() {
        super[Symbol.dispose]()
        subDuckSub2.unsubscribe()
      }
    }
    const parDuckSub = new Subscription()
    class ParentDuck extends Base {
      init(getState, dispatch) {
        super.init(getState, dispatch)
        parDuckSub.add(new Observable().subscribe())
      }
      [Symbol.dispose]() {
        super[Symbol.dispose]()
        parDuckSub.unsubscribe()
      }
      get quickDucks() {
        return {
          sub1: TestSubDuck1,
          sub2: TestSubDuck2,
        }
      }
    }
    const { duck } = Runtime.create(ParentDuck)
    expect(subDuckSub1.closed).toBe(false)
    expect(subDuckSub2.closed).toBe(false)
    expect(parDuckSub.closed).toBe(false)
    duck[Symbol.dispose]()
    expect(subDuckSub1.closed).toBe(true)
    expect(subDuckSub2.closed).toBe(true)
    expect(parDuckSub.closed).toBe(true)
  })
})