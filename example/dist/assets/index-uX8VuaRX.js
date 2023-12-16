import {
  S as b,
  o as S,
  c as T,
  q as g,
  O as d,
  a as C,
  l as N,
  b as R,
  r as l,
  j as a,
  P as j,
  d as M,
  e as w,
  f as O,
  g as v,
} from './vendor-ka_AXkxR.js'
  ; (function () {
    const e = document.createElement('link').relList
    if (e && e.supports && e.supports('modulepreload')) return
    for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r)
    new MutationObserver((r) => {
      for (const c of r)
        if (c.type === 'childList')
          for (const o of c.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && n(o)
    }).observe(document, { childList: !0, subtree: !0 })
    function t(r) {
      const c = {}
      return (
        r.integrity && (c.integrity = r.integrity),
        r.referrerPolicy && (c.referrerPolicy = r.referrerPolicy),
        r.crossOrigin === 'use-credentials'
          ? (c.credentials = 'include')
          : r.crossOrigin === 'anonymous'
            ? (c.credentials = 'omit')
            : (c.credentials = 'same-origin'),
        c
      )
    }
    function n(r) {
      if (r.ep) return
      r.ep = !0
      const c = t(r)
      fetch(r.href, c)
    }
  })()
function A() {
  const s = new b(),
    e = s.asObservable().pipe(S(g))
  let t, n
  const r = (c) => (
    (t = c.getState),
    (o) => (i) => {
      o(i), s.next(i)
    }
  )
  return (
    (r.run = (c, o) => {
      if (n || (n != null && n.closed)) return
      const i = { getState: t, dispatch: o },
        x = new d((u) => {
          u.next(i), u.complete()
        }).pipe(
          T(
            (u) =>
              new d((E) => {
                e.subscribe((y) => {
                  E.next(y)
                })
              })
          )
        )
      n = c(x)
    }),
    (r.close = () => {
      !n || !(n != null && n.unsubscribe) || n.unsubscribe()
    }),
    r
  )
}
function f(...s) {
  const e = (t) => {
    const n = new C()
    for (let r = 0; r < s.length; r++) n.add(s[r](t))
    return n
  }
  try {
    Object.defineProperty(f, 'name', {
      value: `combineStreamers(${s.map((t) => t.name || '<anonymous>').join(', ')})`,
    })
  } catch { }
  return e
}
const p = Symbol('streamer_methods_with_metadata'),
  P =
    (s = !0) =>
      (e, t, n) => {
        const r = Reflect.getMetadata(p, e) || []
        r.push(t), Reflect.defineMetadata(p, r, e)
      }
