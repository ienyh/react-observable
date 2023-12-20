function Zt(n) {
  return `Minified Redux error #${n}; visit https://redux.js.org/Errors?code=${n} for the full message or use the non-minified dev environment for full errors. `;
}
var Kt = () => Math.random().toString(36).substring(7).split("").join("."), Cn = {
  INIT: `@@redux/INIT${/* @__PURE__ */ Kt()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ Kt()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Kt()}`
}, St = Cn;
function Pn(n) {
  if (typeof n != "object" || n === null)
    return !1;
  let r = n;
  for (; Object.getPrototypeOf(r) !== null; )
    r = Object.getPrototypeOf(r);
  return Object.getPrototypeOf(n) === r;
}
function xn(n) {
  if (n === void 0)
    return "undefined";
  if (n === null)
    return "null";
  const r = typeof n;
  switch (r) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function":
      return r;
  }
  if (Array.isArray(n))
    return "array";
  if (Dn(n))
    return "date";
  if (An(n))
    return "error";
  const t = jn(n);
  switch (t) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return t;
  }
  return Object.prototype.toString.call(n).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function jn(n) {
  return typeof n.constructor == "function" ? n.constructor.name : null;
}
function An(n) {
  return n instanceof Error || typeof n.message == "string" && n.constructor && typeof n.constructor.stackTraceLimit == "number";
}
function Dn(n) {
  return n instanceof Date ? !0 : typeof n.toDateString == "function" && typeof n.getDate == "function" && typeof n.setDate == "function";
}
function Mn(n) {
  let r = typeof n;
  return process.env.NODE_ENV !== "production" && (r = xn(n)), r;
}
function jr(n) {
  typeof console < "u" && typeof console.error == "function" && console.error(n);
  try {
    throw new Error(n);
  } catch {
  }
}
function In(n, r, t, o) {
  const s = Object.keys(r), b = t && t.type === St.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (s.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!Pn(n))
    return `The ${b} has unexpected type of "${Mn(n)}". Expected argument to be an object with the following keys: "${s.join('", "')}"`;
  const _ = Object.keys(n).filter((k) => !r.hasOwnProperty(k) && !o[k]);
  if (_.forEach((k) => {
    o[k] = !0;
  }), !(t && t.type === St.REPLACE) && _.length > 0)
    return `Unexpected ${_.length > 1 ? "keys" : "key"} "${_.join('", "')}" found in ${b}. Expected to find one of the known reducer keys instead: "${s.join('", "')}". Unexpected keys will be ignored.`;
}
function Fn(n) {
  Object.keys(n).forEach((r) => {
    const t = n[r];
    if (typeof t(void 0, {
      type: St.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Zt(12) : `The slice reducer for key "${r}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof t(void 0, {
      type: St.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Zt(13) : `The slice reducer for key "${r}" returned undefined when probed with a random type. Don't try to handle '${St.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function $n(n) {
  const r = Object.keys(n), t = {};
  for (let _ = 0; _ < r.length; _++) {
    const k = r[_];
    process.env.NODE_ENV !== "production" && typeof n[k] > "u" && jr(`No reducer provided for key "${k}"`), typeof n[k] == "function" && (t[k] = n[k]);
  }
  const o = Object.keys(t);
  let s;
  process.env.NODE_ENV !== "production" && (s = {});
  let b;
  try {
    Fn(t);
  } catch (_) {
    b = _;
  }
  return function(k = {}, F) {
    if (b)
      throw b;
    if (process.env.NODE_ENV !== "production") {
      const U = In(k, t, F, s);
      U && jr(U);
    }
    let Y = !1;
    const N = {};
    for (let U = 0; U < o.length; U++) {
      const z = o[U], ne = t[z], ge = k[z], Q = ne(ge, F);
      if (typeof Q > "u") {
        const me = F && F.type;
        throw new Error(process.env.NODE_ENV === "production" ? Zt(14) : `When called with an action of type ${me ? `"${String(me)}"` : "(unknown type)"}, the slice reducer for key "${z}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      N[z] = Q, Y = Y || Q !== ge;
    }
    return Y = Y || o.length !== Object.keys(k).length, Y ? N : k;
  };
}
var st = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
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
var Ar;
(function(n) {
  (function(r) {
    var t = typeof globalThis == "object" ? globalThis : typeof st == "object" ? st : typeof self == "object" ? self : typeof this == "object" ? this : k(), o = s(n);
    typeof t.Reflect < "u" && (o = s(t.Reflect, o)), r(o, t), typeof t.Reflect > "u" && (t.Reflect = n);
    function s(F, Y) {
      return function(N, U) {
        Object.defineProperty(F, N, { configurable: !0, writable: !0, value: U }), Y && Y(N, U);
      };
    }
    function b() {
      try {
        return Function("return this;")();
      } catch {
      }
    }
    function _() {
      try {
        return (0, eval)("(function() { return this; })()");
      } catch {
      }
    }
    function k() {
      return b() || _();
    }
  })(function(r, t) {
    var o = Object.prototype.hasOwnProperty, s = typeof Symbol == "function", b = s && typeof Symbol.toPrimitive < "u" ? Symbol.toPrimitive : "@@toPrimitive", _ = s && typeof Symbol.iterator < "u" ? Symbol.iterator : "@@iterator", k = typeof Object.create == "function", F = { __proto__: [] } instanceof Array, Y = !k && !F, N = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: k ? function() {
        return Je(/* @__PURE__ */ Object.create(null));
      } : F ? function() {
        return Je({ __proto__: null });
      } : function() {
        return Je({});
      },
      has: Y ? function(f, p) {
        return o.call(f, p);
      } : function(f, p) {
        return p in f;
      },
      get: Y ? function(f, p) {
        return o.call(f, p) ? f[p] : void 0;
      } : function(f, p) {
        return f[p];
      }
    }, U = Object.getPrototypeOf(Function), z = typeof Map == "function" && typeof Map.prototype.entries == "function" ? Map : Ne(), ne = typeof Set == "function" && typeof Set.prototype.entries == "function" ? Set : ot(), ge = typeof WeakMap == "function" ? WeakMap : Ze(), Q = s ? Symbol.for("@reflect-metadata:registry") : void 0, me = nt(), Me = it(me);
    function fe(f, p, y, w) {
      if (c(y)) {
        if (!Se(f))
          throw new TypeError();
        if (!_e(p))
          throw new TypeError();
        return Be(f, p);
      } else {
        if (!Se(f))
          throw new TypeError();
        if (!E(p))
          throw new TypeError();
        if (!E(w) && !c(w) && !l(w))
          throw new TypeError();
        return l(w) && (w = void 0), y = re(y), ke(f, p, y, w);
      }
    }
    r("decorate", fe);
    function Ke(f, p) {
      function y(w, A) {
        if (!E(w))
          throw new TypeError();
        if (!c(A) && !ee(A))
          throw new TypeError();
        Fe(f, p, w, A);
      }
      return y;
    }
    r("metadata", Ke);
    function Ue(f, p, y, w) {
      if (!E(y))
        throw new TypeError();
      return c(w) || (w = re(w)), Fe(f, p, y, w);
    }
    r("defineMetadata", Ue);
    function ue(f, p, y) {
      if (!E(p))
        throw new TypeError();
      return c(y) || (y = re(y)), we(f, p, y);
    }
    r("hasMetadata", ue);
    function Te(f, p, y) {
      if (!E(p))
        throw new TypeError();
      return c(y) || (y = re(y)), ie(f, p, y);
    }
    r("hasOwnMetadata", Te);
    function Ve(f, p, y) {
      if (!E(p))
        throw new TypeError();
      return c(y) || (y = re(y)), xe(f, p, y);
    }
    r("getMetadata", Ve);
    function Ye(f, p, y) {
      if (!E(p))
        throw new TypeError();
      return c(y) || (y = re(y)), $(f, p, y);
    }
    r("getOwnMetadata", Ye);
    function He(f, p) {
      if (!E(f))
        throw new TypeError();
      return c(p) || (p = re(p)), ze(f, p);
    }
    r("getMetadataKeys", He);
    function Ie(f, p) {
      if (!E(f))
        throw new TypeError();
      return c(p) || (p = re(p)), d(f, p);
    }
    r("getOwnMetadataKeys", Ie);
    function rt(f, p, y) {
      if (!E(p))
        throw new TypeError();
      if (c(y) || (y = re(y)), !E(p))
        throw new TypeError();
      c(y) || (y = re(y));
      var w = je(
        p,
        y,
        /*Create*/
        !1
      );
      return c(w) ? !1 : w.OrdinaryDeleteMetadata(f, p, y);
    }
    r("deleteMetadata", rt);
    function Be(f, p) {
      for (var y = f.length - 1; y >= 0; --y) {
        var w = f[y], A = w(p);
        if (!c(A) && !l(A)) {
          if (!_e(A))
            throw new TypeError();
          p = A;
        }
      }
      return p;
    }
    function ke(f, p, y, w) {
      for (var A = f.length - 1; A >= 0; --A) {
        var ae = f[A], he = ae(p, y, w);
        if (!c(he) && !l(he)) {
          if (!E(he))
            throw new TypeError();
          w = he;
        }
      }
      return w;
    }
    function we(f, p, y) {
      var w = ie(f, p, y);
      if (w)
        return !0;
      var A = We(p);
      return l(A) ? !1 : we(f, A, y);
    }
    function ie(f, p, y) {
      var w = je(
        p,
        y,
        /*Create*/
        !1
      );
      return c(w) ? !1 : x(w.OrdinaryHasOwnMetadata(f, p, y));
    }
    function xe(f, p, y) {
      var w = ie(f, p, y);
      if (w)
        return $(f, p, y);
      var A = We(p);
      if (!l(A))
        return xe(f, A, y);
    }
    function $(f, p, y) {
      var w = je(
        p,
        y,
        /*Create*/
        !1
      );
      if (!c(w))
        return w.OrdinaryGetOwnMetadata(f, p, y);
    }
    function Fe(f, p, y, w) {
      var A = je(
        y,
        w,
        /*Create*/
        !0
      );
      A.OrdinaryDefineOwnMetadata(f, p, y, w);
    }
    function ze(f, p) {
      var y = d(f, p), w = We(f);
      if (w === null)
        return y;
      var A = ze(w, p);
      if (A.length <= 0)
        return y;
      if (y.length <= 0)
        return A;
      for (var ae = new ne(), he = [], H = 0, O = y; H < O.length; H++) {
        var j = O[H], T = ae.has(j);
        T || (ae.add(j), he.push(j));
      }
      for (var C = 0, W = A; C < W.length; C++) {
        var j = W[C], T = ae.has(j);
        T || (ae.add(j), he.push(j));
      }
      return he;
    }
    function d(f, p) {
      var y = je(
        f,
        p,
        /*create*/
        !1
      );
      return y ? y.OrdinaryOwnMetadataKeys(f, p) : [];
    }
    function i(f) {
      if (f === null)
        return 1;
      switch (typeof f) {
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
          return f === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function c(f) {
      return f === void 0;
    }
    function l(f) {
      return f === null;
    }
    function g(f) {
      return typeof f == "symbol";
    }
    function E(f) {
      return typeof f == "object" ? f !== null : typeof f == "function";
    }
    function D(f, p) {
      switch (i(f)) {
        case 0:
          return f;
        case 1:
          return f;
        case 2:
          return f;
        case 3:
          return f;
        case 4:
          return f;
        case 5:
          return f;
      }
      var y = p === 3 ? "string" : p === 5 ? "number" : "default", w = Oe(f, b);
      if (w !== void 0) {
        var A = w.call(f, y);
        if (E(A))
          throw new TypeError();
        return A;
      }
      return P(f, y === "default" ? "number" : y);
    }
    function P(f, p) {
      if (p === "string") {
        var y = f.toString;
        if (se(y)) {
          var w = y.call(f);
          if (!E(w))
            return w;
        }
        var A = f.valueOf;
        if (se(A)) {
          var w = A.call(f);
          if (!E(w))
            return w;
        }
      } else {
        var A = f.valueOf;
        if (se(A)) {
          var w = A.call(f);
          if (!E(w))
            return w;
        }
        var ae = f.toString;
        if (se(ae)) {
          var w = ae.call(f);
          if (!E(w))
            return w;
        }
      }
      throw new TypeError();
    }
    function x(f) {
      return !!f;
    }
    function K(f) {
      return "" + f;
    }
    function re(f) {
      var p = D(
        f,
        3
        /* String */
      );
      return g(p) ? p : K(p);
    }
    function Se(f) {
      return Array.isArray ? Array.isArray(f) : f instanceof Object ? f instanceof Array : Object.prototype.toString.call(f) === "[object Array]";
    }
    function se(f) {
      return typeof f == "function";
    }
    function _e(f) {
      return typeof f == "function";
    }
    function ee(f) {
      switch (i(f)) {
        case 3:
          return !0;
        case 4:
          return !0;
        default:
          return !1;
      }
    }
    function Pe(f, p) {
      return f === p || f !== f && p !== p;
    }
    function Oe(f, p) {
      var y = f[p];
      if (y != null) {
        if (!se(y))
          throw new TypeError();
        return y;
      }
    }
    function te(f) {
      var p = Oe(f, _);
      if (!se(p))
        throw new TypeError();
      var y = p.call(f);
      if (!E(y))
        throw new TypeError();
      return y;
    }
    function Ge(f) {
      return f.value;
    }
    function $e(f) {
      var p = f.next();
      return p.done ? !1 : p;
    }
    function Ee(f) {
      var p = f.return;
      p && p.call(f);
    }
    function We(f) {
      var p = Object.getPrototypeOf(f);
      if (typeof f != "function" || f === U || p !== U)
        return p;
      var y = f.prototype, w = y && Object.getPrototypeOf(y);
      if (w == null || w === Object.prototype)
        return p;
      var A = w.constructor;
      return typeof A != "function" || A === f ? p : A;
    }
    function Ce() {
      var f;
      !c(Q) && typeof t.Reflect < "u" && !(Q in t.Reflect) && typeof t.Reflect.defineMetadata == "function" && (f = Xe(t.Reflect));
      var p, y, w, A = new ge(), ae = {
        registerProvider: he,
        getProvider: O,
        setProvider: T
      };
      return ae;
      function he(C) {
        if (!Object.isExtensible(ae))
          throw new Error("Cannot add provider to a frozen registry.");
        switch (!0) {
          case f === C:
            break;
          case c(p):
            p = C;
            break;
          case p === C:
            break;
          case c(y):
            y = C;
            break;
          case y === C:
            break;
          default:
            w === void 0 && (w = new ne()), w.add(C);
            break;
        }
      }
      function H(C, W) {
        if (!c(p)) {
          if (p.isProviderFor(C, W))
            return p;
          if (!c(y)) {
            if (y.isProviderFor(C, W))
              return p;
            if (!c(w))
              for (var X = te(w); ; ) {
                var le = $e(X);
                if (!le)
                  return;
                var Le = Ge(le);
                if (Le.isProviderFor(C, W))
                  return Ee(X), Le;
              }
          }
        }
        if (!c(f) && f.isProviderFor(C, W))
          return f;
      }
      function O(C, W) {
        var X = A.get(C), le;
        return c(X) || (le = X.get(W)), c(le) && (le = H(C, W), c(le) || (c(X) && (X = new z(), A.set(C, X)), X.set(W, le))), le;
      }
      function j(C) {
        if (c(C))
          throw new TypeError();
        return p === C || y === C || !c(w) && w.has(C);
      }
      function T(C, W, X) {
        if (!j(X))
          throw new Error("Metadata provider not registered.");
        var le = O(C, W);
        if (le !== X) {
          if (!c(le))
            return !1;
          var Le = A.get(C);
          c(Le) && (Le = new z(), A.set(C, Le)), Le.set(W, X);
        }
        return !0;
      }
    }
    function nt() {
      var f;
      return !c(Q) && E(t.Reflect) && Object.isExtensible(t.Reflect) && (f = t.Reflect[Q]), c(f) && (f = Ce()), !c(Q) && E(t.Reflect) && Object.isExtensible(t.Reflect) && Object.defineProperty(t.Reflect, Q, {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: f
      }), f;
    }
    function it(f) {
      var p = new ge(), y = {
        isProviderFor: function(j, T) {
          var C = p.get(j);
          return c(C) ? !1 : C.has(T);
        },
        OrdinaryDefineOwnMetadata: he,
        OrdinaryHasOwnMetadata: A,
        OrdinaryGetOwnMetadata: ae,
        OrdinaryOwnMetadataKeys: H,
        OrdinaryDeleteMetadata: O
      };
      return me.registerProvider(y), y;
      function w(j, T, C) {
        var W = p.get(j), X = !1;
        if (c(W)) {
          if (!C)
            return;
          W = new z(), p.set(j, W), X = !0;
        }
        var le = W.get(T);
        if (c(le)) {
          if (!C)
            return;
          if (le = new z(), W.set(T, le), !f.setProvider(j, T, y))
            throw W.delete(T), X && p.delete(j), new Error("Wrong provider for target.");
        }
        return le;
      }
      function A(j, T, C) {
        var W = w(
          T,
          C,
          /*Create*/
          !1
        );
        return c(W) ? !1 : x(W.has(j));
      }
      function ae(j, T, C) {
        var W = w(
          T,
          C,
          /*Create*/
          !1
        );
        if (!c(W))
          return W.get(j);
      }
      function he(j, T, C, W) {
        var X = w(
          C,
          W,
          /*Create*/
          !0
        );
        X.set(j, T);
      }
      function H(j, T) {
        var C = [], W = w(
          j,
          T,
          /*Create*/
          !1
        );
        if (c(W))
          return C;
        for (var X = W.keys(), le = te(X), Le = 0; ; ) {
          var ct = $e(le);
          if (!ct)
            return C.length = Le, C;
          var ft = Ge(ct);
          try {
            C[Le] = ft;
          } catch (lt) {
            try {
              Ee(le);
            } finally {
              throw lt;
            }
          }
          Le++;
        }
      }
      function O(j, T, C) {
        var W = w(
          T,
          C,
          /*Create*/
          !1
        );
        if (c(W) || !W.delete(j))
          return !1;
        if (W.size === 0) {
          var X = p.get(T);
          c(X) || (X.delete(C), X.size === 0 && p.delete(X));
        }
        return !0;
      }
    }
    function Xe(f) {
      var p = f.defineMetadata, y = f.hasOwnMetadata, w = f.getOwnMetadata, A = f.getOwnMetadataKeys, ae = f.deleteMetadata, he = new ge(), H = {
        isProviderFor: function(O, j) {
          var T = he.get(O);
          return c(T) ? A(O, j).length ? (c(T) && (T = new ne(), he.set(O, T)), T.add(j), !0) : !1 : T.has(j);
        },
        OrdinaryDefineOwnMetadata: p,
        OrdinaryHasOwnMetadata: y,
        OrdinaryGetOwnMetadata: w,
        OrdinaryOwnMetadataKeys: A,
        OrdinaryDeleteMetadata: ae
      };
      return H;
    }
    function je(f, p, y) {
      var w = me.getProvider(f, p);
      if (!c(w))
        return w;
      if (y) {
        if (me.setProvider(f, p, Me))
          return Me;
        throw new Error("Illegal state.");
      }
    }
    function Ne() {
      var f = {}, p = [], y = (
        /** @class */
        function() {
          function H(O, j, T) {
            this._index = 0, this._keys = O, this._values = j, this._selector = T;
          }
          return H.prototype["@@iterator"] = function() {
            return this;
          }, H.prototype[_] = function() {
            return this;
          }, H.prototype.next = function() {
            var O = this._index;
            if (O >= 0 && O < this._keys.length) {
              var j = this._selector(this._keys[O], this._values[O]);
              return O + 1 >= this._keys.length ? (this._index = -1, this._keys = p, this._values = p) : this._index++, { value: j, done: !1 };
            }
            return { value: void 0, done: !0 };
          }, H.prototype.throw = function(O) {
            throw this._index >= 0 && (this._index = -1, this._keys = p, this._values = p), O;
          }, H.prototype.return = function(O) {
            return this._index >= 0 && (this._index = -1, this._keys = p, this._values = p), { value: O, done: !0 };
          }, H;
        }()
      ), w = (
        /** @class */
        function() {
          function H() {
            this._keys = [], this._values = [], this._cacheKey = f, this._cacheIndex = -2;
          }
          return Object.defineProperty(H.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: !0,
            configurable: !0
          }), H.prototype.has = function(O) {
            return this._find(
              O,
              /*insert*/
              !1
            ) >= 0;
          }, H.prototype.get = function(O) {
            var j = this._find(
              O,
              /*insert*/
              !1
            );
            return j >= 0 ? this._values[j] : void 0;
          }, H.prototype.set = function(O, j) {
            var T = this._find(
              O,
              /*insert*/
              !0
            );
            return this._values[T] = j, this;
          }, H.prototype.delete = function(O) {
            var j = this._find(
              O,
              /*insert*/
              !1
            );
            if (j >= 0) {
              for (var T = this._keys.length, C = j + 1; C < T; C++)
                this._keys[C - 1] = this._keys[C], this._values[C - 1] = this._values[C];
              return this._keys.length--, this._values.length--, Pe(O, this._cacheKey) && (this._cacheKey = f, this._cacheIndex = -2), !0;
            }
            return !1;
          }, H.prototype.clear = function() {
            this._keys.length = 0, this._values.length = 0, this._cacheKey = f, this._cacheIndex = -2;
          }, H.prototype.keys = function() {
            return new y(this._keys, this._values, A);
          }, H.prototype.values = function() {
            return new y(this._keys, this._values, ae);
          }, H.prototype.entries = function() {
            return new y(this._keys, this._values, he);
          }, H.prototype["@@iterator"] = function() {
            return this.entries();
          }, H.prototype[_] = function() {
            return this.entries();
          }, H.prototype._find = function(O, j) {
            if (!Pe(this._cacheKey, O)) {
              this._cacheIndex = -1;
              for (var T = 0; T < this._keys.length; T++)
                if (Pe(this._keys[T], O)) {
                  this._cacheIndex = T;
                  break;
                }
            }
            return this._cacheIndex < 0 && j && (this._cacheIndex = this._keys.length, this._keys.push(O), this._values.push(void 0)), this._cacheIndex;
          }, H;
        }()
      );
      return w;
      function A(H, O) {
        return H;
      }
      function ae(H, O) {
        return O;
      }
      function he(H, O) {
        return [H, O];
      }
    }
    function ot() {
      var f = (
        /** @class */
        function() {
          function p() {
            this._map = new z();
          }
          return Object.defineProperty(p.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: !0,
            configurable: !0
          }), p.prototype.has = function(y) {
            return this._map.has(y);
          }, p.prototype.add = function(y) {
            return this._map.set(y, y), this;
          }, p.prototype.delete = function(y) {
            return this._map.delete(y);
          }, p.prototype.clear = function() {
            this._map.clear();
          }, p.prototype.keys = function() {
            return this._map.keys();
          }, p.prototype.values = function() {
            return this._map.keys();
          }, p.prototype.entries = function() {
            return this._map.entries();
          }, p.prototype["@@iterator"] = function() {
            return this.keys();
          }, p.prototype[_] = function() {
            return this.keys();
          }, p;
        }()
      );
      return f;
    }
    function Ze() {
      var f = 16, p = N.create(), y = w();
      return (
        /** @class */
        function() {
          function O() {
            this._key = w();
          }
          return O.prototype.has = function(j) {
            var T = A(
              j,
              /*create*/
              !1
            );
            return T !== void 0 ? N.has(T, this._key) : !1;
          }, O.prototype.get = function(j) {
            var T = A(
              j,
              /*create*/
              !1
            );
            return T !== void 0 ? N.get(T, this._key) : void 0;
          }, O.prototype.set = function(j, T) {
            var C = A(
              j,
              /*create*/
              !0
            );
            return C[this._key] = T, this;
          }, O.prototype.delete = function(j) {
            var T = A(
              j,
              /*create*/
              !1
            );
            return T !== void 0 ? delete T[this._key] : !1;
          }, O.prototype.clear = function() {
            this._key = w();
          }, O;
        }()
      );
      function w() {
        var O;
        do
          O = "@@WeakMap@@" + H();
        while (N.has(p, O));
        return p[O] = !0, O;
      }
      function A(O, j) {
        if (!o.call(O, y)) {
          if (!j)
            return;
          Object.defineProperty(O, y, { value: N.create() });
        }
        return O[y];
      }
      function ae(O, j) {
        for (var T = 0; T < j; ++T)
          O[T] = Math.random() * 255 | 0;
        return O;
      }
      function he(O) {
        return typeof Uint8Array == "function" ? typeof crypto < "u" ? crypto.getRandomValues(new Uint8Array(O)) : typeof msCrypto < "u" ? msCrypto.getRandomValues(new Uint8Array(O)) : ae(new Uint8Array(O), O) : ae(new Array(O), O);
      }
      function H() {
        var O = he(f);
        O[6] = O[6] & 79 | 64, O[8] = O[8] & 191 | 128;
        for (var j = "", T = 0; T < f; ++T) {
          var C = O[T];
          (T === 4 || T === 6 || T === 8) && (j += "-"), C < 16 && (j += "0"), j += C.toString(16).toLowerCase();
        }
        return j;
      }
    }
    function Je(f) {
      return f.__ = void 0, delete f.__, f;
    }
  });
})(Ar || (Ar = {}));
const er = Symbol("streamer_methods_with_metadata"), Nn = (n = !0) => (r, t, o) => {
  const s = Reflect.getMetadata(er, r) || [];
  s.push(t), Reflect.defineMetadata(er, s, r);
};
function Dr(n) {
  return (Reflect.getMetadata(er, n) || []).map((t) => n[t]);
}
function Br(n = 1 / 0) {
  return function(r, t, o) {
    const s = o.get !== void 0, b = s ? o.get : o.value, _ = Symbol(`__cache__${String(t)}`), k = Symbol(`__cacheExpire__${String(t)}`);
    function F(N, U) {
      N[_] = U, N[k] = Date.now() + n;
    }
    function Y(N) {
      return N[k] && (N[k] > Date.now() || n === 1 / 0);
    }
    s ? o.get = function() {
      if (Y(this))
        return this[_];
      const N = b.apply(this);
      return F(this, N), N;
    } : o.value = function(...N) {
      if (Y(this))
        return this[_];
      const U = b.apply(this, N);
      return F(this, U), U;
    };
  };
}
var Ln = Object.defineProperty, Un = Object.getOwnPropertyDescriptor, Gr = (n, r, t, o) => {
  for (var s = o > 1 ? void 0 : o ? Un(r, t) : r, b = n.length - 1, _; b >= 0; b--)
    (_ = n[b]) && (s = (o ? _(r, t, s) : _(s)) || s);
  return o && s && Ln(r, t, s), s;
};
class ar {
  constructor(r) {
    this.id = Wn(), this.actionTypePrefix = r;
  }
  init(r, t) {
    this.getState = r, this.dispatch = t;
    const o = this.ducks, s = (b, _) => () => b()[_];
    Object.keys(o).forEach((b) => {
      o[b].init(s(r, b), t);
    });
  }
  get quickTypes() {
    return {};
  }
  get types() {
    return Vn(this.actionTypePrefix, this.quickTypes);
  }
  get reducers() {
    return {};
  }
  get streamers() {
    const r = this, t = [...Dr(r).map((o) => o.bind(r))];
    return Object.keys(r.ducks).forEach((o) => {
      const s = r.ducks[o];
      t.push(...Dr(s).map((b) => b.bind(s)));
    }), t;
  }
  get creators() {
    return {};
  }
  get quickDucks() {
    return {};
  }
  get ducks() {
    return Yn(this.quickDucks, this.actionTypePrefix);
  }
  get combinedReducer() {
    const r = {
      ...this.reducers
    }, t = this.ducks;
    return Object.keys(t).forEach((o) => {
      r[o] = t[o].combinedReducer;
    }), $n(r);
  }
}
Gr([
  Br()
], ar.prototype, "types", 1);
Gr([
  Br()
], ar.prototype, "ducks", 1);
function Wn() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(n) {
    const r = Math.random() * 16 | 0;
    return (n === "x" ? r : r & 3 | 8).toString(16);
  });
}
function Vn(n, r) {
  let t = [];
  const o = {};
  return r && (t = t.concat(Object.keys(r))), t.forEach((s) => {
    o[s] = `${n}/${s}`;
  }), o;
}
function Yn(n, r) {
  const t = {};
  for (const o of Object.keys(n)) {
    let s = n[o];
    t[o] = new s(`${r}/${s.name}`);
  }
  return t;
}
var _t = {}, tr = { exports: {} }, wt = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
wt.exports;
var Mr;
function Hn() {
  return Mr || (Mr = 1, function(n, r) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var t = "18.2.0", o = Symbol.for("react.element"), s = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), F = Symbol.for("react.provider"), Y = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), z = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), ge = Symbol.for("react.lazy"), Q = Symbol.for("react.offscreen"), me = Symbol.iterator, Me = "@@iterator";
      function fe(e) {
        if (e === null || typeof e != "object")
          return null;
        var a = me && e[me] || e[Me];
        return typeof a == "function" ? a : null;
      }
      var Ke = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ue = {
        transition: null
      }, ue = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Te = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ve = {}, Ye = null;
      function He(e) {
        Ye = e;
      }
      Ve.setExtraStackFrame = function(e) {
        Ye = e;
      }, Ve.getCurrentStack = null, Ve.getStackAddendum = function() {
        var e = "";
        Ye && (e += Ye);
        var a = Ve.getCurrentStack;
        return a && (e += a() || ""), e;
      };
      var Ie = !1, rt = !1, Be = !1, ke = !1, we = !1, ie = {
        ReactCurrentDispatcher: Ke,
        ReactCurrentBatchConfig: Ue,
        ReactCurrentOwner: Te
      };
      ie.ReactDebugCurrentFrame = Ve, ie.ReactCurrentActQueue = ue;
      function xe(e) {
        {
          for (var a = arguments.length, h = new Array(a > 1 ? a - 1 : 0), v = 1; v < a; v++)
            h[v - 1] = arguments[v];
          Fe("warn", e, h);
        }
      }
      function $(e) {
        {
          for (var a = arguments.length, h = new Array(a > 1 ? a - 1 : 0), v = 1; v < a; v++)
            h[v - 1] = arguments[v];
          Fe("error", e, h);
        }
      }
      function Fe(e, a, h) {
        {
          var v = ie.ReactDebugCurrentFrame, S = v.getStackAddendum();
          S !== "" && (a += "%s", h = h.concat([S]));
          var L = h.map(function(I) {
            return String(I);
          });
          L.unshift("Warning: " + a), Function.prototype.apply.call(console[e], console, L);
        }
      }
      var ze = {};
      function d(e, a) {
        {
          var h = e.constructor, v = h && (h.displayName || h.name) || "ReactClass", S = v + "." + a;
          if (ze[S])
            return;
          $("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", a, v), ze[S] = !0;
        }
      }
      var i = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(e) {
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
        enqueueForceUpdate: function(e, a, h) {
          d(e, "forceUpdate");
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
        enqueueReplaceState: function(e, a, h, v) {
          d(e, "replaceState");
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
        enqueueSetState: function(e, a, h, v) {
          d(e, "setState");
        }
      }, c = Object.assign, l = {};
      Object.freeze(l);
      function g(e, a, h) {
        this.props = e, this.context = a, this.refs = l, this.updater = h || i;
      }
      g.prototype.isReactComponent = {}, g.prototype.setState = function(e, a) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, a, "setState");
      }, g.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var E = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, D = function(e, a) {
          Object.defineProperty(g.prototype, e, {
            get: function() {
              xe("%s(...) is deprecated in plain JavaScript React classes. %s", a[0], a[1]);
            }
          });
        };
        for (var P in E)
          E.hasOwnProperty(P) && D(P, E[P]);
      }
      function x() {
      }
      x.prototype = g.prototype;
      function K(e, a, h) {
        this.props = e, this.context = a, this.refs = l, this.updater = h || i;
      }
      var re = K.prototype = new x();
      re.constructor = K, c(re, g.prototype), re.isPureReactComponent = !0;
      function Se() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var se = Array.isArray;
      function _e(e) {
        return se(e);
      }
      function ee(e) {
        {
          var a = typeof Symbol == "function" && Symbol.toStringTag, h = a && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return h;
        }
      }
      function Pe(e) {
        try {
          return Oe(e), !1;
        } catch {
          return !0;
        }
      }
      function Oe(e) {
        return "" + e;
      }
      function te(e) {
        if (Pe(e))
          return $("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ee(e)), Oe(e);
      }
      function Ge(e, a, h) {
        var v = e.displayName;
        if (v)
          return v;
        var S = a.displayName || a.name || "";
        return S !== "" ? h + "(" + S + ")" : h;
      }
      function $e(e) {
        return e.displayName || "Context";
      }
      function Ee(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && $("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case b:
            return "Fragment";
          case s:
            return "Portal";
          case k:
            return "Profiler";
          case _:
            return "StrictMode";
          case U:
            return "Suspense";
          case z:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case Y:
              var a = e;
              return $e(a) + ".Consumer";
            case F:
              var h = e;
              return $e(h._context) + ".Provider";
            case N:
              return Ge(e, e.render, "ForwardRef");
            case ne:
              var v = e.displayName || null;
              return v !== null ? v : Ee(e.type) || "Memo";
            case ge: {
              var S = e, L = S._payload, I = S._init;
              try {
                return Ee(I(L));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var We = Object.prototype.hasOwnProperty, Ce = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, nt, it, Xe;
      Xe = {};
      function je(e) {
        if (We.call(e, "ref")) {
          var a = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (a && a.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function Ne(e) {
        if (We.call(e, "key")) {
          var a = Object.getOwnPropertyDescriptor(e, "key").get;
          if (a && a.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function ot(e, a) {
        var h = function() {
          nt || (nt = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        h.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: h,
          configurable: !0
        });
      }
      function Ze(e, a) {
        var h = function() {
          it || (it = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        h.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: h,
          configurable: !0
        });
      }
      function Je(e) {
        if (typeof e.ref == "string" && Te.current && e.__self && Te.current.stateNode !== e.__self) {
          var a = Ee(Te.current.type);
          Xe[a] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', a, e.ref), Xe[a] = !0);
        }
      }
      var f = function(e, a, h, v, S, L, I) {
        var V = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: o,
          // Built-in properties that belong on the element
          type: e,
          key: a,
          ref: h,
          props: I,
          // Record the component responsible for creating this element.
          _owner: L
        };
        return V._store = {}, Object.defineProperty(V._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(V, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: v
        }), Object.defineProperty(V, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: S
        }), Object.freeze && (Object.freeze(V.props), Object.freeze(V)), V;
      };
      function p(e, a, h) {
        var v, S = {}, L = null, I = null, V = null, J = null;
        if (a != null) {
          je(a) && (I = a.ref, Je(a)), Ne(a) && (te(a.key), L = "" + a.key), V = a.__self === void 0 ? null : a.__self, J = a.__source === void 0 ? null : a.__source;
          for (v in a)
            We.call(a, v) && !Ce.hasOwnProperty(v) && (S[v] = a[v]);
        }
        var ce = arguments.length - 2;
        if (ce === 1)
          S.children = h;
        else if (ce > 1) {
          for (var de = Array(ce), pe = 0; pe < ce; pe++)
            de[pe] = arguments[pe + 2];
          Object.freeze && Object.freeze(de), S.children = de;
        }
        if (e && e.defaultProps) {
          var ye = e.defaultProps;
          for (v in ye)
            S[v] === void 0 && (S[v] = ye[v]);
        }
        if (L || I) {
          var Re = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          L && ot(S, Re), I && Ze(S, Re);
        }
        return f(e, L, I, V, J, Te.current, S);
      }
      function y(e, a) {
        var h = f(e.type, a, e.ref, e._self, e._source, e._owner, e.props);
        return h;
      }
      function w(e, a, h) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var v, S = c({}, e.props), L = e.key, I = e.ref, V = e._self, J = e._source, ce = e._owner;
        if (a != null) {
          je(a) && (I = a.ref, ce = Te.current), Ne(a) && (te(a.key), L = "" + a.key);
          var de;
          e.type && e.type.defaultProps && (de = e.type.defaultProps);
          for (v in a)
            We.call(a, v) && !Ce.hasOwnProperty(v) && (a[v] === void 0 && de !== void 0 ? S[v] = de[v] : S[v] = a[v]);
        }
        var pe = arguments.length - 2;
        if (pe === 1)
          S.children = h;
        else if (pe > 1) {
          for (var ye = Array(pe), Re = 0; Re < pe; Re++)
            ye[Re] = arguments[Re + 2];
          S.children = ye;
        }
        return f(e.type, L, I, V, J, ce, S);
      }
      function A(e) {
        return typeof e == "object" && e !== null && e.$$typeof === o;
      }
      var ae = ".", he = ":";
      function H(e) {
        var a = /[=:]/g, h = {
          "=": "=0",
          ":": "=2"
        }, v = e.replace(a, function(S) {
          return h[S];
        });
        return "$" + v;
      }
      var O = !1, j = /\/+/g;
      function T(e) {
        return e.replace(j, "$&/");
      }
      function C(e, a) {
        return typeof e == "object" && e !== null && e.key != null ? (te(e.key), H("" + e.key)) : a.toString(36);
      }
      function W(e, a, h, v, S) {
        var L = typeof e;
        (L === "undefined" || L === "boolean") && (e = null);
        var I = !1;
        if (e === null)
          I = !0;
        else
          switch (L) {
            case "string":
            case "number":
              I = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case o:
                case s:
                  I = !0;
              }
          }
        if (I) {
          var V = e, J = S(V), ce = v === "" ? ae + C(V, 0) : v;
          if (_e(J)) {
            var de = "";
            ce != null && (de = T(ce) + "/"), W(J, a, de, "", function(kn) {
              return kn;
            });
          } else
            J != null && (A(J) && (J.key && (!V || V.key !== J.key) && te(J.key), J = y(
              J,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              h + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (J.key && (!V || V.key !== J.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                T("" + J.key) + "/"
              ) : "") + ce
            )), a.push(J));
          return 1;
        }
        var pe, ye, Re = 0, De = v === "" ? ae : v + he;
        if (_e(e))
          for (var jt = 0; jt < e.length; jt++)
            pe = e[jt], ye = De + C(pe, jt), Re += W(pe, a, h, ye, S);
        else {
          var zt = fe(e);
          if (typeof zt == "function") {
            var Cr = e;
            zt === Cr.entries && (O || xe("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), O = !0);
            for (var Rn = zt.call(Cr), Pr, Tn = 0; !(Pr = Rn.next()).done; )
              pe = Pr.value, ye = De + C(pe, Tn++), Re += W(pe, a, h, ye, S);
          } else if (L === "object") {
            var xr = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (xr === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : xr) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Re;
      }
      function X(e, a, h) {
        if (e == null)
          return e;
        var v = [], S = 0;
        return W(e, v, "", "", function(L) {
          return a.call(h, L, S++);
        }), v;
      }
      function le(e) {
        var a = 0;
        return X(e, function() {
          a++;
        }), a;
      }
      function Le(e, a, h) {
        X(e, function() {
          a.apply(this, arguments);
        }, h);
      }
      function ct(e) {
        return X(e, function(a) {
          return a;
        }) || [];
      }
      function ft(e) {
        if (!A(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function lt(e) {
        var a = {
          $$typeof: Y,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: e,
          _currentValue2: e,
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
        a.Provider = {
          $$typeof: F,
          _context: a
        };
        var h = !1, v = !1, S = !1;
        {
          var L = {
            $$typeof: Y,
            _context: a
          };
          Object.defineProperties(L, {
            Provider: {
              get: function() {
                return v || (v = !0, $("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), a.Provider;
              },
              set: function(I) {
                a.Provider = I;
              }
            },
            _currentValue: {
              get: function() {
                return a._currentValue;
              },
              set: function(I) {
                a._currentValue = I;
              }
            },
            _currentValue2: {
              get: function() {
                return a._currentValue2;
              },
              set: function(I) {
                a._currentValue2 = I;
              }
            },
            _threadCount: {
              get: function() {
                return a._threadCount;
              },
              set: function(I) {
                a._threadCount = I;
              }
            },
            Consumer: {
              get: function() {
                return h || (h = !0, $("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), a.Consumer;
              }
            },
            displayName: {
              get: function() {
                return a.displayName;
              },
              set: function(I) {
                S || (xe("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", I), S = !0);
              }
            }
          }), a.Consumer = L;
        }
        return a._currentRenderer = null, a._currentRenderer2 = null, a;
      }
      var ut = -1, gt = 0, bt = 1, $t = 2;
      function Nt(e) {
        if (e._status === ut) {
          var a = e._result, h = a();
          if (h.then(function(L) {
            if (e._status === gt || e._status === ut) {
              var I = e;
              I._status = bt, I._result = L;
            }
          }, function(L) {
            if (e._status === gt || e._status === ut) {
              var I = e;
              I._status = $t, I._result = L;
            }
          }), e._status === ut) {
            var v = e;
            v._status = gt, v._result = h;
          }
        }
        if (e._status === bt) {
          var S = e._result;
          return S === void 0 && $(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, S), "default" in S || $(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, S), S.default;
        } else
          throw e._result;
      }
      function Lt(e) {
        var a = {
          // We use these fields to store the result.
          _status: ut,
          _result: e
        }, h = {
          $$typeof: ge,
          _payload: a,
          _init: Nt
        };
        {
          var v, S;
          Object.defineProperties(h, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return v;
              },
              set: function(L) {
                $("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), v = L, Object.defineProperty(h, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return S;
              },
              set: function(L) {
                $("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), S = L, Object.defineProperty(h, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return h;
      }
      function Ut(e) {
        e != null && e.$$typeof === ne ? $("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? $("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && $("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && $("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var a = {
          $$typeof: N,
          render: e
        };
        {
          var h;
          Object.defineProperty(a, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return h;
            },
            set: function(v) {
              h = v, !e.name && !e.displayName && (e.displayName = v);
            }
          });
        }
        return a;
      }
      var u;
      u = Symbol.for("react.module.reference");
      function m(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === b || e === k || we || e === _ || e === U || e === z || ke || e === Q || Ie || rt || Be || typeof e == "object" && e !== null && (e.$$typeof === ge || e.$$typeof === ne || e.$$typeof === F || e.$$typeof === Y || e.$$typeof === N || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        e.$$typeof === u || e.getModuleId !== void 0));
      }
      function R(e, a) {
        m(e) || $("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var h = {
          $$typeof: ne,
          type: e,
          compare: a === void 0 ? null : a
        };
        {
          var v;
          Object.defineProperty(h, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return v;
            },
            set: function(S) {
              v = S, !e.name && !e.displayName && (e.displayName = S);
            }
          });
        }
        return h;
      }
      function M() {
        var e = Ke.current;
        return e === null && $(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function Z(e) {
        var a = M();
        if (e._context !== void 0) {
          var h = e._context;
          h.Consumer === e ? $("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : h.Provider === e && $("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return a.useContext(e);
      }
      function oe(e) {
        var a = M();
        return a.useState(e);
      }
      function q(e, a, h) {
        var v = M();
        return v.useReducer(e, a, h);
      }
      function B(e) {
        var a = M();
        return a.useRef(e);
      }
      function Ae(e, a) {
        var h = M();
        return h.useEffect(e, a);
      }
      function ve(e, a) {
        var h = M();
        return h.useInsertionEffect(e, a);
      }
      function be(e, a) {
        var h = M();
        return h.useLayoutEffect(e, a);
      }
      function qe(e, a) {
        var h = M();
        return h.useCallback(e, a);
      }
      function at(e, a) {
        var h = M();
        return h.useMemo(e, a);
      }
      function Ot(e, a, h) {
        var v = M();
        return v.useImperativeHandle(e, a, h);
      }
      function Qe(e, a) {
        {
          var h = M();
          return h.useDebugValue(e, a);
        }
      }
      function tn() {
        var e = M();
        return e.useTransition();
      }
      function rn(e) {
        var a = M();
        return a.useDeferredValue(e);
      }
      function nn() {
        var e = M();
        return e.useId();
      }
      function on(e, a, h) {
        var v = M();
        return v.useSyncExternalStore(e, a, h);
      }
      var mt = 0, sr, cr, fr, lr, dr, pr, hr;
      function vr() {
      }
      vr.__reactDisabledLog = !0;
      function an() {
        {
          if (mt === 0) {
            sr = console.log, cr = console.info, fr = console.warn, lr = console.error, dr = console.group, pr = console.groupCollapsed, hr = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: vr,
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
          mt++;
        }
      }
      function un() {
        {
          if (mt--, mt === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: c({}, e, {
                value: sr
              }),
              info: c({}, e, {
                value: cr
              }),
              warn: c({}, e, {
                value: fr
              }),
              error: c({}, e, {
                value: lr
              }),
              group: c({}, e, {
                value: dr
              }),
              groupCollapsed: c({}, e, {
                value: pr
              }),
              groupEnd: c({}, e, {
                value: hr
              })
            });
          }
          mt < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Wt = ie.ReactCurrentDispatcher, Vt;
      function Rt(e, a, h) {
        {
          if (Vt === void 0)
            try {
              throw Error();
            } catch (S) {
              var v = S.stack.trim().match(/\n( *(at )?)/);
              Vt = v && v[1] || "";
            }
          return `
` + Vt + e;
        }
      }
      var Yt = !1, Tt;
      {
        var sn = typeof WeakMap == "function" ? WeakMap : Map;
        Tt = new sn();
      }
      function yr(e, a) {
        if (!e || Yt)
          return "";
        {
          var h = Tt.get(e);
          if (h !== void 0)
            return h;
        }
        var v;
        Yt = !0;
        var S = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var L;
        L = Wt.current, Wt.current = null, an();
        try {
          if (a) {
            var I = function() {
              throw Error();
            };
            if (Object.defineProperty(I.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(I, []);
              } catch (De) {
                v = De;
              }
              Reflect.construct(e, [], I);
            } else {
              try {
                I.call();
              } catch (De) {
                v = De;
              }
              e.call(I.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (De) {
              v = De;
            }
            e();
          }
        } catch (De) {
          if (De && v && typeof De.stack == "string") {
            for (var V = De.stack.split(`
`), J = v.stack.split(`
`), ce = V.length - 1, de = J.length - 1; ce >= 1 && de >= 0 && V[ce] !== J[de]; )
              de--;
            for (; ce >= 1 && de >= 0; ce--, de--)
              if (V[ce] !== J[de]) {
                if (ce !== 1 || de !== 1)
                  do
                    if (ce--, de--, de < 0 || V[ce] !== J[de]) {
                      var pe = `
` + V[ce].replace(" at new ", " at ");
                      return e.displayName && pe.includes("<anonymous>") && (pe = pe.replace("<anonymous>", e.displayName)), typeof e == "function" && Tt.set(e, pe), pe;
                    }
                  while (ce >= 1 && de >= 0);
                break;
              }
          }
        } finally {
          Yt = !1, Wt.current = L, un(), Error.prepareStackTrace = S;
        }
        var ye = e ? e.displayName || e.name : "", Re = ye ? Rt(ye) : "";
        return typeof e == "function" && Tt.set(e, Re), Re;
      }
      function cn(e, a, h) {
        return yr(e, !1);
      }
      function fn(e) {
        var a = e.prototype;
        return !!(a && a.isReactComponent);
      }
      function kt(e, a, h) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return yr(e, fn(e));
        if (typeof e == "string")
          return Rt(e);
        switch (e) {
          case U:
            return Rt("Suspense");
          case z:
            return Rt("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case N:
              return cn(e.render);
            case ne:
              return kt(e.type, a, h);
            case ge: {
              var v = e, S = v._payload, L = v._init;
              try {
                return kt(L(S), a, h);
              } catch {
              }
            }
          }
        return "";
      }
      var gr = {}, br = ie.ReactDebugCurrentFrame;
      function Ct(e) {
        if (e) {
          var a = e._owner, h = kt(e.type, e._source, a ? a.type : null);
          br.setExtraStackFrame(h);
        } else
          br.setExtraStackFrame(null);
      }
      function ln(e, a, h, v, S) {
        {
          var L = Function.call.bind(We);
          for (var I in e)
            if (L(e, I)) {
              var V = void 0;
              try {
                if (typeof e[I] != "function") {
                  var J = Error((v || "React class") + ": " + h + " type `" + I + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[I] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw J.name = "Invariant Violation", J;
                }
                V = e[I](a, I, v, h, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ce) {
                V = ce;
              }
              V && !(V instanceof Error) && (Ct(S), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", v || "React class", h, I, typeof V), Ct(null)), V instanceof Error && !(V.message in gr) && (gr[V.message] = !0, Ct(S), $("Failed %s type: %s", h, V.message), Ct(null));
            }
        }
      }
      function dt(e) {
        if (e) {
          var a = e._owner, h = kt(e.type, e._source, a ? a.type : null);
          He(h);
        } else
          He(null);
      }
      var Ht;
      Ht = !1;
      function mr() {
        if (Te.current) {
          var e = Ee(Te.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function dn(e) {
        if (e !== void 0) {
          var a = e.fileName.replace(/^.*[\\\/]/, ""), h = e.lineNumber;
          return `

Check your code at ` + a + ":" + h + ".";
        }
        return "";
      }
      function pn(e) {
        return e != null ? dn(e.__source) : "";
      }
      var _r = {};
      function hn(e) {
        var a = mr();
        if (!a) {
          var h = typeof e == "string" ? e : e.displayName || e.name;
          h && (a = `

Check the top-level render call using <` + h + ">.");
        }
        return a;
      }
      function Er(e, a) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var h = hn(a);
          if (!_r[h]) {
            _r[h] = !0;
            var v = "";
            e && e._owner && e._owner !== Te.current && (v = " It was passed a child from " + Ee(e._owner.type) + "."), dt(e), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', h, v), dt(null);
          }
        }
      }
      function wr(e, a) {
        if (typeof e == "object") {
          if (_e(e))
            for (var h = 0; h < e.length; h++) {
              var v = e[h];
              A(v) && Er(v, a);
            }
          else if (A(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var S = fe(e);
            if (typeof S == "function" && S !== e.entries)
              for (var L = S.call(e), I; !(I = L.next()).done; )
                A(I.value) && Er(I.value, a);
          }
        }
      }
      function Sr(e) {
        {
          var a = e.type;
          if (a == null || typeof a == "string")
            return;
          var h;
          if (typeof a == "function")
            h = a.propTypes;
          else if (typeof a == "object" && (a.$$typeof === N || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          a.$$typeof === ne))
            h = a.propTypes;
          else
            return;
          if (h) {
            var v = Ee(a);
            ln(h, e.props, "prop", v, e);
          } else if (a.PropTypes !== void 0 && !Ht) {
            Ht = !0;
            var S = Ee(a);
            $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", S || "Unknown");
          }
          typeof a.getDefaultProps == "function" && !a.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function vn(e) {
        {
          for (var a = Object.keys(e.props), h = 0; h < a.length; h++) {
            var v = a[h];
            if (v !== "children" && v !== "key") {
              dt(e), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", v), dt(null);
              break;
            }
          }
          e.ref !== null && (dt(e), $("Invalid attribute `ref` supplied to `React.Fragment`."), dt(null));
        }
      }
      function Or(e, a, h) {
        var v = m(e);
        if (!v) {
          var S = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (S += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var L = pn(a);
          L ? S += L : S += mr();
          var I;
          e === null ? I = "null" : _e(e) ? I = "array" : e !== void 0 && e.$$typeof === o ? (I = "<" + (Ee(e.type) || "Unknown") + " />", S = " Did you accidentally export a JSX literal instead of a component?") : I = typeof e, $("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", I, S);
        }
        var V = p.apply(this, arguments);
        if (V == null)
          return V;
        if (v)
          for (var J = 2; J < arguments.length; J++)
            wr(arguments[J], e);
        return e === b ? vn(V) : Sr(V), V;
      }
      var Rr = !1;
      function yn(e) {
        var a = Or.bind(null, e);
        return a.type = e, Rr || (Rr = !0, xe("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(a, "type", {
          enumerable: !1,
          get: function() {
            return xe("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), a;
      }
      function gn(e, a, h) {
        for (var v = w.apply(this, arguments), S = 2; S < arguments.length; S++)
          wr(arguments[S], v.type);
        return Sr(v), v;
      }
      function bn(e, a) {
        var h = Ue.transition;
        Ue.transition = {};
        var v = Ue.transition;
        Ue.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (Ue.transition = h, h === null && v._updatedFibers) {
            var S = v._updatedFibers.size;
            S > 10 && xe("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), v._updatedFibers.clear();
          }
        }
      }
      var Tr = !1, Pt = null;
      function mn(e) {
        if (Pt === null)
          try {
            var a = ("require" + Math.random()).slice(0, 7), h = n && n[a];
            Pt = h.call(n, "timers").setImmediate;
          } catch {
            Pt = function(S) {
              Tr === !1 && (Tr = !0, typeof MessageChannel > "u" && $("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var L = new MessageChannel();
              L.port1.onmessage = S, L.port2.postMessage(void 0);
            };
          }
        return Pt(e);
      }
      var pt = 0, kr = !1;
      function _n(e) {
        {
          var a = pt;
          pt++, ue.current === null && (ue.current = []);
          var h = ue.isBatchingLegacy, v;
          try {
            if (ue.isBatchingLegacy = !0, v = e(), !h && ue.didScheduleLegacyUpdate) {
              var S = ue.current;
              S !== null && (ue.didScheduleLegacyUpdate = !1, qt(S));
            }
          } catch (ye) {
            throw xt(a), ye;
          } finally {
            ue.isBatchingLegacy = h;
          }
          if (v !== null && typeof v == "object" && typeof v.then == "function") {
            var L = v, I = !1, V = {
              then: function(ye, Re) {
                I = !0, L.then(function(De) {
                  xt(a), pt === 0 ? Bt(De, ye, Re) : ye(De);
                }, function(De) {
                  xt(a), Re(De);
                });
              }
            };
            return !kr && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              I || (kr = !0, $("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), V;
          } else {
            var J = v;
            if (xt(a), pt === 0) {
              var ce = ue.current;
              ce !== null && (qt(ce), ue.current = null);
              var de = {
                then: function(ye, Re) {
                  ue.current === null ? (ue.current = [], Bt(J, ye, Re)) : ye(J);
                }
              };
              return de;
            } else {
              var pe = {
                then: function(ye, Re) {
                  ye(J);
                }
              };
              return pe;
            }
          }
        }
      }
      function xt(e) {
        e !== pt - 1 && $("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), pt = e;
      }
      function Bt(e, a, h) {
        {
          var v = ue.current;
          if (v !== null)
            try {
              qt(v), mn(function() {
                v.length === 0 ? (ue.current = null, a(e)) : Bt(e, a, h);
              });
            } catch (S) {
              h(S);
            }
          else
            a(e);
        }
      }
      var Gt = !1;
      function qt(e) {
        if (!Gt) {
          Gt = !0;
          var a = 0;
          try {
            for (; a < e.length; a++) {
              var h = e[a];
              do
                h = h(!0);
              while (h !== null);
            }
            e.length = 0;
          } catch (v) {
            throw e = e.slice(a + 1), v;
          } finally {
            Gt = !1;
          }
        }
      }
      var En = Or, wn = gn, Sn = yn, On = {
        map: X,
        forEach: Le,
        count: le,
        toArray: ct,
        only: ft
      };
      r.Children = On, r.Component = g, r.Fragment = b, r.Profiler = k, r.PureComponent = K, r.StrictMode = _, r.Suspense = U, r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ie, r.cloneElement = wn, r.createContext = lt, r.createElement = En, r.createFactory = Sn, r.createRef = Se, r.forwardRef = Ut, r.isValidElement = A, r.lazy = Lt, r.memo = R, r.startTransition = bn, r.unstable_act = _n, r.useCallback = qe, r.useContext = Z, r.useDebugValue = Qe, r.useDeferredValue = rn, r.useEffect = Ae, r.useId = nn, r.useImperativeHandle = Ot, r.useInsertionEffect = ve, r.useLayoutEffect = be, r.useMemo = at, r.useReducer = q, r.useRef = B, r.useState = oe, r.useSyncExternalStore = on, r.useTransition = tn, r.version = t, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(wt, wt.exports)), wt.exports;
}
var G = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ir;
function Bn() {
  if (Ir)
    return G;
  Ir = 1;
  var n = Symbol.for("react.element"), r = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), b = Symbol.for("react.provider"), _ = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), Y = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), U = Symbol.iterator;
  function z(d) {
    return d === null || typeof d != "object" ? null : (d = U && d[U] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var ne = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, ge = Object.assign, Q = {};
  function me(d, i, c) {
    this.props = d, this.context = i, this.refs = Q, this.updater = c || ne;
  }
  me.prototype.isReactComponent = {}, me.prototype.setState = function(d, i) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, d, i, "setState");
  }, me.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function Me() {
  }
  Me.prototype = me.prototype;
  function fe(d, i, c) {
    this.props = d, this.context = i, this.refs = Q, this.updater = c || ne;
  }
  var Ke = fe.prototype = new Me();
  Ke.constructor = fe, ge(Ke, me.prototype), Ke.isPureReactComponent = !0;
  var Ue = Array.isArray, ue = Object.prototype.hasOwnProperty, Te = { current: null }, Ve = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Ye(d, i, c) {
    var l, g = {}, E = null, D = null;
    if (i != null)
      for (l in i.ref !== void 0 && (D = i.ref), i.key !== void 0 && (E = "" + i.key), i)
        ue.call(i, l) && !Ve.hasOwnProperty(l) && (g[l] = i[l]);
    var P = arguments.length - 2;
    if (P === 1)
      g.children = c;
    else if (1 < P) {
      for (var x = Array(P), K = 0; K < P; K++)
        x[K] = arguments[K + 2];
      g.children = x;
    }
    if (d && d.defaultProps)
      for (l in P = d.defaultProps, P)
        g[l] === void 0 && (g[l] = P[l]);
    return { $$typeof: n, type: d, key: E, ref: D, props: g, _owner: Te.current };
  }
  function He(d, i) {
    return { $$typeof: n, type: d.type, key: i, ref: d.ref, props: d.props, _owner: d._owner };
  }
  function Ie(d) {
    return typeof d == "object" && d !== null && d.$$typeof === n;
  }
  function rt(d) {
    var i = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(c) {
      return i[c];
    });
  }
  var Be = /\/+/g;
  function ke(d, i) {
    return typeof d == "object" && d !== null && d.key != null ? rt("" + d.key) : i.toString(36);
  }
  function we(d, i, c, l, g) {
    var E = typeof d;
    (E === "undefined" || E === "boolean") && (d = null);
    var D = !1;
    if (d === null)
      D = !0;
    else
      switch (E) {
        case "string":
        case "number":
          D = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case n:
            case r:
              D = !0;
          }
      }
    if (D)
      return D = d, g = g(D), d = l === "" ? "." + ke(D, 0) : l, Ue(g) ? (c = "", d != null && (c = d.replace(Be, "$&/") + "/"), we(g, i, c, "", function(K) {
        return K;
      })) : g != null && (Ie(g) && (g = He(g, c + (!g.key || D && D.key === g.key ? "" : ("" + g.key).replace(Be, "$&/") + "/") + d)), i.push(g)), 1;
    if (D = 0, l = l === "" ? "." : l + ":", Ue(d))
      for (var P = 0; P < d.length; P++) {
        E = d[P];
        var x = l + ke(E, P);
        D += we(E, i, c, x, g);
      }
    else if (x = z(d), typeof x == "function")
      for (d = x.call(d), P = 0; !(E = d.next()).done; )
        E = E.value, x = l + ke(E, P++), D += we(E, i, c, x, g);
    else if (E === "object")
      throw i = String(d), Error("Objects are not valid as a React child (found: " + (i === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : i) + "). If you meant to render a collection of children, use an array instead.");
    return D;
  }
  function ie(d, i, c) {
    if (d == null)
      return d;
    var l = [], g = 0;
    return we(d, l, "", "", function(E) {
      return i.call(c, E, g++);
    }), l;
  }
  function xe(d) {
    if (d._status === -1) {
      var i = d._result;
      i = i(), i.then(function(c) {
        (d._status === 0 || d._status === -1) && (d._status = 1, d._result = c);
      }, function(c) {
        (d._status === 0 || d._status === -1) && (d._status = 2, d._result = c);
      }), d._status === -1 && (d._status = 0, d._result = i);
    }
    if (d._status === 1)
      return d._result.default;
    throw d._result;
  }
  var $ = { current: null }, Fe = { transition: null }, ze = { ReactCurrentDispatcher: $, ReactCurrentBatchConfig: Fe, ReactCurrentOwner: Te };
  return G.Children = { map: ie, forEach: function(d, i, c) {
    ie(d, function() {
      i.apply(this, arguments);
    }, c);
  }, count: function(d) {
    var i = 0;
    return ie(d, function() {
      i++;
    }), i;
  }, toArray: function(d) {
    return ie(d, function(i) {
      return i;
    }) || [];
  }, only: function(d) {
    if (!Ie(d))
      throw Error("React.Children.only expected to receive a single React element child.");
    return d;
  } }, G.Component = me, G.Fragment = t, G.Profiler = s, G.PureComponent = fe, G.StrictMode = o, G.Suspense = F, G.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ze, G.cloneElement = function(d, i, c) {
    if (d == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + d + ".");
    var l = ge({}, d.props), g = d.key, E = d.ref, D = d._owner;
    if (i != null) {
      if (i.ref !== void 0 && (E = i.ref, D = Te.current), i.key !== void 0 && (g = "" + i.key), d.type && d.type.defaultProps)
        var P = d.type.defaultProps;
      for (x in i)
        ue.call(i, x) && !Ve.hasOwnProperty(x) && (l[x] = i[x] === void 0 && P !== void 0 ? P[x] : i[x]);
    }
    var x = arguments.length - 2;
    if (x === 1)
      l.children = c;
    else if (1 < x) {
      P = Array(x);
      for (var K = 0; K < x; K++)
        P[K] = arguments[K + 2];
      l.children = P;
    }
    return { $$typeof: n, type: d.type, key: g, ref: E, props: l, _owner: D };
  }, G.createContext = function(d) {
    return d = { $$typeof: _, _currentValue: d, _currentValue2: d, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, d.Provider = { $$typeof: b, _context: d }, d.Consumer = d;
  }, G.createElement = Ye, G.createFactory = function(d) {
    var i = Ye.bind(null, d);
    return i.type = d, i;
  }, G.createRef = function() {
    return { current: null };
  }, G.forwardRef = function(d) {
    return { $$typeof: k, render: d };
  }, G.isValidElement = Ie, G.lazy = function(d) {
    return { $$typeof: N, _payload: { _status: -1, _result: d }, _init: xe };
  }, G.memo = function(d, i) {
    return { $$typeof: Y, type: d, compare: i === void 0 ? null : i };
  }, G.startTransition = function(d) {
    var i = Fe.transition;
    Fe.transition = {};
    try {
      d();
    } finally {
      Fe.transition = i;
    }
  }, G.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, G.useCallback = function(d, i) {
    return $.current.useCallback(d, i);
  }, G.useContext = function(d) {
    return $.current.useContext(d);
  }, G.useDebugValue = function() {
  }, G.useDeferredValue = function(d) {
    return $.current.useDeferredValue(d);
  }, G.useEffect = function(d, i) {
    return $.current.useEffect(d, i);
  }, G.useId = function() {
    return $.current.useId();
  }, G.useImperativeHandle = function(d, i, c) {
    return $.current.useImperativeHandle(d, i, c);
  }, G.useInsertionEffect = function(d, i) {
    return $.current.useInsertionEffect(d, i);
  }, G.useLayoutEffect = function(d, i) {
    return $.current.useLayoutEffect(d, i);
  }, G.useMemo = function(d, i) {
    return $.current.useMemo(d, i);
  }, G.useReducer = function(d, i, c) {
    return $.current.useReducer(d, i, c);
  }, G.useRef = function(d) {
    return $.current.useRef(d);
  }, G.useState = function(d) {
    return $.current.useState(d);
  }, G.useSyncExternalStore = function(d, i, c) {
    return $.current.useSyncExternalStore(d, i, c);
  }, G.useTransition = function() {
    return $.current.useTransition();
  }, G.version = "18.2.0", G;
}
process.env.NODE_ENV === "production" ? tr.exports = Bn() : tr.exports = Hn();
var qr = tr.exports;
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fr;
function Gn() {
  return Fr || (Fr = 1, process.env.NODE_ENV !== "production" && function() {
    var n = qr, r = Symbol.for("react.element"), t = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), _ = Symbol.for("react.provider"), k = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), Y = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), ne = Symbol.for("react.offscreen"), ge = Symbol.iterator, Q = "@@iterator";
    function me(u) {
      if (u === null || typeof u != "object")
        return null;
      var m = ge && u[ge] || u[Q];
      return typeof m == "function" ? m : null;
    }
    var Me = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function fe(u) {
      {
        for (var m = arguments.length, R = new Array(m > 1 ? m - 1 : 0), M = 1; M < m; M++)
          R[M - 1] = arguments[M];
        Ke("error", u, R);
      }
    }
    function Ke(u, m, R) {
      {
        var M = Me.ReactDebugCurrentFrame, Z = M.getStackAddendum();
        Z !== "" && (m += "%s", R = R.concat([Z]));
        var oe = R.map(function(q) {
          return String(q);
        });
        oe.unshift("Warning: " + m), Function.prototype.apply.call(console[u], console, oe);
      }
    }
    var Ue = !1, ue = !1, Te = !1, Ve = !1, Ye = !1, He;
    He = Symbol.for("react.module.reference");
    function Ie(u) {
      return !!(typeof u == "string" || typeof u == "function" || u === o || u === b || Ye || u === s || u === Y || u === N || Ve || u === ne || Ue || ue || Te || typeof u == "object" && u !== null && (u.$$typeof === z || u.$$typeof === U || u.$$typeof === _ || u.$$typeof === k || u.$$typeof === F || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      u.$$typeof === He || u.getModuleId !== void 0));
    }
    function rt(u, m, R) {
      var M = u.displayName;
      if (M)
        return M;
      var Z = m.displayName || m.name || "";
      return Z !== "" ? R + "(" + Z + ")" : R;
    }
    function Be(u) {
      return u.displayName || "Context";
    }
    function ke(u) {
      if (u == null)
        return null;
      if (typeof u.tag == "number" && fe("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof u == "function")
        return u.displayName || u.name || null;
      if (typeof u == "string")
        return u;
      switch (u) {
        case o:
          return "Fragment";
        case t:
          return "Portal";
        case b:
          return "Profiler";
        case s:
          return "StrictMode";
        case Y:
          return "Suspense";
        case N:
          return "SuspenseList";
      }
      if (typeof u == "object")
        switch (u.$$typeof) {
          case k:
            var m = u;
            return Be(m) + ".Consumer";
          case _:
            var R = u;
            return Be(R._context) + ".Provider";
          case F:
            return rt(u, u.render, "ForwardRef");
          case U:
            var M = u.displayName || null;
            return M !== null ? M : ke(u.type) || "Memo";
          case z: {
            var Z = u, oe = Z._payload, q = Z._init;
            try {
              return ke(q(oe));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var we = Object.assign, ie = 0, xe, $, Fe, ze, d, i, c;
    function l() {
    }
    l.__reactDisabledLog = !0;
    function g() {
      {
        if (ie === 0) {
          xe = console.log, $ = console.info, Fe = console.warn, ze = console.error, d = console.group, i = console.groupCollapsed, c = console.groupEnd;
          var u = {
            configurable: !0,
            enumerable: !0,
            value: l,
            writable: !0
          };
          Object.defineProperties(console, {
            info: u,
            log: u,
            warn: u,
            error: u,
            group: u,
            groupCollapsed: u,
            groupEnd: u
          });
        }
        ie++;
      }
    }
    function E() {
      {
        if (ie--, ie === 0) {
          var u = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: we({}, u, {
              value: xe
            }),
            info: we({}, u, {
              value: $
            }),
            warn: we({}, u, {
              value: Fe
            }),
            error: we({}, u, {
              value: ze
            }),
            group: we({}, u, {
              value: d
            }),
            groupCollapsed: we({}, u, {
              value: i
            }),
            groupEnd: we({}, u, {
              value: c
            })
          });
        }
        ie < 0 && fe("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var D = Me.ReactCurrentDispatcher, P;
    function x(u, m, R) {
      {
        if (P === void 0)
          try {
            throw Error();
          } catch (Z) {
            var M = Z.stack.trim().match(/\n( *(at )?)/);
            P = M && M[1] || "";
          }
        return `
` + P + u;
      }
    }
    var K = !1, re;
    {
      var Se = typeof WeakMap == "function" ? WeakMap : Map;
      re = new Se();
    }
    function se(u, m) {
      if (!u || K)
        return "";
      {
        var R = re.get(u);
        if (R !== void 0)
          return R;
      }
      var M;
      K = !0;
      var Z = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var oe;
      oe = D.current, D.current = null, g();
      try {
        if (m) {
          var q = function() {
            throw Error();
          };
          if (Object.defineProperty(q.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(q, []);
            } catch (Qe) {
              M = Qe;
            }
            Reflect.construct(u, [], q);
          } else {
            try {
              q.call();
            } catch (Qe) {
              M = Qe;
            }
            u.call(q.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Qe) {
            M = Qe;
          }
          u();
        }
      } catch (Qe) {
        if (Qe && M && typeof Qe.stack == "string") {
          for (var B = Qe.stack.split(`
`), Ae = M.stack.split(`
`), ve = B.length - 1, be = Ae.length - 1; ve >= 1 && be >= 0 && B[ve] !== Ae[be]; )
            be--;
          for (; ve >= 1 && be >= 0; ve--, be--)
            if (B[ve] !== Ae[be]) {
              if (ve !== 1 || be !== 1)
                do
                  if (ve--, be--, be < 0 || B[ve] !== Ae[be]) {
                    var qe = `
` + B[ve].replace(" at new ", " at ");
                    return u.displayName && qe.includes("<anonymous>") && (qe = qe.replace("<anonymous>", u.displayName)), typeof u == "function" && re.set(u, qe), qe;
                  }
                while (ve >= 1 && be >= 0);
              break;
            }
        }
      } finally {
        K = !1, D.current = oe, E(), Error.prepareStackTrace = Z;
      }
      var at = u ? u.displayName || u.name : "", Ot = at ? x(at) : "";
      return typeof u == "function" && re.set(u, Ot), Ot;
    }
    function _e(u, m, R) {
      return se(u, !1);
    }
    function ee(u) {
      var m = u.prototype;
      return !!(m && m.isReactComponent);
    }
    function Pe(u, m, R) {
      if (u == null)
        return "";
      if (typeof u == "function")
        return se(u, ee(u));
      if (typeof u == "string")
        return x(u);
      switch (u) {
        case Y:
          return x("Suspense");
        case N:
          return x("SuspenseList");
      }
      if (typeof u == "object")
        switch (u.$$typeof) {
          case F:
            return _e(u.render);
          case U:
            return Pe(u.type, m, R);
          case z: {
            var M = u, Z = M._payload, oe = M._init;
            try {
              return Pe(oe(Z), m, R);
            } catch {
            }
          }
        }
      return "";
    }
    var Oe = Object.prototype.hasOwnProperty, te = {}, Ge = Me.ReactDebugCurrentFrame;
    function $e(u) {
      if (u) {
        var m = u._owner, R = Pe(u.type, u._source, m ? m.type : null);
        Ge.setExtraStackFrame(R);
      } else
        Ge.setExtraStackFrame(null);
    }
    function Ee(u, m, R, M, Z) {
      {
        var oe = Function.call.bind(Oe);
        for (var q in u)
          if (oe(u, q)) {
            var B = void 0;
            try {
              if (typeof u[q] != "function") {
                var Ae = Error((M || "React class") + ": " + R + " type `" + q + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[q] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ae.name = "Invariant Violation", Ae;
              }
              B = u[q](m, q, M, R, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ve) {
              B = ve;
            }
            B && !(B instanceof Error) && ($e(Z), fe("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", M || "React class", R, q, typeof B), $e(null)), B instanceof Error && !(B.message in te) && (te[B.message] = !0, $e(Z), fe("Failed %s type: %s", R, B.message), $e(null));
          }
      }
    }
    var We = Array.isArray;
    function Ce(u) {
      return We(u);
    }
    function nt(u) {
      {
        var m = typeof Symbol == "function" && Symbol.toStringTag, R = m && u[Symbol.toStringTag] || u.constructor.name || "Object";
        return R;
      }
    }
    function it(u) {
      try {
        return Xe(u), !1;
      } catch {
        return !0;
      }
    }
    function Xe(u) {
      return "" + u;
    }
    function je(u) {
      if (it(u))
        return fe("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", nt(u)), Xe(u);
    }
    var Ne = Me.ReactCurrentOwner, ot = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ze, Je, f;
    f = {};
    function p(u) {
      if (Oe.call(u, "ref")) {
        var m = Object.getOwnPropertyDescriptor(u, "ref").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return u.ref !== void 0;
    }
    function y(u) {
      if (Oe.call(u, "key")) {
        var m = Object.getOwnPropertyDescriptor(u, "key").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return u.key !== void 0;
    }
    function w(u, m) {
      if (typeof u.ref == "string" && Ne.current && m && Ne.current.stateNode !== m) {
        var R = ke(Ne.current.type);
        f[R] || (fe('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ke(Ne.current.type), u.ref), f[R] = !0);
      }
    }
    function A(u, m) {
      {
        var R = function() {
          Ze || (Ze = !0, fe("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        R.isReactWarning = !0, Object.defineProperty(u, "key", {
          get: R,
          configurable: !0
        });
      }
    }
    function ae(u, m) {
      {
        var R = function() {
          Je || (Je = !0, fe("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        R.isReactWarning = !0, Object.defineProperty(u, "ref", {
          get: R,
          configurable: !0
        });
      }
    }
    var he = function(u, m, R, M, Z, oe, q) {
      var B = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: u,
        key: m,
        ref: R,
        props: q,
        // Record the component responsible for creating this element.
        _owner: oe
      };
      return B._store = {}, Object.defineProperty(B._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(B, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: M
      }), Object.defineProperty(B, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Z
      }), Object.freeze && (Object.freeze(B.props), Object.freeze(B)), B;
    };
    function H(u, m, R, M, Z) {
      {
        var oe, q = {}, B = null, Ae = null;
        R !== void 0 && (je(R), B = "" + R), y(m) && (je(m.key), B = "" + m.key), p(m) && (Ae = m.ref, w(m, Z));
        for (oe in m)
          Oe.call(m, oe) && !ot.hasOwnProperty(oe) && (q[oe] = m[oe]);
        if (u && u.defaultProps) {
          var ve = u.defaultProps;
          for (oe in ve)
            q[oe] === void 0 && (q[oe] = ve[oe]);
        }
        if (B || Ae) {
          var be = typeof u == "function" ? u.displayName || u.name || "Unknown" : u;
          B && A(q, be), Ae && ae(q, be);
        }
        return he(u, B, Ae, Z, M, Ne.current, q);
      }
    }
    var O = Me.ReactCurrentOwner, j = Me.ReactDebugCurrentFrame;
    function T(u) {
      if (u) {
        var m = u._owner, R = Pe(u.type, u._source, m ? m.type : null);
        j.setExtraStackFrame(R);
      } else
        j.setExtraStackFrame(null);
    }
    var C;
    C = !1;
    function W(u) {
      return typeof u == "object" && u !== null && u.$$typeof === r;
    }
    function X() {
      {
        if (O.current) {
          var u = ke(O.current.type);
          if (u)
            return `

Check the render method of \`` + u + "`.";
        }
        return "";
      }
    }
    function le(u) {
      {
        if (u !== void 0) {
          var m = u.fileName.replace(/^.*[\\\/]/, ""), R = u.lineNumber;
          return `

Check your code at ` + m + ":" + R + ".";
        }
        return "";
      }
    }
    var Le = {};
    function ct(u) {
      {
        var m = X();
        if (!m) {
          var R = typeof u == "string" ? u : u.displayName || u.name;
          R && (m = `

Check the top-level render call using <` + R + ">.");
        }
        return m;
      }
    }
    function ft(u, m) {
      {
        if (!u._store || u._store.validated || u.key != null)
          return;
        u._store.validated = !0;
        var R = ct(m);
        if (Le[R])
          return;
        Le[R] = !0;
        var M = "";
        u && u._owner && u._owner !== O.current && (M = " It was passed a child from " + ke(u._owner.type) + "."), T(u), fe('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', R, M), T(null);
      }
    }
    function lt(u, m) {
      {
        if (typeof u != "object")
          return;
        if (Ce(u))
          for (var R = 0; R < u.length; R++) {
            var M = u[R];
            W(M) && ft(M, m);
          }
        else if (W(u))
          u._store && (u._store.validated = !0);
        else if (u) {
          var Z = me(u);
          if (typeof Z == "function" && Z !== u.entries)
            for (var oe = Z.call(u), q; !(q = oe.next()).done; )
              W(q.value) && ft(q.value, m);
        }
      }
    }
    function ut(u) {
      {
        var m = u.type;
        if (m == null || typeof m == "string")
          return;
        var R;
        if (typeof m == "function")
          R = m.propTypes;
        else if (typeof m == "object" && (m.$$typeof === F || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        m.$$typeof === U))
          R = m.propTypes;
        else
          return;
        if (R) {
          var M = ke(m);
          Ee(R, u.props, "prop", M, u);
        } else if (m.PropTypes !== void 0 && !C) {
          C = !0;
          var Z = ke(m);
          fe("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Z || "Unknown");
        }
        typeof m.getDefaultProps == "function" && !m.getDefaultProps.isReactClassApproved && fe("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function gt(u) {
      {
        for (var m = Object.keys(u.props), R = 0; R < m.length; R++) {
          var M = m[R];
          if (M !== "children" && M !== "key") {
            T(u), fe("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", M), T(null);
            break;
          }
        }
        u.ref !== null && (T(u), fe("Invalid attribute `ref` supplied to `React.Fragment`."), T(null));
      }
    }
    function bt(u, m, R, M, Z, oe) {
      {
        var q = Ie(u);
        if (!q) {
          var B = "";
          (u === void 0 || typeof u == "object" && u !== null && Object.keys(u).length === 0) && (B += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ae = le(Z);
          Ae ? B += Ae : B += X();
          var ve;
          u === null ? ve = "null" : Ce(u) ? ve = "array" : u !== void 0 && u.$$typeof === r ? (ve = "<" + (ke(u.type) || "Unknown") + " />", B = " Did you accidentally export a JSX literal instead of a component?") : ve = typeof u, fe("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ve, B);
        }
        var be = H(u, m, R, Z, oe);
        if (be == null)
          return be;
        if (q) {
          var qe = m.children;
          if (qe !== void 0)
            if (M)
              if (Ce(qe)) {
                for (var at = 0; at < qe.length; at++)
                  lt(qe[at], u);
                Object.freeze && Object.freeze(qe);
              } else
                fe("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              lt(qe, u);
        }
        return u === o ? gt(be) : ut(be), be;
      }
    }
    function $t(u, m, R) {
      return bt(u, m, R, !0);
    }
    function Nt(u, m, R) {
      return bt(u, m, R, !1);
    }
    var Lt = Nt, Ut = $t;
    _t.Fragment = o, _t.jsx = Lt, _t.jsxs = Ut;
  }()), _t;
}
var Et = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $r;
function qn() {
  if ($r)
    return Et;
  $r = 1;
  var n = qr, r = Symbol.for("react.element"), t = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, s = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, b = { key: !0, ref: !0, __self: !0, __source: !0 };
  function _(k, F, Y) {
    var N, U = {}, z = null, ne = null;
    Y !== void 0 && (z = "" + Y), F.key !== void 0 && (z = "" + F.key), F.ref !== void 0 && (ne = F.ref);
    for (N in F)
      o.call(F, N) && !b.hasOwnProperty(N) && (U[N] = F[N]);
    if (k && k.defaultProps)
      for (N in F = k.defaultProps, F)
        U[N] === void 0 && (U[N] = F[N]);
    return { $$typeof: r, type: k, key: z, ref: ne, props: U, _owner: s.current };
  }
  return Et.Fragment = t, Et.jsx = _, Et.jsxs = _, Et;
}
process.env.NODE_ENV === "production" ? qn() : Gn();
var Nr = { exports: {} };
(function(n, r) {
  (function(t, o) {
    o(r);
  })(st, function(t) {
    function o(i, c) {
      i.super_ = c, i.prototype = Object.create(c.prototype, { constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 } });
    }
    function s(i, c) {
      Object.defineProperty(this, "kind", { value: i, enumerable: !0 }), c && c.length && Object.defineProperty(this, "path", { value: c, enumerable: !0 });
    }
    function b(i, c, l) {
      b.super_.call(this, "E", i), Object.defineProperty(this, "lhs", { value: c, enumerable: !0 }), Object.defineProperty(this, "rhs", { value: l, enumerable: !0 });
    }
    function _(i, c) {
      _.super_.call(this, "N", i), Object.defineProperty(this, "rhs", { value: c, enumerable: !0 });
    }
    function k(i, c) {
      k.super_.call(this, "D", i), Object.defineProperty(this, "lhs", { value: c, enumerable: !0 });
    }
    function F(i, c, l) {
      F.super_.call(this, "A", i), Object.defineProperty(this, "index", { value: c, enumerable: !0 }), Object.defineProperty(this, "item", { value: l, enumerable: !0 });
    }
    function Y(i, c, l) {
      var g = i.slice((l || c) + 1 || i.length);
      return i.length = c < 0 ? i.length + c : c, i.push.apply(i, g), i;
    }
    function N(i) {
      var c = typeof i > "u" ? "undefined" : ie(i);
      return c !== "object" ? c : i === Math ? "math" : i === null ? "null" : Array.isArray(i) ? "array" : Object.prototype.toString.call(i) === "[object Date]" ? "date" : typeof i.toString == "function" && /^\/.*\//.test(i.toString()) ? "regexp" : "object";
    }
    function U(i, c, l, g, E, D, P) {
      E = E || [], P = P || [];
      var x = E.slice(0);
      if (typeof D < "u") {
        if (g) {
          if (typeof g == "function" && g(x, D))
            return;
          if ((typeof g > "u" ? "undefined" : ie(g)) === "object") {
            if (g.prefilter && g.prefilter(x, D))
              return;
            if (g.normalize) {
              var K = g.normalize(x, D, i, c);
              K && (i = K[0], c = K[1]);
            }
          }
        }
        x.push(D);
      }
      N(i) === "regexp" && N(c) === "regexp" && (i = i.toString(), c = c.toString());
      var re = typeof i > "u" ? "undefined" : ie(i), Se = typeof c > "u" ? "undefined" : ie(c), se = re !== "undefined" || P && P[P.length - 1].lhs && P[P.length - 1].lhs.hasOwnProperty(D), _e = Se !== "undefined" || P && P[P.length - 1].rhs && P[P.length - 1].rhs.hasOwnProperty(D);
      if (!se && _e)
        l(new _(x, c));
      else if (!_e && se)
        l(new k(x, i));
      else if (N(i) !== N(c))
        l(new b(x, i, c));
      else if (N(i) === "date" && i - c !== 0)
        l(new b(x, i, c));
      else if (re === "object" && i !== null && c !== null)
        if (P.filter(function(te) {
          return te.lhs === i;
        }).length)
          i !== c && l(new b(x, i, c));
        else {
          if (P.push({ lhs: i, rhs: c }), Array.isArray(i)) {
            var ee;
            for (i.length, ee = 0; ee < i.length; ee++)
              ee >= c.length ? l(new F(x, ee, new k(void 0, i[ee]))) : U(i[ee], c[ee], l, g, x, ee, P);
            for (; ee < c.length; )
              l(new F(x, ee, new _(void 0, c[ee++])));
          } else {
            var Pe = Object.keys(i), Oe = Object.keys(c);
            Pe.forEach(function(te, Ge) {
              var $e = Oe.indexOf(te);
              $e >= 0 ? (U(i[te], c[te], l, g, x, te, P), Oe = Y(Oe, $e)) : U(i[te], void 0, l, g, x, te, P);
            }), Oe.forEach(function(te) {
              U(void 0, c[te], l, g, x, te, P);
            });
          }
          P.length = P.length - 1;
        }
      else
        i !== c && (re === "number" && isNaN(i) && isNaN(c) || l(new b(x, i, c)));
    }
    function z(i, c, l, g) {
      return g = g || [], U(i, c, function(E) {
        E && g.push(E);
      }, l), g.length ? g : void 0;
    }
    function ne(i, c, l) {
      if (l.path && l.path.length) {
        var g, E = i[c], D = l.path.length - 1;
        for (g = 0; g < D; g++)
          E = E[l.path[g]];
        switch (l.kind) {
          case "A":
            ne(E[l.path[g]], l.index, l.item);
            break;
          case "D":
            delete E[l.path[g]];
            break;
          case "E":
          case "N":
            E[l.path[g]] = l.rhs;
        }
      } else
        switch (l.kind) {
          case "A":
            ne(i[c], l.index, l.item);
            break;
          case "D":
            i = Y(i, c);
            break;
          case "E":
          case "N":
            i[c] = l.rhs;
        }
      return i;
    }
    function ge(i, c, l) {
      if (i && c && l && l.kind) {
        for (var g = i, E = -1, D = l.path ? l.path.length - 1 : 0; ++E < D; )
          typeof g[l.path[E]] > "u" && (g[l.path[E]] = typeof l.path[E] == "number" ? [] : {}), g = g[l.path[E]];
        switch (l.kind) {
          case "A":
            ne(l.path ? g[l.path[E]] : g, l.index, l.item);
            break;
          case "D":
            delete g[l.path[E]];
            break;
          case "E":
          case "N":
            g[l.path[E]] = l.rhs;
        }
      }
    }
    function Q(i, c, l) {
      if (l.path && l.path.length) {
        var g, E = i[c], D = l.path.length - 1;
        for (g = 0; g < D; g++)
          E = E[l.path[g]];
        switch (l.kind) {
          case "A":
            Q(E[l.path[g]], l.index, l.item);
            break;
          case "D":
            E[l.path[g]] = l.lhs;
            break;
          case "E":
            E[l.path[g]] = l.lhs;
            break;
          case "N":
            delete E[l.path[g]];
        }
      } else
        switch (l.kind) {
          case "A":
            Q(i[c], l.index, l.item);
            break;
          case "D":
            i[c] = l.lhs;
            break;
          case "E":
            i[c] = l.lhs;
            break;
          case "N":
            i = Y(i, c);
        }
      return i;
    }
    function me(i, c, l) {
      if (i && c && l && l.kind) {
        var g, E, D = i;
        for (E = l.path.length - 1, g = 0; g < E; g++)
          typeof D[l.path[g]] > "u" && (D[l.path[g]] = {}), D = D[l.path[g]];
        switch (l.kind) {
          case "A":
            Q(D[l.path[g]], l.index, l.item);
            break;
          case "D":
            D[l.path[g]] = l.lhs;
            break;
          case "E":
            D[l.path[g]] = l.lhs;
            break;
          case "N":
            delete D[l.path[g]];
        }
      }
    }
    function Me(i, c, l) {
      if (i && c) {
        var g = function(E) {
          l && !l(i, c, E) || ge(i, c, E);
        };
        U(i, c, g);
      }
    }
    function fe(i) {
      return "color: " + Fe[i].color + "; font-weight: bold";
    }
    function Ke(i) {
      var c = i.kind, l = i.path, g = i.lhs, E = i.rhs, D = i.index, P = i.item;
      switch (c) {
        case "E":
          return [l.join("."), g, "→", E];
        case "N":
          return [l.join("."), E];
        case "D":
          return [l.join(".")];
        case "A":
          return [l.join(".") + "[" + D + "]", P];
        default:
          return [];
      }
    }
    function Ue(i, c, l, g) {
      var E = z(i, c);
      try {
        g ? l.groupCollapsed("diff") : l.group("diff");
      } catch {
        l.log("diff");
      }
      E ? E.forEach(function(D) {
        var P = D.kind, x = Ke(D);
        l.log.apply(l, ["%c " + Fe[P].text, fe(P)].concat(xe(x)));
      }) : l.log("—— no diff ——");
      try {
        l.groupEnd();
      } catch {
        l.log("—— diff end —— ");
      }
    }
    function ue(i, c, l, g) {
      switch (typeof i > "u" ? "undefined" : ie(i)) {
        case "object":
          return typeof i[g] == "function" ? i[g].apply(i, xe(l)) : i[g];
        case "function":
          return i(c);
        default:
          return i;
      }
    }
    function Te(i) {
      var c = i.timestamp, l = i.duration;
      return function(g, E, D) {
        var P = ["action"];
        return P.push("%c" + String(g.type)), c && P.push("%c@ " + E), l && P.push("%c(in " + D.toFixed(2) + " ms)"), P.join(" ");
      };
    }
    function Ve(i, c) {
      var l = c.logger, g = c.actionTransformer, E = c.titleFormatter, D = E === void 0 ? Te(c) : E, P = c.collapsed, x = c.colors, K = c.level, re = c.diff, Se = typeof c.titleFormatter > "u";
      i.forEach(function(se, _e) {
        var ee = se.started, Pe = se.startedTime, Oe = se.action, te = se.prevState, Ge = se.error, $e = se.took, Ee = se.nextState, We = i[_e + 1];
        We && (Ee = We.prevState, $e = We.started - ee);
        var Ce = g(Oe), nt = typeof P == "function" ? P(function() {
          return Ee;
        }, Oe, se) : P, it = ke(Pe), Xe = x.title ? "color: " + x.title(Ce) + ";" : "", je = ["color: gray; font-weight: lighter;"];
        je.push(Xe), c.timestamp && je.push("color: gray; font-weight: lighter;"), c.duration && je.push("color: gray; font-weight: lighter;");
        var Ne = D(Ce, it, $e);
        try {
          nt ? x.title && Se ? l.groupCollapsed.apply(l, ["%c " + Ne].concat(je)) : l.groupCollapsed(Ne) : x.title && Se ? l.group.apply(l, ["%c " + Ne].concat(je)) : l.group(Ne);
        } catch {
          l.log(Ne);
        }
        var ot = ue(K, Ce, [te], "prevState"), Ze = ue(K, Ce, [Ce], "action"), Je = ue(K, Ce, [Ge, te], "error"), f = ue(K, Ce, [Ee], "nextState");
        if (ot)
          if (x.prevState) {
            var p = "color: " + x.prevState(te) + "; font-weight: bold";
            l[ot]("%c prev state", p, te);
          } else
            l[ot]("prev state", te);
        if (Ze)
          if (x.action) {
            var y = "color: " + x.action(Ce) + "; font-weight: bold";
            l[Ze]("%c action    ", y, Ce);
          } else
            l[Ze]("action    ", Ce);
        if (Ge && Je)
          if (x.error) {
            var w = "color: " + x.error(Ge, te) + "; font-weight: bold;";
            l[Je]("%c error     ", w, Ge);
          } else
            l[Je]("error     ", Ge);
        if (f)
          if (x.nextState) {
            var A = "color: " + x.nextState(Ee) + "; font-weight: bold";
            l[f]("%c next state", A, Ee);
          } else
            l[f]("next state", Ee);
        re && Ue(te, Ee, l, nt);
        try {
          l.groupEnd();
        } catch {
          l.log("—— log end ——");
        }
      });
    }
    function Ye() {
      var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, c = Object.assign({}, ze, i), l = c.logger, g = c.stateTransformer, E = c.errorTransformer, D = c.predicate, P = c.logErrors, x = c.diffPredicate;
      if (typeof l > "u")
        return function() {
          return function(re) {
            return function(Se) {
              return re(Se);
            };
          };
        };
      if (i.getState && i.dispatch)
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
          return function(re) {
            return function(Se) {
              return re(Se);
            };
          };
        };
      var K = [];
      return function(re) {
        var Se = re.getState;
        return function(se) {
          return function(_e) {
            if (typeof D == "function" && !D(Se, _e))
              return se(_e);
            var ee = {};
            K.push(ee), ee.started = we.now(), ee.startedTime = /* @__PURE__ */ new Date(), ee.prevState = g(Se()), ee.action = _e;
            var Pe = void 0;
            if (P)
              try {
                Pe = se(_e);
              } catch (te) {
                ee.error = E(te);
              }
            else
              Pe = se(_e);
            ee.took = we.now() - ee.started, ee.nextState = g(Se());
            var Oe = c.diff && typeof x == "function" ? x(Se, _e) : c.diff;
            if (Ve(K, Object.assign({}, c, { diff: Oe })), K.length = 0, ee.error)
              throw ee.error;
            return Pe;
          };
        };
      };
    }
    var He, Ie, rt = function(i, c) {
      return new Array(c + 1).join(i);
    }, Be = function(i, c) {
      return rt("0", c - i.toString().length) + i;
    }, ke = function(i) {
      return Be(i.getHours(), 2) + ":" + Be(i.getMinutes(), 2) + ":" + Be(i.getSeconds(), 2) + "." + Be(i.getMilliseconds(), 3);
    }, we = typeof performance < "u" && performance !== null && typeof performance.now == "function" ? performance : Date, ie = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
      return typeof i;
    } : function(i) {
      return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
    }, xe = function(i) {
      if (Array.isArray(i)) {
        for (var c = 0, l = Array(i.length); c < i.length; c++)
          l[c] = i[c];
        return l;
      }
      return Array.from(i);
    }, $ = [];
    He = (typeof st > "u" ? "undefined" : ie(st)) === "object" && st ? st : typeof window < "u" ? window : {}, Ie = He.DeepDiff, Ie && $.push(function() {
      typeof Ie < "u" && He.DeepDiff === z && (He.DeepDiff = Ie, Ie = void 0);
    }), o(b, s), o(_, s), o(k, s), o(F, s), Object.defineProperties(z, { diff: { value: z, enumerable: !0 }, observableDiff: { value: U, enumerable: !0 }, applyDiff: { value: Me, enumerable: !0 }, applyChange: { value: ge, enumerable: !0 }, revertChange: { value: me, enumerable: !0 }, isConflict: { value: function() {
      return typeof Ie < "u";
    }, enumerable: !0 }, noConflict: { value: function() {
      return $ && ($.forEach(function(i) {
        i();
      }), $ = null), z;
    }, enumerable: !0 } });
    var Fe = { E: { color: "#2196F3", text: "CHANGED:" }, N: { color: "#4CAF50", text: "ADDED:" }, D: { color: "#F44336", text: "DELETED:" }, A: { color: "#2196F3", text: "ARRAY:" } }, ze = { level: "log", logger: console, logErrors: !0, collapsed: void 0, predicate: void 0, duration: !1, timestamp: !0, stateTransformer: function(i) {
      return i;
    }, actionTransformer: function(i) {
      return i;
    }, errorTransformer: function(i) {
      return i;
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
    } }, diff: !1, diffPredicate: void 0, transformer: void 0 }, d = function() {
      var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, c = i.dispatch, l = i.getState;
      return typeof c == "function" || typeof l == "function" ? Ye()({ dispatch: c, getState: l }) : void console.error(`
[redux-logger v3] BREAKING CHANGE
[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.
[redux-logger v3] Change
[redux-logger v3] import createLogger from 'redux-logger'
[redux-logger v3] to
[redux-logger v3] import { createLogger } from 'redux-logger'
`);
    };
    t.defaults = ze, t.createLogger = Ye, t.logger = d, t.default = d, Object.defineProperty(t, "__esModule", { value: !0 });
  });
})(Nr, Nr.exports);
var rr = function(n, r) {
  return rr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, o) {
    t.__proto__ = o;
  } || function(t, o) {
    for (var s in o)
      Object.prototype.hasOwnProperty.call(o, s) && (t[s] = o[s]);
  }, rr(n, r);
};
function tt(n, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  rr(n, r);
  function t() {
    this.constructor = n;
  }
  n.prototype = r === null ? Object.create(r) : (t.prototype = r.prototype, new t());
}
function nr(n) {
  var r = typeof Symbol == "function" && Symbol.iterator, t = r && n[r], o = 0;
  if (t)
    return t.call(n);
  if (n && typeof n.length == "number")
    return {
      next: function() {
        return n && o >= n.length && (n = void 0), { value: n && n[o++], done: !n };
      }
    };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ht(n, r) {
  var t = typeof Symbol == "function" && n[Symbol.iterator];
  if (!t)
    return n;
  var o = t.call(n), s, b = [], _;
  try {
    for (; (r === void 0 || r-- > 0) && !(s = o.next()).done; )
      b.push(s.value);
  } catch (k) {
    _ = { error: k };
  } finally {
    try {
      s && !s.done && (t = o.return) && t.call(o);
    } finally {
      if (_)
        throw _.error;
    }
  }
  return b;
}
function vt(n, r, t) {
  if (t || arguments.length === 2)
    for (var o = 0, s = r.length, b; o < s; o++)
      (b || !(o in r)) && (b || (b = Array.prototype.slice.call(r, 0, o)), b[o] = r[o]);
  return n.concat(b || Array.prototype.slice.call(r));
}
function et(n) {
  return typeof n == "function";
}
function zr(n) {
  var r = function(o) {
    Error.call(o), o.stack = new Error().stack;
  }, t = n(r);
  return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
var Jt = zr(function(n) {
  return function(t) {
    n(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(o, s) {
      return s + 1 + ") " + o.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function Mt(n, r) {
  if (n) {
    var t = n.indexOf(r);
    0 <= t && n.splice(t, 1);
  }
}
var yt = function() {
  function n(r) {
    this.initialTeardown = r, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return n.prototype.unsubscribe = function() {
    var r, t, o, s, b;
    if (!this.closed) {
      this.closed = !0;
      var _ = this._parentage;
      if (_)
        if (this._parentage = null, Array.isArray(_))
          try {
            for (var k = nr(_), F = k.next(); !F.done; F = k.next()) {
              var Y = F.value;
              Y.remove(this);
            }
          } catch (Q) {
            r = { error: Q };
          } finally {
            try {
              F && !F.done && (t = k.return) && t.call(k);
            } finally {
              if (r)
                throw r.error;
            }
          }
        else
          _.remove(this);
      var N = this.initialTeardown;
      if (et(N))
        try {
          N();
        } catch (Q) {
          b = Q instanceof Jt ? Q.errors : [Q];
        }
      var U = this._finalizers;
      if (U) {
        this._finalizers = null;
        try {
          for (var z = nr(U), ne = z.next(); !ne.done; ne = z.next()) {
            var ge = ne.value;
            try {
              Lr(ge);
            } catch (Q) {
              b = b ?? [], Q instanceof Jt ? b = vt(vt([], ht(b)), ht(Q.errors)) : b.push(Q);
            }
          }
        } catch (Q) {
          o = { error: Q };
        } finally {
          try {
            ne && !ne.done && (s = z.return) && s.call(z);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
      if (b)
        throw new Jt(b);
    }
  }, n.prototype.add = function(r) {
    var t;
    if (r && r !== this)
      if (this.closed)
        Lr(r);
      else {
        if (r instanceof n) {
          if (r.closed || r._hasParent(this))
            return;
          r._addParent(this);
        }
        (this._finalizers = (t = this._finalizers) !== null && t !== void 0 ? t : []).push(r);
      }
  }, n.prototype._hasParent = function(r) {
    var t = this._parentage;
    return t === r || Array.isArray(t) && t.includes(r);
  }, n.prototype._addParent = function(r) {
    var t = this._parentage;
    this._parentage = Array.isArray(t) ? (t.push(r), t) : t ? [t, r] : r;
  }, n.prototype._removeParent = function(r) {
    var t = this._parentage;
    t === r ? this._parentage = null : Array.isArray(t) && Mt(t, r);
  }, n.prototype.remove = function(r) {
    var t = this._finalizers;
    t && Mt(t, r), r instanceof n && r._removeParent(this);
  }, n.EMPTY = function() {
    var r = new n();
    return r.closed = !0, r;
  }(), n;
}(), Kr = yt.EMPTY;
function Jr(n) {
  return n instanceof yt || n && "closed" in n && et(n.remove) && et(n.add) && et(n.unsubscribe);
}
function Lr(n) {
  et(n) ? n() : n.unsubscribe();
}
var Qr = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, or = {
  setTimeout: function(n, r) {
    for (var t = [], o = 2; o < arguments.length; o++)
      t[o - 2] = arguments[o];
    var s = or.delegate;
    return s != null && s.setTimeout ? s.setTimeout.apply(s, vt([n, r], ht(t))) : setTimeout.apply(void 0, vt([n, r], ht(t)));
  },
  clearTimeout: function(n) {
    var r = or.delegate;
    return ((r == null ? void 0 : r.clearTimeout) || clearTimeout)(n);
  },
  delegate: void 0
};
function zn(n) {
  or.setTimeout(function() {
    throw n;
  });
}
function Ur() {
}
function Dt(n) {
  n();
}
var ur = function(n) {
  tt(r, n);
  function r(t) {
    var o = n.call(this) || this;
    return o.isStopped = !1, t ? (o.destination = t, Jr(t) && t.add(o)) : o.destination = Xn, o;
  }
  return r.create = function(t, o, s) {
    return new ir(t, o, s);
  }, r.prototype.next = function(t) {
    this.isStopped || this._next(t);
  }, r.prototype.error = function(t) {
    this.isStopped || (this.isStopped = !0, this._error(t));
  }, r.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, r.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, n.prototype.unsubscribe.call(this), this.destination = null);
  }, r.prototype._next = function(t) {
    this.destination.next(t);
  }, r.prototype._error = function(t) {
    try {
      this.destination.error(t);
    } finally {
      this.unsubscribe();
    }
  }, r.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, r;
}(yt), Kn = Function.prototype.bind;
function Qt(n, r) {
  return Kn.call(n, r);
}
var Jn = function() {
  function n(r) {
    this.partialObserver = r;
  }
  return n.prototype.next = function(r) {
    var t = this.partialObserver;
    if (t.next)
      try {
        t.next(r);
      } catch (o) {
        At(o);
      }
  }, n.prototype.error = function(r) {
    var t = this.partialObserver;
    if (t.error)
      try {
        t.error(r);
      } catch (o) {
        At(o);
      }
    else
      At(r);
  }, n.prototype.complete = function() {
    var r = this.partialObserver;
    if (r.complete)
      try {
        r.complete();
      } catch (t) {
        At(t);
      }
  }, n;
}(), ir = function(n) {
  tt(r, n);
  function r(t, o, s) {
    var b = n.call(this) || this, _;
    if (et(t) || !t)
      _ = {
        next: t ?? void 0,
        error: o ?? void 0,
        complete: s ?? void 0
      };
    else {
      var k;
      b && Qr.useDeprecatedNextContext ? (k = Object.create(t), k.unsubscribe = function() {
        return b.unsubscribe();
      }, _ = {
        next: t.next && Qt(t.next, k),
        error: t.error && Qt(t.error, k),
        complete: t.complete && Qt(t.complete, k)
      }) : _ = t;
    }
    return b.destination = new Jn(_), b;
  }
  return r;
}(ur);
function At(n) {
  zn(n);
}
function Qn(n) {
  throw n;
}
var Xn = {
  closed: !0,
  next: Ur,
  error: Qn,
  complete: Ur
}, Zn = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function eo(n) {
  return n;
}
function to(n) {
  return n.length === 0 ? eo : n.length === 1 ? n[0] : function(t) {
    return n.reduce(function(o, s) {
      return s(o);
    }, t);
  };
}
var It = function() {
  function n(r) {
    r && (this._subscribe = r);
  }
  return n.prototype.lift = function(r) {
    var t = new n();
    return t.source = this, t.operator = r, t;
  }, n.prototype.subscribe = function(r, t, o) {
    var s = this, b = no(r) ? r : new ir(r, t, o);
    return Dt(function() {
      var _ = s, k = _.operator, F = _.source;
      b.add(k ? k.call(b, F) : F ? s._subscribe(b) : s._trySubscribe(b));
    }), b;
  }, n.prototype._trySubscribe = function(r) {
    try {
      return this._subscribe(r);
    } catch (t) {
      r.error(t);
    }
  }, n.prototype.forEach = function(r, t) {
    var o = this;
    return t = Wr(t), new t(function(s, b) {
      var _ = new ir({
        next: function(k) {
          try {
            r(k);
          } catch (F) {
            b(F), _.unsubscribe();
          }
        },
        error: b,
        complete: s
      });
      o.subscribe(_);
    });
  }, n.prototype._subscribe = function(r) {
    var t;
    return (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(r);
  }, n.prototype[Zn] = function() {
    return this;
  }, n.prototype.pipe = function() {
    for (var r = [], t = 0; t < arguments.length; t++)
      r[t] = arguments[t];
    return to(r)(this);
  }, n.prototype.toPromise = function(r) {
    var t = this;
    return r = Wr(r), new r(function(o, s) {
      var b;
      t.subscribe(function(_) {
        return b = _;
      }, function(_) {
        return s(_);
      }, function() {
        return o(b);
      });
    });
  }, n.create = function(r) {
    return new n(r);
  }, n;
}();
function Wr(n) {
  var r;
  return (r = n ?? Qr.Promise) !== null && r !== void 0 ? r : Promise;
}
function ro(n) {
  return n && et(n.next) && et(n.error) && et(n.complete);
}
function no(n) {
  return n && n instanceof ur || ro(n) && Jr(n);
}
function oo(n) {
  return et(n == null ? void 0 : n.lift);
}
function io(n) {
  return function(r) {
    if (oo(r))
      return r.lift(function(t) {
        try {
          return n(t, this);
        } catch (o) {
          this.error(o);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function ao(n, r, t, o, s) {
  return new uo(n, r, t, o, s);
}
var uo = function(n) {
  tt(r, n);
  function r(t, o, s, b, _, k) {
    var F = n.call(this, t) || this;
    return F.onFinalize = _, F.shouldUnsubscribe = k, F._next = o ? function(Y) {
      try {
        o(Y);
      } catch (N) {
        t.error(N);
      }
    } : n.prototype._next, F._error = b ? function(Y) {
      try {
        b(Y);
      } catch (N) {
        t.error(N);
      } finally {
        this.unsubscribe();
      }
    } : n.prototype._error, F._complete = s ? function() {
      try {
        s();
      } catch (Y) {
        t.error(Y);
      } finally {
        this.unsubscribe();
      }
    } : n.prototype._complete, F;
  }
  return r.prototype.unsubscribe = function() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var o = this.closed;
      n.prototype.unsubscribe.call(this), !o && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }, r;
}(ur), so = zr(function(n) {
  return function() {
    n(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Xr = function(n) {
  tt(r, n);
  function r() {
    var t = n.call(this) || this;
    return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
  }
  return r.prototype.lift = function(t) {
    var o = new Vr(this, this);
    return o.operator = t, o;
  }, r.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new so();
  }, r.prototype.next = function(t) {
    var o = this;
    Dt(function() {
      var s, b;
      if (o._throwIfClosed(), !o.isStopped) {
        o.currentObservers || (o.currentObservers = Array.from(o.observers));
        try {
          for (var _ = nr(o.currentObservers), k = _.next(); !k.done; k = _.next()) {
            var F = k.value;
            F.next(t);
          }
        } catch (Y) {
          s = { error: Y };
        } finally {
          try {
            k && !k.done && (b = _.return) && b.call(_);
          } finally {
            if (s)
              throw s.error;
          }
        }
      }
    });
  }, r.prototype.error = function(t) {
    var o = this;
    Dt(function() {
      if (o._throwIfClosed(), !o.isStopped) {
        o.hasError = o.isStopped = !0, o.thrownError = t;
        for (var s = o.observers; s.length; )
          s.shift().error(t);
      }
    });
  }, r.prototype.complete = function() {
    var t = this;
    Dt(function() {
      if (t._throwIfClosed(), !t.isStopped) {
        t.isStopped = !0;
        for (var o = t.observers; o.length; )
          o.shift().complete();
      }
    });
  }, r.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(r.prototype, "observed", {
    get: function() {
      var t;
      return ((t = this.observers) === null || t === void 0 ? void 0 : t.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._trySubscribe = function(t) {
    return this._throwIfClosed(), n.prototype._trySubscribe.call(this, t);
  }, r.prototype._subscribe = function(t) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t);
  }, r.prototype._innerSubscribe = function(t) {
    var o = this, s = this, b = s.hasError, _ = s.isStopped, k = s.observers;
    return b || _ ? Kr : (this.currentObservers = null, k.push(t), new yt(function() {
      o.currentObservers = null, Mt(k, t);
    }));
  }, r.prototype._checkFinalizedStatuses = function(t) {
    var o = this, s = o.hasError, b = o.thrownError, _ = o.isStopped;
    s ? t.error(b) : _ && t.complete();
  }, r.prototype.asObservable = function() {
    var t = new It();
    return t.source = this, t;
  }, r.create = function(t, o) {
    return new Vr(t, o);
  }, r;
}(It), Vr = function(n) {
  tt(r, n);
  function r(t, o) {
    var s = n.call(this) || this;
    return s.destination = t, s.source = o, s;
  }
  return r.prototype.next = function(t) {
    var o, s;
    (s = (o = this.destination) === null || o === void 0 ? void 0 : o.next) === null || s === void 0 || s.call(o, t);
  }, r.prototype.error = function(t) {
    var o, s;
    (s = (o = this.destination) === null || o === void 0 ? void 0 : o.error) === null || s === void 0 || s.call(o, t);
  }, r.prototype.complete = function() {
    var t, o;
    (o = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || o === void 0 || o.call(t);
  }, r.prototype._subscribe = function(t) {
    var o, s;
    return (s = (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(t)) !== null && s !== void 0 ? s : Kr;
  }, r;
}(Xr), Zr = {
  now: function() {
    return (Zr.delegate || Date).now();
  },
  delegate: void 0
}, co = function(n) {
  tt(r, n);
  function r(t, o) {
    return n.call(this) || this;
  }
  return r.prototype.schedule = function(t, o) {
    return this;
  }, r;
}(yt), Ft = {
  setInterval: function(n, r) {
    for (var t = [], o = 2; o < arguments.length; o++)
      t[o - 2] = arguments[o];
    var s = Ft.delegate;
    return s != null && s.setInterval ? s.setInterval.apply(s, vt([n, r], ht(t))) : setInterval.apply(void 0, vt([n, r], ht(t)));
  },
  clearInterval: function(n) {
    var r = Ft.delegate;
    return ((r == null ? void 0 : r.clearInterval) || clearInterval)(n);
  },
  delegate: void 0
}, fo = function(n) {
  tt(r, n);
  function r(t, o) {
    var s = n.call(this, t, o) || this;
    return s.scheduler = t, s.work = o, s.pending = !1, s;
  }
  return r.prototype.schedule = function(t, o) {
    var s;
    if (o === void 0 && (o = 0), this.closed)
      return this;
    this.state = t;
    var b = this.id, _ = this.scheduler;
    return b != null && (this.id = this.recycleAsyncId(_, b, o)), this.pending = !0, this.delay = o, this.id = (s = this.id) !== null && s !== void 0 ? s : this.requestAsyncId(_, this.id, o), this;
  }, r.prototype.requestAsyncId = function(t, o, s) {
    return s === void 0 && (s = 0), Ft.setInterval(t.flush.bind(t, this), s);
  }, r.prototype.recycleAsyncId = function(t, o, s) {
    if (s === void 0 && (s = 0), s != null && this.delay === s && this.pending === !1)
      return o;
    o != null && Ft.clearInterval(o);
  }, r.prototype.execute = function(t, o) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var s = this._execute(t, o);
    if (s)
      return s;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, r.prototype._execute = function(t, o) {
    var s = !1, b;
    try {
      this.work(t);
    } catch (_) {
      s = !0, b = _ || new Error("Scheduled action threw falsy error");
    }
    if (s)
      return this.unsubscribe(), b;
  }, r.prototype.unsubscribe = function() {
    if (!this.closed) {
      var t = this, o = t.id, s = t.scheduler, b = s.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, Mt(b, this), o != null && (this.id = this.recycleAsyncId(s, o, null)), this.delay = null, n.prototype.unsubscribe.call(this);
    }
  }, r;
}(co), Yr = function() {
  function n(r, t) {
    t === void 0 && (t = n.now), this.schedulerActionCtor = r, this.now = t;
  }
  return n.prototype.schedule = function(r, t, o) {
    return t === void 0 && (t = 0), new this.schedulerActionCtor(this, r).schedule(o, t);
  }, n.now = Zr.now, n;
}(), lo = function(n) {
  tt(r, n);
  function r(t, o) {
    o === void 0 && (o = Yr.now);
    var s = n.call(this, t, o) || this;
    return s.actions = [], s._active = !1, s;
  }
  return r.prototype.flush = function(t) {
    var o = this.actions;
    if (this._active) {
      o.push(t);
      return;
    }
    var s;
    this._active = !0;
    do
      if (s = t.execute(t.state, t.delay))
        break;
    while (t = o.shift());
    if (this._active = !1, s) {
      for (; t = o.shift(); )
        t.unsubscribe();
      throw s;
    }
  }, r;
}(Yr), po = function(n) {
  tt(r, n);
  function r(t, o) {
    var s = n.call(this, t, o) || this;
    return s.scheduler = t, s.work = o, s;
  }
  return r.prototype.schedule = function(t, o) {
    return o === void 0 && (o = 0), o > 0 ? n.prototype.schedule.call(this, t, o) : (this.delay = o, this.state = t, this.scheduler.flush(this), this);
  }, r.prototype.execute = function(t, o) {
    return o > 0 || this.closed ? n.prototype.execute.call(this, t, o) : this._execute(t, o);
  }, r.prototype.requestAsyncId = function(t, o, s) {
    return s === void 0 && (s = 0), s != null && s > 0 || s == null && this.delay > 0 ? n.prototype.requestAsyncId.call(this, t, o, s) : (t.flush(this), 0);
  }, r;
}(fo), ho = function(n) {
  tt(r, n);
  function r() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return r;
}(lo), vo = new ho(po);
function Xt(n, r, t, o, s) {
  o === void 0 && (o = 0), s === void 0 && (s = !1);
  var b = r.schedule(function() {
    t(), s ? n.add(this.schedule(null, o)) : this.unsubscribe();
  }, o);
  if (n.add(b), !s)
    return b;
}
function yo(n, r) {
  return r === void 0 && (r = 0), io(function(t, o) {
    t.subscribe(ao(o, function(s) {
      return Xt(o, n, function() {
        return o.next(s);
      }, r);
    }, function() {
      return Xt(o, n, function() {
        return o.complete();
      }, r);
    }, function(s) {
      return Xt(o, n, function() {
        return o.error(s);
      }, r);
    }));
  });
}
function So() {
  const n = new Xr(), r = n.asObservable().pipe(yo(vo));
  let t;
  const o = (s) => (s.getState, (b) => (_) => {
    b(_), n.next(_);
  });
  return o.run = (s) => {
    t || t != null && t.closed || (t = s(r));
  }, o.close = () => {
    !t || !(t != null && t.unsubscribe) || t.unsubscribe();
  }, o;
}
function go(...n) {
  const r = (t) => {
    const o = new yt();
    for (let s = 0; s < n.length; s++)
      o.add(n[s](t));
    return o;
  };
  try {
    Object.defineProperty(go, "name", {
      value: `combineStreamers(${n.map((t) => t.name || "<anonymous>").join(", ")})`
    });
  } catch {
  }
  return r;
}
function Oo(n) {
  return (r) => ({
    type: n,
    payload: r
  });
}
function Ro(n, r) {
  return (t = r, o) => o.type === n ? o.payload : t;
}
function Hr(n) {
  return (r) => ({
    type: n,
    payload: r
  });
}
function bo(n) {
  const r = Array.isArray(n) ? n : [n];
  return (t) => new It(
    (o) => t.subscribe({
      next: (s) => r.includes(s.type) && o.next(s),
      error: o.error,
      complete: o.complete
    })
  );
}
function To(n) {
  return (r) => new It((t) => {
    r.subscribe({
      next: (o) => {
        n(o), t.next(o);
      },
      error: t.error,
      complete: t.complete
    });
  });
}
var mo = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, Eo = (n, r, t, o) => {
  for (var s = o > 1 ? void 0 : o ? _o(r, t) : r, b = n.length - 1, _; b >= 0; b--)
    (_ = n[b]) && (s = (o ? _(r, t, s) : _(s)) || s);
  return o && s && mo(r, t, s), s;
}, en = /* @__PURE__ */ ((n) => (n[n.FETCH_START = 0] = "FETCH_START", n[n.FETCH_DONE = 1] = "FETCH_DONE", n[n.FETCH_ERROR = 2] = "FETCH_ERROR", n[n.FETCHING = 3] = "FETCHING", n[n.RELOAD = 4] = "RELOAD", n))(en || {});
class wo extends ar {
  constructor() {
    super(...arguments), this.param = null;
  }
  get quickTypes() {
    return {
      ...super.quickTypes,
      ...en
    };
  }
  get reducers() {
    const r = this.types;
    return {
      data: (t = null, o) => {
        switch (o.type) {
          case r.FETCH_DONE:
            return o.payload;
          case r.FETCH_ERROR:
            return null;
          default:
            return t;
        }
      },
      error: (t = null, o) => {
        switch (o.type) {
          case r.FETCH_ERROR:
            return o.payload;
          case r.FETCH_DONE:
            return null;
          default:
            return t;
        }
      },
      loading: (t = !1, o) => {
        switch (o.type) {
          case r.FETCHING:
            return o.payload;
          case r.FETCH_START:
          case r.RELOAD:
            return !0;
          case r.FETCH_DONE:
          case r.FETCH_ERROR:
            return !1;
          default:
            return t;
        }
      }
    };
  }
  get creators() {
    const r = this.types;
    return {
      ...super.creators,
      fetch: Hr(r.FETCH_START),
      reload: Hr(r.RELOAD)
    };
  }
  fetch(r) {
    const t = this, { types: o, dispatch: s } = t;
    return r.pipe(bo([o.FETCH_START, o.RELOAD])).subscribe((b) => {
      o.FETCH_START && (t.param = b == null ? void 0 : b.payload), t.getData(t.param).then((_) => s({ type: o.FETCH_DONE, payload: _ })).catch((_) => s({ type: o.FETCH_ERROR, payload: _ }));
    });
  }
}
Eo([
  Nn()
], wo.prototype, "fetch", 1);
export {
  Br as Cache,
  Nn as StreamerMethod,
  Dr as collectStreamers,
  go as combineStreamers,
  Oo as createPayloadAction,
  So as createStreamMiddleware,
  Hr as createToPayload,
  To as effect,
  bo as filterAction,
  Ro as reduceFromPayload
};
