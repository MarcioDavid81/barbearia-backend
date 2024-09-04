import prismaClient from "../../prisma";

interface HaircutRequest {
    user_id: string;
    name: string;
    price: number;
}

class CreateHaircutService {
    async execute({ user_id, name, price }: HaircutRequest) {
        if (!name || !price) {
            throw new Error("Error");
        }

        const myHaircut = await prismaClient.haircut.count({
            where: {
                user_id: user_id
            }
        });

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                subscriptions: true,
            }
        });

        if (myHaircut >= 1 && user?.subscriptions?.status !== "premium"){
            throw new Error("Not Athorized");
        }

        const haircut = await prismaClient.haircut.create({
            data: {
                user_id: user_id,
                name: name,
                price: price
            }
        });

        return haircut;

    }
}

export { CreateHaircutService };