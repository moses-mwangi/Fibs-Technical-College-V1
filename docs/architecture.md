# FIBS Technical College Monorepo

A production-ready monorepo built with pnpm workspaces and Turborepo.

## Architecture

```
fibs-college-monorepo/
├── apps/
│   ├── web/           # Next.js frontend application
│   ├── api/           # Node.js API server
│   ├── admin/         # Admin dashboard (Next.js)
│   └── worker/        # Background job processor
├── packages/
│   ├── ui/            # Shared React components
│   ├── utils/          # Shared utilities
│   ├── types/          # Shared TypeScript types
│   ├── api-client/     # API client utilities
│   ├── eslint-config/  # ESLint configurations
│   ├── typescript-config/ # TypeScript configurations
│   ├── tailwind-config/ # Tailwind CSS configuration
│   └── next-config/    # Next.js configuration
├── infra/
│   ├── docker/         # Docker configurations
│   ├── kubernetes/    # K8s manifests
│   └── terraform/     # Infrastructure as code
├── tools/
│   ├── scripts/        # Build and deployment scripts
│   └── generators/     # Code generators
└── docs/
    ├── architecture.md  # Architecture documentation
    └── setup.md       # Setup instructions
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fibs-college-monorepo

# Install dependencies
pnpm install

# Start development
pnpm dev
```

## Development

### Running Apps

```bash
# Start all apps in development mode
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

# Run tests for specific app
pnpm --filter @fibs/web test
```

## Deployment

Each app can be deployed independently:

### Web App
```bash
cd apps/web
pnpm build
# Deploy .next directory
```

### API
```bash
cd apps/api
pnpm build
# Deploy dist directory
```

## Workspace Dependencies

- `@repo/ui` - Shared React components
- `@repo/utils` - Shared utilities and server setup
- `@repo/types` - Shared TypeScript types
- `@repo/api-client` - API client utilities

## Scripts

- `dev` - Start all apps in development
- `build` - Build all apps
- `lint` - Lint all packages
- `test` - Run all tests
- `clean` - Clean build artifacts
- `format` - Format code with Prettier
