import { CustomError } from './custom-error';

export class NotAuthenticatedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authenticated');
  }

  serializeErrors() {
    return [{ message: 'Not Authenticated' }];
  }
}
