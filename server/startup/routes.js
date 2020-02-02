"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("../routes/products"));
var users_1 = __importDefault(require("../routes/users"));
var error_1 = __importDefault(require("../middleware/error"));
var orders_1 = __importDefault(require("../routes/orders"));
var auth_1 = __importDefault(require("../routes/auth"));
function default_1(app) {
    app.use(express_1.default.json());
    // USERS
    app.use('/users', users_1.default);
    app.use('/orders', orders_1.default);
    // authorization
    app.use('/auth', auth_1.default);
    // PRODUCTS
    app.use('/products', products_1.default);
    // Error handle
    app.use(error_1.default);
}
exports.default = default_1;
