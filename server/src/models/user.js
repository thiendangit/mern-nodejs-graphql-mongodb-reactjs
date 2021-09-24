"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map