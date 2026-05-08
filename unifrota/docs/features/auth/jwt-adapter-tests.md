## Test Suite: `JwtAdapter`

### Contrato: `AccessTokenGenerator` — método `generate`

**1. `should generate a valid token string when given a valid payload`**
Verifica que o método `generate` retorna uma `Promise<string>` não vazia ao receber um payload válido.

**2. `should call the underlying JWT library sign function with the correct payload`**
Verifica que a biblioteca `JsonWebToken` é invocada com o payload exatamente como fornecido, sem mutações.

**3. `should call the underlying JWT library sign function with the configured secret`**
Verifica que o segredo (_secret_) utilizado na assinatura corresponde ao configurado no adaptador, não um valor hardcoded ou arbitrário.

**4. `should call the underlying JWT library sign function with the configured expiration options`**
Verifica que as opções de expiração (`expiresIn` ou equivalente) repassadas à biblioteca correspondem às configurações do adaptador.

**5. `should return different tokens for different payloads`**
Verifica que dois payloads distintos produzem tokens distintos, garantindo que o payload é efetivamente incorporado ao token.

**6. `should reject with an error if the JWT library throws during sign`**
Verifica que, em caso de falha interna da biblioteca (e.g., secret inválido), a Promise é rejeitada com um erro apropriado — sem silenciar a exceção.

---

### Contrato: `AccessTokenValidator` — método `validate`

**7. `should return true when given a valid and non-expired token`**
Verifica que `validate` retorna `true` para um token íntegro, assinado com o segredo correto e dentro do prazo de validade.

**8. `should return false when given a token signed with a different secret`**
Verifica que um token adulterado ou assinado com segredo divergente resulta em `false`, não em exceção propagada.

**9. `should return false when given an expired token`**
Verifica que um token tecnicamente bem formado, mas fora do prazo de validade, resulta em `false`.

**10. `should return false when given a malformed token string`**
Verifica que uma string que não representa um JWT válido (e.g., string aleatória, JWT truncado) resulta em `false`.

**11. `should return false when given an empty string`**
Verifica o comportamento de fronteira com entrada vazia, garantindo que nenhuma exceção é propagada.

**12. `should call the underlying JWT library verify function with the correct secret`**
Verifica que a verificação utiliza o mesmo segredo configurado no adaptador, assegurando consistência com a geração.

**13. `should reject with an error if the JWT library throws an unexpected error during verify`**
Distingue erros esperados de validação (retornar `false`) de erros inesperados e não tratados (e.g., falha de I/O), que devem rejeitar a Promise.

---

### Conformidade estrutural com as interfaces

**14. `should implement the AccessTokenGenerator interface`**
Verifica em tempo de teste que o adaptador expõe o método `generate` com a assinatura esperada pela interface.

**15. `should implement the AccessTokenValidator interface`**
Verifica que o adaptador expõe o método `validate` com a assinatura esperada pela interface.

---

### Observações arquiteturais relevantes

- Os testes de `JwtAdapter` devem fazer _mock_ da biblioteca `JsonWebToken`, pois testes de unidade na camada de infraestrutura não devem depender de implementações externas reais. A integração real com a biblioteca seria coberta por testes de integração separados.

- Os testes **14** e **15** têm valor especialmente em TypeScript estrito: garantem que o adaptador satisfaz os contratos em tempo de compilação, o que pode ser verificado via _type assertion_ ou simplesmente pela ausência de erros de compilação no teste.

- O diagrama indica que `SignOutUseCase` consome `AccessTokenValidator` e `SignInUseCase` consome `AccessTokenGenerator`. Os testes aqui propostos isolam o adaptador dessas dependências, respeitando o princípio da inversão de dependência (DIP) do SOLID.

