"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./startup/routes"));
var logging_1 = __importDefault(require("./startup/logging"));
var prod_1 = __importDefault(require("./startup/prod"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var port = process.env.PORT || 5000;
prod_1.default(app);
logging_1.default();
routes_1.default(app);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, '../../client', 'build', 'index.html'));
    });
}
var server = app.listen(port, function () {
    console.log('Started server');
});
exports.default = server;
