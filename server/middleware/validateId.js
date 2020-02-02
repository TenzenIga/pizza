"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(req, res, next) {
    if (isNaN(parseInt(req.params.id)))
        return res.status(404).send('Invalid ID');
    next();
}
exports.default = default_1;
