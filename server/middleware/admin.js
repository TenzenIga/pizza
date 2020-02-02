"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 401 Unauthorized 
// 403  Forbidden
function default_1(req, res, next) {
    if (!req.user.admin)
        return res.status(403).send('В доступе отказано');
    next();
}
exports.default = default_1;
