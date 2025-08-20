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

- `tailwind.config.ts`: The main Tailwind configuration file.
- `postcss.config.mjs`: The PostCSS configuration file.
- `app/globals.css`: The global CSS file where Tailwind CSS is imported and base styles are defined.

The `app/globals.css` file uses the new Tailwind CSS v4 syntax:

```css
@import "tailwindcss/preflight";
@import "tailwindcss/utilities";

@layer base {
  :root {
    --background: white;
    --foreground: black;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: black;
      --foreground: white;
    }
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
```

When working on this project, please adhere to these conventions.
