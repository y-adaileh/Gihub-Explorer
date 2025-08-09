# GitHub Explorer

## Project Overview

GitHub Explorer is a **Next.js** web application that allows users to search and explore GitHub profiles and repositories.  
It provides a clean, user-friendly interface to search GitHub users and repositories with infinite scrolling, detailed cards, and language badges.

The app also serves as a **backend API** to fetch GitHub users and repositories via custom API endpoints.

**Live Demo:** [https://gihub-explorer.vercel.app](https://gihub-explorer.vercel.app)

---

## Features

- Search GitHub **users** or **repositories** using the GitHub API.
- Infinite scrolling to load more results dynamically.
- **Detailed User Cards** — avatar, name, type, score, and profile link.
- **Repository Cards** — name, description, forks count, language badges.
- Responsive and attractive dark mode UI.
- Error handling with **retry** functionality.
- Debounced search input for optimized API requests.
- Backend API endpoints for fetching users and repositories.

---

## API Endpoints

### Search Users

```
https://github-explorer.vercel.app/api/users?searchTerm=test&page=1&limit=3
```

**Sample Response**

```json
[
  {
    "id": 383316,
    "name": "test",
    "avatarUrl": "https://avatars.githubusercontent.com/u/383316?v=4",
    "url": "https://api.github.com/users/test",
    "score": 1,
    "type": "User",
    "siteAdmin": false,
    "userViewType": "public",
    "profileUrl": "https://github.com/test"
  }
]
```

### Search Repositories

```
https://github-explorer.vercel.app/api/repositories?searchTerm=test&page=1&limit=3
```

**Sample Response**

```json
[
  {
    "id": 688352,
    "name": "jmeter",
    "owner": {
      "id": 47359,
      "name": "apache",
      "avatarUrl": "https://avatars.githubusercontent.com/u/47359?v=4",
      "url": "https://github.com/apache",
      "type": "Organization",
      "userViewType": "public",
      "profileUrl": "https://github.com/apache"
    },
    "description": "Apache JMeter open-source load testing tool for analyzing and measuring the performance of a variety of services",
    "fork": false,
    "url": "https://github.com/apache/jmeter",
    "forksCount": 2201,
    "languages": [
      "Java",
      "Kotlin",
      "HTML",
      "XSLT",
      "JavaScript",
      "Batchfile",
      "Shell",
      "CSS",
      "Less",
      "Groovy"
    ],
    "forkUsers": [
      {
        "id": 224889242,
        "name": "kmeir",
        "avatarUrl": "https://avatars.githubusercontent.com/u/224889242?v=4",
        "url": "https://api.github.com/users/kmeir",
        "type": "User",
        "userViewType": "public",
        "profileUrl": "https://github.com/kmeir"
      },
      {
        "id": 7726027,
        "name": "Optum",
        "avatarUrl": "https://avatars.githubusercontent.com/u/7726027?v=4",
        "url": "https://api.github.com/users/Optum",
        "type": "Organization",
        "userViewType": "public",
        "profileUrl": "https://github.com/Optum"
      },
      {
        "id": 85241921,
        "name": "thesaurabhmhaske",
        "avatarUrl": "https://avatars.githubusercontent.com/u/85241921?v=4",
        "url": "https://api.github.com/users/thesaurabhmhaske",
        "type": "User",
        "userViewType": "public",
        "profileUrl": "https://github.com/thesaurabhmhaske"
      }
    ]
  }
]
```

---

## UI Screenshots

- **No Data State**  
  <img width="1262" height="544" alt="image" src="https://github.com/user-attachments/assets/070b0ae7-8ba0-4ae5-9542-512a67b852ad" />

- **Error Message with Retry Button**  
  <img width="1072" height="577" alt="image" src="https://github.com/user-attachments/assets/88a055e5-e2fe-47db-8749-5d6473b2ba18" />

- **Circular Loader**  
  <img width="1171" height="571" alt="image" src="https://github.com/user-attachments/assets/75d63e15-c8ad-4c72-89f5-dd8e546947cb" />

- **User Card**  
  <img width="1273" height="544" alt="image" src="https://github.com/user-attachments/assets/e53807dd-0883-411a-b8f8-55c4d1f6e32f" />

- **Repository Card**  
  <img width="1298" height="604" alt="image" src="https://github.com/user-attachments/assets/8354d88d-e3fa-4e8e-9ded-6b99ebb4ed01" />

---

## Getting Started

### Prerequisites

- Node.js (>= 16.x recommended)
- npm or yarn
- GitHub API token (optional but recommended for higher rate limits)

### Installation

```bash
git clone https://github.com/yourusername/github-explorer.git
cd github-explorer
npm install
# or
yarn install
```

Create `.env.local` in the root:

```
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_GITHUB_API_URL=https://api.github.com
```

Run in development:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

---

## Scripts

```json
"dev": "next dev --turbopack",
"build": "next build",
"start": "next start",
"lint": "next lint",
"lint:fix": "next lint --fix",
"format": "prettier --write .",
"format:check": "prettier --check .",
"test": "jest --passWithNoTests",
"test:watch": "jest --watch"
```

---

## Technologies Used

- Next.js
- TypeScript
- Sass (SCSS Modules)
- Axios
- ESLint & Prettier
- GitHub REST API v3

---

## License

MIT License
