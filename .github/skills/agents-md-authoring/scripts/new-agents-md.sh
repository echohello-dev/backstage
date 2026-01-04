#!/bin/bash
# Generate a new AGENTS.md file from a template
# Usage: new-agents-md.sh [path] [--minimal|--standard|--full]

set -euo pipefail

# Default values
TARGET_PATH="${1:-.}"
TEMPLATE_TYPE="${2:---standard}"

# Resolve to absolute path
if [[ "$TARGET_PATH" != /* ]]; then
  TARGET_PATH="$(pwd)/$TARGET_PATH"
fi

TARGET_FILE="$TARGET_PATH/AGENTS.md"

# Check if file already exists
if [[ -f "$TARGET_FILE" ]]; then
  echo "❌ AGENTS.md already exists at $TARGET_FILE"
  echo "   Use a text editor to modify the existing file."
  exit 1
fi

# Create directory if needed
mkdir -p "$TARGET_PATH"

case "$TEMPLATE_TYPE" in
  --minimal|-m)
    cat > "$TARGET_FILE" << 'EOF'
# AGENTS.md

## Development Commands

- Install: `npm install`
- Dev: `npm run dev`
- Test: `npm test`
- Lint: `npm run lint`

## Code Style

- [Add your code conventions here]

## Testing

- Run tests before committing
- Add tests for new code
EOF
    ;;
    
  --full|-f)
    cat > "$TARGET_FILE" << 'EOF'
# AGENTS.md

## Project Overview

[Describe the project, its purpose, and key technologies used.]

## Development Commands

- Install dependencies: `[command]`
- Start dev server: `[command]`
- Run tests: `[command]`
- Lint code: `[command]`
- Build: `[command]`

## Code Style

### General

- [Language and version]
- [Formatting preferences]

### Naming Conventions

- Files: [convention]
- Components: [convention]
- Functions: [convention]

### Patterns

- [Preferred patterns]
- [Anti-patterns to avoid]

## Testing

- Framework: [testing framework]
- Run all: `[command]`
- Run specific: `[command with pattern]`
- Always add tests for new features

## Architecture

### Key Directories

- `src/` — [Purpose]
- `tests/` — [Purpose]

### Important Files

- `[file]` — [Purpose]

## Configuration

- `[config file]` — [What it configures]

Environment variables:
- `[VAR_NAME]` — [Purpose]

## PR & Commit Guidelines

- Title format: `[type] Description`
- Run lint and tests before committing
- [Additional guidelines]

## Security Considerations

- Never commit secrets or API keys
- [Additional security requirements]

## Gotchas & Known Issues

- ⚠️ [Document any gotchas here]
EOF
    ;;
    
  --standard|-s|*)
    cat > "$TARGET_FILE" << 'EOF'
# AGENTS.md

## Project Overview

[Brief description of the project and key technologies.]

## Development Commands

- Install: `npm install`
- Dev: `npm run dev`
- Test: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`

## Code Style

- [Add your code conventions here]

## Testing

- Run all tests: `npm test`
- Run specific: `npm test -- --grep "pattern"`
- Always add tests for new features

## Architecture

### Key Directories

- `src/` — Source code
- `tests/` — Test files

### Important Files

- [List key files here]

## PR Instructions

- Run lint and tests before committing
- Keep PRs focused on a single change
EOF
    ;;
esac

echo "✅ Created $TARGET_FILE"
echo ""
echo "Next steps:"
echo "  1. Open $TARGET_FILE in your editor"
echo "  2. Fill in the placeholder content"
echo "  3. Verify all commands work correctly"
echo "  4. Commit the file to your repository"
