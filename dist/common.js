"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./src/components/Btn.tsx":
/*!********************************!*\
  !*** ./src/components/Btn.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Btn; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);


// A View-based button: <button> is styled by the WeChat runtime and fights custom CSS.
function Btn(_ref) {
  var children = _ref.children,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'primary' : _ref$variant,
    small = _ref.small,
    disabled = _ref.disabled,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    onClick = _ref.onClick;
  var cls = "btn btn-".concat(variant).concat(small ? ' btn-small' : '').concat(disabled ? ' is-disabled' : '', " ").concat(className);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: cls,
    hoverClass: disabled ? 'none' : 'btn-hover',
    onClick: disabled ? undefined : onClick,
    children: children
  });
}

/***/ }),

/***/ "./src/components/Chips.tsx":
/*!**********************************!*\
  !*** ./src/components/Chips.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Chips; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);


function Chips(_ref) {
  var options = _ref.options,
    value = _ref.value,
    onChange = _ref.onChange;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.ScrollView, {
    scrollX: true,
    enableFlex: true,
    className: "chips",
    showScrollbar: false,
    children: options.map(function (o) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        className: "chip ".concat(o.key === value ? 'on' : ''),
        onClick: function onClick() {
          return onChange(o.key);
        },
        children: o.label
      }, o.key);
    })
  });
}

/***/ }),

/***/ "./src/components/Pic.tsx":
/*!********************************!*\
  !*** ./src/components/Pic.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Pic; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/format */ "./src/utils/format.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



/** A listing photo, or a tinted emoji tile when the seller added none. */
function Pic(_ref) {
  var photo = _ref.photo,
    category = _ref.category,
    size = _ref.size;
  if (photo) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Image, {
    className: "pic pic-".concat(size),
    src: photo,
    mode: "aspectFill",
    lazyLoad: true
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.View, {
    className: "pic pic-".concat(size),
    style: {
      background: (0,_utils_format__WEBPACK_IMPORTED_MODULE_0__.tintFor)(category)
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__.Text, {
      children: (0,_utils_format__WEBPACK_IMPORTED_MODULE_0__.emojiFor)(category)
    })
  });
}

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_BASE: function() { return /* binding */ API_BASE; },
/* harmony export */   IS_PROD: function() { return /* binding */ IS_PROD; }
/* harmony export */ });
/**
 * ============================================================
 *  THE ONE FILE YOU EDIT to tell the mini program where the
 *  server (the thing started by `npm start`) lives.
 * ============================================================
 */

// Used by `npm run dev:weapp` (what you run while testing).
//   - Testing only inside the DevTools simulator on the SAME computer: http://localhost:3000 works.
//   - Testing on your phone: use your computer's address on the Wi-Fi, e.g. http://192.168.1.20:3000
//     (find it with:  hostname -I   -> use the first number, like 192.168.1.20)
var DEV_API_BASE = 'http://10.11.173.85:3000';

// Used by `npm run build:weapp` (the version you upload to WeChat). WeChat only allows
// https:// addresses here, and the domain must be registered in the WeChat admin console.
var PROD_API_BASE = 'https://api.your-domain.example';
var IS_PROD = "development" === 'production';

// An optional TARO_APP_API_BASE in a .env file still wins, but you do not need one.
var API_BASE = (process.env.TARO_APP_API_BASE || (IS_PROD ? PROD_API_BASE : DEV_API_BASE)).replace(/\/+$/, '');

/***/ }),

/***/ "./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   api: function() { return /* binding */ api; }
/* harmony export */ });
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http */ "./src/services/http.ts");

var enc = encodeURIComponent;