function _(s) {
  return (Reflect.getMetadata(p, s) || []).map((t) => s[t])
}
class m {
  static create(e) {
    return new m(e)
  }
  constructor(e) {
    ; (this.duck = new e()), this.initReduxStore()
  }
  initReduxStore() {
    const e = this.duck,
      t = A(),
      n = () => (o) => (i) => o(i),
      r = N(R(e.reducers), w(t, n)),
      c = [...e.streamers, ..._(this.duck)].map((o) => o.bind(e))
    e.init(r.getState, r.dispatch),
      e.dispatch({ type: `${e.actionTypePrefix}@INIT` }),
      t.run(f(...c), r.dispatch),
      (this.store = r),
      (this.middleware = t)
  }
  connect(e) {
    const t = this,
      { duck: n, store: r } = this,
      o = M(
        (i) => ({ store: i }),
        (i) => ({ dispatch: i })
      )(e)
    return function (i) {
      return (
        l.useEffect(() => t[Symbol.dispose], []),
        a.jsx(j, { store: r, children: a.jsx(o, { ...i, duck: n }) })
      )
    }
  }
  [Symbol.dispose]() {
    const { duck: e } = this
    e.dispatch({ type: `${e.actionTypePrefix}@END` }),
      console.log(this.middleware),
      this.middleware.close()
  }
}
function I(s) {
  const { duck: e, store: t, dispatch: n } = s,
    { creators: r } = e,
    [c, o] = l.useState(0)
  return (
    l.useEffect(
      () => (
        e.dispatch({ type: 'SUB/START' }),
        () => {
          e.dispatch({ type: 'SUB/STOP' })
        }
      ),
      []
    ),
    a.jsxs('div', {
      children: [
        'App: ',
        s.appName,
        a.jsx('h4', { children: 'React.useState' }),
        a.jsxs('div', {
          children: [
            a.jsx('button', { onClick: () => o((i) => i - 1), children: '-' }),
            a.jsx('span', { children: c }),
            a.jsx('button', { onClick: () => o((i) => i + 1), children: '+' }),
          ],
        }),
        a.jsx('h4', { children: 'React Redux' }),
        a.jsxs('div', {
          children: [
            a.jsx('button', { onClick: () => n(r.decrement()), children: '-' }),
            a.jsx('span', { children: t.count }),
            a.jsx('button', { onClick: () => n(r.increment()), children: '+' }),
          ],
        }),
        a.jsx('br', {}),
        a.jsx('button', { onClick: () => n(r.fetch('fetch start')), children: 'fetch' }),
      ],
    })
  )
}
class D {
  constructor() {
    ; (this.id = k()), (this.actionTypePrefix = '@@base/')
  }
  get quickTypes() {
    return {}
  }
  get types() {
    return Object.assign({}, F(this.actionTypePrefix, this.quickTypes))
  }
  get reducers() {
    return {}
  }
  get streamers() {
    return []
  }
  get creators() {
    return {}
  }
  init(e, t) {
    ; (this.getState = e), (this.dispatch = t)
  }
}
function k() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (s) {
    const e = (Math.random() * 16) | 0
    return (s === 'x' ? e : (e & 3) | 8).toString(16)
  })
}
function F(s, e) {
  let t = []
  const n = {}
  return (
    e && (t = t.concat(Object.keys(e))),
    t.forEach((r) => {
      n[r] = s + r
    }),
    n
  )
}
function H(s) {
  return (e) => ({ type: s, payload: e })
}
function $(s) {
  const e = Array.isArray(s) ? s : [s]
  return (t) =>
    new d((n) =>
      t.subscribe({
        next: (r) => e.includes(r.type) && n.next(r),
        error: n.error,
        complete: n.complete,
      })
    )
}
var q = Object.defineProperty,
  L = Object.getOwnPropertyDescriptor,
  B = (s, e, t, n) => {
    for (var r = n > 1 ? void 0 : n ? L(e, t) : e, c = s.length - 1, o; c >= 0; c--)
      (o = s[c]) && (r = (n ? o(e, t, r) : o(r)) || r)
    return n && r && q(e, t, r), r
  }
class h extends D {
  constructor() {
    super(...arguments), (this.actionTypePrefix = 'App/')
  }
  get quickTypes() {
    let e
    return (
      ((t) => {
        ; (t[(t.INCREMENT = 0)] = 'INCREMENT'),
          (t[(t.DECREMENT = 1)] = 'DECREMENT'),
          (t[(t.FETCH_START = 2)] = 'FETCH_START'),
          (t[(t.FETCH_DONE = 3)] = 'FETCH_DONE'),
          (t[(t.FETCHING = 4)] = 'FETCHING')
      })(e || (e = {})),
      { ...super.quickTypes, ...e }
    )
  }
  get reducers() {
    const e = this.types
    return {
      name: (t) => 'init name',
      timestamp: (t) => Date.now(),
      count: (t = 0, n) => {
        switch (n.type) {
          case e.INCREMENT:
            return t + 1
          case e.DECREMENT:
            return t - 1
          default:
            return t
        }
      },
    }
  }
  get creators() {
    const e = this.types
    return {
      ...super.creators,
      increment: () => ({ type: e.INCREMENT }),
      decrement: () => ({ type: e.DECREMENT }),
      fetch: H(e.FETCH_START),
    }
  }
  get streamers() {
    const { types: e } = this
    return [
      ...super.streamers,
      function (n) {
        return n.pipe(O((r) => r.type === e.INCREMENT)).subscribe((r) => {
          console.log('INCREMENTED')
        })
      },
    ]
  }
  fetchStreamer(e) {
    const t = this
    return e.pipe($(t.types.FETCH_START)).subscribe((n) => {
      t.dispatch({ type: t.types.INCREMENT }), console.log(n)
    })
  }
}
B([P()], h.prototype, 'fetchStreamer', 1)
const U = m.create(h).connect(I)
v(document.getElementById('app')).render(a.jsx(U, { appName: 'Observable' }))
