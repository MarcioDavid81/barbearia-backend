import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe";
import { saveSubscription } from "../../utils/manageSubscription";

class WebhooksController {
    async handle(request: Request, response: Response) {
        let event: Stripe.Event = request.body;
        
        const signature = request.headers['stripe-signature'];

        let endpointSecret = 'whsec_u8VcKm0OGFHIfwerddoRRgpJYSYcM1iu';
                
        //whsec_NvhSFdOgp0LE4dJLIMMAZ7VATTkiOJSZ teste
        //whsec_JwVH36EiLS9f5wpHRoMEhj5cqIiHxT3d produção /webhooks

    try{
        event = stripe.webhooks.constructEvent(request.body, signature, endpointSecret);
    }catch(err) {
        console.log("Error in webhook", err.message);
        return response.sendStatus(400).send(`Webhook error: ${err.message}`);
    }


    switch(event.type) {
        case 'customer.subscription.deleted':

            const payment = event.data.object as Stripe.Subscription;

            await saveSubscription(
                payment.id,
                payment.customer.toString(),
                false,
                true
            )

            break;

        case 'customer.subscription.updated':

            const paymentIntent = event.data.object as Stripe.Subscription;

            await saveSubscription(
                paymentIntent.id,
                paymentIntent.customer.toString(),
                false,
                false
            )

            break;

        case 'checkout.session.completed':

            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            await saveSubscription(
                checkoutSession.subscription.toString(),
                checkoutSession.customer.toString(),
                true,
                false
            )

            break;

        default:
            console.log(`Evento desconhecido ${event.type}`);
    }

    response.send();
}
}

export { WebhooksController };