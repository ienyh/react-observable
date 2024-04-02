# observable-duck

将 redux 和 rxjs 的 Observable 组合在一起，可以方便的聚合逻辑并且支持流出 state 到 react 组件，类型完备，开发体验良好

## 基本使用

### 安装

```bash
npm i observable-duck --save
```

### 组织代码

```js
import { Action } from "redux";
import { Base, Action, take } from "observable-duck";
import { Observable } from "rxjs";
import { debounceTime } from 'rxjs/operators'

export default class AppDuck extends Base {
  get quickTypes() {
    enum Type {
      INCREMENT,
      DECREMENT,
    }
    return {
      ...super.quickTypes,
      ...Type,
    };
  }
  get reducers() {
    const types = this.types;
    return {
      count: (state = 0, action) => {
        switch (action.type) {
          case types.INCREMENT:
            return state + 1;
          case types.DECREMENT:
            return state - 1;
          default:
            return state;
        }
      },
    };
  }
  get creators() {
    const types = this.types;
    return {
      ...super.creators,
      increment: () => ({ type: types.INCREMENT }),
      decrement: () => ({ type: types.DECREMENT }),
    };
  }

  /**
   * 添加 Action 装饰器，注入 redux 的 action 流
   */
  @Action
  increment(action$: Observable<Action>) {
    const duck = this;
    return action$
      .pipe(
        take(duck.types.INCREMENT), // 过滤 action
        debounceTime(20), // 加入防抖以实现 redux-saga 中 takeLatest 的效果
      )
      .subscribe((action) => {
        const state = duck.getState();
        // preform your effect
      });
  }
}

// 创建该 duck 的运行时，基本上各部分的组装逻辑都在这里进行
const runtime = Runtime.create(AppDuck)
```

### 测试 duck 纯逻辑部分

然后你可以仅测试你的纯逻辑部分确认没有问题

```js
import { expect, test, describe } from 'vitest'
import { Runtime } from 'observable-duck'
import AppDuck from './AppDuck'

describe('AppDuck.test', () => {
  test('AppDuck.count', async () => {
    const runtime = Runtime.create(AppDuck)
    const { dispatch, getState, creators } = runtime.duck
    expect(getState().count).toBe(0)
    dispatch(creators.increment())
    expect(getState().count).toBe(1)
    dispatch(creators.decrement())
    expect(getState().count).toBe(0)
  })
})
```

### 连接 React 组件

然后可以将 runtime 连接到 react 组件（由 react-redux 实现），使用 `ConnectedProps<AppDuck>` 注释后的 props 也将获得完整的类型

```js
import * as React from 'react'
import { ConnectedProps } from 'observable-duck'
import AppDuck from './AppDuck'

function App(props: ConnectedProps<AppDuck>) {
  const { duck, store, dispatch } = props
  const { creators } = duck
  const [count, setCount] = React.useState(0)
  return <div>
    <h4>React.useState</h4>
    <div>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
    <h4>React Redux</h4>
    <div>
      <button onClick={() => dispatch(creators.decrement())}>-</button>
      <span>{store.count}</span>
      <button onClick={() => dispatch(creators.increment())}>+</button>
    </div>
  </div>
}

// 导出连接过后的组件
export default Runtime.create(AppDuck).connect(App)
```

或者并不一定非得连接到 react 组件上使用，由于是 redux 和 rxjs 组合使用，你可以使用 Observable 任意发挥

### 另一种方式在 React 组件中使用

还可以用提供的 `useDuck` hook 在组件内部创建 redux 仓库与 duck 的实例化

```js
// index.tsx
import * as React from 'react'
import { useDuck } from 'observable-duck'
import Duck from './Duck'

export default function () {
  const { duck, store, dispatch } = useDuck(Duck)
  const { types } = duck
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
}

// Duck.ts
import { Base, reduceFromPayload } from 'observable-duck'
export default class Duck extends Base {
  get quickTypes() {
    enum Type {
      SET_VALUE,
    }
    return {
      ...Type,
    }
  }
  get reducers() {
    const { types } = this
    return {
      value: reduceFromPayload<string>(types.SET_VALUE, ''),
    }
  }
}
```

