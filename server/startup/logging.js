"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
function default_1() {
    process.on('uncaughtException', function (ex) {
        winston_1.default.error(ex.message, function () {
            process.exit(1);
        });
    });
    process.on('unhandledRejection', function (ex) {
        winston_1.default.error(ex.message, function () {
            process.exit(1);
        });
    });
    winston_1.default.configure({
        transports: [
            new (winston_1.default.transports.File)({ filename: 'logfile.log' })
        ]
    });
}
exports.default = default_1;