// Same endpoints as the web version's public/api.js.
var api = {
  meta: function meta() {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)('/api/meta');
  },
  items: function items() {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)('/api/items', {
      timeout: 30000
    });
  },
  createItem: function createItem(data) {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.post)('/api/items', data);
  },
  placeBid: function placeBid(id, data) {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.post)("/api/items/".concat(id, "/bids"), data);
  },
  respondToInterest: function respondToInterest(id, bidId, bidderId, interested) {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.post)("/api/items/".concat(id, "/bids/").concat(enc(bidId), "/interest"), {
      bidderId: bidderId,
      interested: interested
    });
  },
  suspendBid: function suspendBid(id, bidId, sellerId) {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.post)("/api/items/".concat(id, "/bids/").concat(enc(bidId), "/suspend"), {
      sellerId: sellerId
    });
  },
  cancelBid: function cancelBid(id, bidId, bidderId) {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.post)("/api/items/".concat(id, "/bids/").concat(enc(bidId), "/cancel"), {
      bidderId: bidderId
    });
  },
  markSold: function markSold(id, sellerId) {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.post)("/api/items/".concat(id, "/sold"), {
      sellerId: sellerId
    });
  },
  cancelListing: function cancelListing(id, sellerId) {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.post)("/api/items/".concat(id, "/cancel"), {
      sellerId: sellerId
    });
  },
  // Live updates. Mini programs have no EventSource, so we long-poll instead of SSE.
  rev: function rev() {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)('/api/rev');
  },
  /** Resolves as soon as events newer than `since` exist, or after ~25 s with none. */
  poll: function poll(since) {
    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.request)("/api/poll?since=".concat(since), {
      timeout: 40000
    });
  }
};

/***/ }),

/***/ "./src/services/http.ts":
/*!******************************!*\
  !*** ./src/services/http.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   post: function() { return /* binding */ post; },
/* harmony export */   request: function() { return /* binding */ request; }
/* harmony export */ });
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.ts");





function request(_x) {
  return _request.apply(this, arguments);
}
function _request() {
  _request = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee(path) {
    var options,
      res,
      _options$timeout,
      message,
      _args = arguments,
      _t;
    return (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _context.p = 1;
          _context.n = 2;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().request({
            url: _config__WEBPACK_IMPORTED_MODULE_1__.API_BASE + path,
            method: options.method || 'GET',
            data: options.data,
            header: {
              'content-type': 'application/json'
            },
            timeout: (_options$timeout = options.timeout) !== null && _options$timeout !== void 0 ? _options$timeout : 15000
          });
        case 2:
          res = _context.v;
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.warn('[request failed]', _config__WEBPACK_IMPORTED_MODULE_1__.API_BASE + path, _t);
          // While developing, say exactly which address failed: it is almost always the address in src/config.ts.
          throw new Error(_config__WEBPACK_IMPORTED_MODULE_1__.IS_PROD ? 'Network problem. Check your connection and try again.' : "Cannot reach ".concat(_config__WEBPACK_IMPORTED_MODULE_1__.API_BASE, ". Is the server running, and is this address right?"));
        case 4:
          if (!(res.statusCode < 200 || res.statusCode >= 300)) {
            _context.n = 5;
            break;
          }
          message = res.data && res.data.error;
          throw new Error(message || "Request failed (".concat(res.statusCode, ")"));
        case 5:
          return _context.a(2, res.data);
      }
    }, _callee, null, [[1, 3]]);
  }));
  return _request.apply(this, arguments);
}
var post = function post(path, data) {
  return request(path, {
    method: 'POST',
    data: data
  });
};

/***/ }),

/***/ "./src/store/index.ts":
/*!****************************!*\
  !*** ./src/store/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isMine: function() { return /* binding */ isMine; },
/* harmony export */   myBids: function() { return /* binding */ myBids; },
/* harmony export */   myListings: function() { return /* binding */ myListings; },
/* harmony export */   refresh: function() { return /* binding */ refresh; },
/* harmony export */   setUserName: function() { return /* binding */ setUserName; },
/* harmony export */   startSync: function() { return /* binding */ startSync; },
/* harmony export */   stopSync: function() { return /* binding */ stopSync; },
/* harmony export */   updateTabBadges: function() { return /* binding */ updateTabBadges; },
/* harmony export */   upsert: function() { return /* binding */ upsert; },
/* harmony export */   useStore: function() { return /* binding */ useStore; }
/* harmony export */ });
/* unused harmony export getState */
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js */ "./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
/* harmony import */ var _utils_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/ui */ "./src/utils/ui.ts");





// Tiny app-wide store (no extra dependency) + the live-sync loop.
//
// Web version                      -> Mini program version
//   module-level `items`, `userId`    this store, read through useStore()
//   localStorage                      Taro.getStorageSync / setStorageSync
//   EventSource (SSE)                 long-poll loop below (GET /api/poll)
//   nav badges "(n)"                  native tab-bar badges (updateTabBadges)




