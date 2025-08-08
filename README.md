
# GitHub Explorer

## Project Overview

GitHub Explorer is a web application that allows users to search and explore GitHub profiles and repositories. It provides a user-friendly interface to search for GitHub users and repositories with infinite scrolling, detailed user and repo cards, and language badges.

This project is built using Next.js, TypeScript, Sass, and Axios for API calls. It demonstrates modern React hooks usage, API integration, and custom components styled with SCSS modules.

## Features

- Search GitHub users or repositories using the GitHub API.
- Infinite scrolling to load more results as you scroll down.
- Detailed user cards showing avatar, name, type, and score.
- Repository cards showing name, description, forks count, and language badges.
- Responsive and attractive UI with light/dark mode styling.
- Error handling with retry functionality.
- Debounced search input for optimized API calls.

## Business Use Case

This application can serve developers and project managers looking for inspiration or collaborators on GitHub. It provides quick access to popular users and repositories and allows filtering by relevance and popularity.

## Getting Started

### Prerequisites

- Node.js (>= 16.x recommended)
- npm or yarn package manager
- GitHub API token (optional but recommended to increase API limits)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/github-explorer.git
cd github-explorer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your GitHub API token (optional):

```
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_GITHUB_API_URL=https://api.github.com
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

- `/components` - React components (UI modules, layout, cards, search, etc.)
- `/hooks` - Custom React hooks (infinite scroll, debounce, etc.)
- `/pages` - Next.js pages
- `/public` - Static files (icons, images)
- `/styles` - Global and shared styles (Sass variables, mixins)
- `/types` - TypeScript interfaces and types
- `/utils` - Utility functions

## Scripts

- `dev` - Runs the app in development mode
- `build` - Builds the app for production
- `start` - Starts the production server
- `lint` - Runs ESLint checks
- `lint:fix` - Runs ESLint and fixes issues

## Technologies Used

- Next.js (React framework)
- TypeScript
- Sass (SCSS modules)
- Axios (HTTP client)
- ESLint (code linting)
- GitHub REST API v3

## Notes

- The app handles rate limiting by GitHub API using debouncing and error handling.
- Language icons are loaded from the `/public/icons` directory with fallback for unknown languages.
- The UI uses consistent teal/dark blue color palette aligned with GitHub theme.

---

Feel free to contribute, raise issues, or submit pull requests to improve this project!

---

## License

This project is licensed under the MIT License.
