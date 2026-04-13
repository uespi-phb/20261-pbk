/* eslint-disable vitest/no-conditional-expect */
import { describe, test, expect } from 'vitest'

import { Email } from '../src/email'
import { InvalidEmailError } from '../src/invalid-email-error'

describe('Email', () => {
  test('Should create an valid Email object', () => {
    // Arrange
    const validEmail = 'valid.email@email.com'
    // Act
    const email = new Email(validEmail)
    // Assert
    expect(email.value).toBe(validEmail)
  })

  test.each(['invalid email', 'user@domain', '@', '  ', ''])(
    'Should throws InvalidEmailError if email is invalid: "%s"',
    (email: unknown) => {
      try {
        // Act
        new Email(email as string)
      } catch (error) {
        // Arrange
        expect(error).toBeInstanceOf(InvalidEmailError)
      }
    },
  )
})
