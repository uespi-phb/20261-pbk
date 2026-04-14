Guidance for agents working in the **UniFrota** repository.

## Mission

Work spec-first. Keep context usage low. Preserve domain fidelity. Prefer small, verifiable changes.

## Document precedence

When sources conflict, use this order:

1. explicit user instruction
2. canonical UniFrota PRD
3. current feature specification or plan
4. intentionally preserved tests
5. existing implementation

Do not let current code silently override an explicit product decision.

## Minimum reading

Read only what is necessary for the current task.

Always read:

- files directly affected by the task

Read when relevant:

- `package.json` for scripts, tooling, dependencies, or validation
- `README.md` for repository conventions or onboarding context
- `.specify/memory/constitution.md` for engineering and workflow constraints
- the canonical PRD and current spec artifacts when the task affects business rules, contracts, states, permissions, or other observable behavior

## Operating rule

Do not jump into code when the task requires prior specification.

Use the installed GitHub Spec Kit workflows when there is:

- new functionality
- business-rule change
- contract change
- relevant ambiguity
- mismatch between expected behavior and current code

For local technical work with already-clear behavior, implement directly with limited scope and explicit validation.

## Naming and language

- use `camelCase` for variables, functions, methods, properties, parameters, and local constants
- use `PascalCase` for classes, interfaces, types, and enums
- use `kebab-case` for files and directories
- write user-facing strings in Brazilian Portuguese (`pt-BR`)
- write code identifiers, comments, tests, commit messages, logs, errors, and internal non-UI text in English
- do not use anonymous inline literal unions for semantically meaningful concepts in the codebase; introduce a named type instead
- do not spread intrinsic model behavior into free functions when the behavior naturally belongs to the model
- preserve canonical UniFrota domain terms in Brazilian Portuguese when required by the PRD

## UniFrota domain guardrails

- preserve the distinction between **solicitação**, **aprovação**, **alocação**, and **viagem**
- do not introduce multiple destinations per request
- do not merge **indisponibilidade**, **manutenção**, **abastecimento**, **multas**, or **sinistros** into a single concept
- do not promote local implementation detail to product rule
- do not expand the administrative workflow beyond what is explicitly defined in the canonical PRD

## Execution rules

- prefer official project scripts over ad hoc commands
- keep changes tightly scoped and avoid unrelated refactors
- do not add dependencies without clear justification
- for behavior changes, add or update tests that verify the intended outcome
- when no automated test is added, make the reason explicit
- run the smallest adequate validation set for the changed scope:
  1. targeted tests/checks
  2. `yarn type:check`
  3. `yarn lint`
  4. `yarn test`
  5. `yarn check`
- use `yarn check:ci` only when stricter validation is required

## Completion rule

- after any change to source code, including production code and automated tests, always suggest a concise, technically accurate, and scope-aligned commit message before concluding the task

## Ambiguity policy

If ambiguity is small and local, state the adopted assumption.

If it affects business rules, observable behavior, external contracts, authorization, or workflow states, do not present implementation as settled. Surface the gap first and propose options consistent with the PRD.

## Engineering governance

Treat `.specify/memory/constitution.md` as the canonical engineering governance for architecture, testing, validation, security, and workflow constraints.

Prefer relevant installed skills for reusable procedures. Keep this file focused on repository-specific rules and execution behavior.

## Active Technologies

- TypeScript 5 on Node.js 22.x + dotenv, Node.js built-in `crypto`, Vitest 4, ESLint 9, Prettier 3 (001-user-auth)
- Relational persistence for user accounts, role assignments, and authenticated sessions through infrastructure repository adapters (001-user-auth)

