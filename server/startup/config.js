"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.jwtPrivateKey) {
    throw new Error('FATAL ERROR jwtPrivateKey is not defined');
}
var key = process.env.jwtPrivateKey;
exports.default = key;
