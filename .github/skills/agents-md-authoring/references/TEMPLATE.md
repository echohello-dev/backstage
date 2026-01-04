# AGENTS.md Template

Use this template when creating new AGENTS.md files.

## Minimal Template

For small projects with simple requirements:

```markdown
# AGENTS.md

## Development Commands

- Install: `[package manager] install`
- Dev: `[package manager] dev`
- Test: `[package manager] test`
- Lint: `[package manager] lint`

## Code Style

- [Key convention 1]
- [Key convention 2]
- [Key convention 3]

## Testing

- Run tests before committing
- Add tests for new code
```

## Standard Template

For most projects:

```markdown
# AGENTS.md

## Project Overview

[Brief description of the project, its purpose, and key technologies used.]

## Development Commands

- Install dependencies: `[command]`
- Start dev server: `[command]`
- Run tests: `[command]`
- Lint code: `[command]`
- Build: `[command]`

## Code Style

- [Convention 1]
- [Convention 2]
- [Convention 3]

## Testing

- Test framework: [framework]
- Run all tests: `[command]`
- Run specific test: `[command with pattern]`
- Always add tests for new features

## Architecture

### Key Directories

- `[dir]/` — [Purpose]
- `[dir]/` — [Purpose]

### Important Files

- `[file]` — [Purpose]
- `[file]` — [Purpose]

## PR Instructions

- [Guideline 1]
- [Guideline 2]
```

## Full Template

For larger projects, monorepos, or teams with detailed requirements:

```markdown
# AGENTS.md

## Project Overview

[Comprehensive description of the project, architecture, and key design decisions. Include technology stack and any important context about the codebase structure.]

## Development Commands

All development tasks should use [task runner]:

- Install dependencies: `[command]`
- Start dev server: `[command]` (runs on [port])
- Run tests: `[command]`
- Lint and type-check: `[command]`
- Build for production: `[command]`
- Database migrations: `[command]`

## Code Style

### General

- [Language] [version/mode]
- [Formatting preferences]
- [Import organization]

### Naming Conventions

- Files: [convention]
- Components: [convention]
- Functions: [convention]
- Variables: [convention]

### Patterns

- [Preferred pattern 1]
- [Preferred pattern 2]
- [Anti-pattern to avoid]

## Testing

- Framework: [testing framework]
- Run all: `[command]`
- Run specific: `[command with pattern]`
- Watch mode: `[command]`
- Coverage: `[command]`

### Testing Guidelines

- [Guideline 1]
- [Guideline 2]
- [Guideline 3]

## Architecture

### Directory Structure

- `[dir]/` — [Purpose and contents]
- `[dir]/` — [Purpose and contents]
- `[dir]/` — [Purpose and contents]

### Key Files

- `[file]` — [What it does and when to modify]
- `[file]` — [What it does and when to modify]

### Dependencies

- [Key dependency] — [Why it's used]
- [Key dependency] — [Why it's used]

## Configuration

- `[config file]` — [What it configures]
- `[config file]` — [What it configures]

Environment variables:

- `[VAR_NAME]` — [Purpose]
- `[VAR_NAME]` — [Purpose]

## PR & Commit Guidelines

- Title format: `[type] Description`
- [Commit message convention]
- [Review requirements]
- [CI requirements]

## Security Considerations

- [Security requirement 1]
- [Security requirement 2]
- [What to never commit]

## Gotchas & Known Issues

- ⚠️ [Gotcha 1]
- ⚠️ [Gotcha 2]
- ⚠️ [Gotcha 3]

## Deployment

- [Deployment process]
- [Environment-specific notes]
```

## Monorepo Subproject Template

For nested AGENTS.md files in monorepo packages:

```markdown
# AGENTS.md — [Package Name]

## Overview

[What this package does and its role in the monorepo.]

## Commands

Run from this directory or use workspace filters:

- Dev: `[command]`
- Test: `[command]`
- Build: `[command]`

## Package-Specific Conventions

- [Convention specific to this package]
- [Convention specific to this package]

## Key Files

- `[file]` — [Purpose]
- `[file]` — [Purpose]

## Dependencies

- Depends on: `[internal package names]`
- Used by: `[other packages that import this]`

## Notes

[Any package-specific gotchas or important information.]
```

## Tips for Filling Templates

1. **Be specific** — Vague instructions like "follow best practices" don't help agents
2. **Verify commands** — Test each command before documenting it
3. **Use actual paths** — Reference real files and directories in the project
4. **Update regularly** — Treat AGENTS.md as living documentation
5. **Start minimal** — Add sections as needed, don't over-document upfront
