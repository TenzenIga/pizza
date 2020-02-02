"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helmet_1 = __importDefault(require("helmet"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
function default_1(app) {
    app.use(helmet_1.default());
    app.use(compression_1.default());
    app.use(cors_1.default());
}
exports.default = default_1;
