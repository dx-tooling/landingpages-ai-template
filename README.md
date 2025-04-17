# AI-friendly Static Landing Page Generator & Styleguide

[![Tests](https://github.com/dx-tooling/landingpages-ai-template/actions/workflows/tests.yml/badge.svg)](https://github.com/dx-tooling/landingpages-ai-template/actions/workflows/tests.yml)
[![Code Quality](https://github.com/dx-tooling/landingpages-ai-template/actions/workflows/code-quality.yml/badge.svg)](https://github.com/dx-tooling/landingpages-ai-template/actions/workflows/code-quality.yml)

This project provides a modern template and styleguide for building static marketing and product landing pages. It combines a pre-configured development environment with a set of reusable components, designed to be easily extended either manually or, ideally, through AI coding assistants like Cursor or Windsurf.

Essentially, it's a *text-to-landingpage* starter kit. Just open the project in your AI coding assistant, provide the necessary context (like the styleguide), and instruct the AI to build your landing pages.

**The Goal:** Bridge the gap between the ease of AI-driven development ("text-to-landingpage") and the need for full control over clean, static, zero-dependency HTML/CSS/JS output.

![Screenshot of the Living Styleguide and Example Landing Page](http://manuel.kiessling.net/landingpages-ai-template/assets/main-screenshot-3840x1559.jpg)

**Who is this for?**
*   Developers, marketers, or designers who want to quickly generate landing pages using AI tools.
*   Users who value having complete control over the final static code output.
*   Individuals comfortable with basic command-line operations (Node.js, npm) but not necessarily deep web development experts.

**What you get:**
*   A ready-to-use development environment.
*   Clean, static HTML/CSS/JS output suitable for any static hosting provider (Netlify, Vercel, GitHub Pages, S3, etc.). You manage your own hosting.
*   A workflow optimized for AI coding assistants.

## Key Features

*   **Modern Tooling:** Built with TypeScript, Webpack 5, Tailwind CSS v4, and PostCSS.
*   **Living Styleguide:** (`src/styleguide/index.html`) Demonstrates available components and styles for easy reference (and for instructing AI).
*   **Example Landing Page:** (`src/example-page/index.html`) A practical example built using the styleguide components.
*   **Stimulus JS:** For lightweight JavaScript interactivity (e.g., modals, theme toggle).
*   **Dark/Light Mode:** Built-in theme toggling based on user preference and localStorage, with FOUC prevention.
*   **HTML Partials:** Uses `<include>` tags (`posthtml-include`) for reusable HTML snippets (like headers, footers, theme guard).
*   **Quality Control:** Pre-configured ESLint, Prettier, and TypeScript checking (`npm run quality`).
*   **Testing:** Vitest setup for unit/integration tests (primarily for Stimulus controllers — `npm run test`). Configured in `vitest.config.ts`.
*   **Optimized Build:** Development (`npm run build`) and production (`npm run build:prod`) builds configured.

## Getting Started

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/dx-tooling/landingpages-ai-template.git
    cd landingpages-ai-template
    ```
2.  **Set Up Node.js:** This project uses a specific Node.js version defined in `.nvmrc`. Use Node Version Manager (`nvm`) to ensure compatibility:
    ```bash
    # Installs the correct Node.js version if you don't have it
    nvm install
    # Activates the correct Node.js version for your current shell session
    nvm use
    ```
    *(You'll need to run `nvm use` in each new terminal session you open for this project).*
3.  **Install Dependencies:** Install the necessary development tools:
    ```bash
    npm install --no-save
    ```

## Development Workflows

### 1. AI-Assisted Development (Recommended)

This project is designed to work seamlessly with AI coding assistants like **Cursor** or **Windsurf** in their "Agent" or chat modes.

1.  **Open the Project:** Open the *entire project root folder* in your AI-powered IDE (e.g., Cursor).
2.  **Provide Context:** Make sure the AI has access to the relevant files, especially:
    *   `src/styleguide/index.html` (to see available components)
    *   `src/example-page/index.html` (as an example of composition)
    *   `.cursorrules` or this `README.md` (for instructions)
    *   Any specific controllers (`src/controllers/`) or CSS (`src/styles/`) if relevant.
3.  **Instruct the AI:** Ask the AI to create or modify landing pages. Be specific!
    *   **Example Snippets:** *(Combine these ideas into a full prompt)*
        *   *File Creation:* "Create a new landing page file at `src/my-new-page/index.html`."
        *   *Using Components:* "Use the hero section component from the styleguide, but change the headline text to 'My Awesome Product'."
        *   *Composition:* "Then, add the three-column feature section below it, using icons relevant to speed, security, and ease of use."
        *   *Verification:* "After making the changes, run `nvm use && npm run quality` in the terminal to check for linting errors, type errors, and test failures. Fix any errors reported."
        *   *Building:* "Run `nvm use && npm run build` to create a development build in the `dist/` folder." (Or use `npm run build:prod` for production).
        *   *Inventing Components:* "Create a new two-column section with an image on the left and text on the right, following the styling patterns in the styleguide."

    **Complete Example Prompt #1 (High-Level):**

    ```text
    I need a new landing page for my 'Expert Project Management' workshops.

    1.  **Create File:** Create the page at `src/expert-pm-workshop/index.html`.
    2.  **Content Goal:** The page should promote the workshops, highlighting these key advantages: [Explain Advantage X], [Explain Advantage Y], and [Explain Advantage Z]. Include a way for users to get in touch via email (you can model this after the email form/CTA in the example page).
    3.  **Design Inspiration:** Use the components and styling available in the Living Styleguide (`src/styleguide/index.html`). Feel free to draw inspiration from the structure and layout of the example page (`src/example-page/index.html`), but adapt it to fit the workshop content.
    4.  **Technical Setup:** Ensure the basic HTML structure is correct, including the theme FOUC guard partial in the head.
    5.  **Verify:** After creating the page, run `nvm use && npm run quality`. Fix any reported errors.
    6.  **Build:** Once verification passes, run `nvm use && npm run build`.

    Let me know when it's ready or if you encounter issues.
    ```

    **Complete Example Prompt #2 (Specific Steps):**

    ```text
    Okay, let's build a new landing page. Please follow these steps precisely:

    1.  **Create File:** Create a new HTML file at `src/my-product-page/index.html`.
    2.  **Basic Structure:** Set up the basic HTML structure (<html>, <head>, <body>) like in `src/styleguide/index.html`, including the `<title>`, `<meta>` tags (adjust content appropriately), and the `<include src="partials/theme-fouc-guard.html"></include>` in the head.
    3.  **Add Header:** Include the theme toggle header component as seen in the styleguide.
    4.  **Add Hero Section:** Copy the "Hero Effects Example 1" section from `src/styleguide/index.html`. Change the main headline (`h1`) text to "Introducing Product X". Change the sub-headline (`h2`) text to "The Solution You Need". Update the paragraph text to describe Product X briefly. Change the CTA button text to "Get Early Access".
    5.  **Add Features Section:** Copy the three-column "Features Section Example (Grid)" from the styleguide below the hero section. Update the icons and text for the three features to be relevant to Product X (e.g., Feature 1: Blazing Speed, Feature 2: Rock-Solid Security, Feature 3: Unmatched Simplicity).
    6.  **Add CTA Section:** Copy the "Email Capture CTA Section" from the styleguide below the features section.
    7.  **Add Footer:** Add a simple footer with a copyright notice for "Product X".
    8.  **Verify:** After creating the file and adding the content, run the command `nvm use && npm run quality` in the terminal. Report any errors found and fix them.
    9.  **Build:** If verification passes, run `nvm use && npm run build` to generate the development build.

    Ensure all copied components use the correct CSS classes as defined in the styleguide and the overall structure is valid HTML5.
    ```

    **Example workflow in Cursor AI Code Agent:**

    ![Screenshot of Cursor AI with prompt example](http://manuel.kiessling.net/landingpages-ai-template/assets/cursor-screenshot-1920x1529.png)

**Why `nvm use` before `npm` commands?** The project's build tools and linters might depend on the specific Node.js version defined in `.nvmrc`. Running `nvm use` ensures the correct version is active before executing `npm` scripts.

### 2. Manual Development

You can also work conventionally:

1.  **Create/Edit HTML:** Add or modify `.html` files within the `src/` directory (but outside `src/partials/`). Webpack automatically finds and processes these.
2.  **Use Partials:** Use `<include src="partials/your-partial.html"></include>` within your HTML files to reuse common elements.
3.  **Add Styles:** Use Tailwind CSS utility classes directly in your HTML. Add custom CSS to `src/styles/main.css` if needed.
4.  **Add Interactivity:** Create new Stimulus controllers in `src/controllers/` following the naming convention (e.g., `src/controllers/signup_form_controller.ts` becomes `data-controller="signup-form"`).
5.  **Build:** Run `nvm use && npm run build` (for development) or `nvm use && npm run build:prod` (for production). The output goes to the `dist/` folder, mirroring the `src/` structure.

## Available `npm` Scripts

*(Always run `nvm use` in your terminal session before these commands)*

*   `npm run build`: Creates a development build in `dist/` (includes source maps).
*   `npm run build:prod`: Creates an optimized production build in `dist/` (minified, no source maps, content hashes in filenames).
*   `npm run quality`: Runs Prettier formatting fixes, ESLint, and TypeScript type checking.
*   `npm test`: Runs Vitest unit/integration tests.
*   `npm run test:watch`: Runs Vitest in interactive watch mode.
*   `npm run coverage`: Runs Vitest tests and generates a coverage report.
*   `npm run lint`: Runs ESLint and TypeScript type checking.
*   `npm run lint:eslint`: Runs ESLint only.
*   `npm run lint:types`: Runs TypeScript type checking (`tsc --noEmit`) only.
*   `npm run prettier:fix`: Formats code using Prettier.

## Project Structure

*   `src/`: All source files.
    *   `controllers/`: Stimulus JavaScript controllers (TypeScript).
    *   `partials/`: Reusable HTML partials included via `<include>`.
    *   `static/`: Static assets (like images) that are copied to the build output.
    *   `styles/`: Source CSS files (e.g., `main.css` for Tailwind imports/directives).
    *   `types/`: Custom TypeScript type definitions (e.g., `global.d.ts`).
    *   `*.html`: Your landing page source files (processed by Webpack).
    *   `index.ts`: Main JavaScript entry point (initializes Stimulus).
*   `dist/`: Compiled static output (generated by `npm run build`/`build:prod`). **Do not edit files here directly.**
*   `tests/`: Vitest test files.
*   **Root:** Configuration files (`webpack.config.js`, `package.json`, `tailwind.config.js`, `vitest.config.ts`, etc.).

## Technologies Used

*   HTML
*   Tailwind CSS v4
*   TypeScript
*   Stimulus.js
*   Webpack 5
*   PostCSS
*   ESLint
*   Prettier
*   Vitest

## License

This project is licensed under the MIT License. See the LICENSE.txt file for details.
