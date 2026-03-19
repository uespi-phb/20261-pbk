export function validateCpf(cpf: string) {
  const cfpNumberOfDigits = 11
  const firstCheckDigitIndex = 9
  const secondCheckDigitIndex = 10

  cpf = removeNonDigits(cpf)

  if (cpf.length != cfpNumberOfDigits) return false
  if (allDigitsTheSame(cpf)) return false

  const firstCheckDigit = calculateCheckDigit(cpf, firstCheckDigitIndex)
  if (firstCheckDigit !== cpf[firstCheckDigitIndex]) return false

  const secondCheckDigit = calculateCheckDigit(cpf, secondCheckDigitIndex)
  if (secondCheckDigit !== cpf[secondCheckDigitIndex]) return false

  return true
}

const removeNonDigits = (cpf: string): string => {
  if (cpf === null || cpf === undefined) return ''
  return cpf.replace(/\D/g, '')
}

const allDigitsTheSame = (cpf: string): boolean => cpf.split('').every((cpfDigit) => cpfDigit === cpf[0])

const calculateCheckDigit = (cpf: string, checkDigitIndex: number): string => {
  let digitFactor = checkDigitIndex + 1
  let sum = 0

  for (const digit of cpf.substring(0, checkDigitIndex)) {
    sum += parseInt(digit) * digitFactor
    digitFactor--
  }
  const remainder = sum % 11
  const checkDigit = remainder >= 2 ? 11 - remainder : 0

  return checkDigit.toString()
}
