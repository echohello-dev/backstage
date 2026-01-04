#!/bin/bash
# Validate an AGENTS.md file
# Usage: validate-agents-md.sh [path/to/AGENTS.md or directory]

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

TARGET="${1:-.}"
ERRORS=0
WARNINGS=0

# Find the AGENTS.md file
if [[ -f "$TARGET" ]]; then
  AGENTS_FILE="$TARGET"
elif [[ -d "$TARGET" && -f "$TARGET/AGENTS.md" ]]; then
  AGENTS_FILE="$TARGET/AGENTS.md"
else
  echo -e "${RED}❌ No AGENTS.md found at: $TARGET${NC}"
  exit 1
fi

echo "Validating: $AGENTS_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check file exists and is readable
if [[ ! -r "$AGENTS_FILE" ]]; then
  echo -e "${RED}❌ Cannot read file: $AGENTS_FILE${NC}"
  exit 1
fi

# Get file content
CONTENT=$(cat "$AGENTS_FILE")

# Check for markdown heading
if ! echo "$CONTENT" | grep -q '^#'; then
  echo -e "${YELLOW}⚠️  No markdown headings found${NC}"
  ((WARNINGS++))
else
  echo -e "${GREEN}✓${NC} Has markdown headings"
fi

# Check for development/setup commands section
if echo "$CONTENT" | grep -iq -E '^##.*\b(command|setup|development|install|getting started)\b'; then
  echo -e "${GREEN}✓${NC} Has development commands section"
else
  echo -e "${YELLOW}⚠️  Consider adding a 'Development Commands' section${NC}"
  ((WARNINGS++))
fi

# Check for actual commands (backtick code)
if echo "$CONTENT" | grep -q '`[^`]*`'; then
  echo -e "${GREEN}✓${NC} Contains inline commands"
else
  echo -e "${YELLOW}⚠️  No inline commands found (use backticks for commands)${NC}"
  ((WARNINGS++))
fi

# Check for code style section
if echo "$CONTENT" | grep -iq -E '^##.*\b(style|convention|pattern|standard)\b'; then
  echo -e "${GREEN}✓${NC} Has code style section"
else
  echo -e "${YELLOW}⚠️  Consider adding a 'Code Style' section${NC}"
  ((WARNINGS++))
fi

# Check for testing section
if echo "$CONTENT" | grep -iq -E '^##.*\b(test|testing)\b'; then
  echo -e "${GREEN}✓${NC} Has testing section"
else
  echo -e "${YELLOW}⚠️  Consider adding a 'Testing' section${NC}"
  ((WARNINGS++))
fi

# Check for architecture/structure section
if echo "$CONTENT" | grep -iq -E '^##.*\b(architecture|structure|directory|key files)\b'; then
  echo -e "${GREEN}✓${NC} Has architecture/structure section"
else
  echo -e "${YELLOW}⚠️  Consider adding an 'Architecture' section${NC}"
  ((WARNINGS++))
fi

# Check file size
LINE_COUNT=$(wc -l < "$AGENTS_FILE" | tr -d ' ')
if [[ $LINE_COUNT -lt 10 ]]; then
  echo -e "${YELLOW}⚠️  File seems short ($LINE_COUNT lines) - consider adding more context${NC}"
  ((WARNINGS++))
elif [[ $LINE_COUNT -gt 500 ]]; then
  echo -e "${YELLOW}⚠️  File is long ($LINE_COUNT lines) - consider splitting or summarizing${NC}"
  ((WARNINGS++))
else
  echo -e "${GREEN}✓${NC} File length is reasonable ($LINE_COUNT lines)"
fi

# Check for placeholder text that wasn't filled in
if echo "$CONTENT" | grep -qE '\[.*\]' && echo "$CONTENT" | grep -q '\[command\]\|\[Convention\]\|\[Purpose\]\|\[framework\]'; then
  echo -e "${YELLOW}⚠️  Contains unfilled placeholder text${NC}"
  ((WARNINGS++))
fi

# Check for common useful elements
if echo "$CONTENT" | grep -q '```'; then
  echo -e "${GREEN}✓${NC} Contains code blocks"
fi

if echo "$CONTENT" | grep -q '^- '; then
  echo -e "${GREEN}✓${NC} Uses bullet lists"
fi

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [[ $ERRORS -gt 0 ]]; then
  echo -e "${RED}Validation failed: $ERRORS error(s), $WARNINGS warning(s)${NC}"
  exit 1
elif [[ $WARNINGS -gt 0 ]]; then
  echo -e "${YELLOW}Validation passed with $WARNINGS warning(s)${NC}"
  exit 0
else
  echo -e "${GREEN}Validation passed!${NC}"
  exit 0
fi
