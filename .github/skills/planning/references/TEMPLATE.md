# Plan File Template

Use this template when creating plan files in `./plans/`.

## Frontmatter

```yaml
---
title: [Feature/Task Name]
status: draft | review | approved | in-progress | completed
created: YYYY-MM-DDTHH:MM:SS
updated: YYYY-MM-DDTHH:MM:SS
author: [who requested]
---
```

## Full Template

```markdown
---
title: [Feature/Task Name]
status: draft
created: YYYY-MM-DDTHH:MM:SS
updated: YYYY-MM-DDTHH:MM:SS
author: [who requested]
---

## Goal

One-sentence summary of the outcome.

## Context

Key findings from codebase analysis and research.

## Implementation Checklist

### Planning

- [ ] Requirements clarified
- [ ] Codebase analyzed
- [ ] External docs researched
- [ ] Plan reviewed and approved

### Implementation

- [ ] Step 1: Description (files: `path/to/file.ts`)
- [ ] Step 2: Description (files: `path/to/other.ts`)

### Testing

- [ ] Unit tests written
- [ ] Integration tests written
- [ ] Manual testing completed

### Completion

- [ ] Code reviewed
- [ ] Documentation updated (if needed)
- [ ] Merged to main

## Files to Modify

| File            | Action | Purpose          | Done |
| --------------- | ------ | ---------------- | ---- |
| path/to/file.ts | Modify | Add new function | [ ]  |
| path/to/new.ts  | Create | New component    | [ ]  |

## Risks & Unknowns

- ⚠️ Risk 1: Description and mitigation
- ❓ Unknown 1: Needs investigation

## Open Questions

- Question needing clarification?

## Research Notes

Sources consulted and key findings from documentation lookup.

## Change Log

- YYYY-MM-DDTHH:MM:SS: Initial draft
```

## Status Values

| Status        | Meaning                                 |
| ------------- | --------------------------------------- |
| `draft`       | Initial plan, not yet reviewed          |
| `review`      | Awaiting user/team review               |
| `approved`    | Plan accepted, ready for implementation |
| `in-progress` | Implementation underway                 |
| `completed`   | All items done, work merged             |

## Tips

- **Goal**: Keep to one sentence. If you need more, the scope may be too large.
- **Context**: Include version numbers, relevant config, and key constraints discovered.
- **Files to Modify**: List even tentative files—helps estimate scope.
- **Risks**: Always include at least one. No plan is risk-free.
- **Change Log**: Update when plan changes after initial draft.
