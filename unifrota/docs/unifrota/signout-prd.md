# PRD - Sign Out

## 1. Identificação

### 1.1 Nome do caso de uso

Sign out

### 1.2 Módulo

Autenticação de usuários

### 1.3 Contexto

O UniFrota exige autenticação e autorização conforme perfil do usuário, dentro de uma API REST com organização consistente de recursos e separação de responsabilidades.

## 2. Visão geral

O caso de uso **sign out** permite que o usuário encerre explicitamente o uso do contexto autenticado atual.

No modelo adotado para o sistema, a autenticação é **stateless**. O fluxo de `sign in` valida credenciais e gera um token de acesso, mas **não cria sessão no servidor** e **não persiste o token emitido**.

Por essa razão, o `sign out` não tem como finalidade invalidar uma sessão persistida nem revogar server-side um token previamente emitido. Seu papel é encerrar, de forma explícita e previsível, o contexto de uso autenticado do ponto de vista funcional da aplicação, produzindo uma resposta adequada para que o cliente descarte o token e deixe de utilizá-lo.

## 3. Problema que o caso de uso pretende resolver

Mesmo em autenticação stateless, o usuário precisa de uma operação explícita de saída para:

- sinalizar que deseja encerrar o uso autenticado atual
- permitir que o cliente remova o token localmente
- manter previsibilidade e consistência da API em fluxos de autenticação
- reduzir risco de uso indevido do token por permanência desnecessária no cliente

Sem esse caso de uso, o encerramento do acesso ficaria implícito, difuso ou delegado apenas ao comportamento do cliente, enfraquecendo a clareza funcional do módulo de autenticação.

## 4. Objetivo

Permitir que o usuário autenticado solicite o encerramento explícito do uso autenticado atual, fazendo com que o cliente descarte o token e cesse seu uso a partir daquele momento.

## 5. Escopo

### 5.1 Incluído

- recebimento da solicitação explícita de saída
- validação do contexto de autenticação exigido para a operação
- resposta de sucesso compatível com o encerramento lógico do uso autenticado
- suporte funcional para que o cliente descarte o token de acesso
- registro observável do evento, quando aplicável, sem exposição de dados sensíveis

### 5.2 Fora do escopo

- criação de sessão
- destruição de sessão server-side
- blacklist de token
- revogação persistida de token
- logout global em múltiplos dispositivos
- gerenciamento de dispositivos conectados
- rotação de credenciais
- refresh token, caso venha a existir futuramente como mecanismo separado

## 6. Atores envolvidos

### 6.1 Usuário autenticado

É o ator principal. Solicita explicitamente a saída do sistema.

### 6.2 Cliente da API

É o responsável por remover o token armazenado localmente e interromper seu envio em requisições subsequentes.

### 6.3 Sistema

É responsável por receber a solicitação, tratá-la de forma consistente e responder adequadamente, sem assumir mecanismos inexistentes de sessão ou revogação persistida.

## 7. Premissas e restrições

1. O sistema utiliza autenticação baseada em token.
2. O fluxo atual não cria sessão no servidor.
3. O token gerado no `sign in` não é persistido.
4. O `sign out` não pode depender de revogação server-side de token.
5. O caso de uso deve preservar separação entre aplicação, infraestrutura e interface.
6. O comportamento da API deve ser previsível e consistente com os demais fluxos.

## 8. Pré-condições

- o usuário deve apresentar contexto de autenticação válido para invocar o caso de uso, se essa for a política definida na interface da API
- o cliente deve estar apto a remover o token local após a resposta de sucesso

## 9. Pós-condições

### 9.1 Em caso de sucesso

- o sistema reconhece a solicitação de saída
- o cliente passa a ser responsável por descartar o token localmente
- o uso autenticado atual deve ser considerado encerrado do ponto de vista funcional do cliente

### 9.2 Observação importante

Como não existe sessão server-side nem persistência do token, o sistema **não garante invalidação retroativa** de um token já emitido apenas pela execução do `sign out`.

## 10. Fluxo principal

1. O usuário autenticado solicita sair do sistema.
2. O sistema recebe a solicitação de `sign out`.
3. O sistema valida a requisição conforme as regras de entrada e autenticação da interface.
4. O sistema confirma o encerramento lógico do contexto autenticado atual.
5. O sistema retorna resposta de sucesso.
6. O cliente remove o token armazenado localmente.
7. O cliente deixa de enviar o token em novas requisições.

## 11. Fluxos alternativos

### 11.1 Requisição sem autenticação válida

