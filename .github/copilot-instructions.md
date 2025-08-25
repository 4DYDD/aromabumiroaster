````instructions
# Project: aromabumiroaster

This project is a Next.js application set up with the following technologies and conventions:

- **Next.js**: Using the App Router with TypeScript.
- **TypeScript**: For type safety throughout the application.
- **Tailwind CSS**: Version 4 or higher with custom coffee shop theme.
- **ESLint**: For code linting.
- **No `src` directory**: All application code is in the root `app` directory.
- **No import aliases**: All imports use relative paths.

## Tailwind CSS v4 Configuration

The project uses Tailwind CSS v4 with a custom coffee shop color palette:

```css
@theme {
  /* Coffee Shop Color Palette */
  --color-primary: #2a1a10; /* Dark brown, like coffee */
  --color-primary_dark: #110c08; /* Very dark brown, like black coffee */
  --color-secondary: #f0ebe3; /* Warm cream, like latte foam */
  --color-accent: #8d6e63; /* Light brown, for buttons and links */
  --color-text: #333333; /* Very dark gray for main text */
}
```

Custom utilities are defined for common patterns:
- `@utility flexc` - flex items-center justify-center
- `@utility flexcc` - flex flex-col items-center justify-center
- `@utility clicked` - interactive cursor and scale effects
- `@utility transall` - standard transitions

## Project Overview: Aroma Bumi Roasters

This is a modern company profile website for a premium Indonesian coffee shop named "Aroma Bumi Roasters" with full e-commerce functionality.

### Pages Structure

- **Home (`/`)**: Landing page with hero video, featured products, and cart functionality
- **Menu (`/menu`)**: Coffee menu and ordering page
- **About (`/about`)**: Company story and mission (fully implemented)
- **Contact (`/contact`)**: Contact information and form

### Advanced State Management

The project uses **Zustand** for multiple state stores:

1. **Cart Store** (`app/store/cartStore.ts`):
   - Add/remove items from shopping cart
   - Cart persistence and management
   - Real-time item count updates

2. **Video Store** (`app/store/videoStore.ts`):
   - Video loading progress tracking
   - Download status management
   - Error handling for video content

3. **Hero Animation Store** (`app/store/heroAnimationStore.ts`):
   - Complex animation sequencing
   - Animation state persistence across navigation
   - Smooth transitions and delays

### Component Architecture

#### Navigation System
- **Navbar** (`app/components/Navbar.tsx`):
  - Scroll-responsive background changes
  - Dynamic styling based on page and scroll position
  - Smooth animations and transitions

- **LineTabs** (`app/components/SyntaxUI/LineTabs.tsx`):
  - 5-tab navigation: Home → Menu → **Cart** → About → Contact
  - Compact spacing for optimal layout
  - Icon-based navigation with hover effects

- **CartTab** (`app/components/SyntaxUI/CartTab.tsx`):
  - Integrated cart button in navbar center position
  - Real-time badge showing item count
  - Modal trigger for cart management

#### Cart System
- **CartModal** (`app/components/Cart/CartModal.tsx`):
  - Side-sliding cart drawer
  - No background blur (user can see menu while shopping)
  - No body scroll prevention (allows browsing while cart is open)
  - Add/remove items functionality
  - Total calculation and checkout preparation

#### Hero Section
- **HeroSection** (`app/components/HeroSection/index.tsx`):
  - Background video with falling coffee beans
  - Progress tracking for video loading
  - Smooth animation sequences
  - Responsive design with overlay content

#### Product System
- **ProductList** (`app/components/ProductList.tsx`):
  - Client component with cart integration
  - Mock Indonesian coffee products (Aceh Gayo, Toraja Sapan, etc.)
  - Visual feedback on add-to-cart actions
  - Product cards with pricing and descriptions

### Installed Libraries

- **`zustand`**: Multi-store state management (cart, video, animations)
- **`react-icons`**: Comprehensive icon library (FaHome, FaCoffee, FaShoppingBasket, etc.)
- **`react-spinners`**: Loading indicators for video and content
- **`framer-motion`**: Advanced animations and transitions
- **`next/image`**: Optimized image loading and display

### Navigation Icons & Structure

Current navbar layout (5 tabs centered):
- 🏠 **Home** (`FaHome`) → `/`
- ☕ **Menu** (`FaCoffee`) → `/menu`
- 🛒 **Cart** (`FaShoppingBasket`) → CartModal trigger
- ℹ️ **About** (`FaInfoCircle`) → `/about`
- ✉️ **Contact** (`FaEnvelope`) → `/contact`

### Asset Management

- **Videos**: `/video/falling_coffee_beans.mp4` with preload optimization
- **Images**: `/images/coffee_banner_menu.jpg` with progressive loading
- **Fonts**: Playfair Display (headings) + Lato (body text)

### Performance Optimizations

1. **Video Loading**: Progressive download with progress tracking
2. **Image Preloading**: Critical assets preloaded in layout
3. **Animation Sequencing**: Optimized timing to prevent render blocking
4. **State Persistence**: Cart and animation states maintained across navigation
5. **Responsive Design**: Mobile-first with desktop enhancements

### Key Features Implemented

1. **Shopping Cart System**:
   - Add to cart from product listings
   - Real-time cart count in navbar
   - Side-drawer cart modal
   - Item management (add/remove/clear)

2. **Video Hero Section**:
   - Background video with progress tracking
   - Smooth loading states
   - Error handling and fallbacks

3. **Responsive Navigation**:
   - Scroll-aware background changes
   - Premium coffee shop aesthetic
   - Smooth animations and transitions

4. **Product Catalog**:
   - Indonesian coffee varieties
   - Rich product descriptions
   - Interactive add-to-cart functionality

### Project Conventions

- **Client Components**: Explicitly marked with `"use client"` directive
- **Type Safety**: Shared types in `app/types.ts` (Product interface)
- **SEO Optimization**: Custom metadata for each page
- **Accessibility**: Focus management and keyboard navigation
- **Error Boundaries**: Graceful error handling throughout

### Development Notes

- **No Floating Cart**: Cart button integrated into navbar for clean UX
- **Premium Aesthetic**: Film-era coffee shop inspired design
- **User-Friendly Cart**: No background blocking, allows browsing while shopping
- **Indonesian Focus**: All coffee products feature Indonesian origins and descriptions
- **Animation Sequences**: Complex timing for smooth user experience

When working on this project, maintain the established patterns for state management, component structure, and the premium coffee shop aesthetic.
````
