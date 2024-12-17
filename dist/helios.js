const hn = (t) => +t;
function Sr(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Qt = "http://www.w3.org/1999/xhtml";
const fn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Qt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function _t(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), fn.hasOwnProperty(e) ? { space: fn[e], local: t } : t;
}
function Rr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Qt && e.documentElement.namespaceURI === Qt ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Tr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Yn(t) {
  var e = _t(t);
  return (e.local ? Tr : Rr)(e);
}
function Nr() {
}
function tn(t) {
  return t == null ? Nr : function() {
    return this.querySelector(t);
  };
}
function Or(t) {
  typeof t != "function" && (t = tn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], o = a.length, s = r[i] = new Array(o), h, u, l = 0; l < o; ++l)
      (h = a[l]) && (u = t.call(h, h.__data__, l, a)) && ("__data__" in h && (u.__data__ = h.__data__), s[l] = u);
  return new Z(r, this._parents);
}
function Pr(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function zr() {
  return [];
}
function qn(t) {
  return t == null ? zr : function() {
    return this.querySelectorAll(t);
  };
}
function Dr(t) {
  return function() {
    return Pr(t.apply(this, arguments));
  };
}
function Lr(t) {
  typeof t == "function" ? t = Dr(t) : t = qn(t);
  for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
    for (var o = e[a], s = o.length, h, u = 0; u < s; ++u)
      (h = o[u]) && (r.push(t.call(h, h.__data__, u, o)), i.push(h));
  return new Z(r, i);
}
function Xn(t) {
  return function() {
    return this.matches(t);
  };
}
function jn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Ur = Array.prototype.find;
function Qr(t) {
  return function() {
    return Ur.call(this.children, t);
  };
}
function Gr() {
  return this.firstElementChild;
}
function Vr(t) {
  return this.select(t == null ? Gr : Qr(typeof t == "function" ? t : jn(t)));
}
var Wr = Array.prototype.filter;
function Hr() {
  return Array.from(this.children);
}
function Yr(t) {
  return function() {
    return Wr.call(this.children, t);
  };
}
function qr(t) {
  return this.selectAll(t == null ? Hr : Yr(typeof t == "function" ? t : jn(t)));
}
function Xr(t) {
  typeof t != "function" && (t = Xn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], o = a.length, s = r[i] = [], h, u = 0; u < o; ++u)
      (h = a[u]) && t.call(h, h.__data__, u, a) && s.push(h);
  return new Z(r, this._parents);
}
function $n(t) {
  return new Array(t.length);
}
function jr() {
  return new Z(this._enter || this._groups.map($n), this._parents);
}
function ht(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ht.prototype = {
  constructor: ht,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function $r(t) {
  return function() {
    return t;
  };
}
function Zr(t, e, n, r, i, a) {
  for (var o = 0, s, h = e.length, u = a.length; o < u; ++o)
    (s = e[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new ht(t, a[o]);
  for (; o < h; ++o)
    (s = e[o]) && (i[o] = s);
}
function Kr(t, e, n, r, i, a, o) {
  var s, h, u = /* @__PURE__ */ new Map(), l = e.length, f = a.length, c = new Array(l), d;
  for (s = 0; s < l; ++s)
    (h = e[s]) && (c[s] = d = o.call(h, h.__data__, s, e) + "", u.has(d) ? i[s] = h : u.set(d, h));
  for (s = 0; s < f; ++s)
    d = o.call(t, a[s], s, a) + "", (h = u.get(d)) ? (r[s] = h, h.__data__ = a[s], u.delete(d)) : n[s] = new ht(t, a[s]);
  for (s = 0; s < l; ++s)
    (h = e[s]) && u.get(c[s]) === h && (i[s] = h);
}
function Jr(t) {
  return t.__data__;
}
function ei(t, e) {
  if (!arguments.length)
    return Array.from(this, Jr);
  var n = e ? Kr : Zr, r = this._parents, i = this._groups;
  typeof t != "function" && (t = $r(t));
  for (var a = i.length, o = new Array(a), s = new Array(a), h = new Array(a), u = 0; u < a; ++u) {
    var l = r[u], f = i[u], c = f.length, d = ti(t.call(l, l && l.__data__, u, r)), v = d.length, g = s[u] = new Array(v), m = o[u] = new Array(v), _ = h[u] = new Array(c);
    n(l, f, g, m, _, d, e);
    for (var b = 0, w = 0, p, y; b < v; ++b)
      if (p = g[b]) {
        for (b >= w && (w = b + 1); !(y = m[w]) && ++w < v; )
          ;
        p._next = y || null;
      }
  }
  return o = new Z(o, r), o._enter = s, o._exit = h, o;
}
function ti(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ni() {
  return new Z(this._exit || this._groups.map($n), this._parents);
}
function ri(t, e, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function ii(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, a = r.length, o = Math.min(i, a), s = new Array(i), h = 0; h < o; ++h)
    for (var u = n[h], l = r[h], f = u.length, c = s[h] = new Array(f), d, v = 0; v < f; ++v)
      (d = u[v] || l[v]) && (c[v] = d);
  for (; h < i; ++h)
    s[h] = n[h];
  return new Z(s, this._parents);
}
function ai() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, a = r[i], o; --i >= 0; )
      (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
  return this;
}
function si(t) {
  t || (t = oi);
  function e(f, c) {
    return f && c ? t(f.__data__, c.__data__) : !f - !c;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var o = n[a], s = o.length, h = i[a] = new Array(s), u, l = 0; l < s; ++l)
      (u = o[l]) && (h[l] = u);
    h.sort(e);
  }
  return new Z(i, this._parents).order();
}
function oi(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function li() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ui() {
  return Array.from(this);
}
function hi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
      var o = r[i];
      if (o)
        return o;
    }
  return null;
}
function fi() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function ci() {
  return !this.node();
}
function di(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], a = 0, o = i.length, s; a < o; ++a)
      (s = i[a]) && t.call(s, s.__data__, a, i);
  return this;
}
function gi(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function vi(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function mi(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function pi(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ai(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function yi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function _i(t, e) {
  var n = _t(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? vi : gi : typeof e == "function" ? n.local ? yi : Ai : n.local ? pi : mi)(n, e));
}
function Zn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function xi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function bi(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function wi(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Ei(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? xi : typeof e == "function" ? wi : bi)(t, e, n ?? "")) : Ie(this.node(), t);
}
function Ie(t, e) {
  return t.style.getPropertyValue(e) || Zn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ki(t) {
  return function() {
    delete this[t];
  };
}
function Ci(t, e) {
  return function() {
    this[t] = e;
  };
}
function Ii(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Bi(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ki : typeof e == "function" ? Ii : Ci)(t, e)) : this.node()[t];
}
function Kn(t) {
  return t.trim().split(/^|\s+/);
}
function nn(t) {
  return t.classList || new Jn(t);
}
function Jn(t) {
  this._node = t, this._names = Kn(t.getAttribute("class") || "");
}
Jn.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function er(t, e) {
  for (var n = nn(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function tr(t, e) {
  for (var n = nn(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function Fi(t) {
  return function() {
    er(this, t);
  };
}
function Mi(t) {
  return function() {
    tr(this, t);
  };
}
function Si(t, e) {
  return function() {
    (e.apply(this, arguments) ? er : tr)(this, t);
  };
}
function Ri(t, e) {
  var n = Kn(t + "");
  if (arguments.length < 2) {
    for (var r = nn(this.node()), i = -1, a = n.length; ++i < a; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Si : e ? Fi : Mi)(n, e));
}
function Ti() {
  this.textContent = "";
}
function Ni(t) {
  return function() {
    this.textContent = t;
  };
}
function Oi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Pi(t) {
  return arguments.length ? this.each(t == null ? Ti : (typeof t == "function" ? Oi : Ni)(t)) : this.node().textContent;
}
function zi() {
  this.innerHTML = "";
}
function Di(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Li(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Ui(t) {
  return arguments.length ? this.each(t == null ? zi : (typeof t == "function" ? Li : Di)(t)) : this.node().innerHTML;
}
function Qi() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Gi() {
  return this.each(Qi);
}
function Vi() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Wi() {
  return this.each(Vi);
}
function Hi(t) {
  var e = typeof t == "function" ? t : Yn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Yi() {
  return null;
}
function qi(t, e) {
  var n = typeof t == "function" ? t : Yn(t), r = e == null ? Yi : typeof e == "function" ? e : tn(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Xi() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ji() {
  return this.each(Xi);
}
function $i() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Zi() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ki(t) {
  return this.select(t ? Zi : $i);
}
function Ji(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ea(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ta(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function na(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, a; n < i; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++r] = a;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function ra(t, e, n) {
  return function() {
    var r = this.__on, i, a = ea(e);
    if (r) {
      for (var o = 0, s = r.length; o < s; ++o)
        if ((i = r[o]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, a, n), i = { type: t.type, name: t.name, value: e, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function ia(t, e, n) {
  var r = ta(t + ""), i, a = r.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var h = 0, u = s.length, l; h < u; ++h)
        for (i = 0, l = s[h]; i < a; ++i)
          if ((o = r[i]).type === l.type && o.name === l.name)
            return l.value;
    }
    return;
  }
  for (s = e ? ra : na, i = 0; i < a; ++i)
    this.each(s(r[i], e, n));
  return this;
}
function nr(t, e, n) {
  var r = Zn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function aa(t, e) {
  return function() {
    return nr(this, t, e);
  };
}
function sa(t, e) {
  return function() {
    return nr(this, t, e.apply(this, arguments));
  };
}
function oa(t, e) {
  return this.each((typeof e == "function" ? sa : aa)(t, e));
}
function* la() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, a = r.length, o; i < a; ++i)
      (o = r[i]) && (yield o);
}
var rr = [null];
function Z(t, e) {
  this._groups = t, this._parents = e;
}
function Ye() {
  return new Z([[document.documentElement]], rr);
}
function ua() {
  return this;
}
Z.prototype = Ye.prototype = {
  constructor: Z,
  select: Or,
  selectAll: Lr,
  selectChild: Vr,
  selectChildren: qr,
  filter: Xr,
  data: ei,
  enter: jr,
  exit: ni,
  join: ri,
  merge: ii,
  selection: ua,
  order: ai,
  sort: si,
  call: li,
  nodes: ui,
  node: hi,
  size: fi,
  empty: ci,
  each: di,
  attr: _i,
  style: Ei,
  property: Bi,
  classed: Ri,
  text: Pi,
  html: Ui,
  raise: Gi,
  lower: Wi,
  append: Hi,
  insert: qi,
  remove: ji,
  clone: Ki,
  datum: Ji,
  on: ia,
  dispatch: oa,
  [Symbol.iterator]: la
};
function $(t) {
  return typeof t == "string" ? new Z([[document.querySelector(t)]], [document.documentElement]) : new Z([[t]], rr);
}
function ha(t) {
  let e;
  for (; e = t.sourceEvent; )
    t = e;
  return t;
}
function ye(t, e) {
  if (t = ha(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
var fa = { value: () => {
} };
function rn() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new rt(n);
}
function rt(t) {
  this._ = t;
}
function ca(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
rt.prototype = rn.prototype = {
  constructor: rt,
  on: function(t, e) {
    var n = this._, r = ca(t + "", n), i, a = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++a < o; )
        if ((i = (t = r[a]).type) && (i = da(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++a < o; )
      if (i = (t = r[a]).type)
        n[i] = cn(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = cn(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new rt(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, a; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (a = this._[t], r = 0, i = a.length; r < i; ++r)
      a[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, a = r.length; i < a; ++i)
      r[i].value.apply(e, n);
  }
};
function da(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function cn(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = fa, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const Gt = { capture: !0, passive: !1 };
function Vt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function ga(t) {
  var e = t.document.documentElement, n = $(t).on("dragstart.drag", Vt, Gt);
  "onselectstart" in e ? n.on("selectstart.drag", Vt, Gt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function va(t, e) {
  var n = t.document.documentElement, r = $(t).on("dragstart.drag", null);
  e && (r.on("click.drag", Vt, Gt), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function an(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function ir(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function qe() {
}
var Qe = 0.7, ft = 1 / Qe, Ce = "\\s*([+-]?\\d+)\\s*", Ge = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ae = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ma = /^#([0-9a-f]{3,8})$/, pa = new RegExp(`^rgb\\(${Ce},${Ce},${Ce}\\)$`), Aa = new RegExp(`^rgb\\(${ae},${ae},${ae}\\)$`), ya = new RegExp(`^rgba\\(${Ce},${Ce},${Ce},${Ge}\\)$`), _a = new RegExp(`^rgba\\(${ae},${ae},${ae},${Ge}\\)$`), xa = new RegExp(`^hsl\\(${Ge},${ae},${ae}\\)$`), ba = new RegExp(`^hsla\\(${Ge},${ae},${ae},${Ge}\\)$`), dn = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
an(qe, Ve, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: gn,
  // Deprecated! Use color.formatHex.
  formatHex: gn,
  formatHex8: wa,
  formatHsl: Ea,
  formatRgb: vn,
  toString: vn
});
function gn() {
  return this.rgb().formatHex();
}
function wa() {
  return this.rgb().formatHex8();
}
function Ea() {
  return ar(this).formatHsl();
}
function vn() {
  return this.rgb().formatRgb();
}
function Ve(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = ma.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? mn(e) : n === 3 ? new X(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? $e(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? $e(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = pa.exec(t)) ? new X(e[1], e[2], e[3], 1) : (e = Aa.exec(t)) ? new X(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ya.exec(t)) ? $e(e[1], e[2], e[3], e[4]) : (e = _a.exec(t)) ? $e(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = xa.exec(t)) ? yn(e[1], e[2] / 100, e[3] / 100, 1) : (e = ba.exec(t)) ? yn(e[1], e[2] / 100, e[3] / 100, e[4]) : dn.hasOwnProperty(t) ? mn(dn[t]) : t === "transparent" ? new X(NaN, NaN, NaN, 0) : null;
}
function mn(t) {
  return new X(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function $e(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new X(t, e, n, r);
}
function ka(t) {
  return t instanceof qe || (t = Ve(t)), t ? (t = t.rgb(), new X(t.r, t.g, t.b, t.opacity)) : new X();
}
function We(t, e, n, r) {
  return arguments.length === 1 ? ka(t) : new X(t, e, n, r ?? 1);
}
function X(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
an(X, We, ir(qe, {
  brighter(t) {
    return t = t == null ? ft : Math.pow(ft, t), new X(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Qe : Math.pow(Qe, t), new X(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new X(be(this.r), be(this.g), be(this.b), ct(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: pn,
  // Deprecated! Use color.formatHex.
  formatHex: pn,
  formatHex8: Ca,
  formatRgb: An,
  toString: An
}));
function pn() {
  return `#${xe(this.r)}${xe(this.g)}${xe(this.b)}`;
}
function Ca() {
  return `#${xe(this.r)}${xe(this.g)}${xe(this.b)}${xe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function An() {
  const t = ct(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${be(this.r)}, ${be(this.g)}, ${be(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ct(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function be(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function xe(t) {
  return t = be(t), (t < 16 ? "0" : "") + t.toString(16);
}
function yn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new ne(t, e, n, r);
}
function ar(t) {
  if (t instanceof ne)
    return new ne(t.h, t.s, t.l, t.opacity);
  if (t instanceof qe || (t = Ve(t)), !t)
    return new ne();
  if (t instanceof ne)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), a = Math.max(e, n, r), o = NaN, s = a - i, h = (a + i) / 2;
  return s ? (e === a ? o = (n - r) / s + (n < r) * 6 : n === a ? o = (r - e) / s + 2 : o = (e - n) / s + 4, s /= h < 0.5 ? a + i : 2 - a - i, o *= 60) : s = h > 0 && h < 1 ? 0 : o, new ne(o, s, h, t.opacity);
}
function Ia(t, e, n, r) {
  return arguments.length === 1 ? ar(t) : new ne(t, e, n, r ?? 1);
}
function ne(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
an(ne, Ia, ir(qe, {
  brighter(t) {
    return t = t == null ? ft : Math.pow(ft, t), new ne(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Qe : Math.pow(Qe, t), new ne(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new X(
      Rt(t >= 240 ? t - 240 : t + 120, i, r),
      Rt(t, i, r),
      Rt(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new ne(_n(this.h), Ze(this.s), Ze(this.l), ct(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ct(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${_n(this.h)}, ${Ze(this.s) * 100}%, ${Ze(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function _n(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Ze(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Rt(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const sr = (t) => () => t;
function Ba(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Fa(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Ma(t) {
  return (t = +t) == 1 ? or : function(e, n) {
    return n - e ? Fa(e, n, t) : sr(isNaN(e) ? n : e);
  };
}
function or(t, e) {
  var n = e - t;
  return n ? Ba(t, n) : sr(isNaN(t) ? e : t);
}
const xn = function t(e) {
  var n = Ma(e);
  function r(i, a) {
    var o = n((i = We(i)).r, (a = We(a)).r), s = n(i.g, a.g), h = n(i.b, a.b), u = or(i.opacity, a.opacity);
    return function(l) {
      return i.r = o(l), i.g = s(l), i.b = h(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function de(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Wt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Tt = new RegExp(Wt.source, "g");
function Sa(t) {
  return function() {
    return t;
  };
}
function Ra(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Ta(t, e) {
  var n = Wt.lastIndex = Tt.lastIndex = 0, r, i, a, o = -1, s = [], h = [];
  for (t = t + "", e = e + ""; (r = Wt.exec(t)) && (i = Tt.exec(e)); )
    (a = i.index) > n && (a = e.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, h.push({ i: o, x: de(r, i) })), n = Tt.lastIndex;
  return n < e.length && (a = e.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? h[0] ? Ra(h[0].x) : Sa(e) : (e = h.length, function(u) {
    for (var l = 0, f; l < e; ++l)
      s[(f = h[l]).i] = f.x(u);
    return s.join("");
  });
}
var bn = 180 / Math.PI, Ht = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function lr(t, e, n, r, i, a) {
  var o, s, h;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (h = t * n + e * r) && (n -= t * h, r -= e * h), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, h /= s), t * r < e * n && (t = -t, e = -e, h = -h, o = -o), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(e, t) * bn,
    skewX: Math.atan(h) * bn,
    scaleX: o,
    scaleY: s
  };
}
var Ke;
function Na(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ht : lr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Oa(t) {
  return t == null || (Ke || (Ke = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ke.setAttribute("transform", t), !(t = Ke.transform.baseVal.consolidate())) ? Ht : (t = t.matrix, lr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ur(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function a(u, l, f, c, d, v) {
    if (u !== f || l !== c) {
      var g = d.push("translate(", null, e, null, n);
      v.push({ i: g - 4, x: de(u, f) }, { i: g - 2, x: de(l, c) });
    } else
      (f || c) && d.push("translate(" + f + e + c + n);
  }
  function o(u, l, f, c) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), c.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: de(u, l) })) : l && f.push(i(f) + "rotate(" + l + r);
  }
  function s(u, l, f, c) {
    u !== l ? c.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: de(u, l) }) : l && f.push(i(f) + "skewX(" + l + r);
  }
  function h(u, l, f, c, d, v) {
    if (u !== f || l !== c) {
      var g = d.push(i(d) + "scale(", null, ",", null, ")");
      v.push({ i: g - 4, x: de(u, f) }, { i: g - 2, x: de(l, c) });
    } else
      (f !== 1 || c !== 1) && d.push(i(d) + "scale(" + f + "," + c + ")");
  }
  return function(u, l) {
    var f = [], c = [];
    return u = t(u), l = t(l), a(u.translateX, u.translateY, l.translateX, l.translateY, f, c), o(u.rotate, l.rotate, f, c), s(u.skewX, l.skewX, f, c), h(u.scaleX, u.scaleY, l.scaleX, l.scaleY, f, c), u = l = null, function(d) {
      for (var v = -1, g = c.length, m; ++v < g; )
        f[(m = c[v]).i] = m.x(d);
      return f.join("");
    };
  };
}
var Pa = ur(Na, "px, ", "px)", "deg)"), za = ur(Oa, ", ", ")", ")"), Da = 1e-12;
function wn(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function La(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Ua(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Qa = function t(e, n, r) {
  function i(a, o) {
    var s = a[0], h = a[1], u = a[2], l = o[0], f = o[1], c = o[2], d = l - s, v = f - h, g = d * d + v * v, m, _;
    if (g < Da)
      _ = Math.log(c / u) / e, m = function(C) {
        return [
          s + C * d,
          h + C * v,
          u * Math.exp(e * C * _)
        ];
      };
    else {
      var b = Math.sqrt(g), w = (c * c - u * u + r * g) / (2 * u * n * b), p = (c * c - u * u - r * g) / (2 * c * n * b), y = Math.log(Math.sqrt(w * w + 1) - w), A = Math.log(Math.sqrt(p * p + 1) - p);
      _ = (A - y) / e, m = function(C) {
        var k = C * _, M = wn(y), N = u / (n * b) * (M * Ua(e * k + y) - La(y));
        return [
          s + N * d,
          h + N * v,
          u * M / wn(e * k + y)
        ];
      };
    }
    return m.duration = _ * 1e3 * e / Math.SQRT2, m;
  }
  return i.rho = function(a) {
    var o = Math.max(1e-3, +a), s = o * o, h = s * s;
    return t(o, s, h);
  }, i;
}(Math.SQRT2, 2, 4);
var Be = 0, Le = 0, Me = 0, hr = 1e3, dt, Ue, gt = 0, we = 0, xt = 0, He = typeof performance == "object" && performance.now ? performance : Date, fr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function sn() {
  return we || (fr(Ga), we = He.now() + xt);
}
function Ga() {
  we = 0;
}
function vt() {
  this._call = this._time = this._next = null;
}
vt.prototype = cr.prototype = {
  constructor: vt,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? sn() : +n) + (e == null ? 0 : +e), !this._next && Ue !== this && (Ue ? Ue._next = this : dt = this, Ue = this), this._call = t, this._time = n, Yt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Yt());
  }
};
function cr(t, e, n) {
  var r = new vt();
  return r.restart(t, e, n), r;
}
function Va() {
  sn(), ++Be;
  for (var t = dt, e; t; )
    (e = we - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Be;
}
function En() {
  we = (gt = He.now()) + xt, Be = Le = 0;
  try {
    Va();
  } finally {
    Be = 0, Ha(), we = 0;
  }
}
function Wa() {
  var t = He.now(), e = t - gt;
  e > hr && (xt -= e, gt = t);
}
function Ha() {
  for (var t, e = dt, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : dt = n);
  Ue = t, Yt(r);
}
function Yt(t) {
  if (!Be) {
    Le && (Le = clearTimeout(Le));
    var e = t - we;
    e > 24 ? (t < 1 / 0 && (Le = setTimeout(En, t - He.now() - xt)), Me && (Me = clearInterval(Me))) : (Me || (gt = He.now(), Me = setInterval(Wa, hr)), Be = 1, fr(En));
  }
}
function kn(t, e, n) {
  var r = new vt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Ya = rn("start", "end", "cancel", "interrupt"), qa = [], dr = 0, Cn = 1, qt = 2, it = 3, In = 4, Xt = 5, at = 6;
function bt(t, e, n, r, i, a) {
  var o = t.__transition;
  if (!o)
    t.__transition = {};
  else if (n in o)
    return;
  Xa(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ya,
    tween: qa,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: dr
  });
}
function on(t, e) {
  var n = re(t, e);
  if (n.state > dr)
    throw new Error("too late; already scheduled");
  return n;
}
function se(t, e) {
  var n = re(t, e);
  if (n.state > it)
    throw new Error("too late; already running");
  return n;
}
function re(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function Xa(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = cr(a, 0, n.time);
  function a(u) {
    n.state = Cn, n.timer.restart(o, n.delay, n.time), n.delay <= u && o(u - n.delay);
  }
  function o(u) {
    var l, f, c, d;
    if (n.state !== Cn)
      return h();
    for (l in r)
      if (d = r[l], d.name === n.name) {
        if (d.state === it)
          return kn(o);
        d.state === In ? (d.state = at, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[l]) : +l < e && (d.state = at, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[l]);
      }
    if (kn(function() {
      n.state === it && (n.state = In, n.timer.restart(s, n.delay, n.time), s(u));
    }), n.state = qt, n.on.call("start", t, t.__data__, n.index, n.group), n.state === qt) {
      for (n.state = it, i = new Array(c = n.tween.length), l = 0, f = -1; l < c; ++l)
        (d = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = d);
      i.length = f + 1;
    }
  }
  function s(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(h), n.state = Xt, 1), f = -1, c = i.length; ++f < c; )
      i[f].call(t, l);
    n.state === Xt && (n.on.call("end", t, t.__data__, n.index, n.group), h());
  }
  function h() {
    n.state = at, n.timer.stop(), delete r[e];
    for (var u in r)
      return;
    delete t.__transition;
  }
}
function st(t, e) {
  var n = t.__transition, r, i, a = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        a = !1;
        continue;
      }
      i = r.state > qt && r.state < Xt, r.state = at, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    a && delete t.__transition;
  }
}
function ja(t) {
  return this.each(function() {
    st(this, t);
  });
}
function $a(t, e) {
  var n, r;
  return function() {
    var i = se(this, t), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var o = 0, s = r.length; o < s; ++o)
        if (r[o].name === e) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Za(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var a = se(this, t), o = a.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var s = { name: e, value: n }, h = 0, u = i.length; h < u; ++h)
        if (i[h].name === e) {
          i[h] = s;
          break;
        }
      h === u && i.push(s);
    }
    a.tween = i;
  };
}
function Ka(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = re(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? $a : Za)(n, t, e));
}
function ln(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = se(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return re(i, r).value[e];
  };
}
function gr(t, e) {
  var n;
  return (typeof e == "number" ? de : e instanceof Ve ? xn : (n = Ve(e)) ? (e = n, xn) : Ta)(t, e);
}
function Ja(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function es(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ts(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? a : a = e(r = o, n);
  };
}
function ns(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? a : a = e(r = o, n);
  };
}
function rs(t, e, n) {
  var r, i, a;
  return function() {
    var o, s = n(this), h;
    return s == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), h = s + "", o === h ? null : o === r && h === i ? a : (i = h, a = e(r = o, s)));
  };
}
function is(t, e, n) {
  var r, i, a;
  return function() {
    var o, s = n(this), h;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), h = s + "", o === h ? null : o === r && h === i ? a : (i = h, a = e(r = o, s)));
  };
}
function as(t, e) {
  var n = _t(t), r = n === "transform" ? za : gr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? is : rs)(n, r, ln(this, "attr." + t, e)) : e == null ? (n.local ? es : Ja)(n) : (n.local ? ns : ts)(n, r, e));
}
function ss(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function os(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function ls(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && os(t, a)), n;
  }
  return i._value = e, i;
}
function us(t, e) {
  var n, r;
  function i() {
    var a = e.apply(this, arguments);
    return a !== r && (n = (r = a) && ss(t, a)), n;
  }
  return i._value = e, i;
}
function hs(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = _t(t);
  return this.tween(n, (r.local ? ls : us)(r, e));
}
function fs(t, e) {
  return function() {
    on(this, t).delay = +e.apply(this, arguments);
  };
}
function cs(t, e) {
  return e = +e, function() {
    on(this, t).delay = e;
  };
}
function ds(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? fs : cs)(e, t)) : re(this.node(), e).delay;
}
function gs(t, e) {
  return function() {
    se(this, t).duration = +e.apply(this, arguments);
  };
}
function vs(t, e) {
  return e = +e, function() {
    se(this, t).duration = e;
  };
}
function ms(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? gs : vs)(e, t)) : re(this.node(), e).duration;
}
function ps(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    se(this, t).ease = e;
  };
}
function As(t) {
  var e = this._id;
  return arguments.length ? this.each(ps(e, t)) : re(this.node(), e).ease;
}
function ys(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    se(this, t).ease = n;
  };
}
function _s(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(ys(this._id, t));
}
function xs(t) {
  typeof t != "function" && (t = Xn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = e[i], o = a.length, s = r[i] = [], h, u = 0; u < o; ++u)
      (h = a[u]) && t.call(h, h.__data__, u, a) && s.push(h);
  return new fe(r, this._parents, this._name, this._id);
}
function bs(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), o = new Array(r), s = 0; s < a; ++s)
    for (var h = e[s], u = n[s], l = h.length, f = o[s] = new Array(l), c, d = 0; d < l; ++d)
      (c = h[d] || u[d]) && (f[d] = c);
  for (; s < r; ++s)
    o[s] = e[s];
  return new fe(o, this._parents, this._name, this._id);
}
function ws(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Es(t, e, n) {
  var r, i, a = ws(e) ? on : se;
  return function() {
    var o = a(this, t), s = o.on;
    s !== r && (i = (r = s).copy()).on(e, n), o.on = i;
  };
}
function ks(t, e) {
  var n = this._id;
  return arguments.length < 2 ? re(this.node(), n).on.on(t) : this.each(Es(n, t, e));
}
function Cs(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function Is() {
  return this.on("end.remove", Cs(this._id));
}
function Bs(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = tn(t));
  for (var r = this._groups, i = r.length, a = new Array(i), o = 0; o < i; ++o)
    for (var s = r[o], h = s.length, u = a[o] = new Array(h), l, f, c = 0; c < h; ++c)
      (l = s[c]) && (f = t.call(l, l.__data__, c, s)) && ("__data__" in l && (f.__data__ = l.__data__), u[c] = f, bt(u[c], e, n, c, u, re(l, n)));
  return new fe(a, this._parents, e, n);
}
function Fs(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = qn(t));
  for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s)
    for (var h = r[s], u = h.length, l, f = 0; f < u; ++f)
      if (l = h[f]) {
        for (var c = t.call(l, l.__data__, f, h), d, v = re(l, n), g = 0, m = c.length; g < m; ++g)
          (d = c[g]) && bt(d, e, n, g, c, v);
        a.push(c), o.push(l);
      }
  return new fe(a, o, e, n);
}
var Ms = Ye.prototype.constructor;
function Ss() {
  return new Ms(this._groups, this._parents);
}
function Rs(t, e) {
  var n, r, i;
  return function() {
    var a = Ie(this, t), o = (this.style.removeProperty(t), Ie(this, t));
    return a === o ? null : a === n && o === r ? i : i = e(n = a, r = o);
  };
}
function vr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ts(t, e, n) {
  var r, i = n + "", a;
  return function() {
    var o = Ie(this, t);
    return o === i ? null : o === r ? a : a = e(r = o, n);
  };
}
function Ns(t, e, n) {
  var r, i, a;
  return function() {
    var o = Ie(this, t), s = n(this), h = s + "";
    return s == null && (h = s = (this.style.removeProperty(t), Ie(this, t))), o === h ? null : o === r && h === i ? a : (i = h, a = e(r = o, s));
  };
}
function Os(t, e) {
  var n, r, i, a = "style." + e, o = "end." + a, s;
  return function() {
    var h = se(this, t), u = h.on, l = h.value[a] == null ? s || (s = vr(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(o, i = l), h.on = r;
  };
}
function Ps(t, e, n) {
  var r = (t += "") == "transform" ? Pa : gr;
  return e == null ? this.styleTween(t, Rs(t, r)).on("end.style." + t, vr(t)) : typeof e == "function" ? this.styleTween(t, Ns(t, r, ln(this, "style." + t, e))).each(Os(this._id, t)) : this.styleTween(t, Ts(t, r, e), n).on("end.style." + t, null);
}
function zs(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ds(t, e, n) {
  var r, i;
  function a() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && zs(t, o, n)), r;
  }
  return a._value = e, a;
}
function Ls(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, Ds(t, e, n ?? ""));
}
function Us(t) {
  return function() {
    this.textContent = t;
  };
}
function Qs(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Gs(t) {
  return this.tween("text", typeof t == "function" ? Qs(ln(this, "text", t)) : Us(t == null ? "" : t + ""));
}
function Vs(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Ws(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Vs(i)), e;
  }
  return r._value = t, r;
}
function Hs(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Ws(t));
}
function Ys() {
  for (var t = this._name, e = this._id, n = mr(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, h, u = 0; u < s; ++u)
      if (h = o[u]) {
        var l = re(h, e);
        bt(h, t, n, u, o, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new fe(r, this._parents, t, n);
}
function qs() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(a, o) {
    var s = { value: o }, h = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var u = se(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(h)), u.on = e;
    }), i === 0 && a();
  });
}
var Xs = 0;
function fe(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function mr() {
  return ++Xs;
}
var oe = Ye.prototype;
fe.prototype = {
  constructor: fe,
  select: Bs,
  selectAll: Fs,
  selectChild: oe.selectChild,
  selectChildren: oe.selectChildren,
  filter: xs,
  merge: bs,
  selection: Ss,
  transition: Ys,
  call: oe.call,
  nodes: oe.nodes,
  node: oe.node,
  size: oe.size,
  empty: oe.empty,
  each: oe.each,
  on: ks,
  attr: as,
  attrTween: hs,
  style: Ps,
  styleTween: Ls,
  text: Gs,
  textTween: Hs,
  remove: Is,
  tween: Ka,
  delay: ds,
  duration: ms,
  ease: As,
  easeVarying: _s,
  end: qs,
  [Symbol.iterator]: oe[Symbol.iterator]
};
var js = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Sr
};
function $s(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Zs(t) {
  var e, n;
  t instanceof fe ? (e = t._id, t = t._name) : (e = mr(), (n = js).time = sn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var o = r[a], s = o.length, h, u = 0; u < s; ++u)
      (h = o[u]) && bt(h, t, e, u, o, n || $s(h, e));
  return new fe(r, this._parents, t, e);
}
Ye.prototype.interrupt = ja;
Ye.prototype.transition = Zs;
const Je = (t) => () => t;
function Ks(t, {
  sourceEvent: e,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function he(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
he.prototype = {
  constructor: he,
  scale: function(t) {
    return t === 1 ? this : new he(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new he(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var _e = new he(1, 0, 0);
he.prototype;
function Nt(t) {
  t.stopImmediatePropagation();
}
function Se(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Js(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function eo() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Bn() {
  return this.__zoom || _e;
}
function to(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function no() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ro(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], a = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o)
  );
}
function io() {
  var t = Js, e = eo, n = ro, r = to, i = no, a = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], s = 250, h = Qa, u = rn("start", "zoom", "end"), l, f, c, d = 500, v = 150, g = 0, m = 10;
  function _(x) {
    x.property("__zoom", Bn).on("wheel.zoom", k, { passive: !1 }).on("mousedown.zoom", M).on("dblclick.zoom", N).filter(i).on("touchstart.zoom", I).on("touchmove.zoom", O).on("touchend.zoom touchcancel.zoom", z).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(x, F, E, R) {
    var B = x.selection ? x.selection() : x;
    B.property("__zoom", Bn), x !== B ? y(x, F, E, R) : B.interrupt().each(function() {
      A(this, arguments).event(R).start().zoom(null, typeof F == "function" ? F.apply(this, arguments) : F).end();
    });
  }, _.scaleBy = function(x, F, E, R) {
    _.scaleTo(x, function() {
      var B = this.__zoom.k, T = typeof F == "function" ? F.apply(this, arguments) : F;
      return B * T;
    }, E, R);
  }, _.scaleTo = function(x, F, E, R) {
    _.transform(x, function() {
      var B = e.apply(this, arguments), T = this.__zoom, S = E == null ? p(B) : typeof E == "function" ? E.apply(this, arguments) : E, P = T.invert(S), D = typeof F == "function" ? F.apply(this, arguments) : F;
      return n(w(b(T, D), S, P), B, o);
    }, E, R);
  }, _.translateBy = function(x, F, E, R) {
    _.transform(x, function() {
      return n(this.__zoom.translate(
        typeof F == "function" ? F.apply(this, arguments) : F,
        typeof E == "function" ? E.apply(this, arguments) : E
      ), e.apply(this, arguments), o);
    }, null, R);
  }, _.translateTo = function(x, F, E, R, B) {
    _.transform(x, function() {
      var T = e.apply(this, arguments), S = this.__zoom, P = R == null ? p(T) : typeof R == "function" ? R.apply(this, arguments) : R;
      return n(_e.translate(P[0], P[1]).scale(S.k).translate(
        typeof F == "function" ? -F.apply(this, arguments) : -F,
        typeof E == "function" ? -E.apply(this, arguments) : -E
      ), T, o);
    }, R, B);
  };
  function b(x, F) {
    return F = Math.max(a[0], Math.min(a[1], F)), F === x.k ? x : new he(F, x.x, x.y);
  }
  function w(x, F, E) {
    var R = F[0] - E[0] * x.k, B = F[1] - E[1] * x.k;
    return R === x.x && B === x.y ? x : new he(x.k, R, B);
  }
  function p(x) {
    return [(+x[0][0] + +x[1][0]) / 2, (+x[0][1] + +x[1][1]) / 2];
  }
  function y(x, F, E, R) {
    x.on("start.zoom", function() {
      A(this, arguments).event(R).start();
    }).on("interrupt.zoom end.zoom", function() {
      A(this, arguments).event(R).end();
    }).tween("zoom", function() {
      var B = this, T = arguments, S = A(B, T).event(R), P = e.apply(B, T), D = E == null ? p(P) : typeof E == "function" ? E.apply(B, T) : E, L = Math.max(P[1][0] - P[0][0], P[1][1] - P[0][1]), U = B.__zoom, Q = typeof F == "function" ? F.apply(B, T) : F, G = h(U.invert(D).concat(L / U.k), Q.invert(D).concat(L / Q.k));
      return function(V) {
        if (V === 1)
          V = Q;
        else {
          var W = G(V), q = L / W[2];
          V = new he(q, D[0] - W[0] * q, D[1] - W[1] * q);
        }
        S.zoom(null, V);
      };
    });
  }
  function A(x, F, E) {
    return !E && x.__zooming || new C(x, F);
  }
  function C(x, F) {
    this.that = x, this.args = F, this.active = 0, this.sourceEvent = null, this.extent = e.apply(x, F), this.taps = 0;
  }
  C.prototype = {
    event: function(x) {
      return x && (this.sourceEvent = x), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(x, F) {
      return this.mouse && x !== "mouse" && (this.mouse[1] = F.invert(this.mouse[0])), this.touch0 && x !== "touch" && (this.touch0[1] = F.invert(this.touch0[0])), this.touch1 && x !== "touch" && (this.touch1[1] = F.invert(this.touch1[0])), this.that.__zoom = F, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(x) {
      var F = $(this.that).datum();
      u.call(
        x,
        this.that,
        new Ks(x, {
          sourceEvent: this.sourceEvent,
          target: _,
          type: x,
          transform: this.that.__zoom,
          dispatch: u
        }),
        F
      );
    }
  };
  function k(x, ...F) {
    if (!t.apply(this, arguments))
      return;
    var E = A(this, F).event(x), R = this.__zoom, B = Math.max(a[0], Math.min(a[1], R.k * Math.pow(2, r.apply(this, arguments)))), T = ye(x);
    if (E.wheel)
      (E.mouse[0][0] !== T[0] || E.mouse[0][1] !== T[1]) && (E.mouse[1] = R.invert(E.mouse[0] = T)), clearTimeout(E.wheel);
    else {
      if (R.k === B)
        return;
      E.mouse = [T, R.invert(T)], st(this), E.start();
    }
    Se(x), E.wheel = setTimeout(S, v), E.zoom("mouse", n(w(b(R, B), E.mouse[0], E.mouse[1]), E.extent, o));
    function S() {
      E.wheel = null, E.end();
    }
  }
  function M(x, ...F) {
    if (c || !t.apply(this, arguments))
      return;
    var E = x.currentTarget, R = A(this, F, !0).event(x), B = $(x.view).on("mousemove.zoom", D, !0).on("mouseup.zoom", L, !0), T = ye(x, E), S = x.clientX, P = x.clientY;
    ga(x.view), Nt(x), R.mouse = [T, this.__zoom.invert(T)], st(this), R.start();
    function D(U) {
      if (Se(U), !R.moved) {
        var Q = U.clientX - S, G = U.clientY - P;
        R.moved = Q * Q + G * G > g;
      }
      R.event(U).zoom("mouse", n(w(R.that.__zoom, R.mouse[0] = ye(U, E), R.mouse[1]), R.extent, o));
    }
    function L(U) {
      B.on("mousemove.zoom mouseup.zoom", null), va(U.view, R.moved), Se(U), R.event(U).end();
    }
  }
  function N(x, ...F) {
    if (t.apply(this, arguments)) {
      var E = this.__zoom, R = ye(x.changedTouches ? x.changedTouches[0] : x, this), B = E.invert(R), T = E.k * (x.shiftKey ? 0.5 : 2), S = n(w(b(E, T), R, B), e.apply(this, F), o);
      Se(x), s > 0 ? $(this).transition().duration(s).call(y, S, R, x) : $(this).call(_.transform, S, R, x);
    }
  }
  function I(x, ...F) {
    if (t.apply(this, arguments)) {
      var E = x.touches, R = E.length, B = A(this, F, x.changedTouches.length === R).event(x), T, S, P, D;
      for (Nt(x), S = 0; S < R; ++S)
        P = E[S], D = ye(P, this), D = [D, this.__zoom.invert(D), P.identifier], B.touch0 ? !B.touch1 && B.touch0[2] !== D[2] && (B.touch1 = D, B.taps = 0) : (B.touch0 = D, T = !0, B.taps = 1 + !!l);
      l && (l = clearTimeout(l)), T && (B.taps < 2 && (f = D[0], l = setTimeout(function() {
        l = null;
      }, d)), st(this), B.start());
    }
  }
  function O(x, ...F) {
    if (this.__zooming) {
      var E = A(this, F).event(x), R = x.changedTouches, B = R.length, T, S, P, D;
      for (Se(x), T = 0; T < B; ++T)
        S = R[T], P = ye(S, this), E.touch0 && E.touch0[2] === S.identifier ? E.touch0[0] = P : E.touch1 && E.touch1[2] === S.identifier && (E.touch1[0] = P);
      if (S = E.that.__zoom, E.touch1) {
        var L = E.touch0[0], U = E.touch0[1], Q = E.touch1[0], G = E.touch1[1], V = (V = Q[0] - L[0]) * V + (V = Q[1] - L[1]) * V, W = (W = G[0] - U[0]) * W + (W = G[1] - U[1]) * W;
        S = b(S, Math.sqrt(V / W)), P = [(L[0] + Q[0]) / 2, (L[1] + Q[1]) / 2], D = [(U[0] + G[0]) / 2, (U[1] + G[1]) / 2];
      } else if (E.touch0)
        P = E.touch0[0], D = E.touch0[1];
      else
        return;
      E.zoom("touch", n(w(S, P, D), E.extent, o));
    }
  }
  function z(x, ...F) {
    if (this.__zooming) {
      var E = A(this, F).event(x), R = x.changedTouches, B = R.length, T, S;
      for (Nt(x), c && clearTimeout(c), c = setTimeout(function() {
        c = null;
      }, d), T = 0; T < B; ++T)
        S = R[T], E.touch0 && E.touch0[2] === S.identifier ? delete E.touch0 : E.touch1 && E.touch1[2] === S.identifier && delete E.touch1;
      if (E.touch1 && !E.touch0 && (E.touch0 = E.touch1, delete E.touch1), E.touch0)
        E.touch0[1] = this.__zoom.invert(E.touch0[0]);
      else if (E.end(), E.taps === 2 && (S = ye(S, this), Math.hypot(f[0] - S[0], f[1] - S[1]) < m)) {
        var P = $(this).on("dblclick.zoom");
        P && P.apply(this, arguments);
      }
    }
  }
  return _.wheelDelta = function(x) {
    return arguments.length ? (r = typeof x == "function" ? x : Je(+x), _) : r;
  }, _.filter = function(x) {
    return arguments.length ? (t = typeof x == "function" ? x : Je(!!x), _) : t;
  }, _.touchable = function(x) {
    return arguments.length ? (i = typeof x == "function" ? x : Je(!!x), _) : i;
  }, _.extent = function(x) {
    return arguments.length ? (e = typeof x == "function" ? x : Je([[+x[0][0], +x[0][1]], [+x[1][0], +x[1][1]]]), _) : e;
  }, _.scaleExtent = function(x) {
    return arguments.length ? (a[0] = +x[0], a[1] = +x[1], _) : [a[0], a[1]];
  }, _.translateExtent = function(x) {
    return arguments.length ? (o[0][0] = +x[0][0], o[1][0] = +x[1][0], o[0][1] = +x[0][1], o[1][1] = +x[1][1], _) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, _.constrain = function(x) {
    return arguments.length ? (n = x, _) : n;
  }, _.duration = function(x) {
    return arguments.length ? (s = +x, _) : s;
  }, _.interpolate = function(x) {
    return arguments.length ? (h = x, _) : h;
  }, _.on = function() {
    var x = u.on.apply(u, arguments);
    return x === u ? _ : x;
  }, _.clickDistance = function(x) {
    return arguments.length ? (g = (x = +x) * x, _) : Math.sqrt(g);
  }, _.tapDistance = function(x) {
    return arguments.length ? (m = +x, _) : m;
  }, _;
}
var ao = 1e-6, ge = typeof Float32Array < "u" ? Float32Array : Array;
Math.hypot || (Math.hypot = function() {
  for (var t = 0, e = arguments.length; e--; )
    t += arguments[e] * arguments[e];
  return Math.sqrt(t);
});
function so() {
  var t = new ge(9);
  return ge != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[0] = 1, t[4] = 1, t[8] = 1, t;
}
function oo(t, e) {
  var n = e[0], r = e[1], i = e[2], a = e[3], o = e[4], s = e[5], h = e[6], u = e[7], l = e[8], f = e[9], c = e[10], d = e[11], v = e[12], g = e[13], m = e[14], _ = e[15], b = n * s - r * o, w = n * h - i * o, p = n * u - a * o, y = r * h - i * s, A = r * u - a * s, C = i * u - a * h, k = l * g - f * v, M = l * m - c * v, N = l * _ - d * v, I = f * m - c * g, O = f * _ - d * g, z = c * _ - d * m, x = b * z - w * O + p * I + y * N - A * M + C * k;
  return x ? (x = 1 / x, t[0] = (s * z - h * O + u * I) * x, t[1] = (h * N - o * z - u * M) * x, t[2] = (o * O - s * N + u * k) * x, t[3] = (i * O - r * z - a * I) * x, t[4] = (n * z - i * N + a * M) * x, t[5] = (r * N - n * O - a * k) * x, t[6] = (g * C - m * A + _ * y) * x, t[7] = (m * p - v * C - _ * w) * x, t[8] = (v * A - g * p + _ * b) * x, t) : null;
}
function Re() {
  var t = new ge(16);
  return ge != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0), t[0] = 1, t[5] = 1, t[10] = 1, t[15] = 1, t;
}
function Ot(t) {
  return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
function Pt(t, e, n) {
  var r = e[0], i = e[1], a = e[2], o = e[3], s = e[4], h = e[5], u = e[6], l = e[7], f = e[8], c = e[9], d = e[10], v = e[11], g = e[12], m = e[13], _ = e[14], b = e[15], w = n[0], p = n[1], y = n[2], A = n[3];
  return t[0] = w * r + p * s + y * f + A * g, t[1] = w * i + p * h + y * c + A * m, t[2] = w * a + p * u + y * d + A * _, t[3] = w * o + p * l + y * v + A * b, w = n[4], p = n[5], y = n[6], A = n[7], t[4] = w * r + p * s + y * f + A * g, t[5] = w * i + p * h + y * c + A * m, t[6] = w * a + p * u + y * d + A * _, t[7] = w * o + p * l + y * v + A * b, w = n[8], p = n[9], y = n[10], A = n[11], t[8] = w * r + p * s + y * f + A * g, t[9] = w * i + p * h + y * c + A * m, t[10] = w * a + p * u + y * d + A * _, t[11] = w * o + p * l + y * v + A * b, w = n[12], p = n[13], y = n[14], A = n[15], t[12] = w * r + p * s + y * f + A * g, t[13] = w * i + p * h + y * c + A * m, t[14] = w * a + p * u + y * d + A * _, t[15] = w * o + p * l + y * v + A * b, t;
}
function Fn(t, e, n) {
  var r = n[0], i = n[1], a = n[2], o, s, h, u, l, f, c, d, v, g, m, _;
  return e === t ? (t[12] = e[0] * r + e[4] * i + e[8] * a + e[12], t[13] = e[1] * r + e[5] * i + e[9] * a + e[13], t[14] = e[2] * r + e[6] * i + e[10] * a + e[14], t[15] = e[3] * r + e[7] * i + e[11] * a + e[15]) : (o = e[0], s = e[1], h = e[2], u = e[3], l = e[4], f = e[5], c = e[6], d = e[7], v = e[8], g = e[9], m = e[10], _ = e[11], t[0] = o, t[1] = s, t[2] = h, t[3] = u, t[4] = l, t[5] = f, t[6] = c, t[7] = d, t[8] = v, t[9] = g, t[10] = m, t[11] = _, t[12] = o * r + l * i + v * a + e[12], t[13] = s * r + f * i + g * a + e[13], t[14] = h * r + c * i + m * a + e[14], t[15] = u * r + d * i + _ * a + e[15]), t;
}
function Mn(t, e, n, r) {
  var i = r[0], a = r[1], o = r[2], s = Math.hypot(i, a, o), h, u, l, f, c, d, v, g, m, _, b, w, p, y, A, C, k, M, N, I, O, z, x, F;
  return s < ao ? null : (s = 1 / s, i *= s, a *= s, o *= s, h = Math.sin(n), u = Math.cos(n), l = 1 - u, f = e[0], c = e[1], d = e[2], v = e[3], g = e[4], m = e[5], _ = e[6], b = e[7], w = e[8], p = e[9], y = e[10], A = e[11], C = i * i * l + u, k = a * i * l + o * h, M = o * i * l - a * h, N = i * a * l - o * h, I = a * a * l + u, O = o * a * l + i * h, z = i * o * l + a * h, x = a * o * l - i * h, F = o * o * l + u, t[0] = f * C + g * k + w * M, t[1] = c * C + m * k + p * M, t[2] = d * C + _ * k + y * M, t[3] = v * C + b * k + A * M, t[4] = f * N + g * I + w * O, t[5] = c * N + m * I + p * O, t[6] = d * N + _ * I + y * O, t[7] = v * N + b * I + A * O, t[8] = f * z + g * x + w * F, t[9] = c * z + m * x + p * F, t[10] = d * z + _ * x + y * F, t[11] = v * z + b * x + A * F, e !== t && (t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t);
}
function lo(t, e, n, r, i) {
  var a = 1 / Math.tan(e / 2), o;
  return t[0] = a / n, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, i != null && i !== 1 / 0 ? (o = 1 / (r - i), t[10] = (i + r) * o, t[14] = 2 * i * r * o) : (t[10] = -1, t[14] = -2 * r), t;
}
var uo = lo;
function ho(t, e, n, r, i, a, o) {
  var s = 1 / (e - n), h = 1 / (r - i), u = 1 / (a - o);
  return t[0] = -2 * s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * h, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * u, t[11] = 0, t[12] = (e + n) * s, t[13] = (i + r) * h, t[14] = (o + a) * u, t[15] = 1, t;
}
var fo = ho;
function ot() {
  var t = new ge(3);
  return ge != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t;
}
(function() {
  var t = ot();
  return function(e, n, r, i, a, o) {
    var s, h;
    for (n || (n = 3), r || (r = 0), i ? h = Math.min(i * n + r, e.length) : h = e.length, s = r; s < h; s += n)
      t[0] = e[s], t[1] = e[s + 1], t[2] = e[s + 2], a(t, t, o), e[s] = t[0], e[s + 1] = t[1], e[s + 2] = t[2];
    return e;
  };
})();
function pr() {
  var t = new ge(4);
  return ge != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0), t;
}
function co(t, e, n) {
  var r = e[0], i = e[1], a = e[2], o = e[3];
  return t[0] = n[0] * r + n[4] * i + n[8] * a + n[12] * o, t[1] = n[1] * r + n[5] * i + n[9] * a + n[13] * o, t[2] = n[2] * r + n[6] * i + n[10] * a + n[14] * o, t[3] = n[3] * r + n[7] * i + n[11] * a + n[15] * o, t;
}
(function() {
  var t = pr();
  return function(e, n, r, i, a, o) {
    var s, h;
    for (n || (n = 4), r || (r = 0), i ? h = Math.min(i * n + r, e.length) : h = e.length, s = r; s < h; s += n)
      t[0] = e[s], t[1] = e[s + 1], t[2] = e[s + 2], t[3] = e[s + 3], a(t, t, o), e[s] = t[0], e[s + 1] = t[1], e[s + 2] = t[2], e[s + 3] = t[3];
    return e;
  };
})();
function go(t, e) {
  let n = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], r = null;
  for (let i = 0; i < n.length; ++i) {
    try {
      r = t.getContext(n[i], e);
    } catch {
    }
    if (r)
      break;
  }
  return r;
}
function K(t, e, n) {
  let r;
  return r = t.createShader(n), t.shaderSource(r, e), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (console.log("ERROR with script: ", e), console.log(t.getShaderInfoLog(r)), null);
}
function ke(t, e, n, r, i) {
  let a = i.createProgram();
  if (i.attachShader(a, t), i.attachShader(a, e), i.linkProgram(a), !i.getProgramParameter(a, i.LINK_STATUS)) {
    alert("Shader Compilation Error." + i.getProgramInfoLog(a));
    return;
  }
  if (this.ID = a, this.uniforms = new Object(), this.attributes = new Object(), n)
    for (let o = 0; o < n.length; o++)
      this.uniforms[n[o]] = i.getUniformLocation(this.ID, n[o]);
  if (this.attributes.enable = function(o) {
    i.enableVertexAttribArray(this[o]);
  }, this.attributes.disable = function(o) {
    i.disableVertexAttribArray(this[o]);
  }, r)
    for (let o = 0; o < r.length; o++)
      this.attributes[r[o]] = i.getAttribLocation(this.ID, r[o]);
  this.use = function(o) {
    o.useProgram(this.ID);
  };
}
function Ar(t, e = !0, n = !0) {
  let r = [
    -1,
    1,
    0,
    -1,
    -1,
    0,
    1,
    1,
    0,
    1,
    -1,
    0
  ], i = [
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1
  ], a = [
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0
  ], o = {};
  return n && (o.texCoordObject = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, o.texCoordObject), t.bufferData(t.ARRAY_BUFFER, new Float32Array(a), t.STATIC_DRAW)), e && (o.normalObject = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, o.normalObject), t.bufferData(t.ARRAY_BUFFER, new Float32Array(i), t.STATIC_DRAW)), o.vertexObject = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, o.vertexObject), t.bufferData(t.ARRAY_BUFFER, new Float32Array(r), t.STATIC_DRAW), o.numIndices = 4, o;
}
function Sn(t) {
  return t * Math.PI / 180;
}
function jt(t, e, n, r) {
  if (r <= n)
    return n;
  const i = Math.floor(n + (r - n) / 2), a = e - t[i].value, o = e - t[i + 1].value;
  return a < 0 ? jt(t, e, n, i - 1) : o < 0 ? i : jt(t, e, i + 1, r);
}
const vo = (t, e, n) => {
  const r = (t - e) / (n - e);
  return [1 - r, r];
};
function mo(t) {
  return t.value !== void 0 && t.mapped !== void 0;
}
function po(t) {
  return t.length > 0 && mo(t[0]);
}
function Rn(t, e, n, r) {
  return [
    t * e[0] + n * r[0],
    t * e[1] + n * r[1],
    t * e[2] + n * r[2]
  ];
}
function Tn(t) {
  return t || vo;
}
function Ao(t, e, n) {
  return !Array.isArray(t) || t.length < 1 ? xo : po(t) ? yo(t, e, Tn(n), Rn) : _o(t, e, Tn(n), Rn);
}
function yo(t, e, n, r) {
  const i = t.sort((a, o) => a.value < o.value ? -1 : 1);
  return function(a) {
    const o = e(a), s = jt(i, o, 0, i.length - 1);
    if (s == 0 && o < i[0].value)
      return i[s].mapped;
    if (s == i.length - 1)
      return i[s].mapped;
    const [h, u] = n(o, i[s].value, i[s + 1].value);
    return r(h, i[s].mapped, u, i[s + 1].mapped);
  };
}
function _o(t, e, n, r) {
  return function(i) {
    const a = e(i), o = (t.length - 1) * a;
    if (o <= 0)
      return t[0];
    if (o >= t.length - 1)
      return t[t.length - 1];
    const s = Math.floor(o), [h, u] = n(o, s, s + 1);
    return r(h, t[s], u, t[s + 1]);
  };
}
function xo(t) {
  return [0, 0, 0];
}
function bo(t, e) {
  let [n, r] = t;
  const [i, a] = e;
  return Math.abs(n - r) < Number.EPSILON && (r = n + 1), function(o) {
    return i + (a - i) * ((o - n) / (r - n));
  };
}
const wo = [
  [1462e-6, 466e-6, 0.013866],
  [2267e-6, 127e-5, 0.01857],
  [3299e-6, 2249e-6, 0.024239],
  [4547e-6, 3392e-6, 0.030909],
  [6006e-6, 4692e-6, 0.038558],
  [7676e-6, 6136e-6, 0.046836],
  [9561e-6, 7713e-6, 0.055143],
  [0.011663, 9417e-6, 0.06346],
  [0.013995, 0.011225, 0.071862],
  [0.016561, 0.013136, 0.080282],
  [0.019373, 0.015133, 0.088767],
  [0.022447, 0.017199, 0.097327],
  [0.025793, 0.019331, 0.10593],
  [0.029432, 0.021503, 0.114621],
  [0.033385, 0.023702, 0.123397],
  [0.037668, 0.025921, 0.132232],
  [0.042253, 0.028139, 0.141141],
  [0.046915, 0.030324, 0.150164],
  [0.051644, 0.032474, 0.159254],
  [0.056449, 0.034569, 0.168414],
  [0.06134, 0.03659, 0.177642],
  [0.066331, 0.038504, 0.186962],
  [0.071429, 0.040294, 0.196354],
  [0.076637, 0.041905, 0.205799],
  [0.081962, 0.043328, 0.215289],
  [0.087411, 0.044556, 0.224813],
  [0.09299, 0.045583, 0.234358],
  [0.098702, 0.046402, 0.243904],
  [0.104551, 0.047008, 0.25343],
  [0.110536, 0.047399, 0.262912],
  [0.116656, 0.047574, 0.272321],
  [0.122908, 0.047536, 0.281624],
  [0.129285, 0.047293, 0.290788],
  [0.135778, 0.046856, 0.299776],
  [0.142378, 0.046242, 0.308553],
  [0.149073, 0.045468, 0.317085],
  [0.15585, 0.044559, 0.325338],
  [0.162689, 0.043554, 0.333277],
  [0.169575, 0.042489, 0.340874],
  [0.176493, 0.041402, 0.348111],
  [0.183429, 0.040329, 0.354971],
  [0.190367, 0.039309, 0.361447],
  [0.197297, 0.0384, 0.367535],
  [0.204209, 0.037632, 0.373238],
  [0.211095, 0.03703, 0.378563],
  [0.217949, 0.036615, 0.383522],
  [0.224763, 0.036405, 0.388129],
  [0.231538, 0.036405, 0.3924],
  [0.238273, 0.036621, 0.396353],
  [0.244967, 0.037055, 0.400007],
  [0.25162, 0.037705, 0.403378],
  [0.258234, 0.038571, 0.406485],
  [0.26481, 0.039647, 0.409345],
  [0.271347, 0.040922, 0.411976],
  [0.27785, 0.042353, 0.414392],
  [0.284321, 0.043933, 0.416608],
  [0.290763, 0.045644, 0.418637],
  [0.297178, 0.04747, 0.420491],
  [0.303568, 0.049396, 0.422182],
  [0.309935, 0.051407, 0.423721],
  [0.316282, 0.05349, 0.425116],
  [0.32261, 0.055634, 0.426377],
  [0.328921, 0.057827, 0.427511],
  [0.335217, 0.06006, 0.428524],
  [0.3415, 0.062325, 0.429425],
  [0.347771, 0.064616, 0.430217],
  [0.354032, 0.066925, 0.430906],
  [0.360284, 0.069247, 0.431497],
  [0.366529, 0.071579, 0.431994],
  [0.372768, 0.073915, 0.4324],
  [0.379001, 0.076253, 0.432719],
  [0.385228, 0.078591, 0.432955],
  [0.391453, 0.080927, 0.433109],
  [0.397674, 0.083257, 0.433183],
  [0.403894, 0.08558, 0.433179],
  [0.410113, 0.087896, 0.433098],
  [0.416331, 0.090203, 0.432943],
  [0.422549, 0.092501, 0.432714],
  [0.428768, 0.09479, 0.432412],
  [0.434987, 0.097069, 0.432039],
  [0.441207, 0.099338, 0.431594],
  [0.447428, 0.101597, 0.43108],
  [0.453651, 0.103848, 0.430498],
  [0.459875, 0.106089, 0.429846],
  [0.4661, 0.108322, 0.429125],
  [0.472328, 0.110547, 0.428334],
  [0.478558, 0.112764, 0.427475],
  [0.484789, 0.114974, 0.426548],
  [0.491022, 0.117179, 0.425552],
  [0.497257, 0.119379, 0.424488],
  [0.503493, 0.121575, 0.423356],
  [0.50973, 0.123769, 0.422156],
  [0.515967, 0.12596, 0.420887],
  [0.522206, 0.12815, 0.419549],
  [0.528444, 0.130341, 0.418142],
  [0.534683, 0.132534, 0.416667],
  [0.54092, 0.134729, 0.415123],
  [0.547157, 0.136929, 0.413511],
  [0.553392, 0.139134, 0.411829],
  [0.559624, 0.141346, 0.410078],
  [0.565854, 0.143567, 0.408258],
  [0.572081, 0.145797, 0.406369],
  [0.578304, 0.148039, 0.404411],
  [0.584521, 0.150294, 0.402385],
  [0.590734, 0.152563, 0.40029],
  [0.59694, 0.154848, 0.398125],
  [0.603139, 0.157151, 0.395891],
  [0.60933, 0.159474, 0.393589],
  [0.615513, 0.161817, 0.391219],
  [0.621685, 0.164184, 0.388781],
  [0.627847, 0.166575, 0.386276],
  [0.633998, 0.168992, 0.383704],
  [0.640135, 0.171438, 0.381065],
  [0.64626, 0.173914, 0.378359],
  [0.652369, 0.176421, 0.375586],
  [0.658463, 0.178962, 0.372748],
  [0.66454, 0.181539, 0.369846],
  [0.670599, 0.184153, 0.366879],
  [0.676638, 0.186807, 0.363849],
  [0.682656, 0.189501, 0.360757],
  [0.688653, 0.192239, 0.357603],
  [0.694627, 0.195021, 0.354388],
  [0.700576, 0.197851, 0.351113],
  [0.7065, 0.200728, 0.347777],
  [0.712396, 0.203656, 0.344383],
  [0.718264, 0.206636, 0.340931],
  [0.724103, 0.20967, 0.337424],
  [0.729909, 0.212759, 0.333861],
  [0.735683, 0.215906, 0.330245],
  [0.741423, 0.219112, 0.326576],
  [0.747127, 0.222378, 0.322856],
  [0.752794, 0.225706, 0.319085],
  [0.758422, 0.229097, 0.315266],
  [0.76401, 0.232554, 0.311399],
  [0.769556, 0.236077, 0.307485],
  [0.775059, 0.239667, 0.303526],
  [0.780517, 0.243327, 0.299523],
  [0.785929, 0.247056, 0.295477],
  [0.791293, 0.250856, 0.29139],
  [0.796607, 0.254728, 0.287264],
  [0.801871, 0.258674, 0.283099],
  [0.807082, 0.262692, 0.278898],
  [0.812239, 0.266786, 0.274661],
  [0.817341, 0.270954, 0.27039],
  [0.822386, 0.275197, 0.266085],
  [0.827372, 0.279517, 0.26175],
  [0.832299, 0.283913, 0.257383],
  [0.837165, 0.288385, 0.252988],
  [0.841969, 0.292933, 0.248564],
  [0.846709, 0.297559, 0.244113],
  [0.851384, 0.30226, 0.239636],
  [0.855992, 0.307038, 0.235133],
  [0.860533, 0.311892, 0.230606],
  [0.865006, 0.316822, 0.226055],
  [0.869409, 0.321827, 0.221482],
  [0.873741, 0.326906, 0.216886],
  [0.878001, 0.33206, 0.212268],
  [0.882188, 0.337287, 0.207628],
  [0.886302, 0.342586, 0.202968],
  [0.890341, 0.347957, 0.198286],
  [0.894305, 0.353399, 0.193584],
  [0.898192, 0.358911, 0.18886],
  [0.902003, 0.364492, 0.184116],
  [0.905735, 0.37014, 0.17935],
  [0.90939, 0.375856, 0.174563],
  [0.912966, 0.381636, 0.169755],
  [0.916462, 0.387481, 0.164924],
  [0.919879, 0.393389, 0.16007],
  [0.923215, 0.399359, 0.155193],
  [0.92647, 0.405389, 0.150292],
  [0.929644, 0.411479, 0.145367],
  [0.932737, 0.417627, 0.140417],
  [0.935747, 0.423831, 0.13544],
  [0.938675, 0.430091, 0.130438],
  [0.941521, 0.436405, 0.125409],
  [0.944285, 0.442772, 0.120354],
  [0.946965, 0.449191, 0.115272],
  [0.949562, 0.45566, 0.110164],
  [0.952075, 0.462178, 0.105031],
  [0.954506, 0.468744, 0.099874],
  [0.956852, 0.475356, 0.094695],
  [0.959114, 0.482014, 0.089499],
  [0.961293, 0.488716, 0.084289],
  [0.963387, 0.495462, 0.079073],
  [0.965397, 0.502249, 0.073859],
  [0.967322, 0.509078, 0.068659],
  [0.969163, 0.515946, 0.063488],
  [0.970919, 0.522853, 0.058367],
  [0.97259, 0.529798, 0.053324],
  [0.974176, 0.53678, 0.048392],
  [0.975677, 0.543798, 0.043618],
  [0.977092, 0.55085, 0.03905],
  [0.978422, 0.557937, 0.034931],
  [0.979666, 0.565057, 0.031409],
  [0.980824, 0.572209, 0.028508],
  [0.981895, 0.579392, 0.02625],
  [0.982881, 0.586606, 0.024661],
  [0.983779, 0.593849, 0.02377],
  [0.984591, 0.601122, 0.023606],
  [0.985315, 0.608422, 0.024202],
  [0.985952, 0.61575, 0.025592],
  [0.986502, 0.623105, 0.027814],
  [0.986964, 0.630485, 0.030908],
  [0.987337, 0.63789, 0.034916],
  [0.987622, 0.64532, 0.039886],
  [0.987819, 0.652773, 0.045581],
  [0.987926, 0.66025, 0.05175],
  [0.987945, 0.667748, 0.058329],
  [0.987874, 0.675267, 0.065257],
  [0.987714, 0.682807, 0.072489],
  [0.987464, 0.690366, 0.07999],
  [0.987124, 0.697944, 0.087731],
  [0.986694, 0.70554, 0.095694],
  [0.986175, 0.713153, 0.103863],
  [0.985566, 0.720782, 0.112229],
  [0.984865, 0.728427, 0.120785],
  [0.984075, 0.736087, 0.129527],
  [0.983196, 0.743758, 0.138453],
  [0.982228, 0.751442, 0.147565],
  [0.981173, 0.759135, 0.156863],
  [0.980032, 0.766837, 0.166353],
  [0.978806, 0.774545, 0.176037],
  [0.977497, 0.782258, 0.185923],
  [0.976108, 0.789974, 0.196018],
  [0.974638, 0.797692, 0.206332],
  [0.973088, 0.805409, 0.216877],
  [0.971468, 0.813122, 0.227658],
  [0.969783, 0.820825, 0.238686],
  [0.968041, 0.828515, 0.249972],
  [0.966243, 0.836191, 0.261534],
  [0.964394, 0.843848, 0.273391],
  [0.962517, 0.851476, 0.285546],
  [0.960626, 0.859069, 0.29801],
  [0.95872, 0.866624, 0.31082],
  [0.956834, 0.874129, 0.323974],
  [0.954997, 0.881569, 0.337475],
  [0.953215, 0.888942, 0.351369],
  [0.951546, 0.896226, 0.365627],
  [0.950018, 0.903409, 0.380271],
  [0.948683, 0.910473, 0.395289],
  [0.947594, 0.917399, 0.410665],
  [0.946809, 0.924168, 0.426373],
  [0.946392, 0.930761, 0.442367],
  [0.946403, 0.937159, 0.458592],
  [0.946903, 0.943348, 0.47497],
  [0.947937, 0.949318, 0.491426],
  [0.949545, 0.955063, 0.50786],
  [0.95174, 0.960587, 0.524203],
  [0.954529, 0.965896, 0.540361],
  [0.957896, 0.971003, 0.556275],
  [0.961812, 0.975924, 0.571925],
  [0.966249, 0.980678, 0.587206],
  [0.971162, 0.985282, 0.602154],
  [0.976511, 0.989753, 0.61676],
  [0.982257, 0.994109, 0.631017],
  [0.988362, 0.998364, 0.644924]
];
let Eo = class {
  constructor(e, n, r, i) {
    for (const [a, o] of Object.entries(e))
      a == "Color" || a == "Size" || a == "Position" || a == "OutlineColor" || a == "OutlineWidth" || (this[a] = o);
    this._network = i, this.ID = n, this.index = r;
  }
  set color(e) {
    let n = this.index;
    this._network.colors[n * 4 + 0] = e[0], this._network.colors[n * 4 + 1] = e[1], this._network.colors[n * 4 + 2] = e[2], e.length > 3 && (this._network.colors[n * 4 + 3] = e[3]);
  }
  get color() {
    let e = this.index;
    return [this._network.colors[e * 4 + 0], this._network.colors[e * 4 + 1], this._network.colors[e * 4 + 2], this._network.colors[e * 4 + 3]];
  }
  set opacity(e) {
    let n = this.index;
    this._network.colors[n * 4 + 3] = e;
  }
  get opacity() {
    let e = this.index;
    return this._network.colors[e * 4 + 3];
  }
  set size(e) {
    this._network.sizes[this.index] = e;
  }
  get size() {
    return this._network.sizes[this.index];
  }
  set outlineColor(e) {
    let n = this.index;
    this._network.outlineColors[n * 4 + 0] = e[0], this._network.outlineColors[n * 4 + 1] = e[1], this._network.outlineColors[n * 4 + 2] = e[2], e.length > 3 && (this._network.outlineColors[n * 4 + 3] = e[3]);
  }
  get outlineColor() {
    let e = this.index;
    return [this._network.outlineColors[e * 4 + 0], this._network.outlineColors[e * 4 + 1], this._network.outlineColors[e * 4 + 2], this._network.outlineColors[e * 4 + 3]];
  }
  set outlineWidth(e) {
    this._network.outlineWidths[this.index] = e;
  }
  get outlineWidth() {
    return this._network.outlineWidths[this.index];
  }
  get network() {
    return this._network;
  }
  set position(e) {
    let n = this.index;
    this._network.positions[n * 3 + 0] = e[0], this._network.positions[n * 3 + 1] = e[1], this._network.positions[n * 3 + 2] = e[2];
  }
  get position() {
    let e = this.index;
    return [this._network.positions[e * 3 + 0], this._network.positions[e * 3 + 1], this._network.positions[e * 3 + 2]];
  }
};
class ko {
  constructor(e, n, r) {
    this.ID2index = new Object(), this.index2Node = [];
    for (const [o, s] of Object.entries(e))
      if (!this.ID2index.hasOwnProperty(o)) {
        let h = this.index2Node.length;
        this.ID2index[o] = h, s.index = h, s.ID = o, this.index2Node.push(s), s.neighbors = [], s.edges = [];
      }
    this.indexedEdges = new Int32Array(n.length * 2);
    for (let o = 0; o < n.length; o++) {
      const s = n[o];
      let h = this.ID2index[s.source], u = this.ID2index[s.target];
      this.indexedEdges[o * 2] = h, this.indexedEdges[o * 2 + 1] = u;
    }
    this.positions = new Float32Array(3 * this.index2Node.length), this.colors = new Float32Array(4 * this.index2Node.length), this.sizes = new Float32Array(this.index2Node.length), this.outlineColors = new Float32Array(4 * this.index2Node.length);
    for (let o = 0; o < this.index2Node.length; o++)
      this.colors[o * 4 + 3] = 1, this.outlineColors[o * 4 + 3] = 1;
    this.outlineWidths = new Float32Array(this.index2Node.length), this.edgePositions = null, this.edgeColors = null, this.edgeSizes = null, this.nodes = {};
    let i = bo([0, this.index2Node.length], [0, 1]), a = Ao(wo, i);
    for (let o = 0; o < this.index2Node.length; o++) {
      let s = this.index2Node[o];
      if (s.hasOwnProperty("Position") ? (this.positions[o * 3] = s.Position[0], this.positions[o * 3 + 1] = s.Position[1], this.positions[o * 3 + 2] = s.Position[2]) : s.hasOwnProperty("posx") && s.hasOwnProperty("posy") ? (this.positions[o * 3] = s.posx, this.positions[o * 3 + 1] = s.posy, s.hasOwnProperty("posz") ? this.positions[o * 3 + 2] = s.posz : this.positions[o * 3 + 2] = 0) : (this.positions[o * 3 + 0] = (Math.random() - 0.5) * 2 * 200, this.positions[o * 3 + 1] = (Math.random() - 0.5) * 2 * 200, this.positions[o * 3 + 2] = (Math.random() - 0.5) * 2 * 200), s.hasOwnProperty("Color"))
        o == 0 && console.log("NODE COLOR:", s.Color), this.colors[o * 4 + 0] = s.Color[0], this.colors[o * 4 + 1] = s.Color[1], this.colors[o * 4 + 2] = s.Color[2], s.Color.length > 3 ? this.colors[o * 4 + 3] = s.Color[3] : this.colors[o * 4 + 3] = 1;
      else {
        let u = a(o);
        this.colors[o * 4 + 0] = u[0], this.colors[o * 4 + 1] = u[1], this.colors[o * 4 + 2] = u[2], u.length > 3 ? this.colors[o * 4 + 3] = u[3] : this.colors[o * 4 + 3] = 1;
      }
      s.hasOwnProperty("Size") ? this.sizes[o] = s.Size : this.sizes[o] = 1, s.hasOwnProperty("OutlineColor") ? (this.outlineColors[o * 4 + 0] = s.OutlineColor[0], this.outlineColors[o * 4 + 1] = s.OutlineColor[1], this.outlineColors[o * 4 + 2] = s.OutlineColor[2], s.OutlineColor.length > 3 ? this.outlineColors[o * 4 + 3] = s.OutlineColor[3] : this.outlineColors[o * 4 + 3] = 1) : (this.outlineColors[o * 4 + 0] = 1, this.outlineColors[o * 4 + 1] = 1, this.outlineColors[o * 4 + 2] = 1, this.outlineColors[o * 4 + 3] = 1), s.hasOwnProperty("OutlineWidth") ? this.outlineWidths[o] = s.OutlineWidth : this.outlineWidths[o] = 0;
      let h = new Eo(s, s.ID, o, this);
      this.index2Node[o] = h, this.nodes[s.ID] = h;
    }
    for (let o = 0; o < n.length; o++) {
      const s = n[o];
      let h = this.ID2index[s.source], u = this.ID2index[s.target], l = this.index2Node[h], f = this.index2Node[u];
      l.neighbors.push(f), f.neighbors.push(l), l.edges.push(o), f.edges.push(o);
    }
  }
  get nodeCount() {
    return this.index2Node.length;
  }
  updateEdgePositions() {
    this.edgePositions == null && (this.edgePositions = new Float32Array(3 * this.indexedEdges.length));
    const e = this.indexedEdges.length, n = this.positions, r = this.edgePositions, i = this.indexedEdges;
    for (let a = 0; a < e / 2; a++) {
      const o = i[a * 2] * 3, s = i[a * 2 + 1] * 3, h = a * 6, u = h + 3;
      r[h] = n[o], r[h + 1] = n[o + 1], r[h + 2] = n[o + 2], r[u] = n[s], r[u + 1] = n[s + 1], r[u + 2] = n[s + 2];
    }
  }
  updateEdgeColors(e = !0) {
    this.edgeColors == null && (this.edgeColors = new Float32Array(4 * this.indexedEdges.length));
    const n = this.indexedEdges.length, r = this.edgeColors, i = this.colors, a = this.indexedEdges;
    for (let o = 0; o < n / 2; o++) {
      const s = a[o * 2] * 4, h = a[o * 2 + 1] * 4, u = o * 8, l = u + 4;
      r[u] = i[s], r[u + 1] = i[s + 1], r[u + 2] = i[s + 2], r[l] = i[h], r[l + 1] = i[h + 1], r[l + 2] = i[h + 2], e && (r[u + 3] = i[s + 3], r[l + 3] = i[h + 3]);
    }
  }
  updateEdgeSizes() {
    this.edgeSizes == null && (this.edgeSizes = new Float32Array(this.indexedEdges.length));
    const e = this.indexedEdges.length, n = this.edgeSizes, r = this.sizes, i = this.indexedEdges;
    for (let a = 0; a < e / 2; a++) {
      const o = i[a * 2], s = i[a * 2 + 1];
      n[a * 2] = r[o], n[a * 2 + 1] = r[s];
    }
  }
  updateEdgeOpacity(e) {
    this.edgeColors == null && (this.edgeColors = new Float32Array(4 * this.indexedEdges.length));
    const n = this.indexedEdges.length, r = this.edgeColors, i = this.colors, a = this.indexedEdges;
    for (let o = 0; o < n / 2; o++) {
      const s = a[o * 2] * 4, h = a[o * 2 + 1] * 4;
      r[o * 8 + 3] = i[s + 3], r[o * 8 + 7] = i[h + 3];
    }
  }
}
class Co {
  constructor(e, { FPS: n = 60, throttle: r = !0, maxQueueLength: i = 10 }) {
    this.helios = e, this.needsRender = !1, this.needsUpdateNodesGeometry = !1, this.needsUpdateEdgesGeometry = !1, this._FPS = n, this._throttle = r, this._maxQueueLength = i, this._started = !1, this._paused = !0, this._lastFPS = 0, this._averageFPS = 0, this._tasks = {}, this._executionCount = 0, this._lastTimestamp = null, this._currentTimestamp = null, this._lastExecutionTimestamp = null, this._lastRequestFrameID = 0, this._timeout = null, this._times = [], this._lastRepeatInterval = 0, this._shouldCleanup = !1;
  }
  FPS(e) {
    return e === void 0 ? this.FPS : (this.FPS = e, this);
  }
  schedule({
    name: e = "default",
    callback: n = null,
    delay: r = 0,
    repeat: i = !1,
    maxRepeatCount: a = 1 / 0,
    maxRepeatTime: o = 1 / 0,
    repeatInterval: s = 0,
    synchronized: h = !0,
    immediateUpdates: u = !1,
    updateNodesGeometry: l = !1,
    updateEdgesGeometry: f = !1,
    afterRedraw: c = !1,
    redraw: d = !0,
    replace: v = !0
  }) {
    let g = {
      name: e,
      callback: n,
      delay: r,
      repeat: i,
      maxRepeatCount: a,
      maxRepeatTime: o,
      repeatInterval: s,
      synchronized: h,
      immediateUpdates: u,
      updateNodesGeometry: l,
      updateEdgesGeometry: f,
      afterRedraw: c,
      redraw: d,
      replace: v,
      executionCount: 0,
      lastTimestamp: window.performance.now(),
      lastExecutionTime: 0,
      shouldBeRemoved: !1,
      cancel: function() {
        this.shouldBeRemoved = !0, this.synchronized || clearTimeout(this._timeout);
      }
    };
    return e in this._tasks || (this._tasks[e] = []), v && this._clearTask(e), h || this.runAsyncTask(g, g.delay), this._addTaskToQueue(g, e), this._paused && this._started && this._updateTimeout(), this;
  }
  runAsyncTask(e, n = 0) {
    this._executionCount += 1, e.timeout = setTimeout(() => {
      if (e.shouldBeRemoved)
        return;
      let r = window.performance.now(), i = r - e.lastTimestamp;
      if (e.callback?.(i, e), e.executionCount += 1, e.immediateUpdates ? this._updateHelios(e.needsRender, e.needsUpdateNodesGeometry, e.needsUpdateEdgesGeometry) : (e.redraw && (this.needsRender = !0), e.updateNodesGeometry && (this.needsUpdateNodesGeometry = !0), e.updateEdgesGeometry && (this.needsUpdateEdgesGeometry = !0)), e.repeat) {
        let a = window.performance.now();
        e.lastExecutionTime = a - r, e.lastTimestamp = r;
        let o = e.repeatInterval - (a - r);
        o < 0 && (o = 0), e.executionCount >= e.maxRepeatCount ? e.shouldBeRemoved = !0 : this.runAsyncTask(e, o);
      } else
        e.shouldBeRemoved = !0;
      this._started && this._paused && this._updateTimeout();
    }, n);
  }
  _executeTask(e, n, r) {
    if (e.callback?.(n, e), e === void 0)
      return !1;
    if (e.executionCount += 1, e.repeat && e.executionCount < e.maxRepeatCount) {
      let i = window.performance.now();
      e.lastExecutionTime = i - r, e.lastTimestamp = r;
    } else
      e.shouldBeRemoved = !0;
    return !0;
  }
  runSyncTasks() {
    if (this._shouldCleanup)
      return;
    this._executionCount += 1;
    let e = [], n = window.performance.now();
    for (let r of Object.keys(this._tasks).sort()) {
      let i = this._tasks[r];
      for (let a = 0; a < i.length; a++) {
        if ((i[a].synchronized || !i[a].immediateUpdates) && (i[a].redraw && (this.needsRender = !0), i[a].updateNodesGeometry && (this.needsUpdateNodesGeometry = !0), i[a].updateEdgesGeometry && (this.needsUpdateEdgesGeometry = !0)), !i[a]?.shouldBeRemoved) {
          let o = window.performance.now(), s = o - i[a].lastTimestamp + i[a].lastExecutionTime;
          s < 0 && (s = 0);
          let h = !1;
          if (i[a].executionCount == 0 ? s >= i[a].delay && (h = !0) : s >= i[a].repeatInterval && (h = !0), h) {
            if (i[a].afterRedraw)
              e.push({
                task: i[a],
                elapsedTime: s,
                currentTimestamp: o
              });
            else if (!this._executeTask(i[a], s, o))
              break;
          }
        }
        i[a]?.shouldBeRemoved && (i.splice(a, 1), a--);
      }
      i.length == 0 && delete this._tasks[r];
    }
    this._updateHelios(this.needsRender, this.needsUpdateNodesGeometry, this.needsUpdateEdgesGeometry, !0, e), this._lastTimestamp = n;
  }
  _updateHelios(e, n, r, i, a) {
    e === void 0 && (e = this.needsRender), n === void 0 && (n = this.needsUpdateNodesGeometry), r === void 0 && (r = this.needsUpdateEdgesGeometry), n && (this.helios.updateNodesGeometry(), this.needsUpdateNodesGeometry = !1), r && (this.helios.updateEdgesGeometry(), this.needsUpdateEdgesGeometry = !1), cancelAnimationFrame(this.lastRequestFrameID), this.lastRequestFrameID = requestAnimationFrame(() => {
      if (this._shouldCleanup)
        return;
      const o = window.performance.now();
      for (; this._times.length > 0 && this._times[0] <= o - 1e3; )
        this._times.shift();
      this._times.push(o), this._averageFPS = this._times.length, e && (this.helios.redraw(), this.needsRender = !1), (a?.length || 0) > 0 && a.forEach((s) => {
        s.task._timeout = setTimeout(() => {
          this._executeTask(s.task, s.elapsedTime, s.currentTimestamp);
        }, 0);
      }), i && (this._lastExecutionTimestamp = window.performance.now(), this._updateTimeout());
    });
  }
  _addTaskToQueue(e, n) {
    let r = this._tasks[n];
    r.push(e), r.length > this._maxQueueLength && (r[0].timeout && (r[0].shouldBeRemoved = !0, clearTimeout(e.taskQueue[0])), r.shift(), console.warn(`One task was discarded because of too many tasks in the ${n} queue. (maxQueueLength = ${this._maxQueueLength})`));
  }
  _clearTask(e) {
    if (e in this._tasks) {
      let n = this._tasks[e];
      for (let r = 0; r < n.length; r++) {
        let i = n[r];
        i.timeout && (i.shouldBeRemoved = !0, clearTimeout(i.timeout));
      }
      n.length = 0;
    }
  }
  unschedule(e) {
    return e in this._tasks && (this._clearTask(e), delete this._tasks[e]), this._updateTimeout(), this;
  }
  hasTask(e) {
    return e in this._tasks;
  }
  start() {
    return this._started = !0, this._updateTimeout(), this;
  }
  stop() {
    return this._shouldCleanup = !0, clearTimeout(this._timeout), this.paused = !1, this.started = !1, this._lastTimestamp = null, this._lastExecutionTime = 0, this;
  }
  _updateTimeout() {
    if (clearTimeout(this._timeout), this._started)
      if (Object.keys(this._tasks).length === 0)
        this.paused = !0;
      else {
        this.paused = !1;
        let e = 0, n = window.performance.now();
        this._lastTimestamp != null && this._throttle && (e = 1e3 / this._FPS - (n - this._lastTimestamp), e < 0 && (e = 0)), this._lastFPS = 1e3 / (n - this._lastTimestamp), this._timeout = setTimeout(() => {
          this.runSyncTasks();
        }, e);
      }
  }
}
function Io(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function et(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var yr = { exports: {} };
/*!

pica
https://github.com/nodeca/pica

*/
(function(t, e) {
  (function(n) {
    t.exports = n();
  })(function() {
    return function() {
      function n(r, i, a) {
        function o(u, l) {
          if (!i[u]) {
            if (!r[u]) {
              var f = typeof et == "function" && et;
              if (!l && f)
                return f(u, !0);
              if (s)
                return s(u, !0);
              var c = new Error("Cannot find module '" + u + "'");
              throw c.code = "MODULE_NOT_FOUND", c;
            }
            var d = i[u] = { exports: {} };
            r[u][0].call(d.exports, function(v) {
              var g = r[u][1][v];
              return o(g || v);
            }, d, d.exports, n, r, i, a);
          }
          return i[u].exports;
        }
        for (var s = typeof et == "function" && et, h = 0; h < a.length; h++)
          o(a[h]);
        return o;
      }
      return n;
    }()({ 1: [function(n, r, i) {
      var a = n("multimath"), o = n("./mm_unsharp_mask"), s = n("./mm_resize");
      function h(u) {
        var l = u || [], f = {
          js: l.indexOf("js") >= 0,
          wasm: l.indexOf("wasm") >= 0
        };
        a.call(this, f), this.features = {
          js: f.js,
          wasm: f.wasm && this.has_wasm()
        }, this.use(o), this.use(s);
      }
      h.prototype = Object.create(a.prototype), h.prototype.constructor = h, h.prototype.resizeAndUnsharp = function(l, f) {
        var c = this.resize(l, f);
        return l.unsharpAmount && this.unsharp_mask(c, l.toWidth, l.toHeight, l.unsharpAmount, l.unsharpRadius, l.unsharpThreshold), c;
      }, r.exports = h;
    }, { "./mm_resize": 4, "./mm_unsharp_mask": 9, multimath: 19 }], 2: [function(n, r, i) {
      function a(f) {
        return f < 0 ? 0 : f > 255 ? 255 : f;
      }
      function o(f) {
        return f >= 0 ? f : 0;
      }
      function s(f, c, d, v, g, m) {
        var _, b, w, p, y, A, C, k, M, N, I, O = 0, z = 0;
        for (M = 0; M < v; M++) {
          for (y = 0, N = 0; N < g; N++) {
            for (A = m[y++], C = m[y++], k = O + A * 4 | 0, _ = b = w = p = 0; C > 0; C--)
              I = m[y++], p = p + I * f[k + 3] | 0, w = w + I * f[k + 2] | 0, b = b + I * f[k + 1] | 0, _ = _ + I * f[k] | 0, k = k + 4 | 0;
            c[z + 3] = o(p >> 7), c[z + 2] = o(w >> 7), c[z + 1] = o(b >> 7), c[z] = o(_ >> 7), z = z + v * 4 | 0;
          }
          z = (M + 1) * 4 | 0, O = (M + 1) * d * 4 | 0;
        }
      }
      function h(f, c, d, v, g, m) {
        var _, b, w, p, y, A, C, k, M, N, I, O = 0, z = 0;
        for (M = 0; M < v; M++) {
          for (y = 0, N = 0; N < g; N++) {
            for (A = m[y++], C = m[y++], k = O + A * 4 | 0, _ = b = w = p = 0; C > 0; C--)
              I = m[y++], p = p + I * f[k + 3] | 0, w = w + I * f[k + 2] | 0, b = b + I * f[k + 1] | 0, _ = _ + I * f[k] | 0, k = k + 4 | 0;
            _ >>= 7, b >>= 7, w >>= 7, p >>= 7, c[z + 3] = a(p + 8192 >> 14), c[z + 2] = a(w + 8192 >> 14), c[z + 1] = a(b + 8192 >> 14), c[z] = a(_ + 8192 >> 14), z = z + v * 4 | 0;
          }
          z = (M + 1) * 4 | 0, O = (M + 1) * d * 4 | 0;
        }
      }
      function u(f, c, d, v, g, m) {
        var _, b, w, p, y, A, C, k, M, N, I, O, z = 0, x = 0;
        for (N = 0; N < v; N++) {
          for (A = 0, I = 0; I < g; I++) {
            for (C = m[A++], k = m[A++], M = z + C * 4 | 0, _ = b = w = p = 0; k > 0; k--)
              O = m[A++], y = f[M + 3], p = p + O * y | 0, w = w + O * f[M + 2] * y | 0, b = b + O * f[M + 1] * y | 0, _ = _ + O * f[M] * y | 0, M = M + 4 | 0;
            w = w / 255 | 0, b = b / 255 | 0, _ = _ / 255 | 0, c[x + 3] = o(p >> 7), c[x + 2] = o(w >> 7), c[x + 1] = o(b >> 7), c[x] = o(_ >> 7), x = x + v * 4 | 0;
          }
          x = (N + 1) * 4 | 0, z = (N + 1) * d * 4 | 0;
        }
      }
      function l(f, c, d, v, g, m) {
        var _, b, w, p, y, A, C, k, M, N, I, O = 0, z = 0;
        for (M = 0; M < v; M++) {
          for (y = 0, N = 0; N < g; N++) {
            for (A = m[y++], C = m[y++], k = O + A * 4 | 0, _ = b = w = p = 0; C > 0; C--)
              I = m[y++], p = p + I * f[k + 3] | 0, w = w + I * f[k + 2] | 0, b = b + I * f[k + 1] | 0, _ = _ + I * f[k] | 0, k = k + 4 | 0;
            _ >>= 7, b >>= 7, w >>= 7, p >>= 7, p = a(p + 8192 >> 14), p > 0 && (_ = _ * 255 / p | 0, b = b * 255 / p | 0, w = w * 255 / p | 0), c[z + 3] = p, c[z + 2] = a(w + 8192 >> 14), c[z + 1] = a(b + 8192 >> 14), c[z] = a(_ + 8192 >> 14), z = z + v * 4 | 0;
          }
          z = (M + 1) * 4 | 0, O = (M + 1) * d * 4 | 0;
        }
      }
      r.exports = {
        convolveHor: s,
        convolveVert: h,
        convolveHorWithPre: u,
        convolveVertWithPre: l
      };
    }, {}], 3: [function(n, r, i) {
      r.exports = "AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEYA2AGf39/f39/AGAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADBwYBAAAAAAIGBgF/AEEACweUAQgRX193YXNtX2NhbGxfY3RvcnMAAAtjb252b2x2ZUhvcgABDGNvbnZvbHZlVmVydAACEmNvbnZvbHZlSG9yV2l0aFByZQADE2NvbnZvbHZlVmVydFdpdGhQcmUABApjb252b2x2ZUhWAAUMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAKyA4GAwABC4wDARB/AkAgA0UNACAERQ0AIANBAnQhFQNAQQAhE0EAIQsDQCALQQJqIQcCfyALQQF0IAVqIgYuAQIiC0UEQEEAIQhBACEGQQAhCUEAIQogBwwBCyASIAYuAQBqIQhBACEJQQAhCiALIRRBACEOIAchBkEAIQ8DQCAFIAZBAXRqLgEAIhAgACAIQQJ0aigCACIRQRh2bCAPaiEPIBFB/wFxIBBsIAlqIQkgEUEQdkH/AXEgEGwgDmohDiARQQh2Qf8BcSAQbCAKaiEKIAhBAWohCCAGQQFqIQYgFEEBayIUDQALIAlBB3UhCCAKQQd1IQYgDkEHdSEJIA9BB3UhCiAHIAtqCyELIAEgDEEBdCIHaiAIQQAgCEEAShs7AQAgASAHQQJyaiAGQQAgBkEAShs7AQAgASAHQQRyaiAJQQAgCUEAShs7AQAgASAHQQZyaiAKQQAgCkEAShs7AQAgDCAVaiEMIBNBAWoiEyAERw0ACyANQQFqIg0gAmwhEiANQQJ0IQwgAyANRw0ACwsL2gMBD38CQCADRQ0AIARFDQAgAkECdCEUA0AgCyEMQQAhE0EAIQIDQCACQQJqIQYCfyACQQF0IAVqIgcuAQIiAkUEQEEAIQhBACEHQQAhCkEAIQkgBgwBCyAHLgEAQQJ0IBJqIQhBACEJIAIhCkEAIQ0gBiEHQQAhDkEAIQ8DQCAFIAdBAXRqLgEAIhAgACAIQQF0IhFqLwEAbCAJaiEJIAAgEUEGcmovAQAgEGwgDmohDiAAIBFBBHJqLwEAIBBsIA9qIQ8gACARQQJyai8BACAQbCANaiENIAhBBGohCCAHQQFqIQcgCkEBayIKDQALIAlBB3UhCCANQQd1IQcgDkEHdSEKIA9BB3UhCSACIAZqCyECIAEgDEECdGogB0GAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQQh0QYD+A3EgCUGAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQRB0QYCA/AdxIApBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG3I2AgAgAyAMaiEMIBNBAWoiEyAERw0ACyAUIAtBAWoiC2whEiADIAtHDQALCwuSAwEQfwJAIANFDQAgBEUNACADQQJ0IRUDQEEAIRNBACEGA0AgBkECaiEIAn8gBkEBdCAFaiIGLgECIgdFBEBBACEJQQAhDEEAIQ1BACEOIAgMAQsgEiAGLgEAaiEJQQAhDkEAIQ1BACEMIAchFEEAIQ8gCCEGA0AgBSAGQQF0ai4BACAAIAlBAnRqKAIAIhBBGHZsIhEgD2ohDyARIBBBEHZB/wFxbCAMaiEMIBEgEEEIdkH/AXFsIA1qIQ0gESAQQf8BcWwgDmohDiAJQQFqIQkgBkEBaiEGIBRBAWsiFA0ACyAPQQd1IQkgByAIagshBiABIApBAXQiCGogDkH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEECcmogDUH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEEcmogDEH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEGcmogCUEAIAlBAEobOwEAIAogFWohCiATQQFqIhMgBEcNAAsgC0EBaiILIAJsIRIgC0ECdCEKIAMgC0cNAAsLC4IEAQ9/AkAgA0UNACAERQ0AIAJBAnQhFANAIAshDEEAIRJBACEHA0AgB0ECaiEKAn8gB0EBdCAFaiICLgECIhNFBEBBACEIQQAhCUEAIQYgCiEHQQAMAQsgAi4BAEECdCARaiEJQQAhByATIQJBACENIAohBkEAIQ5BACEPA0AgBSAGQQF0ai4BACIIIAAgCUEBdCIQai8BAGwgB2ohByAAIBBBBnJqLwEAIAhsIA5qIQ4gACAQQQRyai8BACAIbCAPaiEPIAAgEEECcmovAQAgCGwgDWohDSAJQQRqIQkgBkEBaiEGIAJBAWsiAg0ACyAHQQd1IQggDUEHdSEJIA9BB3UhBiAKIBNqIQcgDkEHdQtBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKGyIKQf8BcQRAIAlB/wFsIAJtIQkgCEH/AWwgAm0hCCAGQf8BbCACbSEGCyABIAxBAnRqIAlBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EIdEGA/gNxIAZBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EQdEGAgPwHcSAKQRh0ciAIQYBAa0EOdSICQf8BIAJB/wFIGyICQQAgAkEAShtycjYCACADIAxqIQwgEkEBaiISIARHDQALIBQgC0EBaiILbCERIAMgC0cNAAsLC0AAIAcEQEEAIAIgAyAEIAUgABADIAJBACAEIAUgBiABEAQPC0EAIAIgAyAEIAUgABABIAJBACAEIAUgBiABEAIL";
    }, {}], 4: [function(n, r, i) {
      r.exports = {
        name: "resize",
        fn: n("./resize"),
        wasm_fn: n("./resize_wasm"),
        wasm_src: n("./convolve_wasm_base64")
      };
    }, { "./convolve_wasm_base64": 3, "./resize": 5, "./resize_wasm": 8 }], 5: [function(n, r, i) {
      var a = n("./resize_filter_gen"), o = n("./convolve"), s = o.convolveHor, h = o.convolveVert, u = o.convolveHorWithPre, l = o.convolveVertWithPre;
      function f(d, v, g) {
        for (var m = 3, _ = v * g * 4 | 0; m < _; ) {
          if (d[m] !== 255)
            return !0;
          m = m + 4 | 0;
        }
        return !1;
      }
      function c(d, v, g) {
        for (var m = 3, _ = v * g * 4 | 0; m < _; )
          d[m] = 255, m = m + 4 | 0;
      }
      r.exports = function(v) {
        var g = v.src, m = v.width, _ = v.height, b = v.toWidth, w = v.toHeight, p = v.scaleX || v.toWidth / v.width, y = v.scaleY || v.toHeight / v.height, A = v.offsetX || 0, C = v.offsetY || 0, k = v.dest || new Uint8Array(b * w * 4), M = typeof v.filter > "u" ? "mks2013" : v.filter, N = a(M, m, b, p, A), I = a(M, _, w, y, C), O = new Uint16Array(b * _ * 4);
        return f(g, m, _) ? (u(g, O, m, _, b, N), l(O, k, _, b, w, I)) : (s(g, O, m, _, b, N), h(O, k, _, b, w, I), c(k, b, w)), k;
      };
    }, { "./convolve": 2, "./resize_filter_gen": 6 }], 6: [function(n, r, i) {
      var a = n("./resize_filter_info"), o = 14;
      function s(h) {
        return Math.round(h * ((1 << o) - 1));
      }
      r.exports = function(u, l, f, c, d) {
        var v = a.filter[u].fn, g = 1 / c, m = Math.min(1, c), _ = a.filter[u].win / m, b, w, p, y, A, C, k, M, N, I, O, z, x, F, E, R, B, T = Math.floor((_ + 1) * 2), S = new Int16Array((T + 2) * f), P = 0, D = !S.subarray || !S.set;
        for (b = 0; b < f; b++) {
          for (w = (b + 0.5) * g + d, p = Math.max(0, Math.floor(w - _)), y = Math.min(l - 1, Math.ceil(w + _)), A = y - p + 1, C = new Float32Array(A), k = new Int16Array(A), M = 0, N = p, I = 0; N <= y; N++, I++)
            O = v((N + 0.5 - w) * m), M += O, C[I] = O;
          for (z = 0, I = 0; I < C.length; I++)
            x = C[I] / M, z += x, k[I] = s(x);
          for (k[f >> 1] += s(1 - z), F = 0; F < k.length && k[F] === 0; )
            F++;
          if (F < k.length) {
            for (E = k.length - 1; E > 0 && k[E] === 0; )
              E--;
            if (R = p + F, B = E - F + 1, S[P++] = R, S[P++] = B, !D)
              S.set(k.subarray(F, E + 1), P), P += B;
            else
              for (I = F; I <= E; I++)
                S[P++] = k[I];
          } else
            S[P++] = 0, S[P++] = 0;
        }
        return S;
      };
    }, { "./resize_filter_info": 7 }], 7: [function(n, r, i) {
      var a = {
        // Nearest neibor
        box: {
          win: 0.5,
          fn: function(s) {
            return s < 0 && (s = -s), s < 0.5 ? 1 : 0;
          }
        },
        // // Hamming
        hamming: {
          win: 1,
          fn: function(s) {
            if (s < 0 && (s = -s), s >= 1)
              return 0;
            if (s < 11920929e-14)
              return 1;
            var h = s * Math.PI;
            return Math.sin(h) / h * (0.54 + 0.46 * Math.cos(h / 1));
          }
        },
        // Lanczos, win = 2
        lanczos2: {
          win: 2,
          fn: function(s) {
            if (s < 0 && (s = -s), s >= 2)
              return 0;
            if (s < 11920929e-14)
              return 1;
            var h = s * Math.PI;
            return Math.sin(h) / h * Math.sin(h / 2) / (h / 2);
          }
        },
        // Lanczos, win = 3
        lanczos3: {
          win: 3,
          fn: function(s) {
            if (s < 0 && (s = -s), s >= 3)
              return 0;
            if (s < 11920929e-14)
              return 1;
            var h = s * Math.PI;
            return Math.sin(h) / h * Math.sin(h / 3) / (h / 3);
          }
        },
        // Magic Kernel Sharp 2013, win = 2.5
        // http://johncostella.com/magic/
        mks2013: {
          win: 2.5,
          fn: function(s) {
            return s < 0 && (s = -s), s >= 2.5 ? 0 : s >= 1.5 ? -0.125 * (s - 2.5) * (s - 2.5) : s >= 0.5 ? 0.25 * (4 * s * s - 11 * s + 7) : 1.0625 - 1.75 * s * s;
          }
        }
      };
      r.exports = {
        filter: a,
        // Legacy mapping
        f2q: {
          box: 0,
          hamming: 1,
          lanczos2: 2,
          lanczos3: 3
        },
        q2f: ["box", "hamming", "lanczos2", "lanczos3"]
      };
    }, {}], 8: [function(n, r, i) {
      var a = n("./resize_filter_gen");
      function o(f, c, d) {
        for (var v = 3, g = c * d * 4 | 0; v < g; ) {
          if (f[v] !== 255)
            return !0;
          v = v + 4 | 0;
        }
        return !1;
      }
      function s(f, c, d) {
        for (var v = 3, g = c * d * 4 | 0; v < g; )
          f[v] = 255, v = v + 4 | 0;
      }
      function h(f) {
        return new Uint8Array(f.buffer, 0, f.byteLength);
      }
      var u = !0;
      try {
        u = new Uint32Array(new Uint8Array([1, 0, 0, 0]).buffer)[0] === 1;
      } catch {
      }
      function l(f, c, d) {
        if (u) {
          c.set(h(f), d);
          return;
        }
        for (var v = d, g = 0; g < f.length; g++) {
          var m = f[g];
          c[v++] = m & 255, c[v++] = m >> 8 & 255;
        }
      }
      r.exports = function(c) {
        var d = c.src, v = c.width, g = c.height, m = c.toWidth, _ = c.toHeight, b = c.scaleX || c.toWidth / c.width, w = c.scaleY || c.toHeight / c.height, p = c.offsetX || 0, y = c.offsetY || 0, A = c.dest || new Uint8Array(m * _ * 4), C = typeof c.filter > "u" ? "mks2013" : c.filter, k = a(C, v, m, b, p), M = a(C, g, _, w, y), N = 0, I = Math.max(d.byteLength, A.byteLength), O = this.__align(N + I), z = g * m * 4 * 2, x = this.__align(O + z), F = this.__align(x + k.byteLength), E = F + M.byteLength, R = this.__instance("resize", E), B = new Uint8Array(this.__memory.buffer), T = new Uint32Array(this.__memory.buffer), S = new Uint32Array(d.buffer);
        T.set(S), l(k, B, x), l(M, B, F);
        var P = R.exports.convolveHV || R.exports._convolveHV;
        o(d, v, g) ? P(x, F, O, v, g, m, _, 1) : (P(x, F, O, v, g, m, _, 0), s(A, m, _));
        var D = new Uint32Array(A.buffer);
        return D.set(new Uint32Array(this.__memory.buffer, 0, _ * m)), A;
      };
    }, { "./resize_filter_gen": 6 }], 9: [function(n, r, i) {
      r.exports = {
        name: "unsharp_mask",
        fn: n("./unsharp_mask"),
        wasm_fn: n("./unsharp_mask_wasm"),
        wasm_src: n("./unsharp_mask_wasm_base64")
      };
    }, { "./unsharp_mask": 10, "./unsharp_mask_wasm": 11, "./unsharp_mask_wasm_base64": 12 }], 10: [function(n, r, i) {
      var a = n("glur/mono16");
      function o(s, h, u) {
        for (var l = h * u, f = new Uint16Array(l), c, d, v, g, m = 0; m < l; m++)
          c = s[4 * m], d = s[4 * m + 1], v = s[4 * m + 2], g = c >= d && c >= v ? c : d >= v && d >= c ? d : v, f[m] = g << 8;
        return f;
      }
      r.exports = function(h, u, l, f, c, d) {
        var v, g, m, _, b;
        if (!(f === 0 || c < 0.5)) {
          c > 2 && (c = 2);
          var w = o(h, u, l), p = new Uint16Array(w);
          a(p, u, l, c);
          for (var y = f / 100 * 4096 + 0.5 | 0, A = d << 8, C = u * l, k = 0; k < C; k++)
            v = w[k], _ = v - p[k], Math.abs(_) >= A && (g = v + (y * _ + 2048 >> 12), g = g > 65280 ? 65280 : g, g = g < 0 ? 0 : g, v = v !== 0 ? v : 1, m = (g << 12) / v | 0, b = k * 4, h[b] = h[b] * m + 2048 >> 12, h[b + 1] = h[b + 1] * m + 2048 >> 12, h[b + 2] = h[b + 2] * m + 2048 >> 12);
        }
      };
    }, { "glur/mono16": 18 }], 11: [function(n, r, i) {
      r.exports = function(o, s, h, u, l, f) {
        if (!(u === 0 || l < 0.5)) {
          l > 2 && (l = 2);
          var c = s * h, d = c * 4, v = c * 2, g = c * 2, m = Math.max(s, h) * 4, _ = 8 * 4, b = 0, w = d, p = w + v, y = p + g, A = y + g, C = A + m, k = this.__instance("unsharp_mask", d + v + g * 2 + m + _, {
            exp: Math.exp
          }), M = new Uint32Array(o.buffer), N = new Uint32Array(this.__memory.buffer);
          N.set(M);
          var I = k.exports.hsv_v16 || k.exports._hsv_v16;
          I(b, w, s, h), I = k.exports.blurMono16 || k.exports._blurMono16, I(w, p, y, A, C, s, h, l), I = k.exports.unsharp || k.exports._unsharp, I(b, b, w, p, s, h, u, f), M.set(new Uint32Array(this.__memory.buffer, 0, c));
        }
      };
    }, {}], 12: [function(n, r, i) {
      r.exports = "AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL";
    }, {}], 13: [function(n, r, i) {
      var a = 100;
      function o(s, h) {
        this.create = s, this.available = [], this.acquired = {}, this.lastId = 1, this.timeoutId = 0, this.idle = h || 2e3;
      }
      o.prototype.acquire = function() {
        var s = this, h;
        return this.available.length !== 0 ? h = this.available.pop() : (h = this.create(), h.id = this.lastId++, h.release = function() {
          return s.release(h);
        }), this.acquired[h.id] = h, h;
      }, o.prototype.release = function(s) {
        var h = this;
        delete this.acquired[s.id], s.lastUsed = Date.now(), this.available.push(s), this.timeoutId === 0 && (this.timeoutId = setTimeout(function() {
          return h.gc();
        }, a));
      }, o.prototype.gc = function() {
        var s = this, h = Date.now();
        this.available = this.available.filter(function(u) {
          return h - u.lastUsed > s.idle ? (u.destroy(), !1) : !0;
        }), this.available.length !== 0 ? this.timeoutId = setTimeout(function() {
          return s.gc();
        }, a) : this.timeoutId = 0;
      }, r.exports = o;
    }, {}], 14: [function(n, r, i) {
      var a = 2;
      r.exports = function(s, h, u, l, f, c) {
        var d = u / s, v = l / h, g = (2 * c + a + 1) / f;
        if (g > 0.5)
          return [[u, l]];
        var m = Math.ceil(Math.log(Math.min(d, v)) / Math.log(g));
        if (m <= 1)
          return [[u, l]];
        for (var _ = [], b = 0; b < m; b++) {
          var w = Math.round(Math.pow(Math.pow(s, m - b - 1) * Math.pow(u, b + 1), 1 / m)), p = Math.round(Math.pow(Math.pow(h, m - b - 1) * Math.pow(l, b + 1), 1 / m));
          _.push([w, p]);
        }
        return _;
      };
    }, {}], 15: [function(n, r, i) {
      var a = 1e-5;
      function o(h) {
        var u = Math.round(h);
        return Math.abs(h - u) < a ? u : Math.floor(h);
      }
      function s(h) {
        var u = Math.round(h);
        return Math.abs(h - u) < a ? u : Math.ceil(h);
      }
      r.exports = function(u) {
        var l = u.toWidth / u.width, f = u.toHeight / u.height, c = o(u.srcTileSize * l) - 2 * u.destTileBorder, d = o(u.srcTileSize * f) - 2 * u.destTileBorder;
        if (c < 1 || d < 1)
          throw new Error("Internal error in pica: target tile width/height is too small.");
        var v, g, m, _, b, w, p = [], y;
        for (_ = 0; _ < u.toHeight; _ += d)
          for (m = 0; m < u.toWidth; m += c)
            v = m - u.destTileBorder, v < 0 && (v = 0), b = m + c + u.destTileBorder - v, v + b >= u.toWidth && (b = u.toWidth - v), g = _ - u.destTileBorder, g < 0 && (g = 0), w = _ + d + u.destTileBorder - g, g + w >= u.toHeight && (w = u.toHeight - g), y = {
              toX: v,
              toY: g,
              toWidth: b,
              toHeight: w,
              toInnerX: m,
              toInnerY: _,
              toInnerWidth: c,
              toInnerHeight: d,
              offsetX: v / l - o(v / l),
              offsetY: g / f - o(g / f),
              scaleX: l,
              scaleY: f,
              x: o(v / l),
              y: o(g / f),
              width: s(b / l),
              height: s(w / f)
            }, p.push(y);
        return p;
      };
    }, {}], 16: [function(n, r, i) {
      function a(o) {
        return Object.prototype.toString.call(o);
      }
      r.exports.isCanvas = function(s) {
        var h = a(s);
        return h === "[object HTMLCanvasElement]" || h === "[object OffscreenCanvas]" || h === "[object Canvas]";
      }, r.exports.isImage = function(s) {
        return a(s) === "[object HTMLImageElement]";
      }, r.exports.isImageBitmap = function(s) {
        return a(s) === "[object ImageBitmap]";
      }, r.exports.limiter = function(s) {
        var h = 0, u = [];
        function l() {
          h < s && u.length && (h++, u.shift()());
        }
        return function(c) {
          return new Promise(function(d, v) {
            u.push(function() {
              c().then(function(g) {
                d(g), h--, l();
              }, function(g) {
                v(g), h--, l();
              });
            }), l();
          });
        };
      }, r.exports.cib_quality_name = function(s) {
        switch (s) {
          case 0:
            return "pixelated";
          case 1:
            return "low";
          case 2:
            return "medium";
        }
        return "high";
      }, r.exports.cib_support = function(s) {
        return Promise.resolve().then(function() {
          if (typeof createImageBitmap > "u")
            return !1;
          var h = s(100, 100);
          return createImageBitmap(h, 0, 0, 100, 100, {
            resizeWidth: 10,
            resizeHeight: 10,
            resizeQuality: "high"
          }).then(function(u) {
            var l = u.width === 10;
            return u.close(), h = null, l;
          });
        }).catch(function() {
          return !1;
        });
      }, r.exports.worker_offscreen_canvas_support = function() {
        return new Promise(function(s, h) {
          if (typeof OffscreenCanvas > "u") {
            s(!1);
            return;
          }
          function u(c) {
            if (typeof createImageBitmap > "u") {
              c.postMessage(!1);
              return;
            }
            Promise.resolve().then(function() {
              var d = new OffscreenCanvas(10, 10), v = d.getContext("2d");
              return v.rect(0, 0, 1, 1), createImageBitmap(d, 0, 0, 1, 1);
            }).then(function() {
              return c.postMessage(!0);
            }, function() {
              return c.postMessage(!1);
            });
          }
          var l = btoa("(".concat(u.toString(), ")(self);")), f = new Worker("data:text/javascript;base64,".concat(l));
          f.onmessage = function(c) {
            return s(c.data);
          }, f.onerror = h;
        }).then(function(s) {
          return s;
        }, function() {
          return !1;
        });
      }, r.exports.can_use_canvas = function(s) {
        var h = !1;
        try {
          var u = s(2, 1), l = u.getContext("2d"), f = l.createImageData(2, 1);
          f.data[0] = 12, f.data[1] = 23, f.data[2] = 34, f.data[3] = 255, f.data[4] = 45, f.data[5] = 56, f.data[6] = 67, f.data[7] = 255, l.putImageData(f, 0, 0), f = null, f = l.getImageData(0, 0, 2, 1), f.data[0] === 12 && f.data[1] === 23 && f.data[2] === 34 && f.data[3] === 255 && f.data[4] === 45 && f.data[5] === 56 && f.data[6] === 67 && f.data[7] === 255 && (h = !0);
        } catch {
        }
        return h;
      }, r.exports.cib_can_use_region = function() {
        return new Promise(function(s) {
          if (typeof Image > "u" || typeof createImageBitmap > "u") {
            s(!1);
            return;
          }
          var h = new Image();
          h.src = "data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z", h.onload = function() {
            createImageBitmap(h, 0, 0, h.width, h.height).then(function(u) {
              u.width === h.width && u.height === h.height ? s(!0) : s(!1);
            }, function() {
              return s(!1);
            });
          }, h.onerror = function() {
            return s(!1);
          };
        });
      };
    }, {}], 17: [function(n, r, i) {
      r.exports = function() {
        var a = n("./mathlib"), o;
        onmessage = function(h) {
          var u = h.data.opts;
          if (!u.src && u.srcBitmap) {
            var l = new OffscreenCanvas(u.width, u.height), f = l.getContext("2d");
            f.drawImage(u.srcBitmap, 0, 0), u.src = f.getImageData(0, 0, u.width, u.height).data, l.width = l.height = 0, l = null, u.srcBitmap.close(), u.srcBitmap = null;
          }
          o || (o = new a(h.data.features));
          var c = o.resizeAndUnsharp(u);
          postMessage({
            data: c
          }, [c.buffer]);
        };
      };
    }, { "./mathlib": 1 }], 18: [function(n, r, i) {
      var a, o, s, h, u, l, f, c;
      function d(m) {
        m < 0.5 && (m = 0.5);
        var _ = Math.exp(0.726 * 0.726) / m, b = Math.exp(-_), w = Math.exp(-2 * _), p = (1 - b) * (1 - b) / (1 + 2 * _ * b - w);
        return a = p, o = p * (_ - 1) * b, s = p * (_ + 1) * b, h = -p * w, u = 2 * b, l = -w, f = (a + o) / (1 - u - l), c = (s + h) / (1 - u - l), new Float32Array([a, o, s, h, u, l, f, c]);
      }
      function v(m, _, b, w, p, y) {
        var A, C, k, M, N, I, O, z, x, F, E, R, B, T;
        for (x = 0; x < y; x++) {
          for (I = x * p, O = x, z = 0, A = m[I], N = A * w[6], M = N, E = w[0], R = w[1], B = w[4], T = w[5], F = 0; F < p; F++)
            C = m[I], k = C * E + A * R + M * B + N * T, N = M, M = k, A = C, b[z] = M, z++, I++;
          for (I--, z--, O += y * (p - 1), A = m[I], N = A * w[7], M = N, C = A, E = w[2], R = w[3], F = p - 1; F >= 0; F--)
            k = C * E + A * R + M * B + N * T, N = M, M = k, A = C, C = m[I], _[O] = b[z] + M, I--, z--, O -= y;
        }
      }
      function g(m, _, b, w) {
        if (w) {
          var p = new Uint16Array(m.length), y = new Float32Array(Math.max(_, b)), A = d(w);
          v(m, p, y, A, _, b), v(p, m, y, A, b, _);
        }
      }
      r.exports = g;
    }, {}], 19: [function(n, r, i) {
      var a = n("object-assign"), o = n("./lib/base64decode"), s = n("./lib/wa_detect"), h = {
        js: !0,
        wasm: !0
      };
      function u(l) {
        if (!(this instanceof u))
          return new u(l);
        var f = a({}, h, l || {});
        if (this.options = f, this.__cache = {}, this.__init_promise = null, this.__modules = f.modules || {}, this.__memory = null, this.__wasm = {}, this.__isLE = new Uint32Array(new Uint8Array([1, 0, 0, 0]).buffer)[0] === 1, !this.options.js && !this.options.wasm)
          throw new Error('mathlib: at least "js" or "wasm" should be enabled');
      }
      u.prototype.has_wasm = s, u.prototype.use = function(l) {
        return this.__modules[l.name] = l, this.options.wasm && this.has_wasm() && l.wasm_fn ? this[l.name] = l.wasm_fn : this[l.name] = l.fn, this;
      }, u.prototype.init = function() {
        if (this.__init_promise)
          return this.__init_promise;
        if (!this.options.js && this.options.wasm && !this.has_wasm())
          return Promise.reject(new Error(`mathlib: only "wasm" was enabled, but it's not supported`));
        var l = this;
        return this.__init_promise = Promise.all(Object.keys(l.__modules).map(function(f) {
          var c = l.__modules[f];
          return !l.options.wasm || !l.has_wasm() || !c.wasm_fn || l.__wasm[f] ? null : WebAssembly.compile(l.__base64decode(c.wasm_src)).then(function(d) {
            l.__wasm[f] = d;
          });
        })).then(function() {
          return l;
        }), this.__init_promise;
      }, u.prototype.__base64decode = o, u.prototype.__reallocate = function(f) {
        if (!this.__memory)
          return this.__memory = new WebAssembly.Memory({
            initial: Math.ceil(f / (64 * 1024))
          }), this.__memory;
        var c = this.__memory.buffer.byteLength;
        return c < f && this.__memory.grow(Math.ceil((f - c) / (64 * 1024))), this.__memory;
      }, u.prototype.__instance = function(f, c, d) {
        if (c && this.__reallocate(c), !this.__wasm[f]) {
          var v = this.__modules[f];
          this.__wasm[f] = new WebAssembly.Module(this.__base64decode(v.wasm_src));
        }
        if (!this.__cache[f]) {
          var g = {
            memoryBase: 0,
            memory: this.__memory,
            tableBase: 0,
            table: new WebAssembly.Table({ initial: 0, element: "anyfunc" })
          };
          this.__cache[f] = new WebAssembly.Instance(this.__wasm[f], {
            env: a(g, d || {})
          });
        }
        return this.__cache[f];
      }, u.prototype.__align = function(f, c) {
        c = c || 8;
        var d = f % c;
        return f + (d ? c - d : 0);
      }, r.exports = u;
    }, { "./lib/base64decode": 20, "./lib/wa_detect": 21, "object-assign": 22 }], 20: [function(n, r, i) {
      var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      r.exports = function(s) {
        for (var h = s.replace(/[\r\n=]/g, ""), u = h.length, l = new Uint8Array(u * 3 >> 2), f = 0, c = 0, d = 0; d < u; d++)
          d % 4 === 0 && d && (l[c++] = f >> 16 & 255, l[c++] = f >> 8 & 255, l[c++] = f & 255), f = f << 6 | a.indexOf(h.charAt(d));
        var v = u % 4 * 6;
        return v === 0 ? (l[c++] = f >> 16 & 255, l[c++] = f >> 8 & 255, l[c++] = f & 255) : v === 18 ? (l[c++] = f >> 10 & 255, l[c++] = f >> 2 & 255) : v === 12 && (l[c++] = f >> 4 & 255), l;
      };
    }, {}], 21: [function(n, r, i) {
      var a;
      r.exports = function() {
        if (typeof a < "u" || (a = !1, typeof WebAssembly > "u"))
          return a;
        try {
          var s = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 127, 1, 127, 3, 2, 1, 0, 5, 3, 1, 0, 1, 7, 8, 1, 4, 116, 101, 115, 116, 0, 0, 10, 16, 1, 14, 0, 32, 0, 65, 1, 54, 2, 0, 32, 0, 40, 2, 0, 11]), h = new WebAssembly.Module(s), u = new WebAssembly.Instance(h, {});
          return u.exports.test(4) !== 0 && (a = !0), a;
        } catch {
        }
        return a;
      };
    }, {}], 22: [function(n, r, i) {
      var a = Object.getOwnPropertySymbols, o = Object.prototype.hasOwnProperty, s = Object.prototype.propertyIsEnumerable;
      function h(l) {
        if (l == null)
          throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(l);
      }
      function u() {
        try {
          if (!Object.assign)
            return !1;
          var l = new String("abc");
          if (l[5] = "de", Object.getOwnPropertyNames(l)[0] === "5")
            return !1;
          for (var f = {}, c = 0; c < 10; c++)
            f["_" + String.fromCharCode(c)] = c;
          var d = Object.getOwnPropertyNames(f).map(function(g) {
            return f[g];
          });
          if (d.join("") !== "0123456789")
            return !1;
          var v = {};
          return "abcdefghijklmnopqrst".split("").forEach(function(g) {
            v[g] = g;
          }), Object.keys(Object.assign({}, v)).join("") === "abcdefghijklmnopqrst";
        } catch {
          return !1;
        }
      }
      r.exports = u() ? Object.assign : function(l, f) {
        for (var c, d = h(l), v, g = 1; g < arguments.length; g++) {
          c = Object(arguments[g]);
          for (var m in c)
            o.call(c, m) && (d[m] = c[m]);
          if (a) {
            v = a(c);
            for (var _ = 0; _ < v.length; _++)
              s.call(c, v[_]) && (d[v[_]] = c[v[_]]);
          }
        }
        return d;
      };
    }, {}], 23: [function(n, r, i) {
      var a = arguments[3], o = arguments[4], s = arguments[5], h = JSON.stringify;
      r.exports = function(u, l) {
        for (var f, c = Object.keys(s), d = 0, v = c.length; d < v; d++) {
          var g = c[d], m = s[g].exports;
          if (m === u || m && m.default === u) {
            f = g;
            break;
          }
        }
        if (!f) {
          f = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
          for (var _ = {}, d = 0, v = c.length; d < v; d++) {
            var g = c[d];
            _[g] = g;
          }
          o[f] = [
            "function(require,module,exports){" + u + "(self); }",
            _
          ];
        }
        var b = Math.floor(Math.pow(16, 8) * Math.random()).toString(16), w = {};
        w[f] = f, o[b] = [
          "function(require,module,exports){var f = require(" + h(f) + ");(f.default ? f.default : f)(self);}",
          w
        ];
        var p = {};
        y(b);
        function y(I) {
          p[I] = !0;
          for (var O in o[I][1]) {
            var z = o[I][1][O];
            p[z] || y(z);
          }
        }
        var A = "(" + a + ")({" + Object.keys(p).map(function(I) {
          return h(I) + ":[" + o[I][0] + "," + h(o[I][1]) + "]";
        }).join(",") + "},{},[" + h(b) + "])", C = window.URL || window.webkitURL || window.mozURL || window.msURL, k = new Blob([A], { type: "text/javascript" });
        if (l && l.bare)
          return k;
        var M = C.createObjectURL(k), N = new Worker(M);
        return N.objectURL = M, N;
      };
    }, {}], "/index.js": [function(n, r, i) {
      function a(E, R) {
        return l(E) || u(E, R) || s(E, R) || o();
      }
      function o() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function s(E, R) {
        if (E) {
          if (typeof E == "string")
            return h(E, R);
          var B = Object.prototype.toString.call(E).slice(8, -1);
          if (B === "Object" && E.constructor && (B = E.constructor.name), B === "Map" || B === "Set")
            return Array.from(E);
          if (B === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(B))
            return h(E, R);
        }
      }
      function h(E, R) {
        (R == null || R > E.length) && (R = E.length);
        for (var B = 0, T = new Array(R); B < R; B++)
          T[B] = E[B];
        return T;
      }
      function u(E, R) {
        var B = E == null ? null : typeof Symbol < "u" && E[Symbol.iterator] || E["@@iterator"];
        if (B != null) {
          var T = [], S = !0, P = !1, D, L;
          try {
            for (B = B.call(E); !(S = (D = B.next()).done) && (T.push(D.value), !(R && T.length === R)); S = !0)
              ;
          } catch (U) {
            P = !0, L = U;
          } finally {
            try {
              !S && B.return != null && B.return();
            } finally {
              if (P)
                throw L;
            }
          }
          return T;
        }
      }
      function l(E) {
        if (Array.isArray(E))
          return E;
      }
      var f = n("object-assign"), c = n("webworkify"), d = n("./lib/mathlib"), v = n("./lib/pool"), g = n("./lib/utils"), m = n("./lib/worker"), _ = n("./lib/stepper"), b = n("./lib/tiler"), w = n("./lib/mm_resize/resize_filter_info"), p = {}, y = !1;
      try {
        typeof navigator < "u" && navigator.userAgent && (y = navigator.userAgent.indexOf("Safari") >= 0);
      } catch {
      }
      var A = 1;
      typeof navigator < "u" && (A = Math.min(navigator.hardwareConcurrency || 1, 4));
      var C = {
        tile: 1024,
        concurrency: A,
        features: ["js", "wasm", "ww"],
        idle: 2e3,
        createCanvas: function(R, B) {
          var T = document.createElement("canvas");
          return T.width = R, T.height = B, T;
        }
      }, k = {
        filter: "mks2013",
        unsharpAmount: 0,
        unsharpRadius: 0,
        unsharpThreshold: 0
      }, M = !1, N = !1, I = !1, O = !1, z = !1;
      function x() {
        return {
          value: c(m),
          destroy: function() {
            if (this.value.terminate(), typeof window < "u") {
              var R = window.URL || window.webkitURL || window.mozURL || window.msURL;
              R && R.revokeObjectURL && this.value.objectURL && R.revokeObjectURL(this.value.objectURL);
            }
          }
        };
      }
      function F(E) {
        if (!(this instanceof F))
          return new F(E);
        this.options = f({}, C, E || {});
        var R = "lk_".concat(this.options.concurrency);
        this.__limit = p[R] || g.limiter(this.options.concurrency), p[R] || (p[R] = this.__limit), this.features = {
          js: !1,
          // pure JS implementation, can be disabled for testing
          wasm: !1,
          // webassembly implementation for heavy functions
          cib: !1,
          // resize via createImageBitmap (only FF at this moment)
          ww: !1
          // webworkers
        }, this.__workersPool = null, this.__requested_features = [], this.__mathlib = null;
      }
      F.prototype.init = function() {
        var E = this;
        if (this.__initPromise)
          return this.__initPromise;
        if (typeof ImageData < "u" && typeof Uint8ClampedArray < "u")
          try {
            new ImageData(new Uint8ClampedArray(400), 10, 10), M = !0;
          } catch {
          }
        typeof ImageBitmap < "u" && (ImageBitmap.prototype && ImageBitmap.prototype.close ? N = !0 : this.debug("ImageBitmap does not support .close(), disabled"));
        var R = this.options.features.slice();
        if (R.indexOf("all") >= 0 && (R = ["cib", "wasm", "js", "ww"]), this.__requested_features = R, this.__mathlib = new d(R), R.indexOf("ww") >= 0 && typeof window < "u" && "Worker" in window)
          try {
            var B = n("webworkify")(function() {
            });
            B.terminate(), this.features.ww = !0;
            var T = "wp_".concat(JSON.stringify(this.options));
            p[T] ? this.__workersPool = p[T] : (this.__workersPool = new v(x, this.options.idle), p[T] = this.__workersPool);
          } catch {
          }
        var S = this.__mathlib.init().then(function(U) {
          f(E.features, U.features);
        }), P;
        N ? P = g.cib_support(this.options.createCanvas).then(function(U) {
          if (E.features.cib && R.indexOf("cib") < 0) {
            E.debug("createImageBitmap() resize supported, but disabled by config");
            return;
          }
          R.indexOf("cib") >= 0 && (E.features.cib = U);
        }) : P = Promise.resolve(!1), I = g.can_use_canvas(this.options.createCanvas);
        var D;
        N && M && R.indexOf("ww") !== -1 ? D = g.worker_offscreen_canvas_support() : D = Promise.resolve(!1), D = D.then(function(U) {
          O = U;
        });
        var L = g.cib_can_use_region().then(function(U) {
          z = U;
        });
        return this.__initPromise = Promise.all([S, P, D, L]).then(function() {
          return E;
        }), this.__initPromise;
      }, F.prototype.__invokeResize = function(E, R) {
        var B = this;
        return R.__mathCache = R.__mathCache || {}, Promise.resolve().then(function() {
          return B.features.ww ? new Promise(function(T, S) {
            var P = B.__workersPool.acquire();
            R.cancelToken && R.cancelToken.catch(function(L) {
              return S(L);
            }), P.value.onmessage = function(L) {
              P.release(), L.data.err ? S(L.data.err) : T(L.data);
            };
            var D = [];
            E.src && D.push(E.src.buffer), E.srcBitmap && D.push(E.srcBitmap), P.value.postMessage({
              opts: E,
              features: B.__requested_features,
              preload: {
                wasm_nodule: B.__mathlib.__
              }
            }, D);
          }) : {
            data: B.__mathlib.resizeAndUnsharp(E, R.__mathCache)
          };
        });
      }, F.prototype.__extractTileData = function(E, R, B, T, S) {
        if (this.features.ww && O && // createImageBitmap doesn't work for images (Image, ImageBitmap) with Exif orientation in Chrome,
        // can use canvas because canvas doesn't have orientation;
        // see https://bugs.chromium.org/p/chromium/issues/detail?id=1220671
        (g.isCanvas(R) || z))
          return this.debug("Create tile for OffscreenCanvas"), createImageBitmap(T.srcImageBitmap || R, E.x, E.y, E.width, E.height).then(function(L) {
            return S.srcBitmap = L, S;
          });
        if (g.isCanvas(R))
          return T.srcCtx || (T.srcCtx = R.getContext("2d")), this.debug("Get tile pixel data"), S.src = T.srcCtx.getImageData(E.x, E.y, E.width, E.height).data, S;
        this.debug("Draw tile imageBitmap/image to temporary canvas");
        var P = this.options.createCanvas(E.width, E.height), D = P.getContext("2d");
        return D.globalCompositeOperation = "copy", D.drawImage(T.srcImageBitmap || R, E.x, E.y, E.width, E.height, 0, 0, E.width, E.height), this.debug("Get tile pixel data"), S.src = D.getImageData(0, 0, E.width, E.height).data, P.width = P.height = 0, S;
      }, F.prototype.__landTileData = function(E, R, B) {
        var T;
        if (this.debug("Convert raw rgba tile result to ImageData"), R.bitmap)
          return B.toCtx.drawImage(R.bitmap, E.toX, E.toY), null;
        if (M)
          T = new ImageData(new Uint8ClampedArray(R.data), E.toWidth, E.toHeight);
        else if (T = B.toCtx.createImageData(E.toWidth, E.toHeight), T.data.set)
          T.data.set(R.data);
        else
          for (var S = T.data.length - 1; S >= 0; S--)
            T.data[S] = R.data[S];
        return this.debug("Draw tile"), y ? B.toCtx.putImageData(T, E.toX, E.toY, E.toInnerX - E.toX, E.toInnerY - E.toY, E.toInnerWidth + 1e-5, E.toInnerHeight + 1e-5) : B.toCtx.putImageData(T, E.toX, E.toY, E.toInnerX - E.toX, E.toInnerY - E.toY, E.toInnerWidth, E.toInnerHeight), null;
      }, F.prototype.__tileAndResize = function(E, R, B) {
        var T = this, S = {
          srcCtx: null,
          srcImageBitmap: null,
          isImageBitmapReused: !1,
          toCtx: null
        }, P = function(L) {
          return T.__limit(function() {
            if (B.canceled)
              return B.cancelToken;
            var U = {
              width: L.width,
              height: L.height,
              toWidth: L.toWidth,
              toHeight: L.toHeight,
              scaleX: L.scaleX,
              scaleY: L.scaleY,
              offsetX: L.offsetX,
              offsetY: L.offsetY,
              filter: B.filter,
              unsharpAmount: B.unsharpAmount,
              unsharpRadius: B.unsharpRadius,
              unsharpThreshold: B.unsharpThreshold
            };
            return T.debug("Invoke resize math"), Promise.resolve(U).then(function(Q) {
              return T.__extractTileData(L, E, B, S, Q);
            }).then(function(Q) {
              return T.debug("Invoke resize math"), T.__invokeResize(Q, B);
            }).then(function(Q) {
              return B.canceled ? B.cancelToken : (S.srcImageData = null, T.__landTileData(L, Q, S));
            });
          });
        };
        return Promise.resolve().then(function() {
          if (S.toCtx = R.getContext("2d"), g.isCanvas(E))
            return null;
          if (g.isImageBitmap(E))
            return S.srcImageBitmap = E, S.isImageBitmapReused = !0, null;
          if (g.isImage(E))
            return N ? (T.debug("Decode image via createImageBitmap"), createImageBitmap(E).then(function(D) {
              S.srcImageBitmap = D;
            }).catch(function(D) {
              return null;
            })) : null;
          throw new Error('Pica: ".from" should be Image, Canvas or ImageBitmap');
        }).then(function() {
          if (B.canceled)
            return B.cancelToken;
          T.debug("Calculate tiles");
          var D = b({
            width: B.width,
            height: B.height,
            srcTileSize: T.options.tile,
            toWidth: B.toWidth,
            toHeight: B.toHeight,
            destTileBorder: B.__destTileBorder
          }), L = D.map(function(Q) {
            return P(Q);
          });
          function U(Q) {
            Q.srcImageBitmap && (Q.isImageBitmapReused || Q.srcImageBitmap.close(), Q.srcImageBitmap = null);
          }
          return T.debug("Process tiles"), Promise.all(L).then(function() {
            return T.debug("Finished!"), U(S), R;
          }, function(Q) {
            throw U(S), Q;
          });
        });
      }, F.prototype.__processStages = function(E, R, B, T) {
        var S = this;
        if (T.canceled)
          return T.cancelToken;
        var P = E.shift(), D = a(P, 2), L = D[0], U = D[1], Q = E.length === 0, G;
        Q || w.q2f.indexOf(T.filter) < 0 ? G = T.filter : T.filter === "box" ? G = "box" : G = "hamming", T = f({}, T, {
          toWidth: L,
          toHeight: U,
          filter: G
        });
        var V;
        return Q || (V = this.options.createCanvas(L, U)), this.__tileAndResize(R, Q ? B : V, T).then(function() {
          return Q ? B : (T.width = L, T.height = U, S.__processStages(E, V, B, T));
        }).then(function(W) {
          return V && (V.width = V.height = 0), W;
        });
      }, F.prototype.__resizeViaCreateImageBitmap = function(E, R, B) {
        var T = this, S = R.getContext("2d");
        return this.debug("Resize via createImageBitmap()"), createImageBitmap(E, {
          resizeWidth: B.toWidth,
          resizeHeight: B.toHeight,
          resizeQuality: g.cib_quality_name(w.f2q[B.filter])
        }).then(function(P) {
          if (B.canceled)
            return B.cancelToken;
          if (!B.unsharpAmount)
            return S.drawImage(P, 0, 0), P.close(), S = null, T.debug("Finished!"), R;
          T.debug("Unsharp result");
          var D = T.options.createCanvas(B.toWidth, B.toHeight), L = D.getContext("2d");
          L.drawImage(P, 0, 0), P.close();
          var U = L.getImageData(0, 0, B.toWidth, B.toHeight);
          return T.__mathlib.unsharp_mask(U.data, B.toWidth, B.toHeight, B.unsharpAmount, B.unsharpRadius, B.unsharpThreshold), S.putImageData(U, 0, 0), D.width = D.height = 0, U = L = D = S = null, T.debug("Finished!"), R;
        });
      }, F.prototype.resize = function(E, R, B) {
        var T = this;
        this.debug("Start resize...");
        var S = f({}, k);
        if (isNaN(B) ? B && (S = f(S, B)) : S = f(S, {
          quality: B
        }), S.toWidth = R.width, S.toHeight = R.height, S.width = E.naturalWidth || E.width, S.height = E.naturalHeight || E.height, Object.prototype.hasOwnProperty.call(S, "quality")) {
          if (S.quality < 0 || S.quality > 3)
            throw new Error("Pica: .quality should be [0..3], got ".concat(S.quality));
          S.filter = w.q2f[S.quality];
        }
        if (R.width === 0 || R.height === 0)
          return Promise.reject(new Error("Invalid output size: ".concat(R.width, "x").concat(R.height)));
        S.unsharpRadius > 2 && (S.unsharpRadius = 2), S.canceled = !1, S.cancelToken && (S.cancelToken = S.cancelToken.then(function(D) {
          throw S.canceled = !0, D;
        }, function(D) {
          throw S.canceled = !0, D;
        }));
        var P = 3;
        return S.__destTileBorder = Math.ceil(Math.max(P, 2.5 * S.unsharpRadius | 0)), this.init().then(function() {
          if (S.canceled)
            return S.cancelToken;
          if (T.features.cib) {
            if (w.q2f.indexOf(S.filter) >= 0)
              return T.__resizeViaCreateImageBitmap(E, R, S);
            T.debug("cib is enabled, but not supports provided filter, fallback to manual math");
          }
          if (!I) {
            var D = new Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");
            throw D.code = "ERR_GET_IMAGE_DATA", D;
          }
          var L = _(S.width, S.height, S.toWidth, S.toHeight, T.options.tile, S.__destTileBorder);
          return T.__processStages(L, E, R, S);
        });
      }, F.prototype.resizeBuffer = function(E) {
        var R = this, B = f({}, k, E);
        if (Object.prototype.hasOwnProperty.call(B, "quality")) {
          if (B.quality < 0 || B.quality > 3)
            throw new Error("Pica: .quality should be [0..3], got ".concat(B.quality));
          B.filter = w.q2f[B.quality];
        }
        return this.init().then(function() {
          return R.__mathlib.resizeAndUnsharp(B);
        });
      }, F.prototype.toBlob = function(E, R, B) {
        return R = R || "image/png", new Promise(function(T) {
          if (E.toBlob) {
            E.toBlob(function(U) {
              return T(U);
            }, R, B);
            return;
          }
          if (E.convertToBlob) {
            T(E.convertToBlob({
              type: R,
              quality: B
            }));
            return;
          }
          for (var S = atob(E.toDataURL(R, B).split(",")[1]), P = S.length, D = new Uint8Array(P), L = 0; L < P; L++)
            D[L] = S.charCodeAt(L);
          T(new Blob([D], {
            type: R
          }));
        });
      }, F.prototype.debug = function() {
      }, r.exports = F;
    }, { "./lib/mathlib": 1, "./lib/mm_resize/resize_filter_info": 7, "./lib/pool": 13, "./lib/stepper": 14, "./lib/tiler": 15, "./lib/utils": 16, "./lib/worker": 17, "object-assign": 22, webworkify: 23 }] }, {}, [])("/index.js");
  });
})(yr);
var Bo = yr.exports;
const Fo = /* @__PURE__ */ Io(Bo);
let Mo = function() {
  var t = function(e) {
  };
  (function(e, n) {
    typeof exports == "object" && typeof module < "u" ? n(exports) : typeof define == "function" && define.amd ? define(["exports"], n) : n((e = typeof globalThis < "u" ? globalThis : e || self).d3 = e.d3 || {});
  })(this, function(e) {
    var n = { value: () => {
    } };
    function r() {
      for (var h, u = 0, l = arguments.length, f = {}; u < l; ++u) {
        if (!(h = arguments[u] + "") || h in f || /[\s.]/.test(h))
          throw new Error("illegal type: " + h);
        f[h] = [];
      }
      return new i(f);
    }
    function i(h) {
      this._ = h;
    }
    function a(h, u) {
      return h.trim().split(/^|\s+/).map(function(l) {
        var f = "", c = l.indexOf(".");
        if (c >= 0 && (f = l.slice(c + 1), l = l.slice(0, c)), l && !u.hasOwnProperty(l))
          throw new Error("unknown type: " + l);
        return { type: l, name: f };
      });
    }
    function o(h, u) {
      for (var l, f = 0, c = h.length; f < c; ++f)
        if ((l = h[f]).name === u)
          return l.value;
    }
    function s(h, u, l) {
      for (var f = 0, c = h.length; f < c; ++f)
        if (h[f].name === u) {
          h[f] = n, h = h.slice(0, f).concat(h.slice(f + 1));
          break;
        }
      return l != null && h.push({ name: u, value: l }), h;
    }
    i.prototype = r.prototype = { constructor: i, on: function(h, u) {
      var l, f = this._, c = a(h + "", f), d = -1, v = c.length;
      if (!(arguments.length < 2)) {
        if (u != null && typeof u != "function")
          throw new Error("invalid callback: " + u);
        for (; ++d < v; )
          if (l = (h = c[d]).type)
            f[l] = s(f[l], h.name, u);
          else if (u == null)
            for (l in f)
              f[l] = s(f[l], h.name, null);
        return this;
      }
      for (; ++d < v; )
        if ((l = (h = c[d]).type) && (l = o(f[l], h.name)))
          return l;
    }, copy: function() {
      var h = {}, u = this._;
      for (var l in u)
        h[l] = u[l].slice();
      return new i(h);
    }, call: function(h, u) {
      if ((l = arguments.length - 2) > 0)
        for (var l, f, c = new Array(l), d = 0; d < l; ++d)
          c[d] = arguments[d + 2];
      if (!this._.hasOwnProperty(h))
        throw new Error("unknown type: " + h);
      for (d = 0, l = (f = this._[h]).length; d < l; ++d)
        f[d].value.apply(u, c);
    }, apply: function(h, u, l) {
      if (!this._.hasOwnProperty(h))
        throw new Error("unknown type: " + h);
      for (var f = this._[h], c = 0, d = f.length; c < d; ++c)
        f[c].value.apply(u, l);
    } }, e.dispatch = r, Object.defineProperty(e, "__esModule", { value: !0 });
  }), function(e, n) {
    typeof exports == "object" && typeof module < "u" ? n(exports) : typeof define == "function" && define.amd ? define(["exports"], n) : n((e = typeof globalThis < "u" ? globalThis : e || self).d3 = e.d3 || {});
  }(this, function(e) {
    function n(l, f, c, d) {
      if (isNaN(f) || isNaN(c))
        return l;
      var v, g, m, _, b, w, p, y, A, C = l._root, k = { data: d }, M = l._x0, N = l._y0, I = l._x1, O = l._y1;
      if (!C)
        return l._root = k, l;
      for (; C.length; )
        if ((w = f >= (g = (M + I) / 2)) ? M = g : I = g, (p = c >= (m = (N + O) / 2)) ? N = m : O = m, v = C, !(C = C[y = p << 1 | w]))
          return v[y] = k, l;
      if (_ = +l._x.call(null, C.data), b = +l._y.call(null, C.data), f === _ && c === b)
        return k.next = C, v ? v[y] = k : l._root = k, l;
      do
        v = v ? v[y] = new Array(4) : l._root = new Array(4), (w = f >= (g = (M + I) / 2)) ? M = g : I = g, (p = c >= (m = (N + O) / 2)) ? N = m : O = m;
      while ((y = p << 1 | w) == (A = (b >= m) << 1 | _ >= g));
      return v[A] = C, v[y] = k, l;
    }
    function r(l, f, c, d, v) {
      this.node = l, this.x0 = f, this.y0 = c, this.x1 = d, this.y1 = v;
    }
    function i(l) {
      return l[0];
    }
    function a(l) {
      return l[1];
    }
    function o(l, f, c) {
      var d = new s(f ?? i, c ?? a, NaN, NaN, NaN, NaN);
      return l == null ? d : d.addAll(l);
    }
    function s(l, f, c, d, v, g) {
      this._x = l, this._y = f, this._x0 = c, this._y0 = d, this._x1 = v, this._y1 = g, this._root = void 0;
    }
    function h(l) {
      for (var f = { data: l.data }, c = f; l = l.next; )
        c = c.next = { data: l.data };
      return f;
    }
    var u = o.prototype = s.prototype;
    u.copy = function() {
      var l, f, c = new s(this._x, this._y, this._x0, this._y0, this._x1, this._y1), d = this._root;
      if (!d)
        return c;
      if (!d.length)
        return c._root = h(d), c;
      for (l = [{ source: d, target: c._root = new Array(4) }]; d = l.pop(); )
        for (var v = 0; v < 4; ++v)
          (f = d.source[v]) && (f.length ? l.push({ source: f, target: d.target[v] = new Array(4) }) : d.target[v] = h(f));
      return c;
    }, u.add = function(l) {
      const f = +this._x.call(null, l), c = +this._y.call(null, l);
      return n(this.cover(f, c), f, c, l);
    }, u.addAll = function(l) {
      var f, c, d, v, g = l.length, m = new Array(g), _ = new Array(g), b = 1 / 0, w = 1 / 0, p = -1 / 0, y = -1 / 0;
      for (c = 0; c < g; ++c)
        isNaN(d = +this._x.call(null, f = l[c])) || isNaN(v = +this._y.call(null, f)) || (m[c] = d, _[c] = v, d < b && (b = d), d > p && (p = d), v < w && (w = v), v > y && (y = v));
      if (b > p || w > y)
        return this;
      for (this.cover(b, w).cover(p, y), c = 0; c < g; ++c)
        n(this, m[c], _[c], l[c]);
      return this;
    }, u.cover = function(l, f) {
      if (isNaN(l = +l) || isNaN(f = +f))
        return this;
      var c = this._x0, d = this._y0, v = this._x1, g = this._y1;
      if (isNaN(c))
        v = (c = Math.floor(l)) + 1, g = (d = Math.floor(f)) + 1;
      else {
        for (var m, _, b = v - c || 1, w = this._root; c > l || l >= v || d > f || f >= g; )
          switch (_ = (f < d) << 1 | l < c, (m = new Array(4))[_] = w, w = m, b *= 2, _) {
            case 0:
              v = c + b, g = d + b;
              break;
            case 1:
              c = v - b, g = d + b;
              break;
            case 2:
              v = c + b, d = g - b;
              break;
            case 3:
              c = v - b, d = g - b;
          }
        this._root && this._root.length && (this._root = w);
      }
      return this._x0 = c, this._y0 = d, this._x1 = v, this._y1 = g, this;
    }, u.data = function() {
      var l = [];
      return this.visit(function(f) {
        if (!f.length)
          do
            l.push(f.data);
          while (f = f.next);
      }), l;
    }, u.extent = function(l) {
      return arguments.length ? this.cover(+l[0][0], +l[0][1]).cover(+l[1][0], +l[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
    }, u.find = function(l, f, c) {
      var d, v, g, m, _, b, w, p = this._x0, y = this._y0, A = this._x1, C = this._y1, k = [], M = this._root;
      for (M && k.push(new r(M, p, y, A, C)), c == null ? c = 1 / 0 : (p = l - c, y = f - c, A = l + c, C = f + c, c *= c); b = k.pop(); )
        if (!(!(M = b.node) || (v = b.x0) > A || (g = b.y0) > C || (m = b.x1) < p || (_ = b.y1) < y))
          if (M.length) {
            var N = (v + m) / 2, I = (g + _) / 2;
            k.push(new r(M[3], N, I, m, _), new r(M[2], v, I, N, _), new r(M[1], N, g, m, I), new r(M[0], v, g, N, I)), (w = (f >= I) << 1 | l >= N) && (b = k[k.length - 1], k[k.length - 1] = k[k.length - 1 - w], k[k.length - 1 - w] = b);
          } else {
            var O = l - +this._x.call(null, M.data), z = f - +this._y.call(null, M.data), x = O * O + z * z;
            if (x < c) {
              var F = Math.sqrt(c = x);
              p = l - F, y = f - F, A = l + F, C = f + F, d = M.data;
            }
          }
      return d;
    }, u.remove = function(l) {
      if (isNaN(g = +this._x.call(null, l)) || isNaN(m = +this._y.call(null, l)))
        return this;
      var f, c, d, v, g, m, _, b, w, p, y, A, C = this._root, k = this._x0, M = this._y0, N = this._x1, I = this._y1;
      if (!C)
        return this;
      if (C.length)
        for (; ; ) {
          if ((w = g >= (_ = (k + N) / 2)) ? k = _ : N = _, (p = m >= (b = (M + I) / 2)) ? M = b : I = b, f = C, !(C = C[y = p << 1 | w]))
            return this;
          if (!C.length)
            break;
          (f[y + 1 & 3] || f[y + 2 & 3] || f[y + 3 & 3]) && (c = f, A = y);
        }
      for (; C.data !== l; )
        if (d = C, !(C = C.next))
          return this;
      return (v = C.next) && delete C.next, d ? (v ? d.next = v : delete d.next, this) : f ? (v ? f[y] = v : delete f[y], (C = f[0] || f[1] || f[2] || f[3]) && C === (f[3] || f[2] || f[1] || f[0]) && !C.length && (c ? c[A] = C : this._root = C), this) : (this._root = v, this);
    }, u.removeAll = function(l) {
      for (var f = 0, c = l.length; f < c; ++f)
        this.remove(l[f]);
      return this;
    }, u.root = function() {
      return this._root;
    }, u.size = function() {
      var l = 0;
      return this.visit(function(f) {
        if (!f.length)
          do
            ++l;
          while (f = f.next);
      }), l;
    }, u.visit = function(l) {
      var f, c, d, v, g, m, _ = [], b = this._root;
      for (b && _.push(new r(b, this._x0, this._y0, this._x1, this._y1)); f = _.pop(); )
        if (!l(b = f.node, d = f.x0, v = f.y0, g = f.x1, m = f.y1) && b.length) {
          var w = (d + g) / 2, p = (v + m) / 2;
          (c = b[3]) && _.push(new r(c, w, p, g, m)), (c = b[2]) && _.push(new r(c, d, p, w, m)), (c = b[1]) && _.push(new r(c, w, v, g, p)), (c = b[0]) && _.push(new r(c, d, v, w, p));
        }
      return this;
    }, u.visitAfter = function(l) {
      var f, c = [], d = [];
      for (this._root && c.push(new r(this._root, this._x0, this._y0, this._x1, this._y1)); f = c.pop(); ) {
        var v = f.node;
        if (v.length) {
          var g, m = f.x0, _ = f.y0, b = f.x1, w = f.y1, p = (m + b) / 2, y = (_ + w) / 2;
          (g = v[0]) && c.push(new r(g, m, _, p, y)), (g = v[1]) && c.push(new r(g, p, _, b, y)), (g = v[2]) && c.push(new r(g, m, y, p, w)), (g = v[3]) && c.push(new r(g, p, y, b, w));
        }
        d.push(f);
      }
      for (; f = d.pop(); )
        l(f.node, f.x0, f.y0, f.x1, f.y1);
      return this;
    }, u.x = function(l) {
      return arguments.length ? (this._x = l, this) : this._x;
    }, u.y = function(l) {
      return arguments.length ? (this._y = l, this) : this._y;
    }, e.quadtree = o, Object.defineProperty(e, "__esModule", { value: !0 });
  }), function(e, n) {
    typeof exports == "object" && typeof module < "u" ? n(exports) : typeof define == "function" && define.amd ? define(["exports"], n) : n((e = typeof globalThis < "u" ? globalThis : e || self).d3 = e.d3 || {});
  }(this, function(e) {
    var n, r, i = 0, a = 0, o = 0, s = 0, h = 0, u = 0, l = typeof performance == "object" && performance.now ? performance : Date, f = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(p) {
      setTimeout(p, 17);
    };
    function c() {
      return h || (f(d), h = l.now() + u);
    }
    function d() {
      h = 0;
    }
    function v() {
      this._call = this._time = this._next = null;
    }
    function g(p, y, A) {
      var C = new v();
      return C.restart(p, y, A), C;
    }
    function m() {
      c(), ++i;
      for (var p, y = n; y; )
        (p = h - y._time) >= 0 && y._call.call(void 0, p), y = y._next;
      --i;
    }
    function _() {
      h = (s = l.now()) + u, i = a = 0;
      try {
        m();
      } finally {
        i = 0, function() {
          for (var p, y, A = n, C = 1 / 0; A; )
            A._call ? (C > A._time && (C = A._time), p = A, A = A._next) : (y = A._next, A._next = null, A = p ? p._next = y : n = y);
          r = p, w(C);
        }(), h = 0;
      }
    }
    function b() {
      var p = l.now(), y = p - s;
      y > 1e3 && (u -= y, s = p);
    }
    function w(p) {
      i || (a && (a = clearTimeout(a)), p - h > 24 ? (p < 1 / 0 && (a = setTimeout(_, p - l.now() - u)), o && (o = clearInterval(o))) : (o || (s = l.now(), o = setInterval(b, 1e3)), i = 1, f(_)));
    }
    v.prototype = g.prototype = { constructor: v, restart: function(p, y, A) {
      if (typeof p != "function")
        throw new TypeError("callback is not a function");
      A = (A == null ? c() : +A) + (y == null ? 0 : +y), this._next || r === this || (r ? r._next = this : n = this, r = this), this._call = p, this._time = A, w();
    }, stop: function() {
      this._call && (this._call = null, this._time = 1 / 0, w());
    } }, e.interval = function(p, y, A) {
      var C = new v(), k = y;
      return y == null ? (C.restart(p, y, A), C) : (C._restart = C.restart, C.restart = function(M, N, I) {
        N = +N, I = I == null ? c() : +I, C._restart(function O(z) {
          z += k, C._restart(O, k += N, I), M(z);
        }, N, I);
      }, C.restart(p, y, A), C);
    }, e.now = c, e.timeout = function(p, y, A) {
      var C = new v();
      return y = y == null ? 0 : +y, C.restart((k) => {
        C.stop(), p(k + y);
      }, y, A), C;
    }, e.timer = g, e.timerFlush = m, Object.defineProperty(e, "__esModule", { value: !0 });
  }), function(e, n) {
    typeof exports == "object" && typeof module < "u" ? n(exports, t(), t(), t()) : typeof define == "function" && define.amd ? define(["exports", "d3-quadtree", "d3-dispatch", "d3-timer"], n) : n((e = typeof globalThis < "u" ? globalThis : e || self).d3 = e.d3 || {}, e.d3, e.d3, e.d3);
  }(this, function(e, n, r, i) {
    function a(g) {
      return function() {
        return g;
      };
    }
    function o(g) {
      return 1e-6 * (g() - 0.5);
    }
    function s(g) {
      return g.x + g.vx;
    }
    function h(g) {
      return g.y + g.vy;
    }
    function u(g) {
      return g.index;
    }
    function l(g, m) {
      var _ = g.get(m);
      if (!_)
        throw new Error("node not found: " + m);
      return _;
    }
    const f = 4294967296;
    function c(g) {
      return g.x;
    }
    function d(g) {
      return g.y;
    }
    var v = Math.PI * (3 - Math.sqrt(5));
    e.forceCenter = function(g, m) {
      var _, b = 1;
      function w() {
        var p, y, A = _.length, C = 0, k = 0;
        for (p = 0; p < A; ++p)
          C += (y = _[p]).x, k += y.y;
        for (C = (C / A - g) * b, k = (k / A - m) * b, p = 0; p < A; ++p)
          (y = _[p]).x -= C, y.y -= k;
      }
      return g == null && (g = 0), m == null && (m = 0), w.initialize = function(p) {
        _ = p;
      }, w.x = function(p) {
        return arguments.length ? (g = +p, w) : g;
      }, w.y = function(p) {
        return arguments.length ? (m = +p, w) : m;
      }, w.strength = function(p) {
        return arguments.length ? (b = +p, w) : b;
      }, w;
    }, e.forceCollide = function(g) {
      var m, _, b, w = 1, p = 1;
      function y() {
        for (var k, M, N, I, O, z, x, F = m.length, E = 0; E < p; ++E)
          for (M = n.quadtree(m, s, h).visitAfter(A), k = 0; k < F; ++k)
            N = m[k], z = _[N.index], x = z * z, I = N.x + N.vx, O = N.y + N.vy, M.visit(R);
        function R(B, T, S, P, D) {
          var L = B.data, U = B.r, Q = z + U;
          if (!L)
            return T > I + Q || P < I - Q || S > O + Q || D < O - Q;
          if (L.index > N.index) {
            var G = I - L.x - L.vx, V = O - L.y - L.vy, W = G * G + V * V;
            W < Q * Q && (G === 0 && (W += (G = o(b)) * G), V === 0 && (W += (V = o(b)) * V), W = (Q - (W = Math.sqrt(W))) / W * w, N.vx += (G *= W) * (Q = (U *= U) / (x + U)), N.vy += (V *= W) * Q, L.vx -= G * (Q = 1 - Q), L.vy -= V * Q);
          }
        }
      }
      function A(k) {
        if (k.data)
          return k.r = _[k.data.index];
        for (var M = k.r = 0; M < 4; ++M)
          k[M] && k[M].r > k.r && (k.r = k[M].r);
      }
      function C() {
        if (m) {
          var k, M, N = m.length;
          for (_ = new Array(N), k = 0; k < N; ++k)
            M = m[k], _[M.index] = +g(M, k, m);
        }
      }
      return typeof g != "function" && (g = a(g == null ? 1 : +g)), y.initialize = function(k, M) {
        m = k, b = M, C();
      }, y.iterations = function(k) {
        return arguments.length ? (p = +k, y) : p;
      }, y.strength = function(k) {
        return arguments.length ? (w = +k, y) : w;
      }, y.radius = function(k) {
        return arguments.length ? (g = typeof k == "function" ? k : a(+k), C(), y) : g;
      }, y;
    }, e.forceLink = function(g) {
      var m, _, b, w, p, y, A = u, C = function(x) {
        return 1 / Math.min(w[x.source.index], w[x.target.index]);
      }, k = a(30), M = 1;
      function N(x) {
        for (var F = 0, E = g.length; F < M; ++F)
          for (var R, B, T, S, P, D, L, U = 0; U < E; ++U)
            B = (R = g[U]).source, S = (T = R.target).x + T.vx - B.x - B.vx || o(y), P = T.y + T.vy - B.y - B.vy || o(y), S *= D = ((D = Math.sqrt(S * S + P * P)) - _[U]) / D * x * m[U], P *= D, T.vx -= S * (L = p[U]), T.vy -= P * L, B.vx += S * (L = 1 - L), B.vy += P * L;
      }
      function I() {
        if (b) {
          var x, F, E = b.length, R = g.length, B = new Map(b.map((T, S) => [A(T, S, b), T]));
          for (x = 0, w = new Array(E); x < R; ++x)
            (F = g[x]).index = x, typeof F.source != "object" && (F.source = l(B, F.source)), typeof F.target != "object" && (F.target = l(B, F.target)), w[F.source.index] = (w[F.source.index] || 0) + 1, w[F.target.index] = (w[F.target.index] || 0) + 1;
          for (x = 0, p = new Array(R); x < R; ++x)
            F = g[x], p[x] = w[F.source.index] / (w[F.source.index] + w[F.target.index]);
          m = new Array(R), O(), _ = new Array(R), z();
        }
      }
      function O() {
        if (b)
          for (var x = 0, F = g.length; x < F; ++x)
            m[x] = +C(g[x], x, g);
      }
      function z() {
        if (b)
          for (var x = 0, F = g.length; x < F; ++x)
            _[x] = +k(g[x], x, g);
      }
      return g == null && (g = []), N.initialize = function(x, F) {
        b = x, y = F, I();
      }, N.links = function(x) {
        return arguments.length ? (g = x, I(), N) : g;
      }, N.id = function(x) {
        return arguments.length ? (A = x, N) : A;
      }, N.iterations = function(x) {
        return arguments.length ? (M = +x, N) : M;
      }, N.strength = function(x) {
        return arguments.length ? (C = typeof x == "function" ? x : a(+x), O(), N) : C;
      }, N.distance = function(x) {
        return arguments.length ? (k = typeof x == "function" ? x : a(+x), z(), N) : k;
      }, N;
    }, e.forceManyBody = function() {
      var g, m, _, b, w, p = a(-30), y = 1, A = 1 / 0, C = 0.81;
      function k(O) {
        var z, x = g.length, F = n.quadtree(g, c, d).visitAfter(N);
        for (b = O, z = 0; z < x; ++z)
          m = g[z], F.visit(I);
      }
      function M() {
        if (g) {
          var O, z, x = g.length;
          for (w = new Array(x), O = 0; O < x; ++O)
            z = g[O], w[z.index] = +p(z, O, g);
        }
      }
      function N(O) {
        var z, x, F, E, R, B = 0, T = 0;
        if (O.length) {
          for (F = E = R = 0; R < 4; ++R)
            (z = O[R]) && (x = Math.abs(z.value)) && (B += z.value, T += x, F += x * z.x, E += x * z.y);
          O.x = F / T, O.y = E / T;
        } else {
          (z = O).x = z.data.x, z.y = z.data.y;
          do
            B += w[z.data.index];
          while (z = z.next);
        }
        O.value = B;
      }
      function I(O, z, x, F) {
        if (!O.value)
          return !0;
        var E = O.x - m.x, R = O.y - m.y, B = F - z, T = E * E + R * R;
        if (B * B / C < T)
          return T < A && (E === 0 && (T += (E = o(_)) * E), R === 0 && (T += (R = o(_)) * R), T < y && (T = Math.sqrt(y * T)), m.vx += E * O.value * b / T, m.vy += R * O.value * b / T), !0;
        if (!(O.length || T >= A)) {
          (O.data !== m || O.next) && (E === 0 && (T += (E = o(_)) * E), R === 0 && (T += (R = o(_)) * R), T < y && (T = Math.sqrt(y * T)));
          do
            O.data !== m && (B = w[O.data.index] * b / T, m.vx += E * B, m.vy += R * B);
          while (O = O.next);
        }
      }
      return k.initialize = function(O, z) {
        g = O, _ = z, M();
      }, k.strength = function(O) {
        return arguments.length ? (p = typeof O == "function" ? O : a(+O), M(), k) : p;
      }, k.distanceMin = function(O) {
        return arguments.length ? (y = O * O, k) : Math.sqrt(y);
      }, k.distanceMax = function(O) {
        return arguments.length ? (A = O * O, k) : Math.sqrt(A);
      }, k.theta = function(O) {
        return arguments.length ? (C = O * O, k) : Math.sqrt(C);
      }, k;
    }, e.forceRadial = function(g, m, _) {
      var b, w, p, y = a(0.1);
      function A(k) {
        for (var M = 0, N = b.length; M < N; ++M) {
          var I = b[M], O = I.x - m || 1e-6, z = I.y - _ || 1e-6, x = Math.sqrt(O * O + z * z), F = (p[M] - x) * w[M] * k / x;
          I.vx += O * F, I.vy += z * F;
        }
      }
      function C() {
        if (b) {
          var k, M = b.length;
          for (w = new Array(M), p = new Array(M), k = 0; k < M; ++k)
            p[k] = +g(b[k], k, b), w[k] = isNaN(p[k]) ? 0 : +y(b[k], k, b);
        }
      }
      return typeof g != "function" && (g = a(+g)), m == null && (m = 0), _ == null && (_ = 0), A.initialize = function(k) {
        b = k, C();
      }, A.strength = function(k) {
        return arguments.length ? (y = typeof k == "function" ? k : a(+k), C(), A) : y;
      }, A.radius = function(k) {
        return arguments.length ? (g = typeof k == "function" ? k : a(+k), C(), A) : g;
      }, A.x = function(k) {
        return arguments.length ? (m = +k, A) : m;
      }, A.y = function(k) {
        return arguments.length ? (_ = +k, A) : _;
      }, A;
    }, e.forceSimulation = function(g) {
      var m, _ = 1, b = 1e-3, w = 1 - Math.pow(b, 1 / 300), p = 0, y = 0.6, A = /* @__PURE__ */ new Map(), C = i.timer(N), k = r.dispatch("tick", "end"), M = function() {
        let x = 1;
        return () => (x = (1664525 * x + 1013904223) % f) / f;
      }();
      function N() {
        I(), k.call("tick", m), _ < b && (C.stop(), k.call("end", m));
      }
      function I(x) {
        var F, E, R = g.length;
        x === void 0 && (x = 1);
        for (var B = 0; B < x; ++B)
          for (_ += (p - _) * w, A.forEach(function(T) {
            T(_);
          }), F = 0; F < R; ++F)
            (E = g[F]).fx == null ? E.x += E.vx *= y : (E.x = E.fx, E.vx = 0), E.fy == null ? E.y += E.vy *= y : (E.y = E.fy, E.vy = 0);
        return m;
      }
      function O() {
        for (var x, F = 0, E = g.length; F < E; ++F) {
          if ((x = g[F]).index = F, x.fx != null && (x.x = x.fx), x.fy != null && (x.y = x.fy), isNaN(x.x) || isNaN(x.y)) {
            var R = 10 * Math.sqrt(0.5 + F), B = F * v;
            x.x = R * Math.cos(B), x.y = R * Math.sin(B);
          }
          (isNaN(x.vx) || isNaN(x.vy)) && (x.vx = x.vy = 0);
        }
      }
      function z(x) {
        return x.initialize && x.initialize(g, M), x;
      }
      return g == null && (g = []), O(), m = { tick: I, restart: function() {
        return C.restart(N), m;
      }, stop: function() {
        return C.stop(), m;
      }, nodes: function(x) {
        return arguments.length ? (g = x, O(), A.forEach(z), m) : g;
      }, alpha: function(x) {
        return arguments.length ? (_ = +x, m) : _;
      }, alphaMin: function(x) {
        return arguments.length ? (b = +x, m) : b;
      }, alphaDecay: function(x) {
        return arguments.length ? (w = +x, m) : +w;
      }, alphaTarget: function(x) {
        return arguments.length ? (p = +x, m) : p;
      }, velocityDecay: function(x) {
        return arguments.length ? (y = 1 - x, m) : 1 - y;
      }, randomSource: function(x) {
        return arguments.length ? (M = x, A.forEach(z), m) : M;
      }, force: function(x, F) {
        return arguments.length > 1 ? (F == null ? A.delete(x) : A.set(x, z(F)), m) : A.get(x);
      }, find: function(x, F, E) {
        var R, B, T, S, P, D = 0, L = g.length;
        for (E == null ? E = 1 / 0 : E *= E, D = 0; D < L; ++D)
          (T = (R = x - (S = g[D]).x) * R + (B = F - S.y) * B) < E && (P = S, E = T);
        return P;
      }, on: function(x, F) {
        return arguments.length > 1 ? (k.on(x, F), m) : k.on(x);
      } };
    }, e.forceX = function(g) {
      var m, _, b, w = a(0.1);
      function p(A) {
        for (var C, k = 0, M = m.length; k < M; ++k)
          (C = m[k]).vx += (b[k] - C.x) * _[k] * A;
      }
      function y() {
        if (m) {
          var A, C = m.length;
          for (_ = new Array(C), b = new Array(C), A = 0; A < C; ++A)
            _[A] = isNaN(b[A] = +g(m[A], A, m)) ? 0 : +w(m[A], A, m);
        }
      }
      return typeof g != "function" && (g = a(g == null ? 0 : +g)), p.initialize = function(A) {
        m = A, y();
      }, p.strength = function(A) {
        return arguments.length ? (w = typeof A == "function" ? A : a(+A), y(), p) : w;
      }, p.x = function(A) {
        return arguments.length ? (g = typeof A == "function" ? A : a(+A), y(), p) : g;
      }, p;
    }, e.forceY = function(g) {
      var m, _, b, w = a(0.1);
      function p(A) {
        for (var C, k = 0, M = m.length; k < M; ++k)
          (C = m[k]).vy += (b[k] - C.y) * _[k] * A;
      }
      function y() {
        if (m) {
          var A, C = m.length;
          for (_ = new Array(C), b = new Array(C), A = 0; A < C; ++A)
            _[A] = isNaN(b[A] = +g(m[A], A, m)) ? 0 : +w(m[A], A, m);
        }
      }
      return typeof g != "function" && (g = a(g == null ? 0 : +g)), p.initialize = function(A) {
        m = A, y();
      }, p.strength = function(A) {
        return arguments.length ? (w = typeof A == "function" ? A : a(+A), y(), p) : w;
      }, p.y = function(A) {
        return arguments.length ? (g = typeof A == "function" ? A : a(+A), y(), p) : g;
      }, p;
    }, Object.defineProperty(e, "__esModule", { value: !0 });
  }), function(e, n) {
    typeof exports == "object" && typeof module < "u" ? n(exports) : typeof define == "function" && define.amd ? define(["exports"], n) : n((e = typeof globalThis < "u" ? globalThis : e || self).d3 = e.d3 || {});
  }(this, function(e) {
    function n(u, l, f) {
      if (isNaN(l))
        return u;
      var c, d, v, g, m, _, b = u._root, w = { data: f }, p = u._x0, y = u._x1;
      if (!b)
        return u._root = w, u;
      for (; b.length; )
        if ((g = l >= (d = (p + y) / 2)) ? p = d : y = d, c = b, !(b = b[m = +g]))
          return c[m] = w, u;
      if (l === (v = +u._x.call(null, b.data)))
        return w.next = b, c ? c[m] = w : u._root = w, u;
      do
        c = c ? c[m] = new Array(2) : u._root = new Array(2), (g = l >= (d = (p + y) / 2)) ? p = d : y = d;
      while ((m = +g) == (_ = +(v >= d)));
      return c[_] = b, c[m] = w, u;
    }
    function r(u, l, f) {
      this.node = u, this.x0 = l, this.x1 = f;
    }
    function i(u) {
      return u[0];
    }
    function a(u, l) {
      var f = new o(l ?? i, NaN, NaN);
      return u == null ? f : f.addAll(u);
    }
    function o(u, l, f) {
      this._x = u, this._x0 = l, this._x1 = f, this._root = void 0;
    }
    function s(u) {
      for (var l = { data: u.data }, f = l; u = u.next; )
        f = f.next = { data: u.data };
      return l;
    }
    var h = a.prototype = o.prototype;
    h.copy = function() {
      var u, l, f = new o(this._x, this._x0, this._x1), c = this._root;
      if (!c)
        return f;
      if (!c.length)
        return f._root = s(c), f;
      for (u = [{ source: c, target: f._root = new Array(2) }]; c = u.pop(); )
        for (var d = 0; d < 2; ++d)
          (l = c.source[d]) && (l.length ? u.push({ source: l, target: c.target[d] = new Array(2) }) : c.target[d] = s(l));
      return f;
    }, h.add = function(u) {
      var l = +this._x.call(null, u);
      return n(this.cover(l), l, u);
    }, h.addAll = function(u) {
      var l, f, c = u.length, d = new Array(c), v = 1 / 0, g = -1 / 0;
      for (l = 0; l < c; ++l)
        isNaN(f = +this._x.call(null, u[l])) || (d[l] = f, f < v && (v = f), f > g && (g = f));
      if (v > g)
        return this;
      for (this.cover(v).cover(g), l = 0; l < c; ++l)
        n(this, d[l], u[l]);
      return this;
    }, h.cover = function(u) {
      if (isNaN(u = +u))
        return this;
      var l = this._x0, f = this._x1;
      if (isNaN(l))
        f = (l = Math.floor(u)) + 1;
      else {
        for (var c, d, v = f - l || 1, g = this._root; l > u || u >= f; )
          switch (d = +(u < l), (c = new Array(2))[d] = g, g = c, v *= 2, d) {
            case 0:
              f = l + v;
              break;
            case 1:
              l = f - v;
          }
        this._root && this._root.length && (this._root = g);
      }
      return this._x0 = l, this._x1 = f, this;
    }, h.data = function() {
      var u = [];
      return this.visit(function(l) {
        if (!l.length)
          do
            u.push(l.data);
          while (l = l.next);
      }), u;
    }, h.extent = function(u) {
      return arguments.length ? this.cover(+u[0][0]).cover(+u[1][0]) : isNaN(this._x0) ? void 0 : [[this._x0], [this._x1]];
    }, h.find = function(u, l) {
      var f, c, d, v, g, m = this._x0, _ = this._x1, b = [], w = this._root;
      for (w && b.push(new r(w, m, _)), l == null ? l = 1 / 0 : (m = u - l, _ = u + l); v = b.pop(); )
        if (!(!(w = v.node) || (c = v.x0) > _ || (d = v.x1) < m))
          if (w.length) {
            var p = (c + d) / 2;
            b.push(new r(w[1], p, d), new r(w[0], c, p)), (g = +(u >= p)) && (v = b[b.length - 1], b[b.length - 1] = b[b.length - 1 - g], b[b.length - 1 - g] = v);
          } else {
            var y = Math.abs(u - +this._x.call(null, w.data));
            y < l && (l = y, m = u - y, _ = u + y, f = w.data);
          }
      return f;
    }, h.remove = function(u) {
      if (isNaN(v = +this._x.call(null, u)))
        return this;
      var l, f, c, d, v, g, m, _, b, w = this._root, p = this._x0, y = this._x1;
      if (!w)
        return this;
      if (w.length)
        for (; ; ) {
          if ((m = v >= (g = (p + y) / 2)) ? p = g : y = g, l = w, !(w = w[_ = +m]))
            return this;
          if (!w.length)
            break;
          l[_ + 1 & 1] && (f = l, b = _);
        }
      for (; w.data !== u; )
        if (c = w, !(w = w.next))
          return this;
      return (d = w.next) && delete w.next, c ? (d ? c.next = d : delete c.next, this) : l ? (d ? l[_] = d : delete l[_], (w = l[0] || l[1]) && w === (l[1] || l[0]) && !w.length && (f ? f[b] = w : this._root = w), this) : (this._root = d, this);
    }, h.removeAll = function(u) {
      for (var l = 0, f = u.length; l < f; ++l)
        this.remove(u[l]);
      return this;
    }, h.root = function() {
      return this._root;
    }, h.size = function() {
      var u = 0;
      return this.visit(function(l) {
        if (!l.length)
          do
            ++u;
          while (l = l.next);
      }), u;
    }, h.visit = function(u) {
      var l, f, c, d, v = [], g = this._root;
      for (g && v.push(new r(g, this._x0, this._x1)); l = v.pop(); )
        if (!u(g = l.node, c = l.x0, d = l.x1) && g.length) {
          var m = (c + d) / 2;
          (f = g[1]) && v.push(new r(f, m, d)), (f = g[0]) && v.push(new r(f, c, m));
        }
      return this;
    }, h.visitAfter = function(u) {
      var l, f = [], c = [];
      for (this._root && f.push(new r(this._root, this._x0, this._x1)); l = f.pop(); ) {
        var d = l.node;
        if (d.length) {
          var v, g = l.x0, m = l.x1, _ = (g + m) / 2;
          (v = d[0]) && f.push(new r(v, g, _)), (v = d[1]) && f.push(new r(v, _, m));
        }
        c.push(l);
      }
      for (; l = c.pop(); )
        u(l.node, l.x0, l.x1);
      return this;
    }, h.x = function(u) {
      return arguments.length ? (this._x = u, this) : this._x;
    }, e.binarytree = a, Object.defineProperty(e, "__esModule", { value: !0 });
  }), function(e, n) {
    typeof exports == "object" && typeof module < "u" ? n(exports) : typeof define == "function" && define.amd ? define(["exports"], n) : n((e = typeof globalThis < "u" ? globalThis : e || self).d3 = e.d3 || {});
  }(this, function(e) {
    function n(f, c, d, v, g) {
      if (isNaN(c) || isNaN(d) || isNaN(v))
        return f;
      var m, _, b, w, p, y, A, C, k, M, N, I, O = f._root, z = { data: g }, x = f._x0, F = f._y0, E = f._z0, R = f._x1, B = f._y1, T = f._z1;
      if (!O)
        return f._root = z, f;
      for (; O.length; )
        if ((C = c >= (_ = (x + R) / 2)) ? x = _ : R = _, (k = d >= (b = (F + B) / 2)) ? F = b : B = b, (M = v >= (w = (E + T) / 2)) ? E = w : T = w, m = O, !(O = O[N = M << 2 | k << 1 | C]))
          return m[N] = z, f;
      if (p = +f._x.call(null, O.data), y = +f._y.call(null, O.data), A = +f._z.call(null, O.data), c === p && d === y && v === A)
        return z.next = O, m ? m[N] = z : f._root = z, f;
      do
        m = m ? m[N] = new Array(8) : f._root = new Array(8), (C = c >= (_ = (x + R) / 2)) ? x = _ : R = _, (k = d >= (b = (F + B) / 2)) ? F = b : B = b, (M = v >= (w = (E + T) / 2)) ? E = w : T = w;
      while ((N = M << 2 | k << 1 | C) == (I = (A >= w) << 2 | (y >= b) << 1 | p >= _));
      return m[I] = O, m[N] = z, f;
    }
    function r(f, c, d, v, g, m, _) {
      this.node = f, this.x0 = c, this.y0 = d, this.z0 = v, this.x1 = g, this.y1 = m, this.z1 = _;
    }
    function i(f) {
      return f[0];
    }
    function a(f) {
      return f[1];
    }
    function o(f) {
      return f[2];
    }
    function s(f, c, d, v) {
      var g = new h(c ?? i, d ?? a, v ?? o, NaN, NaN, NaN, NaN, NaN, NaN);
      return f == null ? g : g.addAll(f);
    }
    function h(f, c, d, v, g, m, _, b, w) {
      this._x = f, this._y = c, this._z = d, this._x0 = v, this._y0 = g, this._z0 = m, this._x1 = _, this._y1 = b, this._z1 = w, this._root = void 0;
    }
    function u(f) {
      for (var c = { data: f.data }, d = c; f = f.next; )
        d = d.next = { data: f.data };
      return c;
    }
    var l = s.prototype = h.prototype;
    l.copy = function() {
      var f, c, d = new h(this._x, this._y, this._z, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1), v = this._root;
      if (!v)
        return d;
      if (!v.length)
        return d._root = u(v), d;
      for (f = [{ source: v, target: d._root = new Array(8) }]; v = f.pop(); )
        for (var g = 0; g < 8; ++g)
          (c = v.source[g]) && (c.length ? f.push({ source: c, target: v.target[g] = new Array(8) }) : v.target[g] = u(c));
      return d;
    }, l.add = function(f) {
      var c = +this._x.call(null, f), d = +this._y.call(null, f), v = +this._z.call(null, f);
      return n(this.cover(c, d, v), c, d, v, f);
    }, l.addAll = function(f) {
      var c, d, v, g, m, _ = f.length, b = new Array(_), w = new Array(_), p = new Array(_), y = 1 / 0, A = 1 / 0, C = 1 / 0, k = -1 / 0, M = -1 / 0, N = -1 / 0;
      for (d = 0; d < _; ++d)
        isNaN(v = +this._x.call(null, c = f[d])) || isNaN(g = +this._y.call(null, c)) || isNaN(m = +this._z.call(null, c)) || (b[d] = v, w[d] = g, p[d] = m, v < y && (y = v), v > k && (k = v), g < A && (A = g), g > M && (M = g), m < C && (C = m), m > N && (N = m));
      if (y > k || A > M || C > N)
        return this;
      for (this.cover(y, A, C).cover(k, M, N), d = 0; d < _; ++d)
        n(this, b[d], w[d], p[d], f[d]);
      return this;
    }, l.cover = function(f, c, d) {
      if (isNaN(f = +f) || isNaN(c = +c) || isNaN(d = +d))
        return this;
      var v = this._x0, g = this._y0, m = this._z0, _ = this._x1, b = this._y1, w = this._z1;
      if (isNaN(v))
        _ = (v = Math.floor(f)) + 1, b = (g = Math.floor(c)) + 1, w = (m = Math.floor(d)) + 1;
      else {
        for (var p, y, A = _ - v || 1, C = this._root; v > f || f >= _ || g > c || c >= b || m > d || d >= w; )
          switch (y = (d < m) << 2 | (c < g) << 1 | f < v, (p = new Array(8))[y] = C, C = p, A *= 2, y) {
            case 0:
              _ = v + A, b = g + A, w = m + A;
              break;
            case 1:
              v = _ - A, b = g + A, w = m + A;
              break;
            case 2:
              _ = v + A, g = b - A, w = m + A;
              break;
            case 3:
              v = _ - A, g = b - A, w = m + A;
              break;
            case 4:
              _ = v + A, b = g + A, m = w - A;
              break;
            case 5:
              v = _ - A, b = g + A, m = w - A;
              break;
            case 6:
              _ = v + A, g = b - A, m = w - A;
              break;
            case 7:
              v = _ - A, g = b - A, m = w - A;
          }
        this._root && this._root.length && (this._root = C);
      }
      return this._x0 = v, this._y0 = g, this._z0 = m, this._x1 = _, this._y1 = b, this._z1 = w, this;
    }, l.data = function() {
      var f = [];
      return this.visit(function(c) {
        if (!c.length)
          do
            f.push(c.data);
          while (c = c.next);
      }), f;
    }, l.extent = function(f) {
      return arguments.length ? this.cover(+f[0][0], +f[0][1], +f[0][2]).cover(+f[1][0], +f[1][1], +f[1][2]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0, this._z0], [this._x1, this._y1, this._z1]];
    }, l.find = function(f, c, d, v) {
      var g, m, _, b, w, p, y, A, C, k = this._x0, M = this._y0, N = this._z0, I = this._x1, O = this._y1, z = this._z1, x = [], F = this._root;
      for (F && x.push(new r(F, k, M, N, I, O, z)), v == null ? v = 1 / 0 : (k = f - v, M = c - v, N = d - v, I = f + v, O = c + v, z = d + v, v *= v); A = x.pop(); )
        if (!(!(F = A.node) || (m = A.x0) > I || (_ = A.y0) > O || (b = A.z0) > z || (w = A.x1) < k || (p = A.y1) < M || (y = A.z1) < N))
          if (F.length) {
            var E = (m + w) / 2, R = (_ + p) / 2, B = (b + y) / 2;
            x.push(new r(F[7], E, R, B, w, p, y), new r(F[6], m, R, B, E, p, y), new r(F[5], E, _, B, w, R, y), new r(F[4], m, _, B, E, R, y), new r(F[3], E, R, b, w, p, B), new r(F[2], m, R, b, E, p, B), new r(F[1], E, _, b, w, R, B), new r(F[0], m, _, b, E, R, B)), (C = (d >= B) << 2 | (c >= R) << 1 | f >= E) && (A = x[x.length - 1], x[x.length - 1] = x[x.length - 1 - C], x[x.length - 1 - C] = A);
          } else {
            var T = f - +this._x.call(null, F.data), S = c - +this._y.call(null, F.data), P = d - +this._z.call(null, F.data), D = T * T + S * S + P * P;
            if (D < v) {
              var L = Math.sqrt(v = D);
              k = f - L, M = c - L, N = d - L, I = f + L, O = c + L, z = d + L, g = F.data;
            }
          }
      return g;
    }, l.remove = function(f) {
      if (isNaN(m = +this._x.call(null, f)) || isNaN(_ = +this._y.call(null, f)) || isNaN(b = +this._z.call(null, f)))
        return this;
      var c, d, v, g, m, _, b, w, p, y, A, C, k, M, N, I = this._root, O = this._x0, z = this._y0, x = this._z0, F = this._x1, E = this._y1, R = this._z1;
      if (!I)
        return this;
      if (I.length)
        for (; ; ) {
          if ((A = m >= (w = (O + F) / 2)) ? O = w : F = w, (C = _ >= (p = (z + E) / 2)) ? z = p : E = p, (k = b >= (y = (x + R) / 2)) ? x = y : R = y, c = I, !(I = I[M = k << 2 | C << 1 | A]))
            return this;
          if (!I.length)
            break;
          (c[M + 1 & 7] || c[M + 2 & 7] || c[M + 3 & 7] || c[M + 4 & 7] || c[M + 5 & 7] || c[M + 6 & 7] || c[M + 7 & 7]) && (d = c, N = M);
        }
      for (; I.data !== f; )
        if (v = I, !(I = I.next))
          return this;
      return (g = I.next) && delete I.next, v ? (g ? v.next = g : delete v.next, this) : c ? (g ? c[M] = g : delete c[M], (I = c[0] || c[1] || c[2] || c[3] || c[4] || c[5] || c[6] || c[7]) && I === (c[7] || c[6] || c[5] || c[4] || c[3] || c[2] || c[1] || c[0]) && !I.length && (d ? d[N] = I : this._root = I), this) : (this._root = g, this);
    }, l.removeAll = function(f) {
      for (var c = 0, d = f.length; c < d; ++c)
        this.remove(f[c]);
      return this;
    }, l.root = function() {
      return this._root;
    }, l.size = function() {
      var f = 0;
      return this.visit(function(c) {
        if (!c.length)
          do
            ++f;
          while (c = c.next);
      }), f;
    }, l.visit = function(f) {
      var c, d, v, g, m, _, b, w, p = [], y = this._root;
      for (y && p.push(new r(y, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); c = p.pop(); )
        if (!f(y = c.node, v = c.x0, g = c.y0, m = c.z0, _ = c.x1, b = c.y1, w = c.z1) && y.length) {
          var A = (v + _) / 2, C = (g + b) / 2, k = (m + w) / 2;
          (d = y[7]) && p.push(new r(d, A, C, k, _, b, w)), (d = y[6]) && p.push(new r(d, v, C, k, A, b, w)), (d = y[5]) && p.push(new r(d, A, g, k, _, C, w)), (d = y[4]) && p.push(new r(d, v, g, k, A, C, w)), (d = y[3]) && p.push(new r(d, A, C, m, _, b, k)), (d = y[2]) && p.push(new r(d, v, C, m, A, b, k)), (d = y[1]) && p.push(new r(d, A, g, m, _, C, k)), (d = y[0]) && p.push(new r(d, v, g, m, A, C, k));
        }
      return this;
    }, l.visitAfter = function(f) {
      var c, d = [], v = [];
      for (this._root && d.push(new r(this._root, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); c = d.pop(); ) {
        var g = c.node;
        if (g.length) {
          var m, _ = c.x0, b = c.y0, w = c.z0, p = c.x1, y = c.y1, A = c.z1, C = (_ + p) / 2, k = (b + y) / 2, M = (w + A) / 2;
          (m = g[0]) && d.push(new r(m, _, b, w, C, k, M)), (m = g[1]) && d.push(new r(m, C, b, w, p, k, M)), (m = g[2]) && d.push(new r(m, _, k, w, C, y, M)), (m = g[3]) && d.push(new r(m, C, k, w, p, y, M)), (m = g[4]) && d.push(new r(m, _, b, M, C, k, A)), (m = g[5]) && d.push(new r(m, C, b, M, p, k, A)), (m = g[6]) && d.push(new r(m, _, k, M, C, y, A)), (m = g[7]) && d.push(new r(m, C, k, M, p, y, A));
        }
        v.push(c);
      }
      for (; c = v.pop(); )
        f(c.node, c.x0, c.y0, c.z0, c.x1, c.y1, c.z1);
      return this;
    }, l.x = function(f) {
      return arguments.length ? (this._x = f, this) : this._x;
    }, l.y = function(f) {
      return arguments.length ? (this._y = f, this) : this._y;
    }, l.z = function(f) {
      return arguments.length ? (this._z = f, this) : this._z;
    }, e.octree = s, Object.defineProperty(e, "__esModule", { value: !0 });
  }), function(e, n) {
    typeof exports == "object" && typeof module < "u" ? n(exports, t(), t(), t(), t(), t()) : typeof define == "function" && define.amd ? define(["exports", "d3-binarytree", "d3-quadtree", "d3-octree", "d3-dispatch", "d3-timer"], n) : n((e = typeof globalThis < "u" ? globalThis : e || self).d3 = e.d3 || {}, e.d3, e.d3, e.d3, e.d3, e.d3);
  }(this, function(e, n, r, i, a, o) {
    function s(p) {
      return function() {
        return p;
      };
    }
    function h(p) {
      return 1e-6 * (p() - 0.5);
    }
    function u(p) {
      return p.x + p.vx;
    }
    function l(p) {
      return p.y + p.vy;
    }
    function f(p) {
      return p.z + p.vz;
    }
    function c(p) {
      return p.index;
    }
    function d(p, y) {
      var A = p.get(y);
      if (!A)
        throw new Error("node not found: " + y);
      return A;
    }
    const v = 4294967296;
    function g(p) {
      return p.x;
    }
    function m(p) {
      return p.y;
    }
    function _(p) {
      return p.z;
    }
    var b = Math.PI * (3 - Math.sqrt(5)), w = 20 * Math.PI / (9 + Math.sqrt(221));
    e.forceCenter = function(p, y, A) {
      var C, k = 1;
      function M() {
        var N, I, O = C.length, z = 0, x = 0, F = 0;
        for (N = 0; N < O; ++N)
          z += (I = C[N]).x || 0, x += I.y || 0, F += I.z || 0;
        for (z = (z / O - p) * k, x = (x / O - y) * k, F = (F / O - A) * k, N = 0; N < O; ++N)
          I = C[N], z && (I.x -= z), x && (I.y -= x), F && (I.z -= F);
      }
      return p == null && (p = 0), y == null && (y = 0), A == null && (A = 0), M.initialize = function(N) {
        C = N;
      }, M.x = function(N) {
        return arguments.length ? (p = +N, M) : p;
      }, M.y = function(N) {
        return arguments.length ? (y = +N, M) : y;
      }, M.z = function(N) {
        return arguments.length ? (A = +N, M) : A;
      }, M.strength = function(N) {
        return arguments.length ? (k = +N, M) : k;
      }, M;
    }, e.forceCollide = function(p) {
      var y, A, C, k, M = 1, N = 1;
      function I() {
        for (var x, F, E, R, B, T, S, P, D = y.length, L = 0; L < N; ++L)
          for (F = (A === 1 ? n.binarytree(y, u) : A === 2 ? r.quadtree(y, u, l) : A === 3 ? i.octree(y, u, l, f) : null).visitAfter(O), x = 0; x < D; ++x)
            E = y[x], S = C[E.index], P = S * S, R = E.x + E.vx, A > 1 && (B = E.y + E.vy), A > 2 && (T = E.z + E.vz), F.visit(U);
        function U(Q, G, V, W, q, ie, j) {
          var J = [G, V, W, q, ie, j], St = J[0], Cr = J[1], Ir = J[2], Br = J[A], Fr = J[A + 1], Mr = J[A + 2], ee = Q.data, je = Q.r, Y = S + je;
          if (!ee)
            return St > R + Y || Br < R - Y || A > 1 && (Cr > B + Y || Fr < B - Y) || A > 2 && (Ir > T + Y || Mr < T - Y);
          if (ee.index > E.index) {
            var me = R - ee.x - ee.vx, pe = A > 1 ? B - ee.y - ee.vy : 0, Ae = A > 2 ? T - ee.z - ee.vz : 0, te = me * me + pe * pe + Ae * Ae;
            te < Y * Y && (me === 0 && (te += (me = h(k)) * me), A > 1 && pe === 0 && (te += (pe = h(k)) * pe), A > 2 && Ae === 0 && (te += (Ae = h(k)) * Ae), te = (Y - (te = Math.sqrt(te))) / te * M, E.vx += (me *= te) * (Y = (je *= je) / (P + je)), A > 1 && (E.vy += (pe *= te) * Y), A > 2 && (E.vz += (Ae *= te) * Y), ee.vx -= me * (Y = 1 - Y), A > 1 && (ee.vy -= pe * Y), A > 2 && (ee.vz -= Ae * Y));
          }
        }
      }
      function O(x) {
        if (x.data)
          return x.r = C[x.data.index];
        for (var F = x.r = 0; F < Math.pow(2, A); ++F)
          x[F] && x[F].r > x.r && (x.r = x[F].r);
      }
      function z() {
        if (y) {
          var x, F, E = y.length;
          for (C = new Array(E), x = 0; x < E; ++x)
            F = y[x], C[F.index] = +p(F, x, y);
        }
      }
      return typeof p != "function" && (p = s(p == null ? 1 : +p)), I.initialize = function(x, ...F) {
        y = x, k = F.find((E) => typeof E == "function") || Math.random, A = F.find((E) => [1, 2, 3].includes(E)) || 2, z();
      }, I.iterations = function(x) {
        return arguments.length ? (N = +x, I) : N;
      }, I.strength = function(x) {
        return arguments.length ? (M = +x, I) : M;
      }, I.radius = function(x) {
        return arguments.length ? (p = typeof x == "function" ? x : s(+x), z(), I) : p;
      }, I;
    }, e.forceLink = function(p) {
      var y, A, C, k, M, N, I, O = c, z = function(S) {
        return 1 / Math.min(M[S.source.index], M[S.target.index]);
      }, x = s(30), F = 1;
      function E(S) {
        for (var P = 0, D = p.length; P < F; ++P)
          for (var L, U, Q, G, V, W = 0, q = 0, ie = 0, j = 0; W < D; ++W)
            U = (L = p[W]).source, q = (Q = L.target).x + Q.vx - U.x - U.vx || h(I), k > 1 && (ie = Q.y + Q.vy - U.y - U.vy || h(I)), k > 2 && (j = Q.z + Q.vz - U.z - U.vz || h(I)), q *= G = ((G = Math.sqrt(q * q + ie * ie + j * j)) - A[W]) / G * S * y[W], ie *= G, j *= G, Q.vx -= q * (V = N[W]), k > 1 && (Q.vy -= ie * V), k > 2 && (Q.vz -= j * V), U.vx += q * (V = 1 - V), k > 1 && (U.vy += ie * V), k > 2 && (U.vz += j * V);
      }
      function R() {
        if (C) {
          var S, P, D = C.length, L = p.length, U = new Map(C.map((Q, G) => [O(Q, G, C), Q]));
          for (S = 0, M = new Array(D); S < L; ++S)
            (P = p[S]).index = S, typeof P.source != "object" && (P.source = d(U, P.source)), typeof P.target != "object" && (P.target = d(U, P.target)), M[P.source.index] = (M[P.source.index] || 0) + 1, M[P.target.index] = (M[P.target.index] || 0) + 1;
          for (S = 0, N = new Array(L); S < L; ++S)
            P = p[S], N[S] = M[P.source.index] / (M[P.source.index] + M[P.target.index]);
          y = new Array(L), B(), A = new Array(L), T();
        }
      }
      function B() {
        if (C)
          for (var S = 0, P = p.length; S < P; ++S)
            y[S] = +z(p[S], S, p);
      }
      function T() {
        if (C)
          for (var S = 0, P = p.length; S < P; ++S)
            A[S] = +x(p[S], S, p);
      }
      return p == null && (p = []), E.initialize = function(S, ...P) {
        C = S, I = P.find((D) => typeof D == "function") || Math.random, k = P.find((D) => [1, 2, 3].includes(D)) || 2, R();
      }, E.links = function(S) {
        return arguments.length ? (p = S, R(), E) : p;
      }, E.id = function(S) {
        return arguments.length ? (O = S, E) : O;
      }, E.iterations = function(S) {
        return arguments.length ? (F = +S, E) : F;
      }, E.strength = function(S) {
        return arguments.length ? (z = typeof S == "function" ? S : s(+S), B(), E) : z;
      }, E.distance = function(S) {
        return arguments.length ? (x = typeof S == "function" ? S : s(+S), T(), E) : x;
      }, E;
    }, e.forceManyBody = function() {
      var p, y, A, C, k, M, N = s(-30), I = 1, O = 1 / 0, z = 0.81;
      function x(B) {
        var T, S = p.length, P = (y === 1 ? n.binarytree(p, g) : y === 2 ? r.quadtree(p, g, m) : y === 3 ? i.octree(p, g, m, _) : null).visitAfter(E);
        for (k = B, T = 0; T < S; ++T)
          A = p[T], P.visit(R);
      }
      function F() {
        if (p) {
          var B, T, S = p.length;
          for (M = new Array(S), B = 0; B < S; ++B)
            T = p[B], M[T.index] = +N(T, B, p);
        }
      }
      function E(B) {
        var T, S, P, D, L, U, Q = 0, G = 0, V = B.length;
        if (V) {
          for (P = D = L = U = 0; U < V; ++U)
            (T = B[U]) && (S = Math.abs(T.value)) && (Q += T.value, G += S, P += S * (T.x || 0), D += S * (T.y || 0), L += S * (T.z || 0));
          Q *= Math.sqrt(4 / V), B.x = P / G, y > 1 && (B.y = D / G), y > 2 && (B.z = L / G);
        } else {
          (T = B).x = T.data.x, y > 1 && (T.y = T.data.y), y > 2 && (T.z = T.data.z);
          do
            Q += M[T.data.index];
          while (T = T.next);
        }
        B.value = Q;
      }
      function R(B, T, S, P, D) {
        if (!B.value)
          return !0;
        var L = [S, P, D][y - 1], U = B.x - A.x, Q = y > 1 ? B.y - A.y : 0, G = y > 2 ? B.z - A.z : 0, V = L - T, W = U * U + Q * Q + G * G;
        if (V * V / z < W)
          return W < O && (U === 0 && (W += (U = h(C)) * U), y > 1 && Q === 0 && (W += (Q = h(C)) * Q), y > 2 && G === 0 && (W += (G = h(C)) * G), W < I && (W = Math.sqrt(I * W)), A.vx += U * B.value * k / W, y > 1 && (A.vy += Q * B.value * k / W), y > 2 && (A.vz += G * B.value * k / W)), !0;
        if (!(B.length || W >= O)) {
          (B.data !== A || B.next) && (U === 0 && (W += (U = h(C)) * U), y > 1 && Q === 0 && (W += (Q = h(C)) * Q), y > 2 && G === 0 && (W += (G = h(C)) * G), W < I && (W = Math.sqrt(I * W)));
          do
            B.data !== A && (V = M[B.data.index] * k / W, A.vx += U * V, y > 1 && (A.vy += Q * V), y > 2 && (A.vz += G * V));
          while (B = B.next);
        }
      }
      return x.initialize = function(B, ...T) {
        p = B, C = T.find((S) => typeof S == "function") || Math.random, y = T.find((S) => [1, 2, 3].includes(S)) || 2, F();
      }, x.strength = function(B) {
        return arguments.length ? (N = typeof B == "function" ? B : s(+B), F(), x) : N;
      }, x.distanceMin = function(B) {
        return arguments.length ? (I = B * B, x) : Math.sqrt(I);
      }, x.distanceMax = function(B) {
        return arguments.length ? (O = B * B, x) : Math.sqrt(O);
      }, x.theta = function(B) {
        return arguments.length ? (z = B * B, x) : Math.sqrt(z);
      }, x;
    }, e.forceRadial = function(p, y, A, C) {
      var k, M, N, I, O = s(0.1);
      function z(F) {
        for (var E = 0, R = k.length; E < R; ++E) {
          var B = k[E], T = B.x - y || 1e-6, S = (B.y || 0) - A || 1e-6, P = (B.z || 0) - C || 1e-6, D = Math.sqrt(T * T + S * S + P * P), L = (I[E] - D) * N[E] * F / D;
          B.vx += T * L, M > 1 && (B.vy += S * L), M > 2 && (B.vz += P * L);
        }
      }
      function x() {
        if (k) {
          var F, E = k.length;
          for (N = new Array(E), I = new Array(E), F = 0; F < E; ++F)
            I[F] = +p(k[F], F, k), N[F] = isNaN(I[F]) ? 0 : +O(k[F], F, k);
        }
      }
      return typeof p != "function" && (p = s(+p)), y == null && (y = 0), A == null && (A = 0), C == null && (C = 0), z.initialize = function(F, ...E) {
        k = F, M = E.find((R) => [1, 2, 3].includes(R)) || 2, x();
      }, z.strength = function(F) {
        return arguments.length ? (O = typeof F == "function" ? F : s(+F), x(), z) : O;
      }, z.radius = function(F) {
        return arguments.length ? (p = typeof F == "function" ? F : s(+F), x(), z) : p;
      }, z.x = function(F) {
        return arguments.length ? (y = +F, z) : y;
      }, z.y = function(F) {
        return arguments.length ? (A = +F, z) : A;
      }, z.z = function(F) {
        return arguments.length ? (C = +F, z) : C;
      }, z;
    }, e.forceSimulation = function(p, y) {
      y = y || 2;
      var A, C = Math.min(3, Math.max(1, Math.round(y))), k = 1, M = 1e-3, N = 1 - Math.pow(M, 1 / 300), I = 0, O = 0.6, z = /* @__PURE__ */ new Map(), x = o.timer(R), F = a.dispatch("tick", "end"), E = function() {
        let P = 1;
        return () => (P = (1664525 * P + 1013904223) % v) / v;
      }();
      function R() {
        B(), F.call("tick", A), k < M && (x.stop(), F.call("end", A));
      }
      function B(P) {
        var D, L, U = p.length;
        P === void 0 && (P = 1);
        for (var Q = 0; Q < P; ++Q)
          for (k += (I - k) * N, z.forEach(function(G) {
            G(k);
          }), D = 0; D < U; ++D)
            (L = p[D]).fx == null ? L.x += L.vx *= O : (L.x = L.fx, L.vx = 0), C > 1 && (L.fy == null ? L.y += L.vy *= O : (L.y = L.fy, L.vy = 0)), C > 2 && (L.fz == null ? L.z += L.vz *= O : (L.z = L.fz, L.vz = 0));
        return A;
      }
      function T() {
        for (var P, D = 0, L = p.length; D < L; ++D) {
          if ((P = p[D]).index = D, P.fx != null && (P.x = P.fx), P.fy != null && (P.y = P.fy), P.fz != null && (P.z = P.fz), isNaN(P.x) || C > 1 && isNaN(P.y) || C > 2 && isNaN(P.z)) {
            var U = 10 * (C > 2 ? Math.cbrt(0.5 + D) : C > 1 ? Math.sqrt(0.5 + D) : D), Q = D * b, G = D * w;
            C === 1 ? P.x = U : C === 2 ? (P.x = U * Math.cos(Q), P.y = U * Math.sin(Q)) : (P.x = U * Math.sin(Q) * Math.cos(G), P.y = U * Math.cos(Q), P.z = U * Math.sin(Q) * Math.sin(G));
          }
          (isNaN(P.vx) || C > 1 && isNaN(P.vy) || C > 2 && isNaN(P.vz)) && (P.vx = 0, C > 1 && (P.vy = 0), C > 2 && (P.vz = 0));
        }
      }
      function S(P) {
        return P.initialize && P.initialize(p, E, C), P;
      }
      return p == null && (p = []), T(), A = { tick: B, restart: function() {
        return x.restart(R), A;
      }, stop: function() {
        return x.stop(), A;
      }, numDimensions: function(P) {
        return arguments.length ? (C = Math.min(3, Math.max(1, Math.round(P))), z.forEach(S), A) : C;
      }, nodes: function(P) {
        return arguments.length ? (p = P, T(), z.forEach(S), A) : p;
      }, alpha: function(P) {
        return arguments.length ? (k = +P, A) : k;
      }, alphaMin: function(P) {
        return arguments.length ? (M = +P, A) : M;
      }, alphaDecay: function(P) {
        return arguments.length ? (N = +P, A) : +N;
      }, alphaTarget: function(P) {
        return arguments.length ? (I = +P, A) : I;
      }, velocityDecay: function(P) {
        return arguments.length ? (O = 1 - P, A) : 1 - O;
      }, randomSource: function(P) {
        return arguments.length ? (E = P, z.forEach(S), A) : E;
      }, force: function(P, D) {
        return arguments.length > 1 ? (D == null ? z.delete(P) : z.set(P, S(D)), A) : z.get(P);
      }, find: function() {
        var P, D, L, U, Q, G, V = Array.prototype.slice.call(arguments), W = V.shift() || 0, q = (C > 1 ? V.shift() : null) || 0, ie = (C > 2 ? V.shift() : null) || 0, j = V.shift() || 1 / 0, J = 0, St = p.length;
        for (j *= j, J = 0; J < St; ++J)
          (U = (P = W - (Q = p[J]).x) * P + (D = q - (Q.y || 0)) * D + (L = ie - (Q.z || 0)) * L) < j && (G = Q, j = U);
        return G;
      }, on: function(P, D) {
        return arguments.length > 1 ? (F.on(P, D), A) : F.on(P);
      } };
    }, e.forceX = function(p) {
      var y, A, C, k = s(0.1);
      function M(I) {
        for (var O, z = 0, x = y.length; z < x; ++z)
          (O = y[z]).vx += (C[z] - O.x) * A[z] * I;
      }
      function N() {
        if (y) {
          var I, O = y.length;
          for (A = new Array(O), C = new Array(O), I = 0; I < O; ++I)
            A[I] = isNaN(C[I] = +p(y[I], I, y)) ? 0 : +k(y[I], I, y);
        }
      }
      return typeof p != "function" && (p = s(p == null ? 0 : +p)), M.initialize = function(I) {
        y = I, N();
      }, M.strength = function(I) {
        return arguments.length ? (k = typeof I == "function" ? I : s(+I), N(), M) : k;
      }, M.x = function(I) {
        return arguments.length ? (p = typeof I == "function" ? I : s(+I), N(), M) : p;
      }, M;
    }, e.forceY = function(p) {
      var y, A, C, k = s(0.1);
      function M(I) {
        for (var O, z = 0, x = y.length; z < x; ++z)
          (O = y[z]).vy += (C[z] - O.y) * A[z] * I;
      }
      function N() {
        if (y) {
          var I, O = y.length;
          for (A = new Array(O), C = new Array(O), I = 0; I < O; ++I)
            A[I] = isNaN(C[I] = +p(y[I], I, y)) ? 0 : +k(y[I], I, y);
        }
      }
      return typeof p != "function" && (p = s(p == null ? 0 : +p)), M.initialize = function(I) {
        y = I, N();
      }, M.strength = function(I) {
        return arguments.length ? (k = typeof I == "function" ? I : s(+I), N(), M) : k;
      }, M.y = function(I) {
        return arguments.length ? (p = typeof I == "function" ? I : s(+I), N(), M) : p;
      }, M;
    }, e.forceZ = function(p) {
      var y, A, C, k = s(0.1);
      function M(I) {
        for (var O, z = 0, x = y.length; z < x; ++z)
          (O = y[z]).vz += (C[z] - O.z) * A[z] * I;
      }
      function N() {
        if (y) {
          var I, O = y.length;
          for (A = new Array(O), C = new Array(O), I = 0; I < O; ++I)
            A[I] = isNaN(C[I] = +p(y[I], I, y)) ? 0 : +k(y[I], I, y);
        }
      }
      return typeof p != "function" && (p = s(p == null ? 0 : +p)), M.initialize = function(I) {
        y = I, N();
      }, M.strength = function(I) {
        return arguments.length ? (k = typeof I == "function" ? I : s(+I), N(), M) : k;
      }, M.z = function(I) {
        return arguments.length ? (p = typeof I == "function" ? I : s(+I), N(), M) : p;
      }, M;
    }, Object.defineProperty(e, "__esModule", { value: !0 });
  }), this._handleSetAttribute = (e, n) => {
    let r = e.split("."), i = this;
    for (let a = 0; a < r.length; a++)
      i = i?.[r[a]];
    i?.(n);
  }, self.onmessage = function(e) {
    let n = !1;
    if (e.data.type == "pause")
      this.simulation.stop();
    else if (e.data.type == "resume")
      this.simulation.restart();
    else if (e.data.type == "setAttribute")
      this._handleSetAttribute(e.data.attributeName, e.data.value);
    else if (e.data.type == "start") {
      let r = e.data.positions, i = e.data.edges;
      e.data.use2D && (n = !0);
      let a = [], o = [];
      for (let s = 0; s < r.length / 3; s++) {
        let h = r[s * 3 + 0] * 10, u = r[s * 3 + 1] * 10, l = r[s * 3 + 2] * 10, f = 0;
        a.push({ x: h, y: u, z: l, vz: f, ID: s });
      }
      for (let s = 0; s < i.length / 2; s++) {
        let h = i[s * 2], u = i[s * 2 + 1], l = {
          source: h,
          target: u
        };
        o.push(l);
      }
      this.repulsiveforce = d3.forceManyBody(), this.attractiveforce = d3.forceLink(o), this.centralForce = d3.forceCenter(), this.simulation = d3.forceSimulation(a).numDimensions(n ? 2 : 3).force("charge", this.repulsiveforce).force("link", this.attractiveforce).force("center", centralForce).force("gravity", this.gravityForce).velocityDecay(0.05).on("tick", async () => {
        for (let s = 0; s < a.length; s++) {
          const h = a[s];
          r[s * 3 + 0] = h.x / 10, r[s * 3 + 1] = h.y / 10, n ? r[s * 3 + 2] = 0 : r[s * 3 + 2] = h.z / 10;
        }
        self.postMessage({ type: "update", positions: r });
      }).on("end", () => {
        self.postMessage({ type: "stop" });
      });
    }
  };
}, So = Mo.toString(), Ro = URL.createObjectURL(new Blob([`(${So})()`], { type: "text/javascript" }));
class To {
  constructor({
    network: e = null,
    onUpdate: n = null,
    onStop: r = null,
    onStart: i = null,
    use2D: a = !1
  }) {
    this._network = e, this._onUpdate = n, this._onStop = r, this._onStart = i, this._use2D = a, this._attributes = {
      charge: 0.1
    }, this._layoutWorker = null;
  }
  start() {
    return this._layoutWorker || (this._layoutWorker = new Worker(Ro), this._layoutWorker.onmessage = (e) => {
      e.data.type == "update" ? this._onUpdate?.(e.data) : e.data.type == "stop" ? (this._onStop?.(e.data), this._layoutRunning = !1) : e.data.type == "getAttribute" ? this._handleReturnAttribute(e.data) : console.log("Layout received Unknown msg: ", e);
    }, this._layoutRunning = !0, this._onStart?.(), this._layoutWorker.postMessage({
      type: "start",
      // network: this.network,
      // nodes:this._network.nodes,
      positions: this._network.positions,
      edges: this._network.indexedEdges,
      use2D: this._use2D
    })), this;
  }
  restart() {
    return this.stop(), this.start(), this;
  }
  stop() {
    return this._layoutRunning && this._onStop?.(), this._layoutWorker?.terminate(), this._layoutRunning = !1, delete this._layoutWorker, this._layoutWorker = null, this;
  }
  resume() {
    return this.start(), this._layoutRunning || this._onStart?.(), this._layoutWorker.postMessage({ type: "resume" }), this._layoutRunning = !0, this;
  }
  pause() {
    return this._layoutWorker.postMessage({ type: "pause" }), this._layoutRunning = !1, this._onStop?.(), this;
  }
  onUpdate(e) {
    return this._onUpdate = e, this;
  }
  onStop(e) {
    return this._onStop = e, this;
  }
  onStart(e) {
    return this._onStart = e, this;
  }
  isRunning() {
    return this._layoutRunning;
  }
  cleanup() {
    this.stop();
  }
  _handleGetAttribute() {
  }
  setAttribute(e, n) {
    return this._layoutWorker.postMessage({
      type: "setAttribute",
      attributeName: e,
      value: n
    }), this;
  }
  groups(e) {
    return this.setAttribute("groups", e);
  }
  alpha(e) {
    return this.setAttribute("alpha", e);
  }
  alphaDecay(e) {
    return this.setAttribute("alphaDecay", e);
  }
  alphaTarget(e) {
    return this.setAttribute("alphaTarget", e);
  }
  velocityDecay(e) {
    return this.setAttribute("velocityDecay", e);
  }
}
let Nn = (
  /*glsl*/
  `
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
 
uniform float globalSizeScale;
uniform float globalSizeBase;
uniform float globalWidthScale;
uniform float globalWidthBase;

uniform float globalOpacityScale;
uniform float globalOpacityBase;

attribute vec3 fromVertex;
attribute vec3 toVertex;
attribute vec2 vertexType;
// 0,1:  0.0, 1.0, // source, top
// 0,0:  0.0, 0.0, // source, bottom
// 1,1:  1.0, 1.0, // target, top
// 1,0:  1.0, 0.0, // target, bottom

attribute vec4 fromColor;
attribute vec4 toColor;
attribute float fromSize;
attribute float toSize;
attribute vec4 encodedIndex;

varying vec4 vColor;
varying vec3 vOffset;
varying vec4 vEncodedIndex;


//varying float vZComponent;

void main(void){
	vColor = (fromColor)*vertexType.x + (toColor)*(1.0-vertexType.x);
	vColor.w = clamp(globalOpacityBase+globalOpacityScale*vColor.w,0.0,1.0);
	float updatedFromSize = globalSizeScale*fromSize+globalSizeBase;
	float updatedToSize = globalSizeScale*toSize+globalSizeBase;

	float width = globalWidthBase+globalWidthScale*((updatedFromSize)*vertexType.x + (updatedToSize)*(1.0-vertexType.x));
	vEncodedIndex = encodedIndex;
	//vZComponent = viewVertex.z;


	vec3 vertexCenter = fromVertex.xyz*vertexType.x + toVertex.xyz*(1.0-vertexType.x);
	vec3 destinationVertexCenter = fromVertex.xyz*(1.0-vertexType.x) + toVertex.xyz*vertexType.x;
	
	vec3 displacement = (viewMatrix*vec4((destinationVertexCenter-vertexCenter),0.0)).xyz;
	vec3 perpendicularVector = normalize(vec3(-displacement.y, displacement.x, 0.0));
	vec3 offset = width*(vertexType.x-0.5)*(vertexType.y-0.5)*4.0*1.5*perpendicularVector;
	
	vec4 viewVertex = viewMatrix * vec4(vertexCenter.xyz,1.0)+vec4(offset,0.0);
	float displacementLength = length(displacement);
	vOffset = vec3(vertexType.x,updatedToSize/displacementLength*1.5,updatedFromSize/displacementLength*1.5);
	

	vec4 temp_pos = projectionMatrix*viewVertex;
	// vec4 eye_vec = vec4(0.0,0.0,0.0,0);
	// float dist = length(eye_vec);
	// vec4 lookat = eye_vec - temp_pos;
	// vec4 dir = temp_pos - eye_vec;
	// vec4 center = normalize(-eye_vec);
	// vec4 proj = dot(temp_pos, normalize(-lookat)) * normalize(-lookat);
	// vec4 c = temp_pos - proj;
	// float magnitude = 1.0-acos(dot(normalize(-eye_vec), normalize(temp_pos)));

	// c = length(c) * magnitude * normalize(c);
	// vec4 dir2 = normalize(c-lookat);
	// temp_pos.xy = (dir2).xy;
	// temp_pos.z = 0.0;
	// temp_pos.w = 1.0;


	gl_Position = temp_pos;
	
}
`
), On = (
  /*glsl*/
  `
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
 
uniform float globalSizeScale;
uniform float globalSizeBase;
uniform float globalWidthScale;
uniform float globalWidthBase;

uniform float globalOpacityScale;
uniform float globalOpacityBase;

attribute vec3 fromVertex;
attribute vec3 toVertex;
attribute vec2 vertexType;
// 0,1:  0.0, 1.0, // source, top
// 0,0:  0.0, 0.0, // source, bottom
// 1,1:  1.0, 1.0, // target, top
// 1,0:  1.0, 0.0, // target, bottom

attribute vec4 fromColor;
attribute vec4 toColor;
attribute float fromSize;
attribute float toSize;
attribute vec4 encodedIndex;

varying vec4 vColor;
varying vec3 vOffset;
varying vec4 vEncodedIndex;


vec2 hyperbolicNormFactor(vec2 vertex, float scaling){
	vec2 pos = vertex.xy;
	float r = length(pos.xy);
	// //polar
	// vec2 normFactor = (r+scaling)*vec2(1.0,1.0);
	// catersian
	vec2 normFactor = sqrt(vertex.xy*vertex.xy+scaling*scaling);
	return normFactor;
}

//varying float vZComponent;

void main(void){
	vColor = (fromColor)*vertexType.x + (toColor)*(1.0-vertexType.x);
	vColor.w = clamp(globalOpacityBase+globalOpacityScale*vColor.w,0.0,1.0);
	float updatedFromSize = globalSizeScale*fromSize+globalSizeBase;
	float updatedToSize = globalSizeScale*toSize+globalSizeBase;

	float width = globalWidthBase+globalWidthScale*((updatedFromSize)*vertexType.x + (updatedToSize)*(1.0-vertexType.x));
	vEncodedIndex = encodedIndex;
	//vZComponent = viewVertex.z;

	float scaling = -viewMatrix[3][2];
	
	vec4 fromVertexView = viewMatrix * vec4(fromVertex.xyz,1.0);
	vec4 toVertexView = viewMatrix * vec4(toVertex.xyz,1.0);

	vec2 normFactorFrom = hyperbolicNormFactor(fromVertexView.xy, scaling);
	vec2 normFactorTo = hyperbolicNormFactor(toVertexView.xy, scaling);
	
	vec3 vertexCenter = fromVertexView.xyz*vertexType.x + toVertexView.xyz*(1.0-vertexType.x);
	vec3 destinationVertexCenter = fromVertexView.xyz*(1.0-vertexType.x) + toVertexView.xyz*vertexType.x;

	vec2 normFactorCenter = hyperbolicNormFactor(vertexCenter.xy, scaling);
	vec2 normFactorDestinationCenter = hyperbolicNormFactor(destinationVertexCenter.xy, scaling);

	fromVertexView.xy = fromVertexView.xy/normFactorFrom/vec2(projectionMatrix[0][0],projectionMatrix[1][1]);
	toVertexView.xy = toVertexView.xy/normFactorTo/vec2(projectionMatrix[0][0],projectionMatrix[1][1]);
	vertexCenter.xy = vertexCenter.xy/normFactorCenter/vec2(projectionMatrix[0][0],projectionMatrix[1][1]);
	destinationVertexCenter.xy = destinationVertexCenter.xy/normFactorDestinationCenter/vec2(projectionMatrix[0][0],projectionMatrix[1][1]);

	vec3 displacement = vec4((destinationVertexCenter-vertexCenter),0.0).xyz;
	vec3 perpendicularVector = normalize(vec3(-displacement.y, displacement.x, 0.0));
	vec3 offset = width*(vertexType.x-0.5)*(vertexType.y-0.5)*4.0*1.0*perpendicularVector/length(normFactorCenter)*scaling;
	
	vec4 viewVertex = vec4(vertexCenter.xyz,1.0)+vec4(offset,0.0);
	float displacementLength = length(displacement);
	// vOffset = vec3(vertexType.x,updatedToSize/displacementLength*1.0,updatedFromSize/displacementLength*1.0);
	vOffset = vec3(0.0,0.0,0.0);
	viewVertex.zw = vec2(0.0,1.0);
	vec4 temp_pos = projectionMatrix*viewVertex;
	gl_Position = temp_pos;
}
`
), No = (
  /*glsl*/
  `
#ifdef GL_ES
	precision highp float;
#endif
//uniform vec2 nearFar;
varying vec4 vEncodedIndex;
varying vec4 vColor;
varying vec3 vOffset;
//varying float vZComponent;
//gl_DepthRange.near)/gl_DepthRange.diff
void main(){
	//float w = (-vZComponent-nearFar[0])/(nearFar[1]-nearFar[0]);
	if(vOffset.x<vOffset.y || vOffset.x>(1.0-vOffset.z)){
		discard;
	}

	// gl_FragColor = vec4(vOffset.x,vOffset.x,0,1.0);//vec4(vColor.xyz,globalOpacity*vColor.w);
	gl_FragColor = vColor;
}
`
), Oo = (
  /*glsl*/
  `
#ifdef GL_ES
	precision highp float;
#endif
//uniform vec2 nearFar;
varying vec4 vEncodedIndex;
varying vec4 vColor;
varying vec3 vOffset;
//varying float vZComponent;
//gl_DepthRange.near)/gl_DepthRange.diff
void main(){

	if(vOffset.x<vOffset.y*1.1 || vOffset.x>(1.0-vOffset.z*1.1) || (vEncodedIndex.x+vEncodedIndex.y+vEncodedIndex.z+vEncodedIndex.w)<=0.0){
		discard;
	}
	//float w = (-vZComponent-nearFar[0])/(nearFar[1]-nearFar[0]);
	gl_FragColor = vEncodedIndex;
	
}
`
), Po = (
  /*glsl*/
  `
uniform mat4 projectionViewMatrix;
uniform float globalOpacityScale;
uniform float globalOpacityBase;

attribute vec3 vertex;
attribute vec4 color;


varying vec4 vColor;
varying vec4 vEncodedIndex;

//varying float vZComponent;

void main(void){
	vColor = color;
	vColor.w = clamp(globalOpacityBase+globalOpacityScale*vColor.w,0.0,1.0);
	//vZComponent = viewVertex.z;
	gl_Position =   projectionViewMatrix * vec4(vertex,1.0);
}
`
), zo = (
  /*glsl*/
  `
uniform mat4 projectionViewMatrix;
uniform float globalOpacityScale;
uniform float globalOpacityBase;

attribute vec3 vertex;
attribute vec4 color;


varying vec4 vColor;
varying vec4 vEncodedIndex;

//varying float vZComponent;

void main(void){
	vColor = color;
	vColor.w = clamp(globalOpacityBase+globalOpacityScale*vColor.w,0.0,1.0);
	//vZComponent = viewVertex.z;

	vec4 temp_pos = projectionViewMatrix * vec4(vertex,1.0);
	vec4 eye_vec = vec4(0.0,0.0,1.0,0);
	float dist = length(eye_vec);
	vec4 lookat = eye_vec - temp_pos;
	vec4 dir = temp_pos - eye_vec;
	vec4 center = normalize(-eye_vec);
	vec4 proj = dot(temp_pos, normalize(-lookat)) * normalize(-lookat);
	vec4 c = temp_pos - proj;
	float magnitude = 1.0-acos(dot(normalize(-eye_vec), normalize(temp_pos)));

	c = length(c) * magnitude * normalize(c);
	vec4 dir2 = normalize(c-lookat);
	temp_pos.xy = (dir2).xy;
	temp_pos.z = 0.0;
	temp_pos.w = 1.0;
	gl_Position = temp_pos;
}
`
), Do = (
  /*glsl*/
  `
#ifdef GL_ES
	precision highp float;
#endif
//uniform vec2 nearFar;
varying vec4 vColor;
//varying float vZComponent;
//gl_DepthRange.near)/gl_DepthRange.diff
void main(){
	//float w = (-vZComponent-nearFar[0])/(nearFar[1]-nearFar[0]);
	gl_FragColor = vColor;
	// gl_FragColor = vec4(vEncodedIndex.x/10,0,0,1.0);
}

`
), zt = (
  /*glsl*/
  `
// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat3 normalMatrix;


// attribute vec4 vertex;
// attribute vec3 normal;
// attribute vec3 position;
// attribute vec3 color;
// attribute float size;
// attribute float Opacity;

// varying vec3 vNormal;
// varying vec3 vEye;

// varying vec3 vColor;
// varying float vSize;
// varying float vOpacity;

// void main(void){
// 	vec4 viewVertex = viewMatrix * (vertex*vec4(vec3(size),1.0) + vec4(position,0.0));
// 	vNormal = normalMatrix * normal;
// 	vEye = -vec3(viewVertex);
// 	vOpacity = Opacity;
// 	vColor = color;
// 	gl_Position =   projectionMatrix * viewVertex;
// }

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

uniform float globalOpacityScale;
uniform float globalSizeScale;
uniform float globalOutlineWidthScale;

uniform float globalOpacityBase;
uniform float globalSizeBase;
uniform float globalOutlineWidthBase;

attribute vec2 vertex;
// attribute vec3 normal;
attribute vec3 position;
attribute vec4 color;
attribute float size;
attribute float outlineWidth;
attribute vec4 outlineColor;
attribute vec4 encodedIndex;

varying vec3 vNormal;
varying vec3 vEye;
varying vec4 vColor;
varying vec2 vOffset;
varying float vSize;
varying vec4 vEncodedIndex;
varying float vOutlineThreshold;
varying vec4 vOutlineColor;
varying vec4 vPosition;

void main(void){
	float BoxCorrection = 1.5;
	vec2 offset = vertex;
	float updatedSize = globalSizeScale*size+globalSizeBase;
	float updatedOutlineWidth = globalOutlineWidthScale*outlineWidth+globalOutlineWidthBase;
	float fullSize = updatedSize + updatedOutlineWidth;
	// vec4 viewCenters = viewMatrix*vec4(position,1);
	// vec3 viewCenters = position;
	// fragCenter = viewCenters
	// float scalingFactor = 1.0 / abs(centers.x)*0.001;
	// offset*=scalingFactor;
	vec3 cameraRight = normalize(vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]));
	vec3 cameraUp = normalize(vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]));

	// viewCenters.xy += offset*updatedSize*CameraRight_worldspace;
	
	vec4 viewCenters = viewMatrix*vec4(position+BoxCorrection*fullSize*(cameraRight*offset.x + cameraUp*offset.y),1.0);
	vNormal = vec3(0.0,0.0,1.0); //normalMatrix * normal;
	vEye = -vec3(offset,0.0);
	vEncodedIndex = encodedIndex;
	vColor = color;
	vColor.w = clamp(globalOpacityBase+globalOpacityScale*vColor.w,0.0,1.0);
	vOutlineColor.w = clamp(globalOpacityBase+globalOpacityScale*vOutlineColor.w,0.0,1.0);
	vOffset = vertex;
	vSize = updatedSize;
	vOutlineThreshold = updatedOutlineWidth/fullSize;

	vOutlineColor = outlineColor;
	vPosition = projectionMatrix * viewCenters;

	// vec4 temp_pos = vPosition;
	// vec4 eye_vec = vec4(0.0,0.0,0.0,0);
	// float dist = length(eye_vec);
	// vec4 lookat = eye_vec - temp_pos;
	// vec4 dir = temp_pos - eye_vec;
	// vec4 center = normalize(-eye_vec);
	// vec4 proj = dot(temp_pos, normalize(-lookat)) * normalize(-lookat);
	// vec4 c = temp_pos - proj;
	// float magnitude = 1.0-acos(dot(normalize(-eye_vec), normalize(temp_pos)));

	// c = length(c) * magnitude * normalize(c);
	// vec4 dir2 = normalize(c-lookat);
	// vPosition.xy = (dir2).xy;
	// vPosition.z = 0.0;
	// vPosition.w = 1.0;
	gl_Position = vPosition;
}
`
), Dt = (
  /*glsl*/
  `
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

uniform float globalOpacityScale;
uniform float globalSizeScale;
uniform float globalOutlineWidthScale;

uniform float globalOpacityBase;
uniform float globalSizeBase;
uniform float globalOutlineWidthBase;

attribute vec2 vertex;
// attribute vec3 normal;
attribute vec3 position;
attribute vec4 color;
attribute float size;
attribute float outlineWidth;
attribute vec4 outlineColor;
attribute vec4 encodedIndex;

varying vec3 vNormal;
varying vec3 vEye;
varying vec4 vColor;
varying vec2 vOffset;
varying float vSize;
varying vec4 vEncodedIndex;
varying float vOutlineThreshold;
varying vec4 vOutlineColor;
varying vec4 vPosition;

vec2 hyperbolicNormFactor(vec2 vertex, float scaling){
	vec2 pos = vertex.xy;
	float r = length(pos.xy);
	// //polar
	// vec2 normFactor = (r+scaling)*vec2(1.0,1.0);
	// catersian
	vec2 normFactor = sqrt(vertex.xy*vertex.xy+scaling*scaling);
	return normFactor;
}

void main(void){
	float BoxCorrection = 1.5;
	vec2 offset = vertex;
	float updatedSize = globalSizeScale*size+globalSizeBase;
	float updatedOutlineWidth = globalOutlineWidthScale*outlineWidth+globalOutlineWidthBase;
	float fullSize = updatedSize + updatedOutlineWidth;
	// vec4 viewCenters = viewMatrix*vec4(position,1);
	// vec3 viewCenters = position;
	// fragCenter = viewCenters
	// float scalingFactor = 1.0 / abs(centers.x)*0.001;
	// offset*=scalingFactor;
	vec3 cameraRight = normalize(vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]));
	vec3 cameraUp = normalize(vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]));

	// viewCenters.xy += offset*updatedSize*CameraRight_worldspace;
	


	// temp_pos.z = 0.0;
	// temp_pos.w = 1.0;



	vec4 viewCenters = viewMatrix*vec4(position.xyz,1.0);
	float scaling = -viewMatrix[3][2];
	vec4 temp_pos = viewCenters;
	
	vec2 normFactor = hyperbolicNormFactor(viewCenters.xy, scaling);
	// catersian
	// vec2 normFactor = sqrt(temp_pos.xy*temp_pos.xy+scaling*scaling);
	temp_pos.xy = temp_pos.xy/normFactor;

	viewCenters.xy = temp_pos.xy/vec2(projectionMatrix[0][0],projectionMatrix[1][1]);
	viewCenters.xy+=BoxCorrection*fullSize*offset.xy/length(normFactor)*scaling;
	

	vNormal = vec3(0.0,0.0,1.0); //normalMatrix * normal;
	vEye = -vec3(offset,0.0);
	vEncodedIndex = encodedIndex;
	vColor = color;
	vColor.w = clamp(globalOpacityBase+globalOpacityScale*vColor.w,0.0,1.0);
	vOutlineColor.w = clamp(globalOpacityBase+globalOpacityScale*vOutlineColor.w,0.0,1.0);
	vOffset = vertex;
	vSize = updatedSize;
	vOutlineThreshold = updatedOutlineWidth/fullSize;

	vOutlineColor = outlineColor;
	vPosition = projectionMatrix * viewCenters;

	gl_Position = vPosition;
}
`
), Lo = (
  /*glsl*/
  `// #ifdef GL_ES
// 	precision highp float;
// #endif

precision mediump float;
varying vec4 vColor;
varying vec4 vEncodedIndex;
varying vec3 vNormal;
varying vec3 vEye;
varying float vSize;
varying vec2 vOffset;
varying float vOutlineThreshold;
varying vec4 vOutlineColor;
varying vec4 vPosition;



void main(){
	// const vec3 lightDirection = vec3(0.577350269,0.577350269,0.577350269);
	// const float ambientFactor = 0.6;
	
	// vec3 normal = normalize(vNormal);
	// vec3 eye = normalize(vEye);
	
	// //Ambient+Diffuse
	// float cosTheta = max(dot(lightDirection,normal),0.0);
	// vec3 newColor = vColor*(ambientFactor+cosTheta);
	
	// //Specular
	// vec3 reflection = reflect(-lightDirection, normal);
	// float eyeDotReflection = max(dot(eye, reflection), 0.0);
	// newColor +=  vec3(0.5)* pow(eyeDotReflection, 60.0);
	
	// gl_FragColor = vec4(newColor,vOpacity);
	// gl_FragColor = vec4(eye,Opacity);
	//gl_FragData[0] = vec4(newColor,Opacity);

// Renaming variables passed from the Vertex Shader

	// vec3 cameraPos;
	// vec3 cameraNormal;

	// float lensqr = dot(vOffset, vOffset);

	// if(lensqr > 1.0)
	// 		discard;
		
	// cameraNormal = vec3(vOffset, sqrt(1.0 - lensqr));
	// cameraPos = (cameraNormal * size) + cameraSpherePos;

	// float len = length(point);
	// // VTK Fake Spheres
	// float radius = 1.;
	// if(len > radius)
	// 		discard;
	// vec3 normalizedPoint = normalize(vec3(point.xy, sqrt(1. - len)));
	// vec3 direction = normalize(vec3(1., 1., 1.));
	// float df2 = max(0, dot(direction, normalizedPoint));
	// float sf2 = pow(df2, 90);
	// fragOutput0 = vec4(max((df2+0.3) * color, sf2 * vec3(1)), 1);

	// fragOutput1 = vec4(vertexVC.xyz, 1.0);
	// fragOutput2 = vec4(normalVCVSOutput, 1.0);
	
	float lensqr = dot(vOffset, vOffset);

	if(lensqr > 1.0)
		discard;
	

	vec3 normalizedPoint = normalize(vec3(vOffset.xy, sqrt(1. - lensqr)));
	const vec3 lightDirection = vec3(0.577350269,0.577350269,0.577350269);
	const float ambientFactor = 0.6;
	
	vec3 normal = normalizedPoint;
	vec3 eye = normalize(vEye);
	
	//Ambient+Diffuse
	float cosTheta = max(dot(lightDirection,normal),0.0);
	vec3 newColor = vColor.xyz*(ambientFactor+cosTheta);
	
	//Specular
	vec3 reflection = reflect(-lightDirection, normal);
	float eyeDotReflection = max(dot(eye, reflection), 0.0);
	newColor +=  vec3(0.5)* pow(eyeDotReflection, 60.0);
	
	
	
	if(lensqr < 1.0-vOutlineThreshold){
		// gl_FragColor = vec4(vColor,vOpacity)
		gl_FragColor = vec4(newColor,vColor.w);;
	}else{
		gl_FragColor = vec4(vOutlineColor.xyz,vOutlineColor.w);
	}
	// gl_FragDepthEXT = 0.5; 
}
`
), Uo = (
  /*glsl*/
  `
// #ifdef GL_ES
// 	precision highp float;
// #endif

precision mediump float;
varying vec4 vColor;
varying vec4 vEncodedIndex;
varying vec3 vNormal;
varying vec3 vEye;
varying float vSize;
varying vec2 vOffset;
varying float vOutlineThreshold;
varying vec4 vOutlineColor;

void main(){
	float lensqr = dot(vOffset, vOffset);

	if(lensqr > 1.0)
			discard;
	
	gl_FragColor = vEncodedIndex;
}
`
), Qo = (
  /*glsl*/
  `
// #ifdef GL_ES
// 	precision highp float;
// #endif

precision mediump float;
varying vec4 vColor;
varying vec4 vEncodedIndex;
varying vec3 vNormal;
varying vec3 vEye;
varying float vSize;
varying vec2 vOffset;
varying float vOutlineThreshold;
varying vec4 vOutlineColor;
varying vec4 vPosition;



void main(){
	
	float lensqr = dot(vOffset, vOffset);

	if(lensqr > 1.0)
			discard;
	
	if(lensqr < 1.0-vOutlineThreshold){
		// gl_FragColor = vec4(vColor,vOpacity)
		gl_FragColor = vColor;
	}else{
		gl_FragColor = vOutlineColor;
	}
	// gl_FragDepthEXT = 0.5; 
}
`
);
var lt = {}, wt = {}, Xe = {};
Object.defineProperty(Xe, "__esModule", {
  value: !0
});
var Go = function() {
  function t(e, n) {
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }
  return function(e, n, r) {
    return n && t(e.prototype, n), r && t(e, r), e;
  };
}();
function Vo(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var Pn = Xe.LinkedList = function() {
  function t() {
    Vo(this, t), this.length = 0, this.first = null, this.last = null;
  }
  return Go(t, [{
    key: "forEach",
    value: function(n, r) {
      for (var i = this.first, a = this.length, o = 0; o < a; o++)
        n.call(r, i, o), i = i.next;
    }
  }, {
    key: "at",
    value: function(n) {
      if (!(n >= 0 && n < this.length))
        return null;
      for (var r = this.first; n--; )
        r = r.next;
      return r;
    }
  }, {
    key: "randomNode",
    value: function() {
      var n = Math.floor(Math.random() * this.length);
      return this.at(n);
    }
  }, {
    key: "toArray",
    value: function() {
      for (var n = [], r = this.first, i = this.length; i--; )
        n.push(r.data || r), r = r.next;
      return n;
    }
  }]), t;
}();
Pn.prototype.each = Pn.prototype.forEach;
Object.defineProperty(wt, "__esModule", {
  value: !0
});
wt.CircularLinkedList = void 0;
var Wo = function() {
  function t(e, n) {
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }
  return function(e, n, r) {
    return n && t(e.prototype, n), r && t(e, r), e;
  };
}(), _r = Xe;
function Ho(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Yo(t, e) {
  if (!t)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e && (typeof e == "object" || typeof e == "function") ? e : t;
}
function qo(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
var zn = wt.CircularLinkedList = function(t) {
  qo(e, t);
  function e() {
    return Ho(this, e), Yo(this, Object.getPrototypeOf(e).apply(this, arguments));
  }
  return Wo(e, [{
    key: "append",
    value: function(r) {
      this.first === null ? (r.prev = r, r.next = r, this.first = r, this.last = r) : (r.prev = this.last, r.next = this.first, this.first.prev = r, this.last.next = r, this.last = r), this.length++;
    }
  }, {
    key: "prepend",
    value: function(r) {
      if (this.first === null) {
        this.append(r);
        return;
      } else
        r.prev = this.last, r.next = this.first, this.first.prev = r, this.last.next = r, this.first = r;
      this.length++;
    }
  }, {
    key: "insertAfter",
    value: function(r, i) {
      i.prev = r, i.next = r.next, r.next.prev = i, r.next = i, i.prev === this.last && (this.last = i), this.length++;
    }
  }, {
    key: "insertBefore",
    value: function(r, i) {
      i.prev = r.prev, i.next = r, r.prev.next = i, r.prev = i, i.next === this.first && (this.first = i), this.length++;
    }
  }, {
    key: "remove",
    value: function(r) {
      this.length > 1 ? (r.prev.next = r.next, r.next.prev = r.prev, r === this.first && (this.first = r.next), r === this.last && (this.last = r.prev)) : (this.first = null, this.last = null), r.prev = null, r.next = null, this.length--;
    }
  }, {
    key: "withData",
    value: function(r) {
      for (var i = this.first, a = this.last, o = Math.ceil(this.length / 2); o--; ) {
        if (i.data === r)
          return i;
        if (a.data === r)
          return a;
        i = i.next, a = a.prev;
      }
      return null;
    }
  }]), e;
}(_r.LinkedList);
zn.fromArray = function(t, e) {
  for (var n = new zn(), r = t.length; r--; )
    n.prepend(e ? new _r.LinkedList.Node(t[r]) : t[r]);
  return n;
};
var Te = {}, ce = {};
Object.defineProperty(ce, "__esModule", {
  value: !0
});
ce.PRECISION = 1e-6;
var Ne = {}, Oe = {}, Dn;
function Fe() {
  if (Dn)
    return Oe;
  Dn = 1, Object.defineProperty(Oe, "__esModule", {
    value: !0
  }), Oe.Matrix = void 0;
  var t = function() {
    function a(o, s) {
      for (var h = 0; h < s.length; h++) {
        var u = s[h];
        u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(o, u.key, u);
      }
    }
    return function(o, s, h) {
      return s && a(o.prototype, s), h && a(o, h), o;
    };
  }(), e = ce, n = ve();
  function r(a, o) {
    if (!(a instanceof o))
      throw new TypeError("Cannot call a class as a function");
  }
  var i = Oe.Matrix = function() {
    function a(o) {
      r(this, a), this.setElements(o);
    }
    return t(a, [{
      key: "e",
      value: function(s, h) {
        return s < 1 || s > this.elements.length || h < 1 || h > this.elements[0].length ? null : this.elements[s - 1][h - 1];
      }
    }, {
      key: "row",
      value: function(s) {
        return s > this.elements.length ? null : new n.Vector(this.elements[s - 1]);
      }
    }, {
      key: "col",
      value: function(s) {
        if (this.elements.length === 0 || s > this.elements[0].length)
          return null;
        for (var h = [], u = this.elements.length, l = 0; l < u; l++)
          h.push(this.elements[l][s - 1]);
        return new n.Vector(h);
      }
    }, {
      key: "dimensions",
      value: function() {
        var s = this.elements.length === 0 ? 0 : this.elements[0].length;
        return { rows: this.elements.length, cols: s };
      }
    }, {
      key: "rows",
      value: function() {
        return this.elements.length;
      }
    }, {
      key: "cols",
      value: function() {
        return this.elements.length === 0 ? 0 : this.elements[0].length;
      }
    }, {
      key: "eql",
      value: function(s) {
        var h = s.elements || s;
        if ((!h[0] || typeof h[0][0] > "u") && (h = new a(h).elements), this.elements.length === 0 || h.length === 0)
          return this.elements.length === h.length;
        if (this.elements.length !== h.length || this.elements[0].length !== h[0].length)
          return !1;
        for (var u = this.elements.length, l = this.elements[0].length, f; u--; )
          for (f = l; f--; )
            if (Math.abs(this.elements[u][f] - h[u][f]) > e.PRECISION)
              return !1;
        return !0;
      }
    }, {
      key: "dup",
      value: function() {
        return new a(this.elements);
      }
    }, {
      key: "map",
      value: function(s, h) {
        if (this.elements.length === 0)
          return new a([]);
        for (var u = [], l = this.elements.length, f = this.elements[0].length, c; l--; )
          for (c = f, u[l] = []; c--; )
            u[l][c] = s.call(h, this.elements[l][c], l + 1, c + 1);
        return new a(u);
      }
    }, {
      key: "isSameSizeAs",
      value: function(s) {
        var h = s.elements || s;
        return typeof h[0][0] > "u" && (h = new a(h).elements), this.elements.length === 0 ? h.length === 0 : this.elements.length === h.length && this.elements[0].length === h[0].length;
      }
    }, {
      key: "add",
      value: function(s) {
        if (this.elements.length === 0)
          return this.map(function(u) {
            return u;
          });
        var h = s.elements || s;
        return typeof h[0][0] > "u" && (h = new a(h).elements), this.isSameSizeAs(h) ? this.map(function(u, l, f) {
          return u + h[l - 1][f - 1];
        }) : null;
      }
    }, {
      key: "subtract",
      value: function(s) {
        if (this.elements.length === 0)
          return this.map(function(u) {
            return u;
          });
        var h = s.elements || s;
        return typeof h[0][0] > "u" && (h = new a(h).elements), this.isSameSizeAs(h) ? this.map(function(u, l, f) {
          return u - h[l - 1][f - 1];
        }) : null;
      }
    }, {
      key: "canMultiplyFromLeft",
      value: function(s) {
        if (this.elements.length === 0)
          return !1;
        var h = s.elements || s;
        return typeof h[0][0] > "u" && (h = new a(h).elements), this.elements[0].length === h.length;
      }
    }, {
      key: "multiply",
      value: function(s) {
        if (this.elements.length === 0)
          return null;
        if (!s.elements)
          return this.map(function(_) {
            return _ * s;
          });
        var h = !!s.modulus, m = s.elements || s;
        if (typeof m[0][0] > "u" && (m = new a(m).elements), !this.canMultiplyFromLeft(m))
          return null;
        for (var u = this.elements.length, l = m[0].length, f, c = this.elements[0].length, d, v = [], g; u--; )
          for (f = l, v[u] = []; f--; ) {
            for (d = c, g = 0; d--; )
              g += this.elements[u][d] * m[d][f];
            v[u][f] = g;
          }
        var m = new a(v);
        return h ? m.col(1) : m;
      }
    }, {
      key: "minor",
      value: function(s, h, u, l) {
        if (this.elements.length === 0)
          return null;
        for (var f = [], c = u, d, v, g, m = this.elements.length, _ = this.elements[0].length; c--; )
          for (d = u - c - 1, f[d] = [], v = l; v--; )
            g = l - v - 1, f[d][g] = this.elements[(s + d - 1) % m][(h + g - 1) % _];
        return new a(f);
      }
    }, {
      key: "transpose",
      value: function() {
        if (this.elements.length === 0)
          return new a([]);
        for (var s = this.elements.length, f, h = this.elements[0].length, u, l = [], f = h; f--; )
          for (u = s, l[f] = []; u--; )
            l[f][u] = this.elements[u][f];
        return new a(l);
      }
    }, {
      key: "isSquare",
      value: function() {
        var s = this.elements.length === 0 ? 0 : this.elements[0].length;
        return this.elements.length === s;
      }
    }, {
      key: "max",
      value: function() {
        if (this.elements.length === 0)
          return null;
        for (var s = 0, h = this.elements.length, u = this.elements[0].length, l; h--; )
          for (l = u; l--; )
            Math.abs(this.elements[h][l]) > Math.abs(s) && (s = this.elements[h][l]);
        return s;
      }
    }, {
      key: "indexOf",
      value: function(s) {
        if (this.elements.length === 0)
          return null;
        var h = this.elements.length, u, l = this.elements[0].length, f;
        for (u = 0; u < h; u++)
          for (f = 0; f < l; f++)
            if (this.elements[u][f] === s)
              return {
                i: u + 1,
                j: f + 1
              };
        return null;
      }
    }, {
      key: "diagonal",
      value: function() {
        if (!this.isSquare)
          return null;
        for (var s = [], h = this.elements.length, u = 0; u < h; u++)
          s.push(this.elements[u][u]);
        return new n.Vector(s);
      }
    }, {
      key: "toRightTriangular",
      value: function() {
        if (this.elements.length === 0)
          return new a([]);
        var s = this.dup(), h, u = this.elements.length, l, f, c = this.elements[0].length, d;
        for (l = 0; l < u; l++) {
          if (s.elements[l][l] === 0) {
            for (f = l + 1; f < u; f++)
              if (s.elements[f][l] !== 0) {
                for (h = [], d = 0; d < c; d++)
                  h.push(s.elements[l][d] + s.elements[f][d]);
                s.elements[l] = h;
                break;
              }
          }
          if (s.elements[l][l] !== 0)
            for (f = l + 1; f < u; f++) {
              var v = s.elements[f][l] / s.elements[l][l];
              for (h = [], d = 0; d < c; d++)
                h.push(d <= l ? 0 : s.elements[f][d] - s.elements[l][d] * v);
              s.elements[f] = h;
            }
        }
        return s;
      }
    }, {
      key: "determinant",
      value: function() {
        if (this.elements.length === 0)
          return 1;
        if (!this.isSquare())
          return null;
        for (var s = this.toRightTriangular(), h = s.elements[0][0], u = s.elements.length, l = 1; l < u; l++)
          h = h * s.elements[l][l];
        return h;
      }
    }, {
      key: "isSingular",
      value: function() {
        return this.isSquare() && this.determinant() === 0;
      }
    }, {
      key: "trace",
      value: function() {
        if (this.elements.length === 0)
          return 0;
        if (!this.isSquare())
          return null;
        for (var s = this.elements[0][0], h = this.elements.length, u = 1; u < h; u++)
          s += this.elements[u][u];
        return s;
      }
    }, {
      key: "rank",
      value: function() {
        if (this.elements.length === 0)
          return 0;
        for (var s = this.toRightTriangular(), h = 0, u = this.elements.length, l = this.elements[0].length, f; u--; )
          for (f = l; f--; )
            if (Math.abs(s.elements[u][f]) > e.PRECISION) {
              h++;
              break;
            }
        return h;
      }
    }, {
      key: "augment",
      value: function(s) {
        if (this.elements.length === 0)
          return this.dup();
        var h = s.elements || s;
        typeof h[0][0] > "u" && (h = new a(h).elements);
        var u = this.dup(), l = u.elements[0].length, f = u.elements.length, c = h[0].length, d;
        if (f !== h.length)
          return null;
        for (; f--; )
          for (d = c; d--; )
            u.elements[f][l + d] = h[f][d];
        return u;
      }
    }, {
      key: "inverse",
      value: function() {
        if (this.elements.length === 0 || !this.isSquare() || this.isSingular())
          return null;
        for (var s = this.elements.length, h = s, u, l = this.augment(a.I(s)).toRightTriangular(), f = l.elements[0].length, c, d, v, g = [], m; h--; ) {
          for (d = [], g[h] = [], v = l.elements[h][h], c = 0; c < f; c++)
            m = l.elements[h][c] / v, d.push(m), c >= s && g[h].push(m);
          for (l.elements[h] = d, u = h; u--; ) {
            for (d = [], c = 0; c < f; c++)
              d.push(l.elements[u][c] - l.elements[h][c] * l.elements[u][h]);
            l.elements[u] = d;
          }
        }
        return new a(g);
      }
    }, {
      key: "round",
      value: function() {
        return this.map(function(s) {
          return Math.round(s);
        });
      }
    }, {
      key: "snapTo",
      value: function(s) {
        return this.map(function(h) {
          return Math.abs(h - s) <= e.PRECISION ? s : h;
        });
      }
    }, {
      key: "inspect",
      value: function() {
        var s = [], h = this.elements.length;
        if (h === 0)
          return "[]";
        for (var u = 0; u < h; u++)
          s.push(new n.Vector(this.elements[u]).inspect());
        return s.join(`
`);
      }
    }, {
      key: "setElements",
      value: function(s) {
        var h, u, l = s.elements || s;
        if (l[0] && typeof l[0][0] < "u") {
          for (h = l.length, this.elements = []; h--; )
            for (u = l[h].length, this.elements[h] = []; u--; )
              this.elements[h][u] = l[h][u];
          return this;
        }
        var f = l.length;
        for (this.elements = [], h = 0; h < f; h++)
          this.elements.push([l[h]]);
        return this;
      }
      //From glUtils.js
    }, {
      key: "flatten",
      value: function() {
        var s = [];
        if (this.elements.length == 0)
          return [];
        for (var h = 0; h < this.elements[0].length; h++)
          for (var u = 0; u < this.elements.length; u++)
            s.push(this.elements[u][h]);
        return s;
      }
      //From glUtils.js
    }, {
      key: "ensure4x4",
      value: function() {
        if (this.elements.length == 4 && this.elements[0].length == 4)
          return this;
        if (this.elements.length > 4 || this.elements[0].length > 4)
          return null;
        for (var s = 0; s < this.elements.length; s++)
          for (var h = this.elements[s].length; h < 4; h++)
            s == h ? this.elements[s].push(1) : this.elements[s].push(0);
        for (var s = this.elements.length; s < 4; s++)
          s == 0 ? this.elements.push([1, 0, 0, 0]) : s == 1 ? this.elements.push([0, 1, 0, 0]) : s == 2 ? this.elements.push([0, 0, 1, 0]) : s == 3 && this.elements.push([0, 0, 0, 1]);
        return this;
      }
      //From glUtils.js
    }, {
      key: "make3x3",
      value: function() {
        return this.elements.length != 4 || this.elements[0].length != 4 ? null : new a([[this.elements[0][0], this.elements[0][1], this.elements[0][2]], [this.elements[1][0], this.elements[1][1], this.elements[1][2]], [this.elements[2][0], this.elements[2][1], this.elements[2][2]]]);
      }
    }]), a;
  }();
  return i.I = function(a) {
    for (var o = [], s = a, h; s--; )
      for (h = a, o[s] = []; h--; )
        o[s][h] = s === h ? 1 : 0;
    return new i(o);
  }, i.Diagonal = function(a) {
    for (var o = a.length, s = i.I(o); o--; )
      s.elements[o][o] = a[o];
    return s;
  }, i.Rotation = function(a, o) {
    if (!o)
      return new i([[Math.cos(a), -Math.sin(a)], [Math.sin(a), Math.cos(a)]]);
    var s = o.dup();
    if (s.elements.length !== 3)
      return null;
    var h = s.modulus(), u = s.elements[0] / h, l = s.elements[1] / h, f = s.elements[2] / h, c = Math.sin(a), d = Math.cos(a), v = 1 - d;
    return new i([[v * u * u + d, v * u * l - c * f, v * u * f + c * l], [v * u * l + c * f, v * l * l + d, v * l * f - c * u], [v * u * f - c * l, v * l * f + c * u, v * f * f + d]]);
  }, i.RotationX = function(a) {
    var o = Math.cos(a), s = Math.sin(a);
    return new i([[1, 0, 0], [0, o, -s], [0, s, o]]);
  }, i.RotationY = function(a) {
    var o = Math.cos(a), s = Math.sin(a);
    return new i([[o, 0, s], [0, 1, 0], [-s, 0, o]]);
  }, i.RotationZ = function(a) {
    var o = Math.cos(a), s = Math.sin(a);
    return new i([[o, -s, 0], [s, o, 0], [0, 0, 1]]);
  }, i.Random = function(a, o) {
    return i.Zero(a, o).map(function() {
      return Math.random();
    });
  }, i.Translation = function(a) {
    if (a.elements.length == 2) {
      var o = i.I(3);
      return o.elements[2][0] = a.elements[0], o.elements[2][1] = a.elements[1], o;
    }
    if (a.elements.length == 3) {
      var o = i.I(4);
      return o.elements[0][3] = a.elements[0], o.elements[1][3] = a.elements[1], o.elements[2][3] = a.elements[2], o;
    }
    throw "Invalid length for Translation";
  }, i.Zero = function(a, o) {
    for (var s = [], h = a, u; h--; )
      for (u = o, s[h] = []; u--; )
        s[h][u] = 0;
    return new i(s);
  }, i.prototype.toUpperTriangular = i.prototype.toRightTriangular, i.prototype.det = i.prototype.determinant, i.prototype.tr = i.prototype.trace, i.prototype.rk = i.prototype.rank, i.prototype.inv = i.prototype.inverse, i.prototype.x = i.prototype.multiply, Oe;
}
var Ln;
function ve() {
  if (Ln)
    return Ne;
  Ln = 1, Object.defineProperty(Ne, "__esModule", {
    value: !0
  }), Ne.Vector = void 0;
  var t = function() {
    function a(o, s) {
      for (var h = 0; h < s.length; h++) {
        var u = s[h];
        u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(o, u.key, u);
      }
    }
    return function(o, s, h) {
      return s && a(o.prototype, s), h && a(o, h), o;
    };
  }(), e = Fe(), n = ce;
  function r(a, o) {
    if (!(a instanceof o))
      throw new TypeError("Cannot call a class as a function");
  }
  var i = Ne.Vector = function() {
    function a(o) {
      r(this, a), this.setElements(o);
    }
    return t(a, [{
      key: "e",
      value: function(s) {
        return s < 1 || s > this.elements.length ? null : this.elements[s - 1];
      }
    }, {
      key: "dimensions",
      value: function() {
        return this.elements.length;
      }
    }, {
      key: "modulus",
      value: function() {
        return Math.sqrt(this.dot(this));
      }
    }, {
      key: "eql",
      value: function(s) {
        var h = this.elements.length, u = s.elements || s;
        if (h !== u.length)
          return !1;
        for (; h--; )
          if (Math.abs(this.elements[h] - u[h]) > n.PRECISION)
            return !1;
        return !0;
      }
    }, {
      key: "dup",
      value: function() {
        return new a(this.elements);
      }
    }, {
      key: "map",
      value: function(s, h) {
        var u = [];
        return this.each(function(l, f) {
          u.push(s.call(h, l, f));
        }), new a(u);
      }
    }, {
      key: "forEach",
      value: function(s, h) {
        for (var u = this.elements.length, l = 0; l < u; l++)
          s.call(h, this.elements[l], l + 1);
      }
    }, {
      key: "toUnitVector",
      value: function() {
        var s = this.modulus();
        return s === 0 ? this.dup() : this.map(function(h) {
          return h / s;
        });
      }
    }, {
      key: "angleFrom",
      value: function(s) {
        var h = s.elements || s, u = this.elements.length;
        if (u !== h.length)
          return null;
        var l = 0, f = 0, c = 0;
        if (this.each(function(v, g) {
          l += v * h[g - 1], f += v * v, c += h[g - 1] * h[g - 1];
        }), f = Math.sqrt(f), c = Math.sqrt(c), f * c === 0)
          return null;
        var d = l / (f * c);
        return d < -1 && (d = -1), d > 1 && (d = 1), Math.acos(d);
      }
    }, {
      key: "isParallelTo",
      value: function(s) {
        var h = this.angleFrom(s);
        return h === null ? null : h <= n.PRECISION;
      }
    }, {
      key: "isAntiparallelTo",
      value: function(s) {
        var h = this.angleFrom(s);
        return h === null ? null : Math.abs(h - Math.PI) <= n.PRECISION;
      }
    }, {
      key: "isPerpendicularTo",
      value: function(s) {
        var h = this.dot(s);
        return h === null ? null : Math.abs(h) <= n.PRECISION;
      }
    }, {
      key: "add",
      value: function(s) {
        var h = s.elements || s;
        return this.elements.length !== h.length ? null : this.map(function(u, l) {
          return u + h[l - 1];
        });
      }
    }, {
      key: "subtract",
      value: function(s) {
        var h = s.elements || s;
        return this.elements.length !== h.length ? null : this.map(function(u, l) {
          return u - h[l - 1];
        });
      }
    }, {
      key: "multiply",
      value: function(s) {
        return this.map(function(h) {
          return h * s;
        });
      }
    }, {
      key: "dot",
      value: function(s) {
        var h = s.elements || s, u = 0, l = this.elements.length;
        if (l !== h.length)
          return null;
        for (; l--; )
          u += this.elements[l] * h[l];
        return u;
      }
    }, {
      key: "cross",
      value: function(s) {
        var h = s.elements || s;
        if (this.elements.length !== 3 || h.length !== 3)
          return null;
        var u = this.elements;
        return new a([u[1] * h[2] - u[2] * h[1], u[2] * h[0] - u[0] * h[2], u[0] * h[1] - u[1] * h[0]]);
      }
    }, {
      key: "max",
      value: function() {
        for (var s = 0, h = this.elements.length; h--; )
          Math.abs(this.elements[h]) > Math.abs(s) && (s = this.elements[h]);
        return s;
      }
    }, {
      key: "indexOf",
      value: function(s) {
        for (var h = null, u = this.elements.length, l = 0; l < u; l++)
          h === null && this.elements[l] === s && (h = l + 1);
        return h;
      }
    }, {
      key: "toDiagonalMatrix",
      value: function() {
        return e.Matrix.Diagonal(this.elements);
      }
    }, {
      key: "round",
      value: function() {
        return this.map(function(s) {
          return Math.round(s);
        });
      }
    }, {
      key: "snapTo",
      value: function(s) {
        return this.map(function(h) {
          return Math.abs(h - s) <= n.PRECISION ? s : h;
        });
      }
    }, {
      key: "distanceFrom",
      value: function(s) {
        if (s.anchor || s.start && s.end)
          return s.distanceFrom(this);
        var h = s.elements || s;
        if (h.length !== this.elements.length)
          return null;
        var u = 0, l;
        return this.each(function(f, c) {
          l = f - h[c - 1], u += l * l;
        }), Math.sqrt(u);
      }
    }, {
      key: "liesOn",
      value: function(s) {
        return s.contains(this);
      }
    }, {
      key: "liesIn",
      value: function(s) {
        return s.contains(this);
      }
    }, {
      key: "rotate",
      value: function(s, h) {
        var u, l = null, f, c, d;
        switch (s.determinant && (l = s.elements), this.elements.length) {
          case 2:
            return u = h.elements || h, u.length !== 2 ? null : (l || (l = e.Matrix.Rotation(s).elements), f = this.elements[0] - u[0], c = this.elements[1] - u[1], new a([u[0] + l[0][0] * f + l[0][1] * c, u[1] + l[1][0] * f + l[1][1] * c]));
          case 3: {
            if (!h.direction)
              return null;
            var v = h.pointClosestTo(this).elements;
            return l || (l = e.Matrix.Rotation(s, h.direction).elements), f = this.elements[0] - v[0], c = this.elements[1] - v[1], d = this.elements[2] - v[2], new a([v[0] + l[0][0] * f + l[0][1] * c + l[0][2] * d, v[1] + l[1][0] * f + l[1][1] * c + l[1][2] * d, v[2] + l[2][0] * f + l[2][1] * c + l[2][2] * d]);
          }
          default:
            return null;
        }
      }
    }, {
      key: "reflectionIn",
      value: function(s) {
        if (s.anchor) {
          var h = this.elements.slice(), u = s.pointClosestTo(h).elements;
          return new a([u[0] + (u[0] - h[0]), u[1] + (u[1] - h[1]), u[2] + (u[2] - (h[2] || 0))]);
        } else {
          var l = s.elements || s;
          return this.elements.length !== l.length ? null : this.map(function(f, c) {
            return l[c - 1] + (l[c - 1] - f);
          });
        }
      }
    }, {
      key: "to3D",
      value: function() {
        var s = this.dup();
        switch (s.elements.length) {
          case 3:
            break;
          case 2: {
            s.elements.push(0);
            break;
          }
          default:
            return null;
        }
        return s;
      }
    }, {
      key: "inspect",
      value: function() {
        return "[" + this.elements.join(", ") + "]";
      }
    }, {
      key: "setElements",
      value: function(s) {
        return this.elements = (s.elements || s).slice(), this;
      }
      //From glUtils.js
    }, {
      key: "flatten",
      value: function() {
        return this.elements;
      }
    }]), a;
  }();
  return i.Random = function(a) {
    for (var o = []; a--; )
      o.push(Math.random());
    return new i(o);
  }, i.Zero = function(a) {
    for (var o = []; a--; )
      o.push(0);
    return new i(o);
  }, i.prototype.x = i.prototype.multiply, i.prototype.each = i.prototype.forEach, i.i = new i([1, 0, 0]), i.j = new i([0, 1, 0]), i.k = new i([0, 0, 1]), Ne;
}
var Pe = {}, Un;
function Et() {
  if (Un)
    return Pe;
  Un = 1, Object.defineProperty(Pe, "__esModule", {
    value: !0
  }), Pe.Plane = void 0;
  var t = function() {
    function s(h, u) {
      for (var l = 0; l < u.length; l++) {
        var f = u[l];
        f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(h, f.key, f);
      }
    }
    return function(h, u, l) {
      return u && s(h.prototype, u), l && s(h, l), h;
    };
  }(), e = ce, n = Fe(), r = ve(), i = kt();
  function a(s, h) {
    if (!(s instanceof h))
      throw new TypeError("Cannot call a class as a function");
  }
  var o = Pe.Plane = function() {
    function s(h, u, l) {
      a(this, s), this.setVectors(h, u, l);
    }
    return t(s, [{
      key: "eql",
      value: function(u) {
        return this.contains(u.anchor) && this.isParallelTo(u);
      }
    }, {
      key: "dup",
      value: function() {
        return new s(this.anchor, this.normal);
      }
    }, {
      key: "translate",
      value: function(u) {
        var l = u.elements || u;
        return new s([this.anchor.elements[0] + l[0], this.anchor.elements[1] + l[1], this.anchor.elements[2] + (l[2] || 0)], this.normal);
      }
    }, {
      key: "isParallelTo",
      value: function(u) {
        var l;
        return u.normal ? (l = this.normal.angleFrom(u.normal), Math.abs(l) <= e.PRECISION || Math.abs(Math.PI - l) <= e.PRECISION) : u.direction ? this.normal.isPerpendicularTo(u.direction) : null;
      }
    }, {
      key: "isPerpendicularTo",
      value: function(u) {
        var l = this.normal.angleFrom(u.normal);
        return Math.abs(Math.PI / 2 - l) <= e.PRECISION;
      }
    }, {
      key: "distanceFrom",
      value: function(u) {
        if (this.intersects(u) || this.contains(u))
          return 0;
        if (u.anchor) {
          var l = this.anchor.elements, f = u.anchor.elements, c = this.normal.elements;
          return Math.abs((l[0] - f[0]) * c[0] + (l[1] - f[1]) * c[1] + (l[2] - f[2]) * c[2]);
        } else {
          var d = u.elements || u, l = this.anchor.elements, c = this.normal.elements;
          return Math.abs((l[0] - d[0]) * c[0] + (l[1] - d[1]) * c[1] + (l[2] - (d[2] || 0)) * c[2]);
        }
      }
    }, {
      key: "contains",
      value: function(u) {
        if (u.normal)
          return null;
        if (u.direction)
          return this.contains(u.anchor) && this.contains(u.anchor.add(u.direction));
        var l = u.elements || u, f = this.anchor.elements, c = this.normal.elements, d = Math.abs(c[0] * (f[0] - l[0]) + c[1] * (f[1] - l[1]) + c[2] * (f[2] - (l[2] || 0)));
        return d <= e.PRECISION;
      }
    }, {
      key: "intersects",
      value: function(u) {
        return typeof u.direction > "u" && typeof u.normal > "u" ? null : !this.isParallelTo(u);
      }
    }, {
      key: "intersectionWith",
      value: function(u) {
        if (!this.intersects(u))
          return null;
        if (u.direction) {
          var l = u.anchor.elements, f = u.direction.elements, c = this.anchor.elements, d = this.normal.elements, v = (d[0] * (c[0] - l[0]) + d[1] * (c[1] - l[1]) + d[2] * (c[2] - l[2])) / (d[0] * f[0] + d[1] * f[1] + d[2] * f[2]);
          return new r.Vector([l[0] + f[0] * v, l[1] + f[1] * v, l[2] + f[2] * v]);
        } else if (u.normal) {
          for (var g = this.normal.cross(u.normal).toUnitVector(), d = this.normal.elements, l = this.anchor.elements, m = u.normal.elements, _ = u.anchor.elements, b = n.Matrix.Zero(2, 2), w = 0; b.isSingular(); )
            w++, b = new n.Matrix([[d[w % 3], d[(w + 1) % 3]], [m[w % 3], m[(w + 1) % 3]]]);
          for (var p = b.inverse().elements, y = d[0] * l[0] + d[1] * l[1] + d[2] * l[2], A = m[0] * _[0] + m[1] * _[1] + m[2] * _[2], C = [p[0][0] * y + p[0][1] * A, p[1][0] * y + p[1][1] * A], k = [], M = 1; M <= 3; M++)
            k.push(w === M ? 0 : C[(M + (5 - w) % 3) % 3]);
          return new i.Line(k, g);
        }
      }
    }, {
      key: "pointClosestTo",
      value: function(u) {
        var l = u.elements || u, f = this.anchor.elements, c = this.normal.elements, d = (f[0] - l[0]) * c[0] + (f[1] - l[1]) * c[1] + (f[2] - (l[2] || 0)) * c[2];
        return new r.Vector([l[0] + c[0] * d, l[1] + c[1] * d, (l[2] || 0) + c[2] * d]);
      }
    }, {
      key: "rotate",
      value: function(u, l) {
        var f = u.determinant ? u.elements : n.Matrix.Rotation(u, l.direction).elements, c = l.pointClosestTo(this.anchor).elements, d = this.anchor.elements, v = this.normal.elements, g = c[0], m = c[1], _ = c[2], b = d[0], w = d[1], p = d[2], y = b - g, A = w - m, C = p - _;
        return new s([g + f[0][0] * y + f[0][1] * A + f[0][2] * C, m + f[1][0] * y + f[1][1] * A + f[1][2] * C, _ + f[2][0] * y + f[2][1] * A + f[2][2] * C], [f[0][0] * v[0] + f[0][1] * v[1] + f[0][2] * v[2], f[1][0] * v[0] + f[1][1] * v[1] + f[1][2] * v[2], f[2][0] * v[0] + f[2][1] * v[1] + f[2][2] * v[2]]);
      }
    }, {
      key: "reflectionIn",
      value: function(u) {
        if (u.normal) {
          var l = this.anchor.elements, f = this.normal.elements, c = l[0], d = l[1], v = l[2], g = f[0], m = f[1], _ = f[2], b = this.anchor.reflectionIn(u).elements, w = c + g, p = d + m, y = v + _, A = u.pointClosestTo([w, p, y]).elements, C = [A[0] + (A[0] - w) - b[0], A[1] + (A[1] - p) - b[1], A[2] + (A[2] - y) - b[2]];
          return new s(b, C);
        } else {
          if (u.direction)
            return this.rotate(Math.PI, u);
          var k = u.elements || u;
          return new s(this.anchor.reflectionIn([k[0], k[1], k[2] || 0]), this.normal);
        }
      }
    }, {
      key: "setVectors",
      value: function(u, l, f) {
        if (u = new r.Vector(u), u = u.to3D(), u === null || (l = new r.Vector(l), l = l.to3D(), l === null))
          return null;
        if (typeof f > "u")
          f = null;
        else if (f = new r.Vector(f), f = f.to3D(), f === null)
          return null;
        var c = u.elements[0], d = u.elements[1], v = u.elements[2], g = l.elements[0], m = l.elements[1], _ = l.elements[2], b, w;
        if (f !== null) {
          var p = f.elements[0], y = f.elements[1], A = f.elements[2];
          if (b = new r.Vector([(m - d) * (A - v) - (_ - v) * (y - d), (_ - v) * (p - c) - (g - c) * (A - v), (g - c) * (y - d) - (m - d) * (p - c)]), w = b.modulus(), w === 0)
            return null;
          b = new r.Vector([b.elements[0] / w, b.elements[1] / w, b.elements[2] / w]);
        } else {
          if (w = Math.sqrt(g * g + m * m + _ * _), w === 0)
            return null;
          b = new r.Vector([l.elements[0] / w, l.elements[1] / w, l.elements[2] / w]);
        }
        return this.anchor = u, this.normal = b, this;
      }
    }]), s;
  }();
  return o.XY = new o(r.Vector.Zero(3), r.Vector.k), o.YZ = new o(r.Vector.Zero(3), r.Vector.i), o.ZX = new o(r.Vector.Zero(3), r.Vector.j), o.YX = o.XY, o.ZY = o.YZ, o.XZ = o.ZX, o.fromPoints = function(s) {
    var h = s.length, u = [], l, f, c, d, v, g, m, _, b, w, p = r.Vector.Zero(3);
    for (l = 0; l < h; l++) {
      if (f = new r.Vector(s[l]).to3D(), f === null)
        return null;
      if (u.push(f), c = u.length, c > 2) {
        if (v = u[c - 1].elements, g = u[c - 2].elements, m = u[c - 3].elements, d = new r.Vector([(v[1] - g[1]) * (m[2] - g[2]) - (v[2] - g[2]) * (m[1] - g[1]), (v[2] - g[2]) * (m[0] - g[0]) - (v[0] - g[0]) * (m[2] - g[2]), (v[0] - g[0]) * (m[1] - g[1]) - (v[1] - g[1]) * (m[0] - g[0])]).toUnitVector(), c > 3 && (b = d.angleFrom(w), b !== null && !(Math.abs(b) <= e.PRECISION || Math.abs(b - Math.PI) <= e.PRECISION)))
          return null;
        p = p.add(d), w = d;
      }
    }
    return v = u[1].elements, g = u[0].elements, m = u[c - 1].elements, _ = u[c - 2].elements, p = p.add(new r.Vector([(v[1] - g[1]) * (m[2] - g[2]) - (v[2] - g[2]) * (m[1] - g[1]), (v[2] - g[2]) * (m[0] - g[0]) - (v[0] - g[0]) * (m[2] - g[2]), (v[0] - g[0]) * (m[1] - g[1]) - (v[1] - g[1]) * (m[0] - g[0])]).toUnitVector()).add(new r.Vector([(g[1] - m[1]) * (_[2] - m[2]) - (g[2] - m[2]) * (_[1] - m[1]), (g[2] - m[2]) * (_[0] - m[0]) - (g[0] - m[0]) * (_[2] - m[2]), (g[0] - m[0]) * (_[1] - m[1]) - (g[1] - m[1]) * (_[0] - m[0])]).toUnitVector()), new o(u[0], p);
  }, Pe;
}
var Qn;
function kt() {
  if (Qn)
    return Te;
  Qn = 1, Object.defineProperty(Te, "__esModule", {
    value: !0
  }), Te.Line = void 0;
  var t = function() {
    function s(h, u) {
      for (var l = 0; l < u.length; l++) {
        var f = u[l];
        f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(h, f.key, f);
      }
    }
    return function(h, u, l) {
      return u && s(h.prototype, u), l && s(h, l), h;
    };
  }(), e = ce, n = ve(), r = Fe(), i = Et();
  function a(s, h) {
    if (!(s instanceof h))
      throw new TypeError("Cannot call a class as a function");
  }
  var o = Te.Line = function() {
    function s(h, u) {
      a(this, s), this.setVectors(h, u);
    }
    return t(s, [{
      key: "eql",
      value: function(u) {
        return this.isParallelTo(u) && this.contains(u.anchor);
      }
    }, {
      key: "dup",
      value: function() {
        return new s(this.anchor, this.direction);
      }
    }, {
      key: "translate",
      value: function(u) {
        var l = u.elements || u;
        return new s([this.anchor.elements[0] + l[0], this.anchor.elements[1] + l[1], this.anchor.elements[2] + (l[2] || 0)], this.direction);
      }
    }, {
      key: "isParallelTo",
      value: function(u) {
        if (u.normal || u.start && u.end)
          return u.isParallelTo(this);
        var l = this.direction.angleFrom(u.direction);
        return Math.abs(l) <= e.PRECISION || Math.abs(l - Math.PI) <= e.PRECISION;
      }
    }, {
      key: "distanceFrom",
      value: function(u) {
        if (u.normal || u.start && u.end)
          return u.distanceFrom(this);
        if (u.direction) {
          if (this.isParallelTo(u))
            return this.distanceFrom(u.anchor);
          var l = this.direction.cross(u.direction).toUnitVector().elements, f = this.anchor.elements, c = u.anchor.elements;
          return Math.abs((f[0] - c[0]) * l[0] + (f[1] - c[1]) * l[1] + (f[2] - c[2]) * l[2]);
        } else {
          var d = u.elements || u, f = this.anchor.elements, v = this.direction.elements, g = d[0] - f[0], m = d[1] - f[1], _ = (d[2] || 0) - f[2], b = Math.sqrt(g * g + m * m + _ * _);
          if (b === 0)
            return 0;
          var w = (g * v[0] + m * v[1] + _ * v[2]) / b, p = 1 - w * w;
          return Math.abs(b * Math.sqrt(p < 0 ? 0 : p));
        }
      }
    }, {
      key: "contains",
      value: function(u) {
        if (u.start && u.end)
          return this.contains(u.start) && this.contains(u.end);
        var l = this.distanceFrom(u);
        return l !== null && l <= e.PRECISION;
      }
    }, {
      key: "positionOf",
      value: function(u) {
        if (!this.contains(u))
          return null;
        var l = u.elements || u, f = this.anchor.elements, c = this.direction.elements;
        return (l[0] - f[0]) * c[0] + (l[1] - f[1]) * c[1] + ((l[2] || 0) - f[2]) * c[2];
      }
    }, {
      key: "liesIn",
      value: function(u) {
        return u.contains(this);
      }
    }, {
      key: "intersects",
      value: function(u) {
        return u.normal ? u.intersects(this) : !this.isParallelTo(u) && this.distanceFrom(u) <= e.PRECISION;
      }
    }, {
      key: "intersectionWith",
      value: function(u) {
        if (u.normal || u.start && u.end)
          return u.intersectionWith(this);
        if (!this.intersects(u))
          return null;
        var l = this.anchor.elements, f = this.direction.elements, c = u.anchor.elements, d = u.direction.elements, v = f[0], g = f[1], m = f[2], _ = d[0], b = d[1], w = d[2], p = l[0] - c[0], y = l[1] - c[1], A = l[2] - c[2], C = -v * p - g * y - m * A, k = _ * p + b * y + w * A, M = v * v + g * g + m * m, N = _ * _ + b * b + w * w, I = v * _ + g * b + m * w, O = (C * N / M + I * k) / (N - I * I);
        return new n.Vector([l[0] + O * v, l[1] + O * g, l[2] + O * m]);
      }
    }, {
      key: "pointClosestTo",
      value: function(u) {
        if (u.start && u.end) {
          var l = u.pointClosestTo(this);
          return l === null ? null : this.pointClosestTo(l);
        } else if (u.direction) {
          if (this.intersects(u))
            return this.intersectionWith(u);
          if (this.isParallelTo(u))
            return null;
          var f = this.direction.elements, c = u.direction.elements, d = f[0], v = f[1], g = f[2], m = c[0], _ = c[1], b = c[2], w = g * m - d * b, p = d * _ - v * m, y = v * b - g * _, A = [w * b - p * _, p * m - y * b, y * _ - w * m], l = new i.Plane(u.anchor, A);
          return l.intersectionWith(this);
        } else {
          var l = u.elements || u;
          if (this.contains(l))
            return new n.Vector(l);
          var C = this.anchor.elements, f = this.direction.elements, d = f[0], v = f[1], g = f[2], k = C[0], M = C[1], N = C[2], w = d * (l[1] - M) - v * (l[0] - k), p = v * ((l[2] || 0) - N) - g * (l[1] - M), y = g * (l[0] - k) - d * ((l[2] || 0) - N), I = new n.Vector([v * w - g * y, g * p - d * w, d * y - v * p]), O = this.distanceFrom(l) / I.modulus();
          return new n.Vector([l[0] + I.elements[0] * O, l[1] + I.elements[1] * O, (l[2] || 0) + I.elements[2] * O]);
        }
      }
      // Returns a copy of the line rotated by t radians about the given line. Works
      // by finding the argument's closest point to this line's anchor point (call
      // this C) and rotating the anchor about C. Also rotates the line's direction
      // about the argument's. Be careful with this - the rotation axis' direction
      // affects the outcome!
    }, {
      key: "rotate",
      value: function(u, l) {
        typeof l.direction > "u" && (l = new s(l.to3D(), n.Vector.k));
        var f = r.Matrix.Rotation(u, l.direction).elements, c = l.pointClosestTo(this.anchor).elements, d = this.anchor.elements, v = this.direction.elements, g = c[0], m = c[1], _ = c[2], b = d[0], w = d[1], p = d[2], y = b - g, A = w - m, C = p - _;
        return new s([g + f[0][0] * y + f[0][1] * A + f[0][2] * C, m + f[1][0] * y + f[1][1] * A + f[1][2] * C, _ + f[2][0] * y + f[2][1] * A + f[2][2] * C], [f[0][0] * v[0] + f[0][1] * v[1] + f[0][2] * v[2], f[1][0] * v[0] + f[1][1] * v[1] + f[1][2] * v[2], f[2][0] * v[0] + f[2][1] * v[1] + f[2][2] * v[2]]);
      }
    }, {
      key: "reverse",
      value: function() {
        return new s(this.anchor, this.direction.x(-1));
      }
    }, {
      key: "reflectionIn",
      value: function(u) {
        if (u.normal) {
          var l = this.anchor.elements, f = this.direction.elements, c = l[0], d = l[1], v = l[2], g = f[0], m = f[1], _ = f[2], b = this.anchor.reflectionIn(u).elements, w = c + g, p = d + m, y = v + _, A = u.pointClosestTo([w, p, y]).elements, C = [A[0] + (A[0] - w) - b[0], A[1] + (A[1] - p) - b[1], A[2] + (A[2] - y) - b[2]];
          return new s(b, C);
        } else {
          if (u.direction)
            return this.rotate(Math.PI, u);
          var k = u.elements || u;
          return new s(this.anchor.reflectionIn([k[0], k[1], k[2] || 0]), this.direction);
        }
      }
    }, {
      key: "setVectors",
      value: function(u, l) {
        if (u = new n.Vector(u), l = new n.Vector(l), u.elements.length === 2 && u.elements.push(0), l.elements.length === 2 && l.elements.push(0), u.elements.length > 3 || l.elements.length > 3)
          return null;
        var f = l.modulus();
        return f === 0 ? null : (this.anchor = u, this.direction = new n.Vector([l.elements[0] / f, l.elements[1] / f, l.elements[2] / f]), this);
      }
    }]), s;
  }();
  return o.X = new o(n.Vector.Zero(3), n.Vector.i), o.Y = new o(n.Vector.Zero(3), n.Vector.j), o.Z = new o(n.Vector.Zero(3), n.Vector.k), Te;
}
var Ct = {};
Object.defineProperty(Ct, "__esModule", {
  value: !0
});
Ct.LineSegment = void 0;
var Xo = function() {
  function t(e, n) {
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }
  return function(e, n, r) {
    return n && t(e.prototype, n), r && t(e, r), e;
  };
}(), ze = ve(), jo = Et(), $o = kt();
function Zo(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
Ct.LineSegment = function() {
  function t(e, n) {
    Zo(this, t), this.setPoints(e, n);
  }
  return Xo(t, [{
    key: "eql",
    value: function(n) {
      return this.start.eql(n.start) && this.end.eql(n.end) || this.start.eql(n.end) && this.end.eql(n.start);
    }
  }, {
    key: "dup",
    value: function() {
      return new t(this.start, this.end);
    }
  }, {
    key: "length",
    value: function() {
      var n = this.start.elements, r = this.end.elements, i = r[0] - n[0], a = r[1] - n[1], o = r[2] - n[2];
      return Math.sqrt(i * i + a * a + o * o);
    }
  }, {
    key: "toVector",
    value: function() {
      var n = this.start.elements, r = this.end.elements;
      return new ze.Vector([r[0] - n[0], r[1] - n[1], r[2] - n[2]]);
    }
  }, {
    key: "midpoint",
    value: function() {
      var n = this.start.elements, r = this.end.elements;
      return new ze.Vector([(r[0] + n[0]) / 2, (r[1] + n[1]) / 2, (r[2] + n[2]) / 2]);
    }
  }, {
    key: "bisectingPlane",
    value: function() {
      return new jo.Plane(this.midpoint(), this.toVector());
    }
  }, {
    key: "translate",
    value: function(n) {
      var r = n.elements || n, i = this.start.elements, a = this.end.elements;
      return new t([i[0] + r[0], i[1] + r[1], i[2] + (r[2] || 0)], [a[0] + r[0], a[1] + r[1], a[2] + (r[2] || 0)]);
    }
  }, {
    key: "isParallelTo",
    value: function(n) {
      return this.line.isParallelTo(n);
    }
  }, {
    key: "distanceFrom",
    value: function(n) {
      var r = this.pointClosestTo(n);
      return r === null ? null : r.distanceFrom(n);
    }
  }, {
    key: "contains",
    value: function(n) {
      if (n.start && n.end)
        return this.contains(n.start) && this.contains(n.end);
      var r = (n.elements || n).slice();
      if (r.length === 2 && r.push(0), this.start.eql(r))
        return !0;
      var i = this.start.elements, a = new ze.Vector([i[0] - r[0], i[1] - r[1], i[2] - (r[2] || 0)]), o = this.toVector();
      return a.isAntiparallelTo(o) && a.modulus() <= o.modulus();
    }
  }, {
    key: "intersects",
    value: function(n) {
      return this.intersectionWith(n) !== null;
    }
  }, {
    key: "intersectionWith",
    value: function(n) {
      if (!this.line.intersects(n))
        return null;
      var r = this.line.intersectionWith(n);
      return this.contains(r) ? r : null;
    }
  }, {
    key: "pointClosestTo",
    value: function(n) {
      if (n.normal) {
        var r = this.line.intersectionWith(n);
        return r === null ? null : this.pointClosestTo(r);
      } else {
        var i = this.line.pointClosestTo(n);
        return i === null ? null : this.contains(i) ? i : (this.line.positionOf(i) < 0 ? this.start : this.end).dup();
      }
    }
  }, {
    key: "setPoints",
    value: function(n, r) {
      return n = new ze.Vector(n).to3D(), r = new ze.Vector(r).to3D(), n === null || r === null ? null : (this.line = new $o.Line(n, r.subtract(n)), this.start = n, this.end = r, this);
    }
  }]), t;
}();
var un = {};
Object.defineProperty(un, "__esModule", {
  value: !0
});
function Ko(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
un.LinkedListNode = function t(e) {
  Ko(this, t), this.prev = null, this.next = null, this.data = e;
};
var It = {};
Object.defineProperty(It, "__esModule", {
  value: !0
});
It.Polygon = void 0;
var Jo = function() {
  function t(e, n) {
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }
  return function(e, n, r) {
    return n && t(e.prototype, n), r && t(e, r), e;
  };
}(), le = Xe, Gn = ce, el = Fe(), De = ve(), Lt = Et(), tl = kt();
function nl(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
It.Polygon = function() {
  function t(e, n) {
    nl(this, t), this.setVertices(e, n);
  }
  return Jo(t, [{
    key: "v",
    value: function(n) {
      return this.vertices.at(n - 1).data;
    }
  }, {
    key: "nodeFor",
    value: function(n) {
      return this.vertices.withData(n);
    }
  }, {
    key: "dup",
    value: function() {
      return new t(this.vertices, this.plane);
    }
  }, {
    key: "translate",
    value: function(n) {
      var r = n.elements || n;
      return this.vertices.each(function(i) {
        var a = i.data.elements;
        i.data.setElements([a[0] + r[0], a[1] + r[1], a[2] + (r[2] || 0)]);
      }), this.plane = this.plane.translate(n), this.updateTrianglePlanes(function(i) {
        return i.translate(n);
      }), this;
    }
  }, {
    key: "rotate",
    value: function(n, r) {
      var i = el.Matrix.Rotation(n, r.direction);
      return this.vertices.each(function(a) {
        a.data.setElements(a.data.rotate(i, r).elements);
      }), this.plane = this.plane.rotate(i, r), this.updateTrianglePlanes(function(a) {
        return a.rotate(i, r);
      }), this;
    }
  }, {
    key: "scale",
    value: function(n, r) {
      var i = r.elements || r;
      this.vertices.each(function(o) {
        var s = o.data.elements;
        o.data.setElements([i[0] + n * (s[0] - i[0]), i[1] + n * (s[1] - i[1]), (i[2] || 0) + n * (s[2] - (i[2] || 0))]);
      });
      var a = this.vertices.first.data;
      return this.plane.anchor.setElements(a), this.updateTrianglePlanes(function(o) {
        return new Lt.Plane(a, o.normal);
      }), this;
    }
    // Updates the plane properties of all the cached triangles belonging to the
    // polygon according to the given function. For example, suppose you just
    // rotated the polygon, you should call:
    //
    //   poly.updateTrianglePlanes(function(plane) { return plane.rotate(t, line); });
    //
    // This method is called automatically by Polygon.translate,
    // Polygon.rotate and Polygon.scale transformation methods.
  }, {
    key: "updateTrianglePlanes",
    value: function(n) {
      var r;
      if (this.cached.triangles !== null)
        for (r = this.cached.triangles.length; r--; )
          this.cached.triangles[r].plane = n(this.cached.triangles[r].plane);
      if (this.cached.surfaceIntegralElements !== null)
        for (r = this.cached.surfaceIntegralElements.length; r--; )
          this.cached.surfaceIntegralElements[r].plane = n(this.cached.surfaceIntegralElements[r].plane);
    }
  }, {
    key: "isTriangle",
    value: function() {
      return this.vertices.length === 3;
    }
    // Returns a collection of triangles used for calculating area and center of
    // mass. Some of the triangles will not lie inside the polygon - this
    // collection is essentially a series of itervals in a surface integral, so
    // some are 'negative'. If you want the polygon broken into constituent
    // triangles, use toTriangles(). This method is used because it's much faster
    // than toTriangles().
    //
    // The triangles generated share vertices with the original polygon, so they
    // transform with the polygon. They are cached after first calculation and
    // should remain in sync with changes to the parent polygon.
  }, {
    key: "trianglesForSurfaceIntegral",
    value: function() {
      if (this.cached.surfaceIntegralElements !== null)
        return this.cached.surfaceIntegralElements;
      var n = [], r = this.vertices.first.data, i = this.plane;
      return this.vertices.each(function(a, o) {
        if (!(o < 2)) {
          var s = [r, a.prev.data, a.data];
          n.push(new t(s, Lt.Plane.fromPoints(s) || i));
        }
      }), this.setCache("surfaceIntegralElements", n);
    }
  }, {
    key: "area",
    value: function() {
      if (this.isTriangle()) {
        var n = this.vertices.first, r = n.next, i = r.next;
        return n = n.data.elements, r = r.data.elements, i = i.data.elements, 0.5 * new De.Vector([(n[1] - r[1]) * (i[2] - r[2]) - (n[2] - r[2]) * (i[1] - r[1]), (n[2] - r[2]) * (i[0] - r[0]) - (n[0] - r[0]) * (i[2] - r[2]), (n[0] - r[0]) * (i[1] - r[1]) - (n[1] - r[1]) * (i[0] - r[0])]).modulus();
      } else {
        for (var a = this.trianglesForSurfaceIntegral(), o = 0, s = a.length; s--; )
          o += a[s].area() * a[s].plane.normal.dot(this.plane.normal);
        return o;
      }
    }
  }, {
    key: "centroid",
    value: function() {
      if (this.isTriangle()) {
        var n = this.v(1).elements, r = this.v(2).elements, i = this.v(3).elements;
        return new De.Vector([(n[0] + r[0] + i[0]) / 3, (n[1] + r[1] + i[1]) / 3, (n[2] + r[2] + i[2]) / 3]);
      } else {
        for (var n, a = 0, o = De.Vector.Zero(3), s, i, h = this.trianglesForSurfaceIntegral(), u = h.length; u--; )
          n = h[u].area() * h[u].plane.normal.dot(this.plane.normal), a += n, s = o.elements, i = h[u].centroid().elements, o.setElements([s[0] + i[0] * n, s[1] + i[1] * n, s[2] + i[2] * n]);
        return o.x(1 / a);
      }
    }
  }, {
    key: "projectionOn",
    value: function(n) {
      var r = [];
      return this.vertices.each(function(i) {
        r.push(n.pointClosestTo(i.data));
      }), new t(r);
    }
  }, {
    key: "removeVertex",
    value: function(n) {
      if (!this.isTriangle()) {
        var r = this.nodeFor(n);
        if (r === null)
          return null;
        this.clearCache();
        var i = r.prev, a = r.next, o = i.data.isConvex(this), s = a.data.isConvex(this);
        return r.data.isConvex(this) ? this.convexVertices.remove(this.convexVertices.withData(r.data)) : this.reflexVertices.remove(this.reflexVertices.withData(r.data)), this.vertices.remove(r), o !== i.data.isConvex(this) && (o ? (this.convexVertices.remove(this.convexVertices.withData(i.data)), this.reflexVertices.append(new le.LinkedList.Node(i.data))) : (this.reflexVertices.remove(this.reflexVertices.withData(i.data)), this.convexVertices.append(new le.LinkedList.Node(i.data)))), s !== a.data.isConvex(this) && (s ? (this.convexVertices.remove(this.convexVertices.withData(a.data)), this.reflexVertices.append(new le.LinkedList.Node(a.data))) : (this.reflexVertices.remove(this.reflexVertices.withData(a.data)), this.convexVertices.append(new le.LinkedList.Node(a.data)))), this;
      }
    }
  }, {
    key: "contains",
    value: function(n) {
      return this.containsByWindingNumber(n);
    }
  }, {
    key: "containsByWindingNumber",
    value: function(n) {
      var r = n.elements || n;
      if (!this.plane.contains(r) || this.hasEdgeContaining(r))
        return !1;
      var i, a, o, s, h = 0, u, l = 0, f = this;
      return this.vertices.each(function(c) {
        i = c.data.elements, a = c.next.data.elements, o = new De.Vector([i[0] - r[0], i[1] - r[1], i[2] - (r[2] || 0)]), s = new De.Vector([a[0] - r[0], a[1] - r[1], a[2] - (r[2] || 0)]), u = o.angleFrom(s), !(u === null || u === 0) && (h += (o.cross(s).isParallelTo(f.plane.normal) ? 1 : -1) * u, h >= 2 * Math.PI - Gn.PRECISION && (l++, h -= 2 * Math.PI), h <= -2 * Math.PI + Gn.PRECISION && (l--, h += 2 * Math.PI));
      }), l !== 0;
    }
  }, {
    key: "hasEdgeContaining",
    value: function(n) {
      var r = n.elements || n, i = !1;
      return this.vertices.each(function(a) {
        tl.Line.Segment.create(a.data, a.next.data).contains(r) && (i = !0);
      }), i;
    }
  }, {
    key: "toTriangles",
    value: function() {
      return this.cached.triangles !== null ? this.cached.triangles : this.setCache("triangles", this.triangulateByEarClipping());
    }
    // Implementation of ear clipping algorithm
    // Found in 'Triangulation by ear clipping', by David Eberly
    // at http://www.geometrictools.com
    // This will not deal with overlapping sections - contruct your polygons
    // sensibly
  }, {
    key: "triangulateByEarClipping",
    value: function() {
      for (var n = this.dup(), r = [], i, a, o, s; !n.isTriangle(); ) {
        for (i = !1; !i; )
          i = !0, a = n.convexVertices.randomNode(), o = n.vertices.withData(a.data), s = new t([o.data, o.next.data, o.prev.data], this.plane), n.reflexVertices.each(function(h) {
            h.data !== o.prev.data && h.data !== o.next.data && (s.contains(h.data) || s.hasEdgeContaining(h.data)) && (i = !1);
          });
        r.push(s), n.removeVertex(o.data);
      }
      return r.push(new t(n.vertices, this.plane)), r;
    }
  }, {
    key: "setVertices",
    value: function(n, r) {
      var i = n.toArray ? n.toArray() : n;
      if (this.plane = r && r.normal ? r.dup() : Lt.Plane.fromPoints(i), this.plane === null)
        return null;
      this.vertices = new le.LinkedList.Circular();
      for (var a = i.length, o; a--; )
        o = i[a].isConvex ? i[a] : new t.Vertex(i[a]), this.vertices.prepend(new le.LinkedList.Node(o));
      return this.clearCache(), this.populateVertexTypeLists(), this;
    }
  }, {
    key: "populateVertexTypeLists",
    value: function() {
      this.convexVertices = new le.LinkedList.Circular(), this.reflexVertices = new le.LinkedList.Circular();
      var n = this;
      this.vertices.each(function(r) {
        n[r.data.type(n) + "Vertices"].append(new le.LinkedList.Node(r.data));
      });
    }
  }, {
    key: "copyVertices",
    value: function() {
      this.clearCache(), this.vertices.each(function(n) {
        n.data = new t.Vertex(n.data);
      }), this.populateVertexTypeLists();
    }
  }, {
    key: "clearCache",
    value: function() {
      this.cached = {
        triangles: null,
        surfaceIntegralElements: null
      };
    }
  }, {
    key: "setCache",
    value: function(n, r) {
      return this.cached[n] = r, r;
    }
  }, {
    key: "inspect",
    value: function() {
      var n = [];
      return this.vertices.each(function(r) {
        n.push(r.data.inspect());
      }), n.join(" -> ");
    }
  }]), t;
}();
var Bt = {};
Object.defineProperty(Bt, "__esModule", {
  value: !0
});
Bt.Vertex = void 0;
var rl = function() {
  function t(e, n) {
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }
  return function(e, n, r) {
    return n && t(e.prototype, n), r && t(e, r), e;
  };
}(), il = ve(), Vn = ce;
function al(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Wn(t, e) {
  if (!t)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e && (typeof e == "object" || typeof e == "function") ? e : t;
}
function sl(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
var Hn = Bt.Vertex = function(t) {
  sl(e, t);
  function e(n) {
    al(this, e);
    var r = Wn(this, Object.getPrototypeOf(e).call(this, n));
    if (r.setElements(n), r.elements.length === 2 && r.elements.push(0), r.elements.length !== 3) {
      var i;
      return i = null, Wn(r, i);
    }
    return r;
  }
  return rl(e, [{
    key: "isConvex",
    value: function(r) {
      var i = r.nodeFor(this);
      if (i === null)
        return null;
      var a = i.prev.data, o = i.next.data, s = o.subtract(this), h = a.subtract(this), u = s.angleFrom(h);
      return u <= Vn.PRECISION ? !0 : Math.abs(u - Math.PI) <= Vn.PRECISION ? !1 : s.cross(h).dot(r.plane.normal) > 0;
    }
    // Returns true iff the vertex's internal angle is 180 <= x < 360
  }, {
    key: "isReflex",
    value: function(r) {
      var i = this.isConvex(r);
      return i === null ? null : !i;
    }
  }, {
    key: "type",
    value: function(r) {
      var i = this.isConvex(r);
      return i === null ? null : i ? "convex" : "reflex";
    }
  }]), e;
}(il.Vector);
Hn.convert = function(t) {
  for (var e = t.toArray ? t.toArray() : t, n = [], r = e.length, i = 0; i < r; i++)
    n.push(new Hn(e[i]));
  return n;
};
var Ee = {};
Object.defineProperty(Ee, "__esModule", {
  value: !0
});
Ee.mht = ol;
Ee.makeLookAt = ll;
Ee.makeOrtho = ul;
Ee.makePerspective = hl;
Ee.makeFrustum = xr;
var Ut = ve(), mt = Fe();
function ol(t) {
  var e = "";
  if (t.length == 16)
    for (var n = 0; n < 4; n++)
      e += "<span style='font-family: monospace'>[" + t[n * 4 + 0].toFixed(4) + "," + t[n * 4 + 1].toFixed(4) + "," + t[n * 4 + 2].toFixed(4) + "," + t[n * 4 + 3].toFixed(4) + "]</span><br>";
  else if (t.length == 9)
    for (var n = 0; n < 3; n++)
      e += "<span style='font-family: monospace'>[" + t[n * 3 + 0].toFixed(4) + "," + t[n * 3 + 1].toFixed(4) + "," + t[n * 3 + 2].toFixed(4) + "]</font><br>";
  else
    return t.toString();
  return e;
}
function ll(t, e, n, r, i, a, o, s, h) {
  var u = new Ut.Vector([t, e, n]), l = new Ut.Vector([r, i, a]), f = new Ut.Vector([o, s, h]), c = u.subtract(l).toUnitVector(), d = f.cross(c).toUnitVector(), v = c.cross(d).toUnitVector(), g = new mt.Matrix([[d.e(1), d.e(2), d.e(3), 0], [v.e(1), v.e(2), v.e(3), 0], [c.e(1), c.e(2), c.e(3), 0], [0, 0, 0, 1]]), m = new mt.Matrix([[1, 0, 0, -t], [0, 1, 0, -e], [0, 0, 1, -n], [0, 0, 0, 1]]);
  return g.x(m);
}
function ul(t, e, n, r, i, a) {
  var o = -(e + t) / (e - t), s = -(r + n) / (r - n), h = -(a + i) / (a - i);
  return new mt.Matrix([[2 / (e - t), 0, 0, o], [0, 2 / (r - n), 0, s], [0, 0, -2 / (a - i), h], [0, 0, 0, 1]]);
}
function hl(t, e, n, r) {
  var i = n * Math.tan(t * Math.PI / 360), a = -i, o = a * e, s = i * e;
  return xr(o, s, a, i, n, r);
}
function xr(t, e, n, r, i, a) {
  var o = 2 * i / (e - t), s = 2 * i / (r - n), h = (e + t) / (e - t), u = (r + n) / (r - n), l = -(a + i) / (a - i), f = -2 * a * i / (a - i);
  return new mt.Matrix([[o, 0, h, 0], [0, s, u, 0], [0, 0, l, f], [0, 0, -1, 0]]);
}
(function(t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var e = wt;
  Object.defineProperty(t, "CircularLinkedList", {
    enumerable: !0,
    get: function() {
      return e.CircularLinkedList;
    }
  });
  var n = kt();
  Object.defineProperty(t, "Line", {
    enumerable: !0,
    get: function() {
      return n.Line;
    }
  });
  var r = Ct;
  Object.defineProperty(t, "LineSegment", {
    enumerable: !0,
    get: function() {
      return r.LineSegment;
    }
  });
  var i = Xe;
  Object.defineProperty(t, "LinkedList", {
    enumerable: !0,
    get: function() {
      return i.LinkedList;
    }
  });
  var a = un;
  Object.defineProperty(t, "LinkedListNode", {
    enumerable: !0,
    get: function() {
      return a.LinkedListNode;
    }
  });
  var o = Fe();
  Object.defineProperty(t, "Matrix", {
    enumerable: !0,
    get: function() {
      return o.Matrix;
    }
  });
  var s = Et();
  Object.defineProperty(t, "Plane", {
    enumerable: !0,
    get: function() {
      return s.Plane;
    }
  });
  var h = It;
  Object.defineProperty(t, "Polygon", {
    enumerable: !0,
    get: function() {
      return h.Polygon;
    }
  });
  var u = ve();
  Object.defineProperty(t, "Vector", {
    enumerable: !0,
    get: function() {
      return u.Vector;
    }
  });
  var l = Bt;
  Object.defineProperty(t, "Vertex", {
    enumerable: !0,
    get: function() {
      return l.Vertex;
    }
  });
  var f = Ee;
  Object.defineProperty(t, "mht", {
    enumerable: !0,
    get: function() {
      return f.mht;
    }
  }), Object.defineProperty(t, "makeLookAt", {
    enumerable: !0,
    get: function() {
      return f.makeLookAt;
    }
  }), Object.defineProperty(t, "makePerspective", {
    enumerable: !0,
    get: function() {
      return f.makePerspective;
    }
  }), Object.defineProperty(t, "makeFrustum", {
    enumerable: !0,
    get: function() {
      return f.makeFrustum;
    }
  }), Object.defineProperty(t, "makeOrtho", {
    enumerable: !0,
    get: function() {
      return f.makeOrtho;
    }
  });
  var c = ce;
  Object.defineProperty(t, "PRECISION", {
    enumerable: !0,
    get: function() {
      return c.PRECISION;
    }
  });
})(lt);
function Ft(t) {
  for (var e = t.length / 6 | 0, n = new Array(e), r = 0; r < e; )
    n[r] = "#" + t.slice(r * 6, ++r * 6);
  return n;
}
function Mt(t) {
  var e = t.length;
  return function(n) {
    return t[Math.max(0, Math.min(e - 1, Math.floor(n * e)))];
  };
}
Mt(Ft("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
Mt(Ft("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var fl = Mt(Ft("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
Mt(Ft("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
let cl = (
  /*glsl*/
  `precision highp float; 

uniform sampler2D input_tex;
uniform sampler2D lut_tex;  
uniform float diverging;  
varying vec2 tex_coord;     
void main(){
	float val = texture2D( input_tex, tex_coord ).r+0.5*diverging;
	vec4 color = texture2D( lut_tex, vec2(val, 0.5) );
	gl_FragColor = vec4(color.rgb,1.0);
}
`
), dl = (
  /*glsl*/
  `

attribute vec2 vertex;   
attribute vec2 texCoord; 
uniform mat4 uMVMatrix;  
uniform mat4 uPMatrix;   
varying vec2 tex_coord;  
void main(){
	tex_coord = texCoord; 
	gl_Position = uPMatrix * uMVMatrix * vec4( vertex, 0.0, 1.0 ); 
}

`
), gl = (
  /*glsl*/
  `precision highp float;

varying vec2 quad_coord; 
varying float v_kernel_weight; 
uniform float kernel_weightScale; 
void main(void) { 
	float len = length( quad_coord ); 
	float nrm = v_kernel_weight * kernel_weightScale * 0.3989422804014327 * exp( -0.5*25.0*len*len ); 
	// gl_FragColor = vec4(1,1,1,1.0);//vec4(nrm,nrm,nrm, nrm );	
	gl_FragColor = vec4(nrm,nrm,nrm, nrm );
	// gl_FragColor = vec4(1,1,1, 1.0 ); 
}

`
), vl = (
  /*glsl*/
  `

attribute vec3 position;
attribute float kernel_weight;

attribute vec2 offset;
// attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;

uniform mat4 uMVMatrix; 
uniform mat4 uPMatrix; 
uniform float bandwidthScale; 
uniform vec2 bandwidth; 
varying vec2 quad_coord; 
varying float v_kernel_weight; 

void main(void) { 
	// vec4 viewCenters = viewMatrix*vec4(position,1.0);
	// vec2 pos = (viewCenters).xy; 
	// quad_coord = offset.xy;  
	// pos += bandwidthScale * bandwidth * quad_coord; 
	// gl_Position = uPMatrix * uMVMatrix * vec4( pos, 0.0, 1.0); 
	


	float BoxCorrection = 1.5;
	float fullSize = bandwidthScale * 5.5;
	vec3 cameraRight = normalize(vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]));
	vec3 cameraUp = normalize(vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]));
	// vec4 viewCenters = viewMatrix*vec4(position+BoxCorrection*fullSize*(cameraRight*offset.x + cameraUp*offset.y),1.0);
	vec4 viewCenters = viewMatrix*vec4(position,1.0);
	viewCenters.xy += bandwidthScale * bandwidth * offset.xy;
	quad_coord = offset.xy; 
	v_kernel_weight = kernel_weight;
	gl_Position = projectionMatrix * viewCenters;
} 
`
);
function pt(t, e, n) {
  let r = t.createShader(n);
  return t.shaderSource(r, e), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (console.log(t.getShaderInfoLog(r)), null);
}
function ml(t) {
  let e = pt(t, gl, t.FRAGMENT_SHADER), n = pt(t, vl, t.VERTEX_SHADER), r = t.createProgram();
  return t.attachShader(r, n), t.attachShader(r, e), t.linkProgram(r), t.getProgramParameter(r, t.LINK_STATUS) || alert("Could not initialise shaders"), t.useProgram(r), r.vertexPositionAttribute = t.getAttribLocation(r, "position"), r.vertexKernelWeightAttribute = t.getAttribLocation(r, "kernel_weight"), r.vertexOffsetAttribute = t.getAttribLocation(r, "offset"), r.pMatrixUniform = t.getUniformLocation(r, "uPMatrix"), r.mvMatrixUniform = t.getUniformLocation(r, "uMVMatrix"), r.projectionMatrixUniform = t.getUniformLocation(r, "projectionMatrix"), r.viewMatrixUniform = t.getUniformLocation(r, "viewMatrix"), r.bandwidthUniform = t.getUniformLocation(r, "bandwidth"), r.bandwidthScaleUniform = t.getUniformLocation(r, "bandwidthScale"), r.kernel_weightScaleUniform = t.getUniformLocation(r, "kernel_weightScale"), r;
}
function pl(t) {
  let e = pt(t, cl, t.FRAGMENT_SHADER), n = pt(t, dl, t.VERTEX_SHADER), r = t.createProgram();
  return t.attachShader(r, n), t.attachShader(r, e), t.linkProgram(r), t.getProgramParameter(r, t.LINK_STATUS) || alert("Could not initialise shaders"), t.useProgram(r), r.vertexAttribute = t.getAttribLocation(r, "vertex"), r.texCoordAttribute = t.getAttribLocation(r, "texCoord"), r.pMatrixUniform = t.getUniformLocation(r, "uPMatrix"), r.mvMatrixUniform = t.getUniformLocation(r, "uMVMatrix"), r.input_texUniform = t.getUniformLocation(r, "input_tex"), r.lut_texUniform = t.getUniformLocation(r, "lut_tex"), r.divergingUniform = t.getUniformLocation(r, "diverging"), r;
}
function ue(t) {
  console.log(t);
}
class Al {
  constructor(e, n, r, i = 0.1) {
    this.gl = e, this.FBO, this.lutShader, this.shaderProgram, this.mvMatrix, this.pMatrix, this.qualityScale = i, this._divergingColormap = !1, this.bandwidth = [5.5, 5.5], this.bandwidthScale = 5, this.kernel_weightScale = 0.5, this.triangleVertexPositionBuffer, this.squareVertexPositionBuffer, this.PANEL_TEX_COORDS = [0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1], this.PANEL_TEX_POS = [0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1], this.QUAD_POS_BUFFER, this.QUAD_COORD_BUFFER, this.LUT_TEX, this.DATA = null, this.kernel_weights = null, this.resize(n, r), this.shaderProgram = ml(this.gl), this.lutShader = pl(this.gl), this.initBuffers(), this.setColormap();
  }
  loadIdentity() {
    this.mvMatrix = lt.Matrix.I(4);
  }
  multMatrix(e) {
    this.mvMatrix = this.mvMatrix.x(e);
  }
  mvScale(e) {
    this.mvMatrix.elements[0][0] *= e[0], this.mvMatrix.elements[0][1] *= e[0], this.mvMatrix.elements[0][2] *= e[0], this.mvMatrix.elements[0][3] *= e[0], this.mvMatrix.elements[1][0] *= e[1], this.mvMatrix.elements[1][1] *= e[1], this.mvMatrix.elements[1][2] *= e[1], this.mvMatrix.elements[1][3] *= e[1], this.mvMatrix.elements[2][0] *= e[2], this.mvMatrix.elements[2][1] *= e[2], this.mvMatrix.elements[2][2] *= e[2], this.mvMatrix.elements[2][3] *= e[2];
  }
  mvTranslate(e) {
    var n = lt.Matrix.Translation($V([e[0], e[1], e[2]])).ensure4x4();
    this.multMatrix(n);
  }
  perspective(e, n, r, i) {
    this.pMatrix = makePerspective(e, n, r, i);
  }
  ortho(e, n, r, i) {
    this.pMatrix = lt.makeOrtho(e, n, r, i, -1, 1);
  }
  setMatrixUniforms(e) {
    this.gl.uniformMatrix4fv(e.pMatrixUniform, !1, new Float32Array(this.pMatrix.flatten())), this.gl.uniformMatrix4fv(e.mvMatrixUniform, !1, new Float32Array(this.mvMatrix.flatten()));
  }
  initBuffers() {
    let e = this.gl;
    this.triangleVertexPositionBuffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, this.triangleVertexPositionBuffer);
    var n = [
      0,
      1,
      0,
      -1,
      -1,
      0,
      1,
      -1,
      0
    ];
    e.bufferData(e.ARRAY_BUFFER, new Float32Array(n), e.STATIC_DRAW), this.triangleVertexPositionBuffer.itemSize = 3, this.triangleVertexPositionBuffer.numItems = 3, this.squareVertexPositionBuffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, this.squareVertexPositionBuffer), n = [
      1,
      1,
      0,
      -1,
      1,
      0,
      1,
      -1,
      0,
      -1,
      -1,
      0
    ], e.bufferData(e.ARRAY_BUFFER, new Float32Array(n), e.STATIC_DRAW), this.squareVertexPositionBuffer.itemSize = 3, this.squareVertexPositionBuffer.numItems = 4, this.QUAD_POS_BUFFER = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, this.QUAD_POS_BUFFER), e.bufferData(e.ARRAY_BUFFER, new Float32Array(this.PANEL_TEX_POS), e.STATIC_DRAW), this.QUAD_POS_BUFFER.itemSize = 2, this.QUAD_POS_BUFFER.numItems = 6, this.QUAD_COORD_BUFFER = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, this.QUAD_COORD_BUFFER), e.bufferData(e.ARRAY_BUFFER, new Float32Array(this.PANEL_TEX_COORDS), e.STATIC_DRAW), this.QUAD_COORD_BUFFER.itemSize = 2, this.QUAD_COORD_BUFFER.numItems = 6, this.nodesGeometry = Ar(e, !1, !1);
  }
  drawScene(e, n) {
    let r = this.width, i = this.height, a = this.gl, o = a.getExtension("ANGLE_instanced_arrays"), s = a.getParameter(a.FRAMEBUFFER_BINDING), h = a.getParameter(a.VIEWPORT);
    a.viewport(0, 0, r * this.qualityScale, i * this.qualityScale), this.ortho(0, r, i, 0), this.loadIdentity(), this.projectionMatrix = e, this.viewMatrix = n, a.bindFramebuffer(a.FRAMEBUFFER, this.FBO.id), a.clearColor(0, 0, 0, 1), a.clear(a.COLOR_BUFFER_BIT), a.enable(a.BLEND), a.blendFunc(a.ONE, a.ONE), a.useProgram(this.shaderProgram), this.setMatrixUniforms(this.shaderProgram), a.uniform1f(this.shaderProgram.bandwidthScaleUniform, this.bandwidthScale), a.uniformMatrix4fv(this.shaderProgram.viewMatrixUniform, !1, this.viewMatrix), a.uniformMatrix4fv(this.shaderProgram.projectionMatrixUniform, !1, this.projectionMatrix), a.uniform2f(this.shaderProgram.bandwidthUniform, this.bandwidth[0], this.bandwidth[1]), a.uniform1f(this.shaderProgram.kernel_weightScaleUniform, this.kernel_weightScale), a.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute), a.enableVertexAttribArray(this.shaderProgram.vertexKernelWeightAttribute), a.enableVertexAttribArray(this.shaderProgram.vertexOffsetAttribute), a.bindBuffer(a.ARRAY_BUFFER, this.nodesGeometry.vertexObject), a.vertexAttribPointer(this.shaderProgram.vertexOffsetAttribute, 3, a.FLOAT, !1, 0, 0), o.vertexAttribDivisorANGLE(this.shaderProgram.vertexOffsetAttribute, 0), a.bindBuffer(a.ARRAY_BUFFER, this.kernelWeightsBuffer), a.vertexAttribPointer(this.shaderProgram.vertexKernelWeightAttribute, 1, a.FLOAT, !1, 0, 0), o.vertexAttribDivisorANGLE(this.shaderProgram.vertexKernelWeightAttribute, 1), a.bindBuffer(a.ARRAY_BUFFER, this.positionsBuffer), a.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.positionsBuffer.itemSize, a.FLOAT, !1, 0, 0), o.vertexAttribDivisorANGLE(this.shaderProgram.vertexPositionAttribute, 1), this.nodesGeometry.indexObject ? o.drawElementsInstancedANGLE(a.TRIANGLES, this.nodesGeometry.numIndices, this.nodesGeometry.indexType, 0, this.positionsBuffer.numItems) : o.drawArraysInstancedANGLE(a.TRIANGLE_STRIP, 0, this.nodesGeometry.numIndices, this.positionsBuffer.numItems), o.vertexAttribDivisorANGLE(this.shaderProgram.vertexPositionAttribute, 0), o.vertexAttribDivisorANGLE(this.shaderProgram.vertexKernelWeightAttribute, 0), a.bindFramebuffer(a.FRAMEBUFFER, s), a.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute), a.disableVertexAttribArray(this.shaderProgram.vertexKernelWeightAttribute), a.disableVertexAttribArray(this.shaderProgram.vertexOffsetAttribute), a.disable(a.BLEND), a.viewport(h[0], h[1], h[2], h[3]), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, this.FBO.tex), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.LUT_TEX), a.useProgram(this.lutShader), a.enableVertexAttribArray(this.lutShader.vertexAttribute), a.enableVertexAttribArray(this.lutShader.texCoordAttribute), a.uniform1i(this.lutShader.input_texUniform, 0), a.uniform1i(this.lutShader.lut_texUniform, 1), a.uniform1f(this.lutShader.divergingUniform, +this._divergingColormap), this.ortho(0, 1, 0, 1), this.loadIdentity(), this.setMatrixUniforms(this.lutShader), a.bindBuffer(a.ARRAY_BUFFER, this.QUAD_POS_BUFFER), a.vertexAttribPointer(this.lutShader.vertexAttribute, this.QUAD_POS_BUFFER.itemSize, a.FLOAT, !1, 0, 0), a.bindBuffer(a.ARRAY_BUFFER, this.QUAD_COORD_BUFFER), a.vertexAttribPointer(this.lutShader.texCoordAttribute, this.QUAD_COORD_BUFFER.itemSize, a.FLOAT, !1, 0, 0), a.drawArrays(a.TRIANGLES, 0, this.QUAD_POS_BUFFER.numItems), a.disableVertexAttribArray(this.lutShader.vertexAttribute), a.disableVertexAttribArray(this.lutShader.texCoordAttribute);
  }
  resize(e, n, r = !1) {
    (this.width !== e || this.height !== n || r) && (e > 0 && (this.width = e), n > 0 && (this.height = n), this.deleteFBO(), this.create_FBO());
  }
  create_FBO() {
    let e = this.width * this.qualityScale, n = this.height * this.qualityScale, r = this.gl;
    try {
      var i = r.getExtension("OES_texture_float"), a = r.getExtension("OES_texture_float_linear");
    } catch {
      var i = !1, a = !1;
    }
    let o = {};
    o.id = r.createFramebuffer(), o.tex = r.createTexture(), r.bindTexture(r.TEXTURE_2D, o.tex), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), i && a ? (ue("[ OK ] Floating point textures (OES_texture_float) is supported"), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, e, n, 0, r.RGBA, r.FLOAT, null)) : (ue("[FAIL] Floating point textures (OES_texture_float) is <B>NOT</B> supported, falling back to 8 bit blending. OES_texture_float is supported in Chrome dev version."), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, e, n, 0, r.RGBA, r.UNSIGNED_BYTE, null)), r.bindTexture(r.TEXTURE_2D, null), r.bindFramebuffer(r.FRAMEBUFFER, o.id), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, o.tex, 0);
    let s = r.checkFramebufferStatus(r.FRAMEBUFFER);
    s == r.FRAMEBUFFER_COMPLETE ? ue("[ OK ] Framebuffer Initialization") : s == r.FRAMEBUFFER_INCOMPLETE_ATTACHMENT ? ue("[FAIL] Framebuffer Creation FAIL GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT <br/>               Not all framebuffer attachment points are framebuffer attachment complete.") : s == r.FRAMEBUFFER_INCOMPLETE_DIMENSIONS ? ue("[FAIL] Framebuffer Creation FAIL GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS <br/>               Not all attached images have the same width and height. ") : s == r.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT ? ue("[FAIL] Framebuffer Creation FAIL GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT <br/> No images are attached to the framebuffer. ") : s == r.FRAMEBUFFER_INCOMPLETE_UNSUPPORTED ? ue("[FAIL] Framebuffer Creation FAIL GL_FRAMEBUFFER_INCOMPLETE_UNSUPPORTED <br/> The combination of internal formats of the attached images violates an implementation-dependent set of restrictions.") : s == r.FRAMEBUFFER_UNSUPPORTED ? ue("[FAIL] Framebuffer Creation FAIL GL_FRAMEBUFFER_UNSUPPORTED <br/>             The combination of internal formats of the attached images violates an implementation-dependent set of restrictions.") : ue("[FAIL] Framebuffer Creation FAIL Unknown Error"), r.bindFramebuffer(r.FRAMEBUFFER, null), this.FBO = o;
  }
  deleteFBO() {
    if (this.FBO) {
      let e = this.gl;
      e.deleteFramebuffer(this.FBO.id), e.deleteTexture(this.FBO.tex);
    }
  }
  setBandwidth(e) {
    this.bandwidthScale = e;
  }
  setKernelWeightScale(e) {
    this.kernel_weightScale = e;
  }
  setColormap(e, n = 0) {
    self = this;
    let r = this.gl, i = r.createTexture();
    r.bindTexture(r.TEXTURE_2D, i), n <= 0 && (n = 1024), e || (e = fl);
    var a = new Uint8Array(n * 4);
    for (let o = 0; o < n; o++) {
      let s = o / (n - 1), h = We(e(s));
      a[o * 4 + 0] = h.r, a[o * 4 + 1] = h.g, a[o * 4 + 2] = h.b, a[o * 4 + 3] = 0.1;
    }
    r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, n, 1, 0, r.RGBA, r.UNSIGNED_BYTE, a), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.bindTexture(r.TEXTURE_2D, null), this.LUT_TEX = i;
  }
  setData(e) {
    this.DATA = e, this.updateTheDatabuffer();
  }
  setWeights(e) {
    this.kernel_weights = e, this.updateTheKernelWeightsBuffer();
  }
  update_span() {
    for (let e = 0; e < this.DATA.length; e += 1)
      this.DATA[e][0], this.DATA[e][1];
  }
  updateTheDatabuffer() {
    let e = this.gl;
    this.positionsBuffer || (this.positionsBuffer = e.createBuffer(), this.positionsBuffer.itemSize = 3), e.bindBuffer(e.ARRAY_BUFFER, this.positionsBuffer), e.bufferData(e.ARRAY_BUFFER, this.DATA, e.DYNAMIC_DRAW), this.positionsBuffer.numItems = this.DATA.length / 3, this.update_span();
  }
  updateTheKernelWeightsBuffer() {
    let e = this.gl;
    this.kernelWeightsBuffer || (this.kernelWeightsBuffer = e.createBuffer(), this.kernelWeightsBuffer.itemSize = 1), e.bindBuffer(e.ARRAY_BUFFER, this.kernelWeightsBuffer), e.bufferData(e.ARRAY_BUFFER, this.kernel_weights, e.DYNAMIC_DRAW), this.kernelWeightsBuffer.numItems = this.kernel_weights.length;
  }
  qualityScale(e) {
    return e === void 0 ? this.quality_scale : (this.quality_scale != e && (this.quality_scale = e, this.resize(0, 0, !0)), this);
  }
  divergingColormap(e) {
    return e === void 0 ? this._divergingColormap : (this._divergingColormap != e && (this._divergingColormap = e, console.log("DIVERGING COLORMAP", e)), this);
  }
  cleanup() {
    let e = this.gl;
    e.deleteBuffer(this.positionsBuffer), e.deleteBuffer(this.kernelWeightsBuffer), e.deleteTexture(this.LUT_TEX), e.deleteProgram(this.program), e.deleteFramebuffer(this.framebuffer), e.deleteRenderbuffer(this.renderbuffer), e.deleteTexture(this.texture), this.positionsBuffer = null, this.kernelWeightsBuffer = null, this.LUT_TEX = null, this.program = null, this.framebuffer = null, this.renderbuffer = null, this.texture = null, this.DATA = null, this.kernel_weights = null, this.BUFFER_LIST = null, this.gl = null;
  }
}
function yl(t, e = (n) => n.key) {
  var n = [];
  return $t(t, "", !0, (r) => n.push(r), e), n.join("");
}
function $t(t, e, n, r, i) {
  if (t) {
    r(`${e}${n ? "└── " : "├── "}${i(t)}
`);
    const a = e + (n ? "    " : "│   ");
    t.left && $t(t.left, a, !1, r, i), t.right && $t(t.right, a, !0, r, i);
  }
}
function Zt(t) {
  if (t === null)
    return !0;
  var e = At(t.left), n = At(t.right);
  return !!(Math.abs(e - n) <= 1 && Zt(t.left) && Zt(t.right));
}
function At(t) {
  return t ? 1 + Math.max(At(t.left), At(t.right)) : 0;
}
function Kt(t, e, n, r, i) {
  const a = i - r;
  if (a > 0) {
    const o = r + Math.floor(a / 2), s = e[o], h = n[o], u = { key: s, data: h, parent: t };
    return u.left = Kt(u, e, n, r, o), u.right = Kt(u, e, n, o + 1, i), u;
  }
  return null;
}
function Jt(t) {
  if (t === null)
    return 0;
  const e = Jt(t.left), n = Jt(t.right);
  return t.balanceFactor = e - n, Math.max(e, n) + 1;
}
function en(t, e, n, r, i) {
  if (n >= r)
    return;
  const a = t[n + r >> 1];
  let o = n - 1, s = r + 1;
  for (; ; ) {
    do
      o++;
    while (i(t[o], a) < 0);
    do
      s--;
    while (i(t[s], a) > 0);
    if (o >= s)
      break;
    let h = t[o];
    t[o] = t[s], t[s] = h, h = e[o], e[o] = e[s], e[s] = h;
  }
  en(t, e, n, s, i), en(t, e, s + 1, r, i);
}
function _l(t, e) {
  return t > e ? 1 : t < e ? -1 : 0;
}
function tt(t) {
  var e = t.right;
  return t.right = e.left, e.left && (e.left.parent = t), e.parent = t.parent, e.parent && (e.parent.left === t ? e.parent.left = e : e.parent.right = e), t.parent = e, e.left = t, t.balanceFactor += 1, e.balanceFactor < 0 && (t.balanceFactor -= e.balanceFactor), e.balanceFactor += 1, t.balanceFactor > 0 && (e.balanceFactor += t.balanceFactor), e;
}
function nt(t) {
  var e = t.left;
  return t.left = e.right, t.left && (t.left.parent = t), e.parent = t.parent, e.parent && (e.parent.left === t ? e.parent.left = e : e.parent.right = e), t.parent = e, e.right = t, t.balanceFactor -= 1, e.balanceFactor > 0 && (t.balanceFactor -= e.balanceFactor), e.balanceFactor -= 1, t.balanceFactor < 0 && (e.balanceFactor += t.balanceFactor), e;
}
class yt {
  /**
   * Callback for comparator
   * @callback comparatorCallback
   * @param {Key} a
   * @param {Key} b
   * @returns {number}
   */
  /**
   * @class AVLTree
   * @constructor
   * @param  {comparatorCallback} [comparator]
   * @param  {boolean}            [noDuplicates=false] Disallow duplicates
   */
  constructor(e, n = !1) {
    this._comparator = e || _l, this._root = null, this._size = 0, this._noDuplicates = !!n;
  }
  /**
   * Clear the tree
   * @return {AVLTree}
   */
  destroy() {
    return this.clear();
  }
  /**
   * Clear the tree
   * @return {AVLTree}
   */
  clear() {
    return this._root = null, this._size = 0, this;
  }
  /**
   * Number of nodes
   * @return {number}
   */
  get size() {
    return this._size;
  }
  /**
   * Whether the tree contains a node with the given key
   * @param  {Key} key
   * @return {boolean} true/false
   */
  contains(e) {
    if (this._root)
      for (var n = this._root, r = this._comparator; n; ) {
        var i = r(e, n.key);
        if (i === 0)
          return !0;
        i < 0 ? n = n.left : n = n.right;
      }
    return !1;
  }
  /* eslint-disable class-methods-use-this */
  /**
   * Successor node
   * @param  {Node} node
   * @return {?Node}
   */
  next(e) {
    var n = e;
    if (n)
      if (n.right)
        for (n = n.right; n.left; )
          n = n.left;
      else
        for (n = e.parent; n && n.right === e; )
          e = n, n = n.parent;
    return n;
  }
  /**
   * Predecessor node
   * @param  {Node} node
   * @return {?Node}
   */
  prev(e) {
    var n = e;
    if (n)
      if (n.left)
        for (n = n.left; n.right; )
          n = n.right;
      else
        for (n = e.parent; n && n.left === e; )
          e = n, n = n.parent;
    return n;
  }
  /* eslint-enable class-methods-use-this */
  /**
   * Callback for forEach
   * @callback forEachCallback
   * @param {Node} node
   * @param {number} index
   */
  /**
   * @param  {forEachCallback} callback
   * @return {AVLTree}
   */
  forEach(e) {
    for (var n = this._root, r = [], i = !1, a = 0; !i; )
      n ? (r.push(n), n = n.left) : r.length > 0 ? (n = r.pop(), e(n, a++), n = n.right) : i = !0;
    return this;
  }
  /**
   * Walk key range from `low` to `high`. Stops if `fn` returns a value.
   * @param  {Key}      low
   * @param  {Key}      high
   * @param  {Function} fn
   * @param  {*?}       ctx
   * @return {SplayTree}
   */
  range(e, n, r, i) {
    const a = [], o = this._comparator;
    let s = this._root, h;
    for (; a.length !== 0 || s; )
      if (s)
        a.push(s), s = s.left;
      else {
        if (s = a.pop(), h = o(s.key, n), h > 0)
          break;
        if (o(s.key, e) >= 0 && r.call(i, s))
          return this;
        s = s.right;
      }
    return this;
  }
  /**
   * Returns all keys in order
   * @return {Array<Key>}
   */
  keys() {
    for (var e = this._root, n = [], r = [], i = !1; !i; )
      e ? (n.push(e), e = e.left) : n.length > 0 ? (e = n.pop(), r.push(e.key), e = e.right) : i = !0;
    return r;
  }
  /**
   * Returns `data` fields of all nodes in order.
   * @return {Array<Value>}
   */
  values() {
    for (var e = this._root, n = [], r = [], i = !1; !i; )
      e ? (n.push(e), e = e.left) : n.length > 0 ? (e = n.pop(), r.push(e.data), e = e.right) : i = !0;
    return r;
  }
  /**
   * Returns node at given index
   * @param  {number} index
   * @return {?Node}
   */
  at(e) {
    for (var n = this._root, r = [], i = !1, a = 0; !i; )
      if (n)
        r.push(n), n = n.left;
      else if (r.length > 0) {
        if (n = r.pop(), a === e)
          return n;
        a++, n = n.right;
      } else
        i = !0;
    return null;
  }
  /**
   * Returns node with the minimum key
   * @return {?Node}
   */
  minNode() {
    var e = this._root;
    if (!e)
      return null;
    for (; e.left; )
      e = e.left;
    return e;
  }
  /**
   * Returns node with the max key
   * @return {?Node}
   */
  maxNode() {
    var e = this._root;
    if (!e)
      return null;
    for (; e.right; )
      e = e.right;
    return e;
  }
  /**
   * Min key
   * @return {?Key}
   */
  min() {
    var e = this._root;
    if (!e)
      return null;
    for (; e.left; )
      e = e.left;
    return e.key;
  }
  /**
   * Max key
   * @return {?Key}
   */
  max() {
    var e = this._root;
    if (!e)
      return null;
    for (; e.right; )
      e = e.right;
    return e.key;
  }
  /**
   * @return {boolean} true/false
   */
  isEmpty() {
    return !this._root;
  }
  /**
   * Removes and returns the node with smallest key
   * @return {?Node}
   */
  pop() {
    var e = this._root, n = null;
    if (e) {
      for (; e.left; )
        e = e.left;
      n = { key: e.key, data: e.data }, this.remove(e.key);
    }
    return n;
  }
  /**
   * Removes and returns the node with highest key
   * @return {?Node}
   */
  popMax() {
    var e = this._root, n = null;
    if (e) {
      for (; e.right; )
        e = e.right;
      n = { key: e.key, data: e.data }, this.remove(e.key);
    }
    return n;
  }
  /**
   * Find node by key
   * @param  {Key} key
   * @return {?Node}
   */
  find(e) {
    for (var n = this._root, r = n, i, a = this._comparator; r; ) {
      if (i = a(e, r.key), i === 0)
        return r;
      i < 0 ? r = r.left : r = r.right;
    }
    return null;
  }
  /**
   * Insert a node into the tree
   * @param  {Key} key
   * @param  {Value} [data]
   * @return {?Node}
   */
  insert(e, n) {
    if (!this._root)
      return this._root = {
        parent: null,
        left: null,
        right: null,
        balanceFactor: 0,
        key: e,
        data: n
      }, this._size++, this._root;
    var r = this._comparator, i = this._root, a = null, o = 0;
    if (this._noDuplicates)
      for (; i; ) {
        if (o = r(e, i.key), a = i, o === 0)
          return null;
        o < 0 ? i = i.left : i = i.right;
      }
    else
      for (; i; )
        o = r(e, i.key), a = i, o <= 0 ? i = i.left : i = i.right;
    var s = {
      left: null,
      right: null,
      balanceFactor: 0,
      parent: a,
      key: e,
      data: n
    }, h;
    for (o <= 0 ? a.left = s : a.right = s; a && (o = r(a.key, e), o < 0 ? a.balanceFactor -= 1 : a.balanceFactor += 1, a.balanceFactor !== 0); ) {
      if (a.balanceFactor < -1) {
        a.right.balanceFactor === 1 && nt(a.right), h = tt(a), a === this._root && (this._root = h);
        break;
      } else if (a.balanceFactor > 1) {
        a.left.balanceFactor === -1 && tt(a.left), h = nt(a), a === this._root && (this._root = h);
        break;
      }
      a = a.parent;
    }
    return this._size++, s;
  }
  /**
   * Removes the node from the tree. If not found, returns null.
   * @param  {Key} key
   * @return {?Node}
   */
  remove(e) {
    if (!this._root)
      return null;
    for (var n = this._root, r = this._comparator, i = 0; n && (i = r(e, n.key), i !== 0); )
      i < 0 ? n = n.left : n = n.right;
    if (!n)
      return null;
    var a = n.key, o, s;
    if (n.left) {
      for (o = n.left; o.left || o.right; ) {
        for (; o.right; )
          o = o.right;
        n.key = o.key, n.data = o.data, o.left && (n = o, o = o.left);
      }
      n.key = o.key, n.data = o.data, n = o;
    }
    if (n.right) {
      for (s = n.right; s.left || s.right; ) {
        for (; s.left; )
          s = s.left;
        n.key = s.key, n.data = s.data, s.right && (n = s, s = s.right);
      }
      n.key = s.key, n.data = s.data, n = s;
    }
    for (var h = n.parent, u = n, l; h && (h.left === u ? h.balanceFactor -= 1 : h.balanceFactor += 1, h.balanceFactor < -1 ? (h.right.balanceFactor === 1 && nt(h.right), l = tt(h), h === this._root && (this._root = l), h = l) : h.balanceFactor > 1 && (h.left.balanceFactor === -1 && tt(h.left), l = nt(h), h === this._root && (this._root = l), h = l), !(h.balanceFactor === -1 || h.balanceFactor === 1)); )
      u = h, h = h.parent;
    return n.parent && (n.parent.left === n ? n.parent.left = null : n.parent.right = null), n === this._root && (this._root = null), this._size--, a;
  }
  /**
   * Bulk-load items
   * @param  {Array<Key>}  keys
   * @param  {Array<Value>}  [values]
   * @return {AVLTree}
   */
  load(e = [], n = [], r) {
    if (this._size !== 0)
      throw new Error("bulk-load: tree is not empty");
    const i = e.length;
    return r && en(e, n, 0, i - 1, this._comparator), this._root = Kt(null, e, n, 0, i), Jt(this._root), this._size = i, this;
  }
  /**
   * Returns true if the tree is balanced
   * @return {boolean}
   */
  isBalanced() {
    return Zt(this._root);
  }
  /**
   * String representation of the tree - primitive horizontal print-out
   * @param  {Function(Node):string} [printNode]
   * @return {string}
   */
  toString(e) {
    return yl(this._root, e);
  }
}
yt.default = yt;
class xl {
  constructor(e = !0) {
    this.map = /* @__PURE__ */ new Map(), this.ascending = e, this.ascending ? this.tree = new yt((n, r) => n.key === r.key ? 0 : n.value === r.value ? n.key < r.key ? -1 : 1 : n.value - r.value) : this.tree = new yt((n, r) => n.key === r.key ? 0 : n.value === r.value ? n.key < r.key ? -1 : 1 : r.value - n.value);
  }
  set(e, n) {
    if (this.map.has(e)) {
      const r = this.map.get(e);
      this.tree.remove({ key: e, value: r });
    }
    this.map.set(e, n), this.tree.insert({ key: e, value: n });
  }
  delete(e) {
    if (this.map.has(e)) {
      const n = this.map.get(e);
      this.map.delete(e), this.tree.remove({ key: e, value: n });
    }
  }
  get(e) {
    return this.map.get(e);
  }
  getSortedKeys() {
    return this.tree.keys().map((e) => e.key);
  }
  getSortedPairs() {
    return this.tree.keys().map((e) => [e.key, e.value]);
  }
}
let bl = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
function wl(t, e = 250) {
  let n = !1;
  return (...r) => {
    n || (t(...r), n = !0, setTimeout(() => {
      n = !1;
    }, e));
  };
}
class jl {
  // the class constructor
  /**
   * constructor description
   * @param {Object} config - The configuration object
   * @param {string} [config.elementID="helios"] - The ID of the element to attach the canvas to
   * @param {boolean} [config.density=false] - Whether to display the density
   * @param {Object} [config.nodes={}] - The nodes object. should be a dictionary of node IDs and node attributes.
   * 		@see {@link Network#addNodes}
   * @param {Object[]} [config.edges=[]] - The edges array of objects. Each object should have source and target attributes.
   * 		@see {@link Network#addEdges}
   * @param {Network} [network=null] - Alternavely, a network object can be passed directly. If this is the case, the nodes and edges parameters are ignored.
   * 		@see {@link Network}
   * @param {boolean} [config.use2D=false] - Whether to use 2D mode
   * @param {boolean} [config.orthographic=false] - Whether to use orthographic projection instead of perspective
   * @param {boolean} [config.hyperbolic=false] - Whether to use hyperbolic mode
   * @param {boolean} [config.fastEdges=false] - Whether to use fast edges (edges have always 1 pixel width)
   * @param {boolean} [config.forceSupersample=false] - Whether to force supersampling (improves quality of the render even for high density displays)
   * @param {boolean} [config.autoStartLayout=true] - Whether to start the layout automatically
   * @param {boolean} [config.autoCleanup=true] - Whether to automatically cleanup helios if canvas or element is removed (useful for react and vue)
   * @param {Object} [config.webglOptions=defaults] - The webgl options object. See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext|getContext} for more information.
   * Defaults to 
   * 
   * 	{
   * 		antialias: true,
   * 		powerPreference: "high-performance",
   * 		desynchronized: true,
   * 	}
   * 
   * 
   * @example <caption>Example usage of the constructor.</caption>
   * // create a new helios object
   * let helios = new Helios({
   * 	elementID: "helios",
   * 	nodes: {
   * 		"0": {label: "Node 0"},
   * 		"1": {label: "Node 1"},
   * 		"2": {label: "Node 2"},
   * 		"3": {label: "Node 3"},
   * 	},
   * 	edges: [
   * 		{source: "0", target: "1"},
   * 		{source: "1", target: "2"},
   * 		{source: "2", target: "3"},
   * 		{source: "3", target: "0"},
   * 	],
   * });
   * 
  */
  constructor({
    element: e = null,
    elementID: n = null,
    density: r = !1,
    nodes: i = {},
    edges: a = [],
    network: o = null,
    use2D: s = !1,
    orthographic: h = !1,
    hyperbolic: u = !1,
    fastEdges: l = !1,
    tracking: f = !0,
    fieldOfView: c = 70,
    forceSupersample: d = !1,
    autoStartLayout: v = !0,
    autoCleanup: g = !0,
    // cleanup helios if canvas or element is removed
    webglOptions: m = {}
  }) {
    if (this.element = null, e == null ? this.element = document.getElementById(n) : this.element = e, this.element.innerHTML = "", getComputedStyle(this.element).position === "static" && (this.container.style.position = "relative"), this.canvasElement = document.createElement("canvas"), this.canvasElement.style.position = "absolute", this.canvasElement.style.width = "100%", this.canvasElement.style.height = "100%", this.canvasElement.style.display = "block", this.canvasElement.style.boxSizing = "border-box", this.element.appendChild(this.canvasElement), this.svgLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svgLayer.style.position = "absolute", this.svgLayer.style.width = "100%", this.svgLayer.style.height = "100%", this.svgLayer.style.display = "block", this.svgLayer.style.boxSizing = "border-box", this.svgLayer.style.pointerEvents = "none", this.element.appendChild(this.svgLayer), this._canvasMargins = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }, this.overlay = document.createElement("div"), this.overlay.style.position = "absolute", this.overlay.style.width = "100%", this.overlay.style.height = "100%", this.overlay.style.display = "block", this.overlay.style.boxSizing = "border-box", this.overlay.style.pointerEvents = "none", this.element.appendChild(this.overlay), o == null ? this.network = new ko(i, a) : this.network = o, this._autoCleanup = g, this._hasCleanup = !1, this.rotationMatrix = Re(), this.translatePosition = ot(), this.lastTranslatePosition = ot(), this.targetTranslatePosition = ot(), this.lastPanX = 0, this.lastPanY = 0, this.panX = 0, this.panY = 0, this._fieldOfView = c, this.targetPanX = 0, this.targetPanY = 0, this.translateTime = 0, this.translateDuration = 0, this.mouseDown = !1, this.lastMouseX = null, this.lastMouseY = null, this.redrawingFromMouseWheelEvent = !1, this.fastEdges = l, this.animate = !1, this.useShadedNodes = !1, this.forceSupersample = d, this.cameraDistance = 500, this.interacting = !1, this.rotateLinearX = 0, this.rotateLinearY = 0, this.saveResolutionRatio = 1, this.pickingResolutionRatio = 0.25, this._trackingMaxPixels = 2e4, this._trackingBufferEnabled = f, this._trackingBuffer = null, this._trackingBufferTexture = null, this._trackingBufferPixels = null, this._attributeTrackers = {}, this._trackingNodeDataMinimumUpdateInterval = 200, this._trackingNodeMinimumUpdateInterval = 1e3 / 30, this._updateTrackerNodesDataThrottle = wl(() => {
      this._updateTrackerNodesData();
    }, this._trackingNodeDataMinimumUpdateInterval), this._lastCanvasDimensions = [this.canvasElement.clientWidth, this.canvasElement.clientHeight], this._zoomFactor = 1, this._semanticZoomExponent = 0.25, this._nodesGlobalOpacityScale = 1, this._nodesGlobalOpacityBase = 0, this._nodesGlobalSizeScale = 1, this._nodesGlobalSizeBase = 0, this._edgesGlobalOpacityScale = 1, this._edgesGlobalOpacityBase = 0, this._edgesGlobalWidthScale = 0.25, this._edgesGlobalWidthBase = 0, this._nodesGlobalOutlineWidthScale = 1, this._nodesGlobalOutlineWidthBase = 0, this._edgesColorsFromNodes = !0, this._edgesWidthFromNodes = !0, this._backgroundColor = [0.5, 0.5, 0.5, 1], this._use2D = s || u, this._orthographic = h || s, this._hyperbolic = u, this._autoStartLayout = v, this.useAdditiveBlending = !1, this._pickeableEdges = /* @__PURE__ */ new Set(), this.scheduler = new Co(this, { throttle: !1 }), this._webglOptions = m, this._use2D)
      for (let b = 0; b < this.network.positions.length; b++)
        this.network.positions[b * 3 + 2] = 0;
    this._edgeIndicesUpdate = !0, Ot(this.rotationMatrix), this.gl = go(this.canvasElement, this._webglOptions), r && (this.densityMap = new Al(this.gl, this.canvasElement.clientWidth, this.canvasElement.clientHeight), this.densityMap.setBandwidth(10), this.densityMap.setKernelWeightScale(0.01), this.densityPlot = !0), this._centerNodes = [], this._centerNodesTransition = null, this.onNodeClickCallback = null, this.onNodeDoubleClickCallback = null, this.onNodeHoverStartCallback = null, this.onNodeHoverMoveCallback = null, this.onNodeHoverEndCallback = null, this.onEdgeClickCallback = null, this.onEdgeDoubleClickCallback = null, this.onEdgeHoverStartCallback = null, this.onEdgeHoverMoveCallback = null, this.onEdgeHoverEndCallback = null, this.onZoomCallback = null, this.onRotationCallback = null, this.onResizeCallback = null, this.onLayoutStartCallback = null, this.onLayoutStopCallback = null, this.onDrawCallback = null, this.onReadyCallback = null, this.onCleanupCallback = null, this._isReady = !1, this._onresizeEvent = (b) => {
      if (this.canvasElement)
        for (let w of b)
          this._willResizeEvent(w);
    }, this.resizeObserver = new ResizeObserver(this._onresizeEvent), this.resizeObserver.observe(this.canvasElement), this._initialize();
  }
  // d3-like function Set/Get
  //zoom()
  //rotate()
  //pan()
  //highlightNodes()
  //centerNode()
  /** Initialize the webgl context 
   * @private
   * @method _initialize
   * @memberof Helios
   * @instance
   * 
  */
  _initialize() {
    this._setupDensity(), this._setupShaders(), this._buildNodesGeometry(), this._buildPickingBuffers(), this._buildTrackingBuffers(), this._buildEdgesGeometry(), this._willResizeEvent(0), this._setupCamera(), this._setupEvents(), this._setupLayout(), this.scheduler.start(), this.onReadyCallback?.(this), this.onReadyCallback = null, this._isReady = !0;
  }
  /** Setup the layout worker
   * @private
   * @method _setupLayout
   * @memberof Helios
   * @instance
   */
  _setupLayout() {
    this._layoutLastUpdate = null, this._alpha = 1e-3, this.newPositions = this.network.positions.slice(0);
    let e = (i) => {
      this.newPositions = i.positions, this._layoutLastUpdate || (this._layoutLastUpdate = performance.now());
      let a = performance.now() - this._layoutLastUpdate;
      a < 200 ? a = 200 : a > 2500 && (a = 2500), this._alpha = 1 / a;
      let o = {
        name: "1.1.positionInterpolator",
        callback: (s, h) => {
          let u = 0;
          const l = this._alpha, f = this.network.positions.length, c = this.newPositions, d = this.network.positions;
          for (let v = 0; v < f; v++) {
            const g = c[v] - d[v];
            d[v] += l * g * s, u = Math.max(Math.abs(g), u);
          }
          this._updateCenterNodesPosition(), this._updateCameraInterpolation(!0), u < 1 && this.scheduler.unschedule("1.1.positionInterpolator");
        },
        delay: 0,
        repeat: !0,
        synchronized: !0,
        immediateUpdates: !1,
        redraw: !0,
        updateNodesGeometry: !0,
        updateEdgesGeometry: !0
      };
      this.scheduler.schedule({
        name: "1.0.positionChange",
        callback: (s, h) => {
          this.scheduler.schedule(o);
        },
        delay: 0,
        repeat: !1,
        synchronized: !0,
        immediateUpdates: !1,
        redraw: !1,
        updateNodesGeometry: !1,
        updateEdgesGeometry: !1
      });
    }, n = () => {
      this.onLayoutStopCallback?.();
    }, r = () => {
      this._layoutLastUpdate = null, this.onLayoutStartCallback?.();
    };
    this.layoutWorker = new To({
      network: this.network,
      onUpdate: e,
      onStop: n,
      onStart: r,
      use2D: this._use2D
    }), console.log("Set layout worker", this.layoutWorker), this._autoStartLayout && (this.layoutWorker.start(), console.log("Start", this.layoutWorker));
  }
  /** Setup the density map
   * @private
   * @method _setupDensity
   * @memberof Helios
   * @instance
   * 
   */
  _setupDensity() {
    if (this.densityMap) {
      this.densityWeights = new Float32Array(this.network.nodeCount);
      let e = 1;
      for (let n = 0; n < this.network.nodeCount; n++) {
        let r = this.network.nodes[n].edges.length;
        this.densityWeights[n] = r, e = Math.max(e, r);
      }
      for (let n = 0; n < this.network.nodeCount; n++)
        this.densityWeights[n] /= e;
    }
  }
  /**
   * Pauses the layout computation of the network visualization.
   * @public
   * @method pauseLayout
   * @memberof Helios
   * @instance
   * @chainable
   * @returns {this} Returns the current Helios instance for chaining
   * 
   */
  pauseLayout() {
    return this.layoutWorker.pause(), console.log("Pause", this.layoutWorker), this;
  }
  /**
   * Resumes the layout computation of the network visualization after it has been paused.
   * @public
   * @method resumeLayout
   * @memberof Helios
   * @instance
   * @chainable
   * @returns {this} Returns the current Helios instance for chaining
   * 
   */
  resumeLayout() {
    return this.layoutWorker.resume(), console.log("Resume", this.layoutWorker), this;
  }
  /**
   * Calls the appropriate event callback based on the given pickID, eventType, and event.
   * @private
   * @method _callEventFromPickID
   * @memberof Helios
   * @instance
   * @param {number} pickID - The unique identifier for the picked node or edge.
   * @param {string} eventType - The type of event to be triggered (e.g., click, doubleClick, hoverStart, hoverMove, hoverEnd).
   * @param {Event} event - The original DOM event associated with the interaction.
   * 
   */
  _callEventFromPickID(e, n, r) {
    let i = null, a = !0;
    if (e >= 0) {
      if (e < this.network.nodeCount)
        a = !0, i = this.network.index2Node[e];
      else if (e >= this.network.nodeCount) {
        let o = e - this.network.nodeCount;
        if (o < this.network.indexedEdges.length / 2) {
          let s = {
            source: this.network.index2Node[this.network.indexedEdges[2 * o]],
            target: this.network.index2Node[this.network.indexedEdges[2 * o + 1]],
            index: o
          };
          a = !1, i = s;
        }
      }
    }
    if (i)
      switch (n) {
        case "click": {
          a ? this.onNodeClickCallback?.(i, r) : this.onEdgeClickCallback?.(i, r);
          break;
        }
        case "doubleClick": {
          a ? this.onNodeDoubleClickCallback?.(i, r) : this.onEdgeDoubleClickCallback?.(i, r);
          break;
        }
        case "hoverStart": {
          a ? this.onNodeHoverStartCallback?.(i, r) : this.onEdgeHoverStartCallback?.(i, r);
          break;
        }
        case "hoverMove": {
          a ? this.onNodeHoverMoveCallback?.(i, r) : this.onEdgeHoverMoveCallback?.(i, r);
          break;
        }
        case "hoverEnd": {
          a ? this.onNodeHoverEndCallback?.(i, r) : this.onEdgeHoverEndCallback?.(i, r);
          break;
        }
      }
  }
  /**
   * Sets up event listeners for user interactions such as click, double-click, and hover events.
   * @private
   * @method _setupEvents
   * @memberof Helios
   * @instance
   * 
   */
  _setupEvents() {
    this.lastMouseX = -1, this.lastMouseY = -1, this.currentHoverIndex = -1, this._autoCleanup && (this._mutationObserver = new MutationObserver((e) => {
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (r.type == "childList" && r.removedNodes.length > 0)
          for (let i = 0; i < r.removedNodes.length; i++) {
            let a = r.removedNodes[i];
            if (a == this.canvasElement || a == this.element) {
              this._mutationObserver.disconnect(), this.cleanup();
              return;
            }
          }
      }
    }), this._mutationObserver.observe(this.element, { childList: !0 }), this._mutationObserver.observe(this.element.parentNode, { childList: !0 })), this._clickEventListener = (e) => {
      const n = this.canvasElement.getBoundingClientRect();
      this.lastMouseX = e.clientX, this.lastMouseY = e.clientY;
      const r = this.pickPoint(this.lastMouseX - n.left, this.lastMouseY - n.top);
      r >= 0 ? this._callEventFromPickID(r, "click", e) : (this.onNodeClickCallback?.(null, e), this.onEdgeClickCallback?.(null, e));
    }, this._doubleClickEventListener = (e) => {
      const n = this.canvasElement.getBoundingClientRect();
      this.lastMouseX = e.clientX, this.lastMouseY = e.clientY;
      const r = this.pickPoint(this.lastMouseX - n.left, this.lastMouseY - n.top);
      r >= 0 ? this._callEventFromPickID(r, "doubleClick", e) : (this.onNodeDoubleClickCallback?.(null, e), this.onEdgeDoubleClickCallback?.(null, e));
    }, this._hoverMoveEventListener = (e) => {
      this.lastMouseX = e.clientX, this.lastMouseY = e.clientY, this.triggerHoverEvents(e);
    }, this._hoverLeaveEventListener = (e) => {
      this.currentHoverIndex >= 0 && (this._callEventFromPickID(this.currentHoverIndex, "hoverEnd", e), this.currentHoverIndex = -1, this.lastMouseX = -1, this.lastMouseY = -1);
    }, this._hoverLeaveWindowEventListener = (e) => {
      !e.relatedTarget && !e.toElement && this.currentHoverIndex >= 0 && (this._callEventFromPickID(this.currentHoverIndex, "hoverEnd", e), this.currentHoverIndex = -1, this.lastMouseX = -1, this.lastMouseY = -1);
    }, this.canvasElement.addEventListener("click", this._clickEventListener), this.canvasElement.addEventListener("dblclick", this._doubleClickEventListener), this.canvasElement.addEventListener("mousemove", this._hoverMoveEventListener), this.canvasElement.addEventListener("mouseleave", this._hoverLeaveEventListener), document.body.addEventListener("mouseout", this._hoverLeaveWindowEventListener);
  }
  /**
   * Downloads the image data as a file with the specified filename, supersampling factor, and file format.
   * @private
   * @method _downloadImageData
   * @memberof Helios
   * @instance
   * @param {ImageData} imageData - The image data to be downloaded.
   * @param {string} filename - The name of the file to be downloaded.
   * @param {number} supersampleFactor - The supersampling factor for resizing the image.
   * @returns {Promise<void>} A Promise that resolves when the download is complete.
   */
  async _downloadImageData(e, n, r, i = 1) {
    let a = new Fo({
      // features:["all"],
    }), o = document.createElement("canvas"), s = document.createElement("canvas"), h = o.getContext("2d"), u = s.getContext("2d");
    s.width = e.width, s.height = e.height, console.log(e.width, e.height, r, i), o.width = e.width / r, o.height = e.height / r, h.imageSmoothingEnabled = !0, u.imageSmoothingEnabled = !0, typeof h.imageSmoothingQuality < "u" && (h.imageSmoothingQuality = "high"), typeof u.imageSmoothingQuality < "u" && (u.imageSmoothingQuality = "high"), u.putImageData(e, 0, 0), u.transform(1, 0, 0, -1, 0, s.height), u.globalCompositeOperation = "copy", u.drawImage(u.canvas, 0, 0), u.globalCompositeOperation = "source-over", await a.resize(s, o, {
      alpha: !0
    });
    let l = document.createElement("a");
    bl && o.toDataURL(), l.setAttribute("download", n);
    let f = await a.toBlob(o, "image/png");
    if (f)
      if (n.endsWith("svg")) {
        let c = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width="${o.width / i}" height="${o.height / i}" viewBox="0 0 ${o.width / i} ${o.height / i}" ><image width="${o.width / i}" height="${o.height / i}" xlink:href="${o.toDataURL()}" />`, d = this.svgLayer.innerHTML;
        c += d, c += "</svg>", l.setAttribute("download", n);
        let v = new Blob([c], { type: "image/svg+xml" }), g = URL.createObjectURL(v);
        l.setAttribute("href", g), l.click();
      } else {
        let c = URL.createObjectURL(f);
        l.setAttribute("href", c), l.click();
      }
    else
      window.alert("An error occured while trying to download the image. Please try again. (Error: blob is null.)");
  }
  /**
   * Returns the image data from the specified framebuffer.
   * @private
   * @method _framebufferImage
   * @memberof Helios
   * @instance
   * @param {WebGLFramebuffer} framebuffer - The WebGLFramebuffer from which to read the image data.
   * @returns {ImageData} An ImageData object containing the image data from the framebuffer.
   */
  _framebufferImage(e) {
    const n = e.size.width, r = e.size.height, i = new Uint8ClampedArray(4 * n * r), a = this.gl;
    return a.bindFramebuffer(a.FRAMEBUFFER, e), a.readPixels(
      0,
      // x
      0,
      // y
      n,
      // width
      r,
      // height
      a.RGBA,
      // format
      a.UNSIGNED_BYTE,
      // type
      i
    ), new ImageData(i, n, r);
  }
  /**
   * Exports the current figure to an image file.
   * @method exportFigure
   * @memberof Helios
   * @instance
   * @param {string} filename - The filename for the exported image, including the extension (e.g., "image.png").
   * @param {Object} options - An object containing export options.
   * @param {number} [options.scale=1.0] - The scale factor for the exported image.
   * @param {number} [options.supersampleFactor=4.0] - The supersampling factor for the exported image.
   * @param {number|null} [options.width=null] - The width of the exported image. If null, the current canvas width is used.
   * @param {number|null} [options.height=null] - The height of the exported image. If null, the current canvas height is used.
   * @param {string|null} [options.backgroundColor=null] - The background color of the exported image. If null, the current background color is used.
   * @example
   * helios.exportFigure("figure.png", {
   *   scale: 1.0,
   *   supersampleFactor: 4.0,
   *   width: 800,
   *   height: 600,
   *   backgroundColor: "#FFFFFF",
   * });
   */
  exportFigure(e, {
    scale: n,
    supersampleFactor: r,
    width: i = null,
    height: a = null,
    backgroundColor: o = null
  }) {
    typeof n > "u" && (n = 1), typeof r > "u" && (r = 2);
    let s = this._createOffscreenFramebuffer();
    i == null && a == null ? (i = this.canvasElement.clientWidth, a = this.canvasElement.clientHeight) : i ? a || (a = Math.round(i * this.canvasElement.height / this.canvasElement.width)) : i = Math.round(a * this.canvasElement.width / this.canvasElement.height), o || (o = this.backgroundColor), s.setSize(i * n * r, a * n * r), s.backgroundColor = o, this._redrawAll(s);
    let h = this._framebufferImage(s);
    this._downloadImageData(h, e, r, n), s.discard();
  }
  /**
   * Forces triggering hover events based on the current mouse position.
   * @method triggerHoverEvents
   * @memberof Helios
   * @instance
   * @param {Event} event - The MouseEvent object associated with the triggering event (e.g., mousemove, touchmove).
   * @param {boolean} shallCancel - If true, the method returns immediately without triggering any events.
   * @example
   * helios.triggerHoverEvents(event, false);
   */
  triggerHoverEvents(e, n) {
    if (!this._isReady || this.lastMouseX == -1 || this.lastMouseY == -1)
      return;
    let r = -1;
    if (!this.interacting) {
      const i = this.canvasElement.getBoundingClientRect();
      r = this.pickPoint(this.lastMouseX - i.left, this.lastMouseY - i.top);
    }
    r >= 0 && this.currentHoverIndex == -1 ? (this.currentHoverIndex = r, this._callEventFromPickID(r, "hoverStart", e)) : r >= 0 && this.currentHoverIndex == r ? this._callEventFromPickID(r, "hoverMove", e) : r >= 0 && this.currentHoverIndex != r ? (this._callEventFromPickID(this.currentHoverIndex, "hoverEnd", e), this.currentHoverIndex = r, this._callEventFromPickID(r, "hoverStart", e)) : r == -1 && this.currentHoverIndex != r && (this._callEventFromPickID(this.currentHoverIndex, "hoverEnd", e), this.currentHoverIndex = -1);
  }
  /**
   * Initializes the shader programs used for rendering nodes and edges.
   * @method _setupShaders
   * @memberof Helios
   * @instance
   * @private
   */
  _setupShaders() {
    const e = this.gl;
    this.edgesShaderProgram = new ke(
      K(e, this._hyperbolic ? On : Nn, e.VERTEX_SHADER),
      K(e, No, e.FRAGMENT_SHADER),
      [
        "viewMatrix",
        "projectionMatrix",
        "nearFar",
        "globalOpacityScale",
        "globalWidthScale",
        "globalSizeScale",
        "globalOpacityBase",
        "globalWidthBase",
        "globalSizeBase"
      ],
      ["fromVertex", "toVertex", "vertexType", "fromColor", "toColor", "fromSize", "toSize", "encodedIndex"],
      this.gl
    ), this.edgesFastShaderProgram = new ke(
      K(e, this._hyperbolic ? zo : Po, e.VERTEX_SHADER),
      K(e, Do, e.FRAGMENT_SHADER),
      ["projectionViewMatrix", "nearFar", "globalOpacityScale", "globalOpacityBase"],
      ["vertex", "color"],
      this.gl
    ), this.edgesPickingShaderProgram = new ke(
      K(e, this._hyperbolic ? On : Nn, e.VERTEX_SHADER),
      K(e, Oo, e.FRAGMENT_SHADER),
      [
        "viewMatrix",
        "projectionMatrix",
        "nearFar",
        "globalOpacityScale",
        "globalWidthScale",
        "globalSizeScale",
        "globalOpacityBase",
        "globalWidthBase",
        "globalSizeBase"
      ],
      ["fromVertex", "toVertex", "vertexType", "fromColor", "toColor", "fromSize", "toSize", "encodedIndex"],
      this.gl
    ), this.nodesShaderProgram = new ke(
      K(e, this._hyperbolic ? Dt : zt, e.VERTEX_SHADER),
      K(e, Lo, e.FRAGMENT_SHADER),
      [
        "viewMatrix",
        "projectionMatrix",
        "normalMatrix",
        "globalOpacityScale",
        "globalSizeScale",
        "globalOutlineWidthScale",
        "globalOpacityBase",
        "globalSizeBase",
        "globalOutlineWidthBase"
      ],
      ["vertex", "position", "color", "size", "outlineWidth", "outlineColor", "encodedIndex"],
      this.gl
    ), this.nodesFastShaderProgram = new ke(
      K(e, this._hyperbolic ? Dt : zt, e.VERTEX_SHADER),
      K(e, Qo, e.FRAGMENT_SHADER),
      [
        "viewMatrix",
        "projectionMatrix",
        "normalMatrix",
        "globalOpacityScale",
        "globalSizeScale",
        "globalOutlineWidthScale",
        "globalOpacityBase",
        "globalSizeBase",
        "globalOutlineWidthBase"
      ],
      ["vertex", "position", "color", "size", "outlineWidth", "outlineColor", "encodedIndex"],
      this.gl
    ), this.nodesPickingShaderProgram = new ke(
      K(e, this._hyperbolic ? Dt : zt, e.VERTEX_SHADER),
      K(e, Uo, e.FRAGMENT_SHADER),
      [
        "viewMatrix",
        "projectionMatrix",
        "normalMatrix",
        "globalOpacityScale",
        "globalSizeScale",
        "globalOutlineWidthScale",
        "globalOpacityBase",
        "globalSizeBase",
        "globalOutlineWidthBase"
      ],
      ["vertex", "position", "color", "size", "outlineWidth", "outlineColor", "encodedIndex"],
      this.gl
    );
  }
  /**
   * Initializes the picking framebuffer used for object selection.
   * @method _buildPickingBuffers
   * @memberof Helios
   * @instance
   * @private
   */
  _buildPickingBuffers() {
    this.gl, this.pickingFramebuffer = this._createOffscreenFramebuffer();
  }
  /**
   * Initializes the tracking framebuffer used for getting the displayed objects.
   * @method _buildTrackingBuffers
   * @memberof Helios
   * @instance
   * @private
   */
  _buildTrackingBuffers() {
    this.gl, this._trackingBufferEnabled && (this._trackingFramebuffer = this._createOffscreenFramebuffer());
  }
  /**
   * Creates and initializes an offscreen framebuffer for rendering operations.
   * @method createOffscreenFramebuffer
   * @memberof Helios
   * @instance
   * @returns {WebGLFramebuffer} An offscreen framebuffer with associated texture and depth buffer.
   * @private
   */
  _createOffscreenFramebuffer() {
    const e = this.gl;
    let n = e.createFramebuffer();
    n.texture = e.createTexture(), e.bindTexture(e.TEXTURE_2D, n.texture), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), n.depthBuffer = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, n.depthBuffer), e.bindFramebuffer(e.FRAMEBUFFER, n), n.size = {
      width: 0,
      height: 0
    }, n.setSize = (a, o) => {
      e.bindTexture(e.TEXTURE_2D, n.texture);
      const s = 0, h = e.RGBA, u = 0, l = e.RGBA, f = e.UNSIGNED_BYTE, c = null, d = a, v = o;
      e.texImage2D(
        e.TEXTURE_2D,
        s,
        h,
        d,
        v,
        u,
        l,
        f,
        c
      ), e.bindRenderbuffer(e.RENDERBUFFER, n.depthBuffer), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, d, v), n.size.width = a, n.size.height = o;
    }, n.discard = () => {
      e.deleteRenderbuffer(n.depthBuffer), e.deleteTexture(n.texture), e.deleteFramebuffer(n);
    };
    const r = e.COLOR_ATTACHMENT0, i = 0;
    return e.framebufferTexture2D(e.FRAMEBUFFER, r, e.TEXTURE_2D, n.texture, i), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, n.depthBuffer), n;
  }
  /**
   * Builds the nodes geometry and creates related WebGL buffers.
   * @method _buildNodesGeometry
   * @memberof Helios
   * @instance
   * @private
   */
  _buildNodesGeometry() {
    const e = this.gl;
    this.nodesGeometry = Ar(e, !1, !1), this.nodesPositionBuffer = e.createBuffer(), this.nodesColorBuffer = e.createBuffer(), this.nodesSizeBuffer = e.createBuffer(), this.nodesOutlineWidthBuffer = e.createBuffer(), this.nodesOutlineColorBuffer = e.createBuffer(), this.nodesIndexBuffer = e.createBuffer(), this.nodesIndexArray = new Float32Array(this.network.index2Node.length * 4);
    for (let n = 0; n < this.network.index2Node.length; n++)
      this.nodesIndexArray[4 * n] = (n + 1 >> 0 & 255) / 255, this.nodesIndexArray[4 * n + 1] = (n + 1 >> 8 & 255) / 255, this.nodesIndexArray[4 * n + 2] = (n + 1 >> 16 & 255) / 255, this.nodesIndexArray[4 * n + 3] = (n + 1 >> 24 & 255) / 255;
    e.bindBuffer(e.ARRAY_BUFFER, this.nodesIndexBuffer), e.bufferData(e.ARRAY_BUFFER, this.nodesIndexArray, e.STATIC_DRAW), this.updateNodesGeometry();
  }
  /** Updates the density map with the current node positions.
   * @method updateDensityMap
   * @memberof Helios
   * @instance
   * @chainable
   * @example<caption>Update the density map</caption>
   * helios.updateDensityMap();
   * @example<caption>Update the density map and render the scene</caption>
   * helios.updateDensityMap().render();
   * @returns {this} Returns the current Helios instance for chaining.
   */
  updateDensityMap() {
    let e = this.network.positions;
    return this.densityMap?.setData(e), this.densityMap?.setWeights(this.densityWeights), this;
  }
  /** Force update of Nodes Geometry.
   * @method updateNodesGeometry
   * @memberof Helios
   * @instance
   * @chainable
   * @example<caption>Update the nodes geometry</caption>
   * helios.updateNodesGeometry();
   * @example<caption>Update the nodes geometry and render the scene</caption>
   * helios.updateNodesGeometry().render();
   * @returns {this} Returns the current Helios instance for chaining.
   */
  updateNodesGeometry() {
    const e = this.gl;
    let n = this.network.positions;
    this.updateDensityMap(), e.bindBuffer(e.ARRAY_BUFFER, this.nodesPositionBuffer), e.bufferData(e.ARRAY_BUFFER, n, e.DYNAMIC_DRAW);
    let r = this.network.colors;
    e.bindBuffer(e.ARRAY_BUFFER, this.nodesColorBuffer), e.bufferData(e.ARRAY_BUFFER, r, e.STATIC_DRAW);
    let i = this.network.sizes;
    e.bindBuffer(e.ARRAY_BUFFER, this.nodesSizeBuffer), e.bufferData(e.ARRAY_BUFFER, i, e.STATIC_DRAW);
    let a = this.network.outlineWidths;
    e.bindBuffer(e.ARRAY_BUFFER, this.nodesOutlineWidthBuffer), e.bufferData(e.ARRAY_BUFFER, a, e.STATIC_DRAW);
    let o = this.network.outlineColors;
    return e.bindBuffer(e.ARRAY_BUFFER, this.nodesOutlineColorBuffer), e.bufferData(e.ARRAY_BUFFER, o, e.STATIC_DRAW), this;
  }
  /** Initializes the geometry and buffers used for rendering edges.
   * @method _buildFastEdgesGeometry
   * @memberof Helios
   * @instance
   * @private
   */
  _buildFastEdgesGeometry() {
    const e = this.gl;
    let n = this.network.indexedEdges, r = this.network.positions;
    this.network.colors;
    let i;
    this.fastEdgesGeometry = null, this.fastEdgesIndicesArray = null;
    let a = new Object();
    if (r.length < 65535)
      i = new Uint16Array(n), a.indexType = e.UNSIGNED_SHORT;
    else {
      var o = e.getExtension("OES_element_index_uint");
      o == null ? (i = new Uint16Array(n), a.indexType = e.UNSIGNED_SHORT) : (i = new Uint32Array(n), a.indexType = e.UNSIGNED_INT);
    }
    a.vertexObject = e.createBuffer(), a.colorObject = e.createBuffer(), a.numIndices = i.length, a.indexObject = e.createBuffer(), this.fastEdgesGeometry = a, this.fastEdgesIndicesArray = i;
  }
  /** Initializes the geometry and buffers used for advanced rendering edges.
   * @method _buildAdvancedEdgesGeometry
   * @memberof Helios
   * @instance
   * @private
   */
  _buildAdvancedEdgesGeometry() {
    const e = this.gl;
    let n = [
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      0
    ], r = new Object();
    r.edgeVertexTypeBuffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, r.edgeVertexTypeBuffer), e.bufferData(e.ARRAY_BUFFER, new Float32Array(n), e.STATIC_DRAW), r.verticesBuffer = e.createBuffer(), r.colorBuffer = e.createBuffer(), r.sizeBuffer = e.createBuffer(), r.indexBuffer = e.createBuffer(), this.edgesGeometry = r, this.edgesGeometry.count = this.network.indexedEdges.length / 2, this.edgesGeometry.edgesIndexArray = new Float32Array(this.network.indexedEdges.length * 4 / 2), this._edgeIndicesUpdate = !0;
  }
  /** Initializes the geometry and buffers used for rendering edges.
   * @method _buildEdgesGeometry
   * @memberof Helios
   * @instance
   * @private
   */
  _buildEdgesGeometry() {
    this.fastEdges ? this._buildFastEdgesGeometry() : this._buildAdvancedEdgesGeometry(), this.updateEdgesGeometry();
  }
  /** Updates the indices used for picking edges.
   * @method _updateEdgeIndices
   * @memberof Helios
   * @instance
   * @private
   */
  _updateEdgeIndices() {
    if (this._edgeIndicesUpdate) {
      const e = this.gl;
      for (let n = 0; n < this.network.indexedEdges.length / 2; n++) {
        let r = this.network.index2Node.length + n;
        this._pickeableEdges.has(n) ? (this.edgesGeometry.edgesIndexArray[4 * n] = (r + 1 >> 0 & 255) / 255, this.edgesGeometry.edgesIndexArray[4 * n + 1] = (r + 1 >> 8 & 255) / 255, this.edgesGeometry.edgesIndexArray[4 * n + 2] = (r + 1 >> 16 & 255) / 255, this.edgesGeometry.edgesIndexArray[4 * n + 3] = (r + 1 >> 24 & 255) / 255) : (this.edgesGeometry.edgesIndexArray[4 * n] = 0, this.edgesGeometry.edgesIndexArray[4 * n + 1] = 0, this.edgesGeometry.edgesIndexArray[4 * n + 2] = 0, this.edgesGeometry.edgesIndexArray[4 * n + 3] = 0);
      }
      e.bindBuffer(e.ARRAY_BUFFER, this.edgesGeometry.indexBuffer), e.bufferData(e.ARRAY_BUFFER, this.edgesGeometry.edgesIndexArray, e.DYNAMIC_DRAW), this._edgeIndicesUpdate = !1;
    }
  }
  /** Updates the geometry and buffers used for rendering edges.
   * @method updateEdgesGeometry
   * @memberof Helios
   * @instance
   * @chainable
   * @param {boolean} [force=false] - Forces the update of the geometry and buffers.
   * @returns {this} Returns the current Helios instance for chaining.
   */
  updateEdgesGeometry() {
    const e = this.gl;
    this.network.indexedEdges;
    let n = this.network.positions, r = this.network.colors;
    if (this.fastEdges)
      this.fastEdgesGeometry || this._buildEdgesGeometry(), e.bindBuffer(e.ARRAY_BUFFER, this.fastEdgesGeometry.vertexObject), e.bufferData(e.ARRAY_BUFFER, n, e.STREAM_DRAW), e.bindBuffer(e.ARRAY_BUFFER, this.fastEdgesGeometry.colorObject), e.bufferData(e.ARRAY_BUFFER, r, e.STATIC_DRAW), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.fastEdgesGeometry.indexObject), e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.fastEdgesIndicesArray, e.STREAM_DRAW);
    else {
      const i = this.gl;
      this.network.updateEdgePositions(), this._edgesColorsFromNodes && this.network.updateEdgeColors(), this._edgesWidthFromNodes && this.network.updateEdgeSizes(), this._updateEdgeIndices(), this.network.positions, i.bindBuffer(i.ARRAY_BUFFER, this.edgesGeometry.verticesBuffer), i.bufferData(i.ARRAY_BUFFER, this.network.edgePositions, i.DYNAMIC_DRAW), i.bindBuffer(i.ARRAY_BUFFER, this.edgesGeometry.colorBuffer), i.bufferData(i.ARRAY_BUFFER, this.network.edgeColors, i.DYNAMIC_DRAW), i.bindBuffer(i.ARRAY_BUFFER, this.edgesGeometry.sizeBuffer), i.bufferData(i.ARRAY_BUFFER, this.network.edgeSizes, i.DYNAMIC_DRAW);
    }
    return this;
  }
  /** Updates the all the framebuffers
   * @method _updatePickingFramebufferSize
   * @memberof Helios
   * @instance
   * @private
   * @param {number} newWidth - The new width of the framebuffers.
   * @param {number} newHeight - The new height of the framebuffers.
   * @returns {this} Returns the current Helios instance for chaining.
   */
  _resizeGL(e, n) {
    this.canvasElement.width = e, this.canvasElement.height = n, this.pickingFramebuffer.setSize(Math.round(e * this.pickingResolutionRatio), Math.round(n * this.pickingResolutionRatio)), this._lastCanvasDimensions = [this.canvasElement.clientWidth, this.canvasElement.clientHeight];
    let r = e / n;
    if (this._trackingBufferEnabled) {
      let i, a;
      r > 1 ? (i = Math.sqrt(this._trackingMaxPixels * r), a = this._trackingMaxPixels / i) : (a = Math.sqrt(this._trackingMaxPixels / r), i = this._trackingMaxPixels / a), this._trackingFramebuffer.setSize(Math.round(i), Math.round(a));
      let o = this._trackingFramebuffer.size.width * this._trackingFramebuffer.size.height;
      this._pixelXYOnScreen = Array(o), this._trackingBufferPixels = new Uint8Array(4 * o), this._nodesOnScreen = Array(o), this._nodesOnScreen.fill(-1);
      for (let s = 0; s < this._pixelXYOnScreen.length; s++) {
        let h = s % this._trackingFramebuffer.size.width / this._trackingFramebuffer.size.width * this.canvasElement.clientWidth, u = Math.floor(s / this._trackingFramebuffer.size.width) / this._trackingFramebuffer.size.height * this.canvasElement.clientHeight;
        this._pixelXYOnScreen[s] = [h, u];
      }
    }
    return this.densityPlot && this.densityMap.resize(e, n), this.render(!0), this;
  }
  /** Setup the camera data.
   * @method _setupCamera
   * @memberof Helios
   * @instance
   * @private
   */
  _setupCamera() {
    this.zoom = io().on("zoom", (e) => {
      this.interacting = !0, this._zoomFactor = e.transform.k, this.triggerHoverEvents(e), this.prevK === void 0 && (this.prevK = e.transform.k);
      let n = 0, r = 0;
      (this.prevK == e.transform.k || this._use2D) && (this.prevX === void 0 || this._use2D ? this._use2D ? (n = e.transform.x - this.canvasElement.clientWidth / 2, r = e.transform.y - this.canvasElement.clientHeight / 2) : (n = e.transform.x, r = e.transform.y) : (n = e.transform.x - this.prevX * this._zoomFactor, r = e.transform.y - this.prevY * this._zoomFactor)), this._use2D || (this.prevX = e.transform.x / this._zoomFactor, this.prevY = e.transform.y / this._zoomFactor), this.prevK = e.transform.k;
      let i = Re();
      if (this._use2D || e.sourceEvent?.shiftKey) {
        const a = this.canvasElement.clientHeight, o = Math.PI * 2 / 360 * this._fieldOfView, h = 2 * (this.cameraDistance / this._zoomFactor) * Math.tan(o / 2) / a;
        this._centerNodes.length == 0 && (this._use2D ? (this.panX = n * h, this.panY = -r * h) : (this.panX = this.panX + n * h, this.panY = this.panY - r * h));
      } else
        Ot(i), Mn(i, i, Sn(n / 2), [0, 1, 0]), Mn(i, i, Sn(r / 2), [1, 0, 0]), Pt(this.rotationMatrix, i, this.rotationMatrix);
      this.update(), this.render(), e?.sourceEvent?.preventDefault(), e?.sourceEvent?.stopPropagation();
    }).on("end", (e) => {
      this.interacting = !1, e?.sourceEvent?.preventDefault(), e?.sourceEvent?.stopPropagation();
    }), $(this.canvasElement).call(this.zoom).on("dblclick.zoom", null);
  }
  /** Set the zoom factor.
   * @method zoomFactor
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} zoomFactor - The zoom factor.
   * @param {number} [duration] - The duration of the zoom animation in milliseconds.
   * @returns {this | number} Returns this for chaining if zoomFactor is defined, otherwise returns the current zoom factor.
   * @example
   * // Set the zoom factor to 0.5
   * helios.zoomFactor(0.5);
   * @example
   * // Set the zoom factor to 0.5 with an animation duration of 500 milliseconds
   * helios.zoomFactor(0.5, 500);
   * @example
   * // Get the current zoom factor
   * let zoomFactor = helios.zoomFactor();
   */
  zoomFactor(e, n) {
    return e !== void 0 ? (n === void 0 ? this._use2D ? $(this.canvasElement).call(
      this.zoom.transform,
      _e.translate(this.canvasElement.clientWidth / 2, this.canvasElement.clientHeight / 2).scale(e)
    ) : $(this.canvasElement).call(this.zoom.transform, _e.translate(0, 0).scale(e)) : this._use2D ? $(this.canvasElement).transition().ease(hn).duration(n).call(this.zoom.transform, _e.translate(this.canvasElement.clientWidth / 2, this.canvasElement.clientHeight / 2).scale(e)) : $(this.canvasElement).transition().ease(hn).duration(n).call(this.zoom.transform, _e.translate(0, 0).scale(e)), this) : this._zoomFactor;
  }
  /** Set the semantic zoom exponent.
   * @method semanticZoomExponent
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} semanticZoomExponent - The semantic zoom exponent.
   * @returns {this | number} Returns this for chaining if semanticZoomExponent is defined, otherwise returns the current semantic zoom exponent.
   * @example
   * // Set the semantic zoom exponent to 0.5
   * helios.semanticZoomExponent(0.5);
   * @example
   * // Get the current semantic zoom exponent
   * let semanticZoomExponent = helios.semanticZoomExponent();
   */
  semanticZoomExponent(e) {
    return e !== void 0 ? (this._semanticZoomExponent = e, this) : this._semanticZoomExponent;
  }
  /** Will resize event helper function
   * @method _willResizeEvent
   * @memberof Helios
   * @instance
   * @private
   * @param {Event} event - The resize event.
   */
  _willResizeEvent(e) {
    let n = window.devicePixelRatio || 1;
    (n < 2 || this.forceSupersample) && (n = n * 2);
    let r = n * this.canvasElement.clientWidth, i = n * this.canvasElement.clientHeight;
    console.log(r, i), requestAnimationFrame(() => {
      this._resizeGL(r, i);
    }), this._updateCameraInteraction(), this.onResizeCallback?.(e);
  }
  /** Update Camera Interaction.
   * @method _updateCameraInteraction
   * @memberof Helios
   * @instance
   * @private
   * @chainable
   * @returns {this} Returns this for chaining.
   */
  _updateCameraInteraction() {
    if (this.zoom && this._use2D) {
      const e = this.canvasElement.clientHeight, n = Math.PI * 2 / 360 * this._fieldOfView, i = 2 * (this.cameraDistance / this._zoomFactor) * Math.tan(n / 2) / e;
      $(this.canvasElement).property(
        "__zoom",
        _e.translate(
          this.panX / i + this._lastCanvasDimensions[0] / 2,
          -this.panY / i + this._lastCanvasDimensions[1] / 2
        ).scale(this._zoomFactor)
      );
    }
  }
  /** Will hint force Helios to redraw the network.
   * @method redraw
   * @memberof Helios
   * @instance
   * @chainable
   * @returns {this} Returns this for chaining.
   * @fires Helios#redraw
   * @fires Helios#draw
   * @fires Helios#HoverEvent
   * @example
   * // Redraw the network
   * helios.redraw();
   * @example
   * // Update geometry and redraw the network
   * helios.update().redraw();
   */
  redraw() {
    return this._redrawAll(null, "normal"), this._redrawAll(this.pickingFramebuffer, "picking"), this._trackingBufferEnabled && this._redrawAll(this._trackingFramebuffer, "tracking"), this.triggerHoverEvents(null), this._updateTrackerNodesDataThrottle(), this.onDrawCallback?.(), this;
  }
  /** Will hint or force Helios to update the network geometry.
   * this method needs to be called after any changes to the network data
   * or visual properties.
   * @method update
   * @memberof Helios
   * @instance
   * @chainable
   * @param {boolean} [immediate=false] - If true, the update will be performed immediately, otherwise it will be scheduled.
   * @param {boolean} [nodes=true] - If true, the node geometry will be updated.
   * @param {boolean} [edges=true] - If true, the edge geometry will be updated.
   * @returns {this} Returns this for chaining.
   * @example
   * // Update the network geometry
   * helios.update();
   * @example
   * // Update the network geometry immediately
   * helios.update(true);
   */
  update(e = !1, n = !0, r = !0) {
    return this.scheduler.schedule({
      name: "9.0.update",
      callback: null,
      delay: 0,
      repeat: !1,
      synchronized: !0,
      immediateUpdates: e,
      // redraw: true,
      updateNodesGeometry: n,
      updateEdgesGeometry: r
    }), this;
  }
  /** Will hint or force Helios to render the network.
   * @method render
   * @memberof Helios
   * @instance
   * @chainable
   * @param {boolean} [immediate=false] - If true, the render will be performed immediately, otherwise it will be scheduled.
   * @returns {this} Returns this for chaining.
   * @example
   * // Render the network
   * helios.render();
   * @example
   * // Update geometry and render the network
   * helios.update().render();
   */
  render(e = !1) {
    return this.scheduler.schedule({
      name: "9.1.render",
      callback: null,
      delay: 0,
      repeat: !1,
      synchronized: !0,
      immediateUpdates: e,
      redraw: !0
      // updateNodesGeometry: true,
      // updateEdgesGeometry: true,
    }), this;
  }
  /** Helper method to prepare drawing framebuffers
   * @method _redrawPrepare
   * @memberof Helios
   * @instance
   * @private
   * @param {WebGLFramebuffer} destination - The destination framebuffer.
   * @param {boolean} isPicking - If true, the framebuffer is used for picking.
   * @param {Object} viewport - The viewport to use.
   */
  _redrawPrepare(e, n, r) {
    typeof n > "u" && (n = "normal");
    const i = this.gl, a = e?.size.width || this.canvasElement.width, o = e?.size.height || this.canvasElement.height;
    e == null ? (i.bindFramebuffer(i.FRAMEBUFFER, null), i.clearColor(...this._backgroundColor)) : n != "normal" ? (i.bindFramebuffer(i.FRAMEBUFFER, e), i.clearColor(0, 0, 0, 0)) : (i.bindFramebuffer(i.FRAMEBUFFER, e), typeof e.backgroundColor > "u" ? i.clearColor(...this._backgroundColor) : i.clearColor(...e.backgroundColor)), typeof r > "u" ? i.viewport(0, 0, a, o) : i.viewport(...r), i.clear(i.COLOR_BUFFER_BIT | i.DEPTH_BUFFER_BIT), i.depthFunc(i.LEQUAL), this.projectionMatrix = Re(), this.viewMatrix = Re(), this.projectionViewMatrix = Re();
    let s = Math.PI * 2 / 360 * this._fieldOfView, h = a / o;
    if (this._use2D || this._orthographic) {
      const u = this.cameraDistance / this._zoomFactor, l = 2 * u * Math.tan(s / 2), f = l * h, c = -f / 2, d = f / 2, v = -l / 2, g = l / 2;
      fo(
        this.projectionMatrix,
        c,
        d,
        v,
        g,
        -100 + u,
        1e4 + u
      );
    } else
      uo(this.projectionMatrix, s, h, 1, null);
    Ot(this.viewMatrix), Fn(this.viewMatrix, this.viewMatrix, [this.panX, this.panY, -this.cameraDistance / this._zoomFactor]), Pt(this.viewMatrix, this.viewMatrix, this.rotationMatrix), Fn(this.viewMatrix, this.viewMatrix, this.translatePosition), Pt(this.projectionViewMatrix, this.projectionMatrix, this.viewMatrix);
  }
  /** Helper method to draw nodes
   * @method _redrawNodes
   * @memberof Helios
   * @instance
   * @private
   * @param {WebGLFramebuffer} destination - The destination framebuffer.
   * @param {boolean} isPicking - If true, the framebuffer is used for picking.
   */
  _redrawNodes(e, n) {
    typeof n > "u" && (n = "normal");
    const r = this.gl;
    let i = r.getExtension("ANGLE_instanced_arrays"), a = 1 / Math.pow(this._zoomFactor, this._semanticZoomExponent);
    n != "normal" && (a = 1 / Math.pow(this._zoomFactor, 0.75 * this._semanticZoomExponent));
    let o;
    n == "normal" ? (r.enable(r.BLEND), r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA), this.useShadedNodes ? o = this.nodesShaderProgram : o = this.nodesFastShaderProgram) : (r.disable(r.BLEND), o = this.nodesPickingShaderProgram), o.use(r), o.attributes.enable("vertex"), o.attributes.enable("position"), o.attributes.enable("size"), o.attributes.enable("outlineWidth"), o.attributes.enable("outlineColor"), o.attributes.enable("encodedIndex"), r.bindBuffer(r.ARRAY_BUFFER, this.nodesGeometry.vertexObject), r.vertexAttribPointer(o.attributes.vertex, 3, r.FLOAT, !1, 0, 0), i.vertexAttribDivisorANGLE(o.attributes.vertex, 0), this.nodesGeometry.indexObject && r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, this.nodesGeometry.indexObject), r.uniformMatrix4fv(o.uniforms.projectionMatrix, !1, this.projectionMatrix), r.uniformMatrix4fv(o.uniforms.viewMatrix, !1, this.viewMatrix), r.uniform1f(o.uniforms.globalOpacityScale, this._nodesGlobalOpacityScale), r.uniform1f(o.uniforms.globalOpacityBase, this._nodesGlobalOpacityBase), r.uniform1f(o.uniforms.globalSizeScale, this._nodesGlobalSizeScale * a), r.uniform1f(o.uniforms.globalSizeBase, this._nodesGlobalSizeBase * a), r.uniform1f(o.uniforms.globalOutlineWidthScale, this._nodesGlobalOutlineWidthScale * a), r.uniform1f(o.uniforms.globalOutlineWidthBase, this._nodesGlobalOutlineWidthBase * a);
    let s = so();
    oo(s, this.viewMatrix), r.uniformMatrix3fv(o.uniforms.normalMatrix, !1, s), this.network.colors, this.network.positions, this.network.sizes, this.network.outlineWidths, r.bindBuffer(r.ARRAY_BUFFER, this.nodesPositionBuffer), r.enableVertexAttribArray(o.attributes.position), r.vertexAttribPointer(o.attributes.position, 3, r.FLOAT, !1, 0, 0), i.vertexAttribDivisorANGLE(o.attributes.position, 1), r.bindBuffer(r.ARRAY_BUFFER, this.nodesColorBuffer), r.enableVertexAttribArray(o.attributes.color), r.vertexAttribPointer(o.attributes.color, 4, r.FLOAT, !1, 0, 0), i.vertexAttribDivisorANGLE(o.attributes.color, 1), r.bindBuffer(r.ARRAY_BUFFER, this.nodesSizeBuffer), r.enableVertexAttribArray(o.attributes.size), r.vertexAttribPointer(o.attributes.size, 1, r.FLOAT, !1, 0, 0), i.vertexAttribDivisorANGLE(o.attributes.size, 1), r.bindBuffer(r.ARRAY_BUFFER, this.nodesOutlineColorBuffer), r.enableVertexAttribArray(o.attributes.outlineColor), r.vertexAttribPointer(o.attributes.outlineColor, 4, r.FLOAT, !1, 0, 0), i.vertexAttribDivisorANGLE(o.attributes.outlineColor, 1), r.bindBuffer(r.ARRAY_BUFFER, this.nodesOutlineWidthBuffer), r.enableVertexAttribArray(o.attributes.outlineWidth), r.vertexAttribPointer(o.attributes.outlineWidth, 1, r.FLOAT, !1, 0, 0), i.vertexAttribDivisorANGLE(o.attributes.outlineWidth, 1), r.bindBuffer(r.ARRAY_BUFFER, this.nodesIndexBuffer), r.enableVertexAttribArray(o.attributes.encodedIndex), r.vertexAttribPointer(o.attributes.encodedIndex, 4, r.FLOAT, !1, 0, 0), i.vertexAttribDivisorANGLE(o.attributes.encodedIndex, 1), this.nodesGeometry.indexObject ? i.drawElementsInstancedANGLE(r.TRIANGLES, this.nodesGeometry.numIndices, this.nodesGeometry.indexType, 0, this.network.positions.length / 3) : i.drawArraysInstancedANGLE(r.TRIANGLE_STRIP, 0, this.nodesGeometry.numIndices, this.network.positions.length / 3), o.attributes.disable("vertex"), o.attributes.disable("position"), o.attributes.disable("size"), o.attributes.disable("outlineWidth"), o.attributes.disable("outlineColor"), o.attributes.disable("encodedIndex");
  }
  /** Helper function to redraw the edges
   * @method _redrawEdges
   * @memberof Helios
   * @instance
   * @private
   * @param {WebGLFramebuffer} destination - The destination framebuffer.
   * @param {String} framebufferType - The type of framebuffer to render to (normal, picking, or tracking).
   */
  _redrawEdges(e, n) {
    typeof n > "u" && (n = "normal");
    let r = this.onEdgeClickCallback || this.onEdgeHoverMoveCallback || this.onEdgeHoverStartCallback || this.onEdgeHoverEndCallback || this.onEdgeDoubleClickCallback || this.onEdgeClickCallback;
    if (n != "normal" && (this.fastEdges || !r))
      return;
    let i = 1 / Math.pow(this._zoomFactor, this._semanticZoomExponent);
    n != "normal" && (i = 1 / Math.pow(this._zoomFactor, 0.5 * this._semanticZoomExponent));
    const a = this.gl;
    let o = a.getExtension("ANGLE_instanced_arrays"), s;
    n == "normal" ? (a.enable(a.BLEND), this.useAdditiveBlending ? a.blendFunc(a.SRC_ALPHA, a.ONE) : a.blendFuncSeparate(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE), this.fastEdges ? s = this.edgesFastShaderProgram : s = this.edgesShaderProgram) : (a.disable(a.BLEND), s = this.edgesPickingShaderProgram), this.fastEdges ? (s.use(a), s.attributes.enable("vertex"), s.attributes.enable("color"), a.bindBuffer(a.ARRAY_BUFFER, this.fastEdgesGeometry.vertexObject), a.vertexAttribPointer(s.attributes.vertex, 3, a.FLOAT, !1, 0, 0), o.vertexAttribDivisorANGLE(s.attributes.vertex, 0), a.bindBuffer(a.ARRAY_BUFFER, this.fastEdgesGeometry.colorObject), a.vertexAttribPointer(s.attributes.color, 4, a.FLOAT, !1, 0, 0), o.vertexAttribDivisorANGLE(s.attributes.color, 0), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.fastEdgesGeometry.indexObject), a.uniformMatrix4fv(s.uniforms.projectionViewMatrix, !1, this.projectionViewMatrix), a.uniform1f(s.uniforms.globalOpacityScale, this._edgesGlobalOpacityScale), a.uniform1f(s.uniforms.globalOpacityBase, this._edgesGlobalOpacityBase), a.drawElements(a.LINES, this.fastEdgesGeometry.numIndices, this.fastEdgesGeometry.indexType, 0), s.attributes.disable("vertex"), s.attributes.disable("color")) : (s.use(a), s.attributes.enable("fromVertex"), s.attributes.enable("toVertex"), s.attributes.enable("vertexType"), s.attributes.enable("fromColor"), s.attributes.enable("toColor"), s.attributes.enable("fromSize"), s.attributes.enable("toSize"), s.attributes.enable("encodedIndex"), a.bindBuffer(a.ARRAY_BUFFER, this.edgesGeometry.edgeVertexTypeBuffer), a.vertexAttribPointer(s.attributes.vertexType, 2, a.FLOAT, !1, 0, 0), o.vertexAttribDivisorANGLE(s.attributes.vertexType, 0), a.bindBuffer(a.ARRAY_BUFFER, this.edgesGeometry.verticesBuffer), a.vertexAttribPointer(s.attributes.fromVertex, 3, a.FLOAT, !1, 4 * 3 * 2, 0), o.vertexAttribDivisorANGLE(s.attributes.fromVertex, 1), a.bindBuffer(a.ARRAY_BUFFER, this.edgesGeometry.verticesBuffer), a.vertexAttribPointer(s.attributes.toVertex, 3, a.FLOAT, !1, 4 * 3 * 2, 4 * 3), o.vertexAttribDivisorANGLE(s.attributes.toVertex, 1), a.bindBuffer(a.ARRAY_BUFFER, this.edgesGeometry.colorBuffer), a.vertexAttribPointer(s.attributes.fromColor, 4, a.FLOAT, !1, 4 * 4 * 2, 0), o.vertexAttribDivisorANGLE(s.attributes.fromColor, 1), a.vertexAttribPointer(s.attributes.toColor, 4, a.FLOAT, !1, 4 * 4 * 2, 4 * 4), o.vertexAttribDivisorANGLE(s.attributes.toColor, 1), a.bindBuffer(a.ARRAY_BUFFER, this.edgesGeometry.sizeBuffer), a.vertexAttribPointer(s.attributes.fromSize, 1, a.FLOAT, !1, 4 * 2, 0), o.vertexAttribDivisorANGLE(s.attributes.fromSize, 1), a.vertexAttribPointer(s.attributes.toSize, 1, a.FLOAT, !1, 4 * 2, 4), o.vertexAttribDivisorANGLE(s.attributes.toSize, 1), a.bindBuffer(a.ARRAY_BUFFER, this.edgesGeometry.indexBuffer), a.enableVertexAttribArray(s.attributes.encodedIndex), a.vertexAttribPointer(s.attributes.encodedIndex, 4, a.FLOAT, !1, 0, 0), o.vertexAttribDivisorANGLE(s.attributes.encodedIndex, 1), a.uniformMatrix4fv(s.uniforms.projectionMatrix, !1, this.projectionMatrix), a.uniformMatrix4fv(s.uniforms.viewMatrix, !1, this.viewMatrix), a.uniform1f(s.uniforms.globalOpacityScale, this._edgesGlobalOpacityScale), a.uniform1f(s.uniforms.globalOpacityBase, this._edgesGlobalOpacityBase), a.uniform1f(s.uniforms.globalWidthScale, this._edgesGlobalWidthScale), a.uniform1f(s.uniforms.globalWidthBase, this._edgesGlobalWidthBase), a.uniform1f(s.uniforms.globalSizeScale, this._nodesGlobalSizeScale * i), a.uniform1f(s.uniforms.globalSizeBase, this._nodesGlobalSizeBase * i), o.drawArraysInstancedANGLE(a.TRIANGLE_STRIP, 0, 4, this.edgesGeometry.count), s.attributes.disable("fromVertex"), s.attributes.disable("toVertex"), s.attributes.disable("vertexType"), s.attributes.disable("fromColor"), s.attributes.disable("toColor"), s.attributes.disable("fromSize"), s.attributes.disable("toSize"), s.attributes.disable("encodedIndex"));
  }
  /** Helper function to redraw the scene.
   * @method _redrawAll
   * @memberof Helios
   * @instance
   * @private
   * @param {Object} destination - The destination to draw to. If undefined, the canvas will be used.
   * @param {String} framebufferType - Type of the framebuffer to draw "normal", "picking", "tracking" . Default is "normal"
   */
  _redrawAll(e, n) {
    typeof n > "u" && (n = "normal");
    const r = this.gl;
    this._redrawPrepare(e, n), n == "normal" && this.densityPlot && (r.disable(this.gl.DEPTH_TEST), e?.size.width || this.canvasElement.width, e?.size.height || this.canvasElement.height, this.densityMap.drawScene(this.projectionMatrix, this.viewMatrix)), r.depthMask(!0), this._use2D ? (r.disable(r.DEPTH_TEST), r.depthMask(!1), n != "tracking" && this._edgesGlobalOpacityScale > 0 && this._redrawEdges(e, n), this._redrawNodes(e, n)) : (r.enable(r.DEPTH_TEST), this._redrawNodes(e, n), r.depthMask(!1), n != "tracking" && this._edgesGlobalOpacityScale > 0 && this._redrawEdges(e, n), r.depthMask(!0));
  }
  // onResizeCallback
  // onNodeClickCallback
  // onNodeHoverStartCallback 
  // onNodeHoverEndCallback
  // onNodeHoverMoveCallback
  // onZoomCallback
  // onRotationCallback
  // onLayoutStartCallback
  // onLayoutFinishCallback
  // onDrawCallback
  /** Helper function to update the center nodes position.
   * @method _updateCenterNodesPosition
   * @memberof Helios
   * @instance
   * @private
   */
  _updateCenterNodesPosition() {
    if (this.targetTranslatePosition[0] = 0, this.targetTranslatePosition[1] = 0, this.targetTranslatePosition[2] = 0, this._centerNodes && this._centerNodes.length > 0) {
      for (let n = 0; n < this._centerNodes.length; n++) {
        let i = this._centerNodes[n].position;
        this.targetTranslatePosition[0] -= i[0], this.targetTranslatePosition[1] -= i[1], this.targetTranslatePosition[2] -= i[2];
      }
      let e = this._centerNodes.length;
      this.targetTranslatePosition[0] /= e, this.targetTranslatePosition[1] /= e, this.targetTranslatePosition[2] /= e;
    }
  }
  /** Center view on nodes with animation.
   * @method centerOnNodes
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number[]|Node} nodes - The nodes to center on.
   * @param {number} duration - The duration of the animation in milliseconds.
   * @example
   * // Center on node with id 1
   * helios.centerOnNodes([1], 1000);
   * @example
   * // Center on node with id 1 and 2
   * helios.centerOnNodes([1, 2], 1000);
   * @example
   * // Center on node with id 1 and node object
   * helios.centerOnNodes([1, helios.network.nodes[2]], 1000);
   * return {this} The current instance of Helios for chaining.
   */
  centerOnNodes(e, n) {
    this._centerNodes = [];
    for (let r = 0; r < e.length; r++) {
      let i = e[r];
      i.ID === void 0 && (i = this.network.nodes[i]), this._centerNodes.push(i);
    }
    return this._updateCameraInteraction(), this.lastTranslatePosition[0] = this.translatePosition[0], this.lastTranslatePosition[1] = this.translatePosition[1], this.lastTranslatePosition[2] = this.translatePosition[2], this.lastPanX = this.panX, this.lastPanY = this.panY, n === void 0 || n <= 0 ? (this.translateDuration = 0, this.translateStartTime = null) : (this.translateDuration = n, this.translateStartTime = performance.now()), this._scheduleCameraInterpolation(), this;
  }
  /** Get the nodes being centered on.
   * @method getCenterNodes
   * @memberof Helios
   * @instance
   * @return {Array<Node>} The nodes being centered on.
   * @example
   * // Get the nodes being centered on
   * let nodes = helios.getCenterNodes();
   */
  centeredNodes() {
    return this._centerNodes;
  }
  /** Helper method to update the camera interpolation.
   * @method _updateCameraInterpolation
   * @memberof Helios
   * @instance
   * @private
   * @param {Boolean} ignoreInstantaneousUpdate - Ignore instantaneous update.
   * @return {Boolean} True if the camera interpolation needs to continue, false otherwise.
   */
  _updateCameraInterpolation(e = !1) {
    if (this.translateDuration == 0)
      return e || (this.translatePosition[0] = this.targetTranslatePosition[0], this.translatePosition[1] = this.targetTranslatePosition[1], this.translatePosition[2] = this.targetTranslatePosition[2], this.panX = 0, this.panY = 0, this._use2D), !1;
    {
      let r = (performance.now() - this.translateStartTime) / this.translateDuration;
      return r > 1 && (r = 1), this.translatePosition[0] = (1 - r) * this.lastTranslatePosition[0], this.translatePosition[1] = (1 - r) * this.lastTranslatePosition[1], this.translatePosition[2] = (1 - r) * this.lastTranslatePosition[2], this.translatePosition[0] += r * this.targetTranslatePosition[0], this.translatePosition[1] += r * this.targetTranslatePosition[1], this.translatePosition[2] += r * this.targetTranslatePosition[2], this.panX = (1 - r) * this.lastPanX, this.panY = (1 - r) * this.lastPanY, this.panX += r * this.targetPanX, this.panY += r * this.targetPanY, this._use2D, !(r >= 1);
    }
  }
  /** Helper method to schedule the camera interpolation.
   * @method _scheduleCameraInterpolation
   * @memberof Helios
   * @instance
   * @private
   */
  _scheduleCameraInterpolation() {
    let e = {
      name: "1.1.cameraInterpolator",
      callback: (n, r) => {
        this._updateCenterNodesPosition(), this._updateCameraInterpolation() || this.scheduler.unschedule("1.1.cameraInterpolator");
      },
      delay: 0,
      repeat: !0,
      synchronized: !0,
      immediateUpdates: !1,
      redraw: !0,
      updateNodesGeometry: !1,
      updateEdgesGeometry: !1
    };
    this.scheduler.schedule({
      name: "1.0.cameraInterpolator",
      callback: (n, r) => {
        this.scheduler.schedule(e);
      },
      delay: 0,
      repeat: !1,
      synchronized: !0,
      immediateUpdates: !1,
      redraw: !1,
      updateNodesGeometry: !1,
      updateEdgesGeometry: !1
    });
  }
  //#region Events
  /** Set the callback for the resize event.
   * @method onResize
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the resize event
   * helios.onResize((width, height) => {
   * 	console.log("The canvas was resized to " + width + "x" + height);
   * });
   */
  onResize(e) {
    return this.onResizeCallback = e, this;
  }
  /** Set the callback for the node click event.
   * @method onNodeClick
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the node click event
   * helios.onNodeClick((node) => {
   * 	console.log("The node " + node.id + " was clicked");
   * });
   */
  onNodeClick(e) {
    return this.onNodeClickCallback = e, this;
  }
  /** Set the callback for the node double click event.
   * @method onNodeDoubleClick
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the node double click event
   * helios.onNodeDoubleClick((node) => {
   * 	console.log("The node " + node.id + " was double clicked");
   * });
   * @see {@link Helios#onNodeClick}
   */
  onNodeDoubleClick(e) {
    return this.onNodeDoubleClickCallback = e, this;
  }
  /** Set the callback for the node hover start event.
   * @method onNodeHoverStart
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the node hover start event
   * helios.onNodeHoverStart((node) => {
   * 	console.log("The node " + node.id + " was hovered");
   * });
   * @see {@link Helios#onNodeHoverEnd}
   * @see {@link Helios#onNodeHoverMove}
   */
  onNodeHoverStart(e) {
    return this.onNodeHoverStartCallback = e, this;
  }
  /** Set the callback for the node hover end event.
   * @method onNodeHoverEnd
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the node hover end event
   * helios.onNodeHoverEnd((node) => {
   * 	console.log("The node " + node.id + " was no longer hovered");
   * });
   * @see {@link Helios#onNodeHoverStart}
   * @see {@link Helios#onNodeHoverMove}
   */
  onNodeHoverEnd(e) {
    return this.onNodeHoverEndCallback = e, this;
  }
  /** Set the callback for the node hover move event.
   * @method onNodeHoverMove
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @category Events
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the node hover move event
   * helios.onNodeHoverMove((node) => {
   * 	console.log("The node " + node.id + " was hovered");
   * });
   * @see {@link Helios#onNodeHoverStart}
   * @see {@link Helios#onNodeHoverEnd}
   */
  onNodeHoverMove(e) {
    return this.onNodeHoverMoveCallback = e, this;
  }
  /** Set the callback for the edge click event.
   * @method onEdgeClick
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the edge click event
   * helios.onEdgeClick((edge) => {
   * 	console.log("The edge " + edge.id + " was clicked");
   * });
   * @see {@link Helios#onEdgeDoubleClick}
   * @see {@link Helios#onEdgeHoverStart}
   * @see {@link Helios#onEdgeHoverEnd}
   * @see {@link Helios#onEdgeHoverMove}
   */
  onEdgeClick(e) {
    return this.onEdgeClickCallback = e, this;
  }
  /** Set the callback for the edge double click event.
   * @method onEdgeDoubleClick
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the edge double click event
   * helios.onEdgeDoubleClick((edge) => {
   * 	console.log("The edge " + edge.id + " was double clicked");
   * });
   * @see {@link Helios#onEdgeClick}
   * @see {@link Helios#onEdgeHoverStart}
   * @see {@link Helios#onEdgeHoverEnd}
   * @see {@link Helios#onEdgeHoverMove}
   */
  onEdgeDoubleClick(e) {
    return this.onEdgeDoubleClickCallback = e, this;
  }
  /** Set the callback for the edge hover start event.
   * @method onEdgeHoverStart
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the edge hover start event
   * helios.onEdgeHoverStart((edge) => {
   * 	console.log("The edge " + edge.id + " was hovered");
   * });
   * @see {@link Helios#onEdgeClick}
   * @see {@link Helios#onEdgeDoubleClick}
   * @see {@link Helios#onEdgeHoverEnd}
   * @see {@link Helios#onEdgeHoverMove}
   */
  onEdgeHoverStart(e) {
    return this.onEdgeHoverStartCallback = e, this;
  }
  /** Set the callback for the edge hover end event.
   * @method onEdgeHoverEnd
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the edge hover end event
   * helios.onEdgeHoverEnd((edge) => {
   * 	console.log("The edge " + edge.id + " was no longer hovered");
   * });
   * @see {@link Helios#onEdgeClick}
   * @see {@link Helios#onEdgeDoubleClick}
   * @see {@link Helios#onEdgeHoverStart}
   * @see {@link Helios#onEdgeHoverMove}
   */
  onEdgeHoverEnd(e) {
    return this.onEdgeHoverEndCallback = e, this;
  }
  /** Set the callback for the edge hover move event.
   * @method onEdgeHoverMove
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the edge hover move event
   * helios.onEdgeHoverMove((edge) => {
   * 	console.log("The edge " + edge.id + " was hovered");
   * });
   * @see {@link Helios#onEdgeClick}
   * @see {@link Helios#onEdgeDoubleClick}
   * @see {@link Helios#onEdgeHoverStart}
   * @see {@link Helios#onEdgeHoverEnd}
   */
  onEdgeHoverMove(e) {
    return this.onEdgeHoverMoveCallback = e, this;
  }
  /** Set the callback for the zoom event.
   * @method onZoom
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the zoom event
   * helios.onZoom((zoom) => {
   * 	console.log("The zoom is now " + zoom);
   * });
   * @see {@link Helios#onRotation}
   */
  onZoom(e) {
    return this.onZoomCallback = e, this;
  }
  /** Set the callback for the rotation event.
   * @method onRotation
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the rotation event
   * helios.onRotation((rotation) => {
   * 	console.log("The rotation is now " + rotation);
   * });
   * @see {@link Helios#onZoom}
   */
  onRotation(e) {
    return this.onRotationCallback = e, this;
  }
  /** Set the callback for the layout start event.
   * @method onLayoutStart
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the layout start event
   * helios.onLayoutStart(() => {
   * 	console.log("The layout has started");
   * });
   * @see {@link Helios#onLayoutStop}
   * @see {@link Helios#onLayoutTick}
   * @see {@link Helios#onLayoutEnd}
   */
  onLayoutStart(e) {
    return console.log("On start", this.layoutWorker), this.onLayoutStartCallback = e, this?.layoutWorker.onStart(() => {
      this.onLayoutStartCallback?.();
    }), this;
  }
  /** Set the callback for the layout stop event.
   * @method onLayoutStop
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the layout stop event
   * helios.onLayoutStop(() => {
   * 	console.log("The layout has stopped");
   * });
   * @see {@link Helios#onLayoutStart}
   * @see {@link Helios#onLayoutTick}
   */
  onLayoutStop(e) {
    return console.log("Stop", this.layoutWorker), this.onLayoutStopCallback = e, this?.layoutWorker.onStop(() => {
      this.onLayoutStopCallback?.();
    }), this;
  }
  /** Set the callback for the draw event.
   * @method onDraw
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for the draw event
   * helios.onDraw(() => {
   * 	console.log("The graph was drawn");
   * });
   * @see {@link Helios#onReady}
   */
  onDraw(e) {
    return this.onDrawCallback = e, this;
  }
  /** Set the callback for when Helios is ready and properly initialized.
   * @method onReady
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for when Helios is ready
   * let helios = Helios("elementID",networkData);
   * helios.onReady(() => {
   * 	console.log("Helios is ready");
   * });
   */
  onReady(e) {
    this._isReady ? e?.(this) : this.onReadyCallback = e;
  }
  /** Set the callback for when Helios is cleaned up and properly disposed.
   * @method onCleanup
   * @memberof Helios
   * @instance
   * @param {Function} callback - The callback function.
   * @chainable
   * @return {this} The current Helios instance for chaining.
   * @example
   * // Set the callback for when Helios is cleaned up
   * let helios = Helios("elementID",networkData);
   * helios.onCleanup(() => {
   * 	console.log("Helios is cleaned up");
   * });
   */
  onCleanup(e) {
    this.isCleanedUp ? e?.(this) : this.onCleanupCallback = e;
  }
  //#endregion
  //#region Style attributes
  /** Set the background color of the graph.
   * @method backgroundColor
   * @memberof Helios
   * @instance
   * @param {Array<number>} color - The background color of the graph in RGB or RGBA formats as 3 or 4 float entries from 0.0 to 1.0.
   * @chainable
   * @return {Array<number>|this} The background color of the panel or the current Helios instance for chaining.
   * @example
   * // Set the background color of the graph to red
   * helios.backgroundColor([1.0,0,0,1.0]);
   * @example
   * // Get the background color of the graph
   * let backgroundColor = helios.backgroundColor();
   */
  backgroundColor(e) {
    return typeof e > "u" ? this._backgroundColor : (this._backgroundColor = e, this);
  }
  /** Set the color of the nodes.
   * @method nodeColor
   * @memberof Helios
   * @instance
   * @param {Array<number>|Function} colorInput - The color of the nodes in RGB or RGBA formats as 3 or 4 float entries from 0.0 to 1.0 or a function that returns the color of the nodes.
   * @param {string} [nodeID] - The ID of the node to set the color of. If not specified, the color of all nodes will be set.
   * @chainable
   * @return {Array<number>|this} The color of the nodes or the current Helios instance for chaining.
   * @example
   * // Set the color of all nodes to red
   * helios.nodeColor([1.0,0,0,1.0]);
   * @example
   * // Set the color of a specific node to red
   * helios.nodeColor([1.0,0,0,1.0], "nodeID");
   * @example
   * // Set the color of all nodes to a random color
   * helios.nodeColor((node) => {
   * 	return [Math.random(), Math.random(), Math.random(), 1.0];
   * });
   * @example
   * // Set the color of all nodes based on an node attribute called `altColor`
   * helios.nodeColor((node) => {
   * 	return node.altColor;
   * });
   */
  nodeColor(e, n) {
    if (typeof n > "u") {
      if (typeof e > "u")
        return this.network.colors;
      if (typeof e == "function") {
        let r = this.network.index2Node;
        for (let i = 0; i < r.length; i++) {
          let a = r[i], o = e(a, i, this.network);
          this.network.colors[i * 4 + 0] = o[0], this.network.colors[i * 4 + 1] = o[1], this.network.colors[i * 4 + 2] = o[2], o.length > 3 && (this.network.colors[i * 4 + 3] = o[3]);
        }
      } else {
        if (typeof e == "number")
          return this.network.colors[this.network.ID2index[e]];
        {
          let r = this.network.index2Node;
          for (let i = 0; i < r.length; i++)
            this.network.colors[i * 4 + 0] = e[0], this.network.colors[i * 4 + 1] = e[1], this.network.colors[i * 4 + 2] = e[2], e.length > 3 && (this.network.colors[i * 4 + 3] = e[3]);
        }
      }
    } else if (typeof e == "function") {
      let r = this.network.ID2index[n], i = e(n, r, this.network);
      this.network.colors[r * 4 + 0] = i[0], this.network.colors[r * 4 + 1] = i[1], this.network.colors[r * 4 + 2] = i[2], i.length > 3 && (this.network.colors[r * 4 + 3] = i[3]);
    } else {
      let r = this.network.ID2index[n];
      this.network.colors[r * 4 + 0] = e[0], this.network.colors[r * 4 + 1] = e[1], this.network.colors[r * 4 + 2] = e[2], e.length > 3 && (this.network.colors[r * 4 + 3] = e[3]);
    }
    return this;
  }
  /** Set the size of the nodes.
   * @method nodeSize
   * @memberof Helios
   * @instance
   * @param {number|Function} sizeInput - The size of the nodes or a function that returns the size of the nodes.
   * @param {string} [nodeID] - The ID of the node to set the size of. If not specified, the size of all nodes will be set.
   * @chainable
   * @return {number|this} The size of the nodes or the current Helios instance for chaining.
   * @example
   * // Set the size of all nodes to 10
   * helios.nodeSize(10);
   * @example
   * // Set the size of a specific node to 10
   * helios.nodeSize(10, "nodeID");
   * @example
   * // Set the size of all nodes to a random size
   * helios.nodeSize(() => {
   * 	return Math.random() * 10;
   * });
   * @example
   * // Set the size of all nodes based on an node attribute called `altSize`
   * helios.nodeSize((node) => {
   * 	return node.altSize;
   * });
   */
  nodeSize(e, n) {
    if (typeof n > "u") {
      if (typeof e > "u")
        return this.network.sizes;
      if (typeof e == "function") {
        let r = this.network.index2Node;
        for (let i = 0; i < r.length; i++) {
          let a = r[i], o = e(a, this.network);
          this.network.sizes[i] = o;
        }
      } else {
        let r = this.network.index2Node;
        for (let i = 0; i < r.length; i++)
          this.network.sizes[i] = e;
      }
    } else if (typeof e == "function") {
      let r = e(n, this.network), i = this.network.ID2index[n];
      this.network.sizes[i] = r;
    } else {
      let r = this.network.ID2index[n];
      this.network.sizes[r] = e;
    }
    return this;
  }
  /** Set the color of the node outlines.
   * @method nodeOutlineColor
   * @memberof Helios
   * @instance
   * @param {number[]|Function} colorInput - The color of the node outlines or a function that returns the color of the node outlines. Uses RGBA or RGBA formatted array.
   * @param {string} [nodeID] - The ID of the node to set the color of. If not specified, the color of all nodes will be set.
   * @chainable
   * @return {number[]|this} The color of the node outlines or the current Helios instance for chaining.
   * @example
   * // Set the color of all node outlines to red
   * helios.nodeOutlineColor([1, 0, 0, 1]);
   * @example
   * // Set the color of a specific node outline to red
   * helios.nodeOutlineColor([1, 0, 0, 1], "nodeID");
   * @example
   * // Set the color of all node outlines to a random color
   * helios.nodeOutlineColor(() => {
   * 	return [Math.random(), Math.random(), Math.random(), 1];
   * });
   * @example
   * // Set the color of all node outlines based on an node attribute called `altColor`
   * helios.nodeOutlineColor((node) => {
   * 	return node.altColor;
   * });
   */
  nodeOutlineColor(e, n) {
    if (typeof n > "u") {
      if (typeof e > "u")
        return this.network.outlineColors;
      if (typeof e == "function") {
        let r = this.network.index2Node;
        for (let i = 0; i < r.length; i++) {
          let a = r[i], o = e(a, i, this.network);
          this.network.outlineColors[i * 4 + 0] = o[0], this.network.outlineColors[i * 4 + 1] = o[1], this.network.outlineColors[i * 4 + 2] = o[2], o.length > 3 && (this.network.outlineColors[i * 4 + 3] = o[3]);
        }
      } else {
        if (typeof e == "number")
          return this.network.outlineColors[this.network.ID2index[e]];
        {
          let r = this.network.index2Node;
          for (let i = 0; i < r.length; i++)
            this.network.outlineColors[i * 4 + 0] = e[0], this.network.outlineColors[i * 4 + 1] = e[1], this.network.outlineColors[i * 4 + 2] = e[2], e.length > 3 && (this.network.outlineColors[i * 4 + 3] = e[3]);
        }
      }
    } else if (typeof e == "function") {
      let r = this.network.ID2index[n], i = e(n, r, this.network);
      this.network.outlineColors[r * 4 + 0] = i[0], this.network.outlineColors[r * 4 + 1] = i[1], this.network.outlineColors[r * 4 + 2] = i[2], i.length > 3 && (this.network.outlineColors[r * 4 + 3] = i[3]);
    } else {
      let r = this.network.ID2index[n];
      this.network.outlineColors[r * 4 + 0] = e[0], this.network.outlineColors[r * 4 + 1] = e[1], this.network.outlineColors[r * 4 + 2] = e[2], e.length > 3 && (this.network.outlineColors[r * 4 + 3] = e[3]);
    }
    return this;
  }
  /** Set the width of the node outlines.
   * @method nodeOutlineWidth
   * @memberof Helios
   * @instance
   * @param {number|Function} widthInput - The width of the node outlines or a function that returns the width of the node outlines.
   * @param {string} [nodeID] - The ID of the node to set the width of. If not specified, the width of all nodes will be set.
   * @chainable
   * @return {number|this} The width of the node outlines or the current Helios instance for chaining.
   * @example
   * // Set the width of all node outlines to 5
   * helios.nodeOutlineWidth(5);
   * @example
   * // Set the width of a specific node outline to 5
   * helios.nodeOutlineWidth(5, "nodeID");
   * @example
   * // Set the width of all node outlines to a random width
   * helios.nodeOutlineWidth(() => {
   * 	return Math.random() * 10;
   * });
   * @example
   * // Set the width of all node outlines based on an node attribute called `altWidth`
   * helios.nodeOutlineWidth((node) => {
   * 	return node.altWidth;
   * });
   * @example
   * // Set the width of all node outlines based on an node attribute called `altWidth`
   * helios.nodeOutlineWidth((node) => {
   * 	return node.altWidth;
   * });
   */
  nodeOutlineWidth(e, n) {
    if (typeof n > "u") {
      if (typeof e > "u")
        return this.network.outlineWidths;
      if (typeof e == "function") {
        let r = this.network.index2Node;
        for (let i = 0; i < r.length; i++) {
          let a = r[i], o = e(a, this.network);
          this.network.outlineWidths[a.index] = o;
        }
      } else {
        let r = this.network.index2Node;
        for (let i = 0; i < r.length; i++)
          this.network.outlineWidths[i] = e;
      }
    } else if (typeof e == "function") {
      let r = e(n, this.network), i = this.network.ID2index[n];
      this.network.outlineWidths[i] = r;
    } else {
      let r = this.network.ID2index[n];
      this.network.outlineWidths[r] = e;
    }
    return this;
  }
  /** Set the color of the edges.
   * @method edgeColor
   * @memberof Helios
   * @instance
   * @param {number|Function} colorInput - The color of the edges or a function that returns the color of the edges.
   * @param {string} [edgeID] - The ID of the edge to set the color of. If not specified, the color of all edges will be set.
   * @chainable
   * @return {number|this} The color of the edges or the current Helios instance for chaining.
   * @example
   * // Set the color of all edges to red
   * helios.edgeColor([1, 0, 0, 1]);
   * @example
   * // Set the color of a specific edge to red
   * helios.edgeColor([1, 0, 0, 1], "edgeID");
   * @example
   * // Set the color of all edges to a random color
   * helios.edgeColor(() => {
   * 	return [Math.random(), Math.random(), Math.random(), 1];
   * });
   * @example
   * // Set the color of all edges based on an edge attribute called `altColor`
   * helios.edgeColor((edge) => {
   * 	return edge.altColor;
   * });
   */
  edgeColor(e, n) {
    if (typeof n > "u") {
      if (typeof e > "u")
        return this.network.edgeColors;
      if (typeof e == "function") {
        let r = this.network.index2Node, i = this.network.indexedEdges;
        for (let a = 0; a < i.length / 2; a++) {
          let o = r[i[a * 2]], s = r[i[a * 2 + 1]], h = e(a, o, s, this.network);
          h.length == 2 ? (this.network.edgeColors[a * 2 * 4 + 0] = h[0][0], this.network.edgeColors[a * 2 * 4 + 1] = h[0][1], this.network.edgeColors[a * 2 * 4 + 2] = h[0][2], this.network.edgeColors[(a * 2 + 1) * 4 + 0] = h[1][0], this.network.edgeColors[(a * 2 + 1) * 4 + 1] = h[1][1], this.network.edgeColors[(a * 2 + 1) * 4 + 2] = h[1][2], h[0].length > 3 && (this.network.edgeColors[(a * 2 + 1) * 4 + 3] = h[0][3]), h[1].length > 3 && (this.network.edgeColors[(a * 2 + 1) * 4 + 3] = h[1][3])) : (this.network.edgeColors[a * 2 * 4 + 0] = h[0], this.network.edgeColors[a * 2 * 4 + 1] = h[1], this.network.edgeColors[a * 2 * 4 + 2] = h[2], this.network.edgeColors[(a * 2 + 1) * 4 + 0] = h[0], this.network.edgeColors[(a * 2 + 1) * 4 + 1] = h[1], this.network.edgeColors[(a * 2 + 1) * 4 + 2] = h[2], h.length > 3 && (this.network.edgeColors[(a * 2 + 1) * 4 + 3] = h[3], this.network.edgeColors[(a * 2 + 1) * 4 + 3] = h[3]));
        }
      } else {
        if (typeof e == "number")
          return [this.network.edgeColors[e * 2 + 0], this.network.edgeColors[e * 2 + 1]];
        {
          let r = this.network.index2Node, i = this.network.indexedEdges;
          for (let a = 0; a < i.length / 2; a++)
            r[i[a * 2]], r[i[a * 2 + 1]], e.length == 2 ? (this.network.edgeColors[a * 2 * 4 + 0] = e[0][0], this.network.edgeColors[a * 2 * 4 + 1] = e[0][1], this.network.edgeColors[a * 2 * 4 + 2] = e[0][2], this.network.edgeColors[(a * 2 + 1) * 4 + 0] = e[1][0], this.network.edgeColors[(a * 2 + 1) * 4 + 1] = e[1][1], this.network.edgeColors[(a * 2 + 1) * 4 + 2] = e[1][2], e[0].length > 3 && (this.network.edgeColors[(a * 2 + 1) * 4 + 3] = e[0][3]), e[1].length > 3 && (this.network.edgeColors[(a * 2 + 1) * 4 + 3] = e[1][3])) : (this.network.edgeColors[a * 2 * 4 + 0] = e[0], this.network.edgeColors[a * 2 * 4 + 1] = e[1], this.network.edgeColors[a * 2 * 4 + 2] = e[2], this.network.edgeColors[(a * 2 + 1) * 4 + 0] = e[0], this.network.edgeColors[(a * 2 + 1) * 4 + 1] = e[1], this.network.edgeColors[(a * 2 + 1) * 4 + 2] = e[2], e.length > 3 && (this.network.edgeColors[(a * 2 + 1) * 4 + 3] = e[3], this.network.edgeColors[(a * 2 + 1) * 4 + 3] = e[3]));
        }
      }
    } else {
      typeof e == "function" && e(nodeID, r, this.network);
      let r = this.network.ID2index[nodeID];
      e.length == 2 ? (this.network.edgeColors[edgeIndex * 2 * 4 + 0] = e[0][0], this.network.edgeColors[edgeIndex * 2 * 4 + 1] = e[0][1], this.network.edgeColors[edgeIndex * 2 * 4 + 2] = e[0][2], this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 0] = e[1][0], this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 1] = e[1][1], this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 2] = e[1][2], e[0].length > 3 && (this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = e[0][3]), e[1].length > 3 && (this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = e[1][3])) : (this.network.edgeColors[edgeIndex * 2 * 4 + 0] = e[0], this.network.edgeColors[edgeIndex * 2 * 4 + 1] = e[1], this.network.edgeColors[edgeIndex * 2 * 4 + 2] = e[2], this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 0] = e[0], this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 1] = e[1], this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 2] = e[2], e.length > 3 && (this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = e[3], this.network.edgeColors[(edgeIndex * 2 + 1) * 4 + 3] = e[3]));
    }
    return this;
  }
  /** Set the width of the edges. 
   * @method edgeWidth
   * @memberof Helios
   * @instance
   * @param {number|function} widthInput - The width of the edges. If a function is provided, it will be called for each edge. The function should return a number or an array of two numbers, the width at the source and target.
   * @param {number} [edgeIndex] - The index of the edge. If not provided, the width will be set for all edges.
   * @return {number|this} - The width of the edge if no arguments are provided, otherwise the Helios instance for chaining.
   * @example
   * // Set the width of all edges to 5.
   * helios.edgeWidth(5);
   * @example
   * // Set the width of the edge with index 0 to 5.
   * helios.edgeWidth(5, 0);
   * @example
   * // Set the width of all edges to a random number between 1 and 10.
   * helios.edgeWidth(sourceNode, targetNode, edgeIndex) => {
   *    return Math.random() * 9 + 1;
   * });
   * @example
   * // Set the width of all edges to 5 at source and 2 at target.
   * helios.edgeWidth(sourceNode, targetNode, edgeIndex) => {
   *   return [5, 2];
   * });
   * @example
   * // Set the width of the edge with altSizes properties from source and target.
   * helios.edgeWidth(sourceNode, targetNode, edgeIndex) => {
   *  return [sourceNode.altSizes, targetNode.altSizes];
   * });
   */
  edgeWidth(e, n) {
    if (typeof n > "u") {
      if (typeof e > "u")
        return this.network.edgeColors;
      if (typeof e == "function") {
        let r = this.network.index2Node, i = this.network.indexedEdges;
        for (let a = 0; a < i.length / 2; a++) {
          let o = r[i[a * 2]], s = r[i[a * 2 + 1]], h = e(o, s, a, this.network);
          typeof h == "number" ? (this.network.edgeSizes[a * 2] = h, this.network.edgeSizes[a * 2 + 1] = h) : (this.network.edgeSizes[a * 2] = h[0], this.network.edgeSizes[a * 2 + 1] = h[1]);
        }
      } else {
        let r = this.network.indexedEdges;
        for (let i = 0; i < r.length / 2; i++)
          typeof e == "number" ? (this.network.edgeSizes[i * 2] = e, this.network.edgeSizes[i * 2 + 1] = e) : (this.network.edgeSizes[i * 2] = e[0], this.network.edgeSizes[i * 2 + 1] = e[1]);
      }
    } else if (typeof e == "function") {
      let r = this.network.index2Node, i = this.network.indexedEdges, a = r[i[n * 2]], o = r[i[n * 2 + 1]], s = e(a, o, n, this.network);
      typeof s == "number" ? (this.network.edgeSizes[n * 2] = s, this.network.edgeSizes[n * 2 + 1] = s) : (this.network.edgeSizes[n * 2] = s[0], this.network.edgeSizes[n * 2 + 1] = s[1]);
    } else
      typeof e == "number" ? (this.network.edgeSizes[n * 2] = e, this.network.edgeSizes[n * 2 + 1] = e) : (this.network.edgeSizes[n * 2] = e[0], this.network.edgeSizes[n * 2 + 1] = e[1]);
    return this;
  }
  /** Project the positions of the nodes provided to the screen (using the projection matrix).
   * @method getProjectedPositions
   * @memberof Helios
   * @instance
   * @param {Node[]|number} nodes - The nodes or indices of nodes to project.
   * @return {Float32Array} - The projected positions of the nodes.
   * @example
   * // Get the projected positions of all nodes.
   * let projectedPositions = helios.getProjectedPositions(helios.network.nodes);
   */
  getProjectedPositions(e) {
    if (e === void 0 && (e = this.network.nodes), e.length > 0) {
      this.gl;
      let n = new Uint32Array(e.length);
      if (typeof e[0] == "number")
        for (let s = 0; s < e.length; s++)
          n[s] = e[s];
      else {
        n = new Uint32Array(e.length);
        for (let s = 0; s < e.length; s++)
          n[s] = e[s].index;
      }
      let r = this.network.positions, i = new Float32Array(e.length * 4), [a, o] = this._lastCanvasDimensions;
      for (let s = 0; s < e.length; s++) {
        let h = n[s], u = [r[h * 3], r[h * 3 + 1], r[h * 3 + 2], 1], l = pr();
        co(l, u, this.projectionViewMatrix);
        let f = 1 / l[3], c = a / 2 + l[0] * a * 0.5 * f, d = o / 2 - l[1] * o * 0.5 * f;
        i[s * 4] = c, i[s * 4 + 1] = d, i[s * 4 + 2] = l[2], i[s * 4 + 3] = l[3];
      }
      return i;
    } else
      return Float32Array(0);
  }
  /** Pick a node at the given screen coordinates.
   * @method pickNode
   * @memberof Helios
   * @instance
   * @param {number} x - The x coordinate of the point to pick.
   * @param {number} y - The y coordinate of the point to pick.
   * @return {Node} - The node at the given point, or null if no node was picked.
   * @example
   * // Pick a node at the center of the canvas.
   * let node = helios.pickNode(helios.canvasElement.width / 2, helios.canvasElement.height / 2);
   * if(node !== null) {
   *    console.log("Picked node " + node.index);
   * }
   * @example
   * // Pick a node at the center of the canvas, and highlight it.
   * let node = helios.pickNode(helios.canvasElement.width / 2, helios.canvasElement.height / 2);
   * if(node !== null) {
   *   console.log("Picked node " + node.index);
   *  helios.highlightNode(node);
   * }
   */
  pickPoint(e, n) {
    const r = this.canvasElement.width * this.pickingResolutionRatio, i = this.canvasElement.height * this.pickingResolutionRatio, a = Math.round(e * r / this.canvasElement.clientWidth - 0.5), o = Math.round(i - n * i / this.canvasElement.clientHeight - 0.5), s = new Uint8Array(4), h = this.gl;
    return h.bindFramebuffer(h.FRAMEBUFFER, this.pickingFramebuffer), h.readPixels(
      a,
      // x
      o,
      // y
      1,
      // width
      1,
      // height
      h.RGBA,
      // format
      h.UNSIGNED_BYTE,
      // type
      s
    ), s[0] + (s[1] << 8) + (s[2] << 16) + (s[3] << 24) - 1;
  }
  _consolidateCentroids(e, n) {
    for (const [r, i] of e) {
      const a = n.get(r);
      i[0] /= a, i[1] /= a;
    }
  }
  _calculateCentroidForAttribute(e, n, r, i) {
    r.has(e) || (r.set(e, [0, 0]), i.set(e, 0));
    const a = r.get(e);
    a[0] += n[0], a[1] += n[1];
    const o = i.get(e);
    i.set(e, o + 1);
  }
  _updateTrackerNodesData() {
    const e = this.gl, n = this._trackingBufferPixels, r = this._nodesOnScreen;
    e.bindFramebuffer(e.FRAMEBUFFER, this._trackingFramebuffer), e.readPixels(
      0,
      // x
      0,
      // y
      this._trackingFramebuffer.size.width,
      // width
      this._trackingFramebuffer.size.height,
      // height
      e.RGBA,
      // format
      e.UNSIGNED_BYTE,
      // type
      n
    );
    for (let i = 0; i < n.length; i += 4) {
      const a = n[i] + (n[i + 1] << 8) + (n[i + 2] << 16) + (n[i + 3] << 24) - 1;
      r[i / 4] = a;
    }
  }
  /** Pick a node at the given screen coordinates.
   * @method updateAttributeTrackers
   * @memberof Helios
   * @instance
   * @chainable
   * @return {Helios|this} - The Helios instance (for chaining).
   */
  updateAttributeTrackers(e = !1) {
    if (!this._trackingBufferEnabled || Object.keys(this._attributeTrackers).length === 0)
      return this;
    const n = this._attributeTrackers, r = this._trackingFramebuffer.size.width * this._trackingFramebuffer.size.height, i = this._nodesOnScreen, a = this._pixelXYOnScreen;
    e || this._updateTrackerNodesData();
    const o = performance.now();
    let s = o - this._trackingLastTime || o;
    s > 1e3 && (s = 1e3), this._trackingLastTime = o;
    for (let h in n) {
      const u = n[h], l = u.pixelCounter, f = l.getSortedKeys(), c = u.smoothness, d = u.minProportion, v = u.calculateCentroid, g = u.centroidPositions, m = u.attribute, _ = u.maxLabels, b = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), p = Math.exp(-s / (100 * c));
      for (let y = 0; y < f.length; y++) {
        f[y];
        const A = l.get(f[y]) * p;
        if (A > d) {
          if (l.set(f[y], A), v && g.has(f[y])) {
            const C = g.get(f[y]);
            C && (C[0] *= p, C[1] *= p);
          }
        } else
          l.delete(f[y]), v && g.delete(f[y]);
      }
      if (m == "index")
        for (let y = 0; y < i.length; y++) {
          const A = i[y];
          if (A >= 0) {
            const C = (l.get(A) || 0) + 1 / r * (1 - p);
            l.set(A, C), v && this._calculateCentroidForAttribute(A, a[y], b, w);
          }
        }
      else if (m == "node")
        for (let y = 0; y < i.length; y++) {
          const A = this.network.index2Node;
          if (nodeIndex >= 0) {
            const C = A[nodeIndex], k = (l.get(C) || 0) + 1 / r * (1 - p);
            l.set(C, k), v && this._calculateCentroidForAttribute(C, a[y], b, w);
          }
        }
      else if (typeof m == "function") {
        const y = this.network.index2Node;
        for (let A = 0; A < i.length; A++) {
          const C = i[A];
          if (C >= 0) {
            const k = y[C], M = m(k, C), N = (l.get(M) || 0) + 1 / r * (1 - p);
            l.set(M, N), v && this._calculateCentroidForAttribute(M, a[A], b, w);
          }
        }
      } else {
        const y = this.network.index2Node;
        for (let A = 0; A < i.length; A++) {
          const C = i[A];
          if (C >= 0) {
            const M = y[C][m], N = (l.get(M) || 0) + 1 / r * (1 - p);
            l.set(M, N), v && this._calculateCentroidForAttribute(M, a[A], b, w);
          }
        }
      }
      if (v) {
        this._consolidateCentroids(b, w);
        for (let [y, A] of b) {
          const C = g.get(y), k = A;
          C ? (C[0] += k[0] * (1 - p), C[1] += k[1] * (1 - p)) : g.set(y, k);
        }
      }
      if (_ >= 0) {
        let y = l.getSortedKeys(), A = y.slice(_, y.length);
        for (let C = 0; C < A.length; C++)
          l.delete(A[C]), g.delete(A[C]);
      }
    }
    return this;
  }
  /** Returns the attributes on screen
   * @method trackedAttributesOnScreen
   * @memberof Helios
   * @instance
   * @private
   * @param {string} trackerName - Name of the tracker to get the attributes from.
   * @return {Array} - Array of attributes on screen. Each entry is an array of two or four elements. 
   * if the tracker saves the centroid, 4 elements are returned: [attribute,proportion, x, y], otherwise [attribute,proportion]
   */
  trackedAttributesOnScreen(e) {
    if (this._trackingBufferEnabled && this._attributeTrackers[e]) {
      const n = this._attributeTrackers[e], r = n.pixelCounter;
      if (n.calculateCentroid) {
        const i = n.centroidPositions, a = r.getSortedPairs();
        for (let o = 0; o < a.length; o++) {
          const s = a[o][0], h = a[o][1], u = i.get(s);
          a[o] = [s, h, u[0], u[1]];
        }
        return a;
      } else
        return r.getSortedPairs();
    }
  }
  /** Returns tracked attributes centroids
   * @method trackedAttributesCentroids
   * @memberof Helios
   * @instance
   * @private
   * @param {string} trackerName - Name of the tracker to get the attributes from.
   * 
   * @return {Array} - Centroid of trackerName.
   * 
   */
  trackedAttributesCentroids(e) {
    if (this._trackingBufferEnabled && this._attributeTrackers[e])
      return this._attributeTrackers[e].centroidPositions;
  }
  /** Update the attribute trackers Schedule.
   * @method _updateTrackerScheduleTask
   * @memberof Helios
   * @instance
   * @private
   */
  _updateTrackerScheduleTask() {
    const e = "9.5.tracker_update";
    !this._trackingBufferEnabled || Object.keys(this._attributeTrackers).length === 0 ? this.scheduler.hasTask(e) && this.scheduler.unschedule(e) : this.scheduler.hasTask(e) || this.scheduler.schedule({
      name: e,
      callback: (n, r) => {
        this.updateAttributeTrackers(!0);
        for (let i in this._attributeTrackers) {
          const a = this._attributeTrackers[i];
          a.onTrack && a.onTrack(this.trackedAttributesOnScreen(i), a);
        }
      },
      delay: 0,
      repeatInterval: this._trackingNodeMinimumUpdateInterval,
      repeat: !0,
      synchronized: !0,
      afterRedraw: !0,
      immediateUpdates: !1,
      redraw: !1,
      updateNodesGeometry: !1,
      updateEdgesGeometry: !1
    });
  }
  /** Set the attribute to track.
   * @method trackAttribute
   * @memberof Helios
   * @instance
   * @chainable
   * @param {string} trackerName - A tracker name so that it can be untracked later.
   * @param {string|function} attribute - The attribute to track. If a string, it is the name of the attribute of the node to track (use "index" for index and "node" for the node itself). If a function, it is a function that takes a node and its index as arguments and returns the attribute to track.
   * 	 * @param {Object} options - The configuration object
   * @param {string} [options.minProportion=0.001] - The minimum proportion of the screen that a node must occupy to be tracked.
   * @param {string} [options.smoothness=0.8] - The smoothness of the tracking. The higher the value, the more the tracking is smoothed.
   * @param {string} [options.maxLabels=20] - The maximum number of labels to display. If -1, all labels are displayed.
   * @param {string} [options.calculateCentroid=false] - If true, the centroid of the tracked nodes is calculated and expored as the 3rd and 4th (x and y) elements of the tracker results.
   * @param {function} [options.onTrack=null] - A callback function that is called when a node is tracked. It takes the attribute entries and relative proportions as argument and the tracker (attributeProportions,tracker)=>{} 
   * @return {Helios|this} - The Helios instance for chaining.
   * @example
   * // Track the index of the nodes, with a minimum proportion of 0.001, a smoothness of 0.8 and a maximum of 10 labels.
   * helios.trackAttribute("indexTracker","index",{minProportion:0.001,smoothness:0.8,maxLabels:20});
   * @example
   * // Track the community attribute of the nodes, with a minimum proportion of 0.001, a smoothness of 0.8 and a maximum of 20 labels.
   * helios.trackAttribute("communityTracker","community",{minProportion:0.001,smoothness:0.8,maxLabels:20});
   */
  trackAttribute(e, n, { minProportion: r = 1e-3, smoothness: i = 0.8, maxLabels: a = 20, calculateCentroid: o = !1, onTrack: s = null } = {}) {
    return e in this._attributeTrackers && this.untrackAttribute(e), this._attributeTrackers[e] = {
      attribute: n,
      pixelCounter: new xl(!1),
      minProportion: r,
      smoothness: i,
      maxLabels: a,
      calculateCentroid: o,
      centroidPositions: /* @__PURE__ */ new Map(),
      onTrack: s
    }, this._updateTrackerScheduleTask(), this;
  }
  /** Untrack the attribute.
   * @method untrackAttribute
   * @memberof Helios
   * @instance
   * @chainable
   * @param {string|function} attribute - The attribute to untrack. If a string, it is the name of the attribute of the node to untrack (use "index" for index and "node" for the node itself). If a function, it is a function that takes a node and its index as arguments and returns the attribute to untrack.
   * @return {Helios|this} - The Helios instance for chaining.
   * @example
   * // Untrack the index of the nodes.
   * helios.untrackAttribute("indexTracker");
   */
  untrackAttribute(e) {
    return this._attributeTrackers = this._attributeTrackers.filter((n) => n.attribute !== e), this._updateTrackerScheduleTask(), this;
  }
  /** attributesTrackers getter.
   * @method attributesTrackers
   * @memberof Helios
   * @instance
   * @return {Object} - The tracked attributes.
   * @example
   * // Get the tracked attributes.
   * let attributesTrackers = helios.attributesTrackers();
   */
  attributesTrackers() {
    return Object.assign({}, this._attributeTrackers);
  }
  /** Set/get tracker node update interval.
   * @method trackingNodeUpdateInterval
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} interval - The interval in milliseconds.
   * @return {Helios|this} - The Helios instance for chaining, or the current interval if no argument is provided.
   * @example
   * // Set the tracker node update interval to 200ms.
   * helios._trackingBufferUpdateInterval(200);
   * @example
   * // Get the tracker node update interval.
   * let interval = helios._trackingBufferUpdateInterval();
   * console.log(interval);
   */
  trackingBufferUpdateInterval(e) {
    return typeof e > "u" ? this._trackingBufferUpdateInterval : (this._trackingBufferUpdateInterval = e, this._updateTrackerScheduleTask(), this);
  }
  /** Set/get tracker update interval
   * @method trackingUpdateInterval
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} interval - The interval in milliseconds.
   * @return {Helios|this} - The Helios instance for chaining, or the current interval if no argument is provided.
   * @example
   * // Set the tracker update interval to 33ms.
   * helios._trackingUpdateInterval(33);
   * @example
   * // Get the tracker update interval.
   * let interval = helios._trackingUpdateInterval();
   * console.log(interval);
   */
  trackingUpdateInterval(e) {
    return typeof e > "u" ? this._trackingUpdateInterval : (this._trackingUpdateInterval = e, this._updateTrackerScheduleTask(), this);
  }
  /** Set/get edge global opacity scale. The opacity of each edge is calculated as: opacity = globalBase + globalScale * edgeOpacity
   * @method edgesGlobalOpacityScale
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} opacity - The global opacity scale of the edges.
   * @return {Helios|this} - The Helios instance for chaining, or the current global opacity if no argument is provided.
   * @example
   * // Set the global opacity of the edges to 0.5.
   * helios.edgesGlobalOpacityScale(0.5);
   */
  edgesGlobalOpacityScale(e) {
    return typeof e > "u" ? this._edgesGlobalOpacityScale : (this._edgesGlobalOpacityScale = e, this);
  }
  /** Set/get edge global opacity base. The opacity of each edge is calculated as: opacity = globalBase + globalScale * edgeOpacity
   * @method edgesGlobalOpacityBase
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} opacity - The global opacity base of the edges.
   * @return {Helios|this} - The Helios instance for chaining, or the current global opacity if no argument is provided.
   * @example
   * // Set the global opacity base of the edges to 0.5.
   * helios.edgesGlobalOpacityBase(0.5);
   */
  edgesGlobalOpacityBase(e) {
    return typeof e > "u" ? this._edgesGlobalOpacityBase : (this._edgesGlobalOpacityBase = e, this);
  }
  /** Set/get edge global width scale. The width of each edge is calculated as: width = globalBase + globalScale * edgeWidth
   * @method edgesGlobalWidthScale
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} width - The global width scale of the edges.
   * @return {Helios|this} - The Helios instance for chaining, or the current global width if no argument is provided.
   * @example
   * // Set the global width of the edges to 0.5.
   * helios.edgesGlobalWidthScale(0.5);
   */
  edgesGlobalWidthScale(e) {
    return typeof e > "u" ? this._edgesGlobalWidthScale : (this._edgesGlobalWidthScale = e, this);
  }
  /** Set/get edge global width base. The width of each edge is calculated as: width = globalBase + globalScale * edgeWidth
   * @method edgesGlobalWidthBase
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} width - The global width base of the edges.
   * @return {Helios|this} - The Helios instance for chaining, or the current global width if no argument is provided.
   * @example
   * // Set the global width base of the edges to 0.5.
   * helios.edgesGlobalWidthBase(0.5);
   */
  edgesGlobalWidthBase(e) {
    return typeof e > "u" ? this._edgesGlobalWidthBase : (this._edgesGlobalWidthBase = e, this);
  }
  /** Set/get node global opacity scale. The opacity of each node is calculated as: opacity = globalBase + globalScale * nodeOpacity
   * @method nodesGlobalOpacityScale
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} opacity - The global opacity scale of the nodes.
   * @return {Helios|this} - The Helios instance for chaining, or the current global opacity if no argument is provided.
   * @example
   * // Set the global opacity of the nodes to 0.5.
   * helios.nodesGlobalOpacityScale(0.5);
   * @example
   * // Get the global opacity of the nodes.
   * let scale = helios.nodesGlobalOpacityScale();
   */
  nodesGlobalOpacityScale(e) {
    return typeof e > "u" ? this._nodesGlobalOpacityScale : (this._nodesGlobalOpacityScale = e, this);
  }
  /** Set/get node global opacity base. The opacity of each node is calculated as: opacity = globalBase + globalScale * nodeOpacity
   * @method nodesGlobalOpacityBase
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} opacity - The global opacity base of the nodes.
   * @return {Helios|this} - The Helios instance for chaining, or the current global opacity if no argument is provided.
   * @example
   * // Set the global opacity base of the nodes to 0.5.
   * helios.nodesGlobalOpacityBase(0.5);
   * @example
   * // Get the global opacity base of the nodes.
   * let base = helios.nodesGlobalOpacityBase();
   */
  nodesGlobalOpacityBase(e) {
    return typeof e > "u" ? this._nodesGlobalOpacityBase : (this._nodesGlobalOpacityBase = e, this);
  }
  /** Set/get node global size scale. The size of each node is calculated as: size = globalBase + globalScale * nodeSize
   * @method nodesGlobalSizeScale
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} size - The global size scale of the nodes.
   * @return {Helios|this} - The Helios instance for chaining, or the current global size if no argument is provided.
   * @example
   * // Set the global size of the nodes to 0.5.
   * helios.nodesGlobalSizeScale(0.5);
   * @example
   * // Get the global size of the nodes.
   * let scale = helios.nodesGlobalSizeScale();
   */
  nodesGlobalSizeScale(e) {
    return typeof e > "u" ? this._nodesGlobalSizeScale : (this._nodesGlobalSizeScale = e, this);
  }
  /** Set/get node global size base. The size of each node is calculated as: size = globalBase + globalScale * nodeSize
   * @method nodesGlobalSizeBase
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} size - The global size base of the nodes.
   * @return {Helios|this} - The Helios instance for chaining, or the current global size if no argument is provided.
   * @example
   * // Set the global size base of the nodes to 0.5.
   * helios.nodesGlobalSizeBase(0.5);
   * @example
   * // Get the global size base of the nodes.
   * let base = helios.nodesGlobalSizeBase();
   */
  nodesGlobalSizeBase(e) {
    return typeof e > "u" ? this._nodesGlobalSizeBase : (this._nodesGlobalSizeBase = e, this);
  }
  /** Set/get node global outline width scale. The outline width of each node is calculated as: width = globalBase + globalScale * nodeOutlineWidth
   * @method nodesGlobalOutlineWidthScale
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} width - The global outline width scale of the nodes.
   * @return {Helios|this} - The Helios instance for chaining, or the current global outline width if no argument is provided.
   * @example
   * // Set the global outline width of the nodes to 0.5.
   * helios.nodesGlobalOutlineWidthScale(0.5);
   * @example
   * // Get the global outline width of the nodes.
   * let scale = helios.nodesGlobalOutlineWidthScale();
   */
  nodesGlobalOutlineWidthScale(e) {
    return typeof e > "u" ? this._nodesGlobalOutlineWidthScale : (this._nodesGlobalOutlineWidthScale = e, this);
  }
  /** Set/get node global outline width base. The outline width of each node is calculated as: width = globalBase + globalScale * nodeOutlineWidth
   * @method nodesGlobalOutlineWidthBase
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} width - The global outline width base of the nodes.
   * @return {Helios|this} - The Helios instance for chaining, or the current global outline width if no argument is provided.
   * @example
   * // Set the global outline width base of the nodes to 0.5.
   * helios.nodesGlobalOutlineWidthBase(0.5);
   * @example
   * // Get the global outline width base of the nodes.
   * let base = helios.nodesGlobalOutlineWidthBase();
   */
  nodesGlobalOutlineWidthBase(e) {
    return typeof e > "u" ? this._nodesGlobalOutlineWidthBase : (this._nodesGlobalOutlineWidthBase = e, this);
  }
  /** Set/get node global outline opacity scale. The outline opacity of each node is calculated as: opacity = globalBase + globalScale * nodeOutlineOpacity
   * @method nodesGlobalOutlineOpacityScale
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} opacity - The global outline opacity scale of the nodes.
   * @return {Helios|this} - The Helios instance for chaining, or the current global outline opacity if no argument is provided.
   * @example
   * // Set the global outline opacity of the nodes to 0.5.
   * helios.nodesGlobalOutlineOpacityScale(0.5);
   * @example
   * // Get the global outline opacity of the nodes.
   * let scale = helios.nodesGlobalOutlineOpacityScale();
   */
  nodeOpacity(e) {
    if (typeof e > "u")
      return this.network.colors.map((n) => n[3]);
    if (typeof e == "function") {
      let n = this.network.index2Node;
      for (let r = 0; r < n.length; r++) {
        let i = n[r], a = e(i, r, this.network);
        this.network.colors[r * 4 + 3] = a;
      }
    } else
      for (let n = 0; n < allNodes.length; n++)
        this.network.colors[n * 4 + 3] = e;
    return this;
  }
  /** Enables or disables updating the edge colors to match the node colors.
   * @method edgesColorsFromNodes
   * @memberof Helios
   * @instance
   * @chainable
   * @param {boolean} edgesColorsFromNodes - Whether to update the edge colors to match the node colors.
   * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
   * @example
   * // Enable updating the edge colors to match the node colors.
   * helios.edgesColorsFromNodes(true);
   */
  edgesColorsFromNodes(e) {
    return typeof e > "u" ? this._edgesColorsFromNodes : (this._edgesColorsFromNodes = e, this);
  }
  /** Enables or disables updating the edge widths to match the node widths.
   * @method edgesWidthFromNodes
   * @memberof Helios
   * @instance
   * @chainable
   * @param {boolean} edgesWidthFromNodes - Whether to update the edge widths to match the node widths.
   * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
   * @example
   * // Enable updating the edge widths to match the node widths.
   * helios.edgesWidthFromNodes(true);
   */
  edgesWidthFromNodes(e) {
    return typeof e > "u" ? this._edgesWidthFromNodes : (this._edgesWidthFromNodes = e, this);
  }
  //#endregion
  /** Enables or disables additive blending (Useful for dark backgrounds).
   * @method additiveBlending
   * @memberof Helios
   * @instance
   * @chainable
   * @param {boolean} enableAdditiveBlending - Whether to enable additive blending.
   * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
   * @example
   * // Enable additive blending.
   * helios.additiveBlending(true);
   * @example
   * // Disable additive blending.
   * helios.additiveBlending(false);
   */
  additiveBlending(e) {
    return typeof e > "u" ? this.useAdditiveBlending : (this.useAdditiveBlending = e, this);
  }
  /** Enables or disables shaded nodes.
   * @method shadedNodes
   * @memberof Helios
   * @instance
   * @chainable
   * @param {boolean} enableShadedNodes - Whether to enable shaded nodes.
   * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
   * @example
   * // Enable shaded nodes.
   * helios.shadedNodes(true);
   */
  shadedNodes(e) {
    return typeof e > "u" ? this.useShadedNodes : (this.useShadedNodes = e, this);
  }
  /** Enables or disables edges that can be pickeable
   * @method pickeableEdges
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number[]|"all"} pickables - The indices of the edges that can be pickeable, or "all" to make all edges pickeable.
   * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
   * @example
   * // Enable pickeable edges for [0,1,2,3]
   * helios.pickeableEdges([0, 1, 2, 3]);
   * @example
   * // Enable pickeable edges for all edges
   * helios.pickeableEdges("all");
   */
  pickeableEdges(e) {
    if (typeof e > "u")
      return this._pickeableEdges;
    if (this._pickeableEdges = new Set(e), e == "all") {
      for (let n = 0; n < this.network.edges.length; n++)
        this._pickeableEdges.add(n);
      this._edgeIndicesUpdate = !0, this.update();
    } else
      this._edgeIndicesUpdate = !0, this.update();
    return this;
  }
  /** Get or set labels buffer size
   * @method labelsMaxPixels
   * @memberof Helios
   * @instance
   * @chainable
   * @param {number} labelsMaxPixels - The maximum number of pixels for the labels buffer.
   * @return {Helios|this} - The Helios instance for chaining, or the current value if no argument is provided.
   * @example
   * // Set the maximum number of pixels for the labels buffer to 10000.
   * helios.labelsMaxPixels(10000);
   */
  labelsMaxPixels(e) {
    return typeof e > "u" ? this._trackingMaxPixels : (this._trackingMaxPixels = e, _willResizeEvent(0), this);
  }
  /** Manually cleanup the Helios instance.
   * @method cleanup
   * @memberof Helios
   * @instance
   * @param {boolean} keepGLContext - Whether to keep the WebGL context alive.
   * @example
   * // Cleanup the Helios instance.
   * helios.cleanup();
   * @example
   * // Cleanup the Helios instance and keep the WebGL context alive.
   * helios.cleanup(true);
   */
  cleanup(e) {
    this._isReady = !1, console.log("Cleanup", this.layoutWorker), this.layoutWorker?.cleanup(), this.scheduler?.stop(), console.log("Null", this.layoutWorker), this.layoutWorker = null;
    const n = this.gl;
    if (this.onReadyCallback = null, this.onNodeClickCallback = null, this.onNodeDoubleClickCallback = null, this.onNodeHoverStartCallback = null, this.onNodeHoverMoveCallback = null, this.onNodeHoverEndCallback = null, this.onEdgeClickCallback = null, this.onEdgeDoubleClickCallback = null, this.onEdgeHoverStartCallback = null, this.onEdgeHoverMoveCallback = null, this.onEdgeHoverEndCallback = null, this.onZoomCallback = null, this.onRotationCallback = null, this.onResizeCallback = null, this.onLayoutStartCallback = null, this.onLayoutStopCallback = null, this.onDrawCallback = null, this.onReadyCallback = null, this._isReady = !1, this._resizeObserver && (console.log("disconnecting resize observer"), this._resizeObserver.disconnect(), this._resizeObserver = null, delete this._resizeObserver), this.canvasElement && (this.canvasElement.removeEventListener("click", this._clickEventListener), this.canvasElement.removeEventListener("dblclick", this._doubleClickEventListener), this.canvasElement.removeEventListener("mousemove", this._hoverMoveEventListener), this.canvasElement.removeEventListener("mouseleave", this._hoverLeaveEventListener), document.body.removeEventListener("mouseout", this._hoverLeaveWindowEventListener)), !e && n) {
      let r = n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS);
      this.pickingFramebuffer?.discard(), this._trackingFramebuffer?.discard();
      for (let i = 0; i < r; ++i)
        n.activeTexture(n.TEXTURE0 + i), n.bindTexture(n.TEXTURE_2D, null), n.bindTexture(n.TEXTURE_CUBE_MAP, null);
      n.bindBuffer(n.ARRAY_BUFFER, null), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, null), n.bindRenderbuffer(n.RENDERBUFFER, null), n.bindFramebuffer(n.FRAMEBUFFER, null), n.deleteBuffer(this.nodesPositionBuffer), n.deleteBuffer(this.nodesColorBuffer), n.deleteBuffer(this.nodesSizeBuffer), n.deleteBuffer(this.nodesSizeBuffer), n.deleteBuffer(this.nodesOutlineWidthBuffer), n.deleteBuffer(this.nodesOutlineColorBuffer), n.deleteBuffer(this.nodesIndexBuffer), this.edgesGeometry && (n.deleteBuffer(this.edgesGeometry.edgeVertexTypeBuffer), n.deleteBuffer(this.edgesGeometry.verticesBuffer), n.deleteBuffer(this.edgesGeometry.colorBuffer), n.deleteBuffer(this.edgesGeometry.sizeBuffer)), this.fastEdgesGeometry && (n.deleteBuffer(this.fastEdgesGeometry.indexBuffer), n.deleteBuffer(this.fastEdgesGeometry.vertexObject), n.deleteBuffer(this.fastEdgesGeometry.colorObject), n.deleteBuffer(this.fastEdgesGeometry.indexObject));
    }
    this.densityMap && this.densityMap.cleanup(), this._autoCleanup && (this._mutationObserver.disconnect(), this._mutationObserver = null), this.canvasElement && (this.canvasElement.remove(), this.canvasElement = null), this.svgLayer && (this.svgLayer.remove(), this.svgLayer = null), this.overlay && (this.overlay.remove(), this.overlay = null), this.onCleanupCallback?.(), this._hasCleanup = !0;
  }
  /**
   * Returns whether the Helios instance is ready to be used.
   * @method isReady
   * @memberof Helios
   * @instance
   * @returns {boolean} - Whether the Helios instance is ready to be used.
   * @example
   * // Check if Helios is ready to be used.
   * if (helios.isReady()) {
   *   // Helios is ready, do something.
   * } else {
   *   // Helios is not ready yet, wait or handle the error.
   * }
   */
  isReady() {
    return this._isReady;
  }
  /** Destroys the Helios instance.
   * @method destroy
   * @memberof Helios
   * @instance
   */
  destroy() {
    this._hasCleanup || this.cleanup();
  }
}
let El = (t) => {
  let e = t.split(/\s/);
  return e.length < 2 ? null : [+e[0], +e[1]];
}, kl = (t) => {
  let e = t.split(/\s/);
  return e.length < 3 ? null : [+e[0], +e[1], +e[2]];
}, Cl = (t) => isNaN(t) ? 0 : +t, Il = /#([ve]) \"(.+)\" ([sn]|v2|v3)/, Bl = {
  s: String,
  n: Cl,
  v2: El,
  v3: kl
}, Fl = (t) => {
  for (; t.lineIndex + 1 < t.lines.length && t.lines[t.lineIndex].length == 0; )
    t.lineIndex++;
  let n = t.lines[t.lineIndex].split(/\s/), r = 0;
  if (n.length == 0 || n[0].toLowerCase() != "#vertices" || isNaN(n[1]) || !Number.isInteger(+n[1]))
    throw `Malformed xnet data (Reading Vertices Header)[line: ${t.lineIndex}]
	> ${t.lines[t.lineIndex]}`;
  return r = +n[1], t.lineIndex++, r;
}, Ml = (t) => {
  let e = [];
  for (; t.lineIndex < t.lines.length; ) {
    let r = t.lines[t.lineIndex], i = r.length;
    if (i == 0) {
      t.lineIndex++;
      continue;
    }
    if (r[0] == "#")
      break;
    var n = r;
    r[0] == '"' && r[i - 1] == '"' && (n = r.slice(1, -1)), e.push(n), t.lineIndex++;
  }
  return e;
}, Sl = (t) => {
  for (; t.lineIndex + 1 < t.lines.length && t.lines[t.lineIndex].length == 0; )
    t.lineIndex++;
  let n = t.lines[t.lineIndex].split(/\s/), r = !1, i = !1;
  if (n.length == 0 || n[0].toLowerCase() != "#edges")
    throw `Malformed xnet data (Reading Edges Header)[line: ${t.lineIndex}]
	> ${t.lines[t.lineIndex]}`;
  return n.forEach((a) => {
    a.toLowerCase() == "weighted" && (r = !0), a.toLowerCase() == "nonweighted" && (r = !1), a.toLowerCase() == "directed" && (i = !0), a.toLowerCase() == "undirected" && (i = !1);
  }), t.lineIndex++, { weighted: r, directed: i };
}, Rl = (t) => {
  let e = [], n = [];
  for (; t.lineIndex < t.lines.length; ) {
    let r = t.lines[t.lineIndex];
    if (r.length == 0) {
      t.lineIndex++;
      continue;
    }
    if (r[0] == "#")
      break;
    let a = r.split(/\s/), o = 1;
    if (a.length < 2)
      throw `Malformed xnet data (Reading Edges)[line: ${t.lineIndex}]
	> ${t.lines[t.lineIndex]}`;
    a.length > 2 && (o = +a[2]), e.push([+a[0], +a[1]]), n.push(o), t.lineIndex++;
  }
  return { edges: e, weights: n };
}, Tl = (t) => {
  for (; t.lineIndex + 1 < t.lines.length && t.lines[t.lineIndex].length == 0; )
    t.lineIndex++;
  let e = Il.exec(t.lines[t.lineIndex]);
  if (e.length != 4)
    throw `Malformed xnet data [line: ${t.lineIndex}]
	> ${t.lines[t.lineIndex]}`;
  let n = e[1], r = e[2], i = e[3];
  return t.lineIndex++, { type: n, key: r, format: i };
}, Nl = (t, e) => {
  let n = [], r = Bl[e.format];
  for (; t.lineIndex < t.lines.length; ) {
    let i = t.lines[t.lineIndex], a = i.length;
    if (a == 0) {
      t.lineIndex++;
      continue;
    }
    if (i[0] == "#")
      break;
    let o = i;
    o[0] == '"' && o[a - 1] == '"' && (o = o.slice(1, -1)), n.push(r(o)), t.lineIndex++;
  }
  return n;
}, br = (t) => {
  let e = { lineIndex: 0, lines: t.split(`
`) }, n = Fl(e), r = Ml(e), i = { nodesCount: n, verticesProperties: {}, edgesProperties: {} };
  if (r.length > 0) {
    if (r.length < n)
      throw `Malformed xnet data [line: ${e.lineIndex}]
	> ${e.lines[e.lineIndex]}`;
    i.labels = r;
  }
  let a = Sl(e);
  i.directed = a.directed, i.weighted = a.weighted;
  let o = Rl(e);
  i.edges = o.edges, i.weighted && (i.weights = o.weights);
  do {
    for (; e.lineIndex < e.lines.length && e.lines[e.lineIndex].length == 0; )
      e.lineIndex++;
    if (!(e.lineIndex < e.lines.length))
      break;
    let s = Tl(e), h = Nl(e, s);
    s.type == "e" ? i.edgesProperties[s.key] = h : s.type == "v" && (i.verticesProperties[s.key] = h);
  } while (e.lineIndex < e.lines.length);
  return i;
};
async function Ol(t) {
  let e = await fetch(t).then((n) => n.text());
  return br(e);
}
function Pl(t) {
  let e = t.nodesCount, n = {}, r = [];
  for (let i = 0; i < e; i++)
    n["" + i] = {
      ID: "" + i
      // position: [0,0,0],//network.verticesProperties["Position"][index],
      // color:[0.0,0.0,0.0]//[network.verticesProperties["Color"][index]],
      // size:1
    }, t.labels && (n["" + i].Label = t.labels[i]);
  for (const [i, a] of Object.entries(t.verticesProperties))
    for (let o = 0; o < e; o++)
      n["" + o][i] = a[o];
  for (let i = 0; i < t.edges.length; i++)
    r.push({
      source: "" + t.edges[i][0],
      target: "" + t.edges[i][1]
      // directed?
    });
  return { nodes: n, edges: r };
}
const $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  convertXNET2JSON: Pl,
  loadXNET: br,
  loadXNETFile: Ol
}, Symbol.toStringTag, { value: "Module" }));
let H = {
  getModelTags: function(t) {
    let e = t.getElementsByTagName("attributes"), n = {}, r = e.length, i;
    for (i = 0; i < r; i++)
      n[e[i].getAttribute("class")] = e[i].childNodes;
    return n;
  },
  nodeListToArray: function(t) {
    let e = [];
    for (let n = 0, r = t.length; n < r; ++n)
      t[n].nodeName !== "#text" && e.push(t[n]);
    return e;
  },
  nodeListEach: function(t, e) {
    for (let n = 0, r = t.length; n < r; ++n)
      t[n].nodeName !== "#text" && e(t[n]);
  },
  nodeListToHash: function(t, e) {
    let n = {};
    for (let r = 0; r < t.length; r++)
      if (t[r].nodeName !== "#text") {
        let i = e(t[r]);
        n[i.key] = i.value;
      }
    return n;
  },
  namedNodeMapToObject: function(t) {
    let e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n].name] = t[n].value;
    return e;
  },
  getFirstElementByTagNS: function(t, e, n) {
    let r = t.getElementsByTagName(e + ":" + n)[0];
    return r || (r = t.getElementsByTagNameNS(e, n)[0]), r || (r = t.getElementsByTagName(n)[0]), r;
  },
  getAttributeNS: function(t, e, n) {
    let r = t.getAttribute(e + ":" + n);
    return r === void 0 && (r = t.getAttributeNS(e, n)), r === void 0 && (r = t.getAttribute(n)), r;
  },
  enforceType: function(t, e) {
    switch (t) {
      case "boolean":
        e = e === "true";
        break;
      case "integer":
      case "long":
      case "float":
      case "double":
        e = +e;
        break;
      case "liststring":
        e = e ? e.split("|") : [];
        break;
    }
    return e;
  },
  getRGB: function(t) {
    return t[3] ? "rgba(" + t.join(",") + ")" : "rgb(" + t.slice(0, -1).join(",") + ")";
  }
};
function zl(t) {
  let e = {
    id: t.id,
    label: t.label
  };
  return t.viz && (e.viz = t.viz), t.attributes && (e.attributes = t.attributes), e;
}
function Dl(t) {
  let e = {
    id: t.id,
    type: t.type || "undirected",
    label: t.label || "",
    source: t.source,
    target: t.target,
    weight: +t.weight || 1
  };
  return t.viz && (e.viz = t.viz), t.attributes && (e.attributes = t.attributes), e;
}
function Ll(t) {
  let n = new DOMParser().parseFromString(t, "text/xml"), r = {};
  console.log(n), r.els = {
    root: n.getElementsByTagName("gexf")[0],
    graph: n.getElementsByTagName("graph")[0],
    meta: n.getElementsByTagName("meta")[0],
    nodes: n.getElementsByTagName("node"),
    edges: n.getElementsByTagName("edge"),
    model: H.getModelTags(n)
  }, r.hasViz = !!H.getAttributeNS(r.els.root, "xmlns", "viz"), r.version = r.els.root.getAttribute("version") || "1.0", r.mode = r.els.graph.getAttribute("mode") || "static";
  let i = r.els.graph.getAttribute("defaultedgetype");
  r.defaultEdgetype = i || "undirected";
  function a() {
    let g = {};
    return r.els.meta && (g.lastmodifieddate = r.els.meta.getAttribute("lastmodifieddate"), H.nodeListEach(r.els.meta.childNodes, function(m) {
      g[m.tagName.toLowerCase()] = m.textContent;
    })), g;
  }
  function o(g) {
    let m = [];
    return r.els.model[g] && H.nodeListEach(r.els.model[g], function(_) {
      let b = {
        id: _.getAttribute("id") || _.getAttribute("for"),
        type: _.getAttribute("type") || "string",
        title: _.getAttribute("title") || ""
      }, w = H.nodeListToArray(_.childNodes);
      w.length > 0 && (b.defaultValue = w[0].textContent), m.push(b);
    }), m.length > 0 ? m : !1;
  }
  function s(g, m) {
    let _ = {}, b = m.getElementsByTagName("attvalue"), w = H.nodeListToHash(b, function(p) {
      let y = H.namedNodeMapToObject(p.attributes);
      return { key: y.id || y.for, value: y.value };
    });
    return g.map(function(p) {
      _[p.id] = !(p.id in w) && "defaultValue" in p ? H.enforceType(p.type, p.defaultValue) : H.enforceType(p.type, w[p.id]);
    }), _;
  }
  function h(g) {
    let m = [];
    return H.nodeListEach(r.els.nodes, function(_) {
      let b = {
        id: _.getAttribute("id"),
        label: _.getAttribute("label") || ""
      };
      g && (b.attributes = s(g, _)), r.hasViz && (b.viz = u(_)), m.push(zl(b));
    }), m;
  }
  function u(g) {
    let m = {}, _ = H.getFirstElementByTagNS(g, "viz", "color");
    if (_) {
      let y = ["r", "g", "b", "a"].map(function(A) {
        return _.getAttribute(A);
      });
      m.color = H.getRGB(y);
    }
    let b = H.getFirstElementByTagNS(g, "viz", "position");
    b && (m.position = {}, ["x", "y", "z"].map(function(y) {
      m.position[y] = +b.getAttribute(y);
    }));
    let w = H.getFirstElementByTagNS(g, "viz", "size");
    w && (m.size = +w.getAttribute("value"));
    let p = H.getFirstElementByTagNS(g, "viz", "shape");
    return p && (m.shape = p.getAttribute("value")), m;
  }
  function l(g, m) {
    let _ = [];
    return H.nodeListEach(r.els.edges, function(b) {
      let w = H.namedNodeMapToObject(b.attributes);
      "type" in w || (w.type = m), g && (w.attributes = s(g, b)), r.hasViz && (w.viz = f(b)), _.push(Dl(w));
    }), _;
  }
  function f(g) {
    let m = {}, _ = H.getFirstElementByTagNS(g, "viz", "color");
    if (_) {
      let p = ["r", "g", "b", "a"].map(function(y) {
        return _.getAttribute(y);
      });
      m.color = H.getRGB(p);
    }
    let b = H.getFirstElementByTagNS(g, "viz", "shape");
    b && (m.shape = b.getAttribute("value"));
    let w = H.getFirstElementByTagNS(g, "viz", "thickness");
    return w && (m.thickness = +w.getAttribute("value")), m;
  }
  let c = o("node"), d = o("edge"), v = {
    version: r.version,
    mode: r.mode,
    defaultEdgeType: r.defaultEdgetype,
    meta: a(),
    model: {},
    nodes: h(c),
    edges: l(d, r.defaultEdgetype)
  };
  return c && (v.model.node = c), d && (v.model.edge = d), v;
}
function Ul(t) {
  return Ll(t);
}
let wr = {
  // Functions
  parse: Ul,
  // Version
  version: "0.2.5"
};
function Ql(t) {
  return wr.parse(t);
}
async function Gl(t) {
  let e = await fetch(t).then((n) => n.text());
  return wr.parse(e);
}
function Vl(t) {
  let e = {}, n = [];
  for (let r of t.nodes) {
    let i = r.id;
    if (e[i] = {}, r.attributes)
      for (const [a, o] of Object.entries(r.attributes || {}))
        e[i][a] = o;
    if (r.label ? e[i].Label = r.label : r?.attributes.name ? e[i].Label = r.attributes.name : e[i].Label = i, r.viz?.position) {
      let a = r.viz?.position;
      e[i].Position = [a?.x || 0, a?.y || 0, a?.z || 0];
    }
    if (r.viz?.color) {
      let a = We(r.viz?.color);
      e[i].Color = [a.r / 255, a.g / 255, a.b / 255];
    }
  }
  for (let r of t.edges || []) {
    let i = {};
    i.source = r.source, i.target = r.target;
    for (const [a, o] of Object.entries(r.attributes || {}))
      i[a] = o;
    n.push(i);
  }
  return { nodes: e, edges: n };
}
const Zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  convertGEXF2JSON: Vl,
  loadGEXF: Ql,
  loadGEXFFile: Gl
}, Symbol.toStringTag, { value: "Module" }));
function Wl(t) {
  var e = (`{
` + t + `
}`).replace(/^(\s*)(\w+)\s*\[/gm, '$1"$2": {').replace(/^(\s*)\]/gm, "$1},").replace(/^(\s*)(\w+)\s+(.+)$/gm, '$1"$2": $3,').replace(/,(\s*)\}/g, "$1}"), n = {}, r = [], i = [], a = 0, o;
  e = e.replace(/^(\s*)"node"/gm, function(h, u) {
    return u + '"node[' + a++ + ']"';
  }), a = 0, e = e.replace(/^(\s*)"edge"/gm, function(h, u) {
    return u + '"edge[' + a++ + ']"';
  }), e = e.replace(/: NaN/g, ": null");
  try {
    o = JSON.parse(e);
  } catch {
    throw new SyntaxError("bad format");
  }
  if (!Er(o.graph))
    throw new SyntaxError("no graph tag");
  ut(o.graph, function(h, u) {
    var l = h.match(/^(\w+)\[(\d+)\]$/), f, c;
    l ? (f = l[1], c = parseInt(l[2], 10), f === "node" ? r[c] = u : f === "edge" ? i[c] = u : n[h] = u) : n[h] = u;
  });
  let s = {};
  return r.forEach(function(h) {
    s[h.id] = h;
  }), n.nodes = s, n.edges = i, n;
}
function Hl(t, e) {
  typeof t.toJSON == "function" && (t = t.toJSON()), e = e || {};
  var n = t.nodes || [], r = t.edges || [], i = typeof e.indent == "string" ? e.indent : "  ", a = i + i, o = e.graphAttributes || null, s = e.nodeAttributes || null, h = e.edgeAttributes || null, u = ["graph ["];
  function l(f, c, d) {
    Er(c) ? (u.push(d + f + " ["), ut(c, function(v, g) {
      l(v, g, d + i);
    }), u.push(d + "]")) : u.push(d + Yl(f, c));
  }
  return ut(t, function(f, c) {
    f !== "nodes" && f !== "edges" && l(f, c, i);
  }), o && ut(o(t), function(f, c) {
    l(f, c, i);
  }), n.forEach(function(f) {
    u.push(i + "node ["), s && s.forEach(function(c) {
      l(c, f[c], a);
    }), u.push(i + "]");
  }), r.forEach(function(f) {
    u.push(i + "edge ["), l("source", f.source, a), l("target", f.target, a), h && h.forEach(function(c) {
      l(c, f[c], a);
    }), u.push(i + "]");
  }), u.push("]"), u.join(`
`);
}
function Er(t) {
  return t && Object.prototype.toString.call(t) === "[object Object]";
}
function ut(t, e) {
  Object.keys(t).forEach(function(n) {
    e(n, t[n]);
  });
}
function Yl(t, e) {
  return typeof e == "boolean" ? e = Number(e) : e = JSON.stringify(e), t + " " + e;
}
function kr(t) {
  return Wl(t);
}
async function ql(t) {
  let e = await fetch(t).then((n) => n.text());
  return kr(e);
}
const Kl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GMLStringify: Hl,
  loadGML: kr,
  loadGMLFile: ql
}, Symbol.toStringTag, { value: "Module" }));
class Jl {
  /**
   * Creates a new instance of BehaviorFilter.
   * @param {Helios} helios - The Helios object to be attached to.
   */
  constructor(e) {
    this._filters = {}, this._updatedNodes = /* @__PURE__ */ new Set(), this._helios = e;
  }
  /**
   * Gets the filters.
   * @type {Object}
   */
  get filters() {
    return this._filters;
  }
  /**
   * Sets a filter.
   * @param {string} name - The name of the filter.
   * @param {function} filter - The filter function.
   */
  setFilter(e, n) {
    this._filters[e] = n;
  }
  /**
   * Removes a filter.
   * @param {string} name - The name of the filter to remove.
   */
  removeFilter(e) {
    delete this._filters[e];
  }
  /**
   * Applies the filters.
   */
  applyFilters() {
    for (let e of this._helios.network.index2Node) {
      let n = !1;
      for (let r in this._filters)
        n = n || this._filters[r](e);
      n != e._filtered && this._updatedNodes.add(e), e._filtered = n;
    }
  }
  /**
   * Gets the updated nodes.
   * @type {Set}
   * @readonly
   */
  updatedNodes(e = !0) {
    let n = new Set(this._updatedNodes);
    return e && this._updatedNodes.clear(), n;
  }
}
export {
  Jl as BehaviorFilter,
  jl as Helios,
  Zl as gexf,
  Kl as gml,
  $l as xnet
};
//# sourceMappingURL=helios.js.map
