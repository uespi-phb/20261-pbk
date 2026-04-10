# PRD - Sistema de Gestão de Veículos Institucionais

## 1. Identificação do documento

### 1.1 Nome do produto

Sistema de Gestão de Veículos Institucionais

### 1.2 Versão do documento

1.1

### 1.3 Status

- [ ] rascunho
- [ ] em revisão
- [x] aprovado
- [ ] substituído

### 1.4 Natureza do projeto

- [ ] sistema real
- [x] projeto acadêmico
- [ ] protótipo
- [x] estudo de caso
- [x] projeto semestral

### 1.5 Finalidade canônica deste documento

Este documento é a **referência canônica do sistema**.

Ele consolida a visão de produto, o escopo, o contexto, os atores, as regras de negócio, os requisitos e as restrições globais do Sistema de Gestão de Veículos Institucionais.

## 2. Visão geral do produto

### 2.1 Descrição curta

O Sistema de Gestão de Veículos Institucionais é um sistema backend voltado à gestão operacional de veículos em uma universidade multicampi. O sistema permite controlar solicitações de viagem, aprovação, alocação de veículos e motoristas, execução da viagem, registro de quilometragem, controle básico de documentação e emissão de relatórios operacionais.

### 2.2 Finalidade principal

O sistema existe para organizar, padronizar e rastrear o fluxo institucional de reserva e uso de veículos, reduzindo conflitos operacionais, melhorando o controle de disponibilidade e documentação e ampliando a visibilidade da frota por unidade e em nível institucional.

### 2.3 Contexto de uso

O sistema será utilizado em ambiente universitário multicampi, com gerenciamento centralizado da plataforma, porém com operação distribuída por unidade ou campus. Seu uso envolve requisitantes, condutores, chefias, gestores locais da frota e gestores globais.

### 2.4 Público-alvo ou beneficiários

Os principais beneficiários são:

- requisitantes de viagens institucionais
- motoristas institucionais
- chefias responsáveis por autorização
- gestores locais da frota
- gestores globais com visão consolidada
- a própria universidade, ao obter maior controle e rastreabilidade operacional

### 2.5 Valor esperado

O produto é relevante por oferecer uma base funcional consistente para gestão de frota universitária, ao mesmo tempo em que serve como estudo de caso didático para práticas modernas de desenvolvimento de software.

## 3. Problema que o produto pretende resolver

### 3.1 Situação atual

Em uma universidade multicampi, a gestão de veículos institucionais tende a envolver solicitações distribuídas entre unidades, múltiplos perfis de usuários, diferentes tipos de veículos e regras administrativas e operacionais que precisam ser observadas de forma consistente.

### 3.2 Dificuldades existentes

- dificuldade de controlar reservas e evitar conflitos de uso
- dificuldade de rastrear o ciclo de vida das viagens
- dificuldade de acompanhar documentação e condições mínimas de uso de veículos e condutores
- dificuldade de consolidar histórico operacional por unidade, veículo, motorista e requisitante

### 3.3 Resultado esperado com o produto

Espera-se que o sistema ofereça uma base padronizada para registro, autorização, alocação, execução e rastreabilidade das viagens institucionais, preservando gestão local da frota com visibilidade global do ambiente multicampi.

## 4. Objetivos do produto

### 4.1 Objetivo geral

Organizar o fluxo institucional de solicitação, autorização, alocação e execução de viagens em veículos oficiais, com regras mínimas de consistência, rastreabilidade e controle operacional.

### 4.2 Objetivos prioritários

- impedir reservas inválidas, conflitantes ou incompatíveis com as regras do domínio
- registrar de forma confiável o ciclo operacional das viagens e o histórico associado
- apoiar a gestão local das frotas sem perder a visão institucional consolidada

### 4.3 Objetivos secundários

- manter controle básico de documentação de veículos e condutores
- disponibilizar relatórios operacionais por múltiplas perspectivas
- servir como base didática para ensino de arquitetura, APIs, persistência, autenticação, autorização e testes automatizados

## 5. Escopo do sistema

### 5.1 Escopo incluído

