#!/bin/bash

echo "🚀 Setting up FIBS College Monorepo..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm@latest
fi

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Create environment file
echo "Creating environment file..."
cat > .env << EOF
NODE_ENV=development
PORT=3001
EOF

echo "✅ Setup complete!"
echo ""
echo "📁 Available commands:"
echo "  pnpm dev              # Start all apps"
echo "  pnpm --filter @fibs/web dev  # Start web app"
echo "  pnpm --filter @fibs/api dev  # Start API"
echo "  pnpm build            # Build all apps"
echo "  pnpm test             # Run tests"
echo ""
echo "🌐 Development URLs:"
echo "  Web: http://localhost:3000"
echo "  API: http://localhost:3001"
echo ""
