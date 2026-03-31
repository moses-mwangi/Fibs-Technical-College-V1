# Monorepo Setup Guide

This guide walks through setting up the FIBS Technical College monorepo.

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Start development
pnpm dev
```

## Environment Setup

### Node.js
Required: Node.js 18.0.0 or higher

### pnpm
Required: pnpm 8.0.0 or higher

```bash
# Install pnpm
npm install -g pnpm@latest

# Verify installation
pnpm --version
```

## IDE Configuration

### VS Code

Install these extensions:
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- Tailwind CSS IntelliSense

### Workspace Configuration

The monorepo uses TypeScript project references. Your IDE should:

1. Open the root folder as workspace
2. Install TypeScript extension
3. Enable "TypeScript: Enable workspace type checking"

## Common Commands

### Development
```bash
# Start all apps
pnpm dev

# Start specific app
pnpm --filter @fibs/web dev
pnpm --filter @fibs/api dev
```

### Building
```bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter @fibs/web build
```

### Testing
```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test --coverage
```

### Code Quality
```bash
# Lint all packages
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

## Package Management

### Adding New Packages

1. Create package in appropriate directory
2. Add to pnpm-workspace.yaml
3. Update package.json with workspace dependencies

### Workspace Dependencies

- `@repo/*` - Internal packages
- External packages go in dependencies

## Troubleshooting

### Common Issues

**TypeScript errors in workspace packages:**
- Run `pnpm install` to update references
- Restart TypeScript server in IDE

**Build failures:**
- Clear turbo cache: `pnpm clean`
- Check for circular dependencies

**Development issues:**
- Ensure all workspace dependencies are installed
- Check pnpm-workspace.yaml configuration
