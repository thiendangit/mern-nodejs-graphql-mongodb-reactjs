"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = require("../../models/user");
require("dotenv/config");
exports.userResolvers = {
    Mutation: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        register(_, { registerInput: { email, username, password } }) {
            return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                password = yield bcryptjs_1.default.hash('password', 12);
                const newUser = new user_1.User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString(),
                });
                const res = yield newUser.save();
                const token = jsonwebtoken_1.default.sign({
                    id: res === null || res === void 0 ? void 0 : res.id,
                    email: res === null || res === void 0 ? void 0 : res.email,
                    password: res === null || res === void 0 ? void 0 : res.password
                }, process.env["SECRET_KEY"], { expiresIn: '1h' });
                return Object.assign(Object.assign({}, res._doc), { id: res === null || res === void 0 ? void 0 : res.id, token });
            });
        }
    }
};
//# sourceMappingURL=user.js.map