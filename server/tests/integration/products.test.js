"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var db_1 = __importDefault(require("../../startup/db"));
var config_1 = __importDefault(require("../../startup/config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var index_1 = __importDefault(require("../../index"));
describe('/products', function () {
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index_1.default.close();
                    return [4 /*yield*/, db_1.default.query('DELETE FROM orders')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db_1.default.query('DELETE FROM products')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db_1.default.query('DELETE FROM users')];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        db_1.default.end();
    });
    describe('GET /', function () {
        it('should return all products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("INSERT INTO products\n            ( name, price, img )\n        VALUES \n            ('pizza 1', 20, 'imglink'),\n            ('pizza 2', 32, 'imglink');\n          ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, supertest_1.default(index_1.default).get('/products')];
                    case 2:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.some(function (p) { return p.name === 'pizza 1'; })).toBeTruthy();
                        expect(res.body.some(function (p) { return p.name === 'pizza 2'; })).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('GET /:id', function () {
        it('should return product if valid id passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pizza, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("INSERT INTO products\n            ( name, price, img )\n        VALUES \n            ('pizza 1', 20, 'imglink')")];
                    case 1:
                        pizza = _a.sent();
                        return [4 /*yield*/, supertest_1.default(index_1.default).get('/products/' + pizza.insertId)];
                    case 2:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body[0].id).toEqual(pizza.insertId);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 if invalid id is passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(index_1.default).get('/products/jhhj')];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('POST /', function () {
        var token;
        var name;
        var newUser;
        var exec = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(index_1.default)
                            .post('/products')
                            .set('x-auth-token', token)
                            .send({ name: name, price: 10, img: 'imgsrc' })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("INSERT INTO users( username, email, password, date_created )\n            VALUES('John', 'test@mail.ru', '123456', NOW())")];
                    case 1:
                        newUser = _a.sent();
                        token = jsonwebtoken_1.default.sign({ uid: newUser.insertId, username: 'John', admin: true }, config_1.default);
                        name = 'pizza';
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 401 if client is not logged in', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = '';
                        return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 403 if user is not admin', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = jsonwebtoken_1.default.sign({ uid: newUser.insertId, username: 'John', admin: false }, config_1.default);
                        return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(403);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 if product info is not valid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = '';
                        return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should save product if it is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, addedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, db_1.default.query('SELECT * from products WHERE id = ?', [res.body.insertId])];
                    case 2:
                        addedProduct = _a.sent();
                        expect(res.body.insertId).toEqual(addedProduct[0].id);
                        expect(addedProduct[0].name === 'pizza').toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('PUT /:id', function () {
        var token;
        var newName;
        var newUser;
        var pizza;
        var exec = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(index_1.default)
                            .put('/products/' + pizza.insertId)
                            .set('x-auth-token', token)
                            .send({ name: newName, price: 10, img: 'imgsrc' })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("INSERT INTO products( name, price, img ) VALUES ('pizza 1', 20, 'imglink')")];
                    case 1:
                        pizza = _a.sent();
                        return [4 /*yield*/, db_1.default.query("INSERT INTO users( username, email, password, date_created )\n            VALUES('John', 'test@mail.ru', '123456', NOW())")];
                    case 2:
                        newUser = _a.sent();
                        token = jsonwebtoken_1.default.sign({ uid: newUser.insertId, username: 'John', admin: true }, config_1.default);
                        newName = 'pizza';
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 401 if client is not logged in', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = '';
                        return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 403 if user is not admin', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = jsonwebtoken_1.default.sign({ uid: newUser.insertId, username: 'John', admin: false }, config_1.default);
                        return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(403);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 400 if product input is not valid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newName = '';
                        return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 if invalid id is passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pizza = 'a';
                        return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update product if id and input data is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exec()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db_1.default.query('SELECT * from products WHERE id = ?', [pizza.insertId])];
                    case 2:
                        updatedProduct = _a.sent();
                        expect(pizza.insertId).toEqual(updatedProduct[0].id);
                        expect(updatedProduct[0].name === newName).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('DELETE /:id', function () {
        var token;
        var newUser;
        var pizza;
        var exec = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(index_1.default)
                            .delete('/products/' + pizza.insertId)
                            .set('x-auth-token', token)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.query("INSERT INTO products( name, price, img ) VALUES ('pizza 1', 20, 'imglink')")];
                    case 1:
                        pizza = _a.sent();
                        return [4 /*yield*/, db_1.default.query("INSERT INTO users( username, email, password, date_created )\n            VALUES('John', 'test@mail.ru', '123456', NOW())")];
                    case 2:
                        newUser = _a.sent();
                        token = jsonwebtoken_1.default.sign({ uid: newUser.insertId, username: 'John', admin: true }, config_1.default);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 401 if client is not logged in', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = '';
                        return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 403 if user is not admin', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = jsonwebtoken_1.default.sign({ uid: newUser.insertId, username: 'John', admin: false }, config_1.default);
                        return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(403);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 if invalid id is passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pizza = 'a';
                        return [4 /*yield*/, exec()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 200 and product deleted', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exec()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db_1.default.query('SELECT * from products WHERE id = ?', [pizza.insertId])];
                    case 2:
                        deletedProduct = _a.sent();
                        expect(deletedProduct).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