/* ------------------------------------------------------------- identity */
var KEY_ID = 'ct.userId';
var KEY_NAME = 'ct.userName';
function readStorage(key) {
  try {
    return String(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getStorageSync(key) || '');
  } catch (_unused) {
    return '';
  }
}
function writeStorage(key, value) {
  try {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setStorageSync(key, value);
  } catch (_unused2) {/* storage unavailable */}
}

// One identity per device, used for both selling (sellerId) and bidding (bidderId).
// Trust-based, like the web version. WECHAT_INTEGRATION.md explains how to replace it with wx.login.
function loadUserId() {
  var id = readStorage(KEY_ID);
  if (!id) {
    id = 'U' + Math.random().toString(36).slice(2, 12);
    writeStorage(KEY_ID, id);
  }
  return id;
}

/* ---------------------------------------------------------------- state */
var state = {
  items: [],
  categories: ['Transport', 'Appliances', 'Electronics', 'Books', 'Furniture'],
  conditions: ['Like new', 'Good', 'Fair'],
  userId: loadUserId(),
  userName: readStorage(KEY_NAME),
  live: false,
  loaded: false,
  flashId: null
};
var listeners = new Set();
function setState(patch) {
  state = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, state), patch);
  listeners.forEach(function (fn) {
    return fn();
  });
}
var getState = function getState() {
  return state;
};

/** Subscribe a component to the store. Returns the whole state; derive what you need with the selectors below. */
function useStore() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(state),
    _useState2 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    snapshot = _useState2[0],
    setSnapshot = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var onChange = function onChange() {
      return setSnapshot(state);
    };
    listeners.add(onChange);
    onChange(); // catch anything that changed between render and effect
    return function () {
      listeners.delete(onChange);
    };
  }, []);
  return snapshot;
}

/* ------------------------------------------------------------ selectors */
var isMine = function isMine(item) {
  var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : state.userId;
  return item.sellerId === userId;
};
var myListings = function myListings(s) {
  return s.items.filter(function (i) {
    return isMine(i, s.userId);
  });
};
var myBids = function myBids(s) {
  return s.items.reduce(function (all, item) {
    item.bids.forEach(function (bid) {
      if (bid.bidderId === s.userId) all.push({
        item: item,
        bid: bid
      });
    });
    return all;
  }, []);
};

/* -------------------------------------------------------------- actions */
function setUserName(name) {
  var trimmed = name.trim();
  writeStorage(KEY_NAME, trimmed);
  setState({
    userName: trimmed
  });
}

/**
 * Insert or replace a listing. Live updates leave `photos` out; keep the ones we already have.
 * Returns false when a photo-less update arrived for a listing we have never seen (caller should resync).
 */
function upsert(incoming) {
  var index = state.items.findIndex(function (x) {
    return x.id === incoming.id;
  });
  var prev = index >= 0 ? state.items[index] : undefined;
  var item = prev && incoming.photos === undefined ? (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, incoming), {}, {
    photos: prev.photos
  }) : incoming;
  commitItems(addOrReplace(item, index));
  return !(!prev && incoming.photos === undefined);
}
function addOrReplace(item, index) {
  var items = state.items.slice();
  if (index >= 0) items[index] = item;else items.unshift(item);
  return items;
}
function commitItems(items) {
  setState({
    items: items
  });
  updateTabBadges();
}
function refresh() {
  return _refresh.apply(this, arguments);
}

