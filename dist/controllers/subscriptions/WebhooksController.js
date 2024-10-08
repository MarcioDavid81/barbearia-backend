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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksController = void 0;
const stripe_1 = require("../../utils/stripe");
const manageSubscription_1 = require("../../utils/manageSubscription");
class WebhooksController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let event = request.body;
            const signature = request.headers['stripe-signature'];
            let endpointSecret = 'whsec_u8VcKm0OGFHIfwerddoRRgpJYSYcM1iu';
            //whsec_NvhSFdOgp0LE4dJLIMMAZ7VATTkiOJSZ teste
            //whsec_JwVH36EiLS9f5wpHRoMEhj5cqIiHxT3d produção /webhooks
            try {
                event = stripe_1.stripe.webhooks.constructEvent(request.body, signature, endpointSecret);
            }
            catch (err) {
                console.log("Error in webhook", err.message);
                return response.sendStatus(400).send(`Webhook error: ${err.message}`);
            }
            switch (event.type) {
                case 'customer.subscription.deleted':
                    const payment = event.data.object;
                    yield (0, manageSubscription_1.saveSubscription)(payment.id, payment.customer.toString(), false, true);
                    break;
                case 'customer.subscription.updated':
                    const paymentIntent = event.data.object;
                    yield (0, manageSubscription_1.saveSubscription)(paymentIntent.id, paymentIntent.customer.toString(), false, false);
                    break;
                case 'checkout.session.completed':
                    const checkoutSession = event.data.object;
                    yield (0, manageSubscription_1.saveSubscription)(checkoutSession.subscription.toString(), checkoutSession.customer.toString(), true, false);
                    break;
                default:
                    console.log(`Evento desconhecido ${event.type}`);
            }
            response.send();
        });
    }
}
exports.WebhooksController = WebhooksController;
