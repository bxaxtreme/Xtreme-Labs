# Hallmark Design Skill Rule

Whenever designing, building, redesigning, or auditing web pages, landing experiences, or UI components:

1. **Load Hallmark Skill**:
   - Skill Path: [.agents/skills/hallmark/SKILL.md](file:///Users/sachin/Desktop/bot-by-anurag/.agents/skills/hallmark/SKILL.md)
   - Read the skill file using `view_file` whenever working on frontend layout, styling, typography, or visual components.

2. **Core Hallmark Disciplines (Anti-AI-Slop)**:
   - **Structural Variety**: Reject cookie-cutter hero → 3-cards → CTA → footer templates. Each page must have bespoke section rhythm and macrostructural variety tailored to the domain.
   - **Pre-emit Self-Critique**: Score outputs across Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety before finalizing.
   - **Honest Copy & Real Data**: Zero fabricated metrics (no fake "+47% conversion" or "50,000+ teams"). Use honest domain-specific copy.
   - **Locked Tokens**: Strictly reference declared CSS variables (`var(--blurple)`, `var(--bg-card)`, etc.). Never improvise arbitrary one-off color hexes mid-render.
   - **No Re-drawn Chrome**: Never hand-craft fake browser bars (URL pills + traffic light dots) or faux device frames.
   - **Mobile Responsiveness**: Hard guarantee at 320px, 375px, 414px, and 768px with `overflow-x: clip`, zero two-line buttons, and responsive grid tracks `minmax(0, 1fr)`.
   - **Typography Purity**: Headings and display text are always roman (`font-style: normal`), never italicized.