- cadastro e gestão básica de usuários por perfil
- cadastro e gestão de veículos
- cadastro e gestão de motoristas
- controle de documentação de veículos e condutores
- solicitação de viagem
- aprovação ou rejeição de solicitação
- alocação de veículo
- alocação de motorista, quando aplicável
- uso de requisitante como condutor autorizado, quando permitido
- check-in de saída
- check-out de retorno
- registro de quilometragem
- registro de nível de combustível
- registro textual livre ao final da viagem
- cancelamento de solicitações
- cancelamento automático em condição objetiva
- relatórios operacionais

### 5.2 Fora do escopo

- controle detalhado de abastecimento
- controle financeiro da frota
- controle de manutenção como módulo completo
- gestão de multas
- gestão de sinistros como processo próprio
- controle de oficinas
- rastreamento em tempo real
- roteiros com múltiplos destinos
- cadastro nominal de passageiros
- workflow complexo de priorização
- auditoria formal avançada

### 5.3 Limites do produto

- o foco do sistema recai sobre o fluxo operacional de reserva e uso de veículos
- a solicitação possui apenas um destino
- o controle de manutenção é apenas indireto, por indisponibilidade, e não como módulo próprio
- os relatórios têm finalidade operacional e não configuram auditoria formal avançada

## 6. Contexto institucional, organizacional ou didático

### 6.1 Contexto mais amplo

A universidade opera em contexto multicampi, com múltiplas unidades que possuem demandas próprias de deslocamento institucional. A gestão do sistema é centralizada, mas a operação da frota é descentralizada por campus ou unidade.

### 6.2 Estrutura organizacional relevante

A estrutura organizacional relevante envolve:

- unidades ou campi com frota própria
- requisitantes vinculados à própria unidade
- chefias da unidade solicitante
- gestores locais da frota por unidade
- gestores globais com visão consolidada do sistema

### 6.3 Regras do contexto

- cada unidade administra seus próprios veículos
- requisitantes comuns solicitam viagens apenas em sua própria unidade
- a gestão local possui prioridade operacional sobre a gestão global
- gestores globais possuem foco em consulta, cadastros e relatórios globais

### 6.4 Motivação didática, quando houver

O produto será concebido como estudo de caso para a disciplina, servindo como base prática para introdução e aplicação de boas práticas de desenvolvimento de software, incluindo organização arquitetural, modelagem de domínio, APIs, persistência de dados, autenticação, autorização e testes automatizados.

## 7. Atores e perfis do sistema

> Informar claramente se um mesmo usuário pode acumular múltiplos papéis.

### 7.1 Requisitante

**Descrição:** Professor ou servidor que solicita a viagem.  
**Responsabilidades principais:**

- solicitar viagem vinculada à sua unidade
- informar os dados necessários da viagem
- acompanhar o status da solicitação
- cancelar solicitação antes do início da viagem
- consultar o próprio histórico de solicitações
- atuar como condutor autorizado, quando permitido e devidamente habilitado
- realizar check-in e check-out da própria viagem quando estiver formalmente designado como condutor autorizado

### 7.2 Motorista

**Descrição:** Usuário responsável pela condução institucional dos veículos.  
**Responsabilidades principais:**

- visualizar viagens atribuídas
- realizar check-in da saída
- realizar check-out do retorno
- registrar quilometragem inicial e final
- registrar nível de combustível ao encerramento da viagem
- registrar observação textual livre ao final da viagem

### 7.3 Chefia da unidade solicitante

**Descrição:** Perfil responsável por autorizar ou rejeitar a solicitação de viagem.  
**Responsabilidades principais:**

- analisar solicitações da unidade
- autorizar ou rejeitar pedidos
- definir prioridade entre solicitações concorrentes

### 7.4 Gestor local da frota

**Descrição:** Perfil responsável pela gestão operacional da frota da unidade.  
**Responsabilidades principais:**

- cadastrar e gerenciar veículos da unidade
- cadastrar e gerenciar motoristas da unidade
- controlar disponibilidade dos veículos
- verificar documentação
- realizar alocação de veículos e motoristas
- consultar histórico e relatórios da unidade
- autorizar viagens, quando possuir essa atribuição

### 7.5 Gestor global

**Descrição:** Perfil com visão institucional consolidada.  
**Responsabilidades principais:**

- consultar dados de todas as unidades
- administrar cadastros globais
- consultar relatórios globais

### 7.6 Regras sobre acúmulo de papéis

