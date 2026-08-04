import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { useFavorites } from '../hooks/useFavorites'

export function Layout() {
  const { favorites } = useFavorites()

  return (
    <div className="min-h-screen">
      <Header favoriteCount={favorites.length} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-500 dark:border-cinema-800 dark:text-gray-500">
        Powered by{' '}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cinema-accent hover:underline"
        >
          TMDB
        </a>
        {' · '}
        Built by Miguel Silva
      </footer>
    </div>
  )
}
