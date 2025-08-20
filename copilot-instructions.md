# Project: aromabumiroaster

This project is a Next.js application set up with the following technologies and conventions:

- **Next.js**: Using the App Router.
- **TypeScript**: For type safety.
- **Tailwind CSS**: Version 4 or higher.
- **ESLint**: For code linting.
- **No `src` directory**: All application code is in the root `app` directory.
- **No import aliases**: All imports use relative paths.

## Tailwind CSS v4 Configuration

The project is configured to use Tailwind CSS v4. The main configuration files are:

- `postcss.config.mjs`: The PostCSS configuration file.
- `app/globals.css`: The global CSS file where Tailwind CSS is imported and base styles are defined.

The `app/globals.css` file uses the new Tailwind CSS v4 syntax:

```css
@import "tailwindcss";

@theme {
  --background: black;
  --foreground: white;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}
```

When working on this project, please adhere to these conventions.

## Project Overview: Aroma Bumi Roasters

This is a company profile website for a coffee shop named "Aroma Bumi Roasters".

### Pages

The website consists of the following pages:

- **Home (`/`)**: A landing page with a hero section and featured products.
- **Order (`/order`)**: A page to display and order coffee products.
- **About (`/about`)**: A page describing the company's story and mission.
- **Contact (`/contact`)**: A page with contact information and a contact form.

### Installed Libraries

The following libraries have been installed and configured:

- **`zustand`**: For global state management (e.g., shopping cart).
- **`react-icons`**: For easily adding icons.
- **`react-spinners`**: For loading indicators.
- **`framer-motion`**: For animations.

### Project Structure and Conventions

- **Components**: Reusable components are located in `app/components/`. Client components are explicitly marked with `"use client"`.
- **State Management**: Zustand store is set up in `app/store/cartStore.ts`.
- **Type Definitions**: Shared types (like `Product`) are defined in `app/types.ts`.
- **Suspense for Data Fetching**: The `<Suspense>` boundary is used on the Order page to handle loading states for components that fetch data, improving the user experience.
- **SEO**: Each page has custom `metadata` for better search engine optimization.
- **Asset Placeholders**: Placeholders (divs with background colors) are used for images, with comments indicating where to add the actual assets.

### Important Fixes

- **Framer Motion Compatibility**: A build error with `framer-motion` in Next.js App Router was resolved by creating a client boundary component at `app/components/FramerMotionClient.tsx`. All components using `framer-motion` now import it from this file instead of the library directly.
