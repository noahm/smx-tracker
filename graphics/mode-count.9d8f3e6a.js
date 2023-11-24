// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"bYDqy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Index", ()=>Index);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _client = require("react-dom/client");
var _animatedNumber = require("../common/animatedNumber");
var _useReplicant = require("../common/useReplicant");
const params = new URL(document.location.href);
let mode = params.searchParams.get("mode") || "wild";
// @ts-expect-error just catching the normal human value and collapsing it down
if (mode === "beginner") mode = "basic";
let color = params.searchParams.get("color") ?? undefined;
const colorBank = [
    {
        mode: "basic",
        color: "#03da00"
    },
    {
        mode: "easy",
        color: "#d3b211"
    },
    {
        mode: "hard",
        color: "#a90a12"
    },
    {
        mode: "wild",
        color: "#3406bc"
    },
    {
        mode: "dual",
        color: "#1d72af"
    },
    {
        mode: "full",
        color: "#00d0b8"
    }
];
if (color) color = "#" + color;
else color = colorBank.find((c)=>c.mode === mode)?.color;
function Index() {
    const [scoreSummary] = (0, _useReplicant.useReplicant)("scoreSummary");
    const [stat] = (0, _useReplicant.useReplicant)("singleCountStat");
    const value = scoreSummary?.[mode]?.inTotal?.[stat ?? "fullCombos"];
    return /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
        value: value,
        color: color,
        __source: {
            fileName: "src/graphics/mode-count.tsx",
            lineNumber: 34,
            columnNumber: 10
        },
        __self: this
    });
}
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(Index, {
    __source: {
        fileName: "src/graphics/mode-count.tsx",
        lineNumber: 38,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","react-dom/client":"i5cPj","../common/animatedNumber":"9nyXM","../common/useReplicant":"7922I","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["bYDqy"], "bYDqy", "parcelRequire5e58")

//# sourceMappingURL=mode-count.9d8f3e6a.js.map
