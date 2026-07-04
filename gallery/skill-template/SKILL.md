---
name: your-skill-name
description: One clear sentence describing what this skill does and when the LLM should use it.
metadata:
  homepage: https://saikirantechy.github.io/Gemma-4-blr
# Uncomment below if your skill needs a secret (API key, token, etc.):
# require-secret: true
# require-secret-description: Go to [service] settings to copy your API key.
---

# Your Skill Name

Brief 1–2 sentence description of the skill's value and audience.

## Capabilities

### 1. [Primary Capability]
When the user asks [describe the trigger]:
- [What Gemma should do]
- [How to format the response]
- [Any special handling]

### 2. [Secondary Capability]
When the user asks [describe the trigger]:
- [What Gemma should do]

<!-- For JS skills only — delete this section for text-only skills -->
## JS Tool Instructions
Call the `run_js` tool with:
- script name: `index.html` (optional — default if omitted)
- data: A JSON string with:
  - **param1**: Description. Type. Required/Optional.
  - **param2**: Description. Type. Required/Optional.

After the tool returns, [describe what Gemma should do with the result].
<!-- End JS section -->

## Trigger Phrases
List the user inputs that should activate this skill:
- "Example trigger phrase 1"
- "Example trigger phrase 2"
- "Keyword that maps to this skill"

## Response Format
- Describe expected output structure (headers, bullets, tables, code blocks)
- Keep responses mobile-friendly — avoid walls of text
- Specify any special formatting (e.g., always use a table for action items)

## Constraints
- Privacy: state what data stays on-device
- Length: keep responses under [N] words for mobile readability
- Edge cases: what to do if input is ambiguous or missing
- Any content restrictions
