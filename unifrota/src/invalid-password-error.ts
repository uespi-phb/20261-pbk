import { DomainError } from './domain-error'

export class InvalidPasswordError extends DomainError {
  constructor(message = 'Invalid password') {
    super(message, 'INVALID_PASSWORD')
  }
}
