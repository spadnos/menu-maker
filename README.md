# Menu Maker - Interactive Bistro Menu

An elegant, interactive menu application for bistros with customer-facing display and admin management portal.

## Features

- 🍽️ **Customer Menu Display**: Browse menu items organized by category
- 🔍 **Smart Search**: Search by name, description, or ingredients with debounced real-time results
- 📖 **Recipe Details**: View detailed recipes with ingredients and cooking instructions
- 👨‍💼 **Admin Portal**: Manage menu items, recipes, and categories
- 🖼️ **Image Management**: Upload and display menu item images
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **UI**: shadcn/ui, Tailwind CSS
- **Testing**: Playwright (E2E), Vitest (unit)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd menu-maker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   Get these values from your [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API

4. **Set up the database** (coming in next tasks)

   ```bash
   # Apply migrations
   npx supabase db push

   # Seed with sample data
   npm run db:seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
menu-maker/
├── app/                    # Next.js App Router pages
│   ├── (customer)/        # Customer-facing routes
│   ├── admin/             # Admin portal routes
│   └── api/               # API routes (if needed)
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── customer/         # Customer-facing components
│   └── admin/            # Admin components
├── lib/                   # Utilities and clients
│   ├── supabase/         # Supabase client setup
│   ├── hooks/            # Custom React hooks
│   └── validations/      # Zod schemas
├── tests/                 # Test files
│   ├── e2e/              # Playwright E2E tests
│   ├── integration/      # Integration tests
│   └── unit/             # Unit tests
├── supabase/             # Database migrations and seed data
└── specs/                # Feature specifications and planning docs
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test:e2e` - Run Playwright E2E tests (coming soon)
- `npm run test:unit` - Run Vitest unit tests (coming soon)

## Development Workflow

This project follows Test-Driven Development (TDD):

1. Write tests first
2. Run tests (they should fail)
3. Implement features to make tests pass
4. Refactor and optimize

See `specs/001-build-an-aplication/tasks.md` for the complete implementation plan.

## Documentation

- [Feature Specification](./specs/001-build-an-aplication/spec.md)
- [Implementation Plan](./specs/001-build-an-aplication/plan.md)
- [Data Model](./specs/001-build-an-aplication/data-model.md)
- [API Contracts](./specs/001-build-an-aplication/contracts/supabase-api.md)
- [Quickstart Guide](./specs/001-build-an-aplication/quickstart.md)

## License

ISC

## Contributing

1. Follow the TDD workflow
2. Ensure all tests pass before submitting
3. Follow the code style (ESLint + Prettier)
4. Update documentation as needed
