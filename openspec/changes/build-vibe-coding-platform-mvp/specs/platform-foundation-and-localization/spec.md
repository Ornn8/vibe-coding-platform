## ADDED Requirements

### Requirement: Localized application shell
The system SHALL serve all learner-facing routes under a locale segment and MUST support `zh` as the default locale and `en` as the secondary locale.

#### Scenario: Default locale is resolved
- **WHEN** a user visits the root entry point without a locale segment
- **THEN** the system routes the user to the Chinese locale experience

#### Scenario: Locale-specific content is rendered
- **WHEN** a user visits a localized route such as `/zh` or `/en`
- **THEN** the system renders the matching locale messages and route structure

### Requirement: Shared platform providers
The system SHALL provide a root application shell that initializes locale, theme, authentication session, and shared navigation providers without duplicating setup across pages.

#### Scenario: Shared providers wrap localized pages
- **WHEN** a localized page is rendered
- **THEN** it receives the shared provider stack from the root and locale layouts

#### Scenario: Theme state is available across pages
- **WHEN** a user changes theme preference
- **THEN** the updated theme is applied consistently across learner-facing pages

### Requirement: Baseline route UX states
The system SHALL provide baseline loading, not-found, and error states for the platform's main route groups.

#### Scenario: Loading state is shown for delayed route data
- **WHEN** a route segment is waiting for server data or content resolution
- **THEN** the system shows a loading state that matches the active application shell

#### Scenario: Missing route is handled safely
- **WHEN** a user requests an unsupported localized path
- **THEN** the system returns a not-found experience instead of an unhandled runtime failure
