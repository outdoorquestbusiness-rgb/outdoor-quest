# Trail Quest Mobile Adventure Application

## Overview

Trail Quest is an immersive mobile hiking game application that transforms outdoor adventures into engaging mystery-solving experiences. The app allows users to participate in location-based treasure hunts featuring riddles, puzzles, and interactive challenges. Built as a full-stack web application optimized for mobile devices, it provides an adventure gaming experience centered around hiking trails, specifically featuring "Panique au Môle" - a mystery adventure on Mont Môle.

The application combines outdoor exploration with digital gaming elements, offering structured missions with multiple chapters, progressive difficulty levels, and scoring systems to enhance the hiking experience through gamification.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using React with TypeScript, utilizing Vite as the build tool for optimal development experience and performance. The application follows a modern component-based architecture with:

- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: React hooks with custom game state management for progress tracking
- **Data Fetching**: TanStack Query for server state management and caching
- **Internationalization**: Custom language switching between French and English

The frontend implements a mobile-first responsive design optimized for touch interactions during outdoor activities.

### Backend Architecture
The server follows a RESTful API pattern built with Express.js and TypeScript:

- **API Design**: RESTful endpoints for missions, user progress, and contact management
- **Database Layer**: Abstracted storage interface supporting both in-memory storage for development and PostgreSQL for production
- **Session Management**: Express session handling with PostgreSQL session store
- **Development Setup**: Vite integration for hot module replacement in development

### Data Storage Solutions
The application uses a flexible storage architecture:

- **Production Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Development Storage**: In-memory storage implementation for rapid development
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Client Storage**: Local storage for game progress persistence and offline capability

Key data models include missions (game scenarios), user progress tracking, and contact messages.

### Authentication and Authorization
Currently implements a simplified session-based approach suitable for demo and development:

- **Session Management**: Express sessions with PostgreSQL storage
- **User Identification**: Demo user system for progress tracking
- **Access Control**: Mission access via access codes

### Game Logic Architecture
The application implements a structured gaming experience:

- **Mission System**: Hierarchical structure with missions containing multiple chapters
- **Progress Tracking**: Real-time progress updates with scoring, timing, and hint usage
- **State Persistence**: Local storage backup for offline progress retention
- **Scoring Algorithm**: Points-based system with penalties for hints and time bonuses

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production environments
- **PostgreSQL**: Primary database system with Drizzle ORM integration

### UI and Design Libraries
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **shadcn/ui**: Pre-built component library for consistent interface
- **Lucide React**: Icon library for UI elements

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **Replit Integration**: Development environment support with cartographer and error overlay plugins
- **TypeScript**: Type safety across the entire application stack

### Form and Validation
- **React Hook Form**: Form management with validation
- **Zod**: Runtime type validation and schema definition
- **Drizzle Zod**: Integration between Drizzle schemas and Zod validation

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class management
- **class-variance-authority**: Component variant management for styled components

The architecture prioritizes mobile performance, offline capability, and scalable game content management while maintaining type safety throughout the development process.

## Deployment Configuration

### Render Deployment
The application is configured for seamless deployment on Render with:

- **Build System**: Vite frontend build + ESBuild server compilation
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`
- **Port Configuration**: Automatic PORT environment variable handling
- **Static Serving**: Production mode serves built assets from `/dist/public`
- **Node.js Version**: 20.x LTS compatibility

### Build Process
1. **Frontend Build**: Vite compiles React app to `/dist/public`
2. **Backend Build**: ESBuild bundles Express server to `/dist/index.js`
3. **Asset Optimization**: CSS/JS minification and chunking
4. **Production Mode**: Static file serving with proper caching headers

### Deployment Files
- `render.yaml`: Infrastructure as Code configuration
- `Dockerfile`: Container deployment option
- `DEPLOY.md`: Complete deployment guide
- `DEPLOYMENT_CHECKLIST.md`: Pre/post deployment validation

### Production Features
- In-memory storage (no database required for demo)
- Mobile-optimized bundle size (~100KB gzipped)
- Progressive loading and caching
- Automatic SSL certificate provisioning
- Custom domain support ready