import prismaClient from "../../prisma";
import Stripe from "stripe";

interface CreatePortalRequest {
    user_id: string;
}

class CreatePortalService {
    async execute({ user_id }: CreatePortalRequest) {
        const stripe = new Stripe(process.env.STRIPE_API_KEY, {
            apiVersion: "2024-06-20",
            appInfo: {
                name: "barberschedule",
                version: "1",
            }
        });

        const findUser = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
        });

        let sessionId = findUser.stripe_customer_id;

        if(!sessionId) {
            console.log("Não tem stripe_customer_id");
            return { message: "Usuário não possui stripe_customer_id" };
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: sessionId,
            return_url: process.env.STRIPE_SUCCESS_URL,
        });

        return {sessionId: portalSession.url};
    }
}

export { CreatePortalService };