## MODIFIED Requirements

### Requirement: M1 foundation lessons SHALL be fully authored in English MDX
The system SHALL include complete English MDX lesson content for the M1 learning arc, matching the curriculum-v3 Unit structure already delivered in Chinese.

#### Scenario: Learner opens an English M1 lesson
- **WHEN** a learner visits any English M1 lesson route
- **THEN** the corresponding MDX file SHALL load English content directly rather than relying on Chinese fallback

#### Scenario: English M1 structure matches Chinese M1
- **WHEN** English and Chinese M1 lessons are reviewed side by side
- **THEN** they SHALL share the same lesson order, Unit themes, and Step-based instructional structure
