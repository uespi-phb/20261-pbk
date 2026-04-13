/* eslint-disable vitest/no-conditional-expect */
import { describe, expect, test } from 'vitest'

class Password {
  constructor(public readonly value: string) {}
}

class InvalidPasswordError extends Error {
  constructor(message = 'Invalid password') {
    super(message)
  }
}

//TODO: update PRD to password rules
describe('Password', () => {
  test('Should create a valid Password obejct', () => {
    // Arrange
    const validPassword = 'V4l1dP4ssw0rd'
    // Act
    const password = new Password(validPassword)
    // Arrange
    expect(password.value).toBe(validPassword)
  })

  test.each(['invalid password'])(
    'Should throws InvalidPasswordError if password is invalid: "%s"',
    (invalidPassword: unknown) => {
      try {
        // Act
        new Password(invalidPassword as string)
        expect.fail('Password not throws an InvalidPasswordException')
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidPasswordError)
      }
    },
  )
})
