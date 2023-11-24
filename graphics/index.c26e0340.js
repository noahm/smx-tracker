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
})({"9VNTJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _client = require("react-dom/client");
var _index = require("./Index");
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _index.Index), {
    __source: {
        fileName: "src/graphics/index-bootstrap.tsx",
        lineNumber: 6,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","react-dom/client":"i5cPj","./Index":"iPVoH","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"iPVoH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Index", ()=>Index);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _playerInfo = require("../common/playerInfo");
function Index() {
    return /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _playerInfo.PlayerStats), {
        silentFailure: true,
        __source: {
            fileName: "src/graphics/Index.tsx",
            lineNumber: 7,
            columnNumber: 4
        },
        __self: this
    }));
}

},{"react":"bH1AQ","../common/playerInfo":"8T7k2","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"8T7k2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PlayerStats", ()=>PlayerStats);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _useReplicant = require("./useReplicant");
var _playerInfoCss = require("./playerInfo.css");
var _7Png = require("./images/7.png");
var _7PngDefault = parcelHelpers.interopDefault(_7Png);
var _6Png = require("./images/6.png");
var _6PngDefault = parcelHelpers.interopDefault(_6Png);
var _5Png = require("./images/5.png");
var _5PngDefault = parcelHelpers.interopDefault(_5Png);
var _4Png = require("./images/4.png");
var _4PngDefault = parcelHelpers.interopDefault(_4Png);
var _animatedNumber = require("./animatedNumber");
function PlayerStats(props) {
    const [stats] = (0, _useReplicant.useReplicant)("playerStats");
    const [displayMode] = (0, _useReplicant.useReplicant)("displayMode", "wild");
    const [displayStyle] = (0, _useReplicant.useReplicant)("displayStyle", "inTotal") || "inTotal";
    const [scoreSummary] = (0, _useReplicant.useReplicant)("scoreSummary");
    if (!stats) {
        if (props.silentFailure) return null;
        return /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 27,
                columnNumber: 12
            },
            __self: this
        }, "No player info loaded");
    }
    const summary = scoreSummary?.[displayMode];
    const byLevel = summary?.byLevel;
    const inTotal = summary?.inTotal;
    let body;
    if (displayStyle === "inTotal") body = /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 39,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
        colSpan: 2,
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 40,
            columnNumber: 11
        },
        __self: this
    }, displayMode, " mode")), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 42,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 43,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("img", {
        height: "30px",
        src: (0, _7PngDefault.default),
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 44,
            columnNumber: 13
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 46,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
        value: inTotal?.apcs,
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 47,
            columnNumber: 13
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 50,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 51,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("img", {
        height: "30px",
        src: (0, _6PngDefault.default),
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 52,
            columnNumber: 13
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 54,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
        value: inTotal?.sixStar,
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 55,
            columnNumber: 13
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 58,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 59,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("img", {
        height: "30px",
        src: (0, _5PngDefault.default),
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 60,
            columnNumber: 13
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 62,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
        value: inTotal?.fiveStar,
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 63,
            columnNumber: 13
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 66,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 67,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("img", {
        height: "30px",
        src: (0, _4PngDefault.default),
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 68,
            columnNumber: 13
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 70,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
        value: inTotal?.fourStar,
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 71,
            columnNumber: 13
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 74,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 75,
            columnNumber: 11
        },
        __self: this
    }, "FCs"), /*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 76,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
        value: inTotal?.fullCombos,
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 77,
            columnNumber: 13
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 80,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 81,
            columnNumber: 11
        },
        __self: this
    }, "Pass"), /*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 82,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
        value: inTotal?.passes,
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 83,
            columnNumber: 13
        },
        __self: this
    }))));
    else if (byLevel) {
        const levels = Object.keys(byLevel).map((k)=>parseInt(k, 10)).sort((a, b)=>a - b);
        body = /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 94,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 95,
                columnNumber: 11
            },
            __self: this
        }, displayMode, " mode"), levels.map((lvl)=>/*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
                key: lvl,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 97,
                    columnNumber: 13
                },
                __self: this
            }, lvl))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 100,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 101,
                columnNumber: 11
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("img", {
            height: "30px",
            src: (0, _7PngDefault.default),
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 102,
                columnNumber: 13
            },
            __self: this
        })), levels.map((lvl)=>/*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
                key: lvl,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 105,
                    columnNumber: 13
                },
                __self: this
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
                value: byLevel[lvl]?.apcs,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 106,
                    columnNumber: 15
                },
                __self: this
            })))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 110,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 111,
                columnNumber: 11
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("img", {
            height: "30px",
            src: (0, _6PngDefault.default),
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 112,
                columnNumber: 13
            },
            __self: this
        })), levels.map((lvl)=>/*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
                key: lvl,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 115,
                    columnNumber: 13
                },
                __self: this
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
                value: byLevel[lvl]?.sixStar,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 116,
                    columnNumber: 15
                },
                __self: this
            })))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 120,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 121,
                columnNumber: 11
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("img", {
            height: "30px",
            src: (0, _5PngDefault.default),
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 122,
                columnNumber: 13
            },
            __self: this
        })), levels.map((lvl)=>/*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
                key: lvl,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 125,
                    columnNumber: 13
                },
                __self: this
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
                value: byLevel[lvl]?.fiveStar,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 126,
                    columnNumber: 15
                },
                __self: this
            })))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 130,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 131,
                columnNumber: 11
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("img", {
            height: "30px",
            src: (0, _4PngDefault.default),
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 132,
                columnNumber: 13
            },
            __self: this
        })), levels.map((lvl)=>/*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
                key: lvl,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 135,
                    columnNumber: 13
                },
                __self: this
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
                value: byLevel[lvl]?.fourStar,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 136,
                    columnNumber: 15
                },
                __self: this
            })))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 140,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 141,
                columnNumber: 11
            },
            __self: this
        }, "FCs"), levels.map((lvl)=>/*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
                key: lvl,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 143,
                    columnNumber: 13
                },
                __self: this
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
                value: byLevel[lvl]?.fullCombos,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 144,
                    columnNumber: 15
                },
                __self: this
            })))), /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 148,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
            __source: {
                fileName: "src/common/playerInfo.tsx",
                lineNumber: 149,
                columnNumber: 11
            },
            __self: this
        }, "Pass"), levels.map((lvl)=>/*#__PURE__*/ (0, _reactDefault.default).createElement("td", {
                key: lvl,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 151,
                    columnNumber: 13
                },
                __self: this
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _animatedNumber.AnimatedNumber), {
                value: byLevel[lvl]?.passes,
                __source: {
                    fileName: "src/common/playerInfo.tsx",
                    lineNumber: 152,
                    columnNumber: 15
                },
                __self: this
            })))));
    }
    return /*#__PURE__*/ (0, _reactDefault.default).createElement("table", {
        className: "player-info",
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 161,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("tbody", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 162,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("tr", {
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 163,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("th", {
        colSpan: 50,
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 164,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("img", {
        src: `https://data.stepmaniax.com/${stats.picture_path}`,
        style: {
            height: "20px",
            width: "20px",
            borderRadius: "10px",
            verticalAlign: "middle"
        },
        __source: {
            fileName: "src/common/playerInfo.tsx",
            lineNumber: 165,
            columnNumber: 13
        },
        __self: this
    }), " ", stats.username)), body));
}

},{"react":"bH1AQ","./useReplicant":"7922I","./playerInfo.css":"UV1oh","./images/7.png":"5vXBu","./images/6.png":"cRHe4","./images/5.png":"9gWCi","./images/4.png":"91KLw","./animatedNumber":"9nyXM","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"UV1oh":[function() {},{}],"5vXBu":[function(require,module,exports) {
module.exports = require("5f6bbf3381edfbad").getBundleURL("4mWLw") + "7.42f65f2d.png";

},{"5f6bbf3381edfbad":"dfw8Z"}],"dfw8Z":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"cRHe4":[function(require,module,exports) {
module.exports = require("5c54af48b1ced8a4").getBundleURL("4mWLw") + "6.e134daff.png";

},{"5c54af48b1ced8a4":"dfw8Z"}],"9gWCi":[function(require,module,exports) {
module.exports = require("55450e4c89bf97ca").getBundleURL("4mWLw") + "5.0d1f9033.png";

},{"55450e4c89bf97ca":"dfw8Z"}],"91KLw":[function(require,module,exports) {
module.exports = require("d0a1d1fc149f8ad7").getBundleURL("4mWLw") + "4.88126d65.png";

},{"d0a1d1fc149f8ad7":"dfw8Z"}]},["9VNTJ"], "9VNTJ", "parcelRequire5e58")

//# sourceMappingURL=index.c26e0340.js.map
