# Users List Application

React application for displaying a list of users with search, pagination, and various display modes.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation and Running
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Features

### Core Functionality
- **User Search** with debounced input
- **Pagination** with debounced navigation
- **Two Display Modes**: Grid and Table
- **URL Synchronization** of search and pagination state
- **Responsive Design** for all devices

### Technical Features
- **Feature-Sliced Design (FSD)** architecture
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vite** for building
- **ESLint** for code quality control
- **React Hooks** for state management
- **Universal Async Operations** with useAsyncOperation hook
- **Reusable UI Components** with proper state management

## 🏗️ Project Structure

```
src/
├── app/                    # Root components and global styles
├── pages/                  # Application pages
│   └── users/              # Users list page
├── features/               # Features
│   └── users-list/         # Users list feature
│       ├── model/          # Types and interfaces
│       ├── lib/            # Hooks and utilities
│       └── ui/             # Feature components
├── entities/               # Entities
│   └── user/               # User entity
├── shared/                 # Shared resources
│   ├── ui/                 # UI components
│   │   ├── states/         # Loading, Empty, Error states
│   │   ├── data-list/      # Universal data list component
│   │   └── ...
│   ├── lib/                # Utilities and hooks
│   └── api/                # API types
```

## 🧪 Testing

### Configured Tests
The project is covered with unit tests for key components and utilities:

```bash
# Run all tests
npm run test

# Run with UI interface
npm run test:ui

# Run specific tests
npm run test:run
```

### Test Coverage

#### ✅ Utilities and Hooks
- **`debounce`** - delay function verification
- **`useUrlQuery`** - URL parameters management
- **`useAsyncOperation`** - async state management

#### ✅ UI Components
- **`SearchInput`** - rendering, onChange, disabled state
- **`Paginator`** - pagination, page navigation
- **`DataList`** - universal list rendering
- **State Components** - LoadingState, EmptyState, ErrorState

## 🛠️ Available Scripts

```bash
npm run dev           # Run in development mode
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run lint:css      # Check CSS properties with Stylelint
npm run type-check    # Check TypeScript
npm run test          # Run tests in watch mode
npm run test:ui       # Run tests with UI interface
npm run test:run      # Run tests once
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

## 🎨 UI Components

### Reusable Components
- **SearchInput** - search field with icon
- **Paginator** - pagination with ellipsis
- **Loader** - loading indicator
- **UserCard** - user card component
- **UsersTable** - users table component
- **DataList** - universal data list component
- **LoadingState** - reusable loading state
- **EmptyState** - reusable empty state
- **ErrorState** - reusable error state

### Custom Hooks
- **useUrlQuery** - URL parameters management
- **useAsyncOperation** - universal async state management
- **debounce** - utility for debounced calls

## 📱 Responsiveness

- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns
- **Large Desktop**: 4 columns

## 🔧 Development

### Code Style and Formatting
- **Prettier** - automatic code formatting
- **ESLint** - code quality and FSD architecture checking
- **Stylelint** - CSS property checking and sorting
- **Import Sorting** - React → npm packages → project modules

### Git Blame
Formatting commits are ignored in `git blame` via `.git-blame-ignore-revs`.

**For developers:**
After cloning the repository, run:
```bash
git config blame.ignoreRevsFile .git-blame-ignore-revs
```

This allows you to see real code authors, not formatting commits.

### Adding New Components
1. Create component in the appropriate FSD directory
2. Export through index.ts
3. Use TypeScript types
4. Follow ESLint rules
5. Format code with `npm run format`

### Styling
- Use Tailwind CSS classes

## 🚀 Production Ready Features

### Architecture Improvements
- **Component Decomposition** - Split large components into smaller, reusable pieces
- **Universal State Management** - Consistent async operations with useAsyncOperation
- **Proper FSD Structure** - Correct layer organization and imports
- **Type Safety** - Comprehensive TypeScript typing
- **Request Cancellation** - AbortController support for async operations

### Reusable Components
- **State Components** - LoadingState, EmptyState, ErrorState for any use case
- **DataList Component** - Universal list component supporting grid, list, and table views
- **Async Operation Hook** - useAsyncOperation for consistent async state management

## 📦 Dependencies

Main dependencies:
- `react` ^19.0.0
- `react-dom` ^19.0.0
- `typescript` ^5.7.2
- `tailwindcss` ^4.0.0
- `vite` ^6.0.7

## 📝 License

MIT
