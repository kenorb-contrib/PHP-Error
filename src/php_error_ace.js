                    (function () {
                        function h(a) {
                            var c = function (a, b) {
                                    return e("", a, b)
                                },
                                f = b;
                            a && (b[a] || (b[a] = {}), f = b[a]);
                            if (!f.define || !f.define.packaged) d.original = f.define, f.define = d, f.define.packaged = !0;
                            if (!f.require || !f.require.packaged) e.original = f.require, f.require = c, f.require.packaged = !0
                        }
                        var a = "ace",
                            b = function () {
                                return this
                            }();
                        if (!a && typeof requirejs != "undefined") {
                            var c = b.define;
                            b.define = function (a, b, d) {
                                return typeof d != "function" ? c.apply(this, arguments) : ace.define(a, b, function (a, c, e) {
                                    return b[2] == "module" && (e.packaged = !0), d.apply(this, arguments)
                                })
                            }, b.define.packaged = !0;
                            return
                        }
                        var d = function (a, b, c) {
                                if (typeof a != "string") {
                                    d.original ? d.original.apply(window, arguments) : (console.error("dropping module because define wasn't a string."), console.trace());
                                    return
                                }
                                arguments.length == 2 && (c = b), d.modules || (d.modules = {}), d.modules[a] = c
                            },
                            e = function (a, b, c) {
                                if (Object.prototype.toString.call(b) === "[object Array]") {
                                    var d = [];
                                    for (var f = 0, h = b.length;
                                    f < h; ++f) {
                                        var i = g(a, b[f]);
                                        if (!i && e.original) return e.original.apply(window, arguments);
                                        d.push(i)
                                    }
                                    c && c.apply(null, d)
                                } else {
                                    if (typeof b == "string") {
                                        var j = g(a, b);
                                        return !j && e.original ? e.original.apply(window, arguments) : (c && c(), j)
                                    }
                                    if (e.original) return e.original.apply(window, arguments)
                                }
                            },
                            f = function (a, b) {
                                if (b.indexOf("!") !== -1) {
                                    var c = b.split("!");
                                    return f(a, c[0]) + "!" + f(a, c[1])
                                }
                                if (b.charAt(0) == ".") {
                                    var d = a.split("/").slice(0, -1).join("/");
                                    b = d + "/" + b;
                                    while (b.indexOf(".") !== -1 && e != b) {
                                        var e = b;
                                        b = b.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "")
                                    }
                                }
                                return b
                            },
                            g = function (a, b) {
                                b = f(a, b);
                                var c = d.modules[b];
                                if (!c) return null;
                                if (typeof c == "function") {
                                    var g = {},
                                        h = {
                                            id: b,
                                            uri: "",
                                            exports: g,
                                            packaged: !0
                                        },
                                        i = function (a, c) {
                                            return e(b, a, c)
                                        },
                                        j = c(i, g, h);
                                    return g = j || h.exports, d.modules[b] = g, g
                                }
                                return c
                            };
                        h(a)
                    })(), ace.define("ace/requirejs/text", ["require", "exports", "module"], function (a, b, c) {
                        b.load = function (b, c, d, e) {
                            a("ace/lib/net").get(c.toUrl(b), d)
                        }
                    }), ace.define("ace/ace", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/dom", "ace/lib/event", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/multi_select", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/keyboard/state_handler", "ace/placeholder", "ace/config", "ace/theme/textmate"], function (a, b, c) {
                        a("./lib/fixoldbrowsers");
                        var d = a("./lib/dom"),
                            e = a("./lib/event"),
                            f = a("./editor").Editor,
                            g = a("./edit_session").EditSession,
                            h = a("./undomanager").UndoManager,
                            i = a("./virtual_renderer").VirtualRenderer,
                            j = a("./multi_select").MultiSelect;
                        a("./worker/worker_client"), a("./keyboard/hash_handler"), a("./keyboard/state_handler"), a("./placeholder"), b.config = a("./config"), b.edit = function (b) {
                            typeof b == "string" && (b = document.getElementById(b));
                            if (b.env && b.env.editor instanceof f) return b.env.editor;
                            var c = new g(d.getInnerText(b));
                            c.setUndoManager(new h), b.innerHTML = "";
                            var k = new f(new i(b, a("./theme/textmate")));
                            new j(k), k.setSession(c);
                            var l = {};
                            return l.document = c, l.editor = k, k.resize(), e.addListener(window, "resize", function () {
                                k.resize()
                            }), b.env = l, k.env = l, k
                        }
                    }), ace.define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"], function (a, b, c) {
                        a("./regexp"), a("./es5-shim")
                    }), ace.define("ace/lib/regexp", ["require", "exports", "module"], function (a, b, c) {
                        function g(a) {
                            return (a.global ? "g" : "") + (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.extended ? "x" : "") + (a.sticky ? "y" : "")
                        }
                        function h(a, b, c) {
                            if (Array.prototype.indexOf) return a.indexOf(b, c);
                            for (var d = c || 0;
                            d < a.length;
                            d++) if (a[d] === b) return d;
                            return -1
                        }
                        var d = {
                            exec: RegExp.prototype.exec,
                            test: RegExp.prototype.test,
                            match: String.prototype.match,
                            replace: String.prototype.replace,
                            split: String.prototype.split
                        },
                            e = d.exec.call(/()??/, "")[1] === undefined,
                            f = function () {
                                var a = /^/g;
                                return d.test.call(a, ""), !a.lastIndex
                            }();
                        if (f && e) return;
                        RegExp.prototype.exec = function (a) {
                            var b = d.exec.apply(this, arguments),
                                c, i;
                            if (typeof a == "string" && b) {
                                !e && b.length > 1 && h(b, "") > -1 && (i = RegExp(this.source, d.replace.call(g(this), "g", "")), d.replace.call(a.slice(b.index), i, function () {
                                    for (var a = 1;
                                    a < arguments.length - 2;
                                    a++) arguments[a] === undefined && (b[a] = undefined)
                                }));
                                if (this._xregexp && this._xregexp.captureNames) for (var j = 1;
                                j < b.length;
                                j++) c = this._xregexp.captureNames[j - 1], c && (b[c] = b[j]);
                                !f && this.global && !b[0].length && this.lastIndex > b.index && this.lastIndex--
                            }
                            return b
                        }, f || (RegExp.prototype.test = function (a) {
                            var b = d.exec.call(this, a);
                            return b && this.global && !b[0].length && this.lastIndex > b.index && this.lastIndex--, !! b
                        })
                    }), ace.define("ace/lib/es5-shim", ["require", "exports", "module"], function (a, b, c) {
                        function p(a) {
                            try {
                                return Object.defineProperty(a, "sentinel", {}), "sentinel" in a
                            } catch (b) {}
                        }
                        Function.prototype.bind || (Function.prototype.bind = function (b) {
                            var c = this;
                            if (typeof c != "function") throw new TypeError;
                            var d = g.call(arguments, 1),
                                e = function () {
                                    if (this instanceof e) {
                                        var a = function () {};
                                        a.prototype = c.prototype;
                                        var f = new a,
                                            h = c.apply(f, d.concat(g.call(arguments)));
                                        return h !== null && Object(h) === h ? h : f
                                    }
                                    return c.apply(b, d.concat(g.call(arguments)))
                                };
                            return e
                        });
                        var d = Function.prototype.call,
                            e = Array.prototype,
                            f = Object.prototype,
                            g = e.slice,
                            h = d.bind(f.toString),
                            i = d.bind(f.hasOwnProperty),
                            j, k, l, m, n;
                        if (n = i(f, "__defineGetter__")) j = d.bind(f.__defineGetter__), k = d.bind(f.__defineSetter__), l = d.bind(f.__lookupGetter__), m = d.bind(f.__lookupSetter__);
                        Array.isArray || (Array.isArray = function (b) {
                            return h(b) == "[object Array]"
                        }), Array.prototype.forEach || (Array.prototype.forEach = function (b) {
                            var c = G(this),
                                d = arguments[1],
                                e = 0,
                                f = c.length >>> 0;
                            if (h(b) != "[object Function]") throw new TypeError;
                            while (e < f) e in c && b.call(d, c[e], e, c), e++
                        }), Array.prototype.map || (Array.prototype.map = function (b) {
                            var c = G(this),
                                d = c.length >>> 0,
                                e = Array(d),
                                f = arguments[1];
                            if (h(b) != "[object Function]") throw new TypeError;
                            for (var g = 0; g < d; g++) g in c && (e[g] = b.call(f, c[g], g, c));
                            return e
                        }), Array.prototype.filter || (Array.prototype.filter = function (b) {
                            var c = G(this),
                                d = c.length >>> 0,
                                e = [],
                                f = arguments[1];
                            if (h(b) != "[object Function]") throw new TypeError;
                            for (var g = 0; g < d; g++) g in c && b.call(f, c[g], g, c) && e.push(c[g]);
                            return e
                        }), Array.prototype.every || (Array.prototype.every = function (b) {
                            var c = G(this),
                                d = c.length >>> 0,
                                e = arguments[1];
                            if (h(b) != "[object Function]") throw new TypeError;
                            for (var f = 0; f < d; f++) if (f in c && !b.call(e, c[f], f, c)) return !1;
                            return !0
                        }), Array.prototype.some || (Array.prototype.some = function (b) {
                            var c = G(this),
                                d = c.length >>> 0,
                                e = arguments[1];
                            if (h(b) != "[object Function]") throw new TypeError;
                            for (var f = 0; f < d; f++) if (f in c && b.call(e, c[f], f, c)) return !0;
                            return !1
                        }), Array.prototype.reduce || (Array.prototype.reduce = function (b) {
                            var c = G(this),
                                d = c.length >>> 0;
                            if (h(b) != "[object Function]") throw new TypeError;
                            if (!d && arguments.length == 1) throw new TypeError;
                            var e = 0,
                                f;
                            if (arguments.length >= 2) f = arguments[1];
                            else do {
                                if (e in c) {
                                    f = c[e++];
                                    break
                                }
                                if (++e >= d) throw new TypeError
                            } while (!0);
                            for (; e < d; e++) e in c && (f = b.call(void 0, f, c[e], e, c));
                            return f
                        }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function (b) {
                            var c = G(this),
                                d = c.length >>> 0;
                            if (h(b) != "[object Function]") throw new TypeError;
                            if (!d && arguments.length == 1) throw new TypeError;
                            var e, f = d - 1;
                            if (arguments.length >= 2) e = arguments[1];
                            else do {
                                if (f in c) {
                                    e = c[f--];
                                    break
                                }
                                if (--f < 0) throw new TypeError
                            } while (!0);
                            do f in this && (e = b.call(void 0, e, c[f], f, c));
                            while (f--);
                            return e
                        }), Array.prototype.indexOf || (Array.prototype.indexOf = function (b) {
                            var c = G(this),
                                d = c.length >>> 0;
                            if (!d) return -1;
                            var e = 0;
                            arguments.length > 1 && (e = E(arguments[1])), e = e >= 0 ? e : Math.max(0, d + e);
                            for (; e < d; e++) if (e in c && c[e] === b) return e;
                            return -1
                        }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function (b) {
                            var c = G(this),
                                d = c.length >>> 0;
                            if (!d) return -1;
                            var e = d - 1;
                            arguments.length > 1 && (e = Math.min(e, E(arguments[1]))), e = e >= 0 ? e : d - Math.abs(e);
                            for (; e >= 0; e--) if (e in c && b === c[e]) return e;
                            return -1
                        }), Object.getPrototypeOf || (Object.getPrototypeOf = function (b) {
                            return b.__proto__ || (b.constructor ? b.constructor.prototype : f)
                        });
                        if (!Object.getOwnPropertyDescriptor) {
                            var o = "Object.getOwnPropertyDescriptor called on a non-object: ";
                            Object.getOwnPropertyDescriptor = function (b, c) {
                                if (typeof b != "object" && typeof b != "function" || b === null) throw new TypeError(o + b);
                                if (!i(b, c)) return;
                                var d, e, g;
                                d = {
                                    enumerable: !0,
                                    configurable: !0
                                };
                                if (n) {
                                    var h = b.__proto__;
                                    b.__proto__ = f;
                                    var e = l(b, c),
                                        g = m(b, c);
                                    b.__proto__ = h;
                                    if (e || g) return e && (d.get = e), g && (d.set = g), d
                                }
                                return d.value = b[c], d
                            }
                        }
                        Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (b) {
                            return Object.keys(b)
                        }), Object.create || (Object.create = function (b, c) {
                            var d;
                            if (b === null) d = {
                                __proto__: null
                            };
                            else {
                                if (typeof b != "object") throw new TypeError("typeof prototype[" + typeof b + "] != 'object'");
                                var e = function () {};
                                e.prototype = b, d = new e, d.__proto__ = b
                            }
                            return c !== void 0 && Object.defineProperties(d, c), d
                        });
                        if (Object.defineProperty) {
                            var q = p({}),
                                r = typeof document == "undefined" || p(document.createElement("div"));
                            if (!q || !r) var s = Object.defineProperty
                        }
                        if (!Object.defineProperty || s) {
                            var t = "Property description must be an object: ",
                                u = "Object.defineProperty called on non-object: ",
                                v = "getters & setters can not be defined on this javascript engine";
                            Object.defineProperty = function (b, c, d) {
                                if (typeof b != "object" && typeof b != "function" || b === null) throw new TypeError(u + b);
                                if (typeof d != "object" && typeof d != "function" || d === null) throw new TypeError(t + d);
                                if (s) try {
                                    return s.call(Object, b, c, d)
                                } catch (e) {}
                                if (i(d, "value")) if (n && (l(b, c) || m(b, c))) {
                                    var g = b.__proto__;
                                    b.__proto__ = f, delete b[c], b[c] = d.value, b.__proto__ = g
                                } else b[c] = d.value;
                                else {
                                    if (!n) throw new TypeError(v);
                                    i(d, "get") && j(b, c, d.get), i(d, "set") && k(b, c, d.set)
                                }
                                return b
                            }
                        }
                        Object.defineProperties || (Object.defineProperties = function (b, c) {
                            for (var d in c) i(c, d) && Object.defineProperty(b, d, c[d]);
                            return b
                        }), Object.seal || (Object.seal = function (b) {
                            return b
                        }), Object.freeze || (Object.freeze = function (b) {
                            return b
                        });
                        try {
                            Object.freeze(function () {})
                        } catch (w) {
                            Object.freeze = function (b) {
                                return function (c) {
                                    return typeof c == "function" ? c : b(c)
                                }
                            }(Object.freeze)
                        }
                        Object.preventExtensions || (Object.preventExtensions = function (b) {
                            return b
                        }), Object.isSealed || (Object.isSealed = function (b) {
                            return !1
                        }), Object.isFrozen || (Object.isFrozen = function (b) {
                            return !1
                        }), Object.isExtensible || (Object.isExtensible = function (b) {
                            if (Object(b) === b) throw new TypeError;
                            var c = "";
                            while (i(b, c)) c += "?";
                            b[c] = !0;
                            var d = i(b, c);
                            return delete b[c], d
                        });
                        if (!Object.keys) {
                            var x = !0,
                                y = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                                z = y.length;
                            for (var A in {
                                toString: null
                            }) x = !1;
                            Object.keys = function H(a) {
                                if (typeof a != "object" && typeof a != "function" || a === null) throw new TypeError("Object.keys called on a non-object");
                                var H = [];
                                for (var b in a) i(a, b) && H.push(b);
                                if (x) for (var c = 0, d = z; c < d; c++) {
                                    var e = y[c];
                                    i(a, e) && H.push(e)
                                }
                                return H
                            }
                        }
                        if (!Date.prototype.toISOString || (new Date(-621987552e5)).toISOString().indexOf("-000001") === -1) Date.prototype.toISOString = function () {
                            var b, c, d, e;
                            if (!isFinite(this)) throw new RangeError;
                            b = [this.getUTCMonth() + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()], e = this.getUTCFullYear(), e = (e < 0 ? "-" : e > 9999 ? "+" : "") + ("00000" + Math.abs(e)).slice(0 <= e && e <= 9999 ? -4 : -6), c = b.length;
                            while (c--) d = b[c], d < 10 && (b[c] = "0" + d);
                            return e + "-" + b.slice(0, 2).join("-") + "T" + b.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
                        };
                        Date.now || (Date.now = function () {
                            return (new Date).getTime()
                        }), Date.prototype.toJSON || (Date.prototype.toJSON = function (b) {
                            if (typeof this.toISOString != "function") throw new TypeError;
                            return this.toISOString()
                        }), Date.parse("+275760-09-13T00:00:00.000Z") !== 864e13 && (Date = function (a) {
                            var b = function e(b, c, d, f, g, h, i) {
                                    var j = arguments.length;
                                    if (this instanceof a) {
                                        var k = j == 1 && String(b) === b ? new a(e.parse(b)) : j >= 7 ? new a(b, c, d, f, g, h, i) : j >= 6 ? new a(b, c, d, f, g, h) : j >= 5 ? new a(b, c, d, f, g) : j >= 4 ? new a(b, c, d, f) : j >= 3 ? new a(b, c, d) : j >= 2 ? new a(b, c) : j >= 1 ? new a(b) : new a;
                                        return k.constructor = e, k
                                    }
                                    return a.apply(this, arguments)
                                },
                                c = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$");
                            for (var d in a) b[d] = a[d];
                            return b.now = a.now, b.UTC = a.UTC, b.prototype = a.prototype, b.prototype.constructor = b, b.parse = function (d) {
                                var e = c.exec(d);
                                if (e) {
                                    e.shift();
                                    for (var f = 1; f < 7; f++) e[f] = +(e[f] || (f < 3 ? 1 : 0)), f == 1 && e[f]--;
                                    var g = +e.pop(),
                                        h = +e.pop(),
                                        i = e.pop(),
                                        j = 0;
                                    if (i) {
                                        if (h > 23 || g > 59) return NaN;
                                        j = (h * 60 + g) * 6e4 * (i == "+" ? -1 : 1)
                                    }
                                    var k = +e[0];
                                    return 0 <= k && k <= 99 ? (e[0] = k + 400, a.UTC.apply(this, e) + j - 126227808e5) : a.UTC.apply(this, e) + j
                                }
                                return a.parse.apply(this, arguments)
                            }, b
                        }(Date));
                        var B = "   \n\f\r Â áš€á Žâ€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029ï»¿";
                        if (!String.prototype.trim || B.trim()) {
                            B = "[" + B + "]";
                            var C = new RegExp("^" + B + B + "*"),
                                D = new RegExp(B + B + "*$");
                            String.prototype.trim = function () {
                                return String(this).replace(C, "").replace(D, "")
                            }
                        }
                        var E = function (a) {
                                return a = +a, a !== a ? a = 0 : a !== 0 && a !== 1 / 0 && a !== -Infinity && (a = (a > 0 || -1) * Math.floor(Math.abs(a))), a
                            },
                            F = "a" [0] != "a",
                            G = function (a) {
                                if (a == null) throw new TypeError;
                                return F && typeof a == "string" && a ? a.split("") : Object(a)
                            }
                    }), ace.define("ace/lib/dom", ["require", "exports", "module"], function (a, b, c) {
                        var d = "http://www.w3.org/1999/xhtml";
                        b.createElement = function (a, b) {
                            return document.createElementNS ? document.createElementNS(b || d, a) : document.createElement(a)
                        }, b.setText = function (a, b) {
                            a.innerText !== undefined && (a.innerText = b), a.textContent !== undefined && (a.textContent = b)
                        }, b.hasCssClass = function (a, b) {
                            var c = a.className.split(/\s+/g);
                            return c.indexOf(b) !== -1
                        }, b.addCssClass = function (a, c) {
                            b.hasCssClass(a, c) || (a.className += " " + c)
                        }, b.removeCssClass = function (a, b) {
                            var c = a.className.split(/\s+/g);
                            for (;;) {
                                var d = c.indexOf(b);
                                if (d == -1) break;
                                c.splice(d, 1)
                            }
                            a.className = c.join(" ")
                        }, b.toggleCssClass = function (a, b) {
                            var c = a.className.split(/\s+/g),
                                d = !0;
                            for (;;) {
                                var e = c.indexOf(b);
                                if (e == -1) break;
                                d = !1, c.splice(e, 1)
                            }
                            return d && c.push(b), a.className = c.join(" "), d
                        }, b.setCssClass = function (a, c, d) {
                            d ? b.addCssClass(a, c) : b.removeCssClass(a, c)
                        }, b.hasCssString = function (a, b) {
                            var c = 0,
                                d;
                            b = b || document;
                            if (b.createStyleSheet && (d = b.styleSheets)) {
                                while (c < d.length) if (d[c++].owningElement.id === a) return !0
                            } else if (d = b.getElementsByTagName("style")) while (c < d.length) if (d[c++].id === a) return !0;
                            return !1
                        }, b.importCssString = function (c, e, f) {
                            f = f || document;
                            if (e && b.hasCssString(e, f)) return null;
                            var g;
                            if (f.createStyleSheet) g = f.createStyleSheet(), g.cssText = c, e && (g.owningElement.id = e);
                            else {
                                g = f.createElementNS ? f.createElementNS(d, "style") : f.createElement("style"), g.appendChild(f.createTextNode(c)), e && (g.id = e);
                                var h = f.getElementsByTagName("head")[0] || f.documentElement;
                                h.appendChild(g)
                            }
                        }, b.importCssStylsheet = function (a, c) {
                            if (c.createStyleSheet) c.createStyleSheet(a);
                            else {
                                var d = b.createElement("link");
                                d.rel = "stylesheet", d.href = a;
                                var e = c.getElementsByTagName("head")[0] || c.documentElement;
                                e.appendChild(d)
                            }
                        }, b.getInnerWidth = function (a) {
                            return parseInt(b.computedStyle(a, "paddingLeft"), 10) + parseInt(b.computedStyle(a, "paddingRight"), 10) + a.clientWidth
                        }, b.getInnerHeight = function (a) {
                            return parseInt(b.computedStyle(a, "paddingTop"), 10) + parseInt(b.computedStyle(a, "paddingBottom"), 10) + a.clientHeight
                        }, window.pageYOffset !== undefined ? (b.getPageScrollTop = function () {
                            return window.pageYOffset
                        }, b.getPageScrollLeft = function () {
                            return window.pageXOffset
                        }) : (b.getPageScrollTop = function () {
                            return document.body.scrollTop
                        }, b.getPageScrollLeft = function () {
                            return document.body.scrollLeft
                        }), window.getComputedStyle ? b.computedStyle = function (a, b) {
                            return b ? (window.getComputedStyle(a, "") || {})[b] || "" : window.getComputedStyle(a, "") || {}
                        } : b.computedStyle = function (a, b) {
                            return b ? a.currentStyle[b] : a.currentStyle
                        }, b.scrollbarWidth = function (a) {
                            var c = b.createElement("p");
                            c.style.width = "100%", c.style.minWidth = "0px", c.style.height = "200px";
                            var d = b.createElement("div"),
                                e = d.style;
                            e.position = "absolute", e.left = "-10000px", e.overflow = "hidden", e.width = "200px", e.minWidth = "0px", e.height = "150px", d.appendChild(c);
                            var f = a.body || a.documentElement;
                            f.appendChild(d);
                            var g = c.offsetWidth;
                            e.overflow = "scroll";
                            var h = c.offsetWidth;
                            return g == h && (h = d.clientWidth), f.removeChild(d), g - h
                        }, b.setInnerHtml = function (a, b) {
                            var c = a.cloneNode(!1);
                            return c.innerHTML = b, a.parentNode.replaceChild(c, a), c
                        }, b.setInnerText = function (a, b) {
                            var c = a.ownerDocument;
                            c.body && "textContent" in c.body ? a.textContent = b : a.innerText = b
                        }, b.getInnerText = function (a) {
                            var b = a.ownerDocument;
                            return b.body && "textContent" in b.body ? a.textContent : a.innerText || a.textContent || ""
                        }, b.getParentWindow = function (a) {
                            return a.defaultView || a.parentWindow
                        }
                    }), ace.define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent", "ace/lib/dom"], function (a, b, c) {
                        function g(a, b, c) {
                            var f = 0;
                            !e.isOpera || "KeyboardEvent" in window || !e.isMac ? f = 0 | (b.ctrlKey ? 1 : 0) | (b.altKey ? 2 : 0) | (b.shiftKey ? 4 : 0) | (b.metaKey ? 8 : 0) : f = 0 | (b.metaKey ? 1 : 0) | (b.altKey ? 2 : 0) | (b.shiftKey ? 4 : 0) | (b.ctrlKey ? 8 : 0);
                            if (c in d.MODIFIER_KEYS) {
                                switch (d.MODIFIER_KEYS[c]) {
                                case "Alt":
                                    f = 2;
                                    break;
                                case "Shift":
                                    f = 4;
                                    break;
                                case "Ctrl":
                                    f = 1;
                                    break;
                                default:
                                    f = 8
                                }
                                c = 0
                            }
                            return f & 8 && (c == 91 || c == 93) && (c = 0), !! f || c in d.FUNCTION_KEYS || c in d.PRINTABLE_KEYS ? a(b, f, c) : !1
                        }
                        var d = a("./keys"),
                            e = a("./useragent"),
                            f = a("./dom");
                        b.addListener = function (a, b, c) {
                            if (a.addEventListener) return a.addEventListener(b, c, !1);
                            if (a.attachEvent) {
                                var d = function () {
                                        c(window.event)
                                    };
                                c._wrapper = d, a.attachEvent("on" + b, d)
                            }
                        }, b.removeListener = function (a, b, c) {
                            if (a.removeEventListener) return a.removeEventListener(b, c, !1);
                            a.detachEvent && a.detachEvent("on" + b, c._wrapper || c)
                        }, b.stopEvent = function (a) {
                            return b.stopPropagation(a), b.preventDefault(a), !1
                        }, b.stopPropagation = function (a) {
                            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
                        }, b.preventDefault = function (a) {
                            a.preventDefault ? a.preventDefault() : a.returnValue = !1
                        }, b.getButton = function (a) {
                            return a.type == "dblclick" ? 0 : a.type == "contextmenu" || a.ctrlKey && e.isMac ? 2 : a.preventDefault ? a.button : {
                                1: 0,
                                2: 2,
                                4: 1
                            }[a.button]
                        }, document.documentElement.setCapture ? b.capture = function (a, c, d) {
                            function f(g) {
                                c(g), e || (e = !0, d(g)), b.removeListener(a, "mousemove", c), b.removeListener(a, "mouseup", f), b.removeListener(a, "losecapture", f), a.releaseCapture()
                            }
                            var e = !1;
                            b.addListener(a, "mousemove", c), b.addListener(a, "mouseup", f), b.addListener(a, "losecapture", f), a.setCapture()
                        } : b.capture = function (a, b, c) {
                            function d(a) {
                                b && b(a), c && c(a), document.removeEventListener("mousemove", b, !0), document.removeEventListener("mouseup", d, !0), a.stopPropagation()
                            }
                            document.addEventListener("mousemove", b, !0), document.addEventListener("mouseup", d, !0)
                        }, b.addMouseWheelListener = function (a, c) {
                            var d = 8,
                                e = function (a) {
                                    a.wheelDelta !== undefined ? a.wheelDeltaX !== undefined ? (a.wheelX = -a.wheelDeltaX / d, a.wheelY = -a.wheelDeltaY / d) : (a.wheelX = 0, a.wheelY = -a.wheelDelta / d) : a.axis && a.axis == a.HORIZONTAL_AXIS ? (a.wheelX = (a.detail || 0) * 5, a.wheelY = 0) : (a.wheelX = 0, a.wheelY = (a.detail || 0) * 5), c(a)
                                };
                            b.addListener(a, "DOMMouseScroll", e), b.addListener(a, "mousewheel", e)
                        }, b.addMultiMouseDownListener = function (a, c, d, f) {
                            var g = 0,
                                h, i, j, k = {
                                    2: "dblclick",
                                    3: "tripleclick",
                                    4: "quadclick"
                                };
                            b.addListener(a, "mousedown", function (a) {
                                if (b.getButton(a) != 0) g = 0;
                                else {
                                    var e = Math.abs(a.clientX - h) > 5 || Math.abs(a.clientY - i) > 5;
                                    if (!j || e) g = 0;
                                    g += 1, j && clearTimeout(j), j = setTimeout(function () {
                                        j = null
                                    }, c[g - 1] || 600)
                                }
                                g == 1 && (h = a.clientX, i = a.clientY), d[f]("mousedown", a);
                                if (g > 4) g = 0;
                                else if (g > 1) return d[f](k[g], a)
                            }), e.isOldIE && b.addListener(a, "dblclick", function (a) {
                                g = 2, j && clearTimeout(j), j = setTimeout(function () {
                                    j = null
                                }, c[g - 1] || 600), d[f]("mousedown", a), d[f](k[g], a)
                            })
                        }, b.addCommandKeyListener = function (a, c) {
                            var d = b.addListener;
                            if (e.isOldGecko || e.isOpera && !("KeyboardEvent" in window)) {
                                var f = null;
                                d(a, "keydown", function (a) {
                                    f = a.keyCode
                                }), d(a, "keypress", function (a) {
                                    return g(c, a, f)
                                })
                            } else {
                                var h = null;
                                d(a, "keydown", function (a) {
                                    return h = a.keyIdentifier || a.keyCode, g(c, a, a.keyCode)
                                })
                            }
                        };
                        if (window.postMessage && !e.isOldIE) {
                            var h = 1;
                            b.nextTick = function (a, c) {
                                c = c || window;
                                var d = "zero-timeout-message-" + h;
                                b.addListener(c, "message", function e(f) {
                                    f.data == d && (b.stopPropagation(f), b.removeListener(c, "message", e), a())
                                }), c.postMessage(d, "*")
                            }
                        } else b.nextTick = function (a, b) {
                            b = b || window, window.setTimeout(a, 0)
                        }
                    }), ace.define("ace/lib/keys", ["require", "exports", "module", "ace/lib/oop"], function (a, b, c) {
                        var d = a("./oop"),
                            e = function () {
                                var a = {
                                    MODIFIER_KEYS: {
                                        16: "Shift",
                                        17: "Ctrl",
                                        18: "Alt",
                                        224: "Meta"
                                    },
                                    KEY_MODS: {
                                        ctrl: 1,
                                        alt: 2,
                                        option: 2,
                                        shift: 4,
                                        meta: 8,
                                        command: 8
                                    },
                                    FUNCTION_KEYS: {
                                        8: "Backspace",
                                        9: "Tab",
                                        13: "Return",
                                        19: "Pause",
                                        27: "Esc",
                                        32: "Space",
                                        33: "PageUp",
                                        34: "PageDown",
                                        35: "End",
                                        36: "Home",
                                        37: "Left",
                                        38: "Up",
                                        39: "Right",
                                        40: "Down",
                                        44: "Print",
                                        45: "Insert",
                                        46: "Delete",
                                        96: "Numpad0",
                                        97: "Numpad1",
                                        98: "Numpad2",
                                        99: "Numpad3",
                                        100: "Numpad4",
                                        101: "Numpad5",
                                        102: "Numpad6",
                                        103: "Numpad7",
                                        104: "Numpad8",
                                        105: "Numpad9",
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
                                        144: "Numlock",
                                        145: "Scrolllock"
                                    },
                                    PRINTABLE_KEYS: {
                                        32: " ",
                                        48: "0",
                                        49: "1",
                                        50: "2",
                                        51: "3",
                                        52: "4",
                                        53: "5",
                                        54: "6",
                                        55: "7",
                                        56: "8",
                                        57: "9",
                                        59: ";",
                                        61: "=",
                                        65: "a",
                                        66: "b",
                                        67: "c",
                                        68: "d",
                                        69: "e",
                                        70: "f",
                                        71: "g",
                                        72: "h",
                                        73: "i",
                                        74: "j",
                                        75: "k",
                                        76: "l",
                                        77: "m",
                                        78: "n",
                                        79: "o",
                                        80: "p",
                                        81: "q",
                                        82: "r",
                                        83: "s",
                                        84: "t",
                                        85: "u",
                                        86: "v",
                                        87: "w",
                                        88: "x",
                                        89: "y",
                                        90: "z",
                                        107: "+",
                                        109: "-",
                                        110: ".",
                                        188: ",",
                                        190: ".",
                                        191: "/",
                                        192: "`",
                                        219: "[",
                                        220: "\\",
                                        221: "]",
                                        222: "'"
                                    }
                                };
                                for (var b in a.FUNCTION_KEYS) {
                                    var c = a.FUNCTION_KEYS[b].toUpperCase();
                                    a[c] = parseInt(b, 10)
                                }
                                return d.mixin(a, a.MODIFIER_KEYS), d.mixin(a, a.PRINTABLE_KEYS), d.mixin(a, a.FUNCTION_KEYS), a
                            }();
                        d.mixin(b, e), b.keyCodeToString = function (a) {
                            return (e[a] || String.fromCharCode(a)).toLowerCase()
                        }
                    }), ace.define("ace/lib/oop", ["require", "exports", "module"], function (a, b, c) {
                        b.inherits = function () {
                            var a = function () {};
                            return function (b, c) {
                                a.prototype = c.prototype, b.super_ = c.prototype, b.prototype = new a, b.prototype.constructor = b
                            }
                        }(), b.mixin = function (a, b) {
                            for (var c in b) a[c] = b[c]
                        }, b.implement = function (a, c) {
                            b.mixin(a, c)
                        }
                    }), ace.define("ace/lib/useragent", ["require", "exports", "module"], function (a, b, c) {
                        var d = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
                            e = navigator.userAgent;
                        b.isWin = d == "win", b.isMac = d == "mac", b.isLinux = d == "linux", b.isIE = navigator.appName == "Microsoft Internet Explorer" && parseFloat(navigator.userAgent.match(/MSIE ([0-9]+[\.0-9]+)/)[1]), b.isOldIE = b.isIE && b.isIE < 9, b.isGecko = b.isMozilla = window.controllers && window.navigator.product === "Gecko", b.isOldGecko = b.isGecko && parseInt((navigator.userAgent.match(/rv\:(\d+)/) || [])[1], 10) < 4, b.isOpera = window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]", b.isWebKit = parseFloat(e.split("WebKit/")[1]) || undefined, b.isChrome = parseFloat(e.split(" Chrome/")[1]) || undefined, b.isAIR = e.indexOf("AdobeAIR") >= 0, b.isIPad = e.indexOf("iPad") >= 0, b.isTouchPad = e.indexOf("TouchPad") >= 0, b.OS = {
                            LINUX: "LINUX",
                            MAC: "MAC",
                            WINDOWS: "WINDOWS"
                        }, b.getOS = function () {
                            return b.isMac ? b.OS.MAC : b.isLinux ? b.OS.LINUX : b.OS.WINDOWS
                        }
                    }), ace.define("ace/editor", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands"], function (a, b, c) {
                        a("./lib/fixoldbrowsers");
                        var d = a("./lib/oop"),
                            e = a("./lib/lang"),
                            f = a("./lib/useragent"),
                            g = a("./keyboard/textinput").TextInput,
                            h = a("./mouse/mouse_handler").MouseHandler,
                            i = a("./mouse/fold_handler").FoldHandler,
                            j = a("./keyboard/keybinding").KeyBinding,
                            k = a("./edit_session").EditSession,
                            l = a("./search").Search,
                            m = a("./range").Range,
                            n = a("./lib/event_emitter").EventEmitter,
                            o = a("./commands/command_manager").CommandManager,
                            p = a("./commands/default_commands").commands,
                            q = function (a, b) {
                                var c = a.getContainerElement();
                                this.container = c, this.renderer = a, this.commands = new o(f.isMac ? "mac" : "win", p), this.textInput = new g(a.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.keyBinding = new j(this), f.isIPad || (this.$mouseHandler = new h(this), new i(this)), this.$blockScrolling = 0, this.$search = (new l).set({
                                    wrap: !0
                                }), this.setSession(b || new k(""))
                            };
                        (function () {
                            d.implement(this, n), this.setKeyboardHandler = function (a) {
                                this.keyBinding.setKeyboardHandler(a)
                            }, this.getKeyboardHandler = function () {
                                return this.keyBinding.getKeyboardHandler()
                            }, this.setSession = function (a) {
                                if (this.session == a) return;
                                if (this.session) {
                                    var b = this.session;
                                    this.session.removeEventListener("change", this.$onDocumentChange), this.session.removeEventListener("changeMode", this.$onChangeMode), this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.session.removeEventListener("changeTabSize", this.$onChangeTabSize), this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode), this.session.removeEventListener("onChangeFold", this.$onChangeFold), this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker), this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker), this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation), this.session.removeEventListener("changeOverwrite", this.$onCursorChange), this.session.removeEventListener("changeScrollTop", this.$onScrollTopChange), this.session.removeEventListener("changeLeftTop", this.$onScrollLeftChange);
                                    var c = this.session.getSelection();
                                    c.removeEventListener("changeCursor", this.$onCursorChange), c.removeEventListener("changeSelection", this.$onSelectionChange)
                                }
                                this.session = a, this.$onDocumentChange = this.onDocumentChange.bind(this), a.addEventListener("change", this.$onDocumentChange), this.renderer.setSession(a), this.$onChangeMode = this.onChangeMode.bind(this), a.addEventListener("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), a.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), a.addEventListener("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), a.addEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), a.addEventListener("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), a.addEventListener("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.addEventListener("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.addEventListener("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.addEventListener("changeScrollLeft", this.$onScrollLeftChange), this.selection = a.getSelection(), this.selection.addEventListener("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.addEventListener("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.$blockScrolling += 1, this.onCursorChange(), this.$blockScrolling -= 1, this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull(), this._emit("changeSession", {
                                    session: a,
                                    oldSession: b
                                })
                            }, this.getSession = function () {
                                return this.session
                            }, this.setValue = function (a, b) {
                                return this.session.doc.setValue(a), b ? b == 1 ? this.navigateFileEnd() : b == -1 && this.navigateFileStart() : this.selectAll(), a
                            }, this.getValue = function () {
                                return this.session.getValue()
                            }, this.getSelection = function () {
                                return this.selection
                            }, this.resize = function (a) {
                                this.renderer.onResize(a)
                            }, this.setTheme = function (a) {
                                this.renderer.setTheme(a)
                            }, this.getTheme = function () {
                                return this.renderer.getTheme()
                            }, this.setStyle = function (a) {
                                this.renderer.setStyle(a)
                            }, this.unsetStyle = function (a) {
                                this.renderer.unsetStyle(a)
                            }, this.setFontSize = function (a) {
                                this.container.style.fontSize = a, this.renderer.updateFontSize()
                            }, this.$highlightBrackets = function () {
                                this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null);
                                if (this.$highlightPending) return;
                                var a = this;
                                this.$highlightPending = !0, setTimeout(function () {
                                    a.$highlightPending = !1;
                                    var b = a.session.findMatchingBracket(a.getCursorPosition());
                                    if (b) {
                                        var c = new m(b.row, b.column, b.row, b.column + 1);
                                        a.session.$bracketHighlight = a.session.addMarker(c, "ace_bracket", "text")
                                    }
                                }, 10)
                            }, this.focus = function () {
                                var a = this;
                                setTimeout(function () {
                                    a.textInput.focus()
                                }), this.textInput.focus()
                            }, this.isFocused = function () {
                                return this.textInput.isFocused()
                            }, this.blur = function () {
                                this.textInput.blur()
                            }, this.onFocus = function () {
                                if (this.$isFocused) return;
                                this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus")
                            }, this.onBlur = function () {
                                if (!this.$isFocused) return;
                                this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur")
                            }, this.$cursorChange = function () {
                                this.renderer.updateCursor()
                            }, this.onDocumentChange = function (a) {
                                var b = a.data,
                                    c = b.range,
                                    d;
                                c.start.row == c.end.row && b.action != "insertLines" && b.action != "removeLines" ? d = c.end.row : d = Infinity, this.renderer.updateLines(c.start.row, d), this._emit("change", a), this.$cursorChange()
                            }, this.onTokenizerUpdate = function (a) {
                                var b = a.data;
                                this.renderer.updateLines(b.first, b.last)
                            }, this.onScrollTopChange = function () {
                                this.renderer.scrollToY(this.session.getScrollTop())
                            }, this.onScrollLeftChange = function () {
                                this.renderer.scrollToX(this.session.getScrollLeft())
                            }, this.onCursorChange = function () {
                                this.$cursorChange(), this.$blockScrolling || this.renderer.scrollCursorIntoView(), this.$highlightBrackets(), this.$updateHighlightActiveLine(), this._emit("changeSelection")
                            }, this.$updateHighlightActiveLine = function () {
                                var a = this.getSession();
                                a.$highlightLineMarker && a.removeMarker(a.$highlightLineMarker), a.$highlightLineMarker = null;
                                if (this.$highlightActiveLine) {
                                    var b = this.getCursorPosition(),
                                        c = this.session.getFoldLine(b.row);
                                    if (this.getSelectionStyle() != "line" || !this.selection.isMultiLine()) {
                                        var d;
                                        c ? d = new m(c.start.row, 0, c.end.row + 1, 0) : d = new m(b.row, 0, b.row + 1, 0), a.$highlightLineMarker = a.addMarker(d, "ace_active_line", "background")
                                    }
                                }
                            }, this.onSelectionChange = function (a) {
                                var b = this.session;
                                b.$selectionMarker && b.removeMarker(b.$selectionMarker), b.$selectionMarker = null;
                                if (!this.selection.isEmpty()) {
                                    var c = this.selection.getRange(),
                                        d = this.getSelectionStyle();
                                    b.$selectionMarker = b.addMarker(c, "ace_selection", d)
                                } else this.$updateHighlightActiveLine();
                                var e = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
                                this.session.highlight(e), this._emit("changeSelection")
                            }, this.$getSelectionHighLightRegexp = function () {
                                var a = this.session,
                                    b = this.getSelectionRange();
                                if (b.isEmpty() || b.isMultiLine()) return;
                                var c = b.start.column - 1,
                                    d = b.end.column + 1,
                                    e = a.getLine(b.start.row),
                                    f = e.length,
                                    g = e.substring(Math.max(c, 0), Math.min(d, f));
                                if (c >= 0 && /^[\w\d]/.test(g) || d <= f && /[\w\d]$/.test(g)) return;
                                g = e.substring(b.start.column, b.end.column);
                                if (!/^[\w\d]+$/.test(g)) return;
                                var h = this.$search.$assembleRegExp({
                                    wholeWord: !0,
                                    caseSensitive: !0,
                                    needle: g
                                });
                                return h
                            }, this.onChangeFrontMarker = function () {
                                this.renderer.updateFrontMarkers()
                            }, this.onChangeBackMarker = function () {
                                this.renderer.updateBackMarkers()
                            }, this.onChangeBreakpoint = function () {
                                this.renderer.updateBreakpoints()
                            }, this.onChangeAnnotation = function () {
                                this.renderer.setAnnotations(this.session.getAnnotations())
                            }, this.onChangeMode = function () {
                                this.renderer.updateText()
                            }, this.onChangeWrapLimit = function () {
                                this.renderer.updateFull()
                            }, this.onChangeWrapMode = function () {
                                this.renderer.onResize(!0)
                            }, this.onChangeFold = function () {
                                this.$updateHighlightActiveLine(), this.renderer.updateFull()
                            }, this.getCopyText = function () {
                                var a = "";
                                return this.selection.isEmpty() || (a = this.session.getTextRange(this.getSelectionRange())), this._emit("copy", a), a
                            }, this.onCopy = function () {
                                this.commands.exec("copy", this)
                            }, this.onCut = function () {
                                this.commands.exec("cut", this)
                            }, this.onPaste = function (a) {
                                if (this.$readOnly) return;
                                this._emit("paste", a), this.insert(a)
                            }, this.insert = function (a) {
                                var b = this.session,
                                    c = b.getMode(),
                                    d = this.getCursorPosition();
                                if (this.getBehavioursEnabled()) {
                                    var e = c.transformAction(b.getState(d.row), "insertion", this, b, a);
                                    e && (a = e.text)
                                }
                                a = a.replace(" ", this.session.getTabString());
                                if (!this.selection.isEmpty()) d = this.session.remove(this.getSelectionRange()), this.clearSelection();
                                else if (this.session.getOverwrite()) {
                                    var f = new m.fromPoints(d, d);
                                    f.end.column += a.length, this.session.remove(f)
                                }
                                this.clearSelection();
                                var g = d.column,
                                    h = b.getState(d.row),
                                    i = c.checkOutdent(h, b.getLine(d.row), a),
                                    j = b.getLine(d.row),
                                    k = c.getNextLineIndent(h, j.slice(0, d.column), b.getTabString()),
                                    l = b.insert(d, a);
                                e && e.selection && (e.selection.length == 2 ? this.selection.setSelectionRange(new m(d.row, g + e.selection[0], d.row, g + e.selection[1])) : this.selection.setSelectionRange(new m(d.row + e.selection[0], e.selection[1], d.row + e.selection[2], e.selection[3])));
                                var h = b.getState(d.row);
                                if (b.getDocument().isNewLine(a)) {
                                    this.moveCursorTo(d.row + 1, 0);
                                    var n = b.getTabSize(),
                                        o = Number.MAX_VALUE;
                                    for (var p = d.row + 1; p <= l.row; ++p) {
                                        var q = 0;
                                        j = b.getLine(p);
                                        for (var r = 0; r < j.length; ++r) if (j.charAt(r) == " ") q += n;
                                        else {
                                            if (j.charAt(r) != " ") break;
                                            q += 1
                                        }
                                        /[^\s]/.test(j) && (o = Math.min(q, o))
                                    }
                                    for (var p = d.row + 1; p <= l.row; ++p) {
                                        var s = o;
                                        j = b.getLine(p);
                                        for (var r = 0; r < j.length && s > 0; ++r) j.charAt(r) == "    " ? s -= n : j.charAt(r) == " " && (s -= 1);
                                        b.remove(new m(p, 0, p, r))
                                    }
                                    b.indentRows(d.row + 1, l.row, k)
                                }
                                i && c.autoOutdent(h, b, d.row)
                            }, this.onTextInput = function (a) {
                                this.keyBinding.onTextInput(a)
                            }, this.onCommandKey = function (a, b, c) {
                                this.keyBinding.onCommandKey(a, b, c)
                            }, this.setOverwrite = function (a) {
                                this.session.setOverwrite(a)
                            }, this.getOverwrite = function () {
                                return this.session.getOverwrite()
                            }, this.toggleOverwrite = function () {
                                this.session.toggleOverwrite()
                            }, this.setScrollSpeed = function (a) {
                                this.$mouseHandler.setScrollSpeed(a)
                            }, this.getScrollSpeed = function () {
                                return this.$mouseHandler.getScrollSpeed()
                            }, this.setDragDelay = function (a) {
                                this.$mouseHandler.setDragDelay(a)
                            }, this.getDragDelay = function () {
                                return this.$mouseHandler.getDragDelay()
                            }, this.$selectionStyle = "line", this.setSelectionStyle = function (a) {
                                if (this.$selectionStyle == a) return;
                                this.$selectionStyle = a, this.onSelectionChange(), this._emit("changeSelectionStyle", {
                                    data: a
                                })
                            }, this.getSelectionStyle = function () {
                                return this.$selectionStyle
                            }, this.$highlightActiveLine = !0, this.setHighlightActiveLine = function (a) {
                                if (this.$highlightActiveLine == a) return;
                                this.$highlightActiveLine = a, this.$updateHighlightActiveLine()
                            }, this.getHighlightActiveLine = function () {
                                return this.$highlightActiveLine
                            }, this.$highlightGutterLine = !0, this.setHighlightGutterLine = function (a) {
                                if (this.$highlightGutterLine == a) return;
                                this.renderer.setHighlightGutterLine(a), this.$highlightGutterLine = a
                            }, this.getHighlightGutterLine = function () {
                                return this.$highlightGutterLine
                            }, this.$highlightSelectedWord = !0, this.setHighlightSelectedWord = function (a) {
                                if (this.$highlightSelectedWord == a) return;
                                this.$highlightSelectedWord = a, this.$onSelectionChange()
                            }, this.getHighlightSelectedWord = function () {
                                return this.$highlightSelectedWord
                            }, this.setAnimatedScroll = function (a) {
                                this.renderer.setAnimatedScroll(a)
                            }, this.getAnimatedScroll = function () {
                                return this.renderer.getAnimatedScroll()
                            }, this.setShowInvisibles = function (a) {
                                this.renderer.setShowInvisibles(a)
                            }, this.getShowInvisibles = function () {
                                return this.renderer.getShowInvisibles()
                            }, this.setDisplayIndentGuides = function (a) {
                                this.renderer.setDisplayIndentGuides(a)
                            }, this.getDisplayIndentGuides = function () {
                                return this.renderer.getDisplayIndentGuides()
                            }, this.setShowPrintMargin = function (a) {
                                this.renderer.setShowPrintMargin(a)
                            }, this.getShowPrintMargin = function () {
                                return this.renderer.getShowPrintMargin()
                            }, this.setPrintMarginColumn = function (a) {
                                this.renderer.setPrintMarginColumn(a)
                            }, this.getPrintMarginColumn = function () {
                                return this.renderer.getPrintMarginColumn()
                            }, this.$readOnly = !1, this.setReadOnly = function (a) {
                                this.$readOnly = a
                            }, this.getReadOnly = function () {
                                return this.$readOnly
                            }, this.$modeBehaviours = !0, this.setBehavioursEnabled = function (a) {
                                this.$modeBehaviours = a
                            }, this.getBehavioursEnabled = function () {
                                return this.$modeBehaviours
                            }, this.setShowFoldWidgets = function (a) {
                                var b = this.renderer.$gutterLayer;
                                if (b.getShowFoldWidgets() == a) return;
                                this.renderer.$gutterLayer.setShowFoldWidgets(a), this.$showFoldWidgets = a, this.renderer.updateFull()
                            }, this.getShowFoldWidgets = function () {
                                return this.renderer.$gutterLayer.getShowFoldWidgets()
                            }, this.setFadeFoldWidgets = function (a) {
                                this.renderer.setFadeFoldWidgets(a)
                            }, this.getFadeFoldWidgets = function () {
                                return this.renderer.getFadeFoldWidgets()
                            }, this.remove = function (a) {
                                this.selection.isEmpty() && (a == "left" ? this.selection.selectLeft() : this.selection.selectRight());
                                var b = this.getSelectionRange();
                                if (this.getBehavioursEnabled()) {
                                    var c = this.session,
                                        d = c.getState(b.start.row),
                                        e = c.getMode().transformAction(d, "deletion", this, c, b);
                                    e && (b = e)
                                }
                                this.session.remove(b), this.clearSelection()
                            }, this.removeWordRight = function () {
                                this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection()
                            }, this.removeWordLeft = function () {
                                this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection()
                            }, this.removeToLineStart = function () {
                                this.selection.isEmpty() && this.selection.selectLineStart(), this.session.remove(this.getSelectionRange()), this.clearSelection()
                            }, this.removeToLineEnd = function () {
                                this.selection.isEmpty() && this.selection.selectLineEnd();
                                var a = this.getSelectionRange();
                                a.start.column == a.end.column && a.start.row == a.end.row && (a.end.column = 0, a.end.row++), this.session.remove(a), this.clearSelection()
                            }, this.splitLine = function () {
                                this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
                                var a = this.getCursorPosition();
                                this.insert("\n"), this.moveCursorToPosition(a)
                            }, this.transposeLetters = function () {
                                if (!this.selection.isEmpty()) return;
                                var a = this.getCursorPosition(),
                                    b = a.column;
                                if (b === 0) return;
                                var c = this.session.getLine(a.row),
                                    d, e;
                                b < c.length ? (d = c.charAt(b) + c.charAt(b - 1), e = new m(a.row, b - 1, a.row, b + 1)) : (d = c.charAt(b - 1) + c.charAt(b - 2), e = new m(a.row, b - 2, a.row, b)), this.session.replace(e, d)
                            }, this.toLowerCase = function () {
                                var a = this.getSelectionRange();
                                this.selection.isEmpty() && this.selection.selectWord();
                                var b = this.getSelectionRange(),
                                    c = this.session.getTextRange(b);
                                this.session.replace(b, c.toLowerCase()), this.selection.setSelectionRange(a)
                            }, this.toUpperCase = function () {
                                var a = this.getSelectionRange();
                                this.selection.isEmpty() && this.selection.selectWord();
                                var b = this.getSelectionRange(),
                                    c = this.session.getTextRange(b);
                                this.session.replace(b, c.toUpperCase()), this.selection.setSelectionRange(a)
                            }, this.indent = function () {
                                var a = this.session,
                                    b = this.getSelectionRange();
                                if (!(b.start.row < b.end.row || b.start.column < b.end.column)) {
                                    var d;
                                    if (this.session.getUseSoftTabs()) {
                                        var f = a.getTabSize(),
                                            g = this.getCursorPosition(),
                                            h = a.documentToScreenColumn(g.row, g.column),
                                            i = f - h % f;
                                        d = e.stringRepeat(" ", i)
                                    } else d = "    ";
                                    return this.insert(d)
                                }
                                var c = this.$getSelectedRows();
                                a.indentRows(c.first, c.last, " ")
                            }, this.blockOutdent = function () {
                                var a = this.session.getSelection();
                                this.session.outdentRows(a.getRange())
                            }, this.toggleCommentLines = function () {
                                var a = this.session.getState(this.getCursorPosition().row),
                                    b = this.$getSelectedRows();
                                this.session.getMode().toggleCommentLines(a, this.session, b.first, b.last)
                            }, this.removeLines = function () {
                                var a = this.$getSelectedRows(),
                                    b;
                                a.first === 0 || a.last + 1 < this.session.getLength() ? b = new m(a.first, 0, a.last + 1, 0) : b = new m(a.first - 1, this.session.getLine(a.first - 1).length, a.last, this.session.getLine(a.last).length), this.session.remove(b), this.clearSelection()
                            }, this.duplicateSelection = function () {
                                var a = this.selection,
                                    b = this.session,
                                    c = a.getRange();
                                if (c.isEmpty()) {
                                    var d = c.start.row;
                                    b.duplicateLines(d, d)
                                } else {
                                    var e = a.isBackwards(),
                                        f = a.isBackwards() ? c.start : c.end,
                                        g = b.insert(f, b.getTextRange(c), !1);
                                    c.start = f, c.end = g, a.setSelectionRange(c, e)
                                }
                            }, this.moveLinesDown = function () {
                                this.$moveLines(function (a, b) {
                                    return this.session.moveLinesDown(a, b)
                                })
                            }, this.moveLinesUp = function () {
                                this.$moveLines(function (a, b) {
                                    return this.session.moveLinesUp(a, b)
                                })
                            }, this.moveText = function (a, b) {
                                return this.$readOnly ? null : this.session.moveText(a, b)
                            }, this.copyLinesUp = function () {
                                this.$moveLines(function (a, b) {
                                    return this.session.duplicateLines(a, b), 0
                                })
                            }, this.copyLinesDown = function () {
                                this.$moveLines(function (a, b) {
                                    return this.session.duplicateLines(a, b)
                                })
                            }, this.$moveLines = function (a) {
                                var b = this.$getSelectedRows(),
                                    c = this.selection;
                                if (!c.isMultiLine()) var d = c.getRange(),
                                    e = c.isBackwards();
                                var f = a.call(this, b.first, b.last);
                                d ? (d.start.row += f, d.end.row += f, c.setSelectionRange(d, e)) : (c.setSelectionAnchor(b.last + f + 1, 0), c.$moveSelection(function () {
                                    c.moveCursorTo(b.first + f, 0)
                                }))
                            }, this.$getSelectedRows = function () {
                                var a = this.getSelectionRange().collapseRows();
                                return {
                                    first: a.start.row,
                                    last: a.end.row
                                }
                            }, this.onCompositionStart = function (a) {
                                this.renderer.showComposition(this.getCursorPosition())
                            }, this.onCompositionUpdate = function (a) {
                                this.renderer.setCompositionText(a)
                            }, this.onCompositionEnd = function () {
                                this.renderer.hideComposition()
                            }, this.getFirstVisibleRow = function () {
                                return this.renderer.getFirstVisibleRow()
                            }, this.getLastVisibleRow = function () {
                                return this.renderer.getLastVisibleRow()
                            }, this.isRowVisible = function (a) {
                                return a >= this.getFirstVisibleRow() && a <= this.getLastVisibleRow()
                            }, this.isRowFullyVisible = function (a) {
                                return a >= this.renderer.getFirstFullyVisibleRow() && a <= this.renderer.getLastFullyVisibleRow()
                            }, this.$getVisibleRowCount = function () {
                                return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
                            }, this.$moveByPage = function (a, b) {
                                var c = this.renderer,
                                    d = this.renderer.layerConfig,
                                    e = a * Math.floor(d.height / d.lineHeight);
                                this.$blockScrolling++, b == 1 ? this.selection.$moveSelection(function () {
                                    this.moveCursorBy(e, 0)
                                }) : b == 0 && (this.selection.moveCursorBy(e, 0), this.selection.clearSelection()), this.$blockScrolling--;
                                var f = c.scrollTop;
                                c.scrollBy(0, e * d.lineHeight), b != null && c.scrollCursorIntoView(null, .5), c.animateScrolling(f)
                            }, this.selectPageDown = function () {
                                this.$moveByPage(1, !0)
                            }, this.selectPageUp = function () {
                                this.$moveByPage(-1, !0)
                            }, this.gotoPageDown = function () {
                                this.$moveByPage(1, !1)
                            }, this.gotoPageUp = function () {
                                this.$moveByPage(-1, !1)
                            }, this.scrollPageDown = function () {
                                this.$moveByPage(1)
                            }, this.scrollPageUp = function () {
                                this.$moveByPage(-1)
                            }, this.scrollToRow = function (a) {
                                this.renderer.scrollToRow(a)
                            }, this.scrollToLine = function (a, b, c, d) {
                                this.renderer.scrollToLine(a, b, c, d)
                            }, this.centerSelection = function () {
                                var a = this.getSelectionRange(),
                                    b = {
                                        row: Math.floor(a.start.row + (a.end.row - a.start.row) / 2),
                                        column: Math.floor(a.start.column + (a.end.column - a.start.column) / 2)
                                    };
                                this.renderer.alignCursor(b, .5)
                            }, this.getCursorPosition = function () {
                                return this.selection.getCursor()
                            }, this.getCursorPositionScreen = function () {
                                return this.session.documentToScreenPosition(this.getCursorPosition())
                            }, this.getSelectionRange = function () {
                                return this.selection.getRange()
                            }, this.selectAll = function () {
                                this.$blockScrolling += 1, this.selection.selectAll(), this.$blockScrolling -= 1
                            }, this.clearSelection = function () {
                                this.selection.clearSelection()
                            }, this.moveCursorTo = function (a, b) {
                                this.selection.moveCursorTo(a, b)
                            }, this.moveCursorToPosition = function (a) {
                                this.selection.moveCursorToPosition(a)
                            }, this.jumpToMatching = function (a) {
                                var b = this.getCursorPosition(),
                                    c = this.session.getBracketRange(b);
                                if (!c) {
                                    c = this.find({
                                        needle: /[{}()\[\]]/g,
                                        preventScroll: !0,
                                        start: {
                                            row: b.row,
                                            column: b.column - 1
                                        }
                                    });
                                    if (!c) return;
                                    var d = c.start;
                                    d.row == b.row && Math.abs(d.column - b.column) < 2 && (c = this.session.getBracketRange(d))
                                }
                                d = c && c.cursor || d, d && (a ? c && c.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(d.row, d.column) : (this.clearSelection(), this.moveCursorTo(d.row, d.column)))
                            }, this.gotoLine = function (a, b, c) {
                                this.selection.clearSelection(), this.session.unfold({
                                    row: a - 1,
                                    column: b || 0
                                }), this.$blockScrolling += 1, this.moveCursorTo(a - 1, b || 0), this.$blockScrolling -= 1, this.isRowFullyVisible(a - 1) || this.scrollToLine(a - 1, !0, c)
                            }, this.navigateTo = function (a, b) {
                                this.clearSelection(), this.moveCursorTo(a, b)
                            }, this.navigateUp = function (a) {
                                this.selection.clearSelection(), a = a || 1, this.selection.moveCursorBy(-a, 0)
                            }, this.navigateDown = function (a) {
                                this.selection.clearSelection(), a = a || 1, this.selection.moveCursorBy(a, 0)
                            }, this.navigateLeft = function (a) {
                                if (!this.selection.isEmpty()) {
                                    var b = this.getSelectionRange().start;
                                    this.moveCursorToPosition(b)
                                } else {
                                    a = a || 1;
                                    while (a--) this.selection.moveCursorLeft()
                                }
                                this.clearSelection()
                            }, this.navigateRight = function (a) {
                                if (!this.selection.isEmpty()) {
                                    var b = this.getSelectionRange().end;
                                    this.moveCursorToPosition(b)
                                } else {
                                    a = a || 1;
                                    while (a--) this.selection.moveCursorRight()
                                }
                                this.clearSelection()
                            }, this.navigateLineStart = function () {
                                this.selection.moveCursorLineStart(), this.clearSelection()
                            }, this.navigateLineEnd = function () {
                                this.selection.moveCursorLineEnd(), this.clearSelection()
                            }, this.navigateFileEnd = function () {
                                var a = this.renderer.scrollTop;
                                this.selection.moveCursorFileEnd(), this.clearSelection(), this.renderer.animateScrolling(a)
                            }, this.navigateFileStart = function () {
                                var a = this.renderer.scrollTop;
                                this.selection.moveCursorFileStart(), this.clearSelection(), this.renderer.animateScrolling(a)
                            }, this.navigateWordRight = function () {
                                this.selection.moveCursorWordRight(), this.clearSelection()
                            }, this.navigateWordLeft = function () {
                                this.selection.moveCursorWordLeft(), this.clearSelection()
                            }, this.replace = function (a, b) {
                                b && this.$search.set(b);
                                var c = this.$search.find(this.session),
                                    d = 0;
                                return c ? (this.$tryReplace(c, a) && (d = 1), c !== null && (this.selection.setSelectionRange(c), this.renderer.scrollSelectionIntoView(c.start, c.end)), d) : d
                            }, this.replaceAll = function (a, b) {
                                b && this.$search.set(b);
                                var c = this.$search.findAll(this.session),
                                    d = 0;
                                if (!c.length) return d;
                                this.$blockScrolling += 1;
                                var e = this.getSelectionRange();
                                this.clearSelection(), this.selection.moveCursorTo(0, 0);
                                for (var f = c.length - 1; f >= 0; --f) this.$tryReplace(c[f], a) && d++;
                                return this.selection.setSelectionRange(e), this.$blockScrolling -= 1, d
                            }, this.$tryReplace = function (a, b) {
                                var c = this.session.getTextRange(a);
                                return b = this.$search.replace(c, b), b !== null ? (a.end = this.session.replace(a, b), a) : null
                            }, this.getLastSearchOptions = function () {
                                return this.$search.getOptions()
                            }, this.find = function (a, b, c) {
                                b || (b = {}), typeof a == "string" || a instanceof RegExp ? b.needle = a : typeof a == "object" && d.mixin(b, a);
                                var e = this.selection.getRange();
                                b.needle == null && (a = this.session.getTextRange(e) || this.$search.$options.needle, a || (e = this.session.getWordRange(e.start.row, e.start.column), a = this.session.getTextRange(e)), this.$search.set({
                                    needle: a
                                })), this.$search.set(b), b.start || this.$search.set({
                                    start: e
                                });
                                var f = this.$search.find(this.session);
                                if (b.preventScroll) return f;
                                if (f) return this.revealRange(f, c), f;
                                b.backwards ? e.start = e.end : e.end = e.start, this.selection.setRange(e)
                            }, this.findNext = function (a, b) {
                                this.find({
                                    skipCurrent: !0,
                                    backwards: !1
                                }, a, b)
                            }, this.findPrevious = function (a, b) {
                                this.find(a, {
                                    skipCurrent: !0,
                                    backwards: !0
                                }, b)
                            }, this.revealRange = function (a, b) {
                                this.$blockScrolling += 1, this.session.unfold(a), this.selection.setSelectionRange(a), this.$blockScrolling -= 1;
                                var c = this.renderer.scrollTop;
                                this.renderer.scrollSelectionIntoView(a.start, a.end, .5), b != 0 && this.renderer.animateScrolling(c)
                            }, this.undo = function () {
                                this.$blockScrolling++, this.session.getUndoManager().undo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
                            }, this.redo = function () {
                                this.$blockScrolling++, this.session.getUndoManager().redo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
                            }, this.destroy = function () {
                                this.renderer.destroy()
                            }
                        }).call(q.prototype), b.Editor = q
                    }), ace.define("ace/lib/lang", ["require", "exports", "module"], function (a, b, c) {
                        b.stringReverse = function (a) {
                            return a.split("").reverse().join("")
                        }, b.stringRepeat = function (a, b) {
                            return (new Array(b + 1)).join(a)
                        };
                        var d = /^\s\s*/,
                            e = /\s\s*$/;
                        b.stringTrimLeft = function (a) {
                            return a.replace(d, "")
                        }, b.stringTrimRight = function (a) {
                            return a.replace(e, "")
                        }, b.copyObject = function (a) {
                            var b = {};
                            for (var c in a) b[c] = a[c];
                            return b
                        }, b.copyArray = function (a) {
                            var b = [];
                            for (var c = 0, d = a.length; c < d; c++) a[c] && typeof a[c] == "object" ? b[c] = this.copyObject(a[c]) : b[c] = a[c];
                            return b
                        }, b.deepCopy = function (a) {
                            if (typeof a != "object") return a;
                            var b = a.constructor();
                            for (var c in a) typeof a[c] == "object" ? b[c] = this.deepCopy(a[c]) : b[c] = a[c];
                            return b
                        }, b.arrayToMap = function (a) {
                            var b = {};
                            for (var c = 0; c < a.length; c++) b[a[c]] = 1;
                            return b
                        }, b.createMap = function (a) {
                            var b = Object.create(null);
                            for (var c in a) b[c] = a[c];
                            return b
                        }, b.arrayRemove = function (a, b) {
                            for (var c = 0; c <= a.length; c++) b === a[c] && a.splice(c, 1)
                        }, b.escapeRegExp = function (a) {
                            return a.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
                        }, b.getMatchOffsets = function (a, b) {
                            var c = [];
                            return a.replace(b, function (a) {
                                c.push({
                                    offset: arguments[arguments.length - 2],
                                    length: a.length
                                })
                            }), c
                        }, b.deferredCall = function (a) {
                            var b = null,
                                c = function () {
                                    b = null, a()
                                },
                                d = function (a) {
                                    return d.cancel(), b = setTimeout(c, a || 0), d
                                };
                            return d.schedule = d, d.call = function () {
                                return this.cancel(), a(), d
                            }, d.cancel = function () {
                                return clearTimeout(b), b = null, d
                            }, d
                        }
                    }), ace.define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom"], function (a, b, c) {
                        var d = a("../lib/event"),
                            e = a("../lib/useragent"),
                            f = a("../lib/dom"),
                            g = function (a, b) {
                                function l(a) {
                                    try {
                                        a ? (c.value = g, c.selectionStart = 0, c.selectionEnd = 1) : c.select()
                                    } catch (b) {}
                                }
                                function m(a) {
                                    if (!i) {
                                        var d = a || c.value;
                                        d && (d.length > 1 && (d.charAt(0) == g ? d = d.substr(1) : d.charAt(d.length - 1) == g && (d = d.slice(0, -1))), d && d != g && (j ? b.onPaste(d) : b.onTextInput(d)))
                                    }
                                    i = !1, j = !1, l(!0)
                                }
                                function v() {
                                    return document.activeElement === c
                                }
                                function w() {
                                    setTimeout(function () {
                                        k && (c.style.cssText = k, k = ""), m(), b.renderer.$keepTextAreaAtCursor == null && (b.renderer.$keepTextAreaAtCursor = !0, b.renderer.$moveTextAreaToCursor())
                                    }, 0)
                                }
                                var c = f.createElement("textarea");
                                e.isTouchPad && c.setAttribute("x-palm-disable-auto-cap", !0), c.setAttribute("wrap", "off"), c.style.top = "-2em", a.insertBefore(c, a.firstChild);
                                var g = e.isIE ? "" : "";
                                m();
                                var h = !1,
                                    i = !1,
                                    j = !1,
                                    k = "",
                                    n = function (a) {
                                        h || m(a.data), setTimeout(function () {
                                            h || l(!0)
                                        }, 0)
                                    },
                                    o = function (a) {
                                        setTimeout(function () {
                                            h || c.value != "" && m()
                                        }, 0)
                                    },
                                    p = function (a) {
                                        h = !0, b.onCompositionStart(), setTimeout(q, 0)
                                    },
                                    q = function () {
                                        if (!h) return;
                                        b.onCompositionUpdate(c.value)
                                    },
                                    r = function (a) {
                                        h = !1, b.onCompositionEnd()
                                    },
                                    s = function (a) {
                                        i = !0;
                                        var d = b.getCopyText();
                                        d ? c.value = d : a.preventDefault(), l(), setTimeout(function () {
                                            m()
                                        }, 0)
                                    },
                                    t = function (a) {
                                        i = !0;
                                        var d = b.getCopyText();
                                        d ? (c.value = d, b.onCut()) : a.preventDefault(), l(), setTimeout(function () {
                                            m()
                                        }, 0)
                                    };
                                d.addCommandKeyListener(c, b.onCommandKey.bind(b)), d.addListener(c, "input", n);
                                if (e.isOldIE) {
                                    var u = {
                                        13: 1,
                                        27: 1
                                    };
                                    d.addListener(c, "keyup", function (a) {
                                        h && (!c.value || u[a.keyCode]) && setTimeout(r, 0);
                                        if ((c.value.charCodeAt(0) | 0) < 129) return;
                                        h ? q() : p()
                                    }), d.addListener(c, "propertychange", function () {
                                        c.value != g && setTimeout(m, 0)
                                    })
                                }
                                d.addListener(c, "paste", function (a) {
                                    j = !0, a.clipboardData && a.clipboardData.getData ? (m(a.clipboardData.getData("text/plain")), a.preventDefault()) : o()
                                }), "onbeforecopy" in c && typeof clipboardData != "undefined" ? (d.addListener(c, "beforecopy", function (a) {
                                    if (k) return;
                                    var c = b.getCopyText();
                                    c ? clipboardData.setData("Text", c) : a.preventDefault()
                                }), d.addListener(a, "keydown", function (a) {
                                    if (a.ctrlKey && a.keyCode == 88) {
                                        var c = b.getCopyText();
                                        c && (clipboardData.setData("Text", c), b.onCut()), d.preventDefault(a)
                                    }
                                }), d.addListener(c, "cut", t)) : !e.isOpera || "KeyboardEvent" in window ? (d.addListener(c, "copy", s), d.addListener(c, "cut", t)) : d.addListener(a, "keydown", function (a) {
                                    if (e.isMac && !a.metaKey || !a.ctrlKey) return;
                                    if (a.keyCode == 88 || a.keyCode == 67) {
                                        var d = b.getCopyText();
                                        d && (c.value = d, c.select(), a.keyCode == 88 && b.onCut())
                                    }
                                }), d.addListener(c, "compositionstart", p), e.isGecko && d.addListener(c, "text", q), e.isWebKit && d.addListener(c, "keyup", q), d.addListener(c, "compositionend", r), d.addListener(c, "blur", function () {
                                    b.onBlur()
                                }), d.addListener(c, "focus", function () {
                                    b.onFocus(), l()
                                }), this.focus = function () {
                                    l(), c.focus()
                                }, this.blur = function () {
                                    c.blur()
                                }, this.isFocused = v, this.getElement = function () {
                                    return c
                                }, this.onContextMenu = function (a) {
                                    k || (k = c.style.cssText), c.style.cssText = "position:fixed; z-index:100000;" + (e.isIE ? "background:rgba(0, 0, 0, 0.03); opacity:0.1;" : "") + "left:" + (a.clientX - 2) + "px; top:" + (a.clientY - 2) + "px;", b.selection.isEmpty() ? c.value = "" : l(!0);
                                    if (a.type != "mousedown") return;
                                    b.renderer.$keepTextAreaAtCursor && (b.renderer.$keepTextAreaAtCursor = null), e.isWin && (e.isGecko || e.isIE) && d.capture(b.container, function (a) {
                                        c.style.left = a.clientX - 2 + "px", c.style.top = a.clientY - 2 + "px"
                                    }, w)
                                }, this.onContextMenuClose = w, e.isGecko || d.addListener(c, "contextmenu", function (a) {
                                    b.textInput.onContextMenu(a), w()
                                })
                            };
                        b.TextInput = g
                    }), ace.define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop"], function (a, b, c) {
                        var d = a("../lib/event"),
                            e = a("../lib/useragent"),
                            f = a("./default_handlers").DefaultHandlers,
                            g = a("./default_gutter_handler").GutterHandler,
                            h = a("./mouse_event").MouseEvent,
                            i = a("./dragdrop").DragdropHandler,
                            j = function (a) {
                                this.editor = a, new f(this), new g(this), new i(this), d.addListener(a.container, "mousedown", function (b) {
                                    return a.focus(), d.preventDefault(b)
                                });
                                var b = a.renderer.getMouseEventTarget();
                                d.addListener(b, "click", this.onMouseEvent.bind(this, "click")), d.addListener(b, "mousemove", this.onMouseMove.bind(this, "mousemove")), d.addMultiMouseDownListener(b, [300, 300, 250], this, "onMouseEvent"), d.addMouseWheelListener(a.container, this.onMouseWheel.bind(this, "mousewheel"));
                                var c = a.renderer.$gutter;
                                d.addListener(c, "mousedown", this.onMouseEvent.bind(this, "guttermousedown")), d.addListener(c, "click", this.onMouseEvent.bind(this, "gutterclick")), d.addListener(c, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick")), d.addListener(c, "mousemove", this.onMouseEvent.bind(this, "guttermousemove"))
                            };
                        (function () {
                            this.$scrollSpeed = 1, this.setScrollSpeed = function (a) {
                                this.$scrollSpeed = a
                            }, this.getScrollSpeed = function () {
                                return this.$scrollSpeed
                            }, this.onMouseEvent = function (a, b) {
                                this.editor._emit(a, new h(b, this.editor))
                            }, this.$dragDelay = 250, this.setDragDelay = function (a) {
                                this.$dragDelay = a
                            }, this.getDragDelay = function () {
                                return this.$dragDelay
                            }, this.onMouseMove = function (a, b) {
                                var c = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
                                if (!c || !c.length) return;
                                this.editor._emit(a, new h(b, this.editor))
                            }, this.onMouseWheel = function (a, b) {
                                var c = new h(b, this.editor);
                                c.speed = this.$scrollSpeed * 2, c.wheelX = b.wheelX, c.wheelY = b.wheelY, this.editor._emit(a, c)
                            }, this.setState = function (a) {
                                this.state = a
                            }, this.captureMouse = function (a, b) {
                                b && this.setState(b), this.x = a.x, this.y = a.y;
                                var c = this.editor.renderer;
                                c.$keepTextAreaAtCursor && (c.$keepTextAreaAtCursor = null);
                                var f = this,
                                    g = function (a) {
                                        f.x = a.clientX, f.y = a.clientY
                                    },
                                    h = function (a) {
                                        clearInterval(j), f[f.state + "End"] && f[f.state + "End"](a), f.$clickSelection = null, c.$keepTextAreaAtCursor == null && (c.$keepTextAreaAtCursor = !0, c.$moveTextAreaToCursor())
                                    },
                                    i = function () {
                                        f[f.state] && f[f.state]()
                                    };
                                if (e.isOldIE && a.domEvent.type == "dblclick") {
                                    setTimeout(function () {
                                        i(), h(a.domEvent)
                                    });
                                    return
                                }
                                d.capture(this.editor.container, g, h);
                                var j = setInterval(i, 20)
                            }
                        }).call(j.prototype), b.MouseHandler = j
                    }), ace.define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/dom", "ace/lib/useragent"], function (a, b, c) {
                        function g(a) {
                            a.$clickSelection = null;
                            var b = a.editor;
                            b.setDefaultHandler("mousedown", this.onMouseDown.bind(a)), b.setDefaultHandler("dblclick", this.onDoubleClick.bind(a)), b.setDefaultHandler("tripleclick", this.onTripleClick.bind(a)), b.setDefaultHandler("quadclick", this.onQuadClick.bind(a)), b.setDefaultHandler("mousewheel", this.onScroll.bind(a));
                            var c = ["select", "startSelect", "drag", "dragEnd", "dragWait", "dragWaitEnd", "startDrag", "focusWait"];
                            c.forEach(function (b) {
                                a[b] = this[b]
                            }, this), a.selectByLines = this.extendSelectionBy.bind(a, "getLineRange"), a.selectByWords = this.extendSelectionBy.bind(a, "getWordRange"), a.$focusWaitTimout = 250
                        }
                        function h(a, b, c, d) {
                            return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2))
                        }
                        function i(a, b) {
                            if (a.start.row == a.end.row) var c = 2 * b.column - a.start.column - a.end.column;
                            else var c = 2 * b.row - a.start.row - a.end.row;
                            return c < 0 ? {
                                cursor: a.start,
                                anchor: a.end
                            } : {
                                cursor: a.end,
                                anchor: a.start
                            }
                        }
                        var d = a("../lib/dom"),
                            e = a("../lib/useragent"),
                            f = 5;
                        (function () {
                            this.onMouseDown = function (a) {
                                var b = a.inSelection(),
                                    c = a.getDocumentPosition();
                                this.mousedownEvent = a;
                                var d = this.editor,
                                    e = a.getButton();
                                if (e !== 0) {
                                    var f = d.getSelectionRange(),
                                        g = f.isEmpty();
                                    g && (d.moveCursorToPosition(c), d.selection.clearSelection()), d.textInput.onContextMenu(a.domEvent);
                                    return
                                }
                                if (b && !d.isFocused()) {
                                    d.focus();
                                    if (this.$focusWaitTimout && !this.$clickSelection) return this.setState("focusWait"), this.captureMouse(a), a.preventDefault()
                                }
                                return !b || this.$clickSelection || a.getShiftKey() ? this.startSelect(c) : b && (this.mousedownEvent.time = (new Date).getTime(), this.setState("dragWait")), this.captureMouse(a), a.preventDefault()
                            }, this.startSelect = function (a) {
                                a = a || this.editor.renderer.screenToTextCoordinates(this.x, this.y), this.mousedownEvent.getShiftKey() ? this.editor.selection.selectToPosition(a) : this.$clickSelection || (this.editor.moveCursorToPosition(a), this.editor.selection.clearSelection()), this.setState("select")
                            }, this.select = function () {
                                var a, b = this.editor,
                                    c = b.renderer.screenToTextCoordinates(this.x, this.y);
                                if (this.$clickSelection) {
                                    var d = this.$clickSelection.comparePoint(c);
                                    if (d == -1) a = this.$clickSelection.end;
                                    else if (d == 1) a = this.$clickSelection.start;
                                    else {
                                        var e = i(this.$clickSelection, c);
                                        c = e.cursor, a = e.anchor
                                    }
                                    b.selection.setSelectionAnchor(a.row, a.column)
                                }
                                b.selection.selectToPosition(c), b.renderer.scrollCursorIntoView()
                            }, this.extendSelectionBy = function (a) {
                                var b, c = this.editor,
                                    d = c.renderer.screenToTextCoordinates(this.x, this.y),
                                    e = c.selection[a](d.row, d.column);
                                if (this.$clickSelection) {
                                    var f = this.$clickSelection.comparePoint(e.start),
                                        g = this.$clickSelection.comparePoint(e.end);
                                    if (f == -1 && g <= 0) {
                                        b = this.$clickSelection.end;
                                        if (e.end.row != d.row || e.end.column != d.column) d = e.start
                                    } else if (g == 1 && f >= 0) {
                                        b = this.$clickSelection.start;
                                        if (e.start.row != d.row || e.start.column != d.column) d = e.end
                                    } else if (f == -1 && g == 1) d = e.end, b = e.start;
                                    else {
                                        var h = i(this.$clickSelection, d);
                                        d = h.cursor, b = h.anchor
                                    }
                                    c.selection.setSelectionAnchor(b.row, b.column)
                                }
                                c.selection.selectToPosition(d), c.renderer.scrollCursorIntoView()
                            }, this.startDrag = function () {
                                var a = this.editor;
                                this.setState("drag"), this.dragRange = a.getSelectionRange();
                                var b = a.getSelectionStyle();
                                this.dragSelectionMarker = a.session.addMarker(this.dragRange, "ace_selection", b), a.clearSelection(), d.addCssClass(a.container, "ace_dragging"), this.$dragKeybinding || (this.$dragKeybinding = {
                                    handleKeyboard: function (a, b, c, d) {
                                        if (c == "esc") return {
                                            command: this.command
                                        }
                                    },
                                    command: {
                                        exec: function (a) {
                                            var b = a.$mouseHandler;
                                            b.dragCursor = null, b.dragEnd(), b.startSelect()
                                        }
                                    }
                                }), a.keyBinding.addKeyboardHandler(this.$dragKeybinding)
                            }, this.focusWait = function () {
                                var a = h(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y),
                                    b = (new Date).getTime();
                                (a > f || b - this.mousedownEvent.time > this.$focusWaitTimout) && this.startSelect()
                            }, this.dragWait = function (a) {
                                var b = h(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y),
                                    c = (new Date).getTime(),
                                    d = this.editor;
                                b > f ? this.startSelect(this.mousedownEvent.getDocumentPosition()) : c - this.mousedownEvent.time > d.getDragDelay() && this.startDrag()
                            }, this.dragWaitEnd = function (a) {
                                this.mousedownEvent.domEvent = a, this.startSelect()
                            }, this.drag = function () {
                                var a = this.editor;
                                this.dragCursor = a.renderer.screenToTextCoordinates(this.x, this.y), a.moveCursorToPosition(this.dragCursor), a.renderer.scrollCursorIntoView()
                            }, this.dragEnd = function (a) {
                                var b = this.editor,
                                    c = this.dragCursor,
                                    e = this.dragRange;
                                d.removeCssClass(b.container, "ace_dragging"), b.session.removeMarker(this.dragSelectionMarker), b.keyBinding.removeKeyboardHandler(this.$dragKeybinding);
                                if (!c) return;
                                b.clearSelection();
                                if (a && (a.ctrlKey || a.altKey)) {
                                    var f = b.session,
                                        g = e;
                                    g.end = f.insert(c, f.getTextRange(e)), g.start = c
                                } else {
                                    if (e.contains(c.row, c.column)) return;
                                    var g = b.moveText(e, c)
                                }
                                if (!g) return;
                                b.selection.setSelectionRange(g)
                            }, this.onDoubleClick = function (a) {
                                var b = a.getDocumentPosition(),
                                    c = this.editor,
                                    d = c.session,
                                    e = d.getBracketRange(b);
                                if (e) {
                                    e.isEmpty() && (e.start.column--, e.end.column++), this.$clickSelection = e, this.setState("select");
                                    return
                                }
                                this.$clickSelection = c.selection.getWordRange(b.row, b.column), this.setState("selectByWords")
                            }, this.onTripleClick = function (a) {
                                var b = a.getDocumentPosition(),
                                    c = this.editor;
                                this.setState("selectByLines"), this.$clickSelection = c.selection.getLineRange(b.row)
                            }, this.onQuadClick = function (a) {
                                var b = this.editor;
                                b.selectAll(), this.$clickSelection = b.getSelectionRange(), this.setState("null")
                            }, this.onScroll = function (a) {
                                var b = this.editor,
                                    c = b.renderer.isScrollableBy(a.wheelX * a.speed, a.wheelY * a.speed);
                                if (c) this.$passScrollEvent = !1;
                                else {
                                    if (this.$passScrollEvent) return;
                                    if (!this.$scrollStopTimeout) {
                                        var d = this;
                                        this.$scrollStopTimeout = setTimeout(function () {
                                            d.$passScrollEvent = !0, d.$scrollStopTimeout = null
                                        }, 200)
                                    }
                                }
                                return b.renderer.scrollBy(a.wheelX * a.speed, a.wheelY * a.speed), a.preventDefault()
                            }
                        }).call(g.prototype), b.DefaultHandlers = g
                    }), ace.define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event"], function (a, b, c) {
                        function f(a) {
                            function j() {
                                h = d.createElement("div"), h.className = "ace_gutter_tooltip", h.style.maxWidth = "500px", h.style.display = "none", b.container.appendChild(h)
                            }
                            function k() {
                                h || j();
                                var a = g.getDocumentPosition().row,
                                    d = c.$annotations[a];
                                if (!d) return l();
                                var e = b.session.getLength();
                                if (a == e) {
                                    var f = b.renderer.pixelToScreenCoordinates(0, g.y).row,
                                        k = g.$pos;
                                    if (f > b.session.documentToScreenRow(k.row, k.column)) return l()
                                }
                                if (i == d) return;
                                i = d.text.join("\n"), h.style.display = "block", h.innerHTML = i, b.on("mousewheel", l), m(g)
                            }
                            function l() {
                                f && (f = clearTimeout(f)), i && (h.style.display = "none", i = null, b.removeEventListener("mousewheel", l))
                            }
                            function m(a) {
                                var c = b.renderer.$gutter.getBoundingClientRect();
                                h.style.left = a.x - c.left + 15 + "px", a.y + 3 * b.renderer.lineHeight + 15 < c.bottom ? (h.style.bottom = "", h.style.top = a.y - c.top + 15 + "px") : (h.style.top = "", h.style.bottom = c.bottom - a.y + 5 + "px")
                            }
                            var b = a.editor,
                                c = b.renderer.$gutterLayer;
                            a.editor.setDefaultHandler("guttermousedown", function (d) {
                                if (!b.isFocused()) return;
                                var e = c.getRegion(d);
                                if (e) return;
                                var f = d.getDocumentPosition().row,
                                    g = b.session.selection;
                                return d.getShiftKey() ? g.selectTo(f, 0) : a.$clickSelection = b.selection.getLineRange(f), a.captureMouse(d, "selectByLines"), d.preventDefault()
                            });
                            var f, g, h, i;
                            a.editor.setDefaultHandler("guttermousemove", function (a) {
                                var b = a.domEvent.target || a.domEvent.srcElement;
                                if (d.hasCssClass(b, "ace_fold-widget")) return l();
                                i && m(a), g = a;
                                if (f) return;
                                f = setTimeout(function () {
                                    f = null, g ? k() : l()
                                }, 50)
                            }), e.addListener(b.renderer.$gutter, "mouseout", function (a) {
                                g = null;
                                if (!i || f) return;
                                f = setTimeout(function () {
                                    f = null, l()
                                }, 50)
                            })
                        }
                        var d = a("../lib/dom"),
                            e = a("../lib/event");
                        b.GutterHandler = f
                    }), ace.define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function (a, b, c) {
                        var d = a("../lib/event"),
                            e = a("../lib/useragent"),
                            f = b.MouseEvent = function (a, b) {
                                this.domEvent = a, this.editor = b, this.x = this.clientX = a.clientX, this.y = this.clientY = a.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1
                            };
                        (function () {
                            this.stopPropagation = function () {
                                d.stopPropagation(this.domEvent), this.propagationStopped = !0
                            }, this.preventDefault = function () {
                                d.preventDefault(this.domEvent), this.defaultPrevented = !0
                            }, this.stop = function () {
                                this.stopPropagation(), this.preventDefault()
                            }, this.getDocumentPosition = function () {
                                return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos)
                            }, this.inSelection = function () {
                                if (this.$inSelection !== null) return this.$inSelection;
                                var a = this.editor;
                                if (a.getReadOnly()) this.$inSelection = !1;
                                else {
                                    var b = a.getSelectionRange();
                                    if (b.isEmpty()) this.$inSelection = !1;
                                    else {
                                        var c = this.getDocumentPosition();
                                        this.$inSelection = b.contains(c.row, c.column)
                                    }
                                }
                                return this.$inSelection
                            }, this.getButton = function () {
                                return d.getButton(this.domEvent)
                            }, this.getShiftKey = function () {
                                return this.domEvent.shiftKey
                            }, this.getAccelKey = e.isMac ?
                            function () {
                                return this.domEvent.metaKey
                            } : function () {
                                return this.domEvent.ctrlKey
                            }
                        }).call(f.prototype)
                    }), ace.define("ace/mouse/dragdrop", ["require", "exports", "module", "ace/lib/event"], function (a, b, c) {
                        var d = a("../lib/event"),
                            e = function (a) {
                                var b = a.editor,
                                    c, e, f, g, h, i, j, k = 0,
                                    l = b.container;
                                d.addListener(l, "dragenter", function (a) {
                                    k++;
                                    if (!c) {
                                        h = b.getSelectionRange(), i = b.selection.isBackwards();
                                        var e = b.getSelectionStyle();
                                        c = b.session.addMarker(h, "ace_selection", e), b.clearSelection(), clearInterval(g), g = setInterval(m, 20)
                                    }
                                    return d.preventDefault(a)
                                }), d.addListener(l, "dragover", function (a) {
                                    return e = a.clientX, f = a.clientY, d.preventDefault(a)
                                });
                                var m = function () {
                                        j = b.renderer.screenToTextCoordinates(e, f), b.moveCursorToPosition(j), b.renderer.scrollCursorIntoView()
                                    };
                                d.addListener(l, "dragleave", function (a) {
                                    k--;
                                    if (k > 0) return;
                                    return console.log(a.type, k, a.target), clearInterval(g), b.session.removeMarker(c), c = null, b.selection.setSelectionRange(h, i), d.preventDefault(a)
                                }), d.addListener(l, "drop", function (a) {
                                    return console.log(a.type, k, a.target), k = 0, clearInterval(g), b.session.removeMarker(c), c = null, h.end = b.session.insert(j, a.dataTransfer.getData("Text")), h.start = j, b.focus(), b.selection.setSelectionRange(h), d.preventDefault(a)
                                })
                            };
                        b.DragdropHandler = e
                    }), ace.define("ace/mouse/fold_handler", ["require", "exports", "module"], function (a, b, c) {
                        function d(a) {
                            a.on("click", function (b) {
                                var c = b.getDocumentPosition(),
                                    d = a.session,
                                    e = d.getFoldAt(c.row, c.column, 1);
                                e && (b.getAccelKey() ? d.removeFold(e) : d.expandFold(e), b.stop())
                            }), a.on("gutterclick", function (b) {
                                var c = a.renderer.$gutterLayer.getRegion(b);
                                if (c == "foldWidgets") {
                                    var d = b.getDocumentPosition().row,
                                        e = a.session;
                                    e.foldWidgets && e.foldWidgets[d] && a.session.onFoldWidgetClick(d, b), b.stop()
                                }
                            })
                        }
                        b.FoldHandler = d
                    }), ace.define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function (a, b, c) {
                        var d = a("../lib/keys"),
                            e = a("../lib/event"),
                            f = function (a) {
                                this.$editor = a, this.$data = {}, this.$handlers = [], this.setDefaultHandler(a.commands)
                            };
                        (function () {
                            this.setDefaultHandler = function (a) {
                                this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = a, this.addKeyboardHandler(a, 0), this.$data = {
                                    editor: this.$editor
                                }
                            }, this.setKeyboardHandler = function (a) {
                                if (this.$handlers[this.$handlers.length - 1] == a) return;
                                while (this.$handlers[1]) this.removeKeyboardHandler(this.$handlers[1]);
                                this.addKeyboardHandler(a, 1)
                            }, this.addKeyboardHandler = function (a, b) {
                                if (!a) return;
                                var c = this.$handlers.indexOf(a);
                                c != -1 && this.$handlers.splice(c, 1), b == undefined ? this.$handlers.push(a) : this.$handlers.splice(b, 0, a), c == -1 && a.attach && a.attach(this.$editor)
                            }, this.removeKeyboardHandler = function (a) {
                                var b = this.$handlers.indexOf(a);
                                return b == -1 ? !1 : (this.$handlers.splice(b, 1), a.detach && a.detach(this.$editor), !0)
                            }, this.getKeyboardHandler = function () {
                                return this.$handlers[this.$handlers.length - 1]
                            }, this.$callKeyboardHandlers = function (a, b, c, d) {
                                var f;
                                for (var g = this.$handlers.length; g--;) {
                                    f = this.$handlers[g].handleKeyboard(this.$data, a, b, c, d);
                                    if (f && f.command) break
                                }
                                if (!f || !f.command) return !1;
                                var h = !1,
                                    i = this.$editor.commands;
                                return f.command != "null" ? h = i.exec(f.command, this.$editor, f.args, d) : h = f.passEvent != 1, h && d && a != -1 && e.stopEvent(d), h
                            }, this.onCommandKey = function (a, b, c) {
                                var e = d.keyCodeToString(c);
                                this.$callKeyboardHandlers(b, e, c, a)
                            }, this.onTextInput = function (a) {
                                var b = this.$callKeyboardHandlers(-1, a);
                                b || this.$editor.commands.exec("insertstring", this.$editor, a)
                            }
                        }).call(f.prototype), b.KeyBinding = f
                    }), ace.define("ace/edit_session", ["require", "exports", "module", "ace/config", "ace/lib/oop", "ace/lib/lang", "ace/lib/net", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], function (a, b, c) {
                        var d = a("./config"),
                            e = a("./lib/oop"),
                            f = a("./lib/lang"),
                            g = a("./lib/net"),
                            h = a("./lib/event_emitter").EventEmitter,
                            i = a("./selection").Selection,
                            j = a("./mode/text").Mode,
                            k = a("./range").Range,
                            l = a("./document").Document,
                            m = a("./background_tokenizer").BackgroundTokenizer,
                            n = a("./search_highlight").SearchHighlight,
                            o = function (a, b) {
                                this.$modified = !0, this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$resetRowCache(0), this.$wrapData = [], this.$foldData = [], this.$rowLengthCache = [], this.$undoSelect = !0, this.$foldData.toString = function () {
                                    var a = "";
                                    return this.forEach(function (b) {
                                        a += "\n" + b.toString()
                                    }), a
                                }, typeof a == "object" && a.getLine ? this.setDocument(a) : this.setDocument(new l(a)), this.selection = new i(this), this.setMode(b)
                            };
                        (function () {
                            function s(a) {
                                return a < 4352 ? !1 : a >= 4352 && a <= 4447 || a >= 4515 && a <= 4519 || a >= 4602 && a <= 4607 || a >= 9001 && a <= 9002 || a >= 11904 && a <= 11929 || a >= 11931 && a <= 12019 || a >= 12032 && a <= 12245 || a >= 12272 && a <= 12283 || a >= 12288 && a <= 12350 || a >= 12353 && a <= 12438 || a >= 12441 && a <= 12543 || a >= 12549 && a <= 12589 || a >= 12593 && a <= 12686 || a >= 12688 && a <= 12730 || a >= 12736 && a <= 12771 || a >= 12784 && a <= 12830 || a >= 12832 && a <= 12871 || a >= 12880 && a <= 13054 || a >= 13056 && a <= 19903 || a >= 19968 && a <= 42124 || a >= 42128 && a <= 42182 || a >= 43360 && a <= 43388 || a >= 44032 && a <= 55203 || a >= 55216 && a <= 55238 || a >= 55243 && a <= 55291 || a >= 63744 && a <= 64255 || a >= 65040 && a <= 65049 || a >= 65072 && a <= 65106 || a >= 65108 && a <= 65126 || a >= 65128 && a <= 65131 || a >= 65281 && a <= 65376 || a >= 65504 && a <= 65510
                            }
                            e.implement(this, h), this.setDocument = function (a) {
                                if (this.doc) throw new Error("Document is already set");
                                this.doc = a, a.on("change", this.onChange.bind(this)), this.on("changeFold", this.onChangeFold.bind(this)), this.bgTokenizer && (this.bgTokenizer.setDocument(this.getDocument()), this.bgTokenizer.start(0))
                            }, this.getDocument = function () {
                                return this.doc
                            }, this.$resetRowCache = function (a) {
                                if (!a) {
                                    this.$docRowCache = [], this.$screenRowCache = [];
                                    return
                                }
                                var b = this.$getRowCacheIndex(this.$docRowCache, a) + 1,
                                    c = this.$docRowCache.length;
                                this.$docRowCache.splice(b, c), this.$screenRowCache.splice(b, c)
                            }, this.$getRowCacheIndex = function (a, b) {
                                var c = 0,
                                    d = a.length - 1;
                                while (c <= d) {
                                    var e = c + d >> 1,
                                        f = a[e];
                                    if (b > f) c = e + 1;
                                    else {
                                        if (!(b < f)) return e;
                                        d = e - 1
                                    }
                                }
                                return c && c - 1
                            }, this.onChangeFold = function (a) {
                                var b = a.data;
                                this.$resetRowCache(b.start.row)
                            }, this.onChange = function (a) {
                                var b = a.data;
                                this.$modified = !0, this.$resetRowCache(b.range.start.row);
                                var c = this.$updateInternalDataOnChange(a);
                                !this.$fromUndo && this.$undoManager && !b.ignore && (this.$deltasDoc.push(b), c && c.length != 0 && this.$deltasFold.push({
                                    action: "removeFolds",
                                    folds: c
                                }), this.$informUndoManager.schedule()), this.bgTokenizer.$updateOnChange(b), this._emit("change", a)
                            }, this.setValue = function (a) {
                                this.doc.setValue(a), this.selection.moveCursorTo(0, 0), this.selection.clearSelection(), this.$resetRowCache(0), this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.getUndoManager().reset()
                            }, this.getValue = this.toString = function () {
                                return this.doc.getValue()
                            }, this.getSelection = function () {
                                return this.selection
                            }, this.getState = function (a) {
                                return this.bgTokenizer.getState(a)
                            }, this.getTokens = function (a) {
                                return this.bgTokenizer.getTokens(a)
                            }, this.getTokenAt = function (a, b) {
                                var c = this.bgTokenizer.getTokens(a),
                                    d, e = 0;
                                if (b == null) f = c.length - 1, e = this.getLine(a).length;
                                else for (var f = 0; f < c.length; f++) {
                                    e += c[f].value.length;
                                    if (e >= b) break
                                }
                                return d = c[f], d ? (d.index = f, d.start = e - d.value.length, d) : null
                            }, this.highlight = function (a) {
                                if (!this.$searchHighlight) {
                                    var b = new n(null, "ace_selected_word", "text");
                                    this.$searchHighlight = this.addDynamicMarker(b)
                                }
                                this.$searchHighlight.setRegexp(a)
                            }, this.setUndoManager = function (a) {
                                this.$undoManager = a, this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.$informUndoManager && this.$informUndoManager.cancel();
                                if (a) {
                                    var b = this;
                                    this.$syncInformUndoManager = function () {
                                        b.$informUndoManager.cancel(), b.$deltasFold.length && (b.$deltas.push({
                                            group: "fold",
                                            deltas: b.$deltasFold
                                        }), b.$deltasFold = []), b.$deltasDoc.length && (b.$deltas.push({
                                            group: "doc",
                                            deltas: b.$deltasDoc
                                        }), b.$deltasDoc = []), b.$deltas.length > 0 && a.execute({
                                            action: "aceupdate",
                                            args: [b.$deltas, b]
                                        }), b.$deltas = []
                                    }, this.$informUndoManager = f.deferredCall(this.$syncInformUndoManager)
                                }
                            }, this.$defaultUndoManager = {
                                undo: function () {},
                                redo: function () {},
                                reset: function () {}
                            }, this.getUndoManager = function () {
                                return this.$undoManager || this.$defaultUndoManager
                            }, this.getTabString = function () {
                                return this.getUseSoftTabs() ? f.stringRepeat(" ", this.getTabSize()) : "   "
                            }, this.$useSoftTabs = !0, this.setUseSoftTabs = function (a) {
                                if (this.$useSoftTabs === a) return;
                                this.$useSoftTabs = a
                            }, this.getUseSoftTabs = function () {
                                return this.$useSoftTabs
                            }, this.$tabSize = 4, this.setTabSize = function (a) {
                                if (isNaN(a) || this.$tabSize === a) return;
                                this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = a, this._emit("changeTabSize")
                            }, this.getTabSize = function () {
                                return this.$tabSize
                            }, this.isTabStop = function (a) {
                                return this.$useSoftTabs && a.column % this.$tabSize == 0
                            }, this.$overwrite = !1, this.setOverwrite = function (a) {
                                if (this.$overwrite == a) return;
                                this.$overwrite = a, this._emit("changeOverwrite")
                            }, this.getOverwrite = function () {
                                return this.$overwrite
                            }, this.toggleOverwrite = function () {
                                this.setOverwrite(!this.$overwrite)
                            }, this.addGutterDecoration = function (a, b) {
                                this.$decorations[a] || (this.$decorations[a] = ""), this.$decorations[a] += " " + b, this._emit("changeBreakpoint", {})
                            }, this.removeGutterDecoration = function (a, b) {
                                this.$decorations[a] = (this.$decorations[a] || "").replace(" " + b, ""), this._emit("changeBreakpoint", {})
                            }, this.getBreakpoints = function () {
                                return this.$breakpoints
                            }, this.setBreakpoints = function (a) {
                                this.$breakpoints = [];
                                for (var b = 0; b < a.length; b++) this.$breakpoints[a[b]] = "ace_breakpoint";
                                this._emit("changeBreakpoint", {})
                            }, this.clearBreakpoints = function () {
                                this.$breakpoints = [], this._emit("changeBreakpoint", {})
                            }, this.setBreakpoint = function (a, b) {
                                b === undefined && (b = "ace_breakpoint"), b ? this.$breakpoints[a] = b : delete this.$breakpoints[a], this._emit("changeBreakpoint", {})
                            }, this.clearBreakpoint = function (a) {
                                delete this.$breakpoints[a], this._emit("changeBreakpoint", {})
                            }, this.addMarker = function (a, b, c, d) {
                                var e = this.$markerId++,
                                    f = {
                                        range: a,
                                        type: c || "line",
                                        renderer: typeof c == "function" ? c : null,
                                        clazz: b,
                                        inFront: !! d,
                                        id: e
                                    };
                                return d ? (this.$frontMarkers[e] = f, this._emit("changeFrontMarker")) : (this.$backMarkers[e] = f, this._emit("changeBackMarker")), e
                            }, this.addDynamicMarker = function (a, b) {
                                if (!a.update) return;
                                var c = this.$markerId++;
                                return a.id = c, a.inFront = !! b, b ? (this.$frontMarkers[c] = a, this._emit("changeFrontMarker")) : (this.$backMarkers[c] = a, this._emit("changeBackMarker")), a
                            }, this.removeMarker = function (a) {
                                var b = this.$frontMarkers[a] || this.$backMarkers[a];
                                if (!b) return;
                                var c = b.inFront ? this.$frontMarkers : this.$backMarkers;
                                b && (delete c[a], this._emit(b.inFront ? "changeFrontMarker" : "changeBackMarker"))
                            }, this.getMarkers = function (a) {
                                return a ? this.$frontMarkers : this.$backMarkers
                            }, this.setAnnotations = function (a) {
                                this.$annotations = {};
                                for (var b = 0; b < a.length; b++) {
                                    var c = a[b],
                                        d = c.row;
                                    this.$annotations[d] ? this.$annotations[d].push(c) : this.$annotations[d] = [c]
                                }
                                this._emit("changeAnnotation", {})
                            }, this.getAnnotations = function () {
                                return this.$annotations || {}
                            }, this.clearAnnotations = function () {
                                this.$annotations = {}, this._emit("changeAnnotation", {})
                            }, this.$detectNewLine = function (a) {
                                var b = a.match(/^.*?(\r?\n)/m);
                                b ? this.$autoNewLine = b[1] : this.$autoNewLine = "\n"
                            }, this.getWordRange = function (a, b) {
                                var c = this.getLine(a),
                                    d = !1;
                                b > 0 && (d = !! c.charAt(b - 1).match(this.tokenRe)), d || (d = !! c.charAt(b).match(this.tokenRe));
                                if (d) var e = this.tokenRe;
                                else if (/^\s+$/.test(c.slice(b - 1, b + 1))) var e = /\s/;
                                else var e = this.nonTokenRe;
                                var f = b;
                                if (f > 0) {
                                    do f--;
                                    while (f >= 0 && c.charAt(f).match(e));
                                    f++
                                }
                                var g = b;
                                while (g < c.length && c.charAt(g).match(e)) g++;
                                return new k(a, f, a, g)
                            }, this.getAWordRange = function (a, b) {
                                var c = this.getWordRange(a, b),
                                    d = this.getLine(c.end.row);
                                while (d.charAt(c.end.column).match(/[ \t]/)) c.end.column += 1;
                                return c
                            }, this.setNewLineMode = function (a) {
                                this.doc.setNewLineMode(a)
                            }, this.getNewLineMode = function () {
                                return this.doc.getNewLineMode()
                            }, this.$useWorker = !0, this.setUseWorker = function (a) {
                                if (this.$useWorker == a) return;
                                this.$useWorker = a, this.$stopWorker(), a && this.$startWorker()
                            }, this.getUseWorker = function () {
                                return this.$useWorker
                            }, this.onReloadTokenizer = function (a) {
                                var b = a.data;
                                this.bgTokenizer.start(b.first), this._emit("tokenizerUpdate", a)
                            }, this.$modes = {}, this._loadMode = function (b, c) {
                                function i(a) {
                                    if (e.$modes[b]) return c(e.$modes[b]);
                                    e.$modes[b] = new a.Mode, e.$modes[b].$id = b, e._emit("loadmode", {
                                        name: b,
                                        mode: e.$modes[b]
                                    }), c(e.$modes[b])
                                }
                                function k(a, b) {
                                    if (!d.get("packaged")) return b();
                                    g.loadScript(d.moduleUrl(a, "mode"), b)
                                }
                                this.$modes["null"] || (this.$modes["null"] = this.$modes["ace/mode/text"] = new j);
                                if (this.$modes[b]) return c(this.$modes[b]);
                                var e = this,
                                    f;
                                try {
                                    f = a(b)
                                } catch (h) {}
                                if (f && f.Mode) return i(f);
                                this.$mode || this.$setModePlaceholder(), k(b, function () {
                                    a([b], i)
                                })
                            }, this.$setModePlaceholder = function () {
                                this.$mode = this.$modes["null"];
                                var a = this.$mode.getTokenizer();
                                if (!this.bgTokenizer) {
                                    this.bgTokenizer = new m(a);
                                    var b = this;
                                    this.bgTokenizer.addEventListener("update", function (a) {
                                        b._emit("tokenizerUpdate", a)
                                    })
                                } else this.bgTokenizer.setTokenizer(a);
                                this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = this.$mode.tokenRe, this.nonTokenRe = this.$mode.nonTokenRe
                            }, this.$mode = null, this.$modeId = null, this.setMode = function (a) {
                                a = a || "null";
                                if (typeof a == "string") {
                                    if (this.$modeId == a) return;
                                    this.$modeId = a;
                                    var b = this;
                                    this._loadMode(a, function (c) {
                                        if (b.$modeId !== a) return;
                                        b.setMode(c)
                                    });
                                    return
                                }
                                if (this.$mode === a) return;
                                this.$mode = a, this.$modeId = a.$id, this.$stopWorker(), this.$useWorker && this.$startWorker();
                                var c = a.getTokenizer();
                                if (c.addEventListener !== undefined) {
                                    var d = this.onReloadTokenizer.bind(this);
                                    c.addEventListener("update", d)
                                }
                                if (!this.bgTokenizer) {
                                    this.bgTokenizer = new m(c);
                                    var b = this;
                                    this.bgTokenizer.addEventListener("update", function (a) {
                                        b._emit("tokenizerUpdate", a)
                                    })
                                } else this.bgTokenizer.setTokenizer(c);
                                this.bgTokenizer.setDocument(this.getDocument()), this.bgTokenizer.start(0), this.tokenRe = a.tokenRe, this.nonTokenRe = a.nonTokenRe, this.$setFolding(a.foldingRules), this._emit("changeMode")
                            }, this.$stopWorker = function () {
                                this.$worker && this.$worker.terminate(), this.$worker = null
                            }, this.$startWorker = function () {
                                if (typeof Worker != "undefined" && !a.noWorker) try {
                                    this.$worker = this.$mode.createWorker(this)
                                } catch (b) {
                                    console.log("Could not load worker"), console.log(b), this.$worker = null
                                } else this.$worker = null
                            }, this.getMode = function () {
                                return this.$mode
                            }, this.$scrollTop = 0, this.setScrollTop = function (a) {
                                a = Math.round(Math.max(0, a));
                                if (this.$scrollTop === a) return;
                                this.$scrollTop = a, this._emit("changeScrollTop", a)
                            }, this.getScrollTop = function () {
                                return this.$scrollTop
                            }, this.$scrollLeft = 0, this.setScrollLeft = function (a) {
                                a = Math.round(Math.max(0, a));
                                if (this.$scrollLeft === a) return;
                                this.$scrollLeft = a, this._emit("changeScrollLeft", a)
                            }, this.getScrollLeft = function () {
                                return this.$scrollLeft
                            }, this.getScreenWidth = function () {
                                return this.$computeWidth(), this.screenWidth
                            }, this.$computeWidth = function (a) {
                                if (this.$modified || a) {
                                    this.$modified = !1;
                                    if (this.$useWrapMode) return this.screenWidth = this.$wrapLimit;
                                    var b = this.doc.getAllLines(),
                                        c = this.$rowLengthCache,
                                        d = 0,
                                        e = 0,
                                        f = this.$foldData[e],
                                        g = f ? f.start.row : Infinity,
                                        h = b.length;
                                    for (var i = 0; i < h; i++) {
                                        if (i > g) {
                                            i = f.end.row + 1;
                                            if (i >= h) break;
                                            f = this.$foldData[e++], g = f ? f.start.row : Infinity
                                        }
                                        c[i] == null && (c[i] = this.$getStringScreenWidth(b[i])[0]), c[i] > d && (d = c[i])
                                    }
                                    this.screenWidth = d
                                }
                            }, this.getLine = function (a) {
                                return this.doc.getLine(a)
                            }, this.getLines = function (a, b) {
                                return this.doc.getLines(a, b)
                            }, this.getLength = function () {
                                return this.doc.getLength()
                            }, this.getTextRange = function (a) {
                                return this.doc.getTextRange(a || this.selection.getRange())
                            }, this.insert = function (a, b) {
                                return this.doc.insert(a, b)
                            }, this.remove = function (a) {
                                return this.doc.remove(a)
                            }, this.undoChanges = function (a, b) {
                                if (!a.length) return;
                                this.$fromUndo = !0;
                                var c = null;
                                for (var d = a.length - 1; d != -1; d--) {
                                    var e = a[d];
                                    e.group == "doc" ? (this.doc.revertDeltas(e.deltas), c = this.$getUndoSelection(e.deltas, !0, c)) : e.deltas.forEach(function (a) {
                                        this.addFolds(a.folds)
                                    }, this)
                                }
                                return this.$fromUndo = !1, c && this.$undoSelect && !b && this.selection.setSelectionRange(c), c
                            }, this.redoChanges = function (a, b) {
                                if (!a.length) return;
                                this.$fromUndo = !0;
                                var c = null;
                                for (var d = 0; d < a.length; d++) {
                                    var e = a[d];
                                    e.group == "doc" && (this.doc.applyDeltas(e.deltas), c = this.$getUndoSelection(e.deltas, !1, c))
                                }
                                return this.$fromUndo = !1, c && this.$undoSelect && !b && this.selection.setSelectionRange(c), c
                            }, this.setUndoSelect = function (a) {
                                this.$undoSelect = a
                            }, this.$getUndoSelection = function (a, b, c) {
                                function d(a) {
                                    var c = a.action == "insertText" || a.action == "insertLines";
                                    return b ? !c : c
                                }
                                var e = a[0],
                                    f, g, h = !1;
                                d(e) ? (f = e.range.clone(), h = !0) : (f = k.fromPoints(e.range.start, e.range.start), h = !1);
                                for (var i = 1; i < a.length; i++) e = a[i], d(e) ? (g = e.range.start, f.compare(g.row, g.column) == -1 && f.setStart(e.range.start), g = e.range.end, f.compare(g.row, g.column) == 1 && f.setEnd(e.range.end), h = !0) : (g = e.range.start, f.compare(g.row, g.column) == -1 && (f = k.fromPoints(e.range.start, e.range.start)), h = !1);
                                if (c != null) {
                                    var j = c.compareRange(f);
                                    j == 1 ? f.setStart(c.start) : j == -1 && f.setEnd(c.end)
                                }
                                return f
                            }, this.replace = function (a, b) {
                                return this.doc.replace(a, b)
                            }, this.moveText = function (a, b) {
                                var c = this.getTextRange(a);
                                this.remove(a);
                                var d = b.row,
                                    e = b.column;
                                !a.isMultiLine() && a.start.row == d && a.end.column < e && (e -= c.length);
                                if (a.isMultiLine() && a.end.row < d) {
                                    var f = this.doc.$split(c);
                                    d -= f.length - 1
                                }
                                var g = d + a.end.row - a.start.row,
                                    h = a.isMultiLine() ? a.end.column : e + a.end.column - a.start.column,
                                    i = new k(d, e, g, h);
                                return this.insert(i.start, c), i
                            }, this.indentRows = function (a, b, c) {
                                c = c.replace(/\t/g, this.getTabString());
                                for (var d = a; d <= b; d++) this.insert({
                                    row: d,
                                    column: 0
                                }, c)
                            }, this.outdentRows = function (a) {
                                var b = a.collapseRows(),
                                    c = new k(0, 0, 0, 0),
                                    d = this.getTabSize();
                                for (var e = b.start.row; e <= b.end.row; ++e) {
                                    var f = this.getLine(e);
                                    c.start.row = e, c.end.row = e;
                                    for (var g = 0; g < d; ++g) if (f.charAt(g) != " ") break;
                                    g < d && f.charAt(g) == "   " ? (c.start.column = g, c.end.column = g + 1) : (c.start.column = 0, c.end.column = g), this.remove(c)
                                }
                            }, this.moveLinesUp = function (a, b) {
                                if (a <= 0) return 0;
                                var c = this.doc.removeLines(a, b);
                                return this.doc.insertLines(a - 1, c), -1
                            }, this.moveLinesDown = function (a, b) {
                                if (b >= this.doc.getLength() - 1) return 0;
                                var c = this.doc.removeLines(a, b);
                                return this.doc.insertLines(a + 1, c), 1
                            }, this.duplicateLines = function (a, b) {
                                var a = this.$clipRowToDocument(a),
                                    b = this.$clipRowToDocument(b),
                                    c = this.getLines(a, b);
                                this.doc.insertLines(a, c);
                                var d = b - a + 1;
                                return d
                            }, this.$clipRowToDocument = function (a) {
                                return Math.max(0, Math.min(a, this.doc.getLength() - 1))
                            }, this.$clipColumnToRow = function (a, b) {
                                return b < 0 ? 0 : Math.min(this.doc.getLine(a).length, b)
                            }, this.$clipPositionToDocument = function (a, b) {
                                b = Math.max(0, b);
                                if (a < 0) a = 0, b = 0;
                                else {
                                    var c = this.doc.getLength();
                                    a >= c ? (a = c - 1, b = this.doc.getLine(c - 1).length) : b = Math.min(this.doc.getLine(a).length, b)
                                }
                                return {
                                    row: a,
                                    column: b
                                }
                            }, this.$clipRangeToDocument = function (a) {
                                a.start.row < 0 ? (a.start.row = 0, a.start.column = 0) : a.start.column = this.$clipColumnToRow(a.start.row, a.start.column);
                                var b = this.doc.getLength() - 1;
                                return a.end.row > b ? (a.end.row = b, a.end.column = this.doc.getLine(b).length) : a.end.column = this.$clipColumnToRow(a.end.row, a.end.column), a
                            }, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = {
                                min: null,
                                max: null
                            }, this.setUseWrapMode = function (a) {
                                if (a != this.$useWrapMode) {
                                    this.$useWrapMode = a, this.$modified = !0, this.$resetRowCache(0);
                                    if (a) {
                                        var b = this.getLength();
                                        this.$wrapData = [];
                                        for (var c = 0; c < b; c++) this.$wrapData.push([]);
                                        this.$updateWrapData(0, b - 1)
                                    }
                                    this._emit("changeWrapMode")
                                }
                            }, this.getUseWrapMode = function () {
                                return this.$useWrapMode
                            }, this.setWrapLimitRange = function (a, b) {
                                if (this.$wrapLimitRange.min !== a || this.$wrapLimitRange.max !== b) this.$wrapLimitRange.min = a, this.$wrapLimitRange.max = b, this.$modified = !0, this._emit("changeWrapMode")
                            }, this.adjustWrapLimit = function (a) {
                                var b = this.$constrainWrapLimit(a);
                                return b != this.$wrapLimit && b > 0 ? (this.$wrapLimit = b, this.$modified = !0, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._emit("changeWrapLimit")), !0) : !1
                            }, this.$constrainWrapLimit = function (a) {
                                var b = this.$wrapLimitRange.min;
                                b && (a = Math.max(b, a));
                                var c = this.$wrapLimitRange.max;
                                return c && (a = Math.min(c, a)), Math.max(1, a)
                            }, this.getWrapLimit = function () {
                                return this.$wrapLimit
                            }, this.getWrapLimitRange = function () {
                                return {
                                    min: this.$wrapLimitRange.min,
                                    max: this.$wrapLimitRange.max
                                }
                            }, this.$updateInternalDataOnChange = function (a) {
                                var b = this.$useWrapMode,
                                    c, d = a.data.action,
                                    e = a.data.range.start.row,
                                    f = a.data.range.end.row,
                                    g = a.data.range.start,
                                    h = a.data.range.end,
                                    i = null;
                                d.indexOf("Lines") != -1 ? (d == "insertLines" ? f = e + a.data.lines.length : f = e, c = a.data.lines ? a.data.lines.length : f - e) : c = f - e;
                                if (c != 0) if (d.indexOf("remove") != -1) {
                                    this[b ? "$wrapData" : "$rowLengthCache"].splice(e, c);
                                    var j = this.$foldData;
                                    i = this.getFoldsInRange(a.data.range), this.removeFolds(i);
                                    var k = this.getFoldLine(h.row),
                                        l = 0;
                                    if (k) {
                                        k.addRemoveChars(h.row, h.column, g.column - h.column), k.shiftRow(-c);
                                        var m = this.getFoldLine(e);
                                        m && m !== k && (m.merge(k), k = m), l = j.indexOf(k) + 1
                                    }
                                    for (l; l < j.length; l++) {
                                        var k = j[l];
                                        k.start.row >= h.row && k.shiftRow(-c)
                                    }
                                    f = e
                                } else {
                                    var n;
                                    if (b) {
                                        n = [e, 0];
                                        for (var o = 0; o < c; o++) n.push([]);
                                        this.$wrapData.splice.apply(this.$wrapData, n)
                                    } else n = Array(c), n.unshift(e, 0), this.$rowLengthCache.splice.apply(this.$rowLengthCache, n);
                                    var j = this.$foldData,
                                        k = this.getFoldLine(e),
                                        l = 0;
                                    if (k) {
                                        var p = k.range.compareInside(g.row, g.column);
                                        p == 0 ? (k = k.split(g.row, g.column), k.shiftRow(c), k.addRemoveChars(f, 0, h.column - g.column)) : p == -1 && (k.addRemoveChars(e, 0, h.column - g.column), k.shiftRow(c)), l = j.indexOf(k) + 1
                                    }
                                    for (l; l < j.length; l++) {
                                        var k = j[l];
                                        k.start.row >= e && k.shiftRow(c)
                                    }
                                } else {
                                    c = Math.abs(a.data.range.start.column - a.data.range.end.column), d.indexOf("remove") != -1 && (i = this.getFoldsInRange(a.data.range), this.removeFolds(i), c = -c);
                                    var k = this.getFoldLine(e);
                                    k && k.addRemoveChars(e, g.column, c)
                                }
                                return b && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), b ? this.$updateWrapData(e, f) : this.$updateRowLengthCache(e, f), i
                            }, this.$updateRowLengthCache = function (a, b, c) {
                                this.$rowLengthCache[a] = null, this.$rowLengthCache[b] = null
                            }, this.$updateWrapData = function (a, b) {
                                var c = this.doc.getAllLines(),
                                    d = this.getTabSize(),
                                    e = this.$wrapData,
                                    g = this.$wrapLimit,
                                    h, j, k = a;
                                b = Math.min(b, c.length - 1);
                                while (k <= b) {
                                    j = this.getFoldLine(k, j);
                                    if (!j) h = this.$getDisplayTokens(f.stringTrimRight(c[k])), e[k] = this.$computeWrapSplits(h, g, d), k++;
                                    else {
                                        h = [], j.walk(function (a, b, d, e) {
                                            var f;
                                            if (a) {
                                                f = this.$getDisplayTokens(a, h.length), f[0] = i;
                                                for (var g = 1; g < f.length; g++) f[g] = l
                                            } else f = this.$getDisplayTokens(c[b].substring(e, d), h.length);
                                            h = h.concat(f)
                                        }.bind(this), j.end.row, c[j.end.row].length + 1);
                                        while (h.length != 0 && h[h.length - 1] >= p) h.pop();
                                        e[j.start.row] = this.$computeWrapSplits(h, g, d), k = j.end.row + 1
                                    }
                                }
                            };
                            var b = 1,
                                c = 2,
                                i = 3,
                                l = 4,
                                o = 9,
                                p = 10,
                                q = 11,
                                r = 12;
                            this.$computeWrapSplits = function (a, b) {
                                function g(b) {
                                    var d = a.slice(e, b),
                                        g = d.length;
                                    d.join("").replace(/12/g, function () {
                                        g -= 1
                                    }).replace(/2/g, function () {
                                        g -= 1
                                    }), f += g, c.push(f), e = b
                                }
                                if (a.length == 0) return [];
                                var c = [],
                                    d = a.length,
                                    e = 0,
                                    f = 0;
                                while (d - e > b) {
                                    var h = e + b;
                                    if (a[h] >= p) {
                                        while (a[h] >= p) h++;
                                        g(h);
                                        continue
                                    }
                                    if (a[h] == i || a[h] == l) {
                                        for (h; h != e - 1; h--) if (a[h] == i) break;
                                        if (h > e) {
                                            g(h);
                                            continue
                                        }
                                        h = e + b;
                                        for (h; h < a.length; h++) if (a[h] != l) break;
                                        if (h == a.length) break;
                                        g(h);
                                        continue
                                    }
                                    var j = Math.max(h - 10, e - 1);
                                    while (h > j && a[h] < i) h--;
                                    while (h > j && a[h] == o) h--;
                                    if (h > j) {
                                        g(++h);
                                        continue
                                    }
                                    h = e + b, g(h)
                                }
                                return c
                            }, this.$getDisplayTokens = function (a, d) {
                                var e = [],
                                    f;
                                d = d || 0;
                                for (var g = 0; g < a.length; g++) {
                                    var h = a.charCodeAt(g);
                                    if (h == 9) {
                                        f = this.getScreenTabSize(e.length + d), e.push(q);
                                        for (var i = 1; i < f; i++) e.push(r)
                                    } else h == 32 ? e.push(p) : h > 39 && h < 48 || h > 57 && h < 64 ? e.push(o) : h >= 4352 && s(h) ? e.push(b, c) : e.push(b)
                                }
                                return e
                            }, this.$getStringScreenWidth = function (a, b, c) {
                                if (b == 0) return [0, 0];
                                b == null && (b = Infinity), c = c || 0;
                                var d, e;
                                for (e = 0; e < a.length; e++) {
                                    d = a.charCodeAt(e), d == 9 ? c += this.getScreenTabSize(c) : d >= 4352 && s(d) ? c += 2 : c += 1;
                                    if (c > b) break
                                }
                                return [c, e]
                            }, this.getRowLength = function (a) {
                                return !this.$useWrapMode || !this.$wrapData[a] ? 1 : this.$wrapData[a].length + 1
                            }, this.getScreenLastRowColumn = function (a) {
                                var b = this.screenToDocumentPosition(a, Number.MAX_VALUE);
                                return this.documentToScreenColumn(b.row, b.column)
                            }, this.getDocumentLastRowColumn = function (a, b) {
                                var c = this.documentToScreenRow(a, b);
                                return this.getScreenLastRowColumn(c)
                            }, this.getDocumentLastRowColumnPosition = function (a, b) {
                                var c = this.documentToScreenRow(a, b);
                                return this.screenToDocumentPosition(c, Number.MAX_VALUE / 10)
                            }, this.getRowSplitData = function (a) {
                                return this.$useWrapMode ? this.$wrapData[a] : undefined
                            }, this.getScreenTabSize = function (a) {
                                return this.$tabSize - a % this.$tabSize
                            }, this.screenToDocumentRow = function (a, b) {
                                return this.screenToDocumentPosition(a, b).row
                            }, this.screenToDocumentColumn = function (a, b) {
                                return this.screenToDocumentPosition(a, b).column
                            }, this.screenToDocumentPosition = function (a, b) {
                                if (a < 0) return {
                                    row: 0,
                                    column: 0
                                };
                                var c, d = 0,
                                    e = 0,
                                    f, g = 0,
                                    h = 0,
                                    i = this.$screenRowCache,
                                    j = this.$getRowCacheIndex(i, a);
                                if (0 < j && j < i.length) var g = i[j],
                                    d = this.$docRowCache[j],
                                    k = a > g || a == g && j == i.length - 1;
                                else var k = !0;
                                var l = this.getLength() - 1,
                                    m = this.getNextFoldLine(d),
                                    n = m ? m.start.row : Infinity;
                                while (g <= a) {
                                    h = this.getRowLength(d);
                                    if (g + h - 1 >= a || d >= l) break;
                                    g += h, d++, d > n && (d = m.end.row + 1, m = this.getNextFoldLine(d, m), n = m ? m.start.row : Infinity), k && (this.$docRowCache.push(d), this.$screenRowCache.push(g))
                                }
                                if (m && m.start.row <= d) c = this.getFoldDisplayLine(m), d = m.start.row;
                                else {
                                    if (g + h <= a || d > l) return {
                                        row: l,
                                        column: this.getLine(l).length
                                    };
                                    c = this.getLine(d), m = null
                                }
                                if (this.$useWrapMode) {
                                    var o = this.$wrapData[d];
                                    o && (f = o[a - g], a > g && o.length && (e = o[a - g - 1] || o[o.length - 1], c = c.substring(e)))
                                }
                                return e += this.$getStringScreenWidth(c, b)[1], this.$useWrapMode && e >= f && (e = f - 1), m ? m.idxToPosition(e) : {
                                    row: d,
                                    column: e
                                }
                            }, this.documentToScreenPosition = function (a, b) {
                                if (typeof b == "undefined") var c = this.$clipPositionToDocument(a.row, a.column);
                                else c = this.$clipPositionToDocument(a, b);
                                a = c.row, b = c.column;
                                var d = 0,
                                    e = null,
                                    f = null;
                                f = this.getFoldAt(a, b, 1), f && (a = f.start.row, b = f.start.column);
                                var g, h = 0,
                                    i = this.$docRowCache,
                                    j = this.$getRowCacheIndex(i, a);
                                if (0 < j && j < i.length) var h = i[j],
                                    d = this.$screenRowCache[j],
                                    k = a > h || a == h && j == i.length - 1;
                                else var k = !0;
                                var l = this.getNextFoldLine(h),
                                    m = l ? l.start.row : Infinity;
                                while (h < a) {
                                    if (h >= m) {
                                        g = l.end.row + 1;
                                        if (g > a) break;
                                        l = this.getNextFoldLine(g, l), m = l ? l.start.row : Infinity
                                    } else g = h + 1;
                                    d += this.getRowLength(h), h = g, k && (this.$docRowCache.push(h), this.$screenRowCache.push(d))
                                }
                                var n = "";
                                l && h >= m ? (n = this.getFoldDisplayLine(l, a, b), e = l.start.row) : (n = this.getLine(a).substring(0, b), e = a);
                                if (this.$useWrapMode) {
                                    var o = this.$wrapData[e],
                                        p = 0;
                                    while (n.length >= o[p]) d++, p++;
                                    n = n.substring(o[p - 1] || 0, n.length)
                                }
                                return {
                                    row: d,
                                    column: this.$getStringScreenWidth(n)[0]
                                }
                            }, this.documentToScreenColumn = function (a, b) {
                                return this.documentToScreenPosition(a, b).column
                            }, this.documentToScreenRow = function (a, b) {
                                return this.documentToScreenPosition(a, b).row
                            }, this.getScreenLength = function () {
                                var a = 0,
                                    b = null;
                                if (!this.$useWrapMode) {
                                    a = this.getLength();
                                    var c = this.$foldData;
                                    for (var d = 0; d < c.length; d++) b = c[d], a -= b.end.row - b.start.row
                                } else {
                                    var e = this.$wrapData.length,
                                        f = 0,
                                        d = 0,
                                        b = this.$foldData[d++],
                                        g = b ? b.start.row : Infinity;
                                    while (f < e) a += this.$wrapData[f].length + 1, f++, f > g && (f = b.end.row + 1, b = this.$foldData[d++], g = b ? b.start.row : Infinity)
                                }
                                return a
                            }
                        }).call(o.prototype), a("./edit_session/folding").Folding.call(o.prototype), a("./edit_session/bracket_match").BracketMatch.call(o.prototype), b.EditSession = o
                    }), ace.define("ace/config", ["require", "exports", "module", "ace/lib/lang"], function (a, b, c) {
                        function g(a) {
                            return a.replace(/-(.)/g, function (a, b) {
                                return b.toUpperCase()
                            })
                        }
                        "no use strict";
                        var d = a("./lib/lang"),
                            e = function () {
                                return this
                            }(),
                            f = {
                                packaged: !1,
                                workerPath: "",
                                modePath: "",
                                themePath: "",
                                suffix: ".js",
                                $moduleUrls: {}
                            };
                        b.get = function (a) {
                            if (!f.hasOwnProperty(a)) throw new Error("Unknown config key: " + a);
                            return f[a]
                        }, b.set = function (a, b) {
                            if (!f.hasOwnProperty(a)) throw new Error("Unknown config key: " + a);
                            f[a] = b
                        }, b.all = function () {
                            return d.copyObject(f)
                        }, b.moduleUrl = function (a, b) {
                            if (f.$moduleUrls[a]) return f.$moduleUrls[a];
                            var c = a.split("/");
                            b = b || c[c.length - 2] || "";
                            var d = c[c.length - 1].replace(b, "").replace(/(^[\-_])|([\-_]$)/, "");
                            return !d && c.length > 1 && (d = c[c.length - 2]), this.get(b + "Path") + "/" + b + "-" + d + this.get("suffix")
                        }, b.setModuleUrl = function (a, b) {
                            return f.$moduleUrls[a] = b
                        }, b.init = function () {
                            f.packaged = a.packaged || c.packaged || e.define && define.packaged;
                            if (!e.document) return "";
                            var d = {},
                                h = "",
                                i = document.getElementsByTagName("script");
                            for (var j = 0; j < i.length; j++) {
                                var k = i[j],
                                    l = k.src || k.getAttribute("src");
                                if (!l) continue;
                                var m = k.attributes;
                                for (var n = 0, o = m.length; n < o; n++) {
                                    var p = m[n];
                                    p.name.indexOf("data-ace-") === 0 && (d[g(p.name.replace(/^data-ace-/, ""))] = p.value)
                                }
                                var q = l.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
                                q && (h = q[1])
                            }
                            h && (d.base = d.base || h, d.packaged = !0), d.workerPath = d.workerPath || d.base, d.modePath = d.modePath || d.base, d.themePath = d.themePath || d.base, delete d.base;
                            for (var r in d) typeof d[r] != "undefined" && b.set(r, d[r])
                        }
                    }), ace.define("ace/lib/net", ["require", "exports", "module", "ace/lib/useragent"], function (a, b, c) {
                        var d = a("./useragent");
                        b.get = function (a, c) {
                            var d = b.createXhr();
                            d.open("GET", a, !0), d.onreadystatechange = function (a) {
                                d.readyState === 4 && c(d.responseText)
                            }, d.send(null)
                        };
                        var e = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"];
                        b.createXhr = function () {
                            var a, b, c;
                            if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
                            for (b = 0; b < 3; b++) {
                                c = e[b];
                                try {
                                    a = new ActiveXObject(c)
                                } catch (d) {}
                                if (a) {
                                    e = [c];
                                    break
                                }
                            }
                            if (!a) throw new Error("createXhr(): XMLHttpRequest not available");
                            return a
                        }, b.loadScript = function (a, b) {
                            var c = document.getElementsByTagName("head")[0],
                                e = document.createElement("script");
                            e.src = a, c.appendChild(e), d.isOldIE ? e.onreadystatechange = function () {
                                this.readyState == "loaded" && b()
                            } : e.onload = b
                        }
                    }), ace.define("ace/lib/event_emitter", ["require", "exports", "module"], function (a, b, c) {
                        var d = {};
                        d._emit = d._dispatchEvent = function (a, b) {
                            this._eventRegistry = this._eventRegistry || {}, this._defaultHandlers = this._defaultHandlers || {};
                            var c = this._eventRegistry[a] || [],
                                d = this._defaultHandlers[a];
                            if (!c.length && !d) return;
                            b = b || {}, b.type || (b.type = a), b.stopPropagation || (b.stopPropagation = function () {
                                this.propagationStopped = !0
                            }), b.preventDefault || (b.preventDefault = function () {
                                this.defaultPrevented = !0
                            });
                            for (var e = 0; e < c.length; e++) {
                                c[e](b);
                                if (b.propagationStopped) break
                            }
                            if (d && !b.defaultPrevented) return d(b)
                        }, d.setDefaultHandler = function (a, b) {
                            this._defaultHandlers = this._defaultHandlers || {};
                            if (this._defaultHandlers[a]) throw new Error("The default handler for '" + a + "' is already set");
                            this._defaultHandlers[a] = b
                        }, d.on = d.addEventListener = function (a, b) {
                            this._eventRegistry = this._eventRegistry || {};
                            var c = this._eventRegistry[a];
                            c || (c = this._eventRegistry[a] = []), c.indexOf(b) == -1 && c.push(b)
                        }, d.removeListener = d.removeEventListener = function (a, b) {
                            this._eventRegistry = this._eventRegistry || {};
                            var c = this._eventRegistry[a];
                            if (!c) return;
                            var d = c.indexOf(b);
                            d !== -1 && c.splice(d, 1)
                        }, d.removeAllListeners = function (a) {
                            this._eventRegistry && (this._eventRegistry[a] = [])
                        }, b.EventEmitter = d
                    }), ace.define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], function (a, b, c) {
                        var d = a("./lib/oop"),
                            e = a("./lib/lang"),
                            f = a("./lib/event_emitter").EventEmitter,
                            g = a("./range").Range,
                            h = function (a) {
                                this.session = a, this.doc = a.getDocument(), this.clearSelection(), this.lead = this.selectionLead = this.doc.createAnchor(0, 0), this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);
                                var b = this;
                                this.lead.on("change", function (a) {
                                    b._emit("changeCursor"), b.$isEmpty || b._emit("changeSelection"), !b.$keepDesiredColumnOnChange && a.old.column != a.value.column && (b.$desiredColumn = null)
                                }), this.selectionAnchor.on("change", function () {
                                    b.$isEmpty || b._emit("changeSelection")
                                })
                            };
                        (function () {
                            d.implement(this, f), this.isEmpty = function () {
                                return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column
                            }, this.isMultiLine = function () {
                                return this.isEmpty() ? !1 : this.getRange().isMultiLine()
                            }, this.getCursor = function () {
                                return this.lead.getPosition()
                            }, this.setSelectionAnchor = function (a, b) {
                                this.anchor.setPosition(a, b), this.$isEmpty && (this.$isEmpty = !1, this._emit("changeSelection"))
                            }, this.getSelectionAnchor = function () {
                                return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition()
                            }, this.getSelectionLead = function () {
                                return this.lead.getPosition()
                            }, this.shiftSelection = function (a) {
                                if (this.$isEmpty) {
                                    this.moveCursorTo(this.lead.row, this.lead.column + a);
                                    return
                                }
                                var b = this.getSelectionAnchor(),
                                    c = this.getSelectionLead(),
                                    d = this.isBackwards();
                                (!d || b.column !== 0) && this.setSelectionAnchor(b.row, b.column + a), (d || c.column !== 0) && this.$moveSelection(function () {
                                    this.moveCursorTo(c.row, c.column + a)
                                })
                            }, this.isBackwards = function () {
                                var a = this.anchor,
                                    b = this.lead;
                                return a.row > b.row || a.row == b.row && a.column > b.column
                            }, this.getRange = function () {
                                var a = this.anchor,
                                    b = this.lead;
                                return this.isEmpty() ? g.fromPoints(b, b) : this.isBackwards() ? g.fromPoints(b, a) : g.fromPoints(a, b)
                            }, this.clearSelection = function () {
                                this.$isEmpty || (this.$isEmpty = !0, this._emit("changeSelection"))
                            }, this.selectAll = function () {
                                var a = this.doc.getLength() - 1;
                                this.setSelectionAnchor(0, 0), this.moveCursorTo(a, this.doc.getLine(a).length)
                            }, this.setRange = this.setSelectionRange = function (a, b) {
                                b ? (this.setSelectionAnchor(a.end.row, a.end.column), this.selectTo(a.start.row, a.start.column)) : (this.setSelectionAnchor(a.start.row, a.start.column), this.selectTo(a.end.row, a.end.column)), this.$desiredColumn = null
                            }, this.$moveSelection = function (a) {
                                var b = this.lead;
                                this.$isEmpty && this.setSelectionAnchor(b.row, b.column), a.call(this)
                            }, this.selectTo = function (a, b) {
                                this.$moveSelection(function () {
                                    this.moveCursorTo(a, b)
                                })
                            }, this.selectToPosition = function (a) {
                                this.$moveSelection(function () {
                                    this.moveCursorToPosition(a)
                                })
                            }, this.selectUp = function () {
                                this.$moveSelection(this.moveCursorUp)
                            }, this.selectDown = function () {
                                this.$moveSelection(this.moveCursorDown)
                            }, this.selectRight = function () {
                                this.$moveSelection(this.moveCursorRight)
                            }, this.selectLeft = function () {
                                this.$moveSelection(this.moveCursorLeft)
                            }, this.selectLineStart = function () {
                                this.$moveSelection(this.moveCursorLineStart)
                            }, this.selectLineEnd = function () {
                                this.$moveSelection(this.moveCursorLineEnd)
                            }, this.selectFileEnd = function () {
                                this.$moveSelection(this.moveCursorFileEnd)
                            }, this.selectFileStart = function () {
                                this.$moveSelection(this.moveCursorFileStart)
                            }, this.selectWordRight = function () {
                                this.$moveSelection(this.moveCursorWordRight)
                            }, this.selectWordLeft = function () {
                                this.$moveSelection(this.moveCursorWordLeft)
                            }, this.getWordRange = function (a, b) {
                                if (typeof b == "undefined") {
                                    var c = a || this.lead;
                                    a = c.row, b = c.column
                                }
                                return this.session.getWordRange(a, b)
                            }, this.selectWord = function () {
                                this.setSelectionRange(this.getWordRange())
                            }, this.selectAWord = function () {
                                var a = this.getCursor(),
                                    b = this.session.getAWordRange(a.row, a.column);
                                this.setSelectionRange(b)
                            }, this.getLineRange = function (a, b) {
                                var c = typeof a == "number" ? a : this.lead.row,
                                    d, e = this.session.getFoldLine(c);
                                return e ? (c = e.start.row, d = e.end.row) : d = c, b ? new g(c, 0, d, this.session.getLine(d).length) : new g(c, 0, d + 1, 0)
                            }, this.selectLine = function () {
                                this.setSelectionRange(this.getLineRange())
                            }, this.moveCursorUp = function () {
                                this.moveCursorBy(-1, 0)
                            }, this.moveCursorDown = function () {
                                this.moveCursorBy(1, 0)
                            }, this.moveCursorLeft = function () {
                                var a = this.lead.getPosition(),
                                    b;
                                if (b = this.session.getFoldAt(a.row, a.column, -1)) this.moveCursorTo(b.start.row, b.start.column);
                                else if (a.column == 0) a.row > 0 && this.moveCursorTo(a.row - 1, this.doc.getLine(a.row - 1).length);
                                else {
                                    var c = this.session.getTabSize();
                                    this.session.isTabStop(a) && this.doc.getLine(a.row).slice(a.column - c, a.column).split(" ").length - 1 == c ? this.moveCursorBy(0, -c) : this.moveCursorBy(0, -1)
                                }
                            }, this.moveCursorRight = function () {
                                var a = this.lead.getPosition(),
                                    b;
                                if (b = this.session.getFoldAt(a.row, a.column, 1)) this.moveCursorTo(b.end.row, b.end.column);
                                else if (this.lead.column == this.doc.getLine(this.lead.row).length) this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0);
                                else {
                                    var c = this.session.getTabSize(),
                                        a = this.lead;
                                    this.session.isTabStop(a) && this.doc.getLine(a.row).slice(a.column, a.column + c).split(" ").length - 1 == c ? this.moveCursorBy(0, c) : this.moveCursorBy(0, 1)
                                }
                            }, this.moveCursorLineStart = function () {
                                var a = this.lead.row,
                                    b = this.lead.column,
                                    c = this.session.documentToScreenRow(a, b),
                                    d = this.session.screenToDocumentPosition(c, 0),
                                    e = this.session.getDisplayLine(a, null, d.row, d.column),
                                    f = e.match(/^\s*/);
                                f[0].length == b ? this.moveCursorTo(d.row, d.column) : this.moveCursorTo(d.row, d.column + f[0].length)
                            }, this.moveCursorLineEnd = function () {
                                var a = this.lead,
                                    b = this.session.getDocumentLastRowColumnPosition(a.row, a.column);
                                if (this.lead.column == b.column) {
                                    var c = this.session.getLine(b.row);
                                    if (b.column == c.length) {
                                        var d = c.search(/\s+$/);
                                        d > 0 && (b.column = d)
                                    }
                                }
                                this.moveCursorTo(b.row, b.column)
                            }, this.moveCursorFileEnd = function () {
                                var a = this.doc.getLength() - 1,
                                    b = this.doc.getLine(a).length;
                                this.moveCursorTo(a, b)
                            }, this.moveCursorFileStart = function () {
                                this.moveCursorTo(0, 0)
                            }, this.moveCursorLongWordRight = function () {
                                var a = this.lead.row,
                                    b = this.lead.column,
                                    c = this.doc.getLine(a),
                                    d = c.substring(b),
                                    e;
                                this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
                                var f = this.session.getFoldAt(a, b, 1);
                                if (f) {
                                    this.moveCursorTo(f.end.row, f.end.column);
                                    return
                                }
                                if (e = this.session.nonTokenRe.exec(d)) b += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, d = c.substring(b);
                                if (b >= c.length) {
                                    this.moveCursorTo(a, c.length), this.moveCursorRight(), a < this.doc.getLength() - 1 && this.moveCursorWordRight();
                                    return
                                }
                                if (e = this.session.tokenRe.exec(d)) b += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0;
                                this.moveCursorTo(a, b)
                            }, this.moveCursorLongWordLeft = function () {
                                var a = this.lead.row,
                                    b = this.lead.column,
                                    c;
                                if (c = this.session.getFoldAt(a, b, -1)) {
                                    this.moveCursorTo(c.start.row, c.start.column);
                                    return
                                }
                                var d = this.session.getFoldStringAt(a, b, -1);
                                d == null && (d = this.doc.getLine(a).substring(0, b));
                                var f = e.stringReverse(d),
                                    g;
                                this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
                                if (g = this.session.nonTokenRe.exec(f)) b -= this.session.nonTokenRe.lastIndex, f = f.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0;
                                if (b <= 0) {
                                    this.moveCursorTo(a, 0), this.moveCursorLeft(), a > 0 && this.moveCursorWordLeft();
                                    return
                                }
                                if (g = this.session.tokenRe.exec(f)) b -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0;
                                this.moveCursorTo(a, b)
                            }, this.$shortWordEndIndex = function (a) {
                                var b, c = 0,
                                    d, e = /\s/,
                                    f = this.session.tokenRe;
                                f.lastIndex = 0;
                                if (b = this.session.tokenRe.exec(a)) c = this.session.tokenRe.lastIndex;
                                else {
                                    while ((d = a[c]) && e.test(d)) c++;
                                    if (c <= 1) {
                                        f.lastIndex = 0;
                                        while ((d = a[c]) && !f.test(d)) {
                                            f.lastIndex = 0, c++;
                                            if (e.test(d)) {
                                                if (c > 2) {
                                                    c--;
                                                    break
                                                }
                                                while ((d = a[c]) && e.test(d)) c++;
                                                if (c > 2) break
                                            }
                                        }
                                    }
                                }
                                return f.lastIndex = 0, c
                            }, this.moveCursorShortWordRight = function () {
                                var a = this.lead.row,
                                    b = this.lead.column,
                                    c = this.doc.getLine(a),
                                    d = c.substring(b),
                                    e = this.session.getFoldAt(a, b, 1);
                                if (e) return this.moveCursorTo(e.end.row, e.end.column);
                                if (b == c.length) {
                                    var f = this.doc.getLength();
                                    do a++, d = this.doc.getLine(a);
                                    while (a < f && /^\s*$/.test(d));
                                    /^\s+/.test(d) || (d = ""), b = 0
                                }
                                var g = this.$shortWordEndIndex(d);
                                this.moveCursorTo(a, b + g)
                            }, this.moveCursorShortWordLeft = function () {
                                var a = this.lead.row,
                                    b = this.lead.column,
                                    c;
                                if (c = this.session.getFoldAt(a, b, -1)) return this.moveCursorTo(c.start.row, c.start.column);
                                var d = this.session.getLine(a).substring(0, b);
                                if (b == 0) {
                                    do a--, d = this.doc.getLine(a);
                                    while (a > 0 && /^\s*$/.test(d));
                                    b = d.length, /\s+$/.test(d) || (d = "")
                                }
                                var f = e.stringReverse(d),
                                    g = this.$shortWordEndIndex(f);
                                return this.moveCursorTo(a, b - g)
                            }, this.moveCursorWordRight = function () {
                                this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight()
                            }, this.moveCursorWordLeft = function () {
                                this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft()
                            }, this.moveCursorBy = function (a, b) {
                                var c = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
                                b === 0 && (this.$desiredColumn ? c.column = this.$desiredColumn : this.$desiredColumn = c.column);
                                var d = this.session.screenToDocumentPosition(c.row + a, c.column);
                                this.moveCursorTo(d.row, d.column + b, b === 0)
                            }, this.moveCursorToPosition = function (a) {
                                this.moveCursorTo(a.row, a.column)
                            }, this.moveCursorTo = function (a, b, c) {
                                var d = this.session.getFoldAt(a, b, 1);
                                d && (a = d.start.row, b = d.start.column), this.$keepDesiredColumnOnChange = !0, this.lead.setPosition(a, b), this.$keepDesiredColumnOnChange = !1, c || (this.$desiredColumn = null)
                            }, this.moveCursorToScreen = function (a, b, c) {
                                var d = this.session.screenToDocumentPosition(a, b);
                                this.moveCursorTo(d.row, d.column, c)
                            }, this.detach = function () {
                                this.lead.detach(), this.anchor.detach(), this.session = this.doc = null
                            }, this.fromOrientedRange = function (a) {
                                this.setSelectionRange(a, a.cursor == a.start), this.$desiredColumn = a.desiredColumn || this.$desiredColumn
                            }, this.toOrientedRange = function (a) {
                                var b = this.getRange();
                                return a ? (a.start.column = b.start.column, a.start.row = b.start.row, a.end.column = b.end.column, a.end.row = b.end.row) : a = b, a.cursor = this.isBackwards() ? a.start : a.end, a.desiredColumn = this.$desiredColumn, a
                            }
                        }).call(h.prototype), b.Selection = h
                    }), ace.define("ace/range", ["require", "exports", "module"], function (a, b, c) {
                        var d = function (a, b, c, d) {
                                this.start = {
                                    row: a,
                                    column: b
                                }, this.end = {
                                    row: c,
                                    column: d
                                }
                            };
                        (function () {
                            this.isEqual = function (a) {
                                return this.start.row == a.start.row && this.end.row == a.end.row && this.start.column == a.start.column && this.end.column == a.end.column
                            }, this.toString = function () {
                                return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
                            }, this.contains = function (a, b) {
                                return this.compare(a, b) == 0
                            }, this.compareRange = function (a) {
                                var b, c = a.end,
                                    d = a.start;
                                return b = this.compare(c.row, c.column), b == 1 ? (b = this.compare(d.row, d.column), b == 1 ? 2 : b == 0 ? 1 : 0) : b == -1 ? -2 : (b = this.compare(d.row, d.column), b == -1 ? -1 : b == 1 ? 42 : 0)
                            }, this.comparePoint = function (a) {
                                return this.compare(a.row, a.column)
                            }, this.containsRange = function (a) {
                                return this.comparePoint(a.start) == 0 && this.comparePoint(a.end) == 0
                            }, this.intersects = function (a) {
                                var b = this.compareRange(a);
                                return b == -1 || b == 0 || b == 1
                            }, this.isEnd = function (a, b) {
                                return this.end.row == a && this.end.column == b
                            }, this.isStart = function (a, b) {
                                return this.start.row == a && this.start.column == b
                            }, this.setStart = function (a, b) {
                                typeof a == "object" ? (this.start.column = a.column, this.start.row = a.row) : (this.start.row = a, this.start.column = b)
                            }, this.setEnd = function (a, b) {
                                typeof a == "object" ? (this.end.column = a.column, this.end.row = a.row) : (this.end.row = a, this.end.column = b)
                            }, this.inside = function (a, b) {
                                return this.compare(a, b) == 0 ? this.isEnd(a, b) || this.isStart(a, b) ? !1 : !0 : !1
                            }, this.insideStart = function (a, b) {
                                return this.compare(a, b) == 0 ? this.isEnd(a, b) ? !1 : !0 : !1
                            }, this.insideEnd = function (a, b) {
                                return this.compare(a, b) == 0 ? this.isStart(a, b) ? !1 : !0 : !1
                            }, this.compare = function (a, b) {
                                return !this.isMultiLine() && a === this.start.row ? b < this.start.column ? -1 : b > this.end.column ? 1 : 0 : a < this.start.row ? -1 : a > this.end.row ? 1 : this.start.row === a ? b >= this.start.column ? 0 : -1 : this.end.row === a ? b <= this.end.column ? 0 : 1 : 0
                            }, this.compareStart = function (a, b) {
                                return this.start.row == a && this.start.column == b ? -1 : this.compare(a, b)
                            }, this.compareEnd = function (a, b) {
                                return this.end.row == a && this.end.column == b ? 1 : this.compare(a, b)
                            }, this.compareInside = function (a, b) {
                                return this.end.row == a && this.end.column == b ? 1 : this.start.row == a && this.start.column == b ? -1 : this.compare(a, b)
                            }, this.clipRows = function (a, b) {
                                if (this.end.row > b) var c = {
                                    row: b + 1,
                                    column: 0
                                };
                                if (this.start.row > b) var e = {
                                    row: b + 1,
                                    column: 0
                                };
                                if (this.start.row < a) var e = {
                                    row: a,
                                    column: 0
                                };
                                if (this.end.row < a) var c = {
                                    row: a,
                                    column: 0
                                };
                                return d.fromPoints(e || this.start, c || this.end)
                            }, this.extend = function (a, b) {
                                var c = this.compare(a, b);
                                if (c == 0) return this;
                                if (c == -1) var e = {
                                    row: a,
                                    column: b
                                };
                                else var f = {
                                    row: a,
                                    column: b
                                };
                                return d.fromPoints(e || this.start, f || this.end)
                            }, this.isEmpty = function () {
                                return this.start.row == this.end.row && this.start.column == this.end.column
                            }, this.isMultiLine = function () {
                                return this.start.row !== this.end.row
                            }, this.clone = function () {
                                return d.fromPoints(this.start, this.end)
                            }, this.collapseRows = function () {
                                return this.end.column == 0 ? new d(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new d(this.start.row, 0, this.end.row, 0)
                            }, this.toScreenRange = function (a) {
                                var b = a.documentToScreenPosition(this.start),
                                    c = a.documentToScreenPosition(this.end);
                                return new d(b.row, b.column, c.row, c.column)
                            }
                        }).call(d.prototype), d.fromPoints = function (a, b) {
                            return new d(a.row, a.column, b.row, b.column)
                        }, b.Range = d
                    }), ace.define("ace/mode/text", ["require", "exports", "module", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour", "ace/unicode"], function (a, b, c) {
                        var d = a("../tokenizer").Tokenizer,
                            e = a("./text_highlight_rules").TextHighlightRules,
                            f = a("./behaviour").Behaviour,
                            g = a("../unicode"),
                            h = function () {
                                this.$tokenizer = new d((new e).getRules()), this.$behaviour = new f
                            };
                        (function () {
                            this.tokenRe = new RegExp("^[" + g.packages.L + g.packages.Mn + g.packages.Mc + g.packages.Nd + g.packages.Pc + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + g.packages.L + g.packages.Mn + g.packages.Mc + g.packages.Nd + g.packages.Pc + "\\$_]|s])+", "g"), this.getTokenizer = function () {
                                return this.$tokenizer
                            }, this.toggleCommentLines = function (a, b, c, d) {}, this.getNextLineIndent = function (a, b, c) {
                                return ""
                            }, this.checkOutdent = function (a, b, c) {
                                return !1
                            }, this.autoOutdent = function (a, b, c) {}, this.$getIndent = function (a) {
                                var b = a.match(/^(\s+)/);
                                return b ? b[1] : ""
                            }, this.createWorker = function (a) {
                                return null
                            }, this.createModeDelegates = function (a) {
                                if (!this.$embeds) return;
                                this.$modes = {};
                                for (var b = 0; b < this.$embeds.length; b++) a[this.$embeds[b]] && (this.$modes[this.$embeds[b]] = new a[this.$embeds[b]]);
                                var c = ["toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction"];
                                for (var b = 0; b < c.length; b++)(function (a) {
                                    var d = c[b],
                                        e = a[d];
                                    a[c[b]] = function () {
                                        return this.$delegator(d, arguments, e)
                                    }
                                })(this)
                            }, this.$delegator = function (a, b, c) {
                                var d = b[0];
                                for (var e = 0; e < this.$embeds.length; e++) {
                                    if (!this.$modes[this.$embeds[e]]) continue;
                                    var f = d.split(this.$embeds[e]);
                                    if (!f[0] && f[1]) {
                                        b[0] = f[1];
                                        var g = this.$modes[this.$embeds[e]];
                                        return g[a].apply(g, b)
                                    }
                                }
                                var h = c.apply(this, b);
                                return c ? h : undefined
                            }, this.transformAction = function (a, b, c, d, e) {
                                if (this.$behaviour) {
                                    var f = this.$behaviour.getBehaviours();
                                    for (var g in f) if (f[g][b]) {
                                        var h = f[g][b].apply(this, arguments);
                                        if (h) return h
                                    }
                                }
                            }
                        }).call(h.prototype), b.Mode = h
                    }), ace.define("ace/tokenizer", ["require", "exports", "module"], function (a, b, c) {
                        var d = function (a, b) {
                                b = b ? "g" + b : "g", this.rules = a, this.regExps = {}, this.matchMappings = {};
                                for (var c in this.rules) {
                                    var d = this.rules[c],
                                        e = d,
                                        f = [],
                                        g = 0,
                                        h = this.matchMappings[c] = {};
                                    for (var i = 0; i < e.length; i++) {
                                        e[i].regex instanceof RegExp && (e[i].regex = e[i].regex.toString().slice(1, -1));
                                        var j = (new RegExp("(?:(" + e[i].regex + ")|(.))")).exec("a").length - 2,
                                            k = e[i].regex.replace(/\\([0-9]+)/g, function (a, b) {
                                                return "\\" + (parseInt(b, 10) + g + 1)
                                            });
                                        if (j > 1 && e[i].token.length !== j - 1) throw new Error("Matching groups and length of the token array don't match in rule #" + i + " of state " + c);
                                        h[g] = {
                                            rule: i,
                                            len: j
                                        }, g += j, f.push(k)
                                    }
                                    this.regExps[c] = new RegExp("(?:(" + f.join(")|(") + ")|(.))", b)
                                }
                            };
                        (function () {
                            this.getLineTokens = function (a, b) {
                                var c = b || "start",
                                    d = this.rules[c],
                                    e = this.matchMappings[c],
                                    f = this.regExps[c];
                                f.lastIndex = 0;
                                var g, h = [],
                                    i = 0,
                                    j = {
                                        type: null,
                                        value: ""
                                    };
                                while (g = f.exec(a)) {
                                    var k = "text",
                                        l = null,
                                        m = [g[0]];
                                    for (var n = 0; n < g.length - 2; n++) {
                                        if (g[n + 1] === undefined) continue;
                                        l = d[e[n].rule], e[n].len > 1 && (m = g.slice(n + 2, n + 1 + e[n].len)), typeof l.token == "function" ? k = l.token.apply(this, m) : k = l.token, l.next && (c = l.next, d = this.rules[c], e = this.matchMappings[c], i = f.lastIndex, f = this.regExps[c], f.lastIndex = i);
                                        break
                                    }
                                    if (m[0]) {
                                        typeof k == "string" && (m = [m.join("")], k = [k]);
                                        for (var n = 0; n < m.length; n++) {
                                            if (!m[n]) continue;
                                            (!l || l.merge || k[n] === "text") && j.type === k[n] ? j.value += m[n] : (j.type && h.push(j), j = {
                                                type: k[n],
                                                value: m[n]
                                            })
                                        }
                                    }
                                    if (i == a.length) break;
                                    i = f.lastIndex
                                }
                                return j.type && h.push(j), {
                                    tokens: h,
                                    state: c
                                }
                            }
                        }).call(d.prototype), b.Tokenizer = d
                    }), ace.define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function (a, b, c) {
                        var d = a("../lib/lang"),
                            e = function () {
                                this.$rules = {
                                    start: [{
                                        token: "empty_line",
                                        regex: "^$"
                                    }, {
                                        token: "text",
                                        regex: ".+"
                                    }]
                                }
                            };
                        (function () {
                            this.addRules = function (a, b) {
                                for (var c in a) {
                                    var d = a[c];
                                    for (var e = 0; e < d.length; e++) {
                                        var f = d[e];
                                        f.next && (f.next = b + f.next)
                                    }
                                    this.$rules[b + c] = d
                                }
                            }, this.getRules = function () {
                                return this.$rules
                            }, this.embedRules = function (a, b, c, e) {
                                var f = (new a).getRules();
                                if (e) for (var g = 0; g < e.length; g++) e[g] = b + e[g];
                                else {
                                    e = [];
                                    for (var h in f) e.push(b + h)
                                }
                                this.addRules(f, b);
                                for (var g = 0; g < e.length; g++) Array.prototype.unshift.apply(this.$rules[e[g]], d.deepCopy(c));
                                this.$embeds || (this.$embeds = []), this.$embeds.push(b)
                            }, this.getEmbeds = function () {
                                return this.$embeds
                            }
                        }).call(e.prototype), b.TextHighlightRules = e
                    }), ace.define("ace/mode/behaviour", ["require", "exports", "module"], function (a, b, c) {
                        var d = function () {
                                this.$behaviours = {}
                            };
                        (function () {
                            this.add = function (a, b, c) {
                                switch (undefined) {
                                case this.$behaviours:
                                    this.$behaviours = {};
                                case this.$behaviours[a]:
                                    this.$behaviours[a] = {}
                                }
                                this.$behaviours[a][b] = c
                            }, this.addBehaviours = function (a) {
                                for (var b in a) for (var c in a[b]) this.add(b, c, a[b][c])
                            }, this.remove = function (a) {
                                this.$behaviours && this.$behaviours[a] && delete this.$behaviours[a]
                            }, this.inherit = function (a, b) {
                                if (typeof a == "function") var c = (new a).getBehaviours(b);
                                else var c = a.getBehaviours(b);
                                this.addBehaviours(c)
                            }, this.getBehaviours = function (a) {
                                if (!a) return this.$behaviours;
                                var b = {};
                                for (var c = 0; c < a.length; c++) this.$behaviours[a[c]] && (b[a[c]] = this.$behaviours[a[c]]);
                                return b
                            }
                        }).call(d.prototype), b.Behaviour = d
                    }), ace.define("ace/unicode", ["require", "exports", "module"], function (a, b, c) {
                        function d(a) {
                            var c = /\w{4}/g;
                            for (var d in a) b.packages[d] = a[d].replace(c, "\\u$&")
                        }
                        b.packages = {}, d({
                            L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
                            Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
                            Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
                            Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
                            Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",
                            Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
                            M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
                            Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
                            Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
                            Me: "0488048906DE20DD-20E020E2-20E4A670-A672",
                            N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
                            Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
                            Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
                            No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
                            P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
                            Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",
                            Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
                            Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
                            Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
                            Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
                            Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",
                            Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
                            S: "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
                            Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
                            Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
                            Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
                            So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
                            Z: "002000A01680180E2000-200A20282029202F205F3000",
                            Zs: "002000A01680180E2000-200A202F205F3000",
                            Zl: "2028",
                            Zp: "2029",
                            C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
                            Cc: "0000-001F007F-009F",
                            Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
                            Co: "E000-F8FF",
                            Cs: "D800-DFFF",
                            Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
                        })
                    }), ace.define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/range", "ace/anchor"], function (a, b, c) {
                        var d = a("./lib/oop"),
                            e = a("./lib/event_emitter").EventEmitter,
                            f = a("./range").Range,
                            g = a("./anchor").Anchor,
                            h = function (a) {
                                this.$lines = [], a.length == 0 ? this.$lines = [""] : Array.isArray(a) ? this.insertLines(0, a) : this.insert({
                                    row: 0,
                                    column: 0
                                }, a)
                            };
                        (function () {
                            d.implement(this, e), this.setValue = function (a) {
                                var b = this.getLength();
                                this.remove(new f(0, 0, b, this.getLine(b - 1).length)), this.insert({
                                    row: 0,
                                    column: 0
                                }, a)
                            }, this.getValue = function () {
                                return this.getAllLines().join(this.getNewLineCharacter())
                            }, this.createAnchor = function (a, b) {
                                return new g(this, a, b)
                            }, "aaa".split(/a/).length == 0 ? this.$split = function (a) {
                                return a.replace(/\r\n|\r/g, "\n").split("\n")
                            } : this.$split = function (a) {
                                return a.split(/\r\n|\r|\n/)
                            }, this.$detectNewLine = function (a) {
                                var b = a.match(/^.*?(\r\n|\r|\n)/m);
                                b ? this.$autoNewLine = b[1] : this.$autoNewLine = "\n"
                            }, this.getNewLineCharacter = function () {
                                switch (this.$newLineMode) {
                                case "windows":
                                    return "\r\n";
                                case "unix":
                                    return "\n";
                                case "auto":
                                    return this.$autoNewLine
                                }
                            }, this.$autoNewLine = "\n", this.$newLineMode = "auto", this.setNewLineMode = function (a) {
                                if (this.$newLineMode === a) return;
                                this.$newLineMode = a
                            }, this.getNewLineMode = function () {
                                return this.$newLineMode
                            }, this.isNewLine = function (a) {
                                return a == "\r\n" || a == "\r" || a == "\n"
                            }, this.getLine = function (a) {
                                return this.$lines[a] || ""
                            }, this.getLines = function (a, b) {
                                return this.$lines.slice(a, b + 1)
                            }, this.getAllLines = function () {
                                return this.getLines(0, this.getLength())
                            }, this.getLength = function () {
                                return this.$lines.length
                            }, this.getTextRange = function (a) {
                                if (a.start.row == a.end.row) return this.$lines[a.start.row].substring(a.start.column, a.end.column);
                                var b = this.getLines(a.start.row + 1, a.end.row - 1);
                                return b.unshift((this.$lines[a.start.row] || "").substring(a.start.column)), b.push((this.$lines[a.end.row] || "").substring(0, a.end.column)), b.join(this.getNewLineCharacter())
                            }, this.$clipPosition = function (a) {
                                var b = this.getLength();
                                return a.row >= b && (a.row = Math.max(0, b - 1), a.column = this.getLine(b - 1).length), a
                            }, this.insert = function (a, b) {
                                if (!b || b.length === 0) return a;
                                a = this.$clipPosition(a), this.getLength() <= 1 && this.$detectNewLine(b);
                                var c = this.$split(b),
                                    d = c.splice(0, 1)[0],
                                    e = c.length == 0 ? null : c.splice(c.length - 1, 1)[0];
                                return a = this.insertInLine(a, d), e !== null && (a = this.insertNewLine(a), a = this.insertLines(a.row, c), a = this.insertInLine(a, e || "")), a
                            }, this.insertLines = function (a, b) {
                                if (b.length == 0) return {
                                    row: a,
                                    column: 0
                                };
                                if (b.length > 65535) {
                                    var c = this.insertLines(a, b.slice(65535));
                                    b = b.slice(0, 65535)
                                }
                                var d = [a, 0];
                                d.push.apply(d, b), this.$lines.splice.apply(this.$lines, d);
                                var e = new f(a, 0, a + b.length, 0),
                                    g = {
                                        action: "insertLines",
                                        range: e,
                                        lines: b
                                    };
                                return this._emit("change", {
                                    data: g
                                }), c || e.end
                            }, this.insertNewLine = function (a) {
                                a = this.$clipPosition(a);
                                var b = this.$lines[a.row] || "";
                                this.$lines[a.row] = b.substring(0, a.column), this.$lines.splice(a.row + 1, 0, b.substring(a.column, b.length));
                                var c = {
                                    row: a.row + 1,
                                    column: 0
                                },
                                    d = {
                                        action: "insertText",
                                        range: f.fromPoints(a, c),
                                        text: this.getNewLineCharacter()
                                    };
                                return this._emit("change", {
                                    data: d
                                }), c
                            }, this.insertInLine = function (a, b) {
                                if (b.length == 0) return a;
                                var c = this.$lines[a.row] || "";
                                this.$lines[a.row] = c.substring(0, a.column) + b + c.substring(a.column);
                                var d = {
                                    row: a.row,
                                    column: a.column + b.length
                                },
                                    e = {
                                        action: "insertText",
                                        range: f.fromPoints(a, d),
                                        text: b
                                    };
                                return this._emit("change", {
                                    data: e
                                }), d
                            }, this.remove = function (a) {
                                a.start = this.$clipPosition(a.start), a.end = this.$clipPosition(a.end);
                                if (a.isEmpty()) return a.start;
                                var b = a.start.row,
                                    c = a.end.row;
                                if (a.isMultiLine()) {
                                    var d = a.start.column == 0 ? b : b + 1,
                                        e = c - 1;
                                    a.end.column > 0 && this.removeInLine(c, 0, a.end.column), e >= d && this.removeLines(d, e), d != b && (this.removeInLine(b, a.start.column, this.getLine(b).length), this.removeNewLine(a.start.row))
                                } else this.removeInLine(b, a.start.column, a.end.column);
                                return a.start
                            }, this.removeInLine = function (a, b, c) {
                                if (b == c) return;
                                var d = new f(a, b, a, c),
                                    e = this.getLine(a),
                                    g = e.substring(b, c),
                                    h = e.substring(0, b) + e.substring(c, e.length);
                                this.$lines.splice(a, 1, h);
                                var i = {
                                    action: "removeText",
                                    range: d,
                                    text: g
                                };
                                return this._emit("change", {
                                    data: i
                                }), d.start
                            }, this.removeLines = function (a, b) {
                                var c = new f(a, 0, b + 1, 0),
                                    d = this.$lines.splice(a, b - a + 1),
                                    e = {
                                        action: "removeLines",
                                        range: c,
                                        nl: this.getNewLineCharacter(),
                                        lines: d
                                    };
                                return this._emit("change", {
                                    data: e
                                }), d
                            }, this.removeNewLine = function (a) {
                                var b = this.getLine(a),
                                    c = this.getLine(a + 1),
                                    d = new f(a, b.length, a + 1, 0),
                                    e = b + c;
                                this.$lines.splice(a, 2, e);
                                var g = {
                                    action: "removeText",
                                    range: d,
                                    text: this.getNewLineCharacter()
                                };
                                this._emit("change", {
                                    data: g
                                })
                            }, this.replace = function (a, b) {
                                if (b.length == 0 && a.isEmpty()) return a.start;
                                if (b == this.getTextRange(a)) return a.end;
                                this.remove(a);
                                if (b) var c = this.insert(a.start, b);
                                else c = a.start;
                                return c
                            }, this.applyDeltas = function (a) {
                                for (var b = 0; b < a.length; b++) {
                                    var c = a[b],
                                        d = f.fromPoints(c.range.start, c.range.end);
                                    c.action == "insertLines" ? this.insertLines(d.start.row, c.lines) : c.action == "insertText" ? this.insert(d.start, c.text) : c.action == "removeLines" ? this.removeLines(d.start.row, d.end.row - 1) : c.action == "removeText" && this.remove(d)
                                }
                            }, this.revertDeltas = function (a) {
                                for (var b = a.length - 1; b >= 0; b--) {
                                    var c = a[b],
                                        d = f.fromPoints(c.range.start, c.range.end);
                                    c.action == "insertLines" ? this.removeLines(d.start.row, d.end.row - 1) : c.action == "insertText" ? this.remove(d) : c.action == "removeLines" ? this.insertLines(d.start.row, c.lines) : c.action == "removeText" && this.insert(d.start, c.text)
                                }
                            }
                        }).call(h.prototype), b.Document = h
                    }), ace.define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (a, b, c) {
                        var d = a("./lib/oop"),
                            e = a("./lib/event_emitter").EventEmitter,
                            f = b.Anchor = function (a, b, c) {
                                this.document = a, typeof c == "undefined" ? this.setPosition(b.row, b.column) : this.setPosition(b, c), this.$onChange = this.onChange.bind(this), a.on("change", this.$onChange)
                            };
                        (function () {
                            d.implement(this, e), this.getPosition = function () {
                                return this.$clipPositionToDocument(this.row, this.column)
                            }, this.getDocument = function () {
                                return this.document
                            }, this.onChange = function (a) {
                                var b = a.data,
                                    c = b.range;
                                if (c.start.row == c.end.row && c.start.row != this.row) return;
                                if (c.start.row > this.row) return;
                                if (c.start.row == this.row && c.start.column > this.column) return;
                                var d = this.row,
                                    e = this.column;
                                b.action === "insertText" ? c.start.row === d && c.start.column <= e ? c.start.row === c.end.row ? e += c.end.column - c.start.column : (e -= c.start.column, d += c.end.row - c.start.row) : c.start.row !== c.end.row && c.start.row < d && (d += c.end.row - c.start.row) : b.action === "insertLines" ? c.start.row <= d && (d += c.end.row - c.start.row) : b.action == "removeText" ? c.start.row == d && c.start.column < e ? c.end.column >= e ? e = c.start.column : e = Math.max(0, e - (c.end.column - c.start.column)) : c.start.row !== c.end.row && c.start.row < d ? (c.end.row == d && (e = Math.max(0, e - c.end.column) + c.start.column), d -= c.end.row - c.start.row) : c.end.row == d && (d -= c.end.row - c.start.row, e = Math.max(0, e - c.end.column) + c.start.column) : b.action == "removeLines" && c.start.row <= d && (c.end.row <= d ? d -= c.end.row - c.start.row : (d = c.start.row, e = 0)), this.setPosition(d, e, !0)
                            }, this.setPosition = function (a, b, c) {
                                var d;
                                c ? d = {
                                    row: a,
                                    column: b
                                } : d = this.$clipPositionToDocument(a, b);
                                if (this.row == d.row && this.column == d.column) return;
                                var e = {
                                    row: this.row,
                                    column: this.column
                                };
                                this.row = d.row, this.column = d.column, this._emit("change", {
                                    old: e,
                                    value: d
                                })
                            }, this.detach = function () {
                                this.document.removeEventListener("change", this.$onChange)
                            }, this.$clipPositionToDocument = function (a, b) {
                                var c = {};
                                return a >= this.document.getLength() ? (c.row = Math.max(0, this.document.getLength() - 1), c.column = this.document.getLine(c.row).length) : a < 0 ? (c.row = 0, c.column = 0) : (c.row = a, c.column = Math.min(this.document.getLine(c.row).length, Math.max(0, b))), b < 0 && (c.column = 0), c
                            }
                        }).call(f.prototype)
                    }), ace.define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (a, b, c) {
                        var d = a("./lib/oop"),
                            e = a("./lib/event_emitter").EventEmitter,
                            f = 5e3,
                            g = function (a, b) {
                                this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = a;
                                var c = this;
                                this.$worker = function () {
                                    if (!c.running) return;
                                    var a = new Date,
                                        b = c.currentLine,
                                        d = c.doc,
                                        e = 0,
                                        f = d.getLength();
                                    while (c.currentLine < f) {
                                        c.$tokenizeRow(c.currentLine);
                                        while (c.lines[c.currentLine]) c.currentLine++;
                                        e++;
                                        if (e % 5 == 0 && new Date - a > 20) {
                                            c.fireUpdateEvent(b, c.currentLine - 1), c.running = setTimeout(c.$worker, 20);
                                            return
                                        }
                                    }
                                    c.running = !1, c.fireUpdateEvent(b, f - 1)
                                }
                            };
                        (function () {
                            d.implement(this, e), this.setTokenizer = function (a) {
                                this.tokenizer = a, this.lines = [], this.states = [], this.start(0)
                            }, this.setDocument = function (a) {
                                this.doc = a, this.lines = [], this.states = [], this.stop()
                            }, this.fireUpdateEvent = function (a, b) {
                                var c = {
                                    first: a,
                                    last: b
                                };
                                this._emit("update", {
                                    data: c
                                })
                            }, this.start = function (a) {
                                this.currentLine = Math.min(a || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700)
                            }, this.$updateOnChange = function (a) {
                                var b = a.range,
                                    c = b.start.row,
                                    d = b.end.row - c;
                                if (d === 0) this.lines[c] = null;
                                else if (a.action == "removeText" || a.action == "removeLines") this.lines.splice(c, d + 1, null), this.states.splice(c, d + 1, null);
                                else {
                                    var e = Array(d + 1);
                                    e.unshift(c, 1), this.lines.splice.apply(this.lines, e), this.states.splice.apply(this.states, e)
                                }
                                this.currentLine = Math.min(c, this.currentLine, this.doc.getLength()), this.stop(), this.running = setTimeout(this.$worker, 700)
                            }, this.stop = function () {
                                this.running && clearTimeout(this.running), this.running = !1
                            }, this.getTokens = function (a) {
                                return this.lines[a] || this.$tokenizeRow(a)
                            }, this.getState = function (a) {
                                return this.currentLine == a && this.$tokenizeRow(a), this.states[a] || "start"
                            }, this.$tokenizeRow = function (a) {
                                var b = this.doc.getLine(a),
                                    c = this.states[a - 1];
                                if (b.length > f) {
                                    var d = {
                                        value: b.substr(f),
                                        type: "text"
                                    };
                                    b = b.slice(0, f)
                                }
                                var e = this.tokenizer.getLineTokens(b, c);
                                return d && (e.tokens.push(d), e.state = "start"), this.states[a] !== e.state ? (this.states[a] = e.state, this.lines[a + 1] = null, this.currentLine > a + 1 && (this.currentLine = a + 1)) : this.currentLine == a && (this.currentLine = a + 1), this.lines[a] = e.tokens
                            }
                        }).call(g.prototype), b.BackgroundTokenizer = g
                    }), ace.define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function (a, b, c) {
                        var d = a("./lib/lang"),
                            e = a("./lib/oop"),
                            f = a("./range").Range,
                            g = function (a, b, c) {
                                this.setRegexp(a), this.clazz = b, this.type = c || "text"
                            };
                        (function () {
                            this.setRegexp = function (a) {
                                if (this.regExp + "" == a + "") return;
                                this.regExp = a, this.cache = []
                            }, this.update = function (a, b, c, e) {
                                if (!this.regExp) return;
                                var g = e.firstRow,
                                    h = e.lastRow;
                                for (var i = g; i <= h; i++) {
                                    var j = this.cache[i];
                                    j == null && (j = d.getMatchOffsets(c.getLine(i), this.regExp), j = j.map(function (a) {
                                        return new f(i, a.offset, i, a.offset + a.length)
                                    }), this.cache[i] = j.length ? j : "");
                                    for (var k = j.length; k--;) b.drawSingleLineMarker(a, j[k].toScreenRange(c), this.clazz, e, null, this.type)
                                }
                            }
                        }).call(g.prototype), b.SearchHighlight = g
                    }), ace.define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], function (a, b, c) {
                        function h() {
                            this.getFoldAt = function (a, b, c) {
                                var d = this.getFoldLine(a);
                                if (!d) return null;
                                var e = d.folds;
                                for (var f = 0; f < e.length; f++) {
                                    var g = e[f];
                                    if (g.range.contains(a, b)) {
                                        if (c == 1 && g.range.isEnd(a, b)) continue;
                                        if (c == -1 && g.range.isStart(a, b)) continue;
                                        return g
                                    }
                                }
                            }, this.getFoldsInRange = function (a) {
                                a = a.clone();
                                var b = a.start,
                                    c = a.end,
                                    d = this.$foldData,
                                    e = [];
                                b.column += 1, c.column -= 1;
                                for (var f = 0; f < d.length; f++) {
                                    var g = d[f].range.compareRange(a);
                                    if (g == 2) continue;
                                    if (g == -2) break;
                                    var h = d[f].folds;
                                    for (var i = 0; i < h.length; i++) {
                                        var j = h[i];
                                        g = j.range.compareRange(a);
                                        if (g == -2) break;
                                        if (g == 2) continue;
                                        if (g == 42) break;
                                        e.push(j)
                                    }
                                }
                                return e
                            }, this.getAllFolds = function () {
                                function c(b) {
                                    a.push(b);
                                    if (!b.subFolds) return;
                                    for (var d = 0; d < b.subFolds.length; d++) c(b.subFolds[d])
                                }
                                var a = [],
                                    b = this.$foldData;
                                for (var d = 0; d < b.length; d++) for (var e = 0; e < b[d].folds.length; e++) c(b[d].folds[e]);
                                return a
                            }, this.getFoldStringAt = function (a, b, c, d) {
                                d = d || this.getFoldLine(a);
                                if (!d) return null;
                                var e = {
                                    end: {
                                        column: 0
                                    }
                                },
                                    f, g;
                                for (var h = 0; h < d.folds.length; h++) {
                                    g = d.folds[h];
                                    var i = g.range.compareEnd(a, b);
                                    if (i == -1) {
                                        f = this.getLine(g.start.row).substring(e.end.column, g.start.column);
                                        break
                                    }
                                    if (i === 0) return null;
                                    e = g
                                }
                                return f || (f = this.getLine(g.start.row).substring(e.end.column)), c == -1 ? f.substring(0, b - e.end.column) : c == 1 ? f.substring(b - e.end.column) : f
                            }, this.getFoldLine = function (a, b) {
                                var c = this.$foldData,
                                    d = 0;
                                b && (d = c.indexOf(b)), d == -1 && (d = 0);
                                for (d; d < c.length; d++) {
                                    var e = c[d];
                                    if (e.start.row <= a && e.end.row >= a) return e;
                                    if (e.end.row > a) return null
                                }
                                return null
                            }, this.getNextFoldLine = function (a, b) {
                                var c = this.$foldData,
                                    d = 0;
                                b && (d = c.indexOf(b)), d == -1 && (d = 0);
                                for (d; d < c.length; d++) {
                                    var e = c[d];
                                    if (e.end.row >= a) return e
                                }
                                return null
                            }, this.getFoldedRowCount = function (a, b) {
                                var c = this.$foldData,
                                    d = b - a + 1;
                                for (var e = 0; e < c.length; e++) {
                                    var f = c[e],
                                        g = f.end.row,
                                        h = f.start.row;
                                    if (g >= b) {
                                        h < b && (h >= a ? d -= b - h : d = 0);
                                        break
                                    }
                                    g >= a && (h >= a ? d -= g - h : d -= g - a + 1)
                                }
                                return d
                            }, this.$addFoldLine = function (a) {
                                return this.$foldData.push(a), this.$foldData.sort(function (a, b) {
                                    return a.start.row - b.start.row
                                }), a
                            }, this.addFold = function (a, b) {
                                var c = this.$foldData,
                                    d = !1,
                                    g;
                                a instanceof f ? g = a : g = new f(b, a), this.$clipRangeToDocument(g.range);
                                var h = g.start.row,
                                    i = g.start.column,
                                    j = g.end.row,
                                    k = g.end.column;
                                if (g.placeholder.length < 2) throw "Placeholder has to be at least 2 characters";
                                if (h == j && k - i < 2) throw "The range has to be at least 2 characters width";
                                var l = this.getFoldAt(h, i, 1),
                                    m = this.getFoldAt(j, k, -1);
                                if (l && m == l) return l.addSubFold(g);
                                if (l && !l.range.isStart(h, i) || m && !m.range.isEnd(j, k)) throw "A fold can't intersect already existing fold" + g.range + l.range;
                                var n = this.getFoldsInRange(g.range);
                                n.length > 0 && (this.removeFolds(n), g.subFolds = n);
                                for (var o = 0; o < c.length; o++) {
                                    var p = c[o];
                                    if (j == p.start.row) {
                                        p.addFold(g), d = !0;
                                        break
                                    }
                                    if (h == p.end.row) {
                                        p.addFold(g), d = !0;
                                        if (!g.sameRow) {
                                            var q = c[o + 1];
                                            if (q && q.start.row == j) {
                                                p.merge(q);
                                                break
                                            }
                                        }
                                        break
                                    }
                                    if (j <= p.start.row) break
                                }
                                return d || (p = this.$addFoldLine(new e(this.$foldData, g))), this.$useWrapMode ? this.$updateWrapData(p.start.row, p.start.row) : this.$updateRowLengthCache(p.start.row, p.start.row), this.$modified = !0, this._emit("changeFold", {
                                    data: g
                                }), g
                            }, this.addFolds = function (a) {
                                a.forEach(function (a) {
                                    this.addFold(a)
                                }, this)
                            }, this.removeFold = function (a) {
                                var b = a.foldLine,
                                    c = b.start.row,
                                    d = b.end.row,
                                    e = this.$foldData,
                                    f = b.folds;
                                if (f.length == 1) e.splice(e.indexOf(b), 1);
                                else if (b.range.isEnd(a.end.row, a.end.column)) f.pop(), b.end.row = f[f.length - 1].end.row, b.end.column = f[f.length - 1].end.column;
                                else if (b.range.isStart(a.start.row, a.start.column)) f.shift(), b.start.row = f[0].start.row, b.start.column = f[0].start.column;
                                else if (a.sameRow) f.splice(f.indexOf(a), 1);
                                else {
                                    var g = b.split(a.start.row, a.start.column);
                                    f = g.folds, f.shift(), g.start.row = f[0].start.row, g.start.column = f[0].start.column
                                }
                                this.$useWrapMode ? this.$updateWrapData(c, d) : this.$updateRowLengthCache(c, d), this.$modified = !0, this._emit("changeFold", {
                                    data: a
                                })
                            }, this.removeFolds = function (a) {
                                var b = [];
                                for (var c = 0; c < a.length; c++) b.push(a[c]);
                                b.forEach(function (a) {
                                    this.removeFold(a)
                                }, this), this.$modified = !0
                            }, this.expandFold = function (a) {
                                this.removeFold(a), a.subFolds.forEach(function (a) {
                                    this.addFold(a)
                                }, this), a.subFolds = []
                            }, this.expandFolds = function (a) {
                                a.forEach(function (a) {
                                    this.expandFold(a)
                                }, this)
                            }, this.unfold = function (a, b) {
                                var c, e;
                                a == null ? c = new d(0, 0, this.getLength(), 0) : typeof a == "number" ? c = new d(a, 0, a, this.getLine(a).length) : "row" in a ? c = d.fromPoints(a, a) : c = a, e = this.getFoldsInRange(c);
                                if (b) this.removeFolds(e);
                                else while (e.length) this.expandFolds(e), e = this.getFoldsInRange(c)
                            }, this.isRowFolded = function (a, b) {
                                return !!this.getFoldLine(a, b)
                            }, this.getRowFoldEnd = function (a, b) {
                                var c = this.getFoldLine(a, b);
                                return c ? c.end.row : a
                            }, this.getFoldDisplayLine = function (a, b, c, d, e) {
                                d == null && (d = a.start.row, e = 0), b == null && (b = a.end.row, c = this.getLine(b).length);
                                var f = this.doc,
                                    g = "";
                                return a.walk(function (a, b, c, h) {
                                    if (b < d) return;
                                    if (b == d) {
                                        if (c < e) return;
                                        h = Math.max(e, h)
                                    }
                                    a ? g += a : g += f.getLine(b).substring(h, c)
                                }.bind(this), b, c), g
                            }, this.getDisplayLine = function (a, b, c, d) {
                                var e = this.getFoldLine(a);
                                if (!e) {
                                    var f;
                                    return f = this.doc.getLine(a), f.substring(d || 0, b || f.length)
                                }
                                return this.getFoldDisplayLine(e, a, b, c, d)
                            }, this.$cloneFoldData = function () {
                                var a = [];
                                return a = this.$foldData.map(function (b) {
                                    var c = b.folds.map(function (a) {
                                        return a.clone()
                                    });
                                    return new e(a, c)
                                }), a
                            }, this.toggleFold = function (a) {
                                var b = this.selection,
                                    c = b.getRange(),
                                    d, e;
                                if (c.isEmpty()) {
                                    var f = c.start;
                                    d = this.getFoldAt(f.row, f.column);
                                    if (d) {
                                        this.expandFold(d);
                                        return
                                    }(e = this.findMatchingBracket(f)) ? c.comparePoint(e) == 1 ? c.end = e : (c.start = e, c.start.column++, c.end.column--) : (e = this.findMatchingBracket({
                                        row: f.row,
                                        column: f.column + 1
                                    })) ? (c.comparePoint(e) == 1 ? c.end = e : c.start = e, c.start.column++) : c = this.getCommentFoldRange(f.row, f.column) || c
                                } else {
                                    var g = this.getFoldsInRange(c);
                                    if (a && g.length) {
                                        this.expandFolds(g);
                                        return
                                    }
                                    g.length == 1 && (d = g[0])
                                }
                                d || (d = this.getFoldAt(c.start.row, c.start.column));
                                if (d && d.range.toString() == c.toString()) {
                                    this.expandFold(d);
                                    return
                                }
                                var h = "...";
                                if (!c.isMultiLine()) {
                                    h = this.getTextRange(c);
                                    if (h.length < 4) return;
                                    h = h.trim().substring(0, 2) + ".."
                                }
                                this.addFold(h, c)
                            }, this.getCommentFoldRange = function (a, b) {
                                var c = new g(this, a, b),
                                    e = c.getCurrentToken();
                                if (e && /^comment|string/.test(e.type)) {
                                    var f = new d,
                                        h = new RegExp(e.type.replace(/\..*/, "\\."));
                                    do e = c.stepBackward();
                                    while (e && h.test(e.type));
                                    c.stepForward(), f.start.row = c.getCurrentTokenRow(), f.start.column = c.getCurrentTokenColumn() + 2, c = new g(this, a, b);
                                    do e = c.stepForward();
                                    while (e && h.test(e.type));
                                    return e = c.stepBackward(), f.end.row = c.getCurrentTokenRow(), f.end.column = c.getCurrentTokenColumn() + e.value.length, f
                                }
                            }, this.foldAll = function (a, b) {
                                var c = this.foldWidgets;
                                b = b || this.getLength();
                                for (var d = a || 0; d < b; d++) {
                                    c[d] == null && (c[d] = this.getFoldWidget(d));
                                    if (c[d] != "start") continue;
                                    var e = this.getFoldWidgetRange(d);
                                    if (e && e.end.row < b) try {
                                        this.addFold("...", e)
                                    } catch (f) {}
                                }
                            }, this.$foldStyles = {
                                manual: 1,
                                markbegin: 1,
                                markbeginend: 1
                            }, this.$foldStyle = "markbegin", this.setFoldStyle = function (a) {
                                if (!this.$foldStyles[a]) throw new Error("invalid fold style: " + a + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
                                if (this.$foldStyle == a) return;
                                this.$foldStyle = a, a == "manual" && this.unfold();
                                var b = this.$foldMode;
                                this.$setFolding(null), this.$setFolding(b)
                            }, this.$setFolding = function (a) {
                                if (this.$foldMode == a) return;
                                this.$foldMode = a, this.removeListener("change", this.$updateFoldWidgets), this._emit("changeAnnotation");
                                if (!a || this.$foldStyle == "manual") {
                                    this.foldWidgets = null;
                                    return
                                }
                                this.foldWidgets = [], this.getFoldWidget = a.getFoldWidget.bind(a, this, this.$foldStyle), this.getFoldWidgetRange = a.getFoldWidgetRange.bind(a, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets)
                            }, this.onFoldWidgetClick = function (a, b) {
                                var c = this.getFoldWidget(a),
                                    d = this.getLine(a),
                                    e = b.shiftKey,
                                    f = e || b.ctrlKey || b.altKey || b.metaKey,
                                    g;
                                c == "end" ? g = this.getFoldAt(a, 0, -1) : g = this.getFoldAt(a, d.length, 1);
                                if (g) {
                                    f ? this.removeFold(g) : this.expandFold(g);
                                    return
                                }
                                var h = this.getFoldWidgetRange(a);
                                if (h) {
                                    if (!h.isMultiLine()) {
                                        g = this.getFoldAt(h.start.row, h.start.column, 1);
                                        if (g && h.isEqual(g.range)) {
                                            this.removeFold(g);
                                            return
                                        }
                                    }
                                    e || this.addFold("...", h), f && this.foldAll(h.start.row + 1, h.end.row)
                                } else f && this.foldAll(a + 1, this.getLength()), (b.target || b.srcElement).className += " invalid"
                            }, this.updateFoldWidgets = function (a) {
                                var b = a.data,
                                    c = b.range,
                                    d = c.start.row,
                                    e = c.end.row - d;
                                if (e === 0) this.foldWidgets[d] = null;
                                else if (b.action == "removeText" || b.action == "removeLines") this.foldWidgets.splice(d, e + 1, null);
                                else {
                                    var f = Array(e + 1);
                                    f.unshift(d, 1), this.foldWidgets.splice.apply(this.foldWidgets, f)
                                }
                            }
                        }
                        var d = a("../range").Range,
                            e = a("./fold_line").FoldLine,
                            f = a("./fold").Fold,
                            g = a("../token_iterator").TokenIterator;
                        b.Folding = h
                    }), ace.define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function (a, b, c) {
                        function e(a, b) {
                            this.foldData = a, Array.isArray(b) ? this.folds = b : b = this.folds = [b];
                            var c = b[b.length - 1];
                            this.range = new d(b[0].start.row, b[0].start.column, c.end.row, c.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function (a) {
                                a.setFoldLine(this)
                            }, this)
                        }
                        var d = a("../range").Range;
                        (function () {
                            this.shiftRow = function (a) {
                                this.start.row += a, this.end.row += a, this.folds.forEach(function (b) {
                                    b.start.row += a, b.end.row += a
                                })
                            }, this.addFold = function (a) {
                                if (a.sameRow) {
                                    if (a.start.row < this.startRow || a.endRow > this.endRow) throw "Can't add a fold to this FoldLine as it has no connection";
                                    this.folds.push(a), this.folds.sort(function (a, b) {
                                        return -a.range.compareEnd(b.start.row, b.start.column)
                                    }), this.range.compareEnd(a.start.row, a.start.column) > 0 ? (this.end.row = a.end.row, this.end.column = a.end.column) : this.range.compareStart(a.end.row, a.end.column) < 0 && (this.start.row = a.start.row, this.start.column = a.start.column)
                                } else if (a.start.row == this.end.row) this.folds.push(a), this.end.row = a.end.row, this.end.column = a.end.column;
                                else {
                                    if (a.end.row != this.start.row) throw "Trying to add fold to FoldRow that doesn't have a matching row";
                                    this.folds.unshift(a), this.start.row = a.start.row, this.start.column = a.start.column
                                }
                                a.foldLine = this
                            }, this.containsRow = function (a) {
                                return a >= this.start.row && a <= this.end.row
                            }, this.walk = function (a, b, c) {
                                var d = 0,
                                    e = this.folds,
                                    f, g, h, i = !0;
                                b == null && (b = this.end.row, c = this.end.column);
                                for (var j = 0; j < e.length; j++) {
                                    f = e[j], g = f.range.compareStart(b, c);
                                    if (g == -1) {
                                        a(null, b, c, d, i);
                                        return
                                    }
                                    h = a(null, f.start.row, f.start.column, d, i), h = !h && a(f.placeholder, f.start.row, f.start.column, d);
                                    if (h || g == 0) return;
                                    i = !f.sameRow, d = f.end.column
                                }
                                a(null, b, c, d, i)
                            }, this.getNextFoldTo = function (a, b) {
                                var c, d;
                                for (var e = 0; e < this.folds.length; e++) {
                                    c = this.folds[e], d = c.range.compareEnd(a, b);
                                    if (d == -1) return {
                                        fold: c,
                                        kind: "after"
                                    };
                                    if (d == 0) return {
                                        fold: c,
                                        kind: "inside"
                                    }
                                }
                                return null
                            }, this.addRemoveChars = function (a, b, c) {
                                var d = this.getNextFoldTo(a, b),
                                    e, f;
                                if (d) {
                                    e = d.fold;
                                    if (d.kind == "inside" && e.start.column != b && e.start.row != a) window.console && window.console.log(a, b, e);
                                    else if (e.start.row == a) {
                                        f = this.folds;
                                        var g = f.indexOf(e);
                                        g == 0 && (this.start.column += c);
                                        for (g; g < f.length; g++) {
                                            e = f[g], e.start.column += c;
                                            if (!e.sameRow) return;
                                            e.end.column += c
                                        }
                                        this.end.column += c
                                    }
                                }
                            }, this.split = function (a, b) {
                                var c = this.getNextFoldTo(a, b).fold,
                                    d = this.folds,
                                    f = this.foldData;
                                if (!c) return null;
                                var g = d.indexOf(c),
                                    h = d[g - 1];
                                this.end.row = h.end.row, this.end.column = h.end.column, d = d.splice(g, d.length - g);
                                var i = new e(f, d);
                                return f.splice(f.indexOf(this) + 1, 0, i), i
                            }, this.merge = function (a) {
                                var b = a.folds;
                                for (var c = 0; c < b.length; c++) this.addFold(b[c]);
                                var d = this.foldData;
                                d.splice(d.indexOf(a), 1)
                            }, this.toString = function () {
                                var a = [this.range.toString() + ": ["];
                                return this.folds.forEach(function (b) {
                                    a.push("  " + b.toString())
                                }), a.push("]"), a.join("\n")
                            }, this.idxToPosition = function (a) {
                                var b = 0,
                                    c;
                                for (var d = 0; d < this.folds.length; d++) {
                                    var c = this.folds[d];
                                    a -= c.start.column - b;
                                    if (a < 0) return {
                                        row: c.start.row,
                                        column: c.start.column + a
                                    };
                                    a -= c.placeholder.length;
                                    if (a < 0) return c.start;
                                    b = c.end.column
                                }
                                return {
                                    row: this.end.row,
                                    column: this.end.column + a
                                }
                            }
                        }).call(e.prototype), b.FoldLine = e
                    }), ace.define("ace/edit_session/fold", ["require", "exports", "module"], function (a, b, c) {
                        var d = b.Fold = function (a, b) {
                                this.foldLine = null, this.placeholder = b, this.range = a, this.start = a.start, this.end = a.end, this.sameRow = a.start.row == a.end.row, this.subFolds = []
                            };
                        (function () {
                            this.toString = function () {
                                return '"' + this.placeholder + '" ' + this.range.toString()
                            }, this.setFoldLine = function (a) {
                                this.foldLine = a, this.subFolds.forEach(function (b) {
                                    b.setFoldLine(a)
                                })
                            }, this.clone = function () {
                                var a = this.range.clone(),
                                    b = new d(a, this.placeholder);
                                return this.subFolds.forEach(function (a) {
                                    b.subFolds.push(a.clone())
                                }), b
                            }, this.addSubFold = function (a) {
                                if (this.range.isEqual(a)) return this;
                                if (!this.range.containsRange(a)) throw "A fold can't intersect already existing fold" + a.range + this.range;
                                var b = a.range.start.row,
                                    c = a.range.start.column;
                                for (var d = 0, e = -1; d < this.subFolds.length; d++) {
                                    e = this.subFolds[d].range.compare(b, c);
                                    if (e != 1) break
                                }
                                var f = this.subFolds[d];
                                if (e == 0) return f.addSubFold(a);
                                var b = a.range.end.row,
                                    c = a.range.end.column;
                                for (var g = d, e = -1; g < this.subFolds.length; g++) {
                                    e = this.subFolds[g].range.compare(b, c);
                                    if (e != 1) break
                                }
                                var h = this.subFolds[g];
                                if (e == 0) throw "A fold can't intersect already existing fold" + a.range + this.range;
                                var i = this.subFolds.splice(d, g - d, a);
                                return a.setFoldLine(this.foldLine), a
                            }
                        }).call(d.prototype)
                    }), ace.define("ace/token_iterator", ["require", "exports", "module"], function (a, b, c) {
                        var d = function (a, b, c) {
                                this.$session = a, this.$row = b, this.$rowTokens = a.getTokens(b);
                                var d = a.getTokenAt(b, c);
                                this.$tokenIndex = d ? d.index : -1
                            };
                        (function () {
                            this.stepBackward = function () {
                                this.$tokenIndex -= 1;
                                while (this.$tokenIndex < 0) {
                                    this.$row -= 1;
                                    if (this.$row < 0) return this.$row = 0, null;
                                    this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1
                                }
                                return this.$rowTokens[this.$tokenIndex]
                            }, this.stepForward = function () {
                                var a = this.$session.getLength();
                                this.$tokenIndex += 1;
                                while (this.$tokenIndex >= this.$rowTokens.length) {
                                    this.$row += 1;
                                    if (this.$row >= a) return this.$row = a - 1, null;
                                    this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0
                                }
                                return this.$rowTokens[this.$tokenIndex]
                            }, this.getCurrentToken = function () {
                                return this.$rowTokens[this.$tokenIndex]
                            }, this.getCurrentTokenRow = function () {
                                return this.$row
                            }, this.getCurrentTokenColumn = function () {
                                var a = this.$rowTokens,
                                    b = this.$tokenIndex,
                                    c = a[b].start;
                                if (c !== undefined) return c;
                                c = 0;
                                while (b > 0) b -= 1, c += a[b].value.length;
                                return c
                            }
                        }).call(d.prototype), b.TokenIterator = d
                    }), ace.define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function (a, b, c) {
                        function f() {
                            this.findMatchingBracket = function (a) {
                                if (a.column == 0) return null;
                                var b = this.getLine(a.row).charAt(a.column - 1);
                                if (b == "") return null;
                                var c = b.match(/([\(\[\{])|([\)\]\}])/);
                                return c ? c[1] ? this.$findClosingBracket(c[1], a) : this.$findOpeningBracket(c[2], a) : null
                            }, this.getBracketRange = function (a) {
                                var b = this.getLine(a.row),
                                    c = !0,
                                    d, f = b.charAt(a.column - 1),
                                    g = f && f.match(/([\(\[\{])|([\)\]\}])/);
                                g || (f = b.charAt(a.column), a = {
                                    row: a.row,
                                    column: a.column + 1
                                }, g = f && f.match(/([\(\[\{])|([\)\]\}])/), c = !1);
                                if (!g) return null;
                                if (g[1]) {
                                    var h = this.$findClosingBracket(g[1], a);
                                    if (!h) return null;
                                    d = e.fromPoints(a, h), c || (d.end.column++, d.start.column--), d.cursor = d.end
                                } else {
                                    var h = this.$findOpeningBracket(g[2], a);
                                    if (!h) return null;
                                    d = e.fromPoints(h, a), c || (d.start.column++, d.end.column--), d.cursor = d.start
                                }
                                return d
                            }, this.$brackets = {
                                ")": "(",
                                "(": ")",
                                "]": "[",
                                "[": "]",
                                "{": "}",
                                "}": "{"
                            }, this.$findOpeningBracket = function (a, b, c) {
                                var e = this.$brackets[a],
                                    f = 1,
                                    g = new d(this, b.row, b.column),
                                    h = g.getCurrentToken();
                                h || (h = g.stepForward());
                                if (!h) return;
                                c || (c = new RegExp("(\\.?" + h.type.replace(".", "\\.").replace("rparen", ".paren") + ")+"));
                                var i = b.column - g.getCurrentTokenColumn() - 2,
                                    j = h.value;
                                for (;;) {
                                    while (i >= 0) {
                                        var k = j.charAt(i);
                                        if (k == e) {
                                            f -= 1;
                                            if (f == 0) return {
                                                row: g.getCurrentTokenRow(),
                                                column: i + g.getCurrentTokenColumn()
                                            }
                                        } else k == a && (f += 1);
                                        i -= 1
                                    }
                                    do h = g.stepBackward();
                                    while (h && !c.test(h.type));
                                    if (h == null) break;
                                    j = h.value, i = j.length - 1
                                }
                                return null
                            }, this.$findClosingBracket = function (a, b, c) {
                                var e = this.$brackets[a],
                                    f = 1,
                                    g = new d(this, b.row, b.column),
                                    h = g.getCurrentToken();
                                h || (h = g.stepForward());
                                if (!h) return;
                                c || (c = new RegExp("(\\.?" + h.type.replace(".", "\\.").replace("lparen", ".paren") + ")+"));
                                var i = b.column - g.getCurrentTokenColumn();
                                for (;;) {
                                    var j = h.value,
                                        k = j.length;
                                    while (i < k) {
                                        var l = j.charAt(i);
                                        if (l == e) {
                                            f -= 1;
                                            if (f == 0) return {
                                                row: g.getCurrentTokenRow(),
                                                column: i + g.getCurrentTokenColumn()
                                            }
                                        } else l == a && (f += 1);
                                        i += 1
                                    }
                                    do h = g.stepForward();
                                    while (h && !c.test(h.type));
                                    if (h == null) break;
                                    i = 0
                                }
                                return null
                            }
                        }
                        var d = a("../token_iterator").TokenIterator,
                            e = a("../range").Range;
                        b.BracketMatch = f
                    }), ace.define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function (a, b, c) {
                        var d = a("./lib/lang"),
                            e = a("./lib/oop"),
                            f = a("./range").Range,
                            g = function () {
                                this.$options = {}
                            };
                        (function () {
                            this.set = function (a) {
                                return e.mixin(this.$options, a), this
                            }, this.getOptions = function () {
                                return d.copyObject(this.$options)
                            }, this.setOptions = function (a) {
                                this.$options = a
                            }, this.find = function (a) {
                                var b = this.$matchIterator(a, this.$options);
                                if (!b) return !1;
                                var c = null;
                                return b.forEach(function (a, b, d) {
                                    if (!a.start) {
                                        var e = a.offset + (d || 0);
                                        c = new f(b, e, b, e + a.length)
                                    } else c = a;
                                    return !0
                                }), c
                            }, this.findAll = function (a) {
                                var b = this.$options;
                                if (!b.needle) return [];
                                this.$assembleRegExp(b);
                                var c = b.range,
                                    e = c ? a.getLines(c.start.row, c.end.row) : a.doc.getAllLines(),
                                    g = [],
                                    h = b.re;
                                if (b.$isMultiLine) {
                                    var i = h.length,
                                        j = e.length - i;
                                    for (var k = h.offset || 0; k <= j; k++) {
                                        for (var l = 0; l < i; l++) if (e[k + l].search(h[l]) == -1) break;
                                        var m = e[k],
                                            n = e[k + i - 1],
                                            o = m.match(h[0])[0].length,
                                            p = n.match(h[i - 1])[0].length;
                                        g.push(new f(k, m.length - o, k + i - 1, p))
                                    }
                                } else for (var q = 0; q < e.length; q++) {
                                    var r = d.getMatchOffsets(e[q], h);
                                    for (var l = 0; l < r.length; l++) {
                                        var s = r[l];
                                        g.push(new f(q, s.offset, q, s.offset + s.length))
                                    }
                                }
                                if (c) {
                                    var t = c.start.column,
                                        u = c.start.column,
                                        q = 0,
                                        l = g.length - 1;
                                    while (q < l && g[q].start.column < t && g[q].start.row == c.start.row) q++;
                                    while (q < l && g[l].end.column > u && g[l].end.row == c.end.row) l--;
                                    return g.slice(q, l + 1)
                                }
                                return g
                            }, this.replace = function (a, b) {
                                var c = this.$options,
                                    d = this.$assembleRegExp(c);
                                if (c.$isMultiLine) return b;
                                if (!d) return;
                                var e = d.exec(a);
                                if (!e || e[0].length != a.length) return null;
                                b = a.replace(d, b);
                                if (c.preserveCase) {
                                    b = b.split("");
                                    for (var f = Math.min(a.length, a.length); f--;) {
                                        var g = a[f];
                                        g && g.toLowerCase() != g ? b[f] = b[f].toUpperCase() : b[f] = b[f].toLowerCase()
                                    }
                                    b = b.join("")
                                }
                                return b
                            }, this.$matchIterator = function (a, b) {
                                var c = this.$assembleRegExp(b);
                                if (!c) return !1;
                                var e = this,
                                    g, h = b.backwards;
                                if (b.$isMultiLine) var i = c.length,
                                    j = function (b, d, e) {
                                        var h = b.search(c[0]);
                                        if (h == -1) return;
                                        for (var j = 1; j < i; j++) {
                                            b = a.getLine(d + j);
                                            if (b.search(c[j]) == -1) return
                                        }
                                        var k = b.match(c[i - 1])[0].length,
                                            l = new f(d, h, d + i - 1, k);
                                        c.offset == 1 ? (l.start.row--, l.start.column = Number.MAX_VALUE) : e && (l.start.column += e);
                                        if (g(l)) return !0
                                    };
                                else if (h) var j = function (a, b, e) {
                                        var f = d.getMatchOffsets(a, c);
                                        for (var h = f.length - 1; h >= 0; h--) if (g(f[h], b, e)) return !0
                                    };
                                else var j = function (a, b, e) {
                                        var f = d.getMatchOffsets(a, c);
                                        for (var h = 0; h < f.length; h++) if (g(f[h], b, e)) return !0
                                    };
                                return {
                                    forEach: function (c) {
                                        g = c, e.$lineIterator(a, b).forEach(j)
                                    }
                                }
                            }, this.$assembleRegExp = function (a) {
                                if (a.needle instanceof RegExp) return a.re = a.needle;
                                var b = a.needle;
                                if (!a.needle) return a.re = !1;
                                a.regExp || (b = d.escapeRegExp(b)), a.wholeWord && (b = "\\b" + b + "\\b");
                                var c = a.caseSensitive ? "g" : "gi";
                                a.$isMultiLine = /[\n\r]/.test(b);
                                if (a.$isMultiLine) return a.re = this.$assembleMultilineRegExp(b, c);
                                try {
                                    var e = new RegExp(b, c)
                                } catch (f) {
                                    e = !1
                                }
                                return a.re = e
                            }, this.$assembleMultilineRegExp = function (a, b) {
                                var c = a.replace(/\r\n|\r|\n/g, "$\n^").split("\n"),
                                    d = [];
                                for (var e = 0; e < c.length; e++) try {
                                    d.push(new RegExp(c[e], b))
                                } catch (f) {
                                    return !1
                                }
                                return c[0] == "" ? (d.shift(), d.offset = 1) : d.offset = 0, d
                            }, this.$lineIterator = function (a, b) {
                                var c = b.backwards == 1,
                                    d = b.skipCurrent != 0,
                                    e = b.range,
                                    f = b.start;
                                f || (f = e ? e[c ? "end" : "start"] : a.selection.getRange()), f.start && (f = f[d != c ? "end" : "start"]);
                                var g = e ? e.start.row : 0,
                                    h = e ? e.end.row : a.getLength() - 1,
                                    i = c ?
                                function (c) {
                                    var d = f.row,
                                        e = a.getLine(d).substring(0, f.column);
                                    if (c(e, d)) return;
                                    for (d--; d >= g; d--) if (c(a.getLine(d), d)) return;
                                    if (b.wrap == 0) return;
                                    for (d = h, g = f.row; d >= g; d--) if (c(a.getLine(d), d)) return
                                } : function (c) {
                                    var d = f.row,
                                        e = a.getLine(d).substr(f.column);
                                    if (c(e, d, f.column)) return;
                                    for (d += 1; d <= h; d++) if (c(a.getLine(d), d)) return;
                                    if (b.wrap == 0) return;
                                    for (d = g, h = f.row; d <= h; d++) if (c(a.getLine(d), d)) return
                                };
                                return {
                                    forEach: i
                                }
                            }
                        }).call(g.prototype), b.Search = g
                    }), ace.define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], function (a, b, c) {
                        var d = a("../lib/oop"),
                            e = a("../keyboard/hash_handler").HashHandler,
                            f = a("../lib/event_emitter").EventEmitter,
                            g = function (a, b) {
                                this.platform = a, this.commands = {}, this.commmandKeyBinding = {}, this.addCommands(b), this.setDefaultHandler("exec", function (a) {
                                    return a.command.exec(a.editor, a.args || {})
                                })
                            };
                        d.inherits(g, e), function () {
                            d.implement(this, f), this.exec = function (a, b, c) {
                                typeof a == "string" && (a = this.commands[a]);
                                if (!a) return !1;
                                if (b && b.$readOnly && !a.readOnly) return !1;
                                var d = this._emit("exec", {
                                    editor: b,
                                    command: a,
                                    args: c
                                });
                                return d === !1 ? !1 : !0
                            }, this.toggleRecording = function (a) {
                                if (this.$inReplay) return;
                                return a && a._emit("changeStatus"), this.recording ? (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = !1) : (this.$addCommandToMacro || (this.$addCommandToMacro = function (a) {
                                    this.macro.push([a.command, a.args])
                                }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = !0)
                            }, this.replay = function (a) {
                                if (this.$inReplay || !this.macro) return;
                                if (this.recording) return this.toggleRecording(a);
                                try {
                                    this.$inReplay = !0, this.macro.forEach(function (b) {
                                        typeof b == "string" ? this.exec(b, a) : this.exec(b[0], a, b[1])
                                    }, this)
                                } finally {
                                    this.$inReplay = !1
                                }
                            }, this.trimMacro = function (a) {
                                return a.map(function (a) {
                                    return typeof a[0] != "string" && (a[0] = a[0].name), a[1] || (a = a[0]), a
                                })
                            }
                        }.call(g.prototype), b.CommandManager = g
                    }), ace.define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys"], function (a, b, c) {
                        function e(a, b) {
                            this.platform = b, this.commands = {}, this.commmandKeyBinding = {}, this.addCommands(a)
                        }
                        var d = a("../lib/keys");
                        (function () {
                            this.addCommand = function (a) {
                                this.commands[a.name] && this.removeCommand(a), this.commands[a.name] = a, a.bindKey && this._buildKeyHash(a)
                            }, this.removeCommand = function (a) {
                                var b = typeof a == "string" ? a : a.name;
                                a = this.commands[b], delete this.commands[b];
                                var c = this.commmandKeyBinding;
                                for (var d in c) for (var e in c[d]) c[d][e] == a && delete c[d][e]
                            }, this.bindKey = function (a, b) {
                                if (!a) return;
                                if (typeof b == "function") {
                                    this.addCommand({
                                        exec: b,
                                        bindKey: a,
                                        name: a
                                    });
                                    return
                                }
                                var c = this.commmandKeyBinding;
                                a.split("|").forEach(function (a) {
                                    var d = this.parseKeys(a, b),
                                        e = d.hashId;
                                    (c[e] || (c[e] = {}))[d.key] = b
                                }, this)
                            }, this.addCommands = function (a) {
                                a && Object.keys(a).forEach(function (b) {
                                    var c = a[b];
                                    if (typeof c == "string") return this.bindKey(c, b);
                                    typeof c == "function" && (c = {
                                        exec: c
                                    }), c.name || (c.name = b), this.addCommand(c)
                                }, this)
                            }, this.removeCommands = function (a) {
                                Object.keys(a).forEach(function (b) {
                                    this.removeCommand(a[b])
                                }, this)
                            }, this.bindKeys = function (a) {
                                Object.keys(a).forEach(function (b) {
                                    this.bindKey(b, a[b])
                                }, this)
                            }, this._buildKeyHash = function (a) {
                                var b = a.bindKey;
                                if (!b) return;
                                var c = typeof b == "string" ? b : b[this.platform];
                                this.bindKey(c, a)
                            }, this.parseKeys = function (a) {
                                var b, c = 0,
                                    e = a.toLowerCase().trim().split(/\s*\-\s*/);
                                for (var f = 0, g = e.length; f < g; f++) d.KEY_MODS[e[f]] ? c |= d.KEY_MODS[e[f]] : b = e[f] || "-";
                                return e[0] == "text" && e.length == 2 && (c = -1, b = e[1]), {
                                    key: b,
                                    hashId: c
                                }
                            }, this.findKeyCommand = function (b, c) {
                                var d = this.commmandKeyBinding;
                                return d[b] && d[b][c.toLowerCase()]
                            }, this.handleKeyboard = function (a, b, c, d) {
                                return {
                                    command: this.findKeyCommand(b, c)
                                }
                            }
                        }).call(e.prototype), b.HashHandler = e
                    }), ace.define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang"], function (a, b, c) {
                        function e(a, b) {
                            return {
                                win: a,
                                mac: b
                            }
                        }
                        var d = a("../lib/lang");
                        b.commands = [{
                            name: "selectall",
                            bindKey: e("Ctrl-A", "Command-A"),
                            exec: function (a) {
                                a.selectAll()
                            },
                            readOnly: !0
                        }, {
                            name: "centerselection",
                            bindKey: e(null, "Ctrl-L"),
                            exec: function (a) {
                                a.centerSelection()
                            },
                            readOnly: !0
                        }, {
                            name: "gotoline",
                            bindKey: e("Ctrl-L", "Command-L"),
                            exec: function (a) {
                                var b = parseInt(prompt("Enter line number:"), 10);
                                isNaN(b) || a.gotoLine(b)
                            },
                            readOnly: !0
                        }, {
                            name: "fold",
                            bindKey: e("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
                            exec: function (a) {
                                a.session.toggleFold(!1)
                            },
                            readOnly: !0
                        }, {
                            name: "unfold",
                            bindKey: e("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
                            exec: function (a) {
                                a.session.toggleFold(!0)
                            },
                            readOnly: !0
                        }, {
                            name: "foldall",
                            bindKey: e("Alt-0", "Command-Option-0"),
                            exec: function (a) {
                                a.session.foldAll()
                            },
                            readOnly: !0
                        }, {
                            name: "unfoldall",
                            bindKey: e("Alt-Shift-0", "Command-Option-Shift-0"),
                            exec: function (a) {
                                a.session.unfold()
                            },
                            readOnly: !0
                        }, {
                            name: "findnext",
                            bindKey: e("Ctrl-K", "Command-G"),
                            exec: function (a) {
                                a.findNext()
                            },
                            readOnly: !0
                        }, {
                            name: "findprevious",
                            bindKey: e("Ctrl-Shift-K", "Command-Shift-G"),
                            exec: function (a) {
                                a.findPrevious()
                            },
                            readOnly: !0
                        }, {
                            name: "find",
                            bindKey: e("Ctrl-F", "Command-F"),
                            exec: function (a) {
                                var b = prompt("Find:", a.getCopyText());
                                a.find(b)
                            },
                            readOnly: !0
                        }, {
                            name: "overwrite",
                            bindKey: "Insert",
                            exec: function (a) {
                                a.toggleOverwrite()
                            },
                            readOnly: !0
                        }, {
                            name: "selecttostart",
                            bindKey: e("Ctrl-Shift-Home", "Command-Shift-Up"),
                            exec: function (a) {
                                a.getSelection().selectFileStart()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "gotostart",
                            bindKey: e("Ctrl-Home", "Command-Home|Command-Up"),
                            exec: function (a) {
                                a.navigateFileStart()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selectup",
                            bindKey: e("Shift-Up", "Shift-Up"),
                            exec: function (a) {
                                a.getSelection().selectUp()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "golineup",
                            bindKey: e("Up", "Up|Ctrl-P"),
                            exec: function (a, b) {
                                a.navigateUp(b.times)
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selecttoend",
                            bindKey: e("Ctrl-Shift-End", "Command-Shift-Down"),
                            exec: function (a) {
                                a.getSelection().selectFileEnd()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "gotoend",
                            bindKey: e("Ctrl-End", "Command-End|Command-Down"),
                            exec: function (a) {
                                a.navigateFileEnd()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selectdown",
                            bindKey: e("Shift-Down", "Shift-Down"),
                            exec: function (a) {
                                a.getSelection().selectDown()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "golinedown",
                            bindKey: e("Down", "Down|Ctrl-N"),
                            exec: function (a, b) {
                                a.navigateDown(b.times)
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selectwordleft",
                            bindKey: e("Ctrl-Shift-Left", "Option-Shift-Left"),
                            exec: function (a) {
                                a.getSelection().selectWordLeft()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "gotowordleft",
                            bindKey: e("Ctrl-Left", "Option-Left"),
                            exec: function (a) {
                                a.navigateWordLeft()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selecttolinestart",
                            bindKey: e("Alt-Shift-Left", "Command-Shift-Left"),
                            exec: function (a) {
                                a.getSelection().selectLineStart()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "gotolinestart",
                            bindKey: e("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
                            exec: function (a) {
                                a.navigateLineStart()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selectleft",
                            bindKey: e("Shift-Left", "Shift-Left"),
                            exec: function (a) {
                                a.getSelection().selectLeft()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "gotoleft",
                            bindKey: e("Left", "Left|Ctrl-B"),
                            exec: function (a, b) {
                                a.navigateLeft(b.times)
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selectwordright",
                            bindKey: e("Ctrl-Shift-Right", "Option-Shift-Right"),
                            exec: function (a) {
                                a.getSelection().selectWordRight()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "gotowordright",
                            bindKey: e("Ctrl-Right", "Option-Right"),
                            exec: function (a) {
                                a.navigateWordRight()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selecttolineend",
                            bindKey: e("Alt-Shift-Right", "Command-Shift-Right"),
                            exec: function (a) {
                                a.getSelection().selectLineEnd()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "gotolineend",
                            bindKey: e("Alt-Right|End", "Command-Right|End|Ctrl-E"),
                            exec: function (a) {
                                a.navigateLineEnd()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selectright",
                            bindKey: e("Shift-Right", "Shift-Right"),
                            exec: function (a) {
                                a.getSelection().selectRight()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "gotoright",
                            bindKey: e("Right", "Right|Ctrl-F"),
                            exec: function (a, b) {
                                a.navigateRight(b.times)
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selectpagedown",
                            bindKey: "Shift-PageDown",
                            exec: function (a) {
                                a.selectPageDown()
                            },
                            readOnly: !0
                        }, {
                            name: "pagedown",
                            bindKey: e(null, "Option-PageDown"),
                            exec: function (a) {
                                a.scrollPageDown()
                            },
                            readOnly: !0
                        }, {
                            name: "gotopagedown",
                            bindKey: e("PageDown", "PageDown|Ctrl-V"),
                            exec: function (a) {
                                a.gotoPageDown()
                            },
                            readOnly: !0
                        }, {
                            name: "selectpageup",
                            bindKey: "Shift-PageUp",
                            exec: function (a) {
                                a.selectPageUp()
                            },
                            readOnly: !0
                        }, {
                            name: "pageup",
                            bindKey: e(null, "Option-PageUp"),
                            exec: function (a) {
                                a.scrollPageUp()
                            },
                            readOnly: !0
                        }, {
                            name: "gotopageup",
                            bindKey: "PageUp",
                            exec: function (a) {
                                a.gotoPageUp()
                            },
                            readOnly: !0
                        }, {
                            name: "scrollup",
                            bindKey: e("Ctrl-Up", null),
                            exec: function (a) {
                                a.renderer.scrollBy(0, -2 * a.renderer.layerConfig.lineHeight)
                            },
                            readOnly: !0
                        }, {
                            name: "scrolldown",
                            bindKey: e("Ctrl-Down", null),
                            exec: function (a) {
                                a.renderer.scrollBy(0, 2 * a.renderer.layerConfig.lineHeight)
                            },
                            readOnly: !0
                        }, {
                            name: "selectlinestart",
                            bindKey: "Shift-Home",
                            exec: function (a) {
                                a.getSelection().selectLineStart()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selectlineend",
                            bindKey: "Shift-End",
                            exec: function (a) {
                                a.getSelection().selectLineEnd()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "togglerecording",
                            bindKey: e("Ctrl-Alt-E", "Command-Option-E"),
                            exec: function (a) {
                                a.commands.toggleRecording(a)
                            },
                            readOnly: !0
                        }, {
                            name: "replaymacro",
                            bindKey: e("Ctrl-Shift-E", "Command-Shift-E"),
                            exec: function (a) {
                                a.commands.replay(a)
                            },
                            readOnly: !0
                        }, {
                            name: "jumptomatching",
                            bindKey: e("Ctrl-P", "Ctrl-Shift-P"),
                            exec: function (a) {
                                a.jumpToMatching()
                            },
                            multiSelectAction: "forEach",
                            readOnly: !0
                        }, {
                            name: "selecttomatching",
                            bindKey: e("Ctrl-Shift-P", null),
                            exec: function (a) {
                                a.jumpToMatching(!0)
                            },
                            readOnly: !0
                        }, {
                            name: "cut",
                            exec: function (a) {
                                var b = a.getSelectionRange();
                                a._emit("cut", b), a.selection.isEmpty() || (a.session.remove(b), a.clearSelection())
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "removeline",
                            bindKey: e("Ctrl-D", "Command-D"),
                            exec: function (a) {
                                a.removeLines()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "duplicateSelection",
                            bindKey: e("Ctrl-Shift-D", "Command-Shift-D"),
                            exec: function (a) {
                                a.duplicateSelection()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "togglecomment",
                            bindKey: e("Ctrl-/", "Command-/"),
                            exec: function (a) {
                                a.toggleCommentLines()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "replace",
                            bindKey: e("Ctrl-R", "Command-Option-F"),
                            exec: function (a) {
                                var b = prompt("Find:", a.getCopyText());
                                if (!b) return;
                                var c = prompt("Replacement:");
                                if (!c) return;
                                a.replace(c, {
                                    needle: b
                                })
                            }
                        }, {
                            name: "replaceall",
                            bindKey: e("Ctrl-Shift-R", "Command-Shift-Option-F"),
                            exec: function (a) {
                                var b = prompt("Find:");
                                if (!b) return;
                                var c = prompt("Replacement:");
                                if (!c) return;
                                a.replaceAll(c, {
                                    needle: b
                                })
                            }
                        }, {
                            name: "undo",
                            bindKey: e("Ctrl-Z", "Command-Z"),
                            exec: function (a) {
                                a.undo()
                            }
                        }, {
                            name: "redo",
                            bindKey: e("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
                            exec: function (a) {
                                a.redo()
                            }
                        }, {
                            name: "copylinesup",
                            bindKey: e("Alt-Shift-Up", "Command-Option-Up"),
                            exec: function (a) {
                                a.copyLinesUp()
                            }
                        }, {
                            name: "movelinesup",
                            bindKey: e("Alt-Up", "Option-Up"),
                            exec: function (a) {
                                a.moveLinesUp()
                            }
                        }, {
                            name: "copylinesdown",
                            bindKey: e("Alt-Shift-Down", "Command-Option-Down"),
                            exec: function (a) {
                                a.copyLinesDown()
                            }
                        }, {
                            name: "movelinesdown",
                            bindKey: e("Alt-Down", "Option-Down"),
                            exec: function (a) {
                                a.moveLinesDown()
                            }
                        }, {
                            name: "del",
                            bindKey: e("Delete", "Delete|Ctrl-D"),
                            exec: function (a) {
                                a.remove("right")
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "backspace",
                            bindKey: e("Command-Backspace|Option-Backspace|Shift-Backspace|Backspace", "Ctrl-Backspace|Command-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
                            exec: function (a) {
                                a.remove("left")
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "removetolinestart",
                            bindKey: e("Alt-Backspace", "Command-Backspace"),
                            exec: function (a) {
                                a.removeToLineStart()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "removetolineend",
                            bindKey: e("Alt-Delete", "Ctrl-K"),
                            exec: function (a) {
                                a.removeToLineEnd()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "removewordleft",
                            bindKey: e("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
                            exec: function (a) {
                                a.removeWordLeft()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "removewordright",
                            bindKey: e("Ctrl-Delete", "Alt-Delete"),
                            exec: function (a) {
                                a.removeWordRight()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "outdent",
                            bindKey: e("Shift-Tab", "Shift-Tab"),
                            exec: function (a) {
                                a.blockOutdent()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "indent",
                            bindKey: e("Tab", "Tab"),
                            exec: function (a) {
                                a.indent()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "insertstring",
                            exec: function (a, b) {
                                a.insert(b)
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "inserttext",
                            exec: function (a, b) {
                                a.insert(d.stringRepeat(b.text || "", b.times || 1))
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "splitline",
                            bindKey: e(null, "Ctrl-O"),
                            exec: function (a) {
                                a.splitLine()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "transposeletters",
                            bindKey: e("Ctrl-T", "Ctrl-T"),
                            exec: function (a) {
                                a.transposeLetters()
                            },
                            multiSelectAction: function (a) {
                                a.transposeSelections(1)
                            }
                        }, {
                            name: "touppercase",
                            bindKey: e("Ctrl-U", "Ctrl-U"),
                            exec: function (a) {
                                a.toUpperCase()
                            },
                            multiSelectAction: "forEach"
                        }, {
                            name: "tolowercase",
                            bindKey: e("Ctrl-Shift-U", "Ctrl-Shift-U"),
                            exec: function (a) {
                                a.toLowerCase()
                            },
                            multiSelectAction: "forEach"
                        }]
                    }), ace.define("ace/undomanager", ["require", "exports", "module"], function (a, b, c) {
                        var d = function () {
                                this.reset()
                            };
                        (function () {
                            this.execute = function (a) {
                                var b = a.args[0];
                                this.$doc = a.args[1], this.$undoStack.push(b), this.$redoStack = []
                            }, this.undo = function (a) {
                                var b = this.$undoStack.pop(),
                                    c = null;
                                return b && (c = this.$doc.undoChanges(b, a), this.$redoStack.push(b)), c
                            }, this.redo = function (a) {
                                var b = this.$redoStack.pop(),
                                    c = null;
                                return b && (c = this.$doc.redoChanges(b, a), this.$undoStack.push(b)), c
                            }, this.reset = function () {
                                this.$undoStack = [], this.$redoStack = []
                            }, this.hasUndo = function () {
                                return this.$undoStack.length > 0
                            }, this.hasRedo = function () {
                                return this.$redoStack.length > 0
                            }
                        }).call(d.prototype), b.UndoManager = d
                    }), ace.define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent", "ace/config", "ace/lib/net", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/renderloop", "ace/lib/event_emitter", "ace/requirejs/text!ace/css/editor.css"], function (a, b, c) {
                        var d = a("./lib/oop"),
                            e = a("./lib/dom"),
                            f = a("./lib/event"),
                            g = a("./lib/useragent"),
                            h = a("./config"),
                            i = a("./lib/net"),
                            j = a("./layer/gutter").Gutter,
                            k = a("./layer/marker").Marker,
                            l = a("./layer/text").Text,
                            m = a("./layer/cursor").Cursor,
                            n = a("./scrollbar").ScrollBar,
                            o = a("./renderloop").RenderLoop,
                            p = a("./lib/event_emitter").EventEmitter,
                            q = a("ace/requirejs/text!./css/editor.css");
                        e.importCssString(q, "ace_editor");
                        var r = function (a, b) {
                                var c = this;
                                this.container = a, this.$keepTextAreaAtCursor = !g.isIE, e.addCssClass(a, "ace_editor"), this.setTheme(b), this.$gutter = e.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.scroller = e.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = e.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.setHighlightGutterLine(!0), this.$gutterLayer = new j(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onResize.bind(this, !0)), this.$markerBack = new k(this.content);
                                var d = this.$textLayer = new l(this.content);
                                this.canvas = d.element, this.$markerFront = new k(this.content), this.characterWidth = d.getCharacterWidth(), this.lineHeight = d.getLineHeight(), this.$cursorLayer = new m(this.content), this.$cursorPadding = 8, this.$horizScroll = !1, this.$horizScrollAlwaysVisible = !1, this.$animatedScroll = !1, this.scrollBar = new n(a), this.scrollBar.addEventListener("scroll", function (a) {
                                    c.$inScrollAnimation || c.session.setScrollTop(a.data)
                                }), this.scrollTop = 0, this.scrollLeft = 0, f.addListener(this.scroller, "scroll", function () {
                                    var a = c.scroller.scrollLeft;
                                    c.scrollLeft = a, c.session.setScrollLeft(a)
                                }), this.cursorPos = {
                                    row: 0,
                                    column: 0
                                }, this.$textLayer.addEventListener("changeCharacterSize", function () {
                                    c.characterWidth = d.getCharacterWidth(), c.lineHeight = d.getLineHeight(), c.$updatePrintMargin(), c.onResize(!0), c.$loop.schedule(c.CHANGE_FULL)
                                }), this.$size = {
                                    width: 0,
                                    height: 0,
                                    scrollerHeight: 0,
                                    scrollerWidth: 0
                                }, this.layerConfig = {
                                    width: 1,
                                    padding: 0,
                                    firstRow: 0,
                                    firstRowScreen: 0,
                                    lastRow: 0,
                                    lineHeight: 1,
                                    characterWidth: 1,
                                    minHeight: 1,
                                    maxHeight: 1,
                                    offset: 0,
                                    height: 1
                                }, this.$loop = new o(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.setPadding(4), this.$updatePrintMargin()
                            };
                        (function () {
                            this.showGutter = !0, this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, d.implement(this, p), this.setSession = function (a) {
                                this.session = a, this.scroller.className = "ace_scroller", this.$cursorLayer.setSession(a), this.$markerBack.setSession(a), this.$markerFront.setSession(a), this.$gutterLayer.setSession(a), this.$textLayer.setSession(a), this.$loop.schedule(this.CHANGE_FULL)
                            }, this.updateLines = function (a, b) {
                                b === undefined && (b = Infinity), this.$changedLines ? (this.$changedLines.firstRow > a && (this.$changedLines.firstRow = a), this.$changedLines.lastRow < b && (this.$changedLines.lastRow = b)) : this.$changedLines = {
                                    firstRow: a,
                                    lastRow: b
                                }, this.$loop.schedule(this.CHANGE_LINES)
                            }, this.onChangeTabSize = function () {
                                this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize()
                            }, this.updateText = function () {
                                this.$loop.schedule(this.CHANGE_TEXT)
                            }, this.updateFull = function (a) {
                                a ? this.$renderChanges(this.CHANGE_FULL, !0) : this.$loop.schedule(this.CHANGE_FULL)
                            }, this.updateFontSize = function () {
                                this.$textLayer.checkForSizeChanges()
                            }, this.onResize = function (a, b, c, d) {
                                var f = this.CHANGE_SIZE,
                                    g = this.$size;
                                if (this.resizing > 2) return;
                                this.resizing > 1 ? this.resizing++ : this.resizing = a ? 1 : 0, d || (d = e.getInnerHeight(this.container));
                                if (a || g.height != d) g.height = d, this.scroller.style.height = d + "px", g.scrollerHeight = this.scroller.clientHeight, this.scrollBar.setHeight(g.scrollerHeight), this.session && (this.session.setScrollTop(this.getScrollTop()), f |= this.CHANGE_FULL);
                                c || (c = e.getInnerWidth(this.container));
                                if (a || this.resizing > 1 || g.width != c) {
                                    g.width = c;
                                    var b = this.showGutter ? this.$gutter.offsetWidth : 0;
                                    this.scroller.style.left = b + "px", g.scrollerWidth = Math.max(0, c - b - this.scrollBar.getWidth()), this.scroller.style.right = this.scrollBar.getWidth() + "px";
                                    if (this.session.getUseWrapMode() && this.adjustWrapLimit() || a) f |= this.CHANGE_FULL
                                }
                                a ? this.$renderChanges(f, !0) : this.$loop.schedule(f), a && delete this.resizing
                            }, this.adjustWrapLimit = function () {
                                var a = this.$size.scrollerWidth - this.$padding * 2,
                                    b = Math.floor(a / this.characterWidth);
                                return this.session.adjustWrapLimit(b)
                            }, this.setAnimatedScroll = function (a) {
                                this.$animatedScroll = a
                            }, this.getAnimatedScroll = function () {
                                return this.$animatedScroll
                            }, this.setShowInvisibles = function (a) {
                                this.$textLayer.setShowInvisibles(a) && this.$loop.schedule(this.CHANGE_TEXT)
                            }, this.getShowInvisibles = function () {
                                return this.$textLayer.showInvisibles
                            }, this.getDisplayIndentGuides = function () {
                                return this.$textLayer.displayIndentGuides
                            }, this.setDisplayIndentGuides = function (a) {
                                this.$textLayer.setDisplayIndentGuides(a) && this.$loop.schedule(this.CHANGE_TEXT)
                            }, this.$showPrintMargin = !0, this.setShowPrintMargin = function (a) {
                                this.$showPrintMargin = a, this.$updatePrintMargin()
                            }, this.getShowPrintMargin = function () {
                                return this.$showPrintMargin
                            }, this.$printMarginColumn = 80, this.setPrintMarginColumn = function (a) {
                                this.$printMarginColumn = a, this.$updatePrintMargin()
                            }, this.getPrintMarginColumn = function () {
                                return this.$printMarginColumn
                            }, this.getShowGutter = function () {
                                return this.showGutter
                            }, this.setShowGutter = function (a) {
                                if (this.showGutter === a) return;
                                this.$gutter.style.display = a ? "block" : "none", this.showGutter = a, this.onResize(!0)
                            }, this.getFadeFoldWidgets = function () {
                                return e.hasCssClass(this.$gutter, "ace_fade-fold-widgets")
                            }, this.setFadeFoldWidgets = function (a) {
                                a ? e.addCssClass(this.$gutter, "ace_fade-fold-widgets") : e.removeCssClass(this.$gutter, "ace_fade-fold-widgets")
                            }, this.$highlightGutterLine = !1, this.setHighlightGutterLine = function (a) {
                                if (this.$highlightGutterLine == a) return;
                                this.$highlightGutterLine = a;
                                if (!this.$gutterLineHighlight) {
                                    this.$gutterLineHighlight = e.createElement("div"), this.$gutterLineHighlight.className = "ace_gutter_active_line", this.$gutter.appendChild(this.$gutterLineHighlight);
                                    return
                                }
                                this.$gutterLineHighlight.style.display = a ? "" : "none", this.$cursorLayer.$pixelPos && this.$updateGutterLineHighlight()
                            }, this.getHighlightGutterLine = function () {
                                return this.$highlightGutterLine
                            }, this.$updateGutterLineHighlight = function () {
                                this.$gutterLineHighlight.style.top = this.$cursorLayer.$pixelPos.top - this.layerConfig.offset + "px", this.$gutterLineHighlight.style.height = this.layerConfig.lineHeight + "px"
                            }, this.$updatePrintMargin = function () {
                                var a;
                                if (!this.$showPrintMargin && !this.$printMarginEl) return;
                                this.$printMarginEl || (a = e.createElement("div"), a.className = "ace_print_margin_layer", this.$printMarginEl = e.createElement("div"), this.$printMarginEl.className = "ace_print_margin", a.appendChild(this.$printMarginEl), this.content.insertBefore(a, this.$textLayer.element));
                                var b = this.$printMarginEl.style;
                                b.left = this.characterWidth * this.$printMarginColumn + this.$padding + "px", b.visibility = this.$showPrintMargin ? "visible" : "hidden"
                            }, this.getContainerElement = function () {
                                return this.container
                            }, this.getMouseEventTarget = function () {
                                return this.content
                            }, this.getTextAreaContainer = function () {
                                return this.container
                            }, this.$moveTextAreaToCursor = function () {
                                if (!this.$keepTextAreaAtCursor) return;
                                var a = this.$cursorLayer.$pixelPos.top,
                                    b = this.$cursorLayer.$pixelPos.left;
                                a -= this.layerConfig.offset;
                                if (a < 0 || a > this.layerConfig.height - this.lineHeight) return;
                                var c = this.characterWidth;
                                this.$composition && (c += this.textarea.scrollWidth), b -= this.scrollLeft, b > this.$size.scrollerWidth - c && (b = this.$size.scrollerWidth - c), this.showGutter && (b += this.$gutterLayer.gutterWidth), this.textarea.style.height = this.lineHeight + "px", this.textarea.style.width = c + "px", this.textarea.style.left = b + "px", this.textarea.style.top = a - 1 + "px"
                            }, this.getFirstVisibleRow = function () {
                                return this.layerConfig.firstRow
                            }, this.getFirstFullyVisibleRow = function () {
                                return this.layerConfig.firstRow + (this.layerConfig.offset === 0 ? 0 : 1)
                            }, this.getLastFullyVisibleRow = function () {
                                var a = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
                                return this.layerConfig.firstRow - 1 + a
                            }, this.getLastVisibleRow = function () {
                                return this.layerConfig.lastRow
                            }, this.$padding = null, this.setPadding = function (a) {
                                this.$padding = a, this.$textLayer.setPadding(a), this.$cursorLayer.setPadding(a), this.$markerFront.setPadding(a), this.$markerBack.setPadding(a), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin()
                            }, this.getHScrollBarAlwaysVisible = function () {
                                return this.$horizScrollAlwaysVisible
                            }, this.setHScrollBarAlwaysVisible = function (a) {
                                this.$horizScrollAlwaysVisible != a && (this.$horizScrollAlwaysVisible = a, (!this.$horizScrollAlwaysVisible || !this.$horizScroll) && this.$loop.schedule(this.CHANGE_SCROLL))
                            }, this.$updateScrollBar = function () {
                                this.scrollBar.setInnerHeight(this.layerConfig.maxHeight), this.scrollBar.setScrollTop(this.scrollTop)
                            }, this.$renderChanges = function (a, b) {
                                if (!b && (!a || !this.session || !this.container.offsetWidth)) return;
                                (a & this.CHANGE_FULL || a & this.CHANGE_SIZE || a & this.CHANGE_TEXT || a & this.CHANGE_LINES || a & this.CHANGE_SCROLL) && this.$computeLayerConfig();
                                if (a & this.CHANGE_H_SCROLL) {
                                    this.scroller.scrollLeft = this.scrollLeft;
                                    var c = this.scroller.scrollLeft;
                                    this.scrollLeft = c, this.session.setScrollLeft(c), this.scroller.className = this.scrollLeft == 0 ? "ace_scroller" : "ace_scroller horscroll"
                                }
                                if (a & this.CHANGE_FULL) {
                                    this.$textLayer.checkForSizeChanges(), this.$updateScrollBar(), this.$textLayer.update(this.layerConfig), this.showGutter && this.$gutterLayer.update(this.layerConfig), this.$markerBack.update(this.layerConfig), this.$markerFront.update(this.layerConfig), this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight();
                                    return
                                }
                                if (a & this.CHANGE_SCROLL) {
                                    this.$updateScrollBar(), a & this.CHANGE_TEXT || a & this.CHANGE_LINES ? this.$textLayer.update(this.layerConfig) : this.$textLayer.scrollLines(this.layerConfig), this.showGutter && this.$gutterLayer.update(this.layerConfig), this.$markerBack.update(this.layerConfig), this.$markerFront.update(this.layerConfig), this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight();
                                    return
                                }
                                a & this.CHANGE_TEXT ? (this.$textLayer.update(this.layerConfig), this.showGutter && this.$gutterLayer.update(this.layerConfig)) : a & this.CHANGE_LINES ? (this.$updateLines() || a & this.CHANGE_GUTTER && this.showGutter) && this.$gutterLayer.update(this.layerConfig) : (a & this.CHANGE_TEXT || a & this.CHANGE_GUTTER) && this.showGutter && this.$gutterLayer.update(this.layerConfig), a & this.CHANGE_CURSOR && (this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight()), a & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(this.layerConfig), a & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(this.layerConfig), a & this.CHANGE_SIZE && this.$updateScrollBar()
                            }, this.$computeLayerConfig = function () {
                                var a = this.session,
                                    b = this.scrollTop % this.lineHeight,
                                    c = this.$size.scrollerHeight + this.lineHeight,
                                    d = this.$getLongestLine(),
                                    e = this.$horizScrollAlwaysVisible || this.$size.scrollerWidth - d < 0,
                                    f = this.$horizScroll !== e;
                                this.$horizScroll = e, f && (this.scroller.style.overflowX = e ? "scroll" : "hidden", e || this.session.setScrollLeft(0));
                                var g = this.session.getScreenLength() * this.lineHeight;
                                this.session.setScrollTop(Math.max(0, Math.min(this.scrollTop, g - this.$size.scrollerHeight)));
                                var h = Math.ceil(c / this.lineHeight) - 1,
                                    i = Math.max(0, Math.round((this.scrollTop - b) / this.lineHeight)),
                                    j = i + h,
                                    k, l, m = this.lineHeight;
                                i = a.screenToDocumentRow(i, 0);
                                var n = a.getFoldLine(i);
                                n && (i = n.start.row), k = a.documentToScreenRow(i, 0), l = a.getRowLength(i) * m, j = Math.min(a.screenToDocumentRow(j, 0), a.getLength() - 1), c = this.$size.scrollerHeight + a.getRowLength(j) * m + l, b = this.scrollTop - k * m, this.layerConfig = {
                                    width: d,
                                    padding: this.$padding,
                                    firstRow: i,
                                    firstRowScreen: k,
                                    lastRow: j,
                                    lineHeight: m,
                                    characterWidth: this.characterWidth,
                                    minHeight: c,
                                    maxHeight: g,
                                    offset: b,
                                    height: this.$size.scrollerHeight
                                }, this.$gutterLayer.element.style.marginTop = -b + "px", this.content.style.marginTop = -b + "px", this.content.style.width = d + 2 * this.$padding + "px", this.content.style.height = c + "px", f && this.onResize(!0)
                            }, this.$updateLines = function () {
                                var a = this.$changedLines.firstRow,
                                    b = this.$changedLines.lastRow;
                                this.$changedLines = null;
                                var c = this.layerConfig;
                                if (a > c.lastRow + 1) return;
                                if (b < c.firstRow) return;
                                if (b === Infinity) {
                                    this.showGutter && this.$gutterLayer.update(c), this.$textLayer.update(c);
                                    return
                                }
                                return this.$textLayer.updateLines(c, a, b), !0
                            }, this.$getLongestLine = function () {
                                var a = this.session.getScreenWidth();
                                return this.$textLayer.showInvisibles && (a += 1), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(a * this.characterWidth))
                            }, this.updateFrontMarkers = function () {
                                this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT)
                            }, this.updateBackMarkers = function () {
                                this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK)
                            }, this.addGutterDecoration = function (a, b) {
                                this.$gutterLayer.addGutterDecoration(a, b)
                            }, this.removeGutterDecoration = function (a, b) {
                                this.$gutterLayer.removeGutterDecoration(a, b)
                            }, this.updateBreakpoints = function (a) {
                                this.$loop.schedule(this.CHANGE_GUTTER)
                            }, this.setAnnotations = function (a) {
                                this.$gutterLayer.setAnnotations(a), this.$loop.schedule(this.CHANGE_GUTTER)
                            }, this.updateCursor = function () {
                                this.$loop.schedule(this.CHANGE_CURSOR)
                            }, this.hideCursor = function () {
                                this.$cursorLayer.hideCursor()
                            }, this.showCursor = function () {
                                this.$cursorLayer.showCursor()
                            }, this.scrollSelectionIntoView = function (a, b, c) {
                                this.scrollCursorIntoView(a, c), this.scrollCursorIntoView(b, c)
                            }, this.scrollCursorIntoView = function (a, b) {
                                if (this.$size.scrollerHeight === 0) return;
                                var c = this.$cursorLayer.getPixelPosition(a),
                                    d = c.left,
                                    e = c.top;
                                this.scrollTop > e ? (b && (e -= b * this.$size.scrollerHeight), this.session.setScrollTop(e)) : this.scrollTop + this.$size.scrollerHeight < e + this.lineHeight && (b && (e += b * this.$size.scrollerHeight), this.session.setScrollTop(e + this.lineHeight - this.$size.scrollerHeight));
                                var f = this.scrollLeft;
                                f > d ? (d < this.$padding + 2 * this.layerConfig.characterWidth && (d = 0), this.session.setScrollLeft(d)) : f + this.$size.scrollerWidth < d + this.characterWidth && this.session.setScrollLeft(Math.round(d + this.characterWidth - this.$size.scrollerWidth))
                            }, this.getScrollTop = function () {
                                return this.session.getScrollTop()
                            }, this.getScrollLeft = function () {
                                return this.session.getScrollLeft()
                            }, this.getScrollTopRow = function () {
                                return this.scrollTop / this.lineHeight
                            }, this.getScrollBottomRow = function () {
                                return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
                            }, this.scrollToRow = function (a) {
                                this.session.setScrollTop(a * this.lineHeight)
                            }, this.alignCursor = function (a, b) {
                                typeof a == "number" && (a = {
                                    row: a,
                                    column: 0
                                });
                                var c = this.$cursorLayer.getPixelPosition(a),
                                    d = c.top - this.$size.scrollerHeight * (b || 0);
                                this.session.setScrollTop(d)
                            }, this.STEPS = 8, this.$calcSteps = function (a, b) {
                                var c = 0,
                                    d = this.STEPS,
                                    e = [],
                                    f = function (a, b, c) {
                                        return c * (Math.pow(a - 1, 3) + 1) + b
                                    };
                                for (c = 0; c < d; ++c) e.push(f(c / this.STEPS, a, b - a));
                                return e
                            }, this.scrollToLine = function (a, b, c, d) {
                                var e = this.$cursorLayer.getPixelPosition({
                                    row: a,
                                    column: 0
                                }),
                                    f = e.top;
                                b && (f -= this.$size.scrollerHeight / 2);
                                var g = this.scrollTop;
                                this.session.setScrollTop(f), c !== !1 && this.animateScrolling(g, d)
                            }, this.animateScrolling = function (a, b) {
                                var c = this.scrollTop;
                                if (this.$animatedScroll && Math.abs(a - c) < 1e5) {
                                    var d = this,
                                        e = d.$calcSteps(a, c);
                                    this.$inScrollAnimation = !0, clearInterval(this.$timer), d.session.setScrollTop(e.shift()), this.$timer = setInterval(function () {
                                        e.length ? (d.session.setScrollTop(e.shift()), d.session.$scrollTop = c) : c != null ? (d.session.$scrollTop = -1, d.session.setScrollTop(c), c = null) : (d.$timer = clearInterval(d.$timer), d.$inScrollAnimation = !1, b && b())
                                    }, 10)
                                }
                            }, this.scrollToY = function (a) {
                                this.scrollTop !== a && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = a)
                            }, this.scrollToX = function (a) {
                                a < 0 && (a = 0), this.scrollLeft !== a && (this.scrollLeft = a), this.$loop.schedule(this.CHANGE_H_SCROLL)
                            }, this.scrollBy = function (a, b) {
                                b && this.session.setScrollTop(this.session.getScrollTop() + b), a && this.session.setScrollLeft(this.session.getScrollLeft() + a)
                            }, this.isScrollableBy = function (a, b) {
                                if (b < 0 && this.session.getScrollTop() > 0) return !0;
                                if (b > 0 && this.session.getScrollTop() + this.$size.scrollerHeight < this.layerConfig.maxHeight) return !0
                            }, this.pixelToScreenCoordinates = function (a, b) {
                                var c = this.scroller.getBoundingClientRect(),
                                    d = (a + this.scrollLeft - c.left - this.$padding) / this.characterWidth,
                                    e = Math.floor((b + this.scrollTop - c.top) / this.lineHeight),
                                    f = Math.round(d);
                                return {
                                    row: e,
                                    column: f,
                                    side: d - f > 0 ? 1 : -1
                                }
                            }, this.screenToTextCoordinates = function (a, b) {
                                var c = this.scroller.getBoundingClientRect(),
                                    d = Math.round((a + this.scrollLeft - c.left - this.$padding) / this.characterWidth),
                                    e = Math.floor((b + this.scrollTop - c.top) / this.lineHeight);
                                return this.session.screenToDocumentPosition(e, Math.max(d, 0))
                            }, this.textToScreenCoordinates = function (a, b) {
                                var c = this.scroller.getBoundingClientRect(),
                                    d = this.session.documentToScreenPosition(a, b),
                                    e = this.$padding + Math.round(d.column * this.characterWidth),
                                    f = d.row * this.lineHeight;
                                return {
                                    pageX: c.left + e - this.scrollLeft,
                                    pageY: c.top + f - this.scrollTop
                                }
                            }, this.visualizeFocus = function () {
                                e.addCssClass(this.container, "ace_focus")
                            }, this.visualizeBlur = function () {
                                e.removeCssClass(this.container, "ace_focus")
                            }, this.showComposition = function (a) {
                                this.$composition || (this.$composition = {
                                    keepTextAreaAtCursor: this.$keepTextAreaAtCursor,
                                    cssText: this.textarea.style.cssText
                                }), this.$keepTextAreaAtCursor = !0, e.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor()
                            }, this.setCompositionText = function (a) {
                                this.$moveTextAreaToCursor()
                            }, this.hideComposition = function () {
                                if (!this.$composition) return;
                                e.removeCssClass(this.textarea, "ace_composition"), this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor, this.textarea.style.cssText = this.$composition.cssText, this.$composition = null
                            }, this._loadTheme = function (a, b) {
                                if (!h.get("packaged")) return b();
                                i.loadScript(h.moduleUrl(a, "theme"), b)
                            }, this.setTheme = function (b) {
                                function h(a) {
                                    e.importCssString(a.cssText, a.cssClass, c.container.ownerDocument), c.$theme && e.removeCssClass(c.container, c.$theme), c.$theme = a ? a.cssClass : null, c.$theme && e.addCssClass(c.container, c.$theme), a && a.isDark ? e.addCssClass(c.container, "ace_dark") : e.removeCssClass(c.container, "ace_dark"), c.$size && (c.$size.width = 0, c.onResize())
                                }
                                var c = this;
                                this.$themeValue = b;
                                if (!b || typeof b == "string") {
                                    var d = b || "ace/theme/textmate",
                                        f;
                                    try {
                                        f = a(d)
                                    } catch (g) {}
                                    if (f) return h(f);
                                    c._loadTheme(d, function () {
                                        a([d], function (a) {
                                            if (c.$themeValue !== b) return;
                                            h(a)
                                        })
                                    })
                                } else h(b)
                            }, this.getTheme = function () {
                                return this.$themeValue
                            }, this.setStyle = function (b) {
                                e.addCssClass(this.container, b)
                            }, this.unsetStyle = function (b) {
                                e.removeCssClass(this.container, b)
                            }, this.destroy = function () {
                                this.$textLayer.destroy(), this.$cursorLayer.destroy()
                            }
                        }).call(r.prototype), b.VirtualRenderer = r
                    }), ace.define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/event_emitter"], function (a, b, c) {
                        var d = a("../lib/dom"),
                            e = a("../lib/oop"),
                            f = a("../lib/event_emitter").EventEmitter,
                            g = function (a) {
                                this.element = d.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", a.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = []
                            };
                        (function () {
                            e.implement(this, f), this.setSession = function (a) {
                                this.session = a
                            }, this.addGutterDecoration = function (a, b) {
                                window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(a, b)
                            }, this.removeGutterDecoration = function (a, b) {
                                window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(a, b)
                            }, this.setAnnotations = function (a) {
                                this.$annotations = [];
                                for (var b in a) if (a.hasOwnProperty(b)) {
                                    var c = a[b];
                                    if (!c) continue;
                                    var d = this.$annotations[b] = {
                                        text: []
                                    };
                                    for (var e = 0; e < c.length; e++) {
                                        var f = c[e],
                                            g = f.text.replace(/"/g, "&quot;").replace(/'/g, "&#8217;").replace(/</, "&lt;");
                                        d.text.indexOf(g) === -1 && d.text.push(g);
                                        var h = f.type;
                                        h == "error" ? d.className = " ace_error" : h == "warning" && d.className != " ace_error" ? d.className = " ace_warning" : h == "info" && !d.className && (d.className = " ace_info")
                                    }
                                }
                            }, this.update = function (a) {
                                var b = {
                                    className: ""
                                },
                                    c = [],
                                    e = a.firstRow,
                                    f = a.lastRow,
                                    g = this.session.getNextFoldLine(e),
                                    h = g ? g.start.row : Infinity,
                                    i = this.$showFoldWidgets && this.session.foldWidgets,
                                    j = this.session.$breakpoints,
                                    k = this.session.$decorations,
                                    l = 0;
                                for (;;) {
                                    e > h && (e = g.end.row + 1, g = this.session.getNextFoldLine(e, g), h = g ? g.start.row : Infinity);
                                    if (e > f) break;
                                    var m = this.$annotations[e] || b;
                                    c.push("<div class='ace_gutter-cell ", j[e] || "", k[e] || "", m.className, "' style='height:", this.session.getRowLength(e) * a.lineHeight, "px;'>", l = e + 1);
                                    if (i) {
                                        var n = i[e];
                                        n == null && (n = i[e] = this.session.getFoldWidget(e)), n && c.push("<span class='ace_fold-widget ", n, n == "start" && e == h && e < g.end.row ? " closed" : " open", "'></span>")
                                    }
                                    c.push("</div>"), e++
                                }
                                this.element = d.setInnerHtml(this.element, c.join("")), this.element.style.height = a.minHeight + "px", this.session.$useWrapMode && (l = this.session.getLength());
                                var o = ("" + l).length * a.characterWidth,
                                    p = this.$padding || this.$computePadding();
                                o += p.left + p.right, o !== this.gutterWidth && (this.gutterWidth = o, this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._emit("changeGutterWidth", o))
                            }, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function (a) {
                                a ? d.addCssClass(this.element, "ace_folding-enabled") : d.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = a, this.$padding = null
                            }, this.getShowFoldWidgets = function () {
                                return this.$showFoldWidgets
                            }, this.$computePadding = function () {
                                if (!this.element.firstChild) return {
                                    left: 0,
                                    right: 0
                                };
                                var a = d.computedStyle(this.element.firstChild);
                                return this.$padding = {}, this.$padding.left = parseInt(a.paddingLeft) + 1, this.$padding.right = parseInt(a.paddingRight), this.$padding
                            }, this.getRegion = function (a) {
                                var b = this.$padding || this.$computePadding(),
                                    c = this.element.getBoundingClientRect();
                                if (a.x < b.left + c.left) return "markers";
                                if (this.$showFoldWidgets && a.x > c.right - b.right) return "foldWidgets"
                            }
                        }).call(g.prototype), b.Gutter = g
                    }), ace.define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function (a, b, c) {
                        var d = a("../range").Range,
                            e = a("../lib/dom"),
                            f = function (a) {
                                this.element = e.createElement("div"), this.element.className = "ace_layer ace_marker-layer", a.appendChild(this.element)
                            };
                        (function () {
                            this.$padding = 0, this.setPadding = function (a) {
                                this.$padding = a
                            }, this.setSession = function (a) {
                                this.session = a
                            }, this.setMarkers = function (a) {
                                this.markers = a
                            }, this.update = function (a) {
                                var a = a || this.config;
                                if (!a) return;
                                this.config = a;
                                var b = [];
                                for (var c in this.markers) {
                                    var d = this.markers[c];
                                    if (!d.range) {
                                        d.update(b, this, this.session, a);
                                        continue
                                    }
                                    var f = d.range.clipRows(a.firstRow, a.lastRow);
                                    if (f.isEmpty()) continue;
                                    f = f.toScreenRange(this.session);
                                    if (d.renderer) {
                                        var g = this.$getTop(f.start.row, a),
                                            h = Math.round(this.$padding + f.start.column * a.characterWidth);
                                        d.renderer(b, f, h, g, a)
                                    } else f.isMultiLine() ? d.type == "text" ? this.drawTextMarker(b, f, d.clazz, a) : this.drawMultiLineMarker(b, f, d.clazz, a, d.type) : this.drawSingleLineMarker(b, f, d.clazz + " start", a, null, d.type)
                                }
                                this.element = e.setInnerHtml(this.element, b.join(""))
                            }, this.$getTop = function (a, b) {
                                return (a - b.firstRowScreen) * b.lineHeight
                            }, this.drawTextMarker = function (a, b, c, e) {
                                var f = b.start.row,
                                    g = new d(f, b.start.column, f, this.session.getScreenLastRowColumn(f));
                                this.drawSingleLineMarker(a, g, c + " start", e, 1, "text"), f = b.end.row, g = new d(f, 0, f, b.end.column), this.drawSingleLineMarker(a, g, c, e, 0, "text");
                                for (f = b.start.row + 1; f < b.end.row; f++) g.start.row = f, g.end.row = f, g.end.column = this.session.getScreenLastRowColumn(f), this.drawSingleLineMarker(a, g, c, e, 1, "text")
                            }, this.drawMultiLineMarker = function (a, b, c, d, e) {
                                var f = e === "background" ? 0 : this.$padding,
                                    g = d.lineHeight,
                                    h = this.$getTop(b.start.row, d),
                                    i = Math.round(f + b.start.column * d.characterWidth);
                                a.push("<div class='", c, " start' style='", "height:", g, "px;", "right:0;", "top:", h, "px;", "left:", i, "px;'></div>"), h = this.$getTop(b.end.row, d);
                                var j = Math.round(b.end.column * d.characterWidth);
                                a.push("<div class='", c, "' style='", "height:", g, "px;", "width:", j, "px;", "top:", h, "px;", "left:", f, "px;'></div>"), g = (b.end.row - b.start.row - 1) * d.lineHeight;
                                if (g < 0) return;
                                h = this.$getTop(b.start.row + 1, d), a.push("<div class='", c, "' style='", "height:", g, "px;", "right:0;", "top:", h, "px;", "left:", f, "px;'></div>")
                            }, this.drawSingleLineMarker = function (a, b, c, d, e, f) {
                                var g = f === "background" ? 0 : this.$padding,
                                    h = d.lineHeight;
                                if (f === "background") var i = d.width;
                                else i = Math.round((b.end.column + (e || 0) - b.start.column) * d.characterWidth);
                                var j = this.$getTop(b.start.row, d),
                                    k = Math.round(g + b.start.column * d.characterWidth);
                                a.push("<div class='", c, "' style='", "height:", h, "px;", "width:", i, "px;", "top:", j, "px;", "left:", k, "px;'></div>")
                            }
                        }).call(f.prototype), b.Marker = f
                    }), ace.define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function (a, b, c) {
                        var d = a("../lib/oop"),
                            e = a("../lib/dom"),
                            f = a("../lib/lang"),
                            g = a("../lib/useragent"),
                            h = a("../lib/event_emitter").EventEmitter,
                            i = function (a) {
                                this.element = e.createElement("div"), this.element.className = "ace_layer ace_text-layer", a.appendChild(this.element), this.$characterSize = this.$measureSizes() || {
                                    width: 0,
                                    height: 0
                                }, this.$pollSizeChanges()
                            };
                        (function () {
                            d.implement(this, h), this.EOF_CHAR = "Â¶", this.EOL_CHAR = "Â¬", this.TAB_CHAR = "â†’", this.SPACE_CHAR = "Â·", this.$padding = 0, this.setPadding = function (a) {
                                this.$padding = a, this.element.style.padding = "0 " + a + "px"
                            }, this.getLineHeight = function () {
                                return this.$characterSize.height || 1
                            }, this.getCharacterWidth = function () {
                                return this.$characterSize.width || 1
                            }, this.checkForSizeChanges = function () {
                                var a = this.$measureSizes();
                                a && (this.$characterSize.width !== a.width || this.$characterSize.height !== a.height) && (this.$characterSize = a, this._emit("changeCharacterSize", {
                                    data: a
                                }))
                            }, this.$pollSizeChanges = function () {
                                var a = this;
                                this.$pollSizeChangesTimer = setInterval(function () {
                                    a.checkForSizeChanges()
                                }, 500)
                            }, this.$fontStyles = {
                                fontFamily: 1,
                                fontSize: 1,
                                fontWeight: 1,
                                fontStyle: 1,
                                lineHeight: 1
                            }, this.$measureSizes = g.isIE || g.isOldGecko ?
                            function () {
                                var a = 1e3;
                                if (!this.$measureNode) {
                                    var b = this.$measureNode = e.createElement("div"),
                                        c = b.style;
                                    c.width = c.height = "auto", c.left = c.top = -a * 40 + "px", c.visibility = "hidden", c.position = "fixed", c.overflow = "visible", c.whiteSpace = "nowrap", b.innerHTML = f.stringRepeat("Xy", a);
                                    if (this.element.ownerDocument.body) this.element.ownerDocument.body.appendChild(b);
                                    else {
                                        var d = this.element.parentNode;
                                        while (!e.hasCssClass(d, "ace_editor")) d = d.parentNode;
                                        d.appendChild(b)
                                    }
                                }
                                if (!this.element.offsetWidth) return null;
                                var c = this.$measureNode.style,
                                    g = e.computedStyle(this.element);
                                for (var h in this.$fontStyles) c[h] = g[h];
                                var i = {
                                    height: this.$measureNode.offsetHeight,
                                    width: this.$measureNode.offsetWidth / (a * 2)
                                };
                                return i.width == 0 || i.height == 0 ? null : i
                            } : function () {
                                if (!this.$measureNode) {
                                    var a = this.$measureNode = e.createElement("div"),
                                        b = a.style;
                                    b.width = b.height = "auto", b.left = b.top = "-100px", b.visibility = "hidden", b.position = "fixed", b.overflow = "visible", b.whiteSpace = "nowrap", a.innerHTML = "X";
                                    var c = this.element.parentNode;
                                    while (c && !e.hasCssClass(c, "ace_editor")) c = c.parentNode;
                                    if (!c) return this.$measureNode = null;
                                    c.appendChild(a)
                                }
                                var d = this.$measureNode.getBoundingClientRect(),
                                    f = {
                                        height: d.height,
                                        width: d.width
                                    };
                                return f.width == 0 || f.height == 0 ? null : f
                            }, this.setSession = function (a) {
                                this.session = a, this.$computeTabString()
                            }, this.showInvisibles = !1, this.setShowInvisibles = function (a) {
                                return this.showInvisibles == a ? !1 : (this.showInvisibles = a, this.$computeTabString(), !0)
                            }, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function (a) {
                                return this.displayIndentGuides == a ? !1 : (this.displayIndentGuides = a, this.$computeTabString(), !0)
                            }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function () {
                                var a = this.session.getTabSize();
                                this.tabSize = a;
                                var b = this.$tabStrings = [0];
                                for (var c = 1; c < a + 1; c++) this.showInvisibles ? b.push("<span class='ace_invisible'>" + this.TAB_CHAR + Array(c).join("&#160;") + "</span>") : b.push((new Array(c + 1)).join("&#160;"));
                                if (this.displayIndentGuides) {
                                    this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                                    var d = "ace_indent-guide",
                                        e = Array(this.tabSize + 1).join("&#160;"),
                                        f = e;
                                    this.showInvisibles && (d += " ace_invisible", f = this.TAB_CHAR + e.substr(6)), this.$tabStrings[" "] = "<span class='" + d + "'>" + e + "</span>", this.$tabStrings[" "] = "<span class='" + d + "'>" + f + "</span>"
                                }
                            }, this.updateLines = function (a, b, c) {
                                (this.config.lastRow != a.lastRow || this.config.firstRow != a.firstRow) && this.scrollLines(a), this.config = a;
                                var d = Math.max(b, a.firstRow),
                                    f = Math.min(c, a.lastRow),
                                    g = this.element.childNodes,
                                    h = 0;
                                for (var i = a.firstRow; i < d; i++) {
                                    var j = this.session.getFoldLine(i);
                                    if (j) {
                                        if (j.containsRow(d)) {
                                            d = j.start.row;
                                            break
                                        }
                                        i = j.end.row
                                    }
                                    h++
                                }
                                var i = d,
                                    j = this.session.getNextFoldLine(i),
                                    k = j ? j.start.row : Infinity;
                                for (;;) {
                                    i > k && (i = j.end.row + 1, j = this.session.getNextFoldLine(i, j), k = j ? j.start.row : Infinity);
                                    if (i > f) break;
                                    var l = g[h++];
                                    if (l) {
                                        var m = [];
                                        this.$renderLine(m, i, !this.$useLineGroups(), i == k ? j : !1), e.setInnerHtml(l, m.join(""))
                                    }
                                    i++
                                }
                            }, this.scrollLines = function (a) {
                                var b = this.config;
                                this.config = a;
                                if (!b || b.lastRow < a.firstRow) return this.update(a);
                                if (a.lastRow < b.firstRow) return this.update(a);
                                var c = this.element;
                                if (b.firstRow < a.firstRow) for (var d = this.session.getFoldedRowCount(b.firstRow, a.firstRow - 1); d > 0; d--) c.removeChild(c.firstChild);
                                if (b.lastRow > a.lastRow) for (var d = this.session.getFoldedRowCount(a.lastRow + 1, b.lastRow); d > 0; d--) c.removeChild(c.lastChild);
                                if (a.firstRow < b.firstRow) {
                                    var e = this.$renderLinesFragment(a, a.firstRow, b.firstRow - 1);
                                    c.firstChild ? c.insertBefore(e, c.firstChild) : c.appendChild(e)
                                }
                                if (a.lastRow > b.lastRow) {
                                    var e = this.$renderLinesFragment(a, b.lastRow + 1, a.lastRow);
                                    c.appendChild(e)
                                }
                            }, this.$renderLinesFragment = function (a, b, c) {
                                var d = this.element.ownerDocument.createDocumentFragment(),
                                    f = b,
                                    g = this.session.getNextFoldLine(f),
                                    h = g ? g.start.row : Infinity;
                                for (;;) {
                                    f > h && (f = g.end.row + 1, g = this.session.getNextFoldLine(f, g), h = g ? g.start.row : Infinity);
                                    if (f > c) break;
                                    var i = e.createElement("div"),
                                        j = [];
                                    this.$renderLine(j, f, !1, f == h ? g : !1), i.innerHTML = j.join("");
                                    if (this.$useLineGroups()) i.className = "ace_line_group", d.appendChild(i);
                                    else {
                                        var k = i.childNodes;
                                        while (k.length) d.appendChild(k[0])
                                    }
                                    f++
                                }
                                return d
                            }, this.update = function (a) {
                                this.config = a;
                                var b = [],
                                    c = a.firstRow,
                                    d = a.lastRow,
                                    f = c,
                                    g = this.session.getNextFoldLine(f),
                                    h = g ? g.start.row : Infinity;
                                for (;;) {
                                    f > h && (f = g.end.row + 1, g = this.session.getNextFoldLine(f, g), h = g ? g.start.row : Infinity);
                                    if (f > d) break;
                                    this.$useLineGroups() && b.push("<div class='ace_line_group'>"), this.$renderLine(b, f, !1, f == h ? g : !1), this.$useLineGroups() && b.push("</div>"), f++
                                }
                                this.element = e.setInnerHtml(this.element, b.join(""))
                            }, this.$textToken = {
                                text: !0,
                                rparen: !0,
                                lparen: !0
                            }, this.$renderToken = function (a, b, c, d) {
                                var e = this,
                                    f = /\t|&|<|( +)|([\x00-\x1f\x80-\xa0\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g,
                                    g = function (a, c, d, f, g) {
                                        if (c) return (new Array(a.length + 1)).join("&#160;");
                                        if (a == "&") return "&#38;";
                                        if (a == "<") return "&#60;";
                                        if (a == "  ") {
                                            var h = e.session.getScreenTabSize(b + f);
                                            return b += h - 1, e.$tabStrings[h]
                                        }
                                        if (a == "ã€€") {
                                            var i = e.showInvisibles ? "ace_cjk ace_invisible" : "ace_cjk",
                                                j = e.showInvisibles ? e.SPACE_CHAR : "";
                                            return b += 1, "<span class='" + i + "' style='width:" + e.config.characterWidth * 2 + "px'>" + j + "</span>"
                                        }
                                        return d ? "<span class='ace_invisible ace_invalid'>" + e.SPACE_CHAR + "</span>" : (b += 1, "<span class='ace_cjk' style='width:" + e.config.characterWidth * 2 + "px'>" + a + "</span>")
                                    },
                                    h = d.replace(f, g);
                                if (!this.$textToken[c.type]) {
                                    var i = "ace_" + c.type.replace(/\./g, " ace_"),
                                        j = "";
                                    c.type == "fold" && (j = " style='width:" + c.value.length * this.config.characterWidth + "px;' "), a.push("<span class='", i, "'", j, ">", h, "</span>")
                                } else a.push(h);
                                return b + d.length
                            }, this.renderIndentGuide = function (a, b) {
                                var c = b.search(this.$indentGuideRe);
                                return c <= 0 ? b : b[0] == " " ? (c -= c % this.tabSize, a.push(Array(c / this.tabSize + 1).join(this.$tabStrings[" "])), b.substr(c)) : b[0] == " " ? (a.push(Array(c + 1).join(this.$tabStrings["    "])), b.substr(c)) : b
                            }, this.$renderWrappedLine = function (a, b, c, d) {
                                var e = 0,
                                    f = 0,
                                    g = c[0],
                                    h = 0;
                                for (var i = 0; i < b.length; i++) {
                                    var j = b[i],
                                        k = j.value;
                                    if (i == 0 && this.displayIndentGuides) {
                                        e = k.length, k = this.renderIndentGuide(a, k);
                                        if (!k) continue;
                                        e -= k.length
                                    }
                                    if (e + k.length < g) h = this.$renderToken(a, h, j, k), e += k.length;
                                    else {
                                        while (e + k.length >= g) h = this.$renderToken(a, h, j, k.substring(0, g - e)), k = k.substring(g - e), e = g, d || a.push("</div>", "<div class='ace_line' style='height:", this.config.lineHeight, "px'>"), f++, h = 0, g = c[f] || Number.MAX_VALUE;
                                        k.length != 0 && (e += k.length, h = this.$renderToken(a, h, j, k))
                                    }
                                }
                            }, this.$renderSimpleLine = function (a, b) {
                                var c = 0,
                                    d = b[0],
                                    e = d.value;
                                this.displayIndentGuides && (e = this.renderIndentGuide(a, e)), e && (c = this.$renderToken(a, c, d, e));
                                for (var f = 1; f < b.length; f++) d = b[f], e = d.value, c = this.$renderToken(a, c, d, e)
                            }, this.$renderLine = function (a, b, c, d) {
                                !d && d != 0 && (d = this.session.getFoldLine(b));
                                if (d) var e = this.$getFoldLineTokens(b, d);
                                else var e = this.session.getTokens(b);
                                c || a.push("<div class='ace_line' style='height:", this.config.lineHeight, "px'>");
                                if (e.length) {
                                    var f = this.session.getRowSplitData(b);
                                    f && f.length ? this.$renderWrappedLine(a, e, f, c) : this.$renderSimpleLine(a, e)
                                }
                                this.showInvisibles && (d && (b = d.end.row), a.push("<span class='ace_invisible'>", b == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, "</span>")), c || a.push("</div>")
                            }, this.$getFoldLineTokens = function (a, b) {
                                function e(a, b, c) {
                                    var e = 0,
                                        f = 0;
                                    while (f + a[e].value.length < b) {
                                        f += a[e].value.length, e++;
                                        if (e == a.length) return
                                    }
                                    if (f != b) {
                                        var g = a[e].value.substring(b - f);
                                        g.length > c - b && (g = g.substring(0, c - b)), d.push({
                                            type: a[e].type,
                                            value: g
                                        }), f = b + g.length, e += 1
                                    }
                                    while (f < c && e < a.length) {
                                        var g = a[e].value;
                                        g.length + f > c ? d.push({
                                            type: a[e].type,
                                            value: g.substring(0, c - f)
                                        }) : d.push(a[e]), f += g.length, e += 1
                                    }
                                }
                                var c = this.session,
                                    d = [],
                                    f = c.getTokens(a);
                                return b.walk(function (a, b, g, h, i) {
                                    a ? d.push({
                                        type: "fold",
                                        value: a
                                    }) : (i && (f = c.getTokens(b)), f.length && e(f, h, g))
                                }, b.end.row, this.session.getLine(b.end.row).length), d
                            }, this.$useLineGroups = function () {
                                return this.session.getUseWrapMode()
                            }, this.destroy = function () {
                                clearInterval(this.$pollSizeChangesTimer), this.$measureNode && this.$measureNode.parentNode.removeChild(this.$measureNode), delete this.$measureNode
                            }
                        }).call(i.prototype), b.Text = i
                    }), ace.define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function (a, b, c) {
                        var d = a("../lib/dom"),
                            e = function (a) {
                                this.element = d.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", a.appendChild(this.element), this.isVisible = !1, this.cursors = [], this.cursor = this.addCursor()
                            };
                        (function () {
                            this.$padding = 0, this.setPadding = function (a) {
                                this.$padding = a
                            }, this.setSession = function (a) {
                                this.session = a
                            }, this.addCursor = function () {
                                var a = d.createElement("div"),
                                    b = "ace_cursor";
                                return this.isVisible || (b += " ace_hidden"), this.overwrite && (b += " ace_overwrite"), a.className = b, this.element.appendChild(a), this.cursors.push(a), a
                            }, this.removeCursor = function () {
                                if (this.cursors.length > 1) {
                                    var a = this.cursors.pop();
                                    return a.parentNode.removeChild(a), a
                                }
                            }, this.hideCursor = function () {
                                this.isVisible = !1;
                                for (var a = this.cursors.length; a--;) d.addCssClass(this.cursors[a], "ace_hidden");
                                clearInterval(this.blinkId)
                            }, this.showCursor = function () {
                                this.isVisible = !0;
                                for (var a = this.cursors.length; a--;) d.removeCssClass(this.cursors[a], "ace_hidden");
                                this.element.style.visibility = "", this.restartTimer()
                            }, this.restartTimer = function () {
                                clearInterval(this.blinkId);
                                if (!this.isVisible) return;
                                var a = this.cursors.length == 1 ? this.cursor : this.element;
                                this.blinkId = setInterval(function () {
                                    a.style.visibility = "hidden", setTimeout(function () {
                                        a.style.visibility = ""
                                    }, 400)
                                }, 1e3)
                            }, this.getPixelPosition = function (a, b) {
                                if (!this.config || !this.session) return {
                                    left: 0,
                                    top: 0
                                };
                                a || (a = this.session.selection.getCursor());
                                var c = this.session.documentToScreenPosition(a),
                                    d = Math.round(this.$padding + c.column * this.config.characterWidth),
                                    e = (c.row - (b ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
                                return {
                                    left: d,
                                    top: e
                                }
                            }, this.update = function (a) {
                                this.config = a;
                                if (this.session.selectionMarkerCount > 0) {
                                    var b = this.session.$selectionMarkers,
                                        c = 0,
                                        d, e = 0;
                                    for (var c = b.length; c--;) {
                                        d = b[c];
                                        var f = this.getPixelPosition(d.cursor, !0),
                                            g = (this.cursors[e++] || this.addCursor()).style;
                                        g.left = f.left + "px", g.top = f.top + "px", g.width = a.characterWidth + "px", g.height = a.lineHeight + "px"
                                    }
                                    if (e > 1) while (this.cursors.length > e) this.removeCursor()
                                } else {
                                    var f = this.getPixelPosition(null, !0),
                                        g = this.cursor.style;
                                    g.left = f.left + "px", g.top = f.top + "px", g.width = a.characterWidth + "px", g.height = a.lineHeight + "px";
                                    while (this.cursors.length > 1) this.removeCursor()
                                }
                                var h = this.session.getOverwrite();
                                h != this.overwrite && this.$setOverite(h), this.$pixelPos = f, this.restartTimer()
                            }, this.$setOverite = function (a) {
                                this.overwrite = a;
                                for (var b = this.cursors.length; b--;) a ? d.addCssClass(this.cursors[b], "ace_overwrite") : d.removeCssClass(this.cursors[b], "ace_overwrite")
                            }, this.destroy = function () {
                                clearInterval(this.blinkId)
                            }
                        }).call(e.prototype), b.Cursor = e
                    }), ace.define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function (a, b, c) {
                        var d = a("./lib/oop"),
                            e = a("./lib/dom"),
                            f = a("./lib/event"),
                            g = a("./lib/event_emitter").EventEmitter,
                            h = function (a) {
                                this.element = e.createElement("div"), this.element.className = "ace_sb", this.inner = e.createElement("div"), this.element.appendChild(this.inner), a.appendChild(this.element), this.width = e.scrollbarWidth(a.ownerDocument), this.element.style.width = (this.width || 15) + 5 + "px", f.addListener(this.element, "scroll", this.onScroll.bind(this))
                            };
                        (function () {
                            d.implement(this, g), this.onScroll = function () {
                                this._emit("scroll", {
                                    data: this.element.scrollTop
                                })
                            }, this.getWidth = function () {
                                return this.width
                            }, this.setHeight = function (a) {
                                this.element.style.height = a + "px"
                            }, this.setInnerHeight = function (a) {
                                this.inner.style.height = a + "px"
                            }, this.setScrollTop = function (a) {
                                this.element.scrollTop = a
                            }
                        }).call(h.prototype), b.ScrollBar = h
                    }), ace.define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function (a, b, c) {
                        var d = a("./lib/event"),
                            e = function (a, b) {
                                this.onRender = a, this.pending = !1, this.changes = 0, this.window = b || window
                            };
                        (function () {
                            this.schedule = function (a) {
                                this.changes = this.changes | a;
                                if (!this.pending) {
                                    this.pending = !0;
                                    var b = this;
                                    d.nextTick(function () {
                                        b.pending = !1;
                                        var a;
                                        while (a = b.changes) b.changes = 0, b.onRender(a)
                                    }, this.window)
                                }
                            }
                        }).call(e.prototype), b.RenderLoop = e
                    }), ace.define("ace/requirejs/text!ace/css/editor.css", [], ".ace_editor {\
    position: absolute;\
    overflow: hidden;\
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Droid Sans Mono', 'Consolas', monospace;\
    font-size: 16px;\
}\
\
.ace_scroller {\
    position: absolute;\
    overflow: hidden;\
}\
\
.ace_content {\
    position: absolute;\
    box-sizing: border-box;\
    -moz-box-sizing: border-box;\
    -webkit-box-sizing: border-box;\
    cursor: text;\
}\
\
.ace_gutter {\
    position: absolute;\
    overflow : hidden;\
    height: 100%;\
    width: auto;\
    cursor: default;\
    z-index: 4;\
}\
\
.ace_gutter_active_line {\
    position: absolute;\
    left: 0;\
    right: 0;\
}\
\
.ace_scroller.horscroll {\
    box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;\
}\
\
.ace_gutter-cell {\
    padding-left: 19px;\
    padding-right: 6px;\
    background-repeat: no-repeat;\
}\
\
.ace_gutter-cell.ace_error {\
    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTQ4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTU4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBMjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBMzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkgXxbAAAAJbSURBVHjapFNNaBNBFH4zs5vdZLP5sQmNpT82QY209heh1ioWisaDRcSKF0WKJ0GQnrzrxasHsR6EnlrwD0TagxJabaVEpFYxLWlLSS822tr87m66ccfd2GKyVhA6MMybgfe97/vmPUQphd0sZjto9XIn9OOsvlu2nkqRzVU+6vvlzPf8W6bk8dxQ0NPbxAALgCgg2JkaQuhzQau/El0zbmUA7U0Es8v2CiYmKQJHGO1QICCLoqilMhkmurDAyapKgqItezi/USRdJqEYY4D5jCy03ht2yMkkvL91jTTX10qzyyu2hruPRN7jgbH+EOsXcMLgYiThEgAMhABW85oqy1DXdRIdvP1AHJ2acQXvDIrVHcdQNrEKNYSVMSZGMjEzIIAwDXIo+6G/FxcGnzkC3T2oMhLjre49sBB+RRcHLqdafK6sYdE/GGBwU1VpFNj0aN8pJbe+BkZyevUrvLl6Xmm0W9IuTc0DxrDNAJd5oEvI/KRsNC3bQyNjPO9yQ1YHcfj2QvfQc/5TUhJTBc2iM0U7AWDQtc1nJHvD/cfO2s7jaGkiTEfa/Ep8coLu7zmNmh8+dc5lZDuUeFAGUNA/OY6JVaypQ0vjr7XYjUvJM37vt+j1vuTK5DgVfVUoTjVe+y3/LxMxY2GgU+CSLy4cpfsYorRXuXIOi0Vt40h67uZFTdIo6nLaZcwUJWAzwNS0tBnqqKzQDnjdG/iPyZxo46HaKUpbvYkj8qYRTZsBhge+JHhZyh0x9b95JqjVJkT084kZIPwu/mPWqPgfQ5jXh2+92Ay7HedfAgwA6KDWafb4w3cAAAAASUVORK5CYII=\");\
    background-repeat: no-repeat;\
    background-position: 2px center;\
}\
\
.ace_gutter-cell.ace_warning {\
    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTg4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTk4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBNjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBNzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgd7PfIAAAGmSURBVHjaYvr//z8DJZiJgUIANoCRkREb9gLiSVAaQx4OQM7AAkwd7XU2/v++/rOttdYGEB9dASEvOMydGKfH8Gv/p4XTkvRBfLxeQAP+1cUhXopyvzhP7P/IoSj7g7Mw09cNKO6J1QQ0L4gICPIv/veg/8W+JdFvQNLHVsW9/nmn9zk7B+cCkDwhL7gt6knSZnx9/LuCEOcvkIAMP+cvto9nfqyZmmUAksfnBUtbM60gX/3/kgyv3/xSFOL5DZT+L8vP+Yfh5cvfPvp/xUHyQHXGyAYwgpwBjZYFT3Y1OEl/OfCH4ffv3wzc4iwMvNIsDJ+f/mH4+vIPAxsb631WW0Yln6ZpQLXdMK/DXGDflh+sIv37EivD5x//Gb7+YWT4y86sl7BCCkSD+Z++/1dkvsFRl+HnD1Rvje4F8whjMXmGj58YGf5zsDMwcnAwfPvKcml62DsQDeaDxN+/Y0qwlpEHqrdB94IRNIDUgfgfKJChGK4OikEW3gTiXUB950ASLFAF54AC94A0G9QAfOnmF9DCDzABFqS08IHYDIScdijOjQABBgC+/9awBH96jwAAAABJRU5ErkJggg==\");\
    background-position: 2px center;\
}\
\
.ace_gutter-cell.ace_info {\
    background-image: url(\"data:image/gif;base64,R0lGODlhEAAQAMQAAAAAAEFBQVJSUl5eXmRkZGtra39/f4WFhYmJiZGRkaampry8vMPDw8zMzNXV1dzc3OTk5Orq6vDw8P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABQALAAAAAAQABAAAAUuICWOZGmeaBml5XGwFCQSBGyXRSAwtqQIiRuiwIM5BoYVbEFIyGCQoeJGrVptIQA7\");\
    background-position: 2px center;\
}\
.ace_dark .ace_gutter-cell.ace_info {\
    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTk5MTVGREIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTk5MTVGRUIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFOTkxNUZCQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFOTkxNUZDQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SIDkjAAAAJ1JREFUeNpi/P//PwMlgImBQkB7A6qrq/+DMC55FkIGKCoq4pVnpFkgTp069f/+/fv/r1u37r+tre1/kg0A+ptn9uzZYLaRkRHpLvjw4cNXWVlZhufPnzOcO3eOdAO0tbVPAjHDmzdvGA4fPsxIsgGSkpJmv379Ynj37h2DjIyMCMkG3LhxQ/T27dsMampqDHZ2dq/pH41DxwCAAAMAFdc68dUsFZgAAAAASUVORK5CYII=\");\
}\
\
.ace_editor .ace_sb {\
    position: absolute;\
    overflow-x: hidden;\
    overflow-y: scroll;\
    right: 0;\
}\
\
.ace_editor .ace_sb div {\
    position: absolute;\
    width: 1px;\
    left: 0;\
}\
\
.ace_editor .ace_print_margin_layer {\
    z-index: 0;\
    position: absolute;\
    overflow: hidden;\
    margin: 0;\
    left: 0;\
    height: 100%;\
    width: 100%;\
}\
\
.ace_editor .ace_print_margin {\
    position: absolute;\
    height: 100%;\
}\
\
.ace_editor > textarea {\
    position: absolute;\
    z-index: 0;\
    width: 0.5em;\
    height: 1em;\
    opacity: 0;\
    background: transparent;\
    appearance: none;\
    -moz-appearance: none;\
    border: none;\
    resize: none;\
    outline: none;\
    overflow: hidden;\
}\
\
.ace_editor > textarea.ace_composition {\
    background: #fff;\
    color: #000;\
    z-index: 1000;\
    opacity: 1;\
    border: solid lightgray 1px;\
    margin: -1px\
}\
\
.ace_layer {\
    z-index: 1;\
    position: absolute;\
    overflow: hidden;\
    white-space: nowrap;\
    height: 100%;\
    width: 100%;\
    box-sizing: border-box;\
    -moz-box-sizing: border-box;\
    -webkit-box-sizing: border-box;\
    /* setting pointer-events: auto; on node under the mouse, which changes\
        during scroll, will break mouse wheel scrolling in Safari */\
    pointer-events: none;\
}\
\
.ace_gutter .ace_layer {\
    position: relative;\
    width: auto;\
    text-align: right;\
    pointer-events: auto;\
}\
\
.ace_text-layer {\
    color: black;\
    font: inherit !important;\
}\
\
.ace_cjk {\
    display: inline-block;\
    text-align: center;\
}\
\
.ace_cursor-layer {\
    z-index: 4;\
}\
\
.ace_cursor {\
    z-index: 4;\
    position: absolute;\
}\
\
.ace_cursor.ace_hidden {\
    opacity: 0.2;\
}\
\
.ace_editor.multiselect .ace_cursor {\
    border-left-width: 1px;\
}\
\
.ace_line {\
    white-space: nowrap;\
}\
\
.ace_marker-layer .ace_step {\
    position: absolute;\
    z-index: 3;\
}\
\
.ace_marker-layer .ace_selection {\
    position: absolute;\
    z-index: 5;\
}\
\
.ace_marker-layer .ace_bracket {\
    position: absolute;\
    z-index: 6;\
}\
\
.ace_marker-layer .ace_active_line {\
    position: absolute;\
    z-index: 2;\
}\
\
.ace_marker-layer .ace_selected_word {\
    position: absolute;\
    z-index: 4;\
    box-sizing: border-box;\
    -moz-box-sizing: border-box;\
    -webkit-box-sizing: border-box;\
}\
\
.ace_line .ace_fold {\
    box-sizing: border-box;\
    -moz-box-sizing: border-box;\
    -webkit-box-sizing: border-box;\
\
    display: inline-block;\
    height: 11px;\
    margin-top: -2px;\
    vertical-align: middle;\
\
    background-image:\
        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),\
        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%3AIDAT8%11c%FC%FF%FF%7F%18%03%1A%60%01%F2%3F%A0%891%80%04%FF%11-%F8%17%9BJ%E2%05%B1ZD%81v%26t%E7%80%F8%A3%82h%A12%1A%20%A3%01%02%0F%01%BA%25%06%00%19%C0%0D%AEF%D5%3ES%00%00%00%00IEND%AEB%60%82\");\
    background-repeat: no-repeat, repeat-x;\
    background-position: center center, top left;\
    color: transparent;\
\
    border: 1px solid black;\
    -moz-border-radius: 2px;\
    -webkit-border-radius: 2px;\
    border-radius: 2px;\
\
    cursor: pointer;\
    pointer-events: auto;\
}\
\
.ace_dark .ace_fold {\
}\
\
.ace_fold:hover{\
    background-image:\
        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),\
        url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%003IDAT8%11c%FC%FF%FF%7F%3E%03%1A%60%01%F2%3F%A3%891%80%04%FFQ%26%F8w%C0%B43%A1%DB%0C%E2%8F%0A%A2%85%CAh%80%8C%06%08%3C%04%E8%96%18%00%A3S%0D%CD%CF%D8%C1%9D%00%00%00%00IEND%AEB%60%82\");\
    background-repeat: no-repeat, repeat-x;\
    background-position: center center, top left;\
}\
\
.ace_dragging .ace_content {\
    cursor: move;\
}\
\
.ace_gutter_tooltip {\
    background-color: #FFFFD5;\
    border: 1px solid gray;\
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);\
    color: black;\
    display: inline-block;\
    padding: 4px;\
    position: absolute;\
    z-index: 300;\
    box-sizing: border-box;\
    -moz-box-sizing: border-box;\
    -webkit-box-sizing: border-box;\
    cursor: default;\
}\
\
.ace_folding-enabled > .ace_gutter-cell {\
    padding-right: 13px;\
}\
\
.ace_fold-widget {\
    box-sizing: border-box;\
    -moz-box-sizing: border-box;\
    -webkit-box-sizing: border-box;\
\
    margin: 0 -12px 0 1px;\
    display: inline-block;\
    height: 100%;\
    width: 11px;\
    vertical-align: bottom;\
\
    background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAe%8A%B1%0D%000%0C%C2%F2%2CK%96%BC%D0%8F9%81%88H%E9%D0%0E%96%C0%10%92%3E%02%80%5E%82%E4%A9*-%EEsw%C8%CC%11%EE%96w%D8%DC%E9*Eh%0C%151(%00%00%00%00IEND%AEB%60%82\");\
    background-repeat: no-repeat;\
    background-position: center;\
\
    border-radius: 3px;\
    \
    border: 1px solid transparent;\
}\
\
.ace_fold-widget.end {\
    background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAm%C7%C1%09%000%08C%D1%8C%ECE%C8E(%8E%EC%02)%1EZJ%F1%C1'%04%07I%E1%E5%EE%CAL%F5%A2%99%99%22%E2%D6%1FU%B5%FE0%D9x%A7%26Wz5%0E%D5%00%00%00%00IEND%AEB%60%82\");\
}\
\
.ace_fold-widget.closed {\
    background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%03%00%00%00%06%08%06%00%00%00%06%E5%24%0C%00%00%009IDATx%DA5%CA%C1%09%000%08%03%C0%AC*(%3E%04%C1%0D%BA%B1%23%A4Uh%E0%20%81%C0%CC%F8%82%81%AA%A2%AArGfr%88%08%11%11%1C%DD%7D%E0%EE%5B%F6%F6%CB%B8%05Q%2F%E9tai%D9%00%00%00%00IEND%AEB%60%82\");\
}\
\
.ace_fold-widget:hover {\
    border: 1px solid rgba(0, 0, 0, 0.3);\
    background-color: rgba(255, 255, 255, 0.2);\
    -moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\
    -webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\
}\
\
.ace_fold-widget:active {\
    border: 1px solid rgba(0, 0, 0, 0.4);\
    background-color: rgba(0, 0, 0, 0.05);\
    -moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\
    -webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\
}\
/**\
 * Dark version for fold widgets\
 */\
.ace_dark .ace_fold-widget {\
    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC\");\
}\
.ace_dark .ace_fold-widget.end {\
    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==\");\
}\
.ace_dark .ace_fold-widget.closed {\
    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==\");\
}\
.ace_dark .ace_fold-widget:hover {\
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\
    background-color: rgba(255, 255, 255, 0.1);\
}\
.ace_dark .ace_fold-widget:active {\
    -moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\
    -webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\
}\
    \
    \
    \
.ace_fold-widget.invalid {\
    background-color: #FFB4B4;\
    border-color: #DE5555;\
}\
\
.ace_fade-fold-widgets .ace_fold-widget {\
       -moz-transition: opacity 0.4s ease 0.05s;\
    -webkit-transition: opacity 0.4s ease 0.05s;\
         -o-transition: opacity 0.4s ease 0.05s;\
        -ms-transition: opacity 0.4s ease 0.05s;\
            transition: opacity 0.4s ease 0.05s;\
    opacity: 0;\
}\
\
.ace_fade-fold-widgets:hover .ace_fold-widget {\
       -moz-transition: opacity 0.05s ease 0.05s;\
    -webkit-transition: opacity 0.05s ease 0.05s;\
         -o-transition: opacity 0.05s ease 0.05s;\
        -ms-transition: opacity 0.05s ease 0.05s;\
            transition: opacity 0.05s ease 0.05s;\
    opacity:1;\
}\
"), ace.define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor"], function (a, b, c) {
                        function l(a, b, c) {
                            return k.$options.wrap = !0, k.$options.needle = b, k.$options.backwards = c == -1, k.find(a)
                        }
                        function o(a, b) {
                            return a.row == b.row && a.column == b.column
                        }
                        function p(a) {
                            a.$onAddRange = a.$onAddRange.bind(a), a.$onRemoveRange = a.$onRemoveRange.bind(a), a.$onMultiSelect = a.$onMultiSelect.bind(a), a.$onSingleSelect = a.$onSingleSelect.bind(a), b.onSessionChange.call(a, a), a.on("changeSession", b.onSessionChange.bind(a)), a.on("mousedown", g), a.commands.addCommands(i.defaultCommands), q(a)
                        }
                        function q(a) {
                            function e() {
                                c && (d.style.cursor = "", c = !1)
                            }
                            var b = a.textInput.getElement(),
                                c = !1,
                                d = a.renderer.content;
                            h.addListener(b, "keydown", function (a) {
                                a.keyCode == 18 && !(a.ctrlKey || a.shiftKey || a.metaKey) ? c || (d.style.cursor = "crosshair", c = !0) : c && (d.style.cursor = "")
                            }), h.addListener(b, "keyup", e), h.addListener(b, "blur", e)
                        }
                        var d = a("./range_list").RangeList,
                            e = a("./range").Range,
                            f = a("./selection").Selection,
                            g = a("./mouse/multi_select_handler").onMouseDown,
                            h = a("./lib/event"),
                            i = a("./commands/multi_select_commands");
                        b.commands = i.defaultCommands.concat(i.multiSelectCommands);
                        var j = a("./search").Search,
                            k = new j,
                            m = a("./edit_session").EditSession;
                        (function () {
                            this.getSelectionMarkers = function () {
                                return this.$selectionMarkers
                            }
                        }).call(m.prototype), function () {
                            this.ranges = null, this.rangeList = null, this.addRange = function (a, b) {
                                if (!a) return;
                                if (!this.inMultiSelectMode && this.rangeCount == 0) {
                                    var c = this.toOrientedRange();
                                    if (a.intersects(c)) return b || this.fromOrientedRange(a);
                                    this.rangeList.add(c), this.$onAddRange(c)
                                }
                                a.cursor || (a.cursor = a.end);
                                var d = this.rangeList.add(a);
                                return this.$onAddRange(a), d.length && this.$onRemoveRange(d), this.rangeCount > 1 && !this.inMultiSelectMode && (this._emit("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, this.rangeList.attach(this.session)), b || this.fromOrientedRange(a)
                            }, this.toSingleRange = function (a) {
                                a = a || this.ranges[0];
                                var b = this.rangeList.removeAll();
                                b.length && this.$onRemoveRange(b), a && this.fromOrientedRange(a)
                            }, this.substractPoint = function (a) {
                                var b = this.rangeList.substractPoint(a);
                                if (b) return this.$onRemoveRange(b), b[0]
                            }, this.mergeOverlappingRanges = function () {
                                var a = this.rangeList.merge();
                                a.length ? this.$onRemoveRange(a) : this.ranges[0] && this.fromOrientedRange(this.ranges[0])
                            }, this.$onAddRange = function (a) {
                                this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(a), this._emit("addRange", {
                                    range: a
                                })
                            }, this.$onRemoveRange = function (a) {
                                this.rangeCount = this.rangeList.ranges.length;
                                if (this.rangeCount == 1 && this.inMultiSelectMode) {
                                    var b = this.rangeList.ranges.pop();
                                    a.push(b), this.rangeCount = 0
                                }
                                for (var c = a.length; c--;) {
                                    var d = this.ranges.indexOf(a[c]);
                                    this.ranges.splice(d, 1)
                                }
                                this._emit("removeRange", {
                                    ranges: a
                                }), this.rangeCount == 0 && this.inMultiSelectMode && (this.inMultiSelectMode = !1, this._emit("singleSelect"), this.session.$undoSelect = !0, this.rangeList.detach(this.session)), b = b || this.ranges[0], b && !b.isEqual(this.getRange()) && this.fromOrientedRange(b)
                            }, this.$initRangeList = function () {
                                if (this.rangeList) return;
                                this.rangeList = new d, this.ranges = [], this.rangeCount = 0
                            }, this.getAllRanges = function () {
                                return this.rangeList.ranges.concat()
                            }, this.splitIntoLines = function () {
                                if (this.rangeCount > 1) {
                                    var a = this.rangeList.ranges,
                                        b = a[a.length - 1],
                                        c = e.fromPoints(a[0].start, b.end);
                                    this.toSingleRange(), this.setSelectionRange(c, b.cursor == b.start)
                                } else {
                                    var c = this.getRange(),
                                        d = c.start.row,
                                        f = c.end.row;
                                    if (d == f) return;
                                    var g = [],
                                        h = this.getLineRange(d, !0);
                                    h.start.column = c.start.column, g.push(h);
                                    for (var i = d + 1; i < f; i++) g.push(this.getLineRange(i, !0));
                                    h = this.getLineRange(f, !0), h.end.column = c.end.column, g.push(h), g.forEach(this.addRange, this)
                                }
                            }, this.toggleBlockSelection = function () {
                                if (this.rangeCount > 1) {
                                    var a = this.rangeList.ranges,
                                        b = a[a.length - 1],
                                        c = e.fromPoints(a[0].start, b.end);
                                    this.toSingleRange(), this.setSelectionRange(c, b.cursor == b.start)
                                } else {
                                    var d = this.session.documentToScreenPosition(this.selectionLead),
                                        f = this.session.documentToScreenPosition(this.selectionAnchor),
                                        g = this.rectangularRangeBlock(d, f);
                                    g.forEach(this.addRange, this)
                                }
                            }, this.rectangularRangeBlock = function (a, b, c) {
                                var d = [],
                                    f = a.column < b.column;
                                if (f) var g = a.column,
                                    h = b.column;
                                else var g = b.column,
                                    h = a.column;
                                var i = a.row < b.row;
                                if (i) var j = a.row,
                                    k = b.row;
                                else var j = b.row,
                                    k = a.row;
                                g < 0 && (g = 0), j < 0 && (j = 0), j == k && (c = !0);
                                for (var l = j; l <= k; l++) {
                                    var m = e.fromPoints(this.session.screenToDocumentPosition(l, g), this.session.screenToDocumentPosition(l, h));
                                    if (m.isEmpty()) {
                                        if (n && o(m.end, n)) break;
                                        var n = m.end
                                    }
                                    m.cursor = f ? m.start : m.end, d.push(m)
                                }
                                i && d.reverse();
                                if (!c) {
                                    var p = d.length - 1;
                                    while (d[p].isEmpty() && p > 0) p--;
                                    if (p > 0) {
                                        var q = 0;
                                        while (d[q].isEmpty()) q++
                                    }
                                    for (var r = p; r >= q; r--) d[r].isEmpty() && d.splice(r, 1)
                                }
                                return d
                            }
                        }.call(f.prototype);
                        var n = a("./editor").Editor;
                        (function () {
                            this.updateSelectionMarkers = function () {
                                this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                            }, this.addSelectionMarker = function (a) {
                                a.cursor || (a.cursor = a.end);
                                var b = this.getSelectionStyle();
                                return a.marker = this.session.addMarker(a, "ace_selection", b), this.session.$selectionMarkers.push(a), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, a
                            }, this.removeSelectionMarker = function (a) {
                                if (!a.marker) return;
                                this.session.removeMarker(a.marker);
                                var b = this.session.$selectionMarkers.indexOf(a);
                                b != -1 && this.session.$selectionMarkers.splice(b, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length
                            }, this.removeSelectionMarkers = function (a) {
                                var b = this.session.$selectionMarkers;
                                for (var c = a.length; c--;) {
                                    var d = a[c];
                                    if (!d.marker) continue;
                                    this.session.removeMarker(d.marker);
                                    var e = b.indexOf(d);
                                    e != -1 && b.splice(e, 1)
                                }
                                this.session.selectionMarkerCount = b.length
                            }, this.$onAddRange = function (a) {
                                this.addSelectionMarker(a.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                            }, this.$onRemoveRange = function (a) {
                                this.removeSelectionMarkers(a.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                            }, this.$onMultiSelect = function (a) {
                                if (this.inMultiSelectMode) return;
                                this.inMultiSelectMode = !0, this.setStyle("multiselect"), this.keyBinding.addKeyboardHandler(i.keyboardHandler), this.commands.on("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                            }, this.$onSingleSelect = function (a) {
                                if (this.session.multiSelect.inVirtualMode) return;
                                this.inMultiSelectMode = !1, this.unsetStyle("multiselect"), this.keyBinding.removeKeyboardHandler(i.keyboardHandler), this.commands.removeEventListener("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                            }, this.$onMultiSelectExec = function (a) {
                                var b = a.command,
                                    c = a.editor;
                                if (!c.multiSelect) return;
                                b.multiSelectAction ? b.multiSelectAction == "forEach" ? c.forEachSelection(b, a.args) : b.multiSelectAction == "single" ? (c.exitMultiSelectMode(), b.exec(c, a.args || {})) : b.multiSelectAction(c, a.args || {}) : (b.exec(c, a.args || {}), c.multiSelect.addRange(c.multiSelect.toOrientedRange()), c.multiSelect.mergeOverlappingRanges()), a.preventDefault()
                            }, this.forEachSelection = function (a, b) {
                                if (this.inVirtualSelectionMode) return;
                                var c = this.session,
                                    d = this.selection,
                                    e = d.rangeList,
                                    g = d._eventRegistry;
                                d._eventRegistry = {};
                                var h = new f(c);
                                this.inVirtualSelectionMode = !0;
                                for (var i = e.ranges.length; i--;) h.fromOrientedRange(e.ranges[i]), this.selection = c.selection = h, a.exec(this, b || {}), h.toOrientedRange(e.ranges[i]);
                                h.detach(), this.selection = c.selection = d, this.inVirtualSelectionMode = !1, d._eventRegistry = g, d.mergeOverlappingRanges(), this.onCursorChange(), this.onSelectionChange()
                            }, this.exitMultiSelectMode = function () {
                                if (this.inVirtualSelectionMode) return;
                                this.multiSelect.toSingleRange()
                            }, this.getCopyText = function () {
                                var a = "";
                                if (this.inMultiSelectMode) {
                                    var b = this.multiSelect.rangeList.ranges;
                                    a = [];
                                    for (var c = 0; c < b.length; c++) a.push(this.session.getTextRange(b[c]));
                                    a = a.join(this.session.getDocument().getNewLineCharacter())
                                } else this.selection.isEmpty() || (a = this.session.getTextRange(this.getSelectionRange()));
                                return a
                            }, this.onPaste = function (a) {
                                if (this.$readOnly) return;
                                this._emit("paste", a);
                                if (!this.inMultiSelectMode) return this.insert(a);
                                var b = a.split(/\r\n|\r|\n/),
                                    c = this.selection.rangeList.ranges;
                                if (b.length > c.length || b.length <= 2 || !b[1]) return this.commands.exec("insertstring", this, a);
                                for (var d = c.length; d--;) {
                                    var e = c[d];
                                    e.isEmpty() || this.session.remove(e), this.session.insert(e.start, b[d])
                                }
                            }, this.findAll = function (a, b, c) {
                                b = b || {}, b.needle = a || b.needle, this.$search.set(b);
                                var d = this.$search.findAll(this.session);
                                if (!d.length) return 0;
                                this.$blockScrolling += 1;
                                var e = this.multiSelect;
                                c || e.toSingleRange(d[0]);
                                for (var f = d.length; f--;) e.addRange(d[f], !0);
                                return this.$blockScrolling -= 1, d.length
                            }, this.selectMoreLines = function (a, b) {
                                var c = this.selection.toOrientedRange(),
                                    d = c.cursor == c.end,
                                    f = this.session.documentToScreenPosition(c.cursor);
                                this.selection.$desiredColumn && (f.column = this.selection.$desiredColumn);
                                var g = this.session.screenToDocumentPosition(f.row + a, f.column);
                                if (!c.isEmpty()) var h = this.session.documentToScreenPosition(d ? c.end : c.start),
                                    i = this.session.screenToDocumentPosition(h.row + a, h.column);
                                else var i = g;
                                if (d) {
                                    var j = e.fromPoints(g, i);
                                    j.cursor = j.start
                                } else {
                                    var j = e.fromPoints(i, g);
                                    j.cursor = j.end
                                }
                                j.desiredColumn = f.column;
                                if (!this.selection.inMultiSelectMode) this.selection.addRange(c);
                                else if (b) var k = c.cursor;
                                this.selection.addRange(j), k && this.selection.substractPoint(k)
                            }, this.transposeSelections = function (a) {
                                var b = this.session,
                                    c = b.multiSelect,
                                    d = c.ranges;
                                for (var e = d.length; e--;) {
                                    var f = d[e];
                                    if (f.isEmpty()) {
                                        var g = b.getWordRange(f.start.row, f.start.column);
                                        f.start.row = g.start.row, f.start.column = g.start.column, f.end.row = g.end.row, f.end.column = g.end.column
                                    }
                                }
                                c.mergeOverlappingRanges();
                                var h = [];
                                for (var e = d.length; e--;) {
                                    var f = d[e];
                                    h.unshift(b.getTextRange(f))
                                }
                                a < 0 ? h.unshift(h.pop()) : h.push(h.shift());
                                for (var e = d.length; e--;) {
                                    var f = d[e],
                                        g = f.clone();
                                    b.replace(f, h[e]), f.start.row = g.start.row, f.start.column = g.start.column
                                }
                            }, this.selectMore = function (a, b) {
                                var c = this.session,
                                    d = c.multiSelect,
                                    e = d.toOrientedRange();
                                if (e.isEmpty()) {
                                    var e = c.getWordRange(e.start.row, e.start.column);
                                    e.cursor = e.end, this.multiSelect.addRange(e)
                                }
                                var f = c.getTextRange(e),
                                    g = l(c, f, a);
                                g && (g.cursor = a == -1 ? g.start : g.end, this.multiSelect.addRange(g)), b && this.multiSelect.substractPoint(e.cursor)
                            }
                        }).call(n.prototype), b.onSessionChange = function (a) {
                            var b = a.session;
                            b.multiSelect || (b.$selectionMarkers = [], b.selection.$initRangeList(), b.multiSelect = b.selection), this.multiSelect = b.multiSelect;
                            var c = a.oldSession;
                            c && (c.multiSelect && c.multiSelect.editor == this && (c.multiSelect.editor = null), b.multiSelect.removeEventListener("addRange", this.$onAddRange), b.multiSelect.removeEventListener("removeRange", this.$onRemoveRange), b.multiSelect.removeEventListener("multiSelect", this.$onMultiSelect), b.multiSelect.removeEventListener("singleSelect", this.$onSingleSelect)), b.multiSelect.on("addRange", this.$onAddRange), b.multiSelect.on("removeRange", this.$onRemoveRange), b.multiSelect.on("multiSelect", this.$onMultiSelect), b.multiSelect.on("singleSelect", this.$onSingleSelect), this.inMultiSelectMode != b.selection.inMultiSelectMode && (b.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect())
                        }, b.MultiSelect = p
                    }), ace.define("ace/range_list", ["require", "exports", "module"], function (a, b, c) {
                        var d = function () {
                                this.ranges = []
                            };
                        (function () {
                            this.comparePoints = function (a, b) {
                                return a.row - b.row || a.column - b.column
                            }, this.pointIndex = function (a, b) {
                                var c = this.ranges;
                                for (var d = b || 0; d < c.length; d++) {
                                    var e = c[d],
                                        f = this.comparePoints(a, e.end);
                                    if (f > 0) continue;
                                    return f == 0 ? d : (f = this.comparePoints(a, e.start), f >= 0 ? d : -d - 1)
                                }
                                return -d - 1
                            }, this.add = function (a) {
                                var b = this.pointIndex(a.start);
                                b < 0 && (b = -b - 1);
                                var c = this.pointIndex(a.end, b);
                                return c < 0 ? c = -c - 1 : c++, this.ranges.splice(b, c - b, a)
                            }, this.addList = function (a) {
                                var b = [];
                                for (var c = a.length; c--;) b.push.call(b, this.add(a[c]));
                                return b
                            }, this.substractPoint = function (a) {
                                var b = this.pointIndex(a);
                                if (b >= 0) return this.ranges.splice(b, 1)
                            }, this.merge = function () {
                                var a = [],
                                    b = this.ranges,
                                    c = b[0],
                                    d;
                                for (var e = 1; e < b.length; e++) {
                                    d = c, c = b[e];
                                    var f = this.comparePoints(d.end, c.start);
                                    if (f < 0) continue;
                                    if (f == 0 && !d.isEmpty() && !c.isEmpty()) continue;
                                    this.comparePoints(d.end, c.end) < 0 && (d.end.row = c.end.row, d.end.column = c.end.column), b.splice(e, 1), a.push(c), c = d, e--
                                }
                                return a
                            }, this.contains = function (a, b) {
                                return this.pointIndex({
                                    row: a,
                                    column: b
                                }) >= 0
                            }, this.containsPoint = function (a) {
                                return this.pointIndex(a) >= 0
                            }, this.rangeAtPoint = function (a) {
                                var b = this.pointIndex(a);
                                if (b >= 0) return this.ranges[b]
                            }, this.clipRows = function (a, b) {
                                var c = this.ranges;
                                if (c[0].start.row > b || c[c.length - 1].start.row < a) return [];
                                var d = this.pointIndex({
                                    row: a,
                                    column: 0
                                });
                                d < 0 && (d = -d - 1);
                                var e = this.pointIndex({
                                    row: b,
                                    column: 0
                                }, d);
                                e < 0 && (e = -e - 1);
                                var f = [];
                                for (var g = d; g < e; g++) f.push(c[g]);
                                return f
                            }, this.removeAll = function () {
                                return this.ranges.splice(0, this.ranges.length)
                            }, this.attach = function (a) {
                                this.session && this.detach(), this.session = a, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange)
                            }, this.detach = function () {
                                if (!this.session) return;
                                this.session.removeListener("change", this.onChange), this.session = null
                            }, this.$onChange = function (a) {
                                var b = a.data.range;
                                if (a.data.action[0] == "i") var c = b.start,
                                    d = b.end;
                                else var d = b.start,
                                    c = b.end;
                                var e = c.row,
                                    f = d.row,
                                    g = f - e,
                                    h = -c.column + d.column,
                                    i = this.ranges;
                                for (var j = 0, k = i.length; j < k; j++) {
                                    var l = i[j];
                                    if (l.end.row < e) continue;
                                    if (l.start.row > e) break;
                                    l.start.row == e && l.start.column >= c.column && (l.start.column += h, l.start.row += g), l.end.row == e && l.end.column >= c.column && (l.end.column += h, l.end.row += g)
                                }
                                if (g != 0 && j < k) for (; j < k; j++) {
                                    var l = i[j];
                                    l.start.row += g, l.end.row += g
                                }
                            }
                        }).call(d.prototype), b.RangeList = d
                    }), ace.define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event"], function (a, b, c) {
                        function e(a, b) {
                            return a.row == b.row && a.column == b.column
                        }
                        function f(a) {
                            var b = a.domEvent,
                                c = b.altKey,
                                f = b.shiftKey,
                                g = a.getAccelKey(),
                                h = a.getButton();
                            if (a.editor.inMultiSelectMode && h == 2) {
                                a.editor.textInput.onContextMenu(a.domEvent);
                                return
                            }
                            if (!g && !c) {
                                h == 0 && a.editor.inMultiSelectMode && a.editor.exitMultiSelectMode();
                                return
                            }
                            var i = a.editor,
                                j = i.selection,
                                k = i.inMultiSelectMode,
                                l = a.getDocumentPosition(),
                                m = j.getCursor(),
                                n = a.inSelection() || j.isEmpty() && e(l, m),
                                o = a.x,
                                p = a.y,
                                q = function (a) {
                                    o = a.clientX, p = a.clientY
                                },
                                r = function () {
                                    var a = i.renderer.pixelToScreenCoordinates(o, p),
                                        b = s.screenToDocumentPosition(a.row, a.column);
                                    if (e(u, a) && e(b, j.selectionLead)) return;
                                    u = a, i.selection.moveCursorToPosition(b), i.selection.clearSelection(), i.renderer.scrollCursorIntoView(), i.removeSelectionMarkers(x), x = j.rectangularRangeBlock(u, t), x.forEach(i.addSelectionMarker, i), i.updateSelectionMarkers()
                                },
                                s = i.session,
                                t = i.renderer.pixelToScreenCoordinates(o, p),
                                u = t;
                            if (g && !f && !c && h == 0) {
                                if (!k && n) return;
                                if (!k) {
                                    var v = j.toOrientedRange();
                                    i.addSelectionMarker(v)
                                }
                                var w = j.rangeList.rangeAtPoint(l);
                                d.capture(i.container, function () {}, function () {
                                    var a = j.toOrientedRange();
                                    w && a.isEmpty() && e(w.cursor, a.cursor) ? j.substractPoint(a.cursor) : (v && (i.removeSelectionMarker(v), j.addRange(v)), j.addRange(a))
                                })
                            } else if (!f && c && h == 0) {
                                a.stop(), k && !g ? j.toSingleRange() : !k && g && j.addRange(), j.moveCursorToPosition(l), j.clearSelection();
                                var x = [],
                                    y = function (a) {
                                        clearInterval(A), i.removeSelectionMarkers(x);
                                        for (var b = 0; b < x.length; b++) j.addRange(x[b])
                                    },
                                    z = r;
                                d.capture(i.container, q, y);
                                var A = setInterval(function () {
                                    z()
                                }, 20);
                                return a.preventDefault()
                            }
                        }
                        var d = a("../lib/event");
                        b.onMouseDown = f
                    }), ace.define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], function (a, b, c) {
                        b.defaultCommands = [{
                            name: "addCursorAbove",
                            exec: function (a) {
                                a.selectMoreLines(-1)
                            },
                            bindKey: {
                                win: "Ctrl-Alt-Up",
                                mac: "Ctrl-Alt-Up"
                            },
                            readonly: !0
                        }, {
                            name: "addCursorBelow",
                            exec: function (a) {
                                a.selectMoreLines(1)
                            },
                            bindKey: {
                                win: "Ctrl-Alt-Down",
                                mac: "Ctrl-Alt-Down"
                            },
                            readonly: !0
                        }, {
                            name: "addCursorAboveSkipCurrent",
                            exec: function (a) {
                                a.selectMoreLines(-1, !0)
                            },
                            bindKey: {
                                win: "Ctrl-Alt-Shift-Up",
                                mac: "Ctrl-Alt-Shift-Up"
                            },
                            readonly: !0
                        }, {
                            name: "addCursorBelowSkipCurrent",
                            exec: function (a) {
                                a.selectMoreLines(1, !0)
                            },
                            bindKey: {
                                win: "Ctrl-Alt-Shift-Down",
                                mac: "Ctrl-Alt-Shift-Down"
                            },
                            readonly: !0
                        }, {
                            name: "selectMoreBefore",
                            exec: function (a) {
                                a.selectMore(-1)
                            },
                            bindKey: {
                                win: "Ctrl-Alt-Left",
                                mac: "Ctrl-Alt-Left"
                            },
                            readonly: !0
                        }, {
                            name: "selectMoreAfter",
                            exec: function (a) {
                                a.selectMore(1)
                            },
                            bindKey: {
                                win: "Ctrl-Alt-Right",
                                mac: "Ctrl-Alt-Right"
                            },
                            readonly: !0
                        }, {
                            name: "selectNextBefore",
                            exec: function (a) {
                                a.selectMore(-1, !0)
                            },
                            bindKey: {
                                win: "Ctrl-Alt-Shift-Left",
                                mac: "Ctrl-Alt-Shift-Left"
                            },
                            readonly: !0
                        }, {
                            name: "selectNextAfter",
                            exec: function (a) {
                                a.selectMore(1, !0)
                            },
                            bindKey: {
                                win: "Ctrl-Alt-Shift-Right",
                                mac: "Ctrl-Alt-Shift-Right"
                            },
                            readonly: !0
                        }, {
                            name: "splitIntoLines",
                            exec: function (a) {
                                a.multiSelect.splitIntoLines()
                            },
                            bindKey: {
                                win: "Ctrl-Shift-L",
                                mac: "Ctrl-Shift-L"
                            },
                            readonly: !0
                        }], b.multiSelectCommands = [{
                            name: "singleSelection",
                            bindKey: "esc",
                            exec: function (a) {
                                a.exitMultiSelectMode()
                            },
                            readonly: !0,
                            isAvailable: function (a) {
                                return a && a.inMultiSelectMode
                            }
                        }];
                        var d = a("../keyboard/hash_handler").HashHandler;
                        b.keyboardHandler = new d(b.multiSelectCommands)
                    }), ace.define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/config"], function (a, b, c) {
                        var d = a("../lib/oop"),
                            e = a("../lib/event_emitter").EventEmitter,
                            f = a("../config"),
                            g = function (b, c, d) {
                                this.changeListener = this.changeListener.bind(this);
                                if (f.get("packaged")) this.$worker = new Worker(f.moduleUrl(c, "worker"));
                                else {
                                    var e;
                                    typeof a.supports != "undefined" && a.supports.indexOf("ucjs2-pinf-0") >= 0 ? e = a.nameToUrl("ace/worker/worker_sourcemint") : (a.nameToUrl && !a.toUrl && (a.toUrl = a.nameToUrl), e = this.$normalizePath(a.toUrl("ace/worker/worker", null, "_"))), this.$worker = new Worker(e);
                                    var g = {};
                                    for (var h = 0; h < b.length; h++) {
                                        var i = b[h],
                                            j = this.$normalizePath(a.toUrl(i, null, "_").replace(/.js(\?.*)?$/, ""));
                                        g[i] = j
                                    }
                                }
                                this.$worker.postMessage({
                                    init: !0,
                                    tlns: g,
                                    module: c,
                                    classname: d
                                }), this.callbackId = 1, this.callbacks = {};
                                var k = this;
                                this.$worker.onerror = function (a) {
                                    throw window.console && console.log && console.log(a), a
                                }, this.$worker.onmessage = function (a) {
                                    var b = a.data;
                                    switch (b.type) {
                                    case "log":
                                        window.console && console.log && console.log(b.data);
                                        break;
                                    case "event":
                                        k._emit(b.name, {
                                            data: b.data
                                        });
                                        break;
                                    case "call":
                                        var c = k.callbacks[b.id];
                                        c && (c(b.data), delete k.callbacks[b.id])
                                    }
                                }
                            };
                        (function () {
                            d.implement(this, e), this.$normalizePath = function (a) {
                                return location.host ? (a = a.replace(/^[a-z]+:\/\/[^\/]+/, ""), a = location.protocol + "//" + location.host + (a.charAt(0) == "/" ? "" : location.pathname.replace(/\/[^\/]*$/, "")) + "/" + a.replace(/^[\/]+/, ""), a) : a
                            }, this.terminate = function () {
                                this._emit("terminate", {}), this.$worker.terminate(), this.$worker = null, this.$doc.removeEventListener("change", this.changeListener), this.$doc = null
                            }, this.send = function (a, b) {
                                this.$worker.postMessage({
                                    command: a,
                                    args: b
                                })
                            }, this.call = function (a, b, c) {
                                if (c) {
                                    var d = this.callbackId++;
                                    this.callbacks[d] = c, b.push(d)
                                }
                                this.send(a, b)
                            }, this.emit = function (a, b) {
                                try {
                                    this.$worker.postMessage({
                                        event: a,
                                        data: {
                                            data: b.data
                                        }
                                    })
                                } catch (c) {}
                            }, this.attachToDocument = function (a) {
                                this.$doc && this.terminate(), this.$doc = a, this.call("setValue", [a.getValue()]), a.on("change", this.changeListener)
                            }, this.changeListener = function (a) {
                                a.range = {
                                    start: a.data.range.start,
                                    end: a.data.range.end
                                }, this.emit("change", a)
                            }
                        }).call(g.prototype), b.WorkerClient = g
                    }), ace.define("ace/keyboard/state_handler", ["require", "exports", "module"], function (a, b, c) {
                        function e(a) {
                            this.keymapping = this.$buildKeymappingRegex(a)
                        }
                        var d = !1;
                        e.prototype = {
                            $buildKeymappingRegex: function (a) {
                                for (var b in a) this.$buildBindingsRegex(a[b]);
                                return a
                            },
                            $buildBindingsRegex: function (a) {
                                a.forEach(function (a) {
                                    a.key ? a.key = new RegExp("^" + a.key + "$") : Array.isArray(a.regex) ? ("key" in a || (a.key = new RegExp("^" + a.regex[1] + "$")), a.regex = new RegExp(a.regex.join("") + "$")) : a.regex && (a.regex = new RegExp(a.regex + "$"))
                                })
                            },
                            $composeBuffer: function (a, b, c, d) {
                                if (a.state == null || a.buffer == null) a.state = "start", a.buffer = "";
                                var e = [];
                                b & 1 && e.push("ctrl"), b & 8 && e.push("command"), b & 2 && e.push("option"), b & 4 && e.push("shift"), c && e.push(c);
                                var f = e.join("-"),
                                    g = a.buffer + f;
                                b != 2 && (a.buffer = g);
                                var h = {
                                    bufferToUse: g,
                                    symbolicName: f
                                };
                                return d && (h.keyIdentifier = d.keyIdentifier), h
                            },
                            $find: function (a, b, c, e, f, g) {
                                var h = {};
                                return this.keymapping[a.state].some(function (i) {
                                    var j;
                                    if (i.key && !i.key.test(c)) return !1;
                                    if (i.regex && !(j = i.regex.exec(b))) return !1;
                                    if (i.match && !i.match(b, e, f, c, g)) return !1;
                                    if (i.disallowMatches) for (var k = 0; k < i.disallowMatches.length; k++) if ( !! j[i.disallowMatches[k]]) return !1;
                                    if (i.exec) {
                                        h.command = i.exec;
                                        if (i.params) {
                                            var l;
                                            h.args = {}, i.params.forEach(function (a) {
                                                a.match != null && j != null ? l = j[a.match] || a.defaultValue : l = a.defaultValue, a.type === "number" && (l = parseInt(l)), h.args[a.name] = l
                                            })
                                        }
                                        a.buffer = ""
                                    }
                                    return i.then && (a.state = i.then, a.buffer = ""), h.command == null && (h.command = "null"), d && console.log("KeyboardStateMapper#find", i), !0
                                }), h.command ? h : (a.buffer = "", !1)
                            },
                            handleKeyboard: function (a, b, c, e, f) {
                                b == -1 && (b = 0);
                                if (b == 0 || c != "" && c != String.fromCharCode(0)) {
                                    var g = this.$composeBuffer(a, b, c, f),
                                        h = g.bufferToUse,
                                        i = g.symbolicName,
                                        j = g.keyIdentifier;
                                    return g = this.$find(a, h, i, b, c, j), d && console.log("KeyboardStateMapper#match", h, i, g), g
                                }
                                return null
                            }
                        }, b.matchCharacterOnly = function (a, b, c, d) {
                            return b == 0 ? !0 : b == 4 && c.length == 1 ? !0 : !1
                        }, b.StateHandler = e
                    }), ace.define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], function (a, b, c) {
                        var d = a("./range").Range,
                            e = a("./lib/event_emitter").EventEmitter,
                            f = a("./lib/oop"),
                            g = function (a, b, c, d, e, f) {
                                var g = this;
                                this.length = b, this.session = a, this.doc = a.getDocument(), this.mainClass = e, this.othersClass = f, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate), this.$others = d, this.$onCursorChange = function () {
                                    setTimeout(function () {
                                        g.onCursorChange()
                                    })
                                }, this.$pos = c;
                                var h = a.getUndoManager().$undoStack || a.getUndoManager().$undostack || {
                                    length: -1
                                };
                                this.$undoStackDepth = h.length, this.setup(), a.selection.on("changeCursor", this.$onCursorChange)
                            };
                        (function () {
                            f.implement(this, e), this.setup = function () {
                                var a = this,
                                    b = this.doc,
                                    c = this.session,
                                    e = this.$pos;
                                this.pos = b.createAnchor(e.row, e.column), this.markerId = c.addMarker(new d(e.row, e.column, e.row, e.column + this.length), this.mainClass, null, !1), this.pos.on("change", function (b) {
                                    c.removeMarker(a.markerId), a.markerId = c.addMarker(new d(b.value.row, b.value.column, b.value.row, b.value.column + a.length), a.mainClass, null, !1)
                                }), this.others = [], this.$others.forEach(function (c) {
                                    var d = b.createAnchor(c.row, c.column);
                                    a.others.push(d)
                                }), c.setUndoSelect(!1)
                            }, this.showOtherMarkers = function () {
                                if (this.othersActive) return;
                                var a = this.session,
                                    b = this;
                                this.othersActive = !0, this.others.forEach(function (c) {
                                    c.markerId = a.addMarker(new d(c.row, c.column, c.row, c.column + b.length), b.othersClass, null, !1), c.on("change", function (e) {
                                        a.removeMarker(c.markerId), c.markerId = a.addMarker(new d(e.value.row, e.value.column, e.value.row, e.value.column + b.length), b.othersClass, null, !1)
                                    })
                                })
                            }, this.hideOtherMarkers = function () {
                                if (!this.othersActive) return;
                                this.othersActive = !1;
                                for (var a = 0; a < this.others.length; a++) this.session.removeMarker(this.others[a].markerId)
                            }, this.onUpdate = function (a) {
                                var b = a.data,
                                    c = b.range;
                                if (c.start.row !== c.end.row) return;
                                if (c.start.row !== this.pos.row) return;
                                if (this.$updating) return;
                                this.$updating = !0;
                                var e = b.action === "insertText" ? c.end.column - c.start.column : c.start.column - c.end.column;
                                if (c.start.column >= this.pos.column && c.start.column <= this.pos.column + this.length + 1) {
                                    var f = c.start.column - this.pos.column;
                                    this.length += e;
                                    if (!this.session.$fromUndo) {
                                        if (b.action === "insertText") for (var g = this.others.length - 1; g >= 0; g--) {
                                            var h = this.others[g],
                                                i = {
                                                    row: h.row,
                                                    column: h.column + f
                                                };
                                            h.row === c.start.row && c.start.column < h.column && (i.column += e), this.doc.insert(i, b.text)
                                        } else if (b.action === "removeText") for (var g = this.others.length - 1; g >= 0; g--) {
                                            var h = this.others[g],
                                                i = {
                                                    row: h.row,
                                                    column: h.column + f
                                                };
                                            h.row === c.start.row && c.start.column < h.column && (i.column += e), this.doc.remove(new d(i.row, i.column, i.row, i.column - e))
                                        }
                                        c.start.column === this.pos.column && b.action === "insertText" ? setTimeout(function () {
                                            this.pos.setPosition(this.pos.row, this.pos.column - e);
                                            for (var a = 0; a < this.others.length; a++) {
                                                var b = this.others[a],
                                                    d = {
                                                        row: b.row,
                                                        column: b.column - e
                                                    };
                                                b.row === c.start.row && c.start.column < b.column && (d.column += e), b.setPosition(d.row, d.column)
                                            }
                                        }.bind(this), 0) : c.start.column === this.pos.column && b.action === "removeText" && setTimeout(function () {
                                            for (var a = 0; a < this.others.length; a++) {
                                                var b = this.others[a];
                                                b.row === c.start.row && c.start.column < b.column && b.setPosition(b.row, b.column - e)
                                            }
                                        }.bind(this), 0)
                                    }
                                    this.pos._emit("change", {
                                        value: this.pos
                                    });
                                    for (var g = 0; g < this.others.length; g++) this.others[g]._emit("change", {
                                        value: this.others[g]
                                    })
                                }
                                this.$updating = !1
                            }, this.onCursorChange = function (a) {
                                if (this.$updating) return;
                                var b = this.session.selection.getCursor();
                                b.row === this.pos.row && b.column >= this.pos.column && b.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", a)) : (this.hideOtherMarkers(), this._emit("cursorLeave", a))
                            }, this.detach = function () {
                                this.session.removeMarker(this.markerId), this.hideOtherMarkers(), this.doc.removeEventListener("change", this.$onUpdate), this.session.selection.removeEventListener("changeCursor", this.$onCursorChange), this.pos.detach();
                                for (var a = 0; a < this.others.length; a++) this.others[a].detach();
                                this.session.setUndoSelect(!0)
                            }, this.cancel = function () {
                                if (this.$undoStackDepth === -1) throw Error("Canceling placeholders only supported with undo manager attached to session.");
                                var a = this.session.getUndoManager(),
                                    b = (a.$undoStack || a.$undostack).length - this.$undoStackDepth;
                                for (var c = 0; c < b; c++) a.undo(!0)
                            }
                        }).call(g.prototype), b.PlaceHolder = g
                    }), ace.define("ace/theme/textmate", ["require", "exports", "module", "ace/requirejs/text!ace/theme/textmate.css", "ace/lib/dom"], function (a, b, c) {
                        b.isDark = !1, b.cssClass = "ace-tm", b.cssText = a("ace/requirejs/text!./textmate.css");
                        var d = a("../lib/dom");
                        d.importCssString(b.cssText, b.cssClass)
                    }), ace.define("ace/requirejs/text!ace/theme/textmate.css", [], '.ace-tm .ace_editor {\
  border: 2px solid rgb(159, 159, 159);\
}\
\
.ace-tm .ace_editor.ace_focus {\
  border: 2px solid #327fbd;\
}\
\
.ace-tm .ace_gutter {\
  background: #f0f0f0;\
  color: #333;\
}\
\
.ace-tm .ace_print_margin {\
  width: 1px;\
  background: #e8e8e8;\
}\
\
.ace-tm .ace_fold {\
    background-color: #6B72E6;\
}\
\
.ace-tm .ace_text-layer {\
}\
\
.ace-tm .ace_cursor {\
  border-left: 2px solid black;\
}\
\
.ace-tm .ace_cursor.ace_overwrite {\
  border-left: 0px;\
  border-bottom: 1px solid black;\
}\
        \
.ace-tm .ace_line .ace_invisible {\
  color: rgb(191, 191, 191);\
}\
\
.ace-tm .ace_line .ace_storage,\
.ace-tm .ace_line .ace_keyword {\
  color: blue;\
}\
\
.ace-tm .ace_line .ace_constant {\
  color: rgb(197, 6, 11);\
}\
\
.ace-tm .ace_line .ace_constant.ace_buildin {\
  color: rgb(88, 72, 246);\
}\
\
.ace-tm .ace_line .ace_constant.ace_language {\
  color: rgb(88, 92, 246);\
}\
\
.ace-tm .ace_line .ace_constant.ace_library {\
  color: rgb(6, 150, 14);\
}\
\
.ace-tm .ace_line .ace_invalid {\
  background-color: rgba(255, 0, 0, 0.1);\
  color: red;\
}\
\
.ace-tm .ace_line .ace_support.ace_function {\
  color: rgb(60, 76, 114);\
}\
\
.ace-tm .ace_line .ace_support.ace_constant {\
  color: rgb(6, 150, 14);\
}\
\
.ace-tm .ace_line .ace_support.ace_type,\
.ace-tm .ace_line .ace_support.ace_class {\
  color: rgb(109, 121, 222);\
}\
\
.ace-tm .ace_line .ace_keyword.ace_operator {\
  color: rgb(104, 118, 135);\
}\
\
.ace-tm .ace_line .ace_string {\
  color: rgb(3, 106, 7);\
}\
\
.ace-tm .ace_line .ace_comment {\
  color: rgb(76, 136, 107);\
}\
\
.ace-tm .ace_line .ace_comment.ace_doc {\
  color: rgb(0, 102, 255);\
}\
\
.ace-tm .ace_line .ace_comment.ace_doc.ace_tag {\
  color: rgb(128, 159, 191);\
}\
\
.ace-tm .ace_line .ace_constant.ace_numeric {\
  color: rgb(0, 0, 205);\
}\
\
.ace-tm .ace_line .ace_variable {\
  color: rgb(49, 132, 149);\
}\
\
.ace-tm .ace_line .ace_xml_pe {\
  color: rgb(104, 104, 91);\
}\
\
.ace-tm .ace_entity.ace_name.ace_function {\
  color: #0000A2;\
}\
\
.ace-tm .ace_markup.ace_markupine {\
    text-decoration:underline;\
}\
\
.ace-tm .ace_markup.ace_heading {\
  color: rgb(12, 7, 255);\
}\
\
.ace-tm .ace_markup.ace_list {\
  color:rgb(185, 6, 144);\
}\
\
.ace-tm .ace_marker-layer .ace_selection {\
  background: rgb(181, 213, 255);\
}\
.ace-tm.multiselect .ace_selection.start {\
  box-shadow: 0 0 3px 0px white;\
  border-radius: 2px;\
}\
.ace-tm .ace_marker-layer .ace_step {\
  background: rgb(252, 255, 0);\
}\
\
.ace-tm .ace_marker-layer .ace_stack {\
  background: rgb(164, 229, 101);\
}\
\
.ace-tm .ace_marker-layer .ace_bracket {\
  margin: -1px 0 0 -1px;\
  border: 1px solid rgb(192, 192, 192);\
}\
\
.ace-tm .ace_marker-layer .ace_active_line {\
  background: rgba(0, 0, 0, 0.07);\
}\
\
.ace-tm .ace_gutter_active_line {\
    background-color : #dcdcdc;\
}\
\
.ace-tm .ace_marker-layer .ace_selected_word {\
  background: rgb(250, 250, 255);\
  border: 1px solid rgb(200, 200, 250);\
}\
\
.ace-tm .ace_meta.ace_tag {\
  color:rgb(0, 22, 142);\
}\
\
.ace-tm .ace_string.ace_regex {\
  color: rgb(255, 0, 0)\
}\
\
.ace-tm .ace_indent-guide {\
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;\
}\
');
                    (function () {
                        ace.require(["ace/ace"], function (a) {
                            a && a.config.init();
                            if (!window.ace) window.ace = {};
                            for (var key in a) if (a.hasOwnProperty(key)) ace[key] = a[key];
                        });
                    })();

                    ace.define("ace/mode/php", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/php_highlight_rules", "ace/mode/matching_brace_outdent", "ace/range", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function (a, b, c) {
                        var d = a("../lib/oop"),
                            e = a("./text").Mode,
                            f = a("../tokenizer").Tokenizer,
                            g = a("./php_highlight_rules").PhpHighlightRules,
                            h = a("./matching_brace_outdent").MatchingBraceOutdent,
                            i = a("../range").Range,
                            j = a("./behaviour/cstyle").CstyleBehaviour,
                            k = a("./folding/cstyle").FoldMode,
                            l = function () {
                                this.$tokenizer = new f((new g).getRules()), this.$outdent = new h, this.$behaviour = new j, this.foldingRules = new k
                            };
                        d.inherits(l, e), function () {
                            this.toggleCommentLines = function (a, b, c, d) {
                                var e = !0,
                                    f = /^(\s*)#/;
                                for (var g = c; g <= d; g++) if (!f.test(b.getLine(g))) {
                                    e = !1;
                                    break
                                }
                                if (e) {
                                    var h = new i(0, 0, 0, 0);
                                    for (var g = c; g <= d; g++) {
                                        var j = b.getLine(g),
                                            k = j.match(f);
                                        h.start.row = g, h.end.row = g, h.end.column = k[0].length, b.replace(h, k[1])
                                    }
                                } else b.indentRows(c, d, "#")
                            }, this.getNextLineIndent = function (a, b, c) {
                                var d = this.$getIndent(b),
                                    e = this.$tokenizer.getLineTokens(b, a),
                                    f = e.tokens;
                                if (f.length && f[f.length - 1].type == "comment") return d;
                                if (a == "start") {
                                    var g = b.match(/^.*[\{\(\[\:]\s*$/);
                                    g && (d += c)
                                }
                                return d
                            }, this.checkOutdent = function (a, b, c) {
                                return this.$outdent.checkOutdent(b, c)
                            }, this.autoOutdent = function (a, b, c) {
                                this.$outdent.autoOutdent(b, c)
                            }
                        }.call(l.prototype), b.Mode = l
                    }), ace.define("ace/mode/php_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], function (a, b, c) {
                        var d = a("../lib/oop"),
                            e = a("../lib/lang"),
                            f = a("./doc_comment_highlight_rules").DocCommentHighlightRules,
                            g = a("./text_highlight_rules").TextHighlightRules,
                            h = function () {
                                var a = f,
                                    b = e.arrayToMap(["abs", "acos", "acosh", "addcslashes", "addslashes", "aggregate", "aggregate_info", "aggregate_methods", "aggregate_methods_by_list", "aggregate_methods_by_regexp", "aggregate_properties", "aggregate_properties_by_list", "aggregate_properties_by_regexp", "aggregation_info", "amqpconnection", "amqpexchange", "amqpqueue", "apache_child_terminate", "apache_get_modules", "apache_get_version", "apache_getenv", "apache_lookup_uri", "apache_note", "apache_request_headers", "apache_reset_timeout", "apache_response_headers", "apache_setenv", "apc_add", "apc_bin_dump", "apc_bin_dumpfile", "apc_bin_load", "apc_bin_loadfile", "apc_cache_info", "apc_cas", "apc_clear_cache", "apc_compile_file", "apc_dec", "apc_define_constants", "apc_delete", "apc_delete_file", "apc_exists", "apc_fetch", "apc_inc", "apc_load_constants", "apc_sma_info", "apc_store", "apciterator", "apd_breakpoint", "apd_callstack", "apd_clunk", "apd_continue", "apd_croak", "apd_dump_function_table", "apd_dump_persistent_resources", "apd_dump_regular_resources", "apd_echo", "apd_get_active_symbols", "apd_set_pprof_trace", "apd_set_session", "apd_set_session_trace", "apd_set_session_trace_socket", "appenditerator", "array", "array_change_key_case", "array_chunk", "array_combine", "array_count_values", "array_diff", "array_diff_assoc", "array_diff_key", "array_diff_uassoc", "array_diff_ukey", "array_fill", "array_fill_keys", "array_filter", "array_flip", "array_intersect", "array_intersect_assoc", "array_intersect_key", "array_intersect_uassoc", "array_intersect_ukey", "array_key_exists", "array_keys", "array_map", "array_merge", "array_merge_recursive", "array_multisort", "array_pad", "array_pop", "array_product", "array_push", "array_rand", "array_reduce", "array_replace", "array_replace_recursive", "array_reverse", "array_search", "array_shift", "array_slice", "array_splice", "array_sum", "array_udiff", "array_udiff_assoc", "array_udiff_uassoc", "array_uintersect", "array_uintersect_assoc", "array_uintersect_uassoc", "array_unique", "array_unshift", "array_values", "array_walk", "array_walk_recursive", "arrayaccess", "arrayiterator", "arrayobject", "arsort", "asin", "asinh", "asort", "assert", "assert_options", "atan", "atan2", "atanh", "audioproperties", "badfunctioncallexception", "badmethodcallexception", "base64_decode", "base64_encode", "base_convert", "basename", "bbcode_add_element", "bbcode_add_smiley", "bbcode_create", "bbcode_destroy", "bbcode_parse", "bbcode_set_arg_parser", "bbcode_set_flags", "bcadd", "bccomp", "bcdiv", "bcmod", "bcmul", "bcompiler_load", "bcompiler_load_exe", "bcompiler_parse_class", "bcompiler_read", "bcompiler_write_class", "bcompiler_write_constant", "bcompiler_write_exe_footer", "bcompiler_write_file", "bcompiler_write_footer", "bcompiler_write_function", "bcompiler_write_functions_from_file", "bcompiler_write_header", "bcompiler_write_included_filename", "bcpow", "bcpowmod", "bcscale", "bcsqrt", "bcsub", "bin2hex", "bind_textdomain_codeset", "bindec", "bindtextdomain", "bson_decode", "bson_encode", "bumpValue", "bzclose", "bzcompress", "bzdecompress", "bzerrno", "bzerror", "bzerrstr", "bzflush", "bzopen", "bzread", "bzwrite", "cachingiterator", "cairo", "cairo_create", "cairo_font_face_get_type", "cairo_font_face_status", "cairo_font_options_create", "cairo_font_options_equal", "cairo_font_options_get_antialias", "cairo_font_options_get_hint_metrics", "cairo_font_options_get_hint_style", "cairo_font_options_get_subpixel_order", "cairo_font_options_hash", "cairo_font_options_merge", "cairo_font_options_set_antialias", "cairo_font_options_set_hint_metrics", "cairo_font_options_set_hint_style", "cairo_font_options_set_subpixel_order", "cairo_font_options_status", "cairo_format_stride_for_width", "cairo_image_surface_create", "cairo_image_surface_create_for_data", "cairo_image_surface_create_from_png", "cairo_image_surface_get_data", "cairo_image_surface_get_format", "cairo_image_surface_get_height", "cairo_image_surface_get_stride", "cairo_image_surface_get_width", "cairo_matrix_create_scale", "cairo_matrix_create_translate", "cairo_matrix_invert", "cairo_matrix_multiply", "cairo_matrix_rotate", "cairo_matrix_transform_distance", "cairo_matrix_transform_point", "cairo_matrix_translate", "cairo_pattern_add_color_stop_rgb", "cairo_pattern_add_color_stop_rgba", "cairo_pattern_create_for_surface", "cairo_pattern_create_linear", "cairo_pattern_create_radial", "cairo_pattern_create_rgb", "cairo_pattern_create_rgba", "cairo_pattern_get_color_stop_count", "cairo_pattern_get_color_stop_rgba", "cairo_pattern_get_extend", "cairo_pattern_get_filter", "cairo_pattern_get_linear_points", "cairo_pattern_get_matrix", "cairo_pattern_get_radial_circles", "cairo_pattern_get_rgba", "cairo_pattern_get_surface", "cairo_pattern_get_type", "cairo_pattern_set_extend", "cairo_pattern_set_filter", "cairo_pattern_set_matrix", "cairo_pattern_status", "cairo_pdf_surface_create", "cairo_pdf_surface_set_size", "cairo_ps_get_levels", "cairo_ps_level_to_string", "cairo_ps_surface_create", "cairo_ps_surface_dsc_begin_page_setup", "cairo_ps_surface_dsc_begin_setup", "cairo_ps_surface_dsc_comment", "cairo_ps_surface_get_eps", "cairo_ps_surface_restrict_to_level", "cairo_ps_surface_set_eps", "cairo_ps_surface_set_size", "cairo_scaled_font_create", "cairo_scaled_font_extents", "cairo_scaled_font_get_ctm", "cairo_scaled_font_get_font_face", "cairo_scaled_font_get_font_matrix", "cairo_scaled_font_get_font_options", "cairo_scaled_font_get_scale_matrix", "cairo_scaled_font_get_type", "cairo_scaled_font_glyph_extents", "cairo_scaled_font_status", "cairo_scaled_font_text_extents", "cairo_surface_copy_page", "cairo_surface_create_similar", "cairo_surface_finish", "cairo_surface_flush", "cairo_surface_get_content", "cairo_surface_get_device_offset", "cairo_surface_get_font_options", "cairo_surface_get_type", "cairo_surface_mark_dirty", "cairo_surface_mark_dirty_rectangle", "cairo_surface_set_device_offset", "cairo_surface_set_fallback_resolution", "cairo_surface_show_page", "cairo_surface_status", "cairo_surface_write_to_png", "cairo_svg_surface_create", "cairo_svg_surface_restrict_to_version", "cairo_svg_version_to_string", "cairoantialias", "cairocontent", "cairocontext", "cairoexception", "cairoextend", "cairofillrule", "cairofilter", "cairofontface", "cairofontoptions", "cairofontslant", "cairofonttype", "cairofontweight", "cairoformat", "cairogradientpattern", "cairohintmetrics", "cairohintstyle", "cairoimagesurface", "cairolineargradient", "cairolinecap", "cairolinejoin", "cairomatrix", "cairooperator", "cairopath", "cairopattern", "cairopatterntype", "cairopdfsurface", "cairopslevel", "cairopssurface", "cairoradialgradient", "cairoscaledfont", "cairosolidpattern", "cairostatus", "cairosubpixelorder", "cairosurface", "cairosurfacepattern", "cairosurfacetype", "cairosvgsurface", "cairosvgversion", "cairotoyfontface", "cal_days_in_month", "cal_from_jd", "cal_info", "cal_to_jd", "calcul_hmac", "calculhmac", "call_user_func", "call_user_func_array", "call_user_method", "call_user_method_array", "callbackfilteriterator", "ceil", "chdb", "chdb_create", "chdir", "checkdate", "checkdnsrr", "chgrp", "chmod", "chop", "chown", "chr", "chroot", "chunk_split", "class_alias", "class_exists", "class_implements", "class_parents", "classkit_import", "classkit_method_add", "classkit_method_copy", "classkit_method_redefine", "classkit_method_remove", "classkit_method_rename", "clearstatcache", "clone", "closedir", "closelog", "collator", "com", "com_addref", "com_create_guid", "com_event_sink", "com_get", "com_get_active_object", "com_invoke", "com_isenum", "com_load", "com_load_typelib", "com_message_pump", "com_print_typeinfo", "com_propget", "com_propput", "com_propset", "com_release", "com_set", "compact", "connection_aborted", "connection_status", "connection_timeout", "constant", "construct", "construct", "construct", "convert_cyr_string", "convert_uudecode", "convert_uuencode", "copy", "cos", "cosh", "count", "count_chars", "countable", "counter_bump", "counter_bump_value", "counter_create", "counter_get", "counter_get_meta", "counter_get_named", "counter_get_value", "counter_reset", "counter_reset_value", "crack_check", "crack_closedict", "crack_getlastmessage", "crack_opendict", "crc32", "create_function", "crypt", "ctype_alnum", "ctype_alpha", "ctype_cntrl", "ctype_digit", "ctype_graph", "ctype_lower", "ctype_print", "ctype_punct", "ctype_space", "ctype_upper", "ctype_xdigit", "cubrid_affected_rows", "cubrid_bind", "cubrid_client_encoding", "cubrid_close", "cubrid_close_prepare", "cubrid_close_request", "cubrid_col_get", "cubrid_col_size", "cubrid_column_names", "cubrid_column_types", "cubrid_commit", "cubrid_connect", "cubrid_connect_with_url", "cubrid_current_oid", "cubrid_data_seek", "cubrid_db_name", "cubrid_disconnect", "cubrid_drop", "cubrid_errno", "cubrid_error", "cubrid_error_code", "cubrid_error_code_facility", "cubrid_error_msg", "cubrid_execute", "cubrid_fetch", "cubrid_fetch_array", "cubrid_fetch_assoc", "cubrid_fetch_field", "cubrid_fetch_lengths", "cubrid_fetch_object", "cubrid_fetch_row", "cubrid_field_flags", "cubrid_field_len", "cubrid_field_name", "cubrid_field_seek", "cubrid_field_table", "cubrid_field_type", "cubrid_free_result", "cubrid_get", "cubrid_get_autocommit", "cubrid_get_charset", "cubrid_get_class_name", "cubrid_get_client_info", "cubrid_get_db_parameter", "cubrid_get_server_info", "cubrid_insert_id", "cubrid_is_instance", "cubrid_list_dbs", "cubrid_load_from_glo", "cubrid_lob_close", "cubrid_lob_export", "cubrid_lob_get", "cubrid_lob_send", "cubrid_lob_size", "cubrid_lock_read", "cubrid_lock_write", "cubrid_move_cursor", "cubrid_new_glo", "cubrid_next_result", "cubrid_num_cols", "cubrid_num_fields", "cubrid_num_rows", "cubrid_ping", "cubrid_prepare", "cubrid_put", "cubrid_query", "cubrid_real_escape_string", "cubrid_result", "cubrid_rollback", "cubrid_save_to_glo", "cubrid_schema", "cubrid_send_glo", "cubrid_seq_drop", "cubrid_seq_insert", "cubrid_seq_put", "cubrid_set_add", "cubrid_set_autocommit", "cubrid_set_db_parameter", "cubrid_set_drop", "cubrid_unbuffered_query", "cubrid_version", "curl_close", "curl_copy_handle", "curl_errno", "curl_error", "curl_exec", "curl_getinfo", "curl_init", "curl_multi_add_handle", "curl_multi_close", "curl_multi_exec", "curl_multi_getcontent", "curl_multi_info_read", "curl_multi_init", "curl_multi_remove_handle", "curl_multi_select", "curl_setopt", "curl_setopt_array", "curl_version", "current", "cyrus_authenticate", "cyrus_bind", "cyrus_close", "cyrus_connect", "cyrus_query", "cyrus_unbind", "date", "date_add", "date_create", "date_create_from_format", "date_date_set", "date_default_timezone_get", "date_default_timezone_set", "date_diff", "date_format", "date_get_last_errors", "date_interval_create_from_date_string", "date_interval_format", "date_isodate_set", "date_modify", "date_offset_get", "date_parse", "date_parse_from_format", "date_sub", "date_sun_info", "date_sunrise", "date_sunset", "date_time_set", "date_timestamp_get", "date_timestamp_set", "date_timezone_get", "date_timezone_set", "dateinterval", "dateperiod", "datetime", "datetimezone", "db2_autocommit", "db2_bind_param", "db2_client_info", "db2_close", "db2_column_privileges", "db2_columns", "db2_commit", "db2_conn_error", "db2_conn_errormsg", "db2_connect", "db2_cursor_type", "db2_escape_string", "db2_exec", "db2_execute", "db2_fetch_array", "db2_fetch_assoc", "db2_fetch_both", "db2_fetch_object", "db2_fetch_row", "db2_field_display_size", "db2_field_name", "db2_field_num", "db2_field_precision", "db2_field_scale", "db2_field_type", "db2_field_width", "db2_foreign_keys", "db2_free_result", "db2_free_stmt", "db2_get_option", "db2_last_insert_id", "db2_lob_read", "db2_next_result", "db2_num_fields", "db2_num_rows", "db2_pclose", "db2_pconnect", "db2_prepare", "db2_primary_keys", "db2_procedure_columns", "db2_procedures", "db2_result", "db2_rollback", "db2_server_info", "db2_set_option", "db2_special_columns", "db2_statistics", "db2_stmt_error", "db2_stmt_errormsg", "db2_table_privileges", "db2_tables", "dba_close", "dba_delete", "dba_exists", "dba_fetch", "dba_firstkey", "dba_handlers", "dba_insert", "dba_key_split", "dba_list", "dba_nextkey", "dba_open", "dba_optimize", "dba_popen", "dba_replace", "dba_sync", "dbase_add_record", "dbase_close", "dbase_create", "dbase_delete_record", "dbase_get_header_info", "dbase_get_record", "dbase_get_record_with_names", "dbase_numfields", "dbase_numrecords", "dbase_open", "dbase_pack", "dbase_replace_record", "dbplus_add", "dbplus_aql", "dbplus_chdir", "dbplus_close", "dbplus_curr", "dbplus_errcode", "dbplus_errno", "dbplus_find", "dbplus_first", "dbplus_flush", "dbplus_freealllocks", "dbplus_freelock", "dbplus_freerlocks", "dbplus_getlock", "dbplus_getunique", "dbplus_info", "dbplus_last", "dbplus_lockrel", "dbplus_next", "dbplus_open", "dbplus_prev", "dbplus_rchperm", "dbplus_rcreate", "dbplus_rcrtexact", "dbplus_rcrtlike", "dbplus_resolve", "dbplus_restorepos", "dbplus_rkeys", "dbplus_ropen", "dbplus_rquery", "dbplus_rrename", "dbplus_rsecindex", "dbplus_runlink", "dbplus_rzap", "dbplus_savepos", "dbplus_setindex", "dbplus_setindexbynumber", "dbplus_sql", "dbplus_tcl", "dbplus_tremove", "dbplus_undo", "dbplus_undoprepare", "dbplus_unlockrel", "dbplus_unselect", "dbplus_update", "dbplus_xlockrel", "dbplus_xunlockrel", "dbx_close", "dbx_compare", "dbx_connect", "dbx_error", "dbx_escape_string", "dbx_fetch_row", "dbx_query", "dbx_sort", "dcgettext", "dcngettext", "deaggregate", "debug_backtrace", "debug_print_backtrace", "debug_zval_dump", "decbin", "dechex", "decoct", "define", "define_syslog_variables", "defined", "deg2rad", "delete", "dgettext", "die", "dio_close", "dio_fcntl", "dio_open", "dio_read", "dio_seek", "dio_stat", "dio_tcsetattr", "dio_truncate", "dio_write", "dir", "directoryiterator", "dirname", "disk_free_space", "disk_total_space", "diskfreespace", "dl", "dngettext", "dns_check_record", "dns_get_mx", "dns_get_record", "dom_import_simplexml", "domainexception", "domattr", "domattribute_name", "domattribute_set_value", "domattribute_specified", "domattribute_value", "domcharacterdata", "domcomment", "domdocument", "domdocument_add_root", "domdocument_create_attribute", "domdocument_create_cdata_section", "domdocument_create_comment", "domdocument_create_element", "domdocument_create_element_ns", "domdocument_create_entity_reference", "domdocument_create_processing_instruction", "domdocument_create_text_node", "domdocument_doctype", "domdocument_document_element", "domdocument_dump_file", "domdocument_dump_mem", "domdocument_get_element_by_id", "domdocument_get_elements_by_tagname", "domdocument_html_dump_mem", "domdocument_xinclude", "domdocumentfragment", "domdocumenttype", "domdocumenttype_entities", "domdocumenttype_internal_subset", "domdocumenttype_name", "domdocumenttype_notations", "domdocumenttype_public_id", "domdocumenttype_system_id", "domelement", "domelement_get_attribute", "domelement_get_attribute_node", "domelement_get_elements_by_tagname", "domelement_has_attribute", "domelement_remove_attribute", "domelement_set_attribute", "domelement_set_attribute_node", "domelement_tagname", "domentity", "domentityreference", "domexception", "domimplementation", "domnamednodemap", "domnode", "domnode_add_namespace", "domnode_append_child", "domnode_append_sibling", "domnode_attributes", "domnode_child_nodes", "domnode_clone_node", "domnode_dump_node", "domnode_first_child", "domnode_get_content", "domnode_has_attributes", "domnode_has_child_nodes", "domnode_insert_before", "domnode_is_blank_node", "domnode_last_child", "domnode_next_sibling", "domnode_node_name", "domnode_node_type", "domnode_node_value", "domnode_owner_document", "domnode_parent_node", "domnode_prefix", "domnode_previous_sibling", "domnode_remove_child", "domnode_replace_child", "domnode_replace_node", "domnode_set_content", "domnode_set_name", "domnode_set_namespace", "domnode_unlink_node", "domnodelist", "domnotation", "domprocessinginstruction", "domprocessinginstruction_data", "domprocessinginstruction_target", "domtext", "domxml_new_doc", "domxml_open_file", "domxml_open_mem", "domxml_version", "domxml_xmltree", "domxml_xslt_stylesheet", "domxml_xslt_stylesheet_doc", "domxml_xslt_stylesheet_file", "domxml_xslt_version", "domxpath", "domxsltstylesheet_process", "domxsltstylesheet_result_dump_file", "domxsltstylesheet_result_dump_mem", "dotnet", "dotnet_load", "doubleval", "each", "easter_date", "easter_days", "echo", "empty", "emptyiterator", "enchant_broker_describe", "enchant_broker_dict_exists", "enchant_broker_free", "enchant_broker_free_dict", "enchant_broker_get_error", "enchant_broker_init", "enchant_broker_list_dicts", "enchant_broker_request_dict", "enchant_broker_request_pwl_dict", "enchant_broker_set_ordering", "enchant_dict_add_to_personal", "enchant_dict_add_to_session", "enchant_dict_check", "enchant_dict_describe", "enchant_dict_get_error", "enchant_dict_is_in_session", "enchant_dict_quick_check", "enchant_dict_store_replacement", "enchant_dict_suggest", "end", "ereg", "ereg_replace", "eregi", "eregi_replace", "error_get_last", "error_log", "error_reporting", "errorexception", "escapeshellarg", "escapeshellcmd", "eval", "event_add", "event_base_free", "event_base_loop", "event_base_loopbreak", "event_base_loopexit", "event_base_new", "event_base_priority_init", "event_base_set", "event_buffer_base_set", "event_buffer_disable", "event_buffer_enable", "event_buffer_fd_set", "event_buffer_free", "event_buffer_new", "event_buffer_priority_set", "event_buffer_read", "event_buffer_set_callback", "event_buffer_timeout_set", "event_buffer_watermark_set", "event_buffer_write", "event_del", "event_free", "event_new", "event_set", "exception", "exec", "exif_imagetype", "exif_read_data", "exif_tagname", "exif_thumbnail", "exit", "exp", "expect_expectl", "expect_popen", "explode", "expm1", "export", "export", "extension_loaded", "extract", "ezmlm_hash", "fam_cancel_monitor", "fam_close", "fam_monitor_collection", "fam_monitor_directory", "fam_monitor_file", "fam_next_event", "fam_open", "fam_pending", "fam_resume_monitor", "fam_suspend_monitor", "fbsql_affected_rows", "fbsql_autocommit", "fbsql_blob_size", "fbsql_change_user", "fbsql_clob_size", "fbsql_close", "fbsql_commit", "fbsql_connect", "fbsql_create_blob", "fbsql_create_clob", "fbsql_create_db", "fbsql_data_seek", "fbsql_database", "fbsql_database_password", "fbsql_db_query", "fbsql_db_status", "fbsql_drop_db", "fbsql_errno", "fbsql_error", "fbsql_fetch_array", "fbsql_fetch_assoc", "fbsql_fetch_field", "fbsql_fetch_lengths", "fbsql_fetch_object", "fbsql_fetch_row", "fbsql_field_flags", "fbsql_field_len", "fbsql_field_name", "fbsql_field_seek", "fbsql_field_table", "fbsql_field_type", "fbsql_free_result", "fbsql_get_autostart_info", "fbsql_hostname", "fbsql_insert_id", "fbsql_list_dbs", "fbsql_list_fields", "fbsql_list_tables", "fbsql_next_result", "fbsql_num_fields", "fbsql_num_rows", "fbsql_password", "fbsql_pconnect", "fbsql_query", "fbsql_read_blob", "fbsql_read_clob", "fbsql_result", "fbsql_rollback", "fbsql_rows_fetched", "fbsql_select_db", "fbsql_set_characterset", "fbsql_set_lob_mode", "fbsql_set_password", "fbsql_set_transaction", "fbsql_start_db", "fbsql_stop_db", "fbsql_table_name", "fbsql_tablename", "fbsql_username", "fbsql_warnings", "fclose", "fdf_add_doc_javascript", "fdf_add_template", "fdf_close", "fdf_create", "fdf_enum_values", "fdf_errno", "fdf_error", "fdf_get_ap", "fdf_get_attachment", "fdf_get_encoding", "fdf_get_file", "fdf_get_flags", "fdf_get_opt", "fdf_get_status", "fdf_get_value", "fdf_get_version", "fdf_header", "fdf_next_field_name", "fdf_open", "fdf_open_string", "fdf_remove_item", "fdf_save", "fdf_save_string", "fdf_set_ap", "fdf_set_encoding", "fdf_set_file", "fdf_set_flags", "fdf_set_javascript_action", "fdf_set_on_import_javascript", "fdf_set_opt", "fdf_set_status", "fdf_set_submit_form_action", "fdf_set_target_frame", "fdf_set_value", "fdf_set_version", "feof", "fflush", "fgetc", "fgetcsv", "fgets", "fgetss", "file", "file_exists", "file_get_contents", "file_put_contents", "fileatime", "filectime", "filegroup", "fileinode", "filemtime", "fileowner", "fileperms", "filepro", "filepro_fieldcount", "filepro_fieldname", "filepro_fieldtype", "filepro_fieldwidth", "filepro_retrieve", "filepro_rowcount", "filesize", "filesystemiterator", "filetype", "filter_has_var", "filter_id", "filter_input", "filter_input_array", "filter_list", "filter_var", "filter_var_array", "filteriterator", "finfo_buffer", "finfo_close", "finfo_file", "finfo_open", "finfo_set_flags", "floatval", "flock", "floor", "flush", "fmod", "fnmatch", "fopen", "forward_static_call", "forward_static_call_array", "fpassthru", "fprintf", "fputcsv", "fputs", "fread", "frenchtojd", "fribidi_log2vis", "fscanf", "fseek", "fsockopen", "fstat", "ftell", "ftok", "ftp_alloc", "ftp_cdup", "ftp_chdir", "ftp_chmod", "ftp_close", "ftp_connect", "ftp_delete", "ftp_exec", "ftp_fget", "ftp_fput", "ftp_get", "ftp_get_option", "ftp_login", "ftp_mdtm", "ftp_mkdir", "ftp_nb_continue", "ftp_nb_fget", "ftp_nb_fput", "ftp_nb_get", "ftp_nb_put", "ftp_nlist", "ftp_pasv", "ftp_put", "ftp_pwd", "ftp_quit", "ftp_raw", "ftp_rawlist", "ftp_rename", "ftp_rmdir", "ftp_set_option", "ftp_site", "ftp_size", "ftp_ssl_connect", "ftp_systype", "ftruncate", "func_get_arg", "func_get_args", "func_num_args", "function_exists", "fwrite", "gc_collect_cycles", "gc_disable", "gc_enable", "gc_enabled", "gd_info", "gearmanclient", "gearmanjob", "gearmantask", "gearmanworker", "geoip_continent_code_by_name", "geoip_country_code3_by_name", "geoip_country_code_by_name", "geoip_country_name_by_name", "geoip_database_info", "geoip_db_avail", "geoip_db_filename", "geoip_db_get_all_info", "geoip_id_by_name", "geoip_isp_by_name", "geoip_org_by_name", "geoip_record_by_name", "geoip_region_by_name", "geoip_region_name_by_code", "geoip_time_zone_by_country_and_region", "getMeta", "getNamed", "getValue", "get_browser", "get_called_class", "get_cfg_var", "get_class", "get_class_methods", "get_class_vars", "get_current_user", "get_declared_classes", "get_declared_interfaces", "get_defined_constants", "get_defined_functions", "get_defined_vars", "get_extension_funcs", "get_headers", "get_html_translation_table", "get_include_path", "get_included_files", "get_loaded_extensions", "get_magic_quotes_gpc", "get_magic_quotes_runtime", "get_meta_tags", "get_object_vars", "get_parent_class", "get_required_files", "get_resource_type", "getallheaders", "getconstant", "getconstants", "getconstructor", "getcwd", "getdate", "getdefaultproperties", "getdoccomment", "getendline", "getenv", "getextension", "getextensionname", "getfilename", "gethostbyaddr", "gethostbyname", "gethostbynamel", "gethostname", "getimagesize", "getinterfacenames", "getinterfaces", "getlastmod", "getmethod", "getmethods", "getmodifiers", "getmxrr", "getmygid", "getmyinode", "getmypid", "getmyuid", "getname", "getnamespacename", "getopt", "getparentclass", "getproperties", "getproperty", "getprotobyname", "getprotobynumber", "getrandmax", "getrusage", "getservbyname", "getservbyport", "getshortname", "getstartline", "getstaticproperties", "getstaticpropertyvalue", "gettext", "gettimeofday", "gettype", "glob", "globiterator", "gmagick", "gmagickdraw", "gmagickpixel", "gmdate", "gmmktime", "gmp_abs", "gmp_add", "gmp_and", "gmp_clrbit", "gmp_cmp", "gmp_com", "gmp_div", "gmp_div_q", "gmp_div_qr", "gmp_div_r", "gmp_divexact", "gmp_fact", "gmp_gcd", "gmp_gcdext", "gmp_hamdist", "gmp_init", "gmp_intval", "gmp_invert", "gmp_jacobi", "gmp_legendre", "gmp_mod", "gmp_mul", "gmp_neg", "gmp_nextprime", "gmp_or", "gmp_perfect_square", "gmp_popcount", "gmp_pow", "gmp_powm", "gmp_prob_prime", "gmp_random", "gmp_scan0", "gmp_scan1", "gmp_setbit", "gmp_sign", "gmp_sqrt", "gmp_sqrtrem", "gmp_strval", "gmp_sub", "gmp_testbit", "gmp_xor", "gmstrftime", "gnupg_adddecryptkey", "gnupg_addencryptkey", "gnupg_addsignkey", "gnupg_cleardecryptkeys", "gnupg_clearencryptkeys", "gnupg_clearsignkeys", "gnupg_decrypt", "gnupg_decryptverify", "gnupg_encrypt", "gnupg_encryptsign", "gnupg_export", "gnupg_geterror", "gnupg_getprotocol", "gnupg_import", "gnupg_init", "gnupg_keyinfo", "gnupg_setarmor", "gnupg_seterrormode", "gnupg_setsignmode", "gnupg_sign", "gnupg_verify", "gopher_parsedir", "grapheme_extract", "grapheme_stripos", "grapheme_stristr", "grapheme_strlen", "grapheme_strpos", "grapheme_strripos", "grapheme_strrpos", "grapheme_strstr", "grapheme_substr", "gregoriantojd", "gupnp_context_get_host_ip", "gupnp_context_get_port", "gupnp_context_get_subscription_timeout", "gupnp_context_host_path", "gupnp_context_new", "gupnp_context_set_subscription_timeout", "gupnp_context_timeout_add", "gupnp_context_unhost_path", "gupnp_control_point_browse_start", "gupnp_control_point_browse_stop", "gupnp_control_point_callback_set", "gupnp_control_point_new", "gupnp_device_action_callback_set", "gupnp_device_info_get", "gupnp_device_info_get_service", "gupnp_root_device_get_available", "gupnp_root_device_get_relative_location", "gupnp_root_device_new", "gupnp_root_device_set_available", "gupnp_root_device_start", "gupnp_root_device_stop", "gupnp_service_action_get", "gupnp_service_action_return", "gupnp_service_action_return_error", "gupnp_service_action_set", "gupnp_service_freeze_notify", "gupnp_service_info_get", "gupnp_service_info_get_introspection", "gupnp_service_introspection_get_state_variable", "gupnp_service_notify", "gupnp_service_proxy_action_get", "gupnp_service_proxy_action_set", "gupnp_service_proxy_add_notify", "gupnp_service_proxy_callback_set", "gupnp_service_proxy_get_subscribed", "gupnp_service_proxy_remove_notify", "gupnp_service_proxy_set_subscribed", "gupnp_service_thaw_notify", "gzclose", "gzcompress", "gzdecode", "gzdeflate", "gzencode", "gzeof", "gzfile", "gzgetc", "gzgets", "gzgetss", "gzinflate", "gzopen", "gzpassthru", "gzputs", "gzread", "gzrewind", "gzseek", "gztell", "gzuncompress", "gzwrite", "halt_compiler", "haruannotation", "haruannotation_setborderstyle", "haruannotation_sethighlightmode", "haruannotation_seticon", "haruannotation_setopened", "harudestination", "harudestination_setfit", "harudestination_setfitb", "harudestination_setfitbh", "harudestination_setfitbv", "harudestination_setfith", "harudestination_setfitr", "harudestination_setfitv", "harudestination_setxyz", "harudoc", "harudoc_addpage", "harudoc_addpagelabel", "harudoc_construct", "harudoc_createoutline", "harudoc_getcurrentencoder", "harudoc_getcurrentpage", "harudoc_getencoder", "harudoc_getfont", "harudoc_getinfoattr", "harudoc_getpagelayout", "harudoc_getpagemode", "harudoc_getstreamsize", "harudoc_insertpage", "harudoc_loadjpeg", "harudoc_loadpng", "harudoc_loadraw", "harudoc_loadttc", "harudoc_loadttf", "harudoc_loadtype1", "harudoc_output", "harudoc_readfromstream", "harudoc_reseterror", "harudoc_resetstream", "harudoc_save", "harudoc_savetostream", "harudoc_setcompressionmode", "harudoc_setcurrentencoder", "harudoc_setencryptionmode", "harudoc_setinfoattr", "harudoc_setinfodateattr", "harudoc_setopenaction", "harudoc_setpagelayout", "harudoc_setpagemode", "harudoc_setpagesconfiguration", "harudoc_setpassword", "harudoc_setpermission", "harudoc_usecnsencodings", "harudoc_usecnsfonts", "harudoc_usecntencodings", "harudoc_usecntfonts", "harudoc_usejpencodings", "harudoc_usejpfonts", "harudoc_usekrencodings", "harudoc_usekrfonts", "haruencoder", "haruencoder_getbytetype", "haruencoder_gettype", "haruencoder_getunicode", "haruencoder_getwritingmode", "haruexception", "harufont", "harufont_getascent", "harufont_getcapheight", "harufont_getdescent", "harufont_getencodingname", "harufont_getfontname", "harufont_gettextwidth", "harufont_getunicodewidth", "harufont_getxheight", "harufont_measuretext", "haruimage", "haruimage_getbitspercomponent", "haruimage_getcolorspace", "haruimage_getheight", "haruimage_getsize", "haruimage_getwidth", "haruimage_setcolormask", "haruimage_setmaskimage", "haruoutline", "haruoutline_setdestination", "haruoutline_setopened", "harupage", "harupage_arc", "harupage_begintext", "harupage_circle", "harupage_closepath", "harupage_concat", "harupage_createdestination", "harupage_createlinkannotation", "harupage_createtextannotation", "harupage_createurlannotation", "harupage_curveto", "harupage_curveto2", "harupage_curveto3", "harupage_drawimage", "harupage_ellipse", "harupage_endpath", "harupage_endtext", "harupage_eofill", "harupage_eofillstroke", "harupage_fill", "harupage_fillstroke", "harupage_getcharspace", "harupage_getcmykfill", "harupage_getcmykstroke", "harupage_getcurrentfont", "harupage_getcurrentfontsize", "harupage_getcurrentpos", "harupage_getcurrenttextpos", "harupage_getdash", "harupage_getfillingcolorspace", "harupage_getflatness", "harupage_getgmode", "harupage_getgrayfill", "harupage_getgraystroke", "harupage_getheight", "harupage_gethorizontalscaling", "harupage_getlinecap", "harupage_getlinejoin", "harupage_getlinewidth", "harupage_getmiterlimit", "harupage_getrgbfill", "harupage_getrgbstroke", "harupage_getstrokingcolorspace", "harupage_gettextleading", "harupage_gettextmatrix", "harupage_gettextrenderingmode", "harupage_gettextrise", "harupage_gettextwidth", "harupage_gettransmatrix", "harupage_getwidth", "harupage_getwordspace", "harupage_lineto", "harupage_measuretext", "harupage_movetextpos", "harupage_moveto", "harupage_movetonextline", "harupage_rectangle", "harupage_setcharspace", "harupage_setcmykfill", "harupage_setcmykstroke", "harupage_setdash", "harupage_setflatness", "harupage_setfontandsize", "harupage_setgrayfill", "harupage_setgraystroke", "harupage_setheight", "harupage_sethorizontalscaling", "harupage_setlinecap", "harupage_setlinejoin", "harupage_setlinewidth", "harupage_setmiterlimit", "harupage_setrgbfill", "harupage_setrgbstroke", "harupage_setrotate", "harupage_setsize", "harupage_setslideshow", "harupage_settextleading", "harupage_settextmatrix", "harupage_settextrenderingmode", "harupage_settextrise", "harupage_setwidth", "harupage_setwordspace", "harupage_showtext", "harupage_showtextnextline", "harupage_stroke", "harupage_textout", "harupage_textrect", "hasconstant", "hash", "hash_algos", "hash_copy", "hash_file", "hash_final", "hash_hmac", "hash_hmac_file", "hash_init", "hash_update", "hash_update_file", "hash_update_stream", "hasmethod", "hasproperty", "header", "header_register_callback", "header_remove", "headers_list", "headers_sent", "hebrev", "hebrevc", "hex2bin", "hexdec", "highlight_file", "highlight_string", "html_entity_decode", "htmlentities", "htmlspecialchars", "htmlspecialchars_decode", "http_build_cookie", "http_build_query", "http_build_str", "http_build_url", "http_cache_etag", "http_cache_last_modified", "http_chunked_decode", "http_date", "http_deflate", "http_get", "http_get_request_body", "http_get_request_body_stream", "http_get_request_headers", "http_head", "http_inflate", "http_match_etag", "http_match_modified", "http_match_request_header", "http_negotiate_charset", "http_negotiate_content_type", "http_negotiate_language", "http_parse_cookie", "http_parse_headers", "http_parse_message", "http_parse_params", "http_persistent_handles_clean", "http_persistent_handles_count", "http_persistent_handles_ident", "http_post_data", "http_post_fields", "http_put_data", "http_put_file", "http_put_stream", "http_redirect", "http_request", "http_request_body_encode", "http_request_method_exists", "http_request_method_name", "http_request_method_register", "http_request_method_unregister", "http_response_code", "http_send_content_disposition", "http_send_content_type", "http_send_data", "http_send_file", "http_send_last_modified", "http_send_status", "http_send_stream", "http_support", "http_throttle", "httpdeflatestream", "httpdeflatestream_construct", "httpdeflatestream_factory", "httpdeflatestream_finish", "httpdeflatestream_flush", "httpdeflatestream_update", "httpinflatestream", "httpinflatestream_construct", "httpinflatestream_factory", "httpinflatestream_finish", "httpinflatestream_flush", "httpinflatestream_update", "httpmessage", "httpmessage_addheaders", "httpmessage_construct", "httpmessage_detach", "httpmessage_factory", "httpmessage_fromenv", "httpmessage_fromstring", "httpmessage_getbody", "httpmessage_getheader", "httpmessage_getheaders", "httpmessage_gethttpversion", "httpmessage_getparentmessage", "httpmessage_getrequestmethod", "httpmessage_getrequesturl", "httpmessage_getresponsecode", "httpmessage_getresponsestatus", "httpmessage_gettype", "httpmessage_guesscontenttype", "httpmessage_prepend", "httpmessage_reverse", "httpmessage_send", "httpmessage_setbody", "httpmessage_setheaders", "httpmessage_sethttpversion", "httpmessage_setrequestmethod", "httpmessage_setrequesturl", "httpmessage_setresponsecode", "httpmessage_setresponsestatus", "httpmessage_settype", "httpmessage_tomessagetypeobject", "httpmessage_tostring", "httpquerystring", "httpquerystring_construct", "httpquerystring_get", "httpquerystring_mod", "httpquerystring_set", "httpquerystring_singleton", "httpquerystring_toarray", "httpquerystring_tostring", "httpquerystring_xlate", "httprequest", "httprequest_addcookies", "httprequest_addheaders", "httprequest_addpostfields", "httprequest_addpostfile", "httprequest_addputdata", "httprequest_addquerydata", "httprequest_addrawpostdata", "httprequest_addssloptions", "httprequest_clearhistory", "httprequest_construct", "httprequest_enablecookies", "httprequest_getcontenttype", "httprequest_getcookies", "httprequest_getheaders", "httprequest_gethistory", "httprequest_getmethod", "httprequest_getoptions", "httprequest_getpostfields", "httprequest_getpostfiles", "httprequest_getputdata", "httprequest_getputfile", "httprequest_getquerydata", "httprequest_getrawpostdata", "httprequest_getrawrequestmessage", "httprequest_getrawresponsemessage", "httprequest_getrequestmessage", "httprequest_getresponsebody", "httprequest_getresponsecode", "httprequest_getresponsecookies", "httprequest_getresponsedata", "httprequest_getresponseheader", "httprequest_getresponseinfo", "httprequest_getresponsemessage", "httprequest_getresponsestatus", "httprequest_getssloptions", "httprequest_geturl", "httprequest_resetcookies", "httprequest_send", "httprequest_setcontenttype", "httprequest_setcookies", "httprequest_setheaders", "httprequest_setmethod", "httprequest_setoptions", "httprequest_setpostfields", "httprequest_setpostfiles", "httprequest_setputdata", "httprequest_setputfile", "httprequest_setquerydata", "httprequest_setrawpostdata", "httprequest_setssloptions", "httprequest_seturl", "httprequestpool", "httprequestpool_attach", "httprequestpool_construct", "httprequestpool_destruct", "httprequestpool_detach", "httprequestpool_getattachedrequests", "httprequestpool_getfinishedrequests", "httprequestpool_reset", "httprequestpool_send", "httprequestpool_socketperform", "httprequestpool_socketselect", "httpresponse", "httpresponse_capture", "httpresponse_getbuffersize", "httpresponse_getcache", "httpresponse_getcachecontrol", "httpresponse_getcontentdisposition", "httpresponse_getcontenttype", "httpresponse_getdata", "httpresponse_getetag", "httpresponse_getfile", "httpresponse_getgzip", "httpresponse_getheader", "httpresponse_getlastmodified", "httpresponse_getrequestbody", "httpresponse_getrequestbodystream", "httpresponse_getrequestheaders", "httpresponse_getstream", "httpresponse_getthrottledelay", "httpresponse_guesscontenttype", "httpresponse_redirect", "httpresponse_send", "httpresponse_setbuffersize", "httpresponse_setcache", "httpresponse_setcachecontrol", "httpresponse_setcontentdisposition", "httpresponse_setcontenttype", "httpresponse_setdata", "httpresponse_setetag", "httpresponse_setfile", "httpresponse_setgzip", "httpresponse_setheader", "httpresponse_setlastmodified", "httpresponse_setstream", "httpresponse_setthrottledelay", "httpresponse_status", "hw_array2objrec", "hw_changeobject", "hw_children", "hw_childrenobj", "hw_close", "hw_connect", "hw_connection_info", "hw_cp", "hw_deleteobject", "hw_docbyanchor", "hw_docbyanchorobj", "hw_document_attributes", "hw_document_bodytag", "hw_document_content", "hw_document_setcontent", "hw_document_size", "hw_dummy", "hw_edittext", "hw_error", "hw_errormsg", "hw_free_document", "hw_getanchors", "hw_getanchorsobj", "hw_getandlock", "hw_getchildcoll", "hw_getchildcollobj", "hw_getchilddoccoll", "hw_getchilddoccollobj", "hw_getobject", "hw_getobjectbyquery", "hw_getobjectbyquerycoll", "hw_getobjectbyquerycollobj", "hw_getobjectbyqueryobj", "hw_getparents", "hw_getparentsobj", "hw_getrellink", "hw_getremote", "hw_getremotechildren", "hw_getsrcbydestobj", "hw_gettext", "hw_getusername", "hw_identify", "hw_incollections", "hw_info", "hw_inscoll", "hw_insdoc", "hw_insertanchors", "hw_insertdocument", "hw_insertobject", "hw_mapid", "hw_modifyobject", "hw_mv", "hw_new_document", "hw_objrec2array", "hw_output_document", "hw_pconnect", "hw_pipedocument", "hw_root", "hw_setlinkroot", "hw_stat", "hw_unlock", "hw_who", "hwapi_attribute", "hwapi_attribute_key", "hwapi_attribute_langdepvalue", "hwapi_attribute_value", "hwapi_attribute_values", "hwapi_checkin", "hwapi_checkout", "hwapi_children", "hwapi_content", "hwapi_content_mimetype", "hwapi_content_read", "hwapi_copy", "hwapi_dbstat", "hwapi_dcstat", "hwapi_dstanchors", "hwapi_dstofsrcanchor", "hwapi_error_count", "hwapi_error_reason", "hwapi_find", "hwapi_ftstat", "hwapi_hgcsp", "hwapi_hwstat", "hwapi_identify", "hwapi_info", "hwapi_insert", "hwapi_insertanchor", "hwapi_insertcollection", "hwapi_insertdocument", "hwapi_link", "hwapi_lock", "hwapi_move", "hwapi_new_content", "hwapi_object", "hwapi_object_assign", "hwapi_object_attreditable", "hwapi_object_count", "hwapi_object_insert", "hwapi_object_new", "hwapi_object_remove", "hwapi_object_title", "hwapi_object_value", "hwapi_objectbyanchor", "hwapi_parents", "hwapi_reason_description", "hwapi_reason_type", "hwapi_remove", "hwapi_replace", "hwapi_setcommittedversion", "hwapi_srcanchors", "hwapi_srcsofdst", "hwapi_unlock", "hwapi_user", "hwapi_userlist", "hypot", "ibase_add_user", "ibase_affected_rows", "ibase_backup", "ibase_blob_add", "ibase_blob_cancel", "ibase_blob_close", "ibase_blob_create", "ibase_blob_echo", "ibase_blob_get", "ibase_blob_import", "ibase_blob_info", "ibase_blob_open", "ibase_close", "ibase_commit", "ibase_commit_ret", "ibase_connect", "ibase_db_info", "ibase_delete_user", "ibase_drop_db", "ibase_errcode", "ibase_errmsg", "ibase_execute", "ibase_fetch_assoc", "ibase_fetch_object", "ibase_fetch_row", "ibase_field_info", "ibase_free_event_handler", "ibase_free_query", "ibase_free_result", "ibase_gen_id", "ibase_maintain_db", "ibase_modify_user", "ibase_name_result", "ibase_num_fields", "ibase_num_params", "ibase_param_info", "ibase_pconnect", "ibase_prepare", "ibase_query", "ibase_restore", "ibase_rollback", "ibase_rollback_ret", "ibase_server_info", "ibase_service_attach", "ibase_service_detach", "ibase_set_event_handler", "ibase_timefmt", "ibase_trans", "ibase_wait_event", "iconv", "iconv_get_encoding", "iconv_mime_decode", "iconv_mime_decode_headers", "iconv_mime_encode", "iconv_set_encoding", "iconv_strlen", "iconv_strpos", "iconv_strrpos", "iconv_substr", "id3_get_frame_long_name", "id3_get_frame_short_name", "id3_get_genre_id", "id3_get_genre_list", "id3_get_genre_name", "id3_get_tag", "id3_get_version", "id3_remove_tag", "id3_set_tag", "id3v2attachedpictureframe", "id3v2frame", "id3v2tag", "idate", "idn_to_ascii", "idn_to_unicode", "idn_to_utf8", "ifx_affected_rows", "ifx_blobinfile_mode", "ifx_byteasvarchar", "ifx_close", "ifx_connect", "ifx_copy_blob", "ifx_create_blob", "ifx_create_char", "ifx_do", "ifx_error", "ifx_errormsg", "ifx_fetch_row", "ifx_fieldproperties", "ifx_fieldtypes", "ifx_free_blob", "ifx_free_char", "ifx_free_result", "ifx_get_blob", "ifx_get_char", "ifx_getsqlca", "ifx_htmltbl_result", "ifx_nullformat", "ifx_num_fields", "ifx_num_rows", "ifx_pconnect", "ifx_prepare", "ifx_query", "ifx_textasvarchar", "ifx_update_blob", "ifx_update_char", "ifxus_close_slob", "ifxus_create_slob", "ifxus_free_slob", "ifxus_open_slob", "ifxus_read_slob", "ifxus_seek_slob", "ifxus_tell_slob", "ifxus_write_slob", "ignore_user_abort", "iis_add_server", "iis_get_dir_security", "iis_get_script_map", "iis_get_server_by_comment", "iis_get_server_by_path", "iis_get_server_rights", "iis_get_service_state", "iis_remove_server", "iis_set_app_settings", "iis_set_dir_security", "iis_set_script_map", "iis_set_server_rights", "iis_start_server", "iis_start_service", "iis_stop_server", "iis_stop_service", "image2wbmp", "image_type_to_extension", "image_type_to_mime_type", "imagealphablending", "imageantialias", "imagearc", "imagechar", "imagecharup", "imagecolorallocate", "imagecolorallocatealpha", "imagecolorat", "imagecolorclosest", "imagecolorclosestalpha", "imagecolorclosesthwb", "imagecolordeallocate", "imagecolorexact", "imagecolorexactalpha", "imagecolormatch", "imagecolorresolve", "imagecolorresolvealpha", "imagecolorset", "imagecolorsforindex", "imagecolorstotal", "imagecolortransparent", "imageconvolution", "imagecopy", "imagecopymerge", "imagecopymergegray", "imagecopyresampled", "imagecopyresized", "imagecreate", "imagecreatefromgd", "imagecreatefromgd2", "imagecreatefromgd2part", "imagecreatefromgif", "imagecreatefromjpeg", "imagecreatefrompng", "imagecreatefromstring", "imagecreatefromwbmp", "imagecreatefromxbm", "imagecreatefromxpm", "imagecreatetruecolor", "imagedashedline", "imagedestroy", "imageellipse", "imagefill", "imagefilledarc", "imagefilledellipse", "imagefilledpolygon", "imagefilledrectangle", "imagefilltoborder", "imagefilter", "imagefontheight", "imagefontwidth", "imageftbbox", "imagefttext", "imagegammacorrect", "imagegd", "imagegd2", "imagegif", "imagegrabscreen", "imagegrabwindow", "imageinterlace", "imageistruecolor", "imagejpeg", "imagelayereffect", "imageline", "imageloadfont", "imagepalettecopy", "imagepng", "imagepolygon", "imagepsbbox", "imagepsencodefont", "imagepsextendfont", "imagepsfreefont", "imagepsloadfont", "imagepsslantfont", "imagepstext", "imagerectangle", "imagerotate", "imagesavealpha", "imagesetbrush", "imagesetpixel", "imagesetstyle", "imagesetthickness", "imagesettile", "imagestring", "imagestringup", "imagesx", "imagesy", "imagetruecolortopalette", "imagettfbbox", "imagettftext", "imagetypes", "imagewbmp", "imagexbm", "imagick", "imagick_adaptiveblurimage", "imagick_adaptiveresizeimage", "imagick_adaptivesharpenimage", "imagick_adaptivethresholdimage", "imagick_addimage", "imagick_addnoiseimage", "imagick_affinetransformimage", "imagick_animateimages", "imagick_annotateimage", "imagick_appendimages", "imagick_averageimages", "imagick_blackthresholdimage", "imagick_blurimage", "imagick_borderimage", "imagick_charcoalimage", "imagick_chopimage", "imagick_clear", "imagick_clipimage", "imagick_clippathimage", "imagick_clone", "imagick_clutimage", "imagick_coalesceimages", "imagick_colorfloodfillimage", "imagick_colorizeimage", "imagick_combineimages", "imagick_commentimage", "imagick_compareimagechannels", "imagick_compareimagelayers", "imagick_compareimages", "imagick_compositeimage", "imagick_construct", "imagick_contrastimage", "imagick_contraststretchimage", "imagick_convolveimage", "imagick_cropimage", "imagick_cropthumbnailimage", "imagick_current", "imagick_cyclecolormapimage", "imagick_decipherimage", "imagick_deconstructimages", "imagick_deleteimageartifact", "imagick_despeckleimage", "imagick_destroy", "imagick_displayimage", "imagick_displayimages", "imagick_distortimage", "imagick_drawimage", "imagick_edgeimage", "imagick_embossimage", "imagick_encipherimage", "imagick_enhanceimage", "imagick_equalizeimage", "imagick_evaluateimage", "imagick_extentimage", "imagick_flattenimages", "imagick_flipimage", "imagick_floodfillpaintimage", "imagick_flopimage", "imagick_frameimage", "imagick_fximage", "imagick_gammaimage", "imagick_gaussianblurimage", "imagick_getcolorspace", "imagick_getcompression", "imagick_getcompressionquality", "imagick_getcopyright", "imagick_getfilename", "imagick_getfont", "imagick_getformat", "imagick_getgravity", "imagick_gethomeurl", "imagick_getimage", "imagick_getimagealphachannel", "imagick_getimageartifact", "imagick_getimagebackgroundcolor", "imagick_getimageblob", "imagick_getimageblueprimary", "imagick_getimagebordercolor", "imagick_getimagechanneldepth", "imagick_getimagechanneldistortion", "imagick_getimagechanneldistortions", "imagick_getimagechannelextrema", "imagick_getimagechannelmean", "imagick_getimagechannelrange", "imagick_getimagechannelstatistics", "imagick_getimageclipmask", "imagick_getimagecolormapcolor", "imagick_getimagecolors", "imagick_getimagecolorspace", "imagick_getimagecompose", "imagick_getimagecompression", "imagick_getimagecompressionquality", "imagick_getimagedelay", "imagick_getimagedepth", "imagick_getimagedispose", "imagick_getimagedistortion", "imagick_getimageextrema", "imagick_getimagefilename", "imagick_getimageformat", "imagick_getimagegamma", "imagick_getimagegeometry", "imagick_getimagegravity", "imagick_getimagegreenprimary", "imagick_getimageheight", "imagick_getimagehistogram", "imagick_getimageindex", "imagick_getimageinterlacescheme", "imagick_getimageinterpolatemethod", "imagick_getimageiterations", "imagick_getimagelength", "imagick_getimagemagicklicense", "imagick_getimagematte", "imagick_getimagemattecolor", "imagick_getimageorientation", "imagick_getimagepage", "imagick_getimagepixelcolor", "imagick_getimageprofile", "imagick_getimageprofiles", "imagick_getimageproperties", "imagick_getimageproperty", "imagick_getimageredprimary", "imagick_getimageregion", "imagick_getimagerenderingintent", "imagick_getimageresolution", "imagick_getimagesblob", "imagick_getimagescene", "imagick_getimagesignature", "imagick_getimagesize", "imagick_getimagetickspersecond", "imagick_getimagetotalinkdensity", "imagick_getimagetype", "imagick_getimageunits", "imagick_getimagevirtualpixelmethod", "imagick_getimagewhitepoint", "imagick_getimagewidth", "imagick_getinterlacescheme", "imagick_getiteratorindex", "imagick_getnumberimages", "imagick_getoption", "imagick_getpackagename", "imagick_getpage", "imagick_getpixeliterator", "imagick_getpixelregioniterator", "imagick_getpointsize", "imagick_getquantumdepth", "imagick_getquantumrange", "imagick_getreleasedate", "imagick_getresource", "imagick_getresourcelimit", "imagick_getsamplingfactors", "imagick_getsize", "imagick_getsizeoffset", "imagick_getversion", "imagick_hasnextimage", "imagick_haspreviousimage", "imagick_identifyimage", "imagick_implodeimage", "imagick_labelimage", "imagick_levelimage", "imagick_linearstretchimage", "imagick_liquidrescaleimage", "imagick_magnifyimage", "imagick_mapimage", "imagick_mattefloodfillimage", "imagick_medianfilterimage", "imagick_mergeimagelayers", "imagick_minifyimage", "imagick_modulateimage", "imagick_montageimage", "imagick_morphimages", "imagick_mosaicimages", "imagick_motionblurimage", "imagick_negateimage", "imagick_newimage", "imagick_newpseudoimage", "imagick_nextimage", "imagick_normalizeimage", "imagick_oilpaintimage", "imagick_opaquepaintimage", "imagick_optimizeimagelayers", "imagick_orderedposterizeimage", "imagick_paintfloodfillimage", "imagick_paintopaqueimage", "imagick_painttransparentimage", "imagick_pingimage", "imagick_pingimageblob", "imagick_pingimagefile", "imagick_polaroidimage", "imagick_posterizeimage", "imagick_previewimages", "imagick_previousimage", "imagick_profileimage", "imagick_quantizeimage", "imagick_quantizeimages", "imagick_queryfontmetrics", "imagick_queryfonts", "imagick_queryformats", "imagick_radialblurimage", "imagick_raiseimage", "imagick_randomthresholdimage", "imagick_readimage", "imagick_readimageblob", "imagick_readimagefile", "imagick_recolorimage", "imagick_reducenoiseimage", "imagick_removeimage", "imagick_removeimageprofile", "imagick_render", "imagick_resampleimage", "imagick_resetimagepage", "imagick_resizeimage", "imagick_rollimage", "imagick_rotateimage", "imagick_roundcorners", "imagick_sampleimage", "imagick_scaleimage", "imagick_separateimagechannel", "imagick_sepiatoneimage", "imagick_setbackgroundcolor", "imagick_setcolorspace", "imagick_setcompression", "imagick_setcompressionquality", "imagick_setfilename", "imagick_setfirstiterator", "imagick_setfont", "imagick_setformat", "imagick_setgravity", "imagick_setimage", "imagick_setimagealphachannel", "imagick_setimageartifact", "imagick_setimagebackgroundcolor", "imagick_setimagebias", "imagick_setimageblueprimary", "imagick_setimagebordercolor", "imagick_setimagechanneldepth", "imagick_setimageclipmask", "imagick_setimagecolormapcolor", "imagick_setimagecolorspace", "imagick_setimagecompose", "imagick_setimagecompression", "imagick_setimagecompressionquality", "imagick_setimagedelay", "imagick_setimagedepth", "imagick_setimagedispose", "imagick_setimageextent", "imagick_setimagefilename", "imagick_setimageformat", "imagick_setimagegamma", "imagick_setimagegravity", "imagick_setimagegreenprimary", "imagick_setimageindex", "imagick_setimageinterlacescheme", "imagick_setimageinterpolatemethod", "imagick_setimageiterations", "imagick_setimagematte", "imagick_setimagemattecolor", "imagick_setimageopacity", "imagick_setimageorientation", "imagick_setimagepage", "imagick_setimageprofile", "imagick_setimageproperty", "imagick_setimageredprimary", "imagick_setimagerenderingintent", "imagick_setimageresolution", "imagick_setimagescene", "imagick_setimagetickspersecond", "imagick_setimagetype", "imagick_setimageunits", "imagick_setimagevirtualpixelmethod", "imagick_setimagewhitepoint", "imagick_setinterlacescheme", "imagick_setiteratorindex", "imagick_setlastiterator", "imagick_setoption", "imagick_setpage", "imagick_setpointsize", "imagick_setresolution", "imagick_setresourcelimit", "imagick_setsamplingfactors", "imagick_setsize", "imagick_setsizeoffset", "imagick_settype", "imagick_shadeimage", "imagick_shadowimage", "imagick_sharpenimage", "imagick_shaveimage", "imagick_shearimage", "imagick_sigmoidalcontrastimage", "imagick_sketchimage", "imagick_solarizeimage", "imagick_spliceimage", "imagick_spreadimage", "imagick_steganoimage", "imagick_stereoimage", "imagick_stripimage", "imagick_swirlimage", "imagick_textureimage", "imagick_thresholdimage", "imagick_thumbnailimage", "imagick_tintimage", "imagick_transformimage", "imagick_transparentpaintimage", "imagick_transposeimage", "imagick_transverseimage", "imagick_trimimage", "imagick_uniqueimagecolors", "imagick_unsharpmaskimage", "imagick_valid", "imagick_vignetteimage", "imagick_waveimage", "imagick_whitethresholdimage", "imagick_writeimage", "imagick_writeimagefile", "imagick_writeimages", "imagick_writeimagesfile", "imagickdraw", "imagickdraw_affine", "imagickdraw_annotation", "imagickdraw_arc", "imagickdraw_bezier", "imagickdraw_circle", "imagickdraw_clear", "imagickdraw_clone", "imagickdraw_color", "imagickdraw_comment", "imagickdraw_composite", "imagickdraw_construct", "imagickdraw_destroy", "imagickdraw_ellipse", "imagickdraw_getclippath", "imagickdraw_getcliprule", "imagickdraw_getclipunits", "imagickdraw_getfillcolor", "imagickdraw_getfillopacity", "imagickdraw_getfillrule", "imagickdraw_getfont", "imagickdraw_getfontfamily", "imagickdraw_getfontsize", "imagickdraw_getfontstyle", "imagickdraw_getfontweight", "imagickdraw_getgravity", "imagickdraw_getstrokeantialias", "imagickdraw_getstrokecolor", "imagickdraw_getstrokedasharray", "imagickdraw_getstrokedashoffset", "imagickdraw_getstrokelinecap", "imagickdraw_getstrokelinejoin", "imagickdraw_getstrokemiterlimit", "imagickdraw_getstrokeopacity", "imagickdraw_getstrokewidth", "imagickdraw_gettextalignment", "imagickdraw_gettextantialias", "imagickdraw_gettextdecoration", "imagickdraw_gettextencoding", "imagickdraw_gettextundercolor", "imagickdraw_getvectorgraphics", "imagickdraw_line", "imagickdraw_matte", "imagickdraw_pathclose", "imagickdraw_pathcurvetoabsolute", "imagickdraw_pathcurvetoquadraticbezierabsolute", "imagickdraw_pathcurvetoquadraticbezierrelative", "imagickdraw_pathcurvetoquadraticbeziersmoothabsolute", "imagickdraw_pathcurvetoquadraticbeziersmoothrelative", "imagickdraw_pathcurvetorelative", "imagickdraw_pathcurvetosmoothabsolute", "imagickdraw_pathcurvetosmoothrelative", "imagickdraw_pathellipticarcabsolute", "imagickdraw_pathellipticarcrelative", "imagickdraw_pathfinish", "imagickdraw_pathlinetoabsolute", "imagickdraw_pathlinetohorizontalabsolute", "imagickdraw_pathlinetohorizontalrelative", "imagickdraw_pathlinetorelative", "imagickdraw_pathlinetoverticalabsolute", "imagickdraw_pathlinetoverticalrelative", "imagickdraw_pathmovetoabsolute", "imagickdraw_pathmovetorelative", "imagickdraw_pathstart", "imagickdraw_point", "imagickdraw_polygon", "imagickdraw_polyline", "imagickdraw_pop", "imagickdraw_popclippath", "imagickdraw_popdefs", "imagickdraw_poppattern", "imagickdraw_push", "imagickdraw_pushclippath", "imagickdraw_pushdefs", "imagickdraw_pushpattern", "imagickdraw_rectangle", "imagickdraw_render", "imagickdraw_rotate", "imagickdraw_roundrectangle", "imagickdraw_scale", "imagickdraw_setclippath", "imagickdraw_setcliprule", "imagickdraw_setclipunits", "imagickdraw_setfillalpha", "imagickdraw_setfillcolor", "imagickdraw_setfillopacity", "imagickdraw_setfillpatternurl", "imagickdraw_setfillrule", "imagickdraw_setfont", "imagickdraw_setfontfamily", "imagickdraw_setfontsize", "imagickdraw_setfontstretch", "imagickdraw_setfontstyle", "imagickdraw_setfontweight", "imagickdraw_setgravity", "imagickdraw_setstrokealpha", "imagickdraw_setstrokeantialias", "imagickdraw_setstrokecolor", "imagickdraw_setstrokedasharray", "imagickdraw_setstrokedashoffset", "imagickdraw_setstrokelinecap", "imagickdraw_setstrokelinejoin", "imagickdraw_setstrokemiterlimit", "imagickdraw_setstrokeopacity", "imagickdraw_setstrokepatternurl", "imagickdraw_setstrokewidth", "imagickdraw_settextalignment", "imagickdraw_settextantialias", "imagickdraw_settextdecoration", "imagickdraw_settextencoding", "imagickdraw_settextundercolor", "imagickdraw_setvectorgraphics", "imagickdraw_setviewbox", "imagickdraw_skewx", "imagickdraw_skewy", "imagickdraw_translate", "imagickpixel", "imagickpixel_clear", "imagickpixel_construct", "imagickpixel_destroy", "imagickpixel_getcolor", "imagickpixel_getcolorasstring", "imagickpixel_getcolorcount", "imagickpixel_getcolorvalue", "imagickpixel_gethsl", "imagickpixel_issimilar", "imagickpixel_setcolor", "imagickpixel_setcolorvalue", "imagickpixel_sethsl", "imagickpixeliterator", "imagickpixeliterator_clear", "imagickpixeliterator_construct", "imagickpixeliterator_destroy", "imagickpixeliterator_getcurrentiteratorrow", "imagickpixeliterator_getiteratorrow", "imagickpixeliterator_getnextiteratorrow", "imagickpixeliterator_getpreviousiteratorrow", "imagickpixeliterator_newpixeliterator", "imagickpixeliterator_newpixelregioniterator", "imagickpixeliterator_resetiterator", "imagickpixeliterator_setiteratorfirstrow", "imagickpixeliterator_setiteratorlastrow", "imagickpixeliterator_setiteratorrow", "imagickpixeliterator_synciterator", "imap_8bit", "imap_alerts", "imap_append", "imap_base64", "imap_binary", "imap_body", "imap_bodystruct", "imap_check", "imap_clearflag_full", "imap_close", "imap_create", "imap_createmailbox", "imap_delete", "imap_deletemailbox", "imap_errors", "imap_expunge", "imap_fetch_overview", "imap_fetchbody", "imap_fetchheader", "imap_fetchmime", "imap_fetchstructure", "imap_fetchtext", "imap_gc", "imap_get_quota", "imap_get_quotaroot", "imap_getacl", "imap_getmailboxes", "imap_getsubscribed", "imap_header", "imap_headerinfo", "imap_headers", "imap_last_error", "imap_list", "imap_listmailbox", "imap_listscan", "imap_listsubscribed", "imap_lsub", "imap_mail", "imap_mail_compose", "imap_mail_copy", "imap_mail_move", "imap_mailboxmsginfo", "imap_mime_header_decode", "imap_msgno", "imap_num_msg", "imap_num_recent", "imap_open", "imap_ping", "imap_qprint", "imap_rename", "imap_renamemailbox", "imap_reopen", "imap_rfc822_parse_adrlist", "imap_rfc822_parse_headers", "imap_rfc822_write_address", "imap_savebody", "imap_scan", "imap_scanmailbox", "imap_search", "imap_set_quota", "imap_setacl", "imap_setflag_full", "imap_sort", "imap_status", "imap_subscribe", "imap_thread", "imap_timeout", "imap_uid", "imap_undelete", "imap_unsubscribe", "imap_utf7_decode", "imap_utf7_encode", "imap_utf8", "implementsinterface", "implode", "import_request_variables", "in_array", "include", "include_once", "inclued_get_data", "inet_ntop", "inet_pton", "infiniteiterator", "ingres_autocommit", "ingres_autocommit_state", "ingres_charset", "ingres_close", "ingres_commit", "ingres_connect", "ingres_cursor", "ingres_errno", "ingres_error", "ingres_errsqlstate", "ingres_escape_string", "ingres_execute", "ingres_fetch_array", "ingres_fetch_assoc", "ingres_fetch_object", "ingres_fetch_proc_return", "ingres_fetch_row", "ingres_field_length", "ingres_field_name", "ingres_field_nullable", "ingres_field_precision", "ingres_field_scale", "ingres_field_type", "ingres_free_result", "ingres_next_error", "ingres_num_fields", "ingres_num_rows", "ingres_pconnect", "ingres_prepare", "ingres_query", "ingres_result_seek", "ingres_rollback", "ingres_set_environment", "ingres_unbuffered_query", "ini_alter", "ini_get", "ini_get_all", "ini_restore", "ini_set", "innamespace", "inotify_add_watch", "inotify_init", "inotify_queue_len", "inotify_read", "inotify_rm_watch", "interface_exists", "intl_error_name", "intl_get_error_code", "intl_get_error_message", "intl_is_failure", "intldateformatter", "intval", "invalidargumentexception", "invoke", "invokeargs", "ip2long", "iptcembed", "iptcparse", "is_a", "is_array", "is_bool", "is_callable", "is_dir", "is_double", "is_executable", "is_file", "is_finite", "is_float", "is_infinite", "is_int", "is_integer", "is_link", "is_long", "is_nan", "is_null", "is_numeric", "is_object", "is_readable", "is_real", "is_resource", "is_scalar", "is_soap_fault", "is_string", "is_subclass_of", "is_uploaded_file", "is_writable", "is_writeable", "isabstract", "iscloneable", "isdisabled", "isfinal", "isinstance", "isinstantiable", "isinterface", "isinternal", "isiterateable", "isset", "issubclassof", "isuserdefined", "iterator", "iterator_apply", "iterator_count", "iterator_to_array", "iteratoraggregate", "iteratoriterator", "java_last_exception_clear", "java_last_exception_get", "jddayofweek", "jdmonthname", "jdtofrench", "jdtogregorian", "jdtojewish", "jdtojulian", "jdtounix", "jewishtojd", "join", "jpeg2wbmp", "json_decode", "json_encode", "json_last_error", "jsonserializable", "judy", "judy_type", "judy_version", "juliantojd", "kadm5_chpass_principal", "kadm5_create_principal", "kadm5_delete_principal", "kadm5_destroy", "kadm5_flush", "kadm5_get_policies", "kadm5_get_principal", "kadm5_get_principals", "kadm5_init_with_password", "kadm5_modify_principal", "key", "krsort", "ksort", "lcfirst", "lcg_value", "lchgrp", "lchown", "ldap_8859_to_t61", "ldap_add", "ldap_bind", "ldap_close", "ldap_compare", "ldap_connect", "ldap_count_entries", "ldap_delete", "ldap_dn2ufn", "ldap_err2str", "ldap_errno", "ldap_error", "ldap_explode_dn", "ldap_first_attribute", "ldap_first_entry", "ldap_first_reference", "ldap_free_result", "ldap_get_attributes", "ldap_get_dn", "ldap_get_entries", "ldap_get_option", "ldap_get_values", "ldap_get_values_len", "ldap_list", "ldap_mod_add", "ldap_mod_del", "ldap_mod_replace", "ldap_modify", "ldap_next_attribute", "ldap_next_entry", "ldap_next_reference", "ldap_parse_reference", "ldap_parse_result", "ldap_read", "ldap_rename", "ldap_sasl_bind", "ldap_search", "ldap_set_option", "ldap_set_rebind_proc", "ldap_sort", "ldap_start_tls", "ldap_t61_to_8859", "ldap_unbind", "lengthexception", "levenshtein", "libxml_clear_errors", "libxml_disable_entity_loader", "libxml_get_errors", "libxml_get_last_error", "libxml_set_streams_context", "libxml_use_internal_errors", "libxmlerror", "limititerator", "link", "linkinfo", "list", "locale", "localeconv", "localtime", "log", "log10", "log1p", "logicexception", "long2ip", "lstat", "ltrim", "lzf_compress", "lzf_decompress", "lzf_optimized_for", "m_checkstatus", "m_completeauthorizations", "m_connect", "m_connectionerror", "m_deletetrans", "m_destroyconn", "m_destroyengine", "m_getcell", "m_getcellbynum", "m_getcommadelimited", "m_getheader", "m_initconn", "m_initengine", "m_iscommadelimited", "m_maxconntimeout", "m_monitor", "m_numcolumns", "m_numrows", "m_parsecommadelimited", "m_responsekeys", "m_responseparam", "m_returnstatus", "m_setblocking", "m_setdropfile", "m_setip", "m_setssl", "m_setssl_cafile", "m_setssl_files", "m_settimeout", "m_sslcert_gen_hash", "m_transactionssent", "m_transinqueue", "m_transkeyval", "m_transnew", "m_transsend", "m_uwait", "m_validateidentifier", "m_verifyconnection", "m_verifysslcert", "magic_quotes_runtime", "mail", "mailparse_determine_best_xfer_encoding", "mailparse_msg_create", "mailparse_msg_extract_part", "mailparse_msg_extract_part_file", "mailparse_msg_extract_whole_part_file", "mailparse_msg_free", "mailparse_msg_get_part", "mailparse_msg_get_part_data", "mailparse_msg_get_structure", "mailparse_msg_parse", "mailparse_msg_parse_file", "mailparse_rfc822_parse_addresses", "mailparse_stream_encode", "mailparse_uudecode_all", "main", "max", "maxdb_affected_rows", "maxdb_autocommit", "maxdb_bind_param", "maxdb_bind_result", "maxdb_change_user", "maxdb_character_set_name", "maxdb_client_encoding", "maxdb_close", "maxdb_close_long_data", "maxdb_commit", "maxdb_connect", "maxdb_connect_errno", "maxdb_connect_error", "maxdb_data_seek", "maxdb_debug", "maxdb_disable_reads_from_master", "maxdb_disable_rpl_parse", "maxdb_dump_debug_info", "maxdb_embedded_connect", "maxdb_enable_reads_from_master", "maxdb_enable_rpl_parse", "maxdb_errno", "maxdb_error", "maxdb_escape_string", "maxdb_execute", "maxdb_fetch", "maxdb_fetch_array", "maxdb_fetch_assoc", "maxdb_fetch_field", "maxdb_fetch_field_direct", "maxdb_fetch_fields", "maxdb_fetch_lengths", "maxdb_fetch_object", "maxdb_fetch_row", "maxdb_field_count", "maxdb_field_seek", "maxdb_field_tell", "maxdb_free_result", "maxdb_get_client_info", "maxdb_get_client_version", "maxdb_get_host_info", "maxdb_get_metadata", "maxdb_get_proto_info", "maxdb_get_server_info", "maxdb_get_server_version", "maxdb_info", "maxdb_init", "maxdb_insert_id", "maxdb_kill", "maxdb_master_query", "maxdb_more_results", "maxdb_multi_query", "maxdb_next_result", "maxdb_num_fields", "maxdb_num_rows", "maxdb_options", "maxdb_param_count", "maxdb_ping", "maxdb_prepare", "maxdb_query", "maxdb_real_connect", "maxdb_real_escape_string", "maxdb_real_query", "maxdb_report", "maxdb_rollback", "maxdb_rpl_parse_enabled", "maxdb_rpl_probe", "maxdb_rpl_query_type", "maxdb_select_db", "maxdb_send_long_data", "maxdb_send_query", "maxdb_server_end", "maxdb_server_init", "maxdb_set_opt", "maxdb_sqlstate", "maxdb_ssl_set", "maxdb_stat", "maxdb_stmt_affected_rows", "maxdb_stmt_bind_param", "maxdb_stmt_bind_result", "maxdb_stmt_close", "maxdb_stmt_close_long_data", "maxdb_stmt_data_seek", "maxdb_stmt_errno", "maxdb_stmt_error", "maxdb_stmt_execute", "maxdb_stmt_fetch", "maxdb_stmt_free_result", "maxdb_stmt_init", "maxdb_stmt_num_rows", "maxdb_stmt_param_count", "maxdb_stmt_prepare", "maxdb_stmt_reset", "maxdb_stmt_result_metadata", "maxdb_stmt_send_long_data", "maxdb_stmt_sqlstate", "maxdb_stmt_store_result", "maxdb_store_result", "maxdb_thread_id", "maxdb_thread_safe", "maxdb_use_result", "maxdb_warning_count", "mb_check_encoding", "mb_convert_case", "mb_convert_encoding", "mb_convert_kana", "mb_convert_variables", "mb_decode_mimeheader", "mb_decode_numericentity", "mb_detect_encoding", "mb_detect_order", "mb_encode_mimeheader", "mb_encode_numericentity", "mb_encoding_aliases", "mb_ereg", "mb_ereg_match", "mb_ereg_replace", "mb_ereg_search", "mb_ereg_search_getpos", "mb_ereg_search_getregs", "mb_ereg_search_init", "mb_ereg_search_pos", "mb_ereg_search_regs", "mb_ereg_search_setpos", "mb_eregi", "mb_eregi_replace", "mb_get_info", "mb_http_input", "mb_http_output", "mb_internal_encoding", "mb_language", "mb_list_encodings", "mb_output_handler", "mb_parse_str", "mb_preferred_mime_name", "mb_regex_encoding", "mb_regex_set_options", "mb_send_mail", "mb_split", "mb_strcut", "mb_strimwidth", "mb_stripos", "mb_stristr", "mb_strlen", "mb_strpos", "mb_strrchr", "mb_strrichr", "mb_strripos", "mb_strrpos", "mb_strstr", "mb_strtolower", "mb_strtoupper", "mb_strwidth", "mb_substitute_character", "mb_substr", "mb_substr_count", "mcrypt_cbc", "mcrypt_cfb", "mcrypt_create_iv", "mcrypt_decrypt", "mcrypt_ecb", "mcrypt_enc_get_algorithms_name", "mcrypt_enc_get_block_size", "mcrypt_enc_get_iv_size", "mcrypt_enc_get_key_size", "mcrypt_enc_get_modes_name", "mcrypt_enc_get_supported_key_sizes", "mcrypt_enc_is_block_algorithm", "mcrypt_enc_is_block_algorithm_mode", "mcrypt_enc_is_block_mode", "mcrypt_enc_self_test", "mcrypt_encrypt", "mcrypt_generic", "mcrypt_generic_deinit", "mcrypt_generic_end", "mcrypt_generic_init", "mcrypt_get_block_size", "mcrypt_get_cipher_name", "mcrypt_get_iv_size", "mcrypt_get_key_size", "mcrypt_list_algorithms", "mcrypt_list_modes", "mcrypt_module_close", "mcrypt_module_get_algo_block_size", "mcrypt_module_get_algo_key_size", "mcrypt_module_get_supported_key_sizes", "mcrypt_module_is_block_algorithm", "mcrypt_module_is_block_algorithm_mode", "mcrypt_module_is_block_mode", "mcrypt_module_open", "mcrypt_module_self_test", "mcrypt_ofb", "md5", "md5_file", "mdecrypt_generic", "memcache", "memcache_debug", "memcached", "memory_get_peak_usage", "memory_get_usage", "messageformatter", "metaphone", "method_exists", "mhash", "mhash_count", "mhash_get_block_size", "mhash_get_hash_name", "mhash_keygen_s2k", "microtime", "mime_content_type", "min", "ming_keypress", "ming_setcubicthreshold", "ming_setscale", "ming_setswfcompression", "ming_useconstants", "ming_useswfversion", "mkdir", "mktime", "money_format", "mongo", "mongobindata", "mongocode", "mongocollection", "mongoconnectionexception", "mongocursor", "mongocursorexception", "mongocursortimeoutexception", "mongodate", "mongodb", "mongodbref", "mongoexception", "mongogridfs", "mongogridfscursor", "mongogridfsexception", "mongogridfsfile", "mongoid", "mongoint32", "mongoint64", "mongomaxkey", "mongominkey", "mongoregex", "mongotimestamp", "move_uploaded_file", "mpegfile", "mqseries_back", "mqseries_begin", "mqseries_close", "mqseries_cmit", "mqseries_conn", "mqseries_connx", "mqseries_disc", "mqseries_get", "mqseries_inq", "mqseries_open", "mqseries_put", "mqseries_put1", "mqseries_set", "mqseries_strerror", "msession_connect", "msession_count", "msession_create", "msession_destroy", "msession_disconnect", "msession_find", "msession_get", "msession_get_array", "msession_get_data", "msession_inc", "msession_list", "msession_listvar", "msession_lock", "msession_plugin", "msession_randstr", "msession_set", "msession_set_array", "msession_set_data", "msession_timeout", "msession_uniq", "msession_unlock", "msg_get_queue", "msg_queue_exists", "msg_receive", "msg_remove_queue", "msg_send", "msg_set_queue", "msg_stat_queue", "msql", "msql_affected_rows", "msql_close", "msql_connect", "msql_create_db", "msql_createdb", "msql_data_seek", "msql_db_query", "msql_dbname", "msql_drop_db", "msql_error", "msql_fetch_array", "msql_fetch_field", "msql_fetch_object", "msql_fetch_row", "msql_field_flags", "msql_field_len", "msql_field_name", "msql_field_seek", "msql_field_table", "msql_field_type", "msql_fieldflags", "msql_fieldlen", "msql_fieldname", "msql_fieldtable", "msql_fieldtype", "msql_free_result", "msql_list_dbs", "msql_list_fields", "msql_list_tables", "msql_num_fields", "msql_num_rows", "msql_numfields", "msql_numrows", "msql_pconnect", "msql_query", "msql_regcase", "msql_result", "msql_select_db", "msql_tablename", "mssql_bind", "mssql_close", "mssql_connect", "mssql_data_seek", "mssql_execute", "mssql_fetch_array", "mssql_fetch_assoc", "mssql_fetch_batch", "mssql_fetch_field", "mssql_fetch_object", "mssql_fetch_row", "mssql_field_length", "mssql_field_name", "mssql_field_seek", "mssql_field_type", "mssql_free_result", "mssql_free_statement", "mssql_get_last_message", "mssql_guid_string", "mssql_init", "mssql_min_error_severity", "mssql_min_message_severity", "mssql_next_result", "mssql_num_fields", "mssql_num_rows", "mssql_pconnect", "mssql_query", "mssql_result", "mssql_rows_affected", "mssql_select_db", "mt_getrandmax", "mt_rand", "mt_srand", "multipleiterator", "mysql_affected_rows", "mysql_client_encoding", "mysql_close", "mysql_connect", "mysql_create_db", "mysql_data_seek", "mysql_db_name", "mysql_db_query", "mysql_drop_db", "mysql_errno", "mysql_error", "mysql_escape_string", "mysql_fetch_array", "mysql_fetch_assoc", "mysql_fetch_field", "mysql_fetch_lengths", "mysql_fetch_object", "mysql_fetch_row", "mysql_field_flags", "mysql_field_len", "mysql_field_name", "mysql_field_seek", "mysql_field_table", "mysql_field_type", "mysql_free_result", "mysql_get_client_info", "mysql_get_host_info", "mysql_get_proto_info", "mysql_get_server_info", "mysql_info", "mysql_insert_id", "mysql_list_dbs", "mysql_list_fields", "mysql_list_processes", "mysql_list_tables", "mysql_num_fields", "mysql_num_rows", "mysql_pconnect", "mysql_ping", "mysql_query", "mysql_real_escape_string", "mysql_result", "mysql_select_db", "mysql_set_charset", "mysql_stat", "mysql_tablename", "mysql_thread_id", "mysql_unbuffered_query", "mysqli", "mysqli_bind_param", "mysqli_bind_result", "mysqli_client_encoding", "mysqli_connect", "mysqli_disable_reads_from_master", "mysqli_disable_rpl_parse", "mysqli_driver", "mysqli_enable_reads_from_master", "mysqli_enable_rpl_parse", "mysqli_escape_string", "mysqli_execute", "mysqli_fetch", "mysqli_get_metadata", "mysqli_master_query", "mysqli_param_count", "mysqli_report", "mysqli_result", "mysqli_rpl_parse_enabled", "mysqli_rpl_probe", "mysqli_rpl_query_type", "mysqli_send_long_data", "mysqli_send_query", "mysqli_set_opt", "mysqli_slave_query", "mysqli_stmt", "mysqli_warning", "mysqlnd_ms_get_stats", "mysqlnd_ms_query_is_select", "mysqlnd_ms_set_user_pick_server", "mysqlnd_qc_change_handler", "mysqlnd_qc_clear_cache", "mysqlnd_qc_get_cache_info", "mysqlnd_qc_get_core_stats", "mysqlnd_qc_get_handler", "mysqlnd_qc_get_query_trace_log", "mysqlnd_qc_set_user_handlers", "natcasesort", "natsort", "ncurses_addch", "ncurses_addchnstr", "ncurses_addchstr", "ncurses_addnstr", "ncurses_addstr", "ncurses_assume_default_colors", "ncurses_attroff", "ncurses_attron", "ncurses_attrset", "ncurses_baudrate", "ncurses_beep", "ncurses_bkgd", "ncurses_bkgdset", "ncurses_border", "ncurses_bottom_panel", "ncurses_can_change_color", "ncurses_cbreak", "ncurses_clear", "ncurses_clrtobot", "ncurses_clrtoeol", "ncurses_color_content", "ncurses_color_set", "ncurses_curs_set", "ncurses_def_prog_mode", "ncurses_def_shell_mode", "ncurses_define_key", "ncurses_del_panel", "ncurses_delay_output", "ncurses_delch", "ncurses_deleteln", "ncurses_delwin", "ncurses_doupdate", "ncurses_echo", "ncurses_echochar", "ncurses_end", "ncurses_erase", "ncurses_erasechar", "ncurses_filter", "ncurses_flash", "ncurses_flushinp", "ncurses_getch", "ncurses_getmaxyx", "ncurses_getmouse", "ncurses_getyx", "ncurses_halfdelay", "ncurses_has_colors", "ncurses_has_ic", "ncurses_has_il", "ncurses_has_key", "ncurses_hide_panel", "ncurses_hline", "ncurses_inch", "ncurses_init", "ncurses_init_color", "ncurses_init_pair", "ncurses_insch", "ncurses_insdelln", "ncurses_insertln", "ncurses_insstr", "ncurses_instr", "ncurses_isendwin", "ncurses_keyok", "ncurses_keypad", "ncurses_killchar", "ncurses_longname", "ncurses_meta", "ncurses_mouse_trafo", "ncurses_mouseinterval", "ncurses_mousemask", "ncurses_move", "ncurses_move_panel", "ncurses_mvaddch", "ncurses_mvaddchnstr", "ncurses_mvaddchstr", "ncurses_mvaddnstr", "ncurses_mvaddstr", "ncurses_mvcur", "ncurses_mvdelch", "ncurses_mvgetch", "ncurses_mvhline", "ncurses_mvinch", "ncurses_mvvline", "ncurses_mvwaddstr", "ncurses_napms", "ncurses_new_panel", "ncurses_newpad", "ncurses_newwin", "ncurses_nl", "ncurses_nocbreak", "ncurses_noecho", "ncurses_nonl", "ncurses_noqiflush", "ncurses_noraw", "ncurses_pair_content", "ncurses_panel_above", "ncurses_panel_below", "ncurses_panel_window", "ncurses_pnoutrefresh", "ncurses_prefresh", "ncurses_putp", "ncurses_qiflush", "ncurses_raw", "ncurses_refresh", "ncurses_replace_panel", "ncurses_reset_prog_mode", "ncurses_reset_shell_mode", "ncurses_resetty", "ncurses_savetty", "ncurses_scr_dump", "ncurses_scr_init", "ncurses_scr_restore", "ncurses_scr_set", "ncurses_scrl", "ncurses_show_panel", "ncurses_slk_attr", "ncurses_slk_attroff", "ncurses_slk_attron", "ncurses_slk_attrset", "ncurses_slk_clear", "ncurses_slk_color", "ncurses_slk_init", "ncurses_slk_noutrefresh", "ncurses_slk_refresh", "ncurses_slk_restore", "ncurses_slk_set", "ncurses_slk_touch", "ncurses_standend", "ncurses_standout", "ncurses_start_color", "ncurses_termattrs", "ncurses_termname", "ncurses_timeout", "ncurses_top_panel", "ncurses_typeahead", "ncurses_ungetch", "ncurses_ungetmouse", "ncurses_update_panels", "ncurses_use_default_colors", "ncurses_use_env", "ncurses_use_extended_names", "ncurses_vidattr", "ncurses_vline", "ncurses_waddch", "ncurses_waddstr", "ncurses_wattroff", "ncurses_wattron", "ncurses_wattrset", "ncurses_wborder", "ncurses_wclear", "ncurses_wcolor_set", "ncurses_werase", "ncurses_wgetch", "ncurses_whline", "ncurses_wmouse_trafo", "ncurses_wmove", "ncurses_wnoutrefresh", "ncurses_wrefresh", "ncurses_wstandend", "ncurses_wstandout", "ncurses_wvline", "newinstance", "newinstanceargs", "newt_bell", "newt_button", "newt_button_bar", "newt_centered_window", "newt_checkbox", "newt_checkbox_get_value", "newt_checkbox_set_flags", "newt_checkbox_set_value", "newt_checkbox_tree", "newt_checkbox_tree_add_item", "newt_checkbox_tree_find_item", "newt_checkbox_tree_get_current", "newt_checkbox_tree_get_entry_value", "newt_checkbox_tree_get_multi_selection", "newt_checkbox_tree_get_selection", "newt_checkbox_tree_multi", "newt_checkbox_tree_set_current", "newt_checkbox_tree_set_entry", "newt_checkbox_tree_set_entry_value", "newt_checkbox_tree_set_width", "newt_clear_key_buffer", "newt_cls", "newt_compact_button", "newt_component_add_callback", "newt_component_takes_focus", "newt_create_grid", "newt_cursor_off", "newt_cursor_on", "newt_delay", "newt_draw_form", "newt_draw_root_text", "newt_entry", "newt_entry_get_value", "newt_entry_set", "newt_entry_set_filter", "newt_entry_set_flags", "newt_finished", "newt_form", "newt_form_add_component", "newt_form_add_components", "newt_form_add_hot_key", "newt_form_destroy", "newt_form_get_current", "newt_form_run", "newt_form_set_background", "newt_form_set_height", "newt_form_set_size", "newt_form_set_timer", "newt_form_set_width", "newt_form_watch_fd", "newt_get_screen_size", "newt_grid_add_components_to_form", "newt_grid_basic_window", "newt_grid_free", "newt_grid_get_size", "newt_grid_h_close_stacked", "newt_grid_h_stacked", "newt_grid_place", "newt_grid_set_field", "newt_grid_simple_window", "newt_grid_v_close_stacked", "newt_grid_v_stacked", "newt_grid_wrapped_window", "newt_grid_wrapped_window_at", "newt_init", "newt_label", "newt_label_set_text", "newt_listbox", "newt_listbox_append_entry", "newt_listbox_clear", "newt_listbox_clear_selection", "newt_listbox_delete_entry", "newt_listbox_get_current", "newt_listbox_get_selection", "newt_listbox_insert_entry", "newt_listbox_item_count", "newt_listbox_select_item", "newt_listbox_set_current", "newt_listbox_set_current_by_key", "newt_listbox_set_data", "newt_listbox_set_entry", "newt_listbox_set_width", "newt_listitem", "newt_listitem_get_data", "newt_listitem_set", "newt_open_window", "newt_pop_help_line", "newt_pop_window", "newt_push_help_line", "newt_radio_get_current", "newt_radiobutton", "newt_redraw_help_line", "newt_reflow_text", "newt_refresh", "newt_resize_screen", "newt_resume", "newt_run_form", "newt_scale", "newt_scale_set", "newt_scrollbar_set", "newt_set_help_callback", "newt_set_suspend_callback", "newt_suspend", "newt_textbox", "newt_textbox_get_num_lines", "newt_textbox_reflowed", "newt_textbox_set_height", "newt_textbox_set_text", "newt_vertical_scrollbar", "newt_wait_for_key", "newt_win_choice", "newt_win_entries", "newt_win_menu", "newt_win_message", "newt_win_messagev", "newt_win_ternary", "next", "ngettext", "nl2br", "nl_langinfo", "norewinditerator", "normalizer", "notes_body", "notes_copy_db", "notes_create_db", "notes_create_note", "notes_drop_db", "notes_find_note", "notes_header_info", "notes_list_msgs", "notes_mark_read", "notes_mark_unread", "notes_nav_create", "notes_search", "notes_unread", "notes_version", "nsapi_request_headers", "nsapi_response_headers", "nsapi_virtual", "nthmac", "number_format", "numberformatter", "oauth", "oauth_get_sbs", "oauth_urlencode", "oauthexception", "oauthprovider", "ob_clean", "ob_deflatehandler", "ob_end_clean", "ob_end_flush", "ob_etaghandler", "ob_flush", "ob_get_clean", "ob_get_contents", "ob_get_flush", "ob_get_length", "ob_get_level", "ob_get_status", "ob_gzhandler", "ob_iconv_handler", "ob_implicit_flush", "ob_inflatehandler", "ob_list_handlers", "ob_start", "ob_tidyhandler", "oci_bind_array_by_name", "oci_bind_by_name", "oci_cancel", "oci_client_version", "oci_close", "oci_collection_append", "oci_collection_assign", "oci_collection_element_assign", "oci_collection_element_get", "oci_collection_free", "oci_collection_max", "oci_collection_size", "oci_collection_trim", "oci_commit", "oci_connect", "oci_define_by_name", "oci_error", "oci_execute", "oci_fetch", "oci_fetch_all", "oci_fetch_array", "oci_fetch_assoc", "oci_fetch_object", "oci_fetch_row", "oci_field_is_null", "oci_field_name", "oci_field_precision", "oci_field_scale", "oci_field_size", "oci_field_type", "oci_field_type_raw", "oci_free_statement", "oci_internal_debug", "oci_lob_append", "oci_lob_close", "oci_lob_copy", "oci_lob_eof", "oci_lob_erase", "oci_lob_export", "oci_lob_flush", "oci_lob_free", "oci_lob_getbuffering", "oci_lob_import", "oci_lob_is_equal", "oci_lob_load", "oci_lob_read", "oci_lob_rewind", "oci_lob_save", "oci_lob_savefile", "oci_lob_seek", "oci_lob_setbuffering", "oci_lob_size", "oci_lob_tell", "oci_lob_truncate", "oci_lob_write", "oci_lob_writetemporary", "oci_lob_writetofile", "oci_new_collection", "oci_new_connect", "oci_new_cursor", "oci_new_descriptor", "oci_num_fields", "oci_num_rows", "oci_parse", "oci_password_change", "oci_pconnect", "oci_result", "oci_rollback", "oci_server_version", "oci_set_action", "oci_set_client_identifier", "oci_set_client_info", "oci_set_edition", "oci_set_module_name", "oci_set_prefetch", "oci_statement_type", "ocibindbyname", "ocicancel", "ocicloselob", "ocicollappend", "ocicollassign", "ocicollassignelem", "ocicollgetelem", "ocicollmax", "ocicollsize", "ocicolltrim", "ocicolumnisnull", "ocicolumnname", "ocicolumnprecision", "ocicolumnscale", "ocicolumnsize", "ocicolumntype", "ocicolumntyperaw", "ocicommit", "ocidefinebyname", "ocierror", "ociexecute", "ocifetch", "ocifetchinto", "ocifetchstatement", "ocifreecollection", "ocifreecursor", "ocifreedesc", "ocifreestatement", "ociinternaldebug", "ociloadlob", "ocilogoff", "ocilogon", "ocinewcollection", "ocinewcursor", "ocinewdescriptor", "ocinlogon", "ocinumcols", "ociparse", "ociplogon", "ociresult", "ocirollback", "ocirowcount", "ocisavelob", "ocisavelobfile", "ociserverversion", "ocisetprefetch", "ocistatementtype", "ociwritelobtofile", "ociwritetemporarylob", "octdec", "odbc_autocommit", "odbc_binmode", "odbc_close", "odbc_close_all", "odbc_columnprivileges", "odbc_columns", "odbc_commit", "odbc_connect", "odbc_cursor", "odbc_data_source", "odbc_do", "odbc_error", "odbc_errormsg", "odbc_exec", "odbc_execute", "odbc_fetch_array", "odbc_fetch_into", "odbc_fetch_object", "odbc_fetch_row", "odbc_field_len", "odbc_field_name", "odbc_field_num", "odbc_field_precision", "odbc_field_scale", "odbc_field_type", "odbc_foreignkeys", "odbc_free_result", "odbc_gettypeinfo", "odbc_longreadlen", "odbc_next_result", "odbc_num_fields", "odbc_num_rows", "odbc_pconnect", "odbc_prepare", "odbc_primarykeys", "odbc_procedurecolumns", "odbc_procedures", "odbc_result", "odbc_result_all", "odbc_rollback", "odbc_setoption", "odbc_specialcolumns", "odbc_statistics", "odbc_tableprivileges", "odbc_tables", "openal_buffer_create", "openal_buffer_data", "openal_buffer_destroy", "openal_buffer_get", "openal_buffer_loadwav", "openal_context_create", "openal_context_current", "openal_context_destroy", "openal_context_process", "openal_context_suspend", "openal_device_close", "openal_device_open", "openal_listener_get", "openal_listener_set", "openal_source_create", "openal_source_destroy", "openal_source_get", "openal_source_pause", "openal_source_play", "openal_source_rewind", "openal_source_set", "openal_source_stop", "openal_stream", "opendir", "openlog", "openssl_cipher_iv_length", "openssl_csr_export", "openssl_csr_export_to_file", "openssl_csr_get_public_key", "openssl_csr_get_subject", "openssl_csr_new", "openssl_csr_sign", "openssl_decrypt", "openssl_dh_compute_key", "openssl_digest", "openssl_encrypt", "openssl_error_string", "openssl_free_key", "openssl_get_cipher_methods", "openssl_get_md_methods", "openssl_get_privatekey", "openssl_get_publickey", "openssl_open", "openssl_pkcs12_export", "openssl_pkcs12_export_to_file", "openssl_pkcs12_read", "openssl_pkcs7_decrypt", "openssl_pkcs7_encrypt", "openssl_pkcs7_sign", "openssl_pkcs7_verify", "openssl_pkey_export", "openssl_pkey_export_to_file", "openssl_pkey_free", "openssl_pkey_get_details", "openssl_pkey_get_private", "openssl_pkey_get_public", "openssl_pkey_new", "openssl_private_decrypt", "openssl_private_encrypt", "openssl_public_decrypt", "openssl_public_encrypt", "openssl_random_pseudo_bytes", "openssl_seal", "openssl_sign", "openssl_verify", "openssl_x509_check_private_key", "openssl_x509_checkpurpose", "openssl_x509_export", "openssl_x509_export_to_file", "openssl_x509_free", "openssl_x509_parse", "openssl_x509_read", "ord", "outeriterator", "outofboundsexception", "outofrangeexception", "output_add_rewrite_var", "output_reset_rewrite_vars", "overflowexception", "overload", "override_function", "ovrimos_close", "ovrimos_commit", "ovrimos_connect", "ovrimos_cursor", "ovrimos_exec", "ovrimos_execute", "ovrimos_fetch_into", "ovrimos_fetch_row", "ovrimos_field_len", "ovrimos_field_name", "ovrimos_field_num", "ovrimos_field_type", "ovrimos_free_result", "ovrimos_longreadlen", "ovrimos_num_fields", "ovrimos_num_rows", "ovrimos_prepare", "ovrimos_result", "ovrimos_result_all", "ovrimos_rollback", "pack", "parentiterator", "parse_ini_file", "parse_ini_string", "parse_str", "parse_url", "parsekit_compile_file", "parsekit_compile_string", "parsekit_func_arginfo", "passthru", "pathinfo", "pclose", "pcntl_alarm", "pcntl_exec", "pcntl_fork", "pcntl_getpriority", "pcntl_setpriority", "pcntl_signal", "pcntl_signal_dispatch", "pcntl_sigprocmask", "pcntl_sigtimedwait", "pcntl_sigwaitinfo", "pcntl_wait", "pcntl_waitpid", "pcntl_wexitstatus", "pcntl_wifexited", "pcntl_wifsignaled", "pcntl_wifstopped", "pcntl_wstopsig", "pcntl_wtermsig", "pdf_activate_item", "pdf_add_annotation", "pdf_add_bookmark", "pdf_add_launchlink", "pdf_add_locallink", "pdf_add_nameddest", "pdf_add_note", "pdf_add_outline", "pdf_add_pdflink", "pdf_add_table_cell", "pdf_add_textflow", "pdf_add_thumbnail", "pdf_add_weblink", "pdf_arc", "pdf_arcn", "pdf_attach_file", "pdf_begin_document", "pdf_begin_font", "pdf_begin_glyph", "pdf_begin_item", "pdf_begin_layer", "pdf_begin_page", "pdf_begin_page_ext", "pdf_begin_pattern", "pdf_begin_template", "pdf_begin_template_ext", "pdf_circle", "pdf_clip", "pdf_close", "pdf_close_image", "pdf_close_pdi", "pdf_close_pdi_page", "pdf_closepath", "pdf_closepath_fill_stroke", "pdf_closepath_stroke", "pdf_concat", "pdf_continue_text", "pdf_create_3dview", "pdf_create_action", "pdf_create_annotation", "pdf_create_bookmark", "pdf_create_field", "pdf_create_fieldgroup", "pdf_create_gstate", "pdf_create_pvf", "pdf_create_textflow", "pdf_curveto", "pdf_define_layer", "pdf_delete", "pdf_delete_pvf", "pdf_delete_table", "pdf_delete_textflow", "pdf_encoding_set_char", "pdf_end_document", "pdf_end_font", "pdf_end_glyph", "pdf_end_item", "pdf_end_layer", "pdf_end_page", "pdf_end_page_ext", "pdf_end_pattern", "pdf_end_template", "pdf_endpath", "pdf_fill", "pdf_fill_imageblock", "pdf_fill_pdfblock", "pdf_fill_stroke", "pdf_fill_textblock", "pdf_findfont", "pdf_fit_image", "pdf_fit_pdi_page", "pdf_fit_table", "pdf_fit_textflow", "pdf_fit_textline", "pdf_get_apiname", "pdf_get_buffer", "pdf_get_errmsg", "pdf_get_errnum", "pdf_get_font", "pdf_get_fontname", "pdf_get_fontsize", "pdf_get_image_height", "pdf_get_image_width", "pdf_get_majorversion", "pdf_get_minorversion", "pdf_get_parameter", "pdf_get_pdi_parameter", "pdf_get_pdi_value", "pdf_get_value", "pdf_info_font", "pdf_info_matchbox", "pdf_info_table", "pdf_info_textflow", "pdf_info_textline", "pdf_initgraphics", "pdf_lineto", "pdf_load_3ddata", "pdf_load_font", "pdf_load_iccprofile", "pdf_load_image", "pdf_makespotcolor", "pdf_moveto", "pdf_new", "pdf_open_ccitt", "pdf_open_file", "pdf_open_gif", "pdf_open_image", "pdf_open_image_file", "pdf_open_jpeg", "pdf_open_memory_image", "pdf_open_pdi", "pdf_open_pdi_document", "pdf_open_pdi_page", "pdf_open_tiff", "pdf_pcos_get_number", "pdf_pcos_get_stream", "pdf_pcos_get_string", "pdf_place_image", "pdf_place_pdi_page", "pdf_process_pdi", "pdf_rect", "pdf_restore", "pdf_resume_page", "pdf_rotate", "pdf_save", "pdf_scale", "pdf_set_border_color", "pdf_set_border_dash", "pdf_set_border_style", "pdf_set_char_spacing", "pdf_set_duration", "pdf_set_gstate", "pdf_set_horiz_scaling", "pdf_set_info", "pdf_set_info_author", "pdf_set_info_creator", "pdf_set_info_keywords", "pdf_set_info_subject", "pdf_set_info_title", "pdf_set_layer_dependency", "pdf_set_leading", "pdf_set_parameter", "pdf_set_text_matrix", "pdf_set_text_pos", "pdf_set_text_rendering", "pdf_set_text_rise", "pdf_set_value", "pdf_set_word_spacing", "pdf_setcolor", "pdf_setdash", "pdf_setdashpattern", "pdf_setflat", "pdf_setfont", "pdf_setgray", "pdf_setgray_fill", "pdf_setgray_stroke", "pdf_setlinecap", "pdf_setlinejoin", "pdf_setlinewidth", "pdf_setmatrix", "pdf_setmiterlimit", "pdf_setpolydash", "pdf_setrgbcolor", "pdf_setrgbcolor_fill", "pdf_setrgbcolor_stroke", "pdf_shading", "pdf_shading_pattern", "pdf_shfill", "pdf_show", "pdf_show_boxed", "pdf_show_xy", "pdf_skew", "pdf_stringwidth", "pdf_stroke", "pdf_suspend_page", "pdf_translate", "pdf_utf16_to_utf8", "pdf_utf32_to_utf16", "pdf_utf8_to_utf16", "pdo", "pdo_cubrid_schema", "pdo_pgsqllobcreate", "pdo_pgsqllobopen", "pdo_pgsqllobunlink", "pdo_sqlitecreateaggregate", "pdo_sqlitecreatefunction", "pdoexception", "pdostatement", "pfsockopen", "pg_affected_rows", "pg_cancel_query", "pg_client_encoding", "pg_close", "pg_connect", "pg_connection_busy", "pg_connection_reset", "pg_connection_status", "pg_convert", "pg_copy_from", "pg_copy_to", "pg_dbname", "pg_delete", "pg_end_copy", "pg_escape_bytea", "pg_escape_string", "pg_execute", "pg_fetch_all", "pg_fetch_all_columns", "pg_fetch_array", "pg_fetch_assoc", "pg_fetch_object", "pg_fetch_result", "pg_fetch_row", "pg_field_is_null", "pg_field_name", "pg_field_num", "pg_field_prtlen", "pg_field_size", "pg_field_table", "pg_field_type", "pg_field_type_oid", "pg_free_result", "pg_get_notify", "pg_get_pid", "pg_get_result", "pg_host", "pg_insert", "pg_last_error", "pg_last_notice", "pg_last_oid", "pg_lo_close", "pg_lo_create", "pg_lo_export", "pg_lo_import", "pg_lo_open", "pg_lo_read", "pg_lo_read_all", "pg_lo_seek", "pg_lo_tell", "pg_lo_unlink", "pg_lo_write", "pg_meta_data", "pg_num_fields", "pg_num_rows", "pg_options", "pg_parameter_status", "pg_pconnect", "pg_ping", "pg_port", "pg_prepare", "pg_put_line", "pg_query", "pg_query_params", "pg_result_error", "pg_result_error_field", "pg_result_seek", "pg_result_status", "pg_select", "pg_send_execute", "pg_send_prepare", "pg_send_query", "pg_send_query_params", "pg_set_client_encoding", "pg_set_error_verbosity", "pg_trace", "pg_transaction_status", "pg_tty", "pg_unescape_bytea", "pg_untrace", "pg_update", "pg_version", "php_check_syntax", "php_ini_loaded_file", "php_ini_scanned_files", "php_logo_guid", "php_sapi_name", "php_strip_whitespace", "php_uname", "phpcredits", "phpinfo", "phpversion", "pi", "png2wbmp", "popen", "pos", "posix_access", "posix_ctermid", "posix_errno", "posix_get_last_error", "posix_getcwd", "posix_getegid", "posix_geteuid", "posix_getgid", "posix_getgrgid", "posix_getgrnam", "posix_getgroups", "posix_getlogin", "posix_getpgid", "posix_getpgrp", "posix_getpid", "posix_getppid", "posix_getpwnam", "posix_getpwuid", "posix_getrlimit", "posix_getsid", "posix_getuid", "posix_initgroups", "posix_isatty", "posix_kill", "posix_mkfifo", "posix_mknod", "posix_setegid", "posix_seteuid", "posix_setgid", "posix_setpgid", "posix_setsid", "posix_setuid", "posix_strerror", "posix_times", "posix_ttyname", "posix_uname", "pow", "preg_filter", "preg_grep", "preg_last_error", "preg_match", "preg_match_all", "preg_quote", "preg_replace", "preg_replace_callback", "preg_split", "prev", "print", "print_r", "printer_abort", "printer_close", "printer_create_brush", "printer_create_dc", "printer_create_font", "printer_create_pen", "printer_delete_brush", "printer_delete_dc", "printer_delete_font", "printer_delete_pen", "printer_draw_bmp", "printer_draw_chord", "printer_draw_elipse", "printer_draw_line", "printer_draw_pie", "printer_draw_rectangle", "printer_draw_roundrect", "printer_draw_text", "printer_end_doc", "printer_end_page", "printer_get_option", "printer_list", "printer_logical_fontheight", "printer_open", "printer_select_brush", "printer_select_font", "printer_select_pen", "printer_set_option", "printer_start_doc", "printer_start_page", "printer_write", "printf", "proc_close", "proc_get_status", "proc_nice", "proc_open", "proc_terminate", "property_exists", "ps_add_bookmark", "ps_add_launchlink", "ps_add_locallink", "ps_add_note", "ps_add_pdflink", "ps_add_weblink", "ps_arc", "ps_arcn", "ps_begin_page", "ps_begin_pattern", "ps_begin_template", "ps_circle", "ps_clip", "ps_close", "ps_close_image", "ps_closepath", "ps_closepath_stroke", "ps_continue_text", "ps_curveto", "ps_delete", "ps_end_page", "ps_end_pattern", "ps_end_template", "ps_fill", "ps_fill_stroke", "ps_findfont", "ps_get_buffer", "ps_get_parameter", "ps_get_value", "ps_hyphenate", "ps_include_file", "ps_lineto", "ps_makespotcolor", "ps_moveto", "ps_new", "ps_open_file", "ps_open_image", "ps_open_image_file", "ps_open_memory_image", "ps_place_image", "ps_rect", "ps_restore", "ps_rotate", "ps_save", "ps_scale", "ps_set_border_color", "ps_set_border_dash", "ps_set_border_style", "ps_set_info", "ps_set_parameter", "ps_set_text_pos", "ps_set_value", "ps_setcolor", "ps_setdash", "ps_setflat", "ps_setfont", "ps_setgray", "ps_setlinecap", "ps_setlinejoin", "ps_setlinewidth", "ps_setmiterlimit", "ps_setoverprintmode", "ps_setpolydash", "ps_shading", "ps_shading_pattern", "ps_shfill", "ps_show", "ps_show2", "ps_show_boxed", "ps_show_xy", "ps_show_xy2", "ps_string_geometry", "ps_stringwidth", "ps_stroke", "ps_symbol", "ps_symbol_name", "ps_symbol_width", "ps_translate", "pspell_add_to_personal", "pspell_add_to_session", "pspell_check", "pspell_clear_session", "pspell_config_create", "pspell_config_data_dir", "pspell_config_dict_dir", "pspell_config_ignore", "pspell_config_mode", "pspell_config_personal", "pspell_config_repl", "pspell_config_runtogether", "pspell_config_save_repl", "pspell_new", "pspell_new_config", "pspell_new_personal", "pspell_save_wordlist", "pspell_store_replacement", "pspell_suggest", "putenv", "px_close", "px_create_fp", "px_date2string", "px_delete", "px_delete_record", "px_get_field", "px_get_info", "px_get_parameter", "px_get_record", "px_get_schema", "px_get_value", "px_insert_record", "px_new", "px_numfields", "px_numrecords", "px_open_fp", "px_put_record", "px_retrieve_record", "px_set_blob_file", "px_set_parameter", "px_set_tablename", "px_set_targetencoding", "px_set_value", "px_timestamp2string", "px_update_record", "qdom_error", "qdom_tree", "quoted_printable_decode", "quoted_printable_encode", "quotemeta", "rad2deg", "radius_acct_open", "radius_add_server", "radius_auth_open", "radius_close", "radius_config", "radius_create_request", "radius_cvt_addr", "radius_cvt_int", "radius_cvt_string", "radius_demangle", "radius_demangle_mppe_key", "radius_get_attr", "radius_get_vendor_attr", "radius_put_addr", "radius_put_attr", "radius_put_int", "radius_put_string", "radius_put_vendor_addr", "radius_put_vendor_attr", "radius_put_vendor_int", "radius_put_vendor_string", "radius_request_authenticator", "radius_send_request", "radius_server_secret", "radius_strerror", "rand", "range", "rangeexception", "rar_wrapper_cache_stats", "rararchive", "rarentry", "rarexception", "rawurldecode", "rawurlencode", "read_exif_data", "readdir", "readfile", "readgzfile", "readline", "readline_add_history", "readline_callback_handler_install", "readline_callback_handler_remove", "readline_callback_read_char", "readline_clear_history", "readline_completion_function", "readline_info", "readline_list_history", "readline_on_new_line", "readline_read_history", "readline_redisplay", "readline_write_history", "readlink", "realpath", "realpath_cache_get", "realpath_cache_size", "recode", "recode_file", "recode_string", "recursivearrayiterator", "recursivecachingiterator", "recursivecallbackfilteriterator", "recursivedirectoryiterator", "recursivefilteriterator", "recursiveiterator", "recursiveiteratoriterator", "recursiveregexiterator", "recursivetreeiterator", "reflection", "reflectionclass", "reflectionexception", "reflectionextension", "reflectionfunction", "reflectionfunctionabstract", "reflectionmethod", "reflectionobject", "reflectionparameter", "reflectionproperty", "reflector", "regexiterator", "register_shutdown_function", "register_tick_function", "rename", "rename_function", "require", "require_once", "reset", "resetValue", "resourcebundle", "restore_error_handler", "restore_exception_handler", "restore_include_path", "return", "rewind", "rewinddir", "rmdir", "round", "rpm_close", "rpm_get_tag", "rpm_is_valid", "rpm_open", "rpm_version", "rrd_create", "rrd_error", "rrd_fetch", "rrd_first", "rrd_graph", "rrd_info", "rrd_last", "rrd_lastupdate", "rrd_restore", "rrd_tune", "rrd_update", "rrd_xport", "rrdcreator", "rrdgraph", "rrdupdater", "rsort", "rtrim", "runkit_class_adopt", "runkit_class_emancipate", "runkit_constant_add", "runkit_constant_redefine", "runkit_constant_remove", "runkit_function_add", "runkit_function_copy", "runkit_function_redefine", "runkit_function_remove", "runkit_function_rename", "runkit_import", "runkit_lint", "runkit_lint_file", "runkit_method_add", "runkit_method_copy", "runkit_method_redefine", "runkit_method_remove", "runkit_method_rename", "runkit_return_value_used", "runkit_sandbox_output_handler", "runkit_superglobals", "runtimeexception", "samconnection_commit", "samconnection_connect", "samconnection_constructor", "samconnection_disconnect", "samconnection_errno", "samconnection_error", "samconnection_isconnected", "samconnection_peek", "samconnection_peekall", "samconnection_receive", "samconnection_remove", "samconnection_rollback", "samconnection_send", "samconnection_setDebug", "samconnection_subscribe", "samconnection_unsubscribe", "sammessage_body", "sammessage_constructor", "sammessage_header", "sca_createdataobject", "sca_getservice", "sca_localproxy_createdataobject", "sca_soapproxy_createdataobject", "scandir", "sdo_das_changesummary_beginlogging", "sdo_das_changesummary_endlogging", "sdo_das_changesummary_getchangeddataobjects", "sdo_das_changesummary_getchangetype", "sdo_das_changesummary_getoldcontainer", "sdo_das_changesummary_getoldvalues", "sdo_das_changesummary_islogging", "sdo_das_datafactory_addpropertytotype", "sdo_das_datafactory_addtype", "sdo_das_datafactory_getdatafactory", "sdo_das_dataobject_getchangesummary", "sdo_das_relational_applychanges", "sdo_das_relational_construct", "sdo_das_relational_createrootdataobject", "sdo_das_relational_executepreparedquery", "sdo_das_relational_executequery", "sdo_das_setting_getlistindex", "sdo_das_setting_getpropertyindex", "sdo_das_setting_getpropertyname", "sdo_das_setting_getvalue", "sdo_das_setting_isset", "sdo_das_xml_addtypes", "sdo_das_xml_create", "sdo_das_xml_createdataobject", "sdo_das_xml_createdocument", "sdo_das_xml_document_getrootdataobject", "sdo_das_xml_document_getrootelementname", "sdo_das_xml_document_getrootelementuri", "sdo_das_xml_document_setencoding", "sdo_das_xml_document_setxmldeclaration", "sdo_das_xml_document_setxmlversion", "sdo_das_xml_loadfile", "sdo_das_xml_loadstring", "sdo_das_xml_savefile", "sdo_das_xml_savestring", "sdo_datafactory_create", "sdo_dataobject_clear", "sdo_dataobject_createdataobject", "sdo_dataobject_getcontainer", "sdo_dataobject_getsequence", "sdo_dataobject_gettypename", "sdo_dataobject_gettypenamespaceuri", "sdo_exception_getcause", "sdo_list_insert", "sdo_model_property_getcontainingtype", "sdo_model_property_getdefault", "sdo_model_property_getname", "sdo_model_property_gettype", "sdo_model_property_iscontainment", "sdo_model_property_ismany", "sdo_model_reflectiondataobject_construct", "sdo_model_reflectiondataobject_export", "sdo_model_reflectiondataobject_getcontainmentproperty", "sdo_model_reflectiondataobject_getinstanceproperties", "sdo_model_reflectiondataobject_gettype", "sdo_model_type_getbasetype", "sdo_model_type_getname", "sdo_model_type_getnamespaceuri", "sdo_model_type_getproperties", "sdo_model_type_getproperty", "sdo_model_type_isabstracttype", "sdo_model_type_isdatatype", "sdo_model_type_isinstance", "sdo_model_type_isopentype", "sdo_model_type_issequencedtype", "sdo_sequence_getproperty", "sdo_sequence_insert", "sdo_sequence_move", "seekableiterator", "sem_acquire", "sem_get", "sem_release", "sem_remove", "serializable", "serialize", "session_cache_expire", "session_cache_limiter", "session_commit", "session_decode", "session_destroy", "session_encode", "session_get_cookie_params", "session_id", "session_is_registered", "session_module_name", "session_name", "session_pgsql_add_error", "session_pgsql_get_error", "session_pgsql_get_field", "session_pgsql_reset", "session_pgsql_set_field", "session_pgsql_status", "session_regenerate_id", "session_register", "session_save_path", "session_set_cookie_params", "session_set_save_handler", "session_start", "session_unregister", "session_unset", "session_write_close", "setCounterClass", "set_error_handler", "set_exception_handler", "set_file_buffer", "set_include_path", "set_magic_quotes_runtime", "set_socket_blocking", "set_time_limit", "setcookie", "setlocale", "setproctitle", "setrawcookie", "setstaticpropertyvalue", "setthreadtitle", "settype", "sha1", "sha1_file", "shell_exec", "shm_attach", "shm_detach", "shm_get_var", "shm_has_var", "shm_put_var", "shm_remove", "shm_remove_var", "shmop_close", "shmop_delete", "shmop_open", "shmop_read", "shmop_size", "shmop_write", "show_source", "shuffle", "signeurlpaiement", "similar_text", "simplexml_import_dom", "simplexml_load_file", "simplexml_load_string", "simplexmlelement", "simplexmliterator", "sin", "sinh", "sizeof", "sleep", "snmp", "snmp2_get", "snmp2_getnext", "snmp2_real_walk", "snmp2_set", "snmp2_walk", "snmp3_get", "snmp3_getnext", "snmp3_real_walk", "snmp3_set", "snmp3_walk", "snmp_get_quick_print", "snmp_get_valueretrieval", "snmp_read_mib", "snmp_set_enum_print", "snmp_set_oid_numeric_print", "snmp_set_oid_output_format", "snmp_set_quick_print", "snmp_set_valueretrieval", "snmpget", "snmpgetnext", "snmprealwalk", "snmpset", "snmpwalk", "snmpwalkoid", "soapclient", "soapfault", "soapheader", "soapparam", "soapserver", "soapvar", "socket_accept", "socket_bind", "socket_clear_error", "socket_close", "socket_connect", "socket_create", "socket_create_listen", "socket_create_pair", "socket_get_option", "socket_get_status", "socket_getpeername", "socket_getsockname", "socket_last_error", "socket_listen", "socket_read", "socket_recv", "socket_recvfrom", "socket_select", "socket_send", "socket_sendto", "socket_set_block", "socket_set_blocking", "socket_set_nonblock", "socket_set_option", "socket_set_timeout", "socket_shutdown", "socket_strerror", "socket_write", "solr_get_version", "solrclient", "solrclientexception", "solrdocument", "solrdocumentfield", "solrexception", "solrgenericresponse", "solrillegalargumentexception", "solrillegaloperationexception", "solrinputdocument", "solrmodifiableparams", "solrobject", "solrparams", "solrpingresponse", "solrquery", "solrqueryresponse", "solrresponse", "solrupdateresponse", "solrutils", "sort", "soundex", "sphinxclient", "spl_autoload", "spl_autoload_call", "spl_autoload_extensions", "spl_autoload_functions", "spl_autoload_register", "spl_autoload_unregister", "spl_classes", "spl_object_hash", "splbool", "spldoublylinkedlist", "splenum", "splfileinfo", "splfileobject", "splfixedarray", "splfloat", "splheap", "splint", "split", "spliti", "splmaxheap", "splminheap", "splobjectstorage", "splobserver", "splpriorityqueue", "splqueue", "splstack", "splstring", "splsubject", "spltempfileobject", "spoofchecker", "sprintf", "sql_regcase", "sqlite3", "sqlite3result", "sqlite3stmt", "sqlite_array_query", "sqlite_busy_timeout", "sqlite_changes", "sqlite_close", "sqlite_column", "sqlite_create_aggregate", "sqlite_create_function", "sqlite_current", "sqlite_error_string", "sqlite_escape_string", "sqlite_exec", "sqlite_factory", "sqlite_fetch_all", "sqlite_fetch_array", "sqlite_fetch_column_types", "sqlite_fetch_object", "sqlite_fetch_single", "sqlite_fetch_string", "sqlite_field_name", "sqlite_has_more", "sqlite_has_prev", "sqlite_key", "sqlite_last_error", "sqlite_last_insert_rowid", "sqlite_libencoding", "sqlite_libversion", "sqlite_next", "sqlite_num_fields", "sqlite_num_rows", "sqlite_open", "sqlite_popen", "sqlite_prev", "sqlite_query", "sqlite_rewind", "sqlite_seek", "sqlite_single_query", "sqlite_udf_decode_binary", "sqlite_udf_encode_binary", "sqlite_unbuffered_query", "sqlite_valid", "sqrt", "srand", "sscanf", "ssdeep_fuzzy_compare", "ssdeep_fuzzy_hash", "ssdeep_fuzzy_hash_filename", "ssh2_auth_hostbased_file", "ssh2_auth_none", "ssh2_auth_password", "ssh2_auth_pubkey_file", "ssh2_connect", "ssh2_exec", "ssh2_fetch_stream", "ssh2_fingerprint", "ssh2_methods_negotiated", "ssh2_publickey_add", "ssh2_publickey_init", "ssh2_publickey_list", "ssh2_publickey_remove", "ssh2_scp_recv", "ssh2_scp_send", "ssh2_sftp", "ssh2_sftp_lstat", "ssh2_sftp_mkdir", "ssh2_sftp_readlink", "ssh2_sftp_realpath", "ssh2_sftp_rename", "ssh2_sftp_rmdir", "ssh2_sftp_stat", "ssh2_sftp_symlink", "ssh2_sftp_unlink", "ssh2_shell", "ssh2_tunnel", "stat", "stats_absolute_deviation", "stats_cdf_beta", "stats_cdf_binomial", "stats_cdf_cauchy", "stats_cdf_chisquare", "stats_cdf_exponential", "stats_cdf_f", "stats_cdf_gamma", "stats_cdf_laplace", "stats_cdf_logistic", "stats_cdf_negative_binomial", "stats_cdf_noncentral_chisquare", "stats_cdf_noncentral_f", "stats_cdf_poisson", "stats_cdf_t", "stats_cdf_uniform", "stats_cdf_weibull", "stats_covariance", "stats_den_uniform", "stats_dens_beta", "stats_dens_cauchy", "stats_dens_chisquare", "stats_dens_exponential", "stats_dens_f", "stats_dens_gamma", "stats_dens_laplace", "stats_dens_logistic", "stats_dens_negative_binomial", "stats_dens_normal", "stats_dens_pmf_binomial", "stats_dens_pmf_hypergeometric", "stats_dens_pmf_poisson", "stats_dens_t", "stats_dens_weibull", "stats_harmonic_mean", "stats_kurtosis", "stats_rand_gen_beta", "stats_rand_gen_chisquare", "stats_rand_gen_exponential", "stats_rand_gen_f", "stats_rand_gen_funiform", "stats_rand_gen_gamma", "stats_rand_gen_ibinomial", "stats_rand_gen_ibinomial_negative", "stats_rand_gen_int", "stats_rand_gen_ipoisson", "stats_rand_gen_iuniform", "stats_rand_gen_noncenral_chisquare", "stats_rand_gen_noncentral_f", "stats_rand_gen_noncentral_t", "stats_rand_gen_normal", "stats_rand_gen_t", "stats_rand_get_seeds", "stats_rand_phrase_to_seeds", "stats_rand_ranf", "stats_rand_setall", "stats_skew", "stats_standard_deviation", "stats_stat_binomial_coef", "stats_stat_correlation", "stats_stat_gennch", "stats_stat_independent_t", "stats_stat_innerproduct", "stats_stat_noncentral_t", "stats_stat_paired_t", "stats_stat_percentile", "stats_stat_powersum", "stats_variance", "stomp", "stomp_connect_error", "stomp_version", "stompexception", "stompframe", "str_getcsv", "str_ireplace", "str_pad", "str_repeat", "str_replace", "str_rot13", "str_shuffle", "str_split", "str_word_count", "strcasecmp", "strchr", "strcmp", "strcoll", "strcspn", "stream_bucket_append", "stream_bucket_make_writeable", "stream_bucket_new", "stream_bucket_prepend", "stream_context_create", "stream_context_get_default", "stream_context_get_options", "stream_context_get_params", "stream_context_set_default", "stream_context_set_option", "stream_context_set_params", "stream_copy_to_stream", "stream_encoding", "stream_filter_append", "stream_filter_prepend", "stream_filter_register", "stream_filter_remove", "stream_get_contents", "stream_get_filters", "stream_get_line", "stream_get_meta_data", "stream_get_transports", "stream_get_wrappers", "stream_is_local", "stream_notification_callback", "stream_register_wrapper", "stream_resolve_include_path", "stream_select", "stream_set_blocking", "stream_set_read_buffer", "stream_set_timeout", "stream_set_write_buffer", "stream_socket_accept", "stream_socket_client", "stream_socket_enable_crypto", "stream_socket_get_name", "stream_socket_pair", "stream_socket_recvfrom", "stream_socket_sendto", "stream_socket_server", "stream_socket_shutdown", "stream_supports_lock", "stream_wrapper_register", "stream_wrapper_restore", "stream_wrapper_unregister", "streamwrapper", "strftime", "strip_tags", "stripcslashes", "stripos", "stripslashes", "stristr", "strlen", "strnatcasecmp", "strnatcmp", "strncasecmp", "strncmp", "strpbrk", "strpos", "strptime", "strrchr", "strrev", "strripos", "strrpos", "strspn", "strstr", "strtok", "strtolower", "strtotime", "strtoupper", "strtr", "strval", "substr", "substr_compare", "substr_count", "substr_replace", "svm", "svmmodel", "svn_add", "svn_auth_get_parameter", "svn_auth_set_parameter", "svn_blame", "svn_cat", "svn_checkout", "svn_cleanup", "svn_client_version", "svn_commit", "svn_delete", "svn_diff", "svn_export", "svn_fs_abort_txn", "svn_fs_apply_text", "svn_fs_begin_txn2", "svn_fs_change_node_prop", "svn_fs_check_path", "svn_fs_contents_changed", "svn_fs_copy", "svn_fs_delete", "svn_fs_dir_entries", "svn_fs_file_contents", "svn_fs_file_length", "svn_fs_is_dir", "svn_fs_is_file", "svn_fs_make_dir", "svn_fs_make_file", "svn_fs_node_created_rev", "svn_fs_node_prop", "svn_fs_props_changed", "svn_fs_revision_prop", "svn_fs_revision_root", "svn_fs_txn_root", "svn_fs_youngest_rev", "svn_import", "svn_log", "svn_ls", "svn_mkdir", "svn_repos_create", "svn_repos_fs", "svn_repos_fs_begin_txn_for_commit", "svn_repos_fs_commit_txn", "svn_repos_hotcopy", "svn_repos_open", "svn_repos_recover", "svn_revert", "svn_status", "svn_update", "swf_actiongeturl", "swf_actiongotoframe", "swf_actiongotolabel", "swf_actionnextframe", "swf_actionplay", "swf_actionprevframe", "swf_actionsettarget", "swf_actionstop", "swf_actiontogglequality", "swf_actionwaitforframe", "swf_addbuttonrecord", "swf_addcolor", "swf_closefile", "swf_definebitmap", "swf_definefont", "swf_defineline", "swf_definepoly", "swf_definerect", "swf_definetext", "swf_endbutton", "swf_enddoaction", "swf_endshape", "swf_endsymbol", "swf_fontsize", "swf_fontslant", "swf_fonttracking", "swf_getbitmapinfo", "swf_getfontinfo", "swf_getframe", "swf_labelframe", "swf_lookat", "swf_modifyobject", "swf_mulcolor", "swf_nextid", "swf_oncondition", "swf_openfile", "swf_ortho", "swf_ortho2", "swf_perspective", "swf_placeobject", "swf_polarview", "swf_popmatrix", "swf_posround", "swf_pushmatrix", "swf_removeobject", "swf_rotate", "swf_scale", "swf_setfont", "swf_setframe", "swf_shapearc", "swf_shapecurveto", "swf_shapecurveto3", "swf_shapefillbitmapclip", "swf_shapefillbitmaptile", "swf_shapefilloff", "swf_shapefillsolid", "swf_shapelinesolid", "swf_shapelineto", "swf_shapemoveto", "swf_showframe", "swf_startbutton", "swf_startdoaction", "swf_startshape", "swf_startsymbol", "swf_textwidth", "swf_translate", "swf_viewport", "swfaction", "swfbitmap", "swfbutton", "swfdisplayitem", "swffill", "swffont", "swffontchar", "swfgradient", "swfmorph", "swfmovie", "swfprebuiltclip", "swfshape", "swfsound", "swfsoundinstance", "swfsprite", "swftext", "swftextfield", "swfvideostream", "swish_construct", "swish_getmetalist", "swish_getpropertylist", "swish_prepare", "swish_query", "swishresult_getmetalist", "swishresult_stem", "swishresults_getparsedwords", "swishresults_getremovedstopwords", "swishresults_nextresult", "swishresults_seekresult", "swishsearch_execute", "swishsearch_resetlimit", "swishsearch_setlimit", "swishsearch_setphrasedelimiter", "swishsearch_setsort", "swishsearch_setstructure", "sybase_affected_rows", "sybase_close", "sybase_connect", "sybase_data_seek", "sybase_deadlock_retry_count", "sybase_fetch_array", "sybase_fetch_assoc", "sybase_fetch_field", "sybase_fetch_object", "sybase_fetch_row", "sybase_field_seek", "sybase_free_result", "sybase_get_last_message", "sybase_min_client_severity", "sybase_min_error_severity", "sybase_min_message_severity", "sybase_min_server_severity", "sybase_num_fields", "sybase_num_rows", "sybase_pconnect", "sybase_query", "sybase_result", "sybase_select_db", "sybase_set_message_handler", "sybase_unbuffered_query", "symlink", "sys_get_temp_dir", "sys_getloadavg", "syslog", "system", "tag", "tan", "tanh", "tcpwrap_check", "tempnam", "textdomain", "tidy", "tidy_access_count", "tidy_config_count", "tidy_diagnose", "tidy_error_count", "tidy_get_error_buffer", "tidy_get_output", "tidy_load_config", "tidy_reset_config", "tidy_save_config", "tidy_set_encoding", "tidy_setopt", "tidy_warning_count", "tidynode", "time", "time_nanosleep", "time_sleep_until", "timezone_abbreviations_list", "timezone_identifiers_list", "timezone_location_get", "timezone_name_from_abbr", "timezone_name_get", "timezone_offset_get", "timezone_open", "timezone_transitions_get", "timezone_version_get", "tmpfile", "token_get_all", "token_name", "tokyotyrant", "tokyotyrantquery", "tokyotyranttable", "tostring", "tostring", "touch", "transliterator", "traversable", "trigger_error", "trim", "uasort", "ucfirst", "ucwords", "udm_add_search_limit", "udm_alloc_agent", "udm_alloc_agent_array", "udm_api_version", "udm_cat_list", "udm_cat_path", "udm_check_charset", "udm_check_stored", "udm_clear_search_limits", "udm_close_stored", "udm_crc32", "udm_errno", "udm_error", "udm_find", "udm_free_agent", "udm_free_ispell_data", "udm_free_res", "udm_get_doc_count", "udm_get_res_field", "udm_get_res_param", "udm_hash32", "udm_load_ispell_data", "udm_open_stored", "udm_set_agent_param", "uksort", "umask", "underflowexception", "unexpectedvalueexception", "uniqid", "unixtojd", "unlink", "unpack", "unregister_tick_function", "unserialize", "unset", "urldecode", "urlencode", "use_soap_error_handler", "user_error", "usleep", "usort", "utf8_decode", "utf8_encode", "v8js", "v8jsexception", "var_dump", "var_export", "variant", "variant_abs", "variant_add", "variant_and", "variant_cast", "variant_cat", "variant_cmp", "variant_date_from_timestamp", "variant_date_to_timestamp", "variant_div", "variant_eqv", "variant_fix", "variant_get_type", "variant_idiv", "variant_imp", "variant_int", "variant_mod", "variant_mul", "variant_neg", "variant_not", "variant_or", "variant_pow", "variant_round", "variant_set", "variant_set_type", "variant_sub", "variant_xor", "version_compare", "vfprintf", "virtual", "vpopmail_add_alias_domain", "vpopmail_add_alias_domain_ex", "vpopmail_add_domain", "vpopmail_add_domain_ex", "vpopmail_add_user", "vpopmail_alias_add", "vpopmail_alias_del", "vpopmail_alias_del_domain", "vpopmail_alias_get", "vpopmail_alias_get_all", "vpopmail_auth_user", "vpopmail_del_domain", "vpopmail_del_domain_ex", "vpopmail_del_user", "vpopmail_error", "vpopmail_passwd", "vpopmail_set_user_quota", "vprintf", "vsprintf", "w32api_deftype", "w32api_init_dtype", "w32api_invoke_function", "w32api_register_function", "w32api_set_call_method", "wddx_add_vars", "wddx_deserialize", "wddx_packet_end", "wddx_packet_start", "wddx_serialize_value", "wddx_serialize_vars", "win32_continue_service", "win32_create_service", "win32_delete_service", "win32_get_last_control_message", "win32_pause_service", "win32_ps_list_procs", "win32_ps_stat_mem", "win32_ps_stat_proc", "win32_query_service_status", "win32_set_service_status", "win32_start_service", "win32_start_service_ctrl_dispatcher", "win32_stop_service", "wincache_fcache_fileinfo", "wincache_fcache_meminfo", "wincache_lock", "wincache_ocache_fileinfo", "wincache_ocache_meminfo", "wincache_refresh_if_changed", "wincache_rplist_fileinfo", "wincache_rplist_meminfo", "wincache_scache_info", "wincache_scache_meminfo", "wincache_ucache_add", "wincache_ucache_cas", "wincache_ucache_clear", "wincache_ucache_dec", "wincache_ucache_delete", "wincache_ucache_exists", "wincache_ucache_get", "wincache_ucache_inc", "wincache_ucache_info", "wincache_ucache_meminfo", "wincache_ucache_set", "wincache_unlock", "wordwrap", "xattr_get", "xattr_list", "xattr_remove", "xattr_set", "xattr_supported", "xdiff_file_bdiff", "xdiff_file_bdiff_size", "xdiff_file_bpatch", "xdiff_file_diff", "xdiff_file_diff_binary", "xdiff_file_merge3", "xdiff_file_patch", "xdiff_file_patch_binary", "xdiff_file_rabdiff", "xdiff_string_bdiff", "xdiff_string_bdiff_size", "xdiff_string_bpatch", "xdiff_string_diff", "xdiff_string_diff_binary", "xdiff_string_merge3", "xdiff_string_patch", "xdiff_string_patch_binary", "xdiff_string_rabdiff", "xhprof_disable", "xhprof_enable", "xhprof_sample_disable", "xhprof_sample_enable", "xml_error_string", "xml_get_current_byte_index", "xml_get_current_column_number", "xml_get_current_line_number", "xml_get_error_code", "xml_parse", "xml_parse_into_struct", "xml_parser_create", "xml_parser_create_ns", "xml_parser_free", "xml_parser_get_option", "xml_parser_set_option", "xml_set_character_data_handler", "xml_set_default_handler", "xml_set_element_handler", "xml_set_end_namespace_decl_handler", "xml_set_external_entity_ref_handler", "xml_set_notation_decl_handler", "xml_set_object", "xml_set_processing_instruction_handler", "xml_set_start_namespace_decl_handler", "xml_set_unparsed_entity_decl_handler", "xmlreader", "xmlrpc_decode", "xmlrpc_decode_request", "xmlrpc_encode", "xmlrpc_encode_request", "xmlrpc_get_type", "xmlrpc_is_fault", "xmlrpc_parse_method_descriptions", "xmlrpc_server_add_introspection_data", "xmlrpc_server_call_method", "xmlrpc_server_create", "xmlrpc_server_destroy", "xmlrpc_server_register_introspection_callback", "xmlrpc_server_register_method", "xmlrpc_set_type", "xmlwriter_end_attribute", "xmlwriter_end_cdata", "xmlwriter_end_comment", "xmlwriter_end_document", "xmlwriter_end_dtd", "xmlwriter_end_dtd_attlist", "xmlwriter_end_dtd_element", "xmlwriter_end_dtd_entity", "xmlwriter_end_element", "xmlwriter_end_pi", "xmlwriter_flush", "xmlwriter_full_end_element", "xmlwriter_open_memory", "xmlwriter_open_uri", "xmlwriter_output_memory", "xmlwriter_set_indent", "xmlwriter_set_indent_string", "xmlwriter_start_attribute", "xmlwriter_start_attribute_ns", "xmlwriter_start_cdata", "xmlwriter_start_comment", "xmlwriter_start_document", "xmlwriter_start_dtd", "xmlwriter_start_dtd_attlist", "xmlwriter_start_dtd_element", "xmlwriter_start_dtd_entity", "xmlwriter_start_element", "xmlwriter_start_element_ns", "xmlwriter_start_pi", "xmlwriter_text", "xmlwriter_write_attribute", "xmlwriter_write_attribute_ns", "xmlwriter_write_cdata", "xmlwriter_write_comment", "xmlwriter_write_dtd", "xmlwriter_write_dtd_attlist", "xmlwriter_write_dtd_element", "xmlwriter_write_dtd_entity", "xmlwriter_write_element", "xmlwriter_write_element_ns", "xmlwriter_write_pi", "xmlwriter_write_raw", "xpath_eval", "xpath_eval_expression", "xpath_new_context", "xpath_register_ns", "xpath_register_ns_auto", "xptr_eval", "xptr_new_context", "xslt_backend_info", "xslt_backend_name", "xslt_backend_version", "xslt_create", "xslt_errno", "xslt_error", "xslt_free", "xslt_getopt", "xslt_process", "xslt_set_base", "xslt_set_encoding", "xslt_set_error_handler", "xslt_set_log", "xslt_set_object", "xslt_set_sax_handler", "xslt_set_sax_handlers", "xslt_set_scheme_handler", "xslt_set_scheme_handlers", "xslt_setopt", "xsltprocessor", "yaml_emit", "yaml_emit_file", "yaml_parse", "yaml_parse_file", "yaml_parse_url", "yaz_addinfo", "yaz_ccl_conf", "yaz_ccl_parse", "yaz_close", "yaz_connect", "yaz_database", "yaz_element", "yaz_errno", "yaz_error", "yaz_es", "yaz_es_result", "yaz_get_option", "yaz_hits", "yaz_itemorder", "yaz_present", "yaz_range", "yaz_record", "yaz_scan", "yaz_scan_result", "yaz_schema", "yaz_search", "yaz_set_option", "yaz_sort", "yaz_syntax", "yaz_wait", "yp_all", "yp_cat", "yp_err_string", "yp_errno", "yp_first", "yp_get_default_domain", "yp_master", "yp_match", "yp_next", "yp_order", "zend_logo_guid", "zend_thread_id", "zend_version", "zip_close", "zip_entry_close", "zip_entry_compressedsize", "zip_entry_compressionmethod", "zip_entry_filesize", "zip_entry_name", "zip_entry_open", "zip_entry_read", "zip_open", "zip_read", "ziparchive", "ziparchive_addemptydir", "ziparchive_addfile", "ziparchive_addfromstring", "ziparchive_close", "ziparchive_deleteindex", "ziparchive_deletename", "ziparchive_extractto", "ziparchive_getarchivecomment", "ziparchive_getcommentindex", "ziparchive_getcommentname", "ziparchive_getfromindex", "ziparchive_getfromname", "ziparchive_getnameindex", "ziparchive_getstatusstring", "ziparchive_getstream", "ziparchive_locatename", "ziparchive_open", "ziparchive_renameindex", "ziparchive_renamename", "ziparchive_setCommentName", "ziparchive_setarchivecomment", "ziparchive_setcommentindex", "ziparchive_statindex", "ziparchive_statname", "ziparchive_unchangeall", "ziparchive_unchangearchive", "ziparchive_unchangeindex", "ziparchive_unchangename", "zlib_get_coding_type"]),
                                    c = e.arrayToMap(["abstract", "and", "array", "as", "break", "case", "catch", "class", "clone", "const", "continue", "declare", "default", "do", "else", "elseif", "enddeclare", "endfor", "endforeach", "endif", "endswitch", "endwhile", "extends", "final", "for", "foreach", "function", "global", "goto", "if", "implements", "interface", "instanceof", "namespace", "new", "or", "private", "protected", "public", "static", "switch", "throw", "try", "use", "var", "while", "xor"]),
                                    d = e.arrayToMap(["die", "echo", "empty", "exit", "eval", "include", "include_once", "isset", "list", "require", "require_once", "return", "print", "unset"]),
                                    g = e.arrayToMap(["true", "false", "null", "__CLASS__", "__DIR__", "__FILE__", "__LINE__", "__METHOD__", "__FUNCTION__", "__NAMESPACE__"]),
                                    h = e.arrayToMap(["$GLOBALS", "$_SERVER", "$_GET", "$_POST", "$_FILES", "$_REQUEST", "$_SESSION", "$_ENV", "$_COOKIE", "$php_errormsg", "$HTTP_RAW_POST_DATA", "$http_response_header", "$argc", "$argv"]),
                                    i = e.arrayToMap(["key_exists", "cairo_matrix_create_scale", "cairo_matrix_create_translate", "call_user_method", "call_user_method_array", "com_addref", "com_get", "com_invoke", "com_isenum", "com_load", "com_release", "com_set", "connection_timeout", "cubrid_load_from_glo", "cubrid_new_glo", "cubrid_save_to_glo", "cubrid_send_glo", "define_syslog_variables", "dl", "ereg", "ereg_replace", "eregi", "eregi_replace", "hw_documentattributes", "hw_documentbodytag", "hw_documentsize", "hw_outputdocument", "imagedashedline", "maxdb_bind_param", "maxdb_bind_result", "maxdb_client_encoding", "maxdb_close_long_data", "maxdb_execute", "maxdb_fetch", "maxdb_get_metadata", "maxdb_param_count", "maxdb_send_long_data", "mcrypt_ecb", "mcrypt_generic_end", "mime_content_type", "mysql_createdb", "mysql_dbname", "mysql_db_query", "mysql_drop_db", "mysql_dropdb", "mysql_escape_string", "mysql_fieldflags", "mysql_fieldflags", "mysql_fieldname", "mysql_fieldtable", "mysql_fieldtype", "mysql_freeresult", "mysql_listdbs", "mysql_list_fields", "mysql_listfields", "mysql_list_tables", "mysql_listtables", "mysql_numfields", "mysql_numrows", "mysql_selectdb", "mysql_tablename", "mysqli_bind_param", "mysqli_bind_result", "mysqli_disable_reads_from_master", "mysqli_disable_rpl_parse", "mysqli_enable_reads_from_master", "mysqli_enable_rpl_parse", "mysqli_execute", "mysqli_fetch", "mysqli_get_metadata", "mysqli_master_query", "mysqli_param_count", "mysqli_rpl_parse_enabled", "mysqli_rpl_probe", "mysqli_rpl_query_type", "mysqli_send_long_data", "mysqli_send_query", "mysqli_slave_query", "ocibindbyname", "ocicancel", "ocicloselob", "ocicollappend", "ocicollassign", "ocicollassignelem", "ocicollgetelem", "ocicollmax", "ocicollsize", "ocicolltrim", "ocicolumnisnull", "ocicolumnname", "ocicolumnprecision", "ocicolumnscale", "ocicolumnsize", "ocicolumntype", "ocicolumntyperaw", "ocicommit", "ocidefinebyname", "ocierror", "ociexecute", "ocifetch", "ocifetchinto", "ocifetchstatement", "ocifreecollection", "ocifreecursor", "ocifreedesc", "ocifreestatement", "ociinternaldebug", "ociloadlob", "ocilogoff", "ocilogon", "ocinewcollection", "ocinewcursor", "ocinewdescriptor", "ocinlogon", "ocinumcols", "ociparse", "ociplogon", "ociresult", "ocirollback", "ocirowcount", "ocisavelob", "ocisavelobfile", "ociserverversion", "ocisetprefetch", "ocistatementtype", "ociwritelobtofile", "ociwritetemporarylob", "PDF_add_annotation", "PDF_add_bookmark", "PDF_add_launchlink", "PDF_add_locallink", "PDF_add_note", "PDF_add_outline", "PDF_add_pdflink", "PDF_add_weblink", "PDF_attach_file", "PDF_begin_page", "PDF_begin_template", "PDF_close_pdi", "PDF_close", "PDF_findfont", "PDF_get_font", "PDF_get_fontname", "PDF_get_fontsize", "PDF_get_image_height", "PDF_get_image_width", "PDF_get_majorversion", "PDF_get_minorversion", "PDF_get_pdi_parameter", "PDF_get_pdi_value", "PDF_open_ccitt", "PDF_open_file", "PDF_open_gif", "PDF_open_image_file", "PDF_open_image", "PDF_open_jpeg", "PDF_open_pdi", "PDF_open_tiff", "PDF_place_image", "PDF_place_pdi_page", "PDF_set_border_color", "PDF_set_border_dash", "PDF_set_border_style", "PDF_set_char_spacing", "PDF_set_duration", "PDF_set_horiz_scaling", "PDF_set_info_author", "PDF_set_info_creator", "PDF_set_info_keywords", "PDF_set_info_subject", "PDF_set_info_title", "PDF_set_leading", "PDF_set_text_matrix", "PDF_set_text_rendering", "PDF_set_text_rise", "PDF_set_word_spacing", "PDF_setgray_fill", "PDF_setgray_stroke", "PDF_setgray", "PDF_setpolydash", "PDF_setrgbcolor_fill", "PDF_setrgbcolor_stroke", "PDF_setrgbcolor", "PDF_show_boxed", "php_check_syntax", "px_set_tablename", "px_set_targetencoding", "runkit_sandbox_output_handler", "session_is_registered", "session_register", "session_unregisterset_magic_quotes_runtime", "magic_quotes_runtime", "set_socket_blocking", "socket_set_blocking", "set_socket_timeout", "socket_set_timeout", "split", "spliti", "sql_regcase"]),
                                    j = e.arrayToMap("cfunction|old_function".split("|")),
                                    k = e.arrayToMap([]);
                                this.$rules = {
                                    start: [{
                                        token: "support.php_tag",
                                        regex: "<\\?(?:php|\\=)"
                                    }, {
                                        token: "support.php_tag",
                                        regex: "\\?>"
                                    }, {
                                        token: "comment",
                                        regex: "<\\!--",
                                        next: "htmlcomment"
                                    }, {
                                        token: "meta.tag",
                                        regex: "<style",
                                        next: "css"
                                    }, {
                                        token: "meta.tag",
                                        regex: "<\\/?[-_a-zA-Z0-9:]+",
                                        next: "htmltag"
                                    }, {
                                        token: "meta.tag",
                                        regex: "<!DOC" + "TYPE.*?>"
                                    }, {
                                        token: "comment",
                                        regex: "\\/\\/.*$"
                                    }, {
                                        token: "comment",
                                        regex: "#.*$"
                                    },
                                    a.getStartRule("doc-start"),
                                    {
                                        token: "comment",
                                        regex: "\\/\\*",
                                        next: "comment"
                                    }, {
                                        token: "string.regexp",
                                        regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/][gimy]*\\s*(?=[).,;]|$)"
                                    }, {
                                        token: "string",
                                        regex: '"',
                                        next: "qqstring"
                                    }, {
                                        token: "string",
                                        regex: "'",
                                        next: "qstring"
                                    }, {
                                        token: "constant.numeric",
                                        regex: "0[xX][0-9a-fA-F]+\\b"
                                    }, {
                                        token: "constant.numeric",
                                        regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                                    }, {
                                        token: "constant.language",
                                        regex: "\\b(?:DEFAULT_INCLUDE_PATH|E_(?:ALL|CO(?:MPILE_(?:ERROR|WARNING)|RE_(?:ERROR|WARNING))|ERROR|NOTICE|PARSE|STRICT|USER_(?:ERROR|NOTICE|WARNING)|WARNING)|P(?:EAR_(?:EXTENSION_DIR|INSTALL_DIR)|HP_(?:BINDIR|CONFIG_FILE_(?:PATH|SCAN_DIR)|DATADIR|E(?:OL|XTENSION_DIR)|INT_(?:MAX|SIZE)|L(?:IBDIR|OCALSTATEDIR)|O(?:S|UTPUT_HANDLER_(?:CONT|END|START))|PREFIX|S(?:API|HLIB_SUFFIX|YSCONFDIR)|VERSION))|__COMPILER_HALT_OFFSET__)\\b"
                                    }, {
                                        token: "constant.language",
                                        regex: "\\b(?:A(?:B(?:DAY_(?:1|2|3|4|5|6|7)|MON_(?:1(?:0|1|2|)|2|3|4|5|6|7|8|9))|LT_DIGITS|M_STR|SSERT_(?:ACTIVE|BAIL|CALLBACK|QUIET_EVAL|WARNING))|C(?:ASE_(?:LOWER|UPPER)|HAR_MAX|O(?:DESET|NNECTION_(?:ABORTED|NORMAL|TIMEOUT)|UNT_(?:NORMAL|RECURSIVE))|R(?:EDITS_(?:ALL|DOCS|FULLPAGE|G(?:ENERAL|ROUP)|MODULES|QA|SAPI)|NCYSTR|YPT_(?:BLOWFISH|EXT_DES|MD5|S(?:ALT_LENGTH|TD_DES)))|URRENCY_SYMBOL)|D(?:AY_(?:1|2|3|4|5|6|7)|ECIMAL_POINT|IRECTORY_SEPARATOR|_(?:FMT|T_FMT))|E(?:NT_(?:COMPAT|NOQUOTES|QUOTES)|RA(?:_(?:D_(?:FMT|T_FMT)|T_FMT|YEAR)|)|XTR_(?:IF_EXISTS|OVERWRITE|PREFIX_(?:ALL|I(?:F_EXISTS|NVALID)|SAME)|SKIP))|FRAC_DIGITS|GROUPING|HTML_(?:ENTITIES|SPECIALCHARS)|IN(?:FO_(?:ALL|C(?:ONFIGURATION|REDITS)|ENVIRONMENT|GENERAL|LICENSE|MODULES|VARIABLES)|I_(?:ALL|PERDIR|SYSTEM|USER)|T_(?:CURR_SYMBOL|FRAC_DIGITS))|L(?:C_(?:ALL|C(?:OLLATE|TYPE)|M(?:ESSAGES|ONETARY)|NUMERIC|TIME)|O(?:CK_(?:EX|NB|SH|UN)|G_(?:A(?:LERT|UTH(?:PRIV|))|C(?:ONS|R(?:IT|ON))|D(?:AEMON|EBUG)|E(?:MERG|RR)|INFO|KERN|L(?:OCAL(?:0|1|2|3|4|5|6|7)|PR)|MAIL|N(?:DELAY|EWS|O(?:TICE|WAIT))|ODELAY|P(?:ERROR|ID)|SYSLOG|U(?:SER|UCP)|WARNING)))|M(?:ON_(?:1(?:0|1|2|)|2|3|4|5|6|7|8|9|DECIMAL_POINT|GROUPING|THOUSANDS_SEP)|_(?:1_PI|2_(?:PI|SQRTPI)|E|L(?:N(?:10|2)|OG(?:10E|2E))|PI(?:_(?:2|4)|)|SQRT(?:1_2|2)))|N(?:EGATIVE_SIGN|O(?:EXPR|STR)|_(?:CS_PRECEDES|S(?:EP_BY_SPACE|IGN_POSN)))|P(?:ATH(?:INFO_(?:BASENAME|DIRNAME|EXTENSION)|_SEPARATOR)|M_STR|OSITIVE_SIGN|_(?:CS_PRECEDES|S(?:EP_BY_SPACE|IGN_POSN)))|RADIXCHAR|S(?:EEK_(?:CUR|END|SET)|ORT_(?:ASC|DESC|NUMERIC|REGULAR|STRING)|TR_PAD_(?:BOTH|LEFT|RIGHT))|T(?:HOUS(?:ANDS_SEP|EP)|_FMT(?:_AMPM|))|YES(?:EXPR|STR)|STD(?:IN|OUT|ERR))\\b"
                                    }, {
                                        token: function (a) {
                                            return c.hasOwnProperty(a) ? "keyword" : g.hasOwnProperty(a) ? "constant.language" : h.hasOwnProperty(a) ? "variable.language" : k.hasOwnProperty(a) ? "invalid.illegal" : b.hasOwnProperty(a) ? "support.function" : a == "debugger" ? "invalid.deprecated" : a.match(/^(\$[a-zA-Z][a-zA-Z0-9_]*|self|parent)$/) ? "variable" : "identifier"
                                        },
                                        regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                                    }, {
                                        token: "keyword.operator",
                                        regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
                                    }, {
                                        token: "lparen",
                                        regex: "[[({]"
                                    }, {
                                        token: "rparen",
                                        regex: "[\\])}]"
                                    }, {
                                        token: "text",
                                        regex: "\\s+"
                                    }],
                                    comment: [{
                                        token: "comment",
                                        regex: ".*?\\*\\/",
                                        next: "start"
                                    }, {
                                        token: "comment",
                                        regex: ".+"
                                    }],
                                    qqstring: [{
                                        token: "constant.language.escape",
                                        regex: '\\\\(?:[nrtvef\\\\"$]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2})'
                                    }, {
                                        token: "constant.language.escape",
                                        regex: /\$[\w\d]+(?:\[[\w\d]+\])?/
                                    }, {
                                        token: "constant.language.escape",
                                        regex: /\$\{[^"\}]+\}?/
                                    }, {
                                        token: "string",
                                        regex: '"',
                                        next: "start"
                                    }, {
                                        token: "string",
                                        regex: ".+?"
                                    }],
                                    qstring: [{
                                        token: "constant.language.escape",
                                        regex: "\\\\['\\\\]"
                                    }, {
                                        token: "string",
                                        regex: "'",
                                        next: "start"
                                    }, {
                                        token: "string",
                                        regex: ".+?"
                                    }],
                                    htmlcomment: [{
                                        token: "comment",
                                        regex: ".*?-->",
                                        next: "start"
                                    }, {
                                        token: "comment",
                                        regex: ".+"
                                    }],
                                    htmltag: [{
                                        token: "meta.tag",
                                        regex: ">",
                                        next: "start"
                                    }, {
                                        token: "text",
                                        regex: "[-_a-zA-Z0-9:]+"
                                    }, {
                                        token: "text",
                                        regex: "\\s+"
                                    }, {
                                        token: "string",
                                        regex: '".*?"'
                                    }, {
                                        token: "string",
                                        regex: "'.*?'"
                                    }],
                                    css: [{
                                        token: "meta.tag",
                                        regex: "</style>",
                                        next: "htmltag"
                                    }, {
                                        token: "meta.tag",
                                        regex: ">"
                                    }, {
                                        token: "text",
                                        regex: "(?:media|type|href)"
                                    }, {
                                        token: "string",
                                        regex: '=".*?"'
                                    }, {
                                        token: "paren.lparen",
                                        regex: "{",
                                        next: "cssdeclaration"
                                    }, {
                                        token: "keyword",
                                        regex: "#[A-Za-z0-9-_.]+"
                                    }, {
                                        token: "variable",
                                        regex: "\\.[A-Za-z0-9-_.]+"
                                    }, {
                                        token: "constant",
                                        regex: "[A-Za-z0-9]+"
                                    }],
                                    cssdeclaration: [{
                                        token: "support.type",
                                        regex: "[-a-zA-Z]+",
                                        next: "cssvalue"
                                    }, {
                                        token: "paren.rparen",
                                        regex: "}",
                                        next: "css"
                                    }],
                                    cssvalue: [{
                                        token: "text",
                                        regex: ":"
                                    }, {
                                        token: "constant",
                                        regex: "#[0-9a-zA-Z]+"
                                    }, {
                                        token: "text",
                                        regex: "[-_0-9a-zA-Z\"' ,%]+"
                                    }, {
                                        token: "text",
                                        regex: ";",
                                        next: "cssdeclaration"
                                    }]
                                }, this.embedRules(f, "doc-", [f.getEndRule("start")])
                            };
                        d.inherits(h, g), b.PhpHighlightRules = h
                    }), ace.define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (a, b, c) {
                        var d = a("../lib/oop"),
                            e = a("./text_highlight_rules").TextHighlightRules,
                            f = function () {
                                this.$rules = {
                                    start: [{
                                        token: "comment.doc.tag",
                                        regex: "@[\\w\\d_]+"
                                    }, {
                                        token: "comment.doc",
                                        merge: !0,
                                        regex: "\\s+"
                                    }, {
                                        token: "comment.doc",
                                        merge: !0,
                                        regex: "TODO"
                                    }, {
                                        token: "comment.doc",
                                        merge: !0,
                                        regex: "[^@\\*]+"
                                    }, {
                                        token: "comment.doc",
                                        merge: !0,
                                        regex: "."
                                    }]
                                }
                            };
                        d.inherits(f, e), f.getStartRule = function (a) {
                            return {
                                token: "comment.doc",
                                merge: !0,
                                regex: "\\/\\*(?=\\*)",
                                next: a
                            }
                        }, f.getEndRule = function (a) {
                            return {
                                token: "comment.doc",
                                merge: !0,
                                regex: "\\*\\/",
                                next: a
                            }
                        }, b.DocCommentHighlightRules = f
                    }), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (a, b, c) {
                        var d = a("../range").Range,
                            e = function () {};
                        (function () {
                            this.checkOutdent = function (a, b) {
                                return /^\s+$/.test(a) ? /^\s*\}/.test(b) : !1
                            }, this.autoOutdent = function (a, b) {
                                var c = a.getLine(b),
                                    e = c.match(/^(\s*\})/);
                                if (!e) return 0;
                                var f = e[1].length,
                                    g = a.findMatchingBracket({
                                        row: b,
                                        column: f
                                    });
                                if (!g || g.row == b) return 0;
                                var h = this.$getIndent(a.getLine(g.row));
                                a.replace(new d(b, 0, b, f - 1), h)
                            }, this.$getIndent = function (a) {
                                var b = a.match(/^(\s+)/);
                                return b ? b[1] : ""
                            }
                        }).call(e.prototype), b.MatchingBraceOutdent = e
                    }), ace.define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour"], function (a, b, c) {
                        var d = a("../../lib/oop"),
                            e = a("../behaviour").Behaviour,
                            f = function () {
                                this.add("braces", "insertion", function (a, b, c, d, e) {
                                    if (e == "{") {
                                        var f = c.getSelectionRange(),
                                            g = d.doc.getTextRange(f);
                                        return g !== "" ? {
                                            text: "{" + g + "}",
                                            selection: !1
                                        } : {
                                            text: "{}",
                                            selection: [1, 1]
                                        }
                                    }
                                    if (e == "}") {
                                        var h = c.getCursorPosition(),
                                            i = d.doc.getLine(h.row),
                                            j = i.substring(h.column, h.column + 1);
                                        if (j == "}") {
                                            var k = d.$findOpeningBracket("}", {
                                                column: h.column + 1,
                                                row: h.row
                                            });
                                            if (k !== null) return {
                                                text: "",
                                                selection: [1, 1]
                                            }
                                        }
                                    } else if (e == "\n") {
                                        var h = c.getCursorPosition(),
                                            i = d.doc.getLine(h.row),
                                            j = i.substring(h.column, h.column + 1);
                                        if (j == "}") {
                                            var l = d.findMatchingBracket({
                                                row: h.row,
                                                column: h.column + 1
                                            });
                                            if (!l) return null;
                                            var m = this.getNextLineIndent(a, i.substring(0, i.length - 1), d.getTabString()),
                                                n = this.$getIndent(d.doc.getLine(l.row));
                                            return {
                                                text: "\n" + m + "\n" + n,
                                                selection: [1, m.length, 1, m.length]
                                            }
                                        }
                                    }
                                }), this.add("braces", "deletion", function (a, b, c, d, e) {
                                    var f = d.doc.getTextRange(e);
                                    if (!e.isMultiLine() && f == "{") {
                                        var g = d.doc.getLine(e.start.row),
                                            h = g.substring(e.end.column, e.end.column + 1);
                                        if (h == "}") return e.end.column++, e
                                    }
                                }), this.add("parens", "insertion", function (a, b, c, d, e) {
                                    if (e == "(") {
                                        var f = c.getSelectionRange(),
                                            g = d.doc.getTextRange(f);
                                        return g !== "" ? {
                                            text: "(" + g + ")",
                                            selection: !1
                                        } : {
                                            text: "()",
                                            selection: [1, 1]
                                        }
                                    }
                                    if (e == ")") {
                                        var h = c.getCursorPosition(),
                                            i = d.doc.getLine(h.row),
                                            j = i.substring(h.column, h.column + 1);
                                        if (j == ")") {
                                            var k = d.$findOpeningBracket(")", {
                                                column: h.column + 1,
                                                row: h.row
                                            });
                                            if (k !== null) return {
                                                text: "",
                                                selection: [1, 1]
                                            }
                                        }
                                    }
                                }), this.add("parens", "deletion", function (a, b, c, d, e) {
                                    var f = d.doc.getTextRange(e);
                                    if (!e.isMultiLine() && f == "(") {
                                        var g = d.doc.getLine(e.start.row),
                                            h = g.substring(e.start.column + 1, e.start.column + 2);
                                        if (h == ")") return e.end.column++, e
                                    }
                                }), this.add("brackets", "insertion", function (a, b, c, d, e) {
                                    if (e == "[") {
                                        var f = c.getSelectionRange(),
                                            g = d.doc.getTextRange(f);
                                        return g !== "" ? {
                                            text: "[" + g + "]",
                                            selection: !1
                                        } : {
                                            text: "[]",
                                            selection: [1, 1]
                                        }
                                    }
                                    if (e == "]") {
                                        var h = c.getCursorPosition(),
                                            i = d.doc.getLine(h.row),
                                            j = i.substring(h.column, h.column + 1);
                                        if (j == "]") {
                                            var k = d.$findOpeningBracket("]", {
                                                column: h.column + 1,
                                                row: h.row
                                            });
                                            if (k !== null) return {
                                                text: "",
                                                selection: [1, 1]
                                            }
                                        }
                                    }
                                }), this.add("brackets", "deletion", function (a, b, c, d, e) {
                                    var f = d.doc.getTextRange(e);
                                    if (!e.isMultiLine() && f == "[") {
                                        var g = d.doc.getLine(e.start.row),
                                            h = g.substring(e.start.column + 1, e.start.column + 2);
                                        if (h == "]") return e.end.column++, e
                                    }
                                }), this.add("string_dquotes", "insertion", function (a, b, c, d, e) {
                                    if (e == '"' || e == "'") {
                                        var f = e,
                                            g = c.getSelectionRange(),
                                            h = d.doc.getTextRange(g);
                                        if (h !== "") return {
                                            text: f + h + f,
                                            selection: !1
                                        };
                                        var i = c.getCursorPosition(),
                                            j = d.doc.getLine(i.row),
                                            k = j.substring(i.column - 1, i.column);
                                        if (k == "\\") return null;
                                        var l = d.getTokens(g.start.row),
                                            m = 0,
                                            n, o = -1;
                                        for (var p = 0; p < l.length; p++) {
                                            n = l[p], n.type == "string" ? o = -1 : o < 0 && (o = n.value.indexOf(f));
                                            if (n.value.length + m > g.start.column) break;
                                            m += l[p].value.length
                                        }
                                        if (!n || o < 0 && n.type !== "comment" && (n.type !== "string" || g.start.column !== n.value.length + m - 1 && n.value.lastIndexOf(f) === n.value.length - 1)) return {
                                            text: f + f,
                                            selection: [1, 1]
                                        };
                                        if (n && n.type === "string") {
                                            var q = j.substring(i.column, i.column + 1);
                                            if (q == f) return {
                                                text: "",
                                                selection: [1, 1]
                                            }
                                        }
                                    }
                                }), this.add("string_dquotes", "deletion", function (a, b, c, d, e) {
                                    var f = d.doc.getTextRange(e);
                                    if (!e.isMultiLine() && (f == '"' || f == "'")) {
                                        var g = d.doc.getLine(e.start.row),
                                            h = g.substring(e.start.column + 1, e.start.column + 2);
                                        if (h == '"') return e.end.column++, e
                                    }
                                })
                            };
                        d.inherits(f, e), b.CstyleBehaviour = f
                    }), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (a, b, c) {
                        var d = a("../../lib/oop"),
                            e = a("../../range").Range,
                            f = a("./fold_mode").FoldMode,
                            g = b.FoldMode = function () {};
                        d.inherits(g, f), function () {
                            this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.getFoldWidgetRange = function (a, b, c) {
                                var d = a.getLine(c),
                                    f = d.match(this.foldingStartMarker);
                                if (f) {
                                    var g = f.index;
                                    if (f[1]) return this.openingBracketBlock(a, f[1], c, g);
                                    var h = a.getCommentFoldRange(c, g + f[0].length);
                                    return h.end.column -= 2, h
                                }
                                if (b !== "markbeginend") return;
                                var f = d.match(this.foldingStopMarker);
                                if (f) {
                                    var g = f.index + f[0].length;
                                    if (f[2]) {
                                        var h = a.getCommentFoldRange(c, g);
                                        return h.end.column -= 2, h
                                    }
                                    var i = {
                                        row: c,
                                        column: g
                                    },
                                        j = a.$findOpeningBracket(f[1], i);
                                    if (!j) return;
                                    return j.column++, i.column--, e.fromPoints(j, i)
                                }
                            }
                        }.call(g.prototype)
                    }), ace.define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (a, b, c) {
                        var d = a("../../range").Range,
                            e = b.FoldMode = function () {};
                        (function () {
                            this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function (a, b, c) {
                                var d = a.getLine(c);
                                return this.foldingStartMarker.test(d) ? "start" : b == "markbeginend" && this.foldingStopMarker && this.foldingStopMarker.test(d) ? "end" : ""
                            }, this.getFoldWidgetRange = function (a, b, c) {
                                return null
                            }, this.indentationBlock = function (a, b, c) {
                                var e = /\S/,
                                    f = a.getLine(b),
                                    g = f.search(e);
                                if (g == -1) return;
                                var h = c || f.length,
                                    i = a.getLength(),
                                    j = b,
                                    k = b;
                                while (++b < i) {
                                    var l = a.getLine(b).search(e);
                                    if (l == -1) continue;
                                    if (l <= g) break;
                                    k = b
                                }
                                if (k > j) {
                                    var m = a.getLine(k).length;
                                    return new d(j, h, k, m)
                                }
                            }, this.openingBracketBlock = function (a, b, c, e, f) {
                                var g = {
                                    row: c,
                                    column: e + 1
                                },
                                    h = a.$findClosingBracket(b, g, f);
                                if (!h) return;
                                var i = a.foldWidgets[h.row];
                                return i == null && (i = this.getFoldWidget(a, h.row)), i == "start" && h.row > g.row && (h.row--, h.column = a.getLine(h.row).length), d.fromPoints(g, h)
                            }
                        }).call(e.prototype)
                    })