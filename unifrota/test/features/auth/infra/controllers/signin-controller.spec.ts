import { mock, type MockProxy } from 'vitest-mock-extended'

import type { SignInUseCaseInterface } from '#src/features/auth/app/usecases/signin-usecase'
import { SignInController, type ResquestBody } from '#src/features/auth/infra/controllers/signin-controller'
import { type Request } from '#src/shared/contracts/controller'

describe('SignInController', () => {
  let email: string
  let password: string
  let body: Record<string, unknown>
  let signInUseCase: MockProxy<SignInUseCaseInterface>
  let sut: SignInController

  beforeAll(() => {
    email = 'john.doe@email.com'
    password = 'any_plain_password'
    body = {
      email,
      password,
    }
    signInUseCase = mock<SignInUseCaseInterface>()
    sut = new SignInController(signInUseCase)
  })

  test('Should call sign in use case with email and password from request body', async () => {
    const request: Request<ResquestBody> = {
      body,
    }

    await sut.handle(request)

    expect(signInUseCase.execute).toHaveBeenCalledWith(body)
  })

  test('should call sign in use case only with accepted sign in input fields', async () => {
    const request = {
      body: {
        email: body['email'] as string,
        password: body['password'] as string,
        anyField: 'any_value',
      },
    }

    await sut.handle(request)

    expect(signInUseCase.execute).toHaveBeenCalledWith(body)
  })

  test('should return 200 and access token when credentials are valid', async () => {
    const request: Request<ResquestBody> = {
      body,
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(200)
  })

  test('should return 400 when request body is missing or null', async () => {
    let response = await sut.handle({})
    expect(response.statusCode).toBe(400)

    response = await sut.handle({ body: null } as unknown as Request<ResquestBody>)
    expect(response.statusCode).toBe(400)
  })

  test('should return 400 when email is missing', async () => {
    const response = await sut.handle({ body: { password } })
    expect(response.statusCode).toBe(400)
  })

  test('should return 400 when password is missing', async () => {
    const response = await sut.handle({ body: { email } })
    expect(response.statusCode).toBe(400)
  })

  test('should return 400 when email is not a string', async () => {
    const req = { body: { email: 0 as unknown as string, password } }
    const response = await sut.handle(req)
    expect(response.statusCode).toBe(400)
  })

  test('should return 400 when password is not a string', async () => {
    const req = { body: { email, password: true as unknown as string } }
    const response = await sut.handle(req)
    expect(response.statusCode).toBe(400)
  })
})