Um mesmo usuário pode acumular múltiplos papéis no sistema. Assim, um usuário pode, por exemplo, ser simultaneamente gestor e chefia. Além disso, um gestor com permissão adequada pode autorizar viagens no âmbito de sua unidade.

## 8. Conceitos de negócio e linguagem ubíqua

### 8.1 Classificações adotadas

- **Tipos de deslocamento:** local, intermunicipal, interestadual
- **Finalidades da viagem:** ensino, extensão, pesquisa, administrativa, manutenção
- **Tipos de veículo mínimos:** carro de passeio, pickup, van, ônibus, motocicleta

### 8.2 Termos importantes do domínio

- **Solicitação de viagem:** registro central do pedido de uso de veículo para deslocamento institucional.
- **Condutor autorizado:** requisitante apto a conduzir veículos permitidos, desde que atenda às regras documentais e de categoria.
- **Alocação operacional:** associação de veículo e condutor compatíveis a uma solicitação previamente aprovada.
- **Indisponibilidade do veículo:** condição que impede nova alocação do veículo, por documentação, tacógrafo, manutenção, bloqueio administrativo ou uso.
- **Check-in:** registro do início efetivo da viagem, com data, hora e quilometragem inicial.
- **Check-out:** registro do encerramento da viagem, com data, hora, quilometragem final, combustível final e observação livre.

### 8.3 Linguagem ubíqua desejada

Os termos solicitação, viagem, aprovação, alocação, requisitante, motorista, condutor autorizado, indisponibilidade, check-in, check-out, unidade e gestor devem ser usados de forma consistente em todos os artefatos derivados.

## 9. Regras gerais de negócio

1. Toda solicitação de viagem deve ser vinculada a uma unidade ou campus.
2. O requisitante comum solicita viagem apenas em sua própria unidade.
3. Gestores podem ter visão mais ampla, conforme permissões do perfil.
4. Toda solicitação depende de autorização da chefia da unidade solicitante ou de gestor com permissão de autorização.
5. A aprovação recai sobre a viagem em si, e não sobre uma alocação específica já consolidada.
6. A solicitação pode ser criada sem motorista definido.
7. A solicitação possui apenas um destino.
8. O sistema deve registrar origem, destino, data e hora de saída, data e hora de retorno, justificativa, finalidade e quantidade de passageiros.
9. A data e hora de retorno não é opcional.
10. Não pode haver sobreposição de reservas para o mesmo veículo.
11. O sistema deve impedir reserva quando houver conflito de disponibilidade do veículo ou do motorista.
12. O sistema deve impedir uso de condutor com habilitação vencida.
13. O sistema deve impedir reserva quando a capacidade do veículo for insuficiente para a quantidade de passageiros informada.
14. O sistema deve impedir datas e horários inválidos.
15. Carros de passeio e pickups podem ser conduzidos por requisitante marcado como condutor autorizado.
16. Vans e ônibus exigem motorista institucional e documentação específica aplicável.
17. A prioridade entre solicitações concorrentes é definida pela chefia da unidade.
18. A solicitação pode ser cancelada a qualquer momento antes do início da viagem.
19. Após a data e hora previstas de saída, caso não tenha ocorrido check-in, o sistema poderá registrar cancelamento automático.
20. Reserva e cancelamento devem ser registrados no histórico.
21. Quando a viagem for conduzida por requisitante na condição de condutor autorizado, ele poderá realizar o check-in e o check-out da própria viagem, observadas as mesmas exigências de registro aplicáveis ao motorista institucional.
22. O cancelamento automático somente poderá ocorrer para solicitação ainda não iniciada, com status compatível com execução pendente e sem registro de check-in.

## 10. Macrofluxos de negócio

> Esta seção descreve fluxos amplos do sistema.  
> Não detalhar aqui casos de uso específicos nem comportamento técnico de implementação.

### 10.1 Macrofluxo principal - Solicitação e execução de viagem

1. O requisitante cria uma solicitação de viagem.
2. A solicitação fica com status pendente.
3. A chefia da unidade solicitante, ou gestor autorizado, analisa a solicitação.
4. Em caso de aprovação, ocorre a alocação de veículo e condutor compatíveis.
5. No início da viagem, é realizado o check-in.
6. A viagem permanece em andamento até o retorno.
7. Ao final, é realizado o check-out.
8. A viagem é concluída e passa a compor o histórico operacional.

### 10.2 Macrofluxo alternativo - Rejeição ou cancelamento

