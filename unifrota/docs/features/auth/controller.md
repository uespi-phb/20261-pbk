# Controllers

Controllers são componentes da camada de interface responsáveis por adaptar uma
requisição externa para uma operação da aplicação. Em uma API HTTP, eles recebem
dados do protocolo, validam a fronteira de entrada, chamam um caso de uso ou
serviço de aplicação e traduzem o resultado para uma resposta HTTP.

O controller não deve ser tratado como o centro da regra de negócio. Seu papel é
fazer a ponte entre o mundo externo e a aplicação.

## Papel na arquitetura

Em uma organização inspirada por Clean Architecture, controllers ficam próximos
da borda do sistema. Eles conhecem detalhes do protocolo de entrada, como corpo
da requisição, parâmetros, cabeçalhos e status HTTP, mas devem evitar conhecer
detalhes de persistência, criptografia, bibliotecas externas ou regras de
domínio.

Um fluxo comum é:

```text
Framework HTTP -> Route Adapter -> Controller -> Use Case -> Domain/Ports
```

Esse fluxo é apenas uma referência. Projetos diferentes podem nomear esses
componentes de formas distintas. O ponto importante é preservar a direção da
dependência: a interface adapta a entrada para a aplicação, e não o contrário.

## Responsabilidades

Um controller normalmente deve:

- receber uma requisição no formato esperado pela interface
- validar aspectos básicos da fronteira, como presença e tipo dos dados
- converter dados externos para o input esperado pela aplicação
- chamar uma abstração da aplicação, como um caso de uso
- traduzir sucesso, falhas esperadas e falhas inesperadas para uma resposta da
  interface

Um controller normalmente não deve:

- executar regra de negócio complexa
- acessar banco de dados diretamente
- chamar bibliotecas externas de infraestrutura diretamente
- tomar decisões que pertencem ao domínio
- duplicar validações semânticas que pertencem a entidades, value objects ou
  casos de uso

Essa separação mantém o controller pequeno, testável e substituível. Se o
protocolo HTTP for trocado por outro mecanismo de entrada, a lógica central da
aplicação deve continuar reaproveitável.

## Validação de fronteira e validação semântica

Uma distinção importante é separar validação de fronteira de validação semântica.

Validação de fronteira verifica se a requisição possui a forma mínima necessária
para ser adaptada. Exemplos:

- o corpo da requisição existe
- um campo obrigatório está presente
- um campo recebido como texto realmente é uma string
- um parâmetro de rota foi informado

Validação semântica verifica se o valor faz sentido para a aplicação ou para o
domínio. Exemplos:

- um e-mail possui formato válido
- uma senha atende às regras de complexidade do domínio
- uma data inicial não pode ser posterior à data final
- um usuário possui permissão para executar uma operação

A primeira categoria costuma ficar no controller ou em validadores de interface.
A segunda deve ficar no caso de uso, no domínio ou em componentes próprios da
aplicação. Essa divisão evita que regras de negócio fiquem presas ao protocolo
HTTP.

## DTOs de entrada

Dados vindos de uma requisição externa não devem ser tratados automaticamente
como dados confiáveis da aplicação. Por isso, pode ser útil separar o tipo da
requisição HTTP do tipo de entrada do caso de uso.

Exemplo genérico:

```ts
type HttpRequestBody = {
  name?: unknown
  email?: unknown
}

type CreateAccountInput = {
  name: string
  email: string
}
```

Nesse exemplo, `HttpRequestBody` representa dados ainda não validados. Depois da
validação de fronteira, o controller pode montar um `CreateAccountInput`, que já
representa dados aceitos pela aplicação.

Essa separação deixa claro que o formato recebido pela rede não precisa ser igual
ao contrato interno do caso de uso.

## Dependências

Controllers devem depender de abstrações estáveis da aplicação, não de detalhes
concretos de infraestrutura.

Exemplo genérico:

```ts
type UseCase<Input, Output> = {
  execute(input: Input): Promise<Output>
}
```

Um controller pode receber uma dependência compatível com esse contrato e chamar
`execute()`. A implementação concreta pode usar banco de dados, criptografia,
mensageria ou serviços externos, mas esses detalhes não precisam aparecer no
controller.

Essa escolha reduz acoplamento. Também torna os testes mais simples, porque o
controller pode ser testado com uma dependência substituta que simula apenas o
comportamento necessário.

## Respostas HTTP

Controllers traduzem resultados da aplicação para respostas da interface. Em
HTTP, isso normalmente envolve status code e corpo da resposta.

Exemplos comuns:

- `200` ou `201` para sucesso
- `400` para requisição malformada
- `401` para autenticação inválida ou ausente
- `403` para operação não autorizada
- `404` para recurso inexistente
- `409` para conflito de estado
- `500` para falha inesperada

O formato do corpo de erro deve ser consistente dentro do projeto. Uma estrutura
simples pode conter uma mensagem e um código:

```ts
type ErrorResponseBody = {
  code: string
  message: string
}
```

Falhas inesperadas não devem expor detalhes internos da aplicação, como stack
trace, mensagens técnicas de bibliotecas ou informações sensíveis. Esses detalhes
pertencem a logs e mecanismos de observabilidade, não necessariamente à resposta
pública.

## Tratamento de erros

O controller pode traduzir erros esperados da aplicação para respostas
específicas. Por exemplo, uma falha de autenticação pode virar `401`, enquanto
uma entrada malformada pode virar `400`.

Essa tradução não significa que o domínio existe para atender ao HTTP. O domínio
deve sinalizar falhas porque suas regras foram violadas. O controller apenas
adapta essa falha para o protocolo usado na entrada.

Ao lidar com erros, mantenha a diferença entre:

- erros esperados, que fazem parte do fluxo conhecido da aplicação
- erros inesperados, que indicam falhas não previstas ou problemas internos

Essa distinção ajuda a definir respostas mais previsíveis sem espalhar detalhes
internos pela interface.

## Testes de controller

Testes de controller devem focar o comportamento observável da adaptação.

Bons testes costumam verificar:

- se a dependência da aplicação foi chamada com o input correto
- se campos extras da requisição externa não vazam para o caso de uso
- se entradas inválidas na fronteira geram respostas adequadas
- se o caso de uso não é chamado quando a requisição é inválida
- se sucessos e erros esperados são traduzidos corretamente
- se falhas inesperadas são tratadas como erro interno

Evite testar detalhes internos do controller, como métodos auxiliares privados ou
uma função de validação específica. O teste deve proteger o contrato externo:
entrada, chamada ao caso de uso e resposta.

Para dados simples, objetos literais geralmente são suficientes:

```ts
const request = {
  body: {
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
  },
}
```

Mocks ou stubs são mais úteis para dependências com comportamento, como um caso
de uso que pode retornar sucesso ou lançar uma falha esperada.

## Exemplo ilustrativo

Em um fluxo de autenticação, um controller poderia receber `email` e `password`,
validar que ambos existem e são strings, chamar um caso de uso de sign in e
traduzir o resultado para HTTP.

Esse exemplo não define onde a validação semântica de e-mail ou senha deve ficar.
Essa decisão depende do desenho do caso de uso, dos objetos de domínio e dos
contratos adotados pelo projeto. O ponto geral é que o controller deve adaptar a
requisição, não concentrar a regra de autenticação.
