<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hallmark Design System (Anti-AI-Slop)

Whenever designing, building, redesigning, or auditing UI components, pages, or landing experiences, ALWAYS load and follow the Hallmark skill at [.agents/skills/hallmark/SKILL.md](file:///Users/sachin/Desktop/bot-by-anurag/.agents/skills/hallmark/SKILL.md):
- **Structural Variety**: Avoid predictable hero -> 3 cards -> CTA templates. Each page must have bespoke rhythm and macrostructural variety tailored to the domain.
- **Pre-emit Self-Critique**: Score outputs across Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety.
- **Honest Copy**: Zero fabricated metrics or synthetic proof bars. Use honest domain-specific copy.
- **Locked Tokens**: Strictly reference declared CSS variables (`var(--blurple)`, `var(--bg-card)`, etc.). Never improvise arbitrary one-off color hexes mid-render.
- **Forbidden Re-drawn Chrome**: Never hand-craft fake browser bars (URL pills + traffic light dots) or faux device frames.
- **Mobile Responsiveness**: Hard guarantee at 320px, 375px, 414px, and 768px with `overflow-x: clip`, zero two-line buttons, and responsive grid tracks `minmax(0, 1fr)`.
- **Typography Purity**: Headings and display text are always roman (`font-style: normal`), never italicized.