1. A solicitação é rejeitada pela chefia ou gestor autorizado, permanecendo registrada no histórico.
2. Alternativamente, a solicitação pode ser cancelada manualmente antes do início da viagem.
3. Também pode ocorrer cancelamento automático quando o horário previsto de saída for ultrapassado sem check-in.

### 10.3 Macrofluxo excepcional - Indisponibilidade superveniente de veículo

1. Um veículo previamente alocado torna-se indisponível antes do início da viagem.
2. O sistema registra a indisponibilidade, desfaz a alocação e impede o check-in com aquele veículo.
3. A solicitação permanece aprovada, aguardando nova alocação ou posterior cancelamento.

## 11. Funcionalidades principais do sistema

> Esta seção descreve as **capacidades** do sistema em linguagem funcional e executiva.  
> Os requisitos funcionais detalhados e rastreáveis devem ser registrados na seção 14.

### 11.1 Gestão de solicitações de viagem

**Descrição:** Permite criar, acompanhar, aprovar, rejeitar e cancelar solicitações de viagem.  
**Atores envolvidos:** requisitante, chefia da unidade solicitante, gestor autorizado.  
**Resultado esperado:** fluxo institucional de solicitação formalizado e rastreável.

### 11.2 Alocação operacional de recursos

**Descrição:** Permite associar veículo e condutor compatíveis às solicitações aprovadas, com verificação de regras de disponibilidade e compatibilidade.  
**Atores envolvidos:** gestor local da frota, motorista, requisitante condutor autorizado.  
**Resultado esperado:** viagem aprovada pronta para execução sem violação de regras do domínio.

### 11.3 Execução e encerramento da viagem

**Descrição:** Permite registrar saída, retorno, quilometragem e combustível final da viagem.  
**Atores envolvidos:** motorista institucional ou requisitante formalmente designado como condutor autorizado.  
**Resultado esperado:** execução devidamente registrada e integrada ao histórico operacional.

### 11.4 Gestão de documentação e disponibilidade

**Descrição:** Permite controlar documentação essencial de veículos e condutores e impedir alocações inválidas.  
**Atores envolvidos:** gestor local da frota, gestor global.  
**Resultado esperado:** redução de uso indevido de veículos ou condutores em situação irregular.

### 11.5 Relatórios operacionais

**Descrição:** Permite consultar históricos e indicadores operacionais por diferentes perspectivas.  
**Atores envolvidos:** gestor local da frota, gestor global.  
**Resultado esperado:** apoio à gestão cotidiana da frota e à visibilidade institucional.

**Relatórios operacionais mínimos esperados:**

- solicitações por status, unidade e período
- viagens concluídas por unidade e período
- histórico por veículo
- histórico por motorista ou condutor autorizado
- histórico por requisitante
- cancelamentos manuais e automáticos por período
- utilização da frota por veículo, incluindo quantidade de viagens e quilometragem acumulada no recorte consultado

## 12. Informações centrais do domínio

> Esta seção reúne informações estruturantes do domínio, úteis para compreensão global do sistema.  
> Não detalhar aqui campos locais de uma feature específica.

### 12.1 Informações recorrentes e estruturantes

- vinculação da solicitação a uma unidade ou campus
- distinção entre perfis e permissões operacionais
- classificação do deslocamento por área de uso
- classificação do veículo por tipo e capacidade
- validade documental de veículos e condutores
- histórico operacional de reservas, cancelamentos e viagens

### 12.2 Informações derivadas relevantes

- situação de disponibilidade do veículo a partir de uso, bloqueio, manutenção e documentação
- possibilidade de condução por requisitante conforme tipo do veículo e condição de condutor autorizado
- compatibilidade da viagem com a área máxima de operação do veículo

### 12.3 Restrições gerais associadas a essas informações

- a viagem deve possuir data e hora de saída e retorno válidas
- a alocação deve respeitar disponibilidade, capacidade e compatibilidade documental
- a área autorizada de operação do veículo deve ser compatível com o tipo de deslocamento solicitado

## 13. Estados e ciclos de vida relevantes

### 13.1 Estados principais

- pendente
- aprovada
- rejeitada
- cancelada
- em andamento
- concluída
- cancelada automaticamente

### 13.2 Transições válidas

