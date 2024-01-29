import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error in connecting to database';

  constructor() {
    super('Error in connecting to db');
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
