import { InvalidPasswordError } from './invalid-password-error'

export class Password {
  public static readonly minLength = 4

  constructor(public readonly value: string) {
    if (value.length < Password.minLength) {
      throw new InvalidPasswordError('passwords should have at least 8 characteres long')
    }
    const upperRegEx = /^(?=.*[A-Z]).+$/
    if (!upperRegEx.test(value)) {
      throw new InvalidPasswordError('passwords should have at least 1 upper letter')
    }
    const lowerRegEx = /^(?=.*[a-z]).+$/
    if (!lowerRegEx.test(value)) {
      throw new InvalidPasswordError('passwords should have at least 1 lower letter')
    }
    const digitRegEx = /^(?=.*[0-9]).+$/
    if (!digitRegEx.test(value)) {
      throw new InvalidPasswordError('passwords should have at least 1 numeric digit')
    }
  }

  isEqual(password: Password): boolean {
    return this.value === password.value
  }
}
