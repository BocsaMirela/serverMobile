require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator__);


var _this = this;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Koa = __webpack_require__(4);
var app = new Koa();
var server = __webpack_require__(5).createServer(app.callback());
var WebSocket = __webpack_require__(6);
var wss = new WebSocket.Server({ server: server });
var fs = __webpack_require__(7);
var Router = __webpack_require__(8);
var cors = __webpack_require__(9);
var koaJwt = __webpack_require__(10);
var jwt = __webpack_require__(11);
var bodyparser = __webpack_require__(12);

var koaJwtKey = 'mySecretKey';

app.use(bodyparser()); //1
app.use(cors()); //2
app.use(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
        var start, ms;
        return __WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // logger
                        start = new Date();
                        _context.next = 3;
                        return next();

                    case 3:
                        ms = new Date() - start;

                        console.log(ctx.method + ' ' + ctx.url + ' ' + ctx.response.status + ' - ' + ms + 'ms');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

app.use(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
        return __WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return next();

                    case 3:
                        _context2.next = 9;
                        break;

                    case 5:
                        _context2.prev = 5;
                        _context2.t0 = _context2['catch'](0);

                        ctx.response.body = { issue: [{ error: _context2.t0.message || 'Unexpected error' }] };
                        ctx.response.status = 500; // internal server error

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this, [[0, 5]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

app.use(koaJwt({ secret: koaJwtKey }).unless({ path: [/^\/auth/] }));

var Entry = function Entry(_ref3) {
    var id = _ref3.id,
        body = _ref3.body,
        date = _ref3.date,
        userId = _ref3.userId,
        imagePath = _ref3.imagePath;

    _classCallCheck(this, Entry);

    this.id = id;
    this.body = body;
    this.date = date;
    this.userId = userId;
    this.imagePath = imagePath;
};

var pathToEntriesFile = 'data/entries.json';
var pathToUsersFile = 'data/users.json';

var saveToFile = function saveToFile(jsonObject) {
    fs.writeFile(pathToEntriesFile, JSON.stringify(jsonObject), function (err) {
        if (err) {
            return console.log(err);
        }
    });
};

var usersContent = fs.readFileSync(pathToUsersFile, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
});

var contents = fs.readFileSync(pathToEntriesFile, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
});

var entries = JSON.parse(contents);
var users = JSON.parse(usersContent);
var lastUpdated = entries[entries.length - 1].date;
var lastId = entries.sort(function (n1, n2) {
    return n1.id - n2.id;
})[entries.length - 1].id;

var pageSize = 10;

var broadcast = function broadcast(data) {
    wss.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

var router = new Router();

router.post('/auth', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx) {
        var user, found, idUser;
        return __WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        user = ctx.request.body;

                        console.log(user);
                        found = users.findIndex(function (obj) {
                            return obj.email === user.email && obj.password === user.password;
                        });
                        idUser = users[found].id;

                        console.log("idUser" + idUser);
                        if (found != -1) {
                            ctx.response.body = { outcome: 'Succes' };
                            ctx.response.status = 200;
                            ctx.body = {
                                token: jwt.sign({ role: 'admin' }, koaJwtKey), //Should be the same secret key as the one used is ./koaJwt.js
                                id: idUser,
                                message: "Successfully logged in!"
                            };
                        } else {
                            ctx.response.body = { outcome: 'Succes' };
                            ctx.response.status = 200;
                            ctx.body = {
                                token: "", //Should be the same secret key as the one used is ./koaJwt.js
                                id: "",
                                message: "Wrong"
                            };
                        }

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this);
    }));

    return function (_x5) {
        return _ref4.apply(this, arguments);
    };
}());

router.get('/entry', function (ctx) {
    console.log("daaa");
    var body = ctx.request.query.body;
    var page = parseInt(ctx.request.query.page) || 1;
    ctx.response.set('Last-Modified', new Date(lastUpdated).toUTCString());
    var sortedEntries = entries.sort(function (n1, n2) {
        return -(n1.date - n2.date);
    });
    var offset = (page - 1) * pageSize;
    ctx.response.body = {
        page: page,
        entries: sortedEntries.slice(offset, offset + pageSize),
        more: offset + pageSize < sortedEntries.length
    };
    ctx.response.status = 200; // OK
});

router.get('/entry/all', function (ctx) {
    console.log("daaa");
    var sortedEntries = entries.sort(function (n1, n2) {
        return -(n1.date - n2.date);
    });
    ctx.response.body = sortedEntries;
    ctx.response.status = 200; // OK
});

router.get('/entry/check', function (ctx) {
    console.log("daaa");
    ctx.response.body = "ok";
    ctx.response.status = 200; // OK
});

router.get('/entry/:id', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.mark(function _callee4(ctx) {
        var entryId, entry;
        return __WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        entryId = ctx.request.params.id;
                        entry = entries.find(function (entry) {
                            return entryId === entry.id;
                        });

                        if (entry) {
                            ctx.response.body = entry;
                            ctx.response.status = 200; // ok
                        } else {
                            ctx.response.body = { issue: [{ warning: 'Entry with id ' + entryId + ' not found' }] };
                            ctx.response.status = 404; // NOT FOUND (if you know the resource was deleted, then return 410 GONE)
                        }

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, _this);
    }));

    return function (_x6) {
        return _ref5.apply(this, arguments);
    };
}());

