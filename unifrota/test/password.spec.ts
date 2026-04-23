import { describe, expect, test } from 'vitest'

import { InvalidPasswordError } from '#src/invalid-password-error'
import { Password } from '#src/password'

// TODO: update PRD for password rules
describe('Password', () => {
  const validPassword = 'V4l1dP4ssw0rd'

  test('Should create a valid Password object storing original password', () => {
    // Act
    const password = new Password(validPassword)
    // Arrange
    expect(password.value).toBe(validPassword)
  })

  test('Should throw InvalidPasswordError when password is too short', () => {
    // Arrange
    const shortPassword = validPassword.slice(0, Password.minLength - 1)
    // Act / Arrange
    expect(() => new Password(shortPassword)).toThrow(InvalidPasswordError)
  })

  test.each(['password_without_upper_letter', 'PASSWORD_WITHOUT_LOWER_LETTER', 'Password_without_digit', '12345678'])(
    'Should throw when password does not satisfy complexity rules: "%s"',
    (password: string) => {
      // Act / Arrange
      expect(() => new Password(password)).toThrow(InvalidPasswordError)
    },
  )

  test.each(['', '        ', '&-*%$#@~'])(
    'Should throw InvalidPasswordError when password is invalid: "%s"',
    (invalidPassword: string) => {
      // Act / Arrange
      expect(() => new Password(invalidPassword)).toThrow(InvalidPasswordError)
    },
  )

  test('Should compare equal passwords by value', () => {
    // Arrange
    const validPassword1 = validPassword
    const validPassword2 = validPassword
    // Act
    const password1 = new Password(validPassword1)
    const password2 = new Password(validPassword2)
    // Assert
    expect(password1.isEqual(password2)).toBe(true)
  })
})
