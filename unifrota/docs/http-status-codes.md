# HTTP Status Codes

A IANA mantém o registro oficial dos códigos HTTP, e a RFC 9110 define que os códigos válidos vão de **100 a 599**, sendo que o **primeiro dígito** indica a classe da resposta. A tabela abaixo é uma versão **didática e prática**, com os códigos mais importantes para APIs REST; os **nomes oficiais** seguem o registro da IANA, enquanto a coluna **“quando usar”** traduz a semântica do padrão para o uso cotidiano em APIs. ([RFC Editor][1])

## Classes de códigos HTTP

| Classe | Intervalo | Nome geral    | Significado                                                                   | Quando aparece                                                                               |
| ------ | --------: | ------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1xx    |   100–199 | Informational | A requisição foi recebida, e o processamento ainda está em andamento.         | Em respostas intermediárias do protocolo HTTP; é incomum em APIs REST simples.               |
| 2xx    |   200–299 | Successful    | A requisição foi processada com sucesso.                                      | Quando a operação deu certo, com ou sem conteúdo na resposta.                                |
| 3xx    |   300–399 | Redirection   | O cliente precisa tomar uma ação adicional, geralmente seguir outro endereço. | Em redirecionamentos e cenários de cache.                                                    |
| 4xx    |   400–499 | Client Error  | Houve problema na requisição enviada pelo cliente.                            | Quando faltam dados, há erro de validação, autenticação, autorização ou recurso inexistente. |
| 5xx    |   500–599 | Server Error  | O servidor falhou ao tentar concluir uma requisição aparentemente válida.     | Quando ocorre erro interno, falha de dependência externa ou indisponibilidade temporária.    |

## Tabela prática de HTTP status codes

