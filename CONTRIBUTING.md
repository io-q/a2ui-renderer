# Contributing to A2UI Renderer

Thank you for your interest in contributing to the A2UI Renderer project! We welcome contributions from the community.

## Prerequisites

- [Bun](https://bun.sh) (v1.0.0 or later)
- Git

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:io-q/a2ui-renderer.git
    cd a2ui-renderer
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Run the demo app:**
    ```bash
    cd apps/demo
    bun run dev
    ```

## Development Workflow

This project is a monorepo managed by Bun workspaces.

- **`packages/*`**: Contains the source code for the published packages.
- **`apps/*`**: Contains example applications and tools.

### Running Tests

To run tests for all packages:

```bash
bun test
```

### Building Packages

To build all packages:

```bash
bun run build
```

## Pull Requests

1.  Fork the repository and clone your fork.
2.  Create a new branch for your feature or bug fix: `git checkout -b my-feature`.
3.  Make your changes and ensure tests pass.
4.  Commit your changes with clear messages.
5.  Push to your fork and submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
