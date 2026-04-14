import { DomainError } from './domain-error'

export class InvalidEmailError extends DomainError {
  constructor(message = 'Invalid e-mail') {
    super(message, 'INVALID_EMAIL')
  }
}
