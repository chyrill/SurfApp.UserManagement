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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("uuid-lib");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(2);

var _validator2 = _interopRequireDefault(_validator);

var _uuidLib = __webpack_require__(6);

var _uuidLib2 = _interopRequireDefault(_uuidLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CompanyDataSchema = new _mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Company Name is required']
    },
    Address1: {
        type: String,
        required: [true, 'Address is required']
    },
    City: {
        type: String,
        required: [true, 'City is required']
    },
    State: {
        type: String,
        required: [true, 'State is required']
    },
    Country: {
        type: String,
        required: [true, 'Country is required']
    },
    ZipCode: {
        type: String
    },
    Secretkey: {
        type: String
    },
    AppContext: {
        type: [String]
    },
    PhoneNumber: {
        type: [String]
    },
    DateCreated: {
        type: Date,
        default: new Date()
    }
});

exports.default = _mongoose2.default.model('CompanyData', CompanyDataSchema);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(9);

var _middlewares = __webpack_require__(10);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(15);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(3);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _morgan = __webpack_require__(11);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(12);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(13);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(14);

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
/* 11 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userLogin = __webpack_require__(16);

var _userLogin2 = _interopRequireDefault(_userLogin);

var _company = __webpack_require__(22);

var _company2 = _interopRequireDefault(_company);

var _userinfo = __webpack_require__(24);

var _userinfo2 = _interopRequireDefault(_userinfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "*");
        next();
    });
    app.use('/api/v1/userLogin', _userLogin2.default);
    app.use('/api/v1/company', _company2.default);
    app.use('/api/v1/userInfo', _userinfo2.default);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _userLogin = __webpack_require__(17);

var userLoginController = _interopRequireWildcard(_userLogin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('/signup', userLoginController.signUp);
routes.post('/login', userLoginController.logIn);
routes.post('/authorize', userLoginController.authorize);
routes.post('/:id', userLoginController.confirmEmail);

exports.default = routes;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.confirmEmail = exports.logIn = exports.authorize = exports.signUp = undefined;

let signUp = exports.signUp = (() => {
        var _ref = _asyncToGenerator(function* (req, res) {
                var response = new _result2.default();
                try {

                        const usersInfo = yield _userInfo2.default.find({ $or: [{ FirstName: req.body.FirstName, LastName: req.body.LastName, Context: req.body.Context }, { Email: req.body.Email, Context: req.body.Context }] });

                        if (usersInfo.length > 0) {
                                response.successful = false;
                                response.model = req.body;
                                response.message = "User is already exist";
                                return res.status(400).json(response);
                        }

                        var userInfoData = (0, _mapper.Mapper)(_userInfo2.default.schema.paths, req.body);

                        userInfoData.DateCreated = new Date();

                        const userInfoCreateRes = yield _userInfo2.default.create(userInfoData);

                        var userLoginData = {
                                Email: req.body.Email,
                                Password: req.body.Password,
                                UserInfo_Id: userInfoCreateRes.id,
                                Context: req.body.Context,
                                AuthCode: _uuidLib2.default.create(),
                                AccessLevel: req.body.AccessLevel,
                                ExpirationDate: new Date().getTime() + 30 * 60000
                        };

                        const userLogin = yield _userLogin2.default.create(userLoginData);
                        const user = {
                                Name: userInfoCreateRes.LastName + " " + userInfoCreateRes.FirstName,
                                UserId: userInfoCreateRes._id,
                                ProfilePicture: userInfoCreateRes.ProfilePicture,
                                AuthCode: userLogin.AuthCode,
                                AccessLevel: userLogin.AccessLevel,
                                Others: userInfoCreateRes.Others,
                                ConfirmEmail: false
                        };

                        const companyInfo = yield _company2.default.findOne({ _id: req.body.Context });
                        const token = _jsonwebtoken2.default.sign({ user }, companyInfo.Secretkey);

                        response.model = { Token: token };
                        response.successful = true;
                        response.message = "User is Created Successfully";
                        return res.status(201).json(response);
                } catch (e) {
                        console.log(e);

                        if (e.errmsg != null) {
                                response.message = e.errmsg;
                        } else {
                                response.message = e.message;
                        }

                        response.model = req.body;
                        response.successful = false;
                        console.log(response);
                        return res.status(500).json(response);
                }
        });

        return function signUp(_x, _x2) {
                return _ref.apply(this, arguments);
        };
})();

let authorize = exports.authorize = (() => {
        var _ref2 = _asyncToGenerator(function* (req, res) {
                var response = new _result2.default();

                try {

                        var userLoginRes = yield _userLogin2.default.findOne({ AuthCode: req.body.Authorization });

                        if (userLoginRes === null) {
                                response.model = req.body;
                                response.message = "AuthCode is not valid";
                                response.successful = false;

                                return res.status(401).json(response);
                        }
                        console.log(new Date());

                        if (userLoginRes.ExpirationDate < new Date()) {
                                response.model = req.body;
                                response.message = "AuthCode is expired";
                                response.successful = false;

                                return res.status(401).json(response);
                        }
                        var userRes = yield _userInfo2.default.findOne({ Email: userLoginRes.Email, Context: userLoginRes.Context });
                        console.log(userLoginRes);
                        userLoginRes.ExpirationDate = new Date().getTime() + 30 * 60000;

                        yield _userLogin2.default.findOneAndUpdate({ _id: userLoginRes._id }, userLoginRes, { upsert: true, strict: false });

                        var user = {
                                Name: userRes.LastName + ", " + userRes.FirstName,
                                Context: userLoginRes.Context
                        };

                        response.model = user;
                        response.message = "AuthCode verified";
                        response.successful = true;

                        return res.status(200).json(response);
                } catch (e) {
                        response.model = req.body;
                        response.message = e;
                        response.successful = false;

                        return res.status(500).json(response);
                }
        });

        return function authorize(_x3, _x4) {
                return _ref2.apply(this, arguments);
        };
})();

let logIn = exports.logIn = (() => {
        var _ref3 = _asyncToGenerator(function* (req, res) {
                var response = new _result2.default();

                try {
                        const userdata = yield _userLogin2.default.findOne({ Email: req.body.Email, Context: req.body.Context });

                        if (userdata === null) {
                                response.model = req.body;
                                reponse.message = "Email or Password is incorrect";
                                reponse.successful = false;
                                return res.status(401).json(response);
                        }

                        var ifTrue = (0, _bcryptNodejs.compareSync)(req.body.Password, userdata.Password);

                        if (!ifTrue) {
                                response.model = req.body;
                                reponse.message = "Email or Password is incorrect";
                                reponse.successful = false;
                                return res.status(401).json(response);
                        }

                        userdata.AuthCode = _uuidLib2.default.create();
                        userdata.ExpirationDate = new Date().getTime() + 30 * 60000;

                        console.log(userdata);

                        yield _userLogin2.default.findOneAndUpdate({ _id: userdata._id }, userdata, { upsert: true, strict: false });

                        var userInfoRes = yield _userInfo2.default.findOne({ Email: userdata.Email, Context: req.body.Context });

                        const user = {
                                Name: userInfoRes.LastName + ", " + userInfoRes.FirstName,
                                UserId: userInfoRes._id,
                                ProfileImage: userInfoRes.ProfilePicture,
                                Others: userInfoRes.Others,
                                AccessLevel: userdata.AccessLevel,
                                AuthCode: userdata.AuthCode,
                                ConfirmEmail: userdata.EmailConfirmation
                        };
                        const companyres = yield _company2.default.findOne({ _id: req.body.Context });

                        var token = _jsonwebtoken2.default.sign({ user }, companyres.Secretkey);

                        response.model = { Token: token };
                        response.message = "Successfully Log in";
                        response.successful = true;

                        return res.status(200).json(response);
                } catch (e) {
                        console.log(e);
                        response.model = req.body;
                        response.message = e.errmsg || 'Email or Password is incorrect';
                        response.successful = false;

                        return res.status(500).json(response);
                }
        });

        return function logIn(_x5, _x6) {
                return _ref3.apply(this, arguments);
        };
})();

let confirmEmail = exports.confirmEmail = (() => {
        var _ref4 = _asyncToGenerator(function* (req, res) {
                var result = new _result2.default();

                try {
                        var id = req.params.id;

                        if (id === null || id === undefined) {
                                result.successful = false;
                                result.model = null;
                                result.message = 'Id is required';

                                return res.status(400).json(result);
                        }

                        var userLoginData = yield _userLogin2.default.findOne({ _id: id });

                        userLoginData.EmailConfirmation = true;

                        yield _userLogin2.default.findOneAndUpdate({ _id: id }, userLoginData, { Upsert: true, strict: false });

                        var userInfoData = yield _userInfo2.default.findOne({ _id: userLoginData.UserInfo_Id });

                        var user = {
                                Name: userInfoData.LastName + " " + userInfoData.FirstName,
                                UserId: userInfoData._id,
                                ProfileImage: userInfoData.ProfilePicture,
                                AuthCode: userLoginData.AuthCode,
                                AccessLevel: userLoginData.AccessLevel,
                                ConfirmEmail: userLoginData.EmailConfirmation,
                                Others: userInfoData.Others
                        };

                        const companyres = yield _company2.default.findOne({ _id: userLoginData.Context });

                        var token = _jsonwebtoken2.default.sign({ user }, companyres.Secretkey);

                        result.successful = true;
                        result.model = token;
                        result.message = 'Successfully verified user';

                        return res.status(200).json(result);
                } catch (e) {
                        result.successful = false;
                        result.model = null;
                        result.message = e.errmsg;

                        return res.status(500).json(result);
                }
        });

        return function confirmEmail(_x7, _x8) {
                return _ref4.apply(this, arguments);
        };
})();

var _userLogin = __webpack_require__(18);

var _userLogin2 = _interopRequireDefault(_userLogin);

var _userInfo = __webpack_require__(19);

var _userInfo2 = _interopRequireDefault(_userInfo);

var _result = __webpack_require__(5);

var _result2 = _interopRequireDefault(_result);

var _mapper = __webpack_require__(20);

var _uuidLib = __webpack_require__(6);

var _uuidLib2 = _interopRequireDefault(_uuidLib);

var _bcryptNodejs = __webpack_require__(4);

var _jsonwebtoken = __webpack_require__(21);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _company = __webpack_require__(7);

var _company2 = _interopRequireDefault(_company);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(2);

var _validator2 = _interopRequireDefault(_validator);

var _bcryptNodejs = __webpack_require__(4);

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
    AccessLevel: {
        type: Number
    },
    Context: {
        type: String
    },
    AuthCode: {
        type: String
    },
    ExpirationDate: {
        type: Date
    },
    EmailConfirmation: {
        type: Boolean,
        default: false
    },
    DateCreated: {
        type: Date
    }

});

UserLoginSchema.pre('save', function (next) {
    if (this.isModified('Password')) {
        this.Password = this._hashPassword(this.Password);
        this.DateCreated = new Date();
    }

    return next();
});

UserLoginSchema.methods = {
    _hashPassword(password) {
        return (0, _bcryptNodejs.hashSync)(password);
    }
};

exports.default = _mongoose2.default.model('UserLogin', UserLoginSchema);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(2);

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
    ProfilePicture: {
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
            validator(email) {
                return _validator2.default.isEmail(email);
            },
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
    Context: {
        type: String
    },
    Others: {
        type: Object
    },
    DateUpdated: {
        type: Date
    }
});

exports.default = _mongoose2.default.model('UserInfo', UserInfoSchema);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapper = Mapper;
function Map(model, source) {
  var res = {};
  for (let key in model) {
    if (key != "_id" || key != "__v") {
      res[key] = source[key];
    }
  }

  return res;
}

function Mapper(model, source) {
  return Map(model, source);
}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _company = __webpack_require__(23);

var companyController = _interopRequireWildcard(_company);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('/create', companyController.create);

exports.default = routes;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.create = undefined;

let create = exports.create = (() => {
        var _ref = _asyncToGenerator(function* (req, res) {

                var response = new _result2.default();

                try {

                        var companyValidRes = yield _company2.default.find({ Name: req.body.Name });

                        if (companyValidRes.length > 1) {
                                response.model = req.body;
                                response.message = "Company already exist";
                                response.successful = false;
                                return res.status(400).json(response);
                        }

                        var result = yield _company2.default.create(req.body);

                        response.model = result;
                        response.message = "Successfully created a company data";
                        response.successful = true;

                        return res.status(201).json(response);
                } catch (e) {

                        response.message = e.errmsg;
                        response.successful = false;
                        response.model = req.body;

                        return res.status(500).json(response);
                }
        });

        return function create(_x, _x2) {
                return _ref.apply(this, arguments);
        };
})();

var _result = __webpack_require__(5);

var _result2 = _interopRequireDefault(_result);

var _company = __webpack_require__(7);

var _company2 = _interopRequireDefault(_company);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _userinfo = __webpack_require__(25);

var UserInfoController = _interopRequireWildcard(_userinfo);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.get('', UserInfoController.searchAll);

exports.default = routes;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.searchAll = undefined;

let searchAll = exports.searchAll = (() => {
        var _ref = _asyncToGenerator(function* (req, res) {
                var result = new _SearchResult2.default();

                try {
                        var authCode = req.headers.authorization.split(' ')[1];
                        var getUserLoginRes = yield _userLogin2.default.findOne({ AuthCode: authCode });

                        if (getUserLoginRes === null) {
                                result.successful = false;
                                result.items = 0;
                                result.totalcount = 0;
                                result.pages = 0;
                                result.message = 'Auth Code is invalid';

                                return res.status(401).json(result);
                        }

                        var context = getUserLoginRes.Context;

                        var expiryDate = getUserLoginRes.ExpirationDate;

                        if (expiryDate < new Date()) {
                                result.successful = false;
                                result.items = 0;
                                result.totalcount = 0;
                                result.pages = 0;
                                result.message = 'Auth Code is expired';

                                return res.status(401).json(result);
                        }
                        expiryDate = expiryDate.setDate(expiryDate.getMinutes() + 30);
                        getUserLoginRes.ExpirationDate = expiryDate;

                        yield _userLogin2.default.findOneAndUpdate({ _id: getUserLoginRes._id }, getUserLoginRes, { Upsert: true, strict: false });

                        var userInfoRes = yield _userInfo2.default.find({ Context: context });
                        result.successful = true;
                        result.items = userInfoRes;
                        result.totalcount = userInfoRes.length;
                        result.pages = 1;
                        result.message = 'Successfully retrieve records';

                        return res.status(200).json(result);
                } catch (e) {
                        console.log(e);
                        result.successful = false;
                        result.items = 0;
                        result.totalcount = 0;
                        result.pages = 0;
                        result.message = e.errmsg;

                        return res.status(500).json(result);
                }
        });

        return function searchAll(_x, _x2) {
                return _ref.apply(this, arguments);
        };
})();

var _userInfo = __webpack_require__(19);

var _userInfo2 = _interopRequireDefault(_userInfo);

var _result = __webpack_require__(5);

var _result2 = _interopRequireDefault(_result);

var _SearchResult = __webpack_require__(28);

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _QueryFilters = __webpack_require__(29);

var _userLogin = __webpack_require__(18);

var _userLogin2 = _interopRequireDefault(_userLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class SearchResult {
    constructor(items, totalcount, pages, message, successful) {
        this.items = items;
        this.totalcount = totalcount;
        this.pages = pages;
        this.message = message;
        this.successful = successful;
    }
}

exports.default = SearchResult;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryFilters = QueryFilters;
function QueryFilters(filters, context) {

  var request = JSON.parse(JSON.stringify(filters));
  var result = {};

  var data = request.split(',');

  for (var i in data) {

    var propertyName = data[i].split(':')[0];
    var value = data[i].split(':')[1];
    if (value.indexOf('/') > -1) {
      var item = value.replace('/', '').replace('/', '');
      console.log(item);
      result[propertyName] = new RegExp(item, "i");
    } else {
      result[propertyName] = value;
    }
  }

  result["Context"] = context;
  console.log(result);
  return result;
};

/***/ })
/******/ ]);