var createEntry = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.mark(function _callee5(ctx) {
        var entry;
        return __WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        entry = ctx.request.body;

                        console.log("create entru" + entry.body);

                        if (entry.body) {
                            _context5.next = 7;
                            break;
                        }

                        // validation
                        console.log("create entru empty body" + entry);
                        ctx.response.body = { issue: [{ error: 'Entry body is missing' }] };
                        ctx.response.status = 400; //  BAD REQUEST
                        return _context5.abrupt('return');

                    case 7:
                        console.log("create entru passed" + entry);
                        if (!entry.id)
                            // entry.id = `${parseInt(lastId) + 1}`;
                            entry.id = parseInt(lastId) + 1;
                        // lastId = entry.id;
                        if (entry.id > lastId) {
                            lastId = entry.id + 1;
                        } else {
                            lastId = lastId + 1;
                        }
                        entries.push(entry);
                        ctx.response.body = entry;
                        ctx.response.status = 201; // CREATED
                        broadcast({ event: 'created', entry: entry });

                    case 14:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, _this);
    }));

    return function createEntry(_x7) {
        return _ref6.apply(this, arguments);
    };
}();

router.post('/entry', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.mark(function _callee6(ctx) {
        var entryE, id, entry;
        return __WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        console.log("add" + ctx.request.body.id);
                        entryE = ctx.request.body;
                        id = entryE.id;
                        _context6.next = 5;
                        return createEntry(ctx);

                    case 5:
                        saveToFile(entries);
                        if (!id) {
                            id = parseInt(lastId) - 1;
                        }
                        entry = entries.find(function (entry) {
                            return entry.id == id;
                        });

                        if (entry) {
                            ctx.response.body = entry;
                            ctx.response.status = 200; // ok
                        } else {
                            ctx.response.body = { issue: [{ warning: 'Entry with id ' + entryId + ' not found' }] };
                            ctx.response.status = 404; // NOT FOUND (if you know the resource was deleted, then return 410 GONE)
                        }

                    case 9:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, _this);
    }));

    return function (_x8) {
        return _ref7.apply(this, arguments);
    };
}());

router.put('/entry/:id/:userId', function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.mark(function _callee7(ctx) {
        var id, idUser, entry, entryId, index;
        return __WEBPACK_IMPORTED_MODULE_0_D_University_serverAppMobile_serverMobile_myserverReact_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        console.log("update" + ctx.request.body.id);
                        id = ctx.params.id;
                        idUser = ctx.params.userId;
                        entry = ctx.request.body;
                        entryId = entry.id;

                        console.log("update" + entryId);
                        console.log("update user id " + idUser);

                        if (!(id != entry.id)) {
                            _context7.next = 12;
                            break;
                        }

                        console.log("update not 1  good");
                        ctx.response.body = { issue: [{ error: 'Param id and body id should be the same' }] };
                        ctx.response.status = 400; // BAD REQUEST
                        return _context7.abrupt('return');

                    case 12:
                        // if (!noteId) {
                        //   await createEntry(ctx);
                        //   return;
                        // }
                        index = entries.findIndex(function (obj) {
                            return obj.id == id && obj.userId == idUser;
                        });

                        if (!(index === -1)) {
                            _context7.next = 18;
                            break;
                        }

                        console.log("update not  good");
                        ctx.response.body = { issue: [{ error: 'Entry with id ' + id + ' not found' }] };
                        ctx.response.status = 400; // BAD REQUEST
                        return _context7.abrupt('return');

                    case 18:
                        // if (noteVersion < entries[index].version) {
                        //   ctx.response.body = {issue: [{error: `Version conflict`}]};
                        //   ctx.response.status = 409; // CONFLICT
                        //   return;
                        // }
                        entries[index] = entry;
                        ctx.response.body = entry;
                        ctx.response.status = 200; // OK
                        broadcast({ event: 'updated', entry: entry });
                        console.log("update  good " + entry.body);
                        saveToFile(entries);

                    case 24:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, _this);
    }));

    return function (_x9) {
        return _ref8.apply(this, arguments);
    };
}());

router.del('/entry/:id/:userId', function (ctx) {
    var id = ctx.params.id;
    var idUser = ctx.params.userId;
    var index = entries.findIndex(function (entry) {
        return id == entry.id && idUser == entry.userId;
    });
    if (index !== -1) {
        var entry = entries[index];
        entries.splice(index, 1);
        lastUpdated = new Date();
        broadcast({ event: 'deleted', entry: entry });
    }
    ctx.response.status = 204; // no content
    ctx.response.body = entries[index];
    saveToFile(entries);
});

// setInterval(() => {
//   lastUpdated = new Date();
//   lastId = `${parseInt(lastId) + 1}`;
//   const note = new Note({ id: lastId, text: `Note ${lastId}`, date: lastUpdated, version: 1 });
//   entries.push(note);
//   console.log(`
//    ${note.text}`);
//   broadcast({ event: 'created', note });
// }, 15000);

app.use(router.routes());
app.use(router.allowedMethods());

server.listen(3000);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-cors");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("koa-jwt");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map