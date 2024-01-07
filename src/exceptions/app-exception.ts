/* eslint-disable prettier/prettier */
export class AppException extends Error {
  errorCode: number | undefined;
  constructor(message: string, errorCode: number) {
    super(message);

    this.errorCode = errorCode;
  }
}
