// /* eslint-disable vitest/no-conditional-expect */
import { describe, test, expect } from 'vitest'

import { Email } from '#src/email'
import { InvalidEmailError } from '#src/invalid-email-error'

describe('Email', () => {
  test('Should create Email when e-mail address is valid', () => {
    // Arrange
    const validEmail = 'valid.email@email.com'
    // Act
    const email = new Email(validEmail)
    // Assert
    expect(email.value).toBe(validEmail)
  })

  test.each(['invalid email', 'user@domain', '@', '  ', '', undefined, null])(
    'Should throw InvalidEmailError if e-mail is invalid: "%s"',
    (email: unknown) => {
      // try {
      //   // Act
      //   new Email(email as string)
      // } catch (error) {
      //   // Arrange
      //   expect(error).toBeInstanceOf(InvalidEmailError)
      // }
      expect(() => new Email(email as string)).toThrow(InvalidEmailError)
    },
  )

  test('Should trim email string when when necessary', () => {
    // Arrange
    const validEmail = ' valid.email@email.com    '
    // Act
    const email = new Email(validEmail)
    // Assert
    expect(email.value).toBe(validEmail.trim())
  })

  test('Should compare equal emails by value', () => {
    // Arrange
    const validEmail1 = 'valid.email@email.com'
    const validEmail2 = 'valid.email@email.com'
    const email1 = new Email(validEmail1)
    const email2 = new Email(validEmail2)
    // Act
    const isEqual = email1.isEqual(email2)
    // Assert
    expect(isEqual).toBe(true)
  })
})
