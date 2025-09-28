import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  readonly statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const formattedErrors = this.errors.map((error: ValidationError) => {
      if (error.type === 'field') {
        return {
          message: error.msg,
          field: error.path,
        };
      }

      return {
        message: error.msg,
      };
    });

    return formattedErrors;
  }
}
