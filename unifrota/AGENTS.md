# AGENTS.md

Guidance for agents working in this repository.

## Mission

Keep context usage low. Prefer small, verifiable changes. Preserve repository conventions, architectural boundaries, and observable behavior.

## Document precedence

When sources conflict, use this order:

1. explicit user instruction
2. repository documentation for the current task
3. intentionally preserved tests
4. existing implementation

Do not let current code silently override an explicit decision.

## Minimum reading

Read only what is necessary for the current task.

Always read:

- files directly affected by the task

Read when relevant:

- `package.json` for scripts, tooling, dependencies, and validation
- `README.md` for repository conventions and onboarding context
- TypeScript config files when the task affects build, module resolution, imports, aliases, or type checking

## Operating rule

Do not jump into code when the requested behavior is still unclear.

For small technical tasks with already-clear behavior, implement directly with limited scope and explicit validation.

## Naming and language

- use `camelCase` for variables, functions, methods, properties, parameters, and local constants
- use `PascalCase` for classes, interfaces, types, and enums
- use `kebab-case` for files and directories
- write code identifiers, comments, tests, commit messages, logs, errors, and internal text in English
- avoid anonymous inline literal unions for semantically meaningful concepts; introduce a named type instead

## Engineering principles

- prefer clear, intention-revealing names
- prefer small, cohesive units with a single clear responsibility
- keep business rules isolated from framework, I/O, and infrastructure concerns
- depend on abstractions at architectural boundaries
- prefer composition over inheritance
- avoid duplication of knowledge
- avoid premature abstraction and speculative generalization
- preserve testability, low coupling, and high cohesion
- keep side effects explicit and localized
- favor small, reversible, well-validated changes

## TypeScript repository rules

- use `yarn` exclusively for repository commands
- preserve strict TypeScript settings
- preserve the repository module system and import conventions
- prefer official aliases and path conventions already adopted by the repository, including `#src/*` when applicable
- prefer Node.js built-in imports using the `node:` prefix when applicable
- do not add dependencies without clear justification

## Automated testing

- treat automated tests as first-class artifacts of the codebase
- for new or changed behavior, add or update automated tests that verify the intended outcome
- when fixing a bug, add a regression test when feasible
- prefer unit tests for `domain` and `application` logic
- use integration tests for `infra`, adapters, repositories, controllers, and other boundary-facing behavior when relevant
- keep tests deterministic, isolated, intention-revealing, and fast whenever practical
- prefer assertions on observable behavior, contracts, and outputs rather than on implementation details
- prefer `vitest-mock-extended` for typed mocks of ports, gateways, repositories, and other boundary-facing dependencies when it improves clarity and safety
- choose the simplest adequate test double for the case; do not introduce complex mocks when a simple stub, fake, or `vi.fn()` is sufficient
- use test doubles at external boundaries; do not mock internal domain behavior unnecessarily
- do not remove, weaken, or bypass tests just to make the suite pass without explicit justification
- if a change is unusually hard to test, treat that as a design signal and improve testability when reasonable

## Execution rules

- prefer official project scripts over ad hoc commands
- keep changes tightly scoped and avoid unrelated refactors
- for behavior changes, add or update tests that verify the intended outcome
- when no automated test is added, make the reason explicit
- run the smallest adequate validation set for the changed scope:
  1. targeted tests/checks
  2. type check
  3. lint
  4. relevant test suite
  5. full repository check when needed

## Repository structure

- organize the codebase primarily by feature
- inside each feature, group files by code role rather than by a global top-level layer
- do not create global `domain`, `application`, or `infra` directories for the whole repository unless explicitly required

## Repository quick map

- application entrypoint: `src/main.ts`
- source code: `src/`
- automated tests: `test/`
- documentation and project notes: `doc/`

## Preferred validation flow for this repository

For source-code changes, prefer this order when applicable:

1. targeted test file
2. `yarn type:check`
3. `yarn lint`
4. `yarn test`

Use `yarn check` only when broader validation is justified by the scope.

## Clean Architecture mapping

Within each feature, use the following terminology and folder mapping:

| CA layer           | Adopted name   | folder        |
| ------------------ | -------------- | ------------- |
| entities           | domain         | `domain`      |
| use cases          | application    | `application` |
| interface adapters | infrastructure | `infra`       |

## Structural rules

- place business and domain rules in `domain`
- place use cases and application orchestration in `application`
- place adapters, gateways, repositories, controllers, and other boundary-facing implementations in `infra`
- keep errors, contracts, and related supporting artifacts close to the feature they belong to
- avoid leaking infrastructure concerns into `domain`
- avoid placing business rules in controllers, gateways, or repository implementations
- create only the folders that are needed for the current feature
- do not force empty architectural folders when the feature scope is still small

## Completion rule

- after any change to source code, including tests, always suggest a concise, technically accurate, and scope-aligned commit message before concluding the task

## Ambiguity policy

If ambiguity is small and local, state the adopted assumption.

If it affects observable behavior, external contracts, authorization, workflow states, or architectural direction, surface the gap first and do not present the implementation as settled.

## Active technologies

- Node.js
- TypeScript
- Yarn
- ESLint
- Prettier
- Vitest