| Código | Nome oficial                    | Significado                                                                      | Quando usar                                                                                                     |
| ------ | ------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 100    | Continue                        | O cliente pode continuar enviando a requisição.                                  | Quase nunca aparece em APIs REST comuns; é mais ligado ao protocolo HTTP.                                       |
| 101    | Switching Protocols             | O servidor aceitou trocar de protocolo.                                          | Usado em upgrades de protocolo, como alguns cenários de WebSocket.                                              |
| 200    | OK                              | A requisição foi concluída com sucesso.                                          | Quando a operação deu certo e há resposta normal a devolver.                                                    |
| 201    | Created                         | Um novo recurso foi criado com sucesso.                                          | Em `POST` que cria um recurso, como criar usuário, solicitação ou veículo.                                      |
| 202    | Accepted                        | A requisição foi aceita, mas o processamento ainda não terminou.                 | Quando a operação será processada depois, de forma assíncrona.                                                  |
| 204    | No Content                      | A operação deu certo, mas não há corpo de resposta.                              | Em exclusão, atualização simples ou logout sem conteúdo de retorno.                                             |
| 301    | Moved Permanently               | O recurso mudou de endereço de forma permanente.                                 | Em redirecionamentos permanentes. É mais comum em sites do que em APIs.                                         |
| 302    | Found                           | O recurso está temporariamente em outro endereço.                                | Em redirecionamento temporário. Também é mais comum em aplicações web tradicionais.                             |
| 304    | Not Modified                    | O recurso não mudou desde a última verificação do cliente.                       | Em cenários de cache HTTP.                                                                                      |
| 307    | Temporary Redirect              | Redirecionamento temporário preservando o método HTTP.                           | Quando o cliente deve repetir a mesma requisição em outra URL, sem mudar o método.                              |
| 308    | Permanent Redirect              | Redirecionamento permanente preservando o método HTTP.                           | Igual ao anterior, mas definitivo.                                                                              |
| 400    | Bad Request                     | A requisição veio inválida.                                                      | Quando faltam campos, há formato incorreto ou erro básico no payload.                                           |
| 401    | Unauthorized                    | Falta autenticação válida.                                                       | Quando o cliente não enviou credenciais válidas ou o token é inválido/expirou.                                  |
| 403    | Forbidden                       | O servidor entendeu a requisição, mas não autoriza o acesso.                     | Quando o usuário está autenticado, mas não tem permissão para aquela ação.                                      |
| 404    | Not Found                       | O recurso solicitado não foi encontrado.                                         | Quando o identificador não existe ou o recurso não está disponível.                                             |
| 405    | Method Not Allowed              | O método HTTP não é aceito naquele recurso.                                      | Exemplo: enviar `POST` para um endpoint que só aceita `GET`.                                                    |
| 406    | Not Acceptable                  | O servidor não consegue gerar uma resposta compatível com o que o cliente pediu. | Pouco comum em APIs JSON simples; aparece mais em negociação de conteúdo.                                       |
| 408    | Request Timeout                 | A requisição demorou demais.                                                     | Quando o servidor encerra a espera pela requisição do cliente.                                                  |
| 409    | Conflict                        | Há conflito com o estado atual do recurso.                                       | Quando a operação é válida em tese, mas entra em conflito com o estado atual, como duplicidade ou concorrência. |
| 410    | Gone                            | O recurso existia, mas não está mais disponível.                                 | Quando se quer comunicar remoção definitiva de forma explícita.                                                 |
| 412    | Precondition Failed             | Uma pré-condição da requisição falhou.                                           | Em controle de concorrência com ETag ou cabeçalhos condicionais.                                                |
| 413    | Content Too Large               | O conteúdo enviado é grande demais.                                              | Quando o payload ultrapassa o limite permitido.                                                                 |
| 415    | Unsupported Media Type          | O tipo de conteúdo enviado não é suportado.                                      | Exemplo: o endpoint espera JSON, mas recebeu outro formato.                                                     |
| 422    | Unprocessable Content           | A sintaxe está correta, mas o conteúdo não pôde ser processado.                  | Quando o JSON está bem formado, mas viola validações semânticas da entrada.                                     |
| 423    | Locked                          | O recurso está bloqueado.                                                        | Mais comum em protocolos como WebDAV; raro em APIs REST comuns.                                                 |
| 424    | Failed Dependency               | A operação falhou porque dependia de outra que falhou.                           | Também mais especializado; raro em APIs REST simples.                                                           |
| 425    | Too Early                       | O servidor não quer processar a requisição ainda.                                | Uso avançado, ligado a repetição antecipada de requisições.                                                     |
| 426    | Upgrade Required                | O servidor exige outro protocolo.                                                | Quando a operação só pode ocorrer após upgrade de protocolo.                                                    |
| 428    | Precondition Required           | O servidor exige que a requisição tenha pré-condições.                           | Em APIs que obrigam controle de concorrência otimista.                                                          |
| 429    | Too Many Requests               | O cliente enviou requisições demais em pouco tempo.                              | Quando há rate limit ou proteção contra abuso.                                                                  |
| 431    | Request Header Fields Too Large | Os headers estão grandes demais.                                                 | Quando cabeçalhos como cookies ou metadados excedem o limite aceito.                                            |
| 451    | Unavailable For Legal Reasons   | O recurso está indisponível por motivo legal.                                    | Quando há bloqueio por decisão legal ou regulatória.                                                            |
| 500    | Internal Server Error           | O servidor falhou de forma inesperada.                                           | Quando ocorre erro não tratado ou condição inesperada no backend.                                               |
| 501    | Not Implemented                 | O servidor não suporta a funcionalidade necessária.                              | Quando o método ou a capacidade requisitada não foi implementada.                                               |
| 502    | Bad Gateway                     | O servidor recebeu resposta inválida de outro servidor.                          | Em gateways, proxies ou APIs que dependem de serviço upstream.                                                  |
| 503    | Service Unavailable             | O serviço está temporariamente indisponível.                                     | Em manutenção, sobrecarga ou indisponibilidade temporária.                                                      |
| 504    | Gateway Timeout                 | O servidor não recebeu resposta a tempo de outro serviço.                        | Quando há timeout ao chamar serviço externo/upstream.                                                           |
| 505    | HTTP Version Not Supported      | A versão HTTP usada não é suportada.                                             | Cenário raro em APIs modernas, mas previsto no padrão.                                                          |
| 507    | Insufficient Storage            | O servidor não tem armazenamento suficiente para concluir a operação.            | Mais especializado; raro em APIs comuns.                                                                        |
| 508    | Loop Detected                   | Foi detectado um loop no processamento.                                          | Também especializado, mais associado a WebDAV.                                                                  |
| 511    | Network Authentication Required | É necessária autenticação de rede.                                               | Mais ligado a portais cativos de rede do que a APIs REST comuns.                                                |

Os nomes oficiais acima constam no registro da IANA, que atualmente lista, entre outros, os códigos `100`, `101`, `200`–`226`, `300`–`308`, `400`–`451` e `500`–`511`, além de alguns códigos especializados e outros não atribuídos. ([IANA][2])

Para ensino introdutório de API REST, vale fixar primeiro este conjunto como núcleo de trabalho: **200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500, 503**. Eles cobrem a maior parte dos cenários que os alunos encontram em controllers e casos de uso iniciais. Essa seleção é uma recomendação didática; o registro oficial contém mais códigos padronizados. ([IANA][2])

Posso organizar essa mesma tabela em uma versão ainda mais didática, separada por **sucesso**, **erro do cliente** e **erro do servidor**, pensando diretamente em aula.

[1]: https://www.rfc-editor.org/rfc/rfc9110.html 'RFC 9110: HTTP Semantics'
[2]: https://www.iana.org/assignments/http-status-codes 'Hypertext Transfer Protocol (HTTP) Status Code Registry'
