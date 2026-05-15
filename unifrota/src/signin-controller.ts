import type { Controller, Request, Response } from '#src/controller'
import type { SignInInput, SignInOutput, SignInUseCaseInterface } from '#src/signin-usecase'

export type ResquestBody = Partial<SignInInput>
export type ResponseBody = Partial<SignInOutput>

export class SignInController implements Controller<ResquestBody, ResponseBody> {
  constructor(private readonly signInUseCase: SignInUseCaseInterface) {}

  async handle(request: Request<ResquestBody>): Promise<Response<ResponseBody>> {
    if (!request.body) return { statusCode: 400 }

    const input = {
      email: request.body.email ?? '',
      password: request.body.password ?? '',
    }
    await this.signInUseCase.execute(input)
    return { statusCode: 200 }
  }
}
