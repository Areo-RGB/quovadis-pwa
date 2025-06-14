/*Glightbox https://github.com/biati-digital/glightbox licensed mit*/
!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define(t)
      : ((e = e || self).GLightbox = t());
})(this, function () {
  'use strict';
  function e(t) {
    return (e =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              'function' == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? 'symbol'
              : typeof e;
          })(t);
  }
  function t(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function i(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function n(e, t, n) {
    return t && i(e.prototype, t), n && i(e, n), e;
  }
  function s(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return l(e);
      })(e) ||
      (function (e) {
        if ('undefined' != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
      })(e) ||
      (function (e, t) {
        if (!e) return;
        if ('string' == typeof e) return l(e, t);
        var i = Object.prototype.toString.call(e).slice(8, -1);
        'Object' === i && e.constructor && (i = e.constructor.name);
        if ('Map' === i || 'Set' === i) return Array.from(e);
        if ('Arguments' === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return l(e, t);
      })(e) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      })()
    );
  }
  function l(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var i = 0, n = new Array(t); i < t; i++) n[i] = e[i];
    return n;
  }
  var o = Date.now();
  function r() {
    var e = {},
      t = !0,
      i = 0,
      n = arguments.length;
    '[object Boolean]' === Object.prototype.toString.call(arguments[0]) &&
      ((t = arguments[0]), i++);
    for (
      var s = function (i) {
        for (var n in i)
          Object.prototype.hasOwnProperty.call(i, n) &&
            (t && '[object Object]' === Object.prototype.toString.call(i[n])
              ? (e[n] = r(!0, e[n], i[n]))
              : (e[n] = i[n]));
      };
      i < n;
      i++
    ) {
      var l = arguments[i];
      s(l);
    }
    return e;
  }
  function a(e, t) {
    if (
      ((A(e) || e === window || e === document) && (e = [e]), I(e) || O(e) || (e = [e]), 0 != X(e))
    )
      if (I(e) && !O(e))
        for (var i = e.length, n = 0; n < i && !1 !== t.call(e[n], e[n], n, e); n++);
      else if (O(e)) for (var s in e) if (M(e, s) && !1 === t.call(e[s], e[s], s, e)) break;
  }
  function h(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
      i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
      n = (e[o] = e[o] || []),
      s = { all: n, evt: null, found: null };
    return (
      t &&
        i &&
        X(n) > 0 &&
        a(n, function (e, n) {
          if (e.eventName == t && e.fn.toString() == i.toString())
            return (s.found = !0), (s.evt = n), !1;
        }),
      s
    );
  }
  function c(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      i = t.onElement,
      n = t.withCallback,
      s = t.avoidDuplicate,
      l = void 0 === s || s,
      o = t.once,
      r = void 0 !== o && o,
      c = t.useCapture,
      d = void 0 !== c && c,
      u = arguments.length > 2 ? arguments[2] : void 0,
      g = i || [];
    function v(e) {
      C(n) && n.call(u, e, this), r && v.destroy();
    }
    return (
      E(g) && (g = document.querySelectorAll(g)),
      (v.destroy = function () {
        a(g, function (t) {
          var i = h(t, e, v);
          i.found && i.all.splice(i.evt, 1),
            t.removeEventListener && t.removeEventListener(e, v, d);
        });
      }),
      a(g, function (t) {
        var i = h(t, e, v);
        ((t.addEventListener && l && !i.found) || !l) &&
          (t.addEventListener(e, v, d), i.all.push({ eventName: e, fn: v }));
      }),
      v
    );
  }
  function d(e, t) {
    a(t.split(' '), function (t) {
      return e.classList.add(t);
    });
  }
  function u(e, t) {
    a(t.split(' '), function (t) {
      return e.classList.remove(t);
    });
  }
  function g(e, t) {
    return e.classList.contains(t);
  }
  function v(e, t) {
    for (; e !== document.body; ) {
      if (!(e = e.parentElement)) return !1;
      if ('function' == typeof e.matches ? e.matches(t) : e.msMatchesSelector(t)) return e;
    }
  }
  function f(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
      i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (!e || '' === t) return !1;
    if ('none' == t) return C(i) && i(), !1;
    var n = S(),
      s = t.split(' ');
    a(s, function (t) {
      d(e, 'g' + t);
    }),
      c(n, {
        onElement: e,
        avoidDuplicate: !1,
        once: !0,
        withCallback: function (e, t) {
          a(s, function (e) {
            u(t, 'g' + e);
          }),
            C(i) && i();
        },
      });
  }
  function p(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '';
    if ('' == t)
      return (
        (e.style.webkitTransform = ''),
        (e.style.MozTransform = ''),
        (e.style.msTransform = ''),
        (e.style.OTransform = ''),
        (e.style.transform = ''),
        !1
      );
    (e.style.webkitTransform = t),
      (e.style.MozTransform = t),
      (e.style.msTransform = t),
      (e.style.OTransform = t),
      (e.style.transform = t);
  }
  function m(e) {
    e.style.display = 'block';
  }
  function y(e) {
    e.style.display = 'none';
  }
  function x(e) {
    var t = document.createDocumentFragment(),
      i = document.createElement('div');
    for (i.innerHTML = e; i.firstChild; ) t.appendChild(i.firstChild);
    return t;
  }
  function b() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height:
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    };
  }
  function S() {
    var e,
      t = document.createElement('fakeelement'),
      i = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd',
      };
    for (e in i) if (void 0 !== t.style[e]) return i[e];
  }
  function w(e, t, i, n) {
    if (e()) t();
    else {
      var s;
      i || (i = 100);
      var l = setInterval(function () {
        e() && (clearInterval(l), s && clearTimeout(s), t());
      }, i);
      n &&
        (s = setTimeout(function () {
          clearInterval(l);
        }, n));
    }
  }
  function T(e, t, i) {
    if (P(e)) console.error('Inject assets error');
    else if ((C(t) && ((i = t), (t = !1)), E(t) && t in window)) C(i) && i();
    else {
      var n;
      if (-1 !== e.indexOf('.css')) {
        if ((n = document.querySelectorAll('link[href="' + e + '"]')) && n.length > 0)
          return void (C(i) && i());
        var s = document.getElementsByTagName('head')[0],
          l = s.querySelectorAll('link[rel="stylesheet"]'),
          o = document.createElement('link');
        return (
          (o.rel = 'stylesheet'),
          (o.type = 'text/css'),
          (o.href = e),
          (o.media = 'all'),
          l ? s.insertBefore(o, l[0]) : s.appendChild(o),
          void (C(i) && i())
        );
      }
      if ((n = document.querySelectorAll('script[src="' + e + '"]')) && n.length > 0) {
        if (C(i)) {
          if (E(t))
            return (
              w(
                function () {
                  return void 0 !== window[t];
                },
                function () {
                  i();
                }
              ),
              !1
            );
          i();
        }
      } else {
        var r = document.createElement('script');
        (r.type = 'text/javascript'),
          (r.src = e),
          (r.onload = function () {
            if (C(i)) {
              if (E(t))
                return (
                  w(
                    function () {
                      return void 0 !== window[t];
                    },
                    function () {
                      i();
                    }
                  ),
                  !1
                );
              i();
            }
          }),
          document.body.appendChild(r);
      }
    }
  }
  function k() {
    return (
      'navigator' in window &&
      window.navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i
      )
    );
  }
  function C(e) {
    return 'function' == typeof e;
  }
  function E(e) {
    return 'string' == typeof e;
  }
  function A(e) {
    return !(!e || !e.nodeType || 1 != e.nodeType);
  }
  function L(e) {
    return Array.isArray(e);
  }
  function I(e) {
    return e && e.length && isFinite(e.length);
  }
  function O(t) {
    return 'object' === e(t) && null != t && !C(t) && !L(t);
  }
  function P(e) {
    return null == e;
  }
  function M(e, t) {
    return null !== e && hasOwnProperty.call(e, t);
  }
  function X(e) {
    if (O(e)) {
      if (e.keys) return e.keys().length;
      var t = 0;
      for (var i in e) M(e, i) && t++;
      return t;
    }
    return e.length;
  }
  function z(e) {
    return !isNaN(parseFloat(e)) && isFinite(e);
  }
  function Y(e) {
    if (e.events.hasOwnProperty('keyboard')) return !1;
    e.events.keyboard = c('keydown', {
      onElement: window,
      withCallback: function (t, i) {
        var n = (t = t || window.event).keyCode;
        if (9 == n) {
          var l =
            !(!document.activeElement || !document.activeElement.nodeName) &&
            document.activeElement.nodeName.toLocaleLowerCase();
          if ('input' == l || 'textarea' == l || 'button' == l) return;
          t.preventDefault();
          var o = document.querySelectorAll('.gbtn');
          if (!o || o.length <= 0) return;
          var r = s(o).filter(function (e) {
            return g(e, 'focused');
          });
          if (!r.length) {
            var a = document.querySelector('.gbtn[tabindex="0"]');
            return void (a && (a.focus(), d(a, 'focused')));
          }
          o.forEach(function (e) {
            return u(e, 'focused');
          });
          var h = r[0].getAttribute('tabindex');
          h = h || '0';
          var c = parseInt(h) + 1;
          c > o.length - 1 && (c = '0');
          var v = document.querySelector('.gbtn[tabindex="'.concat(c, '"]'));
          v && (v.focus(), d(v, 'focused'));
        }
        39 == n && e.nextSlide(), 37 == n && e.prevSlide(), 27 == n && e.close();
      },
    });
  }
  function q(e) {
    return Math.sqrt(e.x * e.x + e.y * e.y);
  }
  function D(e, t) {
    var i = (function (e, t) {
      var i = q(e) * q(t);
      if (0 === i) return 0;
      var n =
        (function (e, t) {
          return e.x * t.x + e.y * t.y;
        })(e, t) / i;
      return n > 1 && (n = 1), Math.acos(n);
    })(e, t);
    return (
      (function (e, t) {
        return e.x * t.y - t.x * e.y;
      })(e, t) > 0 && (i *= -1),
      (180 * i) / Math.PI
    );
  }
  var N = (function () {
    function e(i) {
      t(this, e), (this.handlers = []), (this.el = i);
    }
    return (
      n(e, [
        {
          key: 'add',
          value: function (e) {
            this.handlers.push(e);
          },
        },
        {
          key: 'del',
          value: function (e) {
            e || (this.handlers = []);
            for (var t = this.handlers.length; t >= 0; t--)
              this.handlers[t] === e && this.handlers.splice(t, 1);
          },
        },
        {
          key: 'dispatch',
          value: function () {
            for (var e = 0, t = this.handlers.length; e < t; e++) {
              var i = this.handlers[e];
              'function' == typeof i && i.apply(this.el, arguments);
            }
          },
        },
      ]),
      e
    );
  })();
  function _(e, t) {
    var i = new N(e);
    return i.add(t), i;
  }
  var B = (function () {
    function e(i, n) {
      t(this, e),
        (this.element = 'string' == typeof i ? document.querySelector(i) : i),
        (this.start = this.start.bind(this)),
        (this.move = this.move.bind(this)),
        (this.end = this.end.bind(this)),
        (this.cancel = this.cancel.bind(this)),
        this.element.addEventListener('touchstart', this.start, !1),
        this.element.addEventListener('touchmove', this.move, !1),
        this.element.addEventListener('touchend', this.end, !1),
        this.element.addEventListener('touchcancel', this.cancel, !1),
        (this.preV = { x: null, y: null }),
        (this.pinchStartLen = null),
        (this.zoom = 1),
        (this.isDoubleTap = !1);
      var s = function () {};
      (this.rotate = _(this.element, n.rotate || s)),
        (this.touchStart = _(this.element, n.touchStart || s)),
        (this.multipointStart = _(this.element, n.multipointStart || s)),
        (this.multipointEnd = _(this.element, n.multipointEnd || s)),
        (this.pinch = _(this.element, n.pinch || s)),
        (this.swipe = _(this.element, n.swipe || s)),
        (this.tap = _(this.element, n.tap || s)),
        (this.doubleTap = _(this.element, n.doubleTap || s)),
        (this.longTap = _(this.element, n.longTap || s)),
        (this.singleTap = _(this.element, n.singleTap || s)),
        (this.pressMove = _(this.element, n.pressMove || s)),
        (this.twoFingerPressMove = _(this.element, n.twoFingerPressMove || s)),
        (this.touchMove = _(this.element, n.touchMove || s)),
        (this.touchEnd = _(this.element, n.touchEnd || s)),
        (this.touchCancel = _(this.element, n.touchCancel || s)),
        (this._cancelAllHandler = this.cancelAll.bind(this)),
        window.addEventListener('scroll', this._cancelAllHandler),
        (this.delta = null),
        (this.last = null),
        (this.now = null),
        (this.tapTimeout = null),
        (this.singleTapTimeout = null),
        (this.longTapTimeout = null),
        (this.swipeTimeout = null),
        (this.x1 = this.x2 = this.y1 = this.y2 = null),
        (this.preTapPosition = { x: null, y: null });
    }
    return (
      n(e, [
        {
          key: 'start',
          value: function (e) {
            if (e.touches) {
              (this.now = Date.now()),
                (this.x1 = e.touches[0].pageX),
                (this.y1 = e.touches[0].pageY),
                (this.delta = this.now - (this.last || this.now)),
                this.touchStart.dispatch(e, this.element),
                null !== this.preTapPosition.x &&
                  ((this.isDoubleTap =
                    this.delta > 0 &&
                    this.delta <= 250 &&
                    Math.abs(this.preTapPosition.x - this.x1) < 30 &&
                    Math.abs(this.preTapPosition.y - this.y1) < 30),
                  this.isDoubleTap && clearTimeout(this.singleTapTimeout)),
                (this.preTapPosition.x = this.x1),
                (this.preTapPosition.y = this.y1),
                (this.last = this.now);
              var t = this.preV;
              if (e.touches.length > 1) {
                this._cancelLongTap(), this._cancelSingleTap();
                var i = { x: e.touches[1].pageX - this.x1, y: e.touches[1].pageY - this.y1 };
                (t.x = i.x),
                  (t.y = i.y),
                  (this.pinchStartLen = q(t)),
                  this.multipointStart.dispatch(e, this.element);
              }
              (this._preventTap = !1),
                (this.longTapTimeout = setTimeout(
                  function () {
                    this.longTap.dispatch(e, this.element), (this._preventTap = !0);
                  }.bind(this),
                  750
                ));
            }
          },
        },
        {
          key: 'move',
          value: function (e) {
            if (e.touches) {
              var t = this.preV,
                i = e.touches.length,
                n = e.touches[0].pageX,
                s = e.touches[0].pageY;
              if (((this.isDoubleTap = !1), i > 1)) {
                var l = e.touches[1].pageX,
                  o = e.touches[1].pageY,
                  r = { x: e.touches[1].pageX - n, y: e.touches[1].pageY - s };
                null !== t.x &&
                  (this.pinchStartLen > 0 &&
                    ((e.zoom = q(r) / this.pinchStartLen), this.pinch.dispatch(e, this.element)),
                  (e.angle = D(r, t)),
                  this.rotate.dispatch(e, this.element)),
                  (t.x = r.x),
                  (t.y = r.y),
                  null !== this.x2 && null !== this.sx2
                    ? ((e.deltaX = (n - this.x2 + l - this.sx2) / 2),
                      (e.deltaY = (s - this.y2 + o - this.sy2) / 2))
                    : ((e.deltaX = 0), (e.deltaY = 0)),
                  this.twoFingerPressMove.dispatch(e, this.element),
                  (this.sx2 = l),
                  (this.sy2 = o);
              } else {
                if (null !== this.x2) {
                  (e.deltaX = n - this.x2), (e.deltaY = s - this.y2);
                  var a = Math.abs(this.x1 - this.x2),
                    h = Math.abs(this.y1 - this.y2);
                  (a > 10 || h > 10) && (this._preventTap = !0);
                } else (e.deltaX = 0), (e.deltaY = 0);
                this.pressMove.dispatch(e, this.element);
              }
              this.touchMove.dispatch(e, this.element),
                this._cancelLongTap(),
                (this.x2 = n),
                (this.y2 = s),
                i > 1 && e.preventDefault();
            }
          },
        },
        {
          key: 'end',
          value: function (e) {
            if (e.changedTouches) {
              this._cancelLongTap();
              var t = this;
              e.touches.length < 2 &&
                (this.multipointEnd.dispatch(e, this.element), (this.sx2 = this.sy2 = null)),
                (this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
                (this.y2 && Math.abs(this.y1 - this.y2) > 30)
                  ? ((e.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2)),
                    (this.swipeTimeout = setTimeout(function () {
                      t.swipe.dispatch(e, t.element);
                    }, 0)))
                  : ((this.tapTimeout = setTimeout(function () {
                      t._preventTap || t.tap.dispatch(e, t.element),
                        t.isDoubleTap && (t.doubleTap.dispatch(e, t.element), (t.isDoubleTap = !1));
                    }, 0)),
                    t.isDoubleTap ||
                      (t.singleTapTimeout = setTimeout(function () {
                        t.singleTap.dispatch(e, t.element);
                      }, 250))),
                this.touchEnd.dispatch(e, this.element),
                (this.preV.x = 0),
                (this.preV.y = 0),
                (this.zoom = 1),
                (this.pinchStartLen = null),
                (this.x1 = this.x2 = this.y1 = this.y2 = null);
            }
          },
        },
        {
          key: 'cancelAll',
          value: function () {
            (this._preventTap = !0),
              clearTimeout(this.singleTapTimeout),
              clearTimeout(this.tapTimeout),
              clearTimeout(this.longTapTimeout),
              clearTimeout(this.swipeTimeout);
          },
        },
        {
          key: 'cancel',
          value: function (e) {
            this.cancelAll(), this.touchCancel.dispatch(e, this.element);
          },
        },
        {
          key: '_cancelLongTap',
          value: function () {
            clearTimeout(this.longTapTimeout);
          },
        },
        {
          key: '_cancelSingleTap',
          value: function () {
            clearTimeout(this.singleTapTimeout);
          },
        },
        {
          key: '_swipeDirection',
          value: function (e, t, i, n) {
            return Math.abs(e - t) >= Math.abs(i - n)
              ? e - t > 0
                ? 'Left'
                : 'Right'
              : i - n > 0
                ? 'Up'
                : 'Down';
          },
        },
        {
          key: 'on',
          value: function (e, t) {
            this[e] && this[e].add(t);
          },
        },
        {
          key: 'off',
          value: function (e, t) {
            this[e] && this[e].del(t);
          },
        },
        {
          key: 'destroy',
          value: function () {
            return (
              this.singleTapTimeout && clearTimeout(this.singleTapTimeout),
              this.tapTimeout && clearTimeout(this.tapTimeout),
              this.longTapTimeout && clearTimeout(this.longTapTimeout),
              this.swipeTimeout && clearTimeout(this.swipeTimeout),
              this.element.removeEventListener('touchstart', this.start),
              this.element.removeEventListener('touchmove', this.move),
              this.element.removeEventListener('touchend', this.end),
              this.element.removeEventListener('touchcancel', this.cancel),
              this.rotate.del(),
              this.touchStart.del(),
              this.multipointStart.del(),
              this.multipointEnd.del(),
              this.pinch.del(),
              this.swipe.del(),
              this.tap.del(),
              this.doubleTap.del(),
              this.longTap.del(),
              this.singleTap.del(),
              this.pressMove.del(),
              this.twoFingerPressMove.del(),
              this.touchMove.del(),
              this.touchEnd.del(),
              this.touchCancel.del(),
              (this.preV =
                this.pinchStartLen =
                this.zoom =
                this.isDoubleTap =
                this.delta =
                this.last =
                this.now =
                this.tapTimeout =
                this.singleTapTimeout =
                this.longTapTimeout =
                this.swipeTimeout =
                this.x1 =
                this.x2 =
                this.y1 =
                this.y2 =
                this.preTapPosition =
                this.rotate =
                this.touchStart =
                this.multipointStart =
                this.multipointEnd =
                this.pinch =
                this.swipe =
                this.tap =
                this.doubleTap =
                this.longTap =
                this.singleTap =
                this.pressMove =
                this.touchMove =
                this.touchEnd =
                this.touchCancel =
                this.twoFingerPressMove =
                  null),
              window.removeEventListener('scroll', this._cancelAllHandler),
              null
            );
          },
        },
      ]),
      e
    );
  })();
  function W(e) {
    var t = (function () {
        var e,
          t = document.createElement('fakeelement'),
          i = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd',
          };
        for (e in i) if (void 0 !== t.style[e]) return i[e];
      })(),
      i = g(e, 'gslide-media') ? e : e.querySelector('.gslide-media'),
      n = e.querySelector('.gslide-description');
    d(i, 'greset'), p(i, 'translate3d(0, 0, 0)');
    c(t, {
      onElement: i,
      once: !0,
      withCallback: function (e, t) {
        u(i, 'greset');
      },
    });
    (i.style.opacity = ''), n && (n.style.opacity = '');
  }
  function H(e) {
    if (e.events.hasOwnProperty('touch')) return !1;
    var t,
      i,
      n,
      s = b(),
      l = s.width,
      o = s.height,
      r = !1,
      a = null,
      h = null,
      c = null,
      f = !1,
      m = 1,
      y = 1,
      x = !1,
      S = !1,
      w = null,
      T = null,
      k = null,
      C = null,
      E = 0,
      A = 0,
      L = !1,
      I = !1,
      O = {},
      P = {},
      M = 0,
      X = 0,
      z = document.getElementById('glightbox-slider'),
      Y = document.querySelector('.goverlay'),
      q = new B(z, {
        touchStart: function (t) {
          if (
            g(t.targetTouches[0].target, 'ginner-container') ||
            v(t.targetTouches[0].target, '.gslide-desc')
          )
            return (r = !1), !1;
          (r = !0),
            (P = t.targetTouches[0]),
            (O.pageX = t.targetTouches[0].pageX),
            (O.pageY = t.targetTouches[0].pageY),
            (M = t.targetTouches[0].clientX),
            (X = t.targetTouches[0].clientY),
            (a = e.activeSlide),
            (h = a.querySelector('.gslide-media')),
            (n = a.querySelector('.gslide-inline')),
            (c = null),
            g(h, 'gslide-image') && (c = h.querySelector('img')),
            u(Y, 'greset'),
            (t.pageX > 20 && t.pageX < window.innerWidth - 20) || t.preventDefault();
        },
        touchMove: function (s) {
          if (r && ((P = s.targetTouches[0]), !x && !S)) {
            if (n && n.offsetHeight > o) {
              var a = O.pageX - P.pageX;
              if (Math.abs(a) <= 13) return !1;
            }
            f = !0;
            var d,
              u = s.targetTouches[0].clientX,
              g = s.targetTouches[0].clientY,
              v = M - u,
              m = X - g;
            if (
              (Math.abs(v) > Math.abs(m) ? ((L = !1), (I = !0)) : ((I = !1), (L = !0)),
              (t = P.pageX - O.pageX),
              (E = (100 * t) / l),
              (i = P.pageY - O.pageY),
              (A = (100 * i) / o),
              L &&
                c &&
                ((d = 1 - Math.abs(i) / o),
                (Y.style.opacity = d),
                e.settings.touchFollowAxis && (E = 0)),
              I &&
                ((d = 1 - Math.abs(t) / l),
                (h.style.opacity = d),
                e.settings.touchFollowAxis && (A = 0)),
              !c)
            )
              return p(h, 'translate3d('.concat(E, '%, 0, 0)'));
            p(h, 'translate3d('.concat(E, '%, ').concat(A, '%, 0)'));
          }
        },
        touchEnd: function () {
          if (r) {
            if (((f = !1), S || x)) return (k = w), void (C = T);
            var t = Math.abs(parseInt(A)),
              i = Math.abs(parseInt(E));
            if (!(t > 29 && c))
              return t < 29 && i < 25 ? (d(Y, 'greset'), (Y.style.opacity = 1), W(h)) : void 0;
            e.close();
          }
        },
        multipointEnd: function () {
          setTimeout(function () {
            x = !1;
          }, 50);
        },
        multipointStart: function () {
          (x = !0), (m = y || 1);
        },
        pinch: function (e) {
          if (!c || f) return !1;
          (x = !0), (c.scaleX = c.scaleY = m * e.zoom);
          var t = m * e.zoom;
          if (((S = !0), t <= 1))
            return (
              (S = !1),
              (t = 1),
              (C = null),
              (k = null),
              (w = null),
              (T = null),
              void c.setAttribute('style', '')
            );
          t > 4.5 && (t = 4.5),
            (c.style.transform = 'scale3d('.concat(t, ', ').concat(t, ', 1)')),
            (y = t);
        },
        pressMove: function (e) {
          if (S && !x) {
            var t = P.pageX - O.pageX,
              i = P.pageY - O.pageY;
            k && (t += k), C && (i += C), (w = t), (T = i);
            var n = 'translate3d('.concat(t, 'px, ').concat(i, 'px, 0)');
            y && (n += ' scale3d('.concat(y, ', ').concat(y, ', 1)')), p(c, n);
          }
        },
        swipe: function (t) {
          if (!S)
            if (x) x = !1;
            else {
              if ('Left' == t.direction) {
                if (e.index == e.elements.length - 1) return W(h);
                e.nextSlide();
              }
              if ('Right' == t.direction) {
                if (0 == e.index) return W(h);
                e.prevSlide();
              }
            }
        },
      });
    e.events.touch = q;
  }
  var j = (function () {
      function e(i, n) {
        var s = this,
          l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        if (
          (t(this, e), (this.img = i), (this.slide = n), (this.onclose = l), this.img.setZoomEvents)
        )
          return !1;
        (this.active = !1),
          (this.zoomedIn = !1),
          (this.dragging = !1),
          (this.currentX = null),
          (this.currentY = null),
          (this.initialX = null),
          (this.initialY = null),
          (this.xOffset = 0),
          (this.yOffset = 0),
          this.img.addEventListener(
            'mousedown',
            function (e) {
              return s.dragStart(e);
            },
            !1
          ),
          this.img.addEventListener(
            'mouseup',
            function (e) {
              return s.dragEnd(e);
            },
            !1
          ),
          this.img.addEventListener(
            'mousemove',
            function (e) {
              return s.drag(e);
            },
            !1
          ),
          this.img.addEventListener(
            'click',
            function (e) {
              return s.slide.classList.contains('dragging-nav')
                ? (s.zoomOut(), !1)
                : s.zoomedIn
                  ? void (s.zoomedIn && !s.dragging && s.zoomOut())
                  : s.zoomIn();
            },
            !1
          ),
          (this.img.setZoomEvents = !0);
      }
      return (
        n(e, [
          {
            key: 'zoomIn',
            value: function () {
              var e = this.widowWidth();
              if (!(this.zoomedIn || e <= 768)) {
                var t = this.img;
                if (
                  (t.setAttribute('data-style', t.getAttribute('style')),
                  (t.style.maxWidth = t.naturalWidth + 'px'),
                  (t.style.maxHeight = t.naturalHeight + 'px'),
                  t.naturalWidth > e)
                ) {
                  var i = e / 2 - t.naturalWidth / 2;
                  this.setTranslate(this.img.parentNode, i, 0);
                }
                this.slide.classList.add('zoomed'), (this.zoomedIn = !0);
              }
            },
          },
          {
            key: 'zoomOut',
            value: function () {
              this.img.parentNode.setAttribute('style', ''),
                this.img.setAttribute('style', this.img.getAttribute('data-style')),
                this.slide.classList.remove('zoomed'),
                (this.zoomedIn = !1),
                (this.currentX = null),
                (this.currentY = null),
                (this.initialX = null),
                (this.initialY = null),
                (this.xOffset = 0),
                (this.yOffset = 0),
                this.onclose && 'function' == typeof this.onclose && this.onclose();
            },
          },
          {
            key: 'dragStart',
            value: function (e) {
              e.preventDefault(),
                this.zoomedIn
                  ? ('touchstart' === e.type
                      ? ((this.initialX = e.touches[0].clientX - this.xOffset),
                        (this.initialY = e.touches[0].clientY - this.yOffset))
                      : ((this.initialX = e.clientX - this.xOffset),
                        (this.initialY = e.clientY - this.yOffset)),
                    e.target === this.img &&
                      ((this.active = !0), this.img.classList.add('dragging')))
                  : (this.active = !1);
            },
          },
          {
            key: 'dragEnd',
            value: function (e) {
              var t = this;
              e.preventDefault(),
                (this.initialX = this.currentX),
                (this.initialY = this.currentY),
                (this.active = !1),
                setTimeout(function () {
                  (t.dragging = !1), (t.img.isDragging = !1), t.img.classList.remove('dragging');
                }, 100);
            },
          },
          {
            key: 'drag',
            value: function (e) {
              this.active &&
                (e.preventDefault(),
                'touchmove' === e.type
                  ? ((this.currentX = e.touches[0].clientX - this.initialX),
                    (this.currentY = e.touches[0].clientY - this.initialY))
                  : ((this.currentX = e.clientX - this.initialX),
                    (this.currentY = e.clientY - this.initialY)),
                (this.xOffset = this.currentX),
                (this.yOffset = this.currentY),
                (this.img.isDragging = !0),
                (this.dragging = !0),
                this.setTranslate(this.img, this.currentX, this.currentY));
            },
          },
          {
            key: 'onMove',
            value: function (e) {
              if (this.zoomedIn) {
                var t = e.clientX - this.img.naturalWidth / 2,
                  i = e.clientY - this.img.naturalHeight / 2;
                this.setTranslate(this.img, t, i);
              }
            },
          },
          {
            key: 'setTranslate',
            value: function (e, t, i) {
              e.style.transform = 'translate3d(' + t + 'px, ' + i + 'px, 0)';
            },
          },
          {
            key: 'widowWidth',
            value: function () {
              return (
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth
              );
            },
          },
        ]),
        e
      );
    })(),
    V = (function () {
      function e() {
        var i = this,
          n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t(this, e);
        var s = n.dragEl,
          l = n.toleranceX,
          o = void 0 === l ? 40 : l,
          r = n.toleranceY,
          a = void 0 === r ? 65 : r,
          h = n.slide,
          c = void 0 === h ? null : h,
          d = n.instance,
          u = void 0 === d ? null : d;
        (this.el = s),
          (this.active = !1),
          (this.dragging = !1),
          (this.currentX = null),
          (this.currentY = null),
          (this.initialX = null),
          (this.initialY = null),
          (this.xOffset = 0),
          (this.yOffset = 0),
          (this.direction = null),
          (this.lastDirection = null),
          (this.toleranceX = o),
          (this.toleranceY = a),
          (this.toleranceReached = !1),
          (this.dragContainer = this.el),
          (this.slide = c),
          (this.instance = u),
          this.el.addEventListener(
            'mousedown',
            function (e) {
              return i.dragStart(e);
            },
            !1
          ),
          this.el.addEventListener(
            'mouseup',
            function (e) {
              return i.dragEnd(e);
            },
            !1
          ),
          this.el.addEventListener(
            'mousemove',
            function (e) {
              return i.drag(e);
            },
            !1
          );
      }
      return (
        n(e, [
          {
            key: 'dragStart',
            value: function (e) {
              if (this.slide.classList.contains('zoomed')) this.active = !1;
              else {
                'touchstart' === e.type
                  ? ((this.initialX = e.touches[0].clientX - this.xOffset),
                    (this.initialY = e.touches[0].clientY - this.yOffset))
                  : ((this.initialX = e.clientX - this.xOffset),
                    (this.initialY = e.clientY - this.yOffset));
                var t = e.target.nodeName.toLowerCase();
                e.target.classList.contains('nodrag') ||
                v(e.target, '.nodrag') ||
                -1 !== ['input', 'select', 'textarea', 'button', 'a'].indexOf(t)
                  ? (this.active = !1)
                  : (e.preventDefault(),
                    (e.target === this.el || ('img' !== t && v(e.target, '.gslide-inline'))) &&
                      ((this.active = !0),
                      this.el.classList.add('dragging'),
                      (this.dragContainer = v(e.target, '.ginner-container'))));
              }
            },
          },
          {
            key: 'dragEnd',
            value: function (e) {
              var t = this;
              e && e.preventDefault(),
                (this.initialX = 0),
                (this.initialY = 0),
                (this.currentX = null),
                (this.currentY = null),
                (this.initialX = null),
                (this.initialY = null),
                (this.xOffset = 0),
                (this.yOffset = 0),
                (this.active = !1),
                this.doSlideChange &&
                  ((this.instance.preventOutsideClick = !0),
                  'right' == this.doSlideChange && this.instance.prevSlide(),
                  'left' == this.doSlideChange && this.instance.nextSlide()),
                this.doSlideClose && this.instance.close(),
                this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0),
                setTimeout(function () {
                  (t.instance.preventOutsideClick = !1),
                    (t.toleranceReached = !1),
                    (t.lastDirection = null),
                    (t.dragging = !1),
                    (t.el.isDragging = !1),
                    t.el.classList.remove('dragging'),
                    t.slide.classList.remove('dragging-nav'),
                    (t.dragContainer.style.transform = ''),
                    (t.dragContainer.style.transition = '');
                }, 100);
            },
          },
          {
            key: 'drag',
            value: function (e) {
              if (this.active) {
                e.preventDefault(),
                  this.slide.classList.add('dragging-nav'),
                  'touchmove' === e.type
                    ? ((this.currentX = e.touches[0].clientX - this.initialX),
                      (this.currentY = e.touches[0].clientY - this.initialY))
                    : ((this.currentX = e.clientX - this.initialX),
                      (this.currentY = e.clientY - this.initialY)),
                  (this.xOffset = this.currentX),
                  (this.yOffset = this.currentY),
                  (this.el.isDragging = !0),
                  (this.dragging = !0),
                  (this.doSlideChange = !1),
                  (this.doSlideClose = !1);
                var t = Math.abs(this.currentX),
                  i = Math.abs(this.currentY);
                if (
                  t > 0 &&
                  t >= Math.abs(this.currentY) &&
                  (!this.lastDirection || 'x' == this.lastDirection)
                ) {
                  (this.yOffset = 0),
                    (this.lastDirection = 'x'),
                    this.setTranslate(this.dragContainer, this.currentX, 0);
                  var n = this.shouldChange();
                  if (
                    (!this.instance.settings.dragAutoSnap && n && (this.doSlideChange = n),
                    this.instance.settings.dragAutoSnap && n)
                  )
                    return (
                      (this.instance.preventOutsideClick = !0),
                      (this.toleranceReached = !0),
                      (this.active = !1),
                      (this.instance.preventOutsideClick = !0),
                      this.dragEnd(null),
                      'right' == n && this.instance.prevSlide(),
                      void ('left' == n && this.instance.nextSlide())
                    );
                }
                if (
                  this.toleranceY > 0 &&
                  i > 0 &&
                  i >= t &&
                  (!this.lastDirection || 'y' == this.lastDirection)
                ) {
                  (this.xOffset = 0),
                    (this.lastDirection = 'y'),
                    this.setTranslate(this.dragContainer, 0, this.currentY);
                  var s = this.shouldClose();
                  return (
                    !this.instance.settings.dragAutoSnap && s && (this.doSlideClose = !0),
                    void (this.instance.settings.dragAutoSnap && s && this.instance.close())
                  );
                }
              }
            },
          },
          {
            key: 'shouldChange',
            value: function () {
              var e = !1;
              if (Math.abs(this.currentX) >= this.toleranceX) {
                var t = this.currentX > 0 ? 'right' : 'left';
                (('left' == t && this.slide !== this.slide.parentNode.lastChild) ||
                  ('right' == t && this.slide !== this.slide.parentNode.firstChild)) &&
                  (e = t);
              }
              return e;
            },
          },
          {
            key: 'shouldClose',
            value: function () {
              var e = !1;
              return Math.abs(this.currentY) >= this.toleranceY && (e = !0), e;
            },
          },
          {
            key: 'setTranslate',
            value: function (e, t, i) {
              var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
              (e.style.transition = n ? 'all .2s ease' : ''),
                (e.style.transform = 'translate3d(' + t + 'px, ' + i + 'px, 0)');
            },
          },
        ]),
        e
      );
    })();
  function F(e, t, i) {
    var n = e.querySelector('.gslide-media'),
      s = new Image(),
      l = 'gSlideTitle_' + t.index,
      o = 'gSlideDesc_' + t.index;
    s.addEventListener(
      'load',
      function () {
        C(i) && i();
      },
      !1
    ),
      (s.src = t.href),
      (s.alt = ''),
      '' !== t.title && s.setAttribute('aria-labelledby', l),
      '' !== t.description && s.setAttribute('aria-describedby', o),
      n.insertBefore(s, n.firstChild);
  }
  function R(e, t, i) {
    var n = this,
      s = e.querySelector('.ginner-container'),
      l = 'gvideo' + t.index,
      o = e.querySelector('.gslide-media'),
      r = this.getAllPlayers();
    d(s, 'gvideo-container'), o.insertBefore(x('<div class="gvideo-wrapper"></div>'), o.firstChild);
    var a = e.querySelector('.gvideo-wrapper');
    T(this.settings.plyr.css, 'Plyr');
    var h = t.href,
      c = location.protocol.replace(':', ''),
      u = '',
      g = '',
      v = !1;
    'file' == c && (c = 'http'),
      (o.style.maxWidth = t.width),
      T(this.settings.plyr.js, 'Plyr', function () {
        if (h.match(/vimeo\.com\/([0-9]*)/)) {
          var e = /vimeo.*\/(\d+)/i.exec(h);
          (u = 'vimeo'), (g = e[1]);
        }
        if (
          h.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) ||
          h.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) ||
          h.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)
        ) {
          var s = (function (e) {
            var t = '';
            t =
              void 0 !==
              (e = e.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2]
                ? (t = e[2].split(/[^0-9a-z_\-]/i))[0]
                : e;
            return t;
          })(h);
          (u = 'youtube'), (g = s);
        }
        if (null !== h.match(/\.(mp4|ogg|webm|mov)$/)) {
          u = 'local';
          var o = '<video id="' + l + '" ';
          (o += 'style="background:#000; max-width: '.concat(t.width, ';" ')),
            (o += 'preload="metadata" '),
            (o += 'x-webkit-airplay="allow" '),
            (o += 'webkit-playsinline="" '),
            (o += 'controls '),
            (o += 'class="gvideo-local">');
          var c = h.toLowerCase().split('.').pop(),
            f = { mp4: '', ogg: '', webm: '' };
          for (var p in ((f[(c = 'mov' == c ? 'mp4' : c)] = h), f))
            if (f.hasOwnProperty(p)) {
              var m = f[p];
              t.hasOwnProperty(p) && (m = t[p]),
                '' !== m && (o += '<source src="'.concat(m, '" type="video/').concat(p, '">'));
            }
          v = x((o += '</video>'));
        }
        var y =
          v ||
          x(
            '<div id="'
              .concat(l, '" data-plyr-provider="')
              .concat(u, '" data-plyr-embed-id="')
              .concat(g, '"></div>')
          );
        d(a, ''.concat(u, '-video gvideo')),
          a.appendChild(y),
          a.setAttribute('data-id', l),
          a.setAttribute('data-index', t.index);
        var b = M(n.settings.plyr, 'config') ? n.settings.plyr.config : {},
          S = new Plyr('#' + l, b);
        S.on('ready', function (e) {
          var t = e.detail.plyr;
          (r[l] = t), C(i) && i();
        }),
          S.on('enterfullscreen', G),
          S.on('exitfullscreen', G);
      });
  }
  function G(e) {
    var t = v(e.target, '.gslide-media');
    'enterfullscreen' == e.type && d(t, 'fullscreen'),
      'exitfullscreen' == e.type && u(t, 'fullscreen');
  }
  function Z(e, t, i) {
    var n,
      s = this,
      l = e.querySelector('.gslide-media'),
      o = !(!M(t, 'href') || !t.href) && t.href.split('#').pop().trim(),
      r = !(!M(t, 'content') || !t.content) && t.content;
    if (r && (E(r) && (n = x('<div class="ginlined-content">'.concat(r, '</div>'))), A(r))) {
      'none' == r.style.display && (r.style.display = 'block');
      var a = document.createElement('div');
      (a.className = 'ginlined-content'), a.appendChild(r), (n = a);
    }
    if (o) {
      var h = document.getElementById(o);
      if (!h) return !1;
      var u = h.cloneNode(!0);
      (u.style.height = t.height), (u.style.maxWidth = t.width), d(u, 'ginlined-content'), (n = u);
    }
    if (!n) return console.error('Unable to append inline slide content', t), !1;
    (l.style.height = t.height),
      (l.style.width = t.width),
      l.appendChild(n),
      (this.events['inlineclose' + o] = c('click', {
        onElement: l.querySelectorAll('.gtrigger-close'),
        withCallback: function (e) {
          e.preventDefault(), s.close();
        },
      })),
      C(i) && i();
  }
  function $(e, t, i) {
    var n = e.querySelector('.gslide-media'),
      s = (function (e) {
        var t = e.url,
          i = e.allow,
          n = e.callback,
          s = e.appendTo,
          l = document.createElement('iframe');
        return (
          (l.className = 'vimeo-video gvideo'),
          (l.src = t),
          (l.style.width = '100%'),
          (l.style.height = '100%'),
          i && l.setAttribute('allow', i),
          (l.onload = function () {
            d(l, 'node-ready'), C(n) && n();
          }),
          s && s.appendChild(l),
          l
        );
      })({ url: t.href, callback: i });
    (n.parentNode.style.maxWidth = t.width),
      (n.parentNode.style.height = t.height),
      n.appendChild(s);
  }
  var U = (function () {
      function e() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t(this, e),
          (this.defaults = {
            href: '',
            title: '',
            type: '',
            description: '',
            descPosition: 'bottom',
            effect: '',
            width: '',
            height: '',
            content: !1,
            zoomable: !0,
            draggable: !0,
          }),
          O(i) && (this.defaults = r(this.defaults, i));
      }
      return (
        n(e, [
          {
            key: 'sourceType',
            value: function (e) {
              var t = e;
              if (null !== (e = e.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|svg)$/))
                return 'image';
              if (
                e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) ||
                e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) ||
                e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)
              )
                return 'video';
              if (e.match(/vimeo\.com\/([0-9]*)/)) return 'video';
              if (null !== e.match(/\.(mp4|ogg|webm|mov)$/)) return 'video';
              if (null !== e.match(/\.(mp3|wav|wma|aac|ogg)$/)) return 'audio';
              if (e.indexOf('#') > -1 && '' !== t.split('#').pop().trim()) return 'inline';
              return e.indexOf('goajax=true') > -1 ? 'ajax' : 'external';
            },
          },
          {
            key: 'parseConfig',
            value: function (e, t) {
              var i = this,
                n = r({ descPosition: t.descPosition }, this.defaults);
              if (O(e) && !A(e)) {
                M(e, 'type') ||
                  (M(e, 'content') && e.content
                    ? (e.type = 'inline')
                    : M(e, 'href') && (e.type = this.sourceType(e.href)));
                var s = r(n, e);
                return this.setSize(s, t), s;
              }
              var l = '',
                o = e.getAttribute('data-glightbox'),
                h = e.nodeName.toLowerCase();
              if (
                ('a' === h && (l = e.href),
                'img' === h && (l = e.src),
                (n.href = l),
                a(n, function (s, l) {
                  M(t, l) && 'width' !== l && (n[l] = t[l]);
                  var o = e.dataset[l];
                  P(o) || (n[l] = i.sanitizeValue(o));
                }),
                n.content && (n.type = 'inline'),
                !n.type && l && (n.type = this.sourceType(l)),
                P(o))
              ) {
                if (!n.title && 'a' == h) {
                  var c = e.title;
                  P(c) || '' === c || (n.title = c);
                }
                if (!n.title && 'img' == h) {
                  var d = e.alt;
                  P(d) || '' === d || (n.title = d);
                }
              } else {
                var u = [];
                a(n, function (e, t) {
                  u.push(';\\s?' + t);
                }),
                  (u = u.join('\\s?:|')),
                  '' !== o.trim() &&
                    a(n, function (e, t) {
                      var s = o,
                        l = new RegExp('s?' + t + 's?:s?(.*?)(' + u + 's?:|$)'),
                        r = s.match(l);
                      if (r && r.length && r[1]) {
                        var a = r[1].trim().replace(/;\s*$/, '');
                        n[t] = i.sanitizeValue(a);
                      }
                    });
              }
              if (
                n.description &&
                '.' == n.description.substring(0, 1) &&
                document.querySelector(n.description)
              )
                n.description = document.querySelector(n.description).innerHTML;
              else {
                var g = e.querySelector('.glightbox-desc');
                g && (n.description = g.innerHTML);
              }
              return this.setSize(n, t), (this.slideConfig = n), n;
            },
          },
          {
            key: 'setSize',
            value: function (e, t) {
              var i = 'video' == e.type ? this.checkSize(t.videosWidth) : this.checkSize(t.width),
                n = this.checkSize(t.height);
              return (
                (e.width = M(e, 'width') && '' !== e.width ? this.checkSize(e.width) : i),
                (e.height = M(e, 'height') && '' !== e.height ? this.checkSize(e.height) : n),
                e
              );
            },
          },
          {
            key: 'checkSize',
            value: function (e) {
              return z(e) ? ''.concat(e, 'px') : e;
            },
          },
          {
            key: 'sanitizeValue',
            value: function (e) {
              return 'true' !== e && 'false' !== e ? e : 'true' === e;
            },
          },
        ]),
        e
      );
    })(),
    J = (function () {
      function e(i, n) {
        t(this, e), (this.element = i), (this.instance = n);
      }
      return (
        n(e, [
          {
            key: 'setContent',
            value: function () {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              if (g(t, 'loaded')) return !1;
              var n = this.instance.settings,
                s = this.slideConfig,
                l = k();
              C(n.beforeSlideLoad) && n.beforeSlideLoad({ index: s.index, slide: t, player: !1 });
              var o = s.type,
                r = s.descPosition,
                a = t.querySelector('.gslide-media'),
                h = t.querySelector('.gslide-title'),
                c = t.querySelector('.gslide-desc'),
                u = t.querySelector('.gdesc-inner'),
                v = i,
                f = 'gSlideTitle_' + s.index,
                p = 'gSlideDesc_' + s.index;
              if (
                (C(n.afterSlideLoad) &&
                  (v = function () {
                    C(i) && i(),
                      n.afterSlideLoad({
                        index: s.index,
                        slide: t,
                        player: e.instance.getSlidePlayerInstance(s.index),
                      });
                  }),
                '' == s.title && '' == s.description
                  ? u && u.parentNode.parentNode.removeChild(u.parentNode)
                  : (h && '' !== s.title
                      ? ((h.id = f), (h.innerHTML = s.title))
                      : h.parentNode.removeChild(h),
                    c && '' !== s.description
                      ? ((c.id = p),
                        l && n.moreLength > 0
                          ? ((s.smallDescription = this.slideShortDesc(
                              s.description,
                              n.moreLength,
                              n.moreText
                            )),
                            (c.innerHTML = s.smallDescription),
                            this.descriptionEvents(c, s))
                          : (c.innerHTML = s.description))
                      : c.parentNode.removeChild(c),
                    d(a.parentNode, 'desc-'.concat(r)),
                    d(u.parentNode, 'description-'.concat(r))),
                d(a, 'gslide-'.concat(o)),
                d(t, 'loaded'),
                'video' !== o)
              ) {
                if ('external' !== o)
                  return 'inline' === o
                    ? (Z.apply(this.instance, [t, s, v]),
                      void (
                        s.draggable &&
                        new V({
                          dragEl: t.querySelector('.gslide-inline'),
                          toleranceX: n.dragToleranceX,
                          toleranceY: n.dragToleranceY,
                          slide: t,
                          instance: this.instance,
                        })
                      ))
                    : void ('image' !== o
                        ? C(v) && v()
                        : F(t, s, function () {
                            var i = t.querySelector('img');
                            s.draggable &&
                              new V({
                                dragEl: i,
                                toleranceX: n.dragToleranceX,
                                toleranceY: n.dragToleranceY,
                                slide: t,
                                instance: e.instance,
                              }),
                              s.zoomable &&
                                i.naturalWidth > i.offsetWidth &&
                                (d(i, 'zoomable'),
                                new j(i, t, function () {
                                  e.instance.resize();
                                })),
                              C(v) && v();
                          }));
                $.apply(this, [t, s, v]);
              } else R.apply(this.instance, [t, s, v]);
            },
          },
          {
            key: 'slideShortDesc',
            value: function (e) {
              var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
                i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                n = i;
              if ((e = e.trim()).length <= t) return e;
              var s = e.substr(0, t - 1);
              return n ? s + '... <a href="#" class="desc-more">' + i + '</a>' : s;
            },
          },
          {
            key: 'descriptionEvents',
            value: function (e, t) {
              var i = this,
                n = e.querySelector('.desc-more');
              if (!n) return !1;
              c('click', {
                onElement: n,
                withCallback: function (e, n) {
                  e.preventDefault();
                  var s = document.body,
                    l = v(n, '.gslide-desc');
                  if (!l) return !1;
                  (l.innerHTML = t.description), d(s, 'gdesc-open');
                  var o = c('click', {
                    onElement: [s, v(l, '.gslide-description')],
                    withCallback: function (e, n) {
                      'a' !== e.target.nodeName.toLowerCase() &&
                        (u(s, 'gdesc-open'),
                        d(s, 'gdesc-closed'),
                        (l.innerHTML = t.smallDescription),
                        i.descriptionEvents(l, t),
                        setTimeout(function () {
                          u(s, 'gdesc-closed');
                        }, 400),
                        o.destroy());
                    },
                  });
                },
              });
            },
          },
          {
            key: 'create',
            value: function () {
              return x(this.instance.settings.slideHTML);
            },
          },
          {
            key: 'getConfig',
            value: function () {
              var e = new U(this.instance.settings.slideExtraAttributes);
              return (
                (this.slideConfig = e.parseConfig(this.element, this.instance.settings)),
                this.slideConfig
              );
            },
          },
        ]),
        e
      );
    })(),
    K = k(),
    Q =
      null !== k() ||
      void 0 !== document.createTouch ||
      'ontouchstart' in window ||
      'onmsgesturechange' in window ||
      navigator.msMaxTouchPoints,
    ee = document.getElementsByTagName('html')[0],
    te = {
      selector: '.glightbox',
      elements: null,
      skin: 'clean',
      closeButton: !0,
      startAt: null,
      autoplayVideos: !0,
      autofocusVideos: !0,
      descPosition: 'bottom',
      width: '900px',
      height: '506px',
      videosWidth: '960px',
      beforeSlideChange: null,
      afterSlideChange: null,
      beforeSlideLoad: null,
      afterSlideLoad: null,
      slideInserted: null,
      slideRemoved: null,
      slideExtraAttributes: null,
      onOpen: null,
      onClose: null,
      loop: !1,
      zoomable: !0,
      draggable: !0,
      dragAutoSnap: !1,
      dragToleranceX: 40,
      dragToleranceY: 65,
      preload: !0,
      oneSlidePerOpen: !1,
      touchNavigation: !0,
      touchFollowAxis: !0,
      keyboardNavigation: !0,
      closeOnOutsideClick: !0,
      plyr: {
        css: 'https://cdn.plyr.io/3.6.3/plyr.css',
        js: 'https://cdn.plyr.io/3.6.3/plyr.js',
        config: {
          ratio: '16:9',
          youtube: { noCookie: !0, rel: 0, showinfo: 0, iv_load_policy: 3 },
          vimeo: { byline: !1, portrait: !1, title: !1, transparent: !1 },
        },
      },
      openEffect: 'zoom',
      closeEffect: 'zoom',
      slideEffect: 'slide',
      moreText: 'See more',
      moreLength: 60,
      cssEfects: {
        fade: { in: 'fadeIn', out: 'fadeOut' },
        zoom: { in: 'zoomIn', out: 'zoomOut' },
        slide: { in: 'slideInRight', out: 'slideOutLeft' },
        slideBack: { in: 'slideInLeft', out: 'slideOutRight' },
        none: { in: 'none', out: 'none' },
      },
      svg: {
        close:
          '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
        next: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
        prev: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>',
      },
      slideHTML:
        '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',
      lightboxHTML:
        '<div id="glightbox-body" class="glightbox-container">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gnext gbtn" tabindex="0" aria-label="Next">{nextSVG}</button>\n    <button class="gprev gbtn" tabindex="1" aria-label="Previous">{prevSVG}</button>\n    <button class="gclose gbtn" tabindex="2" aria-label="Close">{closeSVG}</button>\n</div>\n</div>',
    },
    ie = (function () {
      function e() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t(this, e),
          (this.settings = r(te, i)),
          (this.effectsClasses = this.getAnimationClasses()),
          (this.videoPlayers = {}),
          (this.apiEvents = []),
          (this.fullElementsList = !1);
      }
      return (
        n(e, [
          {
            key: 'init',
            value: function () {
              var e = this,
                t = this.getSelector();
              t &&
                (this.baseEvents = c('click', {
                  onElement: t,
                  withCallback: function (t, i) {
                    t.preventDefault(), e.open(i);
                  },
                })),
                (this.elements = this.getElements());
            },
          },
          {
            key: 'open',
            value: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
              if (0 == this.elements.length) return !1;
              (this.activeSlide = null),
                (this.prevActiveSlideIndex = null),
                (this.prevActiveSlide = null);
              var i = z(t) ? t : this.settings.startAt;
              if (A(e)) {
                var n = e.getAttribute('data-gallery');
                n &&
                  ((this.fullElementsList = this.elements),
                  (this.elements = this.getGalleryElements(this.elements, n))),
                  P(i) && (i = this.getElementIndex(e)) < 0 && (i = 0);
              }
              z(i) || (i = 0),
                this.build(),
                f(
                  this.overlay,
                  'none' == this.settings.openEffect ? 'none' : this.settings.cssEfects.fade.in
                );
              var s = document.body,
                l = window.innerWidth - document.documentElement.clientWidth;
              if (l > 0) {
                var o = document.createElement('style');
                (o.type = 'text/css'),
                  (o.className = 'gcss-styles'),
                  (o.innerText = '.gscrollbar-fixer {margin-right: '.concat(l, 'px}')),
                  document.head.appendChild(o),
                  d(s, 'gscrollbar-fixer');
              }
              d(s, 'glightbox-open'),
                d(ee, 'glightbox-open'),
                K && (d(document.body, 'glightbox-mobile'), (this.settings.slideEffect = 'slide')),
                this.showSlide(i, !0),
                1 == this.elements.length
                  ? (y(this.prevButton), y(this.nextButton))
                  : (m(this.prevButton), m(this.nextButton)),
                (this.lightboxOpen = !0),
                this.trigger('open'),
                C(this.settings.onOpen) && this.settings.onOpen(),
                Q && this.settings.touchNavigation && H(this),
                this.settings.keyboardNavigation && Y(this);
            },
          },
          {
            key: 'openAt',
            value: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              this.open(null, e);
            },
          },
          {
            key: 'showSlide',
            value: function () {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              m(this.loader), (this.index = parseInt(t));
              var n = this.slidesContainer.querySelector('.current');
              n && u(n, 'current'), this.slideAnimateOut();
              var s = this.slidesContainer.querySelectorAll('.gslide')[t];
              if (g(s, 'loaded')) this.slideAnimateIn(s, i), y(this.loader);
              else {
                m(this.loader);
                var l = this.elements[t],
                  o = {
                    index: this.index,
                    slide: s,
                    slideNode: s,
                    slideConfig: l.slideConfig,
                    slideIndex: this.index,
                    trigger: l.node,
                    player: null,
                  };
                this.trigger('slide_before_load', o),
                  l.instance.setContent(s, function () {
                    y(e.loader),
                      e.resize(),
                      e.slideAnimateIn(s, i),
                      e.trigger('slide_after_load', o);
                  });
              }
              (this.slideDescription = s.querySelector('.gslide-description')),
                (this.slideDescriptionContained =
                  this.slideDescription && g(this.slideDescription.parentNode, 'gslide-media')),
                this.settings.preload && (this.preloadSlide(t + 1), this.preloadSlide(t - 1)),
                this.updateNavigationClasses(),
                (this.activeSlide = s);
            },
          },
          {
            key: 'preloadSlide',
            value: function (e) {
              var t = this;
              if (e < 0 || e > this.elements.length - 1) return !1;
              if (P(this.elements[e])) return !1;
              var i = this.slidesContainer.querySelectorAll('.gslide')[e];
              if (g(i, 'loaded')) return !1;
              var n = this.elements[e],
                s = n.type,
                l = {
                  index: e,
                  slide: i,
                  slideNode: i,
                  slideConfig: n.slideConfig,
                  slideIndex: e,
                  trigger: n.node,
                  player: null,
                };
              this.trigger('slide_before_load', l),
                'video' == s || 'external' == s
                  ? setTimeout(function () {
                      n.instance.setContent(i, function () {
                        t.trigger('slide_after_load', l);
                      });
                    }, 200)
                  : n.instance.setContent(i, function () {
                      t.trigger('slide_after_load', l);
                    });
            },
          },
          {
            key: 'prevSlide',
            value: function () {
              this.goToSlide(this.index - 1);
            },
          },
          {
            key: 'nextSlide',
            value: function () {
              this.goToSlide(this.index + 1);
            },
          },
          {
            key: 'goToSlide',
            value: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              if (
                ((this.prevActiveSlide = this.activeSlide),
                (this.prevActiveSlideIndex = this.index),
                !this.loop() && (e < 0 || e > this.elements.length - 1))
              )
                return !1;
              e < 0 ? (e = this.elements.length - 1) : e >= this.elements.length && (e = 0),
                this.showSlide(e);
            },
          },
          {
            key: 'insertSlide',
            value: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1,
                i = new J(e, this),
                n = i.getConfig(),
                s = r({}, n),
                l = i.create(),
                o = this.elements.length - 1;
              t < 0 && (t = this.elements.length),
                (s.index = t),
                (s.node = !1),
                (s.instance = i),
                (s.slideConfig = n),
                this.elements.splice(t, 0, s);
              var a = null,
                h = null;
              if (this.slidesContainer) {
                if (t > o) this.slidesContainer.appendChild(l);
                else {
                  var c = this.slidesContainer.querySelectorAll('.gslide')[t];
                  this.slidesContainer.insertBefore(l, c);
                }
                ((this.settings.preload && 0 == this.index && 0 == t) ||
                  this.index - 1 == t ||
                  this.index + 1 == t) &&
                  this.preloadSlide(t),
                  0 == this.index && 0 == t && (this.index = 1),
                  this.updateNavigationClasses(),
                  (a = this.slidesContainer.querySelectorAll('.gslide')[t]),
                  (h = this.getSlidePlayerInstance(t)),
                  (s.slideNode = a);
              }
              this.trigger('slide_inserted', {
                index: t,
                slide: a,
                slideNode: a,
                slideConfig: n,
                slideIndex: t,
                trigger: null,
                player: h,
              }),
                C(this.settings.slideInserted) &&
                  this.settings.slideInserted({ index: t, slide: a, player: h });
            },
          },
          {
            key: 'removeSlide',
            value: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
              if (e < 0 || e > this.elements.length - 1) return !1;
              var t = this.slidesContainer && this.slidesContainer.querySelectorAll('.gslide')[e];
              t &&
                (this.getActiveSlideIndex() == e &&
                  (e == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()),
                t.parentNode.removeChild(t)),
                this.elements.splice(e, 1),
                this.trigger('slide_removed', e),
                C(this.settings.slideRemoved) && this.settings.slideRemoved(e);
            },
          },
          {
            key: 'slideAnimateIn',
            value: function (e, t) {
              var i = this,
                n = e.querySelector('.gslide-media'),
                s = e.querySelector('.gslide-description'),
                l = {
                  index: this.prevActiveSlideIndex,
                  slide: this.prevActiveSlide,
                  slideNode: this.prevActiveSlide,
                  slideIndex: this.prevActiveSlide,
                  slideConfig: P(this.prevActiveSlideIndex)
                    ? null
                    : this.elements[this.prevActiveSlideIndex].slideConfig,
                  trigger: P(this.prevActiveSlideIndex)
                    ? null
                    : this.elements[this.prevActiveSlideIndex].node,
                  player: this.getSlidePlayerInstance(this.prevActiveSlideIndex),
                },
                o = {
                  index: this.index,
                  slide: this.activeSlide,
                  slideNode: this.activeSlide,
                  slideConfig: this.elements[this.index].slideConfig,
                  slideIndex: this.index,
                  trigger: this.elements[this.index].node,
                  player: this.getSlidePlayerInstance(this.index),
                };
              if (
                (n.offsetWidth > 0 && s && (y(s), (s.style.display = '')),
                u(e, this.effectsClasses),
                t)
              )
                f(e, this.settings.cssEfects[this.settings.openEffect].in, function () {
                  i.settings.autoplayVideos && i.slidePlayerPlay(e),
                    i.trigger('slide_changed', { prev: l, current: o }),
                    C(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [l, o]);
                });
              else {
                var r = this.settings.slideEffect,
                  a = 'none' !== r ? this.settings.cssEfects[r].in : r;
                this.prevActiveSlideIndex > this.index &&
                  'slide' == this.settings.slideEffect &&
                  (a = this.settings.cssEfects.slideBack.in),
                  f(e, a, function () {
                    i.settings.autoplayVideos && i.slidePlayerPlay(e),
                      i.trigger('slide_changed', { prev: l, current: o }),
                      C(i.settings.afterSlideChange) &&
                        i.settings.afterSlideChange.apply(i, [l, o]);
                  });
              }
              setTimeout(function () {
                i.resize(e);
              }, 100),
                d(e, 'current');
            },
          },
          {
            key: 'slideAnimateOut',
            value: function () {
              if (!this.prevActiveSlide) return !1;
              var e = this.prevActiveSlide;
              u(e, this.effectsClasses), d(e, 'prev');
              var t = this.settings.slideEffect,
                i = 'none' !== t ? this.settings.cssEfects[t].out : t;
              this.slidePlayerPause(e),
                this.trigger('slide_before_change', {
                  prev: {
                    index: this.prevActiveSlideIndex,
                    slide: this.prevActiveSlide,
                    slideNode: this.prevActiveSlide,
                    slideIndex: this.prevActiveSlideIndex,
                    slideConfig: P(this.prevActiveSlideIndex)
                      ? null
                      : this.elements[this.prevActiveSlideIndex].slideConfig,
                    trigger: P(this.prevActiveSlideIndex)
                      ? null
                      : this.elements[this.prevActiveSlideIndex].node,
                    player: this.getSlidePlayerInstance(this.prevActiveSlideIndex),
                  },
                  current: {
                    index: this.index,
                    slide: this.activeSlide,
                    slideNode: this.activeSlide,
                    slideIndex: this.index,
                    slideConfig: this.elements[this.index].slideConfig,
                    trigger: this.elements[this.index].node,
                    player: this.getSlidePlayerInstance(this.index),
                  },
                }),
                C(this.settings.beforeSlideChange) &&
                  this.settings.beforeSlideChange.apply(this, [
                    {
                      index: this.prevActiveSlideIndex,
                      slide: this.prevActiveSlide,
                      player: this.getSlidePlayerInstance(this.prevActiveSlideIndex),
                    },
                    {
                      index: this.index,
                      slide: this.activeSlide,
                      player: this.getSlidePlayerInstance(this.index),
                    },
                  ]),
                this.prevActiveSlideIndex > this.index &&
                  'slide' == this.settings.slideEffect &&
                  (i = this.settings.cssEfects.slideBack.out),
                f(e, i, function () {
                  var t = e.querySelector('.gslide-media'),
                    i = e.querySelector('.gslide-description');
                  (t.style.transform = ''),
                    u(t, 'greset'),
                    (t.style.opacity = ''),
                    i && (i.style.opacity = ''),
                    u(e, 'prev');
                });
            },
          },
          {
            key: 'getAllPlayers',
            value: function () {
              return this.videoPlayers;
            },
          },
          {
            key: 'getSlidePlayerInstance',
            value: function (e) {
              var t = 'gvideo' + e,
                i = this.getAllPlayers();
              return !(!M(i, t) || !i[t]) && i[t];
            },
          },
          {
            key: 'stopSlideVideo',
            value: function (e) {
              if (A(e)) {
                var t = e.querySelector('.gvideo-wrapper');
                t && (e = t.getAttribute('data-index'));
              }
              console.log('stopSlideVideo is deprecated, use slidePlayerPause');
              var i = this.getSlidePlayerInstance(e);
              i && i.playing && i.pause();
            },
          },
          {
            key: 'slidePlayerPause',
            value: function (e) {
              if (A(e)) {
                var t = e.querySelector('.gvideo-wrapper');
                t && (e = t.getAttribute('data-index'));
              }
              var i = this.getSlidePlayerInstance(e);
              i && i.playing && i.pause();
            },
          },
          {
            key: 'playSlideVideo',
            value: function (e) {
              if (A(e)) {
                var t = e.querySelector('.gvideo-wrapper');
                t && (e = t.getAttribute('data-index'));
              }
              console.log('playSlideVideo is deprecated, use slidePlayerPlay');
              var i = this.getSlidePlayerInstance(e);
              i && !i.playing && i.play();
            },
          },
          {
            key: 'slidePlayerPlay',
            value: function (e) {
              if (A(e)) {
                var t = e.querySelector('.gvideo-wrapper');
                t && (e = t.getAttribute('data-index'));
              }
              var i = this.getSlidePlayerInstance(e);
              i &&
                !i.playing &&
                (i.play(), this.settings.autofocusVideos && i.elements.container.focus());
            },
          },
          {
            key: 'setElements',
            value: function (e) {
              var t = this;
              this.settings.elements = !1;
              var i = [];
              e &&
                e.length &&
                a(e, function (e, n) {
                  var s = new J(e, t),
                    l = s.getConfig(),
                    o = r({}, l);
                  (o.slideConfig = l), (o.instance = s), (o.index = n), i.push(o);
                }),
                (this.elements = i),
                this.lightboxOpen &&
                  ((this.slidesContainer.innerHTML = ''),
                  this.elements.length &&
                    (a(this.elements, function () {
                      var e = x(t.settings.slideHTML);
                      t.slidesContainer.appendChild(e);
                    }),
                    this.showSlide(0, !0)));
            },
          },
          {
            key: 'getElementIndex',
            value: function (e) {
              var t = !1;
              return (
                a(this.elements, function (i, n) {
                  if (M(i, 'node') && i.node == e) return (t = n), !0;
                }),
                t
              );
            },
          },
          {
            key: 'getElements',
            value: function () {
              var e = this,
                t = [];
              (this.elements = this.elements ? this.elements : []),
                !P(this.settings.elements) &&
                  L(this.settings.elements) &&
                  this.settings.elements.length &&
                  a(this.settings.elements, function (i, n) {
                    var s = new J(i, e),
                      l = s.getConfig(),
                      o = r({}, l);
                    (o.node = !1), (o.index = n), (o.instance = s), (o.slideConfig = l), t.push(o);
                  });
              var i = !1;
              return (
                this.getSelector() && (i = document.querySelectorAll(this.getSelector())),
                i
                  ? (a(i, function (i, n) {
                      var s = new J(i, e),
                        l = s.getConfig(),
                        o = r({}, l);
                      (o.node = i),
                        (o.index = n),
                        (o.instance = s),
                        (o.slideConfig = l),
                        (o.gallery = i.getAttribute('data-gallery')),
                        t.push(o);
                    }),
                    t)
                  : t
              );
            },
          },
          {
            key: 'getGalleryElements',
            value: function (e, t) {
              return e.filter(function (e) {
                return e.gallery == t;
              });
            },
          },
          {
            key: 'getSelector',
            value: function () {
              return (
                !this.settings.elements &&
                (this.settings.selector && 'data-' == this.settings.selector.substring(0, 5)
                  ? '*['.concat(this.settings.selector, ']')
                  : this.settings.selector)
              );
            },
          },
          {
            key: 'getActiveSlide',
            value: function () {
              return this.slidesContainer.querySelectorAll('.gslide')[this.index];
            },
          },
          {
            key: 'getActiveSlideIndex',
            value: function () {
              return this.index;
            },
          },
          {
            key: 'getAnimationClasses',
            value: function () {
              var e = [];
              for (var t in this.settings.cssEfects)
                if (this.settings.cssEfects.hasOwnProperty(t)) {
                  var i = this.settings.cssEfects[t];
                  e.push('g'.concat(i.in)), e.push('g'.concat(i.out));
                }
              return e.join(' ');
            },
          },
          {
            key: 'build',
            value: function () {
              var e = this;
              if (this.built) return !1;
              var t = M(this.settings.svg, 'next') ? this.settings.svg.next : '',
                i = M(this.settings.svg, 'prev') ? this.settings.svg.prev : '',
                n = M(this.settings.svg, 'close') ? this.settings.svg.close : '',
                s = this.settings.lightboxHTML;
              (s = x(
                (s = (s = (s = s.replace(/{nextSVG}/g, t)).replace(/{prevSVG}/g, i)).replace(
                  /{closeSVG}/g,
                  n
                ))
              )),
                document.body.appendChild(s);
              var l = document.getElementById('glightbox-body');
              this.modal = l;
              var o = l.querySelector('.gclose');
              (this.prevButton = l.querySelector('.gprev')),
                (this.nextButton = l.querySelector('.gnext')),
                (this.overlay = l.querySelector('.goverlay')),
                (this.loader = l.querySelector('.gloader')),
                (this.slidesContainer = document.getElementById('glightbox-slider')),
                (this.events = {}),
                d(this.modal, 'glightbox-' + this.settings.skin),
                this.settings.closeButton &&
                  o &&
                  (this.events.close = c('click', {
                    onElement: o,
                    withCallback: function (t, i) {
                      t.preventDefault(), e.close();
                    },
                  })),
                o && !this.settings.closeButton && o.parentNode.removeChild(o),
                this.nextButton &&
                  (this.events.next = c('click', {
                    onElement: this.nextButton,
                    withCallback: function (t, i) {
                      t.preventDefault(), e.nextSlide();
                    },
                  })),
                this.prevButton &&
                  (this.events.prev = c('click', {
                    onElement: this.prevButton,
                    withCallback: function (t, i) {
                      t.preventDefault(), e.prevSlide();
                    },
                  })),
                this.settings.closeOnOutsideClick &&
                  (this.events.outClose = c('click', {
                    onElement: l,
                    withCallback: function (t, i) {
                      e.preventOutsideClick ||
                        g(document.body, 'glightbox-mobile') ||
                        v(t.target, '.ginner-container') ||
                        v(t.target, '.gbtn') ||
                        g(t.target, 'gnext') ||
                        g(t.target, 'gprev') ||
                        e.close();
                    },
                  })),
                a(this.elements, function (t, i) {
                  e.slidesContainer.appendChild(t.instance.create()),
                    (t.slideNode = e.slidesContainer.querySelectorAll('.gslide')[i]);
                }),
                Q && d(document.body, 'glightbox-touch'),
                (this.events.resize = c('resize', {
                  onElement: window,
                  withCallback: function () {
                    e.resize();
                  },
                })),
                (this.built = !0);
            },
          },
          {
            key: 'resize',
            value: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
              if ((e = e || this.activeSlide) && !g(e, 'zoomed')) {
                var t = b(),
                  i = e.querySelector('.gvideo-wrapper'),
                  n = e.querySelector('.gslide-image'),
                  s = this.slideDescription,
                  l = t.width,
                  o = t.height;
                if (
                  (l <= 768
                    ? d(document.body, 'glightbox-mobile')
                    : u(document.body, 'glightbox-mobile'),
                  i || n)
                ) {
                  var r = !1;
                  if (
                    (s &&
                      (g(s, 'description-bottom') || g(s, 'description-top')) &&
                      !g(s, 'gabsolute') &&
                      (r = !0),
                    n)
                  )
                    if (l <= 768) {
                      var a = n.querySelector('img');
                      a.setAttribute('style', '');
                    } else if (r) {
                      var h = s.offsetHeight,
                        c = n.querySelector('img');
                      c.setAttribute('style', 'max-height: calc(100vh - '.concat(h, 'px)')),
                        s.setAttribute('style', 'max-width: '.concat(c.offsetWidth, 'px;'));
                    }
                  if (i) {
                    var v = M(this.settings.plyr.config, 'ratio')
                        ? this.settings.plyr.config.ratio
                        : '16:9',
                      f = v.split(':'),
                      p = 900,
                      m = p / (parseInt(f[0]) / parseInt(f[1]));
                    if (((m = Math.floor(m)), r && (o -= s.offsetHeight), o < m && l > p)) {
                      var y = i.offsetWidth,
                        x = i.offsetHeight,
                        S = o / x,
                        w = { width: y * S, height: x * S };
                      i.parentNode.setAttribute('style', 'max-width: '.concat(w.width, 'px')),
                        r && s.setAttribute('style', 'max-width: '.concat(w.width, 'px;'));
                    } else
                      (i.parentNode.style.maxWidth = ''.concat(p, 'px')),
                        r && s.setAttribute('style', 'max-width: '.concat(p, 'px;'));
                  }
                }
              }
            },
          },
          {
            key: 'reload',
            value: function () {
              this.init();
            },
          },
          {
            key: 'updateNavigationClasses',
            value: function () {
              var e = this.loop();
              u(this.nextButton, 'disabled'),
                u(this.prevButton, 'disabled'),
                0 == this.index && this.elements.length - 1 == 0
                  ? (d(this.prevButton, 'disabled'), d(this.nextButton, 'disabled'))
                  : 0 !== this.index || e
                    ? this.index !== this.elements.length - 1 || e || d(this.nextButton, 'disabled')
                    : d(this.prevButton, 'disabled');
            },
          },
          {
            key: 'loop',
            value: function () {
              var e = M(this.settings, 'loopAtEnd') ? this.settings.loopAtEnd : null;
              return (e = M(this.settings, 'loop') ? this.settings.loop : e), e;
            },
          },
          {
            key: 'close',
            value: function () {
              var e = this;
              if (!this.lightboxOpen) {
                if (this.events) {
                  for (var t in this.events)
                    this.events.hasOwnProperty(t) && this.events[t].destroy();
                  this.events = null;
                }
                return !1;
              }
              if (this.closing) return !1;
              (this.closing = !0),
                this.slidePlayerPause(this.activeSlide),
                this.fullElementsList && (this.elements = this.fullElementsList),
                d(this.modal, 'glightbox-closing'),
                f(
                  this.overlay,
                  'none' == this.settings.openEffect ? 'none' : this.settings.cssEfects.fade.out
                ),
                f(
                  this.activeSlide,
                  this.settings.cssEfects[this.settings.closeEffect].out,
                  function () {
                    if (
                      ((e.activeSlide = null),
                      (e.prevActiveSlideIndex = null),
                      (e.prevActiveSlide = null),
                      (e.built = !1),
                      e.events)
                    ) {
                      for (var t in e.events) e.events.hasOwnProperty(t) && e.events[t].destroy();
                      e.events = null;
                    }
                    var i = document.body;
                    u(ee, 'glightbox-open'),
                      u(
                        i,
                        'glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer'
                      ),
                      e.modal.parentNode.removeChild(e.modal),
                      e.trigger('close'),
                      C(e.settings.onClose) && e.settings.onClose();
                    var n = document.querySelector('.gcss-styles');
                    n && n.parentNode.removeChild(n), (e.lightboxOpen = !1), (e.closing = null);
                  }
                );
            },
          },
          {
            key: 'destroy',
            value: function () {
              this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
            },
          },
          {
            key: 'on',
            value: function (e, t) {
              var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              if (!e || !C(t)) throw new TypeError('Event name and callback must be defined');
              this.apiEvents.push({ evt: e, once: i, callback: t });
            },
          },
          {
            key: 'once',
            value: function (e, t) {
              this.on(e, t, !0);
            },
          },
          {
            key: 'trigger',
            value: function (e) {
              var t = this,
                i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                n = [];
              a(this.apiEvents, function (t, s) {
                var l = t.evt,
                  o = t.once,
                  r = t.callback;
                l == e && (r(i), o && n.push(s));
              }),
                n.length &&
                  a(n, function (e) {
                    return t.apiEvents.splice(e, 1);
                  });
            },
          },
          {
            key: 'clearAllEvents',
            value: function () {
              this.apiEvents.splice(0, this.apiEvents.length);
            },
          },
          {
            key: 'version',
            value: function () {
              return '3.0.6';
            },
          },
        ]),
        e
      );
    })();
  return function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = new ie(e);
    return t.init(), t;
  };
});
