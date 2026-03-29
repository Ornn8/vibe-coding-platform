## ADDED Requirements

### Requirement: User authentication entry points
The system SHALL allow users to sign in with configured external identity providers and MUST create or update a persisted user record on successful authentication.

#### Scenario: OAuth sign-in succeeds
- **WHEN** a user completes authentication with a configured provider
- **THEN** the system creates or updates the user's account and starts an authenticated session

#### Scenario: Session-aware navigation is rendered
- **WHEN** an authenticated user loads the application shell
- **THEN** the navigation reflects the signed-in state and exposes sign-out controls

### Requirement: Protected learner routes
The system SHALL require authentication for learner workspace routes, including modules, projects, profile, and tools.

#### Scenario: Anonymous learner route access
- **WHEN** an unauthenticated user requests a protected learner route
- **THEN** the system redirects the user to the login experience before showing protected content

### Requirement: Role-based admin access
The system SHALL restrict admin routes to users with the `ADMIN` role and MUST deny access to authenticated non-admin users.

#### Scenario: Student requests admin route
- **WHEN** an authenticated user without the `ADMIN` role requests an admin route
- **THEN** the system returns an access-denied response instead of rendering admin content

#### Scenario: Admin requests admin route
- **WHEN** an authenticated user with the `ADMIN` role requests an admin route
- **THEN** the system renders the requested admin interface
