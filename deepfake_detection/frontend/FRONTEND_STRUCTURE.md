# DeepShield Frontend - Complete Structure & Architecture

## Project Overview

DeepShield is a React-based single-page application (SPA) for deepfake image detection. It features client-side routing, Google OAuth integration, and is designed to integrate with a Python FastAPI backend.

---

## Frontend Directory Structure

```
deepshield-detector/
├── src/
│   ├── App.jsx                    # Root component with routing
│   ├── main.jsx                   # React entry point
│   ├── globals.css                # Global styles & Tailwind
│   ├── pages/
│   │   ├── Landing.jsx            # Home page (Hero, Features, About)
│   │   ├── Auth.jsx               # Login/Signup page with Google OAuth
│   │   ├── Prompt.jsx             # Image detection interface
│   │   └── Demo.jsx               # Demo page with video placeholder
│   └── services/
│       └── api.js                 # API client with Axios
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite build configuration
├── tailwind.config.js             # Tailwind CSS theme config
├── postcss.config.js              # PostCSS configuration
├── package.json                   # Dependencies & scripts
└── .env.example                   # Environment variables template
```

---

## Page Components

### 1. Landing Page (`src/pages/Landing.jsx`)
**Purpose:** Homepage showcasing product features and value proposition

**Features:**
- Sticky navigation bar with menu toggle
- Hero section with CTA buttons
- Features showcase (3 feature cards)
- About section
- Footer with links

**Navigation Links:**
- Features section
- About section
- Demo page link
- Get Started → Auth page
- Try Now → Detection page

---

### 2. Auth Page (`src/pages/Auth.jsx`)
**Purpose:** User authentication with login/signup and Google OAuth

**Features:**
- Toggle between login and signup modes
- Email/password form fields
- Form validation
- Google OAuth integration
- GitHub OAuth button (UI ready)
- "Back to Home" button
- Remember me checkbox
- Forgot password link

**Key Functionality:**
- Email validation (format check)
- Password validation (min 6 characters)
- Google login integration
- Error/success messaging

---

### 3. Detection Page (`src/pages/Prompt.jsx`)
**Purpose:** Main application for image analysis and deepfake detection

**Features:**
- Message history display (user/assistant bubbles)
- File upload for images
- Image preview
- Detection analysis display
- Quick action buttons
- Loading animations
- Auto-scroll to latest messages
- Responsive chat-like interface

**Key Functionality:**
- Image selection and upload
- Real-time message updates
- File type validation
- Size validation

---

### 4. Demo Page (`src/pages/Demo.jsx`)
**Purpose:** Product demonstration with video placeholder and features overview

**Sections:**
- Navigation with back button
- Hero section with description
- Video placeholder (empty frame for manual video addition)
- Features section
- Use cases section
- How it works section with steps
- Call-to-action section

**Structure:**
- All sections use Tailwind CSS
- Responsive grid layouts
- Video frame ready for manual integration

---

## Routing Structure

**React Router Setup (`src/App.jsx`):**

```
/                 → Landing page (home)
/auth             → Authentication page (login/signup)
/prompt           → Detection page (main app)
/demo             → Demo page
```

**Routing Implementation:**
- BrowserRouter for client-side navigation
- Named routes for easy management
- 404 handling (implicit with current setup)

---

## Core Application Files

### `src/App.jsx` - Root Component
- Wraps entire app with GoogleOAuthProvider
- Sets up React Router with all routes
- Manages Google Client ID from environment
- Provides global authentication context

