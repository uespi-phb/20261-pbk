## SignInUseCase

1. **Deve carregar o usuário a partir do email recebido no `SignInput`**
   O teste deve executar o `SignInUseCase` com um input válido e verificar que `LoadUserByEmail` foi chamado uma única vez com o email presente no input.

2. **Deve retornar falha de autenticação quando o usuário não for encontrado**
   O teste deve configurar `LoadUserByEmail` para não encontrar usuário e validar que o resultado do use case seja uma saída de falha, conforme o contrato do seu `SignOutput`.

3. **Não deve comparar senha quando o usuário não for encontrado**
   O teste deve garantir que, se `LoadUserByEmail` não retornar usuário, `PasswordComparer` não seja chamado.

4. **Deve comparar a senha informada com a senha do usuário carregado**
   O teste deve configurar `LoadUserByEmail` para retornar um usuário com a credencial persistida e verificar que `PasswordComparer` foi chamado com a senha vinda do input e a senha armazenada do usuário.

5. **Deve retornar falha de autenticação quando a senha for inválida**
   O teste deve fazer `PasswordComparer` retornar falso e validar que o `SignInUseCase` devolve uma saída de falha.

6. **Não deve gerar token quando a senha for inválida**
   O teste deve garantir que, se `PasswordComparer` retornar falso, `AccessTokenGenerator` não seja chamado.

7. **Deve gerar o token de acesso para um usuário autenticado com sucesso**
   O teste deve simular usuário encontrado e senha válida, e então verificar que `AccessTokenGenerator` foi chamado com os dados esperados do usuário autenticado, de acordo com o contrato adotado.

8. **Deve retornar o `SignInOutput` de sucesso com o token gerado**
   O teste deve configurar `AccessTokenGenerator` para retornar um token e validar que o resultado final do use case contém esse token no formato esperado de `SignInOutput`.
