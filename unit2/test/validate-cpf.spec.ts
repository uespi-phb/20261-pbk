import { validateCpf } from '@src/validate-cpf'

describe('validateCpf', () => {
  const validCpfs = ['177.594.490-54', '515070430-07', '78437331080']
  const invalidCpfs = ['12345678900', '1234567890', '51507043017', '123456789000', 'abc.def.ghi-jh']
  const sameDigitsCpfs = ['00000000000', '55555555555', '99999999999']
  const nullOrEmptyCpfs = [null, undefined, '', ' ', '   ']

  test.each(validCpfs)('Should validate a valid CPF: "%s"', (validCpf: string) => {
    // Arrange
    // Act
    const r = validateCpf(validCpf)
    // Assert
    expect(r).toBe(true)
  })
  test.each(nullOrEmptyCpfs)('Should not validate a null or empty CPF: "%s"', (nullOrEmptyCpf: unknown) => {
    // Arrange
    // Act
    const r = validateCpf(nullOrEmptyCpf as string)
    // Assert
    expect(r).toBe(false)
  })

  test.each(invalidCpfs)('Should not validate an invalid CPF: "%s"', (invalidCpf: string) => {
    // Arrange
    // Act
    const r = validateCpf(invalidCpf)
    // Assert
    expect(r).toBe(false)
  })

  test.each(sameDigitsCpfs)('Should not validate an CPF where all digits are the same: "%s"', (invalidCpf: string) => {
    // Arrange
    // Act
    const r = validateCpf(invalidCpf)
    // Assert
    expect(r).toBe(false)
  })
})
