# Movie Discovery

A React movie app for exploring trending films, viewing TMDB scores, watching trailers, and reading reviews. Built as the first portfolio project for a software developer career in Canada.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- Search movies or browse **trending this week**
- **Scores** from TMDB with color-coded ratings
- **Trailers** embedded from YouTube
- **Reviews** from TMDB community
- **Favorites** saved in your browser (localStorage)
- **Dark / light theme** toggle
- Fully responsive layout

## Tech stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | Frontend framework & build tool |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| React Router | Client-side routing |
| TMDB API | Movie data, reviews, videos |

## Getting started

### 1. Get a free TMDB API key

1. Create an account at [themoviedb.org](https://www.themoviedb.org/signup)
2. Go to **Settings → API** and request an API key (Developer option)
3. Copy your **API Key (v3 auth)**

### 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and paste your key:

```
VITE_TMDB_API_KEY=your_actual_key_here
```

### 3. Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production

```bash
npm run build
npm run preview
```

## Deploy for free (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Set **Root Directory** to `movie-discovery`
4. Add environment variable: `VITE_TMDB_API_KEY` = your TMDB key
5. Deploy — every push to `main` auto-deploys

## Project structure

```
src/
├── api/tmdb.ts          # TMDB API calls & helpers
├── components/          # Reusable UI components
├── hooks/               # Favorites & theme logic
├── pages/               # Home, Details, Favorites
└── types/movie.ts       # TypeScript interfaces
```

## What you'll learn

- Calling REST APIs with `fetch`
- React hooks (`useState`, `useEffect`, custom hooks)
- React Router (pages, dynamic routes)
- Context API for shared state
- Loading, error, and empty states
- localStorage persistence
- Environment variables in Vite
- Deploying a React SPA

## License

MIT — portfolio/educational use.

Data provided by [TMDB](https://www.themoviedb.org/) but not endorsed or certified by TMDB.
