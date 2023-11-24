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
})({"adkVt":[function(require,module,exports) {
var _utils = require("./utils");
// poll for updated play data every 10s
const DATA_POLLING_RATE = 10000;
module.exports = function(nodecg) {
    nodecg.log.info("Hello, from your bundle's extension!");
    const playerIdReplicant = nodecg.Replicant("playerId");
    playerIdReplicant.on("change", (newValue)=>{
        if (newValue) updatePlayerStats(nodecg, newValue).catch((e)=>{
            nodecg.log.error(e);
        });
    });
    setInterval(maybeRefreshStats.bind(nodecg), DATA_POLLING_RATE);
};
async function maybeRefreshStats() {
    this.log.info("Polling for new SMX scores");
    const playerIdRep = this.Replicant("playerId");
    if (!playerIdRep.value) return;
    const playerId = playerIdRep.value;
    const req = await fetch(`https://statmaniax.com/api/get_users_latest_scores/${playerId}`);
    const latestTimes = await req.json().catch(()=>({
            basic: null,
            dual: null,
            easy: null,
            full: null,
            hard: null,
            wild: null
        }));
    const modesToUpdate = [];
    const lastUpdatedRep = this.Replicant("lastUpdated");
    const lastUpdated = lastUpdatedRep.value;
    for (const mode of Object.keys(latestTimes)){
        const lastUpdate = lastUpdated[mode];
        const remoteUpdate = latestTimes[mode];
        // if (!remoteUpdate) {
        // 	continue;
        // }
        if (!lastUpdate || remoteUpdate && remoteUpdate > lastUpdate) modesToUpdate.push(mode);
    }
    for (const mode of modesToUpdate){
        this.log.info(`Pulling updated scores for ${mode} mode`);
        updateScoreDataForMode(this, mode, playerId).catch((e)=>{
            this.log.error(e);
        });
    }
}
async function updatePlayerStats(nodecg, playerId) {
    var _statsReplicant_value;
    const statsReplicant = nodecg.Replicant("playerStats");
    if (!playerId) {
        statsReplicant.value = undefined;
        return;
    }
    if (playerId === ((_statsReplicant_value = statsReplicant.value) === null || _statsReplicant_value === void 0 ? void 0 : _statsReplicant_value.id)) {
        nodecg.log.info("defer player update, already fetched");
        return;
    }
    const req = await fetch(`https://statmaniax.com/api/users/${playerId}`);
    const resp = await req.json();
    const newStats = {
        id: playerId,
        username: resp.users[0].username,
        picture_path: resp.users[0].picture_path
    };
    nodecg.log.info({
        newStats
    });
    statsReplicant.value = newStats;
}
async function updateScoreDataForMode(nodecg, mode, playerId) {
    const requestMode = mode === "basic" ? "beginner" : mode;
    const req = await fetch(`https://statmaniax.com/api/get_user_highscores_info/${playerId}/${requestMode}`);
    const resp = await req.json();
    const summary = (0, _utils.newModeSummary)();
    for (const rawScore of Object.values(resp.scores)){
        const score = (0, _utils.processHighscore)(rawScore);
        const levelSummary = summary.byLevel[score.difficultyLevel] || (0, _utils.newSummary)();
        if (score.pass) {
            levelSummary.passes++;
            summary.inTotal.passes++;
        }
        if (score.fullCombo) {
            levelSummary.fullCombos++;
            summary.inTotal.fullCombos++;
        }
        if (score.starsEarned === 3) {
            levelSummary.threeStar++;
            summary.inTotal.threeStar++;
        }
        if (score.starsEarned === 4) {
            levelSummary.fourStar++;
            summary.inTotal.fourStar++;
        }
        if (score.starsEarned === 5) {
            levelSummary.fiveStar++;
            summary.inTotal.fiveStar++;
        }
        if (score.starsEarned === 6) {
            levelSummary.sixStar++;
            summary.inTotal.sixStar++;
        }
        if (score.score === 100000) {
            levelSummary.apcs++;
            summary.inTotal.apcs++;
        }
        summary.byLevel[score.difficultyLevel] = levelSummary;
    }
    const summariesRepl = nodecg.Replicant("scoreSummary", {
        defaultValue: (0, _utils.newScoreSummary)()
    });
    summariesRepl.value[mode] = summary;
    const lastUpdatedRep = nodecg.Replicant("lastUpdated");
    lastUpdatedRep.value[mode] = new Date().toISOString().replace("T", " ").replace(/\.\d+Z/, "");
}

},{"./utils":"8mEuU"}],"8mEuU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "newScoreSummary", ()=>newScoreSummary);
parcelHelpers.export(exports, "newModeSummary", ()=>newModeSummary);
parcelHelpers.export(exports, "newSummary", ()=>newSummary);
parcelHelpers.export(exports, "processHighscore", ()=>processHighscore);
var _objectSpread = require("@swc/helpers/_/_object_spread");
var _objectSpreadProps = require("@swc/helpers/_/_object_spread_props");
var _objectWithoutProperties = require("@swc/helpers/_/_object_without_properties");
function newScoreSummary() {
    return {
        basic: newModeSummary(),
        easy: newModeSummary(),
        hard: newModeSummary(),
        wild: newModeSummary(),
        dual: newModeSummary(),
        full: newModeSummary()
    };
}
function newModeSummary() {
    return {
        inTotal: newSummary(),
        byLevel: {}
    };
}
function newSummary() {
    return {
        passes: 0,
        fullCombos: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0,
        sixStar: 0,
        apcs: 0
    };
}
const MODES = [
    "Beginner",
    "Easy",
    "Hard",
    "Wild",
    "Dual",
    "Full",
    "Team"
];
function getModeCategory(difficulty_id) {
    return MODES[difficulty_id % MODES.length];
}
/** adds the + suffix as needed */ function getMode(difficulty_id) {
    const mode = getModeCategory(difficulty_id);
    if (difficulty_id > 6) return mode + "+";
    return mode;
}
function processHighscore(raw) {
    const { difficulty, score, flags, difficulty_id, grade } = raw, rest = (0, _objectWithoutProperties._)(raw, [
        "difficulty",
        "score",
        "flags",
        "difficulty_id",
        "grade"
    ]);
    const flagValue = parseInt(flags, 10);
    const diff_id = parseInt(difficulty_id, 10);
    return (0, _objectSpreadProps._)((0, _objectSpread._)({}, rest), {
        difficultyLevel: parseInt(difficulty, 10),
        score: parseInt(score, 10),
        starsEarned: 7 - parseInt(grade, 10),
        pass: !!(flagValue % 2),
        fullCombo: !!(flagValue & 4),
        modeCategory: getModeCategory(diff_id),
        mode: getMode(diff_id)
    });
}

},{"@swc/helpers/_/_object_spread":"3fvE7","@swc/helpers/_/_object_spread_props":"8TpEU","@swc/helpers/_/_object_without_properties":"cdZ4F","@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"3fvE7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_object_spread", ()=>_object_spread);
parcelHelpers.export(exports, "_", ()=>_object_spread);
var _definePropertyJs = require("./_define_property.js");
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            (0, _definePropertyJs._define_property)(target, key, source[key]);
        });
    }
    return target;
}

},{"./_define_property.js":"bdMCd","@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"bdMCd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_define_property", ()=>_define_property);
parcelHelpers.export(exports, "_", ()=>_define_property);
function _define_property(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"9VN6q":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"8TpEU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_object_spread_props", ()=>_object_spread_props);
parcelHelpers.export(exports, "_", ()=>_object_spread_props);
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
    return target;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"cdZ4F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_object_without_properties", ()=>_object_without_properties);
parcelHelpers.export(exports, "_", ()=>_object_without_properties);
var _objectWithoutPropertiesLooseJs = require("./_object_without_properties_loose.js");
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = (0, _objectWithoutPropertiesLooseJs._object_without_properties_loose)(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

},{"./_object_without_properties_loose.js":"fSNn6","@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"fSNn6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_object_without_properties_loose", ()=>_object_without_properties_loose);
parcelHelpers.export(exports, "_", ()=>_object_without_properties_loose);
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}]},["adkVt"], "adkVt", "parcelRequire5e58")

//# sourceMappingURL=index.js.map