/* ------------------------------------------------------------ tab badges */
function _refresh() {
  _refresh = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee2() {
    var _t2;
    return (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _t2 = commitItems;
          _context2.n = 1;
          return _services_api__WEBPACK_IMPORTED_MODULE_2__.api.items();
        case 1:
          _t2(_context2.v);
          setState({
            loaded: true
          });
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _refresh.apply(this, arguments);
}
var badgeShown = {};
function setBadge(index, count) {
  if ((badgeShown[index] || 0) === count) return;
  var task = count ? _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setTabBarBadge({
    index: index,
    text: String(count)
  }) : _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().removeTabBarBadge({
    index: index
  });
  // Fails harmlessly while a non-tab page (the item detail page) is on top; retried on the next tab show.
  task.then(function () {
    badgeShown[index] = count;
  }).catch(function () {
    return undefined;
  });
}
/** Tab order in app.config.ts: 0 Market, 1 Sell, 2 Listings, 3 My bids. */
function updateTabBadges() {
  setBadge(2, myListings(state).length);
  setBadge(3, myBids(state).length);
}

/* ----------------------------------------------------------- live events */
function flash(id) {
  setState({
    flashId: id
  });
  setTimeout(function () {
    if (state.flashId === id) setState({
      flashId: null
    });
  }, 1500);
}

// Did this update just ask *me* to confirm interest?
function newlyAskedMe(prev, item) {
  var pending = item.bids.find(function (b) {
    return b.id === item.pendingBidId;
  });
  if (!pending || pending.bidderId !== state.userId || pending.interest !== 'requested') return false;
  var before = prev && prev.bids.find(function (b) {
    return b.id === pending.id;
  });
  return !before || before.interest !== 'requested';
}
function handleEvent(e) {
  var known = true;
  if (e.event === 'item:created') {
    var item = e.data;
    known = upsert(item);
    if (!isMine(item)) (0,_utils_ui__WEBPACK_IMPORTED_MODULE_3__.toast)("New listing: ".concat(item.name));
  } else if (e.event === 'bid:placed') {
    var _ref = e.data,
      _item = _ref.item,
      bid = _ref.bid;
    known = upsert(_item);
    if (isMine(_item)) {
      flash(_item.id);
      (0,_utils_ui__WEBPACK_IMPORTED_MODULE_3__.toast)("New bid: \xA5".concat(bid.amount, " on ").concat(_item.name, " from ").concat(bid.bidder));
    }
  } else if (e.event === 'item:updated') {
    var _item2 = e.data;
    var prev = state.items.find(function (x) {
      return x.id === _item2.id;
    });
    known = upsert(_item2);
    if (newlyAskedMe(prev, _item2)) (0,_utils_ui__WEBPACK_IMPORTED_MODULE_3__.toast)("The seller of ".concat(_item2.name, " asks if you are still interested. Check My bids."));
  }
  return known;
}

/* ------------------------------------------------------------- sync loop */
var syncGeneration = 0;
var syncing = false;
var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

/**
 * Keeps `items` current. Safe to call repeatedly. Call stopSync() when the app goes to the background:
 * WeChat suspends network activity there, and the next startSync() does a full resync.
 */
function startSync() {
  if (syncing) return;
  syncing = true;
  var generation = ++syncGeneration;
  var active = function active() {
    return syncing && generation === syncGeneration;
  };
  _services_api__WEBPACK_IMPORTED_MODULE_2__.api.meta().then(function (m) {
    if (active()) setState({
      categories: m.categories,
      conditions: m.conditions
    });
  }).catch(function () {
    return undefined;
  });
  (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee() {
    var since, failures, _yield$api$rev, rev, items, result, needsResync, _iterator, _step, e, _t;
    return (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          since = null;
          failures = 0;
        case 1:
          if (!active()) {
            _context.n = 13;
            break;
          }
          _context.p = 2;
          if (!(since === null)) {
            _context.n = 6;
            break;
          }
          _context.n = 3;
          return _services_api__WEBPACK_IMPORTED_MODULE_2__.api.rev();
        case 3:
          _yield$api$rev = _context.v;
          rev = _yield$api$rev.rev;
          _context.n = 4;
          return _services_api__WEBPACK_IMPORTED_MODULE_2__.api.items();
        case 4:
          items = _context.v;
          if (active()) {
            _context.n = 5;
            break;
          }
          return _context.a(2);
        case 5:
          commitItems(items);
          setState({
            loaded: true,
            live: true
          });
          since = rev;
        case 6:
          _context.n = 7;
          return _services_api__WEBPACK_IMPORTED_MODULE_2__.api.poll(since);
        case 7:
          result = _context.v;
          if (active()) {
            _context.n = 8;
            break;
          }
          return _context.a(2);
        case 8:
          failures = 0;
          setState({
            live: true
          });
          if (!result.reset) {
            _context.n = 9;
            break;
          }
          since = null;
          return _context.a(3, 1);
        case 9:
          needsResync = false;
          _iterator = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__["default"])(result.events);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              e = _step.value;
              if (!handleEvent(e)) needsResync = true;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          since = needsResync ? null : result.rev;
          _context.n = 12;
          break;
        case 10:
          _context.p = 10;
          _t = _context.v;
          if (active()) {
            _context.n = 11;
            break;
          }
          return _context.a(2);
        case 11:
          console.warn('[sync] connection problem, will retry:', _t);
          setState({
            live: false
          });
          since = null; // like the web app: full re-sync after every reconnect
          failures += 1;
          _context.n = 12;
          return sleep(Math.min(1500 * failures, 10000));
        case 12:
          _context.n = 1;
          break;
        case 13:
          return _context.a(2);
      }
    }, _callee, null, [[2, 10]]);
  }))();
}
function stopSync() {
  syncing = false;
  syncGeneration += 1;
  setState({
    live: false
  });
}

