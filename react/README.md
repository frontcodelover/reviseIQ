# WARNING Work In Progress

Style migration WIP for MUI.

# ReviseIQ 📚

ReviseIQ is a modern flashcard application that helps students learn and revise more effectively using AI-powered flashcards and quizzes.

## Features ✨

- AI-powered flashcard generation using Mistral AI
- Quiz mode with multiple choice questions
- Manual flashcard creation
- Public and private decks
- Progress tracking
- Community sharing
- User profiles and achievements
- Responsive design

## Technologies 🛠

- React + TypeScript
- <del>MUI</del> => Tailwind + ShadCN
- Supabase (Backend & Auth)
- Mistral AI API
- i18n (English/French)

## Getting Started 🚀

### Prerequisites

- Node.js (v16+)
- npm
- Supabase account
- Mistral AI API key (VITE_MISTRAL_API_KEY)

### Environment Variables

- VITE_MISTRAL_API_KEY: API key for Mistral AI
- Supabase URL and Anon Key (configured in Supabase)

## Architecture 🏗

### Clean Architecture Layers

1. **Domain Layer**

   - Core business logic
   - Entities ([`Flashcard`](src/domain/entities/Flashcard.ts), User, Quiz)
   - Value Objects
   - Aggregates
   - Repository interfaces ([`FlashcardRepository`](src/domain/repositories/FlashcardRepository.ts))

2. **Application Layer**

   - Use cases (CreateFlashcard, GenerateQuiz, CreateFolder...)
   - Application services
   - Interfaces
   - DTOs => need refactor

3. **Infrastructure Layer**

   - Supabase implementations (e.g. :[`SupabaseFlashCardRepository`](src/infrastructure/backend/SupabaseFlashcardRepository.ts))
   - External services (Mistral AI)
   - Adapters
   - Persistence logic => lang & theme

4. **Presentation Layer**

   - React components
   - Pages
   - Layouts
   - Hooks
   - UI state management

### Key Design Patterns

- Repository Pattern
- Dependency Injection
- Factory Pattern
- Command Pattern (for use cases)

## TypeScript Standards

- Strict mode enabled
- Functional components preferred
- Unit tests with Jest (authentication logic)
- Integration tests with React Testing Library
- Zod validation

## Security

- Supabase Auth for authentication
- Role-based access control
- Zod for input validation
- Sanitization

## Performance

- Code splitting with React.lazy and Suspense
- Memoization
- List virtualization
- Supabase query optimization
- Type-safe data fetching

## Flashcard Generation

- AI-powered flashcard generation using Mistral AI
- JSON strict format
- Error handling

## Additional Notes

- ESLint with TypeScript and React plugins for linting
- Prettier for code formatting
- MUI components for UI elements