1. O cliente solicita `sign out` sem contexto autenticado válido.
2. O sistema responde conforme a política de autenticação da API.
3. Nenhum estado server-side precisa ser revertido ou encerrado, porque não existe sessão persistida.

### 11.2 Token malformado ou inválido

1. A requisição chega com credencial inválida, malformada ou inconsistente.
2. O sistema responde com erro apropriado de autenticação ou validação.
3. O cliente deve tratar a resposta e remover eventual token inválido localmente.

## 12. Regras de negócio

1. O `sign out` representa a intenção explícita de encerrar o uso autenticado atual.
2. O `sign out` não cria, altera ou remove papéis de acesso do usuário.
3. O `sign out` não altera dados cadastrais da conta do usuário.
4. O `sign out` não persiste qualquer marca de revogação, pois o modelo atual não prevê persistência de token.
5. O `sign out` não deve introduzir acoplamento artificial com banco de dados, sessão HTTP ou infraestrutura inexistente, em conformidade com a arquitetura adotada.
6. O caso de uso deve manter responsabilidade única: tratar a saída explícita do contexto autenticado, e não resolver preocupações mais amplas de gestão de sessão.
7. Logs e erros eventualmente produzidos não devem expor token, senha ou dados sensíveis.

## 13. Critérios de aceitação

### CA01 - Saída explícita bem-sucedida

Dado que o usuário envia uma solicitação válida de `sign out`,
quando o caso de uso é executado,
então o sistema deve responder com sucesso para indicar o encerramento lógico do uso autenticado atual.

### CA02 - Ausência de revogação persistida

Dado o modelo de autenticação stateless adotado,
quando o `sign out` é executado,
então o sistema não deve depender de sessão persistida nem de armazenamento de token revogado.

### CA03 - Responsabilidade do cliente

Dado que o `sign out` foi concluído com sucesso,
quando o cliente recebe a resposta,
então ele deve poder remover o token local e cessar seu envio em novas requisições.

### CA04 - Preservação arquitetural

Dado o desenho arquitetural do projeto,
quando o caso de uso `sign out` for especificado e implementado,
então ele não deve depender de detalhes de HTTP, banco de dados ou mecanismo artificial de sessão dentro da regra de aplicação.

### CA05 - Segurança de observabilidade

Dado que a operação de `sign out` possa gerar logs ou erros,
quando essas informações forem registradas,
então dados sensíveis não devem ser expostos.

## 14. Requisitos funcionais derivados

### RF-AUTH-LOGOUT-01

O sistema deve permitir ao usuário solicitar explicitamente a saída do contexto autenticado atual.

### RF-AUTH-LOGOUT-02

O sistema deve responder de forma previsível e consistente à solicitação de `sign out`, sem depender de sessão server-side.

### RF-AUTH-LOGOUT-03

O sistema não deve exigir persistência de token ou mecanismo de blacklist para executar o `sign out` no modelo atual.

## 15. Requisitos não funcionais locais

### RNF-LOGOUT-01 - Coerência arquitetural

O caso de uso deve respeitar separação entre domínio, aplicação, infraestrutura e interface.

### RNF-LOGOUT-02 - Testabilidade

O caso de uso deve admitir testes automatizados de sucesso e falha compatíveis com seu risco e importância.

### RNF-LOGOUT-03 - Segurança

A feature deve tratar autenticação e proteção de dados na sua fronteira, sem vazamento de informações sensíveis.

## 16. Observações de derivação para a especificação técnica

1. A especificação técnica deve evitar modelar `sessionId`, repositório de sessão ou persistência de token, porque isso contrariaria a decisão já tomada para o fluxo de autenticação.
2. O `SignOutUseCase` pode ser propositalmente simples, pois o projeto também recomenda evitar abstração prematura e indirection desnecessária.
3. O comportamento central do caso de uso é semântico e contratual: reconhecer a intenção de saída e permitir que o cliente finalize localmente o uso do token.
4. Caso o projeto evolua futuramente para refresh token, blacklist ou sessão persistida, este PRD deverá ser revisado, pois a natureza do `sign out` mudará materialmente.

## 17. Síntese conceitual

No estado atual da arquitetura, o `sign out` é um caso de uso válido, mas **enxuto**.

Ele não “derruba sessão”, porque não há sessão.
Ele não “revoga token persistido”, porque o token não é persistido.
Ele formaliza, em nível de produto e de API, a **saída explícita do contexto autenticado**, deixando ao cliente o descarte efetivo da credencial local.
