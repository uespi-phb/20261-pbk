import type { Request } from '#src/controller'
import type { SignInPayload } from '#src/signin-controller'
import { SignInControler } from '#src/signin-controller'

describe('SignInController', () => {
  let body: SignInPayload
  let request: Request<SignInPayload>
  let sut: SignInControler

  beforeAll(() => {
    body = { email: 'john.doe@email.com', password: 'any_passowrd' }
    request = { body: body }
    sut = new SignInControler()
  })

  test('Should call validate method and validates input payload', async () => {
    const validateSpy = vi.spyOn(sut, 'validate')

    await sut.handle(request)

    expect(body.email).toBeTypeOf('string')
    expect(body.password).toBeTypeOf('string')
    expect(validateSpy).toHaveBeenCalledWith(body)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})
