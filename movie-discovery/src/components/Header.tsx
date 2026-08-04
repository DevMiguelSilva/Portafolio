import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

interface HeaderProps {
  favoriteCount: number
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-cinema-accent text-white'
      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-cinema-800'
  }`

export function Header({ favoriteCount }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-cinema-800 dark:bg-cinema-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-3xl tracking-wide text-cinema-accent">CINE</span>
          <span className="hidden text-sm text-gray-500 dark:text-gray-400 sm:inline">
            Movie Discovery
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={navLinkClass} end>
            Discover
          </NavLink>
          <NavLink to="/favorites" className={navLinkClass}>
            Favorites
            {favoriteCount > 0 && (
              <span className="ml-1.5 rounded-full bg-white/20 px-1.5 text-xs">{favoriteCount}</span>
            )}
          </NavLink>
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-1 rounded-lg p-2 text-lg transition hover:bg-gray-100 dark:hover:bg-cinema-800"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}
