/* eslint-disable prettier/prettier */
import { getUserByEmail } from "@modules/user/user.service";
import { AuthDTO } from "./dtos/auth.dto";
import { validatePassword } from "@utils/password";
import { NotFoundException } from "@exceptions/not-found-exception";
import { AuthModel } from "./auth.model";
import { generateToken } from "@utils/auth";

export const validateAuth = async (authDto: AuthDTO): Promise<AuthModel> => {
  const user = await getUserByEmail(authDto.email);

  const isPasswordValid = await validatePassword(authDto.password, user.password);

  if (!isPasswordValid) {
    throw new NotFoundException("User");
  }

  const token = generateToken(user);

  return new AuthModel(token, user);
};
