"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            var _b, _c;
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                },
                include: {
                    subscriptions: true,
                }
            });
            if (!user) {
                throw new Error("Email/Password incorrect");
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user === null || user === void 0 ? void 0 : user.password);
            if (!passwordMatch) {
                throw new Error("Email/Password incorrect");
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: "30d"
            });
            return {
                id: user === null || user === void 0 ? void 0 : user.id,
                name: user === null || user === void 0 ? void 0 : user.name,
                email: user === null || user === void 0 ? void 0 : user.email,
                adress: user === null || user === void 0 ? void 0 : user.adress,
                phone: user === null || user === void 0 ? void 0 : user.phone,
                banner: user === null || user === void 0 ? void 0 : user.banner,
                token: token,
                subscriptions: user.subscriptions ? {
                    id: (_b = user === null || user === void 0 ? void 0 : user.subscriptions) === null || _b === void 0 ? void 0 : _b.id,
                    title: (_c = user === null || user === void 0 ? void 0 : user.subscriptions) === null || _c === void 0 ? void 0 : _c.status,
                } : null
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
