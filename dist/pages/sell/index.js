"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/sell/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/sell/index!./src/pages/sell/index.tsx":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/sell/index!./src/pages/sell/index.tsx ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Sell; }
/* harmony export */ });
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js */ "./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _components_Btn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Btn */ "./src/components/Btn.tsx");
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api */ "./src/services/api.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store */ "./src/store/index.ts");
/* harmony import */ var _utils_photos__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/photos */ "./src/utils/photos.ts");
/* harmony import */ var _utils_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/ui */ "./src/utils/ui.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);













function Sell() {
  var s = (0,_store__WEBPACK_IMPORTED_MODULE_4__.useStore)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(s.userName),
    _useState2 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState, 2),
    name = _useState2[0],
    setName = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState3, 2),
    title = _useState4[0],
    setTitle = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState5, 2),
    catIndex = _useState6[0],
    setCatIndex = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState8 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState7, 2),
    condIndex = _useState8[0],
    setCondIndex = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState0 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState9, 2),
    price = _useState0[0],
    setPrice = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState1, 2),
    desc = _useState10[0],
    setDesc = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState12 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState11, 2),
    photos = _useState12[0],
    setPhotos = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState14 = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState13, 2),
    busy = _useState14[0],
    setBusy = _useState14[1];
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useDidShow)(function () {
    return (0,_store__WEBPACK_IMPORTED_MODULE_4__.updateTabBadges)();
  });
  function addPhotos() {
    return _addPhotos.apply(this, arguments);
  }
  function _addPhotos() {
    _addPhotos = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee() {
      var chosen, added, _iterator, _step, file, _t, _t2, _t3, _t4, _t5, _t6;
      return (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().chooseMedia({
              count: _utils_photos__WEBPACK_IMPORTED_MODULE_5__.MAX_PHOTOS - photos.length,
              mediaType: ['image'],
              sizeType: ['compressed'],
              sourceType: ['album', 'camera']
            });
          case 1:
            chosen = _context.v;
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            return _context.a(2);
          case 3:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: 'Preparing…',
              mask: true
            });
            _context.p = 4;
            added = [];
            _iterator = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_11__["default"])(chosen.tempFiles);
            _context.p = 5;
            _iterator.s();
          case 6:
            if ((_step = _iterator.n()).done) {
              _context.n = 9;
              break;
            }
            file = _step.value;
            _t2 = added;
            _t3 = file.tempFilePath;
            _context.n = 7;
            return (0,_utils_photos__WEBPACK_IMPORTED_MODULE_5__.toDataUrl)(file.tempFilePath);
          case 7:
            _t4 = _context.v;
            _t2.push.call(_t2, {
              path: _t3,
              dataUrl: _t4
            });
          case 8:
            _context.n = 6;
            break;
          case 9:
            _context.n = 11;
            break;
          case 10:
            _context.p = 10;
            _t5 = _context.v;
            _iterator.e(_t5);
          case 11:
            _context.p = 11;
            _iterator.f();
            return _context.f(11);
          case 12:
            setPhotos(function (prev) {
              return prev.concat(added).slice(0, _utils_photos__WEBPACK_IMPORTED_MODULE_5__.MAX_PHOTOS);
            });
            _context.n = 14;
            break;
          case 13:
            _context.p = 13;
            _t6 = _context.v;
            (0,_utils_ui__WEBPACK_IMPORTED_MODULE_6__.toast)(_t6.message);
          case 14:
            _context.p = 14;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            return _context.f(14);
          case 15:
            return _context.a(2);
        }
      }, _callee, null, [[5, 10, 11, 12], [4, 13, 14, 15], [0, 2]]);
    }));
    return _addPhotos.apply(this, arguments);
  }
  function publish() {
    return _publish.apply(this, arguments);
  }
  function _publish() {
    _publish = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee2() {
      var trimmed, value, created, _t7;
      return (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            trimmed = title.trim();
            value = Number(price);
            if (!(!trimmed || !(value > 0))) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, (0,_utils_ui__WEBPACK_IMPORTED_MODULE_6__.toast)('Add an item name and a price'));
          case 1:
            (0,_store__WEBPACK_IMPORTED_MODULE_4__.setUserName)(name);
            setBusy(true);
            _context2.p = 2;
            _context2.n = 3;
            return _services_api__WEBPACK_IMPORTED_MODULE_3__.api.createItem({
              name: trimmed,
              price: value,
              sellerId: s.userId,
              seller: name.trim(),
              category: s.categories[catIndex],
              condition: s.conditions[condIndex],
              description: desc,
              photos: photos.map(function (p) {
                return p.dataUrl;
              })
            });
          case 3:
            created = _context2.v;
            (0,_store__WEBPACK_IMPORTED_MODULE_4__.upsert)(created);
            setTitle('');
            setPrice('');
            setDesc('');
            setPhotos([]);
            setCatIndex(0);
            setCondIndex(0);
            (0,_utils_ui__WEBPACK_IMPORTED_MODULE_6__.toast)('Listing published');
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
              url: '/pages/mine/index'
            });
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t7 = _context2.v;
            (0,_utils_ui__WEBPACK_IMPORTED_MODULE_6__.toast)(_t7.message);
          case 5:
            _context2.p = 5;
            setBusy(false);
            return _context2.f(5);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 4, 5, 6]]);
    }));
    return _publish.apply(this, arguments);
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
    className: "page",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: "sec flush",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "h3",
        children: "List an item for sale"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "label",
        children: "Your name / dorm"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Input, {
        className: "field",
        type: "text",
        maxlength: 40,
        placeholder: "e.g. Amir, Dorm 6",
        value: name,
        onInput: function onInput(e) {
          return setName(e.detail.value);
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "label",
        children: "Item name"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Input, {
        className: "field",
        type: "text",
        maxlength: 80,
        placeholder: "e.g. Electric kettle",
        value: title,
        onInput: function onInput(e) {
          return setTitle(e.detail.value);
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "label",
        children: "Category"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Picker, {
        mode: "selector",
        range: s.categories,
        value: catIndex,
        onChange: function onChange(e) {
          return setCatIndex(Number(e.detail.value));
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "field picker",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            children: s.categories[catIndex]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "dim",
            children: "\u25BE"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "label",
        children: "Condition"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Picker, {
        mode: "selector",
        range: s.conditions,
        value: condIndex,
        onChange: function onChange(e) {
          return setCondIndex(Number(e.detail.value));
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "field picker",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            children: s.conditions[condIndex]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "dim",
            children: "\u25BE"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "label",
        children: "Original (asking) price (\xA5)"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Input, {
        className: "field",
        type: "digit",
        value: price,
        onInput: function onInput(e) {
          return setPrice(e.detail.value);
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "label",
        children: "Description"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Textarea, {
        className: "field area",
        maxlength: 500,
        placeholder: "Age, any damage, what is included",
        value: desc,
        onInput: function onInput(e) {
          return setDesc(e.detail.value);
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "label",
        children: ["Photos (up to ", _utils_photos__WEBPACK_IMPORTED_MODULE_5__.MAX_PHOTOS, ", 1 MB each)"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "photo-preview",
        children: [photos.map(function (p, n) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: "photo-tile",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Image, {
              className: "photo-img",
              src: p.path,
              mode: "aspectFill"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              className: "photo-x",
              onClick: function onClick() {
                return setPhotos(function (prev) {
                  return prev.filter(function (_, i) {
                    return i !== n;
                  });
                });
              },
              children: "\xD7"
            })]
          }, p.path);
        }), photos.length < _utils_photos__WEBPACK_IMPORTED_MODULE_5__.MAX_PHOTOS && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: "photo-add",
          hoverClass: "item-hover",
          onClick: addPhotos,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            children: "\uFF0B"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_Btn__WEBPACK_IMPORTED_MODULE_2__["default"], {
        disabled: busy,
        onClick: publish,
        className: "publish",
        children: "Publish listing"
      })]
    })
  });
}

/***/ }),

