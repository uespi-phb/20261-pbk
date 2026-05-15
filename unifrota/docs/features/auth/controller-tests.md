# SignInController - Roteiro de Testes

## 1. `SignInController`

Esta classe pertence à camada de interface e adapta a requisição HTTP de autenticação
para o contrato do caso de uso de sign in. O controller deve validar apenas a
fronteira HTTP, mapear a entrada para `SignInInput`, invocar o caso de uso e
traduzir o resultado em `SignInOutput` para uma resposta HTTP.

O controller não deve autenticar diretamente, consultar banco de dados, comparar
senha, gerar token ou conhecer adapters concretos. Essas responsabilidades
pertencem ao caso de uso, ao domínio ou à infraestrutura.

Em termos didáticos, este roteiro separa duas responsabilidades de validação:

- validação de fronteira HTTP: presença do corpo, presença dos campos e tipos
  recebidos pela rede
- validação semântica: regras de domínio associadas a `Email`, `Password` ou ao
  próprio caso de uso

Nos testes, use `vitest-mock-extended` para criar mocks tipados das dependências
que possuem comportamento, especialmente o caso de uso:

```ts
mock<UseCase<SignInInput, SignInOutput>>()
```

Para dados simples, prefira objetos literais. Eles tornam a entrada do teste mais
explícita e evitam mocks desnecessários:

```ts
const request = {
  body: {
    email: 'john.doe@email.com',
    password: 'any_password',
  },
}
```

## 2. Contrato HTTP testado

O controller deve receber um DTO HTTP próprio, com campos de tipo `unknown`,
porque dados vindos da rede ainda não são confiáveis antes da validação de
fronteira.

Exemplo de contrato:

```ts
export type SignInHttpRequestBody = {
  email?: unknown
  password?: unknown
}
```

Depois de validar presença e tipo, o controller deve montar explicitamente o
input do caso de uso:

```ts
const input: SignInInput = {
  email: request.body.email,
  password: request.body.password,
}
```

Essa separação evita que `SignInInput` represente diretamente dados HTTP brutos.
`SignInInput` deve representar uma entrada já adaptada para a aplicação.

## 3. Corpo de erro recomendado

As respostas de erro devem usar um formato previsível. Este roteiro recomenda:

```ts
export type HttpErrorResponseBody = {
  message: string
  code: string
}
```

Exemplos:

```ts
{
  statusCode: 400,
  body: {
    code: 'BAD_REQUEST',
    message: 'Invalid request body',
  },
}
```

```ts
{
  statusCode: 401,
  body: {
    code: 'INVALID_CREDENTIALS',
    message: 'Invalid credentials',
  },
}
```

```ts
{
  statusCode: 500,
  body: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  },
}
```

Falhas inesperadas não devem expor detalhes internos, stack trace ou mensagens
técnicas na resposta HTTP.

## 4. Casos de teste

### 4.1. **`should call sign in use case with email and password from request body`**

Deve verificar que o controller extrai `email` e `password` do corpo da
requisição e chama `signIn.execute()` com a entrada correspondente.

Este teste não deve espionar métodos internos como `validate()`. O comportamento
relevante é a interação do controller com o contrato do caso de uso.

### 4.2. **`should call sign in use case only with accepted sign in input fields`**

Deve garantir que o controller não repassa o payload HTTP bruto ao caso de uso
quando o corpo contém campos extras.

Exemplo: se o body contém `email`, `password` e `role`, o caso de uso deve receber
somente:

```ts
{
  email: 'john.doe@email.com',
  password: 'any_password',
}
```

### 4.3. **`should return 200 and access token when credentials are valid`**

Deve garantir que, quando o caso de uso retorna sucesso, o controller responda
com status `200` e corpo contendo o token de acesso.

### 4.4. **`should return 400 when request body is missing`**

Deve garantir que o controller rejeita a requisição quando o corpo HTTP não é
fornecido.

### 4.5. **`should return 400 when request body is null`**

Deve garantir que o controller rejeita a requisição quando o corpo HTTP chega
como `null` em runtime.

### 4.6. **`should return 400 when email is missing`**

