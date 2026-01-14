# Core Concepts

A2UI is more than just a renderer; it's a protocol for safe, deterministic, and streaming UI generation from AI agents.

## The Problem

When building Generative UI, you often face a dilemma:
1.  **Raw HTML**: Asking the LLM to write HTML/JSX is flexible but unsafe (XSS risks) and often broken (hallucinated classes/tags).
2.  **Hardcoded Widgets**: Manually mapping JSON to components is tedious and hard to maintain.

## The A2UI Solution

A2UI sits in the middle: **"The Bridge"**.

### 1. Safety & Determinism
Instead of code, the AI generates a strict JSON schema. The `a2ui-renderer` validates this schema against your *actual* React components. If the AI "hallucinates" a prop that doesn't exist, the renderer catches it safely.

### 2. Streaming (The "Magic")
The A2UI protocol is designed to be streamed. React components can render *partially* as the JSON arrives.
*   **Token 1**: `{ "type": "Card", "loading": true }` -> Renders a Skeleton Card.
*   **Token 10**: `{ "type": "Card", "title": "Weather" ... }` -> Updates title.
*   **Token 50**: `{ ... "children": [ ... ] }` -> Renders children.

This "stream-to-UI" capability makes the AI feel instantaneous.

## Architecture

![Architecture Diagram](https://mermaid.ink/img/pako:eNptkU9rwzAMxb9K0KmDsf45FAZ72GHYYdcOBiO4tq3EloMtaStl9NvnyE0K3U0Sj5_09GQ9oTGlQoO-d2Lw5jF41D8zKjT-vH0w_X11Y_p8v-X9Q_f0_PzK-ziw4bB7gY-Pj1f4OLCh3W7hD5_H45F3uz18_3i8wcfAhk6ng398Ho_H_P1-D99_eLzBx8CGfr-Hf30ej8f84_EIP_7yeIOPgQ3D4RD__Dwej_nX6xV-_O3xBh8DG8bjMf79eTwe8-v1Cj_85fEGHwMbxuMx_v15PB7z6_UKP_zl8Qf8_f0Nf_k8Ho_55XKBH_7yeIOPgQ0T-s9kMplM5u_v7_B3z-PxmJ_PZ_jhL483-BjYMB1P-A94enr6B7zB3z0fT-B_wBv83bPZDP4HvMHfPZvN4H_AG_zds9kM_ge8wd89m83gf8Ab_N2z2Qz-B7zB3z2bbW1D79wI3g3W2QhGaxuMtxaMstZbp63dWGutM7a1jta21jra2FrraGNrraONrbWONrbWOtrYavsFvbexaw?type=png)

1.  **Scanner**: Reads your source code -> Generates `catalog.json` (Tools for AI).
2.  **AI Agent**: Receives User Prompt + `catalog.json` -> Generates A2UI JSON Stream.
3.  **Renderer**: Receives JSON Stream -> Renders React Components.
