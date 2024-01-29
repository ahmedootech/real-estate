import { FieldValidationError, ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

type CombinedValidationError = FieldValidationError & ValidationError;
export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: CombinedValidationError[]) {
    super('Invalid request parameters');
  }
  serializeErrors() {
    return this.errors.map((err) => ({ message: err.msg, field: err.path }));
  }
}
