import { InvalidEmailError } from './invalid-email-error'

export class Email {
  constructor(public readonly value: string) {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      throw new InvalidEmailError()
    }
  }
}
