"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
function default_1(err, req, res, next) {
    winston_1.default.error(err);
    res.status(500).send('Something failed');
}
exports.default = default_1;
