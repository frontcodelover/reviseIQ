# WARNING Work In Progress

# ReviseIQ 📚

ReviseIQ is a modern flashcard application that helps students learn and revise more effectively using AI-powered flashcards and quizzes.

## Features ✨

- AI-powered flashcard generation
- Quiz mode with multiple choice questions
- Manual flashcard creation
- Public and private decks
- Progress tracking
- Community sharing
- User profiles and achievements
- Responsive design

## Technologies 🛠

- React + TypeScript
- Tailwind CSS
- Supabase (Backend & Auth)
- Mistral AI API
- i18n (English/French)
- Shadcn/ui components

## Getting Started 🚀

### Prerequisites

- Node.js (v16+)
- npm
- Supabase account
- Mistral AI API key

## Architecture 🏗

### Clean Architecture Layers

1. **Domain Layer**

   - Core business logic
   - Entities (User, Flashcard, Quiz)
   - Repository interfaces

2. **Application Layer**

   - Use cases (CreateFlashcard, GenerateQuiz)
   - Application services
   - DTOs

3. **Infrastructure Layer**

   - Supabase implementations
   - External services (Mistral AI)
   - Repository implementations

4. **Presentation Layer**
   - React components
   - Pages
   - Routing
   - UI state management

### Key Design Patterns

- Repository Pattern
- Dependency Injection
- Factory Pattern
- Command Pattern (for use cases)
