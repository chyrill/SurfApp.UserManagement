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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
const devConfig = {
    MONGO_URL: 'mongodb://localhost/usermanagement-dev'
};

const testConfig = {
    MONGO_URL: 'mongodb://localhost/usermanagement-test'
};

const prodConfig = {
    MONGO_URL: 'mongodb://localhost/usermanagement'
};

const defaultConfig = {
    PORT: process.env.PORT || 3000
};

function envConfig(env) {
    switch (env) {
        case 'development':
            return devConfig;
        case 'test':
            return testConfig;
        default:
            return prodConfig;
    }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(4);

var _middlewares = __webpack_require__(5);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(10);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

(0, _middlewares2.default)(app);

app.get('/', (req, res) => {
    res.send('Hello world');
});

(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
    if (err) {
        throw err;
    } else {
        console.log(`
			SERVER running on port : ${_constants2.default.PORT}
			--------------------------------
			Running on ${process.env.NODE_ENV}
			--------------------------------
			User Management started... 
			`);
    }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

try {
    _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (err) {
    _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}

_mongoose2.default.connection.once('open', () => console.log('MongoDB running')).on('error', e => {
    throw e;
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _morgan = __webpack_require__(6);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(7);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(8);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(9);

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';

const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
    if (isProd) {
        app.use((0, _compression2.default)());
        app.use((0, _helmet2.default)());
    }
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    if (isDev) {
        app.use((0, _morgan2.default)('dev'));
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userLogin = __webpack_require__(11);

var _userLogin2 = _interopRequireDefault(_userLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    app.use('/api/v1/userLogin', _userLogin2.default);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _userLogin = __webpack_require__(12);

var userLoginController = _interopRequireWildcard(_userLogin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('/signup', userLoginController.signUp);

exports.default = routes;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signUp = undefined;

let signUp = exports.signUp = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        var response = new _result2.default();
        try {

            const usersInfo = yield _userInfo2.default.find({ $or: [{ FirstName: req.body.FirstName, LastName: req.body.LastName }, { Email: req.body.Email }] });

            if (usersInfo.length > 0) {
                response.successful = false;
                response.model = req.body;
                response.message = "User is already exist";
                return res.status(400).json(response);
            }

            var userInfoData = {
                LastName: req.body.LastName,
                FirstName: req.body.FirstName,
                MiddleName: req.body.MiddleName,
                Address1: req.body.Address1,
                Address2: req.body.Address2,
                City: req.body.City,
                State: req.body.State,
                Country: req.body.Country,
                Email: req.body.Email,
                PhoneNumber: req.body.PhoneNumber,
                DateCreated: new Date()
            };

            const userInfoCreateRes = yield _userInfo2.default.create(userInfoData);

            var userLoginData = {
                Email: req.body.Email,
                Password: req.body.Password,
                UserInfo_Id: userInfoCreateRes.id,
                Context: "dsadsadsadasdsa"
            };

            const userLogin = yield _userLogin2.default.create(userLoginData);
            response.model = userLogin;
            response.successful = true;
            response.message = "User is Created Successfully";
            return res.status(201).json(response);
        } catch (e) {
            console.log(e);
            response.model = req.body;
            response.successful = false;
            response.message = e.errmsg;
            return res.status(500).json(response);
        }
    });

    return function signUp(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

var _userLogin = __webpack_require__(13);

var _userLogin2 = _interopRequireDefault(_userLogin);

var _userInfo = __webpack_require__(16);

var _userInfo2 = _interopRequireDefault(_userInfo);

var _result = __webpack_require__(15);

var _result2 = _interopRequireDefault(_result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(14);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserLoginSchema = new _mongoose.Schema({
    UserInfo_Id: {
        type: String,
        required: [true]
    },
    Email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        index: false,
        validate: {
            validator(email) {
                return _validator2.default.isEmail(email);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    Password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minLength: [6, 'Password minimum length is 6!']
    },
    Context: {
        type: String
    }

});

exports.default = _mongoose2.default.model('UserLogin', UserLoginSchema);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class Result {
    constructor(model, message, successful) {
        this.model = model;
        this.message = message;
        this.successful = successful;
    }
}

exports.default = Result;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(14);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserInfoSchema = new _mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    LastName: {
        type: String,
        required: [true, 'Last Name is required']
    },
    MiddleName: {
        type: String
    },
    Address1: {
        type: String,
        required: [true, 'Address 1 is required']
    },
    Address2: {
        type: String
    },
    State: {
        type: String,
        required: [true, 'State is required']
    },
    City: {
        type: String,
        required: [true, 'City is required']
    },
    Country: {
        type: String,
        required: [true, 'Country is required']
    },
    Email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator(email) {},
            message: '{VALUE} is not valid email'
        }

    },
    PhoneNumber: {
        type: String,
        required: [true, 'Phone Number is required']
    },
    DateCreated: {
        type: Date
    },
    DateUpdated: {
        type: Date
    }
});

exports.default = _mongoose2.default.model('UserInfo', UserInfoSchema);

/***/ })
/******/ ]);