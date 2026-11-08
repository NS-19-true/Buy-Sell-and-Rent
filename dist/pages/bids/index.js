"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/bids/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/bids/index!./src/pages/bids/index.tsx":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/bids/index!./src/pages/bids/index.tsx ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Bids; }
/* harmony export */ });
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _components_Btn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Btn */ "./src/components/Btn.tsx");
/* harmony import */ var _components_Chips__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Chips */ "./src/components/Chips.tsx");
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/api */ "./src/services/api.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/store/index.ts");
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/format */ "./src/utils/format.ts");
/* harmony import */ var _utils_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/ui */ "./src/utils/ui.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);













var FILTERS = [{
  key: 'all',
  label: 'All'
}, {
  key: 'ongoing',
  label: 'Ongoing'
}, {
  key: 'suspended',
  label: 'Suspended'
}, {
  key: 'won',
  label: 'Won'
}, {
  key: 'ended',
  label: 'Ended'
}];
function statusText(item, bid, isPending) {
  var state = (0,_utils_format__WEBPACK_IMPORTED_MODULE_6__.bidState)(item, bid);
  if (state === 'won') return 'Won';
  if (state === 'suspended') return 'Suspended by seller';
  if (state === 'ended') {
    return (0,_utils_format__WEBPACK_IMPORTED_MODULE_6__.listingStatus)(item) === 'sold' ? 'Listing sold' : (0,_utils_format__WEBPACK_IMPORTED_MODULE_6__.listingStatus)(item) === 'cancelled' ? 'Listing cancelled' : bid.status === 'lost' ? 'Seller sold to another bidder' : bid.status === 'cancelled' ? 'Bid cancelled' : 'No longer active';
  }
  if (bid.interest === 'declined') return 'You declined';
  if (isPending) return 'Seller wants to know if you are still interested';
  return item.frontRunnerBidId === bid.id ? 'Front-runner' : 'Bid placed';
}
function Bids() {
  var s = (0,_store__WEBPACK_IMPORTED_MODULE_5__.useStore)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all'),
    _useState2 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    filter = _useState2[0],
    setFilter = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState3, 2),
    busy = _useState4[0],
    setBusy = _useState4[1];
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useDidShow)(function () {
    return (0,_store__WEBPACK_IMPORTED_MODULE_5__.updateTabBadges)();
  });
  var all = (0,_store__WEBPACK_IMPORTED_MODULE_5__.myBids)(s).map(function (_ref) {
    var item = _ref.item,
      bid = _ref.bid;
    return {
      item: item,
      bid: bid,
      state: (0,_utils_format__WEBPACK_IMPORTED_MODULE_6__.bidState)(item, bid)
    };
  }).sort(function (a, b) {
    return b.bid.at - a.bid.at;
  });
  var shown = filter === 'all' ? all : all.filter(function (e) {
    return e.state === filter;
  });
  function run(_x, _x2, _x3) {
    return _run.apply(this, arguments);
  }
  function _run() {
    _run = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee(call, done, ask) {
      var _t, _t2, _t3;
      return (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!busy) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            _t = ask;
            if (!_t) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return (0,_utils_ui__WEBPACK_IMPORTED_MODULE_7__.confirm)(ask[0], ask[1]);
          case 2:
            _t = !_context.v;
          case 3:
            if (!_t) {
              _context.n = 4;
              break;
            }
            return _context.a(2);
          case 4:
            setBusy(true);
            _context.p = 5;
            _t2 = _store__WEBPACK_IMPORTED_MODULE_5__.upsert;
            _context.n = 6;
            return call();
          case 6:
            _t2(_context.v);
            (0,_utils_ui__WEBPACK_IMPORTED_MODULE_7__.toast)(done);
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t3 = _context.v;
            (0,_utils_ui__WEBPACK_IMPORTED_MODULE_7__.toast)(_t3.message);
          case 8:
            _context.p = 8;
            setBusy(false);
            return _context.f(8);
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[5, 7, 8, 9]]);
    }));
    return _run.apply(this, arguments);
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
    className: "page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Chips__WEBPACK_IMPORTED_MODULE_3__["default"], {
      options: FILTERS,
      value: filter,
      onChange: setFilter
    }), shown.length ? shown.map(function (_ref2) {
      var item = _ref2.item,
        bid = _ref2.bid,
        state = _ref2.state;
      var isPending = item.pendingBidId === bid.id && bid.interest === 'requested';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "sec flush spaced",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "bold",
            children: item.name
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "bold",
            children: ["\xA5", bid.amount]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "dim",
          children: [item.seller, " \xB7 ", (0,_utils_format__WEBPACK_IMPORTED_MODULE_6__.formatTime)(bid.at)]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            children: "Status"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "dim",
            children: statusText(item, bid, isPending)
          })]
        }), isPending && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "actions",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Btn__WEBPACK_IMPORTED_MODULE_2__["default"], {
            small: true,
            disabled: busy,
            className: "grow",
            onClick: function onClick() {
              return run(function () {
                return _services_api__WEBPACK_IMPORTED_MODULE_4__.api.respondToInterest(item.id, bid.id, s.userId, true);
              }, 'You confirmed your interest.');
            },
            children: "I\u2019m still interested"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Btn__WEBPACK_IMPORTED_MODULE_2__["default"], {
            small: true,
            variant: "secondary",
            disabled: busy,
            className: "grow gap-l",
            onClick: function onClick() {
              return run(function () {
                return _services_api__WEBPACK_IMPORTED_MODULE_4__.api.respondToInterest(item.id, bid.id, s.userId, false);
              }, 'Your response was sent.');
            },
            children: "No, thank you"
          })]
        }), (state === 'ongoing' || state === 'suspended') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Btn__WEBPACK_IMPORTED_MODULE_2__["default"], {
          small: true,
          variant: "secondary",
          disabled: busy,
          className: "cancel-bid",
          onClick: function onClick() {
            return run(function () {
              return _services_api__WEBPACK_IMPORTED_MODULE_4__.api.cancelBid(item.id, bid.id, s.userId);
            }, 'Your bid was cancelled.', ['Cancel bid', 'Cancel this bid?']);
          },
          children: "Cancel my bid"
        })]
      }, bid.id);
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "empty",
      children: all.length ? 'No bids match this filter.' : 'You have not bid on any items yet.\nBrowse the market and place your first bid.'
    })]
  });
}

/***/ }),

/***/ "./src/pages/bids/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/bids/index.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_bids_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/bids/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/bids/index!./src/pages/bids/index.tsx");


var config = {"navigationBarTitleText":"My bids"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_bids_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/bids/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_bids_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_bids_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_bids_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_bids_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/bids/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map