## 扩展 duck

为了更好的内聚与更低的耦合，duck 也支持将别的逻辑成块的 duck 作为子 duck 扩展进自身，duck 中的 redux store，Observable 都将注册，并且扩展后的 duck 同样类型完备

外层 duck 关注扩展进来的逻辑，可以接受内层 duck 的 action 进行处理，内层 duck 不关注自身所处环境，因此不会处理外层环境 duck 的 action

```js
import { Observable } from 'rxjs'
import { Base, Action } from 'observable-duck'

export default class ParentDuck extends Base {
  get quickDucks() {
    return {
      sub: SubDuck,
    }
  }
  get quickTypes() {
    enum Type {
      INCREMENT,
      DECREMENT,
      SET_VALUE,
    }
    return {
      ...super.quickTypes,
      ...Type,
    }
  }
  get reducers() {
    const types = this.types
    return {
      name: (state: string) => 'init name',
      timestamp: (state: number) => Date.now(),
      value: reduceFromPayload<string>(types.SET_VALUE, ''),
    }
  }
  get creators() {
    const types = this.types
    return {
      ...super.creators,
      increment: () => ({ type: types.INCREMENT }),
      decrement: () => ({ type: types.DECREMENT }),
    }
  }
  @Action
  incrementStreamer(action$: Observable<Action>) {
    const duck = this
    return action$.pipe(filterAction(duck.types.INCREMENT)).subscribe((action) => {
      const state = duck.getState()
      console.log(state.sub.aaa)
      // 可以将派发 action 由子 duck 处理
      dispatch({
        type: ducks.sub.types.SUB,
        payload: 'from parent\'s value',
      })
    })
  }
}

class SubDuck extends Base {
  get quickTypes() {
    enum Type {
      SUB,
    }
    return {
      ...super.quickTypes,
      ...Type,
    }
  }
  get reducers() {
    const types = this.types
    return {
      aaa: (state: string) => 'init name',
      value: reduceFromPayload<string>(types.SUB, ''),
    }
  }
  // ...
}
```

## 连接外部订阅源

在 duck 中订阅其他 `runtime.redux` 然后做任何事情

```js
// One.ts
import { Runtime } from 'observable-duck'
import Template from './Template'
import Duck from './Duck'

export const runtime = Runtime.create(Duck) // 单独将 runtime 也导出
export default runtime.connect(Template) // 将 runtime 与 react 组件连接后默认导出
```

```js
// Two.ts
import { Base, From } from 'observable-duck'
import { runtime } from './One.ts'

class Search extends Base {
  @From(runtime.redux)
  accept(external$: Observable<DuckState<typeof runtime.duck>>) {
    const { dispatch } = this
    return external$.pipe(/** ... */).subscribe((value) => {
      dispatch({
        type: "...",
        payload: value,
      })
    })
  }
}
```

或者直接引用外部源可以做到双向同步

```js
import { Observable } from 'rxjs'
import { webSocket } from 'rxjs/webSocket'
import { Base, Action, Cache } from 'observable-duck'

export default class Search extends Base {
  get quickTypes() {
    enum Type {
      SET_VALUE,
      SEARCH,
    }
    return {
      ...Type,
    }
  }
  get reducers() {
    const types = this.types
    return {
      value: reduceFromPayload<string>(types.SET_VALUE, ''),
    }
  }
  get creators() {
    const { types } = this
    return {
      setValue: createToPayload<string>(types.SET_VALUE),
      search: createToPayload<void>(types.SEARCH),
    }
  }
  @Cache()
  get websocket$() {
    const { types, dispatch } = this
    const $ = webSocket('wss://***')
    this.subscription.add(
      $.subscribe((data) => dispatch({
        type: types.SET_VALUE,
        payload: data,
      }))
    )
    return $
  }
  @Action
  watchSearch(action$: Observable<Action>) {
    const duck = this
    return action$
      .pipe(filterAction(duck.types.SEARCH))
      .subscribe((action) => duck.websocket$.next(action.payload))
  }
}
```
