import { InvalidEmailError } from './invalid-email-error'

export class Email {
  constructor(public readonly value: string) {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value !== null && value !== undefined) {
      this.value = value.trim()
    } else {
      throw new InvalidEmailError()
    }
    if (!emailRegex.test(this.value)) {
      throw new InvalidEmailError()
    }
  }

  isEqual(email: Email): boolean {
    return this.value === email.value
  }
}
