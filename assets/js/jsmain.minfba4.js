/*! grunt-project - v0.1.0 - 2017-05-17 */ function HMACClient(a, b) {
  function c() {
    return Math.round(new Date().getTime() / 1e3);
  }
  function d() {
    var a = new Date().getTime();
    window.performance &&
      "function" == typeof window.performance.now &&
      (a += performance.now());
    var b = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx",
      c = b.replace(/[xy]/g, function (b) {
        var c = (a + 16 * Math.random()) % 16 | 0;
        return (
          (a = Math.floor(a / 16)), ("x" === b ? c : (3 & c) | 8).toString(16)
        );
      });
    return c;
  }
  function e(a, b, e) {
    var f = c(),
      g = d(),
      h = "",
      i = encodeURIComponent(
        b.replace("https:", "").replace("http:", "")
      ).toLowerCase();
    e && (h = CryptoJS.MD5(JSON.stringify(e)).toString());
    var j = a.accessKey + a.requestHttpMethod + i + f + g + h,
      k = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, a.secretKey);
    return (
      k.update(j),
      {
        accessKey: a.accessKey,
        requestSignatureBase64String: k.finalize().toString(),
        requestId: g,
        requestTimeStamp: f,
      }
    );
  }
  (this.accessKey = a),
    (this.secretKey = b),
    (this.requestHttpMethod = "POST"),
    (this.authenticationScheme = "amx"),
    (this.getCredentials = null),
    (this.Send = function (a, b, c, d) {
      var f = e(this, a, b);
      this.getCredentials = f;
      var g = new XMLHttpRequest();
      (g.onreadystatechange = function () {
        switch (g.readyState) {
          case 0:
          case 1:
          case 2:
          case 3:
            break;
          case 4:
            200 === g.status
              ? c(JSON.parse(g.responseText))
              : d(g, g.readyState, g.status);
            break;
          default:
            d(g, g.readyState, g.status);
        }
      }),
        g.open(this.requestHttpMethod, a, !0),
        g.setRequestHeader(
          "Authorization",
          "amx " +
            f.accessKey +
            ":" +
            f.requestSignatureBase64String +
            ":" +
            f.requestId +
            ":" +
            f.requestTimeStamp
        ),
        g.setRequestHeader("Content-Type", "application/json"),
        g.send(JSON.stringify(b));
    });
}
function MarkerClusterer(a, b, c) {
  this.extend(MarkerClusterer, google.maps.OverlayView),
    (this.map_ = a),
    (this.markers_ = []),
    (this.clusters_ = []),
    (this.sizes = [53, 56, 66, 78, 90]),
    (this.styles_ = []),
    (this.ready_ = !1);
  var d = c || {};
  (this.gridSize_ = d.gridSize || 60),
    (this.minClusterSize_ = d.minimumClusterSize || 2),
    (this.maxZoom_ = d.maxZoom || null),
    (this.styles_ = d.styles || []),
    (this.imagePath_ = d.imagePath || this.MARKER_CLUSTER_IMAGE_PATH_),
    (this.imageExtension_ =
      d.imageExtension || this.MARKER_CLUSTER_IMAGE_EXTENSION_),
    (this.zoomOnClick_ = !0),
    void 0 != d.zoomOnClick && (this.zoomOnClick_ = d.zoomOnClick),
    (this.averageCenter_ = !1),
    void 0 != d.averageCenter && (this.averageCenter_ = d.averageCenter),
    this.setupStyles_(),
    this.setMap(a),
    (this.prevZoom_ = this.map_.getZoom());
  var e = this;
  google.maps.event.addListener(this.map_, "zoom_changed", function () {
    var a = e.map_.getZoom(),
      b = e.map_.minZoom || 0,
      c = Math.min(
        e.map_.maxZoom || 100,
        e.map_.mapTypes[e.map_.getMapTypeId()].maxZoom
      );
    (a = Math.min(Math.max(a, b), c)),
      e.prevZoom_ != a && ((e.prevZoom_ = a), e.resetViewport());
  }),
    google.maps.event.addListener(this.map_, "idle", function () {
      e.redraw();
    }),
    b && (b.length || Object.keys(b).length) && this.addMarkers(b, !1);
}
function Cluster(a) {
  (this.markerClusterer_ = a),
    (this.map_ = a.getMap()),
    (this.gridSize_ = a.getGridSize()),
    (this.minClusterSize_ = a.getMinClusterSize()),
    (this.averageCenter_ = a.isAverageCenter()),
    (this.center_ = null),
    (this.markers_ = []),
    (this.bounds_ = null),
    (this.clusterIcon_ = new ClusterIcon(this, a.getStyles(), a.getGridSize()));
}
function ClusterIcon(a, b, c) {
  a.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView),
    (this.styles_ = b),
    (this.padding_ = c || 0),
    (this.cluster_ = a),
    (this.center_ = null),
    (this.map_ = a.getMap()),
    (this.div_ = null),
    (this.sums_ = null),
    (this.visible_ = !1),
    this.setMap(this.map_);
}
if (
  ((function (a, b) {
    function c(a) {
      var b = a.length,
        c = ka.type(a);
      return (
        !ka.isWindow(a) &&
        (!(1 !== a.nodeType || !b) ||
          "array" === c ||
          ("function" !== c &&
            (0 === b || ("number" == typeof b && b > 0 && b - 1 in a))))
      );
    }
    function d(a) {
      var b = (za[a] = {});
      return (
        ka.each(a.match(ma) || [], function (a, c) {
          b[c] = !0;
        }),
        b
      );
    }
    function e(a, c, d, e) {
      if (ka.acceptData(a)) {
        var f,
          g,
          h = ka.expando,
          i = a.nodeType,
          j = i ? ka.cache : a,
          k = i ? a[h] : a[h] && h;
        if ((k && j[k] && (e || j[k].data)) || d !== b || "string" != typeof c)
          return (
            k || (k = i ? (a[h] = ba.pop() || ka.guid++) : h),
            j[k] || (j[k] = i ? {} : { toJSON: ka.noop }),
            ("object" == typeof c || "function" == typeof c) &&
              (e
                ? (j[k] = ka.extend(j[k], c))
                : (j[k].data = ka.extend(j[k].data, c))),
            (g = j[k]),
            e || (g.data || (g.data = {}), (g = g.data)),
            d !== b && (g[ka.camelCase(c)] = d),
            "string" == typeof c
              ? ((f = g[c]), null == f && (f = g[ka.camelCase(c)]))
              : (f = g),
            f
          );
      }
    }
    function f(a, b, c) {
      if (ka.acceptData(a)) {
        var d,
          e,
          f = a.nodeType,
          g = f ? ka.cache : a,
          i = f ? a[ka.expando] : ka.expando;
        if (g[i]) {
          if (b && (d = c ? g[i] : g[i].data)) {
            ka.isArray(b)
              ? (b = b.concat(ka.map(b, ka.camelCase)))
              : b in d
              ? (b = [b])
              : ((b = ka.camelCase(b)), (b = b in d ? [b] : b.split(" "))),
              (e = b.length);
            for (; e--; ) delete d[b[e]];
            if (c ? !h(d) : !ka.isEmptyObject(d)) return;
          }
          (c || (delete g[i].data, h(g[i]))) &&
            (f
              ? ka.cleanData([a], !0)
              : ka.support.deleteExpando || g != g.window
              ? delete g[i]
              : (g[i] = null));
        }
      }
    }
    function g(a, c, d) {
      if (d === b && 1 === a.nodeType) {
        var e = "data-" + c.replace(Ba, "-$1").toLowerCase();
        if (((d = a.getAttribute(e)), "string" == typeof d)) {
          try {
            d =
              "true" === d ||
              ("false" !== d &&
                ("null" === d
                  ? null
                  : +d + "" === d
                  ? +d
                  : Aa.test(d)
                  ? ka.parseJSON(d)
                  : d));
          } catch (a) {}
          ka.data(a, c, d);
        } else d = b;
      }
      return d;
    }
    function h(a) {
      var b;
      for (b in a)
        if (("data" !== b || !ka.isEmptyObject(a[b])) && "toJSON" !== b)
          return !1;
      return !0;
    }
    function i() {
      return !0;
    }
    function j() {
      return !1;
    }
    function k() {
      try {
        return Y.activeElement;
      } catch (a) {}
    }
    function l(a, b) {
      do a = a[b];
      while (a && 1 !== a.nodeType);
      return a;
    }
    function m(a, b, c) {
      if (ka.isFunction(b))
        return ka.grep(a, function (a, d) {
          return !!b.call(a, d, a) !== c;
        });
      if (b.nodeType)
        return ka.grep(a, function (a) {
          return (a === b) !== c;
        });
      if ("string" == typeof b) {
        if (Qa.test(b)) return ka.filter(b, a, c);
        b = ka.filter(b, a);
      }
      return ka.grep(a, function (a) {
        return ka.inArray(a, b) >= 0 !== c;
      });
    }
    function n(a) {
      var b = Ua.split("|"),
        c = a.createDocumentFragment();
      if (c.createElement) for (; b.length; ) c.createElement(b.pop());
      return c;
    }
    function o(a, b) {
      return ka.nodeName(a, "table") &&
        ka.nodeName(1 === b.nodeType ? b : b.firstChild, "tr")
        ? a.getElementsByTagName("tbody")[0] ||
            a.appendChild(a.ownerDocument.createElement("tbody"))
        : a;
    }
    function p(a) {
      return (a.type = (null !== ka.find.attr(a, "type")) + "/" + a.type), a;
    }
    function q(a) {
      var b = eb.exec(a.type);
      return b ? (a.type = b[1]) : a.removeAttribute("type"), a;
    }
    function r(a, b) {
      for (var c, d = 0; null != (c = a[d]); d++)
        ka._data(c, "globalEval", !b || ka._data(b[d], "globalEval"));
    }
    function s(a, b) {
      if (1 === b.nodeType && ka.hasData(a)) {
        var c,
          d,
          e,
          f = ka._data(a),
          g = ka._data(b, f),
          h = f.events;
        if (h) {
          delete g.handle, (g.events = {});
          for (c in h)
            for (d = 0, e = h[c].length; e > d; d++)
              ka.event.add(b, c, h[c][d]);
        }
        g.data && (g.data = ka.extend({}, g.data));
      }
    }
    function t(a, b) {
      var c, d, e;
      if (1 === b.nodeType) {
        if (
          ((c = b.nodeName.toLowerCase()),
          !ka.support.noCloneEvent && b[ka.expando])
        ) {
          e = ka._data(b);
          for (d in e.events) ka.removeEvent(b, d, e.handle);
          b.removeAttribute(ka.expando);
        }
        "script" === c && b.text !== a.text
          ? ((p(b).text = a.text), q(b))
          : "object" === c
          ? (b.parentNode && (b.outerHTML = a.outerHTML),
            ka.support.html5Clone &&
              a.innerHTML &&
              !ka.trim(b.innerHTML) &&
              (b.innerHTML = a.innerHTML))
          : "input" === c && bb.test(a.type)
          ? ((b.defaultChecked = b.checked = a.checked),
            b.value !== a.value && (b.value = a.value))
          : "option" === c
          ? (b.defaultSelected = b.selected = a.defaultSelected)
          : ("input" === c || "textarea" === c) &&
            (b.defaultValue = a.defaultValue);
      }
    }
    function u(a, c) {
      var d,
        e,
        f = 0,
        g =
          typeof a.getElementsByTagName !== W
            ? a.getElementsByTagName(c || "*")
            : typeof a.querySelectorAll !== W
            ? a.querySelectorAll(c || "*")
            : b;
      if (!g)
        for (g = [], d = a.childNodes || a; null != (e = d[f]); f++)
          !c || ka.nodeName(e, c) ? g.push(e) : ka.merge(g, u(e, c));
      return c === b || (c && ka.nodeName(a, c)) ? ka.merge([a], g) : g;
    }
    function v(a) {
      bb.test(a.type) && (a.defaultChecked = a.checked);
    }
    function w(a, b) {
      if (b in a) return b;
      for (
        var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = yb.length;
        e--;

      )
        if (((b = yb[e] + c), b in a)) return b;
      return d;
    }
    function x(a, b) {
      return (
        (a = b || a),
        "none" === ka.css(a, "display") || !ka.contains(a.ownerDocument, a)
      );
    }
    function y(a, b) {
      for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
        (d = a[g]),
          d.style &&
            ((f[g] = ka._data(d, "olddisplay")),
            (c = d.style.display),
            b
              ? (f[g] || "none" !== c || (d.style.display = ""),
                "" === d.style.display &&
                  x(d) &&
                  (f[g] = ka._data(d, "olddisplay", C(d.nodeName))))
              : f[g] ||
                ((e = x(d)),
                ((c && "none" !== c) || !e) &&
                  ka._data(d, "olddisplay", e ? c : ka.css(d, "display"))));
      for (g = 0; h > g; g++)
        (d = a[g]),
          d.style &&
            ((b && "none" !== d.style.display && "" !== d.style.display) ||
              (d.style.display = b ? f[g] || "" : "none"));
      return a;
    }
    function z(a, b, c) {
      var d = rb.exec(b);
      return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function A(a, b, c, d, e) {
      for (
        var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0,
          g = 0;
        4 > f;
        f += 2
      )
        "margin" === c && (g += ka.css(a, c + xb[f], !0, e)),
          d
            ? ("content" === c && (g -= ka.css(a, "padding" + xb[f], !0, e)),
              "margin" !== c &&
                (g -= ka.css(a, "border" + xb[f] + "Width", !0, e)))
            : ((g += ka.css(a, "padding" + xb[f], !0, e)),
              "padding" !== c &&
                (g += ka.css(a, "border" + xb[f] + "Width", !0, e)));
      return g;
    }
    function B(a, b, c) {
      var d = !0,
        e = "width" === b ? a.offsetWidth : a.offsetHeight,
        f = kb(a),
        g =
          ka.support.boxSizing &&
          "border-box" === ka.css(a, "boxSizing", !1, f);
      if (0 >= e || null == e) {
        if (
          ((e = lb(a, b, f)),
          (0 > e || null == e) && (e = a.style[b]),
          sb.test(e))
        )
          return e;
        (d = g && (ka.support.boxSizingReliable || e === a.style[b])),
          (e = parseFloat(e) || 0);
      }
      return e + A(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    function C(a) {
      var b = Y,
        c = ub[a];
      return (
        c ||
          ((c = D(a, b)),
          ("none" !== c && c) ||
            ((jb = (
              jb ||
              ka("<iframe frameborder='0' width='0' height='0'/>").css(
                "cssText",
                "display:block !important"
              )
            ).appendTo(b.documentElement)),
            (b = (jb[0].contentWindow || jb[0].contentDocument).document),
            b.write("<!doctype html><html><body>"),
            b.close(),
            (c = D(a, b)),
            jb.detach()),
          (ub[a] = c)),
        c
      );
    }
    function D(a, b) {
      var c = ka(b.createElement(a)).appendTo(b.body),
        d = ka.css(c[0], "display");
      return c.remove(), d;
    }
    function E(a, b, c, d) {
      var e;
      if (ka.isArray(b))
        ka.each(b, function (b, e) {
          c || Ab.test(a)
            ? d(a, e)
            : E(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
        });
      else if (c || "object" !== ka.type(b)) d(a, b);
      else for (e in b) E(a + "[" + e + "]", b[e], c, d);
    }
    function F(a) {
      return function (b, c) {
        "string" != typeof b && ((c = b), (b = "*"));
        var d,
          e = 0,
          f = b.toLowerCase().match(ma) || [];
        if (ka.isFunction(c))
          for (; (d = f[e++]); )
            "+" === d[0]
              ? ((d = d.slice(1) || "*"), (a[d] = a[d] || []).unshift(c))
              : (a[d] = a[d] || []).push(c);
      };
    }
    function G(a, c, d, e) {
      function f(i) {
        var j;
        return (
          (g[i] = !0),
          ka.each(a[i] || [], function (a, i) {
            var k = i(c, d, e);
            return "string" != typeof k || h || g[k]
              ? h
                ? !(j = k)
                : b
              : (c.dataTypes.unshift(k), f(k), !1);
          }),
          j
        );
      }
      var g = {},
        h = a === Rb;
      return f(c.dataTypes[0]) || (!g["*"] && f("*"));
    }
    function H(a, c) {
      var d,
        e,
        f = ka.ajaxSettings.flatOptions || {};
      for (e in c) c[e] !== b && ((f[e] ? a : d || (d = {}))[e] = c[e]);
      return d && ka.extend(!0, a, d), a;
    }
    function I(a, c, d) {
      for (var e, f, g, h, i = a.contents, j = a.dataTypes; "*" === j[0]; )
        j.shift(),
          f === b && (f = a.mimeType || c.getResponseHeader("Content-Type"));
      if (f)
        for (h in i)
          if (i[h] && i[h].test(f)) {
            j.unshift(h);
            break;
          }
      if (j[0] in d) g = j[0];
      else {
        for (h in d) {
          if (!j[0] || a.converters[h + " " + j[0]]) {
            g = h;
            break;
          }
          e || (e = h);
        }
        g = g || e;
      }
      return g ? (g !== j[0] && j.unshift(g), d[g]) : b;
    }
    function J(a, b, c, d) {
      var e,
        f,
        g,
        h,
        i,
        j = {},
        k = a.dataTypes.slice();
      if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
      for (f = k.shift(); f; )
        if (
          (a.responseFields[f] && (c[a.responseFields[f]] = b),
          !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
          (i = f),
          (f = k.shift()))
        )
          if ("*" === f) f = i;
          else if ("*" !== i && i !== f) {
            if (((g = j[i + " " + f] || j["* " + f]), !g))
              for (e in j)
                if (
                  ((h = e.split(" ")),
                  h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]]))
                ) {
                  g === !0
                    ? (g = j[e])
                    : j[e] !== !0 && ((f = h[0]), k.unshift(h[1]));
                  break;
                }
            if (g !== !0)
              if (g && a.throws) b = g(b);
              else
                try {
                  b = g(b);
                } catch (a) {
                  return {
                    state: "parsererror",
                    error: g ? a : "No conversion from " + i + " to " + f,
                  };
                }
          }
      return { state: "success", data: b };
    }
    function K() {
      try {
        return new a.XMLHttpRequest();
      } catch (a) {}
    }
    function L() {
      try {
        return new a.ActiveXObject("Microsoft.XMLHTTP");
      } catch (a) {}
    }
    function M() {
      return (
        setTimeout(function () {
          Zb = b;
        }),
        (Zb = ka.now())
      );
    }
    function N(a, b, c) {
      for (
        var d, e = (dc[b] || []).concat(dc["*"]), f = 0, g = e.length;
        g > f;
        f++
      )
        if ((d = e[f].call(c, b, a))) return d;
    }
    function O(a, b, c) {
      var d,
        e,
        f = 0,
        g = cc.length,
        h = ka.Deferred().always(function () {
          delete i.elem;
        }),
        i = function () {
          if (e) return !1;
          for (
            var b = Zb || M(),
              c = Math.max(0, j.startTime + j.duration - b),
              d = c / j.duration || 0,
              f = 1 - d,
              g = 0,
              i = j.tweens.length;
            i > g;
            g++
          )
            j.tweens[g].run(f);
          return (
            h.notifyWith(a, [j, f, c]),
            1 > f && i ? c : (h.resolveWith(a, [j]), !1)
          );
        },
        j = h.promise({
          elem: a,
          props: ka.extend({}, b),
          opts: ka.extend(!0, { specialEasing: {} }, c),
          originalProperties: b,
          originalOptions: c,
          startTime: Zb || M(),
          duration: c.duration,
          tweens: [],
          createTween: function (b, c) {
            var d = ka.Tween(
              a,
              j.opts,
              b,
              c,
              j.opts.specialEasing[b] || j.opts.easing
            );
            return j.tweens.push(d), d;
          },
          stop: function (b) {
            var c = 0,
              d = b ? j.tweens.length : 0;
            if (e) return this;
            for (e = !0; d > c; c++) j.tweens[c].run(1);
            return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
          },
        }),
        k = j.props;
      for (P(k, j.opts.specialEasing); g > f; f++)
        if ((d = cc[f].call(j, a, k, j.opts))) return d;
      return (
        ka.map(k, N, j),
        ka.isFunction(j.opts.start) && j.opts.start.call(a, j),
        ka.fx.timer(ka.extend(i, { elem: a, anim: j, queue: j.opts.queue })),
        j
          .progress(j.opts.progress)
          .done(j.opts.done, j.opts.complete)
          .fail(j.opts.fail)
          .always(j.opts.always)
      );
    }
    function P(a, b) {
      var c, d, e, f, g;
      for (c in a)
        if (
          ((d = ka.camelCase(c)),
          (e = b[d]),
          (f = a[c]),
          ka.isArray(f) && ((e = f[1]), (f = a[c] = f[0])),
          c !== d && ((a[d] = f), delete a[c]),
          (g = ka.cssHooks[d]),
          g && "expand" in g)
        ) {
          (f = g.expand(f)), delete a[d];
          for (c in f) c in a || ((a[c] = f[c]), (b[c] = e));
        } else b[d] = e;
    }
    function Q(a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j = this,
        k = {},
        l = a.style,
        m = a.nodeType && x(a),
        n = ka._data(a, "fxshow");
      c.queue ||
        ((h = ka._queueHooks(a, "fx")),
        null == h.unqueued &&
          ((h.unqueued = 0),
          (i = h.empty.fire),
          (h.empty.fire = function () {
            h.unqueued || i();
          })),
        h.unqueued++,
        j.always(function () {
          j.always(function () {
            h.unqueued--, ka.queue(a, "fx").length || h.empty.fire();
          });
        })),
        1 === a.nodeType &&
          ("height" in b || "width" in b) &&
          ((c.overflow = [l.overflow, l.overflowX, l.overflowY]),
          "inline" === ka.css(a, "display") &&
            "none" === ka.css(a, "float") &&
            (ka.support.inlineBlockNeedsLayout && "inline" !== C(a.nodeName)
              ? (l.zoom = 1)
              : (l.display = "inline-block"))),
        c.overflow &&
          ((l.overflow = "hidden"),
          ka.support.shrinkWrapBlocks ||
            j.always(function () {
              (l.overflow = c.overflow[0]),
                (l.overflowX = c.overflow[1]),
                (l.overflowY = c.overflow[2]);
            }));
      for (d in b)
        if (((e = b[d]), _b.exec(e))) {
          if (
            (delete b[d],
            (f = f || "toggle" === e),
            e === (m ? "hide" : "show"))
          )
            continue;
          k[d] = (n && n[d]) || ka.style(a, d);
        }
      if (!ka.isEmptyObject(k)) {
        n ? "hidden" in n && (m = n.hidden) : (n = ka._data(a, "fxshow", {})),
          f && (n.hidden = !m),
          m
            ? ka(a).show()
            : j.done(function () {
                ka(a).hide();
              }),
          j.done(function () {
            var b;
            ka._removeData(a, "fxshow");
            for (b in k) ka.style(a, b, k[b]);
          });
        for (d in k)
          (g = N(m ? n[d] : 0, d, j)),
            d in n ||
              ((n[d] = g.start),
              m &&
                ((g.end = g.start),
                (g.start = "width" === d || "height" === d ? 1 : 0)));
      }
    }
    function R(a, b, c, d, e) {
      return new R.prototype.init(a, b, c, d, e);
    }
    function S(a, b) {
      var c,
        d = { height: a },
        e = 0;
      for (b = b ? 1 : 0; 4 > e; e += 2 - b)
        (c = xb[e]), (d["margin" + c] = d["padding" + c] = a);
      return b && (d.opacity = d.width = a), d;
    }
    function T(a) {
      return ka.isWindow(a)
        ? a
        : 9 === a.nodeType && (a.defaultView || a.parentWindow);
    }
    var U,
      V,
      W = typeof b,
      X = a.location,
      Y = a.document,
      Z = Y.documentElement,
      $ = a.jQuery,
      _ = a.$,
      aa = {},
      ba = [],
      ca = "1.10.2",
      da = ba.concat,
      ea = ba.push,
      fa = ba.slice,
      ga = ba.indexOf,
      ha = aa.toString,
      ia = aa.hasOwnProperty,
      ja = ca.trim,
      ka = function (a, b) {
        return new ka.fn.init(a, b, V);
      },
      la = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      ma = /\S+/g,
      na = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      oa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      pa = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      qa = /^[\],:{}\s]*$/,
      ra = /(?:^|:|,)(?:\s*\[)+/g,
      sa = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
      ta = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
      ua = /^-ms-/,
      va = /-([\da-z])/gi,
      wa = function (a, b) {
        return b.toUpperCase();
      },
      xa = function (a) {
        (Y.addEventListener ||
          "load" === a.type ||
          "complete" === Y.readyState) &&
          (ya(), ka.ready());
      },
      ya = function () {
        Y.addEventListener
          ? (Y.removeEventListener("DOMContentLoaded", xa, !1),
            a.removeEventListener("load", xa, !1))
          : (Y.detachEvent("onreadystatechange", xa),
            a.detachEvent("onload", xa));
      };
    (ka.fn = ka.prototype =
      {
        jquery: ca,
        constructor: ka,
        init: function (a, c, d) {
          var e, f;
          if (!a) return this;
          if ("string" == typeof a) {
            if (
              ((e =
                "<" === a.charAt(0) &&
                ">" === a.charAt(a.length - 1) &&
                a.length >= 3
                  ? [null, a, null]
                  : oa.exec(a)),
              !e || (!e[1] && c))
            )
              return !c || c.jquery
                ? (c || d).find(a)
                : this.constructor(c).find(a);
            if (e[1]) {
              if (
                ((c = c instanceof ka ? c[0] : c),
                ka.merge(
                  this,
                  ka.parseHTML(
                    e[1],
                    c && c.nodeType ? c.ownerDocument || c : Y,
                    !0
                  )
                ),
                pa.test(e[1]) && ka.isPlainObject(c))
              )
                for (e in c)
                  ka.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
              return this;
            }
            if (((f = Y.getElementById(e[2])), f && f.parentNode)) {
              if (f.id !== e[2]) return d.find(a);
              (this.length = 1), (this[0] = f);
            }
            return (this.context = Y), (this.selector = a), this;
          }
          return a.nodeType
            ? ((this.context = this[0] = a), (this.length = 1), this)
            : ka.isFunction(a)
            ? d.ready(a)
            : (a.selector !== b &&
                ((this.selector = a.selector), (this.context = a.context)),
              ka.makeArray(a, this));
        },
        selector: "",
        length: 0,
        toArray: function () {
          return fa.call(this);
        },
        get: function (a) {
          return null == a
            ? this.toArray()
            : 0 > a
            ? this[this.length + a]
            : this[a];
        },
        pushStack: function (a) {
          var b = ka.merge(this.constructor(), a);
          return (b.prevObject = this), (b.context = this.context), b;
        },
        each: function (a, b) {
          return ka.each(this, a, b);
        },
        ready: function (a) {
          return ka.ready.promise().done(a), this;
        },
        slice: function () {
          return this.pushStack(fa.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        eq: function (a) {
          var b = this.length,
            c = +a + (0 > a ? b : 0);
          return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
        },
        map: function (a) {
          return this.pushStack(
            ka.map(this, function (b, c) {
              return a.call(b, c, b);
            })
          );
        },
        end: function () {
          return this.prevObject || this.constructor(null);
        },
        push: ea,
        sort: [].sort,
        splice: [].splice,
      }),
      (ka.fn.init.prototype = ka.fn),
      (ka.extend = ka.fn.extend =
        function () {
          var a,
            c,
            d,
            e,
            f,
            g,
            h = arguments[0] || {},
            i = 1,
            j = arguments.length,
            k = !1;
          for (
            "boolean" == typeof h &&
              ((k = h), (h = arguments[1] || {}), (i = 2)),
              "object" == typeof h || ka.isFunction(h) || (h = {}),
              j === i && ((h = this), --i);
            j > i;
            i++
          )
            if (null != (f = arguments[i]))
              for (e in f)
                (a = h[e]),
                  (d = f[e]),
                  h !== d &&
                    (k && d && (ka.isPlainObject(d) || (c = ka.isArray(d)))
                      ? (c
                          ? ((c = !1), (g = a && ka.isArray(a) ? a : []))
                          : (g = a && ka.isPlainObject(a) ? a : {}),
                        (h[e] = ka.extend(k, g, d)))
                      : d !== b && (h[e] = d));
          return h;
        }),
      ka.extend({
        expando: "jQuery" + (ca + Math.random()).replace(/\D/g, ""),
        noConflict: function (b) {
          return (
            a.$ === ka && (a.$ = _), b && a.jQuery === ka && (a.jQuery = $), ka
          );
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function (a) {
          a ? ka.readyWait++ : ka.ready(!0);
        },
        ready: function (a) {
          if (a === !0 ? !--ka.readyWait : !ka.isReady) {
            if (!Y.body) return setTimeout(ka.ready);
            (ka.isReady = !0),
              (a !== !0 && --ka.readyWait > 0) ||
                (U.resolveWith(Y, [ka]),
                ka.fn.trigger && ka(Y).trigger("ready").off("ready"));
          }
        },
        isFunction: function (a) {
          return "function" === ka.type(a);
        },
        isArray:
          Array.isArray ||
          function (a) {
            return "array" === ka.type(a);
          },
        isWindow: function (a) {
          return null != a && a == a.window;
        },
        isNumeric: function (a) {
          return !isNaN(parseFloat(a)) && isFinite(a);
        },
        type: function (a) {
          return null == a
            ? a + ""
            : "object" == typeof a || "function" == typeof a
            ? aa[ha.call(a)] || "object"
            : typeof a;
        },
        isPlainObject: function (a) {
          var c;
          if (!a || "object" !== ka.type(a) || a.nodeType || ka.isWindow(a))
            return !1;
          try {
            if (
              a.constructor &&
              !ia.call(a, "constructor") &&
              !ia.call(a.constructor.prototype, "isPrototypeOf")
            )
              return !1;
          } catch (a) {
            return !1;
          }
          if (ka.support.ownLast) for (c in a) return ia.call(a, c);
          for (c in a);
          return c === b || ia.call(a, c);
        },
        isEmptyObject: function (a) {
          var b;
          for (b in a) return !1;
          return !0;
        },
        error: function (a) {
          throw Error(a);
        },
        parseHTML: function (a, b, c) {
          if (!a || "string" != typeof a) return null;
          "boolean" == typeof b && ((c = b), (b = !1)), (b = b || Y);
          var d = pa.exec(a),
            e = !c && [];
          return d
            ? [b.createElement(d[1])]
            : ((d = ka.buildFragment([a], b, e)),
              e && ka(e).remove(),
              ka.merge([], d.childNodes));
        },
        parseJSON: function (c) {
          return a.JSON && a.JSON.parse
            ? a.JSON.parse(c)
            : null === c
            ? c
            : "string" == typeof c &&
              ((c = ka.trim(c)),
              c && qa.test(c.replace(sa, "@").replace(ta, "]").replace(ra, "")))
            ? Function("return " + c)()
            : (ka.error("Invalid JSON: " + c), b);
        },
        parseXML: function (c) {
          var d, e;
          if (!c || "string" != typeof c) return null;
          try {
            a.DOMParser
              ? ((e = new DOMParser()), (d = e.parseFromString(c, "text/xml")))
              : ((d = new ActiveXObject("Microsoft.XMLDOM")),
                (d.async = "false"),
                d.loadXML(c));
          } catch (a) {
            d = b;
          }
          return (
            (d &&
              d.documentElement &&
              !d.getElementsByTagName("parsererror").length) ||
              ka.error("Invalid XML: " + c),
            d
          );
        },
        noop: function () {},
        globalEval: function (b) {
          b &&
            ka.trim(b) &&
            (
              a.execScript ||
              function (b) {
                a.eval.call(a, b);
              }
            )(b);
        },
        camelCase: function (a) {
          return a.replace(ua, "ms-").replace(va, wa);
        },
        nodeName: function (a, b) {
          return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function (a, b, d) {
          var e,
            f = 0,
            g = a.length,
            h = c(a);
          if (d) {
            if (h) for (; g > f && ((e = b.apply(a[f], d)), e !== !1); f++);
            else for (f in a) if (((e = b.apply(a[f], d)), e === !1)) break;
          } else if (h)
            for (; g > f && ((e = b.call(a[f], f, a[f])), e !== !1); f++);
          else for (f in a) if (((e = b.call(a[f], f, a[f])), e === !1)) break;
          return a;
        },
        trim:
          ja && !ja.call("\ufeffÂ ")
            ? function (a) {
                return null == a ? "" : ja.call(a);
              }
            : function (a) {
                return null == a ? "" : (a + "").replace(na, "");
              },
        makeArray: function (a, b) {
          var d = b || [];
          return (
            null != a &&
              (c(Object(a))
                ? ka.merge(d, "string" == typeof a ? [a] : a)
                : ea.call(d, a)),
            d
          );
        },
        inArray: function (a, b, c) {
          var d;
          if (b) {
            if (ga) return ga.call(b, a, c);
            for (
              d = b.length, c = c ? (0 > c ? Math.max(0, d + c) : c) : 0;
              d > c;
              c++
            )
              if (c in b && b[c] === a) return c;
          }
          return -1;
        },
        merge: function (a, c) {
          var d = c.length,
            e = a.length,
            f = 0;
          if ("number" == typeof d) for (; d > f; f++) a[e++] = c[f];
          else for (; c[f] !== b; ) a[e++] = c[f++];
          return (a.length = e), a;
        },
        grep: function (a, b, c) {
          var d,
            e = [],
            f = 0,
            g = a.length;
          for (c = !!c; g > f; f++) (d = !!b(a[f], f)), c !== d && e.push(a[f]);
          return e;
        },
        map: function (a, b, d) {
          var e,
            f = 0,
            g = a.length,
            h = c(a),
            i = [];
          if (h)
            for (; g > f; f++)
              (e = b(a[f], f, d)), null != e && (i[i.length] = e);
          else for (f in a) (e = b(a[f], f, d)), null != e && (i[i.length] = e);
          return da.apply([], i);
        },
        guid: 1,
        proxy: function (a, c) {
          var d, e, f;
          return (
            "string" == typeof c && ((f = a[c]), (c = a), (a = f)),
            ka.isFunction(a)
              ? ((d = fa.call(arguments, 2)),
                (e = function () {
                  return a.apply(c || this, d.concat(fa.call(arguments)));
                }),
                (e.guid = a.guid = a.guid || ka.guid++),
                e)
              : b
          );
        },
        access: function (a, c, d, e, f, g, h) {
          var i = 0,
            j = a.length,
            k = null == d;
          if ("object" === ka.type(d)) {
            f = !0;
            for (i in d) ka.access(a, c, i, d[i], !0, g, h);
          } else if (
            e !== b &&
            ((f = !0),
            ka.isFunction(e) || (h = !0),
            k &&
              (h
                ? (c.call(a, e), (c = null))
                : ((k = c),
                  (c = function (a, b, c) {
                    return k.call(ka(a), c);
                  }))),
            c)
          )
            for (; j > i; i++) c(a[i], d, h ? e : e.call(a[i], i, c(a[i], d)));
          return f ? a : k ? c.call(a) : j ? c(a[0], d) : g;
        },
        now: function () {
          return new Date().getTime();
        },
        swap: function (a, b, c, d) {
          var e,
            f,
            g = {};
          for (f in b) (g[f] = a.style[f]), (a.style[f] = b[f]);
          e = c.apply(a, d || []);
          for (f in b) a.style[f] = g[f];
          return e;
        },
      }),
      (ka.ready.promise = function (b) {
        if (!U)
          if (((U = ka.Deferred()), "complete" === Y.readyState))
            setTimeout(ka.ready);
          else if (Y.addEventListener)
            Y.addEventListener("DOMContentLoaded", xa, !1),
              a.addEventListener("load", xa, !1);
          else {
            Y.attachEvent("onreadystatechange", xa),
              a.attachEvent("onload", xa);
            var c = !1;
            try {
              c = null == a.frameElement && Y.documentElement;
            } catch (a) {}
            c &&
              c.doScroll &&
              (function a() {
                if (!ka.isReady) {
                  try {
                    c.doScroll("left");
                  } catch (b) {
                    return setTimeout(a, 50);
                  }
                  ya(), ka.ready();
                }
              })();
          }
        return U.promise(b);
      }),
      ka.each(
        "Boolean Number String Function Array Date RegExp Object Error".split(
          " "
        ),
        function (a, b) {
          aa["[object " + b + "]"] = b.toLowerCase();
        }
      ),
      (V = ka(Y)),
      (function (a, b) {
        function c(a, b, c, d) {
          var e, f, g, h, i, j, k, l, o, p;
          if (
            ((b ? b.ownerDocument || b : O) !== G && F(b),
            (b = b || G),
            (c = c || []),
            !a || "string" != typeof a)
          )
            return c;
          if (1 !== (h = b.nodeType) && 9 !== h) return [];
          if (I && !d) {
            if ((e = ta.exec(a)))
              if ((g = e[1])) {
                if (9 === h) {
                  if (((f = b.getElementById(g)), !f || !f.parentNode))
                    return c;
                  if (f.id === g) return c.push(f), c;
                } else if (
                  b.ownerDocument &&
                  (f = b.ownerDocument.getElementById(g)) &&
                  M(b, f) &&
                  f.id === g
                )
                  return c.push(f), c;
              } else {
                if (e[2]) return aa.apply(c, b.getElementsByTagName(a)), c;
                if (
                  (g = e[3]) &&
                  x.getElementsByClassName &&
                  b.getElementsByClassName
                )
                  return aa.apply(c, b.getElementsByClassName(g)), c;
              }
            if (x.qsa && (!J || !J.test(a))) {
              if (
                ((l = k = N),
                (o = b),
                (p = 9 === h && a),
                1 === h && "object" !== b.nodeName.toLowerCase())
              ) {
                for (
                  j = m(a),
                    (k = b.getAttribute("id"))
                      ? (l = k.replace(wa, "\\$&"))
                      : b.setAttribute("id", l),
                    l = "[id='" + l + "'] ",
                    i = j.length;
                  i--;

                )
                  j[i] = l + n(j[i]);
                (o = (na.test(a) && b.parentNode) || b), (p = j.join(","));
              }
              if (p)
                try {
                  return aa.apply(c, o.querySelectorAll(p)), c;
                } catch (a) {
                } finally {
                  k || b.removeAttribute("id");
                }
            }
          }
          return v(a.replace(ja, "$1"), b, c, d);
        }
        function d() {
          function a(c, d) {
            return (
              b.push((c += " ")) > z.cacheLength && delete a[b.shift()],
              (a[c] = d)
            );
          }
          var b = [];
          return a;
        }
        function e(a) {
          return (a[N] = !0), a;
        }
        function f(a) {
          var b = G.createElement("div");
          try {
            return !!a(b);
          } catch (a) {
            return !1;
          } finally {
            b.parentNode && b.parentNode.removeChild(b), (b = null);
          }
        }
        function g(a, b) {
          for (var c = a.split("|"), d = a.length; d--; )
            z.attrHandle[c[d]] = b;
        }
        function h(a, b) {
          var c = b && a,
            d =
              c &&
              1 === a.nodeType &&
              1 === b.nodeType &&
              (~b.sourceIndex || X) - (~a.sourceIndex || X);
          if (d) return d;
          if (c) for (; (c = c.nextSibling); ) if (c === b) return -1;
          return a ? 1 : -1;
        }
        function i(a) {
          return function (b) {
            var c = b.nodeName.toLowerCase();
            return "input" === c && b.type === a;
          };
        }
        function j(a) {
          return function (b) {
            var c = b.nodeName.toLowerCase();
            return ("input" === c || "button" === c) && b.type === a;
          };
        }
        function k(a) {
          return e(function (b) {
            return (
              (b = +b),
              e(function (c, d) {
                for (var e, f = a([], c.length, b), g = f.length; g--; )
                  c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
              })
            );
          });
        }
        function l() {}
        function m(a, b) {
          var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k = S[a + " "];
          if (k) return b ? 0 : k.slice(0);
          for (h = a, i = [], j = z.preFilter; h; ) {
            (!d || (e = la.exec(h))) &&
              (e && (h = h.slice(e[0].length) || h), i.push((f = []))),
              (d = !1),
              (e = ma.exec(h)) &&
                ((d = e.shift()),
                f.push({ value: d, type: e[0].replace(ja, " ") }),
                (h = h.slice(d.length)));
            for (g in z.filter)
              !(e = ra[g].exec(h)) ||
                (j[g] && !(e = j[g](e))) ||
                ((d = e.shift()),
                f.push({ value: d, type: g, matches: e }),
                (h = h.slice(d.length)));
            if (!d) break;
          }
          return b ? h.length : h ? c.error(a) : S(a, i).slice(0);
        }
        function n(a) {
          for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
          return d;
        }
        function o(a, b, c) {
          var d = b.dir,
            e = c && "parentNode" === d,
            f = Q++;
          return b.first
            ? function (b, c, f) {
                for (; (b = b[d]); )
                  if (1 === b.nodeType || e) return a(b, c, f);
              }
            : function (b, c, g) {
                var h,
                  i,
                  j,
                  k = P + " " + f;
                if (g) {
                  for (; (b = b[d]); )
                    if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
                } else
                  for (; (b = b[d]); )
                    if (1 === b.nodeType || e)
                      if (
                        ((j = b[N] || (b[N] = {})), (i = j[d]) && i[0] === k)
                      ) {
                        if ((h = i[1]) === !0 || h === y) return h === !0;
                      } else if (
                        ((i = j[d] = [k]),
                        (i[1] = a(b, c, g) || y),
                        i[1] === !0)
                      )
                        return !0;
              };
        }
        function p(a) {
          return a.length > 1
            ? function (b, c, d) {
                for (var e = a.length; e--; ) if (!a[e](b, c, d)) return !1;
                return !0;
              }
            : a[0];
        }
        function q(a, b, c, d, e) {
          for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
            (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
          return g;
        }
        function r(a, b, c, d, f, g) {
          return (
            d && !d[N] && (d = r(d)),
            f && !f[N] && (f = r(f, g)),
            e(function (e, g, h, i) {
              var j,
                k,
                l,
                m = [],
                n = [],
                o = g.length,
                p = e || u(b || "*", h.nodeType ? [h] : h, []),
                r = !a || (!e && b) ? p : q(p, m, a, h, i),
                s = c ? (f || (e ? a : o || d) ? [] : g) : r;
              if ((c && c(r, s, h, i), d))
                for (j = q(s, n), d(j, [], h, i), k = j.length; k--; )
                  (l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
              if (e) {
                if (f || a) {
                  if (f) {
                    for (j = [], k = s.length; k--; )
                      (l = s[k]) && j.push((r[k] = l));
                    f(null, (s = []), j, i);
                  }
                  for (k = s.length; k--; )
                    (l = s[k]) &&
                      (j = f ? ca.call(e, l) : m[k]) > -1 &&
                      (e[j] = !(g[j] = l));
                }
              } else (s = q(s === g ? s.splice(o, s.length) : s)), f ? f(null, g, s, i) : aa.apply(g, s);
            })
          );
        }
        function s(a) {
          for (
            var b,
              c,
              d,
              e = a.length,
              f = z.relative[a[0].type],
              g = f || z.relative[" "],
              h = f ? 1 : 0,
              i = o(
                function (a) {
                  return a === b;
                },
                g,
                !0
              ),
              j = o(
                function (a) {
                  return ca.call(b, a) > -1;
                },
                g,
                !0
              ),
              k = [
                function (a, c, d) {
                  return (
                    (!f && (d || c !== D)) ||
                    ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                  );
                },
              ];
            e > h;
            h++
          )
            if ((c = z.relative[a[h].type])) k = [o(p(k), c)];
            else {
              if (((c = z.filter[a[h].type].apply(null, a[h].matches)), c[N])) {
                for (d = ++h; e > d && !z.relative[a[d].type]; d++);
                return r(
                  h > 1 && p(k),
                  h > 1 &&
                    n(
                      a
                        .slice(0, h - 1)
                        .concat({ value: " " === a[h - 2].type ? "*" : "" })
                    ).replace(ja, "$1"),
                  c,
                  d > h && s(a.slice(h, d)),
                  e > d && s((a = a.slice(d))),
                  e > d && n(a)
                );
              }
              k.push(c);
            }
          return p(k);
        }
        function t(a, b) {
          var d = 0,
            f = b.length > 0,
            g = a.length > 0,
            h = function (e, h, i, j, k) {
              var l,
                m,
                n,
                o = [],
                p = 0,
                r = "0",
                s = e && [],
                t = null != k,
                u = D,
                v = e || (g && z.find.TAG("*", (k && h.parentNode) || h)),
                w = (P += null == u ? 1 : Math.random() || 0.1);
              for (
                t && ((D = h !== G && h), (y = d));
                null != (l = v[r]);
                r++
              ) {
                if (g && l) {
                  for (m = 0; (n = a[m++]); )
                    if (n(l, h, i)) {
                      j.push(l);
                      break;
                    }
                  t && ((P = w), (y = ++d));
                }
                f && ((l = !n && l) && p--, e && s.push(l));
              }
              if (((p += r), f && r !== p)) {
                for (m = 0; (n = b[m++]); ) n(s, o, h, i);
                if (e) {
                  if (p > 0) for (; r--; ) s[r] || o[r] || (o[r] = $.call(j));
                  o = q(o);
                }
                aa.apply(j, o),
                  t &&
                    !e &&
                    o.length > 0 &&
                    p + b.length > 1 &&
                    c.uniqueSort(j);
              }
              return t && ((P = w), (D = u)), s;
            };
          return f ? e(h) : h;
        }
        function u(a, b, d) {
          for (var e = 0, f = b.length; f > e; e++) c(a, b[e], d);
          return d;
        }
        function v(a, b, c, d) {
          var e,
            f,
            g,
            h,
            i,
            j = m(a);
          if (!d && 1 === j.length) {
            if (
              ((f = j[0] = j[0].slice(0)),
              f.length > 2 &&
                "ID" === (g = f[0]).type &&
                x.getById &&
                9 === b.nodeType &&
                I &&
                z.relative[f[1].type])
            ) {
              if (
                ((b = (z.find.ID(g.matches[0].replace(xa, ya), b) || [])[0]),
                !b)
              )
                return c;
              a = a.slice(f.shift().value.length);
            }
            for (
              e = ra.needsContext.test(a) ? 0 : f.length;
              e-- && ((g = f[e]), !z.relative[(h = g.type)]);

            )
              if (
                (i = z.find[h]) &&
                (d = i(
                  g.matches[0].replace(xa, ya),
                  (na.test(f[0].type) && b.parentNode) || b
                ))
              ) {
                if ((f.splice(e, 1), (a = d.length && n(f)), !a))
                  return aa.apply(c, d), c;
                break;
              }
          }
          return C(a, j)(d, b, !I, c, na.test(a)), c;
        }
        var w,
          x,
          y,
          z,
          A,
          B,
          C,
          D,
          E,
          F,
          G,
          H,
          I,
          J,
          K,
          L,
          M,
          N = "sizzle" + -new Date(),
          O = a.document,
          P = 0,
          Q = 0,
          R = d(),
          S = d(),
          T = d(),
          U = !1,
          V = function (a, b) {
            return a === b ? ((U = !0), 0) : 0;
          },
          W = typeof b,
          X = 1 << 31,
          Y = {}.hasOwnProperty,
          Z = [],
          $ = Z.pop,
          _ = Z.push,
          aa = Z.push,
          ba = Z.slice,
          ca =
            Z.indexOf ||
            function (a) {
              for (var b = 0, c = this.length; c > b; b++)
                if (this[b] === a) return b;
              return -1;
            },
          da =
            "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
          ea = "[\\x20\\t\\r\\n\\f]",
          fa = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
          ga = fa.replace("w", "w#"),
          ha =
            "\\[" +
            ea +
            "*(" +
            fa +
            ")" +
            ea +
            "*(?:([*^$|!~]?=)" +
            ea +
            "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
            ga +
            ")|)|)" +
            ea +
            "*\\]",
          ia =
            ":(" +
            fa +
            ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" +
            ha.replace(3, 8) +
            ")*)|.*)\\)|)",
          ja = RegExp(
            "^" + ea + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ea + "+$",
            "g"
          ),
          la = RegExp("^" + ea + "*," + ea + "*"),
          ma = RegExp("^" + ea + "*([>+~]|" + ea + ")" + ea + "*"),
          na = RegExp(ea + "*[+~]"),
          oa = RegExp("=" + ea + "*([^\\]'\"]*)" + ea + "*\\]", "g"),
          pa = RegExp(ia),
          qa = RegExp("^" + ga + "$"),
          ra = {
            ID: RegExp("^#(" + fa + ")"),
            CLASS: RegExp("^\\.(" + fa + ")"),
            TAG: RegExp("^(" + fa.replace("w", "w*") + ")"),
            ATTR: RegExp("^" + ha),
            PSEUDO: RegExp("^" + ia),
            CHILD: RegExp(
              "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                ea +
                "*(even|odd|(([+-]|)(\\d*)n|)" +
                ea +
                "*(?:([+-]|)" +
                ea +
                "*(\\d+)|))" +
                ea +
                "*\\)|)",
              "i"
            ),
            bool: RegExp("^(?:" + da + ")$", "i"),
            needsContext: RegExp(
              "^" +
                ea +
                "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                ea +
                "*((?:-\\d)?\\d*)" +
                ea +
                "*\\)|)(?=[^-]|$)",
              "i"
            ),
          },
          sa = /^[^{]+\{\s*\[native \w/,
          ta = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          ua = /^(?:input|select|textarea|button)$/i,
          va = /^h\d$/i,
          wa = /'|\\/g,
          xa = RegExp("\\\\([\\da-f]{1,6}" + ea + "?|(" + ea + ")|.)", "ig"),
          ya = function (a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c
              ? b
              : 0 > d
              ? String.fromCharCode(d + 65536)
              : String.fromCharCode(55296 | (d >> 10), 56320 | (1023 & d));
          };
        try {
          aa.apply((Z = ba.call(O.childNodes)), O.childNodes),
            Z[O.childNodes.length].nodeType;
        } catch (a) {
          aa = {
            apply: Z.length
              ? function (a, b) {
                  _.apply(a, ba.call(b));
                }
              : function (a, b) {
                  for (var c = a.length, d = 0; (a[c++] = b[d++]); );
                  a.length = c - 1;
                },
          };
        }
        (B = c.isXML =
          function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return !!b && "HTML" !== b.nodeName;
          }),
          (x = c.support = {}),
          (F = c.setDocument =
            function (a) {
              var c = a ? a.ownerDocument || a : O,
                d = c.defaultView;
              return c !== G && 9 === c.nodeType && c.documentElement
                ? ((G = c),
                  (H = c.documentElement),
                  (I = !B(c)),
                  d &&
                    d.attachEvent &&
                    d !== d.top &&
                    d.attachEvent("onbeforeunload", function () {
                      F();
                    }),
                  (x.attributes = f(function (a) {
                    return (a.className = "i"), !a.getAttribute("className");
                  })),
                  (x.getElementsByTagName = f(function (a) {
                    return (
                      a.appendChild(c.createComment("")),
                      !a.getElementsByTagName("*").length
                    );
                  })),
                  (x.getElementsByClassName = f(function (a) {
                    return (
                      (a.innerHTML =
                        "<div class='a'></div><div class='a i'></div>"),
                      (a.firstChild.className = "i"),
                      2 === a.getElementsByClassName("i").length
                    );
                  })),
                  (x.getById = f(function (a) {
                    return (
                      (H.appendChild(a).id = N),
                      !c.getElementsByName || !c.getElementsByName(N).length
                    );
                  })),
                  x.getById
                    ? ((z.find.ID = function (a, b) {
                        if (typeof b.getElementById !== W && I) {
                          var c = b.getElementById(a);
                          return c && c.parentNode ? [c] : [];
                        }
                      }),
                      (z.filter.ID = function (a) {
                        var b = a.replace(xa, ya);
                        return function (a) {
                          return a.getAttribute("id") === b;
                        };
                      }))
                    : (delete z.find.ID,
                      (z.filter.ID = function (a) {
                        var b = a.replace(xa, ya);
                        return function (a) {
                          var c =
                            typeof a.getAttributeNode !== W &&
                            a.getAttributeNode("id");
                          return c && c.value === b;
                        };
                      })),
                  (z.find.TAG = x.getElementsByTagName
                    ? function (a, c) {
                        return typeof c.getElementsByTagName !== W
                          ? c.getElementsByTagName(a)
                          : b;
                      }
                    : function (a, b) {
                        var c,
                          d = [],
                          e = 0,
                          f = b.getElementsByTagName(a);
                        if ("*" === a) {
                          for (; (c = f[e++]); ) 1 === c.nodeType && d.push(c);
                          return d;
                        }
                        return f;
                      }),
                  (z.find.CLASS =
                    x.getElementsByClassName &&
                    function (a, c) {
                      return typeof c.getElementsByClassName !== W && I
                        ? c.getElementsByClassName(a)
                        : b;
                    }),
                  (K = []),
                  (J = []),
                  (x.qsa = sa.test(c.querySelectorAll)) &&
                    (f(function (a) {
                      (a.innerHTML =
                        "<select><option selected=''></option></select>"),
                        a.querySelectorAll("[selected]").length ||
                          J.push("\\[" + ea + "*(?:value|" + da + ")"),
                        a.querySelectorAll(":checked").length ||
                          J.push(":checked");
                    }),
                    f(function (a) {
                      var b = c.createElement("input");
                      b.setAttribute("type", "hidden"),
                        a.appendChild(b).setAttribute("t", ""),
                        a.querySelectorAll("[t^='']").length &&
                          J.push("[*^$]=" + ea + "*(?:''|\"\")"),
                        a.querySelectorAll(":enabled").length ||
                          J.push(":enabled", ":disabled"),
                        a.querySelectorAll("*,:x"),
                        J.push(",.*:");
                    })),
                  (x.matchesSelector = sa.test(
                    (L =
                      H.webkitMatchesSelector ||
                      H.mozMatchesSelector ||
                      H.oMatchesSelector ||
                      H.msMatchesSelector)
                  )) &&
                    f(function (a) {
                      (x.disconnectedMatch = L.call(a, "div")),
                        L.call(a, "[s!='']:x"),
                        K.push("!=", ia);
                    }),
                  (J = J.length && RegExp(J.join("|"))),
                  (K = K.length && RegExp(K.join("|"))),
                  (M =
                    sa.test(H.contains) || H.compareDocumentPosition
                      ? function (a, b) {
                          var c = 9 === a.nodeType ? a.documentElement : a,
                            d = b && b.parentNode;
                          return (
                            a === d ||
                            !(
                              !d ||
                              1 !== d.nodeType ||
                              !(c.contains
                                ? c.contains(d)
                                : a.compareDocumentPosition &&
                                  16 & a.compareDocumentPosition(d))
                            )
                          );
                        }
                      : function (a, b) {
                          if (b)
                            for (; (b = b.parentNode); ) if (b === a) return !0;
                          return !1;
                        }),
                  (V = H.compareDocumentPosition
                    ? function (a, b) {
                        if (a === b) return (U = !0), 0;
                        var d =
                          b.compareDocumentPosition &&
                          a.compareDocumentPosition &&
                          a.compareDocumentPosition(b);
                        return d
                          ? 1 & d ||
                            (!x.sortDetached &&
                              b.compareDocumentPosition(a) === d)
                            ? a === c || M(O, a)
                              ? -1
                              : b === c || M(O, b)
                              ? 1
                              : E
                              ? ca.call(E, a) - ca.call(E, b)
                              : 0
                            : 4 & d
                            ? -1
                            : 1
                          : a.compareDocumentPosition
                          ? -1
                          : 1;
                      }
                    : function (a, b) {
                        var d,
                          e = 0,
                          f = a.parentNode,
                          g = b.parentNode,
                          i = [a],
                          j = [b];
                        if (a === b) return (U = !0), 0;
                        if (!f || !g)
                          return a === c
                            ? -1
                            : b === c
                            ? 1
                            : f
                            ? -1
                            : g
                            ? 1
                            : E
                            ? ca.call(E, a) - ca.call(E, b)
                            : 0;
                        if (f === g) return h(a, b);
                        for (d = a; (d = d.parentNode); ) i.unshift(d);
                        for (d = b; (d = d.parentNode); ) j.unshift(d);
                        for (; i[e] === j[e]; ) e++;
                        return e
                          ? h(i[e], j[e])
                          : i[e] === O
                          ? -1
                          : j[e] === O
                          ? 1
                          : 0;
                      }),
                  c)
                : G;
            }),
          (c.matches = function (a, b) {
            return c(a, null, null, b);
          }),
          (c.matchesSelector = function (a, b) {
            if (
              ((a.ownerDocument || a) !== G && F(a),
              (b = b.replace(oa, "='$1']")),
              !(
                !x.matchesSelector ||
                !I ||
                (K && K.test(b)) ||
                (J && J.test(b))
              ))
            )
              try {
                var d = L.call(a, b);
                if (
                  d ||
                  x.disconnectedMatch ||
                  (a.document && 11 !== a.document.nodeType)
                )
                  return d;
              } catch (a) {}
            return c(b, G, null, [a]).length > 0;
          }),
          (c.contains = function (a, b) {
            return (a.ownerDocument || a) !== G && F(a), M(a, b);
          }),
          (c.attr = function (a, c) {
            (a.ownerDocument || a) !== G && F(a);
            var d = z.attrHandle[c.toLowerCase()],
              e = d && Y.call(z.attrHandle, c.toLowerCase()) ? d(a, c, !I) : b;
            return e === b
              ? x.attributes || !I
                ? a.getAttribute(c)
                : (e = a.getAttributeNode(c)) && e.specified
                ? e.value
                : null
              : e;
          }),
          (c.error = function (a) {
            throw Error("Syntax error, unrecognized expression: " + a);
          }),
          (c.uniqueSort = function (a) {
            var b,
              c = [],
              d = 0,
              e = 0;
            if (
              ((U = !x.detectDuplicates),
              (E = !x.sortStable && a.slice(0)),
              a.sort(V),
              U)
            ) {
              for (; (b = a[e++]); ) b === a[e] && (d = c.push(e));
              for (; d--; ) a.splice(c[d], 1);
            }
            return a;
          }),
          (A = c.getText =
            function (a) {
              var b,
                c = "",
                d = 0,
                e = a.nodeType;
              if (e) {
                if (1 === e || 9 === e || 11 === e) {
                  if ("string" == typeof a.textContent) return a.textContent;
                  for (a = a.firstChild; a; a = a.nextSibling) c += A(a);
                } else if (3 === e || 4 === e) return a.nodeValue;
              } else for (; (b = a[d]); d++) c += A(b);
              return c;
            }),
          (z = c.selectors =
            {
              cacheLength: 50,
              createPseudo: e,
              match: ra,
              attrHandle: {},
              find: {},
              relative: {
                ">": { dir: "parentNode", first: !0 },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: !0 },
                "~": { dir: "previousSibling" },
              },
              preFilter: {
                ATTR: function (a) {
                  return (
                    (a[1] = a[1].replace(xa, ya)),
                    (a[3] = (a[4] || a[5] || "").replace(xa, ya)),
                    "~=" === a[2] && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4)
                  );
                },
                CHILD: function (a) {
                  return (
                    (a[1] = a[1].toLowerCase()),
                    "nth" === a[1].slice(0, 3)
                      ? (a[3] || c.error(a[0]),
                        (a[4] = +(a[4]
                          ? a[5] + (a[6] || 1)
                          : 2 * ("even" === a[3] || "odd" === a[3]))),
                        (a[5] = +(a[7] + a[8] || "odd" === a[3])))
                      : a[3] && c.error(a[0]),
                    a
                  );
                },
                PSEUDO: function (a) {
                  var c,
                    d = !a[5] && a[2];
                  return ra.CHILD.test(a[0])
                    ? null
                    : (a[3] && a[4] !== b
                        ? (a[2] = a[4])
                        : d &&
                          pa.test(d) &&
                          (c = m(d, !0)) &&
                          (c = d.indexOf(")", d.length - c) - d.length) &&
                          ((a[0] = a[0].slice(0, c)), (a[2] = d.slice(0, c))),
                      a.slice(0, 3));
                },
              },
              filter: {
                TAG: function (a) {
                  var b = a.replace(xa, ya).toLowerCase();
                  return "*" === a
                    ? function () {
                        return !0;
                      }
                    : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b;
                      };
                },
                CLASS: function (a) {
                  var b = R[a + " "];
                  return (
                    b ||
                    ((b = RegExp("(^|" + ea + ")" + a + "(" + ea + "|$)")) &&
                      R(a, function (a) {
                        return b.test(
                          ("string" == typeof a.className && a.className) ||
                            (typeof a.getAttribute !== W &&
                              a.getAttribute("class")) ||
                            ""
                        );
                      }))
                  );
                },
                ATTR: function (a, b, d) {
                  return function (e) {
                    var f = c.attr(e, a);
                    return null == f
                      ? "!=" === b
                      : !b ||
                          ((f += ""),
                          "=" === b
                            ? f === d
                            : "!=" === b
                            ? f !== d
                            : "^=" === b
                            ? d && 0 === f.indexOf(d)
                            : "*=" === b
                            ? d && f.indexOf(d) > -1
                            : "$=" === b
                            ? d && f.slice(-d.length) === d
                            : "~=" === b
                            ? (" " + f + " ").indexOf(d) > -1
                            : "|=" === b &&
                              (f === d ||
                                f.slice(0, d.length + 1) === d + "-"));
                  };
                },
                CHILD: function (a, b, c, d, e) {
                  var f = "nth" !== a.slice(0, 3),
                    g = "last" !== a.slice(-4),
                    h = "of-type" === b;
                  return 1 === d && 0 === e
                    ? function (a) {
                        return !!a.parentNode;
                      }
                    : function (b, c, i) {
                        var j,
                          k,
                          l,
                          m,
                          n,
                          o,
                          p = f !== g ? "nextSibling" : "previousSibling",
                          q = b.parentNode,
                          r = h && b.nodeName.toLowerCase(),
                          s = !i && !h;
                        if (q) {
                          if (f) {
                            for (; p; ) {
                              for (l = b; (l = l[p]); )
                                if (
                                  h
                                    ? l.nodeName.toLowerCase() === r
                                    : 1 === l.nodeType
                                )
                                  return !1;
                              o = p = "only" === a && !o && "nextSibling";
                            }
                            return !0;
                          }
                          if (
                            ((o = [g ? q.firstChild : q.lastChild]), g && s)
                          ) {
                            for (
                              k = q[N] || (q[N] = {}),
                                j = k[a] || [],
                                n = j[0] === P && j[1],
                                m = j[0] === P && j[2],
                                l = n && q.childNodes[n];
                              (l =
                                (++n && l && l[p]) || (m = n = 0) || o.pop());

                            )
                              if (1 === l.nodeType && ++m && l === b) {
                                k[a] = [P, n, m];
                                break;
                              }
                          } else if (
                            s &&
                            (j = (b[N] || (b[N] = {}))[a]) &&
                            j[0] === P
                          )
                            m = j[1];
                          else
                            for (
                              ;
                              (l =
                                (++n && l && l[p]) || (m = n = 0) || o.pop()) &&
                              ((h
                                ? l.nodeName.toLowerCase() !== r
                                : 1 !== l.nodeType) ||
                                !++m ||
                                (s && ((l[N] || (l[N] = {}))[a] = [P, m]),
                                l !== b));

                            );
                          return (
                            (m -= e), m === d || (0 === m % d && m / d >= 0)
                          );
                        }
                      };
                },
                PSEUDO: function (a, b) {
                  var d,
                    f =
                      z.pseudos[a] ||
                      z.setFilters[a.toLowerCase()] ||
                      c.error("unsupported pseudo: " + a);
                  return f[N]
                    ? f(b)
                    : f.length > 1
                    ? ((d = [a, a, "", b]),
                      z.setFilters.hasOwnProperty(a.toLowerCase())
                        ? e(function (a, c) {
                            for (var d, e = f(a, b), g = e.length; g--; )
                              (d = ca.call(a, e[g])), (a[d] = !(c[d] = e[g]));
                          })
                        : function (a) {
                            return f(a, 0, d);
                          })
                    : f;
                },
              },
              pseudos: {
                not: e(function (a) {
                  var b = [],
                    c = [],
                    d = C(a.replace(ja, "$1"));
                  return d[N]
                    ? e(function (a, b, c, e) {
                        for (var f, g = d(a, null, e, []), h = a.length; h--; )
                          (f = g[h]) && (a[h] = !(b[h] = f));
                      })
                    : function (a, e, f) {
                        return (b[0] = a), d(b, null, f, c), !c.pop();
                      };
                }),
                has: e(function (a) {
                  return function (b) {
                    return c(a, b).length > 0;
                  };
                }),
                contains: e(function (a) {
                  return function (b) {
                    return (
                      (b.textContent || b.innerText || A(b)).indexOf(a) > -1
                    );
                  };
                }),
                lang: e(function (a) {
                  return (
                    qa.test(a || "") || c.error("unsupported lang: " + a),
                    (a = a.replace(xa, ya).toLowerCase()),
                    function (b) {
                      var c;
                      do
                        if (
                          (c = I
                            ? b.lang
                            : b.getAttribute("xml:lang") ||
                              b.getAttribute("lang"))
                        )
                          return (
                            (c = c.toLowerCase()),
                            c === a || 0 === c.indexOf(a + "-")
                          );
                      while ((b = b.parentNode) && 1 === b.nodeType);
                      return !1;
                    }
                  );
                }),
                target: function (b) {
                  var c = a.location && a.location.hash;
                  return c && c.slice(1) === b.id;
                },
                root: function (a) {
                  return a === H;
                },
                focus: function (a) {
                  return (
                    a === G.activeElement &&
                    (!G.hasFocus || G.hasFocus()) &&
                    !!(a.type || a.href || ~a.tabIndex)
                  );
                },
                enabled: function (a) {
                  return a.disabled === !1;
                },
                disabled: function (a) {
                  return a.disabled === !0;
                },
                checked: function (a) {
                  var b = a.nodeName.toLowerCase();
                  return (
                    ("input" === b && !!a.checked) ||
                    ("option" === b && !!a.selected)
                  );
                },
                selected: function (a) {
                  return (
                    a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0
                  );
                },
                empty: function (a) {
                  for (a = a.firstChild; a; a = a.nextSibling)
                    if (
                      a.nodeName > "@" ||
                      3 === a.nodeType ||
                      4 === a.nodeType
                    )
                      return !1;
                  return !0;
                },
                parent: function (a) {
                  return !z.pseudos.empty(a);
                },
                header: function (a) {
                  return va.test(a.nodeName);
                },
                input: function (a) {
                  return ua.test(a.nodeName);
                },
                button: function (a) {
                  var b = a.nodeName.toLowerCase();
                  return (
                    ("input" === b && "button" === a.type) || "button" === b
                  );
                },
                text: function (a) {
                  var b;
                  return (
                    "input" === a.nodeName.toLowerCase() &&
                    "text" === a.type &&
                    (null == (b = a.getAttribute("type")) ||
                      b.toLowerCase() === a.type)
                  );
                },
                first: k(function () {
                  return [0];
                }),
                last: k(function (a, b) {
                  return [b - 1];
                }),
                eq: k(function (a, b, c) {
                  return [0 > c ? c + b : c];
                }),
                even: k(function (a, b) {
                  for (var c = 0; b > c; c += 2) a.push(c);
                  return a;
                }),
                odd: k(function (a, b) {
                  for (var c = 1; b > c; c += 2) a.push(c);
                  return a;
                }),
                lt: k(function (a, b, c) {
                  for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                  return a;
                }),
                gt: k(function (a, b, c) {
                  for (var d = 0 > c ? c + b : c; b > ++d; ) a.push(d);
                  return a;
                }),
              },
            }),
          (z.pseudos.nth = z.pseudos.eq);
        for (w in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0,
        })
          z.pseudos[w] = i(w);
        for (w in { submit: !0, reset: !0 }) z.pseudos[w] = j(w);
        (l.prototype = z.filters = z.pseudos),
          (z.setFilters = new l()),
          (C = c.compile =
            function (a, b) {
              var c,
                d = [],
                e = [],
                f = T[a + " "];
              if (!f) {
                for (b || (b = m(a)), c = b.length; c--; )
                  (f = s(b[c])), f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d));
              }
              return f;
            }),
          (x.sortStable = N.split("").sort(V).join("") === N),
          (x.detectDuplicates = U),
          F(),
          (x.sortDetached = f(function (a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"));
          })),
          f(function (a) {
            return (
              (a.innerHTML = "<a href='#'></a>"),
              "#" === a.firstChild.getAttribute("href")
            );
          }) ||
            g("type|href|height|width", function (a, c, d) {
              return d
                ? b
                : a.getAttribute(c, "type" === c.toLowerCase() ? 1 : 2);
            }),
          (x.attributes &&
            f(function (a) {
              return (
                (a.innerHTML = "<input/>"),
                a.firstChild.setAttribute("value", ""),
                "" === a.firstChild.getAttribute("value")
              );
            })) ||
            g("value", function (a, c, d) {
              return d || "input" !== a.nodeName.toLowerCase()
                ? b
                : a.defaultValue;
            }),
          f(function (a) {
            return null == a.getAttribute("disabled");
          }) ||
            g(da, function (a, c, d) {
              var e;
              return d
                ? b
                : (e = a.getAttributeNode(c)) && e.specified
                ? e.value
                : a[c] === !0
                ? c.toLowerCase()
                : null;
            }),
          (ka.find = c),
          (ka.expr = c.selectors),
          (ka.expr[":"] = ka.expr.pseudos),
          (ka.unique = c.uniqueSort),
          (ka.text = c.getText),
          (ka.isXMLDoc = c.isXML),
          (ka.contains = c.contains);
      })(a);
    var za = {};
    (ka.Callbacks = function (a) {
      a = "string" == typeof a ? za[a] || d(a) : ka.extend({}, a);
      var c,
        e,
        f,
        g,
        h,
        i,
        j = [],
        k = !a.once && [],
        l = function (b) {
          for (
            e = a.memory && b, f = !0, h = i || 0, i = 0, g = j.length, c = !0;
            j && g > h;
            h++
          )
            if (j[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
              e = !1;
              break;
            }
          (c = !1),
            j && (k ? k.length && l(k.shift()) : e ? (j = []) : m.disable());
        },
        m = {
          add: function () {
            if (j) {
              var b = j.length;
              !(function b(c) {
                ka.each(c, function (c, d) {
                  var e = ka.type(d);
                  "function" === e
                    ? (a.unique && m.has(d)) || j.push(d)
                    : d && d.length && "string" !== e && b(d);
                });
              })(arguments),
                c ? (g = j.length) : e && ((i = b), l(e));
            }
            return this;
          },
          remove: function () {
            return (
              j &&
                ka.each(arguments, function (a, b) {
                  for (var d; (d = ka.inArray(b, j, d)) > -1; )
                    j.splice(d, 1), c && (g >= d && g--, h >= d && h--);
                }),
              this
            );
          },
          has: function (a) {
            return a ? ka.inArray(a, j) > -1 : !(!j || !j.length);
          },
          empty: function () {
            return (j = []), (g = 0), this;
          },
          disable: function () {
            return (j = k = e = b), this;
          },
          disabled: function () {
            return !j;
          },
          lock: function () {
            return (k = b), e || m.disable(), this;
          },
          locked: function () {
            return !k;
          },
          fireWith: function (a, b) {
            return (
              !j ||
                (f && !k) ||
                ((b = b || []),
                (b = [a, b.slice ? b.slice() : b]),
                c ? k.push(b) : l(b)),
              this
            );
          },
          fire: function () {
            return m.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!f;
          },
        };
      return m;
    }),
      ka.extend({
        Deferred: function (a) {
          var b = [
              ["resolve", "done", ka.Callbacks("once memory"), "resolved"],
              ["reject", "fail", ka.Callbacks("once memory"), "rejected"],
              ["notify", "progress", ka.Callbacks("memory")],
            ],
            c = "pending",
            d = {
              state: function () {
                return c;
              },
              always: function () {
                return e.done(arguments).fail(arguments), this;
              },
              then: function () {
                var a = arguments;
                return ka
                  .Deferred(function (c) {
                    ka.each(b, function (b, f) {
                      var g = f[0],
                        h = ka.isFunction(a[b]) && a[b];
                      e[f[1]](function () {
                        var a = h && h.apply(this, arguments);
                        a && ka.isFunction(a.promise)
                          ? a
                              .promise()
                              .done(c.resolve)
                              .fail(c.reject)
                              .progress(c.notify)
                          : c[g + "With"](
                              this === d ? c.promise() : this,
                              h ? [a] : arguments
                            );
                      });
                    }),
                      (a = null);
                  })
                  .promise();
              },
              promise: function (a) {
                return null != a ? ka.extend(a, d) : d;
              },
            },
            e = {};
          return (
            (d.pipe = d.then),
            ka.each(b, function (a, f) {
              var g = f[2],
                h = f[3];
              (d[f[1]] = g.add),
                h &&
                  g.add(
                    function () {
                      c = h;
                    },
                    b[1 ^ a][2].disable,
                    b[2][2].lock
                  ),
                (e[f[0]] = function () {
                  return (
                    e[f[0] + "With"](this === e ? d : this, arguments), this
                  );
                }),
                (e[f[0] + "With"] = g.fireWith);
            }),
            d.promise(e),
            a && a.call(e, e),
            e
          );
        },
        when: function (a) {
          var b,
            c,
            d,
            e = 0,
            f = fa.call(arguments),
            g = f.length,
            h = 1 !== g || (a && ka.isFunction(a.promise)) ? g : 0,
            i = 1 === h ? a : ka.Deferred(),
            j = function (a, c, d) {
              return function (e) {
                (c[a] = this),
                  (d[a] = arguments.length > 1 ? fa.call(arguments) : e),
                  d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d);
              };
            };
          if (g > 1)
            for (b = Array(g), c = Array(g), d = Array(g); g > e; e++)
              f[e] && ka.isFunction(f[e].promise)
                ? f[e]
                    .promise()
                    .done(j(e, d, f))
                    .fail(i.reject)
                    .progress(j(e, c, b))
                : --h;
          return h || i.resolveWith(d, f), i.promise();
        },
      }),
      (ka.support = (function (b) {
        var c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l = Y.createElement("div");
        if (
          (l.setAttribute("className", "t"),
          (l.innerHTML =
            "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
          (c = l.getElementsByTagName("*") || []),
          (d = l.getElementsByTagName("a")[0]),
          !d || !d.style || !c.length)
        )
          return b;
        (f = Y.createElement("select")),
          (h = f.appendChild(Y.createElement("option"))),
          (e = l.getElementsByTagName("input")[0]),
          (d.style.cssText = "top:1px;float:left;opacity:.5"),
          (b.getSetAttribute = "t" !== l.className),
          (b.leadingWhitespace = 3 === l.firstChild.nodeType),
          (b.tbody = !l.getElementsByTagName("tbody").length),
          (b.htmlSerialize = !!l.getElementsByTagName("link").length),
          (b.style = /top/.test(d.getAttribute("style"))),
          (b.hrefNormalized = "/a" === d.getAttribute("href")),
          (b.opacity = /^0.5/.test(d.style.opacity)),
          (b.cssFloat = !!d.style.cssFloat),
          (b.checkOn = !!e.value),
          (b.optSelected = h.selected),
          (b.enctype = !!Y.createElement("form").enctype),
          (b.html5Clone =
            "<:nav></:nav>" !== Y.createElement("nav").cloneNode(!0).outerHTML),
          (b.inlineBlockNeedsLayout = !1),
          (b.shrinkWrapBlocks = !1),
          (b.pixelPosition = !1),
          (b.deleteExpando = !0),
          (b.noCloneEvent = !0),
          (b.reliableMarginRight = !0),
          (b.boxSizingReliable = !0),
          (e.checked = !0),
          (b.noCloneChecked = e.cloneNode(!0).checked),
          (f.disabled = !0),
          (b.optDisabled = !h.disabled);
        try {
          delete l.test;
        } catch (a) {
          b.deleteExpando = !1;
        }
        (e = Y.createElement("input")),
          e.setAttribute("value", ""),
          (b.input = "" === e.getAttribute("value")),
          (e.value = "t"),
          e.setAttribute("type", "radio"),
          (b.radioValue = "t" === e.value),
          e.setAttribute("checked", "t"),
          e.setAttribute("name", "t"),
          (g = Y.createDocumentFragment()),
          g.appendChild(e),
          (b.appendChecked = e.checked),
          (b.checkClone = g.cloneNode(!0).cloneNode(!0).lastChild.checked),
          l.attachEvent &&
            (l.attachEvent("onclick", function () {
              b.noCloneEvent = !1;
            }),
            l.cloneNode(!0).click());
        for (k in { submit: !0, change: !0, focusin: !0 })
          l.setAttribute((i = "on" + k), "t"),
            (b[k + "Bubbles"] = i in a || l.attributes[i].expando === !1);
        (l.style.backgroundClip = "content-box"),
          (l.cloneNode(!0).style.backgroundClip = ""),
          (b.clearCloneStyle = "content-box" === l.style.backgroundClip);
        for (k in ka(b)) break;
        return (
          (b.ownLast = "0" !== k),
          ka(function () {
            var c,
              d,
              e,
              f =
                "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
              g = Y.getElementsByTagName("body")[0];
            g &&
              ((c = Y.createElement("div")),
              (c.style.cssText =
                "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px"),
              g.appendChild(c).appendChild(l),
              (l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
              (e = l.getElementsByTagName("td")),
              (e[0].style.cssText = "padding:0;margin:0;border:0;display:none"),
              (j = 0 === e[0].offsetHeight),
              (e[0].style.display = ""),
              (e[1].style.display = "none"),
              (b.reliableHiddenOffsets = j && 0 === e[0].offsetHeight),
              (l.innerHTML = ""),
              (l.style.cssText =
                "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;"),
              ka.swap(g, null != g.style.zoom ? { zoom: 1 } : {}, function () {
                b.boxSizing = 4 === l.offsetWidth;
              }),
              a.getComputedStyle &&
                ((b.pixelPosition =
                  "1%" !== (a.getComputedStyle(l, null) || {}).top),
                (b.boxSizingReliable =
                  "4px" ===
                  (a.getComputedStyle(l, null) || { width: "4px" }).width),
                (d = l.appendChild(Y.createElement("div"))),
                (d.style.cssText = l.style.cssText = f),
                (d.style.marginRight = d.style.width = "0"),
                (l.style.width = "1px"),
                (b.reliableMarginRight = !parseFloat(
                  (a.getComputedStyle(d, null) || {}).marginRight
                ))),
              typeof l.style.zoom !== W &&
                ((l.innerHTML = ""),
                (l.style.cssText =
                  f + "width:1px;padding:1px;display:inline;zoom:1"),
                (b.inlineBlockNeedsLayout = 3 === l.offsetWidth),
                (l.style.display = "block"),
                (l.innerHTML = "<div></div>"),
                (l.firstChild.style.width = "5px"),
                (b.shrinkWrapBlocks = 3 !== l.offsetWidth),
                b.inlineBlockNeedsLayout && (g.style.zoom = 1)),
              g.removeChild(c),
              (c = l = e = d = null));
          }),
          (c = f = g = h = d = e = null),
          b
        );
      })({}));
    var Aa = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
      Ba = /([A-Z])/g;
    ka.extend({
      cache: {},
      noData: {
        applet: !0,
        embed: !0,
        object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      },
      hasData: function (a) {
        return (
          (a = a.nodeType ? ka.cache[a[ka.expando]] : a[ka.expando]),
          !!a && !h(a)
        );
      },
      data: function (a, b, c) {
        return e(a, b, c);
      },
      removeData: function (a, b) {
        return f(a, b);
      },
      _data: function (a, b, c) {
        return e(a, b, c, !0);
      },
      _removeData: function (a, b) {
        return f(a, b, !0);
      },
      acceptData: function (a) {
        if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType) return !1;
        var b = a.nodeName && ka.noData[a.nodeName.toLowerCase()];
        return !b || (b !== !0 && a.getAttribute("classid") === b);
      },
    }),
      ka.fn.extend({
        data: function (a, c) {
          var d,
            e,
            f = null,
            h = 0,
            i = this[0];
          if (a === b) {
            if (
              this.length &&
              ((f = ka.data(i)),
              1 === i.nodeType && !ka._data(i, "parsedAttrs"))
            ) {
              for (d = i.attributes; d.length > h; h++)
                (e = d[h].name),
                  0 === e.indexOf("data-") &&
                    ((e = ka.camelCase(e.slice(5))), g(i, e, f[e]));
              ka._data(i, "parsedAttrs", !0);
            }
            return f;
          }
          return "object" == typeof a
            ? this.each(function () {
                ka.data(this, a);
              })
            : arguments.length > 1
            ? this.each(function () {
                ka.data(this, a, c);
              })
            : i
            ? g(i, a, ka.data(i, a))
            : null;
        },
        removeData: function (a) {
          return this.each(function () {
            ka.removeData(this, a);
          });
        },
      }),
      ka.extend({
        queue: function (a, c, d) {
          var e;
          return a
            ? ((c = (c || "fx") + "queue"),
              (e = ka._data(a, c)),
              d &&
                (!e || ka.isArray(d)
                  ? (e = ka._data(a, c, ka.makeArray(d)))
                  : e.push(d)),
              e || [])
            : b;
        },
        dequeue: function (a, b) {
          b = b || "fx";
          var c = ka.queue(a, b),
            d = c.length,
            e = c.shift(),
            f = ka._queueHooks(a, b),
            g = function () {
              ka.dequeue(a, b);
            };
          "inprogress" === e && ((e = c.shift()), d--),
            e &&
              ("fx" === b && c.unshift("inprogress"),
              delete f.stop,
              e.call(a, g, f)),
            !d && f && f.empty.fire();
        },
        _queueHooks: function (a, b) {
          var c = b + "queueHooks";
          return (
            ka._data(a, c) ||
            ka._data(a, c, {
              empty: ka.Callbacks("once memory").add(function () {
                ka._removeData(a, b + "queue"), ka._removeData(a, c);
              }),
            })
          );
        },
      }),
      ka.fn.extend({
        queue: function (a, c) {
          var d = 2;
          return (
            "string" != typeof a && ((c = a), (a = "fx"), d--),
            d > arguments.length
              ? ka.queue(this[0], a)
              : c === b
              ? this
              : this.each(function () {
                  var b = ka.queue(this, a, c);
                  ka._queueHooks(this, a),
                    "fx" === a && "inprogress" !== b[0] && ka.dequeue(this, a);
                })
          );
        },
        dequeue: function (a) {
          return this.each(function () {
            ka.dequeue(this, a);
          });
        },
        delay: function (a, b) {
          return (
            (a = ka.fx ? ka.fx.speeds[a] || a : a),
            (b = b || "fx"),
            this.queue(b, function (b, c) {
              var d = setTimeout(b, a);
              c.stop = function () {
                clearTimeout(d);
              };
            })
          );
        },
        clearQueue: function (a) {
          return this.queue(a || "fx", []);
        },
        promise: function (a, c) {
          var d,
            e = 1,
            f = ka.Deferred(),
            g = this,
            h = this.length,
            i = function () {
              --e || f.resolveWith(g, [g]);
            };
          for ("string" != typeof a && ((c = a), (a = b)), a = a || "fx"; h--; )
            (d = ka._data(g[h], a + "queueHooks")),
              d && d.empty && (e++, d.empty.add(i));
          return i(), f.promise(c);
        },
      });
    var Ca,
      Da,
      Ea = /[\t\r\n\f]/g,
      Fa = /\r/g,
      Ga = /^(?:input|select|textarea|button|object)$/i,
      Ha = /^(?:a|area)$/i,
      Ia = /^(?:checked|selected)$/i,
      Ja = ka.support.getSetAttribute,
      Ka = ka.support.input;
    ka.fn.extend({
      attr: function (a, b) {
        return ka.access(this, ka.attr, a, b, arguments.length > 1);
      },
      removeAttr: function (a) {
        return this.each(function () {
          ka.removeAttr(this, a);
        });
      },
      prop: function (a, b) {
        return ka.access(this, ka.prop, a, b, arguments.length > 1);
      },
      removeProp: function (a) {
        return (
          (a = ka.propFix[a] || a),
          this.each(function () {
            try {
              (this[a] = b), delete this[a];
            } catch (a) {}
          })
        );
      },
      addClass: function (a) {
        var b,
          c,
          d,
          e,
          f,
          g = 0,
          h = this.length,
          i = "string" == typeof a && a;
        if (ka.isFunction(a))
          return this.each(function (b) {
            ka(this).addClass(a.call(this, b, this.className));
          });
        if (i)
          for (b = (a || "").match(ma) || []; h > g; g++)
            if (
              ((c = this[g]),
              (d =
                1 === c.nodeType &&
                (c.className
                  ? (" " + c.className + " ").replace(Ea, " ")
                  : " ")))
            ) {
              for (f = 0; (e = b[f++]); )
                0 > d.indexOf(" " + e + " ") && (d += e + " ");
              c.className = ka.trim(d);
            }
        return this;
      },
      removeClass: function (a) {
        var b,
          c,
          d,
          e,
          f,
          g = 0,
          h = this.length,
          i = 0 === arguments.length || ("string" == typeof a && a);
        if (ka.isFunction(a))
          return this.each(function (b) {
            ka(this).removeClass(a.call(this, b, this.className));
          });
        if (i)
          for (b = (a || "").match(ma) || []; h > g; g++)
            if (
              ((c = this[g]),
              (d =
                1 === c.nodeType &&
                (c.className
                  ? (" " + c.className + " ").replace(Ea, " ")
                  : "")))
            ) {
              for (f = 0; (e = b[f++]); )
                for (; d.indexOf(" " + e + " ") >= 0; )
                  d = d.replace(" " + e + " ", " ");
              c.className = a ? ka.trim(d) : "";
            }
        return this;
      },
      toggleClass: function (a, b) {
        var c = typeof a;
        return "boolean" == typeof b && "string" === c
          ? b
            ? this.addClass(a)
            : this.removeClass(a)
          : ka.isFunction(a)
          ? this.each(function (c) {
              ka(this).toggleClass(a.call(this, c, this.className, b), b);
            })
          : this.each(function () {
              if ("string" === c)
                for (
                  var b, d = 0, e = ka(this), f = a.match(ma) || [];
                  (b = f[d++]);

                )
                  e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
              else
                (c === W || "boolean" === c) &&
                  (this.className &&
                    ka._data(this, "__className__", this.className),
                  (this.className =
                    this.className || a === !1
                      ? ""
                      : ka._data(this, "__className__") || ""));
            });
      },
      hasClass: function (a) {
        for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
          if (
            1 === this[c].nodeType &&
            (" " + this[c].className + " ").replace(Ea, " ").indexOf(b) >= 0
          )
            return !0;
        return !1;
      },
      val: function (a) {
        var c,
          d,
          e,
          f = this[0];
        return arguments.length
          ? ((e = ka.isFunction(a)),
            this.each(function (c) {
              var f;
              1 === this.nodeType &&
                ((f = e ? a.call(this, c, ka(this).val()) : a),
                null == f
                  ? (f = "")
                  : "number" == typeof f
                  ? (f += "")
                  : ka.isArray(f) &&
                    (f = ka.map(f, function (a) {
                      return null == a ? "" : a + "";
                    })),
                (d =
                  ka.valHooks[this.type] ||
                  ka.valHooks[this.nodeName.toLowerCase()]),
                (d && "set" in d && d.set(this, f, "value") !== b) ||
                  (this.value = f));
            }))
          : f
          ? ((d = ka.valHooks[f.type] || ka.valHooks[f.nodeName.toLowerCase()]),
            d && "get" in d && (c = d.get(f, "value")) !== b
              ? c
              : ((c = f.value),
                "string" == typeof c ? c.replace(Fa, "") : null == c ? "" : c))
          : void 0;
      },
    }),
      ka.extend({
        valHooks: {
          option: {
            get: function (a) {
              var b = ka.find.attr(a, "value");
              return null != b ? b : a.text;
            },
          },
          select: {
            get: function (a) {
              for (
                var b,
                  c,
                  d = a.options,
                  e = a.selectedIndex,
                  f = "select-one" === a.type || 0 > e,
                  g = f ? null : [],
                  h = f ? e + 1 : d.length,
                  i = 0 > e ? h : f ? e : 0;
                h > i;
                i++
              )
                if (
                  ((c = d[i]),
                  !(
                    (!c.selected && i !== e) ||
                    (ka.support.optDisabled
                      ? c.disabled
                      : null !== c.getAttribute("disabled")) ||
                    (c.parentNode.disabled &&
                      ka.nodeName(c.parentNode, "optgroup"))
                  ))
                ) {
                  if (((b = ka(c).val()), f)) return b;
                  g.push(b);
                }
              return g;
            },
            set: function (a, b) {
              for (
                var c, d, e = a.options, f = ka.makeArray(b), g = e.length;
                g--;

              )
                (d = e[g]),
                  (d.selected = ka.inArray(ka(d).val(), f) >= 0) && (c = !0);
              return c || (a.selectedIndex = -1), f;
            },
          },
        },
        attr: function (a, c, d) {
          var e,
            f,
            g = a.nodeType;
          if (a && 3 !== g && 8 !== g && 2 !== g)
            return typeof a.getAttribute === W
              ? ka.prop(a, c, d)
              : ((1 === g && ka.isXMLDoc(a)) ||
                  ((c = c.toLowerCase()),
                  (e =
                    ka.attrHooks[c] || (ka.expr.match.bool.test(c) ? Da : Ca))),
                d === b
                  ? e && "get" in e && null !== (f = e.get(a, c))
                    ? f
                    : ((f = ka.find.attr(a, c)), null == f ? b : f)
                  : null !== d
                  ? e && "set" in e && (f = e.set(a, d, c)) !== b
                    ? f
                    : (a.setAttribute(c, d + ""), d)
                  : (ka.removeAttr(a, c), b));
        },
        removeAttr: function (a, b) {
          var c,
            d,
            e = 0,
            f = b && b.match(ma);
          if (f && 1 === a.nodeType)
            for (; (c = f[e++]); )
              (d = ka.propFix[c] || c),
                ka.expr.match.bool.test(c)
                  ? (Ka && Ja) || !Ia.test(c)
                    ? (a[d] = !1)
                    : (a[ka.camelCase("default-" + c)] = a[d] = !1)
                  : ka.attr(a, c, ""),
                a.removeAttribute(Ja ? c : d);
        },
        attrHooks: {
          type: {
            set: function (a, b) {
              if (
                !ka.support.radioValue &&
                "radio" === b &&
                ka.nodeName(a, "input")
              ) {
                var c = a.value;
                return a.setAttribute("type", b), c && (a.value = c), b;
              }
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
        prop: function (a, c, d) {
          var e,
            f,
            g,
            h = a.nodeType;
          if (a && 3 !== h && 8 !== h && 2 !== h)
            return (
              (g = 1 !== h || !ka.isXMLDoc(a)),
              g && ((c = ka.propFix[c] || c), (f = ka.propHooks[c])),
              d !== b
                ? f && "set" in f && (e = f.set(a, d, c)) !== b
                  ? e
                  : (a[c] = d)
                : f && "get" in f && null !== (e = f.get(a, c))
                ? e
                : a[c]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (a) {
              var b = ka.find.attr(a, "tabindex");
              return b
                ? parseInt(b, 10)
                : Ga.test(a.nodeName) || (Ha.test(a.nodeName) && a.href)
                ? 0
                : -1;
            },
          },
        },
      }),
      (Da = {
        set: function (a, b, c) {
          return (
            b === !1
              ? ka.removeAttr(a, c)
              : (Ka && Ja) || !Ia.test(c)
              ? a.setAttribute((!Ja && ka.propFix[c]) || c, c)
              : (a[ka.camelCase("default-" + c)] = a[c] = !0),
            c
          );
        },
      }),
      ka.each(ka.expr.match.bool.source.match(/\w+/g), function (a, c) {
        var d = ka.expr.attrHandle[c] || ka.find.attr;
        ka.expr.attrHandle[c] =
          (Ka && Ja) || !Ia.test(c)
            ? function (a, c, e) {
                var f = ka.expr.attrHandle[c],
                  g = e
                    ? b
                    : (ka.expr.attrHandle[c] = b) != d(a, c, e)
                    ? c.toLowerCase()
                    : null;
                return (ka.expr.attrHandle[c] = f), g;
              }
            : function (a, c, d) {
                return d
                  ? b
                  : a[ka.camelCase("default-" + c)]
                  ? c.toLowerCase()
                  : null;
              };
      }),
      (Ka && Ja) ||
        (ka.attrHooks.value = {
          set: function (a, c, d) {
            return ka.nodeName(a, "input")
              ? ((a.defaultValue = c), b)
              : Ca && Ca.set(a, c, d);
          },
        }),
      Ja ||
        ((Ca = {
          set: function (a, c, d) {
            var e = a.getAttributeNode(d);
            return (
              e || a.setAttributeNode((e = a.ownerDocument.createAttribute(d))),
              (e.value = c += ""),
              "value" === d || c === a.getAttribute(d) ? c : b
            );
          },
        }),
        (ka.expr.attrHandle.id =
          ka.expr.attrHandle.name =
          ka.expr.attrHandle.coords =
            function (a, c, d) {
              var e;
              return d
                ? b
                : (e = a.getAttributeNode(c)) && "" !== e.value
                ? e.value
                : null;
            }),
        (ka.valHooks.button = {
          get: function (a, c) {
            var d = a.getAttributeNode(c);
            return d && d.specified ? d.value : b;
          },
          set: Ca.set,
        }),
        (ka.attrHooks.contenteditable = {
          set: function (a, b, c) {
            Ca.set(a, "" !== b && b, c);
          },
        }),
        ka.each(["width", "height"], function (a, c) {
          ka.attrHooks[c] = {
            set: function (a, d) {
              return "" === d ? (a.setAttribute(c, "auto"), d) : b;
            },
          };
        })),
      ka.support.hrefNormalized ||
        ka.each(["href", "src"], function (a, b) {
          ka.propHooks[b] = {
            get: function (a) {
              return a.getAttribute(b, 4);
            },
          };
        }),
      ka.support.style ||
        (ka.attrHooks.style = {
          get: function (a) {
            return a.style.cssText || b;
          },
          set: function (a, b) {
            return (a.style.cssText = b + "");
          },
        }),
      ka.support.optSelected ||
        (ka.propHooks.selected = {
          get: function (a) {
            var b = a.parentNode;
            return (
              b &&
                (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex),
              null
            );
          },
        }),
      ka.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          ka.propFix[this.toLowerCase()] = this;
        }
      ),
      ka.support.enctype || (ka.propFix.enctype = "encoding"),
      ka.each(["radio", "checkbox"], function () {
        (ka.valHooks[this] = {
          set: function (a, c) {
            return ka.isArray(c)
              ? (a.checked = ka.inArray(ka(a).val(), c) >= 0)
              : b;
          },
        }),
          ka.support.checkOn ||
            (ka.valHooks[this].get = function (a) {
              return null === a.getAttribute("value") ? "on" : a.value;
            });
      });
    var La = /^(?:input|select|textarea)$/i,
      Ma = /^key/,
      Na = /^(?:mouse|contextmenu)|click/,
      Oa = /^(?:focusinfocus|focusoutblur)$/,
      Pa = /^([^.]*)(?:\.(.+)|)$/;
    (ka.event = {
      global: {},
      add: function (a, c, d, e, f) {
        var g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r = ka._data(a);
        if (r) {
          for (
            d.handler && ((j = d), (d = j.handler), (f = j.selector)),
              d.guid || (d.guid = ka.guid++),
              (h = r.events) || (h = r.events = {}),
              (l = r.handle) ||
                ((l = r.handle =
                  function (a) {
                    return typeof ka === W ||
                      (a && ka.event.triggered === a.type)
                      ? b
                      : ka.event.dispatch.apply(l.elem, arguments);
                  }),
                (l.elem = a)),
              c = (c || "").match(ma) || [""],
              i = c.length;
            i--;

          )
            (g = Pa.exec(c[i]) || []),
              (o = q = g[1]),
              (p = (g[2] || "").split(".").sort()),
              o &&
                ((k = ka.event.special[o] || {}),
                (o = (f ? k.delegateType : k.bindType) || o),
                (k = ka.event.special[o] || {}),
                (m = ka.extend(
                  {
                    type: o,
                    origType: q,
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: f,
                    needsContext: f && ka.expr.match.needsContext.test(f),
                    namespace: p.join("."),
                  },
                  j
                )),
                (n = h[o]) ||
                  ((n = h[o] = []),
                  (n.delegateCount = 0),
                  (k.setup && k.setup.call(a, e, p, l) !== !1) ||
                    (a.addEventListener
                      ? a.addEventListener(o, l, !1)
                      : a.attachEvent && a.attachEvent("on" + o, l))),
                k.add &&
                  (k.add.call(a, m),
                  m.handler.guid || (m.handler.guid = d.guid)),
                f ? n.splice(n.delegateCount++, 0, m) : n.push(m),
                (ka.event.global[o] = !0));
          a = null;
        }
      },
      remove: function (a, b, c, d, e) {
        var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q = ka.hasData(a) && ka._data(a);
        if (q && (k = q.events)) {
          for (b = (b || "").match(ma) || [""], j = b.length; j--; )
            if (
              ((h = Pa.exec(b[j]) || []),
              (n = p = h[1]),
              (o = (h[2] || "").split(".").sort()),
              n)
            ) {
              for (
                l = ka.event.special[n] || {},
                  n = (d ? l.delegateType : l.bindType) || n,
                  m = k[n] || [],
                  h =
                    h[2] &&
                    RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  i = f = m.length;
                f--;

              )
                (g = m[f]),
                  (!e && p !== g.origType) ||
                    (c && c.guid !== g.guid) ||
                    (h && !h.test(g.namespace)) ||
                    (d && d !== g.selector && ("**" !== d || !g.selector)) ||
                    (m.splice(f, 1),
                    g.selector && m.delegateCount--,
                    l.remove && l.remove.call(a, g));
              i &&
                !m.length &&
                ((l.teardown && l.teardown.call(a, o, q.handle) !== !1) ||
                  ka.removeEvent(a, n, q.handle),
                delete k[n]);
            } else for (n in k) ka.event.remove(a, n + b[j], c, d, !0);
          ka.isEmptyObject(k) && (delete q.handle, ka._removeData(a, "events"));
        }
      },
      trigger: function (c, d, e, f) {
        var g,
          h,
          i,
          j,
          k,
          l,
          m,
          n = [e || Y],
          o = ia.call(c, "type") ? c.type : c,
          p = ia.call(c, "namespace") ? c.namespace.split(".") : [];
        if (
          ((i = l = e = e || Y),
          3 !== e.nodeType &&
            8 !== e.nodeType &&
            !Oa.test(o + ka.event.triggered) &&
            (o.indexOf(".") >= 0 &&
              ((p = o.split(".")), (o = p.shift()), p.sort()),
            (h = 0 > o.indexOf(":") && "on" + o),
            (c = c[ka.expando]
              ? c
              : new ka.Event(o, "object" == typeof c && c)),
            (c.isTrigger = f ? 2 : 3),
            (c.namespace = p.join(".")),
            (c.namespace_re = c.namespace
              ? RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (c.result = b),
            c.target || (c.target = e),
            (d = null == d ? [c] : ka.makeArray(d, [c])),
            (k = ka.event.special[o] || {}),
            f || !k.trigger || k.trigger.apply(e, d) !== !1))
        ) {
          if (!f && !k.noBubble && !ka.isWindow(e)) {
            for (
              j = k.delegateType || o, Oa.test(j + o) || (i = i.parentNode);
              i;
              i = i.parentNode
            )
              n.push(i), (l = i);
            l === (e.ownerDocument || Y) &&
              n.push(l.defaultView || l.parentWindow || a);
          }
          for (m = 0; (i = n[m++]) && !c.isPropagationStopped(); )
            (c.type = m > 1 ? j : k.bindType || o),
              (g =
                (ka._data(i, "events") || {})[c.type] && ka._data(i, "handle")),
              g && g.apply(i, d),
              (g = h && i[h]),
              g &&
                ka.acceptData(i) &&
                g.apply &&
                g.apply(i, d) === !1 &&
                c.preventDefault();
          if (
            ((c.type = o),
            !f &&
              !c.isDefaultPrevented() &&
              (!k._default || k._default.apply(n.pop(), d) === !1) &&
              ka.acceptData(e) &&
              h &&
              e[o] &&
              !ka.isWindow(e))
          ) {
            (l = e[h]), l && (e[h] = null), (ka.event.triggered = o);
            try {
              e[o]();
            } catch (a) {}
            (ka.event.triggered = b), l && (e[h] = l);
          }
          return c.result;
        }
      },
      dispatch: function (a) {
        a = ka.event.fix(a);
        var c,
          d,
          e,
          f,
          g,
          h = [],
          i = fa.call(arguments),
          j = (ka._data(this, "events") || {})[a.type] || [],
          k = ka.event.special[a.type] || {};
        if (
          ((i[0] = a),
          (a.delegateTarget = this),
          !k.preDispatch || k.preDispatch.call(this, a) !== !1)
        ) {
          for (
            h = ka.event.handlers.call(this, a, j), c = 0;
            (f = h[c++]) && !a.isPropagationStopped();

          )
            for (
              a.currentTarget = f.elem, g = 0;
              (e = f.handlers[g++]) && !a.isImmediatePropagationStopped();

            )
              (!a.namespace_re || a.namespace_re.test(e.namespace)) &&
                ((a.handleObj = e),
                (a.data = e.data),
                (d = (
                  (ka.event.special[e.origType] || {}).handle || e.handler
                ).apply(f.elem, i)),
                d !== b &&
                  (a.result = d) === !1 &&
                  (a.preventDefault(), a.stopPropagation()));
          return k.postDispatch && k.postDispatch.call(this, a), a.result;
        }
      },
      handlers: function (a, c) {
        var d,
          e,
          f,
          g,
          h = [],
          i = c.delegateCount,
          j = a.target;
        if (i && j.nodeType && (!a.button || "click" !== a.type))
          for (; j != this; j = j.parentNode || this)
            if (1 === j.nodeType && (j.disabled !== !0 || "click" !== a.type)) {
              for (f = [], g = 0; i > g; g++)
                (e = c[g]),
                  (d = e.selector + " "),
                  f[d] === b &&
                    (f[d] = e.needsContext
                      ? ka(d, this).index(j) >= 0
                      : ka.find(d, this, null, [j]).length),
                  f[d] && f.push(e);
              f.length && h.push({ elem: j, handlers: f });
            }
        return c.length > i && h.push({ elem: this, handlers: c.slice(i) }), h;
      },
      fix: function (a) {
        if (a[ka.expando]) return a;
        var b,
          c,
          d,
          e = a.type,
          f = a,
          g = this.fixHooks[e];
        for (
          g ||
            (this.fixHooks[e] = g =
              Na.test(e) ? this.mouseHooks : Ma.test(e) ? this.keyHooks : {}),
            d = g.props ? this.props.concat(g.props) : this.props,
            a = new ka.Event(f),
            b = d.length;
          b--;

        )
          (c = d[b]), (a[c] = f[c]);
        return (
          a.target || (a.target = f.srcElement || Y),
          3 === a.target.nodeType && (a.target = a.target.parentNode),
          (a.metaKey = !!a.metaKey),
          g.filter ? g.filter(a, f) : a
        );
      },
      props:
        "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
          " "
        ),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function (a, b) {
          return (
            null == a.which &&
              (a.which = null != b.charCode ? b.charCode : b.keyCode),
            a
          );
        },
      },
      mouseHooks: {
        props:
          "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
            " "
          ),
        filter: function (a, c) {
          var d,
            e,
            f,
            g = c.button,
            h = c.fromElement;
          return (
            null == a.pageX &&
              null != c.clientX &&
              ((e = a.target.ownerDocument || Y),
              (f = e.documentElement),
              (d = e.body),
              (a.pageX =
                c.clientX +
                ((f && f.scrollLeft) || (d && d.scrollLeft) || 0) -
                ((f && f.clientLeft) || (d && d.clientLeft) || 0)),
              (a.pageY =
                c.clientY +
                ((f && f.scrollTop) || (d && d.scrollTop) || 0) -
                ((f && f.clientTop) || (d && d.clientTop) || 0))),
            !a.relatedTarget &&
              h &&
              (a.relatedTarget = h === a.target ? c.toElement : h),
            a.which ||
              g === b ||
              (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0),
            a
          );
        },
      },
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function () {
            if (this !== k() && this.focus)
              try {
                return this.focus(), !1;
              } catch (a) {}
          },
          delegateType: "focusin",
        },
        blur: {
          trigger: function () {
            return this === k() && this.blur ? (this.blur(), !1) : b;
          },
          delegateType: "focusout",
        },
        click: {
          trigger: function () {
            return ka.nodeName(this, "input") &&
              "checkbox" === this.type &&
              this.click
              ? (this.click(), !1)
              : b;
          },
          _default: function (a) {
            return ka.nodeName(a.target, "a");
          },
        },
        beforeunload: {
          postDispatch: function (a) {
            a.result !== b && (a.originalEvent.returnValue = a.result);
          },
        },
      },
      simulate: function (a, b, c, d) {
        var e = ka.extend(new ka.Event(), c, {
          type: a,
          isSimulated: !0,
          originalEvent: {},
        });
        d ? ka.event.trigger(e, null, b) : ka.event.dispatch.call(b, e),
          e.isDefaultPrevented() && c.preventDefault();
      },
    }),
      (ka.removeEvent = Y.removeEventListener
        ? function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1);
          }
        : function (a, b, c) {
            var d = "on" + b;
            a.detachEvent &&
              (typeof a[d] === W && (a[d] = null), a.detachEvent(d, c));
          }),
      (ka.Event = function (a, c) {
        return this instanceof ka.Event
          ? (a && a.type
              ? ((this.originalEvent = a),
                (this.type = a.type),
                (this.isDefaultPrevented =
                  a.defaultPrevented ||
                  a.returnValue === !1 ||
                  (a.getPreventDefault && a.getPreventDefault())
                    ? i
                    : j))
              : (this.type = a),
            c && ka.extend(this, c),
            (this.timeStamp = (a && a.timeStamp) || ka.now()),
            (this[ka.expando] = !0),
            b)
          : new ka.Event(a, c);
      }),
      (ka.Event.prototype = {
        isDefaultPrevented: j,
        isPropagationStopped: j,
        isImmediatePropagationStopped: j,
        preventDefault: function () {
          var a = this.originalEvent;
          (this.isDefaultPrevented = i),
            a && (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
        },
        stopPropagation: function () {
          var a = this.originalEvent;
          (this.isPropagationStopped = i),
            a &&
              (a.stopPropagation && a.stopPropagation(), (a.cancelBubble = !0));
        },
        stopImmediatePropagation: function () {
          (this.isImmediatePropagationStopped = i), this.stopPropagation();
        },
      }),
      ka.each(
        { mouseenter: "mouseover", mouseleave: "mouseout" },
        function (a, b) {
          ka.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
              var c,
                d = this,
                e = a.relatedTarget,
                f = a.handleObj;
              return (
                (!e || (e !== d && !ka.contains(d, e))) &&
                  ((a.type = f.origType),
                  (c = f.handler.apply(this, arguments)),
                  (a.type = b)),
                c
              );
            },
          };
        }
      ),
      ka.support.submitBubbles ||
        (ka.event.special.submit = {
          setup: function () {
            return (
              !ka.nodeName(this, "form") &&
              (ka.event.add(
                this,
                "click._submit keypress._submit",
                function (a) {
                  var c = a.target,
                    d =
                      ka.nodeName(c, "input") || ka.nodeName(c, "button")
                        ? c.form
                        : b;
                  d &&
                    !ka._data(d, "submitBubbles") &&
                    (ka.event.add(d, "submit._submit", function (a) {
                      a._submit_bubble = !0;
                    }),
                    ka._data(d, "submitBubbles", !0));
                }
              ),
              b)
            );
          },
          postDispatch: function (a) {
            a._submit_bubble &&
              (delete a._submit_bubble,
              this.parentNode &&
                !a.isTrigger &&
                ka.event.simulate("submit", this.parentNode, a, !0));
          },
          teardown: function () {
            return (
              !ka.nodeName(this, "form") &&
              (ka.event.remove(this, "._submit"), b)
            );
          },
        }),
      ka.support.changeBubbles ||
        (ka.event.special.change = {
          setup: function () {
            return La.test(this.nodeName)
              ? (("checkbox" === this.type || "radio" === this.type) &&
                  (ka.event.add(this, "propertychange._change", function (a) {
                    "checked" === a.originalEvent.propertyName &&
                      (this._just_changed = !0);
                  }),
                  ka.event.add(this, "click._change", function (a) {
                    this._just_changed &&
                      !a.isTrigger &&
                      (this._just_changed = !1),
                      ka.event.simulate("change", this, a, !0);
                  })),
                !1)
              : (ka.event.add(this, "beforeactivate._change", function (a) {
                  var b = a.target;
                  La.test(b.nodeName) &&
                    !ka._data(b, "changeBubbles") &&
                    (ka.event.add(b, "change._change", function (a) {
                      !this.parentNode ||
                        a.isSimulated ||
                        a.isTrigger ||
                        ka.event.simulate("change", this.parentNode, a, !0);
                    }),
                    ka._data(b, "changeBubbles", !0));
                }),
                b);
          },
          handle: function (a) {
            var c = a.target;
            return this !== c ||
              a.isSimulated ||
              a.isTrigger ||
              ("radio" !== c.type && "checkbox" !== c.type)
              ? a.handleObj.handler.apply(this, arguments)
              : b;
          },
          teardown: function () {
            return ka.event.remove(this, "._change"), !La.test(this.nodeName);
          },
        }),
      ka.support.focusinBubbles ||
        ka.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
          var c = 0,
            d = function (a) {
              ka.event.simulate(b, a.target, ka.event.fix(a), !0);
            };
          ka.event.special[b] = {
            setup: function () {
              0 === c++ && Y.addEventListener(a, d, !0);
            },
            teardown: function () {
              0 === --c && Y.removeEventListener(a, d, !0);
            },
          };
        }),
      ka.fn.extend({
        on: function (a, c, d, e, f) {
          var g, h;
          if ("object" == typeof a) {
            "string" != typeof c && ((d = d || c), (c = b));
            for (g in a) this.on(g, c, d, a[g], f);
            return this;
          }
          if (
            (null == d && null == e
              ? ((e = c), (d = c = b))
              : null == e &&
                ("string" == typeof c
                  ? ((e = d), (d = b))
                  : ((e = d), (d = c), (c = b))),
            e === !1)
          )
            e = j;
          else if (!e) return this;
          return (
            1 === f &&
              ((h = e),
              (e = function (a) {
                return ka().off(a), h.apply(this, arguments);
              }),
              (e.guid = h.guid || (h.guid = ka.guid++))),
            this.each(function () {
              ka.event.add(this, a, e, d, c);
            })
          );
        },
        one: function (a, b, c, d) {
          return this.on(a, b, c, d, 1);
        },
        off: function (a, c, d) {
          var e, f;
          if (a && a.preventDefault && a.handleObj)
            return (
              (e = a.handleObj),
              ka(a.delegateTarget).off(
                e.namespace ? e.origType + "." + e.namespace : e.origType,
                e.selector,
                e.handler
              ),
              this
            );
          if ("object" == typeof a) {
            for (f in a) this.off(f, c, a[f]);
            return this;
          }
          return (
            (c === !1 || "function" == typeof c) && ((d = c), (c = b)),
            d === !1 && (d = j),
            this.each(function () {
              ka.event.remove(this, a, d, c);
            })
          );
        },
        trigger: function (a, b) {
          return this.each(function () {
            ka.event.trigger(a, b, this);
          });
        },
        triggerHandler: function (a, c) {
          var d = this[0];
          return d ? ka.event.trigger(a, c, d, !0) : b;
        },
      });
    var Qa = /^.[^:#\[\.,]*$/,
      Ra = /^(?:parents|prev(?:Until|All))/,
      Sa = ka.expr.match.needsContext,
      Ta = { children: !0, contents: !0, next: !0, prev: !0 };
    ka.fn.extend({
      find: function (a) {
        var b,
          c = [],
          d = this,
          e = d.length;
        if ("string" != typeof a)
          return this.pushStack(
            ka(a).filter(function () {
              for (b = 0; e > b; b++) if (ka.contains(d[b], this)) return !0;
            })
          );
        for (b = 0; e > b; b++) ka.find(a, d[b], c);
        return (
          (c = this.pushStack(e > 1 ? ka.unique(c) : c)),
          (c.selector = this.selector ? this.selector + " " + a : a),
          c
        );
      },
      has: function (a) {
        var b,
          c = ka(a, this),
          d = c.length;
        return this.filter(function () {
          for (b = 0; d > b; b++) if (ka.contains(this, c[b])) return !0;
        });
      },
      not: function (a) {
        return this.pushStack(m(this, a || [], !0));
      },
      filter: function (a) {
        return this.pushStack(m(this, a || [], !1));
      },
      is: function (a) {
        return !!m(
          this,
          "string" == typeof a && Sa.test(a) ? ka(a) : a || [],
          !1
        ).length;
      },
      closest: function (a, b) {
        for (
          var c,
            d = 0,
            e = this.length,
            f = [],
            g =
              Sa.test(a) || "string" != typeof a ? ka(a, b || this.context) : 0;
          e > d;
          d++
        )
          for (c = this[d]; c && c !== b; c = c.parentNode)
            if (
              11 > c.nodeType &&
              (g
                ? g.index(c) > -1
                : 1 === c.nodeType && ka.find.matchesSelector(c, a))
            ) {
              c = f.push(c);
              break;
            }
        return this.pushStack(f.length > 1 ? ka.unique(f) : f);
      },
      index: function (a) {
        return a
          ? "string" == typeof a
            ? ka.inArray(this[0], ka(a))
            : ka.inArray(a.jquery ? a[0] : a, this)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (a, b) {
        var c =
            "string" == typeof a
              ? ka(a, b)
              : ka.makeArray(a && a.nodeType ? [a] : a),
          d = ka.merge(this.get(), c);
        return this.pushStack(ka.unique(d));
      },
      addBack: function (a) {
        return this.add(
          null == a ? this.prevObject : this.prevObject.filter(a)
        );
      },
    }),
      ka.each(
        {
          parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null;
          },
          parents: function (a) {
            return ka.dir(a, "parentNode");
          },
          parentsUntil: function (a, b, c) {
            return ka.dir(a, "parentNode", c);
          },
          next: function (a) {
            return l(a, "nextSibling");
          },
          prev: function (a) {
            return l(a, "previousSibling");
          },
          nextAll: function (a) {
            return ka.dir(a, "nextSibling");
          },
          prevAll: function (a) {
            return ka.dir(a, "previousSibling");
          },
          nextUntil: function (a, b, c) {
            return ka.dir(a, "nextSibling", c);
          },
          prevUntil: function (a, b, c) {
            return ka.dir(a, "previousSibling", c);
          },
          siblings: function (a) {
            return ka.sibling((a.parentNode || {}).firstChild, a);
          },
          children: function (a) {
            return ka.sibling(a.firstChild);
          },
          contents: function (a) {
            return ka.nodeName(a, "iframe")
              ? a.contentDocument || a.contentWindow.document
              : ka.merge([], a.childNodes);
          },
        },
        function (a, b) {
          ka.fn[a] = function (c, d) {
            var e = ka.map(this, b, c);
            return (
              "Until" !== a.slice(-5) && (d = c),
              d && "string" == typeof d && (e = ka.filter(d, e)),
              this.length > 1 &&
                (Ta[a] || (e = ka.unique(e)), Ra.test(a) && (e = e.reverse())),
              this.pushStack(e)
            );
          };
        }
      ),
      ka.extend({
        filter: function (a, b, c) {
          var d = b[0];
          return (
            c && (a = ":not(" + a + ")"),
            1 === b.length && 1 === d.nodeType
              ? ka.find.matchesSelector(d, a)
                ? [d]
                : []
              : ka.find.matches(
                  a,
                  ka.grep(b, function (a) {
                    return 1 === a.nodeType;
                  })
                )
          );
        },
        dir: function (a, c, d) {
          for (
            var e = [], f = a[c];
            f &&
            9 !== f.nodeType &&
            (d === b || 1 !== f.nodeType || !ka(f).is(d));

          )
            1 === f.nodeType && e.push(f), (f = f[c]);
          return e;
        },
        sibling: function (a, b) {
          for (var c = []; a; a = a.nextSibling)
            1 === a.nodeType && a !== b && c.push(a);
          return c;
        },
      });
    var Ua =
        "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
      Va = / jQuery\d+="(?:null|\d+)"/g,
      Wa = RegExp("<(?:" + Ua + ")[\\s/>]", "i"),
      Xa = /^\s+/,
      Ya =
        /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      Za = /<([\w:]+)/,
      $a = /<tbody/i,
      _a = /<|&#?\w+;/,
      ab = /<(?:script|style|link)/i,
      bb = /^(?:checkbox|radio)$/i,
      cb = /checked\s*(?:[^=]|=\s*.checked.)/i,
      db = /^$|\/(?:java|ecma)script/i,
      eb = /^true\/(.*)/,
      fb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      gb = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: ka.support.htmlSerialize
          ? [0, "", ""]
          : [1, "X<div>", "</div>"],
      },
      hb = n(Y),
      ib = hb.appendChild(Y.createElement("div"));
    (gb.optgroup = gb.option),
      (gb.tbody = gb.tfoot = gb.colgroup = gb.caption = gb.thead),
      (gb.th = gb.td),
      ka.fn.extend({
        text: function (a) {
          return ka.access(
            this,
            function (a) {
              return a === b
                ? ka.text(this)
                : this.empty().append(
                    ((this[0] && this[0].ownerDocument) || Y).createTextNode(a)
                  );
            },
            null,
            a,
            arguments.length
          );
        },
        append: function () {
          return this.domManip(arguments, function (a) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var b = o(this, a);
              b.appendChild(a);
            }
          });
        },
        prepend: function () {
          return this.domManip(arguments, function (a) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var b = o(this, a);
              b.insertBefore(a, b.firstChild);
            }
          });
        },
        before: function () {
          return this.domManip(arguments, function (a) {
            this.parentNode && this.parentNode.insertBefore(a, this);
          });
        },
        after: function () {
          return this.domManip(arguments, function (a) {
            this.parentNode &&
              this.parentNode.insertBefore(a, this.nextSibling);
          });
        },
        remove: function (a, b) {
          for (
            var c, d = a ? ka.filter(a, this) : this, e = 0;
            null != (c = d[e]);
            e++
          )
            b || 1 !== c.nodeType || ka.cleanData(u(c)),
              c.parentNode &&
                (b && ka.contains(c.ownerDocument, c) && r(u(c, "script")),
                c.parentNode.removeChild(c));
          return this;
        },
        empty: function () {
          for (var a, b = 0; null != (a = this[b]); b++) {
            for (1 === a.nodeType && ka.cleanData(u(a, !1)); a.firstChild; )
              a.removeChild(a.firstChild);
            a.options && ka.nodeName(a, "select") && (a.options.length = 0);
          }
          return this;
        },
        clone: function (a, b) {
          return (
            (a = null != a && a),
            (b = null == b ? a : b),
            this.map(function () {
              return ka.clone(this, a, b);
            })
          );
        },
        html: function (a) {
          return ka.access(
            this,
            function (a) {
              var c = this[0] || {},
                d = 0,
                e = this.length;
              if (a === b)
                return 1 === c.nodeType ? c.innerHTML.replace(Va, "") : b;
              if (
                !(
                  "string" != typeof a ||
                  ab.test(a) ||
                  (!ka.support.htmlSerialize && Wa.test(a)) ||
                  (!ka.support.leadingWhitespace && Xa.test(a)) ||
                  gb[(Za.exec(a) || ["", ""])[1].toLowerCase()]
                )
              ) {
                a = a.replace(Ya, "<$1></$2>");
                try {
                  for (; e > d; d++)
                    (c = this[d] || {}),
                      1 === c.nodeType &&
                        (ka.cleanData(u(c, !1)), (c.innerHTML = a));
                  c = 0;
                } catch (a) {}
              }
              c && this.empty().append(a);
            },
            null,
            a,
            arguments.length
          );
        },
        replaceWith: function () {
          var a = ka.map(this, function (a) {
              return [a.nextSibling, a.parentNode];
            }),
            b = 0;
          return (
            this.domManip(
              arguments,
              function (c) {
                var d = a[b++],
                  e = a[b++];
                e &&
                  (d && d.parentNode !== e && (d = this.nextSibling),
                  ka(this).remove(),
                  e.insertBefore(c, d));
              },
              !0
            ),
            b ? this : this.remove()
          );
        },
        detach: function (a) {
          return this.remove(a, !0);
        },
        domManip: function (a, b, c) {
          a = da.apply([], a);
          var d,
            e,
            f,
            g,
            h,
            i,
            j = 0,
            k = this.length,
            l = this,
            m = k - 1,
            n = a[0],
            o = ka.isFunction(n);
          if (
            o ||
            (!(1 >= k || "string" != typeof n || ka.support.checkClone) &&
              cb.test(n))
          )
            return this.each(function (d) {
              var e = l.eq(d);
              o && (a[0] = n.call(this, d, e.html())), e.domManip(a, b, c);
            });
          if (
            k &&
            ((i = ka.buildFragment(a, this[0].ownerDocument, !1, !c && this)),
            (d = i.firstChild),
            1 === i.childNodes.length && (i = d),
            d)
          ) {
            for (g = ka.map(u(i, "script"), p), f = g.length; k > j; j++)
              (e = i),
                j !== m &&
                  ((e = ka.clone(e, !0, !0)), f && ka.merge(g, u(e, "script"))),
                b.call(this[j], e, j);
            if (f)
              for (
                h = g[g.length - 1].ownerDocument, ka.map(g, q), j = 0;
                f > j;
                j++
              )
                (e = g[j]),
                  db.test(e.type || "") &&
                    !ka._data(e, "globalEval") &&
                    ka.contains(h, e) &&
                    (e.src
                      ? ka._evalUrl(e.src)
                      : ka.globalEval(
                          (
                            e.text ||
                            e.textContent ||
                            e.innerHTML ||
                            ""
                          ).replace(fb, "")
                        ));
            i = d = null;
          }
          return this;
        },
      }),
      ka.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (a, b) {
          ka.fn[a] = function (a) {
            for (var c, d = 0, e = [], f = ka(a), g = f.length - 1; g >= d; d++)
              (c = d === g ? this : this.clone(!0)),
                ka(f[d])[b](c),
                ea.apply(e, c.get());
            return this.pushStack(e);
          };
        }
      ),
      ka.extend({
        clone: function (a, b, c) {
          var d,
            e,
            f,
            g,
            h,
            i = ka.contains(a.ownerDocument, a);
          if (
            (ka.support.html5Clone ||
            ka.isXMLDoc(a) ||
            !Wa.test("<" + a.nodeName + ">")
              ? (f = a.cloneNode(!0))
              : ((ib.innerHTML = a.outerHTML),
                ib.removeChild((f = ib.firstChild))),
            !(
              (ka.support.noCloneEvent && ka.support.noCloneChecked) ||
              (1 !== a.nodeType && 11 !== a.nodeType) ||
              ka.isXMLDoc(a)
            ))
          )
            for (d = u(f), h = u(a), g = 0; null != (e = h[g]); ++g)
              d[g] && t(e, d[g]);
          if (b)
            if (c)
              for (h = h || u(a), d = d || u(f), g = 0; null != (e = h[g]); g++)
                s(e, d[g]);
            else s(a, f);
          return (
            (d = u(f, "script")),
            d.length > 0 && r(d, !i && u(a, "script")),
            (d = h = e = null),
            f
          );
        },
        buildFragment: function (a, b, c, d) {
          for (
            var e, f, g, h, i, j, k, l = a.length, m = n(b), o = [], p = 0;
            l > p;
            p++
          )
            if (((f = a[p]), f || 0 === f))
              if ("object" === ka.type(f)) ka.merge(o, f.nodeType ? [f] : f);
              else if (_a.test(f)) {
                for (
                  h = h || m.appendChild(b.createElement("div")),
                    i = (Za.exec(f) || ["", ""])[1].toLowerCase(),
                    k = gb[i] || gb._default,
                    h.innerHTML = k[1] + f.replace(Ya, "<$1></$2>") + k[2],
                    e = k[0];
                  e--;

                )
                  h = h.lastChild;
                if (
                  (!ka.support.leadingWhitespace &&
                    Xa.test(f) &&
                    o.push(b.createTextNode(Xa.exec(f)[0])),
                  !ka.support.tbody)
                )
                  for (
                    f =
                      "table" !== i || $a.test(f)
                        ? "<table>" !== k[1] || $a.test(f)
                          ? 0
                          : h
                        : h.firstChild,
                      e = f && f.childNodes.length;
                    e--;

                  )
                    ka.nodeName((j = f.childNodes[e]), "tbody") &&
                      !j.childNodes.length &&
                      f.removeChild(j);
                for (
                  ka.merge(o, h.childNodes), h.textContent = "";
                  h.firstChild;

                )
                  h.removeChild(h.firstChild);
                h = m.lastChild;
              } else o.push(b.createTextNode(f));
          for (
            h && m.removeChild(h),
              ka.support.appendChecked || ka.grep(u(o, "input"), v),
              p = 0;
            (f = o[p++]);

          )
            if (
              (!d || -1 === ka.inArray(f, d)) &&
              ((g = ka.contains(f.ownerDocument, f)),
              (h = u(m.appendChild(f), "script")),
              g && r(h),
              c)
            )
              for (e = 0; (f = h[e++]); ) db.test(f.type || "") && c.push(f);
          return (h = null), m;
        },
        cleanData: function (a, b) {
          for (
            var c,
              d,
              e,
              f,
              g = 0,
              h = ka.expando,
              i = ka.cache,
              j = ka.support.deleteExpando,
              k = ka.event.special;
            null != (c = a[g]);
            g++
          )
            if ((b || ka.acceptData(c)) && ((e = c[h]), (f = e && i[e]))) {
              if (f.events)
                for (d in f.events)
                  k[d] ? ka.event.remove(c, d) : ka.removeEvent(c, d, f.handle);
              i[e] &&
                (delete i[e],
                j
                  ? delete c[h]
                  : typeof c.removeAttribute !== W
                  ? c.removeAttribute(h)
                  : (c[h] = null),
                ba.push(e));
            }
        },
        _evalUrl: function (a) {
          return ka.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0,
          });
        },
      }),
      ka.fn.extend({
        wrapAll: function (a) {
          if (ka.isFunction(a))
            return this.each(function (b) {
              ka(this).wrapAll(a.call(this, b));
            });
          if (this[0]) {
            var b = ka(a, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && b.insertBefore(this[0]),
              b
                .map(function () {
                  for (
                    var a = this;
                    a.firstChild && 1 === a.firstChild.nodeType;

                  )
                    a = a.firstChild;
                  return a;
                })
                .append(this);
          }
          return this;
        },
        wrapInner: function (a) {
          return ka.isFunction(a)
            ? this.each(function (b) {
                ka(this).wrapInner(a.call(this, b));
              })
            : this.each(function () {
                var b = ka(this),
                  c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
              });
        },
        wrap: function (a) {
          var b = ka.isFunction(a);
          return this.each(function (c) {
            ka(this).wrapAll(b ? a.call(this, c) : a);
          });
        },
        unwrap: function () {
          return this.parent()
            .each(function () {
              ka.nodeName(this, "body") ||
                ka(this).replaceWith(this.childNodes);
            })
            .end();
        },
      });
    var jb,
      kb,
      lb,
      mb = /alpha\([^)]*\)/i,
      nb = /opacity\s*=\s*([^)]*)/,
      ob = /^(top|right|bottom|left)$/,
      pb = /^(none|table(?!-c[ea]).+)/,
      qb = /^margin/,
      rb = RegExp("^(" + la + ")(.*)$", "i"),
      sb = RegExp("^(" + la + ")(?!px)[a-z%]+$", "i"),
      tb = RegExp("^([+-])=(" + la + ")", "i"),
      ub = { BODY: "block" },
      vb = { position: "absolute", visibility: "hidden", display: "block" },
      wb = { letterSpacing: 0, fontWeight: 400 },
      xb = ["Top", "Right", "Bottom", "Left"],
      yb = ["Webkit", "O", "Moz", "ms"];
    ka.fn.extend({
      css: function (a, c) {
        return ka.access(
          this,
          function (a, c, d) {
            var e,
              f,
              g = {},
              h = 0;
            if (ka.isArray(c)) {
              for (f = kb(a), e = c.length; e > h; h++)
                g[c[h]] = ka.css(a, c[h], !1, f);
              return g;
            }
            return d !== b ? ka.style(a, c, d) : ka.css(a, c);
          },
          a,
          c,
          arguments.length > 1
        );
      },
      show: function () {
        return y(this, !0);
      },
      hide: function () {
        return y(this);
      },
      toggle: function (a) {
        return "boolean" == typeof a
          ? a
            ? this.show()
            : this.hide()
          : this.each(function () {
              x(this) ? ka(this).show() : ka(this).hide();
            });
      },
    }),
      ka.extend({
        cssHooks: {
          opacity: {
            get: function (a, b) {
              if (b) {
                var c = lb(a, "opacity");
                return "" === c ? "1" : c;
              }
            },
          },
        },
        cssNumber: {
          columnCount: !0,
          fillOpacity: !0,
          fontWeight: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0,
        },
        cssProps: { float: ka.support.cssFloat ? "cssFloat" : "styleFloat" },
        style: function (a, c, d, e) {
          if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
            var f,
              g,
              h,
              i = ka.camelCase(c),
              j = a.style;
            if (
              ((c = ka.cssProps[i] || (ka.cssProps[i] = w(j, i))),
              (h = ka.cssHooks[c] || ka.cssHooks[i]),
              d === b)
            )
              return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
            if (
              ((g = typeof d),
              "string" === g &&
                (f = tb.exec(d)) &&
                ((d = (f[1] + 1) * f[2] + parseFloat(ka.css(a, c))),
                (g = "number")),
              !(
                null == d ||
                ("number" === g && isNaN(d)) ||
                ("number" !== g || ka.cssNumber[i] || (d += "px"),
                ka.support.clearCloneStyle ||
                  "" !== d ||
                  0 !== c.indexOf("background") ||
                  (j[c] = "inherit"),
                h && "set" in h && (d = h.set(a, d, e)) === b)
              ))
            )
              try {
                j[c] = d;
              } catch (a) {}
          }
        },
        css: function (a, c, d, e) {
          var f,
            g,
            h,
            i = ka.camelCase(c);
          return (
            (c = ka.cssProps[i] || (ka.cssProps[i] = w(a.style, i))),
            (h = ka.cssHooks[c] || ka.cssHooks[i]),
            h && "get" in h && (g = h.get(a, !0, d)),
            g === b && (g = lb(a, c, e)),
            "normal" === g && c in wb && (g = wb[c]),
            "" === d || d
              ? ((f = parseFloat(g)), d === !0 || ka.isNumeric(f) ? f || 0 : g)
              : g
          );
        },
      }),
      a.getComputedStyle
        ? ((kb = function (b) {
            return a.getComputedStyle(b, null);
          }),
          (lb = function (a, c, d) {
            var e,
              f,
              g,
              h = d || kb(a),
              i = h ? h.getPropertyValue(c) || h[c] : b,
              j = a.style;
            return (
              h &&
                ("" !== i ||
                  ka.contains(a.ownerDocument, a) ||
                  (i = ka.style(a, c)),
                sb.test(i) &&
                  qb.test(c) &&
                  ((e = j.width),
                  (f = j.minWidth),
                  (g = j.maxWidth),
                  (j.minWidth = j.maxWidth = j.width = i),
                  (i = h.width),
                  (j.width = e),
                  (j.minWidth = f),
                  (j.maxWidth = g))),
              i
            );
          }))
        : Y.documentElement.currentStyle &&
          ((kb = function (a) {
            return a.currentStyle;
          }),
          (lb = function (a, c, d) {
            var e,
              f,
              g,
              h = d || kb(a),
              i = h ? h[c] : b,
              j = a.style;
            return (
              null == i && j && j[c] && (i = j[c]),
              sb.test(i) &&
                !ob.test(c) &&
                ((e = j.left),
                (f = a.runtimeStyle),
                (g = f && f.left),
                g && (f.left = a.currentStyle.left),
                (j.left = "fontSize" === c ? "1em" : i),
                (i = j.pixelLeft + "px"),
                (j.left = e),
                g && (f.left = g)),
              "" === i ? "auto" : i
            );
          })),
      ka.each(["height", "width"], function (a, c) {
        ka.cssHooks[c] = {
          get: function (a, d, e) {
            return d
              ? 0 === a.offsetWidth && pb.test(ka.css(a, "display"))
                ? ka.swap(a, vb, function () {
                    return B(a, c, e);
                  })
                : B(a, c, e)
              : b;
          },
          set: function (a, b, d) {
            var e = d && kb(a);
            return z(
              a,
              b,
              d
                ? A(
                    a,
                    c,
                    d,
                    ka.support.boxSizing &&
                      "border-box" === ka.css(a, "boxSizing", !1, e),
                    e
                  )
                : 0
            );
          },
        };
      }),
      ka.support.opacity ||
        (ka.cssHooks.opacity = {
          get: function (a, b) {
            return nb.test(
              (b && a.currentStyle ? a.currentStyle.filter : a.style.filter) ||
                ""
            )
              ? 0.01 * parseFloat(RegExp.$1) + ""
              : b
              ? "1"
              : "";
          },
          set: function (a, b) {
            var c = a.style,
              d = a.currentStyle,
              e = ka.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
              f = (d && d.filter) || c.filter || "";
            (c.zoom = 1),
              ((b >= 1 || "" === b) &&
                "" === ka.trim(f.replace(mb, "")) &&
                c.removeAttribute &&
                (c.removeAttribute("filter"), "" === b || (d && !d.filter))) ||
                (c.filter = mb.test(f) ? f.replace(mb, e) : f + " " + e);
          },
        }),
      ka(function () {
        ka.support.reliableMarginRight ||
          (ka.cssHooks.marginRight = {
            get: function (a, c) {
              return c
                ? ka.swap(a, { display: "inline-block" }, lb, [
                    a,
                    "marginRight",
                  ])
                : b;
            },
          }),
          !ka.support.pixelPosition &&
            ka.fn.position &&
            ka.each(["top", "left"], function (a, c) {
              ka.cssHooks[c] = {
                get: function (a, d) {
                  return d
                    ? ((d = lb(a, c)),
                      sb.test(d) ? ka(a).position()[c] + "px" : d)
                    : b;
                },
              };
            });
      }),
      ka.expr &&
        ka.expr.filters &&
        ((ka.expr.filters.hidden = function (a) {
          return (
            (0 >= a.offsetWidth && 0 >= a.offsetHeight) ||
            (!ka.support.reliableHiddenOffsets &&
              "none" === ((a.style && a.style.display) || ka.css(a, "display")))
          );
        }),
        (ka.expr.filters.visible = function (a) {
          return !ka.expr.filters.hidden(a);
        })),
      ka.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
        (ka.cssHooks[a + b] = {
          expand: function (c) {
            for (
              var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c];
              4 > d;
              d++
            )
              e[a + xb[d] + b] = f[d] || f[d - 2] || f[0];
            return e;
          },
        }),
          qb.test(a) || (ka.cssHooks[a + b].set = z);
      });
    var zb = /%20/g,
      Ab = /\[\]$/,
      Bb = /\r?\n/g,
      Cb = /^(?:submit|button|image|reset|file)$/i,
      Db = /^(?:input|select|textarea|keygen)/i;
    ka.fn.extend({
      serialize: function () {
        return ka.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var a = ka.prop(this, "elements");
          return a ? ka.makeArray(a) : this;
        })
          .filter(function () {
            var a = this.type;
            return (
              this.name &&
              !ka(this).is(":disabled") &&
              Db.test(this.nodeName) &&
              !Cb.test(a) &&
              (this.checked || !bb.test(a))
            );
          })
          .map(function (a, b) {
            var c = ka(this).val();
            return null == c
              ? null
              : ka.isArray(c)
              ? ka.map(c, function (a) {
                  return { name: b.name, value: a.replace(Bb, "\r\n") };
                })
              : { name: b.name, value: c.replace(Bb, "\r\n") };
          })
          .get();
      },
    }),
      (ka.param = function (a, c) {
        var d,
          e = [],
          f = function (a, b) {
            (b = ka.isFunction(b) ? b() : null == b ? "" : b),
              (e[e.length] =
                encodeURIComponent(a) + "=" + encodeURIComponent(b));
          };
        if (
          (c === b && (c = ka.ajaxSettings && ka.ajaxSettings.traditional),
          ka.isArray(a) || (a.jquery && !ka.isPlainObject(a)))
        )
          ka.each(a, function () {
            f(this.name, this.value);
          });
        else for (d in a) E(d, a[d], c, f);
        return e.join("&").replace(zb, "+");
      }),
      ka.each(
        "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
          " "
        ),
        function (a, b) {
          ka.fn[b] = function (a, c) {
            return arguments.length > 0
              ? this.on(b, null, a, c)
              : this.trigger(b);
          };
        }
      ),
      ka.fn.extend({
        hover: function (a, b) {
          return this.mouseenter(a).mouseleave(b || a);
        },
        bind: function (a, b, c) {
          return this.on(a, null, b, c);
        },
        unbind: function (a, b) {
          return this.off(a, null, b);
        },
        delegate: function (a, b, c, d) {
          return this.on(b, a, c, d);
        },
        undelegate: function (a, b, c) {
          return 1 === arguments.length
            ? this.off(a, "**")
            : this.off(b, a || "**", c);
        },
      });
    var Eb,
      Fb,
      Gb = ka.now(),
      Hb = /\?/,
      Ib = /#.*$/,
      Jb = /([?&])_=[^&]*/,
      Kb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      Lb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Mb = /^(?:GET|HEAD)$/,
      Nb = /^\/\//,
      Ob = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
      Pb = ka.fn.load,
      Qb = {},
      Rb = {},
      Sb = "*/".concat("*");
    try {
      Fb = X.href;
    } catch (a) {
      (Fb = Y.createElement("a")), (Fb.href = ""), (Fb = Fb.href);
    }
    (Eb = Ob.exec(Fb.toLowerCase()) || []),
      (ka.fn.load = function (a, c, d) {
        if ("string" != typeof a && Pb) return Pb.apply(this, arguments);
        var e,
          f,
          g,
          h = this,
          i = a.indexOf(" ");
        return (
          i >= 0 && ((e = a.slice(i, a.length)), (a = a.slice(0, i))),
          ka.isFunction(c)
            ? ((d = c), (c = b))
            : c && "object" == typeof c && (g = "POST"),
          h.length > 0 &&
            ka
              .ajax({ url: a, type: g, dataType: "html", data: c })
              .done(function (a) {
                (f = arguments),
                  h.html(e ? ka("<div>").append(ka.parseHTML(a)).find(e) : a);
              })
              .complete(
                d &&
                  function (a, b) {
                    h.each(d, f || [a.responseText, b, a]);
                  }
              ),
          this
        );
      }),
      ka.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (a, b) {
          ka.fn[b] = function (a) {
            return this.on(b, a);
          };
        }
      ),
      ka.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: Fb,
          type: "GET",
          isLocal: Lb.test(Eb[1]),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": Sb,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /xml/, html: /html/, json: /json/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": ka.parseJSON,
            "text xml": ka.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (a, b) {
          return b ? H(H(a, ka.ajaxSettings), b) : H(ka.ajaxSettings, a);
        },
        ajaxPrefilter: F(Qb),
        ajaxTransport: F(Rb),
        ajax: function (a, c) {
          function d(a, c, d, e) {
            var f,
              l,
              s,
              t,
              v,
              x = c;
            2 !== u &&
              ((u = 2),
              i && clearTimeout(i),
              (k = b),
              (h = e || ""),
              (w.readyState = a > 0 ? 4 : 0),
              (f = (a >= 200 && 300 > a) || 304 === a),
              d && (t = I(m, w, d)),
              (t = J(m, t, w, f)),
              f
                ? (m.ifModified &&
                    ((v = w.getResponseHeader("Last-Modified")),
                    v && (ka.lastModified[g] = v),
                    (v = w.getResponseHeader("etag")),
                    v && (ka.etag[g] = v)),
                  204 === a || "HEAD" === m.type
                    ? (x = "nocontent")
                    : 304 === a
                    ? (x = "notmodified")
                    : ((x = t.state), (l = t.data), (s = t.error), (f = !s)))
                : ((s = x), (a || !x) && ((x = "error"), 0 > a && (a = 0))),
              (w.status = a),
              (w.statusText = (c || x) + ""),
              f ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]),
              w.statusCode(r),
              (r = b),
              j &&
                o.trigger(f ? "ajaxSuccess" : "ajaxError", [w, m, f ? l : s]),
              q.fireWith(n, [w, x]),
              j &&
                (o.trigger("ajaxComplete", [w, m]),
                --ka.active || ka.event.trigger("ajaxStop")));
          }
          "object" == typeof a && ((c = a), (a = b)), (c = c || {});
          var e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m = ka.ajaxSetup({}, c),
            n = m.context || m,
            o = m.context && (n.nodeType || n.jquery) ? ka(n) : ka.event,
            p = ka.Deferred(),
            q = ka.Callbacks("once memory"),
            r = m.statusCode || {},
            s = {},
            t = {},
            u = 0,
            v = "canceled",
            w = {
              readyState: 0,
              getResponseHeader: function (a) {
                var b;
                if (2 === u) {
                  if (!l)
                    for (l = {}; (b = Kb.exec(h)); )
                      l[b[1].toLowerCase()] = b[2];
                  b = l[a.toLowerCase()];
                }
                return null == b ? null : b;
              },
              getAllResponseHeaders: function () {
                return 2 === u ? h : null;
              },
              setRequestHeader: function (a, b) {
                var c = a.toLowerCase();
                return u || ((a = t[c] = t[c] || a), (s[a] = b)), this;
              },
              overrideMimeType: function (a) {
                return u || (m.mimeType = a), this;
              },
              statusCode: function (a) {
                var b;
                if (a)
                  if (2 > u) for (b in a) r[b] = [r[b], a[b]];
                  else w.always(a[w.status]);
                return this;
              },
              abort: function (a) {
                var b = a || v;
                return k && k.abort(b), d(0, b), this;
              },
            };
          if (
            ((p.promise(w).complete = q.add),
            (w.success = w.done),
            (w.error = w.fail),
            (m.url = ((a || m.url || Fb) + "")
              .replace(Ib, "")
              .replace(Nb, Eb[1] + "//")),
            (m.type = c.method || c.type || m.method || m.type),
            (m.dataTypes = ka
              .trim(m.dataType || "*")
              .toLowerCase()
              .match(ma) || [""]),
            null == m.crossDomain &&
              ((e = Ob.exec(m.url.toLowerCase())),
              (m.crossDomain = !(
                !e ||
                (e[1] === Eb[1] &&
                  e[2] === Eb[2] &&
                  (e[3] || ("http:" === e[1] ? "80" : "443")) ===
                    (Eb[3] || ("http:" === Eb[1] ? "80" : "443")))
              ))),
            m.data &&
              m.processData &&
              "string" != typeof m.data &&
              (m.data = ka.param(m.data, m.traditional)),
            G(Qb, m, c, w),
            2 === u)
          )
            return w;
          (j = m.global),
            j && 0 === ka.active++ && ka.event.trigger("ajaxStart"),
            (m.type = m.type.toUpperCase()),
            (m.hasContent = !Mb.test(m.type)),
            (g = m.url),
            m.hasContent ||
              (m.data &&
                ((g = m.url += (Hb.test(g) ? "&" : "?") + m.data),
                delete m.data),
              m.cache === !1 &&
                (m.url = Jb.test(g)
                  ? g.replace(Jb, "$1_=" + Gb++)
                  : g + (Hb.test(g) ? "&" : "?") + "_=" + Gb++)),
            m.ifModified &&
              (ka.lastModified[g] &&
                w.setRequestHeader("If-Modified-Since", ka.lastModified[g]),
              ka.etag[g] && w.setRequestHeader("If-None-Match", ka.etag[g])),
            ((m.data && m.hasContent && m.contentType !== !1) ||
              c.contentType) &&
              w.setRequestHeader("Content-Type", m.contentType),
            w.setRequestHeader(
              "Accept",
              m.dataTypes[0] && m.accepts[m.dataTypes[0]]
                ? m.accepts[m.dataTypes[0]] +
                    ("*" !== m.dataTypes[0] ? ", " + Sb + "; q=0.01" : "")
                : m.accepts["*"]
            );
          for (f in m.headers) w.setRequestHeader(f, m.headers[f]);
          if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u))
            return w.abort();
          v = "abort";
          for (f in { success: 1, error: 1, complete: 1 }) w[f](m[f]);
          if ((k = G(Rb, m, c, w))) {
            (w.readyState = 1),
              j && o.trigger("ajaxSend", [w, m]),
              m.async &&
                m.timeout > 0 &&
                (i = setTimeout(function () {
                  w.abort("timeout");
                }, m.timeout));
            try {
              (u = 1), k.send(s, d);
            } catch (a) {
              if (!(2 > u)) throw a;
              d(-1, a);
            }
          } else d(-1, "No Transport");
          return w;
        },
        getJSON: function (a, b, c) {
          return ka.get(a, b, c, "json");
        },
        getScript: function (a, c) {
          return ka.get(a, b, c, "script");
        },
      }),
      ka.each(["get", "post"], function (a, c) {
        ka[c] = function (a, d, e, f) {
          return (
            ka.isFunction(d) && ((f = f || e), (e = d), (d = b)),
            ka.ajax({ url: a, type: c, dataType: f, data: d, success: e })
          );
        };
      }),
      ka.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /(?:java|ecma)script/ },
        converters: {
          "text script": function (a) {
            return ka.globalEval(a), a;
          },
        },
      }),
      ka.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1),
          a.crossDomain && ((a.type = "GET"), (a.global = !1));
      }),
      ka.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
          var c,
            d = Y.head || ka("head")[0] || Y.documentElement;
          return {
            send: function (b, e) {
              (c = Y.createElement("script")),
                (c.async = !0),
                a.scriptCharset && (c.charset = a.scriptCharset),
                (c.src = a.url),
                (c.onload = c.onreadystatechange =
                  function (a, b) {
                    (b ||
                      !c.readyState ||
                      /loaded|complete/.test(c.readyState)) &&
                      ((c.onload = c.onreadystatechange = null),
                      c.parentNode && c.parentNode.removeChild(c),
                      (c = null),
                      b || e(200, "success"));
                  }),
                d.insertBefore(c, d.firstChild);
            },
            abort: function () {
              c && c.onload(b, !0);
            },
          };
        }
      });
    var Tb = [],
      Ub = /(=)\?(?=&|$)|\?\?/;
    ka.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var a = Tb.pop() || ka.expando + "_" + Gb++;
        return (this[a] = !0), a;
      },
    }),
      ka.ajaxPrefilter("json jsonp", function (c, d, e) {
        var f,
          g,
          h,
          i =
            c.jsonp !== !1 &&
            (Ub.test(c.url)
              ? "url"
              : "string" == typeof c.data &&
                !(c.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
                Ub.test(c.data) &&
                "data");
        return i || "jsonp" === c.dataTypes[0]
          ? ((f = c.jsonpCallback =
              ka.isFunction(c.jsonpCallback)
                ? c.jsonpCallback()
                : c.jsonpCallback),
            i
              ? (c[i] = c[i].replace(Ub, "$1" + f))
              : c.jsonp !== !1 &&
                (c.url += (Hb.test(c.url) ? "&" : "?") + c.jsonp + "=" + f),
            (c.converters["script json"] = function () {
              return h || ka.error(f + " was not called"), h[0];
            }),
            (c.dataTypes[0] = "json"),
            (g = a[f]),
            (a[f] = function () {
              h = arguments;
            }),
            e.always(function () {
              (a[f] = g),
                c[f] && ((c.jsonpCallback = d.jsonpCallback), Tb.push(f)),
                h && ka.isFunction(g) && g(h[0]),
                (h = g = b);
            }),
            "script")
          : b;
      });
    var Vb,
      Wb,
      Xb = 0,
      Yb =
        a.ActiveXObject &&
        function () {
          var a;
          for (a in Vb) Vb[a](b, !0);
        };
    (ka.ajaxSettings.xhr = a.ActiveXObject
      ? function () {
          return (!this.isLocal && K()) || L();
        }
      : K),
      (Wb = ka.ajaxSettings.xhr()),
      (ka.support.cors = !!Wb && "withCredentials" in Wb),
      (Wb = ka.support.ajax = !!Wb),
      Wb &&
        ka.ajaxTransport(function (c) {
          if (!c.crossDomain || ka.support.cors) {
            var d;
            return {
              send: function (e, f) {
                var g,
                  h,
                  i = c.xhr();
                if (
                  (c.username
                    ? i.open(c.type, c.url, c.async, c.username, c.password)
                    : i.open(c.type, c.url, c.async),
                  c.xhrFields)
                )
                  for (h in c.xhrFields) i[h] = c.xhrFields[h];
                c.mimeType &&
                  i.overrideMimeType &&
                  i.overrideMimeType(c.mimeType),
                  c.crossDomain ||
                    e["X-Requested-With"] ||
                    (e["X-Requested-With"] = "XMLHttpRequest");
                try {
                  for (h in e) i.setRequestHeader(h, e[h]);
                } catch (a) {}
                i.send((c.hasContent && c.data) || null),
                  (d = function (a, e) {
                    var h, j, k, l;
                    try {
                      if (d && (e || 4 === i.readyState))
                        if (
                          ((d = b),
                          g &&
                            ((i.onreadystatechange = ka.noop),
                            Yb && delete Vb[g]),
                          e)
                        )
                          4 !== i.readyState && i.abort();
                        else {
                          (l = {}),
                            (h = i.status),
                            (j = i.getAllResponseHeaders()),
                            "string" == typeof i.responseText &&
                              (l.text = i.responseText);
                          try {
                            k = i.statusText;
                          } catch (a) {
                            k = "";
                          }
                          h || !c.isLocal || c.crossDomain
                            ? 1223 === h && (h = 204)
                            : (h = l.text ? 200 : 404);
                        }
                    } catch (a) {
                      e || f(-1, a);
                    }
                    l && f(h, k, l, j);
                  }),
                  c.async
                    ? 4 === i.readyState
                      ? setTimeout(d)
                      : ((g = ++Xb),
                        Yb &&
                          (Vb || ((Vb = {}), ka(a).unload(Yb)), (Vb[g] = d)),
                        (i.onreadystatechange = d))
                    : d();
              },
              abort: function () {
                d && d(b, !0);
              },
            };
          }
        });
    var Zb,
      $b,
      _b = /^(?:toggle|show|hide)$/,
      ac = RegExp("^(?:([+-])=|)(" + la + ")([a-z%]*)$", "i"),
      bc = /queueHooks$/,
      cc = [Q],
      dc = {
        "*": [
          function (a, b) {
            var c = this.createTween(a, b),
              d = c.cur(),
              e = ac.exec(b),
              f = (e && e[3]) || (ka.cssNumber[a] ? "" : "px"),
              g =
                (ka.cssNumber[a] || ("px" !== f && +d)) &&
                ac.exec(ka.css(c.elem, a)),
              h = 1,
              i = 20;
            if (g && g[3] !== f) {
              (f = f || g[3]), (e = e || []), (g = +d || 1);
              do (h = h || ".5"), (g /= h), ka.style(c.elem, a, g + f);
              while (h !== (h = c.cur() / d) && 1 !== h && --i);
            }
            return (
              e &&
                ((g = c.start = +g || +d || 0),
                (c.unit = f),
                (c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2])),
              c
            );
          },
        ],
      };
    (ka.Animation = ka.extend(O, {
      tweener: function (a, b) {
        ka.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.split(" "));
        for (var c, d = 0, e = a.length; e > d; d++)
          (c = a[d]), (dc[c] = dc[c] || []), dc[c].unshift(b);
      },
      prefilter: function (a, b) {
        b ? cc.unshift(a) : cc.push(a);
      },
    })),
      (ka.Tween = R),
      (R.prototype = {
        constructor: R,
        init: function (a, b, c, d, e, f) {
          (this.elem = a),
            (this.prop = c),
            (this.easing = e || "swing"),
            (this.options = b),
            (this.start = this.now = this.cur()),
            (this.end = d),
            (this.unit = f || (ka.cssNumber[c] ? "" : "px"));
        },
        cur: function () {
          var a = R.propHooks[this.prop];
          return a && a.get ? a.get(this) : R.propHooks._default.get(this);
        },
        run: function (a) {
          var b,
            c = R.propHooks[this.prop];
          return (
            (this.pos = b =
              this.options.duration
                ? ka.easing[this.easing](
                    a,
                    this.options.duration * a,
                    0,
                    1,
                    this.options.duration
                  )
                : a),
            (this.now = (this.end - this.start) * b + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : R.propHooks._default.set(this),
            this
          );
        },
      }),
      (R.prototype.init.prototype = R.prototype),
      (R.propHooks = {
        _default: {
          get: function (a) {
            var b;
            return null == a.elem[a.prop] ||
              (a.elem.style && null != a.elem.style[a.prop])
              ? ((b = ka.css(a.elem, a.prop, "")), b && "auto" !== b ? b : 0)
              : a.elem[a.prop];
          },
          set: function (a) {
            ka.fx.step[a.prop]
              ? ka.fx.step[a.prop](a)
              : a.elem.style &&
                (null != a.elem.style[ka.cssProps[a.prop]] ||
                  ka.cssHooks[a.prop])
              ? ka.style(a.elem, a.prop, a.now + a.unit)
              : (a.elem[a.prop] = a.now);
          },
        },
      }),
      (R.propHooks.scrollTop = R.propHooks.scrollLeft =
        {
          set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
          },
        }),
      ka.each(["toggle", "show", "hide"], function (a, b) {
        var c = ka.fn[b];
        ka.fn[b] = function (a, d, e) {
          return null == a || "boolean" == typeof a
            ? c.apply(this, arguments)
            : this.animate(S(b, !0), a, d, e);
        };
      }),
      ka.fn.extend({
        fadeTo: function (a, b, c, d) {
          return this.filter(x)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: b }, a, c, d);
        },
        animate: function (a, b, c, d) {
          var e = ka.isEmptyObject(a),
            f = ka.speed(b, c, d),
            g = function () {
              var b = O(this, ka.extend({}, a), f);
              (e || ka._data(this, "finish")) && b.stop(!0);
            };
          return (
            (g.finish = g),
            e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
          );
        },
        stop: function (a, c, d) {
          var e = function (a) {
            var b = a.stop;
            delete a.stop, b(d);
          };
          return (
            "string" != typeof a && ((d = c), (c = a), (a = b)),
            c && a !== !1 && this.queue(a || "fx", []),
            this.each(function () {
              var b = !0,
                c = null != a && a + "queueHooks",
                f = ka.timers,
                g = ka._data(this);
              if (c) g[c] && g[c].stop && e(g[c]);
              else for (c in g) g[c] && g[c].stop && bc.test(c) && e(g[c]);
              for (c = f.length; c--; )
                f[c].elem !== this ||
                  (null != a && f[c].queue !== a) ||
                  (f[c].anim.stop(d), (b = !1), f.splice(c, 1));
              (b || !d) && ka.dequeue(this, a);
            })
          );
        },
        finish: function (a) {
          return (
            a !== !1 && (a = a || "fx"),
            this.each(function () {
              var b,
                c = ka._data(this),
                d = c[a + "queue"],
                e = c[a + "queueHooks"],
                f = ka.timers,
                g = d ? d.length : 0;
              for (
                c.finish = !0,
                  ka.queue(this, a, []),
                  e && e.stop && e.stop.call(this, !0),
                  b = f.length;
                b--;

              )
                f[b].elem === this &&
                  f[b].queue === a &&
                  (f[b].anim.stop(!0), f.splice(b, 1));
              for (b = 0; g > b; b++)
                d[b] && d[b].finish && d[b].finish.call(this);
              delete c.finish;
            })
          );
        },
      }),
      ka.each(
        {
          slideDown: S("show"),
          slideUp: S("hide"),
          slideToggle: S("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (a, b) {
          ka.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d);
          };
        }
      ),
      (ka.speed = function (a, b, c) {
        var d =
          a && "object" == typeof a
            ? ka.extend({}, a)
            : {
                complete: c || (!c && b) || (ka.isFunction(a) && a),
                duration: a,
                easing: (c && b) || (b && !ka.isFunction(b) && b),
              };
        return (
          (d.duration = ka.fx.off
            ? 0
            : "number" == typeof d.duration
            ? d.duration
            : d.duration in ka.fx.speeds
            ? ka.fx.speeds[d.duration]
            : ka.fx.speeds._default),
          (null == d.queue || d.queue === !0) && (d.queue = "fx"),
          (d.old = d.complete),
          (d.complete = function () {
            ka.isFunction(d.old) && d.old.call(this),
              d.queue && ka.dequeue(this, d.queue);
          }),
          d
        );
      }),
      (ka.easing = {
        linear: function (a) {
          return a;
        },
        swing: function (a) {
          return 0.5 - Math.cos(a * Math.PI) / 2;
        },
      }),
      (ka.timers = []),
      (ka.fx = R.prototype.init),
      (ka.fx.tick = function () {
        var a,
          c = ka.timers,
          d = 0;
        for (Zb = ka.now(); c.length > d; d++)
          (a = c[d]), a() || c[d] !== a || c.splice(d--, 1);
        c.length || ka.fx.stop(), (Zb = b);
      }),
      (ka.fx.timer = function (a) {
        a() && ka.timers.push(a) && ka.fx.start();
      }),
      (ka.fx.interval = 13),
      (ka.fx.start = function () {
        $b || ($b = setInterval(ka.fx.tick, ka.fx.interval));
      }),
      (ka.fx.stop = function () {
        clearInterval($b), ($b = null);
      }),
      (ka.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (ka.fx.step = {}),
      ka.expr &&
        ka.expr.filters &&
        (ka.expr.filters.animated = function (a) {
          return ka.grep(ka.timers, function (b) {
            return a === b.elem;
          }).length;
        }),
      (ka.fn.offset = function (a) {
        if (arguments.length)
          return a === b
            ? this
            : this.each(function (b) {
                ka.offset.setOffset(this, a, b);
              });
        var c,
          d,
          e = { top: 0, left: 0 },
          f = this[0],
          g = f && f.ownerDocument;
        return g
          ? ((c = g.documentElement),
            ka.contains(c, f)
              ? (typeof f.getBoundingClientRect !== W &&
                  (e = f.getBoundingClientRect()),
                (d = T(g)),
                {
                  top:
                    e.top + (d.pageYOffset || c.scrollTop) - (c.clientTop || 0),
                  left:
                    e.left +
                    (d.pageXOffset || c.scrollLeft) -
                    (c.clientLeft || 0),
                })
              : e)
          : void 0;
      }),
      (ka.offset = {
        setOffset: function (a, b, c) {
          var d = ka.css(a, "position");
          "static" === d && (a.style.position = "relative");
          var e,
            f,
            g = ka(a),
            h = g.offset(),
            i = ka.css(a, "top"),
            j = ka.css(a, "left"),
            k =
              ("absolute" === d || "fixed" === d) &&
              ka.inArray("auto", [i, j]) > -1,
            l = {},
            m = {};
          k
            ? ((m = g.position()), (e = m.top), (f = m.left))
            : ((e = parseFloat(i) || 0), (f = parseFloat(j) || 0)),
            ka.isFunction(b) && (b = b.call(a, c, h)),
            null != b.top && (l.top = b.top - h.top + e),
            null != b.left && (l.left = b.left - h.left + f),
            "using" in b ? b.using.call(a, l) : g.css(l);
        },
      }),
      ka.fn.extend({
        position: function () {
          if (this[0]) {
            var a,
              b,
              c = { top: 0, left: 0 },
              d = this[0];
            return (
              "fixed" === ka.css(d, "position")
                ? (b = d.getBoundingClientRect())
                : ((a = this.offsetParent()),
                  (b = this.offset()),
                  ka.nodeName(a[0], "html") || (c = a.offset()),
                  (c.top += ka.css(a[0], "borderTopWidth", !0)),
                  (c.left += ka.css(a[0], "borderLeftWidth", !0))),
              {
                top: b.top - c.top - ka.css(d, "marginTop", !0),
                left: b.left - c.left - ka.css(d, "marginLeft", !0),
              }
            );
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var a = this.offsetParent || Z;
              a &&
              !ka.nodeName(a, "html") &&
              "static" === ka.css(a, "position");

            )
              a = a.offsetParent;
            return a || Z;
          });
        },
      }),
      ka.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (a, c) {
          var d = /Y/.test(c);
          ka.fn[a] = function (e) {
            return ka.access(
              this,
              function (a, e, f) {
                var g = T(a);
                return f === b
                  ? g
                    ? c in g
                      ? g[c]
                      : g.document.documentElement[e]
                    : a[e]
                  : (g
                      ? g.scrollTo(
                          d ? ka(g).scrollLeft() : f,
                          d ? f : ka(g).scrollTop()
                        )
                      : (a[e] = f),
                    b);
              },
              a,
              e,
              arguments.length,
              null
            );
          };
        }
      ),
      ka.each({ Height: "height", Width: "width" }, function (a, c) {
        ka.each(
          { padding: "inner" + a, content: c, "": "outer" + a },
          function (d, e) {
            ka.fn[e] = function (e, f) {
              var g = arguments.length && (d || "boolean" != typeof e),
                h = d || (e === !0 || f === !0 ? "margin" : "border");
              return ka.access(
                this,
                function (c, d, e) {
                  var f;
                  return ka.isWindow(c)
                    ? c.document.documentElement["client" + a]
                    : 9 === c.nodeType
                    ? ((f = c.documentElement),
                      Math.max(
                        c.body["scroll" + a],
                        f["scroll" + a],
                        c.body["offset" + a],
                        f["offset" + a],
                        f["client" + a]
                      ))
                    : e === b
                    ? ka.css(c, d, h)
                    : ka.style(c, d, e, h);
                },
                c,
                g ? e : b,
                g,
                null
              );
            };
          }
        );
      }),
      (ka.fn.size = function () {
        return this.length;
      }),
      (ka.fn.andSelf = ka.fn.addBack),
      "object" == typeof module && module && "object" == typeof module.exports
        ? (module.exports = ka)
        : ((a.jQuery = a.$ = ka),
          "function" == typeof define &&
            define.amd &&
            define("jquery", [], function () {
              return ka;
            }));
  })(window),
  function () {
    var a,
      b,
      c,
      d,
      e,
      f = function (a, b) {
        return function () {
          return a.apply(b, arguments);
        };
      },
      g =
        [].indexOf ||
        function (a) {
          for (var b = 0, c = this.length; c > b; b++)
            if (b in this && this[b] === a) return b;
          return -1;
        };
    (b = (function () {
      function a() {}
      return (
        (a.prototype.extend = function (a, b) {
          var c, d;
          for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
          return a;
        }),
        (a.prototype.isMobile = function (a) {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            a
          );
        }),
        (a.prototype.createEvent = function (a, b, c, d) {
          var e;
          return (
            null == b && (b = !1),
            null == c && (c = !1),
            null == d && (d = null),
            null != document.createEvent
              ? ((e = document.createEvent("CustomEvent")),
                e.initCustomEvent(a, b, c, d))
              : null != document.createEventObject
              ? ((e = document.createEventObject()), (e.eventType = a))
              : (e.eventName = a),
            e
          );
        }),
        (a.prototype.emitEvent = function (a, b) {
          return null != a.dispatchEvent
            ? a.dispatchEvent(b)
            : b in (null != a)
            ? a[b]()
            : "on" + b in (null != a)
            ? a["on" + b]()
            : void 0;
        }),
        (a.prototype.addEvent = function (a, b, c) {
          return null != a.addEventListener
            ? a.addEventListener(b, c, !1)
            : null != a.attachEvent
            ? a.attachEvent("on" + b, c)
            : (a[b] = c);
        }),
        (a.prototype.removeEvent = function (a, b, c) {
          return null != a.removeEventListener
            ? a.removeEventListener(b, c, !1)
            : null != a.detachEvent
            ? a.detachEvent("on" + b, c)
            : delete a[b];
        }),
        (a.prototype.innerHeight = function () {
          return "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.clientHeight;
        }),
        a
      );
    })()),
      (c =
        this.WeakMap ||
        this.MozWeakMap ||
        (c = (function () {
          function a() {
            (this.keys = []), (this.values = []);
          }
          return (
            (a.prototype.get = function (a) {
              var b, c, d, e, f;
              for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (((c = f[b]), c === a)) return this.values[b];
            }),
            (a.prototype.set = function (a, b) {
              var c, d, e, f, g;
              for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (((d = g[c]), d === a)) return void (this.values[c] = b);
              return this.keys.push(a), this.values.push(b);
            }),
            a
          );
        })())),
      (a =
        this.MutationObserver ||
        this.WebkitMutationObserver ||
        this.MozMutationObserver ||
        (a = (function () {
          function a() {
            "undefined" != typeof console &&
              null !== console &&
              console.warn(
                "MutationObserver is not supported by your browser."
              ),
              "undefined" != typeof console &&
                null !== console &&
                console.warn(
                  "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
                );
          }
          return (
            (a.notSupported = !0), (a.prototype.observe = function () {}), a
          );
        })())),
      (d =
        this.getComputedStyle ||
        function (a) {
          return (
            (this.getPropertyValue = function (b) {
              var c;
              return (
                "float" === b && (b = "styleFloat"),
                e.test(b) &&
                  b.replace(e, function (a, b) {
                    return b.toUpperCase();
                  }),
                (null != (c = a.currentStyle) ? c[b] : void 0) || null
              );
            }),
            this
          );
        }),
      (e = /(\-([a-z]){1})/g),
      (this.WOW = (function () {
        function e(a) {
          null == a && (a = {}),
            (this.scrollCallback = f(this.scrollCallback, this)),
            (this.scrollHandler = f(this.scrollHandler, this)),
            (this.resetAnimation = f(this.resetAnimation, this)),
            (this.start = f(this.start, this)),
            (this.scrolled = !0),
            (this.config = this.util().extend(a, this.defaults)),
            null != a.scrollContainer &&
              (this.config.scrollContainer = document.querySelector(
                a.scrollContainer
              )),
            (this.animationNameCache = new c()),
            (this.wowEvent = this.util().createEvent(this.config.boxClass));
        }
        return (
          (e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null,
          }),
          (e.prototype.init = function () {
            var a;
            return (
              (this.element = window.document.documentElement),
              "interactive" === (a = document.readyState) || "complete" === a
                ? this.start()
                : this.util().addEvent(
                    document,
                    "DOMContentLoaded",
                    this.start
                  ),
              (this.finished = [])
            );
          }),
          (e.prototype.start = function () {
            var b, c, d, e;
            if (
              ((this.stopped = !1),
              (this.boxes = function () {
                var a, c, d, e;
                for (
                  d = this.element.querySelectorAll("." + this.config.boxClass),
                    e = [],
                    a = 0,
                    c = d.length;
                  c > a;
                  a++
                )
                  (b = d[a]), e.push(b);
                return e;
              }.call(this)),
              (this.all = function () {
                var a, c, d, e;
                for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                  (b = d[a]), e.push(b);
                return e;
              }.call(this)),
              this.boxes.length)
            )
              if (this.disabled()) this.resetStyle();
              else
                for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                  (b = e[c]), this.applyStyle(b, !0);
            return (
              this.disabled() ||
                (this.util().addEvent(
                  this.config.scrollContainer || window,
                  "scroll",
                  this.scrollHandler
                ),
                this.util().addEvent(window, "resize", this.scrollHandler),
                (this.interval = setInterval(this.scrollCallback, 50))),
              this.config.live
                ? new a(
                    (function (a) {
                      return function (b) {
                        var c, d, e, f, g;
                        for (g = [], c = 0, d = b.length; d > c; c++)
                          (f = b[c]),
                            g.push(
                              function () {
                                var a, b, c, d;
                                for (
                                  c = f.addedNodes || [],
                                    d = [],
                                    a = 0,
                                    b = c.length;
                                  b > a;
                                  a++
                                )
                                  (e = c[a]), d.push(this.doSync(e));
                                return d;
                              }.call(a)
                            );
                        return g;
                      };
                    })(this)
                  ).observe(document.body, { childList: !0, subtree: !0 })
                : void 0
            );
          }),
          (e.prototype.stop = function () {
            return (
              (this.stopped = !0),
              this.util().removeEvent(
                this.config.scrollContainer || window,
                "scroll",
                this.scrollHandler
              ),
              this.util().removeEvent(window, "resize", this.scrollHandler),
              null != this.interval ? clearInterval(this.interval) : void 0
            );
          }),
          (e.prototype.sync = function () {
            return a.notSupported ? this.doSync(this.element) : void 0;
          }),
          (e.prototype.doSync = function (a) {
            var b, c, d, e, f;
            if ((null == a && (a = this.element), 1 === a.nodeType)) {
              for (
                a = a.parentNode || a,
                  e = a.querySelectorAll("." + this.config.boxClass),
                  f = [],
                  c = 0,
                  d = e.length;
                d > c;
                c++
              )
                (b = e[c]),
                  g.call(this.all, b) < 0
                    ? (this.boxes.push(b),
                      this.all.push(b),
                      this.stopped || this.disabled()
                        ? this.resetStyle()
                        : this.applyStyle(b, !0),
                      f.push((this.scrolled = !0)))
                    : f.push(void 0);
              return f;
            }
          }),
          (e.prototype.show = function (a) {
            return (
              this.applyStyle(a),
              (a.className = a.className + " " + this.config.animateClass),
              null != this.config.callback && this.config.callback(a),
              this.util().emitEvent(a, this.wowEvent),
              this.util().addEvent(a, "animationend", this.resetAnimation),
              this.util().addEvent(a, "oanimationend", this.resetAnimation),
              this.util().addEvent(
                a,
                "webkitAnimationEnd",
                this.resetAnimation
              ),
              this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation),
              a
            );
          }),
          (e.prototype.applyStyle = function (a, b) {
            var c, d, e;
            return (
              (d = a.getAttribute("data-wow-duration")),
              (c = a.getAttribute("data-wow-delay")),
              (e = a.getAttribute("data-wow-iteration")),
              this.animate(
                (function (f) {
                  return function () {
                    return f.customStyle(a, b, d, c, e);
                  };
                })(this)
              )
            );
          }),
          (e.prototype.animate = (function () {
            return "requestAnimationFrame" in window
              ? function (a) {
                  return window.requestAnimationFrame(a);
                }
              : function (a) {
                  return a();
                };
          })()),
          (e.prototype.resetStyle = function () {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
              (a = d[b]), e.push((a.style.visibility = "visible"));
            return e;
          }),
          (e.prototype.resetAnimation = function (a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0
              ? ((b = a.target || a.srcElement),
                (b.className = b.className
                  .replace(this.config.animateClass, "")
                  .trim()))
              : void 0;
          }),
          (e.prototype.customStyle = function (a, b, c, d, e) {
            return (
              b && this.cacheAnimationName(a),
              (a.style.visibility = b ? "hidden" : "visible"),
              c && this.vendorSet(a.style, { animationDuration: c }),
              d && this.vendorSet(a.style, { animationDelay: d }),
              e && this.vendorSet(a.style, { animationIterationCount: e }),
              this.vendorSet(a.style, {
                animationName: b ? "none" : this.cachedAnimationName(a),
              }),
              a
            );
          }),
          (e.prototype.vendors = ["moz", "webkit"]),
          (e.prototype.vendorSet = function (a, b) {
            var c, d, e, f;
            d = [];
            for (c in b)
              (e = b[c]),
                (a["" + c] = e),
                d.push(
                  function () {
                    var b, d, g, h;
                    for (
                      g = this.vendors, h = [], b = 0, d = g.length;
                      d > b;
                      b++
                    )
                      (f = g[b]),
                        h.push(
                          (a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] =
                            e)
                        );
                    return h;
                  }.call(this)
                );
            return d;
          }),
          (e.prototype.vendorCSS = function (a, b) {
            var c, e, f, g, h, i;
            for (
              h = d(a),
                g = h.getPropertyCSSValue(b),
                f = this.vendors,
                c = 0,
                e = f.length;
              e > c;
              c++
            )
              (i = f[c]), (g = g || h.getPropertyCSSValue("-" + i + "-" + b));
            return g;
          }),
          (e.prototype.animationName = function (a) {
            var b;
            try {
              b = this.vendorCSS(a, "animation-name").cssText;
            } catch (c) {
              b = d(a).getPropertyValue("animation-name");
            }
            return "none" === b ? "" : b;
          }),
          (e.prototype.cacheAnimationName = function (a) {
            return this.animationNameCache.set(a, this.animationName(a));
          }),
          (e.prototype.cachedAnimationName = function (a) {
            return this.animationNameCache.get(a);
          }),
          (e.prototype.scrollHandler = function () {
            return (this.scrolled = !0);
          }),
          (e.prototype.scrollCallback = function () {
            var a;
            return !this.scrolled ||
              ((this.scrolled = !1),
              (this.boxes = function () {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                  (a = d[b]),
                    a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e;
              }.call(this)),
              this.boxes.length || this.config.live)
              ? void 0
              : this.stop();
          }),
          (e.prototype.offsetTop = function (a) {
            for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
            for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
            return b;
          }),
          (e.prototype.isVisible = function (a) {
            var b, c, d, e, f;
            return (
              (c = a.getAttribute("data-wow-offset") || this.config.offset),
              (f =
                (this.config.scrollContainer &&
                  this.config.scrollContainer.scrollTop) ||
                window.pageYOffset),
              (e =
                f +
                Math.min(this.element.clientHeight, this.util().innerHeight()) -
                c),
              (d = this.offsetTop(a)),
              (b = d + a.clientHeight),
              e >= d && b >= f
            );
          }),
          (e.prototype.util = function () {
            return null != this._util ? this._util : (this._util = new b());
          }),
          (e.prototype.disabled = function () {
            return (
              !this.config.mobile && this.util().isMobile(navigator.userAgent)
            );
          }),
          e
        );
      })());
  }.call(this),
  "undefined" == typeof jQuery)
)
  throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (a) {
  "use strict";
  function b() {
    var a = document.createElement("bootstrap"),
      b = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend",
      };
    for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] };
    return !1;
  }
  (a.fn.emulateTransitionEnd = function (b) {
    var c = !1,
      d = this;
    a(this).one("bsTransitionEnd", function () {
      c = !0;
    });
    var e = function () {
      c || a(d).trigger(a.support.transition.end);
    };
    return setTimeout(e, b), this;
  }),
    a(function () {
      (a.support.transition = b()),
        a.support.transition &&
          (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function (b) {
              return a(b.target).is(this)
                ? b.handleObj.handler.apply(this, arguments)
                : void 0;
            },
          });
    });
})(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var c = a(this),
          e = c.data("bs.alert");
        e || c.data("bs.alert", (e = new d(this))),
          "string" == typeof b && e[b].call(c);
      });
    }
    var c = '[data-dismiss="alert"]',
      d = function (b) {
        a(b).on("click", c, this.close);
      };
    (d.VERSION = "3.2.0"),
      (d.prototype.close = function (b) {
        function c() {
          f.detach().trigger("closed.bs.alert").remove();
        }
        var d = a(this),
          e = d.attr("data-target");
        e || ((e = d.attr("href")), (e = e && e.replace(/.*(?=#[^\s]*$)/, "")));
        var f = a(e);
        b && b.preventDefault(),
          f.length || (f = d.hasClass("alert") ? d : d.parent()),
          f.trigger((b = a.Event("close.bs.alert"))),
          b.isDefaultPrevented() ||
            (f.removeClass("in"),
            a.support.transition && f.hasClass("fade")
              ? f.one("bsTransitionEnd", c).emulateTransitionEnd(150)
              : c());
      });
    var e = a.fn.alert;
    (a.fn.alert = b),
      (a.fn.alert.Constructor = d),
      (a.fn.alert.noConflict = function () {
        return (a.fn.alert = e), this;
      }),
      a(document).on("click.bs.alert.data-api", c, d.prototype.close);
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.button"),
          f = "object" == typeof b && b;
        e || d.data("bs.button", (e = new c(this, f))),
          "toggle" == b ? e.toggle() : b && e.setState(b);
      });
    }
    var c = function (b, d) {
      (this.$element = a(b)),
        (this.options = a.extend({}, c.DEFAULTS, d)),
        (this.isLoading = !1);
    };
    (c.VERSION = "3.2.0"),
      (c.DEFAULTS = { loadingText: "loading..." }),
      (c.prototype.setState = function (b) {
        var c = "disabled",
          d = this.$element,
          e = d.is("input") ? "val" : "html",
          f = d.data();
        (b += "Text"),
          null == f.resetText && d.data("resetText", d[e]()),
          d[e](null == f[b] ? this.options[b] : f[b]),
          setTimeout(
            a.proxy(function () {
              "loadingText" == b
                ? ((this.isLoading = !0), d.addClass(c).attr(c, c))
                : this.isLoading &&
                  ((this.isLoading = !1), d.removeClass(c).removeAttr(c));
            }, this),
            0
          );
      }),
      (c.prototype.toggle = function () {
        var a = !0,
          b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
          var c = this.$element.find("input");
          "radio" == c.prop("type") &&
            (c.prop("checked") && this.$element.hasClass("active")
              ? (a = !1)
              : b.find(".active").removeClass("active")),
            a &&
              c
                .prop("checked", !this.$element.hasClass("active"))
                .trigger("change");
        }
        a && this.$element.toggleClass("active");
      });
    var d = a.fn.button;
    (a.fn.button = b),
      (a.fn.button.Constructor = c),
      (a.fn.button.noConflict = function () {
        return (a.fn.button = d), this;
      }),
      a(document).on(
        "click.bs.button.data-api",
        '[data-toggle^="button"]',
        function (c) {
          var d = a(c.target);
          d.hasClass("btn") || (d = d.closest(".btn")),
            b.call(d, "toggle"),
            c.preventDefault();
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.carousel"),
          f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
          g = "string" == typeof b ? b : f.slide;
        e || d.data("bs.carousel", (e = new c(this, f))),
          "number" == typeof b
            ? e.to(b)
            : g
            ? e[g]()
            : f.interval && e.pause().cycle();
      });
    }
    var c = function (b, c) {
      (this.$element = a(b).on(
        "keydown.bs.carousel",
        a.proxy(this.keydown, this)
      )),
        (this.$indicators = this.$element.find(".carousel-indicators")),
        (this.options = c),
        (this.paused =
          this.sliding =
          this.interval =
          this.$active =
          this.$items =
            null),
        "hover" == this.options.pause &&
          this.$element
            .on("mouseenter.bs.carousel", a.proxy(this.pause, this))
            .on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
    };
    (c.VERSION = "3.2.0"),
      (c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0 }),
      (c.prototype.keydown = function (a) {
        switch (a.which) {
          case 37:
            this.prev();
            break;
          case 39:
            this.next();
            break;
          default:
            return;
        }
        a.preventDefault();
      }),
      (c.prototype.cycle = function (b) {
        return (
          b || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              a.proxy(this.next, this),
              this.options.interval
            )),
          this
        );
      }),
      (c.prototype.getItemIndex = function (a) {
        return (
          (this.$items = a.parent().children(".item")),
          this.$items.index(a || this.$active)
        );
      }),
      (c.prototype.to = function (b) {
        var c = this,
          d = this.getItemIndex(
            (this.$active = this.$element.find(".item.active"))
          );
        return b > this.$items.length - 1 || 0 > b
          ? void 0
          : this.sliding
          ? this.$element.one("slid.bs.carousel", function () {
              c.to(b);
            })
          : d == b
          ? this.pause().cycle()
          : this.slide(b > d ? "next" : "prev", a(this.$items[b]));
      }),
      (c.prototype.pause = function (b) {
        return (
          b || (this.paused = !0),
          this.$element.find(".next, .prev").length &&
            a.support.transition &&
            (this.$element.trigger(a.support.transition.end), this.cycle(!0)),
          (this.interval = clearInterval(this.interval)),
          this
        );
      }),
      (c.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next");
      }),
      (c.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev");
      }),
      (c.prototype.slide = function (b, c) {
        var d = this.$element.find(".item.active"),
          e = c || d[b](),
          f = this.interval,
          g = "next" == b ? "left" : "right",
          h = "next" == b ? "first" : "last",
          i = this;
        if (!e.length) {
          if (!this.options.wrap) return;
          e = this.$element.find(".item")[h]();
        }
        if (e.hasClass("active")) return (this.sliding = !1);
        var j = e[0],
          k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: g });
        if ((this.$element.trigger(k), !k.isDefaultPrevented())) {
          if (
            ((this.sliding = !0), f && this.pause(), this.$indicators.length)
          ) {
            this.$indicators.find(".active").removeClass("active");
            var l = a(this.$indicators.children()[this.getItemIndex(e)]);
            l && l.addClass("active");
          }
          var m = a.Event("slid.bs.carousel", {
            relatedTarget: j,
            direction: g,
          });
          return (
            a.support.transition && this.$element.hasClass("slide")
              ? (e.addClass(b),
                e[0].offsetWidth,
                d.addClass(g),
                e.addClass(g),
                d
                  .one("bsTransitionEnd", function () {
                    e.removeClass([b, g].join(" ")).addClass("active"),
                      d.removeClass(["active", g].join(" ")),
                      (i.sliding = !1),
                      setTimeout(function () {
                        i.$element.trigger(m);
                      }, 0);
                  })
                  .emulateTransitionEnd(
                    1e3 * d.css("transition-duration").slice(0, -1)
                  ))
              : (d.removeClass("active"),
                e.addClass("active"),
                (this.sliding = !1),
                this.$element.trigger(m)),
            f && this.cycle(),
            this
          );
        }
      });
    var d = a.fn.carousel;
    (a.fn.carousel = b),
      (a.fn.carousel.Constructor = c),
      (a.fn.carousel.noConflict = function () {
        return (a.fn.carousel = d), this;
      }),
      a(document).on(
        "click.bs.carousel.data-api",
        "[data-slide], [data-slide-to]",
        function (c) {
          var d,
            e = a(this),
            f = a(
              e.attr("data-target") ||
                ((d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""))
            );
          if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
              h = e.attr("data-slide-to");
            h && (g.interval = !1),
              b.call(f, g),
              h && f.data("bs.carousel").to(h),
              c.preventDefault();
          }
        }
      ),
      a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
          var c = a(this);
          b.call(c, c.data());
        });
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.collapse"),
          f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b);
        !e && f.toggle && "show" == b && (b = !b),
          e || d.data("bs.collapse", (e = new c(this, f))),
          "string" == typeof b && e[b]();
      });
    }
    var c = function (b, d) {
      (this.$element = a(b)),
        (this.options = a.extend({}, c.DEFAULTS, d)),
        (this.transitioning = null),
        this.options.parent && (this.$parent = a(this.options.parent)),
        this.options.toggle && this.toggle();
    };
    (c.VERSION = "3.2.0"),
      (c.DEFAULTS = { toggle: !0 }),
      (c.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
      }),
      (c.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var c = a.Event("show.bs.collapse");
          if ((this.$element.trigger(c), !c.isDefaultPrevented())) {
            var d = this.$parent && this.$parent.find("> .panel > .in");
            if (d && d.length) {
              var e = d.data("bs.collapse");
              if (e && e.transitioning) return;
              b.call(d, "hide"), e || d.data("bs.collapse", null);
            }
            var f = this.dimension();
            this.$element.removeClass("collapse").addClass("collapsing")[f](0),
              (this.transitioning = 1);
            var g = function () {
              this.$element
                .removeClass("collapsing")
                .addClass("collapse in")
                [f](""),
                (this.transitioning = 0),
                this.$element.trigger("shown.bs.collapse");
            };
            if (!a.support.transition) return g.call(this);
            var h = a.camelCase(["scroll", f].join("-"));
            this.$element
              .one("bsTransitionEnd", a.proxy(g, this))
              .emulateTransitionEnd(350)
              [f](this.$element[0][h]);
          }
        }
      }),
      (c.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var b = a.Event("hide.bs.collapse");
          if ((this.$element.trigger(b), !b.isDefaultPrevented())) {
            var c = this.dimension();
            this.$element[c](this.$element[c]())[0].offsetHeight,
              this.$element
                .addClass("collapsing")
                .removeClass("collapse")
                .removeClass("in"),
              (this.transitioning = 1);
            var d = function () {
              (this.transitioning = 0),
                this.$element
                  .trigger("hidden.bs.collapse")
                  .removeClass("collapsing")
                  .addClass("collapse");
            };
            return a.support.transition
              ? void this.$element[c](0)
                  .one("bsTransitionEnd", a.proxy(d, this))
                  .emulateTransitionEnd(350)
              : d.call(this);
          }
        }
      }),
      (c.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      });
    var d = a.fn.collapse;
    (a.fn.collapse = b),
      (a.fn.collapse.Constructor = c),
      (a.fn.collapse.noConflict = function () {
        return (a.fn.collapse = d), this;
      }),
      a(document).on(
        "click.bs.collapse.data-api",
        '[data-toggle="collapse"]',
        function (c) {
          var d,
            e = a(this),
            f =
              e.attr("data-target") ||
              c.preventDefault() ||
              ((d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")),
            g = a(f),
            h = g.data("bs.collapse"),
            i = h ? "toggle" : e.data(),
            j = e.attr("data-parent"),
            k = j && a(j);
          (h && h.transitioning) ||
            (k &&
              k
                .find('[data-toggle="collapse"][data-parent="' + j + '"]')
                .not(e)
                .addClass("collapsed"),
            e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")),
            b.call(g, i);
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      (b && 3 === b.which) ||
        (a(e).remove(),
        a(f).each(function () {
          var d = c(a(this)),
            e = { relatedTarget: this };
          d.hasClass("open") &&
            (d.trigger((b = a.Event("hide.bs.dropdown", e))),
            b.isDefaultPrevented() ||
              d.removeClass("open").trigger("hidden.bs.dropdown", e));
        }));
    }
    function c(b) {
      var c = b.attr("data-target");
      c ||
        ((c = b.attr("href")),
        (c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")));
      var d = c && a(c);
      return d && d.length ? d : b.parent();
    }
    function d(b) {
      return this.each(function () {
        var c = a(this),
          d = c.data("bs.dropdown");
        d || c.data("bs.dropdown", (d = new g(this))),
          "string" == typeof b && d[b].call(c);
      });
    }
    var e = ".dropdown-backdrop",
      f = '[data-toggle="dropdown"]',
      g = function (b) {
        a(b).on("click.bs.dropdown", this.toggle);
      };
    (g.VERSION = "3.2.0"),
      (g.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
          var f = c(e),
            g = f.hasClass("open");
          if ((b(), !g)) {
            "ontouchstart" in document.documentElement &&
              !f.closest(".navbar-nav").length &&
              a('<div class="dropdown-backdrop"/>')
                .insertAfter(a(this))
                .on("click", b);
            var h = { relatedTarget: this };
            if (
              (f.trigger((d = a.Event("show.bs.dropdown", h))),
              d.isDefaultPrevented())
            )
              return;
            e.trigger("focus"),
              f.toggleClass("open").trigger("shown.bs.dropdown", h);
          }
          return !1;
        }
      }),
      (g.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
          var d = a(this);
          if (
            (b.preventDefault(),
            b.stopPropagation(),
            !d.is(".disabled, :disabled"))
          ) {
            var e = c(d),
              g = e.hasClass("open");
            if (!g || (g && 27 == b.keyCode))
              return (
                27 == b.which && e.find(f).trigger("focus"), d.trigger("click")
              );
            var h = " li:not(.divider):visible a",
              i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
            if (i.length) {
              var j = i.index(i.filter(":focus"));
              38 == b.keyCode && j > 0 && j--,
                40 == b.keyCode && j < i.length - 1 && j++,
                ~j || (j = 0),
                i.eq(j).trigger("focus");
            }
          }
        }
      });
    var h = a.fn.dropdown;
    (a.fn.dropdown = d),
      (a.fn.dropdown.Constructor = g),
      (a.fn.dropdown.noConflict = function () {
        return (a.fn.dropdown = h), this;
      }),
      a(document)
        .on("click.bs.dropdown.data-api", b)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
          a.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", f, g.prototype.toggle)
        .on(
          "keydown.bs.dropdown.data-api",
          f + ', [role="menu"], [role="listbox"]',
          g.prototype.keydown
        );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b, d) {
      return this.each(function () {
        var e = a(this),
          f = e.data("bs.modal"),
          g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
        f || e.data("bs.modal", (f = new c(this, g))),
          "string" == typeof b ? f[b](d) : g.show && f.show(d);
      });
    }
    var c = function (b, c) {
      (this.options = c),
        (this.$body = a(document.body)),
        (this.$element = a(b)),
        (this.$backdrop = this.isShown = null),
        (this.scrollbarWidth = 0),
        this.options.remote &&
          this.$element.find(".modal-content").load(
            this.options.remote,
            a.proxy(function () {
              this.$element.trigger("loaded.bs.modal");
            }, this)
          );
    };
    (c.VERSION = "3.2.0"),
      (c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
      (c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a);
      }),
      (c.prototype.show = function (b) {
        var c = this,
          d = a.Event("show.bs.modal", { relatedTarget: b });
        this.$element.trigger(d),
          this.isShown ||
            d.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.checkScrollbar(),
            this.$body.addClass("modal-open"),
            this.setScrollbar(),
            this.escape(),
            this.$element.on(
              "click.dismiss.bs.modal",
              '[data-dismiss="modal"]',
              a.proxy(this.hide, this)
            ),
            this.backdrop(function () {
              var d = a.support.transition && c.$element.hasClass("fade");
              c.$element.parent().length || c.$element.appendTo(c.$body),
                c.$element.show().scrollTop(0),
                d && c.$element[0].offsetWidth,
                c.$element.addClass("in").attr("aria-hidden", !1),
                c.enforceFocus();
              var e = a.Event("shown.bs.modal", { relatedTarget: b });
              d
                ? c.$element
                    .find(".modal-dialog")
                    .one("bsTransitionEnd", function () {
                      c.$element.trigger("focus").trigger(e);
                    })
                    .emulateTransitionEnd(300)
                : c.$element.trigger("focus").trigger(e);
            }));
      }),
      (c.prototype.hide = function (b) {
        b && b.preventDefault(),
          (b = a.Event("hide.bs.modal")),
          this.$element.trigger(b),
          this.isShown &&
            !b.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.$body.removeClass("modal-open"),
            this.resetScrollbar(),
            this.escape(),
            a(document).off("focusin.bs.modal"),
            this.$element
              .removeClass("in")
              .attr("aria-hidden", !0)
              .off("click.dismiss.bs.modal"),
            a.support.transition && this.$element.hasClass("fade")
              ? this.$element
                  .one("bsTransitionEnd", a.proxy(this.hideModal, this))
                  .emulateTransitionEnd(300)
              : this.hideModal());
      }),
      (c.prototype.enforceFocus = function () {
        a(document)
          .off("focusin.bs.modal")
          .on(
            "focusin.bs.modal",
            a.proxy(function (a) {
              this.$element[0] === a.target ||
                this.$element.has(a.target).length ||
                this.$element.trigger("focus");
            }, this)
          );
      }),
      (c.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              "keyup.dismiss.bs.modal",
              a.proxy(function (a) {
                27 == a.which && this.hide();
              }, this)
            )
          : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
      }),
      (c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(),
          this.backdrop(function () {
            a.$element.trigger("hidden.bs.modal");
          });
      }),
      (c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      }),
      (c.prototype.backdrop = function (b) {
        var c = this,
          d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
          var e = a.support.transition && d;
          if (
            ((this.$backdrop = a(
              '<div class="modal-backdrop ' + d + '" />'
            ).appendTo(this.$body)),
            this.$element.on(
              "click.dismiss.bs.modal",
              a.proxy(function (a) {
                a.target === a.currentTarget &&
                  ("static" == this.options.backdrop
                    ? this.$element[0].focus.call(this.$element[0])
                    : this.hide.call(this));
              }, this)
            ),
            e && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !b)
          )
            return;
          e
            ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(150)
            : b();
        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass("in");
          var f = function () {
            c.removeBackdrop(), b && b();
          };
          a.support.transition && this.$element.hasClass("fade")
            ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(150)
            : f();
        } else b && b();
      }),
      (c.prototype.checkScrollbar = function () {
        document.body.clientWidth >= window.innerWidth ||
          (this.scrollbarWidth =
            this.scrollbarWidth || this.measureScrollbar());
      }),
      (c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth &&
          this.$body.css("padding-right", a + this.scrollbarWidth);
      }),
      (c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "");
      }),
      (c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        (a.className = "modal-scrollbar-measure"), this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b;
      });
    var d = a.fn.modal;
    (a.fn.modal = b),
      (a.fn.modal.Constructor = c),
      (a.fn.modal.noConflict = function () {
        return (a.fn.modal = d), this;
      }),
      a(document).on(
        "click.bs.modal.data-api",
        '[data-toggle="modal"]',
        function (c) {
          var d = a(this),
            e = d.attr("href"),
            f = a(
              d.attr("data-target") || (e && e.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            g = f.data("bs.modal")
              ? "toggle"
              : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());
          d.is("a") && c.preventDefault(),
            f.one("show.bs.modal", function (a) {
              a.isDefaultPrevented() ||
                f.one("hidden.bs.modal", function () {
                  d.is(":visible") && d.trigger("focus");
                });
            }),
            b.call(f, g, this);
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.tooltip"),
          f = "object" == typeof b && b;
        (e || "destroy" != b) &&
          (e || d.data("bs.tooltip", (e = new c(this, f))),
          "string" == typeof b && e[b]());
      });
    }
    var c = function (a, b) {
      (this.type =
        this.options =
        this.enabled =
        this.timeout =
        this.hoverState =
        this.$element =
          null),
        this.init("tooltip", a, b);
    };
    (c.VERSION = "3.2.0"),
      (c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: "body", padding: 0 },
      }),
      (c.prototype.init = function (b, c, d) {
        (this.enabled = !0),
          (this.type = b),
          (this.$element = a(c)),
          (this.options = this.getOptions(d)),
          (this.$viewport =
            this.options.viewport &&
            a(this.options.viewport.selector || this.options.viewport));
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
          var g = e[f];
          if ("click" == g)
            this.$element.on(
              "click." + this.type,
              this.options.selector,
              a.proxy(this.toggle, this)
            );
          else if ("manual" != g) {
            var h = "hover" == g ? "mouseenter" : "focusin",
              i = "hover" == g ? "mouseleave" : "focusout";
            this.$element.on(
              h + "." + this.type,
              this.options.selector,
              a.proxy(this.enter, this)
            ),
              this.$element.on(
                i + "." + this.type,
                this.options.selector,
                a.proxy(this.leave, this)
              );
          }
        }
        this.options.selector
          ? (this._options = a.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      }),
      (c.prototype.getDefaults = function () {
        return c.DEFAULTS;
      }),
      (c.prototype.getOptions = function (b) {
        return (
          (b = a.extend({}, this.getDefaults(), this.$element.data(), b)),
          b.delay &&
            "number" == typeof b.delay &&
            (b.delay = { show: b.delay, hide: b.delay }),
          b
        );
      }),
      (c.prototype.getDelegateOptions = function () {
        var b = {},
          c = this.getDefaults();
        return (
          this._options &&
            a.each(this._options, function (a, d) {
              c[a] != d && (b[a] = d);
            }),
          b
        );
      }),
      (c.prototype.enter = function (b) {
        var c =
          b instanceof this.constructor
            ? b
            : a(b.currentTarget).data("bs." + this.type);
        return (
          c ||
            ((c = new this.constructor(
              b.currentTarget,
              this.getDelegateOptions()
            )),
            a(b.currentTarget).data("bs." + this.type, c)),
          clearTimeout(c.timeout),
          (c.hoverState = "in"),
          c.options.delay && c.options.delay.show
            ? void (c.timeout = setTimeout(function () {
                "in" == c.hoverState && c.show();
              }, c.options.delay.show))
            : c.show()
        );
      }),
      (c.prototype.leave = function (b) {
        var c =
          b instanceof this.constructor
            ? b
            : a(b.currentTarget).data("bs." + this.type);
        return (
          c ||
            ((c = new this.constructor(
              b.currentTarget,
              this.getDelegateOptions()
            )),
            a(b.currentTarget).data("bs." + this.type, c)),
          clearTimeout(c.timeout),
          (c.hoverState = "out"),
          c.options.delay && c.options.delay.hide
            ? void (c.timeout = setTimeout(function () {
                "out" == c.hoverState && c.hide();
              }, c.options.delay.hide))
            : c.hide()
        );
      }),
      (c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(b);
          var c = a.contains(document.documentElement, this.$element[0]);
          if (b.isDefaultPrevented() || !c) return;
          var d = this,
            e = this.tip(),
            f = this.getUID(this.type);
          this.setContent(),
            e.attr("id", f),
            this.$element.attr("aria-describedby", f),
            this.options.animation && e.addClass("fade");
          var g =
              "function" == typeof this.options.placement
                ? this.options.placement.call(this, e[0], this.$element[0])
                : this.options.placement,
            h = /\s?auto?\s?/i,
            i = h.test(g);
          i && (g = g.replace(h, "") || "top"),
            e
              .detach()
              .css({ top: 0, left: 0, display: "block" })
              .addClass(g)
              .data("bs." + this.type, this),
            this.options.container
              ? e.appendTo(this.options.container)
              : e.insertAfter(this.$element);
          var j = this.getPosition(),
            k = e[0].offsetWidth,
            l = e[0].offsetHeight;
          if (i) {
            var m = g,
              n = this.$element.parent(),
              o = this.getPosition(n);
            (g =
              "bottom" == g && j.top + j.height + l - o.scroll > o.height
                ? "top"
                : "top" == g && j.top - o.scroll - l < 0
                ? "bottom"
                : "right" == g && j.right + k > o.width
                ? "left"
                : "left" == g && j.left - k < o.left
                ? "right"
                : g),
              e.removeClass(m).addClass(g);
          }
          var p = this.getCalculatedOffset(g, j, k, l);
          this.applyPlacement(p, g);
          var q = function () {
            d.$element.trigger("shown.bs." + d.type), (d.hoverState = null);
          };
          a.support.transition && this.$tip.hasClass("fade")
            ? e.one("bsTransitionEnd", q).emulateTransitionEnd(150)
            : q();
        }
      }),
      (c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(),
          e = d[0].offsetWidth,
          f = d[0].offsetHeight,
          g = parseInt(d.css("margin-top"), 10),
          h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0),
          isNaN(h) && (h = 0),
          (b.top = b.top + g),
          (b.left = b.left + h),
          a.offset.setOffset(
            d[0],
            a.extend(
              {
                using: function (a) {
                  d.css({ top: Math.round(a.top), left: Math.round(a.left) });
                },
              },
              b
            ),
            0
          ),
          d.addClass("in");
        var i = d[0].offsetWidth,
          j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? (b.left += k.left) : (b.top += k.top);
        var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j,
          m = k.left ? "left" : "top",
          n = k.left ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(l, d[0][n], m);
      }),
      (c.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "");
      }),
      (c.prototype.setContent = function () {
        var a = this.tip(),
          b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b),
          a.removeClass("fade in top bottom left right");
      }),
      (c.prototype.hide = function () {
        function b() {
          "in" != c.hoverState && d.detach(),
            c.$element.trigger("hidden.bs." + c.type);
        }
        var c = this,
          d = this.tip(),
          e = a.Event("hide.bs." + this.type);
        return (
          this.$element.removeAttr("aria-describedby"),
          this.$element.trigger(e),
          e.isDefaultPrevented()
            ? void 0
            : (d.removeClass("in"),
              a.support.transition && this.$tip.hasClass("fade")
                ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150)
                : b(),
              (this.hoverState = null),
              this)
        );
      }),
      (c.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) &&
          a
            .attr("data-original-title", a.attr("title") || "")
            .attr("title", "");
      }),
      (c.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var c = b[0],
          d = "BODY" == c.tagName;
        return a.extend(
          {},
          "function" == typeof c.getBoundingClientRect
            ? c.getBoundingClientRect()
            : null,
          {
            scroll: d
              ? document.documentElement.scrollTop || document.body.scrollTop
              : b.scrollTop(),
            width: d ? a(window).width() : b.outerWidth(),
            height: d ? a(window).height() : b.outerHeight(),
          },
          d ? { top: 0, left: 0 } : b.offset()
        );
      }),
      (c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a
          ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 }
          : "top" == a
          ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 }
          : "left" == a
          ? { top: b.top + b.height / 2 - d / 2, left: b.left - c }
          : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
      }),
      (c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = { top: 0, left: 0 };
        if (!this.$viewport) return e;
        var f = (this.options.viewport && this.options.viewport.padding) || 0,
          g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
          var h = b.top - f - g.scroll,
            i = b.top + f - g.scroll + d;
          h < g.top
            ? (e.top = g.top - h)
            : i > g.top + g.height && (e.top = g.top + g.height - i);
        } else {
          var j = b.left - f,
            k = b.left + f + c;
          j < g.left
            ? (e.left = g.left - j)
            : k > g.width && (e.left = g.left + g.width - k);
        }
        return e;
      }),
      (c.prototype.getTitle = function () {
        var a,
          b = this.$element,
          c = this.options;
        return (a =
          b.attr("data-original-title") ||
          ("function" == typeof c.title ? c.title.call(b[0]) : c.title));
      }),
      (c.prototype.getUID = function (a) {
        do a += ~~(1e6 * Math.random());
        while (document.getElementById(a));
        return a;
      }),
      (c.prototype.tip = function () {
        return (this.$tip = this.$tip || a(this.options.template));
      }),
      (c.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      }),
      (c.prototype.validate = function () {
        this.$element[0].parentNode ||
          (this.hide(), (this.$element = null), (this.options = null));
      }),
      (c.prototype.enable = function () {
        this.enabled = !0;
      }),
      (c.prototype.disable = function () {
        this.enabled = !1;
      }),
      (c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (c.prototype.toggle = function (b) {
        var c = this;
        b &&
          ((c = a(b.currentTarget).data("bs." + this.type)),
          c ||
            ((c = new this.constructor(
              b.currentTarget,
              this.getDelegateOptions()
            )),
            a(b.currentTarget).data("bs." + this.type, c))),
          c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
      }),
      (c.prototype.destroy = function () {
        clearTimeout(this.timeout),
          this.hide()
            .$element.off("." + this.type)
            .removeData("bs." + this.type);
      });
    var d = a.fn.tooltip;
    (a.fn.tooltip = b),
      (a.fn.tooltip.Constructor = c),
      (a.fn.tooltip.noConflict = function () {
        return (a.fn.tooltip = d), this;
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.popover"),
          f = "object" == typeof b && b;
        (e || "destroy" != b) &&
          (e || d.data("bs.popover", (e = new c(this, f))),
          "string" == typeof b && e[b]());
      });
    }
    var c = function (a, b) {
      this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    (c.VERSION = "3.2.0"),
      (c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      })),
      (c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype)),
      (c.prototype.constructor = c),
      (c.prototype.getDefaults = function () {
        return c.DEFAULTS;
      }),
      (c.prototype.setContent = function () {
        var a = this.tip(),
          b = this.getTitle(),
          c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b),
          a
            .find(".popover-content")
            .empty()
            [
              this.options.html
                ? "string" == typeof c
                  ? "html"
                  : "append"
                : "text"
            ](c),
          a.removeClass("fade top bottom left right in"),
          a.find(".popover-title").html() || a.find(".popover-title").hide();
      }),
      (c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (c.prototype.getContent = function () {
        var a = this.$element,
          b = this.options;
        return (
          a.attr("data-content") ||
          ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
        );
      }),
      (c.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
      }),
      (c.prototype.tip = function () {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip;
      });
    var d = a.fn.popover;
    (a.fn.popover = b),
      (a.fn.popover.Constructor = c),
      (a.fn.popover.noConflict = function () {
        return (a.fn.popover = d), this;
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(c, d) {
      var e = a.proxy(this.process, this);
      (this.$body = a("body")),
        (this.$scrollElement = a(a(c).is("body") ? window : c)),
        (this.options = a.extend({}, b.DEFAULTS, d)),
        (this.selector = (this.options.target || "") + " .nav li > a"),
        (this.offsets = []),
        (this.targets = []),
        (this.activeTarget = null),
        (this.scrollHeight = 0),
        this.$scrollElement.on("scroll.bs.scrollspy", e),
        this.refresh(),
        this.process();
    }
    function c(c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.scrollspy"),
          f = "object" == typeof c && c;
        e || d.data("bs.scrollspy", (e = new b(this, f))),
          "string" == typeof c && e[c]();
      });
    }
    (b.VERSION = "3.2.0"),
      (b.DEFAULTS = { offset: 10 }),
      (b.prototype.getScrollHeight = function () {
        return (
          this.$scrollElement[0].scrollHeight ||
          Math.max(
            this.$body[0].scrollHeight,
            document.documentElement.scrollHeight
          )
        );
      }),
      (b.prototype.refresh = function () {
        var b = "offset",
          c = 0;
        a.isWindow(this.$scrollElement[0]) ||
          ((b = "position"), (c = this.$scrollElement.scrollTop())),
          (this.offsets = []),
          (this.targets = []),
          (this.scrollHeight = this.getScrollHeight());
        var d = this;
        this.$body
          .find(this.selector)
          .map(function () {
            var d = a(this),
              e = d.data("target") || d.attr("href"),
              f = /^#./.test(e) && a(e);
            return (
              (f && f.length && f.is(":visible") && [[f[b]().top + c, e]]) ||
              null
            );
          })
          .sort(function (a, b) {
            return a[0] - b[0];
          })
          .each(function () {
            d.offsets.push(this[0]), d.targets.push(this[1]);
          });
      }),
      (b.prototype.process = function () {
        var a,
          b = this.$scrollElement.scrollTop() + this.options.offset,
          c = this.getScrollHeight(),
          d = this.options.offset + c - this.$scrollElement.height(),
          e = this.offsets,
          f = this.targets,
          g = this.activeTarget;
        if ((this.scrollHeight != c && this.refresh(), b >= d))
          return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--; )
          g != f[a] &&
            b >= e[a] &&
            (!e[a + 1] || b <= e[a + 1]) &&
            this.activate(f[a]);
      }),
      (b.prototype.activate = function (b) {
        (this.activeTarget = b),
          a(this.selector)
            .parentsUntil(this.options.target, ".active")
            .removeClass("active");
        var c =
            this.selector +
            '[data-target="' +
            b +
            '"],' +
            this.selector +
            '[href="' +
            b +
            '"]',
          d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length &&
          (d = d.closest("li.dropdown").addClass("active")),
          d.trigger("activate.bs.scrollspy");
      });
    var d = a.fn.scrollspy;
    (a.fn.scrollspy = c),
      (a.fn.scrollspy.Constructor = b),
      (a.fn.scrollspy.noConflict = function () {
        return (a.fn.scrollspy = d), this;
      }),
      a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
          var b = a(this);
          c.call(b, b.data());
        });
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.tab");
        e || d.data("bs.tab", (e = new c(this))),
          "string" == typeof b && e[b]();
      });
    }
    var c = function (b) {
      this.element = a(b);
    };
    (c.VERSION = "3.2.0"),
      (c.prototype.show = function () {
        var b = this.element,
          c = b.closest("ul:not(.dropdown-menu)"),
          d = b.data("target");
        if (
          (d ||
            ((d = b.attr("href")), (d = d && d.replace(/.*(?=#[^\s]*$)/, ""))),
          !b.parent("li").hasClass("active"))
        ) {
          var e = c.find(".active:last a")[0],
            f = a.Event("show.bs.tab", { relatedTarget: e });
          if ((b.trigger(f), !f.isDefaultPrevented())) {
            var g = a(d);
            this.activate(b.closest("li"), c),
              this.activate(g, g.parent(), function () {
                b.trigger({ type: "shown.bs.tab", relatedTarget: e });
              });
          }
        }
      }),
      (c.prototype.activate = function (b, c, d) {
        function e() {
          f
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active"),
            b.addClass("active"),
            g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"),
            b.parent(".dropdown-menu") &&
              b.closest("li.dropdown").addClass("active"),
            d && d();
        }
        var f = c.find("> .active"),
          g = d && a.support.transition && f.hasClass("fade");
        g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(),
          f.removeClass("in");
      });
    var d = a.fn.tab;
    (a.fn.tab = b),
      (a.fn.tab.Constructor = c),
      (a.fn.tab.noConflict = function () {
        return (a.fn.tab = d), this;
      }),
      a(document).on(
        "click.bs.tab.data-api",
        '[data-toggle="tab"], [data-toggle="pill"]',
        function (c) {
          c.preventDefault(), b.call(a(this), "show");
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.affix"),
          f = "object" == typeof b && b;
        e || d.data("bs.affix", (e = new c(this, f))),
          "string" == typeof b && e[b]();
      });
    }
    var c = function (b, d) {
      (this.options = a.extend({}, c.DEFAULTS, d)),
        (this.$target = a(this.options.target)
          .on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this))
          .on(
            "click.bs.affix.data-api",
            a.proxy(this.checkPositionWithEventLoop, this)
          )),
        (this.$element = a(b)),
        (this.affixed = this.unpin = this.pinnedOffset = null),
        this.checkPosition();
    };
    (c.VERSION = "3.2.0"),
      (c.RESET = "affix affix-top affix-bottom"),
      (c.DEFAULTS = { offset: 0, target: window }),
      (c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
          b = this.$element.offset();
        return (this.pinnedOffset = b.top - a);
      }),
      (c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1);
      }),
      (c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
          var b = a(document).height(),
            d = this.$target.scrollTop(),
            e = this.$element.offset(),
            f = this.options.offset,
            g = f.top,
            h = f.bottom;
          "object" != typeof f && (h = g = f),
            "function" == typeof g && (g = f.top(this.$element)),
            "function" == typeof h && (h = f.bottom(this.$element));
          var i =
            !(null != this.unpin && d + this.unpin <= e.top) &&
            (null != h && e.top + this.$element.height() >= b - h
              ? "bottom"
              : null != g && g >= d && "top");
          if (this.affixed !== i) {
            null != this.unpin && this.$element.css("top", "");
            var j = "affix" + (i ? "-" + i : ""),
              k = a.Event(j + ".bs.affix");
            this.$element.trigger(k),
              k.isDefaultPrevented() ||
                ((this.affixed = i),
                (this.unpin = "bottom" == i ? this.getPinnedOffset() : null),
                this.$element
                  .removeClass(c.RESET)
                  .addClass(j)
                  .trigger(a.Event(j.replace("affix", "affixed"))),
                "bottom" == i &&
                  this.$element.offset({
                    top: b - this.$element.height() - h,
                  }));
          }
        }
      });
    var d = a.fn.affix;
    (a.fn.affix = b),
      (a.fn.affix.Constructor = c),
      (a.fn.affix.noConflict = function () {
        return (a.fn.affix = d), this;
      }),
      a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
          var c = a(this),
            d = c.data();
          (d.offset = d.offset || {}),
            d.offsetBottom && (d.offset.bottom = d.offsetBottom),
            d.offsetTop && (d.offset.top = d.offsetTop),
            b.call(c, d);
        });
      });
  })(jQuery),
  (function (a) {
    a.fn.v_bind = function (a) {
      var b = this;
      for (var c in a) {
        var d = b.find(c),
          e = d.prop("tagName");
        "INPUT" == e || "SELECT" == e ? d.val(a[c]) : d.html(a[c]);
      }
    };
  })(jQuery);
var CryptoJS =
  CryptoJS ||
  (function (a, b) {
    var c = {},
      d = (c.lib = {}),
      e = function () {},
      f = (d.Base = {
        extend: function (a) {
          e.prototype = this;
          var b = new e();
          return (
            a && b.mixIn(a),
            b.hasOwnProperty("init") ||
              (b.init = function () {
                b.$super.init.apply(this, arguments);
              }),
            (b.init.prototype = b),
            (b.$super = this),
            b
          );
        },
        create: function () {
          var a = this.extend();
          return a.init.apply(a, arguments), a;
        },
        init: function () {},
        mixIn: function (a) {
          for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function () {
          return this.init.prototype.extend(this);
        },
      }),
      g = (d.WordArray = f.extend({
        init: function (a, c) {
          (a = this.words = a || []),
            (this.sigBytes = c != b ? c : 4 * a.length);
        },
        toString: function (a) {
          return (a || i).stringify(this);
        },
        concat: function (a) {
          var b = this.words,
            c = a.words,
            d = this.sigBytes;
          if (((a = a.sigBytes), this.clamp(), d % 4))
            for (var e = 0; e < a; e++)
              b[(d + e) >>> 2] |=
                ((c[e >>> 2] >>> (24 - 8 * (e % 4))) & 255) <<
                (24 - 8 * ((d + e) % 4));
          else if (65535 < c.length)
            for (e = 0; e < a; e += 4) b[(d + e) >>> 2] = c[e >>> 2];
          else b.push.apply(b, c);
          return (this.sigBytes += a), this;
        },
        clamp: function () {
          var b = this.words,
            c = this.sigBytes;
          (b[c >>> 2] &= 4294967295 << (32 - 8 * (c % 4))),
            (b.length = a.ceil(c / 4));
        },
        clone: function () {
          var a = f.clone.call(this);
          return (a.words = this.words.slice(0)), a;
        },
        random: function (b) {
          for (var c = [], d = 0; d < b; d += 4)
            c.push((4294967296 * a.random()) | 0);
          return new g.init(c, b);
        },
      })),
      h = (c.enc = {}),
      i = (h.Hex = {
        stringify: function (a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], d = 0; d < a; d++) {
            var e = (b[d >>> 2] >>> (24 - 8 * (d % 4))) & 255;
            c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16));
          }
          return c.join("");
        },
        parse: function (a) {
          for (var b = a.length, c = [], d = 0; d < b; d += 2)
            c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << (24 - 4 * (d % 8));
          return new g.init(c, b / 2);
        },
      }),
      j = (h.Latin1 = {
        stringify: function (a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], d = 0; d < a; d++)
            c.push(
              String.fromCharCode((b[d >>> 2] >>> (24 - 8 * (d % 4))) & 255)
            );
          return c.join("");
        },
        parse: function (a) {
          for (var b = a.length, c = [], d = 0; d < b; d++)
            c[d >>> 2] |= (255 & a.charCodeAt(d)) << (24 - 8 * (d % 4));
          return new g.init(c, b);
        },
      }),
      k = (h.Utf8 = {
        stringify: function (a) {
          try {
            return decodeURIComponent(escape(j.stringify(a)));
          } catch (a) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function (a) {
          return j.parse(unescape(encodeURIComponent(a)));
        },
      }),
      l = (d.BufferedBlockAlgorithm = f.extend({
        reset: function () {
          (this._data = new g.init()), (this._nDataBytes = 0);
        },
        _append: function (a) {
          "string" == typeof a && (a = k.parse(a)),
            this._data.concat(a),
            (this._nDataBytes += a.sigBytes);
        },
        _process: function (b) {
          var c = this._data,
            d = c.words,
            e = c.sigBytes,
            f = this.blockSize,
            h = e / (4 * f),
            h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);
          if (((b = h * f), (e = a.min(4 * b, e)), b)) {
            for (var i = 0; i < b; i += f) this._doProcessBlock(d, i);
            (i = d.splice(0, b)), (c.sigBytes -= e);
          }
          return new g.init(i, e);
        },
        clone: function () {
          var a = f.clone.call(this);
          return (a._data = this._data.clone()), a;
        },
        _minBufferSize: 0,
      }));
    d.Hasher = l.extend({
      cfg: f.extend(),
      init: function (a) {
        (this.cfg = this.cfg.extend(a)), this.reset();
      },
      reset: function () {
        l.reset.call(this), this._doReset();
      },
      update: function (a) {
        return this._append(a), this._process(), this;
      },
      finalize: function (a) {
        return a && this._append(a), this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function (a) {
        return function (b, c) {
          return new a.init(c).finalize(b);
        };
      },
      _createHmacHelper: function (a) {
        return function (b, c) {
          return new m.HMAC.init(a, c).finalize(b);
        };
      },
    });
    var m = (c.algo = {});
    return c;
  })(Math);
!(function (a) {
  var b = CryptoJS,
    c = b.lib,
    d = c.Base,
    e = c.WordArray,
    b = (b.x64 = {});
  (b.Word = d.extend({
    init: function (a, b) {
      (this.high = a), (this.low = b);
    },
  })),
    (b.WordArray = d.extend({
      init: function (b, c) {
        (b = this.words = b || []), (this.sigBytes = c != a ? c : 8 * b.length);
      },
      toX32: function () {
        for (var a = this.words, b = a.length, c = [], d = 0; d < b; d++) {
          var f = a[d];
          c.push(f.high), c.push(f.low);
        }
        return e.create(c, this.sigBytes);
      },
      clone: function () {
        for (
          var a = d.clone.call(this),
            b = (a.words = this.words.slice(0)),
            c = b.length,
            e = 0;
          e < c;
          e++
        )
          b[e] = b[e].clone();
        return a;
      },
    }));
})(),
  (function () {
    function a() {
      return e.create.apply(e, arguments);
    }
    for (
      var b = CryptoJS,
        c = b.lib.Hasher,
        d = b.x64,
        e = d.Word,
        f = d.WordArray,
        d = b.algo,
        g = [
          a(1116352408, 3609767458),
          a(1899447441, 602891725),
          a(3049323471, 3964484399),
          a(3921009573, 2173295548),
          a(961987163, 4081628472),
          a(1508970993, 3053834265),
          a(2453635748, 2937671579),
          a(2870763221, 3664609560),
          a(3624381080, 2734883394),
          a(310598401, 1164996542),
          a(607225278, 1323610764),
          a(1426881987, 3590304994),
          a(1925078388, 4068182383),
          a(2162078206, 991336113),
          a(2614888103, 633803317),
          a(3248222580, 3479774868),
          a(3835390401, 2666613458),
          a(4022224774, 944711139),
          a(264347078, 2341262773),
          a(604807628, 2007800933),
          a(770255983, 1495990901),
          a(1249150122, 1856431235),
          a(1555081692, 3175218132),
          a(1996064986, 2198950837),
          a(2554220882, 3999719339),
          a(2821834349, 766784016),
          a(2952996808, 2566594879),
          a(3210313671, 3203337956),
          a(3336571891, 1034457026),
          a(3584528711, 2466948901),
          a(113926993, 3758326383),
          a(338241895, 168717936),
          a(666307205, 1188179964),
          a(773529912, 1546045734),
          a(1294757372, 1522805485),
          a(1396182291, 2643833823),
          a(1695183700, 2343527390),
          a(1986661051, 1014477480),
          a(2177026350, 1206759142),
          a(2456956037, 344077627),
          a(2730485921, 1290863460),
          a(2820302411, 3158454273),
          a(3259730800, 3505952657),
          a(3345764771, 106217008),
          a(3516065817, 3606008344),
          a(3600352804, 1432725776),
          a(4094571909, 1467031594),
          a(275423344, 851169720),
          a(430227734, 3100823752),
          a(506948616, 1363258195),
          a(659060556, 3750685593),
          a(883997877, 3785050280),
          a(958139571, 3318307427),
          a(1322822218, 3812723403),
          a(1537002063, 2003034995),
          a(1747873779, 3602036899),
          a(1955562222, 1575990012),
          a(2024104815, 1125592928),
          a(2227730452, 2716904306),
          a(2361852424, 442776044),
          a(2428436474, 593698344),
          a(2756734187, 3733110249),
          a(3204031479, 2999351573),
          a(3329325298, 3815920427),
          a(3391569614, 3928383900),
          a(3515267271, 566280711),
          a(3940187606, 3454069534),
          a(4118630271, 4000239992),
          a(116418474, 1914138554),
          a(174292421, 2731055270),
          a(289380356, 3203993006),
          a(460393269, 320620315),
          a(685471733, 587496836),
          a(852142971, 1086792851),
          a(1017036298, 365543100),
          a(1126000580, 2618297676),
          a(1288033470, 3409855158),
          a(1501505948, 4234509866),
          a(1607167915, 987167468),
          a(1816402316, 1246189591),
        ],
        h = [],
        i = 0;
      80 > i;
      i++
    )
      h[i] = a();
    (d = d.SHA512 =
      c.extend({
        _doReset: function () {
          this._hash = new f.init([
            new e.init(1779033703, 4089235720),
            new e.init(3144134277, 2227873595),
            new e.init(1013904242, 4271175723),
            new e.init(2773480762, 1595750129),
            new e.init(1359893119, 2917565137),
            new e.init(2600822924, 725511199),
            new e.init(528734635, 4215389547),
            new e.init(1541459225, 327033209),
          ]);
        },
        _doProcessBlock: function (a, b) {
          for (
            var c = this._hash.words,
              d = c[0],
              e = c[1],
              f = c[2],
              i = c[3],
              j = c[4],
              k = c[5],
              l = c[6],
              c = c[7],
              m = d.high,
              n = d.low,
              o = e.high,
              p = e.low,
              q = f.high,
              r = f.low,
              s = i.high,
              t = i.low,
              u = j.high,
              v = j.low,
              w = k.high,
              x = k.low,
              y = l.high,
              z = l.low,
              A = c.high,
              B = c.low,
              C = m,
              D = n,
              E = o,
              F = p,
              G = q,
              H = r,
              I = s,
              J = t,
              K = u,
              L = v,
              M = w,
              N = x,
              O = y,
              P = z,
              Q = A,
              R = B,
              S = 0;
            80 > S;
            S++
          ) {
            var T = h[S];
            if (16 > S)
              var U = (T.high = 0 | a[b + 2 * S]),
                V = (T.low = 0 | a[b + 2 * S + 1]);
            else {
              var U = h[S - 15],
                V = U.high,
                W = U.low,
                U =
                  ((V >>> 1) | (W << 31)) ^ ((V >>> 8) | (W << 24)) ^ (V >>> 7),
                W =
                  ((W >>> 1) | (V << 31)) ^
                  ((W >>> 8) | (V << 24)) ^
                  ((W >>> 7) | (V << 25)),
                X = h[S - 2],
                V = X.high,
                Y = X.low,
                X =
                  ((V >>> 19) | (Y << 13)) ^
                  ((V << 3) | (Y >>> 29)) ^
                  (V >>> 6),
                Y =
                  ((Y >>> 19) | (V << 13)) ^
                  ((Y << 3) | (V >>> 29)) ^
                  ((Y >>> 6) | (V << 26)),
                V = h[S - 7],
                Z = V.high,
                $ = h[S - 16],
                _ = $.high,
                $ = $.low,
                V = W + V.low,
                U = U + Z + (V >>> 0 < W >>> 0 ? 1 : 0),
                V = V + Y,
                U = U + X + (V >>> 0 < Y >>> 0 ? 1 : 0),
                V = V + $,
                U = U + _ + (V >>> 0 < $ >>> 0 ? 1 : 0);
              (T.high = U), (T.low = V);
            }
            var Z = (K & M) ^ (~K & O),
              $ = (L & N) ^ (~L & P),
              T = (C & E) ^ (C & G) ^ (E & G),
              aa = (D & F) ^ (D & H) ^ (F & H),
              W =
                ((C >>> 28) | (D << 4)) ^
                ((C << 30) | (D >>> 2)) ^
                ((C << 25) | (D >>> 7)),
              X =
                ((D >>> 28) | (C << 4)) ^
                ((D << 30) | (C >>> 2)) ^
                ((D << 25) | (C >>> 7)),
              Y = g[S],
              ba = Y.high,
              ca = Y.low,
              Y =
                R +
                (((L >>> 14) | (K << 18)) ^
                  ((L >>> 18) | (K << 14)) ^
                  ((L << 23) | (K >>> 9))),
              _ =
                Q +
                (((K >>> 14) | (L << 18)) ^
                  ((K >>> 18) | (L << 14)) ^
                  ((K << 23) | (L >>> 9))) +
                (Y >>> 0 < R >>> 0 ? 1 : 0),
              Y = Y + $,
              _ = _ + Z + (Y >>> 0 < $ >>> 0 ? 1 : 0),
              Y = Y + ca,
              _ = _ + ba + (Y >>> 0 < ca >>> 0 ? 1 : 0),
              Y = Y + V,
              _ = _ + U + (Y >>> 0 < V >>> 0 ? 1 : 0),
              V = X + aa,
              T = W + T + (V >>> 0 < X >>> 0 ? 1 : 0),
              Q = O,
              R = P,
              O = M,
              P = N,
              M = K,
              N = L,
              L = (J + Y) | 0,
              K = (I + _ + (L >>> 0 < J >>> 0 ? 1 : 0)) | 0,
              I = G,
              J = H,
              G = E,
              H = F,
              E = C,
              F = D,
              D = (Y + V) | 0,
              C = (_ + T + (D >>> 0 < Y >>> 0 ? 1 : 0)) | 0;
          }
          (n = d.low = n + D),
            (d.high = m + C + (n >>> 0 < D >>> 0 ? 1 : 0)),
            (p = e.low = p + F),
            (e.high = o + E + (p >>> 0 < F >>> 0 ? 1 : 0)),
            (r = f.low = r + H),
            (f.high = q + G + (r >>> 0 < H >>> 0 ? 1 : 0)),
            (t = i.low = t + J),
            (i.high = s + I + (t >>> 0 < J >>> 0 ? 1 : 0)),
            (v = j.low = v + L),
            (j.high = u + K + (v >>> 0 < L >>> 0 ? 1 : 0)),
            (x = k.low = x + N),
            (k.high = w + M + (x >>> 0 < N >>> 0 ? 1 : 0)),
            (z = l.low = z + P),
            (l.high = y + O + (z >>> 0 < P >>> 0 ? 1 : 0)),
            (B = c.low = B + R),
            (c.high = A + Q + (B >>> 0 < R >>> 0 ? 1 : 0));
        },
        _doFinalize: function () {
          var a = this._data,
            b = a.words,
            c = 8 * this._nDataBytes,
            d = 8 * a.sigBytes;
          return (
            (b[d >>> 5] |= 128 << (24 - (d % 32))),
            (b[(((d + 128) >>> 10) << 5) + 30] = Math.floor(c / 4294967296)),
            (b[(((d + 128) >>> 10) << 5) + 31] = c),
            (a.sigBytes = 4 * b.length),
            this._process(),
            this._hash.toX32()
          );
        },
        clone: function () {
          var a = c.clone.call(this);
          return (a._hash = this._hash.clone()), a;
        },
        blockSize: 32,
      })),
      (b.SHA512 = c._createHelper(d)),
      (b.HmacSHA512 = c._createHmacHelper(d));
  })();
var CryptoJS =
  CryptoJS ||
  (function (a, b) {
    var c = {},
      d = (c.lib = {}),
      e = function () {},
      f = (d.Base = {
        extend: function (a) {
          e.prototype = this;
          var b = new e();
          return (
            a && b.mixIn(a),
            b.hasOwnProperty("init") ||
              (b.init = function () {
                b.$super.init.apply(this, arguments);
              }),
            (b.init.prototype = b),
            (b.$super = this),
            b
          );
        },
        create: function () {
          var a = this.extend();
          return a.init.apply(a, arguments), a;
        },
        init: function () {},
        mixIn: function (a) {
          for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function () {
          return this.init.prototype.extend(this);
        },
      }),
      g = (d.WordArray = f.extend({
        init: function (a, c) {
          (a = this.words = a || []),
            (this.sigBytes = c != b ? c : 4 * a.length);
        },
        toString: function (a) {
          return (a || i).stringify(this);
        },
        concat: function (a) {
          var b = this.words,
            c = a.words,
            d = this.sigBytes;
          if (((a = a.sigBytes), this.clamp(), d % 4))
            for (var e = 0; e < a; e++)
              b[(d + e) >>> 2] |=
                ((c[e >>> 2] >>> (24 - 8 * (e % 4))) & 255) <<
                (24 - 8 * ((d + e) % 4));
          else if (65535 < c.length)
            for (e = 0; e < a; e += 4) b[(d + e) >>> 2] = c[e >>> 2];
          else b.push.apply(b, c);
          return (this.sigBytes += a), this;
        },
        clamp: function () {
          var b = this.words,
            c = this.sigBytes;
          (b[c >>> 2] &= 4294967295 << (32 - 8 * (c % 4))),
            (b.length = a.ceil(c / 4));
        },
        clone: function () {
          var a = f.clone.call(this);
          return (a.words = this.words.slice(0)), a;
        },
        random: function (b) {
          for (var c = [], d = 0; d < b; d += 4)
            c.push((4294967296 * a.random()) | 0);
          return new g.init(c, b);
        },
      })),
      h = (c.enc = {}),
      i = (h.Hex = {
        stringify: function (a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], d = 0; d < a; d++) {
            var e = (b[d >>> 2] >>> (24 - 8 * (d % 4))) & 255;
            c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16));
          }
          return c.join("");
        },
        parse: function (a) {
          for (var b = a.length, c = [], d = 0; d < b; d += 2)
            c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << (24 - 4 * (d % 8));
          return new g.init(c, b / 2);
        },
      }),
      j = (h.Latin1 = {
        stringify: function (a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], d = 0; d < a; d++)
            c.push(
              String.fromCharCode((b[d >>> 2] >>> (24 - 8 * (d % 4))) & 255)
            );
          return c.join("");
        },
        parse: function (a) {
          for (var b = a.length, c = [], d = 0; d < b; d++)
            c[d >>> 2] |= (255 & a.charCodeAt(d)) << (24 - 8 * (d % 4));
          return new g.init(c, b);
        },
      }),
      k = (h.Utf8 = {
        stringify: function (a) {
          try {
            return decodeURIComponent(escape(j.stringify(a)));
          } catch (a) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function (a) {
          return j.parse(unescape(encodeURIComponent(a)));
        },
      }),
      l = (d.BufferedBlockAlgorithm = f.extend({
        reset: function () {
          (this._data = new g.init()), (this._nDataBytes = 0);
        },
        _append: function (a) {
          "string" == typeof a && (a = k.parse(a)),
            this._data.concat(a),
            (this._nDataBytes += a.sigBytes);
        },
        _process: function (b) {
          var c = this._data,
            d = c.words,
            e = c.sigBytes,
            f = this.blockSize,
            h = e / (4 * f),
            h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);
          if (((b = h * f), (e = a.min(4 * b, e)), b)) {
            for (var i = 0; i < b; i += f) this._doProcessBlock(d, i);
            (i = d.splice(0, b)), (c.sigBytes -= e);
          }
          return new g.init(i, e);
        },
        clone: function () {
          var a = f.clone.call(this);
          return (a._data = this._data.clone()), a;
        },
        _minBufferSize: 0,
      }));
    d.Hasher = l.extend({
      cfg: f.extend(),
      init: function (a) {
        (this.cfg = this.cfg.extend(a)), this.reset();
      },
      reset: function () {
        l.reset.call(this), this._doReset();
      },
      update: function (a) {
        return this._append(a), this._process(), this;
      },
      finalize: function (a) {
        return a && this._append(a), this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function (a) {
        return function (b, c) {
          return new a.init(c).finalize(b);
        };
      },
      _createHmacHelper: function (a) {
        return function (b, c) {
          return new m.HMAC.init(a, c).finalize(b);
        };
      },
    });
    var m = (c.algo = {});
    return c;
  })(Math);
!(function (a) {
  for (
    var b = CryptoJS,
      c = b.lib,
      d = c.WordArray,
      e = c.Hasher,
      c = b.algo,
      f = [],
      g = [],
      h = function (a) {
        return (4294967296 * (a - (0 | a))) | 0;
      },
      i = 2,
      j = 0;
    64 > j;

  ) {
    var k;
    a: {
      k = i;
      for (var l = a.sqrt(k), m = 2; m <= l; m++)
        if (!(k % m)) {
          k = !1;
          break a;
        }
      k = !0;
    }
    k && (8 > j && (f[j] = h(a.pow(i, 0.5))), (g[j] = h(a.pow(i, 1 / 3))), j++),
      i++;
  }
  var n = [],
    c = (c.SHA256 = e.extend({
      _doReset: function () {
        this._hash = new d.init(f.slice(0));
      },
      _doProcessBlock: function (a, b) {
        for (
          var c = this._hash.words,
            d = c[0],
            e = c[1],
            f = c[2],
            h = c[3],
            i = c[4],
            j = c[5],
            k = c[6],
            l = c[7],
            m = 0;
          64 > m;
          m++
        ) {
          if (16 > m) n[m] = 0 | a[b + m];
          else {
            var o = n[m - 15],
              p = n[m - 2];
            n[m] =
              (((o << 25) | (o >>> 7)) ^ ((o << 14) | (o >>> 18)) ^ (o >>> 3)) +
              n[m - 7] +
              (((p << 15) | (p >>> 17)) ^
                ((p << 13) | (p >>> 19)) ^
                (p >>> 10)) +
              n[m - 16];
          }
          (o =
            l +
            (((i << 26) | (i >>> 6)) ^
              ((i << 21) | (i >>> 11)) ^
              ((i << 7) | (i >>> 25))) +
            ((i & j) ^ (~i & k)) +
            g[m] +
            n[m]),
            (p =
              (((d << 30) | (d >>> 2)) ^
                ((d << 19) | (d >>> 13)) ^
                ((d << 10) | (d >>> 22))) +
              ((d & e) ^ (d & f) ^ (e & f))),
            (l = k),
            (k = j),
            (j = i),
            (i = (h + o) | 0),
            (h = f),
            (f = e),
            (e = d),
            (d = (o + p) | 0);
        }
        (c[0] = (c[0] + d) | 0),
          (c[1] = (c[1] + e) | 0),
          (c[2] = (c[2] + f) | 0),
          (c[3] = (c[3] + h) | 0),
          (c[4] = (c[4] + i) | 0),
          (c[5] = (c[5] + j) | 0),
          (c[6] = (c[6] + k) | 0),
          (c[7] = (c[7] + l) | 0);
      },
      _doFinalize: function () {
        var b = this._data,
          c = b.words,
          d = 8 * this._nDataBytes,
          e = 8 * b.sigBytes;
        return (
          (c[e >>> 5] |= 128 << (24 - (e % 32))),
          (c[(((e + 64) >>> 9) << 4) + 14] = a.floor(d / 4294967296)),
          (c[(((e + 64) >>> 9) << 4) + 15] = d),
          (b.sigBytes = 4 * c.length),
          this._process(),
          this._hash
        );
      },
      clone: function () {
        var a = e.clone.call(this);
        return (a._hash = this._hash.clone()), a;
      },
    }));
  (b.SHA256 = e._createHelper(c)), (b.HmacSHA256 = e._createHmacHelper(c));
})(Math);
var CryptoJS =
  CryptoJS ||
  (function (a, b) {
    var c = {},
      d = (c.lib = {}),
      e = function () {},
      f = (d.Base = {
        extend: function (a) {
          e.prototype = this;
          var b = new e();
          return (
            a && b.mixIn(a),
            b.hasOwnProperty("init") ||
              (b.init = function () {
                b.$super.init.apply(this, arguments);
              }),
            (b.init.prototype = b),
            (b.$super = this),
            b
          );
        },
        create: function () {
          var a = this.extend();
          return a.init.apply(a, arguments), a;
        },
        init: function () {},
        mixIn: function (a) {
          for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function () {
          return this.init.prototype.extend(this);
        },
      }),
      g = (d.WordArray = f.extend({
        init: function (a, c) {
          (a = this.words = a || []),
            (this.sigBytes = c != b ? c : 4 * a.length);
        },
        toString: function (a) {
          return (a || i).stringify(this);
        },
        concat: function (a) {
          var b = this.words,
            c = a.words,
            d = this.sigBytes;
          if (((a = a.sigBytes), this.clamp(), d % 4))
            for (var e = 0; e < a; e++)
              b[(d + e) >>> 2] |=
                ((c[e >>> 2] >>> (24 - 8 * (e % 4))) & 255) <<
                (24 - 8 * ((d + e) % 4));
          else if (65535 < c.length)
            for (e = 0; e < a; e += 4) b[(d + e) >>> 2] = c[e >>> 2];
          else b.push.apply(b, c);
          return (this.sigBytes += a), this;
        },
        clamp: function () {
          var b = this.words,
            c = this.sigBytes;
          (b[c >>> 2] &= 4294967295 << (32 - 8 * (c % 4))),
            (b.length = a.ceil(c / 4));
        },
        clone: function () {
          var a = f.clone.call(this);
          return (a.words = this.words.slice(0)), a;
        },
        random: function (b) {
          for (var c = [], d = 0; d < b; d += 4)
            c.push((4294967296 * a.random()) | 0);
          return new g.init(c, b);
        },
      })),
      h = (c.enc = {}),
      i = (h.Hex = {
        stringify: function (a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], d = 0; d < a; d++) {
            var e = (b[d >>> 2] >>> (24 - 8 * (d % 4))) & 255;
            c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16));
          }
          return c.join("");
        },
        parse: function (a) {
          for (var b = a.length, c = [], d = 0; d < b; d += 2)
            c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << (24 - 4 * (d % 8));
          return new g.init(c, b / 2);
        },
      }),
      j = (h.Latin1 = {
        stringify: function (a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], d = 0; d < a; d++)
            c.push(
              String.fromCharCode((b[d >>> 2] >>> (24 - 8 * (d % 4))) & 255)
            );
          return c.join("");
        },
        parse: function (a) {
          for (var b = a.length, c = [], d = 0; d < b; d++)
            c[d >>> 2] |= (255 & a.charCodeAt(d)) << (24 - 8 * (d % 4));
          return new g.init(c, b);
        },
      }),
      k = (h.Utf8 = {
        stringify: function (a) {
          try {
            return decodeURIComponent(escape(j.stringify(a)));
          } catch (a) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function (a) {
          return j.parse(unescape(encodeURIComponent(a)));
        },
      }),
      l = (d.BufferedBlockAlgorithm = f.extend({
        reset: function () {
          (this._data = new g.init()), (this._nDataBytes = 0);
        },
        _append: function (a) {
          "string" == typeof a && (a = k.parse(a)),
            this._data.concat(a),
            (this._nDataBytes += a.sigBytes);
        },
        _process: function (b) {
          var c = this._data,
            d = c.words,
            e = c.sigBytes,
            f = this.blockSize,
            h = e / (4 * f),
            h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);
          if (((b = h * f), (e = a.min(4 * b, e)), b)) {
            for (var i = 0; i < b; i += f) this._doProcessBlock(d, i);
            (i = d.splice(0, b)), (c.sigBytes -= e);
          }
          return new g.init(i, e);
        },
        clone: function () {
          var a = f.clone.call(this);
          return (a._data = this._data.clone()), a;
        },
        _minBufferSize: 0,
      }));
    d.Hasher = l.extend({
      cfg: f.extend(),
      init: function (a) {
        (this.cfg = this.cfg.extend(a)), this.reset();
      },
      reset: function () {
        l.reset.call(this), this._doReset();
      },
      update: function (a) {
        return this._append(a), this._process(), this;
      },
      finalize: function (a) {
        return a && this._append(a), this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function (a) {
        return function (b, c) {
          return new a.init(c).finalize(b);
        };
      },
      _createHmacHelper: function (a) {
        return function (b, c) {
          return new m.HMAC.init(a, c).finalize(b);
        };
      },
    });
    var m = (c.algo = {});
    return c;
  })(Math);
!(function (a) {
  for (
    var b = CryptoJS,
      c = b.lib,
      d = c.WordArray,
      e = c.Hasher,
      c = b.algo,
      f = [],
      g = [],
      h = function (a) {
        return (4294967296 * (a - (0 | a))) | 0;
      },
      i = 2,
      j = 0;
    64 > j;

  ) {
    var k;
    a: {
      k = i;
      for (var l = a.sqrt(k), m = 2; m <= l; m++)
        if (!(k % m)) {
          k = !1;
          break a;
        }
      k = !0;
    }
    k && (8 > j && (f[j] = h(a.pow(i, 0.5))), (g[j] = h(a.pow(i, 1 / 3))), j++),
      i++;
  }
  var n = [],
    c = (c.SHA256 = e.extend({
      _doReset: function () {
        this._hash = new d.init(f.slice(0));
      },
      _doProcessBlock: function (a, b) {
        for (
          var c = this._hash.words,
            d = c[0],
            e = c[1],
            f = c[2],
            h = c[3],
            i = c[4],
            j = c[5],
            k = c[6],
            l = c[7],
            m = 0;
          64 > m;
          m++
        ) {
          if (16 > m) n[m] = 0 | a[b + m];
          else {
            var o = n[m - 15],
              p = n[m - 2];
            n[m] =
              (((o << 25) | (o >>> 7)) ^ ((o << 14) | (o >>> 18)) ^ (o >>> 3)) +
              n[m - 7] +
              (((p << 15) | (p >>> 17)) ^
                ((p << 13) | (p >>> 19)) ^
                (p >>> 10)) +
              n[m - 16];
          }
          (o =
            l +
            (((i << 26) | (i >>> 6)) ^
              ((i << 21) | (i >>> 11)) ^
              ((i << 7) | (i >>> 25))) +
            ((i & j) ^ (~i & k)) +
            g[m] +
            n[m]),
            (p =
              (((d << 30) | (d >>> 2)) ^
                ((d << 19) | (d >>> 13)) ^
                ((d << 10) | (d >>> 22))) +
              ((d & e) ^ (d & f) ^ (e & f))),
            (l = k),
            (k = j),
            (j = i),
            (i = (h + o) | 0),
            (h = f),
            (f = e),
            (e = d),
            (d = (o + p) | 0);
        }
        (c[0] = (c[0] + d) | 0),
          (c[1] = (c[1] + e) | 0),
          (c[2] = (c[2] + f) | 0),
          (c[3] = (c[3] + h) | 0),
          (c[4] = (c[4] + i) | 0),
          (c[5] = (c[5] + j) | 0),
          (c[6] = (c[6] + k) | 0),
          (c[7] = (c[7] + l) | 0);
      },
      _doFinalize: function () {
        var b = this._data,
          c = b.words,
          d = 8 * this._nDataBytes,
          e = 8 * b.sigBytes;
        return (
          (c[e >>> 5] |= 128 << (24 - (e % 32))),
          (c[(((e + 64) >>> 9) << 4) + 14] = a.floor(d / 4294967296)),
          (c[(((e + 64) >>> 9) << 4) + 15] = d),
          (b.sigBytes = 4 * c.length),
          this._process(),
          this._hash
        );
      },
      clone: function () {
        var a = e.clone.call(this);
        return (a._hash = this._hash.clone()), a;
      },
    }));
  (b.SHA256 = e._createHelper(c)), (b.HmacSHA256 = e._createHmacHelper(c));
})(Math),
  (function () {
    var a = CryptoJS,
      b = a.enc.Utf8;
    a.algo.HMAC = a.lib.Base.extend({
      init: function (a, c) {
        (a = this._hasher = new a.init()),
          "string" == typeof c && (c = b.parse(c));
        var d = a.blockSize,
          e = 4 * d;
        c.sigBytes > e && (c = a.finalize(c)), c.clamp();
        for (
          var f = (this._oKey = c.clone()),
            g = (this._iKey = c.clone()),
            h = f.words,
            i = g.words,
            j = 0;
          j < d;
          j++
        )
          (h[j] ^= 1549556828), (i[j] ^= 909522486);
        (f.sigBytes = g.sigBytes = e), this.reset();
      },
      reset: function () {
        var a = this._hasher;
        a.reset(), a.update(this._iKey);
      },
      update: function (a) {
        return this._hasher.update(a), this;
      },
      finalize: function (a) {
        var b = this._hasher;
        return (
          (a = b.finalize(a)),
          b.reset(),
          b.finalize(this._oKey.clone().concat(a))
        );
      },
    });
  })();
var CryptoJS =
  CryptoJS ||
  (function (a, b) {
    var c = {},
      d = (c.lib = {}),
      e = function () {},
      f = (d.Base = {
        extend: function (a) {
          e.prototype = this;
          var b = new e();
          return (
            a && b.mixIn(a),
            b.hasOwnProperty("init") ||
              (b.init = function () {
                b.$super.init.apply(this, arguments);
              }),
            (b.init.prototype = b),
            (b.$super = this),
            b
          );
        },
        create: function () {
          var a = this.extend();
          return a.init.apply(a, arguments), a;
        },
        init: function () {},
        mixIn: function (a) {
          for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function () {
          return this.init.prototype.extend(this);
        },
      }),
      g = (d.WordArray = f.extend({
        init: function (a, c) {
          (a = this.words = a || []),
            (this.sigBytes = c != b ? c : 4 * a.length);
        },
        toString: function (a) {
          return (a || i).stringify(this);
        },
        concat: function (a) {
          var b = this.words,
            c = a.words,
            d = this.sigBytes;
          if (((a = a.sigBytes), this.clamp(), d % 4))
            for (var e = 0; e < a; e++)
              b[(d + e) >>> 2] |=
                ((c[e >>> 2] >>> (24 - 8 * (e % 4))) & 255) <<
                (24 - 8 * ((d + e) % 4));
          else if (65535 < c.length)
            for (e = 0; e < a; e += 4) b[(d + e) >>> 2] = c[e >>> 2];
          else b.push.apply(b, c);
          return (this.sigBytes += a), this;
        },
        clamp: function () {
          var b = this.words,
            c = this.sigBytes;
          (b[c >>> 2] &= 4294967295 << (32 - 8 * (c % 4))),
            (b.length = a.ceil(c / 4));
        },
        clone: function () {
          var a = f.clone.call(this);
          return (a.words = this.words.slice(0)), a;
        },
        random: function (b) {
          for (var c = [], d = 0; d < b; d += 4)
            c.push((4294967296 * a.random()) | 0);
          return new g.init(c, b);
        },
      })),
      h = (c.enc = {}),
      i = (h.Hex = {
        stringify: function (a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], d = 0; d < a; d++) {
            var e = (b[d >>> 2] >>> (24 - 8 * (d % 4))) & 255;
            c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16));
          }
          return c.join("");
        },
        parse: function (a) {
          for (var b = a.length, c = [], d = 0; d < b; d += 2)
            c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << (24 - 4 * (d % 8));
          return new g.init(c, b / 2);
        },
      }),
      j = (h.Latin1 = {
        stringify: function (a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], d = 0; d < a; d++)
            c.push(
              String.fromCharCode((b[d >>> 2] >>> (24 - 8 * (d % 4))) & 255)
            );
          return c.join("");
        },
        parse: function (a) {
          for (var b = a.length, c = [], d = 0; d < b; d++)
            c[d >>> 2] |= (255 & a.charCodeAt(d)) << (24 - 8 * (d % 4));
          return new g.init(c, b);
        },
      }),
      k = (h.Utf8 = {
        stringify: function (a) {
          try {
            return decodeURIComponent(escape(j.stringify(a)));
          } catch (a) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function (a) {
          return j.parse(unescape(encodeURIComponent(a)));
        },
      }),
      l = (d.BufferedBlockAlgorithm = f.extend({
        reset: function () {
          (this._data = new g.init()), (this._nDataBytes = 0);
        },
        _append: function (a) {
          "string" == typeof a && (a = k.parse(a)),
            this._data.concat(a),
            (this._nDataBytes += a.sigBytes);
        },
        _process: function (b) {
          var c = this._data,
            d = c.words,
            e = c.sigBytes,
            f = this.blockSize,
            h = e / (4 * f),
            h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);
          if (((b = h * f), (e = a.min(4 * b, e)), b)) {
            for (var i = 0; i < b; i += f) this._doProcessBlock(d, i);
            (i = d.splice(0, b)), (c.sigBytes -= e);
          }
          return new g.init(i, e);
        },
        clone: function () {
          var a = f.clone.call(this);
          return (a._data = this._data.clone()), a;
        },
        _minBufferSize: 0,
      }));
    d.Hasher = l.extend({
      cfg: f.extend(),
      init: function (a) {
        (this.cfg = this.cfg.extend(a)), this.reset();
      },
      reset: function () {
        l.reset.call(this), this._doReset();
      },
      update: function (a) {
        return this._append(a), this._process(), this;
      },
      finalize: function (a) {
        return a && this._append(a), this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function (a) {
        return function (b, c) {
          return new a.init(c).finalize(b);
        };
      },
      _createHmacHelper: function (a) {
        return function (b, c) {
          return new m.HMAC.init(a, c).finalize(b);
        };
      },
    });
    var m = (c.algo = {});
    return c;
  })(Math);
!(function (a) {
  function b(a, b, c, d, e, f, g) {
    return (
      (a = a + ((b & c) | (~b & d)) + e + g), ((a << f) | (a >>> (32 - f))) + b
    );
  }
  function c(a, b, c, d, e, f, g) {
    return (
      (a = a + ((b & d) | (c & ~d)) + e + g), ((a << f) | (a >>> (32 - f))) + b
    );
  }
  function d(a, b, c, d, e, f, g) {
    return (a = a + (b ^ c ^ d) + e + g), ((a << f) | (a >>> (32 - f))) + b;
  }
  function e(a, b, c, d, e, f, g) {
    return (a = a + (c ^ (b | ~d)) + e + g), ((a << f) | (a >>> (32 - f))) + b;
  }
  for (
    var f = CryptoJS,
      g = f.lib,
      h = g.WordArray,
      i = g.Hasher,
      g = f.algo,
      j = [],
      k = 0;
    64 > k;
    k++
  )
    j[k] = (4294967296 * a.abs(a.sin(k + 1))) | 0;
  (g = g.MD5 =
    i.extend({
      _doReset: function () {
        this._hash = new h.init([
          1732584193, 4023233417, 2562383102, 271733878,
        ]);
      },
      _doProcessBlock: function (a, f) {
        for (var g = 0; 16 > g; g++) {
          var h = f + g,
            i = a[h];
          a[h] =
            (16711935 & ((i << 8) | (i >>> 24))) |
            (4278255360 & ((i << 24) | (i >>> 8)));
        }
        var g = this._hash.words,
          h = a[f + 0],
          i = a[f + 1],
          k = a[f + 2],
          l = a[f + 3],
          m = a[f + 4],
          n = a[f + 5],
          o = a[f + 6],
          p = a[f + 7],
          q = a[f + 8],
          r = a[f + 9],
          s = a[f + 10],
          t = a[f + 11],
          u = a[f + 12],
          v = a[f + 13],
          w = a[f + 14],
          x = a[f + 15],
          y = g[0],
          z = g[1],
          A = g[2],
          B = g[3],
          y = b(y, z, A, B, h, 7, j[0]),
          B = b(B, y, z, A, i, 12, j[1]),
          A = b(A, B, y, z, k, 17, j[2]),
          z = b(z, A, B, y, l, 22, j[3]),
          y = b(y, z, A, B, m, 7, j[4]),
          B = b(B, y, z, A, n, 12, j[5]),
          A = b(A, B, y, z, o, 17, j[6]),
          z = b(z, A, B, y, p, 22, j[7]),
          y = b(y, z, A, B, q, 7, j[8]),
          B = b(B, y, z, A, r, 12, j[9]),
          A = b(A, B, y, z, s, 17, j[10]),
          z = b(z, A, B, y, t, 22, j[11]),
          y = b(y, z, A, B, u, 7, j[12]),
          B = b(B, y, z, A, v, 12, j[13]),
          A = b(A, B, y, z, w, 17, j[14]),
          z = b(z, A, B, y, x, 22, j[15]),
          y = c(y, z, A, B, i, 5, j[16]),
          B = c(B, y, z, A, o, 9, j[17]),
          A = c(A, B, y, z, t, 14, j[18]),
          z = c(z, A, B, y, h, 20, j[19]),
          y = c(y, z, A, B, n, 5, j[20]),
          B = c(B, y, z, A, s, 9, j[21]),
          A = c(A, B, y, z, x, 14, j[22]),
          z = c(z, A, B, y, m, 20, j[23]),
          y = c(y, z, A, B, r, 5, j[24]),
          B = c(B, y, z, A, w, 9, j[25]),
          A = c(A, B, y, z, l, 14, j[26]),
          z = c(z, A, B, y, q, 20, j[27]),
          y = c(y, z, A, B, v, 5, j[28]),
          B = c(B, y, z, A, k, 9, j[29]),
          A = c(A, B, y, z, p, 14, j[30]),
          z = c(z, A, B, y, u, 20, j[31]),
          y = d(y, z, A, B, n, 4, j[32]),
          B = d(B, y, z, A, q, 11, j[33]),
          A = d(A, B, y, z, t, 16, j[34]),
          z = d(z, A, B, y, w, 23, j[35]),
          y = d(y, z, A, B, i, 4, j[36]),
          B = d(B, y, z, A, m, 11, j[37]),
          A = d(A, B, y, z, p, 16, j[38]),
          z = d(z, A, B, y, s, 23, j[39]),
          y = d(y, z, A, B, v, 4, j[40]),
          B = d(B, y, z, A, h, 11, j[41]),
          A = d(A, B, y, z, l, 16, j[42]),
          z = d(z, A, B, y, o, 23, j[43]),
          y = d(y, z, A, B, r, 4, j[44]),
          B = d(B, y, z, A, u, 11, j[45]),
          A = d(A, B, y, z, x, 16, j[46]),
          z = d(z, A, B, y, k, 23, j[47]),
          y = e(y, z, A, B, h, 6, j[48]),
          B = e(B, y, z, A, p, 10, j[49]),
          A = e(A, B, y, z, w, 15, j[50]),
          z = e(z, A, B, y, n, 21, j[51]),
          y = e(y, z, A, B, u, 6, j[52]),
          B = e(B, y, z, A, l, 10, j[53]),
          A = e(A, B, y, z, s, 15, j[54]),
          z = e(z, A, B, y, i, 21, j[55]),
          y = e(y, z, A, B, q, 6, j[56]),
          B = e(B, y, z, A, x, 10, j[57]),
          A = e(A, B, y, z, o, 15, j[58]),
          z = e(z, A, B, y, v, 21, j[59]),
          y = e(y, z, A, B, m, 6, j[60]),
          B = e(B, y, z, A, t, 10, j[61]),
          A = e(A, B, y, z, k, 15, j[62]),
          z = e(z, A, B, y, r, 21, j[63]);
        (g[0] = (g[0] + y) | 0),
          (g[1] = (g[1] + z) | 0),
          (g[2] = (g[2] + A) | 0),
          (g[3] = (g[3] + B) | 0);
      },
      _doFinalize: function () {
        var b = this._data,
          c = b.words,
          d = 8 * this._nDataBytes,
          e = 8 * b.sigBytes;
        c[e >>> 5] |= 128 << (24 - (e % 32));
        var f = a.floor(d / 4294967296);
        for (
          c[(((e + 64) >>> 9) << 4) + 15] =
            (16711935 & ((f << 8) | (f >>> 24))) |
            (4278255360 & ((f << 24) | (f >>> 8))),
            c[(((e + 64) >>> 9) << 4) + 14] =
              (16711935 & ((d << 8) | (d >>> 24))) |
              (4278255360 & ((d << 24) | (d >>> 8))),
            b.sigBytes = 4 * (c.length + 1),
            this._process(),
            b = this._hash,
            c = b.words,
            d = 0;
          4 > d;
          d++
        )
          (e = c[d]),
            (c[d] =
              (16711935 & ((e << 8) | (e >>> 24))) |
              (4278255360 & ((e << 24) | (e >>> 8))));
        return b;
      },
      clone: function () {
        var a = i.clone.call(this);
        return (a._hash = this._hash.clone()), a;
      },
    })),
    (f.MD5 = i._createHelper(g)),
    (f.HmacMD5 = i._createHmacHelper(g));
})(Math),
  (function () {
    var a = CryptoJS,
      b = a.enc.Utf8;
    a.algo.HMAC = a.lib.Base.extend({
      init: function (a, c) {
        (a = this._hasher = new a.init()),
          "string" == typeof c && (c = b.parse(c));
        var d = a.blockSize,
          e = 4 * d;
        c.sigBytes > e && (c = a.finalize(c)), c.clamp();
        for (
          var f = (this._oKey = c.clone()),
            g = (this._iKey = c.clone()),
            h = f.words,
            i = g.words,
            j = 0;
          j < d;
          j++
        )
          (h[j] ^= 1549556828), (i[j] ^= 909522486);
        (f.sigBytes = g.sigBytes = e), this.reset();
      },
      reset: function () {
        var a = this._hasher;
        a.reset(), a.update(this._iKey);
      },
      update: function (a) {
        return this._hasher.update(a), this;
      },
      finalize: function (a) {
        var b = this._hasher;
        return (
          (a = b.finalize(a)),
          b.reset(),
          b.finalize(this._oKey.clone().concat(a))
        );
      },
    });
  })(),
  (function (a) {
    a.fn.extend({
      leanModal: function (b) {
        function c(b) {
          a("#lean_overlay").fadeOut(200), a(b).css({ display: "none" });
        }
        var d = { top: 190, overlay: 0.8, closeButton: ".modal_close" },
          e = a("<div id='lean_overlay'></div>");
        return (
          a("body").append(e),
          (b = a.extend(d, b)),
          this.each(function () {
            var d = b;
            a(this).click(function (b) {
              var e = a(this).attr("href");
              a("#lean_overlay").click(function () {
                c(e);
              }),
                a(d.closeButton).click(function () {
                  c(e);
                });
              var f = (a(e).outerHeight(), a(e).outerWidth());
              a("#lean_overlay").css({ display: "block", opacity: 0 }),
                a("#lean_overlay").fadeTo(200, d.overlay),
                a(e).css({
                  display: "block",
                  position: "fixed",
                  opacity: 0,
                  "z-index": 11e3,
                  left: "50%",
                  "margin-left": -(f / 2) + "px",
                  top: d.top + "px",
                }),
                a(e).fadeTo(200, 1),
                b.preventDefault();
            });
          })
        );
      },
    });
  })(jQuery),
  !(function (a) {
    var b = {
      sectionContainer: "section",
      easing: "ease",
      animationTime: 1e3,
      pagination: !0,
      updateURL: !1,
      keyboard: !0,
      beforeMove: null,
      afterMove: null,
      loop: !0,
      responsiveFallback: !1,
      direction: "vertical",
    };
    (a.fn.swipeEvents = function () {
      return this.each(function () {
        function b(a) {
          var b = a.originalEvent.touches;
          b &&
            b.length &&
            ((d = b[0].pageX), (e = b[0].pageY), f.bind("touchmove", c));
        }
        function c(a) {
          var b = a.originalEvent.touches;
          if (b && b.length) {
            var g = d - b[0].pageX,
              h = e - b[0].pageY;
            g >= 50 && f.trigger("swipeLeft"),
              g <= -50 && f.trigger("swipeRight"),
              h >= 50 && f.trigger("swipeUp"),
              h <= -50 && f.trigger("swipeDown"),
              (Math.abs(g) >= 50 || Math.abs(h) >= 50) &&
                f.unbind("touchmove", c);
          }
        }
        var d,
          e,
          f = a(this);
        f.bind("touchstart", b);
      });
    }),
      (a.fn.onepage_scroll = function (c) {
        function d() {
          var b = !1,
            c = typeof f.responsiveFallback;
          "number" == c && (b = a(window).width() < f.responsiveFallback),
            "boolean" == c && (b = f.responsiveFallback),
            "function" == c &&
              ((valFunction = f.responsiveFallback()),
              (b = valFunction),
              (typeOFv = typeof b),
              "number" == typeOFv && (b = a(window).width() < valFunction)),
            b
              ? (a("body").addClass("disabled-onepage-scroll"),
                a(document).unbind(
                  "mousewheel DOMMouseScroll MozMousePixelScroll"
                ),
                g.swipeEvents().unbind("swipeDown swipeUp"))
              : (a("body").hasClass("disabled-onepage-scroll") &&
                  (a("body").removeClass("disabled-onepage-scroll"),
                  a("html, body, .wrapper").animate({ scrollTop: 0 }, "fast")),
                g
                  .swipeEvents()
                  .bind("swipeDown", function (b) {
                    a("body").hasClass("disabled-onepage-scroll") ||
                      b.preventDefault(),
                      g.moveUp();
                  })
                  .bind("swipeUp", function (b) {
                    a("body").hasClass("disabled-onepage-scroll") ||
                      b.preventDefault(),
                      g.moveDown();
                  }),
                a(document).bind(
                  "mousewheel DOMMouseScroll MozMousePixelScroll",
                  function (a) {
                    a.preventDefault();
                    var b =
                      a.originalEvent.wheelDelta || -a.originalEvent.detail;
                    e(a, b);
                  }
                ));
        }
        function e(a, b) {
          deltaOfInterest = b;
          var c = new Date().getTime();
          return c - lastAnimation < quietPeriod + f.animationTime
            ? void a.preventDefault()
            : (deltaOfInterest < 0 ? g.moveDown() : g.moveUp(),
              void (lastAnimation = c));
        }
        var f = a.extend({}, b, c),
          g = a(this),
          h = a(f.sectionContainer);
        if (
          ((total = h.length),
          (status = "off"),
          (topPos = 0),
          (leftPos = 0),
          (lastAnimation = 0),
          (quietPeriod = 500),
          (paginationList = ""),
          (a.fn.transformPage = function (b, c, d) {
            if (
              ("function" == typeof b.beforeMove && b.beforeMove(d),
              a("html").hasClass("ie8"))
            )
              if ("horizontal" == b.direction) {
                var e = (g.width() / 100) * c;
                a(this).animate({ left: e + "px" }, b.animationTime);
              } else {
                var e = (g.height() / 100) * c;
                a(this).animate({ top: e + "px" }, b.animationTime);
              }
            else
              a(this).css({
                "-webkit-transform":
                  "horizontal" == b.direction
                    ? "translate3d(" + c + "%, 0, 0)"
                    : "translate3d(0, " + c + "%, 0)",
                "-webkit-transition":
                  "all " + b.animationTime + "ms " + b.easing,
                "-moz-transform":
                  "horizontal" == b.direction
                    ? "translate3d(" + c + "%, 0, 0)"
                    : "translate3d(0, " + c + "%, 0)",
                "-moz-transition": "all " + b.animationTime + "ms " + b.easing,
                "-ms-transform":
                  "horizontal" == b.direction
                    ? "translate3d(" + c + "%, 0, 0)"
                    : "translate3d(0, " + c + "%, 0)",
                "-ms-transition": "all " + b.animationTime + "ms " + b.easing,
                transform:
                  "horizontal" == b.direction
                    ? "translate3d(" + c + "%, 0, 0)"
                    : "translate3d(0, " + c + "%, 0)",
                transition: "all " + b.animationTime + "ms " + b.easing,
              });
            a(this).one(
              "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function (a) {
                "function" == typeof b.afterMove && b.afterMove(d);
              }
            );
          }),
          (a.fn.moveDown = function () {
            var b = a(this);
            if (
              ((index = a(f.sectionContainer + ".active").data("index")),
              (current = a(
                f.sectionContainer + "[data-index='" + index + "']"
              )),
              (next = a(
                f.sectionContainer + "[data-index='" + (index + 1) + "']"
              )),
              next.length < 1)
            ) {
              if (1 != f.loop) return;
              (pos = 0), (next = a(f.sectionContainer + "[data-index='1']"));
            } else pos = 100 * index * -1;
            if (
              ("function" == typeof f.beforeMove &&
                f.beforeMove(next.data("index")),
              current.removeClass("active"),
              next.addClass("active"),
              1 == f.pagination &&
                (a(
                  ".onepage-pagination li a[data-index='" + index + "']"
                ).removeClass("active"),
                a(
                  ".onepage-pagination li a[data-index='" +
                    next.data("index") +
                    "']"
                ).addClass("active")),
              (a("body")[0].className = a("body")[0].className.replace(
                /\bviewing-page-\d.*?\b/g,
                ""
              )),
              a("body").addClass("viewing-page-" + next.data("index")),
              history.replaceState && 1 == f.updateURL)
            ) {
              var c =
                window.location.href.substr(
                  0,
                  window.location.href.indexOf("#")
                ) +
                "#" +
                (index + 1);
              history.pushState({}, document.title, c);
            }
            b.transformPage(f, pos, next.data("index"));
          }),
          (a.fn.moveUp = function () {
            var b = a(this);
            if (
              ((index = a(f.sectionContainer + ".active").data("index")),
              (current = a(
                f.sectionContainer + "[data-index='" + index + "']"
              )),
              (next = a(
                f.sectionContainer + "[data-index='" + (index - 1) + "']"
              )),
              next.length < 1)
            ) {
              if (1 != f.loop) return;
              (pos = 100 * (total - 1) * -1),
                (next = a(f.sectionContainer + "[data-index='" + total + "']"));
            } else pos = 100 * (next.data("index") - 1) * -1;
            if (
              ("function" == typeof f.beforeMove &&
                f.beforeMove(next.data("index")),
              current.removeClass("active"),
              next.addClass("active"),
              1 == f.pagination &&
                (a(
                  ".onepage-pagination li a[data-index='" + index + "']"
                ).removeClass("active"),
                a(
                  ".onepage-pagination li a[data-index='" +
                    next.data("index") +
                    "']"
                ).addClass("active")),
              (a("body")[0].className = a("body")[0].className.replace(
                /\bviewing-page-\d.*?\b/g,
                ""
              )),
              a("body").addClass("viewing-page-" + next.data("index")),
              history.replaceState && 1 == f.updateURL)
            ) {
              var c =
                window.location.href.substr(
                  0,
                  window.location.href.indexOf("#")
                ) +
                "#" +
                (index - 1);
              history.pushState({}, document.title, c);
            }
            b.transformPage(f, pos, next.data("index"));
          }),
          (a.fn.moveTo = function (b) {
            if (
              ((current = a(f.sectionContainer + ".active")),
              (next = a(f.sectionContainer + "[data-index='" + b + "']")),
              next.length > 0)
            ) {
              if (
                ("function" == typeof f.beforeMove &&
                  f.beforeMove(next.data("index")),
                current.removeClass("active"),
                next.addClass("active"),
                a(".onepage-pagination li a.active").removeClass("active"),
                a(".onepage-pagination li a[data-index='" + b + "']").addClass(
                  "active"
                ),
                (a("body")[0].className = a("body")[0].className.replace(
                  /\bviewing-page-\d.*?\b/g,
                  ""
                )),
                a("body").addClass("viewing-page-" + next.data("index")),
                (pos = 100 * (b - 1) * -1),
                history.replaceState && 1 == f.updateURL)
              ) {
                var c =
                  window.location.href.substr(
                    0,
                    window.location.href.indexOf("#")
                  ) +
                  "#" +
                  (b - 1);
                history.pushState({}, document.title, c);
              }
              g.transformPage(f, pos, b);
            }
          }),
          g.addClass("onepage-wrapper").css("position", "relative"),
          a.each(h, function (b) {
            a(this)
              .css({ position: "absolute", top: topPos + "%" })
              .addClass("section")
              .attr("data-index", b + 1),
              a(this).css({
                position: "absolute",
                left: "horizontal" == f.direction ? leftPos + "%" : 0,
                top:
                  "vertical" == f.direction || "horizontal" != f.direction
                    ? topPos + "%"
                    : 0,
              }),
              "horizontal" == f.direction ? (leftPos += 100) : (topPos += 100),
              1 == f.pagination &&
                (paginationList +=
                  "<li><a data-index='" +
                  (b + 1) +
                  "' href='#" +
                  (b + 1) +
                  "'></a></li>");
          }),
          g
            .swipeEvents()
            .bind("swipeDown", function (b) {
              a("body").hasClass("disabled-onepage-scroll") ||
                b.preventDefault(),
                g.moveUp();
            })
            .bind("swipeUp", function (b) {
              a("body").hasClass("disabled-onepage-scroll") ||
                b.preventDefault(),
                g.moveDown();
            }),
          1 == f.pagination &&
            (a("ul.onepage-pagination").length < 1 &&
              a("<ul class='onepage-pagination'></ul>").prependTo("body"),
            "horizontal" == f.direction
              ? ((posLeft = (g.find(".onepage-pagination").width() / 2) * -1),
                g.find(".onepage-pagination").css("margin-left", posLeft))
              : ((posTop = (g.find(".onepage-pagination").height() / 2) * -1),
                g.find(".onepage-pagination").css("margin-top", posTop)),
            a("ul.onepage-pagination").html(paginationList)),
          "" != window.location.hash && "#1" != window.location.hash)
        )
          if (
            ((init_index = window.location.hash.replace("#", "")),
            parseInt(init_index) <= total && parseInt(init_index) > 0)
          ) {
            if (
              (a(
                f.sectionContainer + "[data-index='" + init_index + "']"
              ).addClass("active"),
              a("body").addClass("viewing-page-" + init_index),
              1 == f.pagination &&
                a(
                  ".onepage-pagination li a[data-index='" + init_index + "']"
                ).addClass("active"),
              (next = a(
                f.sectionContainer + "[data-index='" + init_index + "']"
              )),
              next &&
                (next.addClass("active"),
                1 == f.pagination &&
                  a(
                    ".onepage-pagination li a[data-index='" + init_index + "']"
                  ).addClass("active"),
                (a("body")[0].className = a("body")[0].className.replace(
                  /\bviewing-page-\d.*?\b/g,
                  ""
                )),
                a("body").addClass("viewing-page-" + next.data("index")),
                history.replaceState && 1 == f.updateURL))
            ) {
              var i =
                window.location.href.substr(
                  0,
                  window.location.href.indexOf("#")
                ) +
                "#" +
                init_index;
              history.pushState({}, document.title, i);
            }
            (pos = 100 * (init_index - 1) * -1),
              g.transformPage(f, pos, init_index);
          } else
            a(f.sectionContainer + "[data-index='1']").addClass("active"),
              a("body").addClass("viewing-page-1"),
              1 == f.pagination &&
                a(".onepage-pagination li a[data-index='1']").addClass(
                  "active"
                );
        else
          a(f.sectionContainer + "[data-index='1']").addClass("active"),
            a("body").addClass("viewing-page-1"),
            1 == f.pagination &&
              a(".onepage-pagination li a[data-index='1']").addClass("active");
        return (
          1 == f.pagination &&
            a(".onepage-pagination li a").click(function () {
              var b = a(this).data("index");
              g.moveTo(b);
            }),
          a(document).bind(
            "mousewheel DOMMouseScroll MozMousePixelScroll",
            function (b) {
              b.preventDefault();
              var c = b.originalEvent.wheelDelta || -b.originalEvent.detail;
              a("body").hasClass("disabled-onepage-scroll") || e(b, c);
            }
          ),
          0 != f.responsiveFallback &&
            (a(window).resize(function () {
              d();
            }),
            d()),
          1 == f.keyboard &&
            a(document).keydown(function (b) {
              var c = b.target.tagName.toLowerCase();
              if (!a("body").hasClass("disabled-onepage-scroll"))
                switch (b.which) {
                  case 38:
                    "input" != c && "textarea" != c && g.moveUp();
                    break;
                  case 40:
                    "input" != c && "textarea" != c && g.moveDown();
                    break;
                  case 32:
                    "input" != c && "textarea" != c && g.moveDown();
                    break;
                  case 33:
                    "input" != c && "textarea" != c && g.moveUp();
                    break;
                  case 34:
                    "input" != c && "textarea" != c && g.moveDown();
                    break;
                  case 36:
                    g.moveTo(1);
                    break;
                  case 35:
                    g.moveTo(total);
                    break;
                  default:
                    return;
                }
            }),
          !1
        );
      });
  })(window.jQuery),
  (function (a) {
    var b;
    if ("function" == typeof define && define.amd) define(["jquery"], a);
    else if ("object" == typeof exports) {
      try {
        b = require("jquery");
      } catch (a) {}
      module.exports = a(b);
    } else {
      var c = window.Cookies,
        d = (window.Cookies = a(window.jQuery));
      d.noConflict = function () {
        return (window.Cookies = c), d;
      };
    }
  })(function (a) {
    function b(a) {
      return j.raw ? a : encodeURIComponent(a);
    }
    function c(a) {
      return j.raw ? a : decodeURIComponent(a);
    }
    function d(a) {
      return b(j.json ? JSON.stringify(a) : String(a));
    }
    function e(a) {
      0 === a.indexOf('"') &&
        (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
      try {
        return (
          (a = decodeURIComponent(a.replace(i, " "))),
          j.json ? JSON.parse(a) : a
        );
      } catch (a) {}
    }
    function f(a, b) {
      var c = j.raw ? a : e(a);
      return h(b) ? b(c) : c;
    }
    function g() {
      for (var a, b, c = 0, d = {}; c < arguments.length; c++) {
        b = arguments[c];
        for (a in b) d[a] = b[a];
      }
      return d;
    }
    function h(a) {
      return "[object Function]" === Object.prototype.toString.call(a);
    }
    var i = /\+/g,
      j = function (a, e, i) {
        if (arguments.length > 1 && !h(e)) {
          if (((i = g(j.defaults, i)), "number" == typeof i.expires)) {
            var k = i.expires,
              l = (i.expires = new Date());
            l.setMilliseconds(l.getMilliseconds() + 864e5 * k);
          }
          return (document.cookie = [
            b(a),
            "=",
            d(e),
            i.expires ? "; expires=" + i.expires.toUTCString() : "",
            i.path ? "; path=" + i.path : "",
            i.domain ? "; domain=" + i.domain : "",
            i.secure ? "; secure" : "",
          ].join(""));
        }
        for (
          var m = a ? void 0 : {},
            n = document.cookie ? document.cookie.split("; ") : [],
            o = 0,
            p = n.length;
          o < p;
          o++
        ) {
          var q = n[o].split("="),
            r = c(q.shift()),
            s = q.join("=");
          if (a === r) {
            m = f(s, e);
            break;
          }
          a || void 0 === (s = f(s)) || (m[r] = s);
        }
        return m;
      };
    return (
      (j.get = j.set = j),
      (j.defaults = {}),
      (j.remove = function (a, b) {
        return j(a, "", g(b, { expires: -1 })), !j(a);
      }),
      a && ((a.cookie = j), (a.removeCookie = j.remove)),
      j
    );
  }),
  (MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = "../images/m"),
  (MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = "png"),
  (MarkerClusterer.prototype.extend = function (a, b) {
    return function (a) {
      for (var b in a.prototype) this.prototype[b] = a.prototype[b];
      return this;
    }.apply(a, [b]);
  }),
  (MarkerClusterer.prototype.onAdd = function () {
    this.setReady_(!0);
  }),
  (MarkerClusterer.prototype.draw = function () {}),
  (MarkerClusterer.prototype.setupStyles_ = function () {
    if (!this.styles_.length)
      for (var a, b = 0; (a = this.sizes[b]); b++)
        this.styles_.push({
          url: this.imagePath_ + (b + 1) + "." + this.imageExtension_,
          height: a,
          width: a,
        });
  }),
  (MarkerClusterer.prototype.fitMapToMarkers = function () {
    for (
      var a, b = this.getMarkers(), c = new google.maps.LatLngBounds(), d = 0;
      (a = b[d]);
      d++
    )
      c.extend(a.getPosition());
    this.map_.fitBounds(c);
  }),
  (MarkerClusterer.prototype.setStyles = function (a) {
    this.styles_ = a;
  }),
  (MarkerClusterer.prototype.getStyles = function () {
    return this.styles_;
  }),
  (MarkerClusterer.prototype.isZoomOnClick = function () {
    return this.zoomOnClick_;
  }),
  (MarkerClusterer.prototype.isAverageCenter = function () {
    return this.averageCenter_;
  }),
  (MarkerClusterer.prototype.getMarkers = function () {
    return this.markers_;
  }),
  (MarkerClusterer.prototype.getTotalMarkers = function () {
    return this.markers_.length;
  }),
  (MarkerClusterer.prototype.setMaxZoom = function (a) {
    this.maxZoom_ = a;
  }),
  (MarkerClusterer.prototype.getMaxZoom = function () {
    return this.maxZoom_;
  }),
  (MarkerClusterer.prototype.calculator_ = function (a, b) {
    for (var c = 0, d = a.length, e = d; 0 !== e; )
      (e = parseInt(e / 10, 10)), c++;
    return (c = Math.min(c, b)), { text: d, index: c };
  }),
  (MarkerClusterer.prototype.setCalculator = function (a) {
    this.calculator_ = a;
  }),
  (MarkerClusterer.prototype.getCalculator = function () {
    return this.calculator_;
  }),
  (MarkerClusterer.prototype.addMarkers = function (a, b) {
    if (a.length) for (var c, d = 0; (c = a[d]); d++) this.pushMarkerTo_(c);
    else if (Object.keys(a).length) for (var c in a) this.pushMarkerTo_(a[c]);
    b || this.redraw();
  }),
  (MarkerClusterer.prototype.pushMarkerTo_ = function (a) {
    if (((a.isAdded = !1), a.draggable)) {
      var b = this;
      google.maps.event.addListener(a, "dragend", function () {
        (a.isAdded = !1), b.repaint();
      });
    }
    this.markers_.push(a);
  }),
  (MarkerClusterer.prototype.addMarker = function (a, b) {
    this.pushMarkerTo_(a), b || this.redraw();
  }),
  (MarkerClusterer.prototype.removeMarker_ = function (a) {
    var b = -1;
    if (this.markers_.indexOf) b = this.markers_.indexOf(a);
    else
      for (var c, d = 0; (c = this.markers_[d]); d++)
        if (c == a) {
          b = d;
          break;
        }
    return -1 != b && (a.setMap(null), this.markers_.splice(b, 1), !0);
  }),
  (MarkerClusterer.prototype.removeMarker = function (a, b) {
    var c = this.removeMarker_(a);
    return !(b || !c || (this.resetViewport(), this.redraw(), 0));
  }),
  (MarkerClusterer.prototype.removeMarkers = function (a, b) {
    for (
      var c, d = a === this.getMarkers() ? a.slice() : a, e = !1, f = 0;
      (c = d[f]);
      f++
    ) {
      var g = this.removeMarker_(c);
      e = e || g;
    }
    if (!b && e) return this.resetViewport(), this.redraw(), !0;
  }),
  (MarkerClusterer.prototype.setReady_ = function (a) {
    this.ready_ || ((this.ready_ = a), this.createClusters_());
  }),
  (MarkerClusterer.prototype.getTotalClusters = function () {
    return this.clusters_.length;
  }),
  (MarkerClusterer.prototype.getMap = function () {
    return this.map_;
  }),
  (MarkerClusterer.prototype.setMap = function (a) {
    this.map_ = a;
  }),
  (MarkerClusterer.prototype.getGridSize = function () {
    return this.gridSize_;
  }),
  (MarkerClusterer.prototype.setGridSize = function (a) {
    this.gridSize_ = a;
  }),
  (MarkerClusterer.prototype.getMinClusterSize = function () {
    return this.minClusterSize_;
  }),
  (MarkerClusterer.prototype.setMinClusterSize = function (a) {
    this.minClusterSize_ = a;
  }),
  (MarkerClusterer.prototype.getExtendedBounds = function (a) {
    var b = this.getProjection(),
      c = new google.maps.LatLng(
        a.getNorthEast().lat(),
        a.getNorthEast().lng()
      ),
      d = new google.maps.LatLng(
        a.getSouthWest().lat(),
        a.getSouthWest().lng()
      ),
      e = b.fromLatLngToDivPixel(c);
    (e.x += this.gridSize_), (e.y -= this.gridSize_);
    var f = b.fromLatLngToDivPixel(d);
    (f.x -= this.gridSize_), (f.y += this.gridSize_);
    var g = b.fromDivPixelToLatLng(e),
      h = b.fromDivPixelToLatLng(f);
    return a.extend(g), a.extend(h), a;
  }),
  (MarkerClusterer.prototype.isMarkerInBounds_ = function (a, b) {
    return b.contains(a.getPosition());
  }),
  (MarkerClusterer.prototype.clearMarkers = function () {
    this.resetViewport(!0), (this.markers_ = []);
  }),
  (MarkerClusterer.prototype.resetViewport = function (a) {
    for (var b, c = 0; (b = this.clusters_[c]); c++) b.remove();
    for (var d, c = 0; (d = this.markers_[c]); c++)
      (d.isAdded = !1), a && d.setMap(null);
    this.clusters_ = [];
  }),
  (MarkerClusterer.prototype.repaint = function () {
    var a = this.clusters_.slice();
    (this.clusters_.length = 0),
      this.resetViewport(),
      this.redraw(),
      window.setTimeout(function () {
        for (var b, c = 0; (b = a[c]); c++) b.remove();
      }, 0);
  }),
  (MarkerClusterer.prototype.redraw = function () {
    this.createClusters_();
  }),
  (MarkerClusterer.prototype.distanceBetweenPoints_ = function (a, b) {
    if (!a || !b) return 0;
    var c = ((b.lat() - a.lat()) * Math.PI) / 180,
      d = ((b.lng() - a.lng()) * Math.PI) / 180,
      e =
        Math.sin(c / 2) * Math.sin(c / 2) +
        Math.cos((a.lat() * Math.PI) / 180) *
          Math.cos((b.lat() * Math.PI) / 180) *
          Math.sin(d / 2) *
          Math.sin(d / 2);
    return 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1 - e)) * 6371;
  }),
  (MarkerClusterer.prototype.addToClosestCluster_ = function (a) {
    for (
      var b, c = 4e4, d = null, e = (a.getPosition(), 0);
      (b = this.clusters_[e]);
      e++
    ) {
      var f = b.getCenter();
      if (f) {
        var g = this.distanceBetweenPoints_(f, a.getPosition());
        g < c && ((c = g), (d = b));
      }
    }
    if (d && d.isMarkerInClusterBounds(a)) d.addMarker(a);
    else {
      var b = new Cluster(this);
      b.addMarker(a), this.clusters_.push(b);
    }
  }),
  (MarkerClusterer.prototype.createClusters_ = function () {
    if (this.ready_)
      for (
        var a,
          b = new google.maps.LatLngBounds(
            this.map_.getBounds().getSouthWest(),
            this.map_.getBounds().getNorthEast()
          ),
          c = this.getExtendedBounds(b),
          d = 0;
        (a = this.markers_[d]);
        d++
      )
        !a.isAdded &&
          this.isMarkerInBounds_(a, c) &&
          this.addToClosestCluster_(a);
  }),
  (Cluster.prototype.isMarkerAlreadyAdded = function (a) {
    if (this.markers_.indexOf) return -1 != this.markers_.indexOf(a);
    for (var b, c = 0; (b = this.markers_[c]); c++) if (b == a) return !0;
    return !1;
  }),
  (Cluster.prototype.addMarker = function (a) {
    if (this.isMarkerAlreadyAdded(a)) return !1;
    if (this.center_) {
      if (this.averageCenter_) {
        var b = this.markers_.length + 1,
          c = (this.center_.lat() * (b - 1) + a.getPosition().lat()) / b,
          d = (this.center_.lng() * (b - 1) + a.getPosition().lng()) / b;
        (this.center_ = new google.maps.LatLng(c, d)), this.calculateBounds_();
      }
    } else (this.center_ = a.getPosition()), this.calculateBounds_();
    (a.isAdded = !0), this.markers_.push(a);
    var e = this.markers_.length;
    if (
      (e < this.minClusterSize_ &&
        a.getMap() != this.map_ &&
        a.setMap(this.map_),
      e == this.minClusterSize_)
    )
      for (var f = 0; f < e; f++) this.markers_[f].setMap(null);
    return e >= this.minClusterSize_ && a.setMap(null), this.updateIcon(), !0;
  }),
  (Cluster.prototype.getMarkerClusterer = function () {
    return this.markerClusterer_;
  }),
  (Cluster.prototype.getBounds = function () {
    for (
      var a,
        b = new google.maps.LatLngBounds(this.center_, this.center_),
        c = this.getMarkers(),
        d = 0;
      (a = c[d]);
      d++
    )
      b.extend(a.getPosition());
    return b;
  }),
  (Cluster.prototype.remove = function () {
    this.clusterIcon_.remove(),
      (this.markers_.length = 0),
      delete this.markers_;
  }),
  (Cluster.prototype.getSize = function () {
    return this.markers_.length;
  }),
  (Cluster.prototype.getMarkers = function () {
    return this.markers_;
  }),
  (Cluster.prototype.getCenter = function () {
    return this.center_;
  }),
  (Cluster.prototype.calculateBounds_ = function () {
    var a = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(a);
  }),
  (Cluster.prototype.isMarkerInClusterBounds = function (a) {
    return this.bounds_.contains(a.getPosition());
  }),
  (Cluster.prototype.getMap = function () {
    return this.map_;
  }),
  (Cluster.prototype.updateIcon = function () {
    var a = this.map_.getZoom(),
      b = this.markerClusterer_.getMaxZoom();
    if (b && a > b)
      for (var c, d = 0; (c = this.markers_[d]); d++) c.setMap(this.map_);
    else {
      if (this.markers_.length < this.minClusterSize_)
        return void this.clusterIcon_.hide();
      var e = this.markerClusterer_.getStyles().length,
        f = this.markerClusterer_.getCalculator()(this.markers_, e);
      this.clusterIcon_.setCenter(this.center_),
        this.clusterIcon_.setSums(f),
        this.clusterIcon_.show();
    }
  }),
  (ClusterIcon.prototype.triggerClusterClick = function () {
    var a = this.cluster_.getMarkerClusterer();
    google.maps.event.trigger(a, "clusterclick", this.cluster_),
      a.isZoomOnClick() && this.map_.fitBounds(this.cluster_.getBounds());
  }),
  (ClusterIcon.prototype.onAdd = function () {
    if (((this.div_ = document.createElement("DIV")), this.visible_)) {
      var a = this.getPosFromLatLng_(this.center_);
      (this.div_.style.cssText = this.createCss(a)),
        (this.div_.innerHTML = this.sums_.text);
    }
    this.getPanes().overlayMouseTarget.appendChild(this.div_);
    var b = this;
    google.maps.event.addDomListener(this.div_, "click", function () {
      b.triggerClusterClick();
    });
  }),
  (ClusterIcon.prototype.getPosFromLatLng_ = function (a) {
    var b = this.getProjection().fromLatLngToDivPixel(a);
    return (
      (b.x -= parseInt(this.width_ / 2, 10)),
      (b.y -= parseInt(this.height_ / 2, 10)),
      b
    );
  }),
  (ClusterIcon.prototype.draw = function () {
    if (this.visible_) {
      var a = this.getPosFromLatLng_(this.center_);
      (this.div_.style.top = a.y + "px"), (this.div_.style.left = a.x + "px");
    }
  }),
  (ClusterIcon.prototype.hide = function () {
    this.div_ && (this.div_.style.display = "none"), (this.visible_ = !1);
  }),
  (ClusterIcon.prototype.show = function () {
    if (this.div_) {
      var a = this.getPosFromLatLng_(this.center_);
      (this.div_.style.cssText = this.createCss(a)),
        (this.div_.style.display = "");
    }
    this.visible_ = !0;
  }),
  (ClusterIcon.prototype.remove = function () {
    this.setMap(null);
  }),
  (ClusterIcon.prototype.onRemove = function () {
    this.div_ &&
      this.div_.parentNode &&
      (this.hide(),
      this.div_.parentNode.removeChild(this.div_),
      (this.div_ = null));
  }),
  (ClusterIcon.prototype.setSums = function (a) {
    (this.sums_ = a),
      (this.text_ = a.text),
      (this.index_ = a.index),
      this.div_ && (this.div_.innerHTML = a.text),
      this.useStyle();
  }),
  (ClusterIcon.prototype.useStyle = function () {
    var a = Math.max(0, this.sums_.index - 1);
    a = Math.min(this.styles_.length - 1, a);
    var b = this.styles_[a];
    (this.url_ = b.url),
      (this.height_ = b.height),
      (this.width_ = b.width),
      (this.textColor_ = b.textColor),
      (this.anchor_ = b.anchor),
      (this.textSize_ = b.textSize),
      (this.backgroundPosition_ = b.backgroundPosition);
  }),
  (ClusterIcon.prototype.setCenter = function (a) {
    this.center_ = a;
  }),
  (ClusterIcon.prototype.createCss = function (a) {
    var b = [];
    b.push("background-image:url(" + this.url_ + ");");
    var c = this.backgroundPosition_ ? this.backgroundPosition_ : "0 0";
    b.push("background-position:" + c + ";"),
      "object" == typeof this.anchor_
        ? ("number" == typeof this.anchor_[0] &&
          this.anchor_[0] > 0 &&
          this.anchor_[0] < this.height_
            ? b.push(
                "height:" +
                  (this.height_ - this.anchor_[0]) +
                  "px; padding-top:" +
                  this.anchor_[0] +
                  "px;"
              )
            : b.push(
                "height:" +
                  this.height_ +
                  "px; line-height:" +
                  this.height_ +
                  "px;"
              ),
          "number" == typeof this.anchor_[1] &&
          this.anchor_[1] > 0 &&
          this.anchor_[1] < this.width_
            ? b.push(
                "width:" +
                  (this.width_ - this.anchor_[1]) +
                  "px; padding-left:" +
                  this.anchor_[1] +
                  "px;"
              )
            : b.push("width:" + this.width_ + "px; text-align:center;"))
        : b.push(
            "height:" +
              this.height_ +
              "px; line-height:" +
              this.height_ +
              "px; width:" +
              this.width_ +
              "px; text-align:center;"
          );
    var d = this.textColor_ ? this.textColor_ : "black",
      e = this.textSize_ ? this.textSize_ : 11;
    return (
      b.push(
        "cursor:pointer; top:" +
          a.y +
          "px; left:" +
          a.x +
          "px; color:" +
          d +
          "; position:absolute; font-size:" +
          e +
          "px; font-family:Arial,sans-serif; font-weight:bold"
      ),
      b.join("")
    );
  }),
  (window.MarkerClusterer = MarkerClusterer),
  (MarkerClusterer.prototype.addMarker = MarkerClusterer.prototype.addMarker),
  (MarkerClusterer.prototype.addMarkers = MarkerClusterer.prototype.addMarkers),
  (MarkerClusterer.prototype.clearMarkers =
    MarkerClusterer.prototype.clearMarkers),
  (MarkerClusterer.prototype.fitMapToMarkers =
    MarkerClusterer.prototype.fitMapToMarkers),
  (MarkerClusterer.prototype.getCalculator =
    MarkerClusterer.prototype.getCalculator),
  (MarkerClusterer.prototype.getGridSize =
    MarkerClusterer.prototype.getGridSize),
  (MarkerClusterer.prototype.getExtendedBounds =
    MarkerClusterer.prototype.getExtendedBounds),
  (MarkerClusterer.prototype.getMap = MarkerClusterer.prototype.getMap),
  (MarkerClusterer.prototype.getMarkers = MarkerClusterer.prototype.getMarkers),
  (MarkerClusterer.prototype.getMaxZoom = MarkerClusterer.prototype.getMaxZoom),
  (MarkerClusterer.prototype.getStyles = MarkerClusterer.prototype.getStyles),
  (MarkerClusterer.prototype.getTotalClusters =
    MarkerClusterer.prototype.getTotalClusters),
  (MarkerClusterer.prototype.getTotalMarkers =
    MarkerClusterer.prototype.getTotalMarkers),
  (MarkerClusterer.prototype.redraw = MarkerClusterer.prototype.redraw),
  (MarkerClusterer.prototype.removeMarker =
    MarkerClusterer.prototype.removeMarker),
  (MarkerClusterer.prototype.removeMarkers =
    MarkerClusterer.prototype.removeMarkers),
  (MarkerClusterer.prototype.resetViewport =
    MarkerClusterer.prototype.resetViewport),
  (MarkerClusterer.prototype.repaint = MarkerClusterer.prototype.repaint),
  (MarkerClusterer.prototype.setCalculator =
    MarkerClusterer.prototype.setCalculator),
  (MarkerClusterer.prototype.setGridSize =
    MarkerClusterer.prototype.setGridSize),
  (MarkerClusterer.prototype.setMaxZoom = MarkerClusterer.prototype.setMaxZoom),
  (MarkerClusterer.prototype.onAdd = MarkerClusterer.prototype.onAdd),
  (MarkerClusterer.prototype.draw = MarkerClusterer.prototype.draw),
  (Cluster.prototype.getCenter = Cluster.prototype.getCenter),
  (Cluster.prototype.getSize = Cluster.prototype.getSize),
  (Cluster.prototype.getMarkers = Cluster.prototype.getMarkers),
  (ClusterIcon.prototype.onAdd = ClusterIcon.prototype.onAdd),
  (ClusterIcon.prototype.draw = ClusterIcon.prototype.draw),
  (ClusterIcon.prototype.onRemove = ClusterIcon.prototype.onRemove),
  (Object.keys =
    Object.keys ||
    function (a) {
      var b = [];
      for (var c in a) a.hasOwnProperty(c) && b.push(c);
      return b;
    }),
  !(function (a) {
    function b() {}
    function c(a) {
      function c(b) {
        b.prototype.option ||
          (b.prototype.option = function (b) {
            a.isPlainObject(b) &&
              (this.options = a.extend(!0, this.options, b));
          });
      }
      function e(b, c) {
        a.fn[b] = function (e) {
          if ("string" == typeof e) {
            for (
              var g = d.call(arguments, 1), h = 0, i = this.length;
              i > h;
              h++
            ) {
              var j = this[h],
                k = a.data(j, b);
              if (k)
                if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                  var l = k[e].apply(k, g);
                  if (void 0 !== l) return l;
                } else f("no such method '" + e + "' for " + b + " instance");
              else
                f(
                  "cannot call methods on " +
                    b +
                    " prior to initialization; attempted to call '" +
                    e +
                    "'"
                );
            }
            return this;
          }
          return this.each(function () {
            var d = a.data(this, b);
            d
              ? (d.option(e), d._init())
              : ((d = new c(this, e)), a.data(this, b, d));
          });
        };
      }
      if (a) {
        var f =
          "undefined" == typeof console
            ? b
            : function (a) {
                console.error(a);
              };
        return (
          (a.bridget = function (a, b) {
            c(b), e(a, b);
          }),
          a.bridget
        );
      }
    }
    var d = Array.prototype.slice;
    "function" == typeof define && define.amd
      ? define("jquery-bridget/jquery.bridget", ["jquery"], c)
      : c("object" == typeof exports ? require("jquery") : a.jQuery);
  })(window),
  (function (a) {
    function b(b) {
      var c = a.event;
      return (c.target = c.target || c.srcElement || b), c;
    }
    var c = document.documentElement,
      d = function () {};
    c.addEventListener
      ? (d = function (a, b, c) {
          a.addEventListener(b, c, !1);
        })
      : c.attachEvent &&
        (d = function (a, c, d) {
          (a[c + d] = d.handleEvent
            ? function () {
                var c = b(a);
                d.handleEvent.call(d, c);
              }
            : function () {
                var c = b(a);
                d.call(a, c);
              }),
            a.attachEvent("on" + c, a[c + d]);
        });
    var e = function () {};
    c.removeEventListener
      ? (e = function (a, b, c) {
          a.removeEventListener(b, c, !1);
        })
      : c.detachEvent &&
        (e = function (a, b, c) {
          a.detachEvent("on" + b, a[b + c]);
          try {
            delete a[b + c];
          } catch (d) {
            a[b + c] = void 0;
          }
        });
    var f = { bind: d, unbind: e };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", f)
      : "object" == typeof exports
      ? (module.exports = f)
      : (a.eventie = f);
  })(window),
  function () {
    function a() {}
    function b(a, b) {
      for (var c = a.length; c--; ) if (a[c].listener === b) return c;
      return -1;
    }
    function c(a) {
      return function () {
        return this[a].apply(this, arguments);
      };
    }
    var d = a.prototype,
      e = this,
      f = e.EventEmitter;
    (d.getListeners = function (a) {
      var b,
        c,
        d = this._getEvents();
      if (a instanceof RegExp) {
        b = {};
        for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
      } else b = d[a] || (d[a] = []);
      return b;
    }),
      (d.flattenListeners = function (a) {
        var b,
          c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c;
      }),
      (d.getListenersAsObject = function (a) {
        var b,
          c = this.getListeners(a);
        return c instanceof Array && ((b = {}), (b[a] = c)), b || c;
      }),
      (d.addListener = function (a, c) {
        var d,
          e = this.getListenersAsObject(a),
          f = "object" == typeof c;
        for (d in e)
          e.hasOwnProperty(d) &&
            -1 === b(e[d], c) &&
            e[d].push(f ? c : { listener: c, once: !1 });
        return this;
      }),
      (d.on = c("addListener")),
      (d.addOnceListener = function (a, b) {
        return this.addListener(a, { listener: b, once: !0 });
      }),
      (d.once = c("addOnceListener")),
      (d.defineEvent = function (a) {
        return this.getListeners(a), this;
      }),
      (d.defineEvents = function (a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this;
      }),
      (d.removeListener = function (a, c) {
        var d,
          e,
          f = this.getListenersAsObject(a);
        for (e in f)
          f.hasOwnProperty(e) &&
            ((d = b(f[e], c)), -1 !== d && f[e].splice(d, 1));
        return this;
      }),
      (d.off = c("removeListener")),
      (d.addListeners = function (a, b) {
        return this.manipulateListeners(!1, a, b);
      }),
      (d.removeListeners = function (a, b) {
        return this.manipulateListeners(!0, a, b);
      }),
      (d.manipulateListeners = function (a, b, c) {
        var d,
          e,
          f = a ? this.removeListener : this.addListener,
          g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp)
          for (d = c.length; d--; ) f.call(this, b, c[d]);
        else
          for (d in b)
            b.hasOwnProperty(d) &&
              (e = b[d]) &&
              ("function" == typeof e
                ? f.call(this, d, e)
                : g.call(this, d, e));
        return this;
      }),
      (d.removeEvent = function (a) {
        var b,
          c = typeof a,
          d = this._getEvents();
        if ("string" === c) delete d[a];
        else if (a instanceof RegExp)
          for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
        else delete this._events;
        return this;
      }),
      (d.removeAllListeners = c("removeEvent")),
      (d.emitEvent = function (a, b) {
        var c,
          d,
          e,
          f,
          g = this.getListenersAsObject(a);
        for (e in g)
          if (g.hasOwnProperty(e))
            for (d = g[e].length; d--; )
              (c = g[e][d]),
                c.once === !0 && this.removeListener(a, c.listener),
                (f = c.listener.apply(this, b || [])),
                f === this._getOnceReturnValue() &&
                  this.removeListener(a, c.listener);
        return this;
      }),
      (d.trigger = c("emitEvent")),
      (d.emit = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b);
      }),
      (d.setOnceReturnValue = function (a) {
        return (this._onceReturnValue = a), this;
      }),
      (d._getOnceReturnValue = function () {
        return (
          !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        );
      }),
      (d._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (a.noConflict = function () {
        return (e.EventEmitter = f), a;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return a;
          })
        : "object" == typeof module && module.exports
        ? (module.exports = a)
        : (e.EventEmitter = a);
  }.call(this),
  (function (a) {
    function b(a) {
      if (a) {
        if ("string" == typeof d[a]) return a;
        a = a.charAt(0).toUpperCase() + a.slice(1);
        for (var b, e = 0, f = c.length; f > e; e++)
          if (((b = c[e] + a), "string" == typeof d[b])) return b;
      }
    }
    var c = "Webkit Moz ms Ms O".split(" "),
      d = document.documentElement.style;
    "function" == typeof define && define.amd
      ? define("get-style-property/get-style-property", [], function () {
          return b;
        })
      : "object" == typeof exports
      ? (module.exports = b)
      : (a.getStyleProperty = b);
  })(window),
  (function (a) {
    function b(a) {
      var b = parseFloat(a),
        c = -1 === a.indexOf("%") && !isNaN(b);
      return c && b;
    }
    function c() {}
    function d() {
      for (
        var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          b = 0,
          c = g.length;
        c > b;
        b++
      ) {
        var d = g[b];
        a[d] = 0;
      }
      return a;
    }
    function e(c) {
      function e() {
        if (!m) {
          m = !0;
          var d = a.getComputedStyle;
          if (
            ((j = (function () {
              var a = d
                ? function (a) {
                    return d(a, null);
                  }
                : function (a) {
                    return a.currentStyle;
                  };
              return function (b) {
                var c = a(b);
                return (
                  c ||
                    f(
                      "Style returned " +
                        c +
                        ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
                    ),
                  c
                );
              };
            })()),
            (k = c("boxSizing")))
          ) {
            var e = document.createElement("div");
            (e.style.width = "200px"),
              (e.style.padding = "1px 2px 3px 4px"),
              (e.style.borderStyle = "solid"),
              (e.style.borderWidth = "1px 2px 3px 4px"),
              (e.style[k] = "border-box");
            var g = document.body || document.documentElement;
            g.appendChild(e);
            var h = j(e);
            (l = 200 === b(h.width)), g.removeChild(e);
          }
        }
      }
      function h(a) {
        if (
          (e(),
          "string" == typeof a && (a = document.querySelector(a)),
          a && "object" == typeof a && a.nodeType)
        ) {
          var c = j(a);
          if ("none" === c.display) return d();
          var f = {};
          (f.width = a.offsetWidth), (f.height = a.offsetHeight);
          for (
            var h = (f.isBorderBox = !(!k || !c[k] || "border-box" !== c[k])),
              m = 0,
              n = g.length;
            n > m;
            m++
          ) {
            var o = g[m],
              p = c[o];
            p = i(a, p);
            var q = parseFloat(p);
            f[o] = isNaN(q) ? 0 : q;
          }
          var r = f.paddingLeft + f.paddingRight,
            s = f.paddingTop + f.paddingBottom,
            t = f.marginLeft + f.marginRight,
            u = f.marginTop + f.marginBottom,
            v = f.borderLeftWidth + f.borderRightWidth,
            w = f.borderTopWidth + f.borderBottomWidth,
            x = h && l,
            y = b(c.width);
          y !== !1 && (f.width = y + (x ? 0 : r + v));
          var z = b(c.height);
          return (
            z !== !1 && (f.height = z + (x ? 0 : s + w)),
            (f.innerWidth = f.width - (r + v)),
            (f.innerHeight = f.height - (s + w)),
            (f.outerWidth = f.width + t),
            (f.outerHeight = f.height + u),
            f
          );
        }
      }
      function i(b, c) {
        if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
        var d = b.style,
          e = d.left,
          f = b.runtimeStyle,
          g = f && f.left;
        return (
          g && (f.left = b.currentStyle.left),
          (d.left = c),
          (c = d.pixelLeft),
          (d.left = e),
          g && (f.left = g),
          c
        );
      }
      var j,
        k,
        l,
        m = !1;
      return h;
    }
    var f =
        "undefined" == typeof console
          ? c
          : function (a) {
              console.error(a);
            },
      g = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ];
    "function" == typeof define && define.amd
      ? define(
          "get-size/get-size",
          ["get-style-property/get-style-property"],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(require("desandro-get-style-property")))
      : (a.getSize = e(a.getStyleProperty));
  })(window),
  (function (a) {
    function b(a) {
      "function" == typeof a && (b.isReady ? a() : g.push(a));
    }
    function c(a) {
      var c = "readystatechange" === a.type && "complete" !== f.readyState;
      b.isReady || c || d();
    }
    function d() {
      b.isReady = !0;
      for (var a = 0, c = g.length; c > a; a++) {
        var d = g[a];
        d();
      }
    }
    function e(e) {
      return (
        "complete" === f.readyState
          ? d()
          : (e.bind(f, "DOMContentLoaded", c),
            e.bind(f, "readystatechange", c),
            e.bind(a, "load", c)),
        b
      );
    }
    var f = a.document,
      g = [];
    (b.isReady = !1),
      "function" == typeof define && define.amd
        ? define("doc-ready/doc-ready", ["eventie/eventie"], e)
        : "object" == typeof exports
        ? (module.exports = e(require("eventie")))
        : (a.docReady = e(a.eventie));
  })(window),
  (function (a) {
    function b(a, b) {
      return a[g](b);
    }
    function c(a) {
      if (!a.parentNode) {
        var b = document.createDocumentFragment();
        b.appendChild(a);
      }
    }
    function d(a, b) {
      c(a);
      for (
        var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length;
        f > e;
        e++
      )
        if (d[e] === a) return !0;
      return !1;
    }
    function e(a, d) {
      return c(a), b(a, d);
    }
    var f,
      g = (function () {
        if (a.matches) return "matches";
        if (a.matchesSelector) return "matchesSelector";
        for (
          var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length;
          d > c;
          c++
        ) {
          var e = b[c],
            f = e + "MatchesSelector";
          if (a[f]) return f;
        }
      })();
    if (g) {
      var h = document.createElement("div"),
        i = b(h, "div");
      f = i ? b : e;
    } else f = d;
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", [], function () {
          return f;
        })
      : "object" == typeof exports
      ? (module.exports = f)
      : (window.matchesSelector = f);
  })(Element.prototype),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["doc-ready/doc-ready", "matches-selector/matches-selector"],
          function (c, d) {
            return b(a, c, d);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("doc-ready"),
          require("desandro-matches-selector")
        ))
      : (a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector));
  })(window, function (a, b, c) {
    var d = {};
    (d.extend = function (a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }),
      (d.modulo = function (a, b) {
        return ((a % b) + b) % b;
      });
    var e = Object.prototype.toString;
    (d.isArray = function (a) {
      return "[object Array]" == e.call(a);
    }),
      (d.makeArray = function (a) {
        var b = [];
        if (d.isArray(a)) b = a;
        else if (a && "number" == typeof a.length)
          for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
        else b.push(a);
        return b;
      }),
      (d.indexOf = Array.prototype.indexOf
        ? function (a, b) {
            return a.indexOf(b);
          }
        : function (a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
          }),
      (d.removeFrom = function (a, b) {
        var c = d.indexOf(a, b);
        -1 != c && a.splice(c, 1);
      }),
      (d.isElement =
        "function" == typeof HTMLElement || "object" == typeof HTMLElement
          ? function (a) {
              return a instanceof HTMLElement;
            }
          : function (a) {
              return (
                a &&
                "object" == typeof a &&
                1 == a.nodeType &&
                "string" == typeof a.nodeName
              );
            }),
      (d.setText = (function () {
        function a(a, c) {
          (b =
            b ||
            (void 0 !== document.documentElement.textContent
              ? "textContent"
              : "innerText")),
            (a[b] = c);
        }
        var b;
        return a;
      })()),
      (d.getParent = function (a, b) {
        for (; a != document.body; )
          if (((a = a.parentNode), c(a, b))) return a;
      }),
      (d.getQueryElement = function (a) {
        return "string" == typeof a ? document.querySelector(a) : a;
      }),
      (d.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (d.filterFindElements = function (a, b) {
        a = d.makeArray(a);
        for (var e = [], f = 0, g = a.length; g > f; f++) {
          var h = a[f];
          if (d.isElement(h))
            if (b) {
              c(h, b) && e.push(h);
              for (
                var i = h.querySelectorAll(b), j = 0, k = i.length;
                k > j;
                j++
              )
                e.push(i[j]);
            } else e.push(h);
        }
        return e;
      }),
      (d.debounceMethod = function (a, b, c) {
        var d = a.prototype[b],
          e = b + "Timeout";
        a.prototype[b] = function () {
          var a = this[e];
          a && clearTimeout(a);
          var b = arguments,
            f = this;
          this[e] = setTimeout(function () {
            d.apply(f, b), delete f[e];
          }, c || 100);
        };
      }),
      (d.toDashed = function (a) {
        return a
          .replace(/(.)([A-Z])/g, function (a, b, c) {
            return b + "-" + c;
          })
          .toLowerCase();
      });
    var f = a.console;
    return (
      (d.htmlInit = function (c, e) {
        b(function () {
          for (
            var b = d.toDashed(e),
              g = document.querySelectorAll(".js-" + b),
              h = "data-" + b + "-options",
              i = 0,
              j = g.length;
            j > i;
            i++
          ) {
            var k,
              l = g[i],
              m = l.getAttribute(h);
            try {
              k = m && JSON.parse(m);
            } catch (a) {
              f &&
                f.error(
                  "Error parsing " +
                    h +
                    " on " +
                    l.nodeName.toLowerCase() +
                    (l.id ? "#" + l.id : "") +
                    ": " +
                    a
                );
              continue;
            }
            var n = new c(l, k),
              o = a.jQuery;
            o && o.data(l, e, n);
          }
        });
      }),
      d
    );
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          [
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "get-style-property/get-style-property",
            "fizzy-ui-utils/utils",
          ],
          function (c, d, e, f) {
            return b(a, c, d, e, f);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("desandro-get-style-property"),
          require("fizzy-ui-utils")
        ))
      : ((a.Outlayer = {}),
        (a.Outlayer.Item = b(
          a,
          a.EventEmitter,
          a.getSize,
          a.getStyleProperty,
          a.fizzyUIUtils
        )));
  })(window, function (a, b, c, d, e) {
    function f(a) {
      for (var b in a) return !1;
      return (b = null), !0;
    }
    function g(a, b) {
      a &&
        ((this.element = a),
        (this.layout = b),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function h(a) {
      return a.replace(/([A-Z])/g, function (a) {
        return "-" + a.toLowerCase();
      });
    }
    var i = a.getComputedStyle,
      j = i
        ? function (a) {
            return i(a, null);
          }
        : function (a) {
            return a.currentStyle;
          },
      k = d("transition"),
      l = d("transform"),
      m = k && l,
      n = !!d("perspective"),
      o = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend",
      }[k],
      p = [
        "transform",
        "transition",
        "transitionDuration",
        "transitionProperty",
      ],
      q = (function () {
        for (var a = {}, b = 0, c = p.length; c > b; b++) {
          var e = p[b],
            f = d(e);
          f && f !== e && (a[e] = f);
        }
        return a;
      })();
    e.extend(g.prototype, b.prototype),
      (g.prototype._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (g.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (g.prototype.getSize = function () {
        this.size = c(this.element);
      }),
      (g.prototype.css = function (a) {
        var b = this.element.style;
        for (var c in a) {
          var d = q[c] || c;
          b[d] = a[c];
        }
      }),
      (g.prototype.getPosition = function () {
        var a = j(this.element),
          b = this.layout.options,
          c = b.isOriginLeft,
          d = b.isOriginTop,
          e = a[c ? "left" : "right"],
          f = a[d ? "top" : "bottom"],
          g = parseInt(e, 10),
          h = parseInt(f, 10),
          i = this.layout.size;
        (g = -1 != e.indexOf("%") ? (g / 100) * i.width : g),
          (h = -1 != f.indexOf("%") ? (h / 100) * i.height : h),
          (g = isNaN(g) ? 0 : g),
          (h = isNaN(h) ? 0 : h),
          (g -= c ? i.paddingLeft : i.paddingRight),
          (h -= d ? i.paddingTop : i.paddingBottom),
          (this.position.x = g),
          (this.position.y = h);
      }),
      (g.prototype.layoutPosition = function () {
        var a = this.layout.size,
          b = this.layout.options,
          c = {},
          d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
          e = b.isOriginLeft ? "left" : "right",
          f = b.isOriginLeft ? "right" : "left",
          g = this.position.x + a[d];
        (c[e] = this.getXValue(g)), (c[f] = "");
        var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
          i = b.isOriginTop ? "top" : "bottom",
          j = b.isOriginTop ? "bottom" : "top",
          k = this.position.y + a[h];
        (c[i] = this.getYValue(k)),
          (c[j] = ""),
          this.css(c),
          this.emitEvent("layout", [this]);
      }),
      (g.prototype.getXValue = function (a) {
        var b = this.layout.options;
        return b.percentPosition && !b.isHorizontal
          ? (a / this.layout.size.width) * 100 + "%"
          : a + "px";
      }),
      (g.prototype.getYValue = function (a) {
        var b = this.layout.options;
        return b.percentPosition && b.isHorizontal
          ? (a / this.layout.size.height) * 100 + "%"
          : a + "px";
      }),
      (g.prototype._transitionTo = function (a, b) {
        this.getPosition();
        var c = this.position.x,
          d = this.position.y,
          e = parseInt(a, 10),
          f = parseInt(b, 10),
          g = e === this.position.x && f === this.position.y;
        if ((this.setPosition(a, b), g && !this.isTransitioning))
          return void this.layoutPosition();
        var h = a - c,
          i = b - d,
          j = {};
        (j.transform = this.getTranslate(h, i)),
          this.transition({
            to: j,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (g.prototype.getTranslate = function (a, b) {
        var c = this.layout.options;
        return (
          (a = c.isOriginLeft ? a : -a),
          (b = c.isOriginTop ? b : -b),
          (a = this.getXValue(a)),
          (b = this.getYValue(b)),
          n
            ? "translate3d(" + a + ", " + b + ", 0)"
            : "translate(" + a + ", " + b + ")"
        );
      }),
      (g.prototype.goTo = function (a, b) {
        this.setPosition(a, b), this.layoutPosition();
      }),
      (g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo),
      (g.prototype.setPosition = function (a, b) {
        (this.position.x = parseInt(a, 10)),
          (this.position.y = parseInt(b, 10));
      }),
      (g.prototype._nonTransition = function (a) {
        this.css(a.to), a.isCleaning && this._removeStyles(a.to);
        for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this);
      }),
      (g.prototype._transition = function (a) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(a);
        var b = this._transn;
        for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
        for (c in a.to)
          (b.ingProperties[c] = !0), a.isCleaning && (b.clean[c] = !0);
        if (a.from) {
          this.css(a.from);
          var d = this.element.offsetHeight;
          d = null;
        }
        this.enableTransition(a.to),
          this.css(a.to),
          (this.isTransitioning = !0);
      });
    var r = "opacity," + h(q.transform || "transform");
    (g.prototype.enableTransition = function () {
      this.isTransitioning ||
        (this.css({
          transitionProperty: r,
          transitionDuration: this.layout.options.transitionDuration,
        }),
        this.element.addEventListener(o, this, !1));
    }),
      (g.prototype.transition =
        g.prototype[k ? "_transition" : "_nonTransition"]),
      (g.prototype.onwebkitTransitionEnd = function (a) {
        this.ontransitionend(a);
      }),
      (g.prototype.onotransitionend = function (a) {
        this.ontransitionend(a);
      });
    var s = {
      "-webkit-transform": "transform",
      "-moz-transform": "transform",
      "-o-transform": "transform",
    };
    (g.prototype.ontransitionend = function (a) {
      if (a.target === this.element) {
        var b = this._transn,
          c = s[a.propertyName] || a.propertyName;
        if (
          (delete b.ingProperties[c],
          f(b.ingProperties) && this.disableTransition(),
          c in b.clean &&
            ((this.element.style[a.propertyName] = ""), delete b.clean[c]),
          c in b.onEnd)
        ) {
          var d = b.onEnd[c];
          d.call(this), delete b.onEnd[c];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (g.prototype.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(o, this, !1),
          (this.isTransitioning = !1);
      }),
      (g.prototype._removeStyles = function (a) {
        var b = {};
        for (var c in a) b[c] = "";
        this.css(b);
      });
    var t = { transitionProperty: "", transitionDuration: "" };
    return (
      (g.prototype.removeTransitionStyles = function () {
        this.css(t);
      }),
      (g.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (g.prototype.remove = function () {
        if (!k || !parseFloat(this.layout.options.transitionDuration))
          return void this.removeElem();
        var a = this;
        this.once("transitionEnd", function () {
          a.removeElem();
        }),
          this.hide();
      }),
      (g.prototype.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var a = this.layout.options,
          b = {},
          c = this.getHideRevealTransitionEndProperty("visibleStyle");
        (b[c] = this.onRevealTransitionEnd),
          this.transition({
            from: a.hiddenStyle,
            to: a.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: b,
          });
      }),
      (g.prototype.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (g.prototype.getHideRevealTransitionEndProperty = function (a) {
        var b = this.layout.options[a];
        if (b.opacity) return "opacity";
        for (var c in b) return c;
      }),
      (g.prototype.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var a = this.layout.options,
          b = {},
          c = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (b[c] = this.onHideTransitionEnd),
          this.transition({
            from: a.visibleStyle,
            to: a.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: b,
          });
      }),
      (g.prototype.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (g.prototype.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      g
    );
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "eventie/eventie",
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (c, d, e, f, g) {
            return b(a, c, d, e, f, g);
          }
        )
      : "object" == typeof exports
      ? (module.exports = b(
          a,
          require("eventie"),
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (a.Outlayer = b(
          a,
          a.eventie,
          a.EventEmitter,
          a.getSize,
          a.fizzyUIUtils,
          a.Outlayer.Item
        ));
  })(window, function (a, b, c, d, e, f) {
    function g(a, b) {
      var c = e.getQueryElement(a);
      if (!c)
        return void (
          h &&
          h.error(
            "Bad element for " + this.constructor.namespace + ": " + (c || a)
          )
        );
      (this.element = c),
        i && (this.$element = i(this.element)),
        (this.options = e.extend({}, this.constructor.defaults)),
        this.option(b);
      var d = ++k;
      (this.element.outlayerGUID = d),
        (l[d] = this),
        this._create(),
        this.options.isInitLayout && this.layout();
    }
    var h = a.console,
      i = a.jQuery,
      j = function () {},
      k = 0,
      l = {};
    return (
      (g.namespace = "outlayer"),
      (g.Item = f),
      (g.defaults = {
        containerStyle: { position: "relative" },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        isResizingContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      }),
      e.extend(g.prototype, c.prototype),
      (g.prototype.option = function (a) {
        e.extend(this.options, a);
      }),
      (g.prototype._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          e.extend(this.element.style, this.options.containerStyle),
          this.options.isResizeBound && this.bindResize();
      }),
      (g.prototype.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (g.prototype._itemize = function (a) {
        for (
          var b = this._filterFindItemElements(a),
            c = this.constructor.Item,
            d = [],
            e = 0,
            f = b.length;
          f > e;
          e++
        ) {
          var g = b[e],
            h = new c(g, this);
          d.push(h);
        }
        return d;
      }),
      (g.prototype._filterFindItemElements = function (a) {
        return e.filterFindElements(a, this.options.itemSelector);
      }),
      (g.prototype.getItemElements = function () {
        for (var a = [], b = 0, c = this.items.length; c > b; b++)
          a.push(this.items[b].element);
        return a;
      }),
      (g.prototype.layout = function () {
        this._resetLayout(), this._manageStamps();
        var a =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        this.layoutItems(this.items, a), (this._isLayoutInited = !0);
      }),
      (g.prototype._init = g.prototype.layout),
      (g.prototype._resetLayout = function () {
        this.getSize();
      }),
      (g.prototype.getSize = function () {
        this.size = d(this.element);
      }),
      (g.prototype._getMeasurement = function (a, b) {
        var c,
          f = this.options[a];
        f
          ? ("string" == typeof f
              ? (c = this.element.querySelector(f))
              : e.isElement(f) && (c = f),
            (this[a] = c ? d(c)[b] : f))
          : (this[a] = 0);
      }),
      (g.prototype.layoutItems = function (a, b) {
        (a = this._getItemsForLayout(a)),
          this._layoutItems(a, b),
          this._postLayout();
      }),
      (g.prototype._getItemsForLayout = function (a) {
        for (var b = [], c = 0, d = a.length; d > c; c++) {
          var e = a[c];
          e.isIgnored || b.push(e);
        }
        return b;
      }),
      (g.prototype._layoutItems = function (a, b) {
        if ((this._emitCompleteOnItems("layout", a), a && a.length)) {
          for (var c = [], d = 0, e = a.length; e > d; d++) {
            var f = a[d],
              g = this._getItemLayoutPosition(f);
            (g.item = f), (g.isInstant = b || f.isLayoutInstant), c.push(g);
          }
          this._processLayoutQueue(c);
        }
      }),
      (g.prototype._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (g.prototype._processLayoutQueue = function (a) {
        for (var b = 0, c = a.length; c > b; b++) {
          var d = a[b];
          this._positionItem(d.item, d.x, d.y, d.isInstant);
        }
      }),
      (g.prototype._positionItem = function (a, b, c, d) {
        d ? a.goTo(b, c) : a.moveTo(b, c);
      }),
      (g.prototype._postLayout = function () {
        this.resizeContainer();
      }),
      (g.prototype.resizeContainer = function () {
        if (this.options.isResizingContainer) {
          var a = this._getContainerSize();
          a &&
            (this._setContainerMeasure(a.width, !0),
            this._setContainerMeasure(a.height, !1));
        }
      }),
      (g.prototype._getContainerSize = j),
      (g.prototype._setContainerMeasure = function (a, b) {
        if (void 0 !== a) {
          var c = this.size;
          c.isBorderBox &&
            (a += b
              ? c.paddingLeft +
                c.paddingRight +
                c.borderLeftWidth +
                c.borderRightWidth
              : c.paddingBottom +
                c.paddingTop +
                c.borderTopWidth +
                c.borderBottomWidth),
            (a = Math.max(a, 0)),
            (this.element.style[b ? "width" : "height"] = a + "px");
        }
      }),
      (g.prototype._emitCompleteOnItems = function (a, b) {
        function c() {
          e.dispatchEvent(a + "Complete", null, [b]);
        }
        function d() {
          g++, g === f && c();
        }
        var e = this,
          f = b.length;
        if (!b || !f) return void c();
        for (var g = 0, h = 0, i = b.length; i > h; h++) {
          var j = b[h];
          j.once(a, d);
        }
      }),
      (g.prototype.dispatchEvent = function (a, b, c) {
        var d = b ? [b].concat(c) : c;
        if ((this.emitEvent(a, d), i))
          if (((this.$element = this.$element || i(this.element)), b)) {
            var e = i.Event(b);
            (e.type = a), this.$element.trigger(e, c);
          } else this.$element.trigger(a, c);
      }),
      (g.prototype.ignore = function (a) {
        var b = this.getItem(a);
        b && (b.isIgnored = !0);
      }),
      (g.prototype.unignore = function (a) {
        var b = this.getItem(a);
        b && delete b.isIgnored;
      }),
      (g.prototype.stamp = function (a) {
        if ((a = this._find(a))) {
          this.stamps = this.stamps.concat(a);
          for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            this.ignore(d);
          }
        }
      }),
      (g.prototype.unstamp = function (a) {
        if ((a = this._find(a)))
          for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            e.removeFrom(this.stamps, d), this.unignore(d);
          }
      }),
      (g.prototype._find = function (a) {
        return a
          ? ("string" == typeof a && (a = this.element.querySelectorAll(a)),
            (a = e.makeArray(a)))
          : void 0;
      }),
      (g.prototype._manageStamps = function () {
        if (this.stamps && this.stamps.length) {
          this._getBoundingRect();
          for (var a = 0, b = this.stamps.length; b > a; a++) {
            var c = this.stamps[a];
            this._manageStamp(c);
          }
        }
      }),
      (g.prototype._getBoundingRect = function () {
        var a = this.element.getBoundingClientRect(),
          b = this.size;
        this._boundingRect = {
          left: a.left + b.paddingLeft + b.borderLeftWidth,
          top: a.top + b.paddingTop + b.borderTopWidth,
          right: a.right - (b.paddingRight + b.borderRightWidth),
          bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth),
        };
      }),
      (g.prototype._manageStamp = j),
      (g.prototype._getElementOffset = function (a) {
        var b = a.getBoundingClientRect(),
          c = this._boundingRect,
          e = d(a),
          f = {
            left: b.left - c.left - e.marginLeft,
            top: b.top - c.top - e.marginTop,
            right: c.right - b.right - e.marginRight,
            bottom: c.bottom - b.bottom - e.marginBottom,
          };
        return f;
      }),
      (g.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (g.prototype.bindResize = function () {
        this.isResizeBound ||
          (b.bind(a, "resize", this), (this.isResizeBound = !0));
      }),
      (g.prototype.unbindResize = function () {
        this.isResizeBound && b.unbind(a, "resize", this),
          (this.isResizeBound = !1);
      }),
      (g.prototype.onresize = function () {
        function a() {
          b.resize(), delete b.resizeTimeout;
        }
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var b = this;
        this.resizeTimeout = setTimeout(a, 100);
      }),
      (g.prototype.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (g.prototype.needsResizeLayout = function () {
        var a = d(this.element),
          b = this.size && a;
        return b && a.innerWidth !== this.size.innerWidth;
      }),
      (g.prototype.addItems = function (a) {
        var b = this._itemize(a);
        return b.length && (this.items = this.items.concat(b)), b;
      }),
      (g.prototype.appended = function (a) {
        var b = this.addItems(a);
        b.length && (this.layoutItems(b, !0), this.reveal(b));
      }),
      (g.prototype.prepended = function (a) {
        var b = this._itemize(a);
        if (b.length) {
          var c = this.items.slice(0);
          (this.items = b.concat(c)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(b, !0),
            this.reveal(b),
            this.layoutItems(c);
        }
      }),
      (g.prototype.reveal = function (a) {
        this._emitCompleteOnItems("reveal", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.reveal();
        }
      }),
      (g.prototype.hide = function (a) {
        this._emitCompleteOnItems("hide", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
          var d = a[c];
          d.hide();
        }
      }),
      (g.prototype.revealItemElements = function (a) {
        var b = this.getItems(a);
        this.reveal(b);
      }),
      (g.prototype.hideItemElements = function (a) {
        var b = this.getItems(a);
        this.hide(b);
      }),
      (g.prototype.getItem = function (a) {
        for (var b = 0, c = this.items.length; c > b; b++) {
          var d = this.items[b];
          if (d.element === a) return d;
        }
      }),
      (g.prototype.getItems = function (a) {
        a = e.makeArray(a);
        for (var b = [], c = 0, d = a.length; d > c; c++) {
          var f = a[c],
            g = this.getItem(f);
          g && b.push(g);
        }
        return b;
      }),
      (g.prototype.remove = function (a) {
        var b = this.getItems(a);
        if ((this._emitCompleteOnItems("remove", b), b && b.length))
          for (var c = 0, d = b.length; d > c; c++) {
            var f = b[c];
            f.remove(), e.removeFrom(this.items, f);
          }
      }),
      (g.prototype.destroy = function () {
        var a = this.element.style;
        (a.height = ""), (a.position = ""), (a.width = "");
        for (var b = 0, c = this.items.length; c > b; b++) {
          var d = this.items[b];
          d.destroy();
        }
        this.unbindResize();
        var e = this.element.outlayerGUID;
        delete l[e],
          delete this.element.outlayerGUID,
          i && i.removeData(this.element, this.constructor.namespace);
      }),
      (g.data = function (a) {
        a = e.getQueryElement(a);
        var b = a && a.outlayerGUID;
        return b && l[b];
      }),
      (g.create = function (a, b) {
        function c() {
          g.apply(this, arguments);
        }
        return (
          Object.create
            ? (c.prototype = Object.create(g.prototype))
            : e.extend(c.prototype, g.prototype),
          (c.prototype.constructor = c),
          (c.defaults = e.extend({}, g.defaults)),
          e.extend(c.defaults, b),
          (c.prototype.settings = {}),
          (c.namespace = a),
          (c.data = g.data),
          (c.Item = function () {
            f.apply(this, arguments);
          }),
          (c.Item.prototype = new f()),
          e.htmlInit(c, a),
          i && i.bridget && i.bridget(a, c),
          c
        );
      }),
      (g.Item = f),
      g
    );
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(
          ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"],
          b
        )
      : "object" == typeof exports
      ? (module.exports = b(
          require("outlayer"),
          require("get-size"),
          require("fizzy-ui-utils")
        ))
      : (a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils));
  })(window, function (a, b, c) {
    var d = a.create("masonry");
    return (
      (d.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns();
        var a = this.cols;
        for (this.colYs = []; a--; ) this.colYs.push(0);
        this.maxY = 0;
      }),
      (d.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var a = this.items[0],
            c = a && a.element;
          this.columnWidth = (c && b(c).outerWidth) || this.containerWidth;
        }
        var d = (this.columnWidth += this.gutter),
          e = this.containerWidth + this.gutter,
          f = e / d,
          g = d - (e % d),
          h = g && 1 > g ? "round" : "floor";
        (f = Math[h](f)), (this.cols = Math.max(f, 1));
      }),
      (d.prototype.getContainerWidth = function () {
        var a = this.options.isFitWidth
            ? this.element.parentNode
            : this.element,
          c = b(a);
        this.containerWidth = c && c.innerWidth;
      }),
      (d.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b = a.size.outerWidth % this.columnWidth,
          d = b && 1 > b ? "round" : "ceil",
          e = Math[d](a.size.outerWidth / this.columnWidth);
        e = Math.min(e, this.cols);
        for (
          var f = this._getColGroup(e),
            g = Math.min.apply(Math, f),
            h = c.indexOf(f, g),
            i = { x: this.columnWidth * h, y: g },
            j = g + a.size.outerHeight,
            k = this.cols + 1 - f.length,
            l = 0;
          k > l;
          l++
        )
          this.colYs[h + l] = j;
        return i;
      }),
      (d.prototype._getColGroup = function (a) {
        if (2 > a) return this.colYs;
        for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
          var e = this.colYs.slice(d, d + a);
          b[d] = Math.max.apply(Math, e);
        }
        return b;
      }),
      (d.prototype._manageStamp = function (a) {
        var c = b(a),
          d = this._getElementOffset(a),
          e = this.options.isOriginLeft ? d.left : d.right,
          f = e + c.outerWidth,
          g = Math.floor(e / this.columnWidth);
        g = Math.max(0, g);
        var h = Math.floor(f / this.columnWidth);
        (h -= f % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
        for (
          var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight,
            j = g;
          h >= j;
          j++
        )
          this.colYs[j] = Math.max(i, this.colYs[j]);
      }),
      (d.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var a = { height: this.maxY };
        return (
          this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
        );
      }),
      (d.prototype._getContainerFitWidth = function () {
        for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; ) a++;
        return (this.cols - a) * this.columnWidth - this.gutter;
      }),
      (d.prototype.needsResizeLayout = function () {
        var a = this.containerWidth;
        return this.getContainerWidth(), a !== this.containerWidth;
      }),
      d
    );
  }),
  !(function (a, b, c) {
    "use strict";
    function d(a, b) {
      (this.element = a), (this.layers = a && a.getElementsByClassName("layer"));
      var c = {
        calibrateX: this.data(this.element, "calibrate-x"),
        calibrateY: this.data(this.element, "calibrate-y"),
        invertX: this.data(this.element, "invert-x"),
        invertY: this.data(this.element, "invert-y"),
        limitX: this.data(this.element, "limit-x"),
        limitY: this.data(this.element, "limit-y"),
        scalarX: this.data(this.element, "scalar-x"),
        scalarY: this.data(this.element, "scalar-y"),
        frictionX: this.data(this.element, "friction-x"),
        frictionY: this.data(this.element, "friction-y"),
        originX: this.data(this.element, "origin-x"),
        originY: this.data(this.element, "origin-y"),
      };
      for (var d in c) null === c[d] && delete c[d];
      this.extend(this, g, b, c),
        (this.calibrationTimer = null),
        (this.calibrationFlag = !0),
        (this.enabled = !1),
        (this.depths = []),
        (this.raf = null),
        (this.bounds = null),
        (this.ex = 0),
        (this.ey = 0),
        (this.ew = 0),
        (this.eh = 0),
        (this.ecx = 0),
        (this.ecy = 0),
        (this.erx = 0),
        (this.ery = 0),
        (this.cx = 0),
        (this.cy = 0),
        (this.ix = 0),
        (this.iy = 0),
        (this.mx = 0),
        (this.my = 0),
        (this.vx = 0),
        (this.vy = 0),
        (this.onMouseMove = this.onMouseMove.bind(this)),
        (this.onDeviceOrientation = this.onDeviceOrientation.bind(this)),
        (this.onOrientationTimer = this.onOrientationTimer.bind(this)),
        (this.onCalibrationTimer = this.onCalibrationTimer.bind(this)),
        (this.onAnimationFrame = this.onAnimationFrame.bind(this)),
        (this.onWindowResize = this.onWindowResize.bind(this)),
        this.initialise();
    }
    var e = "Parallax",
      f = 30,
      g = {
        relativeInput: !1,
        clipRelativeInput: !1,
        calibrationThreshold: 100,
        calibrationDelay: 500,
        supportDelay: 500,
        calibrateX: !1,
        calibrateY: !0,
        invertX: !0,
        invertY: !0,
        limitX: !1,
        limitY: !1,
        scalarX: 10,
        scalarY: 10,
        frictionX: 0.1,
        frictionY: 0.1,
        originX: 0.5,
        originY: 0.5,
      };
    (d.prototype.extend = function () {
      if (arguments.length > 1)
        for (var a = arguments[0], b = 1, c = arguments.length; c > b; b++) {
          var d = arguments[b];
          for (var e in d) a[e] = d[e];
        }
    }),
      (d.prototype.data = function (a, b) {
        return this.deserialize(a.getAttribute("data-" + b));
      }),
      (d.prototype.deserialize = function (a) {
        return (
          "true" === a ||
          ("false" !== a &&
            ("null" === a
              ? null
              : !isNaN(parseFloat(a)) && isFinite(a)
              ? parseFloat(a)
              : a))
        );
      }),
      (d.prototype.camelCase = function (a) {
        return a.replace(/-+(.)?/g, function (a, b) {
          return b ? b.toUpperCase() : "";
        });
      }),
      (d.prototype.transformSupport = function (d) {
        for (
          var e = b.createElement("div"),
            f = !1,
            g = null,
            h = !1,
            i = null,
            j = null,
            k = 0,
            l = this.vendors.length;
          l > k;
          k++
        )
          if (
            (null !== this.vendors[k]
              ? ((i = this.vendors[k][0] + "transform"),
                (j = this.vendors[k][1] + "Transform"))
              : ((i = "transform"), (j = "transform")),
            e.style[j] !== c)
          ) {
            f = !0;
            break;
          }
        switch (d) {
          case "2D":
            h = f;
            break;
          case "3D":
            if (f) {
              var m = b.body || b.createElement("body"),
                n = b.documentElement,
                o = n.style.overflow;
              b.body ||
                ((n.style.overflow = "hidden"),
                n.appendChild(m),
                (m.style.overflow = "hidden"),
                (m.style.background = "")),
                m.appendChild(e),
                (e.style[j] = "translate3d(1px,1px,1px)"),
                (g = a.getComputedStyle(e).getPropertyValue(i)),
                (h = g !== c && g.length > 0 && "none" !== g),
                (n.style.overflow = o),
                m.removeChild(e);
            }
        }
        return h;
      }),
      (d.prototype.ww = null),
      (d.prototype.wh = null),
      (d.prototype.wcx = null),
      (d.prototype.wcy = null),
      (d.prototype.wrx = null),
      (d.prototype.wry = null),
      (d.prototype.portrait = null),
      (d.prototype.desktop = !navigator.userAgent.match(
        /(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i
      )),
      (d.prototype.vendors = [
        null,
        ["-webkit-", "webkit"],
        ["-moz-", "Moz"],
        ["-o-", "O"],
        ["-ms-", "ms"],
      ]),
      (d.prototype.motionSupport = !!a.DeviceMotionEvent),
      (d.prototype.orientationSupport = !!a.DeviceOrientationEvent),
      (d.prototype.orientationStatus = 0),
      (d.prototype.propertyCache = {}),
      (d.prototype.initialise = function () {
        d.prototype.transform2DSupport === c &&
          ((d.prototype.transform2DSupport =
            d.prototype.transformSupport("2D")),
          (d.prototype.transform3DSupport =
            d.prototype.transformSupport("3D"))),
          this.transform3DSupport && this.accelerate(this.element);
        var b = a.getComputedStyle(this.element);
        "static" === b.getPropertyValue("position") &&
          (this.element.style.position = "relative"),
          this.updateLayers(),
          this.updateDimensions(),
          this.enable(),
          this.queueCalibration(this.calibrationDelay);
      }),
      (d.prototype.updateLayers = function () {
        (this.layers = this.element.getElementsByClassName("layer")),
          (this.depths = []);
        for (var a = 0, b = this.layers.length; b > a; a++) {
          var c = this.layers[a];
          this.transform3DSupport && this.accelerate(c),
            (c.style.position = a ? "absolute" : "relative"),
            (c.style.display = "block"),
            (c.style.left = 0),
            (c.style.top = 0),
            this.depths.push(this.data(c, "depth") || 0);
        }
      }),
      (d.prototype.updateDimensions = function () {
        (this.ww = a.innerWidth),
          (this.wh = a.innerHeight),
          (this.wcx = this.ww * this.originX),
          (this.wcy = this.wh * this.originY),
          (this.wrx = Math.max(this.wcx, this.ww - this.wcx)),
          (this.wry = Math.max(this.wcy, this.wh - this.wcy));
      }),
      (d.prototype.updateBounds = function () {
        (this.bounds = this.element.getBoundingClientRect()),
          (this.ex = this.bounds.left),
          (this.ey = this.bounds.top),
          (this.ew = this.bounds.width),
          (this.eh = this.bounds.height),
          (this.ecx = this.ew * this.originX),
          (this.ecy = this.eh * this.originY),
          (this.erx = Math.max(this.ecx, this.ew - this.ecx)),
          (this.ery = Math.max(this.ecy, this.eh - this.ecy));
      }),
      (d.prototype.queueCalibration = function (a) {
        clearTimeout(this.calibrationTimer),
          (this.calibrationTimer = setTimeout(this.onCalibrationTimer, a));
      }),
      (d.prototype.enable = function () {
        this.enabled ||
          ((this.enabled = !0),
          this.orientationSupport
            ? ((this.portrait = null),
              a.addEventListener("deviceorientation", this.onDeviceOrientation),
              setTimeout(this.onOrientationTimer, this.supportDelay))
            : ((this.cx = 0),
              (this.cy = 0),
              (this.portrait = !1),
              a.addEventListener("mousemove", this.onMouseMove)),
          a.addEventListener("resize", this.onWindowResize),
          (this.raf = requestAnimationFrame(this.onAnimationFrame)));
      }),
      (d.prototype.disable = function () {
        this.enabled &&
          ((this.enabled = !1),
          this.orientationSupport
            ? a.removeEventListener(
                "deviceorientation",
                this.onDeviceOrientation
              )
            : a.removeEventListener("mousemove", this.onMouseMove),
          a.removeEventListener("resize", this.onWindowResize),
          cancelAnimationFrame(this.raf));
      }),
      (d.prototype.calibrate = function (a, b) {
        (this.calibrateX = a === c ? this.calibrateX : a),
          (this.calibrateY = b === c ? this.calibrateY : b);
      }),
      (d.prototype.invert = function (a, b) {
        (this.invertX = a === c ? this.invertX : a),
          (this.invertY = b === c ? this.invertY : b);
      }),
      (d.prototype.friction = function (a, b) {
        (this.frictionX = a === c ? this.frictionX : a),
          (this.frictionY = b === c ? this.frictionY : b);
      }),
      (d.prototype.scalar = function (a, b) {
        (this.scalarX = a === c ? this.scalarX : a),
          (this.scalarY = b === c ? this.scalarY : b);
      }),
      (d.prototype.limit = function (a, b) {
        (this.limitX = a === c ? this.limitX : a),
          (this.limitY = b === c ? this.limitY : b);
      }),
      (d.prototype.origin = function (a, b) {
        (this.originX = a === c ? this.originX : a),
          (this.originY = b === c ? this.originY : b);
      }),
      (d.prototype.clamp = function (a, b, c) {
        return (a = Math.max(a, b)), (a = Math.min(a, c));
      }),
      (d.prototype.css = function (a, b, d) {
        var e = this.propertyCache[b];
        if (!e)
          for (var f = 0, g = this.vendors.length; g > f; f++)
            if (
              ((e =
                null !== this.vendors[f]
                  ? this.camelCase(this.vendors[f][1] + "-" + b)
                  : b),
              a.style[e] !== c)
            ) {
              this.propertyCache[b] = e;
              break;
            }
        a.style[e] = d;
      }),
      (d.prototype.accelerate = function (a) {
        this.css(a, "transform", "translate3d(0,0,0)"),
          this.css(a, "transform-style", "preserve-3d"),
          this.css(a, "backface-visibility", "hidden");
      }),
      (d.prototype.setPosition = function (a, b, c) {
        (b += "px"),
          (c += "px"),
          this.transform3DSupport
            ? this.css(a, "transform", "translate3d(" + b + "," + c + ",0)")
            : this.transform2DSupport
            ? this.css(a, "transform", "translate(" + b + "," + c + ")")
            : ((a.style.left = b), (a.style.top = c));
      }),
      (d.prototype.onOrientationTimer = function () {
        this.orientationSupport &&
          0 === this.orientationStatus &&
          (this.disable(), (this.orientationSupport = !1), this.enable());
      }),
      (d.prototype.onCalibrationTimer = function () {
        this.calibrationFlag = !0;
      }),
      (d.prototype.onWindowResize = function () {
        this.updateDimensions();
      }),
      (d.prototype.onAnimationFrame = function () {
        this.updateBounds();
        var a = this.ix - this.cx,
          b = this.iy - this.cy;
        (Math.abs(a) > this.calibrationThreshold ||
          Math.abs(b) > this.calibrationThreshold) &&
          this.queueCalibration(0),
          this.portrait
            ? ((this.mx = this.calibrateX ? b : this.iy),
              (this.my = this.calibrateY ? a : this.ix))
            : ((this.mx = this.calibrateX ? a : this.ix),
              (this.my = this.calibrateY ? b : this.iy)),
          (this.mx *= this.ew * (this.scalarX / 100)),
          (this.my *= this.eh * (this.scalarY / 100)),
          isNaN(parseFloat(this.limitX)) ||
            (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)),
          isNaN(parseFloat(this.limitY)) ||
            (this.my = this.clamp(this.my, -this.limitY, this.limitY)),
          (this.vx += (this.mx - this.vx) * this.frictionX),
          (this.vy += (this.my - this.vy) * this.frictionY);
        for (var c = 0, d = this.layers.length; d > c; c++) {
          var e = this.layers[c],
            f = this.depths[c],
            g = this.vx * f * (this.invertX ? -1 : 1),
            h = this.vy * f * (this.invertY ? -1 : 1);
          this.setPosition(e, g, h);
        }
        this.raf = requestAnimationFrame(this.onAnimationFrame);
      }),
      (d.prototype.onDeviceOrientation = function (a) {
        if (!this.desktop && null !== a.beta && null !== a.gamma) {
          this.orientationStatus = 1;
          var b = (a.beta || 0) / f,
            c = (a.gamma || 0) / f,
            d = this.wh > this.ww;
          this.portrait !== d &&
            ((this.portrait = d), (this.calibrationFlag = !0)),
            this.calibrationFlag &&
              ((this.calibrationFlag = !1), (this.cx = b), (this.cy = c)),
            (this.ix = b),
            (this.iy = c);
        }
      }),
      (d.prototype.onMouseMove = function (a) {
        var b = a.clientX,
          c = a.clientY;
        !this.orientationSupport && this.relativeInput
          ? (this.clipRelativeInput &&
              ((b = Math.max(b, this.ex)),
              (b = Math.min(b, this.ex + this.ew)),
              (c = Math.max(c, this.ey)),
              (c = Math.min(c, this.ey + this.eh))),
            (this.ix = (b - this.ex - this.ecx) / this.erx),
            (this.iy = (c - this.ey - this.ecy) / this.ery))
          : ((this.ix = (b - this.wcx) / this.wrx),
            (this.iy = (c - this.wcy) / this.wry));
      }),
      (a[e] = d);
  })(window, document),
  (function () {
    for (
      var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0;
      c < b.length && !window.requestAnimationFrame;
      ++c
    )
      (window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"]),
        (window.cancelAnimationFrame =
          window[b[c] + "CancelAnimationFrame"] ||
          window[b[c] + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function (b, c) {
        var d = new Date().getTime(),
          e = Math.max(0, 16 - (d - a)),
          f = window.setTimeout(function () {
            b(d + e);
          }, e);
        return (a = d + e), f;
      }),
      window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function (a) {
          clearTimeout(a);
        });
  })(),
  !(function (a) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], a)
      : "undefined" != typeof exports
      ? (module.exports = a(require("jquery")))
      : a(jQuery);
  })(function (a) {
    "use strict";
    var b = window.Slick || {};
    (b = (function () {
      function b(b, d) {
        var e,
          f = this;
        (f.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: a(b),
          appendDots: a(b),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
          nextArrow:
            '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (a, b) {
            return (
              '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' +
              (b + 1) +
              "</button>"
            );
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !1,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (f.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          a.extend(f, f.initials),
          (f.activeBreakpoint = null),
          (f.animType = null),
          (f.animProp = null),
          (f.breakpoints = []),
          (f.breakpointSettings = []),
          (f.cssTransitions = !1),
          (f.hidden = "hidden"),
          (f.paused = !1),
          (f.positionProp = null),
          (f.respondTo = null),
          (f.rowCount = 1),
          (f.shouldClick = !0),
          (f.$slider = a(b)),
          (f.$slidesCache = null),
          (f.transformType = null),
          (f.transitionType = null),
          (f.visibilityChange = "visibilitychange"),
          (f.windowWidth = 0),
          (f.windowTimer = null),
          (e = a(b).data("slick") || {}),
          (f.options = a.extend({}, f.defaults, e, d)),
          (f.currentSlide = f.options.initialSlide),
          (f.originalSettings = f.options),
          "undefined" != typeof document.mozHidden
            ? ((f.hidden = "mozHidden"),
              (f.visibilityChange = "mozvisibilitychange"))
            : "undefined" != typeof document.webkitHidden &&
              ((f.hidden = "webkitHidden"),
              (f.visibilityChange = "webkitvisibilitychange")),
          (f.autoPlay = a.proxy(f.autoPlay, f)),
          (f.autoPlayClear = a.proxy(f.autoPlayClear, f)),
          (f.changeSlide = a.proxy(f.changeSlide, f)),
          (f.clickHandler = a.proxy(f.clickHandler, f)),
          (f.selectHandler = a.proxy(f.selectHandler, f)),
          (f.setPosition = a.proxy(f.setPosition, f)),
          (f.swipeHandler = a.proxy(f.swipeHandler, f)),
          (f.dragHandler = a.proxy(f.dragHandler, f)),
          (f.keyHandler = a.proxy(f.keyHandler, f)),
          (f.autoPlayIterator = a.proxy(f.autoPlayIterator, f)),
          (f.instanceUid = c++),
          (f.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          f.registerBreakpoints(),
          f.init(!0),
          f.checkResponsive(!0);
      }
      var c = 0;
      return b;
    })()),
      (b.prototype.addSlide = b.prototype.slickAdd =
        function (b, c, d) {
          var e = this;
          if ("boolean" == typeof c) (d = c), (c = null);
          else if (0 > c || c >= e.slideCount) return !1;
          e.unload(),
            "number" == typeof c
              ? 0 === c && 0 === e.$slides.length
                ? a(b).appendTo(e.$slideTrack)
                : d
                ? a(b).insertBefore(e.$slides.eq(c))
                : a(b).insertAfter(e.$slides.eq(c))
              : d === !0
              ? a(b).prependTo(e.$slideTrack)
              : a(b).appendTo(e.$slideTrack),
            (e.$slides = e.$slideTrack.children(this.options.slide)),
            e.$slideTrack.children(this.options.slide).detach(),
            e.$slideTrack.append(e.$slides),
            e.$slides.each(function (b, c) {
              a(c).attr("data-slick-index", b);
            }),
            (e.$slidesCache = e.$slides),
            e.reinit();
        }),
      (b.prototype.animateHeight = function () {
        var a = this;
        if (
          1 === a.options.slidesToShow &&
          a.options.adaptiveHeight === !0 &&
          a.options.vertical === !1
        ) {
          var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
          a.$list.animate({ height: b }, a.options.speed);
        }
      }),
      (b.prototype.animateSlide = function (b, c) {
        var d = {},
          e = this;
        e.animateHeight(),
          e.options.rtl === !0 && e.options.vertical === !1 && (b = -b),
          e.transformsEnabled === !1
            ? e.options.vertical === !1
              ? e.$slideTrack.animate(
                  { left: b },
                  e.options.speed,
                  e.options.easing,
                  c
                )
              : e.$slideTrack.animate(
                  { top: b },
                  e.options.speed,
                  e.options.easing,
                  c
                )
            : e.cssTransitions === !1
            ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft),
              a({ animStart: e.currentLeft }).animate(
                { animStart: b },
                {
                  duration: e.options.speed,
                  easing: e.options.easing,
                  step: function (a) {
                    (a = Math.ceil(a)),
                      e.options.vertical === !1
                        ? ((d[e.animType] = "translate(" + a + "px, 0px)"),
                          e.$slideTrack.css(d))
                        : ((d[e.animType] = "translate(0px," + a + "px)"),
                          e.$slideTrack.css(d));
                  },
                  complete: function () {
                    c && c.call();
                  },
                }
              ))
            : (e.applyTransition(),
              (b = Math.ceil(b)),
              e.options.vertical === !1
                ? (d[e.animType] = "translate3d(" + b + "px, 0px, 0px)")
                : (d[e.animType] = "translate3d(0px," + b + "px, 0px)"),
              e.$slideTrack.css(d),
              c &&
                setTimeout(function () {
                  e.disableTransition(), c.call();
                }, e.options.speed));
      }),
      (b.prototype.asNavFor = function (b) {
        var c = this,
          d = c.options.asNavFor;
        d && null !== d && (d = a(d).not(c.$slider)),
          null !== d &&
            "object" == typeof d &&
            d.each(function () {
              var c = a(this).slick("getSlick");
              c.unslicked || c.slideHandler(b, !0);
            });
      }),
      (b.prototype.applyTransition = function (a) {
        var b = this,
          c = {};
        b.options.fade === !1
          ? (c[b.transitionType] =
              b.transformType +
              " " +
              b.options.speed +
              "ms " +
              b.options.cssEase)
          : (c[b.transitionType] =
              "opacity " + b.options.speed + "ms " + b.options.cssEase),
          b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
      }),
      (b.prototype.autoPlay = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer),
          a.slideCount > a.options.slidesToShow &&
            a.paused !== !0 &&
            (a.autoPlayTimer = setInterval(
              a.autoPlayIterator,
              a.options.autoplaySpeed
            ));
      }),
      (b.prototype.autoPlayClear = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer);
      }),
      (b.prototype.autoPlayIterator = function () {
        var a = this;
        a.options.infinite === !1
          ? 1 === a.direction
            ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0),
              a.slideHandler(a.currentSlide + a.options.slidesToScroll))
            : (a.currentSlide - 1 === 0 && (a.direction = 1),
              a.slideHandler(a.currentSlide - a.options.slidesToScroll))
          : a.slideHandler(a.currentSlide + a.options.slidesToScroll);
      }),
      (b.prototype.buildArrows = function () {
        var b = this;
        b.options.arrows === !0 &&
          ((b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow")),
          (b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow")),
          b.slideCount > b.options.slidesToShow
            ? (b.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              b.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              b.htmlExpr.test(b.options.prevArrow) &&
                b.$prevArrow.prependTo(b.options.appendArrows),
              b.htmlExpr.test(b.options.nextArrow) &&
                b.$nextArrow.appendTo(b.options.appendArrows),
              b.options.infinite !== !0 &&
                b.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : b.$prevArrow
                .add(b.$nextArrow)
                .addClass("slick-hidden")
                .attr({ "aria-disabled": "true", tabindex: "-1" }));
      }),
      (b.prototype.buildDots = function () {
        var b,
          c,
          d = this;
        if (d.options.dots === !0 && d.slideCount > d.options.slidesToShow) {
          for (
            c = '<ul class="' + d.options.dotsClass + '">', b = 0;
            b <= d.getDotCount();
            b += 1
          )
            c += "<li>" + d.options.customPaging.call(this, d, b) + "</li>";
          (c += "</ul>"),
            (d.$dots = a(c).appendTo(d.options.appendDots)),
            d.$dots
              .find("li")
              .first()
              .addClass("slick-active")
              .attr("aria-hidden", "false");
        }
      }),
      (b.prototype.buildOut = function () {
        var b = this;
        (b.$slides = b.$slider
          .children(b.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (b.slideCount = b.$slides.length),
          b.$slides.each(function (b, c) {
            a(c)
              .attr("data-slick-index", b)
              .data("originalStyling", a(c).attr("style") || "");
          }),
          b.$slider.addClass("slick-slider"),
          (b.$slideTrack =
            0 === b.slideCount
              ? a('<div class="slick-track"/>').appendTo(b.$slider)
              : b.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (b.$list = b.$slideTrack
            .wrap('<div aria-live="polite" class="slick-list"/>')
            .parent()),
          b.$slideTrack.css("opacity", 0),
          (b.options.centerMode === !0 || b.options.swipeToSlide === !0) &&
            (b.options.slidesToScroll = 1),
          a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"),
          b.setupInfinite(),
          b.buildArrows(),
          b.buildDots(),
          b.updateDots(),
          b.setSlideClasses(
            "number" == typeof b.currentSlide ? b.currentSlide : 0
          ),
          b.options.draggable === !0 && b.$list.addClass("draggable");
      }),
      (b.prototype.buildRows = function () {
        var a,
          b,
          c,
          d,
          e,
          f,
          g,
          h = this;
        if (
          ((d = document.createDocumentFragment()),
          (f = h.$slider.children()),
          h.options.rows > 1)
        ) {
          for (
            g = h.options.slidesPerRow * h.options.rows,
              e = Math.ceil(f.length / g),
              a = 0;
            e > a;
            a++
          ) {
            var i = document.createElement("div");
            for (b = 0; b < h.options.rows; b++) {
              var j = document.createElement("div");
              for (c = 0; c < h.options.slidesPerRow; c++) {
                var k = a * g + (b * h.options.slidesPerRow + c);
                f.get(k) && j.appendChild(f.get(k));
              }
              i.appendChild(j);
            }
            d.appendChild(i);
          }
          h.$slider.html(d),
            h.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / h.options.slidesPerRow + "%",
                display: "inline-block",
              });
        }
      }),
      (b.prototype.checkResponsive = function (b, c) {
        var d,
          e,
          f,
          g = this,
          h = !1,
          i = g.$slider.width(),
          j = window.innerWidth || a(window).width();
        if (
          ("window" === g.respondTo
            ? (f = j)
            : "slider" === g.respondTo
            ? (f = i)
            : "min" === g.respondTo && (f = Math.min(j, i)),
          g.options.responsive &&
            g.options.responsive.length &&
            null !== g.options.responsive)
        ) {
          e = null;
          for (d in g.breakpoints)
            g.breakpoints.hasOwnProperty(d) &&
              (g.originalSettings.mobileFirst === !1
                ? f < g.breakpoints[d] && (e = g.breakpoints[d])
                : f > g.breakpoints[d] && (e = g.breakpoints[d]));
          null !== e
            ? null !== g.activeBreakpoint
              ? (e !== g.activeBreakpoint || c) &&
                ((g.activeBreakpoint = e),
                "unslick" === g.breakpointSettings[e]
                  ? g.unslick(e)
                  : ((g.options = a.extend(
                      {},
                      g.originalSettings,
                      g.breakpointSettings[e]
                    )),
                    b === !0 && (g.currentSlide = g.options.initialSlide),
                    g.refresh(b)),
                (h = e))
              : ((g.activeBreakpoint = e),
                "unslick" === g.breakpointSettings[e]
                  ? g.unslick(e)
                  : ((g.options = a.extend(
                      {},
                      g.originalSettings,
                      g.breakpointSettings[e]
                    )),
                    b === !0 && (g.currentSlide = g.options.initialSlide),
                    g.refresh(b)),
                (h = e))
            : null !== g.activeBreakpoint &&
              ((g.activeBreakpoint = null),
              (g.options = g.originalSettings),
              b === !0 && (g.currentSlide = g.options.initialSlide),
              g.refresh(b),
              (h = e)),
            b || h === !1 || g.$slider.trigger("breakpoint", [g, h]);
        }
      }),
      (b.prototype.changeSlide = function (b, c) {
        var d,
          e,
          f,
          g = this,
          h = a(b.target);
        switch (
          (h.is("a") && b.preventDefault(),
          h.is("li") || (h = h.closest("li")),
          (f = g.slideCount % g.options.slidesToScroll !== 0),
          (d = f
            ? 0
            : (g.slideCount - g.currentSlide) % g.options.slidesToScroll),
          b.data.message)
        ) {
          case "previous":
            (e =
              0 === d ? g.options.slidesToScroll : g.options.slidesToShow - d),
              g.slideCount > g.options.slidesToShow &&
                g.slideHandler(g.currentSlide - e, !1, c);
            break;
          case "next":
            (e = 0 === d ? g.options.slidesToScroll : d),
              g.slideCount > g.options.slidesToShow &&
                g.slideHandler(g.currentSlide + e, !1, c);
            break;
          case "index":
            var i =
              0 === b.data.index
                ? 0
                : b.data.index || h.index() * g.options.slidesToScroll;
            g.slideHandler(g.checkNavigable(i), !1, c),
              h.children().trigger("focus");
            break;
          default:
            return;
        }
      }),
      (b.prototype.checkNavigable = function (a) {
        var b,
          c,
          d = this;
        if (((b = d.getNavigableIndexes()), (c = 0), a > b[b.length - 1]))
          a = b[b.length - 1];
        else
          for (var e in b) {
            if (a < b[e]) {
              a = c;
              break;
            }
            c = b[e];
          }
        return a;
      }),
      (b.prototype.cleanUpEvents = function () {
        var b = this;
        b.options.dots &&
          null !== b.$dots &&
          (a("li", b.$dots).off("click.slick", b.changeSlide),
          b.options.pauseOnDotsHover === !0 &&
            b.options.autoplay === !0 &&
            a("li", b.$dots)
              .off("mouseenter.slick", a.proxy(b.setPaused, b, !0))
              .off("mouseleave.slick", a.proxy(b.setPaused, b, !1))),
          b.options.arrows === !0 &&
            b.slideCount > b.options.slidesToShow &&
            (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide),
            b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)),
          b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler),
          b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler),
          b.$list.off("touchend.slick mouseup.slick", b.swipeHandler),
          b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler),
          b.$list.off("click.slick", b.clickHandler),
          a(document).off(b.visibilityChange, b.visibility),
          b.$list.off("mouseenter.slick", a.proxy(b.setPaused, b, !0)),
          b.$list.off("mouseleave.slick", a.proxy(b.setPaused, b, !1)),
          b.options.accessibility === !0 &&
            b.$list.off("keydown.slick", b.keyHandler),
          b.options.focusOnSelect === !0 &&
            a(b.$slideTrack).children().off("click.slick", b.selectHandler),
          a(window).off(
            "orientationchange.slick.slick-" + b.instanceUid,
            b.orientationChange
          ),
          a(window).off("resize.slick.slick-" + b.instanceUid, b.resize),
          a("[draggable!=true]", b.$slideTrack).off(
            "dragstart",
            b.preventDefault
          ),
          a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
          a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition);
      }),
      (b.prototype.cleanUpRows = function () {
        var a,
          b = this;
        b.options.rows > 1 &&
          ((a = b.$slides.children().children()),
          a.removeAttr("style"),
          b.$slider.html(a));
      }),
      (b.prototype.clickHandler = function (a) {
        var b = this;
        b.shouldClick === !1 &&
          (a.stopImmediatePropagation(),
          a.stopPropagation(),
          a.preventDefault());
      }),
      (b.prototype.destroy = function (b) {
        var c = this;
        c.autoPlayClear(),
          (c.touchObject = {}),
          c.cleanUpEvents(),
          a(".slick-cloned", c.$slider).detach(),
          c.$dots && c.$dots.remove(),
          c.$prevArrow &&
            c.$prevArrow.length &&
            (c.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
          c.$nextArrow &&
            c.$nextArrow.length &&
            (c.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
          c.$slides &&
            (c.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                a(this).attr("style", a(this).data("originalStyling"));
              }),
            c.$slideTrack.children(this.options.slide).detach(),
            c.$slideTrack.detach(),
            c.$list.detach(),
            c.$slider.append(c.$slides)),
          c.cleanUpRows(),
          c.$slider.removeClass("slick-slider"),
          c.$slider.removeClass("slick-initialized"),
          (c.unslicked = !0),
          b || c.$slider.trigger("destroy", [c]);
      }),
      (b.prototype.disableTransition = function (a) {
        var b = this,
          c = {};
        (c[b.transitionType] = ""),
          b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
      }),
      (b.prototype.fadeSlide = function (a, b) {
        var c = this;
        c.cssTransitions === !1
          ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }),
            c.$slides
              .eq(a)
              .animate({ opacity: 1 }, c.options.speed, c.options.easing, b))
          : (c.applyTransition(a),
            c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }),
            b &&
              setTimeout(function () {
                c.disableTransition(a), b.call();
              }, c.options.speed));
      }),
      (b.prototype.fadeSlideOut = function (a) {
        var b = this;
        b.cssTransitions === !1
          ? b.$slides
              .eq(a)
              .animate(
                { opacity: 0, zIndex: b.options.zIndex - 2 },
                b.options.speed,
                b.options.easing
              )
          : (b.applyTransition(a),
            b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 }));
      }),
      (b.prototype.filterSlides = b.prototype.slickFilter =
        function (a) {
          var b = this;
          null !== a &&
            ((b.$slidesCache = b.$slides),
            b.unload(),
            b.$slideTrack.children(this.options.slide).detach(),
            b.$slidesCache.filter(a).appendTo(b.$slideTrack),
            b.reinit());
        }),
      (b.prototype.getCurrent = b.prototype.slickCurrentSlide =
        function () {
          var a = this;
          return a.currentSlide;
        }),
      (b.prototype.getDotCount = function () {
        var a = this,
          b = 0,
          c = 0,
          d = 0;
        if (a.options.infinite === !0)
          for (; b < a.slideCount; )
            ++d,
              (b = c + a.options.slidesToScroll),
              (c +=
                a.options.slidesToScroll <= a.options.slidesToShow
                  ? a.options.slidesToScroll
                  : a.options.slidesToShow);
        else if (a.options.centerMode === !0) d = a.slideCount;
        else
          for (; b < a.slideCount; )
            ++d,
              (b = c + a.options.slidesToScroll),
              (c +=
                a.options.slidesToScroll <= a.options.slidesToShow
                  ? a.options.slidesToScroll
                  : a.options.slidesToShow);
        return d - 1;
      }),
      (b.prototype.getLeft = function (a) {
        var b,
          c,
          d,
          e = this,
          f = 0;
        return (
          (e.slideOffset = 0),
          (c = e.$slides.first().outerHeight(!0)),
          e.options.infinite === !0
            ? (e.slideCount > e.options.slidesToShow &&
                ((e.slideOffset = e.slideWidth * e.options.slidesToShow * -1),
                (f = c * e.options.slidesToShow * -1)),
              e.slideCount % e.options.slidesToScroll !== 0 &&
                a + e.options.slidesToScroll > e.slideCount &&
                e.slideCount > e.options.slidesToShow &&
                (a > e.slideCount
                  ? ((e.slideOffset =
                      (e.options.slidesToShow - (a - e.slideCount)) *
                      e.slideWidth *
                      -1),
                    (f =
                      (e.options.slidesToShow - (a - e.slideCount)) * c * -1))
                  : ((e.slideOffset =
                      (e.slideCount % e.options.slidesToScroll) *
                      e.slideWidth *
                      -1),
                    (f = (e.slideCount % e.options.slidesToScroll) * c * -1))))
            : a + e.options.slidesToShow > e.slideCount &&
              ((e.slideOffset =
                (a + e.options.slidesToShow - e.slideCount) * e.slideWidth),
              (f = (a + e.options.slidesToShow - e.slideCount) * c)),
          e.slideCount <= e.options.slidesToShow &&
            ((e.slideOffset = 0), (f = 0)),
          e.options.centerMode === !0 && e.options.infinite === !0
            ? (e.slideOffset +=
                e.slideWidth * Math.floor(e.options.slidesToShow / 2) -
                e.slideWidth)
            : e.options.centerMode === !0 &&
              ((e.slideOffset = 0),
              (e.slideOffset +=
                e.slideWidth * Math.floor(e.options.slidesToShow / 2))),
          (b =
            e.options.vertical === !1
              ? a * e.slideWidth * -1 + e.slideOffset
              : a * c * -1 + f),
          e.options.variableWidth === !0 &&
            ((d =
              e.slideCount <= e.options.slidesToShow ||
              e.options.infinite === !1
                ? e.$slideTrack.children(".slick-slide").eq(a)
                : e.$slideTrack
                    .children(".slick-slide")
                    .eq(a + e.options.slidesToShow)),
            (b =
              e.options.rtl === !0
                ? d[0]
                  ? -1 * (e.$slideTrack.width() - d[0].offsetLeft - d.width())
                  : 0
                : d[0]
                ? -1 * d[0].offsetLeft
                : 0),
            e.options.centerMode === !0 &&
              ((d =
                e.slideCount <= e.options.slidesToShow ||
                e.options.infinite === !1
                  ? e.$slideTrack.children(".slick-slide").eq(a)
                  : e.$slideTrack
                      .children(".slick-slide")
                      .eq(a + e.options.slidesToShow + 1)),
              (b =
                e.options.rtl === !0
                  ? d[0]
                    ? -1 * (e.$slideTrack.width() - d[0].offsetLeft - d.width())
                    : 0
                  : d[0]
                  ? -1 * d[0].offsetLeft
                  : 0),
              (b += (e.$list.width() - d.outerWidth()) / 2))),
          b
        );
      }),
      (b.prototype.getOption = b.prototype.slickGetOption =
        function (a) {
          var b = this;
          return b.options[a];
        }),
      (b.prototype.getNavigableIndexes = function () {
        var a,
          b = this,
          c = 0,
          d = 0,
          e = [];
        for (
          b.options.infinite === !1
            ? (a = b.slideCount)
            : ((c = -1 * b.options.slidesToScroll),
              (d = -1 * b.options.slidesToScroll),
              (a = 2 * b.slideCount));
          a > c;

        )
          e.push(c),
            (c = d + b.options.slidesToScroll),
            (d +=
              b.options.slidesToScroll <= b.options.slidesToShow
                ? b.options.slidesToScroll
                : b.options.slidesToShow);
        return e;
      }),
      (b.prototype.getSlick = function () {
        return this;
      }),
      (b.prototype.getSlideCount = function () {
        var b,
          c,
          d,
          e = this;
        return (
          (d =
            e.options.centerMode === !0
              ? e.slideWidth * Math.floor(e.options.slidesToShow / 2)
              : 0),
          e.options.swipeToSlide === !0
            ? (e.$slideTrack.find(".slick-slide").each(function (b, f) {
                return f.offsetLeft - d + a(f).outerWidth() / 2 >
                  -1 * e.swipeLeft
                  ? ((c = f), !1)
                  : void 0;
              }),
              (b =
                Math.abs(a(c).attr("data-slick-index") - e.currentSlide) || 1))
            : e.options.slidesToScroll
        );
      }),
      (b.prototype.goTo = b.prototype.slickGoTo =
        function (a, b) {
          var c = this;
          c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b);
        }),
      (b.prototype.init = function (b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") ||
          (a(c.$slider).addClass("slick-initialized"),
          c.buildRows(),
          c.buildOut(),
          c.setProps(),
          c.startLoad(),
          c.loadSlider(),
          c.initializeEvents(),
          c.updateArrows(),
          c.updateDots()),
          b && c.$slider.trigger("init", [c]),
          c.options.accessibility === !0 && c.initADA();
      }),
      (b.prototype.initArrowEvents = function () {
        var a = this;
        a.options.arrows === !0 &&
          a.slideCount > a.options.slidesToShow &&
          (a.$prevArrow.on(
            "click.slick",
            { message: "previous" },
            a.changeSlide
          ),
          a.$nextArrow.on("click.slick", { message: "next" }, a.changeSlide));
      }),
      (b.prototype.initDotEvents = function () {
        var b = this;
        b.options.dots === !0 &&
          b.slideCount > b.options.slidesToShow &&
          a("li", b.$dots).on(
            "click.slick",
            { message: "index" },
            b.changeSlide
          ),
          b.options.dots === !0 &&
            b.options.pauseOnDotsHover === !0 &&
            b.options.autoplay === !0 &&
            a("li", b.$dots)
              .on("mouseenter.slick", a.proxy(b.setPaused, b, !0))
              .on("mouseleave.slick", a.proxy(b.setPaused, b, !1));
      }),
      (b.prototype.initializeEvents = function () {
        var b = this;
        b.initArrowEvents(),
          b.initDotEvents(),
          b.$list.on(
            "touchstart.slick mousedown.slick",
            { action: "start" },
            b.swipeHandler
          ),
          b.$list.on(
            "touchmove.slick mousemove.slick",
            { action: "move" },
            b.swipeHandler
          ),
          b.$list.on(
            "touchend.slick mouseup.slick",
            { action: "end" },
            b.swipeHandler
          ),
          b.$list.on(
            "touchcancel.slick mouseleave.slick",
            { action: "end" },
            b.swipeHandler
          ),
          b.$list.on("click.slick", b.clickHandler),
          a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
          b.$list.on("mouseenter.slick", a.proxy(b.setPaused, b, !0)),
          b.$list.on("mouseleave.slick", a.proxy(b.setPaused, b, !1)),
          b.options.accessibility === !0 &&
            b.$list.on("keydown.slick", b.keyHandler),
          b.options.focusOnSelect === !0 &&
            a(b.$slideTrack).children().on("click.slick", b.selectHandler),
          a(window).on(
            "orientationchange.slick.slick-" + b.instanceUid,
            a.proxy(b.orientationChange, b)
          ),
          a(window).on(
            "resize.slick.slick-" + b.instanceUid,
            a.proxy(b.resize, b)
          ),
          a("[draggable!=true]", b.$slideTrack).on(
            "dragstart",
            b.preventDefault
          ),
          a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
          a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition);
      }),
      (b.prototype.initUI = function () {
        var a = this;
        a.options.arrows === !0 &&
          a.slideCount > a.options.slidesToShow &&
          (a.$prevArrow.show(), a.$nextArrow.show()),
          a.options.dots === !0 &&
            a.slideCount > a.options.slidesToShow &&
            a.$dots.show(),
          a.options.autoplay === !0 && a.autoPlay();
      }),
      (b.prototype.keyHandler = function (a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (37 === a.keyCode && b.options.accessibility === !0
            ? b.changeSlide({ data: { message: "previous" } })
            : 39 === a.keyCode &&
              b.options.accessibility === !0 &&
              b.changeSlide({ data: { message: "next" } }));
      }),
      (b.prototype.lazyLoad = function () {
        function b(b) {
          a("img[data-lazy]", b).each(function () {
            var b = a(this),
              c = a(this).attr("data-lazy"),
              d = document.createElement("img");
            (d.onload = function () {
              b.animate({ opacity: 0 }, 100, function () {
                b.attr("src", c).animate({ opacity: 1 }, 200, function () {
                  b.removeAttr("data-lazy").removeClass("slick-loading");
                });
              });
            }),
              (d.src = c);
          });
        }
        var c,
          d,
          e,
          f,
          g = this;
        g.options.centerMode === !0
          ? g.options.infinite === !0
            ? ((e = g.currentSlide + (g.options.slidesToShow / 2 + 1)),
              (f = e + g.options.slidesToShow + 2))
            : ((e = Math.max(
                0,
                g.currentSlide - (g.options.slidesToShow / 2 + 1)
              )),
              (f = 2 + (g.options.slidesToShow / 2 + 1) + g.currentSlide))
          : ((e = g.options.infinite
              ? g.options.slidesToShow + g.currentSlide
              : g.currentSlide),
            (f = e + g.options.slidesToShow),
            g.options.fade === !0 && (e > 0 && e--, f <= g.slideCount && f++)),
          (c = g.$slider.find(".slick-slide").slice(e, f)),
          b(c),
          g.slideCount <= g.options.slidesToShow
            ? ((d = g.$slider.find(".slick-slide")), b(d))
            : g.currentSlide >= g.slideCount - g.options.slidesToShow
            ? ((d = g.$slider
                .find(".slick-cloned")
                .slice(0, g.options.slidesToShow)),
              b(d))
            : 0 === g.currentSlide &&
              ((d = g.$slider
                .find(".slick-cloned")
                .slice(-1 * g.options.slidesToShow)),
              b(d));
      }),
      (b.prototype.loadSlider = function () {
        var a = this;
        a.setPosition(),
          a.$slideTrack.css({ opacity: 1 }),
          a.$slider.removeClass("slick-loading"),
          a.initUI(),
          "progressive" === a.options.lazyLoad && a.progressiveLazyLoad();
      }),
      (b.prototype.next = b.prototype.slickNext =
        function () {
          var a = this;
          a.changeSlide({ data: { message: "next" } });
        }),
      (b.prototype.orientationChange = function () {
        var a = this;
        a.checkResponsive(), a.setPosition();
      }),
      (b.prototype.pause = b.prototype.slickPause =
        function () {
          var a = this;
          a.autoPlayClear(), (a.paused = !0);
        }),
      (b.prototype.play = b.prototype.slickPlay =
        function () {
          var a = this;
          (a.paused = !1), a.autoPlay();
        }),
      (b.prototype.postSlide = function (a) {
        var b = this;
        b.$slider.trigger("afterChange", [b, a]),
          (b.animating = !1),
          b.setPosition(),
          (b.swipeLeft = null),
          b.options.autoplay === !0 && b.paused === !1 && b.autoPlay(),
          b.options.accessibility === !0 && b.initADA();
      }),
      (b.prototype.prev = b.prototype.slickPrev =
        function () {
          var a = this;
          a.changeSlide({ data: { message: "previous" } });
        }),
      (b.prototype.preventDefault = function (a) {
        a.preventDefault();
      }),
      (b.prototype.progressiveLazyLoad = function () {
        var b,
          c,
          d = this;
        (b = a("img[data-lazy]", d.$slider).length),
          b > 0 &&
            ((c = a("img[data-lazy]", d.$slider).first()),
            c.attr("src", null),
            c
              .attr("src", c.attr("data-lazy"))
              .removeClass("slick-loading")
              .load(function () {
                c.removeAttr("data-lazy"),
                  d.progressiveLazyLoad(),
                  d.options.adaptiveHeight === !0 && d.setPosition();
              })
              .error(function () {
                c.removeAttr("data-lazy"), d.progressiveLazyLoad();
              }));
      }),
      (b.prototype.refresh = function (b) {
        var c,
          d,
          e = this;
        (d = e.slideCount - e.options.slidesToShow),
          e.options.infinite ||
            (e.slideCount <= e.options.slidesToShow
              ? (e.currentSlide = 0)
              : e.currentSlide > d && (e.currentSlide = d)),
          (c = e.currentSlide),
          e.destroy(!0),
          a.extend(e, e.initials, { currentSlide: c }),
          e.init(),
          b || e.changeSlide({ data: { message: "index", index: c } }, !1);
      }),
      (b.prototype.registerBreakpoints = function () {
        var b,
          c,
          d,
          e = this,
          f = e.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
          e.respondTo = e.options.respondTo || "window";
          for (b in f)
            if (
              ((d = e.breakpoints.length - 1),
              (c = f[b].breakpoint),
              f.hasOwnProperty(b))
            ) {
              for (; d >= 0; )
                e.breakpoints[d] &&
                  e.breakpoints[d] === c &&
                  e.breakpoints.splice(d, 1),
                  d--;
              e.breakpoints.push(c), (e.breakpointSettings[c] = f[b].settings);
            }
          e.breakpoints.sort(function (a, b) {
            return e.options.mobileFirst ? a - b : b - a;
          });
        }
      }),
      (b.prototype.reinit = function () {
        var b = this;
        (b.$slides = b.$slideTrack
          .children(b.options.slide)
          .addClass("slick-slide")),
          (b.slideCount = b.$slides.length),
          b.currentSlide >= b.slideCount &&
            0 !== b.currentSlide &&
            (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
          b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
          b.registerBreakpoints(),
          b.setProps(),
          b.setupInfinite(),
          b.buildArrows(),
          b.updateArrows(),
          b.initArrowEvents(),
          b.buildDots(),
          b.updateDots(),
          b.initDotEvents(),
          b.checkResponsive(!1, !0),
          b.options.focusOnSelect === !0 &&
            a(b.$slideTrack).children().on("click.slick", b.selectHandler),
          b.setSlideClasses(0),
          b.setPosition(),
          b.$slider.trigger("reInit", [b]),
          b.options.autoplay === !0 && b.focusHandler();
      }),
      (b.prototype.resize = function () {
        var b = this;
        a(window).width() !== b.windowWidth &&
          (clearTimeout(b.windowDelay),
          (b.windowDelay = window.setTimeout(function () {
            (b.windowWidth = a(window).width()),
              b.checkResponsive(),
              b.unslicked || b.setPosition();
          }, 50)));
      }),
      (b.prototype.removeSlide = b.prototype.slickRemove =
        function (a, b, c) {
          var d = this;
          return (
            "boolean" == typeof a
              ? ((b = a), (a = b === !0 ? 0 : d.slideCount - 1))
              : (a = b === !0 ? --a : a),
            !(d.slideCount < 1 || 0 > a || a > d.slideCount - 1) &&
              (d.unload(),
              c === !0
                ? d.$slideTrack.children().remove()
                : d.$slideTrack.children(this.options.slide).eq(a).remove(),
              (d.$slides = d.$slideTrack.children(this.options.slide)),
              d.$slideTrack.children(this.options.slide).detach(),
              d.$slideTrack.append(d.$slides),
              (d.$slidesCache = d.$slides),
              void d.reinit())
          );
        }),
      (b.prototype.setCSS = function (a) {
        var b,
          c,
          d = this,
          e = {};
        d.options.rtl === !0 && (a = -a),
          (b = "left" == d.positionProp ? Math.ceil(a) + "px" : "0px"),
          (c = "top" == d.positionProp ? Math.ceil(a) + "px" : "0px"),
          (e[d.positionProp] = a),
          d.transformsEnabled === !1
            ? d.$slideTrack.css(e)
            : ((e = {}),
              d.cssTransitions === !1
                ? ((e[d.animType] = "translate(" + b + ", " + c + ")"),
                  d.$slideTrack.css(e))
                : ((e[d.animType] = "translate3d(" + b + ", " + c + ", 0px)"),
                  d.$slideTrack.css(e)));
      }),
      (b.prototype.setDimensions = function () {
        var a = this;
        a.options.vertical === !1
          ? a.options.centerMode === !0 &&
            a.$list.css({ padding: "0px " + a.options.centerPadding })
          : (a.$list.height(
              a.$slides.first().outerHeight(!0) * a.options.slidesToShow
            ),
            a.options.centerMode === !0 &&
              a.$list.css({ padding: a.options.centerPadding + " 0px" })),
          (a.listWidth = a.$list.width()),
          (a.listHeight = a.$list.height()),
          a.options.vertical === !1 && a.options.variableWidth === !1
            ? ((a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow)),
              a.$slideTrack.width(
                Math.ceil(
                  a.slideWidth * a.$slideTrack.children(".slick-slide").length
                )
              ))
            : a.options.variableWidth === !0
            ? a.$slideTrack.width(5e3 * a.slideCount)
            : ((a.slideWidth = Math.ceil(a.listWidth)),
              a.$slideTrack.height(
                Math.ceil(
                  a.$slides.first().outerHeight(!0) *
                    a.$slideTrack.children(".slick-slide").length
                )
              ));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 &&
          a.$slideTrack.children(".slick-slide").width(a.slideWidth - b);
      }),
      (b.prototype.setFade = function () {
        var b,
          c = this;
        c.$slides.each(function (d, e) {
          (b = c.slideWidth * d * -1),
            c.options.rtl === !0
              ? a(e).css({
                  position: "relative",
                  right: b,
                  top: 0,
                  zIndex: c.options.zIndex - 2,
                  opacity: 0,
                })
              : a(e).css({
                  position: "relative",
                  left: b,
                  top: 0,
                  zIndex: c.options.zIndex - 2,
                  opacity: 0,
                });
        }),
          c.$slides
            .eq(c.currentSlide)
            .css({ zIndex: c.options.zIndex - 1, opacity: 1 });
      }),
      (b.prototype.setHeight = function () {
        var a = this;
        if (
          1 === a.options.slidesToShow &&
          a.options.adaptiveHeight === !0 &&
          a.options.vertical === !1
        ) {
          var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
          a.$list.css("height", b);
        }
      }),
      (b.prototype.setOption = b.prototype.slickSetOption =
        function (b, c, d) {
          var e,
            f,
            g = this;
          if ("responsive" === b && "array" === a.type(c))
            for (f in c)
              if ("array" !== a.type(g.options.responsive))
                g.options.responsive = [c[f]];
              else {
                for (e = g.options.responsive.length - 1; e >= 0; )
                  g.options.responsive[e].breakpoint === c[f].breakpoint &&
                    g.options.responsive.splice(e, 1),
                    e--;
                g.options.responsive.push(c[f]);
              }
          else g.options[b] = c;
          d === !0 && (g.unload(), g.reinit());
        }),
      (b.prototype.setPosition = function () {
        var a = this;
        a.setDimensions(),
          a.setHeight(),
          a.options.fade === !1
            ? a.setCSS(a.getLeft(a.currentSlide))
            : a.setFade(),
          a.$slider.trigger("setPosition", [a]);
      }),
      (b.prototype.setProps = function () {
        var a = this,
          b = document.body.style;
        (a.positionProp = a.options.vertical === !0 ? "top" : "left"),
          "top" === a.positionProp
            ? a.$slider.addClass("slick-vertical")
            : a.$slider.removeClass("slick-vertical"),
          (void 0 !== b.WebkitTransition ||
            void 0 !== b.MozTransition ||
            void 0 !== b.msTransition) &&
            a.options.useCSS === !0 &&
            (a.cssTransitions = !0),
          a.options.fade &&
            ("number" == typeof a.options.zIndex
              ? a.options.zIndex < 3 && (a.options.zIndex = 3)
              : (a.options.zIndex = a.defaults.zIndex)),
          void 0 !== b.OTransform &&
            ((a.animType = "OTransform"),
            (a.transformType = "-o-transform"),
            (a.transitionType = "OTransition"),
            void 0 === b.perspectiveProperty &&
              void 0 === b.webkitPerspective &&
              (a.animType = !1)),
          void 0 !== b.MozTransform &&
            ((a.animType = "MozTransform"),
            (a.transformType = "-moz-transform"),
            (a.transitionType = "MozTransition"),
            void 0 === b.perspectiveProperty &&
              void 0 === b.MozPerspective &&
              (a.animType = !1)),
          void 0 !== b.webkitTransform &&
            ((a.animType = "webkitTransform"),
            (a.transformType = "-webkit-transform"),
            (a.transitionType = "webkitTransition"),
            void 0 === b.perspectiveProperty &&
              void 0 === b.webkitPerspective &&
              (a.animType = !1)),
          void 0 !== b.msTransform &&
            ((a.animType = "msTransform"),
            (a.transformType = "-ms-transform"),
            (a.transitionType = "msTransition"),
            void 0 === b.msTransform && (a.animType = !1)),
          void 0 !== b.transform &&
            a.animType !== !1 &&
            ((a.animType = "transform"),
            (a.transformType = "transform"),
            (a.transitionType = "transition")),
          (a.transformsEnabled =
            a.options.useTransform && null !== a.animType && a.animType !== !1);
      }),
      (b.prototype.setSlideClasses = function (a) {
        var b,
          c,
          d,
          e,
          f = this;
        (c = f.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
          f.$slides.eq(a).addClass("slick-current"),
          f.options.centerMode === !0
            ? ((b = Math.floor(f.options.slidesToShow / 2)),
              f.options.infinite === !0 &&
                (a >= b && a <= f.slideCount - 1 - b
                  ? f.$slides
                      .slice(a - b, a + b + 1)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : ((d = f.options.slidesToShow + a),
                    c
                      .slice(d - b + 1, d + b + 2)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")),
                0 === a
                  ? c
                      .eq(c.length - 1 - f.options.slidesToShow)
                      .addClass("slick-center")
                  : a === f.slideCount - 1 &&
                    c.eq(f.options.slidesToShow).addClass("slick-center")),
              f.$slides.eq(a).addClass("slick-center"))
            : a >= 0 && a <= f.slideCount - f.options.slidesToShow
            ? f.$slides
                .slice(a, a + f.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : c.length <= f.options.slidesToShow
            ? c.addClass("slick-active").attr("aria-hidden", "false")
            : ((e = f.slideCount % f.options.slidesToShow),
              (d = f.options.infinite === !0 ? f.options.slidesToShow + a : a),
              f.options.slidesToShow == f.options.slidesToScroll &&
              f.slideCount - a < f.options.slidesToShow
                ? c
                    .slice(d - (f.options.slidesToShow - e), d + e)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : c
                    .slice(d, d + f.options.slidesToShow)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
          "ondemand" === f.options.lazyLoad && f.lazyLoad();
      }),
      (b.prototype.setupInfinite = function () {
        var b,
          c,
          d,
          e = this;
        if (
          (e.options.fade === !0 && (e.options.centerMode = !1),
          e.options.infinite === !0 &&
            e.options.fade === !1 &&
            ((c = null), e.slideCount > e.options.slidesToShow))
        ) {
          for (
            d =
              e.options.centerMode === !0
                ? e.options.slidesToShow + 1
                : e.options.slidesToShow,
              b = e.slideCount;
            b > e.slideCount - d;
            b -= 1
          )
            (c = b - 1),
              a(e.$slides[c])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", c - e.slideCount)
                .prependTo(e.$slideTrack)
                .addClass("slick-cloned");
          for (b = 0; d > b; b += 1)
            (c = b),
              a(e.$slides[c])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", c + e.slideCount)
                .appendTo(e.$slideTrack)
                .addClass("slick-cloned");
          e.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              a(this).attr("id", "");
            });
        }
      }),
      (b.prototype.setPaused = function (a) {
        var b = this;
        b.options.autoplay === !0 &&
          b.options.pauseOnHover === !0 &&
          ((b.paused = a), a ? b.autoPlayClear() : b.autoPlay());
      }),
      (b.prototype.selectHandler = function (b) {
        var c = this,
          d = a(b.target).is(".slick-slide")
            ? a(b.target)
            : a(b.target).parents(".slick-slide"),
          e = parseInt(d.attr("data-slick-index"));
        return (
          e || (e = 0),
          c.slideCount <= c.options.slidesToShow
            ? (c.setSlideClasses(e), void c.asNavFor(e))
            : void c.slideHandler(e)
        );
      }),
      (b.prototype.slideHandler = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = null,
          i = this;
        return (
          (b = b || !1),
          (i.animating === !0 && i.options.waitForAnimate === !0) ||
          (i.options.fade === !0 && i.currentSlide === a) ||
          i.slideCount <= i.options.slidesToShow
            ? void 0
            : (b === !1 && i.asNavFor(a),
              (d = a),
              (h = i.getLeft(d)),
              (g = i.getLeft(i.currentSlide)),
              (i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft),
              i.options.infinite === !1 &&
              i.options.centerMode === !1 &&
              (0 > a || a > i.getDotCount() * i.options.slidesToScroll)
                ? void (
                    i.options.fade === !1 &&
                    ((d = i.currentSlide),
                    c !== !0
                      ? i.animateSlide(g, function () {
                          i.postSlide(d);
                        })
                      : i.postSlide(d))
                  )
                : i.options.infinite === !1 &&
                  i.options.centerMode === !0 &&
                  (0 > a || a > i.slideCount - i.options.slidesToScroll)
                ? void (
                    i.options.fade === !1 &&
                    ((d = i.currentSlide),
                    c !== !0
                      ? i.animateSlide(g, function () {
                          i.postSlide(d);
                        })
                      : i.postSlide(d))
                  )
                : (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer),
                  (e =
                    0 > d
                      ? i.slideCount % i.options.slidesToScroll !== 0
                        ? i.slideCount -
                          (i.slideCount % i.options.slidesToScroll)
                        : i.slideCount + d
                      : d >= i.slideCount
                      ? i.slideCount % i.options.slidesToScroll !== 0
                        ? 0
                        : d - i.slideCount
                      : d),
                  (i.animating = !0),
                  i.$slider.trigger("beforeChange", [i, i.currentSlide, e]),
                  (f = i.currentSlide),
                  (i.currentSlide = e),
                  i.setSlideClasses(i.currentSlide),
                  i.updateDots(),
                  i.updateArrows(),
                  i.options.fade === !0
                    ? (c !== !0
                        ? (i.fadeSlideOut(f),
                          i.fadeSlide(e, function () {
                            i.postSlide(e);
                          }))
                        : i.postSlide(e),
                      void i.animateHeight())
                    : void (c !== !0
                        ? i.animateSlide(h, function () {
                            i.postSlide(e);
                          })
                        : i.postSlide(e))))
        );
      }),
      (b.prototype.startLoad = function () {
        var a = this;
        a.options.arrows === !0 &&
          a.slideCount > a.options.slidesToShow &&
          (a.$prevArrow.hide(), a.$nextArrow.hide()),
          a.options.dots === !0 &&
            a.slideCount > a.options.slidesToShow &&
            a.$dots.hide(),
          a.$slider.addClass("slick-loading");
      }),
      (b.prototype.swipeDirection = function () {
        var a,
          b,
          c,
          d,
          e = this;
        return (
          (a = e.touchObject.startX - e.touchObject.curX),
          (b = e.touchObject.startY - e.touchObject.curY),
          (c = Math.atan2(b, a)),
          (d = Math.round((180 * c) / Math.PI)),
          0 > d && (d = 360 - Math.abs(d)),
          45 >= d && d >= 0
            ? e.options.rtl === !1
              ? "left"
              : "right"
            : 360 >= d && d >= 315
            ? e.options.rtl === !1
              ? "left"
              : "right"
            : d >= 135 && 225 >= d
            ? e.options.rtl === !1
              ? "right"
              : "left"
            : e.options.verticalSwiping === !0
            ? d >= 35 && 135 >= d
              ? "left"
              : "right"
            : "vertical"
        );
      }),
      (b.prototype.swipeEnd = function (a) {
        var b,
          c = this;
        if (
          ((c.dragging = !1),
          (c.shouldClick = !(c.touchObject.swipeLength > 10)),
          void 0 === c.touchObject.curX)
        )
          return !1;
        if (
          (c.touchObject.edgeHit === !0 &&
            c.$slider.trigger("edge", [c, c.swipeDirection()]),
          c.touchObject.swipeLength >= c.touchObject.minSwipe)
        )
          switch (c.swipeDirection()) {
            case "left":
              (b = c.options.swipeToSlide
                ? c.checkNavigable(c.currentSlide + c.getSlideCount())
                : c.currentSlide + c.getSlideCount()),
                c.slideHandler(b),
                (c.currentDirection = 0),
                (c.touchObject = {}),
                c.$slider.trigger("swipe", [c, "left"]);
              break;
            case "right":
              (b = c.options.swipeToSlide
                ? c.checkNavigable(c.currentSlide - c.getSlideCount())
                : c.currentSlide - c.getSlideCount()),
                c.slideHandler(b),
                (c.currentDirection = 1),
                (c.touchObject = {}),
                c.$slider.trigger("swipe", [c, "right"]);
          }
        else
          c.touchObject.startX !== c.touchObject.curX &&
            (c.slideHandler(c.currentSlide), (c.touchObject = {}));
      }),
      (b.prototype.swipeHandler = function (a) {
        var b = this;
        if (
          !(
            b.options.swipe === !1 ||
            ("ontouchend" in document && b.options.swipe === !1) ||
            (b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))
          )
        )
          switch (
            ((b.touchObject.fingerCount =
              a.originalEvent && void 0 !== a.originalEvent.touches
                ? a.originalEvent.touches.length
                : 1),
            (b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold),
            b.options.verticalSwiping === !0 &&
              (b.touchObject.minSwipe =
                b.listHeight / b.options.touchThreshold),
            a.data.action)
          ) {
            case "start":
              b.swipeStart(a);
              break;
            case "move":
              b.swipeMove(a);
              break;
            case "end":
              b.swipeEnd(a);
          }
      }),
      (b.prototype.swipeMove = function (a) {
        var b,
          c,
          d,
          e,
          f,
          g = this;
        return (
          (f = void 0 !== a.originalEvent ? a.originalEvent.touches : null),
          !(!g.dragging || (f && 1 !== f.length)) &&
            ((b = g.getLeft(g.currentSlide)),
            (g.touchObject.curX = void 0 !== f ? f[0].pageX : a.clientX),
            (g.touchObject.curY = void 0 !== f ? f[0].pageY : a.clientY),
            (g.touchObject.swipeLength = Math.round(
              Math.sqrt(Math.pow(g.touchObject.curX - g.touchObject.startX, 2))
            )),
            g.options.verticalSwiping === !0 &&
              (g.touchObject.swipeLength = Math.round(
                Math.sqrt(
                  Math.pow(g.touchObject.curY - g.touchObject.startY, 2)
                )
              )),
            (c = g.swipeDirection()),
            "vertical" !== c
              ? (void 0 !== a.originalEvent &&
                  g.touchObject.swipeLength > 4 &&
                  a.preventDefault(),
                (e =
                  (g.options.rtl === !1 ? 1 : -1) *
                  (g.touchObject.curX > g.touchObject.startX ? 1 : -1)),
                g.options.verticalSwiping === !0 &&
                  (e = g.touchObject.curY > g.touchObject.startY ? 1 : -1),
                (d = g.touchObject.swipeLength),
                (g.touchObject.edgeHit = !1),
                g.options.infinite === !1 &&
                  ((0 === g.currentSlide && "right" === c) ||
                    (g.currentSlide >= g.getDotCount() && "left" === c)) &&
                  ((d = g.touchObject.swipeLength * g.options.edgeFriction),
                  (g.touchObject.edgeHit = !0)),
                g.options.vertical === !1
                  ? (g.swipeLeft = b + d * e)
                  : (g.swipeLeft =
                      b + d * (g.$list.height() / g.listWidth) * e),
                g.options.verticalSwiping === !0 && (g.swipeLeft = b + d * e),
                g.options.fade !== !0 &&
                  g.options.touchMove !== !1 &&
                  (g.animating === !0
                    ? ((g.swipeLeft = null), !1)
                    : void g.setCSS(g.swipeLeft)))
              : void 0)
        );
      }),
      (b.prototype.swipeStart = function (a) {
        var b,
          c = this;
        return 1 !== c.touchObject.fingerCount ||
          c.slideCount <= c.options.slidesToShow
          ? ((c.touchObject = {}), !1)
          : (void 0 !== a.originalEvent &&
              void 0 !== a.originalEvent.touches &&
              (b = a.originalEvent.touches[0]),
            (c.touchObject.startX = c.touchObject.curX =
              void 0 !== b ? b.pageX : a.clientX),
            (c.touchObject.startY = c.touchObject.curY =
              void 0 !== b ? b.pageY : a.clientY),
            void (c.dragging = !0));
      }),
      (b.prototype.unfilterSlides = b.prototype.slickUnfilter =
        function () {
          var a = this;
          null !== a.$slidesCache &&
            (a.unload(),
            a.$slideTrack.children(this.options.slide).detach(),
            a.$slidesCache.appendTo(a.$slideTrack),
            a.reinit());
        }),
      (b.prototype.unload = function () {
        var b = this;
        a(".slick-cloned", b.$slider).remove(),
          b.$dots && b.$dots.remove(),
          b.$prevArrow &&
            b.htmlExpr.test(b.options.prevArrow) &&
            b.$prevArrow.remove(),
          b.$nextArrow &&
            b.htmlExpr.test(b.options.nextArrow) &&
            b.$nextArrow.remove(),
          b.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (b.prototype.unslick = function (a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy();
      }),
      (b.prototype.updateArrows = function () {
        var a,
          b = this;
        (a = Math.floor(b.options.slidesToShow / 2)),
          b.options.arrows === !0 &&
            b.slideCount > b.options.slidesToShow &&
            !b.options.infinite &&
            (b.$prevArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            b.$nextArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            0 === b.currentSlide
              ? (b.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                b.$nextArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : b.currentSlide >= b.slideCount - b.options.slidesToShow &&
                b.options.centerMode === !1
              ? (b.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                b.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : b.currentSlide >= b.slideCount - 1 &&
                b.options.centerMode === !0 &&
                (b.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                b.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false")));
      }),
      (b.prototype.updateDots = function () {
        var a = this;
        null !== a.$dots &&
          (a.$dots
            .find("li")
            .removeClass("slick-active")
            .attr("aria-hidden", "true"),
          a.$dots
            .find("li")
            .eq(Math.floor(a.currentSlide / a.options.slidesToScroll))
            .addClass("slick-active")
            .attr("aria-hidden", "false"));
      }),
      (b.prototype.visibility = function () {
        var a = this;
        document[a.hidden]
          ? ((a.paused = !0), a.autoPlayClear())
          : a.options.autoplay === !0 && ((a.paused = !1), a.autoPlay());
      }),
      (b.prototype.initADA = function () {
        var b = this;
        b.$slides
          .add(b.$slideTrack.find(".slick-cloned"))
          .attr({ "aria-hidden": "true", tabindex: "-1" })
          .find("a, input, button, select")
          .attr({ tabindex: "-1" }),
          b.$slideTrack.attr("role", "listbox"),
          b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
            a(this).attr({
              role: "option",
              "aria-describedby": "slick-slide" + b.instanceUid + c,
            });
          }),
          null !== b.$dots &&
            b.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (c) {
                a(this).attr({
                  role: "presentation",
                  "aria-selected": "false",
                  "aria-controls": "navigation" + b.instanceUid + c,
                  id: "slick-slide" + b.instanceUid + c,
                });
              })
              .first()
              .attr("aria-selected", "true")
              .end()
              .find("button")
              .attr("role", "button")
              .end()
              .closest("div")
              .attr("role", "toolbar"),
          b.activateADA();
      }),
      (b.prototype.activateADA = function () {
        var a = this;
        a.$slideTrack
          .find(".slick-active")
          .attr({ "aria-hidden": "false" })
          .find("a, input, button, select")
          .attr({ tabindex: "0" });
      }),
      (b.prototype.focusHandler = function () {
        var b = this;
        b.$slider.on("focus.slick blur.slick", "*", function (c) {
          c.stopImmediatePropagation();
          var d = a(this);
          setTimeout(function () {
            b.isPlay &&
              (d.is(":focus")
                ? (b.autoPlayClear(), (b.paused = !0))
                : ((b.paused = !1), b.autoPlay()));
          }, 0);
        });
      }),
      (a.fn.slick = function () {
        var a,
          c,
          d = this,
          e = arguments[0],
          f = Array.prototype.slice.call(arguments, 1),
          g = d.length;
        for (a = 0; g > a; a++)
          if (
            ("object" == typeof e || "undefined" == typeof e
              ? (d[a].slick = new b(d[a], e))
              : (c = d[a].slick[e].apply(d[a].slick, f)),
            "undefined" != typeof c)
          )
            return c;
        return d;
      });
  });
