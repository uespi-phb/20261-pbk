> # /speckit.constitution

This project must follow the principles below. These principles are mandatory and govern all specifications, plans, tasks, and implementations.

## 1. Architectural Principles

- The system must preserve clear architectural boundaries between domain, application, infrastructure, and interface concerns
- Clean Architecture must guide the overall design, especially in terms of dependency direction, domain independence, and isolation of infrastructure concerns
- Clean Architecture must not be applied dogmatically in ways that introduce unnecessary indirection, excessive interface extraction, or artificial fragmentation within the same layer or module
- Simplicity and cohesion should be preferred inside the same layer or module, as long as this does not violate architectural boundaries or compromise maintainability, testability, or replaceability
- The domain layer must remain independent from frameworks, databases, HTTP, and external services
- Business rules must live in the domain and application layers, never inside controllers, ORM models, or framework-specific code
- Dependencies must point inward. Outer layers may depend on inner layers, but inner layers must never depend on outer layers
- The architecture must favor modularity, low coupling, high cohesion, and explicit boundaries between contexts
- The project must prefer composition over inheritance
- Ports and adapters must be used where they meaningfully protect architectural boundaries or isolate relevant infrastructure concerns
- Interfaces and abstractions must be introduced only when they provide clear architectural value, such as isolating external systems, preserving testability, or enabling meaningful substitution
- Internal design decisions within the same layer should prioritize clarity, directness, and maintainability over ceremonial patterns
- Each use case must represent a clear business intention and have a single responsibility

## 2. Code Quality Principles

- All code must be written in TypeScript with strict mode enabled
- All code, identifiers, file names, class names, interfaces, tests, and comments must be written in English
- The codebase must prioritize readability, simplicity, and explicitness over cleverness
- Every module, class, and function must have a single clear responsibility
- Functions should be small, intention-revealing, and side effects must be minimized
- Naming must reflect the domain language and business meaning
- Primitive obsession should be avoided when value objects improve clarity and safety
- Magic values must be avoided. Use named constants or domain abstractions
- Error handling must be explicit and consistent
- Shared utilities must only exist when they represent real reuse and do not hide domain meaning
- Premature abstraction must be avoided. Abstractions should emerge from proven duplication or stable domain concepts

## 3. Testing Principles

- TDD is the default approach for business-critical, behavior-sensitive, or regression-prone changes
- Tests must define the intended behavior before production code is accepted, especially when a new behavior is introduced or when code is generated or heavily assisted by AI
- Red, Green, Refactor must guide implementation whenever TDD is applied
- TDD must be applied pragmatically: low-risk, mechanical, or purely structural changes may use lighter validation strategies when full TDD would add disproportionate complexity, token consumption, or delivery overhead
- Every use case must have automated tests covering success paths, business rules, and failure scenarios according to its risk and importance
- Changes to existing code must preserve current intended behavior unless a requirement explicitly changes it
- When modifying existing code, automated tests must be added, updated, or extended to cover the affected behavior at an appropriate level
- For bug fixes, a failing test that reproduces the defect must be created before the fix is accepted
- For legacy or insufficiently tested code, characterization or regression tests should be added before significant refactoring whenever feasible
- Domain logic must be primarily validated through unit tests
- Application flows and adapter boundaries must be validated through integration tests where appropriate
- Test doubles must be used to isolate units of behavior, but excessive mocking that hides real behavior must be avoided
- Tests must be deterministic, fast, isolated, and readable
- Tests are part of the design and must be treated as first-class code
- AI-generated tests may assist the workflow, but critical business rules, bug reproductions, and acceptance behaviors must be explicitly reviewed and validated by humans
- Test and implementation cycles should remain small and focused to preserve clarity, reduce context growth, and control unnecessary token consumption
- Refactoring existing code is not complete unless relevant tests demonstrate that intended behavior remains correct
- A feature or code change is not complete until its intended behavior is verified by automated tests appropriate to its risk level

## 4. TypeScript Standards

- Type safety must be preserved at all times. Avoid `any` except when strictly unavoidable and explicitly justified
- Prefer explicit domain types over loose objects
- Use union types, value objects, and typed results to model domain behavior precisely
- Nullability and optionality must be handled deliberately
- Runtime validation must exist at system boundaries such as HTTP input, environment variables, events, and persistence reads
- TypeScript types must support the architecture and not replace real domain modeling

## 5. Application and Interface Principles

- Controllers, handlers, and resolvers must be thin and orchestration-focused
- Input mapping, validation, authorization, and output formatting must be separated from business rules
- Use cases must not depend on transport concerns such as HTTP status codes or framework request objects
- Public APIs must have stable contracts and explicit input/output models
- The project must favor predictable and consistent API behavior across similar flows
- Validation errors, domain errors, and infrastructure errors must be clearly distinguished

## 6. Persistence and Infrastructure Principles

- Infrastructure must implement interfaces defined by the application or domain layers
- Database access must not leak persistence concerns into the domain
- Repositories must express business-relevant operations, not generic CRUD-only abstractions
- External services must be wrapped behind adapters
- Side effects must be isolated and observable
- Migrations, environment configuration, and operational concerns must be versioned and reproducible
- Local development and automated execution should run consistently through Docker and Docker Compose when infrastructure dependencies are required

## 7. Observability and Operational Quality

- All critical application flows must be traceable through structured logs or equivalent observability mechanisms
- Errors must provide actionable diagnostic information without leaking sensitive data
- Health checks and operational diagnostics should be available for deployable services
- Performance-sensitive paths must be identified and protected from accidental degradation
- Reliability, maintainability, and debuggability are required quality attributes, not optional improvements

## 8. Security and Configuration

- Secrets must never be hardcoded
- Configuration must be externalized and validated at startup
- Inputs from outside the system must be treated as untrusted
- Authentication, authorization, and data protection must be considered at the boundary of every relevant feature
- Sensitive data must be minimized, protected, and never exposed through logs or error messages

## 9. Tooling and Development Workflow

- Yarn must be the package manager
- ESLint and Prettier must be used to enforce consistency
- The project must maintain a clean and automated developer workflow for linting, testing, and running the application
- Every change must keep the project in a runnable, testable, and linted state
- CI pipelines must validate at least formatting, linting, and automated tests before integration

## 10. Governance Rules

- These principles override local convenience and short-term shortcuts
- Any exception must be explicitly documented with rationale, scope, and expiration criteria
- Plans and task breakdowns must show how architectural boundaries, testing strategy, and quality constraints are being preserved
- Implementations that violate these principles must be considered incomplete until corrected
