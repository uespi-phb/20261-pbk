# Roteiro de Testes para SignOut

## 1. `SignOutUseCase`

Esta é a classe central do fluxo de saída. Sua responsabilidade é receber a entrada do caso de uso, validar o token de acesso por meio da interface `AccessTokenValidator` e retornar a saída esperada.

### 1.1. **`should validate provided access token and return success`**

Deve verificar se o caso de uso chama `AccessTokenValidator` com o token recebido e, quando o token é válido, retorna a saída esperada de sign out.

### 1.2. **`should not validate invalid provided access token and returning failure`**

Não retornar sucesso se `AccessTokenValidator` retorna `false` (token inválido).

### 1.3. **`should throw when access token is missing or empty`**

Deve garantir que o caso de uso rejeita entradas sem token de acesso ou com token vazio, evitando prosseguir com uma solicitação inválida.

### 1.4. **`should throw when access token is invalid`**

Deve verificar se o caso de uso falha adequadamente quando `AccessTokenValidator` indica que o token informado não é válido.

### 1.4. **`should propagate error from AccessTokenValidator`**

Deve garantir que erros lançados pela dependência de validação do token sejam propagados corretamente, sem serem mascarados pelo caso de uso.

### 1.5. **`should not depend on JwtAdapter directly`**

Deve verificar, em termos arquiteturais, que `SignOutUseCase` depende apenas da abstração `AccessTokenValidator`, e não da implementação concreta `JwtAdapter`.

## 2. `JwtAdapter`

Esta classe concreta da infraestrutura adapta a biblioteca `JsonWebToken` ao contrato `AccessTokenValidator`. Seus testes devem verificar a tradução correta entre a interface da aplicação e a biblioteca externa.

### 2.1. **`should return true when token is valid`**

Deve garantir que o adapter retorna `true` quando a biblioteca valida corretamente o token.

### 2.2. **`should validate token using JsonWebToken and configured secret`**

Deve verificar se o adapter chama a biblioteca `JsonWebToken` usando o token recebido e a chave secreta configurada.

### 2.3. **`should return false when token is invalid`**

Deve verificar se o adapter retorna `false` quando o token é inválido, malformado, expirado ou assinado com chave incorreta.

### 2.4. **`should propagate unexpected JsonWebToken errors`**

Deve garantir que erros inesperados da biblioteca ou da configuração sejam propagados, quando não representarem simplesmente uma falha normal de validação do token.

### 2.5. **`should not expose token payload`**

Deve verificar que o adapter não retorna dados internos do payload quando sua responsabilidade contratual for apenas validar o token.

## 3. `JsonWebToken`

`JsonWebToken` aparece no diagrama como dependência externa. Assim, não deve receber testes unitários próprios no projeto.

### 3.1. **`should be exercised through JwtAdapter integration tests`**

Deve garantir que a biblioteca externa seja exercitada indiretamente por testes do `JwtAdapter`, especialmente em cenários com token válido, token expirado e token assinado com chave incorreta.