/***/ }),

/***/ "./src/utils/format.ts":
/*!*****************************!*\
  !*** ./src/utils/format.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bidState: function() { return /* binding */ bidState; },
/* harmony export */   emojiFor: function() { return /* binding */ emojiFor; },
/* harmony export */   formatTime: function() { return /* binding */ formatTime; },
/* harmony export */   listingStatus: function() { return /* binding */ listingStatus; },
/* harmony export */   rankedForDisplay: function() { return /* binding */ rankedForDisplay; },
/* harmony export */   tintFor: function() { return /* binding */ tintFor; },
/* harmony export */   topBid: function() { return /* binding */ topBid; }
/* harmony export */ });
/* unused harmony exports emoji, tint */
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");

var emoji = {
  Transport: '🚲',
  Appliances: '🧊',
  Electronics: '🖥️',
  Books: '📚',
  Furniture: '💡'
};
var tint = {
  Transport: '#dbeafe',
  Appliances: '#e0f2fe',
  Electronics: '#ede9fe',
  Books: '#fef3c7',
  Furniture: '#fef9c3'
};
var emojiFor = function emojiFor(category) {
  return emoji[category] || '📦';
};
var tintFor = function tintFor(category) {
  return tint[category] || '#e7e5e4';
};
var listingStatus = function listingStatus(item) {
  return item.status || 'active';
};

/** Highest bid that still counts (active or won, not declined). null if there is none. */
function topBid(item) {
  var bids = item.bids.filter(function (b) {
    return (b.status === undefined || b.status === 'active' || b.status === 'won') && b.interest !== 'declined';
  });
  return bids.length ? Math.max.apply(Math, (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bids.map(function (b) {
    return b.amount;
  }))) : null;
}
function bidState(item, bid) {
  if (bid.status === 'won') return 'won';
  if (bid.status === 'suspended') return 'suspended';
  if (bid.status === 'cancelled' || bid.status === 'lost' || bid.status === 'listing_cancelled' || bid.interest === 'declined' || listingStatus(item) !== 'active') return 'ended';
  return 'ongoing';
}

/** Bids sorted best-first (highest amount, then earliest). */
var rankedForDisplay = function rankedForDisplay(bids) {
  return bids.slice().sort(function (a, b) {
    return b.amount - a.amount || b.at - a.at;
  });
};
var pad = function pad(n) {
  return n < 10 ? '0' + n : String(n);
};
/** HH:mm. Written by hand because Intl / toLocaleTimeString is not reliable in every mini program runtime. */
function formatTime(t) {
  var d = new Date(t);
  return "".concat(pad(d.getHours()), ":").concat(pad(d.getMinutes()));
}

/***/ }),

/***/ "./src/utils/ui.ts":
/*!*************************!*\
  !*** ./src/utils/ui.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   confirm: function() { return /* binding */ confirm; },
/* harmony export */   toast: function() { return /* binding */ toast; }
/* harmony export */ });
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);




/** Short message at the bottom of the screen (replaces the web app's toast div). */
function toast(title) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2400;
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
    title: title,
    icon: 'none',
    duration: duration
  });
}

/** Native confirm dialog; resolves true when the user taps OK. */
function confirm(_x, _x2) {
  return _confirm.apply(this, arguments);
}
function _confirm() {
  _confirm = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee(title, content) {
    var res;
    return (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showModal({
            title: title,
            content: content,
            confirmText: 'Yes',
            cancelText: 'No'
          });
        case 1:
          res = _context.v;
          return _context.a(2, !!res.confirm);
      }
    }, _callee);
  }));
  return _confirm.apply(this, arguments);
}

/***/ })

}]);
//# sourceMappingURL=common.js.map