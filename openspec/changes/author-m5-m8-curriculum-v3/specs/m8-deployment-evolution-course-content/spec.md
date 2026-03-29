## ADDED Requirements

### Requirement: M8 deployment-and-evolution lessons SHALL be fully authored in Chinese MDX
The system SHALL include complete Chinese MDX lesson content for the M8 learning arc, delivered as four Unit-style lesson pages that cover deployment, safety checks, iterative evolution, and the capstone.

#### Scenario: Learner opens an M8 lesson
- **WHEN** a learner visits any Chinese M8 lesson route
- **THEN** the corresponding MDX file SHALL contain complete Unit-Step instructional content with deployable outcomes and review-oriented exercises

#### Scenario: M8 remains clearly advanced-tier content
- **WHEN** M8 metadata is reviewed in the learning experience
- **THEN** the module SHALL remain marked as `ADVANCED` and present capstone-level expectations

### Requirement: M8 lessons SHALL close the loop from local build to deployed system
Each Chinese M8 lesson SHALL teach how to move from a working local project to a deployable, reviewable, and continuously improvable production-facing project.

#### Scenario: Deployment lesson teaches concrete hosting choices
- **WHEN** the deployment-focused M8 lesson is reviewed
- **THEN** it SHALL compare practical deployment targets and connect the recommendation to project type and operational complexity

#### Scenario: Capstone lesson requires a full artifact package
- **WHEN** the capstone lesson is reviewed
- **THEN** it SHALL require both the deployed project result and the supporting methodology artifacts needed to review how the work was produced
