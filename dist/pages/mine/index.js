"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/mine/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/mine/index!./src/pages/mine/index.tsx":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/mine/index!./src/pages/mine/index.tsx ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Mine; }
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
/* harmony import */ var _components_Pic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Pic */ "./src/components/Pic.tsx");
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/api */ "./src/services/api.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/store/index.ts");
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/format */ "./src/utils/format.ts");
/* harmony import */ var _utils_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/ui */ "./src/utils/ui.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);













var interestNote = function interestNote(interest) {
  return interest === 'requested' ? ' · awaiting interest' : interest === 'declined' ? ' · not interested' : interest === 'interested' ? ' · interested' : '';
};
function Mine() {
  var s = (0,_store__WEBPACK_IMPORTED_MODULE_5__.useStore)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    busy = _useState2[0],
    setBusy = _useState2[1];
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useDidShow)(function () {
    return (0,_store__WEBPACK_IMPORTED_MODULE_5__.updateTabBadges)();
  });
  var listings = (0,_store__WEBPACK_IMPORTED_MODULE_5__.myListings)(s);

  // Confirm (optional) -> call the API -> store the fresh listing -> toast.
  function run(_x, _x2, _x3, _x4) {
    return _run.apply(this, arguments);
  }
  function _run() {
    _run = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee(key, ask, call, done) {
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
            setBusy(key);
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
            setBusy(null);
            return _context.f(8);
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[5, 7, 8, 9]]);
    }));
    return _run.apply(this, arguments);
  }
  if (!listings.length) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "empty",
      children: ["You have not listed anything yet.", '\n', "Use \u201CSell\u201D to add your first one."]
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
    className: "page",
    children: listings.map(function (i) {
      var top = (0,_utils_format__WEBPACK_IMPORTED_MODULE_6__.topBid)(i);
      var open = !i.status || i.status === 'active';
      var pending = i.bids.find(function (b) {
        return b.id === i.pendingBidId;
      });
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "sec flush spaced ".concat(i.id === s.flashId ? 'flash' : ''),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "listing-head",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Pic__WEBPACK_IMPORTED_MODULE_3__["default"], {
            photo: i.photos && i.photos[0],
            category: i.category,
            size: "thumb"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: "grow",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
              className: "name tight",
              children: i.name
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                className: "tag",
                children: i.condition
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                className: "dim",
                children: i.category
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "row top-gap",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            children: "Asking price"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "bold",
            children: ["\xA5", i.price]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            children: "Listing status"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "bold",
            children: i.status || 'active'
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            children: "Top bid"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "bold ".concat(top ? 'green' : 'dim'),
            children: top ? '¥' + top : 'No bids yet'
          })]
        }), i.pendingBidId && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "note",
          children: ["Waiting for ", pending ? pending.bidder : 'a bidder', " to confirm interest."]
        }), i.bids.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "log",
          children: (0,_utils_format__WEBPACK_IMPORTED_MODULE_6__.rankedForDisplay)(i.bids).map(function (b) {
            var front = i.frontRunnerBidId ? i.frontRunnerBidId === b.id : b.amount === top && b.status === 'active';
            var canSuspend = open && front && !i.pendingBidId;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
              className: "log-row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                className: "grow",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                  children: [b.bidder, " "]
                }), front && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                  className: "bold dim",
                  children: "\xB7 front-runner"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                  className: "dim",
                  children: [b.status || 'active', interestNote(b.interest)]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                className: "right log-end",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                    className: "bold",
                    children: ["\xA5", b.amount]
                  }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                    className: "dim",
                    children: (0,_utils_format__WEBPACK_IMPORTED_MODULE_6__.formatTime)(b.at)
                  })]
                }), canSuspend && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Btn__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  variant: "amber",
                  small: true,
                  className: "suspend",
                  disabled: busy !== null,
                  onClick: function onClick() {
                    return run("s".concat(b.id), null, function () {
                      return _services_api__WEBPACK_IMPORTED_MODULE_4__.api.suspendBid(i.id, b.id, s.userId);
                    }, 'Bid suspended; the next bidder has been asked to confirm.');
                  },
                  children: "Suspend & ask next"
                })]
              })]
            }, b.id);
          })
        }), open && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "actions",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Btn__WEBPACK_IMPORTED_MODULE_2__["default"], {
            small: true,
            disabled: busy !== null,
            className: "grow",
            onClick: function onClick() {
              return run("m".concat(i.id), ['Mark sold', 'Mark this listing as sold? The current front-runner will be marked as the winner.'], function () {
                return _services_api__WEBPACK_IMPORTED_MODULE_4__.api.markSold(i.id, s.userId);
              }, 'Listing marked sold.');
            },
            children: "Mark sold"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Btn__WEBPACK_IMPORTED_MODULE_2__["default"], {
            small: true,
            variant: "secondary",
            disabled: busy !== null,
            className: "grow gap-l",
            onClick: function onClick() {
              return run("c".concat(i.id), ['Cancel listing', 'Cancel this listing?'], function () {
                return _services_api__WEBPACK_IMPORTED_MODULE_4__.api.cancelListing(i.id, s.userId);
              }, 'Listing cancelled.');
            },
            children: "Cancel listing"
          })]
        })]
      }, i.id);
    })
  });
}

/***/ }),

/***/ "./src/pages/mine/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/mine/index.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/mine/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/mine/index!./src/pages/mine/index.tsx");


var config = {"navigationBarTitleText":"My listings"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/mine/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/mine/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map