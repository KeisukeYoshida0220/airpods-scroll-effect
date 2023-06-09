!function(t) {
  var e = {};
  function i(r) {
      if (e[r])
          return e[r].exports;
      var s = e[r] = {
          i: r,
          l: !1,
          exports: {}
      };
      return t[r].call(s.exports, s, s.exports, i),
      s.l = !0,
      s.exports
  }
  i.m = t,
  i.c = e,
  i.d = function(t, e, r) {
      i.o(t, e) || Object.defineProperty(t, e, {
          enumerable: !0,
          get: r
      })
  }
  ,
  i.r = function(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
          value: "Module"
      }),
      Object.defineProperty(t, "__esModule", {
          value: !0
      })
  }
  ,
  i.t = function(t, e) {
      if (1 & e && (t = i(t)),
      8 & e)
          return t;
      if (4 & e && "object" == typeof t && t && t.__esModule)
          return t;
      var r = Object.create(null);
      if (i.r(r),
      Object.defineProperty(r, "default", {
          enumerable: !0,
          value: t
      }),
      2 & e && "string" != typeof t)
          for (var s in t)
              i.d(r, s, function(e) {
                  return t[e]
              }
              .bind(null, s));
      return r
  }
  ,
  i.n = function(t) {
      var e = t && t.__esModule ? function() {
          return t.default
      }
      : function() {
          return t
      }
      ;
      return i.d(e, "a", e),
      e
  }
  ,
  i.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
  }
  ,
  i.p = "/",
  i(i.s = 144)
}([function(t, e) {
  t.exports = function(t) {
      return t && t.__esModule ? t : {
          default: t
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      PICTURE_DATA_DOWNLOAD_AREA_KEYFRAME: "data-download-area-keyframe",
      PICTURE_DATA_LAZY: "data-lazy",
      PICTURE_DATA_EMPTY_SOURCE: "data-empty",
      PICTURE_DATA_LOADED: "data-picture-loaded",
      PICTURE_CLASS_LOADED: "loaded"
  }
}
, function(t, e, i) {
  "use strict";
  const r = {
      GUI_INSTANCE: null,
      ANIM_INSTANCE: null,
      VIEWPORT_EMITTER_ELEMENT: void 0,
      LOCAL_STORAGE_KEYS: {
          GuiPosition: "anim-ui.position",
          GroupCollapsedStates: "anim-ui.group-collapsed-states",
          scrollY: "anim-ui.scrollY-position",
          path: "anim-ui.path"
      },
      RESIZE_TIMEOUT: -1,
      BREAKPOINTS: [{
          name: "S",
          mediaQuery: "only screen and (max-width: 734px)"
      }, {
          name: "M",
          mediaQuery: "only screen and (max-width: 1068px)"
      }, {
          name: "L",
          mediaQuery: "only screen and (min-width: 1069px)"
      }],
      getBreakpoint: function() {
          for (let t = 0; t < r.BREAKPOINTS.length; t++) {
              let e = r.BREAKPOINTS[t];
              if (window.matchMedia(e.mediaQuery).matches)
                  return e.name
          }
      },
      KeyframeDefaults: {
          ease: 1,
          epsilon: .05,
          preserveState: !1,
          easeFunctionString: "linear",
          easeFunction: "linear",
          hold: !1,
          snapAtCreation: !1,
          toggle: !1,
          breakpointMask: "SMLX",
          event: "",
          disabledWhen: [],
          cssClass: ""
      },
      KeyframeTypes: {
          Interpolation: 0,
          InterpolationForward: 1,
          CSSClass: 2,
          Event: 3
      },
      EVENTS: {
          ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
          ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
          ON_GROUP_CREATED: "ON_GROUP_CREATED",
          ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
          ON_TIMELINE_START: "ON_TIMELINE_START",
          ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
          ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE",
          ON_CHAPTER_INITIATED: "ON_CHAPTER_INITIATED",
          ON_CHAPTER_OCCURRED: "ON_CHAPTER_OCCURRED",
          ON_CHAPTER_COMPLETED: "ON_CHAPTER_COMPLETED"
      },
      PageEvents: {
          ON_SCROLL: "ON_SCROLL",
          ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE",
          ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED",
          ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE"
      },
      KeyframeJSONReservedWords: ["event", "cssClass", "style", "anchors", "start", "end", "epsilon", "easeFunction", "ease", "breakpointMask", "disabledWhen"],
      TweenProps: i(24),
      TargetValue: i(5),
      CSSTargetValue: i(25),
      pageMetrics: new function() {
          this.scrollX = 0,
          this.scrollY = 0,
          this.windowWidth = 0,
          this.windowHeight = 0,
          this.documentOffsetX = 0,
          this.documentOffsetY = 0,
          this.previousBreakpoint = "",
          this.breakpoint = ""
      }
      ,
      KeyframeComparison: function(t, e) {
          return t.start < e.start ? -1 : t.start > e.start ? 1 : 0
      }
  };
  t.exports = r
}
, function(t, e, i) {
  "use strict";
  const r = i(4).EventEmitterMicro
    , s = {
      create: i(8),
      update: i(14),
      draw: i(15)
  }
    , n = ()=>{}
  ;
  let a = 0;
  t.exports = class extends r {
      constructor(t) {
          super(),
          this.el = t.el,
          this.gum = t.gum,
          this.componentName = t.componentName,
          this._keyframeController = null
      }
      destroy() {
          this.el = null,
          this.gum = null,
          this._keyframeController = null,
          super.destroy()
      }
      addKeyframe(t) {
          const e = t.el || this.el;
          return (t.group || this.anim).addKeyframe(e, t)
      }
      addDiscreteEvent(t) {
          t.event = t.event || "Generic-Event-Name-" + a++;
          let e = void 0 !== t.end && t.end !== t.start;
          const i = this.addKeyframe(t);
          return e ? (t.onEnterOnce && i.controller.once(t.event + ":enter", t.onEnterOnce),
          t.onExitOnce && i.controller.once(t.event + ":exit", t.onExitOnce),
          t.onEnter && i.controller.on(t.event + ":enter", t.onEnter),
          t.onExit && i.controller.on(t.event + ":exit", t.onExit)) : (t.onEventOnce && i.controller.once(t.event, t.onEventOnce),
          t.onEventReverseOnce && i.controller.once(t.event + ":reverse", t.onEventReverseOnce),
          t.onEvent && i.controller.on(t.event, t.onEvent),
          t.onEventReverse && i.controller.on(t.event + ":reverse", t.onEventReverse)),
          i
      }
      addRAFLoop(t) {
          let e = ["start", "end"];
          if (!e.every((e=>t.hasOwnProperty(e))))
              return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + e.join(" "));
          const i = new s.create;
          i.on("update", t.onUpdate || n),
          i.on("draw", t.onDraw || n),
          i.on("draw", (()=>i.run()));
          const {onEnter: r, onExit: a} = t;
          return t.onEnter = ()=>{
              i.run(),
              r && r()
          }
          ,
          t.onExit = ()=>{
              i.cancel(),
              a && a()
          }
          ,
          this.addDiscreteEvent(t)
      }
      addContinuousEvent(t) {
          t.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"),
          t.event = t.event || "Generic-Event-Name-" + a++;
          let e = this.addKeyframe(t);
          return e.controller.on(t.event, t.onDraw),
          e
      }
      mounted() {}
      onResizeImmediate(t) {}
      onResizeDebounced(t) {}
      onBreakpointChange(t) {}
      get anim() {
          return this.gum.anim
      }
      get keyframeController() {
          return this._keyframeController || (this._keyframeController = this.anim.getControllerForTarget(this.el))
      }
      get pageMetrics() {
          return this.anim.model.pageMetrics
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      EventEmitterMicro: i(19)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = class {
      constructor(t, e, i, r) {
          let s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4]
            , n = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : void 0;
          this.epsilon = parseFloat(e),
          this.snapAtCreation = i,
          this.initialValue = t,
          this.target = t,
          this.current = t,
          this.previousValue = t,
          this.isActive = !1,
          this.key = r,
          this.round = s,
          this.suffix = n
      }
      update(t, e, i) {
          this.target = t[0] + e * (t[1] - t[0]),
          this.previousValue = this.current,
          this.current += (this.target - this.current) * i;
          let r = this.delta(this.current, this.target);
          return r < this.epsilon && (this.current = this.target,
          r = 0),
          r > this.epsilon || 0 === r && this.previousValue !== this.current
      }
      reconcile(t, e) {
          return this.initialValue = t[0],
          this.update(t, e, 1)
      }
      needsUpdate() {
          return this.delta(this.current, this.target) > this.epsilon
      }
      delta(t, e) {
          return Math.abs(t - e)
      }
      calculateEpsilon(t, e) {
          if (t.epsilon)
              return void (this.epsilon = t.epsilon);
          let i = this.delta(e[0], e[1])
            , r = Math.min(.001 * i, this.epsilon, .05);
          this.epsilon = Math.max(r, .001)
      }
      set(t) {
          let e = this.current;
          this.round && (e = Math.round(e)),
          this.suffix && (e += this.suffix),
          t[this.key] = e
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      lerp: function(t, e, i) {
          return e + (i - e) * t
      },
      map: function(t, e, i, r, s) {
          return r + (s - r) * (t - e) / (i - e)
      },
      mapClamp: function(t, e, i, r, s) {
          var n = r + (s - r) * (t - e) / (i - e);
          return Math.max(r, Math.min(s, n))
      },
      norm: function(t, e, i) {
          return (t - e) / (i - e)
      },
      clamp: function(t, e, i) {
          return Math.max(e, Math.min(i, t))
      },
      randFloat: function(t, e) {
          return Math.random() * (e - t) + t
      },
      randInt: function(t, e) {
          return Math.floor(Math.random() * (e - t) + t)
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(12));
  var n = class {
      constructor(t) {
          this.options = t,
          this.media = t.media,
          this.mounted = this.mounted.bind(this),
          this.media.on(s.default.MOUNTED, this.mounted)
      }
      mounted() {}
      static get isSupported() {
          return !0
      }
      destroy() {}
  }
  ;
  e.default = n
}
, function(t, e, i) {
  "use strict";
  var r, s = i(4).EventEmitterMicro, n = i(50), a = i(53);
  function o(t) {
      t = t || {},
      s.call(this),
      this.id = a.getNewID(),
      this.executor = t.executor || n,
      this._reset(),
      this._willRun = !1,
      this._didDestroy = !1
  }
  (r = o.prototype = Object.create(s.prototype)).run = function() {
      return this._willRun || (this._willRun = !0),
      this._subscribe()
  }
  ,
  r.cancel = function() {
      this._unsubscribe(),
      this._willRun && (this._willRun = !1),
      this._reset()
  }
  ,
  r.destroy = function() {
      var t = this.willRun();
      return this.cancel(),
      this.executor = null,
      s.prototype.destroy.call(this),
      this._didDestroy = !0,
      t
  }
  ,
  r.willRun = function() {
      return this._willRun
  }
  ,
  r.isRunning = function() {
      return this._isRunning
  }
  ,
  r._subscribe = function() {
      return this.executor.subscribe(this)
  }
  ,
  r._unsubscribe = function() {
      return this.executor.unsubscribe(this)
  }
  ,
  r._onAnimationFrameStart = function(t) {
      this._isRunning = !0,
      this._willRun = !1,
      this._didEmitFrameData || (this._didEmitFrameData = !0,
      this.trigger("start", t))
  }
  ,
  r._onAnimationFrameEnd = function(t) {
      this._willRun || (this.trigger("stop", t),
      this._reset())
  }
  ,
  r._reset = function() {
      this._didEmitFrameData = !1,
      this._isRunning = !1
  }
  ,
  t.exports = o
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      disabledWhen: ["no-enhanced", "text-zoom"],
      ease: .25
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(54)
    , s = function() {
      this.events = {}
  }
    , n = s.prototype;
  n.requestAnimationFrame = function(t) {
      return this.events[t] || (this.events[t] = new r(t)),
      this.events[t].requestAnimationFrame
  }
  ,
  n.cancelAnimationFrame = function(t) {
      return this.events[t] || (this.events[t] = new r(t)),
      this.events[t].cancelAnimationFrame
  }
  ,
  t.exports = new s
}
, function(t, e, i) {
  "use strict";
  const r = i(2)
    , s = i(5)
    , n = i(25)
    , a = i(6)
    , o = i(58)
    , h = i(59)
    , l = i(60)
    , u = i(16)
    , c = i(61)
    , d = i(26)
    , f = i(27)
    , {cssAttributes: p, suffixFreeAttributes: m, domAttributes: g} = i(28);
  class _ {
      constructor(t, e) {
          this.controller = t,
          this.anchors = [],
          this.jsonProps = e,
          this.ease = t.group.defaultEase,
          this.easeFunction = o.linear,
          this.start = 0,
          this.end = 0,
          this.localT = 0,
          this.curvedT = 0,
          this.id = 0,
          this.event = "",
          this.needsEventDispatch = !1,
          this.snapAtCreation = !1,
          this.isEnabled = !1,
          this.animValues = {},
          this.breakpointMask = r.KeyframeDefaults.breakpointMask,
          this.disabledWhen = [],
          this.keyframeType = r.KeyframeTypes.Interpolation,
          this.hold = !1,
          this.preserveState = !1,
          this.markedForRemoval = !1;
          let i = !1;
          Object.defineProperty(this, "hidden", {
              get: ()=>i,
              set(e) {
                  i = e,
                  t.group.keyframesDirty = !0
              }
          }),
          this.uuid = f(),
          this.destroyed = !1
      }
      destroy() {
          this.destroyed = !0,
          this.controller = null,
          this.disabledWhen = null,
          this.anchors = null,
          this.jsonProps = null,
          this.easeFunction = null,
          this.animValues = null
      }
      remove() {
          return this.controller.removeKeyframe(this)
      }
      parseOptions(t) {
          this.jsonProps = t,
          t.relativeTo && console.error(`KeyframeError: relativeTo has been removed. Use 'anchors' property instead. Found 'relativeTo':"${t.relativeTo}"`),
          void 0 === t.end && void 0 === t.duration && (t.end = t.start),
          "" !== t.anchors && t.anchors ? (this.anchors = [],
          t.anchors = Array.isArray(t.anchors) ? t.anchors : [t.anchors],
          t.anchors.forEach(((e,i)=>{
              let r = c(e, this.controller.group.element);
              if (!r) {
                  let r = "";
                  return "string" == typeof e && (r = " Provided value was a string, so a failed attempt was made to find anchor with the provided querystring in group.element, or in the document."),
                  void console.warn("Keyframe on", this.controller.element, ` failed to find anchor at index ${i} in array`, t.anchors, `. Anchors must be JS Object references, Elements references, or valid query selector strings. ${r}`)
              }
              this.anchors.push(r),
              this.controller.group.metrics.add(r)
          }
          ))) : (this.anchors = [],
          t.anchors = []),
          t.ease ? this.ease = parseFloat(t.ease) : t.ease = this.ease,
          t.hasOwnProperty("snapAtCreation") ? this.snapAtCreation = t.snapAtCreation : t.snapAtCreation = this.snapAtCreation,
          t.easeFunction || (t.easeFunction = r.KeyframeDefaults.easeFunctionString),
          t.breakpointMask ? this.breakpointMask = t.breakpointMask : t.breakpointMask = this.breakpointMask,
          t.disabledWhen ? this.disabledWhen = Array.isArray(t.disabledWhen) ? t.disabledWhen : [t.disabledWhen] : t.disabledWhen = this.disabledWhen,
          t.hasOwnProperty("hold") ? this.hold = t.hold : t.hold = this.hold,
          t.hasOwnProperty("preserveState") ? this.preserveState = t.preserveState : t.preserveState = r.KeyframeDefaults.preserveState,
          this.easeFunction = o[t.easeFunction],
          o.hasOwnProperty(t.easeFunction) || (t.easeFunction.includes("bezier") ? this.easeFunction = h.fromCSSString(t.easeFunction) : t.easeFunction.includes("spring") ? this.easeFunction = l.fromCSSString(t.easeFunction) : console.error("Keyframe parseOptions cannot find 'easeFunction' named '" + t.easeFunction + "'"));
          for (let e in t) {
              if (-1 !== r.KeyframeJSONReservedWords.indexOf(e))
                  continue;
              let i = t[e];
              if (Array.isArray(i)) {
                  if (1 === i.length && (i[1] = i[0],
                  i[0] = null),
                  void 0 === this.controller.tweenProps[e] || !this.controller._ownerIsElement) {
                      let a = 0;
                      this.controller._ownerIsElement || (a = this.controller.element[e] || 0);
                      const o = e.startsWith("--");
                      let h = i[2] || (o || m.includes(e) ? void 0 : "px")
                        , l = this.controller.group.anim.plugins.keyframe.reduce(((i,r)=>i || r.parseProp.call(this, t, e)), null);
                      if (!l && this.controller._ownerIsElement)
                          if (o || p.includes(e)) {
                              let i = d(e)
                                , s = t.round || ["zIndex"].includes(i);
                              a = parseFloat(this.controller.getTargetComputedStyle().getPropertyValue(i)),
                              isNaN(a) && (a = 0),
                              l = new n(a,r.KeyframeDefaults.epsilon,this.snapAtCreation,e,s,h),
                              this.controller.cssAttributes.push(l)
                          } else
                              g.includes(e) && (l = new s(a,r.KeyframeDefaults.epsilon,this.snapAtCreation,e,t.round,h),
                              this.controller.domAttributes.push(l));
                      l || (l = new s(a,r.KeyframeDefaults.epsilon,this.snapAtCreation,e,t.round,h)),
                      this.controller.tweenProps[e] = l
                  }
                  this.animValues[e] = this.controller.group.expressionParser.parseArray(this, i),
                  this.controller.tweenProps[e].calculateEpsilon(t, this.animValues[e])
              }
          }
          this.keyframeType = this.hold ? r.KeyframeTypes.InterpolationForward : r.KeyframeTypes.Interpolation,
          t.event && (this.event = t.event)
      }
      overwriteProps(t) {
          this.animValues = {};
          let e = Object.assign({}, this.jsonProps, t);
          this.controller.updateKeyframe(this, e)
      }
      updateLocalProgress(t) {
          if (this.start === this.end || t < this.start || t > this.end)
              return this.localT = t < this.start ? this.hold ? this.localT : 0 : t > this.end ? 1 : 0,
              void (this.curvedT = this.easeFunction(this.localT));
          const e = (t - this.start) / (this.end - this.start)
            , i = this.hold ? this.localT : 0;
          this.localT = a.clamp(e, i, 1),
          this.curvedT = this.easeFunction(this.localT)
      }
      reconcile(t) {
          this.controller.tweenProps[t].reconcile(this.animValues[t], this.curvedT) && (this.needsEventDispatch || (this.needsEventDispatch = !0,
          this.controller.keyframesRequiringDispatch.push(this)))
      }
      reset(t) {
          this.localT = t || 0;
          let e = this.ease;
          this.ease = 1;
          for (let t in this.animValues)
              this.reconcile(t);
          this.ease = e
      }
      onDOMRead(t) {
          let e = this.controller.tweenProps[t].update(this.animValues[t], this.curvedT, this.ease);
          return "" === this.event || this.needsEventDispatch || e && (this.needsEventDispatch = !0,
          this.controller.keyframesRequiringDispatch.push(this)),
          e
      }
      isInRange(t) {
          return t >= this.start && t <= this.end
      }
      setEnabled(t) {
          t = t || u(Array.from(document.documentElement.classList));
          let e = -1 !== this.breakpointMask.indexOf(r.pageMetrics.breakpoint)
            , i = !1;
          return this.disabledWhen.length > 0 && (i = this.disabledWhen.some((e=>void 0 !== t[e]))),
          this.isEnabled = e && !i,
          this.isEnabled
      }
      evaluateConstraints() {
          this.start = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.start),
          this.end = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.end),
          this.evaluateInterpolationConstraints()
      }
      evaluateInterpolationConstraints() {
          for (let t in this.animValues) {
              let e = this.jsonProps[t];
              this.animValues[t] = this.controller.group.expressionParser.parseArray(this, e)
          }
      }
  }
  _.DATA_ATTRIBUTE = "data-anim-tween",
  t.exports = _
}
, function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  e.default = {
      MOUNTED: "MOUNTED",
      MEDIA_LOAD_START: "MEDIA_LOAD_START",
      MEDIA_LOAD_COMPLETE: "MEDIA_LOAD_COMPLETE",
      MEDIA_LOAD_ERROR: "MEDIA_LOAD_ERROR",
      PLAYBACK_STATE_CHANGE: "PLAYBACK_STATE_CHANGE",
      LOADING_STATE_CHANGE: "LOADING_STATE_CHANGE"
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      SharedInstance: i(51)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(10);
  t.exports = r.requestAnimationFrame("update")
}
, function(t, e, i) {
  "use strict";
  var r = i(10);
  t.exports = r.requestAnimationFrame("draw")
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return t.reduce(((t,e)=>(t[e] = e,
      t)), {})
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(11)
    , s = i(2)
    , n = i(5);
  class a extends r {
      constructor(t, e) {
          super(t, e),
          this.keyframeType = s.KeyframeTypes.CSSClass,
          this._triggerType = a.TRIGGER_TYPE_CSS_CLASS,
          this.cssClass = "",
          this.friendlyName = "",
          this.style = {
              on: null,
              off: null
          },
          this.toggle = s.KeyframeDefaults.toggle,
          this.isApplied = !1
      }
      parseOptions(t) {
          if (!this.controller._ownerIsElement)
              throw new TypeError("CSS Keyframes cannot be applied to JS Objects");
          if (t.x = void 0,
          t.y = void 0,
          t.z = void 0,
          t.scale = void 0,
          t.scaleX = void 0,
          t.scaleY = void 0,
          t.rotationX = void 0,
          t.rotationY = void 0,
          t.rotationZ = void 0,
          t.rotation = void 0,
          t.opacity = void 0,
          t.hold = void 0,
          void 0 !== t.toggle && (this.toggle = t.toggle),
          void 0 !== t.cssClass)
              this._triggerType = a.TRIGGER_TYPE_CSS_CLASS,
              this.cssClass = t.cssClass,
              this.friendlyName = "." + this.cssClass,
              void 0 === this.controller.tweenProps.targetClasses && (this.controller.tweenProps.targetClasses = {
                  add: [],
                  remove: []
              });
          else {
              if (void 0 === t.style || !this.isValidStyleProperty(t.style))
                  throw new TypeError("KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid");
              if (this._triggerType = a.TRIGGER_TYPE_STYLE_PROPERTY,
              this.style = t.style,
              this.friendlyName = "style",
              this.toggle = void 0 !== this.style.off || this.toggle,
              this.toggle && void 0 === this.style.off) {
                  this.style.off = {};
                  for (let t in this.style.on)
                      this.style.off[t] = ""
              }
              void 0 === this.controller.tweenProps.targetStyles && (this.controller.tweenProps.targetStyles = {})
          }
          if (void 0 === t.end && (t.end = t.start),
          t.toggle = this.toggle,
          this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
              this.isApplied = this.controller.element.classList.contains(this.cssClass);
          else {
              let t = getComputedStyle(this.controller.element);
              this.isApplied = !0;
              for (let e in this.style.on)
                  if (t[e] !== this.style.on[e]) {
                      this.isApplied = !1;
                      break
                  }
          }
          r.prototype.parseOptions.call(this, t),
          this.animValues[this.friendlyName] = [0, 0],
          void 0 === this.controller.tweenProps[this.friendlyName] && (this.controller.tweenProps[this.friendlyName] = new n(0,1,!1,this.friendlyName)),
          this.keyframeType = s.KeyframeTypes.CSSClass
      }
      updateLocalProgress(t) {
          this.isApplied && !this.toggle || (this.start !== this.end ? !this.isApplied && t >= this.start && t <= this.end ? this._apply() : this.isApplied && this.toggle && (t < this.start || t > this.end) && this._unapply() : !this.isApplied && t >= this.start ? this._apply() : this.isApplied && this.toggle && t < this.start && this._unapply())
      }
      _apply() {
          if (this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
              this.controller.tweenProps.targetClasses.add.push(this.cssClass),
              this.controller.needsClassUpdate = !0;
          else {
              for (let t in this.style.on)
                  this.controller.tweenProps.targetStyles[t] = this.style.on[t];
              this.controller.needsStyleUpdate = !0
          }
          this.isApplied = !0
      }
      _unapply() {
          if (this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
              this.controller.tweenProps.targetClasses.remove.push(this.cssClass),
              this.controller.needsClassUpdate = !0;
          else {
              for (let t in this.style.off)
                  this.controller.tweenProps.targetStyles[t] = this.style.off[t];
              this.controller.needsStyleUpdate = !0
          }
          this.isApplied = !1
      }
      isValidStyleProperty(t) {
          if (!t.hasOwnProperty("on"))
              return !1;
          if ("object" != typeof t.on)
              throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
          if (this.toggle && t.hasOwnProperty("off") && "object" != typeof t.off)
              throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
          return !0
      }
      reconcile(t) {}
      onDOMRead(t) {}
      evaluateInterpolationConstraints() {}
  }
  a.TRIGGER_TYPE_CSS_CLASS = 0,
  a.TRIGGER_TYPE_STYLE_PROPERTY = 1,
  a.DATA_ATTRIBUTE = "data-anim-classname",
  t.exports = a
}
, function(t, e, i) {
  "use strict";
  const r = i(4).EventEmitterMicro
    , s = i(6)
    , n = i(16)
    , a = i(2)
    , o = i(30)
    , h = i(62)
    , l = i(63)
    , u = i(31)
    , c = i(41)
    , d = i(65)
    , f = {};
  "undefined" != typeof window && (f.create = i(8),
  f.update = i(14),
  f.draw = i(15));
  let p = 0;
  t.exports = class extends r {
      constructor(t, e) {
          super(),
          this.anim = e,
          this.element = t,
          this.name = this.name || t.getAttribute("data-anim-scroll-group"),
          this.isEnabled = !0,
          this.position = new h,
          this.metrics = new u,
          this.metrics.add(this.element),
          this.expressionParser = new c(this),
          this.boundsMin = 0,
          this.boundsMax = 0,
          this.timelineUpdateRequired = !1,
          this._keyframesDirty = !1,
          this.viewableRange = this.createViewableRange(),
          this.defaultEase = a.KeyframeDefaults.ease,
          this.keyframeControllers = [],
          this.updateProgress(this.getPosition()),
          this.onDOMRead = this.onDOMRead.bind(this),
          this.onDOMWrite = this.onDOMWrite.bind(this),
          this.gui = null,
          this.computedStyleCache = {},
          this.destroyed = !1,
          this.finalizeInit()
      }
      finalizeInit() {
          this.element._animInfo = new o(this,null,!0),
          this.setupRAFEmitter()
      }
      destroy() {
          this.destroyed = !0,
          this.expressionParser.destroy(),
          this.expressionParser = null;
          for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].destroy();
          this.keyframeControllers = null,
          this.position = null,
          this.viewableRange = null,
          this.gui && (this.gui.destroy(),
          this.gui = null),
          this.metrics.destroy(),
          this.metrics = null,
          this.rafEmitter.destroy(),
          this.rafEmitter = null,
          this.anim = null,
          this.element._animInfo && this.element._animInfo.group === this && (this.element._animInfo.group = null,
          this.element._animInfo = null),
          this.element = null,
          this.isEnabled = !1,
          super.destroy()
      }
      removeKeyframeController(t) {
          return this.keyframeControllers.includes(t) ? (t._allKeyframes.forEach((t=>t.markedForRemoval = !0)),
          this.keyframesDirty = !0,
          new Promise((e=>{
              f.draw((()=>{
                  const i = this.keyframeControllers.indexOf(t);
                  -1 !== i ? (this.keyframeControllers.splice(i, 1),
                  t.onDOMWrite(),
                  t.destroy(),
                  this.gui && this.gui.create(),
                  e()) : e()
              }
              ))
          }
          ))) : Promise.resolve()
      }
      remove() {
          return this.anim.removeGroup(this)
      }
      clear() {
          return Promise.all(this.keyframeControllers.map((t=>this.removeKeyframeController(t))))
      }
      setupRAFEmitter(t) {
          this.rafEmitter && this.rafEmitter.destroy(),
          this.rafEmitter = t || new f.create,
          this.rafEmitter.on("update", this.onDOMRead),
          this.rafEmitter.on("draw", this.onDOMWrite),
          this.rafEmitter.once("external", (()=>this.reconcile()))
      }
      requestDOMChange() {
          return !!this.isEnabled && this.rafEmitter.run()
      }
      onDOMRead() {
          this.keyframesDirty && this.onKeyframesDirty();
          for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].onDOMRead(this.position.local)
      }
      onDOMWrite() {
          for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].onDOMWrite();
          this.needsUpdate() && this.requestDOMChange(),
          this.computedStyleCache = {}
      }
      needsUpdate() {
          if (this._keyframesDirty)
              return !0;
          for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              if (this.keyframeControllers[t].needsUpdate())
                  return !0;
          return !1
      }
      addKeyframe(t, e) {
          let i = this.getControllerForTarget(t);
          return null === i && (i = new d(this,t),
          this.keyframeControllers.push(i)),
          this.keyframesDirty = !0,
          i.addKeyframe(e)
      }
      addEvent(t, e) {
          e.event = e.event || "Generic-Event-Name-" + p++;
          let i = void 0 !== e.end && e.end !== e.start;
          const r = this.addKeyframe(t, e);
          return i ? (e.onEnterOnce && r.controller.once(e.event + ":enter", e.onEnterOnce),
          e.onExitOnce && r.controller.once(e.event + ":exit", e.onExitOnce),
          e.onEnter && r.controller.on(e.event + ":enter", e.onEnter),
          e.onExit && r.controller.on(e.event + ":exit", e.onExit)) : (e.onEventOnce && r.controller.once(e.event, e.onEventOnce),
          e.onEventReverseOnce && r.controller.once(e.event + ":reverse", e.onEventReverseOnce),
          e.onEvent && r.controller.on(e.event, e.onEvent),
          e.onEventReverse && r.controller.on(e.event + ":reverse", e.onEventReverse)),
          r
      }
      forceUpdate() {
          let {waitForNextUpdate: t=!0, silent: e=!1} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          this.isEnabled && (this.refreshMetrics(),
          this.timelineUpdateRequired = !0,
          t ? this.keyframesDirty = !0 : this.onKeyframesDirty({
              silent: e
          }))
      }
      onKeyframesDirty() {
          let {silent: t=!1} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          this.determineActiveKeyframes(),
          this.keyframesDirty = !1,
          this.metrics.refreshMetrics(this.element),
          this.viewableRange = this.createViewableRange();
          for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].updateAnimationConstraints();
          this.updateBounds(),
          this.updateProgress(this.getPosition()),
          t || this.updateTimeline(),
          this.gui && this.gui.create()
      }
      refreshMetrics() {
          let t = new Set([this.element]);
          this.keyframeControllers.forEach((e=>{
              t.add(e.element),
              e._allKeyframes.forEach((e=>e.anchors.forEach((e=>t.add(e)))))
          }
          )),
          this.metrics.refreshCollection(t),
          this.viewableRange = this.createViewableRange()
      }
      reconcile() {
          for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].reconcile()
      }
      determineActiveKeyframes(t) {
          t = t || n(Array.from(document.documentElement.classList));
          for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
              this.keyframeControllers[e].determineActiveKeyframes(t)
      }
      updateBounds() {
          if (0 === this.keyframeControllers.length)
              return this.boundsMin = 0,
              void (this.boundsMax = 0);
          let t = {
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY
          };
          for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
              this.keyframeControllers[e].getBounds(t);
          let e = this.convertTValueToScrollPosition(t.min)
            , i = this.convertTValueToScrollPosition(t.max);
          i - e < a.pageMetrics.windowHeight ? (t.min = this.convertScrollPositionToTValue(e - .5 * a.pageMetrics.windowHeight),
          t.max = this.convertScrollPositionToTValue(i + .5 * a.pageMetrics.windowHeight)) : (t.min -= .001,
          t.max += .001),
          this.boundsMin = t.min,
          this.boundsMax = t.max,
          this.timelineUpdateRequired = !0
      }
      createViewableRange() {
          return new l(this.metrics.get(this.element),a.pageMetrics.windowHeight)
      }
      _onBreakpointChange(t, e) {
          this.keyframesDirty = !0,
          this.determineActiveKeyframes()
      }
      updateProgress(t) {
          this.hasDuration() ? (this.position.localUnclamped = (t - this.viewableRange.a) / (this.viewableRange.d - this.viewableRange.a),
          this.position.local = s.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
      }
      performTimelineDispatch() {
          for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
              this.keyframeControllers[t].updateLocalProgress(this.position.local);
          this.trigger(a.EVENTS.ON_TIMELINE_UPDATE, this.position.local),
          this.trigger("update", this.position.local),
          this.timelineUpdateRequired = !1,
          this.position.lastPosition !== this.position.local && (this.position.lastPosition <= this.boundsMin && this.position.localUnclamped > this.boundsMin ? (this.trigger(a.EVENTS.ON_TIMELINE_START, this),
          this.trigger("start", this)) : this.position.lastPosition >= this.boundsMin && this.position.localUnclamped < this.boundsMin ? (this.trigger(a.EVENTS.ON_TIMELINE_START + ":reverse", this),
          this.trigger("start:reverse", this)) : this.position.lastPosition <= this.boundsMax && this.position.localUnclamped >= this.boundsMax ? (this.trigger(a.EVENTS.ON_TIMELINE_COMPLETE, this),
          this.trigger("complete", this)) : this.position.lastPosition >= this.boundsMax && this.position.localUnclamped < this.boundsMax && (this.trigger(a.EVENTS.ON_TIMELINE_COMPLETE + ":reverse", this),
          this.trigger("complete:reverse", this))),
          null !== this.gui && this.gui.onScrollUpdate(this.position)
      }
      updateTimeline(t) {
          if (!this.isEnabled)
              return !1;
          void 0 === t && (t = this.getPosition()),
          this.updateProgress(t);
          let e = this.position.lastPosition === this.boundsMin || this.position.lastPosition === this.boundsMax
            , i = this.position.localUnclamped === this.boundsMin || this.position.localUnclamped === this.boundsMax;
          if (!this.timelineUpdateRequired && e && i && this.position.lastPosition === t)
              return void (this.position.local = this.position.localUnclamped);
          if (this.timelineUpdateRequired || this.position.localUnclamped > this.boundsMin && this.position.localUnclamped < this.boundsMax)
              return this.performTimelineDispatch(),
              this.requestDOMChange(),
              void (this.position.lastPosition = this.position.localUnclamped);
          let r = this.position.lastPosition > this.boundsMin && this.position.lastPosition < this.boundsMax
            , s = this.position.localUnclamped <= this.boundsMin || this.position.localUnclamped >= this.boundsMax;
          if (r && s)
              return this.performTimelineDispatch(),
              this.requestDOMChange(),
              void (this.position.lastPosition = this.position.localUnclamped);
          const n = this.position.lastPosition < this.boundsMin && this.position.localUnclamped > this.boundsMax
            , a = this.position.lastPosition > this.boundsMax && this.position.localUnclamped < this.boundsMax;
          (n || a) && (this.performTimelineDispatch(),
          this.requestDOMChange(),
          this.position.lastPosition = this.position.localUnclamped),
          null !== this.gui && this.gui.onScrollUpdate(this.position)
      }
      _onScroll(t) {
          this.updateTimeline(t)
      }
      convertScrollPositionToTValue(t) {
          return this.hasDuration() ? s.map(t, this.viewableRange.a, this.viewableRange.d, 0, 1) : 0
      }
      convertTValueToScrollPosition(t) {
          return this.hasDuration() ? s.map(t, 0, 1, this.viewableRange.a, this.viewableRange.d) : 0
      }
      hasDuration() {
          return this.viewableRange.a !== this.viewableRange.d
      }
      getPosition() {
          return a.pageMetrics.scrollY
      }
      getControllerForTarget(t) {
          if (!t._animInfo || !t._animInfo.controllers)
              return null;
          if (t._animInfo.controller && t._animInfo.controller.group === this)
              return t._animInfo.controller;
          const e = t._animInfo.controllers;
          for (let t = 0, i = e.length; t < i; t++)
              if (e[t].group === this)
                  return e[t];
          return null
      }
      trigger(t, e) {
          if (void 0 !== this._events[t])
              for (let i = this._events[t].length - 1; i >= 0; i--)
                  void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
      }
      set keyframesDirty(t) {
          this._keyframesDirty = t,
          this._keyframesDirty && this.requestDOMChange()
      }
      get keyframesDirty() {
          return this._keyframesDirty
      }
  }
}
, function(t, e, i) {
  "use strict";
  function r() {
      this._events = {}
  }
  var s = r.prototype;
  s.on = function(t, e) {
      this._events[t] = this._events[t] || [],
      this._events[t].unshift(e)
  }
  ,
  s.once = function(t, e) {
      var i = this;
      this.on(t, (function r(s) {
          i.off(t, r),
          void 0 !== s ? e(s) : e()
      }
      ))
  }
  ,
  s.off = function(t, e) {
      if (this.has(t)) {
          if (1 === arguments.length)
              return this._events[t] = null,
              void delete this._events[t];
          var i = this._events[t].indexOf(e);
          -1 !== i && this._events[t].splice(i, 1)
      }
  }
  ,
  s.trigger = function(t, e) {
      if (this.has(t))
          for (var i = this._events[t].length - 1; i >= 0; i--)
              void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
  }
  ,
  s.has = function(t) {
      return t in this._events != !1 && 0 !== this._events[t].length
  }
  ,
  s.destroy = function() {
      for (var t in this._events)
          this._events[t] = null;
      this._events = null
  }
  ,
  t.exports = r
}
, function(t, e, i) {
  "use strict";
  const r = i(21)
    , s = i(22);
  t.exports = {
      PictureLazyLoading: r,
      PictureHead: s
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(1).PICTURE_DATA_LAZY
    , s = i(1).PICTURE_DATA_EMPTY_SOURCE
    , n = i(1).PICTURE_DATA_DOWNLOAD_AREA_KEYFRAME;
  t.exports = class {
      constructor() {
          let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          this.options = t,
          this._init()
      }
      _init() {
          this._pictures = Array.from(document.querySelectorAll(`*[${r}]`)),
          this.AnimSystem = this._findAnim(),
          null !== this.AnimSystem && (this._injectSources(),
          this._addKeyframesToImages(),
          this._addMethodsToPictures())
      }
      _addMethodsToPictures() {
          this._pictures.forEach((t=>{
              t.forceLoad = ()=>{
                  this._downloadImage(t)
              }
          }
          ))
      }
      _injectSources() {
          this._pictures.forEach((t=>{
              const e = t.nextElementSibling;
              if (e && "NOSCRIPT" === e.nodeName) {
                  const i = t.querySelector("img")
                    , r = e.textContent.match(/<source .+ \/>/g);
                  r && i.insertAdjacentHTML("beforebegin", r.join(""))
              }
          }
          ))
      }
      _defineKeyframeOptions(t) {
          const e = t.getAttribute(n) || "{}";
          return Object.assign({}, {
              start: "t - 200vh",
              end: "b + 100vh",
              event: "PictureLazyLoading"
          }, JSON.parse(e))
      }
      _addKeyframesToImages() {
          this._pictures.forEach((t=>{
              t.__scrollGroup = this.AnimSystem.getGroupForTarget(document.body),
              this.AnimSystem.getGroupForTarget(t) && (t.__scrollGroup = this.AnimSystem.getGroupForTarget(t));
              let e = this._defineKeyframeOptions(t);
              t.__scrollGroup.addKeyframe(t, e).controller.once("PictureLazyLoading:enter", (()=>{
                  this._imageIsInLoadRange(t)
              }
              ))
          }
          ))
      }
      _imageIsInLoadRange(t) {
          t.querySelector("img") && this._downloadImage(t)
      }
      _downloadImage(t) {
          const e = t.querySelector(`[${s}]`);
          e && t.removeChild(e)
      }
      _findAnim() {
          var t = Array.from(document.querySelectorAll("[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"));
          return t.map((t=>t._animInfo ? t._animInfo.group : null)).filter((t=>null !== t)),
          t[0] && t[0]._animInfo ? t[0]._animInfo.group.anim : (console.error("PictureLazyLoading: AnimSystem not found, please initialize anim before instantiating"),
          null)
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(1).PICTURE_CLASS_LOADED
    , s = i(1).PICTURE_DATA_LOADED
    , n = i(1).PICTURE_DATA_EMPTY_SOURCE;
  t.exports = (window.__pictureElementInstancesLoaded = new Map,
  void (window.__lp = function(t) {
      const e = t.target.parentElement;
      e.querySelector(`[${n}]`) ? t.stopImmediatePropagation() : (e.classList.add(`${r}`),
      e.setAttribute(`${s}`, ""),
      window.__pictureElementInstancesLoaded.set(e.id, e),
      t.target.onload = null)
  }
  ))
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      majorVersionNumber: "3.x"
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = class {
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(5)
    , s = i(26);
  t.exports = class extends r {
      constructor(t, e, i, r) {
          let n = arguments.length > 4 && void 0 !== arguments[4] && arguments[4]
            , a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : void 0;
          super(t, e, i, r = s(r), n, a)
      }
      set(t) {
          let e = this.current;
          this.round && (e = Math.round(e)),
          this.suffix && (e += this.suffix),
          t.setProperty(this.key, e)
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return t.startsWith("--") ? t : t.replace(/[A-Z]/g, (t=>"-" + t.toLowerCase()))
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = ()=>Math.random().toString(16).slice(-4)
}
, function(t, e, i) {
  "use strict";
  let r = ["borderRadius", "bottom", "fontSize", "fontWeight", "height", "left", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "maxHeight", "maxWidth", "opacity", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "right", "top", "width", "zIndex", "strokeDashoffset"];
  r.push(...r.map((t=>t.replace(/[A-Z]/g, (t=>"-" + t.toLowerCase())))));
  t.exports = {
      transformAttributes: ["x", "y", "z", "scale", "scaleX", "scaleY", "rotation", "rotationX", "rotationY", "rotationZ"],
      cssAttributes: r,
      domAttributes: ["scrollLeft", "scrollTop", "scrollBy", "scrollTo", "currentTime"],
      suffixFreeAttributes: ["opacity", "z-index", "font-weight", "zIndex", "fontWeight", "scrollLeft", "scrollTop", "scrollBy", "scrollTo", "currentTime"]
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(11)
    , s = i(2)
    , n = i(5);
  class a extends r {
      constructor(t, e) {
          super(t, e),
          this.keyframeType = s.KeyframeTypes.Event,
          this.isApplied = !1,
          this.hasDuration = !1,
          this.isCurrentlyInRange = !1
      }
      parseOptions(t) {
          t.x = void 0,
          t.y = void 0,
          t.scale = void 0,
          t.scaleX = void 0,
          t.scaleY = void 0,
          t.rotation = void 0,
          t.style = void 0,
          t.cssClass = void 0,
          t.rotation = void 0,
          t.opacity = void 0,
          t.hold = void 0,
          this.event = t.event,
          this.animValues[this.event] = [0, 0],
          void 0 === this.controller.tweenProps[this.event] && (this.controller.tweenProps[this.event] = new n(0,1,!1,this.event)),
          super.parseOptions(t),
          this.keyframeType = s.KeyframeTypes.Event
      }
      updateLocalProgress(t) {
          if (this.hasDuration) {
              let e = this.isCurrentlyInRange
                , i = t >= this.start && t <= this.end;
              if (e === i)
                  return;
              return this.isCurrentlyInRange = i,
              void (i && !e ? this._trigger(this.event + ":enter") : e && !i && this._trigger(this.event + ":exit"))
          }
          !this.isApplied && t >= this.start ? (this.isApplied = !0,
          this._trigger(this.event)) : this.isApplied && t < this.start && (this.isApplied = !1,
          this._trigger(this.event + ":reverse"))
      }
      _trigger(t) {
          this.controller.eventObject.event = t,
          this.controller.eventObject.keyframe = this,
          this.controller.trigger(t, this.controller.eventObject)
      }
      evaluateConstraints() {
          super.evaluateConstraints(),
          this.hasDuration = this.start !== this.end
      }
      reset(t) {
          this.isApplied = !1,
          this.isCurrentlyInRange = !1,
          super.reset(t)
      }
      onDOMRead(t) {}
      reconcile(t) {}
      evaluateInterpolationConstraints() {}
  }
  a.DATA_ATTRIBUTE = "data-anim-event",
  t.exports = a
}
, function(t, e, i) {
  "use strict";
  const r = i(24);
  t.exports = class {
      constructor(t, e) {
          let i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          this.isGroup = i,
          this.group = t,
          this.controller = e,
          this.controllers = [],
          this.tweenProps = new r
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(2)
    , s = (t,e)=>null == t ? e : t;
  class n {
      constructor(t) {
          this.top = 0,
          this.bottom = 0,
          this.left = 0,
          this.right = 0,
          this.height = 0,
          this.width = 0
      }
      toString() {
          return `top:${this.top}, bottom:${this.bottom}, left:${this.left}, right:${this.right}, height:${this.height}, width:${this.width}`
      }
      toObject() {
          return {
              top: this.top,
              bottom: this.bottom,
              left: this.left,
              right: this.right,
              height: this.height,
              width: this.width
          }
      }
  }
  t.exports = class {
      constructor() {
          this.clear()
      }
      clear() {
          this._metrics = new WeakMap
      }
      destroy() {
          this._metrics = null
      }
      add(t) {
          let e = this._metrics.get(t);
          if (e)
              return e;
          let i = new n(t);
          return this._metrics.set(t, i),
          this._refreshMetrics(t, i)
      }
      get(t) {
          return this._metrics.get(t)
      }
      refreshCollection(t) {
          t.forEach((t=>this._refreshMetrics(t, null)))
      }
      refreshMetrics(t) {
          return this._refreshMetrics(t)
      }
      _refreshMetrics(t, e) {
          if (e = e || this._metrics.get(t),
          !(t instanceof Element))
              return e.width = s(t.width, 0),
              e.height = s(t.height, 0),
              e.top = s(t.top, s(t.y, 0)),
              e.left = s(t.left, s(t.x, 0)),
              e.right = e.left + e.width,
              e.bottom = e.top + e.height,
              e;
          if (void 0 === t.offsetWidth) {
              let i = t.getBoundingClientRect();
              return e.width = i.width,
              e.height = i.height,
              e.top = r.pageMetrics.scrollY + i.top,
              e.left = r.pageMetrics.scrollX + i.left,
              e.right = e.left + e.width,
              e.bottom = e.top + e.height,
              e
          }
          e.width = t.offsetWidth,
          e.height = t.offsetHeight,
          e.top = r.pageMetrics.documentOffsetY,
          e.left = r.pageMetrics.documentOffsetX;
          let i = t;
          for (; i; )
              e.top += i.offsetTop,
              e.left += i.offsetLeft,
              i = i.offsetParent;
          return e.right = e.left + e.width,
          e.bottom = e.top + e.height,
          e
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(10);
  t.exports = r.requestAnimationFrame("external")
}
, function(t, e, i) {
  "use strict";
  const r = i(2);
  class s {
      constructor(t, e) {
          this._index = 0,
          this.keyframe = t,
          e && (this.name = e)
      }
      get start() {
          return this.keyframe.jsonProps.start
      }
      set index(t) {
          this._index = t
      }
      get index() {
          return this._index
      }
  }
  t.exports = class {
      constructor(t) {
          this.timeGroup = t,
          this.chapters = [],
          this.chapterNames = {},
          this.currentChapter = null,
          this.tween = null,
          this.destroyed = !1
      }
      destroy() {
          this.destroyed = !0,
          this.tween && !this.tween.destroyed && this.tween.remove(),
          this.tween = null
      }
      addChapter(t) {
          const {position: e, name: i} = t;
          if (void 0 === e)
              throw ReferenceError("Cannot add chapter without target position.");
          t._impIsFirst || 0 !== this.chapters.length || this.addChapter({
              position: 0,
              _impIsFirst: !0
          });
          let r = this.timeGroup.addKeyframe(this, {
              start: e,
              end: e,
              event: "Chapter"
          });
          this.timeGroup.forceUpdate({
              waitForNextFrame: !1,
              silent: !0
          });
          const n = new s(r,i);
          if (this.chapters.push(n),
          i) {
              if (this.chapterNames.hasOwnProperty(i))
                  throw ReferenceError(`Duplicate chapter name assigned - "${i}" is already in use`);
              this.chapterNames[i] = n
          }
          return this.chapters.sort(((t,e)=>t.start - e.start)).forEach(((t,e)=>t.index = e)),
          this.currentChapter = this.currentChapter || this.chapters[0],
          n
      }
      playToChapter(t) {
          let e;
          if (t.hasOwnProperty("index"))
              e = this.chapters[t.index];
          else {
              if (!t.hasOwnProperty("name"))
                  throw ReferenceError("Cannot play to chapter without target index or name");
              e = this.chapterNames[t.name]
          }
          if (!e || this.currentChapter === e && !0 !== t.force)
              return;
          let i = t.ease || "easeInOutCubic";
          this.tween && this.tween.controller && (this.tween.remove(),
          i = t.ease || "easeOutQuint"),
          this.timeGroup.timeScale(t.timeScale || 1);
          const s = void 0 !== t.duration ? t.duration : this.getDurationToChapter(e)
            , n = this.timeGroup.time()
            , a = e.start;
          let o = !1;
          return this.tween = this.timeGroup.anim.addTween({
              time: n
          }, {
              easeFunction: i,
              duration: s,
              time: [n, a],
              onStart: ()=>{
                  this.destroyed || this.timeGroup.trigger(r.EVENTS.ON_CHAPTER_INITIATED, {
                      player: this,
                      next: e
                  })
              }
              ,
              onDraw: t=>{
                  if (this.destroyed)
                      return;
                  let i = t.tweenProps.time.current;
                  this.timeGroup.time(i),
                  t.keyframe.curvedT > .5 && !o && (o = !0,
                  this.currentIndex = e.index,
                  this.currentChapter = e,
                  this.timeGroup.trigger(r.EVENTS.ON_CHAPTER_OCCURRED, {
                      player: this,
                      current: e
                  }))
              }
              ,
              onComplete: ()=>{
                  this.destroyed || (this.timeGroup.trigger(r.EVENTS.ON_CHAPTER_COMPLETED, {
                      player: this,
                      current: e
                  }),
                  this.timeGroup.paused(!0),
                  this.tween = null)
              }
          }),
          this.tween
      }
      getDurationToChapter(t) {
          const e = this.chapters[t.index - 1] || this.chapters[t.index + 1];
          return Math.abs(e.start - t.start)
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0)(i(96));
  const s = ["text-zoom", "no-heavy-media"];
  t.exports = function(t) {
      let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ".fallback-image"
        , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : s;
      if (!t.el)
          return void console.warn("No section element provided to fallback image loader. Please pass section object (this keyword) as an argment");
      const n = Array.from(t.el.querySelectorAll(e))
        , a = ()=>n.every((e=>{
          let i = !1;
          if (e.classList.contains("loaded"))
              i = !0;
          else {
              const r = t.anim.getControllerForTarget(e);
              if (r) {
                  const t = r._allKeyframes.find((t=>t.animValues.PictureLazyLoading));
                  t && (t.overwriteProps({
                      disabledWhen: []
                  }),
                  i = !0)
              }
          }
          return i
      }
      ))
        , o = (0,
      r.default)((()=>{
          a() && (window.removeEventListener("resize", o),
          window.removeEventListener("no-autoplay", o))
      }
      ))
        , h = i.some((t=>document.documentElement.classList.contains(t)));
      h ? a() : (window.addEventListener("resize", o),
      window.addEventListener("no-autoplay", o))
  }
}
, function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  e.default = {
      EMPTY: "loading-empty",
      LOADING: "loading",
      LOADED: "loaded",
      ERROR: "loading-error",
      DISABLED: "loading-disabled"
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(79);
  t.exports = function(t) {
      return function() {
          if (r && "object" == typeof window.console && "function" == typeof console[t])
              return console[t].apply(console, Array.prototype.slice.call(arguments, 0))
      }
  }
}
, function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  e.default = {
      IDLE: "idle",
      PLAYING: "playing",
      PAUSED: "paused",
      ENDED: "ended"
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(7))
    , n = r(i(12));
  const a = "inline-media-timeout";
  class o extends s.default {
      static get LOAD_TIMEOUT_EVENT() {
          return a
      }
      constructor(t) {
          super(t);
          const e = this.media.el.dataset;
          this._timeoutDelay = e.loadTimeout || t.loadTimeout || 3e4,
          this._onLoadStart = this._onLoadStart.bind(this),
          this._onLoadComplete = this._onLoadComplete.bind(this),
          this._onTimerComplete = this._onTimerComplete.bind(this),
          this.media.on(n.default.MEDIA_LOAD_START, this._onLoadStart),
          this.media.on(n.default.MEDIA_LOAD_COMPLETE, this._onLoadComplete)
      }
      _onLoadStart() {
          clearTimeout(this._timer),
          this._timer = setTimeout(this._onTimerComplete, this._timeoutDelay)
      }
      _onLoadComplete() {
          clearTimeout(this._timer)
      }
      _onTimerComplete() {
          this.media.trigger(a),
          this.media.destroy(),
          this.media.el.parentElement && this.media.el.parentElement.removeChild(this.media.el)
      }
      destroy() {
          clearTimeout(this._timer),
          this.media.off(n.default.MEDIA_LOAD_START, this._onLoadStart)
      }
  }
  e.default = o
}
, function(t, e, i) {
  "use strict";
  t.exports.EventEmitter = i(250)
}
, , function(t, e, i) {
  "use strict";
  const r = i(64)
    , s = new (i(31));
  class n {
      constructor(t) {
          this.group = t,
          this.data = {
              target: null,
              anchors: null,
              metrics: this.group.metrics
          }
      }
      parseArray(t, e) {
          return [this.parseExpression(t, e[0]), this.parseExpression(t, e[1])]
      }
      parseExpression(t, e) {
          if (!e)
              return null;
          if ("number" == typeof e)
              return e;
          if ("string" != typeof e)
              throw `Expression must be a string, received ${typeof e}: ${e}`;
          return this.data.target = t.controller.element,
          this.data.anchors = t.anchors,
          this.data.keyframe = t.keyframe,
          this.group.anim.plugins.parser.reduce(((i,r)=>i || r.parseExpression.call(this, t, e)), null) || n._parse(e, this.data)
      }
      parseTimeValue(t, e) {
          if ("number" == typeof e)
              return e;
          let i = this.group.expressionParser.parseExpression(t, e);
          return this.group.convertScrollPositionToTValue(i)
      }
      destroy() {
          this.group = null
      }
      static parse(t, e) {
          return (e = e || {}) && (s.clear(),
          e.target && s.add(e.target),
          e.anchors && e.anchors.forEach((t=>s.add(t)))),
          e.metrics = s,
          n._parse(t, e)
      }
      static _parse(t, e) {
          return r.Parse(t).execute(e)
      }
  }
  n.programs = r.programs,
  "undefined" != typeof window && (window.ExpressionParser = n),
  t.exports = n
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  Object.defineProperty(e, "Media", {
      enumerable: !0,
      get: function() {
          return s.default
      }
  }),
  Object.defineProperty(e, "Plugin", {
      enumerable: !0,
      get: function() {
          return n.default
      }
  }),
  e.autoInit = void 0,
  Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
          return s.default
      }
  });
  var s = r(i(99))
    , n = r(i(7));
  const a = s.default.autoInitialize;
  e.autoInit = a
}
, function(t, e, i) {
  "use strict";
  t.exports = i(36)("warn")
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(7))
    , n = r(i(80))
    , a = r(i(102))
    , o = r(i(35));
  const h = ()=>window.devicePixelRatio > 1;
  class l extends s.default {
      constructor(t) {
          super(t),
          this._cachedPlaying = null,
          this._initialize()
      }
      _initialize() {
          this._onBreakpointChange = this._onBreakpointChange.bind(this);
          const t = Object.assign({
              callback: this._onBreakpointChange
          }, this.options);
          this._breakpointDetect = t.anim ? new a.default(t) : new n.default(t),
          this._currentTime = 0;
          const e = this.media.el.dataset;
          e && e.inlineMediaSources ? this.sources = JSON.parse(e.inlineMediaSources) : t.sources && (this.sources = Object.assign({}, t.sources)),
          this._basePath = this.options.basePath || e.inlineMediaBasepath || "./",
          this._onBreakpointChange()
      }
      _onBreakpointChange() {
          let t;
          this._currentBreakpoint = this._breakpointDetect.breakpoint,
          t = this.sources ? h() && this.sources[this._currentBreakpoint]["2x"] || this.sources[this._currentBreakpoint]["1x"] : h() ? `${this._currentBreakpoint}_2x` : this._currentBreakpoint;
          const e = `${this._basePath}${t}.mp4`;
          this._swapSrc(e)
      }
      get src() {
          return this._src
      }
      async _swapSrc(t) {
          if (this._src = t,
          this.media.loadingState === o.default.EMPTY)
              return;
          const e = null !== this._cachedPlaying ? this._cachedPlaying : !this.media.el.paused;
          return this.media.loadingState === o.default.LOADED && (this._currentTime = this.media.el.currentTime),
          this._cachedPlaying = e,
          await this.media.load(`${t}#t=${this._currentTime}`),
          this._cachedPlaying = null,
          e ? this.media.play() : Promise.resolve()
      }
      destroy() {
          this._breakpointDetect.destroy(),
          super.destroy()
      }
  }
  e.default = l
}
, , function(t, e, i) {
  "use strict";
  var r = {
      ua: window.navigator.userAgent,
      platform: window.navigator.platform,
      vendor: window.navigator.vendor
  };
  t.exports = i(47)(r)
}
, function(t, e, i) {
  "use strict";
  var r = i(48)
    , s = i(49);
  function n(t, e) {
      if ("function" == typeof t.parseVersion)
          return t.parseVersion(e);
      var i, r = t.version || t.userAgent;
      "string" == typeof r && (r = [r]);
      for (var s, n = r.length, a = 0; a < n; a++)
          if ((s = e.match((i = r[a],
          new RegExp(i + "[a-zA-Z\\s/:]+([0-9_.]+)","i")))) && s.length > 1)
              return s[1].replace(/_/g, ".");
      return !1
  }
  function a(t, e, i) {
      for (var r, s, a = t.length, o = 0; o < a; o++)
          if ("function" == typeof t[o].test ? !0 === t[o].test(i) && (r = t[o].name) : i.ua.indexOf(t[o].userAgent) > -1 && (r = t[o].name),
          r) {
              if (e[r] = !0,
              "string" == typeof (s = n(t[o], i.ua))) {
                  var h = s.split(".");
                  e.version.string = s,
                  h && h.length > 0 && (e.version.major = parseInt(h[0] || 0),
                  e.version.minor = parseInt(h[1] || 0),
                  e.version.patch = parseInt(h[2] || 0))
              } else
                  "edge" === r && (e.version.string = "12.0.0",
                  e.version.major = "12",
                  e.version.minor = "0",
                  e.version.patch = "0");
              return "function" == typeof t[o].parseDocumentMode && (e.version.documentMode = t[o].parseDocumentMode()),
              e
          }
      return e
  }
  t.exports = function(t) {
      var e = {};
      return e.browser = a(s.browser, r.browser, t),
      e.os = a(s.os, r.os, t),
      e
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      browser: {
          safari: !1,
          chrome: !1,
          firefox: !1,
          ie: !1,
          opera: !1,
          android: !1,
          edge: !1,
          edgeChromium: !1,
          samsung: !1,
          version: {
              string: "",
              major: 0,
              minor: 0,
              patch: 0,
              documentMode: !1
          }
      },
      os: {
          osx: !1,
          ios: !1,
          android: !1,
          windows: !1,
          linux: !1,
          fireos: !1,
          chromeos: !1,
          version: {
              string: "",
              major: 0,
              minor: 0,
              patch: 0
          }
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      browser: [{
          name: "edge",
          userAgent: "Edge",
          version: ["rv", "Edge"],
          test: function(t) {
              return t.ua.indexOf("Edge") > -1 || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" === t.ua
          }
      }, {
          name: "edgeChromium",
          userAgent: "Edge",
          version: ["rv", "Edg"],
          test: function(t) {
              return t.ua.indexOf("Edg") > -1 && -1 === t.ua.indexOf("Edge")
          }
      }, {
          name: "chrome",
          userAgent: "Chrome"
      }, {
          name: "firefox",
          test: function(t) {
              return t.ua.indexOf("Firefox") > -1 && -1 === t.ua.indexOf("Opera")
          },
          version: "Firefox"
      }, {
          name: "android",
          userAgent: "Android"
      }, {
          name: "safari",
          test: function(t) {
              return t.ua.indexOf("Safari") > -1 && t.vendor.indexOf("Apple") > -1
          },
          version: "Version"
      }, {
          name: "ie",
          test: function(t) {
              return t.ua.indexOf("IE") > -1 || t.ua.indexOf("Trident") > -1
          },
          version: ["MSIE", "rv"],
          parseDocumentMode: function() {
              var t = !1;
              return document.documentMode && (t = parseInt(document.documentMode, 10)),
              t
          }
      }, {
          name: "opera",
          userAgent: "Opera",
          version: ["Version", "Opera"]
      }, {
          name: "samsung",
          userAgent: "SamsungBrowser"
      }],
      os: [{
          name: "windows",
          test: function(t) {
              return t.ua.indexOf("Windows") > -1
          },
          version: "Windows NT"
      }, {
          name: "osx",
          userAgent: "Mac",
          test: function(t) {
              return t.ua.indexOf("Macintosh") > -1
          }
      }, {
          name: "ios",
          test: function(t) {
              return t.ua.indexOf("iPhone") > -1 || t.ua.indexOf("iPad") > -1
          },
          version: ["iPhone OS", "CPU OS"]
      }, {
          name: "linux",
          userAgent: "Linux",
          test: function(t) {
              return (t.ua.indexOf("Linux") > -1 || t.platform.indexOf("Linux") > -1) && -1 === t.ua.indexOf("Android")
          }
      }, {
          name: "fireos",
          test: function(t) {
              return t.ua.indexOf("Firefox") > -1 && t.ua.indexOf("Mobile") > -1
          },
          version: "rv"
      }, {
          name: "android",
          userAgent: "Android",
          test: function(t) {
              return t.ua.indexOf("Android") > -1
          }
      }, {
          name: "chromeos",
          userAgent: "CrOS"
      }]
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(13).SharedInstance
    , s = i(23).majorVersionNumber
    , n = i(52);
  t.exports = r.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", s, n)
}
, function(t, e, i) {
  "use strict";
  var r, s = "undefined" != typeof window ? window : {}, n = s.AC, a = (r = {},
  {
      get: function(t, e) {
          var i = null;
          return r[t] && r[t][e] && (i = r[t][e]),
          i
      },
      set: function(t, e, i) {
          return r[t] || (r[t] = {}),
          r[t][e] = "function" == typeof i ? new i : i,
          r[t][e]
      },
      share: function(t, e, i) {
          var r = this.get(t, e);
          return r || (r = this.set(t, e, i)),
          r
      },
      remove: function(t, e) {
          var i = typeof e;
          if ("string" !== i && "number" !== i)
              r[t] && (r[t] = null);
          else {
              if (!r[t] || !r[t][e])
                  return;
              r[t][e] = null
          }
      }
  });
  n || (n = s.AC = {}),
  n.SharedInstance || (n.SharedInstance = a),
  t.exports = n.SharedInstance
}
, function(t, e, i) {
  "use strict";
  var r, s = i(19);
  function n(t) {
      t = t || {},
      this._reset(),
      this.updatePhases(),
      this.eventEmitter = new s,
      this._willRun = !1,
      this._totalSubscribeCount = -1;
      var e = null
        , i = null;
      "undefined" != typeof window ? (e = window.requestAnimationFrame,
      i = window.cancelAnimationFrame) : e = i = function() {}
      ,
      this._requestAnimationFrame = e,
      this._cancelAnimationFrame = i,
      this._boundOnAnimationFrame = this._onAnimationFrame.bind(this),
      this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
  }
  (r = n.prototype).frameRequestedPhase = "requested",
  r.startPhase = "start",
  r.runPhases = ["update", "external", "draw"],
  r.endPhase = "end",
  r.disabledPhase = "disabled",
  r.beforePhaseEventPrefix = "before:",
  r.afterPhaseEventPrefix = "after:",
  r.subscribe = function(t, e) {
      return this._totalSubscribeCount++,
      this._nextFrameSubscribers[t.id] || (e ? this._nextFrameSubscribersOrder.unshift(t.id) : this._nextFrameSubscribersOrder.push(t.id),
      this._nextFrameSubscribers[t.id] = t,
      this._nextFrameSubscriberArrayLength++,
      this._nextFrameSubscriberCount++,
      this._run()),
      this._totalSubscribeCount
  }
  ,
  r.subscribeImmediate = function(t, e) {
      return this._totalSubscribeCount++,
      this._subscribers[t.id] || (e ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, t.id) : this._subscribersOrder.unshift(t.id),
      this._subscribers[t.id] = t,
      this._subscriberArrayLength++,
      this._subscriberCount++),
      this._totalSubscribeCount
  }
  ,
  r.unsubscribe = function(t) {
      return !!this._nextFrameSubscribers[t.id] && (this._nextFrameSubscribers[t.id] = null,
      this._nextFrameSubscriberCount--,
      0 === this._nextFrameSubscriberCount && this._cancel(),
      !0)
  }
  ,
  r.getSubscribeID = function() {
      return this._totalSubscribeCount += 1
  }
  ,
  r.destroy = function() {
      var t = this._cancel();
      return this.eventEmitter.destroy(),
      this.eventEmitter = null,
      this.phases = null,
      this._subscribers = null,
      this._subscribersOrder = null,
      this._nextFrameSubscribers = null,
      this._nextFrameSubscribersOrder = null,
      this._rafData = null,
      this._boundOnAnimationFrame = null,
      this._onExternalAnimationFrame = null,
      t
  }
  ,
  r.useExternalAnimationFrame = function(t) {
      if ("boolean" == typeof t) {
          var e = this._isUsingExternalAnimationFrame;
          return t && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame),
          this._animationFrame = null),
          !this._willRun || t || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
          this._isUsingExternalAnimationFrame = t,
          t ? this._boundOnExternalAnimationFrame : e || !1
      }
  }
  ,
  r.updatePhases = function() {
      this.phases || (this.phases = []),
      this.phases.length = 0,
      this.phases.push(this.frameRequestedPhase),
      this.phases.push(this.startPhase),
      Array.prototype.push.apply(this.phases, this.runPhases),
      this.phases.push(this.endPhase),
      this._runPhasesLength = this.runPhases.length,
      this._phasesLength = this.phases.length
  }
  ,
  r._run = function() {
      if (!this._willRun)
          return this._willRun = !0,
          0 === this.lastFrameTime && (this.lastFrameTime = performance.now()),
          this._animationFrameActive = !0,
          this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
          this.phase === this.disabledPhase && (this.phaseIndex = 0,
          this.phase = this.phases[this.phaseIndex]),
          !0
  }
  ,
  r._cancel = function() {
      var t = !1;
      return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame),
      this._animationFrame = null),
      this._animationFrameActive = !1,
      this._willRun = !1,
      t = !0),
      this._isRunning || this._reset(),
      t
  }
  ,
  r._onAnimationFrame = function(t) {
      for (this._subscribers = this._nextFrameSubscribers,
      this._subscribersOrder = this._nextFrameSubscribersOrder,
      this._subscriberArrayLength = this._nextFrameSubscriberArrayLength,
      this._subscriberCount = this._nextFrameSubscriberCount,
      this._nextFrameSubscribers = {},
      this._nextFrameSubscribersOrder = [],
      this._nextFrameSubscriberArrayLength = 0,
      this._nextFrameSubscriberCount = 0,
      this.phaseIndex = 0,
      this.phase = this.phases[this.phaseIndex],
      this._isRunning = !0,
      this._willRun = !1,
      this._didRequestNextRAF = !1,
      this._rafData.delta = t - this.lastFrameTime,
      this.lastFrameTime = t,
      this._rafData.fps = 0,
      this._rafData.delta >= 1e3 && (this._rafData.delta = 0),
      0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta),
      this._rafData.time = t,
      this._rafData.naturalFps = this._rafData.fps,
      this._rafData.timeNow = Date.now(),
      this.phaseIndex++,
      this.phase = this.phases[this.phaseIndex],
      this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
      this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
          null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
      for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
      this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
          for (this.phaseIndex++,
          this.phase = this.phases[this.phaseIndex],
          this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
          this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
              null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
          this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase)
      }
      for (this.phaseIndex++,
      this.phase = this.phases[this.phaseIndex],
      this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
      this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
          null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
      this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
      this._willRun ? (this.phaseIndex = 0,
      this.phaseIndex = this.phases[this.phaseIndex]) : this._reset()
  }
  ,
  r._onExternalAnimationFrame = function(t) {
      this._isUsingExternalAnimationFrame && this._onAnimationFrame(t)
  }
  ,
  r._reset = function() {
      this._rafData || (this._rafData = {}),
      this._rafData.time = 0,
      this._rafData.delta = 0,
      this._rafData.fps = 0,
      this._rafData.naturalFps = 0,
      this._rafData.timeNow = 0,
      this._subscribers = {},
      this._subscribersOrder = [],
      this._currentSubscriberIndex = -1,
      this._subscriberArrayLength = 0,
      this._subscriberCount = 0,
      this._nextFrameSubscribers = {},
      this._nextFrameSubscribersOrder = [],
      this._nextFrameSubscriberArrayLength = 0,
      this._nextFrameSubscriberCount = 0,
      this._didEmitFrameData = !1,
      this._animationFrame = null,
      this._animationFrameActive = !1,
      this._isRunning = !1,
      this._shouldReset = !1,
      this.lastFrameTime = 0,
      this._runPhaseIndex = -1,
      this.phaseIndex = -1,
      this.phase = this.disabledPhase
  }
  ,
  t.exports = n
}
, function(t, e, i) {
  "use strict";
  var r = i(13).SharedInstance
    , s = i(23).majorVersionNumber
    , n = function() {
      this._currentID = 0
  };
  n.prototype.getNewID = function() {
      return this._currentID++,
      "raf:" + this._currentID
  }
  ,
  t.exports = r.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", s, n)
}
, function(t, e, i) {
  "use strict";
  var r = i(55)
    , s = function(t) {
      this.phase = t,
      this.rafEmitter = new r,
      this._cachePhaseIndex(),
      this.requestAnimationFrame = this.requestAnimationFrame.bind(this),
      this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this),
      this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this),
      this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this),
      this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this),
      this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)),
      this.rafEmitter.executor.eventEmitter.on("before:start", this._onBeforeRAFExecutorStart),
      this.rafEmitter.executor.eventEmitter.on("before:" + this.phase, this._onBeforeRAFExecutorPhase),
      this.rafEmitter.executor.eventEmitter.on("after:" + this.phase, this._onAfterRAFExecutorPhase),
      this._frameCallbacks = [],
      this._currentFrameCallbacks = [],
      this._nextFrameCallbacks = [],
      this._phaseActive = !1,
      this._currentFrameID = -1,
      this._cancelFrameIdx = -1,
      this._frameCallbackLength = 0,
      this._currentFrameCallbacksLength = 0,
      this._nextFrameCallbacksLength = 0,
      this._frameCallbackIteration = 0
  }
    , n = s.prototype;
  n.requestAnimationFrame = function(t, e) {
      return !0 === e && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex ? this._phaseActive ? (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0),
      this._frameCallbacks.push(this._currentFrameID, t),
      this._frameCallbackLength += 2) : (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !1),
      this._currentFrameCallbacks.push(this._currentFrameID, t),
      this._currentFrameCallbacksLength += 2) : (this._currentFrameID = this.rafEmitter.run(),
      this._nextFrameCallbacks.push(this._currentFrameID, t),
      this._nextFrameCallbacksLength += 2),
      this._currentFrameID
  }
  ,
  n.cancelAnimationFrame = function(t) {
      this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t),
      this._cancelFrameIdx > -1 ? this._cancelNextAnimationFrame() : (this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(t),
      this._cancelFrameIdx > -1 ? this._cancelCurrentAnimationFrame() : (this._cancelFrameIdx = this._frameCallbacks.indexOf(t),
      this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()))
  }
  ,
  n._onRAFExecuted = function(t) {
      for (this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2)
          this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t);
      this._frameCallbacks.length = 0,
      this._frameCallbackLength = 0
  }
  ,
  n._onBeforeRAFExecutorStart = function() {
      Array.prototype.push.apply(this._currentFrameCallbacks, this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)),
      this._currentFrameCallbacksLength = this._nextFrameCallbacksLength,
      this._nextFrameCallbacks.length = 0,
      this._nextFrameCallbacksLength = 0
  }
  ,
  n._onBeforeRAFExecutorPhase = function() {
      this._phaseActive = !0,
      Array.prototype.push.apply(this._frameCallbacks, this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)),
      this._frameCallbackLength = this._currentFrameCallbacksLength,
      this._currentFrameCallbacks.length = 0,
      this._currentFrameCallbacksLength = 0
  }
  ,
  n._onAfterRAFExecutorPhase = function() {
      this._phaseActive = !1
  }
  ,
  n._cachePhaseIndex = function() {
      this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase)
  }
  ,
  n._cancelRunningAnimationFrame = function() {
      this._frameCallbacks.splice(this._cancelFrameIdx, 2),
      this._frameCallbackLength -= 2
  }
  ,
  n._cancelCurrentAnimationFrame = function() {
      this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2),
      this._currentFrameCallbacksLength -= 2
  }
  ,
  n._cancelNextAnimationFrame = function() {
      this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2),
      this._nextFrameCallbacksLength -= 2,
      0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel()
  }
  ,
  t.exports = s
}
, function(t, e, i) {
  "use strict";
  var r = i(8)
    , s = function(t) {
      r.call(this, t)
  };
  (s.prototype = Object.create(r.prototype))._subscribe = function() {
      return this.executor.subscribe(this, !0)
  }
  ,
  t.exports = s
}
, function(t, e, i) {
  "use strict";
  function r() {
      this._createElements(),
      this._bindEvents()
  }
  var s = r.prototype;
  s._bindEvents = function() {
      this._onResize = this._resize.bind(this)
  }
  ,
  s._createElements = function() {
      this.span = document.createElement("span");
      var t = this.span.style;
      if (t.visibility = "hidden",
      t.position = "absolute",
      t.top = "0",
      t.zIndex = "-1",
      this.span.innerHTML = "&nbsp;",
      !window.ResizeObserver) {
          this.iframe = document.createElement("iframe");
          var e = this.iframe.style;
          e.position = "absolute",
          e.top = "0",
          e.left = "0",
          e.width = "100%",
          e.height = "100%",
          this.span.appendChild(this.iframe)
      }
      document.body.appendChild(this.span)
  }
  ,
  s.detect = function(t) {
      this.originalSize = t || 17,
      this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]),
      this.currentSize > this.originalSize && this._onResize(),
      this.isDetecting || (window.ResizeObserver ? (this.resizeObserver = new ResizeObserver(this._onResize),
      this.resizeObserver.observe(this.span)) : this.iframe.contentWindow.addEventListener("resize", this._onResize),
      this.isDetecting = !0)
  }
  ,
  s._resize = function() {
      this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]),
      this.originalSize < this.currentSize ? document.documentElement.classList.add("text-zoom") : document.documentElement.classList.remove("text-zoom"),
      window.dispatchEvent(new Event("resize")),
      window.dispatchEvent(new CustomEvent("resize:text-zoom",{
          detail: this
      }))
  }
  ,
  s.getScale = function() {
      return this.currentSize / this.originalSize
  }
  ,
  s.remove = function() {
      this.isDetecting && (this.resizeObserver && this.resizeObserver.unobserve(this.span),
      this.iframe && this.iframe.contentWindow.removeEventListener("resize", this._onResize),
      this.isDetecting = !1)
  }
  ,
  s.destroy = function() {
      this.remove(),
      this.span && this.span.parentElement && this.span.parentElement.removeChild(this.span),
      this.span = null,
      this.iframe = null,
      this.resizeObserver = null
  }
  ,
  t.exports = new r
}
, function(t, e, i) {
  "use strict";
  const r = i(4).EventEmitterMicro
    , s = i(2)
    , n = i(11)
    , a = i(17)
    , o = i(29)
    , h = i(18)
    , l = i(74)
    , u = i(75)
    , c = i(76)
    , d = {};
  "undefined" != typeof window && (d.update = i(14),
  d.cancelUpdate = i(77),
  d.external = i(32),
  d.draw = i(15));
  let f = null;
  class p extends r {
      constructor() {
          if (super(),
          f)
              throw "You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
          f = this,
          this.groups = [],
          this.scrollSystems = [],
          this.timeSystems = [],
          this.tweenGroup = null,
          this._forceUpdateRAFId = -1,
          this.initialized = !1,
          this.model = s,
          this.plugins = {
              keyframe: [],
              parser: []
          },
          this.version = c.version,
          this._resolveReady = ()=>{}
          ,
          this.ready = new Promise((t=>this._resolveReady = t)),
          this.onScroll = this.onScroll.bind(this),
          this.onResizedDebounced = this.onResizedDebounced.bind(this),
          this.onResizeImmediate = this.onResizeImmediate.bind(this)
      }
      initialize() {
          return this.initialized || "undefined" == typeof window || (this.initialized = !0,
          this.timeSystems = [],
          this.scrollSystems = [],
          this.groups = [],
          this.setupEvents(),
          this.initializeResizeFilter(),
          this.initializeModel(),
          this.createDOMGroups(),
          this.createDOMKeyframes(),
          this.tweenGroup = new u(null,this),
          this.groups.unshift(this.tweenGroup),
          this._resolveReady()),
          this.ready
      }
      use(t, e) {
          t.install(this, e)
      }
      remove() {
          return this.initialized ? Promise.all(this.groups.map((t=>t.remove()))).then((()=>{
              this.groups = null,
              this.scrollSystems = null,
              this.timeSystems = null,
              window.clearTimeout(s.RESIZE_TIMEOUT),
              window.removeEventListener("scroll", this.onScroll),
              window.removeEventListener("resize", this.onResizeImmediate),
              this._events = {},
              this.initialized = !1,
              this.ready = new Promise((t=>this._resolveReady = t))
          }
          )) : (this.ready = new Promise((t=>this._resolveReady = t)),
          Promise.resolve())
      }
      destroy() {
          return this.remove()
      }
      createTimeGroup(t, e) {
          t instanceof HTMLElement || (t = (e = t || {}).el);
          let i = new l(t,this);
          return e && e.name && (i.name = e.name),
          this.groups.push(i),
          this.timeSystems.push(i),
          this.trigger(s.EVENTS.ON_GROUP_CREATED, i),
          i
      }
      createScrollGroup(t, e) {
          if (!t)
              throw "AnimSystem scroll based groups must supply an HTMLElement";
          let i = new h(t,this);
          return (e = e || {}).name && (i.name = e.name),
          e.getPosition && e.getMaxPosition && (i.getPosition = e.getPosition,
          i.createViewableRange = ()=>({
              a: 0,
              d: e.getMaxPosition()
          })),
          i.getPosition = e.getPosition || i.getPosition,
          i.getPosition = e.getPosition || i.getPosition,
          this.groups.push(i),
          this.scrollSystems.push(i),
          this.trigger(s.EVENTS.ON_GROUP_CREATED, i),
          i
      }
      removeGroup(t) {
          return Promise.all(t.keyframeControllers.map((e=>t.removeKeyframeController(e)))).then((()=>{
              let e = this.groups.indexOf(t);
              -1 !== e && this.groups.splice(e, 1),
              e = this.scrollSystems.indexOf(t),
              -1 !== e && this.scrollSystems.splice(e, 1),
              e = this.timeSystems.indexOf(t),
              -1 !== e && this.timeSystems.splice(e, 1),
              t.destroy()
          }
          ))
      }
      createDOMGroups() {
          document.body.setAttribute("data-anim-scroll-group", "body"),
          document.querySelectorAll("[data-anim-scroll-group]").forEach((t=>this.createScrollGroup(t))),
          document.querySelectorAll("[data-anim-time-group]").forEach((t=>this.createTimeGroup(t))),
          this.trigger(s.EVENTS.ON_DOM_GROUPS_CREATED, this.groups)
      }
      createDOMKeyframes() {
          let t = [];
          ["data-anim-keyframe", n.DATA_ATTRIBUTE, a.DATA_ATTRIBUTE, o.DATA_ATTRIBUTE].forEach((function(e) {
              for (let i = 0; i < 12; i++)
                  t.push(e + (0 === i ? "" : "-" + (i - 1)))
          }
          ));
          for (let e = 0; e < t.length; e++) {
              let i = t[e]
                , r = document.querySelectorAll("[" + i + "]");
              for (let t = 0; t < r.length; t++) {
                  const e = r[t]
                    , s = JSON.parse(e.getAttribute(i));
                  this.addKeyframe(e, s)
              }
          }
          d.update((()=>{
              null !== this.groups && (this.groups.forEach((t=>t.onKeyframesDirty({
                  silent: !0
              }))),
              this.groups.forEach((t=>t.trigger(s.EVENTS.ON_DOM_KEYFRAMES_CREATED, t))),
              this.trigger(s.EVENTS.ON_DOM_KEYFRAMES_CREATED, this),
              this.groups.forEach((t=>{
                  t.forceUpdate({
                      waitForNextUpdate: !1,
                      silent: !0
                  }),
                  t.reconcile()
              }
              )),
              this.onScroll())
          }
          ), !0)
      }
      initializeResizeFilter() {
          if (s.cssDimensionsTracker)
              return;
          const t = document.querySelector(".cssDimensionsTracker") || document.createElement("div");
          t.setAttribute("cssDimensionsTracker", "true"),
          t.style.position = "fixed",
          t.style.top = "0",
          t.style.width = "100%",
          t.style.height = "100vh",
          t.style.pointerEvents = "none",
          t.style.visibility = "hidden",
          t.style.zIndex = "-1",
          document.documentElement.appendChild(t),
          s.cssDimensionsTracker = t
      }
      initializeModel() {
          s.pageMetrics.windowHeight = s.cssDimensionsTracker.clientHeight,
          s.pageMetrics.windowWidth = s.cssDimensionsTracker.clientWidth,
          s.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
          s.pageMetrics.scrollX = window.scrollX || window.pageXOffset,
          s.pageMetrics.breakpoint = s.getBreakpoint();
          let t = document.documentElement.getBoundingClientRect();
          s.pageMetrics.documentOffsetX = t.left + s.pageMetrics.scrollX,
          s.pageMetrics.documentOffsetY = t.top + s.pageMetrics.scrollY
      }
      setupEvents() {
          window.removeEventListener("scroll", this.onScroll),
          window.addEventListener("scroll", this.onScroll),
          window.removeEventListener("resize", this.onResizeImmediate),
          window.addEventListener("resize", this.onResizeImmediate)
      }
      onScroll() {
          s.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
          s.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
          for (let t = 0, e = this.scrollSystems.length; t < e; t++)
              this.scrollSystems[t].updateTimeline();
          this.trigger(s.PageEvents.ON_SCROLL, s.pageMetrics)
      }
      onResizeImmediate() {
          let t = s.cssDimensionsTracker.clientWidth
            , e = s.cssDimensionsTracker.clientHeight;
          if (t === s.pageMetrics.windowWidth && e === s.pageMetrics.windowHeight)
              return;
          s.pageMetrics.windowWidth = t,
          s.pageMetrics.windowHeight = e,
          s.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
          s.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
          let i = document.documentElement.getBoundingClientRect();
          s.pageMetrics.documentOffsetX = i.left + s.pageMetrics.scrollX,
          s.pageMetrics.documentOffsetY = i.top + s.pageMetrics.scrollY,
          window.clearTimeout(s.RESIZE_TIMEOUT),
          s.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250),
          this.trigger(s.PageEvents.ON_RESIZE_IMMEDIATE, s.pageMetrics)
      }
      onResizedDebounced() {
          d.update((()=>{
              let t = s.pageMetrics.breakpoint
                , e = s.getBreakpoint();
              if (e !== t) {
                  s.pageMetrics.previousBreakpoint = t,
                  s.pageMetrics.breakpoint = e;
                  for (let t = 0, e = this.groups.length; t < e; t++)
                      this.groups[t]._onBreakpointChange();
                  this.trigger(s.PageEvents.ON_BREAKPOINT_CHANGE, s.pageMetrics)
              }
              for (let t = 0, e = this.groups.length; t < e; t++)
                  this.groups[t].forceUpdate({
                      waitForNextUpdate: !1
                  });
              this.trigger(s.PageEvents.ON_RESIZE_DEBOUNCED, s.pageMetrics)
          }
          ), !0)
      }
      forceUpdate() {
          let {waitForNextUpdate: t=!0, silent: e=!1} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          -1 !== this._forceUpdateRAFId && d.cancelUpdate(this._forceUpdateRAFId);
          let i = ()=>{
              for (let t = 0, i = this.groups.length; t < i; t++) {
                  this.groups[t].forceUpdate({
                      waitForNextUpdate: !1,
                      silent: e
                  })
              }
              return -1
          }
          ;
          this._forceUpdateRAFId = t ? d.update(i, !0) : i()
      }
      addKeyframe(t, e) {
          let i = this.getGroupForTarget(t);
          return i = i || this.getGroupForTarget(document.body),
          i.addKeyframe(t, e)
      }
      addEvent(t, e) {
          let i = this.getGroupForTarget(t);
          return i = i || this.getGroupForTarget(document.body),
          i.addEvent(t, e)
      }
      getTimeGroupForTarget(t) {
          return this._getGroupForTarget(t, (t=>t instanceof l))
      }
      getScrollGroupForTarget(t) {
          return this._getGroupForTarget(t, (t=>!(t instanceof l)))
      }
      getGroupForTarget(t) {
          return this._getGroupForTarget(t, (()=>!0))
      }
      getGroupByName(t) {
          return this.groups.find((e=>e.name === t))
      }
      _getGroupForTarget(t, e) {
          if (t._animInfo && t._animInfo.group && e(t._animInfo.group))
              return t._animInfo.group;
          let i = t;
          for (; i; ) {
              if (i._animInfo && i._animInfo.isGroup && e(i._animInfo.group))
                  return i._animInfo.group;
              i = i.parentElement
          }
      }
      getControllerForTarget(t) {
          return t._animInfo && t._animInfo.controller ? t._animInfo.controller : null
      }
      addTween(t, e) {
          return this.tweenGroup.addKeyframe(t, e)
      }
  }
  t.exports = "undefined" == typeof window ? new p : window.AC.SharedInstance.share("AnimSystem", c.major, p),
  t.exports.default = t.exports
}
, function(t, e, i) {
  "use strict";
  t.exports = new class {
      constructor() {
          this.linear = function(t) {
              return t
          }
          ,
          this.easeInQuad = function(t) {
              return t * t
          }
          ,
          this.easeOutQuad = function(t) {
              return t * (2 - t)
          }
          ,
          this.easeInOutQuad = function(t) {
              return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1
          }
          ,
          this.easeInSin = function(t) {
              return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2)
          }
          ,
          this.easeOutSin = function(t) {
              return Math.sin(Math.PI / 2 * t)
          }
          ,
          this.easeInOutSin = function(t) {
              return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
          }
          ,
          this.easeInElastic = function(t) {
              return 0 === t ? t : (.04 - .04 / t) * Math.sin(25 * t) + 1
          }
          ,
          this.easeOutElastic = function(t) {
              return .04 * t / --t * Math.sin(25 * t)
          }
          ,
          this.easeInOutElastic = function(t) {
              return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1
          }
          ,
          this.easeOutBack = function(t) {
              return (t -= 1) * t * (2.70158 * t + 1.70158) + 1
          }
          ,
          this.easeInCubic = function(t) {
              return t * t * t
          }
          ,
          this.easeOutCubic = function(t) {
              return --t * t * t + 1
          }
          ,
          this.easeInOutCubic = function(t) {
              return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
          }
          ,
          this.easeInQuart = function(t) {
              return t * t * t * t
          }
          ,
          this.easeOutQuart = function(t) {
              return 1 - --t * t * t * t
          }
          ,
          this.easeInOutQuart = function(t) {
              return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
          }
          ,
          this.easeInQuint = function(t) {
              return t * t * t * t * t
          }
          ,
          this.easeOutQuint = function(t) {
              return 1 + --t * t * t * t * t
          }
          ,
          this.easeInOutQuint = function(t) {
              return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
          }
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = 1e-5
    , s = Math.abs;
  class n {
      constructor(t, e, i, r) {
          this.cp = new Float32Array(6),
          this.cp[0] = 3 * t,
          this.cp[1] = 3 * (i - t) - this.cp[0],
          this.cp[2] = 1 - this.cp[0] - this.cp[1],
          this.cp[3] = 3 * e,
          this.cp[4] = 3 * (r - e) - this.cp[3],
          this.cp[5] = 1 - this.cp[3] - this.cp[4]
      }
      sampleCurveX(t) {
          return ((this.cp[2] * t + this.cp[1]) * t + this.cp[0]) * t
      }
      sampleCurveY(t) {
          return ((this.cp[5] * t + this.cp[4]) * t + this.cp[3]) * t
      }
      sampleCurveDerivativeX(t) {
          return (3 * this.cp[2] * t + 2 * this.cp[1]) * t + this.cp[0]
      }
      solveCurveX(t) {
          var e, i, n, a, o, h;
          for (n = t,
          h = 0; h < 5; h++) {
              if (a = this.sampleCurveX(n) - t,
              s(a) < r)
                  return n;
              if (o = this.sampleCurveDerivativeX(n),
              s(o) < r)
                  break;
              n -= a / o
          }
          if ((n = t) < (e = 0))
              return e;
          if (n > (i = 1))
              return i;
          for (; e < i; ) {
              if (a = this.sampleCurveX(n),
              s(a - t) < r)
                  return n;
              t > a ? e = n : i = n,
              n = .5 * (i - e) + e
          }
          return n
      }
      solve(t) {
          return this.sampleCurveY(this.solveCurveX(t))
      }
  }
  const a = /\d*\.?\d+/g;
  n.fromCSSString = function(t) {
      let e = t.match(a);
      if (4 !== e.length)
          throw `UnitBezier could not convert ${t} to cubic-bezier`;
      let i = e.map(Number)
        , r = new n(i[0],i[1],i[2],i[3]);
      return r.solve.bind(r)
  }
  ,
  t.exports = n
}
, function(t, e, i) {
  "use strict";
  const {map: r} = i(6)
    , s = {};
  class n {
      constructor(t, e, i, r) {
          this.mass = t,
          this.stiffness = e,
          this.damping = i,
          this.initialVelocity = r,
          this.m_w0 = Math.sqrt(this.stiffness / this.mass),
          this.m_zeta = this.damping / (2 * Math.sqrt(this.stiffness * this.mass)),
          this.m_zeta < 1 ? (this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta),
          this.m_A = 1,
          this.m_B = (this.m_zeta * this.m_w0 - this.initialVelocity) / this.m_wd) : (this.m_wd = 0,
          this.m_A = 1,
          this.m_B = -this.initialVelocity + this.m_w0)
      }
      solve(t) {
          return 1 - (t = this.m_zeta < 1 ? Math.exp(-t * this.m_zeta * this.m_w0) * (this.m_A * Math.cos(this.m_wd * t) + this.m_B * Math.sin(this.m_wd * t)) : (this.m_A + this.m_B * t) * Math.exp(-t * this.m_w0))
      }
  }
  const a = /\d*\.?\d+/g;
  n.fromCSSString = function(t) {
      let e = t.match(a);
      if (4 !== e.length)
          throw `SpringEasing could not convert ${cssString} to spring params`;
      let i = e.map(Number)
        , o = new n(...i);
      const h = o.solve.bind(o);
      let l = 0;
      let u = function() {
          if (s[t])
              return s[t];
          const e = 1 / 6;
          let i, r = 0;
          for (; ; ) {
              l += e;
              if (1 === h(l)) {
                  if (r++,
                  r >= 16) {
                      i = l * e;
                      break
                  }
              } else
                  r = 0
          }
          return s[t] = i,
          s[t]
      }();
      return function(t) {
          return 0 === t || 1 === t ? t : h(r(t, 0, 1, 0, u))
      }
  }
  ,
  t.exports = n
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t, e) {
      if ("string" != typeof t)
          return t;
      try {
          return (e || document).querySelector(t) || document.querySelector(t)
      } catch (t) {
          return !1
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = class {
      constructor() {
          this.local = 0,
          this.localUnclamped = 0,
          this.lastPosition = 0
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = class {
      constructor(t, e) {
          this.a = t.top - e,
          this.a < 0 && (this.a = t.top),
          this.b = t.top,
          this.d = t.bottom,
          this.c = Math.max(this.d - e, this.b)
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(2)
    , s = i(6)
    , n = {}
    , a = {
      smoothstep: (t,e,i)=>(i = a.clamp((i - t) / (e - t), 0, 1)) * i * (3 - 2 * i),
      deg: t=>180 * t / Math.PI,
      rad: t=>t * Math.PI / 180,
      random: (t,e)=>Math.random() * (e - t) + t,
      atan: Math.atan2
  };
  Object.getOwnPropertyNames(Math).forEach((t=>a[t] ? null : a[t.toLowerCase()] = Math[t])),
  Object.getOwnPropertyNames(s).forEach((t=>a[t] ? null : a[t.toLowerCase()] = s[t]));
  let o = null;
  const h = "a"
    , l = "ALPHA"
    , u = "("
    , c = ")"
    , d = "PLUS"
    , f = "MINUS"
    , p = "MUL"
    , m = "DIV"
    , g = "INTEGER_CONST"
    , _ = "FLOAT_CONST"
    , y = ","
    , v = "EOF"
    , b = {
      NUMBERS: /\d|\d\.\d/,
      DIGIT: /\d/,
      OPERATOR: /[-+*/]/,
      PAREN: /[()]/,
      WHITE_SPACE: /\s/,
      ALPHA: /[a-zA-Z]|%/,
      ALPHANUMERIC: /[a-zA-Z0-9]/,
      OBJECT_UNIT: /^(t|l|b|r|%w|%h|%|h|w)$/,
      GLOBAL_METRICS_UNIT: /^(px|vh|vw)$/,
      ANY_UNIT: /^(t|l|b|r|%w|%h|%|h|w|px|vh|vw)$/,
      MATH_FUNCTION: new RegExp(`\\b(${Object.keys(a).join("|")})\\b`,"i")
  }
    , E = function(t, e, i) {
      let r = e.slice(Math.max(i, 0), Math.min(e.length, i + 3))
        , s = new Error(`Expression Error. ${t} in expression "${e}", near "${r}"`);
      throw console.error(s.message, o ? o.keyframe || o.target : ""),
      s
  }
    , w = {
      round: 1,
      clamp: 3,
      lerp: 3,
      random: 2,
      atan: 2,
      floor: 1,
      ceil: 1,
      abs: 1,
      cos: 1,
      sin: 1,
      smoothstep: 3,
      rad: 1,
      deg: 1,
      pow: 2,
      calc: 1
  };
  class x {
      constructor(t, e) {
          this.type = t,
          this.value = e
      }
  }
  x.ONE = new x("100",100),
  x.EOF = new x(v,null);
  class A {
      constructor(t) {
          this.type = t
      }
  }
  class T extends A {
      constructor(t, e) {
          super("UnaryOp"),
          this.token = this.op = t,
          this.expr = e
      }
  }
  class S extends A {
      constructor(t, e, i) {
          super("BinOp"),
          this.left = t,
          this.op = e,
          this.right = i
      }
  }
  class P extends A {
      constructor(t, e) {
          if (super("MathOp"),
          this.op = t,
          this.list = e,
          w[t.value] && e.length !== w[t.value])
              throw new Error(`Incorrect number of arguments for '${t.value}'. Received ${e.length}, expected ${w[t.value]}`)
      }
  }
  class O extends A {
      constructor(t) {
          super("Num"),
          this.token = t,
          this.value = t.value
      }
  }
  class C extends A {
      constructor(t, e, i) {
          super("RefValue"),
          this.num = t,
          this.ref = e,
          this.unit = i
      }
  }
  class k extends A {
      constructor(t, e) {
          super("CSSValue"),
          this.ref = t,
          this.propertyName = e
      }
  }
  class I extends A {
      constructor(t, e) {
          super("PropValue"),
          this.ref = t,
          this.propertyName = e
      }
  }
  class R {
      constructor(t) {
          let e;
          for (this.text = t,
          this.pos = 0,
          this.char = this.text[this.pos],
          this.tokens = []; (e = this.getNextToken()) && e !== x.EOF; )
              this.tokens.push(e);
          this.tokens.push(e)
      }
      advance() {
          this.char = this.text[++this.pos]
      }
      skipWhiteSpace() {
          for (; null != this.char && b.WHITE_SPACE.test(this.char); )
              this.advance()
      }
      name() {
          let t = "";
          for (; null != this.char && b.ALPHA.test(this.char); )
              t += this.char,
              this.advance();
          return new x(l,t)
      }
      number() {
          let t = "";
          for ("." === this.char && (t += this.char,
          this.advance()); null != this.char && b.DIGIT.test(this.char); )
              t += this.char,
              this.advance();
          if (null != this.char && "." === this.char)
              for (t.includes(".") && E("Number appears to contain 2 decimal points", this.text, this.pos),
              t += this.char,
              this.advance(); null != this.char && b.DIGIT.test(this.char); )
                  t += this.char,
                  this.advance();
          return "." === t && E("Attempted to parse a number, but found only a decimal point", this.text, this.pos),
          t.includes(".") ? new x(_,parseFloat(t)) : new x(g,parseInt(t))
      }
      getNextToken() {
          for (; null != this.char; )
              if (b.WHITE_SPACE.test(this.char))
                  this.skipWhiteSpace();
              else {
                  if ("." === this.char || b.DIGIT.test(this.char))
                      return this.number();
                  if ("," === this.char)
                      return this.advance(),
                      new x(y,",");
                  if (b.OPERATOR.test(this.char)) {
                      let t = ""
                        , e = this.char;
                      switch (e) {
                      case "+":
                          t = d;
                          break;
                      case "-":
                          t = f;
                          break;
                      case "*":
                          t = p;
                          break;
                      case "/":
                          t = m
                      }
                      return this.advance(),
                      new x(t,e)
                  }
                  if (b.PAREN.test(this.char)) {
                      let t = ""
                        , e = this.char;
                      switch (e) {
                      case "(":
                          t = u;
                          break;
                      case ")":
                          t = c
                      }
                      return this.advance(),
                      new x(t,e)
                  }
                  if (b.ALPHA.test(this.char))
                      return this.name();
                  E(`Unexpected character "${this.char}"`, this.text, this.pos)
              }
          return x.EOF
      }
  }
  class M {
      constructor(t) {
          this.lexer = t,
          this.pos = 0
      }
      get currentToken() {
          return this.lexer.tokens[this.pos]
      }
      error(t) {
          E(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", this.lexer.text, this.pos)
      }
      consume(t) {
          let e = this.currentToken;
          return e.type === t ? this.pos += 1 : this.error(`Invalid token ${this.currentToken.value}, expected ${t}`),
          e
      }
      consumeList(t) {
          t.includes(this.currentToken) ? this.pos += 1 : this.error(`Invalid token ${this.currentToken.value}, expected ${tokenType}`)
      }
      expr() {
          let t = this.term();
          for (; this.currentToken.type === d || this.currentToken.type === f; ) {
              const e = this.currentToken;
              switch (e.value) {
              case "+":
                  this.consume(d);
                  break;
              case "-":
                  this.consume(f)
              }
              t = new S(t,e,this.term())
          }
          return t
      }
      term() {
          let t = this.factor();
          for (; this.currentToken.type === p || this.currentToken.type === m; ) {
              const e = this.currentToken;
              switch (e.value) {
              case "*":
                  this.consume(p);
                  break;
              case "/":
                  this.consume(m)
              }
              t = new S(t,e,this.factor())
          }
          return t
      }
      factor() {
          if (this.currentToken.type === d)
              return new T(this.consume(d),this.factor());
          if (this.currentToken.type === f)
              return new T(this.consume(f),this.factor());
          if (this.currentToken.type === g || this.currentToken.type === _) {
              let t = new O(this.currentToken);
              if (this.pos += 1,
              b.OPERATOR.test(this.currentToken.value) || this.currentToken.type === c || this.currentToken.type === y || this.currentToken.type === v)
                  return t;
              if (this.currentToken.type === l && this.currentToken.value === h)
                  return this.consume(l),
                  new C(t,this.anchorIndex(),this.unit(b.ANY_UNIT));
              if (this.currentToken.type === l)
                  return "%a" === this.currentToken.value && this.error("%a is invalid, try removing the %"),
                  new C(t,null,this.unit());
              this.error("Expected a scaling unit type", "Such as 'h' / 'w'")
          } else {
              if (b.OBJECT_UNIT.test(this.currentToken.value))
                  return new C(new O(x.ONE),null,this.unit());
              if (this.currentToken.value === h) {
                  this.consume(l);
                  const t = this.anchorIndex();
                  if (b.OBJECT_UNIT.test(this.currentToken.value))
                      return new C(new O(x.ONE),t,this.unit())
              } else if (this.currentToken.type === l) {
                  if ("calc" === this.currentToken.value)
                      return this.consume(l),
                      this.expr();
                  if ("css" === this.currentToken.value || "var" === this.currentToken.value || "prop" === this.currentToken.value) {
                      const t = "prop" !== this.currentToken.value ? k : I;
                      this.consume(l),
                      this.consume(u);
                      const e = this.propertyName();
                      let i = null;
                      return this.currentToken.type === y && (this.consume(y),
                      this.consume(l),
                      i = this.anchorIndex()),
                      this.consume(c),
                      new t(i,e)
                  }
                  if (b.MATH_FUNCTION.test(this.currentToken.value)) {
                      const t = this.currentToken.value.toLowerCase();
                      if ("number" == typeof a[t])
                          return this.consume(l),
                          new O(new x(l,a[t]));
                      const e = x[t] || new x(t,t)
                        , i = [];
                      this.consume(l),
                      this.consume(u);
                      let r = null;
                      do {
                          this.currentToken.value === y && this.consume(y),
                          r = this.expr(),
                          i.push(r)
                      } while (this.currentToken.value === y);
                      return this.consume(c),
                      new P(e,i)
                  }
              } else if (this.currentToken.type === u) {
                  this.consume(u);
                  let t = this.expr();
                  return this.consume(c),
                  t
              }
          }
          this.error(`Unexpected token ${this.currentToken.value}`)
      }
      propertyName() {
          let t = "";
          for (; this.currentToken.type === l || this.currentToken.type === f; )
              t += this.currentToken.value,
              this.pos += 1;
          return t
      }
      unit() {
          let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : b.ANY_UNIT;
          const e = this.currentToken;
          if (e.type === l && t.test(e.value))
              return this.consume(l),
              new x(l,e.value = e.value.replace(/%(h|w)/, "$1").replace("%", "h"));
          this.error("Expected unit type")
      }
      anchorIndex() {
          const t = this.currentToken;
          if (t.type === g)
              return this.consume(g),
              new O(t);
          this.error("Invalid anchor reference", ". Should be something like a0, a1, a2")
      }
      parse() {
          const t = this.expr();
          return this.currentToken !== x.EOF && this.error(`Unexpected token ${this.currentToken.value}`),
          t
      }
  }
  class D {
      constructor(t) {
          this.parser = t,
          this.root = t.parse()
      }
      visit(t) {
          let e = this[t.type];
          if (!e)
              throw new Error(`No visit method named, ${e}`);
          return e.call(this, t)
      }
      BinOp(t) {
          switch (t.op.type) {
          case d:
              return this.visit(t.left) + this.visit(t.right);
          case f:
              return this.visit(t.left) - this.visit(t.right);
          case p:
              return this.visit(t.left) * this.visit(t.right);
          case m:
              return this.visit(t.left) / this.visit(t.right)
          }
      }
      RefValue(t) {
          let e = this.unwrapReference(t)
            , i = t.unit.value
            , s = t.num.value;
          const n = o.metrics.get(e);
          switch (i) {
          case "h":
              return .01 * s * n.height;
          case "t":
              return .01 * s * n.top;
          case "vh":
              return .01 * s * r.pageMetrics.windowHeight;
          case "vw":
              return .01 * s * r.pageMetrics.windowWidth;
          case "px":
              return s;
          case "w":
              return .01 * s * n.width;
          case "b":
              return .01 * s * n.bottom;
          case "l":
              return .01 * s * n.left;
          case "r":
              return .01 * s * n.right
          }
      }
      PropValue(t) {
          return (null === t.ref ? o.target : o.anchors[t.ref.value])[t.propertyName]
      }
      CSSValue(t) {
          let e = this.unwrapReference(t);
          const i = getComputedStyle(e).getPropertyValue(t.propertyName);
          return "" === i ? 0 : D.Parse(i).execute(o)
      }
      Num(t) {
          return t.value
      }
      UnaryOp(t) {
          return t.op.type === d ? +this.visit(t.expr) : t.op.type === f ? -this.visit(t.expr) : void 0
      }
      MathOp(t) {
          let e = t.list.map((t=>this.visit(t)));
          return a[t.op.value].apply(null, e)
      }
      unwrapReference(t) {
          return null === t.ref ? o.target : (t.ref.value >= o.anchors.length && console.error(`Not enough anchors supplied for expression ${this.parser.lexer.text}`, o.target),
          o.anchors[t.ref.value])
      }
      execute(t) {
          return o = t,
          this.visit(this.root)
      }
      static Parse(t) {
          return n[t] || (n[t] = new D(new M(new R(t))))
      }
  }
  D.programs = n,
  t.exports = D
}
, function(t, e, i) {
  "use strict";
  const r = i(2)
    , s = i(5)
    , n = i(66)
    , a = i(30)
    , o = i(17)
    , h = i(67)
    , l = i(16)
    , u = i(27)
    , c = i(4).EventEmitterMicro
    , d = i(68)
    , f = {};
  "undefined" != typeof window && (f.update = i(14),
  f.external = i(32),
  f.draw = i(15));
  const {transformAttributes: p, cssAttributes: m, domAttributes: g} = i(28)
    , _ = Math.PI / 180
    , y = {
      create: i(69),
      rotateX: i(70),
      rotateY: i(71),
      rotateZ: i(72),
      scale: i(73)
  };
  t.exports = class extends c {
      constructor(t, e) {
          super(),
          this._events.draw = [],
          this.uuid = u(),
          this.group = t,
          this.element = e,
          this._ownerIsElement = this.element instanceof Element,
          this._ownerIsElement ? this.friendlyName = this.element.tagName + "." + Array.from(this.element.classList).join(".") : this.friendlyName = this.element.friendlyName || this.uuid,
          this.element._animInfo = this.element._animInfo || new a(t,this),
          this.element._animInfo.controller = this,
          this.element._animInfo.group = this.group,
          this.element._animInfo.controllers.push(this),
          this.tweenProps = this.element._animInfo.tweenProps,
          this.eventObject = new n(this),
          this.needsStyleUpdate = !1,
          this.needsClassUpdate = !1,
          this.elementMetrics = this.group.metrics.add(this.element),
          this.attributes = [],
          this.cssAttributes = [],
          this.domAttributes = [],
          this.keyframes = {},
          this._allKeyframes = [],
          this._activeKeyframes = [],
          this.keyframesRequiringDispatch = [],
          this.updateCachedValuesFromElement(),
          this.boundsMin = 0,
          this.boundsMax = 0,
          this.mat2d = new Float32Array(6),
          this.mat4 = y.create(),
          this.needsWrite = !0,
          this.onDOMWriteImp = this._ownerIsElement ? this.onDOMWriteForElement : this.onDOMWriteForObject
      }
      destroy() {
          if (this.element._animInfo) {
              this.element._animInfo.controller === this && (this.element._animInfo.controller = null);
              let t = this.element._animInfo.controllers.indexOf(this);
              if (-1 !== t && this.element._animInfo.controllers.splice(t, 1),
              0 === this.element._animInfo.controllers.length)
                  this.element._animInfo = null;
              else {
                  let t = this.element._animInfo.controllers.find((t=>t.group !== t.group.anim.tweenGroup));
                  t && (this.element._animInfo.controller = t,
                  this.element._animInfo.group = t.group)
              }
          }
          this.eventObject.controller = null,
          this.eventObject.element = null,
          this.eventObject.keyframe = null,
          this.eventObject.tweenProps = null,
          this.eventObject = null,
          this.elementMetrics = null,
          this.group = null,
          this.keyframesRequiringDispatch = null;
          for (let t = 0; t < this._allKeyframes.length; t++)
              this._allKeyframes[t].destroy();
          this._allKeyframes = null,
          this._activeKeyframes = null,
          this.attributes = null,
          this.keyframes = null,
          this.element = null,
          this.tweenProps = null,
          this.destroyed = !0,
          super.destroy()
      }
      remove() {
          return this.group.removeKeyframeController(this)
      }
      updateCachedValuesFromElement() {
          if (!this._ownerIsElement)
              return;
          const t = this.getTargetComputedStyle(!0);
          let e = new DOMMatrix(t.getPropertyValue("transform"))
            , i = d(e)
            , n = r.KeyframeDefaults.epsilon
            , a = !1;
          ["x", "y", "z"].forEach(((t,e)=>{
              this.tweenProps[t] = new s(i.translation[e],n,a,t)
          }
          )),
          this.tweenProps.rotation = new s(i.rotation[2],n,a,"rotation"),
          ["rotationX", "rotationY", "rotationZ"].forEach(((t,e)=>{
              this.tweenProps[t] = new s(i.rotation[e],n,a,t)
          }
          )),
          this.tweenProps.scale = new s(i.scale[0],n,a,"scale"),
          ["scaleX", "scaleY", "scaleZ"].forEach(((t,e)=>{
              this.tweenProps[t] = new s(i.scale[e],n,a,t)
          }
          ))
      }
      addKeyframe(t) {
          let e = h(t);
          if (!e)
              throw new Error("AnimSystem Cannot create keyframe for from options `" + t + "`");
          let i = new e(this,t);
          return i.parseOptions(t),
          i.id = this._allKeyframes.length,
          this._allKeyframes.push(i),
          i
      }
      needsUpdate() {
          for (let t = 0, e = this.attributes.length; t < e; t++) {
              let e = this.attributes[t];
              if (this.tweenProps[e].needsUpdate())
                  return !0
          }
          return !1
      }
      updateLocalProgress(t) {
          for (let e = 0, i = this.attributes.length; e < i; e++) {
              let i = this.attributes[e]
                , r = this.keyframes[this.attributes[e]];
              if (1 === r.length) {
                  r[0].updateLocalProgress(t);
                  continue
              }
              let s = this.getNearestKeyframeForAttribute(i, t);
              s && s.updateLocalProgress(t)
          }
      }
      reconcile() {
          for (let t = 0, e = this.attributes.length; t < e; t++) {
              let e = this.attributes[t]
                , i = this.getNearestKeyframeForAttribute(e, this.group.position.local);
              i.updateLocalProgress(this.group.position.local),
              i.snapAtCreation && i.reconcile(e)
          }
      }
      determineActiveKeyframes(t) {
          t = t || l(Array.from(document.documentElement.classList));
          let e = this._activeKeyframes
            , i = this.attributes
            , r = {};
          this._activeKeyframes = [],
          this.attributes = [],
          this.keyframes = {};
          for (let e = 0; e < this._allKeyframes.length; e++) {
              let i = this._allKeyframes[e];
              if (i.markedForRemoval || i.hidden || !i.setEnabled(t))
                  for (let t in i.animValues)
                      this.tweenProps[t].isActive = i.preserveState,
                      i.preserveState && (r[t] = !0);
              else {
                  this._activeKeyframes.push(i);
                  for (let t in i.animValues)
                      this.keyframes[t] = this.keyframes[t] || [],
                      this.keyframes[t].push(i),
                      -1 === this.attributes.indexOf(t) && (r[t] = !0,
                      this.attributes.push(t),
                      this.tweenProps[t].isActive = !0)
              }
          }
          this.attributes.forEach((t=>this.tweenProps[t].isActive = !0)),
          this.cssAttributes = this.attributes.filter((t=>m.includes(t) || t.startsWith("--"))).map((t=>this.tweenProps[t])),
          this.domAttributes = this.attributes.filter((t=>g.includes(t))).map((t=>this.tweenProps[t]));
          let s = e.filter((t=>-1 === this._activeKeyframes.indexOf(t)));
          if (0 === s.length)
              return;
          let n = i.filter((t=>-1 === this.attributes.indexOf(t) && !r.hasOwnProperty(t)));
          if (0 !== n.length)
              if (this.needsWrite = !0,
              this._ownerIsElement)
                  f.external((()=>{
                      let t = n.some((t=>p.includes(t)))
                        , e = t && Object.keys(r).some((t=>p.includes(t)));
                      t && !e && this.element.style.removeProperty("transform");
                      for (let t = 0, e = n.length; t < e; ++t) {
                          let e = n[t]
                            , i = this.tweenProps[e]
                            , r = i.isActive ? i.target : i.initialValue;
                          i.current = i.target = r,
                          !i.isActive && m.includes(e) && (this.element.style[e] = null)
                      }
                      for (let t = 0, e = s.length; t < e; ++t) {
                          let e = s[t];
                          e instanceof o && !e.preserveState && e._unapply()
                      }
                  }
                  ), !0);
              else
                  for (let t = 0, e = n.length; t < e; ++t) {
                      let e = this.tweenProps[n[t]];
                      e.current = e.target,
                      e.isActive = !1
                  }
      }
      onDOMRead(t) {
          for (let e = 0, i = this.attributes.length; e < i; e++) {
              let i = this.attributes[e]
                , r = this.getNearestKeyframeForAttribute(i, t);
              r && r.onDOMRead(i) && (this.needsWrite = !0)
          }
      }
      onDOMWrite() {
          (this.needsWrite || this.needsClassUpdate || this.needsStyleUpdate) && (this.needsWrite = !1,
          this.onDOMWriteImp(),
          this.handleEventDispatch())
      }
      onDOMWriteForObject() {
          for (let t = 0, e = this.attributes.length; t < e; t++) {
              let e = this.attributes[t];
              this.element[e] = this.tweenProps[e].current
          }
      }
      onDOMWriteForElement() {
          let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.element.style;
          this.handleStyleTransform(t);
          for (let e = 0, i = this.cssAttributes.length; e < i; e++)
              this.cssAttributes[e].set(t);
          for (let t = 0, e = this.domAttributes.length; t < e; t++)
              this.domAttributes[t].set(this.element);
          if (this.needsStyleUpdate) {
              for (let t in this.tweenProps.targetStyles)
                  null !== this.tweenProps.targetStyles[t] && (this.element.style[t] = this.tweenProps.targetStyles[t]),
                  this.tweenProps.targetStyles[t] = null;
              this.needsStyleUpdate = !1
          }
          this.needsClassUpdate && (this.tweenProps.targetClasses.add.length > 0 && this.element.classList.add.apply(this.element.classList, this.tweenProps.targetClasses.add),
          this.tweenProps.targetClasses.remove.length > 0 && this.element.classList.remove.apply(this.element.classList, this.tweenProps.targetClasses.remove),
          this.tweenProps.targetClasses.add.length = 0,
          this.tweenProps.targetClasses.remove.length = 0,
          this.needsClassUpdate = !1)
      }
      handleStyleTransform() {
          let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.element.style
            , e = this.tweenProps;
          if (e.z.isActive || e.rotationX.isActive || e.rotationY.isActive) {
              const i = this.mat4;
              i[0] = 1,
              i[1] = 0,
              i[2] = 0,
              i[3] = 0,
              i[4] = 0,
              i[5] = 1,
              i[6] = 0,
              i[7] = 0,
              i[8] = 0,
              i[9] = 0,
              i[10] = 1,
              i[11] = 0,
              i[12] = 0,
              i[13] = 0,
              i[14] = 0,
              i[15] = 1;
              const r = e.x.current
                , s = e.y.current
                , n = e.z.current;
              if (i[12] = i[0] * r + i[4] * s + i[8] * n + i[12],
              i[13] = i[1] * r + i[5] * s + i[9] * n + i[13],
              i[14] = i[2] * r + i[6] * s + i[10] * n + i[14],
              i[15] = i[3] * r + i[7] * s + i[11] * n + i[15],
              0 !== e.rotation.current || 0 !== e.rotationZ.current) {
                  const t = (e.rotation.current || e.rotationZ.current) * _;
                  y.rotateZ(i, i, t)
              }
              if (0 !== e.rotationX.current) {
                  const t = e.rotationX.current * _;
                  y.rotateX(i, i, t)
              }
              if (0 !== e.rotationY.current) {
                  const t = e.rotationY.current * _;
                  y.rotateY(i, i, t)
              }
              1 === e.scale.current && 1 === e.scaleX.current && 1 === e.scaleY.current || y.scale(i, i, [e.scale.current, e.scale.current, 1]),
              t.transform = "matrix3d(" + i[0] + "," + i[1] + "," + i[2] + "," + i[3] + "," + i[4] + "," + i[5] + "," + i[6] + "," + i[7] + "," + i[8] + "," + i[9] + "," + i[10] + "," + i[11] + "," + i[12] + "," + i[13] + "," + i[14] + "," + i[15] + ")"
          } else if (e.x.isActive || e.y.isActive || e.rotation.isActive || e.rotationZ.isActive || e.scale.isActive || e.scaleX.isActive || e.scaleY.isActive) {
              const i = this.mat2d;
              i[0] = 1,
              i[1] = 0,
              i[2] = 0,
              i[3] = 1,
              i[4] = 0,
              i[5] = 0;
              const r = e.x.current
                , s = e.y.current
                , n = i[0]
                , a = i[1]
                , o = i[2]
                , h = i[3]
                , l = i[4]
                , u = i[5];
              if (i[0] = n,
              i[1] = a,
              i[2] = o,
              i[3] = h,
              i[4] = n * r + o * s + l,
              i[5] = a * r + h * s + u,
              0 !== e.rotation.current || 0 !== e.rotationZ.current) {
                  const t = (e.rotation.current || e.rotationZ.current) * _
                    , r = i[0]
                    , s = i[1]
                    , n = i[2]
                    , a = i[3]
                    , o = i[4]
                    , h = i[5]
                    , l = Math.sin(t)
                    , u = Math.cos(t);
                  i[0] = r * u + n * l,
                  i[1] = s * u + a * l,
                  i[2] = r * -l + n * u,
                  i[3] = s * -l + a * u,
                  i[4] = o,
                  i[5] = h
              }
              e.scaleX.isActive || e.scaleY.isActive ? (i[0] = i[0] * e.scaleX.current,
              i[1] = i[1] * e.scaleX.current,
              i[2] = i[2] * e.scaleY.current,
              i[3] = i[3] * e.scaleY.current) : (i[0] = i[0] * e.scale.current,
              i[1] = i[1] * e.scale.current,
              i[2] = i[2] * e.scale.current,
              i[3] = i[3] * e.scale.current),
              t.transform = "matrix(" + i[0] + ", " + i[1] + ", " + i[2] + ", " + i[3] + ", " + i[4] + ", " + i[5] + ")"
          }
      }
      handleEventDispatch() {
          if (0 !== this.keyframesRequiringDispatch.length) {
              for (let t = 0, e = this.keyframesRequiringDispatch.length; t < e; t++) {
                  let e = this.keyframesRequiringDispatch[t];
                  e.needsEventDispatch = !1,
                  this.eventObject.keyframe = e,
                  this.eventObject.pageMetrics = r.pageMetrics,
                  this.eventObject.event = e.event,
                  this.trigger(e.event, this.eventObject)
              }
              this.keyframesRequiringDispatch.length = 0
          }
          if (0 !== this._events.draw.length) {
              this.eventObject.keyframe = null,
              this.eventObject.event = "draw";
              for (let t = this._events.draw.length - 1; t >= 0; t--)
                  this._events.draw[t](this.eventObject)
          }
      }
      updateAnimationConstraints() {
          for (let t = 0, e = this._activeKeyframes.length; t < e; t++)
              this._activeKeyframes[t].evaluateConstraints();
          this.attributes.forEach((t=>{
              1 !== this.keyframes[t].length && this.keyframes[t].sort(r.KeyframeComparison)
          }
          )),
          this.updateDeferredPropertyValues()
      }
      refreshMetrics() {
          let t = new Set([this.element]);
          this._allKeyframes.forEach((e=>e.anchors.forEach((e=>t.add(e))))),
          this.group.metrics.refreshCollection(t),
          this.group.keyframesDirty = !0
      }
      getTargetComputedStyle() {
          let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          return this._ownerIsElement ? ((t || void 0 === this.group.computedStyleCache[this.uuid]) && (this.group.computedStyleCache[this.uuid] = getComputedStyle(this.element)),
          this.group.computedStyleCache[this.uuid]) : null
      }
      updateDeferredPropertyValues() {
          for (let t = 0, e = this.attributes.length; t < e; t++) {
              let e = this.attributes[t]
                , i = this.keyframes[e];
              if (!(i[0].keyframeType > r.KeyframeTypes.InterpolationForward))
                  for (let t = 0, r = i.length; t < r; t++) {
                      let s = i[t];
                      null === s.jsonProps[e][0] && (0 === t ? s.jsonProps[e][0] = s.animValues[e][0] = this.tweenProps[e].current : s.animValues[e][0] = i[t - 1].animValues[e][1]),
                      null === s.jsonProps[e][1] && (s.animValues[e][1] = t === r - 1 ? this.tweenProps[e].current : i[t + 1].animValues[e][0]),
                      s.snapAtCreation && (s.jsonProps[e][0] = s.animValues[e][0],
                      s.jsonProps[e][1] = s.animValues[e][1])
                  }
          }
      }
      getBounds(t) {
          this.boundsMin = Number.MAX_VALUE,
          this.boundsMax = -Number.MAX_VALUE;
          for (let e = 0, i = this.attributes.length; e < i; e++) {
              let i = this.keyframes[this.attributes[e]];
              for (let e = 0; e < i.length; e++) {
                  let r = i[e];
                  this.boundsMin = Math.min(r.start, this.boundsMin),
                  this.boundsMax = Math.max(r.end, this.boundsMax),
                  t.min = Math.min(r.start, t.min),
                  t.max = Math.max(r.end, t.max)
              }
          }
      }
      getNearestKeyframeForAttribute(t, e) {
          e = void 0 !== e ? e : this.group.position.local;
          let i = null
            , r = Number.POSITIVE_INFINITY
            , s = this.keyframes[t];
          if (void 0 === s)
              return null;
          let n = s.length;
          if (0 === n)
              return null;
          if (1 === n)
              return s[0];
          for (let t = 0; t < n; t++) {
              let n = s[t];
              if (n.isInRange(e)) {
                  i = n;
                  break
              }
              let a = Math.min(Math.abs(e - n.start), Math.abs(e - n.end));
              a < r && (r = a,
              i = n)
          }
          return i
      }
      getAllKeyframesForAttribute(t) {
          return this.keyframes[t]
      }
      updateKeyframe(t, e) {
          t.parseOptions(e),
          t.evaluateConstraints(),
          this.group.keyframesDirty = !0,
          f.update((()=>{
              this.trigger(r.EVENTS.ON_KEYFRAME_UPDATED, t),
              this.group.trigger(r.EVENTS.ON_KEYFRAME_UPDATED, t)
          }
          ), !0)
      }
      removeKeyframe(t) {
          return t.controller !== this ? Promise.resolve(null) : (t.markedForRemoval = !0,
          this.group.keyframesDirty = !0,
          new Promise((e=>{
              this.group.rafEmitter.executor.eventEmitter.once("before:draw", (()=>{
                  e(t),
                  t.destroy();
                  let i = this._allKeyframes.indexOf(t);
                  -1 !== i && this._allKeyframes.splice(i, 1)
              }
              ))
          }
          )))
      }
      updateAnimation(t, e) {
          return this.group.gui && console.warn("KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"),
          this.updateKeyframe(t, e)
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = class {
      constructor(t) {
          this.controller = t,
          this.element = this.controller.element,
          this.keyframe = null,
          this.event = "",
          this.tweenProps = this.controller.tweenProps
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(2)
    , s = i(11)
    , n = i(29)
    , a = i(17)
    , o = function(t) {
      for (let e in t) {
          let i = t[e];
          if (-1 === r.KeyframeJSONReservedWords.indexOf(e) && Array.isArray(i))
              return !0
      }
      return !1
  };
  t.exports = function(t) {
      if (void 0 !== t.cssClass || void 0 !== t.style) {
          if (o(t))
              throw "CSS Keyframes cannot tween values, please use multiple keyframes instead";
          return a
      }
      if (o(t))
          return s;
      if (t.event)
          return n;
      throw delete t.anchors,
      `Could not determine tween type based on ${JSON.stringify(t)}`
  }
}
, function(t, e, i) {
  "use strict";
  "undefined" != typeof window && (window.DOMMatrix = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix);
  const r = 180 / Math.PI
    , s = t=>Math.round(1e6 * t) / 1e6;
  function n(t) {
      return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2])
  }
  function a(t, e) {
      return 0 === e ? Array.from(t) : [t[0] / e, t[1] / e, t[2] / e]
  }
  function o(t, e) {
      return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
  }
  function h(t, e, i, r) {
      return [t[0] * i + e[0] * r, t[1] * i + e[1] * r, t[2] * i + e[2] * r]
  }
  function l(t) {
      const e = new Float32Array(4)
        , i = new Float32Array(3)
        , l = new Float32Array(3)
        , u = new Float32Array(3);
      u[0] = t[3][0],
      u[1] = t[3][1],
      u[2] = t[3][2];
      const c = new Array(3);
      for (let e = 0; e < 3; e++)
          c[e] = t[e].slice(0, 3);
      i[0] = n(c[0]),
      c[0] = a(c[0], i[0]),
      l[0] = o(c[0], c[1]),
      c[1] = h(c[1], c[0], 1, -l[0]),
      i[1] = n(c[1]),
      c[1] = a(c[1], i[1]),
      l[0] /= i[1],
      l[1] = o(c[0], c[2]),
      c[2] = h(c[2], c[0], 1, -l[1]),
      l[2] = o(c[1], c[2]),
      c[2] = h(c[2], c[1], 1, -l[2]),
      i[2] = n(c[2]),
      c[2] = a(c[2], i[2]),
      l[1] /= i[2],
      l[2] /= i[2];
      const d = (f = c[1],
      p = c[2],
      [f[1] * p[2] - f[2] * p[1], f[2] * p[0] - f[0] * p[2], f[0] * p[1] - f[1] * p[0]]);
      var f, p;
      if (o(c[0], d) < 0)
          for (let t = 0; t < 3; t++)
              i[t] *= -1,
              c[t][0] *= -1,
              c[t][1] *= -1,
              c[t][2] *= -1;
      let m;
      return e[0] = .5 * Math.sqrt(Math.max(1 + c[0][0] - c[1][1] - c[2][2], 0)),
      e[1] = .5 * Math.sqrt(Math.max(1 - c[0][0] + c[1][1] - c[2][2], 0)),
      e[2] = .5 * Math.sqrt(Math.max(1 - c[0][0] - c[1][1] + c[2][2], 0)),
      e[3] = .5 * Math.sqrt(Math.max(1 + c[0][0] + c[1][1] + c[2][2], 0)),
      c[2][1] > c[1][2] && (e[0] = -e[0]),
      c[0][2] > c[2][0] && (e[1] = -e[1]),
      c[1][0] > c[0][1] && (e[2] = -e[2]),
      m = e[0] < .001 && e[0] >= 0 && e[1] < .001 && e[1] >= 0 ? [0, 0, s(180 * Math.atan2(c[0][1], c[0][0]) / Math.PI)] : function(t) {
          const [e,i,n,a] = t
            , o = e * e
            , h = i * i
            , l = n * n
            , u = e * i + n * a
            , c = a * a + o + h + l;
          return u > .49999 * c ? [0, 2 * Math.atan2(e, a) * r, 90] : u < -.49999 * c ? [0, -2 * Math.atan2(e, a) * r, -90] : [s(Math.atan2(2 * e * a - 2 * i * n, 1 - 2 * o - 2 * l) * r), s(Math.atan2(2 * i * a - 2 * e * n, 1 - 2 * h - 2 * l) * r), s(Math.asin(2 * e * i + 2 * n * a) * r)]
      }(e),
      {
          translation: u,
          rotation: m,
          eulerRotation: m,
          scale: [s(i[0]), s(i[1]), s(i[2])]
      }
  }
  t.exports = function(t) {
      t instanceof Element && (t = String(getComputedStyle(t).transform).trim());
      let e = new DOMMatrix(t);
      const i = new Array(4);
      for (let t = 1; t < 5; t++) {
          const r = i[t - 1] = new Float32Array(4);
          for (let i = 1; i < 5; i++)
              r[i - 1] = e[`m ${t}${i}`]
      }
      return l(i)
  }
}
, function(t, e) {
  t.exports = function() {
      var t = new Float32Array(16);
      return t[0] = 1,
      t[1] = 0,
      t[2] = 0,
      t[3] = 0,
      t[4] = 0,
      t[5] = 1,
      t[6] = 0,
      t[7] = 0,
      t[8] = 0,
      t[9] = 0,
      t[10] = 1,
      t[11] = 0,
      t[12] = 0,
      t[13] = 0,
      t[14] = 0,
      t[15] = 1,
      t
  }
}
, function(t, e) {
  t.exports = function(t, e, i) {
      var r = Math.sin(i)
        , s = Math.cos(i)
        , n = e[4]
        , a = e[5]
        , o = e[6]
        , h = e[7]
        , l = e[8]
        , u = e[9]
        , c = e[10]
        , d = e[11];
      e !== t && (t[0] = e[0],
      t[1] = e[1],
      t[2] = e[2],
      t[3] = e[3],
      t[12] = e[12],
      t[13] = e[13],
      t[14] = e[14],
      t[15] = e[15]);
      return t[4] = n * s + l * r,
      t[5] = a * s + u * r,
      t[6] = o * s + c * r,
      t[7] = h * s + d * r,
      t[8] = l * s - n * r,
      t[9] = u * s - a * r,
      t[10] = c * s - o * r,
      t[11] = d * s - h * r,
      t
  }
}
, function(t, e) {
  t.exports = function(t, e, i) {
      var r = Math.sin(i)
        , s = Math.cos(i)
        , n = e[0]
        , a = e[1]
        , o = e[2]
        , h = e[3]
        , l = e[8]
        , u = e[9]
        , c = e[10]
        , d = e[11];
      e !== t && (t[4] = e[4],
      t[5] = e[5],
      t[6] = e[6],
      t[7] = e[7],
      t[12] = e[12],
      t[13] = e[13],
      t[14] = e[14],
      t[15] = e[15]);
      return t[0] = n * s - l * r,
      t[1] = a * s - u * r,
      t[2] = o * s - c * r,
      t[3] = h * s - d * r,
      t[8] = n * r + l * s,
      t[9] = a * r + u * s,
      t[10] = o * r + c * s,
      t[11] = h * r + d * s,
      t
  }
}
, function(t, e) {
  t.exports = function(t, e, i) {
      var r = Math.sin(i)
        , s = Math.cos(i)
        , n = e[0]
        , a = e[1]
        , o = e[2]
        , h = e[3]
        , l = e[4]
        , u = e[5]
        , c = e[6]
        , d = e[7];
      e !== t && (t[8] = e[8],
      t[9] = e[9],
      t[10] = e[10],
      t[11] = e[11],
      t[12] = e[12],
      t[13] = e[13],
      t[14] = e[14],
      t[15] = e[15]);
      return t[0] = n * s + l * r,
      t[1] = a * s + u * r,
      t[2] = o * s + c * r,
      t[3] = h * s + d * r,
      t[4] = l * s - n * r,
      t[5] = u * s - a * r,
      t[6] = c * s - o * r,
      t[7] = d * s - h * r,
      t
  }
}
, function(t, e) {
  t.exports = function(t, e, i) {
      var r = i[0]
        , s = i[1]
        , n = i[2];
      return t[0] = e[0] * r,
      t[1] = e[1] * r,
      t[2] = e[2] * r,
      t[3] = e[3] * r,
      t[4] = e[4] * s,
      t[5] = e[5] * s,
      t[6] = e[6] * s,
      t[7] = e[7] * s,
      t[8] = e[8] * n,
      t[9] = e[9] * n,
      t[10] = e[10] * n,
      t[11] = e[11] * n,
      t[12] = e[12],
      t[13] = e[13],
      t[14] = e[14],
      t[15] = e[15],
      t
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(18)
    , s = i(33)
    , n = i(6);
  let a = 0;
  const o = {};
  "undefined" != typeof window && (o.create = i(8));
  class h extends r {
      constructor(t, e) {
          t || ((t = document.createElement("div")).className = "TimeGroup-" + a++),
          super(t, e),
          this.name = this.name || t.getAttribute("data-anim-time-group"),
          this._isPaused = !0,
          this._repeats = 0,
          this._isReversed = !1,
          this._timeScale = 1,
          this._chapterPlayer = new s(this),
          this.now = performance.now()
      }
      finalizeInit() {
          if (!this.anim)
              throw "TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
          this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this),
          super.finalizeInit()
      }
      progress(t) {
          if (void 0 === t)
              return 0 === this.boundsMax ? 0 : this.position.local / this.boundsMax;
          let e = t * this.boundsMax;
          this.timelineUpdateRequired = !0,
          this.updateTimeline(e)
      }
      time(t) {
          if (void 0 === t)
              return this.position.local;
          t = n.clamp(t, this.boundsMin, this.duration),
          this.timelineUpdateRequired = !0,
          this.updateTimeline(t)
      }
      play(t) {
          this.reversed(!1),
          this.isEnabled = !0,
          this._isPaused = !1,
          this.time(t),
          this.now = performance.now(),
          this._playheadEmitter.run()
      }
      reverse(t) {
          this.reversed(!0),
          this.isEnabled = !0,
          this._isPaused = !1,
          this.time(t),
          this.now = performance.now(),
          this._playheadEmitter.run()
      }
      reversed(t) {
          if (void 0 === t)
              return this._isReversed;
          this._isReversed = t
      }
      restart() {
          this._isReversed ? (this.progress(1),
          this.reverse(this.time())) : (this.progress(0),
          this.play(this.time()))
      }
      pause(t) {
          this.time(t),
          this._isPaused = !0
      }
      paused(t) {
          return void 0 === t ? this._isPaused : (this._isPaused = t,
          this._isPaused || this.play(),
          this)
      }
      onPlayTimeUpdate() {
          if (this._isPaused)
              return;
          let t = performance.now()
            , e = (t - this.now) / 1e3;
          this.now = t,
          this._isReversed && (e = -e);
          let i = this.time() + e * this._timeScale;
          if (this._repeats === h.REPEAT_FOREVER || this._repeats > 0) {
              let t = !1;
              !this._isReversed && i > this.boundsMax ? (i -= this.boundsMax,
              t = !0) : this._isReversed && i < 0 && (i = this.boundsMax + i,
              t = !0),
              t && (this._repeats = this._repeats === h.REPEAT_FOREVER ? h.REPEAT_FOREVER : this._repeats - 1)
          }
          this.time(i);
          let r = !this._isReversed && this.position.local !== this.duration
            , s = this._isReversed && 0 !== this.position.local;
          r || s ? this._playheadEmitter.run() : this.paused(!0)
      }
      updateProgress(t) {
          this.hasDuration() ? (this.position.localUnclamped = t,
          this.position.local = n.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
      }
      updateBounds() {
          if (0 === this.keyframeControllers.length)
              return this.boundsMin = 0,
              void (this.boundsMax = 0);
          let t = {
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY
          };
          for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
              this.keyframeControllers[e].getBounds(t);
          this.boundsMin = 0,
          this.boundsMax = t.max,
          this.viewableRange.a = this.viewableRange.b = 0,
          this.viewableRange.c = this.viewableRange.d = this.boundsMax,
          this.timelineUpdateRequired = !0
      }
      setupRAFEmitter(t) {
          this._playheadEmitter = new o.create,
          this._playheadEmitter.on("update", this.onPlayTimeUpdate),
          super.setupRAFEmitter(t)
      }
      get duration() {
          return this.keyframesDirty && this.onKeyframesDirty({
              silent: !0
          }),
          this.boundsMax
      }
      timeScale(t) {
          return void 0 === t ? this._timeScale : (this._timeScale = t,
          this)
      }
      repeats(t) {
          if (void 0 === t)
              return this._repeats;
          this._repeats = t
      }
      getPosition() {
          return this.position.local
      }
      addChapter(t) {
          return this._chapterPlayer.addChapter(t)
      }
      playToChapter(t) {
          return this._chapterPlayer.playToChapter(t)
      }
      convertScrollPositionToTValue(t) {
          return t
      }
      convertTValueToScrollPosition(t) {
          return t
      }
      hasDuration() {
          return this.duration > 0
      }
      destroy() {
          this._chapterPlayer.destroy(),
          this._playheadEmitter.destroy(),
          this._playheadEmitter = null,
          super.destroy()
      }
      get timelineProgress() {
          return this.progress()
      }
      set timelineProgress(t) {
          this.progress(t)
      }
      get progressValue() {
          return this.progress()
      }
      set progressValue(t) {
          this.progress(t)
      }
      get timeValue() {
          return this.time()
      }
      set timeValue(t) {
          this.time(t)
      }
  }
  h.REPEAT_FOREVER = -1,
  t.exports = h
}
, function(t, e, i) {
  "use strict";
  const r = i(18)
    , s = (i(33),
  i(6));
  let n = 0;
  const a = {};
  "undefined" != typeof window && (a.create = i(8));
  t.exports = class extends r {
      constructor(t, e) {
          t || ((t = document.createElement("div")).className = "TweenGroup-" + n++),
          super(t, e),
          this.name = "Tweens",
          this.keyframes = [],
          this._isPaused = !1,
          this.now = performance.now()
      }
      finalizeInit() {
          this.onTimeEmitterUpdate = this.onTimeEmitterUpdate.bind(this),
          this.removeExpiredKeyframeControllers = this.removeExpiredKeyframeControllers.bind(this),
          super.finalizeInit()
      }
      destroy() {
          this._timeEmitter.destroy(),
          this._timeEmitter = null,
          this._keyframes = [],
          super.destroy()
      }
      setupRAFEmitter(t) {
          this.now = performance.now(),
          this._timeEmitter = new a.create,
          this._timeEmitter.on("update", this.onTimeEmitterUpdate),
          this._timeEmitter.run(),
          super.setupRAFEmitter(t)
      }
      addKeyframe(t, e) {
          if (void 0 !== e.start || void 0 !== e.end)
              throw Error("Tweens do not have a start or end, they can only have a duration. Consider using a TimeGroup instead");
          if ("number" != typeof e.duration)
              throw Error("Tween options.duration is undefined, or is not a number");
          let i, r;
          e.start = (e.delay || 0) + this.position.localUnclamped,
          e.end = e.start + e.duration,
          e.preserveState = !0,
          e.snapAtCreation = !0,
          t._animInfo && (i = t._animInfo.group,
          r = t._animInfo.controller);
          let s = super.addKeyframe(t, e);
          return t._animInfo.group = i,
          t._animInfo.controller = r,
          e.onStart && s.controller.once("draw", (t=>{
              t.keyframe = s,
              e.onStart(t),
              t.keyframe = null
          }
          )),
          e.onDraw && s.controller.on("draw", (t=>{
              t.keyframe = s,
              e.onDraw(t),
              t.keyframe = null
          }
          )),
          this.removeOverlappingProps(s),
          this.keyframes.push(s),
          this._timeEmitter.willRun() || (this.now = performance.now(),
          this._timeEmitter.run()),
          s
      }
      removeOverlappingProps(t) {
          if (t.controller._allKeyframes.length <= 1)
              return;
          let e = Object.keys(t.animValues)
            , i = t.controller;
          for (let r = 0, s = i._allKeyframes.length; r < s; r++) {
              const s = i._allKeyframes[r];
              if (s === t)
                  continue;
              if (s.markedForRemoval)
                  continue;
              let n = Object.keys(s.animValues)
                , a = n.filter((t=>e.includes(t)));
              a.length !== n.length ? a.forEach((t=>delete s.animValues[t])) : s.markedForRemoval = !0
          }
      }
      onTimeEmitterUpdate(t) {
          if (this._isPaused || 0 === this.keyframeControllers.length)
              return;
          let e = performance.now()
            , i = (e - this.now) / 1e3;
          this.now = e;
          let r = this.position.local + i;
          this.position.local = this.position.localUnclamped = r,
          this.onTimeUpdate()
      }
      onTimeUpdate() {
          for (let t = 0, e = this.keyframes.length; t < e; t++)
              this.keyframes[t].updateLocalProgress(this.position.localUnclamped);
          this.requestDOMChange(),
          this._timeEmitter.run(),
          null !== this.gui && this.gui.onScrollUpdate(this.position)
      }
      onDOMRead() {
          if (this.keyframesDirty && this.onKeyframesDirty(),
          0 !== this.keyframes.length)
              for (let t = 0, e = this.keyframes.length; t < e; t++) {
                  this.keyframes[t].controller.needsWrite = !0;
                  for (let e in this.keyframes[t].animValues)
                      this.keyframes[t].onDOMRead(e)
              }
      }
      onDOMWrite() {
          super.onDOMWrite(),
          this.removeExpiredKeyframes()
      }
      removeExpiredKeyframes() {
          let t = this.keyframes.length
            , e = t;
          for (; t--; ) {
              let e = this.keyframes[t];
              e.destroyed ? this.keyframes.splice(t, 1) : (e.markedForRemoval && (e.jsonProps.onComplete && 1 === e.localT && (e.controller.eventObject.keyframe = e,
              e.jsonProps.onComplete(e.controller.eventObject),
              e.jsonProps.onComplete = null),
              null !== this.gui && this.gui.isDraggingPlayhead || (e.remove(),
              this.keyframes.splice(t, 1))),
              1 === e.localT && (e.markedForRemoval = !0))
          }
          this.keyframes.length === e && 0 !== this.keyframes.length || this._timeEmitter.executor.eventEmitter.once("after:draw", this.removeExpiredKeyframeControllers)
      }
      removeExpiredKeyframeControllers() {
          for (let t = 0, e = this.keyframeControllers.length; t < e; t++) {
              let e = !0
                , i = this.keyframeControllers[t];
              for (let t = 0, r = i._allKeyframes.length; t < r; t++)
                  if (!i._allKeyframes[t].destroyed) {
                      e = !1;
                      break
                  }
              e && i.remove()
          }
      }
      updateBounds() {
          this.boundsMin = Math.min(...this.keyframes.map((t=>t.start))),
          this.boundsMax = Math.max(...this.keyframes.map((t=>t.end)))
      }
      play() {
          this.isEnabled = !0,
          this._isPaused = !1,
          this.now = performance.now(),
          this._timeEmitter.run()
      }
      pause() {
          this._isPaused = !0
      }
      paused() {
          return this._isPaused
      }
      time(t) {
          if (void 0 === t)
              return this.position.local;
          this.position.local = this.position.localUnclamped = s.clamp(t, this.boundsMin, this.boundsMax),
          this.onTimeUpdate()
      }
      performTimelineDispatch() {}
      hasDuration() {
          return !0
      }
      getPosition() {
          return this.position.local
      }
      updateProgress(t) {}
      get duration() {
          return this.boundsMax
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      version: "3.6.5",
      major: "3.x",
      majorMinor: "3.6"
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(10);
  t.exports = r.cancelAnimationFrame("update")
}
, function(t, e, i) {
  "use strict";
  class r {
      constructor() {
          let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          this.options = t,
          "loading" === document.readyState ? document.addEventListener("readystatechange", (t=>{
              "interactive" === document.readyState && this._init()
          }
          )) : this._init()
      }
      _init() {
          if (this._images = Array.from(document.querySelectorAll(`*[${r.DATA_ATTRIBUTE}]`)),
          this.AnimSystem = this._findAnim(),
          null === this.AnimSystem)
              return null;
          this._addKeyframesToImages()
      }
      _defineKeyframeOptions() {
          const t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null).getAttribute(r.DATA_DOWNLOAD_AREA_KEYFRAME) || "{}";
          return Object.assign({}, {
              start: "t - 200vh",
              end: "b + 100vh",
              event: "AnimLazyImage"
          }, JSON.parse(t))
      }
      _addKeyframesToImages() {
          this._scrollGroup = this.AnimSystem.getGroupForTarget(document.body),
          this._images.forEach((t=>{
              this.AnimSystem.getGroupForTarget(t) && (this._scrollGroup = this.AnimSystem.getGroupForTarget(t));
              let e = this._defineKeyframeOptions(t);
              this._scrollGroup.addKeyframe(t, e).controller.once("AnimLazyImage:enter", (()=>{
                  this._imageIsInLoadRange(t)
              }
              ))
          }
          ))
      }
      _cleanUpImageAttributes(t) {
          let e = !1;
          try {
              e = this._scrollGroup.getControllerForTarget(t).getNearestKeyframeForAttribute("AnimLazyImage").isCurrentlyInRange
          } catch (t) {
              e = !1
          }
          e || t.setAttribute(r.DATA_ATTRIBUTE, "")
      }
      _downloadingImageAttributes(t) {
          t.removeAttribute(r.DATA_ATTRIBUTE)
      }
      _imageIsInLoadRange(t) {
          this._downloadImage(t)
      }
      _downloadImage(t) {
          this._downloadingImageAttributes(t)
      }
      _findAnim() {
          var t = Array.from(document.querySelectorAll("[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"));
          return t.map((t=>t._animInfo ? t._animInfo.group : null)).filter((t=>null !== t)),
          t[0] && t[0]._animInfo ? t[0]._animInfo.group.anim : (console.error("AnimLazyImage: AnimSystem not found, please initialize anim before instantiating"),
          null)
      }
  }
  r.DATA_DOWNLOAD_AREA_KEYFRAME = "data-download-area-keyframe",
  r.DATA_ATTRIBUTE = "data-anim-lazy-image",
  t.exports = r
}
, function(t, e, i) {
  "use strict";
  var r = !1
    , s = {};
  "undefined" != typeof window && (s = window || self);
  try {
      r = !!s.localStorage.getItem("f7c9180f-5c45-47b4-8de4-428015f096c0")
  } catch (t) {}
  t.exports = r
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(171));
  e.default = class {
      constructor(t) {
          this._breakpoints = t.breakpoints || s.default,
          this.options = t,
          this._initialize()
      }
      _initialize() {
          this._updateBreakpoint = this._updateBreakpoint.bind(this),
          this._callback = this.options.callback,
          this._mediaQueries = Object.keys(this._breakpoints).map((t=>window.matchMedia(`(min-width: ${this._breakpoints[t]}px)`))),
          this._addEventListeners(),
          this._updateBreakpoint()
      }
      _addEventListeners() {
          for (const t of this._mediaQueries)
              t.addListener(this._updateBreakpoint)
      }
      _removeEventListeners() {
          for (const t of this._mediaQueries)
              t.removeListener(this._updateBreakpoint)
      }
      _updateBreakpoint() {
          const t = Object.keys(this._breakpoints);
          let e = t[0];
          for (let i = 1; i < t.length; i++) {
              if (!this._mediaQueries[i].matches)
                  break;
              e = t[i]
          }
          let i = !1;
          this._currentBreakpoint && this._currentBreakpoint !== e && (i = !0),
          this._currentBreakpoint = e,
          i && this._callback()
      }
      get breakpoint() {
          return this._currentBreakpoint
      }
      destroy() {
          this._removeEventListeners()
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(7))
    , n = r(i(12))
    , a = r(i(37))
    , o = r(i(103));
  const h = '[data-inline-media-control="PlayPause"]';
  class l extends s.default {
      constructor(t) {
          super(t),
          this._container = t.container || this.media.el.parentElement,
          this._button = this._findButton(),
          this.playPauseButtonBase = new o.default(this._button,!0,t.ariaPlay,t.ariaPause,t.ariaReplay),
          this._onClick = this._onClick.bind(this),
          this._onPlaybackStateChange = this._onPlaybackStateChange.bind(this),
          this._button.addEventListener("click", this._onClick),
          this.media.buttons = this.media.buttons ? this.media.buttons.push(this._button) : [this._button],
          this.media.on(n.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange)
      }
      _findButton() {
          if (this.options.playPauseButton)
              return this.options.playPauseButton;
          let t = this._container.querySelector(`${h}`);
          if (!t) {
              const e = document.querySelectorAll("[data-inline-media-controller='{id}']".replace("{id}", this.media.id));
              for (const i of e)
                  t = "PlayPause" === i.getAttribute("data-inline-media-control") ? i : i.querySelector(`${h}`)
          }
          return t
      }
      _onPlaybackStateChange() {
          let t;
          switch (this.media.playbackState) {
          case a.default.PLAYING:
              t = "pause";
              break;
          case a.default.ENDED:
              t = "replay";
              break;
          default:
              t = "play"
          }
          this.playPauseButtonBase.state = t
      }
      _onClick(t) {
          t.preventDefault(),
          this.media.el.paused ? this.media.play() : this.media.el.pause()
      }
      destroy() {
          this._button.removeEventListener("click", this._onClick),
          this.media.off(n.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange)
      }
  }
  e.default = l
}
, function(t, e, i) {
  "use strict";
  var r = i(83);
  t.exports = function(t, e) {
      if ("object" != typeof t)
          throw new TypeError("defaults: must provide a defaults object");
      if ("object" != typeof (e = e || {}))
          throw new TypeError("defaults: options must be a typeof object");
      return r({}, t, e)
  }
}
, function(t, e, i) {
  "use strict";
  i(204);
  var r = Object.prototype.hasOwnProperty;
  t.exports = function() {
      var t, e;
      return t = arguments.length < 2 ? [{}, arguments[0]] : [].slice.call(arguments),
      e = t.shift(),
      t.forEach((function(t) {
          if (null != t)
              for (var i in t)
                  r.call(t, i) && (e[i] = t[i])
      }
      )),
      e
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      DOMEmitter: i(219)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(228);
  t.exports = function(t, e) {
      var i;
      return i = "tagName"in t ? t.tagName : t === window ? "window" : "document",
      r(e, i) || e
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = 11
}
, function(t, e, i) {
  "use strict";
  t.exports = 1
}
, function(t, e, i) {
  "use strict";
  var r = i(117);
  t.exports = function(t, e) {
      return !!r(t) && ("number" == typeof e ? t.nodeType === e : -1 !== e.indexOf(t.nodeType))
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      WindowDelegate: i(248),
      WindowDelegateOptimizer: i(91),
      WindowDelegateCustomEvent: i(263)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(252)
    , s = i(253)
    , n = i(254)
    , a = i(255)
    , o = i(256)
    , h = i(257)
    , l = i(258)
    , u = i(259);
  t.exports = {
      innerWidth: r,
      innerHeight: s,
      clientWidth: n,
      clientHeight: a,
      scrollX: o,
      scrollY: h,
      maxScrollX: l,
      maxScrollY: u
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(39).EventEmitter;
  function s(t, e) {
      r.call(this),
      this.active = !1,
      this.eventNames = t.eventNames,
      this.propertyNames = t.propertyNames,
      this.options = t.options || {},
      this.callback = e
  }
  var n = s.prototype = new r(null);
  n.update = function(t, e) {
      this.trigger("update", {
          prop: t,
          val: e
      })
  }
  ,
  n.activate = function() {
      this.active = !0,
      this.trigger("activate", this)
  }
  ,
  n.deactivate = function() {
      this.active = !1,
      this.trigger("deactivate", this)
  }
  ,
  t.exports = s
}
, , , , , function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = function(t) {
      var e = this;
      let i, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 200;
      return function() {
          for (var s = arguments.length, n = new Array(s), a = 0; a < s; a++)
              n[a] = arguments[a];
          clearTimeout(i),
          i = setTimeout((()=>{
              t.apply(e, n)
          }
          ), r)
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      BaseComponent: i(3)
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(4).EventEmitterMicro;
  class s extends r {
      constructor(t) {
          super(),
          this.destroyed = !1,
          this.friendlyName = "ImageSequencePlayer",
          this.desiredIndex = 0,
          this.displayIndex = -1,
          this.numImages = t.numImages,
          this.numPadding = t.numPadding,
          this.images = new Array(this.numImages),
          this.showLoadingIndicators = t.showLoadingIndicators || !1,
          this.priorityFrames = t.priorityFrames || [],
          this.numImagesLoaded = 0,
          this.canvas = t.el,
          this.ctx = null,
          this.baseUrl = `${t.baseURL}/${t.viewport}`,
          this.imgFormat = t.imgFormat,
          this.setup()
      }
      setup() {
          this.ctx = this.canvas.getContext("2d"),
          this.once(s.FIRST_IMAGE_LOADED, (t=>this.setSize(t.naturalWidth, t.naturalHeight)))
      }
      splitArray(t, e, i) {
          const r = Math.floor(e.length / 2)
            , s = e[r]
            , n = t[s];
          t[s] = {
              value: n,
              bucket: i
          };
          const a = e.slice(0, r)
            , o = e.slice(r + 1);
          return a.length && this.splitArray(t, a, i + 1),
          o.length && this.splitArray(t, o, i + 1),
          t
      }
      async loadImages() {
          if (this.buckets)
              return;
          const t = [];
          for (let e = 0; e < this.numImages; e++)
              t.push(e);
          let e = this.splitArray(t, t, 0);
          this.buckets = [],
          e.forEach((t=>{
              this.buckets[t.bucket] = this.buckets[t.bucket] || [],
              this.buckets[t.bucket].push(t.value)
          }
          )),
          this.firstImageLoaded = !1,
          this.canPlayThrough = !1,
          this.loadImage(0),
          this.loadImage(this.numImages - 1),
          await this.loadPriorityFrames(),
          this.loadBucket()
      }
      async loadPriorityFrames() {
          let t = [];
          return this.priorityFrames.forEach((e=>{
              let i = new Promise((t=>{
                  this.loadImage(e, t)
              }
              ));
              t.push(i)
          }
          )),
          Promise.all(t)
      }
      loadImage(t, e) {
          if (this.images[t])
              return void (e && e());
          const i = new Image;
          let r = ()=>{
              e && e(),
              i.removeEventListener("load", r),
              0 !== t || this.firstImageLoaded || (this.firstImageLoaded = !0,
              this.trigger(s.FIRST_IMAGE_LOADED, i)),
              this.images[t] = i,
              this.numImagesLoaded++,
              this.renderIndex(this.desiredIndex)
          }
          ;
          const n = String(t).padStart(this.numPadding, "0");
          i.src = `${this.baseUrl}/${n}.${this.imgFormat}`,
          i.index = t,
          i.addEventListener("load", r)
      }
      loadBucket() {
          if (!this.inLoadArea)
              return;
          if (this.destroyed)
              return;
          let t = this.buckets.shift();
          if (!t)
              return this.canPlayThrough = !0,
              void this.trigger(s.LOADING_COMPLETE);
          let e = [];
          t.forEach((t=>{
              let i = new Promise((e=>{
                  this.loadImage(t, e)
              }
              ));
              e.push(i)
          }
          )),
          Promise.all(e).then(this.loadBucket.bind(this))
      }
      renderIndex(t) {
          if (this.destroyed)
              return;
          if (this.images[t])
              return void this.drawImage(t);
          let e = Number.MAX_SAFE_INTEGER;
          for (let i = t; i > 0; i--)
              if (this.images[i]) {
                  e = i;
                  break
              }
          let i = Number.MAX_SAFE_INTEGER;
          for (let e = t; e < this.images.length; e++)
              if (this.images[e]) {
                  i = e;
                  break
              }
          this.images[e] ? this.drawImage(e) : this.images[i] && this.drawImage(i)
      }
      drawImage(t) {
          this.displayIndex = t,
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
          this.ctx.drawImage(this.images[this.displayIndex], 0, 0),
          this.trigger(s.SEQUENCE_PROGRESS, this.displayIndex)
      }
      setSize(t, e) {
          this.destroyed || (this.canvas.width = t,
          this.canvas.height = e)
      }
      get percentLoaded() {
          return 100 * this.numImagesLoaded / this.numImages
      }
      get progress() {
          return this.desiredIndex / this.images.length
      }
      set progress(t) {
          this.desiredIndex = Math.round(t * this.images.length),
          this.renderIndex(this.desiredIndex)
      }
      destroy() {
          this.canvas && (this.canvas = null),
          this.sequenceLoadingContainer && this.sequenceLoadingContainer.parentElement.removeChild(this.sequenceLoadingContainer),
          this.destroyed = !0,
          super.destroy()
      }
  }
  s.FIRST_IMAGE_LOADED = "FIRST_IMAGE_LOADED",
  s.LOADING_COMPLETE = "LOADING_COMPLETE",
  s.CAN_PLAY_THROUGH = "CAN_PLAY_THROUGH",
  s.SEQUENCE_PROGRESS = "SEQUENCE_PROGRESS",
  t.exports = s
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.pluginCache = e.default = void 0;
  var s = r(i(19))
    , n = r(i(157))
    , a = r(i(162))
    , o = r(i(12));
  const h = {};
  e.pluginCache = h;
  const l = [];
  let u = 1;
  class c extends s.default {
      constructor() {
          let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          super(),
          this.el = t.el || document.createElement("video"),
          this.id = t.id || this.el.id || this.el.dataset.inlineMediaId || "inlineMedia-" + u++;
          const e = (t.plugins || []).concat(n.default);
          this._initPlugins(e, t),
          l.push(this)
      }
      async load(t) {
          for (const e of this.plugins)
              if ("function" == typeof e.load)
                  return e.load(t)
      }
      abortLoad() {
          for (const t of this.plugins)
              if ("function" == typeof t.abortLoad) {
                  t.abortLoad();
                  break
              }
      }
      async play() {
          for (const t of this.plugins)
              if ("function" == typeof t.play)
                  return t.play()
      }
      get src() {
          for (const t of this.plugins)
              if (t.src)
                  return t.src;
          return ""
      }
      get playbackState() {
          for (const t of this.plugins) {
              const e = t.playbackState;
              if (void 0 !== e)
                  return e
          }
      }
      get loadingState() {
          for (const t of this.plugins) {
              const e = t.loadingState;
              if (void 0 !== e)
                  return e
          }
      }
      _initPlugins(t, e) {
          this.plugins = [],
          this.pluginMap = new Map;
          for (let i of t) {
              if ("string" == typeof i) {
                  if (!h[i])
                      throw new Error(`Trying to use undefined Plugin named: ${i} . Ensure you call Media.addPlugin() first!`);
                  i = h[i]
              }
              if (!1 !== i.isSupported) {
                  const t = new i(Object.assign({
                      media: this
                  }, e));
                  this.plugins.push(t),
                  this.pluginMap.set(i, t)
              }
          }
          this.trigger(o.default.MOUNTED)
      }
      destroy() {
          if (!this._destroyed) {
              for (const t of this.plugins)
                  "function" == typeof t.destroy && t.destroy();
              super.destroy(),
              l.splice(l.indexOf(this), 1),
              this._destroyed = !0
          }
      }
      static get medias() {
          return l
      }
      static addPlugin(t, e) {
          h[t] = e
      }
      static async autoInitialize() {
          let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document
            , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return (0,
          a.default)(t, e)
      }
  }
  var d = c;
  e.default = d
}
, function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  e.default = {
      LOAD_START: "loadstart",
      LOADED_DATA: "loadeddata",
      LOADED_METADATA: "loadedmetadata",
      CAN_PLAY: "canplay",
      CAN_PLAY_THROUGH: "canplaythrough",
      PLAY: "play",
      PLAYING: "playing",
      PAUSE: "pause",
      WAITING: "waiting",
      SEEKING: "seeking",
      SEEKED: "seeked",
      ERROR: "error",
      ENDED: "ended",
      ABORT: "abort"
  }
}
, function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = function(t, e, i, r) {
      const s = i[0].toUpperCase() + i.slice(1)
        , n = t["inlineMedia" + s];
      if (void 0 !== n)
          switch (typeof r) {
          case "boolean":
              return "false" !== n;
          case "object":
              return JSON.parse(n);
          case "number":
              return Number(n);
          default:
              return n
          }
      else if (void 0 !== e[i]) {
          const t = e[i];
          return "boolean" != typeof r || "false" !== t && "true" !== t ? t : "false" !== t
      }
      return r
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(80))
    , n = r(i(172));
  class a extends s.default {
      constructor(t) {
          super(t)
      }
      _initialize() {
          this._anim = this.options.anim,
          this._bpMap = this.options.animBreakpointMap || n.default,
          this._updateBreakpoint = this._updateBreakpoint.bind(this),
          this._callback = this.options.callback,
          this._addEventListeners(),
          this._updateBreakpoint()
      }
      _addEventListeners() {
          this._anim.on("ON_BREAKPOINT_CHANGE", this._updateBreakpoint)
      }
      _removeEventListeners() {
          this._anim.off("ON_BREAKPOINT_CHANGE", this._updateBreakpoint)
      }
      _updateBreakpoint() {
          const t = this._bpMap[this._anim.model.pageMetrics.breakpoint];
          let e = !1;
          this._currentBreakpoint && this._currentBreakpoint !== t && (e = !0),
          this._currentBreakpoint = t,
          e && this._callback()
      }
      destroy() {
          super.destroy()
      }
  }
  e.default = a
}
, function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  const r = "Play"
    , s = "Pause"
    , n = "Replay"
    , a = {
      CLICK: "data-analytics-click",
      TITLE: "data-analytics-title"
  };
  e.default = class {
      constructor(t) {
          let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
            , i = arguments.length > 2 ? arguments[2] : void 0
            , o = arguments.length > 3 ? arguments[3] : void 0
            , h = arguments.length > 4 ? arguments[4] : void 0;
          this.el = t,
          this._setClasses = e,
          this._states = ["play", "pause", "replay", "loading"];
          const l = this.el.dataset;
          this._ariaLabels = {
              play: l.ariaPlay || l.ariaPaused || i || r,
              pause: l.ariaPause || l.ariaPlaying || o || s,
              replay: l.ariaReplay || l.ariaEnded || h || n
          };
          const u = this._states.slice(0, -1)
            , c = Object.values(a).filter((t=>{
              const e = this.el.hasAttribute(t + "-play")
                , i = this.el.hasAttribute(t + "-pause")
                , r = this.el.hasAttribute(t + "-replay");
              return e && i || r
          }
          ));
          this._analytics = c.reduce(((t,e)=>(t[e] = u.reduce(((t,i)=>(t[i] = this.el.getAttribute(`${e}-${i}`),
          t)), {}),
          t)), {})
      }
      get state() {
          return this._btnState
      }
      set state(t) {
          t !== this.state && this._states.includes(t) && (this._btnState = t,
          this._setAttributes(t))
      }
      _setAttributes(t) {
          this._setClasses && (this.el.classList.remove(...this._states),
          this.el.classList.add(t)),
          "loading" === t ? this.el.removeAttribute("aria-label") : (this.el.setAttribute("aria-label", this._ariaLabels[t]),
          this._setAnalytics(t))
      }
      _setAnalytics(t) {
          Object.keys(this._analytics).forEach((e=>{
              let i = t;
              "replay" !== t || this._analytics[e].replay || (i = "play"),
              this.el.setAttribute(e, this._analytics[e][i])
          }
          ))
      }
      _setClass(t) {
          this._setClasses && (this.el.classList.remove(...this._states),
          this.el.classList.add(t))
      }
      get disabled() {
          return this._disabled
      }
      set disabled(t) {
          this._disabled = t,
          t ? (this.el.setAttribute("aria-hidden", !0),
          this.el.setAttribute("disabled", "")) : (this.el.removeAttribute("aria-hidden"),
          this.el.removeAttribute("disabled"))
      }
  }
}
, function(t, e, i) {
  "use strict";
  (function(t) {
      var r = i(185)
        , s = i(106)
        , n = i(186).Buffer;
      t.__TYPEDARRAY_POOL || (t.__TYPEDARRAY_POOL = {
          UINT8: s([32, 0]),
          UINT16: s([32, 0]),
          UINT32: s([32, 0]),
          BIGUINT64: s([32, 0]),
          INT8: s([32, 0]),
          INT16: s([32, 0]),
          INT32: s([32, 0]),
          BIGINT64: s([32, 0]),
          FLOAT: s([32, 0]),
          DOUBLE: s([32, 0]),
          DATA: s([32, 0]),
          UINT8C: s([32, 0]),
          BUFFER: s([32, 0])
      });
      var a = "undefined" != typeof Uint8ClampedArray
        , o = "undefined" != typeof BigUint64Array
        , h = "undefined" != typeof BigInt64Array
        , l = t.__TYPEDARRAY_POOL;
      l.UINT8C || (l.UINT8C = s([32, 0])),
      l.BIGUINT64 || (l.BIGUINT64 = s([32, 0])),
      l.BIGINT64 || (l.BIGINT64 = s([32, 0])),
      l.BUFFER || (l.BUFFER = s([32, 0]));
      var u = l.DATA
        , c = l.BUFFER;
      function d(t) {
          if (t) {
              var e = t.length || t.byteLength
                , i = r.log2(e);
              u[i].push(t)
          }
      }
      function f(t) {
          t = r.nextPow2(t);
          var e = r.log2(t)
            , i = u[e];
          return i.length > 0 ? i.pop() : new ArrayBuffer(t)
      }
      function p(t) {
          return new Uint8Array(f(t),0,t)
      }
      function m(t) {
          return new Uint16Array(f(2 * t),0,t)
      }
      function g(t) {
          return new Uint32Array(f(4 * t),0,t)
      }
      function _(t) {
          return new Int8Array(f(t),0,t)
      }
      function y(t) {
          return new Int16Array(f(2 * t),0,t)
      }
      function v(t) {
          return new Int32Array(f(4 * t),0,t)
      }
      function b(t) {
          return new Float32Array(f(4 * t),0,t)
      }
      function E(t) {
          return new Float64Array(f(8 * t),0,t)
      }
      function w(t) {
          return a ? new Uint8ClampedArray(f(t),0,t) : p(t)
      }
      function x(t) {
          return o ? new BigUint64Array(f(8 * t),0,t) : null
      }
      function A(t) {
          return h ? new BigInt64Array(f(8 * t),0,t) : null
      }
      function T(t) {
          return new DataView(f(t),0,t)
      }
      function S(t) {
          t = r.nextPow2(t);
          var e = r.log2(t)
            , i = c[e];
          return i.length > 0 ? i.pop() : new n(t)
      }
      e.free = function(t) {
          if (n.isBuffer(t))
              c[r.log2(t.length)].push(t);
          else {
              if ("[object ArrayBuffer]" !== Object.prototype.toString.call(t) && (t = t.buffer),
              !t)
                  return;
              var e = t.length || t.byteLength
                , i = 0 | r.log2(e);
              u[i].push(t)
          }
      }
      ,
      e.freeUint8 = e.freeUint16 = e.freeUint32 = e.freeBigUint64 = e.freeInt8 = e.freeInt16 = e.freeInt32 = e.freeBigInt64 = e.freeFloat32 = e.freeFloat = e.freeFloat64 = e.freeDouble = e.freeUint8Clamped = e.freeDataView = function(t) {
          d(t.buffer)
      }
      ,
      e.freeArrayBuffer = d,
      e.freeBuffer = function(t) {
          c[r.log2(t.length)].push(t)
      }
      ,
      e.malloc = function(t, e) {
          if (void 0 === e || "arraybuffer" === e)
              return f(t);
          switch (e) {
          case "uint8":
              return p(t);
          case "uint16":
              return m(t);
          case "uint32":
              return g(t);
          case "int8":
              return _(t);
          case "int16":
              return y(t);
          case "int32":
              return v(t);
          case "float":
          case "float32":
              return b(t);
          case "double":
          case "float64":
              return E(t);
          case "uint8_clamped":
              return w(t);
          case "bigint64":
              return A(t);
          case "biguint64":
              return x(t);
          case "buffer":
              return S(t);
          case "data":
          case "dataview":
              return T(t);
          default:
              return null
          }
          return null
      }
      ,
      e.mallocArrayBuffer = f,
      e.mallocUint8 = p,
      e.mallocUint16 = m,
      e.mallocUint32 = g,
      e.mallocInt8 = _,
      e.mallocInt16 = y,
      e.mallocInt32 = v,
      e.mallocFloat32 = e.mallocFloat = b,
      e.mallocFloat64 = e.mallocDouble = E,
      e.mallocUint8Clamped = w,
      e.mallocBigUint64 = x,
      e.mallocBigInt64 = A,
      e.mallocDataView = T,
      e.mallocBuffer = S,
      e.clearCache = function() {
          for (var t = 0; t < 32; ++t)
              l.UINT8[t].length = 0,
              l.UINT16[t].length = 0,
              l.UINT32[t].length = 0,
              l.INT8[t].length = 0,
              l.INT16[t].length = 0,
              l.INT32[t].length = 0,
              l.FLOAT[t].length = 0,
              l.DOUBLE[t].length = 0,
              l.BIGUINT64[t].length = 0,
              l.BIGINT64[t].length = 0,
              l.UINT8C[t].length = 0,
              u[t].length = 0,
              c[t].length = 0
      }
  }
  ).call(this, i(105))
}
, function(t, e) {
  var i;
  i = function() {
      return this
  }();
  try {
      i = i || new Function("return this")()
  } catch (t) {
      "object" == typeof window && (i = window)
  }
  t.exports = i
}
, function(t, e, i) {
  "use strict";
  function r(t, e, i) {
      var s = 0 | t[i];
      if (s <= 0)
          return [];
      var n, a = new Array(s);
      if (i === t.length - 1)
          for (n = 0; n < s; ++n)
              a[n] = e;
      else
          for (n = 0; n < s; ++n)
              a[n] = r(t, e, i + 1);
      return a
  }
  t.exports = function(t, e) {
      switch (void 0 === e && (e = 0),
      typeof t) {
      case "number":
          if (t > 0)
              return function(t, e) {
                  var i, r;
                  for (i = new Array(t),
                  r = 0; r < t; ++r)
                      i[r] = e;
                  return i
              }(0 | t, e);
          break;
      case "object":
          if ("number" == typeof t.length)
              return r(t, e, 0)
      }
      return []
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(190)
    , s = {
      body: "",
      args: [],
      thisVars: [],
      localVars: []
  };
  function n(t) {
      if (!t)
          return s;
      for (var e = 0; e < t.args.length; ++e) {
          var i = t.args[e];
          t.args[e] = 0 === e ? {
              name: i,
              lvalue: !0,
              rvalue: !!t.rvalue,
              count: t.count || 1
          } : {
              name: i,
              lvalue: !1,
              rvalue: !0,
              count: 1
          }
      }
      return t.thisVars || (t.thisVars = []),
      t.localVars || (t.localVars = []),
      t
  }
  function a(t) {
      for (var e = [], i = 0; i < t.args.length; ++i)
          e.push("a" + i);
      return new Function("P",["return function ", t.funcName, "_ndarrayops(", e.join(","), ") {P(", e.join(","), ");return a0}"].join(""))(function(t) {
          return r({
              args: t.args,
              pre: n(t.pre),
              body: n(t.body),
              post: n(t.proc),
              funcName: t.funcName
          })
      }(t))
  }
  var o = {
      add: "+",
      sub: "-",
      mul: "*",
      div: "/",
      mod: "%",
      band: "&",
      bor: "|",
      bxor: "^",
      lshift: "<<",
      rshift: ">>",
      rrshift: ">>>"
  };
  !function() {
      for (var t in o) {
          var i = o[t];
          e[t] = a({
              args: ["array", "array", "array"],
              body: {
                  args: ["a", "b", "c"],
                  body: "a=b" + i + "c"
              },
              funcName: t
          }),
          e[t + "eq"] = a({
              args: ["array", "array"],
              body: {
                  args: ["a", "b"],
                  body: "a" + i + "=b"
              },
              rvalue: !0,
              funcName: t + "eq"
          }),
          e[t + "s"] = a({
              args: ["array", "array", "scalar"],
              body: {
                  args: ["a", "b", "s"],
                  body: "a=b" + i + "s"
              },
              funcName: t + "s"
          }),
          e[t + "seq"] = a({
              args: ["array", "scalar"],
              body: {
                  args: ["a", "s"],
                  body: "a" + i + "=s"
              },
              rvalue: !0,
              funcName: t + "seq"
          })
      }
  }();
  var h = {
      not: "!",
      bnot: "~",
      neg: "-",
      recip: "1.0/"
  };
  !function() {
      for (var t in h) {
          var i = h[t];
          e[t] = a({
              args: ["array", "array"],
              body: {
                  args: ["a", "b"],
                  body: "a=" + i + "b"
              },
              funcName: t
          }),
          e[t + "eq"] = a({
              args: ["array"],
              body: {
                  args: ["a"],
                  body: "a=" + i + "a"
              },
              rvalue: !0,
              count: 2,
              funcName: t + "eq"
          })
      }
  }();
  var l = {
      and: "&&",
      or: "||",
      eq: "===",
      neq: "!==",
      lt: "<",
      gt: ">",
      leq: "<=",
      geq: ">="
  };
  !function() {
      for (var t in l) {
          var i = l[t];
          e[t] = a({
              args: ["array", "array", "array"],
              body: {
                  args: ["a", "b", "c"],
                  body: "a=b" + i + "c"
              },
              funcName: t
          }),
          e[t + "s"] = a({
              args: ["array", "array", "scalar"],
              body: {
                  args: ["a", "b", "s"],
                  body: "a=b" + i + "s"
              },
              funcName: t + "s"
          }),
          e[t + "eq"] = a({
              args: ["array", "array"],
              body: {
                  args: ["a", "b"],
                  body: "a=a" + i + "b"
              },
              rvalue: !0,
              count: 2,
              funcName: t + "eq"
          }),
          e[t + "seq"] = a({
              args: ["array", "scalar"],
              body: {
                  args: ["a", "s"],
                  body: "a=a" + i + "s"
              },
              rvalue: !0,
              count: 2,
              funcName: t + "seq"
          })
      }
  }();
  var u = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan"];
  !function() {
      for (var t = 0; t < u.length; ++t) {
          var i = u[t];
          e[i] = a({
              args: ["array", "array"],
              pre: {
                  args: [],
                  body: "this_f=Math." + i,
                  thisVars: ["this_f"]
              },
              body: {
                  args: ["a", "b"],
                  body: "a=this_f(b)",
                  thisVars: ["this_f"]
              },
              funcName: i
          }),
          e[i + "eq"] = a({
              args: ["array"],
              pre: {
                  args: [],
                  body: "this_f=Math." + i,
                  thisVars: ["this_f"]
              },
              body: {
                  args: ["a"],
                  body: "a=this_f(a)",
                  thisVars: ["this_f"]
              },
              rvalue: !0,
              count: 2,
              funcName: i + "eq"
          })
      }
  }();
  var c = ["max", "min", "atan2", "pow"];
  !function() {
      for (var t = 0; t < c.length; ++t) {
          var i = c[t];
          e[i] = a({
              args: ["array", "array", "array"],
              pre: {
                  args: [],
                  body: "this_f=Math." + i,
                  thisVars: ["this_f"]
              },
              body: {
                  args: ["a", "b", "c"],
                  body: "a=this_f(b,c)",
                  thisVars: ["this_f"]
              },
              funcName: i
          }),
          e[i + "s"] = a({
              args: ["array", "array", "scalar"],
              pre: {
                  args: [],
                  body: "this_f=Math." + i,
                  thisVars: ["this_f"]
              },
              body: {
                  args: ["a", "b", "c"],
                  body: "a=this_f(b,c)",
                  thisVars: ["this_f"]
              },
              funcName: i + "s"
          }),
          e[i + "eq"] = a({
              args: ["array", "array"],
              pre: {
                  args: [],
                  body: "this_f=Math." + i,
                  thisVars: ["this_f"]
              },
              body: {
                  args: ["a", "b"],
                  body: "a=this_f(a,b)",
                  thisVars: ["this_f"]
              },
              rvalue: !0,
              count: 2,
              funcName: i + "eq"
          }),
          e[i + "seq"] = a({
              args: ["array", "scalar"],
              pre: {
                  args: [],
                  body: "this_f=Math." + i,
                  thisVars: ["this_f"]
              },
              body: {
                  args: ["a", "b"],
                  body: "a=this_f(a,b)",
                  thisVars: ["this_f"]
              },
              rvalue: !0,
              count: 2,
              funcName: i + "seq"
          })
      }
  }();
  var d = ["atan2", "pow"];
  !function() {
      for (var t = 0; t < d.length; ++t) {
          var i = d[t];
          e[i + "op"] = a({
              args: ["array", "array", "array"],
              pre: {
                  args: [],
                  body: "this_f=Math." + i,
                  thisVars: ["this_f"]
              },
              body: {
                  args: ["a", "b", "c"],
                  body: "a=this_f(c,b)",
                  thisVars: ["this_f"]
              },
              funcName: i + "op"
          }),
          e[i + "ops"] = a({
              args: ["array", "array", "scalar"],
              pre: {
                  args: [],
                  body: "this_f=Math." + i,
                  thisVars: ["this_f"]
              },
              body: {
                  args: ["a", "b", "c"],
                  body: "a=this_f(c,b)",
                  thisVars: ["this_f"]
              },
              funcName: i + "ops"
          }),
          e[i + "opeq"] = a({
              args: ["array", "array"],
              pre: {
                  args: [],
                  body: "this_f=Math." + i,
                  thisVars: ["this_f"]
              },
              body: {
                  args: ["a", "b"],
                  body: "a=this_f(b,a)",
                  thisVars: ["this_f"]
              },
              rvalue: !0,
              count: 2,
              funcName: i + "opeq"
          }),
          e[i + "opseq"] = a({
              args: ["array", "scalar"],
              pre: {
                  args: [],
                  body: "this_f=Math." + i,
                  thisVars: ["this_f"]
              },
              body: {
                  args: ["a", "b"],
                  body: "a=this_f(b,a)",
                  thisVars: ["this_f"]
              },
              rvalue: !0,
              count: 2,
              funcName: i + "opseq"
          })
      }
  }(),
  e.any = r({
      args: ["array"],
      pre: s,
      body: {
          args: [{
              name: "a",
              lvalue: !1,
              rvalue: !0,
              count: 1
          }],
          body: "if(a){return true}",
          localVars: [],
          thisVars: []
      },
      post: {
          args: [],
          localVars: [],
          thisVars: [],
          body: "return false"
      },
      funcName: "any"
  }),
  e.all = r({
      args: ["array"],
      pre: s,
      body: {
          args: [{
              name: "x",
              lvalue: !1,
              rvalue: !0,
              count: 1
          }],
          body: "if(!x){return false}",
          localVars: [],
          thisVars: []
      },
      post: {
          args: [],
          localVars: [],
          thisVars: [],
          body: "return true"
      },
      funcName: "all"
  }),
  e.sum = r({
      args: ["array"],
      pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=0"
      },
      body: {
          args: [{
              name: "a",
              lvalue: !1,
              rvalue: !0,
              count: 1
          }],
          body: "this_s+=a",
          localVars: [],
          thisVars: ["this_s"]
      },
      post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return this_s"
      },
      funcName: "sum"
  }),
  e.prod = r({
      args: ["array"],
      pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=1"
      },
      body: {
          args: [{
              name: "a",
              lvalue: !1,
              rvalue: !0,
              count: 1
          }],
          body: "this_s*=a",
          localVars: [],
          thisVars: ["this_s"]
      },
      post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return this_s"
      },
      funcName: "prod"
  }),
  e.norm2squared = r({
      args: ["array"],
      pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=0"
      },
      body: {
          args: [{
              name: "a",
              lvalue: !1,
              rvalue: !0,
              count: 2
          }],
          body: "this_s+=a*a",
          localVars: [],
          thisVars: ["this_s"]
      },
      post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return this_s"
      },
      funcName: "norm2squared"
  }),
  e.norm2 = r({
      args: ["array"],
      pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=0"
      },
      body: {
          args: [{
              name: "a",
              lvalue: !1,
              rvalue: !0,
              count: 2
          }],
          body: "this_s+=a*a",
          localVars: [],
          thisVars: ["this_s"]
      },
      post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return Math.sqrt(this_s)"
      },
      funcName: "norm2"
  }),
  e.norminf = r({
      args: ["array"],
      pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=0"
      },
      body: {
          args: [{
              name: "a",
              lvalue: !1,
              rvalue: !0,
              count: 4
          }],
          body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
          localVars: [],
          thisVars: ["this_s"]
      },
      post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return this_s"
      },
      funcName: "norminf"
  }),
  e.norm1 = r({
      args: ["array"],
      pre: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "this_s=0"
      },
      body: {
          args: [{
              name: "a",
              lvalue: !1,
              rvalue: !0,
              count: 3
          }],
          body: "this_s+=a<0?-a:a",
          localVars: [],
          thisVars: ["this_s"]
      },
      post: {
          args: [],
          localVars: [],
          thisVars: ["this_s"],
          body: "return this_s"
      },
      funcName: "norm1"
  }),
  e.sup = r({
      args: ["array"],
      pre: {
          body: "this_h=-Infinity",
          args: [],
          thisVars: ["this_h"],
          localVars: []
      },
      body: {
          body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
          args: [{
              name: "_inline_1_arg0_",
              lvalue: !1,
              rvalue: !0,
              count: 2
          }],
          thisVars: ["this_h"],
          localVars: []
      },
      post: {
          body: "return this_h",
          args: [],
          thisVars: ["this_h"],
          localVars: []
      }
  }),
  e.inf = r({
      args: ["array"],
      pre: {
          body: "this_h=Infinity",
          args: [],
          thisVars: ["this_h"],
          localVars: []
      },
      body: {
          body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
          args: [{
              name: "_inline_1_arg0_",
              lvalue: !1,
              rvalue: !0,
              count: 2
          }],
          thisVars: ["this_h"],
          localVars: []
      },
      post: {
          body: "return this_h",
          args: [],
          thisVars: ["this_h"],
          localVars: []
      }
  }),
  e.argmin = r({
      args: ["index", "array", "shape"],
      pre: {
          body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
          args: [{
              name: "_inline_0_arg0_",
              lvalue: !1,
              rvalue: !1,
              count: 0
          }, {
              name: "_inline_0_arg1_",
              lvalue: !1,
              rvalue: !1,
              count: 0
          }, {
              name: "_inline_0_arg2_",
              lvalue: !1,
              rvalue: !0,
              count: 1
          }],
          thisVars: ["this_i", "this_v"],
          localVars: []
      },
      body: {
          body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
          args: [{
              name: "_inline_1_arg0_",
              lvalue: !1,
              rvalue: !0,
              count: 2
          }, {
              name: "_inline_1_arg1_",
              lvalue: !1,
              rvalue: !0,
              count: 2
          }],
          thisVars: ["this_i", "this_v"],
          localVars: ["_inline_1_k"]
      },
      post: {
          body: "{return this_i}",
          args: [],
          thisVars: ["this_i"],
          localVars: []
      }
  }),
  e.argmax = r({
      args: ["index", "array", "shape"],
      pre: {
          body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
          args: [{
              name: "_inline_0_arg0_",
              lvalue: !1,
              rvalue: !1,
              count: 0
          }, {
              name: "_inline_0_arg1_",
              lvalue: !1,
              rvalue: !1,
              count: 0
          }, {
              name: "_inline_0_arg2_",
              lvalue: !1,
              rvalue: !0,
              count: 1
          }],
          thisVars: ["this_i", "this_v"],
          localVars: []
      },
      body: {
          body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
          args: [{
              name: "_inline_1_arg0_",
              lvalue: !1,
              rvalue: !0,
              count: 2
          }, {
              name: "_inline_1_arg1_",
              lvalue: !1,
              rvalue: !0,
              count: 2
          }],
          thisVars: ["this_i", "this_v"],
          localVars: ["_inline_1_k"]
      },
      post: {
          body: "{return this_i}",
          args: [],
          thisVars: ["this_i"],
          localVars: []
      }
  }),
  e.random = a({
      args: ["array"],
      pre: {
          args: [],
          body: "this_f=Math.random",
          thisVars: ["this_f"]
      },
      body: {
          args: ["a"],
          body: "a=this_f()",
          thisVars: ["this_f"]
      },
      funcName: "random"
  }),
  e.assign = a({
      args: ["array", "array"],
      body: {
          args: ["a", "b"],
          body: "a=b"
      },
      funcName: "assign"
  }),
  e.assigns = a({
      args: ["array", "scalar"],
      body: {
          args: ["a", "b"],
          body: "a=b"
      },
      funcName: "assigns"
  }),
  e.equals = r({
      args: ["array", "array"],
      pre: s,
      body: {
          args: [{
              name: "x",
              lvalue: !1,
              rvalue: !0,
              count: 1
          }, {
              name: "y",
              lvalue: !1,
              rvalue: !0,
              count: 1
          }],
          body: "if(x!==y){return false}",
          localVars: [],
          thisVars: []
      },
      post: {
          args: [],
          localVars: [],
          thisVars: [],
          body: "return true"
      },
      funcName: "equals"
  })
}
, function(t, e, i) {
  var r = i(194)
    , s = i(195)
    , n = "undefined" != typeof Float64Array;
  function a(t, e) {
      return t[0] - e[0]
  }
  function o() {
      var t, e = this.stride, i = new Array(e.length);
      for (t = 0; t < i.length; ++t)
          i[t] = [Math.abs(e[t]), t];
      i.sort(a);
      var r = new Array(i.length);
      for (t = 0; t < r.length; ++t)
          r[t] = i[t][1];
      return r
  }
  function h(t, e) {
      var i = ["View", e, "d", t].join("");
      e < 0 && (i = "View_Nil" + t);
      var s = "generic" === t;
      if (-1 === e) {
          var n = "function " + i + "(a){this.data=a;};var proto=" + i + ".prototype;proto.dtype='" + t + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + i + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + i + "(a){return new " + i + "(a);}";
          return new Function(n)()
      }
      if (0 === e) {
          n = "function " + i + "(a,d) {this.data = a;this.offset = d};var proto=" + i + ".prototype;proto.dtype='" + t + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + i + "_copy() {return new " + i + "(this.data,this.offset)};proto.pick=function " + i + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + i + "_get(){return " + (s ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + i + "_set(v){return " + (s ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + i + "(a,b,c,d){return new " + i + "(a,d)}";
          return new Function("TrivialArray",n)(l[t][0])
      }
      n = ["'use strict'"];
      var a = r(e)
        , h = a.map((function(t) {
          return "i" + t
      }
      ))
        , u = "this.offset+" + a.map((function(t) {
          return "this.stride[" + t + "]*i" + t
      }
      )).join("+")
        , c = a.map((function(t) {
          return "b" + t
      }
      )).join(",")
        , d = a.map((function(t) {
          return "c" + t
      }
      )).join(",");
      n.push("function " + i + "(a," + c + "," + d + ",d){this.data=a", "this.shape=[" + c + "]", "this.stride=[" + d + "]", "this.offset=d|0}", "var proto=" + i + ".prototype", "proto.dtype='" + t + "'", "proto.dimension=" + e),
      n.push("Object.defineProperty(proto,'size',{get:function " + i + "_size(){return " + a.map((function(t) {
          return "this.shape[" + t + "]"
      }
      )).join("*"), "}})"),
      1 === e ? n.push("proto.order=[0]") : (n.push("Object.defineProperty(proto,'order',{get:"),
      e < 4 ? (n.push("function " + i + "_order(){"),
      2 === e ? n.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : 3 === e && n.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")) : n.push("ORDER})")),
      n.push("proto.set=function " + i + "_set(" + h.join(",") + ",v){"),
      s ? n.push("return this.data.set(" + u + ",v)}") : n.push("return this.data[" + u + "]=v}"),
      n.push("proto.get=function " + i + "_get(" + h.join(",") + "){"),
      s ? n.push("return this.data.get(" + u + ")}") : n.push("return this.data[" + u + "]}"),
      n.push("proto.index=function " + i + "_index(", h.join(), "){return " + u + "}"),
      n.push("proto.hi=function " + i + "_hi(" + h.join(",") + "){return new " + i + "(this.data," + a.map((function(t) {
          return ["(typeof i", t, "!=='number'||i", t, "<0)?this.shape[", t, "]:i", t, "|0"].join("")
      }
      )).join(",") + "," + a.map((function(t) {
          return "this.stride[" + t + "]"
      }
      )).join(",") + ",this.offset)}");
      var f = a.map((function(t) {
          return "a" + t + "=this.shape[" + t + "]"
      }
      ))
        , p = a.map((function(t) {
          return "c" + t + "=this.stride[" + t + "]"
      }
      ));
      n.push("proto.lo=function " + i + "_lo(" + h.join(",") + "){var b=this.offset,d=0," + f.join(",") + "," + p.join(","));
      for (var m = 0; m < e; ++m)
          n.push("if(typeof i" + m + "==='number'&&i" + m + ">=0){d=i" + m + "|0;b+=c" + m + "*d;a" + m + "-=d}");
      n.push("return new " + i + "(this.data," + a.map((function(t) {
          return "a" + t
      }
      )).join(",") + "," + a.map((function(t) {
          return "c" + t
      }
      )).join(",") + ",b)}"),
      n.push("proto.step=function " + i + "_step(" + h.join(",") + "){var " + a.map((function(t) {
          return "a" + t + "=this.shape[" + t + "]"
      }
      )).join(",") + "," + a.map((function(t) {
          return "b" + t + "=this.stride[" + t + "]"
      }
      )).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
      for (m = 0; m < e; ++m)
          n.push("if(typeof i" + m + "==='number'){d=i" + m + "|0;if(d<0){c+=b" + m + "*(a" + m + "-1);a" + m + "=ceil(-a" + m + "/d)}else{a" + m + "=ceil(a" + m + "/d)}b" + m + "*=d}");
      n.push("return new " + i + "(this.data," + a.map((function(t) {
          return "a" + t
      }
      )).join(",") + "," + a.map((function(t) {
          return "b" + t
      }
      )).join(",") + ",c)}");
      var g = new Array(e)
        , _ = new Array(e);
      for (m = 0; m < e; ++m)
          g[m] = "a[i" + m + "]",
          _[m] = "b[i" + m + "]";
      n.push("proto.transpose=function " + i + "_transpose(" + h + "){" + h.map((function(t, e) {
          return t + "=(" + t + "===undefined?" + e + ":" + t + "|0)"
      }
      )).join(";"), "var a=this.shape,b=this.stride;return new " + i + "(this.data," + g.join(",") + "," + _.join(",") + ",this.offset)}"),
      n.push("proto.pick=function " + i + "_pick(" + h + "){var a=[],b=[],c=this.offset");
      for (m = 0; m < e; ++m)
          n.push("if(typeof i" + m + "==='number'&&i" + m + ">=0){c=(c+this.stride[" + m + "]*i" + m + ")|0}else{a.push(this.shape[" + m + "]);b.push(this.stride[" + m + "])}");
      return n.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),
      n.push("return function construct_" + i + "(data,shape,stride,offset){return new " + i + "(data," + a.map((function(t) {
          return "shape[" + t + "]"
      }
      )).join(",") + "," + a.map((function(t) {
          return "stride[" + t + "]"
      }
      )).join(",") + ",offset)}"),
      new Function("CTOR_LIST","ORDER",n.join("\n"))(l[t], o)
  }
  var l = {
      float32: [],
      float64: [],
      int8: [],
      int16: [],
      int32: [],
      uint8: [],
      uint16: [],
      uint32: [],
      array: [],
      uint8_clamped: [],
      bigint64: [],
      biguint64: [],
      buffer: [],
      generic: []
  };
  t.exports = function(t, e, i, r) {
      if (void 0 === t)
          return (0,
          l.array[0])([]);
      "number" == typeof t && (t = [t]),
      void 0 === e && (e = [t.length]);
      var a = e.length;
      if (void 0 === i) {
          i = new Array(a);
          for (var o = a - 1, u = 1; o >= 0; --o)
              i[o] = u,
              u *= e[o]
      }
      if (void 0 === r) {
          r = 0;
          for (o = 0; o < a; ++o)
              i[o] < 0 && (r -= (e[o] - 1) * i[o])
      }
      for (var c = function(t) {
          if (s(t))
              return "buffer";
          if (n)
              switch (Object.prototype.toString.call(t)) {
              case "[object Float64Array]":
                  return "float64";
              case "[object Float32Array]":
                  return "float32";
              case "[object Int8Array]":
                  return "int8";
              case "[object Int16Array]":
                  return "int16";
              case "[object Int32Array]":
                  return "int32";
              case "[object Uint8Array]":
                  return "uint8";
              case "[object Uint16Array]":
                  return "uint16";
              case "[object Uint32Array]":
                  return "uint32";
              case "[object Uint8ClampedArray]":
                  return "uint8_clamped";
              case "[object BigInt64Array]":
                  return "bigint64";
              case "[object BigUint64Array]":
                  return "biguint64"
              }
          return Array.isArray(t) ? "array" : "generic"
      }(t), d = l[c]; d.length <= a + 1; )
          d.push(h(c, d.length - 1));
      return (0,
      d[a + 1])(t, e, i, r)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t, e, i) {
      e ? e.bind() : t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
      var r = 0 | t.getParameter(t.MAX_VERTEX_ATTRIBS);
      if (i) {
          if (i.length > r)
              throw new Error("gl-vao: Too many vertex attributes");
          for (var s = 0; s < i.length; ++s) {
              var n = i[s];
              if (n.buffer) {
                  var a = n.buffer
                    , o = n.size || 4
                    , h = n.type || t.FLOAT
                    , l = !!n.normalized
                    , u = n.stride || 0
                    , c = n.offset || 0;
                  a.bind(),
                  t.enableVertexAttribArray(s),
                  t.vertexAttribPointer(s, o, h, l, u, c)
              } else {
                  if ("number" == typeof n)
                      t.vertexAttrib1f(s, n);
                  else if (1 === n.length)
                      t.vertexAttrib1f(s, n[0]);
                  else if (2 === n.length)
                      t.vertexAttrib2f(s, n[0], n[1]);
                  else if (3 === n.length)
                      t.vertexAttrib3f(s, n[0], n[1], n[2]);
                  else {
                      if (4 !== n.length)
                          throw new Error("gl-vao: Invalid vertex attribute");
                      t.vertexAttrib4f(s, n[0], n[1], n[2], n[3])
                  }
                  t.disableVertexAttribArray(s)
              }
          }
          for (; s < r; ++s)
              t.disableVertexAttribArray(s)
      } else {
          t.bindBuffer(t.ARRAY_BUFFER, null);
          for (s = 0; s < r; ++s)
              t.disableVertexAttribArray(s)
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t, e) {
      for (var i = {}, r = 0; r < t.length; ++r)
          for (var s = t[r].name.split("."), n = i, a = 0; a < s.length; ++a) {
              var o = s[a].split("[");
              if (o.length > 1) {
                  o[0]in n || (n[o[0]] = []),
                  n = n[o[0]];
                  for (var h = 1; h < o.length; ++h) {
                      var l = parseInt(o[h]);
                      h < o.length - 1 || a < s.length - 1 ? (l in n || (h < o.length - 1 ? n[l] = [] : n[l] = {}),
                      n = n[l]) : n[l] = e ? r : t[r].type
                  }
              } else
                  a < s.length - 1 ? (o[0]in n || (n[o[0]] = {}),
                  n = n[o[0]]) : n[o[0]] = e ? r : t[r].type
          }
      return i
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(108)
    , s = i(107)
    , n = i(104);
  t.exports = function(t) {
      if (arguments.length <= 1)
          throw new Error("gl-texture2d: Missing arguments for texture2d constructor");
      a || l(t);
      if ("number" == typeof arguments[1])
          return _(t, arguments[1], arguments[2], arguments[3] || t.RGBA, arguments[4] || t.UNSIGNED_BYTE);
      if (Array.isArray(arguments[1]))
          return _(t, 0 | arguments[1][0], 0 | arguments[1][1], arguments[2] || t.RGBA, arguments[3] || t.UNSIGNED_BYTE);
      if ("object" == typeof arguments[1]) {
          var e = arguments[1]
            , i = u(e) ? e : e.raw;
          if (i)
              return y(t, i, 0 | e.width, 0 | e.height, arguments[2] || t.RGBA, arguments[3] || t.UNSIGNED_BYTE);
          if (e.shape && e.data && e.stride)
              return v(t, e)
      }
      throw new Error("gl-texture2d: Invalid arguments for texture2d constructor")
  }
  ;
  var a = null
    , o = null
    , h = null;
  function l(t) {
      a = [t.LINEAR, t.NEAREST_MIPMAP_LINEAR, t.LINEAR_MIPMAP_NEAREST, t.LINEAR_MIPMAP_NEAREST],
      o = [t.NEAREST, t.LINEAR, t.NEAREST_MIPMAP_NEAREST, t.NEAREST_MIPMAP_LINEAR, t.LINEAR_MIPMAP_NEAREST, t.LINEAR_MIPMAP_LINEAR],
      h = [t.REPEAT, t.CLAMP_TO_EDGE, t.MIRRORED_REPEAT]
  }
  function u(t) {
      return "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLVideoElement && t instanceof HTMLVideoElement || "undefined" != typeof ImageData && t instanceof ImageData
  }
  var c = function(t, e) {
      s.muls(t, e, 255)
  };
  function d(t, e, i) {
      var r = t.gl
        , s = r.getParameter(r.MAX_TEXTURE_SIZE);
      if (e < 0 || e > s || i < 0 || i > s)
          throw new Error("gl-texture2d: Invalid texture size");
      return t._shape = [e, i],
      t.bind(),
      r.texImage2D(r.TEXTURE_2D, 0, t.format, e, i, 0, t.format, t.type, null),
      t._mipLevels = [0],
      t
  }
  function f(t, e, i, r, s, n) {
      this.gl = t,
      this.handle = e,
      this.format = s,
      this.type = n,
      this._shape = [i, r],
      this._mipLevels = [0],
      this._magFilter = t.NEAREST,
      this._minFilter = t.NEAREST,
      this._wrapS = t.CLAMP_TO_EDGE,
      this._wrapT = t.CLAMP_TO_EDGE,
      this._anisoSamples = 1;
      var a = this
        , o = [this._wrapS, this._wrapT];
      Object.defineProperties(o, [{
          get: function() {
              return a._wrapS
          },
          set: function(t) {
              return a.wrapS = t
          }
      }, {
          get: function() {
              return a._wrapT
          },
          set: function(t) {
              return a.wrapT = t
          }
      }]),
      this._wrapVector = o;
      var h = [this._shape[0], this._shape[1]];
      Object.defineProperties(h, [{
          get: function() {
              return a._shape[0]
          },
          set: function(t) {
              return a.width = t
          }
      }, {
          get: function() {
              return a._shape[1]
          },
          set: function(t) {
              return a.height = t
          }
      }]),
      this._shapeVector = h
  }
  var p = f.prototype;
  function m(t, e) {
      return 3 === t.length ? 1 === e[2] && e[1] === t[0] * t[2] && e[0] === t[2] : 1 === e[0] && e[1] === t[0]
  }
  function g(t) {
      var e = t.createTexture();
      return t.bindTexture(t.TEXTURE_2D, e),
      t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
      t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
      t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
      t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
      e
  }
  function _(t, e, i, r, s) {
      var n = t.getParameter(t.MAX_TEXTURE_SIZE);
      if (e < 0 || e > n || i < 0 || i > n)
          throw new Error("gl-texture2d: Invalid texture shape");
      if (s === t.FLOAT && !t.getExtension("OES_texture_float"))
          throw new Error("gl-texture2d: Floating point textures not supported on this platform");
      var a = g(t);
      return t.texImage2D(t.TEXTURE_2D, 0, r, e, i, 0, r, s, null),
      new f(t,a,e,i,r,s)
  }
  function y(t, e, i, r, s, n) {
      var a = g(t);
      return t.texImage2D(t.TEXTURE_2D, 0, s, s, n, e),
      new f(t,a,i,r,s,n)
  }
  function v(t, e) {
      var i = e.dtype
        , a = e.shape.slice()
        , o = t.getParameter(t.MAX_TEXTURE_SIZE);
      if (a[0] < 0 || a[0] > o || a[1] < 0 || a[1] > o)
          throw new Error("gl-texture2d: Invalid texture size");
      var h = m(a, e.stride.slice())
        , l = 0;
      "float32" === i ? l = t.FLOAT : "float64" === i ? (l = t.FLOAT,
      h = !1,
      i = "float32") : "uint8" === i ? l = t.UNSIGNED_BYTE : (l = t.UNSIGNED_BYTE,
      h = !1,
      i = "uint8");
      var u, d, p = 0;
      if (2 === a.length)
          p = t.LUMINANCE,
          a = [a[0], a[1], 1],
          e = r(e.data, a, [e.stride[0], e.stride[1], 1], e.offset);
      else {
          if (3 !== a.length)
              throw new Error("gl-texture2d: Invalid shape for texture");
          if (1 === a[2])
              p = t.ALPHA;
          else if (2 === a[2])
              p = t.LUMINANCE_ALPHA;
          else if (3 === a[2])
              p = t.RGB;
          else {
              if (4 !== a[2])
                  throw new Error("gl-texture2d: Invalid shape for pixel coords");
              p = t.RGBA
          }
      }
      l !== t.FLOAT || t.getExtension("OES_texture_float") || (l = t.UNSIGNED_BYTE,
      h = !1);
      var _ = e.size;
      if (h)
          u = 0 === e.offset && e.data.length === _ ? e.data : e.data.subarray(e.offset, e.offset + _);
      else {
          var y = [a[2], a[2] * a[0], 1];
          d = n.malloc(_, i);
          var v = r(d, a, y, 0);
          "float32" !== i && "float64" !== i || l !== t.UNSIGNED_BYTE ? s.assign(v, e) : c(v, e),
          u = d.subarray(0, _)
      }
      var b = g(t);
      return t.texImage2D(t.TEXTURE_2D, 0, p, a[0], a[1], 0, p, l, u),
      h || n.free(d),
      new f(t,b,a[0],a[1],p,l)
  }
  Object.defineProperties(p, {
      minFilter: {
          get: function() {
              return this._minFilter
          },
          set: function(t) {
              this.bind();
              var e = this.gl;
              if (this.type === e.FLOAT && a.indexOf(t) >= 0 && (e.getExtension("OES_texture_float_linear") || (t = e.NEAREST)),
              o.indexOf(t) < 0)
                  throw new Error("gl-texture2d: Unknown filter mode " + t);
              return e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t),
              this._minFilter = t
          }
      },
      magFilter: {
          get: function() {
              return this._magFilter
          },
          set: function(t) {
              this.bind();
              var e = this.gl;
              if (this.type === e.FLOAT && a.indexOf(t) >= 0 && (e.getExtension("OES_texture_float_linear") || (t = e.NEAREST)),
              o.indexOf(t) < 0)
                  throw new Error("gl-texture2d: Unknown filter mode " + t);
              return e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, t),
              this._magFilter = t
          }
      },
      mipSamples: {
          get: function() {
              return this._anisoSamples
          },
          set: function(t) {
              var e = this._anisoSamples;
              if (this._anisoSamples = 0 | Math.max(t, 1),
              e !== this._anisoSamples) {
                  var i = this.gl.getExtension("EXT_texture_filter_anisotropic");
                  i && this.gl.texParameterf(this.gl.TEXTURE_2D, i.TEXTURE_MAX_ANISOTROPY_EXT, this._anisoSamples)
              }
              return this._anisoSamples
          }
      },
      wrapS: {
          get: function() {
              return this._wrapS
          },
          set: function(t) {
              if (this.bind(),
              h.indexOf(t) < 0)
                  throw new Error("gl-texture2d: Unknown wrap mode " + t);
              return this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, t),
              this._wrapS = t
          }
      },
      wrapT: {
          get: function() {
              return this._wrapT
          },
          set: function(t) {
              if (this.bind(),
              h.indexOf(t) < 0)
                  throw new Error("gl-texture2d: Unknown wrap mode " + t);
              return this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, t),
              this._wrapT = t
          }
      },
      wrap: {
          get: function() {
              return this._wrapVector
          },
          set: function(t) {
              if (Array.isArray(t) || (t = [t, t]),
              2 !== t.length)
                  throw new Error("gl-texture2d: Must specify wrap mode for rows and columns");
              for (var e = 0; e < 2; ++e)
                  if (h.indexOf(t[e]) < 0)
                      throw new Error("gl-texture2d: Unknown wrap mode " + t);
              this._wrapS = t[0],
              this._wrapT = t[1];
              var i = this.gl;
              return this.bind(),
              i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, this._wrapS),
              i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, this._wrapT),
              t
          }
      },
      shape: {
          get: function() {
              return this._shapeVector
          },
          set: function(t) {
              if (Array.isArray(t)) {
                  if (2 !== t.length)
                      throw new Error("gl-texture2d: Invalid texture shape")
              } else
                  t = [0 | t, 0 | t];
              return d(this, 0 | t[0], 0 | t[1]),
              [0 | t[0], 0 | t[1]]
          }
      },
      width: {
          get: function() {
              return this._shape[0]
          },
          set: function(t) {
              return d(this, t |= 0, this._shape[1]),
              t
          }
      },
      height: {
          get: function() {
              return this._shape[1]
          },
          set: function(t) {
              return t |= 0,
              d(this, this._shape[0], t),
              t
          }
      }
  }),
  p.bind = function(t) {
      var e = this.gl;
      return void 0 !== t && e.activeTexture(e.TEXTURE0 + (0 | t)),
      e.bindTexture(e.TEXTURE_2D, this.handle),
      void 0 !== t ? 0 | t : e.getParameter(e.ACTIVE_TEXTURE) - e.TEXTURE0
  }
  ,
  p.dispose = function() {
      this.gl.deleteTexture(this.handle)
  }
  ,
  p.generateMipmap = function() {
      this.bind(),
      this.gl.generateMipmap(this.gl.TEXTURE_2D);
      for (var t = Math.min(this._shape[0], this._shape[1]), e = 0; t > 0; ++e,
      t >>>= 1)
          this._mipLevels.indexOf(e) < 0 && this._mipLevels.push(e)
  }
  ,
  p.setPixels = function(t, e, i, a) {
      var o = this.gl;
      this.bind(),
      Array.isArray(e) ? (a = i,
      i = 0 | e[1],
      e = 0 | e[0]) : (e = e || 0,
      i = i || 0),
      a = a || 0;
      var h = u(t) ? t : t.raw;
      if (h) {
          this._mipLevels.indexOf(a) < 0 ? (o.texImage2D(o.TEXTURE_2D, 0, this.format, this.format, this.type, h),
          this._mipLevels.push(a)) : o.texSubImage2D(o.TEXTURE_2D, a, e, i, this.format, this.type, h)
      } else {
          if (!(t.shape && t.stride && t.data))
              throw new Error("gl-texture2d: Unsupported data type");
          if (t.shape.length < 2 || e + t.shape[1] > this._shape[1] >>> a || i + t.shape[0] > this._shape[0] >>> a || e < 0 || i < 0)
              throw new Error("gl-texture2d: Texture dimensions are out of bounds");
          !function(t, e, i, a, o, h, l, u) {
              var d = u.dtype
                , f = u.shape.slice();
              if (f.length < 2 || f.length > 3)
                  throw new Error("gl-texture2d: Invalid ndarray, must be 2d or 3d");
              var p = 0
                , g = 0
                , _ = m(f, u.stride.slice());
              "float32" === d ? p = t.FLOAT : "float64" === d ? (p = t.FLOAT,
              _ = !1,
              d = "float32") : "uint8" === d ? p = t.UNSIGNED_BYTE : (p = t.UNSIGNED_BYTE,
              _ = !1,
              d = "uint8");
              if (2 === f.length)
                  g = t.LUMINANCE,
                  f = [f[0], f[1], 1],
                  u = r(u.data, f, [u.stride[0], u.stride[1], 1], u.offset);
              else {
                  if (3 !== f.length)
                      throw new Error("gl-texture2d: Invalid shape for texture");
                  if (1 === f[2])
                      g = t.ALPHA;
                  else if (2 === f[2])
                      g = t.LUMINANCE_ALPHA;
                  else if (3 === f[2])
                      g = t.RGB;
                  else {
                      if (4 !== f[2])
                          throw new Error("gl-texture2d: Invalid shape for pixel coords");
                      g = t.RGBA
                  }
                  f[2]
              }
              g !== t.LUMINANCE && g !== t.ALPHA || o !== t.LUMINANCE && o !== t.ALPHA || (g = o);
              if (g !== o)
                  throw new Error("gl-texture2d: Incompatible texture format for setPixels");
              var y = u.size
                , v = l.indexOf(a) < 0;
              v && l.push(a);
              if (p === h && _)
                  0 === u.offset && u.data.length === y ? v ? t.texImage2D(t.TEXTURE_2D, a, o, f[0], f[1], 0, o, h, u.data) : t.texSubImage2D(t.TEXTURE_2D, a, e, i, f[0], f[1], o, h, u.data) : v ? t.texImage2D(t.TEXTURE_2D, a, o, f[0], f[1], 0, o, h, u.data.subarray(u.offset, u.offset + y)) : t.texSubImage2D(t.TEXTURE_2D, a, e, i, f[0], f[1], o, h, u.data.subarray(u.offset, u.offset + y));
              else {
                  var b;
                  b = h === t.FLOAT ? n.mallocFloat32(y) : n.mallocUint8(y);
                  var E = r(b, f, [f[2], f[2] * f[0], 1]);
                  p === t.FLOAT && h === t.UNSIGNED_BYTE ? c(E, u) : s.assign(E, u),
                  v ? t.texImage2D(t.TEXTURE_2D, a, o, f[0], f[1], 0, o, h, b.subarray(0, y)) : t.texSubImage2D(t.TEXTURE_2D, a, e, i, f[0], f[1], o, h, b.subarray(0, y)),
                  h === t.FLOAT ? n.freeFloat32(b) : n.freeUint8(b)
              }
          }(o, e, i, a, this.format, this.type, this._mipLevels, t)
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      clone: i(113),
      create: i(208),
      defaults: i(82),
      extend: i(83),
      getPrototypeOf: i(209),
      isDate: i(210),
      isEmpty: i(211),
      isRegExp: i(212),
      toQueryParameters: i(213)
  }
}
, function(t, e, i) {
  "use strict";
  i(207);
  var r = i(83)
    , s = Object.prototype.hasOwnProperty
    , n = function(t, e) {
      var i;
      for (i in e)
          s.call(e, i) && (null === e[i] ? t[i] = null : "object" == typeof e[i] ? (t[i] = Array.isArray(e[i]) ? [] : {},
          n(t[i], e[i])) : t[i] = e[i]);
      return t
  };
  t.exports = function(t, e) {
      return e ? n({}, t) : r({}, t)
  }
}
, function(t, e, i) {
  "use strict";
  i(238);
  var r = i(115)
    , s = i(240)
    , n = "querySelectorAll"in document;
  t.exports = function(t, e) {
      return e = e || document,
      r.parentNode(e, !0, "querySelectorAll", "context"),
      r.selector(t, !0, "querySelectorAll"),
      n ? Array.prototype.slice.call(e.querySelectorAll(t)) : s(t, e)
  }
}
, function(t, e, i) {
  "use strict";
  i(116);
  var r = i(117)
    , s = i(118)
    , n = i(86)
    , a = i(239)
    , o = i(87)
    , h = i(119)
    , l = function(t, e) {
      return !!r(t) && ("number" == typeof e ? t.nodeType === e : -1 !== e.indexOf(t.nodeType))
  }
    , u = [o, a, n]
    , c = [o, h, s];
  t.exports = {
      parentNode: function(t, e, i, r) {
          if (r = r || "node",
          (t || e) && !l(t, u))
              throw new TypeError(i + ": " + r + " must be an Element, Document, or Document Fragment")
      },
      childNode: function(t, e, i, r) {
          if (r = r || "node",
          (t || e) && !l(t, c))
              throw new TypeError(i + ": " + r + " must be an Element, TextNode, or Comment")
      },
      selector: function(t, e, i, r) {
          if (r = r || "selector",
          (t || e) && "string" != typeof t)
              throw new TypeError(i + ": " + r + " must be a string")
      }
  }
}
, function(t, e) {}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return !(!t || !t.nodeType)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = 8
}
, function(t, e, i) {
  "use strict";
  t.exports = 3
}
, function(t, e, i) {
  "use strict";
  var r = i(88)
    , s = i(87);
  t.exports = function(t) {
      return r(t, s)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      Viewport: i(247)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = i(36)("log")
}
, , , , , , , , , , , , , , , , , , , , , , function(t, e, i) {
  t.exports = i(145)
}
, function(t, e, i) {
  "use strict";
  var r = i(0)(i(96));
  const s = i(146)
    , n = i(97)
    , a = i(56)
    , o = i(20).PictureLazyLoading
    , h = i(57)
    , l = i(2)
    , u = i(78);
  t.exports = function() {
      Object.assign(n, {
          MQDetector: i(148),
          FocusManager: i(149),
          Sequence: i(150),
          Hero: i(151),
          ValueProps: i(155),
          ValuePropsVideo: i(156),
          H2ChipVideo: i(173),
          MagicalExperience: i(174),
          WaveAnimation: i(175),
          Xray: i(268),
          XrayParticleVideo: i(269),
          ANCmicrophones: i(270),
          TouchControlSwipe: i(271),
          EarTips: i(272),
          PersonalizedListening: i(273),
          VideoScroll: i(275),
          CaseBattery: i(276),
          MusicRouter: i(277)
      }),
      a.detect();
      const t = document.querySelector(".main");
      t.setAttribute("data-component-list", "MQDetector FocusManager");
      const e = new s(t,{
          anim: h
      });
      e.anim.on(l.EVENTS.ON_DOM_GROUPS_CREATED, (()=>{
          new o,
          new u;
          const t = (0,
          r.default)((()=>e.anim.forceUpdate()));
          window.addEventListener("resize:text-zoom", t),
          window.addEventListener("no-autoplay", t),
          setTimeout((()=>{
              try {
                  document.querySelectorAll(".modal").forEach((t=>t.classList.add("theme-dark")))
              } catch (t) {}
          }
          ), 100)
      }
      ))
  }()
}
, function(t, e, i) {
  "use strict";
  const r = i(4).EventEmitterMicro
    , s = i(147)
    , n = i(97)
    , a = {};
  class o extends r {
      constructor(t) {
          let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if (!e.anim)
              throw "Anim is no longer bundled with BubbleGum. Please pass Anim when initialize BubbleGum: `new BubbleGum(document.querySelector('main'), {anim: AnimSystem})`";
          super(),
          this.el = t,
          this.anim = e.anim,
          this.componentAttribute = e.attribute || "data-component-list",
          this.components = [],
          this.componentsInitialized = !1,
          this.el.getAttribute("data-anim-scroll-group") || this.el.setAttribute("data-anim-scroll-group", "bubble-gum-group"),
          s.add((()=>{
              this.anim.initialize().then((()=>{
                  this.initComponents(),
                  this.setupEvents(),
                  this.components.forEach((t=>t.mounted())),
                  this.trigger(o.EVENTS.DOM_COMPONENTS_MOUNTED)
              }
              ))
          }
          ))
      }
      initComponents() {
          const t = Array.prototype.slice.call(this.el.querySelectorAll(`[${this.componentAttribute}]`));
          this.el.hasAttribute(this.componentAttribute) && t.push(this.el);
          for (let e = 0; e < t.length; e++) {
              let i = t[e]
                , r = i.getAttribute(this.componentAttribute).split(" ");
              for (let t = 0, e = r.length; t < e; t++) {
                  let e = r[t];
                  "" !== e && " " !== e && this.addComponent({
                      el: i,
                      componentName: e
                  })
              }
          }
          this.componentsInitialized = !0
      }
      setupEvents() {
          this.onResizeDebounced = this.onResizeDebounced.bind(this),
          this.onResizeImmediate = this.onResizeImmediate.bind(this),
          this.onBreakpointChange = this.onBreakpointChange.bind(this),
          this.anim.on(this.anim.model.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate),
          this.anim.on(this.anim.model.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced),
          this.anim.on(this.anim.model.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange)
      }
      addComponent(t) {
          const {el: e, componentName: i, data: r} = t;
          if (!n.hasOwnProperty(i))
              throw "BubbleGum::addComponent could not add component to '" + e.className + "'. No component type '" + i + "' found!";
          const s = n[i];
          if (!o.componentIsSupported(s, i))
              return void 0 === a[i] && (console.log("BubbleGum::addComponent unsupported component '" + i + "'. Reason: '" + i + ".IS_SUPPORTED' returned false"),
              a[i] = !0),
              null;
          let h = e.dataset.componentList || "";
          h.includes(i) || (e.dataset.componentList = h.split(" ").concat(i).join(" "));
          let l = new s({
              el: e,
              data: r,
              componentName: t.componentName,
              gum: this,
              pageMetrics: this.anim.model.pageMetrics
          });
          return this.components.push(l),
          this.componentsInitialized && l.mounted(),
          l
      }
      removeComponent(t) {
          const e = this.components.indexOf(t);
          -1 !== e && (this.components.splice(e, 1),
          t.el.dataset.componentList = t.el.dataset.componentList.split(" ").filter((e=>e !== t.componentName)).join(" "),
          t.destroy())
      }
      getComponentOfType(t) {
          let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.documentElement;
          const i = `[${this.componentAttribute}*=${t}]`
            , r = e.matches(i) ? e : e.querySelector(i);
          return r ? this.components.find((e=>e instanceof n[t] && e.el === r)) : null
      }
      getComponentsOfType(t) {
          let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.documentElement;
          const i = `[${this.componentAttribute}*=${t}]`
            , r = e.matches(i) ? [e] : Array.from(e.querySelectorAll(i));
          return this.components.filter((e=>e instanceof n[t] && r.includes(e.el)))
      }
      getComponentsForElement(t) {
          return this.components.filter((e=>e.el === t))
      }
      onResizeImmediate() {
          this.components.forEach((t=>t.onResizeImmediate(this.anim.model.pageMetrics)))
      }
      onResizeDebounced() {
          this.components.forEach((t=>t.onResizeDebounced(this.anim.model.pageMetrics)))
      }
      onBreakpointChange() {
          this.components.forEach((t=>t.onBreakpointChange(this.anim.model.pageMetrics)))
      }
      static componentIsSupported(t, e) {
          const i = t.IS_SUPPORTED;
          if (void 0 === i)
              return !0;
          if ("function" != typeof i)
              return console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'),
              !0;
          const r = t.IS_SUPPORTED();
          return void 0 === r ? (console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'),
          !0) : r
      }
  }
  o.EVENTS = {
      DOM_COMPONENTS_MOUNTED: "DOM_COMPONENTS_MOUNTED"
  },
  t.exports = o
}
, function(t, e, i) {
  "use strict";
  let r = !1
    , s = !1
    , n = []
    , a = -1;
  t.exports = {
      NUMBER_OF_FRAMES_TO_WAIT: 30,
      add: function(t) {
          if (s && t(),
          n.push(t),
          r)
              return;
          r = !0;
          let e = document.documentElement.scrollHeight
            , i = 0;
          const o = ()=>{
              let t = document.documentElement.scrollHeight;
              if (e !== t)
                  i = 0;
              else if (i++,
              i >= this.NUMBER_OF_FRAMES_TO_WAIT)
                  return void n.forEach((t=>t()));
              e = t,
              a = requestAnimationFrame(o)
          }
          ;
          a = requestAnimationFrame(o)
      },
      reset() {
          cancelAnimationFrame(a),
          r = !1,
          s = !1,
          n = []
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(3)
    , s = [{
      name: "portrait",
      mq: "only screen and (orientation: portrait)"
  }, {
      name: "small-shortest",
      mq: "only screen and (max-width: 734px)  and (max-height: 547px)"
  }, {
      name: "small-shorter",
      mq: "only screen and (max-width: 734px)  and (max-height: 620px)"
  }, {
      name: "small-short",
      mq: "only screen and (max-width: 734px)  and (max-height: 650px)"
  }, {
      name: "medium-shorter",
      mq: "only screen and (min-width: 735px)  and (max-width: 1068px) and (max-height: 465px)"
  }, {
      name: "medium-short",
      mq: "only screen and (min-width: 735px)  and (max-width: 1068px) and (max-height: 750px)"
  }, {
      name: "large-short",
      mq: "only screen and (min-width: 1069px) and (max-width: 1440px) and (max-height: 45vw)"
  }, {
      name: "large-up-shorter",
      mq: "only screen and (min-width: 1069px) and (max-height: 850px)"
  }, {
      name: "xlarge-short",
      mq: "only screen and (min-width: 1441px) and (max-height: 40vw)"
  }];
  t.exports = class extends r {
      constructor(t) {
          super(t);
          let e = this.el.dataset.mediaQueries;
          e = e ? JSON.parse(e) : null;
          let i = t.data;
          i = i && t.data.mediaQueries ? t.data.mediaQueries : null,
          this.mediaQueries = (e || i || s).map((t=>{
              const e = window.matchMedia(t.mq)
                , i = new Event(`mq-${t.name}`);
              this.mqHandler(e.matches, t, i);
              const r = e=>this.mqHandler(e.matches, t, i);
              return e.addListener(r),
              {
                  mql: e,
                  event: i,
                  func: r
              }
          }
          )),
          this.instantiated = !0,
          this.anim.forceUpdate()
      }
      mqHandler(t, e, i) {
          document.documentElement.classList.toggle(`mq-${e.name}`, t),
          document.documentElement.classList.toggle(`no-mq-${e.name}`, !t),
          this.instantiated && this.anim.forceUpdate(),
          t && document.documentElement.dispatchEvent(i)
      }
      destroy() {
          this.mediaQueries.forEach((t=>t.mql.removeListener(t.func)))
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(3)
    , s = i(41)
    , n = "data-focus-expression";
  t.exports = class extends r {
      constructor(t) {
          super(t),
          this._els = this.el.querySelectorAll(`[${n}]`)
      }
      mounted() {
          this._parseOptions(),
          this._setTabIndex(),
          this._handleFocus = this._handleFocus.bind(this),
          this._onPressDown = this._onPressDown.bind(this),
          this._onRelease = this._onRelease.bind(this),
          this._addListeners()
      }
      _addListeners() {
          this.el.addEventListener("focusin", this._handleFocus),
          this.el.addEventListener("mousedown", this._onPressDown),
          this.el.addEventListener("mouseup", this._onRelease),
          this.el.addEventListener("touchstart", this._onPressDown),
          this.el.addEventListener("touchend", this._onRelease),
          window.addEventListener("blur", (()=>document.activeElement.blur()))
      }
      _removeListeners() {
          this.el.removeEventListener("focusin", this._handleFocus),
          this.el.removeEventListener("mousedown", this._onPressDown),
          this.el.removeEventListener("mouseup", this._onRelease),
          this.el.removeEventListener("touchstart", this._onPressDown),
          this.el.removeEventListener("touchend", this._onRelease)
      }
      _onPressDown() {
          this._pressDown = !0
      }
      _onRelease() {
          this._pressDown = !1
      }
      _parseOptions() {
          this._els.forEach((t=>{
              const e = t.getAttribute(n);
              if (e) {
                  const i = JSON.parse(e);
                  t._focusExpression = i.expression,
                  i.hasOwnProperty("anchors") && (t._focusAnchors = i.anchors.map((t=>document.querySelector(t)))),
                  i.hasOwnProperty("breakpointMask") && (t._breakpointMask = i.breakpointMask),
                  i.hasOwnProperty("tabindex") && (t._tabIndex = i.tabindex)
              }
          }
          ))
      }
      _handleFocus(t) {
          const e = t.target;
          if (e._focusExpression) {
              t.stopPropagation();
              const i = !(e._breakpointMask && e._breakpointMask.length) || e._breakpointMask.includes(this.pageMetrics.breakpoint);
              if (this._pressDown || !i)
                  return;
              if (e.hasAttribute(n)) {
                  let t = {
                      target: e
                  };
                  e._focusAnchors && (t.anchors = e._focusAnchors),
                  window.scrollTo(0, s.parse(e._focusExpression, t)),
                  "-1" === e.getAttribute("tabindex") && e.blur()
              }
          } else if ("A" !== e.tagName && !this._pressDown) {
              let i = e;
              if (!i._animInfo)
                  for (let t = 0; t < 3; t++) {
                      const t = i.parentElement
                        , e = t._animInfo;
                      if (i = t,
                      e)
                          break
                  }
              if (i._animInfo) {
                  let e = this.anim.getControllerForTarget(i).getAllKeyframesForAttribute("opacity");
                  if (e) {
                      const i = e.map((t=>({
                          kf: t,
                          point: s.parse(t.jsonProps.end, {
                              target: t.controller.element,
                              anchors: t.anchors
                          })
                      }))).sort(((t,e)=>t.point > e.point));
                      if (1 === e.length && 0 === i[0].kf.jsonProps.opacity[0] || (i[0].point = s.parse(i[0].kf.jsonProps.start, {
                          target: i[0].kf.controller.element,
                          anchors: i[0].kf.anchors
                      })),
                      e.length > 1) {
                          const e = i[1].point - i[0].point;
                          let r = i[0].point + e / 2;
                          t.stopPropagation(),
                          window.scrollTo(0, Math.round(r))
                      } else if (1 === e.length) {
                          let e = i[0].point;
                          t.stopPropagation(),
                          window.scrollTo(0, Math.round(e))
                      }
                  }
              }
          }
      }
      _setTabIndex() {
          this._els.forEach((t=>{
              let e = -1;
              t.hasOwnProperty("_tabIndex") && (e = t._tabIndex),
              t.setAttribute("tabindex", e)
          }
          ))
      }
      _removeTabIndex() {
          this._els.forEach((t=>t.removeAttribute("tabindex")))
      }
      destroy() {
          this._removeTabIndex(),
          this._removeListeners()
      }
      static IS_SUPPORTED() {
          return !document.documentElement.classList.contains("touch")
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(3)
    , s = i(98)
    , n = "sequence-load-kf"
    , a = {
      event: n,
      start: "t - 200vh",
      end: "b + 100vh"
  }
    , o = {
      start: "a0t - 100vh",
      end: "a0b",
      progress: [0, 1],
      ease: .25
  }
    , h = {
      X: "large",
      L: "large",
      M: "medium",
      S: "small"
  };
  t.exports = class extends r {
      get viewportName() {
          return h[this.pageMetrics.breakpoint]
      }
      stripTrailingSlash(t) {
          return t.endsWith("/") ? t.slice(0, -1) : t
      }
      async mounted() {
          this._isEnhanced = !0,
          this.basePath = this.el.getAttribute("data-sequence-basepath");
          const t = this.el.getAttribute("data-sequence-img-format-map");
          t && (this.imgFormatMap = JSON.parse(t)),
          await this._fetchManifest()
      }
      get name() {
          return "Sequence"
      }
      async _fetchManifest() {
          let t = `${this.stripTrailingSlash(this.basePath)}/${this.viewportName}/sequence_manifest.json`;
          const e = await fetch(t).catch((t=>console.log("Error fetching manifest:", t)));
          this.manifest = await e.json(),
          this._createSequence(),
          this._prepareKeyframes()
      }
      _createSequence() {
          this.sequenceInitialized || (this.sequenceInitialized = !0,
          this.imageSequence = new s({
              el: this.el,
              imgFormat: this.imgFormatMap ? this.imgFormatMap[this.viewportName] : this.el.getAttribute("data-sequence-img-format") || "jpg",
              numImages: parseInt(this.manifest.numFrames),
              numPadding: 4,
              viewport: this.viewportName,
              baseURL: this.stripTrailingSlash(this.basePath),
              showLoadingIndicators: this.el.hasAttribute("data-loading-indicators")
          }))
      }
      _prepareKeyframes() {
          this.sequenceGroup = this.anim.createScrollGroup(this.el),
          this.sequenceGroup.name = `Sequence - ${this.manifest.name}`;
          const t = Object.assign({
              onEnter: ()=>{
                  this.imageSequence && (this.imageSequence.inLoadArea = !0,
                  this.imageSequence.loadBucket())
              }
              ,
              onExit: ()=>{
                  this.imageSequence && (this.imageSequence.inLoadArea = !1)
              }
          }, a, JSON.parse(this.el.getAttribute("data-sequence-load-kf")))
            , e = Object.assign({}, o, {
              anchors: [this.el]
          }, JSON.parse(this.el.getAttribute("data-sequence-progress-kf")));
          this.imageSequence.once(s.FIRST_IMAGE_LOADED, (t=>{
              this.progressKeyframe = this.sequenceGroup.addKeyframe(this.imageSequence, e),
              this.trigger(s.FIRST_IMAGE_LOADED, t)
          }
          )),
          this.addDiscreteEvent(Object.assign(t, {
              group: this.sequenceGroup,
              onEnterOnce: ()=>{
                  this.imageSequence.loadImages()
              }
          })),
          this.imageSequence.on(s.SEQUENCE_PROGRESS, (t=>{
              this.percentLoaded = this.imageSequence.percentLoaded,
              this.trigger(s.SEQUENCE_PROGRESS, t)
          }
          ))
      }
      onBreakpointChange() {
          this._isEnhanced && (this.imageSequence && (this.imageSequence.destroy(),
          this.imageSequence = null),
          this.sequenceGroup.remove().then((()=>{
              this.sequenceInitialized = !1,
              this._fetchManifest()
          }
          )))
      }
      static IS_SUPPORTED() {
          return !0
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(9);
  const s = i(3)
    , n = i(98)
    , a = i(34)
    , o = i(152)
    , h = [...r.disabledWhen, "mq-small-shortest", "mq-medium-shorter", "mq-large-short", "mq-xlarge-short"]
    , l = [...h, "no-heavy-media"];
  t.exports = class extends s {
      constructor(t) {
          super(t),
          this.scrollContainer = this.el.querySelector(".scroll-container-hero"),
          this.headline = this.el.querySelector(".hero-headline"),
          this.eyebrow = this.el.querySelector(".hero-eyebrow"),
          this.links = this.el.querySelector(".hero-links-anim"),
          this.payoff = this.el.querySelector(".hero-payoff")
      }
      mounted() {
          this.imageSequence = this.gum.getComponentOfType("Sequence", this.el.querySelector(".image-sequence-hero")),
          this.imageSequence.once(n.FIRST_IMAGE_LOADED, (()=>this.imageSequence.el.style.opacity = 1)),
          this.anim.addKeyframe(this.el, {
              start: "t - 130vh",
              end: "b + 30vh",
              cssClass: ["near-section"],
              toggle: !0,
              disabledWhen: h
          }),
          this.pageMetrics.scrollY < 10 ? this.introAnimation() : (this.el.classList.add("hero-ready"),
          this.addScrollAnimations()),
          a(this, ".hero-fallback-pic", l)
      }
      introAnimation() {
          const t = 1.5
            , e = "easeInOutQuart"
            , i = [0, 1];
          if (this.tl = this.anim.createTimeGroup(),
          this.tl.addKeyframe(this.eyebrow, {
              start: 0,
              end: t,
              y: ["css(--trans-y)", 0],
              opacity: i,
              easeFunction: e,
              disabledWhen: h
          }),
          this.tl.addKeyframe(this.links, {
              start: 0,
              end: t,
              y: ["css(--trans-y) * -1", 0],
              opacity: i,
              easeFunction: e,
              disabledWhen: h
          }),
          this.tl.addKeyframe(this.headline, {
              start: 0,
              end: t,
              scale: [.85, 1],
              opacity: i,
              easeFunction: e,
              disabledWhen: h
          }),
          this.tl.addKeyframe(this.imageSequence.el, {
              start: 0,
              end: t,
              scale: [.75, 1],
              easeFunction: e,
              disabledWhen: h
          }),
          this.tl.addEvent(this.el, {
              start: t,
              event: "hero-intro-animation-end",
              onEventOnce: ()=>{
                  this.el.classList.add("hero-ready"),
                  this.tl.remove().then((()=>{
                      this.addScrollAnimations()
                  }
                  ))
              }
          }),
          document.documentElement.classList.contains("no-heavy-media") && document.documentElement.classList.contains("enhanced")) {
              const t = this.el.querySelector(".hero-fallback-pic img");
              o(t).then((()=>this.tl.play())).catch((()=>{}
              ))
          } else
              this.imageSequence.once(n.FIRST_IMAGE_LOADED, (()=>this.tl.play()))
      }
      addScrollAnimations() {
          const t = this.el.querySelector(".sticky-hero")
            , e = [this.scrollContainer, t]
            , i = this.el.querySelector(".image-sequence-container-inner-hero")
            , s = JSON.parse(this.imageSequence.el.getAttribute("data-sequence-progress-kf"));
          this.anim.getGroupByName("Hero").addKeyframe(this.imageSequence.el, {
              start: `${s.start}`,
              end: `${s.start} + (((${s.end}) - (${s.start})) * 0.625)`,
              scale: [1, "max((prop(offsetTop, a2) + (css(--translate-offset, a2) * 1a2h) + 100h) / 100h, 1)"],
              anchors: [...e, i],
              breakpointMask: "LM",
              disabledWhen: l
          });
          const n = "a0t + (a0h - a1h) * 0.3"
            , a = "a0t + (a0h - a1h) * 0.4";
          [this.eyebrow, this.links].forEach((t=>{
              this.anim.addKeyframe(t, {
                  start: n,
                  end: a,
                  opacity: [1, 0],
                  anchors: e,
                  ease: r.ease,
                  disabledWhen: l
              })
          }
          )),
          this.anim.addKeyframe(this.links, {
              start: a,
              cssClass: "no-pointer",
              toggle: !0,
              anchors: e,
              disabledWhen: l
          }),
          this.anim.addKeyframe(this.headline, {
              start: "a0t - css(--global-nav-collective-height) + css(--r-globalnav-height, a0) - css(--r-localnav-height)",
              end: "a0t + (a0h - a1h) * 0.7",
              scale: [1, 1.2],
              anchors: e,
              ease: r.ease,
              disabledWhen: l
          }),
          ["L", "M"].forEach((t=>{
              const i = "L" === t ? l : [...l, "no-mq-portrait"];
              this.anim.addKeyframe(this.headline, {
                  start: "a0t + (a0h - a1h) * 0.35",
                  end: "a0t + (a0h - a1h) * 0.55",
                  opacity: [1, 0],
                  anchors: e,
                  ease: r.ease,
                  disabledWhen: i,
                  breakpointMask: t
              })
          }
          )),
          ["M", "S"].forEach((t=>{
              const i = "S" === t ? l : [...l, "mq-portrait"];
              this.anim.addKeyframe(this.headline, {
                  start: n,
                  end: a,
                  opacity: [1, 0],
                  anchors: e,
                  ease: r.ease,
                  disabledWhen: i,
                  breakpointMask: t
              })
          }
          )),
          ["L", "M"].forEach((t=>{
              const i = "L" === t ? l : [...l, "mq-portrait"];
              this.anim.addKeyframe(this.payoff, {
                  start: "a0t + (a0h - a1h) * 0.7",
                  end: "a0t + (a0h - a1h) * 0.8",
                  opacity: [0, 1],
                  anchors: e,
                  ease: r.ease,
                  disabledWhen: i,
                  breakpointMask: t
              }),
              this.anim.addKeyframe(this.payoff, {
                  start: "a0t + (a0h - a1h) * 0.7",
                  end: "a0t + (a0h - a1h) * 1",
                  scale: [.85, 1],
                  anchors: e,
                  ease: r.ease,
                  disabledWhen: i,
                  breakpointMask: t
              }),
              this.anim.addKeyframe(this.payoff, {
                  start: "a0t + (a0h - a1h) * 0.7",
                  cssClass: "yes-pointer",
                  toggle: !0,
                  anchors: e,
                  ease: r.ease,
                  disabledWhen: i,
                  breakpointMask: t
              })
          }
          )),
          this.anim.addKeyframe(this.payoff, {
              start: "a0t + (a0h - a1h) * 0.6",
              end: "a0t + (a0h - a1h) * 0.7",
              opacity: [0, 1],
              anchors: e,
              ease: r.ease,
              disabledWhen: [...l, "no-mq-portrait"],
              breakpointMask: "M"
          }),
          this.anim.addKeyframe(this.payoff, {
              start: "a0t + (a0h - a1h) * 0.6",
              end: "a0t + (a0h - a1h) * 1",
              scale: [.85, 1],
              anchors: e,
              ease: r.ease,
              disabledWhen: [...l, "no-mq-portrait"],
              breakpointMask: "M"
          }),
          this.anim.addKeyframe(this.payoff, {
              start: "a0t + (a0h - a1h) * 0.6",
              cssClass: "yes-pointer",
              toggle: !0,
              anchors: e,
              ease: r.ease,
              disabledWhen: [...l, "no-mq-portrait"],
              breakpointMask: "M"
          }),
          this.anim.addKeyframe(this.payoff, {
              start: "a0t + (a0h - a1h) * 0.4",
              end: "a0t + (a0h - a1h) * 0.5",
              opacity: [0, 1],
              anchors: e,
              ease: r.ease,
              disabledWhen: l,
              breakpointMask: "S"
          }),
          this.anim.addKeyframe(this.payoff, {
              start: "a0t + (a0h - a1h) * 0.4",
              end: "a0t + (a0h - a1h) * 1",
              scale: [.85, 1],
              anchors: e,
              ease: r.ease,
              disabledWhen: l,
              breakpointMask: "S"
          }),
          this.anim.addKeyframe(this.payoff, {
              start: "a0t + (a0h - a1h) * 0.4",
              cssClass: "yes-pointer",
              toggle: !0,
              anchors: e,
              ease: r.ease,
              disabledWhen: l,
              breakpointMask: "S"
          })
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("enhanced")
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(153)
    , s = i(154)
    , n = i(1).PICTURE_DATA_LOADED
    , a = i(1).PICTURE_DATA_LAZY;
  t.exports = function(t, e) {
      let i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
      const o = s(t);
      if (!o.length)
          return Promise.reject({
              message: "no elements found / passed into ImagesLoaded function."
          });
      const h = o.map((t=>{
          const s = t.parentElement;
          let o = i;
          return "PICTURE" === s.tagName && s.hasAttribute(a) && !s.hasAttribute(n) && (o = !0),
          r({
              el: t,
              seconds: e,
              forceListener: o
          })
      }
      ));
      return Promise.all(h)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function() {
      let {el: t, url: e, seconds: i, forceListener: r} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return new Promise(((s,n)=>{
          let a;
          const o = e || t.src;
          if (!o)
              return void n({
                  message: "Couldn't find a src on image",
                  el: t
              });
          const h = o.match(/.*\.svg$/g);
          let l;
          e || h ? a = new Image : "IMG" === t.tagName && (a = t);
          const u = ()=>{
              clearTimeout(l),
              a.removeEventListener("load", u),
              s({
                  el: t,
                  path: o
              })
          }
          ;
          if (i && (l = setTimeout((()=>{
              a.removeEventListener("load", u),
              n({
                  message: "Ran out of time loading: " + o,
                  el: t,
                  path: o
              })
          }
          ), 1e3 * i)),
          !e && a.complete && !h && !r)
              return a.naturalWidth ? (clearTimeout(l),
              void s({
                  el: t,
                  path: o
              })) : void n({
                  message: "Failed to load image:" + o,
                  el: t,
                  path: o
              });
          a.addEventListener("load", u),
          a.addEventListener("error", (function() {
              n({
                  message: "Failed to load image:" + o,
                  el: t,
                  path: o
              })
          }
          )),
          e && (a.src = o)
      }
      ))
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      let e;
      return e = "string" == typeof t ? Array.from(document.documentElement.querySelectorAll(t)) : Array.isArray(t) ? t : t instanceof Element ? [t] : Array.from(t),
      e
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(3)
    , {disabledWhen: s, ease: n} = i(9);
  t.exports = class extends r {
      constructor(t) {
          super(t)
      }
      mounted() {
          this.anim.addKeyframe(this.el, {
              start: "t - 130vh",
              end: "b + 30vh",
              cssClass: ["near-section"],
              toggle: !0
          });
          const t = this.el.querySelectorAll(".value-prop")
            , e = e=>`(b - 100vh) + ((40vh / ${t.length - 1}) * ${e})`
            , i = t=>`${e(t)} + 10vh`
            , r = t=>`${i(t)} + 4vh`
            , a = t=>`${r(t)} + 15vh`;
          t.forEach(((o,h)=>{
              0 !== h && this.anim.addKeyframe(o, {
                  start: e(h),
                  end: i(h),
                  opacity: ["css(--default-opacity)", 1],
                  ease: n,
                  disabledWhen: s
              }),
              h !== t.length - 1 && this.anim.addKeyframe(o, {
                  start: r(h),
                  end: a(h),
                  opacity: [1, "css(--default-opacity)"],
                  ease: n,
                  disabledWhen: s
              })
          }
          ))
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("enhanced")
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0)
    , s = r(i(42))
    , n = r(i(38))
    , a = r(i(44))
    , o = r(i(81));
  const h = i(3)
    , {disabledWhen: l} = i(9);
  t.exports = class extends h {
      constructor(t) {
          super(t),
          this.prefersReducedMotion = document.documentElement.classList.contains("reduced-motion"),
          this.video = this.el.querySelector("video"),
          this.container = this.video.parentElement.parentElement,
          this.button = this.el.querySelector(".play-pause-button")
      }
      mounted() {
          const t = document.body.querySelector(".section-hero")
            , e = this.el.querySelector(".scroll-container-value-props");
          this.anim.addKeyframe(this.container, {
              start: "a0t - 100vh - css(--r-localnav-height)",
              end: "a1b - 100vh",
              opacity: [0, 1],
              anchors: [e, t],
              disabledWhen: l
          }),
          this.anim.addKeyframe(this.container, {
              start: "a0b - 100vh - 30vh",
              end: "a0b - 100vh",
              opacity: [1, 0],
              anchors: [e],
              disabledWhen: l
          }),
          this.inlineVideo = new s.default({
              container: this.container,
              el: this.video,
              playPauseButton: this.button,
              plugins: [n.default, a.default, o.default],
              anim: this.anim
          }),
          this.loadPlayKF = this.anim.addEvent(this.el, {
              start: "t - 200vh",
              end: "b + 200vh",
              event: "load-play-value-props-video",
              onEnterOnce: ()=>this.loadPlayVideo()
          }),
          this.inlineVideo.on(n.default.LOAD_TIMEOUT_EVENT, (()=>this.destroy()))
      }
      async loadPlayVideo() {
          try {
              await this.inlineVideo.load(),
              this.prefersReducedMotion || await this.inlineVideo.play(),
              this.button.removeAttribute("aria-hidden"),
              this.button.removeAttribute("disabled"),
              this.video.removeAttribute("aria-hidden"),
              this.video.parentElement.querySelectorAll("img").forEach((t=>t.setAttribute("alt", "")))
          } catch (t) {
              this.destroy()
          }
      }
      destroy() {
          this.button.style.display = "none",
          this.inlineVideo.el.style.display = "none",
          this.loadPlayKF.remove(),
          this.inlineVideo.destroy(),
          this.inlineVideo = null
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("heavy-media")
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(158))
    , n = r(i(159))
    , a = r(i(160))
    , o = r(i(161))
    , h = [s.default, n.default, a.default, o.default];
  e.default = h
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(7));
  class n extends s.default {
      get src() {
          if (!this.media.el.currentSrc && !this.media.el.src)
              for (let t of this.media.el.querySelectorAll("source"))
                  if (this.media.el.canPlayType(t.type))
                      return t.src;
          return this.media.el.currentSrc || this.media.el.src
      }
  }
  var a = n;
  e.default = a
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(7))
    , n = r(i(100))
    , a = r(i(12))
    , o = r(i(35))
    , h = r(i(43))
    , l = r(i(46));
  const u = n.default.CAN_PLAY_THROUGH
    , {HAVE_NOTHING: c, HAVE_CURRENT_DATA: d, NETWORK_EMPTY: f} = HTMLMediaElement;
  class p extends s.default {
      constructor(t) {
          super(t),
          this._loadCompleteEvent = t.loadCompleteEvent || u,
          this._onLoaded = this._onLoaded.bind(this),
          this._onError = this._onError.bind(this)
      }
      mounted() {
          "none" !== this.media.el.preload && this.media.src && (async()=>{
              try {
                  await this.media.load(this.media.src)
              } catch (t) {
                  (0,
                  h.default)(`auto load of ${this.media.src} failed or was aborted with err:${t}`)
              }
          }
          )()
      }
      async load(t) {
          if (void 0 === t && this.media.src && (t = this.media.src),
          !t)
              throw new Error("No Media src was specified, can not fullfill load() request");
          return t !== this._currentLoadUrl && (this.media.trigger(a.default.MEDIA_LOAD_START),
          this._currentLoadUrl = t,
          this._pendingPromise = new Promise(((e,i)=>{
              this._resolvePendingPromise = ()=>{
                  this._resolvePendingPromise = null,
                  this._rejectPendingPromise = null,
                  e()
              }
              ,
              this._rejectPendingPromise = ()=>{
                  this._resolvePendingPromise = null,
                  this._rejectPendingPromise = null,
                  i()
              }
              ,
              this.media.el.addEventListener(this._loadCompleteEvent, this._onLoaded),
              l.default.browser.firefox && this._loadCompleteEvent === n.default.CAN_PLAY_THROUGH && this.media.el.addEventListener(n.default.CAN_PLAY, this._onLoaded),
              this.media.el.addEventListener(n.default.ERROR, this._onError),
              this.media.el.addEventListener(n.default.ABORT, this._onError),
              this.media.el.src = t,
              this.media.el.load()
          }
          ))),
          this._pendingPromise
      }
      _clearLoadListeners() {
          this.media.el.removeEventListener(this._loadCompleteEvent, this._onLoaded),
          this.media.el.removeEventListener(n.default.CAN_PLAY, this._onLoaded),
          this.media.el.removeEventListener(n.default.ERROR, this._onError),
          this.media.el.removeEventListener(n.default.ABORT, this._onError)
      }
      _onLoaded() {
          this._clearLoadListeners(),
          this.media.trigger(a.default.LOADING_STATE_CHANGE),
          this.media.trigger(a.default.MEDIA_LOAD_COMPLETE),
          this._resolvePendingPromise()
      }
      _onError() {
          this._clearLoadListeners(),
          this.media.trigger(a.default.MEDIA_LOAD_ERROR),
          this.media.trigger(a.default.LOADING_STATE_CHANGE),
          this._rejectPendingPromise()
      }
      abortLoad() {
          this._rejectPendingPromise && this._rejectPendingPromise()
      }
      get loadingState() {
          return this.media.el.error ? o.default.ERROR : this.media.el.networkState === f && this.media.el.readyState === c ? o.default.EMPTY : this.media.el.readyState < d ? this.media.el.buffered.length && 0 === this.media.el.buffered.start(0) && this.media.el.buffered.end(0) === this.media.el.duration ? o.default.LOADED : o.default.LOADING : o.default.LOADED
      }
      destroy() {
          this._clearLoadListeners(),
          super.destroy()
      }
  }
  var m = p;
  e.default = m
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(7))
    , n = r(i(37));
  const {HAVE_METADATA: a, HAVE_CURRENT_DATA: o} = HTMLVideoElement;
  class h extends s.default {
      constructor(t) {
          super(t),
          this._initialize()
      }
      _initialize() {
          this.media.el.playsInline = !0,
          this.media.el.autoplay && (this._autoPlayTimer = setTimeout((()=>this.media.play())))
      }
      async play() {
          this._playRequestPending = !0,
          this.media.el.readyState < a && await this.media.load(),
          await this.media.el.play(),
          this._playRequestPending = !1
      }
      get playbackState() {
          if (!this._playRequestPending) {
              if (this.media.el.ended)
                  return n.default.ENDED;
              if (this.media.el.paused && !this.media.el.ended)
                  return n.default.PAUSED
          }
          return n.default.PLAYING
      }
      destroy() {
          clearTimeout(this._autoPlayTimer),
          super.destroy()
      }
  }
  var l = h;
  e.default = l
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(7))
    , n = r(i(37))
    , a = r(i(35))
    , o = r(i(100))
    , h = r(i(12));
  const l = [o.default.LOADED_DATA, o.default.LOAD_START, o.default.CAN_PLAY, o.default.CAN_PLAY_THROUGH, o.default.PLAY, o.default.PLAYING, o.default.PAUSE, o.default.WAITING, o.default.SEEKING, o.default.SEEKED, o.default.ERROR, o.default.ENDED]
    , u = "[data-inline-media-controller={id}]";
  class c extends s.default {
      constructor(t) {
          super(t),
          this._container = t.container || this.media.el.parentElement,
          this._playbackState = n.default.IDLE,
          this._loadingState = a.default.EMPTY,
          this._elementsToDecorate = [],
          this._container && this._elementsToDecorate.push(this._container),
          this.media.id && this._elementsToDecorate.push(...Array.from(document.querySelectorAll(u.replace("{id}", this.media.id))));
          for (const t of this._elementsToDecorate)
              t.classList.add(this._playbackState),
              t.classList.add(this._loadingState);
          this.updateState = this.updateState.bind(this),
          this._addEventListeners()
      }
      _addEventListeners() {
          for (let t of l)
              this.media.el.addEventListener(t, this.updateState);
          this.media.on(h.default.LOADING_STATE_CHANGE, this.updateState),
          this.media.on(h.default.PLAYBACK_STATE_CHANGE, this.updateState)
      }
      _removeEventListeners() {
          for (let t of l)
              this.media.el.removeEventListener(t, this.updateState);
          this.media.off(h.default.LOADING_STATE_CHANGE, this.updateState),
          this.media.off(h.default.PLAYBACK_STATE_CHANGE, this.updateState)
      }
      updateState(t) {
          const e = this.media.playbackState
            , i = this._playbackState
            , r = this.media.loadingState
            , s = this._loadingState;
          if (this._playbackState = e,
          this._loadingState = r,
          e !== i) {
              for (const t of this._elementsToDecorate)
                  t.classList.add(e),
                  t.classList.remove(i);
              this.media.trigger(h.default.PLAYBACK_STATE_CHANGE)
          }
          if (r !== s) {
              for (const t of this._elementsToDecorate)
                  t.classList.add(r),
                  t.classList.remove(s);
              this.media.trigger(h.default.LOADING_STATE_CHANGE)
          }
      }
      destroy() {
          for (const t of this._elementsToDecorate)
              t.classList.remove(this._playbackState),
              t.classList.remove(this._loadingState);
          this._removeEventListeners(),
          super.destroy()
      }
  }
  var d = c;
  e.default = d
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = async function() {
      let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document
        , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      t || (t = document);
      const i = t.querySelectorAll("[data-inline-media]")
        , r = [];
      for (let t of i) {
          const i = t.dataset
            , a = i.inlineMediaPlugins ? i.inlineMediaPlugins.split(",").map((t=>t.trim())) : []
            , o = [];
          for (const t of a)
              if (!s.pluginCache[t]) {
                  if (!n.default[t])
                      throw new Error(`Error Trying to use undefined Plugin named: ${t} . Ensure you call Media.addPlugin() first to register this custom plugin!`);
                  o.push((async()=>{
                      const e = (await n.default[t]()).default;
                      s.default.addPlugin(t, e)
                  }
                  ))
              }
          await Promise.all(o.map((async t=>t()))),
          r.push(new s.default(Object.assign({
              el: t,
              plugins: a.map((t=>s.pluginCache[t]))
          }, e)))
      }
      return r
  }
  ;
  var s = function(t, e) {
      if (!e && t && t.__esModule)
          return t;
      if (null === t || "object" != typeof t && "function" != typeof t)
          return {
              default: t
          };
      var i = a(e);
      if (i && i.has(t))
          return i.get(t);
      var r = {}
        , s = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var n in t)
          if ("default" !== n && Object.prototype.hasOwnProperty.call(t, n)) {
              var o = s ? Object.getOwnPropertyDescriptor(t, n) : null;
              o && (o.get || o.set) ? Object.defineProperty(r, n, o) : r[n] = t[n]
          }
      r.default = t,
      i && i.set(t, r);
      return r
  }(i(99))
    , n = r(i(163));
  function a(t) {
      if ("function" != typeof WeakMap)
          return null;
      var e = new WeakMap
        , i = new WeakMap;
      return (a = function(t) {
          return t ? i : e
      }
      )(t)
  }
}
, function(t, e, i) {
  "use strict";
  function r(t) {
      if ("function" != typeof WeakMap)
          return null;
      var e = new WeakMap
        , i = new WeakMap;
      return (r = function(t) {
          return t ? i : e
      }
      )(t)
  }
  function s(t, e) {
      if (!e && t && t.__esModule)
          return t;
      if (null === t || "object" != typeof t && "function" != typeof t)
          return {
              default: t
          };
      var i = r(e);
      if (i && i.has(t))
          return i.get(t);
      var s = {}
        , n = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var a in t)
          if ("default" !== a && Object.prototype.hasOwnProperty.call(t, a)) {
              var o = n ? Object.getOwnPropertyDescriptor(t, a) : null;
              o && (o.get || o.set) ? Object.defineProperty(s, a, o) : s[a] = t[a]
          }
      return s.default = t,
      i && i.set(t, s),
      s
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var n = {
      AnimLoad: async()=>Promise.resolve().then((()=>s(i(164)))),
      AnimPlay: async()=>Promise.resolve().then((()=>s(i(165)))),
      FeatureObserver: async()=>Promise.resolve().then((()=>s(i(166)))),
      LoadTimeout: async()=>Promise.resolve().then((()=>s(i(38)))),
      PlayPauseButton: async()=>Promise.resolve().then((()=>s(i(169)))),
      ViewportSource: async()=>Promise.resolve().then((()=>s(i(170))))
  };
  e.default = n
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(101))
    , n = r(i(7))
    , a = r(i(43));
  const o = {
      start: "t - 200vh",
      end: "b + 100vh"
  };
  class h extends n.default {
      constructor(t) {
          super(t),
          this._anim = t.anim,
          this._container = t.container || this.media.el.parentElement,
          this._scrollGroup = this.options.scrollGroup || this._anim.getGroupForTarget(this._container || this.media.el),
          this._initialize()
      }
      _initialize() {
          this._onLoadKeyframeEnter = this._onLoadKeyframeEnter.bind(this),
          this._onLoadKeyframeExit = this._onLoadKeyframeExit.bind(this);
          const t = (0,
          s.default)(this.media.el.dataset, this.options, "loadKeyframe", o);
          t.event || (t.event = "inline-media-load-kf"),
          this._loadKeyframe = this._scrollGroup.addKeyframe(this.media.el, t),
          this._loadKeyframe.controller.on(`${this._loadKeyframe.event}:enter`, this._onLoadKeyframeEnter),
          this._loadKeyframe.controller.on(`${this._loadKeyframe.event}:exit`, this._onLoadKeyframeExit)
      }
      get loadKeyframe() {
          return this._loadKeyframe
      }
      async _onLoadKeyframeEnter(t) {
          try {
              await this.media.load(),
              this._loaded = !0
          } catch (t) {
              (0,
              a.default)("AnimLoad: Load error occured")
          }
      }
      _onLoadKeyframeExit(t) {}
      destroy() {
          this._loadKeyframe.controller.off(`${this._loadKeyframe.event}:enter`, this._onLoadKeyframeEnter),
          this._loadKeyframe.controller.off(`${this._loadKeyframe.event}:exit`, this._onLoadKeyframeExit),
          super.destroy()
      }
  }
  e.default = h
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(12))
    , n = r(i(101))
    , a = r(i(7));
  const o = {
      start: "t - 100vh",
      end: "b"
  };
  class h extends a.default {
      constructor(t) {
          super(t),
          this._anim = t.anim,
          this._container = t.container || this.media.el.parentElement,
          this._scrollGroup = this.options.scrollGroup || this._anim.getGroupForTarget(this._container || this.media.el),
          this._initialize()
      }
      _initialize() {
          this._onPlayKeyframeEnter = this._onPlayKeyframeEnter.bind(this),
          this._onPlayKeyframeExit = this._onPlayKeyframeExit.bind(this);
          const t = this.media.el.dataset;
          if (this._autoPlayWithReducedMotion = (0,
          n.default)(t, this.options, "autoPlayWithReducedMotion", !1),
          !this._autoPlayWithReducedMotion && h.prefersReducedMotion)
              return;
          this._pauseOnExit = (0,
          n.default)(t, this.options, "pauseOnExit", !1),
          this._resetOnExit = (0,
          n.default)(t, this.options, "resetOnExit", !1);
          const e = (0,
          n.default)(t, this.options, "playKeyframe", o);
          e.event || (e.event = "inline-media-play-kf"),
          this._playKeyframe = this._scrollGroup.addKeyframe(this.media.el, e),
          this._playKeyframe.controller.on(`${this._playKeyframe.event}:enter`, this._onPlayKeyframeEnter),
          this._playKeyframe.controller.on(`${this._playKeyframe.event}:exit`, this._onPlayKeyframeExit),
          this._onLoadStart = this._onLoadStart.bind(this),
          this.media.on(s.default.MEDIA_LOAD_START, this._onLoadStart)
      }
      _onLoadStart() {
          this._loaded = !1
      }
      async _onPlayKeyframeEnter(t) {
          if (this._inFrame = !0,
          !this._paused && (this._loaded || (await this.media.load(),
          this._loaded = !0),
          this._inFrame))
              try {
                  await this.media.play()
              } catch (t) {}
      }
      _onPlayKeyframeExit(t) {
          this._inFrame = !1,
          this._loaded && this.media.el.paused && !this.media.el.ended ? this._paused = !0 : this._pauseOnExit && (this._paused = !1,
          this.media.el.pause()),
          this._loaded && this._resetOnExit && (this.media.el.currentTime = 0)
      }
      get playKeyframe() {
          return this._playKeyframe
      }
      destroy() {
          this._playKeyframe.controller.off(`${this._playKeyframe.event}:enter`, this._onPlayKeyframeEnter),
          this._playKeyframe.controller.off(`${this._playKeyframe.event}:exit`, this._onPlayKeyframeExit),
          this.media.off(s.default.MEDIA_LOAD_START, this._onLoadStart),
          super.destroy()
      }
      static get prefersReducedMotion() {
          return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      }
  }
  e.default = h
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(7))
    , n = r(i(37))
    , a = r(i(35))
    , o = r(i(12))
    , h = r(i(167))
    , l = r(i(168));
  const u = t=>t
    , c = t=>t ? t.split(",").map((t=>t.trim())) : null;
  class d extends s.default {
      constructor(t) {
          super(t);
          const e = (e,i,r)=>{
              let s = "inlineMedia" + e[0].toUpperCase() + e.slice(1);
              return i(this.media.el.dataset[s]) || t[e] || r
          }
          ;
          this._disabledStates = new h.default({
              features: e("disabledWhen", c, []),
              onActivate: this.disable.bind(this),
              onDeactivate: this.enable.bind(this)
          }),
          this._destroyStates = new h.default({
              features: e("destroyWhen", c, []),
              onActivate: this.destroyMedia.bind(this)
          }),
          this._pausedStates = new h.default({
              features: e("pausedWhen", c, []),
              onActivate: this.pauseMedia.bind(this)
          }),
          this._autoplayStates = new h.default({
              features: e("autoplayWhen", c, []),
              onActivate: this.autoplayMedia.bind(this),
              onDeactivate: this.disableAutoplay.bind(this)
          });
          const i = t.featureDetect || {};
          var r;
          this.featureCallbacks = Object.entries(i).map((t=>{
              let[e,i] = t;
              return new l.default({
                  featureClass: e,
                  callback: i
              })
          }
          )),
          this._featureElement = (r = e("featureElement", u, document.documentElement))instanceof HTMLElement ? r : document.querySelector(r),
          this.featureSets = [this._autoplayStates, this._pausedStates, this._disabledStates, this._destroyStates],
          this._featuresUpdated = this._featuresUpdated.bind(this),
          this.play = !1,
          this._observer = new MutationObserver(this._featuresUpdated),
          this._observer.observe(this._featureElement, {
              attributes: !0,
              attributeFilter: ["class"]
          }),
          this._featuresUpdated()
      }
      get loadingState() {
          return this._disabledStates.isDetected ? a.default.DISABLED : void 0
      }
      get playbackState() {
          return this._disabledStates.isDetected ? n.default.PAUSED : void 0
      }
      _featuresUpdated() {
          let t = this._featureElement.classList;
          this.featureSets.filter((e=>(e.updateFeatureState(t),
          e.detectionChanged))).forEach((t=>t.applyEffect())),
          this.featureCallbacks.forEach((e=>{
              e.updatePresence(t),
              e.isPresent && e.presenceChanged && e.triggerCallback(this.media)
          }
          ))
      }
      autoplayMedia() {
          this.media.el.setAttribute("autoplay", !0),
          this.media.play()
      }
      disableAutoplay() {
          this.media.el.setAttribute("autoplay", !1)
      }
      pauseMedia() {
          this.media.el.pause()
      }
      destroyMedia() {
          this.media.destroy()
      }
      destroy() {
          this._observer.disconnect()
      }
      disable() {
          this.media.abortLoad(),
          this.media.el.pause(),
          this.play = u,
          this.media.trigger(o.default.LOADING_STATE_CHANGE),
          this.media.trigger(o.default.PLAYBACK_STATE_CHANGE)
      }
      enable() {
          this.play = !1,
          this.media.trigger(o.default.LOADING_STATE_CHANGE),
          this.media.trigger(o.default.PLAYBACK_STATE_CHANGE)
      }
  }
  var f = d;
  e.default = f
}
, function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  const r = ()=>{}
  ;
  var s = class {
      constructor(t) {
          var e;
          this._features = new Set((e = t.features,
          Array.isArray(e) ? e : e ? [e] : [])),
          this._isDetected = !1,
          this._wasDetected = !1,
          this._onActivate = t.onActivate || r,
          this._onDeactivate = t.onDeactivate || r
      }
      get detectionChanged() {
          return this._isDetected !== this._wasDetected
      }
      get isDetected() {
          return this._isDetected
      }
      updateFeatureState(t) {
          this._wasDetected = this._isDetected;
          for (let e of t)
              if (this._features.has(e))
                  return void (this._isDetected = !0);
          this._isDetected = !1
      }
      applyEffect() {
          this._isDetected ? this._onActivate() : this._onDeactivate()
      }
  }
  ;
  e.default = s
}
, function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var r = class {
      constructor(t) {
          this.featureClass = t.featureClass,
          this._callback = t.callback,
          this._isPresent = !1,
          this._wasPresent = !1
      }
      get presenceChanged() {
          return this._isPresent !== this._wasPresent
      }
      get isPresent() {
          return this._isPresent
      }
      updatePresence(t) {
          this._wasPresent = this._isPresent,
          this._isPresent = t.contains(this.featureClass)
      }
      triggerCallback(t) {
          return this._callback(t)
      }
  }
  ;
  e.default = r
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(7))
    , n = r(i(12))
    , a = r(i(37));
  const o = '[data-inline-media-control="PlayPause"]'
    , h = "[data-inline-media-controller='{id}']"
    , l = "Pause"
    , u = "Play"
    , c = "Replay"
    , d = {
      CLICK: "data-analytics-click",
      TITLE: "data-analytics-title"
  };
  class f extends s.default {
      constructor(t) {
          super(t),
          this._container = t.container || this.media.el.parentElement,
          this._button = this._findButton(),
          this._onClick = this._onClick.bind(this),
          this._onPlaybackStateChange = this._onPlaybackStateChange.bind(this);
          const e = this._button.dataset;
          this._ariaLabels = {
              playing: e.ariaPlaying || t.ariaPlaying || l,
              paused: e.ariaPaused || t.ariaPaused || u,
              ended: e.ariaEnded || t.ariaEnded || c
          },
          this._button.addEventListener("click", this._onClick),
          this.media.on(n.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange),
          this._activeAnalytics = Object.values(d).filter((t=>this._button.hasAttribute(t + "-play") && this._button.hasAttribute(t + "-pause") || this._button.hasAttribute(t + "-replay")))
      }
      _findButton() {
          if (this.options.playPauseButton)
              return this.options.playPauseButton;
          let t = this._container.querySelector(`${o}`);
          if (!t) {
              const e = document.querySelectorAll(h.replace("{id}", this.media.id));
              for (const i of e)
                  t = "PlayPause" === i.getAttribute("data-inline-media-control") ? i : i.querySelector(`${o}`)
          }
          return t
      }
      _onPlaybackStateChange() {
          switch (this.media.playbackState) {
          case a.default.PLAYING:
              this._button.setAttribute("aria-label", this._ariaLabels.playing);
              break;
          case a.default.ENDED:
              this._button.setAttribute("aria-label", this._ariaLabels.ended);
              break;
          default:
              this._button.setAttribute("aria-label", this._ariaLabels.paused)
          }
          this._setAnalyticsState()
      }
      _setAnalyticsState() {
          let t;
          switch (this.media.playbackState) {
          case a.default.PLAYING:
              t = "pause";
              break;
          case a.default.ENDED:
              t = "replay";
              break;
          default:
              t = "play"
          }
          for (const e of this._activeAnalytics) {
              let i = t;
              "replay" !== t || this._button.hasAttribute(`${e}-${i}`) || (i = "play"),
              this._button.setAttribute(e, this._button.getAttribute(`${e}-${i}`))
          }
      }
      _onClick(t) {
          t.preventDefault(),
          this.media.el.paused ? this.media.play() : this.media.el.pause()
      }
      destroy() {
          this._button.removeEventListener("click", this._onClick),
          this.media.off(n.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange)
      }
  }
  e.default = f
}
, function(t, e, i) {
  "use strict";
  var r = i(0);
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  var s = r(i(7))
    , n = r(i(80))
    , a = r(i(102))
    , o = r(i(35));
  class h extends s.default {
      constructor(t) {
          super(t),
          this._cachedPlaying = null,
          this._initialize()
      }
      _initialize() {
          this._onBreakpointChange = this._onBreakpointChange.bind(this);
          const t = Object.assign({
              callback: this._onBreakpointChange
          }, this.options);
          this._breakpointDetect = t.anim ? new a.default(t) : new n.default(t),
          this._currentTime = 0;
          const e = this.media.el.dataset;
          this._basePath = this.options.basePath || e.inlineMediaBasepath || "./",
          this._onBreakpointChange()
      }
      _onBreakpointChange() {
          this._currentBreakpoint = this._breakpointDetect.breakpoint;
          const t = window.devicePixelRatio > 1 ? `${this._currentBreakpoint}_2x` : this._currentBreakpoint
            , e = `${this._basePath}${t}.mp4`;
          this._swapSrc(e)
      }
      get src() {
          return this._src
      }
      async _swapSrc(t) {
          if (this._src = t,
          this.media.loadingState === o.default.EMPTY)
              return;
          const e = null !== this._cachedPlaying ? this._cachedPlaying : !this.media.el.paused;
          return this.media.loadingState === o.default.LOADED && (this._currentTime = this.media.el.currentTime),
          this._cachedPlaying = e,
          await this.media.load(`${t}#t=${this._currentTime}`),
          this._cachedPlaying = null,
          e ? this.media.play() : Promise.resolve()
      }
      destroy() {
          this._breakpointDetect.destroy(),
          super.destroy()
      }
  }
  e.default = h
}
, function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  e.default = {
      small: 0,
      medium: 570,
      large: 780,
      xlarge: 1280
  }
}
, function(t, e, i) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  }),
  e.default = void 0;
  e.default = {
      S: "small",
      M: "medium",
      L: "large",
      X: "xlarge"
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0)
    , s = r(i(42))
    , n = r(i(38))
    , a = r(i(44));
  const o = i(3)
    , h = i(34);
  t.exports = class extends o {
      constructor(t) {
          super(t),
          this.video = this.el.querySelector("video")
      }
      mounted() {
          h(this, ".h2-chip-endframe", ["text-zoom", "no-heavy-media", "no-autoplay"]),
          document.documentElement.classList.contains("no-heavy-media") || document.documentElement.classList.contains("no-autoplay") || (this.inlineVideo = new s.default({
              el: this.video,
              plugins: [n.default, a.default],
              anim: this.anim
          }),
          this.loadKF = this.anim.addEvent(this.el, {
              start: "t - 200vh",
              end: "b + 200vh",
              event: "load-h2-video",
              onEnterOnce: ()=>this.loadVideo()
          }),
          this.playKF = this.anim.addEvent(this.el, {
              start: "b - 100vh",
              end: "t",
              event: "play-h2-video",
              onEnter: ()=>this.playVideo()
          }),
          this.resetKF = this.anim.addEvent(this.el, {
              start: "t - 100vh",
              end: "b",
              event: "reset-h2-video",
              onExit: ()=>this.video.currentTime = 0
          }),
          this.inlineVideo.on(n.default.LOAD_TIMEOUT_EVENT, (()=>this.destroy())))
      }
      async loadVideo() {
          try {
              await this.inlineVideo.load(),
              this.video.removeAttribute("aria-hidden"),
              this.el.querySelectorAll("img").forEach((t=>t.setAttribute("alt", "")))
          } catch (t) {
              this.destroy()
          }
      }
      async playVideo() {
          try {
              await this.inlineVideo.play()
          } catch (t) {
              this.destroy()
          }
      }
      destroy() {
          this.el.querySelector(".h2-chip-endframe").forceLoad(),
          this.el.querySelector(".h2-chip-startframe").style.display = "none",
          this.inlineVideo.el.style.display = "none",
          this.inlineVideo.destroy(),
          this.loadKF.remove(),
          this.playKF.remove(),
          this.resetKF.remove()
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("enhanced")
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0)
    , s = r(i(42))
    , n = r(i(38))
    , a = r(i(44))
    , o = r(i(81));
  const h = i(3)
    , {disabledWhen: l, ease: u} = i(9)
    , c = i(34);
  t.exports = class extends h {
      constructor(t) {
          super(t),
          this.scrollContainer = this.el.querySelector(".magical-scroll-container"),
          this.scrollContent = this.el.querySelector(".magical-scroll-content"),
          this.scrollCopyEls = Array.from(this.el.querySelectorAll(".copy--scroll")),
          this.stationaryCopyEls = Array.from(this.el.querySelectorAll(".magical-copy-icon-wrap")),
          this.hardwareCase = this.el.querySelector(".magical-hardware-wrap--enhanced .magical-case"),
          this.hardwareFrame = this.el.querySelector(".magical-hardware-wrap--enhanced .magical-hardware"),
          this.hardwareScreenEls = this.el.querySelectorAll(".magical-screen:not(.fallback-image, .video-fallback-image)"),
          this.videoFallbackImage = this.el.querySelector(".magical-screen.video-fallback-image"),
          this.video = this.el.querySelector(".magical-video"),
          this.videoContainer = this.video.parentElement.parentElement,
          this.replayButton = this.el.querySelector(".replay-button"),
          this.disabledWhenSmallShort = [...l, "mq-small-short", "mq-medium-short"],
          this.isAOW = document.documentElement.classList.contains("no-heavy-media")
      }
      mounted() {
          c(this, ".fallback-image", ["text-zoom", "mq-small-short", "mq-medium-short", "no-autoplay"]),
          this.init()
      }
      init() {
          this.addSmallKfs(),
          this.addMediumLargeKfs(),
          this.isAOW || this.inlineMediaSetup(),
          this.anim.addKeyframe(this.el, {
              start: "t - 130vh",
              end: "b + 30vh",
              cssClass: ["near-section"],
              toggle: !0
          }),
          this.anim.addKeyframe(this.scrollContainer, {
              start: "t + 10vh",
              cssClass: ["allow-pointer-events"],
              toggle: !0
          })
      }
      inlineMediaSetup() {
          this.inlineVideo = new s.default({
              container: this.videoContainer,
              el: this.video,
              playPauseButton: this.replayButton,
              plugins: [n.default, a.default, o.default],
              basePath: this.video.dataset.videoBasepath,
              anim: this.anim
          }),
          this.inlineVideo.on("PLAYBACK_STATE_CHANGE", (()=>{
              const t = this.inlineVideo.playbackState;
              "playing" === t ? this.setReplayButtonState("hide") : "ended" !== t || this.video.classList.contains("hidden") || this.setReplayButtonState("show")
          }
          )),
          this.inlineVideo.on("MEDIA_LOAD_COMPLETE", (()=>{
              this.videoContainer.classList.contains("loaded") && !this.videoContainer.classList.contains("loading-error") && (this.videoFallbackImage.setAttribute("aria-hidden", !0),
              this.video.removeAttribute("aria-hidden"))
          }
          )),
          this.anim.addEvent(this.video, {
              start: "a0t - 200vh",
              end: "a0b + 100vh",
              event: "video-load",
              anchors: [this.scrollContainer],
              onEnterOnce: ()=>this.loadVideo()
          }),
          this.anim.addEvent(this.video, {
              start: "a0t + 10vh",
              end: "css(--setup-video-end)",
              event: "video-play",
              anchors: [this.scrollContainer, this.scrollContent],
              onEnter: ()=>this.playVideo()
          }),
          this.anim.addEvent(this.video, {
              start: "css(--setup-video-end)",
              event: "video-hidden",
              anchors: [this.scrollContainer, this.scrollContent],
              onEvent: ()=>{
                  this.setReplayButtonState("hide"),
                  this.video.classList.add("hidden")
              }
              ,
              onEventReverse: ()=>{
                  this.video.classList.remove("hidden")
              }
          })
      }
      async loadVideo() {
          if (this.isVideoEnabledNow())
              try {
                  this.inlineVideo.load()
              } catch (t) {}
      }
      async playVideo() {
          if (this.isVideoEnabledNow())
              try {
                  this.inlineVideo.play()
              } catch (t) {}
      }
      isVideoEnabledNow() {
          return !document.documentElement.classList.contains("no-autoplay")
      }
      setReplayButtonState(t) {
          "show" === t ? (this.replayButton.removeAttribute("aria-hidden"),
          this.replayButton.removeAttribute("disabled")) : "hide" === t && (this.replayButton.setAttribute("aria-hidden", !0),
          this.replayButton.setAttribute("disabled", !0))
      }
      addCaseLightKf(t, e) {
          this.anim.addEvent(this.hardwareCase, {
              start: "a0t + 10vh",
              end: t,
              anchors: [this.scrollContainer, this.scrollContent],
              breakpointMask: e,
              event: "CaseLight",
              disabledWhen: this.disabledWhenSmallShort,
              onEnter: ()=>{
                  this.setCaseState("pairing")
              }
              ,
              onExit: ()=>{
                  const t = "1" === this.hardwareCase.style.opacity ? "green" : "on";
                  this.setCaseState(t)
              }
          })
      }
      setCaseState(t) {
          this.hardwareCase.classList.remove("go-green"),
          this.hardwareCase.classList.remove("go-on-state"),
          this.hardwareCase.classList.remove("animate"),
          "pairing" === t ? this.hardwareCase.classList.add("animate") : "on" === t ? this.hardwareCase.classList.add("go-on-state") : "green" === t && this.hardwareCase.classList.add("go-green")
      }
      addHwEnterKfs(t) {
          const e = [this.scrollContainer, this.scrollContent]
            , i = "a0t + 10vh"
            , r = "a0t - css(--scroll-container-top-offset)"
            , s = {
              start: "a0t",
              end: r,
              anchors: e,
              ease: u,
              disabledWhen: this.disabledWhenSmallShort,
              breakpointMask: t
          };
          return this.anim.addKeyframe(this.hardwareCase, Object.assign({}, s, {
              end: `${s.end} - 2vh`,
              opacity: [0, 1],
              easeFunction: "easeOutQuint"
          })),
          this.anim.addKeyframe(this.hardwareCase, Object.assign({}, s, {
              scale: [1.1, 1]
          })),
          [this.hardwareFrame, this.hardwareScreenEls[0], this.videoFallbackImage].forEach((s=>{
              this.anim.addKeyframe(s, {
                  start: i,
                  end: r,
                  opacity: [0, 1],
                  anchors: e,
                  ease: u,
                  disabledWhen: this.disabledWhenSmallShort,
                  breakpointMask: t
              })
          }
          )),
          {
              hardwareEnterStart: i,
              hardwareEnterEnd: r
          }
      }
      addMediumLargeKfs() {
          const t = [this.scrollContainer, this.scrollContent]
            , e = "XLM"
            , {hardwareEnterStart: i, hardwareEnterEnd: r} = this.addHwEnterKfs(e)
            , s = `(${i.replace("a0t +", "")})`
            , n = `(a0h - a1h - ${s})`;
          let a = `a0t + ${s}`;
          const o = 1 / (3 * this.scrollCopyEls.length)
            , h = `(${n} * ${o})`
            , l = `(${h} / 2)`
            , c = `(${n} * ${o})`
            , d = `${a} + ${h} + ${c}`
            , f = `${a} + ${h} + ${c} + ${h}`;
          this.scrollCopyEls.forEach(((i,s)=>{
              const n = 0 === s
                , o = s === this.scrollCopyEls.length - 1
                , c = n ? a : `${a} - ${l}`
                , p = n ? r : `${a} + ${h}`;
              this.anim.addKeyframe(i, {
                  start: c,
                  end: p,
                  opacity: [0, 1],
                  anchors: t,
                  ease: u,
                  disabledWhen: this.disabledWhenSmallShort,
                  breakpointMask: e
              }),
              this.anim.addKeyframe(i, {
                  start: c,
                  cssClass: "frontmost",
                  toggle: !0,
                  anchors: t,
                  ease: u,
                  disabledWhen: this.disabledWhenSmallShort,
                  breakpointMask: e
              }),
              this.anim.addKeyframe(i, {
                  start: c,
                  end: p,
                  y: ["-50% + 40", "-50%"],
                  anchors: t,
                  disabledWhen: this.disabledWhenSmallShort,
                  breakpointMask: e
              }),
              n || this.anim.addKeyframe(this.hardwareScreenEls[s], {
                  start: c,
                  cssClass: "show-ml",
                  toggle: !0,
                  anchors: t,
                  disabledWhen: this.disabledWhenSmallShort,
                  breakpointMask: e
              }),
              1 === s && (this.addCaseLightKf(c, e),
              this.el.style.setProperty("--setup-video-end-ML", c)),
              o || (this.anim.addKeyframe(i, {
                  start: d,
                  end: f,
                  opacity: [1, 0],
                  anchors: t,
                  ease: u,
                  disabledWhen: this.disabledWhenSmallShort,
                  breakpointMask: e,
                  easeFunction: "easeInQuint"
              }),
              this.anim.addKeyframe(i, {
                  start: d,
                  end: f,
                  y: [null, "-50% - 40"],
                  anchors: t,
                  disabledWhen: this.disabledWhenSmallShort,
                  breakpointMask: e
              })),
              a = `${f} + ${h}`
          }
          ))
      }
      addSmallKfs() {
          const t = "S"
            , e = 1 / (3 * this.scrollCopyEls.length)
            , i = `((a0h - a1h) * ${e})`
            , r = `(${i} / 2)`
            , s = `((a0h - a1h) * ${e})`
            , n = [this.scrollContainer, this.scrollContent]
            , {hardwareEnterStart: a, hardwareEnterEnd: o} = this.addHwEnterKfs(t)
            , h = `${o} + ${s} + ${i} + ${r}`;
          this.addCaseLightKf(h, t),
          this.anim.addKeyframe(this.scrollCopyEls[0], {
              start: a,
              end: h,
              cssClass: "frontmost",
              toggle: !0,
              anchors: n,
              ease: u,
              disabledWhen: this.disabledWhenSmallShort,
              breakpointMask: t
          }),
          this.anim.addKeyframe(this.scrollCopyEls[0], {
              start: a,
              end: o,
              opacity: [0, 1],
              y: ["css(--copy-end-position) + 10", "css(--copy-end-position)"],
              anchors: n,
              ease: u,
              disabledWhen: this.disabledWhenSmallShort,
              breakpointMask: t
          }),
          this.anim.addKeyframe(this.scrollCopyEls[0], {
              start: `${o} + ${s}`,
              end: `${o} + ${s} + ${i}`,
              opacity: [1, 0],
              y: ["css(--copy-end-position)", "css(--copy-end-position) - 10"],
              anchors: n,
              ease: u,
              disabledWhen: this.disabledWhenSmallShort,
              breakpointMask: t
          }),
          this.anim.addKeyframe(this.scrollCopyEls[1], {
              start: h,
              end: `${o} + ${s} + ${i} + ${i} + ${r}`,
              opacity: [0, 1],
              y: ["css(--copy-end-position) + 10", "css(--copy-end-position)"],
              anchors: n,
              ease: u,
              disabledWhen: this.disabledWhenSmallShort,
              breakpointMask: t
          }),
          this.anim.addKeyframe(this.scrollCopyEls[1], {
              start: h,
              cssClass: "frontmost",
              toggle: !0,
              anchors: n,
              ease: u,
              disabledWhen: this.disabledWhenSmallShort,
              breakpointMask: t
          }),
          this.anim.addKeyframe(this.hardwareScreenEls[1], {
              start: h,
              cssClass: "show-s",
              toggle: !0,
              anchors: n,
              disabledWhen: this.disabledWhenSmallShort,
              breakpointMask: t
          }),
          this.el.style.setProperty("--setup-video-end-S", h),
          this.stationaryCopyEls.forEach((e=>{
              this.anim.addKeyframe(e, {
                  start: "b - 100vh + 10vh",
                  end: "b - 100vh + 15vh",
                  opacity: [0, 1],
                  ease: u,
                  disabledWhen: l.filter((t=>"text-zoom" !== t)),
                  breakpointMask: t
              })
          }
          ))
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("enhanced")
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0)(i(103));
  const s = i(3)
    , n = i(176)
    , a = i(177);
  t.exports = class extends s {
      constructor(t) {
          super(t)
      }
      mounted() {
          this.anim.addEvent(this.el, {
              start: "t - 200vh",
              end: "b + 200vh",
              event: "wave-web-gl-init",
              onEnterOnce: ()=>this.init()
          })
      }
      init() {
          this.isPlaying = !1,
          this.prefersReducedMotion = document.documentElement.classList.contains("reduced-motion"),
          this.button = new r.default(this.el.querySelector(".play-pause-button")),
          this.button.disabled = !1,
          this.handleControl = this.handleControl.bind(this);
          const t = this.el.querySelector(".wave");
          this.fullWave = new a(t,n.Wave,["1", "all"],!0,!1);
          let e = new Promise((t=>this.fullWave.shaderPlayer.on("wave-ready", (()=>t()))));
          const i = this.fullWave.el.querySelector("canvas");
          i.setAttribute("aria-label", this.fullWave.el.dataset.ariaLabel),
          i.setAttribute("role", "img"),
          e.then((()=>{
              this.prefersReducedMotion || this.addDiscreteEvent({
                  start: "t - 100vh",
                  end: "b",
                  event: "play-wave-s",
                  onEnterOnce: ()=>this.playAnimation()
              }),
              this.fullWave.setTapering(0, 2),
              this.button.el.addEventListener("click", this.handleControl)
          }
          ))
      }
      playAnimation() {
          this.fullWave.play(),
          this.button.state = "pause",
          this.isPlaying = !0
      }
      pauseAnimation() {
          this.fullWave.pause(),
          this.button.state = "play",
          this.isPlaying = !1
      }
      handleControl() {
          this.isPlaying ? this.pauseAnimation() : this.playAnimation()
      }
  }
}
, function(t) {
  t.exports = JSON.parse('{"Wave":{"1":{"width":1000,"height":800,"globalTimeScale":1,"waveColor":"#ffffff","inverseColor":"#02cc01"},"2":{"amplitude":0.7149400986610289,"speed":0.5,"opacity":0.5570824524312896,"low":0.4894291754756871,"high":0.7600422832980972,"thickness":1.25,"smoothing":0.01},"3":{"amplitude":0.8,"speed":0.5,"opacity":0.24136715997181113,"low":0.4105003523608175,"high":0.726215644820296,"thickness":1.13,"smoothing":0.01},"4":{"amplitude":0.7487667371388301,"speed":0.5,"opacity":0.3653981677237491,"low":0.060958421423537704,"high":0.5683579985905567,"thickness":0.1,"smoothing":0.01},"5":{"amplitude":0.91,"speed":0.5,"opacity":0.20754052149400987,"low":0.20754052149400987,"high":0.6247357293868921,"thickness":0.56,"smoothing":0.01},"6":{"amplitude":0.5119802677942212,"speed":0.4668780831571529,"opacity":0.7825933756166314,"low":1,"high":0.23009161381254403,"thickness":0.38407329105003524,"smoothing":0.01},"7":{"amplitude":0.1624383368569415,"speed":0.5,"opacity":1,"low":0.35412262156448204,"high":0.7374911909795631,"thickness":0.2,"smoothing":0.1}}}')
}
, function(t, e, i) {
  "use strict";
  const r = i(178).ShaderPlayer2D
    , s = i(267);
  t.exports = class {
      constructor(t, e, i, n, a) {
          let o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 65;
          this.el = t,
          this.textures = i,
          this.animate = this.animate.bind(this),
          this.setTapering = this.setTapering.bind(this),
          this.opts = e[1];
          let h = this.opts.height
            , l = this.opts.width;
          a ? (l = this.opts.width / 2,
          h = this.opts.height / 2,
          n && (h = this.opts.height / 4)) : n && (h = this.opts.height / 2),
          this.frameRate = 1e3 / o,
          this.previousTime = 0,
          this.shaderValues = Object.values(e),
          this.shaderValues.shift();
          let u = {};
          i = {},
          u.showInverse = {
              type: "bool",
              value: n ? 1 : 0
          },
          u.taperIn = {
              type: "float",
              value: 0
          },
          u.taperOut = {
              type: "float",
              value: 0
          },
          u.waveColor = {
              type: "vec4",
              value: this.getNormalizedColor(this.opts.waveColor)
          },
          u.inverseColor = {
              type: "vec4",
              value: this.getNormalizedColor(this.opts.inverseColor)
          },
          this.shaderValues.forEach(((t,e)=>{
              for (let i in t)
                  u[`${i}${e + 1}`] = {
                      type: "float",
                      value: t[i]
                  }
          }
          )),
          this.textures.forEach(((t,e)=>{
              i[`slitTex ${e + 1}`] = {
                  name: t,
                  extension: "jpeg",
                  ignoreBreakpoint: !0,
                  retina: !1
              }
          }
          )),
          this.shaderPlayer = new r({
              fragmentShader: s,
              antialias: !0,
              sizes: {
                  defaults: {
                      width: l,
                      height: h
                  }
              },
              uniforms: u,
              textures: i
          }),
          this.shaderPlayer.setBasePath(`${window.location.origin}/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/textures`),
          this.shaderPlayer.on("textures-complete", function() {
              this.shaderPlayer.run(),
              this.animate(),
              this.shaderPlayer.trigger("wave-ready")
          }
          .bind(this)),
          this.shaderPlayer.on("update", function(t) {
              var e = t.time / 5e3 % 1;
              this.shaderPlayer.setUniform("progress", e)
          }
          .bind(this)),
          this.el.appendChild(this.shaderPlayer.el),
          this.shaderPlayer.load(),
          this.count = 0
      }
      play() {
          this.shaderPlayer.run(),
          this.isReady = !0
      }
      pause() {
          this.shaderPlayer.cancel(),
          this.isReady = !1
      }
      setTapering(t, e) {
          this.shaderPlayer.setUniform("taperIn", t),
          this.shaderPlayer.setUniform("taperOut", e)
      }
      animate() {
          let t, e;
          this.isReady && (t = Date.now(),
          e = t - this.previousTime,
          e >= this.frameRate && (this.count += this.opts.globalTimeScale / 100,
          this.shaderPlayer.setUniform("time", this.count),
          this.shaderPlayer.render(),
          this.previousTime = t)),
          requestAnimationFrame(this.animate)
      }
      getNormalizedColor(t) {
          let e = (i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t)) ? [parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16)] : null;
          var i;
          return e = e.map((t=>t / 255)),
          e.push(1),
          e
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      ShaderPlayer2D: i(179)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(180)
    , s = i(202)
    , n = i(203)
    , a = i(266)
    , o = i(4).EventEmitterMicro
    , h = i(82)
    , l = i(113)
    , u = i(8)
    , c = i(84).DOMEmitter
    , d = i(121).Viewport
    , f = {
      sizes: {},
      vertexShader: a,
      antialias: !1,
      preserveDrawingBuffer: !1,
      transparent: !1,
      mipmap: 1,
      reloadOnBreakpoint: !1,
      clearColor: 0,
      autoClearColor: !1,
      allowXLarge: !1,
      backgroundOpacity: 0,
      vertexShadersPath: null,
      fragmentShadersPath: null,
      invertX: !1,
      invertY: !1,
      uniforms: {},
      minFilter: "LINEAR_MIPMAP_LINEAR",
      magFilter: "LINEAR"
  }
    , p = "update"
    , m = "draw"
    , g = "texture-load-start"
    , _ = "texture-reload-start"
    , y = "texture-load"
    , v = "textures-complete"
    , b = "resize";
  function E(t) {
      o.call(this),
      this.options = h(f, t || {}),
      this.rafEmitter = t.rafEmitter || new u,
      this.className = t.className || this.className,
      this.activeClassName = t.activeClassName || this.activeClassName,
      this._currentSize = {},
      this._textureController = null,
      this._texturesReady = !0,
      this._shouldUpdate = !0,
      this._progressValue = null,
      this._renderingReady = !1,
      this._didBindBreakpoint = !1,
      this._renderCount = 0,
      this._didRender = !1,
      this._shouldUpdate = !1,
      this._shouldResizeOnDraw = !1,
      this._shouldRenderThisFrame = !1,
      this._shouldResizeOnDrawThisFrame = !1,
      this._textureKeyMap = {},
      this._textureValMap = {},
      this._textureUpdateMap = {},
      this._pointer = [0, 0],
      this.devicePixelRatio = this._getDevicePixelRatio(),
      this._breakpointName = this.getCurrentBreakpointName(),
      this._setBreakpointSizes(),
      this._boundOnUpdate = this._onUpdate.bind(this),
      this._boundOnDraw = this._onDraw.bind(this),
      this.initialize(),
      this.domEmitter = new c(this.el),
      this.rafEmitter.on("update", this._boundOnUpdate),
      this.rafEmitter.on("draw", this._boundOnDraw),
      (this._getSizesLength() > 1 || this.options.reloadOnBreakpoint) && (this._didBindBreakpoint = !0,
      this._boundOnShaderPlayer2DBreakpoint = this._onShaderPlayer2DBreakpoint.bind(this),
      d.on("breakpoint", this._boundOnShaderPlayer2DBreakpoint)),
      this._bindDOMEvents()
  }
  var w = E.prototype = Object.create(o.prototype);
  w.rendersBeforeVisible = 1,
  w.className = "webgl-object",
  w.activeClassName = "active",
  w.initialize = function() {
      this.options.uniforms = this._appendIncludedUniforms(this.options.uniforms),
      this.renderer = this.createRenderer(),
      this.options.textures && this._setTextureUniforms(this.options.textures),
      this._initializeRenderer(),
      this.el = this.renderer.el,
      this.el.className = this.className,
      this.setSize()
  }
  ,
  w.load = function() {
      this._textureController && (this.trigger(g),
      this._textureController.load())
  }
  ,
  w.run = function() {
      this._shouldRender = !0,
      this._run()
  }
  ,
  w.cancel = function() {
      this.rafEmitter.cancel()
  }
  ,
  w.render = function() {
      this._shouldRender = !0,
      this._render()
  }
  ,
  w.createRenderer = function() {
      return new r(this,this._getRendererOptions())
  }
  ,
  w.setClearColor = function(t) {
      t = t || this.options.clearColor,
      this.options.clearColor = t,
      this.renderer.setClearColor(this._getClearColor(t))
  }
  ,
  w.setBackgroundOpacity = function(t) {
      this.options.backgroundOpacity = t,
      this.setClearColor()
  }
  ,
  w.setTextureMagFilter = function(t, e) {
      var i = this.getTexture(t);
      return i || "undefined" === this.renderer.context[e] ? (i.texture.magFilter = this.renderer.context[e],
      !0) : null
  }
  ,
  w.setTextureMinFilter = function(t, e) {
      var i = this.getTexture(t);
      return i || "undefined" === this.renderer.context[e] ? (i.texture.minFilter = this.renderer.context[e],
      !0) : null
  }
  ,
  w.createTextureController = function(t) {
      t = t || {},
      this.options.allowXLarge && (t.allowXLarge = !0),
      this.options.magFilter && (t.magFilter = this.options.magFilter),
      this.options.minFilter && (t.minFilter = this.options.minFilter),
      this._textureController = new n(this,t),
      this._boundOnTextureControllerLoad = this._onTextureControllerLoad.bind(this),
      this._boundOnTextureControllerComplete = this._onTextureControllerComplete.bind(this),
      this._boundOnTextureControllerReadyStateChanged = this._onTextureControllerReadyStateChanged.bind(this),
      this._textureController.on("load", this._boundOnTextureControllerLoad),
      this._textureController.on("complete", this._boundOnTextureControllerComplete),
      this._textureController.on("readystatechanged", this._boundOnTextureControllerReadyStateChanged)
  }
  ,
  w.getSizesForBreakpoint = function(t) {
      return t = t || d.getBreakpoint().name,
      this.options.sizes[t] || (t = "defaults"),
      {
          name: t,
          sizes: this.options.sizes[t]
      }
  }
  ,
  w.getUniform = function(t) {
      return this.renderer ? this.renderer.getUniform(t) : null
  }
  ,
  w.setUniform = function(t, e) {
      return !!this.renderer && this.renderer.setUniform(t, e)
  }
  ,
  w.getAttribute = function(t) {
      return this.renderer ? this.renderer.getAttribute(t) : null
  }
  ,
  w.setAttribute = function(t, e) {
      return !!this.renderer && this.renderer.setAttribute(t, e)
  }
  ,
  w.setUniforms = function(t) {
      if ("object" != typeof t)
          return !1;
      var e;
      for (e in t)
          t.hasOwnProperty(e) && this.setUniform(e, t[e])
  }
  ,
  w.setSize = function(t, e) {
      void 0 !== t && (this.width = t),
      void 0 !== e && (this.height = e),
      this._shouldResizeOnDraw = !0,
      this._run()
  }
  ,
  w.setBasePath = function(t) {
      this._textureController && (this._textureController.options.basePath = t)
  }
  ,
  w.setActive = function() {
      this.el.classList.add(this.activeClassName),
      this._renderingReady = !0
  }
  ,
  w.setInactive = function() {
      this.el.classList.remove(this.activeClassName),
      this._renderCount = 0,
      this._renderingReady = !1
  }
  ,
  w.getTexture = function(t) {
      return this.renderer && this._textureController ? (void 0 !== this._textureKeyMap[t] && (t = this._textureKeyMap[t]),
      this._textureController.getTexture(t)) : null
  }
  ,
  w.setTexture = function(t, e) {}
  ,
  w.getCurrentBreakpointName = function() {
      var t = d.getBreakpoint().name;
      return this.options.allowXLarge || "xlarge" !== t || (t = "large"),
      t
  }
  ,
  w.getTextures = function() {
      var t, e = {};
      for (t in this._textureKeyMap)
          this._textureKeyMap.hasOwnProperty(t) && (e[t] = this.getTexture(t));
      return e
  }
  ,
  w.getTextureControllerTextures = function() {
      if (!this._textureController)
          return null;
      var t, e = {}, i = this._textureController._textureLoader.textures;
      for (t in i)
          i.hasOwnProperty(t) && (e[t] = i[t].texture);
      return e
  }
  ,
  w.refreshTexture = function(t) {
      this._textureUpdateMap[t] = !0
  }
  ,
  w.destroy = function() {
      var t;
      for (t in this.rafEmitter.destroy(),
      this._textureController && this._textureController.destroy(),
      this._didBindBreakpoint && d.off("breakpoint", this._boundOnShaderPlayer2DBreakpoint),
      this.domEmitter.destroy(),
      this)
          this.hasOwnProperty(t) && (this[t] = null);
      o.prototype.destroy.call(this)
  }
  ,
  w._onTextureControllerLoad = function(t) {
      this.trigger(y, t)
  }
  ,
  w._onTextureControllerComplete = function() {
      this._texturesReady = !0,
      this.trigger(v)
  }
  ,
  w._onTextureControllerReadyStateChanged = function(t) {
      this._texturesReady = t.texturesReady
  }
  ,
  w._setTextureUniforms = function(t) {
      var e, i, r, s = this.renderer.context;
      for (e in t)
          t.hasOwnProperty(e) && (i = (r = t[e]).name || e,
          this._textureController || this.createTextureController(),
          r.el || this._texturesRequired++,
          this._textureKeyMap[e] = i,
          this._textureValMap[i] = e,
          this.options.uniforms[e] = {
              type: "sampler2D",
              value: this._textureController.createTexture(s, i, r)
          })
  }
  ,
  w._setTime = function(t) {
      this.setUniform("time", t / 1e3)
  }
  ,
  w._setResolution = function() {
      this.setUniform("resolution", [this.width, this.height])
  }
  ,
  w._setPointer = function(t, e) {
      this.options.invertX && (t = 1 - t),
      this.options.invertY && (e = 1 - e),
      this._pointer[0] = t,
      this._pointer[1] = e,
      this._pointerChanged = !0,
      this.trigger("pointer", this._pointer)
  }
  ,
  w._getDevicePixelRatio = function() {
      return this.options.devicePixelRatio ? this.options.devicePixelRatio : window.devicePixelRatio || 1
  }
  ,
  w._onShaderPlayer2DBreakpoint = function(t) {
      var e = this.getCurrentBreakpointName();
      this._breakpointName !== e && (this._breakpointName = e,
      this._shouldChangeSize(e) && this._setBreakpointSizes(),
      this.options.reloadOnBreakpoint && this._textureController && (this._texturesReady = !1,
      this.setInactive(),
      this._textureController.load(),
      this.trigger(_)))
  }
  ,
  w._getSizesLength = function() {
      return Object.keys(this.options.sizes).length
  }
  ,
  w._shouldChangeSize = function(t) {
      var e = this.getSizesForBreakpoint(t);
      return e.sizes.width !== this._currentSize.sizes.width || e.sizes.height !== this._currentSize.sizes.height
  }
  ,
  w._setBreakpointSizes = function() {
      var t = this.getSizesForBreakpoint();
      this._currentSize = t,
      this.setSize(t.sizes.width, t.sizes.height),
      this.trigger(b)
  }
  ,
  w._appendIncludedUniforms = function(t) {
      return (t = t || {}).progress || (t.progress = {
          type: "float",
          value: 0
      }),
      t.time || (t.time = {
          type: "float",
          value: 0
      }),
      t.resolution || (t.resolution = {
          type: "vec2",
          value: [this.width, this.height]
      }),
      t.pointer || (t.pointer = {
          type: "vec2",
          value: [0, 0]
      }),
      l(t, !0)
  }
  ,
  w._setInitialUniforms = function() {
      var t;
      if (this.options && this.options.uniforms)
          for (t in this.options.uniforms)
              this.options.uniforms.hasOwnProperty(t) && this.setUniform(t, this.options.uniforms[t].value)
  }
  ,
  w._onUpdate = function(t) {
      this._shouldRenderThisFrame = this._shouldRender,
      this._shouldResizeOnDrawThisFrame = this._shouldResizeOnDraw,
      this._shouldRender = !1,
      this._shouldResizeOnDraw = !1,
      this._shouldRenderThisFrame && this.trigger(p, t)
  }
  ,
  w._onDraw = function(t) {
      this._shouldResizeOnDrawThisFrame && this._setSize(),
      this._pointerChanged && this.setUniform("pointer", this._pointer),
      this._shouldRenderThisFrame && (this._setTime(t.time),
      this.trigger(m, t),
      this._render())
  }
  ,
  w._refreshTexture = function(t) {
      var e = this.getTexture(t);
      if (!e)
          return null;
      this.setUniform(t, e.texture.bind(e.unit)),
      e.texture.setPixels(e.el)
  }
  ,
  w._bindDOMEvents = function() {
      this.domEmitter.on("mousemove", this._handleMouseMove, this),
      this.domEmitter.on("touchmove", this._handleTouchMove, this)
  }
  ,
  w._getClearColor = function(t) {
      var e = new s(t);
      return e.z = this.options.backgroundOpacity,
      e
  }
  ,
  w._initializeRenderer = function() {
      this.renderer.initialize(this._getRendererOptions())
  }
  ,
  w._getRendererOptions = function() {
      return {
          clearColor: this._getClearColor(this.options.clearColor),
          transparent: this.options.transparent,
          fragmentShader: this.options.fragmentShader,
          vertexShader: this.options.vertexShader,
          uniforms: this.options.uniforms,
          antialias: this.options.antialias
      }
  }
  ,
  w._handleMouseMove = function(t) {
      this._setPointer(t.originalEvent.offsetX / this.width, 1 - t.originalEvent.offsetY / this.height)
  }
  ,
  w._handleTouchMove = function(t) {
      this._setPointer(t.originalEvent.touches[0].offsetX / this.width, 1 - t.originalEvent.touches[0].offsetY / this.height)
  }
  ,
  w._run = function() {
      this.rafEmitter.run()
  }
  ,
  w._render = function() {
      if (this.renderer && this._texturesReady) {
          if (this._didRender || (this._setInitialUniforms(),
          this._didRender = !0,
          this.run()),
          this._renderCount++,
          !this._renderingReady) {
              if (this._renderCount < this.rendersBeforeVisible)
                  return;
              this.setActive()
          }
          this.renderer.render(this.scene, this.camera)
      }
  }
  ,
  w._setSize = function() {
      this._setResolution(),
      this.renderer && this.renderer.setSize(this.width * this.devicePixelRatio, this.height * this.devicePixelRatio, this.options.mipmap),
      this.el && (this.el.style.width = this.width + "px",
      this.el.style.height = this.height + "px")
  }
  ,
  t.exports = E
}
, function(t, e, i) {
  "use strict";
  var r, s = i(4).EventEmitterMicro, n = i(181), a = i(182), o = i(199), h = {
      clearDepth: 1,
      clearColor: [0, 0, 0, 0],
      clearStencil: 0
  }, l = ["OES_texture_float", "OES_texture_float_linear", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_standard_derivatives"], u = function(t, e) {
      s.call(this),
      this.options = this._initializeOptions(e),
      this.controller = t;
      var i = document.createElement("canvas")
        , r = i.getContext("webgl", this.options) || i.getContext("experimental-webgl", this.options);
      if (!r)
          return this.trigger("error", "Unable to initialize WebGL"),
          null;
      this.el = i,
      this.context = r
  };
  (r = u.prototype = Object.create(u.prototype)).initialize = function(t) {
      var e = this.context;
      this.options = this._initializeOptions(t),
      this._shouldClearColor = !0,
      this.options._transformedUniforms = this.transformShaderParameters(this.options.uniforms),
      this.options.attributes && (this.options._transformedAttributes = this.transformShaderParameters(this.options.attributes));
      var i, r = {};
      for (i in r.clearFlags = void 0 === this.options.clearFlags ? e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT : this.options.clearFlags,
      h)
          h.hasOwnProperty(i) && (r[i] = h[i],
          void 0 !== this.options[i] && (r[i] = this.options[i]));
      this._renderSettings = r,
      this.shader = this.createShader(e, this.options.vertexShader, this.options.fragmentShader, this.options._transformedUniforms, this.options._transformedAttributes),
      e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0),
      e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
      this.extensions = new n(this.context);
      var s = l.length;
      for (i = 0; i < s; i++)
          this.extensions.get(l[i]);
      this.bindShader()
  }
  ,
  r.createShader = function(t, e, i, r, s) {
      var n = this._normalizeShaderParams({
          context: t,
          vertexShader: e,
          fragmentShader: i,
          uniforms: r || [],
          attributes: s || []
      });
      return o(n.context, n.vertexShader, n.fragmentShader, n.uniforms, n.attributes)
  }
  ,
  r.linkProgram = function(t, e, i) {
      var r = t.createProgram();
      t.attachShader(r, e),
      t.attachShader(r, i),
      t.linkProgram(r),
      t.useProgram(r)
  }
  ,
  r.bindShader = function() {
      this.shader.bind()
  }
  ,
  r.bindTextures = function() {
      if (this.controller && this.controller.options && this.controller.options.textures) {
          var t, e = this.controller.options.textures;
          for (t in e)
              e.hasOwnProperty(t) && this.bindTexture(t)
      }
  }
  ,
  r.bindTexture = function(t, e) {
      var i = this.controller.getTexture(t);
      if (!i)
          return !1;
      e || this.controller._textureUpdateMap[t] ? (this.controller._refreshTexture(t),
      this.controller._textureUpdateMap[t] = !1) : this.setUniform(t, i.texture.bind(i.unit))
  }
  ,
  r.setClearColor = function(t) {
      this._renderSettings.clearColor = t,
      this._shouldClearColor = !0
  }
  ,
  r.clearColor = function() {
      var t = this.context
        , e = this._renderSettings;
      t.bindFramebuffer(t.FRAMEBUFFER, null),
      e.clearFlags & t.STENCIL_BUFFER_BIT && t.clearStencil(e.clearStencil),
      e.clearFlags & t.COLOR_BUFFER_BIT && t.clearColor(e.clearColor.w, e.clearColor.x, e.clearColor.y, e.clearColor.z),
      e.clearFlags & t.DEPTH_BUFFER_BIT && t.clearDepth(e.clearDepth),
      e.clearFlags && t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT | t.STENCIL_BUFFER_BIT)
  }
  ,
  r.render = function() {
      (this.options.autoClearColor || this._shouldClearColor) && (this.clearColor(),
      this._shouldClearColor = !1),
      this.bindShader(),
      this.bindTextures(),
      a(this.context)
  }
  ,
  r.updateShader = function(t) {
      (t = t || {}).uniforms && (t.uniforms = this.transformShaderParameters(t.uniforms)),
      t.vertexShader = t.vertexShader || this.options.vertexShader,
      t.fragmentShader = t.fragmentShader || this.options.fragmentShader,
      t.uniforms = t.uniforms || this.options.uniforms,
      t.attributes = t.attributes || this.options.attributes,
      t = this._normalizeShaderParams(t),
      this.shader.dispose(),
      this.shader = this.createShader(this.context, t.vertexShader, t.fragmentShader, t.uniforms, t.attributes),
      this.options.vertexShader = t.vertexShader,
      this.options.fragmentShader = t.fragmentShader,
      this.options.uniforms = t.uniforms,
      this.options.attributes = t.attributes
  }
  ,
  r.getUniform = function(t) {
      return this._hasUniform(t) ? this.options.uniforms[t].value : null
  }
  ,
  r.setUniform = function(t, e) {
      this._hasUniform(t) && (this.options.uniforms[t].value = e,
      this.shader.uniforms[t] = e)
  }
  ,
  r.getAttribute = function(t, e) {
      return this.shader ? this.shader.attributes[t] : null
  }
  ,
  r.setAttribute = function(t, e) {
      this.shader && (this.shader.attributes[t] = e)
  }
  ,
  r.setSize = function(t, e, i) {
      var r = t * i
        , s = e * i;
      this.el.setAttribute("width", r),
      this.el.setAttribute("height", s),
      this.el.style.width = t + "px",
      this.el.style.height = e + "px",
      this.context.viewport(0, 0, 0 | r, 0 | s)
  }
  ,
  r.transformShaderParameters = function(t) {
      t = t || {};
      var e, i = [];
      for (e in t)
          t.hasOwnProperty(e) && i.push({
              name: e,
              type: t[e].type
          });
      return i
  }
  ,
  r.destroy = function() {
      this.shader.dispose(),
      s.prototype.destroy.call(this)
  }
  ,
  r._normalizeShaderParams = function(t) {
      return !1 !== this.options.setFloatPrecision && (t.fragmentShader = "precision highp float;\n" + t.fragmentShader),
      t
  }
  ,
  r._initializeOptions = function(t) {
      return t.alpha = t.transparent,
      t
  }
  ,
  r._hasUniform = function(t) {
      return this.options || this.options.uniforms || this.options.uniforms[t]
  }
  ,
  t.exports = u
}
, function(t, e, i) {
  "use strict";
  var r = function(t) {
      this.extensions = {},
      this.context = t
  };
  r.prototype.get = function(t) {
      if (void 0 !== this.extensions[t])
          return this.extensions[t];
      var e, i = this.context;
      return null === (e = "EXT_texture_filter_anisotropic" === t ? i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic") : "WEBGL_compressed_texture_s3tc" === t ? i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc") : "WEBGL_compressed_texture_pvrtc" === t ? i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc") : i.getExtension(t)) ? (this.extensions[t] = null,
      null) : (this.extensions[t] = e,
      e)
  }
  ,
  t.exports = r
}
, function(t, e, i) {
  "use strict";
  var r = "undefined" == typeof WeakMap ? i(183) : WeakMap
    , s = i(184)
    , n = i(196)
    , a = new r;
  t.exports = function(t) {
      var e = a.get(t)
        , i = e && (e._triangleBuffer.handle || e._triangleBuffer.buffer);
      if (!i || !t.isBuffer(i)) {
          var r = s(t, new Float32Array([-1, -1, -1, 4, 4, -1]));
          (e = n(t, [{
              buffer: r,
              type: t.FLOAT,
              size: 2
          }]))._triangleBuffer = r,
          a.set(t, e)
      }
      e.bind(),
      t.drawArrays(t.TRIANGLES, 0, 3),
      e.unbind()
  }
}
, function(t, e) {
  !function() {
      "use strict";
      if ("undefined" == typeof ses || !ses.ok || ses.ok()) {
          "undefined" != typeof ses && (ses.weakMapPermitHostObjects = g);
          var e = !1;
          if ("function" == typeof WeakMap) {
              var i = WeakMap;
              if ("undefined" != typeof navigator && /Firefox/.test(navigator.userAgent))
                  ;
              else {
                  var r = new i
                    , s = Object.freeze({});
                  if (r.set(s, 1),
                  1 === r.get(s))
                      return void (t.exports = WeakMap);
                  e = !0
              }
          }
          Object.prototype.hasOwnProperty;
          var n = Object.getOwnPropertyNames
            , a = Object.defineProperty
            , o = Object.isExtensible
            , h = "weakmap:"
            , l = "weakmap:ident:" + Math.random() + "___";
          if ("undefined" != typeof crypto && "function" == typeof crypto.getRandomValues && "function" == typeof ArrayBuffer && "function" == typeof Uint8Array) {
              var u = new ArrayBuffer(25)
                , c = new Uint8Array(u);
              crypto.getRandomValues(c),
              l = "weakmap:rand:" + Array.prototype.map.call(c, (function(t) {
                  return (t % 36).toString(36)
              }
              )).join("") + "___"
          }
          if (a(Object, "getOwnPropertyNames", {
              value: function(t) {
                  return n(t).filter(_)
              }
          }),
          "getPropertyNames"in Object) {
              var d = Object.getPropertyNames;
              a(Object, "getPropertyNames", {
                  value: function(t) {
                      return d(t).filter(_)
                  }
              })
          }
          !function() {
              var t = Object.freeze;
              a(Object, "freeze", {
                  value: function(e) {
                      return y(e),
                      t(e)
                  }
              });
              var e = Object.seal;
              a(Object, "seal", {
                  value: function(t) {
                      return y(t),
                      e(t)
                  }
              });
              var i = Object.preventExtensions;
              a(Object, "preventExtensions", {
                  value: function(t) {
                      return y(t),
                      i(t)
                  }
              })
          }();
          var f = !1
            , p = 0
            , m = function() {
              this instanceof m || b();
              var t = []
                , e = []
                , i = p++;
              return Object.create(m.prototype, {
                  get___: {
                      value: v((function(r, s) {
                          var n, a = y(r);
                          return a ? i in a ? a[i] : s : (n = t.indexOf(r)) >= 0 ? e[n] : s
                      }
                      ))
                  },
                  has___: {
                      value: v((function(e) {
                          var r = y(e);
                          return r ? i in r : t.indexOf(e) >= 0
                      }
                      ))
                  },
                  set___: {
                      value: v((function(r, s) {
                          var n, a = y(r);
                          return a ? a[i] = s : (n = t.indexOf(r)) >= 0 ? e[n] = s : (n = t.length,
                          e[n] = s,
                          t[n] = r),
                          this
                      }
                      ))
                  },
                  delete___: {
                      value: v((function(r) {
                          var s, n, a = y(r);
                          return a ? i in a && delete a[i] : !((s = t.indexOf(r)) < 0) && (n = t.length - 1,
                          t[s] = void 0,
                          e[s] = e[n],
                          t[s] = t[n],
                          t.length = n,
                          e.length = n,
                          !0)
                      }
                      ))
                  }
              })
          };
          m.prototype = Object.create(Object.prototype, {
              get: {
                  value: function(t, e) {
                      return this.get___(t, e)
                  },
                  writable: !0,
                  configurable: !0
              },
              has: {
                  value: function(t) {
                      return this.has___(t)
                  },
                  writable: !0,
                  configurable: !0
              },
              set: {
                  value: function(t, e) {
                      return this.set___(t, e)
                  },
                  writable: !0,
                  configurable: !0
              },
              delete: {
                  value: function(t) {
                      return this.delete___(t)
                  },
                  writable: !0,
                  configurable: !0
              }
          }),
          "function" == typeof i ? function() {
              function r() {
                  this instanceof m || b();
                  var t, r = new i, s = void 0, n = !1;
                  return t = e ? function(t, e) {
                      return r.set(t, e),
                      r.has(t) || (s || (s = new m),
                      s.set(t, e)),
                      this
                  }
                  : function(t, e) {
                      if (n)
                          try {
                              r.set(t, e)
                          } catch (i) {
                              s || (s = new m),
                              s.set___(t, e)
                          }
                      else
                          r.set(t, e);
                      return this
                  }
                  ,
                  Object.create(m.prototype, {
                      get___: {
                          value: v((function(t, e) {
                              return s ? r.has(t) ? r.get(t) : s.get___(t, e) : r.get(t, e)
                          }
                          ))
                      },
                      has___: {
                          value: v((function(t) {
                              return r.has(t) || !!s && s.has___(t)
                          }
                          ))
                      },
                      set___: {
                          value: v(t)
                      },
                      delete___: {
                          value: v((function(t) {
                              var e = !!r.delete(t);
                              return s && s.delete___(t) || e
                          }
                          ))
                      },
                      permitHostObjects___: {
                          value: v((function(t) {
                              if (t !== g)
                                  throw new Error("bogus call to permitHostObjects___");
                              n = !0
                          }
                          ))
                      }
                  })
              }
              e && "undefined" != typeof Proxy && (Proxy = void 0),
              r.prototype = m.prototype,
              t.exports = r,
              Object.defineProperty(WeakMap.prototype, "constructor", {
                  value: WeakMap,
                  enumerable: !1,
                  configurable: !0,
                  writable: !0
              })
          }() : ("undefined" != typeof Proxy && (Proxy = void 0),
          t.exports = m)
      }
      function g(t) {
          t.permitHostObjects___ && t.permitHostObjects___(g)
      }
      function _(t) {
          return !(t.substr(0, h.length) == h && "___" === t.substr(t.length - 3))
      }
      function y(t) {
          if (t !== Object(t))
              throw new TypeError("Not an object: " + t);
          var e = t[l];
          if (e && e.key === t)
              return e;
          if (o(t)) {
              e = {
                  key: t
              };
              try {
                  return a(t, l, {
                      value: e,
                      writable: !1,
                      enumerable: !1,
                      configurable: !1
                  }),
                  e
              } catch (t) {
                  return
              }
          }
      }
      function v(t) {
          return t.prototype = null,
          Object.freeze(t)
      }
      function b() {
          f || "undefined" == typeof console || (f = !0,
          console.warn("WeakMap should be invoked as new WeakMap(), not WeakMap(). This will be an error in the future."))
      }
  }()
}
, function(t, e, i) {
  "use strict";
  var r = i(104)
    , s = i(107)
    , n = i(108)
    , a = ["uint8", "uint8_clamped", "uint16", "uint32", "int8", "int16", "int32", "float32"];
  function o(t, e, i, r, s) {
      this.gl = t,
      this.type = e,
      this.handle = i,
      this.length = r,
      this.usage = s
  }
  var h = o.prototype;
  function l(t, e, i, r, s, n) {
      var a = s.length * s.BYTES_PER_ELEMENT;
      if (n < 0)
          return t.bufferData(e, s, r),
          a;
      if (a + n > i)
          throw new Error("gl-buffer: If resizing buffer, must not specify offset");
      return t.bufferSubData(e, n, s),
      i
  }
  function u(t, e) {
      for (var i = r.malloc(t.length, e), s = t.length, n = 0; n < s; ++n)
          i[n] = t[n];
      return i
  }
  h.bind = function() {
      this.gl.bindBuffer(this.type, this.handle)
  }
  ,
  h.unbind = function() {
      this.gl.bindBuffer(this.type, null)
  }
  ,
  h.dispose = function() {
      this.gl.deleteBuffer(this.handle)
  }
  ,
  h.update = function(t, e) {
      if ("number" != typeof e && (e = -1),
      this.bind(),
      "object" == typeof t && void 0 !== t.shape) {
          var i = t.dtype;
          if (a.indexOf(i) < 0 && (i = "float32"),
          this.type === this.gl.ELEMENT_ARRAY_BUFFER)
              i = gl.getExtension("OES_element_index_uint") && "uint16" !== i ? "uint32" : "uint16";
          if (i === t.dtype && function(t, e) {
              for (var i = 1, r = e.length - 1; r >= 0; --r) {
                  if (e[r] !== i)
                      return !1;
                  i *= t[r]
              }
              return !0
          }(t.shape, t.stride))
              0 === t.offset && t.data.length === t.shape[0] ? this.length = l(this.gl, this.type, this.length, this.usage, t.data, e) : this.length = l(this.gl, this.type, this.length, this.usage, t.data.subarray(t.offset, t.shape[0]), e);
          else {
              var o = r.malloc(t.size, i)
                , h = n(o, t.shape);
              s.assign(h, t),
              this.length = l(this.gl, this.type, this.length, this.usage, e < 0 ? o : o.subarray(0, t.size), e),
              r.free(o)
          }
      } else if (Array.isArray(t)) {
          var c;
          c = this.type === this.gl.ELEMENT_ARRAY_BUFFER ? u(t, "uint16") : u(t, "float32"),
          this.length = l(this.gl, this.type, this.length, this.usage, e < 0 ? c : c.subarray(0, t.length), e),
          r.free(c)
      } else if ("object" == typeof t && "number" == typeof t.length)
          this.length = l(this.gl, this.type, this.length, this.usage, t, e);
      else {
          if ("number" != typeof t && void 0 !== t)
              throw new Error("gl-buffer: Invalid data type");
          if (e >= 0)
              throw new Error("gl-buffer: Cannot specify offset when resizing buffer");
          (t |= 0) <= 0 && (t = 1),
          this.gl.bufferData(this.type, 0 | t, this.usage),
          this.length = t
      }
  }
  ,
  t.exports = function(t, e, i, r) {
      if (i = i || t.ARRAY_BUFFER,
      r = r || t.DYNAMIC_DRAW,
      i !== t.ARRAY_BUFFER && i !== t.ELEMENT_ARRAY_BUFFER)
          throw new Error("gl-buffer: Invalid type for webgl buffer, must be either gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER");
      if (r !== t.DYNAMIC_DRAW && r !== t.STATIC_DRAW && r !== t.STREAM_DRAW)
          throw new Error("gl-buffer: Invalid usage for buffer, must be either gl.DYNAMIC_DRAW, gl.STATIC_DRAW or gl.STREAM_DRAW");
      var s = t.createBuffer()
        , n = new o(t,i,s,0,r);
      return n.update(e),
      n
  }
}
, function(t, e, i) {
  "use strict";
  function r(t) {
      var e = 32;
      return (t &= -t) && e--,
      65535 & t && (e -= 16),
      16711935 & t && (e -= 8),
      252645135 & t && (e -= 4),
      858993459 & t && (e -= 2),
      1431655765 & t && (e -= 1),
      e
  }
  e.INT_BITS = 32,
  e.INT_MAX = 2147483647,
  e.INT_MIN = -1 << 31,
  e.sign = function(t) {
      return (t > 0) - (t < 0)
  }
  ,
  e.abs = function(t) {
      var e = t >> 31;
      return (t ^ e) - e
  }
  ,
  e.min = function(t, e) {
      return e ^ (t ^ e) & -(t < e)
  }
  ,
  e.max = function(t, e) {
      return t ^ (t ^ e) & -(t < e)
  }
  ,
  e.isPow2 = function(t) {
      return !(t & t - 1 || !t)
  }
  ,
  e.log2 = function(t) {
      var e, i;
      return e = (t > 65535) << 4,
      e |= i = ((t >>>= e) > 255) << 3,
      e |= i = ((t >>>= i) > 15) << 2,
      (e |= i = ((t >>>= i) > 3) << 1) | (t >>>= i) >> 1
  }
  ,
  e.log10 = function(t) {
      return t >= 1e9 ? 9 : t >= 1e8 ? 8 : t >= 1e7 ? 7 : t >= 1e6 ? 6 : t >= 1e5 ? 5 : t >= 1e4 ? 4 : t >= 1e3 ? 3 : t >= 100 ? 2 : t >= 10 ? 1 : 0
  }
  ,
  e.popCount = function(t) {
      return 16843009 * ((t = (858993459 & (t -= t >>> 1 & 1431655765)) + (t >>> 2 & 858993459)) + (t >>> 4) & 252645135) >>> 24
  }
  ,
  e.countTrailingZeros = r,
  e.nextPow2 = function(t) {
      return t += 0 === t,
      --t,
      t |= t >>> 1,
      t |= t >>> 2,
      t |= t >>> 4,
      t |= t >>> 8,
      (t |= t >>> 16) + 1
  }
  ,
  e.prevPow2 = function(t) {
      return t |= t >>> 1,
      t |= t >>> 2,
      t |= t >>> 4,
      t |= t >>> 8,
      (t |= t >>> 16) - (t >>> 1)
  }
  ,
  e.parity = function(t) {
      return t ^= t >>> 16,
      t ^= t >>> 8,
      t ^= t >>> 4,
      27030 >>> (t &= 15) & 1
  }
  ;
  var s = new Array(256);
  !function(t) {
      for (var e = 0; e < 256; ++e) {
          var i = e
            , r = e
            , s = 7;
          for (i >>>= 1; i; i >>>= 1)
              r <<= 1,
              r |= 1 & i,
              --s;
          t[e] = r << s & 255
      }
  }(s),
  e.reverse = function(t) {
      return s[255 & t] << 24 | s[t >>> 8 & 255] << 16 | s[t >>> 16 & 255] << 8 | s[t >>> 24 & 255]
  }
  ,
  e.interleave2 = function(t, e) {
      return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t &= 65535) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e &= 65535) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
  }
  ,
  e.deinterleave2 = function(t, e) {
      return (t = 65535 & ((t = 16711935 & ((t = 252645135 & ((t = 858993459 & ((t = t >>> e & 1431655765) | t >>> 1)) | t >>> 2)) | t >>> 4)) | t >>> 16)) << 16 >> 16
  }
  ,
  e.interleave3 = function(t, e, i) {
      return t = 1227133513 & ((t = 3272356035 & ((t = 251719695 & ((t = 4278190335 & ((t &= 1023) | t << 16)) | t << 8)) | t << 4)) | t << 2),
      (t |= (e = 1227133513 & ((e = 3272356035 & ((e = 251719695 & ((e = 4278190335 & ((e &= 1023) | e << 16)) | e << 8)) | e << 4)) | e << 2)) << 1) | (i = 1227133513 & ((i = 3272356035 & ((i = 251719695 & ((i = 4278190335 & ((i &= 1023) | i << 16)) | i << 8)) | i << 4)) | i << 2)) << 2
  }
  ,
  e.deinterleave3 = function(t, e) {
      return (t = 1023 & ((t = 4278190335 & ((t = 251719695 & ((t = 3272356035 & ((t = t >>> e & 1227133513) | t >>> 2)) | t >>> 4)) | t >>> 8)) | t >>> 16)) << 22 >> 22
  }
  ,
  e.nextCombination = function(t) {
      var e = t | t - 1;
      return e + 1 | (~e & -~e) - 1 >>> r(t) + 1
  }
}
, function(t, e, i) {
  "use strict";
  (function(t) {
      /*!
* The buffer module from node.js, for the browser.
*
* @author   Feross Aboukhadijeh <http://feross.org>
* @license  MIT
*/
      var r = i(187)
        , s = i(188)
        , n = i(189);
      function a() {
          return h.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
      }
      function o(t, e) {
          if (a() < e)
              throw new RangeError("Invalid typed array length");
          return h.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = h.prototype : (null === t && (t = new h(e)),
          t.length = e),
          t
      }
      function h(t, e, i) {
          if (!(h.TYPED_ARRAY_SUPPORT || this instanceof h))
              return new h(t,e,i);
          if ("number" == typeof t) {
              if ("string" == typeof e)
                  throw new Error("If encoding is specified then the first argument must be a string");
              return c(this, t)
          }
          return l(this, t, e, i)
      }
      function l(t, e, i, r) {
          if ("number" == typeof e)
              throw new TypeError('"value" argument must not be a number');
          return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, i, r) {
              if (e.byteLength,
              i < 0 || e.byteLength < i)
                  throw new RangeError("'offset' is out of bounds");
              if (e.byteLength < i + (r || 0))
                  throw new RangeError("'length' is out of bounds");
              e = void 0 === i && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e,i) : new Uint8Array(e,i,r);
              h.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = h.prototype : t = d(t, e);
              return t
          }(t, e, i, r) : "string" == typeof e ? function(t, e, i) {
              "string" == typeof i && "" !== i || (i = "utf8");
              if (!h.isEncoding(i))
                  throw new TypeError('"encoding" must be a valid string encoding');
              var r = 0 | p(e, i)
                , s = (t = o(t, r)).write(e, i);
              s !== r && (t = t.slice(0, s));
              return t
          }(t, e, i) : function(t, e) {
              if (h.isBuffer(e)) {
                  var i = 0 | f(e.length);
                  return 0 === (t = o(t, i)).length || e.copy(t, 0, 0, i),
                  t
              }
              if (e) {
                  if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length"in e)
                      return "number" != typeof e.length || (r = e.length) != r ? o(t, 0) : d(t, e);
                  if ("Buffer" === e.type && n(e.data))
                      return d(t, e.data)
              }
              var r;
              throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
          }(t, e)
      }
      function u(t) {
          if ("number" != typeof t)
              throw new TypeError('"size" argument must be a number');
          if (t < 0)
              throw new RangeError('"size" argument must not be negative')
      }
      function c(t, e) {
          if (u(e),
          t = o(t, e < 0 ? 0 : 0 | f(e)),
          !h.TYPED_ARRAY_SUPPORT)
              for (var i = 0; i < e; ++i)
                  t[i] = 0;
          return t
      }
      function d(t, e) {
          var i = e.length < 0 ? 0 : 0 | f(e.length);
          t = o(t, i);
          for (var r = 0; r < i; r += 1)
              t[r] = 255 & e[r];
          return t
      }
      function f(t) {
          if (t >= a())
              throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
          return 0 | t
      }
      function p(t, e) {
          if (h.isBuffer(t))
              return t.length;
          if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer))
              return t.byteLength;
          "string" != typeof t && (t = "" + t);
          var i = t.length;
          if (0 === i)
              return 0;
          for (var r = !1; ; )
              switch (e) {
              case "ascii":
              case "latin1":
              case "binary":
                  return i;
              case "utf8":
              case "utf-8":
              case void 0:
                  return V(t).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                  return 2 * i;
              case "hex":
                  return i >>> 1;
              case "base64":
                  return K(t).length;
              default:
                  if (r)
                      return V(t).length;
                  e = ("" + e).toLowerCase(),
                  r = !0
              }
      }
      function m(t, e, i) {
          var r = !1;
          if ((void 0 === e || e < 0) && (e = 0),
          e > this.length)
              return "";
          if ((void 0 === i || i > this.length) && (i = this.length),
          i <= 0)
              return "";
          if ((i >>>= 0) <= (e >>>= 0))
              return "";
          for (t || (t = "utf8"); ; )
              switch (t) {
              case "hex":
                  return k(this, e, i);
              case "utf8":
              case "utf-8":
                  return S(this, e, i);
              case "ascii":
                  return O(this, e, i);
              case "latin1":
              case "binary":
                  return C(this, e, i);
              case "base64":
                  return T(this, e, i);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                  return I(this, e, i);
              default:
                  if (r)
                      throw new TypeError("Unknown encoding: " + t);
                  t = (t + "").toLowerCase(),
                  r = !0
              }
      }
      function g(t, e, i) {
          var r = t[e];
          t[e] = t[i],
          t[i] = r
      }
      function _(t, e, i, r, s) {
          if (0 === t.length)
              return -1;
          if ("string" == typeof i ? (r = i,
          i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648),
          i = +i,
          isNaN(i) && (i = s ? 0 : t.length - 1),
          i < 0 && (i = t.length + i),
          i >= t.length) {
              if (s)
                  return -1;
              i = t.length - 1
          } else if (i < 0) {
              if (!s)
                  return -1;
              i = 0
          }
          if ("string" == typeof e && (e = h.from(e, r)),
          h.isBuffer(e))
              return 0 === e.length ? -1 : y(t, e, i, r, s);
          if ("number" == typeof e)
              return e &= 255,
              h.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? s ? Uint8Array.prototype.indexOf.call(t, e, i) : Uint8Array.prototype.lastIndexOf.call(t, e, i) : y(t, [e], i, r, s);
          throw new TypeError("val must be string, number or Buffer")
      }
      function y(t, e, i, r, s) {
          var n, a = 1, o = t.length, h = e.length;
          if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
              if (t.length < 2 || e.length < 2)
                  return -1;
              a = 2,
              o /= 2,
              h /= 2,
              i /= 2
          }
          function l(t, e) {
              return 1 === a ? t[e] : t.readUInt16BE(e * a)
          }
          if (s) {
              var u = -1;
              for (n = i; n < o; n++)
                  if (l(t, n) === l(e, -1 === u ? 0 : n - u)) {
                      if (-1 === u && (u = n),
                      n - u + 1 === h)
                          return u * a
                  } else
                      -1 !== u && (n -= n - u),
                      u = -1
          } else
              for (i + h > o && (i = o - h),
              n = i; n >= 0; n--) {
                  for (var c = !0, d = 0; d < h; d++)
                      if (l(t, n + d) !== l(e, d)) {
                          c = !1;
                          break
                      }
                  if (c)
                      return n
              }
          return -1
      }
      function v(t, e, i, r) {
          i = Number(i) || 0;
          var s = t.length - i;
          r ? (r = Number(r)) > s && (r = s) : r = s;
          var n = e.length;
          if (n % 2 != 0)
              throw new TypeError("Invalid hex string");
          r > n / 2 && (r = n / 2);
          for (var a = 0; a < r; ++a) {
              var o = parseInt(e.substr(2 * a, 2), 16);
              if (isNaN(o))
                  return a;
              t[i + a] = o
          }
          return a
      }
      function b(t, e, i, r) {
          return z(V(e, t.length - i), t, i, r)
      }
      function E(t, e, i, r) {
          return z(function(t) {
              for (var e = [], i = 0; i < t.length; ++i)
                  e.push(255 & t.charCodeAt(i));
              return e
          }(e), t, i, r)
      }
      function w(t, e, i, r) {
          return E(t, e, i, r)
      }
      function x(t, e, i, r) {
          return z(K(e), t, i, r)
      }
      function A(t, e, i, r) {
          return z(function(t, e) {
              for (var i, r, s, n = [], a = 0; a < t.length && !((e -= 2) < 0); ++a)
                  r = (i = t.charCodeAt(a)) >> 8,
                  s = i % 256,
                  n.push(s),
                  n.push(r);
              return n
          }(e, t.length - i), t, i, r)
      }
      function T(t, e, i) {
          return 0 === e && i === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, i))
      }
      function S(t, e, i) {
          i = Math.min(t.length, i);
          for (var r = [], s = e; s < i; ) {
              var n, a, o, h, l = t[s], u = null, c = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
              if (s + c <= i)
                  switch (c) {
                  case 1:
                      l < 128 && (u = l);
                      break;
                  case 2:
                      128 == (192 & (n = t[s + 1])) && (h = (31 & l) << 6 | 63 & n) > 127 && (u = h);
                      break;
                  case 3:
                      n = t[s + 1],
                      a = t[s + 2],
                      128 == (192 & n) && 128 == (192 & a) && (h = (15 & l) << 12 | (63 & n) << 6 | 63 & a) > 2047 && (h < 55296 || h > 57343) && (u = h);
                      break;
                  case 4:
                      n = t[s + 1],
                      a = t[s + 2],
                      o = t[s + 3],
                      128 == (192 & n) && 128 == (192 & a) && 128 == (192 & o) && (h = (15 & l) << 18 | (63 & n) << 12 | (63 & a) << 6 | 63 & o) > 65535 && h < 1114112 && (u = h)
                  }
              null === u ? (u = 65533,
              c = 1) : u > 65535 && (u -= 65536,
              r.push(u >>> 10 & 1023 | 55296),
              u = 56320 | 1023 & u),
              r.push(u),
              s += c
          }
          return function(t) {
              var e = t.length;
              if (e <= P)
                  return String.fromCharCode.apply(String, t);
              var i = ""
                , r = 0;
              for (; r < e; )
                  i += String.fromCharCode.apply(String, t.slice(r, r += P));
              return i
          }(r)
      }
      e.Buffer = h,
      e.SlowBuffer = function(t) {
          +t != t && (t = 0);
          return h.alloc(+t)
      }
      ,
      e.INSPECT_MAX_BYTES = 50,
      h.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
          try {
              var t = new Uint8Array(1);
              return t.__proto__ = {
                  __proto__: Uint8Array.prototype,
                  foo: function() {
                      return 42
                  }
              },
              42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
          } catch (t) {
              return !1
          }
      }(),
      e.kMaxLength = a(),
      h.poolSize = 8192,
      h._augment = function(t) {
          return t.__proto__ = h.prototype,
          t
      }
      ,
      h.from = function(t, e, i) {
          return l(null, t, e, i)
      }
      ,
      h.TYPED_ARRAY_SUPPORT && (h.prototype.__proto__ = Uint8Array.prototype,
      h.__proto__ = Uint8Array,
      "undefined" != typeof Symbol && Symbol.species && h[Symbol.species] === h && Object.defineProperty(h, Symbol.species, {
          value: null,
          configurable: !0
      })),
      h.alloc = function(t, e, i) {
          return function(t, e, i, r) {
              return u(e),
              e <= 0 ? o(t, e) : void 0 !== i ? "string" == typeof r ? o(t, e).fill(i, r) : o(t, e).fill(i) : o(t, e)
          }(null, t, e, i)
      }
      ,
      h.allocUnsafe = function(t) {
          return c(null, t)
      }
      ,
      h.allocUnsafeSlow = function(t) {
          return c(null, t)
      }
      ,
      h.isBuffer = function(t) {
          return !(null == t || !t._isBuffer)
      }
      ,
      h.compare = function(t, e) {
          if (!h.isBuffer(t) || !h.isBuffer(e))
              throw new TypeError("Arguments must be Buffers");
          if (t === e)
              return 0;
          for (var i = t.length, r = e.length, s = 0, n = Math.min(i, r); s < n; ++s)
              if (t[s] !== e[s]) {
                  i = t[s],
                  r = e[s];
                  break
              }
          return i < r ? -1 : r < i ? 1 : 0
      }
      ,
      h.isEncoding = function(t) {
          switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
              return !0;
          default:
              return !1
          }
      }
      ,
      h.concat = function(t, e) {
          if (!n(t))
              throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length)
              return h.alloc(0);
          var i;
          if (void 0 === e)
              for (e = 0,
              i = 0; i < t.length; ++i)
                  e += t[i].length;
          var r = h.allocUnsafe(e)
            , s = 0;
          for (i = 0; i < t.length; ++i) {
              var a = t[i];
              if (!h.isBuffer(a))
                  throw new TypeError('"list" argument must be an Array of Buffers');
              a.copy(r, s),
              s += a.length
          }
          return r
      }
      ,
      h.byteLength = p,
      h.prototype._isBuffer = !0,
      h.prototype.swap16 = function() {
          var t = this.length;
          if (t % 2 != 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var e = 0; e < t; e += 2)
              g(this, e, e + 1);
          return this
      }
      ,
      h.prototype.swap32 = function() {
          var t = this.length;
          if (t % 4 != 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var e = 0; e < t; e += 4)
              g(this, e, e + 3),
              g(this, e + 1, e + 2);
          return this
      }
      ,
      h.prototype.swap64 = function() {
          var t = this.length;
          if (t % 8 != 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var e = 0; e < t; e += 8)
              g(this, e, e + 7),
              g(this, e + 1, e + 6),
              g(this, e + 2, e + 5),
              g(this, e + 3, e + 4);
          return this
      }
      ,
      h.prototype.toString = function() {
          var t = 0 | this.length;
          return 0 === t ? "" : 0 === arguments.length ? S(this, 0, t) : m.apply(this, arguments)
      }
      ,
      h.prototype.equals = function(t) {
          if (!h.isBuffer(t))
              throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === h.compare(this, t)
      }
      ,
      h.prototype.inspect = function() {
          var t = ""
            , i = e.INSPECT_MAX_BYTES;
          return this.length > 0 && (t = this.toString("hex", 0, i).match(/.{2}/g).join(" "),
          this.length > i && (t += " ... ")),
          "<Buffer " + t + ">"
      }
      ,
      h.prototype.compare = function(t, e, i, r, s) {
          if (!h.isBuffer(t))
              throw new TypeError("Argument must be a Buffer");
          if (void 0 === e && (e = 0),
          void 0 === i && (i = t ? t.length : 0),
          void 0 === r && (r = 0),
          void 0 === s && (s = this.length),
          e < 0 || i > t.length || r < 0 || s > this.length)
              throw new RangeError("out of range index");
          if (r >= s && e >= i)
              return 0;
          if (r >= s)
              return -1;
          if (e >= i)
              return 1;
          if (this === t)
              return 0;
          for (var n = (s >>>= 0) - (r >>>= 0), a = (i >>>= 0) - (e >>>= 0), o = Math.min(n, a), l = this.slice(r, s), u = t.slice(e, i), c = 0; c < o; ++c)
              if (l[c] !== u[c]) {
                  n = l[c],
                  a = u[c];
                  break
              }
          return n < a ? -1 : a < n ? 1 : 0
      }
      ,
      h.prototype.includes = function(t, e, i) {
          return -1 !== this.indexOf(t, e, i)
      }
      ,
      h.prototype.indexOf = function(t, e, i) {
          return _(this, t, e, i, !0)
      }
      ,
      h.prototype.lastIndexOf = function(t, e, i) {
          return _(this, t, e, i, !1)
      }
      ,
      h.prototype.write = function(t, e, i, r) {
          if (void 0 === e)
              r = "utf8",
              i = this.length,
              e = 0;
          else if (void 0 === i && "string" == typeof e)
              r = e,
              i = this.length,
              e = 0;
          else {
              if (!isFinite(e))
                  throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
              e |= 0,
              isFinite(i) ? (i |= 0,
              void 0 === r && (r = "utf8")) : (r = i,
              i = void 0)
          }
          var s = this.length - e;
          if ((void 0 === i || i > s) && (i = s),
          t.length > 0 && (i < 0 || e < 0) || e > this.length)
              throw new RangeError("Attempt to write outside buffer bounds");
          r || (r = "utf8");
          for (var n = !1; ; )
              switch (r) {
              case "hex":
                  return v(this, t, e, i);
              case "utf8":
              case "utf-8":
                  return b(this, t, e, i);
              case "ascii":
                  return E(this, t, e, i);
              case "latin1":
              case "binary":
                  return w(this, t, e, i);
              case "base64":
                  return x(this, t, e, i);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                  return A(this, t, e, i);
              default:
                  if (n)
                      throw new TypeError("Unknown encoding: " + r);
                  r = ("" + r).toLowerCase(),
                  n = !0
              }
      }
      ,
      h.prototype.toJSON = function() {
          return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0)
          }
      }
      ;
      var P = 4096;
      function O(t, e, i) {
          var r = "";
          i = Math.min(t.length, i);
          for (var s = e; s < i; ++s)
              r += String.fromCharCode(127 & t[s]);
          return r
      }
      function C(t, e, i) {
          var r = "";
          i = Math.min(t.length, i);
          for (var s = e; s < i; ++s)
              r += String.fromCharCode(t[s]);
          return r
      }
      function k(t, e, i) {
          var r = t.length;
          (!e || e < 0) && (e = 0),
          (!i || i < 0 || i > r) && (i = r);
          for (var s = "", n = e; n < i; ++n)
              s += j(t[n]);
          return s
      }
      function I(t, e, i) {
          for (var r = t.slice(e, i), s = "", n = 0; n < r.length; n += 2)
              s += String.fromCharCode(r[n] + 256 * r[n + 1]);
          return s
      }
      function R(t, e, i) {
          if (t % 1 != 0 || t < 0)
              throw new RangeError("offset is not uint");
          if (t + e > i)
              throw new RangeError("Trying to access beyond buffer length")
      }
      function M(t, e, i, r, s, n) {
          if (!h.isBuffer(t))
              throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > s || e < n)
              throw new RangeError('"value" argument is out of bounds');
          if (i + r > t.length)
              throw new RangeError("Index out of range")
      }
      function D(t, e, i, r) {
          e < 0 && (e = 65535 + e + 1);
          for (var s = 0, n = Math.min(t.length - i, 2); s < n; ++s)
              t[i + s] = (e & 255 << 8 * (r ? s : 1 - s)) >>> 8 * (r ? s : 1 - s)
      }
      function L(t, e, i, r) {
          e < 0 && (e = 4294967295 + e + 1);
          for (var s = 0, n = Math.min(t.length - i, 4); s < n; ++s)
              t[i + s] = e >>> 8 * (r ? s : 3 - s) & 255
      }
      function N(t, e, i, r, s, n) {
          if (i + r > t.length)
              throw new RangeError("Index out of range");
          if (i < 0)
              throw new RangeError("Index out of range")
      }
      function F(t, e, i, r, n) {
          return n || N(t, 0, i, 4),
          s.write(t, e, i, r, 23, 4),
          i + 4
      }
      function U(t, e, i, r, n) {
          return n || N(t, 0, i, 8),
          s.write(t, e, i, r, 52, 8),
          i + 8
      }
      h.prototype.slice = function(t, e) {
          var i, r = this.length;
          if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
          (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
          e < t && (e = t),
          h.TYPED_ARRAY_SUPPORT)
              (i = this.subarray(t, e)).__proto__ = h.prototype;
          else {
              var s = e - t;
              i = new h(s,void 0);
              for (var n = 0; n < s; ++n)
                  i[n] = this[n + t]
          }
          return i
      }
      ,
      h.prototype.readUIntLE = function(t, e, i) {
          t |= 0,
          e |= 0,
          i || R(t, e, this.length);
          for (var r = this[t], s = 1, n = 0; ++n < e && (s *= 256); )
              r += this[t + n] * s;
          return r
      }
      ,
      h.prototype.readUIntBE = function(t, e, i) {
          t |= 0,
          e |= 0,
          i || R(t, e, this.length);
          for (var r = this[t + --e], s = 1; e > 0 && (s *= 256); )
              r += this[t + --e] * s;
          return r
      }
      ,
      h.prototype.readUInt8 = function(t, e) {
          return e || R(t, 1, this.length),
          this[t]
      }
      ,
      h.prototype.readUInt16LE = function(t, e) {
          return e || R(t, 2, this.length),
          this[t] | this[t + 1] << 8
      }
      ,
      h.prototype.readUInt16BE = function(t, e) {
          return e || R(t, 2, this.length),
          this[t] << 8 | this[t + 1]
      }
      ,
      h.prototype.readUInt32LE = function(t, e) {
          return e || R(t, 4, this.length),
          (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
      }
      ,
      h.prototype.readUInt32BE = function(t, e) {
          return e || R(t, 4, this.length),
          16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
      }
      ,
      h.prototype.readIntLE = function(t, e, i) {
          t |= 0,
          e |= 0,
          i || R(t, e, this.length);
          for (var r = this[t], s = 1, n = 0; ++n < e && (s *= 256); )
              r += this[t + n] * s;
          return r >= (s *= 128) && (r -= Math.pow(2, 8 * e)),
          r
      }
      ,
      h.prototype.readIntBE = function(t, e, i) {
          t |= 0,
          e |= 0,
          i || R(t, e, this.length);
          for (var r = e, s = 1, n = this[t + --r]; r > 0 && (s *= 256); )
              n += this[t + --r] * s;
          return n >= (s *= 128) && (n -= Math.pow(2, 8 * e)),
          n
      }
      ,
      h.prototype.readInt8 = function(t, e) {
          return e || R(t, 1, this.length),
          128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
      }
      ,
      h.prototype.readInt16LE = function(t, e) {
          e || R(t, 2, this.length);
          var i = this[t] | this[t + 1] << 8;
          return 32768 & i ? 4294901760 | i : i
      }
      ,
      h.prototype.readInt16BE = function(t, e) {
          e || R(t, 2, this.length);
          var i = this[t + 1] | this[t] << 8;
          return 32768 & i ? 4294901760 | i : i
      }
      ,
      h.prototype.readInt32LE = function(t, e) {
          return e || R(t, 4, this.length),
          this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
      }
      ,
      h.prototype.readInt32BE = function(t, e) {
          return e || R(t, 4, this.length),
          this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
      }
      ,
      h.prototype.readFloatLE = function(t, e) {
          return e || R(t, 4, this.length),
          s.read(this, t, !0, 23, 4)
      }
      ,
      h.prototype.readFloatBE = function(t, e) {
          return e || R(t, 4, this.length),
          s.read(this, t, !1, 23, 4)
      }
      ,
      h.prototype.readDoubleLE = function(t, e) {
          return e || R(t, 8, this.length),
          s.read(this, t, !0, 52, 8)
      }
      ,
      h.prototype.readDoubleBE = function(t, e) {
          return e || R(t, 8, this.length),
          s.read(this, t, !1, 52, 8)
      }
      ,
      h.prototype.writeUIntLE = function(t, e, i, r) {
          (t = +t,
          e |= 0,
          i |= 0,
          r) || M(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
          var s = 1
            , n = 0;
          for (this[e] = 255 & t; ++n < i && (s *= 256); )
              this[e + n] = t / s & 255;
          return e + i
      }
      ,
      h.prototype.writeUIntBE = function(t, e, i, r) {
          (t = +t,
          e |= 0,
          i |= 0,
          r) || M(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
          var s = i - 1
            , n = 1;
          for (this[e + s] = 255 & t; --s >= 0 && (n *= 256); )
              this[e + s] = t / n & 255;
          return e + i
      }
      ,
      h.prototype.writeUInt8 = function(t, e, i) {
          return t = +t,
          e |= 0,
          i || M(this, t, e, 1, 255, 0),
          h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
          this[e] = 255 & t,
          e + 1
      }
      ,
      h.prototype.writeUInt16LE = function(t, e, i) {
          return t = +t,
          e |= 0,
          i || M(this, t, e, 2, 65535, 0),
          h.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
          this[e + 1] = t >>> 8) : D(this, t, e, !0),
          e + 2
      }
      ,
      h.prototype.writeUInt16BE = function(t, e, i) {
          return t = +t,
          e |= 0,
          i || M(this, t, e, 2, 65535, 0),
          h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
          this[e + 1] = 255 & t) : D(this, t, e, !1),
          e + 2
      }
      ,
      h.prototype.writeUInt32LE = function(t, e, i) {
          return t = +t,
          e |= 0,
          i || M(this, t, e, 4, 4294967295, 0),
          h.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24,
          this[e + 2] = t >>> 16,
          this[e + 1] = t >>> 8,
          this[e] = 255 & t) : L(this, t, e, !0),
          e + 4
      }
      ,
      h.prototype.writeUInt32BE = function(t, e, i) {
          return t = +t,
          e |= 0,
          i || M(this, t, e, 4, 4294967295, 0),
          h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
          this[e + 1] = t >>> 16,
          this[e + 2] = t >>> 8,
          this[e + 3] = 255 & t) : L(this, t, e, !1),
          e + 4
      }
      ,
      h.prototype.writeIntLE = function(t, e, i, r) {
          if (t = +t,
          e |= 0,
          !r) {
              var s = Math.pow(2, 8 * i - 1);
              M(this, t, e, i, s - 1, -s)
          }
          var n = 0
            , a = 1
            , o = 0;
          for (this[e] = 255 & t; ++n < i && (a *= 256); )
              t < 0 && 0 === o && 0 !== this[e + n - 1] && (o = 1),
              this[e + n] = (t / a >> 0) - o & 255;
          return e + i
      }
      ,
      h.prototype.writeIntBE = function(t, e, i, r) {
          if (t = +t,
          e |= 0,
          !r) {
              var s = Math.pow(2, 8 * i - 1);
              M(this, t, e, i, s - 1, -s)
          }
          var n = i - 1
            , a = 1
            , o = 0;
          for (this[e + n] = 255 & t; --n >= 0 && (a *= 256); )
              t < 0 && 0 === o && 0 !== this[e + n + 1] && (o = 1),
              this[e + n] = (t / a >> 0) - o & 255;
          return e + i
      }
      ,
      h.prototype.writeInt8 = function(t, e, i) {
          return t = +t,
          e |= 0,
          i || M(this, t, e, 1, 127, -128),
          h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
          t < 0 && (t = 255 + t + 1),
          this[e] = 255 & t,
          e + 1
      }
      ,
      h.prototype.writeInt16LE = function(t, e, i) {
          return t = +t,
          e |= 0,
          i || M(this, t, e, 2, 32767, -32768),
          h.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
          this[e + 1] = t >>> 8) : D(this, t, e, !0),
          e + 2
      }
      ,
      h.prototype.writeInt16BE = function(t, e, i) {
          return t = +t,
          e |= 0,
          i || M(this, t, e, 2, 32767, -32768),
          h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
          this[e + 1] = 255 & t) : D(this, t, e, !1),
          e + 2
      }
      ,
      h.prototype.writeInt32LE = function(t, e, i) {
          return t = +t,
          e |= 0,
          i || M(this, t, e, 4, 2147483647, -2147483648),
          h.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
          this[e + 1] = t >>> 8,
          this[e + 2] = t >>> 16,
          this[e + 3] = t >>> 24) : L(this, t, e, !0),
          e + 4
      }
      ,
      h.prototype.writeInt32BE = function(t, e, i) {
          return t = +t,
          e |= 0,
          i || M(this, t, e, 4, 2147483647, -2147483648),
          t < 0 && (t = 4294967295 + t + 1),
          h.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
          this[e + 1] = t >>> 16,
          this[e + 2] = t >>> 8,
          this[e + 3] = 255 & t) : L(this, t, e, !1),
          e + 4
      }
      ,
      h.prototype.writeFloatLE = function(t, e, i) {
          return F(this, t, e, !0, i)
      }
      ,
      h.prototype.writeFloatBE = function(t, e, i) {
          return F(this, t, e, !1, i)
      }
      ,
      h.prototype.writeDoubleLE = function(t, e, i) {
          return U(this, t, e, !0, i)
      }
      ,
      h.prototype.writeDoubleBE = function(t, e, i) {
          return U(this, t, e, !1, i)
      }
      ,
      h.prototype.copy = function(t, e, i, r) {
          if (i || (i = 0),
          r || 0 === r || (r = this.length),
          e >= t.length && (e = t.length),
          e || (e = 0),
          r > 0 && r < i && (r = i),
          r === i)
              return 0;
          if (0 === t.length || 0 === this.length)
              return 0;
          if (e < 0)
              throw new RangeError("targetStart out of bounds");
          if (i < 0 || i >= this.length)
              throw new RangeError("sourceStart out of bounds");
          if (r < 0)
              throw new RangeError("sourceEnd out of bounds");
          r > this.length && (r = this.length),
          t.length - e < r - i && (r = t.length - e + i);
          var s, n = r - i;
          if (this === t && i < e && e < r)
              for (s = n - 1; s >= 0; --s)
                  t[s + e] = this[s + i];
          else if (n < 1e3 || !h.TYPED_ARRAY_SUPPORT)
              for (s = 0; s < n; ++s)
                  t[s + e] = this[s + i];
          else
              Uint8Array.prototype.set.call(t, this.subarray(i, i + n), e);
          return n
      }
      ,
      h.prototype.fill = function(t, e, i, r) {
          if ("string" == typeof t) {
              if ("string" == typeof e ? (r = e,
              e = 0,
              i = this.length) : "string" == typeof i && (r = i,
              i = this.length),
              1 === t.length) {
                  var s = t.charCodeAt(0);
                  s < 256 && (t = s)
              }
              if (void 0 !== r && "string" != typeof r)
                  throw new TypeError("encoding must be a string");
              if ("string" == typeof r && !h.isEncoding(r))
                  throw new TypeError("Unknown encoding: " + r)
          } else
              "number" == typeof t && (t &= 255);
          if (e < 0 || this.length < e || this.length < i)
              throw new RangeError("Out of range index");
          if (i <= e)
              return this;
          var n;
          if (e >>>= 0,
          i = void 0 === i ? this.length : i >>> 0,
          t || (t = 0),
          "number" == typeof t)
              for (n = e; n < i; ++n)
                  this[n] = t;
          else {
              var a = h.isBuffer(t) ? t : V(new h(t,r).toString())
                , o = a.length;
              for (n = 0; n < i - e; ++n)
                  this[n + e] = a[n % o]
          }
          return this
      }
      ;
      var B = /[^+\/0-9A-Za-z-_]/g;
      function j(t) {
          return t < 16 ? "0" + t.toString(16) : t.toString(16)
      }
      function V(t, e) {
          var i;
          e = e || 1 / 0;
          for (var r = t.length, s = null, n = [], a = 0; a < r; ++a) {
              if ((i = t.charCodeAt(a)) > 55295 && i < 57344) {
                  if (!s) {
                      if (i > 56319) {
                          (e -= 3) > -1 && n.push(239, 191, 189);
                          continue
                      }
                      if (a + 1 === r) {
                          (e -= 3) > -1 && n.push(239, 191, 189);
                          continue
                      }
                      s = i;
                      continue
                  }
                  if (i < 56320) {
                      (e -= 3) > -1 && n.push(239, 191, 189),
                      s = i;
                      continue
                  }
                  i = 65536 + (s - 55296 << 10 | i - 56320)
              } else
                  s && (e -= 3) > -1 && n.push(239, 191, 189);
              if (s = null,
              i < 128) {
                  if ((e -= 1) < 0)
                      break;
                  n.push(i)
              } else if (i < 2048) {
                  if ((e -= 2) < 0)
                      break;
                  n.push(i >> 6 | 192, 63 & i | 128)
              } else if (i < 65536) {
                  if ((e -= 3) < 0)
                      break;
                  n.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
              } else {
                  if (!(i < 1114112))
                      throw new Error("Invalid code point");
                  if ((e -= 4) < 0)
                      break;
                  n.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
              }
          }
          return n
      }
      function K(t) {
          return r.toByteArray(function(t) {
              if ((t = function(t) {
                  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
              }(t).replace(B, "")).length < 2)
                  return "";
              for (; t.length % 4 != 0; )
                  t += "=";
              return t
          }(t))
      }
      function z(t, e, i, r) {
          for (var s = 0; s < r && !(s + i >= e.length || s >= t.length); ++s)
              e[s + i] = t[s];
          return s
      }
  }
  ).call(this, i(105))
}
, function(t, e, i) {
  "use strict";
  e.byteLength = function(t) {
      var e = l(t)
        , i = e[0]
        , r = e[1];
      return 3 * (i + r) / 4 - r
  }
  ,
  e.toByteArray = function(t) {
      var e, i, r = l(t), a = r[0], o = r[1], h = new n(function(t, e, i) {
          return 3 * (e + i) / 4 - i
      }(0, a, o)), u = 0, c = o > 0 ? a - 4 : a;
      for (i = 0; i < c; i += 4)
          e = s[t.charCodeAt(i)] << 18 | s[t.charCodeAt(i + 1)] << 12 | s[t.charCodeAt(i + 2)] << 6 | s[t.charCodeAt(i + 3)],
          h[u++] = e >> 16 & 255,
          h[u++] = e >> 8 & 255,
          h[u++] = 255 & e;
      2 === o && (e = s[t.charCodeAt(i)] << 2 | s[t.charCodeAt(i + 1)] >> 4,
      h[u++] = 255 & e);
      1 === o && (e = s[t.charCodeAt(i)] << 10 | s[t.charCodeAt(i + 1)] << 4 | s[t.charCodeAt(i + 2)] >> 2,
      h[u++] = e >> 8 & 255,
      h[u++] = 255 & e);
      return h
  }
  ,
  e.fromByteArray = function(t) {
      for (var e, i = t.length, s = i % 3, n = [], a = 16383, o = 0, h = i - s; o < h; o += a)
          n.push(u(t, o, o + a > h ? h : o + a));
      1 === s ? (e = t[i - 1],
      n.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === s && (e = (t[i - 2] << 8) + t[i - 1],
      n.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
      return n.join("")
  }
  ;
  for (var r = [], s = [], n = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, h = a.length; o < h; ++o)
      r[o] = a[o],
      s[a.charCodeAt(o)] = o;
  function l(t) {
      var e = t.length;
      if (e % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
      var i = t.indexOf("=");
      return -1 === i && (i = e),
      [i, i === e ? 0 : 4 - i % 4]
  }
  function u(t, e, i) {
      for (var s, n, a = [], o = e; o < i; o += 3)
          s = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]),
          a.push(r[(n = s) >> 18 & 63] + r[n >> 12 & 63] + r[n >> 6 & 63] + r[63 & n]);
      return a.join("")
  }
  s["-".charCodeAt(0)] = 62,
  s["_".charCodeAt(0)] = 63
}
, function(t, e) {
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  e.read = function(t, e, i, r, s) {
      var n, a, o = 8 * s - r - 1, h = (1 << o) - 1, l = h >> 1, u = -7, c = i ? s - 1 : 0, d = i ? -1 : 1, f = t[e + c];
      for (c += d,
      n = f & (1 << -u) - 1,
      f >>= -u,
      u += o; u > 0; n = 256 * n + t[e + c],
      c += d,
      u -= 8)
          ;
      for (a = n & (1 << -u) - 1,
      n >>= -u,
      u += r; u > 0; a = 256 * a + t[e + c],
      c += d,
      u -= 8)
          ;
      if (0 === n)
          n = 1 - l;
      else {
          if (n === h)
              return a ? NaN : 1 / 0 * (f ? -1 : 1);
          a += Math.pow(2, r),
          n -= l
      }
      return (f ? -1 : 1) * a * Math.pow(2, n - r)
  }
  ,
  e.write = function(t, e, i, r, s, n) {
      var a, o, h, l = 8 * n - s - 1, u = (1 << l) - 1, c = u >> 1, d = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = r ? 0 : n - 1, p = r ? 1 : -1, m = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
      for (e = Math.abs(e),
      isNaN(e) || e === 1 / 0 ? (o = isNaN(e) ? 1 : 0,
      a = u) : (a = Math.floor(Math.log(e) / Math.LN2),
      e * (h = Math.pow(2, -a)) < 1 && (a--,
      h *= 2),
      (e += a + c >= 1 ? d / h : d * Math.pow(2, 1 - c)) * h >= 2 && (a++,
      h /= 2),
      a + c >= u ? (o = 0,
      a = u) : a + c >= 1 ? (o = (e * h - 1) * Math.pow(2, s),
      a += c) : (o = e * Math.pow(2, c - 1) * Math.pow(2, s),
      a = 0)); s >= 8; t[i + f] = 255 & o,
      f += p,
      o /= 256,
      s -= 8)
          ;
      for (a = a << s | o,
      l += s; l > 0; t[i + f] = 255 & a,
      f += p,
      a /= 256,
      l -= 8)
          ;
      t[i + f - p] |= 128 * m
  }
}
, function(t, e) {
  var i = {}.toString;
  t.exports = Array.isArray || function(t) {
      return "[object Array]" == i.call(t)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(191);
  function s() {
      this.argTypes = [],
      this.shimArgs = [],
      this.arrayArgs = [],
      this.arrayBlockIndices = [],
      this.scalarArgs = [],
      this.offsetArgs = [],
      this.offsetArgIndex = [],
      this.indexArgs = [],
      this.shapeArgs = [],
      this.funcName = "",
      this.pre = null,
      this.body = null,
      this.post = null,
      this.debug = !1
  }
  t.exports = function(t) {
      var e = new s;
      e.pre = t.pre,
      e.body = t.body,
      e.post = t.post;
      var i = t.args.slice(0);
      e.argTypes = i;
      for (var n = 0; n < i.length; ++n) {
          var a = i[n];
          if ("array" === a || "object" == typeof a && a.blockIndices) {
              if (e.argTypes[n] = "array",
              e.arrayArgs.push(n),
              e.arrayBlockIndices.push(a.blockIndices ? a.blockIndices : 0),
              e.shimArgs.push("array" + n),
              n < e.pre.args.length && e.pre.args[n].count > 0)
                  throw new Error("cwise: pre() block may not reference array args");
              if (n < e.post.args.length && e.post.args[n].count > 0)
                  throw new Error("cwise: post() block may not reference array args")
          } else if ("scalar" === a)
              e.scalarArgs.push(n),
              e.shimArgs.push("scalar" + n);
          else if ("index" === a) {
              if (e.indexArgs.push(n),
              n < e.pre.args.length && e.pre.args[n].count > 0)
                  throw new Error("cwise: pre() block may not reference array index");
              if (n < e.body.args.length && e.body.args[n].lvalue)
                  throw new Error("cwise: body() block may not write to array index");
              if (n < e.post.args.length && e.post.args[n].count > 0)
                  throw new Error("cwise: post() block may not reference array index")
          } else if ("shape" === a) {
              if (e.shapeArgs.push(n),
              n < e.pre.args.length && e.pre.args[n].lvalue)
                  throw new Error("cwise: pre() block may not write to array shape");
              if (n < e.body.args.length && e.body.args[n].lvalue)
                  throw new Error("cwise: body() block may not write to array shape");
              if (n < e.post.args.length && e.post.args[n].lvalue)
                  throw new Error("cwise: post() block may not write to array shape")
          } else {
              if ("object" != typeof a || !a.offset)
                  throw new Error("cwise: Unknown argument type " + i[n]);
              e.argTypes[n] = "offset",
              e.offsetArgs.push({
                  array: a.array,
                  offset: a.offset
              }),
              e.offsetArgIndex.push(n)
          }
      }
      if (e.arrayArgs.length <= 0)
          throw new Error("cwise: No array arguments specified");
      if (e.pre.args.length > i.length)
          throw new Error("cwise: Too many arguments in pre() block");
      if (e.body.args.length > i.length)
          throw new Error("cwise: Too many arguments in body() block");
      if (e.post.args.length > i.length)
          throw new Error("cwise: Too many arguments in post() block");
      return e.debug = !!t.printCode || !!t.debug,
      e.funcName = t.funcName || "cwise",
      e.blockSize = t.blockSize || 64,
      r(e)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(192);
  t.exports = function(t) {
      var e = ["'use strict'", "var CACHED={}"]
        , i = []
        , s = t.funcName + "_cwise_thunk";
      e.push(["return function ", s, "(", t.shimArgs.join(","), "){"].join(""));
      for (var n = [], a = [], o = [["array", t.arrayArgs[0], ".shape.slice(", Math.max(0, t.arrayBlockIndices[0]), t.arrayBlockIndices[0] < 0 ? "," + t.arrayBlockIndices[0] + ")" : ")"].join("")], h = [], l = [], u = 0; u < t.arrayArgs.length; ++u) {
          var c = t.arrayArgs[u];
          i.push(["t", c, "=array", c, ".dtype,", "r", c, "=array", c, ".order"].join("")),
          n.push("t" + c),
          n.push("r" + c),
          a.push("t" + c),
          a.push("r" + c + ".join()"),
          o.push("array" + c + ".data"),
          o.push("array" + c + ".stride"),
          o.push("array" + c + ".offset|0"),
          u > 0 && (h.push("array" + t.arrayArgs[0] + ".shape.length===array" + c + ".shape.length+" + (Math.abs(t.arrayBlockIndices[0]) - Math.abs(t.arrayBlockIndices[u]))),
          l.push("array" + t.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, t.arrayBlockIndices[0]) + "]===array" + c + ".shape[shapeIndex+" + Math.max(0, t.arrayBlockIndices[u]) + "]"))
      }
      for (t.arrayArgs.length > 1 && (e.push("if (!(" + h.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"),
      e.push("for(var shapeIndex=array" + t.arrayArgs[0] + ".shape.length-" + Math.abs(t.arrayBlockIndices[0]) + "; shapeIndex--\x3e0;) {"),
      e.push("if (!(" + l.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')"),
      e.push("}")),
      u = 0; u < t.scalarArgs.length; ++u)
          o.push("scalar" + t.scalarArgs[u]);
      return i.push(["type=[", a.join(","), "].join()"].join("")),
      i.push("proc=CACHED[type]"),
      e.push("var " + i.join(",")),
      e.push(["if(!proc){", "CACHED[type]=proc=compile([", n.join(","), "])}", "return proc(", o.join(","), ")}"].join("")),
      t.debug && console.log("-----Generated thunk:\n" + e.join("\n") + "\n----------"),
      new Function("compile",e.join("\n"))(r.bind(void 0, t))
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(193);
  function s(t, e, i) {
      var r, s, n = t.length, a = e.arrayArgs.length, o = e.indexArgs.length > 0, h = [], l = [], u = 0, c = 0;
      for (r = 0; r < n; ++r)
          l.push(["i", r, "=0"].join(""));
      for (s = 0; s < a; ++s)
          for (r = 0; r < n; ++r)
              c = u,
              u = t[r],
              0 === r ? l.push(["d", s, "s", r, "=t", s, "p", u].join("")) : l.push(["d", s, "s", r, "=(t", s, "p", u, "-s", c, "*t", s, "p", c, ")"].join(""));
      for (l.length > 0 && h.push("var " + l.join(",")),
      r = n - 1; r >= 0; --r)
          u = t[r],
          h.push(["for(i", r, "=0;i", r, "<s", u, ";++i", r, "){"].join(""));
      for (h.push(i),
      r = 0; r < n; ++r) {
          for (c = u,
          u = t[r],
          s = 0; s < a; ++s)
              h.push(["p", s, "+=d", s, "s", r].join(""));
          o && (r > 0 && h.push(["index[", c, "]-=s", c].join("")),
          h.push(["++index[", u, "]"].join(""))),
          h.push("}")
      }
      return h.join("\n")
  }
  function n(t, e, i) {
      for (var r = t.body, s = [], n = [], a = 0; a < t.args.length; ++a) {
          var o = t.args[a];
          if (!(o.count <= 0)) {
              var h = new RegExp(o.name,"g")
                , l = ""
                , u = e.arrayArgs.indexOf(a);
              switch (e.argTypes[a]) {
              case "offset":
                  var c = e.offsetArgIndex.indexOf(a);
                  u = e.offsetArgs[c].array,
                  l = "+q" + c;
              case "array":
                  l = "p" + u + l;
                  var d = "l" + a
                    , f = "a" + u;
                  if (0 === e.arrayBlockIndices[u])
                      1 === o.count ? "generic" === i[u] ? o.lvalue ? (s.push(["var ", d, "=", f, ".get(", l, ")"].join("")),
                      r = r.replace(h, d),
                      n.push([f, ".set(", l, ",", d, ")"].join(""))) : r = r.replace(h, [f, ".get(", l, ")"].join("")) : r = r.replace(h, [f, "[", l, "]"].join("")) : "generic" === i[u] ? (s.push(["var ", d, "=", f, ".get(", l, ")"].join("")),
                      r = r.replace(h, d),
                      o.lvalue && n.push([f, ".set(", l, ",", d, ")"].join(""))) : (s.push(["var ", d, "=", f, "[", l, "]"].join("")),
                      r = r.replace(h, d),
                      o.lvalue && n.push([f, "[", l, "]=", d].join("")));
                  else {
                      for (var p = [o.name], m = [l], g = 0; g < Math.abs(e.arrayBlockIndices[u]); g++)
                          p.push("\\s*\\[([^\\]]+)\\]"),
                          m.push("$" + (g + 1) + "*t" + u + "b" + g);
                      if (h = new RegExp(p.join(""),"g"),
                      l = m.join("+"),
                      "generic" === i[u])
                          throw new Error("cwise: Generic arrays not supported in combination with blocks!");
                      r = r.replace(h, [f, "[", l, "]"].join(""))
                  }
                  break;
              case "scalar":
                  r = r.replace(h, "Y" + e.scalarArgs.indexOf(a));
                  break;
              case "index":
                  r = r.replace(h, "index");
                  break;
              case "shape":
                  r = r.replace(h, "shape")
              }
          }
      }
      return [s.join("\n"), r, n.join("\n")].join("\n").trim()
  }
  function a(t) {
      for (var e = new Array(t.length), i = !0, r = 0; r < t.length; ++r) {
          var s = t[r]
            , n = s.match(/\d+/);
          n = n ? n[0] : "",
          0 === s.charAt(0) ? e[r] = "u" + s.charAt(1) + n : e[r] = s.charAt(0) + n,
          r > 0 && (i = i && e[r] === e[r - 1])
      }
      return i ? e[0] : e.join("")
  }
  t.exports = function(t, e) {
      for (var i = e[1].length - Math.abs(t.arrayBlockIndices[0]) | 0, o = new Array(t.arrayArgs.length), h = new Array(t.arrayArgs.length), l = 0; l < t.arrayArgs.length; ++l)
          h[l] = e[2 * l],
          o[l] = e[2 * l + 1];
      var u = []
        , c = []
        , d = []
        , f = []
        , p = [];
      for (l = 0; l < t.arrayArgs.length; ++l) {
          t.arrayBlockIndices[l] < 0 ? (d.push(0),
          f.push(i),
          u.push(i),
          c.push(i + t.arrayBlockIndices[l])) : (d.push(t.arrayBlockIndices[l]),
          f.push(t.arrayBlockIndices[l] + i),
          u.push(0),
          c.push(t.arrayBlockIndices[l]));
          for (var m = [], g = 0; g < o[l].length; g++)
              d[l] <= o[l][g] && o[l][g] < f[l] && m.push(o[l][g] - d[l]);
          p.push(m)
      }
      var _ = ["SS"]
        , y = ["'use strict'"]
        , v = [];
      for (g = 0; g < i; ++g)
          v.push(["s", g, "=SS[", g, "]"].join(""));
      for (l = 0; l < t.arrayArgs.length; ++l) {
          _.push("a" + l),
          _.push("t" + l),
          _.push("p" + l);
          for (g = 0; g < i; ++g)
              v.push(["t", l, "p", g, "=t", l, "[", d[l] + g, "]"].join(""));
          for (g = 0; g < Math.abs(t.arrayBlockIndices[l]); ++g)
              v.push(["t", l, "b", g, "=t", l, "[", u[l] + g, "]"].join(""))
      }
      for (l = 0; l < t.scalarArgs.length; ++l)
          _.push("Y" + l);
      if (t.shapeArgs.length > 0 && v.push("shape=SS.slice(0)"),
      t.indexArgs.length > 0) {
          var b = new Array(i);
          for (l = 0; l < i; ++l)
              b[l] = "0";
          v.push(["index=[", b.join(","), "]"].join(""))
      }
      for (l = 0; l < t.offsetArgs.length; ++l) {
          var E = t.offsetArgs[l]
            , w = [];
          for (g = 0; g < E.offset.length; ++g)
              0 !== E.offset[g] && (1 === E.offset[g] ? w.push(["t", E.array, "p", g].join("")) : w.push([E.offset[g], "*t", E.array, "p", g].join("")));
          0 === w.length ? v.push("q" + l + "=0") : v.push(["q", l, "=", w.join("+")].join(""))
      }
      var x = r([].concat(t.pre.thisVars).concat(t.body.thisVars).concat(t.post.thisVars));
      for ((v = v.concat(x)).length > 0 && y.push("var " + v.join(",")),
      l = 0; l < t.arrayArgs.length; ++l)
          y.push("p" + l + "|=0");
      t.pre.body.length > 3 && y.push(n(t.pre, t, h));
      var A = n(t.body, t, h)
        , T = function(t) {
          for (var e = 0, i = t[0].length; e < i; ) {
              for (var r = 1; r < t.length; ++r)
                  if (t[r][e] !== t[0][e])
                      return e;
              ++e
          }
          return e
      }(p);
      T < i ? y.push(function(t, e, i, r) {
          for (var n = e.length, a = i.arrayArgs.length, o = i.blockSize, h = i.indexArgs.length > 0, l = [], u = 0; u < a; ++u)
              l.push(["var offset", u, "=p", u].join(""));
          for (u = t; u < n; ++u)
              l.push(["for(var j" + u + "=SS[", e[u], "]|0;j", u, ">0;){"].join("")),
              l.push(["if(j", u, "<", o, "){"].join("")),
              l.push(["s", e[u], "=j", u].join("")),
              l.push(["j", u, "=0"].join("")),
              l.push(["}else{s", e[u], "=", o].join("")),
              l.push(["j", u, "-=", o, "}"].join("")),
              h && l.push(["index[", e[u], "]=j", u].join(""));
          for (u = 0; u < a; ++u) {
              for (var c = ["offset" + u], d = t; d < n; ++d)
                  c.push(["j", d, "*t", u, "p", e[d]].join(""));
              l.push(["p", u, "=(", c.join("+"), ")"].join(""))
          }
          for (l.push(s(e, i, r)),
          u = t; u < n; ++u)
              l.push("}");
          return l.join("\n")
      }(T, p[0], t, A)) : y.push(s(p[0], t, A)),
      t.post.body.length > 3 && y.push(n(t.post, t, h)),
      t.debug && console.log("-----Generated cwise routine for ", e, ":\n" + y.join("\n") + "\n----------");
      var S = [t.funcName || "unnamed", "_cwise_loop_", o[0].join("s"), "m", T, a(h)].join("");
      return new Function(["function ", S, "(", _.join(","), "){", y.join("\n"), "} return ", S].join(""))()
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t, e, i) {
      return 0 === t.length ? t : e ? (i || t.sort(e),
      function(t, e) {
          for (var i = 1, r = t.length, s = t[0], n = t[0], a = 1; a < r; ++a)
              if (n = s,
              e(s = t[a], n)) {
                  if (a === i) {
                      i++;
                      continue
                  }
                  t[i++] = s
              }
          return t.length = i,
          t
      }(t, e)) : (i || t.sort(),
      function(t) {
          for (var e = 1, i = t.length, r = t[0], s = t[0], n = 1; n < i; ++n,
          s = r)
              if (s = r,
              (r = t[n]) !== s) {
                  if (n === e) {
                      e++;
                      continue
                  }
                  t[e++] = r
              }
          return t.length = e,
          t
      }(t))
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      for (var e = new Array(t), i = 0; i < t; ++i)
          e[i] = i;
      return e
  }
}
, function(t, e) {
  function i(t) {
      return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
  }
  /*!
* Determine if an object is a Buffer
*
* @author   Feross Aboukhadijeh <https://feross.org>
* @license  MIT
*/
  t.exports = function(t) {
      return null != t && (i(t) || function(t) {
          return "function" == typeof t.readFloatLE && "function" == typeof t.slice && i(t.slice(0, 0))
      }(t) || !!t._isBuffer)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(197)
    , s = i(198);
  function n(t) {
      this.bindVertexArrayOES = t.bindVertexArray.bind(t),
      this.createVertexArrayOES = t.createVertexArray.bind(t),
      this.deleteVertexArrayOES = t.deleteVertexArray.bind(t)
  }
  t.exports = function(t, e, i, a) {
      var o, h = t.createVertexArray ? new n(t) : t.getExtension("OES_vertex_array_object");
      return (o = h ? r(t, h) : s(t)).update(e, i, a),
      o
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(109);
  function s(t, e, i, r, s, n) {
      this.location = t,
      this.dimension = e,
      this.a = i,
      this.b = r,
      this.c = s,
      this.d = n
  }
  function n(t, e, i) {
      this.gl = t,
      this._ext = e,
      this.handle = i,
      this._attribs = [],
      this._useElements = !1,
      this._elementsType = t.UNSIGNED_SHORT
  }
  s.prototype.bind = function(t) {
      switch (this.dimension) {
      case 1:
          t.vertexAttrib1f(this.location, this.a);
          break;
      case 2:
          t.vertexAttrib2f(this.location, this.a, this.b);
          break;
      case 3:
          t.vertexAttrib3f(this.location, this.a, this.b, this.c);
          break;
      case 4:
          t.vertexAttrib4f(this.location, this.a, this.b, this.c, this.d)
      }
  }
  ,
  n.prototype.bind = function() {
      this._ext.bindVertexArrayOES(this.handle);
      for (var t = 0; t < this._attribs.length; ++t)
          this._attribs[t].bind(this.gl)
  }
  ,
  n.prototype.unbind = function() {
      this._ext.bindVertexArrayOES(null)
  }
  ,
  n.prototype.dispose = function() {
      this._ext.deleteVertexArrayOES(this.handle)
  }
  ,
  n.prototype.update = function(t, e, i) {
      if (this.bind(),
      r(this.gl, e, t),
      this.unbind(),
      this._attribs.length = 0,
      t)
          for (var n = 0; n < t.length; ++n) {
              var a = t[n];
              "number" == typeof a ? this._attribs.push(new s(n,1,a)) : Array.isArray(a) && this._attribs.push(new s(n,a.length,a[0],a[1],a[2],a[3]))
          }
      this._useElements = !!e,
      this._elementsType = i || this.gl.UNSIGNED_SHORT
  }
  ,
  n.prototype.draw = function(t, e, i) {
      i = i || 0;
      var r = this.gl;
      this._useElements ? r.drawElements(t, e, this._elementsType, i) : r.drawArrays(t, i, e)
  }
  ,
  t.exports = function(t, e) {
      return new n(t,e,e.createVertexArrayOES())
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(109);
  function s(t) {
      this.gl = t,
      this._elements = null,
      this._attributes = null,
      this._elementsType = t.UNSIGNED_SHORT
  }
  s.prototype.bind = function() {
      r(this.gl, this._elements, this._attributes)
  }
  ,
  s.prototype.update = function(t, e, i) {
      this._elements = e,
      this._attributes = t,
      this._elementsType = i || this.gl.UNSIGNED_SHORT
  }
  ,
  s.prototype.dispose = function() {}
  ,
  s.prototype.unbind = function() {}
  ,
  s.prototype.draw = function(t, e, i) {
      i = i || 0;
      var r = this.gl;
      this._elements ? r.drawElements(t, e, this._elementsType, i) : r.drawArrays(t, i, e)
  }
  ,
  t.exports = function(t) {
      return new s(t)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(200)
    , s = i(201)
    , n = i(110);
  function a(t, e, i, r) {
      this.gl = t,
      this.handle = e,
      this.attributes = null,
      this.uniforms = null,
      this.types = null,
      this.vertexShader = i,
      this.fragmentShader = r
  }
  function o(t, e, i, r) {
      for (var s = 0; s < r.length; ++s)
          i[s] = t.getUniformLocation(e, r[s].name)
  }
  a.prototype.bind = function() {
      this.gl.useProgram(this.handle)
  }
  ,
  a.prototype.dispose = function() {
      var t = this.gl;
      t.deleteShader(this.vertexShader),
      t.deleteShader(this.fragmentShader),
      t.deleteProgram(this.handle)
  }
  ,
  a.prototype.updateExports = function(t, e) {
      var i = new Array(t.length)
        , a = this.handle
        , h = this.gl
        , l = o.bind(void 0, h, a, i, t);
      l(),
      this.types = {
          uniforms: n(t),
          attributes: n(e)
      },
      this.attributes = s(h, a, e, l),
      Object.defineProperty(this, "uniforms", r(h, a, t, i))
  }
  ,
  t.exports = function(t, e, i, r, s) {
      var n = t.createShader(t.VERTEX_SHADER);
      if (t.shaderSource(n, e),
      t.compileShader(n),
      !t.getShaderParameter(n, t.COMPILE_STATUS)) {
          var o = t.getShaderInfoLog(n);
          throw console.error("gl-shader: Error compling vertex shader:", o),
          new Error("gl-shader: Error compiling vertex shader:" + o)
      }
      var h = t.createShader(t.FRAGMENT_SHADER);
      if (t.shaderSource(h, i),
      t.compileShader(h),
      !t.getShaderParameter(h, t.COMPILE_STATUS)) {
          o = t.getShaderInfoLog(h);
          throw console.error("gl-shader: Error compiling fragment shader:", o),
          new Error("gl-shader: Error compiling fragment shader:" + o)
      }
      var l = t.createProgram();
      if (t.attachShader(l, h),
      t.attachShader(l, n),
      s.forEach((function(e) {
          "number" == typeof e.location && t.bindAttribLocation(l, e.location, e.name)
      }
      )),
      t.linkProgram(l),
      !t.getProgramParameter(l, t.LINK_STATUS)) {
          o = t.getProgramInfoLog(l);
          throw console.error("gl-shader: Error linking shader program:", o),
          new Error("gl-shader: Error linking shader program:" + o)
      }
      var u = new a(t,l,n,h);
      return u.updateExports(r, s),
      u
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(106)
    , s = i(110);
  function n(t) {
      return new Function("y","return function(){return y}")(t)
  }
  t.exports = function(t, e, i, a) {
      function o(t, e, i) {
          switch (i) {
          case "bool":
          case "int":
          case "sampler2D":
          case "samplerCube":
              return "gl.uniform1i(locations[" + e + "],obj" + t + ")";
          case "float":
              return "gl.uniform1f(locations[" + e + "],obj" + t + ")";
          default:
              var r = i.indexOf("vec");
              if (!(0 <= r && r <= 1 && i.length === 4 + r)) {
                  if (0 === i.indexOf("mat") && 4 === i.length) {
                      var s;
                      if ((s = i.charCodeAt(i.length - 1) - 48) < 2 || s > 4)
                          throw new Error("gl-shader: Invalid uniform dimension type for matrix " + name + ": " + i);
                      return "gl.uniformMatrix" + s + "fv(locations[" + e + "],false,obj" + t + ")"
                  }
                  throw new Error("gl-shader: Unknown uniform data type for " + name + ": " + i)
              }
              if ((s = i.charCodeAt(i.length - 1) - 48) < 2 || s > 4)
                  throw new Error("gl-shader: Invalid data type");
              switch (i.charAt(0)) {
              case "b":
              case "i":
                  return "gl.uniform" + s + "iv(locations[" + e + "],obj" + t + ")";
              case "v":
                  return "gl.uniform" + s + "fv(locations[" + e + "],obj" + t + ")";
              default:
                  throw new Error("gl-shader: Unrecognized data type for vector " + name + ": " + i)
              }
          }
      }
      function h(t, e) {
          if ("object" != typeof e)
              return [[t, e]];
          var i = [];
          for (var r in e) {
              var s = e[r]
                , n = t;
              parseInt(r) + "" === r ? n += "[" + r + "]" : n += "." + r,
              "object" == typeof s ? i.push.apply(i, h(n, s)) : i.push([n, s])
          }
          return i
      }
      function l(r) {
          for (var s = ["return function updateProperty(obj){"], n = h("", r), l = 0; l < n.length; ++l) {
              var u = n[l]
                , c = u[0]
                , d = u[1];
              a[d] && s.push(o(c, d, i[d].type))
          }
          return s.push("return obj}"),
          new Function("gl","prog","locations",s.join("\n"))(t, e, a)
      }
      function u(s, o, h) {
          if ("object" == typeof h) {
              var u = c(h);
              Object.defineProperty(s, o, {
                  get: n(u),
                  set: l(h),
                  enumerable: !0,
                  configurable: !1
              })
          } else
              a[h] ? Object.defineProperty(s, o, {
                  get: (d = h,
                  new Function("gl","prog","locations","return function(){return gl.getUniform(prog,locations[" + d + "])}")(t, e, a)),
                  set: l(h),
                  enumerable: !0,
                  configurable: !1
              }) : s[o] = function(t) {
                  switch (t) {
                  case "bool":
                      return !1;
                  case "int":
                  case "sampler2D":
                  case "samplerCube":
                  case "float":
                      return 0;
                  default:
                      var e = t.indexOf("vec");
                      if (0 <= e && e <= 1 && t.length === 4 + e) {
                          if ((i = t.charCodeAt(t.length - 1) - 48) < 2 || i > 4)
                              throw new Error("gl-shader: Invalid data type");
                          return "b" === t.charAt(0) ? r(i, !1) : r(i)
                      }
                      if (0 === t.indexOf("mat") && 4 === t.length) {
                          var i;
                          if ((i = t.charCodeAt(t.length - 1) - 48) < 2 || i > 4)
                              throw new Error("gl-shader: Invalid uniform dimension type for matrix " + name + ": " + t);
                          return r([i, i])
                      }
                      throw new Error("gl-shader: Unknown uniform data type for " + name + ": " + t)
                  }
              }(i[h].type);
          var d
      }
      function c(t) {
          var e;
          if (Array.isArray(t)) {
              e = new Array(t.length);
              for (var i = 0; i < t.length; ++i)
                  u(e, i, t[i])
          } else
              for (var r in e = {},
              t)
                  u(e, r, t[r]);
          return e
      }
      var d = s(i, !0);
      return {
          get: n(c(d)),
          set: l(d),
          enumerable: !0,
          configurable: !0
      }
  }
}
, function(t, e, i) {
  "use strict";
  function r(t, e, i, r, s, n, a) {
      this._gl = t,
      this._program = e,
      this._location = i,
      this._dimension = r,
      this._name = s,
      this._constFunc = n,
      this._relink = a
  }
  t.exports = function(t, e, i, r) {
      for (var s = {}, a = 0, o = i.length; a < o; ++a) {
          var h = i[a]
            , l = h.name
            , u = h.type
            , c = t.getAttribLocation(e, l);
          switch (u) {
          case "bool":
          case "int":
          case "float":
              n(t, e, c, 1, s, l, r);
              break;
          default:
              if (!(u.indexOf("vec") >= 0))
                  throw new Error("gl-shader: Unknown data type for attribute " + l + ": " + u);
              var d = u.charCodeAt(u.length - 1) - 48;
              if (d < 2 || d > 4)
                  throw new Error("gl-shader: Invalid data type for attribute " + l + ": " + u);
              n(t, e, c, d, s, l, r)
          }
      }
      return s
  }
  ;
  var s = r.prototype;
  function n(t, e, i, s, n, a, o) {
      for (var h = ["gl", "v"], l = [], u = 0; u < s; ++u)
          h.push("x" + u),
          l.push("x" + u);
      h.push(["if(x0.length===void 0){return gl.vertexAttrib", s, "f(v,", l.join(), ")}else{return gl.vertexAttrib", s, "fv(v,x0)}"].join(""));
      var c = Function.apply(void 0, h)
        , d = new r(t,e,i,s,a,c,o);
      Object.defineProperty(n, a, {
          set: function(e) {
              return t.disableVertexAttribArray(d._location),
              c(t, d._location, e),
              e
          },
          get: function() {
              return d
          },
          enumerable: !0
      })
  }
  s.pointer = function(t, e, i, r) {
      var s = this._gl;
      s.vertexAttribPointer(this._location, this._dimension, t || s.FLOAT, !!e, i || 0, r || 0),
      this._gl.enableVertexAttribArray(this._location)
  }
  ,
  Object.defineProperty(s, "location", {
      get: function() {
          return this._location
      },
      set: function(t) {
          t !== this._location && (this._location = t,
          this._gl.bindAttribLocation(this._program, t, this._name),
          this._gl.linkProgram(this._program),
          this._relink())
      }
  })
}
, function(t, e, i) {
  "use strict";
  var r = function(t) {
      this.w = 0,
      this.x = 0,
      this.y = 0,
      this.z = 0,
      0 !== t && (Array.isArray(t) ? this._setFromArray(t) : "object" == typeof t ? this._setFromObject(t) : "number" == typeof t ? this._setFromHexNumber(t) : "string" == typeof t && this._setFromHexString(t))
  }
    , s = r.prototype;
  s._setFromArray = function(t) {
      this._replaceColorVals.apply(this, t)
  }
  ,
  s._setFromObject = function(t) {
      this._replaceColorVals(t.r, t.g, t.b, t.a)
  }
  ,
  s._setFromHexNumber = function(t) {
      this._setFromHexString(t.toString(16))
  }
  ,
  s._setFromHexString = function(t) {
      var e = this._hexToRGB(t);
      this._setFromObject(e)
  }
  ,
  s._replaceColorVals = function(t, e, i, r) {
      this._replaceColorVal("w", t),
      this._replaceColorVal("x", e),
      this._replaceColorVal("y", i),
      this._replaceColorVal("z", r)
  }
  ,
  s._replaceColorVal = function(t, e) {
      void 0 !== e && ((e /= 255) < 0 ? e = 0 : e > 1 && (e = 1),
      this[t] = e)
  }
  ,
  s._hexToRGB = function(t) {
      t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (function(t, e, i, r) {
          return e + e + i + i + r + r
      }
      ));
      var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
      return e ? {
          r: parseInt(e[1], 16),
          g: parseInt(e[2], 16),
          b: parseInt(e[3], 16)
      } : null
  }
  ,
  t.exports = r
}
, function(t, e, i) {
  "use strict";
  var r, s = i(4).EventEmitterMicro, n = i(82), a = i(205).TextureLoader, o = i(111), h = function(t, e) {
      s.call(this),
      this.options = e || {},
      this.controller = t,
      this.options.basePath = this.options.basePath || window.location.pathname,
      this._textureLoader = new a(this.options),
      this._texturesRequired = 0,
      this._texturesLoaded = 0,
      this._textureLoader.on("load", this._handleTextureLoaderLoaded.bind(this))
  };
  (r = h.prototype = Object.create(s.prototype)).createTexture = function(t, e, i) {
      if (this._textureLoader.textures[e])
          throw 'Existing texture "' + e + '" already registered.';
      if (!t)
          throw "Textures require a WebGL context in order to be created.";
      return i = n(this.options, i || {}),
      this._textureLoader.createTexture(t, e, i),
      i.el ? this.createTextureFromElement(t, e, i.el) : this._texturesRequired++,
      this.getTexture(e)
  }
  ,
  r.createTextureFromElement = function(t, e, i) {
      var r = o(t, i)
        , s = this.getTextureDimensions(i);
      this._textureLoader.textures[e].texture = r,
      this._textureLoader.textures[e].isElement = !0,
      this._textureLoader.textures[e].el = i,
      this.bindTexture(e, r, s.width, s.height)
  }
  ,
  r.getTexture = function(t) {
      return this._textureLoader ? this._textureLoader.textures[t] : null
  }
  ,
  r.load = function(t) {
      var e;
      if (t = n(this.options, t || {}),
      this._texturesLoaded = 0,
      this._textureLoader)
          for (e in this._textureLoader.textures)
              this._textureLoader.textures.hasOwnProperty(e) && !this._textureLoader.textures[e].isElement && this._textureLoader.load(e, t)
  }
  ,
  r.bindTexture = function(t, e, i, r) {
      this._isPowerOfTwo(i) && this._isPowerOfTwo(r) ? (e.generateMipmap(),
      this.options.magFilter && (e.magFilter = e.gl[this.options.magFilter]),
      this.options.minFilter && (e.minFilter = e.gl[this.options.minFilter])) : (e.magFilter = e.gl.LINEAR,
      e.minFilter = e.gl.LINEAR,
      e.wrapT = e.gl.CLAMP_TO_EDGE,
      e.wrapS = e.gl.CLAMP_TO_EDGE),
      this.controller.shader && this.controller.renderer.bindTexture(t)
  }
  ,
  r.getTextureDimensions = function(t) {
      var e = t.width
        , i = t.height;
      return t instanceof HTMLVideoElement && (e = t.videoWidth,
      i = t.videoHeight),
      {
          width: e,
          height: i
      }
  }
  ,
  r.destroy = function() {
      var t;
      for (t in this._textureLoader.destroy(),
      this)
          this.hasOwnProperty(t) && (this[t] = null);
      s.prototype.destroy.call(this)
  }
  ,
  r._handleTextureLoaderLoaded = function(t) {
      if (this.controller && this.controller.renderer) {
          var e = this.controller._textureValMap[t.name]
            , i = this.getTextureDimensions(t.el);
          this.bindTexture(e, t.texture, i.width, i.height)
      }
      this.trigger("load", t),
      this._texturesLoaded++,
      this._texturesLoaded === this._texturesRequired && this.trigger("complete")
  }
  ,
  r._isPowerOfTwo = function(t) {
      return 0 == (t & t - 1)
  }
  ,
  t.exports = h
}
, function(t, e) {}
, function(t, e, i) {
  "use strict";
  t.exports = {
      TextureLoader: i(206)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(4).EventEmitterMicro
    , s = i(111)
    , n = i(112)
    , a = i(215).cname
    , o = i(84).DOMEmitter
    , h = i(121).Viewport
    , l = {
      basePath: "/",
      ignoreBreakpoint: !1,
      type: "image",
      extension: "png",
      allowXLarge: !1,
      timeout: 5e3
  }
    , u = ["mp4"];
  function c(t) {
      r.call(this),
      t = t || {},
      this.options = n.defaults(l, t),
      this.textureUnitCount = 0,
      this._boundOnBreakpoint = this._onBreakpoint.bind(this),
      h.on("breakpoint", this._boundOnBreakpoint),
      this._onBreakpoint(),
      this.textures = {}
  }
  var d = c.prototype = Object.create(r.prototype);
  d.createTexture = function(t, e, i) {
      var r = this._getTextureDOMElement(i);
      return this.textures[e] = {
          texture: {},
          el: r,
          unit: this.textureUnitCount,
          context: t,
          options: i || {}
      },
      this.textureUnitCount++,
      this.textures[e].texture
  }
  ,
  d.load = function(t, e) {
      if ("string" != typeof t)
          return !1;
      var i = this.textures[t];
      i || (this.createTexture(t, e),
      i = this.textures[t]);
      var r = n.defaults(i.options, e || {})
        , s = this.getAssetPath(t, r)
        , a = new XMLHttpRequest;
      return a.open("GET", s, !0),
      a.responseType = "arraybuffer",
      a.onload = this._handleXHRLoaded.bind(this, t, i, r, a),
      a.send(null),
      i.texture
  }
  ,
  d.emptyTextureCache = function() {
      var t;
      for (t in this.textures)
          this.textures.hasOwnProperty(t) && this.textures[t].texture.dispose();
      this.textures = {}
  }
  ,
  d.getAssetPath = function(t, e) {
      var i = (e = n.defaults(this.options, e || {})).basePath
        , r = e.extension
        , s = "";
      if (r = "." + r,
      !e.ignoreBreakpoint) {
          var o = this.breakpointName;
          "xlarge" !== o || e.allowXLarge || (o = "large"),
          s += "_" + o
      }
      if (!0 === e.retina)
          s += "_2x";
      else if (!1 === e.retina)
          s += "";
      else {
          var h = "";
          window.devicePixelRatio > 1.5 && (h = "_2x"),
          s += h
      }
      return a.formatUrl(i, t + s, r)
  }
  ,
  d.cancelXHR = function() {}
  ,
  d.destroy = function() {
      var t;
      for (t in this.emptyTextureCache(),
      this.cancelXHR(),
      h.off("breakpoint", this._boundOnBreakpoint),
      this)
          this.hasOwnProperty(t) && (this[t] = null)
  }
  ,
  d._getTextureDOMElement = function(t) {
      var e = "img";
      return u.indexOf(t.extension) > -1 && (e = "video"),
      document.createElement(e)
  }
  ,
  d._handleXHRLoaded = function(t, e, i, r) {
      if (r.status >= 400)
          return this.trigger("error", {
              name: t,
              xhr: r
          }),
          void (r = null);
      var s = window.URL || window.webkitURL
        , n = "image"
        , a = e.el.tagName.toLowerCase();
      "video" === a && (n = "video");
      var h = new Uint8Array(r.response)
        , l = new Blob([h],{
          type: n + "/" + i.extension
      })
        , u = s.createObjectURL(l)
        , c = new o(e.el)
        , d = "load";
      "video" === a && (d = "canplay"),
      c.on(d, this._onImageBlobTextureLoaded.bind(this, t, e, c, r)),
      e.el.src = u
  }
  ,
  d._onImageBlobTextureLoaded = function(t, e, i, r) {
      e.texture = s(e.context, e.el),
      this.textures[t] = e,
      this.trigger("load", {
          name: t,
          texture: e.texture,
          el: e.el
      }),
      i.destroy(),
      i = null
  }
  ,
  d._onBreakpoint = function() {
      this.breakpointName = h.getBreakpoint().name
  }
  ,
  t.exports = c
}
, function(t, e) {}
, function(t, e, i) {
  "use strict";
  var r = function() {};
  t.exports = function(t) {
      if (arguments.length > 1)
          throw new Error("Second argument not supported");
      if (null === t || "object" != typeof t)
          throw new TypeError("Object prototype may only be an Object.");
      return "function" == typeof Object.create ? Object.create(t) : (r.prototype = t,
      new r)
  }
}
, function(t, e, i) {
  "use strict";
  var r = Object.prototype.hasOwnProperty;
  t.exports = function(t) {
      if (Object.getPrototypeOf)
          return Object.getPrototypeOf(t);
      if ("object" != typeof t)
          throw new Error("Requested prototype of a value that is not an object.");
      if ("object" == typeof this.__proto__)
          return t.__proto__;
      var e, i = t.constructor;
      if (r.call(t, "constructor")) {
          if (e = i,
          !delete t.constructor)
              return null;
          i = t.constructor,
          t.constructor = e
      }
      return i ? i.prototype : null
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return "[object Date]" === Object.prototype.toString.call(t)
  }
}
, function(t, e, i) {
  "use strict";
  var r = Object.prototype.hasOwnProperty;
  t.exports = function(t) {
      var e;
      if ("object" != typeof t)
          throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object");
      for (e in t)
          if (r.call(t, e))
              return !1;
      return !0
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return !!window.RegExp && t instanceof RegExp
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(214);
  t.exports = function(t) {
      if ("object" != typeof t)
          throw new TypeError("toQueryParameters error: argument is not an object");
      return r(t, !1)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t, e) {
      var i = "";
      if (t) {
          var r = Object.keys(t)
            , s = r.length - 1;
          r.forEach((function(e, r) {
              var n = t[e]
                , a = (e = e.trim()) + (n = null === (n = n && "string" == typeof n ? n.trim() : n) ? "" : "=" + n) + (r === s ? "" : "&");
              i = i ? i.concat(a) : a
          }
          ))
      }
      return i && !1 !== e ? "?" + i : i
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      cname: i(216)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(217).path;
  function s(t) {
      return s.addPrefix(t)
  }
  s._prefix = "/global/elements/blank.gif".replace(/global\/.*/, ""),
  s.addPrefix = function(t) {
      return r.isAbsolute(t) ? t : (s._assertRootRelative(t),
      t = (t = s._prefix + t.replace(/^\//, "")).replace(/(^.+)(\/105\/)/, "$1/"))
  }
  ,
  s.formatUrl = function(t, e, i, n) {
      var a = r.format({
          dirname: t,
          filename: e,
          extname: i
      }, n);
      return r.isAbsolute(a) ? a : (s._assertRootRelative(t),
      s.addPrefix(a))
  }
  ,
  s._assertRootRelative = function(t) {
      if (!r.isRootRelative(t))
          throw new URIError("Only root-relative paths are currently supported")
  }
  ,
  t.exports = s
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      path: i(218)
  }
}
, function(t, e, i) {
  "use strict";
  function r(t) {
      return r.parse(t)
  }
  r.basename = function(t, e) {
      var i;
      r._assertStr(t);
      var s = t.match(/[^/]*$/)[0];
      return e && (i = s.match(new RegExp("(.*)" + e + "$"))) && (s = i[1]),
      s
  }
  ,
  r.dirname = function(t) {
      return r._assertStr(t),
      t.match(/^(.*)\b\/|.*/)[1] || t
  }
  ,
  r.extname = function(t) {
      r._assertStr(t);
      var e = t.match(/\.[^.]*$/);
      return e ? e[0] : ""
  }
  ,
  r.filename = function(t) {
      return r._assertStr(t),
      r.basename(t, r.extname(t))
  }
  ,
  r.format = function(t, e) {
      r._assertObj(t);
      var i = t.dirname ? t.dirname + "/" : "";
      return t.basename ? i += t.basename : t.filename && (i += t.filename,
      t.extname && (i += t.extname)),
      e && ("string" == typeof e ? i += "?" + e : Object.prototype.toString.call(e) === Object.prototype.toString.call([]) && (i += "?" + e.join("&"))),
      i
  }
  ,
  r.isAbsolute = function(t) {
      return r._assertStr(t),
      !!t.match(/(^http(s?))/)
  }
  ,
  r.isRootRelative = function(t) {
      return r._assertStr(t),
      !!t.match(/^\/(?!\/)/)
  }
  ,
  r.parse = function(t) {
      return r._assertStr(t),
      {
          dirname: r.dirname(t),
          basename: r.basename(t),
          filename: r.filename(t),
          extname: r.extname(t)
      }
  }
  ,
  r._assertStr = function(t) {
      r._assertType(t, "string")
  }
  ,
  r._assertObj = function(t) {
      r._assertType(t, "object")
  }
  ,
  r._assertType = function(t, e) {
      var i = typeof t;
      if ("undefined" === i || i !== e)
          throw new TypeError("path param must be of type " + e)
  }
  ,
  t.exports = r
}
, function(t, e, i) {
  "use strict";
  var r, s = i(220).EventEmitter, n = i(222), a = {
      addEventListener: i(226),
      removeEventListener: i(233),
      dispatchEvent: i(235)
  }, o = {
      querySelectorAll: i(114),
      matchesSelector: i(244)
  };
  function h(t) {
      null !== t && (this.el = t,
      this._bindings = {},
      this._delegateFuncs = {},
      this._eventEmitter = new s)
  }
  (r = h.prototype).on = function() {
      return this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._on),
      this
  }
  ,
  r.once = function() {
      return this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._once),
      this
  }
  ,
  r.off = function() {
      return this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._off),
      this
  }
  ,
  r.has = function(t, e, i, r) {
      var s, n;
      if ("string" == typeof e ? (s = e,
      n = i) : (n = e,
      r = i),
      s) {
          var a = this._getDelegateFuncBindingIdx(t, s, n, r, !0);
          return a > -1
      }
      return !(!this._eventEmitter || !this._eventEmitter.has.apply(this._eventEmitter, arguments))
  }
  ,
  r.trigger = function(t, e, i, r) {
      t = this._parseEventNames(t);
      var s, n, a, o = (t = this._cleanStringData(t)).length;
      for ("string" == typeof e ? (s = this._cleanStringData(e),
      n = i) : (n = e,
      i),
      a = 0; a < o; a++)
          this._triggerDOMEvents(t[a], n, s);
      return this
  }
  ,
  r.emitterTrigger = function(t, e, i) {
      if (!this._eventEmitter)
          return this;
      t = this._parseEventNames(t),
      t = this._cleanStringData(t),
      e = new n(e,this);
      var r, s = t.length;
      for (r = 0; r < s; r++)
          this._eventEmitter.trigger(t[r], e, i);
      return this
  }
  ,
  r.propagateTo = function(t, e) {
      return this._eventEmitter.propagateTo(t, e),
      this
  }
  ,
  r.stopPropagatingTo = function(t) {
      return this._eventEmitter.stopPropagatingTo(t),
      this
  }
  ,
  r.stopImmediatePropagation = function() {
      return this._eventEmitter.stopImmediatePropagation(),
      this
  }
  ,
  r.destroy = function() {
      var t;
      for (t in this._triggerInternalEvent("willdestroy"),
      this.off(),
      this)
          this.hasOwnProperty(t) && (this[t] = null)
  }
  ,
  r._parseEventNames = function(t) {
      return t ? t.split(" ") : [t]
  }
  ,
  r._onListenerEvent = function(t, e) {
      var i = new n(e,this);
      this._eventEmitter.trigger(t, i, !1)
  }
  ,
  r._setListener = function(t) {
      this._bindings[t] = this._onListenerEvent.bind(this, t),
      a.addEventListener(this.el, t, this._bindings[t])
  }
  ,
  r._removeListener = function(t) {
      a.removeEventListener(this.el, t, this._bindings[t]),
      this._bindings[t] = null
  }
  ,
  r._triggerInternalEvent = function(t, e) {
      this.emitterTrigger("dom-emitter:" + t, e)
  }
  ,
  r._normalizeArgumentsAndCall = function(t, e) {
      var i = {};
      if (0 !== t.length) {
          if ("string" == typeof t[0] || null === t[0])
              return t = this._cleanStringData(t),
              i.events = t[0],
              "string" == typeof t[1] ? (i.delegateQuery = t[1],
              i.callback = t[2],
              i.context = t[3]) : (i.callback = t[1],
              i.context = t[2]),
              void e.call(this, i);
          var r, s, n = t[0];
          for (r in n)
              n.hasOwnProperty(r) && (i = {},
              s = this._cleanStringData(r.split(":")),
              i.events = s[0],
              i.delegateQuery = s[1],
              i.callback = n[r],
              i.context = t[1],
              e.call(this, i))
      } else
          e.call(this, i)
  }
  ,
  r._registerDelegateFunc = function(t, e, i, r, s) {
      var n = this._delegateFunc.bind(this, t, e, i, s);
      return this._delegateFuncs[e] = this._delegateFuncs[e] || {},
      this._delegateFuncs[e][t] = this._delegateFuncs[e][t] || [],
      this._delegateFuncs[e][t].push({
          func: r,
          context: s,
          delegateFunc: n
      }),
      n
  }
  ,
  r._cleanStringData = function(t) {
      var e = !1;
      "string" == typeof t && (t = [t],
      e = !0);
      var i, r, s, n = [], a = t.length;
      for (i = 0; i < a; i++) {
          if ("string" == typeof (r = t[i])) {
              if ("" === r || " " === r)
                  continue;
              for (s = r.length; " " === r[0]; )
                  r = r.slice(1, s),
                  s--;
              for (; " " === r[s - 1]; )
                  r = r.slice(0, s - 1),
                  s--
          }
          n.push(r)
      }
      return e ? n[0] : n
  }
  ,
  r._unregisterDelegateFunc = function(t, e, i, r) {
      if (this._delegateFuncs[e] && this._delegateFuncs[e][t]) {
          var s, n = this._getDelegateFuncBindingIdx(t, e, i, r);
          return n > -1 && (s = this._delegateFuncs[e][t][n].delegateFunc,
          this._delegateFuncs[e][t].splice(n, 1),
          0 === this._delegateFuncs[e][t].length && (this._delegateFuncs[e][t] = null)),
          s
      }
  }
  ,
  r._unregisterDelegateFuncs = function(t, e) {
      var i;
      if (this._delegateFuncs[e] && (null === t || this._delegateFuncs[e][t]))
          if (null !== t)
              this._unbindDelegateFunc(t, e);
          else
              for (i in this._delegateFuncs[e])
                  this._delegateFuncs[e].hasOwnProperty(i) && this._unbindDelegateFunc(i, e)
  }
  ,
  r._unbindDelegateFunc = function(t, e) {
      for (var i, r, s = 0; this._delegateFuncs[e][t] && this._delegateFuncs[e][t][s]; )
          i = this._delegateFuncs[e][t][s],
          r = this._delegateFuncs[e][t][s].length,
          this._off({
              events: t,
              delegateQuery: e,
              callback: i.func,
              context: i.context
          }),
          this._delegateFuncs[e][t] && r === this._delegateFuncs[e][t].length && s++;
      i = r = null
  }
  ,
  r._unregisterDelegateFuncsByEvent = function(t) {
      var e;
      for (e in this._delegateFuncs)
          this._delegateFuncs.hasOwnProperty(e) && this._unregisterDelegateFuncs(t, e)
  }
  ,
  r._delegateFunc = function(t, e, i, r, s) {
      if (this._targetHasDelegateAncestor(s.target, e)) {
          var n = Array.prototype.slice.call(arguments, 0)
            , a = n.slice(4, n.length);
          r = r || window,
          "object" == typeof s.detail && (a[0] = s.detail),
          i.apply(r, a)
      }
  }
  ,
  r._targetHasDelegateAncestor = function(t, e) {
      for (var i = t; i && i !== this.el && i !== document.documentElement; ) {
          if (o.matchesSelector(i, e))
              return !0;
          i = i.parentNode
      }
      return !1
  }
  ,
  r._on = function(t) {
      var e = t.events
        , i = t.callback
        , r = t.delegateQuery
        , s = t.context
        , n = t.unboundCallback || i;
      (e = this._parseEventNames(e)).forEach(function(t, e, i, r, s) {
          this.has(s) || this._setListener(s),
          "string" == typeof r && (t = this._registerDelegateFunc(s, r, t, e, i)),
          this._triggerInternalEvent("willon", {
              evt: s,
              callback: t,
              context: i,
              delegateQuery: r
          }),
          this._eventEmitter.on(s, t, i),
          this._triggerInternalEvent("didon", {
              evt: s,
              callback: t,
              context: i,
              delegateQuery: r
          })
      }
      .bind(this, i, n, s, r)),
      e = i = n = r = s = null
  }
  ,
  r._off = function(t) {
      var e = t.events
        , i = t.callback
        , r = t.delegateQuery
        , s = t.context
        , n = t.unboundCallback || i;
      if (void 0 !== e)
          (e = this._parseEventNames(e)).forEach(function(t, e, i, r, s) {
              ("string" != typeof r || "function" != typeof e || (t = this._unregisterDelegateFunc(s, r, e, i))) && ("string" != typeof r || void 0 !== t ? "string" == typeof s && void 0 === t && (this._unregisterDelegateFuncsByEvent(s),
              "string" == typeof r) || (this._triggerInternalEvent("willoff", {
                  evt: s,
                  callback: t,
                  context: i,
                  delegateQuery: r
              }),
              this._eventEmitter.off(s, t, i),
              this._triggerInternalEvent("didoff", {
                  evt: s,
                  callback: t,
                  context: i,
                  delegateQuery: r
              }),
              this.has(s) || this._removeListener(s)) : this._unregisterDelegateFuncs(s, r))
          }
          .bind(this, i, n, s, r)),
          e = i = n = r = s = null;
      else {
          var a;
          for (a in this._eventEmitter.off(),
          this._bindings)
              this._bindings.hasOwnProperty(a) && this._removeListener(a);
          for (a in this._delegateFuncs)
              this._delegateFuncs.hasOwnProperty(a) && (this._delegateFuncs[a] = null)
      }
  }
  ,
  r._once = function(t) {
      var e = t.events
        , i = t.callback
        , r = t.delegateQuery
        , s = t.context;
      (e = this._parseEventNames(e)).forEach(function(t, e, i, r) {
          if ("string" == typeof i)
              return this._handleDelegateOnce(r, t, e, i);
          this.has(r) || this._setListener(r),
          this._triggerInternalEvent("willonce", {
              evt: r,
              callback: t,
              context: e,
              delegateQuery: i
          }),
          this._eventEmitter.once.call(this, r, t, e),
          this._triggerInternalEvent("didonce", {
              evt: r,
              callback: t,
              context: e,
              delegateQuery: i
          })
      }
      .bind(this, i, s, r)),
      e = i = r = s = null
  }
  ,
  r._handleDelegateOnce = function(t, e, i, r) {
      return this._triggerInternalEvent("willonce", {
          evt: t,
          callback: e,
          context: i,
          delegateQuery: r
      }),
      this._on({
          events: t,
          context: i,
          delegateQuery: r,
          callback: this._getDelegateOnceCallback.bind(this, t, e, i, r),
          unboundCallback: e
      }),
      this._triggerInternalEvent("didonce", {
          evt: t,
          callback: e,
          context: i,
          delegateQuery: r
      }),
      this
  }
  ,
  r._getDelegateOnceCallback = function(t, e, i, r) {
      var s = Array.prototype.slice.call(arguments, 0)
        , n = s.slice(4, s.length);
      e.apply(i, n),
      this._off({
          events: t,
          delegateQuery: r,
          callback: e,
          context: i
      })
  }
  ,
  r._getDelegateFuncBindingIdx = function(t, e, i, r, s) {
      var n = -1;
      if (this._delegateFuncs[e] && this._delegateFuncs[e][t]) {
          var a, o, h = this._delegateFuncs[e][t].length;
          for (a = 0; a < h; a++)
              if (o = this._delegateFuncs[e][t][a],
              s && void 0 === i && (i = o.func),
              o.func === i && o.context === r) {
                  n = a;
                  break
              }
      }
      return n
  }
  ,
  r._triggerDOMEvents = function(t, e, i) {
      var r = [this.el];
      i && (r = o.querySelectorAll(i, this.el));
      var s, n = r.length;
      for (s = 0; s < n; s++)
          a.dispatchEvent(r[s], t, {
              bubbles: !0,
              cancelable: !0,
              detail: e
          })
  }
  ,
  t.exports = h
}
, function(t, e, i) {
  t.exports.EventEmitter = i(221)
}
, function(t, e, i) {
  "use strict";
  var r = "EventEmitter:propagation"
    , s = function(t) {
      t && (this.context = t)
  }
    , n = s.prototype
    , a = function() {
      return this.hasOwnProperty("_events") || "object" == typeof this._events || (this._events = {}),
      this._events
  }
    , o = function(t, e) {
      var i = t[0]
        , r = t[1]
        , s = t[2];
      if ("string" != typeof i && "object" != typeof i || null === i || Array.isArray(i))
          throw new TypeError("Expecting event name to be a string or object.");
      if ("string" == typeof i && !r)
          throw new Error("Expecting a callback function to be provided.");
      if (r && "function" != typeof r) {
          if ("object" != typeof i || "object" != typeof r)
              throw new TypeError("Expecting callback to be a function.");
          s = r
      }
      if ("object" == typeof i)
          for (var n in i)
              e.call(this, n, i[n], s);
      "string" == typeof i && (i = i.split(" ")).forEach((function(t) {
          e.call(this, t, r, s)
      }
      ), this)
  }
    , h = function(t, e) {
      var i, r, s;
      if ((i = a.call(this)[t]) && 0 !== i.length)
          for (i = i.slice(),
          this._stoppedImmediatePropagation = !1,
          r = 0,
          s = i.length; r < s && (!this._stoppedImmediatePropagation && !e(i[r], r)); r++)
              ;
  }
    , l = function(t, e, i) {
      var r = -1;
      h.call(this, e, (function(t, e) {
          if (t.callback === i)
              return r = e,
              !0
      }
      )),
      -1 !== r && t[e].splice(r, 1)
  };
  n.on = function() {
      var t = a.call(this);
      return o.call(this, arguments, (function(e, i, r) {
          t[e] = t[e] || (t[e] = []),
          t[e].push({
              callback: i,
              context: r
          })
      }
      )),
      this
  }
  ,
  n.once = function() {
      return o.call(this, arguments, (function(t, e, i) {
          var r = function(s) {
              e.call(i || this, s),
              this.off(t, r)
          };
          this.on(t, r, this)
      }
      )),
      this
  }
  ,
  n.off = function(t, e) {
      var i = a.call(this);
      if (0 === arguments.length)
          this._events = {};
      else if (!t || "string" != typeof t && "object" != typeof t || Array.isArray(t))
          throw new TypeError("Expecting event name to be a string or object.");
      if ("object" == typeof t)
          for (var r in t)
              l.call(this, i, r, t[r]);
      if ("string" == typeof t) {
          var s = t.split(" ");
          1 === s.length ? e ? l.call(this, i, t, e) : i[t] = [] : s.forEach((function(t) {
              i[t] = []
          }
          ))
      }
      return this
  }
  ,
  n.trigger = function(t, e, i) {
      if (!t)
          throw new Error("trigger method requires an event name");
      if ("string" != typeof t)
          throw new TypeError("Expecting event names to be a string.");
      if (i && "boolean" != typeof i)
          throw new TypeError("Expecting doNotPropagate to be a boolean.");
      return (t = t.split(" ")).forEach((function(t) {
          h.call(this, t, function(t) {
              t.callback.call(t.context || this.context || this, e)
          }
          .bind(this)),
          i || h.call(this, r, (function(i) {
              var r = t;
              i.prefix && (r = i.prefix + r),
              i.emitter.trigger(r, e)
          }
          ))
      }
      ), this),
      this
  }
  ,
  n.propagateTo = function(t, e) {
      var i = a.call(this);
      i[r] || (this._events[r] = []),
      i[r].push({
          emitter: t,
          prefix: e
      })
  }
  ,
  n.stopPropagatingTo = function(t) {
      var e = a.call(this);
      if (t) {
          var i, s = e[r], n = s.length;
          for (i = 0; i < n; i++)
              if (s[i].emitter === t) {
                  s.splice(i, 1);
                  break
              }
      } else
          e[r] = []
  }
  ,
  n.stopImmediatePropagation = function() {
      this._stoppedImmediatePropagation = !0
  }
  ,
  n.has = function(t, e, i) {
      var r = a.call(this)
        , s = r[t];
      if (0 === arguments.length)
          return Object.keys(r);
      if (!s)
          return !1;
      if (!e)
          return s.length > 0;
      for (var n = 0, o = s.length; n < o; n++) {
          var h = s[n];
          if (i && e && h.context === i && h.callback === e)
              return !0;
          if (e && !i && h.callback === e)
              return !0
      }
      return !1
  }
  ,
  t.exports = s
}
, function(t, e, i) {
  "use strict";
  var r, s = {
      preventDefault: i(223),
      stopPropagation: i(224),
      target: i(225)
  }, n = function(t, e) {
      this._domEmitter = e,
      this.originalEvent = t || {},
      this._originalTarget = s.target(this.originalEvent),
      this.target = this._originalTarget || this._domEmitter.el,
      this.currentTarget = this._domEmitter.el,
      this.timeStamp = this.originalEvent.timeStamp || Date.now(),
      this._isDOMEvent(this.originalEvent) ? "object" == typeof this.originalEvent.detail && (this.data = this.originalEvent.detail) : t && (this.data = this.originalEvent,
      this.originalEvent = {})
  };
  (r = n.prototype).preventDefault = function() {
      s.preventDefault(this.originalEvent)
  }
  ,
  r.stopPropagation = function() {
      s.stopPropagation(this.originalEvent)
  }
  ,
  r.stopImmediatePropagation = function() {
      this.originalEvent.stopImmediatePropagation && this.originalEvent.stopImmediatePropagation(),
      this._domEmitter.stopImmediatePropagation()
  }
  ,
  r._isDOMEvent = function(t) {
      return !!(this._originalTarget || "undefined" !== document.createEvent && "undefined" != typeof CustomEvent && t instanceof CustomEvent)
  }
  ,
  t.exports = n
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      (t = t || window.event).preventDefault ? t.preventDefault() : t.returnValue = !1
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      (t = t || window.event).stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return void 0 !== (t = t || window.event).target ? t.target : t.srcElement
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(227)
    , s = i(85);
  t.exports = function(t, e, i, n) {
      return e = s(t, e),
      r(t, e, i, n)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t, e, i, r) {
      return t.addEventListener ? t.addEventListener(e, i, !!r) : t.attachEvent("on" + e, i),
      t
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(229)
    , s = i(230)
    , n = i(231)
    , a = i(232)
    , o = {};
  t.exports = function t(e, i) {
      var h, l, u;
      if (i = i || "div",
      e = e.toLowerCase(),
      i in o || (o[i] = {}),
      e in (l = o[i]))
          return l[e];
      if (r(e, i))
          return l[e] = e;
      if (e in s)
          for (u = 0; u < s[e].length; u++)
              if (h = s[e][u],
              r(h.toLowerCase(), i))
                  return l[e] = h;
      for (u = 0; u < a.evt.length; u++)
          if (h = a.evt[u] + e,
          r(h, i))
              return a.reduce(u),
              l[e] = h;
      return "window" !== i && n.indexOf(e) ? l[e] = t(e, "window") : l[e] = !1
  }
}
, function(t, e, i) {
  "use strict";
  var r = {
      window: window,
      document: document
  };
  t.exports = function(t, e) {
      var i;
      return t = "on" + t,
      e in r || (r[e] = document.createElement(e)),
      t in (i = r[e]) || "setAttribute"in i && (i.setAttribute(t, "return;"),
      "function" == typeof i[t])
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      transitionend: ["webkitTransitionEnd", "MSTransitionEnd"],
      animationstart: ["webkitAnimationStart", "MSAnimationStart"],
      animationend: ["webkitAnimationEnd", "MSAnimationEnd"],
      animationiteration: ["webkitAnimationIteration", "MSAnimationIteration"],
      fullscreenchange: ["MSFullscreenChange"],
      fullscreenerror: ["MSFullscreenError"]
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = ["transitionend", "animationstart", "animationend", "animationiteration"]
}
, function(t, e, i) {
  "use strict";
  var r = ["-webkit-", "-moz-", "-ms-"]
    , s = ["Webkit", "Moz", "ms"]
    , n = ["webkit", "moz", "ms"]
    , a = function() {
      this.initialize()
  }
    , o = a.prototype;
  o.initialize = function() {
      this.reduced = !1,
      this.css = r,
      this.dom = s,
      this.evt = n
  }
  ,
  o.reduce = function(t) {
      this.reduced || (this.reduced = !0,
      this.css = [this.css[t]],
      this.dom = [this.dom[t]],
      this.evt = [this.evt[t]])
  }
  ,
  t.exports = new a
}
, function(t, e, i) {
  "use strict";
  var r = i(234)
    , s = i(85);
  t.exports = function(t, e, i, n) {
      return e = s(t, e),
      r(t, e, i, n)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t, e, i, r) {
      return t.removeEventListener ? t.removeEventListener(e, i, !!r) : t.detachEvent("on" + e, i),
      t
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(236)
    , s = i(85);
  t.exports = function(t, e, i) {
      return e = s(t, e),
      r(t, e, i)
  }
}
, function(t, e, i) {
  "use strict";
  i(237),
  t.exports = function(t, e, i) {
      var r;
      return t.dispatchEvent ? (r = i ? new CustomEvent(e,i) : new CustomEvent(e),
      t.dispatchEvent(r)) : (r = document.createEventObject(),
      i && "detail"in i && (r.detail = i.detail),
      t.fireEvent("on" + e, r)),
      t
  }
}
, function(t, e) {}
, function(t, e) {}
, function(t, e, i) {
  "use strict";
  t.exports = 9
}
, function(t, e, i) {
  "use strict";
  i(116);
  var r = i(120)
    , s = i(241)
    , n = i(242)
    , a = function(t, e) {
      var i;
      if (e === document)
          return !0;
      for (i = t; (i = i.parentNode) && r(i); )
          if (i === e)
              return !0;
      return !1
  }
    , o = function(t) {
      "recalc"in t ? t.recalc(!1) : document.recalc(!1),
      window.scrollBy(0, 0)
  };
  t.exports = function(t, e) {
      var i, r = document.createElement("style"), h = "_ac_qsa_" + (Math.random() + "").slice(-6), l = [];
      for (e = e || document,
      document[h] = [],
      s(e) ? e.appendChild(r) : document.documentElement.firstChild.appendChild(r),
      r.styleSheet.cssText = "*{display:recalc;}" + t + '{ac-qsa:expression(document["' + h + '"] && document["' + h + '"].push(this));}',
      o(e); document[h].length; )
          (i = document[h].shift()).style.removeAttribute("ac-qsa"),
          -1 === l.indexOf(i) && a(i, e) && l.push(i);
      return document[h] = null,
      n(r),
      o(e),
      l
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(88)
    , s = i(86);
  t.exports = function(t) {
      return r(t, s)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(243);
  t.exports = function(t) {
      return r.childNode(t, !0, "remove"),
      t.parentNode ? t.parentNode.removeChild(t) : t
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(88)
    , s = i(118)
    , n = i(86)
    , a = i(87)
    , o = i(119)
    , h = [a, o, s, n]
    , l = [a, o, s]
    , u = [a, n];
  t.exports = {
      parentNode: function(t, e, i, s) {
          if (s = s || "target",
          (t || e) && !r(t, u))
              throw new TypeError(i + ": " + s + " must be an Element, or Document Fragment")
      },
      childNode: function(t, e, i, s) {
          if (s = s || "target",
          (t || e) && !r(t, l))
              throw new TypeError(i + ": " + s + " must be an Element, TextNode, or Comment")
      },
      insertNode: function(t, e, i, s) {
          if (s = s || "node",
          (t || e) && !r(t, h))
              throw new TypeError(i + ": " + s + " must be an Element, TextNode, Comment, or Document Fragment")
      },
      hasParentNode: function(t, e, i) {
          if (i = i || "target",
          !t.parentNode)
              throw new TypeError(e + ": " + i + " must have a parentNode")
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(120)
    , s = i(115)
    , n = i(245)
    , a = i(246);
  t.exports = function(t, e) {
      return s.selector(e, !0, "matchesSelector"),
      !!r(t) && (n ? n.call(t, e) : a(t, e))
  }
}
, function(t, e, i) {
  "use strict";
  var r;
  t.exports = window.Element ? (r = Element.prototype).matches || r.matchesSelector || r.webkitMatchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector : null
}
, function(t, e, i) {
  "use strict";
  var r = i(114);
  t.exports = function(t, e) {
      var i, s = t.parentNode || document, n = r(e, s);
      for (i = 0; i < n.length; i++)
          if (n[i] === t)
              return !0;
      return !1
  }
}
, function(t, e, i) {
  "use strict";
  var r, s = i(13).SharedInstance, n = i(89).WindowDelegate, a = i(264).BreakpointsDelegate;
  function o(t) {
      var e, i = n;
      for (e in i)
          i.hasOwnProperty(e) ? this[e] = i[e] : r[e] = i[e];
      this.addCustomEvent(a.getCustomEvent())
  }
  (r = o.prototype).getBreakpoint = function() {
      return a.getBreakpoint()
  }
  ,
  r.setBreakpoints = function(t) {
      return a.setBreakpoints(t)
  }
  ,
  t.exports = s.share("ac-viewport:Viewport", "3.2.0", o)
}
, function(t, e, i) {
  "use strict";
  var r, s = i(13).SharedInstance, n = i(84).DOMEmitter, a = i(249), o = i(251), h = i(90), l = i(260);
  function u() {
      var t;
      for (t in this._emitter = new n(window),
      this._controllers = {
          optimizer: new a(l),
          customEvent: new o
      },
      h)
          h.hasOwnProperty(t) && (this[t] = this._getProperty.bind(this, t),
          h[t] = h[t].bind(this));
      this._bindEvents()
  }
  (r = u.prototype).on = function(t, e, i) {
      var r = this._seperateCustomEvents(t);
      return this._optimizeEvents(r.standardEvents),
      this._customEventOn(r.customEvents, e, i),
      this._emitterOn.apply(this, arguments),
      this
  }
  ,
  r.once = function(t, e, i) {
      var r = this._seperateCustomEvents(t);
      return this._optimizeEvents(r.standardEvents),
      this._customEventOnce(r.customEvents, e, i),
      this._emitterOnce.apply(this, arguments),
      this
  }
  ,
  r.off = function(t, e, i) {
      var r = this._seperateCustomEvents(t)
        , s = !1;
      if (t || (s = !0),
      this._customEventOff(r.customEvents, e, i, s),
      this._emitterOff.apply(this, arguments),
      s)
          try {
              var n;
              for (n in this._controllers.optimizer._events)
                  this._controllers.optimizer._events.hasOwnProperty(n) && this._shouldDeoptimizeEvent(n, !0) && this._deoptimizeEvent(n);
              this._bindEvents()
          } catch (t) {}
      return this
  }
  ,
  r.has = function(t, e, i) {
      return this._emitter.has.apply(this._emitter, arguments)
  }
  ,
  r.trigger = function() {
      return this._emitter.trigger.apply(this._emitter, arguments),
      this
  }
  ,
  r.emitterTrigger = function() {
      return this._emitter.emitterTrigger.apply(this._emitter, arguments),
      this
  }
  ,
  r.propagateTo = function() {
      return this._emitter.propagateTo.apply(this._emitter, arguments),
      this
  }
  ,
  r.stopPropagatingTo = function() {
      return this._emitter.stopPropagatingTo.apply(this._emitter, arguments),
      this
  }
  ,
  r.addOptimizer = function(t) {
      return this._controllers.optimizer.add(t),
      this
  }
  ,
  r.addCustomEvent = function(t) {
      return this._controllers.customEvent.add(t),
      this
  }
  ,
  r._emitterOn = function() {
      this._emitter.on.apply(this._emitter, arguments)
  }
  ,
  r._emitterOnce = function() {
      this._emitter.once.apply(this._emitter, arguments)
  }
  ,
  r._emitterOff = function() {
      this._emitter.off.apply(this._emitter, arguments)
  }
  ,
  r._onEventUnbound = function(t) {
      var e = t.data.evt;
      this._shouldDeoptimizeEvent(e) && this._deoptimizeEvent(e)
  }
  ,
  r._customEventOn = function(t, e, i) {
      0 !== t.length && this._controllers.customEvent.on(t.join(" "), e, i)
  }
  ,
  r._customEventOnce = function(t, e, i) {
      0 !== t.length && this._controllers.customEvent.once(t.join(" "), e, i)
  }
  ,
  r._customEventOff = function(t, e, i, r) {
      (r || 0 !== t.length) && (r && 0 === t.length ? this._controllers.customEvent.off() : this._controllers.customEvent.off(t.join(" "), e, i))
  }
  ,
  r._getProperty = function(t, e) {
      var i = null;
      return e || (i = this._getOptimizedValue(t)),
      null === i && (i = h[t].call(this, e)),
      i
  }
  ,
  r._optimizeEvents = function(t) {
      var e, i, r = t.length;
      for (i = 0; i < r; i++)
          e = t[i],
          this._shouldOptimizeEvent(e) && this._optimizeEvent(e)
  }
  ,
  r._shouldOptimizeEvent = function(t) {
      return !(!this._controllers.optimizer.canOptimizeEvent(t) || this._controllers.optimizer.isOptimizingEvent(t))
  }
  ,
  r._shouldDeoptimizeEvent = function(t, e) {
      return !(!this._controllers.optimizer.isOptimizingEvent(t) || !(e || this._emitter._eventEmitter._events[t].length <= 1))
  }
  ,
  r._optimizeEvent = function(t) {
      var e = this._controllers.optimizer.getOptimizerByEvent(t);
      e.activate(),
      this._emitterOn(t, e.callback, e)
  }
  ,
  r._deoptimizeEvent = function(t) {
      var e = this._controllers.optimizer.getOptimizerByEvent(t);
      e.deactivate(),
      this._emitterOff(t, e.callback, e)
  }
  ,
  r._getOptimizedValue = function(t) {
      return this._controllers.optimizer.get(t)
  }
  ,
  r._seperateCustomEvents = function(t) {
      var e = {
          customEvents: [],
          standardEvents: []
      };
      if ("string" == typeof t) {
          var i, r, s = t.split(" "), n = s.length;
          for (r = 0; r < n; r++)
              i = s[r],
              this._controllers.customEvent.canHandleCustomEvent(i) ? e.customEvents.push(i) : e.standardEvents.push(i)
      }
      return e
  }
  ,
  r._bindEvents = function() {
      this._emitter.on("dom-emitter:didoff", this._onEventUnbound, this)
  }
  ,
  t.exports = s.share("ac-window-delegate:WindowDelegate", "3.0.2", u)
}
, function(t, e, i) {
  "use strict";
  var r, s = i(39).EventEmitter, n = function(t) {
      s.call(this),
      this.optimizers = t,
      this._events = {},
      this._properties = {},
      this._initialize()
  };
  (r = n.prototype = new s(null)).canOptimizeEvent = function(t) {
      return this._events.hasOwnProperty(t)
  }
  ,
  r.canOptimizeProperty = function(t) {
      return this._properties.hasOwnProperty(t)
  }
  ,
  r.isOptimizingEvent = function(t) {
      return !(!this._events[t] || !this._events[t].active)
  }
  ,
  r.isOptimizingProperty = function(t) {
      return !(!this._properties[t] || !this._properties[t].active)
  }
  ,
  r.add = function(t) {
      this._setOptimizerEvents(t),
      this._setOptimizerProperties(t),
      t.on("update", this._onUpdate, this),
      t.on("activate", this._onActivate, this),
      t.on("deactivate", this._onDeactivate, this)
  }
  ,
  r.get = function(t) {
      return this.isOptimizingProperty(t) ? this._properties[t].value : null
  }
  ,
  r.set = function(t, e) {
      return !!this._properties[t] && (this._properties[t].value = e,
      this)
  }
  ,
  r.getOptimizerByEvent = function(t) {
      return this._events[t] ? this._events[t] : null
  }
  ,
  r._initialize = function() {
      var t;
      for (t in this.optimizers)
          this.optimizers.hasOwnProperty(t) && this.add(this.optimizers[t])
  }
  ,
  r._onUpdate = function(t) {
      this.set(t.prop, t.val)
  }
  ,
  r._onActivate = function(t) {
      var e, i = t.propertyNames, r = i.length;
      for (e = 0; e < r; e++)
          this._properties[i[e]].active = !0
  }
  ,
  r._onDeactivate = function(t) {
      var e, i = t.propertyNames, r = i.length;
      for (e = 0; e < r; e++)
          this._properties[i[e]].active = !1
  }
  ,
  r._setOptimizerEvents = function(t) {
      var e, i = t.eventNames, r = i.length;
      for (e = 0; e < r; e++)
          this._setOptimizerEvent(i[e], t)
  }
  ,
  r._setOptimizerEvent = function(t, e) {
      this._events[t] || (this._events[t] = e)
  }
  ,
  r._setOptimizerProperties = function(t) {
      var e, i = t.propertyNames, r = i.length;
      for (e = 0; e < r; e++)
          this._setOptimizerProperty(i[e])
  }
  ,
  r._setOptimizerProperty = function(t) {
      this._properties.hasOwnProperty(t) || (this._properties[t] = {},
      this._properties[t].active = !1,
      this._properties[t].value = null)
  }
  ,
  t.exports = n
}
, function(t, e, i) {
  "use strict";
  var r = "EventEmitter:propagation"
    , s = function(t) {
      t && (this.context = t)
  }
    , n = s.prototype
    , a = function() {
      return this.hasOwnProperty("_events") || "object" == typeof this._events || (this._events = {}),
      this._events
  }
    , o = function(t, e) {
      var i = t[0]
        , r = t[1]
        , s = t[2];
      if ("string" != typeof i && "object" != typeof i || null === i || Array.isArray(i))
          throw new TypeError("Expecting event name to be a string or object.");
      if ("string" == typeof i && !r)
          throw new Error("Expecting a callback function to be provided.");
      if (r && "function" != typeof r) {
          if ("object" != typeof i || "object" != typeof r)
              throw new TypeError("Expecting callback to be a function.");
          s = r
      }
      if ("object" == typeof i)
          for (var n in i)
              e.call(this, n, i[n], s);
      "string" == typeof i && (i = i.split(" ")).forEach((function(t) {
          e.call(this, t, r, s)
      }
      ), this)
  }
    , h = function(t, e) {
      var i, r, s;
      if ((i = a.call(this)[t]) && 0 !== i.length)
          for (i = i.slice(),
          this._stoppedImmediatePropagation = !1,
          r = 0,
          s = i.length; r < s && (!this._stoppedImmediatePropagation && !e(i[r], r)); r++)
              ;
  }
    , l = function(t, e, i) {
      var r = -1;
      h.call(this, e, (function(t, e) {
          if (t.callback === i)
              return r = e,
              !0
      }
      )),
      -1 !== r && t[e].splice(r, 1)
  };
  n.on = function() {
      var t = a.call(this);
      return o.call(this, arguments, (function(e, i, r) {
          t[e] = t[e] || (t[e] = []),
          t[e].push({
              callback: i,
              context: r
          })
      }
      )),
      this
  }
  ,
  n.once = function() {
      return o.call(this, arguments, (function(t, e, i) {
          var r = function(s) {
              e.call(i || this, s),
              this.off(t, r)
          };
          this.on(t, r, this)
      }
      )),
      this
  }
  ,
  n.off = function(t, e) {
      var i = a.call(this);
      if (0 === arguments.length)
          this._events = {};
      else if (!t || "string" != typeof t && "object" != typeof t || Array.isArray(t))
          throw new TypeError("Expecting event name to be a string or object.");
      if ("object" == typeof t)
          for (var r in t)
              l.call(this, i, r, t[r]);
      if ("string" == typeof t) {
          var s = t.split(" ");
          1 === s.length ? e ? l.call(this, i, t, e) : i[t] = [] : s.forEach((function(t) {
              i[t] = []
          }
          ))
      }
      return this
  }
  ,
  n.trigger = function(t, e, i) {
      if (!t)
          throw new Error("trigger method requires an event name");
      if ("string" != typeof t)
          throw new TypeError("Expecting event names to be a string.");
      if (i && "boolean" != typeof i)
          throw new TypeError("Expecting doNotPropagate to be a boolean.");
      return (t = t.split(" ")).forEach((function(t) {
          h.call(this, t, function(t) {
              t.callback.call(t.context || this.context || this, e)
          }
          .bind(this)),
          i || h.call(this, r, (function(i) {
              var r = t;
              i.prefix && (r = i.prefix + r),
              i.emitter.trigger(r, e)
          }
          ))
      }
      ), this),
      this
  }
  ,
  n.propagateTo = function(t, e) {
      var i = a.call(this);
      i[r] || (this._events[r] = []),
      i[r].push({
          emitter: t,
          prefix: e
      })
  }
  ,
  n.stopPropagatingTo = function(t) {
      var e = a.call(this);
      if (t) {
          var i, s = e[r], n = s.length;
          for (i = 0; i < n; i++)
              if (s[i].emitter === t) {
                  s.splice(i, 1);
                  break
              }
      } else
          e[r] = []
  }
  ,
  n.stopImmediatePropagation = function() {
      this._stoppedImmediatePropagation = !0
  }
  ,
  n.has = function(t, e, i) {
      var r = a.call(this)
        , s = r[t];
      if (0 === arguments.length)
          return Object.keys(r);
      if (!s)
          return !1;
      if (!e)
          return s.length > 0;
      for (var n = 0, o = s.length; n < o; n++) {
          var h = s[n];
          if (i && e && h.context === i && h.callback === e)
              return !0;
          if (e && !i && h.callback === e)
              return !0
      }
      return !1
  }
  ,
  t.exports = s
}
, function(t, e, i) {
  "use strict";
  var r = i(39).EventEmitter
    , s = function() {
      this._emitter = new r,
      this._customEvents = {}
  }
    , n = s.prototype;
  n.on = function(t, e, i) {
      return this._activateCustomEvents(t),
      this._emitterOn.apply(this, arguments),
      this
  }
  ,
  n.once = function(t, e, i) {
      return this._emitterOnce.apply(this, arguments),
      this
  }
  ,
  n.off = function(t, e, i) {
      return this._emitterOff.apply(this, arguments),
      this._deactivateCustomEvents(t),
      this
  }
  ,
  n.has = function(t, e, i) {
      return this._emitter.has.apply(this._emitter, arguments)
  }
  ,
  n.trigger = function() {
      return this._emitter.trigger.apply(this._emitter, arguments),
      this
  }
  ,
  n.propagateTo = function() {
      return this._emitter.propagateTo.apply(this._emitter, arguments),
      this
  }
  ,
  n.stopPropagatingTo = function() {
      return this._emitter.stopPropagatingTo.apply(this._emitter, arguments),
      this
  }
  ,
  n.add = function(t) {
      this._customEvents[t.name] = t
  }
  ,
  n.canHandleCustomEvent = function(t) {
      return this._customEvents.hasOwnProperty(t)
  }
  ,
  n.isHandlingCustomEvent = function(t) {
      return !(!this._customEvents[t] || !this._customEvents[t].active)
  }
  ,
  n._activateCustomEvents = function(t) {
      var e, i, r = t.split(" "), s = r.length;
      for (i = 0; i < s; i++)
          e = r[i],
          this._customEvents[e] && !this._customEvents[e].active && (this._customEvents[e].initialize(),
          this._customEvents[e].active = !0)
  }
  ,
  n._deactivateCustomEvents = function(t) {
      var e;
      if (t && 0 !== t.length) {
          var i = t.split(" ")
            , r = i.length;
          for (e = 0; e < r; e++)
              this._deactivateCustomEvent(i[e])
      } else
          for (e in this._customEvents)
              this._customEvents.hasOwnProperty(e) && this._deactivateCustomEvent(e)
  }
  ,
  n._deactivateCustomEvent = function(t) {
      !this.has(t) && this._customEvents[t] && this._customEvents[t].active && (this._customEvents[t].deinitialize(),
      this._customEvents[t].active = !1)
  }
  ,
  n._emitterOn = function() {
      this._emitter.on.apply(this._emitter, arguments)
  }
  ,
  n._emitterOnce = function() {
      this._emitter.once.apply(this._emitter, arguments)
  }
  ,
  n._emitterOff = function() {
      this._emitter.off.apply(this._emitter, arguments)
  }
  ,
  t.exports = s
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return window.innerWidth || this.clientWidth(t)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return window.innerHeight || this.clientHeight(t)
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return document.documentElement.clientWidth
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return document.documentElement.clientHeight
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      var e = window.pageXOffset;
      e || (e = (document.documentElement || document.body.parentNode || document.body).scrollLeft);
      return e
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      var e = window.pageYOffset;
      e || (e = (document.documentElement || document.body.parentNode || document.body).scrollTop);
      return e
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return document.body.scrollWidth - this.innerWidth()
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = function(t) {
      return document.body.scrollHeight - this.innerHeight()
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(261)
    , s = i(262);
  t.exports = [r, s]
}
, function(t, e, i) {
  "use strict";
  var r = i(91)
    , s = i(90)
    , n = {
      eventNames: ["resize"],
      propertyNames: ["clientWidth", "clientHeight", "innerWidth", "innerHeight"]
  }
    , a = new r(n,(function(t) {
      var e, i = n.propertyNames, r = i.length;
      for (e = 0; e < r; e++)
          this.update(i[e], s[i[e]](!0))
  }
  ));
  t.exports = a
}
, function(t, e, i) {
  "use strict";
  var r = i(91)
    , s = i(90)
    , n = {
      eventNames: ["scroll"],
      propertyNames: ["scrollX", "scrollY", "maxScrollX", "maxScrollY"]
  }
    , a = new r(n,(function(t) {
      var e, i = n.propertyNames, r = i.length;
      for (e = 0; e < r; e++)
          this.update(i[e], s[i[e]](!0))
  }
  ));
  t.exports = a
}
, function(t, e, i) {
  "use strict";
  var r = i(39).EventEmitter;
  function s(t, e, i) {
      r.call(this),
      this.name = t,
      this.active = !1,
      this._initializeFunc = e,
      this._deinitializeFunc = i
  }
  var n = s.prototype = new r(null);
  n.initialize = function() {
      return this._initializeFunc && this._initializeFunc(),
      this
  }
  ,
  n.deinitialize = function() {
      return this._deinitializeFunc && this._deinitializeFunc(),
      this
  }
  ,
  t.exports = s
}
, function(t, e, i) {
  "use strict";
  t.exports = {
      BreakpointsDelegate: i(265)
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(13).SharedInstance
    , s = i(112)
    , n = i(89).WindowDelegate
    , a = i(89).WindowDelegateCustomEvent
    , o = (i(39).EventEmitter,
  "breakpoint")
    , h = "resize orientationchange"
    , l = {
      large: {
          "min-width": 1069,
          "max-width": 1441,
          content: 980,
          oldie: !0
      },
      xlarge: {
          "min-width": 1442,
          content: 980
      },
      medium: {
          "min-width": 736,
          "max-width": 1068,
          content: 692
      },
      small: {
          "min-width": 320,
          "max-width": 735,
          content: 288,
          "max-device-width": 768
      }
  }
    , u = "min-width"
    , c = "oldie";
  function d(t) {
      this._customEvent = new a(o,this._onBreakpointListenerAdded.bind(this),this._onBreakpointListenerRemoved.bind(this)),
      this.setBreakpoints(l)
  }
  var f = d.prototype;
  f.initialize = function() {
      this._breakpoint = null,
      this._lastBreakpoint = null,
      this._handleOldIE(),
      this._breakpointOrder = this._setBreakpointOrder(),
      this._isOldIE || this._handleResize()
  }
  ,
  f.getCustomEvent = function() {
      return this._customEvent
  }
  ,
  f.getBreakpoint = function() {
      return this._customEvent.active || this._handleResize(),
      this._breakpoint
  }
  ,
  f.setBreakpoints = function(t) {
      this.breakpoints = s.clone(t),
      this.initialize()
  }
  ,
  f._handleResize = function() {
      var t, e, i, r = n.clientWidth(), s = this._breakpointOrder.length;
      for (e = 0; e < s && (i = this._breakpointOrder[e],
      !(this.breakpoints[i]._breakPosition > r)); e++)
          ;
      e > 0 && (e -= 1),
      t = this.breakpoints[this._breakpointOrder[e]],
      this._breakpoint ? t.name !== this._breakpoint.name && (this._lastBreakpoint = this._breakpoint,
      this._breakpoint = t,
      n.trigger(o, {
          incoming: this._breakpoint,
          outgoing: this._lastBreakpoint
      })) : this._breakpoint = t
  }
  ,
  f._setBreakpointOrder = function() {
      var t, e = 0, i = [], r = [], s = u;
      for (t in this.breakpoints)
          this.breakpoints.hasOwnProperty(t) && (this.breakpoints[t].name = t,
          i.push(this.breakpoints[t][s]));
      return i.sort((function(t, e) {
          return t - e
      }
      )),
      i.forEach((function(t) {
          var e;
          for (e in this.breakpoints)
              this.breakpoints.hasOwnProperty(e) && this.breakpoints[e][s] === t && r.push(e)
      }
      ), this),
      r.forEach((function(t, i) {
          this.breakpoints[t]._breakPosition = e,
          r[i + 1] && (e = this.breakpoints[r[i + 1]][s])
      }
      ), this),
      r
  }
  ,
  f._handleOldIE = function() {
      var t, e = document.documentElement, i = c;
      if (!(e.className.indexOf("no-" + i) > -1 || -1 === e.className.indexOf(i)))
          for (t in this._isOldIE = !0,
          this._replaceBreakpoints((function(t) {
              return !0 === t[i]
          }
          )),
          this.breakpoints)
              if (this.breakpoints.hasOwnProperty(t))
                  return void (this._breakpoint = this.breakpoints[t])
  }
  ,
  f._replaceBreakpoints = function(t) {
      var e, i = {};
      for (e in this.breakpoints)
          this.breakpoints.hasOwnProperty(e) && t(this.breakpoints[e]) && (i[e] = s.clone(this.breakpoints[e]));
      this.breakpoints = i
  }
  ,
  f._onBreakpointListenerAdded = function() {
      n.on(h, this._handleResize, this)
  }
  ,
  f._onBreakpointListenerRemoved = function() {
      n.off(h, this._handleResize, this)
  }
  ,
  t.exports = r.share("ac-breakpoints-delegate:BreakpointsDelegate", "2.1.1", d)
}
, function(t, e, i) {
  "use strict";
  t.exports = "attribute vec3 position;\t\t\t\t\tvarying vec2 vUV;\t\t\t\t\tvoid main() {\t\t\t\t\t\tgl_Position = vec4(position, 1.0);\t\t\t\t\t\tvUV = position.xy * 0.5 + 0.5;\t\t\t\t\t}"
}
, function(t, e, i) {
  "use strict";
  t.exports = "varying vec2 vUV;\nuniform float time;\nuniform vec2 resolution;\nuniform float amplitude1;\nuniform float progress1;\nuniform float speed1;\nuniform float inverse1;\nuniform float amplitude2;\nuniform float progress2;\nuniform float speed2;\nuniform float inverse2;\nuniform float amplitude3;\nuniform float progress3;\nuniform float speed3;\nuniform float inverse3;\nuniform float amplitude4;\nuniform float progress4;\nuniform float speed4;\nuniform float inverse4;\nuniform float amplitude5;\nuniform float progress5;\nuniform float speed5;\nuniform float inverse5;\nuniform float amplitude6;\nuniform float progress6;\nuniform float speed6;\nuniform float inverse6;\nuniform sampler2D slitTex1;\nuniform sampler2D slitTex2;\nuniform float opacity1;\nuniform float opacity2;\nuniform float opacity3;\nuniform float opacity4;\nuniform float opacity5;\nuniform float opacity6;\nuniform float thickness1;\nuniform float thickness2;\nuniform float thickness3;\nuniform float thickness4;\nuniform float thickness5;\nuniform float thickness6;\nuniform float smoothing1;\nuniform float smoothing2;\nuniform float smoothing3;\nuniform float smoothing4;\nuniform float smoothing5;\nuniform float smoothing6;\nuniform float low1;\nuniform float high1;\nuniform float low2;\nuniform float high2;\nuniform float low3;\nuniform float high3;\nuniform float low4;\nuniform float high4;\nuniform float low5;\nuniform float high5;\nuniform float low6;\nuniform float high6;\nuniform vec4 waveColor;\nuniform vec4 inverseColor;\nuniform bool showInverse;\n// tapering\nuniform float taperIn;\nuniform float taperOut;\n\n\n\nvoid main() {\n\n//   vec2 vUV = gl_FragCoord.xy/resolution.xy;\n\n//   vec2 samplePoint = vec2(progress,vUV.x);\n\n  // Sample point on X axis for current frame\n  vec2 samplePoint1 = vec2(fract(time*speed1),vUV.x);\n  vec2 samplePoint2 = vec2(fract(time*speed2),vUV.x);\n  vec2 samplePoint3 = vec2(fract(time*speed3),vUV.x);\n  vec2 samplePoint4 = vec2(fract(time*speed4),vUV.x);\n  vec2 samplePoint5 = vec2(fract(time*speed5),vUV.x);\n  vec2 samplePoint6 = vec2(fract(time*speed6),vUV.x);\n\n  float height1 = texture2D(slitTex1, samplePoint1).r * amplitude1;\n  height1 *= smoothstep(taperOut, taperIn, vUV.x) + height1*0.1; // taper amplitude 0.1\n  height1 = 0.5 + height1/2.;\n  float height2 = texture2D(slitTex2, samplePoint2).r * amplitude2;\n  height2 *= smoothstep(taperOut, taperIn, vUV.x) + height2*0.1;\n  height2 = 0.5 + height2/2.;\n  float height3 = texture2D(slitTex2, samplePoint3).r * amplitude3;\n  height3 *= smoothstep(taperOut, taperIn, vUV.x) + height3*0.1;\n  height3 = 0.5 + height3/2.;\n  float height4 = texture2D(slitTex2, samplePoint4).r * amplitude4;\n  height4 *= smoothstep(taperOut, taperIn, vUV.x) + height4*0.1;\n  height4 = 0.5 + height4/2.;\n  float height5 = texture2D(slitTex2, samplePoint5).r * amplitude5;\n  height5 *= smoothstep(taperOut, taperIn, vUV.x) + height5*0.1;\n  height5 = 0.5 + height5/2.;\n  float height6 = texture2D(slitTex2, samplePoint6).r * amplitude6;\n  height6 *= smoothstep(taperOut, taperIn, vUV.x) + height6*0.1;\n  height6 = 0.5 + height6/2.;\n\n  // Difference in smoothstep values decides sharpness\n  // Higher value thickens the line\n  float wave1 = smoothstep(thickness1/100.+smoothing1/resolution.y,thickness1/100., abs(height1-vUV.y));\n  vec4 color1 = mix(vec4(0.), waveColor, vec4(vec3(wave1), 1.));\n  if (showInverse == true) {\n    wave1 = smoothstep(thickness1/100.+smoothing1/resolution.y,thickness1/100., abs(height1-(1.-vUV.y)));\n\tvec4 inverseWaveColor1 = mix(vec4(0.), inverseColor, vec4(vec3(wave1), 1.));\n\tcolor1 = mix(color1, inverseWaveColor1, 0.5)*2.;\n  }\n\n  float wave2 = smoothstep(thickness2/100.+smoothing2/resolution.y,thickness2/100., abs(height2-vUV.y));\n  vec4 color2 = mix(vec4(0.), waveColor, vec4(vec3(wave2), 1.));\n  if (showInverse == true) {\n    wave2 = smoothstep(thickness2/100.+smoothing2/resolution.y,thickness2/100., abs(height2-(1.-vUV.y)));\n\tvec4 inverseWaveColor2 = mix(vec4(0.), inverseColor, vec4(vec3(wave2), 1.));\n\tcolor2 = mix(color2, inverseWaveColor2, 0.5)*2.;\n  }\n\n  float wave3 = smoothstep(thickness3/100.+smoothing3/resolution.y,thickness3/100., abs(height3-vUV.y));\n  vec4 color3 = mix(vec4(0.), waveColor, vec4(vec3(wave3), 1.));\n  if (showInverse == true) {\n    wave3 = smoothstep(thickness3/100.+smoothing3/resolution.y,thickness3/100., abs(height3-(1.-vUV.y)));\n\tvec4 inverseWaveColor3 = mix(vec4(0.), inverseColor, vec4(vec3(wave3), 1.));\n\tcolor3 = mix(color3, inverseWaveColor3, 0.5)*2.;\n  }\n\n  float wave4 = smoothstep(thickness4/100.+smoothing4/resolution.y,thickness4/100., abs(height4-vUV.y));\n  vec4 color4 = mix(vec4(0.), waveColor, vec4(vec3(wave4), 1.));\n  if (showInverse == true) {\n    wave4 = smoothstep(thickness4/100.+smoothing4/resolution.y,thickness4/100., abs(height4-(1.-vUV.y)));\n\tvec4 inverseWaveColor4 = mix(vec4(0.), inverseColor, vec4(vec3(wave4), 1.));\n\tcolor4 = mix(color4, inverseWaveColor4, 0.5)*2.;\n  }\n\n  float wave5 = smoothstep(thickness5/100.+smoothing5/resolution.y,thickness5/100., abs(height5-vUV.y));\n  vec4 color5 = mix(vec4(0.), waveColor, vec4(vec3(wave5), 1.));\n  if (showInverse == true) {\n    wave5 = smoothstep(thickness5/100.+smoothing5/resolution.y,thickness5/100., abs(height5-(1.-vUV.y)));\n\tvec4 inverseWaveColor5 = mix(vec4(0.), inverseColor, vec4(vec3(wave5), 1.));\n\tcolor5 = mix(color5, inverseWaveColor5, 0.5)*2.;\n  }\n  float wave6 = smoothstep(thickness6/100.+smoothing6/resolution.y,thickness6/100., abs(height6-vUV.y));\n  vec4 color6 = mix(vec4(0.), waveColor, vec4(vec3(wave6), 1.));\n  if (showInverse == true) {\n    wave6 = smoothstep(thickness6/100.+smoothing6/resolution.y,thickness6/100., abs(height6-(1.-vUV.y)));\n\tvec4 inverseWaveColor6 = mix(vec4(0.), inverseColor, vec4(vec3(wave6), 1.));\n\tcolor6 = mix(color6, inverseWaveColor6, 0.5)*2.;\n  }\n\n  color1 *= smoothstep(low1,high1, abs(height1));\n  color2 *= smoothstep(low2,high2, abs(height2));\n  color3 *= smoothstep(low3,high3, abs(height3));\n  color4 *= smoothstep(low4,high4, abs(height4));\n  color5 *= smoothstep(low5,high5, abs(height5));\n  color6 *= smoothstep(low6,high6, abs(height6));\n  color1 *=opacity1;\n  color2 *=opacity2;\n  color3 *=opacity3;\n  color4 *=opacity4;\n  color5 *=opacity5;\n  color6 *=opacity6;\n  vec4 firstHalfColor = mix(mix(color1, color2, 0.5)*2., color3, 0.5)*2.;\n  vec4 secondHalfColor = mix(mix(color4, color5, 0.5)*2., color6, 0.5)*2.;\n  gl_FragColor = mix(firstHalfColor, secondHalfColor, 0.5)*2.;\n}"
}
, function(t, e, i) {
  "use strict";
  var r = i(9);
  const s = i(3)
    , n = [...r.disabledWhen, "mq-small-shorter"];
  t.exports = class extends s {
      constructor(t) {
          super(t)
      }
      mounted() {
          this.xrayVideo = this.gum.getComponentOfType("XrayParticleVideo", this.el.querySelector(".xray-particles-video")),
          this.anim.addKeyframe(this.el, {
              start: "t - 130vh",
              end: "b + 30vh",
              cssClass: ["near-section"],
              toggle: !0
          });
          const t = this.el.querySelectorAll(".xray-airpod img")
            , e = Array.from(this.el.querySelectorAll(".xray-copy"))
            , i = this.el.querySelector(".xray-sticky");
          this.scrollContainer = this.el.querySelector(".xray-scroll-container");
          const s = [this.scrollContainer, i]
            , a = "((a0h - a1h) - ((a0h - a1h) * 0.4))"
            , o = "a0t - css(--r-localnav-height)";
          let h = o;
          const l = 1 / (3 * e.length + 1)
            , u = `(${a} * ${l})`
            , c = `(${a} * ${l})`;
          e.forEach((t=>{
              this.anim.addKeyframe(t, {
                  start: h,
                  end: `${h} + ${u}`,
                  opacity: [0, 1],
                  anchors: s,
                  ease: r.ease,
                  disabledWhen: n
              }),
              this.anim.addKeyframe(t, {
                  start: `${h} + ${u} + ${c}`,
                  end: `${h} + ${u} + ${c} + ${u}`,
                  opacity: [1, 0],
                  anchors: s,
                  ease: r.ease,
                  disabledWhen: n
              });
              const e = `((${u} + ${c} + ${u}) / 2)`;
              this.anim.addKeyframe(t, {
                  start: h,
                  end: `${h} + ${u} + ${c} + ${u}`,
                  y: [e, `${e} * -1`],
                  anchors: s,
                  breakpointMask: "LM",
                  disabledWhen: n
              }),
              h = `${h} + ${u} + ${c} + ${u}`
          }
          )),
          h = `${o} + ${u} + ${c} + ${u}`,
          t.forEach(((t,e)=>{
              let i = 0 === e ? o : h
                , a = `${h} + ${u} + ${c} + ${u}`;
              2 === e && (i = `${i}  - ${u}`,
              a = `${a}    - ${u}`,
              h = `${h} - ${u}`,
              this.anim.addKeyframe(t, {
                  start: i,
                  end: `${h} + ${u}`,
                  opacity: [0, 1],
                  anchors: s,
                  ease: r.ease,
                  disabledWhen: n
              }),
              this.anim.addKeyframe(t, {
                  start: i,
                  end: a,
                  scale: [.9344, .8],
                  anchors: s,
                  ease: r.ease,
                  disabledWhen: n
              })),
              2 !== e && (1 === e && this.anim.addKeyframe(t, {
                  start: i,
                  end: `${h} + ${u}`,
                  opacity: [0, 1],
                  anchors: s,
                  ease: r.ease,
                  disabledWhen: n
              }),
              this.anim.addKeyframe(t, {
                  start: `${h} + ${u} + ${c}`,
                  end: a,
                  opacity: [1, 0],
                  anchors: s,
                  ease: r.ease,
                  disabledWhen: n
              }),
              this.anim.addKeyframe(t, {
                  start: i,
                  end: a,
                  scale: [1, .9],
                  anchors: s,
                  ease: r.ease,
                  disabledWhen: n
              }),
              h = `${h} + ${u} + ${c} + ${u}`)
          }
          )),
          this.anim.addKeyframe(i, {
              start: "a0b - 100vh + css(margin-top, a1) + css(padding-top, a1)",
              end: "a0b - 100vh",
              "--scrim-opacity": [0, 1],
              anchors: [s[0], ".section-noise-cancellation"],
              disabledWhen: n
          });
          const d = this.el.querySelector(".xray-particles-container")
            , f = [d, this.el.querySelector(".play-pause-button-xray")];
          this.anim.addEvent(d, {
              start: `${h} + (${u} * 0.75)`,
              event: "show-hide-last-airpod-and-video",
              onEvent: ()=>f.forEach((t=>t.classList.add("show"))),
              onEventReverse: ()=>f.forEach((t=>t.classList.remove("show"))),
              anchors: s,
              ease: r.ease,
              disabledWhen: n
          });
          const p = "clamp(max(100vh/h, 100vw/w), 1, 1.15)";
          this.xrayVideo ? this.anim.addEvent(this.xrayVideo.el, {
              start: `${h} + ${u}`,
              end: "a0b",
              event: "play-xray-video",
              onEnterOnce: ()=>this.xrayVideo.play(),
              anchors: s,
              disabledWhen: n
          }) : this.anim.addKeyframe(this.el.querySelector(".xray-particles-pic"), {
              start: "t",
              end: "t",
              scale: [p, p]
          })
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(0)
    , s = r(i(42))
    , n = r(i(38))
    , a = r(i(44))
    , o = r(i(81))
    , h = i(9);
  const l = i(3)
    , u = [...h.disabledWhen, "mq-small-shorter"];
  t.exports = class extends l {
      constructor(t) {
          super(t),
          this.prefersReducedMotion = document.documentElement.classList.contains("reduced-motion"),
          this.scrollContainer = document.body.querySelector(".xray-scroll-container"),
          this.stickyEl = document.body.querySelector(".xray-sticky"),
          this.button = document.body.querySelector(".play-pause-button-xray")
      }
      mounted() {
          this.inlineVideo = new s.default({
              el: this.el,
              plugins: [n.default, a.default, o.default],
              playPauseButton: this.button,
              anim: this.anim
          }),
          this.loadKF = this.anim.addEvent(this.el, {
              start: "a0t - 50vh",
              end: "a0b + 100vh",
              event: "xray-video-load",
              anchors: [this.scrollContainer, this.stickyEl],
              disabledWhen: u,
              onEnterOnce: ()=>this.load()
          }),
          this.inlineVideo.on(n.default.LOAD_TIMEOUT_EVENT, (()=>this.destroy()))
      }
      async load() {
          try {
              await this.inlineVideo.load(),
              this.button.removeAttribute("aria-hidden"),
              this.button.removeAttribute("disabled")
          } catch (t) {}
      }
      async play() {
          try {
              this.inlineVideo && await this.inlineVideo.play()
          } catch (t) {
              this.destroy()
          }
      }
      pause() {
          this.inlineVideo && this.inlineVideo.el.pause()
      }
      destroy() {
          this.button.style.display = "none",
          this.inlineVideo.el.style.display = "none",
          this.loadKF.remove(),
          this.inlineVideo.destroy(),
          this.inlineVideo = null,
          this.el.parentElement.querySelector(".xray-particles-pic").style.display = "block"
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("enhanced") && document.documentElement.classList.contains("heavy-media")
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(3)
    , {ease: s} = i(9);
  t.exports = class extends r {
      constructor(t) {
          super(t)
      }
      mounted() {
          this.anim.addKeyframe(this.el, {
              start: "t - 130vh",
              end: "b + 30vh",
              cssClass: ["near-section"],
              toggle: !0
          });
          const t = this.el.querySelector(".anc-airpods-microphones-pic");
          this.anim.addKeyframe(t, {
              start: "t - 100vh",
              end: "t - 40vh",
              opacity: [0, 1],
              y: [90, 0],
              ease: s,
              disabledWhen: ["no-enhanced"]
          });
          const e = this.el.querySelector(".pin");
          this.anim.addKeyframe(e, {
              start: "a0t - 100vh",
              end: "a0t - 40vh",
              y: ["-60vh", 0],
              ease: s,
              anchors: [t],
              disabledWhen: ["no-enhanced", "text-zoom"]
          })
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(3)
    , {disabledWhen: s} = i(9);
  t.exports = class extends r {
      constructor(t) {
          super(t)
      }
      mounted() {
          this.anim.addKeyframe(this.el, {
              start: "t - 150vh",
              end: "b + 50vh",
              cssClass: ["near-section"],
              toggle: !0
          });
          const t = this.anim.createTimeGroup()
            , e = this.el.querySelector(".touch-control-swipe-dot")
            , i = "easeInQuart";
          t.addKeyframe(e, {
              start: 0,
              end: .35,
              opacity: [0, .7],
              anchors: [this.el],
              easeFunction: i,
              disabledWhen: s
          }),
          t.addKeyframe(e, {
              start: .35,
              end: 1,
              opacity: [.7, 0],
              anchors: [this.el],
              easeFunction: i,
              disabledWhen: s
          }),
          t.addKeyframe(e, {
              start: 0,
              end: 1,
              y: ["0", "(a0h - h) * -1"],
              anchors: [this.el],
              easeFunction: i,
              disabledWhen: s
          }),
          t.addKeyframe(e, {
              start: 1,
              end: 1.35,
              opacity: [0, .7],
              anchors: [this.el],
              easeFunction: i,
              disabledWhen: s
          }),
          t.addKeyframe(e, {
              start: 1.35,
              end: 2,
              opacity: [.7, 0],
              anchors: [this.el],
              easeFunction: i,
              disabledWhen: s
          }),
          t.addKeyframe(e, {
              start: 1,
              end: 2,
              y: ["(a0h - h) * -1", "0"],
              anchors: [this.el],
              easeFunction: i,
              disabledWhen: s
          }),
          this.anim.addEvent(this.el, {
              start: "b - 100vh + css(--r-localnav-height)",
              end: "t - css(--r-localnav-height)",
              event: "touch-control-swipe",
              onEnter: ()=>{
                  t.time(0),
                  t.play()
              }
          })
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("enhanced")
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(3)
    , {ease: s} = i(9)
    , n = "no-enhanced";
  t.exports = class extends r {
      constructor(t) {
          super(t)
      }
      mounted() {
          this.anim.addKeyframe(this.el, {
              start: "t - 130vh",
              end: "b + 30vh",
              cssClass: ["near-section"],
              toggle: !0,
              disabledWhen: n
          });
          const t = this.el.querySelectorAll(".ear-tips-exploded-tip-pic")
            , e = this.el.querySelectorAll(".ear-tips-exploded-label");
          this.createKeyframes(t, e, "LM"),
          this.anim.addKeyframe(this.el, {
              start: "a0b - 90vh",
              end: "t",
              x: [0, "min(100vw - r, 0)"],
              anchors: [this.el.querySelector(".ear-tips-exploded-tip.xsmall picture")],
              breakpointMask: "S",
              ease: s,
              disabledWhen: n
          })
      }
      createKeyframes(t, e, i) {
          t.forEach(((t,r)=>{
              const a = `a0t - ${80 - 5 * r}vh`
                , o = `a0t - ${80 - 5 * r - 10}vh`;
              this.anim.addKeyframe(t, {
                  start: a,
                  end: o,
                  x: [25, 0],
                  opacity: [0, 1],
                  anchors: [this.el],
                  breakpointMask: i,
                  ease: s,
                  disabledWhen: n
              });
              const h = e[r];
              this.anim.addKeyframe(h, {
                  start: a,
                  end: o,
                  opacity: [0, 1],
                  anchors: [this.el],
                  breakpointMask: i,
                  ease: s,
                  disabledWhen: n
              })
          }
          ))
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("enhanced") && document.documentElement.classList.contains("no-reduced-motion")
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(3)
    , s = i(274)
    , n = i(34)
    , a = ["no-heavy-media", "android", "no-autoplay"];
  t.exports = class extends r {
      constructor(t) {
          super(t)
      }
      mounted() {
          this.init(),
          n(this, ".fallback-image", a),
          s(this.el)
      }
      init() {
          this.timelineExtender = this.el.querySelector(".timeline-dancer-sequence"),
          this.dancerContainer = this.el.querySelector(".dancer-container");
          const t = this.el.querySelectorAll(".dancer-copy")
            , e = "t - css(--r-localnav-height) - 50vh + 50h";
          t.forEach((t=>{
              this.anim.addKeyframe(t, {
                  start: `${e} - 15vh`,
                  end: `${e} - 5vh`,
                  opacity: [0, 1],
                  breakpointMask: "LM",
                  disabledWhen: a
              }),
              this.anim.addKeyframe(t, {
                  start: `${e} + 5vh`,
                  end: `${e} + 30vh`,
                  opacity: [1, 0],
                  breakpointMask: "LM",
                  disabledWhen: a
              })
          }
          ));
          const i = this.el.querySelector(".personalized-listening-section-content")
            , r = this.el.querySelector("#dancer-video")
            , s = this.el.querySelector(".overview-static-fallback-listening img").getAttribute("alt");
          r.setAttribute("aria-label", s),
          this.anim.addKeyframe(r, {
              anchors: [i],
              start: "a0t - 5vh",
              end: "a0b + 5vh",
              y: [160, 0],
              breakpointMask: "LM",
              disabledWhen: a
          }),
          this.anim.addKeyframe(r, {
              anchors: [i],
              start: "a0t - 10vh",
              end: "a0b - 5vh",
              opacity: [0, 1],
              breakpointMask: "LM",
              disabledWhen: a
          }),
          this.anim.addKeyframe(r, {
              anchors: [this.dancerContainer],
              start: "a0b - 90vh",
              end: "a0b - 55vh",
              opacity: [1, 0],
              breakpointMask: "LM",
              disabledWhen: a
          }),
          t.forEach(((e,i)=>{
              const r = this.el.querySelector(".dancer-sticky-content")
                , s = 75 * i
                , n = `a0t + ${50 + s}vh - a1h`;
              this.anim.addKeyframe(t[i], {
                  anchors: [this.timelineExtender, r],
                  start: `a0t + ${-5 + s}vh - a1h`,
                  end: n,
                  opacity: [0, 1],
                  y: ["20px", 0],
                  breakpointMask: "S",
                  disabledWhen: a
              }),
              this.anim.addKeyframe(t[i], {
                  anchors: [this.timelineExtender, r],
                  start: n,
                  end: `a0t + ${70 + s}vh - a1h`,
                  opacity: [1, 0],
                  y: [0, "-20px"],
                  breakpointMask: "S",
                  disabledWhen: a
              })
          }
          )),
          this.anim.addKeyframe(r, {
              anchors: [i, this.dancerContainer],
              start: "a0t - 10vh",
              end: "a1t - css(--r-localnav-height)",
              y: [-120, 0],
              breakpointMask: "S",
              disabledWhen: a
          }),
          this.anim.addKeyframe(r, {
              anchors: [i],
              start: "a0t - 10vh",
              end: "a0b",
              opacity: [0, 1],
              breakpointMask: "S",
              disabledWhen: a
          }),
          this.anim.addKeyframe(r, {
              anchors: [this.timelineExtender],
              start: "a0b - 100vh",
              end: "a0b - 80vh",
              opacity: [1, 0],
              breakpointMask: "S",
              disabledWhen: a
          }),
          this.anim.addKeyframe(this.el, {
              start: "t - 130vh",
              end: "b + 30vh",
              cssClass: ["near-section"],
              toggle: !0
          })
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("enhanced")
      }
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = t=>{
      if (!t)
          return void console.warn("No section element provided to video accessibility handler. Please pass section wrapper (this.el) as an argment");
      const e = t.querySelector("video")
        , i = t.querySelectorAll("picture:not(.fallback-image) img");
      if (!e)
          return void console.warn("Video accessibility handler could not find video element.");
      const r = ()=>{
          e.removeAttribute("aria-hidden"),
          i.forEach((t=>{
              t.setAttribute("alt", "")
          }
          )),
          e.removeEventListener("canplaythrough", r)
      }
      ;
      e.addEventListener("canplaythrough", r)
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(3)
    , s = "video-load-kf"
    , n = {
      event: s,
      start: "a0t - 200vh",
      end: "a0b + 100vh"
  }
    , a = {
      start: "a0t - 100vh",
      end: "a0b",
      progress: [0, 1],
      ease: .25
  }
    , o = {
      X: "large",
      L: "large",
      M: "medium",
      S: "small"
  };
  t.exports = class extends r {
      get viewportName() {
          return o[this.pageMetrics.breakpoint]
      }
      get videoExtension() {
          return this.isSafari ? "mp4" : "webm"
      }
      get videoURL() {
          return `${this.stripTrailingSlash(this.videoEl.dataset.videoBasepath)}/${this.viewportName}.${this.videoExtension}`
      }
      get progress() {
          return this._progress
      }
      get loadingState() {
          return this._loadingState
      }
      set loadingState(t) {
          this._loadingState = t,
          this._updateControllerState()
      }
      set progress(t) {
          this._progress = t,
          this.videoEl.currentTime = this.floorDecimal(this.duration * t)
      }
      floorDecimal(t) {
          return Math.floor(100 * Number(t).toFixed(3)) / 100
      }
      stripTrailingSlash(t) {
          return t.endsWith("/") ? t.slice(0, -1) : t
      }
      constructor(t) {
          super(t),
          this._progress = 0,
          this._loadingState = "",
          this.container = this.el,
          this.videoEl = this.el.querySelector("video"),
          this.isSafari = document.documentElement.classList.contains("safari"),
          this._addControllers(),
          this.sequenceGroup = this.anim.createScrollGroup(this.el),
          this.sequenceGroup.name = `VideoScroll - ${this.videoEl.id}`,
          this._onDurationChange = this._onDurationChange.bind(this),
          this._onErrorState = this._onErrorState.bind(this),
          this._onLoadedState = this._onLoadedState.bind(this),
          this.videoEl.addEventListener("durationchange", this._onDurationChange),
          this.videoEl.addEventListener("play", (()=>{
              this.videoEl.pause()
          }
          ))
      }
      mounted() {
          this._isEnhanced = !0,
          this.loadKeyframe()
      }
      _addControllers() {
          this._elementsToDecorate = [],
          this._elementsToDecorate.push(this.container),
          this.videoEl.id && this._elementsToDecorate.push(...Array.from(document.querySelectorAll("[data-video-scroll-controller={id}]".replace("{id}", this.videoEl.id))))
      }
      _updateControllerState() {
          for (const t of this._elementsToDecorate)
              t.classList.add(this.loadingState)
      }
      _requestVideoStream() {
          const t = new Request(this.videoURL)
            , e = new MediaSource;
          e.addEventListener("sourceopen", (async()=>{
              const i = e.addSourceBuffer('video/webm;codecs="vp9"')
                , r = await fetch(t);
              if (!r.ok)
                  return void this._onErrorState();
              const s = r.body.getReader();
              let n = !0;
              for (; n; ) {
                  const {value: t, done: r} = await s.read();
                  if (r) {
                      n = !1;
                      break
                  }
                  await new Promise(((r,s)=>{
                      e.sourceBuffers.length && (i.appendBuffer(t),
                      i.onupdateend = ()=>{
                          r(!0)
                      }
                      )
                  }
                  ))
              }
          }
          )),
          this.videoEl.src = URL.createObjectURL(e)
      }
      _onLoadedState() {
          this.loadingState = "loaded"
      }
      _onErrorState() {
          this.loadingState = "loading-error"
      }
      _requestVideo() {
          this.videoEl.addEventListener("error", this._onErrorState),
          this.videoEl.src = this.videoURL
      }
      _onDurationChange() {
          this.trigger("video-metadata-loaded", this.videoEl),
          this._onLoadedState(),
          this.duration = this.videoEl.duration,
          this.videoEl.play().then((()=>{
              this.videoEl.pause()
          }
          )).catch((()=>{
              this.videoEl.pause()
          }
          )),
          this.scrubKeyframe()
      }
      loadKeyframe() {
          this.loadEventKf && this.loadEventKf.remove();
          const t = Object.assign({}, n, {
              anchors: [this.container]
          }, JSON.parse(this.videoEl.getAttribute("data-video-load-kf")));
          this.loadEventKf = this.addDiscreteEvent(Object.assign(t, {
              group: this.sequenceGroup,
              onEnterOnce: ()=>{
                  this.isSafari ? this._requestVideo() : this._requestVideoStream()
              }
          }))
      }
      scrubKeyframe() {
          if (this.scrubKf)
              return void (this.progress = this.progress);
          const t = Object.assign({}, a, {
              anchors: [this.container]
          }, JSON.parse(this.videoEl.getAttribute("data-video-progress-kf")));
          this.scrubKf = this.sequenceGroup.addKeyframe(this, t)
      }
      onBreakpointChange() {
          this._isEnhanced && this.loadKeyframe()
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("enhanced")
      }
  }
}
, function(t, e, i) {
  "use strict";
  var r = i(9);
  const s = i(3)
    , n = i(34)
    , a = ["text-zoom", "no-heavy-media", "android", "mq-medium-short", "mq-large-up-shorter", "no-autoplay"]
    , o = [...r.disabledWhen, ...a];
  t.exports = class extends s {
      constructor(t) {
          super(t),
          this.scrollContainer = this.el.querySelector(".case-battery__scroll-container"),
          this.stickyContent = this.el.querySelector(".case-battery__scroll-content"),
          this.scrollCopyEls = this.el.querySelectorAll(".copy--scroll")
      }
      mounted() {
          n(this, ".fallback-image", a),
          this.addCopyKeyframes(),
          this.addPinKeyframes(),
          this.anim.addKeyframe(this.el, {
              start: "t - 130vh",
              end: "b + 30vh",
              cssClass: ["near-section"],
              toggle: !0
          })
      }
      addPinKeyframes() {
          this.scrollCopyEls.forEach(((t,e)=>{
              const {enterConfig: i, exitConfig: r} = this.getSharedConfig(e)
                , s = t.previousElementSibling.classList.contains("pin-overflow-container") ? t.previousElementSibling.children[0] : null;
              if (s) {
                  const e = s.classList.contains("speaker-case")
                    , n = "L" === this.pageMetrics.breakpoint
                    , a = e ? "easeOutQuint" : "easeOutQuad"
                    , h = "easeOutQuad"
                    , l = n ? a : h;
                  this.anim.addKeyframe(s, Object.assign({}, i, {
                      start: `${i.start} + 4vh`,
                      opacity: null,
                      y: ["a2h", 0],
                      anchors: [...i.anchors, t.previousElementSibling],
                      easeFunction: l,
                      disabledWhen: o
                  }));
                  const u = e ? "easeInCubic" : "easeInQuad"
                    , c = "easeInQuad"
                    , d = n ? u : c;
                  this.anim.addKeyframe(s, Object.assign({}, r, {
                      start: `${r.start} - 4vh`,
                      end: `${r.end} - 4vh`,
                      opacity: null,
                      y: [0, "a2h"],
                      anchors: [...r.anchors, t.previousElementSibling],
                      easeFunction: d,
                      disabledWhen: o
                  }))
              }
          }
          ))
      }
      addCopyKeyframes() {
          this.scrollCopyEls.forEach(((t,e)=>{
              const {enterConfig: i, exitConfig: r} = this.getSharedConfig(e);
              0 !== e && this.anim.addKeyframe(t, Object.assign({}, i, {
                  y: ["css(--translate-distance)", 0]
              })),
              e !== this.scrollCopyEls.length - 1 && this.anim.addKeyframe(t, Object.assign({}, r, {
                  y: [null, "css(--translate-distance) * -1"]
              }));
              const {start: s, anchors: n, ease: a, disabledWhen: o} = i
                , h = e === this.scrollCopyEls.length - 1 ? "+ 100vh" : "";
              this.anim.addKeyframe(t, {
                  start: s,
                  end: `${r.end} ${h}`,
                  anchors: n,
                  ease: a,
                  disabledWhen: o,
                  cssClass: "frontmost",
                  toggle: !0
              })
          }
          ))
      }
      getSharedConfig(t) {
          const e = [[0, .03], [.37, .57], [.65, .8], [.9, 1]];
          return {
              enterConfig: {
                  start: `a0t + (a0h - a1h - 15vh) * ${e[t][0]}`,
                  end: `a0t + (a0h - a1h - 15vh) * ${e[t][0] + .1}`,
                  opacity: [0, 1],
                  anchors: [this.scrollContainer, this.stickyContent],
                  ease: r.ease,
                  disabledWhen: o
              },
              exitConfig: {
                  start: `a0t + (a0h - a1h - 15vh) * ${e[t][1]}`,
                  end: `a0t + (a0h - a1h - 15vh) * ${e[t][1] + .1}`,
                  opacity: [null, 0],
                  anchors: [this.scrollContainer, this.stickyContent],
                  ease: r.ease,
                  disabledWhen: o
              }
          }
      }
      static IS_SUPPORTED() {
          return document.documentElement.classList.contains("enhanced")
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(3)
    , s = i(278)
    , n = i(279)
    , a = i(122);
  const o = {
      small: 205,
      medium: 235,
      large: 307
  }
    , h = {
      small: "max-width:734px",
      medium: "max-width:1068px",
      large: "min-width:0px"
  };
  function l(t, e, i) {
      const r = e * (i || 1);
      return t.url.replace("{w}", r).replace("{h}", Math.floor(r)).replace("{f}", "jpg")
  }
  t.exports = class extends r {
      constructor(t) {
          super(t);
          const e = document.querySelector('meta[property="apple-music-token"]')
            , i = e ? e.getAttribute("content") : null;
          if (!i)
              return n("error getting apple-music-token"),
              void this.fallback();
          const r = {
              token: i,
              albumID: this.el.dataset.albumId,
              lang: this.el.dataset.lang,
              locale: this.el.dataset.locale,
              timeout: 5e3,
              componentName: "Music Router"
          };
          this.anim.addEvent(this.el, {
              start: "t - 200vh",
              end: "b + 200vh",
              event: "apple-music-api-fetch",
              onEnterOnce: ()=>this.addAlbum(r)
          })
      }
      async addAlbum(t) {
          try {
              const e = await this.fetchAlbumData(t);
              a(e.successMessage);
              const i = e.response.data[0];
              if (!this.validateItem(i))
                  throw new Error(`couldn't validate album data for ${t.componentName}`);
              const r = i.attributes
                , s = r.name && r.artistName ? `${r.name} by ${r.artistName}` : ""
                , n = r.artwork.bgColor || "DDDDDD";
              this.insertPicture(function(t, e) {
                  const i = Object.keys(o)
                    , r = i[i.length - 1];
                  return `\n\t\t<picture class="music-album-picture">\n\t\t\t ${i.reduce(((e,i)=>{
                      const r = o[i]
                        , s = h[i];
                      return e + `<source srcset="${l(t, r)},  ${l(t, r, 2)} 2x" media="(${s})">`
                  }
                  ), "")}\n\t\t\t<img class="music-api-img" src="${l(t, o[r])}" alt="${e}">\n\t\t</picture>`
              }(r.artwork, s), n)
          } catch (t) {
              n(t),
              this.fallback()
          }
      }
      fetchAlbumData(t) {
          let {token: e, albumID: i, lang: r, locale: n, timeout: a, componentName: o} = t;
          return s({
              url: `https://amp-api.music.apple.com/v1/catalog/${n}/albums/${i}?l=${r}`,
              timeout: a,
              componentName: o,
              fetchSettings: {
                  headers: {
                      Authorization: "Bearer " + e,
                      Accept: "application/json",
                      "Content-Type": "application/json"
                  }
              }
          })
      }
      validateItem(t) {
          return t.attributes && t.attributes.artwork && t.attributes.artwork.url && t.attributes.artwork.bgColor
      }
      insertPicture(t, e) {
          t = t.replace(/(<picture .*?class=".*?music-album-picture.*?".*?)(>)/m, ((t,i,r)=>i + ` style="background-color: #${e}; filter: drop-shadow(0px 4px 18px #${e}77);"` + r)),
          this.el.querySelector(".image-inner").insertAdjacentHTML("beforeend", t)
      }
      fallback() {
          const t = this.el.querySelector("#apple-music-album-fallback");
          this.insertPicture(t.textContent, t.dataset.bgColor)
      }
  }
}
, function(t, e, i) {
  "use strict";
  const r = i(122);
  t.exports = function(t) {
      let {url: e=null, timeout: i=8e3, componentName: s="", fetchSettings: n={}} = t;
      const a = s ? ` for ${s}` : ""
        , o = new AbortController;
      return n.signal = o.signal,
      new Promise(((t,s)=>{
          const h = setTimeout((()=>{
              o.abort(),
              s(`timeout getting data ${a} after ${i}ms. JSON URL = ${e}`)
          }
          ), i);
          fetch(e, n).then((t=>{
              if (clearTimeout(h),
              !t.ok)
                  throw new Error(`HTTP error! status: ${t.status}`);
              return t.json()
          }
          )).then((i=>{
              r("JSON = "),
              r(i),
              t({
                  response: i,
                  successMessage: `Got data ${a}. JSON URL = ${e}`
              })
          }
          )).catch((()=>{
              s(`Error getting data ${a}. JSON URL = ${e}`)
          }
          ))
      }
      ))
  }
}
, function(t, e, i) {
  "use strict";
  t.exports = i(36)("error")
}
]);
