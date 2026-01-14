---
layout: home

hero:
  name: "a2ui-renderer"
  text: "React for Agents"
  tagline: The protocol to stream UI from LLMs to your React app.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/io-q/a2ui-renderer

features:
  - title: Stream-to-UI
    details: Render React components token-by-token as the AI generates them.
  - title: Use Your Components
    details: Supports Shadcn UI, Material UI, or your own design system out of the box.
  - title: Type-Safe Protocol
    details: Uses the standard A2UI protocol for robust, verifiable UI generation.
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Console hello world
  console.log('Welcome to a2ui-renderer docs')
})
</script>

## Why a2ui-renderer?

Most "AI UI" solutions force you to use their components or proprietary SDKs. **a2ui-renderer** is different:

1.  **You define the components** (using standard React).
2.  **We generate the schema** (using `@a2ui-renderer/scanner`).
3.  **The AI streams the JSON**.
4.  **We render it instanty**.

[Get Started →](/guide/getting-started)
