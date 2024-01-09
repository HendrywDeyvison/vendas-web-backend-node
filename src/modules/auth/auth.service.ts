/* eslint-disable prettier/prettier */
import { getUserByEmail } from "@modules/user/user.service";
import { AuthDTO } from "./dtos/auth.dto";
import { UserModel } from "@modules/user/user.model";
import { validatePassword } from "@utils/password";
import { NotFoundException } from "@exceptions/not-found-exception";

export const validateAuth = async (authDto: AuthDTO): Promise<UserModel> => {
  const user = await getUserByEmail(authDto.email);

  const isPasswordValid = await validatePassword(authDto.password, user.password);

  if(!isPasswordValid){
    throw new NotFoundException("User");
  }

  return user;

};
