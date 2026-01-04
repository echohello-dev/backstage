---
name: planning
description: Creates structured implementation plans before code changes. Use when starting features, refactors, or multi-step tasks. Analyzes requirements, decomposes work into steps, identifies dependencies, surfaces risks, and saves plans to ./plans/ for review and tracking.
---

# Planning Skill

Create actionable implementation plans before writing code. Plans are saved to `./plans/` for review, adjustment, and handoff to implementation.

## When to activate this skill

- User asks to "plan", "design", or "think through" a change
- Before starting a new feature or significant refactor
- When a task feels too large or ambiguous to begin
- To identify risks, dependencies, and unknowns upfront
- When multiple files or systems need coordinated changes

## What this skill does

1. **Clarifies requirements** — Asks targeted questions to understand goals and constraints
2. **Researches technology** — Fetches current docs for libraries and APIs involved
3. **Analyzes codebase** — Searches files, examines patterns, understands architecture
4. **Decomposes work** — Breaks tasks into small, sequential, testable steps
5. **Identifies dependencies** — Maps blockers, prerequisites, and parallel workstreams
6. **Surfaces risks** — Highlights unknowns, edge cases, and areas needing investigation
7. **Creates plan file** — Saves structured plan to `./plans/` for tracking

## What this skill does NOT do

- ❌ Write or modify source code
- ❌ Execute terminal commands
- ❌ Skip analysis to jump into implementation

## Planning process

### Step 1: Understand the request

- Parse user's intent and desired outcome
- Identify ambiguities, ask clarifying questions
- Confirm scope boundaries

### Step 2: Research (CRITICAL)

**Never rely on pre-trained knowledge for technology information.** APIs change frequently.

- Identify libraries/frameworks/APIs involved
- Fetch current documentation for each
- Find recent examples and best practices
- Verify version compatibility with codebase
- Note version-specific considerations

### Step 3: Analyze the codebase

- Search for relevant files and patterns
- Understand existing architecture and conventions
- Identify integration points and dependencies
- Check package versions in use

### Step 4: Create the plan file

1. Create file at `./plans/YYYYMMDD-HHMMSS-feature-name.md`
2. Fill in the template (see [references/TEMPLATE.md](references/TEMPLATE.md))
3. Set status to `draft`
4. Present summary to user for review

## Plan file naming

- **Format**: `YYYYMMDD-HHMMSS-<feature-name>.md`
- **Example**: `20260104-143052-add-user-authentication.md`
- Use kebab-case for feature name
- Timestamp prefix ensures chronological sorting

## Example

### Input

> "Plan adding OAuth login with GitHub to our app"

### Output

1. **Ask clarifying questions**:

   - Should this replace or supplement existing auth?
   - Which user data should we request (email, profile, repos)?
   - Do we need to handle account linking?

2. **Research**: Fetch GitHub OAuth docs, check `next-auth` or `passport` patterns

3. **Analyze**: Find existing auth code in `src/auth/`, check for user model, identify session handling

4. **Create plan file**: `./plans/20260104-143052-add-github-oauth.md` with:
   - Goal: Enable GitHub OAuth login
   - Files to modify: `src/auth/providers.ts`, `src/pages/api/auth/[...nextauth].ts`
   - Steps: Configure GitHub OAuth app, add provider, update UI, test flow
   - Risks: Token refresh handling, rate limits

## Reporting progress

- Present findings as you discover them
- Use clear markdown with headers and checkboxes
- Flag blockers with ⚠️ and questions with ❓
- Confirm understanding before finalizing
- Summarize plan concisely when complete

After creating the plan file, inform the user:

- The file path where the plan was saved
- Key decisions that need their input
- Remind them to check off items during implementation

## Checklist

Before finishing a plan:

- [ ] Requirements clarified with user
- [ ] Technology researched (docs fetched, not assumed)
- [ ] Codebase analyzed for existing patterns
- [ ] Work decomposed into testable steps
- [ ] Files to modify identified
- [ ] Risks and unknowns documented
- [ ] Plan file created in `./plans/`
- [ ] Summary presented to user
