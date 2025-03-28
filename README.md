# Book Store Testing Data Generator

A Next.js application for generating realistic book store test data with multi-language support and customizable parameters.

## Development Status

Currently in active development. The core functionality is implemented and working.

### Upcoming Features

- Responsive table design
- Locales change all data
- CSV export functionality
- Gallery view alternative
- Enhanced Faker dictionaries for more diverse data generation
- TODO items resolution
- MVC pattern compliance improvements
- Zod validation for environment variables
- Debounce implementation for user inputs
- Auto-scroll reset on user interaction dependencies change

## Live Demo

Visit: [Your deployed app URL]

## Features

- Multi-language Support
    - Support for English (USA), German (Germany), and other regions
    - Region-specific book titles, authors, and reviews
- Data Generation Controls
    - Customizable seed value with random generation option
    - Adjustable likes per book (0-10, supports decimals)
    - Configurable reviews per book (supports fractional values)
- Dynamic Data Display
    - Infinite scroll table with 20 initial records
    - Expandable book details with cover images
    - Optional gallery view

## Technical Details

Server-side data generation with deterministic results based on seed values. No database required.

## Data Fields

- Index number
- ISBN (randomly generated)
- Book title
- Author(s)
- Publisher

## Getting Started

1. Clone the repository
2. Install dependencies with pnpm
3. Run the development server

## Available Commands

```bash
# Development
pnpm start:dev      # Run with Turbopack
pnpm start          # Start production server
pnpm start:build    # Build with increased memory

# Code Quality
pnpm format         # Format all files
pnpm lint          # Check TypeScript files
pnpm lint:fix      # Fix TypeScript files
pnpm stylelint     # Check styles
pnpm stylelint:fix # Fix styles

# FSD Architecture
pnpm fsd:check    # Check FSD structure
pnpm fsd:watch    # Watch FSD changes
pnpm fsd:cruise   # Generate dependencies graph

# Other
pnpm prepare      # Setup husky
```

## Architecture

The project follows Feature-Sliced Design (FSD) methodology:
- `app` - Application initialization logic
- `pages` - Page components
- `widgets` - Independent and reusable feature blocks
- `features` - User interactions
- `entities` - Business logic
- `shared` - Reusable components and utils

![2025-03-28_05-01-56](https://github.com/user-attachments/assets/7614625e-9efc-4eb6-8342-9f6bfe29cf84)


## Libraries and Tools

- **Faker.js**: Used for generating realistic random data in multiple languages
- **TanStack Table**: Powers the virtual table functionality with infinite scroll
- **TanStack Virtual**: Handles virtualization for efficient large dataset rendering
- **TanStack Infinite**: Implements infinite scrolling capabilities
- **Radix UI**: Provides accessible, unstyled UI components for building the interface

These libraries ensure:
- Realistic data generation across multiple languages
- Efficient handling of large datasets
- Smooth scrolling performance
- Accessible and customizable UI components

## Important Notes

- Use third-party libraries for data generation (e.g., Faker)
- Focus on realistic, language-appropriate content
- No authentication required
