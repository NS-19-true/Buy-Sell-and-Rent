"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/market/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/market/index!./src/pages/market/index.tsx":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/market/index!./src/pages/market/index.tsx ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Market; }
/* harmony export */ });
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _components_Chips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Chips */ "./src/components/Chips.tsx");
/* harmony import */ var _components_Pic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Pic */ "./src/components/Pic.tsx");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../config */ "./src/config.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store */ "./src/store/index.ts");
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/format */ "./src/utils/format.ts");
/* harmony import */ var _utils_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/ui */ "./src/utils/ui.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);












function Market() {
  var s = (0,_store__WEBPACK_IMPORTED_MODULE_5__.useStore)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('All'),
    _useState2 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    cat = _useState2[0],
    setCat = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState3, 2),
    q = _useState4[0],
    setQ = _useState4[1];
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useDidShow)(function () {
    return (0,_store__WEBPACK_IMPORTED_MODULE_5__.updateTabBadges)();
  });
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.usePullDownRefresh)(function () {
    (0,_store__WEBPACK_IMPORTED_MODULE_5__.refresh)().catch(function (e) {
      return (0,_utils_ui__WEBPACK_IMPORTED_MODULE_7__.toast)(e.message);
    }).finally(function () {
      return _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().stopPullDownRefresh();
    });
  });
  var list = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var needle = q.trim().toLowerCase();
    return s.items.filter(function (i) {
      return (0,_utils_format__WEBPACK_IMPORTED_MODULE_6__.listingStatus)(i) === 'active';
    }).filter(function (i) {
      return (cat === 'All' || i.category === cat) && (i.name + i.category + i.description).toLowerCase().includes(needle);
    });
  }, [s.items, cat, q]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: "page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: "live-row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: "live ".concat(s.live ? 'on' : '')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
        className: "dim",
        children: s.live ? 'Live · connected to server' : _config__WEBPACK_IMPORTED_MODULE_4__.IS_PROD ? 'Connecting…' : "Connecting to ".concat(_config__WEBPACK_IMPORTED_MODULE_4__.API_BASE, " \u2026")
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Input, {
      className: "search",
      type: "text",
      confirmType: "search",
      placeholder: "Search bikes, fridges, books...",
      value: q,
      onInput: function onInput(e) {
        return setQ(e.detail.value);
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Chips__WEBPACK_IMPORTED_MODULE_2__["default"], {
      options: ['All'].concat((0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(s.categories)).map(function (c) {
        return {
          key: c,
          label: c
        };
      }),
      value: cat,
      onChange: setCat
    }), list.length ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: "grid",
      children: list.map(function (i) {
        var top = (0,_utils_format__WEBPACK_IMPORTED_MODULE_6__.topBid)(i);
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: "item",
          hoverClass: "item-hover",
          onClick: function onClick() {
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
              url: "/pages/detail/index?id=".concat(i.id)
            });
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Pic__WEBPACK_IMPORTED_MODULE_3__["default"], {
            photo: i.photos && i.photos[0],
            category: i.category,
            size: "card"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: "meta",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              className: "name",
              children: i.name
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                className: "tag",
                children: i.condition
              }), (0,_store__WEBPACK_IMPORTED_MODULE_5__.isMine)(i) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                className: "tag",
                children: "Yours"
              }), top !== null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                className: "dim",
                children: ["Top bid \xA5", top]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              className: "price",
              children: ["\xA5", i.price]
            })]
          })]
        }, i.id);
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: "empty",
      children: !s.loaded ? 'Loading…' : s.items.length ? 'No items match these filters.' : 'Nothing listed yet. New items appear here instantly.'
    })]
  });
}

/***/ }),

/***/ "./src/pages/market/index.tsx":
/*!************************************!*\
  !*** ./src/pages/market/index.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_market_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/market/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/market/index!./src/pages/market/index.tsx");


var config = {"navigationBarTitleText":"HUST Campus Trade","enablePullDownRefresh":true};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_market_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/market/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_market_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_market_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_market_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_market_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/market/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map