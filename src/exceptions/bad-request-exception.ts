/* eslint-disable prettier/prettier */
import { AppException } from "./app-exception";

export class BadRequestException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
