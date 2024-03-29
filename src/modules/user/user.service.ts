import { PrismaClient } from "@prisma/client";
import { UserModel } from "./user.model";
import { UserInsertDTO } from "./dtos/user-insert.dto";
import { NotFoundException } from "@exceptions/not-found-exception";
import { BadRequestException } from "@exceptions/bad-request-exception";
import { createPasswordHashed } from "@utils/password";
import { UserEditPasswordDTO } from "./dtos/user-edit-password.dto";

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
  email?: string,
): Promise<UserInsertDTO> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
      name,
      cpf_cnpj,
      email,
    },
  });
  if (!user) {
    throw new NotFoundException("User");
  }

  return user;
};

export const getUserByEmail = async (email?: string): Promise<UserModel> => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email,
    },
  });
  if (!user) {
    throw new NotFoundException("User");
  }

  return user;
};

export const createUser = async (body: UserInsertDTO): Promise<UserModel> => {
  const userCpfCnpj = await getUser(undefined, undefined, body.cpf_cnpj).catch(() => undefined);
  // eslint-disable-next-line prettier/prettier
  const userEmail = await getUser(undefined, undefined, undefined, body.email).catch(
    () => undefined,
  );

  if (userCpfCnpj || userEmail) {
    throw new BadRequestException("User already exists in BD");
  }

  const user: UserInsertDTO = {
    ...body,
    password: await createPasswordHashed(body.password),
  };

  return prisma.user.create({
    data: user,
  });
};

export const editPassword = async (
  userId: number,
  UserEditPasswordDto: UserEditPasswordDTO,
): Promise<UserModel> => {
  const user = await getUser(userId);

  const newUser = {
    ...user,
    password: await createPasswordHashed(UserEditPasswordDto.password),
  };

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: newUser,
  });
};
