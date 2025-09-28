import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  readonly reason = 'Error connecting to database';
  readonly statusCode = 500;

  constructor(public message: string) {
    super('Error connecting to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
