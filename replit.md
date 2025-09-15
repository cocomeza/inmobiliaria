# Overview

This is a comprehensive real estate web application for Diego Nadal Inmobiliaria, built as a modern React-based property listing and management platform. The application serves the Argentine real estate market with localized content, Spanish language interface, and USD pricing. It features a responsive design with property browsing, filtering, detailed views, and administrative capabilities for managing listings.

## Recent Changes (September 12, 2025)
- **Railway Deployment Completed**: Successfully deployed to production on Railway platform
- **Two-Service Architecture**: Separated frontend and backend into independent Railway services
- **Backend**: https://inmobiliaria-fullstack-production-069c.up.railway.app
- **Frontend**: https://inmobiliaria-react-ts-production.up.railway.app
- **Environment Variables**: Configured JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD for backend
- **Node.js Version**: Fixed Node v20 requirement for Vite 7 compatibility
- **Package Dependencies**: Resolved package-lock.json sync issues and missing dependencies
- **CORS Configuration**: Updated for Railway domains (/.railway.app$/) support

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client application is built with React 19 and TypeScript, utilizing Vite as the build tool for optimal development experience and production builds. The architecture follows a component-based approach with clear separation between reusable components (`components/`) and page-level components (`pages/`).

**Key Frontend Decisions:**
- **Routing**: Uses Wouter instead of React Router for lightweight, efficient client-side routing
- **State Management**: Implements React Query (@tanstack/react-query) for server state management and data fetching
- **UI Framework**: Bootstrap 5 with React-Bootstrap components for consistent, responsive design
- **Styling**: Custom CSS theme system with CSS custom properties for brand colors (Armadillo #434036, Chino #D1C5AB, Glacier #84B0CB, Ship Cove #6787B7)
- **Animations**: AOS (Animate On Scroll) library for smooth scroll-based animations
- **Icons**: FontAwesome for consistent iconography across the application

## Backend Architecture
Express.js server with TypeScript, designed to handle property data management and file uploads. The server includes CORS configuration for cross-origin requests and serves static files from an uploads directory.

**Key Backend Decisions:**
- **Data Persistence**: Simple JSON file-based storage system for property data
- **File Uploads**: Multer middleware for handling property image uploads
- **API Design**: RESTful API structure for property CRUD operations
- **Development**: Uses tsx for TypeScript execution in development mode

## Component Structure
- **Layout Components**: Navbar with active route detection, responsive Footer with social links
- **Content Components**: Hero section with background image, Services showcase, About section
- **Property Components**: PropertyCard for listings, PropertyDetail with image carousel
- **Interactive Components**: Filters for property search, WhatsApp floating button
- **Administrative**: Admin panel for property management

## Data Management
Properties are stored as JSON with schema including id, title, description, price in USD, images array, type, and status. The application supports local development with mock data and production API integration.

# External Dependencies

## Core Dependencies
- **React 19** with TypeScript for component development
- **Vite** as build tool and development server
- **Express.js** for backend API server
- **Bootstrap 5** and **React-Bootstrap** for UI components and responsive grid

## Specialized Libraries
- **Wouter** for lightweight client-side routing
- **@tanstack/react-query** for server state management and caching
- **react-hook-form** with **@hookform/resolvers** for form handling and validation
- **Zod** for schema validation and type safety
- **Drizzle ORM** for potential database integration (currently using JSON files)

## UI and UX Libraries
- **AOS (Animate On Scroll)** for scroll-triggered animations
- **FontAwesome** (free-solid and free-brands) for icons
- **Leaflet** with **react-leaflet** for interactive maps
- **React Bootstrap** for pre-built responsive components

## Development Tools
- **TypeScript** for type safety across both client and server
- **tsx** for TypeScript execution in development
- **concurrently** for running client and server simultaneously
- **ESLint** with React and TypeScript configurations

## File Handling
- **Multer** for handling multipart/form-data file uploads
- **CORS** middleware for cross-origin resource sharing

## Potential Database Integration
The application is structured to support database integration through Drizzle ORM, though currently operates with JSON file storage for simplicity in development and deployment scenarios.