- pendente -> aprovada
- pendente -> rejeitada
- pendente -> cancelada
- pendente -> cancelada automaticamente
- aprovada -> em andamento
- aprovada -> cancelada
- em andamento -> concluída

### 13.3 Transições inválidas

- rejeitada -> em andamento
- cancelada -> em andamento
- concluída -> pendente
- cancelada automaticamente -> em andamento

## 14. Requisitos funcionais

> Registrar aqui requisitos observáveis, verificáveis e rastreáveis.

### RF01 - Autenticação de usuários

O sistema deve permitir autenticação de usuários conforme perfil autorizado.

### RF02 - Gestão de perfis

O sistema deve distinguir permissões entre requisitante, motorista, chefia, gestor local e gestor global.

### RF03 - Cadastro de veículos

O sistema deve permitir cadastrar e manter veículos institucionais.

### RF04 - Cadastro de motoristas

O sistema deve permitir cadastrar e manter motoristas.

### RF05 - Cadastro de requisitantes condutores autorizados

O sistema deve permitir marcar requisitantes aptos a conduzir veículos permitidos.

### RF06 - Controle de documentação

O sistema deve permitir registrar e consultar documentação e validade de veículos e condutores.

### RF07 - Solicitação de viagem

O sistema deve permitir criação de solicitação de viagem com os campos definidos neste documento.

### RF08 - Aprovação de solicitação

O sistema deve permitir que a chefia da unidade, ou gestor autorizado, aprove ou rejeite a solicitação.

### RF09 - Alocação operacional

O sistema deve permitir alocar veículo e condutor compatíveis à viagem aprovada.

### RF10 - Validação de disponibilidade

O sistema deve impedir alocação quando houver indisponibilidade do veículo ou do condutor.

### RF11 - Check-in

O sistema deve permitir registrar o início da viagem com quilometragem inicial, tanto por motorista institucional quanto por requisitante formalmente designado como condutor autorizado, quando isso for permitido pelas regras do domínio.

### RF12 - Check-out

O sistema deve permitir registrar o encerramento da viagem com quilometragem final, nível de combustível final e observação livre, tanto por motorista institucional quanto por requisitante formalmente designado como condutor autorizado, quando isso for permitido pelas regras do domínio.

### RF13 - Cancelamento

O sistema deve permitir cancelamento manual antes do início da viagem e cancelamento automático quando a data e hora previstas de saída forem ultrapassadas sem a realização do check-in, desde que a solicitação ainda não tenha sido iniciada e permaneça em situação compatível com execução pendente.

### RF14 - Consulta de histórico

O sistema deve permitir consultas históricas por diferentes perspectivas operacionais.

### RF15 - Relatórios operacionais

O sistema deve disponibilizar, no mínimo, relatórios operacionais por unidade, veículo, motorista ou condutor autorizado, requisitante, status da solicitação e período, incluindo também cancelamentos e utilização da frota.

## 15. Requisitos não funcionais de alto nível

> Registrar apenas requisitos não funcionais em nível sistêmico.  
> Detalhamento técnico local pertence à especificação técnica do recorte correspondente.

### RNF01 - Arquitetura

O sistema deve ser estruturado de modo a favorecer separação de responsabilidades, baixo acoplamento e testabilidade.

### RNF02 - Interface programática

O sistema deve ser exposto por meio de API REST com organização consistente de recursos, métodos e códigos de resposta.

### RNF03 - Segurança

O sistema deve exigir autenticação e aplicar autorização conforme perfil do usuário.

### RNF04 - Persistência

O sistema deve utilizar armazenamento persistente relacional, preservando integridade, relacionamentos e consistência entre registros.

### RNF05 - Operação multiunidade

O sistema deve suportar múltiplas unidades ou campi em uma única instância, preservando separação lógica dos dados e operação coerente por unidade.

### RNF06 - Rastreabilidade

O sistema deve manter histórico suficiente para acompanhamento operacional das solicitações, reservas, cancelamentos, alocações e viagens.

### RNF07 - Observações adicionais

O sistema deve permitir implementação de testes unitários e de integração dos principais casos de uso.

## 16. Conceitos estruturantes do domínio

> Esta seção não define o modelo técnico final.  
> Ela apenas orienta a futura modelagem do domínio.

### 16.1 Entidades conceituais candidatas

