# Resumo

Esse repositorio contem uma aplicacao backend feita para aprender os conceitos de DDD a partir das aulas da RocketSeat.

# DDD - Domain Driven Design

## Dominio

Responsavel pelo contexto de negocio do mundo real que o software se propoe a resolver.

- Domain Experts: Especialistas de negocio que possuem conhecimento das regras e processos
- Linguagem ubiqua: Vocabulario padronizado para a aplicacao que utiliza termos compartilhados entre o time de desenvolvimento e os domain experts.
- Atores do Sistema: Cliente, Fornecedor, Atendente, etc.

### Conceitos

- Entidades: Objetos que possuem identidade unica (ID) mantida ao longo do tempo. Mudancas de estado nao alteram quem o objeto eh (ex: Aluno possui ID; alteracoes de e-mail ou nome mantem a mesma entidade).
- Value Objects: Nao tem ID, sao definidos so pelo valor. Sao imutaveis (ex: Endereco, CPF, Email, Preco).
- Casos de uso: Como o problema eh resolvido na pratica, as acoes do sistema (ex: ResponderDuvida, CancelarMatricula).
- Eventos de Dominio: Notificacoes sobre acontecimentos relevantes que alteraram o estado do dominio (ex: PedidoCriado, AlunoMatriculado).
- SubDominios: Divisao de um problema complexo em contextos menores e delimitados.
  - Core: Essencial a aplicacao
  - Supporting: Da suporte ao funcionamento do core
  - Generic: Necessarios, mas menos importantes

Exemplo:
"EU respondo os ALUNOS"
EU e ALUNOS: entidades
responder: Caso de uso (acao de conectar/alterar estado)

## Clean Architecture

Padrao arquitetural para desacoplar as regras de negocio de frameworks, ORMs, bancos de dados e interfaces externas.

- Domain: Regras de negocio puras (Entidades, VOs, Agregados). Isola as regras de negocio.
  - Application: Casos de uso e interfaces de repositorios.
  - Enterprise: Entities e value-objects.
- Infra: Implementacao do banco (Prisma, TypeORM), APIs externas.
- Core: Controllers, rotas, HTTP.

## Fluxo da Aplicacao

UI (Frontend) -> Controller -> Use-Case -> Entity -> Repository -> Retorno

## Functional Error Handling

Tratamento de erros previsiveis de negocio utilizando tipos funcionais (como o padrao Either<Error, Result>) em vez de disparar excecoes (throw new Error).

- Left: Erro esperado de negocio (ex: SaldoInsuficiente, AlunoNaoEncontrado).
- Right: Sucesso, devolve o dado (value)

## Aggregate

Uma ou mais entidades e value objects que trabalham juntos sob uma mesma regra de consistencia. Faz coisas a mais do que entidades simples.

## Watched Lists

Um array/colecao na memoria com informacoes de estado sobre os itens (se eh novo, se foi alterado ou deletado).
Mapeia o estado interno de cada elemento (se foi adicionado, alterado ou removido) para que o repositorio execute operacoes precisas de I/O no banco de dados (INSERT, UPDATE ou DELETE), evitando recriar a lista inteira.
