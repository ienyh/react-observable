function Rk(v, m) {
  for (var p = 0; p < m.length; p++) {
    const C = m[p];
    if (typeof C != "string" && !Array.isArray(C)) {
      for (const w in C)
        if (w !== "default" && !(w in v)) {
          const N = Object.getOwnPropertyDescriptor(C, w);
          N && Object.defineProperty(v, w, N.get ? N : {
            enumerable: !0,
            get: () => C[w]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(v, Symbol.toStringTag, { value: "Module" }));
}
function ea(v) {
  return `Minified Redux error #${v}; visit https://redux.js.org/Errors?code=${v} for the full message or use the non-minified dev environment for full errors. `;
}
var _k = typeof Symbol == "function" && Symbol.observable || "@@observable", Dw = _k, wE = () => Math.random().toString(36).substring(7).split("").join("."), xk = {
  INIT: `@@redux/INIT${/* @__PURE__ */ wE()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ wE()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${wE()}`
}, nc = xk;
function lT(v) {
  if (typeof v != "object" || v === null)
    return !1;
  let m = v;
  for (; Object.getPrototypeOf(m) !== null; )
    m = Object.getPrototypeOf(m);
  return Object.getPrototypeOf(v) === m;
}
function Ok(v) {
  if (v === void 0)
    return "undefined";
  if (v === null)
    return "null";
  const m = typeof v;
  switch (m) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function":
      return m;
  }
  if (Array.isArray(v))
    return "array";
  if (Mk(v))
    return "date";
  if (Dk(v))
    return "error";
  const p = kk(v);
  switch (p) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return p;
  }
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function kk(v) {
  return typeof v.constructor == "function" ? v.constructor.name : null;
}
function Dk(v) {
  return v instanceof Error || typeof v.message == "string" && v.constructor && typeof v.constructor.stackTraceLimit == "number";
}
function Mk(v) {
  return v instanceof Date ? !0 : typeof v.toDateString == "function" && typeof v.getDate == "function" && typeof v.setDate == "function";
}
function Kl(v) {
  let m = typeof v;
  return process.env.NODE_ENV !== "production" && (m = Ok(v)), m;
}
function sT(v, m, p) {
  if (typeof v != "function")
    throw new Error(process.env.NODE_ENV === "production" ? ea(2) : `Expected the root reducer to be a function. Instead, received: '${Kl(v)}'`);
  if (typeof m == "function" && typeof p == "function" || typeof p == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? ea(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof m == "function" && typeof p > "u" && (p = m, m = void 0), typeof p < "u") {
    if (typeof p != "function")
      throw new Error(process.env.NODE_ENV === "production" ? ea(1) : `Expected the enhancer to be a function. Instead, received: '${Kl(p)}'`);
    return p(sT)(v, m);
  }
  let C = v, w = m, N = /* @__PURE__ */ new Map(), S = N, te = 0, Y = !1;
  function $() {
    S === N && (S = /* @__PURE__ */ new Map(), N.forEach((me, tt) => {
      S.set(tt, me);
    }));
  }
  function oe() {
    if (Y)
      throw new Error(process.env.NODE_ENV === "production" ? ea(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return w;
  }
  function K(me) {
    if (typeof me != "function")
      throw new Error(process.env.NODE_ENV === "production" ? ea(4) : `Expected the listener to be a function. Instead, received: '${Kl(me)}'`);
    if (Y)
      throw new Error(process.env.NODE_ENV === "production" ? ea(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let tt = !0;
    $();
    const Ae = te++;
    return S.set(Ae, me), function() {
      if (tt) {
        if (Y)
          throw new Error(process.env.NODE_ENV === "production" ? ea(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        tt = !1, $(), S.delete(Ae), N = null;
      }
    };
  }
  function re(me) {
    if (!lT(me))
      throw new Error(process.env.NODE_ENV === "production" ? ea(7) : `Actions must be plain objects. Instead, the actual type was: '${Kl(me)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof me.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? ea(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof me.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? ea(17) : `Action "type" property must be a string. Instead, the actual type was: '${Kl(me.type)}'. Value was: '${me.type}' (stringified)`);
    if (Y)
      throw new Error(process.env.NODE_ENV === "production" ? ea(9) : "Reducers may not dispatch actions.");
    try {
      Y = !0, w = C(w, me);
    } finally {
      Y = !1;
    }
    return (N = S).forEach((Ae) => {
      Ae();
    }), me;
  }
  function ue(me) {
    if (typeof me != "function")
      throw new Error(process.env.NODE_ENV === "production" ? ea(10) : `Expected the nextReducer to be a function. Instead, received: '${Kl(me)}`);
    C = me, re({
      type: nc.REPLACE
    });
  }
  function be() {
    const me = K;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(tt) {
        if (typeof tt != "object" || tt === null)
          throw new Error(process.env.NODE_ENV === "production" ? ea(11) : `Expected the observer to be an object. Instead, received: '${Kl(tt)}'`);
        function Ae() {
          const Ze = tt;
          Ze.next && Ze.next(oe());
        }
        return Ae(), {
          unsubscribe: me(Ae)
        };
      },
      [Dw]() {
        return this;
      }
    };
  }
  return re({
    type: nc.INIT
  }), {
    dispatch: re,
    subscribe: K,
    getState: oe,
    replaceReducer: ue,
    [Dw]: be
  };
}
function Nk(v, m, p) {
  return sT(v, m, p);
}
function Mw(v) {
  typeof console < "u" && typeof console.error == "function" && console.error(v);
  try {
    throw new Error(v);
  } catch {
  }
}
function Lk(v, m, p, C) {
  const w = Object.keys(m), N = p && p.type === nc.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (w.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!lT(v))
    return `The ${N} has unexpected type of "${Kl(v)}". Expected argument to be an object with the following keys: "${w.join('", "')}"`;
  const S = Object.keys(v).filter((te) => !m.hasOwnProperty(te) && !C[te]);
  if (S.forEach((te) => {
    C[te] = !0;
  }), !(p && p.type === nc.REPLACE) && S.length > 0)
    return `Unexpected ${S.length > 1 ? "keys" : "key"} "${S.join('", "')}" found in ${N}. Expected to find one of the known reducer keys instead: "${w.join('", "')}". Unexpected keys will be ignored.`;
}
function Ak(v) {
  Object.keys(v).forEach((m) => {
    const p = v[m];
    if (typeof p(void 0, {
      type: nc.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? ea(12) : `The slice reducer for key "${m}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof p(void 0, {
      type: nc.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? ea(13) : `The slice reducer for key "${m}" returned undefined when probed with a random type. Don't try to handle '${nc.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function Uk(v) {
  const m = Object.keys(v), p = {};
  for (let S = 0; S < m.length; S++) {
    const te = m[S];
    process.env.NODE_ENV !== "production" && typeof v[te] > "u" && Mw(`No reducer provided for key "${te}"`), typeof v[te] == "function" && (p[te] = v[te]);
  }
  const C = Object.keys(p);
  let w;
  process.env.NODE_ENV !== "production" && (w = {});
  let N;
  try {
    Ak(p);
  } catch (S) {
    N = S;
  }
  return function(te = {}, Y) {
    if (N)
      throw N;
    if (process.env.NODE_ENV !== "production") {
      const K = Lk(te, p, Y, w);
      K && Mw(K);
    }
    let $ = !1;
    const oe = {};
    for (let K = 0; K < C.length; K++) {
      const re = C[K], ue = p[re], be = te[re], Te = ue(be, Y);
      if (typeof Te > "u") {
        const me = Y && Y.type;
        throw new Error(process.env.NODE_ENV === "production" ? ea(14) : `When called with an action of type ${me ? `"${String(me)}"` : "(unknown type)"}, the slice reducer for key "${re}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      oe[re] = Te, $ = $ || Te !== be;
    }
    return $ = $ || C.length !== Object.keys(te).length, $ ? oe : te;
  };
}
function zk(...v) {
  return v.length === 0 ? (m) => m : v.length === 1 ? v[0] : v.reduce((m, p) => (...C) => m(p(...C)));
}
function jk(...v) {
  return (m) => (p, C) => {
    const w = m(p, C);
    let N = () => {
      throw new Error(process.env.NODE_ENV === "production" ? ea(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const S = {
      getState: w.getState,
      dispatch: (Y, ...$) => N(Y, ...$)
    }, te = v.map((Y) => Y(S));
    return N = zk(...te)(w.dispatch), {
      ...w,
      dispatch: N
    };
  };
}
var tc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Pk(v) {
  return v && v.__esModule && Object.prototype.hasOwnProperty.call(v, "default") ? v.default : v;
}
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Nw;
(function(v) {
  (function(m) {
    var p = typeof globalThis == "object" ? globalThis : typeof tc == "object" ? tc : typeof self == "object" ? self : typeof this == "object" ? this : te(), C = w(v);
    typeof p.Reflect < "u" && (C = w(p.Reflect, C)), m(C, p), typeof p.Reflect > "u" && (p.Reflect = v);
    function w(Y, $) {
      return function(oe, K) {
        Object.defineProperty(Y, oe, { configurable: !0, writable: !0, value: K }), $ && $(oe, K);
      };
    }
    function N() {
      try {
        return Function("return this;")();
      } catch {
      }
    }
    function S() {
      try {
        return (0, eval)("(function() { return this; })()");
      } catch {
      }
    }
    function te() {
      return N() || S();
    }
  })(function(m, p) {
    var C = Object.prototype.hasOwnProperty, w = typeof Symbol == "function", N = w && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", S = w && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", te = typeof Object.create == "function", Y = { __proto__: [] } instanceof Array, $ = !te && !Y, oe = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: te ? function() {
        return qn(/* @__PURE__ */ Object.create(null));
      } : Y ? function() {
        return qn({ __proto__: null });
      } : function() {
        return qn({});
      },
      has: $ ? function(_, A) {
        return C.call(_, A);
      } : function(_, A) {
        return A in _;
      },
      get: $ ? function(_, A) {
        return C.call(_, A) ? _[A] : void 0;
      } : function(_, A) {
        return _[A];
      }
    }, K = Object.getPrototypeOf(Function), re = typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : on(), ue = typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : Gn(), be = typeof WeakMap == "function" ? WeakMap : Nr(), Te = w ? Symbol.for("@reflect-metadata:registry") : void 0, me = Wn(), tt = Sr(me);
    function Ae(_, A, B, ae) {
      if (O(B)) {
        if (!Kt(_))
          throw new TypeError();
        if (!_t(A))
          throw new TypeError();
        return Mt(_, A);
      } else {
        if (!Kt(_))
          throw new TypeError();
        if (!le(A))
          throw new TypeError();
        if (!le(ae) && !O(ae) && !U(ae))
          throw new TypeError();
        return U(ae) && (ae = void 0), B = zt(B), Ie(_, A, B, ae);
      }
    }
    m("decorate", Ae);
    function Ue(_, A) {
      function B(ae, Ce) {
        if (!le(ae))
          throw new TypeError();
        if (!O(Ce) && !bt(Ce))
          throw new TypeError();
        pe(_, A, ae, Ce);
      }
      return B;
    }
    m("metadata", Ue);
    function Ze(_, A, B, ae) {
      if (!le(B))
        throw new TypeError();
      return O(ae) || (ae = zt(ae)), pe(_, A, B, ae);
    }
    m("defineMetadata", Ze);
    function _e(_, A, B) {
      if (!le(A))
        throw new TypeError();
      return O(B) || (B = zt(B)), rt(_, A, B);
    }
    m("hasMetadata", _e);
    function Ke(_, A, B) {
      if (!le(A))
        throw new TypeError();
      return O(B) || (B = zt(B)), at(_, A, B);
    }
    m("hasOwnMetadata", Ke);
    function Fe(_, A, B) {
      if (!le(A))
        throw new TypeError();
      return O(B) || (B = zt(B)), Ct(_, A, B);
    }
    m("getMetadata", Fe);
    function kt(_, A, B) {
      if (!le(A))
        throw new TypeError();
      return O(B) || (B = zt(B)), Ne(_, A, B);
    }
    m("getOwnMetadata", kt);
    function qt(_, A) {
      if (!le(_))
        throw new TypeError();
      return O(A) || (A = zt(A)), $e(_, A);
    }
    m("getMetadataKeys", qt);
    function mt(_, A) {
      if (!le(_))
        throw new TypeError();
      return O(A) || (A = zt(A)), M(_, A);
    }
    m("getOwnMetadataKeys", mt);
    function yt(_, A, B) {
      if (!le(A))
        throw new TypeError();
      if (O(B) || (B = zt(B)), !le(A))
        throw new TypeError();
      O(B) || (B = zt(B));
      var ae = wn(
        A,
        B,
        /*Create*/
        !1
      );
      return O(ae) ? !1 : ae.OrdinaryDeleteMetadata(_, A, B);
    }
    m("deleteMetadata", yt);
    function Mt(_, A) {
      for (var B = _.length - 1; B >= 0; --B) {
        var ae = _[B], Ce = ae(A);
        if (!O(Ce) && !U(Ce)) {
          if (!_t(Ce))
            throw new TypeError();
          A = Ce;
        }
      }
      return A;
    }
    function Ie(_, A, B, ae) {
      for (var Ce = _.length - 1; Ce >= 0; --Ce) {
        var xt = _[Ce], Nt = xt(A, B, ae);
        if (!O(Nt) && !U(Nt)) {
          if (!le(Nt))
            throw new TypeError();
          ae = Nt;
        }
      }
      return ae;
    }
    function rt(_, A, B) {
      var ae = at(_, A, B);
      if (ae)
        return !0;
      var Ce = Ln(A);
      return U(Ce) ? !1 : rt(_, Ce, B);
    }
    function at(_, A, B) {
      var ae = wn(
        A,
        B,
        /*Create*/
        !1
      );
      return O(ae) ? !1 : Re(ae.OrdinaryHasOwnMetadata(_, A, B));
    }
    function Ct(_, A, B) {
      var ae = at(_, A, B);
      if (ae)
        return Ne(_, A, B);
      var Ce = Ln(A);
      if (!U(Ce))
        return Ct(_, Ce, B);
    }
    function Ne(_, A, B) {
      var ae = wn(
        A,
        B,
        /*Create*/
        !1
      );
      if (!O(ae))
        return ae.OrdinaryGetOwnMetadata(_, A, B);
    }
    function pe(_, A, B, ae) {
      var Ce = wn(
        B,
        ae,
        /*Create*/
        !0
      );
      Ce.OrdinaryDefineOwnMetadata(_, A, B, ae);
    }
    function $e(_, A) {
      var B = M(_, A), ae = Ln(_);
      if (ae === null)
        return B;
      var Ce = $e(ae, A);
      if (Ce.length <= 0)
        return B;
      if (B.length <= 0)
        return Ce;
      for (var xt = new ue(), Nt = [], it = 0, se = B; it < se.length; it++) {
        var Me = se[it], ye = xt.has(Me);
        ye || (xt.add(Me), Nt.push(Me));
      }
      for (var ge = 0, gt = Ce; ge < gt.length; ge++) {
        var Me = gt[ge], ye = xt.has(Me);
        ye || (xt.add(Me), Nt.push(Me));
      }
      return Nt;
    }
    function M(_, A) {
      var B = wn(
        _,
        A,
        /*create*/
        !1
      );
      return B ? B.OrdinaryOwnMetadataKeys(_, A) : [];
    }
    function R(_) {
      if (_ === null)
        return 1;
      switch (typeof _) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return _ === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function O(_) {
      return _ === void 0;
    }
    function U(_) {
      return _ === null;
    }
    function Z(_) {
      return typeof _ == "symbol";
    }
    function le(_) {
      return typeof _ == "object" ? _ !== null : typeof _ == "function";
    }
    function we(_, A) {
      switch (R(_)) {
        case 0:
          return _;
        case 1:
          return _;
        case 2:
          return _;
        case 3:
          return _;
        case 4:
          return _;
        case 5:
          return _;
      }
      var B = A === 3 ? "string" : A === 5 ? "number" : "default", ae = tn(_, N);
      if (ae !== void 0) {
        var Ce = ae.call(_, B);
        if (le(Ce))
          throw new TypeError();
        return Ce;
      }
      return xe(_, B === "default" ? "number" : B);
    }
    function xe(_, A) {
      if (A === "string") {
        var B = _.toString;
        if (dt(B)) {
          var ae = B.call(_);
          if (!le(ae))
            return ae;
        }
        var Ce = _.valueOf;
        if (dt(Ce)) {
          var ae = Ce.call(_);
          if (!le(ae))
            return ae;
        }
      } else {
        var Ce = _.valueOf;
        if (dt(Ce)) {
          var ae = Ce.call(_);
          if (!le(ae))
            return ae;
        }
        var xt = _.toString;
        if (dt(xt)) {
          var ae = xt.call(_);
          if (!le(ae))
            return ae;
        }
      }
      throw new TypeError();
    }
    function Re(_) {
      return !!_;
    }
    function vt(_) {
      return "" + _;
    }
    function zt(_) {
      var A = we(
        _,
        3
        /* String */
      );
      return Z(A) ? A : vt(A);
    }
    function Kt(_) {
      return Array.isArray ? Array.isArray(_) : _ instanceof Object ? _ instanceof Array : Object.prototype.toString.call(_) === "[object Array]";
    }
    function dt(_) {
      return typeof _ == "function";
    }
    function _t(_) {
      return typeof _ == "function";
    }
    function bt(_) {
      switch (R(_)) {
        case 3:
          return !0;
        case 4:
          return !0;
        default:
          return !1;
      }
    }
    function un(_, A) {
      return _ === A || _ !== _ && A !== A;
    }
    function tn(_, A) {
      var B = _[A];
      if (B != null) {
        if (!dt(B))
          throw new TypeError();
        return B;
      }
    }
    function wt(_) {
      var A = tn(_, S);
      if (!dt(A))
        throw new TypeError();
      var B = A.call(_);
      if (!le(B))
        throw new TypeError();
      return B;
    }
    function Nn(_) {
      return _.value;
    }
    function zn(_) {
      var A = _.next();
      return A.done ? !1 : A;
    }
    function vn(_) {
      var A = _.return;
      A && A.call(_);
    }
    function Ln(_) {
      var A = Object.getPrototypeOf(_);
      if (typeof _ != "function" || _ === K || A !== K)
        return A;
      var B = _.prototype, ae = B && Object.getPrototypeOf(B);
      if (ae == null || ae === Object.prototype)
        return A;
      var Ce = ae.constructor;
      return typeof Ce != "function" || Ce === _ ? A : Ce;
    }
    function gn() {
      var _;
      !O(Te) && typeof p.Reflect < "u" && !(Te in p.Reflect) && typeof p.Reflect.defineMetadata == "function" && (_ = Qn(p.Reflect));
      var A, B, ae, Ce = new be(), xt = {
        registerProvider: Nt,
        getProvider: se,
        setProvider: ye
      };
      return xt;
      function Nt(ge) {
        if (!Object.isExtensible(xt))
          throw new Error("Cannot add provider to a frozen registry.");
        switch (!0) {
          case _ === ge:
            break;
          case O(A):
            A = ge;
            break;
          case A === ge:
            break;
          case O(B):
            B = ge;
            break;
          case B === ge:
            break;
          default:
            ae === void 0 && (ae = new ue()), ae.add(ge);
            break;
        }
      }
      function it(ge, gt) {
        if (!O(A)) {
          if (A.isProviderFor(ge, gt))
            return A;
          if (!O(B)) {
            if (B.isProviderFor(ge, gt))
              return A;
            if (!O(ae))
              for (var Ht = wt(ae); ; ) {
                var sn = zn(Ht);
                if (!sn)
                  return;
                var ar = Nn(sn);
                if (ar.isProviderFor(ge, gt))
                  return vn(Ht), ar;
              }
          }
        }
        if (!O(_) && _.isProviderFor(ge, gt))
          return _;
      }
      function se(ge, gt) {
        var Ht = Ce.get(ge), sn;
        return O(Ht) || (sn = Ht.get(gt)), O(sn) && (sn = it(ge, gt), O(sn) || (O(Ht) && (Ht = new re(), Ce.set(ge, Ht)), Ht.set(gt, sn))), sn;
      }
      function Me(ge) {
        if (O(ge))
          throw new TypeError();
        return A === ge || B === ge || !O(ae) && ae.has(ge);
      }
      function ye(ge, gt, Ht) {
        if (!Me(Ht))
          throw new Error("Metadata provider not registered.");
        var sn = se(ge, gt);
        if (sn !== Ht) {
          if (!O(sn))
            return !1;
          var ar = Ce.get(ge);
          O(ar) && (ar = new re(), Ce.set(ge, ar)), ar.set(gt, Ht);
        }
        return !0;
      }
    }
    function Wn() {
      var _;
      return !O(Te) && le(p.Reflect) && Object.isExtensible(p.Reflect) && (_ = p.Reflect[Te]), O(_) && (_ = gn()), !O(Te) && le(p.Reflect) && Object.isExtensible(p.Reflect) && Object.defineProperty(p.Reflect, Te, {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: _
      }), _;
    }
    function Sr(_) {
      var A = new be(), B = {
        isProviderFor: function(Me, ye) {
          var ge = A.get(Me);
          return O(ge) ? !1 : ge.has(ye);
        },
        OrdinaryDefineOwnMetadata: Nt,
        OrdinaryHasOwnMetadata: Ce,
        OrdinaryGetOwnMetadata: xt,
        OrdinaryOwnMetadataKeys: it,
        OrdinaryDeleteMetadata: se
      };
      return me.registerProvider(B), B;
      function ae(Me, ye, ge) {
        var gt = A.get(Me), Ht = !1;
        if (O(gt)) {
          if (!ge)
            return;
          gt = new re(), A.set(Me, gt), Ht = !0;
        }
        var sn = gt.get(ye);
        if (O(sn)) {
          if (!ge)
            return;
          if (sn = new re(), gt.set(ye, sn), !_.setProvider(Me, ye, B))
            throw gt.delete(ye), Ht && A.delete(Me), new Error("Wrong provider for target.");
        }
        return sn;
      }
      function Ce(Me, ye, ge) {
        var gt = ae(
          ye,
          ge,
          /*Create*/
          !1
        );
        return O(gt) ? !1 : Re(gt.has(Me));
      }
      function xt(Me, ye, ge) {
        var gt = ae(
          ye,
          ge,
          /*Create*/
          !1
        );
        if (!O(gt))
          return gt.get(Me);
      }
      function Nt(Me, ye, ge, gt) {
        var Ht = ae(
          ge,
          gt,
          /*Create*/
          !0
        );
        Ht.set(Me, ye);
      }
      function it(Me, ye) {
        var ge = [], gt = ae(
          Me,
          ye,
          /*Create*/
          !1
        );
        if (O(gt))
          return ge;
        for (var Ht = gt.keys(), sn = wt(Ht), ar = 0; ; ) {
          var Ai = zn(sn);
          if (!Ai)
            return ge.length = ar, ge;
          var Ja = Nn(Ai);
          try {
            ge[ar] = Ja;
          } catch (di) {
            try {
              vn(sn);
            } finally {
              throw di;
            }
          }
          ar++;
        }
      }
      function se(Me, ye, ge) {
        var gt = ae(
          ye,
          ge,
          /*Create*/
          !1
        );
        if (O(gt) || !gt.delete(Me))
          return !1;
        if (gt.size === 0) {
          var Ht = A.get(ye);
          O(Ht) || (Ht.delete(ge), Ht.size === 0 && A.delete(Ht));
        }
        return !0;
      }
    }
    function Qn(_) {
      var A = _.defineMetadata, B = _.hasOwnMetadata, ae = _.getOwnMetadata, Ce = _.getOwnMetadataKeys, xt = _.deleteMetadata, Nt = new be(), it = {
        isProviderFor: function(se, Me) {
          var ye = Nt.get(se);
          return O(ye) ? Ce(se, Me).length ? (O(ye) && (ye = new ue(), Nt.set(se, ye)), ye.add(Me), !0) : !1 : ye.has(Me);
        },
        OrdinaryDefineOwnMetadata: A,
        OrdinaryHasOwnMetadata: B,
        OrdinaryGetOwnMetadata: ae,
        OrdinaryOwnMetadataKeys: Ce,
        OrdinaryDeleteMetadata: xt
      };
      return it;
    }
    function wn(_, A, B) {
      var ae = me.getProvider(_, A);
      if (!O(ae))
        return ae;
      if (B) {
        if (me.setProvider(_, A, tt))
          return tt;
        throw new Error("Illegal state.");
      }
    }
    function on() {
      var _ = {}, A = [], B = (
        /** @class */
        function() {
          function it(se, Me, ye) {
            this._index = 0, this._keys = se, this._values = Me, this._selector = ye;
          }
          return it.prototype["@@iterator"] = function() {
            return this;
          }, it.prototype[S] = function() {
            return this;
          }, it.prototype.next = function() {
            var se = this._index;
            if (se >= 0 && se < this._keys.length) {
              var Me = this._selector(this._keys[se], this._values[se]);
              return se + 1 >= this._keys.length ? (this._index = -1, this._keys = A, this._values = A) : this._index++, { value: Me, done: !1 };
            }
            return { value: void 0, done: !0 };
          }, it.prototype.throw = function(se) {
            throw this._index >= 0 && (this._index = -1, this._keys = A, this._values = A), se;
          }, it.prototype.return = function(se) {
            return this._index >= 0 && (this._index = -1, this._keys = A, this._values = A), { value: se, done: !0 };
          }, it;
        }()
      ), ae = (
        /** @class */
        function() {
          function it() {
            this._keys = [], this._values = [], this._cacheKey = _, this._cacheIndex = -2;
          }
          return Object.defineProperty(it.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: !0,
            configurable: !0
          }), it.prototype.has = function(se) {
            return this._find(
              se,
              /*insert*/
              !1
            ) >= 0;
          }, it.prototype.get = function(se) {
            var Me = this._find(
              se,
              /*insert*/
              !1
            );
            return Me >= 0 ? this._values[Me] : void 0;
          }, it.prototype.set = function(se, Me) {
            var ye = this._find(
              se,
              /*insert*/
              !0
            );
            return this._values[ye] = Me, this;
          }, it.prototype.delete = function(se) {
            var Me = this._find(
              se,
              /*insert*/
              !1
            );
            if (Me >= 0) {
              for (var ye = this._keys.length, ge = Me + 1; ge < ye; ge++)
                this._keys[ge - 1] = this._keys[ge], this._values[ge - 1] = this._values[ge];
              return this._keys.length--, this._values.length--, un(se, this._cacheKey) && (this._cacheKey = _, this._cacheIndex = -2), !0;
            }
            return !1;
          }, it.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = _, this._cacheIndex = -2;
          }, it.prototype.keys = function() {
            return new B(this._keys, this._values, Ce);
          }, it.prototype.values = function() {
            return new B(this._keys, this._values, xt);
          }, it.prototype.entries = function() {
            return new B(this._keys, this._values, Nt);
          }, it.prototype["@@iterator"] = function() {
            return this.entries();
          }, it.prototype[S] = function() {
            return this.entries();
          }, it.prototype._find = function(se, Me) {
            if (!un(this._cacheKey, se)) {
              this._cacheIndex = -1;
              for (var ye = 0; ye < this._keys.length; ye++)
                if (un(this._keys[ye], se)) {
                  this._cacheIndex = ye;
                  break;
                }
            }
            return this._cacheIndex < 0 && Me && (this._cacheIndex = this._keys.length, this._keys.push(se), this._values.push(void 0)), this._cacheIndex;
          }, it;
        }()
      );
      return ae;
      function Ce(it, se) {
        return it;
      }
      function xt(it, se) {
        return se;
      }
      function Nt(it, se) {
        return [it, se];
      }
    }
    function Gn() {
      var _ = (
        /** @class */
        function() {
          function A() {
            this._map = new re();
          }
          return Object.defineProperty(A.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: !0,
            configurable: !0
          }), A.prototype.has = function(B) {
            return this._map.has(B);
          }, A.prototype.add = function(B) {
            return this._map.set(B, B), this;
          }, A.prototype.delete = function(B) {
            return this._map.delete(B);
          }, A.prototype.clear = function() {
            this._map.clear();
          }, A.prototype.keys = function() {
            return this._map.keys();
          }, A.prototype.values = function() {
            return this._map.keys();
          }, A.prototype.entries = function() {
            return this._map.entries();
          }, A.prototype["@@iterator"] = function() {
            return this.keys();
          }, A.prototype[S] = function() {
            return this.keys();
          }, A;
        }()
      );
      return _;
    }
    function Nr() {
      var _ = 16, A = oe.create(), B = ae();
      return (
        /** @class */
        function() {
          function se() {
            this._key = ae();
          }
          return se.prototype.has = function(Me) {
            var ye = Ce(
              Me,
              /*create*/
              !1
            );
            return ye !== void 0 ? oe.has(ye, this._key) : !1;
          }, se.prototype.get = function(Me) {
            var ye = Ce(
              Me,
              /*create*/
              !1
            );
            return ye !== void 0 ? oe.get(ye, this._key) : void 0;
          }, se.prototype.set = function(Me, ye) {
            var ge = Ce(
              Me,
              /*create*/
              !0
            );
            return ge[this._key] = ye, this;
          }, se.prototype.delete = function(Me) {
            var ye = Ce(
              Me,
              /*create*/
              !1
            );
            return ye !== void 0 ? delete ye[this._key] : !1;
          }, se.prototype.clear = function() {
            this._key = ae();
          }, se;
        }()
      );
      function ae() {
        var se;
        do
          se = "@@WeakMap@@" + it();
        while (oe.has(A, se));
        return A[se] = !0, se;
      }
      function Ce(se, Me) {
        if (!C.call(se, B)) {
          if (!Me)
            return;
          Object.defineProperty(se, B, { value: oe.create() });
        }
        return se[B];
      }
      function xt(se, Me) {
        for (var ye = 0; ye < Me; ++ye)
          se[ye] = Math.random() * 255 | 0;
        return se;
      }
      function Nt(se) {
        return typeof Uint8Array == "function" ? typeof crypto < "u" ? crypto.getRandomValues(new Uint8Array(se)) : typeof msCrypto < "u" ? msCrypto.getRandomValues(new Uint8Array(se)) : xt(new Uint8Array(se), se) : xt(new Array(se), se);
      }
      function it() {
        var se = Nt(_);
        se[6] = se[6] & 79 | 64, se[8] = se[8] & 191 | 128;
        for (var Me = "", ye = 0; ye < _; ++ye) {
          var ge = se[ye];
          (ye === 4 || ye === 6 || ye === 8) && (Me += "-"), ge < 16 && (Me += "0"), Me += ge.toString(16).toLowerCase();
        }
        return Me;
      }
    }
    function qn(_) {
      return _.__ = void 0, delete _.__, _;
    }
  });
})(Nw || (Nw = {}));
const LE = Symbol("streamer_methods_with_metadata"), Fk = (v = !0) => (m, p, C) => {
  const w = Reflect.getMetadata(LE, m) || [];
  w.push(p), Reflect.defineMetadata(LE, w, m);
};
function Lw(v) {
  return (Reflect.getMetadata(LE, v) || []).map((p) => v[p]);
}
function cT(v = 1 / 0) {
  return function(m, p, C) {
    const w = C.get !== void 0, N = w ? C.get : C.value, S = Symbol(`__cache__${String(p)}`), te = Symbol(`__cacheExpire__${String(p)}`);
    function Y(oe, K) {
      oe[S] = K, oe[te] = Date.now() + v;
    }
    function $(oe) {
      return oe[te] && (oe[te] > Date.now() || v === 1 / 0);
    }
    w ? C.get = function() {
      if ($(this))
        return this[S];
      const oe = N.apply(this);
      return Y(this, oe), oe;
    } : C.value = function(...oe) {
      if ($(this))
        return this[S];
      const K = N.apply(this, oe);
      return Y(this, K), K;
    };
  };
}
var Hk = Object.defineProperty, Vk = Object.getOwnPropertyDescriptor, fT = (v, m, p, C) => {
  for (var w = C > 1 ? void 0 : C ? Vk(m, p) : m, N = v.length - 1, S; N >= 0; N--)
    (S = v[N]) && (w = (C ? S(m, p, w) : S(w)) || w);
  return C && w && Hk(m, p, w), w;
};
class IE {
  constructor(m) {
    this.id = Bk(), this.actionTypePrefix = m;
  }
  init(m, p) {
    this.getState = m, this.dispatch = p;
    const C = this.ducks, w = (N, S) => () => N()[S];
    Object.keys(C).forEach((N) => {
      C[N].init(w(m, N), p);
    });
  }
  get quickTypes() {
    return {};
  }
  get types() {
    return $k(this.actionTypePrefix, this.quickTypes);
  }
  get reducers() {
    return {};
  }
  get streamers() {
    const m = this, p = [...Lw(m).map((C) => C.bind(m))];
    return Object.keys(m.ducks).forEach((C) => {
      const w = m.ducks[C];
      p.push(...Lw(w).map((N) => N.bind(w)));
    }), p;
  }
  get creators() {
    return {};
  }
  get quickDucks() {
    return {};
  }
  get ducks() {
    return Ik(this.quickDucks, this.actionTypePrefix);
  }
  get combinedReducer() {
    const m = {
      ...this.reducers
    }, p = this.ducks;
    return Object.keys(p).forEach((C) => {
      m[C] = p[C].combinedReducer;
    }), Uk(m);
  }
}
fT([
  cT()
], IE.prototype, "types", 1);
fT([
  cT()
], IE.prototype, "ducks", 1);
function Bk() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(v) {
    const m = Math.random() * 16 | 0;
    return (v === "x" ? m : m & 3 | 8).toString(16);
  });
}
function $k(v, m) {
  let p = [];
  const C = {};
  return m && (p = p.concat(Object.keys(m))), p.forEach((w) => {
    C[w] = `${v}/${w}`;
  }), C;
}
function Ik(v, m) {
  const p = {};
  for (const C of Object.keys(v)) {
    let w = v[C];
    p[C] = new w(`${m}/${w.name}`);
  }
  return p;
}
var AE = { exports: {} }, nv = {}, UE = { exports: {} }, av = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
av.exports;
var Aw;
function Yk() {
  return Aw || (Aw = 1, function(v, m) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var p = "18.2.0", C = Symbol.for("react.element"), w = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), te = Symbol.for("react.profiler"), Y = Symbol.for("react.provider"), $ = Symbol.for("react.context"), oe = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), ue = Symbol.for("react.memo"), be = Symbol.for("react.lazy"), Te = Symbol.for("react.offscreen"), me = Symbol.iterator, tt = "@@iterator";
      function Ae(g) {
        if (g === null || typeof g != "object")
          return null;
        var k = me && g[me] || g[tt];
        return typeof k == "function" ? k : null;
      }
      var Ue = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ze = {
        transition: null
      }, _e = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Ke = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Fe = {}, kt = null;
      function qt(g) {
        kt = g;
      }
      Fe.setExtraStackFrame = function(g) {
        kt = g;
      }, Fe.getCurrentStack = null, Fe.getStackAddendum = function() {
        var g = "";
        kt && (g += kt);
        var k = Fe.getCurrentStack;
        return k && (g += k() || ""), g;
      };
      var mt = !1, yt = !1, Mt = !1, Ie = !1, rt = !1, at = {
        ReactCurrentDispatcher: Ue,
        ReactCurrentBatchConfig: Ze,
        ReactCurrentOwner: Ke
      };
      at.ReactDebugCurrentFrame = Fe, at.ReactCurrentActQueue = _e;
      function Ct(g) {
        {
          for (var k = arguments.length, Q = new Array(k > 1 ? k - 1 : 0), X = 1; X < k; X++)
            Q[X - 1] = arguments[X];
          pe("warn", g, Q);
        }
      }
      function Ne(g) {
        {
          for (var k = arguments.length, Q = new Array(k > 1 ? k - 1 : 0), X = 1; X < k; X++)
            Q[X - 1] = arguments[X];
          pe("error", g, Q);
        }
      }
      function pe(g, k, Q) {
        {
          var X = at.ReactDebugCurrentFrame, Se = X.getStackAddendum();
          Se !== "" && (k += "%s", Q = Q.concat([Se]));
          var ct = Q.map(function(Le) {
            return String(Le);
          });
          ct.unshift("Warning: " + k), Function.prototype.apply.call(console[g], console, ct);
        }
      }
      var $e = {};
      function M(g, k) {
        {
          var Q = g.constructor, X = Q && (Q.displayName || Q.name) || "ReactClass", Se = X + "." + k;
          if ($e[Se])
            return;
          Ne("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", k, X), $e[Se] = !0;
        }
      }
      var R = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(g) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(g, k, Q) {
          M(g, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(g, k, Q, X) {
          M(g, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(g, k, Q, X) {
          M(g, "setState");
        }
      }, O = Object.assign, U = {};
      Object.freeze(U);
      function Z(g, k, Q) {
        this.props = g, this.context = k, this.refs = U, this.updater = Q || R;
      }
      Z.prototype.isReactComponent = {}, Z.prototype.setState = function(g, k) {
        if (typeof g != "object" && typeof g != "function" && g != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, g, k, "setState");
      }, Z.prototype.forceUpdate = function(g) {
        this.updater.enqueueForceUpdate(this, g, "forceUpdate");
      };
      {
        var le = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, we = function(g, k) {
          Object.defineProperty(Z.prototype, g, {
            get: function() {
              Ct("%s(...) is deprecated in plain JavaScript React classes. %s", k[0], k[1]);
            }
          });
        };
        for (var xe in le)
          le.hasOwnProperty(xe) && we(xe, le[xe]);
      }
      function Re() {
      }
      Re.prototype = Z.prototype;
      function vt(g, k, Q) {
        this.props = g, this.context = k, this.refs = U, this.updater = Q || R;
      }
      var zt = vt.prototype = new Re();
      zt.constructor = vt, O(zt, Z.prototype), zt.isPureReactComponent = !0;
      function Kt() {
        var g = {
          current: null
        };
        return Object.seal(g), g;
      }
      var dt = Array.isArray;
      function _t(g) {
        return dt(g);
      }
      function bt(g) {
        {
          var k = typeof Symbol == "function" && Symbol.toStringTag, Q = k && g[Symbol.toStringTag] || g.constructor.name || "Object";
          return Q;
        }
      }
      function un(g) {
        try {
          return tn(g), !1;
        } catch {
          return !0;
        }
      }
      function tn(g) {
        return "" + g;
      }
      function wt(g) {
        if (un(g))
          return Ne("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", bt(g)), tn(g);
      }
      function Nn(g, k, Q) {
        var X = g.displayName;
        if (X)
          return X;
        var Se = k.displayName || k.name || "";
        return Se !== "" ? Q + "(" + Se + ")" : Q;
      }
      function zn(g) {
        return g.displayName || "Context";
      }
      function vn(g) {
        if (g == null)
          return null;
        if (typeof g.tag == "number" && Ne("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof g == "function")
          return g.displayName || g.name || null;
        if (typeof g == "string")
          return g;
        switch (g) {
          case N:
            return "Fragment";
          case w:
            return "Portal";
          case te:
            return "Profiler";
          case S:
            return "StrictMode";
          case K:
            return "Suspense";
          case re:
            return "SuspenseList";
        }
        if (typeof g == "object")
          switch (g.$$typeof) {
            case $:
              var k = g;
              return zn(k) + ".Consumer";
            case Y:
              var Q = g;
              return zn(Q._context) + ".Provider";
            case oe:
              return Nn(g, g.render, "ForwardRef");
            case ue:
              var X = g.displayName || null;
              return X !== null ? X : vn(g.type) || "Memo";
            case be: {
              var Se = g, ct = Se._payload, Le = Se._init;
              try {
                return vn(Le(ct));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Ln = Object.prototype.hasOwnProperty, gn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Wn, Sr, Qn;
      Qn = {};
      function wn(g) {
        if (Ln.call(g, "ref")) {
          var k = Object.getOwnPropertyDescriptor(g, "ref").get;
          if (k && k.isReactWarning)
            return !1;
        }
        return g.ref !== void 0;
      }
      function on(g) {
        if (Ln.call(g, "key")) {
          var k = Object.getOwnPropertyDescriptor(g, "key").get;
          if (k && k.isReactWarning)
            return !1;
        }
        return g.key !== void 0;
      }
      function Gn(g, k) {
        var Q = function() {
          Wn || (Wn = !0, Ne("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", k));
        };
        Q.isReactWarning = !0, Object.defineProperty(g, "key", {
          get: Q,
          configurable: !0
        });
      }
      function Nr(g, k) {
        var Q = function() {
          Sr || (Sr = !0, Ne("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", k));
        };
        Q.isReactWarning = !0, Object.defineProperty(g, "ref", {
          get: Q,
          configurable: !0
        });
      }
      function qn(g) {
        if (typeof g.ref == "string" && Ke.current && g.__self && Ke.current.stateNode !== g.__self) {
          var k = vn(Ke.current.type);
          Qn[k] || (Ne('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', k, g.ref), Qn[k] = !0);
        }
      }
      var _ = function(g, k, Q, X, Se, ct, Le) {
        var lt = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: C,
          // Built-in properties that belong on the element
          type: g,
          key: k,
          ref: Q,
          props: Le,
          // Record the component responsible for creating this element.
          _owner: ct
        };
        return lt._store = {}, Object.defineProperty(lt._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(lt, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: X
        }), Object.defineProperty(lt, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Se
        }), Object.freeze && (Object.freeze(lt.props), Object.freeze(lt)), lt;
      };
      function A(g, k, Q) {
        var X, Se = {}, ct = null, Le = null, lt = null, Pt = null;
        if (k != null) {
          wn(k) && (Le = k.ref, qn(k)), on(k) && (wt(k.key), ct = "" + k.key), lt = k.__self === void 0 ? null : k.__self, Pt = k.__source === void 0 ? null : k.__source;
          for (X in k)
            Ln.call(k, X) && !gn.hasOwnProperty(X) && (Se[X] = k[X]);
        }
        var Jt = arguments.length - 2;
        if (Jt === 1)
          Se.children = Q;
        else if (Jt > 1) {
          for (var Sn = Array(Jt), hn = 0; hn < Jt; hn++)
            Sn[hn] = arguments[hn + 2];
          Object.freeze && Object.freeze(Sn), Se.children = Sn;
        }
        if (g && g.defaultProps) {
          var En = g.defaultProps;
          for (X in En)
            Se[X] === void 0 && (Se[X] = En[X]);
        }
        if (ct || Le) {
          var _n = typeof g == "function" ? g.displayName || g.name || "Unknown" : g;
          ct && Gn(Se, _n), Le && Nr(Se, _n);
        }
        return _(g, ct, Le, lt, Pt, Ke.current, Se);
      }
      function B(g, k) {
        var Q = _(g.type, k, g.ref, g._self, g._source, g._owner, g.props);
        return Q;
      }
      function ae(g, k, Q) {
        if (g == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + g + ".");
        var X, Se = O({}, g.props), ct = g.key, Le = g.ref, lt = g._self, Pt = g._source, Jt = g._owner;
        if (k != null) {
          wn(k) && (Le = k.ref, Jt = Ke.current), on(k) && (wt(k.key), ct = "" + k.key);
          var Sn;
          g.type && g.type.defaultProps && (Sn = g.type.defaultProps);
          for (X in k)
            Ln.call(k, X) && !gn.hasOwnProperty(X) && (k[X] === void 0 && Sn !== void 0 ? Se[X] = Sn[X] : Se[X] = k[X]);
        }
        var hn = arguments.length - 2;
        if (hn === 1)
          Se.children = Q;
        else if (hn > 1) {
          for (var En = Array(hn), _n = 0; _n < hn; _n++)
            En[_n] = arguments[_n + 2];
          Se.children = En;
        }
        return _(g.type, ct, Le, lt, Pt, Jt, Se);
      }
      function Ce(g) {
        return typeof g == "object" && g !== null && g.$$typeof === C;
      }
      var xt = ".", Nt = ":";
      function it(g) {
        var k = /[=:]/g, Q = {
          "=": "=0",
          ":": "=2"
        }, X = g.replace(k, function(Se) {
          return Q[Se];
        });
        return "$" + X;
      }
      var se = !1, Me = /\/+/g;
      function ye(g) {
        return g.replace(Me, "$&/");
      }
      function ge(g, k) {
        return typeof g == "object" && g !== null && g.key != null ? (wt(g.key), it("" + g.key)) : k.toString(36);
      }
      function gt(g, k, Q, X, Se) {
        var ct = typeof g;
        (ct === "undefined" || ct === "boolean") && (g = null);
        var Le = !1;
        if (g === null)
          Le = !0;
        else
          switch (ct) {
            case "string":
            case "number":
              Le = !0;
              break;
            case "object":
              switch (g.$$typeof) {
                case C:
                case w:
                  Le = !0;
              }
          }
        if (Le) {
          var lt = g, Pt = Se(lt), Jt = X === "" ? xt + ge(lt, 0) : X;
          if (_t(Pt)) {
            var Sn = "";
            Jt != null && (Sn = ye(Jt) + "/"), gt(Pt, k, Sn, "", function(Kf) {
              return Kf;
            });
          } else
            Pt != null && (Ce(Pt) && (Pt.key && (!lt || lt.key !== Pt.key) && wt(Pt.key), Pt = B(
              Pt,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              Q + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (Pt.key && (!lt || lt.key !== Pt.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                ye("" + Pt.key) + "/"
              ) : "") + Jt
            )), k.push(Pt));
          return 1;
        }
        var hn, En, _n = 0, $t = X === "" ? xt : X + Nt;
        if (_t(g))
          for (var ji = 0; ji < g.length; ji++)
            hn = g[ji], En = $t + ge(hn, ji), _n += gt(hn, k, Q, En, Se);
        else {
          var nl = Ae(g);
          if (typeof nl == "function") {
            var ts = g;
            nl === ts.entries && (se || Ct("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), se = !0);
            for (var qf = nl.call(ts), ri, ns = 0; !(ri = qf.next()).done; )
              hn = ri.value, En = $t + ge(hn, ns++), _n += gt(hn, k, Q, En, Se);
          } else if (ct === "object") {
            var rs = String(g);
            throw new Error("Objects are not valid as a React child (found: " + (rs === "[object Object]" ? "object with keys {" + Object.keys(g).join(", ") + "}" : rs) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return _n;
      }
      function Ht(g, k, Q) {
        if (g == null)
          return g;
        var X = [], Se = 0;
        return gt(g, X, "", "", function(ct) {
          return k.call(Q, ct, Se++);
        }), X;
      }
      function sn(g) {
        var k = 0;
        return Ht(g, function() {
          k++;
        }), k;
      }
      function ar(g, k, Q) {
        Ht(g, function() {
          k.apply(this, arguments);
        }, Q);
      }
      function Ai(g) {
        return Ht(g, function(k) {
          return k;
        }) || [];
      }
      function Ja(g) {
        if (!Ce(g))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return g;
      }
      function di(g) {
        var k = {
          $$typeof: $,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: g,
          _currentValue2: g,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        k.Provider = {
          $$typeof: Y,
          _context: k
        };
        var Q = !1, X = !1, Se = !1;
        {
          var ct = {
            $$typeof: $,
            _context: k
          };
          Object.defineProperties(ct, {
            Provider: {
              get: function() {
                return X || (X = !0, Ne("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), k.Provider;
              },
              set: function(Le) {
                k.Provider = Le;
              }
            },
            _currentValue: {
              get: function() {
                return k._currentValue;
              },
              set: function(Le) {
                k._currentValue = Le;
              }
            },
            _currentValue2: {
              get: function() {
                return k._currentValue2;
              },
              set: function(Le) {
                k._currentValue2 = Le;
              }
            },
            _threadCount: {
              get: function() {
                return k._threadCount;
              },
              set: function(Le) {
                k._threadCount = Le;
              }
            },
            Consumer: {
              get: function() {
                return Q || (Q = !0, Ne("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), k.Consumer;
              }
            },
            displayName: {
              get: function() {
                return k.displayName;
              },
              set: function(Le) {
                Se || (Ct("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Le), Se = !0);
              }
            }
          }), k.Consumer = ct;
        }
        return k._currentRenderer = null, k._currentRenderer2 = null, k;
      }
      var ga = -1, pi = 0, Sa = 1, vi = 2;
      function Hr(g) {
        if (g._status === ga) {
          var k = g._result, Q = k();
          if (Q.then(function(ct) {
            if (g._status === pi || g._status === ga) {
              var Le = g;
              Le._status = Sa, Le._result = ct;
            }
          }, function(ct) {
            if (g._status === pi || g._status === ga) {
              var Le = g;
              Le._status = vi, Le._result = ct;
            }
          }), g._status === ga) {
            var X = g;
            X._status = pi, X._result = Q;
          }
        }
        if (g._status === Sa) {
          var Se = g._result;
          return Se === void 0 && Ne(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, Se), "default" in Se || Ne(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, Se), Se.default;
        } else
          throw g._result;
      }
      function Ea(g) {
        var k = {
          // We use these fields to store the result.
          _status: ga,
          _result: g
        }, Q = {
          $$typeof: be,
          _payload: k,
          _init: Hr
        };
        {
          var X, Se;
          Object.defineProperties(Q, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return X;
              },
              set: function(ct) {
                Ne("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), X = ct, Object.defineProperty(Q, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return Se;
              },
              set: function(ct) {
                Ne("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Se = ct, Object.defineProperty(Q, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return Q;
      }
      function hi(g) {
        g != null && g.$$typeof === ue ? Ne("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof g != "function" ? Ne("forwardRef requires a render function but was given %s.", g === null ? "null" : typeof g) : g.length !== 0 && g.length !== 2 && Ne("forwardRef render functions accept exactly two parameters: props and ref. %s", g.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), g != null && (g.defaultProps != null || g.propTypes != null) && Ne("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var k = {
          $$typeof: oe,
          render: g
        };
        {
          var Q;
          Object.defineProperty(k, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return Q;
            },
            set: function(X) {
              Q = X, !g.name && !g.displayName && (g.displayName = X);
            }
          });
        }
        return k;
      }
      var D;
      D = Symbol.for("react.module.reference");
      function ce(g) {
        return !!(typeof g == "string" || typeof g == "function" || g === N || g === te || rt || g === S || g === K || g === re || Ie || g === Te || mt || yt || Mt || typeof g == "object" && g !== null && (g.$$typeof === be || g.$$typeof === ue || g.$$typeof === Y || g.$$typeof === $ || g.$$typeof === oe || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        g.$$typeof === D || g.getModuleId !== void 0));
      }
      function Oe(g, k) {
        ce(g) || Ne("memo: The first argument must be a component. Instead received: %s", g === null ? "null" : typeof g);
        var Q = {
          $$typeof: ue,
          type: g,
          compare: k === void 0 ? null : k
        };
        {
          var X;
          Object.defineProperty(Q, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return X;
            },
            set: function(Se) {
              X = Se, !g.name && !g.displayName && (g.displayName = Se);
            }
          });
        }
        return Q;
      }
      function He() {
        var g = Ue.current;
        return g === null && Ne(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), g;
      }
      function Dt(g) {
        var k = He();
        if (g._context !== void 0) {
          var Q = g._context;
          Q.Consumer === g ? Ne("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : Q.Provider === g && Ne("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return k.useContext(g);
      }
      function It(g) {
        var k = He();
        return k.useState(g);
      }
      function Lt(g, k, Q) {
        var X = He();
        return X.useReducer(g, k, Q);
      }
      function ut(g) {
        var k = He();
        return k.useRef(g);
      }
      function Jn(g, k) {
        var Q = He();
        return Q.useEffect(g, k);
      }
      function Tn(g, k) {
        var Q = He();
        return Q.useInsertionEffect(g, k);
      }
      function Rn(g, k) {
        var Q = He();
        return Q.useLayoutEffect(g, k);
      }
      function Er(g, k) {
        var Q = He();
        return Q.useCallback(g, k);
      }
      function mi(g, k) {
        var Q = He();
        return Q.useMemo(g, k);
      }
      function Yo(g, k, Q) {
        var X = He();
        return X.useImperativeHandle(g, k, Q);
      }
      function Xt(g, k) {
        {
          var Q = He();
          return Q.useDebugValue(g, k);
        }
      }
      function Qf() {
        var g = He();
        return g.useTransition();
      }
      function ei(g) {
        var k = He();
        return k.useDeferredValue(g);
      }
      function jt() {
        var g = He();
        return g.useId();
      }
      function yi(g, k, Q) {
        var X = He();
        return X.useSyncExternalStore(g, k, Q);
      }
      var cu = 0, Wo, fu, ta, Xl, Vr, Zl, Jl;
      function rc() {
      }
      rc.__reactDisabledLog = !0;
      function Qo() {
        {
          if (cu === 0) {
            Wo = console.log, fu = console.info, ta = console.warn, Xl = console.error, Vr = console.group, Zl = console.groupCollapsed, Jl = console.groupEnd;
            var g = {
              configurable: !0,
              enumerable: !0,
              value: rc,
              writable: !0
            };
            Object.defineProperties(console, {
              info: g,
              log: g,
              warn: g,
              error: g,
              group: g,
              groupCollapsed: g,
              groupEnd: g
            });
          }
          cu++;
        }
      }
      function du() {
        {
          if (cu--, cu === 0) {
            var g = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: O({}, g, {
                value: Wo
              }),
              info: O({}, g, {
                value: fu
              }),
              warn: O({}, g, {
                value: ta
              }),
              error: O({}, g, {
                value: Xl
              }),
              group: O({}, g, {
                value: Vr
              }),
              groupCollapsed: O({}, g, {
                value: Zl
              }),
              groupEnd: O({}, g, {
                value: Jl
              })
            });
          }
          cu < 0 && Ne("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ti = at.ReactCurrentDispatcher, Br;
      function pu(g, k, Q) {
        {
          if (Br === void 0)
            try {
              throw Error();
            } catch (Se) {
              var X = Se.stack.trim().match(/\n( *(at )?)/);
              Br = X && X[1] || "";
            }
          return `
` + Br + g;
        }
      }
      var vu = !1, hu;
      {
        var Go = typeof WeakMap == "function" ? WeakMap : Map;
        hu = new Go();
      }
      function qo(g, k) {
        if (!g || vu)
          return "";
        {
          var Q = hu.get(g);
          if (Q !== void 0)
            return Q;
        }
        var X;
        vu = !0;
        var Se = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var ct;
        ct = ti.current, ti.current = null, Qo();
        try {
          if (k) {
            var Le = function() {
              throw Error();
            };
            if (Object.defineProperty(Le.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Le, []);
              } catch ($t) {
                X = $t;
              }
              Reflect.construct(g, [], Le);
            } else {
              try {
                Le.call();
              } catch ($t) {
                X = $t;
              }
              g.call(Le.prototype);
            }
          } else {
            try {
              throw Error();
            } catch ($t) {
              X = $t;
            }
            g();
          }
        } catch ($t) {
          if ($t && X && typeof $t.stack == "string") {
            for (var lt = $t.stack.split(`
`), Pt = X.stack.split(`
`), Jt = lt.length - 1, Sn = Pt.length - 1; Jt >= 1 && Sn >= 0 && lt[Jt] !== Pt[Sn]; )
              Sn--;
            for (; Jt >= 1 && Sn >= 0; Jt--, Sn--)
              if (lt[Jt] !== Pt[Sn]) {
                if (Jt !== 1 || Sn !== 1)
                  do
                    if (Jt--, Sn--, Sn < 0 || lt[Jt] !== Pt[Sn]) {
                      var hn = `
` + lt[Jt].replace(" at new ", " at ");
                      return g.displayName && hn.includes("<anonymous>") && (hn = hn.replace("<anonymous>", g.displayName)), typeof g == "function" && hu.set(g, hn), hn;
                    }
                  while (Jt >= 1 && Sn >= 0);
                break;
              }
          }
        } finally {
          vu = !1, ti.current = ct, du(), Error.prepareStackTrace = Se;
        }
        var En = g ? g.displayName || g.name : "", _n = En ? pu(En) : "";
        return typeof g == "function" && hu.set(g, _n), _n;
      }
      function Ui(g, k, Q) {
        return qo(g, !1);
      }
      function Gf(g) {
        var k = g.prototype;
        return !!(k && k.isReactComponent);
      }
      function gi(g, k, Q) {
        if (g == null)
          return "";
        if (typeof g == "function")
          return qo(g, Gf(g));
        if (typeof g == "string")
          return pu(g);
        switch (g) {
          case K:
            return pu("Suspense");
          case re:
            return pu("SuspenseList");
        }
        if (typeof g == "object")
          switch (g.$$typeof) {
            case oe:
              return Ui(g.render);
            case ue:
              return gi(g.type, k, Q);
            case be: {
              var X = g, Se = X._payload, ct = X._init;
              try {
                return gi(ct(Se), k, Q);
              } catch {
              }
            }
          }
        return "";
      }
      var nn = {}, Ko = at.ReactDebugCurrentFrame;
      function to(g) {
        if (g) {
          var k = g._owner, Q = gi(g.type, g._source, k ? k.type : null);
          Ko.setExtraStackFrame(Q);
        } else
          Ko.setExtraStackFrame(null);
      }
      function Xo(g, k, Q, X, Se) {
        {
          var ct = Function.call.bind(Ln);
          for (var Le in g)
            if (ct(g, Le)) {
              var lt = void 0;
              try {
                if (typeof g[Le] != "function") {
                  var Pt = Error((X || "React class") + ": " + Q + " type `" + Le + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof g[Le] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw Pt.name = "Invariant Violation", Pt;
                }
                lt = g[Le](k, Le, X, Q, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Jt) {
                lt = Jt;
              }
              lt && !(lt instanceof Error) && (to(Se), Ne("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", X || "React class", Q, Le, typeof lt), to(null)), lt instanceof Error && !(lt.message in nn) && (nn[lt.message] = !0, to(Se), Ne("Failed %s type: %s", Q, lt.message), to(null));
            }
        }
      }
      function Zt(g) {
        if (g) {
          var k = g._owner, Q = gi(g.type, g._source, k ? k.type : null);
          qt(Q);
        } else
          qt(null);
      }
      var Zo;
      Zo = !1;
      function Jo() {
        if (Ke.current) {
          var g = vn(Ke.current.type);
          if (g)
            return `

Check the render method of \`` + g + "`.";
        }
        return "";
      }
      function Tt(g) {
        if (g !== void 0) {
          var k = g.fileName.replace(/^.*[\\\/]/, ""), Q = g.lineNumber;
          return `

Check your code at ` + k + ":" + Q + ".";
        }
        return "";
      }
      function no(g) {
        return g != null ? Tt(g.__source) : "";
      }
      var jn = {};
      function na(g) {
        var k = Jo();
        if (!k) {
          var Q = typeof g == "string" ? g : g.displayName || g.name;
          Q && (k = `

Check the top-level render call using <` + Q + ">.");
        }
        return k;
      }
      function $r(g, k) {
        if (!(!g._store || g._store.validated || g.key != null)) {
          g._store.validated = !0;
          var Q = na(k);
          if (!jn[Q]) {
            jn[Q] = !0;
            var X = "";
            g && g._owner && g._owner !== Ke.current && (X = " It was passed a child from " + vn(g._owner.type) + "."), Zt(g), Ne('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Q, X), Zt(null);
          }
        }
      }
      function mu(g, k) {
        if (typeof g == "object") {
          if (_t(g))
            for (var Q = 0; Q < g.length; Q++) {
              var X = g[Q];
              Ce(X) && $r(X, k);
            }
          else if (Ce(g))
            g._store && (g._store.validated = !0);
          else if (g) {
            var Se = Ae(g);
            if (typeof Se == "function" && Se !== g.entries)
              for (var ct = Se.call(g), Le; !(Le = ct.next()).done; )
                Ce(Le.value) && $r(Le.value, k);
          }
        }
      }
      function Bn(g) {
        {
          var k = g.type;
          if (k == null || typeof k == "string")
            return;
          var Q;
          if (typeof k == "function")
            Q = k.propTypes;
          else if (typeof k == "object" && (k.$$typeof === oe || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          k.$$typeof === ue))
            Q = k.propTypes;
          else
            return;
          if (Q) {
            var X = vn(k);
            Xo(Q, g.props, "prop", X, g);
          } else if (k.PropTypes !== void 0 && !Zo) {
            Zo = !0;
            var Se = vn(k);
            Ne("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Se || "Unknown");
          }
          typeof k.getDefaultProps == "function" && !k.getDefaultProps.isReactClassApproved && Ne("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function cn(g) {
        {
          for (var k = Object.keys(g.props), Q = 0; Q < k.length; Q++) {
            var X = k[Q];
            if (X !== "children" && X !== "key") {
              Zt(g), Ne("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", X), Zt(null);
              break;
            }
          }
          g.ref !== null && (Zt(g), Ne("Invalid attribute `ref` supplied to `React.Fragment`."), Zt(null));
        }
      }
      function ac(g, k, Q) {
        var X = ce(g);
        if (!X) {
          var Se = "";
          (g === void 0 || typeof g == "object" && g !== null && Object.keys(g).length === 0) && (Se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ct = no(k);
          ct ? Se += ct : Se += Jo();
          var Le;
          g === null ? Le = "null" : _t(g) ? Le = "array" : g !== void 0 && g.$$typeof === C ? (Le = "<" + (vn(g.type) || "Unknown") + " />", Se = " Did you accidentally export a JSX literal instead of a component?") : Le = typeof g, Ne("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Le, Se);
        }
        var lt = A.apply(this, arguments);
        if (lt == null)
          return lt;
        if (X)
          for (var Pt = 2; Pt < arguments.length; Pt++)
            mu(arguments[Pt], g);
        return g === N ? cn(lt) : Bn(lt), lt;
      }
      var ra = !1;
      function fr(g) {
        var k = ac.bind(null, g);
        return k.type = g, ra || (ra = !0, Ct("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(k, "type", {
          enumerable: !1,
          get: function() {
            return Ct("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: g
            }), g;
          }
        }), k;
      }
      function Si(g, k, Q) {
        for (var X = ae.apply(this, arguments), Se = 2; Se < arguments.length; Se++)
          mu(arguments[Se], X.type);
        return Bn(X), X;
      }
      function ic(g, k) {
        var Q = Ze.transition;
        Ze.transition = {};
        var X = Ze.transition;
        Ze.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          g();
        } finally {
          if (Ze.transition = Q, Q === null && X._updatedFibers) {
            var Se = X._updatedFibers.size;
            Se > 10 && Ct("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), X._updatedFibers.clear();
          }
        }
      }
      var zi = !1, yu = null;
      function uc(g) {
        if (yu === null)
          try {
            var k = ("require" + Math.random()).slice(0, 7), Q = v && v[k];
            yu = Q.call(v, "timers").setImmediate;
          } catch {
            yu = function(Se) {
              zi === !1 && (zi = !0, typeof MessageChannel > "u" && Ne("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var ct = new MessageChannel();
              ct.port1.onmessage = Se, ct.port2.postMessage(void 0);
            };
          }
        return yu(g);
      }
      var Na = 0, gu = !1;
      function Su(g) {
        {
          var k = Na;
          Na++, _e.current === null && (_e.current = []);
          var Q = _e.isBatchingLegacy, X;
          try {
            if (_e.isBatchingLegacy = !0, X = g(), !Q && _e.didScheduleLegacyUpdate) {
              var Se = _e.current;
              Se !== null && (_e.didScheduleLegacyUpdate = !1, Cu(Se));
            }
          } catch (En) {
            throw La(k), En;
          } finally {
            _e.isBatchingLegacy = Q;
          }
          if (X !== null && typeof X == "object" && typeof X.then == "function") {
            var ct = X, Le = !1, lt = {
              then: function(En, _n) {
                Le = !0, ct.then(function($t) {
                  La(k), Na === 0 ? el($t, En, _n) : En($t);
                }, function($t) {
                  La(k), _n($t);
                });
              }
            };
            return !gu && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              Le || (gu = !0, Ne("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), lt;
          } else {
            var Pt = X;
            if (La(k), Na === 0) {
              var Jt = _e.current;
              Jt !== null && (Cu(Jt), _e.current = null);
              var Sn = {
                then: function(En, _n) {
                  _e.current === null ? (_e.current = [], el(Pt, En, _n)) : En(Pt);
                }
              };
              return Sn;
            } else {
              var hn = {
                then: function(En, _n) {
                  En(Pt);
                }
              };
              return hn;
            }
          }
        }
      }
      function La(g) {
        g !== Na - 1 && Ne("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Na = g;
      }
      function el(g, k, Q) {
        {
          var X = _e.current;
          if (X !== null)
            try {
              Cu(X), uc(function() {
                X.length === 0 ? (_e.current = null, k(g)) : el(g, k, Q);
              });
            } catch (Se) {
              Q(Se);
            }
          else
            k(g);
        }
      }
      var Eu = !1;
      function Cu(g) {
        if (!Eu) {
          Eu = !0;
          var k = 0;
          try {
            for (; k < g.length; k++) {
              var Q = g[k];
              do
                Q = Q(!0);
              while (Q !== null);
            }
            g.length = 0;
          } catch (X) {
            throw g = g.slice(k + 1), X;
          } finally {
            Eu = !1;
          }
        }
      }
      var ro = ac, tl = Si, es = fr, ni = {
        map: Ht,
        forEach: ar,
        count: sn,
        toArray: Ai,
        only: Ja
      };
      m.Children = ni, m.Component = Z, m.Fragment = N, m.Profiler = te, m.PureComponent = vt, m.StrictMode = S, m.Suspense = K, m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = at, m.cloneElement = tl, m.createContext = di, m.createElement = ro, m.createFactory = es, m.createRef = Kt, m.forwardRef = hi, m.isValidElement = Ce, m.lazy = Ea, m.memo = Oe, m.startTransition = ic, m.unstable_act = Su, m.useCallback = Er, m.useContext = Dt, m.useDebugValue = Xt, m.useDeferredValue = ei, m.useEffect = Jn, m.useId = jt, m.useImperativeHandle = Yo, m.useInsertionEffect = Tn, m.useLayoutEffect = Rn, m.useMemo = mi, m.useReducer = Lt, m.useRef = ut, m.useState = It, m.useSyncExternalStore = yi, m.useTransition = Qf, m.version = p, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(av, av.exports)), av.exports;
}
var Gt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uw;
function Wk() {
  if (Uw)
    return Gt;
  Uw = 1;
  var v = Symbol.for("react.element"), m = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), N = Symbol.for("react.provider"), S = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), Y = Symbol.for("react.suspense"), $ = Symbol.for("react.memo"), oe = Symbol.for("react.lazy"), K = Symbol.iterator;
  function re(M) {
    return M === null || typeof M != "object" ? null : (M = K && M[K] || M["@@iterator"], typeof M == "function" ? M : null);
  }
  var ue = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, be = Object.assign, Te = {};
  function me(M, R, O) {
    this.props = M, this.context = R, this.refs = Te, this.updater = O || ue;
  }
  me.prototype.isReactComponent = {}, me.prototype.setState = function(M, R) {
    if (typeof M != "object" && typeof M != "function" && M != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, M, R, "setState");
  }, me.prototype.forceUpdate = function(M) {
    this.updater.enqueueForceUpdate(this, M, "forceUpdate");
  };
  function tt() {
  }
  tt.prototype = me.prototype;
  function Ae(M, R, O) {
    this.props = M, this.context = R, this.refs = Te, this.updater = O || ue;
  }
  var Ue = Ae.prototype = new tt();
  Ue.constructor = Ae, be(Ue, me.prototype), Ue.isPureReactComponent = !0;
  var Ze = Array.isArray, _e = Object.prototype.hasOwnProperty, Ke = { current: null }, Fe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function kt(M, R, O) {
    var U, Z = {}, le = null, we = null;
    if (R != null)
      for (U in R.ref !== void 0 && (we = R.ref), R.key !== void 0 && (le = "" + R.key), R)
        _e.call(R, U) && !Fe.hasOwnProperty(U) && (Z[U] = R[U]);
    var xe = arguments.length - 2;
    if (xe === 1)
      Z.children = O;
    else if (1 < xe) {
      for (var Re = Array(xe), vt = 0; vt < xe; vt++)
        Re[vt] = arguments[vt + 2];
      Z.children = Re;
    }
    if (M && M.defaultProps)
      for (U in xe = M.defaultProps, xe)
        Z[U] === void 0 && (Z[U] = xe[U]);
    return { $$typeof: v, type: M, key: le, ref: we, props: Z, _owner: Ke.current };
  }
  function qt(M, R) {
    return { $$typeof: v, type: M.type, key: R, ref: M.ref, props: M.props, _owner: M._owner };
  }
  function mt(M) {
    return typeof M == "object" && M !== null && M.$$typeof === v;
  }
  function yt(M) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + M.replace(/[=:]/g, function(O) {
      return R[O];
    });
  }
  var Mt = /\/+/g;
  function Ie(M, R) {
    return typeof M == "object" && M !== null && M.key != null ? yt("" + M.key) : R.toString(36);
  }
  function rt(M, R, O, U, Z) {
    var le = typeof M;
    (le === "undefined" || le === "boolean") && (M = null);
    var we = !1;
    if (M === null)
      we = !0;
    else
      switch (le) {
        case "string":
        case "number":
          we = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case v:
            case m:
              we = !0;
          }
      }
    if (we)
      return we = M, Z = Z(we), M = U === "" ? "." + Ie(we, 0) : U, Ze(Z) ? (O = "", M != null && (O = M.replace(Mt, "$&/") + "/"), rt(Z, R, O, "", function(vt) {
        return vt;
      })) : Z != null && (mt(Z) && (Z = qt(Z, O + (!Z.key || we && we.key === Z.key ? "" : ("" + Z.key).replace(Mt, "$&/") + "/") + M)), R.push(Z)), 1;
    if (we = 0, U = U === "" ? "." : U + ":", Ze(M))
      for (var xe = 0; xe < M.length; xe++) {
        le = M[xe];
        var Re = U + Ie(le, xe);
        we += rt(le, R, O, Re, Z);
      }
    else if (Re = re(M), typeof Re == "function")
      for (M = Re.call(M), xe = 0; !(le = M.next()).done; )
        le = le.value, Re = U + Ie(le, xe++), we += rt(le, R, O, Re, Z);
    else if (le === "object")
      throw R = String(M), Error("Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead.");
    return we;
  }
  function at(M, R, O) {
    if (M == null)
      return M;
    var U = [], Z = 0;
    return rt(M, U, "", "", function(le) {
      return R.call(O, le, Z++);
    }), U;
  }
  function Ct(M) {
    if (M._status === -1) {
      var R = M._result;
      R = R(), R.then(function(O) {
        (M._status === 0 || M._status === -1) && (M._status = 1, M._result = O);
      }, function(O) {
        (M._status === 0 || M._status === -1) && (M._status = 2, M._result = O);
      }), M._status === -1 && (M._status = 0, M._result = R);
    }
    if (M._status === 1)
      return M._result.default;
    throw M._result;
  }
  var Ne = { current: null }, pe = { transition: null }, $e = { ReactCurrentDispatcher: Ne, ReactCurrentBatchConfig: pe, ReactCurrentOwner: Ke };
  return Gt.Children = { map: at, forEach: function(M, R, O) {
    at(M, function() {
      R.apply(this, arguments);
    }, O);
  }, count: function(M) {
    var R = 0;
    return at(M, function() {
      R++;
    }), R;
  }, toArray: function(M) {
    return at(M, function(R) {
      return R;
    }) || [];
  }, only: function(M) {
    if (!mt(M))
      throw Error("React.Children.only expected to receive a single React element child.");
    return M;
  } }, Gt.Component = me, Gt.Fragment = p, Gt.Profiler = w, Gt.PureComponent = Ae, Gt.StrictMode = C, Gt.Suspense = Y, Gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $e, Gt.cloneElement = function(M, R, O) {
    if (M == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + M + ".");
    var U = be({}, M.props), Z = M.key, le = M.ref, we = M._owner;
    if (R != null) {
      if (R.ref !== void 0 && (le = R.ref, we = Ke.current), R.key !== void 0 && (Z = "" + R.key), M.type && M.type.defaultProps)
        var xe = M.type.defaultProps;
      for (Re in R)
        _e.call(R, Re) && !Fe.hasOwnProperty(Re) && (U[Re] = R[Re] === void 0 && xe !== void 0 ? xe[Re] : R[Re]);
    }
    var Re = arguments.length - 2;
    if (Re === 1)
      U.children = O;
    else if (1 < Re) {
      xe = Array(Re);
      for (var vt = 0; vt < Re; vt++)
        xe[vt] = arguments[vt + 2];
      U.children = xe;
    }
    return { $$typeof: v, type: M.type, key: Z, ref: le, props: U, _owner: we };
  }, Gt.createContext = function(M) {
    return M = { $$typeof: S, _currentValue: M, _currentValue2: M, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, M.Provider = { $$typeof: N, _context: M }, M.Consumer = M;
  }, Gt.createElement = kt, Gt.createFactory = function(M) {
    var R = kt.bind(null, M);
    return R.type = M, R;
  }, Gt.createRef = function() {
    return { current: null };
  }, Gt.forwardRef = function(M) {
    return { $$typeof: te, render: M };
  }, Gt.isValidElement = mt, Gt.lazy = function(M) {
    return { $$typeof: oe, _payload: { _status: -1, _result: M }, _init: Ct };
  }, Gt.memo = function(M, R) {
    return { $$typeof: $, type: M, compare: R === void 0 ? null : R };
  }, Gt.startTransition = function(M) {
    var R = pe.transition;
    pe.transition = {};
    try {
      M();
    } finally {
      pe.transition = R;
    }
  }, Gt.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, Gt.useCallback = function(M, R) {
    return Ne.current.useCallback(M, R);
  }, Gt.useContext = function(M) {
    return Ne.current.useContext(M);
  }, Gt.useDebugValue = function() {
  }, Gt.useDeferredValue = function(M) {
    return Ne.current.useDeferredValue(M);
  }, Gt.useEffect = function(M, R) {
    return Ne.current.useEffect(M, R);
  }, Gt.useId = function() {
    return Ne.current.useId();
  }, Gt.useImperativeHandle = function(M, R, O) {
    return Ne.current.useImperativeHandle(M, R, O);
  }, Gt.useInsertionEffect = function(M, R) {
    return Ne.current.useInsertionEffect(M, R);
  }, Gt.useLayoutEffect = function(M, R) {
    return Ne.current.useLayoutEffect(M, R);
  }, Gt.useMemo = function(M, R) {
    return Ne.current.useMemo(M, R);
  }, Gt.useReducer = function(M, R, O) {
    return Ne.current.useReducer(M, R, O);
  }, Gt.useRef = function(M) {
    return Ne.current.useRef(M);
  }, Gt.useState = function(M) {
    return Ne.current.useState(M);
  }, Gt.useSyncExternalStore = function(M, R, O) {
    return Ne.current.useSyncExternalStore(M, R, O);
  }, Gt.useTransition = function() {
    return Ne.current.useTransition();
  }, Gt.version = "18.2.0", Gt;
}
process.env.NODE_ENV === "production" ? UE.exports = Wk() : UE.exports = Yk();
var Ju = UE.exports;
const dT = /* @__PURE__ */ Pk(Ju), zw = /* @__PURE__ */ Rk({
  __proto__: null,
  default: dT
}, [Ju]);
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jw;
function Qk() {
  return jw || (jw = 1, process.env.NODE_ENV !== "production" && function() {
    var v = Ju, m = Symbol.for("react.element"), p = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), te = Symbol.for("react.context"), Y = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), oe = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), re = Symbol.for("react.lazy"), ue = Symbol.for("react.offscreen"), be = Symbol.iterator, Te = "@@iterator";
    function me(D) {
      if (D === null || typeof D != "object")
        return null;
      var ce = be && D[be] || D[Te];
      return typeof ce == "function" ? ce : null;
    }
    var tt = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Ae(D) {
      {
        for (var ce = arguments.length, Oe = new Array(ce > 1 ? ce - 1 : 0), He = 1; He < ce; He++)
          Oe[He - 1] = arguments[He];
        Ue("error", D, Oe);
      }
    }
    function Ue(D, ce, Oe) {
      {
        var He = tt.ReactDebugCurrentFrame, Dt = He.getStackAddendum();
        Dt !== "" && (ce += "%s", Oe = Oe.concat([Dt]));
        var It = Oe.map(function(Lt) {
          return String(Lt);
        });
        It.unshift("Warning: " + ce), Function.prototype.apply.call(console[D], console, It);
      }
    }
    var Ze = !1, _e = !1, Ke = !1, Fe = !1, kt = !1, qt;
    qt = Symbol.for("react.module.reference");
    function mt(D) {
      return !!(typeof D == "string" || typeof D == "function" || D === C || D === N || kt || D === w || D === $ || D === oe || Fe || D === ue || Ze || _e || Ke || typeof D == "object" && D !== null && (D.$$typeof === re || D.$$typeof === K || D.$$typeof === S || D.$$typeof === te || D.$$typeof === Y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      D.$$typeof === qt || D.getModuleId !== void 0));
    }
    function yt(D, ce, Oe) {
      var He = D.displayName;
      if (He)
        return He;
      var Dt = ce.displayName || ce.name || "";
      return Dt !== "" ? Oe + "(" + Dt + ")" : Oe;
    }
    function Mt(D) {
      return D.displayName || "Context";
    }
    function Ie(D) {
      if (D == null)
        return null;
      if (typeof D.tag == "number" && Ae("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof D == "function")
        return D.displayName || D.name || null;
      if (typeof D == "string")
        return D;
      switch (D) {
        case C:
          return "Fragment";
        case p:
          return "Portal";
        case N:
          return "Profiler";
        case w:
          return "StrictMode";
        case $:
          return "Suspense";
        case oe:
          return "SuspenseList";
      }
      if (typeof D == "object")
        switch (D.$$typeof) {
          case te:
            var ce = D;
            return Mt(ce) + ".Consumer";
          case S:
            var Oe = D;
            return Mt(Oe._context) + ".Provider";
          case Y:
            return yt(D, D.render, "ForwardRef");
          case K:
            var He = D.displayName || null;
            return He !== null ? He : Ie(D.type) || "Memo";
          case re: {
            var Dt = D, It = Dt._payload, Lt = Dt._init;
            try {
              return Ie(Lt(It));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var rt = Object.assign, at = 0, Ct, Ne, pe, $e, M, R, O;
    function U() {
    }
    U.__reactDisabledLog = !0;
    function Z() {
      {
        if (at === 0) {
          Ct = console.log, Ne = console.info, pe = console.warn, $e = console.error, M = console.group, R = console.groupCollapsed, O = console.groupEnd;
          var D = {
            configurable: !0,
            enumerable: !0,
            value: U,
            writable: !0
          };
          Object.defineProperties(console, {
            info: D,
            log: D,
            warn: D,
            error: D,
            group: D,
            groupCollapsed: D,
            groupEnd: D
          });
        }
        at++;
      }
    }
    function le() {
      {
        if (at--, at === 0) {
          var D = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: rt({}, D, {
              value: Ct
            }),
            info: rt({}, D, {
              value: Ne
            }),
            warn: rt({}, D, {
              value: pe
            }),
            error: rt({}, D, {
              value: $e
            }),
            group: rt({}, D, {
              value: M
            }),
            groupCollapsed: rt({}, D, {
              value: R
            }),
            groupEnd: rt({}, D, {
              value: O
            })
          });
        }
        at < 0 && Ae("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var we = tt.ReactCurrentDispatcher, xe;
    function Re(D, ce, Oe) {
      {
        if (xe === void 0)
          try {
            throw Error();
          } catch (Dt) {
            var He = Dt.stack.trim().match(/\n( *(at )?)/);
            xe = He && He[1] || "";
          }
        return `
` + xe + D;
      }
    }
    var vt = !1, zt;
    {
      var Kt = typeof WeakMap == "function" ? WeakMap : Map;
      zt = new Kt();
    }
    function dt(D, ce) {
      if (!D || vt)
        return "";
      {
        var Oe = zt.get(D);
        if (Oe !== void 0)
          return Oe;
      }
      var He;
      vt = !0;
      var Dt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var It;
      It = we.current, we.current = null, Z();
      try {
        if (ce) {
          var Lt = function() {
            throw Error();
          };
          if (Object.defineProperty(Lt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Lt, []);
            } catch (Xt) {
              He = Xt;
            }
            Reflect.construct(D, [], Lt);
          } else {
            try {
              Lt.call();
            } catch (Xt) {
              He = Xt;
            }
            D.call(Lt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Xt) {
            He = Xt;
          }
          D();
        }
      } catch (Xt) {
        if (Xt && He && typeof Xt.stack == "string") {
          for (var ut = Xt.stack.split(`
`), Jn = He.stack.split(`
`), Tn = ut.length - 1, Rn = Jn.length - 1; Tn >= 1 && Rn >= 0 && ut[Tn] !== Jn[Rn]; )
            Rn--;
          for (; Tn >= 1 && Rn >= 0; Tn--, Rn--)
            if (ut[Tn] !== Jn[Rn]) {
              if (Tn !== 1 || Rn !== 1)
                do
                  if (Tn--, Rn--, Rn < 0 || ut[Tn] !== Jn[Rn]) {
                    var Er = `
` + ut[Tn].replace(" at new ", " at ");
                    return D.displayName && Er.includes("<anonymous>") && (Er = Er.replace("<anonymous>", D.displayName)), typeof D == "function" && zt.set(D, Er), Er;
                  }
                while (Tn >= 1 && Rn >= 0);
              break;
            }
        }
      } finally {
        vt = !1, we.current = It, le(), Error.prepareStackTrace = Dt;
      }
      var mi = D ? D.displayName || D.name : "", Yo = mi ? Re(mi) : "";
      return typeof D == "function" && zt.set(D, Yo), Yo;
    }
    function _t(D, ce, Oe) {
      return dt(D, !1);
    }
    function bt(D) {
      var ce = D.prototype;
      return !!(ce && ce.isReactComponent);
    }
    function un(D, ce, Oe) {
      if (D == null)
        return "";
      if (typeof D == "function")
        return dt(D, bt(D));
      if (typeof D == "string")
        return Re(D);
      switch (D) {
        case $:
          return Re("Suspense");
        case oe:
          return Re("SuspenseList");
      }
      if (typeof D == "object")
        switch (D.$$typeof) {
          case Y:
            return _t(D.render);
          case K:
            return un(D.type, ce, Oe);
          case re: {
            var He = D, Dt = He._payload, It = He._init;
            try {
              return un(It(Dt), ce, Oe);
            } catch {
            }
          }
        }
      return "";
    }
    var tn = Object.prototype.hasOwnProperty, wt = {}, Nn = tt.ReactDebugCurrentFrame;
    function zn(D) {
      if (D) {
        var ce = D._owner, Oe = un(D.type, D._source, ce ? ce.type : null);
        Nn.setExtraStackFrame(Oe);
      } else
        Nn.setExtraStackFrame(null);
    }
    function vn(D, ce, Oe, He, Dt) {
      {
        var It = Function.call.bind(tn);
        for (var Lt in D)
          if (It(D, Lt)) {
            var ut = void 0;
            try {
              if (typeof D[Lt] != "function") {
                var Jn = Error((He || "React class") + ": " + Oe + " type `" + Lt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof D[Lt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Jn.name = "Invariant Violation", Jn;
              }
              ut = D[Lt](ce, Lt, He, Oe, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Tn) {
              ut = Tn;
            }
            ut && !(ut instanceof Error) && (zn(Dt), Ae("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", He || "React class", Oe, Lt, typeof ut), zn(null)), ut instanceof Error && !(ut.message in wt) && (wt[ut.message] = !0, zn(Dt), Ae("Failed %s type: %s", Oe, ut.message), zn(null));
          }
      }
    }
    var Ln = Array.isArray;
    function gn(D) {
      return Ln(D);
    }
    function Wn(D) {
      {
        var ce = typeof Symbol == "function" && Symbol.toStringTag, Oe = ce && D[Symbol.toStringTag] || D.constructor.name || "Object";
        return Oe;
      }
    }
    function Sr(D) {
      try {
        return Qn(D), !1;
      } catch {
        return !0;
      }
    }
    function Qn(D) {
      return "" + D;
    }
    function wn(D) {
      if (Sr(D))
        return Ae("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Wn(D)), Qn(D);
    }
    var on = tt.ReactCurrentOwner, Gn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Nr, qn, _;
    _ = {};
    function A(D) {
      if (tn.call(D, "ref")) {
        var ce = Object.getOwnPropertyDescriptor(D, "ref").get;
        if (ce && ce.isReactWarning)
          return !1;
      }
      return D.ref !== void 0;
    }
    function B(D) {
      if (tn.call(D, "key")) {
        var ce = Object.getOwnPropertyDescriptor(D, "key").get;
        if (ce && ce.isReactWarning)
          return !1;
      }
      return D.key !== void 0;
    }
    function ae(D, ce) {
      if (typeof D.ref == "string" && on.current && ce && on.current.stateNode !== ce) {
        var Oe = Ie(on.current.type);
        _[Oe] || (Ae('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Ie(on.current.type), D.ref), _[Oe] = !0);
      }
    }
    function Ce(D, ce) {
      {
        var Oe = function() {
          Nr || (Nr = !0, Ae("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ce));
        };
        Oe.isReactWarning = !0, Object.defineProperty(D, "key", {
          get: Oe,
          configurable: !0
        });
      }
    }
    function xt(D, ce) {
      {
        var Oe = function() {
          qn || (qn = !0, Ae("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ce));
        };
        Oe.isReactWarning = !0, Object.defineProperty(D, "ref", {
          get: Oe,
          configurable: !0
        });
      }
    }
    var Nt = function(D, ce, Oe, He, Dt, It, Lt) {
      var ut = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: m,
        // Built-in properties that belong on the element
        type: D,
        key: ce,
        ref: Oe,
        props: Lt,
        // Record the component responsible for creating this element.
        _owner: It
      };
      return ut._store = {}, Object.defineProperty(ut._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ut, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: He
      }), Object.defineProperty(ut, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Dt
      }), Object.freeze && (Object.freeze(ut.props), Object.freeze(ut)), ut;
    };
    function it(D, ce, Oe, He, Dt) {
      {
        var It, Lt = {}, ut = null, Jn = null;
        Oe !== void 0 && (wn(Oe), ut = "" + Oe), B(ce) && (wn(ce.key), ut = "" + ce.key), A(ce) && (Jn = ce.ref, ae(ce, Dt));
        for (It in ce)
          tn.call(ce, It) && !Gn.hasOwnProperty(It) && (Lt[It] = ce[It]);
        if (D && D.defaultProps) {
          var Tn = D.defaultProps;
          for (It in Tn)
            Lt[It] === void 0 && (Lt[It] = Tn[It]);
        }
        if (ut || Jn) {
          var Rn = typeof D == "function" ? D.displayName || D.name || "Unknown" : D;
          ut && Ce(Lt, Rn), Jn && xt(Lt, Rn);
        }
        return Nt(D, ut, Jn, Dt, He, on.current, Lt);
      }
    }
    var se = tt.ReactCurrentOwner, Me = tt.ReactDebugCurrentFrame;
    function ye(D) {
      if (D) {
        var ce = D._owner, Oe = un(D.type, D._source, ce ? ce.type : null);
        Me.setExtraStackFrame(Oe);
      } else
        Me.setExtraStackFrame(null);
    }
    var ge;
    ge = !1;
    function gt(D) {
      return typeof D == "object" && D !== null && D.$$typeof === m;
    }
    function Ht() {
      {
        if (se.current) {
          var D = Ie(se.current.type);
          if (D)
            return `

Check the render method of \`` + D + "`.";
        }
        return "";
      }
    }
    function sn(D) {
      {
        if (D !== void 0) {
          var ce = D.fileName.replace(/^.*[\\\/]/, ""), Oe = D.lineNumber;
          return `

Check your code at ` + ce + ":" + Oe + ".";
        }
        return "";
      }
    }
    var ar = {};
    function Ai(D) {
      {
        var ce = Ht();
        if (!ce) {
          var Oe = typeof D == "string" ? D : D.displayName || D.name;
          Oe && (ce = `

Check the top-level render call using <` + Oe + ">.");
        }
        return ce;
      }
    }
    function Ja(D, ce) {
      {
        if (!D._store || D._store.validated || D.key != null)
          return;
        D._store.validated = !0;
        var Oe = Ai(ce);
        if (ar[Oe])
          return;
        ar[Oe] = !0;
        var He = "";
        D && D._owner && D._owner !== se.current && (He = " It was passed a child from " + Ie(D._owner.type) + "."), ye(D), Ae('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Oe, He), ye(null);
      }
    }
    function di(D, ce) {
      {
        if (typeof D != "object")
          return;
        if (gn(D))
          for (var Oe = 0; Oe < D.length; Oe++) {
            var He = D[Oe];
            gt(He) && Ja(He, ce);
          }
        else if (gt(D))
          D._store && (D._store.validated = !0);
        else if (D) {
          var Dt = me(D);
          if (typeof Dt == "function" && Dt !== D.entries)
            for (var It = Dt.call(D), Lt; !(Lt = It.next()).done; )
              gt(Lt.value) && Ja(Lt.value, ce);
        }
      }
    }
    function ga(D) {
      {
        var ce = D.type;
        if (ce == null || typeof ce == "string")
          return;
        var Oe;
        if (typeof ce == "function")
          Oe = ce.propTypes;
        else if (typeof ce == "object" && (ce.$$typeof === Y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        ce.$$typeof === K))
          Oe = ce.propTypes;
        else
          return;
        if (Oe) {
          var He = Ie(ce);
          vn(Oe, D.props, "prop", He, D);
        } else if (ce.PropTypes !== void 0 && !ge) {
          ge = !0;
          var Dt = Ie(ce);
          Ae("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Dt || "Unknown");
        }
        typeof ce.getDefaultProps == "function" && !ce.getDefaultProps.isReactClassApproved && Ae("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function pi(D) {
      {
        for (var ce = Object.keys(D.props), Oe = 0; Oe < ce.length; Oe++) {
          var He = ce[Oe];
          if (He !== "children" && He !== "key") {
            ye(D), Ae("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", He), ye(null);
            break;
          }
        }
        D.ref !== null && (ye(D), Ae("Invalid attribute `ref` supplied to `React.Fragment`."), ye(null));
      }
    }
    function Sa(D, ce, Oe, He, Dt, It) {
      {
        var Lt = mt(D);
        if (!Lt) {
          var ut = "";
          (D === void 0 || typeof D == "object" && D !== null && Object.keys(D).length === 0) && (ut += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Jn = sn(Dt);
          Jn ? ut += Jn : ut += Ht();
          var Tn;
          D === null ? Tn = "null" : gn(D) ? Tn = "array" : D !== void 0 && D.$$typeof === m ? (Tn = "<" + (Ie(D.type) || "Unknown") + " />", ut = " Did you accidentally export a JSX literal instead of a component?") : Tn = typeof D, Ae("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Tn, ut);
        }
        var Rn = it(D, ce, Oe, Dt, It);
        if (Rn == null)
          return Rn;
        if (Lt) {
          var Er = ce.children;
          if (Er !== void 0)
            if (He)
              if (gn(Er)) {
                for (var mi = 0; mi < Er.length; mi++)
                  di(Er[mi], D);
                Object.freeze && Object.freeze(Er);
              } else
                Ae("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              di(Er, D);
        }
        return D === C ? pi(Rn) : ga(Rn), Rn;
      }
    }
    function vi(D, ce, Oe) {
      return Sa(D, ce, Oe, !0);
    }
    function Hr(D, ce, Oe) {
      return Sa(D, ce, Oe, !1);
    }
    var Ea = Hr, hi = vi;
    nv.Fragment = C, nv.jsx = Ea, nv.jsxs = hi;
  }()), nv;
}
var rv = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pw;
function Gk() {
  if (Pw)
    return rv;
  Pw = 1;
  var v = Ju, m = Symbol.for("react.element"), p = Symbol.for("react.fragment"), C = Object.prototype.hasOwnProperty, w = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, N = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(te, Y, $) {
    var oe, K = {}, re = null, ue = null;
    $ !== void 0 && (re = "" + $), Y.key !== void 0 && (re = "" + Y.key), Y.ref !== void 0 && (ue = Y.ref);
    for (oe in Y)
      C.call(Y, oe) && !N.hasOwnProperty(oe) && (K[oe] = Y[oe]);
    if (te && te.defaultProps)
      for (oe in Y = te.defaultProps, Y)
        K[oe] === void 0 && (K[oe] = Y[oe]);
    return { $$typeof: m, type: te, key: re, ref: ue, props: K, _owner: w.current };
  }
  return rv.Fragment = p, rv.jsx = S, rv.jsxs = S, rv;
}
process.env.NODE_ENV === "production" ? AE.exports = Gk() : AE.exports = Qk();
var Fw = AE.exports, zE = { exports: {} };
(function(v, m) {
  (function(p, C) {
    C(m);
  })(tc, function(p) {
    function C(R, O) {
      R.super_ = O, R.prototype = Object.create(O.prototype, { constructor: { value: R, enumerable: !1, writable: !0, configurable: !0 } });
    }
    function w(R, O) {
      Object.defineProperty(this, "kind", { value: R, enumerable: !0 }), O && O.length && Object.defineProperty(this, "path", { value: O, enumerable: !0 });
    }
    function N(R, O, U) {
      N.super_.call(this, "E", R), Object.defineProperty(this, "lhs", { value: O, enumerable: !0 }), Object.defineProperty(this, "rhs", { value: U, enumerable: !0 });
    }
    function S(R, O) {
      S.super_.call(this, "N", R), Object.defineProperty(this, "rhs", { value: O, enumerable: !0 });
    }
    function te(R, O) {
      te.super_.call(this, "D", R), Object.defineProperty(this, "lhs", { value: O, enumerable: !0 });
    }
    function Y(R, O, U) {
      Y.super_.call(this, "A", R), Object.defineProperty(this, "index", { value: O, enumerable: !0 }), Object.defineProperty(this, "item", { value: U, enumerable: !0 });
    }
    function $(R, O, U) {
      var Z = R.slice((U || O) + 1 || R.length);
      return R.length = O < 0 ? R.length + O : O, R.push.apply(R, Z), R;
    }
    function oe(R) {
      var O = typeof R > "u" ? "undefined" : at(R);
      return O !== "object" ? O : R === Math ? "math" : R === null ? "null" : Array.isArray(R) ? "array" : Object.prototype.toString.call(R) === "[object Date]" ? "date" : typeof R.toString == "function" && /^\/.*\//.test(R.toString()) ? "regexp" : "object";
    }
    function K(R, O, U, Z, le, we, xe) {
      le = le || [], xe = xe || [];
      var Re = le.slice(0);
      if (typeof we < "u") {
        if (Z) {
          if (typeof Z == "function" && Z(Re, we))
            return;
          if ((typeof Z > "u" ? "undefined" : at(Z)) === "object") {
            if (Z.prefilter && Z.prefilter(Re, we))
              return;
            if (Z.normalize) {
              var vt = Z.normalize(Re, we, R, O);
              vt && (R = vt[0], O = vt[1]);
            }
          }
        }
        Re.push(we);
      }
      oe(R) === "regexp" && oe(O) === "regexp" && (R = R.toString(), O = O.toString());
      var zt = typeof R > "u" ? "undefined" : at(R), Kt = typeof O > "u" ? "undefined" : at(O), dt = zt !== "undefined" || xe && xe[xe.length - 1].lhs && xe[xe.length - 1].lhs.hasOwnProperty(we), _t = Kt !== "undefined" || xe && xe[xe.length - 1].rhs && xe[xe.length - 1].rhs.hasOwnProperty(we);
      if (!dt && _t)
        U(new S(Re, O));
      else if (!_t && dt)
        U(new te(Re, R));
      else if (oe(R) !== oe(O))
        U(new N(Re, R, O));
      else if (oe(R) === "date" && R - O !== 0)
        U(new N(Re, R, O));
      else if (zt === "object" && R !== null && O !== null)
        if (xe.filter(function(wt) {
          return wt.lhs === R;
        }).length)
          R !== O && U(new N(Re, R, O));
        else {
          if (xe.push({ lhs: R, rhs: O }), Array.isArray(R)) {
            var bt;
            for (R.length, bt = 0; bt < R.length; bt++)
              bt >= O.length ? U(new Y(Re, bt, new te(void 0, R[bt]))) : K(R[bt], O[bt], U, Z, Re, bt, xe);
            for (; bt < O.length; )
              U(new Y(Re, bt, new S(void 0, O[bt++])));
          } else {
            var un = Object.keys(R), tn = Object.keys(O);
            un.forEach(function(wt, Nn) {
              var zn = tn.indexOf(wt);
              zn >= 0 ? (K(R[wt], O[wt], U, Z, Re, wt, xe), tn = $(tn, zn)) : K(R[wt], void 0, U, Z, Re, wt, xe);
            }), tn.forEach(function(wt) {
              K(void 0, O[wt], U, Z, Re, wt, xe);
            });
          }
          xe.length = xe.length - 1;
        }
      else
        R !== O && (zt === "number" && isNaN(R) && isNaN(O) || U(new N(Re, R, O)));
    }
    function re(R, O, U, Z) {
      return Z = Z || [], K(R, O, function(le) {
        le && Z.push(le);
      }, U), Z.length ? Z : void 0;
    }
    function ue(R, O, U) {
      if (U.path && U.path.length) {
        var Z, le = R[O], we = U.path.length - 1;
        for (Z = 0; Z < we; Z++)
          le = le[U.path[Z]];
        switch (U.kind) {
          case "A":
            ue(le[U.path[Z]], U.index, U.item);
            break;
          case "D":
            delete le[U.path[Z]];
            break;
          case "E":
          case "N":
            le[U.path[Z]] = U.rhs;
        }
      } else
        switch (U.kind) {
          case "A":
            ue(R[O], U.index, U.item);
            break;
          case "D":
            R = $(R, O);
            break;
          case "E":
          case "N":
            R[O] = U.rhs;
        }
      return R;
    }
    function be(R, O, U) {
      if (R && O && U && U.kind) {
        for (var Z = R, le = -1, we = U.path ? U.path.length - 1 : 0; ++le < we; )
          typeof Z[U.path[le]] > "u" && (Z[U.path[le]] = typeof U.path[le] == "number" ? [] : {}), Z = Z[U.path[le]];
        switch (U.kind) {
          case "A":
            ue(U.path ? Z[U.path[le]] : Z, U.index, U.item);
            break;
          case "D":
            delete Z[U.path[le]];
            break;
          case "E":
          case "N":
            Z[U.path[le]] = U.rhs;
        }
      }
    }
    function Te(R, O, U) {
      if (U.path && U.path.length) {
        var Z, le = R[O], we = U.path.length - 1;
        for (Z = 0; Z < we; Z++)
          le = le[U.path[Z]];
        switch (U.kind) {
          case "A":
            Te(le[U.path[Z]], U.index, U.item);
            break;
          case "D":
            le[U.path[Z]] = U.lhs;
            break;
          case "E":
            le[U.path[Z]] = U.lhs;
            break;
          case "N":
            delete le[U.path[Z]];
        }
      } else
        switch (U.kind) {
          case "A":
            Te(R[O], U.index, U.item);
            break;
          case "D":
            R[O] = U.lhs;
            break;
          case "E":
            R[O] = U.lhs;
            break;
          case "N":
            R = $(R, O);
        }
      return R;
    }
    function me(R, O, U) {
      if (R && O && U && U.kind) {
        var Z, le, we = R;
        for (le = U.path.length - 1, Z = 0; Z < le; Z++)
          typeof we[U.path[Z]] > "u" && (we[U.path[Z]] = {}), we = we[U.path[Z]];
        switch (U.kind) {
          case "A":
            Te(we[U.path[Z]], U.index, U.item);
            break;
          case "D":
            we[U.path[Z]] = U.lhs;
            break;
          case "E":
            we[U.path[Z]] = U.lhs;
            break;
          case "N":
            delete we[U.path[Z]];
        }
      }
    }
    function tt(R, O, U) {
      if (R && O) {
        var Z = function(le) {
          U && !U(R, O, le) || be(R, O, le);
        };
        K(R, O, Z);
      }
    }
    function Ae(R) {
      return "color: " + pe[R].color + "; font-weight: bold";
    }
    function Ue(R) {
      var O = R.kind, U = R.path, Z = R.lhs, le = R.rhs, we = R.index, xe = R.item;
      switch (O) {
        case "E":
          return [U.join("."), Z, "→", le];
        case "N":
          return [U.join("."), le];
        case "D":
          return [U.join(".")];
        case "A":
          return [U.join(".") + "[" + we + "]", xe];
        default:
          return [];
      }
    }
    function Ze(R, O, U, Z) {
      var le = re(R, O);
      try {
        Z ? U.groupCollapsed("diff") : U.group("diff");
      } catch {
        U.log("diff");
      }
      le ? le.forEach(function(we) {
        var xe = we.kind, Re = Ue(we);
        U.log.apply(U, ["%c " + pe[xe].text, Ae(xe)].concat(Ct(Re)));
      }) : U.log("—— no diff ——");
      try {
        U.groupEnd();
      } catch {
        U.log("—— diff end —— ");
      }
    }
    function _e(R, O, U, Z) {
      switch (typeof R > "u" ? "undefined" : at(R)) {
        case "object":
          return typeof R[Z] == "function" ? R[Z].apply(R, Ct(U)) : R[Z];
        case "function":
          return R(O);
        default:
          return R;
      }
    }
    function Ke(R) {
      var O = R.timestamp, U = R.duration;
      return function(Z, le, we) {
        var xe = ["action"];
        return xe.push("%c" + String(Z.type)), O && xe.push("%c@ " + le), U && xe.push("%c(in " + we.toFixed(2) + " ms)"), xe.join(" ");
      };
    }
    function Fe(R, O) {
      var U = O.logger, Z = O.actionTransformer, le = O.titleFormatter, we = le === void 0 ? Ke(O) : le, xe = O.collapsed, Re = O.colors, vt = O.level, zt = O.diff, Kt = typeof O.titleFormatter > "u";
      R.forEach(function(dt, _t) {
        var bt = dt.started, un = dt.startedTime, tn = dt.action, wt = dt.prevState, Nn = dt.error, zn = dt.took, vn = dt.nextState, Ln = R[_t + 1];
        Ln && (vn = Ln.prevState, zn = Ln.started - bt);
        var gn = Z(tn), Wn = typeof xe == "function" ? xe(function() {
          return vn;
        }, tn, dt) : xe, Sr = Ie(un), Qn = Re.title ? "color: " + Re.title(gn) + ";" : "", wn = ["color: gray; font-weight: lighter;"];
        wn.push(Qn), O.timestamp && wn.push("color: gray; font-weight: lighter;"), O.duration && wn.push("color: gray; font-weight: lighter;");
        var on = we(gn, Sr, zn);
        try {
          Wn ? Re.title && Kt ? U.groupCollapsed.apply(U, ["%c " + on].concat(wn)) : U.groupCollapsed(on) : Re.title && Kt ? U.group.apply(U, ["%c " + on].concat(wn)) : U.group(on);
        } catch {
          U.log(on);
        }
        var Gn = _e(vt, gn, [wt], "prevState"), Nr = _e(vt, gn, [gn], "action"), qn = _e(vt, gn, [Nn, wt], "error"), _ = _e(vt, gn, [vn], "nextState");
        if (Gn)
          if (Re.prevState) {
            var A = "color: " + Re.prevState(wt) + "; font-weight: bold";
            U[Gn]("%c prev state", A, wt);
          } else
            U[Gn]("prev state", wt);
        if (Nr)
          if (Re.action) {
            var B = "color: " + Re.action(gn) + "; font-weight: bold";
            U[Nr]("%c action    ", B, gn);
          } else
            U[Nr]("action    ", gn);
        if (Nn && qn)
          if (Re.error) {
            var ae = "color: " + Re.error(Nn, wt) + "; font-weight: bold;";
            U[qn]("%c error     ", ae, Nn);
          } else
            U[qn]("error     ", Nn);
        if (_)
          if (Re.nextState) {
            var Ce = "color: " + Re.nextState(vn) + "; font-weight: bold";
            U[_]("%c next state", Ce, vn);
          } else
            U[_]("next state", vn);
        zt && Ze(wt, vn, U, Wn);
        try {
          U.groupEnd();
        } catch {
          U.log("—— log end ——");
        }
      });
    }
    function kt() {
      var R = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, O = Object.assign({}, $e, R), U = O.logger, Z = O.stateTransformer, le = O.errorTransformer, we = O.predicate, xe = O.logErrors, Re = O.diffPredicate;
      if (typeof U > "u")
        return function() {
          return function(zt) {
            return function(Kt) {
              return zt(Kt);
            };
          };
        };
      if (R.getState && R.dispatch)
        return console.error(`[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:
// Logger with default options
import { logger } from 'redux-logger'
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
// Or you can create your own logger with custom options http://bit.ly/redux-logger-options
import createLogger from 'redux-logger'
const logger = createLogger({
  // ...options
});
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
`), function() {
          return function(zt) {
            return function(Kt) {
              return zt(Kt);
            };
          };
        };
      var vt = [];
      return function(zt) {
        var Kt = zt.getState;
        return function(dt) {
          return function(_t) {
            if (typeof we == "function" && !we(Kt, _t))
              return dt(_t);
            var bt = {};
            vt.push(bt), bt.started = rt.now(), bt.startedTime = /* @__PURE__ */ new Date(), bt.prevState = Z(Kt()), bt.action = _t;
            var un = void 0;
            if (xe)
              try {
                un = dt(_t);
              } catch (wt) {
                bt.error = le(wt);
              }
            else
              un = dt(_t);
            bt.took = rt.now() - bt.started, bt.nextState = Z(Kt());
            var tn = O.diff && typeof Re == "function" ? Re(Kt, _t) : O.diff;
            if (Fe(vt, Object.assign({}, O, { diff: tn })), vt.length = 0, bt.error)
              throw bt.error;
            return un;
          };
        };
      };
    }
    var qt, mt, yt = function(R, O) {
      return new Array(O + 1).join(R);
    }, Mt = function(R, O) {
      return yt("0", O - R.toString().length) + R;
    }, Ie = function(R) {
      return Mt(R.getHours(), 2) + ":" + Mt(R.getMinutes(), 2) + ":" + Mt(R.getSeconds(), 2) + "." + Mt(R.getMilliseconds(), 3);
    }, rt = typeof performance < "u" && performance !== null && typeof performance.now == "function" ? performance : Date, at = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(R) {
      return typeof R;
    } : function(R) {
      return R && typeof Symbol == "function" && R.constructor === Symbol && R !== Symbol.prototype ? "symbol" : typeof R;
    }, Ct = function(R) {
      if (Array.isArray(R)) {
        for (var O = 0, U = Array(R.length); O < R.length; O++)
          U[O] = R[O];
        return U;
      }
      return Array.from(R);
    }, Ne = [];
    qt = (typeof tc > "u" ? "undefined" : at(tc)) === "object" && tc ? tc : typeof window < "u" ? window : {}, mt = qt.DeepDiff, mt && Ne.push(function() {
      typeof mt < "u" && qt.DeepDiff === re && (qt.DeepDiff = mt, mt = void 0);
    }), C(N, w), C(S, w), C(te, w), C(Y, w), Object.defineProperties(re, { diff: { value: re, enumerable: !0 }, observableDiff: { value: K, enumerable: !0 }, applyDiff: { value: tt, enumerable: !0 }, applyChange: { value: be, enumerable: !0 }, revertChange: { value: me, enumerable: !0 }, isConflict: { value: function() {
      return typeof mt < "u";
    }, enumerable: !0 }, noConflict: { value: function() {
      return Ne && (Ne.forEach(function(R) {
        R();
      }), Ne = null), re;
    }, enumerable: !0 } });
    var pe = { E: { color: "#2196F3", text: "CHANGED:" }, N: { color: "#4CAF50", text: "ADDED:" }, D: { color: "#F44336", text: "DELETED:" }, A: { color: "#2196F3", text: "ARRAY:" } }, $e = { level: "log", logger: console, logErrors: !0, collapsed: void 0, predicate: void 0, duration: !1, timestamp: !0, stateTransformer: function(R) {
      return R;
    }, actionTransformer: function(R) {
      return R;
    }, errorTransformer: function(R) {
      return R;
    }, colors: { title: function() {
      return "inherit";
    }, prevState: function() {
      return "#9E9E9E";
    }, action: function() {
      return "#03A9F4";
    }, nextState: function() {
      return "#4CAF50";
    }, error: function() {
      return "#F20404";
    } }, diff: !1, diffPredicate: void 0, transformer: void 0 }, M = function() {
      var R = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, O = R.dispatch, U = R.getState;
      return typeof O == "function" || typeof U == "function" ? kt()({ dispatch: O, getState: U }) : void console.error(`
[redux-logger v3] BREAKING CHANGE
[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.
[redux-logger v3] Change
[redux-logger v3] import createLogger from 'redux-logger'
[redux-logger v3] to
[redux-logger v3] import { createLogger } from 'redux-logger'
`);
    };
    p.defaults = $e, p.createLogger = kt, p.logger = M, p.default = M, Object.defineProperty(p, "__esModule", { value: !0 });
  });
})(zE, zE.exports);
var qk = zE.exports, jE = function(v, m) {
  return jE = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, C) {
    p.__proto__ = C;
  } || function(p, C) {
    for (var w in C)
      Object.prototype.hasOwnProperty.call(C, w) && (p[w] = C[w]);
  }, jE(v, m);
};
function eo(v, m) {
  if (typeof m != "function" && m !== null)
    throw new TypeError("Class extends value " + String(m) + " is not a constructor or null");
  jE(v, m);
  function p() {
    this.constructor = v;
  }
  v.prototype = m === null ? Object.create(m) : (p.prototype = m.prototype, new p());
}
function PE(v) {
  var m = typeof Symbol == "function" && Symbol.iterator, p = m && v[m], C = 0;
  if (p)
    return p.call(v);
  if (v && typeof v.length == "number")
    return {
      next: function() {
        return v && C >= v.length && (v = void 0), { value: v && v[C++], done: !v };
      }
    };
  throw new TypeError(m ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function If(v, m) {
  var p = typeof Symbol == "function" && v[Symbol.iterator];
  if (!p)
    return v;
  var C = p.call(v), w, N = [], S;
  try {
    for (; (m === void 0 || m-- > 0) && !(w = C.next()).done; )
      N.push(w.value);
  } catch (te) {
    S = { error: te };
  } finally {
    try {
      w && !w.done && (p = C.return) && p.call(C);
    } finally {
      if (S)
        throw S.error;
    }
  }
  return N;
}
function Yf(v, m, p) {
  if (p || arguments.length === 2)
    for (var C = 0, w = m.length, N; C < w; C++)
      (N || !(C in m)) && (N || (N = Array.prototype.slice.call(m, 0, C)), N[C] = m[C]);
  return v.concat(N || Array.prototype.slice.call(m));
}
function Zu(v) {
  return typeof v == "function";
}
function pT(v) {
  var m = function(C) {
    Error.call(C), C.stack = new Error().stack;
  }, p = v(m);
  return p.prototype = Object.create(Error.prototype), p.prototype.constructor = p, p;
}
var TE = pT(function(v) {
  return function(p) {
    v(this), this.message = p ? p.length + ` errors occurred during unsubscription:
` + p.map(function(C, w) {
      return w + 1 + ") " + C.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = p;
  };
});
function Qm(v, m) {
  if (v) {
    var p = v.indexOf(m);
    0 <= p && v.splice(p, 1);
  }
}
var Wf = function() {
  function v(m) {
    this.initialTeardown = m, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return v.prototype.unsubscribe = function() {
    var m, p, C, w, N;
    if (!this.closed) {
      this.closed = !0;
      var S = this._parentage;
      if (S)
        if (this._parentage = null, Array.isArray(S))
          try {
            for (var te = PE(S), Y = te.next(); !Y.done; Y = te.next()) {
              var $ = Y.value;
              $.remove(this);
            }
          } catch (Te) {
            m = { error: Te };
          } finally {
            try {
              Y && !Y.done && (p = te.return) && p.call(te);
            } finally {
              if (m)
                throw m.error;
            }
          }
        else
          S.remove(this);
      var oe = this.initialTeardown;
      if (Zu(oe))
        try {
          oe();
        } catch (Te) {
          N = Te instanceof TE ? Te.errors : [Te];
        }
      var K = this._finalizers;
      if (K) {
        this._finalizers = null;
        try {
          for (var re = PE(K), ue = re.next(); !ue.done; ue = re.next()) {
            var be = ue.value;
            try {
              Hw(be);
            } catch (Te) {
              N = N ?? [], Te instanceof TE ? N = Yf(Yf([], If(N)), If(Te.errors)) : N.push(Te);
            }
          }
        } catch (Te) {
          C = { error: Te };
        } finally {
          try {
            ue && !ue.done && (w = re.return) && w.call(re);
          } finally {
            if (C)
              throw C.error;
          }
        }
      }
      if (N)
        throw new TE(N);
    }
  }, v.prototype.add = function(m) {
    var p;
    if (m && m !== this)
      if (this.closed)
        Hw(m);
      else {
        if (m instanceof v) {
          if (m.closed || m._hasParent(this))
            return;
          m._addParent(this);
        }
        (this._finalizers = (p = this._finalizers) !== null && p !== void 0 ? p : []).push(m);
      }
  }, v.prototype._hasParent = function(m) {
    var p = this._parentage;
    return p === m || Array.isArray(p) && p.includes(m);
  }, v.prototype._addParent = function(m) {
    var p = this._parentage;
    this._parentage = Array.isArray(p) ? (p.push(m), p) : p ? [p, m] : m;
  }, v.prototype._removeParent = function(m) {
    var p = this._parentage;
    p === m ? this._parentage = null : Array.isArray(p) && Qm(p, m);
  }, v.prototype.remove = function(m) {
    var p = this._finalizers;
    p && Qm(p, m), m instanceof v && m._removeParent(this);
  }, v.EMPTY = function() {
    var m = new v();
    return m.closed = !0, m;
  }(), v;
}(), vT = Wf.EMPTY;
function hT(v) {
  return v instanceof Wf || v && "closed" in v && Zu(v.remove) && Zu(v.add) && Zu(v.unsubscribe);
}
function Hw(v) {
  Zu(v) ? v() : v.unsubscribe();
}
var mT = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, FE = {
  setTimeout: function(v, m) {
    for (var p = [], C = 2; C < arguments.length; C++)
      p[C - 2] = arguments[C];
    var w = FE.delegate;
    return w != null && w.setTimeout ? w.setTimeout.apply(w, Yf([v, m], If(p))) : setTimeout.apply(void 0, Yf([v, m], If(p)));
  },
  clearTimeout: function(v) {
    var m = FE.delegate;
    return ((m == null ? void 0 : m.clearTimeout) || clearTimeout)(v);
  },
  delegate: void 0
};
function Kk(v) {
  FE.setTimeout(function() {
    throw v;
  });
}
function Vw() {
}
function Wm(v) {
  v();
}
var YE = function(v) {
  eo(m, v);
  function m(p) {
    var C = v.call(this) || this;
    return C.isStopped = !1, p ? (C.destination = p, hT(p) && p.add(C)) : C.destination = eD, C;
  }
  return m.create = function(p, C, w) {
    return new HE(p, C, w);
  }, m.prototype.next = function(p) {
    this.isStopped || this._next(p);
  }, m.prototype.error = function(p) {
    this.isStopped || (this.isStopped = !0, this._error(p));
  }, m.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, m.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, v.prototype.unsubscribe.call(this), this.destination = null);
  }, m.prototype._next = function(p) {
    this.destination.next(p);
  }, m.prototype._error = function(p) {
    try {
      this.destination.error(p);
    } finally {
      this.unsubscribe();
    }
  }, m.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, m;
}(Wf), Xk = Function.prototype.bind;
function RE(v, m) {
  return Xk.call(v, m);
}
var Zk = function() {
  function v(m) {
    this.partialObserver = m;
  }
  return v.prototype.next = function(m) {
    var p = this.partialObserver;
    if (p.next)
      try {
        p.next(m);
      } catch (C) {
        Im(C);
      }
  }, v.prototype.error = function(m) {
    var p = this.partialObserver;
    if (p.error)
      try {
        p.error(m);
      } catch (C) {
        Im(C);
      }
    else
      Im(m);
  }, v.prototype.complete = function() {
    var m = this.partialObserver;
    if (m.complete)
      try {
        m.complete();
      } catch (p) {
        Im(p);
      }
  }, v;
}(), HE = function(v) {
  eo(m, v);
  function m(p, C, w) {
    var N = v.call(this) || this, S;
    if (Zu(p) || !p)
      S = {
        next: p ?? void 0,
        error: C ?? void 0,
        complete: w ?? void 0
      };
    else {
      var te;
      N && mT.useDeprecatedNextContext ? (te = Object.create(p), te.unsubscribe = function() {
        return N.unsubscribe();
      }, S = {
        next: p.next && RE(p.next, te),
        error: p.error && RE(p.error, te),
        complete: p.complete && RE(p.complete, te)
      }) : S = p;
    }
    return N.destination = new Zk(S), N;
  }
  return m;
}(YE);
function Im(v) {
  Kk(v);
}
function Jk(v) {
  throw v;
}
var eD = {
  closed: !0,
  next: Vw,
  error: Jk,
  complete: Vw
}, tD = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function nD(v) {
  return v;
}
function rD(v) {
  return v.length === 0 ? nD : v.length === 1 ? v[0] : function(p) {
    return v.reduce(function(C, w) {
      return w(C);
    }, p);
  };
}
var Gm = function() {
  function v(m) {
    m && (this._subscribe = m);
  }
  return v.prototype.lift = function(m) {
    var p = new v();
    return p.source = this, p.operator = m, p;
  }, v.prototype.subscribe = function(m, p, C) {
    var w = this, N = iD(m) ? m : new HE(m, p, C);
    return Wm(function() {
      var S = w, te = S.operator, Y = S.source;
      N.add(te ? te.call(N, Y) : Y ? w._subscribe(N) : w._trySubscribe(N));
    }), N;
  }, v.prototype._trySubscribe = function(m) {
    try {
      return this._subscribe(m);
    } catch (p) {
      m.error(p);
    }
  }, v.prototype.forEach = function(m, p) {
    var C = this;
    return p = Bw(p), new p(function(w, N) {
      var S = new HE({
        next: function(te) {
          try {
            m(te);
          } catch (Y) {
            N(Y), S.unsubscribe();
          }
        },
        error: N,
        complete: w
      });
      C.subscribe(S);
    });
  }, v.prototype._subscribe = function(m) {
    var p;
    return (p = this.source) === null || p === void 0 ? void 0 : p.subscribe(m);
  }, v.prototype[tD] = function() {
    return this;
  }, v.prototype.pipe = function() {
    for (var m = [], p = 0; p < arguments.length; p++)
      m[p] = arguments[p];
    return rD(m)(this);
  }, v.prototype.toPromise = function(m) {
    var p = this;
    return m = Bw(m), new m(function(C, w) {
      var N;
      p.subscribe(function(S) {
        return N = S;
      }, function(S) {
        return w(S);
      }, function() {
        return C(N);
      });
    });
  }, v.create = function(m) {
    return new v(m);
  }, v;
}();
function Bw(v) {
  var m;
  return (m = v ?? mT.Promise) !== null && m !== void 0 ? m : Promise;
}
function aD(v) {
  return v && Zu(v.next) && Zu(v.error) && Zu(v.complete);
}
function iD(v) {
  return v && v instanceof YE || aD(v) && hT(v);
}
function uD(v) {
  return Zu(v == null ? void 0 : v.lift);
}
function oD(v) {
  return function(m) {
    if (uD(m))
      return m.lift(function(p) {
        try {
          return v(p, this);
        } catch (C) {
          this.error(C);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function lD(v, m, p, C, w) {
  return new sD(v, m, p, C, w);
}
var sD = function(v) {
  eo(m, v);
  function m(p, C, w, N, S, te) {
    var Y = v.call(this, p) || this;
    return Y.onFinalize = S, Y.shouldUnsubscribe = te, Y._next = C ? function($) {
      try {
        C($);
      } catch (oe) {
        p.error(oe);
      }
    } : v.prototype._next, Y._error = N ? function($) {
      try {
        N($);
      } catch (oe) {
        p.error(oe);
      } finally {
        this.unsubscribe();
      }
    } : v.prototype._error, Y._complete = w ? function() {
      try {
        w();
      } catch ($) {
        p.error($);
      } finally {
        this.unsubscribe();
      }
    } : v.prototype._complete, Y;
  }
  return m.prototype.unsubscribe = function() {
    var p;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var C = this.closed;
      v.prototype.unsubscribe.call(this), !C && ((p = this.onFinalize) === null || p === void 0 || p.call(this));
    }
  }, m;
}(YE), cD = pT(function(v) {
  return function() {
    v(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), yT = function(v) {
  eo(m, v);
  function m() {
    var p = v.call(this) || this;
    return p.closed = !1, p.currentObservers = null, p.observers = [], p.isStopped = !1, p.hasError = !1, p.thrownError = null, p;
  }
  return m.prototype.lift = function(p) {
    var C = new $w(this, this);
    return C.operator = p, C;
  }, m.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new cD();
  }, m.prototype.next = function(p) {
    var C = this;
    Wm(function() {
      var w, N;
      if (C._throwIfClosed(), !C.isStopped) {
        C.currentObservers || (C.currentObservers = Array.from(C.observers));
        try {
          for (var S = PE(C.currentObservers), te = S.next(); !te.done; te = S.next()) {
            var Y = te.value;
            Y.next(p);
          }
        } catch ($) {
          w = { error: $ };
        } finally {
          try {
            te && !te.done && (N = S.return) && N.call(S);
          } finally {
            if (w)
              throw w.error;
          }
        }
      }
    });
  }, m.prototype.error = function(p) {
    var C = this;
    Wm(function() {
      if (C._throwIfClosed(), !C.isStopped) {
        C.hasError = C.isStopped = !0, C.thrownError = p;
        for (var w = C.observers; w.length; )
          w.shift().error(p);
      }
    });
  }, m.prototype.complete = function() {
    var p = this;
    Wm(function() {
      if (p._throwIfClosed(), !p.isStopped) {
        p.isStopped = !0;
        for (var C = p.observers; C.length; )
          C.shift().complete();
      }
    });
  }, m.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(m.prototype, "observed", {
    get: function() {
      var p;
      return ((p = this.observers) === null || p === void 0 ? void 0 : p.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), m.prototype._trySubscribe = function(p) {
    return this._throwIfClosed(), v.prototype._trySubscribe.call(this, p);
  }, m.prototype._subscribe = function(p) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(p), this._innerSubscribe(p);
  }, m.prototype._innerSubscribe = function(p) {
    var C = this, w = this, N = w.hasError, S = w.isStopped, te = w.observers;
    return N || S ? vT : (this.currentObservers = null, te.push(p), new Wf(function() {
      C.currentObservers = null, Qm(te, p);
    }));
  }, m.prototype._checkFinalizedStatuses = function(p) {
    var C = this, w = C.hasError, N = C.thrownError, S = C.isStopped;
    w ? p.error(N) : S && p.complete();
  }, m.prototype.asObservable = function() {
    var p = new Gm();
    return p.source = this, p;
  }, m.create = function(p, C) {
    return new $w(p, C);
  }, m;
}(Gm), $w = function(v) {
  eo(m, v);
  function m(p, C) {
    var w = v.call(this) || this;
    return w.destination = p, w.source = C, w;
  }
  return m.prototype.next = function(p) {
    var C, w;
    (w = (C = this.destination) === null || C === void 0 ? void 0 : C.next) === null || w === void 0 || w.call(C, p);
  }, m.prototype.error = function(p) {
    var C, w;
    (w = (C = this.destination) === null || C === void 0 ? void 0 : C.error) === null || w === void 0 || w.call(C, p);
  }, m.prototype.complete = function() {
    var p, C;
    (C = (p = this.destination) === null || p === void 0 ? void 0 : p.complete) === null || C === void 0 || C.call(p);
  }, m.prototype._subscribe = function(p) {
    var C, w;
    return (w = (C = this.source) === null || C === void 0 ? void 0 : C.subscribe(p)) !== null && w !== void 0 ? w : vT;
  }, m;
}(yT), gT = {
  now: function() {
    return (gT.delegate || Date).now();
  },
  delegate: void 0
}, fD = function(v) {
  eo(m, v);
  function m(p, C) {
    return v.call(this) || this;
  }
  return m.prototype.schedule = function(p, C) {
    return this;
  }, m;
}(Wf), qm = {
  setInterval: function(v, m) {
    for (var p = [], C = 2; C < arguments.length; C++)
      p[C - 2] = arguments[C];
    var w = qm.delegate;
    return w != null && w.setInterval ? w.setInterval.apply(w, Yf([v, m], If(p))) : setInterval.apply(void 0, Yf([v, m], If(p)));
  },
  clearInterval: function(v) {
    var m = qm.delegate;
    return ((m == null ? void 0 : m.clearInterval) || clearInterval)(v);
  },
  delegate: void 0
}, dD = function(v) {
  eo(m, v);
  function m(p, C) {
    var w = v.call(this, p, C) || this;
    return w.scheduler = p, w.work = C, w.pending = !1, w;
  }
  return m.prototype.schedule = function(p, C) {
    var w;
    if (C === void 0 && (C = 0), this.closed)
      return this;
    this.state = p;
    var N = this.id, S = this.scheduler;
    return N != null && (this.id = this.recycleAsyncId(S, N, C)), this.pending = !0, this.delay = C, this.id = (w = this.id) !== null && w !== void 0 ? w : this.requestAsyncId(S, this.id, C), this;
  }, m.prototype.requestAsyncId = function(p, C, w) {
    return w === void 0 && (w = 0), qm.setInterval(p.flush.bind(p, this), w);
  }, m.prototype.recycleAsyncId = function(p, C, w) {
    if (w === void 0 && (w = 0), w != null && this.delay === w && this.pending === !1)
      return C;
    C != null && qm.clearInterval(C);
  }, m.prototype.execute = function(p, C) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var w = this._execute(p, C);
    if (w)
      return w;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, m.prototype._execute = function(p, C) {
    var w = !1, N;
    try {
      this.work(p);
    } catch (S) {
      w = !0, N = S || new Error("Scheduled action threw falsy error");
    }
    if (w)
      return this.unsubscribe(), N;
  }, m.prototype.unsubscribe = function() {
    if (!this.closed) {
      var p = this, C = p.id, w = p.scheduler, N = w.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, Qm(N, this), C != null && (this.id = this.recycleAsyncId(w, C, null)), this.delay = null, v.prototype.unsubscribe.call(this);
    }
  }, m;
}(fD), Iw = function() {
  function v(m, p) {
    p === void 0 && (p = v.now), this.schedulerActionCtor = m, this.now = p;
  }
  return v.prototype.schedule = function(m, p, C) {
    return p === void 0 && (p = 0), new this.schedulerActionCtor(this, m).schedule(C, p);
  }, v.now = gT.now, v;
}(), pD = function(v) {
  eo(m, v);
  function m(p, C) {
    C === void 0 && (C = Iw.now);
    var w = v.call(this, p, C) || this;
    return w.actions = [], w._active = !1, w;
  }
  return m.prototype.flush = function(p) {
    var C = this.actions;
    if (this._active) {
      C.push(p);
      return;
    }
    var w;
    this._active = !0;
    do
      if (w = p.execute(p.state, p.delay))
        break;
    while (p = C.shift());
    if (this._active = !1, w) {
      for (; p = C.shift(); )
        p.unsubscribe();
      throw w;
    }
  }, m;
}(Iw), vD = function(v) {
  eo(m, v);
  function m(p, C) {
    var w = v.call(this, p, C) || this;
    return w.scheduler = p, w.work = C, w;
  }
  return m.prototype.schedule = function(p, C) {
    return C === void 0 && (C = 0), C > 0 ? v.prototype.schedule.call(this, p, C) : (this.delay = C, this.state = p, this.scheduler.flush(this), this);
  }, m.prototype.execute = function(p, C) {
    return C > 0 || this.closed ? v.prototype.execute.call(this, p, C) : this._execute(p, C);
  }, m.prototype.requestAsyncId = function(p, C, w) {
    return w === void 0 && (w = 0), w != null && w > 0 || w == null && this.delay > 0 ? v.prototype.requestAsyncId.call(this, p, C, w) : (p.flush(this), 0);
  }, m;
}(dD), hD = function(v) {
  eo(m, v);
  function m() {
    return v !== null && v.apply(this, arguments) || this;
  }
  return m;
}(pD), mD = new hD(vD);
function _E(v, m, p, C, w) {
  C === void 0 && (C = 0), w === void 0 && (w = !1);
  var N = m.schedule(function() {
    p(), w ? v.add(this.schedule(null, C)) : this.unsubscribe();
  }, C);
  if (v.add(N), !w)
    return N;
}
function yD(v, m) {
  return m === void 0 && (m = 0), oD(function(p, C) {
    p.subscribe(lD(C, function(w) {
      return _E(C, v, function() {
        return C.next(w);
      }, m);
    }, function() {
      return _E(C, v, function() {
        return C.complete();
      }, m);
    }, function(w) {
      return _E(C, v, function() {
        return C.error(w);
      }, m);
    }));
  });
}
function gD() {
  const v = new yT(), m = v.asObservable().pipe(yD(mD));
  let p;
  const C = (w) => (w.getState, (N) => (S) => {
    N(S), v.next(S);
  });
  return C.run = (w) => {
    p || p != null && p.closed || (p = w(m));
  }, C.close = () => {
    !p || !(p != null && p.unsubscribe) || p.unsubscribe();
  }, C;
}
function ST(...v) {
  const m = (p) => {
    const C = new Wf();
    for (let w = 0; w < v.length; w++)
      C.add(v[w](p));
    return C;
  };
  try {
    Object.defineProperty(ST, "name", {
      value: `combineStreamers(${v.map((p) => p.name || "<anonymous>").join(", ")})`
    });
  } catch {
  }
  return m;
}
var xE = {};
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yw;
function SD() {
  return Yw || (Yw = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var v = Ju;
    function m($, oe) {
      return $ === oe && ($ !== 0 || 1 / $ === 1 / oe) || $ !== $ && oe !== oe;
    }
    var p = typeof Object.is == "function" ? Object.is : m, C = v.useSyncExternalStore, w = v.useRef, N = v.useEffect, S = v.useMemo, te = v.useDebugValue;
    function Y($, oe, K, re, ue) {
      var be = w(null), Te;
      be.current === null ? (Te = {
        hasValue: !1,
        value: null
      }, be.current = Te) : Te = be.current;
      var me = S(function() {
        var Ze = !1, _e, Ke, Fe = function(yt) {
          if (!Ze) {
            Ze = !0, _e = yt;
            var Mt = re(yt);
            if (ue !== void 0 && Te.hasValue) {
              var Ie = Te.value;
              if (ue(Ie, Mt))
                return Ke = Ie, Ie;
            }
            return Ke = Mt, Mt;
          }
          var rt = _e, at = Ke;
          if (p(rt, yt))
            return at;
          var Ct = re(yt);
          return ue !== void 0 && ue(at, Ct) ? at : (_e = yt, Ke = Ct, Ct);
        }, kt = K === void 0 ? null : K, qt = function() {
          return Fe(oe());
        }, mt = kt === null ? void 0 : function() {
          return Fe(kt());
        };
        return [qt, mt];
      }, [oe, K, re, ue]), tt = me[0], Ae = me[1], Ue = C($, tt, Ae);
      return N(function() {
        Te.hasValue = !0, Te.value = Ue;
      }, [Ue]), te(Ue), Ue;
    }
    xE.useSyncExternalStoreWithSelector = Y, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), xE;
}
var OE = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ww;
function ED() {
  if (Ww)
    return OE;
  Ww = 1;
  var v = Ju;
  function m(Y, $) {
    return Y === $ && (Y !== 0 || 1 / Y === 1 / $) || Y !== Y && $ !== $;
  }
  var p = typeof Object.is == "function" ? Object.is : m, C = v.useSyncExternalStore, w = v.useRef, N = v.useEffect, S = v.useMemo, te = v.useDebugValue;
  return OE.useSyncExternalStoreWithSelector = function(Y, $, oe, K, re) {
    var ue = w(null);
    if (ue.current === null) {
      var be = { hasValue: !1, value: null };
      ue.current = be;
    } else
      be = ue.current;
    ue = S(function() {
      function me(_e) {
        if (!tt) {
          if (tt = !0, Ae = _e, _e = K(_e), re !== void 0 && be.hasValue) {
            var Ke = be.value;
            if (re(Ke, _e))
              return Ue = Ke;
          }
          return Ue = _e;
        }
        if (Ke = Ue, p(Ae, _e))
          return Ke;
        var Fe = K(_e);
        return re !== void 0 && re(Ke, Fe) ? Ke : (Ae = _e, Ue = Fe);
      }
      var tt = !1, Ae, Ue, Ze = oe === void 0 ? null : oe;
      return [function() {
        return me($());
      }, Ze === null ? void 0 : function() {
        return me(Ze());
      }];
    }, [$, oe, K, re]);
    var Te = C(Y, ue[0], ue[1]);
    return N(function() {
      be.hasValue = !0, be.value = Te;
    }, [Te]), te(Te), Te;
  }, OE;
}
process.env.NODE_ENV === "production" ? ED() : SD();
var VE = { exports: {} }, Xa = {}, Ym = { exports: {} }, kE = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qw;
function CD() {
  return Qw || (Qw = 1, function(v) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var m = !1, p = !1, C = 5;
      function w(_, A) {
        var B = _.length;
        _.push(A), te(_, A, B);
      }
      function N(_) {
        return _.length === 0 ? null : _[0];
      }
      function S(_) {
        if (_.length === 0)
          return null;
        var A = _[0], B = _.pop();
        return B !== A && (_[0] = B, Y(_, B, 0)), A;
      }
      function te(_, A, B) {
        for (var ae = B; ae > 0; ) {
          var Ce = ae - 1 >>> 1, xt = _[Ce];
          if ($(xt, A) > 0)
            _[Ce] = A, _[ae] = xt, ae = Ce;
          else
            return;
        }
      }
      function Y(_, A, B) {
        for (var ae = B, Ce = _.length, xt = Ce >>> 1; ae < xt; ) {
          var Nt = (ae + 1) * 2 - 1, it = _[Nt], se = Nt + 1, Me = _[se];
          if ($(it, A) < 0)
            se < Ce && $(Me, it) < 0 ? (_[ae] = Me, _[se] = A, ae = se) : (_[ae] = it, _[Nt] = A, ae = Nt);
          else if (se < Ce && $(Me, A) < 0)
            _[ae] = Me, _[se] = A, ae = se;
          else
            return;
        }
      }
      function $(_, A) {
        var B = _.sortIndex - A.sortIndex;
        return B !== 0 ? B : _.id - A.id;
      }
      var oe = 1, K = 2, re = 3, ue = 4, be = 5;
      function Te(_, A) {
      }
      var me = typeof performance == "object" && typeof performance.now == "function";
      if (me) {
        var tt = performance;
        v.unstable_now = function() {
          return tt.now();
        };
      } else {
        var Ae = Date, Ue = Ae.now();
        v.unstable_now = function() {
          return Ae.now() - Ue;
        };
      }
      var Ze = 1073741823, _e = -1, Ke = 250, Fe = 5e3, kt = 1e4, qt = Ze, mt = [], yt = [], Mt = 1, Ie = null, rt = re, at = !1, Ct = !1, Ne = !1, pe = typeof setTimeout == "function" ? setTimeout : null, $e = typeof clearTimeout == "function" ? clearTimeout : null, M = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function R(_) {
        for (var A = N(yt); A !== null; ) {
          if (A.callback === null)
            S(yt);
          else if (A.startTime <= _)
            S(yt), A.sortIndex = A.expirationTime, w(mt, A);
          else
            return;
          A = N(yt);
        }
      }
      function O(_) {
        if (Ne = !1, R(_), !Ct)
          if (N(mt) !== null)
            Ct = !0, wn(U);
          else {
            var A = N(yt);
            A !== null && on(O, A.startTime - _);
          }
      }
      function U(_, A) {
        Ct = !1, Ne && (Ne = !1, Gn()), at = !0;
        var B = rt;
        try {
          var ae;
          if (!p)
            return Z(_, A);
        } finally {
          Ie = null, rt = B, at = !1;
        }
      }
      function Z(_, A) {
        var B = A;
        for (R(B), Ie = N(mt); Ie !== null && !m && !(Ie.expirationTime > B && (!_ || zn())); ) {
          var ae = Ie.callback;
          if (typeof ae == "function") {
            Ie.callback = null, rt = Ie.priorityLevel;
            var Ce = Ie.expirationTime <= B, xt = ae(Ce);
            B = v.unstable_now(), typeof xt == "function" ? Ie.callback = xt : Ie === N(mt) && S(mt), R(B);
          } else
            S(mt);
          Ie = N(mt);
        }
        if (Ie !== null)
          return !0;
        var Nt = N(yt);
        return Nt !== null && on(O, Nt.startTime - B), !1;
      }
      function le(_, A) {
        switch (_) {
          case oe:
          case K:
          case re:
          case ue:
          case be:
            break;
          default:
            _ = re;
        }
        var B = rt;
        rt = _;
        try {
          return A();
        } finally {
          rt = B;
        }
      }
      function we(_) {
        var A;
        switch (rt) {
          case oe:
          case K:
          case re:
            A = re;
            break;
          default:
            A = rt;
            break;
        }
        var B = rt;
        rt = A;
        try {
          return _();
        } finally {
          rt = B;
        }
      }
      function xe(_) {
        var A = rt;
        return function() {
          var B = rt;
          rt = A;
          try {
            return _.apply(this, arguments);
          } finally {
            rt = B;
          }
        };
      }
      function Re(_, A, B) {
        var ae = v.unstable_now(), Ce;
        if (typeof B == "object" && B !== null) {
          var xt = B.delay;
          typeof xt == "number" && xt > 0 ? Ce = ae + xt : Ce = ae;
        } else
          Ce = ae;
        var Nt;
        switch (_) {
          case oe:
            Nt = _e;
            break;
          case K:
            Nt = Ke;
            break;
          case be:
            Nt = qt;
            break;
          case ue:
            Nt = kt;
            break;
          case re:
          default:
            Nt = Fe;
            break;
        }
        var it = Ce + Nt, se = {
          id: Mt++,
          callback: A,
          priorityLevel: _,
          startTime: Ce,
          expirationTime: it,
          sortIndex: -1
        };
        return Ce > ae ? (se.sortIndex = Ce, w(yt, se), N(mt) === null && se === N(yt) && (Ne ? Gn() : Ne = !0, on(O, Ce - ae))) : (se.sortIndex = it, w(mt, se), !Ct && !at && (Ct = !0, wn(U))), se;
      }
      function vt() {
      }
      function zt() {
        !Ct && !at && (Ct = !0, wn(U));
      }
      function Kt() {
        return N(mt);
      }
      function dt(_) {
        _.callback = null;
      }
      function _t() {
        return rt;
      }
      var bt = !1, un = null, tn = -1, wt = C, Nn = -1;
      function zn() {
        var _ = v.unstable_now() - Nn;
        return !(_ < wt);
      }
      function vn() {
      }
      function Ln(_) {
        if (_ < 0 || _ > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        _ > 0 ? wt = Math.floor(1e3 / _) : wt = C;
      }
      var gn = function() {
        if (un !== null) {
          var _ = v.unstable_now();
          Nn = _;
          var A = !0, B = !0;
          try {
            B = un(A, _);
          } finally {
            B ? Wn() : (bt = !1, un = null);
          }
        } else
          bt = !1;
      }, Wn;
      if (typeof M == "function")
        Wn = function() {
          M(gn);
        };
      else if (typeof MessageChannel < "u") {
        var Sr = new MessageChannel(), Qn = Sr.port2;
        Sr.port1.onmessage = gn, Wn = function() {
          Qn.postMessage(null);
        };
      } else
        Wn = function() {
          pe(gn, 0);
        };
      function wn(_) {
        un = _, bt || (bt = !0, Wn());
      }
      function on(_, A) {
        tn = pe(function() {
          _(v.unstable_now());
        }, A);
      }
      function Gn() {
        $e(tn), tn = -1;
      }
      var Nr = vn, qn = null;
      v.unstable_IdlePriority = be, v.unstable_ImmediatePriority = oe, v.unstable_LowPriority = ue, v.unstable_NormalPriority = re, v.unstable_Profiling = qn, v.unstable_UserBlockingPriority = K, v.unstable_cancelCallback = dt, v.unstable_continueExecution = zt, v.unstable_forceFrameRate = Ln, v.unstable_getCurrentPriorityLevel = _t, v.unstable_getFirstCallbackNode = Kt, v.unstable_next = we, v.unstable_pauseExecution = vt, v.unstable_requestPaint = Nr, v.unstable_runWithPriority = le, v.unstable_scheduleCallback = Re, v.unstable_shouldYield = zn, v.unstable_wrapCallback = xe, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(kE)), kE;
}
var DE = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gw;
function bD() {
  return Gw || (Gw = 1, function(v) {
    function m(pe, $e) {
      var M = pe.length;
      pe.push($e);
      e:
        for (; 0 < M; ) {
          var R = M - 1 >>> 1, O = pe[R];
          if (0 < w(O, $e))
            pe[R] = $e, pe[M] = O, M = R;
          else
            break e;
        }
    }
    function p(pe) {
      return pe.length === 0 ? null : pe[0];
    }
    function C(pe) {
      if (pe.length === 0)
        return null;
      var $e = pe[0], M = pe.pop();
      if (M !== $e) {
        pe[0] = M;
        e:
          for (var R = 0, O = pe.length, U = O >>> 1; R < U; ) {
            var Z = 2 * (R + 1) - 1, le = pe[Z], we = Z + 1, xe = pe[we];
            if (0 > w(le, M))
              we < O && 0 > w(xe, le) ? (pe[R] = xe, pe[we] = M, R = we) : (pe[R] = le, pe[Z] = M, R = Z);
            else if (we < O && 0 > w(xe, M))
              pe[R] = xe, pe[we] = M, R = we;
            else
              break e;
          }
      }
      return $e;
    }
    function w(pe, $e) {
      var M = pe.sortIndex - $e.sortIndex;
      return M !== 0 ? M : pe.id - $e.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var N = performance;
      v.unstable_now = function() {
        return N.now();
      };
    } else {
      var S = Date, te = S.now();
      v.unstable_now = function() {
        return S.now() - te;
      };
    }
    var Y = [], $ = [], oe = 1, K = null, re = 3, ue = !1, be = !1, Te = !1, me = typeof setTimeout == "function" ? setTimeout : null, tt = typeof clearTimeout == "function" ? clearTimeout : null, Ae = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Ue(pe) {
      for (var $e = p($); $e !== null; ) {
        if ($e.callback === null)
          C($);
        else if ($e.startTime <= pe)
          C($), $e.sortIndex = $e.expirationTime, m(Y, $e);
        else
          break;
        $e = p($);
      }
    }
    function Ze(pe) {
      if (Te = !1, Ue(pe), !be)
        if (p(Y) !== null)
          be = !0, Ct(_e);
        else {
          var $e = p($);
          $e !== null && Ne(Ze, $e.startTime - pe);
        }
    }
    function _e(pe, $e) {
      be = !1, Te && (Te = !1, tt(kt), kt = -1), ue = !0;
      var M = re;
      try {
        for (Ue($e), K = p(Y); K !== null && (!(K.expirationTime > $e) || pe && !yt()); ) {
          var R = K.callback;
          if (typeof R == "function") {
            K.callback = null, re = K.priorityLevel;
            var O = R(K.expirationTime <= $e);
            $e = v.unstable_now(), typeof O == "function" ? K.callback = O : K === p(Y) && C(Y), Ue($e);
          } else
            C(Y);
          K = p(Y);
        }
        if (K !== null)
          var U = !0;
        else {
          var Z = p($);
          Z !== null && Ne(Ze, Z.startTime - $e), U = !1;
        }
        return U;
      } finally {
        K = null, re = M, ue = !1;
      }
    }
    var Ke = !1, Fe = null, kt = -1, qt = 5, mt = -1;
    function yt() {
      return !(v.unstable_now() - mt < qt);
    }
    function Mt() {
      if (Fe !== null) {
        var pe = v.unstable_now();
        mt = pe;
        var $e = !0;
        try {
          $e = Fe(!0, pe);
        } finally {
          $e ? Ie() : (Ke = !1, Fe = null);
        }
      } else
        Ke = !1;
    }
    var Ie;
    if (typeof Ae == "function")
      Ie = function() {
        Ae(Mt);
      };
    else if (typeof MessageChannel < "u") {
      var rt = new MessageChannel(), at = rt.port2;
      rt.port1.onmessage = Mt, Ie = function() {
        at.postMessage(null);
      };
    } else
      Ie = function() {
        me(Mt, 0);
      };
    function Ct(pe) {
      Fe = pe, Ke || (Ke = !0, Ie());
    }
    function Ne(pe, $e) {
      kt = me(function() {
        pe(v.unstable_now());
      }, $e);
    }
    v.unstable_IdlePriority = 5, v.unstable_ImmediatePriority = 1, v.unstable_LowPriority = 4, v.unstable_NormalPriority = 3, v.unstable_Profiling = null, v.unstable_UserBlockingPriority = 2, v.unstable_cancelCallback = function(pe) {
      pe.callback = null;
    }, v.unstable_continueExecution = function() {
      be || ue || (be = !0, Ct(_e));
    }, v.unstable_forceFrameRate = function(pe) {
      0 > pe || 125 < pe ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : qt = 0 < pe ? Math.floor(1e3 / pe) : 5;
    }, v.unstable_getCurrentPriorityLevel = function() {
      return re;
    }, v.unstable_getFirstCallbackNode = function() {
      return p(Y);
    }, v.unstable_next = function(pe) {
      switch (re) {
        case 1:
        case 2:
        case 3:
          var $e = 3;
          break;
        default:
          $e = re;
      }
      var M = re;
      re = $e;
      try {
        return pe();
      } finally {
        re = M;
      }
    }, v.unstable_pauseExecution = function() {
    }, v.unstable_requestPaint = function() {
    }, v.unstable_runWithPriority = function(pe, $e) {
      switch (pe) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          pe = 3;
      }
      var M = re;
      re = pe;
      try {
        return $e();
      } finally {
        re = M;
      }
    }, v.unstable_scheduleCallback = function(pe, $e, M) {
      var R = v.unstable_now();
      switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? R + M : R) : M = R, pe) {
        case 1:
          var O = -1;
          break;
        case 2:
          O = 250;
          break;
        case 5:
          O = 1073741823;
          break;
        case 4:
          O = 1e4;
          break;
        default:
          O = 5e3;
      }
      return O = M + O, pe = { id: oe++, callback: $e, priorityLevel: pe, startTime: M, expirationTime: O, sortIndex: -1 }, M > R ? (pe.sortIndex = M, m($, pe), p(Y) === null && pe === p($) && (Te ? (tt(kt), kt = -1) : Te = !0, Ne(Ze, M - R))) : (pe.sortIndex = O, m(Y, pe), be || ue || (be = !0, Ct(_e))), pe;
    }, v.unstable_shouldYield = yt, v.unstable_wrapCallback = function(pe) {
      var $e = re;
      return function() {
        var M = re;
        re = $e;
        try {
          return pe.apply(this, arguments);
        } finally {
          re = M;
        }
      };
    };
  }(DE)), DE;
}
var qw;
function ET() {
  return qw || (qw = 1, process.env.NODE_ENV === "production" ? Ym.exports = bD() : Ym.exports = CD()), Ym.exports;
}
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kw;
function wD() {
  return Kw || (Kw = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var v = Ju, m = ET(), p = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, C = !1;
    function w(e) {
      C = e;
    }
    function N(e) {
      if (!C) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        te("warn", e, a);
      }
    }
    function S(e) {
      if (!C) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        te("error", e, a);
      }
    }
    function te(e, t, a) {
      {
        var i = p.ReactDebugCurrentFrame, o = i.getStackAddendum();
        o !== "" && (t += "%s", a = a.concat([o]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var Y = 0, $ = 1, oe = 2, K = 3, re = 4, ue = 5, be = 6, Te = 7, me = 8, tt = 9, Ae = 10, Ue = 11, Ze = 12, _e = 13, Ke = 14, Fe = 15, kt = 16, qt = 17, mt = 18, yt = 19, Mt = 21, Ie = 22, rt = 23, at = 24, Ct = 25, Ne = !0, pe = !1, $e = !1, M = !1, R = !1, O = !0, U = !1, Z = !1, le = !0, we = !0, xe = !0, Re = /* @__PURE__ */ new Set(), vt = {}, zt = {};
    function Kt(e, t) {
      dt(e, t), dt(e + "Capture", t);
    }
    function dt(e, t) {
      vt[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), vt[e] = t;
      {
        var a = e.toLowerCase();
        zt[a] = e, e === "onDoubleClick" && (zt.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        Re.add(t[i]);
    }
    var _t = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", bt = Object.prototype.hasOwnProperty;
    function un(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function tn(e) {
      try {
        return wt(e), !1;
      } catch {
        return !0;
      }
    }
    function wt(e) {
      return "" + e;
    }
    function Nn(e, t) {
      if (tn(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, un(e)), wt(e);
    }
    function zn(e) {
      if (tn(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", un(e)), wt(e);
    }
    function vn(e, t) {
      if (tn(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, un(e)), wt(e);
    }
    function Ln(e, t) {
      if (tn(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, un(e)), wt(e);
    }
    function gn(e) {
      if (tn(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", un(e)), wt(e);
    }
    function Wn(e) {
      if (tn(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", un(e)), wt(e);
    }
    var Sr = 0, Qn = 1, wn = 2, on = 3, Gn = 4, Nr = 5, qn = 6, _ = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", A = _ + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", B = new RegExp("^[" + _ + "][" + A + "]*$"), ae = {}, Ce = {};
    function xt(e) {
      return bt.call(Ce, e) ? !0 : bt.call(ae, e) ? !1 : B.test(e) ? (Ce[e] = !0, !0) : (ae[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function Nt(e, t, a) {
      return t !== null ? t.type === Sr : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function it(e, t, a, i) {
      if (a !== null && a.type === Sr)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var o = e.toLowerCase().slice(0, 5);
          return o !== "data-" && o !== "aria-";
        }
        default:
          return !1;
      }
    }
    function se(e, t, a, i) {
      if (t === null || typeof t > "u" || it(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case on:
            return !t;
          case Gn:
            return t === !1;
          case Nr:
            return isNaN(t);
          case qn:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Me(e) {
      return ge.hasOwnProperty(e) ? ge[e] : null;
    }
    function ye(e, t, a, i, o, s, f) {
      this.acceptsBooleans = t === wn || t === on || t === Gn, this.attributeName = i, this.attributeNamespace = o, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var ge = {}, gt = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    gt.forEach(function(e) {
      ge[e] = new ye(
        e,
        Sr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      ge[t] = new ye(
        t,
        Qn,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      ge[e] = new ye(
        e,
        wn,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      ge[e] = new ye(
        e,
        wn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      ge[e] = new ye(
        e,
        on,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      ge[e] = new ye(
        e,
        on,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      ge[e] = new ye(
        e,
        Gn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      ge[e] = new ye(
        e,
        qn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      ge[e] = new ye(
        e,
        Nr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Ht = /[\-\:]([a-z])/g, sn = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Ht, sn);
      ge[t] = new ye(
        t,
        Qn,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Ht, sn);
      ge[t] = new ye(
        t,
        Qn,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Ht, sn);
      ge[t] = new ye(
        t,
        Qn,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      ge[e] = new ye(
        e,
        Qn,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var ar = "xlinkHref";
    ge[ar] = new ye(
      "xlinkHref",
      Qn,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      ge[e] = new ye(
        e,
        Qn,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Ai = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Ja = !1;
    function di(e) {
      !Ja && Ai.test(e) && (Ja = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function ga(e, t, a, i) {
      if (i.mustUseProperty) {
        var o = i.propertyName;
        return e[o];
      } else {
        Nn(a, t), i.sanitizeURL && di("" + a);
        var s = i.attributeName, f = null;
        if (i.type === Gn) {
          if (e.hasAttribute(s)) {
            var h = e.getAttribute(s);
            return h === "" ? !0 : se(t, a, i, !1) ? h : h === "" + a ? a : h;
          }
        } else if (e.hasAttribute(s)) {
          if (se(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === on)
            return a;
          f = e.getAttribute(s);
        }
        return se(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function pi(e, t, a, i) {
      {
        if (!xt(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var o = e.getAttribute(t);
        return Nn(a, t), o === "" + a ? a : o;
      }
    }
    function Sa(e, t, a, i) {
      var o = Me(t);
      if (!Nt(t, o, i)) {
        if (se(t, a, o, i) && (a = null), i || o === null) {
          if (xt(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Nn(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = o.mustUseProperty;
        if (f) {
          var h = o.propertyName;
          if (a === null) {
            var y = o.type;
            e[h] = y === on ? !1 : "";
          } else
            e[h] = a;
          return;
        }
        var b = o.attributeName, T = o.attributeNamespace;
        if (a === null)
          e.removeAttribute(b);
        else {
          var P = o.type, z;
          P === on || P === Gn && a === !0 ? z = "" : (Nn(a, b), z = "" + a, o.sanitizeURL && di(z.toString())), T ? e.setAttributeNS(T, b, z) : e.setAttribute(b, z);
        }
      }
    }
    var vi = Symbol.for("react.element"), Hr = Symbol.for("react.portal"), Ea = Symbol.for("react.fragment"), hi = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), ce = Symbol.for("react.provider"), Oe = Symbol.for("react.context"), He = Symbol.for("react.forward_ref"), Dt = Symbol.for("react.suspense"), It = Symbol.for("react.suspense_list"), Lt = Symbol.for("react.memo"), ut = Symbol.for("react.lazy"), Jn = Symbol.for("react.scope"), Tn = Symbol.for("react.debug_trace_mode"), Rn = Symbol.for("react.offscreen"), Er = Symbol.for("react.legacy_hidden"), mi = Symbol.for("react.cache"), Yo = Symbol.for("react.tracing_marker"), Xt = Symbol.iterator, Qf = "@@iterator";
    function ei(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Xt && e[Xt] || e[Qf];
      return typeof t == "function" ? t : null;
    }
    var jt = Object.assign, yi = 0, cu, Wo, fu, ta, Xl, Vr, Zl;
    function Jl() {
    }
    Jl.__reactDisabledLog = !0;
    function rc() {
      {
        if (yi === 0) {
          cu = console.log, Wo = console.info, fu = console.warn, ta = console.error, Xl = console.group, Vr = console.groupCollapsed, Zl = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Jl,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        yi++;
      }
    }
    function Qo() {
      {
        if (yi--, yi === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: jt({}, e, {
              value: cu
            }),
            info: jt({}, e, {
              value: Wo
            }),
            warn: jt({}, e, {
              value: fu
            }),
            error: jt({}, e, {
              value: ta
            }),
            group: jt({}, e, {
              value: Xl
            }),
            groupCollapsed: jt({}, e, {
              value: Vr
            }),
            groupEnd: jt({}, e, {
              value: Zl
            })
          });
        }
        yi < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var du = p.ReactCurrentDispatcher, ti;
    function Br(e, t, a) {
      {
        if (ti === void 0)
          try {
            throw Error();
          } catch (o) {
            var i = o.stack.trim().match(/\n( *(at )?)/);
            ti = i && i[1] || "";
          }
        return `
` + ti + e;
      }
    }
    var pu = !1, vu;
    {
      var hu = typeof WeakMap == "function" ? WeakMap : Map;
      vu = new hu();
    }
    function Go(e, t) {
      if (!e || pu)
        return "";
      {
        var a = vu.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      pu = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = du.current, du.current = null, rc();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (G) {
              i = G;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (G) {
              i = G;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (G) {
            i = G;
          }
          e();
        }
      } catch (G) {
        if (G && i && typeof G.stack == "string") {
          for (var h = G.stack.split(`
`), y = i.stack.split(`
`), b = h.length - 1, T = y.length - 1; b >= 1 && T >= 0 && h[b] !== y[T]; )
            T--;
          for (; b >= 1 && T >= 0; b--, T--)
            if (h[b] !== y[T]) {
              if (b !== 1 || T !== 1)
                do
                  if (b--, T--, T < 0 || h[b] !== y[T]) {
                    var P = `
` + h[b].replace(" at new ", " at ");
                    return e.displayName && P.includes("<anonymous>") && (P = P.replace("<anonymous>", e.displayName)), typeof e == "function" && vu.set(e, P), P;
                  }
                while (b >= 1 && T >= 0);
              break;
            }
        }
      } finally {
        pu = !1, du.current = s, Qo(), Error.prepareStackTrace = o;
      }
      var z = e ? e.displayName || e.name : "", W = z ? Br(z) : "";
      return typeof e == "function" && vu.set(e, W), W;
    }
    function qo(e, t, a) {
      return Go(e, !0);
    }
    function Ui(e, t, a) {
      return Go(e, !1);
    }
    function Gf(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function gi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Go(e, Gf(e));
      if (typeof e == "string")
        return Br(e);
      switch (e) {
        case Dt:
          return Br("Suspense");
        case It:
          return Br("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case He:
            return Ui(e.render);
          case Lt:
            return gi(e.type, t, a);
          case ut: {
            var i = e, o = i._payload, s = i._init;
            try {
              return gi(s(o), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function nn(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ue:
          return Br(e.type);
        case kt:
          return Br("Lazy");
        case _e:
          return Br("Suspense");
        case yt:
          return Br("SuspenseList");
        case Y:
        case oe:
        case Fe:
          return Ui(e.type);
        case Ue:
          return Ui(e.type.render);
        case $:
          return qo(e.type);
        default:
          return "";
      }
    }
    function Ko(e) {
      try {
        var t = "", a = e;
        do
          t += nn(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function to(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var o = t.displayName || t.name || "";
      return o !== "" ? a + "(" + o + ")" : a;
    }
    function Xo(e) {
      return e.displayName || "Context";
    }
    function Zt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Ea:
          return "Fragment";
        case Hr:
          return "Portal";
        case D:
          return "Profiler";
        case hi:
          return "StrictMode";
        case Dt:
          return "Suspense";
        case It:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case Oe:
            var t = e;
            return Xo(t) + ".Consumer";
          case ce:
            var a = e;
            return Xo(a._context) + ".Provider";
          case He:
            return to(e, e.render, "ForwardRef");
          case Lt:
            var i = e.displayName || null;
            return i !== null ? i : Zt(e.type) || "Memo";
          case ut: {
            var o = e, s = o._payload, f = o._init;
            try {
              return Zt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Zo(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function Jo(e) {
      return e.displayName || "Context";
    }
    function Tt(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case at:
          return "Cache";
        case tt:
          var i = a;
          return Jo(i) + ".Consumer";
        case Ae:
          var o = a;
          return Jo(o._context) + ".Provider";
        case mt:
          return "DehydratedFragment";
        case Ue:
          return Zo(a, a.render, "ForwardRef");
        case Te:
          return "Fragment";
        case ue:
          return a;
        case re:
          return "Portal";
        case K:
          return "Root";
        case be:
          return "Text";
        case kt:
          return Zt(a);
        case me:
          return a === hi ? "StrictMode" : "Mode";
        case Ie:
          return "Offscreen";
        case Ze:
          return "Profiler";
        case Mt:
          return "Scope";
        case _e:
          return "Suspense";
        case yt:
          return "SuspenseList";
        case Ct:
          return "TracingMarker";
        case $:
        case Y:
        case qt:
        case oe:
        case Ke:
        case Fe:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var no = p.ReactDebugCurrentFrame, jn = null, na = !1;
    function $r() {
      {
        if (jn === null)
          return null;
        var e = jn._debugOwner;
        if (e !== null && typeof e < "u")
          return Tt(e);
      }
      return null;
    }
    function mu() {
      return jn === null ? "" : Ko(jn);
    }
    function Bn() {
      no.getCurrentStack = null, jn = null, na = !1;
    }
    function cn(e) {
      no.getCurrentStack = e === null ? null : mu, jn = e, na = !1;
    }
    function ac() {
      return jn;
    }
    function ra(e) {
      na = e;
    }
    function fr(e) {
      return "" + e;
    }
    function Si(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Wn(e), e;
        default:
          return "";
      }
    }
    var ic = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function zi(e, t) {
      ic[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function yu(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function uc(e) {
      return e._valueTracker;
    }
    function Na(e) {
      e._valueTracker = null;
    }
    function gu(e) {
      var t = "";
      return e && (yu(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Su(e) {
      var t = yu(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Wn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var o = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(h) {
            Wn(h), i = "" + h, s.call(this, h);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(h) {
            Wn(h), i = "" + h;
          },
          stopTracking: function() {
            Na(e), delete e[t];
          }
        };
        return f;
      }
    }
    function La(e) {
      uc(e) || (e._valueTracker = Su(e));
    }
    function el(e) {
      if (!e)
        return !1;
      var t = uc(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = gu(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function Eu(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Cu = !1, ro = !1, tl = !1, es = !1;
    function ni(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function g(e, t) {
      var a = e, i = t.checked, o = jt({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return o;
    }
    function k(e, t) {
      zi("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !ro && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", $r() || "A component", t.type), ro = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Cu && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", $r() || "A component", t.type), Cu = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Si(t.value != null ? t.value : i),
        controlled: ni(t)
      };
    }
    function Q(e, t) {
      var a = e, i = t.checked;
      i != null && Sa(a, "checked", i, !1);
    }
    function X(e, t) {
      var a = e;
      {
        var i = ni(t);
        !a._wrapperState.controlled && i && !es && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), es = !0), a._wrapperState.controlled && !i && !tl && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), tl = !0);
      }
      Q(e, t);
      var o = Si(t.value), s = t.type;
      if (o != null)
        s === "number" ? (o === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != o) && (a.value = fr(o)) : a.value !== fr(o) && (a.value = fr(o));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? lt(a, t.type, o) : t.hasOwnProperty("defaultValue") && lt(a, t.type, Si(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function Se(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var o = t.type, s = o === "submit" || o === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = fr(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var h = i.name;
      h !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, h !== "" && (i.name = h);
    }
    function ct(e, t) {
      var a = e;
      X(a, t), Le(a, t);
    }
    function Le(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Nn(a, "name");
        for (var o = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < o.length; s++) {
          var f = o[s];
          if (!(f === e || f.form !== e.form)) {
            var h = Dh(f);
            if (!h)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            el(f), X(f, h);
          }
        }
      }
    }
    function lt(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Eu(e.ownerDocument) !== e) && (a == null ? e.defaultValue = fr(e._wrapperState.initialValue) : e.defaultValue !== fr(a) && (e.defaultValue = fr(a)));
    }
    var Pt = !1, Jt = !1, Sn = !1;
    function hn(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? v.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || Jt || (Jt = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Sn || (Sn = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Pt && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Pt = !0);
    }
    function En(e, t) {
      t.value != null && e.setAttribute("value", fr(Si(t.value)));
    }
    var _n = Array.isArray;
    function $t(e) {
      return _n(e);
    }
    var ji;
    ji = !1;
    function nl() {
      var e = $r();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var ts = ["value", "defaultValue"];
    function qf(e) {
      {
        zi("select", e);
        for (var t = 0; t < ts.length; t++) {
          var a = ts[t];
          if (e[a] != null) {
            var i = $t(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, nl()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, nl());
          }
        }
      }
    }
    function ri(e, t, a, i) {
      var o = e.options;
      if (t) {
        for (var s = a, f = {}, h = 0; h < s.length; h++)
          f["$" + s[h]] = !0;
        for (var y = 0; y < o.length; y++) {
          var b = f.hasOwnProperty("$" + o[y].value);
          o[y].selected !== b && (o[y].selected = b), b && i && (o[y].defaultSelected = !0);
        }
      } else {
        for (var T = fr(Si(a)), P = null, z = 0; z < o.length; z++) {
          if (o[z].value === T) {
            o[z].selected = !0, i && (o[z].defaultSelected = !0);
            return;
          }
          P === null && !o[z].disabled && (P = o[z]);
        }
        P !== null && (P.selected = !0);
      }
    }
    function ns(e, t) {
      return jt({}, t, {
        value: void 0
      });
    }
    function rs(e, t) {
      var a = e;
      qf(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !ji && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), ji = !0);
    }
    function Kf(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? ri(a, !!t.multiple, i, !1) : t.defaultValue != null && ri(a, !!t.multiple, t.defaultValue, !0);
    }
    function Zm(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var o = t.value;
      o != null ? ri(a, !!t.multiple, o, !1) : i !== !!t.multiple && (t.defaultValue != null ? ri(a, !!t.multiple, t.defaultValue, !0) : ri(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Jm(e, t) {
      var a = e, i = t.value;
      i != null && ri(a, !!t.multiple, i, !1);
    }
    var Xf = !1;
    function Zf(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = jt({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: fr(a._wrapperState.initialValue)
      });
      return i;
    }
    function iv(e, t) {
      var a = e;
      zi("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Xf && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", $r() || "A component"), Xf = !0);
      var i = t.value;
      if (i == null) {
        var o = t.children, s = t.defaultValue;
        if (o != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if ($t(o)) {
              if (o.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              o = o[0];
            }
            s = o;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: Si(i)
      };
    }
    function uv(e, t) {
      var a = e, i = Si(t.value), o = Si(t.defaultValue);
      if (i != null) {
        var s = fr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      o != null && (a.defaultValue = fr(o));
    }
    function ov(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Jf(e, t) {
      uv(e, t);
    }
    var Pi = "http://www.w3.org/1999/xhtml", ey = "http://www.w3.org/1998/Math/MathML", ed = "http://www.w3.org/2000/svg";
    function oc(e) {
      switch (e) {
        case "svg":
          return ed;
        case "math":
          return ey;
        default:
          return Pi;
      }
    }
    function td(e, t) {
      return e == null || e === Pi ? oc(t) : e === ed && t === "foreignObject" ? Pi : e;
    }
    var ty = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, o) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, o);
        });
      } : e;
    }, lc, lv = ty(function(e, t) {
      if (e.namespaceURI === ed && !("innerHTML" in e)) {
        lc = lc || document.createElement("div"), lc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = lc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), aa = 1, Fi = 3, er = 8, ai = 9, ao = 11, sc = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Fi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, sv = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, rl = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function cv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var fv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(rl).forEach(function(e) {
      fv.forEach(function(t) {
        rl[cv(t, e)] = rl[e];
      });
    });
    function cc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(rl.hasOwnProperty(e) && rl[e]) ? t + "px" : (Ln(t, e), ("" + t).trim());
    }
    var al = /([A-Z])/g, ny = /^ms-/;
    function ry(e) {
      return e.replace(al, "-$1").toLowerCase().replace(ny, "-ms-");
    }
    var dv = function() {
    };
    {
      var pv = /^(?:webkit|moz|o)[A-Z]/, vv = /^-ms-/, as = /-(.)/g, il = /;\s*$/, ul = {}, ol = {}, hv = !1, nd = !1, rd = function(e) {
        return e.replace(as, function(t, a) {
          return a.toUpperCase();
        });
      }, ad = function(e) {
        ul.hasOwnProperty(e) && ul[e] || (ul[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          rd(e.replace(vv, "ms-"))
        ));
      }, mv = function(e) {
        ul.hasOwnProperty(e) && ul[e] || (ul[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, yv = function(e, t) {
        ol.hasOwnProperty(t) && ol[t] || (ol[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(il, "")));
      }, gv = function(e, t) {
        hv || (hv = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, ay = function(e, t) {
        nd || (nd = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      dv = function(e, t) {
        e.indexOf("-") > -1 ? ad(e) : pv.test(e) ? mv(e) : il.test(t) && yv(e, t), typeof t == "number" && (isNaN(t) ? gv(e, t) : isFinite(t) || ay(e, t));
      };
    }
    var iy = dv;
    function uy(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var o = e[i];
            if (o != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : ry(i)) + ":", t += cc(i, o, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function Sv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var o = i.indexOf("--") === 0;
          o || iy(i, t[i]);
          var s = cc(i, t[i], o);
          i === "float" && (i = "cssFloat"), o ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function oy(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Aa(e) {
      var t = {};
      for (var a in e)
        for (var i = sv[a] || [a], o = 0; o < i.length; o++)
          t[i[o]] = a;
      return t;
    }
    function is(e, t) {
      {
        if (!t)
          return;
        var a = Aa(e), i = Aa(t), o = {};
        for (var s in a) {
          var f = a[s], h = i[s];
          if (h && f !== h) {
            var y = f + "," + h;
            if (o[y])
              continue;
            o[y] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", oy(e[f]) ? "Removing" : "Updating", f, h);
          }
        }
      }
    }
    var Ev = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, Cv = jt({
      menuitem: !0
    }, Ev), bv = "__html";
    function fc(e, t) {
      if (t) {
        if (Cv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(bv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Hi(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var dc = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, wv = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, ii = {}, id = new RegExp("^(aria)-[" + A + "]*$"), us = new RegExp("^(aria)[A-Z][" + A + "]*$");
    function ud(e, t) {
      {
        if (bt.call(ii, t) && ii[t])
          return !0;
        if (us.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = wv.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ii[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), ii[t] = !0, !0;
        }
        if (id.test(t)) {
          var o = t.toLowerCase(), s = wv.hasOwnProperty(o) ? o : null;
          if (s == null)
            return ii[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), ii[t] = !0, !0;
        }
      }
      return !0;
    }
    function Tv(e, t) {
      {
        var a = [];
        for (var i in t) {
          var o = ud(e, i);
          o || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function pc(e, t) {
      Hi(e, t) || Tv(e, t);
    }
    var io = !1;
    function od(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !io && (io = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var ld = function() {
    };
    {
      var dr = {}, sd = /^on./, Rv = /^on[^A-Z]/, _v = new RegExp("^(aria)-[" + A + "]*$"), xv = new RegExp("^(aria)[A-Z][" + A + "]*$");
      ld = function(e, t, a, i) {
        if (bt.call(dr, t) && dr[t])
          return !0;
        var o = t.toLowerCase();
        if (o === "onfocusin" || o === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), dr[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var h = f.hasOwnProperty(o) ? f[o] : null;
          if (h != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, h), dr[t] = !0, !0;
          if (sd.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), dr[t] = !0, !0;
        } else if (sd.test(t))
          return Rv.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), dr[t] = !0, !0;
        if (_v.test(t) || xv.test(t))
          return !0;
        if (o === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), dr[t] = !0, !0;
        if (o === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), dr[t] = !0, !0;
        if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), dr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), dr[t] = !0, !0;
        var y = Me(t), b = y !== null && y.type === Sr;
        if (dc.hasOwnProperty(o)) {
          var T = dc[o];
          if (T !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, T), dr[t] = !0, !0;
        } else if (!b && t !== o)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, o), dr[t] = !0, !0;
        return typeof a == "boolean" && it(t, a, y, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), dr[t] = !0, !0) : b ? !0 : it(t, a, y, !1) ? (dr[t] = !0, !1) : ((a === "false" || a === "true") && y !== null && y.type === on && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), dr[t] = !0), !0);
      };
    }
    var Ov = function(e, t, a) {
      {
        var i = [];
        for (var o in t) {
          var s = ld(e, o, t[o], a);
          s || i.push(o);
        }
        var f = i.map(function(h) {
          return "`" + h + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function kv(e, t, a) {
      Hi(e, t) || Ov(e, t, a);
    }
    var Vi = 1, os = 2, uo = 4, ly = Vi | os | uo, ls = null;
    function ss(e) {
      ls !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), ls = e;
    }
    function sy() {
      ls === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), ls = null;
    }
    function Dv(e) {
      return e === ls;
    }
    function vc(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Fi ? t.parentNode : t;
    }
    var Cn = null, bu = null, Bi = null;
    function ll(e) {
      var t = Al(e);
      if (t) {
        if (typeof Cn != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Dh(a);
          Cn(t.stateNode, t.type, i);
        }
      }
    }
    function Mv(e) {
      Cn = e;
    }
    function hc(e) {
      bu ? Bi ? Bi.push(e) : Bi = [e] : bu = e;
    }
    function cs() {
      return bu !== null || Bi !== null;
    }
    function fs() {
      if (bu) {
        var e = bu, t = Bi;
        if (bu = null, Bi = null, ll(e), t)
          for (var a = 0; a < t.length; a++)
            ll(t[a]);
      }
    }
    var oo = function(e, t) {
      return e(t);
    }, cd = function() {
    }, fd = !1;
    function cy() {
      var e = cs();
      e && (cd(), fs());
    }
    function dd(e, t, a) {
      if (fd)
        return e(t, a);
      fd = !0;
      try {
        return oo(e, t, a);
      } finally {
        fd = !1, cy();
      }
    }
    function mc(e, t, a) {
      oo = e, cd = a;
    }
    function yc(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function pd(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && yc(t));
        default:
          return !1;
      }
    }
    function lo(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Dh(a);
      if (i === null)
        return null;
      var o = i[t];
      if (pd(t, e.type, i))
        return null;
      if (o && typeof o != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof o + "` type.");
      return o;
    }
    var ds = !1;
    if (_t)
      try {
        var so = {};
        Object.defineProperty(so, "passive", {
          get: function() {
            ds = !0;
          }
        }), window.addEventListener("test", so, so), window.removeEventListener("test", so, so);
      } catch {
        ds = !1;
      }
    function Nv(e, t, a, i, o, s, f, h, y) {
      var b = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, b);
      } catch (T) {
        this.onError(T);
      }
    }
    var vd = Nv;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var hd = document.createElement("react");
      vd = function(t, a, i, o, s, f, h, y, b) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var T = document.createEvent("Event"), P = !1, z = !0, W = window.event, G = Object.getOwnPropertyDescriptor(window, "event");
        function J() {
          hd.removeEventListener(ee, ot, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = W);
        }
        var Ve = Array.prototype.slice.call(arguments, 3);
        function ot() {
          P = !0, J(), a.apply(i, Ve), z = !1;
        }
        var Je, Qt = !1, Bt = !1;
        function H(V) {
          if (Je = V.error, Qt = !0, Je === null && V.colno === 0 && V.lineno === 0 && (Bt = !0), V.defaultPrevented && Je != null && typeof Je == "object")
            try {
              Je._suppressLogging = !0;
            } catch {
            }
        }
        var ee = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", H), hd.addEventListener(ee, ot, !1), T.initEvent(ee, !1, !1), hd.dispatchEvent(T), G && Object.defineProperty(window, "event", G), P && z && (Qt ? Bt && (Je = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Je = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Je)), window.removeEventListener("error", H), !P)
          return J(), Nv.apply(this, arguments);
      };
    }
    var fy = vd, wu = !1, ui = null, ps = !1, Tu = null, Ei = {
      onError: function(e) {
        wu = !0, ui = e;
      }
    };
    function co(e, t, a, i, o, s, f, h, y) {
      wu = !1, ui = null, fy.apply(Ei, arguments);
    }
    function $i(e, t, a, i, o, s, f, h, y) {
      if (co.apply(this, arguments), wu) {
        var b = yd();
        ps || (ps = !0, Tu = b);
      }
    }
    function md() {
      if (ps) {
        var e = Tu;
        throw ps = !1, Tu = null, e;
      }
    }
    function dy() {
      return wu;
    }
    function yd() {
      if (wu) {
        var e = ui;
        return wu = !1, ui = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ua(e) {
      return e._reactInternals;
    }
    function vs(e) {
      return e._reactInternals !== void 0;
    }
    function sl(e, t) {
      e._reactInternals = t;
    }
    var nt = (
      /*                      */
      0
    ), Ru = (
      /*                */
      1
    ), xn = (
      /*                    */
      2
    ), At = (
      /*                       */
      4
    ), ln = (
      /*                */
      16
    ), fn = (
      /*                 */
      32
    ), Ci = (
      /*                     */
      64
    ), St = (
      /*                   */
      128
    ), $n = (
      /*            */
      256
    ), ia = (
      /*                          */
      512
    ), za = (
      /*                     */
      1024
    ), An = (
      /*                      */
      2048
    ), ja = (
      /*                    */
      4096
    ), _u = (
      /*                   */
      8192
    ), hs = (
      /*             */
      16384
    ), gc = An | At | Ci | ia | za | hs, Lv = (
      /*               */
      32767
    ), Ca = (
      /*                   */
      32768
    ), pr = (
      /*                */
      65536
    ), ms = (
      /* */
      131072
    ), gd = (
      /*                       */
      1048576
    ), Sd = (
      /*                    */
      2097152
    ), ua = (
      /*                 */
      4194304
    ), xu = (
      /*                */
      8388608
    ), oa = (
      /*               */
      16777216
    ), fo = (
      /*              */
      33554432
    ), cl = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      At | za | 0
    ), la = xn | At | ln | fn | ia | ja | _u, Lr = At | Ci | ia | _u, Pa = An | ln, Cr = ua | xu | Sd, Ii = p.ReactCurrentOwner;
    function ba(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (xn | ja)) !== nt && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === K ? a : null;
    }
    function Ed(e) {
      if (e.tag === _e) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function Sc(e) {
      return e.tag === K ? e.stateNode.containerInfo : null;
    }
    function Cd(e) {
      return ba(e) === e;
    }
    function wa(e) {
      {
        var t = Ii.current;
        if (t !== null && t.tag === $) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Tt(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var o = Ua(e);
      return o ? ba(o) === o : !1;
    }
    function sa(e) {
      if (ba(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function On(e) {
      var t = e.alternate;
      if (!t) {
        var a = ba(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, o = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var h = s.return;
          if (h !== null) {
            i = o = h;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var y = s.child; y; ) {
            if (y === i)
              return sa(s), e;
            if (y === o)
              return sa(s), t;
            y = y.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== o.return)
          i = s, o = f;
        else {
          for (var b = !1, T = s.child; T; ) {
            if (T === i) {
              b = !0, i = s, o = f;
              break;
            }
            if (T === o) {
              b = !0, o = s, i = f;
              break;
            }
            T = T.sibling;
          }
          if (!b) {
            for (T = f.child; T; ) {
              if (T === i) {
                b = !0, i = f, o = s;
                break;
              }
              if (T === o) {
                b = !0, o = f, i = s;
                break;
              }
              T = T.sibling;
            }
            if (!b)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== o)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== K)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Fa(e) {
      var t = On(e);
      return t !== null ? bd(t) : null;
    }
    function bd(e) {
      if (e.tag === ue || e.tag === be)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = bd(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function Av(e) {
      var t = On(e);
      return t !== null ? Ec(t) : null;
    }
    function Ec(e) {
      if (e.tag === ue || e.tag === be)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== re) {
          var a = Ec(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var Cc = m.unstable_scheduleCallback, Uv = m.unstable_cancelCallback, bc = m.unstable_shouldYield, zv = m.unstable_requestPaint, Pn = m.unstable_now, wd = m.unstable_getCurrentPriorityLevel, wc = m.unstable_ImmediatePriority, Ta = m.unstable_UserBlockingPriority, bi = m.unstable_NormalPriority, Tc = m.unstable_LowPriority, Ou = m.unstable_IdlePriority, Td = m.unstable_yieldValue, Rd = m.unstable_setDisableYieldValue, ku = null, vr = null, ke = null, Kn = !1, br = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function _d(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        le && (e = jt({}, e, {
          getLaneLabelMap: Mu,
          injectProfilingHooks: Wi
        })), ku = t.inject(e), vr = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function jv(e, t) {
      if (vr && typeof vr.onScheduleFiberRoot == "function")
        try {
          vr.onScheduleFiberRoot(ku, e, t);
        } catch (a) {
          Kn || (Kn = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function Yi(e, t) {
      if (vr && typeof vr.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & St) === St;
          if (we) {
            var i;
            switch (t) {
              case Ar:
                i = wc;
                break;
              case wr:
                i = Ta;
                break;
              case Gi:
                i = bi;
                break;
              case Rs:
                i = Ou;
                break;
              default:
                i = bi;
                break;
            }
            vr.onCommitFiberRoot(ku, e, i, a);
          }
        } catch (o) {
          Kn || (Kn = !0, S("React instrumentation encountered an error: %s", o));
        }
    }
    function Du(e) {
      if (vr && typeof vr.onPostCommitFiberRoot == "function")
        try {
          vr.onPostCommitFiberRoot(ku, e);
        } catch (t) {
          Kn || (Kn = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function xd(e) {
      if (vr && typeof vr.onCommitFiberUnmount == "function")
        try {
          vr.onCommitFiberUnmount(ku, e);
        } catch (t) {
          Kn || (Kn = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function ir(e) {
      if (typeof Td == "function" && (Rd(e), w(e)), vr && typeof vr.setStrictMode == "function")
        try {
          vr.setStrictMode(ku, e);
        } catch (t) {
          Kn || (Kn = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Wi(e) {
      ke = e;
    }
    function Mu() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < kn; a++) {
          var i = py(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Rc(e) {
      ke !== null && typeof ke.markCommitStarted == "function" && ke.markCommitStarted(e);
    }
    function Od() {
      ke !== null && typeof ke.markCommitStopped == "function" && ke.markCommitStopped();
    }
    function Nu(e) {
      ke !== null && typeof ke.markComponentRenderStarted == "function" && ke.markComponentRenderStarted(e);
    }
    function po() {
      ke !== null && typeof ke.markComponentRenderStopped == "function" && ke.markComponentRenderStopped();
    }
    function Pv(e) {
      ke !== null && typeof ke.markComponentPassiveEffectMountStarted == "function" && ke.markComponentPassiveEffectMountStarted(e);
    }
    function kd() {
      ke !== null && typeof ke.markComponentPassiveEffectMountStopped == "function" && ke.markComponentPassiveEffectMountStopped();
    }
    function _c(e) {
      ke !== null && typeof ke.markComponentPassiveEffectUnmountStarted == "function" && ke.markComponentPassiveEffectUnmountStarted(e);
    }
    function Fv() {
      ke !== null && typeof ke.markComponentPassiveEffectUnmountStopped == "function" && ke.markComponentPassiveEffectUnmountStopped();
    }
    function Hv(e) {
      ke !== null && typeof ke.markComponentLayoutEffectMountStarted == "function" && ke.markComponentLayoutEffectMountStarted(e);
    }
    function Vv() {
      ke !== null && typeof ke.markComponentLayoutEffectMountStopped == "function" && ke.markComponentLayoutEffectMountStopped();
    }
    function xc(e) {
      ke !== null && typeof ke.markComponentLayoutEffectUnmountStarted == "function" && ke.markComponentLayoutEffectUnmountStarted(e);
    }
    function fl() {
      ke !== null && typeof ke.markComponentLayoutEffectUnmountStopped == "function" && ke.markComponentLayoutEffectUnmountStopped();
    }
    function Oc(e, t, a) {
      ke !== null && typeof ke.markComponentErrored == "function" && ke.markComponentErrored(e, t, a);
    }
    function Bv(e, t, a) {
      ke !== null && typeof ke.markComponentSuspended == "function" && ke.markComponentSuspended(e, t, a);
    }
    function $v(e) {
      ke !== null && typeof ke.markLayoutEffectsStarted == "function" && ke.markLayoutEffectsStarted(e);
    }
    function dl() {
      ke !== null && typeof ke.markLayoutEffectsStopped == "function" && ke.markLayoutEffectsStopped();
    }
    function Iv(e) {
      ke !== null && typeof ke.markPassiveEffectsStarted == "function" && ke.markPassiveEffectsStarted(e);
    }
    function ys() {
      ke !== null && typeof ke.markPassiveEffectsStopped == "function" && ke.markPassiveEffectsStopped();
    }
    function oi(e) {
      ke !== null && typeof ke.markRenderStarted == "function" && ke.markRenderStarted(e);
    }
    function gs() {
      ke !== null && typeof ke.markRenderYielded == "function" && ke.markRenderYielded();
    }
    function pl() {
      ke !== null && typeof ke.markRenderStopped == "function" && ke.markRenderStopped();
    }
    function vo(e) {
      ke !== null && typeof ke.markRenderScheduled == "function" && ke.markRenderScheduled(e);
    }
    function Dd(e, t) {
      ke !== null && typeof ke.markForceUpdateScheduled == "function" && ke.markForceUpdateScheduled(e, t);
    }
    function Lu(e, t) {
      ke !== null && typeof ke.markStateUpdateScheduled == "function" && ke.markStateUpdateScheduled(e, t);
    }
    var st = (
      /*                         */
      0
    ), Ft = (
      /*                 */
      1
    ), ft = (
      /*                    */
      2
    ), Fn = (
      /*               */
      8
    ), Ha = (
      /*              */
      16
    ), kc = Math.clz32 ? Math.clz32 : ho, Dc = Math.log, Md = Math.LN2;
    function ho(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Dc(t) / Md | 0) | 0;
    }
    var kn = 31, ne = (
      /*                        */
      0
    ), Yt = (
      /*                          */
      0
    ), pt = (
      /*                        */
      1
    ), wi = (
      /*    */
      2
    ), Ra = (
      /*             */
      4
    ), mo = (
      /*            */
      8
    ), Dn = (
      /*                     */
      16
    ), yo = (
      /*                */
      32
    ), Au = (
      /*                       */
      4194240
    ), go = (
      /*                        */
      64
    ), Va = (
      /*                        */
      128
    ), ca = (
      /*                        */
      256
    ), So = (
      /*                        */
      512
    ), Ss = (
      /*                        */
      1024
    ), Es = (
      /*                        */
      2048
    ), Mc = (
      /*                        */
      4096
    ), Nc = (
      /*                        */
      8192
    ), Lc = (
      /*                        */
      16384
    ), Ac = (
      /*                       */
      32768
    ), Uc = (
      /*                       */
      65536
    ), zc = (
      /*                       */
      131072
    ), jc = (
      /*                       */
      262144
    ), Pc = (
      /*                       */
      524288
    ), Eo = (
      /*                       */
      1048576
    ), Fc = (
      /*                       */
      2097152
    ), Co = (
      /*                            */
      130023424
    ), Qi = (
      /*                             */
      4194304
    ), Hc = (
      /*                             */
      8388608
    ), Cs = (
      /*                             */
      16777216
    ), Vc = (
      /*                             */
      33554432
    ), Bc = (
      /*                             */
      67108864
    ), Nd = Qi, vl = (
      /*          */
      134217728
    ), $c = (
      /*                          */
      268435455
    ), hl = (
      /*               */
      268435456
    ), Uu = (
      /*                        */
      536870912
    ), fa = (
      /*                   */
      1073741824
    );
    function py(e) {
      {
        if (e & pt)
          return "Sync";
        if (e & wi)
          return "InputContinuousHydration";
        if (e & Ra)
          return "InputContinuous";
        if (e & mo)
          return "DefaultHydration";
        if (e & Dn)
          return "Default";
        if (e & yo)
          return "TransitionHydration";
        if (e & Au)
          return "Transition";
        if (e & Co)
          return "Retry";
        if (e & vl)
          return "SelectiveHydration";
        if (e & hl)
          return "IdleHydration";
        if (e & Uu)
          return "Idle";
        if (e & fa)
          return "Offscreen";
      }
    }
    var bn = -1, Ic = go, Yc = Qi;
    function ml(e) {
      switch (tr(e)) {
        case pt:
          return pt;
        case wi:
          return wi;
        case Ra:
          return Ra;
        case mo:
          return mo;
        case Dn:
          return Dn;
        case yo:
          return yo;
        case go:
        case Va:
        case ca:
        case So:
        case Ss:
        case Es:
        case Mc:
        case Nc:
        case Lc:
        case Ac:
        case Uc:
        case zc:
        case jc:
        case Pc:
        case Eo:
        case Fc:
          return e & Au;
        case Qi:
        case Hc:
        case Cs:
        case Vc:
        case Bc:
          return e & Co;
        case vl:
          return vl;
        case hl:
          return hl;
        case Uu:
          return Uu;
        case fa:
          return fa;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function bs(e, t) {
      var a = e.pendingLanes;
      if (a === ne)
        return ne;
      var i = ne, o = e.suspendedLanes, s = e.pingedLanes, f = a & $c;
      if (f !== ne) {
        var h = f & ~o;
        if (h !== ne)
          i = ml(h);
        else {
          var y = f & s;
          y !== ne && (i = ml(y));
        }
      } else {
        var b = a & ~o;
        b !== ne ? i = ml(b) : s !== ne && (i = ml(s));
      }
      if (i === ne)
        return ne;
      if (t !== ne && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & o) === ne) {
        var T = tr(i), P = tr(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          T >= P || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          T === Dn && (P & Au) !== ne
        )
          return t;
      }
      (i & Ra) !== ne && (i |= a & Dn);
      var z = e.entangledLanes;
      if (z !== ne)
        for (var W = e.entanglements, G = i & z; G > 0; ) {
          var J = zu(G), Ve = 1 << J;
          i |= W[J], G &= ~Ve;
        }
      return i;
    }
    function Yv(e, t) {
      for (var a = e.eventTimes, i = bn; t > 0; ) {
        var o = zu(t), s = 1 << o, f = a[o];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function Wc(e, t) {
      switch (e) {
        case pt:
        case wi:
        case Ra:
          return t + 250;
        case mo:
        case Dn:
        case yo:
        case go:
        case Va:
        case ca:
        case So:
        case Ss:
        case Es:
        case Mc:
        case Nc:
        case Lc:
        case Ac:
        case Uc:
        case zc:
        case jc:
        case Pc:
        case Eo:
        case Fc:
          return t + 5e3;
        case Qi:
        case Hc:
        case Cs:
        case Vc:
        case Bc:
          return bn;
        case vl:
        case hl:
        case Uu:
        case fa:
          return bn;
        default:
          return S("Should have found matching lanes. This is a bug in React."), bn;
      }
    }
    function vy(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, o = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var h = zu(f), y = 1 << h, b = s[h];
        b === bn ? ((y & i) === ne || (y & o) !== ne) && (s[h] = Wc(y, t)) : b <= t && (e.expiredLanes |= y), f &= ~y;
      }
    }
    function hy(e) {
      return ml(e.pendingLanes);
    }
    function Ld(e) {
      var t = e.pendingLanes & ~fa;
      return t !== ne ? t : t & fa ? fa : ne;
    }
    function yl(e) {
      return (e & pt) !== ne;
    }
    function ws(e) {
      return (e & $c) !== ne;
    }
    function Qc(e) {
      return (e & Co) === e;
    }
    function my(e) {
      var t = pt | Ra | Dn;
      return (e & t) === ne;
    }
    function Wv(e) {
      return (e & Au) === e;
    }
    function Ts(e, t) {
      var a = wi | Ra | mo | Dn;
      return (t & a) !== ne;
    }
    function Qv(e, t) {
      return (t & e.expiredLanes) !== ne;
    }
    function Ad(e) {
      return (e & Au) !== ne;
    }
    function Ud() {
      var e = Ic;
      return Ic <<= 1, (Ic & Au) === ne && (Ic = go), e;
    }
    function yy() {
      var e = Yc;
      return Yc <<= 1, (Yc & Co) === ne && (Yc = Qi), e;
    }
    function tr(e) {
      return e & -e;
    }
    function ur(e) {
      return tr(e);
    }
    function zu(e) {
      return 31 - kc(e);
    }
    function Gc(e) {
      return zu(e);
    }
    function da(e, t) {
      return (e & t) !== ne;
    }
    function bo(e, t) {
      return (e & t) === t;
    }
    function Ut(e, t) {
      return e | t;
    }
    function gl(e, t) {
      return e & ~t;
    }
    function zd(e, t) {
      return e & t;
    }
    function Gv(e) {
      return e;
    }
    function qv(e, t) {
      return e !== Yt && e < t ? e : t;
    }
    function qc(e) {
      for (var t = [], a = 0; a < kn; a++)
        t.push(e);
      return t;
    }
    function wo(e, t, a) {
      e.pendingLanes |= t, t !== Uu && (e.suspendedLanes = ne, e.pingedLanes = ne);
      var i = e.eventTimes, o = Gc(t);
      i[o] = a;
    }
    function jd(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var o = zu(i), s = 1 << o;
        a[o] = bn, i &= ~s;
      }
    }
    function Pd(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Fd(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = ne, e.pingedLanes = ne, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, o = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var h = zu(f), y = 1 << h;
        i[h] = ne, o[h] = bn, s[h] = bn, f &= ~y;
      }
    }
    function Sl(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, o = a; o; ) {
        var s = zu(o), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), o &= ~f;
      }
    }
    function gy(e, t) {
      var a = tr(t), i;
      switch (a) {
        case Ra:
          i = wi;
          break;
        case Dn:
          i = mo;
          break;
        case go:
        case Va:
        case ca:
        case So:
        case Ss:
        case Es:
        case Mc:
        case Nc:
        case Lc:
        case Ac:
        case Uc:
        case zc:
        case jc:
        case Pc:
        case Eo:
        case Fc:
        case Qi:
        case Hc:
        case Cs:
        case Vc:
        case Bc:
          i = yo;
          break;
        case Uu:
          i = hl;
          break;
        default:
          i = Yt;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== Yt ? Yt : i;
    }
    function Hd(e, t, a) {
      if (br)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var o = Gc(a), s = 1 << o, f = i[o];
          f.add(t), a &= ~s;
        }
    }
    function Kc(e, t) {
      if (br)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var o = Gc(t), s = 1 << o, f = a[o];
          f.size > 0 && (f.forEach(function(h) {
            var y = h.alternate;
            (y === null || !i.has(y)) && i.add(h);
          }), f.clear()), t &= ~s;
        }
    }
    function Vd(e, t) {
      return null;
    }
    var Ar = pt, wr = Ra, Gi = Dn, Rs = Uu, To = Yt;
    function Ba() {
      return To;
    }
    function or(e) {
      To = e;
    }
    function _s(e, t) {
      var a = To;
      try {
        return To = e, t();
      } finally {
        To = a;
      }
    }
    function Ur(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function Sy(e, t) {
      return e === 0 || e > t ? e : t;
    }
    function Bd(e, t) {
      return e !== 0 && e < t;
    }
    function xs(e) {
      var t = tr(e);
      return Bd(Ar, t) ? Bd(wr, t) ? ws(t) ? Gi : Rs : wr : Ar;
    }
    function lr(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Kv;
    function Ye(e) {
      Kv = e;
    }
    function El(e) {
      Kv(e);
    }
    var Os;
    function Xv(e) {
      Os = e;
    }
    var Zv;
    function ks(e) {
      Zv = e;
    }
    var Ds;
    function $d(e) {
      Ds = e;
    }
    var Id;
    function Jv(e) {
      Id = e;
    }
    var Xc = !1, Cl = [], Ti = null, Un = null, hr = null, $a = /* @__PURE__ */ new Map(), bl = /* @__PURE__ */ new Map(), qi = [], li = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function eh(e) {
      return li.indexOf(e) > -1;
    }
    function Ri(e, t, a, i, o) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: o,
        targetContainers: [i]
      };
    }
    function th(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Ti = null;
          break;
        case "dragenter":
        case "dragleave":
          Un = null;
          break;
        case "mouseover":
        case "mouseout":
          hr = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          $a.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          bl.delete(i);
          break;
        }
      }
    }
    function wl(e, t, a, i, o, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = Ri(t, a, i, o, s);
        if (t !== null) {
          var h = Al(t);
          h !== null && Os(h);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var y = e.targetContainers;
      return o !== null && y.indexOf(o) === -1 && y.push(o), e;
    }
    function nh(e, t, a, i, o) {
      switch (t) {
        case "focusin": {
          var s = o;
          return Ti = wl(Ti, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = o;
          return Un = wl(Un, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var h = o;
          return hr = wl(hr, e, t, a, i, h), !0;
        }
        case "pointerover": {
          var y = o, b = y.pointerId;
          return $a.set(b, wl($a.get(b) || null, e, t, a, i, y)), !0;
        }
        case "gotpointercapture": {
          var T = o, P = T.pointerId;
          return bl.set(P, wl(bl.get(P) || null, e, t, a, i, T)), !0;
        }
      }
      return !1;
    }
    function Yd(e) {
      var t = Fs(e.target);
      if (t !== null) {
        var a = ba(t);
        if (a !== null) {
          var i = a.tag;
          if (i === _e) {
            var o = Ed(a);
            if (o !== null) {
              e.blockedOn = o, Id(e.priority, function() {
                Zv(a);
              });
              return;
            }
          } else if (i === K) {
            var s = a.stateNode;
            if (lr(s)) {
              e.blockedOn = Sc(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function rh(e) {
      for (var t = Ds(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < qi.length && Bd(t, qi[i].priority); i++)
        ;
      qi.splice(i, 0, a), i === 0 && Yd(a);
    }
    function Zc(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Ro(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var o = e.nativeEvent, s = new o.constructor(o.type, o);
          ss(s), o.target.dispatchEvent(s), sy();
        } else {
          var f = Al(i);
          return f !== null && Os(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Ms(e, t, a) {
      Zc(e) && a.delete(t);
    }
    function Wd() {
      Xc = !1, Ti !== null && Zc(Ti) && (Ti = null), Un !== null && Zc(Un) && (Un = null), hr !== null && Zc(hr) && (hr = null), $a.forEach(Ms), bl.forEach(Ms);
    }
    function zr(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Xc || (Xc = !0, m.unstable_scheduleCallback(m.unstable_NormalPriority, Wd)));
    }
    function Vt(e) {
      if (Cl.length > 0) {
        zr(Cl[0], e);
        for (var t = 1; t < Cl.length; t++) {
          var a = Cl[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Ti !== null && zr(Ti, e), Un !== null && zr(Un, e), hr !== null && zr(hr, e);
      var i = function(h) {
        return zr(h, e);
      };
      $a.forEach(i), bl.forEach(i);
      for (var o = 0; o < qi.length; o++) {
        var s = qi[o];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; qi.length > 0; ) {
        var f = qi[0];
        if (f.blockedOn !== null)
          break;
        Yd(f), f.blockedOn === null && qi.shift();
      }
    }
    var Hn = p.ReactCurrentBatchConfig, In = !0;
    function mr(e) {
      In = !!e;
    }
    function _a() {
      return In;
    }
    function Tl(e, t, a) {
      var i = Ir(t), o;
      switch (i) {
        case Ar:
          o = sr;
          break;
        case wr:
          o = Ns;
          break;
        case Gi:
        default:
          o = Ki;
          break;
      }
      return o.bind(null, t, a, e);
    }
    function sr(e, t, a, i) {
      var o = Ba(), s = Hn.transition;
      Hn.transition = null;
      try {
        or(Ar), Ki(e, t, a, i);
      } finally {
        or(o), Hn.transition = s;
      }
    }
    function Ns(e, t, a, i) {
      var o = Ba(), s = Hn.transition;
      Hn.transition = null;
      try {
        or(wr), Ki(e, t, a, i);
      } finally {
        or(o), Hn.transition = s;
      }
    }
    function Ki(e, t, a, i) {
      In && Jc(e, t, a, i);
    }
    function Jc(e, t, a, i) {
      var o = Ro(e, t, a, i);
      if (o === null) {
        Fy(e, t, i, Rl, a), th(e, i);
        return;
      }
      if (nh(o, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (th(e, i), t & uo && eh(e)) {
        for (; o !== null; ) {
          var s = Al(o);
          s !== null && El(s);
          var f = Ro(e, t, a, i);
          if (f === null && Fy(e, t, i, Rl, a), f === o)
            break;
          o = f;
        }
        o !== null && i.stopPropagation();
        return;
      }
      Fy(e, t, i, null, a);
    }
    var Rl = null;
    function Ro(e, t, a, i) {
      Rl = null;
      var o = vc(i), s = Fs(o);
      if (s !== null) {
        var f = ba(s);
        if (f === null)
          s = null;
        else {
          var h = f.tag;
          if (h === _e) {
            var y = Ed(f);
            if (y !== null)
              return y;
            s = null;
          } else if (h === K) {
            var b = f.stateNode;
            if (lr(b))
              return Sc(f);
            s = null;
          } else
            f !== s && (s = null);
        }
      }
      return Rl = s, null;
    }
    function Ir(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Ar;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return wr;
        case "message": {
          var t = wd();
          switch (t) {
            case wc:
              return Ar;
            case Ta:
              return wr;
            case bi:
            case Tc:
              return Gi;
            case Ou:
              return Rs;
            default:
              return Gi;
          }
        }
        default:
          return Gi;
      }
    }
    function Qd(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function _l(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Xi(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function ef(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var _o = null, _i = null, ju = null;
    function Pu(e) {
      return _o = e, _i = nf(), !0;
    }
    function tf() {
      _o = null, _i = null, ju = null;
    }
    function xl() {
      if (ju)
        return ju;
      var e, t = _i, a = t.length, i, o = nf(), s = o.length;
      for (e = 0; e < a && t[e] === o[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === o[s - i]; i++)
        ;
      var h = i > 1 ? 1 - i : void 0;
      return ju = o.slice(e, h), ju;
    }
    function nf() {
      return "value" in _o ? _o.value : _o.textContent;
    }
    function xo(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Oo() {
      return !0;
    }
    function jr() {
      return !1;
    }
    function nr(e) {
      function t(a, i, o, s, f) {
        this._reactName = a, this._targetInst = o, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var h in e)
          if (e.hasOwnProperty(h)) {
            var y = e[h];
            y ? this[h] = y(s) : this[h] = s[h];
          }
        var b = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return b ? this.isDefaultPrevented = Oo : this.isDefaultPrevented = jr, this.isPropagationStopped = jr, this;
      }
      return jt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Oo);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Oo);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: Oo
      }), t;
    }
    var Pr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Fr = nr(Pr), Ol = jt({}, Pr, {
      view: 0,
      detail: 0
    }), Gd = nr(Ol), Ls, qd, Ia;
    function ah(e) {
      e !== Ia && (Ia && e.type === "mousemove" ? (Ls = e.screenX - Ia.screenX, qd = e.screenY - Ia.screenY) : (Ls = 0, qd = 0), Ia = e);
    }
    var kl = jt({}, Ol, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: uf,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (ah(e), Ls);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : qd;
      }
    }), Fu = nr(kl), Kd = jt({}, kl, {
      dataTransfer: 0
    }), ko = nr(Kd), ih = jt({}, Ol, {
      relatedTarget: 0
    }), rf = nr(ih), Xd = jt({}, Pr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), af = nr(Xd), Ey = jt({}, Pr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Cy = nr(Ey), uh = jt({}, Pr, {
      data: 0
    }), Zd = nr(uh), Do = Zd, by = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Dl = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function oh(e) {
      if (e.key) {
        var t = by[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = xo(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Dl[e.keyCode] || "Unidentified" : "";
    }
    var Yn = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function wy(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = Yn[e];
      return i ? !!a[i] : !1;
    }
    function uf(e) {
      return wy;
    }
    var Ty = jt({}, Ol, {
      key: oh,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: uf,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? xo(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? xo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Ry = nr(Ty), lh = jt({}, kl, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Jd = nr(lh), _y = jt({}, Ol, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: uf
    }), Ya = nr(_y), ep = jt({}, Pr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), xy = nr(ep), Hu = jt({}, kl, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), of = nr(Hu), Mo = [9, 13, 27, 32], As = 229, Us = _t && "CompositionEvent" in window, No = null;
    _t && "documentMode" in document && (No = document.documentMode);
    var Oy = _t && "TextEvent" in window && !No, lf = _t && (!Us || No && No > 8 && No <= 11), sh = 32, tp = String.fromCharCode(sh);
    function ch() {
      Kt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Kt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Kt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Kt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var zs = !1;
    function sf(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function fh(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function np(e, t) {
      return e === "keydown" && t.keyCode === As;
    }
    function dh(e, t) {
      switch (e) {
        case "keyup":
          return Mo.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== As;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function rp(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function cf(e) {
      return e.locale === "ko";
    }
    var Zi = !1;
    function ap(e, t, a, i, o) {
      var s, f;
      if (Us ? s = fh(t) : Zi ? dh(t, i) && (s = "onCompositionEnd") : np(t, i) && (s = "onCompositionStart"), !s)
        return null;
      lf && !cf(i) && (!Zi && s === "onCompositionStart" ? Zi = Pu(o) : s === "onCompositionEnd" && Zi && (f = xl()));
      var h = yh(a, s);
      if (h.length > 0) {
        var y = new Zd(s, t, null, i, o);
        if (e.push({
          event: y,
          listeners: h
        }), f)
          y.data = f;
        else {
          var b = rp(i);
          b !== null && (y.data = b);
        }
      }
    }
    function ff(e, t) {
      switch (e) {
        case "compositionend":
          return rp(t);
        case "keypress":
          var a = t.which;
          return a !== sh ? null : (zs = !0, tp);
        case "textInput":
          var i = t.data;
          return i === tp && zs ? null : i;
        default:
          return null;
      }
    }
    function ph(e, t) {
      if (Zi) {
        if (e === "compositionend" || !Us && dh(e, t)) {
          var a = xl();
          return tf(), Zi = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!sf(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return lf && !cf(t) ? null : t.data;
        default:
          return null;
      }
    }
    function ky(e, t, a, i, o) {
      var s;
      if (Oy ? s = ff(t, i) : s = ph(t, i), !s)
        return null;
      var f = yh(a, "onBeforeInput");
      if (f.length > 0) {
        var h = new Do("onBeforeInput", "beforeinput", null, i, o);
        e.push({
          event: h,
          listeners: f
        }), h.data = s;
      }
    }
    function df(e, t, a, i, o, s, f) {
      ap(e, t, a, i, o), ky(e, t, a, i, o);
    }
    var Dy = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Ml(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Dy[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function My(e) {
      if (!_t)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function pf() {
      Kt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function n(e, t, a, i) {
      hc(i);
      var o = yh(t, "onChange");
      if (o.length > 0) {
        var s = new Fr("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: o
        });
      }
    }
    var r = null, u = null;
    function l(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function c(e) {
      var t = [];
      n(t, u, e, vc(e)), dd(d, t);
    }
    function d(e) {
      l0(e, 0);
    }
    function E(e) {
      var t = Sf(e);
      if (el(t))
        return e;
    }
    function x(e, t) {
      if (e === "change")
        return t;
    }
    var L = !1;
    _t && (L = My("input") && (!document.documentMode || document.documentMode > 9));
    function q(e, t) {
      r = e, u = t, r.attachEvent("onpropertychange", ve);
    }
    function de() {
      r && (r.detachEvent("onpropertychange", ve), r = null, u = null);
    }
    function ve(e) {
      e.propertyName === "value" && E(u) && c(e);
    }
    function fe(e, t, a) {
      e === "focusin" ? (de(), q(t, a)) : e === "focusout" && de();
    }
    function je(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return E(u);
    }
    function We(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function qe(e, t) {
      if (e === "click")
        return E(t);
    }
    function Xn(e, t) {
      if (e === "input" || e === "change")
        return E(t);
    }
    function F(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || lt(e, "number", e.value);
    }
    function j(e, t, a, i, o, s, f) {
      var h = a ? Sf(a) : window, y, b;
      if (l(h) ? y = x : Ml(h) ? L ? y = Xn : (y = je, b = fe) : We(h) && (y = qe), y) {
        var T = y(t, a);
        if (T) {
          n(e, T, i, o);
          return;
        }
      }
      b && b(t, h, a), t === "focusout" && F(h);
    }
    function I() {
      dt("onMouseEnter", ["mouseout", "mouseover"]), dt("onMouseLeave", ["mouseout", "mouseover"]), dt("onPointerEnter", ["pointerout", "pointerover"]), dt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function Ee(e, t, a, i, o, s, f) {
      var h = t === "mouseover" || t === "pointerover", y = t === "mouseout" || t === "pointerout";
      if (h && !Dv(i)) {
        var b = i.relatedTarget || i.fromElement;
        if (b && (Fs(b) || gp(b)))
          return;
      }
      if (!(!y && !h)) {
        var T;
        if (o.window === o)
          T = o;
        else {
          var P = o.ownerDocument;
          P ? T = P.defaultView || P.parentWindow : T = window;
        }
        var z, W;
        if (y) {
          var G = i.relatedTarget || i.toElement;
          if (z = a, W = G ? Fs(G) : null, W !== null) {
            var J = ba(W);
            (W !== J || W.tag !== ue && W.tag !== be) && (W = null);
          }
        } else
          z = null, W = a;
        if (z !== W) {
          var Ve = Fu, ot = "onMouseLeave", Je = "onMouseEnter", Qt = "mouse";
          (t === "pointerout" || t === "pointerover") && (Ve = Jd, ot = "onPointerLeave", Je = "onPointerEnter", Qt = "pointer");
          var Bt = z == null ? T : Sf(z), H = W == null ? T : Sf(W), ee = new Ve(ot, Qt + "leave", z, i, o);
          ee.target = Bt, ee.relatedTarget = H;
          var V = null, he = Fs(o);
          if (he === a) {
            var Be = new Ve(Je, Qt + "enter", W, i, o);
            Be.target = H, Be.relatedTarget = Bt, V = Be;
          }
          aR(e, ee, V, z, W);
        }
      }
    }
    function Xe(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Qe = typeof Object.is == "function" ? Object.is : Xe;
    function et(e, t) {
      if (Qe(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var o = 0; o < a.length; o++) {
        var s = a[o];
        if (!bt.call(t, s) || !Qe(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Et(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function yr(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function en(e, t) {
      for (var a = Et(e), i = 0, o = 0; a; ) {
        if (a.nodeType === Fi) {
          if (o = i + a.textContent.length, i <= t && o >= t)
            return {
              node: a,
              offset: t - i
            };
          i = o;
        }
        a = Et(yr(a));
      }
    }
    function Vu(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var o = i.anchorNode, s = i.anchorOffset, f = i.focusNode, h = i.focusOffset;
      try {
        o.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return Ny(e, o, s, f, h);
    }
    function Ny(e, t, a, i, o) {
      var s = 0, f = -1, h = -1, y = 0, b = 0, T = e, P = null;
      e:
        for (; ; ) {
          for (var z = null; T === t && (a === 0 || T.nodeType === Fi) && (f = s + a), T === i && (o === 0 || T.nodeType === Fi) && (h = s + o), T.nodeType === Fi && (s += T.nodeValue.length), (z = T.firstChild) !== null; )
            P = T, T = z;
          for (; ; ) {
            if (T === e)
              break e;
            if (P === t && ++y === a && (f = s), P === i && ++b === o && (h = s), (z = T.nextSibling) !== null)
              break;
            T = P, P = T.parentNode;
          }
          T = z;
        }
      return f === -1 || h === -1 ? null : {
        start: f,
        end: h
      };
    }
    function FT(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var o = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), h = t.end === void 0 ? f : Math.min(t.end, s);
        if (!o.extend && f > h) {
          var y = h;
          h = f, f = y;
        }
        var b = en(e, f), T = en(e, h);
        if (b && T) {
          if (o.rangeCount === 1 && o.anchorNode === b.node && o.anchorOffset === b.offset && o.focusNode === T.node && o.focusOffset === T.offset)
            return;
          var P = a.createRange();
          P.setStart(b.node, b.offset), o.removeAllRanges(), f > h ? (o.addRange(P), o.extend(T.node, T.offset)) : (P.setEnd(T.node, T.offset), o.addRange(P));
        }
      }
    }
    function KE(e) {
      return e && e.nodeType === Fi;
    }
    function XE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : KE(e) ? !1 : KE(t) ? XE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function HT(e) {
      return e && e.ownerDocument && XE(e.ownerDocument.documentElement, e);
    }
    function VT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function ZE() {
      for (var e = window, t = Eu(); t instanceof e.HTMLIFrameElement; ) {
        if (VT(t))
          e = t.contentWindow;
        else
          return t;
        t = Eu(e.document);
      }
      return t;
    }
    function Ly(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function BT() {
      var e = ZE();
      return {
        focusedElem: e,
        selectionRange: Ly(e) ? IT(e) : null
      };
    }
    function $T(e) {
      var t = ZE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && HT(a)) {
        i !== null && Ly(a) && YT(a, i);
        for (var o = [], s = a; s = s.parentNode; )
          s.nodeType === aa && o.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < o.length; f++) {
          var h = o[f];
          h.element.scrollLeft = h.left, h.element.scrollTop = h.top;
        }
      }
    }
    function IT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Vu(e), t || {
        start: 0,
        end: 0
      };
    }
    function YT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : FT(e, t);
    }
    var WT = _t && "documentMode" in document && document.documentMode <= 11;
    function QT() {
      Kt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var vf = null, Ay = null, ip = null, Uy = !1;
    function GT(e) {
      if ("selectionStart" in e && Ly(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function qT(e) {
      return e.window === e ? e.document : e.nodeType === ai ? e : e.ownerDocument;
    }
    function JE(e, t, a) {
      var i = qT(a);
      if (!(Uy || vf == null || vf !== Eu(i))) {
        var o = GT(vf);
        if (!ip || !et(ip, o)) {
          ip = o;
          var s = yh(Ay, "onSelect");
          if (s.length > 0) {
            var f = new Fr("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = vf;
          }
        }
      }
    }
    function KT(e, t, a, i, o, s, f) {
      var h = a ? Sf(a) : window;
      switch (t) {
        case "focusin":
          (Ml(h) || h.contentEditable === "true") && (vf = h, Ay = a, ip = null);
          break;
        case "focusout":
          vf = null, Ay = null, ip = null;
          break;
        case "mousedown":
          Uy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Uy = !1, JE(e, i, o);
          break;
        case "selectionchange":
          if (WT)
            break;
        case "keydown":
        case "keyup":
          JE(e, i, o);
      }
    }
    function vh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var hf = {
      animationend: vh("Animation", "AnimationEnd"),
      animationiteration: vh("Animation", "AnimationIteration"),
      animationstart: vh("Animation", "AnimationStart"),
      transitionend: vh("Transition", "TransitionEnd")
    }, zy = {}, e0 = {};
    _t && (e0 = document.createElement("div").style, "AnimationEvent" in window || (delete hf.animationend.animation, delete hf.animationiteration.animation, delete hf.animationstart.animation), "TransitionEvent" in window || delete hf.transitionend.transition);
    function hh(e) {
      if (zy[e])
        return zy[e];
      if (!hf[e])
        return e;
      var t = hf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in e0)
          return zy[e] = t[a];
      return e;
    }
    var t0 = hh("animationend"), n0 = hh("animationiteration"), r0 = hh("animationstart"), a0 = hh("transitionend"), i0 = /* @__PURE__ */ new Map(), u0 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Nl(e, t) {
      i0.set(e, t), Kt(t, [e]);
    }
    function XT() {
      for (var e = 0; e < u0.length; e++) {
        var t = u0[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        Nl(a, "on" + i);
      }
      Nl(t0, "onAnimationEnd"), Nl(n0, "onAnimationIteration"), Nl(r0, "onAnimationStart"), Nl("dblclick", "onDoubleClick"), Nl("focusin", "onFocus"), Nl("focusout", "onBlur"), Nl(a0, "onTransitionEnd");
    }
    function ZT(e, t, a, i, o, s, f) {
      var h = i0.get(t);
      if (h !== void 0) {
        var y = Fr, b = t;
        switch (t) {
          case "keypress":
            if (xo(i) === 0)
              return;
          case "keydown":
          case "keyup":
            y = Ry;
            break;
          case "focusin":
            b = "focus", y = rf;
            break;
          case "focusout":
            b = "blur", y = rf;
            break;
          case "beforeblur":
          case "afterblur":
            y = rf;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = Fu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = ko;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Ya;
            break;
          case t0:
          case n0:
          case r0:
            y = af;
            break;
          case a0:
            y = xy;
            break;
          case "scroll":
            y = Gd;
            break;
          case "wheel":
            y = of;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Cy;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Jd;
            break;
        }
        var T = (s & uo) !== 0;
        {
          var P = !T && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", z = nR(a, h, i.type, T, P);
          if (z.length > 0) {
            var W = new y(h, b, null, i, o);
            e.push({
              event: W,
              listeners: z
            });
          }
        }
      }
    }
    XT(), I(), pf(), QT(), ch();
    function JT(e, t, a, i, o, s, f) {
      ZT(e, t, a, i, o, s);
      var h = (s & ly) === 0;
      h && (Ee(e, t, a, i, o), j(e, t, a, i, o), KT(e, t, a, i, o), df(e, t, a, i, o));
    }
    var up = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], jy = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(up));
    function o0(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, $i(i, t, void 0, e), e.currentTarget = null;
    }
    function eR(e, t, a) {
      var i;
      if (a)
        for (var o = t.length - 1; o >= 0; o--) {
          var s = t[o], f = s.instance, h = s.currentTarget, y = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          o0(e, y, h), i = f;
        }
      else
        for (var b = 0; b < t.length; b++) {
          var T = t[b], P = T.instance, z = T.currentTarget, W = T.listener;
          if (P !== i && e.isPropagationStopped())
            return;
          o0(e, W, z), i = P;
        }
    }
    function l0(e, t) {
      for (var a = (t & uo) !== 0, i = 0; i < e.length; i++) {
        var o = e[i], s = o.event, f = o.listeners;
        eR(s, f, a);
      }
      md();
    }
    function tR(e, t, a, i, o) {
      var s = vc(a), f = [];
      JT(f, e, i, a, s, t), l0(f, t);
    }
    function Vn(e, t) {
      jy.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = M1(t), o = iR(e, a);
      i.has(o) || (s0(t, e, os, a), i.add(o));
    }
    function Py(e, t, a) {
      jy.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= uo), s0(a, e, i, t);
    }
    var mh = "_reactListening" + Math.random().toString(36).slice(2);
    function op(e) {
      if (!e[mh]) {
        e[mh] = !0, Re.forEach(function(a) {
          a !== "selectionchange" && (jy.has(a) || Py(a, !1, e), Py(a, !0, e));
        });
        var t = e.nodeType === ai ? e : e.ownerDocument;
        t !== null && (t[mh] || (t[mh] = !0, Py("selectionchange", !1, t)));
      }
    }
    function s0(e, t, a, i, o) {
      var s = Tl(e, t, a), f = void 0;
      ds && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? Xi(e, t, s, f) : _l(e, t, s) : f !== void 0 ? ef(e, t, s, f) : Qd(e, t, s);
    }
    function c0(e, t) {
      return e === t || e.nodeType === er && e.parentNode === t;
    }
    function Fy(e, t, a, i, o) {
      var s = i;
      if (!(t & Vi) && !(t & os)) {
        var f = o;
        if (i !== null) {
          var h = i;
          e:
            for (; ; ) {
              if (h === null)
                return;
              var y = h.tag;
              if (y === K || y === re) {
                var b = h.stateNode.containerInfo;
                if (c0(b, f))
                  break;
                if (y === re)
                  for (var T = h.return; T !== null; ) {
                    var P = T.tag;
                    if (P === K || P === re) {
                      var z = T.stateNode.containerInfo;
                      if (c0(z, f))
                        return;
                    }
                    T = T.return;
                  }
                for (; b !== null; ) {
                  var W = Fs(b);
                  if (W === null)
                    return;
                  var G = W.tag;
                  if (G === ue || G === be) {
                    h = s = W;
                    continue e;
                  }
                  b = b.parentNode;
                }
              }
              h = h.return;
            }
        }
      }
      dd(function() {
        return tR(e, t, a, s);
      });
    }
    function lp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function nR(e, t, a, i, o, s) {
      for (var f = t !== null ? t + "Capture" : null, h = i ? f : t, y = [], b = e, T = null; b !== null; ) {
        var P = b, z = P.stateNode, W = P.tag;
        if (W === ue && z !== null && (T = z, h !== null)) {
          var G = lo(b, h);
          G != null && y.push(lp(b, G, T));
        }
        if (o)
          break;
        b = b.return;
      }
      return y;
    }
    function yh(e, t) {
      for (var a = t + "Capture", i = [], o = e; o !== null; ) {
        var s = o, f = s.stateNode, h = s.tag;
        if (h === ue && f !== null) {
          var y = f, b = lo(o, a);
          b != null && i.unshift(lp(o, b, y));
          var T = lo(o, t);
          T != null && i.push(lp(o, T, y));
        }
        o = o.return;
      }
      return i;
    }
    function mf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== ue);
      return e || null;
    }
    function rR(e, t) {
      for (var a = e, i = t, o = 0, s = a; s; s = mf(s))
        o++;
      for (var f = 0, h = i; h; h = mf(h))
        f++;
      for (; o - f > 0; )
        a = mf(a), o--;
      for (; f - o > 0; )
        i = mf(i), f--;
      for (var y = o; y--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = mf(a), i = mf(i);
      }
      return null;
    }
    function f0(e, t, a, i, o) {
      for (var s = t._reactName, f = [], h = a; h !== null && h !== i; ) {
        var y = h, b = y.alternate, T = y.stateNode, P = y.tag;
        if (b !== null && b === i)
          break;
        if (P === ue && T !== null) {
          var z = T;
          if (o) {
            var W = lo(h, s);
            W != null && f.unshift(lp(h, W, z));
          } else if (!o) {
            var G = lo(h, s);
            G != null && f.push(lp(h, G, z));
          }
        }
        h = h.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function aR(e, t, a, i, o) {
      var s = i && o ? rR(i, o) : null;
      i !== null && f0(e, t, i, s, !1), o !== null && a !== null && f0(e, a, o, s, !0);
    }
    function iR(e, t) {
      return e + "__" + (t ? "capture" : "bubble");
    }
    var Wa = !1, sp = "dangerouslySetInnerHTML", gh = "suppressContentEditableWarning", Ll = "suppressHydrationWarning", d0 = "autoFocus", js = "children", Ps = "style", Sh = "__html", Hy, Eh, cp, p0, Ch, v0, h0;
    Hy = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Eh = function(e, t) {
      pc(e, t), od(e, t), kv(e, t, {
        registrationNameDependencies: vt,
        possibleRegistrationNames: zt
      });
    }, v0 = _t && !document.documentMode, cp = function(e, t, a) {
      if (!Wa) {
        var i = bh(a), o = bh(t);
        o !== i && (Wa = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(o), JSON.stringify(i)));
      }
    }, p0 = function(e) {
      if (!Wa) {
        Wa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, Ch = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, h0 = function(e, t) {
      var a = e.namespaceURI === Pi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var uR = /\r\n?/g, oR = /\u0000|\uFFFD/g;
    function bh(e) {
      gn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(uR, `
`).replace(oR, "");
    }
    function wh(e, t, a, i) {
      var o = bh(t), s = bh(e);
      if (s !== o && (i && (Wa || (Wa = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, o))), a && Ne))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function m0(e) {
      return e.nodeType === ai ? e : e.ownerDocument;
    }
    function lR() {
    }
    function Th(e) {
      e.onclick = lR;
    }
    function sR(e, t, a, i, o) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === Ps)
            f && Object.freeze(f), Sv(t, f);
          else if (s === sp) {
            var h = f ? f[Sh] : void 0;
            h != null && lv(t, h);
          } else if (s === js)
            if (typeof f == "string") {
              var y = e !== "textarea" || f !== "";
              y && sc(t, f);
            } else
              typeof f == "number" && sc(t, "" + f);
          else
            s === gh || s === Ll || s === d0 || (vt.hasOwnProperty(s) ? f != null && (typeof f != "function" && Ch(s, f), s === "onScroll" && Vn("scroll", t)) : f != null && Sa(t, s, f, o));
        }
    }
    function cR(e, t, a, i) {
      for (var o = 0; o < t.length; o += 2) {
        var s = t[o], f = t[o + 1];
        s === Ps ? Sv(e, f) : s === sp ? lv(e, f) : s === js ? sc(e, f) : Sa(e, s, f, i);
      }
    }
    function fR(e, t, a, i) {
      var o, s = m0(a), f, h = i;
      if (h === Pi && (h = oc(e)), h === Pi) {
        if (o = Hi(e, t), !o && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var y = s.createElement("div");
          y.innerHTML = "<script><\/script>";
          var b = y.firstChild;
          f = y.removeChild(b);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var T = f;
          t.multiple ? T.multiple = !0 : t.size && (T.size = t.size);
        }
      } else
        f = s.createElementNS(h, e);
      return h === Pi && !o && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !bt.call(Hy, e) && (Hy[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function dR(e, t) {
      return m0(t).createTextNode(e);
    }
    function pR(e, t, a, i) {
      var o = Hi(t, a);
      Eh(t, a);
      var s;
      switch (t) {
        case "dialog":
          Vn("cancel", e), Vn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          Vn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < up.length; f++)
            Vn(up[f], e);
          s = a;
          break;
        case "source":
          Vn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          Vn("error", e), Vn("load", e), s = a;
          break;
        case "details":
          Vn("toggle", e), s = a;
          break;
        case "input":
          k(e, a), s = g(e, a), Vn("invalid", e);
          break;
        case "option":
          hn(e, a), s = a;
          break;
        case "select":
          rs(e, a), s = ns(e, a), Vn("invalid", e);
          break;
        case "textarea":
          iv(e, a), s = Zf(e, a), Vn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (fc(t, s), sR(t, e, i, s, o), t) {
        case "input":
          La(e), Se(e, a, !1);
          break;
        case "textarea":
          La(e), ov(e);
          break;
        case "option":
          En(e, a);
          break;
        case "select":
          Kf(e, a);
          break;
        default:
          typeof s.onClick == "function" && Th(e);
          break;
      }
    }
    function vR(e, t, a, i, o) {
      Eh(t, i);
      var s = null, f, h;
      switch (t) {
        case "input":
          f = g(e, a), h = g(e, i), s = [];
          break;
        case "select":
          f = ns(e, a), h = ns(e, i), s = [];
          break;
        case "textarea":
          f = Zf(e, a), h = Zf(e, i), s = [];
          break;
        default:
          f = a, h = i, typeof f.onClick != "function" && typeof h.onClick == "function" && Th(e);
          break;
      }
      fc(t, h);
      var y, b, T = null;
      for (y in f)
        if (!(h.hasOwnProperty(y) || !f.hasOwnProperty(y) || f[y] == null))
          if (y === Ps) {
            var P = f[y];
            for (b in P)
              P.hasOwnProperty(b) && (T || (T = {}), T[b] = "");
          } else
            y === sp || y === js || y === gh || y === Ll || y === d0 || (vt.hasOwnProperty(y) ? s || (s = []) : (s = s || []).push(y, null));
      for (y in h) {
        var z = h[y], W = f != null ? f[y] : void 0;
        if (!(!h.hasOwnProperty(y) || z === W || z == null && W == null))
          if (y === Ps)
            if (z && Object.freeze(z), W) {
              for (b in W)
                W.hasOwnProperty(b) && (!z || !z.hasOwnProperty(b)) && (T || (T = {}), T[b] = "");
              for (b in z)
                z.hasOwnProperty(b) && W[b] !== z[b] && (T || (T = {}), T[b] = z[b]);
            } else
              T || (s || (s = []), s.push(y, T)), T = z;
          else if (y === sp) {
            var G = z ? z[Sh] : void 0, J = W ? W[Sh] : void 0;
            G != null && J !== G && (s = s || []).push(y, G);
          } else
            y === js ? (typeof z == "string" || typeof z == "number") && (s = s || []).push(y, "" + z) : y === gh || y === Ll || (vt.hasOwnProperty(y) ? (z != null && (typeof z != "function" && Ch(y, z), y === "onScroll" && Vn("scroll", e)), !s && W !== z && (s = [])) : (s = s || []).push(y, z));
      }
      return T && (is(T, h[Ps]), (s = s || []).push(Ps, T)), s;
    }
    function hR(e, t, a, i, o) {
      a === "input" && o.type === "radio" && o.name != null && Q(e, o);
      var s = Hi(a, i), f = Hi(a, o);
      switch (cR(e, t, s, f), a) {
        case "input":
          X(e, o);
          break;
        case "textarea":
          uv(e, o);
          break;
        case "select":
          Zm(e, o);
          break;
      }
    }
    function mR(e) {
      {
        var t = e.toLowerCase();
        return dc.hasOwnProperty(t) && dc[t] || null;
      }
    }
    function yR(e, t, a, i, o, s, f) {
      var h, y;
      switch (h = Hi(t, a), Eh(t, a), t) {
        case "dialog":
          Vn("cancel", e), Vn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          Vn("load", e);
          break;
        case "video":
        case "audio":
          for (var b = 0; b < up.length; b++)
            Vn(up[b], e);
          break;
        case "source":
          Vn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          Vn("error", e), Vn("load", e);
          break;
        case "details":
          Vn("toggle", e);
          break;
        case "input":
          k(e, a), Vn("invalid", e);
          break;
        case "option":
          hn(e, a);
          break;
        case "select":
          rs(e, a), Vn("invalid", e);
          break;
        case "textarea":
          iv(e, a), Vn("invalid", e);
          break;
      }
      fc(t, a);
      {
        y = /* @__PURE__ */ new Set();
        for (var T = e.attributes, P = 0; P < T.length; P++) {
          var z = T[P].name.toLowerCase();
          switch (z) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              y.add(T[P].name);
          }
        }
      }
      var W = null;
      for (var G in a)
        if (a.hasOwnProperty(G)) {
          var J = a[G];
          if (G === js)
            typeof J == "string" ? e.textContent !== J && (a[Ll] !== !0 && wh(e.textContent, J, s, f), W = [js, J]) : typeof J == "number" && e.textContent !== "" + J && (a[Ll] !== !0 && wh(e.textContent, J, s, f), W = [js, "" + J]);
          else if (vt.hasOwnProperty(G))
            J != null && (typeof J != "function" && Ch(G, J), G === "onScroll" && Vn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof h == "boolean") {
            var Ve = void 0, ot = h && U ? null : Me(G);
            if (a[Ll] !== !0) {
              if (!(G === gh || G === Ll || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              G === "value" || G === "checked" || G === "selected")) {
                if (G === sp) {
                  var Je = e.innerHTML, Qt = J ? J[Sh] : void 0;
                  if (Qt != null) {
                    var Bt = h0(e, Qt);
                    Bt !== Je && cp(G, Je, Bt);
                  }
                } else if (G === Ps) {
                  if (y.delete(G), v0) {
                    var H = uy(J);
                    Ve = e.getAttribute("style"), H !== Ve && cp(G, Ve, H);
                  }
                } else if (h && !U)
                  y.delete(G.toLowerCase()), Ve = pi(e, G, J), J !== Ve && cp(G, Ve, J);
                else if (!Nt(G, ot, h) && !se(G, J, ot, h)) {
                  var ee = !1;
                  if (ot !== null)
                    y.delete(ot.attributeName), Ve = ga(e, G, J, ot);
                  else {
                    var V = i;
                    if (V === Pi && (V = oc(t)), V === Pi)
                      y.delete(G.toLowerCase());
                    else {
                      var he = mR(G);
                      he !== null && he !== G && (ee = !0, y.delete(he)), y.delete(G);
                    }
                    Ve = pi(e, G, J);
                  }
                  var Be = U;
                  !Be && J !== Ve && !ee && cp(G, Ve, J);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      y.size > 0 && a[Ll] !== !0 && p0(y), t) {
        case "input":
          La(e), Se(e, a, !0);
          break;
        case "textarea":
          La(e), ov(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Th(e);
          break;
      }
      return W;
    }
    function gR(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Vy(e, t) {
      {
        if (Wa)
          return;
        Wa = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function By(e, t) {
      {
        if (Wa)
          return;
        Wa = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function $y(e, t, a) {
      {
        if (Wa)
          return;
        Wa = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Iy(e, t) {
      {
        if (t === "" || Wa)
          return;
        Wa = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function SR(e, t, a) {
      switch (t) {
        case "input":
          ct(e, a);
          return;
        case "textarea":
          Jf(e, a);
          return;
        case "select":
          Jm(e, a);
          return;
      }
    }
    var fp = function() {
    }, dp = function() {
    };
    {
      var ER = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], y0 = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], CR = y0.concat(["button"]), bR = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], g0 = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      dp = function(e, t) {
        var a = jt({}, e || g0), i = {
          tag: t
        };
        return y0.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), CR.indexOf(t) !== -1 && (a.pTagInButtonScope = null), ER.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var wR = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return bR.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, TR = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, S0 = {};
      fp = function(e, t, a) {
        a = a || g0;
        var i = a.current, o = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = wR(e, o) ? null : i, f = s ? null : TR(e, a), h = s || f;
        if (h) {
          var y = h.tag, b = !!s + "|" + e + "|" + y;
          if (!S0[b]) {
            S0[b] = !0;
            var T = e, P = "";
            if (e === "#text" ? /\S/.test(t) ? T = "Text nodes" : (T = "Whitespace text nodes", P = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : T = "<" + e + ">", s) {
              var z = "";
              y === "table" && e === "tr" && (z += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", T, y, P, z);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", T, y);
          }
        }
      };
    }
    var Rh = "suppressHydrationWarning", _h = "$", xh = "/$", pp = "$?", vp = "$!", RR = "style", Yy = null, Wy = null;
    function _R(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case ai:
        case ao: {
          t = i === ai ? "#document" : "#fragment";
          var o = e.documentElement;
          a = o ? o.namespaceURI : td(null, "");
          break;
        }
        default: {
          var s = i === er ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = td(f, t);
          break;
        }
      }
      {
        var h = t.toLowerCase(), y = dp(null, h);
        return {
          namespace: a,
          ancestorInfo: y
        };
      }
    }
    function xR(e, t, a) {
      {
        var i = e, o = td(i.namespace, t), s = dp(i.ancestorInfo, t);
        return {
          namespace: o,
          ancestorInfo: s
        };
      }
    }
    function wM(e) {
      return e;
    }
    function OR(e) {
      Yy = _a(), Wy = BT();
      var t = null;
      return mr(!1), t;
    }
    function kR(e) {
      $T(Wy), mr(Yy), Yy = null, Wy = null;
    }
    function DR(e, t, a, i, o) {
      var s;
      {
        var f = i;
        if (fp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var h = "" + t.children, y = dp(f.ancestorInfo, e);
          fp(null, h, y);
        }
        s = f.namespace;
      }
      var b = fR(e, t, a, s);
      return yp(o, b), eg(b, t), b;
    }
    function MR(e, t) {
      e.appendChild(t);
    }
    function NR(e, t, a, i, o) {
      switch (pR(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function LR(e, t, a, i, o, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var h = "" + i.children, y = dp(f.ancestorInfo, t);
          fp(null, h, y);
        }
      }
      return vR(e, t, a, i);
    }
    function Qy(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function AR(e, t, a, i) {
      {
        var o = a;
        fp(null, e, o.ancestorInfo);
      }
      var s = dR(e, t);
      return yp(i, s), s;
    }
    function UR() {
      var e = window.event;
      return e === void 0 ? Gi : Ir(e.type);
    }
    var Gy = typeof setTimeout == "function" ? setTimeout : void 0, zR = typeof clearTimeout == "function" ? clearTimeout : void 0, qy = -1, E0 = typeof Promise == "function" ? Promise : void 0, jR = typeof queueMicrotask == "function" ? queueMicrotask : typeof E0 < "u" ? function(e) {
      return E0.resolve(null).then(e).catch(PR);
    } : Gy;
    function PR(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function FR(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function HR(e, t, a, i, o, s) {
      hR(e, t, a, i, o), eg(e, o);
    }
    function C0(e) {
      sc(e, "");
    }
    function VR(e, t, a) {
      e.nodeValue = a;
    }
    function BR(e, t) {
      e.appendChild(t);
    }
    function $R(e, t) {
      var a;
      e.nodeType === er ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Th(a);
    }
    function IR(e, t, a) {
      e.insertBefore(t, a);
    }
    function YR(e, t, a) {
      e.nodeType === er ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function WR(e, t) {
      e.removeChild(t);
    }
    function QR(e, t) {
      e.nodeType === er ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Ky(e, t) {
      var a = t, i = 0;
      do {
        var o = a.nextSibling;
        if (e.removeChild(a), o && o.nodeType === er) {
          var s = o.data;
          if (s === xh)
            if (i === 0) {
              e.removeChild(o), Vt(t);
              return;
            } else
              i--;
          else
            (s === _h || s === pp || s === vp) && i++;
        }
        a = o;
      } while (a);
      Vt(t);
    }
    function GR(e, t) {
      e.nodeType === er ? Ky(e.parentNode, t) : e.nodeType === aa && Ky(e, t), Vt(e);
    }
    function qR(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function KR(e) {
      e.nodeValue = "";
    }
    function XR(e, t) {
      e = e;
      var a = t[RR], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = cc("display", i);
    }
    function ZR(e, t) {
      e.nodeValue = t;
    }
    function JR(e) {
      e.nodeType === aa ? e.textContent = "" : e.nodeType === ai && e.documentElement && e.removeChild(e.documentElement);
    }
    function e1(e, t, a) {
      return e.nodeType !== aa || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function t1(e, t) {
      return t === "" || e.nodeType !== Fi ? null : e;
    }
    function n1(e) {
      return e.nodeType !== er ? null : e;
    }
    function b0(e) {
      return e.data === pp;
    }
    function Xy(e) {
      return e.data === vp;
    }
    function r1(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, o;
      return t && (a = t.dgst, i = t.msg, o = t.stck), {
        message: i,
        digest: a,
        stack: o
      };
    }
    function a1(e, t) {
      e._reactRetry = t;
    }
    function Oh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === aa || t === Fi)
          break;
        if (t === er) {
          var a = e.data;
          if (a === _h || a === vp || a === pp)
            break;
          if (a === xh)
            return null;
        }
      }
      return e;
    }
    function hp(e) {
      return Oh(e.nextSibling);
    }
    function i1(e) {
      return Oh(e.firstChild);
    }
    function u1(e) {
      return Oh(e.firstChild);
    }
    function o1(e) {
      return Oh(e.nextSibling);
    }
    function l1(e, t, a, i, o, s, f) {
      yp(s, e), eg(e, a);
      var h;
      {
        var y = o;
        h = y.namespace;
      }
      var b = (s.mode & Ft) !== st;
      return yR(e, t, a, h, i, b, f);
    }
    function s1(e, t, a, i) {
      return yp(a, e), a.mode & Ft, gR(e, t);
    }
    function c1(e, t) {
      yp(t, e);
    }
    function f1(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === er) {
          var i = t.data;
          if (i === xh) {
            if (a === 0)
              return hp(t);
            a--;
          } else
            (i === _h || i === vp || i === pp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function w0(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === er) {
          var i = t.data;
          if (i === _h || i === vp || i === pp) {
            if (a === 0)
              return t;
            a--;
          } else
            i === xh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function d1(e) {
      Vt(e);
    }
    function p1(e) {
      Vt(e);
    }
    function v1(e) {
      return e !== "head" && e !== "body";
    }
    function h1(e, t, a, i) {
      var o = !0;
      wh(t.nodeValue, a, i, o);
    }
    function m1(e, t, a, i, o, s) {
      if (t[Rh] !== !0) {
        var f = !0;
        wh(i.nodeValue, o, s, f);
      }
    }
    function y1(e, t) {
      t.nodeType === aa ? Vy(e, t) : t.nodeType === er || By(e, t);
    }
    function g1(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === aa ? Vy(a, t) : t.nodeType === er || By(a, t));
      }
    }
    function S1(e, t, a, i, o) {
      (o || t[Rh] !== !0) && (i.nodeType === aa ? Vy(a, i) : i.nodeType === er || By(a, i));
    }
    function E1(e, t, a) {
      $y(e, t);
    }
    function C1(e, t) {
      Iy(e, t);
    }
    function b1(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && $y(i, t);
      }
    }
    function w1(e, t) {
      {
        var a = e.parentNode;
        a !== null && Iy(a, t);
      }
    }
    function T1(e, t, a, i, o, s) {
      (s || t[Rh] !== !0) && $y(a, i);
    }
    function R1(e, t, a, i, o) {
      (o || t[Rh] !== !0) && Iy(a, i);
    }
    function _1(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function x1(e) {
      op(e);
    }
    var yf = Math.random().toString(36).slice(2), gf = "__reactFiber$" + yf, Zy = "__reactProps$" + yf, mp = "__reactContainer$" + yf, Jy = "__reactEvents$" + yf, O1 = "__reactListeners$" + yf, k1 = "__reactHandles$" + yf;
    function D1(e) {
      delete e[gf], delete e[Zy], delete e[Jy], delete e[O1], delete e[k1];
    }
    function yp(e, t) {
      t[gf] = e;
    }
    function kh(e, t) {
      t[mp] = e;
    }
    function T0(e) {
      e[mp] = null;
    }
    function gp(e) {
      return !!e[mp];
    }
    function Fs(e) {
      var t = e[gf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[mp] || a[gf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var o = w0(e); o !== null; ) {
              var s = o[gf];
              if (s)
                return s;
              o = w0(o);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Al(e) {
      var t = e[gf] || e[mp];
      return t && (t.tag === ue || t.tag === be || t.tag === _e || t.tag === K) ? t : null;
    }
    function Sf(e) {
      if (e.tag === ue || e.tag === be)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Dh(e) {
      return e[Zy] || null;
    }
    function eg(e, t) {
      e[Zy] = t;
    }
    function M1(e) {
      var t = e[Jy];
      return t === void 0 && (t = e[Jy] = /* @__PURE__ */ new Set()), t;
    }
    var R0 = {}, _0 = p.ReactDebugCurrentFrame;
    function Mh(e) {
      if (e) {
        var t = e._owner, a = gi(e.type, e._source, t ? t.type : null);
        _0.setExtraStackFrame(a);
      } else
        _0.setExtraStackFrame(null);
    }
    function Ji(e, t, a, i, o) {
      {
        var s = Function.call.bind(bt);
        for (var f in e)
          if (s(e, f)) {
            var h = void 0;
            try {
              if (typeof e[f] != "function") {
                var y = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw y.name = "Invariant Violation", y;
              }
              h = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (b) {
              h = b;
            }
            h && !(h instanceof Error) && (Mh(o), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof h), Mh(null)), h instanceof Error && !(h.message in R0) && (R0[h.message] = !0, Mh(o), S("Failed %s type: %s", a, h.message), Mh(null));
          }
      }
    }
    var tg = [], Nh;
    Nh = [];
    var Lo = -1;
    function Ul(e) {
      return {
        current: e
      };
    }
    function pa(e, t) {
      if (Lo < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== Nh[Lo] && S("Unexpected Fiber popped."), e.current = tg[Lo], tg[Lo] = null, Nh[Lo] = null, Lo--;
    }
    function va(e, t, a) {
      Lo++, tg[Lo] = e.current, Nh[Lo] = a, e.current = t;
    }
    var ng;
    ng = {};
    var si = {};
    Object.freeze(si);
    var Ao = Ul(si), Bu = Ul(!1), rg = si;
    function Ef(e, t, a) {
      return a && $u(t) ? rg : Ao.current;
    }
    function x0(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Cf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return si;
        var o = e.stateNode;
        if (o && o.__reactInternalMemoizedUnmaskedChildContext === t)
          return o.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var h = Tt(e) || "Unknown";
          Ji(i, s, "context", h);
        }
        return o && x0(e, t, s), s;
      }
    }
    function Lh() {
      return Bu.current;
    }
    function $u(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Ah(e) {
      pa(Bu, e), pa(Ao, e);
    }
    function ag(e) {
      pa(Bu, e), pa(Ao, e);
    }
    function O0(e, t, a) {
      {
        if (Ao.current !== si)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        va(Ao, t, e), va(Bu, a, e);
      }
    }
    function k0(e, t, a) {
      {
        var i = e.stateNode, o = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = Tt(e) || "Unknown";
            ng[s] || (ng[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var h in f)
          if (!(h in o))
            throw new Error((Tt(e) || "Unknown") + '.getChildContext(): key "' + h + '" is not defined in childContextTypes.');
        {
          var y = Tt(e) || "Unknown";
          Ji(o, f, "child context", y);
        }
        return jt({}, a, f);
      }
    }
    function Uh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || si;
        return rg = Ao.current, va(Ao, a, e), va(Bu, Bu.current, e), !0;
      }
    }
    function D0(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var o = k0(e, t, rg);
          i.__reactInternalMemoizedMergedChildContext = o, pa(Bu, e), pa(Ao, e), va(Ao, o, e), va(Bu, a, e);
        } else
          pa(Bu, e), va(Bu, a, e);
      }
    }
    function N1(e) {
      {
        if (!Cd(e) || e.tag !== $)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case K:
              return t.stateNode.context;
            case $: {
              var a = t.type;
              if ($u(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var zl = 0, zh = 1, Uo = null, ig = !1, ug = !1;
    function M0(e) {
      Uo === null ? Uo = [e] : Uo.push(e);
    }
    function L1(e) {
      ig = !0, M0(e);
    }
    function N0() {
      ig && jl();
    }
    function jl() {
      if (!ug && Uo !== null) {
        ug = !0;
        var e = 0, t = Ba();
        try {
          var a = !0, i = Uo;
          for (or(Ar); e < i.length; e++) {
            var o = i[e];
            do
              o = o(a);
            while (o !== null);
          }
          Uo = null, ig = !1;
        } catch (s) {
          throw Uo !== null && (Uo = Uo.slice(e + 1)), Cc(wc, jl), s;
        } finally {
          or(t), ug = !1;
        }
      }
      return null;
    }
    var bf = [], wf = 0, jh = null, Ph = 0, xi = [], Oi = 0, Hs = null, zo = 1, jo = "";
    function A1(e) {
      return Bs(), (e.flags & gd) !== nt;
    }
    function U1(e) {
      return Bs(), Ph;
    }
    function z1() {
      var e = jo, t = zo, a = t & ~j1(t);
      return a.toString(32) + e;
    }
    function Vs(e, t) {
      Bs(), bf[wf++] = Ph, bf[wf++] = jh, jh = e, Ph = t;
    }
    function L0(e, t, a) {
      Bs(), xi[Oi++] = zo, xi[Oi++] = jo, xi[Oi++] = Hs, Hs = e;
      var i = zo, o = jo, s = Fh(i) - 1, f = i & ~(1 << s), h = a + 1, y = Fh(t) + s;
      if (y > 30) {
        var b = s - s % 5, T = (1 << b) - 1, P = (f & T).toString(32), z = f >> b, W = s - b, G = Fh(t) + W, J = h << W, Ve = J | z, ot = P + o;
        zo = 1 << G | Ve, jo = ot;
      } else {
        var Je = h << s, Qt = Je | f, Bt = o;
        zo = 1 << y | Qt, jo = Bt;
      }
    }
    function og(e) {
      Bs();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Vs(e, a), L0(e, a, i);
      }
    }
    function Fh(e) {
      return 32 - kc(e);
    }
    function j1(e) {
      return 1 << Fh(e) - 1;
    }
    function lg(e) {
      for (; e === jh; )
        jh = bf[--wf], bf[wf] = null, Ph = bf[--wf], bf[wf] = null;
      for (; e === Hs; )
        Hs = xi[--Oi], xi[Oi] = null, jo = xi[--Oi], xi[Oi] = null, zo = xi[--Oi], xi[Oi] = null;
    }
    function P1() {
      return Bs(), Hs !== null ? {
        id: zo,
        overflow: jo
      } : null;
    }
    function F1(e, t) {
      Bs(), xi[Oi++] = zo, xi[Oi++] = jo, xi[Oi++] = Hs, zo = t.id, jo = t.overflow, Hs = e;
    }
    function Bs() {
      Wr() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Yr = null, ki = null, eu = !1, $s = !1, Pl = null;
    function H1() {
      eu && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function A0() {
      $s = !0;
    }
    function V1() {
      return $s;
    }
    function B1(e) {
      var t = e.stateNode.containerInfo;
      return ki = u1(t), Yr = e, eu = !0, Pl = null, $s = !1, !0;
    }
    function $1(e, t, a) {
      return ki = o1(t), Yr = e, eu = !0, Pl = null, $s = !1, a !== null && F1(e, a), !0;
    }
    function U0(e, t) {
      switch (e.tag) {
        case K: {
          y1(e.stateNode.containerInfo, t);
          break;
        }
        case ue: {
          var a = (e.mode & Ft) !== st;
          S1(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case _e: {
          var i = e.memoizedState;
          i.dehydrated !== null && g1(i.dehydrated, t);
          break;
        }
      }
    }
    function z0(e, t) {
      U0(e, t);
      var a = WO();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= ln) : i.push(a);
    }
    function sg(e, t) {
      {
        if ($s)
          return;
        switch (e.tag) {
          case K: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ue:
                var i = t.type;
                t.pendingProps, E1(a, i);
                break;
              case be:
                var o = t.pendingProps;
                C1(a, o);
                break;
            }
            break;
          }
          case ue: {
            var s = e.type, f = e.memoizedProps, h = e.stateNode;
            switch (t.tag) {
              case ue: {
                var y = t.type, b = t.pendingProps, T = (e.mode & Ft) !== st;
                T1(
                  s,
                  f,
                  h,
                  y,
                  b,
                  // TODO: Delete this argument when we remove the legacy root API.
                  T
                );
                break;
              }
              case be: {
                var P = t.pendingProps, z = (e.mode & Ft) !== st;
                R1(
                  s,
                  f,
                  h,
                  P,
                  // TODO: Delete this argument when we remove the legacy root API.
                  z
                );
                break;
              }
            }
            break;
          }
          case _e: {
            var W = e.memoizedState, G = W.dehydrated;
            if (G !== null)
              switch (t.tag) {
                case ue:
                  var J = t.type;
                  t.pendingProps, b1(G, J);
                  break;
                case be:
                  var Ve = t.pendingProps;
                  w1(G, Ve);
                  break;
              }
            break;
          }
          default:
            return;
        }
      }
    }
    function j0(e, t) {
      t.flags = t.flags & ~ja | xn, sg(e, t);
    }
    function P0(e, t) {
      switch (e.tag) {
        case ue: {
          var a = e.type;
          e.pendingProps;
          var i = e1(t, a);
          return i !== null ? (e.stateNode = i, Yr = e, ki = i1(i), !0) : !1;
        }
        case be: {
          var o = e.pendingProps, s = t1(t, o);
          return s !== null ? (e.stateNode = s, Yr = e, ki = null, !0) : !1;
        }
        case _e: {
          var f = n1(t);
          if (f !== null) {
            var h = {
              dehydrated: f,
              treeContext: P1(),
              retryLane: fa
            };
            e.memoizedState = h;
            var y = QO(f);
            return y.return = e, e.child = y, Yr = e, ki = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function cg(e) {
      return (e.mode & Ft) !== st && (e.flags & St) === nt;
    }
    function fg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function dg(e) {
      if (eu) {
        var t = ki;
        if (!t) {
          cg(e) && (sg(Yr, e), fg()), j0(Yr, e), eu = !1, Yr = e;
          return;
        }
        var a = t;
        if (!P0(e, t)) {
          cg(e) && (sg(Yr, e), fg()), t = hp(a);
          var i = Yr;
          if (!t || !P0(e, t)) {
            j0(Yr, e), eu = !1, Yr = e;
            return;
          }
          z0(i, a);
        }
      }
    }
    function I1(e, t, a) {
      var i = e.stateNode, o = !$s, s = l1(i, e.type, e.memoizedProps, t, a, e, o);
      return e.updateQueue = s, s !== null;
    }
    function Y1(e) {
      var t = e.stateNode, a = e.memoizedProps, i = s1(t, a, e);
      if (i) {
        var o = Yr;
        if (o !== null)
          switch (o.tag) {
            case K: {
              var s = o.stateNode.containerInfo, f = (o.mode & Ft) !== st;
              h1(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case ue: {
              var h = o.type, y = o.memoizedProps, b = o.stateNode, T = (o.mode & Ft) !== st;
              m1(
                h,
                y,
                b,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                T
              );
              break;
            }
          }
      }
      return i;
    }
    function W1(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      c1(a, e);
    }
    function Q1(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return f1(a);
    }
    function F0(e) {
      for (var t = e.return; t !== null && t.tag !== ue && t.tag !== K && t.tag !== _e; )
        t = t.return;
      Yr = t;
    }
    function Hh(e) {
      if (e !== Yr)
        return !1;
      if (!eu)
        return F0(e), eu = !0, !1;
      if (e.tag !== K && (e.tag !== ue || v1(e.type) && !Qy(e.type, e.memoizedProps))) {
        var t = ki;
        if (t)
          if (cg(e))
            H0(e), fg();
          else
            for (; t; )
              z0(e, t), t = hp(t);
      }
      return F0(e), e.tag === _e ? ki = Q1(e) : ki = Yr ? hp(e.stateNode) : null, !0;
    }
    function G1() {
      return eu && ki !== null;
    }
    function H0(e) {
      for (var t = ki; t; )
        U0(e, t), t = hp(t);
    }
    function Tf() {
      Yr = null, ki = null, eu = !1, $s = !1;
    }
    function V0() {
      Pl !== null && (Ub(Pl), Pl = null);
    }
    function Wr() {
      return eu;
    }
    function pg(e) {
      Pl === null ? Pl = [e] : Pl.push(e);
    }
    var q1 = p.ReactCurrentBatchConfig, K1 = null;
    function X1() {
      return q1.transition;
    }
    var tu = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Z1 = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Fn && (t = a), a = a.return;
        return t;
      }, Is = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, Sp = [], Ep = [], Cp = [], bp = [], wp = [], Tp = [], Ys = /* @__PURE__ */ new Set();
      tu.recordUnsafeLifecycleWarnings = function(e, t) {
        Ys.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Sp.push(e), e.mode & Fn && typeof t.UNSAFE_componentWillMount == "function" && Ep.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Cp.push(e), e.mode & Fn && typeof t.UNSAFE_componentWillReceiveProps == "function" && bp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && wp.push(e), e.mode & Fn && typeof t.UNSAFE_componentWillUpdate == "function" && Tp.push(e));
      }, tu.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Sp.length > 0 && (Sp.forEach(function(z) {
          e.add(Tt(z) || "Component"), Ys.add(z.type);
        }), Sp = []);
        var t = /* @__PURE__ */ new Set();
        Ep.length > 0 && (Ep.forEach(function(z) {
          t.add(Tt(z) || "Component"), Ys.add(z.type);
        }), Ep = []);
        var a = /* @__PURE__ */ new Set();
        Cp.length > 0 && (Cp.forEach(function(z) {
          a.add(Tt(z) || "Component"), Ys.add(z.type);
        }), Cp = []);
        var i = /* @__PURE__ */ new Set();
        bp.length > 0 && (bp.forEach(function(z) {
          i.add(Tt(z) || "Component"), Ys.add(z.type);
        }), bp = []);
        var o = /* @__PURE__ */ new Set();
        wp.length > 0 && (wp.forEach(function(z) {
          o.add(Tt(z) || "Component"), Ys.add(z.type);
        }), wp = []);
        var s = /* @__PURE__ */ new Set();
        if (Tp.length > 0 && (Tp.forEach(function(z) {
          s.add(Tt(z) || "Component"), Ys.add(z.type);
        }), Tp = []), t.size > 0) {
          var f = Is(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var h = Is(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, h);
        }
        if (s.size > 0) {
          var y = Is(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, y);
        }
        if (e.size > 0) {
          var b = Is(e);
          N(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, b);
        }
        if (a.size > 0) {
          var T = Is(a);
          N(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, T);
        }
        if (o.size > 0) {
          var P = Is(o);
          N(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, P);
        }
      };
      var Vh = /* @__PURE__ */ new Map(), B0 = /* @__PURE__ */ new Set();
      tu.recordLegacyContextWarning = function(e, t) {
        var a = Z1(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!B0.has(e.type)) {
          var i = Vh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Vh.set(a, i)), i.push(e));
        }
      }, tu.flushLegacyContextWarning = function() {
        Vh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(Tt(s) || "Component"), B0.add(s.type);
            });
            var o = Is(i);
            try {
              cn(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, o);
            } finally {
              Bn();
            }
          }
        });
      }, tu.discardPendingWarnings = function() {
        Sp = [], Ep = [], Cp = [], bp = [], wp = [], Tp = [], Vh = /* @__PURE__ */ new Map();
      };
    }
    function nu(e, t) {
      if (e && e.defaultProps) {
        var a = jt({}, t), i = e.defaultProps;
        for (var o in i)
          a[o] === void 0 && (a[o] = i[o]);
        return a;
      }
      return t;
    }
    var vg = Ul(null), hg;
    hg = {};
    var Bh = null, Rf = null, mg = null, $h = !1;
    function Ih() {
      Bh = null, Rf = null, mg = null, $h = !1;
    }
    function $0() {
      $h = !0;
    }
    function I0() {
      $h = !1;
    }
    function Y0(e, t, a) {
      va(vg, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== hg && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = hg;
    }
    function yg(e, t) {
      var a = vg.current;
      pa(vg, t), e._currentValue = a;
    }
    function gg(e, t, a) {
      for (var i = e; i !== null; ) {
        var o = i.alternate;
        if (bo(i.childLanes, t) ? o !== null && !bo(o.childLanes, t) && (o.childLanes = Ut(o.childLanes, t)) : (i.childLanes = Ut(i.childLanes, t), o !== null && (o.childLanes = Ut(o.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function J1(e, t, a) {
      e_(e, t, a);
    }
    function e_(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var o = void 0, s = i.dependencies;
        if (s !== null) {
          o = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === $) {
                var h = ur(a), y = Po(bn, h);
                y.tag = Wh;
                var b = i.updateQueue;
                if (b !== null) {
                  var T = b.shared, P = T.pending;
                  P === null ? y.next = y : (y.next = P.next, P.next = y), T.pending = y;
                }
              }
              i.lanes = Ut(i.lanes, a);
              var z = i.alternate;
              z !== null && (z.lanes = Ut(z.lanes, a)), gg(i.return, a, e), s.lanes = Ut(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === Ae)
          o = i.type === e.type ? null : i.child;
        else if (i.tag === mt) {
          var W = i.return;
          if (W === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          W.lanes = Ut(W.lanes, a);
          var G = W.alternate;
          G !== null && (G.lanes = Ut(G.lanes, a)), gg(W, a, e), o = i.sibling;
        } else
          o = i.child;
        if (o !== null)
          o.return = i;
        else
          for (o = i; o !== null; ) {
            if (o === e) {
              o = null;
              break;
            }
            var J = o.sibling;
            if (J !== null) {
              J.return = o.return, o = J;
              break;
            }
            o = o.return;
          }
        i = o;
      }
    }
    function _f(e, t) {
      Bh = e, Rf = null, mg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (da(a.lanes, t) && Pp(), a.firstContext = null);
      }
    }
    function gr(e) {
      $h && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (mg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Rf === null) {
          if (Bh === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Rf = a, Bh.dependencies = {
            lanes: ne,
            firstContext: a
          };
        } else
          Rf = Rf.next = a;
      }
      return t;
    }
    var Ws = null;
    function Sg(e) {
      Ws === null ? Ws = [e] : Ws.push(e);
    }
    function t_() {
      if (Ws !== null) {
        for (var e = 0; e < Ws.length; e++) {
          var t = Ws[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, o = t.pending;
            if (o !== null) {
              var s = o.next;
              o.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        Ws = null;
      }
    }
    function W0(e, t, a, i) {
      var o = t.interleaved;
      return o === null ? (a.next = a, Sg(t)) : (a.next = o.next, o.next = a), t.interleaved = a, Yh(e, i);
    }
    function n_(e, t, a, i) {
      var o = t.interleaved;
      o === null ? (a.next = a, Sg(t)) : (a.next = o.next, o.next = a), t.interleaved = a;
    }
    function r_(e, t, a, i) {
      var o = t.interleaved;
      return o === null ? (a.next = a, Sg(t)) : (a.next = o.next, o.next = a), t.interleaved = a, Yh(e, i);
    }
    function Qa(e, t) {
      return Yh(e, t);
    }
    var a_ = Yh;
    function Yh(e, t) {
      e.lanes = Ut(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Ut(a.lanes, t)), a === null && (e.flags & (xn | ja)) !== nt && Qb(e);
      for (var i = e, o = e.return; o !== null; )
        o.childLanes = Ut(o.childLanes, t), a = o.alternate, a !== null ? a.childLanes = Ut(a.childLanes, t) : (o.flags & (xn | ja)) !== nt && Qb(e), i = o, o = o.return;
      if (i.tag === K) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var Q0 = 0, G0 = 1, Wh = 2, Eg = 3, Qh = !1, Cg, Gh;
    Cg = !1, Gh = null;
    function bg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: ne
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function q0(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var o = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = o;
      }
    }
    function Po(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: Q0,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Fl(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var o = i.shared;
      if (Gh === o && !Cg && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Cg = !0), aO()) {
        var s = o.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), o.pending = t, a_(e, a);
      } else
        return r_(e, o, t, a);
    }
    function qh(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var o = i.shared;
        if (Ad(a)) {
          var s = o.lanes;
          s = zd(s, e.pendingLanes);
          var f = Ut(s, a);
          o.lanes = f, Sl(e, f);
        }
      }
    }
    function wg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var o = i.updateQueue;
        if (a === o) {
          var s = null, f = null, h = a.firstBaseUpdate;
          if (h !== null) {
            var y = h;
            do {
              var b = {
                eventTime: y.eventTime,
                lane: y.lane,
                tag: y.tag,
                payload: y.payload,
                callback: y.callback,
                next: null
              };
              f === null ? s = f = b : (f.next = b, f = b), y = y.next;
            } while (y !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: o.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: o.shared,
            effects: o.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var T = a.lastBaseUpdate;
      T === null ? a.firstBaseUpdate = t : T.next = t, a.lastBaseUpdate = t;
    }
    function i_(e, t, a, i, o, s) {
      switch (a.tag) {
        case G0: {
          var f = a.payload;
          if (typeof f == "function") {
            $0();
            var h = f.call(s, i, o);
            {
              if (e.mode & Fn) {
                ir(!0);
                try {
                  f.call(s, i, o);
                } finally {
                  ir(!1);
                }
              }
              I0();
            }
            return h;
          }
          return f;
        }
        case Eg:
          e.flags = e.flags & ~pr | St;
        case Q0: {
          var y = a.payload, b;
          if (typeof y == "function") {
            $0(), b = y.call(s, i, o);
            {
              if (e.mode & Fn) {
                ir(!0);
                try {
                  y.call(s, i, o);
                } finally {
                  ir(!1);
                }
              }
              I0();
            }
          } else
            b = y;
          return b == null ? i : jt({}, i, b);
        }
        case Wh:
          return Qh = !0, i;
      }
      return i;
    }
    function Kh(e, t, a, i) {
      var o = e.updateQueue;
      Qh = !1, Gh = o.shared;
      var s = o.firstBaseUpdate, f = o.lastBaseUpdate, h = o.shared.pending;
      if (h !== null) {
        o.shared.pending = null;
        var y = h, b = y.next;
        y.next = null, f === null ? s = b : f.next = b, f = y;
        var T = e.alternate;
        if (T !== null) {
          var P = T.updateQueue, z = P.lastBaseUpdate;
          z !== f && (z === null ? P.firstBaseUpdate = b : z.next = b, P.lastBaseUpdate = y);
        }
      }
      if (s !== null) {
        var W = o.baseState, G = ne, J = null, Ve = null, ot = null, Je = s;
        do {
          var Qt = Je.lane, Bt = Je.eventTime;
          if (bo(i, Qt)) {
            if (ot !== null) {
              var ee = {
                eventTime: Bt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Yt,
                tag: Je.tag,
                payload: Je.payload,
                callback: Je.callback,
                next: null
              };
              ot = ot.next = ee;
            }
            W = i_(e, o, Je, W, t, a);
            var V = Je.callback;
            if (V !== null && // If the update was already committed, we should not queue its
            // callback again.
            Je.lane !== Yt) {
              e.flags |= Ci;
              var he = o.effects;
              he === null ? o.effects = [Je] : he.push(Je);
            }
          } else {
            var H = {
              eventTime: Bt,
              lane: Qt,
              tag: Je.tag,
              payload: Je.payload,
              callback: Je.callback,
              next: null
            };
            ot === null ? (Ve = ot = H, J = W) : ot = ot.next = H, G = Ut(G, Qt);
          }
          if (Je = Je.next, Je === null) {
            if (h = o.shared.pending, h === null)
              break;
            var Be = h, ze = Be.next;
            Be.next = null, Je = ze, o.lastBaseUpdate = Be, o.shared.pending = null;
          }
        } while (!0);
        ot === null && (J = W), o.baseState = J, o.firstBaseUpdate = Ve, o.lastBaseUpdate = ot;
        var ht = o.shared.interleaved;
        if (ht !== null) {
          var Ot = ht;
          do
            G = Ut(G, Ot.lane), Ot = Ot.next;
          while (Ot !== ht);
        } else
          s === null && (o.shared.lanes = ne);
        Kp(G), e.lanes = G, e.memoizedState = W;
      }
      Gh = null;
    }
    function u_(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function K0() {
      Qh = !1;
    }
    function Xh() {
      return Qh;
    }
    function X0(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var o = 0; o < i.length; o++) {
          var s = i[o], f = s.callback;
          f !== null && (s.callback = null, u_(f, a));
        }
    }
    var Tg = {}, Z0 = new v.Component().refs, Rg, _g, xg, Og, kg, J0, Zh, Dg, Mg, Ng;
    {
      Rg = /* @__PURE__ */ new Set(), _g = /* @__PURE__ */ new Set(), xg = /* @__PURE__ */ new Set(), Og = /* @__PURE__ */ new Set(), Dg = /* @__PURE__ */ new Set(), kg = /* @__PURE__ */ new Set(), Mg = /* @__PURE__ */ new Set(), Ng = /* @__PURE__ */ new Set();
      var eC = /* @__PURE__ */ new Set();
      Zh = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          eC.has(a) || (eC.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, J0 = function(e, t) {
        if (t === void 0) {
          var a = Zt(e) || "Component";
          kg.has(a) || (kg.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(Tg, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(Tg);
    }
    function Lg(e, t, a, i) {
      var o = e.memoizedState, s = a(i, o);
      {
        if (e.mode & Fn) {
          ir(!0);
          try {
            s = a(i, o);
          } finally {
            ir(!1);
          }
        }
        J0(t, s);
      }
      var f = s == null ? o : jt({}, o, s);
      if (e.memoizedState = f, e.lanes === ne) {
        var h = e.updateQueue;
        h.baseState = f;
      }
    }
    var Ag = {
      isMounted: wa,
      enqueueSetState: function(e, t, a) {
        var i = Ua(e), o = ka(), s = Ql(i), f = Po(o, s);
        f.payload = t, a != null && (Zh(a, "setState"), f.callback = a);
        var h = Fl(i, f, s);
        h !== null && (Mr(h, i, s, o), qh(h, i, s)), Lu(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = Ua(e), o = ka(), s = Ql(i), f = Po(o, s);
        f.tag = G0, f.payload = t, a != null && (Zh(a, "replaceState"), f.callback = a);
        var h = Fl(i, f, s);
        h !== null && (Mr(h, i, s, o), qh(h, i, s)), Lu(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Ua(e), i = ka(), o = Ql(a), s = Po(i, o);
        s.tag = Wh, t != null && (Zh(t, "forceUpdate"), s.callback = t);
        var f = Fl(a, s, o);
        f !== null && (Mr(f, a, o, i), qh(f, a, o)), Dd(a, o);
      }
    };
    function tC(e, t, a, i, o, s, f) {
      var h = e.stateNode;
      if (typeof h.shouldComponentUpdate == "function") {
        var y = h.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Fn) {
            ir(!0);
            try {
              y = h.shouldComponentUpdate(i, s, f);
            } finally {
              ir(!1);
            }
          }
          y === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Zt(t) || "Component");
        }
        return y;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !et(a, i) || !et(o, s) : !0;
    }
    function o_(e, t, a) {
      var i = e.stateNode;
      {
        var o = Zt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", o) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", o)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", o), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", o), t.contextType && t.contextTypes && !Mg.has(t) && (Mg.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", o)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Zt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o, o), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !xg.has(t) && (xg.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Zt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o);
        var h = i.state;
        h && (typeof h != "object" || $t(h)) && S("%s.state: must be set to an object or null", o), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o);
      }
    }
    function nC(e, t) {
      t.updater = Ag, e.stateNode = t, sl(t, e), t._reactInternalInstance = Tg;
    }
    function rC(e, t, a) {
      var i = !1, o = si, s = si, f = t.contextType;
      if ("contextType" in t) {
        var h = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === Oe && f._context === void 0
        );
        if (!h && !Ng.has(t)) {
          Ng.add(t);
          var y = "";
          f === void 0 ? y = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? y = " However, it is set to a " + typeof f + "." : f.$$typeof === ce ? y = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? y = " Did you accidentally pass the Context.Consumer instead?" : y = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Zt(t) || "Component", y);
        }
      }
      if (typeof f == "object" && f !== null)
        s = gr(f);
      else {
        o = Ef(e, t, !0);
        var b = t.contextTypes;
        i = b != null, s = i ? Cf(e, o) : si;
      }
      var T = new t(a, s);
      if (e.mode & Fn) {
        ir(!0);
        try {
          T = new t(a, s);
        } finally {
          ir(!1);
        }
      }
      var P = e.memoizedState = T.state !== null && T.state !== void 0 ? T.state : null;
      nC(e, T);
      {
        if (typeof t.getDerivedStateFromProps == "function" && P === null) {
          var z = Zt(t) || "Component";
          _g.has(z) || (_g.add(z), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", z, T.state === null ? "null" : "undefined", z));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof T.getSnapshotBeforeUpdate == "function") {
          var W = null, G = null, J = null;
          if (typeof T.componentWillMount == "function" && T.componentWillMount.__suppressDeprecationWarning !== !0 ? W = "componentWillMount" : typeof T.UNSAFE_componentWillMount == "function" && (W = "UNSAFE_componentWillMount"), typeof T.componentWillReceiveProps == "function" && T.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? G = "componentWillReceiveProps" : typeof T.UNSAFE_componentWillReceiveProps == "function" && (G = "UNSAFE_componentWillReceiveProps"), typeof T.componentWillUpdate == "function" && T.componentWillUpdate.__suppressDeprecationWarning !== !0 ? J = "componentWillUpdate" : typeof T.UNSAFE_componentWillUpdate == "function" && (J = "UNSAFE_componentWillUpdate"), W !== null || G !== null || J !== null) {
            var Ve = Zt(t) || "Component", ot = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            Og.has(Ve) || (Og.add(Ve), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, Ve, ot, W !== null ? `
  ` + W : "", G !== null ? `
  ` + G : "", J !== null ? `
  ` + J : ""));
          }
        }
      }
      return i && x0(e, o, s), T;
    }
    function l_(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Tt(e) || "Component"), Ag.enqueueReplaceState(t, t.state, null));
    }
    function aC(e, t, a, i) {
      var o = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== o) {
        {
          var s = Tt(e) || "Component";
          Rg.has(s) || (Rg.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        Ag.enqueueReplaceState(t, t.state, null);
      }
    }
    function Ug(e, t, a, i) {
      o_(e, t, a);
      var o = e.stateNode;
      o.props = a, o.state = e.memoizedState, o.refs = Z0, bg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        o.context = gr(s);
      else {
        var f = Ef(e, t, !0);
        o.context = Cf(e, f);
      }
      {
        if (o.state === a) {
          var h = Zt(t) || "Component";
          Dg.has(h) || (Dg.add(h), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", h));
        }
        e.mode & Fn && tu.recordLegacyContextWarning(e, o), tu.recordUnsafeLifecycleWarnings(e, o);
      }
      o.state = e.memoizedState;
      var y = t.getDerivedStateFromProps;
      if (typeof y == "function" && (Lg(e, t, y, a), o.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof o.getSnapshotBeforeUpdate != "function" && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function") && (l_(e, o), Kh(e, a, o, i), o.state = e.memoizedState), typeof o.componentDidMount == "function") {
        var b = At;
        b |= ua, (e.mode & Ha) !== st && (b |= oa), e.flags |= b;
      }
    }
    function s_(e, t, a, i) {
      var o = e.stateNode, s = e.memoizedProps;
      o.props = s;
      var f = o.context, h = t.contextType, y = si;
      if (typeof h == "object" && h !== null)
        y = gr(h);
      else {
        var b = Ef(e, t, !0);
        y = Cf(e, b);
      }
      var T = t.getDerivedStateFromProps, P = typeof T == "function" || typeof o.getSnapshotBeforeUpdate == "function";
      !P && (typeof o.UNSAFE_componentWillReceiveProps == "function" || typeof o.componentWillReceiveProps == "function") && (s !== a || f !== y) && aC(e, o, a, y), K0();
      var z = e.memoizedState, W = o.state = z;
      if (Kh(e, a, o, i), W = e.memoizedState, s === a && z === W && !Lh() && !Xh()) {
        if (typeof o.componentDidMount == "function") {
          var G = At;
          G |= ua, (e.mode & Ha) !== st && (G |= oa), e.flags |= G;
        }
        return !1;
      }
      typeof T == "function" && (Lg(e, t, T, a), W = e.memoizedState);
      var J = Xh() || tC(e, t, s, a, z, W, y);
      if (J) {
        if (!P && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function") && (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function") {
          var Ve = At;
          Ve |= ua, (e.mode & Ha) !== st && (Ve |= oa), e.flags |= Ve;
        }
      } else {
        if (typeof o.componentDidMount == "function") {
          var ot = At;
          ot |= ua, (e.mode & Ha) !== st && (ot |= oa), e.flags |= ot;
        }
        e.memoizedProps = a, e.memoizedState = W;
      }
      return o.props = a, o.state = W, o.context = y, J;
    }
    function c_(e, t, a, i, o) {
      var s = t.stateNode;
      q0(e, t);
      var f = t.memoizedProps, h = t.type === t.elementType ? f : nu(t.type, f);
      s.props = h;
      var y = t.pendingProps, b = s.context, T = a.contextType, P = si;
      if (typeof T == "object" && T !== null)
        P = gr(T);
      else {
        var z = Ef(t, a, !0);
        P = Cf(t, z);
      }
      var W = a.getDerivedStateFromProps, G = typeof W == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !G && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== y || b !== P) && aC(t, s, i, P), K0();
      var J = t.memoizedState, Ve = s.state = J;
      if (Kh(t, i, s, o), Ve = t.memoizedState, f === y && J === Ve && !Lh() && !Xh() && !$e)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || J !== e.memoizedState) && (t.flags |= At), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || J !== e.memoizedState) && (t.flags |= za), !1;
      typeof W == "function" && (Lg(t, a, W, i), Ve = t.memoizedState);
      var ot = Xh() || tC(t, a, h, i, J, Ve, P) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      $e;
      return ot ? (!G && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, Ve, P), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, Ve, P)), typeof s.componentDidUpdate == "function" && (t.flags |= At), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= za)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || J !== e.memoizedState) && (t.flags |= At), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || J !== e.memoizedState) && (t.flags |= za), t.memoizedProps = i, t.memoizedState = Ve), s.props = i, s.state = Ve, s.context = P, ot;
    }
    var zg, jg, Pg, Fg, Hg, iC = function(e, t) {
    };
    zg = !1, jg = !1, Pg = {}, Fg = {}, Hg = {}, iC = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Tt(t) || "Component";
        Fg[a] || (Fg[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Rp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Fn || Z) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self)) {
          var o = Tt(e) || "Component";
          Pg[o] || (S('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', i), Pg[o] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var h = s;
            if (h.tag !== $)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = h.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var y = f;
          vn(i, "ref");
          var b = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === b)
            return t.ref;
          var T = function(P) {
            var z = y.refs;
            z === Z0 && (z = y.refs = {}), P === null ? delete z[b] : z[b] = P;
          };
          return T._stringRef = b, T;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function Jh(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function em(e) {
      {
        var t = Tt(e) || "Component";
        if (Hg[t])
          return;
        Hg[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function uC(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function oC(e) {
      function t(H, ee) {
        if (e) {
          var V = H.deletions;
          V === null ? (H.deletions = [ee], H.flags |= ln) : V.push(ee);
        }
      }
      function a(H, ee) {
        if (!e)
          return null;
        for (var V = ee; V !== null; )
          t(H, V), V = V.sibling;
        return null;
      }
      function i(H, ee) {
        for (var V = /* @__PURE__ */ new Map(), he = ee; he !== null; )
          he.key !== null ? V.set(he.key, he) : V.set(he.index, he), he = he.sibling;
        return V;
      }
      function o(H, ee) {
        var V = ec(H, ee);
        return V.index = 0, V.sibling = null, V;
      }
      function s(H, ee, V) {
        if (H.index = V, !e)
          return H.flags |= gd, ee;
        var he = H.alternate;
        if (he !== null) {
          var Be = he.index;
          return Be < ee ? (H.flags |= xn, ee) : Be;
        } else
          return H.flags |= xn, ee;
      }
      function f(H) {
        return e && H.alternate === null && (H.flags |= xn), H;
      }
      function h(H, ee, V, he) {
        if (ee === null || ee.tag !== be) {
          var Be = pE(V, H.mode, he);
          return Be.return = H, Be;
        } else {
          var ze = o(ee, V);
          return ze.return = H, ze;
        }
      }
      function y(H, ee, V, he) {
        var Be = V.type;
        if (Be === Ea)
          return T(H, ee, V.props.children, he, V.key);
        if (ee !== null && (ee.elementType === Be || // Keep this check inline so it only runs on the false path:
        Xb(ee, V) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Be == "object" && Be !== null && Be.$$typeof === ut && uC(Be) === ee.type)) {
          var ze = o(ee, V.props);
          return ze.ref = Rp(H, ee, V), ze.return = H, ze._debugSource = V._source, ze._debugOwner = V._owner, ze;
        }
        var ht = dE(V, H.mode, he);
        return ht.ref = Rp(H, ee, V), ht.return = H, ht;
      }
      function b(H, ee, V, he) {
        if (ee === null || ee.tag !== re || ee.stateNode.containerInfo !== V.containerInfo || ee.stateNode.implementation !== V.implementation) {
          var Be = vE(V, H.mode, he);
          return Be.return = H, Be;
        } else {
          var ze = o(ee, V.children || []);
          return ze.return = H, ze;
        }
      }
      function T(H, ee, V, he, Be) {
        if (ee === null || ee.tag !== Te) {
          var ze = ql(V, H.mode, he, Be);
          return ze.return = H, ze;
        } else {
          var ht = o(ee, V);
          return ht.return = H, ht;
        }
      }
      function P(H, ee, V) {
        if (typeof ee == "string" && ee !== "" || typeof ee == "number") {
          var he = pE("" + ee, H.mode, V);
          return he.return = H, he;
        }
        if (typeof ee == "object" && ee !== null) {
          switch (ee.$$typeof) {
            case vi: {
              var Be = dE(ee, H.mode, V);
              return Be.ref = Rp(H, null, ee), Be.return = H, Be;
            }
            case Hr: {
              var ze = vE(ee, H.mode, V);
              return ze.return = H, ze;
            }
            case ut: {
              var ht = ee._payload, Ot = ee._init;
              return P(H, Ot(ht), V);
            }
          }
          if ($t(ee) || ei(ee)) {
            var yn = ql(ee, H.mode, V, null);
            return yn.return = H, yn;
          }
          Jh(H, ee);
        }
        return typeof ee == "function" && em(H), null;
      }
      function z(H, ee, V, he) {
        var Be = ee !== null ? ee.key : null;
        if (typeof V == "string" && V !== "" || typeof V == "number")
          return Be !== null ? null : h(H, ee, "" + V, he);
        if (typeof V == "object" && V !== null) {
          switch (V.$$typeof) {
            case vi:
              return V.key === Be ? y(H, ee, V, he) : null;
            case Hr:
              return V.key === Be ? b(H, ee, V, he) : null;
            case ut: {
              var ze = V._payload, ht = V._init;
              return z(H, ee, ht(ze), he);
            }
          }
          if ($t(V) || ei(V))
            return Be !== null ? null : T(H, ee, V, he, null);
          Jh(H, V);
        }
        return typeof V == "function" && em(H), null;
      }
      function W(H, ee, V, he, Be) {
        if (typeof he == "string" && he !== "" || typeof he == "number") {
          var ze = H.get(V) || null;
          return h(ee, ze, "" + he, Be);
        }
        if (typeof he == "object" && he !== null) {
          switch (he.$$typeof) {
            case vi: {
              var ht = H.get(he.key === null ? V : he.key) || null;
              return y(ee, ht, he, Be);
            }
            case Hr: {
              var Ot = H.get(he.key === null ? V : he.key) || null;
              return b(ee, Ot, he, Be);
            }
            case ut:
              var yn = he._payload, rn = he._init;
              return W(H, ee, V, rn(yn), Be);
          }
          if ($t(he) || ei(he)) {
            var cr = H.get(V) || null;
            return T(ee, cr, he, Be, null);
          }
          Jh(ee, he);
        }
        return typeof he == "function" && em(ee), null;
      }
      function G(H, ee, V) {
        {
          if (typeof H != "object" || H === null)
            return ee;
          switch (H.$$typeof) {
            case vi:
            case Hr:
              iC(H, V);
              var he = H.key;
              if (typeof he != "string")
                break;
              if (ee === null) {
                ee = /* @__PURE__ */ new Set(), ee.add(he);
                break;
              }
              if (!ee.has(he)) {
                ee.add(he);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", he);
              break;
            case ut:
              var Be = H._payload, ze = H._init;
              G(ze(Be), ee, V);
              break;
          }
        }
        return ee;
      }
      function J(H, ee, V, he) {
        for (var Be = null, ze = 0; ze < V.length; ze++) {
          var ht = V[ze];
          Be = G(ht, Be, H);
        }
        for (var Ot = null, yn = null, rn = ee, cr = 0, an = 0, rr = null; rn !== null && an < V.length; an++) {
          rn.index > an ? (rr = rn, rn = null) : rr = rn.sibling;
          var ma = z(H, rn, V[an], he);
          if (ma === null) {
            rn === null && (rn = rr);
            break;
          }
          e && rn && ma.alternate === null && t(H, rn), cr = s(ma, cr, an), yn === null ? Ot = ma : yn.sibling = ma, yn = ma, rn = rr;
        }
        if (an === V.length) {
          if (a(H, rn), Wr()) {
            var Jr = an;
            Vs(H, Jr);
          }
          return Ot;
        }
        if (rn === null) {
          for (; an < V.length; an++) {
            var fi = P(H, V[an], he);
            fi !== null && (cr = s(fi, cr, an), yn === null ? Ot = fi : yn.sibling = fi, yn = fi);
          }
          if (Wr()) {
            var Da = an;
            Vs(H, Da);
          }
          return Ot;
        }
        for (var Ma = i(H, rn); an < V.length; an++) {
          var ya = W(Ma, H, an, V[an], he);
          ya !== null && (e && ya.alternate !== null && Ma.delete(ya.key === null ? an : ya.key), cr = s(ya, cr, an), yn === null ? Ot = ya : yn.sibling = ya, yn = ya);
        }
        if (e && Ma.forEach(function($f) {
          return t(H, $f);
        }), Wr()) {
          var Io = an;
          Vs(H, Io);
        }
        return Ot;
      }
      function Ve(H, ee, V, he) {
        var Be = ei(V);
        if (typeof Be != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          V[Symbol.toStringTag] === "Generator" && (jg || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), jg = !0), V.entries === Be && (zg || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), zg = !0);
          var ze = Be.call(V);
          if (ze)
            for (var ht = null, Ot = ze.next(); !Ot.done; Ot = ze.next()) {
              var yn = Ot.value;
              ht = G(yn, ht, H);
            }
        }
        var rn = Be.call(V);
        if (rn == null)
          throw new Error("An iterable object provided no iterator.");
        for (var cr = null, an = null, rr = ee, ma = 0, Jr = 0, fi = null, Da = rn.next(); rr !== null && !Da.done; Jr++, Da = rn.next()) {
          rr.index > Jr ? (fi = rr, rr = null) : fi = rr.sibling;
          var Ma = z(H, rr, Da.value, he);
          if (Ma === null) {
            rr === null && (rr = fi);
            break;
          }
          e && rr && Ma.alternate === null && t(H, rr), ma = s(Ma, ma, Jr), an === null ? cr = Ma : an.sibling = Ma, an = Ma, rr = fi;
        }
        if (Da.done) {
          if (a(H, rr), Wr()) {
            var ya = Jr;
            Vs(H, ya);
          }
          return cr;
        }
        if (rr === null) {
          for (; !Da.done; Jr++, Da = rn.next()) {
            var Io = P(H, Da.value, he);
            Io !== null && (ma = s(Io, ma, Jr), an === null ? cr = Io : an.sibling = Io, an = Io);
          }
          if (Wr()) {
            var $f = Jr;
            Vs(H, $f);
          }
          return cr;
        }
        for (var tv = i(H, rr); !Da.done; Jr++, Da = rn.next()) {
          var Xu = W(tv, H, Jr, Da.value, he);
          Xu !== null && (e && Xu.alternate !== null && tv.delete(Xu.key === null ? Jr : Xu.key), ma = s(Xu, ma, Jr), an === null ? cr = Xu : an.sibling = Xu, an = Xu);
        }
        if (e && tv.forEach(function(Tk) {
          return t(H, Tk);
        }), Wr()) {
          var wk = Jr;
          Vs(H, wk);
        }
        return cr;
      }
      function ot(H, ee, V, he) {
        if (ee !== null && ee.tag === be) {
          a(H, ee.sibling);
          var Be = o(ee, V);
          return Be.return = H, Be;
        }
        a(H, ee);
        var ze = pE(V, H.mode, he);
        return ze.return = H, ze;
      }
      function Je(H, ee, V, he) {
        for (var Be = V.key, ze = ee; ze !== null; ) {
          if (ze.key === Be) {
            var ht = V.type;
            if (ht === Ea) {
              if (ze.tag === Te) {
                a(H, ze.sibling);
                var Ot = o(ze, V.props.children);
                return Ot.return = H, Ot._debugSource = V._source, Ot._debugOwner = V._owner, Ot;
              }
            } else if (ze.elementType === ht || // Keep this check inline so it only runs on the false path:
            Xb(ze, V) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof ht == "object" && ht !== null && ht.$$typeof === ut && uC(ht) === ze.type) {
              a(H, ze.sibling);
              var yn = o(ze, V.props);
              return yn.ref = Rp(H, ze, V), yn.return = H, yn._debugSource = V._source, yn._debugOwner = V._owner, yn;
            }
            a(H, ze);
            break;
          } else
            t(H, ze);
          ze = ze.sibling;
        }
        if (V.type === Ea) {
          var rn = ql(V.props.children, H.mode, he, V.key);
          return rn.return = H, rn;
        } else {
          var cr = dE(V, H.mode, he);
          return cr.ref = Rp(H, ee, V), cr.return = H, cr;
        }
      }
      function Qt(H, ee, V, he) {
        for (var Be = V.key, ze = ee; ze !== null; ) {
          if (ze.key === Be)
            if (ze.tag === re && ze.stateNode.containerInfo === V.containerInfo && ze.stateNode.implementation === V.implementation) {
              a(H, ze.sibling);
              var ht = o(ze, V.children || []);
              return ht.return = H, ht;
            } else {
              a(H, ze);
              break;
            }
          else
            t(H, ze);
          ze = ze.sibling;
        }
        var Ot = vE(V, H.mode, he);
        return Ot.return = H, Ot;
      }
      function Bt(H, ee, V, he) {
        var Be = typeof V == "object" && V !== null && V.type === Ea && V.key === null;
        if (Be && (V = V.props.children), typeof V == "object" && V !== null) {
          switch (V.$$typeof) {
            case vi:
              return f(Je(H, ee, V, he));
            case Hr:
              return f(Qt(H, ee, V, he));
            case ut:
              var ze = V._payload, ht = V._init;
              return Bt(H, ee, ht(ze), he);
          }
          if ($t(V))
            return J(H, ee, V, he);
          if (ei(V))
            return Ve(H, ee, V, he);
          Jh(H, V);
        }
        return typeof V == "string" && V !== "" || typeof V == "number" ? f(ot(H, ee, "" + V, he)) : (typeof V == "function" && em(H), a(H, ee));
      }
      return Bt;
    }
    var xf = oC(!0), lC = oC(!1);
    function f_(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = ec(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = ec(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function d_(e, t) {
      for (var a = e.child; a !== null; )
        VO(a, t), a = a.sibling;
    }
    var _p = {}, Hl = Ul(_p), xp = Ul(_p), tm = Ul(_p);
    function nm(e) {
      if (e === _p)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function sC() {
      var e = nm(tm.current);
      return e;
    }
    function Vg(e, t) {
      va(tm, t, e), va(xp, e, e), va(Hl, _p, e);
      var a = _R(t);
      pa(Hl, e), va(Hl, a, e);
    }
    function Of(e) {
      pa(Hl, e), pa(xp, e), pa(tm, e);
    }
    function Bg() {
      var e = nm(Hl.current);
      return e;
    }
    function cC(e) {
      nm(tm.current);
      var t = nm(Hl.current), a = xR(t, e.type);
      t !== a && (va(xp, e, e), va(Hl, a, e));
    }
    function $g(e) {
      xp.current === e && (pa(Hl, e), pa(xp, e));
    }
    var p_ = 0, fC = 1, dC = 1, Op = 2, ru = Ul(p_);
    function Ig(e, t) {
      return (e & t) !== 0;
    }
    function kf(e) {
      return e & fC;
    }
    function Yg(e, t) {
      return e & fC | t;
    }
    function v_(e, t) {
      return e | t;
    }
    function Vl(e, t) {
      va(ru, t, e);
    }
    function Df(e) {
      pa(ru, e);
    }
    function h_(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function rm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === _e) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || b0(i) || Xy(i))
              return t;
          }
        } else if (t.tag === yt && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var o = (t.flags & St) !== nt;
          if (o)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Ga = (
      /*   */
      0
    ), Tr = (
      /* */
      1
    ), Iu = (
      /*  */
      2
    ), Rr = (
      /*    */
      4
    ), Qr = (
      /*   */
      8
    ), Wg = [];
    function Qg() {
      for (var e = 0; e < Wg.length; e++) {
        var t = Wg[e];
        t._workInProgressVersionPrimary = null;
      }
      Wg.length = 0;
    }
    function m_(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var Pe = p.ReactCurrentDispatcher, kp = p.ReactCurrentBatchConfig, Gg, Mf;
    Gg = /* @__PURE__ */ new Set();
    var Qs = ne, mn = null, _r = null, xr = null, am = !1, Dp = !1, Mp = 0, y_ = 0, g_ = 25, ie = null, Di = null, Bl = -1, qg = !1;
    function dn() {
      {
        var e = ie;
        Di === null ? Di = [e] : Di.push(e);
      }
    }
    function De() {
      {
        var e = ie;
        Di !== null && (Bl++, Di[Bl] !== e && S_(e));
      }
    }
    function Nf(e) {
      e != null && !$t(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", ie, typeof e);
    }
    function S_(e) {
      {
        var t = Tt(mn);
        if (!Gg.has(t) && (Gg.add(t), Di !== null)) {
          for (var a = "", i = 30, o = 0; o <= Bl; o++) {
            for (var s = Di[o], f = o === Bl ? e : s, h = o + 1 + ". " + s; h.length < i; )
              h += " ";
            h += f + `
`, a += h;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function ha() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function Kg(e, t) {
      if (qg)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", ie), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, ie, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Qe(e[a], t[a]))
          return !1;
      return !0;
    }
    function Lf(e, t, a, i, o, s) {
      Qs = s, mn = t, Di = e !== null ? e._debugHookTypes : null, Bl = -1, qg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = ne, e !== null && e.memoizedState !== null ? Pe.current = AC : Di !== null ? Pe.current = LC : Pe.current = NC;
      var f = a(i, o);
      if (Dp) {
        var h = 0;
        do {
          if (Dp = !1, Mp = 0, h >= g_)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          h += 1, qg = !1, _r = null, xr = null, t.updateQueue = null, Bl = -1, Pe.current = UC, f = a(i, o);
        } while (Dp);
      }
      Pe.current = ym, t._debugHookTypes = Di;
      var y = _r !== null && _r.next !== null;
      if (Qs = ne, mn = null, _r = null, xr = null, ie = null, Di = null, Bl = -1, e !== null && (e.flags & Cr) !== (t.flags & Cr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & Ft) !== st && S("Internal React error: Expected static flag was missing. Please notify the React team."), am = !1, y)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Af() {
      var e = Mp !== 0;
      return Mp = 0, e;
    }
    function pC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Ha) !== st ? t.flags &= ~(fo | oa | An | At) : t.flags &= ~(An | At), e.lanes = gl(e.lanes, a);
    }
    function vC() {
      if (Pe.current = ym, am) {
        for (var e = mn.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        am = !1;
      }
      Qs = ne, mn = null, _r = null, xr = null, Di = null, Bl = -1, ie = null, xC = !1, Dp = !1, Mp = 0;
    }
    function Yu() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return xr === null ? mn.memoizedState = xr = e : xr = xr.next = e, xr;
    }
    function Mi() {
      var e;
      if (_r === null) {
        var t = mn.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = _r.next;
      var a;
      if (xr === null ? a = mn.memoizedState : a = xr.next, a !== null)
        xr = a, a = xr.next, _r = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        _r = e;
        var i = {
          memoizedState: _r.memoizedState,
          baseState: _r.baseState,
          baseQueue: _r.baseQueue,
          queue: _r.queue,
          next: null
        };
        xr === null ? mn.memoizedState = xr = i : xr = xr.next = i;
      }
      return xr;
    }
    function hC() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function Xg(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Zg(e, t, a) {
      var i = Yu(), o;
      a !== void 0 ? o = a(t) : o = t, i.memoizedState = i.baseState = o;
      var s = {
        pending: null,
        interleaved: null,
        lanes: ne,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      };
      i.queue = s;
      var f = s.dispatch = w_.bind(null, mn, s);
      return [i.memoizedState, f];
    }
    function Jg(e, t, a) {
      var i = Mi(), o = i.queue;
      if (o === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      o.lastRenderedReducer = e;
      var s = _r, f = s.baseQueue, h = o.pending;
      if (h !== null) {
        if (f !== null) {
          var y = f.next, b = h.next;
          f.next = b, h.next = y;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = h, o.pending = null;
      }
      if (f !== null) {
        var T = f.next, P = s.baseState, z = null, W = null, G = null, J = T;
        do {
          var Ve = J.lane;
          if (bo(Qs, Ve)) {
            if (G !== null) {
              var Je = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Yt,
                action: J.action,
                hasEagerState: J.hasEagerState,
                eagerState: J.eagerState,
                next: null
              };
              G = G.next = Je;
            }
            if (J.hasEagerState)
              P = J.eagerState;
            else {
              var Qt = J.action;
              P = e(P, Qt);
            }
          } else {
            var ot = {
              lane: Ve,
              action: J.action,
              hasEagerState: J.hasEagerState,
              eagerState: J.eagerState,
              next: null
            };
            G === null ? (W = G = ot, z = P) : G = G.next = ot, mn.lanes = Ut(mn.lanes, Ve), Kp(Ve);
          }
          J = J.next;
        } while (J !== null && J !== T);
        G === null ? z = P : G.next = W, Qe(P, i.memoizedState) || Pp(), i.memoizedState = P, i.baseState = z, i.baseQueue = G, o.lastRenderedState = P;
      }
      var Bt = o.interleaved;
      if (Bt !== null) {
        var H = Bt;
        do {
          var ee = H.lane;
          mn.lanes = Ut(mn.lanes, ee), Kp(ee), H = H.next;
        } while (H !== Bt);
      } else
        f === null && (o.lanes = ne);
      var V = o.dispatch;
      return [i.memoizedState, V];
    }
    function eS(e, t, a) {
      var i = Mi(), o = i.queue;
      if (o === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      o.lastRenderedReducer = e;
      var s = o.dispatch, f = o.pending, h = i.memoizedState;
      if (f !== null) {
        o.pending = null;
        var y = f.next, b = y;
        do {
          var T = b.action;
          h = e(h, T), b = b.next;
        } while (b !== y);
        Qe(h, i.memoizedState) || Pp(), i.memoizedState = h, i.baseQueue === null && (i.baseState = h), o.lastRenderedState = h;
      }
      return [h, s];
    }
    function TM(e, t, a) {
    }
    function RM(e, t, a) {
    }
    function tS(e, t, a) {
      var i = mn, o = Yu(), s, f = Wr();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Mf || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), Mf = !0);
      } else {
        if (s = t(), !Mf) {
          var h = t();
          Qe(s, h) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Mf = !0);
        }
        var y = Um();
        if (y === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Ts(y, Qs) || mC(i, t, s);
      }
      o.memoizedState = s;
      var b = {
        value: s,
        getSnapshot: t
      };
      return o.queue = b, sm(gC.bind(null, i, b, e), [e]), i.flags |= An, Np(Tr | Qr, yC.bind(null, i, b, s, t), void 0, null), s;
    }
    function im(e, t, a) {
      var i = mn, o = Mi(), s = t();
      if (!Mf) {
        var f = t();
        Qe(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Mf = !0);
      }
      var h = o.memoizedState, y = !Qe(h, s);
      y && (o.memoizedState = s, Pp());
      var b = o.queue;
      if (Ap(gC.bind(null, i, b, e), [e]), b.getSnapshot !== t || y || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      xr !== null && xr.memoizedState.tag & Tr) {
        i.flags |= An, Np(Tr | Qr, yC.bind(null, i, b, s, t), void 0, null);
        var T = Um();
        if (T === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Ts(T, Qs) || mC(i, t, s);
      }
      return s;
    }
    function mC(e, t, a) {
      e.flags |= hs;
      var i = {
        getSnapshot: t,
        value: a
      }, o = mn.updateQueue;
      if (o === null)
        o = hC(), mn.updateQueue = o, o.stores = [i];
      else {
        var s = o.stores;
        s === null ? o.stores = [i] : s.push(i);
      }
    }
    function yC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, SC(t) && EC(e);
    }
    function gC(e, t, a) {
      var i = function() {
        SC(t) && EC(e);
      };
      return a(i);
    }
    function SC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Qe(a, i);
      } catch {
        return !0;
      }
    }
    function EC(e) {
      var t = Qa(e, pt);
      t !== null && Mr(t, e, pt, bn);
    }
    function um(e) {
      var t = Yu();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: ne,
        dispatch: null,
        lastRenderedReducer: Xg,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = T_.bind(null, mn, a);
      return [t.memoizedState, i];
    }
    function nS(e) {
      return Jg(Xg);
    }
    function rS(e) {
      return eS(Xg);
    }
    function Np(e, t, a, i) {
      var o = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = mn.updateQueue;
      if (s === null)
        s = hC(), mn.updateQueue = s, s.lastEffect = o.next = o;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = o.next = o;
        else {
          var h = f.next;
          f.next = o, o.next = h, s.lastEffect = o;
        }
      }
      return o;
    }
    function aS(e) {
      var t = Yu();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function om(e) {
      var t = Mi();
      return t.memoizedState;
    }
    function Lp(e, t, a, i) {
      var o = Yu(), s = i === void 0 ? null : i;
      mn.flags |= e, o.memoizedState = Np(Tr | t, a, void 0, s);
    }
    function lm(e, t, a, i) {
      var o = Mi(), s = i === void 0 ? null : i, f = void 0;
      if (_r !== null) {
        var h = _r.memoizedState;
        if (f = h.destroy, s !== null) {
          var y = h.deps;
          if (Kg(s, y)) {
            o.memoizedState = Np(t, a, f, s);
            return;
          }
        }
      }
      mn.flags |= e, o.memoizedState = Np(Tr | t, a, f, s);
    }
    function sm(e, t) {
      return (mn.mode & Ha) !== st ? Lp(fo | An | xu, Qr, e, t) : Lp(An | xu, Qr, e, t);
    }
    function Ap(e, t) {
      return lm(An, Qr, e, t);
    }
    function iS(e, t) {
      return Lp(At, Iu, e, t);
    }
    function cm(e, t) {
      return lm(At, Iu, e, t);
    }
    function uS(e, t) {
      var a = At;
      return a |= ua, (mn.mode & Ha) !== st && (a |= oa), Lp(a, Rr, e, t);
    }
    function fm(e, t) {
      return lm(At, Rr, e, t);
    }
    function CC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var o = t;
        o.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(o).join(", ") + "}");
        var s = e();
        return o.current = s, function() {
          o.current = null;
        };
      }
    }
    function oS(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, o = At;
      return o |= ua, (mn.mode & Ha) !== st && (o |= oa), Lp(o, Rr, CC.bind(null, t, e), i);
    }
    function dm(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return lm(At, Rr, CC.bind(null, t, e), i);
    }
    function E_(e, t) {
    }
    var pm = E_;
    function lS(e, t) {
      var a = Yu(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function vm(e, t) {
      var a = Mi(), i = t === void 0 ? null : t, o = a.memoizedState;
      if (o !== null && i !== null) {
        var s = o[1];
        if (Kg(i, s))
          return o[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function sS(e, t) {
      var a = Yu(), i = t === void 0 ? null : t, o = e();
      return a.memoizedState = [o, i], o;
    }
    function hm(e, t) {
      var a = Mi(), i = t === void 0 ? null : t, o = a.memoizedState;
      if (o !== null && i !== null) {
        var s = o[1];
        if (Kg(i, s))
          return o[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function cS(e) {
      var t = Yu();
      return t.memoizedState = e, e;
    }
    function bC(e) {
      var t = Mi(), a = _r, i = a.memoizedState;
      return TC(t, i, e);
    }
    function wC(e) {
      var t = Mi();
      if (_r === null)
        return t.memoizedState = e, e;
      var a = _r.memoizedState;
      return TC(t, a, e);
    }
    function TC(e, t, a) {
      var i = !my(Qs);
      if (i) {
        if (!Qe(a, t)) {
          var o = Ud();
          mn.lanes = Ut(mn.lanes, o), Kp(o), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Pp()), e.memoizedState = a, a;
    }
    function C_(e, t, a) {
      var i = Ba();
      or(Ur(i, wr)), e(!0);
      var o = kp.transition;
      kp.transition = {};
      var s = kp.transition;
      kp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (or(i), kp.transition = o, o === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && N("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function fS() {
      var e = um(!1), t = e[0], a = e[1], i = C_.bind(null, a), o = Yu();
      return o.memoizedState = i, [t, i];
    }
    function RC() {
      var e = nS(), t = e[0], a = Mi(), i = a.memoizedState;
      return [t, i];
    }
    function _C() {
      var e = rS(), t = e[0], a = Mi(), i = a.memoizedState;
      return [t, i];
    }
    var xC = !1;
    function b_() {
      return xC;
    }
    function dS() {
      var e = Yu(), t = Um(), a = t.identifierPrefix, i;
      if (Wr()) {
        var o = z1();
        i = ":" + a + "R" + o;
        var s = Mp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = y_++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function mm() {
      var e = Mi(), t = e.memoizedState;
      return t;
    }
    function w_(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Ql(e), o = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (OC(e))
        kC(t, o);
      else {
        var s = W0(e, t, o, i);
        if (s !== null) {
          var f = ka();
          Mr(s, e, i, f), DC(s, t, i);
        }
      }
      MC(e, i);
    }
    function T_(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Ql(e), o = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (OC(e))
        kC(t, o);
      else {
        var s = e.alternate;
        if (e.lanes === ne && (s === null || s.lanes === ne)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var h;
            h = Pe.current, Pe.current = au;
            try {
              var y = t.lastRenderedState, b = f(y, a);
              if (o.hasEagerState = !0, o.eagerState = b, Qe(b, y)) {
                n_(e, t, o, i);
                return;
              }
            } catch {
            } finally {
              Pe.current = h;
            }
          }
        }
        var T = W0(e, t, o, i);
        if (T !== null) {
          var P = ka();
          Mr(T, e, i, P), DC(T, t, i);
        }
      }
      MC(e, i);
    }
    function OC(e) {
      var t = e.alternate;
      return e === mn || t !== null && t === mn;
    }
    function kC(e, t) {
      Dp = am = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function DC(e, t, a) {
      if (Ad(a)) {
        var i = t.lanes;
        i = zd(i, e.pendingLanes);
        var o = Ut(i, a);
        t.lanes = o, Sl(e, o);
      }
    }
    function MC(e, t, a) {
      Lu(e, t);
    }
    var ym = {
      readContext: gr,
      useCallback: ha,
      useContext: ha,
      useEffect: ha,
      useImperativeHandle: ha,
      useInsertionEffect: ha,
      useLayoutEffect: ha,
      useMemo: ha,
      useReducer: ha,
      useRef: ha,
      useState: ha,
      useDebugValue: ha,
      useDeferredValue: ha,
      useTransition: ha,
      useMutableSource: ha,
      useSyncExternalStore: ha,
      useId: ha,
      unstable_isNewReconciler: pe
    }, NC = null, LC = null, AC = null, UC = null, Wu = null, au = null, gm = null;
    {
      var pS = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Rt = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      NC = {
        readContext: function(e) {
          return gr(e);
        },
        useCallback: function(e, t) {
          return ie = "useCallback", dn(), Nf(t), lS(e, t);
        },
        useContext: function(e) {
          return ie = "useContext", dn(), gr(e);
        },
        useEffect: function(e, t) {
          return ie = "useEffect", dn(), Nf(t), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ie = "useImperativeHandle", dn(), Nf(a), oS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ie = "useInsertionEffect", dn(), Nf(t), iS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ie = "useLayoutEffect", dn(), Nf(t), uS(e, t);
        },
        useMemo: function(e, t) {
          ie = "useMemo", dn(), Nf(t);
          var a = Pe.current;
          Pe.current = Wu;
          try {
            return sS(e, t);
          } finally {
            Pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ie = "useReducer", dn();
          var i = Pe.current;
          Pe.current = Wu;
          try {
            return Zg(e, t, a);
          } finally {
            Pe.current = i;
          }
        },
        useRef: function(e) {
          return ie = "useRef", dn(), aS(e);
        },
        useState: function(e) {
          ie = "useState", dn();
          var t = Pe.current;
          Pe.current = Wu;
          try {
            return um(e);
          } finally {
            Pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ie = "useDebugValue", dn(), void 0;
        },
        useDeferredValue: function(e) {
          return ie = "useDeferredValue", dn(), cS(e);
        },
        useTransition: function() {
          return ie = "useTransition", dn(), fS();
        },
        useMutableSource: function(e, t, a) {
          return ie = "useMutableSource", dn(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ie = "useSyncExternalStore", dn(), tS(e, t, a);
        },
        useId: function() {
          return ie = "useId", dn(), dS();
        },
        unstable_isNewReconciler: pe
      }, LC = {
        readContext: function(e) {
          return gr(e);
        },
        useCallback: function(e, t) {
          return ie = "useCallback", De(), lS(e, t);
        },
        useContext: function(e) {
          return ie = "useContext", De(), gr(e);
        },
        useEffect: function(e, t) {
          return ie = "useEffect", De(), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ie = "useImperativeHandle", De(), oS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ie = "useInsertionEffect", De(), iS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ie = "useLayoutEffect", De(), uS(e, t);
        },
        useMemo: function(e, t) {
          ie = "useMemo", De();
          var a = Pe.current;
          Pe.current = Wu;
          try {
            return sS(e, t);
          } finally {
            Pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ie = "useReducer", De();
          var i = Pe.current;
          Pe.current = Wu;
          try {
            return Zg(e, t, a);
          } finally {
            Pe.current = i;
          }
        },
        useRef: function(e) {
          return ie = "useRef", De(), aS(e);
        },
        useState: function(e) {
          ie = "useState", De();
          var t = Pe.current;
          Pe.current = Wu;
          try {
            return um(e);
          } finally {
            Pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ie = "useDebugValue", De(), void 0;
        },
        useDeferredValue: function(e) {
          return ie = "useDeferredValue", De(), cS(e);
        },
        useTransition: function() {
          return ie = "useTransition", De(), fS();
        },
        useMutableSource: function(e, t, a) {
          return ie = "useMutableSource", De(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ie = "useSyncExternalStore", De(), tS(e, t, a);
        },
        useId: function() {
          return ie = "useId", De(), dS();
        },
        unstable_isNewReconciler: pe
      }, AC = {
        readContext: function(e) {
          return gr(e);
        },
        useCallback: function(e, t) {
          return ie = "useCallback", De(), vm(e, t);
        },
        useContext: function(e) {
          return ie = "useContext", De(), gr(e);
        },
        useEffect: function(e, t) {
          return ie = "useEffect", De(), Ap(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ie = "useImperativeHandle", De(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ie = "useInsertionEffect", De(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ie = "useLayoutEffect", De(), fm(e, t);
        },
        useMemo: function(e, t) {
          ie = "useMemo", De();
          var a = Pe.current;
          Pe.current = au;
          try {
            return hm(e, t);
          } finally {
            Pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ie = "useReducer", De();
          var i = Pe.current;
          Pe.current = au;
          try {
            return Jg(e, t, a);
          } finally {
            Pe.current = i;
          }
        },
        useRef: function(e) {
          return ie = "useRef", De(), om();
        },
        useState: function(e) {
          ie = "useState", De();
          var t = Pe.current;
          Pe.current = au;
          try {
            return nS(e);
          } finally {
            Pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ie = "useDebugValue", De(), pm();
        },
        useDeferredValue: function(e) {
          return ie = "useDeferredValue", De(), bC(e);
        },
        useTransition: function() {
          return ie = "useTransition", De(), RC();
        },
        useMutableSource: function(e, t, a) {
          return ie = "useMutableSource", De(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ie = "useSyncExternalStore", De(), im(e, t);
        },
        useId: function() {
          return ie = "useId", De(), mm();
        },
        unstable_isNewReconciler: pe
      }, UC = {
        readContext: function(e) {
          return gr(e);
        },
        useCallback: function(e, t) {
          return ie = "useCallback", De(), vm(e, t);
        },
        useContext: function(e) {
          return ie = "useContext", De(), gr(e);
        },
        useEffect: function(e, t) {
          return ie = "useEffect", De(), Ap(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ie = "useImperativeHandle", De(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ie = "useInsertionEffect", De(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ie = "useLayoutEffect", De(), fm(e, t);
        },
        useMemo: function(e, t) {
          ie = "useMemo", De();
          var a = Pe.current;
          Pe.current = gm;
          try {
            return hm(e, t);
          } finally {
            Pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ie = "useReducer", De();
          var i = Pe.current;
          Pe.current = gm;
          try {
            return eS(e, t, a);
          } finally {
            Pe.current = i;
          }
        },
        useRef: function(e) {
          return ie = "useRef", De(), om();
        },
        useState: function(e) {
          ie = "useState", De();
          var t = Pe.current;
          Pe.current = gm;
          try {
            return rS(e);
          } finally {
            Pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ie = "useDebugValue", De(), pm();
        },
        useDeferredValue: function(e) {
          return ie = "useDeferredValue", De(), wC(e);
        },
        useTransition: function() {
          return ie = "useTransition", De(), _C();
        },
        useMutableSource: function(e, t, a) {
          return ie = "useMutableSource", De(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ie = "useSyncExternalStore", De(), im(e, t);
        },
        useId: function() {
          return ie = "useId", De(), mm();
        },
        unstable_isNewReconciler: pe
      }, Wu = {
        readContext: function(e) {
          return pS(), gr(e);
        },
        useCallback: function(e, t) {
          return ie = "useCallback", Rt(), dn(), lS(e, t);
        },
        useContext: function(e) {
          return ie = "useContext", Rt(), dn(), gr(e);
        },
        useEffect: function(e, t) {
          return ie = "useEffect", Rt(), dn(), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ie = "useImperativeHandle", Rt(), dn(), oS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ie = "useInsertionEffect", Rt(), dn(), iS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ie = "useLayoutEffect", Rt(), dn(), uS(e, t);
        },
        useMemo: function(e, t) {
          ie = "useMemo", Rt(), dn();
          var a = Pe.current;
          Pe.current = Wu;
          try {
            return sS(e, t);
          } finally {
            Pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ie = "useReducer", Rt(), dn();
          var i = Pe.current;
          Pe.current = Wu;
          try {
            return Zg(e, t, a);
          } finally {
            Pe.current = i;
          }
        },
        useRef: function(e) {
          return ie = "useRef", Rt(), dn(), aS(e);
        },
        useState: function(e) {
          ie = "useState", Rt(), dn();
          var t = Pe.current;
          Pe.current = Wu;
          try {
            return um(e);
          } finally {
            Pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ie = "useDebugValue", Rt(), dn(), void 0;
        },
        useDeferredValue: function(e) {
          return ie = "useDeferredValue", Rt(), dn(), cS(e);
        },
        useTransition: function() {
          return ie = "useTransition", Rt(), dn(), fS();
        },
        useMutableSource: function(e, t, a) {
          return ie = "useMutableSource", Rt(), dn(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ie = "useSyncExternalStore", Rt(), dn(), tS(e, t, a);
        },
        useId: function() {
          return ie = "useId", Rt(), dn(), dS();
        },
        unstable_isNewReconciler: pe
      }, au = {
        readContext: function(e) {
          return pS(), gr(e);
        },
        useCallback: function(e, t) {
          return ie = "useCallback", Rt(), De(), vm(e, t);
        },
        useContext: function(e) {
          return ie = "useContext", Rt(), De(), gr(e);
        },
        useEffect: function(e, t) {
          return ie = "useEffect", Rt(), De(), Ap(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ie = "useImperativeHandle", Rt(), De(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ie = "useInsertionEffect", Rt(), De(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ie = "useLayoutEffect", Rt(), De(), fm(e, t);
        },
        useMemo: function(e, t) {
          ie = "useMemo", Rt(), De();
          var a = Pe.current;
          Pe.current = au;
          try {
            return hm(e, t);
          } finally {
            Pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ie = "useReducer", Rt(), De();
          var i = Pe.current;
          Pe.current = au;
          try {
            return Jg(e, t, a);
          } finally {
            Pe.current = i;
          }
        },
        useRef: function(e) {
          return ie = "useRef", Rt(), De(), om();
        },
        useState: function(e) {
          ie = "useState", Rt(), De();
          var t = Pe.current;
          Pe.current = au;
          try {
            return nS(e);
          } finally {
            Pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ie = "useDebugValue", Rt(), De(), pm();
        },
        useDeferredValue: function(e) {
          return ie = "useDeferredValue", Rt(), De(), bC(e);
        },
        useTransition: function() {
          return ie = "useTransition", Rt(), De(), RC();
        },
        useMutableSource: function(e, t, a) {
          return ie = "useMutableSource", Rt(), De(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ie = "useSyncExternalStore", Rt(), De(), im(e, t);
        },
        useId: function() {
          return ie = "useId", Rt(), De(), mm();
        },
        unstable_isNewReconciler: pe
      }, gm = {
        readContext: function(e) {
          return pS(), gr(e);
        },
        useCallback: function(e, t) {
          return ie = "useCallback", Rt(), De(), vm(e, t);
        },
        useContext: function(e) {
          return ie = "useContext", Rt(), De(), gr(e);
        },
        useEffect: function(e, t) {
          return ie = "useEffect", Rt(), De(), Ap(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ie = "useImperativeHandle", Rt(), De(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ie = "useInsertionEffect", Rt(), De(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ie = "useLayoutEffect", Rt(), De(), fm(e, t);
        },
        useMemo: function(e, t) {
          ie = "useMemo", Rt(), De();
          var a = Pe.current;
          Pe.current = au;
          try {
            return hm(e, t);
          } finally {
            Pe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ie = "useReducer", Rt(), De();
          var i = Pe.current;
          Pe.current = au;
          try {
            return eS(e, t, a);
          } finally {
            Pe.current = i;
          }
        },
        useRef: function(e) {
          return ie = "useRef", Rt(), De(), om();
        },
        useState: function(e) {
          ie = "useState", Rt(), De();
          var t = Pe.current;
          Pe.current = au;
          try {
            return rS(e);
          } finally {
            Pe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ie = "useDebugValue", Rt(), De(), pm();
        },
        useDeferredValue: function(e) {
          return ie = "useDeferredValue", Rt(), De(), wC(e);
        },
        useTransition: function() {
          return ie = "useTransition", Rt(), De(), _C();
        },
        useMutableSource: function(e, t, a) {
          return ie = "useMutableSource", Rt(), De(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ie = "useSyncExternalStore", Rt(), De(), im(e, t);
        },
        useId: function() {
          return ie = "useId", Rt(), De(), mm();
        },
        unstable_isNewReconciler: pe
      };
    }
    var $l = m.unstable_now, zC = 0, Sm = -1, Up = -1, Em = -1, vS = !1, Cm = !1;
    function jC() {
      return vS;
    }
    function R_() {
      Cm = !0;
    }
    function __() {
      vS = !1, Cm = !1;
    }
    function x_() {
      vS = Cm, Cm = !1;
    }
    function PC() {
      return zC;
    }
    function FC() {
      zC = $l();
    }
    function hS(e) {
      Up = $l(), e.actualStartTime < 0 && (e.actualStartTime = $l());
    }
    function HC(e) {
      Up = -1;
    }
    function bm(e, t) {
      if (Up >= 0) {
        var a = $l() - Up;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Up = -1;
      }
    }
    function Qu(e) {
      if (Sm >= 0) {
        var t = $l() - Sm;
        Sm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case K:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case Ze:
              var o = a.stateNode;
              o.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function mS(e) {
      if (Em >= 0) {
        var t = $l() - Em;
        Em = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case K:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case Ze:
              var o = a.stateNode;
              o !== null && (o.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Gu() {
      Sm = $l();
    }
    function yS() {
      Em = $l();
    }
    function gS(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function Gs(e, t) {
      return {
        value: e,
        source: t,
        stack: Ko(t),
        digest: null
      };
    }
    function SS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function O_(e, t) {
      return !0;
    }
    function ES(e, t) {
      try {
        var a = O_(e, t);
        if (a === !1)
          return;
        var i = t.value, o = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === $)
            return;
          console.error(i);
        }
        var h = o ? Tt(o) : null, y = h ? "The above error occurred in the <" + h + "> component:" : "The above error occurred in one of your React components:", b;
        if (e.tag === K)
          b = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var T = Tt(e) || "Anonymous";
          b = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + T + ".");
        }
        var P = y + `
` + f + `

` + ("" + b);
        console.error(P);
      } catch (z) {
        setTimeout(function() {
          throw z;
        });
      }
    }
    var k_ = typeof WeakMap == "function" ? WeakMap : Map;
    function VC(e, t, a) {
      var i = Po(bn, a);
      i.tag = Eg, i.payload = {
        element: null
      };
      var o = t.value;
      return i.callback = function() {
        CO(o), ES(e, t);
      }, i;
    }
    function CS(e, t, a) {
      var i = Po(bn, a);
      i.tag = Eg;
      var o = e.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var s = t.value;
        i.payload = function() {
          return o(s);
        }, i.callback = function() {
          Zb(e), ES(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        Zb(e), ES(e, t), typeof o != "function" && SO(this);
        var y = t.value, b = t.stack;
        this.componentDidCatch(y, {
          componentStack: b !== null ? b : ""
        }), typeof o != "function" && (da(e.lanes, pt) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Tt(e) || "Unknown"));
      }), i;
    }
    function BC(e, t, a) {
      var i = e.pingCache, o;
      if (i === null ? (i = e.pingCache = new k_(), o = /* @__PURE__ */ new Set(), i.set(t, o)) : (o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o))), !o.has(a)) {
        o.add(a);
        var s = bO.bind(null, e, t, a);
        br && Xp(e, a), t.then(s, s);
      }
    }
    function D_(e, t, a, i) {
      var o = e.updateQueue;
      if (o === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        o.add(a);
    }
    function M_(e, t) {
      var a = e.tag;
      if ((e.mode & Ft) === st && (a === Y || a === Ue || a === Fe)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function $C(e) {
      var t = e;
      do {
        if (t.tag === _e && h_(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function IC(e, t, a, i, o) {
      if ((e.mode & Ft) === st) {
        if (e === t)
          e.flags |= pr;
        else {
          if (e.flags |= St, a.flags |= ms, a.flags &= ~(gc | Ca), a.tag === $) {
            var s = a.alternate;
            if (s === null)
              a.tag = qt;
            else {
              var f = Po(bn, pt);
              f.tag = Wh, Fl(a, f, pt);
            }
          }
          a.lanes = Ut(a.lanes, pt);
        }
        return e;
      }
      return e.flags |= pr, e.lanes = o, e;
    }
    function N_(e, t, a, i, o) {
      if (a.flags |= Ca, br && Xp(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        M_(a), Wr() && a.mode & Ft && A0();
        var f = $C(t);
        if (f !== null) {
          f.flags &= ~$n, IC(f, t, a, e, o), f.mode & Ft && BC(e, s, o), D_(f, e, s);
          return;
        } else {
          if (!yl(o)) {
            BC(e, s, o), eE();
            return;
          }
          var h = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = h;
        }
      } else if (Wr() && a.mode & Ft) {
        A0();
        var y = $C(t);
        if (y !== null) {
          (y.flags & pr) === nt && (y.flags |= $n), IC(y, t, a, e, o), pg(Gs(i, a));
          return;
        }
      }
      i = Gs(i, a), fO(i);
      var b = t;
      do {
        switch (b.tag) {
          case K: {
            var T = i;
            b.flags |= pr;
            var P = ur(o);
            b.lanes = Ut(b.lanes, P);
            var z = VC(b, T, P);
            wg(b, z);
            return;
          }
          case $:
            var W = i, G = b.type, J = b.stateNode;
            if ((b.flags & St) === nt && (typeof G.getDerivedStateFromError == "function" || J !== null && typeof J.componentDidCatch == "function" && !$b(J))) {
              b.flags |= pr;
              var Ve = ur(o);
              b.lanes = Ut(b.lanes, Ve);
              var ot = CS(b, W, Ve);
              wg(b, ot);
              return;
            }
            break;
        }
        b = b.return;
      } while (b !== null);
    }
    function L_() {
      return null;
    }
    var zp = p.ReactCurrentOwner, iu = !1, bS, jp, wS, TS, RS, qs, _S, wm;
    bS = {}, jp = {}, wS = {}, TS = {}, RS = {}, qs = !1, _S = {}, wm = {};
    function xa(e, t, a, i) {
      e === null ? t.child = lC(t, null, a, i) : t.child = xf(t, e.child, a, i);
    }
    function A_(e, t, a, i) {
      t.child = xf(t, e.child, null, i), t.child = xf(t, null, a, i);
    }
    function YC(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && Ji(
          s,
          i,
          // Resolved props
          "prop",
          Zt(a)
        );
      }
      var f = a.render, h = t.ref, y, b;
      _f(t, o), Nu(t);
      {
        if (zp.current = t, ra(!0), y = Lf(e, t, f, i, h, o), b = Af(), t.mode & Fn) {
          ir(!0);
          try {
            y = Lf(e, t, f, i, h, o), b = Af();
          } finally {
            ir(!1);
          }
        }
        ra(!1);
      }
      return po(), e !== null && !iu ? (pC(e, t, o), Fo(e, t, o)) : (Wr() && b && og(t), t.flags |= Ru, xa(e, t, y, o), t.child);
    }
    function WC(e, t, a, i, o) {
      if (e === null) {
        var s = a.type;
        if (FO(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = Bf(s), t.tag = Fe, t.type = f, kS(t, s), QC(e, t, f, i, o);
        }
        {
          var h = s.propTypes;
          h && Ji(
            h,
            i,
            // Resolved props
            "prop",
            Zt(s)
          );
        }
        var y = fE(a.type, null, i, t, t.mode, o);
        return y.ref = t.ref, y.return = t, t.child = y, y;
      }
      {
        var b = a.type, T = b.propTypes;
        T && Ji(
          T,
          i,
          // Resolved props
          "prop",
          Zt(b)
        );
      }
      var P = e.child, z = US(e, o);
      if (!z) {
        var W = P.memoizedProps, G = a.compare;
        if (G = G !== null ? G : et, G(W, i) && e.ref === t.ref)
          return Fo(e, t, o);
      }
      t.flags |= Ru;
      var J = ec(P, i);
      return J.ref = t.ref, J.return = t, t.child = J, J;
    }
    function QC(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === ut) {
          var f = s, h = f._payload, y = f._init;
          try {
            s = y(h);
          } catch {
            s = null;
          }
          var b = s && s.propTypes;
          b && Ji(
            b,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Zt(s)
          );
        }
      }
      if (e !== null) {
        var T = e.memoizedProps;
        if (et(T, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (iu = !1, t.pendingProps = i = T, US(e, o))
            (e.flags & ms) !== nt && (iu = !0);
          else
            return t.lanes = e.lanes, Fo(e, t, o);
      }
      return xS(e, t, a, i, o);
    }
    function GC(e, t, a) {
      var i = t.pendingProps, o = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || M)
        if ((t.mode & Ft) === st) {
          var f = {
            baseLanes: ne,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, zm(t, a);
        } else if (da(a, fa)) {
          var P = {
            baseLanes: ne,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = P;
          var z = s !== null ? s.baseLanes : a;
          zm(t, z);
        } else {
          var h = null, y;
          if (s !== null) {
            var b = s.baseLanes;
            y = Ut(b, a);
          } else
            y = a;
          t.lanes = t.childLanes = fa;
          var T = {
            baseLanes: y,
            cachePool: h,
            transitions: null
          };
          return t.memoizedState = T, t.updateQueue = null, zm(t, y), null;
        }
      else {
        var W;
        s !== null ? (W = Ut(s.baseLanes, a), t.memoizedState = null) : W = a, zm(t, W);
      }
      return xa(e, t, o, a), t.child;
    }
    function U_(e, t, a) {
      var i = t.pendingProps;
      return xa(e, t, i, a), t.child;
    }
    function z_(e, t, a) {
      var i = t.pendingProps.children;
      return xa(e, t, i, a), t.child;
    }
    function j_(e, t, a) {
      {
        t.flags |= At;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var o = t.pendingProps, s = o.children;
      return xa(e, t, s, a), t.child;
    }
    function qC(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= ia, t.flags |= Sd);
    }
    function xS(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && Ji(
          s,
          i,
          // Resolved props
          "prop",
          Zt(a)
        );
      }
      var f;
      {
        var h = Ef(t, a, !0);
        f = Cf(t, h);
      }
      var y, b;
      _f(t, o), Nu(t);
      {
        if (zp.current = t, ra(!0), y = Lf(e, t, a, i, f, o), b = Af(), t.mode & Fn) {
          ir(!0);
          try {
            y = Lf(e, t, a, i, f, o), b = Af();
          } finally {
            ir(!1);
          }
        }
        ra(!1);
      }
      return po(), e !== null && !iu ? (pC(e, t, o), Fo(e, t, o)) : (Wr() && b && og(t), t.flags |= Ru, xa(e, t, y, o), t.child);
    }
    function KC(e, t, a, i, o) {
      {
        switch (ek(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, h = new f(t.memoizedProps, s.context), y = h.state;
            s.updater.enqueueSetState(s, y, null);
            break;
          }
          case !0: {
            t.flags |= St, t.flags |= pr;
            var b = new Error("Simulated error coming from DevTools"), T = ur(o);
            t.lanes = Ut(t.lanes, T);
            var P = CS(t, Gs(b, t), T);
            wg(t, P);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var z = a.propTypes;
          z && Ji(
            z,
            i,
            // Resolved props
            "prop",
            Zt(a)
          );
        }
      }
      var W;
      $u(a) ? (W = !0, Uh(t)) : W = !1, _f(t, o);
      var G = t.stateNode, J;
      G === null ? (Rm(e, t), rC(t, a, i), Ug(t, a, i, o), J = !0) : e === null ? J = s_(t, a, i, o) : J = c_(e, t, a, i, o);
      var Ve = OS(e, t, a, J, W, o);
      {
        var ot = t.stateNode;
        J && ot.props !== i && (qs || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Tt(t) || "a component"), qs = !0);
      }
      return Ve;
    }
    function OS(e, t, a, i, o, s) {
      qC(e, t);
      var f = (t.flags & St) !== nt;
      if (!i && !f)
        return o && D0(t, a, !1), Fo(e, t, s);
      var h = t.stateNode;
      zp.current = t;
      var y;
      if (f && typeof a.getDerivedStateFromError != "function")
        y = null, HC();
      else {
        Nu(t);
        {
          if (ra(!0), y = h.render(), t.mode & Fn) {
            ir(!0);
            try {
              h.render();
            } finally {
              ir(!1);
            }
          }
          ra(!1);
        }
        po();
      }
      return t.flags |= Ru, e !== null && f ? A_(e, t, y, s) : xa(e, t, y, s), t.memoizedState = h.state, o && D0(t, a, !0), t.child;
    }
    function XC(e) {
      var t = e.stateNode;
      t.pendingContext ? O0(e, t.pendingContext, t.pendingContext !== t.context) : t.context && O0(e, t.context, !1), Vg(e, t.containerInfo);
    }
    function P_(e, t, a) {
      if (XC(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, o = t.memoizedState, s = o.element;
      q0(e, t), Kh(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var h = f.element;
      if (o.isDehydrated) {
        var y = {
          element: h,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, b = t.updateQueue;
        if (b.baseState = y, t.memoizedState = y, t.flags & $n) {
          var T = Gs(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return ZC(e, t, h, a, T);
        } else if (h !== s) {
          var P = Gs(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return ZC(e, t, h, a, P);
        } else {
          B1(t);
          var z = lC(t, null, h, a);
          t.child = z;
          for (var W = z; W; )
            W.flags = W.flags & ~xn | ja, W = W.sibling;
        }
      } else {
        if (Tf(), h === s)
          return Fo(e, t, a);
        xa(e, t, h, a);
      }
      return t.child;
    }
    function ZC(e, t, a, i, o) {
      return Tf(), pg(o), t.flags |= $n, xa(e, t, a, i), t.child;
    }
    function F_(e, t, a) {
      cC(t), e === null && dg(t);
      var i = t.type, o = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = o.children, h = Qy(i, o);
      return h ? f = null : s !== null && Qy(i, s) && (t.flags |= fn), qC(e, t), xa(e, t, f, a), t.child;
    }
    function H_(e, t) {
      return e === null && dg(t), null;
    }
    function V_(e, t, a, i) {
      Rm(e, t);
      var o = t.pendingProps, s = a, f = s._payload, h = s._init, y = h(f);
      t.type = y;
      var b = t.tag = HO(y), T = nu(y, o), P;
      switch (b) {
        case Y:
          return kS(t, y), t.type = y = Bf(y), P = xS(null, t, y, T, i), P;
        case $:
          return t.type = y = iE(y), P = KC(null, t, y, T, i), P;
        case Ue:
          return t.type = y = uE(y), P = YC(null, t, y, T, i), P;
        case Ke: {
          if (t.type !== t.elementType) {
            var z = y.propTypes;
            z && Ji(
              z,
              T,
              // Resolved for outer only
              "prop",
              Zt(y)
            );
          }
          return P = WC(
            null,
            t,
            y,
            nu(y.type, T),
            // The inner type can have defaults too
            i
          ), P;
        }
      }
      var W = "";
      throw y !== null && typeof y == "object" && y.$$typeof === ut && (W = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + y + ". " + ("Lazy element type must resolve to a class or function." + W));
    }
    function B_(e, t, a, i, o) {
      Rm(e, t), t.tag = $;
      var s;
      return $u(a) ? (s = !0, Uh(t)) : s = !1, _f(t, o), rC(t, a, i), Ug(t, a, i, o), OS(null, t, a, !0, s, o);
    }
    function $_(e, t, a, i) {
      Rm(e, t);
      var o = t.pendingProps, s;
      {
        var f = Ef(t, a, !1);
        s = Cf(t, f);
      }
      _f(t, i);
      var h, y;
      Nu(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var b = Zt(a) || "Unknown";
          bS[b] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", b, b), bS[b] = !0);
        }
        t.mode & Fn && tu.recordLegacyContextWarning(t, null), ra(!0), zp.current = t, h = Lf(null, t, a, o, s, i), y = Af(), ra(!1);
      }
      if (po(), t.flags |= Ru, typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0) {
        var T = Zt(a) || "Unknown";
        jp[T] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", T, T, T), jp[T] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof h == "object" && h !== null && typeof h.render == "function" && h.$$typeof === void 0
      ) {
        {
          var P = Zt(a) || "Unknown";
          jp[P] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", P, P, P), jp[P] = !0);
        }
        t.tag = $, t.memoizedState = null, t.updateQueue = null;
        var z = !1;
        return $u(a) ? (z = !0, Uh(t)) : z = !1, t.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, bg(t), nC(t, h), Ug(t, a, o, i), OS(null, t, a, !0, z, i);
      } else {
        if (t.tag = Y, t.mode & Fn) {
          ir(!0);
          try {
            h = Lf(null, t, a, o, s, i), y = Af();
          } finally {
            ir(!1);
          }
        }
        return Wr() && y && og(t), xa(null, t, h, i), kS(t, a), t.child;
      }
    }
    function kS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = $r();
          i && (a += `

Check the render method of \`` + i + "`.");
          var o = i || "", s = e._debugSource;
          s && (o = s.fileName + ":" + s.lineNumber), RS[o] || (RS[o] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var f = Zt(t) || "Unknown";
          TS[f] || (S("%s: Function components do not support getDerivedStateFromProps.", f), TS[f] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var h = Zt(t) || "Unknown";
          wS[h] || (S("%s: Function components do not support contextType.", h), wS[h] = !0);
        }
      }
    }
    var DS = {
      dehydrated: null,
      treeContext: null,
      retryLane: Yt
    };
    function MS(e) {
      return {
        baseLanes: e,
        cachePool: L_(),
        transitions: null
      };
    }
    function I_(e, t) {
      var a = null;
      return {
        baseLanes: Ut(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function Y_(e, t, a, i) {
      if (t !== null) {
        var o = t.memoizedState;
        if (o === null)
          return !1;
      }
      return Ig(e, Op);
    }
    function W_(e, t) {
      return gl(e.childLanes, t);
    }
    function JC(e, t, a) {
      var i = t.pendingProps;
      tk(t) && (t.flags |= St);
      var o = ru.current, s = !1, f = (t.flags & St) !== nt;
      if (f || Y_(o, e) ? (s = !0, t.flags &= ~St) : (e === null || e.memoizedState !== null) && (o = v_(o, dC)), o = kf(o), Vl(t, o), e === null) {
        dg(t);
        var h = t.memoizedState;
        if (h !== null) {
          var y = h.dehydrated;
          if (y !== null)
            return X_(t, y);
        }
        var b = i.children, T = i.fallback;
        if (s) {
          var P = Q_(t, b, T, a), z = t.child;
          return z.memoizedState = MS(a), t.memoizedState = DS, P;
        } else
          return NS(t, b);
      } else {
        var W = e.memoizedState;
        if (W !== null) {
          var G = W.dehydrated;
          if (G !== null)
            return Z_(e, t, f, i, G, W, a);
        }
        if (s) {
          var J = i.fallback, Ve = i.children, ot = q_(e, t, Ve, J, a), Je = t.child, Qt = e.child.memoizedState;
          return Je.memoizedState = Qt === null ? MS(a) : I_(Qt, a), Je.childLanes = W_(e, a), t.memoizedState = DS, ot;
        } else {
          var Bt = i.children, H = G_(e, t, Bt, a);
          return t.memoizedState = null, H;
        }
      }
    }
    function NS(e, t, a) {
      var i = e.mode, o = {
        mode: "visible",
        children: t
      }, s = LS(o, i);
      return s.return = e, e.child = s, s;
    }
    function Q_(e, t, a, i) {
      var o = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, h, y;
      return (o & Ft) === st && s !== null ? (h = s, h.childLanes = ne, h.pendingProps = f, e.mode & ft && (h.actualDuration = 0, h.actualStartTime = -1, h.selfBaseDuration = 0, h.treeBaseDuration = 0), y = ql(a, o, i, null)) : (h = LS(f, o), y = ql(a, o, i, null)), h.return = e, y.return = e, h.sibling = y, e.child = h, y;
    }
    function LS(e, t, a) {
      return ew(e, t, ne, null);
    }
    function eb(e, t) {
      return ec(e, t);
    }
    function G_(e, t, a, i) {
      var o = e.child, s = o.sibling, f = eb(o, {
        mode: "visible",
        children: a
      });
      if ((t.mode & Ft) === st && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var h = t.deletions;
        h === null ? (t.deletions = [s], t.flags |= ln) : h.push(s);
      }
      return t.child = f, f;
    }
    function q_(e, t, a, i, o) {
      var s = t.mode, f = e.child, h = f.sibling, y = {
        mode: "hidden",
        children: a
      }, b;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & Ft) === st && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var T = t.child;
        b = T, b.childLanes = ne, b.pendingProps = y, t.mode & ft && (b.actualDuration = 0, b.actualStartTime = -1, b.selfBaseDuration = f.selfBaseDuration, b.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        b = eb(f, y), b.subtreeFlags = f.subtreeFlags & Cr;
      var P;
      return h !== null ? P = ec(h, i) : (P = ql(i, s, o, null), P.flags |= xn), P.return = t, b.return = t, b.sibling = P, t.child = b, P;
    }
    function Tm(e, t, a, i) {
      i !== null && pg(i), xf(t, e.child, null, a);
      var o = t.pendingProps, s = o.children, f = NS(t, s);
      return f.flags |= xn, t.memoizedState = null, f;
    }
    function K_(e, t, a, i, o) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, h = LS(f, s), y = ql(i, s, o, null);
      return y.flags |= xn, h.return = t, y.return = t, h.sibling = y, t.child = h, (t.mode & Ft) !== st && xf(t, e.child, null, o), y;
    }
    function X_(e, t, a) {
      return (e.mode & Ft) === st ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = pt) : Xy(t) ? e.lanes = mo : e.lanes = fa, null;
    }
    function Z_(e, t, a, i, o, s, f) {
      if (a)
        if (t.flags & $n) {
          t.flags &= ~$n;
          var H = SS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Tm(e, t, f, H);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= St, null;
          var ee = i.children, V = i.fallback, he = K_(e, t, ee, V, f), Be = t.child;
          return Be.memoizedState = MS(f), t.memoizedState = DS, he;
        }
      else {
        if (H1(), (t.mode & Ft) === st)
          return Tm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Xy(o)) {
          var h, y, b;
          {
            var T = r1(o);
            h = T.digest, y = T.message, b = T.stack;
          }
          var P;
          y ? P = new Error(y) : P = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var z = SS(P, h, b);
          return Tm(e, t, f, z);
        }
        var W = da(f, e.childLanes);
        if (iu || W) {
          var G = Um();
          if (G !== null) {
            var J = gy(G, f);
            if (J !== Yt && J !== s.retryLane) {
              s.retryLane = J;
              var Ve = bn;
              Qa(e, J), Mr(G, e, J, Ve);
            }
          }
          eE();
          var ot = SS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Tm(e, t, f, ot);
        } else if (b0(o)) {
          t.flags |= St, t.child = e.child;
          var Je = wO.bind(null, e);
          return a1(o, Je), null;
        } else {
          $1(t, o, s.treeContext);
          var Qt = i.children, Bt = NS(t, Qt);
          return Bt.flags |= ja, Bt;
        }
      }
    }
    function tb(e, t, a) {
      e.lanes = Ut(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = Ut(i.lanes, t)), gg(e.return, t, a);
    }
    function J_(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === _e) {
          var o = i.memoizedState;
          o !== null && tb(i, a, e);
        } else if (i.tag === yt)
          tb(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function ex(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && rm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function tx(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !_S[e])
        if (_S[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function nx(e, t) {
      e !== void 0 && !wm[e] && (e !== "collapsed" && e !== "hidden" ? (wm[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (wm[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function nb(e, t) {
      {
        var a = $t(e), i = !a && typeof ei(e) == "function";
        if (a || i) {
          var o = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", o, t, o), !1;
        }
      }
      return !0;
    }
    function rx(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if ($t(e)) {
          for (var a = 0; a < e.length; a++)
            if (!nb(e[a], a))
              return;
        } else {
          var i = ei(e);
          if (typeof i == "function") {
            var o = i.call(e);
            if (o)
              for (var s = o.next(), f = 0; !s.done; s = o.next()) {
                if (!nb(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function AS(e, t, a, i, o) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: o
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = o);
    }
    function rb(e, t, a) {
      var i = t.pendingProps, o = i.revealOrder, s = i.tail, f = i.children;
      tx(o), nx(s, o), rx(f, o), xa(e, t, f, a);
      var h = ru.current, y = Ig(h, Op);
      if (y)
        h = Yg(h, Op), t.flags |= St;
      else {
        var b = e !== null && (e.flags & St) !== nt;
        b && J_(t, t.child, a), h = kf(h);
      }
      if (Vl(t, h), (t.mode & Ft) === st)
        t.memoizedState = null;
      else
        switch (o) {
          case "forwards": {
            var T = ex(t.child), P;
            T === null ? (P = t.child, t.child = null) : (P = T.sibling, T.sibling = null), AS(
              t,
              !1,
              // isBackwards
              P,
              T,
              s
            );
            break;
          }
          case "backwards": {
            var z = null, W = t.child;
            for (t.child = null; W !== null; ) {
              var G = W.alternate;
              if (G !== null && rm(G) === null) {
                t.child = W;
                break;
              }
              var J = W.sibling;
              W.sibling = z, z = W, W = J;
            }
            AS(
              t,
              !0,
              // isBackwards
              z,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            AS(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function ax(e, t, a) {
      Vg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = xf(t, null, i, a) : xa(e, t, i, a), t.child;
    }
    var ab = !1;
    function ix(e, t, a) {
      var i = t.type, o = i._context, s = t.pendingProps, f = t.memoizedProps, h = s.value;
      {
        "value" in s || ab || (ab = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var y = t.type.propTypes;
        y && Ji(y, s, "prop", "Context.Provider");
      }
      if (Y0(t, o, h), f !== null) {
        var b = f.value;
        if (Qe(b, h)) {
          if (f.children === s.children && !Lh())
            return Fo(e, t, a);
        } else
          J1(t, o, a);
      }
      var T = s.children;
      return xa(e, t, T, a), t.child;
    }
    var ib = !1;
    function ux(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (ib || (ib = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var o = t.pendingProps, s = o.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), _f(t, a);
      var f = gr(i);
      Nu(t);
      var h;
      return zp.current = t, ra(!0), h = s(f), ra(!1), po(), t.flags |= Ru, xa(e, t, h, a), t.child;
    }
    function Pp() {
      iu = !0;
    }
    function Rm(e, t) {
      (t.mode & Ft) === st && e !== null && (e.alternate = null, t.alternate = null, t.flags |= xn);
    }
    function Fo(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), HC(), Kp(t.lanes), da(a, t.childLanes) ? (f_(e, t), t.child) : null;
    }
    function ox(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var o = i.child;
          if (o === null)
            throw new Error("Expected parent to have a child.");
          for (; o.sibling !== t; )
            if (o = o.sibling, o === null)
              throw new Error("Expected to find the previous sibling.");
          o.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= ln) : s.push(e), a.flags |= xn, a;
      }
    }
    function US(e, t) {
      var a = e.lanes;
      return !!da(a, t);
    }
    function lx(e, t, a) {
      switch (t.tag) {
        case K:
          XC(t), t.stateNode, Tf();
          break;
        case ue:
          cC(t);
          break;
        case $: {
          var i = t.type;
          $u(i) && Uh(t);
          break;
        }
        case re:
          Vg(t, t.stateNode.containerInfo);
          break;
        case Ae: {
          var o = t.memoizedProps.value, s = t.type._context;
          Y0(t, s, o);
          break;
        }
        case Ze:
          {
            var f = da(a, t.childLanes);
            f && (t.flags |= At);
            {
              var h = t.stateNode;
              h.effectDuration = 0, h.passiveEffectDuration = 0;
            }
          }
          break;
        case _e: {
          var y = t.memoizedState;
          if (y !== null) {
            if (y.dehydrated !== null)
              return Vl(t, kf(ru.current)), t.flags |= St, null;
            var b = t.child, T = b.childLanes;
            if (da(a, T))
              return JC(e, t, a);
            Vl(t, kf(ru.current));
            var P = Fo(e, t, a);
            return P !== null ? P.sibling : null;
          } else
            Vl(t, kf(ru.current));
          break;
        }
        case yt: {
          var z = (e.flags & St) !== nt, W = da(a, t.childLanes);
          if (z) {
            if (W)
              return rb(e, t, a);
            t.flags |= St;
          }
          var G = t.memoizedState;
          if (G !== null && (G.rendering = null, G.tail = null, G.lastEffect = null), Vl(t, ru.current), W)
            break;
          return null;
        }
        case Ie:
        case rt:
          return t.lanes = ne, GC(e, t, a);
      }
      return Fo(e, t, a);
    }
    function ub(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return ox(e, t, fE(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, o = t.pendingProps;
        if (i !== o || Lh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          iu = !0;
        else {
          var s = US(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & St) === nt)
            return iu = !1, lx(e, t, a);
          (e.flags & ms) !== nt ? iu = !0 : iu = !1;
        }
      } else if (iu = !1, Wr() && A1(t)) {
        var f = t.index, h = U1();
        L0(t, h, f);
      }
      switch (t.lanes = ne, t.tag) {
        case oe:
          return $_(e, t, t.type, a);
        case kt: {
          var y = t.elementType;
          return V_(e, t, y, a);
        }
        case Y: {
          var b = t.type, T = t.pendingProps, P = t.elementType === b ? T : nu(b, T);
          return xS(e, t, b, P, a);
        }
        case $: {
          var z = t.type, W = t.pendingProps, G = t.elementType === z ? W : nu(z, W);
          return KC(e, t, z, G, a);
        }
        case K:
          return P_(e, t, a);
        case ue:
          return F_(e, t, a);
        case be:
          return H_(e, t);
        case _e:
          return JC(e, t, a);
        case re:
          return ax(e, t, a);
        case Ue: {
          var J = t.type, Ve = t.pendingProps, ot = t.elementType === J ? Ve : nu(J, Ve);
          return YC(e, t, J, ot, a);
        }
        case Te:
          return U_(e, t, a);
        case me:
          return z_(e, t, a);
        case Ze:
          return j_(e, t, a);
        case Ae:
          return ix(e, t, a);
        case tt:
          return ux(e, t, a);
        case Ke: {
          var Je = t.type, Qt = t.pendingProps, Bt = nu(Je, Qt);
          if (t.type !== t.elementType) {
            var H = Je.propTypes;
            H && Ji(
              H,
              Bt,
              // Resolved for outer only
              "prop",
              Zt(Je)
            );
          }
          return Bt = nu(Je.type, Bt), WC(e, t, Je, Bt, a);
        }
        case Fe:
          return QC(e, t, t.type, t.pendingProps, a);
        case qt: {
          var ee = t.type, V = t.pendingProps, he = t.elementType === ee ? V : nu(ee, V);
          return B_(e, t, ee, he, a);
        }
        case yt:
          return rb(e, t, a);
        case Mt:
          break;
        case Ie:
          return GC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Uf(e) {
      e.flags |= At;
    }
    function ob(e) {
      e.flags |= ia, e.flags |= Sd;
    }
    var lb, zS, sb, cb;
    lb = function(e, t, a, i) {
      for (var o = t.child; o !== null; ) {
        if (o.tag === ue || o.tag === be)
          MR(e, o.stateNode);
        else if (o.tag !== re) {
          if (o.child !== null) {
            o.child.return = o, o = o.child;
            continue;
          }
        }
        if (o === t)
          return;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === t)
            return;
          o = o.return;
        }
        o.sibling.return = o.return, o = o.sibling;
      }
    }, zS = function(e, t) {
    }, sb = function(e, t, a, i, o) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, h = Bg(), y = LR(f, a, s, i, o, h);
        t.updateQueue = y, y && Uf(t);
      }
    }, cb = function(e, t, a, i) {
      a !== i && Uf(t);
    };
    function Fp(e, t) {
      if (!Wr())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var o = e.tail, s = null; o !== null; )
              o.alternate !== null && (s = o), o = o.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function Gr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = ne, i = nt;
      if (t) {
        if ((e.mode & ft) !== st) {
          for (var y = e.selfBaseDuration, b = e.child; b !== null; )
            a = Ut(a, Ut(b.lanes, b.childLanes)), i |= b.subtreeFlags & Cr, i |= b.flags & Cr, y += b.treeBaseDuration, b = b.sibling;
          e.treeBaseDuration = y;
        } else
          for (var T = e.child; T !== null; )
            a = Ut(a, Ut(T.lanes, T.childLanes)), i |= T.subtreeFlags & Cr, i |= T.flags & Cr, T.return = e, T = T.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & ft) !== st) {
          for (var o = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = Ut(a, Ut(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, o += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = o, e.treeBaseDuration = s;
        } else
          for (var h = e.child; h !== null; )
            a = Ut(a, Ut(h.lanes, h.childLanes)), i |= h.subtreeFlags, i |= h.flags, h.return = e, h = h.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function sx(e, t, a) {
      if (G1() && (t.mode & Ft) !== st && (t.flags & St) === nt)
        return H0(t), Tf(), t.flags |= $n | Ca | pr, !1;
      var i = Hh(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (W1(t), Gr(t), (t.mode & ft) !== st) {
            var o = a !== null;
            if (o) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Tf(), (t.flags & St) === nt && (t.memoizedState = null), t.flags |= At, Gr(t), (t.mode & ft) !== st) {
            var f = a !== null;
            if (f) {
              var h = t.child;
              h !== null && (t.treeBaseDuration -= h.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return V0(), !0;
    }
    function fb(e, t, a) {
      var i = t.pendingProps;
      switch (lg(t), t.tag) {
        case oe:
        case kt:
        case Fe:
        case Y:
        case Ue:
        case Te:
        case me:
        case Ze:
        case tt:
        case Ke:
          return Gr(t), null;
        case $: {
          var o = t.type;
          return $u(o) && Ah(t), Gr(t), null;
        }
        case K: {
          var s = t.stateNode;
          if (Of(t), ag(t), Qg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = Hh(t);
            if (f)
              Uf(t);
            else if (e !== null) {
              var h = e.memoizedState;
              // Check if this is a client root
              (!h.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & $n) !== nt) && (t.flags |= za, V0());
            }
          }
          return zS(e, t), Gr(t), null;
        }
        case ue: {
          $g(t);
          var y = sC(), b = t.type;
          if (e !== null && t.stateNode != null)
            sb(e, t, b, i, y), e.ref !== t.ref && ob(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Gr(t), null;
            }
            var T = Bg(), P = Hh(t);
            if (P)
              I1(t, y, T) && Uf(t);
            else {
              var z = DR(b, i, y, T, t);
              lb(z, t, !1, !1), t.stateNode = z, NR(z, b, i, y) && Uf(t);
            }
            t.ref !== null && ob(t);
          }
          return Gr(t), null;
        }
        case be: {
          var W = i;
          if (e && t.stateNode != null) {
            var G = e.memoizedProps;
            cb(e, t, G, W);
          } else {
            if (typeof W != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var J = sC(), Ve = Bg(), ot = Hh(t);
            ot ? Y1(t) && Uf(t) : t.stateNode = AR(W, J, Ve, t);
          }
          return Gr(t), null;
        }
        case _e: {
          Df(t);
          var Je = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Qt = sx(e, t, Je);
            if (!Qt)
              return t.flags & pr ? t : null;
          }
          if ((t.flags & St) !== nt)
            return t.lanes = a, (t.mode & ft) !== st && gS(t), t;
          var Bt = Je !== null, H = e !== null && e.memoizedState !== null;
          if (Bt !== H && Bt) {
            var ee = t.child;
            if (ee.flags |= _u, (t.mode & Ft) !== st) {
              var V = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !R);
              V || Ig(ru.current, dC) ? cO() : eE();
            }
          }
          var he = t.updateQueue;
          if (he !== null && (t.flags |= At), Gr(t), (t.mode & ft) !== st && Bt) {
            var Be = t.child;
            Be !== null && (t.treeBaseDuration -= Be.treeBaseDuration);
          }
          return null;
        }
        case re:
          return Of(t), zS(e, t), e === null && x1(t.stateNode.containerInfo), Gr(t), null;
        case Ae:
          var ze = t.type._context;
          return yg(ze, t), Gr(t), null;
        case qt: {
          var ht = t.type;
          return $u(ht) && Ah(t), Gr(t), null;
        }
        case yt: {
          Df(t);
          var Ot = t.memoizedState;
          if (Ot === null)
            return Gr(t), null;
          var yn = (t.flags & St) !== nt, rn = Ot.rendering;
          if (rn === null)
            if (yn)
              Fp(Ot, !1);
            else {
              var cr = dO() && (e === null || (e.flags & St) === nt);
              if (!cr)
                for (var an = t.child; an !== null; ) {
                  var rr = rm(an);
                  if (rr !== null) {
                    yn = !0, t.flags |= St, Fp(Ot, !1);
                    var ma = rr.updateQueue;
                    return ma !== null && (t.updateQueue = ma, t.flags |= At), t.subtreeFlags = nt, d_(t, a), Vl(t, Yg(ru.current, Op)), t.child;
                  }
                  an = an.sibling;
                }
              Ot.tail !== null && Pn() > Nb() && (t.flags |= St, yn = !0, Fp(Ot, !1), t.lanes = Nd);
            }
          else {
            if (!yn) {
              var Jr = rm(rn);
              if (Jr !== null) {
                t.flags |= St, yn = !0;
                var fi = Jr.updateQueue;
                if (fi !== null && (t.updateQueue = fi, t.flags |= At), Fp(Ot, !0), Ot.tail === null && Ot.tailMode === "hidden" && !rn.alternate && !Wr())
                  return Gr(t), null;
              } else
                // The time it took to render last row is greater than the remaining
                // time we have to render. So rendering one more row would likely
                // exceed it.
                Pn() * 2 - Ot.renderingStartTime > Nb() && a !== fa && (t.flags |= St, yn = !0, Fp(Ot, !1), t.lanes = Nd);
            }
            if (Ot.isBackwards)
              rn.sibling = t.child, t.child = rn;
            else {
              var Da = Ot.last;
              Da !== null ? Da.sibling = rn : t.child = rn, Ot.last = rn;
            }
          }
          if (Ot.tail !== null) {
            var Ma = Ot.tail;
            Ot.rendering = Ma, Ot.tail = Ma.sibling, Ot.renderingStartTime = Pn(), Ma.sibling = null;
            var ya = ru.current;
            return yn ? ya = Yg(ya, Op) : ya = kf(ya), Vl(t, ya), Ma;
          }
          return Gr(t), null;
        }
        case Mt:
          break;
        case Ie:
        case rt: {
          JS(t);
          var Io = t.memoizedState, $f = Io !== null;
          if (e !== null) {
            var tv = e.memoizedState, Xu = tv !== null;
            Xu !== $f && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !M && (t.flags |= _u);
          }
          return !$f || (t.mode & Ft) === st ? Gr(t) : da(Ku, fa) && (Gr(t), t.subtreeFlags & (xn | At) && (t.flags |= _u)), null;
        }
        case at:
          return null;
        case Ct:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function cx(e, t, a) {
      switch (lg(t), t.tag) {
        case $: {
          var i = t.type;
          $u(i) && Ah(t);
          var o = t.flags;
          return o & pr ? (t.flags = o & ~pr | St, (t.mode & ft) !== st && gS(t), t) : null;
        }
        case K: {
          t.stateNode, Of(t), ag(t), Qg();
          var s = t.flags;
          return (s & pr) !== nt && (s & St) === nt ? (t.flags = s & ~pr | St, t) : null;
        }
        case ue:
          return $g(t), null;
        case _e: {
          Df(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Tf();
          }
          var h = t.flags;
          return h & pr ? (t.flags = h & ~pr | St, (t.mode & ft) !== st && gS(t), t) : null;
        }
        case yt:
          return Df(t), null;
        case re:
          return Of(t), null;
        case Ae:
          var y = t.type._context;
          return yg(y, t), null;
        case Ie:
        case rt:
          return JS(t), null;
        case at:
          return null;
        default:
          return null;
      }
    }
    function db(e, t, a) {
      switch (lg(t), t.tag) {
        case $: {
          var i = t.type.childContextTypes;
          i != null && Ah(t);
          break;
        }
        case K: {
          t.stateNode, Of(t), ag(t), Qg();
          break;
        }
        case ue: {
          $g(t);
          break;
        }
        case re:
          Of(t);
          break;
        case _e:
          Df(t);
          break;
        case yt:
          Df(t);
          break;
        case Ae:
          var o = t.type._context;
          yg(o, t);
          break;
        case Ie:
        case rt:
          JS(t);
          break;
      }
    }
    var pb = null;
    pb = /* @__PURE__ */ new Set();
    var _m = !1, qr = !1, fx = typeof WeakSet == "function" ? WeakSet : Set, Ge = null, zf = null, jf = null;
    function dx(e) {
      co(null, function() {
        throw e;
      }), yd();
    }
    var px = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & ft)
        try {
          Gu(), t.componentWillUnmount();
        } finally {
          Qu(e);
        }
      else
        t.componentWillUnmount();
    };
    function vb(e, t) {
      try {
        Il(Rr, e);
      } catch (a) {
        Mn(e, t, a);
      }
    }
    function jS(e, t, a) {
      try {
        px(e, a);
      } catch (i) {
        Mn(e, t, i);
      }
    }
    function vx(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        Mn(e, t, i);
      }
    }
    function hb(e, t) {
      try {
        yb(e);
      } catch (a) {
        Mn(e, t, a);
      }
    }
    function Pf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (we && xe && e.mode & ft)
              try {
                Gu(), i = a(null);
              } finally {
                Qu(e);
              }
            else
              i = a(null);
          } catch (o) {
            Mn(e, t, o);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Tt(e));
        } else
          a.current = null;
    }
    function xm(e, t, a) {
      try {
        a();
      } catch (i) {
        Mn(e, t, i);
      }
    }
    var mb = !1;
    function hx(e, t) {
      OR(e.containerInfo), Ge = t, mx();
      var a = mb;
      return mb = !1, a;
    }
    function mx() {
      for (; Ge !== null; ) {
        var e = Ge, t = e.child;
        (e.subtreeFlags & cl) !== nt && t !== null ? (t.return = e, Ge = t) : yx();
      }
    }
    function yx() {
      for (; Ge !== null; ) {
        var e = Ge;
        cn(e);
        try {
          gx(e);
        } catch (a) {
          Mn(e, e.return, a);
        }
        Bn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ge = t;
          return;
        }
        Ge = e.return;
      }
    }
    function gx(e) {
      var t = e.alternate, a = e.flags;
      if ((a & za) !== nt) {
        switch (cn(e), e.tag) {
          case Y:
          case Ue:
          case Fe:
            break;
          case $: {
            if (t !== null) {
              var i = t.memoizedProps, o = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !qs && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Tt(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Tt(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : nu(e.type, i), o);
              {
                var h = pb;
                f === void 0 && !h.has(e.type) && (h.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Tt(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case K: {
            {
              var y = e.stateNode;
              JR(y.containerInfo);
            }
            break;
          }
          case ue:
          case be:
          case re:
          case qt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        Bn();
      }
    }
    function uu(e, t, a) {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var s = o.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var h = f.destroy;
            f.destroy = void 0, h !== void 0 && ((e & Qr) !== Ga ? _c(t) : (e & Rr) !== Ga && xc(t), (e & Iu) !== Ga && Zp(!0), xm(t, a, h), (e & Iu) !== Ga && Zp(!1), (e & Qr) !== Ga ? Fv() : (e & Rr) !== Ga && fl());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function Il(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var o = i.next, s = o;
        do {
          if ((s.tag & e) === e) {
            (e & Qr) !== Ga ? Pv(t) : (e & Rr) !== Ga && Hv(t);
            var f = s.create;
            (e & Iu) !== Ga && Zp(!0), s.destroy = f(), (e & Iu) !== Ga && Zp(!1), (e & Qr) !== Ga ? kd() : (e & Rr) !== Ga && Vv();
            {
              var h = s.destroy;
              if (h !== void 0 && typeof h != "function") {
                var y = void 0;
                (s.tag & Rr) !== nt ? y = "useLayoutEffect" : (s.tag & Iu) !== nt ? y = "useInsertionEffect" : y = "useEffect";
                var b = void 0;
                h === null ? b = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof h.then == "function" ? b = `

It looks like you wrote ` + y + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + y + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : b = " You returned: " + h, S("%s must not return anything besides a function, which is used for clean-up.%s", y, b);
              }
            }
          }
          s = s.next;
        } while (s !== o);
      }
    }
    function Sx(e, t) {
      if ((t.flags & At) !== nt)
        switch (t.tag) {
          case Ze: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, o = i.id, s = i.onPostCommit, f = PC(), h = t.alternate === null ? "mount" : "update";
            jC() && (h = "nested-update"), typeof s == "function" && s(o, h, a, f);
            var y = t.return;
            e:
              for (; y !== null; ) {
                switch (y.tag) {
                  case K:
                    var b = y.stateNode;
                    b.passiveEffectDuration += a;
                    break e;
                  case Ze:
                    var T = y.stateNode;
                    T.passiveEffectDuration += a;
                    break e;
                }
                y = y.return;
              }
            break;
          }
        }
    }
    function Ex(e, t, a, i) {
      if ((a.flags & Lr) !== nt)
        switch (a.tag) {
          case Y:
          case Ue:
          case Fe: {
            if (!qr)
              if (a.mode & ft)
                try {
                  Gu(), Il(Rr | Tr, a);
                } finally {
                  Qu(a);
                }
              else
                Il(Rr | Tr, a);
            break;
          }
          case $: {
            var o = a.stateNode;
            if (a.flags & At && !qr)
              if (t === null)
                if (a.type === a.elementType && !qs && (o.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Tt(a) || "instance"), o.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Tt(a) || "instance")), a.mode & ft)
                  try {
                    Gu(), o.componentDidMount();
                  } finally {
                    Qu(a);
                  }
                else
                  o.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : nu(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !qs && (o.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Tt(a) || "instance"), o.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Tt(a) || "instance")), a.mode & ft)
                  try {
                    Gu(), o.componentDidUpdate(s, f, o.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Qu(a);
                  }
                else
                  o.componentDidUpdate(s, f, o.__reactInternalSnapshotBeforeUpdate);
              }
            var h = a.updateQueue;
            h !== null && (a.type === a.elementType && !qs && (o.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Tt(a) || "instance"), o.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Tt(a) || "instance")), X0(a, h, o));
            break;
          }
          case K: {
            var y = a.updateQueue;
            if (y !== null) {
              var b = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ue:
                    b = a.child.stateNode;
                    break;
                  case $:
                    b = a.child.stateNode;
                    break;
                }
              X0(a, y, b);
            }
            break;
          }
          case ue: {
            var T = a.stateNode;
            if (t === null && a.flags & At) {
              var P = a.type, z = a.memoizedProps;
              FR(T, P, z);
            }
            break;
          }
          case be:
            break;
          case re:
            break;
          case Ze: {
            {
              var W = a.memoizedProps, G = W.onCommit, J = W.onRender, Ve = a.stateNode.effectDuration, ot = PC(), Je = t === null ? "mount" : "update";
              jC() && (Je = "nested-update"), typeof J == "function" && J(a.memoizedProps.id, Je, a.actualDuration, a.treeBaseDuration, a.actualStartTime, ot);
              {
                typeof G == "function" && G(a.memoizedProps.id, Je, Ve, ot), yO(a);
                var Qt = a.return;
                e:
                  for (; Qt !== null; ) {
                    switch (Qt.tag) {
                      case K:
                        var Bt = Qt.stateNode;
                        Bt.effectDuration += Ve;
                        break e;
                      case Ze:
                        var H = Qt.stateNode;
                        H.effectDuration += Ve;
                        break e;
                    }
                    Qt = Qt.return;
                  }
              }
            }
            break;
          }
          case _e: {
            Ox(e, a);
            break;
          }
          case yt:
          case qt:
          case Mt:
          case Ie:
          case rt:
          case Ct:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      qr || a.flags & ia && yb(a);
    }
    function Cx(e) {
      switch (e.tag) {
        case Y:
        case Ue:
        case Fe: {
          if (e.mode & ft)
            try {
              Gu(), vb(e, e.return);
            } finally {
              Qu(e);
            }
          else
            vb(e, e.return);
          break;
        }
        case $: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && vx(e, e.return, t), hb(e, e.return);
          break;
        }
        case ue: {
          hb(e, e.return);
          break;
        }
      }
    }
    function bx(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === ue) {
          if (a === null) {
            a = i;
            try {
              var o = i.stateNode;
              t ? qR(o) : XR(i.stateNode, i.memoizedProps);
            } catch (f) {
              Mn(e, e.return, f);
            }
          }
        } else if (i.tag === be) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? KR(s) : ZR(s, i.memoizedProps);
            } catch (f) {
              Mn(e, e.return, f);
            }
        } else if (!((i.tag === Ie || i.tag === rt) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function yb(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case ue:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var o;
          if (e.mode & ft)
            try {
              Gu(), o = t(i);
            } finally {
              Qu(e);
            }
          else
            o = t(i);
          typeof o == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Tt(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Tt(e)), t.current = i;
      }
    }
    function wx(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function gb(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, gb(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ue) {
          var a = e.stateNode;
          a !== null && D1(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Tx(e) {
      for (var t = e.return; t !== null; ) {
        if (Sb(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Sb(e) {
      return e.tag === ue || e.tag === K || e.tag === re;
    }
    function Eb(e) {
      var t = e;
      e:
        for (; ; ) {
          for (; t.sibling === null; ) {
            if (t.return === null || Sb(t.return))
              return null;
            t = t.return;
          }
          for (t.sibling.return = t.return, t = t.sibling; t.tag !== ue && t.tag !== be && t.tag !== mt; ) {
            if (t.flags & xn || t.child === null || t.tag === re)
              continue e;
            t.child.return = t, t = t.child;
          }
          if (!(t.flags & xn))
            return t.stateNode;
        }
    }
    function Rx(e) {
      var t = Tx(e);
      switch (t.tag) {
        case ue: {
          var a = t.stateNode;
          t.flags & fn && (C0(a), t.flags &= ~fn);
          var i = Eb(e);
          FS(e, i, a);
          break;
        }
        case K:
        case re: {
          var o = t.stateNode.containerInfo, s = Eb(e);
          PS(e, s, o);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function PS(e, t, a) {
      var i = e.tag, o = i === ue || i === be;
      if (o) {
        var s = e.stateNode;
        t ? YR(a, s, t) : $R(a, s);
      } else if (i !== re) {
        var f = e.child;
        if (f !== null) {
          PS(f, t, a);
          for (var h = f.sibling; h !== null; )
            PS(h, t, a), h = h.sibling;
        }
      }
    }
    function FS(e, t, a) {
      var i = e.tag, o = i === ue || i === be;
      if (o) {
        var s = e.stateNode;
        t ? IR(a, s, t) : BR(a, s);
      } else if (i !== re) {
        var f = e.child;
        if (f !== null) {
          FS(f, t, a);
          for (var h = f.sibling; h !== null; )
            FS(h, t, a), h = h.sibling;
        }
      }
    }
    var Kr = null, ou = !1;
    function _x(e, t, a) {
      {
        var i = t;
        e:
          for (; i !== null; ) {
            switch (i.tag) {
              case ue: {
                Kr = i.stateNode, ou = !1;
                break e;
              }
              case K: {
                Kr = i.stateNode.containerInfo, ou = !0;
                break e;
              }
              case re: {
                Kr = i.stateNode.containerInfo, ou = !0;
                break e;
              }
            }
            i = i.return;
          }
        if (Kr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        Cb(e, t, a), Kr = null, ou = !1;
      }
      wx(a);
    }
    function Yl(e, t, a) {
      for (var i = a.child; i !== null; )
        Cb(e, t, i), i = i.sibling;
    }
    function Cb(e, t, a) {
      switch (xd(a), a.tag) {
        case ue:
          qr || Pf(a, t);
        case be: {
          {
            var i = Kr, o = ou;
            Kr = null, Yl(e, t, a), Kr = i, ou = o, Kr !== null && (ou ? QR(Kr, a.stateNode) : WR(Kr, a.stateNode));
          }
          return;
        }
        case mt: {
          Kr !== null && (ou ? GR(Kr, a.stateNode) : Ky(Kr, a.stateNode));
          return;
        }
        case re: {
          {
            var s = Kr, f = ou;
            Kr = a.stateNode.containerInfo, ou = !0, Yl(e, t, a), Kr = s, ou = f;
          }
          return;
        }
        case Y:
        case Ue:
        case Ke:
        case Fe: {
          if (!qr) {
            var h = a.updateQueue;
            if (h !== null) {
              var y = h.lastEffect;
              if (y !== null) {
                var b = y.next, T = b;
                do {
                  var P = T, z = P.destroy, W = P.tag;
                  z !== void 0 && ((W & Iu) !== Ga ? xm(a, t, z) : (W & Rr) !== Ga && (xc(a), a.mode & ft ? (Gu(), xm(a, t, z), Qu(a)) : xm(a, t, z), fl())), T = T.next;
                } while (T !== b);
              }
            }
          }
          Yl(e, t, a);
          return;
        }
        case $: {
          if (!qr) {
            Pf(a, t);
            var G = a.stateNode;
            typeof G.componentWillUnmount == "function" && jS(a, t, G);
          }
          Yl(e, t, a);
          return;
        }
        case Mt: {
          Yl(e, t, a);
          return;
        }
        case Ie: {
          if (
            // TODO: Remove this dead flag
            a.mode & Ft
          ) {
            var J = qr;
            qr = J || a.memoizedState !== null, Yl(e, t, a), qr = J;
          } else
            Yl(e, t, a);
          break;
        }
        default: {
          Yl(e, t, a);
          return;
        }
      }
    }
    function xx(e) {
      e.memoizedState;
    }
    function Ox(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var o = i.memoizedState;
          if (o !== null) {
            var s = o.dehydrated;
            s !== null && p1(s);
          }
        }
      }
    }
    function bb(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new fx()), t.forEach(function(i) {
          var o = TO.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), br)
              if (zf !== null && jf !== null)
                Xp(jf, zf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(o, o);
          }
        });
      }
    }
    function kx(e, t, a) {
      zf = a, jf = e, cn(t), wb(t, e), cn(t), zf = null, jf = null;
    }
    function lu(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var o = 0; o < i.length; o++) {
          var s = i[o];
          try {
            _x(e, t, s);
          } catch (y) {
            Mn(s, t, y);
          }
        }
      var f = ac();
      if (t.subtreeFlags & la)
        for (var h = t.child; h !== null; )
          cn(h), wb(h, e), h = h.sibling;
      cn(f);
    }
    function wb(e, t, a) {
      var i = e.alternate, o = e.flags;
      switch (e.tag) {
        case Y:
        case Ue:
        case Ke:
        case Fe: {
          if (lu(t, e), qu(e), o & At) {
            try {
              uu(Iu | Tr, e, e.return), Il(Iu | Tr, e);
            } catch (ht) {
              Mn(e, e.return, ht);
            }
            if (e.mode & ft) {
              try {
                Gu(), uu(Rr | Tr, e, e.return);
              } catch (ht) {
                Mn(e, e.return, ht);
              }
              Qu(e);
            } else
              try {
                uu(Rr | Tr, e, e.return);
              } catch (ht) {
                Mn(e, e.return, ht);
              }
          }
          return;
        }
        case $: {
          lu(t, e), qu(e), o & ia && i !== null && Pf(i, i.return);
          return;
        }
        case ue: {
          lu(t, e), qu(e), o & ia && i !== null && Pf(i, i.return);
          {
            if (e.flags & fn) {
              var s = e.stateNode;
              try {
                C0(s);
              } catch (ht) {
                Mn(e, e.return, ht);
              }
            }
            if (o & At) {
              var f = e.stateNode;
              if (f != null) {
                var h = e.memoizedProps, y = i !== null ? i.memoizedProps : h, b = e.type, T = e.updateQueue;
                if (e.updateQueue = null, T !== null)
                  try {
                    HR(f, T, b, y, h, e);
                  } catch (ht) {
                    Mn(e, e.return, ht);
                  }
              }
            }
          }
          return;
        }
        case be: {
          if (lu(t, e), qu(e), o & At) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var P = e.stateNode, z = e.memoizedProps, W = i !== null ? i.memoizedProps : z;
            try {
              VR(P, W, z);
            } catch (ht) {
              Mn(e, e.return, ht);
            }
          }
          return;
        }
        case K: {
          if (lu(t, e), qu(e), o & At && i !== null) {
            var G = i.memoizedState;
            if (G.isDehydrated)
              try {
                d1(t.containerInfo);
              } catch (ht) {
                Mn(e, e.return, ht);
              }
          }
          return;
        }
        case re: {
          lu(t, e), qu(e);
          return;
        }
        case _e: {
          lu(t, e), qu(e);
          var J = e.child;
          if (J.flags & _u) {
            var Ve = J.stateNode, ot = J.memoizedState, Je = ot !== null;
            if (Ve.isHidden = Je, Je) {
              var Qt = J.alternate !== null && J.alternate.memoizedState !== null;
              Qt || sO();
            }
          }
          if (o & At) {
            try {
              xx(e);
            } catch (ht) {
              Mn(e, e.return, ht);
            }
            bb(e);
          }
          return;
        }
        case Ie: {
          var Bt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & Ft
          ) {
            var H = qr;
            qr = H || Bt, lu(t, e), qr = H;
          } else
            lu(t, e);
          if (qu(e), o & _u) {
            var ee = e.stateNode, V = e.memoizedState, he = V !== null, Be = e;
            if (ee.isHidden = he, he && !Bt && (Be.mode & Ft) !== st) {
              Ge = Be;
              for (var ze = Be.child; ze !== null; )
                Ge = ze, Mx(ze), ze = ze.sibling;
            }
            bx(Be, he);
          }
          return;
        }
        case yt: {
          lu(t, e), qu(e), o & At && bb(e);
          return;
        }
        case Mt:
          return;
        default: {
          lu(t, e), qu(e);
          return;
        }
      }
    }
    function qu(e) {
      var t = e.flags;
      if (t & xn) {
        try {
          Rx(e);
        } catch (a) {
          Mn(e, e.return, a);
        }
        e.flags &= ~xn;
      }
      t & ja && (e.flags &= ~ja);
    }
    function Dx(e, t, a) {
      zf = a, jf = t, Ge = e, Tb(e, t, a), zf = null, jf = null;
    }
    function Tb(e, t, a) {
      for (var i = (e.mode & Ft) !== st; Ge !== null; ) {
        var o = Ge, s = o.child;
        if (o.tag === Ie && i) {
          var f = o.memoizedState !== null, h = f || _m;
          if (h) {
            HS(e, t, a);
            continue;
          } else {
            var y = o.alternate, b = y !== null && y.memoizedState !== null, T = b || qr, P = _m, z = qr;
            _m = h, qr = T, qr && !z && (Ge = o, Nx(o));
            for (var W = s; W !== null; )
              Ge = W, Tb(
                W,
                // New root; bubble back up to here and stop.
                t,
                a
              ), W = W.sibling;
            Ge = o, _m = P, qr = z, HS(e, t, a);
            continue;
          }
        }
        (o.subtreeFlags & Lr) !== nt && s !== null ? (s.return = o, Ge = s) : HS(e, t, a);
      }
    }
    function HS(e, t, a) {
      for (; Ge !== null; ) {
        var i = Ge;
        if ((i.flags & Lr) !== nt) {
          var o = i.alternate;
          cn(i);
          try {
            Ex(t, o, i, a);
          } catch (f) {
            Mn(i, i.return, f);
          }
          Bn();
        }
        if (i === e) {
          Ge = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, Ge = s;
          return;
        }
        Ge = i.return;
      }
    }
    function Mx(e) {
      for (; Ge !== null; ) {
        var t = Ge, a = t.child;
        switch (t.tag) {
          case Y:
          case Ue:
          case Ke:
          case Fe: {
            if (t.mode & ft)
              try {
                Gu(), uu(Rr, t, t.return);
              } finally {
                Qu(t);
              }
            else
              uu(Rr, t, t.return);
            break;
          }
          case $: {
            Pf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && jS(t, t.return, i);
            break;
          }
          case ue: {
            Pf(t, t.return);
            break;
          }
          case Ie: {
            var o = t.memoizedState !== null;
            if (o) {
              Rb(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Ge = a) : Rb(e);
      }
    }
    function Rb(e) {
      for (; Ge !== null; ) {
        var t = Ge;
        if (t === e) {
          Ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ge = a;
          return;
        }
        Ge = t.return;
      }
    }
    function Nx(e) {
      for (; Ge !== null; ) {
        var t = Ge, a = t.child;
        if (t.tag === Ie) {
          var i = t.memoizedState !== null;
          if (i) {
            _b(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Ge = a) : _b(e);
      }
    }
    function _b(e) {
      for (; Ge !== null; ) {
        var t = Ge;
        cn(t);
        try {
          Cx(t);
        } catch (i) {
          Mn(t, t.return, i);
        }
        if (Bn(), t === e) {
          Ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ge = a;
          return;
        }
        Ge = t.return;
      }
    }
    function Lx(e, t, a, i) {
      Ge = t, Ax(t, e, a, i);
    }
    function Ax(e, t, a, i) {
      for (; Ge !== null; ) {
        var o = Ge, s = o.child;
        (o.subtreeFlags & Pa) !== nt && s !== null ? (s.return = o, Ge = s) : Ux(e, t, a, i);
      }
    }
    function Ux(e, t, a, i) {
      for (; Ge !== null; ) {
        var o = Ge;
        if ((o.flags & An) !== nt) {
          cn(o);
          try {
            zx(t, o, a, i);
          } catch (f) {
            Mn(o, o.return, f);
          }
          Bn();
        }
        if (o === e) {
          Ge = null;
          return;
        }
        var s = o.sibling;
        if (s !== null) {
          s.return = o.return, Ge = s;
          return;
        }
        Ge = o.return;
      }
    }
    function zx(e, t, a, i) {
      switch (t.tag) {
        case Y:
        case Ue:
        case Fe: {
          if (t.mode & ft) {
            yS();
            try {
              Il(Qr | Tr, t);
            } finally {
              mS(t);
            }
          } else
            Il(Qr | Tr, t);
          break;
        }
      }
    }
    function jx(e) {
      Ge = e, Px();
    }
    function Px() {
      for (; Ge !== null; ) {
        var e = Ge, t = e.child;
        if ((Ge.flags & ln) !== nt) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var o = a[i];
              Ge = o, Vx(o, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var h = f.sibling;
                    f.sibling = null, f = h;
                  } while (f !== null);
                }
              }
            }
            Ge = e;
          }
        }
        (e.subtreeFlags & Pa) !== nt && t !== null ? (t.return = e, Ge = t) : Fx();
      }
    }
    function Fx() {
      for (; Ge !== null; ) {
        var e = Ge;
        (e.flags & An) !== nt && (cn(e), Hx(e), Bn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ge = t;
          return;
        }
        Ge = e.return;
      }
    }
    function Hx(e) {
      switch (e.tag) {
        case Y:
        case Ue:
        case Fe: {
          e.mode & ft ? (yS(), uu(Qr | Tr, e, e.return), mS(e)) : uu(Qr | Tr, e, e.return);
          break;
        }
      }
    }
    function Vx(e, t) {
      for (; Ge !== null; ) {
        var a = Ge;
        cn(a), $x(a, t), Bn();
        var i = a.child;
        i !== null ? (i.return = a, Ge = i) : Bx(e);
      }
    }
    function Bx(e) {
      for (; Ge !== null; ) {
        var t = Ge, a = t.sibling, i = t.return;
        if (gb(t), t === e) {
          Ge = null;
          return;
        }
        if (a !== null) {
          a.return = i, Ge = a;
          return;
        }
        Ge = i;
      }
    }
    function $x(e, t) {
      switch (e.tag) {
        case Y:
        case Ue:
        case Fe: {
          e.mode & ft ? (yS(), uu(Qr, e, t), mS(e)) : uu(Qr, e, t);
          break;
        }
      }
    }
    function Ix(e) {
      switch (e.tag) {
        case Y:
        case Ue:
        case Fe: {
          try {
            Il(Rr | Tr, e);
          } catch (a) {
            Mn(e, e.return, a);
          }
          break;
        }
        case $: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            Mn(e, e.return, a);
          }
          break;
        }
      }
    }
    function Yx(e) {
      switch (e.tag) {
        case Y:
        case Ue:
        case Fe: {
          try {
            Il(Qr | Tr, e);
          } catch (t) {
            Mn(e, e.return, t);
          }
          break;
        }
      }
    }
    function Wx(e) {
      switch (e.tag) {
        case Y:
        case Ue:
        case Fe: {
          try {
            uu(Rr | Tr, e, e.return);
          } catch (a) {
            Mn(e, e.return, a);
          }
          break;
        }
        case $: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && jS(e, e.return, t);
          break;
        }
      }
    }
    function Qx(e) {
      switch (e.tag) {
        case Y:
        case Ue:
        case Fe:
          try {
            uu(Qr | Tr, e, e.return);
          } catch (t) {
            Mn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Hp = Symbol.for;
      Hp("selector.component"), Hp("selector.has_pseudo_class"), Hp("selector.role"), Hp("selector.test_id"), Hp("selector.text");
    }
    var Gx = [];
    function qx() {
      Gx.forEach(function(e) {
        return e();
      });
    }
    var Kx = p.ReactCurrentActQueue;
    function Xx(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function xb() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && Kx.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var Zx = Math.ceil, VS = p.ReactCurrentDispatcher, BS = p.ReactCurrentOwner, Xr = p.ReactCurrentBatchConfig, su = p.ReactCurrentActQueue, Or = (
      /*             */
      0
    ), Ob = (
      /*               */
      1
    ), Zr = (
      /*                */
      2
    ), Ni = (
      /*                */
      4
    ), Ho = 0, Vp = 1, Ks = 2, Om = 3, Bp = 4, kb = 5, $S = 6, Wt = Or, Oa = null, Zn = null, kr = ne, Ku = ne, IS = Ul(ne), Dr = Ho, $p = null, km = ne, Ip = ne, Dm = ne, Yp = null, qa = null, YS = 0, Db = 500, Mb = 1 / 0, Jx = 500, Vo = null;
    function Wp() {
      Mb = Pn() + Jx;
    }
    function Nb() {
      return Mb;
    }
    var Mm = !1, WS = null, Ff = null, Xs = !1, Wl = null, Qp = ne, QS = [], GS = null, eO = 50, Gp = 0, qS = null, KS = !1, Nm = !1, tO = 50, Hf = 0, Lm = null, qp = bn, Am = ne, Lb = !1;
    function Um() {
      return Oa;
    }
    function ka() {
      return (Wt & (Zr | Ni)) !== Or ? Pn() : (qp !== bn || (qp = Pn()), qp);
    }
    function Ql(e) {
      var t = e.mode;
      if ((t & Ft) === st)
        return pt;
      if ((Wt & Zr) !== Or && kr !== ne)
        return ur(kr);
      var a = X1() !== K1;
      if (a) {
        if (Xr.transition !== null) {
          var i = Xr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Am === Yt && (Am = Ud()), Am;
      }
      var o = Ba();
      if (o !== Yt)
        return o;
      var s = UR();
      return s;
    }
    function nO(e) {
      var t = e.mode;
      return (t & Ft) === st ? pt : yy();
    }
    function Mr(e, t, a, i) {
      _O(), Lb && S("useInsertionEffect must not schedule updates."), KS && (Nm = !0), wo(e, a, i), (Wt & Zr) !== ne && e === Oa ? kO(t) : (br && Hd(e, t, a), DO(t), e === Oa && ((Wt & Zr) === Or && (Ip = Ut(Ip, a)), Dr === Bp && Gl(e, kr)), Ka(e, i), a === pt && Wt === Or && (t.mode & Ft) === st && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !su.isBatchingLegacy && (Wp(), N0()));
    }
    function rO(e, t, a) {
      var i = e.current;
      i.lanes = t, wo(e, t, a), Ka(e, a);
    }
    function aO(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Wt & Zr) !== Or
      );
    }
    function Ka(e, t) {
      var a = e.callbackNode;
      vy(e, t);
      var i = bs(e, e === Oa ? kr : ne);
      if (i === ne) {
        a !== null && qb(a), e.callbackNode = null, e.callbackPriority = Yt;
        return;
      }
      var o = tr(i), s = e.callbackPriority;
      if (s === o && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(su.current !== null && a !== rE)) {
        a == null && s !== pt && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && qb(a);
      var f;
      if (o === pt)
        e.tag === zl ? (su.isBatchingLegacy !== null && (su.didScheduleLegacyUpdate = !0), L1(zb.bind(null, e))) : M0(zb.bind(null, e)), su.current !== null ? su.current.push(jl) : jR(function() {
          (Wt & (Zr | Ni)) === Or && jl();
        }), f = null;
      else {
        var h;
        switch (xs(i)) {
          case Ar:
            h = wc;
            break;
          case wr:
            h = Ta;
            break;
          case Gi:
            h = bi;
            break;
          case Rs:
            h = Ou;
            break;
          default:
            h = bi;
            break;
        }
        f = aE(h, Ab.bind(null, e));
      }
      e.callbackPriority = o, e.callbackNode = f;
    }
    function Ab(e, t) {
      if (__(), qp = bn, Am = ne, (Wt & (Zr | Ni)) !== Or)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = $o();
      if (i && e.callbackNode !== a)
        return null;
      var o = bs(e, e === Oa ? kr : ne);
      if (o === ne)
        return null;
      var s = !Ts(e, o) && !Qv(e, o) && !t, f = s ? vO(e, o) : jm(e, o);
      if (f !== Ho) {
        if (f === Ks) {
          var h = Ld(e);
          h !== ne && (o = h, f = XS(e, h));
        }
        if (f === Vp) {
          var y = $p;
          throw Zs(e, ne), Gl(e, o), Ka(e, Pn()), y;
        }
        if (f === $S)
          Gl(e, o);
        else {
          var b = !Ts(e, o), T = e.current.alternate;
          if (b && !uO(T)) {
            if (f = jm(e, o), f === Ks) {
              var P = Ld(e);
              P !== ne && (o = P, f = XS(e, P));
            }
            if (f === Vp) {
              var z = $p;
              throw Zs(e, ne), Gl(e, o), Ka(e, Pn()), z;
            }
          }
          e.finishedWork = T, e.finishedLanes = o, iO(e, f, o);
        }
      }
      return Ka(e, Pn()), e.callbackNode === a ? Ab.bind(null, e) : null;
    }
    function XS(e, t) {
      var a = Yp;
      if (lr(e)) {
        var i = Zs(e, t);
        i.flags |= $n, _1(e.containerInfo);
      }
      var o = jm(e, t);
      if (o !== Ks) {
        var s = qa;
        qa = a, s !== null && Ub(s);
      }
      return o;
    }
    function Ub(e) {
      qa === null ? qa = e : qa.push.apply(qa, e);
    }
    function iO(e, t, a) {
      switch (t) {
        case Ho:
        case Vp:
          throw new Error("Root did not complete. This is a bug in React.");
        case Ks: {
          Js(e, qa, Vo);
          break;
        }
        case Om: {
          if (Gl(e, a), Qc(a) && // do not delay if we're inside an act() scope
          !Kb()) {
            var i = YS + Db - Pn();
            if (i > 10) {
              var o = bs(e, ne);
              if (o !== ne)
                break;
              var s = e.suspendedLanes;
              if (!bo(s, a)) {
                ka(), Pd(e, s);
                break;
              }
              e.timeoutHandle = Gy(Js.bind(null, e, qa, Vo), i);
              break;
            }
          }
          Js(e, qa, Vo);
          break;
        }
        case Bp: {
          if (Gl(e, a), Wv(a))
            break;
          if (!Kb()) {
            var f = Yv(e, a), h = f, y = Pn() - h, b = RO(y) - y;
            if (b > 10) {
              e.timeoutHandle = Gy(Js.bind(null, e, qa, Vo), b);
              break;
            }
          }
          Js(e, qa, Vo);
          break;
        }
        case kb: {
          Js(e, qa, Vo);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function uO(e) {
      for (var t = e; ; ) {
        if (t.flags & hs) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var o = 0; o < i.length; o++) {
                var s = i[o], f = s.getSnapshot, h = s.value;
                try {
                  if (!Qe(f(), h))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var y = t.child;
        if (t.subtreeFlags & hs && y !== null) {
          y.return = t, t = y;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Gl(e, t) {
      t = gl(t, Dm), t = gl(t, Ip), jd(e, t);
    }
    function zb(e) {
      if (x_(), (Wt & (Zr | Ni)) !== Or)
        throw new Error("Should not already be working.");
      $o();
      var t = bs(e, ne);
      if (!da(t, pt))
        return Ka(e, Pn()), null;
      var a = jm(e, t);
      if (e.tag !== zl && a === Ks) {
        var i = Ld(e);
        i !== ne && (t = i, a = XS(e, i));
      }
      if (a === Vp) {
        var o = $p;
        throw Zs(e, ne), Gl(e, t), Ka(e, Pn()), o;
      }
      if (a === $S)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, Js(e, qa, Vo), Ka(e, Pn()), null;
    }
    function oO(e, t) {
      t !== ne && (Sl(e, Ut(t, pt)), Ka(e, Pn()), (Wt & (Zr | Ni)) === Or && (Wp(), jl()));
    }
    function ZS(e, t) {
      var a = Wt;
      Wt |= Ob;
      try {
        return e(t);
      } finally {
        Wt = a, Wt === Or && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !su.isBatchingLegacy && (Wp(), N0());
      }
    }
    function lO(e, t, a, i, o) {
      var s = Ba(), f = Xr.transition;
      try {
        return Xr.transition = null, or(Ar), e(t, a, i, o);
      } finally {
        or(s), Xr.transition = f, Wt === Or && Wp();
      }
    }
    function Bo(e) {
      Wl !== null && Wl.tag === zl && (Wt & (Zr | Ni)) === Or && $o();
      var t = Wt;
      Wt |= Ob;
      var a = Xr.transition, i = Ba();
      try {
        return Xr.transition = null, or(Ar), e ? e() : void 0;
      } finally {
        or(i), Xr.transition = a, Wt = t, (Wt & (Zr | Ni)) === Or && jl();
      }
    }
    function jb() {
      return (Wt & (Zr | Ni)) !== Or;
    }
    function zm(e, t) {
      va(IS, Ku, e), Ku = Ut(Ku, t);
    }
    function JS(e) {
      Ku = IS.current, pa(IS, e);
    }
    function Zs(e, t) {
      e.finishedWork = null, e.finishedLanes = ne;
      var a = e.timeoutHandle;
      if (a !== qy && (e.timeoutHandle = qy, zR(a)), Zn !== null)
        for (var i = Zn.return; i !== null; ) {
          var o = i.alternate;
          db(o, i), i = i.return;
        }
      Oa = e;
      var s = ec(e.current, null);
      return Zn = s, kr = Ku = t, Dr = Ho, $p = null, km = ne, Ip = ne, Dm = ne, Yp = null, qa = null, t_(), tu.discardPendingWarnings(), s;
    }
    function Pb(e, t) {
      do {
        var a = Zn;
        try {
          if (Ih(), vC(), Bn(), BS.current = null, a === null || a.return === null) {
            Dr = Vp, $p = t, Zn = null;
            return;
          }
          if (we && a.mode & ft && bm(a, !0), le)
            if (po(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              Bv(a, i, kr);
            } else
              Oc(a, t, kr);
          N_(e, a.return, a, t, kr), Bb(a);
        } catch (o) {
          t = o, Zn === a && a !== null ? (a = a.return, Zn = a) : a = Zn;
          continue;
        }
        return;
      } while (!0);
    }
    function Fb() {
      var e = VS.current;
      return VS.current = ym, e === null ? ym : e;
    }
    function Hb(e) {
      VS.current = e;
    }
    function sO() {
      YS = Pn();
    }
    function Kp(e) {
      km = Ut(e, km);
    }
    function cO() {
      Dr === Ho && (Dr = Om);
    }
    function eE() {
      (Dr === Ho || Dr === Om || Dr === Ks) && (Dr = Bp), Oa !== null && (ws(km) || ws(Ip)) && Gl(Oa, kr);
    }
    function fO(e) {
      Dr !== Bp && (Dr = Ks), Yp === null ? Yp = [e] : Yp.push(e);
    }
    function dO() {
      return Dr === Ho;
    }
    function jm(e, t) {
      var a = Wt;
      Wt |= Zr;
      var i = Fb();
      if (Oa !== e || kr !== t) {
        if (br) {
          var o = e.memoizedUpdaters;
          o.size > 0 && (Xp(e, kr), o.clear()), Kc(e, t);
        }
        Vo = Vd(), Zs(e, t);
      }
      oi(t);
      do
        try {
          pO();
          break;
        } catch (s) {
          Pb(e, s);
        }
      while (!0);
      if (Ih(), Wt = a, Hb(i), Zn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return pl(), Oa = null, kr = ne, Dr;
    }
    function pO() {
      for (; Zn !== null; )
        Vb(Zn);
    }
    function vO(e, t) {
      var a = Wt;
      Wt |= Zr;
      var i = Fb();
      if (Oa !== e || kr !== t) {
        if (br) {
          var o = e.memoizedUpdaters;
          o.size > 0 && (Xp(e, kr), o.clear()), Kc(e, t);
        }
        Vo = Vd(), Wp(), Zs(e, t);
      }
      oi(t);
      do
        try {
          hO();
          break;
        } catch (s) {
          Pb(e, s);
        }
      while (!0);
      return Ih(), Hb(i), Wt = a, Zn !== null ? (gs(), Ho) : (pl(), Oa = null, kr = ne, Dr);
    }
    function hO() {
      for (; Zn !== null && !bc(); )
        Vb(Zn);
    }
    function Vb(e) {
      var t = e.alternate;
      cn(e);
      var a;
      (e.mode & ft) !== st ? (hS(e), a = tE(t, e, Ku), bm(e, !0)) : a = tE(t, e, Ku), Bn(), e.memoizedProps = e.pendingProps, a === null ? Bb(e) : Zn = a, BS.current = null;
    }
    function Bb(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & Ca) === nt) {
          cn(t);
          var o = void 0;
          if ((t.mode & ft) === st ? o = fb(a, t, Ku) : (hS(t), o = fb(a, t, Ku), bm(t, !1)), Bn(), o !== null) {
            Zn = o;
            return;
          }
        } else {
          var s = cx(a, t);
          if (s !== null) {
            s.flags &= Lv, Zn = s;
            return;
          }
          if ((t.mode & ft) !== st) {
            bm(t, !1);
            for (var f = t.actualDuration, h = t.child; h !== null; )
              f += h.actualDuration, h = h.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= Ca, i.subtreeFlags = nt, i.deletions = null;
          else {
            Dr = $S, Zn = null;
            return;
          }
        }
        var y = t.sibling;
        if (y !== null) {
          Zn = y;
          return;
        }
        t = i, Zn = t;
      } while (t !== null);
      Dr === Ho && (Dr = kb);
    }
    function Js(e, t, a) {
      var i = Ba(), o = Xr.transition;
      try {
        Xr.transition = null, or(Ar), mO(e, t, a, i);
      } finally {
        Xr.transition = o, or(i);
      }
      return null;
    }
    function mO(e, t, a, i) {
      do
        $o();
      while (Wl !== null);
      if (xO(), (Wt & (Zr | Ni)) !== Or)
        throw new Error("Should not already be working.");
      var o = e.finishedWork, s = e.finishedLanes;
      if (Rc(s), o === null)
        return Od(), null;
      if (s === ne && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = ne, o === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Yt;
      var f = Ut(o.lanes, o.childLanes);
      Fd(e, f), e === Oa && (Oa = null, Zn = null, kr = ne), ((o.subtreeFlags & Pa) !== nt || (o.flags & Pa) !== nt) && (Xs || (Xs = !0, GS = a, aE(bi, function() {
        return $o(), null;
      })));
      var h = (o.subtreeFlags & (cl | la | Lr | Pa)) !== nt, y = (o.flags & (cl | la | Lr | Pa)) !== nt;
      if (h || y) {
        var b = Xr.transition;
        Xr.transition = null;
        var T = Ba();
        or(Ar);
        var P = Wt;
        Wt |= Ni, BS.current = null, hx(e, o), FC(), kx(e, o, s), kR(e.containerInfo), e.current = o, $v(s), Dx(o, e, s), dl(), zv(), Wt = P, or(T), Xr.transition = b;
      } else
        e.current = o, FC();
      var z = Xs;
      if (Xs ? (Xs = !1, Wl = e, Qp = s) : (Hf = 0, Lm = null), f = e.pendingLanes, f === ne && (Ff = null), z || Wb(e.current, !1), Yi(o.stateNode, i), br && e.memoizedUpdaters.clear(), qx(), Ka(e, Pn()), t !== null)
        for (var W = e.onRecoverableError, G = 0; G < t.length; G++) {
          var J = t[G], Ve = J.stack, ot = J.digest;
          W(J.value, {
            componentStack: Ve,
            digest: ot
          });
        }
      if (Mm) {
        Mm = !1;
        var Je = WS;
        throw WS = null, Je;
      }
      return da(Qp, pt) && e.tag !== zl && $o(), f = e.pendingLanes, da(f, pt) ? (R_(), e === qS ? Gp++ : (Gp = 0, qS = e)) : Gp = 0, jl(), Od(), null;
    }
    function $o() {
      if (Wl !== null) {
        var e = xs(Qp), t = Sy(Gi, e), a = Xr.transition, i = Ba();
        try {
          return Xr.transition = null, or(t), gO();
        } finally {
          or(i), Xr.transition = a;
        }
      }
      return !1;
    }
    function yO(e) {
      QS.push(e), Xs || (Xs = !0, aE(bi, function() {
        return $o(), null;
      }));
    }
    function gO() {
      if (Wl === null)
        return !1;
      var e = GS;
      GS = null;
      var t = Wl, a = Qp;
      if (Wl = null, Qp = ne, (Wt & (Zr | Ni)) !== Or)
        throw new Error("Cannot flush passive effects while already rendering.");
      KS = !0, Nm = !1, Iv(a);
      var i = Wt;
      Wt |= Ni, jx(t.current), Lx(t, t.current, a, e);
      {
        var o = QS;
        QS = [];
        for (var s = 0; s < o.length; s++) {
          var f = o[s];
          Sx(t, f);
        }
      }
      ys(), Wb(t.current, !0), Wt = i, jl(), Nm ? t === Lm ? Hf++ : (Hf = 0, Lm = t) : Hf = 0, KS = !1, Nm = !1, Du(t);
      {
        var h = t.current.stateNode;
        h.effectDuration = 0, h.passiveEffectDuration = 0;
      }
      return !0;
    }
    function $b(e) {
      return Ff !== null && Ff.has(e);
    }
    function SO(e) {
      Ff === null ? Ff = /* @__PURE__ */ new Set([e]) : Ff.add(e);
    }
    function EO(e) {
      Mm || (Mm = !0, WS = e);
    }
    var CO = EO;
    function Ib(e, t, a) {
      var i = Gs(a, t), o = VC(e, i, pt), s = Fl(e, o, pt), f = ka();
      s !== null && (wo(s, pt, f), Ka(s, f));
    }
    function Mn(e, t, a) {
      if (dx(a), Zp(!1), e.tag === K) {
        Ib(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === K) {
          Ib(i, e, a);
          return;
        } else if (i.tag === $) {
          var o = i.type, s = i.stateNode;
          if (typeof o.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !$b(s)) {
            var f = Gs(a, e), h = CS(i, f, pt), y = Fl(i, h, pt), b = ka();
            y !== null && (wo(y, pt, b), Ka(y, b));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function bO(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var o = ka();
      Pd(e, a), MO(e), Oa === e && bo(kr, a) && (Dr === Bp || Dr === Om && Qc(kr) && Pn() - YS < Db ? Zs(e, ne) : Dm = Ut(Dm, a)), Ka(e, o);
    }
    function Yb(e, t) {
      t === Yt && (t = nO(e));
      var a = ka(), i = Qa(e, t);
      i !== null && (wo(i, t, a), Ka(i, a));
    }
    function wO(e) {
      var t = e.memoizedState, a = Yt;
      t !== null && (a = t.retryLane), Yb(e, a);
    }
    function TO(e, t) {
      var a = Yt, i;
      switch (e.tag) {
        case _e:
          i = e.stateNode;
          var o = e.memoizedState;
          o !== null && (a = o.retryLane);
          break;
        case yt:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), Yb(e, a);
    }
    function RO(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : Zx(e / 1960) * 1960;
    }
    function _O() {
      if (Gp > eO)
        throw Gp = 0, qS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Hf > tO && (Hf = 0, Lm = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function xO() {
      tu.flushLegacyContextWarning(), tu.flushPendingUnsafeLifecycleWarnings();
    }
    function Wb(e, t) {
      cn(e), Pm(e, oa, Wx), t && Pm(e, fo, Qx), Pm(e, oa, Ix), t && Pm(e, fo, Yx), Bn();
    }
    function Pm(e, t, a) {
      for (var i = e, o = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== o && i.child !== null && s !== nt ? i = i.child : ((i.flags & t) !== nt && a(i), i.sibling !== null ? i = i.sibling : i = o = i.return);
      }
    }
    var Fm = null;
    function Qb(e) {
      {
        if ((Wt & Zr) !== Or || !(e.mode & Ft))
          return;
        var t = e.tag;
        if (t !== oe && t !== K && t !== $ && t !== Y && t !== Ue && t !== Ke && t !== Fe)
          return;
        var a = Tt(e) || "ReactComponent";
        if (Fm !== null) {
          if (Fm.has(a))
            return;
          Fm.add(a);
        } else
          Fm = /* @__PURE__ */ new Set([a]);
        var i = jn;
        try {
          cn(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? cn(e) : Bn();
        }
      }
    }
    var tE;
    {
      var OO = null;
      tE = function(e, t, a) {
        var i = tw(OO, t);
        try {
          return ub(e, t, a);
        } catch (s) {
          if (V1() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (Ih(), vC(), db(e, t), tw(t, i), t.mode & ft && hS(t), co(null, ub, null, e, t, a), dy()) {
            var o = yd();
            typeof o == "object" && o !== null && o._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var Gb = !1, nE;
    nE = /* @__PURE__ */ new Set();
    function kO(e) {
      if (na && !b_())
        switch (e.tag) {
          case Y:
          case Ue:
          case Fe: {
            var t = Zn && Tt(Zn) || "Unknown", a = t;
            if (!nE.has(a)) {
              nE.add(a);
              var i = Tt(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case $: {
            Gb || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), Gb = !0);
            break;
          }
        }
    }
    function Xp(e, t) {
      if (br) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          Hd(e, i, t);
        });
      }
    }
    var rE = {};
    function aE(e, t) {
      {
        var a = su.current;
        return a !== null ? (a.push(t), rE) : Cc(e, t);
      }
    }
    function qb(e) {
      if (e !== rE)
        return Uv(e);
    }
    function Kb() {
      return su.current !== null;
    }
    function DO(e) {
      {
        if (e.mode & Ft) {
          if (!xb())
            return;
        } else if (!Xx() || Wt !== Or || e.tag !== Y && e.tag !== Ue && e.tag !== Fe)
          return;
        if (su.current === null) {
          var t = jn;
          try {
            cn(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Tt(e));
          } finally {
            t ? cn(e) : Bn();
          }
        }
      }
    }
    function MO(e) {
      e.tag !== zl && xb() && su.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Zp(e) {
      Lb = e;
    }
    var Li = null, Vf = null, NO = function(e) {
      Li = e;
    };
    function Bf(e) {
      {
        if (Li === null)
          return e;
        var t = Li(e);
        return t === void 0 ? e : t.current;
      }
    }
    function iE(e) {
      return Bf(e);
    }
    function uE(e) {
      {
        if (Li === null)
          return e;
        var t = Li(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = Bf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: He,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function Xb(e, t) {
      {
        if (Li === null)
          return !1;
        var a = e.elementType, i = t.type, o = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case $: {
            typeof i == "function" && (o = !0);
            break;
          }
          case Y: {
            (typeof i == "function" || s === ut) && (o = !0);
            break;
          }
          case Ue: {
            (s === He || s === ut) && (o = !0);
            break;
          }
          case Ke:
          case Fe: {
            (s === Lt || s === ut) && (o = !0);
            break;
          }
          default:
            return !1;
        }
        if (o) {
          var f = Li(a);
          if (f !== void 0 && f === Li(i))
            return !0;
        }
        return !1;
      }
    }
    function Zb(e) {
      {
        if (Li === null || typeof WeakSet != "function")
          return;
        Vf === null && (Vf = /* @__PURE__ */ new WeakSet()), Vf.add(e);
      }
    }
    var LO = function(e, t) {
      {
        if (Li === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        $o(), Bo(function() {
          oE(e.current, i, a);
        });
      }
    }, AO = function(e, t) {
      {
        if (e.context !== si)
          return;
        $o(), Bo(function() {
          Jp(t, e, null, null);
        });
      }
    };
    function oE(e, t, a) {
      {
        var i = e.alternate, o = e.child, s = e.sibling, f = e.tag, h = e.type, y = null;
        switch (f) {
          case Y:
          case Fe:
          case $:
            y = h;
            break;
          case Ue:
            y = h.render;
            break;
        }
        if (Li === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var b = !1, T = !1;
        if (y !== null) {
          var P = Li(y);
          P !== void 0 && (a.has(P) ? T = !0 : t.has(P) && (f === $ ? T = !0 : b = !0));
        }
        if (Vf !== null && (Vf.has(e) || i !== null && Vf.has(i)) && (T = !0), T && (e._debugNeedsRemount = !0), T || b) {
          var z = Qa(e, pt);
          z !== null && Mr(z, e, pt, bn);
        }
        o !== null && !T && oE(o, t, a), s !== null && oE(s, t, a);
      }
    }
    var UO = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(o) {
          return o.current;
        }));
        return lE(e.current, i, a), a;
      }
    };
    function lE(e, t, a) {
      {
        var i = e.child, o = e.sibling, s = e.tag, f = e.type, h = null;
        switch (s) {
          case Y:
          case Fe:
          case $:
            h = f;
            break;
          case Ue:
            h = f.render;
            break;
        }
        var y = !1;
        h !== null && t.has(h) && (y = !0), y ? zO(e, a) : i !== null && lE(i, t, a), o !== null && lE(o, t, a);
      }
    }
    function zO(e, t) {
      {
        var a = jO(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case ue:
              t.add(i.stateNode);
              return;
            case re:
              t.add(i.stateNode.containerInfo);
              return;
            case K:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function jO(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === ue)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var sE;
    {
      sE = !1;
      try {
        var Jb = Object.preventExtensions({});
      } catch {
        sE = !0;
      }
    }
    function PO(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = nt, this.subtreeFlags = nt, this.deletions = null, this.lanes = ne, this.childLanes = ne, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !sE && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var ci = function(e, t, a, i) {
      return new PO(e, t, a, i);
    };
    function cE(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function FO(e) {
      return typeof e == "function" && !cE(e) && e.defaultProps === void 0;
    }
    function HO(e) {
      if (typeof e == "function")
        return cE(e) ? $ : Y;
      if (e != null) {
        var t = e.$$typeof;
        if (t === He)
          return Ue;
        if (t === Lt)
          return Ke;
      }
      return oe;
    }
    function ec(e, t) {
      var a = e.alternate;
      a === null ? (a = ci(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = nt, a.subtreeFlags = nt, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Cr, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case oe:
        case Y:
        case Fe:
          a.type = Bf(e.type);
          break;
        case $:
          a.type = iE(e.type);
          break;
        case Ue:
          a.type = uE(e.type);
          break;
      }
      return a;
    }
    function VO(e, t) {
      e.flags &= Cr | xn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = ne, e.lanes = t, e.child = null, e.subtreeFlags = nt, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = nt, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function BO(e, t, a) {
      var i;
      return e === zh ? (i = Ft, t === !0 && (i |= Fn, i |= Ha)) : i = st, br && (i |= ft), ci(K, null, null, i);
    }
    function fE(e, t, a, i, o, s) {
      var f = oe, h = e;
      if (typeof e == "function")
        cE(e) ? (f = $, h = iE(h)) : h = Bf(h);
      else if (typeof e == "string")
        f = ue;
      else
        e:
          switch (e) {
            case Ea:
              return ql(a.children, o, s, t);
            case hi:
              f = me, o |= Fn, (o & Ft) !== st && (o |= Ha);
              break;
            case D:
              return $O(a, o, s, t);
            case Dt:
              return IO(a, o, s, t);
            case It:
              return YO(a, o, s, t);
            case Rn:
              return ew(a, o, s, t);
            case Er:
            case Jn:
            case mi:
            case Yo:
            case Tn:
            default: {
              if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                  case ce:
                    f = Ae;
                    break e;
                  case Oe:
                    f = tt;
                    break e;
                  case He:
                    f = Ue, h = uE(h);
                    break e;
                  case Lt:
                    f = Ke;
                    break e;
                  case ut:
                    f = kt, h = null;
                    break e;
                }
              var y = "";
              {
                (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (y += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var b = i ? Tt(i) : null;
                b && (y += `

Check the render method of \`` + b + "`.");
              }
              throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + y));
            }
          }
      var T = ci(f, a, t, o);
      return T.elementType = e, T.type = h, T.lanes = s, T._debugOwner = i, T;
    }
    function dE(e, t, a) {
      var i = null;
      i = e._owner;
      var o = e.type, s = e.key, f = e.props, h = fE(o, s, f, i, t, a);
      return h._debugSource = e._source, h._debugOwner = e._owner, h;
    }
    function ql(e, t, a, i) {
      var o = ci(Te, e, i, t);
      return o.lanes = a, o;
    }
    function $O(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var o = ci(Ze, e, i, t | ft);
      return o.elementType = D, o.lanes = a, o.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, o;
    }
    function IO(e, t, a, i) {
      var o = ci(_e, e, i, t);
      return o.elementType = Dt, o.lanes = a, o;
    }
    function YO(e, t, a, i) {
      var o = ci(yt, e, i, t);
      return o.elementType = It, o.lanes = a, o;
    }
    function ew(e, t, a, i) {
      var o = ci(Ie, e, i, t);
      o.elementType = Rn, o.lanes = a;
      var s = {
        isHidden: !1
      };
      return o.stateNode = s, o;
    }
    function pE(e, t, a) {
      var i = ci(be, e, null, t);
      return i.lanes = a, i;
    }
    function WO() {
      var e = ci(ue, null, null, st);
      return e.elementType = "DELETED", e;
    }
    function QO(e) {
      var t = ci(mt, null, null, st);
      return t.stateNode = e, t;
    }
    function vE(e, t, a) {
      var i = e.children !== null ? e.children : [], o = ci(re, i, e.key, t);
      return o.lanes = a, o.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, o;
    }
    function tw(e, t) {
      return e === null && (e = ci(oe, null, null, st)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function GO(e, t, a, i, o) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = qy, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Yt, this.eventTimes = qc(ne), this.expirationTimes = qc(bn), this.pendingLanes = ne, this.suspendedLanes = ne, this.pingedLanes = ne, this.expiredLanes = ne, this.mutableReadLanes = ne, this.finishedLanes = ne, this.entangledLanes = ne, this.entanglements = qc(ne), this.identifierPrefix = i, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < kn; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case zh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case zl:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function nw(e, t, a, i, o, s, f, h, y, b) {
      var T = new GO(e, t, a, h, y), P = BO(t, s);
      T.current = P, P.stateNode = T;
      {
        var z = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        P.memoizedState = z;
      }
      return bg(P), T;
    }
    var hE = "18.2.0";
    function qO(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return zn(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: Hr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var mE, yE;
    mE = !1, yE = {};
    function rw(e) {
      if (!e)
        return si;
      var t = Ua(e), a = N1(t);
      if (t.tag === $) {
        var i = t.type;
        if ($u(i))
          return k0(t, i, a);
      }
      return a;
    }
    function KO(e, t) {
      {
        var a = Ua(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var o = Fa(a);
        if (o === null)
          return null;
        if (o.mode & Fn) {
          var s = Tt(a) || "Component";
          if (!yE[s]) {
            yE[s] = !0;
            var f = jn;
            try {
              cn(o), a.mode & Fn ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? cn(f) : Bn();
            }
          }
        }
        return o.stateNode;
      }
    }
    function aw(e, t, a, i, o, s, f, h) {
      var y = !1, b = null;
      return nw(e, t, y, b, a, i, o, s, f);
    }
    function iw(e, t, a, i, o, s, f, h, y, b) {
      var T = !0, P = nw(a, i, T, e, o, s, f, h, y);
      P.context = rw(null);
      var z = P.current, W = ka(), G = Ql(z), J = Po(W, G);
      return J.callback = t ?? null, Fl(z, J, G), rO(P, G, W), P;
    }
    function Jp(e, t, a, i) {
      jv(t, e);
      var o = t.current, s = ka(), f = Ql(o);
      vo(f);
      var h = rw(a);
      t.context === null ? t.context = h : t.pendingContext = h, na && jn !== null && !mE && (mE = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Tt(jn) || "Unknown"));
      var y = Po(s, f);
      y.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), y.callback = i);
      var b = Fl(o, y, f);
      return b !== null && (Mr(b, o, f, s), qh(b, o, f)), f;
    }
    function Hm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ue:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function XO(e) {
      switch (e.tag) {
        case K: {
          var t = e.stateNode;
          if (lr(t)) {
            var a = hy(t);
            oO(t, a);
          }
          break;
        }
        case _e: {
          Bo(function() {
            var o = Qa(e, pt);
            if (o !== null) {
              var s = ka();
              Mr(o, e, pt, s);
            }
          });
          var i = pt;
          gE(e, i);
          break;
        }
      }
    }
    function uw(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = qv(a.retryLane, t));
    }
    function gE(e, t) {
      uw(e, t);
      var a = e.alternate;
      a && uw(a, t);
    }
    function ZO(e) {
      if (e.tag === _e) {
        var t = vl, a = Qa(e, t);
        if (a !== null) {
          var i = ka();
          Mr(a, e, t, i);
        }
        gE(e, t);
      }
    }
    function JO(e) {
      if (e.tag === _e) {
        var t = Ql(e), a = Qa(e, t);
        if (a !== null) {
          var i = ka();
          Mr(a, e, t, i);
        }
        gE(e, t);
      }
    }
    function ow(e) {
      var t = Av(e);
      return t === null ? null : t.stateNode;
    }
    var lw = function(e) {
      return null;
    };
    function ek(e) {
      return lw(e);
    }
    var sw = function(e) {
      return !1;
    };
    function tk(e) {
      return sw(e);
    }
    var cw = null, fw = null, dw = null, pw = null, vw = null, hw = null, mw = null, yw = null, gw = null;
    {
      var Sw = function(e, t, a) {
        var i = t[a], o = $t(e) ? e.slice() : jt({}, e);
        return a + 1 === t.length ? ($t(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = Sw(e[i], t, a + 1), o);
      }, Ew = function(e, t) {
        return Sw(e, t, 0);
      }, Cw = function(e, t, a, i) {
        var o = t[i], s = $t(e) ? e.slice() : jt({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[o], $t(s) ? s.splice(o, 1) : delete s[o];
        } else
          s[o] = Cw(
            // $FlowFixMe number or string is fine here
            e[o],
            t,
            a,
            i + 1
          );
        return s;
      }, bw = function(e, t, a) {
        if (t.length !== a.length) {
          N("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              N("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return Cw(e, t, a, 0);
      }, ww = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var o = t[a], s = $t(e) ? e.slice() : jt({}, e);
        return s[o] = ww(e[o], t, a + 1, i), s;
      }, Tw = function(e, t, a) {
        return ww(e, t, 0, a);
      }, SE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      cw = function(e, t, a, i) {
        var o = SE(e, t);
        if (o !== null) {
          var s = Tw(o.memoizedState, a, i);
          o.memoizedState = s, o.baseState = s, e.memoizedProps = jt({}, e.memoizedProps);
          var f = Qa(e, pt);
          f !== null && Mr(f, e, pt, bn);
        }
      }, fw = function(e, t, a) {
        var i = SE(e, t);
        if (i !== null) {
          var o = Ew(i.memoizedState, a);
          i.memoizedState = o, i.baseState = o, e.memoizedProps = jt({}, e.memoizedProps);
          var s = Qa(e, pt);
          s !== null && Mr(s, e, pt, bn);
        }
      }, dw = function(e, t, a, i) {
        var o = SE(e, t);
        if (o !== null) {
          var s = bw(o.memoizedState, a, i);
          o.memoizedState = s, o.baseState = s, e.memoizedProps = jt({}, e.memoizedProps);
          var f = Qa(e, pt);
          f !== null && Mr(f, e, pt, bn);
        }
      }, pw = function(e, t, a) {
        e.pendingProps = Tw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Qa(e, pt);
        i !== null && Mr(i, e, pt, bn);
      }, vw = function(e, t) {
        e.pendingProps = Ew(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Qa(e, pt);
        a !== null && Mr(a, e, pt, bn);
      }, hw = function(e, t, a) {
        e.pendingProps = bw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Qa(e, pt);
        i !== null && Mr(i, e, pt, bn);
      }, mw = function(e) {
        var t = Qa(e, pt);
        t !== null && Mr(t, e, pt, bn);
      }, yw = function(e) {
        lw = e;
      }, gw = function(e) {
        sw = e;
      };
    }
    function nk(e) {
      var t = Fa(e);
      return t === null ? null : t.stateNode;
    }
    function rk(e) {
      return null;
    }
    function ak() {
      return jn;
    }
    function ik(e) {
      var t = e.findFiberByHostInstance, a = p.ReactCurrentDispatcher;
      return _d({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: cw,
        overrideHookStateDeletePath: fw,
        overrideHookStateRenamePath: dw,
        overrideProps: pw,
        overridePropsDeletePath: vw,
        overridePropsRenamePath: hw,
        setErrorHandler: yw,
        setSuspenseHandler: gw,
        scheduleUpdate: mw,
        currentDispatcherRef: a,
        findHostInstanceByFiber: nk,
        findFiberByHostInstance: t || rk,
        // React Refresh
        findHostInstancesForRefresh: UO,
        scheduleRefresh: LO,
        scheduleRoot: AO,
        setRefreshHandler: NO,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: ak,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: hE
      });
    }
    var Rw = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function EE(e) {
      this._internalRoot = e;
    }
    Vm.prototype.render = EE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Bm(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== er) {
          var i = ow(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Jp(e, t, null, null);
    }, Vm.prototype.unmount = EE.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        jb() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Bo(function() {
          Jp(null, e, null, null);
        }), T0(t);
      }
    };
    function uk(e, t) {
      if (!Bm(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      _w(e);
      var a = !1, i = !1, o = "", s = Rw;
      t != null && (t.hydrate ? N("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === vi && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = aw(e, zh, null, a, i, o, s);
      kh(f.current, e);
      var h = e.nodeType === er ? e.parentNode : e;
      return op(h), new EE(f);
    }
    function Vm(e) {
      this._internalRoot = e;
    }
    function ok(e) {
      e && rh(e);
    }
    Vm.prototype.unstable_scheduleHydration = ok;
    function lk(e, t, a) {
      if (!Bm(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      _w(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, o = a != null && a.hydratedSources || null, s = !1, f = !1, h = "", y = Rw;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (h = a.identifierPrefix), a.onRecoverableError !== void 0 && (y = a.onRecoverableError));
      var b = iw(t, null, e, zh, i, s, f, h, y);
      if (kh(b.current, e), op(e), o)
        for (var T = 0; T < o.length; T++) {
          var P = o[T];
          m_(b, P);
        }
      return new Vm(b);
    }
    function Bm(e) {
      return !!(e && (e.nodeType === aa || e.nodeType === ai || e.nodeType === ao || !O));
    }
    function ev(e) {
      return !!(e && (e.nodeType === aa || e.nodeType === ai || e.nodeType === ao || e.nodeType === er && e.nodeValue === " react-mount-point-unstable "));
    }
    function _w(e) {
      e.nodeType === aa && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), gp(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var sk = p.ReactCurrentOwner, xw;
    xw = function(e) {
      if (e._reactRootContainer && e.nodeType !== er) {
        var t = ow(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = CE(e), o = !!(i && Al(i));
      o && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === aa && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function CE(e) {
      return e ? e.nodeType === ai ? e.documentElement : e.firstChild : null;
    }
    function Ow() {
    }
    function ck(e, t, a, i, o) {
      if (o) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var z = Hm(f);
            s.call(z);
          };
        }
        var f = iw(
          t,
          i,
          e,
          zl,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          Ow
        );
        e._reactRootContainer = f, kh(f.current, e);
        var h = e.nodeType === er ? e.parentNode : e;
        return op(h), Bo(), f;
      } else {
        for (var y; y = e.lastChild; )
          e.removeChild(y);
        if (typeof i == "function") {
          var b = i;
          i = function() {
            var z = Hm(T);
            b.call(z);
          };
        }
        var T = aw(
          e,
          zl,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          Ow
        );
        e._reactRootContainer = T, kh(T.current, e);
        var P = e.nodeType === er ? e.parentNode : e;
        return op(P), Bo(function() {
          Jp(t, T, a, i);
        }), T;
      }
    }
    function fk(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function $m(e, t, a, i, o) {
      xw(a), fk(o === void 0 ? null : o, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = ck(a, t, e, o, i);
      else {
        if (f = s, typeof o == "function") {
          var h = o;
          o = function() {
            var y = Hm(f);
            h.call(y);
          };
        }
        Jp(t, f, e, o);
      }
      return Hm(f);
    }
    function dk(e) {
      {
        var t = sk.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Zt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === aa ? e : KO(e, "findDOMNode");
    }
    function pk(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !ev(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = gp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return $m(null, e, t, !0, a);
    }
    function vk(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !ev(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = gp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return $m(null, e, t, !1, a);
    }
    function hk(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !ev(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !vs(e))
        throw new Error("parentComponent must be a valid React Component");
      return $m(e, t, a, !1, i);
    }
    function mk(e) {
      if (!ev(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = gp(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = CE(e), i = a && !Al(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Bo(function() {
          $m(null, null, e, !1, function() {
            e._reactRootContainer = null, T0(e);
          });
        }), !0;
      } else {
        {
          var o = CE(e), s = !!(o && Al(o)), f = e.nodeType === aa && ev(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Ye(XO), Xv(ZO), ks(JO), $d(Ba), Jv(_s), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), Mv(SR), mc(ZS, lO, Bo);
    function yk(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Bm(t))
        throw new Error("Target container is not a DOM element.");
      return qO(e, t, null, a);
    }
    function gk(e, t, a, i) {
      return hk(e, t, a, i);
    }
    var bE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Al, Sf, Dh, hc, fs, ZS]
    };
    function Sk(e, t) {
      return bE.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), uk(e, t);
    }
    function Ek(e, t, a) {
      return bE.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), lk(e, t, a);
    }
    function Ck(e) {
      return jb() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Bo(e);
    }
    var bk = ik({
      findFiberByHostInstance: Fs,
      bundleType: 1,
      version: hE,
      rendererPackageName: "react-dom"
    });
    if (!bk && _t && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var kw = window.location.protocol;
      /^(https?|file):$/.test(kw) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (kw === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Xa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bE, Xa.createPortal = yk, Xa.createRoot = Sk, Xa.findDOMNode = dk, Xa.flushSync = Ck, Xa.hydrate = pk, Xa.hydrateRoot = Ek, Xa.render = vk, Xa.unmountComponentAtNode = mk, Xa.unstable_batchedUpdates = ZS, Xa.unstable_renderSubtreeIntoContainer = gk, Xa.version = hE, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Xa;
}
var Za = {};
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xw;
function TD() {
  if (Xw)
    return Za;
  Xw = 1;
  var v = Ju, m = ET();
  function p(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, u = 1; u < arguments.length; u++)
      r += "&args[]=" + encodeURIComponent(arguments[u]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var C = /* @__PURE__ */ new Set(), w = {};
  function N(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (w[n] = r, n = 0; n < r.length; n++)
      C.add(r[n]);
  }
  var te = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Y = Object.prototype.hasOwnProperty, $ = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, oe = {}, K = {};
  function re(n) {
    return Y.call(K, n) ? !0 : Y.call(oe, n) ? !1 : $.test(n) ? K[n] = !0 : (oe[n] = !0, !1);
  }
  function ue(n, r, u, l) {
    if (u !== null && u.type === 0)
      return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return l ? !1 : u !== null ? !u.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function be(n, r, u, l) {
    if (r === null || typeof r > "u" || ue(n, r, u, l))
      return !0;
    if (l)
      return !1;
    if (u !== null)
      switch (u.type) {
        case 3:
          return !r;
        case 4:
          return r === !1;
        case 5:
          return isNaN(r);
        case 6:
          return isNaN(r) || 1 > r;
      }
    return !1;
  }
  function Te(n, r, u, l, c, d, E) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = l, this.attributeNamespace = c, this.mustUseProperty = u, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = E;
  }
  var me = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    me[n] = new Te(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    me[r] = new Te(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    me[n] = new Te(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    me[n] = new Te(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    me[n] = new Te(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    me[n] = new Te(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    me[n] = new Te(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    me[n] = new Te(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    me[n] = new Te(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var tt = /[\-:]([a-z])/g;
  function Ae(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      tt,
      Ae
    );
    me[r] = new Te(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(tt, Ae);
    me[r] = new Te(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(tt, Ae);
    me[r] = new Te(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    me[n] = new Te(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), me.xlinkHref = new Te("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    me[n] = new Te(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Ue(n, r, u, l) {
    var c = me.hasOwnProperty(r) ? me[r] : null;
    (c !== null ? c.type !== 0 : l || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (be(r, u, c, l) && (u = null), l || c === null ? re(r) && (u === null ? n.removeAttribute(r) : n.setAttribute(r, "" + u)) : c.mustUseProperty ? n[c.propertyName] = u === null ? c.type === 3 ? !1 : "" : u : (r = c.attributeName, l = c.attributeNamespace, u === null ? n.removeAttribute(r) : (c = c.type, u = c === 3 || c === 4 && u === !0 ? "" : "" + u, l ? n.setAttributeNS(l, r, u) : n.setAttribute(r, u))));
  }
  var Ze = v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _e = Symbol.for("react.element"), Ke = Symbol.for("react.portal"), Fe = Symbol.for("react.fragment"), kt = Symbol.for("react.strict_mode"), qt = Symbol.for("react.profiler"), mt = Symbol.for("react.provider"), yt = Symbol.for("react.context"), Mt = Symbol.for("react.forward_ref"), Ie = Symbol.for("react.suspense"), rt = Symbol.for("react.suspense_list"), at = Symbol.for("react.memo"), Ct = Symbol.for("react.lazy"), Ne = Symbol.for("react.offscreen"), pe = Symbol.iterator;
  function $e(n) {
    return n === null || typeof n != "object" ? null : (n = pe && n[pe] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var M = Object.assign, R;
  function O(n) {
    if (R === void 0)
      try {
        throw Error();
      } catch (u) {
        var r = u.stack.trim().match(/\n( *(at )?)/);
        R = r && r[1] || "";
      }
    return `
` + R + n;
  }
  var U = !1;
  function Z(n, r) {
    if (!n || U)
      return "";
    U = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r)
        if (r = function() {
          throw Error();
        }, Object.defineProperty(r.prototype, "props", { set: function() {
          throw Error();
        } }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(r, []);
          } catch (q) {
            var l = q;
          }
          Reflect.construct(n, [], r);
        } else {
          try {
            r.call();
          } catch (q) {
            l = q;
          }
          n.call(r.prototype);
        }
      else {
        try {
          throw Error();
        } catch (q) {
          l = q;
        }
        n();
      }
    } catch (q) {
      if (q && l && typeof q.stack == "string") {
        for (var c = q.stack.split(`
`), d = l.stack.split(`
`), E = c.length - 1, x = d.length - 1; 1 <= E && 0 <= x && c[E] !== d[x]; )
          x--;
        for (; 1 <= E && 0 <= x; E--, x--)
          if (c[E] !== d[x]) {
            if (E !== 1 || x !== 1)
              do
                if (E--, x--, 0 > x || c[E] !== d[x]) {
                  var L = `
` + c[E].replace(" at new ", " at ");
                  return n.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", n.displayName)), L;
                }
              while (1 <= E && 0 <= x);
            break;
          }
      }
    } finally {
      U = !1, Error.prepareStackTrace = u;
    }
    return (n = n ? n.displayName || n.name : "") ? O(n) : "";
  }
  function le(n) {
    switch (n.tag) {
      case 5:
        return O(n.type);
      case 16:
        return O("Lazy");
      case 13:
        return O("Suspense");
      case 19:
        return O("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Z(n.type, !1), n;
      case 11:
        return n = Z(n.type.render, !1), n;
      case 1:
        return n = Z(n.type, !0), n;
      default:
        return "";
    }
  }
  function we(n) {
    if (n == null)
      return null;
    if (typeof n == "function")
      return n.displayName || n.name || null;
    if (typeof n == "string")
      return n;
    switch (n) {
      case Fe:
        return "Fragment";
      case Ke:
        return "Portal";
      case qt:
        return "Profiler";
      case kt:
        return "StrictMode";
      case Ie:
        return "Suspense";
      case rt:
        return "SuspenseList";
    }
    if (typeof n == "object")
      switch (n.$$typeof) {
        case yt:
          return (n.displayName || "Context") + ".Consumer";
        case mt:
          return (n._context.displayName || "Context") + ".Provider";
        case Mt:
          var r = n.render;
          return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
        case at:
          return r = n.displayName || null, r !== null ? r : we(n.type) || "Memo";
        case Ct:
          r = n._payload, n = n._init;
          try {
            return we(n(r));
          } catch {
          }
      }
    return null;
  }
  function xe(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return we(r);
      case 8:
        return r === kt ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function")
          return r.displayName || r.name || null;
        if (typeof r == "string")
          return r;
    }
    return null;
  }
  function Re(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function vt(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function zt(n) {
    var r = vt(n) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), l = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var c = u.get, d = u.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(E) {
        l = "" + E, d.call(this, E);
      } }), Object.defineProperty(n, r, { enumerable: u.enumerable }), { getValue: function() {
        return l;
      }, setValue: function(E) {
        l = "" + E;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Kt(n) {
    n._valueTracker || (n._valueTracker = zt(n));
  }
  function dt(n) {
    if (!n)
      return !1;
    var r = n._valueTracker;
    if (!r)
      return !0;
    var u = r.getValue(), l = "";
    return n && (l = vt(n) ? n.checked ? "true" : "false" : n.value), n = l, n !== u ? (r.setValue(n), !0) : !1;
  }
  function _t(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u")
      return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function bt(n, r) {
    var u = r.checked;
    return M({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: u ?? n._wrapperState.initialChecked });
  }
  function un(n, r) {
    var u = r.defaultValue == null ? "" : r.defaultValue, l = r.checked != null ? r.checked : r.defaultChecked;
    u = Re(r.value != null ? r.value : u), n._wrapperState = { initialChecked: l, initialValue: u, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function tn(n, r) {
    r = r.checked, r != null && Ue(n, "checked", r, !1);
  }
  function wt(n, r) {
    tn(n, r);
    var u = Re(r.value), l = r.type;
    if (u != null)
      l === "number" ? (u === 0 && n.value === "" || n.value != u) && (n.value = "" + u) : n.value !== "" + u && (n.value = "" + u);
    else if (l === "submit" || l === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? zn(n, r.type, u) : r.hasOwnProperty("defaultValue") && zn(n, r.type, Re(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function Nn(n, r, u) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var l = r.type;
      if (!(l !== "submit" && l !== "reset" || r.value !== void 0 && r.value !== null))
        return;
      r = "" + n._wrapperState.initialValue, u || r === n.value || (n.value = r), n.defaultValue = r;
    }
    u = n.name, u !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, u !== "" && (n.name = u);
  }
  function zn(n, r, u) {
    (r !== "number" || _t(n.ownerDocument) !== n) && (u == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + u && (n.defaultValue = "" + u));
  }
  var vn = Array.isArray;
  function Ln(n, r, u, l) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < u.length; c++)
        r["$" + u[c]] = !0;
      for (u = 0; u < n.length; u++)
        c = r.hasOwnProperty("$" + n[u].value), n[u].selected !== c && (n[u].selected = c), c && l && (n[u].defaultSelected = !0);
    } else {
      for (u = "" + Re(u), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === u) {
          n[c].selected = !0, l && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function gn(n, r) {
    if (r.dangerouslySetInnerHTML != null)
      throw Error(p(91));
    return M({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function Wn(n, r) {
    var u = r.value;
    if (u == null) {
      if (u = r.children, r = r.defaultValue, u != null) {
        if (r != null)
          throw Error(p(92));
        if (vn(u)) {
          if (1 < u.length)
            throw Error(p(93));
          u = u[0];
        }
        r = u;
      }
      r == null && (r = ""), u = r;
    }
    n._wrapperState = { initialValue: Re(u) };
  }
  function Sr(n, r) {
    var u = Re(r.value), l = Re(r.defaultValue);
    u != null && (u = "" + u, u !== n.value && (n.value = u), r.defaultValue == null && n.defaultValue !== u && (n.defaultValue = u)), l != null && (n.defaultValue = "" + l);
  }
  function Qn(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function wn(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function on(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? wn(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Gn, Nr = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, u, l, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, u, l, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n)
      n.innerHTML = r;
    else {
      for (Gn = Gn || document.createElement("div"), Gn.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Gn.firstChild; n.firstChild; )
        n.removeChild(n.firstChild);
      for (; r.firstChild; )
        n.appendChild(r.firstChild);
    }
  });
  function qn(n, r) {
    if (r) {
      var u = n.firstChild;
      if (u && u === n.lastChild && u.nodeType === 3) {
        u.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var _ = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, A = ["Webkit", "ms", "Moz", "O"];
  Object.keys(_).forEach(function(n) {
    A.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), _[r] = _[n];
    });
  });
  function B(n, r, u) {
    return r == null || typeof r == "boolean" || r === "" ? "" : u || typeof r != "number" || r === 0 || _.hasOwnProperty(n) && _[n] ? ("" + r).trim() : r + "px";
  }
  function ae(n, r) {
    n = n.style;
    for (var u in r)
      if (r.hasOwnProperty(u)) {
        var l = u.indexOf("--") === 0, c = B(u, r[u], l);
        u === "float" && (u = "cssFloat"), l ? n.setProperty(u, c) : n[u] = c;
      }
  }
  var Ce = M({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function xt(n, r) {
    if (r) {
      if (Ce[n] && (r.children != null || r.dangerouslySetInnerHTML != null))
        throw Error(p(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null)
          throw Error(p(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML))
          throw Error(p(61));
      }
      if (r.style != null && typeof r.style != "object")
        throw Error(p(62));
    }
  }
  function Nt(n, r) {
    if (n.indexOf("-") === -1)
      return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var it = null;
  function se(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var Me = null, ye = null, ge = null;
  function gt(n) {
    if (n = vs(n)) {
      if (typeof Me != "function")
        throw Error(p(280));
      var r = n.stateNode;
      r && (r = nt(r), Me(n.stateNode, n.type, r));
    }
  }
  function Ht(n) {
    ye ? ge ? ge.push(n) : ge = [n] : ye = n;
  }
  function sn() {
    if (ye) {
      var n = ye, r = ge;
      if (ge = ye = null, gt(n), r)
        for (n = 0; n < r.length; n++)
          gt(r[n]);
    }
  }
  function ar(n, r) {
    return n(r);
  }
  function Ai() {
  }
  var Ja = !1;
  function di(n, r, u) {
    if (Ja)
      return n(r, u);
    Ja = !0;
    try {
      return ar(n, r, u);
    } finally {
      Ja = !1, (ye !== null || ge !== null) && (Ai(), sn());
    }
  }
  function ga(n, r) {
    var u = n.stateNode;
    if (u === null)
      return null;
    var l = nt(u);
    if (l === null)
      return null;
    u = l[r];
    e:
      switch (r) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (l = !l.disabled) || (n = n.type, l = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !l;
          break e;
        default:
          n = !1;
      }
    if (n)
      return null;
    if (u && typeof u != "function")
      throw Error(p(231, r, typeof u));
    return u;
  }
  var pi = !1;
  if (te)
    try {
      var Sa = {};
      Object.defineProperty(Sa, "passive", { get: function() {
        pi = !0;
      } }), window.addEventListener("test", Sa, Sa), window.removeEventListener("test", Sa, Sa);
    } catch {
      pi = !1;
    }
  function vi(n, r, u, l, c, d, E, x, L) {
    var q = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(u, q);
    } catch (de) {
      this.onError(de);
    }
  }
  var Hr = !1, Ea = null, hi = !1, D = null, ce = { onError: function(n) {
    Hr = !0, Ea = n;
  } };
  function Oe(n, r, u, l, c, d, E, x, L) {
    Hr = !1, Ea = null, vi.apply(ce, arguments);
  }
  function He(n, r, u, l, c, d, E, x, L) {
    if (Oe.apply(this, arguments), Hr) {
      if (Hr) {
        var q = Ea;
        Hr = !1, Ea = null;
      } else
        throw Error(p(198));
      hi || (hi = !0, D = q);
    }
  }
  function Dt(n) {
    var r = n, u = n;
    if (n.alternate)
      for (; r.return; )
        r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (u = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? u : null;
  }
  function It(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null)
        return r.dehydrated;
    }
    return null;
  }
  function Lt(n) {
    if (Dt(n) !== n)
      throw Error(p(188));
  }
  function ut(n) {
    var r = n.alternate;
    if (!r) {
      if (r = Dt(n), r === null)
        throw Error(p(188));
      return r !== n ? null : n;
    }
    for (var u = n, l = r; ; ) {
      var c = u.return;
      if (c === null)
        break;
      var d = c.alternate;
      if (d === null) {
        if (l = c.return, l !== null) {
          u = l;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === u)
            return Lt(c), n;
          if (d === l)
            return Lt(c), r;
          d = d.sibling;
        }
        throw Error(p(188));
      }
      if (u.return !== l.return)
        u = c, l = d;
      else {
        for (var E = !1, x = c.child; x; ) {
          if (x === u) {
            E = !0, u = c, l = d;
            break;
          }
          if (x === l) {
            E = !0, l = c, u = d;
            break;
          }
          x = x.sibling;
        }
        if (!E) {
          for (x = d.child; x; ) {
            if (x === u) {
              E = !0, u = d, l = c;
              break;
            }
            if (x === l) {
              E = !0, l = d, u = c;
              break;
            }
            x = x.sibling;
          }
          if (!E)
            throw Error(p(189));
        }
      }
      if (u.alternate !== l)
        throw Error(p(190));
    }
    if (u.tag !== 3)
      throw Error(p(188));
    return u.stateNode.current === u ? n : r;
  }
  function Jn(n) {
    return n = ut(n), n !== null ? Tn(n) : null;
  }
  function Tn(n) {
    if (n.tag === 5 || n.tag === 6)
      return n;
    for (n = n.child; n !== null; ) {
      var r = Tn(n);
      if (r !== null)
        return r;
      n = n.sibling;
    }
    return null;
  }
  var Rn = m.unstable_scheduleCallback, Er = m.unstable_cancelCallback, mi = m.unstable_shouldYield, Yo = m.unstable_requestPaint, Xt = m.unstable_now, Qf = m.unstable_getCurrentPriorityLevel, ei = m.unstable_ImmediatePriority, jt = m.unstable_UserBlockingPriority, yi = m.unstable_NormalPriority, cu = m.unstable_LowPriority, Wo = m.unstable_IdlePriority, fu = null, ta = null;
  function Xl(n) {
    if (ta && typeof ta.onCommitFiberRoot == "function")
      try {
        ta.onCommitFiberRoot(fu, n, void 0, (n.current.flags & 128) === 128);
      } catch {
      }
  }
  var Vr = Math.clz32 ? Math.clz32 : rc, Zl = Math.log, Jl = Math.LN2;
  function rc(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Zl(n) / Jl | 0) | 0;
  }
  var Qo = 64, du = 4194304;
  function ti(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function Br(n, r) {
    var u = n.pendingLanes;
    if (u === 0)
      return 0;
    var l = 0, c = n.suspendedLanes, d = n.pingedLanes, E = u & 268435455;
    if (E !== 0) {
      var x = E & ~c;
      x !== 0 ? l = ti(x) : (d &= E, d !== 0 && (l = ti(d)));
    } else
      E = u & ~c, E !== 0 ? l = ti(E) : d !== 0 && (l = ti(d));
    if (l === 0)
      return 0;
    if (r !== 0 && r !== l && !(r & c) && (c = l & -l, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0))
      return r;
    if (l & 4 && (l |= u & 16), r = n.entangledLanes, r !== 0)
      for (n = n.entanglements, r &= l; 0 < r; )
        u = 31 - Vr(r), c = 1 << u, l |= n[u], r &= ~c;
    return l;
  }
  function pu(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function vu(n, r) {
    for (var u = n.suspendedLanes, l = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var E = 31 - Vr(d), x = 1 << E, L = c[E];
      L === -1 ? (!(x & u) || x & l) && (c[E] = pu(x, r)) : L <= r && (n.expiredLanes |= x), d &= ~x;
    }
  }
  function hu(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Go() {
    var n = Qo;
    return Qo <<= 1, !(Qo & 4194240) && (Qo = 64), n;
  }
  function qo(n) {
    for (var r = [], u = 0; 31 > u; u++)
      r.push(n);
    return r;
  }
  function Ui(n, r, u) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Vr(r), n[r] = u;
  }
  function Gf(n, r) {
    var u = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var l = n.eventTimes;
    for (n = n.expirationTimes; 0 < u; ) {
      var c = 31 - Vr(u), d = 1 << c;
      r[c] = 0, l[c] = -1, n[c] = -1, u &= ~d;
    }
  }
  function gi(n, r) {
    var u = n.entangledLanes |= r;
    for (n = n.entanglements; u; ) {
      var l = 31 - Vr(u), c = 1 << l;
      c & r | n[l] & r && (n[l] |= r), u &= ~c;
    }
  }
  var nn = 0;
  function Ko(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var to, Xo, Zt, Zo, Jo, Tt = !1, no = [], jn = null, na = null, $r = null, mu = /* @__PURE__ */ new Map(), Bn = /* @__PURE__ */ new Map(), cn = [], ac = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function ra(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        jn = null;
        break;
      case "dragenter":
      case "dragleave":
        na = null;
        break;
      case "mouseover":
      case "mouseout":
        $r = null;
        break;
      case "pointerover":
      case "pointerout":
        mu.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Bn.delete(r.pointerId);
    }
  }
  function fr(n, r, u, l, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: u, eventSystemFlags: l, nativeEvent: d, targetContainers: [c] }, r !== null && (r = vs(r), r !== null && Xo(r)), n) : (n.eventSystemFlags |= l, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Si(n, r, u, l, c) {
    switch (r) {
      case "focusin":
        return jn = fr(jn, n, r, u, l, c), !0;
      case "dragenter":
        return na = fr(na, n, r, u, l, c), !0;
      case "mouseover":
        return $r = fr($r, n, r, u, l, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return mu.set(d, fr(mu.get(d) || null, n, r, u, l, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, Bn.set(d, fr(Bn.get(d) || null, n, r, u, l, c)), !0;
    }
    return !1;
  }
  function ic(n) {
    var r = Ua(n.target);
    if (r !== null) {
      var u = Dt(r);
      if (u !== null) {
        if (r = u.tag, r === 13) {
          if (r = It(u), r !== null) {
            n.blockedOn = r, Jo(n.priority, function() {
              Zt(u);
            });
            return;
          }
        } else if (r === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function zi(n) {
    if (n.blockedOn !== null)
      return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var u = tl(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (u === null) {
        u = n.nativeEvent;
        var l = new u.constructor(u.type, u);
        it = l, u.target.dispatchEvent(l), it = null;
      } else
        return r = vs(u), r !== null && Xo(r), n.blockedOn = u, !1;
      r.shift();
    }
    return !0;
  }
  function yu(n, r, u) {
    zi(n) && u.delete(r);
  }
  function uc() {
    Tt = !1, jn !== null && zi(jn) && (jn = null), na !== null && zi(na) && (na = null), $r !== null && zi($r) && ($r = null), mu.forEach(yu), Bn.forEach(yu);
  }
  function Na(n, r) {
    n.blockedOn === r && (n.blockedOn = null, Tt || (Tt = !0, m.unstable_scheduleCallback(m.unstable_NormalPriority, uc)));
  }
  function gu(n) {
    function r(c) {
      return Na(c, n);
    }
    if (0 < no.length) {
      Na(no[0], n);
      for (var u = 1; u < no.length; u++) {
        var l = no[u];
        l.blockedOn === n && (l.blockedOn = null);
      }
    }
    for (jn !== null && Na(jn, n), na !== null && Na(na, n), $r !== null && Na($r, n), mu.forEach(r), Bn.forEach(r), u = 0; u < cn.length; u++)
      l = cn[u], l.blockedOn === n && (l.blockedOn = null);
    for (; 0 < cn.length && (u = cn[0], u.blockedOn === null); )
      ic(u), u.blockedOn === null && cn.shift();
  }
  var Su = Ze.ReactCurrentBatchConfig, La = !0;
  function el(n, r, u, l) {
    var c = nn, d = Su.transition;
    Su.transition = null;
    try {
      nn = 1, Cu(n, r, u, l);
    } finally {
      nn = c, Su.transition = d;
    }
  }
  function Eu(n, r, u, l) {
    var c = nn, d = Su.transition;
    Su.transition = null;
    try {
      nn = 4, Cu(n, r, u, l);
    } finally {
      nn = c, Su.transition = d;
    }
  }
  function Cu(n, r, u, l) {
    if (La) {
      var c = tl(n, r, u, l);
      if (c === null)
        hc(n, r, l, ro, u), ra(n, l);
      else if (Si(c, n, r, u, l))
        l.stopPropagation();
      else if (ra(n, l), r & 4 && -1 < ac.indexOf(n)) {
        for (; c !== null; ) {
          var d = vs(c);
          if (d !== null && to(d), d = tl(n, r, u, l), d === null && hc(n, r, l, ro, u), d === c)
            break;
          c = d;
        }
        c !== null && l.stopPropagation();
      } else
        hc(n, r, l, null, u);
    }
  }
  var ro = null;
  function tl(n, r, u, l) {
    if (ro = null, n = se(l), n = Ua(n), n !== null)
      if (r = Dt(n), r === null)
        n = null;
      else if (u = r.tag, u === 13) {
        if (n = It(r), n !== null)
          return n;
        n = null;
      } else if (u === 3) {
        if (r.stateNode.current.memoizedState.isDehydrated)
          return r.tag === 3 ? r.stateNode.containerInfo : null;
        n = null;
      } else
        r !== n && (n = null);
    return ro = n, null;
  }
  function es(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Qf()) {
          case ei:
            return 1;
          case jt:
            return 4;
          case yi:
          case cu:
            return 16;
          case Wo:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ni = null, g = null, k = null;
  function Q() {
    if (k)
      return k;
    var n, r = g, u = r.length, l, c = "value" in ni ? ni.value : ni.textContent, d = c.length;
    for (n = 0; n < u && r[n] === c[n]; n++)
      ;
    var E = u - n;
    for (l = 1; l <= E && r[u - l] === c[d - l]; l++)
      ;
    return k = c.slice(n, 1 < l ? 1 - l : void 0);
  }
  function X(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function Se() {
    return !0;
  }
  function ct() {
    return !1;
  }
  function Le(n) {
    function r(u, l, c, d, E) {
      this._reactName = u, this._targetInst = c, this.type = l, this.nativeEvent = d, this.target = E, this.currentTarget = null;
      for (var x in n)
        n.hasOwnProperty(x) && (u = n[x], this[x] = u ? u(d) : d[x]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Se : ct, this.isPropagationStopped = ct, this;
    }
    return M(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Se);
    }, stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Se);
    }, persist: function() {
    }, isPersistent: Se }), r;
  }
  var lt = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Pt = Le(lt), Jt = M({}, lt, { view: 0, detail: 0 }), Sn = Le(Jt), hn, En, _n, $t = M({}, Jt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Jf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== _n && (_n && n.type === "mousemove" ? (hn = n.screenX - _n.screenX, En = n.screenY - _n.screenY) : En = hn = 0, _n = n), hn);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : En;
  } }), ji = Le($t), nl = M({}, $t, { dataTransfer: 0 }), ts = Le(nl), qf = M({}, Jt, { relatedTarget: 0 }), ri = Le(qf), ns = M({}, lt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), rs = Le(ns), Kf = M({}, lt, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), Zm = Le(Kf), Jm = M({}, lt, { data: 0 }), Xf = Le(Jm), Zf = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, iv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, uv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function ov(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = uv[n]) ? !!r[n] : !1;
  }
  function Jf() {
    return ov;
  }
  var Pi = M({}, Jt, { key: function(n) {
    if (n.key) {
      var r = Zf[n.key] || n.key;
      if (r !== "Unidentified")
        return r;
    }
    return n.type === "keypress" ? (n = X(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? iv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Jf, charCode: function(n) {
    return n.type === "keypress" ? X(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? X(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), ey = Le(Pi), ed = M({}, $t, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), oc = Le(ed), td = M({}, Jt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Jf }), ty = Le(td), lc = M({}, lt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), lv = Le(lc), aa = M({}, $t, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Fi = Le(aa), er = [9, 13, 27, 32], ai = te && "CompositionEvent" in window, ao = null;
  te && "documentMode" in document && (ao = document.documentMode);
  var sc = te && "TextEvent" in window && !ao, sv = te && (!ai || ao && 8 < ao && 11 >= ao), rl = " ", cv = !1;
  function fv(n, r) {
    switch (n) {
      case "keyup":
        return er.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function cc(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var al = !1;
  function ny(n, r) {
    switch (n) {
      case "compositionend":
        return cc(r);
      case "keypress":
        return r.which !== 32 ? null : (cv = !0, rl);
      case "textInput":
        return n = r.data, n === rl && cv ? null : n;
      default:
        return null;
    }
  }
  function ry(n, r) {
    if (al)
      return n === "compositionend" || !ai && fv(n, r) ? (n = Q(), k = g = ni = null, al = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length)
            return r.char;
          if (r.which)
            return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return sv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var dv = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function pv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!dv[n.type] : r === "textarea";
  }
  function vv(n, r, u, l) {
    Ht(l), r = fs(r, "onChange"), 0 < r.length && (u = new Pt("onChange", "change", null, u, l), n.push({ event: u, listeners: r }));
  }
  var as = null, il = null;
  function ul(n) {
    vc(n, 0);
  }
  function ol(n) {
    var r = sl(n);
    if (dt(r))
      return n;
  }
  function hv(n, r) {
    if (n === "change")
      return r;
  }
  var nd = !1;
  if (te) {
    var rd;
    if (te) {
      var ad = "oninput" in document;
      if (!ad) {
        var mv = document.createElement("div");
        mv.setAttribute("oninput", "return;"), ad = typeof mv.oninput == "function";
      }
      rd = ad;
    } else
      rd = !1;
    nd = rd && (!document.documentMode || 9 < document.documentMode);
  }
  function yv() {
    as && (as.detachEvent("onpropertychange", gv), il = as = null);
  }
  function gv(n) {
    if (n.propertyName === "value" && ol(il)) {
      var r = [];
      vv(r, il, n, se(n)), di(ul, r);
    }
  }
  function ay(n, r, u) {
    n === "focusin" ? (yv(), as = r, il = u, as.attachEvent("onpropertychange", gv)) : n === "focusout" && yv();
  }
  function iy(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown")
      return ol(il);
  }
  function uy(n, r) {
    if (n === "click")
      return ol(r);
  }
  function Sv(n, r) {
    if (n === "input" || n === "change")
      return ol(r);
  }
  function oy(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var Aa = typeof Object.is == "function" ? Object.is : oy;
  function is(n, r) {
    if (Aa(n, r))
      return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null)
      return !1;
    var u = Object.keys(n), l = Object.keys(r);
    if (u.length !== l.length)
      return !1;
    for (l = 0; l < u.length; l++) {
      var c = u[l];
      if (!Y.call(r, c) || !Aa(n[c], r[c]))
        return !1;
    }
    return !0;
  }
  function Ev(n) {
    for (; n && n.firstChild; )
      n = n.firstChild;
    return n;
  }
  function Cv(n, r) {
    var u = Ev(n);
    n = 0;
    for (var l; u; ) {
      if (u.nodeType === 3) {
        if (l = n + u.textContent.length, n <= r && l >= r)
          return { node: u, offset: r - n };
        n = l;
      }
      e: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break e;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = Ev(u);
    }
  }
  function bv(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? bv(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function fc() {
    for (var n = window, r = _t(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var u = typeof r.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u)
        n = r.contentWindow;
      else
        break;
      r = _t(n.document);
    }
    return r;
  }
  function Hi(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function dc(n) {
    var r = fc(), u = n.focusedElem, l = n.selectionRange;
    if (r !== u && u && u.ownerDocument && bv(u.ownerDocument.documentElement, u)) {
      if (l !== null && Hi(u)) {
        if (r = l.start, n = l.end, n === void 0 && (n = r), "selectionStart" in u)
          u.selectionStart = r, u.selectionEnd = Math.min(n, u.value.length);
        else if (n = (r = u.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = u.textContent.length, d = Math.min(l.start, c);
          l = l.end === void 0 ? d : Math.min(l.end, c), !n.extend && d > l && (c = l, l = d, d = c), c = Cv(u, d);
          var E = Cv(
            u,
            l
          );
          c && E && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== E.node || n.focusOffset !== E.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > l ? (n.addRange(r), n.extend(E.node, E.offset)) : (r.setEnd(E.node, E.offset), n.addRange(r)));
        }
      }
      for (r = [], n = u; n = n.parentNode; )
        n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof u.focus == "function" && u.focus(), u = 0; u < r.length; u++)
        n = r[u], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var wv = te && "documentMode" in document && 11 >= document.documentMode, ii = null, id = null, us = null, ud = !1;
  function Tv(n, r, u) {
    var l = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    ud || ii == null || ii !== _t(l) || (l = ii, "selectionStart" in l && Hi(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = { anchorNode: l.anchorNode, anchorOffset: l.anchorOffset, focusNode: l.focusNode, focusOffset: l.focusOffset }), us && is(us, l) || (us = l, l = fs(id, "onSelect"), 0 < l.length && (r = new Pt("onSelect", "select", null, r, u), n.push({ event: r, listeners: l }), r.target = ii)));
  }
  function pc(n, r) {
    var u = {};
    return u[n.toLowerCase()] = r.toLowerCase(), u["Webkit" + n] = "webkit" + r, u["Moz" + n] = "moz" + r, u;
  }
  var io = { animationend: pc("Animation", "AnimationEnd"), animationiteration: pc("Animation", "AnimationIteration"), animationstart: pc("Animation", "AnimationStart"), transitionend: pc("Transition", "TransitionEnd") }, od = {}, ld = {};
  te && (ld = document.createElement("div").style, "AnimationEvent" in window || (delete io.animationend.animation, delete io.animationiteration.animation, delete io.animationstart.animation), "TransitionEvent" in window || delete io.transitionend.transition);
  function dr(n) {
    if (od[n])
      return od[n];
    if (!io[n])
      return n;
    var r = io[n], u;
    for (u in r)
      if (r.hasOwnProperty(u) && u in ld)
        return od[n] = r[u];
    return n;
  }
  var sd = dr("animationend"), Rv = dr("animationiteration"), _v = dr("animationstart"), xv = dr("transitionend"), Ov = /* @__PURE__ */ new Map(), kv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Vi(n, r) {
    Ov.set(n, r), N(r, [n]);
  }
  for (var os = 0; os < kv.length; os++) {
    var uo = kv[os], ly = uo.toLowerCase(), ls = uo[0].toUpperCase() + uo.slice(1);
    Vi(ly, "on" + ls);
  }
  Vi(sd, "onAnimationEnd"), Vi(Rv, "onAnimationIteration"), Vi(_v, "onAnimationStart"), Vi("dblclick", "onDoubleClick"), Vi("focusin", "onFocus"), Vi("focusout", "onBlur"), Vi(xv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), N("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), N("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), N("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), N("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), N("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), N("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ss = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), sy = new Set("cancel close invalid load scroll toggle".split(" ").concat(ss));
  function Dv(n, r, u) {
    var l = n.type || "unknown-event";
    n.currentTarget = u, He(l, r, void 0, n), n.currentTarget = null;
  }
  function vc(n, r) {
    r = (r & 4) !== 0;
    for (var u = 0; u < n.length; u++) {
      var l = n[u], c = l.event;
      l = l.listeners;
      e: {
        var d = void 0;
        if (r)
          for (var E = l.length - 1; 0 <= E; E--) {
            var x = l[E], L = x.instance, q = x.currentTarget;
            if (x = x.listener, L !== d && c.isPropagationStopped())
              break e;
            Dv(c, x, q), d = L;
          }
        else
          for (E = 0; E < l.length; E++) {
            if (x = l[E], L = x.instance, q = x.currentTarget, x = x.listener, L !== d && c.isPropagationStopped())
              break e;
            Dv(c, x, q), d = L;
          }
      }
    }
    if (hi)
      throw n = D, hi = !1, D = null, n;
  }
  function Cn(n, r) {
    var u = r[md];
    u === void 0 && (u = r[md] = /* @__PURE__ */ new Set());
    var l = n + "__bubble";
    u.has(l) || (Mv(r, n, 2, !1), u.add(l));
  }
  function bu(n, r, u) {
    var l = 0;
    r && (l |= 4), Mv(u, n, l, r);
  }
  var Bi = "_reactListening" + Math.random().toString(36).slice(2);
  function ll(n) {
    if (!n[Bi]) {
      n[Bi] = !0, C.forEach(function(u) {
        u !== "selectionchange" && (sy.has(u) || bu(u, !1, n), bu(u, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[Bi] || (r[Bi] = !0, bu("selectionchange", !1, r));
    }
  }
  function Mv(n, r, u, l) {
    switch (es(r)) {
      case 1:
        var c = el;
        break;
      case 4:
        c = Eu;
        break;
      default:
        c = Cu;
    }
    u = c.bind(null, r, u, n), c = void 0, !pi || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), l ? c !== void 0 ? n.addEventListener(r, u, { capture: !0, passive: c }) : n.addEventListener(r, u, !0) : c !== void 0 ? n.addEventListener(r, u, { passive: c }) : n.addEventListener(r, u, !1);
  }
  function hc(n, r, u, l, c) {
    var d = l;
    if (!(r & 1) && !(r & 2) && l !== null)
      e:
        for (; ; ) {
          if (l === null)
            return;
          var E = l.tag;
          if (E === 3 || E === 4) {
            var x = l.stateNode.containerInfo;
            if (x === c || x.nodeType === 8 && x.parentNode === c)
              break;
            if (E === 4)
              for (E = l.return; E !== null; ) {
                var L = E.tag;
                if ((L === 3 || L === 4) && (L = E.stateNode.containerInfo, L === c || L.nodeType === 8 && L.parentNode === c))
                  return;
                E = E.return;
              }
            for (; x !== null; ) {
              if (E = Ua(x), E === null)
                return;
              if (L = E.tag, L === 5 || L === 6) {
                l = d = E;
                continue e;
              }
              x = x.parentNode;
            }
          }
          l = l.return;
        }
    di(function() {
      var q = d, de = se(u), ve = [];
      e: {
        var fe = Ov.get(n);
        if (fe !== void 0) {
          var je = Pt, We = n;
          switch (n) {
            case "keypress":
              if (X(u) === 0)
                break e;
            case "keydown":
            case "keyup":
              je = ey;
              break;
            case "focusin":
              We = "focus", je = ri;
              break;
            case "focusout":
              We = "blur", je = ri;
              break;
            case "beforeblur":
            case "afterblur":
              je = ri;
              break;
            case "click":
              if (u.button === 2)
                break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              je = ji;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              je = ts;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              je = ty;
              break;
            case sd:
            case Rv:
            case _v:
              je = rs;
              break;
            case xv:
              je = lv;
              break;
            case "scroll":
              je = Sn;
              break;
            case "wheel":
              je = Fi;
              break;
            case "copy":
            case "cut":
            case "paste":
              je = Zm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              je = oc;
          }
          var qe = (r & 4) !== 0, Xn = !qe && n === "scroll", F = qe ? fe !== null ? fe + "Capture" : null : fe;
          qe = [];
          for (var j = q, I; j !== null; ) {
            I = j;
            var Ee = I.stateNode;
            if (I.tag === 5 && Ee !== null && (I = Ee, F !== null && (Ee = ga(j, F), Ee != null && qe.push(cs(j, Ee, I)))), Xn)
              break;
            j = j.return;
          }
          0 < qe.length && (fe = new je(fe, We, null, u, de), ve.push({ event: fe, listeners: qe }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (fe = n === "mouseover" || n === "pointerover", je = n === "mouseout" || n === "pointerout", fe && u !== it && (We = u.relatedTarget || u.fromElement) && (Ua(We) || We[$i]))
            break e;
          if ((je || fe) && (fe = de.window === de ? de : (fe = de.ownerDocument) ? fe.defaultView || fe.parentWindow : window, je ? (We = u.relatedTarget || u.toElement, je = q, We = We ? Ua(We) : null, We !== null && (Xn = Dt(We), We !== Xn || We.tag !== 5 && We.tag !== 6) && (We = null)) : (je = null, We = q), je !== We)) {
            if (qe = ji, Ee = "onMouseLeave", F = "onMouseEnter", j = "mouse", (n === "pointerout" || n === "pointerover") && (qe = oc, Ee = "onPointerLeave", F = "onPointerEnter", j = "pointer"), Xn = je == null ? fe : sl(je), I = We == null ? fe : sl(We), fe = new qe(Ee, j + "leave", je, u, de), fe.target = Xn, fe.relatedTarget = I, Ee = null, Ua(de) === q && (qe = new qe(F, j + "enter", We, u, de), qe.target = I, qe.relatedTarget = Xn, Ee = qe), Xn = Ee, je && We)
              t: {
                for (qe = je, F = We, j = 0, I = qe; I; I = oo(I))
                  j++;
                for (I = 0, Ee = F; Ee; Ee = oo(Ee))
                  I++;
                for (; 0 < j - I; )
                  qe = oo(qe), j--;
                for (; 0 < I - j; )
                  F = oo(F), I--;
                for (; j--; ) {
                  if (qe === F || F !== null && qe === F.alternate)
                    break t;
                  qe = oo(qe), F = oo(F);
                }
                qe = null;
              }
            else
              qe = null;
            je !== null && cd(ve, fe, je, qe, !1), We !== null && Xn !== null && cd(ve, Xn, We, qe, !0);
          }
        }
        e: {
          if (fe = q ? sl(q) : window, je = fe.nodeName && fe.nodeName.toLowerCase(), je === "select" || je === "input" && fe.type === "file")
            var Xe = hv;
          else if (pv(fe))
            if (nd)
              Xe = Sv;
            else {
              Xe = iy;
              var Qe = ay;
            }
          else
            (je = fe.nodeName) && je.toLowerCase() === "input" && (fe.type === "checkbox" || fe.type === "radio") && (Xe = uy);
          if (Xe && (Xe = Xe(n, q))) {
            vv(ve, Xe, u, de);
            break e;
          }
          Qe && Qe(n, fe, q), n === "focusout" && (Qe = fe._wrapperState) && Qe.controlled && fe.type === "number" && zn(fe, "number", fe.value);
        }
        switch (Qe = q ? sl(q) : window, n) {
          case "focusin":
            (pv(Qe) || Qe.contentEditable === "true") && (ii = Qe, id = q, us = null);
            break;
          case "focusout":
            us = id = ii = null;
            break;
          case "mousedown":
            ud = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ud = !1, Tv(ve, u, de);
            break;
          case "selectionchange":
            if (wv)
              break;
          case "keydown":
          case "keyup":
            Tv(ve, u, de);
        }
        var et;
        if (ai)
          e: {
            switch (n) {
              case "compositionstart":
                var Et = "onCompositionStart";
                break e;
              case "compositionend":
                Et = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Et = "onCompositionUpdate";
                break e;
            }
            Et = void 0;
          }
        else
          al ? fv(n, u) && (Et = "onCompositionEnd") : n === "keydown" && u.keyCode === 229 && (Et = "onCompositionStart");
        Et && (sv && u.locale !== "ko" && (al || Et !== "onCompositionStart" ? Et === "onCompositionEnd" && al && (et = Q()) : (ni = de, g = "value" in ni ? ni.value : ni.textContent, al = !0)), Qe = fs(q, Et), 0 < Qe.length && (Et = new Xf(Et, n, null, u, de), ve.push({ event: Et, listeners: Qe }), et ? Et.data = et : (et = cc(u), et !== null && (Et.data = et)))), (et = sc ? ny(n, u) : ry(n, u)) && (q = fs(q, "onBeforeInput"), 0 < q.length && (de = new Xf("onBeforeInput", "beforeinput", null, u, de), ve.push({ event: de, listeners: q }), de.data = et));
      }
      vc(ve, r);
    });
  }
  function cs(n, r, u) {
    return { instance: n, listener: r, currentTarget: u };
  }
  function fs(n, r) {
    for (var u = r + "Capture", l = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = ga(n, u), d != null && l.unshift(cs(n, d, c)), d = ga(n, r), d != null && l.push(cs(n, d, c))), n = n.return;
    }
    return l;
  }
  function oo(n) {
    if (n === null)
      return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function cd(n, r, u, l, c) {
    for (var d = r._reactName, E = []; u !== null && u !== l; ) {
      var x = u, L = x.alternate, q = x.stateNode;
      if (L !== null && L === l)
        break;
      x.tag === 5 && q !== null && (x = q, c ? (L = ga(u, d), L != null && E.unshift(cs(u, L, x))) : c || (L = ga(u, d), L != null && E.push(cs(u, L, x)))), u = u.return;
    }
    E.length !== 0 && n.push({ event: r, listeners: E });
  }
  var fd = /\r\n?/g, cy = /\u0000|\uFFFD/g;
  function dd(n) {
    return (typeof n == "string" ? n : "" + n).replace(fd, `
`).replace(cy, "");
  }
  function mc(n, r, u) {
    if (r = dd(r), dd(n) !== r && u)
      throw Error(p(425));
  }
  function yc() {
  }
  var pd = null, lo = null;
  function ds(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var so = typeof setTimeout == "function" ? setTimeout : void 0, Nv = typeof clearTimeout == "function" ? clearTimeout : void 0, vd = typeof Promise == "function" ? Promise : void 0, hd = typeof queueMicrotask == "function" ? queueMicrotask : typeof vd < "u" ? function(n) {
    return vd.resolve(null).then(n).catch(fy);
  } : so;
  function fy(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function wu(n, r) {
    var u = r, l = 0;
    do {
      var c = u.nextSibling;
      if (n.removeChild(u), c && c.nodeType === 8)
        if (u = c.data, u === "/$") {
          if (l === 0) {
            n.removeChild(c), gu(r);
            return;
          }
          l--;
        } else
          u !== "$" && u !== "$?" && u !== "$!" || l++;
      u = c;
    } while (u);
    gu(r);
  }
  function ui(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3)
        break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?")
          break;
        if (r === "/$")
          return null;
      }
    }
    return n;
  }
  function ps(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var u = n.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (r === 0)
            return n;
          r--;
        } else
          u === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var Tu = Math.random().toString(36).slice(2), Ei = "__reactFiber$" + Tu, co = "__reactProps$" + Tu, $i = "__reactContainer$" + Tu, md = "__reactEvents$" + Tu, dy = "__reactListeners$" + Tu, yd = "__reactHandles$" + Tu;
  function Ua(n) {
    var r = n[Ei];
    if (r)
      return r;
    for (var u = n.parentNode; u; ) {
      if (r = u[$i] || u[Ei]) {
        if (u = r.alternate, r.child !== null || u !== null && u.child !== null)
          for (n = ps(n); n !== null; ) {
            if (u = n[Ei])
              return u;
            n = ps(n);
          }
        return r;
      }
      n = u, u = n.parentNode;
    }
    return null;
  }
  function vs(n) {
    return n = n[Ei] || n[$i], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function sl(n) {
    if (n.tag === 5 || n.tag === 6)
      return n.stateNode;
    throw Error(p(33));
  }
  function nt(n) {
    return n[co] || null;
  }
  var Ru = [], xn = -1;
  function At(n) {
    return { current: n };
  }
  function ln(n) {
    0 > xn || (n.current = Ru[xn], Ru[xn] = null, xn--);
  }
  function fn(n, r) {
    xn++, Ru[xn] = n.current, n.current = r;
  }
  var Ci = {}, St = At(Ci), $n = At(!1), ia = Ci;
  function za(n, r) {
    var u = n.type.contextTypes;
    if (!u)
      return Ci;
    var l = n.stateNode;
    if (l && l.__reactInternalMemoizedUnmaskedChildContext === r)
      return l.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in u)
      c[d] = r[d];
    return l && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function An(n) {
    return n = n.childContextTypes, n != null;
  }
  function ja() {
    ln($n), ln(St);
  }
  function _u(n, r, u) {
    if (St.current !== Ci)
      throw Error(p(168));
    fn(St, r), fn($n, u);
  }
  function hs(n, r, u) {
    var l = n.stateNode;
    if (r = r.childContextTypes, typeof l.getChildContext != "function")
      return u;
    l = l.getChildContext();
    for (var c in l)
      if (!(c in r))
        throw Error(p(108, xe(n) || "Unknown", c));
    return M({}, u, l);
  }
  function gc(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Ci, ia = St.current, fn(St, n), fn($n, $n.current), !0;
  }
  function Lv(n, r, u) {
    var l = n.stateNode;
    if (!l)
      throw Error(p(169));
    u ? (n = hs(n, r, ia), l.__reactInternalMemoizedMergedChildContext = n, ln($n), ln(St), fn(St, n)) : ln($n), fn($n, u);
  }
  var Ca = null, pr = !1, ms = !1;
  function gd(n) {
    Ca === null ? Ca = [n] : Ca.push(n);
  }
  function Sd(n) {
    pr = !0, gd(n);
  }
  function ua() {
    if (!ms && Ca !== null) {
      ms = !0;
      var n = 0, r = nn;
      try {
        var u = Ca;
        for (nn = 1; n < u.length; n++) {
          var l = u[n];
          do
            l = l(!0);
          while (l !== null);
        }
        Ca = null, pr = !1;
      } catch (c) {
        throw Ca !== null && (Ca = Ca.slice(n + 1)), Rn(ei, ua), c;
      } finally {
        nn = r, ms = !1;
      }
    }
    return null;
  }
  var xu = [], oa = 0, fo = null, cl = 0, la = [], Lr = 0, Pa = null, Cr = 1, Ii = "";
  function ba(n, r) {
    xu[oa++] = cl, xu[oa++] = fo, fo = n, cl = r;
  }
  function Ed(n, r, u) {
    la[Lr++] = Cr, la[Lr++] = Ii, la[Lr++] = Pa, Pa = n;
    var l = Cr;
    n = Ii;
    var c = 32 - Vr(l) - 1;
    l &= ~(1 << c), u += 1;
    var d = 32 - Vr(r) + c;
    if (30 < d) {
      var E = c - c % 5;
      d = (l & (1 << E) - 1).toString(32), l >>= E, c -= E, Cr = 1 << 32 - Vr(r) + c | u << c | l, Ii = d + n;
    } else
      Cr = 1 << d | u << c | l, Ii = n;
  }
  function Sc(n) {
    n.return !== null && (ba(n, 1), Ed(n, 1, 0));
  }
  function Cd(n) {
    for (; n === fo; )
      fo = xu[--oa], xu[oa] = null, cl = xu[--oa], xu[oa] = null;
    for (; n === Pa; )
      Pa = la[--Lr], la[Lr] = null, Ii = la[--Lr], la[Lr] = null, Cr = la[--Lr], la[Lr] = null;
  }
  var wa = null, sa = null, On = !1, Fa = null;
  function bd(n, r) {
    var u = Ya(5, null, null, 0);
    u.elementType = "DELETED", u.stateNode = r, u.return = n, r = n.deletions, r === null ? (n.deletions = [u], n.flags |= 16) : r.push(u);
  }
  function Av(n, r) {
    switch (n.tag) {
      case 5:
        var u = n.type;
        return r = r.nodeType !== 1 || u.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, wa = n, sa = ui(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, wa = n, sa = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (u = Pa !== null ? { id: Cr, overflow: Ii } : null, n.memoizedState = { dehydrated: r, treeContext: u, retryLane: 1073741824 }, u = Ya(18, null, null, 0), u.stateNode = r, u.return = n, n.child = u, wa = n, sa = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Ec(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function Cc(n) {
    if (On) {
      var r = sa;
      if (r) {
        var u = r;
        if (!Av(n, r)) {
          if (Ec(n))
            throw Error(p(418));
          r = ui(u.nextSibling);
          var l = wa;
          r && Av(n, r) ? bd(l, u) : (n.flags = n.flags & -4097 | 2, On = !1, wa = n);
        }
      } else {
        if (Ec(n))
          throw Error(p(418));
        n.flags = n.flags & -4097 | 2, On = !1, wa = n;
      }
    }
  }
  function Uv(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; )
      n = n.return;
    wa = n;
  }
  function bc(n) {
    if (n !== wa)
      return !1;
    if (!On)
      return Uv(n), On = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !ds(n.type, n.memoizedProps)), r && (r = sa)) {
      if (Ec(n))
        throw zv(), Error(p(418));
      for (; r; )
        bd(n, r), r = ui(r.nextSibling);
    }
    if (Uv(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n)
        throw Error(p(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var u = n.data;
            if (u === "/$") {
              if (r === 0) {
                sa = ui(n.nextSibling);
                break e;
              }
              r--;
            } else
              u !== "$" && u !== "$!" && u !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        sa = null;
      }
    } else
      sa = wa ? ui(n.stateNode.nextSibling) : null;
    return !0;
  }
  function zv() {
    for (var n = sa; n; )
      n = ui(n.nextSibling);
  }
  function Pn() {
    sa = wa = null, On = !1;
  }
  function wd(n) {
    Fa === null ? Fa = [n] : Fa.push(n);
  }
  var wc = Ze.ReactCurrentBatchConfig;
  function Ta(n, r) {
    if (n && n.defaultProps) {
      r = M({}, r), n = n.defaultProps;
      for (var u in n)
        r[u] === void 0 && (r[u] = n[u]);
      return r;
    }
    return r;
  }
  var bi = At(null), Tc = null, Ou = null, Td = null;
  function Rd() {
    Td = Ou = Tc = null;
  }
  function ku(n) {
    var r = bi.current;
    ln(bi), n._currentValue = r;
  }
  function vr(n, r, u) {
    for (; n !== null; ) {
      var l = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, l !== null && (l.childLanes |= r)) : l !== null && (l.childLanes & r) !== r && (l.childLanes |= r), n === u)
        break;
      n = n.return;
    }
  }
  function ke(n, r) {
    Tc = n, Td = Ou = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (tr = !0), n.firstContext = null);
  }
  function Kn(n) {
    var r = n._currentValue;
    if (Td !== n)
      if (n = { context: n, memoizedValue: r, next: null }, Ou === null) {
        if (Tc === null)
          throw Error(p(308));
        Ou = n, Tc.dependencies = { lanes: 0, firstContext: n };
      } else
        Ou = Ou.next = n;
    return r;
  }
  var br = null;
  function _d(n) {
    br === null ? br = [n] : br.push(n);
  }
  function jv(n, r, u, l) {
    var c = r.interleaved;
    return c === null ? (u.next = u, _d(r)) : (u.next = c.next, c.next = u), r.interleaved = u, Yi(n, l);
  }
  function Yi(n, r) {
    n.lanes |= r;
    var u = n.alternate;
    for (u !== null && (u.lanes |= r), u = n, n = n.return; n !== null; )
      n.childLanes |= r, u = n.alternate, u !== null && (u.childLanes |= r), u = n, n = n.return;
    return u.tag === 3 ? u.stateNode : null;
  }
  var Du = !1;
  function xd(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function ir(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function Wi(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Mu(n, r, u) {
    var l = n.updateQueue;
    if (l === null)
      return null;
    if (l = l.shared, Vt & 2) {
      var c = l.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), l.pending = r, Yi(n, u);
    }
    return c = l.interleaved, c === null ? (r.next = r, _d(l)) : (r.next = c.next, c.next = r), l.interleaved = r, Yi(n, u);
  }
  function Rc(n, r, u) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (u & 4194240) !== 0)) {
      var l = r.lanes;
      l &= n.pendingLanes, u |= l, r.lanes = u, gi(n, u);
    }
  }
  function Od(n, r) {
    var u = n.updateQueue, l = n.alternate;
    if (l !== null && (l = l.updateQueue, u === l)) {
      var c = null, d = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var E = { eventTime: u.eventTime, lane: u.lane, tag: u.tag, payload: u.payload, callback: u.callback, next: null };
          d === null ? c = d = E : d = d.next = E, u = u.next;
        } while (u !== null);
        d === null ? c = d = r : d = d.next = r;
      } else
        c = d = r;
      u = { baseState: l.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: l.shared, effects: l.effects }, n.updateQueue = u;
      return;
    }
    n = u.lastBaseUpdate, n === null ? u.firstBaseUpdate = r : n.next = r, u.lastBaseUpdate = r;
  }
  function Nu(n, r, u, l) {
    var c = n.updateQueue;
    Du = !1;
    var d = c.firstBaseUpdate, E = c.lastBaseUpdate, x = c.shared.pending;
    if (x !== null) {
      c.shared.pending = null;
      var L = x, q = L.next;
      L.next = null, E === null ? d = q : E.next = q, E = L;
      var de = n.alternate;
      de !== null && (de = de.updateQueue, x = de.lastBaseUpdate, x !== E && (x === null ? de.firstBaseUpdate = q : x.next = q, de.lastBaseUpdate = L));
    }
    if (d !== null) {
      var ve = c.baseState;
      E = 0, de = q = L = null, x = d;
      do {
        var fe = x.lane, je = x.eventTime;
        if ((l & fe) === fe) {
          de !== null && (de = de.next = {
            eventTime: je,
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          });
          e: {
            var We = n, qe = x;
            switch (fe = r, je = u, qe.tag) {
              case 1:
                if (We = qe.payload, typeof We == "function") {
                  ve = We.call(je, ve, fe);
                  break e;
                }
                ve = We;
                break e;
              case 3:
                We.flags = We.flags & -65537 | 128;
              case 0:
                if (We = qe.payload, fe = typeof We == "function" ? We.call(je, ve, fe) : We, fe == null)
                  break e;
                ve = M({}, ve, fe);
                break e;
              case 2:
                Du = !0;
            }
          }
          x.callback !== null && x.lane !== 0 && (n.flags |= 64, fe = c.effects, fe === null ? c.effects = [x] : fe.push(x));
        } else
          je = { eventTime: je, lane: fe, tag: x.tag, payload: x.payload, callback: x.callback, next: null }, de === null ? (q = de = je, L = ve) : de = de.next = je, E |= fe;
        if (x = x.next, x === null) {
          if (x = c.shared.pending, x === null)
            break;
          fe = x, x = fe.next, fe.next = null, c.lastBaseUpdate = fe, c.shared.pending = null;
        }
      } while (!0);
      if (de === null && (L = ve), c.baseState = L, c.firstBaseUpdate = q, c.lastBaseUpdate = de, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          E |= c.lane, c = c.next;
        while (c !== r);
      } else
        d === null && (c.shared.lanes = 0);
      Ki |= E, n.lanes = E, n.memoizedState = ve;
    }
  }
  function po(n, r, u) {
    if (n = r.effects, r.effects = null, n !== null)
      for (r = 0; r < n.length; r++) {
        var l = n[r], c = l.callback;
        if (c !== null) {
          if (l.callback = null, l = u, typeof c != "function")
            throw Error(p(191, c));
          c.call(l);
        }
      }
  }
  var Pv = new v.Component().refs;
  function kd(n, r, u, l) {
    r = n.memoizedState, u = u(l, r), u = u == null ? r : M({}, r, u), n.memoizedState = u, n.lanes === 0 && (n.updateQueue.baseState = u);
  }
  var _c = { isMounted: function(n) {
    return (n = n._reactInternals) ? Dt(n) === n : !1;
  }, enqueueSetState: function(n, r, u) {
    n = n._reactInternals;
    var l = jr(), c = nr(n), d = Wi(l, c);
    d.payload = r, u != null && (d.callback = u), r = Mu(n, d, c), r !== null && (Pr(r, n, c, l), Rc(r, n, c));
  }, enqueueReplaceState: function(n, r, u) {
    n = n._reactInternals;
    var l = jr(), c = nr(n), d = Wi(l, c);
    d.tag = 1, d.payload = r, u != null && (d.callback = u), r = Mu(n, d, c), r !== null && (Pr(r, n, c, l), Rc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var u = jr(), l = nr(n), c = Wi(u, l);
    c.tag = 2, r != null && (c.callback = r), r = Mu(n, c, l), r !== null && (Pr(r, n, l, u), Rc(r, n, l));
  } };
  function Fv(n, r, u, l, c, d, E) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(l, d, E) : r.prototype && r.prototype.isPureReactComponent ? !is(u, l) || !is(c, d) : !0;
  }
  function Hv(n, r, u) {
    var l = !1, c = Ci, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Kn(d) : (c = An(r) ? ia : St.current, l = r.contextTypes, d = (l = l != null) ? za(n, c) : Ci), r = new r(u, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = _c, n.stateNode = r, r._reactInternals = n, l && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function Vv(n, r, u, l) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(u, l), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(u, l), r.state !== n && _c.enqueueReplaceState(r, r.state, null);
  }
  function xc(n, r, u, l) {
    var c = n.stateNode;
    c.props = u, c.state = n.memoizedState, c.refs = Pv, xd(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Kn(d) : (d = An(r) ? ia : St.current, c.context = za(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (kd(n, r, d, u), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && _c.enqueueReplaceState(c, c.state, null), Nu(n, u, c, l), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function fl(n, r, u) {
    if (n = u.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (u._owner) {
        if (u = u._owner, u) {
          if (u.tag !== 1)
            throw Error(p(309));
          var l = u.stateNode;
        }
        if (!l)
          throw Error(p(147, n));
        var c = l, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(E) {
          var x = c.refs;
          x === Pv && (x = c.refs = {}), E === null ? delete x[d] : x[d] = E;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string")
        throw Error(p(284));
      if (!u._owner)
        throw Error(p(290, n));
    }
    return n;
  }
  function Oc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(p(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Bv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function $v(n) {
    function r(F, j) {
      if (n) {
        var I = F.deletions;
        I === null ? (F.deletions = [j], F.flags |= 16) : I.push(j);
      }
    }
    function u(F, j) {
      if (!n)
        return null;
      for (; j !== null; )
        r(F, j), j = j.sibling;
      return null;
    }
    function l(F, j) {
      for (F = /* @__PURE__ */ new Map(); j !== null; )
        j.key !== null ? F.set(j.key, j) : F.set(j.index, j), j = j.sibling;
      return F;
    }
    function c(F, j) {
      return F = Hu(F, j), F.index = 0, F.sibling = null, F;
    }
    function d(F, j, I) {
      return F.index = I, n ? (I = F.alternate, I !== null ? (I = I.index, I < j ? (F.flags |= 2, j) : I) : (F.flags |= 2, j)) : (F.flags |= 1048576, j);
    }
    function E(F) {
      return n && F.alternate === null && (F.flags |= 2), F;
    }
    function x(F, j, I, Ee) {
      return j === null || j.tag !== 6 ? (j = Us(I, F.mode, Ee), j.return = F, j) : (j = c(j, I), j.return = F, j);
    }
    function L(F, j, I, Ee) {
      var Xe = I.type;
      return Xe === Fe ? de(F, j, I.props.children, Ee, I.key) : j !== null && (j.elementType === Xe || typeof Xe == "object" && Xe !== null && Xe.$$typeof === Ct && Bv(Xe) === j.type) ? (Ee = c(j, I.props), Ee.ref = fl(F, j, I), Ee.return = F, Ee) : (Ee = of(I.type, I.key, I.props, null, F.mode, Ee), Ee.ref = fl(F, j, I), Ee.return = F, Ee);
    }
    function q(F, j, I, Ee) {
      return j === null || j.tag !== 4 || j.stateNode.containerInfo !== I.containerInfo || j.stateNode.implementation !== I.implementation ? (j = No(I, F.mode, Ee), j.return = F, j) : (j = c(j, I.children || []), j.return = F, j);
    }
    function de(F, j, I, Ee, Xe) {
      return j === null || j.tag !== 7 ? (j = Mo(I, F.mode, Ee, Xe), j.return = F, j) : (j = c(j, I), j.return = F, j);
    }
    function ve(F, j, I) {
      if (typeof j == "string" && j !== "" || typeof j == "number")
        return j = Us("" + j, F.mode, I), j.return = F, j;
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case _e:
            return I = of(j.type, j.key, j.props, null, F.mode, I), I.ref = fl(F, null, j), I.return = F, I;
          case Ke:
            return j = No(j, F.mode, I), j.return = F, j;
          case Ct:
            var Ee = j._init;
            return ve(F, Ee(j._payload), I);
        }
        if (vn(j) || $e(j))
          return j = Mo(j, F.mode, I, null), j.return = F, j;
        Oc(F, j);
      }
      return null;
    }
    function fe(F, j, I, Ee) {
      var Xe = j !== null ? j.key : null;
      if (typeof I == "string" && I !== "" || typeof I == "number")
        return Xe !== null ? null : x(F, j, "" + I, Ee);
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case _e:
            return I.key === Xe ? L(F, j, I, Ee) : null;
          case Ke:
            return I.key === Xe ? q(F, j, I, Ee) : null;
          case Ct:
            return Xe = I._init, fe(
              F,
              j,
              Xe(I._payload),
              Ee
            );
        }
        if (vn(I) || $e(I))
          return Xe !== null ? null : de(F, j, I, Ee, null);
        Oc(F, I);
      }
      return null;
    }
    function je(F, j, I, Ee, Xe) {
      if (typeof Ee == "string" && Ee !== "" || typeof Ee == "number")
        return F = F.get(I) || null, x(j, F, "" + Ee, Xe);
      if (typeof Ee == "object" && Ee !== null) {
        switch (Ee.$$typeof) {
          case _e:
            return F = F.get(Ee.key === null ? I : Ee.key) || null, L(j, F, Ee, Xe);
          case Ke:
            return F = F.get(Ee.key === null ? I : Ee.key) || null, q(j, F, Ee, Xe);
          case Ct:
            var Qe = Ee._init;
            return je(F, j, I, Qe(Ee._payload), Xe);
        }
        if (vn(Ee) || $e(Ee))
          return F = F.get(I) || null, de(j, F, Ee, Xe, null);
        Oc(j, Ee);
      }
      return null;
    }
    function We(F, j, I, Ee) {
      for (var Xe = null, Qe = null, et = j, Et = j = 0, yr = null; et !== null && Et < I.length; Et++) {
        et.index > Et ? (yr = et, et = null) : yr = et.sibling;
        var en = fe(F, et, I[Et], Ee);
        if (en === null) {
          et === null && (et = yr);
          break;
        }
        n && et && en.alternate === null && r(F, et), j = d(en, j, Et), Qe === null ? Xe = en : Qe.sibling = en, Qe = en, et = yr;
      }
      if (Et === I.length)
        return u(F, et), On && ba(F, Et), Xe;
      if (et === null) {
        for (; Et < I.length; Et++)
          et = ve(F, I[Et], Ee), et !== null && (j = d(et, j, Et), Qe === null ? Xe = et : Qe.sibling = et, Qe = et);
        return On && ba(F, Et), Xe;
      }
      for (et = l(F, et); Et < I.length; Et++)
        yr = je(et, F, Et, I[Et], Ee), yr !== null && (n && yr.alternate !== null && et.delete(yr.key === null ? Et : yr.key), j = d(yr, j, Et), Qe === null ? Xe = yr : Qe.sibling = yr, Qe = yr);
      return n && et.forEach(function(Vu) {
        return r(F, Vu);
      }), On && ba(F, Et), Xe;
    }
    function qe(F, j, I, Ee) {
      var Xe = $e(I);
      if (typeof Xe != "function")
        throw Error(p(150));
      if (I = Xe.call(I), I == null)
        throw Error(p(151));
      for (var Qe = Xe = null, et = j, Et = j = 0, yr = null, en = I.next(); et !== null && !en.done; Et++, en = I.next()) {
        et.index > Et ? (yr = et, et = null) : yr = et.sibling;
        var Vu = fe(F, et, en.value, Ee);
        if (Vu === null) {
          et === null && (et = yr);
          break;
        }
        n && et && Vu.alternate === null && r(F, et), j = d(Vu, j, Et), Qe === null ? Xe = Vu : Qe.sibling = Vu, Qe = Vu, et = yr;
      }
      if (en.done)
        return u(
          F,
          et
        ), On && ba(F, Et), Xe;
      if (et === null) {
        for (; !en.done; Et++, en = I.next())
          en = ve(F, en.value, Ee), en !== null && (j = d(en, j, Et), Qe === null ? Xe = en : Qe.sibling = en, Qe = en);
        return On && ba(F, Et), Xe;
      }
      for (et = l(F, et); !en.done; Et++, en = I.next())
        en = je(et, F, Et, en.value, Ee), en !== null && (n && en.alternate !== null && et.delete(en.key === null ? Et : en.key), j = d(en, j, Et), Qe === null ? Xe = en : Qe.sibling = en, Qe = en);
      return n && et.forEach(function(Ny) {
        return r(F, Ny);
      }), On && ba(F, Et), Xe;
    }
    function Xn(F, j, I, Ee) {
      if (typeof I == "object" && I !== null && I.type === Fe && I.key === null && (I = I.props.children), typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case _e:
            e: {
              for (var Xe = I.key, Qe = j; Qe !== null; ) {
                if (Qe.key === Xe) {
                  if (Xe = I.type, Xe === Fe) {
                    if (Qe.tag === 7) {
                      u(F, Qe.sibling), j = c(Qe, I.props.children), j.return = F, F = j;
                      break e;
                    }
                  } else if (Qe.elementType === Xe || typeof Xe == "object" && Xe !== null && Xe.$$typeof === Ct && Bv(Xe) === Qe.type) {
                    u(F, Qe.sibling), j = c(Qe, I.props), j.ref = fl(F, Qe, I), j.return = F, F = j;
                    break e;
                  }
                  u(F, Qe);
                  break;
                } else
                  r(F, Qe);
                Qe = Qe.sibling;
              }
              I.type === Fe ? (j = Mo(I.props.children, F.mode, Ee, I.key), j.return = F, F = j) : (Ee = of(I.type, I.key, I.props, null, F.mode, Ee), Ee.ref = fl(F, j, I), Ee.return = F, F = Ee);
            }
            return E(F);
          case Ke:
            e: {
              for (Qe = I.key; j !== null; ) {
                if (j.key === Qe)
                  if (j.tag === 4 && j.stateNode.containerInfo === I.containerInfo && j.stateNode.implementation === I.implementation) {
                    u(F, j.sibling), j = c(j, I.children || []), j.return = F, F = j;
                    break e;
                  } else {
                    u(F, j);
                    break;
                  }
                else
                  r(F, j);
                j = j.sibling;
              }
              j = No(I, F.mode, Ee), j.return = F, F = j;
            }
            return E(F);
          case Ct:
            return Qe = I._init, Xn(F, j, Qe(I._payload), Ee);
        }
        if (vn(I))
          return We(F, j, I, Ee);
        if ($e(I))
          return qe(F, j, I, Ee);
        Oc(F, I);
      }
      return typeof I == "string" && I !== "" || typeof I == "number" ? (I = "" + I, j !== null && j.tag === 6 ? (u(F, j.sibling), j = c(j, I), j.return = F, F = j) : (u(F, j), j = Us(I, F.mode, Ee), j.return = F, F = j), E(F)) : u(F, j);
    }
    return Xn;
  }
  var dl = $v(!0), Iv = $v(!1), ys = {}, oi = At(ys), gs = At(ys), pl = At(ys);
  function vo(n) {
    if (n === ys)
      throw Error(p(174));
    return n;
  }
  function Dd(n, r) {
    switch (fn(pl, r), fn(gs, n), fn(oi, ys), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : on(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = on(r, n);
    }
    ln(oi), fn(oi, r);
  }
  function Lu() {
    ln(oi), ln(gs), ln(pl);
  }
  function st(n) {
    vo(pl.current);
    var r = vo(oi.current), u = on(r, n.type);
    r !== u && (fn(gs, n), fn(oi, u));
  }
  function Ft(n) {
    gs.current === n && (ln(oi), ln(gs));
  }
  var ft = At(0);
  function Fn(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var u = r.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || u.data === "$!"))
          return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128)
          return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n)
        break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n)
          return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var Ha = [];
  function kc() {
    for (var n = 0; n < Ha.length; n++)
      Ha[n]._workInProgressVersionPrimary = null;
    Ha.length = 0;
  }
  var Dc = Ze.ReactCurrentDispatcher, Md = Ze.ReactCurrentBatchConfig, ho = 0, kn = null, ne = null, Yt = null, pt = !1, wi = !1, Ra = 0, mo = 0;
  function Dn() {
    throw Error(p(321));
  }
  function yo(n, r) {
    if (r === null)
      return !1;
    for (var u = 0; u < r.length && u < n.length; u++)
      if (!Aa(n[u], r[u]))
        return !1;
    return !0;
  }
  function Au(n, r, u, l, c, d) {
    if (ho = d, kn = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, Dc.current = n === null || n.memoizedState === null ? vy : hy, n = u(l, c), wi) {
      d = 0;
      do {
        if (wi = !1, Ra = 0, 25 <= d)
          throw Error(p(301));
        d += 1, Yt = ne = null, r.updateQueue = null, Dc.current = Ld, n = u(l, c);
      } while (wi);
    }
    if (Dc.current = Wc, r = ne !== null && ne.next !== null, ho = 0, Yt = ne = kn = null, pt = !1, r)
      throw Error(p(300));
    return n;
  }
  function go() {
    var n = Ra !== 0;
    return Ra = 0, n;
  }
  function Va() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Yt === null ? kn.memoizedState = Yt = n : Yt = Yt.next = n, Yt;
  }
  function ca() {
    if (ne === null) {
      var n = kn.alternate;
      n = n !== null ? n.memoizedState : null;
    } else
      n = ne.next;
    var r = Yt === null ? kn.memoizedState : Yt.next;
    if (r !== null)
      Yt = r, ne = n;
    else {
      if (n === null)
        throw Error(p(310));
      ne = n, n = { memoizedState: ne.memoizedState, baseState: ne.baseState, baseQueue: ne.baseQueue, queue: ne.queue, next: null }, Yt === null ? kn.memoizedState = Yt = n : Yt = Yt.next = n;
    }
    return Yt;
  }
  function So(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Ss(n) {
    var r = ca(), u = r.queue;
    if (u === null)
      throw Error(p(311));
    u.lastRenderedReducer = n;
    var l = ne, c = l.baseQueue, d = u.pending;
    if (d !== null) {
      if (c !== null) {
        var E = c.next;
        c.next = d.next, d.next = E;
      }
      l.baseQueue = c = d, u.pending = null;
    }
    if (c !== null) {
      d = c.next, l = l.baseState;
      var x = E = null, L = null, q = d;
      do {
        var de = q.lane;
        if ((ho & de) === de)
          L !== null && (L = L.next = { lane: 0, action: q.action, hasEagerState: q.hasEagerState, eagerState: q.eagerState, next: null }), l = q.hasEagerState ? q.eagerState : n(l, q.action);
        else {
          var ve = {
            lane: de,
            action: q.action,
            hasEagerState: q.hasEagerState,
            eagerState: q.eagerState,
            next: null
          };
          L === null ? (x = L = ve, E = l) : L = L.next = ve, kn.lanes |= de, Ki |= de;
        }
        q = q.next;
      } while (q !== null && q !== d);
      L === null ? E = l : L.next = x, Aa(l, r.memoizedState) || (tr = !0), r.memoizedState = l, r.baseState = E, r.baseQueue = L, u.lastRenderedState = l;
    }
    if (n = u.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, kn.lanes |= d, Ki |= d, c = c.next;
      while (c !== n);
    } else
      c === null && (u.lanes = 0);
    return [r.memoizedState, u.dispatch];
  }
  function Es(n) {
    var r = ca(), u = r.queue;
    if (u === null)
      throw Error(p(311));
    u.lastRenderedReducer = n;
    var l = u.dispatch, c = u.pending, d = r.memoizedState;
    if (c !== null) {
      u.pending = null;
      var E = c = c.next;
      do
        d = n(d, E.action), E = E.next;
      while (E !== c);
      Aa(d, r.memoizedState) || (tr = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), u.lastRenderedState = d;
    }
    return [d, l];
  }
  function Mc() {
  }
  function Nc(n, r) {
    var u = kn, l = ca(), c = r(), d = !Aa(l.memoizedState, c);
    if (d && (l.memoizedState = c, tr = !0), l = l.queue, Cs(Uc.bind(null, u, l, n), [n]), l.getSnapshot !== r || d || Yt !== null && Yt.memoizedState.tag & 1) {
      if (u.flags |= 2048, Eo(9, Ac.bind(null, u, l, c, r), void 0, null), Hn === null)
        throw Error(p(349));
      ho & 30 || Lc(u, r, c);
    }
    return c;
  }
  function Lc(n, r, u) {
    n.flags |= 16384, n = { getSnapshot: r, value: u }, r = kn.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, kn.updateQueue = r, r.stores = [n]) : (u = r.stores, u === null ? r.stores = [n] : u.push(n));
  }
  function Ac(n, r, u, l) {
    r.value = u, r.getSnapshot = l, zc(r) && jc(n);
  }
  function Uc(n, r, u) {
    return u(function() {
      zc(r) && jc(n);
    });
  }
  function zc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var u = r();
      return !Aa(n, u);
    } catch {
      return !0;
    }
  }
  function jc(n) {
    var r = Yi(n, 1);
    r !== null && Pr(r, n, 1, -1);
  }
  function Pc(n) {
    var r = Va();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: So, lastRenderedState: n }, r.queue = n, n = n.dispatch = Yc.bind(null, kn, n), [r.memoizedState, n];
  }
  function Eo(n, r, u, l) {
    return n = { tag: n, create: r, destroy: u, deps: l, next: null }, r = kn.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, kn.updateQueue = r, r.lastEffect = n.next = n) : (u = r.lastEffect, u === null ? r.lastEffect = n.next = n : (l = u.next, u.next = n, n.next = l, r.lastEffect = n)), n;
  }
  function Fc() {
    return ca().memoizedState;
  }
  function Co(n, r, u, l) {
    var c = Va();
    kn.flags |= n, c.memoizedState = Eo(1 | r, u, void 0, l === void 0 ? null : l);
  }
  function Qi(n, r, u, l) {
    var c = ca();
    l = l === void 0 ? null : l;
    var d = void 0;
    if (ne !== null) {
      var E = ne.memoizedState;
      if (d = E.destroy, l !== null && yo(l, E.deps)) {
        c.memoizedState = Eo(r, u, d, l);
        return;
      }
    }
    kn.flags |= n, c.memoizedState = Eo(1 | r, u, d, l);
  }
  function Hc(n, r) {
    return Co(8390656, 8, n, r);
  }
  function Cs(n, r) {
    return Qi(2048, 8, n, r);
  }
  function Vc(n, r) {
    return Qi(4, 2, n, r);
  }
  function Bc(n, r) {
    return Qi(4, 4, n, r);
  }
  function Nd(n, r) {
    if (typeof r == "function")
      return n = n(), r(n), function() {
        r(null);
      };
    if (r != null)
      return n = n(), r.current = n, function() {
        r.current = null;
      };
  }
  function vl(n, r, u) {
    return u = u != null ? u.concat([n]) : null, Qi(4, 4, Nd.bind(null, r, n), u);
  }
  function $c() {
  }
  function hl(n, r) {
    var u = ca();
    r = r === void 0 ? null : r;
    var l = u.memoizedState;
    return l !== null && r !== null && yo(r, l[1]) ? l[0] : (u.memoizedState = [n, r], n);
  }
  function Uu(n, r) {
    var u = ca();
    r = r === void 0 ? null : r;
    var l = u.memoizedState;
    return l !== null && r !== null && yo(r, l[1]) ? l[0] : (n = n(), u.memoizedState = [n, r], n);
  }
  function fa(n, r, u) {
    return ho & 21 ? (Aa(u, r) || (u = Go(), kn.lanes |= u, Ki |= u, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, tr = !0), n.memoizedState = u);
  }
  function py(n, r) {
    var u = nn;
    nn = u !== 0 && 4 > u ? u : 4, n(!0);
    var l = Md.transition;
    Md.transition = {};
    try {
      n(!1), r();
    } finally {
      nn = u, Md.transition = l;
    }
  }
  function bn() {
    return ca().memoizedState;
  }
  function Ic(n, r, u) {
    var l = nr(n);
    if (u = { lane: l, action: u, hasEagerState: !1, eagerState: null, next: null }, ml(n))
      bs(r, u);
    else if (u = jv(n, r, u, l), u !== null) {
      var c = jr();
      Pr(u, n, l, c), Yv(u, r, l);
    }
  }
  function Yc(n, r, u) {
    var l = nr(n), c = { lane: l, action: u, hasEagerState: !1, eagerState: null, next: null };
    if (ml(n))
      bs(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null))
        try {
          var E = r.lastRenderedState, x = d(E, u);
          if (c.hasEagerState = !0, c.eagerState = x, Aa(x, E)) {
            var L = r.interleaved;
            L === null ? (c.next = c, _d(r)) : (c.next = L.next, L.next = c), r.interleaved = c;
            return;
          }
        } catch {
        } finally {
        }
      u = jv(n, r, c, l), u !== null && (c = jr(), Pr(u, n, l, c), Yv(u, r, l));
    }
  }
  function ml(n) {
    var r = n.alternate;
    return n === kn || r !== null && r === kn;
  }
  function bs(n, r) {
    wi = pt = !0;
    var u = n.pending;
    u === null ? r.next = r : (r.next = u.next, u.next = r), n.pending = r;
  }
  function Yv(n, r, u) {
    if (u & 4194240) {
      var l = r.lanes;
      l &= n.pendingLanes, u |= l, r.lanes = u, gi(n, u);
    }
  }
  var Wc = { readContext: Kn, useCallback: Dn, useContext: Dn, useEffect: Dn, useImperativeHandle: Dn, useInsertionEffect: Dn, useLayoutEffect: Dn, useMemo: Dn, useReducer: Dn, useRef: Dn, useState: Dn, useDebugValue: Dn, useDeferredValue: Dn, useTransition: Dn, useMutableSource: Dn, useSyncExternalStore: Dn, useId: Dn, unstable_isNewReconciler: !1 }, vy = { readContext: Kn, useCallback: function(n, r) {
    return Va().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Kn, useEffect: Hc, useImperativeHandle: function(n, r, u) {
    return u = u != null ? u.concat([n]) : null, Co(
      4194308,
      4,
      Nd.bind(null, r, n),
      u
    );
  }, useLayoutEffect: function(n, r) {
    return Co(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return Co(4, 2, n, r);
  }, useMemo: function(n, r) {
    var u = Va();
    return r = r === void 0 ? null : r, n = n(), u.memoizedState = [n, r], n;
  }, useReducer: function(n, r, u) {
    var l = Va();
    return r = u !== void 0 ? u(r) : r, l.memoizedState = l.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, l.queue = n, n = n.dispatch = Ic.bind(null, kn, n), [l.memoizedState, n];
  }, useRef: function(n) {
    var r = Va();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Pc, useDebugValue: $c, useDeferredValue: function(n) {
    return Va().memoizedState = n;
  }, useTransition: function() {
    var n = Pc(!1), r = n[0];
    return n = py.bind(null, n[1]), Va().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, u) {
    var l = kn, c = Va();
    if (On) {
      if (u === void 0)
        throw Error(p(407));
      u = u();
    } else {
      if (u = r(), Hn === null)
        throw Error(p(349));
      ho & 30 || Lc(l, r, u);
    }
    c.memoizedState = u;
    var d = { value: u, getSnapshot: r };
    return c.queue = d, Hc(Uc.bind(
      null,
      l,
      d,
      n
    ), [n]), l.flags |= 2048, Eo(9, Ac.bind(null, l, d, u, r), void 0, null), u;
  }, useId: function() {
    var n = Va(), r = Hn.identifierPrefix;
    if (On) {
      var u = Ii, l = Cr;
      u = (l & ~(1 << 32 - Vr(l) - 1)).toString(32) + u, r = ":" + r + "R" + u, u = Ra++, 0 < u && (r += "H" + u.toString(32)), r += ":";
    } else
      u = mo++, r = ":" + r + "r" + u.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, hy = {
    readContext: Kn,
    useCallback: hl,
    useContext: Kn,
    useEffect: Cs,
    useImperativeHandle: vl,
    useInsertionEffect: Vc,
    useLayoutEffect: Bc,
    useMemo: Uu,
    useReducer: Ss,
    useRef: Fc,
    useState: function() {
      return Ss(So);
    },
    useDebugValue: $c,
    useDeferredValue: function(n) {
      var r = ca();
      return fa(r, ne.memoizedState, n);
    },
    useTransition: function() {
      var n = Ss(So)[0], r = ca().memoizedState;
      return [n, r];
    },
    useMutableSource: Mc,
    useSyncExternalStore: Nc,
    useId: bn,
    unstable_isNewReconciler: !1
  }, Ld = { readContext: Kn, useCallback: hl, useContext: Kn, useEffect: Cs, useImperativeHandle: vl, useInsertionEffect: Vc, useLayoutEffect: Bc, useMemo: Uu, useReducer: Es, useRef: Fc, useState: function() {
    return Es(So);
  }, useDebugValue: $c, useDeferredValue: function(n) {
    var r = ca();
    return ne === null ? r.memoizedState = n : fa(r, ne.memoizedState, n);
  }, useTransition: function() {
    var n = Es(So)[0], r = ca().memoizedState;
    return [n, r];
  }, useMutableSource: Mc, useSyncExternalStore: Nc, useId: bn, unstable_isNewReconciler: !1 };
  function yl(n, r) {
    try {
      var u = "", l = r;
      do
        u += le(l), l = l.return;
      while (l);
      var c = u;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function ws(n, r, u) {
    return { value: n, source: null, stack: u ?? null, digest: r ?? null };
  }
  function Qc(n, r) {
    try {
      console.error(r.value);
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  var my = typeof WeakMap == "function" ? WeakMap : Map;
  function Wv(n, r, u) {
    u = Wi(-1, u), u.tag = 3, u.payload = { element: null };
    var l = r.value;
    return u.callback = function() {
      ef || (ef = !0, _o = l), Qc(n, r);
    }, u;
  }
  function Ts(n, r, u) {
    u = Wi(-1, u), u.tag = 3;
    var l = n.type.getDerivedStateFromError;
    if (typeof l == "function") {
      var c = r.value;
      u.payload = function() {
        return l(c);
      }, u.callback = function() {
        Qc(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (u.callback = function() {
      Qc(n, r), typeof l != "function" && (_i === null ? _i = /* @__PURE__ */ new Set([this]) : _i.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, { componentStack: E !== null ? E : "" });
    }), u;
  }
  function Qv(n, r, u) {
    var l = n.pingCache;
    if (l === null) {
      l = n.pingCache = new my();
      var c = /* @__PURE__ */ new Set();
      l.set(r, c);
    } else
      c = l.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), l.set(r, c));
    c.has(u) || (c.add(u), n = wy.bind(null, n, r, u), r.then(n, n));
  }
  function Ad(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r)
        return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Ud(n, r, u, l, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, u.flags |= 131072, u.flags &= -52805, u.tag === 1 && (u.alternate === null ? u.tag = 17 : (r = Wi(-1, 1), r.tag = 2, Mu(u, r, 1))), u.lanes |= 1), n);
  }
  var yy = Ze.ReactCurrentOwner, tr = !1;
  function ur(n, r, u, l) {
    r.child = n === null ? Iv(r, null, u, l) : dl(r, n.child, u, l);
  }
  function zu(n, r, u, l, c) {
    u = u.render;
    var d = r.ref;
    return ke(r, c), l = Au(n, r, u, l, d, c), u = go(), n !== null && !tr ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, wr(n, r, c)) : (On && u && Sc(r), r.flags |= 1, ur(n, r, l, c), r.child);
  }
  function Gc(n, r, u, l, c) {
    if (n === null) {
      var d = u.type;
      return typeof d == "function" && !ep(d) && d.defaultProps === void 0 && u.compare === null && u.defaultProps === void 0 ? (r.tag = 15, r.type = d, da(n, r, d, l, c)) : (n = of(u.type, null, l, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var E = d.memoizedProps;
      if (u = u.compare, u = u !== null ? u : is, u(E, l) && n.ref === r.ref)
        return wr(n, r, c);
    }
    return r.flags |= 1, n = Hu(d, l), n.ref = r.ref, n.return = r, r.child = n;
  }
  function da(n, r, u, l, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (is(d, l) && n.ref === r.ref)
        if (tr = !1, r.pendingProps = l = d, (n.lanes & c) !== 0)
          n.flags & 131072 && (tr = !0);
        else
          return r.lanes = n.lanes, wr(n, r, c);
    }
    return gl(n, r, u, l, c);
  }
  function bo(n, r, u) {
    var l = r.pendingProps, c = l.children, d = n !== null ? n.memoizedState : null;
    if (l.mode === "hidden")
      if (!(r.mode & 1))
        r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, fn(Tl, _a), _a |= u;
      else {
        if (!(u & 1073741824))
          return n = d !== null ? d.baseLanes | u : u, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, fn(Tl, _a), _a |= n, null;
        r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, l = d !== null ? d.baseLanes : u, fn(Tl, _a), _a |= l;
      }
    else
      d !== null ? (l = d.baseLanes | u, r.memoizedState = null) : l = u, fn(Tl, _a), _a |= l;
    return ur(n, r, c, u), r.child;
  }
  function Ut(n, r) {
    var u = r.ref;
    (n === null && u !== null || n !== null && n.ref !== u) && (r.flags |= 512, r.flags |= 2097152);
  }
  function gl(n, r, u, l, c) {
    var d = An(u) ? ia : St.current;
    return d = za(r, d), ke(r, c), u = Au(n, r, u, l, d, c), l = go(), n !== null && !tr ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, wr(n, r, c)) : (On && l && Sc(r), r.flags |= 1, ur(n, r, u, c), r.child);
  }
  function zd(n, r, u, l, c) {
    if (An(u)) {
      var d = !0;
      gc(r);
    } else
      d = !1;
    if (ke(r, c), r.stateNode === null)
      Ar(n, r), Hv(r, u, l), xc(r, u, l, c), l = !0;
    else if (n === null) {
      var E = r.stateNode, x = r.memoizedProps;
      E.props = x;
      var L = E.context, q = u.contextType;
      typeof q == "object" && q !== null ? q = Kn(q) : (q = An(u) ? ia : St.current, q = za(r, q));
      var de = u.getDerivedStateFromProps, ve = typeof de == "function" || typeof E.getSnapshotBeforeUpdate == "function";
      ve || typeof E.UNSAFE_componentWillReceiveProps != "function" && typeof E.componentWillReceiveProps != "function" || (x !== l || L !== q) && Vv(r, E, l, q), Du = !1;
      var fe = r.memoizedState;
      E.state = fe, Nu(r, l, E, c), L = r.memoizedState, x !== l || fe !== L || $n.current || Du ? (typeof de == "function" && (kd(r, u, de, l), L = r.memoizedState), (x = Du || Fv(r, u, x, l, fe, L, q)) ? (ve || typeof E.UNSAFE_componentWillMount != "function" && typeof E.componentWillMount != "function" || (typeof E.componentWillMount == "function" && E.componentWillMount(), typeof E.UNSAFE_componentWillMount == "function" && E.UNSAFE_componentWillMount()), typeof E.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof E.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = l, r.memoizedState = L), E.props = l, E.state = L, E.context = q, l = x) : (typeof E.componentDidMount == "function" && (r.flags |= 4194308), l = !1);
    } else {
      E = r.stateNode, ir(n, r), x = r.memoizedProps, q = r.type === r.elementType ? x : Ta(r.type, x), E.props = q, ve = r.pendingProps, fe = E.context, L = u.contextType, typeof L == "object" && L !== null ? L = Kn(L) : (L = An(u) ? ia : St.current, L = za(r, L));
      var je = u.getDerivedStateFromProps;
      (de = typeof je == "function" || typeof E.getSnapshotBeforeUpdate == "function") || typeof E.UNSAFE_componentWillReceiveProps != "function" && typeof E.componentWillReceiveProps != "function" || (x !== ve || fe !== L) && Vv(r, E, l, L), Du = !1, fe = r.memoizedState, E.state = fe, Nu(r, l, E, c);
      var We = r.memoizedState;
      x !== ve || fe !== We || $n.current || Du ? (typeof je == "function" && (kd(r, u, je, l), We = r.memoizedState), (q = Du || Fv(r, u, q, l, fe, We, L) || !1) ? (de || typeof E.UNSAFE_componentWillUpdate != "function" && typeof E.componentWillUpdate != "function" || (typeof E.componentWillUpdate == "function" && E.componentWillUpdate(l, We, L), typeof E.UNSAFE_componentWillUpdate == "function" && E.UNSAFE_componentWillUpdate(l, We, L)), typeof E.componentDidUpdate == "function" && (r.flags |= 4), typeof E.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof E.componentDidUpdate != "function" || x === n.memoizedProps && fe === n.memoizedState || (r.flags |= 4), typeof E.getSnapshotBeforeUpdate != "function" || x === n.memoizedProps && fe === n.memoizedState || (r.flags |= 1024), r.memoizedProps = l, r.memoizedState = We), E.props = l, E.state = We, E.context = L, l = q) : (typeof E.componentDidUpdate != "function" || x === n.memoizedProps && fe === n.memoizedState || (r.flags |= 4), typeof E.getSnapshotBeforeUpdate != "function" || x === n.memoizedProps && fe === n.memoizedState || (r.flags |= 1024), l = !1);
    }
    return Gv(n, r, u, l, d, c);
  }
  function Gv(n, r, u, l, c, d) {
    Ut(n, r);
    var E = (r.flags & 128) !== 0;
    if (!l && !E)
      return c && Lv(r, u, !1), wr(n, r, d);
    l = r.stateNode, yy.current = r;
    var x = E && typeof u.getDerivedStateFromError != "function" ? null : l.render();
    return r.flags |= 1, n !== null && E ? (r.child = dl(r, n.child, null, d), r.child = dl(r, null, x, d)) : ur(n, r, x, d), r.memoizedState = l.state, c && Lv(r, u, !0), r.child;
  }
  function qv(n) {
    var r = n.stateNode;
    r.pendingContext ? _u(n, r.pendingContext, r.pendingContext !== r.context) : r.context && _u(n, r.context, !1), Dd(n, r.containerInfo);
  }
  function qc(n, r, u, l, c) {
    return Pn(), wd(c), r.flags |= 256, ur(n, r, u, l), r.child;
  }
  var wo = { dehydrated: null, treeContext: null, retryLane: 0 };
  function jd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Pd(n, r, u) {
    var l = r.pendingProps, c = ft.current, d = !1, E = (r.flags & 128) !== 0, x;
    if ((x = E) || (x = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), x ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), fn(ft, c & 1), n === null)
      return Cc(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (E = l.children, n = l.fallback, d ? (l = r.mode, d = r.child, E = { mode: "hidden", children: E }, !(l & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = E) : d = As(E, l, 0, null), n = Mo(n, l, u, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = jd(u), r.memoizedState = wo, n) : Fd(r, E));
    if (c = n.memoizedState, c !== null && (x = c.dehydrated, x !== null))
      return gy(n, r, E, l, x, c, u);
    if (d) {
      d = l.fallback, E = r.mode, c = n.child, x = c.sibling;
      var L = { mode: "hidden", children: l.children };
      return !(E & 1) && r.child !== c ? (l = r.child, l.childLanes = 0, l.pendingProps = L, r.deletions = null) : (l = Hu(c, L), l.subtreeFlags = c.subtreeFlags & 14680064), x !== null ? d = Hu(x, d) : (d = Mo(d, E, u, null), d.flags |= 2), d.return = r, l.return = r, l.sibling = d, r.child = l, l = d, d = r.child, E = n.child.memoizedState, E = E === null ? jd(u) : { baseLanes: E.baseLanes | u, cachePool: null, transitions: E.transitions }, d.memoizedState = E, d.childLanes = n.childLanes & ~u, r.memoizedState = wo, l;
    }
    return d = n.child, n = d.sibling, l = Hu(d, { mode: "visible", children: l.children }), !(r.mode & 1) && (l.lanes = u), l.return = r, l.sibling = null, n !== null && (u = r.deletions, u === null ? (r.deletions = [n], r.flags |= 16) : u.push(n)), r.child = l, r.memoizedState = null, l;
  }
  function Fd(n, r) {
    return r = As({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Sl(n, r, u, l) {
    return l !== null && wd(l), dl(r, n.child, null, u), n = Fd(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function gy(n, r, u, l, c, d, E) {
    if (u)
      return r.flags & 256 ? (r.flags &= -257, l = ws(Error(p(422))), Sl(n, r, E, l)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = l.fallback, c = r.mode, l = As({ mode: "visible", children: l.children }, c, 0, null), d = Mo(d, c, E, null), d.flags |= 2, l.return = r, d.return = r, l.sibling = d, r.child = l, r.mode & 1 && dl(r, n.child, null, E), r.child.memoizedState = jd(E), r.memoizedState = wo, d);
    if (!(r.mode & 1))
      return Sl(n, r, E, null);
    if (c.data === "$!") {
      if (l = c.nextSibling && c.nextSibling.dataset, l)
        var x = l.dgst;
      return l = x, d = Error(p(419)), l = ws(d, l, void 0), Sl(n, r, E, l);
    }
    if (x = (E & n.childLanes) !== 0, tr || x) {
      if (l = Hn, l !== null) {
        switch (E & -E) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (l.suspendedLanes | E) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, Yi(n, c), Pr(l, n, c, -1));
      }
      return Xd(), l = ws(Error(p(421))), Sl(n, r, E, l);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Ty.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, sa = ui(c.nextSibling), wa = r, On = !0, Fa = null, n !== null && (la[Lr++] = Cr, la[Lr++] = Ii, la[Lr++] = Pa, Cr = n.id, Ii = n.overflow, Pa = r), r = Fd(r, l.children), r.flags |= 4096, r);
  }
  function Hd(n, r, u) {
    n.lanes |= r;
    var l = n.alternate;
    l !== null && (l.lanes |= r), vr(n.return, r, u);
  }
  function Kc(n, r, u, l, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: l, tail: u, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = l, d.tail = u, d.tailMode = c);
  }
  function Vd(n, r, u) {
    var l = r.pendingProps, c = l.revealOrder, d = l.tail;
    if (ur(n, r, l.children, u), l = ft.current, l & 2)
      l = l & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128)
        e:
          for (n = r.child; n !== null; ) {
            if (n.tag === 13)
              n.memoizedState !== null && Hd(n, u, r);
            else if (n.tag === 19)
              Hd(n, u, r);
            else if (n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === r)
              break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === r)
                break e;
              n = n.return;
            }
            n.sibling.return = n.return, n = n.sibling;
          }
      l &= 1;
    }
    if (fn(ft, l), !(r.mode & 1))
      r.memoizedState = null;
    else
      switch (c) {
        case "forwards":
          for (u = r.child, c = null; u !== null; )
            n = u.alternate, n !== null && Fn(n) === null && (c = u), u = u.sibling;
          u = c, u === null ? (c = r.child, r.child = null) : (c = u.sibling, u.sibling = null), Kc(r, !1, c, u, d);
          break;
        case "backwards":
          for (u = null, c = r.child, r.child = null; c !== null; ) {
            if (n = c.alternate, n !== null && Fn(n) === null) {
              r.child = c;
              break;
            }
            n = c.sibling, c.sibling = u, u = c, c = n;
          }
          Kc(r, !0, u, null, d);
          break;
        case "together":
          Kc(r, !1, null, null, void 0);
          break;
        default:
          r.memoizedState = null;
      }
    return r.child;
  }
  function Ar(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function wr(n, r, u) {
    if (n !== null && (r.dependencies = n.dependencies), Ki |= r.lanes, !(u & r.childLanes))
      return null;
    if (n !== null && r.child !== n.child)
      throw Error(p(153));
    if (r.child !== null) {
      for (n = r.child, u = Hu(n, n.pendingProps), r.child = u, u.return = r; n.sibling !== null; )
        n = n.sibling, u = u.sibling = Hu(n, n.pendingProps), u.return = r;
      u.sibling = null;
    }
    return r.child;
  }
  function Gi(n, r, u) {
    switch (r.tag) {
      case 3:
        qv(r), Pn();
        break;
      case 5:
        st(r);
        break;
      case 1:
        An(r.type) && gc(r);
        break;
      case 4:
        Dd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var l = r.type._context, c = r.memoizedProps.value;
        fn(bi, l._currentValue), l._currentValue = c;
        break;
      case 13:
        if (l = r.memoizedState, l !== null)
          return l.dehydrated !== null ? (fn(ft, ft.current & 1), r.flags |= 128, null) : u & r.child.childLanes ? Pd(n, r, u) : (fn(ft, ft.current & 1), n = wr(n, r, u), n !== null ? n.sibling : null);
        fn(ft, ft.current & 1);
        break;
      case 19:
        if (l = (u & r.childLanes) !== 0, n.flags & 128) {
          if (l)
            return Vd(n, r, u);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), fn(ft, ft.current), l)
          break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, bo(n, r, u);
    }
    return wr(n, r, u);
  }
  var Rs, To, Ba, or;
  Rs = function(n, r) {
    for (var u = r.child; u !== null; ) {
      if (u.tag === 5 || u.tag === 6)
        n.appendChild(u.stateNode);
      else if (u.tag !== 4 && u.child !== null) {
        u.child.return = u, u = u.child;
        continue;
      }
      if (u === r)
        break;
      for (; u.sibling === null; ) {
        if (u.return === null || u.return === r)
          return;
        u = u.return;
      }
      u.sibling.return = u.return, u = u.sibling;
    }
  }, To = function() {
  }, Ba = function(n, r, u, l) {
    var c = n.memoizedProps;
    if (c !== l) {
      n = r.stateNode, vo(oi.current);
      var d = null;
      switch (u) {
        case "input":
          c = bt(n, c), l = bt(n, l), d = [];
          break;
        case "select":
          c = M({}, c, { value: void 0 }), l = M({}, l, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = gn(n, c), l = gn(n, l), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof l.onClick == "function" && (n.onclick = yc);
      }
      xt(u, l);
      var E;
      u = null;
      for (q in c)
        if (!l.hasOwnProperty(q) && c.hasOwnProperty(q) && c[q] != null)
          if (q === "style") {
            var x = c[q];
            for (E in x)
              x.hasOwnProperty(E) && (u || (u = {}), u[E] = "");
          } else
            q !== "dangerouslySetInnerHTML" && q !== "children" && q !== "suppressContentEditableWarning" && q !== "suppressHydrationWarning" && q !== "autoFocus" && (w.hasOwnProperty(q) ? d || (d = []) : (d = d || []).push(q, null));
      for (q in l) {
        var L = l[q];
        if (x = c != null ? c[q] : void 0, l.hasOwnProperty(q) && L !== x && (L != null || x != null))
          if (q === "style")
            if (x) {
              for (E in x)
                !x.hasOwnProperty(E) || L && L.hasOwnProperty(E) || (u || (u = {}), u[E] = "");
              for (E in L)
                L.hasOwnProperty(E) && x[E] !== L[E] && (u || (u = {}), u[E] = L[E]);
            } else
              u || (d || (d = []), d.push(
                q,
                u
              )), u = L;
          else
            q === "dangerouslySetInnerHTML" ? (L = L ? L.__html : void 0, x = x ? x.__html : void 0, L != null && x !== L && (d = d || []).push(q, L)) : q === "children" ? typeof L != "string" && typeof L != "number" || (d = d || []).push(q, "" + L) : q !== "suppressContentEditableWarning" && q !== "suppressHydrationWarning" && (w.hasOwnProperty(q) ? (L != null && q === "onScroll" && Cn("scroll", n), d || x === L || (d = [])) : (d = d || []).push(q, L));
      }
      u && (d = d || []).push("style", u);
      var q = d;
      (r.updateQueue = q) && (r.flags |= 4);
    }
  }, or = function(n, r, u, l) {
    u !== l && (r.flags |= 4);
  };
  function _s(n, r) {
    if (!On)
      switch (n.tailMode) {
        case "hidden":
          r = n.tail;
          for (var u = null; r !== null; )
            r.alternate !== null && (u = r), r = r.sibling;
          u === null ? n.tail = null : u.sibling = null;
          break;
        case "collapsed":
          u = n.tail;
          for (var l = null; u !== null; )
            u.alternate !== null && (l = u), u = u.sibling;
          l === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : l.sibling = null;
      }
  }
  function Ur(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, u = 0, l = 0;
    if (r)
      for (var c = n.child; c !== null; )
        u |= c.lanes | c.childLanes, l |= c.subtreeFlags & 14680064, l |= c.flags & 14680064, c.return = n, c = c.sibling;
    else
      for (c = n.child; c !== null; )
        u |= c.lanes | c.childLanes, l |= c.subtreeFlags, l |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= l, n.childLanes = u, r;
  }
  function Sy(n, r, u) {
    var l = r.pendingProps;
    switch (Cd(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ur(r), null;
      case 1:
        return An(r.type) && ja(), Ur(r), null;
      case 3:
        return l = r.stateNode, Lu(), ln($n), ln(St), kc(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (n === null || n.child === null) && (bc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Fa !== null && (Ls(Fa), Fa = null))), To(n, r), Ur(r), null;
      case 5:
        Ft(r);
        var c = vo(pl.current);
        if (u = r.type, n !== null && r.stateNode != null)
          Ba(n, r, u, l, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!l) {
            if (r.stateNode === null)
              throw Error(p(166));
            return Ur(r), null;
          }
          if (n = vo(oi.current), bc(r)) {
            l = r.stateNode, u = r.type;
            var d = r.memoizedProps;
            switch (l[Ei] = r, l[co] = d, n = (r.mode & 1) !== 0, u) {
              case "dialog":
                Cn("cancel", l), Cn("close", l);
                break;
              case "iframe":
              case "object":
              case "embed":
                Cn("load", l);
                break;
              case "video":
              case "audio":
                for (c = 0; c < ss.length; c++)
                  Cn(ss[c], l);
                break;
              case "source":
                Cn("error", l);
                break;
              case "img":
              case "image":
              case "link":
                Cn(
                  "error",
                  l
                ), Cn("load", l);
                break;
              case "details":
                Cn("toggle", l);
                break;
              case "input":
                un(l, d), Cn("invalid", l);
                break;
              case "select":
                l._wrapperState = { wasMultiple: !!d.multiple }, Cn("invalid", l);
                break;
              case "textarea":
                Wn(l, d), Cn("invalid", l);
            }
            xt(u, d), c = null;
            for (var E in d)
              if (d.hasOwnProperty(E)) {
                var x = d[E];
                E === "children" ? typeof x == "string" ? l.textContent !== x && (d.suppressHydrationWarning !== !0 && mc(l.textContent, x, n), c = ["children", x]) : typeof x == "number" && l.textContent !== "" + x && (d.suppressHydrationWarning !== !0 && mc(
                  l.textContent,
                  x,
                  n
                ), c = ["children", "" + x]) : w.hasOwnProperty(E) && x != null && E === "onScroll" && Cn("scroll", l);
              }
            switch (u) {
              case "input":
                Kt(l), Nn(l, d, !0);
                break;
              case "textarea":
                Kt(l), Qn(l);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (l.onclick = yc);
            }
            l = c, r.updateQueue = l, l !== null && (r.flags |= 4);
          } else {
            E = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = wn(u)), n === "http://www.w3.org/1999/xhtml" ? u === "script" ? (n = E.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof l.is == "string" ? n = E.createElement(u, { is: l.is }) : (n = E.createElement(u), u === "select" && (E = n, l.multiple ? E.multiple = !0 : l.size && (E.size = l.size))) : n = E.createElementNS(n, u), n[Ei] = r, n[co] = l, Rs(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (E = Nt(u, l), u) {
                case "dialog":
                  Cn("cancel", n), Cn("close", n), c = l;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Cn("load", n), c = l;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < ss.length; c++)
                    Cn(ss[c], n);
                  c = l;
                  break;
                case "source":
                  Cn("error", n), c = l;
                  break;
                case "img":
                case "image":
                case "link":
                  Cn(
                    "error",
                    n
                  ), Cn("load", n), c = l;
                  break;
                case "details":
                  Cn("toggle", n), c = l;
                  break;
                case "input":
                  un(n, l), c = bt(n, l), Cn("invalid", n);
                  break;
                case "option":
                  c = l;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!l.multiple }, c = M({}, l, { value: void 0 }), Cn("invalid", n);
                  break;
                case "textarea":
                  Wn(n, l), c = gn(n, l), Cn("invalid", n);
                  break;
                default:
                  c = l;
              }
              xt(u, c), x = c;
              for (d in x)
                if (x.hasOwnProperty(d)) {
                  var L = x[d];
                  d === "style" ? ae(n, L) : d === "dangerouslySetInnerHTML" ? (L = L ? L.__html : void 0, L != null && Nr(n, L)) : d === "children" ? typeof L == "string" ? (u !== "textarea" || L !== "") && qn(n, L) : typeof L == "number" && qn(n, "" + L) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (w.hasOwnProperty(d) ? L != null && d === "onScroll" && Cn("scroll", n) : L != null && Ue(n, d, L, E));
                }
              switch (u) {
                case "input":
                  Kt(n), Nn(n, l, !1);
                  break;
                case "textarea":
                  Kt(n), Qn(n);
                  break;
                case "option":
                  l.value != null && n.setAttribute("value", "" + Re(l.value));
                  break;
                case "select":
                  n.multiple = !!l.multiple, d = l.value, d != null ? Ln(n, !!l.multiple, d, !1) : l.defaultValue != null && Ln(
                    n,
                    !!l.multiple,
                    l.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = yc);
              }
              switch (u) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  l = !!l.autoFocus;
                  break e;
                case "img":
                  l = !0;
                  break e;
                default:
                  l = !1;
              }
            }
            l && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return Ur(r), null;
      case 6:
        if (n && r.stateNode != null)
          or(n, r, n.memoizedProps, l);
        else {
          if (typeof l != "string" && r.stateNode === null)
            throw Error(p(166));
          if (u = vo(pl.current), vo(oi.current), bc(r)) {
            if (l = r.stateNode, u = r.memoizedProps, l[Ei] = r, (d = l.nodeValue !== u) && (n = wa, n !== null))
              switch (n.tag) {
                case 3:
                  mc(l.nodeValue, u, (n.mode & 1) !== 0);
                  break;
                case 5:
                  n.memoizedProps.suppressHydrationWarning !== !0 && mc(l.nodeValue, u, (n.mode & 1) !== 0);
              }
            d && (r.flags |= 4);
          } else
            l = (u.nodeType === 9 ? u : u.ownerDocument).createTextNode(l), l[Ei] = r, r.stateNode = l;
        }
        return Ur(r), null;
      case 13:
        if (ln(ft), l = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (On && sa !== null && r.mode & 1 && !(r.flags & 128))
            zv(), Pn(), r.flags |= 98560, d = !1;
          else if (d = bc(r), l !== null && l.dehydrated !== null) {
            if (n === null) {
              if (!d)
                throw Error(p(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d)
                throw Error(p(317));
              d[Ei] = r;
            } else
              Pn(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            Ur(r), d = !1;
          } else
            Fa !== null && (Ls(Fa), Fa = null), d = !0;
          if (!d)
            return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = u, r) : (l = l !== null, l !== (n !== null && n.memoizedState !== null) && l && (r.child.flags |= 8192, r.mode & 1 && (n === null || ft.current & 1 ? sr === 0 && (sr = 3) : Xd())), r.updateQueue !== null && (r.flags |= 4), Ur(r), null);
      case 4:
        return Lu(), To(n, r), n === null && ll(r.stateNode.containerInfo), Ur(r), null;
      case 10:
        return ku(r.type._context), Ur(r), null;
      case 17:
        return An(r.type) && ja(), Ur(r), null;
      case 19:
        if (ln(ft), d = r.memoizedState, d === null)
          return Ur(r), null;
        if (l = (r.flags & 128) !== 0, E = d.rendering, E === null)
          if (l)
            _s(d, !1);
          else {
            if (sr !== 0 || n !== null && n.flags & 128)
              for (n = r.child; n !== null; ) {
                if (E = Fn(n), E !== null) {
                  for (r.flags |= 128, _s(d, !1), l = E.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), r.subtreeFlags = 0, l = u, u = r.child; u !== null; )
                    d = u, n = l, d.flags &= 14680066, E = d.alternate, E === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = E.childLanes, d.lanes = E.lanes, d.child = E.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = E.memoizedProps, d.memoizedState = E.memoizedState, d.updateQueue = E.updateQueue, d.type = E.type, n = E.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), u = u.sibling;
                  return fn(ft, ft.current & 1 | 2), r.child;
                }
                n = n.sibling;
              }
            d.tail !== null && Xt() > _l && (r.flags |= 128, l = !0, _s(d, !1), r.lanes = 4194304);
          }
        else {
          if (!l)
            if (n = Fn(E), n !== null) {
              if (r.flags |= 128, l = !0, u = n.updateQueue, u !== null && (r.updateQueue = u, r.flags |= 4), _s(d, !0), d.tail === null && d.tailMode === "hidden" && !E.alternate && !On)
                return Ur(r), null;
            } else
              2 * Xt() - d.renderingStartTime > _l && u !== 1073741824 && (r.flags |= 128, l = !0, _s(d, !1), r.lanes = 4194304);
          d.isBackwards ? (E.sibling = r.child, r.child = E) : (u = d.last, u !== null ? u.sibling = E : r.child = E, d.last = E);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Xt(), r.sibling = null, u = ft.current, fn(ft, l ? u & 1 | 2 : u & 1), r) : (Ur(r), null);
      case 22:
      case 23:
        return Kd(), l = r.memoizedState !== null, n !== null && n.memoizedState !== null !== l && (r.flags |= 8192), l && r.mode & 1 ? _a & 1073741824 && (Ur(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : Ur(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p(156, r.tag));
  }
  function Bd(n, r) {
    switch (Cd(r), r.tag) {
      case 1:
        return An(r.type) && ja(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return Lu(), ln($n), ln(St), kc(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Ft(r), null;
      case 13:
        if (ln(ft), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null)
            throw Error(p(340));
          Pn();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return ln(ft), null;
      case 4:
        return Lu(), null;
      case 10:
        return ku(r.type._context), null;
      case 22:
      case 23:
        return Kd(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var xs = !1, lr = !1, Kv = typeof WeakSet == "function" ? WeakSet : Set, Ye = null;
  function El(n, r) {
    var u = n.ref;
    if (u !== null)
      if (typeof u == "function")
        try {
          u(null);
        } catch (l) {
          Yn(n, r, l);
        }
      else
        u.current = null;
  }
  function Os(n, r, u) {
    try {
      u();
    } catch (l) {
      Yn(n, r, l);
    }
  }
  var Xv = !1;
  function Zv(n, r) {
    if (pd = La, n = fc(), Hi(n)) {
      if ("selectionStart" in n)
        var u = { start: n.selectionStart, end: n.selectionEnd };
      else
        e: {
          u = (u = n.ownerDocument) && u.defaultView || window;
          var l = u.getSelection && u.getSelection();
          if (l && l.rangeCount !== 0) {
            u = l.anchorNode;
            var c = l.anchorOffset, d = l.focusNode;
            l = l.focusOffset;
            try {
              u.nodeType, d.nodeType;
            } catch {
              u = null;
              break e;
            }
            var E = 0, x = -1, L = -1, q = 0, de = 0, ve = n, fe = null;
            t:
              for (; ; ) {
                for (var je; ve !== u || c !== 0 && ve.nodeType !== 3 || (x = E + c), ve !== d || l !== 0 && ve.nodeType !== 3 || (L = E + l), ve.nodeType === 3 && (E += ve.nodeValue.length), (je = ve.firstChild) !== null; )
                  fe = ve, ve = je;
                for (; ; ) {
                  if (ve === n)
                    break t;
                  if (fe === u && ++q === c && (x = E), fe === d && ++de === l && (L = E), (je = ve.nextSibling) !== null)
                    break;
                  ve = fe, fe = ve.parentNode;
                }
                ve = je;
              }
            u = x === -1 || L === -1 ? null : { start: x, end: L };
          } else
            u = null;
        }
      u = u || { start: 0, end: 0 };
    } else
      u = null;
    for (lo = { focusedElem: n, selectionRange: u }, La = !1, Ye = r; Ye !== null; )
      if (r = Ye, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null)
        n.return = r, Ye = n;
      else
        for (; Ye !== null; ) {
          r = Ye;
          try {
            var We = r.alternate;
            if (r.flags & 1024)
              switch (r.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (We !== null) {
                    var qe = We.memoizedProps, Xn = We.memoizedState, F = r.stateNode, j = F.getSnapshotBeforeUpdate(r.elementType === r.type ? qe : Ta(r.type, qe), Xn);
                    F.__reactInternalSnapshotBeforeUpdate = j;
                  }
                  break;
                case 3:
                  var I = r.stateNode.containerInfo;
                  I.nodeType === 1 ? I.textContent = "" : I.nodeType === 9 && I.documentElement && I.removeChild(I.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(p(163));
              }
          } catch (Ee) {
            Yn(r, r.return, Ee);
          }
          if (n = r.sibling, n !== null) {
            n.return = r.return, Ye = n;
            break;
          }
          Ye = r.return;
        }
    return We = Xv, Xv = !1, We;
  }
  function ks(n, r, u) {
    var l = r.updateQueue;
    if (l = l !== null ? l.lastEffect : null, l !== null) {
      var c = l = l.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && Os(r, u, d);
        }
        c = c.next;
      } while (c !== l);
    }
  }
  function Ds(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var u = r = r.next;
      do {
        if ((u.tag & n) === n) {
          var l = u.create;
          u.destroy = l();
        }
        u = u.next;
      } while (u !== r);
    }
  }
  function $d(n) {
    var r = n.ref;
    if (r !== null) {
      var u = n.stateNode;
      switch (n.tag) {
        case 5:
          n = u;
          break;
        default:
          n = u;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function Id(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, Id(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ei], delete r[co], delete r[md], delete r[dy], delete r[yd])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Jv(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Xc(n) {
    e:
      for (; ; ) {
        for (; n.sibling === null; ) {
          if (n.return === null || Jv(n.return))
            return null;
          n = n.return;
        }
        for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
          if (n.flags & 2 || n.child === null || n.tag === 4)
            continue e;
          n.child.return = n, n = n.child;
        }
        if (!(n.flags & 2))
          return n.stateNode;
      }
  }
  function Cl(n, r, u) {
    var l = n.tag;
    if (l === 5 || l === 6)
      n = n.stateNode, r ? u.nodeType === 8 ? u.parentNode.insertBefore(n, r) : u.insertBefore(n, r) : (u.nodeType === 8 ? (r = u.parentNode, r.insertBefore(n, u)) : (r = u, r.appendChild(n)), u = u._reactRootContainer, u != null || r.onclick !== null || (r.onclick = yc));
    else if (l !== 4 && (n = n.child, n !== null))
      for (Cl(n, r, u), n = n.sibling; n !== null; )
        Cl(n, r, u), n = n.sibling;
  }
  function Ti(n, r, u) {
    var l = n.tag;
    if (l === 5 || l === 6)
      n = n.stateNode, r ? u.insertBefore(n, r) : u.appendChild(n);
    else if (l !== 4 && (n = n.child, n !== null))
      for (Ti(n, r, u), n = n.sibling; n !== null; )
        Ti(n, r, u), n = n.sibling;
  }
  var Un = null, hr = !1;
  function $a(n, r, u) {
    for (u = u.child; u !== null; )
      bl(n, r, u), u = u.sibling;
  }
  function bl(n, r, u) {
    if (ta && typeof ta.onCommitFiberUnmount == "function")
      try {
        ta.onCommitFiberUnmount(fu, u);
      } catch {
      }
    switch (u.tag) {
      case 5:
        lr || El(u, r);
      case 6:
        var l = Un, c = hr;
        Un = null, $a(n, r, u), Un = l, hr = c, Un !== null && (hr ? (n = Un, u = u.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(u) : n.removeChild(u)) : Un.removeChild(u.stateNode));
        break;
      case 18:
        Un !== null && (hr ? (n = Un, u = u.stateNode, n.nodeType === 8 ? wu(n.parentNode, u) : n.nodeType === 1 && wu(n, u), gu(n)) : wu(Un, u.stateNode));
        break;
      case 4:
        l = Un, c = hr, Un = u.stateNode.containerInfo, hr = !0, $a(n, r, u), Un = l, hr = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!lr && (l = u.updateQueue, l !== null && (l = l.lastEffect, l !== null))) {
          c = l = l.next;
          do {
            var d = c, E = d.destroy;
            d = d.tag, E !== void 0 && (d & 2 || d & 4) && Os(u, r, E), c = c.next;
          } while (c !== l);
        }
        $a(n, r, u);
        break;
      case 1:
        if (!lr && (El(u, r), l = u.stateNode, typeof l.componentWillUnmount == "function"))
          try {
            l.props = u.memoizedProps, l.state = u.memoizedState, l.componentWillUnmount();
          } catch (x) {
            Yn(u, r, x);
          }
        $a(n, r, u);
        break;
      case 21:
        $a(n, r, u);
        break;
      case 22:
        u.mode & 1 ? (lr = (l = lr) || u.memoizedState !== null, $a(n, r, u), lr = l) : $a(n, r, u);
        break;
      default:
        $a(n, r, u);
    }
  }
  function qi(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var u = n.stateNode;
      u === null && (u = n.stateNode = new Kv()), r.forEach(function(l) {
        var c = Ry.bind(null, n, l);
        u.has(l) || (u.add(l), l.then(c, c));
      });
    }
  }
  function li(n, r) {
    var u = r.deletions;
    if (u !== null)
      for (var l = 0; l < u.length; l++) {
        var c = u[l];
        try {
          var d = n, E = r, x = E;
          e:
            for (; x !== null; ) {
              switch (x.tag) {
                case 5:
                  Un = x.stateNode, hr = !1;
                  break e;
                case 3:
                  Un = x.stateNode.containerInfo, hr = !0;
                  break e;
                case 4:
                  Un = x.stateNode.containerInfo, hr = !0;
                  break e;
              }
              x = x.return;
            }
          if (Un === null)
            throw Error(p(160));
          bl(d, E, c), Un = null, hr = !1;
          var L = c.alternate;
          L !== null && (L.return = null), c.return = null;
        } catch (q) {
          Yn(c, r, q);
        }
      }
    if (r.subtreeFlags & 12854)
      for (r = r.child; r !== null; )
        eh(r, n), r = r.sibling;
  }
  function eh(n, r) {
    var u = n.alternate, l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (li(r, n), Ri(n), l & 4) {
          try {
            ks(3, n, n.return), Ds(3, n);
          } catch (qe) {
            Yn(n, n.return, qe);
          }
          try {
            ks(5, n, n.return);
          } catch (qe) {
            Yn(n, n.return, qe);
          }
        }
        break;
      case 1:
        li(r, n), Ri(n), l & 512 && u !== null && El(u, u.return);
        break;
      case 5:
        if (li(r, n), Ri(n), l & 512 && u !== null && El(u, u.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            qn(c, "");
          } catch (qe) {
            Yn(n, n.return, qe);
          }
        }
        if (l & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, E = u !== null ? u.memoizedProps : d, x = n.type, L = n.updateQueue;
          if (n.updateQueue = null, L !== null)
            try {
              x === "input" && d.type === "radio" && d.name != null && tn(c, d), Nt(x, E);
              var q = Nt(x, d);
              for (E = 0; E < L.length; E += 2) {
                var de = L[E], ve = L[E + 1];
                de === "style" ? ae(c, ve) : de === "dangerouslySetInnerHTML" ? Nr(c, ve) : de === "children" ? qn(c, ve) : Ue(c, de, ve, q);
              }
              switch (x) {
                case "input":
                  wt(c, d);
                  break;
                case "textarea":
                  Sr(c, d);
                  break;
                case "select":
                  var fe = c._wrapperState.wasMultiple;
                  c._wrapperState.wasMultiple = !!d.multiple;
                  var je = d.value;
                  je != null ? Ln(c, !!d.multiple, je, !1) : fe !== !!d.multiple && (d.defaultValue != null ? Ln(
                    c,
                    !!d.multiple,
                    d.defaultValue,
                    !0
                  ) : Ln(c, !!d.multiple, d.multiple ? [] : "", !1));
              }
              c[co] = d;
            } catch (qe) {
              Yn(n, n.return, qe);
            }
        }
        break;
      case 6:
        if (li(r, n), Ri(n), l & 4) {
          if (n.stateNode === null)
            throw Error(p(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (qe) {
            Yn(n, n.return, qe);
          }
        }
        break;
      case 3:
        if (li(r, n), Ri(n), l & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            gu(r.containerInfo);
          } catch (qe) {
            Yn(n, n.return, qe);
          }
        break;
      case 4:
        li(r, n), Ri(n);
        break;
      case 13:
        li(r, n), Ri(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Qd = Xt())), l & 4 && qi(n);
        break;
      case 22:
        if (de = u !== null && u.memoizedState !== null, n.mode & 1 ? (lr = (q = lr) || de, li(r, n), lr = q) : li(r, n), Ri(n), l & 8192) {
          if (q = n.memoizedState !== null, (n.stateNode.isHidden = q) && !de && n.mode & 1)
            for (Ye = n, de = n.child; de !== null; ) {
              for (ve = Ye = de; Ye !== null; ) {
                switch (fe = Ye, je = fe.child, fe.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ks(4, fe, fe.return);
                    break;
                  case 1:
                    El(fe, fe.return);
                    var We = fe.stateNode;
                    if (typeof We.componentWillUnmount == "function") {
                      l = fe, u = fe.return;
                      try {
                        r = l, We.props = r.memoizedProps, We.state = r.memoizedState, We.componentWillUnmount();
                      } catch (qe) {
                        Yn(l, u, qe);
                      }
                    }
                    break;
                  case 5:
                    El(fe, fe.return);
                    break;
                  case 22:
                    if (fe.memoizedState !== null) {
                      Yd(ve);
                      continue;
                    }
                }
                je !== null ? (je.return = fe, Ye = je) : Yd(ve);
              }
              de = de.sibling;
            }
          e:
            for (de = null, ve = n; ; ) {
              if (ve.tag === 5) {
                if (de === null) {
                  de = ve;
                  try {
                    c = ve.stateNode, q ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (x = ve.stateNode, L = ve.memoizedProps.style, E = L != null && L.hasOwnProperty("display") ? L.display : null, x.style.display = B("display", E));
                  } catch (qe) {
                    Yn(n, n.return, qe);
                  }
                }
              } else if (ve.tag === 6) {
                if (de === null)
                  try {
                    ve.stateNode.nodeValue = q ? "" : ve.memoizedProps;
                  } catch (qe) {
                    Yn(n, n.return, qe);
                  }
              } else if ((ve.tag !== 22 && ve.tag !== 23 || ve.memoizedState === null || ve === n) && ve.child !== null) {
                ve.child.return = ve, ve = ve.child;
                continue;
              }
              if (ve === n)
                break e;
              for (; ve.sibling === null; ) {
                if (ve.return === null || ve.return === n)
                  break e;
                de === ve && (de = null), ve = ve.return;
              }
              de === ve && (de = null), ve.sibling.return = ve.return, ve = ve.sibling;
            }
        }
        break;
      case 19:
        li(r, n), Ri(n), l & 4 && qi(n);
        break;
      case 21:
        break;
      default:
        li(
          r,
          n
        ), Ri(n);
    }
  }
  function Ri(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var u = n.return; u !== null; ) {
            if (Jv(u)) {
              var l = u;
              break e;
            }
            u = u.return;
          }
          throw Error(p(160));
        }
        switch (l.tag) {
          case 5:
            var c = l.stateNode;
            l.flags & 32 && (qn(c, ""), l.flags &= -33);
            var d = Xc(n);
            Ti(n, d, c);
            break;
          case 3:
          case 4:
            var E = l.stateNode.containerInfo, x = Xc(n);
            Cl(n, x, E);
            break;
          default:
            throw Error(p(161));
        }
      } catch (L) {
        Yn(n, n.return, L);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function th(n, r, u) {
    Ye = n, wl(n);
  }
  function wl(n, r, u) {
    for (var l = (n.mode & 1) !== 0; Ye !== null; ) {
      var c = Ye, d = c.child;
      if (c.tag === 22 && l) {
        var E = c.memoizedState !== null || xs;
        if (!E) {
          var x = c.alternate, L = x !== null && x.memoizedState !== null || lr;
          x = xs;
          var q = lr;
          if (xs = E, (lr = L) && !q)
            for (Ye = c; Ye !== null; )
              E = Ye, L = E.child, E.tag === 22 && E.memoizedState !== null ? rh(c) : L !== null ? (L.return = E, Ye = L) : rh(c);
          for (; d !== null; )
            Ye = d, wl(d), d = d.sibling;
          Ye = c, xs = x, lr = q;
        }
        nh(n);
      } else
        c.subtreeFlags & 8772 && d !== null ? (d.return = c, Ye = d) : nh(n);
    }
  }
  function nh(n) {
    for (; Ye !== null; ) {
      var r = Ye;
      if (r.flags & 8772) {
        var u = r.alternate;
        try {
          if (r.flags & 8772)
            switch (r.tag) {
              case 0:
              case 11:
              case 15:
                lr || Ds(5, r);
                break;
              case 1:
                var l = r.stateNode;
                if (r.flags & 4 && !lr)
                  if (u === null)
                    l.componentDidMount();
                  else {
                    var c = r.elementType === r.type ? u.memoizedProps : Ta(r.type, u.memoizedProps);
                    l.componentDidUpdate(c, u.memoizedState, l.__reactInternalSnapshotBeforeUpdate);
                  }
                var d = r.updateQueue;
                d !== null && po(r, d, l);
                break;
              case 3:
                var E = r.updateQueue;
                if (E !== null) {
                  if (u = null, r.child !== null)
                    switch (r.child.tag) {
                      case 5:
                        u = r.child.stateNode;
                        break;
                      case 1:
                        u = r.child.stateNode;
                    }
                  po(r, E, u);
                }
                break;
              case 5:
                var x = r.stateNode;
                if (u === null && r.flags & 4) {
                  u = x;
                  var L = r.memoizedProps;
                  switch (r.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      L.autoFocus && u.focus();
                      break;
                    case "img":
                      L.src && (u.src = L.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (r.memoizedState === null) {
                  var q = r.alternate;
                  if (q !== null) {
                    var de = q.memoizedState;
                    if (de !== null) {
                      var ve = de.dehydrated;
                      ve !== null && gu(ve);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(p(163));
            }
          lr || r.flags & 512 && $d(r);
        } catch (fe) {
          Yn(r, r.return, fe);
        }
      }
      if (r === n) {
        Ye = null;
        break;
      }
      if (u = r.sibling, u !== null) {
        u.return = r.return, Ye = u;
        break;
      }
      Ye = r.return;
    }
  }
  function Yd(n) {
    for (; Ye !== null; ) {
      var r = Ye;
      if (r === n) {
        Ye = null;
        break;
      }
      var u = r.sibling;
      if (u !== null) {
        u.return = r.return, Ye = u;
        break;
      }
      Ye = r.return;
    }
  }
  function rh(n) {
    for (; Ye !== null; ) {
      var r = Ye;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var u = r.return;
            try {
              Ds(4, r);
            } catch (L) {
              Yn(r, u, L);
            }
            break;
          case 1:
            var l = r.stateNode;
            if (typeof l.componentDidMount == "function") {
              var c = r.return;
              try {
                l.componentDidMount();
              } catch (L) {
                Yn(r, c, L);
              }
            }
            var d = r.return;
            try {
              $d(r);
            } catch (L) {
              Yn(r, d, L);
            }
            break;
          case 5:
            var E = r.return;
            try {
              $d(r);
            } catch (L) {
              Yn(r, E, L);
            }
        }
      } catch (L) {
        Yn(r, r.return, L);
      }
      if (r === n) {
        Ye = null;
        break;
      }
      var x = r.sibling;
      if (x !== null) {
        x.return = r.return, Ye = x;
        break;
      }
      Ye = r.return;
    }
  }
  var Zc = Math.ceil, Ms = Ze.ReactCurrentDispatcher, Wd = Ze.ReactCurrentOwner, zr = Ze.ReactCurrentBatchConfig, Vt = 0, Hn = null, In = null, mr = 0, _a = 0, Tl = At(0), sr = 0, Ns = null, Ki = 0, Jc = 0, Rl = 0, Ro = null, Ir = null, Qd = 0, _l = 1 / 0, Xi = null, ef = !1, _o = null, _i = null, ju = !1, Pu = null, tf = 0, xl = 0, nf = null, xo = -1, Oo = 0;
  function jr() {
    return Vt & 6 ? Xt() : xo !== -1 ? xo : xo = Xt();
  }
  function nr(n) {
    return n.mode & 1 ? Vt & 2 && mr !== 0 ? mr & -mr : wc.transition !== null ? (Oo === 0 && (Oo = Go()), Oo) : (n = nn, n !== 0 || (n = window.event, n = n === void 0 ? 16 : es(n.type)), n) : 1;
  }
  function Pr(n, r, u, l) {
    if (50 < xl)
      throw xl = 0, nf = null, Error(p(185));
    Ui(n, u, l), (!(Vt & 2) || n !== Hn) && (n === Hn && (!(Vt & 2) && (Jc |= u), sr === 4 && Ia(n, mr)), Fr(n, l), u === 1 && Vt === 0 && !(r.mode & 1) && (_l = Xt() + 500, pr && ua()));
  }
  function Fr(n, r) {
    var u = n.callbackNode;
    vu(n, r);
    var l = Br(n, n === Hn ? mr : 0);
    if (l === 0)
      u !== null && Er(u), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = l & -l, n.callbackPriority !== r) {
      if (u != null && Er(u), r === 1)
        n.tag === 0 ? Sd(ah.bind(null, n)) : gd(ah.bind(null, n)), hd(function() {
          !(Vt & 6) && ua();
        }), u = null;
      else {
        switch (Ko(l)) {
          case 1:
            u = ei;
            break;
          case 4:
            u = jt;
            break;
          case 16:
            u = yi;
            break;
          case 536870912:
            u = Wo;
            break;
          default:
            u = yi;
        }
        u = Jd(u, Ol.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = u;
    }
  }
  function Ol(n, r) {
    if (xo = -1, Oo = 0, Vt & 6)
      throw Error(p(327));
    var u = n.callbackNode;
    if (Dl() && n.callbackNode !== u)
      return null;
    var l = Br(n, n === Hn ? mr : 0);
    if (l === 0)
      return null;
    if (l & 30 || l & n.expiredLanes || r)
      r = af(n, l);
    else {
      r = l;
      var c = Vt;
      Vt |= 2;
      var d = rf();
      (Hn !== n || mr !== r) && (Xi = null, _l = Xt() + 500, ko(n, r));
      do
        try {
          Cy();
          break;
        } catch (x) {
          ih(n, x);
        }
      while (!0);
      Rd(), Ms.current = d, Vt = c, In !== null ? r = 0 : (Hn = null, mr = 0, r = sr);
    }
    if (r !== 0) {
      if (r === 2 && (c = hu(n), c !== 0 && (l = c, r = Gd(n, c))), r === 1)
        throw u = Ns, ko(n, 0), Ia(n, l), Fr(n, Xt()), u;
      if (r === 6)
        Ia(n, l);
      else {
        if (c = n.current.alternate, !(l & 30) && !qd(c) && (r = af(n, l), r === 2 && (d = hu(n), d !== 0 && (l = d, r = Gd(n, d))), r === 1))
          throw u = Ns, ko(n, 0), Ia(n, l), Fr(n, Xt()), u;
        switch (n.finishedWork = c, n.finishedLanes = l, r) {
          case 0:
          case 1:
            throw Error(p(345));
          case 2:
            Do(n, Ir, Xi);
            break;
          case 3:
            if (Ia(n, l), (l & 130023424) === l && (r = Qd + 500 - Xt(), 10 < r)) {
              if (Br(n, 0) !== 0)
                break;
              if (c = n.suspendedLanes, (c & l) !== l) {
                jr(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = so(Do.bind(null, n, Ir, Xi), r);
              break;
            }
            Do(n, Ir, Xi);
            break;
          case 4:
            if (Ia(n, l), (l & 4194240) === l)
              break;
            for (r = n.eventTimes, c = -1; 0 < l; ) {
              var E = 31 - Vr(l);
              d = 1 << E, E = r[E], E > c && (c = E), l &= ~d;
            }
            if (l = c, l = Xt() - l, l = (120 > l ? 120 : 480 > l ? 480 : 1080 > l ? 1080 : 1920 > l ? 1920 : 3e3 > l ? 3e3 : 4320 > l ? 4320 : 1960 * Zc(l / 1960)) - l, 10 < l) {
              n.timeoutHandle = so(Do.bind(null, n, Ir, Xi), l);
              break;
            }
            Do(n, Ir, Xi);
            break;
          case 5:
            Do(n, Ir, Xi);
            break;
          default:
            throw Error(p(329));
        }
      }
    }
    return Fr(n, Xt()), n.callbackNode === u ? Ol.bind(null, n) : null;
  }
  function Gd(n, r) {
    var u = Ro;
    return n.current.memoizedState.isDehydrated && (ko(n, r).flags |= 256), n = af(n, r), n !== 2 && (r = Ir, Ir = u, r !== null && Ls(r)), n;
  }
  function Ls(n) {
    Ir === null ? Ir = n : Ir.push.apply(Ir, n);
  }
  function qd(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var u = r.updateQueue;
        if (u !== null && (u = u.stores, u !== null))
          for (var l = 0; l < u.length; l++) {
            var c = u[l], d = c.getSnapshot;
            c = c.value;
            try {
              if (!Aa(d(), c))
                return !1;
            } catch {
              return !1;
            }
          }
      }
      if (u = r.child, r.subtreeFlags & 16384 && u !== null)
        u.return = r, r = u;
      else {
        if (r === n)
          break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n)
            return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function Ia(n, r) {
    for (r &= ~Rl, r &= ~Jc, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var u = 31 - Vr(r), l = 1 << u;
      n[u] = -1, r &= ~l;
    }
  }
  function ah(n) {
    if (Vt & 6)
      throw Error(p(327));
    Dl();
    var r = Br(n, 0);
    if (!(r & 1))
      return Fr(n, Xt()), null;
    var u = af(n, r);
    if (n.tag !== 0 && u === 2) {
      var l = hu(n);
      l !== 0 && (r = l, u = Gd(n, l));
    }
    if (u === 1)
      throw u = Ns, ko(n, 0), Ia(n, r), Fr(n, Xt()), u;
    if (u === 6)
      throw Error(p(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Do(n, Ir, Xi), Fr(n, Xt()), null;
  }
  function kl(n, r) {
    var u = Vt;
    Vt |= 1;
    try {
      return n(r);
    } finally {
      Vt = u, Vt === 0 && (_l = Xt() + 500, pr && ua());
    }
  }
  function Fu(n) {
    Pu !== null && Pu.tag === 0 && !(Vt & 6) && Dl();
    var r = Vt;
    Vt |= 1;
    var u = zr.transition, l = nn;
    try {
      if (zr.transition = null, nn = 1, n)
        return n();
    } finally {
      nn = l, zr.transition = u, Vt = r, !(Vt & 6) && ua();
    }
  }
  function Kd() {
    _a = Tl.current, ln(Tl);
  }
  function ko(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var u = n.timeoutHandle;
    if (u !== -1 && (n.timeoutHandle = -1, Nv(u)), In !== null)
      for (u = In.return; u !== null; ) {
        var l = u;
        switch (Cd(l), l.tag) {
          case 1:
            l = l.type.childContextTypes, l != null && ja();
            break;
          case 3:
            Lu(), ln($n), ln(St), kc();
            break;
          case 5:
            Ft(l);
            break;
          case 4:
            Lu();
            break;
          case 13:
            ln(ft);
            break;
          case 19:
            ln(ft);
            break;
          case 10:
            ku(l.type._context);
            break;
          case 22:
          case 23:
            Kd();
        }
        u = u.return;
      }
    if (Hn = n, In = n = Hu(n.current, null), mr = _a = r, sr = 0, Ns = null, Rl = Jc = Ki = 0, Ir = Ro = null, br !== null) {
      for (r = 0; r < br.length; r++)
        if (u = br[r], l = u.interleaved, l !== null) {
          u.interleaved = null;
          var c = l.next, d = u.pending;
          if (d !== null) {
            var E = d.next;
            d.next = c, l.next = E;
          }
          u.pending = l;
        }
      br = null;
    }
    return n;
  }
  function ih(n, r) {
    do {
      var u = In;
      try {
        if (Rd(), Dc.current = Wc, pt) {
          for (var l = kn.memoizedState; l !== null; ) {
            var c = l.queue;
            c !== null && (c.pending = null), l = l.next;
          }
          pt = !1;
        }
        if (ho = 0, Yt = ne = kn = null, wi = !1, Ra = 0, Wd.current = null, u === null || u.return === null) {
          sr = 1, Ns = r, In = null;
          break;
        }
        e: {
          var d = n, E = u.return, x = u, L = r;
          if (r = mr, x.flags |= 32768, L !== null && typeof L == "object" && typeof L.then == "function") {
            var q = L, de = x, ve = de.tag;
            if (!(de.mode & 1) && (ve === 0 || ve === 11 || ve === 15)) {
              var fe = de.alternate;
              fe ? (de.updateQueue = fe.updateQueue, de.memoizedState = fe.memoizedState, de.lanes = fe.lanes) : (de.updateQueue = null, de.memoizedState = null);
            }
            var je = Ad(E);
            if (je !== null) {
              je.flags &= -257, Ud(je, E, x, d, r), je.mode & 1 && Qv(d, q, r), r = je, L = q;
              var We = r.updateQueue;
              if (We === null) {
                var qe = /* @__PURE__ */ new Set();
                qe.add(L), r.updateQueue = qe;
              } else
                We.add(L);
              break e;
            } else {
              if (!(r & 1)) {
                Qv(d, q, r), Xd();
                break e;
              }
              L = Error(p(426));
            }
          } else if (On && x.mode & 1) {
            var Xn = Ad(E);
            if (Xn !== null) {
              !(Xn.flags & 65536) && (Xn.flags |= 256), Ud(Xn, E, x, d, r), wd(yl(L, x));
              break e;
            }
          }
          d = L = yl(L, x), sr !== 4 && (sr = 2), Ro === null ? Ro = [d] : Ro.push(d), d = E;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var F = Wv(d, L, r);
                Od(d, F);
                break e;
              case 1:
                x = L;
                var j = d.type, I = d.stateNode;
                if (!(d.flags & 128) && (typeof j.getDerivedStateFromError == "function" || I !== null && typeof I.componentDidCatch == "function" && (_i === null || !_i.has(I)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var Ee = Ts(d, x, r);
                  Od(d, Ee);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Zd(u);
      } catch (Xe) {
        r = Xe, In === u && u !== null && (In = u = u.return);
        continue;
      }
      break;
    } while (!0);
  }
  function rf() {
    var n = Ms.current;
    return Ms.current = Wc, n === null ? Wc : n;
  }
  function Xd() {
    (sr === 0 || sr === 3 || sr === 2) && (sr = 4), Hn === null || !(Ki & 268435455) && !(Jc & 268435455) || Ia(Hn, mr);
  }
  function af(n, r) {
    var u = Vt;
    Vt |= 2;
    var l = rf();
    (Hn !== n || mr !== r) && (Xi = null, ko(n, r));
    do
      try {
        Ey();
        break;
      } catch (c) {
        ih(n, c);
      }
    while (!0);
    if (Rd(), Vt = u, Ms.current = l, In !== null)
      throw Error(p(261));
    return Hn = null, mr = 0, sr;
  }
  function Ey() {
    for (; In !== null; )
      uh(In);
  }
  function Cy() {
    for (; In !== null && !mi(); )
      uh(In);
  }
  function uh(n) {
    var r = lh(n.alternate, n, _a);
    n.memoizedProps = n.pendingProps, r === null ? Zd(n) : In = r, Wd.current = null;
  }
  function Zd(n) {
    var r = n;
    do {
      var u = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (u = Bd(u, r), u !== null) {
          u.flags &= 32767, In = u;
          return;
        }
        if (n !== null)
          n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          sr = 6, In = null;
          return;
        }
      } else if (u = Sy(u, r, _a), u !== null) {
        In = u;
        return;
      }
      if (r = r.sibling, r !== null) {
        In = r;
        return;
      }
      In = r = n;
    } while (r !== null);
    sr === 0 && (sr = 5);
  }
  function Do(n, r, u) {
    var l = nn, c = zr.transition;
    try {
      zr.transition = null, nn = 1, by(n, r, u, l);
    } finally {
      zr.transition = c, nn = l;
    }
    return null;
  }
  function by(n, r, u, l) {
    do
      Dl();
    while (Pu !== null);
    if (Vt & 6)
      throw Error(p(327));
    u = n.finishedWork;
    var c = n.finishedLanes;
    if (u === null)
      return null;
    if (n.finishedWork = null, n.finishedLanes = 0, u === n.current)
      throw Error(p(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = u.lanes | u.childLanes;
    if (Gf(n, d), n === Hn && (In = Hn = null, mr = 0), !(u.subtreeFlags & 2064) && !(u.flags & 2064) || ju || (ju = !0, Jd(yi, function() {
      return Dl(), null;
    })), d = (u.flags & 15990) !== 0, u.subtreeFlags & 15990 || d) {
      d = zr.transition, zr.transition = null;
      var E = nn;
      nn = 1;
      var x = Vt;
      Vt |= 4, Wd.current = null, Zv(n, u), eh(u, n), dc(lo), La = !!pd, lo = pd = null, n.current = u, th(u), Yo(), Vt = x, nn = E, zr.transition = d;
    } else
      n.current = u;
    if (ju && (ju = !1, Pu = n, tf = c), d = n.pendingLanes, d === 0 && (_i = null), Xl(u.stateNode), Fr(n, Xt()), r !== null)
      for (l = n.onRecoverableError, u = 0; u < r.length; u++)
        c = r[u], l(c.value, { componentStack: c.stack, digest: c.digest });
    if (ef)
      throw ef = !1, n = _o, _o = null, n;
    return tf & 1 && n.tag !== 0 && Dl(), d = n.pendingLanes, d & 1 ? n === nf ? xl++ : (xl = 0, nf = n) : xl = 0, ua(), null;
  }
  function Dl() {
    if (Pu !== null) {
      var n = Ko(tf), r = zr.transition, u = nn;
      try {
        if (zr.transition = null, nn = 16 > n ? 16 : n, Pu === null)
          var l = !1;
        else {
          if (n = Pu, Pu = null, tf = 0, Vt & 6)
            throw Error(p(331));
          var c = Vt;
          for (Vt |= 4, Ye = n.current; Ye !== null; ) {
            var d = Ye, E = d.child;
            if (Ye.flags & 16) {
              var x = d.deletions;
              if (x !== null) {
                for (var L = 0; L < x.length; L++) {
                  var q = x[L];
                  for (Ye = q; Ye !== null; ) {
                    var de = Ye;
                    switch (de.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ks(8, de, d);
                    }
                    var ve = de.child;
                    if (ve !== null)
                      ve.return = de, Ye = ve;
                    else
                      for (; Ye !== null; ) {
                        de = Ye;
                        var fe = de.sibling, je = de.return;
                        if (Id(de), de === q) {
                          Ye = null;
                          break;
                        }
                        if (fe !== null) {
                          fe.return = je, Ye = fe;
                          break;
                        }
                        Ye = je;
                      }
                  }
                }
                var We = d.alternate;
                if (We !== null) {
                  var qe = We.child;
                  if (qe !== null) {
                    We.child = null;
                    do {
                      var Xn = qe.sibling;
                      qe.sibling = null, qe = Xn;
                    } while (qe !== null);
                  }
                }
                Ye = d;
              }
            }
            if (d.subtreeFlags & 2064 && E !== null)
              E.return = d, Ye = E;
            else
              e:
                for (; Ye !== null; ) {
                  if (d = Ye, d.flags & 2048)
                    switch (d.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ks(9, d, d.return);
                    }
                  var F = d.sibling;
                  if (F !== null) {
                    F.return = d.return, Ye = F;
                    break e;
                  }
                  Ye = d.return;
                }
          }
          var j = n.current;
          for (Ye = j; Ye !== null; ) {
            E = Ye;
            var I = E.child;
            if (E.subtreeFlags & 2064 && I !== null)
              I.return = E, Ye = I;
            else
              e:
                for (E = j; Ye !== null; ) {
                  if (x = Ye, x.flags & 2048)
                    try {
                      switch (x.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Ds(9, x);
                      }
                    } catch (Xe) {
                      Yn(x, x.return, Xe);
                    }
                  if (x === E) {
                    Ye = null;
                    break e;
                  }
                  var Ee = x.sibling;
                  if (Ee !== null) {
                    Ee.return = x.return, Ye = Ee;
                    break e;
                  }
                  Ye = x.return;
                }
          }
          if (Vt = c, ua(), ta && typeof ta.onPostCommitFiberRoot == "function")
            try {
              ta.onPostCommitFiberRoot(fu, n);
            } catch {
            }
          l = !0;
        }
        return l;
      } finally {
        nn = u, zr.transition = r;
      }
    }
    return !1;
  }
  function oh(n, r, u) {
    r = yl(u, r), r = Wv(n, r, 1), n = Mu(n, r, 1), r = jr(), n !== null && (Ui(n, 1, r), Fr(n, r));
  }
  function Yn(n, r, u) {
    if (n.tag === 3)
      oh(n, n, u);
    else
      for (; r !== null; ) {
        if (r.tag === 3) {
          oh(r, n, u);
          break;
        } else if (r.tag === 1) {
          var l = r.stateNode;
          if (typeof r.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (_i === null || !_i.has(l))) {
            n = yl(u, n), n = Ts(r, n, 1), r = Mu(r, n, 1), n = jr(), r !== null && (Ui(r, 1, n), Fr(r, n));
            break;
          }
        }
        r = r.return;
      }
  }
  function wy(n, r, u) {
    var l = n.pingCache;
    l !== null && l.delete(r), r = jr(), n.pingedLanes |= n.suspendedLanes & u, Hn === n && (mr & u) === u && (sr === 4 || sr === 3 && (mr & 130023424) === mr && 500 > Xt() - Qd ? ko(n, 0) : Rl |= u), Fr(n, r);
  }
  function uf(n, r) {
    r === 0 && (n.mode & 1 ? (r = du, du <<= 1, !(du & 130023424) && (du = 4194304)) : r = 1);
    var u = jr();
    n = Yi(n, r), n !== null && (Ui(n, r, u), Fr(n, u));
  }
  function Ty(n) {
    var r = n.memoizedState, u = 0;
    r !== null && (u = r.retryLane), uf(n, u);
  }
  function Ry(n, r) {
    var u = 0;
    switch (n.tag) {
      case 13:
        var l = n.stateNode, c = n.memoizedState;
        c !== null && (u = c.retryLane);
        break;
      case 19:
        l = n.stateNode;
        break;
      default:
        throw Error(p(314));
    }
    l !== null && l.delete(r), uf(n, u);
  }
  var lh;
  lh = function(n, r, u) {
    if (n !== null)
      if (n.memoizedProps !== r.pendingProps || $n.current)
        tr = !0;
      else {
        if (!(n.lanes & u) && !(r.flags & 128))
          return tr = !1, Gi(n, r, u);
        tr = !!(n.flags & 131072);
      }
    else
      tr = !1, On && r.flags & 1048576 && Ed(r, cl, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var l = r.type;
        Ar(n, r), n = r.pendingProps;
        var c = za(r, St.current);
        ke(r, u), c = Au(null, r, l, n, c, u);
        var d = go();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, An(l) ? (d = !0, gc(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, xd(r), c.updater = _c, r.stateNode = c, c._reactInternals = r, xc(r, l, n, u), r = Gv(null, r, l, !0, d, u)) : (r.tag = 0, On && d && Sc(r), ur(null, r, c, u), r = r.child), r;
      case 16:
        l = r.elementType;
        e: {
          switch (Ar(n, r), n = r.pendingProps, c = l._init, l = c(l._payload), r.type = l, c = r.tag = xy(l), n = Ta(l, n), c) {
            case 0:
              r = gl(null, r, l, n, u);
              break e;
            case 1:
              r = zd(null, r, l, n, u);
              break e;
            case 11:
              r = zu(null, r, l, n, u);
              break e;
            case 14:
              r = Gc(null, r, l, Ta(l.type, n), u);
              break e;
          }
          throw Error(p(
            306,
            l,
            ""
          ));
        }
        return r;
      case 0:
        return l = r.type, c = r.pendingProps, c = r.elementType === l ? c : Ta(l, c), gl(n, r, l, c, u);
      case 1:
        return l = r.type, c = r.pendingProps, c = r.elementType === l ? c : Ta(l, c), zd(n, r, l, c, u);
      case 3:
        e: {
          if (qv(r), n === null)
            throw Error(p(387));
          l = r.pendingProps, d = r.memoizedState, c = d.element, ir(n, r), Nu(r, l, null, u);
          var E = r.memoizedState;
          if (l = E.element, d.isDehydrated)
            if (d = { element: l, isDehydrated: !1, cache: E.cache, pendingSuspenseBoundaries: E.pendingSuspenseBoundaries, transitions: E.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
              c = yl(Error(p(423)), r), r = qc(n, r, l, u, c);
              break e;
            } else if (l !== c) {
              c = yl(Error(p(424)), r), r = qc(n, r, l, u, c);
              break e;
            } else
              for (sa = ui(r.stateNode.containerInfo.firstChild), wa = r, On = !0, Fa = null, u = Iv(r, null, l, u), r.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (Pn(), l === c) {
              r = wr(n, r, u);
              break e;
            }
            ur(n, r, l, u);
          }
          r = r.child;
        }
        return r;
      case 5:
        return st(r), n === null && Cc(r), l = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, E = c.children, ds(l, c) ? E = null : d !== null && ds(l, d) && (r.flags |= 32), Ut(n, r), ur(n, r, E, u), r.child;
      case 6:
        return n === null && Cc(r), null;
      case 13:
        return Pd(n, r, u);
      case 4:
        return Dd(r, r.stateNode.containerInfo), l = r.pendingProps, n === null ? r.child = dl(r, null, l, u) : ur(n, r, l, u), r.child;
      case 11:
        return l = r.type, c = r.pendingProps, c = r.elementType === l ? c : Ta(l, c), zu(n, r, l, c, u);
      case 7:
        return ur(n, r, r.pendingProps, u), r.child;
      case 8:
        return ur(n, r, r.pendingProps.children, u), r.child;
      case 12:
        return ur(n, r, r.pendingProps.children, u), r.child;
      case 10:
        e: {
          if (l = r.type._context, c = r.pendingProps, d = r.memoizedProps, E = c.value, fn(bi, l._currentValue), l._currentValue = E, d !== null)
            if (Aa(d.value, E)) {
              if (d.children === c.children && !$n.current) {
                r = wr(n, r, u);
                break e;
              }
            } else
              for (d = r.child, d !== null && (d.return = r); d !== null; ) {
                var x = d.dependencies;
                if (x !== null) {
                  E = d.child;
                  for (var L = x.firstContext; L !== null; ) {
                    if (L.context === l) {
                      if (d.tag === 1) {
                        L = Wi(-1, u & -u), L.tag = 2;
                        var q = d.updateQueue;
                        if (q !== null) {
                          q = q.shared;
                          var de = q.pending;
                          de === null ? L.next = L : (L.next = de.next, de.next = L), q.pending = L;
                        }
                      }
                      d.lanes |= u, L = d.alternate, L !== null && (L.lanes |= u), vr(
                        d.return,
                        u,
                        r
                      ), x.lanes |= u;
                      break;
                    }
                    L = L.next;
                  }
                } else if (d.tag === 10)
                  E = d.type === r.type ? null : d.child;
                else if (d.tag === 18) {
                  if (E = d.return, E === null)
                    throw Error(p(341));
                  E.lanes |= u, x = E.alternate, x !== null && (x.lanes |= u), vr(E, u, r), E = d.sibling;
                } else
                  E = d.child;
                if (E !== null)
                  E.return = d;
                else
                  for (E = d; E !== null; ) {
                    if (E === r) {
                      E = null;
                      break;
                    }
                    if (d = E.sibling, d !== null) {
                      d.return = E.return, E = d;
                      break;
                    }
                    E = E.return;
                  }
                d = E;
              }
          ur(n, r, c.children, u), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, l = r.pendingProps.children, ke(r, u), c = Kn(c), l = l(c), r.flags |= 1, ur(n, r, l, u), r.child;
      case 14:
        return l = r.type, c = Ta(l, r.pendingProps), c = Ta(l.type, c), Gc(n, r, l, c, u);
      case 15:
        return da(n, r, r.type, r.pendingProps, u);
      case 17:
        return l = r.type, c = r.pendingProps, c = r.elementType === l ? c : Ta(l, c), Ar(n, r), r.tag = 1, An(l) ? (n = !0, gc(r)) : n = !1, ke(r, u), Hv(r, l, c), xc(r, l, c, u), Gv(null, r, l, !0, n, u);
      case 19:
        return Vd(n, r, u);
      case 22:
        return bo(n, r, u);
    }
    throw Error(p(156, r.tag));
  };
  function Jd(n, r) {
    return Rn(n, r);
  }
  function _y(n, r, u, l) {
    this.tag = n, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ya(n, r, u, l) {
    return new _y(n, r, u, l);
  }
  function ep(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function xy(n) {
    if (typeof n == "function")
      return ep(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === Mt)
        return 11;
      if (n === at)
        return 14;
    }
    return 2;
  }
  function Hu(n, r) {
    var u = n.alternate;
    return u === null ? (u = Ya(n.tag, r, n.key, n.mode), u.elementType = n.elementType, u.type = n.type, u.stateNode = n.stateNode, u.alternate = n, n.alternate = u) : (u.pendingProps = r, u.type = n.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = n.flags & 14680064, u.childLanes = n.childLanes, u.lanes = n.lanes, u.child = n.child, u.memoizedProps = n.memoizedProps, u.memoizedState = n.memoizedState, u.updateQueue = n.updateQueue, r = n.dependencies, u.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, u.sibling = n.sibling, u.index = n.index, u.ref = n.ref, u;
  }
  function of(n, r, u, l, c, d) {
    var E = 2;
    if (l = n, typeof n == "function")
      ep(n) && (E = 1);
    else if (typeof n == "string")
      E = 5;
    else
      e:
        switch (n) {
          case Fe:
            return Mo(u.children, c, d, r);
          case kt:
            E = 8, c |= 8;
            break;
          case qt:
            return n = Ya(12, u, r, c | 2), n.elementType = qt, n.lanes = d, n;
          case Ie:
            return n = Ya(13, u, r, c), n.elementType = Ie, n.lanes = d, n;
          case rt:
            return n = Ya(19, u, r, c), n.elementType = rt, n.lanes = d, n;
          case Ne:
            return As(u, c, d, r);
          default:
            if (typeof n == "object" && n !== null)
              switch (n.$$typeof) {
                case mt:
                  E = 10;
                  break e;
                case yt:
                  E = 9;
                  break e;
                case Mt:
                  E = 11;
                  break e;
                case at:
                  E = 14;
                  break e;
                case Ct:
                  E = 16, l = null;
                  break e;
              }
            throw Error(p(130, n == null ? n : typeof n, ""));
        }
    return r = Ya(E, u, r, c), r.elementType = n, r.type = l, r.lanes = d, r;
  }
  function Mo(n, r, u, l) {
    return n = Ya(7, n, l, r), n.lanes = u, n;
  }
  function As(n, r, u, l) {
    return n = Ya(22, n, l, r), n.elementType = Ne, n.lanes = u, n.stateNode = { isHidden: !1 }, n;
  }
  function Us(n, r, u) {
    return n = Ya(6, n, null, r), n.lanes = u, n;
  }
  function No(n, r, u) {
    return r = Ya(4, n.children !== null ? n.children : [], n.key, r), r.lanes = u, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Oy(n, r, u, l, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = qo(0), this.expirationTimes = qo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qo(0), this.identifierPrefix = l, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function lf(n, r, u, l, c, d, E, x, L) {
    return n = new Oy(n, r, u, x, L), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Ya(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: l, isDehydrated: u, cache: null, transitions: null, pendingSuspenseBoundaries: null }, xd(d), n;
  }
  function sh(n, r, u) {
    var l = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Ke, key: l == null ? null : "" + l, children: n, containerInfo: r, implementation: u };
  }
  function tp(n) {
    if (!n)
      return Ci;
    n = n._reactInternals;
    e: {
      if (Dt(n) !== n || n.tag !== 1)
        throw Error(p(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (An(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(p(171));
    }
    if (n.tag === 1) {
      var u = n.type;
      if (An(u))
        return hs(n, u, r);
    }
    return r;
  }
  function ch(n, r, u, l, c, d, E, x, L) {
    return n = lf(u, l, !0, n, c, d, E, x, L), n.context = tp(null), u = n.current, l = jr(), c = nr(u), d = Wi(l, c), d.callback = r ?? null, Mu(u, d, c), n.current.lanes = c, Ui(n, c, l), Fr(n, l), n;
  }
  function zs(n, r, u, l) {
    var c = r.current, d = jr(), E = nr(c);
    return u = tp(u), r.context === null ? r.context = u : r.pendingContext = u, r = Wi(d, E), r.payload = { element: n }, l = l === void 0 ? null : l, l !== null && (r.callback = l), n = Mu(c, r, E), n !== null && (Pr(n, c, E, d), Rc(n, c, E)), E;
  }
  function sf(n) {
    if (n = n.current, !n.child)
      return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function fh(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var u = n.retryLane;
      n.retryLane = u !== 0 && u < r ? u : r;
    }
  }
  function np(n, r) {
    fh(n, r), (n = n.alternate) && fh(n, r);
  }
  function dh() {
    return null;
  }
  var rp = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function cf(n) {
    this._internalRoot = n;
  }
  Zi.prototype.render = cf.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null)
      throw Error(p(409));
    zs(n, r, null, null);
  }, Zi.prototype.unmount = cf.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Fu(function() {
        zs(null, n, null, null);
      }), r[$i] = null;
    }
  };
  function Zi(n) {
    this._internalRoot = n;
  }
  Zi.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Zo();
      n = { blockedOn: null, target: n, priority: r };
      for (var u = 0; u < cn.length && r !== 0 && r < cn[u].priority; u++)
        ;
      cn.splice(u, 0, n), u === 0 && ic(n);
    }
  };
  function ap(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function ff(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function ph() {
  }
  function ky(n, r, u, l, c) {
    if (c) {
      if (typeof l == "function") {
        var d = l;
        l = function() {
          var q = sf(E);
          d.call(q);
        };
      }
      var E = ch(r, l, n, 0, null, !1, !1, "", ph);
      return n._reactRootContainer = E, n[$i] = E.current, ll(n.nodeType === 8 ? n.parentNode : n), Fu(), E;
    }
    for (; c = n.lastChild; )
      n.removeChild(c);
    if (typeof l == "function") {
      var x = l;
      l = function() {
        var q = sf(L);
        x.call(q);
      };
    }
    var L = lf(n, 0, !1, null, null, !1, !1, "", ph);
    return n._reactRootContainer = L, n[$i] = L.current, ll(n.nodeType === 8 ? n.parentNode : n), Fu(function() {
      zs(r, L, u, l);
    }), L;
  }
  function df(n, r, u, l, c) {
    var d = u._reactRootContainer;
    if (d) {
      var E = d;
      if (typeof c == "function") {
        var x = c;
        c = function() {
          var L = sf(E);
          x.call(L);
        };
      }
      zs(r, E, n, c);
    } else
      E = ky(u, r, n, c, l);
    return sf(E);
  }
  to = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var u = ti(r.pendingLanes);
          u !== 0 && (gi(r, u | 1), Fr(r, Xt()), !(Vt & 6) && (_l = Xt() + 500, ua()));
        }
        break;
      case 13:
        Fu(function() {
          var l = Yi(n, 1);
          if (l !== null) {
            var c = jr();
            Pr(l, n, 1, c);
          }
        }), np(n, 1);
    }
  }, Xo = function(n) {
    if (n.tag === 13) {
      var r = Yi(n, 134217728);
      if (r !== null) {
        var u = jr();
        Pr(r, n, 134217728, u);
      }
      np(n, 134217728);
    }
  }, Zt = function(n) {
    if (n.tag === 13) {
      var r = nr(n), u = Yi(n, r);
      if (u !== null) {
        var l = jr();
        Pr(u, n, r, l);
      }
      np(n, r);
    }
  }, Zo = function() {
    return nn;
  }, Jo = function(n, r) {
    var u = nn;
    try {
      return nn = n, r();
    } finally {
      nn = u;
    }
  }, Me = function(n, r, u) {
    switch (r) {
      case "input":
        if (wt(n, u), r = u.name, u.type === "radio" && r != null) {
          for (u = n; u.parentNode; )
            u = u.parentNode;
          for (u = u.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < u.length; r++) {
            var l = u[r];
            if (l !== n && l.form === n.form) {
              var c = nt(l);
              if (!c)
                throw Error(p(90));
              dt(l), wt(l, c);
            }
          }
        }
        break;
      case "textarea":
        Sr(n, u);
        break;
      case "select":
        r = u.value, r != null && Ln(n, !!u.multiple, r, !1);
    }
  }, ar = kl, Ai = Fu;
  var Dy = { usingClientEntryPoint: !1, Events: [vs, sl, nt, Ht, sn, kl] }, Ml = { findFiberByHostInstance: Ua, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, My = { bundleType: Ml.bundleType, version: Ml.version, rendererPackageName: Ml.rendererPackageName, rendererConfig: Ml.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ze.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Jn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Ml.findFiberByHostInstance || dh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var pf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!pf.isDisabled && pf.supportsFiber)
      try {
        fu = pf.inject(My), ta = pf;
      } catch {
      }
  }
  return Za.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dy, Za.createPortal = function(n, r) {
    var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ap(r))
      throw Error(p(200));
    return sh(n, r, null, u);
  }, Za.createRoot = function(n, r) {
    if (!ap(n))
      throw Error(p(299));
    var u = !1, l = "", c = rp;
    return r != null && (r.unstable_strictMode === !0 && (u = !0), r.identifierPrefix !== void 0 && (l = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = lf(n, 1, !1, null, null, u, !1, l, c), n[$i] = r.current, ll(n.nodeType === 8 ? n.parentNode : n), new cf(r);
  }, Za.findDOMNode = function(n) {
    if (n == null)
      return null;
    if (n.nodeType === 1)
      return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(p(188)) : (n = Object.keys(n).join(","), Error(p(268, n)));
    return n = Jn(r), n = n === null ? null : n.stateNode, n;
  }, Za.flushSync = function(n) {
    return Fu(n);
  }, Za.hydrate = function(n, r, u) {
    if (!ff(r))
      throw Error(p(200));
    return df(null, n, r, !0, u);
  }, Za.hydrateRoot = function(n, r, u) {
    if (!ap(n))
      throw Error(p(405));
    var l = u != null && u.hydratedSources || null, c = !1, d = "", E = rp;
    if (u != null && (u.unstable_strictMode === !0 && (c = !0), u.identifierPrefix !== void 0 && (d = u.identifierPrefix), u.onRecoverableError !== void 0 && (E = u.onRecoverableError)), r = ch(r, null, n, 1, u ?? null, c, !1, d, E), n[$i] = r.current, ll(n), l)
      for (n = 0; n < l.length; n++)
        u = l[n], c = u._getVersion, c = c(u._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [u, c] : r.mutableSourceEagerHydrationData.push(
          u,
          c
        );
    return new Zi(r);
  }, Za.render = function(n, r, u) {
    if (!ff(r))
      throw Error(p(200));
    return df(null, n, r, !1, u);
  }, Za.unmountComponentAtNode = function(n) {
    if (!ff(n))
      throw Error(p(40));
    return n._reactRootContainer ? (Fu(function() {
      df(null, null, n, !1, function() {
        n._reactRootContainer = null, n[$i] = null;
      });
    }), !0) : !1;
  }, Za.unstable_batchedUpdates = kl, Za.unstable_renderSubtreeIntoContainer = function(n, r, u, l) {
    if (!ff(u))
      throw Error(p(200));
    if (n == null || n._reactInternals === void 0)
      throw Error(p(38));
    return df(n, r, u, !1, l);
  }, Za.version = "18.2.0-next-9e3b772b8-20220608", Za;
}
function CT() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(CT);
    } catch (v) {
      console.error(v);
    }
  }
}
process.env.NODE_ENV === "production" ? (CT(), VE.exports = TD()) : VE.exports = wD();
var RD = VE.exports;
function _D(v) {
  v();
}
var bT = _D, xD = (v) => bT = v, OD = () => bT, pn = (
  // prettier-ignore
  // @ts-ignore
  "default" in zw ? dT : zw
), Zw = Symbol.for("react-redux-context"), Jw = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function kD() {
  if (!pn.createContext)
    return {};
  const v = Jw[Zw] ?? (Jw[Zw] = /* @__PURE__ */ new Map());
  let m = v.get(pn.createContext);
  return m || (m = pn.createContext(
    null
  ), process.env.NODE_ENV !== "production" && (m.displayName = "ReactRedux"), v.set(pn.createContext, m)), m;
}
var wT = /* @__PURE__ */ kD(), DD = () => {
  throw new Error("uSES not initialized!");
}, MD = Symbol.for("react.element"), ND = Symbol.for("react.portal"), TT = Symbol.for("react.fragment"), RT = Symbol.for("react.strict_mode"), _T = Symbol.for("react.profiler"), xT = Symbol.for("react.provider"), WE = Symbol.for("react.context"), LD = Symbol.for("react.server_context"), QE = Symbol.for("react.forward_ref"), OT = Symbol.for("react.suspense"), kT = Symbol.for("react.suspense_list"), Xm = Symbol.for("react.memo"), DT = Symbol.for("react.lazy"), AD = Symbol.for("react.offscreen"), UD = Symbol.for("react.client.reference"), zD = QE, jD = Xm;
function PD(v) {
  return typeof v == "string" || typeof v == "function" || v === TT || v === _T || v === RT || v === OT || v === kT || v === AD || typeof v == "object" && v !== null && (v.$$typeof === DT || v.$$typeof === Xm || v.$$typeof === xT || v.$$typeof === WE || v.$$typeof === QE || // This needs to include all possible module reference object
  // types supported by any Flight configuration anywhere since
  // we don't know which Flight build this will end up being used
  // with.
  v.$$typeof === UD || v.getModuleId !== void 0);
}
function MT(v) {
  if (typeof v == "object" && v !== null) {
    const m = v.$$typeof;
    switch (m) {
      case MD: {
        const p = v.type;
        switch (p) {
          case TT:
          case _T:
          case RT:
          case OT:
          case kT:
            return p;
          default: {
            const C = p && p.$$typeof;
            switch (C) {
              case LD:
              case WE:
              case QE:
              case DT:
              case Xm:
              case xT:
                return C;
              default:
                return m;
            }
          }
        }
      }
      case ND:
        return m;
    }
  }
}
function FD(v) {
  return MT(v) === WE;
}
function HD(v) {
  return MT(v) === Xm;
}
function GE(v) {
  typeof console < "u" && typeof console.error == "function" && console.error(v);
  try {
    throw new Error(v);
  } catch {
  }
}
function ME(v, m) {
  if (v)
    (m === "mapStateToProps" || m === "mapDispatchToProps") && (Object.prototype.hasOwnProperty.call(v, "dependsOnOwnProps") || GE(
      `The selector for ${m} of connect did not specify a value for dependsOnOwnProps.`
    ));
  else
    throw new Error(`Unexpected value for ${m} in connect.`);
}
function VD(v, m, p) {
  ME(v, "mapStateToProps"), ME(m, "mapDispatchToProps"), ME(p, "mergeProps");
}
function BD(v, m, p, C, {
  areStatesEqual: w,
  areOwnPropsEqual: N,
  areStatePropsEqual: S
}) {
  let te = !1, Y, $, oe, K, re;
  function ue(Ae, Ue) {
    return Y = Ae, $ = Ue, oe = v(Y, $), K = m(C, $), re = p(oe, K, $), te = !0, re;
  }
  function be() {
    return oe = v(Y, $), m.dependsOnOwnProps && (K = m(C, $)), re = p(oe, K, $), re;
  }
  function Te() {
    return v.dependsOnOwnProps && (oe = v(Y, $)), m.dependsOnOwnProps && (K = m(C, $)), re = p(oe, K, $), re;
  }
  function me() {
    const Ae = v(Y, $), Ue = !S(Ae, oe);
    return oe = Ae, Ue && (re = p(oe, K, $)), re;
  }
  function tt(Ae, Ue) {
    const Ze = !N(Ue, $), _e = !w(
      Ae,
      Y,
      Ue,
      $
    );
    return Y = Ae, $ = Ue, Ze && _e ? be() : Ze ? Te() : _e ? me() : re;
  }
  return function(Ue, Ze) {
    return te ? tt(Ue, Ze) : ue(Ue, Ze);
  };
}
function $D(v, {
  initMapStateToProps: m,
  initMapDispatchToProps: p,
  initMergeProps: C,
  ...w
}) {
  const N = m(v, w), S = p(v, w), te = C(v, w);
  return process.env.NODE_ENV !== "production" && VD(N, S, te), BD(N, S, te, v, w);
}
function ID(v, m) {
  const p = {};
  for (const C in v) {
    const w = v[C];
    typeof w == "function" && (p[C] = (...N) => m(w(...N)));
  }
  return p;
}
function YD(v) {
  if (typeof v != "object" || v === null)
    return !1;
  let m = Object.getPrototypeOf(v);
  if (m === null)
    return !0;
  let p = m;
  for (; Object.getPrototypeOf(p) !== null; )
    p = Object.getPrototypeOf(p);
  return m === p;
}
function NT(v, m, p) {
  YD(v) || GE(
    `${p}() in ${m} must return a plain object. Instead received ${v}.`
  );
}
function BE(v) {
  return function(p) {
    const C = v(p);
    function w() {
      return C;
    }
    return w.dependsOnOwnProps = !1, w;
  };
}
function eT(v) {
  return v.dependsOnOwnProps ? !!v.dependsOnOwnProps : v.length !== 1;
}
function LT(v, m) {
  return function(C, { displayName: w }) {
    const N = function(te, Y) {
      return N.dependsOnOwnProps ? N.mapToProps(te, Y) : N.mapToProps(te, void 0);
    };
    return N.dependsOnOwnProps = !0, N.mapToProps = function(te, Y) {
      N.mapToProps = v, N.dependsOnOwnProps = eT(v);
      let $ = N(te, Y);
      return typeof $ == "function" && (N.mapToProps = $, N.dependsOnOwnProps = eT($), $ = N(te, Y)), process.env.NODE_ENV !== "production" && NT($, w, m), $;
    }, N;
  };
}
function qE(v, m) {
  return (p, C) => {
    throw new Error(
      `Invalid value of type ${typeof v} for ${m} argument when connecting component ${C.wrappedComponentName}.`
    );
  };
}
function WD(v) {
  return v && typeof v == "object" ? BE(
    (m) => (
      // @ts-ignore
      ID(v, m)
    )
  ) : v ? typeof v == "function" ? (
    // @ts-ignore
    LT(v, "mapDispatchToProps")
  ) : qE(v, "mapDispatchToProps") : BE((m) => ({
    dispatch: m
  }));
}
function QD(v) {
  return v ? typeof v == "function" ? (
    // @ts-ignore
    LT(v, "mapStateToProps")
  ) : qE(v, "mapStateToProps") : BE(() => ({}));
}
function GD(v, m, p) {
  return { ...p, ...v, ...m };
}
function qD(v) {
  return function(p, { displayName: C, areMergedPropsEqual: w }) {
    let N = !1, S;
    return function(Y, $, oe) {
      const K = v(Y, $, oe);
      return N ? w(K, S) || (S = K) : (N = !0, S = K, process.env.NODE_ENV !== "production" && NT(S, C, "mergeProps")), S;
    };
  };
}
function KD(v) {
  return v ? typeof v == "function" ? qD(v) : qE(v, "mergeProps") : () => GD;
}
function XD() {
  const v = OD();
  let m = null, p = null;
  return {
    clear() {
      m = null, p = null;
    },
    notify() {
      v(() => {
        let C = m;
        for (; C; )
          C.callback(), C = C.next;
      });
    },
    get() {
      let C = [], w = m;
      for (; w; )
        C.push(w), w = w.next;
      return C;
    },
    subscribe(C) {
      let w = !0, N = p = {
        callback: C,
        next: null,
        prev: p
      };
      return N.prev ? N.prev.next = N : m = N, function() {
        !w || m === null || (w = !1, N.next ? N.next.prev = N.prev : p = N.prev, N.prev ? N.prev.next = N.next : m = N.next);
      };
    }
  };
}
var tT = {
  notify() {
  },
  get: () => []
};
function AT(v, m) {
  let p, C = tT, w = 0, N = !1;
  function S(Te) {
    oe();
    const me = C.subscribe(Te);
    let tt = !1;
    return () => {
      tt || (tt = !0, me(), K());
    };
  }
  function te() {
    C.notify();
  }
  function Y() {
    be.onStateChange && be.onStateChange();
  }
  function $() {
    return N;
  }
  function oe() {
    w++, p || (p = m ? m.addNestedSub(Y) : v.subscribe(Y), C = XD());
  }
  function K() {
    w--, p && w === 0 && (p(), p = void 0, C.clear(), C = tT);
  }
  function re() {
    N || (N = !0, oe());
  }
  function ue() {
    N && (N = !1, K());
  }
  const be = {
    addNestedSub: S,
    notifyNestedSubs: te,
    handleChangeWrapper: Y,
    isSubscribed: $,
    trySubscribe: re,
    tryUnsubscribe: ue,
    getListeners: () => C
  };
  return be;
}
var ZD = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Km = ZD ? pn.useLayoutEffect : pn.useEffect;
function nT(v, m) {
  return v === m ? v !== 0 || m !== 0 || 1 / v === 1 / m : v !== v && m !== m;
}
function NE(v, m) {
  if (nT(v, m))
    return !0;
  if (typeof v != "object" || v === null || typeof m != "object" || m === null)
    return !1;
  const p = Object.keys(v), C = Object.keys(m);
  if (p.length !== C.length)
    return !1;
  for (let w = 0; w < p.length; w++)
    if (!Object.prototype.hasOwnProperty.call(m, p[w]) || !nT(v[p[w]], m[p[w]]))
      return !1;
  return !0;
}
var JD = {
  childContextTypes: !0,
  contextType: !0,
  contextTypes: !0,
  defaultProps: !0,
  displayName: !0,
  getDefaultProps: !0,
  getDerivedStateFromError: !0,
  getDerivedStateFromProps: !0,
  mixins: !0,
  propTypes: !0,
  type: !0
}, eM = {
  name: !0,
  length: !0,
  prototype: !0,
  caller: !0,
  callee: !0,
  arguments: !0,
  arity: !0
}, tM = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, UT = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, nM = {
  [zD]: tM,
  [jD]: UT
};
function rT(v) {
  return HD(v) ? UT : nM[v.$$typeof] || JD;
}
var rM = Object.defineProperty, aM = Object.getOwnPropertyNames, aT = Object.getOwnPropertySymbols, iM = Object.getOwnPropertyDescriptor, uM = Object.getPrototypeOf, iT = Object.prototype;
function $E(v, m) {
  if (typeof m != "string") {
    if (iT) {
      const N = uM(m);
      N && N !== iT && $E(v, N);
    }
    let p = aM(m);
    aT && (p = p.concat(aT(m)));
    const C = rT(v), w = rT(m);
    for (let N = 0; N < p.length; ++N) {
      const S = p[N];
      if (!eM[S] && !(w && w[S]) && !(C && C[S])) {
        const te = iM(m, S);
        try {
          rM(v, S, te);
        } catch {
        }
      }
    }
  }
  return v;
}
var zT = DD, oM = (v) => {
  zT = v;
}, lM = [null, null], sM = (v) => {
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
};
function cM(v, m, p) {
  Km(() => v(...m), p);
}
function fM(v, m, p, C, w, N) {
  v.current = C, p.current = !1, w.current && (w.current = null, N());
}
function dM(v, m, p, C, w, N, S, te, Y, $, oe) {
  if (!v)
    return () => {
    };
  let K = !1, re = null;
  const ue = () => {
    if (K || !te.current)
      return;
    const Te = m.getState();
    let me, tt;
    try {
      me = C(
        Te,
        w.current
      );
    } catch (Ae) {
      tt = Ae, re = Ae;
    }
    tt || (re = null), me === N.current ? S.current || $() : (N.current = me, Y.current = me, S.current = !0, oe());
  };
  return p.onStateChange = ue, p.trySubscribe(), ue(), () => {
    if (K = !0, p.tryUnsubscribe(), p.onStateChange = null, re)
      throw re;
  };
}
function pM(v, m) {
  return v === m;
}
var uT = !1;
function vM(v, m, p, {
  // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
  // @ts-ignore
  pure: C,
  areStatesEqual: w = pM,
  areOwnPropsEqual: N = NE,
  areStatePropsEqual: S = NE,
  areMergedPropsEqual: te = NE,
  // use React's forwardRef to expose a ref of the wrapped component
  forwardRef: Y = !1,
  // the context consumer to use
  context: $ = wT
} = {}) {
  process.env.NODE_ENV !== "production" && C !== void 0 && !uT && (uT = !0, GE(
    'The `pure` option has been removed. `connect` is now always a "pure/memoized" component'
  ));
  const oe = $, K = QD(v), re = WD(m), ue = KD(p), be = !!v;
  return (me) => {
    if (process.env.NODE_ENV !== "production" && !/* @__PURE__ */ PD(me))
      throw new Error(
        `You must pass a component to the function returned by connect. Instead received ${sM(
          me
        )}`
      );
    const tt = me.displayName || me.name || "Component", Ae = `Connect(${tt})`, Ue = {
      shouldHandleStateChanges: be,
      displayName: Ae,
      wrappedComponentName: tt,
      WrappedComponent: me,
      // @ts-ignore
      initMapStateToProps: K,
      // @ts-ignore
      initMapDispatchToProps: re,
      initMergeProps: ue,
      areStatesEqual: w,
      areStatePropsEqual: S,
      areOwnPropsEqual: N,
      areMergedPropsEqual: te
    };
    function Ze(Fe) {
      const [kt, qt, mt] = pn.useMemo(() => {
        const { reactReduxForwardedRef: dt, ..._t } = Fe;
        return [Fe.context, dt, _t];
      }, [Fe]), yt = pn.useMemo(() => {
        let dt = oe;
        if (kt != null && kt.Consumer && process.env.NODE_ENV !== "production") {
          if (!/* @__PURE__ */ FD(
            // @ts-ignore
            /* @__PURE__ */ pn.createElement(kt.Consumer, null)
          ))
            throw new Error(
              "You must pass a valid React context consumer as `props.context`"
            );
          dt = kt;
        }
        return dt;
      }, [kt, oe]), Mt = pn.useContext(yt), Ie = !!Fe.store && !!Fe.store.getState && !!Fe.store.dispatch, rt = !!Mt && !!Mt.store;
      if (process.env.NODE_ENV !== "production" && !Ie && !rt)
        throw new Error(
          `Could not find "store" in the context of "${Ae}". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to ${Ae} in connect options.`
        );
      const at = Ie ? Fe.store : Mt.store, Ct = rt ? Mt.getServerState : at.getState, Ne = pn.useMemo(() => $D(at.dispatch, Ue), [at]), [pe, $e] = pn.useMemo(() => {
        if (!be)
          return lM;
        const dt = AT(
          at,
          Ie ? void 0 : Mt.subscription
        ), _t = dt.notifyNestedSubs.bind(dt);
        return [dt, _t];
      }, [at, Ie, Mt]), M = pn.useMemo(() => Ie ? Mt : {
        ...Mt,
        subscription: pe
      }, [Ie, Mt, pe]), R = pn.useRef(), O = pn.useRef(mt), U = pn.useRef(), Z = pn.useRef(!1);
      pn.useRef(!1);
      const le = pn.useRef(!1), we = pn.useRef();
      Km(() => (le.current = !0, () => {
        le.current = !1;
      }), []);
      const xe = pn.useMemo(() => () => U.current && mt === O.current ? U.current : Ne(at.getState(), mt), [at, mt]), Re = pn.useMemo(() => (_t) => pe ? dM(
        be,
        at,
        pe,
        // @ts-ignore
        Ne,
        O,
        R,
        Z,
        le,
        U,
        $e,
        _t
      ) : () => {
      }, [pe]);
      cM(fM, [
        O,
        R,
        Z,
        mt,
        U,
        $e
      ]);
      let vt;
      try {
        vt = zT(
          // TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
          Re,
          // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
          // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
          xe,
          Ct ? () => Ne(Ct(), mt) : xe
        );
      } catch (dt) {
        throw we.current && (dt.message += `
The error may be correlated with this previous error:
${we.current.stack}

`), dt;
      }
      Km(() => {
        we.current = void 0, U.current = void 0, R.current = vt;
      });
      const zt = pn.useMemo(() => (
        // @ts-ignore
        /* @__PURE__ */ pn.createElement(
          me,
          {
            ...vt,
            ref: qt
          }
        )
      ), [qt, me, vt]);
      return pn.useMemo(() => be ? /* @__PURE__ */ pn.createElement(yt.Provider, { value: M }, zt) : zt, [yt, zt, M]);
    }
    const Ke = pn.memo(Ze);
    if (Ke.WrappedComponent = me, Ke.displayName = Ze.displayName = Ae, Y) {
      const kt = pn.forwardRef(function(mt, yt) {
        return /* @__PURE__ */ pn.createElement(Ke, { ...mt, reactReduxForwardedRef: yt });
      });
      return kt.displayName = Ae, kt.WrappedComponent = me, /* @__PURE__ */ $E(kt, me);
    }
    return /* @__PURE__ */ $E(Ke, me);
  };
}
var hM = vM;
function mM({
  store: v,
  context: m,
  children: p,
  serverState: C,
  stabilityCheck: w = "once",
  identityFunctionCheck: N = "once"
}) {
  const S = pn.useMemo(() => {
    const $ = AT(v);
    return {
      store: v,
      subscription: $,
      getServerState: C ? () => C : void 0,
      stabilityCheck: w,
      identityFunctionCheck: N
    };
  }, [v, C, w, N]), te = pn.useMemo(() => v.getState(), [v]);
  Km(() => {
    const { subscription: $ } = S;
    return $.onStateChange = $.notifyNestedSubs, $.trySubscribe(), te !== v.getState() && $.notifyNestedSubs(), () => {
      $.tryUnsubscribe(), $.onStateChange = void 0;
    };
  }, [S, te]);
  const Y = m || wT;
  return /* @__PURE__ */ pn.createElement(Y.Provider, { value: S }, p);
}
var yM = mM;
oM(Ju.useSyncExternalStore);
xD(RD.unstable_batchedUpdates);
class jT {
  static create(m, p) {
    return new jT(m, p);
  }
  constructor(m, p) {
    this.duck = new m((p == null ? void 0 : p.prefix) ?? m.name), this.initReduxStore();
  }
  initReduxStore() {
    const m = this.duck, p = gD(), C = process.env.NODE_ENV === "development" ? qk.createLogger({ collapsed: !0 }) : () => (N) => (S) => N(S), w = Nk(
      m.combinedReducer,
      jk(p, C)
    );
    m.init(w.getState, w.dispatch), m.dispatch({ type: `${m.actionTypePrefix}/INIT@@${m.id}` }), p.run(ST(...m.streamers)), this.store = w, this.middleware = p;
  }
  connect(m) {
    const p = this, { duck: C, store: w } = this, S = hM(
      (te) => ({ store: te }),
      (te) => ({ dispatch: te })
    )(m);
    return function(te) {
      return Ju.useEffect(() => p[Symbol.dispose], []), /* @__PURE__ */ Fw.jsx(yM, { store: w, children: /* @__PURE__ */ Fw.jsx(S, { ...te, duck: C }) });
    };
  }
  [Symbol.dispose]() {
    const { duck: m } = this;
    m.dispatch({ type: `${m.actionTypePrefix}/END@@${m.id}` }), this.middleware.close();
  }
}
function _M(v) {
  return (m) => ({
    type: v,
    payload: m
  });
}
function xM(v, m) {
  return (p = m, C) => C.type === v ? C.payload : p;
}
function oT(v) {
  return (m) => ({
    type: v,
    payload: m
  });
}
function gM(v) {
  const m = Array.isArray(v) ? v : [v];
  return (p) => new Gm(
    (C) => p.subscribe({
      next: (w) => m.includes(w.type) && C.next(w),
      error: C.error,
      complete: C.complete
    })
  );
}
function OM(v) {
  return (m) => new Gm((p) => {
    m.subscribe({
      next: (C) => {
        v(C), p.next(C);
      },
      error: p.error,
      complete: p.complete
    });
  });
}
var SM = Object.defineProperty, EM = Object.getOwnPropertyDescriptor, CM = (v, m, p, C) => {
  for (var w = C > 1 ? void 0 : C ? EM(m, p) : m, N = v.length - 1, S; N >= 0; N--)
    (S = v[N]) && (w = (C ? S(m, p, w) : S(w)) || w);
  return C && w && SM(m, p, w), w;
}, PT = /* @__PURE__ */ ((v) => (v[v.FETCH_START = 0] = "FETCH_START", v[v.FETCH_DONE = 1] = "FETCH_DONE", v[v.FETCH_ERROR = 2] = "FETCH_ERROR", v[v.FETCHING = 3] = "FETCHING", v[v.RELOAD = 4] = "RELOAD", v))(PT || {});
class bM extends IE {
  constructor() {
    super(...arguments), this.param = null;
  }
  get quickTypes() {
    return {
      ...super.quickTypes,
      ...PT
    };
  }
  get reducers() {
    const m = this.types;
    return {
      data: (p = null, C) => {
        switch (C.type) {
          case m.FETCH_DONE:
            return C.payload;
          case m.FETCH_ERROR:
            return null;
          default:
            return p;
        }
      },
      error: (p = null, C) => {
        switch (C.type) {
          case m.FETCH_ERROR:
            return C.payload;
          case m.FETCH_DONE:
            return null;
          default:
            return p;
        }
      },
      loading: (p = !1, C) => {
        switch (C.type) {
          case m.FETCHING:
            return C.payload;
          case m.FETCH_START:
          case m.RELOAD:
            return !0;
          case m.FETCH_DONE:
          case m.FETCH_ERROR:
            return !1;
          default:
            return p;
        }
      }
    };
  }
  get creators() {
    const m = this.types;
    return {
      ...super.creators,
      fetch: oT(m.FETCH_START),
      reload: oT(m.RELOAD)
    };
  }
  fetch(m) {
    const p = this, { types: C, dispatch: w } = p;
    return m.pipe(gM([C.FETCH_START, C.RELOAD])).subscribe((N) => {
      C.FETCH_START && (p.param = N == null ? void 0 : N.payload), p.getData(p.param).then((S) => w({ type: C.FETCH_DONE, payload: S })).catch((S) => w({ type: C.FETCH_ERROR, payload: S }));
    });
  }
}
CM([
  Fk()
], bM.prototype, "fetch", 1);
export {
  IE as Base,
  cT as Cache,
  bM as FetcherDuck,
  jT as Runtime,
  Fk as StreamerMethod,
  Lw as collectStreamers,
  ST as combineStreamers,
  _M as createPayloadAction,
  gD as createStreamMiddleware,
  oT as createToPayload,
  OM as effect,
  gM as filterAction,
  xM as reduceFromPayload
};
