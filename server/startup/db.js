"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var util_1 = require("util");
var dotenv_1 = __importDefault(require("dotenv"));
var winston_1 = __importDefault(require("winston"));
dotenv_1.default.config();
var envString = (_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toUpperCase();
var pool = mysql_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env['DB_USER_' + envString],
    password: process.env['DB_PASSWORD_' + envString],
    database: process.env['DB_USER_' + envString],
    port: 3306
});
pool.getConnection(function (err, connection) {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
            winston_1.default.error(err);
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
            winston_1.default.error(err);
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
            winston_1.default.error(err);
        }
    }
    console.log('connected');
    if (connection)
        connection.release();
    return;
});
pool.query = util_1.promisify(pool.query);
exports.default = pool;
