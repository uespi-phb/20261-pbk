import type { SignInInput, SignInOutput, SignInUseCaseInterface } from '#src/features/auth/app/usecases/signin-usecase'
import type { Controller, Request, Response } from '#src/shared/contracts/controller'

export type ResquestBody = Partial<SignInInput>
export type ResponseBody = Partial<SignInOutput>

export class SignInController implements Controller<ResquestBody, ResponseBody> {
  constructor(private readonly signInUseCase: SignInUseCaseInterface) {}

  async handle(request: Request<ResquestBody>): Promise<Response<ResponseBody>> {
    if (!request.body) return { statusCode: 400 }
    if (request.body.email === undefined || request.body.password === undefined) return { statusCode: 400 }
    if (typeof request.body.email !== 'string') return { statusCode: 400 }
    if (typeof request.body.password !== 'string') return { statusCode: 400 }

    const input: SignInInput = {
      email: request.body.email,
      password: request.body.password ?? '',
    }
    await this.signInUseCase.execute(input)
    return { statusCode: 200 }
  }
}
