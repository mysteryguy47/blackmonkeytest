# BlackMonkey STEM Education Platform

## Overview

BlackMonkey is a modern, futuristic STEM education website designed for children, offering interactive courses in paper circuits, robotics, IoT, and drones. The platform features a gamified learning experience with smooth animations, bold design elements, and an engaging user interface that makes science and technology education exciting and accessible.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing (Home, CoursePage, NotFound)
- **Framer Motion** for smooth animations and interactive effects throughout the application

**UI Component System**
- **shadcn/ui** component library with Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- Custom theming system supporting dark mode with CSS variables for colors, spacing, and effects
- Design follows "futuristic minimalism" aesthetic with neon accents (purple, cyan, pink) and sci-fi elements

**State Management & Data Fetching**
- **TanStack Query (React Query)** for server state management and API data caching
- Custom query client configuration with optimized refetch behavior
- Form handling via **React Hook Form** with **Zod** schema validation

**Design System**
- Typography hierarchy using Inter, Space Grotesk, and JetBrains Mono fonts
- Consistent spacing primitives (Tailwind units: 2, 4, 8, 12, 16, 24, 32)
- Custom color palette with neon accents and comprehensive HSL-based theming
- Responsive grid system (3-column desktop, 2-column tablet, single-column mobile)

### Backend Architecture

**Server Framework**
- **Express.js** server with TypeScript for API endpoints
- Middleware for JSON parsing, URL encoding, and request logging
- Custom logging system tracking request duration and response data
- HTTP server creation with route registration pattern

**Storage Layer**
- In-memory storage implementation (`MemStorage`) for development
- Interface-based storage pattern (`IStorage`) allowing easy swapping to database implementations
- CRUD operations abstracted through storage interface

**Development Environment**
- Vite middleware integration for development mode
- Hot module replacement (HMR) over HTTP server
- Custom error handling with Replit-specific plugins (runtime error overlay, cartographer, dev banner)

### Database Schema

**ORM & Migrations**
- **Drizzle ORM** configured for PostgreSQL with schema-first approach
- Schema definitions in TypeScript with Zod validation integration
- Migration support via drizzle-kit

**Data Models**
- **Courses**: Educational course offerings with metadata (code, name, description, features, learning outcomes)
- **Testimonials**: Student/parent reviews with ratings
- **Stats**: Platform statistics for display
- **Users**: Basic user authentication schema
- **Enrollments**: Course enrollment tracking with student and parent information

**Database Provider**
- Configured for **Neon Database** serverless PostgreSQL
- Connection pooling via `@neondatabase/serverless`
- Environment-based configuration with DATABASE_URL

### Project Structure

**Monorepo Layout**
- `/client`: Frontend React application
  - `/src/components`: Reusable UI components and shadcn/ui library
  - `/src/pages`: Route-level page components
  - `/src/lib`: Utility functions and query client configuration
  - `/src/hooks`: Custom React hooks
- `/server`: Express backend
- `/shared`: Shared TypeScript types and schemas (Drizzle schemas, Zod validators)
- Path aliases configured: `@/` for client source, `@shared/` for shared code

## External Dependencies

### Core Framework Dependencies
- **React & React DOM** (v18+): UI framework
- **Express**: Backend HTTP server
- **TypeScript**: Type safety across full stack

### Database & ORM
- **Drizzle ORM** (`drizzle-orm`, `drizzle-zod`): Type-safe database operations
- **@neondatabase/serverless**: PostgreSQL driver for Neon Database
- **drizzle-kit**: Database migrations and schema management

### UI Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives (accordion, dialog, dropdown, popover, etc.)
- **shadcn/ui**: Pre-built component patterns on top of Radix UI
- **Framer Motion**: Animation library for smooth transitions and interactive effects
- **Embla Carousel**: Carousel/slider functionality
- **cmdk**: Command palette component

### Styling & Theming
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **clsx** & **tailwind-merge**: Utility for conditional class composition

### Form Management
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Schema validation integration
- **Zod**: TypeScript-first schema validation

### Development Tools
- **Vite**: Build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundler for server code
- **@replit/vite-plugin-***: Replit-specific development plugins

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **wouter**: Lightweight routing library

### Session Management
- **express-session**: Session middleware
- **connect-pg-simple**: PostgreSQL session store