/***/ "./src/pages/sell/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/sell/index.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_sell_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/sell/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/sell/index!./src/pages/sell/index.tsx");


var config = {"navigationBarTitleText":"Sell an item"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_sell_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/sell/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_sell_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_sell_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_sell_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_sell_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./src/utils/photos.ts":
/*!*****************************!*\
  !*** ./src/utils/photos.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAX_PHOTOS: function() { return /* binding */ MAX_PHOTOS; },
/* harmony export */   toDataUrl: function() { return /* binding */ toDataUrl; }
/* harmony export */ });
/* unused harmony export MAX_PHOTO_BYTES */
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var _run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);



var MAX_PHOTOS = 4;
/** Server limit: 1 MB decoded per photo (server/server.js MAX_PHOTO_SIZE). */
var MAX_PHOTO_BYTES = 1000000;
var MIME = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif'
};
var mimeFromPath = function mimeFromPath(path) {
  return MIME[(path.split('.').pop() || '').toLowerCase()] || 'image/jpeg';
};
function readBase64(filePath) {
  return new Promise(function (resolve, reject) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getFileSystemManager().readFile({
      filePath: filePath,
      encoding: 'base64',
      success: function success(res) {
        var base64 = String(res.data);
        var padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
        resolve({
          base64: base64,
          bytes: Math.floor(base64.length * 3 / 4) - padding
        });
      },
      fail: function fail() {
        return reject(new Error('Could not read the photo'));
      }
    });
  });
}

/**
 * Turns a temp file from chooseMedia into the `data:` URI the API expects,
 * recompressing (JPEG) until it fits under the 1 MB server limit.
 * This replaces the web version's <input type=file> + FileReader.readAsDataURL.
 */
function toDataUrl(_x) {
  return _toDataUrl.apply(this, arguments);
}
function _toDataUrl() {
  _toDataUrl = (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee(path) {
    var file, mime, _i, _arr, quality, _yield$readBase, base64, bytes, _t;
    return (0,_run_media_nskein19_07c9c52b_122e_4421_af5e_e634bc8ceac5_E_Commerce_Project_Buy_Sell_and_Rent_taro_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          file = path;
          mime = mimeFromPath(path);
          _i = 0, _arr = [null, 70, 45, 25];
        case 1:
          if (!(_i < _arr.length)) {
            _context.n = 8;
            break;
          }
          quality = _arr[_i];
          if (!(quality !== null)) {
            _context.n = 5;
            break;
          }
          _context.p = 2;
          _context.n = 3;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().compressImage({
            src: path,
            quality: quality
          });
        case 3:
          file = _context.v.tempFilePath;
          mime = 'image/jpeg';
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          return _context.a(3, 8);
        case 5:
          _context.n = 6;
          return readBase64(file);
        case 6:
          _yield$readBase = _context.v;
          base64 = _yield$readBase.base64;
          bytes = _yield$readBase.bytes;
          if (!(bytes <= MAX_PHOTO_BYTES)) {
            _context.n = 7;
            break;
          }
          return _context.a(2, "data:".concat(mime, ";base64,").concat(base64));
        case 7:
          _i++;
          _context.n = 1;
          break;
        case 8:
          throw new Error('That photo is too large. Pick a smaller one.');
        case 9:
          return _context.a(2);
      }
    }, _callee, null, [[2, 4]]);
  }));
  return _toDataUrl.apply(this, arguments);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/sell/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map