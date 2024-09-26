import prismaClient from "../../prisma";

interface DeleteRequest {
    haircut_id: string;
}

class DeleteHaircutService {
  async execute({ haircut_id }: DeleteRequest) {

    if (haircut_id === '') {
      throw new Error("Haircut id is required");
    }

    try{

        await prismaClient.haircut.delete({
            where: {
                id: haircut_id
            }
        });

        return { message: "Haircut deleted successfully" };

    }catch (err){
      throw new Error(err);
    }
  }
}

export { DeleteHaircutService };