### `src/main.jsx` - Entry Point
- Renders React app into DOM (#root)
- Imports global styles (globals.css)
- Uses React.StrictMode for development warnings

### `src/globals.css` - Styling
- Tailwind CSS directives
- Custom color theme variables
- Scrollbar styling
- Font smoothing
- Base element styling

### `src/services/api.js` - API Client
- Axios-based HTTP client
- BaseURL configuration from env
- Request/response interceptors
- Authentication token handling
- All backend endpoints pre-configured

---

## Component Hierarchy

```
App
├── GoogleOAuthProvider
│   └── Router
│       └── Routes
│           ├── Route: / → Landing
│           ├── Route: /auth → Auth
│           ├── Route: /prompt → Prompt
│           └── Route: /demo → Demo
```

---

## Data Flow Architecture

### Authentication Flow
1. User lands on Landing page
2. Clicks "Get Started" → navigates to Auth
3. Chooses Google OAuth or Email/Password
4. On success → navigates to Prompt page
5. Auth token stored in localStorage

### Detection Flow
1. User on Prompt page selects image
2. Image uploaded via API service
3. Backend processes and analyzes
4. Results displayed in message bubble
5. User can upload more images

### Navigation Flow
- Landing page: Entry point with navigation
- Demo page: Accessible from Landing
- Auth page: Accessible from Landing & Prompt header
- Prompt page: Main app after authentication

---

## Styling System

### Tailwind CSS Configuration
- **Color Palette:**
  - Background: #0a0e27 (dark blue)
  - Foreground: #f5f7fb (light text)
  - Primary: #3b82f6 (blue)
  - Accent: #06b6d4 (cyan)
  - Secondary: #1e293b (dark slate)
  - Border: #334155 (gray)
  - Muted: #334155 (for secondary text)

- **Layout Approach:**
  - Flexbox for most layouts (rows/columns)
  - Grid for complex 2D layouts
  - Mobile-first responsive design

- **Typography:**
  - System fonts (no custom fonts)
  - Clear hierarchy with Tailwind sizes
  - Proper line-height for readability

---

## Icon System

**Hugeicons React Integration:**
- Icons used across all pages:
  - Shield (logo)
  - Menu/X (mobile nav toggle)
  - Mail, Lock, Eye, EyeOff (forms)
  - Send (message submit)
  - Image (image upload)
  - Plus (add actions)
  - Loader (loading state)
  - Home, LogOut (navigation)
  - GitHub, Twitter, LinkedIn (social)

- Implementation:
  ```jsx
  import { MailIcon, LockIcon } from 'hugeicons-react'
  <MailIcon size={20} />
  ```

---

## Environment Configuration

**Required Environment Variables** (`.env.local`):

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
```

**Optional:**
- `VITE_API_TIMEOUT`: Timeout for API requests (default: 30000ms)

---

## Development Workflow

### Scripts Available

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Development Features
- Hot Module Replacement (HMR) for instant updates
- React StrictMode for development warnings
- Axios interceptors for API debugging
- localStorage for auth token persistence

---

## Key Features Implementation

### Google OAuth
- Integrated via `@react-oauth/google`
- GoogleLogin component on Auth page
- Token sent to backend for verification
- Auto-redirect to Prompt page on success

### Form Validation
- Email format validation
- Password minimum length check
- Real-time error display
- Visual feedback (borders/colors)

### Image Upload
- File type validation (image only)
- File size validation
- Preview display
- Error handling for invalid files

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible layouts using Tailwind
- Touch-friendly buttons and inputs

---

## Performance Considerations

### Bundle Optimization
- Code splitting via React Router
- Tree-shaking enabled in Vite
- CSS purging in production
- Minified output

### Asset Optimization
- No large images (icons only)
- Lazy loading for routes (implicit via Router)
- Efficient CSS with Tailwind

### Caching Strategy
- localStorage for auth tokens
- Browser cache for static assets
- API response caching (if implemented)

---

## Error Handling

### Frontend Error Handling
- Try-catch blocks in async operations
- API error logging to console
- User-friendly error messages
- Form validation errors
- Network timeout handling (30s default)

### Backend Integration Points
- `/auth/google` - Google authentication
- `/auth/login` - Email login
- `/auth/signup` - User registration
- `/detect/upload` - Image upload
- `/detect/analyze` - Analysis execution
- `/detect/result` - Get results
- `/history` - Fetch user history
- `/user/profile` - User data
- `/health` - Backend health check

---

## Security Implementation

### Implemented
- Authorization header with Bearer token
- localStorage for secure token storage
- HTTPS-ready (environment variable)
- Input validation on forms
- CORS-ready setup

### Recommended for Backend
- JWT token validation
- HTTPS enforcement
- CORS policies
- Rate limiting
- Input sanitization

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Future Enhancements

### Planned Features
1. User profile page
2. Detection history with analytics
3. Batch image processing
4. Export results (PDF/CSV)
5. User settings/preferences
6. Notification system
7. Dark/Light mode toggle
8. Internationalization (i18n)

### Technical Improvements
1. State management (Zustand/Redux)
2. Error boundary components
3. Suspense for code splitting
4. Service Worker for offline mode
5. Analytics integration
6. A/B testing framework

---

## Testing Strategy

### Unit Tests (Recommended)
- Component rendering
- Route navigation
- Form validation logic
- API service calls

### Integration Tests
- Full page workflows
- Auth flow (login → detection)
- Image upload and analysis
- Navigation between pages

### E2E Tests
- User journeys
- Critical paths
- Cross-browser testing
- Mobile responsiveness

---

## Deployment

### Production Build
```bash
npm run build
# Output: dist/
```

### Deployment Platforms
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

### Configuration for Deployment
- Set environment variables on platform
- Update API_URL to production backend
- Enable HTTPS
- Configure CDN caching

---

**Created:** April 2024
**Version:** 1.0.3
**Last Updated:** Current
