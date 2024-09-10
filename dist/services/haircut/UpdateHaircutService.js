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
exports.UpdateHaircutService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateHaircutService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, haircut_id, name, price, status = true }) {
            var _b;
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    id: user_id
                },
                include: {
                    subscriptions: true
                }
            });
            if (((_b = user === null || user === void 0 ? void 0 : user.subscriptions) === null || _b === void 0 ? void 0 : _b.status) !== 'premium') {
                throw new Error('Subscription not active');
            }
            const haircut = yield prisma_1.default.haircut.update({
                where: {
                    id: haircut_id
                },
                data: {
                    name: name,
                    price: price,
                    status: status === true ? true : false
                }
            });
            return haircut;
        });
    }
}
exports.UpdateHaircutService = UpdateHaircutService;
