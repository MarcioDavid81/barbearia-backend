import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string;
    name: string;
    adress: string;
    banner?: string;
}

class UpdateUserService {
  async execute({ user_id, name, adress, banner }: UserRequest) {
    
    try{

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (!userAlreadyExists) {
            throw new Error("Usuário não existe");
        }

        const userUpdated = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                name,
                adress,
                banner
            },
            select: {
                name: true,
                adress: true,
                banner: true
            }
        });

        return userUpdated;

    } catch (err) {
      throw new Error("Erro ao atualizar usuário");
    }

  }
}

export { UpdateUserService };