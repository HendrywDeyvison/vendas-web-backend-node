import { PrismaClient } from "@prisma/client";
import { UserModel } from "./user.model";
import { UserInsertDTO } from "./dtos/user-insert.dto";
import { NotFoundException } from "@exceptions/not-found-exception";

const prisma = new PrismaClient();

export const getUsers = async (): Promise<UserModel[]> => {
  const users = await prisma.user.findMany();

  if (!users?.length) {
    throw new NotFoundException("User");
  }

  return users;
};

export const getUser = async (
  id?: number,
  name?: string,
  cpf_cnpj?: string,
): Promise<UserInsertDTO> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
      name: name,
      cpf_cnpj: cpf_cnpj,
    },
  });
  if (!user) {
    throw new NotFoundException("User");
  }

  return user;
};

export const createUser = async (body: UserInsertDTO): Promise<UserModel> => {
  return prisma.user.create({
    data: body,
  });
};
