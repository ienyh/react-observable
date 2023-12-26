# observable-duck

将 redux 和 rxjs 的 Observable 组合在一起，可以方便的聚合逻辑并且支持流出 state 到 react 组件，类型完备，优化开发体验

## 基本使用

### 安装

```bash
npm i observable-duck --save
```

### 组织代码

```js
import { Action } from "redux";
import Base from "observable-duck/core/Base";
import { Observable } from "rxjs";
import { StreamerMethod } from "observable-duck/decorator/method";
import { filterAction } from "observable-duck/operator/index";

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
   * 添加 StreamerMethod 装饰器，然后注入 redux 的 action 流
   */
  @StreamerMethod()
  increment(action$: Observable<Action>) {
    const duck = this;
    return action$
      .pipe(filterAction(duck.types.INCREMENT))
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
import Runtime from 'observable-duck/core/Runtime'
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

然后可以将 runtime 连接到 react 组件（由 react-redux 实现），使用 `ConnectedProps<AppDuck>` 注释后的 props 也将获得完备的类型，并且由于 redux reducer 的特性将不会出现 store.count 不存在的情况

```js
import * as React from 'react'
import { ConnectedProps } from 'observable-duck/core/type'
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

// 导入连接过后的组件
export default Runtime.create(AppDuck).connect(App)
```

或者并不一定非得连接到 react 组件上使用，由于是 redux 和 rxjs 组合使用，你可以将 Observable 任意发挥

## 扩展 duck

为了更好的内聚与更低的耦合，duck 也支持将别的逻辑成块的 duck 作为子 duck 扩展进自身，duck 中的 redux store，Observable 都将注册，并且扩展后的 duck 同样类型完备

```js
import { Action } from 'redux'
import Base from '@core/Base'
import { Observable } from 'rxjs'
import { StreamerMethod } from '@decorator/method'
import { filterAction } from '@operator/index'
import { Adaptor, Sync } from '@duck/sync/Sync.duck'
import { PayloadAction } from '@core/type'
import { BrowserAdaptor } from '@duck/sync/BrowserAdaptor'

export default class AppDuck extends Base {
  get quickDucks() {
    return {
      ...super.quickDucks,
      route: class extends Sync {
        SyncParams: {
          name?: string
        }
        get adaptor(): Adaptor {
          return new BrowserAdaptor()
        }
      },
    }
  }
  @StreamerMethod()
  preform(action$: Observable<PayloadAction<string>>) {
    const duck = this
    const { types, ducks, dispatch } = duck
    return action$.pipe(filterAction([types.INCREMENT])).subscribe((action) => {
      // 可以将派发 action 由子 duck 处理
      dispatch({
        type: ducks.route.types.PUSH,
        payload: {
          name: Math.random().toString().substring(3, 8),
        },
      })
    })
  }
}
```

## 常用 duck

已经提供了一些常用的 duck 例子，可能写的并不好，仅供参考

- FetcherDuck: 请求异步流程控制
- SyncDuck: 用于双向同步 redux 和外部 store，可以选用不同的适配模式
