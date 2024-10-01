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
exports.CreatePortalService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const stripe_1 = __importDefault(require("stripe"));
class CreatePortalService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            const stripe = new stripe_1.default(process.env.STRIPE_API_KEY, {
                apiVersion: "2024-06-20",
                appInfo: {
                    name: "barberschedule",
                    version: "1",
                }
            });
            const findUser = yield prisma_1.default.user.findFirst({
                where: {
                    id: user_id,
                },
            });
            let sessionId = findUser.stripe_customer_id;
            if (!sessionId) {
                console.log("Não tem stripe_customer_id");
                return { message: "Usuário não possui stripe_customer_id" };
            }
            const portalSession = yield stripe.billingPortal.sessions.create({
                customer: sessionId,
                return_url: process.env.STRIPE_SUCCESS_URL,
            });
            return { sessionId: portalSession.url };
        });
    }
}
exports.CreatePortalService = CreatePortalService;