Deve verificar que o controller responde com erro de requisição inválida quando
`email` não está presente no corpo.

### 4.7. **`should return 400 when password is missing`**

Deve verificar que o controller responde com erro de requisição inválida quando
`password` não está presente no corpo.

### 4.8. **`should return 400 when email is not a string`**

Deve garantir que a validação de fronteira rejeita entradas em que `email` chega
com tipo incompatível com o contrato HTTP esperado.

### 4.9. **`should return 400 when password is not a string`**

Deve garantir que a validação de fronteira rejeita entradas em que `password`
chega com tipo incompatível com o contrato HTTP esperado.

### 4.10. **`should not call sign in use case when request is invalid`**

Deve verificar que, diante de falhas de validação na borda HTTP, o controller não
invoca o caso de uso.

Este teste pode usar uma tabela com os cenários inválidos de fronteira:

- body ausente
- body `null`
- `email` ausente
- `password` ausente
- `email` com tipo diferente de `string`
- `password` com tipo diferente de `string`

### 4.11. **`should return 401 when sign in use case throws InvalidCredentialsError`**

Deve garantir que, quando o caso de uso sinaliza credenciais inválidas, o
controller traduz esse erro esperado para resposta HTTP `401`.

### 4.12. **`should return 400 when sign in use case throws InvalidEmailError`**

Deve garantir que, quando o caso de uso ou os objetos de domínio rejeitam um
e-mail malformado com `InvalidEmailError`, o controller traduz esse erro esperado
para resposta HTTP `400`.

O controller não deve instanciar `Email` apenas para satisfazer este teste. Ele
deve apenas traduzir o erro de domínio quando ele vier do caso de uso.

Este teste só deve ser implementado quando o fluxo de sign in realmente puder
propagar `InvalidEmailError`. Caso contrário, ele deve permanecer como cenário
futuro do roteiro, e não como exigência artificial para o use case.

### 4.13. **`should return 400 when sign in use case throws InvalidPasswordError`**

Deve garantir que, quando o caso de uso ou os objetos de domínio rejeitam
uma senha malformada com `InvalidPasswordError`, o controller traduz esse erro
esperado para resposta HTTP `400`.

O controller não deve instanciar `Password` apenas para satisfazer este teste. Ele
deve apenas traduzir o erro de domínio quando ele vier do caso de uso.

Este teste só deve ser implementado quando o fluxo de sign in realmente puder
propagar `InvalidPasswordError`. Caso contrário, ele deve permanecer como cenário
futuro do roteiro, e não como exigência artificial para o use case.

### 4.14. **`should return 500 when sign in use case throws unexpected error`**

Deve garantir que falhas inesperadas lançadas pelo caso de uso sejam traduzidas
para `500`, preservando o isolamento entre a interface HTTP e detalhes internos
do erro.

## Critério Arquitetural

`SignInController` deve receber sua dependência de sign in por meio do contrato
`UseCase<SignInInput, SignInOutput>`.

O controller não deve importar, instanciar ou depender diretamente da classe
concreta `SignInUseCase`. Essa regra deve ser reforçada pelo design do construtor,
pelos tipos usados nos testes e pela revisão de código, em vez de virar um teste
unitário frágil baseado em inspeção textual do arquivo fonte.

Nos testes do controller, prefira:

```ts
mock<UseCase<SignInInput, SignInOutput>>()
```

em vez de:

```ts
mock<SignInUseCase>()
```

## Nota Arquitetural

Se `SignInUseCase` construir ou validar `Email` e `Password`, então é aceitável
que `InvalidEmailError` e `InvalidPasswordError` sejam propagados para o
controller. Nesse caso, eles representam falhas semânticas de entrada, e o
controller apenas traduz essas falhas para HTTP.

Essa decisão é diferente de usar o domínio para satisfazer uma necessidade do
HTTP. O domínio deve lançar esses erros porque suas invariantes foram violadas; o
controller deve apenas adaptar o resultado ao protocolo.

Para autenticação, mantenha a distinção entre entrada malformada e credenciais
incorretas:

- e-mail sem formato válido ou senha fora das regras de domínio: `400`
- e-mail válido com senha incorreta, ou usuário inexistente: `401`