- usuário
- unidade ou campus
- veículo
- documento do veículo
- habilitação
- solicitação de viagem
- alocação
- viagem
- indisponibilidade do veículo

### 16.2 Papéis e capacidades de acesso

- perfil
- requisitante
- motorista
- chefia
- gestor local
- gestor global
- condutor autorizado

### 16.3 Registros operacionais e classificações relevantes

- registro de quilometragem
- registro de combustível
- área de uso autorizada
- tipo de deslocamento
- finalidade da viagem
- tipo de veículo
- status da solicitação ou da viagem

## 17. Restrições globais e decisões de contorno

> Registrar apenas restrições e decisões **globais, estáveis e não negociáveis** do sistema.  
> Detalhes técnicos locais, contratos específicos, fluxos internos de implementação e decisões da feature devem ser registrados na especificação técnica correspondente.

### 17.1 Restrições globais não negociáveis

- o sistema deve manter foco no fluxo operacional de reserva e uso dos veículos
- a solicitação deve possuir apenas um destino
- a data e hora de retorno são obrigatórias
- não pode haver sobreposição de reservas para o mesmo veículo
- vans e ônibus exigem motorista institucional e documentação específica aplicável
- a gestão local da frota possui prioridade operacional sobre a gestão global

### 17.2 Diretrizes globais de engenharia

- preservar separação clara entre requisito de produto e detalhamento técnico
- tratar este documento como fonte canônica para os documentos derivados do sistema
- manter rastreabilidade entre regras de negócio, requisitos e artefatos derivados

### 17.3 Observação de fronteira documental

Detalhes técnicos específicos de implementação, como contratos locais, desenho de adapters, DTOs, estratégia transacional, persistência específica, testes de feature e decisões de código, não devem ser detalhados neste documento.

## 18. Decisões já tomadas e governança da especificação

> Esta seção existe para preservar consistência entre o documento canônico e seus derivados.

### 18.1 Decisões consolidadas

- o sistema será um backend exposto por API REST
- o armazenamento persistente será realizado em tecnologia relacional
- o contexto de uso é multicampi, com gestão local da frota e visão global consolidada
- um mesmo usuário pode acumular múltiplos papéis
- carros de passeio e pickups podem admitir requisitante como condutor autorizado, nas condições previstas

### 18.2 Dúvidas ainda em aberto

- quais categorias e comprovantes compõem exatamente a documentação específica aplicável a vans e ônibus no contexto deste sistema
- se a área máxima de operação do veículo será modelada como classificação fixa do veículo, regra parametrizável ou mera validação administrativa
- se a priorização entre solicitações concorrentes exige apenas definição manual pela chefia ou também registro explícito do critério adotado
- se o cancelamento automático deve produzir motivo padronizado e notificações obrigatórias aos envolvidos
- se o sistema deverá explicitar bloqueios temporários de veículo e condutor como tipos distintos de indisponibilidade

### 18.3 Suposições proibidas

- não assumir módulos completos de manutenção, abastecimento, multas, sinistros ou rastreamento em tempo real
- não assumir múltiplos destinos por solicitação
- não assumir auditoria formal avançada como parte do escopo
- não assumir workflow administrativo complexo além do necessário para aprovação e priorização descritas

### 18.4 Pontos sobre os quais derivação e implementação exigem cautela

- evitar transformar regras operacionais em desenho técnico prematuro neste documento
- preservar a distinção entre aprovação da viagem e alocação operacional posterior
- manter a consistência entre indisponibilidade superveniente, realocação e cancelamento
- explicitar em artefatos derivados qualquer hipótese adicional que não esteja definida neste documento canônico

## 19. Artefatos derivados esperados

A partir deste documento, espera-se derivar, quando necessário:

- documento de contexto sistêmico
- documentos de recorte funcional
- especificações técnicas dos recortes necessários

### 19.1 Regra de herança

Documentos derivados devem:

- herdar contexto e regras deste documento
- evitar contradizer decisões consolidadas
- especializar apenas o recorte que lhes compete
- registrar localmente apenas o delta necessário

## 20. Observações finais

Este documento consolida a visão global do Sistema de Gestão de Veículos Institucionais em nível canônico. Ele preserva a separação entre visão de produto, regras de negócio, restrições globais e detalhamento técnico posterior, deixando para artefatos derivados o aprofundamento local que não pertença a este nível de especificação.
